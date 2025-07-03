<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : DocumentSubmit.jsp
**
** Module       : FCJNeoWeb
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

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css

-------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.BranchUserGlobals"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.BranchConfig"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger" %>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%
request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
String jsParser         = (String)session.getAttribute("JS_PARSER");
String strTheme         = (String)session.getAttribute("THEME");
String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
String ieCss            = (String)session.getAttribute("IECSS");
String browserCSS       = (String) session.getAttribute("BROWSER_CSS");
String CSRFtoken        = (String)session.getAttribute("X-CSRFTOKEN");
String action            = (String)request.getParameter("action");
String entity            = (String)session.getAttribute("ENTITY");
String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
 <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//<%=StringEscapeUtils.escapeHTML(StrlangISOMap.toUpperCase())%>">
 <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
<%
        request.setCharacterEncoding("UTF-8");
        FCUserGlobals uc    = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
        String user         = "";
        if(uc != null)
            user = uc.getCurrUser();
        BranchLogger brnLogger = new BranchLogger(user);
        String TerminalId = (String) FCUtility.validateParameter(FCUtility.getCleintIPAddr(request));
        if (user == null || "".equals(user)){
            user = TerminalId;
        }
        FBContext fbContext = new FBContext(user);
        fbContext.setBrnLogger(brnLogger);
        fbContext.getBrnLogger().dbg("In DocumentSubmit.jsp---->");
        String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
        Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+BranchConstants.DEFAULT_LANGCODE + "~" + entity, branchIdentifier,user);
           
        String sTitle           = (String) itemDescMap.get("LBL_SUBMIT");
        String lblDocPath       =(String) itemDescMap.get("LBL_DOCUMENT_PATH");
        String lblSubmit        =(String) itemDescMap.get("LBL_SUBMIT");
        String lblCancel        =(String) itemDescMap.get("LBL_CANCEL");
        String noScriptLabel    = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
        String nodocpath        =  (String)itemDescMap.get("LBL_NODOC_PATH");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
    <title><%=StringEscapeUtils.escapeHTML(sTitle)%> </title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content=0>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <!--<script type="text/javascript" src="Script/JS/UIUtil.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
    <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
    <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
    <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
    <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
        <!--HTML5 Changes Start-->
        <!--
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%>
-->
<!--HTML5 Changes End -->
    
            <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>
            <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
    
    <script language="JavaScript">
    var csrfVal = "<%= StringEscapeUtils.escapeJavaScript(CSRFtoken)%>";
    var nodocpath = "<%= StringEscapeUtils.escapeJavaScript(nodocpath)%>";
    function checkMandatory(){
        if(document.getElementById("BLK_DOC_UPLOAD__DOCPTH").value==""){            
            alert(nodocpath);
            return false;
        }
		document.getElementById('subbtn').disabled=true;
        return true;
    }
    function fncloseUpload(){
        var childDivObj = parent.parent.document.getElementById("ChildWin");
        childDivObj.getElementsByTagName("IFRAME")[0].src = "";
        parent.parent.document.getElementById("Div_ChildWin").removeChild(childDivObj);
    }
    
    function documentSubmitWindowWidth(){
                    //debugger;
                    /*
                                try{
                        parent.document.getElementById("DIVbody").style.width = "100%";
                        parent.document.getElementById("DIVbody").style.zIndex= 5980;
                        
                                }
                                catch(e){
                                    console.log(e);
                                }
                                */
			}

    </script>
        <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_documentSubmit.js"></script>
    </head>     
    <body>
        <div id="DIVbody" slot="body">   
        <%
		if(action.equals("RatioUpload")){
		%>
                <!-- 25081813 starts (removed CSRF token as it is already passed in hidden field)!-->
		<!--<form id="fileUploadForm" name="fileUploadForm" onsubmit="return checkMandatory()" action="FCDocumentControllerServlet?X-CSRFTOKEN=<%= StringEscapeUtils.escapeJavaScript(CSRFtoken)%>&Action=<%=StringEscapeUtils.escapeHTML(action)%>" method="post" target="ResponseFrame" enctype="multipart/form-data"> !-->
                <form id="fileUploadForm" name="fileUploadForm" onsubmit="return checkMandatory()" action="FCDocumentControllerServlet?Action=<%=StringEscapeUtils.escapeHTML(action)%>" method="post" target="ResponseFrame" enctype="multipart/form-data">
		<%
		}else{
		%>
		<!--form id="fileUploadForm" name="fileUploadForm" onsubmit="return checkMandatory()" action="FCDocumentControllerServlet?X-CSRFTOKEN=<%= StringEscapeUtils.escapeJavaScript(CSRFtoken)%>" method="post" target="ResponseFrame" enctype="multipart/form-data">		!-->
                <form id="fileUploadForm" name="fileUploadForm" onsubmit="return checkMandatory()" action="FCDocumentControllerServlet" method="post" target="ResponseFrame" enctype="multipart/form-data">
                <!-- 25081813 ends !-->
		<%}
		%>
           <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
           <div style="margin-top:40px;margin-left:38px;">
                <div>
                    <label for="BLK_DOC_UPLOAD__DOCPTH" id="Path" class="LBLstd"><%=StringEscapeUtils.escapeHTML(lblDocPath)%></label>
                    <input id="BLK_DOC_UPLOAD__DOCPTH" title="Document Path" type="file" name="DOCPTH"/>
                    <label class="LBLinv" for="docCode"></label><input id="docCode" type="hidden" name="docCode">
                    <label class="LBLinv" for="docDescription"></label><input id="docDescription" type="hidden" name="docDescription">
                </div>    
                <div id="DIVFooter">   
                <!--
                    <button class="BTNtext" id="subbtn" type="submit"><%=StringEscapeUtils.escapeHTML(lblSubmit)%></button>
                    <button class="BTNtext" onclick="fncloseUpload();"><%=StringEscapeUtils.escapeHTML(lblCancel)%></button>
                    -->
                    
                                    <div class="oj-flex-bar" style="margin-bottom:10px">
                                     
                                     <div class="oj-sm-margin-4x-top1 oj-flex-bar-end">
                                     <div class="oj-sm-padding-2x-end">
                                            <oj-button chroming="solid" class="oj-button-sm" display="icons" 
                                                            id="BTN_CANCEL" 
                                                            on-oj-action="[[function() {fncloseUpload()}.bind(null)]]"
                                                            name=<%=StringEscapeUtils.escapeHTML(lblCancel)%>
                                                            label='<%=StringEscapeUtils.escapeHTML(lblCancel)%>'
                                                    >     
                                            </oj-button>
                                        </div>        
                                            <oj-button  class="action-button-primary" chroming="solid" display="icons" 
                                                                id="BTN_SAVE"
                                                                 type="submit" 
                                                                 name=<%=StringEscapeUtils.escapeHTML(lblSubmit)%>
                                                                 value=<%=StringEscapeUtils.escapeHTML(lblSubmit)%>
                                                                label='<%=StringEscapeUtils.escapeHTML(lblSubmit)%>'
                                                        >
                                                        <%=StringEscapeUtils.escapeHTML(lblSubmit)%>
                                             </oj-button>                               
                </div>
            </div>	
			 
                </div>
            </div>	
        </form>
        </div>
    </body>
</html>
