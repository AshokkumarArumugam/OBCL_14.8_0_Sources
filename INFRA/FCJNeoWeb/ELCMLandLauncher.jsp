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
    if(description!=null && !"null".equals(description)) {
        description=description.replace("_amp_", "&");//16903925 bug fixes
    }
    String appDbg           = (String) request.getAttribute("APPLOG");
    String webDbg           = (String) request.getAttribute("WEBLOG");   
    String dbDbg           = (String) request.getAttribute("DBLOG");
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
    String inLoadTime           =FCUtility.validateParameter( request.getParameter("inTime"));//Performance Changes
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
    String loggingReqd      = FCUtility.validateParameter((String)request.getAttribute("loggingReqd"));
    String summaryQryCriteria   = FCUtility.validateParameter(String.valueOf(request.getAttribute("summaryQryCriteria")));
    /* Bug 19609280 - Asynchronous summary export changes */
    String expAllReq        = FCUtility.validateParameter((String) request.getAttribute("expAllReq"));  
    String expAllCount        = FCUtility.validateParameter((String) request.getAttribute("expAllCount")); 
    /* Bug 19609280 - Asynchronous summary export changes */
    
    String srcType = FCUtility.validateParameter((String) request.getParameter("srcType"));
    String tabId = FCUtility.validateParameter((String) request.getParameter("tabId"));
	String sectionName = FCUtility.validateParameter((String) request.getParameter("sectionName"));/*Fix for 20805413*/
    
    if(!uiXML.substring(2,3).equalsIgnoreCase("D") && "S".equalsIgnoreCase(uiXML.substring(2,3))) {
        FinalJSFile = funcID.substring(0,2) + "D" + funcID.substring(3,funcID.length());
    } 
    
    //System.out.println("Launcher start:" + Calendar.getInstance().get(Calendar.HOUR)+":"+Calendar.getInstance().get(Calendar.MINUTE)+":"+Calendar.getInstance().get(Calendar.SECOND)+":"+Calendar.getInstance().get(Calendar.MILLISECOND));
    
    Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+langCode + "~" + entity, branchIdentifier,userId);
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    //Performance Changes Starts
    String clientHandlerEntry = FCUtility.validateParameter((String)request.getAttribute("clientEntry"));
    String clientHandlerExit = String.valueOf(System.currentTimeMillis());
    //Performance Changes Ends
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>

