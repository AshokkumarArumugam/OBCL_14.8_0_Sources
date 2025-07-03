/*----------------------------------------------------------------------------------------------------
 **
 ** File Name    : SmmsgBox.js
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
 
**  Modified By          : Neethu Sreedharan
**  Modified On          : 19-Jun-2017
**  Modified Reason      : Changes done for displaying origination functionIDs in case of Arabic user. 
**  Retro Source         : 9NT1606_12_0_2_NATIONAL_BANK_OF_EGYPT
**  Search String        : 9NT1606_12_4_RETRO_12_0_2_26231157

**  Modified By          : Subhavinodha V
**  Modified On          : 13-Oct-2020
**  Modified Reason      : Code to hide the 'Renew' button as part of retro bug 25160056 commented.
**  Search String        : 9NT1606_14_1_CNSL_FBC_31890153
 ----------------------------------------------------------------------------------------------------
 */

var serverURL = "FCClientHandler";
var taskListXML = "";
var gTaskCopyDom;
var currentStage = false; // CTCB4.0 CHANGE
var scriptLoadFlag = false;
var uiNames = new Array();
var taskStatus="";
var reAssignWinParams = new Object();
//FCUBS11.0 BPEL Changes
var g_txnBranch         = mainWin.CurrentBranch;
var g_cur_queueId;
//12.0.2 Changes Starts
var base64image;
var isDashboardAction = false;	  
var isDashboardCopy = false;	  
var copytaskFunctionRef;
var comments = ""; 
var gTasksDOM = null; 
var gButtonId = "";
var imgLocation = "Images/";
var imgReminder = "reminder.png"
var imgRedFlag = "redflag.png"
var imgGreenFlag = "greenflag.png"
var resetAlert      = "";//12.1 Retro_Changes
var lblHighlightTask    = "";
var lblSetReminder      = "";
var lblResetReminder    = "";
var lblSetResetReminder = "";
var lblViewReminder     = "";
var lblDismissReminder  = "";
var lblDismissReminders = "";
var g_temp_queueId = "";
var g_temp_queueIdDesc = "";
//12.0.2 Changes Ens
var NewTaskList = new Array();
//12.1 Retro_Changes starts
var resetAlert      = "";
var alertComments   = "";
var deleteProcessed;
var countRefresh;
var lblNotification    = mainWin.getItemDesc("LBL_TITLE_NOTIFICATION");
var ColumnArray= new Array(); 
var g_alert_id = "";
var is_bam_logged_in = false;
var g_user_report_id = ""; 
var g_alert_date = "";
var g_alert_time = "";
var gNotifAlerts = new Array();
var gQueueNamesArr ;
var gQueueTypesArr;
var gBamURLsArr ;
var gFiledListsArr;
var gActionsArr ;
var gDescArr ;
var gNumOfPartition;
var gAlertsArr = new Array();
var gSelectDt ;
//12.1 Retro_Changes ends
var imgNewTask = "NewTask.png"
var highlightedTasks = new Array();
if (!scriptLoadFlag) {
    scriptLoadFlag = true;
}

function removeReadonlyFuncsFromAppBrw() {
    var tempDom = loadXMLDoc(parent.gXmlMenu);
    if (tempDom != null) {
        var processFuncNodes = selectNodes(tempDom, "//LEAF[@TYPSTR='P' or @TYPSTR='T']");
        for (var count = 0; count < processFuncNodes.length; count++) {
            var node = processFuncNodes[count];
            if (node.getAttribute('UINAME')) 
                uiNames[node.getAttribute("FNID")] = node.getAttribute('UINAME');
            else 
                uiNames[node.getAttribute("FNID")] = node.getAttribute("FNID");
            if (isBpelEnabled) {
                if (node.getAttribute("FNID") && getBpelRoleRight(node.getAttribute("FNID")) != 'E' && node.getAttribute("TYPSTR") != 'T') {
                    node.parentNode.removeChild(node);
                }
            }
        }
    }
    parent.gXmlMenu = getXMLString(tempDom);
    tempDom = null;
}

function showFunctionId(rowIndex, evnt) {
    /*if (!parent.isSessionActive()) {
        return;
    }*/
    var e = window.event || evnt;
    if (rowIndex == null) 
        rowIndex = getRowIndex(e) - 1;
    var funcId = document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute("FUNCID");
    var taskId = document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute("TASKID");
    var uiname = "";
    if (uiNames[funcId] != "" && typeof(uiNames[funcId]) != "undefined") 
        uiname = uiNames[funcId];
    taskStatus = document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute("STATUS");
 //   var workflowRefNo = getInnerText(document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].childNodes[1].getElementsByTagName("B")[0]);
 var workflowRefNo = getInnerText(document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].childNodes[1]);

    parent.workflowRefNo = workflowRefNo;
parent.status=taskStatus;
    //Changes for new menuXML ends
    if (trim(taskId) == "") {
    	/* FC 11.4 NLS Changes Starts */
        //alert('The task is not acquired by ' + parent.UserId);
		showErrorAlerts('CS-AL-142',parent.UserId);
		/* FC 11.4 NLS Changes Ends */
        return;
    }
    var timeStamp = getDateObject();
    var inTime=(timeStamp.getHours()*(3600*1000))+(timeStamp.getMinutes()*(60*1000))+(timeStamp .getSeconds()*1000)+timeStamp.getMilliseconds();
	//Added for 14741894 --start
   var txnBranch = "";
   // var newWin = openWindow("testwin", "SMSStartLogServlet?funcid=" + funcId + "&taskId=" + taskId + "&uiName=" + uiname + "&msgType=WORKFLOW&actionType=initiate" + "&timestamp=" + timeStamp.getTime());
    var newWin = openWindow("testwin", "TempForward.jsp?action=SMSStartLogServlet&funcid=" + funcId + "&taskId=" + taskId + "&uiName=" + uiname + "&msgType=WORKFLOW&actionType=initiate" + "&timestamp=" + timeStamp.getTime() + "&inTime=" + inTime+"&txnBranch="+txnBranch);
	 //Added for 14741894 --end
	 fnGetTaskComments(taskId, false); //12.0.2 Changes
}

function showReassign(workflowRefNoList, taskIdList) {
    reAssignWinParams = new Object();
    reAssignWinParams .mainWin = parent.window;
    reAssignWinParams .workflowRefNoList = workflowRefNoList;
    reAssignWinParams .taskIdList = taskIdList;
    var timeStamp = getDateObject();
   var uiname ='';
	var txnBranch='';
   var inTime=(timeStamp.getHours()*(3600*1000))+(timeStamp.getMinutes()*(60*1000))+(timeStamp .getSeconds()*1000)+timeStamp.getMilliseconds();
    //var newWin = openWindow("testwin", "TempForward.jsp?action=SMSStartLogServlet&funcid=CSDRASGN" + "&uiName=" + uiname + "&msgType=WORKFLOW&actionType=initiate" + "&timestamp=" + timeStamp.getTime() + "&inTime=" + inTime + "&txnBranch=" + txnBranch + "&X-CSRFTOKEN=" + CSRFtoken);
    var newWin = openWindow("testwin", "TempForward.jsp?action=SMSStartLogServlet&funcid=CSDRASGN" + "&uiName=" + uiname + "&msgType=WORKFLOW&actionType=initiate" + "&timestamp=" + timeStamp.getTime() + "&inTime=" + inTime + "&txnBranch=" + txnBranch);
    //parent.window.loadChildWindow(newWin);
}
function showDashReassign(workflowRefNoList, taskIdList) {
    reAssignWinParams = new Object();
    reAssignWinParams .mainWin = parent.window;
    reAssignWinParams .workflowRefNoList = workflowRefNoList;
    reAssignWinParams .taskIdList = taskIdList;
    reAssignWinParams.initFrom = 'D';
    parent.reAssignWinParams = reAssignWinParams;
    var timeStamp = getDateObject();
   var uiname ='';
	var txnBranch='';
   var inTime=(timeStamp.getHours()*(3600*1000))+(timeStamp.getMinutes()*(60*1000))+(timeStamp .getSeconds()*1000)+timeStamp.getMilliseconds();
    var newWin = parent.openWindow("testwin", "TempForward.jsp?action=SMSStartLogServlet&funcid=CSDRASGN" + "&uiName=" + uiname + "&msgType=WORKFLOW&actionType=initiate" + "&timestamp=" + timeStamp.getTime()+ "&inTime=" + inTime+"&txnBranch="+txnBranch);   
}
//12.0.2 Changes Start Here
function fnReminder(event){
	var e = window.event || event;
	currTaskTblRowIndex = getRowIndex(e) - 2;
        var tableRef = document.getElementById("tblTaskList").tBodies[0];
	var rowNum = tableRef.rows.length;
	lblHighlightTask    = getItemDesc("LBL_HIGHLIGHT_TASK");
	lblSetReminder      = getItemDesc("LBL_SET_REMINDER");
	lblResetReminder    = getItemDesc("LBL_RESET_REMINDER");
	lblSetResetReminder = getItemDesc("LBL_SETRESET_REMINDER");
	lblViewReminder     = getItemDesc("LBL_VIEW_REMINDER");
	lblDismissReminder  = getItemDesc("LBL_DISMISS_REMINDER");
	lblDismissReminders = getItemDesc("LBL_DISMISS_REMINDERS");
	var lblClose = getItemDesc("LBL_CLOSE");
	if (currTaskTblRowIndex > -1)
	{
		var reminderText = "";
		for (var index = 0; index < rowNum; index++)
		{
                    if (index == currTaskTblRowIndex)
                        tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked = true;
                    else
			tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked = false;
		}
                if (document.getElementById("tblTaskList").tBodies[0].rows[currTaskTblRowIndex].getAttribute('STATUS') == 'ACQUIRED')
                {
		var reminderFlag = document.getElementById("tblTaskList").tBodies[0].rows[currTaskTblRowIndex].getAttribute('REMINDERFLAG');
		//17062979  Changes Starts
		/*if (reminderFlag == "B")
			//HTML5 Changes Start
			reminderText = '<div id="tooltipDiv" class="WNDcontainerModal" onblur="fnCloseReminderMenu(currTaskTblRowIndex)" style="overflow:none;border:1px solid black"><TABLE class="TBLgrid" cellspacing="0" cellpadding="0" border="0" role="presentation" type="ME" style="overflow:auto;width:100%;"><TR class="TBLoneTRalt"><TD><button id="btnHighlight" class="Abut" onmouseover="fnSetButtonVars()" onmouseout="fnResetButtonVars()"  style="width:100%;text-align:center;">'+lblHighlightTask+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnSetReminder" class="Abut" onmouseover="fnSetButtonVars()" onmouseout="fnResetButtonVars()"  style="width:100%;text-align:center;">'+lblSetReminder+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnCloseReminderMene" class="Abut" onmouseclick="fnCloseReminderMenu(currTaskTblRowIndex)"  style="width:100%;text-align:center;">'+lblClose+'</button></TD></TR></TABLE></div>';
		else if (reminderFlag == "R")
			reminderText = '<div id="tooltipDiv" class="WNDcontainerModal"  onblur="fnCloseReminderMenu(currTaskTblRowIndex)" style="overflow:none;border:1px solid black"><TABLE class="TBLgrid" cellspacing="0" cellpadding="0" border="0" role="presentation" type="ME" style="overflow:auto;width:100%;"><TR class="TBLoneTRalt"><TD><button id="btnHighlight" class="Abut" onmouseover="fnSetButtonVars()" onmouseout="fnResetButtonVars()"  style="width:100%;text-align:center;">'+lblHighlightTask+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnViewReminder" class="Abut" onmouseover="fnSetButtonVars()" onmouseout="fnResetButtonVars()"  style="width:100%;text-align:center;">'+lblViewReminder+'</button></TD></TR><TR class="TBLoneTRalt"><TD><button id="btnDismissReminder" class="Abut" onmouseover="fnSetButtonVars()" onmouseout="fnResetButtonVars()" accesskey="3" style="width:100%;text-align:center;">'+lblDismissReminder+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnResetReminder" class="Abut" onmouseover="fnSetButtonVars()" onmouseout="fnResetButtonVars()" accesskey="4" style="width:100%;text-align:center;">'+lblResetReminder+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnCloseReminderMene" class="Abut" onmouseclick="fnCloseReminderMenu(currTaskTblRowIndex)"  style="width:100%;text-align:center;">'+lblClose+'</button></TD></TR></TABLE></div>';
		else if (reminderFlag == "G")
			reminderText = '<div id="tooltipDiv" class="WNDcontainerModal" onblur="fnCloseReminderMenu(currTaskTblRowIndex)" style="overflow:none;border:1px solid black"><TABLE class="TBLgrid" cellspacing="0" cellpadding="0" border="0" role="presentation" type="ME" style="overflow:auto;width:100%;"><TR class="TBLoneTRalt"><TD><button id="btnHighlight" class="Abut" onmouseover="fnSetButtonVars()" onmouseout="fnResetButtonVars()"  style="width:100%;text-align:center;">'+lblHighlightTask+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnViewReminder" class="Abut" onmouseover="fnSetButtonVars()" onmouseout="fnResetButtonVars()"  style="width:100%;text-align:center;">'+lblViewReminder+'r</button></TD></TR><TR class="TBLoneTRalt"><TD><button id="btnDismissReminder" class="Abut" onmouseover="fnSetButtonVars()" onmouseout="fnResetButtonVars()" accesskey="3" style="width:100%;text-align:center;">'+lblDismissReminder+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnResetReminder" class="Abut" onmouseover="fnSetButtonVars()" onmouseout="fnResetButtonVars()" accesskey="4" style="width:100%;text-align:center;">'+lblResetReminder+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnCloseReminderMene" class="Abut" onmouseclick="fnCloseReminderMenu(currTaskTblRowIndex)"  style="width:100%;text-align:center;">'+lblClose+'</button></TD></TR></TABLE></div>';  */
                if (reminderFlag == "B")
			reminderText = '<div id="tooltipDiv" class="WNDcontainerModal" onclick="fnCloseReminderMenu(currTaskTblRowIndex)"  style="overflow:none;border:1px solid black"  onmouseout ="fnCloseReminderFinal(event)"><TABLE class="TBLgrid" cellspacing="0" cellpadding="0" border="0" role="presentation" type="ME" style="overflow:auto;width:100%;"><TR class="TBLoneTRalt"><TD><button id="btnHighlight" class="Abut" onmouseover="fnSetButtonVars(id)" onmouseout="fnResetButtonVars()"  style="width:100%;text-align:center;">'+lblHighlightTask+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnSetReminder" class="Abut" onmouseover="fnSetButtonVars(id)" onmouseout="fnResetButtonVars()" style="width:100%;text-align:center;">'+lblSetReminder+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnCloseReminderMene" class="Abut" onmouseclick="fnCloseReminderMenu(currTaskTblRowIndex)" style="width:100%;text-align:center;">'+lblClose+'</button></TD></TR></TABLE></div>';
		else if (reminderFlag == "R")
			reminderText = '<div id="tooltipDiv" class="WNDcontainerModal"  onclick="fnCloseReminderMenu(currTaskTblRowIndex)" style="overflow:none;border:1px solid black"  onmouseout ="fnCloseReminderFinal(event)"><TABLE class="TBLgrid" cellspacing="0" cellpadding="0" border="0" role="presentation" type="ME" style="overflow:auto;width:100%;"><TR class="TBLoneTRalt"><TD><button id="btnHighlight" class="Abut" onmouseover="fnSetButtonVars(id)" onmouseout="fnResetButtonVars()"  style="width:100%;text-align:center;">'+lblHighlightTask+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnViewReminder" class="Abut" onmouseover="fnSetButtonVars(id)" onmouseout="fnResetButtonVars()" style="width:100%;text-align:center;">'+lblViewReminder+'</button></TD></TR><TR class="TBLoneTRalt"><TD><button id="btnDismissReminder" class="Abut" onmouseover="fnSetButtonVars(id)" onmouseout="fnResetButtonVars()" accesskey="3" style="width:100%;text-align:center;">'+lblDismissReminder+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnResetReminder" class="Abut" onmouseover="fnSetButtonVars(id)" onmouseout="fnResetButtonVars()" accesskey="4" style="width:100%;text-align:center;">'+lblResetReminder+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnCloseReminderMene" class="Abut" onclick="fnCloseReminderMenu(currTaskTblRowIndex)" style="width:100%;text-align:center;">'+lblClose+'</button></TD></TR></TABLE></div>';
		else if (reminderFlag == "G")
			reminderText = '<div id="tooltipDiv" class="WNDcontainerModal" onclick="fnCloseReminderMenu(currTaskTblRowIndex)" style="overflow:none;border:1px solid black"  onmouseout ="fnCloseReminderFinal(event)"><TABLE class="TBLgrid" cellspacing="0" cellpadding="0" border="0" role="presentation" type="ME" style="overflow:auto;width:100%;"><TR class="TBLoneTRalt"><TD><button id="btnHighlight" class="Abut" onmouseover="fnSetButtonVars(id)" onmouseout="fnResetButtonVars()"  style="width:100%;text-align:center;">'+lblHighlightTask+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnViewReminder" class="Abut" onmouseover="fnSetButtonVars(id)" onmouseout="fnResetButtonVars()"  style="width:100%;text-align:center;">'+lblViewReminder+'r</button></TD></TR><TR class="TBLoneTRalt"><TD><button id="btnDismissReminder" class="Abut" onmouseover="fnSetButtonVars(id)" onmouseout="fnResetButtonVars()" accesskey="3" style="width:100%;text-align:center;">'+lblDismissReminder+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnResetReminder" class="Abut" onmouseover="fnSetButtonVars(id)" onmouseout="fnResetButtonVars()" accesskey="4" style="width:100%;text-align:center;">'+lblResetReminder+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnCloseReminderMene" class="Abut" onclick="fnCloseReminderMenu(currTaskTblRowIndex)"  style="width:100%;text-align:center;">'+lblClose+'</button></TD></TR></TABLE></div>';
		//17062979  Changes Ends
		//HTML5 Changes End
                               
                }
                else
                    return;
	}
	else
	{
		var taskCntFlag = false;
		for (var index = 0; index < rowNum; index++)
		{
                    if (document.getElementById("tblTaskList").tBodies[0].rows[index].getAttribute('STATUS') != 'ACQUIRED')
                        tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked = false;
			if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true)
				taskCntFlag = true;
		}
		if (taskCntFlag == false)
			return;
//17062979  Changes Starts
/*		reminderText = '<div id="tooltipDiv" class="WNDcontainerModal" onblur="fnCloseReminderMenu(currTaskTblRowIndex)" style="overflow:none;border:1px solid black"><TABLE class="TBLgrid" cellspacing="0" cellpadding="0" border="0" role="presentation" type="ME" style="overflow:auto;width:100%;"><TR class="TBLoneTRalt"><TD><button id="btnHighlight" class="Abut" onmouseover="fnSetButtonVars()" onmouseout="fnResetButtonVars()"  style="width:100%;text-align:center;">'+lblHighlightTask+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnSetReminder" class="Abut" onmouseover="fnSetButtonVars()" onmouseout="fnResetButtonVars()"  style="width:100%;text-align:center;">'+lblSetResetReminder+'</button></TD></TR><TR class="TBLoneTRalt"><TD><button id="btnDismissReminder" class="Abut" onmouseover="fnSetButtonVars()" onmouseout="fnResetButtonVars()" accesskey="3" style="width:100%;text-align:center;">'+lblDismissReminders+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnCloseReminderMene" class="Abut" onmouseclick="fnCloseReminderMenu(currTaskTblRowIndex)"  style="width:100%;text-align:center;">'+lblClose+'</button></TD></TR></TABLE></div>';*/
reminderText = '<div id="tooltipDiv" class="WNDcontainerModal" onclick="fnCloseReminderMenu(currTaskTblRowIndex)" style="overflow:none;border:1px solid black"  onmouseout ="fnCloseReminderFinal(event)"><TABLE class="TBLgrid" cellspacing="0" cellpadding="0" border="0" role="presentation" type="ME" style="overflow:auto;width:100%;"><TR class="TBLoneTRalt"><TD><button id="btnHighlight" class="Abut" onmouseover="fnSetButtonVars(id)" onmouseout="fnResetButtonVars()"  style="width:100%;text-align:center;">'+lblHighlightTask+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnSetReminder" class="Abut" onmouseover="fnSetButtonVars(id)" onmouseout="fnResetButtonVars()"  style="width:100%;text-align:center;">'+lblSetResetReminder+'</button></TD></TR><TR class="TBLoneTRalt"><TD><button id="btnDismissReminder" class="Abut" onmouseover="fnSetButtonVars(id)" onmouseout="fnResetButtonVars()" accesskey="3" style="width:100%;text-align:center;">'+lblDismissReminders+'</button></TD></TR><TR class="TBLoneTR"><TD><button id="btnCloseReminderMene" class="Abut" onclick="fnCloseReminderMenu(currTaskTblRowIndex)"  style="width:100%;text-align:center;">'+lblClose+'</button></TD></TR></TABLE></div>';
//17062979  Changes Ends
	}
	if(document.getElementById("reminder_tooltip") ==null){
		var customWin = document.createElement("fieldset");
		customWin.id = "reminder_tooltip";
		customWin.className = "FSTcell";
		customWin.type ="ME";
		customWin.view ="ME";
		customWin.style.position = "absolute";
		customWin.innerHTML ='<div id="reminder_tooltip_content">';
		document.getElementById("vTabDB_DASHBOARD").appendChild(customWin);
	}
        var obj = document.getElementById('reminder_tooltip');
        var obj2 = document.getElementById('reminder_tooltip_content');
		obj2.innerHTML = reminderText;
        obj.style.display = 'block';
				//17062979  Changes Starts
       // var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
       // if(navigator.userAgent.toLowerCase().indexOf('safari')>=0)st=0; 
	   // obj.style.left = (event.x) + 'px';
       //  obj.style.top = (event.y) + 'px';	
/*
obj.style.left = e.clientX - document.getElementById("vtabMin").style.left.replace('px','') + 'px';
obj.style.top =  e.clientY - document.getElementById("vtabMin").style.top.replace('px','') + 'px';
*/
obj.style.left = e.clientX - document.getElementById('vTabCN_CENTRAL_PROCESS').clientWidth -10 + 'px';
obj.style.top = e.clientY - document.getElementById("masthead").offsetHeight - document.getElementById("menuHeaderDiv").offsetHeight -10 + 'px';;
		//17062979  Changes Ends
        document.getElementById("tooltipDiv").focus();
        return true;
}
//17062979  Changes Starts
/*function fnSetButtonVars() {
        gButtonId = event.srcElement.id;
}*/
function fnSetButtonVars(id) {
        gButtonId = id;
}
//17062979  Changes Ends
function fnResetButtonVars() {
        gButtonId = "";
}
function fnHighlightTask(rowIndex) {
	if (rowIndex == -1)
	{
		var tempTasksDOM = gTasksDOM;
		var tableRef = document.getElementById("tblTaskList").tBodies[0];
		var rowNum = tableRef.rows.length;
		for (var index = 0; index < rowNum; index++) 
		{
			if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true)
			{
				if(tableRef.rows[index].style.backgroundColor == "")
				{
					tableRef.rows[index].style.backgroundColor = '#658ECB';
					highlightedTasks[tableRef.rows[index].getAttribute("TASKID")] =  'H';
				}
				else
				{
					tableRef.rows[index].style.backgroundColor = "";
					highlightedTasks[tableRef.rows[index].getAttribute("TASKID")] = '';
				}
			}
		}
	}
	else
	{
	if(document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].style.backgroundColor == "")
		{
		document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].style.backgroundColor = '#658ECB';
			highlightedTasks[document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute("TASKID")] =  'H';
		}
	else
		{
		document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].style.backgroundColor = "";
			highlightedTasks[document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute("TASKID")] = '';
		}
	}
}

function fnViewReminder(rowIndex, isDashBoard) {
	var taskId = document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute('TASKID');
        var reminderDate = getNodeText(selectSingleNode(gTasksDOM, "//Tasks/Task[@ID='"+taskId+"']/PROTECTEDDATEATTRIBUTE1"));
        var taskComments = "";
	if (getNodeText(selectSingleNode(gTasksDOM, "//Tasks/Task[@ID='"+taskId+"']/PROTECTEDTEXTATTRIBUTE1"))!= "null")
		taskComments = getNodeText(selectSingleNode(gTasksDOM, "//Tasks/Task[@ID='"+taskId+"']/PROTECTEDTEXTATTRIBUTE1"));
		var msgType = "I";
		var errcode = "OR-INF-002" + "~" + "OR-INF-003";
		var msg = reminderDate + "~" + taskComments;
		if(!isDashBoard)
		{
			mask();
			showErrorAlerts(errcode, msgType, msg);
		}
		else
		{
			showErrorAlerts(errcode, msgType, msg);
			parent.gAlertMessage = gAlertMessage;
		}
	}	
