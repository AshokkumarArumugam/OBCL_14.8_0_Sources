<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtBIReport.jsp
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

Copyright © 2010-2016 by Oracle Financial Services Software Limited..
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
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
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
    String Strlang          = (String)session.getAttribute("LANG");
    String langISOMap       = ((String)session.getAttribute("LANGISOMAP")).toLowerCase();
    String StrUserId        = (String) session.getAttribute("USERID");
    String entity        = (String) session.getAttribute("ENTITY");
    String strTheme         = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String browserCSS       = (String)session.getAttribute("BROWSER_CSS");
    int sessionInterval     =  session.getMaxInactiveInterval();
    FCUserGlobals Objuc     = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
   /* # BUG 15978732 fixes start */ 
    String funcID	    = FCUtility.validateParameter((String)request.getAttribute("functionid"));
    String uiXML	    = FCUtility.validateParameter((String)request.getAttribute("uixml"));
    String description      = FCUtility.validateParameter((String)request.getAttribute("description"));
    //Fix for Bug 17344217 start
    if(description!=null && !"null".equals(description)) {
        description=description.replace("_amp_", "&");//16903925 bug fixes
    }
    //Fix for Bug 17344217 End
    String screenType       = FCUtility.validateParameter((String)request.getAttribute("typeString"));
    String seqNo            = FCUtility.validateParameter((String)request.getAttribute("sequenceno"));
    String userFuncId	    = FCUtility.validateParameter((String)request.getAttribute("userFunctionId"));
    String routingType      = FCUtility.validateParameter((String)request.getAttribute("routingType"));
    String parentSeqNo      =  FCUtility.validateParameter((String)request.getAttribute("parentSeqNo"));
    /* # BUG 15978732 fixes end */ 
    String ieCss         = (String)session.getAttribute("IECSS");
    String FCJStream        = (String)session.getAttribute("FCJStream");
    String parentFunction   = FCUtility.validateParameter((String) request.getAttribute("parentFunction"));
    String parentOrigin     = FCUtility.validateParameter((String) request.getAttribute("parentOrigin"));
    String functionOrigin   = FCUtility.validateParameter((String) request.getAttribute("functionOrigin"));
    String clusterModified  = FCUtility.validateParameter((String)request.getAttribute("clusterModified"));
    String customModified   = FCUtility.validateParameter((String)request.getAttribute("customModified"));   
    String helpPath         = FCUtility.validateParameter((String)request.getAttribute("helpfile"));//helpfile changes
	String restrictReqd      = FCUtility.validateParameter((String)request.getAttribute("restrictReqd"));//jc2 changes //PIPA
	String restrictPrint      = FCUtility.validateParameter((String)request.getAttribute("restrictPrint"));//jc2 changes //PIPA
    if (uiXML == null)
        uiXML = "";
	
    Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
	String eodDesc = (String)itemDescMap.get("LBL_EOD_DESC");//jc2 24*7 changes//changes_for_24x7
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
    <!--<link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>-->
    <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
    <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(langISOMap)%>.css" rel="stylesheet" type="text/css"/>
    <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
     <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>
     <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>
    <!--<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>-->
    <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
    <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
    <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start-->
        <%--<%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%>--%><!--HTML5 Changes End -->
    
    <script type="text/javascript">
        //var dlgArg    = dialogArguments;
        var mainWin     = parent;
        var uiXML  = "<%= StringEscapeUtils.escapeURL(uiXML)%>";
    </script>
    <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     <script type="text/javascript" src="Script/ExtJS/ExtFuncs.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <!--<script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtBuildXML.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtensibleMEUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtensibleUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtPrint.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/Extensible.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     --><%-- Security bug SEC-12-Patch-081 fixes starts  --%><!--
    <script type="text/javascript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML)%>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     --><%-- Security bug SEC-12-Patch-081 fixes ends  --%><!--
    <script type="text/javascript" src="Script/ExtJS/ExtDatabinding.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtReport.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtFuncs.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
    
    <script type="text/javascript">
    var gInpDateFormat = "";
    var gAction        = "";
    var helpPath         = '<%=StringEscapeUtils.escapeJavaScript(helpPath)%>';//helpfile changes
    if(helpPath != null && helpPath != ''){ 
        helpPath = replaceAll(helpPath,"_BSLH_","\\");//helpfile changes
        helpPath = replaceAll(helpPath,"_FSLH_","/");//helpfile changes
        mainWin.extHelpFile ="Y";   
    }else{
        mainWin.extHelpFile ="N";   
    }
    mainWin.sessionInterval = '<%=StringEscapeUtils.escapeJavaScript(sessionInterval+"")%>';
    mainWin.inactiveTime  = 0;
    </script>
    <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    
    <script type="text/javascript">
    var xmlFileName;
    var xslFileName;
    var meBlockResponse     = "";
    var isPartialDOM        = false;
    var recDataLength       = new Array();
    //var timeLogsArray = new Array();
    var functionId 	= '<%= StringEscapeUtils.escapeJavaScript(funcID) %>';
    var uiXML 		= '<%= StringEscapeUtils.escapeJavaScript(uiXML) %>';
    var isDetailed      = true;
    var langCode        = "/<%= StringEscapeUtils.escapeJavaScript(Strlang)%>/";
    var strTheme        = '<%= StringEscapeUtils.escapeJavaScript(strTheme) %>';
    var screenTitle     = '<%= StringEscapeUtils.escapeJavaScript(description) %>';
    var seqNo           = '<%=StringEscapeUtils.escapeJavaScript(seqNo)%>';
    var parentSeqNo         = '<%=StringEscapeUtils.escapeJavaScript(parentSeqNo)%>';
    var userFuncId      = '<%= StringEscapeUtils.escapeJavaScript(userFuncId) %>';
    var screenType          = '<%=StringEscapeUtils.escapeJavaScript(screenType)%>';
    var routingType         = '<%=StringEscapeUtils.escapeJavaScript(routingType)%>';
    var FCJStream           = '<%=StringEscapeUtils.escapeJavaScript(FCJStream)%>';
    var parentFunction      = '<%=StringEscapeUtils.escapeJavaScript(parentFunction)%>';
    var parentOrigin        = '<%=StringEscapeUtils.escapeJavaScript(parentOrigin)%>';
    var functionOrigin      = '<%=StringEscapeUtils.escapeJavaScript(functionOrigin)%>';
    var clusterModified     = '<%= StringEscapeUtils.escapeJavaScript(clusterModified)%>';
    var customModified      = '<%= StringEscapeUtils.escapeJavaScript(customModified)%>';
	var restrictReqd        = '<%= StringEscapeUtils.escapeJavaScript(restrictReqd)%>';//jc2 changes //PIPA
	var restrictPrint        = '<%= StringEscapeUtils.escapeJavaScript(restrictPrint)%>';//jc2 changes //PIPA
	var eodDesc          = '<%=StringEscapeUtils.escapeJavaScript(eodDesc)%>';//jc2 24*7 changes//changes_for_24x7	
    var thirdChar = functionId.substring(2,3);
    window.frameElement.name = seqNo;
    parent.document.getElementById("testwin").id     = seqNo;
    parent.document.getElementById(seqNo).className     = "dhtmlwindow functionCont show";
 
   xmlFileName = mainWin.UIXmlPath + "/<%= StringEscapeUtils.escapeURL(Strlang) %>/" + uiXML + ".xml";
   xslFileName = "ExtDetail.xsl";
   var kernelJSFile="";
   var clusterJSFile="";
   var customJSFile="";
