<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : Print.jsp
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

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css

--------------------------------------------------------------------------------------------------------- -
*/%>
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
    String Strlang         = (String)session.getAttribute("LANG");
    String StrlangISOMap   = (String)session.getAttribute("LANGISOMAP");
    String StrUserId       = (String) session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String ieCss         = (String)session.getAttribute("IECSS");
    String strTheme     = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
   /* # BUG 15978732 fixes start */ 
    String description  = FCUtility.validateParameter((String)request.getParameter("dispTitle"));
    String forExtensible  = FCUtility.validateParameter((String)request.getParameter("fromExtensible"));
    /* # BUG 15978732 fixes end */ 
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/
    
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
     
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String print = (String)itemDescMap.get("LBL_PRINT");
    String pageFooter = (String)itemDescMap.get("LBL_PAGE_FOOTER");
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
        <!--
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
         <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">
         <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>
        <!--<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css">-->
        <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
        <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
        <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>

        <script type="text/javascript">
            //var dlgArg  = dialogArguments;
            var langISO = "<%=StringEscapeUtils.escapeJavaScript(StrlangISOMap)%>";
            var browserCSS = "<%=StringEscapeUtils.escapeJavaScript(browserCSS)%>";
            var mainWin = parent.mainWin;
            var openImg = new Image();     
            openImg.src = "Images/open.gif";
            var closedImg = new Image();
            closedImg.src = "Images/closed.gif";
            
            var pageNum ;
            var numRecs ;
            var totRecs ;
            var totPages;
            var spanid;
            var allValues;
            var arrBlkNames = parent.screenArgs["arrBlkNames"];
            var arrFldNames = parent.screenArgs["arrFldNames"];
            var functionId = parent.screenArgs["functionId"];
            var langCode = parent.screenArgs["langCode"];
            var strTheme    = '<%= StringEscapeUtils.escapeJavaScript(strTheme) %>';
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

        </script>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <%if (forExtensible.equals("yes")) {%>
            <script type="text/javascript" src="Script/ExtJS/ExtPrint.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%} else {%>
            <script type="text/javascript" src="Script/JS/Print.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%}%>
        <script type="text/javascript" src="Script/JS/UIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript">
            function fnCalcHgt() {
                var containerDIV = "ChildWin";
//                var scrWidth = document.getElementById("DIVWNDContainer").offsetWidth;
//                var scrHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight);
//                if (scrWidth > mainWin.x) {
//                    scrWidth = mainWin.x - 8;
//                }
//                if (scrHeight > parseInt(mainWin.document.getElementById("dashboard").offsetHeight)) {
//                    scrHeight = parseInt(mainWin.document.getElementById("dashboard").offsetHeight);
//                }
//                /* ADDED TO MANIPULATE THE SCREEN HEIGHT WHEN THE SUBSCREEN HEIGHT IS GREATER THAN OR EQUAL TO THE VTAB HEIGHT */
//                if (containerDIV == "ChildWin" && scrHeight + document.getElementById("WNDtitlebar").offsetHeight >= parseInt(mainWin.document.getElementById("dashboard").offsetHeight)) {
//                    scrHeight = scrHeight - document.getElementById("WNDtitlebar").offsetHeight;
//                }
                var scrHeight = parseInt(mainWin.document.getElementById("mainContent").offsetHeight);
                
                parent.document.getElementById(containerDIV).className = "oj-sm-width-full";
                parent.document.getElementById(containerDIV).children[0].style.width = "100%";
                
                parent.document.getElementById(containerDIV).style.height = scrHeight - parent.document.getElementById("WNDtitlebar").offsetHeight + "px";
                parent.document.getElementById(containerDIV).children[0].style.height = "100%";
                
                parent.document.getElementById(containerDIV).style.top = parent.document.getElementById("WNDtitlebar").offsetHeight + "px";
                /*Added to adjust the screen height in case of IE7*/
                document.getElementById("DIVWNDContainer").style.width = "100%";
                var l_DivFooter = document.getElementById("DIVFooter").offsetHeight;
                var l_DivTmpHgt = scrHeight - parent.document.getElementById("WNDtitlebar").offsetHeight - parseInt(l_DivFooter) - document.getElementById("WNDtitlebar").offsetHeight;
                document.getElementById("DIVMainTmp").style.height = parseInt(l_DivTmpHgt)  + 'px';
                if (containerDIV == "ChildWin") {
                  //  if (parent.seqNo) {
                     //   containerDIV = parent.seqNo;
                       // parent.parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
                    }
                 //   var mainScrHeight = parseInt(mainWin.document.getElementById("dashboard").offsetHeight);
//                    parent.parent.document.getElementById(containerDIV).style.height = mainScrHeight + "px";
//                    parent.parent.document.getElementById(containerDIV).children[0].style.height = mainScrHeight + "px";
//                    parent.parent.document.getElementById(containerDIV).style.width = mainWin.x + "px";
//                    parent.parent.document.getElementById(containerDIV).children[0].style.width = mainWin.x + "px";
//                    parent.document.getElementById("DIVScrContainer").style.height = mainScrHeight - document.getElementById("WNDtitlebar").offsetHeight - 4 + "px";
//                    parent.document.getElementById("DIVScrContainer").style.width = mainWin.x - 8 + "px";
                    /*Added to adjust the screen height in case of IE7*/
//                    parent.document.getElementById("DIVWNDContainer").style.width = mainWin.x + "px";
//                    parent.parent.document.getElementById(containerDIV).style.left = "4px";
              //  } else {
//                    parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
//                    parent.document.getElementById(containerDIV).style.left = mainWin.x - (document.getElementById("DIVWNDContainer").offsetWidth + 4) + "px";
            //    }
              //  parent.mask();
              parent.document.getElementById("ifrSubScreen").classList.add('frames');
                 document.getElementById("BTN_EXIT_IMG").focus();
            }
            //Fix for 21754906 
            function fnHandlePrintScreenBtn(e) {
            e = window.event || e;
            var srcElement = getEventSourceElement(e);
            if (e.keyCode == 9) {
                if (srcElement.id == "BTN_EXIT_IMG") {
                    if (document.getElementById("WNDbuttons")) document.getElementById("WNDbuttons").focus();
                    preventpropagate(e);
                    return false;
                } else {
                    preventpropagate(e);
                    return true;
                }
            }
        }
        
        
        </script>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        
        <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_print.js"></script>

            
    </head>    
    <body  ncontextmenu="return false;" onkeydown="return fnHandlePrintScreenBtn(event);">
        <div  id="DIVWNDContainer"  >
            <div   id="WNDtitlebar"  >
                <div class="oj-flex-bar oj-sm-align-items-center oj-sm-margin-4x-start oj-sm-margin-4x-end bottom-border" id="wndtitle">
                    <div class="oj-flex-bar-start">
                        <h1><%=StringEscapeUtils.escapeHTML(description)%></h1>
                    </div>
                    <div class="oj-flex-bar-end">
                    
                    <oj-button display="icons" chroming="borderless" type="button" class="WNDcls" accesskey="6" id ="WNDbuttonsMin" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onclick="if(this.disabled) return false; fnExitPrint(event)">
                       <span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
                       </oj-button>
                        <!--<oj-button display="icons" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>"  onclick="fnExitPrint(event); event.cancelBubble = true; event.returnValue = false;" chroming="borderless" type="button"></oj-button>-->
                    
                    <!--<B class="BTNicon"><span class="ICOflexcube"></span></B>-->
                    
                    <!--<div class="WNDbuttons">
                        --><!--<oj-button display="icons" chroming="borderless" type="button" class="WNDcls" id="WNDbuttons" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>"  onclick="fnExitPrint(event); event.cancelBubble = true; event.returnValue = false;">
                        <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                        </oj-button>--><!--
                    </div>-->
                    </div>
                </div>
            </div>
            <div class="WNDcontent bigwin" id="DIVScrContainer">
             <input type="Hidden" id="fromExtensible" name="fromExtensible" value="<%= StringEscapeUtils.escapeHTML(forExtensible)%>"></input>
            <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
                <div class="" id="prnResTree">
                    <div style="height: 611px; overflow-y:auto;" id="DIVMainTmp" class=""></div>
                    <div id="DIVFooter" class="DIVfooter">
                        <h2 class="LBLinv"><%=StringEscapeUtils.escapeHTML(pageFooter)%></h2>
                        <div class="DIVAudit">
                            <table summary="" id="TBLPageTAB_FOOTER" width="99%" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td valign="top" width="98%"></td>
                                        <td style="padding-left: 10px;" nowrap="nowrap">
                                            <%--<input onclick="fnExitPrint(event); event.cancelBubble = true; event.returnValue = false;" class="BTNfooter" value="Exit" id="BTN_EXIT_IMG" name="BTN_EXIT" type="button">--%>
                                            <oj-button value="Exit" id="BTN_EXIT_IMG" name="BTN_EXIT" onclick="fnExitPrint(event); event.cancelBubble = true; event.returnValue = false;" ><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_EXIT"))%></oj-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="masker" class="masker" style="display:none">
                    <div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none"><!--HTML5 Changes-->
                        <iframe id="ifr_AlertWin" class="frames" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
                    </div>
                    <div id="Div_ChildWin" style="display:none; width:100%; height:100%"></div>
                </div>
            </div>
        </div>
        
    </body>
</html>