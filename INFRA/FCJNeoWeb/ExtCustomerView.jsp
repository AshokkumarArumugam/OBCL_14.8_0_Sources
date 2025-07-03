<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtLauncher.jsp
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
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%  
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    
    /* # BUG 15978732 fixes start */ 
    String jsParser         =(String)session.getAttribute("JS_PARSER");
    String browserCSS       =(String)session.getAttribute("BROWSER_CSS");
    String strTheme         =(String)session.getAttribute("THEME");
    String entity         =(String)session.getAttribute("ENTITY");
    String langISOMap       = ((String)session.getAttribute("LANGISOMAP")).toLowerCase();
    String langCode	    = (String)session.getAttribute("LANG");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String FCJStream        = (String)session.getAttribute("FCJStream");
    int sessionInterval     =  session.getMaxInactiveInterval();
    
    String CSRFtoken        = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/
    String funcID	    = FCUtility.validateParameter((String) request.getAttribute("functionid"));
    String uiXML	    = FCUtility.validateParameter((String) request.getAttribute("uixml"));
    String description      = FCUtility.validateParameter((String) request.getAttribute("description"));
     //Fix for Bug 17344217 start
    if(description!=null && !"null".equals(description)) {
        description=description.replace("_amp_", "&");//16903925 bug fixes
    }
    //Fix for Bug 17344217 End
    String screenType       = FCUtility.validateParameter((String) request.getAttribute("typeString"));
    String autoAuth         = FCUtility.validateParameter((String)request.getAttribute("autoAuth"));
    String userId           = FCUtility.validateParameter((String)session.getAttribute("USERID"));
    String userFuncId       = FCUtility.validateParameter((String) request.getAttribute("userFunctionId"));
    String taskId           = FCUtility.validateParameter((String) request.getAttribute("taskId"));
    String branchStatus     = FCUtility.validateParameter((String) request.getAttribute("branchStatus"));
    String masterFuncId     = FCUtility.validateParameter((String) request.getAttribute("masterFuncId"));
    String todayDate        = FCUtility.validateParameter((String) request.getAttribute("TitleDate"));
    String routingType      = FCUtility.validateParameter((String) request.getAttribute("routingType"));
    String functionOrigin   = FCUtility.validateParameter((String) request.getAttribute("functionOrigin"));
    String parentFunction   = FCUtility.validateParameter((String) request.getAttribute("parentFunction"));
    String parentOrigin     = FCUtility.validateParameter((String) request.getAttribute("parentOrigin"));
    String tankModifications= FCUtility.validateParameter((String) request.getAttribute("tankModifications"));
    String remarksReq       = FCUtility.validateParameter((String) request.getAttribute("remarksReq"));  
    String exportReq        = FCUtility.validateParameter((String) request.getAttribute("exportReq"));  
    String multiBrnAccessReq= FCUtility.validateParameter((String) request.getAttribute("multiBrnAccessReq"));  
    String scrChild         = FCUtility.validateParameter((String) request.getAttribute("scrChild")); //Sudipta For Screen Child
    String superParentFunction         = FCUtility.validateParameter((String) request.getAttribute("superParentFunction"));
    String superParentOrigin         = FCUtility.validateParameter((String) request.getAttribute("superParentOrigin"));
    String hoFunction        = FCUtility.validateParameter((String) request.getAttribute("hoFunction")); 
    String inLoadTime           =FCUtility.validateParameter( request.getParameter("inTime"));
    String FinalJSFile      = uiXML;
    String moduleid         = FCUtility.validateParameter((String)request.getAttribute("moduleid"));
    String license          = FCUtility.validateParameter((String)request.getAttribute("license"));
    String seqNo            = FCUtility.validateParameter((String)request.getAttribute("sequenceno"));
    String actionseqNo      = FCUtility.validateParameter((String)request.getAttribute("actionSeqNo"));
    String xref             = FCUtility.validateParameter((String)request.getAttribute("XREF"));
    String parentSeqNo      = FCUtility.validateParameter((String)request.getAttribute("parentSeqNo"));
    String dashboardSeqNo   = FCUtility.validateParameter((String)request.getAttribute("dashboardSeqNo"));
    String ieCss            = FCUtility.validateParameter((String)session.getAttribute("IECSS"));
    String fromMDB          = FCUtility.validateParameter((String)request.getAttribute("fromMDB"));
    String clusterModified  = FCUtility.validateParameter((String)request.getAttribute("clusterModified"));
    String customModified   = FCUtility.validateParameter((String)request.getAttribute("customModified"));
	/* logging reqd flag N issue*/
    String loggingReqd      = FCUtility.validateParameter((String)request.getAttribute("loggingReqd"));
    String summaryQryCriteria   = FCUtility.validateParameter(String.valueOf(request.getAttribute("summaryQryCriteria")));
    /* # BUG 15978732 fixes end */ 
    
    if(!uiXML.substring(2,3).equalsIgnoreCase("D") && "S".equalsIgnoreCase(uiXML.substring(2,3))) {
        FinalJSFile = funcID.substring(0,2) + "D" + funcID.substring(3,funcID.length());
    } 
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    
    //System.out.println("Launcher start:" + Calendar.getInstance().get(Calendar.HOUR)+":"+Calendar.getInstance().get(Calendar.MINUTE)+":"+Calendar.getInstance().get(Calendar.SECOND)+":"+Calendar.getInstance().get(Calendar.MILLISECOND));
    
    Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+langCode + "~" + entity, branchIdentifier,userId);
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String clientHandlerEntry = FCUtility.validateParameter((String)request.getAttribute("clientEntry"));
    String clientHandlerExit = String.valueOf(System.currentTimeMillis());  
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>