</script>

    <%
    if ("KERNEL".equalsIgnoreCase(FCJStream)) {
    %>
        <%
        if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
        %>
            <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML)%>_KERNEL.js"></script>-->
              <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_KERNEL";
                </script>
        <%
        }
        %>
    <%
    } else if ("CLUSTER".equalsIgnoreCase(FCJStream)) {
    %>
        <% 
        if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
        %>
            <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML)%>_KERNEL.js"></script>-->
               <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_KERNEL";
                </script>
            <%
            if ("Y".equalsIgnoreCase(clusterModified)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML)%>_CLUSTER.js"></script>-->
                   <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CLUSTER";
                </script>
            <%
            }
            %>
        <%
        } else if ("CLUSTER".equalsIgnoreCase(functionOrigin)) {
        %>
            <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML)%>_CLUSTER.js"></script>-->
              <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CLUSTER";
                </script>
        <%
        }
        %>
    <%
    } else if ("CUSTOM".equalsIgnoreCase(FCJStream)) {
    %>
        <%
        if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
        %>
            <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML)%>_KERNEL.js"></script>-->
            <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_KERNEL";
                </script>
            <%
            if ("Y".equalsIgnoreCase(clusterModified)) {
            %> 
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML)%>_CLUSTER.js"></script>-->
                <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CLUSTER";
                </script>
            <%
            }
            if ("Y".equalsIgnoreCase(customModified)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML)%>_CUSTOM.js"></script>-->
                    <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CUSTOM";
                </script>
                <%
                }
                %>
            <%
            } else if ("CLUSTER".equalsIgnoreCase(functionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML)%>_CLUSTER.js"></script>-->
                 <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CLUSTER";
                </script>
                <%
                if ("Y".equalsIgnoreCase(customModified)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML)%>_CUSTOM.js"></script>-->
                <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CUSTOM";
                </script>
                <%
                }
                %>
            <%
            } else if ("CUSTOM".equalsIgnoreCase(functionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML)%>_CUSTOM.js"></script>-->
                 <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CUSTOM";
                </script>
            <%
            }
            %>
        <%
        }
        %> 
        
    <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
    <!--<script type="text/javascript" src="Script/OJET/require-config.js"></script>-->
    <script type="text/javascript" src="Script/OJET/main_report.js"></script>
    
