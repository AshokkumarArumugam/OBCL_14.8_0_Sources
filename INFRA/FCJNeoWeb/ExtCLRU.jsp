<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtCLRU.jsp
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

Copyright © 2004-2016  by Oracle Financial Services  Software Limited..
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
-------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.exception.BranchException"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="java.util.Map"%>
<%
    
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String Strlang          = (String)session.getAttribute("LANG");
    String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
    String StrUserId        = (String) session.getAttribute("USERID");
    String entity        = (String) session.getAttribute("ENTITY");
    String strTheme         = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String brnCode          = (String)session.getAttribute("BRANCH_CODE");
   /* # BUG 15978732 fixes start */ 
    String userFuncId      =  FCUtility.validateParameter((String)request.getAttribute("numeric"));
    String funcID	    = FCUtility.validateParameter((String)request.getParameter("funcid"));
    String uiXML	    = FCUtility.validateParameter((String)request.getParameter("uiName"));
    String FinalJSFile      = uiXML;
    /* # BUG 15978732 fixes end */ 
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/
    /* # BUG 15978732 fixes start */ 
    // Added from smscommon.jsp
    String moduleid         = FCUtility.validateParameter((String)request.getAttribute("moduleid"));
    String license          = FCUtility.validateParameter((String)request.getAttribute("license"));
    String seqNo            = FCUtility.validateParameter((String)request.getAttribute("sequenceno"));
    String routingType      = FCUtility.validateParameter((String)request.getAttribute("routingType"));
    String ieCss            = (String)session.getAttribute("IECSS");
    String appDbg           = (String) request.getAttribute("APPLOG");
    String webDbg           = (String) request.getAttribute("WEBLOG");   
    String dbDbg           = (String) request.getAttribute("DBLOG");
    /* # BUG 15978732 fixes end */ 
    /*Fix for 19060241*/
    String branchStatus     = FCUtility.validateParameter((String) request.getAttribute("branchStatus"));  /*Fix for 24794110*/
    String clusterModified  = FCUtility.validateParameter((String)request.getAttribute("clusterModified"));
    String customModified   = FCUtility.validateParameter((String)request.getAttribute("customModified"));
	String restrictReqd      = FCUtility.validateParameter((String)request.getAttribute("restrictReqd"));//jc2 changes //PIPA
	String restrictPrint      = FCUtility.validateParameter((String)request.getAttribute("restrictPrint"));//jc2 changes //PIPA
    if ((Strlang == null) || (Strlang == ""))
        Strlang = BranchConstants.DEFAULT_LANGCODE;
    
    FBContext fbContext = new FBContext(StrUserId);
    String imgPath = "Images/"+strTheme.substring(0,strTheme.indexOf(".")); //Fix for Bug 16354738 - removed extra slash character from imgPath
    
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
      
    String description = (String)itemDescMap.get("LBL_CLEAR_USER");
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes 
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
    
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
  <head>
    <title><%= StringEscapeUtils.escapeHTML(description) %></title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content=0>
    <!--<link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>-->
   <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
    <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
    <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
        <!--HTML5 Changes Start-->
      <%--  <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
        --%>
                <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>
                <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>
                <!--<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>-->
                <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
                <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
                <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript">
        //var dlgArg      = dialogArguments;
        var meBlockResponse     = "";
        var recDataLength       = new Array();
        var isPartialDOM        = false;
        //var timeLogsArray = new Array();
        var mainWin     = parent;
        var screenKo=""; //OJET Migration
        appDbg = '<%=StringEscapeUtils.escapeJavaScript(appDbg)%>';
        webDbg = '<%=StringEscapeUtils.escapeJavaScript(webDbg)%>' ;
        dbDbg = '<%=StringEscapeUtils.escapeJavaScript(dbDbg)%>';
        var moduleid    = '<%=StringEscapeUtils.escapeJavaScript(moduleid)%>';
        var license     = '<%=StringEscapeUtils.escapeJavaScript(license)%>';
        var seqNo       = '<%=StringEscapeUtils.escapeJavaScript(seqNo)%>';
        var routingType = '<%=StringEscapeUtils.escapeJavaScript(routingType)%>';
        var functionId  = '<%= StringEscapeUtils.escapeJavaScript(funcID) %>';
        var branch_eoi          = '<%=StringEscapeUtils.escapeJavaScript(branchStatus)%>';  /*Fix for 24794110*/
        var xmlFileName = "UIXML"+"/<%= StringEscapeUtils.escapeJavaScript(Strlang)%>/"+"CLRU.xml";
        var xslFileName = "ExtDetail.xsl";
        var strTheme    = '<%= StringEscapeUtils.escapeJavaScript(strTheme) %>';
        var thirdChar   = functionId.substring(2,3);
        var uiXML       = functionId;
        var imagePath   = '<%= StringEscapeUtils.escapeJavaScript(imgPath) %>';
        var dispSize    = "254";
        var clearLbl    = mainWin.getItemDesc("LBL_USER_CLEARED");
       /*Security bug SEC-12-Patch-081 fixes starts */
        var branch_code = '<%=StringEscapeUtils.escapeJavaScript(brnCode)%>';
         /*Security bug SEC-12-Patch-081 fixes ends */
        var userFuncId = '<%= StringEscapeUtils.escapeJavaScript(userFuncId) %>';
        var screenTitle = '<%= StringEscapeUtils.escapeJavaScript(description) %>';
        /*Fix for 19060241*/
        var clusterModified     = '<%= StringEscapeUtils.escapeJavaScript(clusterModified)%>';
        var customModified      = '<%= StringEscapeUtils.escapeJavaScript(customModified)%>';
		var restrictReqd        = '<%= StringEscapeUtils.escapeJavaScript(restrictReqd)%>';//jc2 changes //PIPA
		var restrictPrint        = '<%= StringEscapeUtils.escapeJavaScript(restrictPrint)%>';//jc2 changes //PIPA
        

        var clusterJSFile="";
        var customJSFile="";
        
        window.frameElement.name = seqNo;
        parent.document.getElementById("testwin").id = seqNo;
        parent.document.getElementById(seqNo).className     = "dhtmlwindow functionCont show";//HTML5 Changes
        mainWin.BranchEoi = branch_eoi; /*Fix for 24794110*/
    </script>
    <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    
   <!-- <script type="text/javascript" src="Script/JS/CLRU_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    
     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
     <!--
    <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtFuncs.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtTabContent.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtDatabinding.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtBuildXML.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtensibleMEUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtensibleUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/Extensible.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/CLRU.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    -->
    <script type="text/javascript" src="Script/JS/CLRU.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
	
    <!--Fix for 19060241-->
    <%
    if ("Y".equalsIgnoreCase(clusterModified)) {
    %>
        <!-- <script language="JavaScript" src="Script/JS/CLRU_CLUSTER.js"></script>-->
        <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER";
        </script>
    <%
    }
    if ("Y".equalsIgnoreCase(customModified)) {
    %>
        <!--<script language="JavaScript" src="Script/JS/CLRU_CUSTOM.js"></script>-->
        <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM";
                </script>
    <%
    }
    %>
    </script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
   <!-- <script type="text/javascript" src="Script/OJET/require-config.js"></script> -->
    <script type="text/javascript" src="Script/OJET/main_clru.js"></script>
  </head>
   <body onkeydown="return shortcut(event)" 
          onfocus="fnFocus();" 
          onmousedown="fnMouseDownEvents(event)" 
          onhelp="return disableDefault();"
          oncontextmenu="return false;"
          onclick="mainWin.setActiveWindow(mainWin.document.getElementById('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>'), window)">
        <div id="DIVWNDContainer" style="height: 100%;" >
            <DIV id="WNDtitlebar">
                <div class="oj-flex-bar oj-sm-align-items-center oj-sm-margin-4x-start oj-sm-margin-4x-end bottom-border" id="wndtitle">
                    <div class="oj-flex-bar-start">
                        <h1><%=StringEscapeUtils.escapeHTML(description)%>&nbsp;</h1>
                    </div>
                    <div class="oj-flex-bar-end">
                       <oj-button display="icons" chroming="borderless" type="button" class="WNDcls" accesskey="7" id ="WNDbuttonsMin" 
                                            title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%>" 
                                            value="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%>" 
                                            onclick="if(this.disabled) return false; mainWin.addTab('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>', '<%=StringEscapeUtils.escapeJavaScript(description)%>', event)" 
                                            onkeydown="return fnHandleScrBtn(event)">
                       <span slot="startIcon" tabindex="-1" class="oj-panel-collapse-icon"></span>
                       </oj-button>
                       <oj-button display="icons" chroming="borderless" type="button" class="WNDcls" accesskey="6" id ="WNDbuttons" 
                                           value="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" 
                                           title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" 
                                           onclick="fnExitAll('', event)" 
                                           onkeydown="return fnHandleScrBtn(event)">
                       <span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
                       </oj-button>
                    </div>
                </div>
            </DIV>
            
            <div id="DIVScrContainer">
                <div id="ResTree"></div>
                <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
            </div>
            <div id="Div_AlertWin"  onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none;z-index:6000"> 
                <iframe id="ifr_AlertWin"  src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
        </div>     
        
            <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
            </div>
            <div id="masker" class="masker" style="display:none">
            </div>
        </div>
    </body>
</html>