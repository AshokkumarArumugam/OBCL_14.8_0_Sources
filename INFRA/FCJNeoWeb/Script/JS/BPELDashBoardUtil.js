var pageSize = 10; 
var gTasksDOM; 
function Initialize() {
        var labelhistory = parent.getItemDesc("LBL_HISTORY");
	var labeldocs = parent.getItemDesc("LBL_DOCS");
	var labeladvices = parent.getItemDesc("LBL_ADVICES");
	var labelInteractions = parent.getItemDesc("LBL_INTERACTIONS");        
	totalPages = parent.tabTableContent[winId+'totalPages'];
	currPage = parent.tabTableContent[winId+'currPage'];
	taskCount = parent.tabTableContent[winId+'taskCount'];
 	gTasksDOM =parent.tabTableContent[winId+'TASKDOM'];
	if(isDetail=='Y' && qType =='Q'){
                tableContent = "<div id='taskTableContainer'>";
		tableContent += parent.tabTableContent[winId+'DETAILTABLE']+"</div>";
                tableContent +="<div id=\'BPELTaskhistoryHeader\' class=\"TASKLIST_CAP\" >";
                tableContent +="<div class=\'DIVcaption1\' id=\'HeaderSummary\' style=\"height:0.8em\">";
                tableContent += '<div id="taskdboardHistorytablistDiv" class="DBoardHeadDiv">';
                tableContent +='<a id="taskdboardHistorytablistHistory" title="'+labelhistory+'" onclick="doHistoryTabActions(\'History\',event)">';
                tableContent +='<span class="DBoardHeadDivSpanSel">&nbsp;'+labelhistory+'</span>';
                tableContent +='</a>';
                tableContent +='<a id="taskdboardHistorytablistInteractions"  title="'+labelInteractions+'" onclick="doHistoryTabActions(\'Interactions\',event)" >';
                tableContent +='<span class="DBoardHeadDivSpanDeSel">&nbsp;'+labelInteractions+'</span>';
                tableContent +='</a>';
                tableContent +='<a id="taskdboardHistorytablistDocuments"  title="'+labeldocs+'" onclick="doHistoryTabActions(\'Documents\',event)">';
                tableContent +='<span class="DBoardHeadDivSpanDeSel">&nbsp;'+labeldocs+'</span>';
                tableContent +='</a>';
                tableContent +='<a id="taskdboardHistorytablistAdvices" title="'+labeladvices+'" onclick="doHistoryTabActions(\'Advices\',event)" >';
                tableContent +='<span class="DBoardHeadDivSpanDeSel">&nbsp;'+labeladvices+'</span>';
                tableContent +='</a>';
                tableContent +='</div>';	
                tableContent +='<div style="clear:both; width:99%;background:none" class="DIVpage"><h2 id="workflowRefNo" class="SPNpageH"></h2></div>';	
                tableContent +="</div></div>";
                tableContent +="<div class=\"DIVtblbox1\" id=\"BPELTaskHistoryDetails\" style=\"overflow: auto; width: 100%;\">";
                tableContent +="<table  name=\'tblTaskHistory\' id=\'tblTaskHistory\'  class=\'TBLone\' style=\'width:99%\' summary=\'\'>";
                tableContent +="<thead id=\'hdrTaskHistory\'></thead><tbody id=\'bdyTaskHistory\' onkeydown=\"return fnHandlexBPELTaskHistoryOnKeyDown(event)\"></tbody></table></div>";
	}else{
		tableContent = parent.tabTableContent[winId+'TABLE'];
	}

	if(winId=='null'){
		winId=null;
	}
	if(qType=='B'){
		reportId = parent.tabTableContent[winId+'REPORTID'];
	}else
	{
		actions = parent.tabTableContent[winId+'ACTIONS'];
	}
  if(isDetail!='Y')
	parent.tabTableContent[winId+'INITIALIZEREF']= Initialize;
  if (parent.tabTableContent[winId+'istempCheckBox'] == true)
  document.getElementById(winId+"showFilterChkBoxDB").checked = true;
  else if(parent.tabTableContent[winId+'istempCheckBox'] == false)
  document.getElementById(winId+"showFilterChkBoxDB").checked = false;
  if (taskCount==undefined) taskCount ='0';
  document.getElementById('tableContainer').innerHTML='';
  document.getElementById('tableContainer').insertAdjacentHTML("beforeEnd", tableContent);
  if (qType == 'Q'||qType == 'D')
	setInnerText(document.getElementById('heading'), qDesc+'('+taskCount+')');
  else 
    setInnerText(document.getElementById('heading'), qDesc);
  if (totalPages==undefined) totalPages ='0';
  if (currPage==undefined) {
	currPage ='0';
	//document.getElementById("navDiv").style.display = 'none';
  }
  setInnerText(document.getElementById("totalPages"), totalPages);
  setInnerText(document.getElementById("currPage"),currPage );
  fnshowNavibutton(currPage, pageSize, taskCount); 
  if (isDetail != 'Y') {
    document.getElementById("WNDtitlebar").style.display = 'none';
  }
  else {
    document.getElementById("divBtnWFRenew").style.display = 'none'; 

	document.getElementById("divBtnWFRenew").style.width = "80%"; //nags Confirmation
    if (qType == 'Q'||qType == 'D')
		setInnerText(document.getElementById('WNDtitletxt'), qDesc+'('+taskCount+')');
	else
		setInnerText(document.getElementById('WNDtitletxt'), qDesc);
  }
  if (qType != 'B' && qType != 'C') {
    var actionObj = document.getElementById("ACTIONS");
    actionArray = actions.split(',');
    actionObj.options[0] = new Option("", "");
    actionObj.selectedIndex = 0;
    for (var i = 0;i < actionArray.length;i++) {
      if (actionArray[i] !== "" && actionArray[i] !== 'null')
        actionObj.options[i + 1] = new Option(actionArray[i].toUpperCase(), actionArray[i].toUpperCase());
    }
  }
  else if (qType == 'C'){
    document.getElementById("ACTIONS").style.display = 'none';
    document.getElementById("BtnActionGo").style.display = 'none';
    document.getElementById("navDiv").style.display = 'none';
	document.getElementById(winId+"showFilterChkBoxDB").style.display = 'none';
	document.getElementById(winId+"lblfilter").style.display = 'none';
  }
  else {
    document.getElementById("ACTIONS").style.display = 'none';
    document.getElementById("BtnActionGo").style.display = 'none';
    document.getElementById("navDiv").style.display = 'none';
	document.getElementById("btnDiv12").style.display = 'none';
  }
  if (isDetail == 'Y')
    document.getElementById("BlowUp").style.display = 'none';
   if(parent.tabTableContent[winId+'isBlowUpNavi']!=undefined && parent.tabTableContent[winId+'isBlowUpNavi']=='Y'){
		fnBlowUP();
		parent.tabTableContent[winId+'isBlowUpNavi'] ='N';
	}
}