</head>
 <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
  <body class="BDYform" onkeydown="shortcut(event)"  onmousedown="fnMouseDownEvents(event)"  oncontextmenu="return false;" 
    onfocus="fnFocus();" onhelp= "return disableDefault();" onclick="mainWin.setActiveWindow(mainWin.document.getElementById('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>'), window)">   
     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <div   id="DIVWNDContainer">
            <!--<DIV class=WNDtitlebar id="WNDtitlebar" onmousedown="startDrag('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>', event)">
                <div class="WNDtitle" id="wndtitle">
                    <B class="BTNicon">
                        <span class="ICOflexcube"></span>
                    </B>
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(description)%>&nbsp;</h1>
                    <div class="WNDbuttons">
                        <a class="WNDcls" accesskey="7" id="WNDbuttons" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onclick="fnExit()">
                        <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                        </a>
                        --><%-- Security bug SEC-12-Patch-081 fixes starts  --%><!--
                        --><%--Fix for 18532714 starts--%><!--
                         <a class="WNDmin" accesskey="6" id ="WNDbuttonsMin" href="#" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%>" onclick="if(this.disabled) return false; mainWin.addTab('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>', '<%=StringEscapeUtils.escapeJavaScript(description)%>', event)" onkeydown="return fnHandleScrBtn(event)">
                          <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%></span>
                        </a>
                        --><%--Fix for 18532714 ends--%><!--
                         --><%-- Security bug SEC-12-Patch-081 fixes ends  --%><!--
                    </div>
                </div>
            </DIV>-->
             <DIV id="WNDtitlebar" >
                <div class="oj-flex-bar oj-sm-align-items-center oj-sm-margin-4x-start oj-sm-margin-4x-end bottom-border" id="wndtitle">
                    <div class="oj-flex-bar-start">
                    <h1><%=StringEscapeUtils.escapeHTML(description)%>&nbsp;</h1>
                    </div>
                    <div class="oj-flex-bar-end">
                       <oj-button display="icons" chroming="borderless" type="button" class="WNDcls" accesskey="7" id ="WNDbuttons" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%>" onclick="if(this.disabled) return false; mainWin.addTab('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>', '<%=StringEscapeUtils.escapeJavaScript(description)%>', event)" onkeydown="return fnHandleScrBtn(event)">
                       <span slot="startIcon" tabindex="-1" class="oj-panel-collapse-icon"></span>
                       </oj-button>
                       <oj-button display="icons" chroming="borderless" type="button" class="WNDcls" accesskey="6" id ="WNDbuttonsMin" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" on-oj-action="[[fnExitAll.bind(null,'')]]">
                       <span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
                       </oj-button>
                    </div>
                </div>
            </DIV>
            <div  id="DIVScrContainer">
                <div id="ResTree">
                    <div id="toolbar" class="DIVnav" style="display:none;">
                        <jsp:include page="SMHTLBAR.jsp" flush="true" /> 
                    </div>
                </div>
            </div>
            
            <div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none;z-index:6000"><!--HTML5 Changes-->
                <iframe id="ifr_AlertWin"   src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
            <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
        </div>     
        <div id="masker" class="masker" style="display:none">
           
            
            </div>
        </div>
         
    </body>
</html>