<html lang="<%=StringEscapeUtils.escapeHTML(langISOMap)%>">
    <head>
        <title><%= StringEscapeUtils.escapeHTML(description) %></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(langISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>
       <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(langISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
        <script type="text/javascript">
            var mainWin        = parent;
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%--<script type="text/javascript" src="Script/JS/SmAppBrw.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>--%>
        <script type="text/javascript" src="Script/ExtJS/ExtFuncs.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtBuildXML.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript">
            //var alertAction         = "";
            var meBlockResponse     = "";
            var isPartialDOM        = false;
            var recDataLength       = new Array();
            //var timeLogsArray = new Array();
            var FCJStream           = '<%=StringEscapeUtils.escapeJavaScript(FCJStream)%>';
            var moduleid            = '<%=StringEscapeUtils.escapeJavaScript(moduleid)%>';
            var license             = '<%=StringEscapeUtils.escapeJavaScript(license)%>';
            var seqNo               = '<%=StringEscapeUtils.escapeJavaScript(seqNo)%>';
            var actionseqNo               = '<%=StringEscapeUtils.escapeJavaScript(actionseqNo)%>';
            var parentSeqNo         = '<%=StringEscapeUtils.escapeJavaScript(parentSeqNo)%>';
            var dashboardSeqNo      = '<%=StringEscapeUtils.escapeJavaScript(dashboardSeqNo)%>';
            var taskId              = '<%=StringEscapeUtils.escapeJavaScript(taskId)%>';
            var masterFuncId        = '<%=StringEscapeUtils.escapeJavaScript(masterFuncId)%>';
            var screenType          = '<%=StringEscapeUtils.escapeJavaScript(screenType)%>';
            var functionOrigin      = '<%=StringEscapeUtils.escapeJavaScript(functionOrigin)%>';
            var parentFunction      = '<%=StringEscapeUtils.escapeJavaScript(parentFunction)%>';
            var parentOrigin        = '<%=StringEscapeUtils.escapeJavaScript(parentOrigin)%>';
            var superParentFunction      = '<%=StringEscapeUtils.escapeJavaScript(superParentFunction)%>';
            var superParentOrigin        = '<%=StringEscapeUtils.escapeJavaScript(superParentOrigin)%>';
            var inLoadTime              = '<%=StringEscapeUtils.escapeJavaScript(inLoadTime)%>';
            var tankModifications   = '<%=StringEscapeUtils.escapeJavaScript(tankModifications)%>';
            var remarksReq          = '<%=StringEscapeUtils.escapeJavaScript(remarksReq)%>';  
            var exportReq           = '<%=StringEscapeUtils.escapeJavaScript(exportReq)%>';   
            var multiBrnAccessReq   = '<%=StringEscapeUtils.escapeJavaScript(multiBrnAccessReq)%>';    
            var scrChild            = '<%=StringEscapeUtils.escapeJavaScript(scrChild)%>';
            var hoFunction          = '<%=StringEscapeUtils.escapeJavaScript(hoFunction)%>';
            var scrName             = "";
            var gInpDateFormat      = "";
            var gAction             = "";
            var holdStatus          = "";
            var onceAuthObj         = null;
            var routingType         = '<%=StringEscapeUtils.escapeJavaScript(routingType)%>';
            var branch_eoi          = '<%=StringEscapeUtils.escapeJavaScript(branchStatus)%>';
            var branch_eoi_labelsArr= new Array();
            var strEODInputLabelDesc= ""; 
            var userFuncId 	    = '<%= StringEscapeUtils.escapeJavaScript(userFuncId) %>';
            var fromMDB             = '<%= StringEscapeUtils.escapeJavaScript(fromMDB) %>';
            var clusterModified     = '<%= StringEscapeUtils.escapeJavaScript(clusterModified)%>';
            var customModified      = '<%= StringEscapeUtils.escapeJavaScript(customModified)%>';
            var clientHandlerEntry   = '<%= StringEscapeUtils.escapeJavaScript(clientHandlerEntry)%>';
            var clientHandlerExit    = '<%= StringEscapeUtils.escapeJavaScript(clientHandlerExit)%>';
			//  logging reqd flag N issue
			var loggingReqd      = '<%= StringEscapeUtils.escapeJavaScript(loggingReqd)%>';
            var summaryQryCriteria  = '<%=StringEscapeUtils.escapeJavaScript(summaryQryCriteria)%>';
            mainWin.SessionInterval = <%=StringEscapeUtils.escapeJavaScript(sessionInterval+"")%>;
			mainWin.BranchEoi = branch_eoi;//Fix for 17070419
		   if (mainWin.applicationName == "FCJ" || mainWin.applicationName == "FGL"){
                //mainWin.BranchEoi = branch_eoi; Fix for 17070419
                strEODInputLabelDesc = "LBL_BRANCH_EOI_" + branch_eoi;
            } else {
                strEODInputLabelDesc = "LBL_BRANCH_STATUS_" + branch_eoi;
            }
            
            var BranchEoiLabelDesc = "";
            var titleDate          = '<%=StringEscapeUtils.escapeJavaScript(todayDate)%>';
            mainWin.AppDate = titleDate;//Fix for 17312442	
            var dateComp           = titleDate.split("-",-1);   
            dateComp               = getSystemShortDate(parseInt(dateComp[0],10),parseInt(dateComp[1],10),parseInt(dateComp[2],10) );
            mainWin.document.getElementById("dateli").innerHTML = "&nbsp;"+dateComp+"&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp";//Fix for 17312442	
            var screenTitleArray   = (mainWin.document.title).split(" - ");
            screenTitleArray[5]    = dateComp;
            screenTitleArray[6]    = mainWin.getItemDesc(strEODInputLabelDesc);
            for (var i=0; i <screenTitleArray.length; i++){
                BranchEoiLabelDesc = BranchEoiLabelDesc + screenTitleArray[i] + " - ";
            }
            BranchEoiLabelDesc     = BranchEoiLabelDesc.substring(0,BranchEoiLabelDesc.length-3);
            mainWin.document.title = BranchEoiLabelDesc;
            
            window.frameElement.name = seqNo;
            parent.document.getElementById("testwin").id     = seqNo;
            
            var xmlFileName;
            var xslFileName;
            var unmaskTitle = false;
            var functionId 	= '<%= StringEscapeUtils.escapeJavaScript(funcID) %>';
            var uiXML 	= '<%= StringEscapeUtils.escapeJavaScript(uiXML) %>';
            var parentFunc;
            var isDetailed  = true;
            var langCode    = "/<%= StringEscapeUtils.escapeJavaScript(langCode) %>/";
            var strTheme    = '<%= StringEscapeUtils.escapeJavaScript(strTheme)%>';
            var screenTitle = '<%= StringEscapeUtils.escapeJavaScript(description) %>';
            var autoAuth    = '<%= StringEscapeUtils.escapeJavaScript(autoAuth) %>';
            var thirdChar 	= functionId.substring(2,3);
            parentFunc 	= functionId.substring(2,0) + "D" + functionId.substring(3,functionId.length); //detail func id for summary
            if (thirdChar == "S") {
                isDetailed = false;
            }
                xmlFileName = mainWin.UIXmlPath+ "/<%= StringEscapeUtils.escapeJavaScript(langCode) %>/" + uiXML + ".xml";
                xslFileName = "ExtDetail.xsl";
                
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <script type="text/javascript" src="Script/JS/SYS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtDatabinding.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtensibleMEUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtensibleUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/Extensible.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%
        if ("KERNEL".equalsIgnoreCase(FCJStream)) {
        %>
            <% if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
            %>
                <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL.js"></script>
            <%
            }
            %>
        <%
        } else if ("CLUSTER".equalsIgnoreCase(FCJStream)) {
        %>
            <% if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
            %>
                <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL.js"></script>
                <%
                if ("Y".equalsIgnoreCase(clusterModified)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER.js"></script>
                <%
                } 
                %>
            <%
            } else if ("CLUSTER".equalsIgnoreCase(functionOrigin)) {
            %>
                <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER.js"></script>
            <%
            }
            %>
        <%
        } else if ("CUSTOM".equalsIgnoreCase(FCJStream)) {
        %>
            <% if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
            %>
                <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL.js"></script>
                <%
                if ("Y".equalsIgnoreCase(clusterModified)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER.js"></script>
                <%
                }
                if ("Y".equalsIgnoreCase(customModified)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM.js"></script>
                <%
                }
                %>
            <%
            } else if ("CLUSTER".equalsIgnoreCase(functionOrigin)) {
            %>
                <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER.js"></script>
                <%
                if ("Y".equalsIgnoreCase(customModified)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM.js"></script>
                <%
                }
                %>
            <%
            } else if ("CUSTOM".equalsIgnoreCase(functionOrigin)) {
            %>
                <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM.js"></script>
            <%
            }
            %>
        <%
        }
        %>
    </head>  
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <body onkeydown="return shortcut(event)" 
          onload="fnLoad(xmlFileName,xslFileName); parent.unmask();" 
          onfocus="fnFocus();" 
          onmousedown="fnMouseDownEvents(event)" 
          onhelp="return disableDefault();"
          oncontextmenu="return false;"
          onclick="mainWin.setActiveWindow(mainWin.document.getElementById('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>'), window)">
           <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <div class="WNDcontainer" id="DIVWNDContainer">
            <DIV class=WNDtitlebar id="WNDtitlebar" onmousedown="startDrag('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>', event)">
                <div class="WNDtitle" id="wndtitle">
                    <B class="BTNicon">
                        <span class="ICOflexcube"></span>
                    </B>
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(description)%>&nbsp;</h1>
                    <%-- 12.0.2--%>
                  <%--  <span onclick="fnAddToFavorites('<%=StringEscapeUtils.escapeJavaScript(funcID)%>');" style="	FONT-FAMILY: Arial, Helvetica, sans-serif;COLOR: #00f;FONT-SIZE: 0.74em;float:right; padding-right:3px; text-decoration:underline;" >Add to Favorites</span></h1>--%>
                    <div class="WNDbuttons">
                        <a class="WNDcls" accesskey="7" id ="WNDbuttons" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onclick="if(this.disabled) return false; fnExitAll('', event)" onkeydown="return fnHandleScrBtn(event)">
                        <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                      </a>
                       <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
                      <a class="WNDmin" accesskey="6" id ="WNDbuttons" href="#" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%>" onclick="if(this.disabled) return false; mainWin.addTab('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>', '<%=StringEscapeUtils.escapeJavaScript(description)%>', event)" onkeydown="return fnHandleScrBtn(event)">
                        <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%></span>
                      </a>
                       <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
                    </div>
                </div>
            </DIV>
            <div class="WNDcontent" id="DIVScrContainer">
                <div id="ResTree">
                  <%--<div id="toolbar" class="DIVTBtab TBbg" style="display:none;">--%>
                  <div id="toolbar" class="DIVnav" style="display:none;">
                    <jsp:include page="SMHTLBAR.jsp" flush="true" /> 
                  </div>
                </div>
            </div>
        </div>     
        <div id="masker" class="masker" style="display:none">
            <div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none"><!--HTML5 Changes-->
                <iframe id="ifr_AlertWin" class="frames" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
            <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
            </div>
        </div>
    </body>
</html>
