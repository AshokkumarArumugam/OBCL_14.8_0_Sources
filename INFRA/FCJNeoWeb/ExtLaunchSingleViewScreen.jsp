<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtLaunchSingleViewScreen.jsp
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
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String StrlangISOMap   = (String)session.getAttribute("LANGISOMAP");
    String StrUserId       = (String) session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String strTheme     = (String)session.getAttribute("THEME");
    String Strlang         = (String)session.getAttribute("LANG");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/
    String ieCss         = (String)session.getAttribute("IECSS");
    
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
     
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String previous      = (String)itemDescMap.get("LBL_PREVIOUS");
    String next           = (String)itemDescMap.get("LBL_NEXT");
    
    FBContext fbContext = new FBContext(StrUserId);
    BranchLogger brnLogger = new BranchLogger(StrUserId);
    fbContext.setBrnLogger(brnLogger);
   /* # BUG 15978732 fixes start */ 
    String functId   = FCUtility.validateParameter(request.getParameter("functionId"));   
    /* # BUG 15978732 fixes end */ 
    String thirdChar ="";
    if (functId != null || "".equals(functId)){
        thirdChar = functId.substring(2,3);
    }
    /* # BUG 15978732 fixes start */ 
    String gscrPos = FCUtility.validateParameter(request.getParameter("gscrPos"));
    //String l_strTheme = request.getParameter("l_strTheme");
    String scrType = FCUtility.validateParameter(request.getParameter("scrType"));
    String l_exitLabel = FCUtility.validateParameter(request.getParameter("ExitLabel"));
    String l_okLabel = FCUtility.validateParameter(request.getParameter("OkLabel"));
    String functionOrigin=FCUtility.validateParameter(request.getParameter("functionOrigin"));
    String parentFunction=FCUtility.validateParameter(request.getParameter("parentFunction"));
    String parentOrigin=FCUtility.validateParameter(request.getParameter("parentOrigin"));
    String gAction        = FCUtility.validateParameter(request.getParameter("gAction"));
    String blockId        = FCUtility.validateParameter(request.getParameter("blockId"));
    String txnBranchUC      = FCUtility.validateParameter(request.getParameter("txnBranchUC"));
    String g_txnBranch      = FCUtility.validateParameter(request.getParameter("g_txnBranch"));
    /* # BUG 15978732 fixes end */ 
    String FCJStream        = (String)session.getAttribute("FCJStream");
    String clusterModified  = FCUtility.validateParameter((String)request.getParameter("clusterModified"));
    String customModified   = FCUtility.validateParameter((String)request.getParameter("customModified"));
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<script type="text/javascript">
    //var dlgArg         = dialogArguments;
    var gAction        = '';
    //var timeLogsArray = new Array();
    var mainWin        = parent.mainWin;
    var functionId     = '<%=StringEscapeUtils.escapeJavaScript(functId)%>';
    var g_txnBranch    = '<%=StringEscapeUtils.escapeJavaScript(g_txnBranch)%>';
    var isSingleView   = true;
    gscrPos = '<%=StringEscapeUtils.escapeJavaScript(gscrPos)%>';
    var functionOrigin='<%=StringEscapeUtils.escapeJavaScript(functionOrigin)%>';
    var parentFunction='<%=StringEscapeUtils.escapeJavaScript(parentFunction)%>';
    var parentOrigin='<%=StringEscapeUtils.escapeJavaScript(parentOrigin)%>';
    var blockId='<%=StringEscapeUtils.escapeJavaScript(blockId)%>';
    var strTheme = parent.strTheme;
    
    var gInpDateFormat = "dd/MM/yyyy";
    var FCJStream           = '<%=StringEscapeUtils.escapeJavaScript(FCJStream)%>';
    var clusterModified     = '<%= StringEscapeUtils.escapeJavaScript(clusterModified)%>';
    var customModified      = '<%= StringEscapeUtils.escapeJavaScript(customModified)%>';
    /*function fnPopulateParentContent(){
          var html="";
          var bind_vars = new Array();
          var buttons = document.getElementsByTagName("BUTTON");
          if(buttons  && buttons.length>0  ){
             for(var count=0;count<buttons.length;count++){
                if(buttons[count].previousSibling){
                   if(buttons[count].attributes("onclick").value.toUpperCase().indexOf('LOV_'+buttons[count].previousSibling.name) == 0){
                      var lovName = buttons[count].attributes("onclick").value;
                      lovName  = lovName.substring(0 , lovName.indexOf(".show_lov"));
                      var lov = eval("curWin." + lovName);
                      bind_vars = lov.bind_vars.split("~");
                      for(var iCount= 0 ;iCount <bind_vars.length;iCount++){
                          var fields = curWin.document.getElementsByName(bind_vars[iCount].split("!")[0]);
                           for(var iiCount=0;iiCount<fields.length;iiCount++){
                             html+=fields[iiCount].outerHTML;
                           }
                      }
                    }
                }
             }      
          }
          document.getElementById("parentContent").innerHTML = html;
    }*/
    
