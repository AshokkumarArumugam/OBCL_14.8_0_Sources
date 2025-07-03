<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : WFReminder.jsp
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
-------------------------------------------------------------------------------------------------------- -
*/
%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals" %>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import = "java.util.Map" %>
<%@ page import = "java.util.Iterator" %>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.BranchConfig"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%
	/*JAN_CPU_BUG-25068346 Start-- */
    response.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 );
	/*JAN_CPU_BUG-25068346 End-- */
    request.setCharacterEncoding("UTF-8");              
    String jsParser     = (String)session.getAttribute("JS_PARSER");
    String strTheme     = (String)session.getAttribute("THEME");
    String StrIsoLang   = (String)session.getAttribute("LANGISOMAP");
    String browserCSS   = (String)session.getAttribute("BROWSER_CSS");
    String ieCss         = (String)session.getAttribute("IECSS");
    FCUserGlobals uc        = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
    String branchIdentifier = BranchConfig.getInstance().getConfigValue("BRANCH_CENTRALIZED");
    Map itemDescMap  = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+uc.getLangCd() + "~" + uc.getEntity(), branchIdentifier,uc.getCurrUser());
    
    String OkLabel              = (String)itemDescMap.get("LBL_OK");
    String enterTxnBranch       = (String)itemDescMap.get("LBL_ENTER_TXNBRANCH");
    String txnBranch            = (String)itemDescMap.get("LBL_TXN_BRANCH");      
    String branch               = (String)itemDescMap.get("LBL_BRANCH");   
    String imgPath              = "Images/"+strTheme.substring(0,strTheme.indexOf("."));
    String currBrn              = (String)request.getParameter("currBrn");
    String action               = (String)request.getParameter("action");
    String g_txnBranch          = (String)request.getParameter("g_txnBranch");
    String rowIndex             = (String)request.getParameter("rowIndex");
    String appDate              = (String)request.getParameter("appDate");
    String appFormatedDate              = (String)request.getParameter("appFormatedDate");
    String istxnBrn             = (String)request.getParameter("istxnBrn");
    String noScriptLabel        = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String mandatory            = (String)itemDescMap.get("LBL_INFRA_MANDATORY");
    String funcid               = (String)request.getParameter("funcid");
    String uiName               = (String)request.getParameter("uiName");
    String finalRights          = (String)request.getParameter("finalRights");
    String drillDownQry         = (String)request.getParameter("drillDownQry");
    String ExitLabel            = (String)itemDescMap.get("LBL_EXIT");
    String comments             = (String)itemDescMap.get("LBL_COMMENTS");
    String enterReasonCode      = (String)itemDescMap.get("LBL_ENTER_REASONCODE");
    String remarks              = (String)itemDescMap.get("LBL_REMARKS");
    String reason               = (String)itemDescMap.get("LBL_REASON");
    String reasonCode           = (String)itemDescMap.get("LBL_REASON_CODE");
    String taskReminder         = (String)itemDescMap.get("LBL_WF_REMINDER");
    String reminderDate         = (String)itemDescMap.get("LBL_REMINDER_DATE");
    String reminderTime         = (String)itemDescMap.get("LBL_REMINDER_TIME");
    String reminderNote         = (String)itemDescMap.get("LBL_REMINDER_NOTE");
    String date                 = (String)itemDescMap.get("LBL_DATE");
    String seconds              = (String)itemDescMap.get("LBL_SECS");
    String minutes              = (String)itemDescMap.get("LBL_MINS");
    String hours                = (String)itemDescMap.get("LBL_HRS");
//12.1 Retro_Changes starts
    String time                = (String)itemDescMap.get("LBL_TIME");    
    String forwardTo                = (String)itemDescMap.get("LBL_FORWARD_TO");
    String isFromAlert             = (String)request.getParameter("isFromAlert");
    String taskIdList             = (String)request.getParameter("taskIdList");
    String alertId             = (String)request.getParameter("alertId");
    String actionTaken             = (String)request.getParameter("actionTaken");
     String alertSrc             = (String)request.getParameter("alertSrc");
	 String forwardorReset         = (String)itemDescMap.get("LBL_WF_FORWARD"); 
	 String screenTitle = "";
	 if(isFromAlert!=null && "true".equals(isFromAlert))
	 {
		screenTitle = forwardorReset;
	 }
	 else
	 {
		screenTitle = taskReminder;
	 }
