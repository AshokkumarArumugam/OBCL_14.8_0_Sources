<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtEditor.jsp
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

Copyright � 2004-2016 by Oracle Financial Services Software Limited..
---------------------------------------------------------------------------------------------------- 
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css

-------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger" %>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="java.util.Map"%>
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
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String ieCss         = (String)session.getAttribute("IECSS");
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN"); /* # BUG SEC-12-Patch-072 fixes */
    //FCUserGlobals Objuc    = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);

    BranchLogger brnLogger = new BranchLogger(StrUserId);
    String TerminalId = (String) FCUtility.validateParameter(FCUtility.getCleintIPAddr(request));
    if (StrUserId == null || "".equals(StrUserId)){
        StrUserId = TerminalId;
    }
    FBContext fbContext = new FBContext(StrUserId);
    fbContext.setBrnLogger(brnLogger);
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
    String okLabel      = (String) itemDescMap.get("LBL_OK");
    String cancelLabel  = (String) itemDescMap.get("LBL_CANCEL");
   /* # BUG 15978732 fixes start */ 
    String elemId       = FCUtility.validateParameter(request.getParameter("elemId"));
    String maxLength    = FCUtility.validateParameter(request.getParameter("maxLength"));  
       // String editorSrcElem= FCUtility.validateParameter(request.getParameter("editorSrcElem"));/* security fixes for WF */
    String recNum       = FCUtility.validateParameter(request.getParameter("recNum"));  
    /* # BUG 15978732 fixes end */ 
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    /* # BUG 15978732 fixes start */ 
    String readOnlyAttr = FCUtility.validateParameter(request.getParameter("readOnlyAttr")); 
	String isMesv = FCUtility.validateParameter(request.getParameter("isMesv"));  /*9NT1606_12_4_RETRO_12_2_26230337 changes*/
    String title        =FCUtility.validateParameter(request.getParameter("title"));
    /* # BUG 15978732 fixes end */ 
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<HTML id="EditorHTML" CLASS="HTMLEditor" lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>"> 
    <head>
        <title><%=StringEscapeUtils.escapeHTML(FCUtility.validateParameter(request.getParameter("title")))%></title><%-- BUG 15978732 fixes start --%>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
        <!--HTML5 Changes Start-->
        <!--<%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
            <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">
            
            <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript">
            //var dlgArg         = dialogArguments;    
            var mainWin        = parent.mainWin;
            var elemId         = '<%=StringEscapeUtils.escapeJavaScript(elemId)%>'; 
            var maxLength      = Number('<%=StringEscapeUtils.escapeJavaScript(maxLength)%>');
            var recNum         = Number('<%=StringEscapeUtils.escapeJavaScript(recNum)%>');
			var strTheme    = '<%= StringEscapeUtils.escapeJavaScript(strTheme)%>';
             //editorSrcElem is removed 
            /* security fixes for WF */
            var title           =  '<%=StringEscapeUtils.escapeJavaScript(title)%>';
            if(typeof(parent.restrictReqd) != undefined) var restrictReqd = parent.restrictReqd;//jc2 changes//PIPA
			if(typeof(parent.restrictPrint) != undefined) var restrictPrint = parent.restrictPrint;//jc2 changes//PIPA
        </script>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        
        <!--<script type="text/javascript" src="Script/JS/Alert.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
        <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_extEditor.js"></script>
    </head>
    <BODY onkeydown="return accessKeyEditor(event);"  oncontextmenu="return false;" onhelp="return false;">
      
            
            <oj-dialog id="scrollingDialog" initial-visibility="show" 
                      position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center" 
                      position.of="window"  
                      style=" min-width: 70vw;min-height: 100vh;max-height: 100vh;height: 100vh;"  
                      class="oj-sm-width-half">
            
            <div slot="header" style="width: 100%"  class="oj-dialog-title oj-flex-bar oj-sm-align-items-center bottom-border"  id="WNDtitlebar">
                <!--<B class="BTNicon"><span class="ICOflexcube"></span></B>-->
                
                <div class="oj-flex-bar-start">
                                <h1><%=StringEscapeUtils.escapeHTML(request.getParameter("title"))%></h1>
                </div>
                
                <div class="oj-flex-bar-end">
                        <oj-button display="icons" chroming="borderless" type="button" class="WNDcls" accesskey="6" id ="WNDbuttonsMin" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>"  onclick="fnExitEditor()" onkeydown="return fnHandleEditorBtn(event)">
                            <span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
                       </oj-button>
                    </div>
                
                
                <!--<div class="WNDbuttons">
                    <a class="WNDcls" id="WNDbuttons" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>"  onclick="fnExitEditor()" onkeydown="return fnHandleEditorBtn(event)">
                    <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                    </a>
                </div>-->
                </div>
            <!--//Fix for 25805078 Starts-->
            <%if(isMesv.equalsIgnoreCase("true")) {%>
                <DIV slot="body" id="DIVScrContainer" > <!-- Fix for 22045039 - increased width to 40 -->

                <%if(readOnlyAttr.equalsIgnoreCase("true")) {%>
                    
                    <oj-text-area id="TA"
                        class="form-control-full-width"
                        value=""                         
                        rows="15"
                        readonly="true"                        
                        >
                    </oj-text-area>
                    
                    <!-- Fix for 22045039 - increased rows and cols -->
                <%} else {%>
                    
                    <oj-text-area id="TA"
                        rows="15"
                        value=""                         
                        class="form-control-full-width"              
                        >
                    </oj-text-area>
                    
                    
                    </div>
                    <div slot="footer" id="buttonDiv">
                        <div class="oj-flex-bar oj-sm-align-items-center">
                            <div class="footer-btn-container oj-flex-bar-start">
                            </div>
                            <div class="footer-btn-container oj-flex-bar-end"> 
                                <oj-button class="oj-sm-margin-1x" chroming="solid"  id=BTN_EXIT_IMG  onclick=fnExitEditor() name=BTN_EXIT onkeydown="return fnHandleEditorBtn(event)"><%=StringEscapeUtils.escapeHTML(cancelLabel)%></oj-button>
                                <oj-button class="action-button-primary oj-sm-margin-1x" chroming="solid"   name=BTN_OK onclick=fnOK()><%=StringEscapeUtils.escapeHTML(okLabel)%></oj-button>
                            </div>
                        </div>
                    </div>
                    <!-- Fix for 22045039 - increased rows and cols -->
                <%}%>
             <%} else {%>
                    <DIV slot="body" class="" id="DIVScrContainer" > <!-- Fix for 22045039 - increased width to 40 -->
                         
                    <%
                        if(readOnlyAttr.equalsIgnoreCase("true")) {
                    %>
                    
                    <oj-text-area id="TA"
                        rows="15"
                        value=""                         
                        class="form-control-full-width"
                        readonly="true"                        
                        >
                    </oj-text-area>
                   
                    <!-- Fix for 22045039 - increased rows and cols -->
                    <%
                        } else {
                    %>
                    
                    <oj-text-area id="TA"
                        rows="15"
                        value=""                         
                        class="form-control-full-width"                       
                        >
                    </oj-text-area>
                    
                    </div>
                  <div slot="footer" id="buttonDiv">
                        <div class="oj-flex-bar oj-sm-align-items-center">
                            <div class="footer-btn-container oj-flex-bar-start">
                            </div>
                            <div class="footer-btn-container oj-flex-bar-end"> 
                                <oj-button class="oj-sm-margin-1x" chroming="solid"  id=BTN_EXIT_IMG  onclick=fnExitEditor() name=BTN_EXIT onkeydown="return fnHandleEditorBtn(event)"><%=StringEscapeUtils.escapeHTML(cancelLabel)%></oj-button>
                                <oj-button class="action-button-primary oj-sm-margin-1x" chroming="solid"   name=BTN_OK onclick=fnOK()><%=StringEscapeUtils.escapeHTML(okLabel)%></oj-button>
                            </div>
                        </div>
                            </div>
                    <!-- Fix for 22045039 - increased rows and cols -->
                    <%
                        }
                    %>
                <%}%>            

			<!--9NT1606_12_4_RETRO_12_2_26230337 ends-->
                     <%-- # BUG SEC-12-Patch-072 fixes start --%>
                    <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
                    <%-- # BUG SEC-12-Patch-072 fixes end --%>
                
                
            
            <!--<div class="WNDfootermodal" id="buttonDiv">
                    <div class="WNDfbuttons">
                    --><%--<DIV ALIGN=CENTER style="margin-top:5px;">
            <table width="99%" border="0" cellspacing="0" cellpadding="0" summary="">
                <tr>
                    <td width="95%">&nbsp;</td>
                    <td valign="middle" style="white-space:nowrap;">
                        <INPUT class=BTNfooter id=BTN_OK_IMG onclick="fnOK()" onblur="this.className='BTNfooter'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" type=button VALUE=<%=StringEscapeUtils.escapeJavaScript(okLabel)%> name=BTN_OK> 
                        <INPUT class=BTNfooter id=BTN_EXIT_IMG onclick="window.close()"  onblur="this.className='BTNfooter'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" type=button VALUE=<%=StringEscapeUtils.escapeJavaScript(cancelLabel)%> name=BTN_EXIT>
                    </td>
                </tr>
            </table> 
                </DIV>--%><!--
                    
            </div>
            </div>-->
       
       
        
        
        <div id="Div_AlertWin"   onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none;z-index:6000"><!--HTML5 Changes-->
                <iframe id="ifr_AlertWin"  src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
        <div id="masker" class="masker" style="display:none">
            
           
            
        </div>
            <div id="Div_ChildWin">
            </div>
        </oj-dialog>
      
    </BODY>            
</HTML>