//17062979  Changes Starts
function fnCloseReminderFinal(event){
	if (!e) 
		var e = window.event  || event;
	var tg = (window.event) ? e.srcElement : e.target;
	var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
	while (reltg != tg && reltg.nodeName != 'BODY' && reltg.id != 'tooltipDiv')
		reltg= reltg.parentNode;
	if(reltg != tg && reltg.id != 'tooltipDiv')
		document.getElementById('reminder_tooltip').style.display = 'none';
}
//17062979  Changes Ends
function fnCloseReminderMenu(rowIndex) {
	try{
		document.getElementById('reminder_tooltip').style.display = 'none';
                NewTaskList[document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute('taskid')]=false;
	}
	catch (e){}
        if (gButtonId == "btnHighlight")
            fnHighlightTask(rowIndex);
        else if (gButtonId == "btnSetReminder" || gButtonId == "btnResetReminder")
            fnSetReminder(rowIndex);
        else if (gButtonId == "btnDismissReminder")
            fnDismissReminder(rowIndex);
        else if (gButtonId == "btnViewReminder")
            fnViewReminder(rowIndex, false);
}
function fnDismissReminder(rowIndex) {
	var taskIdList = '';
	var taskIndexList = '';
	var taskIdArr = '';
	var taskIndexArr = '';
	if (rowIndex == -1)
	{
		var tempTasksDOM = gTasksDOM;
		var tableRef = document.getElementById("tblTaskList").tBodies[0];
		var rowNum = tableRef.rows.length;
		for (var index = 0; index < rowNum; index++) 
		{
			if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true)
			{
				taskIdList = taskIdList + tableRef.rows[index].getAttribute('TASKID') + '~';
				taskIndexList = taskIndexList + index + '~';
			}
		}
	}
	else
	{
		taskIdList = document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute('TASKID') + '~';
		taskIndexList = taskIndexList + rowIndex + '~';
	}
	if (taskIdList != '')
	{
		var msg = '';
		var taskActionDOM = fnDoAction(taskIdList, 'DISMISS_REMINDER');
		if (selectSingleNode(taskActionDOM, "//RESPONSE"))
		{
			taskIdArr = taskIdList.split("~");
			taskIndexArr = taskIndexList.split("~");
			for (var idx=0; idx <taskIdArr.length -1; idx++)
			{
				document.getElementById("tblTaskList").tBodies[0].rows[taskIndexArr[idx]].setAttribute("REMINDERFLAG", "B");
				setNodeText(selectSingleNode(gTasksDOM, "//Tasks/Task[@ID='"+taskIdArr[idx]+"']/PROTECTEDDATEATTRIBUTE1"), "");
				setNodeText(selectSingleNode(gTasksDOM, "//Tasks/Task[@ID='"+taskIdArr[idx]+"']/PROTECTEDTEXTATTRIBUTE1"), "");
                    document.getElementById("tblTaskList").tBodies[0].rows[taskIndexArr[idx]].cells[1].innerHTML = '<button id="btnReminder" class="Abut" onclick="fnReminder(event)" ><img src="'+ imgLocation + imgReminder +'" alt="'+lblSetResetReminder+'"/></button>';
                                NewTaskList[taskIdArr[idx]] =false;
                                showRemoveReminder(taskIdArr[idx]);	//1203_OR_CHANGES 
			}
			unmask();
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
			mask();
			showAlerts(fnBuildAlertXML(errcode, msgType,msg), msgType);
			alertAction = "UNMASK";
			fnBpelRefresh();
		}
	}
}
function fnSetReminder(rowIndex) {
	var l_Params  = "&g_txnBranch=" +mainWin.CurrentBranch;
	l_Params += "&rowIndex=" +rowIndex;
	l_Params += "&appDate=" +mainWin.AppDate;
        l_Params += "&isFromAlert=false";	//12.1 Retro_Changes
        l_Params += "&appFormatedDate=" +mainWin.formattedDate;	
try {
		mask();
		loadSubScreenDIV("ChildWin", "WFReminder.jsp?"+l_Params);
	} catch (e) {
		alert(scriptError);
	}
}
//12.1 Retro_Changes starts
var reminderAlert_fnCloseReminder;
function fnAlertWinCloseReminder(taskIdList){
    reminderAlert_fnCloseReminder(true,taskIdList,comments);
}
//12.1 Retro_Changes ends
function fnCloseReminder(processFlag, rowIndex, src) {	   //1203_OR_CHANGES
	var taskIdList = '';
	var taskIndexList = '';
	var taskIdArr = '';
	var taskIndexArr = '';
	unmask();
	var childDivObj = document.getElementById("ChildWin");
/*
        if (navigator.userAgent.toLowerCase().indexOf("opera") != -1)
		childDivObj.parentNode.removeChild(childDivObj);
	else {
		childDivObj.getElementsByTagName("IFRAME")[0].src = "";
		document.getElementById("Div_ChildWin").removeChild(childDivObj);
	}*/
	if (processFlag)
	{
		if (rowIndex == -1)
		{
			var tableRef = document.getElementById("tblTaskList").tBodies[0];
			var rowNum = tableRef.rows.length;
			for (var index = 0; index < rowNum; index++) 
			{
				if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true)
				{
					taskIdList = taskIdList + tableRef.rows[index].getAttribute('TASKID') + '~';
					taskIndexList = taskIndexList + index + '~';
				}
			}
		}
		else
		{
                    if(src == "TASK")	  //12.1 Retro_Changes
                    {					  //12.1 Retro_Changes
			taskIdList = document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute('TASKID') + '~';
			taskIndexList = taskIndexList + rowIndex + '~';
                    }					   //12.1 Retro_Changes
                    else {				   //12.1 Retro_Changes
                        taskIdList = src;	//12.1 Retro_Changes
                    }					   //12.1 Retro_Changes
		}
		if (taskIdList != '')
		{
			var msg = '';
			var taskActionDOM = fnDoAction(taskIdList, 'SET_REMINDER', comments);
			if (selectSingleNode(taskActionDOM, "//RESPONSE"))
			{
				msg = getNodeText(selectSingleNode(taskActionDOM, "//RESPONSE"));
				var reminderValues = msg.split("~");
				taskIdArr = taskIdList.split("~");
				taskIndexArr = taskIndexList.split("~");
				for (var idx=0; idx <taskIdArr.length -1; idx++)
				{
//12.1 Retro_Changes starts
					var tempArray =new Array();
					try{
					tempArray[0] =document.getElementById("tblTaskList").tBodies[0].rows[taskIndexArr[idx]].getAttribute('wfrefno');
					tempArray[1] =comments.split('||')[1];
					tempArray[2] =comments.split('||')[0].replace(/\s/g, '-').replace(/:/g,'-');
					tempArray[3] =taskIdArr[idx];
					tempArray[4] ='DISMISS,RESET';
					tempArray[5] =document.getElementById("tblTaskList").tBodies[0].rows[taskIndexArr[idx]].getAttribute('funcid');
					}catch(e){}
					 //   reminderAlertArray[reminderAlertArray.length] = tempArray;                                        
//12.1 Retro_Changes ends
                                        if(src == "TASK")
                                        {
					document.getElementById("tblTaskList").tBodies[0].rows[taskIndexArr[idx]].setAttribute("REMINDERFLAG", reminderValues[0]);
					setNodeText(selectSingleNode(gTasksDOM, "//Tasks/Task[@ID='"+taskIdArr[idx]+"']/PROTECTEDDATEATTRIBUTE1"), reminderValues[1]);
					setNodeText(selectSingleNode(gTasksDOM, "//Tasks/Task[@ID='"+taskIdArr[idx]+"']/PROTECTEDTEXTATTRIBUTE1"), reminderValues[2]);
					var reminderFlag = document.getElementById("tblTaskList").tBodies[0].rows[taskIndexArr[idx]].getAttribute('REMINDERFLAG');
					if (reminderFlag == "B")
                            document.getElementById("tblTaskList").tBodies[0].rows[taskIndexArr[idx]].cells[1].innerHTML = '<button id="btnReminder" class="Abut" onclick="fnReminder(event)" ><img src="'+ imgLocation + imgReminder +'" alt="'+lblSetResetReminder+'"/></button>';
					else if (reminderFlag == "R")
					document.getElementById("tblTaskList").tBodies[0].rows[taskIndexArr[idx]].cells[1].innerHTML = '<button id="btnReminder" class="Abut" onclick="fnReminder(event)" ><img src="'+ imgLocation + imgRedFlag +'" alt="'+lblSetResetReminder+'"/></button>';
					else if (reminderFlag == "G")
					document.getElementById("tblTaskList").tBodies[0].rows[taskIndexArr[idx]].cells[1].innerHTML = '<button id="btnReminder" class="Abut" onclick="fnReminder(event)" ><img src="'+ imgLocation + imgGreenFlag +'" alt="'+lblSetResetReminder+'"/></button>';
				}else{
					parent.deleteProcessed('','','');
					parent.countRefresh();				
				}
				}	//12.1 Retro_Changes
				unmask();
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
				mask();
				showAlerts(fnBuildAlertXML(errcode, msgType,msg), msgType);
				alertAction = "UNMASK";
				fnBpelRefresh();
			}
		}
	}
       if (getBrowser().indexOf("OPERA") != -1)//ie11 changes
		childDivObj.parentNode.removeChild(childDivObj);
	else {
		childDivObj.getElementsByTagName("IFRAME")[0].src = "";
		document.getElementById("Div_ChildWin").removeChild(childDivObj);
	}
}
//12.0.2 Changes End Here
function populateTableData(tasksDom, isSearch) {
    fnEnableDisableActionButton('N', 'N', 'N', 'N','N','N'); //12.0.2 Changes
    var tasks = selectNodes(tasksDom, "//TaskMsg/Tasks/Task");
    var taskLength = tasks.length;
    var tableRef = document.getElementById("tblTaskList").tBodies[0];
    var tableHeader = document.getElementById("tblTaskList").tHead; // CTCB
    if (taskLength == 0) 
        return false;
    // Delete Header Rows
    deleteAllRows("tblTaskList", true);
    //deleteAllRows("tblTaskHistory", false); //12.0.2 Changes
    deleteAllRows("tblTaskHistory", true); //12.0.2 Changes

    var bpelTaskSearch = parent.bpelTaskSearch;
    var tempDoc = loadXMLDoc(bpelTaskSearch);
    var processCodesArr = new Array();
    processCodesArr[0] = 'ALL';
    if (isTaskSearch) {
        if (pCode != 'ALL') 
            processCodesArr[1] = pCode;
    }
    var newCell;
    var newRow = document.createElement("TR");
    tableHeader.appendChild(newRow);
    var headerColArr = new Array();
    var headerColTagArr = new Array();//12.0.2 Changes

    newCell = document.createElement("TH");
    newCell.setAttribute("CLASS", 'TBLoneTH1');
    newCell.innerHTML = '<label class="LBLauto" for="Checkbox"><INPUT TYPE="CHECKBOX" id="Checkbox1" CLASS = "CHKStd"/><span class=\"LBLinv\">'+mainWin.getItemDesc("LBL_SELECT_ALL")+'</span></label>';
    addEvent(newCell, 'onclick', 'fnCheckAllTasks()');
    newRow.appendChild(newCell);
    //12.0.2 Changes Start Here
    newCell = document.createElement("TH");
    newCell.setAttribute("CLASS", 'TBLoneTH');
    //newCell.innerHTML = '<button id="btnReminder" class="Abut"><img src="Images/greyflag.gif" alt="Set-Reset Reminder"/></button>';
    newCell.innerHTML = '<button id="btnReminder" class="Abut" onclick="fnReminder(event)" ><img src="'+ imgLocation + imgReminder +'" alt="'+lblSetResetReminder+'"/></button>';
    newRow.appendChild(newCell);
    //12.0.2 Changes End Here

    // Build Header of Task
    for (index = 0; index < processCodesArr.length; index++) {
        if (processCodesArr[index] != "") {
            for (i = 0; i < selectSingleNode(tempDoc, "PROCESS_CODES/" + processCodesArr[index]).childNodes.length; i++) {
                var tempArray = getNodeText(selectSingleNode(tempDoc, "PROCESS_CODES/" + processCodesArr[index]).childNodes[i]).split("~");
                if ((isSearch == 'Y' && tempArray[4] == 'Y') || (tempArray[5] == 'Y' && isSearch == 'N')) {
                    var headerCount = headerColArr.length;
                    //12.0.2 Changes
                    //headerColArr[headerCount++] = tempArray[1];
                    headerColArr[headerCount] = tempArray[1];
                    //12.0.2 Changes Ends
                    var headText = mainWin.getItemDesc(tempArray[1]);
                    newCell = document.createElement("TH");
                    newCell.className = "TBLoneTH";
                    newCell.innerHTML = "<A CLASS=Astd><span class=\"SPNup hide\">&nbsp;&nbsp;&nbsp;&nbsp;</span>" + headText + "</A>";
                    addEvent(newCell, "onclick", "FnSortTask(event)");
                    if (tempArray[2] == 'null' && tempArray[3] == 'null') {
                        newCell.id = tempArray[0];
                    } else {
                        newCell.id = tempArray[2] + 'ATTRIBUTE' + tempArray[3];
                    }
                    headerColTagArr[headerCount] = newCell.id; //12.0.2 Changes
                    if (tasksDom && selectSingleNode(tasksDom, "//TaskMsg").getAttribute("sortField") == newCell.id) {
                        var image = document.createElement("img");
                        if (selectSingleNode(tasksDom, "//TaskMsg").getAttribute("sortOrder") == "ASCENDING") 
                            image.setAttribute("src", mainWin.theme_imagesPath+"/Icons/up.gif");
                        else 
                            image.setAttribute("src", mainWin.theme_imagesPath+"/Icons/down.gif");
                        newCell.appendChild(image);
                    }
                    newRow.appendChild(newCell);
                    headerCount++;//12.0.2 Changes
                }
            }
        }
    }
    deleteAllRows("tblTaskList");

    // Add new rows to the task table for the number of
    // tasks in the task XML DOM.
    newRow = null;
    for (var taskIndex = 0; taskIndex < taskLength; taskIndex++) {
        rowHTML = '';
        taskId = tasks[taskIndex].getAttribute("ID");
        funcId = tasks[taskIndex].getAttribute("FID");
        var tat_status = tasks[taskIndex].getAttribute("TATSTATUS");//12.1 Changes
//12.0.2 Changes Starts
		var instanceId = tasks[taskIndex].getAttribute("INSTANCEID");
		var workflowRefNo = tasks[taskIndex].getAttribute("WFREFNO");
var reminderFlag = tasks[taskIndex].getAttribute("REMINDERFLAG");
//12.0.2 Changes Ends
        statusNode = selectSingleNode(tasks[taskIndex], "TaskActions").getAttribute("Status");
        if (funcId != 'PRDEXCEP') {
            newRow = document.createElement("TR");
            if (taskIndex % 2 == 1) {
                newRow.className = "TBLoneTRalt";
            } else 
                newRow.className = "TBLoneTR";
            newRow.setAttribute("FUNCID", funcId);
            newRow.setAttribute("STATUS", statusNode);
            newRow.setAttribute("TASKID", taskId);
            if(tat_status == 'WARNING')
                newRow.setAttribute("style", "BACKGROUND: #FFDF9C;");
            else if (tat_status == 'ESCALATED')
                newRow.setAttribute("style", "BACKGROUND: #FDB8B8;");
            newRow.setAttribute("TASKID", taskId);
//12.0.2 Changes Starts
            newRow.setAttribute("INSTANCEID", instanceId);
			newRow.setAttribute("WFREFNO", workflowRefNo); 
newRow.setAttribute("REMINDERFLAG", reminderFlag);
//12.0.2 Changes Ends
            addEvent(newRow, "onclick", "fnViewTaskHistory(event)");
            tableRef.appendChild(newRow);
            var colLen = tasks[taskIndex].childNodes.length;
            var cellNum = 0;
            newRow.insertCell(-1);
            tableRef.rows[taskIndex].cells[0].setAttribute("CLASS", 'TBLoneTD1');
            tableRef.rows[taskIndex].cells[0].innerHTML = '<label class="LBLauto" for="Checkbox"><INPUT TYPE="CHECKBOX" id="Checkbox2" CLASS="CHKStd" onclick="fnHandleActionBtns()"/><span class=\"LBLinv\"></span></label>';
            cellNum++;
//12.0.2 Changes Starts
            var taskColumnIdx = 0;
            newRow.insertCell(-1);
            var remFlag = imgReminder;
            if (statusNode != "ACQUIRED")
                remFlag = imgReminder;
            else if (reminderFlag == "R")
                remFlag = imgRedFlag;
            else if (reminderFlag == "G")
                remFlag = imgGreenFlag;
            else
                remFlag = imgReminder;
            tableRef.rows[taskIndex].cells[1].innerHTML = '<button id="btnReminder" class="Abut" onclick="fnReminder(event)"  alt="'+lblSetResetReminder+'" ><img src="'+ imgLocation + remFlag +'" alt="'+lblSetResetReminder+'"/></button>';
            cellNum++;
            var taskColumnIdx = 0;
            //12.0.2 Changes Ends
            for (var taskColumnCnt = 0; taskColumnCnt < colLen; taskColumnCnt++) {
                try {
                    if (taskColumnCnt < colLen - 1) {
//12.0.2 Changes Starts
                    	//if (typeof(headerColArr[taskColumnCnt]) != "undefined") { //Jeev Changes
                        if (typeof(headerColArr[taskColumnIdx]) != "undefined" && headerColTagArr[taskColumnIdx] == tasks[taskIndex].childNodes[taskColumnCnt].tagName.toUpperCase()) { //Jeev Changes
//12.0.2 Changes Ends
                            newRow.insertCell(-1);
                            var value = checkForNull(getNodeText(tasks[taskIndex].childNodes[taskColumnCnt]));
				if(headerColTagArr[taskColumnIdx] == 'TEXTATTRIBUTE8'){
				 if(value=='H'){
									value =mainWin.getItemDesc("LBL_HIGH");
								}else if(value=='M'){
									value =mainWin.getItemDesc("LBL_MEDIUM");
								}else{
									value =mainWin.getItemDesc("LBL_LOW");
				  }
				}
                            if (value == '') value = '&nbsp';
                            /*9NT1525_11.4_EGPNBE_14586740 Changes Start Here*/
                            /*if (tasks[taskIndex].childNodes[taskColumnCnt].tagName == "CustId") {
                                if (value == "H") value = mainWin.getItemDesc("LBL_HIGH");
                                if (value == "M") value = mainWin.getItemDesc("LBL_MEDIUM");
                                if (value == "L") value = mainWin.getItemDesc("LBL_LOW");
                            } */
                            /*9NT1525_11.4_EGPNBE_14586740 Changes End Here*/
                            if (tasks[taskIndex].childNodes[taskColumnCnt].nodeName.indexOf("NUMBER") != -1) {
                                if (Number(value) != 0) {
                                    tableRef.rows[taskIndex].cells[cellNum].innerHTML ='<span CLASS="SPNtext" tabIndex='+taskColumnIdx+'>' + Number(value) + '</span>';;
                                }
                            } else if (tasks[taskIndex].childNodes[taskColumnCnt].nodeName.indexOf("DATE") != -1) {
                                var dateTime = value.split(" ");
                                var date = dateTime[0].split("-");
                                value = format(date[0], date[1] - 1, date[2]);
                                //tableRef.rows[taskIndex].cells[cellNum].innerHTML = '<span class="SPNtext" tabIndex='+taskColumnCnt+'>' + value + ' ' + dateTime[1] + ' ' + dateTime[2] + '</span>'; //12.0.2 Changes
                                tableRef.rows[taskIndex].cells[cellNum].innerHTML = '<span class="SPNtext" tabIndex='+taskColumnIdx+'>' + value + ' ' + dateTime[1] + ' ' + dateTime[2] + '</span>'; //12.0.2 Changes
                            } else {
                                //if (taskColumnCnt == 0 || taskColumnCnt == 1) { //12.0.2 Changes
                                if (taskColumnIdx == 0 || taskColumnIdx == 1) { //12.0.2 Changes
                                    tableRef.rows[taskIndex].cells[cellNum].innerHTML = '<a class="Astd" href=\"#\" onclick="showFunctionId(' + taskIndex + ', event);">' + value + '</a>';
                                } else {
                                    //tableRef.rows[taskIndex].cells[cellNum].innerHTML = '<span CLASS="SPNtext" tabIndex='+taskColumnCnt+'>' + value + '</span>'; //12.0.2 Changes
                                    tableRef.rows[taskIndex].cells[cellNum].innerHTML = '<span CLASS="SPNtext" tabIndex='+taskColumnIdx+'>' + value + '</span>'; //12.0.2 Changes
                                }
                            }
                            cellNum++;
                            taskColumnIdx++;//12.0.2 Changes
                        }
                    } else {
                        var actions = checkForNull(getNodeText(tasks[taskIndex].childNodes[taskColumnCnt]));
                        newRow.setAttribute("OUTCOMES", actions);
                    }
                } catch(e) {}
            }
		if (highlightedTasks[tableRef.rows[taskIndex].getAttribute("TASKID")] == "H" && currentTaskTab =='ACQUIRED') {
			tableRef.rows[taskIndex].style.backgroundColor = '#658ECB';
		}
        }
        if ( tasks[taskIndex].getAttribute("NEWTASK") == "true" && (NewTaskList[taskId] == undefined || NewTaskList[taskId] ) && (currentTaskTab == 'ASSIGNED' || currentTaskTab == 'ACQUIRED')) {
            var tableRef = document.getElementById("tblTaskList").tBodies[0];
            var rowNum = tableRef.rows.length;

            //for (var indexR = 0;indexR < rowNum;indexR++) {
                var cellNum = tableRef.rows[taskIndex].cells.length;
                //tableRef.rows[taskIndex].style.backgroundColor = '';//12.1 Changes
                for (var indexC = 0;indexC < cellNum;indexC++) {
                    if (tableRef.rows[taskIndex].cells[indexC].getElementsByTagName("SPAN")[0] != 'undefined' && tableRef.rows[taskIndex].cells[indexC].getElementsByTagName("SPAN")[0] != '' && tableRef.rows[taskIndex].cells[indexC].getElementsByTagName("SPAN")[0] != null) {
                        tableRef.rows[taskIndex].cells[indexC].getElementsByTagName("SPAN")[0].style.fontWeight = "bold";
						
                    }
                    else if (tableRef.rows[taskIndex].cells[indexC] != 'undefined' && tableRef.rows[taskIndex].cells[indexC] != '' && tableRef.rows[taskIndex].cells[indexC] != null) {
                        tableRef.rows[taskIndex].cells[indexC].style.fontWeight = "bold";
                        /*if (tableRef.rows[taskIndex].cells[indexC].getElementsByTagName("img")[0])
                            tableRef.rows[taskIndex].cells[indexC].getElementsByTagName("img")[0].src = imgLocation + imgNewTask;*/
                    }
                }
            //}
        }
    }
    document.getElementById("BPELTaskDetails").style.display = "block";
    var clientHeight = document.body.clientHeight;
    var customSearchHeight = 0;
    document.getElementById("BPELTaskDetails").style.display = "block";
    if (document.getElementById("TBLPageidCustomSearch").style.display == 'block') {
        customSearchHeight = document.getElementById("TBTaskSearch").offsetHeight + document.getElementById("TaskSearchHeader").offsetHeight;
        document.getElementById("BPELTaskDetails").style.height = ((clientHeight - customSearchHeight) / 2) + 'px';
	 document.getElementById('BPELTaskHistoryDetails').style.height = document.getElementById('DIVTabContentDBoardTasks').clientHeight - 130 - ((clientHeight - customSearchHeight) / 2) + 'px';
    } else {
        document.getElementById("BPELTaskDetails").style.height = (clientHeight - (clientHeight / 2)) + 'px';
	document.getElementById('BPELTaskHistoryDetails').style.height = document.getElementById('DIVTabContentDBoardTasks').clientHeight - 130 - (clientHeight - (clientHeight / 2)) + 'px';
    }
    return true;
}

var newTasksDOM = "";

function fnLoadXml() {
    newTasksDOM = loadXMLDoc(tasklistXml);
    selectNodes(newTasksDOM, "//*[Status='ACQUIRED' and AcquiredBy != '' and AcquiredBy != '" + mainWin.UserId + "']").removeAll();
}
/*
 * To refresh the no of tasks each time new task arrives...
 */
//Call to this method not detected yet
function fnRefreshTaskDetails() {
    window.setInterval("fnLoadXml()", 3600);

    // Summary Tasks....
    var noOfAssignedTasks = null;
    var assignedTaskList = null;
    var noOfCompletedTasks = null;
    var completedTaskList = null;
    var noOfAvailableTasks = null;
    var availableTaskList = null;
    var noOfExpiredTasks = null;
    var expiredTaskList = null;
    
    assignedTaskList = selectNodes(newTasksDOM, "//TaskMsg/Tasks/Task[Status = 'ASSIGNED']");
    noOfAssignedTasks = assignedTaskList.length;
    document.getElementById("headerForPending").innerText = "Pending(" + noOfAssignedTasks + ")";
    
    completedTaskList = selectNodes(newTasksDOM, "//TaskMsg/Tasks/Task[Status = 'COMPLETED']");
    noOfCompletedTasks = completedTaskList.length;
    document.getElementById("headerForCompleted").innerText = "Completed(" + noOfCompletedTasks + ")";
    
    availableTaskList = selectNodes(newTasksDOM, "//TaskMsg/Tasks/Task[Status = 'ACQUIRED']");
    noOfAvailableTasks = availableTaskList.length;
    document.getElementById("headerForAcquired").innerText = "Acquired(" + noOfAvailableTasks + ")";
    
    expiredTaskList = selectNodes(newTasksDOM, "//TaskMsg/Tasks/Task[Status = 'ALERTED']");
    noOfExpiredTasks = expiredTaskList.length;
    document.getElementById("headerForExpired").innerText = "Expired(" + noOfExpiredTasks + ")";
    
    // High Priority Tasks....
    var noOfAssignedHighPriorityTasks = null;
    var highPriorityAssignedTaskList = null;
    var noOfCompletedHighPriorityTasks = null;
    var highPriorityCompletedTaskList = null;
    var noOfAvailableHighPriorityTasks = null;
    var highPriorityAvailableTaskList = null;
    var noOfExpiredHighPriorityTasks = null;
    var highPriorityExpiredTaskList = null;
    
    highPriorityAssignedTaskList = selectNodes(newTasksDOM, "//TaskMsg/Tasks/Task[Priority = '1' and Status = 'ASSIGNED']");
    noOfAssignedHighPriorityTasks = highPriorityAssignedTaskList.length;
    document.getElementById("tableForAssigned").tBodies[0].rows[0].cells[0].innerText = "HighPriority(" + noOfAssignedHighPriorityTasks + ")";
    
    highPriorityCompletedTaskList = selectNodes(newTasksDOM, "//TaskMsg/Tasks/Task[Priority = '1' and Status = 'COMPLETED']");
    noOfCompletedHighPriorityTasks = highPriorityCompletedTaskList.length;
    document.getElementById("tableForCompleted").tBodies[0].rows[0].cells[0].innerText = "HighPriority(" + noOfCompletedHighPriorityTasks + ")";
    
    highPriorityAvailableTaskList = selectNodes(newTasksDOM, "//TaskMsg/Tasks/Task[Priority = '1' and Status = 'AVAILABLE']");
    noOfAvailableHighPriorityTasks = highPriorityAvailableTaskList.length;
    document.getElementById("tableForAvailable").tBodies[0].rows[0].cells[0].innerText = "HighPriority(" + noOfAvailableHighPriorityTasks + ")";
    
    highPriorityExpiredTaskList = selectNodes(newTasksDOM, "//TaskMsg/Tasks/Task[Priority = '1' and Status = 'EXPIRED']");
    noOfExpiredHighPriorityTasks = highPriorityExpiredTaskList.length;
    document.getElementById("tableForExpired").tBodies[0].rows[0].cells[0].innerText = "HighPriority(" + noOfExpiredHighPriorityTasks + ")";
    
    // Other Low Priority Tasks....
    var noOfAssignedLowPriorityTasks = null;
    var lowPriorityAssignedTaskList = null;
    var noOfCompletedLowPriorityTasks = null;
    var lowPriorityCompletedTaskList = null;
    var noOfAvailableLowPriorityTasks = null;

    var lowPriorityAvailableTaskList = null;
    var noOfExpiredLowPriorityTasks = null;
    var lowPriorityExpiredTaskList = null;
    
    lowPriorityAssignedTaskList = selectNodes(newTasksDOM, "//TaskMsg/Tasks/Task[Priority != '1' and Status = 'ASSIGNED']");
    noOfAssignedLowPriorityTasks = lowPriorityAssignedTaskList.length;
    document.getElementById("tableForAssigned").tBodies[0].rows[1].cells[0].innerText = "Others(" + noOfAssignedLowPriorityTasks + ")";
    
    lowPriorityCompletedTaskList = selectNodes(newTasksDOM, "//TaskMsg/Tasks/Task[Priority != '1' and Status = 'COMPLETED']");
    noOfCompletedLowPriorityTasks = lowPriorityCompletedTaskList.length;
    document.getElementById("tableForCompleted").tBodies[0].rows[1].cells[0].innerText = "Others(" + noOfCompletedLowPriorityTasks + ")";
    
    lowPriorityAvailableTaskList = selectNodes(newTasksDOM, "//TaskMsg/Tasks/Task[Priority != '1' and Status = 'AVAILABLE']");
    noOfAvailableLowPriorityTasks = lowPriorityAvailableTaskList.length;
    document.getElementById("tableForAvailable").tBodies[0].rows[1].cells[0].innerText = "Others(" + noOfAvailableLowPriorityTasks + ")";
    
    lowPriorityExpiredTaskList = selectNodes(newTasksDOM, "//TaskMsg/Tasks/Task[Priority != '1' and Status = 'EXPIRED']");
    noOfExpiredLowPriorityTasks = lowPriorityExpiredTaskList.length;
    document.getElementById("tableForExpired").tBodies[0].rows[1].cells[0].innerText = "Others(" + noOfExpiredLowPriorityTasks + ")";
}

var loadCount = 0;
var flag;
/*
 * To refresh New Task Details....
 */
//Call to this method not detected yet
function fnRefreshNewTaskDetails() {
    var newTaskDetailsDOM = loadXMLDoc(tasklistXml);
    var noOfNewTasks = null;
    var noOfHighPriorityNewTasks = null;
    var noOfOtherNewTasks = null;

    var newTaskList = null;
    var highPriorityNewTaskList = null;
    var otherNewTaskList = null;
    newTaskList = selectNodes(newTaskDetailsDOM, "//TaskMsg/Tasks/Task");
    noOfNewTasks = newTaskList.length;
    highPriorityNewTaskList = selectNodes(newTaskDetailsDOM, "//TaskMsg/Tasks/Task[Priority = '1']");
    noOfHighPriorityNewTasks = highPriorityNewTaskList.length;
    otherNewTaskList = selectNodes(newTaskDetailsDOM, "//TaskMsg/Tasks/Task[Priority != '1']");
    noOfOtherNewTasks = otherNewTaskList.length;
}

//Call to this method not detected yet
function displayMyWindow() {
    if (taskSearch == "Y") {
        if (! (criteria == "" || criteria == "null")) {
            setNodeText(document.getElementById("idTAQuery"), criteria);
        }
    } else {
        document.getElementById("TBLPageidCustomSearch").style.display = 'none';
    }
    var priority = "NA";
    var isSearch = 'Y';
    if (! (criteria == "" || criteria == "null")) {
        if (populateTableData("", priority, isSearch)) {
            document.getElementById("tasksDiv").style.visibility = 'visible';
            hideImg();
            document.getElementById("imgtitle").style.visiblity = "hidden";
        } else {
            document.getElementById("tasksDiv").style.visibility = 'hidden';
            if (taskSearch != "Y") 
                alert(mainWin.getItemDesc("LBL_NO_TASKS_AVAILABLE"));
        }
    }
}

var ASCEND_IMG = 'Asc.gif';
var DESCENG_IMG = 'Desc.gif';
var IMG_PATH = 'Images/';

/*
 * To hide all the images...
 */
function hideImg() {
    if (document.getElementById("imgid").style.visibility == "visible") 
        document.getElementById("imgid").style.visibility = 'hidden';
    if (document.getElementById("imgtitle").style.visibility == "visible") 
        document.getElementById("imgtitle").style.visibility = 'hidden';
    if (document.getElementById("imgpriority").style.visibility == "visible") 
        document.getElementById("imgpriority").style.visibility = 'hidden';
    if (document.getElementById("imgdate").style.visibility == "visible") 
        document.getElementById("imgdate").style.visibility = 'hidden';
    if (document.getElementById("imgstatus").style.visibility == "visible") 
        document.getElementById("imgstatus").style.visibility = 'hidden';
    if (document.getElementById("imgassignee").style.visibility == "visible") 
        document.getElementById("imgassignee").style.visibility = 'hidden';
}

/*
 * To display the desc sorting image on click in that particular cell...
 */
//Call to this method not detected yet
function displayImg(tHeadObj, tableId, imgId, event) {
    hideImg();
    document.getElementById("imgtitle").style.visibility = 'hidden';
    document.getElementById(imgId).style.visibility = "visible";
    sortTable(tHeadObj, 'tblTaskList', event);
}

/*
 * To sort the table containg task details
 */
function sortTable(tHeadObj, tableId, evnt) {
    var imageObj = tHeadObj.getElementsByTagName("IMG")[0];
    var currImage = imageObj.nameProp;
    var sortOrder = true;
    if (currImage == ASCEND_IMG) {
        imageObj.src = IMG_PATH + DESCENG_IMG;
        sortOrder = false;
    } else {
        imageObj.src = IMG_PATH + ASCEND_IMG;
        sortOrder = true;
    }
    var tblRef = document.getElementById("tblTaskList").tBodies[0];
    var rowLength = tblRef.rows.length;
    var columnIndex = 0;
    var event = window.event || evnt;
    if (getEventSourceElement(event).tagName == 'TH') {
        columnIndex = getEventSourceElement(event).cellIndex;
    } else if (getEventSourceElement(event).tagName == 'IMG') {
        columnIndex = getEventSourceElement(event).parentElement.cellIndex;
    }
    for (var outerIndex = 0; outerIndex < rowLength; outerIndex++) {
        for (var innerIndex = outerIndex; innerIndex < rowLength; innerIndex++) {
            var outerVal = tblRef.rows[outerIndex].cells[columnIndex].innerText;
            var innerVal = tblRef.rows[innerIndex].cells[columnIndex].innerText;
            if (sortOrder) {
                if (outerVal.toUpperCase() < innerVal.toUpperCase()) {
                    var outerRef = tblRef.rows[outerIndex];
                    var innerRef = tblRef.rows[innerIndex];
                    var colLength = tblRef.rows[innerIndex].cells.length;
                    for (var cellIndex = 0; cellIndex < colLength; cellIndex++) {
                        var thtml = outerRef.cells[cellIndex].innerHTML;
                        outerRef.cells[cellIndex].innerHTML = innerRef.cells[cellIndex].innerHTML;
                        innerRef.cells[cellIndex].innerHTML = thtml;
                    }
                }
            } else {
                if (outerVal.toUpperCase() > innerVal.toUpperCase()) {
                    var outerRef = tblRef.rows[outerIndex];
                    var innerRef = tblRef.rows[innerIndex];
                    var colLength = tblRef.rows[innerIndex].cells.length;
                    for (var cellIndex = 0; cellIndex < colLength; cellIndex++) {
                        var thtml = outerRef.cells[cellIndex].innerHTML;
                        outerRef.cells[cellIndex].innerHTML = innerRef.cells[cellIndex].innerHTML;
                        innerRef.cells[cellIndex].innerHTML = thtml;
                    }
                }
            } // else
        } // inner For
    }

}

/*
 * To display the table head and body
 */
function displayDetails(divObj, status, priority) {
    var displayTask = divObj.innerText;
    if (displayTask != undefined) {
        var display = displayTask.split("(");
        var regExp = '/0/';
        var isDisplay = display[1].match(regExp);
        if (isDisplay == 0) {
            document.getElementById("tasksDiv").style.visibility = 'hidden';
            alert(mainWin.getItemDesc("LBL_NO_TASK"));
            return;
        }
    }
    var isSearch = 'Y';
    if (populateTableData(status, priority, isSearch)) {
        document.getElementById("tasksDiv").style.visibility = 'visible';
        hideImg();
        document.getElementById("imgtitle").style.visiblity = "hidden";
    } else {
        document.getElementById("tasksDiv").style.visibility = 'hidden';
        alert(mainWin.getItemDesc("LBL_TASK_STATUS") + " " + status + " " + mainWin.getItemDesc("LBL_PRIORITY") + " " + priority);
    }
}

var flagShow = 1;
var g_winDocAll = window.document.all;

// Content slider switcher
//Call to this method not detected yet
function showHideTaskSearch() {
    if (flagShow) {
        flagShow = 0;
        showTaskSearch();
    } else {
        flagShow = 1;
        hideTaskSearch();
    }
}

// Show slider content
function showTaskSearch() {
    // Display the task search div and hide the taskDetails div.
    document.getElementById("slidetasksearch").style.top = 390;
    g_winDocAll.tasksDiv.style.display = "none";
    g_winDocAll.tasksearch.style.visibility = "visible";
    g_winDocAll.tasksearch.style.display = "inline";

}

// Hide slider content
function hideTaskSearch() {
    // Display the task detail div and hide the task search div.
    g_winDocAll.tasksearch.style.visibility = "hidden";
    document.getElementById("slidetasksearch").style.top = 130;
    g_winDocAll.tasksDiv.style.display = "inline";
}

/*
 * To gradually show/hide the task search details on click of show/hide task
 * search...
 */

var sliderDiv = null;
var HIDE_TIME_INTERVAL = 800;
var MIN_HEIGHT = 130;
var RATE = 10;
var height = 0;
var intervalId = "";
var HIDE = false;
var ACT_HEIGHT = 400; // 500
var REDUCABLE_HEIGHT = 395;

var TASK_SEARCH_MIN_HEIGHT = 1;
var TASK_SEARCH_RATE = 15;
var TASK_SEARCH_HEIGHT = 0;
var TASK_SEARCH_ACT_HEIGHT = 400;
var TASK_SEARCH_HIDE = false;
var TASK_SEARCH_INTERVAL_ID = "";
var taskSearchDiv = null;

var TASK_DETAIL_MIN_HEIGHT = 1;
var TASK_DETAIL_RATE = 15;
var TASK_DETAIL_HEIGHT = 0;
var TASK_DETAIL_ACT_HEIGHT = 383; // 383
var TASK_DETAIL_HIDE = true;
var TASK_DETAIL_INTERVAL_ID = "";
var taskDetailsDiv = null;

function fnShowHideDetails(divObject) {
    sliderDiv = document.getElementById("slidetasksearch");
    taskSearchDiv = document.getElementById("tasksearch");
    taskDetailsDiv = document.getElementById("tasksDiv");
    height = sliderDiv.offsetTop;
    TASK_DETAIL_HEIGHT = taskDetailsDiv.offsetHeight;
    detailHeight = taskDetailsDiv.offsetTop;
    clearInterval(intervalId);
    intervalId = window.setInterval("showDetails()", 1);
}

