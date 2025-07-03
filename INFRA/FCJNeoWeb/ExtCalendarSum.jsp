<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtCalendar.jsp
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

**	Modified By   : Shishirkumar Aithal
** 	Modified on   : 14/12/2016
** 	Description   : Commented the 25153773 Changes
** 	Search String : Bug No 25153773 Changes
**
**
**  Modified By          : Shishirkumar Aithal
**  Modified On          : 03-04-2017
**  Modified Reason      : LOV MUST DISPLAY SYSTEM DATE AS DEFAULT. 
**  Search String        : //Bug No 25817688 Changes 
**
**
**  Modified By          : Shishirkumar Aithal
**  Modified On          : 15-04-2017
**  Modified Reason      : LIDGCLM - DEFAULT DATE FROM CLAIM LODGEMENT DATE IS NOT IN SYNC WITH BRANCH DATE for LC  
**  Search String        : //Bug No 25828792 Changes
-------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.utility.FCEMSUtil"%> <!--Bug No 25153773 Changes--> <!--Bug No 25817688 Changes-->
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%> <!--Bug No 25153773 Changes--> <!--Bug No 25817688 Changes-->
<%@ page import = "java.sql.Date"%>     <!--Bug No 25153773 Changes--> <!--Bug No 25817688 Changes-->
<%

    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String Strlang         = (String)session.getAttribute("LANG");
    String StrlangISOMap   = (String)session.getAttribute("LANGISOMAP");
    String StrUserId       = (String) session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String strTheme     = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    boolean isDebug         = ((Boolean) session.getAttribute("isDebug")).booleanValue();
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/

    String imgPath = "Images/"+strTheme.substring(0,strTheme.indexOf(".")); //Fix for Bug 16354738 - removed extra slash character from imgPath
    String ieCss         = (String)session.getAttribute("IECSS");
    
    FBContext fbContext = new FBContext(StrUserId);
    BranchLogger brnLogger = new BranchLogger(StrUserId);
    fbContext.setBrnLogger(brnLogger);
    fbContext.getBrnLogger().dbg("ExtCalendar.jsp-->User id="  + StrUserId);
    
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
   /* # BUG 15978732 fixes start */ 
    String year = FCUtility.validateParameter(request.getParameter("Year"));
    String month = FCUtility.validateParameter(request.getParameter("Month"));
    String day = FCUtility.validateParameter(request.getParameter("Day"));//Bug No 25153773 Changes //Bug No 25817688 Changes
    String brn = FCUtility.validateParameter(request.getParameter("Brn"));
    String currUser = FCUtility.validateParameter(request.getParameter("currUser"));
    String functionId = FCUtility.validateParameter(request.getParameter("functionId"));
    String txnBranch = FCUtility.validateParameter(request.getParameter("txnBranch"));
    String txnBranchDate = FCUtility.validateParameter(request.getParameter("txnBranchDate"));
    //Date txnBranchDate = FCUserGlobals.getCurrHostDate();     //Bug No 25153773 Changes //Bug No 25817688 Changes
    String actionseqNo = FCUtility.validateParameter((String)request.getAttribute("actionSeqNo"));
    
    /* # BUG 15978732 fixes end*/ 
    String CalendarTitle = (String)itemDescMap.get("LBL_CALENDAR");
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String calDays = (String)itemDescMap.get("LBL_CALENDAR_DAYS");
    String today = (String)itemDescMap.get("LBL_TODAY"); 
    fbContext.getBrnLogger().dbg("ExtCalendar.jsp-->year="  + year);
    fbContext.getBrnLogger().dbg("ExtCalendar.jsp-->month="  + month);
    fbContext.getBrnLogger().dbg("ExtCalendar.jsp-->day="  + day);//Bug No 25828792 Changes
    fbContext.getBrnLogger().dbg("ExtCalendar.jsp-->brn="  + brn);
    fbContext.getBrnLogger().dbg("ExtCalendar.jsp-->currUser="  + currUser);
    fbContext.getBrnLogger().flush(currUser);
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
    
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <HEAD>
        <title><%=StringEscapeUtils.escapeHTML(CalendarTitle)%></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link id="LINKCSS" href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
        <script type="text/javascript">
            //var dlgArg = dialogArguments;
            var mainWin  = parent.mainWin;
        </script>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtCalendar.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/Util.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript">
            var year = '<%=StringEscapeUtils.escapeJavaScript(year)%>';
            var month = '<%=StringEscapeUtils.escapeJavaScript(month)%>';
            var day = '<%=StringEscapeUtils.escapeJavaScript(day)%>';//Bug No 25828792 Changes
            var functionId = '<%=StringEscapeUtils.escapeJavaScript(functionId)%>';
            var txnBranch = '<%=StringEscapeUtils.escapeJavaScript(txnBranch)%>';
            var txnBranchDate  = '<%= StringEscapeUtils.escapeJavaScript(txnBranchDate.toString())%>';   //Bug No 25153773  //Bug No 25817688 Changes
            var actionseqNo = '<%=StringEscapeUtils.escapeJavaScript(actionseqNo)%>';
            var td7Days = "";
            var td7DaysL = "";
            var holidays = "";
            var nCurrentDay = 0;
           /* var parentDsoDt = new Object();
            var parentBtnDt = new Object();
            var parentDateFormatDSO = new Object();*/
            var parentDsoDt = parent.gCalDSODate;
            var parentBtnDt = parent.gCalBtn;
            var parentDateFormatDSO = parent.gDateFormatDSO;
            
            getDayString();
        </script>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    </HEAD>
    <BODY onload="getHolidayList();setHeights();" oncontextmenu="return false;" class="BDYform" onkeydown="return CalendarAccessKeys(event)" onhelp="return false;">
        <%--<form name="calendar">--%>
        <DIV class="WNDcontainer" id="DIVWNDContainer">
            <div class="WNDtitlebar" id="WNDtitlebar" onmousedown="startDrag('ChildWin', event)">
                <B class="BTNicon"><span class="ICOflexcube"></span></B>
                <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(CalendarTitle)%></h1>
                <div class="WNDbuttons">
                    <a class="WNDcls" id ="WNDbuttons" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onkeydown="return fnHandleCalBtn(event)" onclick="fnExitCal()">
                   <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                    </a>
                </div>
            </div>
            <DIV class="WNDcontentmodal" id="DIVScrContainer" >
                <table id="tblDays" class="TBLcal" summary="<%=StringEscapeUtils.escapeHTML(month)%>" border="0" cellpadding="0" cellspacing="0">
                    <colgroup span="7"></colgroup>
                    <thead>
                        <tr>
                            <td colspan="7">
                                <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
                                <div class="DIVcal" style="padding-top:0px;padding-bottom:0px;"><button title="Selected" class="BTNtext" id="today" style="width: 50%;" onmouseover="fnMouseOverCal(this)" onmouseout="fnMouseOutCal(this)" onmousedown="fnMouseDownCal(this)" onkeydown="return fnHandleCalBtn(event)" onclick="selectToday(event)" onfocus="fnMouseOverCal(this)" onblur="fnMouseOutCal(this)"><%=StringEscapeUtils.escapeHTML(today)%></button>&nbsp;</div>
                                <div class="DIVcal">  
                                    <BUTTON CLASS='BTNicon2' tabindex="-1" onclick='prevYear()' title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_PREVIOUS_YEAR"))%>" onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this) onfocus=fnMouseOverCal(this) onblur=fnMouseOutCal(this)>
                                        <span tabindex="-1" class="ICOfirst"><span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_PREVIOUS_YEAR"))%></span></span>
                                    </BUTTON>
                                    <BUTTON CLASS='BTNicon2' tabindex="-1" onclick='prevMonth()' title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_PREVIOUS_MONTH"))%>" onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this) onfocus=fnMouseOverCal(this) onblur=fnMouseOutCal(this)>
                                        <span tabindex="-1" class="ICOprevious"><span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_PREVIOUS_MONTH"))%></span></span>
                                    </BUTTON>
                                    <BUTTON CLASS='BTNtext'  title="Selected"  style='width:50%' onclick='goToYear()' id=gotoYY onkeydown="return fnHandleCalBtn(event)" onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this) onfocus=fnMouseOverCal(this) onblur=fnMouseOutCal(this)>
                                    </BUTTON>&nbsp;
                                    <BUTTON CLASS='BTNicon2' tabindex="-1" onclick='nextMonth()' title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_NEXT_MONTH"))%>" onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this) onfocus=fnMouseOverCal(this) onblur=fnMouseOutCal(this)>
                                        <span tabindex="-1" class="ICOnext"><span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_NEXT_MONTH"))%></span></span>
                                    </BUTTON>
                                    <BUTTON CLASS='BTNicon2' tabindex="-1" onclick='nextYear()' title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_NEXT_YEAR"))%>"  onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this) onfocus=fnMouseOverCal(this) onblur=fnMouseOutCal(this)>
                                        <span tabindex="-1" class="ICOlast"><span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_NEXT_YEAR"))%></span></span>
                                    </BUTTON></div>				  
                            </td>
                        </tr>
                        <tr>
                            <%for(int thDays=0;thDays<7;thDays++){%>
                                <th CLASS='THcal' scope="col" abbr="gShortDayValues['<%=thDays%>']" ><script>document.write(gShortDayValues['<%=thDays%>'])</script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript></th>
                            <%}%>
                        </tr>
                    </thead>
                    <tbody>
                       <tr>
                            <%for(int tdDays=0;tdDays<7;tdDays++){
                            if (tdDays==0){%>
                            <td tabindex=0  abbr="Week1" onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)  ondblclick="fnRetSelDate()" ontouchstart="fnRetSelDateDevice(event)"></td><!--HTML5 Changes-->
                            <span class="LBLinv"><%=StringEscapeUtils.escapeHTML("Week1")%></span>
                            <%} else{ %>
                            <td tabindex=0 onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)  ondblclick="fnRetSelDate()" ontouchstart="fnRetSelDateDevice(event)"></td><!--HTML5 Changes-->
                            <%}
                            }%>
                        </tr>
                        <%for(int trDays=0;trDays<5;trDays++){%>
                            <tr tabindex=0 CLASS='calTRDays'>
                            <% for(int days=0;days<7;days++){ 
                                String wkStr = "Week"+ (trDays+2); 
                                    if(days == 0){%>
                                        <td abbr="<%=StringEscapeUtils.escapeHTML(wkStr)%>" tabindex=0 onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)></td>
                                        <% if(trDays == 4){ %>
                                        <span class="LBLinv"><%=StringEscapeUtils.escapeHTML(wkStr)%></span>
                                    <%  }
                                    } else { %>
                                    <td tabindex=0 onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)></td>
                                <%}
                            }%>
                            </tr>
                        <%}%> 
                    </tbody>
                </table>
            </div>
        </div>
    </body>
</html>