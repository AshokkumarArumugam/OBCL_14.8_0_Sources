<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : WFReminderAlert.jsp
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

Copyright © 2004-2016 by Oracle Financial Services Software Limited..
---------------------------------------------------------------------------------------------------- 
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
--------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>

<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="java.util.Map"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String ieCss            = "";
    String browserCSS       = "";
    String Strlang          = "";
    String StrlangISOMap    = "";
    if(jsParser == null){
        String userAgent = request.getHeader("USER-AGENT").toUpperCase();
        if(userAgent.contains("MSIE")) {
            jsParser = "BROWSER_IE.js";
            if (userAgent.contains("MSIE 7"))
                ieCss = "IE7.css";
        } else {
            jsParser = "BROWSER_NonIE.js";
        }
        browserCSS = "BROWSER_IE.css";
        if(userAgent.indexOf("FIREFOX") >= 0) {
            browserCSS = "BROWSER_FF.css";
        } else if(userAgent.indexOf("OPERA") >= 0) {
            browserCSS = "BROWSER_OP.css";
        } else if(userAgent.indexOf("CHROME") >= 0) {
            browserCSS = "BROWSER_GO.css";
        } else if(userAgent.indexOf("SAFARI") >= 0) {
            browserCSS = "BROWSER_SF.css";
        }   
        Strlang           = BranchConstants.DEFAULT_LANGCODE;
        StrlangISOMap     = (BranchConstants.DEFAULT_LANG_ISOMAP).toLowerCase();
    }else{        
        ieCss               = (String)session.getAttribute("IECSS");
        browserCSS          = (String)session.getAttribute("BROWSER_CSS");    
        Strlang             = (String)session.getAttribute("LANG");
        if(Strlang == null)
            Strlang           = BranchConstants.DEFAULT_LANGCODE;
        StrlangISOMap       = (String)session.getAttribute("LANGISOMAP");
        if(StrlangISOMap == null)
            StrlangISOMap     = (BranchConstants.DEFAULT_LANG_ISOMAP).toLowerCase();
    }
    
    String StrUserId         = (String) session.getAttribute("USERID");   
    String entity         = (String) session.getAttribute("ENTITY");   
    String branchIdentifier  = BranchConstants.BRANCH_CENTRALIZED;
   /* # BUG 15978732 fixes start */ 
    String strTheme        = FCUtility.validateParameter(request.getParameter("THEME"));
    String message         = FCUtility.validateParameter(request.getParameter("MESSAGE"));
    String screenType      = FCUtility.validateParameter(request.getParameter("SCREENTYPE"));//FCUBS11.1 CROSSBROWSER changes 
    String AlertType       = FCUtility.validateParameter(request.getParameter("MSG_TYPE"));

    String error           = request.getParameter("ERROR");
    String errorType       = request.getParameter("ERROR_TYPE");
    String timestamp = FCUtility.validateParameter(request.getParameter("timestamp"));
    String funcid = FCUtility.validateParameter(request.getParameter("funcid"));
    String seqNo = FCUtility.validateParameter((String)request.getParameter("seqNo"));/* Changes for Undefined Seq no*/
    String TerminalId = (String) FCUtility.validateParameter(FCUtility.getCleintIPAddr(request));
    if (StrUserId == null || "".equals(StrUserId)){
        StrUserId = TerminalId;
    }
    
    FBContext fbContext    = new FBContext(StrUserId);
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
   
    
    String title         = (String) itemDescMap.get("LBL_TITLE_NOTIFICATION");
    String labelRefresh = (String) itemDescMap.get("LBL_REFRESH");
    
    String okLabel          = (String) itemDescMap.get("LBL_OK");
    String close          = (String) itemDescMap.get("LBL_CLOSE");
    String minimize          = (String) itemDescMap.get("LBL_MINIMIZE");
    String updatedTime  = (String) itemDescMap.get("LBL_TIME");
    String action  = (String) itemDescMap.get("LBL_ACTION");
    String apply  = (String) itemDescMap.get("LBL_APPLY");
    String applyToAll  = (String) itemDescMap.get("LBL_APPLY_TO_ALL");
    String dismiss  = (String) itemDescMap.get("LBL_DISMISS");
    String notify  = (String) itemDescMap.get("LBL_NOTIFY");
    String resetReminder  = (String) itemDescMap.get("LBL_RESET_REMINDER");
    String applictionNo =(String) itemDescMap.get("LBL_APPNO_SUBJECT");
    String remarks =(String) itemDescMap.get("LBL_REMARKS");
    String noScriptLabel    = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String Message          = (String)itemDescMap.get("LBL_MESSAGE");
    String failedReason          = (String)itemDescMap.get("LBL_FAILED_REASON");
    String actionNotsup          = (String)itemDescMap.get("LBL_ACTION_NOT");
    String highPrior = (String)itemDescMap.get("LBL_HIGH");
    String mediumPrior = (String)itemDescMap.get("LBL_MEDIUM");
    String lowPrior = (String)itemDescMap.get("LBL_LOW");
    String lblPriority = (String)itemDescMap.get("LBL_GETPRIORITY");
    
    
    String imgSmlCLSName    =  "ICOAlert_" + AlertType;
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
    String dashCss = "dash.css";
    if (logintheme.contains("FlexNewUI2.css")) {
        dashCss = "dash2.css";
    }else if (logintheme.equals("FlexNewUI3.css")) {//HTML5 Changes 6/OCT/2016 start
        dashCss = "dash3.css";
    }//HTML5 Changes 6/OCT/2016 end
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
       <link href="Theme/<%=StringEscapeUtils.escapeURL(dashCss)%>" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start-->
        <!--
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/WFReminderUtils.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript">
            var timestamp = '<%=StringEscapeUtils.escapeJavaScript(timestamp)%>';
            var lowPrior = '<%=StringEscapeUtils.escapeJavaScript(lowPrior)%>';
            var highPrior = '<%=StringEscapeUtils.escapeJavaScript(highPrior)%>';
            var mediumPrior = '<%=StringEscapeUtils.escapeJavaScript(mediumPrior)%>';
            var actionNotsup = '<%=StringEscapeUtils.escapeJavaScript(actionNotsup)%>';
            var mainWin = parent.mainWin;
            var userFuncId='';
            var functionId='';
            var BlowUPOn = false;
            var alertRowSize = 10;
            var deleteAlertRow = 1;
            var alertActions = "";
            
            function chkErr() {
                var imageClass    = "<%=StringEscapeUtils.escapeJavaScript(imgSmlCLSName)%>";
                fnBuildAlertHTML(imageClass);
                resize_iframe();
            }
        function fnBuildAlertHTML(imageClass) {
            var tableBody = document.getElementById("ALERTTBL").tBodies[0];
            var alertMsgTitle ='<%=StringEscapeUtils.escapeHTML(title)%>';
            var reminderTitle = getInnerText(document.getElementById("wndtitle").getElementsByTagName('h1')[0]);
            var tabNode = parent.document.getElementById("tab_Div_ReminderAlertWin");
            if(reminderTitle.indexOf('(') == -1){
                setInnerText(document.getElementById("wndtitle").getElementsByTagName('h1')[0],alertMsgTitle+'('+parent.toBeRemindedArray.length+')');
                if(tabNode!=null && tabNode !=undefined){
                    setInnerText(tabNode.getElementsByTagName('h1')[0],alertMsgTitle+'('+parent.toBeRemindedArray.length+')');
                    tabNode.getElementsByTagName('h1')[0].style.background ="url(Images/ExtFlexblue/Icons/New_icon.gif) no-repeat right top;";
                }
            }
            else{
                var previousTaskCount= reminderTitle.substr(reminderTitle.indexOf('(')+1,reminderTitle.indexOf(')')-reminderTitle.indexOf('(')-1);
                previousTaskCount =Number(previousTaskCount)+ Number(parent.toBeRemindedArray.length);
                setInnerText(document.getElementById("wndtitle").getElementsByTagName('h1')[0],alertMsgTitle+'('+ previousTaskCount+')');
                if(tabNode!=null && tabNode !=undefined){
                    setInnerText(tabNode.getElementsByTagName('h1')[0],alertMsgTitle+'('+ previousTaskCount+')');
                    tabNode.getElementsByTagName('h1')[0].style.background ="url(Images/ExtFlexblue/Icons/New_icon.gif) no-repeat right top;";
                }
            }
            for (var idx1=0;idx1< parent.toBeRemindedArray.length;idx1++){
                var rowElem = document.createElement("TR");
                rowElem.setAttribute("alertDtl", parent.toBeRemindedArray[idx1]);
                var cell00 = document.createElement("TD");
                var cell00Data = "<input class='CHKStd' id='CHKid' type='checkbox' value='N'/>";
                cell00.innerHTML = cell00Data;
                rowElem.appendChild(cell00); 
                var cell01 = document.createElement("TD");
                var cell01Data = "";
                if(parent.toBeRemindedArray[idx1][9] == "L")
                    cell01Data = "<SPAN class='SPNtbltwoC'>"+lowPrior+"</SPAN>";
                else if(parent.toBeRemindedArray[idx1][9] == "M")
                    cell01Data = "<SPAN class='SPNtbltwoC'>"+mediumPrior+"</SPAN>";
                else
                    cell01Data = "<SPAN class='SPNtbltwoC'>"+highPrior+"</SPAN>";                    
                cell01.innerHTML = cell01Data;
                rowElem.appendChild(cell01);                
                var cell0 = document.createElement("TD");
                cell0.setAttribute("scope", "row");
                var timeArray =parent.toBeRemindedArray[idx1][2].split('-');
                var cell0Data = "<SPAN class='SPNtbltwoC'>"+timeArray[3]+":"+timeArray[4]+":"+timeArray[5]+"</SPAN>";
                //var cell0Data = "<SPAN class='SPNtbltwoC'>"+parent.toBeRemindedArray[idx1][2]+"</SPAN>";
                cell0.innerHTML = cell0Data;
                rowElem.appendChild(cell0);                
                var cell1 = document.createElement("TD");
                cell1.setAttribute("scope", "row");
                //var cell1Data = "<SPAN class='SPNtbltwoC'>"+parent.toBeRemindedArray[idx1][0]+"</SPAN>";
                if(parent.toBeRemindedArray[idx1][5] != "NA")
                    var cell1Data = "<a class='Afoot' href='#;return%20false' onclick=\"showFunctionId('"+parent.toBeRemindedArray[idx1][5]+"', '"+parent.toBeRemindedArray[idx1][3]+"','"+parent.toBeRemindedArray[idx1][0]+"')\">"+parent.toBeRemindedArray[idx1][0]+"</a>";
                else
                    var cell1Data = "<SPAN class='SPNtbltwoC'>"+parent.toBeRemindedArray[idx1][0]+"</SPAN>";
                cell1.innerHTML = cell1Data;
                rowElem.appendChild(cell1);
                var cell2 = document.createElement("TD");
                var cell2Data = "<SPAN class='SPNtbltwoC'>"+parent.toBeRemindedArray[idx1][1]+"</SPAN>";
                cell2.innerHTML = cell2Data;
                rowElem.appendChild(cell2);
                var cell3 = document.createElement("TD");
                var cell3Data = "<SPAN class='SPNtbltwoC'></SPAN>";
                cell3.innerHTML = cell3Data;
                if(BlowUPOn)
                    cell3.style.display = "";
                else
                    cell3.style.display = "none";
                rowElem.appendChild(cell3); 
//                var cell3 = document.createElement("TD");
//                //var cell3Data = "<button class=\"BTNtext\" id=\"BTNEscalateTask\" onclick=\"fnDoAction()\"><%=StringEscapeUtils.escapeHTML(dismiss)%></button>";
//                var cell3Data ='<select class="SELstd" id="SelectAction__'+idx1+'" label_value="<%=StringEscapeUtils.escapeHTML(action)%>" title="<%=StringEscapeUtils.escapeHTML(action)%>" name="<%=StringEscapeUtils.escapeHTML(action)%>" >';
//                var actions = parent.toBeRemindedArray[idx1][4].split("|");
//                for(var id =0;id < actions.length;id++)
//                {
//                var action = actions[id].split("!")[0];
//                var actionLabel = parent.getItemDesc(actions[id].split("!")[1]);
//                cell3Data +='<option value="'+action+'">'+actionLabel+'</option>';
//               // if(parent.toBeRemindedArray[idx1][5] != "NA")
//               // cell3Data +='<option value="RESETREMINDER"><%=StringEscapeUtils.escapeHTML(resetReminder)%></option>';
//                }
//                cell3Data +='</select>';
//                cell3.innerHTML = cell3Data;
//                rowElem.appendChild(cell3);
//                var cell4 = document.createElement("TD");
//                var cell4Data = "<button class=\"BTNtext\" id=\"BTNEscalateTask__"+idx1+"\" onclick=\"fnDoAction(event,'"+parent.toBeRemindedArray[idx1]+"')\"><%=StringEscapeUtils.escapeHTML(apply)%></button>";
//                cell4.innerHTML = cell4Data;
//                rowElem.appendChild(cell4);                
                /*parent.toBeRemindedArray.splice(idx1);*/
                
                var actions = parent.toBeRemindedArray[idx1][4].split("|");
                for(var id =0;id < actions.length;id++)
                {
                    if(alertActions.indexOf(actions[id].split("!")[0]) == -1)
                    {
                        var action = actions[id].split("!")[0];
                        var actionLabel = parent.getItemDesc(actions[id].split("!")[1]);
                        if(actionLabel!=undefined || actionLabel!="" || actionLabel!="null")
                        {
                            document.getElementById("Action").options[(document.getElementById("Action").options.length)] = new Option(actionLabel,action);
                            alertActions = alertActions + "~" + action;
                        }
                    }
                }
                 
                if(tableBody.rows.length > 0 ){
                    if(tableBody.rows.length == alertRowSize) {
                        if(deleteAlertRow == alertRowSize || (alertRowSize-deleteAlertRow) == 0) 
                            deleteAlertRow = 1;
                        if(tableBody.rows[alertRowSize-deleteAlertRow].cells[0].checked == true || tableBody.rows[alertRowSize-deleteAlertRow].cells[1].innerHTML == highPrior)
                            deleteAlertRow++;
                        tableBody.deleteRow(alertRowSize-deleteAlertRow);
                        setInnerText(document.getElementById("wndtitle").getElementsByTagName('h1')[0],alertMsgTitle+'('+alertRowSize+')');
                    }
                    tableBody.insertBefore(rowElem,tableBody.children[0]);
                }
                else
                    tableBody.appendChild(rowElem); 
            }
        }
        var maxHeight;
        var yIndex;
        var frameResizeIntervalId =null;
        function resize_iframe() {
            var iframeObj = parent.document.getElementById("ifr_ReminderAlertWin");
            iframeObj.style.height = document.getElementById("DIVif1").offsetHeight + "px" ;
            iframeObj.style.width = document.getElementById("DIVif1").offsetWidth+"px" ;
            //iframeObj.style.width =parent.document.getElementById("vTabCN_CENTRAL_PROCESS").offsetWidth+"px";
		document.getElementById("wndwidth").style.width =document.getElementById("DIVif1").offsetWidth -8 +"px";
            document.getElementById("wndtitle").style.width = document.getElementById("wndwidth").offsetWidth + "px";
            //document.getElementById("wndtitle").style.width =parent.document.getElementById("vTabCN_CENTRAL_PROCESS").offsetWidth+"px";
            iframeObj.title = getInnerText(document.getElementById("DIVif1").getElementsByTagName("H1")[0]);
            var alertWinObj = parent.document.getElementById("Div_ReminderAlertWin");
            //yIndex = parent.document.getElementById("masthead").offsetHeight + parent.document.getElementById("vtab").offsetHeight - alertWinObj.offsetHeight - 10;
            yIndex = parent.document.getElementById("masthead").offsetHeight + parent.document.getElementById("menuHeaderDiv").offsetHeight+ parent.document.getElementById("dashboard").offsetHeight - alertWinObj.offsetHeight - 10;
            maxHeight =alertWinObj.offsetHeight-4 ;
            //var scrnHeight = parent.document.getElementById("masthead").offsetHeight + parent.document.getElementById("vtab").offsetHeight;
            var scrnHeight = parent.document.getElementById("masthead").offsetHeight + parent.document.getElementById("menuHeaderDiv").offsetHeight+ parent.document.getElementById("dashboard").offsetHeight;
            alertWinObj.style.top = scrnHeight + "px";
            iframeObj.style.height = '1px';
            frameResizeIntervalId = setInterval(function(){sildeWindow()},1);
        }            