function showDetails() {
    if (HIDE) {
        // Task Search Div.....hidden gradually..
        height -= RATE;
        TASK_SEARCH_HEIGHT -= TASK_SEARCH_RATE;
        TASK_DETAIL_HEIGHT += TASK_DETAIL_RATE;
        if (this.height < MIN_HEIGHT) {
            height = MIN_HEIGHT;
        }
        if (sliderDiv.offsetTop > 3) {
            sliderDiv.style.top = height + "px";
            sliderDiv.style.overflow = "hidden";
        }

        // Handle search task div height
        if (TASK_SEARCH_HEIGHT < TASK_SEARCH_MIN_HEIGHT) {
            TASK_SEARCH_HEIGHT = TASK_SEARCH_MIN_HEIGHT;
        }
        if (TASK_SEARCH_HEIGHT > 1) {
            taskSearchDiv.style.height = TASK_SEARCH_HEIGHT + "px";
            taskSearchDiv.style.overflow = "hidden";
        }

        // Task Details Div..shown gradually..
        if (TASK_DETAIL_HEIGHT > TASK_DETAIL_ACT_HEIGHT) {
            clearInterval(intervalId);
            HIDE = false;
            TASK_DETAIL_HEIGHT = TASK_DETAIL_ACT_HEIGHT;
        }
        if (TASK_DETAIL_HEIGHT > 1) {
            taskDetailsDiv.style.height = TASK_DETAIL_HEIGHT + "px";
            taskDetailsDiv.style.overflow = "hidden";
        }
    } else {
        // Show the task Search div gradually...
        height += RATE;
        TASK_SEARCH_HEIGHT += TASK_SEARCH_RATE;
        if (sliderDiv.style.top > ACT_HEIGHT) {
            height = ACT_HEIGHT;
            clearInterval(intervalId);
            HIDE = true;
        }
        if (sliderDiv.offsetTop < REDUCABLE_HEIGHT) {
            sliderDiv.style.top = height + "px";
            sliderDiv.style.overflow = "hidden";
        }
        // Handle search task div height
        if (TASK_SEARCH_HEIGHT > TASK_SEARCH_ACT_HEIGHT) {
            TASK_SEARCH_HEIGHT = TASK_SEARCH_ACT_HEIGHT;
        }
        if (TASK_SEARCH_HEIGHT < REDUCABLE_HEIGHT) {
            taskSearchDiv.style.height = TASK_SEARCH_HEIGHT + "px";
            taskSearchDiv.style.overflow = "hidden";
        }

        // Hide the task details div gradually...
        TASK_DETAIL_HEIGHT -= TASK_DETAIL_RATE;
        if (TASK_DETAIL_HEIGHT < TASK_DETAIL_MIN_HEIGHT) {
            TASK_DETAIL_HEIGHT = TASK_DETAIL_MIN_HEIGHT;
            clearInterval(intervalId);
            HIDE = true;
        }
        if (TASK_DETAIL_HEIGHT >= TASK_DETAIL_MIN_HEIGHT) {
            taskDetailsDiv.style.height = TASK_DETAIL_HEIGHT + "px";
            taskDetailsDiv.style.overflow = "hidden";
        }
    }
}

/*
 * First generate the Task Search XML and send the same to the server
 */
//Call to this method not detected yet
function fnSendDataToServer() {
    var taskSearchXML = "";
    var keyWord = document.getElementById("keyword").value;
    var taskFilter = document.getElementById("taskfilter").value;
    var priority = document.getElementById("priority").value;
    var status = document.getElementById("status").value;
    var expDateFrom = document.getElementById("expdatefrom").value;
    var expDateTo = document.getElementById("expdateto").value;
    var creationDateFrom = document.getElementById("creationdatefrom").value;
    var creationDateTo = document.getElementById("creationdateto").value;
    var serverURL = "FCClientHandler";

    var objHTTP = createHTTPActiveXObject();
    taskFilter = taskFilter.replace('&', 'and');
    // Build the task request XML with op as search....
    taskSearchXML = "<TaskRequest OP = 'SEARCH'>";
    taskSearchXML = taskSearchXML + "<Keyword>" + keyWord + "</Keyword>";
    taskSearchXML = taskSearchXML + "<TaskFilter>" + taskFilter + "</TaskFilter>";
    taskSearchXML = taskSearchXML + "<Priority>" + priority + "</Priority>";
    taskSearchXML = taskSearchXML + "<Status>" + status + "</Status>";
    taskSearchXML = taskSearchXML + "<Expdate From='" + expDateFrom + "' To='" + expDateTo + "'>" + "</Expdate>";
    taskSearchXML = taskSearchXML + "<Creationdate From='" + creationDateFrom + "' To='" + creationDateTo + "'>" + "</Creationdate>";
    taskSearchXML = taskSearchXML + "</TaskRequest>";
    objHTTP.open("POST", serverURL, false);
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("FUNCTIONID", "");
    objHTTP.setRequestHeader("OPERATION", "BPELACTION");
    objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
    objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);

    objHTTP.send(taskSearchXML);
    mainWin.inactiveTime = 0;
    var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
    if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
        alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
    } else {
        taskListXML = objHTTP.responseXML;
        taskListXML = loadXMLDoc(getXMLString(taskListXML));
        var searchDOM = loadXMLDoc(getXMLString(taskListXML));
        var taskNodes = selectNodes(searchDOM, "//TaskMsg/Tasks/Task");
        if (taskNodes.length != 0) {
            displayDetails(this, 'taskSearch', 'NA');
            fnShowHideDetails(this);
        } else {
            alert(mainWin.getItemDesc("LBL_NO_TASK"))
        }
    }
}
//Suppressed since the same method is available in ExtUtil.js
/*
function getRowIndex(event)
{
    var objTR;
    var rowIndex = -1;
    
	 * rowIndex -1 means that the user selected some set of rows and clicked on
	 * the Detailed Button on the tool bar in the Summary Screen. When the user
	 * double clicks on any row of the Result Tab of Summary Screen then the
	 * event will not be null. Added By C Malaiah On Apr 12,2005.
	 
    if (event != null)
    {
        //objTR = event.srcElement
		objTR = getEventSourceElement(event);
        while (objTR.tagName != "TR")
        {
            if(window.ActiveX)
			objTR = objTR.parentElement;
			else
			objTR = objTR.parentNode;
        }
        rowIndex = objTR.rowIndex;
    }
    return rowIndex;
}
*/
function fnDoActionAsync(taskId, actionName, comments) 	 //12.0.2 Changes
{
    /*if (!mainWin.isSessionActive()) 
    {
        return;
    }*/
    if (actionName == null || actionName == '') 
        actionName = getPreviousSibling(getEventSourceElement(event)).value;
    //12.0.2 Changes Starts
    if (comments == 'undefined') 
        comments = "";
    //12.0.2 Changes Ends
   
    var taskActionXML = "";
    var taskActionDOM = "";
    // Build the task request XML with op as action...
    taskActionXML = "<TaskRequest OP = 'ACTION'>";
    taskActionXML = taskActionXML + "<TaskId>" + taskId + "</TaskId>";
    taskActionXML = taskActionXML + "<ActionName>" + actionName + "</ActionName>";
    taskActionXML = taskActionXML + "<Comments>" + comments + "</Comments>";//12.0.2 Changes
    taskActionXML = taskActionXML + "</TaskRequest>";  
    var serverURL = "FCClientHandler";
    var objHTTP = createHTTPActiveXObject();
    var actionResponseXML = null;
    var messageNode = "";
    objHTTP.open("POST", serverURL, true);
    objHTTP.setRequestHeader("Content-Type", "application/xml");
	objHTTP.setRequestHeader("accept-encoding", "gzip");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("FUNCTIONID", "");
    objHTTP.setRequestHeader("OPERATION", "BPELACTION");
    objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
    objHTTP.setRequestHeader("TXNBRANCH", g_txnBranch);
    objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
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
    objHTTP.send(taskActionXML);
}
/*
 * To perform actions accquire and release...
 */
function fnDoAction(taskId, actionName, comments, isDashBoard) { //12.0.2 Changes
    /*if (!mainWin.isSessionActive()) {
        return;
    }*/
    if (actionName == null || actionName == '') 
        actionName = getPreviousSibling(getEventSourceElement(event)).value;
    //12.0.2 Changes Starts
    if (comments == 'undefined') 
        comments = "";
    //12.0.2 Changes Ends
    if (actionName != 'REASSIGN') {
        var taskActionXML = "";

        var taskActionDOM = "";
        // Build the task request XML with op as action...
        taskActionXML = "<TaskRequest OP = 'ACTION'>";
        taskActionXML = taskActionXML + "<TaskId>" + taskId + "</TaskId>";
        taskActionXML = taskActionXML + "<ActionName>" + actionName + "</ActionName>";
        taskActionXML = taskActionXML + "<Comments>" + comments + "</Comments>";//12.0.2 Changes Starts
        taskActionXML = taskActionXML + "</TaskRequest>";

        var serverURL = "FCClientHandler";
        var objHTTP = createHTTPActiveXObject();
        var actionResponseXML = null;
        var messageNode = "";
        var msgType = ""; //12.0.2 Changes 
        var msg = ""; //12.0.2 Changes 
        var errcode = ""; //12.0.2 Changes 
        objHTTP.open("POST", serverURL, false);
        objHTTP.setRequestHeader("Content-Type", "application/xml");
		objHTTP.setRequestHeader("accept-encoding", "gzip");
        objHTTP.setRequestHeader("charset", "utf-8");
        objHTTP.setRequestHeader("FUNCTIONID", "");
        objHTTP.setRequestHeader("OPERATION", "BPELACTION");
        objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
        objHTTP.setRequestHeader("TXNBRANCH", g_txnBranch);
        objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
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

        objHTTP.send(taskActionXML);
        mainWin.inactiveTime = 0;
        var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
        if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
            alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
        } else {
            actionResponseXML = objHTTP.responseXML;
            if (actionName == "VIEW_TASK_HISTORY") {
                populateHistoryData(getXMLString(actionResponseXML));
            } else if (actionName == "VIEW_SUB_TASK") {
                populateSubTaskData(actionResponseXML);
            //12.0.2 Changes Starts
            } else if (actionName == "VIEW_INTERACTION") {
                populateInteractionsData(actionResponseXML);
            } else if ((actionName == "SET_REMINDER") || (actionName == "DISMISS_REMINDER")) {
		if (getXMLString(actionResponseXML) != "") {
                    taskActionDOM = loadXMLDoc(getXMLString(actionResponseXML));
                    return taskActionDOM;
                }
            } else if (actionName == "RETRIEVE_FILTER") {
		if (getXMLString(actionResponseXML) != "") {
                    taskActionDOM = loadXMLDoc(getXMLString(actionResponseXML));
                    return taskActionDOM;
                }
            //12.0.2 Changes Ends
            } else {
                if (getXMLString(actionResponseXML) != "") {
                    taskActionDOM = loadXMLDoc(getXMLString(actionResponseXML));
                    gTaskCopyDom = taskActionDOM;
                    //12.0.2 Changes Starts
                    //var messageNode = selectNodes(taskActionDOM, "//RESPONSE/MESSAGE");
                    if (selectNodes(taskActionDOM, "//RESPONSE/MESSAGE").length > 0)
                    {
                    	for (var msgIdx = 1; msgIdx <= selectNodes(taskActionDOM, "//RESPONSE/MESSAGE").length; msgIdx++)
                    	{
                    	messageNode = selectSingleNode(taskActionDOM, "//RESPONSE/MESSAGE["+msgIdx+"]");
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
                    //messageNode = selectSingleNode(taskActionDOM, "//RESPONSE/MESSAGE");
                    //var msgType = getNodeText(messageNode.getAttribute("TYPE"));
                    //if (msgType == null || msgType == "") msgType = "I";
                    //var msg = getNodeText(messageNode);
                    //var errcode = msg.substring(0, msg.indexOf(" "));
                    if(!isDashBoard){
                    mask();
                    showAlerts(fnBuildAlertXML(errcode, msgType,msg), msgType);
                    alertAction = "UNMASK";
                    fnBpelRefresh();
					}else{
						showAlerts(fnBuildAlertXML(errcode, msgType,msg), msgType);
						parent.gAlertMessage = gAlertMessage;
					} //12.0.2 Changes Ends
                } else {
                    if (actionName != '') {
                        var msg = "The task is already " + actionName + "d!";
						if(!isDashBoard){ //12.0.2 Changes
                        mask();
                        showAlerts(fnBuildAlertXML("CE002", "I"));
                        alertAction = "UNMASK";
                        fnBpelRefresh();
						}//12.0.2 Changes Starts
else{
							showAlerts(fnBuildAlertXML("CE002", "I"));
							parent.gAlertMessage = gAlertMessage;
						}  //12.0.2 Changes Ends
                    } else {
                        var msg = "Please select an outcome";
                        if(!isDashBoard){	//12.0.2 Changes
                        mask();
                        showAlerts(fnBuildAlertXML("CE002", "I"));
                        alertAction = "UNMASK";
						}//12.0.2 Changes Starts
else{
							showAlerts(fnBuildAlertXML("CE002", "I"));
							parent.gAlertMessage = gAlertMessage;
						}
                    }
                }
                if(!isDashBoard)
//12.0.2 Changes Ends
                //document.getElementById("tasksDiv").style.display = 'none'; //12.0.2 Arumugam
		fnShowQueue(currentTaskTab)
            }
        }
    }
}

var page = 1;
var totalTasks = 0;
var pageSize = 10;


function deleteAllRows(tableId, deleteHeader) {
    var tblObj = document.getElementById(tableId);
    var count = 1;
    if (deleteHeader && deleteHeader == true) 
        count = 0;
    while (tblObj && tblObj.rows.length > count)
        tblObj.deleteRow(tblObj.rows.length - 1);
}

function displayQueueCount(count) {
   if(document.getElementById(currQueueId) == null)
	return;
    var queueLabel = document.getElementById(currQueueId).innerHTML;
    if (queueLabel.indexOf("(") != -1) 
        queueLabel = queueLabel.substring(0, queueLabel.indexOf("("));
    queueLabel = queueLabel + "(" + count + ")";
    document.getElementById(currQueueId).innerHTML = queueLabel;
}

function clearLandingPage() {
//12.0.2 Changes Starts
	if(document.getElementById("tasksDiv")==null)
		document.getElementById("DIVTabContentDBoardTasks").innerHTML = getBPELTaskHTML();
//12.0.2 Changes Ends
    document.getElementById("tasksDiv").style.display = 'none';
    document.getElementById("TBLPageidCustomSearch").style.display = 'none';
}

function clearTaskSearchDetail(searchType) {
    document.getElementById("tasksDiv").style.display = 'none';
    document.getElementById("TBLPageidCustomSearch").style.display = 'block';
}

function showTasklist(){
    document.getElementById("tasksDiv").style.display = 'block';
}

var currPage = 1;
var currQueueId = "";
var currQueueCount = 0;
var currSortField;
var currSortOrder;

function displayNextPage() {
    if (displayQueueTasks(currQueueId, "NEXT", currSortField, currSortOrder)) 
        currPage = document.getElementById("currPage").value;
}

function displayFirstPage() {
    if (displayQueueTasks(currQueueId, "FIRST", currSortField, currSortOrder)) 
        currPage = document.getElementById("currPage").value;
}

function displayPrevPage() {
    if (displayQueueTasks(currQueueId, "PREV", currSortField, currSortOrder)) 
        currPage = document.getElementById("currPage").value;
}

function displayLastPage() {
    if (displayQueueTasks(currQueueId, "LAST", currSortField, currSortOrder)) 
        currPage = document.getElementById("currPage").value;
}

function goToPage() {
    if (displayQueueTasks(currQueueId, "GOTOPAGE", currSortField, currSortOrder)) 
        currPage = document.getElementById("currPage").value;
}

function displayPageInfo(currentPage, totalCount, pageSize) {
    document.getElementById("currPage").value = currentPage;
    document.getElementById("totalPages").value = Math.ceil(totalCount / pageSize);
   if (!isTaskSearch)
   {
    if (document.getElementById(currQueueId)!=null && document.getElementById(currQueueId).innerHTML.indexOf("+") != -1) 
    {       
        if(document.getElementById("currPage").value == 1) 
        {
    setInnerText(document.getElementById("currPage"), currentPage);
            setInnerText(document.getElementById("totalPages"), Math.ceil(totalCount / pageSize) + "..");
        }
        else if(document.getElementById("currPage").value == Math.ceil(totalCount / pageSize))
        {
            setInnerText(document.getElementById("currPage"), ".." + currentPage);
    setInnerText(document.getElementById("totalPages"), Math.ceil(totalCount / pageSize));
        }
        else 
        {
            setInnerText(document.getElementById("currPage"), ".." + currentPage);
            setInnerText(document.getElementById("totalPages"), Math.ceil(totalCount / pageSize) + "..");    
        }
        
     }
     else 
       {  
            setInnerText(document.getElementById("currPage"), currentPage);
            setInnerText(document.getElementById("totalPages"), Math.ceil(totalCount / pageSize));    
       }  
   }
   else 
   {   
        setInnerText(document.getElementById("currPage"), currentPage);
        setInnerText(document.getElementById("totalPages"), Math.ceil(totalCount / pageSize));    
	}
}

function getTaskRequestXml(queueId, page, SortField, SortOrder) {
    if (!(isTaskSearch||isFilterTask)) { //12.0.2 Changes
        var taskRequestXml = "<TaskRequest OP = 'SEARCH' PCODE ='"+pCode+"' PAGE ='" + page + "'>";
        taskRequestXml += "<QueueId>" + queueId + "</QueueId>";
        taskRequestXml += "<SortField>" + SortField + "</SortField>";
        taskRequestXml += "<SortOrder>" + SortOrder + "</SortOrder>";
        taskRequestXml += "</TaskRequest>";
//12.0.2 Changes Starts
    }else if (!isTaskSearch) {
        var taskRequestXml = "<TaskRequest OP = 'TASKFILTER' PCODE ='ALL' PAGE ='" + page + "'>";
        taskRequestXml += "<QueueId>" + queueId + "</QueueId>";
		taskRequestXml +="<TaskFieldValueMapping>" + filterCriteria + "</TaskFieldValueMapping>";
        taskRequestXml += "<SortField>" + SortField + "</SortField>";
        taskRequestXml += "<SortOrder>" + SortOrder + "</SortOrder>";
        taskRequestXml += "</TaskRequest>";
		//isFilterTask =false;
    }
//12.0.2 Changes Ends
 else {
        var taskRequestXml = "<TaskRequest OP = 'TASKSEARCH' PCODE ='" + pCode + "' PAGE ='" + page + "'>";
        taskRequestXml +="<TaskFieldValueMapping>" + SearchCriteria + "</TaskFieldValueMapping>";
        taskRequestXml += "<SortField>" + SortField + "</SortField>";
        taskRequestXml += "<SortOrder>" + SortOrder + "</SortOrder>";
        taskRequestXml = taskRequestXml + "</TaskRequest>";
    }
    return taskRequestXml;
}

function displayQueueTasks(queueId, page, SortField, SortOrder) {
//12.0.2 Changes Starts
if(queueId !='' && queueId != undefined){
  currentTaskTab =queueId;
  document.getElementById("hTab_DBoardTasks").style.display='block';
  var tabobj = document.getElementById('A_'+queueId).parentNode;
  var tabLinkArr = tabobj.getElementsByTagName("A");
  for(var cnt = 0; cnt < tabLinkArr.length; cnt++){
    if(tabLinkArr[cnt].getElementsByTagName("SPAN")[0].className == "DBoardHeadDivSpanSel") {
      tabLinkArr[cnt].getElementsByTagName("SPAN")[0].className = "DBoardHeadDivSpanDeSel";
      break;
    }
  }
  document.getElementById('A_'+queueId).getElementsByTagName("SPAN")[0]. className = "DBoardHeadDivSpanSel";
}
	if(!isDashboardAction){
		//document.getElementById("btnDiv").style.display='';
		//document.getElementById("btnDiv12").style.display='';
		if(document.getElementById("TBLPageidFilters")!=null)   
		document.getElementById("TBLPageidFilters").style.display='none';
		//if(document.getElementById("SYS_TBL_TASK_TABS")!=null)
		//	document.getElementById("SYS_TBL_TASK_TABS").style.display='none';
    if(document.getElementById("hTab_DBoardTasks")!=null)  
      document.getElementById("hTab_DBoardTasks").style.display='none';
	}
    if(document.getElementById("workflowRefNo")!=null)  
      document.getElementById("workflowRefNo").parentNode.style.display='none';
	var bpelXmlTmp = loadXMLDoc(parent.bpelMenuXml);
	var desc;
    if (!queueId || queueId == '') {
        isTaskSearch = true;
    } else 
        isTaskSearch = false;
	if(selectSingleNode(bpelXmlTmp,"//LEAF[@queueId='"+queueId+"']") !=null )
		desc = selectSingleNode(bpelXmlTmp,"//LEAF[@queueId='"+queueId+"']").getAttribute('LABEL');	
        //12.1 Retro_Changes starts
        else if (selectSingleNode(bpelXmlTmp,"//NODE/NODE[@queueId='"+queueId+"']") !=null)        
                desc = selectSingleNode(bpelXmlTmp,"//NODE/NODE[@queueId='"+queueId+"']").getAttribute('LABEL');
        //12.1 Retro_Changes ends
	else
		desc =queueId;
	var labelTaskList = getItemDesc("LBL_TASKLIST");
	if(document.getElementById('tasksDivHeading')){
		if(!isTaskSearch)setInnerText(document.getElementById('tasksDivHeading'),desc+'-'+labelTaskList);
    else setInnerText(document.getElementById('tasksDivHeading'),getItemDesc("LBL_SEARCH_RESULT"));
  }
//12.0.2 Changes Ends  
    var tasksDom;
    g_cur_queueId=queueId;
    var i = 0;
if (currPage ==0)
      currPage=1;
    if (!page || page == '' || page == null) {
        page = 'FIRST';
        currPage = 1;
    } else if (page == 'GOTOPAGE') {
        if ((!document.getElementById("goto").value || document.getElementById("goto").value != '') && document.getElementById("goto").value > 0 && document.getElementById("goto").value <= document.getElementById("totalPages").value) {
            page = page + "!" + document.getElementById("goto").value;
            document.getElementById("goto").value = "";
        } else {
        /* FC 11.4 NLS Changes*/
           // alert("Enter a valid number");
           alert(mainWin.getItemDesc("LBL_ENTERVALIDNUM"))
            return false;
        }
    }
    if (!SortField || SortField == '' || SortField == null) {
        SortField = 'CREATEDDATE';
    }
    if (!SortOrder || SortOrder == '' || SortOrder == null) {
        SortOrder = 'ASCENDING';
    }
    currQueueId = queueId;
    currSortField = SortField;
    currSortOrder = SortOrder;
    var totPageTemp=1;
    if(document.getElementById("totalPages")!=null&&((document.getElementById("totalPages").value!=undefined)||typeof(document.getElementById("totalPages").value) != 'undefined')) {   //12.0.2 Changes 
       totPageTemp=document.getElementById("totalPages").value; 
    }
    page = page + "," + currPage + "," + totPageTemp ;
    if (!isTaskSearch) 
        pCode = 'ALL';
    var taskRequestXml = getTaskRequestXml(queueId, page, SortField, SortOrder);
    var NotaskErrcode = true;
    try {
        tasksDom = getTasksDom(taskRequestXml, pCode);
        gTasksDOM = tasksDom;//12.0.2 Changes 
        if (selectNodes(tasksDom, "//MESSAGE").length > 0) {
            for (i = 0; i < selectNodes(tasksDom, "//MESSAGE").length; i++) {
                var msgType = selectNodes(tasksDom, "//MESSAGE")[i].getAttribute("TYPE");
                if (msgType != '') {
                    var msg = getNodeText(selectNodes(tasksDom, "//MESSAGE")[i]);
                    var errcode = msg.substring(0, msg.indexOf(" "));
                     if (errcode == 'CSIP-001') 
			{
 			 	NotaskErrcode = true;
			} 
			else if (errcode == 'CSIP-002') 
			{
                        mask();
                        showAlerts(fnBuildAlertXML(errcode, msgType), msgType);
                        alertAction = "UNMASK";
                        NotaskErrcode = true;
                    }
		      else 
		      {
                        mask();
                        showAlerts(fnBuildAlertXML(errcode, msgType), msgType);
                        alertAction = "UNMASK";
                        NotaskErrcode = false;
                        return false;
                    }
                }
                else if (selectNodes(tasksDom, "//Task") != null)
                {
                     if (selectNodes(tasksDom, "//Task").length == 0)
                     {
                    NotaskErrcode = true;
                     }
                }     
            }
        }
        if (!isTaskSearch && NotaskErrcode || isQuickSearch) {
            clearLandingPage();
            if(!isQuickSearch)  document.getElementById('A_FILTER').style.display = "block";
        }
        else if (isTaskSearch && NotaskErrcode) 
            clearTaskSearchDetail();
        if (selectNodes(tasksDom, "//Task").length > 0) {
            populateTableData(tasksDom, "N");
            showTasklist();
        }
        totalTasks = getTotalTasks(tasksDom);
        if (!isTaskSearch) 
            displayQueueCount(selectSingleNode(tasksDom, "//TaskMsg").getAttribute("taskCount"));
        currPage = selectSingleNode(tasksDom, "//TaskMsg").getAttribute("currentPage");
        if (currPage ==0)
         if(selectSingleNode(tasksDom, "//TaskMsg").getAttribute("taskCount") > 0 )
          currPage=1;
        displayPageInfo(currPage, totalTasks, pageSize);
        fnshowNavigationbutton(currPage, pageSize, totalTasks);
    } catch(e) {
        return false;
    }
    return true;
}
//12.1 Retro_Changes Starts
function showLocatorAlert(){
     var type="I";
     var msgChar= "";
     var strTheme = parent.window.strTheme;
     var tempScrType = "M";
     var ovdRoutingType="NX";
     var alertWindow = document.getElementById("ifr_AlertWin");
        if(alertWindow==null){
            alertWindow = parent.document.getElementById("ifr_AlertWin");
            strTheme = parent.window.strTheme;
        }
        alertWindow.src = encodeURI("TaskLocator.jsp?MSG_TYPE="+type.toUpperCase()+"&MESSAGE="+msgChar+"&THEME="+strTheme+"&OVDSCRTYP="+tempScrType+"&OVDROUTINGTYP="+ovdRoutingType);/* security fixes for WF */
        var alertWinObj = document.getElementById("Div_AlertWin");
        if(alertWinObj == null) {
            alertWinObj = parent.document.getElementById("Div_AlertWin");
        }
        alertWinObj.style.display = "block";
}
//12.1 Retro_Changes Ends
function getTotalTasks(tasksDom){
    var totPgCnt=selectSingleNode(tasksDom,"//TaskMsg").getAttribute("taskCount");
    if(totPgCnt!="" && totPgCnt != -1) 
        return parseInt(totPgCnt);
    else 
        return 0;
}

function fnshowNavigationbutton(page, pageSize, totalTasks) {
    if (page * pageSize >= totalTasks) {
        document.getElementById("navNext").disabled = true;
        document.getElementById("navNext").className = "BTNicon2D";
        document.getElementById("navLast").disabled = true;
        document.getElementById("navLast").className = "BTNicon2D";
    } else {
        document.getElementById("navNext").disabled = false;
        document.getElementById("navNext").className = "BTNicon2";
        document.getElementById("navLast").disabled = false;
        document.getElementById("navLast").className = "BTNicon2";
    }
    if (page > 1) {
        document.getElementById("navFirst").disabled = false;
        document.getElementById("navFirst").className = "BTNicon2";
        document.getElementById("navPrev").disabled = false;
        document.getElementById("navPrev").className = "BTNicon2";
    } else {
        document.getElementById("navFirst").disabled = true;
        document.getElementById("navFirst").className = "BTNicon2D";
        document.getElementById("navPrev").disabled = true;
        document.getElementById("navPrev").className = "BTNicon2D";
    }
}
var pCode="ALL";
function displaySearchPane(processCode, event){
   //12.0.2 Changes Starts
   clearLandingPage();//12.1 Retro_Changes
	isDashboardAction = false;
	isFilterTask = false;
	document.getElementById("btnDiv").style.display='';
	document.getElementById("btnDiv12").style.display='';
	document.getElementById("TBLPageidFilters").style.display='none';
	/*if(document.getElementById("SYS_TBL_TASK_TABS")!=null)
		document.getElementById("SYS_TBL_TASK_TABS").style.display='none';*/
	if(document.getElementById("hTab_DBoardTasks")!=null)
		document.getElementById("hTab_DBoardTasks").style.display='none';    
	currentTaskTab ='';	
//12.0.2 Changes Ends
    document.getElementById("tasksDiv").style.display = 'none';
    document.getElementById("TBLPageidCustomSearch").style.display = 'none';
    isTaskSearch=true;
    pCode=processCode;
    showProcessSearchFields(processCode, event);
    document.getElementById("TBTaskSearch").children[0].children[1].children[0].children[1].focus();
    showHideVtab();//HTML5 Changes 14/NOV/2016
    var evnt = window.event || event;
    preventpropagate(evnt);
    return false;
}

function getTasksDom(taskRequestXml, processCode) {
    var objHTTP = getXmlHttpObj("FCClientHandler", "", "BPELACTION");
    objHTTP.send(taskRequestXml);
    var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
    if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
        alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
    } else {
        if (objHTTP.readyState == 4) 
            return objHTTP.responseXML;
        else 
            throw new Error("Server response error!");
    }
}
//12.1 Retro_Changes starts
function getDashBoardSummaryRecords(qName, page, SortField, SortOrder){
    var taskRequestXml = "<TaskRequest OP = 'DASHBOARDSUMMARY' PAGE ='" + page + "'>";
    taskRequestXml +="<QueryID>" + qName + "</QueryID>";
    taskRequestXml += "<SortField>" + SortField + "</SortField>";
    taskRequestXml += "<SortOrder>" + SortOrder + "</SortOrder>";
    if(isFilterTask)
        taskRequestXml += "<FilterCriteria>" + filterCriteria + "</FilterCriteria>";
    taskRequestXml = taskRequestXml + "</TaskRequest>";
     var objHTTP = getXmlHttpObj("FCClientHandler", "", "BPELACTION");
    objHTTP.send(taskRequestXml);
    var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
    if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
        alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
    } else {
        if (objHTTP.readyState == 4) 
            return objHTTP.responseXML;
        else 
            throw new Error("Server response error!");
    }   
}
//12.1 Retro_Changes ends
// @Deprecated
function searchTasks(criteria) {
    if (criteria == 'null' || criteria == '') {
        criteria = mainWin.CurrentBranch + ";AND@" + document.getElementById("idQueryFieldValue").value;
    }
    if (criteria == "NextPage") {
        page++;
        criteria = document.getElementById("currentCriteria").value;
    } else if (criteria == "PrevPage") {
        page--;
        criteria = document.getElementById("currentCriteria").value;
    } else {
        totalTasks = getEventSourceElement(event).count;
        if (typeof(totalTasks) == 'undefined') 
            page = 'X';
        else 
            page = 1;
        document.getElementById("currentCriteria").value = criteria;
    }
    var pCode = 'COMMON';
    if (document.getElementById("TBLPageidCustomSearch").style.display == 'block') 
        pCode = document.getElementById("sProcessCode").value;
    var taskSearchXML = "<TaskRequest OP = 'SEARCH' PCODE ='" + pCode + "'>";
    taskSearchXML = taskSearchXML + "<Criteria>PAGE:" + page + "!" + criteria + "</Criteria>";
    taskSearchXML = taskSearchXML + "</TaskRequest>";

    var serverURL = "FCClientHandler";
    var objHTTP = createHTTPActiveXObject();
    objHTTP.open("POST", serverURL, false);
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("FUNCTIONID", "");
    objHTTP.setRequestHeader("OPERATION", "BPELACTION");
    objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
    objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objHTTP.send(taskSearchXML);
    mainWin.inactiveTime = 0;
    var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
    if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
        alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
    } else {
        taskListXML = objHTTP.responseXML;
        tasklistXml = getXMLString(taskListXML);
        var isSearch = 'Y';
        if (taskListXML && getXMLString(taskListXML) != "" && typeof(totalTasks) != 'undefined' && getEventSourceElement(event).innerHTML != mainWin.getItemDesc("LBL_SEARCH")) {
            var currentCount = taskListXML.documentElement.getAttribute("taskCount");
            var queueLabel = getEventSourceElement(event).innerHTML.substring(0, getEventSourceElement(event).innerHTML.indexOf("("));
            queueLabel = queueLabel + "(" + currentCount + ")";
            if (getEventSourceElement(event).innerHTML != "Next" && getEventSourceElement(event).innerHTML != "Prev") 
                getEventSourceElement(event).innerHTML = queueLabel;
            isSearch = 'N';
        }
        if (criteria.indexOf("#CURRENTSTAGE_QUEUE") != -1) 
            currentStage = true;
        if (populateTableData("", "NA", isSearch)) {
            document.getElementById("tasksDiv").style.display = 'block';
        } else {
            document.getElementById("tasksDiv").style.display = 'none';
            alert(mainWin.getItemDesc("LBL_NO_TASKS_AVAILABLE"));
        }
        currentStage = false;
    }
    if (criteria.indexOf("#CURRENTSTAGE_QUEUE") != -1) 
        currentStage = true;
    if (populateTableData("", "NA", isSearch)) {
        document.getElementById("tasksDiv").style.display = 'block';
    } else {
        document.getElementById("tasksDiv").style.display = 'none';
        alert(mainWin.getItemDesc("LBL_NO_TASKS_AVAILABLE"));
    }
    currentStage = false;
}

