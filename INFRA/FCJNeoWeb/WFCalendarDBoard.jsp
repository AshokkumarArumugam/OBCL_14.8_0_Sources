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
--------------------------------------------------------------------------------------------------------- -
*/%>
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
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String strTheme         = (String)session.getAttribute("THEME");
    String StrIsoLang       = (String)session.getAttribute("LANGISOMAP");
    String browserCSS       = (String)session.getAttribute("BROWSER_CSS");
    String ieCss            = (String)session.getAttribute("IECSS");
    FCUserGlobals uc        = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
    String branchIdentifier = BranchConfig.getInstance().getConfigValue("BRANCH_CENTRALIZED");
    Map itemDescMap         = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+uc.getLangCd() + "~" + uc.getEntity(), branchIdentifier,uc.getCurrUser());
    
    String calenderDashBoard     = (String)itemDescMap.get("LBL_DASH_CALENDER");
    String winId            = FCUtility.validateParameter((String)request.getParameter("winId"));
    String txnBranch        = FCUtility.validateParameter((String)request.getParameter("txnBranch"));
    String txnBranchDate    = FCUtility.validateParameter((String)request.getParameter("txnBranchDate"));
    String branch           = (String)itemDescMap.get("LBL_BRANCH");   
    String action           = FCUtility.validateParameter((String)request.getParameter("action"));
    String g_txnBranch      = FCUtility.validateParameter((String)request.getParameter("g_txnBranch"));
    String noScriptLabel    = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String funcid           = FCUtility.validateParameter((String)request.getParameter("funcid"));
    String month            = FCUtility.validateParameter((String)request.getParameter("month"));
    String year             = FCUtility.validateParameter((String)request.getParameter("year"));
    String day              = FCUtility.validateParameter((String)request.getParameter("day"));
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes

    
%>
<HTML lang="<%=StringEscapeUtils.escapeHTML(StrIsoLang)%>">
    <HEAD>
        <TITLE><%=StringEscapeUtils.escapeHTML(calenderDashBoard)%></TITLE>
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
        <script type="text/javascript">
            var mainWin  = parent.mainWin;
        </script>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/Alert.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
	<script type="text/javascript" src="Script/JS/WFCalendarUtils.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/Util.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/SmmsgBox.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript">
            var alertAction         = "";
            var mainWin             = parent.mainWin;
            var retVal              = new Array();
            var multipleEntryIDs    = new Array();
            var retflds             = new Array();
            var taskReminder        = '<%=StringEscapeUtils.escapeJavaScript(calenderDashBoard)%>';
            var winId               = '<%=StringEscapeUtils.escapeJavaScript(winId)%>';
            var branch              = '<%=StringEscapeUtils.escapeJavaScript(branch)%>';
            var strTheme            = '<%=StringEscapeUtils.escapeJavaScript(strTheme)%>';
            var brnidentifier       = '<%=StringEscapeUtils.escapeJavaScript(branchIdentifier)%>';
            var action              = '<%=StringEscapeUtils.escapeJavaScript(action)%>';
            var g_txnBranch         = '<%=StringEscapeUtils.escapeJavaScript(g_txnBranch)%>';
            var year                = '<%=StringEscapeUtils.escapeJavaScript(year)%>';
            var month               = '<%=StringEscapeUtils.escapeJavaScript(month)%>';
            var day                 = '<%=StringEscapeUtils.escapeJavaScript(day)%>';
            var functionId          = 'COMMON';
            var txnBranch           = '<%=StringEscapeUtils.escapeJavaScript(txnBranch)%>';
            var txnBranchDate       = '<%=StringEscapeUtils.escapeJavaScript(txnBranchDate)%>';
            var td7Days = "";
            var td7DaysL = "";
            var holidays = "";
            var nCurrentDay = 0;
            var parentDsoDt = parent.gCalDSODate;
            var parentBtnDt = parent.gCalBtn;
            var parentDateFormatDSO = parent.gDateFormatDSO;

            getDayString();
        </script> 
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    </HEAD>
    <BODY onload=" fnCalcHgtCalendarDBoard('<%=StringEscapeUtils.escapeHTML(winId)%>');getHolidayList('D', day);" class="BDYform">
        <div id="Div_ChildWin" class="WNDcontainer">
            <DIV class="WNDcontentmodal" id="DIVScrContainer" >
                <table id="tblDays" class="TBLcal" summary="<%=StringEscapeUtils.escapeHTML(month)%>" border="0" cellpadding="0" cellspacing="0">
                    <colgroup span="7"></colgroup>
                    <thead>
                        <tr>
				<td colspan="13">
					<input type="Hidden" name="X-CSRFTOKEN" value="B58D78EE8EAB914973F8030FD2906A52610E45CD945603AC9D3FE7B914A2091E"></input>
					<div class="DIVcal" style="width:99%;">  
						<center><BUTTON CLASS='BTNtext'  title="Selected"  style='width:50%' id=gotoYY></center>
					</div>
				</td>
                        </tr>
                        <tr>
                            <%for(int thDays=0;thDays<7;thDays++){%>
                                <th CLASS='THcal' scope="col" abbr="gShortDayValues['<%=thDays%>']" style="width:135px; height:20px"  >&nbsp;<script>document.write(gLongDayValues['<%=thDays%>'])</script>&nbsp;<noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript></th>
                            <%}%>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                                <th CLASS='WNDcontainerModal' scope="col" abbr="" style="height:2px"  ><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript></th>
                        </tr>
                        <tr>
                            <%for(int thDays=0;thDays<7;thDays++){%>
                                <th CLASS='TDblank' scope="col" id="CalHeader_<%=thDays+1%>" abbr="" onmouseover=fnMouseOverDBCal(this) onmouseout=fnMouseOutDBCal(this) onmousedown=fnMouseDownCal(this) style="width:135px; height:2%"  ><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript></th>
                            <%}%>
                        </tr>
                        <tr>
                            <%for(int thDays=0;thDays<7;thDays++){%>
                                <th CLASS='TDblank' scope="col" id="CalBody_<%=thDays+1%>" abbr="" onmouseover=fnMouseOverCalTail(this) onmouseout=fnMouseOutCalTail(this) onmousedown=fnMouseDownCal(this) style="width:135px; height:13%"  ><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript></th>
                            <%}%>
                        </tr>
                        <%for(int trDays=0;trDays<5;trDays++){%>
                        <tr>
                                <th CLASS='WNDcontainerModal' scope="col" abbr="" style="height:2px"  ><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript></th>
                        </tr>
                        <tr>
                            <%for(int thDays=0;thDays<7;thDays++){%>
                                <th CLASS='TDblank' scope="col" abbr="" id="CalHeader_<%=((trDays+1)*7)+thDays+1%>" onmouseover=fnMouseOverDBCal(this) onmouseout=fnMouseOutDBCal(this) onmousedown=fnMouseDownCal(this) style="width:135px; height:2%"  ><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript></th>
                            <%}%>
                        </tr>
                        <tr>
                            <%for(int thDays=0;thDays<7;thDays++){%>
                                <th CLASS='TDblank' scope="col" id="CalBody_<%=((trDays+1)*7)+thDays+1%>" abbr="" onmouseover=fnMouseOverCalTail(this) onmouseout=fnMouseOutCalTail(this) onmousedown=fnMouseDownCal(this) style="width:135px; height:13%"  ><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript></th>
                            <%}%>
                        </tr>
                        <%}%> 
                    </tbody>
                </table>
            </DIV>
        </div>    
    </BODY>
</HTML>