function closeAlerts(event) {
    window.frameElement.src = "";
    window.frameElement.height = 0;
    window.frameElement.width = 0;
    parent.document.getElementById("Div_ReminderAlertWin").children[0].src = "";
    parent.document.getElementById("Div_ReminderAlertWin").style.display = "none";
    parent.document.getElementById("Div_ReminderAlertWin").style.top = "";
    parent.document.getElementById("Div_ReminderAlertWin").style.left = "";
    parent.document.getElementById("ifr_ReminderAlertWin").style.width = "" ;
    parent.fnUpdateReminders=null;
}
var wfRefNo;

function fnAction(){
    var remarks = document.getElementById("BLK_ALERT__REMARKS").value;
    document.getElementById("BLK_ALERT__REMARKS").value = "";
    var action = document.getElementById("Action").value;
    var tableBody = document.getElementById("ALERTTBL").tBodies[0];
    var alertdetails = "";
    var tablerows = tableBody.rows.length;
    for (var idx=0; idx < tablerows; idx++)
    {
	if(tableBody.rows[idx].cells[0].getElementsByTagName("INPUT")[0].checked == true && tableBody.rows[idx].getAttribute("alertDtl").split(",")[4].indexOf(action) != -1)
	{
            alertdetails = alertdetails + "!!!" + tableBody.rows[idx].getAttribute("alertDtl");
        }
        else if(tableBody.rows[idx].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            tableBody.rows[idx].cells[5].getElementsByTagName("SPAN")[0].innerHTML = actionNotsup;
	}
    }
    alertdetails = alertdetails.substr(3,alertdetails.length);
    try {
    if (alertdetails != "")
    { 
        var fnEval = new Function("alertdetails","remarks","return fn"+action+"(alertdetails,remarks);");  
        if (!fnEval(alertdetails,remarks)) {
            return false;
        }
    }
    } catch (e) {}

}