// @Depecreated
function populateHistoryData(inputXml) {
    var xmlDOM = loadXMLDoc(inputXml);
	deleteAllRows("tblTaskHistory", true);	//12.0.2 Changes
    historyTable = document.getElementById("tblTaskHistory").tBodies[0];
//12.0.2 Changes Starts
/*    for (var rowIndex = historyTable.rows.length - 1; rowIndex >= 0; rowIndex--) {
        historyTable.deleteRow(rowIndex);
    }*/	//12.0.2 Changes Ends
    if (selectSingleNode(xmlDOM, "//TaskHistory") != null && selectNodes(xmlDOM, "//Task").length > 0) {
		insertTasklistHeaderHTML();//12.0.2 Changes
        var taskNodes = selectNodes(xmlDOM, "//Task");
        for (var taskCount = 0; taskCount < taskNodes.length; taskCount++) {
            newRow = historyTable.insertRow(-1);
            if (taskCount % 2 == 1) {
                newRow.className = "TBLoneTRalt";
            } else 
                newRow.className = "TBLoneTR";
            for (var colCount = 0; colCount < taskNodes[taskCount].childNodes.length; colCount++) {
                var cell = newRow.insertCell(-1);
                if (colCount == 0) {
                    cell.setAttribute("scope","row");
                }
                var value = checkForNull(getNodeText(taskNodes[taskCount].childNodes[colCount]));
                if (value == '') 
                    value = '&nbsp';
                if (taskNodes[taskCount].childNodes[colCount].nodeName.indexOf("DATE") != -1) {
                    var dateTime = value.split(" ");
                    var date = dateTime[0].split("-");
                    value = format(date[0], date[1], date[2]) + ' ' + dateTime[1] + ' ' + dateTime[2];
                }
                var innerContent = "<span class='SPNtext' tabIndex='"+taskCount+"'>" + value + "</span>";
                cell.innerHTML = innerContent;
            }
            var cell = newRow.insertCell(-1);            
            var innerContent = '<button class="BTNtext" id = "BTNViewDetail" onclick="fnShowHistoryDetailFunction(\''+taskNodes[taskCount].getAttribute("taskId")+'\',\''+taskNodes[taskCount].getAttribute("funcId")+'\')">'+parent.mainWin.getItemDesc("LBL_VIEW")+'</button>&nbsp';
            cell.innerHTML = innerContent;
        }
    }
}

// @Depecrated
function taskDisplay(criteria, search) {
    /*if (!mainWin.isSessionActive()) {
        return;
    }*/
    if (search == "Y") {
        document.getElementById("tasksDiv").style.display = 'none';
        document.getElementById("TBLPageidCustomSearch").style.display = 'none';
        document.getElementById("sProcessCode").value = "COMMON";
        showProcessSearchFields();
    } else {
        document.getElementById("TBLPageidCustomSearch").style.display = 'none';
        searchTasks(criteria);
    }

}

// @Depecrated
var isTaskSearch=false;
var isQuickSearch=false;
var SearchCriteria;
function fnSearch() {
    isTaskSearch = true;
    var criteria = "";
    var taskTable = document.getElementById("TBTaskSearch");
    var value;
    var fieldId;
    var totalNumOfDivColList = taskTable.children[0].children;
    for (var divColListIndex = 1; divColListIndex < totalNumOfDivColList.length - 1; divColListIndex++) {
        for (var divListIndex = 0; divListIndex < 4; divListIndex++) {
            if (totalNumOfDivColList[divColListIndex].children[divListIndex]) {
                var rootDivList = totalNumOfDivColList[divColListIndex].children[divListIndex];
                if (rootDivList.getElementsByTagName("SELECT") && rootDivList.getElementsByTagName("SELECT").length > 0) {
                    if (rootDivList.getElementsByTagName("INPUT")[0]) {
                        value = rootDivList.getElementsByTagName("INPUT")[0].value;
                        fieldId = rootDivList.getElementsByTagName("INPUT")[0].id;
                    } else {
                        value = rootDivList.getElementsByTagName("SELECT")[0].value;
                        fieldId = rootDivList.getElementsByTagName("SELECT")[0].id;
                    }
                    if (! (value == null || value == '')) {
                        criteria = criteria + fieldId + '@#'; 
                        criteria = criteria + rootDivList.getElementsByTagName("SELECT")[0].value + '@#'; 
                        criteria = criteria + value + '~';
                    }
                } else {
                    var fromValue = rootDivList.getElementsByTagName("INPUT")[0].value;
                    var fromId = (rootDivList.getElementsByTagName("INPUT")[0].id).substring(2);
                    if (! (fromValue == null || fromValue == '')) {
                        criteria = criteria + fromId + '@#'; /* Task Search Changes*/
                        criteria = criteria + 'GT@#'; /* Task Search Changes*/
                        criteria = criteria + fromValue + '~';
                    }
                    var toValue = rootDivList.getElementsByTagName("INPUT")[2].value;
                    var toId = fromId;
                    if (! (toValue == null || toValue == '')) {
                        criteria = criteria + toId + '@#'; /* Task Search Changes*/
                        criteria = criteria + 'LT@#'; /* Task Search Changes*/
                        criteria = criteria + toValue + '~';
                    }
                }
            }
        }
    }
    SearchCriteria = criteria;
    displayQueueTasks('');
    //document.getElementById("goto").focus(); //9NT1501_12.0_14024986 changes
}
//12.1 Retro_Changes starts
function setTaskLocatorColLabel()
{
        ColumnArray[0] = "PROTECTEDTEXTATTRIBUTE2~LBL_WORKFLOW_REF_NO~";
        ColumnArray[1] = "ACQUIREDBY~LBL_ACQUIREDBY~";
        ColumnArray[2] = "TITLE~LBL_TITLE~";
        ColumnArray[3] = "ASSIGNEEGROUPS~LBL_ASSIGNEE_GROUP~";
        ColumnArray[4] = "CREATEDDATE~LBL_CREATED_DATE~";
       // ColumnArray[5] = "STATE~LBL_STATUS~";
        return true;
}
function getQueryColumns()
{
var QueryColumns ="";
   for (i=0;i<ColumnArray.length;i++)
   {
        QueryColumns = QueryColumns+ColumnArray[i].split("~")[0]+"~";
   }
   //"PROTECTEDTEXTATTRIBUTE2~TITLE~ACQUIREDBY~STATE~ASSIGNEEGROUPS~CREATEDDATE~UPDATEDBY~UPDATEDDATE~"
   return QueryColumns;
}
function getQueryColLabel(fieldName)
{
    var QueryColLabel;
     for (i=0;i<ColumnArray.length;i++)
   {
            if(ColumnArray[i].split("~")[0]==fieldName)
        QueryColLabel =  ColumnArray[i].split("~")[1];
   }
   return QueryColLabel;
}
function fnLocateTask() {
    try{
	if(!document.getElementById("QuickSearchValue").value)
        {
          showAlerts(fnBuildAlertXML("CSIP-002", "I"),'I');
          return false;
        }
     //   clearLandingPage();
       }
       catch(e){
	}
        setTaskLocatorColLabel();
        SortField = 'PROTECTEDTEXTATTRIBUTE2';
        SortOrder = 'ASCENDING';
        SearchCriteria = 'PROTECTEDTEXTATTRIBUTE2@#CONTAINS@#'+document.getElementById("QuickSearchValue").value+ '~';
        pCode ="ALL";
        taskErrcode = false;
        var taskRequestXml = "<TaskRequest OP = 'TASKLOCATE' PCODE ='" + pCode + "' PAGE ='" + page + "'>";
        taskRequestXml +="<TaskFieldValueMapping>" + SearchCriteria + "</TaskFieldValueMapping>";
        taskRequestXml += "<QueryCols>" + getQueryColumns() + "</QueryCols>";
        taskRequestXml += "<SortField>" + "PROTECTEDTEXTATTRIBUTE2" + "</SortField>";
        taskRequestXml += "<SortOrder>" + SortOrder + "</SortOrder>";
        taskRequestXml = taskRequestXml + "</TaskRequest>";
        tasksDom = getTasksDom(taskRequestXml, pCode);
        gTasksDOM = tasksDom;
        if (selectNodes(tasksDom, "//MESSAGE").length > 0) {
            for (i = 0; i < selectNodes(tasksDom, "//MESSAGE").length; i++) {
                 var msgType = selectNodes(tasksDom, "//MESSAGE")[i].getAttribute("TYPE");
                if (msgType != '') {
                    var msg = getNodeText(selectNodes(tasksDom, "//MESSAGE")[i]);
                    var errcode = msg.substring(0, msg.indexOf(" "));
                     if (errcode == 'CSIP-002') 
                     {
                        mask();
                        showAlerts(fnBuildAlertXML(errcode, msgType), msgType);
                        alertAction = "UNMASK";
                        taskErrcode = true;
                     } else 
		      {
                        mask();
                        showAlerts(fnBuildAlertXML(errcode, msgType), msgType);
                        alertAction = "UNMASK";
                        taskErrcode = true;
                        return false;
                    }
                }
            }
        }
        if(!taskErrcode)
        {
            mask();
            showLocatorAlert();
            alertAction = "UNMASK";
            return true;
        }
 }
//12.1 Retro_Changes ends
function fnQuickTaskSearch() {
	try{
	clearLandingPage();
	}catch(e){
	} 
//17062979  Changes Starts
if(document.getElementById("QuickSearchValue").value)
{
	isQuickSearch = true;
	isDashboardAction = false;
	currentTaskTab = '';
    SearchCriteria = 'PROTECTEDTEXTATTRIBUTE2@#CONTAINS@#'+document.getElementById("QuickSearchValue").value+ '~';
    displayQueueTasks('');
	isQuickSearch = false;
	isTaskSearch = false;
        showHideVtab();//HTML5 changes 22/NOV/2016
}
else
{
 showAlerts(fnBuildAlertXML("CSIP-002", "I"),'I');
}

//17062979  Changes Ends
}

/*The below code is commented as part of 11.2.2. The html structure has changed and hence the method.*/
/*
function fnSearch() {
    isTaskSearch = true;
    var criteria = "";
    var taskTable = document.getElementById("TBTaskSearch");
    var value;
    var fieldId;
    for (var rIndex = 0; rIndex < taskTable.tBodies[0].rows.length - 1; rIndex++) {
        for (var cIndex = 0; cIndex < 3; cIndex++) {
            if (taskTable.tBodies[0].rows[rIndex].cells[(cIndex * 2) + 1]) {
                var rootCell = taskTable.tBodies[0].rows[rIndex].cells[(cIndex * 2) + 1];
                if (rootCell.getElementsByTagName("SELECT") && rootCell.getElementsByTagName("SELECT").length > 0) {
                    if (rootCell.getElementsByTagName("INPUT")[0]) {
                        value = rootCell.getElementsByTagName("INPUT")[0].value;
                        fieldId = rootCell.getElementsByTagName("INPUT")[0].id;
                    } else {
                        value = rootCell.getElementsByTagName("SELECT")[0].value;
                        fieldId = rootCell.getElementsByTagName("SELECT")[0].id;
                    }
                    if (! (value == null || value == '')) {
                        criteria = criteria + fieldId + ' ';
                        criteria = criteria + rootCell.getElementsByTagName("SELECT")[0].value + ' ';
                        criteria = criteria + value + '~';
                    }
                } else {
                    var fromValue = rootCell.getElementsByTagName("INPUT")[0].value;
                    if (! (fromValue == null || fromValue == '')) {
                        criteria = criteria + taskSearchFieldName + ' ';
                        criteria = criteria + 'GT ';
                        criteria = criteria + fromValue + '~';
                    }
                    var toValue = rootCell.getElementsByTagName("INPUT")[2].value;
                    if (! (toValue == null || toValue == '')) {
                        criteria = criteria + taskSearchFieldName + ' ';
                        criteria = criteria + 'LT ';
                        criteria = criteria + toValue + '~';
                    }
                }
            }
        }
    }
    SearchCriteria = criteria;
    displayQueueTasks('');
}
*/
function checkForNull(strToCheck) {
    var lDefaultValue = "";
    return (strToCheck == 'null' ? lDefaultValue : strToCheck);
}

// CTCB TASKSEARCH CHANGES START
//Call to this method not detected yet
function getProcessCodeList() {
    var bpelTaskSearch = parent.bpelTaskSearch;
    var tempDoc = loadXMLDoc(bpelTaskSearch);
    var optNew = document.createElement('option');
    setNodeText(optNew, "");
    optNew.value = "";
    processCodeList.add(optNew);
    for (i = 0; i < selectSingleNode(tempDoc, "PROCESS_CODES").childNodes.length; i++) {
        var optNew = document.createElement('option');
        setNodeText(optNew, selectSingleNode(tempDoc, "PROCESS_CODES").childNodes[i].nodeName);
        optNew.value = selectSingleNode(tempDoc, "PROCESS_CODES").childNodes[i].nodeName;
        processCodeList.add(optNew);
    }
}

function showProcessSearchFields(processCode) {
    getTaskSearch(processCode);
    document.getElementById("TBLPageidCustomSearch").style.display = 'block';
}

function populateSubTaskData(xmlDOM) {
    document.getElementById("BTNAcquireTask").disabled = true;
    document.getElementById("BTNReleaseTask").disabled = true;
    document.getElementById("BTNResumeTask").disabled = true;
    document.getElementById("BTNReassignTask").disabled = true;
    document.getElementById("BTNEscalateTask").disabled = true;//12.0.2 Changes
    var tasks = selectNodes(xmlDOM, "//TaskMsg/Tasks/Task");
    var taskLength = tasks.length;
    var tableRef = document.getElementById("tblSubTaskList").tBodies[0];
    if (taskLength == 0) {
        alert(mainWin.getItemDesc("LBL_NO_TASKS_AVAILABLE"));
        return;
    }
    for (var rowIndex = tableRef.rows.length - 1; rowIndex >= 0; rowIndex--) {
        tableRef.deleteRow(rowIndex);
    }

    // Add new rows to the task table for the number of
    // tasks in the task XML DOM.
    var newRow = null;
    for (var taskIndex = 0; taskIndex < taskLength; taskIndex++) {
        rowHTML = '';
        taskId = tasks[taskIndex].getAttribute("ID");
        funcId = tasks[taskIndex].getAttribute("FID");
        var expired = tasks[taskIndex].getAttribute("EXPIRED");
        statusNode = selectSingleNode(tasks[taskIndex], "TaskActions").getAttribute("Status");
        if (funcId != 'PRDEXCEP') {
            newRow = tableRef.insertRow();
            if (expired == "1") {
                newRow.setAttribute("CLASS", "TRBPELTaskExpired");
                newRow.style.color = "RED";
            } else newRow.setAttribute("CLASS", "TRData");
            newRow.setAttribute("FUNCID", funcId);
            newRow.setAttribute("STATUS", statusNode);
            newRow.setAttribute("TASKID", taskId);
            newRow.onmouseover = function () {
                this.className = 'TRDataHover';
            }
            newRow.onmouseout = function () {
                this.className = 'TRData';
            }
            newRow.onfocus = function () {
                this.className = 'TRDataHover';
            }
            newRow.onblur = function () {
                this.className = 'TRData';
            }
            newRow.ondblclick = function (event) {
                showFunctionId(event);
            }

            var colLen = tasks[taskIndex].childNodes.length;
            for (var taskColumnCnt = 0; taskColumnCnt < colLen; taskColumnCnt++) {
                newRow.insertCell(-1);
                try {
                    if (taskColumnCnt < colLen - 1) {
                        var value = checkForNull(getNodeText(tasks[taskIndex].childNodes[taskColumnCnt]));
                        if (tasks[taskIndex].childNodes[taskColumnCnt].nodeName.indexOf("NUMBER") != -1) 
                            tableRef.rows[taskIndex].cells[taskColumnCnt].innerText = Number(value);
                        else tableRef.rows[taskIndex].cells[taskColumnCnt].innerText = value;
                    }
                } catch(e) {}
            }
        }
    }

    return;
}
// CTCB4.0 Changes End Here

var taskHeader = "";
function localizeQueueBrowserXml(queueBrowserXml) {
    var queueBrowserXmlDom = loadXMLDoc(queueBrowserXml);
    if (queueBrowserXmlDom != null) {
        for (var nodeCount = 0; nodeCount < selectNodes(queueBrowserXmlDom, "//@LABEL").length; nodeCount++) {
            var lblDesc = parent.getItemDesc(getNodeText(selectNodes(queueBrowserXmlDom, "//@LABEL")[nodeCount]));
            if (lblDesc) 
                setNodeText(selectNodes(queueBrowserXmlDom, "//@LABEL")[nodeCount], lblDesc);
        }
    }
    return getXMLString(queueBrowserXmlDom);
}

function localizeTasklistHeaderXml(tasklistHeaderXml) {
	taskHeader=loadXMLDoc(tasklistHeaderXml);
    if(taskHeader!=null){
        for (var nodeCount = 0; nodeCount < selectNodes(taskHeader,"//LABEL").length; nodeCount++) {
        	var lblDesc = mainWin.getItemDesc(getNodeText(selectNodes(taskHeader,"//LABEL")[nodeCount]));
        	if(lblDesc)
            	setNodeText(selectNodes(taskHeader,"//LABEL")[nodeCount],lblDesc);
        }
    }
    
    return getXMLString(taskHeader);
}

function initTaskAreaXml() {
    parent.bpelMenuXml = localizeQueueBrowserXml(parent.bpelMenuXml);
    parent.bpelTaskSearch = localizeQueueBrowserXml(parent.bpelTaskSearch);
	if(parent.bpelDashBoardMenuXml!="") parent.bpelDashBoardMenuXml = localizeQueueBrowserXml(parent.bpelDashBoardMenuXml);	//12.0.2 Changes
}