<html lang="<%=StringEscapeUtils.escapeHTML(langISOMap)%>">
    <head>
        <title><%= StringEscapeUtils.escapeHTML(description) %></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(langISOMap)%>">
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <!--<link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>-->
		<link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme).substring(0, StringEscapeUtils.escapeURL(strTheme).indexOf(".css"))+"_ELCM.css" %>" rel="stylesheet" type="text/css"/>        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(langISOMap)%>.css" rel="stylesheet" type="text/css"/>
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
            var srcType = '<%=StringEscapeUtils.escapeJavaScript(srcType)%>';
            var tabId = '<%=StringEscapeUtils.escapeJavaScript(tabId)%>';
            var sectionName = '<%=StringEscapeUtils.escapeJavaScript(sectionName)%>';//Fix for 20805413
            var mainWin = ""
            if(srcType== "null"){
              mainWin        = parent;
            }else{
              //mainWin        = parent.parent;
              mainWin        = parent.mainWin;
            }
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>		
		 <script type="text/javascript" src="Script/JS/d3.v5.min.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>		   
        <script type="text/javascript" src="Script/JS/Alert_ELCM.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtFuncs_ELCM.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil_ELCM.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUtil_ELCM.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtBuildXML_ELCM.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript">
            var meBlockResponse     = "";
            var isPartialDOM        = false;
            var recDataLength       = new Array();
            //var timeLogsArray = new Array();
            appDbg = '<%=StringEscapeUtils.escapeJavaScript(appDbg)%>';
            webDbg = '<%=StringEscapeUtils.escapeJavaScript(webDbg)%>' ;
            dbDbg = '<%=StringEscapeUtils.escapeJavaScript(dbDbg)%>';
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
            var inLoadTime              = '<%=StringEscapeUtils.escapeJavaScript(inLoadTime)%>';//Performance Changes
            var tankModifications   = '<%=StringEscapeUtils.escapeJavaScript(tankModifications)%>';
            var remarksReq          = '<%=StringEscapeUtils.escapeJavaScript(remarksReq)%>';  
            var exportReq           = '<%=StringEscapeUtils.escapeJavaScript(exportReq)%>';   
            /* Bug 19609280 - Asynchronous summary export changes */   
            var expAllReq         = '<%=StringEscapeUtils.escapeJavaScript(expAllReq)%>';
            var expAllCount          = '<%=StringEscapeUtils.escapeJavaScript(expAllCount)%>';
            /* Bug 19609280 - Asynchronous summary export changes */
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
            //Performance Changes Starts
            var clientHandlerEntry   = '<%= StringEscapeUtils.escapeJavaScript(clientHandlerEntry)%>';
            var clientHandlerExit    = '<%= StringEscapeUtils.escapeJavaScript(clientHandlerExit)%>';
            //Performance Changes Ends			
            var loggingReqd      = '<%= StringEscapeUtils.escapeJavaScript(loggingReqd)%>';
            var summaryQryCriteria  = '<%=StringEscapeUtils.escapeJavaScript(summaryQryCriteria)%>';
            
            mainWin.sessionInterval = '<%=StringEscapeUtils.escapeJavaScript(sessionInterval+"")%>';
            mainWin.inactiveTime  = 0;
            mainWin.BranchEoi = branch_eoi;//Fix for 17070419
            if (mainWin.applicationName == "FCJ" || mainWin.applicationName == "FGL"){
    
                strEODInputLabelDesc = "LBL_BRANCH_EOI_" + branch_eoi;
            } else {
                strEODInputLabelDesc = "LBL_BRANCH_STATUS_" + branch_eoi;
            }
            
            var BranchEoiLabelDesc = "";
            var titleDate          = '<%=StringEscapeUtils.escapeJavaScript(todayDate)%>';
            mainWin.AppDate = titleDate;
            var dateComp           = titleDate.split("-",-1);   
            dateComp               = getSystemShortDate(parseInt(dateComp[0],10),parseInt(dateComp[1],10),parseInt(dateComp[2],10) );
            mainWin.document.getElementById("dateli").innerHTML = dateComp;//Fix for 17312442	//HTML5 Changes
            var screenTitleArray   = (mainWin.document.title).split(" - ");
            screenTitleArray[5]    = dateComp;
            screenTitleArray[6]    = mainWin.getItemDesc(strEODInputLabelDesc);
            for (var i=0; i <screenTitleArray.length; i++){
                BranchEoiLabelDesc = BranchEoiLabelDesc + screenTitleArray[i] + " - ";
            }
            BranchEoiLabelDesc     = BranchEoiLabelDesc.substring(0,BranchEoiLabelDesc.length-3);
            mainWin.document.title = BranchEoiLabelDesc;
             if(srcType== "null"){
              parent.document.getElementById("testwin_elcm").id     = seqNo;
            }else if(tabId !="null" && tabId!="" && tabId!=null){
                if(parent.document.getElementById("tabCN_"+tabId).children[0].id.indexOf('testwin') != -1)// fix for 20894212 
                    parent.document.getElementById("tabCN_"+tabId).children[0].id = seqNo;
            }else{
              parent.document.getElementById("testwin"+sectionName).id     = seqNo;//Fix for 20805413
            }
            parent.document.getElementById(seqNo).style.visibility='visible';//Fix for 20894212 
            parent.document.getElementById(seqNo).getElementsByTagName("iframe")[0].name     = seqNo;
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
			var langISOMap  = '<%= StringEscapeUtils.escapeJavaScript(langISOMap) %>';//Fix for 20805413
            parentFunc 	= functionId.substring(2,0) + "D" + functionId.substring(3,functionId.length); //detail func id for summary
            if (thirdChar == "S") {
                isDetailed = false;
            }
            
            if (uiXML == "") {
                xmlFileName = mainWin.UIXmlPath + "/<%= StringEscapeUtils.escapeJavaScript(langCode) %>/" + parentFunc  + ".xml";
            } else {
                xmlFileName = mainWin.UIXmlPath+ "/<%= StringEscapeUtils.escapeJavaScript(langCode) %>/" + uiXML + ".xml";
            }  
            if(screenType == 'LNM') {
              xslFileName = "ExtTemplate.xsl";
            }else{
              if (isDetailed) {
                xslFileName = "ExtDetail_Cust.xsl";
              } else {
                xslFileName = "ExtSummary_Cust.xsl";
              }    
            }
                
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <% 
        if("Y".equals(scrChild)){//Sudipta For Screen Child
        %>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
            <script type="text/javascript" src="Script/JS/SYS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <%
        } else{//Sudipta For Screen Child
        %>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
            <script type="text/javascript" src="Script/JS/SYS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <%
        }
        %>
        <script type="text/javascript" src="Script/ExtJS/ExtDatabinding_ELCM.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtensibleMEUtil_ELCM.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtensibleUtil_ELCM.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtPrint.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/Extensible_ELCM.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%
        if("P".equals(screenType) || "T".equals(screenType)){
        %>
            <script type="text/javascript" src="Script/ExtJS/ExtensibleBPEL.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%
        }
        if ("KERNEL".equalsIgnoreCase(FCJStream)) {
        %>
            <%
            if (!"".equalsIgnoreCase(superParentFunction) && "Y".equals(scrChild)) {
            %>
                <%
                if ("KERNEL".equalsIgnoreCase(superParentOrigin)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_KERNEL.js"></script>
                <%
                }
                %>
            <%
            } 
            if (!"".equalsIgnoreCase(parentFunction)) {
            %>
                <%
                if ("KERNEL".equalsIgnoreCase(parentOrigin)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_KERNEL.js"></script>
                <%
                }
                %>
            <%
            } 
            if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
            %>
                <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL.js"></script>
            <%
            }
            %>
        <%
        } else if ("CLUSTER".equalsIgnoreCase(FCJStream)) {
        %>
            <%
            if (!"".equalsIgnoreCase(superParentFunction) && "Y".equals(scrChild)) {
            %>
                <%
                if ("KERNEL".equalsIgnoreCase(superParentOrigin)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_KERNEL.js"></script> 
                    <%
                    if ("Y".equalsIgnoreCase(clusterModified)) {
                    %>
                        <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CLUSTER.js"></script>
                    <%
                    } 
                    %>
                <%
                } else if ("CLUSTER".equalsIgnoreCase(superParentOrigin)) {
                %>
                <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CLUSTER.js"></script>
                <%
                }
                %>
            <%
            } 
            if (!"".equalsIgnoreCase(parentFunction)) {
            %>
                <%
                if ("KERNEL".equalsIgnoreCase(parentOrigin)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_KERNEL.js"></script>
                    <%
                    if ("Y".equalsIgnoreCase(clusterModified)) {
                    %>
                        <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CLUSTER.js"></script>
                    <%
                    } 
                    %>
                <%
                } else if ("CLUSTER".equalsIgnoreCase(parentOrigin)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CLUSTER.js"></script>
                <%
                }
                %>
            <%
            } 
            if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
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
            <%
            if (!"".equalsIgnoreCase(superParentFunction) && "Y".equals(scrChild)) {
            %>
                <%
                if ("KERNEL".equalsIgnoreCase(superParentOrigin)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_KERNEL.js"></script>
                    <%
                    if ("Y".equalsIgnoreCase(clusterModified)) {
                    %>
                        <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CLUSTER.js"></script>
                    <%
                    }
                    if ("Y".equalsIgnoreCase(customModified)) {
                    %>
                        <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CUSTOM.js"></script>
                    <%
                    }
                    %>
                <%
                } else if ("CLUSTER".equalsIgnoreCase(superParentOrigin)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CLUSTER.js"></script>
                    <%
                    if ("Y".equalsIgnoreCase(customModified)) {
                    %>
                        <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CUSTOM.js"></script>
                    <%
                    }
                    %>
                <%
                } else if ("CUSTOM".equalsIgnoreCase(superParentOrigin)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CUSTOM.js"></script>
                <%
                }
                %>
            <% 
            } 
            if (!"".equalsIgnoreCase(parentFunction)) {
            %>
                <%
                if ("KERNEL".equalsIgnoreCase(parentOrigin)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_KERNEL.js"></script>
                    <%
                    if ("Y".equalsIgnoreCase(clusterModified)) {
                    %>
                        <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CLUSTER.js"></script>
                    <%
                    }
                    if ("Y".equalsIgnoreCase(customModified)) {
                    %>
                        <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CUSTOM.js"></script>
                    <%
                    }
                    %>
                <%
                } else if ("CLUSTER".equalsIgnoreCase(parentOrigin)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CLUSTER.js"></script>
                    <%
                    if ("Y".equalsIgnoreCase(customModified)) {
                    %> 
                        <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CUSTOM.js"></script>
                    <%
                    }
                    %>
                <%
                } else if ("CUSTOM".equalsIgnoreCase(parentOrigin)) {
                %>
                    <script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CUSTOM.js"></script>
                <%
                }
                %>
            <%
            } 
            if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
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
        <%
        if(funcID.substring(2,3).equalsIgnoreCase("S")) {
        %>
            <script type="text/javascript" src="Script/ExtJS/ExtGlobalSumUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
            <script type="text/javascript" src="Script/ExtJS/ExtGlobalSum.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%        
        }        
        %>
    </head>  
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <body onkeydown="return shortcut(event)" 
          onload="fnLoadMain(xmlFileName,xslFileName); parent.unmask();" 
          onmousedown="fnMouseDownEvents(event)" 
          onhelp="return disableDefault();"
          oncontextmenu="return false;" style="float:left;">
        <div class="WNDcontainer" id="DIVWNDContainer">           
            <div class="WNDcontent" id="DIVScrContainer">
                <div id="ResTree">
                  <div id="toolbar" class="DIVnav" style="display:none;">
                    <!--12.0.3 Summary to detail changes starts-->
                    <div id="btnDiv">
                        <button  id = "navigatePrev" currPage = "0" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_INFRA_PREVIOUS"))%>" style="display:none;" class = "Abut" onclick="fnQueryMultiDetail(gcNAV_PREVIOUS,event)">
                            <img src="Images/widgetonePrevious.gif" alt=<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_INFRA_PREVIOUS"))%>>
                        </button>
                        <input type= "HIDDEN"></input>
                        <button  id = "navigateNext" currPage = "0" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_NEXT"))%>" style="display:none;" class = "Abut" onclick="fnQueryMultiDetail(gcNAV_NEXT,event)">
                            <img src="Images/widgetoneNext.gif" alt=<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_NEXT"))%>>
                        </button>
                    </div>
                    <!--12.0.3 Summary to detail changes ends-->
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