function fnDoAction(evnt,details){
   // setNodeText(document.getElementById("wndtitle").getElementsByTagName('h1')[0],'<%=StringEscapeUtils.escapeHTML(title)%>');
    var event = window.event||evnt;
    var srcElem =getEventSourceElement(event);
    //var action = document.getElementById('SelectAction__'+srcElem.id.substr(srcElem.id.indexOf('__')+2)).value;
    var action =srcElem.parentElement.parentElement.cells[3].getElementsByTagName('select')[0].value;
    var actionList = details.split(",");
    actionList[4] = action;
    details = actionList.toString();
     var taskid = details.split(',')[3];
     var alertId = details.split(',')[7];
      var tempArr = new Array(); 
                        for(var j=0;j<parent.remindedArray.length;j++)
    
	{
                            if(taskid == 'NA')
		{
                                var uniqId = alertId;
                                var uniqIdx = 7;
					}
					else
					{
                                var uniqId = taskid;
                                var uniqIdx = 3;
                            }
                          if(parent.remindedArray[j][uniqIdx] != uniqId)
					{
                                tempArr[tempArr.length] = parent.remindedArray[j];
					}
					else
					{
                          var remCount = document.getElementById("ALERTTBL").tBodies[0].rows.length-1;
                           fnDeleteRow(srcElem);
                             document.getElementById("wndtitle").getElementsByTagName('h1')[0].innerHTML = 'Notifications ('+remCount+')';
                             // setNodeText(document.getElementById("wndtitle").getElementsByTagName('h1')[0],'Notifications ('+remCount+')');
					}
				}
                        parent.remindedArray =tempArr;
    try {
        var fnEval = new Function("evnt","details","return fn"+action+"(evnt,details);");  
        if (!fnEval(evnt,details)) {
            return false;
    }
    } catch (e) {}
}
function fnCloseReminder(processFlag, taskIdList,comments) {
	parent.unmask();
	var childDivObj = parent.document.getElementById("ChildWin");
	if (processFlag)
	{
		if (taskIdList != '')
		{
			var msg = '';
			var taskActionDOM = parent.fnDoAction(taskIdList, 'SET_REMINDER', comments);
			if (selectSingleNode(taskActionDOM, "//RESPONSE"))
			{
                        //        var tempArray=new Array();
                        //        tempArray[0] =wfRefNo;
                        //        tempArray[1] =comments.split('||')[1];
                        //        tempArray[2] =comments.split('||')[0].replace(/\s/g, '-').replace(/:/g,'-');
                        //        parent.reminderAlertArray[parent.reminderAlertArray.length] = tempArray;    
				parent.unmask();
                                parent.displayQueueTasks(parent.currentTaskTab);
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
                                parent.displayQueueTasks(parent.currentTaskTab);
			}
		}
	}
       if (navigator.userAgent.toLowerCase().indexOf("opera") != -1)
		childDivObj.parentNode.removeChild(childDivObj);
	else {
		childDivObj.getElementsByTagName("IFRAME")[0].src = "";
		parent.document.getElementById("Div_ChildWin").removeChild(childDivObj);
	}
}
function minimizeWiondow(screenId,event) {
    var reminderTitle = getInnerText(document.getElementById("wndtitle").getElementsByTagName('h1')[0]);
    mainWin.addTab(screenId, reminderTitle, event);
} 
function sildeWindow() {
    var alertWinObj = parent.document.getElementById("Div_ReminderAlertWin");
    var iframeObj = parent.document.getElementById("ifr_ReminderAlertWin");
    if(yIndex > alertWinObj.offsetTop){
         clearInterval(frameResizeIntervalId);
    }else {
        alertWinObj.style.top = alertWinObj.offsetTop-1 +'px';
        if(iframeObj.offsetHeight <= maxHeight )
            iframeObj.style.height = iframeObj.offsetHeight-3 +'px';
    }
} 
function startDrag(e) {
    var evt = window.event || e;
    var winObj = parent.document.getElementById("Div_ReminderAlertWin");
    winObj.style.cursor = "default";
    var x = evt.clientX;
    var y = evt.clientY;
    var initx = winObj.offsetLeft;
    var inity = winObj.offsetTop;
    document.onmousemove=function(e) {
        var evt = window.event || e;
        var ex = evt.clientX;
        var ey = evt.clientY;
        var dx = ex - x;
        var dy = ey - y;
        var ypos = inity + dy;
        var tBarHgt = 0;
        if(parent.document.getElementById("WNDtitlebar") != null) {
            tBarHgt = parent.document.getElementById("WNDtitlebar").offsetHeight * -1;
        } else if(typeof(mainWin) != "undefined" && mainWin.document.getElementById("masthead") != null) {
            tBarHgt = mainWin.document.getElementById("masthead").offsetHeight;
        }
        if(ypos > (tBarHgt + 4)) {
        winObj.style.left = initx + dx + "px";
            winObj.style.top = ypos + "px";
        initx = initx + dx;
            inity = ypos;
        } else {
            winObj.style.top = (tBarHgt + 4)+ "px";
            inity = tBarHgt + 4;
        }
    };
    document.onmouseup=function(event){
        winObj.style.border = "none";
        winObj.style.cusor = "default";
        document.onmousemove=null;
        document.onmouseup=null;
    }
}
function fnMaxandMin(scrheight,scrwidth,scrleft,scrtop,displayValue,subcolWidth,remcolWidth,failedcolWidth){
        var iframeObjBlow = parent.document.getElementById("ifr_ReminderAlertWin");
        iframeObjBlow.style.height = scrheight+"px";
        iframeObjBlow.style.width = scrwidth+"px";
        var winObj = parent.document.getElementById("Div_ReminderAlertWin");
        winObj.style.left = scrleft+"px";
        winObj.style.top = scrtop+"px";
        document.getElementById("WNDbutton").parentNode.parentNode.style.width = scrwidth+"px";
        document.getElementById("ALERTTBL").parentNode.parentNode.style.width = (scrwidth-15)+"px";
        document.getElementById("ALERTTBL").parentNode.style.height = (scrheight-75)+"px";
        document.getElementById("ALERTTBL").parentNode.style.width = (scrwidth-15)+"px";
        document.getElementById("ALERTTBL").rows[1].cells[3].setAttribute("width",subcolWidth+"%");
        document.getElementById("ALERTTBL").rows[1].cells[4].setAttribute("width",remcolWidth+"%");
        document.getElementById("ALERTTBL").rows[1].cells[5].setAttribute("width",failedcolWidth+"%");
        for(var id=1; id < document.getElementById("ALERTTBL").rows.length ; id++) {
                        document.getElementById("ALERTTBL").rows[id].cells[5].style.display = displayValue;
        }        
        
}
var resizeHeight = "";
var resizeWidth = "";
var resizeTop = "";
function fnBlowUP() {
            var iframeObjBlow = parent.document.getElementById("ifr_ReminderAlertWin");
            var winObj = parent.document.getElementById("Div_ReminderAlertWin");
            if(iframeObjBlow.style.width != ((parent.document.getElementById("vTabDB_DASHBOARD").scrollWidth)-10)+"px") {
            BlowUPOn = true;
                     resizeHeight = iframeObjBlow.style.height;
                     resizeWidth = iframeObjBlow.style.width;
                     resizeTop = winObj.style.top;
                fnMaxandMin(parent.document.getElementById("vTabDB_DASHBOARD").scrollHeight,(parent.document.getElementById("vTabDB_DASHBOARD").scrollWidth-10),parent.document.getElementById("vtab").offsetWidth+2,parent.document.getElementById("masthead").offsetHeight+2,"",20,40,20);
            }   
            else {
             BlowUPOn = false;
                fnMaxandMin(resizeHeight.replace("px",""),resizeWidth.replace("px",""),2,resizeTop.replace("px",""),"none",28,50,0);
            }            

}
function fnCheckFilter(){
    for(var id=2; id < document.getElementById("ALERTTBL").rows.length ; id++) {
        if(document.getElementById("ALERTTBL").rows[1].cells[0].getElementsByTagName('INPUT')[0].checked == true)
            document.getElementById("ALERTTBL").rows[id].cells[0].getElementsByTagName('INPUT')[0].checked = true;
        else
            document.getElementById("ALERTTBL").rows[id].cells[0].getElementsByTagName('INPUT')[0].checked = false;
        } 
}
function showFunctionId(funcId, taskId,workflowRefNo) {
    if (!parent.isSessionActive()) {
        return;
    }
    var uiname = "";
    if (parent.uiNames[funcId] != "" && typeof(parent.uiNames[funcId]) != "undefined") 
        uiname = parent.uiNames[funcId];

    parent.workflowRefNo = workflowRefNo;
    parent.status="ACQUIRED";
    if (parent.trim(taskId) == "") {
		showErrorAlerts('CS-AL-142',parent.UserId);
        return;
    }
    var timeStamp = parent.getDateObject();
    var inTime=(timeStamp.getHours()*(3600*1000))+(timeStamp.getMinutes()*(60*1000))+(timeStamp .getSeconds()*1000)+timeStamp.getMilliseconds();
	//Added for 14741894 --start
   var txnBranch = "";
    var newWin = parent.openWindow("testwin", "TempForward.jsp?action=SMSStartLogServlet&funcid=" + funcId + "&taskId=" + taskId + "&uiName=" + uiname + "&msgType=WORKFLOW&actionType=initiate" + "&timestamp=" + timeStamp.getTime() + "&inTime=" + inTime+"&txnBranch="+txnBranch);
}