//}
//12.1 Retro_Changes Start Here
var prevAreaype = "Q";
var quickViewFlag = false;
var calDate = "";
var calMonth = "";
var calYear = "";
function fnCalendarMenu(isMainWindow) {
	var dlgArg = new Object();
	parent.mainWin = mainWin;
	dlgArg.mainWin = parent;
	var currUser = parent.UserId;
	var calString;
	var processDate = "";
	var dlgLeft = 400;
	var dlgTop = window.screenTop;
	var currentBranch = mainWin.CurrentBranch;
	var nCurrYear = null;
	var nCurrMonth = null;
	var monthTitle = "Previous Month";
	g_txnBranch = mainWin.CurrentBranch;
        var l_date = mainWin.AppDate.split("-");
        if(calYear =="")
            calYear = l_date[0];
        if (parseInt(calYear) < 1000) 
                parseInt(calYear) += 1900;
        if(calMonth =="")                
            calMonth = l_date[1];
        if(calDate =="") 
            calDate = l_date[2];	
	//var l_date = calendarDate.split("-");
	//nCurrYear = l_date[0];
	nCurrYear = calYear;
	nCurrMonth = calMonth;
        /*
	var winId = "vTabCN_CENTRAL_PROCESSPart4";
	var l_Params = "&winId=" +winId;
	l_Params += "&g_txnBranch=" +mainWin.CurrentBranch;
	l_Params += "&appDate=" +mainWin.AppDate;
	l_Params += "&monthTitle=" +monthTitle;
	if (nCurrMonth == '01') {
		l_Params += "&month=" + 12;
		l_Params += "&year=" + (Number(nCurrYear)-1);
	} else {
		l_Params += "&month=" + (Number(nCurrMonth)-1);
		l_Params += "&year=" + Number(nCurrYear);
	}
	l_Params += "&Brn=" + currentBranch;
	l_Params += "&currUser=" + currUser;
	l_Params += "&txnBranch=" + g_txnBranch;
	l_Params += "&txnBranchDate=" +date;
	var customWinData ="";
	customWinData ="<iframe id='ifr_LaunchWin"+winId+"' src='WFCalendar.jsp?"+l_Params+"' allowtransparency='true' frameborder='0' scrolling='yes' title='' ></iframe>";
	document.getElementById(winId).insertAdjacentHTML("beforeEnd", customWinData);*/
	if(isMainWindow == undefined){
	monthTitle = "Current Month";
	//winId = "vTabCN_CENTRAL_PROCESSPart5";	
        winId = "vTabCN_CENTRAL_PROCESSPart1Calender";
	l_Params  = "&winId=" +winId;
	l_Params += "&g_txnBranch=" +mainWin.CurrentBranch;
	l_Params += "&appDate=" +mainWin.AppDate;
	l_Params += "&monthTitle=" +monthTitle;
	l_Params += "&year=" + nCurrYear;
	l_Params += "&month=" + nCurrMonth;
	l_Params += "&Brn=" + currentBranch;
	//l_Params += "&currUser=" + currUser; //Fix for 25336070
	l_Params += "&txnBranch=" + g_txnBranch;
	l_Params += "&txnBranchDate=" +date;
	/*var calendarHTML ='<div id="vTabCN_CENTRAL_PROCESSPart1Calender" class="DIVcal"><center>';
	calendarHTML +='<BUTTON CLASS="BTNtext" tabindex="-1" onclick="wfPrevYear()">';
	calendarHTML +='<img src="Images/widgetonePrevious.gif" alt="Previous"><img src="Images/widgetonePrevious.gif" alt="Previous"></BUTTON>';
	calendarHTML +='<BUTTON CLASS="BTNtext" tabindex="-1" onclick="wfPrevMonth()">';
	calendarHTML +='<img src="Images/widgetonePrevious.gif" alt="Previous"></BUTTON>';
	calendarHTML +='<BUTTON CLASS="BTNtext"  title="Selected"  style="width:50%" onclick="goToYear()" id=gotoYY onkeydown="return fnHandleCalBtn(event)">';
	calendarHTML +='CALENDAR</BUTTON>';
	calendarHTML +='<BUTTON CLASS="BTNtext" tabindex="-1" onclick="wfNextMonth()">';
	calendarHTML +='<img src="Images/widgetoneNext.gif" alt="Next"></BUTTON>';
	calendarHTML +='<BUTTON CLASS="BTNtext" tabindex="-1" onclick="wfNextYear()">';
        calendarHTML +='<img src="Images/widgetoneNext.gif" alt="Next"><img src="Images/widgetoneNext.gif" alt="Next"></BUTTON></center></div>';    
        */
        //var calendarHTML ='<div id="vTabCN_CENTRAL_PROCESSPart1Calender" class="DIVcal"/>';
	var customWinData ="";
	customWinData ="<iframe id='ifr_LaunchWin"+winId+"' src='WFCalendar.jsp?"+l_Params+"' allowtransparency='true' frameborder='0' scrolling='yes' style='overflow:auto'></iframe>";
	//document.getElementById(winId).insertAdjacentHTML("beforeEnd", customWinData);
	if(parent.document.getElementById("ifr_LaunchWin"+winId)){
		//document.getElementById(winId).innerHTML = calendarHTML;
                document.getElementById(winId).innerHTML = customWinData;
	} else {
		document.getElementById(winId).insertAdjacentHTML("beforeEnd", customWinData);
	}        
        }
/*	monthTitle = "Next Month";
	winId = "vTabCN_CENTRAL_PROCESSPart6";
	l_Params  = "&winId=" +winId;
	l_Params += "&g_txnBranch=" +mainWin.CurrentBranch;
	l_Params += "&appDate=" +mainWin.AppDate;
	l_Params += "&monthTitle=" +monthTitle;
	if (nCurrMonth == '12') {
		l_Params += "&month=" + '01';
		l_Params += "&year=" + (Number(nCurrYear)+1);
	} else {
		l_Params += "&month=" + (Number(nCurrMonth)+1);
		l_Params += "&year=" + Number(nCurrYear);
	}
	l_Params += "&Brn=" + currentBranch;
	l_Params += "&currUser=" + currUser;
	l_Params += "&txnBranch=" + g_txnBranch;
	l_Params += "&txnBranchDate=" +date;
	var customWinData ="";
	customWinData ="<iframe id='ifr_LaunchWin"+winId+"' src='WFCalendar.jsp?"+l_Params+"' allowtransparency='true' frameborder='0' scrolling='yes' title='' ></iframe>";
	document.getElementById(winId).insertAdjacentHTML("beforeEnd", customWinData);
*/
        if(isMainWindow || document.getElementById("DIVTabContentDBoardTasksChildWinCalenderDashBoard")){
	monthTitle = "Current Month";
	winId = "DIVTabContentDBoardTasks";
        if(document.getElementById("hTab_DBoardTasks")!=null)
            document.getElementById("hTab_DBoardTasks").style.display='none';
        document.getElementById("DIVTabContentDBoardTasks").innerHTML = "";        
	l_Params  = "&winId=" +winId;
	l_Params += "&g_txnBranch=" +mainWin.CurrentBranch;
	l_Params += "&appDate=" +mainWin.AppDate;
	l_Params += "&monthTitle=" +monthTitle;
	l_Params += "&year=" + nCurrYear;
	l_Params += "&month=" + nCurrMonth;
	l_Params += "&Brn=" + currentBranch;
	//l_Params += "&currUser=" + currUser; //Fix for 25336070
	l_Params += "&txnBranch=" + g_txnBranch;
	l_Params += "&txnBranchDate=" +mainWin.AppDate;
	var customWin = document.createElement("div");
	customWin.id = winId+"ChildWinCalenderDashBoard";
	customWin.className = "dhtmlwindow";
	customWin.style.position = "absolute";
	customWin.style.height =parent.document.getElementById("DIVTabContentDBoardTasks").scrollHeight+"px";
	customWin.style.width =parent.document.getElementById("DIVTabContentDBoardTasks").scrollWidth+"px";
	var objwindow = '<iframe  id="ifrSubScreen" title="" src="WFCalendarDBoard.jsp?' + l_Params + '" allowtransparency="false" frameborder="0" scrolling="no"  draggable="true"></iframe>';
	customWin.innerHTML = objwindow;
	if(parent.document.getElementById("DIVTabContentDBoardTasks").children.namedItem(winId+'ChildWinCalenderDashBoard')){
		parent.document.getElementById("DIVTabContentDBoardTasks").children.namedItem(winId+'ChildWinCalenderDashBoard').children.namedItem('ifrSubScreen').src='WFCalendarDBoard.jsp?' + l_Params;
	} else {
		parent.document.getElementById("DIVTabContentDBoardTasks").appendChild(customWin);
	}
        }
}
function insertCalendarHTML(areaType) {
	var lblquickview =getItemDesc('LBL_QUICK_VIEW');
	var lblMenu =getItemDesc('LBL_MENU');//"Menu";
	var lblQueue =getItemDesc('LBL_QUEUE');//"Queue";
	var lblDashboard =getItemDesc('LBL_DASHBOARD');//"Dashboard";
	var lblCalendar =getItemDesc('LBL_CALENDAR');//"Calendar";
	var queueBrowserObj = document.getElementById("vTabCN_CENTRAL_PROCESS");
	var firstPartDiv =document.createElement("div");
	firstPartDiv.id ='vTabCN_CENTRAL_PROCESSPart1';
	firstPartDiv.style.height='85%';
	firstPartDiv.style.width='100%';
	firstPartDiv.setAttribute("CLASS", 'tabcontent');
	firstPartDiv.style.display='block';
	var secondPartDiv =document.createElement("div");
	secondPartDiv.id ='vTabCN_CENTRAL_PROCESSPart2';
	secondPartDiv.style.height='15%';
	var thirdPartDiv =document.createElement("div");
	thirdPartDiv.id ='vTabCN_CENTRAL_PROCESSPart3';
	var fourthPartDiv =document.createElement("div");
	fourthPartDiv.id ='vTabCN_CENTRAL_PROCESSPart4';
	var fifthPartDiv =document.createElement("div");
	fifthPartDiv.id ='vTabCN_CENTRAL_PROCESSPart5';
	var sixthPartDiv =document.createElement("div");
	sixthPartDiv.id ='vTabCN_CENTRAL_PROCESSPart6';
	var quickViewHTML ='<span id="vTab_Heading" class ="DashDIVnav1" tabindex="0"><h2 id="vTab_HeadingTop" class="SPNvtabH" onclick=displayMenuTab("M") accesskey="3" tabindex="0">'+lblMenu+'</h2></span>';
	quickViewHTML +='<span id="vTab_Heading" class ="DashDIVnav1" tabindex="0"><h2 id="vTab_HeadingTop" class="SPNvtabH" onclick=displayMenuTab("Q") accesskey="3" tabindex="0">'+lblQueue+'</h2></span>';
	quickViewHTML +='<span id="vTab_Heading" class ="DashDIVnav1" tabindex="0"><h2 id="vTab_HeadingTop" class="SPNvtabH" onclick=displayMenuTab("D") accesskey="3" tabindex="0">'+lblDashboard+'</h2></span>';
	quickViewHTML +='<span id="vTab_Heading" class ="DashDIVnav1" tabindex="0"><h2 id="vTab_HeadingTop" class="SPNvtabH" onclick=displayMenuTab("C") accesskey="3" tabindex="0">'+lblCalendar+'</h2></span>';
	quickViewHTML +='<span id="vTab_Heading" class ="DashDIVnav1" tabindex="0"><h2 id="vTab_HeadingTop" class="SPNvtabH" onclick=displayMenuTab("V") accesskey="3" tabindex="0">'+lblquickview+'</h2>';
	quickViewHTML +='<div id="btnDiv12qv" style="float: right; margin-right: 5px;"></div>';
	quickViewHTML +='<div id="btnDivqv" style="float: right; margin-right: 10px;"><button id="btnprevqv" class="Abut" onclick=fnEnableQuickNavi("P") disabled=""><img src="Images/widgetonePrevious.gif" alt="Previous"></button><button id="btnnextqv" class="Abut" onclick=fnEnableQuickNavi("N") disabled=""><img src="Images/widgetoneNext.gif" alt="Next"></button></div>';
	quickViewHTML +='</span>';
	var calendarHTML ='<div class="DIVcal"><center>';
	calendarHTML +='<BUTTON CLASS="BTNtext" tabindex="-1" onclick="wfPrevYear()">';
	calendarHTML +='<img src="Images/widgetonePrevious.gif" alt="Previous"><img src="Images/widgetonePrevious.gif" alt="Previous"></BUTTON>';
	calendarHTML +='<BUTTON CLASS="BTNtext" tabindex="-1" onclick="wfPrevMonth()">';
	calendarHTML +='<img src="Images/widgetonePrevious.gif" alt="Previous"></BUTTON>';
	calendarHTML +='<BUTTON CLASS="BTNtext"  title="Selected"  style="width:50%" onclick="goToYear()" id=gotoYY onkeydown="return fnHandleCalBtn(event)">';
	calendarHTML +='CALENDAR</BUTTON>';
	calendarHTML +='<BUTTON CLASS="BTNtext" tabindex="-1" onclick="wfNextMonth()">';
	calendarHTML +='<img src="Images/widgetoneNext.gif" alt="Next"></BUTTON>';
	calendarHTML +='<BUTTON CLASS="BTNtext" tabindex="-1" onclick="wfNextYear()">';
        calendarHTML +='<img src="Images/widgetoneNext.gif" alt="Next"><img src="Images/widgetoneNext.gif" alt="Next"></BUTTON></center></div>';
	if (window.ActiveXObject) {
		queueBrowserObj.appendChild(firstPartDiv);
		secondPartDiv.insertAdjacentHTML("beforeEnd",quickViewHTML);
		secondPartDiv.appendChild(thirdPartDiv);
		queueBrowserObj.appendChild(secondPartDiv);
		queueBrowserObj = document.getElementById("vTabCN_CENTRAL_PROCESSPart1");
		queueBrowserObj.appendChild(firstPartDiv);
		firstPartDiv.insertAdjacentHTML("beforeEnd",calendarHTML);
		parent.document.getElementById("vTabCN_CENTRAL_PROCESSPart1").children[0].style.width = parent.document.getElementById("vTabCN_CENTRAL_PROCESSPart1").parentNode.offsetWidth - 10 +'px';
		queueBrowserObj.appendChild(fourthPartDiv);
		queueBrowserObj = document.getElementById("vTabCN_CENTRAL_PROCESSPart1");
		queueBrowserObj.appendChild(firstPartDiv);
		queueBrowserObj.appendChild(fifthPartDiv);
		queueBrowserObj = document.getElementById("vTabCN_CENTRAL_PROCESSPart1");
		queueBrowserObj.appendChild(firstPartDiv);
		queueBrowserObj.appendChild(sixthPartDiv);
		queueBrowserObj = document.getElementById("vTabCN_CENTRAL_PROCESSPart1");
	} else {
		queueBrowserObj.appendChild(firstPartDiv);
		secondPartDiv.innerHTML =quickViewHTML;
		secondPartDiv.appendChild(thirdPartDiv);
		queueBrowserObj.appendChild(secondPartDiv);
		queueBrowserObj = document.getElementById("vTabCN_CENTRAL_PROCESSPart1");
	}
	fnCalendarMenu();
}
function displayMenuTab(areaType) {
	if (areaType == "V") {
		if (quickViewFlag) {
			quickViewFlag = false;
		} else {
			quickViewFlag = true;
		}
		if (prevAreaype == "C")
			return;
	} else {
		prevAreaype = areaType;
	}
	isTaskSearch =false;
	isFilterTask =false;
	document.getElementById("vTabCN_CENTRAL_PROCESS").innerHTML = "";
	initTaskAreaXml();
	if (areaType == "C") {
		var l_date = mainWin.AppDate.split("-");
		calYear = l_date[0];
		if (parseInt(calYear) < 1000) 
			parseInt(calYear) += 1900;
		calMonth = l_date[1];
		calDate = l_date[2];
		insertCalendarHTML(areaType);
	} else {
		insertTaskQueueBrowserHTML(areaType);
	}
	if (areaType == "Q" || prevAreaype == "Q")
		try {
			createTree("treemenu2", true);
		} catch(e) {}
	if (areaType == "M" || prevAreaype == "M")
		try {
			createTree("treemenu3", true);
		} catch(e) {}
	if (areaType == "D" || prevAreaype == "D")
		try {
			createTree("treemenu4", true);
		} catch(e) {}
	insertTasklistHeaderHTML();
	if (areaType != "C") {
		document.getElementById("DIVTabContent"+currentTab).innerHTML = getBPELTaskHTML();
	}
	document.getElementById('btnDiv12').style.display = "none";
	document.getElementById('btnDiv').style.display = "none";
	document.getElementById('btnprev').disabled = true;
	document.getElementById('btnnext').disabled = true;
	unmask();
}
function goToYear() {
	var gotoYY = calYear;
	do {
		gotoYY = prompt(mainWin.getItemDesc("ENTER_YEAR"), calYear);
		if (!gotoYY) break;
	} while (isNaN(gotoYY) || (gotoYY < 1900) || (gotoYY > 9999));
	if (gotoYY) {
		calYear = gotoYY;
                //wfSetCalDate();
                fnCalendarMenu();
    }
}
function wfNextMonth() {
    calMonth++;
    if (calMonth > 12) {
        calMonth -= 12;
        calYear++;
    }
    //wfSetCalDate();
    fnCalendarMenu();
}
function wfPrevMonth() {
    calMonth--;
    if (calMonth < 1) {
        calMonth += 12;
        calYear--;
    }
    //wfSetCalDate();
    fnCalendarMenu();
}
function wfPrevYear() {
    calYear--;
    //wfSetCalDate();
    fnCalendarMenu();
}
function wfNextYear() {
    calYear++;
    //wfSetCalDate();
    fnCalendarMenu();
}
function wfSetCalDate() {
	isTaskSearch =false;
	isFilterTask =false;
	document.getElementById("vTabCN_CENTRAL_PROCESS").innerHTML = "";
	initTaskAreaXml();
	insertCalendarHTML("C");
	insertTasklistHeaderHTML();
	document.getElementById('btnDiv12').style.display = "none";
	document.getElementById('btnDiv').style.display = "none";
	document.getElementById('btnprev').disabled = true;
	document.getElementById('btnnext').disabled = true;
	unmask();
}
//12.1 Retro_Changes End Here
function insertTaskQueueBrowserHTML(areaType) {
	var lblquickview =getItemDesc('LBL_QUICK_VIEW');
	var lblLocateTask =getItemDesc('LBL_LOCATE_TASK');
	var tmpbpelDashBoardMenuXml = loadXMLDoc(parent.bpelDashBoardMenuXml);
	var tmpgXmlMenu = loadXMLDoc(gXmlMenu);
//12.0.2 Changes Ends
    var queueHtml = ShowMenu(parent.bpelMenuXml, "SMBPLBRW", "Templates/XSL/SMBPLBRW.xsl");
//12.0.2 Changes Starts
    var orignHtml = ShowMenu(gXmlMenu, "SMBPLORIG", "Templates/XSL/SMAPPBRW.xsl");
	var dashBoardHtml = ShowMenu(parent.bpelDashBoardMenuXml, "SMBPLDBD", "Templates/XSL/SMBPLBRW.xsl");
//12.0.2 Changes Ends
    var queueBrowserObj = document.getElementById("vTabCN_CENTRAL_PROCESS");
//12.0.2 Changes Starts
	//var applicationHtml = '<div id="vTabCN_CENTRAL_PROCESSPart1" style="height:70%"><fieldset id="fldstApplication" class="FSTstd"><legend>Application</legend></fieldset>';
//1203_OR_CHANGES starts
	//var applicationHtml = '<fieldset id="fldstApplication" class="FSTstd"><legend>'+getItemDesc("LBL_APPLICATION_DSH")+'</legend></fieldset>';
        var applicationHtml = '<fieldset class="FSTstd" onclick="hideTaskMenu(\'APPLIACTION\')"><legend>'+getItemDesc("LBL_APPLICATION_DSH");
        applicationHtml += '<span style="float: left;" id="div_application_label">';
        applicationHtml += '<button id="appminimizer" class="BTNicon" onmouseout="this.className=\'BTNicon\'" onmouseover="this.className=\'BTNiconH\'" onblur="this.className=\'BTNicon\'" onfocus="this.className=\'BTNiconH\'" onkeydown="return handleActionKeys(this, event)" title="Collapse Menu" >';
        applicationHtml += '<span class="subSystemExpand" style="height:14px"></span></button></span></legend></fieldset>';
        //var applicationHtml = '<span class="DIVtab" onclick=hideTaskMenu("APPLIACTION")><h2 id="vTab_HeadingTop" class="SPNvtabH" accesskey="3" tabindex="0">'+getItemDesc("LBL_APPLICATION_DSH")+'</h2></span>';
	//var dashboardLabelHtml = '<fieldset id="fldstDashBoard" class="FSTstd"><legend>'+getItemDesc("LBL_DASHBOARD_NAME")+'</legend></fieldset>';
        var dashboardLabelHtml = '<fieldset class="FSTstd"  onclick="hideTaskMenu(\'DASHBOARD\')"><legend>'+getItemDesc("LBL_DASHBOARD_NAME");
        dashboardLabelHtml += '<span style="float: left;" id="div_dashboard_label">';
        dashboardLabelHtml += '<button id="dbminimizer" class="BTNicon" onmouseout="this.className=\'BTNicon\'" onmouseover="this.className=\'BTNiconH\'" onblur="this.className=\'BTNicon\'" onfocus="this.className=\'BTNiconH\'" onkeydown="return handleActionKeys(this, event)" title="Collapse Menu">';
        dashboardLabelHtml += '<span class="subSystemExpand" style="height:14px"></span></button></span></legend></fieldset>';
        //var dashboardLabelHtml = '<span class	="DIVtab" onclick=hideTaskMenu("DASHBOARD")><h2 id="vTab_HeadingTop" class="SPNvtabH" accesskey="3" tabindex="0">'+getItemDesc("LBL_DASHBOARD_NAME")+'</h2></span>';
//calender changes ends
	//var queueLableHtml = '<fieldset id="fldstDashBoard" class="FSTstd"><legend>'+getItemDesc("LBL_QUEUE_DSH")+'</legend></fieldset>';
//calender changes starts
        var queueLableHtml = '<fieldset class="FSTstd"  onclick="hideTaskMenu(\'QUEUE\')"><legend>'+getItemDesc("LBL_QUEUE_DSH");
        queueLableHtml += '<span style="float: left;" id="div_queue_label">';
        queueLableHtml += '<button id="queueminimizer" class="BTNicon" onmouseout="this.className=\'BTNicon\'" onmouseover="this.className=\'BTNiconH\'" onblur="this.className=\'BTNicon\'" onfocus="this.className=\'BTNiconH\'" onkeydown="return handleActionKeys(this, event)" title="Collapse Menu">';
        queueLableHtml += '<span class="subSystemExpand" style="height:14px"></span></button></span></legend></fieldset>';
        //var queueLableHtml = '<span class="DIVtab" onclick=hideTaskMenu("QUEUE")><h2 id="vTab_HeadingTop" class="SPNvtabH" accesskey="3" tabindex="0">'+getItemDesc("LBL_QUEUE_DSH")+'</h2></span>';
//calender changes ends
	//var quickSearchHtml = '<fieldset id="fldstDashBoard" class="FSTstd"><legend>'+getItemDesc("LBL_QUICKSEARCH_DSH")+'</legend></fieldset>';
 //calender changes starts       
        //var calenderLabelHtml = '<span class="DashDIVnav1" onclick=hideTaskMenu("CALENDER")><h2 id="vTab_HeadingTop" class="SPNvtabH" accesskey="3" tabindex="0">'+getItemDesc("LBL_CALENDER")+'</h2></span>';
        var calenderLabelHtml = '<fieldset class="FSTstd"  onclick="hideTaskMenu(\'CALENDER\')"><legend>'+getItemDesc("LBL_CALENDAR");
        calenderLabelHtml += '<span style="float: left;" id="div_calender_label">';
        calenderLabelHtml += '<button id="calminimizer" class="BTNicon" onmouseout="this.className=\'BTNicon\'" onmouseover="this.className=\'BTNiconH\'" onblur="this.className=\'BTNicon\'" onfocus="this.className=\'BTNiconH\'" onkeydown="return handleActionKeys(this, event)" title="Collapse Menu">';
        calenderLabelHtml += '<span class="subSystemCollapse" style="height:14px"></span></button></span></legend></fieldset>';
	/*var calendarHTML ='<div id="vTabCN_CENTRAL_PROCESSPart1Calender" class="DIVcal"><center>';
	calendarHTML +='<BUTTON CLASS="BTNtext" tabindex="-1" onclick="wfPrevYear()">';
	calendarHTML +='<img src="Images/widgetonePrevious.gif" alt="Previous"><img src="Images/widgetonePrevious.gif" alt="Previous"></BUTTON>';
	calendarHTML +='<BUTTON CLASS="BTNtext" tabindex="-1" onclick="wfPrevMonth()">';
	calendarHTML +='<img src="Images/widgetonePrevious.gif" alt="Previous"></BUTTON>';
	calendarHTML +='<BUTTON CLASS="BTNtext"  title="Selected"  style="width:50%" onclick="goToYear()" id=gotoYY onkeydown="return fnHandleCalBtn(event)">';
	calendarHTML +='CALENDAR</BUTTON>';
	calendarHTML +='<BUTTON CLASS="BTNtext" tabindex="-1" onclick="wfNextMonth()">';
	calendarHTML +='<img src="Images/widgetoneNext.gif" alt="Next"></BUTTON>';
	calendarHTML +='<BUTTON CLASS="BTNtext" tabindex="-1" onclick="wfNextYear()">';
        calendarHTML +='<img src="Images/widgetoneNext.gif" alt="Next"><img src="Images/widgetoneNext.gif" alt="Next"></BUTTON></center></div>';    */
        var calendarHTML ='<div id="vTabCN_CENTRAL_PROCESSPart1Calender" class="DIVcal"/>';
        var quickSearchHtml = '<fieldset class="FSTstd"  onclick="hideTaskMenu(\'QUICKSEARCH\')"><legend>'+getItemDesc("LBL_QUICKSEARCH_DSH");
        quickSearchHtml += '<span style="float: left;" id="div_quicksearch_label">';
        quickSearchHtml += '<button id="quickminimizer" class="BTNicon" onmouseout="this.className=\'BTNicon\'" onmouseover="this.className=\'BTNiconH\'" onblur="this.className=\'BTNicon\'" onfocus="this.className=\'BTNiconH\'" onkeydown="return handleActionKeys(this, event)" title="Collapse Menu">';
        quickSearchHtml += '<span class="subSystemExpand" style="height:14px"></span></button></span></legend></fieldset>';
        //var quickSearchHtml = '<span class="DashDIVnav1" onclick=hideTaskMenu("QUICKSEARCH")><h2 id="vTab_HeadingTop" class="SPNvtabH" accesskey="3" tabindex="0">'+getItemDesc("LBL_QUICKSEARCH_DSH")+'</h2></span>';
	//quickSearchHtml += '<div class="DIVList" id="quichSearchDiv"><table><tr>'; //Jeev Changes
	//var quickSearchHtml = '<div class="DIVList"><table><tr>'; //Jeev Changes
//RND changes ends
        quickSearchHtml += '<span class="DIVList" id="quichSearchDiv">'
	quickSearchHtml += '<table><tr><td><label>'+getItemDesc("LBL_WFREFNO")  +'</label></td>';
	//quickSearchHtml += '<td><label class="LBLstd" for="QuickSearchValue">WFRef No</label></td>';
	quickSearchHtml += '<td><input id="QuickSearchValue" class="TXTstd" size="23" title="Workflow Reference" onkeydown="fnQuickSearchKey(event)"></td>';//HTML5 Changes 14/NOV/2016
	quickSearchHtml += '<td><button id="btnrefreshQ" class="Abut" onclick="fnQuickTaskSearch()">';
	quickSearchHtml += '<img alt="Filter" src="Images/search_button.gif">';
	//RND Changes starts
        quickSearchHtml += '</button></td>';
        quickSearchHtml += '<td><button id="locateTask" class="BTNicon" onclick="fnLocateTask()"  title="'+lblLocateTask+'">';
	//RND Changes ends
        //quickSearchHtml += '<img alt="Filter" src="Images/locateButton.png">';
        quickSearchHtml +='<span class="ICOfilter"><span class="LBLinv">'+lblLocateTask+'</span></span>';
	quickSearchHtml += '</button></td></tr></table></div></span>';
	//var quickViewDiv = '</div><div id="vTabCN_CENTRAL_PROCESSPart2" style="height:30%"></div>';
	var firstPartDiv =document.createElement("div");
	firstPartDiv.id ='vTabCN_CENTRAL_PROCESSPart1';
	firstPartDiv.style.height='65%';
	firstPartDiv.style.width='100%';
	firstPartDiv.setAttribute("CLASS", 'tabcontent bpel');//HTML5 Changes 6/OCT/2016
	firstPartDiv.style.display='block';
	var secondPartDiv =document.createElement("div");
	secondPartDiv.id ='vTabCN_CENTRAL_PROCESSPart2';
	secondPartDiv.style.height='32%';
	var thirdPartDiv =document.createElement("div");
	thirdPartDiv.id ='vTabCN_CENTRAL_PROCESSPart3';
//RND changes starts
        var reminderAlertDiv =document.createElement("div");
        reminderAlertDiv.id ='Div_ReminderAlertWin';
        reminderAlertDiv.style.position='absolute';
        reminderAlertDiv.style.display='none';
        var reminderAlertiframeHtml ='<iframe id="ifr_ReminderAlertWin" class="frames" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>';
        /*var reminderAlertiframe =document.createElement("iframe");
        reminderAlertiframe.id ='ifr_ReminderAlertWin';
        reminderAlertiframe.className ='frames';
        var fourthPartDiv =document.createElement("div");
	fourthPartDiv.id ='vTabCN_CENTRAL_PROCESSPart4';
	var fifthPartDiv =document.createElement("div");
	fifthPartDiv.id ='vTabCN_CENTRAL_PROCESSPart5';
	var sixthPartDiv =document.createElement("div");
	sixthPartDiv.id ='vTabCN_CENTRAL_PROCESSPart6';
	var quickViewHTML ='<span id="vTab_Heading" class ="DashDIVnav1" tabindex="0"><h2 id="vTab_HeadingTop" class="SPNvtabH" onclick=displayMenuTab("M") accesskey="3" tabindex="0">'+lblMenu+'</h2></span>';
	quickViewHTML +='<span id="vTab_Heading" class ="DashDIVnav1" tabindex="0"><h2 id="vTab_HeadingTop" class="SPNvtabH" onclick=displayMenuTab("Q") accesskey="3" tabindex="0">'+lblQueue+'</h2></span>';
	quickViewHTML +='<span id="vTab_Heading" class ="DashDIVnav1" tabindex="0"><h2 id="vTab_HeadingTop" class="SPNvtabH" onclick=displayMenuTab("D") accesskey="3" tabindex="0">'+lblDashboard+'</h2></span>';
	quickViewHTML +='<span id="vTab_Heading" class ="DashDIVnav1" tabindex="0"><h2 id="vTab_HeadingTop" class="SPNvtabH" onclick=displayMenuTab("C") accesskey="3" tabindex="0">'+lblCalendar+'</h2></span>';
	quickViewHTML +='<span id="vTab_Heading" class ="DashDIVnav1" tabindex="0"><h2 id="vTab_HeadingTop" class="SPNvtabH" onclick=displayMenuTab("V") accesskey="3" tabindex="0">'+lblquickview+'</h2>';*/
	var quickViewHTML ='<span id="vTab_HeadingQV" class="DashDIVnav1"><h2 id="vTab_HeadingTopQV" class="SPNvtabH">'+lblquickview+'</h2>';
//RND changes ends
	//quickViewHTML +='<div id="btnDiv12qv" style="float: right; margin-right: 5px;"></div>';
	quickViewHTML +='<div id="btnDivqv" style="float: right; margin-right: 10px;"><button id="btnprevqv" class="Abut" onclick=fnEnableQuickNavi("P") disabled=""><img src="Images/widgetonePrevious.gif" alt="Previous"></button><button id="btnnextqv" class="Abut" onclick=fnEnableQuickNavi("N") disabled=""><img src="Images/widgetoneNext.gif" alt="Next"></button></div>';
	quickViewHTML +='</span>';
	var count1 =selectNodes(tmpbpelDashBoardMenuXml ,"//LEAF[@ISDASHBOARD='Y']").length;
	//var count2 =selectNodes(tmpgXmlMenu ,"//NODE[@LABEL='Origination']").length; //9NT1606_12_4_RETRO_12_0_2_26231157 changes 
	var count2 =selectNodes(tmpgXmlMenu ,"//NODE[@LABEL='" + getItemDesc("LBL_ORG") +"']").length; //9NT1606_12_4_RETRO_12_0_2_26231157 changes 
    if (getBrowser().indexOf("IE") != -1) {//ie11 changes
		queueBrowserObj.appendChild(firstPartDiv);
		secondPartDiv.insertAdjacentHTML("beforeEnd",quickViewHTML);
//12.1 Retro_Changes starts
                reminderAlertDiv.insertAdjacentHTML("beforeEnd",reminderAlertiframeHtml);
                //queueBrowserObj.appendChild(reminderAlertDiv);  
//12.1 Retro_Changes ends
		secondPartDiv.appendChild(thirdPartDiv);
		queueBrowserObj.appendChild(secondPartDiv);
		queueBrowserObj = document.getElementById("vTabCN_CENTRAL_PROCESSPart1");
		queueBrowserObj.insertAdjacentHTML("beforeEnd", quickSearchHtml);
		if(count2 >0)
			queueBrowserObj.insertAdjacentHTML("beforeEnd", applicationHtml);
        queueBrowserObj.insertAdjacentHTML("beforeEnd", orignHtml);
		if(count1 >0)
			queueBrowserObj.insertAdjacentHTML("beforeEnd", dashboardLabelHtml);
		queueBrowserObj.insertAdjacentHTML("beforeEnd", dashBoardHtml);
		queueBrowserObj.insertAdjacentHTML("beforeEnd", queueLableHtml);
        queueBrowserObj.insertAdjacentHTML("beforeEnd", queueHtml);
//12.1 Retro_Changes starts
                queueBrowserObj.insertAdjacentHTML("beforeEnd", calenderLabelHtml);
                queueBrowserObj.insertAdjacentHTML("beforeEnd", calendarHTML);
//12.1 Retro_Changes ends
        //queueBrowserObj.insertAdjacentHTML("beforeEnd", quickViewDiv);		
    } else {
		queueBrowserObj.appendChild(firstPartDiv);
		secondPartDiv.innerHTML =quickViewHTML;
//12.1 Retro_Changes starts
                reminderAlertDiv.innerHTML =reminderAlertiframeHtml;
                //queueBrowserObj.appendChild(reminderAlertDiv);
//12.1 Retro_Changes ends
		secondPartDiv.appendChild(thirdPartDiv);
		queueBrowserObj.appendChild(secondPartDiv);
		queueBrowserObj = document.getElementById("vTabCN_CENTRAL_PROCESSPart1");
		queueBrowserObj.innerHTML += quickSearchHtml;
		if(count2 >0)
			queueBrowserObj.innerHTML += applicationHtml;
        queueBrowserObj.appendChild(orignHtml);
		if(count1 >0)
			queueBrowserObj.innerHTML += dashboardLabelHtml;
		queueBrowserObj.appendChild(dashBoardHtml);
		queueBrowserObj.innerHTML += queueLableHtml;
        queueBrowserObj.appendChild(queueHtml);
//12.1 Retro_Changes starts
                queueBrowserObj.innerHTML += calenderLabelHtml;
                queueBrowserObj.innerHTML += calendarHTML;
//12.1 Retro_Changes ends
        //queueBrowserObj.innerHTML +=quickViewDiv;
	}
//12.1 Retro_Changes starts
        fnCalendarMenu();
        document.getElementById("vTabCN_CENTRAL_PROCESSPart1Calender").style.display = "none";
}
function hideTaskMenu(title){
    switch (title)
    {
        case "APPLIACTION":
            if (document.getElementById("treemenu3").style.display == "none"){
                document.getElementById("treemenu3").style.display = "block";
                document.getElementById("div_application_label").getElementsByTagName("span")[0].className = "subSystemExpand";
            }
            else{
                document.getElementById("treemenu3").style.display = "none";
                document.getElementById("div_application_label").getElementsByTagName("span")[0].className = "subSystemCollapse";
            }
            break;
        case "DASHBOARD":
            if (document.getElementById("treemenu4").style.display == "none"){
                 document.getElementById("treemenu4").style.display = "block";
                 document.getElementById("div_dashboard_label").getElementsByTagName("span")[0].className = "subSystemExpand";
            }
            else{
                document.getElementById("treemenu4").style.display = "none";
                document.getElementById("div_dashboard_label").getElementsByTagName("span")[0].className = "subSystemCollapse";
            }
            break;
        case "QUEUE":
            if (document.getElementById("treemenu2").style.display == "none"){
                document.getElementById("treemenu2").style.display = "block";
                document.getElementById("div_queue_label").getElementsByTagName("span")[0].className = "subSystemExpand";
            }
            else{
                document.getElementById("treemenu2").style.display = "none";
                document.getElementById("div_queue_label").getElementsByTagName("span")[0].className = "subSystemCollapse";
            }
            break;
        case "QUICKSEARCH":
            if (document.getElementById("quichSearchDiv").style.display == "none"){
                document.getElementById("quichSearchDiv").style.display = "block";
                document.getElementById("div_quicksearch_label").getElementsByTagName("span")[0].className = "subSystemExpand";
            }                
            else{
                document.getElementById("quichSearchDiv").style.display = "none";
                document.getElementById("div_quicksearch_label").getElementsByTagName("span")[0].className = "subSystemCollapse";
            }
            break;
        case "CALENDER":
            if (document.getElementById("vTabCN_CENTRAL_PROCESSPart1Calender").style.display == "none"){
                document.getElementById("vTabCN_CENTRAL_PROCESSPart1Calender").style.display = "block";
                document.getElementById("div_calender_label").getElementsByTagName("span")[0].className = "subSystemExpand";
                fnCalendarMenu(true);
                showHideVtab();//HTML5 Changes 14/NOV/2016
            }
            else{
                document.getElementById("vTabCN_CENTRAL_PROCESSPart1Calender").style.display = "none";
                document.getElementById("div_calender_label").getElementsByTagName("span")[0].className = "subSystemCollapse";
            }
            break;             
    }
} 
//12.1 Retro_Changes ends
function insertTasklistHeaderHTML() {
    try{
	 //120P01 Tash History Starts
    /*var tableHeader = document.getElementById("tblTaskList").tHead;

    var heading = new Array();
    if (taskHeader != "") {
        for (i = 0; i < selectNodes(taskHeader, "//LABEL").length; i++) {
            heading[i] = getNodeText(selectNodes(taskHeader, "//LABEL")[i]);
        }
    }
    var newCell;
    var newRow = document.createElement("TR");
    tableHeader.appendChild(newRow);
    newCell = document.createElement("TH");
    newCell.innerHTML = '<label class="LBLauto" for="Checkbox"><INPUT TYPE="CHECKBOX" id="Checkbox"/></label>';
    newRow.appendChild(newCell);
    for (i = 0; i < heading.length; i++) {
        newCell = document.createElement("TH");
        newCell.innerHTML = heading[i];
        newRow.appendChild(newCell);
    }*/  //120P01 Tash History Ends
    var txnTableHeader = document.getElementById("tblTaskHistory").tHead;

    var historyHeaderItems = new Array();
	historyHeaderItems[0] = mainWin.getItemDesc("LBL_TITLE"); //12.0.2 Changes
    historyHeaderItems[1] = mainWin.getItemDesc("LBL_ACTION_TIME");
    historyHeaderItems[2] = mainWin.getItemDesc("LBL_PICKUP_TIME");
    historyHeaderItems[3] = mainWin.getItemDesc("LBL_USER_ID");
    historyHeaderItems[4] = mainWin.getItemDesc("LBL_USER_NAME");
    historyHeaderItems[5] = mainWin.getItemDesc("LBL_ACTION_CODE");
    historyHeaderItems[6] = mainWin.getItemDesc("LBL_ACTION_DESCRIPTION");
    historyHeaderItems[7] = mainWin.getItemDesc("LBL_BRANCH");
    historyHeaderItems[8] = mainWin.getItemDesc("LBL_REMARKS");
    historyHeaderItems[9] = mainWin.getItemDesc("LBL_VIEW");
    newRow = document.createElement("TR");
    txnTableHeader.appendChild(newRow);
    for (i = 0; i < historyHeaderItems.length; i++) {
        newCell = document.createElement("TH");
        newCell.className = "TBLoneTH";
        newCell.setAttribute("scope", "col");
        newCell.innerHTML = "<A class=Astd>"+historyHeaderItems[i]+"</A>";
        newRow.appendChild(newCell);
    }
    }catch(e){}
}

//12.1 Retro_Changes starts
function buildTaskArea(areaType) {
    initTaskAreaXml();
    areaType = "Q";
    insertTaskQueueBrowserHTML(areaType);
    try{
    createTree("treemenu2", true); //Create tree for queue browser.
    }catch(e){}
    try{
    createTree("treemenu3", true); 	//12.0.2 Changes
    }catch(e){}
    try{
    createTree("treemenu4", true); //12.0.2 Changes
    }catch(e){}
    insertTasklistHeaderHTML();
}
//12.1 Retro_Changes ends
//12.0.2 Changes Starts
function buildTaskDashBoardArea() {
    insertDashBoardQueueBrowserHTML();
    createTree("treemenu2", true); 
    //insertTasklistHeaderHTML();
//12.0.2 Changes Ends
}

function fnBpelRefresh(refreshType) {
    /*if (!mainWin.isSessionActive()) {
        return;
    }*/
    if(document.getElementById("tasksDiv") || refreshType == "D")
    { 	
	if(refreshType != "D")
    //document.getElementById("tasksDiv").style.display = 'none'; //12.0.2 SOATEAM Changes
    if (expandQueue.length > 0) {
        var nodeQuery = "/MENU/NODE["; //12.1 Retro_Changes
        for (var index = 0; index < expandQueue.length; index++) {
            if (index != 0) 
                nodeQuery = nodeQuery + " and ";
            nodeQuery = nodeQuery + "@ID!='" + expandQueue[index] + "'";
        }
        nodeQuery = nodeQuery + "]";
        var tempDoc = loadXMLDoc(parent.bpelMenuXml);
		var tempDocLen = selectNodes(tempDoc, nodeQuery).length;
        for (var i = 0; i < tempDocLen; i++)
            selectNodes(tempDoc, nodeQuery)[0].parentNode.removeChild(selectNodes(tempDoc, nodeQuery)[0]);
        getTaskCount(getXMLString(tempDoc));
    }
}
   
   isRefresh = true;
   try{	
   fnQuickViewShowDb(curr_page);
   }catch(e){
    }
   isRefresh = false;
}


function fnAcquireTasks() {
    var tableRef = document.getElementById("tblTaskList").tBodies[0];
    var rowNum = tableRef.rows.length;
    var taskIdList = '';
    for (var index = 0; index < rowNum; index++) {
        if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            taskIdList = taskIdList + tableRef.rows[index].getAttribute('TASKID') + '~';
        }
    }
    fnDoAction(taskIdList, 'ACQUIRE');
}

function fnReleaseTasks() {
    var tableRef = document.getElementById("tblTaskList").tBodies[0];
    var rowNum = tableRef.rows.length;
    var taskIdList = '';
    for (var index = 0; index < rowNum; index++) {
        if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            showRemoveReminder(tableRef.rows[index].getAttribute('TASKID'));//12.1 Retro_Changes
            taskIdList = taskIdList + tableRef.rows[index].getAttribute('TASKID') + '~';
        }
    }
    fnDoAction(taskIdList, 'RELEASE');
}

function fnResumeTasks() {
    var tableRef = document.getElementById("tblTaskList").tBodies[0];
    var rowNum = tableRef.rows.length;
    var taskIdList = '';
    for (var index = 0; index < rowNum; index++) {
        if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            taskIdList = taskIdList + tableRef.rows[index].getAttribute('TASKID') + '~';
        }
    }
    fnDoAction(taskIdList, 'RESUME');
}