</script>
<noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
 <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
<script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
 <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
<script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script type="text/javascript" src="Script/ExtJS/ExtensibleUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script type="text/javascript" src="Script/ExtJS/ExtFuncs.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>

<%
    if("C".equalsIgnoreCase(thirdChar) || "R".equalsIgnoreCase(thirdChar) || "B".equalsIgnoreCase(thirdChar)){
%>
 <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
<script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(functId)%>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
 <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <%
    } else{
    %>
 <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
<script type="text/javascript" src="Script/JS/SYS/<%= StringEscapeUtils.escapeURL(functId) %>_SYS.js"></script>
 <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <%
    }
    if ("WB".equalsIgnoreCase(scrType)) {//FC10.3 WB CHANGES
    %>
        <script type="text/javascript" src="Script/JS/DenomDetails.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%
    } if ("KERNEL".equalsIgnoreCase(FCJStream)) {
    %>
        <%
        if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
        %>
            <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(functId) %>_KERNEL.js"></script>
        <%
        }
        %>
    <%
    } else if ("CLUSTER".equalsIgnoreCase(FCJStream)) {
    %>
        <%
        if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
        %>
            <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(functId) %>_KERNEL.js"></script>
            <%
            if ("Y".equalsIgnoreCase(clusterModified)) {
            %>
                <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(functId) %>_CLUSTER.js"></script>
            <%
            }
            %>
        <%
        } else if ("CLUSTER".equalsIgnoreCase(functionOrigin)) {
        %>
            <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(functId) %>_CLUSTER.js"></script>
        <%
        }
        %>
    <%
    } else if ("CUSTOM".equalsIgnoreCase(FCJStream)) {
    %>
        <%
        if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
        %>
            <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(functId) %>_KERNEL.js"></script>
                <%
                if ("Y".equalsIgnoreCase(clusterModified)) {
                %> 
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(functId) %>_CLUSTER.js"></script>
                <%
                }
                if ("Y".equalsIgnoreCase(customModified)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(functId) %>_CUSTOM.js"></script>
                <%
                }
                %>
        <%
        } else if ("CLUSTER".equalsIgnoreCase(functionOrigin)) {
        %>
            <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(functId) %>_CLUSTER.js"></script>
            <%
            if ("Y".equalsIgnoreCase(customModified)) {
            %>
                <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(functId) %>_CUSTOM.js"></script>
            <%
            }
            %>
        <%
        } else if ("CUSTOM".equalsIgnoreCase(functionOrigin)) {
        %>
            <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(functId) %>_CUSTOM.js"></script>
        <%
        }
        %>
    <%
    }
    %>
<script type="text/javascript" src="Script/ExtJS/ExtDatabinding.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script type="text/javascript" src="Script/ExtJS/ExtSingleView.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>