function fnshowNavibutton(page, pageSize, totalTasks) {
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
		return true;
}

function fnCalcHgtDashboard() {
  if (isDetail != 'Y') {
    var scrWidth = "";
    if (parent.document.getElementById(winId).className == "DIVColumnOne" || parent.document.getElementById(winId).className == "DIVColumnOneAndHalf") {
      parent.document.getElementById(winId).style.width = parent.document.getElementById(winId).parentNode.offsetWidth / 2 - 4 + "px";
      scrWidth = parent.document.getElementById(winId).parentNode.offsetWidth / 2 - 4;
    }
    else {
      parent.document.getElementById(winId).style.width = parent.document.getElementById(winId).parentNode.offsetWidth - 4 + "px";
      scrWidth = parent.document.getElementById(winId).parentNode.offsetWidth - 4;
    }
    var scrHeight = parent.document.getElementById(winId).parentNode.offsetHeight;
    parent.document.getElementById(winId).style.height = scrHeight - 8 + "px";
    parent.document.getElementById(winId).children[0].style.height = scrHeight - 8 + "px";
    //document.getElementById("containerFldset").style.height = scrHeight - 8 + "px";
    //document.getElementById("dataContainer").style.height = scrHeight - 8 + "px";
    document.getElementById("containerFldset").style.height = "100%";
    document.getElementById("dataContainer").style.height = scrHeight - 8 + "px";
    if (document.getElementById("divBtnDismiss"))
      //document.getElementById("tableContainer").style.height = document.getElementById("dataContainer").offsetHeight - document.getElementById("btnDiv").offsetHeight - document.getElementById("divBtnDismiss").offsetHeight - 8 + "px";
      document.getElementById("tableContainer").style.height = document.getElementById("dataContainer").offsetHeight - document.getElementById("btnActionDiv").offsetHeight - document.getElementById("divBtnDismiss").offsetHeight - 8 + "px";
    else  
      {//document.getElementById("tableContainer").style.height = document.getElementById("dataContainer").offsetHeight - document.getElementById("btnDiv").offsetHeight - document.getElementById("divBtnWFRenew").offsetHeight - 8 + "px";

	if(winId == "vTabCN_CENTRAL_PROCESSPart3" && qType == "Q")
	document.getElementById("tableContainer").style.height = document.getElementById("dataContainer").offsetHeight - (document.getElementById("actionsDiv").offsetHeight + document.getElementById("btnDiv").offsetHeight) - document.getElementById("divBtnWFRenew").offsetHeight - 15 + "px";
	else
    document.getElementById("tableContainer").style.height = document.getElementById("dataContainer").offsetHeight - document.getElementById("btnActionDiv").offsetHeight - document.getElementById("divBtnWFRenew").offsetHeight - 12 + "px";
	}
    parent.document.getElementById(winId).children[0].style.width = scrWidth + "px";
    document.getElementById("containerFldset").style.width = scrWidth + "px";
    document.getElementById("dataContainer").style.width = scrWidth + "px";
    document.getElementById("tableContainer").style.width = scrWidth - 8 + "px";
    if (qType != 'Q') {
      document.getElementById("tableContainer").children[0].style.width = scrWidth - 8 + "px";
      //document.getElementById("tableContainer").children[0].style.height = document.getElementById("dataContainer").offsetHeight - document.getElementById("btnDiv").offsetHeight - document.getElementById("divBtnWFRenew").offsetHeight - 12 + "px";
      document.getElementById("tableContainer").children[0].style.height = document.getElementById("dataContainer").offsetHeight - document.getElementById("btnActionDiv").offsetHeight - document.getElementById("divBtnWFRenew").offsetHeight - 12 + "px";
    }
	if(parent.document.getElementById("DIVTabContentDBoardTasks").children.namedItem(winId+'ChildWinDetail')){
		parent.document.getElementById("DIVTabContentDBoardTasks").children.namedItem(winId+'ChildWinDetail').children.namedItem('ifrSubScreen').src='BpelDashboard.jsp?winId=' + winId + '&qDesc=' + qDesc + '&isDetail=Y&qType=' + qType;
	}
  }
  else {
   // var scrWidth = parent.document.getElementById(winId).parentNode.offsetWidth - 4;
    var scrWidth = parent.document.getElementById("DIVTabContentDBoardTasks").offsetWidth - 4;
    //var scrHeight = parent.document.getElementById("DIVTabContentDBoardTasks").offsetHeight - parent.document.getElementById("taskbar").offsetHeight- 4;
    var scrHeight = parent.document.getElementById("DIVTabContentDBoardTasks").offsetHeight - 4;
//12.1 Retro_Changes starts
     if(scrHeight ==-4)
        scrHeight = parent.document.getElementById("DIVTabContentDBoardTasks").scrollHeight - 4;
//12.1 Retro_Changes ends
	parent.document.getElementById("DIVTabContentDBoardTasks").children.namedItem(winId+'ChildWinDetail').children.namedItem('ifrSubScreen').style.width = scrWidth+ "px";
	parent.document.getElementById("DIVTabContentDBoardTasks").children.namedItem(winId+'ChildWinDetail').children.namedItem('ifrSubScreen').style.height = scrHeight+ "px";
    document.getElementById("containerFldset").style.width = scrWidth + "px";
    document.getElementById("dataContainer").style.width = scrWidth + "px";
    document.getElementById("tableContainer").style.width = scrWidth - 4 + "px";
    document.getElementById("containerFldset").style.height = scrHeight -4 + "px";
    document.getElementById("dataContainer").style.height = scrHeight -4 + "px";
    document.getElementById("tableContainer").style.height = scrHeight- document.getElementById("btnActionDiv").offsetHeight - 4 + "px";	
    if (qType != 'Q'){
      document.getElementById("tableContainer").children[0].style.height = scrHeight-document.getElementById("btnActionDiv").offsetHeight-4 + "px";
	  document.getElementById("tableContainer").children[0].style.width = scrWidth-20 + "px";
	}else{
            document.getElementById("tableContainer").firstChild.style.height =scrHeight*0.6 +"px";
	}
  }
}