function fnRenewTasks() {
    var tableRef = document.getElementById("tblTaskList").tBodies[0];
    var rowNum = tableRef.rows.length;
    var taskIdList = '';
    for (var index = 0; index < rowNum; index++) {
        if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            taskIdList = taskIdList + tableRef.rows[index].getAttribute('TASKID') + '~';
        }
    }
    if(g_cur_queueId == 'EXPIRED')
    {
        fnDoAction(taskIdList, 'EXPIRE');
    }
    else 
    {
        fnDoAction(taskIdList, 'RENEW');
    }    
}
function fnCopyTaskDom(CopyTaskDom)
{
   var wfIdList = "";
   if (CopyTaskDom) 
   {
      try
      {
           var workIdList = getNodeText(selectSingleNode(CopyTaskDom, "//RESPONSE/WORKID")).split(",");
           var frmStageList = getNodeText(selectSingleNode(CopyTaskDom, "//RESPONSE/FROMSTAGES")).split(",");
           var toStageList = getNodeText(selectSingleNode(CopyTaskDom, "//RESPONSE/TOSTAGES")).split(",");
           var processIdList = getNodeText(selectSingleNode(CopyTaskDom, "//RESPONSE/TASKPROCESSID")).split(",");         
           if(workIdList.length == frmStageList.length && workIdList.length == toStageList.length && workIdList.length == processIdList.length)
           {
             for (var index = 0; index < workIdList.length; index++) 
             {
                 wfIdList = wfIdList + workIdList[index] + ',' + frmStageList[index] + ',' + toStageList[index] + ',' + processIdList[index] + '~';
             }
           }
       }
       catch(e)
       {
           wfIdList = "";
       }
   }
   return wfIdList;
}
//12.0.2 Changes Starts
/*
function fnDepictTasks()
{
	var customWin = document.createElement("div");
    var tableRef = document.getElementById("tblTaskList").tBodies[0];
    var rowNum = tableRef.rows.length;
    var instanceIdList = '';
    //document.getElementById("DIVTabContentDBoardTasks").children[0].style.height = 500 +"px";
	customWin.id = "ChildWin";
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    for (var index = 0; index < rowNum; index++) {
        if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            instanceIdList = instanceIdList + tableRef.rows[index].getAttribute('INSTANCEID') + '~';
        }
    }
	if(instanceIdList.split('~').length >2) {
		//alert('Bulk operation is not supported');
		showAlerts(fnBuildAlertXML('IN-HEAR-205', 'E'), 'E');
		return false;
	}
	//src	='Depict.jsp';
	base64image =getFlowDiagram(instanceIdList.split('~')[0]);
	src	="FCDocumentControllerServlet?Action=FileView&FileName=" + base64image+"&X-CSRFTOKEN=" + mainWin.CSRFtoken;
	//var objwindow = '<iframe class="frames" id="ifrSubScreen" title="" src="' + src + '" allowtransparency="true" frameborder="0" scrolling="auto" height="100%" width="100%" draggable="true"></iframe>';
	if(base64image==null||base64image=='')
		//showAlerts(fnBuildAlertXML('IN-HEAR-133', 'E'), 'E');
		showAlerts(fnBuildAlertXML('OR-INF-008', 'E'), 'E');
	else{	
//		var objwindow = '<iframe class="frames" onload="reSize()" id="ifrSubScreen" title="" src="' + src + '" allowtransparency="true" frameborder="0" scrolling="yes" height ="'+document.getElementById("DIVTabContentDBoardTasks").scrollHeight+'" Width ="'+document.getElementById("DIVTabContentDBoardTasks").scrollWidth+'" draggable="true"></iframe>';
//		var printReportDIVHeight    = document.getElementById("WNDtitlebar");
//		customWin.innerHTML = objwindow;
//		document.getElementById("DIVTabContentDBoardTasks").appendChild(customWin);
         mainWin.open(src, null, "width=640px,height=480px,resizable=yes,scrollbars=yes,status=1,toolbar=no", false);
	}
}
*/
function fnCopyTasks() 
{
    var tableRef = document.getElementById("tblTaskList").tBodies[0];
    var rowNum = tableRef.rows.length;
    var multiTaskflag = false;
    var multiTaskCnt = 0;
    var taskIdList = '';
    var wfIdList = '';
    var taskId = '';
    var currStage = '';
    var targetStage = '';
    for (var idx = 0; idx < rowNum; idx++) 
    {
        if (tableRef.rows[idx].cells[0].getElementsByTagName("INPUT")[0].checked == true) 
        {
            multiTaskCnt = multiTaskCnt + 1;
        }
    } 
    if (multiTaskCnt > 0)
    {
        if (multiTaskCnt == 1)
        {
          multiTaskflag = true;    
        }
        for (var index = 0; index < rowNum; index++) 
        {
            if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) 
            {
                taskId = tableRef.rows[index].getAttribute('TASKID');
                currStage = tableRef.rows[index].getAttribute('FUNCID');
                if(multiTaskflag)
                {                    
                    mainWin.document.getElementById('BLK_BRANCH__STAGE').value  = currStage;
                    disp_lov('SMCHGBRN','BLK_BRANCH','STAGE','Target Stage','LOV_TASK_COPY', 'Task Copy Stages', '', '', '', event);	                                        
                    mainWin.document.getElementById('BLK_BRANCH__STAGE').value  = '';
                    return true;
                }
                taskIdList = taskIdList + taskId + ',' + currStage + ',' + targetStage + '~';
            }
        }    
        fnDoAction(taskIdList, 'COPYTASK');
        wfIdList = fnCopyTaskDom(gTaskCopyDom);
        if (wfIdList != "")
        {
          fnDoActionAsync(wfIdList, 'MOVETASK');
        }
    }
    return true;
}

function fnCopyTask(stage) 
{
//12.0.2 Changes Starts
	if(isDashboardCopy){
		copytaskFunctionRef(stage);
		isDashboardCopy = false;
		return true;
	}
//12.0.2 Changes Ends
    var tableRef = document.getElementById("tblTaskList").tBodies[0];             
    var rowNum = tableRef.rows.length;
    var taskIdList = '';
    var wfIdList = '';
    var taskId = '';
    var currStage = '';    
    try
    {
          for (var index = 0; index < rowNum; index++) 
          {
             if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) 
             {
                    taskId = tableRef.rows[index].getAttribute('TASKID');
                    currStage = tableRef.rows[index].getAttribute('FUNCID');             
                    taskIdList = taskIdList + taskId + ',' + currStage + ',' + stage + '~';
             }
          } 
          fnDoAction(taskIdList, 'COPYTASK'); 
          wfIdList = fnCopyTaskDom(gTaskCopyDom);
          if (wfIdList != "")
          {
            fnDoActionAsync(wfIdList, 'MOVETASK');
          }
    }
    catch(e){}
    mainWin.document.getElementById('BLK_BRANCH__STAGE').value  = '';
    return true;
}
function fnReassignTasks() {
    var tableRef = document.getElementById("tblTaskList").tBodies[0];
    var rowNum = tableRef.rows.length;
    var taskIdList = '';
    var workFlowRefList = '';
    for (var index = 0; index < rowNum; index++) {
        if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            showRemoveReminder(tableRef.rows[index].getAttribute('TASKID')); //12.1 Retro_Changes
            taskIdList = taskIdList + tableRef.rows[index].getAttribute('TASKID') + '~';
            //workFlowRefList = workFlowRefList + tableRef.rows[index].cells[1].childNodes[0].childNodes[0].nodeValue + '~';
		workFlowRefList = workFlowRefList + tableRef.rows[index].getAttribute('WFREFNO') + '~';
        }
    }
    showReassign(workFlowRefList, taskIdList);
}

//12.0.2 Changes Starts
function fnEscalateTasks() {
    fnShowRemarks('ESCALATE');
}
function fnShowRemarks(action) {
    var l_Params  = "action=" +action;
    try {
        mask();
        loadSubScreenDIV("ChildWin", "WFRemarks.jsp?"+l_Params);
    } catch (e) {
        alert(scriptError);
    }
}
function fnCloseRemarks(processFlag) {
	var childDivObj = document.getElementById("ChildWin");
/*    if (navigator.userAgent.toLowerCase().indexOf("opera") != -1)
		childDivObj.parentNode.removeChild(childDivObj);
	else {
		childDivObj.getElementsByTagName("IFRAME")[0].src = "";
		document.getElementById("Div_ChildWin").removeChild(childDivObj);
	}*/
	if (processFlag)
	{
		var tableRef = document.getElementById("tblTaskList").tBodies[0];
		var rowNum = tableRef.rows.length;
		var taskIdList = '';
		for (var index = 0; index < rowNum; index++) 
		{
//12.1 Retro_Changes starts
			if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true){
                                showRemoveReminder(tableRef.rows[index].getAttribute('TASKID'));
				taskIdList = taskIdList + tableRef.rows[index].getAttribute('TASKID') + '~';
                        }	
//12.1 Retro_Changes ends
		}
		fnDoAction(taskIdList, 'ESCALATE', comments);
	}
	else
		unmask();
	if (getBrowser().indexOf("OPERA") != -1)//ie11 changes
		childDivObj.parentNode.removeChild(childDivObj);
	else {
		childDivObj.getElementsByTagName("IFRAME")[0].src = "";
		document.getElementById("Div_ChildWin").removeChild(childDivObj);
	}	
}
function fnGetTaskComments(taskId, isDashBoard) {
  if(gTasksDOM!= null && selectSingleNode(gTasksDOM, "//Tasks/Task[@ID='"+taskId+"']/PROTECTEDTEXTATTRIBUTE1") != null && getNodeText(selectSingleNode(gTasksDOM, "//Tasks/Task[@ID='"+taskId+"']/PROTECTEDTEXTATTRIBUTE1"))!= "null" && getNodeText(selectSingleNode(gTasksDOM, "//Tasks/Task[@ID='"+taskId+"']/PROTECTEDTEXTATTRIBUTE1"))!= "")
  {
    var taskComments = getNodeText(selectSingleNode(gTasksDOM, "//Tasks/Task[@ID='"+taskId+"']/PROTECTEDTEXTATTRIBUTE1"));
    var msgType = "I";
    var errcode = taskComments.substring(0, taskComments.indexOf("~")) + "~" + "OR-INF-003";
    var msg ;
    if(taskComments.indexOf("~") !=-1) 
       msg = "~" + taskComments.substring(taskComments.indexOf("~")+1, taskComments.length);
    else
      msg = "~" +taskComments;
    if(!isDashBoard)
    {
      mask();
      //showAlerts(fnBuildAlertXML(errcode, msgType, msg), msgType);
      showErrorAlerts(errcode, msgType, msg);
    }
    else
    {
      //showAlerts(fnBuildAlertXML(errcode, msgType,msg), msgType);
	  parent.showErrorAlerts(errcode, msgType, msg);
      //parent.gAlertMessage = gAlertMessage;
    }
  }
}
//12.0.2 Changes Ends
function fnHandleActionBtns() {
    var tableRef = document.getElementById("tblTaskList").tBodies[0];
    var outcome;
    var acquireFlag = 'N';
    var releaseFlag = 'N';
    var resumeFlag = 'N';
    var reassignFlag = 'N';
    var escalateFlag = 'N'; //12.0.2 Changes 
	var renewFlag = 'N';//12.0.2 Changes 
    var copyFlag = 'N';
	var depictFlag ='N';  //12.0.2 Changes 
    var flag = false;
    for (var rowIndex = 0; rowIndex < tableRef.rows.length; rowIndex++) {
        if (tableRef.rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
			if(g_cur_queueId != 'AGING' && g_cur_queueId != 'EXPIRED'){  //12.0.2 Changes
				depictFlag ='Y';								  //12.0.2 Changes 
            outcome = tableRef.rows[rowIndex].getAttribute("OUTCOMES");
            if (!flag) {
                if (outcome.indexOf("ACQUIRE") != -1) 
                {
                    acquireFlag = 'Y';
                    copyFlag = 'Y';
                }
                if (outcome.indexOf("RELEASE") != -1) 
					{
                    releaseFlag = 'Y';
						escalateFlag = 'Y';  //12.0.2 Changes 
					}
                if (outcome.indexOf("RESUME") != -1) 
                    resumeFlag = 'Y';
                if (outcome.indexOf("REASSIGN") != -1) 
                    reassignFlag = 'Y';
					//12.0.2 Changes  Starts
					/* 23658056 Changes Starts */
					if (outcome.indexOf("ESCALATE") != -1) {
						
						var tasksDomCount = selectNodes(gTasksDOM, "//TaskMsg[@queueType='S']").length;
						if(tasksDomCount>0){
							document.getElementById("BTNEscalateTask").disabled = true;
							escalateFlag = 'N';
						}else
						escalateFlag = 'Y';
					}
					/* 23658056 Changes Ends */	
					//12.0.2 Changes Ends
                flag = true;
            } else {
                if (outcome.indexOf("ACQUIRE") == -1 && acquireFlag == 'Y') 
                    acquireFlag = 'N';
                if (outcome.indexOf("RELEASE") == -1 && releaseFlag == 'Y') 
					{
                    releaseFlag = 'N';
						escalateFlag = 'N'; //12.0.2 Changes
					}
                if (outcome.indexOf("RESUME") == -1 && resumeFlag == 'Y') 
                    resumeFlag = 'N';
                else if (outcome.indexOf("REASSIGN") == -1 && reassignFlag == 'Y') 
                    reassignFlag = 'N';
					//12.0.2 Changes Starts
					if (outcome.indexOf("ESCALATE") == -1 && escalateFlag == 'Y') 
						escalateFlag = 'N';
				}
			}else{
				acquireFlag ='N';
				releaseFlag ='N';
				resumeFlag ='N';
				reassignFlag ='N';
				escalateFlag ='N';
				renewFlag ='Y';
				copyFlag ='N';
				depictFlag ='Y';
			}
        }
    }
	//Ageing Queue Fix Starts
	/*
	//nags
	if(g_cur_queueId == 'AGING' || g_cur_queueId == 'EXPIRED'){
		for (var rowIndex = 0; rowIndex < tableRef.rows.length; rowIndex++) {
			if (tableRef.rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
				renewFlag = 'Y';
				fnEnableDisableActionButton('N', 'N', 'N', 'N', 'N',renewFlag,'N','N');  //Jeev Test Changes
    }
    else 
    {
				fnEnableDisableActionButton(acquireFlag, releaseFlag, resumeFlag, reassignFlag, escalateFlag, 'N', copyFlag, depictFlag);
			}
		}
	}
	//nags
    else 
    {
	*/
	//Ageing Queue Fix ends
	 //fnEnableDisableActionButton(acquireFlag, releaseFlag, resumeFlag, reassignFlag, escalateFlag, 'N',copyFlag,depictFlag);  /*Jeev Test Changes*/
	 fnEnableDisableActionButton(acquireFlag, releaseFlag, resumeFlag, reassignFlag, escalateFlag, renewFlag,copyFlag,depictFlag);  /*Jeev Test Changes*/
    //}	 //12.0.2 Changes Ends
}
function fnEnableDisableActionButton(acquireFlag, releaseFlag, resumeFlag, reassignFlag, escalateFlag, renewFlag,copyFlag,depictFlag) { //12.0.2 Changes 
    if (acquireFlag == 'Y') {
        document.getElementById("BTNAcquireTask").disabled = false;
        document.getElementById("BTNAcquireTask").className = "BTNtext";
    } else {
        document.getElementById("BTNAcquireTask").disabled = true;
        document.getElementById("BTNAcquireTask").className = "BTNtextD";
    }
    if (releaseFlag == 'Y') {
        document.getElementById("BTNReleaseTask").disabled = false;
        document.getElementById("BTNReleaseTask").className = "BTNtext";
    } else {
        document.getElementById("BTNReleaseTask").disabled = true;
        document.getElementById("BTNReleaseTask").className = "BTNtextD";
    }
    if (resumeFlag == 'Y') {
        document.getElementById("BTNResumeTask").disabled = false;
        document.getElementById("BTNResumeTask").className = "BTNtext";
    } else {
        document.getElementById("BTNResumeTask").disabled = true;
        document.getElementById("BTNResumeTask").className = "BTNtextD";
    }
    if (reassignFlag == 'Y') {
        document.getElementById("BTNReassignTask").disabled = false;
        document.getElementById("BTNReassignTask").className = "BTNtext";
    } else {
        document.getElementById("BTNReassignTask").disabled = true;
        document.getElementById("BTNReassignTask").className = "BTNtextD";
    }
    //12.0.2 Changes Starts
    if (escalateFlag == 'Y') {
        document.getElementById("BTNEscalateTask").disabled = false;
        document.getElementById("BTNEscalateTask").className = "BTNtext";
    } else {
        document.getElementById("BTNEscalateTask").disabled = true;
        document.getElementById("BTNEscalateTask").className = "BTNtextD";
    }
    //12.0.2 Changes Ends
    if (renewFlag == 'Y') {
        document.getElementById("BTNRenewTask").disabled = false;
        document.getElementById("BTNRenewTask").className = "BTNtext";
		//document.getElementById("BTNRenewTask").style.visibility="HIDDEN";//9NT1606_12_2_RETRO_12_0_1_25160056 //9NT1606_14_1_CNSL_FBC_31890153 commented
    } else {
        document.getElementById("BTNRenewTask").disabled = true;
        document.getElementById("BTNRenewTask").className = "BTNtextD";
		//document.getElementById("BTNRenewTask").style.visibility="HIDDEN";//9NT1606_12_2_RETRO_12_0_1_25160056 //9NT1606_14_1_CNSL_FBC_31890153 commented
    }
     if (copyFlag == 'Y') {
        document.getElementById("BTNCopyTask").disabled = false;
        document.getElementById("BTNCopyTask").className = "BTNtext";
    } else {
        document.getElementById("BTNCopyTask").disabled = true;
        document.getElementById("BTNCopyTask").className = "BTNtextD";
    }
//12.0.2 Changes Starts
    if (depictFlag == 'Y') {
        document.getElementById("BTNDepictTask").disabled = false;
        document.getElementById("BTNDepictTask").className = "BTNtext";
    } else {
        document.getElementById("BTNDepictTask").disabled = true;
        document.getElementById("BTNDepictTask").className = "BTNtextD";
    }				   
//12.0.2 Changes Ends
}

function getTaskCount(bpelXml) {
    var serverURL = "FCClientHandler";
    var objHTTP = createHTTPActiveXObject();
    taskSearchXML = "<TaskRequest OP = 'TASKCOUNT'>";
     var bpelXmlDeclRemoved = bpelXml;
    if(bpelXml.substring(0,21).toLowerCase() == '<?xml version="1.0"?>'){
       bpelXmlDeclRemoved = bpelXml.substring(21);
    }
    taskSearchXML = taskSearchXML + bpelXmlDeclRemoved;
    taskSearchXML = taskSearchXML + "</TaskRequest>";
    objHTTP.open("POST", serverURL, true);
    objHTTP.setRequestHeader("Content-Type", "application/xml");
	objHTTP.setRequestHeader("accept-encoding", "gzip");		
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("FUNCTIONID", "");
    objHTTP.setRequestHeader("OPERATION", "BPELACTION");
    objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
    objHTTP.setRequestHeader("TXNBRANCH", g_txnBranch);
    objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
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
    objHTTP.onreadystatechange = function () {
        if (objHTTP.readyState == 4) {
            var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
            } else {
                taskListXML = objHTTP.responseXML;
                var bpelXml;
                if (getXMLString(taskListXML) != "") 
                    bpelXml = getXMLString(taskListXML.documentElement.lastChild);
                if (bpelXml != "") {
                    var leafNodes = selectNodes(taskListXML, "//NODE/LEAF");
                    var queueName = "";
                    for (var i = 0; i < leafNodes.length; i++) {
                        queueName = leafNodes[i].getAttribute("queueId");
                        if (document.getElementById(queueName)) {
                            document.getElementById(queueName).childNodes[0].nodeValue = " " + leafNodes[i].getAttribute("LABEL");
                        }
                    }
					//12.1 Retro_Changes starts
                    leafNodes = selectNodes(taskListXML, "//NODE/NODE");
                    queueName = "";
                    for (var i = 0; i < leafNodes.length; i++) {
                        queueName = leafNodes[i].getAttribute("queueId");
                        if (document.getElementById(queueName)) {
                            document.getElementById(queueName).childNodes[0].nodeValue = " " + leafNodes[i].getAttribute("LABEL");
                        }
                    } 
					//12.1 Retro_Changes ends					
                }
            }
        }
    }
    objHTTP.send(taskSearchXML);
    var response = "";
    return response;
}

//Call to this method not detected yet
function lockCol(tblID) {
    var table = document.getElementById(tblID);
    var cTR = table.getElementsByTagName('TR');
    if (table.rows[0].cells[0].className == '') {
        for (i = 0; i < cTR.length; i++) {
            var tr = cTR[i];
            tr.cells[0].className = 'locked';
            tr.cells[1].className = 'locked';
            tr.cells[2].className = 'locked';
            tr.cells[3].className = 'locked';
        }
    } else {
        for (i = 0; i < cTR.length; i++) {
            var tr = cTR[i];
            tr.cells[0].className = '';
            tr.cells[1].className = '';
            tr.cells[2].className = '';
            tr.cells[3].className = '';
        }
    }
}
var currTaskTblRowIndex;  //12.0.2 Changes 
var currTaskTblObj;  //12.0.3 Changes 
var wfrefNo="";//12.1 Changes
function fnViewTaskHistory(event) {
//12.0.2 Changes Starts
	//var tabobjlinks = document.getElementById('taskdboardHistorytablist').getElementsByTagName("A"); 
	//var tabObj = document.getElementById('taskdboardHistorytablistHistory');
	//fnSetTabAttributes(tabObj, tabobjlinks);
if(document.getElementById("BTNrecalcSchedule"))
        document.getElementById("BTNrecalcSchedule") .style.display = 'none';
  var tabLinkArr = document.getElementById('taskdboardHistorytablistDiv').getElementsByTagName("A");
  for(var cnt = 0; cnt < tabLinkArr.length; cnt++){
    if(tabLinkArr[cnt].getElementsByTagName("SPAN")[0].className == "DBoardHeadDivSpanSel") {
      tabLinkArr[cnt].getElementsByTagName("SPAN")[0].className = "DBoardHeadDivSpanDeSel";
      break;
    }
  }
  document.getElementById('taskdboardHistorytablistHistory').getElementsByTagName("SPAN")[0]. className = "DBoardHeadDivSpanSel";    
//12.0.2 Changes Ends
    var e = window.event || event
    var rowIndex = getRowIndex(e);
    rowIndex = rowIndex -2 ;//12.1 Changes Temp Need to verify in 12.0.3
//12.0.2 Changes Starts
	if(rowIndex >= 0)
		currTaskTblRowIndex = rowIndex;
	else
		rowIndex = currTaskTblRowIndex;
changeTaskDisplay(rowIndex);
document.getElementById('workflowRefNo').parentNode.style.display='block';
if(document.getElementById("tblTaskList") && document.getElementById("tblTaskList") !=undefined ){
document.getElementById('workflowRefNo').innerHTML =document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute('wfrefno');
    wfrefNo = document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute('wfrefno'); //12.1 Changes
//12.0.2 Changes Ends
    var taskId = document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute('TASKID');
}
else{
    var currTempTaskTblObj =getTableObject(e);
    if(currTempTaskTblObj && currTempTaskTblObj!=undefined)
        currTaskTblObj =currTempTaskTblObj;
    document.getElementById('workflowRefNo').innerHTML =currTaskTblObj.tBodies[0].rows[rowIndex-1].getAttribute('wfrefno');
    wfrefNo =currTaskTblObj.tBodies[0].rows[rowIndex-1].getAttribute('wfrefno');//12.1 changes
    var taskId = currTaskTblObj.tBodies[0].rows[rowIndex-1].getAttribute('TASKID');
}
//12.0.2 Changes Ends
    var taskActionXML = "";
    // Build the task request XML with op as action...
    taskActionXML = "<TaskRequest OP = 'ACTION'>";
    taskActionXML = taskActionXML + "<TaskId>" + taskId + "</TaskId>";
	taskActionXML = taskActionXML + "<WfRefNo/>";//12.0.2 Changes
    taskActionXML = taskActionXML + "<ActionName>VIEW_TASK_HISTORY</ActionName>";
    taskActionXML = taskActionXML + "</TaskRequest>";

    var serverURL = "FCClientHandler";
    var objHTTP = createHTTPActiveXObject();
    var actionResponseXML = null;
    objHTTP.open("POST", serverURL, true);
    objHTTP.setRequestHeader("Content-Type", "application/xml");
	objHTTP.setRequestHeader("accept-encoding", "gzip");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("FUNCTIONID", "");
    objHTTP.setRequestHeader("OPERATION", "BPELACTION");
    objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
    //FCUBS11.0 BPEL Changes
    objHTTP.setRequestHeader("TXNBRANCH", g_txnBranch);
    objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
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
	
    objHTTP.onreadystatechange = function () {
        if (objHTTP.readyState == 4) {
            var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
            } else {
                actionResponseXML = objHTTP.responseXML;
                populateHistoryData(getXMLString(actionResponseXML));
            }
        }
    }
    objHTTP.send(taskActionXML);
}
  
function FnSortTask(event) {
    var e = window.event || event;
    var handleobj = getEventSourceElement(e);
    while (handleobj.tagName != 'TH')
    handleobj = handleobj.parentElement;
    var Headervalue = handleobj.id;
    if (handleobj.lastChild.nameProp == 'down.gif' || handleobj.lastChild.nameProp == 'spacer.gif') var sortOrder = "ASCENDING";
    else var sortOrder = "DESCENDING";
    displayQueueTasks(currQueueId, '', Headervalue, sortOrder);
}

var expandQueue = new Array();

function fnRefreshMenu(submenu, menuId) {
    if (menuId != 1) {
        if (submenu.getAttribute("rel") == "closed") {
            expandQueue.push(menuId);
		currPage = 1;
		if(document.getElementById("currPage")!=null) document.getElementById("currPage").value = currPage; //12.0.2 Changes
            fnBpelRefresh();
        } else {
            var index;
            for (index = 0; index < expandQueue.length; index++) {
                if (expandQueue[index] == menuId) {
                    break;
                }
            }
            expandQueue.splice(index, 1);
        }
    }
}

//Call to this method not detected yet
function getMsXmlDom(prefix, namespace) {
    var msXmlDom = createDOMObject();
    msXmlDom.async = false;
    msXmlDom.resolveExternals = true;
    if (prefix != "" && namespace != "") {
        var ns = "xmlns:" + prefix + "='" + namespace + "'";
        msXmlDom.setProperty("SelectionNamespaces", ns);
    }
    return msXmlDom;
}

function fnCheckAllTasks() {
    var tableRef = document.getElementById("tblTaskList").tBodies[0];
    var tableHdr = document.getElementById("tblTaskList").tHead;
    if (tableHdr.rows[0].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
        for (var rowIndex = 0; rowIndex < tableRef.rows.length; rowIndex++) {
            tableRef.rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked = true;
        }
    } else if (tableHdr.rows[0].cells[0].getElementsByTagName("INPUT")[0].checked == false) {
        for (var rowIndex = 0; rowIndex < tableRef.rows.length; rowIndex++) {
            tableRef.rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked = false;
        }
    }
    fnHandleActionBtns();
}

//Call to this method not detected yet
function attachEventBrowser(element, eventName, callback) {
    if (typeof(element) == "string") 
        element = document.getElementById(element);
    if (element == null) 
        return;
    if (element.addEventListener) 
        element.addEventListener(eventName, callback, false);
    else if (element.attachEvent) 
        element.attachEvent("on" + eventName, callback);
}

//Call to this method not detected yet
function detachEventBrowser(element, eventName, callback) {
    if (typeof(element) == "string") 
        element = document.getElementById(element);
    if (element == null) 
        return;
    if (element.removeEventListener) 
        element.removeEventListener(eventName, callback, false);
    else if (element.detachEvent) 
        element.detachEvent("on" + eventName, callback);
}

function fnHandlexBPELTaskListOnKeyDown(event) {
    var evnt = window.event || event;
    var srcEle = getEventSourceElement(evnt);
    if (evnt.keyCode == 9) { //tab key
        if (document.getElementById("tblTaskHistory").tBodies[0].rows.length > 0) {
            document.getElementById("tblTaskHistory").tBodies[0].rows[0].cells[0].children[0].focus();
            preventpropagate(evnt);
            return false;
        } else {
            if (document.getElementById("TlBarOper").className == "dispNone") {
                document.getElementById("nav").getElementsByTagName("A")[0].focus();
                preventpropagate(evnt);
                return false;
            } else {
                var elemBtn = document.getElementById("TlBarOper").getElementsByTagName("BUTTON");
                for (var i = 0; i < elemBtn.length; i++) {
                    if (!elemBtn[i].disabled) {
                        elemBtn[i].focus();
                        preventpropagate(evnt);
                        return false;
                    }
                }
            }
        }
    }
    if (evnt.keyCode == 13) { //enter key
        showFunctionId(getRowIndex(evnt) - 1, evnt);
    }
    if (evnt.keyCode == 115) { //F4 key
        fnViewTaskHistory(evnt);
    }
    if (evnt.keyCode == 32) { //Space key
        preventpropagate(evnt);
        return false;
    }
    if (evnt.keyCode == 37) { //left arrow key
        var cellElement = srcEle;
        while (cellElement.tagName.toUpperCase() != "TD") {
            cellElement = fnGetParentHTMLElement(cellElement);
        }
        if (getPreviousSibling(cellElement) && getPreviousSibling(cellElement).children[0] && getPreviousSibling(cellElement).children[0].tagName.toUpperCase() != "LABEL") {
            getPreviousSibling(cellElement).children[0].focus();
        } else if (getPreviousSibling(cellElement) && getPreviousSibling(cellElement).children[0] && getPreviousSibling(cellElement).children[0].tagName.toUpperCase() == "LABEL") {
            getPreviousSibling(cellElement).children[0].children[0].focus();
        }
    }
    if (evnt.keyCode == 39) { //right arrow key
        var cellElement = srcEle;
        while (cellElement.tagName.toUpperCase() != "TD") {
            cellElement = fnGetParentHTMLElement(cellElement);
        }
        if (getNextSibling(cellElement) && getNextSibling(cellElement).children[0]) {
            getNextSibling(cellElement).children[0].focus();
            preventpropagate(evnt);
            return false;
        }
    }
    if (evnt.keyCode == 38) { //up arrow key
        var cellElement = srcEle;
        while (cellElement.tagName.toUpperCase() != "TD") {
            cellElement = fnGetParentHTMLElement(cellElement);
        }
        var rowElement = fnGetParentHTMLElement(cellElement);
        if (getPreviousSibling(rowElement)) {
            if (getPreviousSibling(rowElement).cells[cellElement.cellIndex].children[0].tagName.toUpperCase() != "LABEL") {
                getPreviousSibling(rowElement).cells[cellElement.cellIndex].children[0].focus();
            } else if (getPreviousSibling(rowElement).cells[cellElement.cellIndex].children[0].tagName.toUpperCase() == "LABEL") {
                getPreviousSibling(rowElement).cells[cellElement.cellIndex].children[0].children[0].focus();
            }
        }
    }
    if (evnt.keyCode == 40) { //down arrow key
        var cellElement = srcEle;
        while (cellElement.tagName.toUpperCase() != "TD") {
            cellElement = fnGetParentHTMLElement(cellElement);
        }
        var rowElement = fnGetParentHTMLElement(cellElement);
        if (getNextSibling(rowElement)) {
            if (getNextSibling(rowElement).cells[cellElement.cellIndex].children[0].tagName.toUpperCase() != "LABEL") {
                getNextSibling(rowElement).cells[cellElement.cellIndex].children[0].focus();
            } else if (getNextSibling(rowElement).cells[cellElement.cellIndex].children[0].tagName.toUpperCase() == "LABEL") {
                getNextSibling(rowElement).cells[cellElement.cellIndex].children[0].children[0].focus();
            }
        }
    }
}

