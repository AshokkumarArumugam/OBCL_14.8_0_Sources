<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : LauncherBIReport.jsp
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
    String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
    String StrUserId        = (String) session.getAttribute("USERID");
    String entity        = (String) session.getAttribute("ENTITY");
    String strTheme         = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String browserCSS       = (String)session.getAttribute("BROWSER_CSS");
    int sessionInterval     =  session.getMaxInactiveInterval();
    FCUserGlobals Objuc    = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
  /* # BUG 15978732 fixes start */ 
    String funcID		=  FCUtility.validateParameter((String)request.getAttribute("functionid"));
    String uiXML		=  FCUtility.validateParameter((String)request.getAttribute("uixml"));
    String description          =  FCUtility.validateParameter((String)request.getAttribute("description"));
	String restrictReqd      = FCUtility.validateParameter((String)request.getAttribute("restrictReqd"));//jc2 changes //PIPA
	String restrictPrint      = FCUtility.validateParameter((String)request.getAttribute("restrictPrint"));//jc2 changes //PIPA
    //Fix for Bug 17344217 start
    if(description!=null && !"null".equals(description)) {
        description=description.replace("_amp_", "&");//16903925 bug fixes
    }
    //Fix for Bug 17344217 End
    String screenType           =  FCUtility.validateParameter((String)request.getAttribute("typeString"));
    String seqNo        =  FCUtility.validateParameter((String)request.getAttribute("sequenceno"));
    String actionseqNo      = FCUtility.validateParameter((String)request.getAttribute("actionSeqNo"));
    String userFuncId		=  FCUtility.validateParameter((String)request.getAttribute("userFunctionId"));
      /* # BUG 15978732 fixes end */ 
    String CSRFtoken        = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/
    String ieCss         = (String)session.getAttribute("IECSS");
    if (uiXML == null)
        uiXML = "";
	
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
      
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
	String eodDesc = (String)itemDescMap.get("LBL_EOD_DESC");//jc2 24*7 changes//changes_for_24x7
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
    <link href="Theme/<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>
    <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
    <link href="Theme/<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
    <link href="Theme/<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
    
    <script type="text/javascript">
        //var dlgArg    = dialogArguments;
        var mainWin     = parent;
    </script>
    <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
      <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
      <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/GlobalConstants.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/AuditTrail.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/UIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Util.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%-- <script type="text/javascript" src="Script/JS/DateUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> --%>
    <script type="text/javascript" src="Script/JS/AmountUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/MaskFormatter.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Validations.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/BuildXML.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/TabContent.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/TabPersist.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/FCJReport.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
      <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <script type="text/javascript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
      <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <script type="text/javascript" src="Script/JS/Databinding.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Print.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/FCJReport.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
      <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <script type="text/javascript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML) %>.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
      <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <script type="text/javascript">
    var gInpDateFormat = "";
    var gAction        = "";
    mainWin.sessionInterval = <%=StringEscapeUtils.escapeJavaScript(sessionInterval+"")%>;
    mainWin.inactiveTime  = 0;
    </script>
    <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    
    <script type="text/javascript">
    var cache1, cache2;
    var xmlFileName;
    var xslFileName;
    var meBlockResponse     = "";
    var isPartialDOM        = false;
    var recDataLength       = new Array();
    //var timeLogsArray = new Array();
    var functionId 	= '<%= StringEscapeUtils.escapeJavaScript(funcID) %>';
    var uiXML 		= '<%= StringEscapeUtils.escapeJavaScript(uiXML) %>';
    var parentFunc;
    var isDetailed      = true;
    var langCode        = "/<%= StringEscapeUtils.escapeJavaScript(Strlang)%>/";
    var strTheme        = '<%= StringEscapeUtils.escapeJavaScript(strTheme) %>';
    var screenTitle     = '<%= StringEscapeUtils.escapeJavaScript(description) %>';
    var seqNo           = '<%=StringEscapeUtils.escapeJavaScript(seqNo)%>';
    var actionseqNo               = '<%=StringEscapeUtils.escapeJavaScript(actionseqNo)%>';
    var userFuncId      = '<%= StringEscapeUtils.escapeJavaScript(userFuncId) %>';
	var eodDesc          = '<%=StringEscapeUtils.escapeJavaScript(eodDesc)%>';//jc2 24*7 changes//changes_for_24x7
    window.frameElement.name = seqNo;
    parent.document.getElementById("testwin").id     = seqNo;

    cache1      = new Image();
    cache1.src	= "Images/Exit2.gif";
    cache2      = new Image();
    cache2.src	= "Images/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>/Icons/Cancel.gif";
			
    var thirdChar = functionId.substring(2,3);
    parentFunc 	= functionId.substring(2,0) + "D" + functionId.substring(3,functionId.length);
    if (thirdChar == "S") {
        isDetailed = false;
    }
    
    if (uiXML == "") {
        xmlFileName = mainWin.UIXmlPath + "/<%= StringEscapeUtils.escapeURL(Strlang) %>/" + parentFunc + ".xml";
    } else {
        xmlFileName = mainWin.UIXmlPath + "/<%= StringEscapeUtils.escapeURL(Strlang) %>/" + uiXML + ".xml";
    }

    if (screenTitle ==''){
        var xmlDoc = mainWin.loadXML(xmlFileName);
        screenTitle = selectSingleNode(xmlDoc, "//FORM/SCREEN[@MAIN_WIN='Y']/@TITLE").text;
    }

   var gCurrentScreen = "CVS_MAIN";
    if (isDetailed) {
            xslFileName = "Detail.xsl";
    }	
    else {
            xslFileName = "Summary.xsl";
    }

</script>
    <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <% if ( "".equals(description))
        {%>
    <script type="text/javascript">
            document.title = screenTitle;         
            </script>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%}
    else {%>
    <title>
      <%= StringEscapeUtils.escapeHTML(description) %>
    </title>
    <%}
    %>
  </head>
  <%-- # BUG SEC-12-Patch-063 fixes start --%>
    <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
  <body class="BDYform" onkeydown="shortcut(event)" onload="fnLoad(xmlFileName, xslFileName,''); parent.unmask();" onmousedown="fnMouseDownEvents(event)"  oncontextmenu="return false;" 
    onfocus="fnFocus();" onhelp= "return disableDefault();" onclick="mainWin.setActiveWindow(mainWin.document.getElementById('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>'), window)">    
      <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
      <%-- # BUG SEC-12-Patch-063 fixes end --%>
        <div class="WNDcontainer" id="DIVWNDContainer">
            <DIV class=WNDtitlebar id="WNDtitlebar" onmousedown="startDrag('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>', event)">
                <div class="WNDtitle" id="wndtitle">
                    <B class="BTNicon">
                        <span class="ICOflexcube"></span>
                    </B>
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(description)%>&nbsp;</h1>
                    <div class="WNDbuttons">
                        <a class="WNDcls" accesskey="7" id="WNDbuttons" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onclick="fnExit()">
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
            <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
                <div id="ResTree">
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