function fnBlowUP() {
  var customWin = document.createElement("div");
  customWin.id = winId+"ChildWinDetail";
  customWin.className = "dhtmlwindow";
  customWin.style.position = "absolute";
  customWin.style.height =parent.document.getElementById("DIVTabContentDBoardTasks").scrollHeight+"px";
  customWin.style.width =parent.document.getElementById("DIVTabContentDBoardTasks").scrollWidth+"px";
  //var objwindow = '<iframe class="frames" id="ifrSubScreen" title="" src="BpelDashboard.jsp?winId=' + winId + '&qDesc=' + qDesc + '&isDetail=Y&qType=' + qType + '" allowtransparency="false" frameborder="0" scrolling="yes" height ="' + parent.document.getElementById("DIVTabContentDBoardTasks").scrollHeight + '" Width ="' + parent.document.getElementById("DIVTabContentDBoardTasks").scrollWidth + '" draggable="true"></iframe>';
  var objwindow = '<iframe  id="ifrSubScreen" title="" src="BpelDashboard.jsp?winId=' + winId + '&qDesc=' + qDesc + '&isDetail=Y&qType=' + qType + '" allowtransparency="false" frameborder="0" scrolling="no"  draggable="true"></iframe>';
  customWin.innerHTML = objwindow;
  if(parent.document.getElementById("DIVTabContentDBoardTasks").children.namedItem(winId+'ChildWinDetail')){
	parent.document.getElementById("DIVTabContentDBoardTasks").children.namedItem(winId+'ChildWinDetail').children.namedItem('ifrSubScreen').src='BpelDashboard.jsp?winId=' + winId + '&qDesc=' + qDesc + '&isDetail=Y&qType=' + qType;
  }
  else {
	parent.document.getElementById("DIVTabContentDBoardTasks").appendChild(customWin);
	}
}