function fnHandlexBPELTaskHistoryOnKeyDown(event) {
    var evnt = window.event || event;
    var srcEle = getEventSourceElement(evnt);
    if (evnt.keyCode == 9) { //tab key
        if (document.getElementById("TlBarOper").className == "dispNone") {
            document.getElementById("nav").getElementsByTagName("A")[0].focus();
            preventpropagate(evnt);
            return false;
        } else {
            var elemBtn = document.getElementById("TlBarOper").getElementsByTagName("BUTTON");
            for (var i = 0; i < elemBtn.length; i++) {
                if (!elemBtn[i].disabled) {
                    elemBtn[i].focus();
                    preventpropagate(evnt);
                    return false;
                }
            }
        }
    }
    if (evnt.keyCode == 13) { //enter key
        preventpropagate(evnt);
        return false;
    }
    if (evnt.keyCode == 115) { //F4 key
        preventpropagate(evnt);
        return false;
    }
    if (evnt.keyCode == 32) { //Space key
        preventpropagate(evnt);
        return false;
    }
    if (evnt.keyCode == 37) { //left arrow key
        var cellEle = srcEle;
        while (cellEle.tagName.toUpperCase() != "TD") {
            cellEle = fnGetParentHTMLElement(cellEle);
        }
        if (getPreviousSibling(cellEle) && getPreviousSibling(cellEle).children[0]) {
            getPreviousSibling(cellEle).children[0].focus();
        }
        preventpropagate(evnt);
        return false;
    }
    if (evnt.keyCode == 39) { //right arrow key
        var cellEle = srcEle;
        while (cellEle.tagName.toUpperCase() != "TD") {
            cellEle = fnGetParentHTMLElement(cellEle);
        }
        if (getNextSibling(cellEle) && getNextSibling(cellEle).children[0]) {
            getNextSibling(cellEle).children[0].focus();
        }
        preventpropagate(evnt);
        return false;
    }
    if (evnt.keyCode == 38) { //up arrow key
        var cellEle = srcEle;
        while (cellEle.tagName.toUpperCase() != "TD") {
            cellEle = fnGetParentHTMLElement(cellEle);
        }
        var rowEle = fnGetParentHTMLElement(cellEle);
        if (getPreviousSibling(rowEle) && getPreviousSibling(rowEle).children[cellEle.cellIndex].children[0]) {
            getPreviousSibling(rowEle).children[cellEle.cellIndex].children[0].focus();
        }
        preventpropagate(evnt);
        return false;
    }
    if (evnt.keyCode == 40) { //down arrow key
        var cellEle = srcEle;
        while (cellEle.tagName.toUpperCase() != "TD") {
            cellEle = fnGetParentHTMLElement(cellEle);
        }
        var rowEle = fnGetParentHTMLElement(cellEle);
        if (getNextSibling(rowEle) && getNextSibling(rowEle).children[cellEle.cellIndex].children[0]) {
            getNextSibling(rowEle).children[cellEle.cellIndex].children[0].focus();
        }
        preventpropagate(evnt);
        return false;
    }
}
//12.1 Retro_Changes starts
function displayDashBoardPage(queueNames, queueTypes, bamURLs, filedLists, actions, desc, numOfPartition, event) {
    if (document.getElementById("hTab_DBoardTasks") != null)
        document.getElementById("hTab_DBoardTasks").style.display = 'none';
    if (queueNames == "null" || queueNames == "") {
        //alert("No Queue is defined for this dashboard");
        showAlerts(fnBuildAlertXML('IN-HEAR-041', 'E'), 'E');
        return true;
    }
    curPage=1;
    gQueueNamesArr = queueNames;
    gQueueTypesArr = queueTypes;
    gBamURLsArr = bamURLs;
    gFiledListsArr = filedLists;
    gActionsArr = actions;
    gDescArr = desc;
    gNumOfPartition = numOfPartition;
    displayDashboardQueue(queueNames, queueTypes, bamURLs, filedLists, actions, desc, event);
    fnControlNavButtons();
    document.getElementById('btnrefresh').disabled = false; 
    return true;
}
function fnControlNavButtons()
{
 if(curPage == Math.ceil((gQueueNamesArr.split("!").length-1)/numOfPartition))
       document.getElementById('btnnext').disabled = true;
       else
       document.getElementById('btnnext').disabled = false;
     if(curPage == 1 )
       document.getElementById('btnprev').disabled = true;
     else
       document.getElementById('btnprev').disabled = false;
    return true;
} 
var dashboardWindow;
//12.1 Retro_Changes ends
//12.0.2 Changes Starts
function displayDashboardQueue(queueNames,queueTypes,bamURLs,filedLists,actions,desc,event){
	if(SearchCriteria != "")
	{
		isTaskSearch=false;
	}
	isFilterTask=false;
    var evnt = window.event || event;
	//document.getElementById("btnDiv").style.display='';
	//document.getElementById("btnDiv12").style.display='';
	/*if(document.getElementById("SYS_TBL_TASK_TABS")!=null)
		document.getElementById("SYS_TBL_TASK_TABS").style.display='none';*/
//12.1 Retro_Changes starts
    /* if(document.getElementById("hTab_DBoardTasks")!=null)
		document.getElementById("hTab_DBoardTasks").style.display='none';
    document.getElementById("DIVTabContentDBoardTasks").innerHTML = "";
	if(queueNames == "null" || queueNames == ""){
		//alert("No Queue is defined for this dashboard");
		showAlerts(fnBuildAlertXML('IN-HEAR-041', 'E'), 'E');
		return true;
	}Moved to  displayDbQueueHelper*/
    document.getElementById("DIVTabContentDBoardTasks").innerHTML = "";
    /*if(getBrowser().indexOf('IE') !=-1 && getIEVersionNumber() > 8 && queueTypes.indexOf('B')!==-1){
        var scrWidth    =mainWin.x - document.getElementById("vtab").offsetWidth - 12;
        if(  parseInt(mainWin.document.getElementById("dashboard").offsetHeight) > 0){
            mainDiv =  mainWin.document.getElementById("dashboard");
        } else{
            mainDiv =  mainWin.document.getElementById("MenuSearchDiv");
        }
        var scrHeight = parseInt(mainDiv.offsetHeight) -document.getElementById("masthead").offsetHeight - 4;
        var strWindowFeatures = "menubar=no;location=no;resizable=no;scrollbars=no;status=no;dialogWidth="+scrWidth+"px;dialogHeight:"+scrHeight+"px;top="+document.getElementById("masthead").offsetHeight+"px;dialogLeft="+document.getElementById("vtab").offsetWidth+"px";
        var url="BpelDashboardLauncher.jsp?queueNames="+queueNames+"&queueTypes="+queueTypes+"&bamURLs="+bamURLs+"&filedLists="+filedLists+"&actions="+actions+"&desc="+desc+"&numOfPartition="+gNumOfPartition;
        dashboardWindow = window.showModalDialog(url, "DashBoardWindow", strWindowFeatures);
        return true;
    }
    else{*/
    var divTabContent = document.getElementById("DIVTabContentDBoardTasks");
    //}
//12.1 Retro_Changes Ends
	var queueNamesArr = new Array();
	var queueTypesArr = new Array();
	var bamURLsArr = new Array();
	var filedListsArr = new Array();
	var actionsArr = new Array();
	var descArr = new Array();
	queueNamesArr = queueNames.split('!');
	queueTypesArr = queueTypes.split('!');
	bamURLsArr = bamURLs.split('!');
	filedListsArr = filedLists.split('!');
	actionsArr = actions.split('!');
	descArr = desc.split('!');
    var from = (curPage - 1) * gNumOfPartition;	
    var to = (curPage * gNumOfPartition) - 1;
    if (to >= queueNamesArr.length - 1) {	
        to = queueNamesArr.length - 2;		
    }
	var j=0;
    winIdContent	=new Array();
    //for (var i=0;i<queueNamesArr.length;i++){
    for (var i = from;i <= to;i++) {//12.1 Retro_Changes
		var queueDetails = new Array();
        var numOfCurPgPart = to+1 - from;		//12.1 Retro_Changes
		if(queueNamesArr[i]!='null'&&queueNamesArr[i]!=''||(queueTypesArr[i]!='Q' && queueTypesArr[i]!='')){
			var timestamp = getDateObject();
            //queueDetails[j] = new taskDashboardFuncDetails(queueNamesArr[i],queueNamesArr.length-1);	
            queueDetails[j] = new taskDashboardFuncDetails(queueNamesArr[i], numOfCurPgPart);//12.1 Retro_Changes
            var partDIV = queueDetails[j].getDashboardPartDIV(timestamp);
            var secContainer = divTabContent.children;
            if (secContainer.length == 0) {
                queueDetails[j].setDashboardSecDIV(divTabContent, partDIV);
            }
            else {
              //  if (secContainer[secContainer.length - 1].children.length % 2 != 0 && queueNamesArr.length > 4) {
            if (secContainer[secContainer.length - 1].children.length % 2 != 0 && numOfCurPgPart > 3 &&secContainer[secContainer.length - 1].id != "divpartBamLoginWindow") { //12.1 Retro_Changes
                    secContainer[secContainer.length -1].appendChild(partDIV);
                }else  if (secContainer.length == 2 && secContainer[secContainer.length - 2].children.length % 2 != 0 && numOfCurPgPart > 3) { //12.1 Retro_Changes
                    secContainer[secContainer.length -2].appendChild(partDIV); //1203_OR_CHANGES
                } else {
                    queueDetails[j].setDashboardSecDIV(divTabContent, partDIV);
                }
            }
			dispDBQueue("divpart"+queueNamesArr[i].replace(/\s/g, '')+timestamp.getTime(),queueNamesArr[i],queueTypesArr[i],bamURLsArr[i],filedListsArr[i],actionsArr[i],descArr[i],timestamp.getTime());
			winIdContent[j] = "divpart"+queueNamesArr[i].replace(/\s/g, '')+timestamp.getTime();
			j++;
		}
	}
	return true;
}	
function getFlowDiagram(instanceID) {
    var objHTTP = getXmlHttpObj("FCClientHandler", "", "BPELACTION");
	var taskRequestXml = "<TaskRequest OP = 'FLOWDIAGRAM'>";
	taskRequestXml += "<InstanceID>" + instanceID + "</InstanceID>";
        taskRequestXml += "</TaskRequest>";
    objHTTP.send(taskRequestXml);
    var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
    if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
        alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
    } else {
        if (objHTTP.readyState == 4 && getNodeText(selectSingleNode(objHTTP.responseXML, "//STATUS"))=='SUCCESS'){
            return getNodeText(selectSingleNode(objHTTP.responseXML,"//RESPONSE/IMAGE"));
		}	
        else 
           return null;
    }
}
function fnShowQueue(queueId,event){
	isDashboardAction = true;
	currentTaskTab = queueId;
	displayQueueTasks(queueId, event);
	//isDashboardAction = false;
}
var isFilterTask=false;
var filterCriteria;
var currentTaskTab;
function fnFilterTasks(winId) {
    var taskTable = document.getElementById("TBTaskFilters");
	tabTableContent[winId+'istempCheckBox']=true;
	if(!isApplytoAll)
	{
	if(winId!=undefined){
			taskTable = document.getElementById(winId+"TBTaskFilters");
				//tabTableContent[winId+'istempCheckBox']=true;
	}
    isFilterTask = true;
    var criteria = "";
    var value;
    var fieldId;
    var totalNumOfDivColList = taskTable.children[0].children;
    for (var divColListIndex = 1; divColListIndex < totalNumOfDivColList.length - 1; divColListIndex++) {
        for (var divListIndex = 0; divListIndex < 4; divListIndex++) {
            if (totalNumOfDivColList[divColListIndex].children[divListIndex]) {
                var rootDivList = totalNumOfDivColList[divColListIndex].children[divListIndex];
                if (rootDivList.getElementsByTagName("SELECT") && rootDivList.getElementsByTagName("SELECT").length > 0) {
                    if (rootDivList.getElementsByTagName("INPUT")[0]) {
                        value = rootDivList.getElementsByTagName("INPUT")[0].value;
                        fieldId = rootDivList.getElementsByTagName("INPUT")[0].id;
                    } else {
                        value = rootDivList.getElementsByTagName("SELECT")[0].value;
                        fieldId = rootDivList.getElementsByTagName("SELECT")[0].id;
                    }
                    if (! (value == null || value == '')) {
                        criteria = criteria + fieldId + '@#'; 
                        criteria = criteria + rootDivList.getElementsByTagName("SELECT")[0].value + '@#'; 
                        criteria = criteria + value + '~';
                    }
                } else {
                    var fromValue = rootDivList.getElementsByTagName("INPUT")[0].value;
                    var fromId = (rootDivList.getElementsByTagName("INPUT")[0].id).substring(2);
                    if (! (fromValue == null || fromValue == '')) {
                        criteria = criteria + fromId + '@#'; /* Task Search Changes*/
                        criteria = criteria + 'GT@#'; /* Task Search Changes*/
                        criteria = criteria + fromValue + '~';
                    }
                    var toValue = rootDivList.getElementsByTagName("INPUT")[2].value;
                    var toId = fromId;
                    if (! (toValue == null || toValue == '')) {
                        criteria = criteria + toId + '@#'; /* Task Search Changes*/
                        criteria = criteria + 'LT@#'; /* Task Search Changes*/
                        criteria = criteria + toValue + '~';
                    }
                }
            }
        }
    }
	}
	if(winId!=undefined)
	{
			if(isApplytoAll)
			{
				filterCriteria = tabTableContent["applyallfiltercriteria"];
			}
			else if(!isApplytoAll)
			{
				tabTableContent["applyallfiltercriteria"] = criteria;
			tabTableContent[winId+"filtercriteria"] = criteria;
			filterCriteria = tabTableContent[winId+"filtercriteria"];//= tabTableContent[winId+"filtercriteria"];
	}
	}
	else
    filterCriteria = criteria;
	//isDashboardAction = true;
	if(winId!=undefined){
		if(!isApplytoAll)
		document.getElementById("DIVTabContentDBoardTasks").removeChild(parent.document.getElementById(winId+"ChildWinfilter"));
		isRefresh = true;
		dispDBQueue(winId);
		//isFilterTask=false;
	}
	else{
    displayQueueTasks(currentTaskTab);
	}
	//isDashboardAction = false;
}
function fnExitFilterDboard(winId){
	try{
		document.getElementById('filterPopupWin').style.display = 'none';
	}
	catch (e){}
	document.getElementById("DIVTabContentDBoardTasks").removeChild(parent.document.getElementById(winId+"ChildWinfilter"));
	tabTableContent[winId+'istempCheckBox'] = false;
	isFilterTask=false;
	isRefresh = true;
	dispDBQueue(winId);
}

function fnCloseFilterPopup(action, winId) {
	var filterId = document.getElementsByName('FILTER_ID')[0].value;
	var filterDesc = document.getElementsByName('FILTER_DESC')[0].value;
	var taskTable = document.getElementById("TBTaskFilters");
	if(winId!=undefined){
		taskTable = document.getElementById(winId+"TBTaskFilters");
	}
	var criteria = "";
	if(action == 'SAVE_FILTER')
	{
		var value;
		var fieldId;
		var totalNumOfDivColList = taskTable.children[0].children;
		for (var divColListIndex = 1; divColListIndex < totalNumOfDivColList.length - 1; divColListIndex++) {
			for (var divListIndex = 0; divListIndex < 4; divListIndex++) {
				if (totalNumOfDivColList[divColListIndex].children[divListIndex]) {
					var rootDivList = totalNumOfDivColList[divColListIndex].children[divListIndex];
					if (rootDivList.getElementsByTagName("SELECT") && rootDivList.getElementsByTagName("SELECT").length > 0) {
						if (rootDivList.getElementsByTagName("INPUT")[0]) {
							value = rootDivList.getElementsByTagName("INPUT")[0].value;
							fieldId = rootDivList.getElementsByTagName("INPUT")[0].id;
						} else {
							value = rootDivList.getElementsByTagName("SELECT")[0].value;
							fieldId = rootDivList.getElementsByTagName("SELECT")[0].id;
						}
						if (! (value == null || value == '')) {
							criteria = criteria + fieldId + '@#'; 
							criteria = criteria + rootDivList.getElementsByTagName("SELECT")[0].value + '@#'; 
							criteria = criteria + value + '~';
						}
					} else {
						var fromValue = rootDivList.getElementsByTagName("INPUT")[0].value;
						var fromId = (rootDivList.getElementsByTagName("INPUT")[0].id).substring(2);
						if (! (fromValue == null || fromValue == '')) {
							criteria = criteria + fromId + '@#';
							criteria = criteria + 'GT@#';
							criteria = criteria + fromValue + '~';
						}
						var toValue = rootDivList.getElementsByTagName("INPUT")[2].value;
						var toId = fromId;
						if (! (toValue == null || toValue == '')) {
							criteria = criteria + toId + '@#';
							criteria = criteria + 'LT@#';
							criteria = criteria + toValue + '~';
						}
					}
				}
			}
		}
		try{
			document.getElementById('filterPopupWin').style.display = 'none';
		}
		catch (e){}
	}
	comments = filterId + "||" + filterDesc + "||" + criteria;
	var taskActionDOM = fnDoAction('', action, comments);
	if(action == 'RETRIEVE_FILTER') {
		if (selectSingleNode(taskActionDOM, "//RESPONSE"))
		{
			var criteria = getNodeText(selectSingleNode(taskActionDOM, "//RESPONSE"));
		}
		if (criteria != "") {
			var criteriaList = criteria.split('~');
			var fieldId;
			var operator;
			var value;
			var breakFlg = false;
			for (var criteriaIdx = 0; criteriaIdx < criteriaList.length-1; criteriaIdx++) {
				var valList = criteriaList[criteriaIdx].split('@#');
				fieldId = valList[0];
				operator = valList[1];
				value = valList[2];
				breakFlg = false;
				var totalNumOfDivColList = taskTable.children[0].children;
				for (var divColListIndex = 1; divColListIndex < totalNumOfDivColList.length - 1; divColListIndex++) {
					for (var divListIndex = 0; divListIndex < 4; divListIndex++) {
						var rootDivList = totalNumOfDivColList[divColListIndex].children[divListIndex];
						if ((rootDivList) && (rootDivList.getElementsByTagName("INPUT")[0].id == fieldId || rootDivList.getElementsByTagName("INPUT")[0].id == 'DT'+fieldId)) {
							if (rootDivList.getElementsByTagName("SELECT") && rootDivList.getElementsByTagName("SELECT").length > 0) {
								taskTable.children[0].children[divColListIndex].children[divListIndex].getElementsByTagName("INPUT")[0].value = value;
								taskTable.children[0].children[divColListIndex].children[divListIndex].getElementsByTagName("SELECT")[0].value = operator;
							} else {
								if (operator == 'GT') {
									taskTable.children[0].children[divColListIndex].children[divListIndex].getElementsByTagName("INPUT")[0].value = value;
								} else {
									taskTable.children[0].children[divColListIndex].children[divListIndex].getElementsByTagName("INPUT")[2].value = value;
								}
							}
							breakFlg = true;
							break;
						}
					}
					if (breakFlg)
						break;
				}
			}
		}
		try{
			document.getElementById('filterPopupWin').style.display = 'none';
		}
		catch (e){}
	}
}
function fnExitFilterPopup() {
	try{
		document.getElementById('filterPopupWin').style.display = 'none';
	}
	catch (e){}
}

function fnFilterPopup(action, winId){
	var lblFilerDetails	= getItemDesc("LBL_FILTERDTLS");
	var lblFilterId		= getItemDesc("LBL_FILTERID");
	var lblFilterDesc	= getItemDesc("LBL_DESCRIPTION");
	var lblOk		= getItemDesc("LBL_OK");
	var lblExit		= getItemDesc("LBL_EXIT");
	var lblClose		= getItemDesc("LBL_CLOSE");
	
	var filterPopupText = '       		<div id="DIVif1" class="WNDcontainerModal" style="overflow:none;border:1px solid black;background:white">';
	filterPopupText = filterPopupText + '    	<DIV class=WNDtitlebar id="WNDtitlebar" onmousedown="startDrag(\'ChildWin\', event)">';
	filterPopupText = filterPopupText + '           	<div class="WNDtitle" id="wndtitle">';
	filterPopupText = filterPopupText + '				<B class="BTNicon">';
	filterPopupText = filterPopupText + '					<span class="ICOflexcube"></span>';
	filterPopupText = filterPopupText + '				</B>';
	filterPopupText = filterPopupText + '				<h1 class="WNDtitletxt">'+lblFilerDetails+' &nbsp;</h1>';
	filterPopupText = filterPopupText + '			</div>';
	filterPopupText = filterPopupText + '		</DIV>';
	filterPopupText = filterPopupText + '		<DIV id="comments" class="TwoColSectionContainer">';
	filterPopupText = filterPopupText + '			<div class="DIVColumnDouble">';
	filterPopupText = filterPopupText + '				<fieldset class="FSTstd" block="BLK_FILTER" type="SE" view="SE"><LEGEND></LEGEND>';
	filterPopupText = filterPopupText + '					<div class="DIVText" >';
	filterPopupText = filterPopupText + '						<label class="LBLstd" for="">'+lblFilterId+'</label>';
	filterPopupText = filterPopupText + '						<input id ="BLK_FILTER__FILTER_ID" class="TXTstd" title='+lblFilterId+' NAME="FILTER_ID" SIZE="15" MAXLENGTH="15" onkeydown="if(event.keyCode == 115) return fnLaunchLov(event);"><BUTTON class="BTNimg" tabindex="-1" id="btnUserBranches" onclick="disp_lov(\'COMMON\',\'BLK_FILTER\',\'FILTER_ID\',\''+lblFilterId+'\',\'LOV_FILTER\', \'\', \'\', \'\', \'\', event)" onFocus="this.className=\'BTNimgH\'" onMouseOver="this.className=\'BTNimgH\'" onMouseOut="this.className=\'BTNimg\'" onBlur="this.className=\'BTNimg\'">';
	filterPopupText = filterPopupText + '						<SPAN class="ICOlov" tabIndex=-1><span class="LBLinv">'+lblFilterId+'</span></SPAN></BUTTON>';
	filterPopupText = filterPopupText + '					</div>';
	filterPopupText = filterPopupText + '					<div class="DIVText" >';
	filterPopupText = filterPopupText + '						<label class="LBLstd" for="">'+lblFilterDesc+'</label>';
	filterPopupText = filterPopupText + '						<input id ="BLK_FILTER__FILTER_DESC" class="TXTstd" title='+lblFilterDesc+' NAME="FILTER_DESC" SIZE="15" MAXLENGTH="255">';
	filterPopupText = filterPopupText + '					</div>';
	filterPopupText = filterPopupText + '				</fieldset>';
	filterPopupText = filterPopupText + '			</div>';
	filterPopupText = filterPopupText + '		</DIV>';
	filterPopupText = filterPopupText + '		<div class="DIVText" ><label class="LBLstd" for="confnew">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><img src="Images/star_disabled.gif" class="RequiredField" title="" ALT="">';
	filterPopupText = filterPopupText + '			<BUTTON onblur=\'this.className="BTNfooter"\' id=BTN_OK class=BTNfooterH onfocus=\'this.className="BTNfooterH"\' onmouseover=\'this.className="BTNfooterH"\' onmouseout=\'this.className="BTNfooter"\' onClick="fnCloseFilterPopup(\''+action+'\', \''+winId+'\')" onkeydown="return fnReasonKeyAccess(event);" name="OK">'+lblOk+'</BUTTON>';
	filterPopupText = filterPopupText + '			<BUTTON onblur=\'this.className="BTNfooter"\' id=BTN_EXIT class=BTNfooterH onfocus=\'this.className="BTNfooterH"\' onmouseover=\'this.className="BTNfooterH"\' onmouseout=\'this.className="BTNfooter"\' onClick="fnExitFilterPopup()" name="EXIT">'+lblExit+'</BUTTON>';
	filterPopupText = filterPopupText + '		</div>';
	filterPopupText = filterPopupText + '	</div>';

	if(document.getElementById("filterPopupWin") == null){
		var customWin = document.createElement("fieldset");
		customWin.id = "filterPopupWin";
		customWin.className = "FSTcell";
		customWin.type ="ME"
		customWin.view ="ME"
		customWin.style.position = "absolute";
		customWin.innerHTML ='<div id="filterPopupWin_content">';
		document.getElementById("vTabDB_DASHBOARD").appendChild(customWin);
	}
        var obj = document.getElementById('filterPopupWin');
        var obj2 = document.getElementById('filterPopupWin_content');
        obj2.innerHTML = filterPopupText;
        obj.style.display = 'block';
        var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
        if(getBrowser().indexOf('SAFARI') >= 0)st=0; //ie11 changes
        obj.style.left = '5px';
        obj.style.top = '5px';
	 document.getElementById("DIVif1").focus();
        return true;
}
function fnSaveFilterDboard(winId){
	fnFilterPopup('SAVE_FILTER', winId);
}

function fnRetrieveFilterDboard(winId){
	var taskTable = document.getElementById("TBTaskFilters");
	if(winId!=undefined){
		taskTable = document.getElementById(winId+"TBTaskFilters");
	}
	var totalNumOfDivColList = taskTable.children[0].children;
	for (var divColListIndex = 1; divColListIndex < totalNumOfDivColList.length - 1; divColListIndex++) {
		for (var divListIndex = 0; divListIndex < 4; divListIndex++) {
			var rootDivList = totalNumOfDivColList[divColListIndex].children[divListIndex];
			if (rootDivList) {
				if (rootDivList.getElementsByTagName("SELECT") && rootDivList.getElementsByTagName("SELECT").length > 0) {
					taskTable.children[0].children[divColListIndex].children[divListIndex].getElementsByTagName("INPUT")[0].value = "";
					taskTable.children[0].children[divColListIndex].children[divListIndex].getElementsByTagName("SELECT")[0].value = "=";
				} else {
					taskTable.children[0].children[divColListIndex].children[divListIndex].getElementsByTagName("INPUT")[0].value = "";
					taskTable.children[0].children[divColListIndex].children[divListIndex].getElementsByTagName("INPUT")[2].value = "";
				}
			}
		}
	}
	fnFilterPopup('RETRIEVE_FILTER', winId);
}