//12.1 Retro_Changes ends
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<HTML lang="<%=StringEscapeUtils.escapeHTML(StrIsoLang)%>">
    <HEAD>
        <TITLE><%=StringEscapeUtils.escapeHTML(screenTitle)%></TITLE>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
       <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrIsoLang)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
       <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrIsoLang)%>.css" rel="stylesheet" type="text/css"/>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>--> 
        <!--HTML5 Changes Start-->
        <!--
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
          <script type="text/javascript" src="Script/JS/WFReminderUtils.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript">
            var alertAction         = "";
            var mainWin = parent.mainWin;
            var retVal = new Array();
            var multipleEntryIDs = new Array();
            var functionId = 'COMMON';
            //var retflds = new Array();
            var lovInfoFlds = {};/*12.0.4 UI performance changes */
            var enterTxnBranch      = '<%=StringEscapeUtils.escapeJavaScript(enterTxnBranch)%>';
            var txnBranch           = '<%=StringEscapeUtils.escapeJavaScript(txnBranch)%>';
            var branch              = '<%=StringEscapeUtils.escapeJavaScript(branch)%>';
            var istxnBrn            = true;
            var strTheme            = '<%=StringEscapeUtils.escapeJavaScript(strTheme)%>';
            var funcid              = '<%=StringEscapeUtils.escapeJavaScript(funcid)%>';
            var uiName              = '<%=StringEscapeUtils.escapeJavaScript(uiName)%>';
            var finalRights         = '<%=StringEscapeUtils.escapeJavaScript(finalRights)%>';
            var drillDownQry        = '<%=StringEscapeUtils.escapeJavaScript(drillDownQry)%>';
            var brnidentifier       = '<%=StringEscapeUtils.escapeJavaScript(branchIdentifier)%>';
            var action              = '<%=StringEscapeUtils.escapeJavaScript(action)%>';
            var reason              = '<%=StringEscapeUtils.escapeJavaScript(reason)%>';
            var comments            = '<%=StringEscapeUtils.escapeJavaScript(comments)%>';
            var reasonCode          = '<%=StringEscapeUtils.escapeJavaScript(reasonCode)%>';
            var enterReasonCode     = '<%=StringEscapeUtils.escapeJavaScript(enterReasonCode)%>';
            var g_txnBranch         = '<%=StringEscapeUtils.escapeJavaScript(g_txnBranch)%>';
            var rowIndex            = '<%=StringEscapeUtils.escapeJavaScript(rowIndex)%>';
            var appDate             = '<%=StringEscapeUtils.escapeJavaScript(appDate)%>';
            var taskReminder        = '<%=StringEscapeUtils.escapeJavaScript(taskReminder)%>';
            var reminderDate        = '<%=StringEscapeUtils.escapeJavaScript(reminderDate)%>';
            var reminderTime        = '<%=StringEscapeUtils.escapeJavaScript(reminderTime)%>';
            var reminderNote        = '<%=StringEscapeUtils.escapeJavaScript(reminderNote)%>';
            var date                = '<%=StringEscapeUtils.escapeJavaScript(date)%>';
            var seconds             = '<%=StringEscapeUtils.escapeJavaScript(seconds)%>';
            var minutes             = '<%=StringEscapeUtils.escapeJavaScript(minutes)%>';
            var hours               = '<%=StringEscapeUtils.escapeJavaScript(hours)%>';
//12.1 Retro_Changes starts
             var alertId               = '<%=StringEscapeUtils.escapeJavaScript(alertId)%>';
             var taskIdList =  '<%=StringEscapeUtils.escapeJavaScript(taskIdList)%>';
             var actionTaken =  '<%=StringEscapeUtils.escapeJavaScript(actionTaken)%>';
             var alertSrc            =  '<%=StringEscapeUtils.escapeJavaScript(alertSrc)%>';