function fnExitScreen() {
  var childDivObj = parent.document.getElementById(winId+"ChildWinDetail");
  childDivObj.getElementsByTagName("IFRAME")[0].src = "";
  parent.document.getElementById("DIVTabContentDBoardTasks").removeChild(childDivObj);
}
function fnDoDashBoardAction(event){
//12.1 Retro_Changes starts
          if(qType == 'D'){
          fnProcessAlerts(event);   
        }else
//12.1 Retro_Changes ends
	fnProcessTasks(event);
	fnRefreshDashBoardData(event);//12.1 Retro_Changes
	return true;
}
function fnProcessTasks(event) {
    var tableRef = document.getElementById(winId+"Table").tBodies[0];
    var rowNum = tableRef.rows.length;
    var taskIdList = '';
	var workFlowRefList='';
    var action = document.getElementById("ACTIONS").value;
	var outcome;
	var flag = false;
	for (var index = 0; index < rowNum; index++) {
        if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
			outcome = tableRef.rows[index].getAttribute("OUTCOMES");
			//outcome +='!REINITIATE!STATUS!COPY';
            outcome +='!REINITIATE!STATUS!COPY!ESCALATE!REASSIGN';
			if(action=='null'||action==''||outcome.indexOf(action) == -1){
				//alert('Invalid Operation');
				parent.showAlerts(fnBuildAlertXML('IV-WRGOPER', 'E'), 'E');
				return ;
			}
           taskIdList = taskIdList + tableRef.rows[index].getAttribute('TASKID') + '~';
		   workFlowRefList = workFlowRefList + tableRef.rows[index].getAttribute('wfrefno') + "~";	 /*20874452 */
			flag=true;
        }
    }
	if(flag&&action!='COPY'&&action!='STATUS'&& action!='REASSIGN') {
		fnDoAction(taskIdList, action,' ',true);
		//refreshQueue();
		parent.fnRefreshIfAction();
	}
	else if(flag && action=='REASSIGN') {
		
		showDashReassign(workFlowRefList, taskIdList);			 
    /*20874452 changes end */
	}
	else if(flag&&action=='COPY'){
		fnDoCopyAction(event);
	}
	else if(flag&&action=='STATUS'){
		taskIdList = '';
		for (var index = 0; index < rowNum; index++) {
			if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
				taskIdList = taskIdList + tableRef.rows[index].getAttribute('INSTANCEID') + '~';
				flag=true;
			}
		}	
		fnDepictTasks(taskIdList);
	}
	else //alert('No task selected');+
	parent.showAlerts(fnBuildAlertXML('IV-NOTASK', 'E'), 'E');
}
//12.1 Retro_Changes starts
function fnProcessAlerts(event) {
	parent.gNotifAlerts = new Array();
    var tableRef = document.getElementById(winId+"Table").tBodies[0];
    var rowNum = tableRef.rows.length;
    var alertIds = '';
    var alertSources = '';
    var taskkIds ='';
    var tmpAction = document.getElementById("ACTIONS").value;
    /* Fix for 27959507 Start */
    var tempDomStr = "<?xml version='1.0' encoding='UTF-8'?>";
    tempDomStr += "<ACTION>"+tmpAction+"</ACTION>";
    var tempDOM = loadXMLDoc(tempDomStr);
    var action = getNodeText(selectSingleNode(tempDOM,"//ACTION"));
    /* Fix for 27959507 End */
	var actions;
	var flag = false;
	for (var index = 0; index < rowNum; index++) {
        if (tableRef.rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
			actions = tableRef.rows[index].getAttribute("ACTIONS");
            if(action==null || action=='null'||action==''||actions.indexOf(action) == -1){
		parent.showAlerts(fnBuildAlertXML('IV-WRGOPER', 'E'), 'E');
		return ;
        	}
           if(tableRef.rows[index].getAttribute('ALERT_ID')!= undefined)     
             alertIds = alertIds + tableRef.rows[index].getAttribute('ALERT_ID') + '~';
             taskkIds =taskkIds +'NA~';
           if(tableRef.rows[index].getAttribute('ALERT_ID')!= undefined)
			{
				alertSources = alertSources + tableRef.rows[index].getAttribute('ALERT_SOURCE') + '~';             
				var altDtls =tableRef.rows[index].getAttribute('SUBJECT')
				+","+tableRef.rows[index].getAttribute('REMARKS')
				+","+tableRef.rows[index].getAttribute('ALERT_DATE')
				+","+'NA'
				+","+action
				+","+'NA'
				+","+tableRef.rows[index].getAttribute('TARGET')
				+","+tableRef.rows[index].getAttribute('ALERT_ID')
				+","+tableRef.rows[index].getAttribute('ALERT_SOURCE')
				+","+'NA';
				parent.gNotifAlerts[parent.gNotifAlerts.length] = altDtls;
			}
	  flag=true;
        }
    }
	if(flag&&action!=undefined&&action!='') {
            try {
            if (action != "")
            { 
                var fnEval = new Function("taskkIds","alertIds","alertSources","return fn_"+action+"(taskkIds,alertIds,alertSources);");  
                if (!fnEval(taskkIds,alertIds,alertSources)) {
                    return false;
                }
                //fn_DISMISS(alertIds,alertSources);
            }
            } catch (e) {}
            parent.fnRefreshIfAction();
	}
	else //alert('No task selected');+
            parent.showAlerts(fnBuildAlertXML('IV-NOTASK', 'E'), 'E');
}
function fn_DISMISS(taskIds,alertIds,alertSources){
    var remarks ='';
    alertIds = alertIds.substr(0,alertIds.length-1);
    taskIds = taskIds.substr(0,taskIds.length-1);
    alertSources = alertSources.substr(0,alertSources.length-1);
    processAlertRequest("","",alertIds,alertSources,"DISMISS",remarks); 
    return true;
}
function fn_FORWARD(taskIds,alertIds,alertSources){
    alertIds = alertIds.substr(0,alertIds.length-1);
    taskIds = taskIds.substr(0,taskIds.length-1);
    alertSources = alertSources.substr(0,alertSources.length-1);
    fnSetReminder(taskIds,alertIds,"FORWARD");
}
function fn_RESET(taskIds,alertIds,alertSources){
    alertIds = alertIds.substr(0,alertIds.length-1);
    taskIds = taskIds.substr(0,taskIds.length-1);
    alertSources = alertSources.substr(0,alertSources.length-1);
    fnSetReminder(taskIds,alertIds,"RESET");
}
function fn_NOTIFY(taskIds,taskkIdsalertIds,alertSources)
{
    // parent.g_reminder_subject = details.split(',')[0];
     //parent.g_reminder_message = details.split(',')[1];
     //parent.g_alert_id = details.split(',')[7];
     fnShowNotifScreen();
     return true;
}
function  fn_VIEW(taskkIds,alertIds,alertSources){
       if(alertIds.split('~').length >2) {
		parent.showAlerts(parent.fnBuildAlertXML('IN-HEAR-205', 'E'), 'E');
		return false;
	}
	createTempForwardIframe( "FCDocumentControllerServlet?actionType=ViewMail&documentID=" + alertIds.split('~')[0]);
}
function createTempForwardIframe(src){
    try {
       clearTempDiv();
        var parent = document.getElementById('dataContainer');
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
function processAlertRequest(resetDate,forwardUserId,alertIds,alertSrc,action,remarks){
	var alertRequestXml = "<TaskRequest OP = 'ACTIONALERT'>";
        alertRequestXml += "<action>"+action+"</action>";
        alertRequestXml += "<alertIds>"+alertIds+"</alertIds>";
        alertRequestXml += "<alertSrc>"+alertSrc+"</alertSrc>";
        alertRequestXml += "<resetDate>"+resetDate+"</resetDate>";
        alertRequestXml += "<forwardUserId>"+forwardUserId+"</forwardUserId>";
        alertRequestXml += "<remarks>"+remarks+"</remarks>";
        alertRequestXml += "</TaskRequest>";
        var tasksDom = parent.getTasksDom(alertRequestXml);
}
//12.1 Retro_Changes Ends
function fnDoCopyAction(event) 
{
    var tableRef = document.getElementById(winId+"Table").tBodies[0];
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
					parent.isDashboardCopy = true;
					parent.copytaskFunctionRef =fnDashboardCopyTask;
                    parent.disp_lov('SMCHGBRN','BLK_BRANCH','STAGE','Target Stage','LOV_TASK_COPY', 'Task Copy Stages', '', '', '', event);	                                        
                    mainWin.document.getElementById('BLK_BRANCH__STAGE').value  = '';
                    return true;
                }
                taskIdList = taskIdList + taskId + ',' + currStage + ',' + targetStage + '~';
            }
        }    
        fnDoAction(taskIdList, 'COPYTASK',' ',true);
        wfIdList = fnCopyTaskDom(gTaskCopyDom);
        if (wfIdList != "")
        {
          fnDoActionAsync(wfIdList, 'MOVETASK');
        }
    }
    return true;
}
function fnDashboardCopyTask(stage) 
{
    var tableRef = document.getElementById(winId+"Table").tBodies[0];  
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
          fnDoAction(taskIdList, 'COPYTASK',' ',true); 
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
function displayNextPage() {
    if (navigateDBQueue( "NEXT", currSortField, currSortOrder)) 
        currPage = document.getElementById("currPage").value;
}

function displayFirstPage() {
    if (navigateDBQueue( "FIRST", currSortField, currSortOrder)) 
        currPage = document.getElementById("currPage").value;
}

function displayPrevPage() {
    if (navigateDBQueue( "PREV", currSortField, currSortOrder)) 
        currPage = document.getElementById("currPage").value;
}

function displayLastPage() {
    if (navigateDBQueue("LAST", currSortField, currSortOrder)) 
        currPage = document.getElementById("currPage").value;
}

function goToPage() {
    if (navigateDBQueue("GOTOPAGE", currSortField, currSortOrder)) 
        currPage = document.getElementById("currPage").value;
}
function refreshQueue() {
        navigateDBQueue();
}
function navigateDBQueue(page, SortField, SortOrder) {
parent.isRefresh = true;
	if (currPage.toString().indexOf("..") != -1){ 
		if(currPage.toString().indexOf("..") == 0)
			currPage = currPage.toString().substring(2, currPage.length);
	else if(currPage.toString().indexOf("..") == 2)
			currPage =  currPage.toString().substring(0,2);	
	}
	parent.tabTableContent[winId+'SortField'] = SortField;
	parent.tabTableContent[winId+'SortOrder'] = SortOrder;
	parent.tabTableContent[winId+'page'] = page;
	parent.tabTableContent[winId+'goto'] = document.getElementById("goto").value ;
	parent.tabTableContent[winId+'currPage'] = currPage;
    //if((document.getElementById("totalPages").value!=undefined)||typeof(document.getElementById("totalPages").value) != 'undefined') {
    //   parent.tabTableContent[winId+'totPageTemp']=document.getElementById("totalPages").value; 
	if ( totalPages.toString().indexOf("..") != -1) {
        if(totalPages.toString().indexOf("..") == 0)
			totalPages =  totalPages.toString().substring(2, totalPages.length);
		else if(totalPages.toString().indexOf("..") == 2)
			totalPages =  totalPages.toString().substring(0,2);		
    }			
	parent.tabTableContent[winId+'totPageTemp']=totalPages;
    //}			
        //parent.dispDBQueue(winId,parent.tabTableContent[winId+'qName'],'Q','',parent.tabTableContent[winId+'filedLists'],actions,qDesc);
	if (isDetail == 'Y') {
		parent.tabTableContent[winId+'isBlowUpNavi'] ='Y';
	}
        parent.dispDBQueue(winId,parent.tabTableContent[winId+'qName'],qType,'',parent.tabTableContent[winId+'filedLists'],actions,qDesc); //12.1 Retro_Changes
}
function FnSortTask(event) {
    var e = window.event || event;
    var handleobj = getEventSourceElement(e);
    while (handleobj.tagName != 'TH')
    handleobj = handleobj.parentElement;
    var Headervalue = handleobj.id;
//12.1 Retro_Changes starts
    //if (handleobj.lastChild.nameProp == 'down.gif' || handleobj.lastChild.nameProp == 'spacer.gif') 
    if (handleobj.lastChild.src!=undefined && (handleobj.lastChild.src.indexOf('down.gif')!= -1 || handleobj.lastChild.src.indexOf('spacer.gif')!=-1)) 
        var sortOrder = "ASCENDING";
    else var sortOrder = "DESCENDING";
    //displayQueueTasks(currQueueId, '', Headervalue, sortOrder);
    currSortField=Headervalue;
    currSortOrder=sortOrder;
//12.1 Retro_Changes ends
	navigateDBQueue('', Headervalue, sortOrder);
}
function showFunctionId(rowIndex, evnt) {
    if (!parent.isSessionActive()) {
        return;
    }
    var e = window.event || evnt;
    if (rowIndex == null) 
        rowIndex = getRowIndex(e) - 1;
    var funcId = document.getElementById(winId+"Table").tBodies[0].rows[rowIndex].getAttribute("FUNCID");
    var taskId = document.getElementById(winId+"Table").tBodies[0].rows[rowIndex].getAttribute("TASKID");
    var uiname = "";
    if (parent.uiNames[funcId] != "" && typeof(parent.uiNames[funcId]) != "undefined") 
        uiname = parent.uiNames[funcId];
    taskStatus = document.getElementById(winId+"Table").tBodies[0].rows[rowIndex].getAttribute("STATUS");
	var workflowRefNo = getInnerText(document.getElementById(winId+"Table").tBodies[0].rows[rowIndex].childNodes[1]);

    parent.workflowRefNo = workflowRefNo;
	parent.status=taskStatus;
	mainWin.taskStatus =taskStatus;
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
    //var newWin = parent.openWindow("testwin", "SMSStartLogServlet?funcid=" + funcId + "&taskId=" + taskId + "&uiName=" + uiname + "&msgType=WORKFLOW&actionType=initiate" + "&timestamp=" + timeStamp.getTime() + "&inTime=" + inTime + "&X-CSRFTOKEN=" + parent.CSRFtoken);
    var newWin = parent.openWindow("testwin", "TempForward.jsp?action=SMSStartLogServlet&funcid=" + funcId + "&taskId=" + taskId + "&uiName=" + uiname + "&msgType=WORKFLOW&actionType=initiate" + "&timestamp=" + timeStamp.getTime() + "&inTime=" + inTime+"&txnBranch="+parent.g_txnBranch);
    fnGetTaskComments(taskId, true);
}
function fnCheckAllTasks() {
    var tableRef = document.getElementById(winId+"Table").tBodies[0];
    var tableHdr = document.getElementById(winId+"Table").tHead;
    if (tableHdr.rows[1].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
        for (var rowIndex = 0; rowIndex < tableRef.rows.length; rowIndex++) {
            tableRef.rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked = true;
        }
    } else if (tableHdr.rows[1].cells[0].getElementsByTagName("INPUT")[0].checked == false) {
        for (var rowIndex = 0; rowIndex < tableRef.rows.length; rowIndex++) {
            tableRef.rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked = false;
        }
    }
}
function fnRefreshDashBoardData(e){
	parent.isRefresh = true;
	if(qType == 'Q' || qType == 'D')      //12.1 Retro_Changes
	{	
	document.getElementById("goto").value = currPage;
	//navigateDBQueue('GOTOPAGE', parent.tabTableContent[winId+'SortField'], parent.tabTableContent[winId+'SortOrder']);
	if (document.getElementById(winId+"showFilterChkBoxDB").checked == false)
	parent.isFilterTask=false;
	//document.getElementById(winId+"showFilterChkBoxDB").checked = false;
	else if( document.getElementById(winId+"showFilterChkBoxDB").checked == true)
	{
	parent.isFilterTask=true;
	parent.isApplytoAll = false;
	if(parent.tabTableContent[winId+"filtercriteria"] != "" && parent.tabTableContent[winId+"filtercriteria"]!= undefined)
	parent.filterCriteria = parent.tabTableContent[winId+"filtercriteria"];
	else
		parent.filterCriteria = parent.tabTableContent["applyallfiltercriteria"];
	}
	navigateDBQueue();
}
	else if(qType == 'C')
	{
	parent.dispDBQueue(winId,'','C','','','','');
//12.1 Retro_Changes starts
	}else if(qType == 'D')
	{	
            document.getElementById("goto").value = currPage;
            navigateDBQueue();
   //12.1 Retro_Changes ends
	}	
}
function fnDepictTasks(taskIdList)
{
	var customWin = document.createElement("div");
    var tableRef = document.getElementById(winId+"Table").tBodies[0];
    var rowNum = tableRef.rows.length;
    //parent.document.getElementById("DIVTabContentDBoardTasks").children[0].style.height = 500 +"px";
	customWin.id = "ChildWin";
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
	if(taskIdList.split('~').length >2) {
		//alert('Bulk operation is not supported');
		parent.showAlerts(fnBuildAlertXML('IN-HEAR-205', 'E'), 'E');
		return false;
	}
	//src	='Depict.jsp';
	parent.base64image =parent.getFlowDiagram(taskIdList.split('~')[0]);
        //
        //25081813 starts
	//src	="FCDocumentControllerServlet?Action=FileView&FileName=" + parent.base64image+"&X-CSRFTOKEN=" + parent.CSRFtoken;        
         src = "TempForward.jsp?action=FCDocumentControllerServlet&actionType=FileView&FileName=" + parent.base64image;
        //25081813 ends
	//var objwindow = '<iframe class="frames" id="ifrSubScreen" title="" src="' + src + '" allowtransparency="true" frameborder="0" scrolling="auto" height="100%" width="100%" draggable="true"></iframe>';
	if(parent.base64image==null||parent.base64image=='')
		//alert('Internal Server Error');
		//parent.showAlerts(fnBuildAlertXML('CO-5111', 'E'), 'E');
              parent.showAlerts(fnBuildAlertXML('OR-INF-008', 'E'), 'E');
	else{	
//		var objwindow = '<iframe class="frames" onload="reSize()" id="ifrSubScreen" title="" src="' + src + '" allowtransparency="true" frameborder="0" scrolling="yes" height ="'+parent.document.getElementById("DIVTabContentDBoardTasks").scrollHeight+'" Width ="'+parent.document.getElementById("DIVTabContentDBoardTasks").scrollWidth+'" draggable="true"></iframe>';
		//var printReportDIVHeight    = document.getElementById("WNDtitlebar");
		//customWin.innerHTML = objwindow;
		//parent.document.getElementById("DIVTabContentDBoardTasks").appendChild(customWin);
		mainWin.open(src, null, "width=640px,height=480px,resizable=yes,scrollbars=yes,status=1,toolbar=no", false);
	}
}

function fnshowFilter(event){
	var customWin = document.createElement("div");
	var lblFilters =parent.getItemDesc("LBL_FILTERS");
    customWin.id = winId+"ChildWinfilter";
	customWin.className = "dhtmlwindow";
	customWin.style.position = "absolute";
	var browsermenuHTML ="<div id='"+winId+"tableContainer' class='DIVMultipleSmallInner' style='overflow: auto; clear: both;width:100%'><div  id=\'"+winId+"TBLPageidFilters\' style=\'display:none;\'>";
    browsermenuHTML +="<div class=\'DIVpage\' id=\'"+winId+"TaskFiltersHeader\' style=\'width:99.5%;\'><h2 class=\'SPNpageH\' accesskey=\"4\" tabindex=\"0\">"+lblFilters+"</h2></div>";
    browsermenuHTML +="<div id=\""+winId+"TBTaskFilters\" class=\"DIVtasksearch\" style=\"clear:both;padding:4px\">";
    browsermenuHTML +="<fieldset class=\"FSTdiv\"><legend>"+lblFilters+"</legend></div></div></div>";		  
	customWin.innerHTML = browsermenuHTML;
		parent.document.getElementById("DIVTabContentDBoardTasks").appendChild(customWin);
   //12.1 Retro_Changes starts
		if(qType =='D'){
                    var taskDom=parent.tabTableContent[winId+'TASKDOM'];
                        var collHeaderArr = getNodeText(selectSingleNode(taskDom, "//FCUBS_RES_ENV/FCUBS_HEADER/COL_NAME")).split("~");
                        var collHeaderLabelArr = getNodeText(selectSingleNode(taskDom, "//FCUBS_RES_ENV/FCUBS_HEADER/COL_LBL")).split("~");
                        var collHeaderCollTypeArr = getNodeText(selectSingleNode(taskDom, "//FCUBS_RES_ENV/FCUBS_HEADER/COL_TYPE")).split("~");
                        parent.getSummaryFilters(winId,collHeaderLabelArr,collHeaderArr,collHeaderCollTypeArr,'');
                }
                else
//12.1 Retro_Changes ends
		parent.getFilters(parent.tabTableContent[winId+'qName'],winId,'');
		parent.document.getElementById(winId+"TBLPageidFilters").style.display='block';
}
function fnCheckFilter(event){
	if(document.getElementById(winId+"showFilterChkBoxDB").checked == true)
		fnshowDashboardFilter(event);
	else if (document.getElementById(winId+"showFilterChkBoxDB").checked == false) 
	{
		//document.getElementById("showFilterChkBoxDB").checked = true;
		parent.tabTableContent[winId+'istempCheckBox'] = false;
		fnRefreshDashBoardData(event);
	}
}
function fnshowDashboardFilter(event){
	document.getElementById(winId+"showFilterChkBoxDB").checked = true;
	//istempCheckBox = true;
	var customWin = document.createElement("div");
	var lblFilters =parent.getItemDesc("LBL_FILTERS");
    customWin.id = winId+"ChildWinfilter";
	customWin.className = "dhtmlwindow";
	customWin.style.position = "absolute";
	var browsermenuHTML ="<div id='"+winId+"tableContainer' class='DIVMultipleSmallInner' style='overflow: auto; clear: both;width:100%'><div  id=\'"+winId+"TBLPageidFilters\' style=\'display:none;width:99.5%\'>";
    browsermenuHTML +="<div class=\'DIVpage\' id=\'"+winId+"TaskFiltersHeader\' style=\'width:99.5%;\'><h2 class=\'SPNpageH\' accesskey=\"4\" tabindex=\"0\">"+lblFilters+"</h2></div>";
    browsermenuHTML +="<div id=\""+winId+"TBTaskFilters\" class=\"DIVtasksearch\" style=\"clear:both;padding:4px\">";
    browsermenuHTML +="<fieldset class=\"FSTdiv\"><legend>"+lblFilters+"</legend></div></div></div>";		  
	customWin.innerHTML = browsermenuHTML;
	//parent.checkBoxRef = document.getElementById("showFilterChkBoxDB");
	parent.document.getElementById("DIVTabContentDBoardTasks").appendChild(customWin);
   //12.1 Retro_Changes starts
        if(qType =='D'){
            var taskDom=parent.tabTableContent[winId+'TASKDOM'];
                var collHeaderArr = getNodeText(selectSingleNode(taskDom, "//FCUBS_RES_ENV/FCUBS_HEADER/COL_NAME")).split("~");
                var collHeaderLabelArr = getNodeText(selectSingleNode(taskDom, "//FCUBS_RES_ENV/FCUBS_HEADER/COL_LBL")).split("~");
                var collHeaderCollTypeArr = getNodeText(selectSingleNode(taskDom, "//FCUBS_RES_ENV/FCUBS_HEADER/COL_TYPE")).split("~");
                parent.getSummaryFilters(winId,collHeaderLabelArr,collHeaderArr,collHeaderCollTypeArr,'D');
        }else    		   
   //12.1 Retro_Changes ends
	parent.getFilters(parent.tabTableContent[winId+'qName'],winId,'D');
	parent.document.getElementById(winId+"TBLPageidFilters").style.display='block';
}