function fnApplyFilterAllDboard(winId){
	fnFilterTasks(winId);
	var queCount = winIdContent.length;
	for (var wId=0;wId<queCount;wId++)
	{
		isApplytoAll = true;
		tabTableContent[winIdContent[wId]+'istempCheckBox'] = true;
		tabTableContent[winId+'istempCheckBox'] = tabTableContent[winIdContent[wId]+'istempCheckBox'];
		tabTableContent[winIdContent[wId]+"filtercriteria"] = "";
		fnFilterTasks(winIdContent[wId]);
	}
	isApplytoAll = false;
}
function doHistoryTabActions(tabName,event){
    var clientHeight = document.body.clientHeight;
    var customSearchHeight = 0;
    if(document.getElementById("BTNrecalcSchedule"))
        document.getElementById("BTNrecalcSchedule") .style.display = 'none';
    if(document.getElementById("TBTaskFilters") && document.getElementById("TBTaskFilters") !=undefined ){
    var filterSearchHeight = document.getElementById("TaskFiltersHeader").offsetHeight + document.getElementById("TBTaskFilters").offsetHeight;
    var taskDetailsHeight  = document.getElementById("BPELTaskDetails").offsetHeight + document.getElementById("BPELTaskHeader").offsetHeight;
    document.getElementById("BPELTaskHistoryDetails").style.display = "block";
    if (document.getElementById("TBLPageidCustomSearch").style.display == 'block') {
        customSearchHeight = document.getElementById("TBTaskSearch").offsetHeight + document.getElementById("TaskSearchHeader").offsetHeight;
        document.getElementById("BPELTaskHistoryDetails").style.height = (clientHeight - (customSearchHeight + taskDetailsHeight + 105)) + 'px';
    } else {
        document.getElementById("BPELTaskHistoryDetails").style.height = (clientHeight - (taskDetailsHeight + filterSearchHeight + 105)) + 'px';
    }
    }
	//var tabobjlinks = document.getElementById('taskdboardHistorytablist').getElementsByTagName("A"); 
	//var tabObj = document.getElementById('taskdboardHistorytablist'+tabName);
	//fnSetTabAttributes(tabObj, tabobjlinks);
  var tabLinkArr = document.getElementById('taskdboardHistorytablistDiv').getElementsByTagName("A");
  for(var cnt = 0; cnt < tabLinkArr.length; cnt++){
    if(tabLinkArr[cnt].getElementsByTagName("SPAN")[0].className == "DBoardHeadDivSpanSel") {
      tabLinkArr[cnt].getElementsByTagName("SPAN")[0].className = "DBoardHeadDivSpanDeSel";
      break;
    }
  }
  document.getElementById('taskdboardHistorytablist'+tabName).getElementsByTagName("SPAN")[0]. className = "DBoardHeadDivSpanSel";  
	if(currTaskTblRowIndex >= 0){
		switch(tabName.toUpperCase()){
			case 'HISTORY':
				fnViewTaskHistory(event);
			break;
			case 'INTERACTIONS':
				fnViewInteractions();
			break;
			case 'DOCUMENTS':
				fnViewDocumentsHistory(event);
			break;	
			case 'ADVICES':
				fnViewAdvicesHistory(event);
			break;	
                        case 'SCHEDULE':
                                document.getElementById("BTNrecalcSchedule") .style.display = 'block';
                                fnViewSchedules(event); //12.1 Changes
                        break;
		}
	}
}
function fnViewDocumentsHistory(event) {
    var e = window.event || event
	var rowIndex = currTaskTblRowIndex;
        if(document.getElementById("tblTaskList") && document.getElementById("tblTaskList") != undefined)
	var wfRefNo = document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute('WFREFNO');
        else
            var wfRefNo = currTaskTblObj.tBodies[0].rows[rowIndex-1].getAttribute('WFREFNO');
    var taskActionXML = getHistoryReqXML(wfRefNo,'VIEW_DOCUMENTS');
    var serverURL = "FCClientHandler";
	var actionResponseXML = null;
	var objHTTP = getXmlHttpObj("FCClientHandler", "", "BPELACTION");
    objHTTP.onreadystatechange = function () {
        if (objHTTP.readyState == 4) {
            var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
            } else {
                actionResponseXML = objHTTP.responseXML;
                populateHistoryTabData(getXMLString(actionResponseXML),'VIEW_DOCUMENTS');
            }
        }
    }
    objHTTP.send(taskActionXML);
}
function fnViewAdvicesHistory(event) {
    var e = window.event || event
	var rowIndex = currTaskTblRowIndex;
        if(document.getElementById("tblTaskList") && document.getElementById("tblTaskList") != undefined)
	var wfRefNo = document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute('WFREFNO');
        else
            var wfRefNo = currTaskTblObj.tBodies[0].rows[rowIndex-1].getAttribute('WFREFNO');            
    var taskActionXML = getHistoryReqXML(wfRefNo,'VIEW_ADVICES');
    var serverURL = "FCClientHandler";
	var actionResponseXML = null;
	var objHTTP = getXmlHttpObj("FCClientHandler", "", "BPELACTION");
    objHTTP.onreadystatechange = function () {
        if (objHTTP.readyState == 4) {
            var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
            } else {
                actionResponseXML = objHTTP.responseXML;
                populateHistoryTabData(getXMLString(actionResponseXML),'VIEW_ADVICES');
            }
        }
    }
    objHTTP.send(taskActionXML);
}
//12.1 Changes Starts
function fnViewSchedules(event,version) {
    var e = window.event || event;
    var rowIndex = currTaskTblRowIndex;
    if(document.getElementById("tblTaskList") && document.getElementById("tblTaskList") != undefined)
        var wfRefNo = document.getElementById("tblTaskList").tBodies[0].rows[rowIndex].getAttribute('WFREFNO');
    else
        var wfRefNo = currTaskTblObj.tBodies[0].rows[rowIndex-1].getAttribute('WFREFNO');            
    var taskActionXML = "<TaskRequest OP='FETCH_SCHEDULE'>";
    taskActionXML += "<WfRefNo>" + wfRefNo + "</WfRefNo>";
    if(version !=undefined && version !='undefined')
        taskActionXML += "<version>"+action+"</version>";
    else
        taskActionXML += "<version/>";
    taskActionXML += "</TaskRequest>";
    var actionResponseXML = null;
    var objHTTP = getXmlHttpObj("FCClientHandler", "", "BPELACTION");
    objHTTP.onreadystatechange = function () {
        if (objHTTP.readyState == 4) {
            var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
            } else {
                actionResponseXML = objHTTP.responseXML;
                populateHistoryTabData(getXMLString(actionResponseXML),'VIEW_SCHEDULE');
            }
        }
    }
    objHTTP.send(taskActionXML);
}
//12.1 Changes Ends
function getHistoryReqXML(wfRefNo,action){
    var taskActionXML = "<TaskRequest OP = 'ACTION'>";
	taskActionXML +="<TaskId/>";
    taskActionXML += "<WfRefNo>" + wfRefNo + "</WfRefNo>";
    taskActionXML += "<ActionName>"+action+"</ActionName>";
    taskActionXML += "</TaskRequest>";
	return taskActionXML;
}
function insertTasklistHistoryHeaderHTML(historyHeaders) {
    try{
    var txnTableHeader = document.getElementById("tblTaskHistory").tHead;
	var historyHeaderItems = historyHeaders.split('~');
    newRow = document.createElement("TR");
    txnTableHeader.appendChild(newRow);
    for (i = 0; i < historyHeaderItems.length; i++) {
        newCell = document.createElement("TH");
        newCell.className = "TBLoneTH";
        newCell.setAttribute("scope", "col");
        newCell.innerHTML = "<A class=Astd>"+historyHeaderItems[i]+"</A>";
        newRow.appendChild(newCell);
    }
    }catch(e){}
}
function populateHistoryTabData(historyXML,action){
	var historyHeaders ='';
	deleteAllRows("tblTaskHistory", true);
        if(getItemDesc==undefined)
            var getItemDesc =parent.getItemDesc;
	var lbltitle = getItemDesc("LBL_TITLE");
	var lblview = getItemDesc("LBL_VIEW");
	var lblremarks = getItemDesc("LBL_REMARKS");
	var lblcategory = getItemDesc("LBL_CATEGORY");
	var lbldocrefno = getItemDesc("LBL_DOC_REF_NO");
	var lbldoctype = getItemDesc("LBL_DOC_TYPE");
	var lblrepdesc = getItemDesc("LBL_REP_DESC");
	var lblrepname = getItemDesc("LBL_REPORT_NAME");
	var lbldocname = getItemDesc("LBL_DOC_NAME");
        //12.1 Changes Starts
        var lblstage = getItemDesc("LBL_STAGE");
        var lblprojArr = getItemDesc("LBL_PROJ_ARR");
        var lblprojCom = getItemDesc("LBL_PROJ_COM");
        var lblActArr = getItemDesc("LBL_ACT_ARR");
        var lblActCom = getItemDesc("LBL_ACT_COM");
	//12.1 Changes Ends
	if(action=='VIEW_DOCUMENTS'){
		historyHeaders = lbltitle+'~'+lblcategory+'~'+lbldocrefno+'~'+lbldoctype+'~'+lblremarks+'~'+lblview;
		insertTasklistHistoryHeaderHTML(historyHeaders);
	}else if(action=='VIEW_ADVICES'){
		historyHeaders = lbltitle+'~'+lblrepdesc+'~'+lblrepname+'~'+lbldocname+'~'+lbldocrefno+'~'+lblview;
		insertTasklistHistoryHeaderHTML(historyHeaders);
	}else if (action== 'VIEW_SCHEDULE'){ //12.1 Changes Starts
		historyHeaders = lblstage+'~'+lblprojArr+'~'+lblprojCom+'~'+lblActArr+'~'+lblActCom;
		insertTasklistHistoryHeaderHTML(historyHeaders);            
        }//12.1 Changes Ends
	populateHistoryTableData(historyXML,action);
}
function fnShowDocument(docrefNo,action)
{
var objwindow ;
if(action=='VIEW_DOCUMENTS'){
	downloadDocument(docrefNo, evnt);
	//objwindow = mainWin.open("FCDocumentControllerServlet?Action=Download Document&documentID=" + docrefNo + "&X-CSRFTOKEN=" + mainWin.CSRFtoken, null, "width=640px,height=480px,resizable=yes,scrollbars=yes,status=1,toolbar=no", false);
}else{
//	objwindow = mainWin.open("FCDocumentControllerServlet?Action=FileView&FileName=" + docrefNo+"&X-CSRFTOKEN=" + mainWin.CSRFtoken, null, "width=640px,height=480px,resizable=yes,scrollbars=yes,status=1,toolbar=no", false);
fnReportRequest(docrefNo,evnt);
}
}
function populateHistoryTableData(inputXml,action) {
    var xmlDOM = loadXMLDoc(inputXml);
	var historyTable = document.getElementById("tblTaskHistory").tBodies[0];
    if (selectSingleNode(xmlDOM, "//TaskHistory") != null && selectNodes(xmlDOM, "//REC").length > 0) {
        var taskNodes = selectNodes(xmlDOM, "//REC");
        for (var taskCount = 0; taskCount < taskNodes.length; taskCount++) {
			var record = getNodeText(taskNodes[taskCount]);
			var recordArr = record.split('~');
			var docrefNo;
            newRow = historyTable.insertRow(-1);
            if (taskCount % 2 == 1) {
                newRow.className = "TBLoneTRalt";
            } else 
                newRow.className = "TBLoneTR";
            for (var colCount = 0; colCount < recordArr.length; colCount++) {
                var cell = newRow.insertCell(-1);
                if (colCount == 0) {
                    cell.setAttribute("scope","row");
                }
                var value = checkForNull(recordArr[colCount]);
                if (value == '') 
                    value = '&nbsp';
				if(colCount==2 && action=='VIEW_DOCUMENTS')
					docrefNo =value;
				if(colCount==3 && action=='VIEW_ADVICES')
					docrefNo =value;	
                var innerContent = "<span class='SPNtext' tabIndex='"+taskCount+"'>" + value + "</span>";
                cell.innerHTML = innerContent;
            }
            if(action != 'VIEW_SCHEDULE')
            {
			var cell = newRow.insertCell(-1);
			var innerContent = "<span class='BTNtext' onclick='fnShowDocument(\""+docrefNo+"\",\""+action+"\",event)' tabIndex='"+taskCount+"'>"+getItemDesc("LBL_VIEW")+"</span>";
			cell.innerHTML = innerContent;			
        }
    }
}
}
function displayQueueTasksProxy(queueId,queueDesc,event){
	isDashboardAction = true;//Tabs Always shown
	//isFilterTask = false;//Tabs Always shown
             document.getElementById('btnnext').disabled = true; 
             document.getElementById('btnprev').disabled = true;
             document.getElementById('btnrefresh').disabled = true;
  if(document.getElementById("A_"+queueId) == undefined){
      var anchorElem = document.createElement("a");
      anchorElem.id = "A_"+queueId;
      addEvent(anchorElem, "onclick", "fnShowQueue('"+queueId+"',event)");
      var spanElem = document.createElement("span");
      spanElem.className = "DBoardHeadDivSpanDeSel";
      spanElem.id = 'SPAN_'+queueId;
      spanElem.innerHTML = queueDesc + "<span class=\"DBoardHeadClose\" onclick=\"closeQueueTab(this.parentNode.parentNode,event)\"><img src=\"" + theme_imagesPath + "/Icons/Tab_Close_Button.gif\"></span>";
      anchorElem.appendChild(spanElem); 
      //document.getElementById("TEMPDIV").appendChild(anchorElem);
      //document.getElementById("hTab_DBoardTasks").appendChild(anchorElem);
      if(document.getElementById("hTab_DBoardTasks") == null){
		if (getBrowser().indexOf("OPERA") != -1){//ie11 changes
			g_temp_queueId =queueId;
			g_temp_queueIdDesc=queueDesc;
			addEvent(document.getElementById("DIVTabContentDBoardTasks"),'onmousemove',"onUnloadDisplayQueue()");
		}
        clearLandingPage();
	}
      document.getElementById("hTab_DBoardTasks").insertBefore(anchorElem,document.getElementById("hTab_DBoardTasks").lastChild);
  }
	displayQueueTasks(queueId,event);
        showHideVtab();//HTML5 Changes 14/NOV/2016
}
/*Jeev Changes Start Here*/
function fnViewInteractions() {
    if(document.getElementById("tblTaskList") && document.getElementById("tblTaskList")!= undefined)
    taskId = document.getElementById("tblTaskList").tBodies[0].rows[currTaskTblRowIndex].getAttribute('TASKID');
    else
        taskId = currTaskTblObj.tBodies[0].rows[currTaskTblRowIndex-1].getAttribute('TASKID');
    fnDoAction(taskId, 'VIEW_INTERACTION', null, false);
}
function populateInteractionsData(inputXml) {
	var interactionHeaders ='';
	deleteAllRows("tblTaskHistory", true);
        if(getItemDesc==undefined)
            var getItemDesc =parent.getItemDesc;
	var lblConversationId    = getItemDesc("LBL_CONVERSATION_ID");
	var lblCustomerId     	 = getItemDesc("LBL_CUSTOMER_ID");
	var lblConversationDate  = getItemDesc("LBL_CONVERSATION_DATE");
	var lblSubject           = getItemDesc("LBL_SUBJECT");
	var lblOriginalReq       = getItemDesc("LBL_ORIGINAL_REQ");
	var lblCustomerReply     = getItemDesc("LBL_CUSTOMER_REPLY");
	var lblDetails           = getItemDesc("LBL_DETAIL");
	interactionHeaders = lblConversationId+'~'+lblCustomerId+'~'+lblConversationDate+'~'+lblSubject+'~'+lblOriginalReq+'~'+lblCustomerReply+'~'+lblDetails;
    try{
    	var txnTableHeader = document.getElementById("tblTaskHistory").tHead;
    	var interactionHeaderItems = interactionHeaders.split('~');
    	var tableValue = '';
    	var recordArr = '';
	if (selectSingleNode(inputXml, "//TaskHistory") != null && selectNodes(inputXml, "//REC").length > 0) {
		var taskNodes = selectNodes(inputXml, "//REC");
		var record    = getNodeText(taskNodes[0]);
		recordArr     = record.split('~');
        }
   	for (i = 0; i < interactionHeaderItems.length; i++) {
    	    newRow = document.createElement("TR");
    	    txnTableHeader.appendChild(newRow);
    	    newCell = document.createElement("TH");
    	    newCell.className = "TBLoneTH";
    	    newCell.setAttribute("scope", "row");
    	    newCell.setAttribute("align", "left");
    	    newCell.setAttribute("width", "110px");
    	    newCell.innerHTML = "<A class=Astd>"+interactionHeaderItems[i]+"</A>";
    	    newRow.appendChild(newCell);
    	    newCell = document.createElement("TD");
    	    newCell.setAttribute("scope", "row");
    	    newCell.setAttribute("style", "overflow:auto;");
            if (i % 2 == 1)
                newCell.className = "TBLoneTRalt";
            else 
                newCell.className = "TBLoneTR";
    	    if (recordArr.length > 0)
    	    	if (recordArr[i] != "null")
    	    		tableValue = recordArr[i].split("\n").join("<br/>");
    	    	else
    	    		tableValue = "";
    	    newCell.innerHTML = "<A class=Astd>"+tableValue+"</A>";
    	    newRow.appendChild(newCell);
    	}
    }catch(e){}
}
function fnCalcBPELWinSize() {
	var scrWidth = parent.document.getElementById("DIVTabContentDBoardTasks").offsetWidth - 12;
	document.getElementById("TaskFiltersHeader").style.width = scrWidth + "px";
	document.getElementById("TBTaskFilters").style.width = scrWidth + "px";
	document.getElementById("BPELTaskHeader").style.width = scrWidth + "px";
	document.getElementById("BPELTaskDetails").style.width = scrWidth + "px";
	document.getElementById("BPELTaskhistoryHeader").style.width = scrWidth + "px";
	document.getElementById("BPELTaskHistoryDetails").style.width = scrWidth + "px";
	document.getElementById("tasksDiv").style.width = scrWidth + "px";
	var clientHeight = document.body.clientHeight;
	var filterSearchHeight = document.getElementById("TaskFiltersHeader").offsetHeight + document.getElementById("TBTaskFilters").offsetHeight;
	var taskDetailsHeight  = document.getElementById("BPELTaskDetails").offsetHeight + document.getElementById("BPELTaskHeader").offsetHeight;
	document.getElementById("BPELTaskHistoryDetails").style.display = "block";
	document.getElementById("BPELTaskHistoryDetails").style.height = (clientHeight - (taskDetailsHeight + filterSearchHeight + 105)) + 'px';
}
function fnRefreshIfAction(){
	fnBpelRefresh('D');
	//fnQuickViewShowDb(curr_page);
	/*var queCount = winIdContent.length;
	for (var wId=0;wId<queCount;wId++)
	{
	isRefresh = true;
	//parent.initializeRef = Initialize;
	dispDBQueue(winIdContent[wId]);	
	}
*/	
}
function fnShowHistoryDetailFunction(taskId, funcId) {
  /*if (!parent.mainWin.isSessionActive()) {
    return;
  }*/
  var uiname = "";
  if (mainWin.uiNames[funcId] != "" && typeof(mainWin.uiNames[funcId]) != "undefined")
    uiname = parent.mainWin.uiNames[funcId];
  mainWin.taskStatus ="ASSIGNED";
  if (trim(taskId) == "") {
    showErrorAlerts('CS-AL-142',parent.UserId);
    return;
  }
  var timeStamp = parent.getDateObject();
  var inTime=(timeStamp.getHours()*(3600*1000))+(timeStamp.getMinutes()*(60*1000))+(timeStamp .getSeconds()*1000)+timeStamp.getMilliseconds();
        //var newWin = mainWin.openWindow("testwin", "SMSStartLogServlet?funcid=" + funcId + "&taskId=" + taskId + "&uiName=" + uiname + "&msgType=WORKFLOW&actionType=initiate" + "&timestamp=" + timeStamp.getTime() + "&inTime=" + inTime + "&X-CSRFTOKEN=" + parent.mainWin.CSRFtoken);
        var newWin = mainWin.openWindow("testwin", "TempForward.jsp?action=SMSStartLogServlet&funcid=" + funcId + "&taskId=" + taskId + "&uiName=" + uiname + "&msgType=WORKFLOW&actionType=initiate" + "&timestamp=" + timeStamp.getTime() + "&inTime=" + inTime+"&txnBranch="+g_txnBranch);
  fnGetTaskComments(taskId, true);
}
function fnQuickSearchKey(evnt)
{
if (evnt.keyCode=='13')
    if(event.shiftKey) //12.1 Retro_Changes
    {
        fnLocateTask();
    }
    else
    {
	fnQuickTaskSearch();
    }	//12.1 Retro_Changes
}
function onUnloadDisplayQueue(event){
	if(g_temp_queueId !=""){
		displayQueueTasksProxy(g_temp_queueId,g_temp_queueIdDesc,event);
		g_temp_queueId ="";
		g_temp_queueIdDesc="";
		document.getElementById("DIVTabContentDBoardTasks").removeAttribute('onmousemove'); 
	}
	return true;
}
function changeTaskDisplay(rowIndex)
{
try {
        //NewTaskList[taskId] = false;
        var tableRef = document.getElementById("tblTaskList").tBodies[0];
        var cellNum = tableRef.rows[rowIndex].cells.length;
        //tableRef.rows[rowIndex].style.backgroundColor = '';//12.1 Changes
            for (var indexC = 0;indexC < cellNum;indexC++) {
                if (tableRef.rows[rowIndex].cells[indexC].getElementsByTagName("SPAN")[0] != 'undefined' 
                && tableRef.rows[rowIndex].cells[indexC].getElementsByTagName("SPAN")[0] != '' 
                && tableRef.rows[rowIndex].cells[indexC].getElementsByTagName("SPAN")[0] != null) {
                    tableRef.rows[rowIndex].cells[indexC].getElementsByTagName("SPAN")[0].style.fontWeight = "normal";
                }
                else if (tableRef.rows[rowIndex].cells[indexC] != 'undefined' 
                && tableRef.rows[rowIndex].cells[indexC] != '' 
                && tableRef.rows[rowIndex].cells[indexC] != null) {
                    tableRef.rows[rowIndex].cells[indexC].style.fontWeight = "normal";
                    if (tableRef.rows[rowIndex].cells[indexC].getElementsByTagName("img")[0] && tableRef.rows[rowIndex].cells[indexC].getElementsByTagName("img")[0].src.indexOf('NewTask') != -1){
                        tableRef.rows[rowIndex].cells[indexC].getElementsByTagName("img")[0].src = imgLocation+imgReminder;
                        NewTaskList[tableRef.rows[rowIndex].getAttribute('taskid')] =false;
                    }
            }
    }
}
catch (e) {
}
}
//12.0.2 Changes Ends
function fnReportRequest(documentId, evnt) {
    evnt= window.event || evnt;
    var srcElement = getEventSourceElement(evnt);
	createTempForwardIframe("FCDocumentControllerServlet?Action=FileView&FileName=" + documentId, srcElement);
}
function downloadDocument(documentId, evnt) {
    evnt= window.event || evnt;
    var srcElement = getEventSourceElement(evnt);
	createTempForwardIframe( "FCDocumentControllerServlet?actionType=Download Document&documentID=" + documentId, srcElement);
}
function createTempForwardIframe(src, sourceElement){
    try {
	//Added for upload issue start
       clearTempDiv();
	   //Added for upload issue end
        var parentEle = sourceElement.parentNode;
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
        parentEle.appendChild(customWin);
          var winObj = document.getElementById("tempForwardDiv");
		winObj.style.visibility="visible";
		winObj.style.display="block";
		document.getElementById("tempForward").target = 'self';
		document.getElementById("tempForward").submit();
    } catch (e) {}
}
function clearTempDiv(){
  var tempDiv = document.getElementById('tempForwardDiv');
  if(tempDiv){
  tempDiv.parentNode.removeChild(tempDiv);
}
}
function getTableObject(e) {
    var objTR;
    var rowIndex = -1;
    var event = window.event || e;
    if (event != null) {
        objTR = getEventSourceElement(event);
        try {
            while (objTR.tagName != "TABLE") {
                objTR = objTR.parentNode;
            }
        } catch (e) {}
    }
    return objTR;
}
//12.1 Changes Starts
function fnDepictTasks()
{
        var tableRef = document.getElementById("tblTaskList").tBodies[0];
        var rowNum = tableRef.rows.length;
        var instanceIdList = '';
        var screenParams ='';
        for (var index = 0; index < rowNum; index++) {
            if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                instanceIdList = instanceIdList + tableRef.rows[index].getAttribute('INSTANCEID') + '~';
                screenParams= "wfrefno="+tableRef.rows[index].getAttribute('WFREFNO')+"&instanceid="+tableRef.rows[index].getAttribute('INSTANCEID')+"&taskid="+tableRef.rows[index].getAttribute('TASKID');
            }
        }
	if(instanceIdList.split('~').length >2) {
		showAlerts(fnBuildAlertXML('IN-HEAR-205', 'E'), 'E');
		return false;
	}
	src	="ORApplicationFlow.jsp?"+screenParams;
    var divId ="ChildAppStatusWin";
    parent.openWindow(divId, src);
}
function openBpmFlowDiagram(instanceId)
{
    /*
    var customWin = document.createElement("div");
    var tableRef = document.getElementById("tblTaskList").tBodies[0];
    var rowNum = tableRef.rows.length;
    var instanceIdList = '';
    //document.getElementById("DIVTabContentDBoardTasks").children[0].style.height = 500 +"px";
    customWin.id = "ChildWin";
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    for (var index = 0; index < rowNum; index++) {
        if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            instanceIdList = instanceIdList + tableRef.rows[index].getAttribute('INSTANCEID') + '~';
        }
    }
	if(instanceIdList.split('~').length >2) {
		showAlerts(fnBuildAlertXML('IN-HEAR-205', 'E'), 'E');
		return false;
	}*/
	base64image =getFlowDiagram(instanceId);
        //25081813 starts
	//src	="FCDocumentControllerServlet?Action=FileView&FileName=" + base64image+"&X-CSRFTOKEN=" + mainWin.CSRFtoken;
        src = "TempForward.jsp?action=FCDocumentControllerServlet&actionType=FileView&FileName=" + base64image;
         //25081813 ends
	if(base64image==null||base64image=='')
		showAlerts(fnBuildAlertXML('OR-INF-008', 'E'), 'E');
	else{	
             mainWin.open(src, null, "width=640px,height=480px,resizable=yes,scrollbars=yes,status=1,toolbar=no", false);
	}
}
function reCalcSchedule(workflowRefNo,source) {
    if(workflowRefNo == undefined || workflowRefNo =='undefined')
        workflowRefNo = wfrefNo;
    var objHTTP = getXmlHttpObj("FCClientHandler", "", "BPELACTION");
    var taskRequestXml = "<TaskRequest OP = 'RECALC_SCHEDULE'>";
    taskRequestXml += "<wfRefNo>" + workflowRefNo + "</wfRefNo>";
    taskRequestXml += "</TaskRequest>";
    objHTTP.send(taskRequestXml);
    var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
    if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
        alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
    } else {
        if (objHTTP.readyState == 4 && getNodeText(selectSingleNode(objHTTP.responseXML, "//STATUS"))=='OR-INF-011'){
            //return getNodeText(selectSingleNode(objHTTP.responseXML,"//RESPONSE/IMAGE"));
            showAlerts(fnBuildAlertXML('OR-INF-011', 'I'), 'I');
            if(source != undefined && source =='FLOW')
                return objHTTP.responseXML;
            else
                populateHistoryTabData(getXMLString(objHTTP.responseXML),'VIEW_SCHEDULE');
            return true;
		}	
        else 
           showAlerts(fnBuildAlertXML('OR-INF-012', 'E'), 'E');
    }
}
//12.1 Changes Ends
//12.1 Retro_Changes Starts
function getAlertDetails(alertIds){
	var alertRequestXml = "<TaskRequest OP = 'ACTIONALERT'>";
        alertRequestXml += "<action>GETALERTDETAILS</action>";
        alertRequestXml += "<alertIds>"+alertIds+"</alertIds>";
        alertRequestXml += "</TaskRequest>";
        return getTasksDom(alertRequestXml);
}
function fnViewBipReport(reportId,title,params){
    var divId ="ChildReportWin";
    var src ="DispReport.jsp?";
    params="winId="+divId+"&reportId="+reportId+"&reporType=''&screenType=SCREEN&title="+title+params;
    parent.openWindow(divId, src+params);
}
//1203_OR_CHANGES starts
//RND changes starts
function setAlertsOnOff(){
    if(alertsEnabled)
    {
        alertsEnabled = false;
        document.getElementById("menuBarSpan").getElementsByTagName("li")[15].getElementsByTagName("A")[0].innerHTML = getItemDesc("LBL_ALERT_ON");
		clearInterval(taskReminderTimerId);
    }
    else
    {
        alertsEnabled = true;
        document.getElementById("menuBarSpan").getElementsByTagName("li")[15].getElementsByTagName("A")[0].innerHTML = getItemDesc("LBL_ALERT_OFF");
        taskReminderTimerId = setInterval(function(){fnShowReminderAlert()},alertInterval*60000);
    }
}
var lastPollTime = "";			 //RND Changes
var alertsTasksDom = "";		  //RND Changes
var currentPollTime = ""; 		  //RND
var lastReqTime = ""; //RND
var queryTime = 120;			//RND Changes
function fnShowReminderAlert(){
    var taskNodes ;
  //  if(!taskRemindersInitialized){//RND Changes
        var pCode = 'ALL';
	   if (lastPollTime != "")
            lastReqTime = lastPollTime.getFullYear()+"-"+(lastPollTime.getMonth()+1)+"-"+lastPollTime.getDate()+" "+lastPollTime.getHours()+":"+lastPollTime.getMinutes()+":"+lastPollTime.getSeconds();
        var taskRequestXml = "<TaskRequest OP = 'REMINDERALERTS'>";
        taskRequestXml += "<CalendarDate>" + (mainWin.date.getMonth()+1) +"/"+mainWin.date.getDate()+"/"+mainWin.date.getFullYear()+"/"+ "</CalendarDate>";
        taskRequestXml += "<lastPollTime>" +lastReqTime + "</lastPollTime>"; //RND Changes
        taskRequestXml += "</TaskRequest>";
        try {		   
//RND Changes starts
                currentPollTime = new Date();
                currentPollTime.setMinutes(currentPollTime.getMinutes()-queryTime);
               // if((lastPollTime == "") || lastPollTime <= currentPollTime){
                //alertsTasksDom = getTasksDom(taskRequestXml, pCode);
                   fnAlertsQuery(taskRequestXml);
                //}
//RND Changes ends
        } catch(e) {
                return false;
        }
        //taskNodes = selectNodes(tasksDom,"//TASK");	//RND Changes
        taskNodes = selectNodes(alertsTasksDom,"//ALERTDTLS");  //RND Changes
        for(var idx1=0;idx1<taskNodes.length;idx1++){
            var tempArr =new Array();
            tempArr[0] =getNodeText(selectSingleNode(taskNodes[idx1],'SUBJECT'));
            tempArr[1] =getNodeText(selectSingleNode(taskNodes[idx1],'NOTE'));
            tempArr[2] =getNodeText(selectSingleNode(taskNodes[idx1],'TIME'));
            tempArr[3] =getNodeText(selectSingleNode(taskNodes[idx1],'TASKID'));
            tempArr[4] =getNodeText(selectSingleNode(taskNodes[idx1],'ACTION'));
            tempArr[5] =getNodeText(selectSingleNode(taskNodes[idx1],'FUNCID'));
            tempArr[6] =getNodeText(selectSingleNode(taskNodes[idx1],'USERREPORTID')); 
            tempArr[7] =getNodeText(selectSingleNode(taskNodes[idx1],'ALERTID')); 
            tempArr[8] =getNodeText(selectSingleNode(taskNodes[idx1],'ALERTSRC'));
            tempArr[9] =getNodeText(selectSingleNode(taskNodes[idx1],'ALERTPRIOR'));
            reminderAlertArray[reminderAlertArray.length] = tempArr;
        }
        /*for(var idx1=0;idx1<taskNodes.length;idx1++){
            var tempArr =new Array();
            tempArr[0] =getNodeText(selectSingleNode(taskNodes[idx1],'WFREFNO'));
            tempArr[1] =getNodeText(selectSingleNode(taskNodes[idx1],'NOTE'));
            tempArr[2] =getNodeText(selectSingleNode(taskNodes[idx1],'TIME'));
            tempArr[3] =getNodeText(selectSingleNode(taskNodes[idx1],'TASKID'));
            tempArr[4] =getNodeText(selectSingleNode(taskNodes[idx1],'ACTION'));
            tempArr[5] =getNodeText(selectSingleNode(taskNodes[idx1],'FUNCID'));
            reminderAlertArray[idx1] = tempArr;
        }
        taskNodes = selectNodes(tasksDom,"//NOTEDETAILS");
        for(var idx1=0;idx1<taskNodes.length;idx1++){
            var tempArr =new Array();
            tempArr[0] =getNodeText(selectSingleNode(taskNodes[idx1],'SUBJECT'));
            tempArr[1] =getNodeText(selectSingleNode(taskNodes[idx1],'NOTE'));
            tempArr[2] =getNodeText(selectSingleNode(taskNodes[idx1],'TIME'));
            //tempArr[3] =getNodeText(selectSingleNode(taskNodes[idx1],'TASKID'));
            tempArr[3] ='NA';
            tempArr[4] =getNodeText(selectSingleNode(taskNodes[idx1],'ACTION'));
            tempArr[5] ='NA';
            reminderAlertArray[reminderAlertArray.length] = tempArr;
        }        
        //taskRemindersInitialized = true;*/	 
  //  }
 fnRemoveDuplicateAlerts(); 
    var dateNow = new Date();
    var dateBod = new Date();
    dateBod.setHours(0);
    dateBod.setMinutes(0);
    dateBod.setSeconds(0);    
    var tempArray =new Array();
    toBeRemindedArray =new Array();
    for(var idx2=0;idx2<reminderAlertArray.length;idx2++){
        var reminderDate =new Date();
        var dateArr = reminderAlertArray[idx2][2].split("-");
        reminderDate.setYear(dateArr[0]);
        reminderDate.setMonth(dateArr[1]-1);
        reminderDate.setDate(dateArr[2]);
        reminderDate.setHours(dateArr[3]);
        reminderDate.setMinutes(dateArr[4]);
        reminderDate.setSeconds(dateArr[5]);
        if( reminderDate >= dateBod && reminderDate <= dateNow ){
            toBeRemindedArray.push(reminderAlertArray[idx2]);
            //reminderAlertArray.splice(idx2);
            //reminderAlertArray.pop(idx2);		  //RND Changes
        }else{
            tempArray.push(reminderAlertArray[idx2])
        }
    }
    reminderAlertArray = tempArray;
    if(toBeRemindedArray.length > 0)
        {
            remindedArray = remindedArray.concat(toBeRemindedArray); 
        showReminderAlert();
        }
    return true;
}
	 //RND Changes starts
function fnAlertsQuery(alertstaskRequestXml) {
                    var objHTTP = getXmlHttpObj("FCClientHandler", "", "BPELACTION");
                   /*
                    objHTTP.onreadystatechange = function () {
                        if (objHTTP.readyState == 4) {
                        var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
                            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
                                } else {
                                alertsTasksDom = objHTTP.responseXML;
                                if(lastPollTime ==""){
                                    /*
                                    alertInterval = getNodeText(selectNodes(alertsTasksDom,"//USERALERTINTERVAL")[0]);
                                    queryTime = getNodeText(selectNodes(alertsTasksDom,"//POLLINGINTERVAL")[0]);
                                    if(alertInterval != undefined && alertInterval != ""){
                                        clearInterval(taskReminderTimerId);
                                        taskReminderTimerId = setInterval(function(){fnShowReminderAlert()},alertInterval*60000);//Commented
                                    }*/
                              /*  }
                                lastPollTime = new Date();
                                }                        
                        }
                    } */
                    objHTTP.send(alertstaskRequestXml);
                        var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
                            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
                            } else {
                                alertsTasksDom = objHTTP.responseXML;
                                lastPollTime = new Date();
                            }                        
}				  
//RND Changes ends
function fnRemoveDuplicateAlerts()
{
 var uniqArr =new Array();
 var duplicate = false;
 for(i=0;i<reminderAlertArray.length;i++)
 {
    duplicate = false;
    for (j=0;j<remindedArray.length;j++)
    {
        var reminderDateArr = reminderAlertArray[i][2].split("-");
        var remindedDateArr = remindedArray[j][2].split("-");
        var reminderDate =  new Date(reminderDateArr[0], reminderDateArr[1]-1, reminderDateArr[2], reminderDateArr[3], reminderDateArr[4], reminderDateArr[5], "00");
        var remindedDate =  new Date(remindedDateArr[0], remindedDateArr[1]-1, remindedDateArr[2], remindedDateArr[3], remindedDateArr[4], remindedDateArr[5], "00");
        if(remindedArray[j][3] =="NA" && reminderAlertArray[i][7] == remindedArray[j][7] && reminderDate.getTime() == remindedDate.getTime())
        duplicate = true;
        else if (remindedArray[j][3] !="NA" && reminderAlertArray[i][3] == remindedArray[j][3] && reminderDate.getTime() == remindedDate.getTime())
        duplicate = true;
    }
       if (duplicate == false)
       {
       uniqArr[uniqArr.length] = reminderAlertArray[i];
       }
 }
 reminderAlertArray = uniqArr;
 duplicate = false;
uniqArr =new Array();
 for(i=0;i<reminderAlertArray.length;i++)
 {
    duplicate = false;
    for (j=i+1;j<reminderAlertArray.length;j++)
    {
        var reminderDateArr = reminderAlertArray[i][2].split("-");
        var remindedDateArr = reminderAlertArray[j][2].split("-");
        var reminderDate =  new Date(reminderDateArr[0], reminderDateArr[1]-1, reminderDateArr[2], reminderDateArr[3], reminderDateArr[4], reminderDateArr[5], "00");
        var remindedDate =  new Date(remindedDateArr[0], remindedDateArr[1]-1, remindedDateArr[2], remindedDateArr[3], remindedDateArr[4], remindedDateArr[5], "00");
        if(reminderAlertArray[j][3] =="NA" && reminderAlertArray[i][7] == reminderAlertArray[j][7] && reminderDate.getTime() == remindedDate.getTime())
        duplicate = true;
        else if (reminderAlertArray[j][3] !="NA" && reminderAlertArray[i][3] == reminderAlertArray[j][3] && reminderDate.getTime() == remindedDate.getTime())
        duplicate = true;
    }
       if (duplicate == false)
       {
  	     uniqArr[uniqArr.length] = reminderAlertArray[i];
       }
 }
 reminderAlertArray = uniqArr;
return true;
}
function craeteAlertWindow(){
    showReminderAlert();
try{
    mainWin.addTab('Div_ReminderAlertWin', getItemDesc("LBL_TITLE_NOTIFICATION"));
}catch(e){}
    document.getElementById("fastpath").focus();
}
function showReminderAlert(){
    var alertWindow = document.getElementById("ifr_ReminderAlertWin");
    if(fnUpdateReminders!=null)
        fnUpdateReminders();
    else
        alertWindow.src = encodeURI("WFReminderAlert.jsp?&THEME="+parent.window.strTheme);
    var alertWinObj = document.getElementById("Div_ReminderAlertWin");
    alertWinObj.style.display = "block";
}
function showRemoveReminder(taskId){
    var tempArray =new Array();
    for(var idx2=0;idx2<reminderAlertArray.length;idx2++){
        if(reminderAlertArray[idx2][3] != taskId ){
            tempArray.push(reminderAlertArray[idx2]);
        }
    }
    reminderAlertArray = tempArray;	
//RND changes ends
} 
//12.1 Retro_Changes ends