//12.1 Retro_Changes ends
            var gCalBtn;
            var gCalDSODate;
            var iframeHgt           = '';
            var iframeWth           = '';
            
            if(typeof(parent.fromSubScr) == 'undefined') {
                parentScrID = parent.seqNo;
            }
            try{
            var scrDIVHeight    = parent.parent.document.getElementById(parentScrID).clientHeight;
            }catch(e){}
        
        </script> 
        <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    </HEAD>
    <BODY class="BODYform" onload="fnCalcWindowSize();" onkeydown="return fnWindowKeyAccess(event);">
        <div id="DIVif1" class="WNDcontainer">
            <DIV class=WNDtitlebar id="WNDtitlebar" onmousedown="startDrag('ChildWin', event)">
                <div class="WNDtitle" id="wndtitle">
                    <B class="BTNicon">
                        <span class="ICOflexcube"></span>
                    </B>
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(screenTitle)%>&nbsp;</h1>
                </div>
            </DIV>
           
            <DIV id='reminder' class='TwoColSectionContainer'>
		<div class="DIVColumnDouble">
			<fieldset class="FSTstd" block="BLK_REMINDER" type="SE" view="SE"><LEGEND></LEGEND>
				<div class="DIVText" >
		                        <LABEL class="LBLstd" for=""><%=StringEscapeUtils.escapeHTML(date)%></label>
		                        <INPUT onpropertychange=displayDate(this) NAME=REMINDER_DATE class="TXTstd" ID="REMINDER_DATE" title="<%=StringEscapeUtils.escapeHTML(date)%>" SIZE="15" MAXLENGTH="10" TYPE=hidden VALUE=<%=StringEscapeUtils.escapeHTML(appDate)%>>
					<INPUT onblur=validateInputDate('REMINDER_DATE',event) NAME=REMINDER_DATEI class="TXTro" ID=REMINDER_DATEI title="<%=StringEscapeUtils.escapeHTML(date)%>" SIZE="15" MAXLENGTH="10" onfocus="fnRecalcWindowSize();" READONLY=\'readonly\' VALUE=<%=StringEscapeUtils.escapeHTML(appFormatedDate)%>>
		                        <BUTTON class="BTNimg" tabindex="-1" id='btnCalendar' onclick="fnDispCalendar(event)" onFocus="this.className='BTNimgH'" onMouseOver="this.className='BTNimgH'" onMouseOut="this.className='BTNimg'" onBlur="this.className='BTNimg'">
		                        <SPAN class="ICOcalendar" tabIndex=-1><span class="LBLinv"><%=StringEscapeUtils.escapeHTML(reminderDate)%></span></SPAN></BUTTON>
		                        <br/>
		                </div>
		                <div class="DIVText" >
		                        <LABEL class="LBLstd" for=""><%=StringEscapeUtils.escapeHTML(time)%></label>
		                        <INPUT class="TXTstd" title="<%=StringEscapeUtils.escapeHTML(hours)%>" ID="REMINDER_HRS" NAME="REMINDER_HRS" SIZE="2" MAXLENGTH="2" TYPE='number' VALUE='00'>
		                        <INPUT class="TXTstd" title="<%=StringEscapeUtils.escapeHTML(minutes)%>" ID="REMINDER_MINS" NAME="REMINDER_MINS" SIZE="2" MAXLENGTH="2" TYPE='number' VALUE='00'>
		                        <INPUT class="TXTstd" title="<%=StringEscapeUtils.escapeHTML(seconds)%>" ID="REMINDER_SECS" NAME="REMINDER_SECS" SIZE="2" MAXLENGTH="2" TYPE='number' VALUE='00'>
		                        <br/>
				</div>
				<br/>
                                <% if ("FORWARD".equalsIgnoreCase(actionTaken)) {%>
				<div class="DIVText">
		                        <label class="LBLstd" for=""><%=StringEscapeUtils.escapeHTML(forwardTo)%></label>
		                        <input id ='FWD_USER_ID' class="TXTstd" title="<%=StringEscapeUtils.escapeHTML(forwardTo)%>" NAME="FWD_USER_ID" SIZE="15" MAXLENGTH="11" onkeydown='if(event.keyCode == 115) return fnLaunchLov(event);'><BUTTON class="BTNimg" tabindex="-1" id='btnUserBranches' onclick="disp_lov('COMMON','BLK_REMINDER','FWD_USER_ID','','LOV_FORWARD_TO', '', '', '', '', event)" onFocus="this.className='BTNimgH'" onMouseOver="this.className='BTNimgH'" onMouseOut="this.className='BTNimg'" onBlur="this.className='BTNimg'" >
		                        <SPAN class="ICOlov" tabIndex=-1><span class="LBLinv">Forward to</span></SPAN></BUTTON>
				</div>
                                <% } else { %>
                                    <br/>
                                <% } %>
                                <br/>
                                <% 
                                if(isFromAlert!=null && "false".equals(isFromAlert)) { 
                                %>
				<div class="DIVText">
		                        <LABEL class="LBLstd" for=""><%=StringEscapeUtils.escapeHTML(remarks)%></label>
					<TEXTAREA id="BLK_REMINDER__REMARKS" class="TXAstd" rows="4" cols="22" label_value="" title=<%=StringEscapeUtils.escapeHTML(remarks)%> name="REMARKS" size="NaN" required="" aria-required="false" maxlength="255"></textarea>
				</div>
                                <% } else { %>
                                    <br/>
                                    <br/>
                                <% } %>
                    		<div class="DIVText" ><label class="LBLstd" for="confnew">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><img src="Images/star_disabled.gif" class="RequiredField" title="" ALT="">
                        		<BUTTON onblur='this.className="BTNfooter"' id=BTN_OK class=BTNfooterH onfocus='this.className="BTNfooterH"' onmouseover='this.className="BTNfooterH"' onmouseout='this.className="BTNfooter"' onClick="fnValidateReminder()" onkeydown="return fnWindowKeyAccess(event);" name='OK'><%=StringEscapeUtils.escapeHTML(OkLabel)%></BUTTON>
                        		<BUTTON onblur='this.className="BTNfooter"' id=BTN_EXIT class=BTNfooterH onfocus='this.className="BTNfooterH"' onmouseover='this.className="BTNfooterH"' onmouseout='this.className="BTNfooter"' onClick="fnCloseWindow()" name='EXIT'><%=StringEscapeUtils.escapeHTML(ExitLabel)%></BUTTON>
                    		</div>
			</fieldset>
		</div>
                 
                 <script type="text/javascript">
                        function fnValidateReminder() {
                            if (document.getElementsByName("REMINDER_HRS")[0].value == "")
                            	document.getElementsByName("REMINDER_HRS")[0].value = "00";
                            if (document.getElementsByName("REMINDER_MINS")[0].value == "")
                            	document.getElementsByName("REMINDER_MINS")[0].value = "00";
                            if (document.getElementsByName("REMINDER_SECS")[0].value == "")
                            	document.getElementsByName("REMINDER_SECS")[0].value = "00";
                            if (parseInt(document.getElementsByName("REMINDER_HRS")[0].value) != document.getElementsByName("REMINDER_HRS")[0].value ||
                                parseInt(document.getElementsByName("REMINDER_MINS")[0].value) != document.getElementsByName("REMINDER_MINS")[0].value ||
                                parseInt(document.getElementsByName("REMINDER_SECS")[0].value) != document.getElementsByName("REMINDER_SECS")[0].value)
                            {
                                document.getElementsByName("REMINDER_HRS")[0].value = "00";
                                document.getElementsByName("REMINDER_MINS")[0].value = "00";
                                document.getElementsByName("REMINDER_SECS")[0].value = "00";
                            	return true;
                            }
                            if ((document.getElementsByName("REMINDER_HRS")[0].value > 23) ||
                                (document.getElementsByName("REMINDER_HRS")[0].value < 0) ||
                                (document.getElementsByName("REMINDER_MINS")[0].value > 59) ||
                                (document.getElementsByName("REMINDER_MINS")[0].value < 0) ||
                                (document.getElementsByName("REMINDER_SECS")[0].value > 59) ||
                                (document.getElementsByName("REMINDER_SECS")[0].value < 0))
                            {
                                document.getElementsByName("REMINDER_HRS")[0].value = "00";
                                document.getElementsByName("REMINDER_MINS")[0].value = "00";
                                document.getElementsByName("REMINDER_SECS")[0].value = "00";
                            	return true;
                            }
                            var ntime = document.getElementsByName("REMINDER_HRS")[0].value+":";
                            ntime+=document.getElementsByName("REMINDER_MINS")[0].value+":";
                            ntime+=document.getElementsByName("REMINDER_SECS")[0].value;
                            var ndate = document.getElementById("REMINDER_DATE").value;                            
                            <% 
                            if(isFromAlert!=null && "true".equals(isFromAlert))
                            { 
                            %>
                            	var tasks = taskIdList.split("~");
                                var alertIds = alertId.split("~");
                                var alertSource = alertSrc.split("~");
                                var alertIdList = "";
                                var alertSrcList = "";
                                var taskIdsList = "";
                                var resetDate = "";
                                var forwardUserId = "";
                                for(var idx=0; idx < tasks.length; idx++)
                                {
                                        if(tasks[idx] == "NA")
                                        {
                                                alertIdList = alertIds[idx] + "~" + alertIdList;
                                                alertSrcList = alertSource[idx] + "~" + alertSrcList;
                                        }
                            else
                            {
                                          parent.comments = document.getElementsByName("REMINDER_DATE")[0].value.toUpperCase() +" "+ document.getElementsByName("REMINDER_HRS")[0].value +":"+ document.getElementsByName("REMINDER_MINS")[0].value +":"+ document.getElementsByName("REMINDER_SECS")[0].value;
                                          //parent.fnCloseReminder(true, rowIndex, tasks[idx]);
                                          if(taskIdsList == "")
                                            taskIdsList =tasks[idx];
                                          else
                                            taskIdsList = taskIdsList+ "~" +tasks[idx];
                                        }
                                }
                            resetDate = ndate + " "+ ntime;
                                <%
                            if("FORWARD".equalsIgnoreCase(actionTaken))  {
                                 %>
                                forwardUserId = document.getElementsByName("FWD_USER_ID")[0].value;
                                <% }%>
                            //alertSrcList = alertSrcList.substr(1,alertSrcList.length);
                            //alertIdList = alertIdList.substr(1,alertIdList.length);
                             try {
                                    if(alertIdList != "") 
                                    buildAlertRequest(resetDate,forwardUserId,alertIdList,alertSrcList,actionTaken);
                                    if( taskIdList != ""){
                                        parent.comments = parent.comments +"||"+parent.alertComments;
                                        parent.fnCloseReminder(true, "",taskIdsList);
                                    }
                            } catch(e) {
                                fnCloseWindow();
                                return false;
                            }
                            <% }else { %>
                            parent.comments = document.getElementsByName("REMINDER_DATE")[0].value.toUpperCase() +" "+ document.getElementsByName("REMINDER_HRS")[0].value +":"+ document.getElementsByName("REMINDER_MINS")[0].value +":"+ document.getElementsByName("REMINDER_SECS")[0].value +"||"+ document.getElementsByName("REMARKS")[0].value;
                                        parent.fnCloseReminder(true, rowIndex, "TASK");
                            <% } %>
                            fnCloseWindow();
                            return true;
                        }
                        function fnResetReminder(pDate, param) {
                            var taskRequestXml = "<TaskRequest OP = 'UPDATECALENDARTASKS'>";
                            taskRequestXml += "<CalendarDate>" +pDate.substring(0,4)+pDate.substring(5,7)+pDate.substring(8,10)+ "</CalendarDate>";
                            taskRequestXml += "<DayNotes>" +param+ "</DayNotes>";
                            taskRequestXml += "</TaskRequest>";
                        try {
                            tasksDom = parent.getTasksDom(taskRequestXml, "ALL");
                        } catch(e) {
                            fnCloseAlert();
                            return false;
                        }
                    /*	if (selectNodes(tasksDom, "//RESPONSE").length == 1) {
                    //calTaskList = selectSingleNode(tasksDom,"//RESPONSE").firstChild.xml;
                    calTaskList = getXMLString(selectSingleNode(tasksDom,"//RESPONSE"));
                        gNoteTasksArr = calTaskList.split("#");
                    } */
                     parent.fnCloseReminder(false, 0)
                            return true;
                        }
                        
                        function fnCloseWindow() {
                            parent.fnCloseReminder(false, rowIndex);
                        }
                        
			function fnCalcWindowSize() {
				fnInitializeVars();
				fnRecalcWindowSize();
			}
			
			function fnInitializeVars() {
                            iframeHgt = document.getElementById("DIVif1").offsetHeight;
                            iframeWth = document.getElementById("DIVif1").offsetHeight + 150;
			}
			
                        function fnRecalcWindowSize() {
                            var iframeObj = parent.document.getElementById("ChildWin");
                            iframeObj.style.height = iframeHgt + "px";
                            iframeObj.style.width = (iframeWth) + "px";
                            document.getElementById("WNDtitlebar").style.width = (iframeWth) + "px";
                            iframeObj.children[0].style.height = iframeObj.style.height;
                            iframeObj.children[0].style.width = iframeObj.style.width;
                            parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("wndtitle").getElementsByTagName("H1")[0]);
                            iframeObj.style.top = "0px";
                            parent.document.getElementById("ChildWin").style.left = "4px";
                            parent.mask();
                            document.getElementsByName("REMINDER_DATEI")[0].focus();
                        }
                        var calendarHeightset = false;
                        function fnAccomodateCalendarHgt() {
                            parent.parent.document.getElementById("ChildWin").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 3 + "px";
                            parent.parent.document.getElementById("ChildWin").children[0].style.height = parent.document.getElementById("ChildWin").children[0].offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 3 + "px";
                            parent.parent.document.getElementById("ChildWin").style.width = parent.document.getElementById("ChildWin").offsetWidth + 10 + "px";
                            parent.parent.document.getElementById("ChildWin").children[0].style.width = parent.document.getElementById("ChildWin").children[0].offsetWidth + 10 + "px";
                            document.getElementById("WNDtitlebar").style.width = parent.document.getElementById("ChildWin").offsetWidth + 40 + "px";
                            parent.document.getElementById("ChildWin").style.top = "0px";
                            parent.document.getElementById("ChildWin").style.left = "4px";
                        }
                         
                        function startDrag(target, e) {
                            var evt = window.event || e;
                            var divObj = parent.document.getElementById(target);
                            if (parent.document.getElementById("ChildWin")) {
                            } else {
                                mainWin.setActiveWindow(divObj, window);
                            }
                        
                            divObj.style.cursor = "default";
                            var x = evt.clientX;
                            var y = evt.clientY;
                            var initx = divObj.offsetLeft;
                            var inity = divObj.offsetTop;
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
                                } else if(typeof(mainWin) != "undefined") {
                                    tBarHgt = mainWin.document.getElementById("masthead").offsetHeight;
                                }
                                if(ypos > (tBarHgt + 4)) {
                                divObj.style.left = initx + dx + "px";
                                divObj.style.top = inity + dy + "px";
                                initx = initx + dx;
                                inity = inity + dy;
                                } else {
                                    divObj.style.top = (tBarHgt + 4)+ "px";
                                    inity = tBarHgt + 4;
                                }
                            };
                            document.onmouseup=function(event){
                                divObj.style.cusor = "default";
                                document.onmousemove=null;
                                document.onmouseup=null;
                            }
                        }
                        
                        function fnCloseAlertWin(e) {
                            var event = window.event||e;
                            if(alertAction == "SELECTRSN") {
                                unmask();
                                document.getElementsByName("REMINDER_DATEI")[0].focus();
                                event.returnValue = false;
                            }
                        }
                        
                        function fnDispCalendar(e) {
				var event = window.event||e;
				var dlgArg = new Object();
				parent.mainWin = mainWin;
				dlgArg.mainWin = parent;
				gCalDSODate = null;
				gCalBtn = null;
				var idDate = 'REMINDER_DATE';
				var currUser = parent.UserId;
				gCalBtn = getEventSourceElement(event);
				gCalDSODate = getInpElem(gCalBtn.parentNode.parentNode, idDate);
				if (gCalBtn.parentNode.tagName.toUpperCase() == "NOBR" || gCalBtn.parentNode.tagName.toUpperCase() == "DIV") 
					getInpElem(gCalBtn.parentNode.parentNode.parentNode, idDate);
				else gCalDSODate = getInpElem(gCalBtn.parentNode.parentNode, idDate);
				var calString;
				var processDate = "";
				var dlgLeft = 400;
				var dlgTop = window.screenTop;
				var currentBranch = parent.CurrentBranch;
				var date = parent.AppDate;
				var nCurrYear = null;
				var nCurrMonth = null;
				
				if (gCalDSODate && gCalDSODate != '' && gCalDSODate.value && (gCalDSODate.value != ''))
				{
					var curDate = gCalDSODate.value;
					if (gDateFormatDSO == "yyyy-MM-dd")
					{
						nCurrYear = curDate.substr(0, 4);
						nCurrMonth = curDate.substr(5, 2);
						if (nCurrMonth.length > 1 && nCurrMonth.substr(0, 1) == '0')
							nCurrMonth = nCurrMonth.substr(1, 1);
					} else
					{
						nCurrYear = curDate.substr(0, 4);
						nCurrMonth = curDate.substr(4, 2);
						if (nCurrMonth.length > 1 && nCurrMonth.substr(0, 1) == '0') 
							nCurrMonth = nCurrMonth.substr(1, 1);
					}
				} else
				{
					var l_date = date.split("-");
					nCurrYear = l_date[0];
					if (parseInt(nCurrYear) < 1000) parseInt(nCurrYear) += 1900;
						nCurrMonth = l_date[1];
					if (nCurrMonth.length > 1 && nCurrMonth.substr(0, 1) == '0')
						nCurrMonth = nCurrMonth.substr(1, 1);
				}
				var l_Params = "&Year=" + nCurrYear;
				l_Params  += "&Month=" + nCurrMonth;
				l_Params  += "&Brn=" + currentBranch;
				l_Params  += "&currUser=" + currUser;
				l_Params  += "&txnBranch=" + g_txnBranch;
				l_Params  += "&txnBranchDate=" +date;
                                if(!calendarHeightset) {
				fnAccomodateCalendarHgt();
                                    calendarHeightset = true;
                                }
				mask();
				loadSubScreenDIV("ChildWin", "ExtCalendar.jsp?"+l_Params);
			}
					
                        function fnWindowKeyAccess(evnt) {
                            var evnt = window.event || evnt;
                            var srcElement = getEventSourceElement(evnt);
                            if (evnt.keyCode == 27) {
                                fnCloseWindow();
                                return;
                            }                            
                            if(evnt.keyCode == 9 && evnt.shiftKey) {
                              document.getElementById("BTN_OK").focus(); 
                            }
                            if(evnt.keyCode == 8){
                                if(srcElement.tagName.toUpperCase() == 'INPUT'){
                                    return true;
                                }else{
                                    fnDisableBrowserKey(evnt);
                                    preventpropagate(evnt);
                                    try {
                                        evnt.keyCode = 0;
                                    } catch(e) {}
                                    return false;
                                }
                            }
                            return true;
                        }
                 </script>
                 <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
            </DIV>
        </div>    
        <div id="masker" class="masker" style="display:none">
            <div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none"><!--HTML5 Changes-->
                <iframe id="ifr_AlertWin" class="frames" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
            <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
            </div>
        </div>
    </BODY>
</HTML>