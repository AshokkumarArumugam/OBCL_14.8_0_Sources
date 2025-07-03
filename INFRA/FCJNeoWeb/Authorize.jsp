<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : AUTHORIZE.JSP
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
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String strUserId = (String)session.getAttribute("USERID");
    String entity = (String)session.getAttribute("ENTITY");
    String ieCss         = (String)session.getAttribute("IECSS");
    String strTheme = (String)session.getAttribute("THEME");
    String StrIsoLang = (String)session.getAttribute("LANGISOMAP");
    String Strlang         = (String)session.getAttribute("LANG");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/
   /* # BUG 15978732 fixes start */ 
    String funcID	    = FCUtility.validateParameter((String)request.getParameter("functionid"));
    String uiName           = FCUtility.validateParameter((String)request.getParameter("uiName"));
    /* # BUG 15978732 fixes end */ 
    String inTime=FCUtility.validateParameter((String)request.getParameter("inTime"));//Performance Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
    String FunctionId           = "";
    if (uiName == null) {
        FunctionId = funcID;
    } else {
        FunctionId = uiName;
    }
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
%>
<% 
    Map itemDescMap =(Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,strUserId);
     
    String strAuthorize = (String)itemDescMap.get("LBL_ACTION_AUTHORIZE");            
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
       
%>

<html lang="<%=StringEscapeUtils.escapeHTML(StrIsoLang)%>">
    <head>
    <%-- # BUG 15978732 fixes start --%>
    <TITLE><%=StringEscapeUtils.escapeHTML(FCUtility.validateParameter(request.getParameter("title")))%></TITLE>
        <%-- # BUG 15978732 fixes end --%>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrIsoLang)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
    <link href="Theme/<%=StringEscapeUtils.escapeURL(StrIsoLang)%>.css" rel="stylesheet" type="text/css"/>
        <!--<link href="Theme/<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>-->
    <!--HTML5 Changes Start--> <!--<link href="Theme/<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>-->
    <!--
    <%if("L".equals(font)) {%>
        <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
    <%} else if ("S".equals(font)) {%>
        <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
    <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>
    <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>
    <!--<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>-->
    <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
    <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
    <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript"> 
        var mainWin     = parent.mainWin;
        var alertAction = "";
        var strTheme    = '<%= StringEscapeUtils.escapeJavaScript(strTheme) %>';
    </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Print.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
   <!-- <script type="text/javascript" src="Script/JS/AuditTrail.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/GlobalConstants.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Util.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/UIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     -->
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
  <!--  <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(FunctionId)%>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    
    <script type="text/javascript" src="Script/JS/Databinding.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Validations.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Authorize.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
   -->
    <script type="text/javascript">     
              var openImg   = new Image();     
              openImg.src   = "Images/open.gif";
              var closedImg = new Image();
              closedImg.src = "Images/closed.gif"; 
        var ShowSummary = "FALSE";
        
        var parentScrID = "ChildWin";   
        if(typeof(parent.fromSubScr) == 'undefined') {
            parentScrID = parent.seqNo;
        }
       var launcherDIVWidth     = parent.parent.document.getElementById(parentScrID).style.width;
        var launcherDIVHeight    = parent.parent.document.getElementById(parentScrID).style.height;
        var launcherIFWidth      = parent.parent.document.getElementById(parentScrID).children[0].style.width;
        var launcherIFHeight     = parent.parent.document.getElementById(parentScrID).children[0].style.height;
        var launcherResTreeHeight= parent.document.getElementById("DIVScrContainer").style.height;
        var launcherResTreeWidth = parent.document.getElementById("DIVScrContainer").style.width;
        var launcherLeft         = parent.parent.document.getElementById(parentScrID).style.left;
        var launcherHeaderWidth  = parent.document.getElementById("DIVWNDContainer").style.width;
        var authFunctionId = '<%=StringEscapeUtils.escapeJavaScript(FunctionId)%>';
        var inTime = '<%=StringEscapeUtils.escapeJavaScript(inTime)%>';//Performance Changes
        
    </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <!--<script type="text/javascript" src="Script/OJET/require-config.js"></script>-->
        <script type="text/javascript" src="Script/OJET/main_nonextAuth.js"></script>
    </head>
    <body class="BDYform"  style="margin:0px;padding:0px;">
    <div id="Div_AlertWin"   onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none;z-index:6000"><!--HTML5 Changes-->
        <iframe id="ifr_AlertWin"  src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
    </div>
    <div id="Div_ChildWin" style="display:none;  ">
    </div>
    
        <div id="DIVWNDContainer" style="height:100%">
        
         <oj-dialog id="subscreenDialog"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"  
                      position.of="window"  style=" min-width: 100vw;min-height: 100vh;max-height: 100vh;height: 100vh;" class="frames">
            
                <div slot=header id="WNDtitlebar" class="oj-dialog-title oj-flex-bar oj-sm-align-items-center bottom-border"  style="width: 100%">
                <div class="oj-flex-bar-start" id="wndtitle">
                    <h3><%=StringEscapeUtils.escapeHTML(FCUtility.validateParameter(request.getParameter("title")))%>&nbsp;</h3>
                    </div>
                     <div class="oj-flex-bar-end">
                      <oj-button display="icons" chroming="borderless" type="button" id="WNDbuttons" class="WNDcls" onkeydown="return fnHandleScrBtn(event)" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onclick="fnExit(event)">
                        <span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
                        </oj-button>
        
                    </div>
                </div>
                <div  id="DIVScrContainer" slot="body">
                <div id="ResTree" ></div>
                <div id="AuthDiv" ></div>
                <div id="DIV_MOD_DETAILS" ></div>
                <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
               
            
                 </div>
                <div id="subscreenFooter" class="DIVfooter oj-sm-padding-1x"  slot="footer"></div>
            </oj-dialog>
            </div>
         
        
        <div id="masker" class="masker" style="display:none">
          
            
        </div>
          <!--  <DIV class=WNDtitlebar id="WNDtitlebar" onmousedown="startDrag('ChildWin', event)">
                <div class="WNDtitle" id="wndtitle">
                    <B class="BTNicon">
                        <span class="ICOflexcube"></span>
                    </B> 
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(FCUtility.validateParameter(request.getParameter("title")))%>&nbsp;</h1>
                    <div class="WNDbuttons">
                        <a class="WNDcls" id="WNDbuttons" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onclick="fnExit(event)">
                        <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                        </a>
                    </div>
                </div>
            </DIV>
            <div class="WNDcontent" id="DIVScrContainer">
            <div id="ResTree" style="border:none;margin:0px;padding:0px;"></div>
            <div id="AuthDiv" style="margin:0px;padding:0px;"></div>
            <div id="DIV_MOD_DETAILS" class="authDIVModDetail"></div>
            <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
            </div>
        </div>
        <div id="masker" class="masker" style="display:none">
            <div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none">
                <iframe id="ifr_AlertWin" class="frames" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
            <div id="Div_ChildWin" style="display:none; width:100%; height:100%"></div>
        </div>-->
    </body>
</html>