function fnPostFocusMain(){
    parent.fnShowReminderAlert();
}
parent.fnUpdateReminders = fnBuildAlertHTML;
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    </head>
    <body onload="chkErr()" oncontextmenu="return false;" onkeydown="return disableCommonKeys(event);" onhelp="return false;">
        <div id="DIVif1" class="WNDcontainerModal">
            <DIV style="width: 560px;" class=WNDtitlebar id="wndtitle" onmousedown="startDrag(event)">
                <B class="BTNicon"><span class="ICOalert2"></span></B>	
                <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(title)%></h1>
                <div class="WNDbuttons">
               <a class="BTNIconRefresh" accesskey="7" id="WNDbutton" href="#"  title="<%=StringEscapeUtils.escapeHTML(labelRefresh)%>" onclick="parent.fnShowReminderAlert()">
                <span class="LBLinv"><%=StringEscapeUtils.escapeHTML(labelRefresh)%></span>
                </a>
                  <a class="WNDmin" accesskey="6" id ="BTN_EXIT" href="#" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="<%=StringEscapeUtils.escapeHTML(minimize)%>" onclick="if(this.disabled) return false; minimizeWiondow('Div_ReminderAlertWin', event)" >
                    <span class="LBLinv"><%=StringEscapeUtils.escapeHTML(minimize)%></span>
                  </a>    
                </div>
            </DIV>
            <DIV class="WNDcontentmodal" id="wndwidth">
		<DIV class="DIVtblbox1outer2">
                    <DIV id="tbl-container" class="DIVtblbox2">
                            <TABLE id="ALERTTBL" class="TBLtwo" border=0 cellSpacing=0 cellPadding=0 width="100%" summary="Override Messages">
                                <THEAD>
                                    <TR>
                                    <TH width="2%" scope=col><SPAN><button id="BlowUp" class="BTNimg" title="Blow UP" onclick="fnBlowUP()" tabindex="-1" name="BTN_SINGLE_VIEW_BLK_DOCTYPE_CHECKLIST"></button></SPAN></TH>
                                    </TR>
                                    <TR>
                                        <TH width="2%" scope=col><SPAN class=SPNtbltwoH><label for="CHKidHeader" class="LBLinv">Select All</label><input class='CHKStd' id='CHKidHeader' onclick='fnCheckFilter(event)' type='checkbox' value='on'/></SPAN></TH>
                                        <TH width="8%" scope=col><SPAN class=SPNtbltwoH><%=StringEscapeUtils.escapeHTML(lblPriority)%></SPAN></TH>
                                        <TH width="10%" scope=col><SPAN class=SPNtbltwoH><%=StringEscapeUtils.escapeHTML(updatedTime)%></SPAN></TH>
                                        <TH width="20%" scope=col><SPAN class=SPNtbltwoH><%=StringEscapeUtils.escapeHTML(applictionNo)%></SPAN></TH>
                                        <TH width="40%" scope=col><SPAN class=SPNtbltwoH><%=StringEscapeUtils.escapeHTML(Message)%></SPAN></TH>
                                        <TH width="20%" scope=col style="display:none"><SPAN class=SPNtbltwoH><%=StringEscapeUtils.escapeHTML(failedReason)%></SPAN></TH>
                                       <%-- <TH width="10%" scope=col><SPAN class=SPNtbltwoH><%=StringEscapeUtils.escapeHTML(action)%></SPAN></TH>
                                        <TH class="THLast" width="10%" scope=col><SPAN class=SPNtbltwoH><%=StringEscapeUtils.escapeHTML(apply)%></SPAN></TH>
                                        <TH width="30%" scope=col><SPAN class="SPNtbltwoH"><%=StringEscapeUtils.escapeHTML(applictionNo)%></SPAN></TH>
                                        <TH width="70%" scope=col class="THLast"><SPAN class="SPNtbltwoH"><%=StringEscapeUtils.escapeHTML(remarks)%></SPAN></TH>
                                        <TH class="THLast" width="15%" scope=col><SPAN class=SPNtbltwoH><%=StringEscapeUtils.escapeHTML(remarks)%></SPAN></TH> --%>
                                    </TR>
                                </THEAD>
                                <TBODY/>
                            </TABLE>
                    </DIV>
		</DIV>
                <div class="WNDfootermodal">
                    <div class="WNDfbuttons">
                        <table role="presentation" width="99%" border="0" cellspacing="0" cellpadding="0" id="AlertTAB_FOOTER">
                             <tbody>
                                 <tr>
                                   <td valign="top" width="98%"/>
                                    <!--<td style="padding-left:10px" nowrap="nowrap">
                                        <LABEL class="LBLstd" for=""><%=StringEscapeUtils.escapeHTML(remarks)%></label>
                                        </td>-->
                                    <td style="padding-left:10px" nowrap="nowrap">
                                        <TEXTAREA id="BLK_ALERT__REMARKS" class="TXAstd" rows="1" cols="35" label_value="" title=<%=StringEscapeUtils.escapeHTML(remarks)%> name="REMARKS" size="NaN" required="" aria-required="false" maxlength="255"></textarea>
                                    </td>    
                                   <td style="padding-left:10px" nowrap="nowrap">
                                    <select class="SELstd" id="Action" label_value="<%=StringEscapeUtils.escapeHTML(action)%>" title="<%=StringEscapeUtils.escapeHTML(action)%>" name="<%=StringEscapeUtils.escapeHTML(action)%>" ></select>
                                    </td>                                    
                                   <td style="padding-left:10px" nowrap="nowrap">
                                    <input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(applyToAll)%> id="BTN_OK" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="fnAction()"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(okLabel)%> type="button"/>
                                    </td>
                                 </tr>
                             </tbody>
                        </table>
                    </div>
                </div>
            </DIV>
        </div>
    </body>
</html>