<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
        <title><%=StringEscapeUtils.escapeHTML(FCUtility.validateParameter(request.getParameter("title")))%></title><%-- BUG 15978732 fixes start --%>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
    <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">
        <link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css">
        <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
        <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
        <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_single_view.js"></script>

    </head>
    
    <body onload="" class=""
            onkeydown="return SingleViewAccessKeys(event)" onhelp= "return disableDefault();" oncontextmenu="return false;">
        
        
        
        <oj-dialog id="scrollingDialog" initial-visibility="show" 
                      position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center" 
                      position.of="window"  
                      style=" min-width: 70vw;min-height: 100vh;max-height: 100vh;height: 100vh; position: relative;"  
                      class="oj-sm-width-half">
               <div slot="header" class="oj-dialog-title oj-flex-bar oj-sm-align-items-center bottom-border" style="width: 100%"  id="WNDtitlebar">
                    
                   
                        <!--<div id="wndtitle">  </div>-->
                            <div class="oj-flex-bar-start">
                                <h1><%=StringEscapeUtils.escapeHTML(request.getParameter("title"))%></h1>
                </div>
                             
                            <div class="oj-flex-bar-end">
                            <OJ-BUTTON class="oj-button oj-button-half-chrome oj-button-text-only" chroming="solid"  tabindex="-1" onclick=fnDispPrevSingleViewRecord()><span slot="startIcon" class="oj-ux-ico-caret-left"></span></OJ-BUTTON>
                            
                                <OJ-BUTTON class="oj-button oj-button-half-chrome oj-button-text-only" chroming="solid" tabindex="-1"  onclick=fnDispNextSingleViewRecord()><span slot="startIcon" class="oj-ux-ico-caret-right"></span></OJ-BUTTON>
                            <!--<oj-button display="icons" chroming="borderless" type="button" class="WNDcls" accesskey="6" id ="WNDbuttonsMin" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onclick="fnExitSingleView()">
                               <span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
                               </oj-button>-->
                                
            </div>
                      
                    
                <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
                    
                </div>
                
                <div slot="body">
           
        <DIV class="" id="DIVWNDContainer">  
            <div class="oj-flex-bar oj-flex-bar-start oj-sm-align-items-center">
                        <div class="footer-btn-container oj-flex-bar-start">
                        </div>
                        <div class="footer-btn-container oj-flex-bar-end">
                             <div class="oj-flex-bar-end">
                                <!--<OJ-BUTTON class="oj-button oj-button-half-chrome oj-button-text-only" chroming="solid"  tabindex="-1" onclick=fnDispPrevSingleViewRecord()><span slot="startIcon" class="oj-ux-ico-caret-left"></span></OJ-BUTTON>
                            
                                <OJ-BUTTON class="oj-button oj-button-half-chrome oj-button-text-only" chroming="solid" tabindex="-1"  onclick=fnDispNextSingleViewRecord()><span slot="startIcon" class="oj-ux-ico-caret-right"></span></OJ-BUTTON>-->
                            </div>  
                        </div>
                    </div>    
            <DIV class="" id="DIVScrContainer" >  <!--UI alignment 12.1 -->
                
                <DIV id=ResTree class="">
                    <div  id="DIVMainTmp" class="">
                        <div id="SINGLE_VIEW">
                        </div>
                    </div>
                </DIV>     
                
               
                <!--<div class="">
                    <TABLE class="" cellSpacing=0 cellPadding=4 width="100%" summary="">
                        <TBODY>
                            <TR>
                              <TD width="80%">&nbsp;</TD>
                                <TD nowrap="nowrap" width="20%">
                                   --><%-- <INPUT class=BTNfooter onblur="this.className='BTNfooter'" onmouseover="this.className='BTNfooterH'" onclick=fnSaveSingleViewScreen() onmouseout="this.className='BTNfooter'" type=button value="<%=StringEscapeUtils.escapeJavaScript(l_okLabel)%>" name=BTN_OK> 
                                        <INPUT class=BTNfooter id=BTN_EXIT_IMG onclick=fnExitSingleView() type=button value="<%=StringEscapeUtils.escapeJavaScript(l_exitLabel)%>" name=BTN_EXIT>--%><!--
                                        <oj-button  name=BTN_OK onclick=fnSaveSingleViewScreen()><%=StringEscapeUtils.escapeHTML(l_okLabel)%></oj-button>
                                        <oj-button id=BTN_EXIT_IMG  onclick=fnExitSingleView() name=BTN_EXIT onkeydown="return fnHandleSVBtn(event)"><%=StringEscapeUtils.escapeHTML(l_exitLabel)%></oj-button>
                                </TD>
                            </TR>
                        </TBODY>
                    </TABLE>
                </div>-->
                </div>
            </div>
        </div>
         <div slot="footer">
                <div class="oj-flex-bar oj-sm-align-items-center">
                    <div class="footer-btn-container oj-flex-bar-start">
                    </div>
                    <div class="footer-btn-container oj-flex-bar-end">
                        <oj-button class="oj-sm-margin-1x" chroming="solid"  id=BTN_EXIT_IMG  on-oj-action="[[fnExitSingleView.bind(null)]]"  name=BTN_EXIT onkeydown="return fnHandleSVBtn(event)"><%=StringEscapeUtils.escapeHTML(l_exitLabel)%></oj-button>
                         <oj-button class="oj-sm-margin-1x action-button-primary" chroming="solid"   name=BTN_OK on-oj-action="[[fnSaveSingleViewScreen.bind(null)]]"   ><%=StringEscapeUtils.escapeHTML(l_okLabel)%></oj-button>
                    </div>
                </div>
                </div>
        <div id="parentContent" style="display:none"></div>
        
       
       
    </oj-dialog>
     <!--<div id="masker" class="masker" style="display:none">
            
        </div>-->
            <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
            </div>
            <div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none;z-index:6000">
                <iframe id="ifr_AlertWin" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
    </body>
    
</html>
