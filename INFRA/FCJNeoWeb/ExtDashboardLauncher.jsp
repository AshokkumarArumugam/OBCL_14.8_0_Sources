<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtDashboardLauncher.jsp
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

Copyright  ©  2004-2016 by Oracle Financial Services Software Limited..
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
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String browserCSS       = (String)session.getAttribute("BROWSER_CSS");
    String strTheme         = (String)session.getAttribute("THEME");
    String entity         = (String)session.getAttribute("ENTITY");
    String langISOMap       = ((String)session.getAttribute("LANGISOMAP")).toLowerCase();
    String langCode	    = (String)session.getAttribute("LANG");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String FCJStream        = (String)session.getAttribute("FCJStream");
    int sessionInterval     =  session.getMaxInactiveInterval();
    
    String CSRFtoken        = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/
    /* # BUG 15978732 fixes start */ 
    String funcID	    =  FCUtility.validateParameter((String) request.getAttribute("functionid"));
    String uiXML	    =  FCUtility.validateParameter((String) request.getAttribute("uixml"));
    String description      =  FCUtility.validateParameter((String) request.getAttribute("description"));
    if(description!=null && !"null".equals(description)) { // 9NT1587_12.0.2_17193537 Starts
    description=description.replace("_amp_", "&");//16903925 bug fixes
    }    // 9NT1587_12.0.2_17193537 Ends
    String screenType       =  FCUtility.validateParameter((String) request.getAttribute("typeString"));
    String autoAuth         =  FCUtility.validateParameter((String)request.getAttribute("autoAuth"));
    String userId           =  FCUtility.validateParameter((String)session.getAttribute("USERID"));
    String userFuncId       =  FCUtility.validateParameter((String) request.getAttribute("userFunctionId"));
    String taskId           =  FCUtility.validateParameter((String) request.getAttribute("taskId"));
    String branchStatus     =  FCUtility.validateParameter((String) request.getAttribute("branchStatus"));
    String masterFuncId     =  FCUtility.validateParameter((String) request.getAttribute("masterFuncId"));
    String todayDate        =  FCUtility.validateParameter((String) request.getAttribute("TitleDate"));
    String routingType      =  FCUtility.validateParameter((String) request.getAttribute("routingType"));
    String functionOrigin   =  FCUtility.validateParameter((String) request.getAttribute("functionOrigin"));
    String parentFunction   =  FCUtility.validateParameter((String) request.getAttribute("parentFunction"));
    String parentOrigin     =  FCUtility.validateParameter((String) request.getAttribute("parentOrigin"));
    String tankModifications=  FCUtility.validateParameter((String) request.getAttribute("tankModifications"));
    String remarksReq       =  FCUtility.validateParameter((String) request.getAttribute("remarksReq"));  
    String exportReq        =  FCUtility.validateParameter((String) request.getAttribute("exportReq"));  
    String multiBrnAccessReq=  FCUtility.validateParameter((String) request.getAttribute("multiBrnAccessReq"));  
    String scrChild         =  FCUtility.validateParameter((String) request.getAttribute("scrChild")); //Sudipta For Screen Child
    String superParentFunction         =  FCUtility.validateParameter((String) request.getAttribute("superParentFunction"));
    String superParentOrigin         =  FCUtility.validateParameter((String) request.getAttribute("superParentOrigin"));
    String timestamp        =  FCUtility.validateParameter(request.getParameter("timestamp"));
    String inLoadTime           =  FCUtility.validateParameter(request.getParameter("inTime"));
    String FinalJSFile      = uiXML;
    String moduleid         =  FCUtility.validateParameter((String)request.getAttribute("moduleid"));
    String license          =  FCUtility.validateParameter((String)request.getAttribute("license"));
    String seqNo            =  FCUtility.validateParameter((String)request.getAttribute("sequenceno"));
    String actionseqNo      = FCUtility.validateParameter((String)request.getAttribute("actionSeqNo"));
    String xref             =  FCUtility.validateParameter((String)request.getAttribute("XREF"));
    String parentSeqNo      =  FCUtility.validateParameter((String)request.getAttribute("parentSeqNo"));
    String ieCss            =  FCUtility.validateParameter((String)session.getAttribute("IECSS"));
    String fromMDB          =  FCUtility.validateParameter((String)request.getAttribute("fromMDB"));
    String dashboardSeqNo   =  FCUtility.validateParameter((String)request.getAttribute("dashboardSeqNo"));
    String hoFunction   =  FCUtility.validateParameter((String)request.getAttribute("hoFunction"));
    //FCUBS12.0.1 Fix for Bug 14761667 starts
    String srcType = FCUtility.validateParameter((String) request.getParameter("srcType"));
    //FCUBS12.0.1 Fix for Bug 14761667 ends
    String clusterModified  = FCUtility.validateParameter((String)request.getAttribute("clusterModified"));
    String customModified   = FCUtility.validateParameter((String)request.getAttribute("customModified"));
    /* # BUG 15978732 fixes end */ 
    if(!uiXML.substring(2,3).equalsIgnoreCase("D") && "S".equalsIgnoreCase(uiXML.substring(2,3))) {
        FinalJSFile = funcID.substring(0,2) + "D" + funcID.substring(3,funcID.length());
    } 
    
    //System.out.println("Launcher start:" + Calendar.getInstance().get(Calendar.HOUR)+":"+Calendar.getInstance().get(Calendar.MINUTE)+":"+Calendar.getInstance().get(Calendar.SECOND)+":"+Calendar.getInstance().get(Calendar.MILLISECOND));
    
    Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+langCode + "~" + entity, branchIdentifier,userId);
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String moreLabel = (String)itemDescMap.get("LBL_MORE");
    String nextLabel = (String)itemDescMap.get("LBL_NEXT");
    String previousLabel = (String)itemDescMap.get("LBL_PREVIOUS");
    String refreshLabel = (String)itemDescMap.get("LBL_REFRESH");
    //Performance Changes Starts
    String clientHandlerEntry = FCUtility.validateParameter((String)request.getAttribute("clientEntry"));
    String clientHandlerExit = String.valueOf(System.currentTimeMillis());    
    //Performance Changes Ends
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
    String dashCss = "dash.css";
    if (logintheme.equals("FlexNewUI2.css")) {
        dashCss = "dash2.css";
    }else if (logintheme.equals("FlexNewUI3.css")) {//HTML5 Changes 6/OCT/2016 start
        dashCss = "dash3.css";
    }//HTML5 Changes 6/OCT/2016 end
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
        <!--HTML5 Changes Start-->
        <!--<link href="Theme/<%=StringEscapeUtils.escapeURL(dashCss)%>" rel="stylesheet" type="text/css"/>-->
        <%--<%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%>--%> 
        <script type="text/javascript">
            var mainWin        = parent;
             var kernelJSFile="";
            var clusterJSFile="";
            var customJSFile="";
           
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <!--<script type="text/javascript" src="Script/JS/Alert.js"></script>--><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%--<script type="text/javascript" src="Script/JS/SmAppBrw.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>--%>
        <!--
        <script type="text/javascript" src="Script/ExtJS/ExtFuncs.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtDashboardUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtBuildXML.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtDashboardBuildXML.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        -->
        <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>
        <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>
                <!--<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>-->
                <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
                <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
                <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
       
       <!--
        <%
        if("SMSTXNDB".equals(funcID)) {
        %>
        <script type="text/javascript" src="Script/ExtJS/ExtBranch.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%
    	}
    	%>
        -->
        <script type="text/javascript">
            //var alertAction         = "";
            var FCJStream           = '<%=StringEscapeUtils.escapeJavaScript(FCJStream)%>';
            //var timeLogsArray = new Array();
            //FCUBS12.0.1 Fix for Bug 14761667 starts
            var srcType = '<%=StringEscapeUtils.escapeJavaScript(srcType)%>';
            //FCUBS12.0.1 Fix for Bug 14761667 ends
            var moduleid            = '<%=StringEscapeUtils.escapeJavaScript(moduleid)%>';
            var license             = '<%=StringEscapeUtils.escapeJavaScript(license)%>';
            var seqNo               = '<%=StringEscapeUtils.escapeJavaScript(seqNo)%>';
            var actionseqNo               = '<%=StringEscapeUtils.escapeJavaScript(actionseqNo)%>';
            var parentSeqNo         = '<%=StringEscapeUtils.escapeJavaScript(parentSeqNo)%>';
            var taskId              = '<%=StringEscapeUtils.escapeJavaScript(taskId)%>';
            var masterFuncId        = '<%=StringEscapeUtils.escapeJavaScript(masterFuncId)%>';
            var screenType          = '<%=StringEscapeUtils.escapeJavaScript(screenType)%>';
            var functionOrigin      = '<%=StringEscapeUtils.escapeJavaScript(functionOrigin)%>';
            var parentFunction      = '<%=StringEscapeUtils.escapeJavaScript(parentFunction)%>';
            var parentOrigin        = '<%=StringEscapeUtils.escapeJavaScript(parentOrigin)%>';
            var superParentFunction      = '<%=StringEscapeUtils.escapeJavaScript(superParentFunction)%>';
            var superParentOrigin        = '<%=StringEscapeUtils.escapeJavaScript(superParentOrigin)%>';
            var timestamp           = '<%=StringEscapeUtils.escapeJavaScript(timestamp)%>';
            var inLoadTime              = '<%=StringEscapeUtils.escapeJavaScript(inLoadTime)%>';
            var tankModifications   = '<%=StringEscapeUtils.escapeJavaScript(tankModifications)%>';
            var remarksReq          = '<%=StringEscapeUtils.escapeJavaScript(remarksReq)%>';  
            var exportReq           = '<%=StringEscapeUtils.escapeJavaScript(exportReq)%>';   
            var multiBrnAccessReq   = '<%=StringEscapeUtils.escapeJavaScript(multiBrnAccessReq)%>';    
            var scrChild            = '<%=StringEscapeUtils.escapeJavaScript(scrChild)%>';
            var dashboardSeqNo      = '<%=StringEscapeUtils.escapeJavaScript(dashboardSeqNo)%>';
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
            mainWin.sessionInterval = '<%=StringEscapeUtils.escapeJavaScript(sessionInterval+"")%>';
            mainWin.inactiveTime  = 0;
            if (mainWin.applicationName == "FCJ" || mainWin.applicationName == "FGL"){
                mainWin.BranchEoi = branch_eoi;
                strEODInputLabelDesc = "LBL_BRANCH_EOI_" + branch_eoi;
            } else {
                strEODInputLabelDesc = "LBL_BRANCH_STATUS_" + branch_eoi;
            }
            
            var BranchEoiLabelDesc = "";
            var titleDate          = '<%=StringEscapeUtils.escapeJavaScript(todayDate)%>';
            var dateComp           = titleDate.split("-",-1);       
            //dateComp               = getSystemShortDate(parseInt(dateComp[0],10),parseInt(dateComp[1],10),parseInt(dateComp[2],10) );
            
            var screenTitleArray   = (mainWin.document.title).split(" - ");
        //12.0.2
        //    screenTitleArray[5]    = dateComp;
          //  screenTitleArray[6]    = mainWin.getItemDesc(strEODInputLabelDesc);
            for (var i=0; i <screenTitleArray.length; i++){
                BranchEoiLabelDesc = BranchEoiLabelDesc + screenTitleArray[i] + " - ";
            }
            BranchEoiLabelDesc     = BranchEoiLabelDesc.substring(0,BranchEoiLabelDesc.length-3);
            mainWin.document.title = BranchEoiLabelDesc;
            var functionId 	= '<%= StringEscapeUtils.escapeJavaScript(funcID) %>';
            parent.document.getElementById("divpart"+functionId+timestamp).id = seqNo;
            //parent.document.getElementById(seqNo).className = parent.document.getElementById(seqNo).className + " showPopUp";
            parent.document.getElementById(seqNo).children[0].id     = "ifr_LaunchWin_" +seqNo;//1203 oghag fix ;
            var xmlFileName;
            var xslFileName;
            var unmaskTitle = false;
            var uiXML 	= '<%= StringEscapeUtils.escapeJavaScript(uiXML) %>';
            var parentFunc;
            var isDetailed  = true;
            var langCode    = "/<%= StringEscapeUtils.escapeJavaScript(langCode) %>/";
            var strTheme    = '<%= StringEscapeUtils.escapeJavaScript(strTheme)%>';
            var screenTitle = '<%= StringEscapeUtils.escapeJavaScript(description) %>';
            var autoAuth    = '<%= StringEscapeUtils.escapeJavaScript(autoAuth) %>';
            var FinalJSFile = '<%= StringEscapeUtils.escapeJavaScript(FinalJSFile) %>';
             
            var clusterModified     = '<%= StringEscapeUtils.escapeJavaScript(clusterModified)%>';
            var customModified      = '<%= StringEscapeUtils.escapeJavaScript(customModified)%>';
            var clientHandlerEntry   = '<%= StringEscapeUtils.escapeJavaScript(clientHandlerEntry)%>';//Performance Changes
            var clientHandlerExit    = '<%= StringEscapeUtils.escapeJavaScript(clientHandlerExit)%>';//Performance Changes
            var thirdChar 	= functionId.substring(2,3);
            parentFunc 	= functionId.substring(0,2) + "D" + functionId.substring(3,functionId.length); //detail func id for summary
            if (thirdChar == "S") {
                isDetailed = false;
            }
            
            if (uiXML == "") {
                xmlFileName = mainWin.UIXmlPath + "/<%= StringEscapeUtils.escapeURL(langCode) %>/" + parentFunc  + ".xml";
            } else {
                xmlFileName = mainWin.UIXmlPath+ "/<%= StringEscapeUtils.escapeURL(langCode) %>/" + uiXML + ".xml";
            }  
               
            if (isDetailed) {
                xslFileName = "ExtDashboardDetail.xsl";
            } else {
                xslFileName = "ExtDashboardSummary.xsl";
            }    
                
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        
        <%--<% 
        if("Y".equals(scrChild)){//Sudipta For Screen Child
        %>
            <script type="text/javascript" src="Script/JS/SYS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%
        } else{//Sudipta For Screen Child
        %>
            <script type="text/javascript" src="Script/JS/SYS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%
        }
        %>--%>
        <!--<script type="text/javascript" src="Script/ExtJS/ExtDatabinding.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtensibleMEUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtensibleUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/CustDetail.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
        <%--<%
        if(funcID.substring(2,3).equalsIgnoreCase("D")) {
        %>
            <script type="text/javascript" src="Script/ExtJS/ExtDashboardSummary.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%
        }
        %>--%>
        <!--<script type="text/javascript" src="Script/ExtJS/ExtDashboardDetail.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtDashboardTlBar.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript
        --><%
        if("P".equals(screenType) || "T".equals(screenType)) {
        %>
            <!--<script type="text/javascript" src="Script/ExtJS/ExtensibleBPEL.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
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
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_KERNEL.js"></script>-->
                     <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_KERNEL";
                </script>
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
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_KERNEL.js"></script>-->
                     <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_KERNEL";</script>
                <%
                }
                %>
            <%
            } 
            if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL.js"></script>-->
                <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL";</script>
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
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_KERNEL.js"></script>-->
                    <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_KERNEL";</script>
                    <%
                    if ("Y".equalsIgnoreCase(clusterModified)) {
                    %>
                        <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CLUSTER.js"></script>-->
                        <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CLUSTER";</script>
                    <%
                    } 
                    %>
                <%
                } else if ("CLUSTER".equalsIgnoreCase(superParentOrigin)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CLUSTER.js"></script>-->
                    <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CLUSTER";</script>
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
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_KERNEL.js"></script>-->
                     <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_KERNEL";</script>
                    <%
                    if ("Y".equalsIgnoreCase(clusterModified)) {
                    %>    
                        <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CLUSTER.js"></script>-->
                        <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CLUSTER";</script>
                    <%
                    } 
                    %>
                <%
                } else if ("CLUSTER".equalsIgnoreCase(parentOrigin)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CLUSTER.js"></script>-->
                    <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CLUSTER";</script>
                <%
                }
                %>
            <%
            } 
            if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL.js"></script>-->
               <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL";</script>
                <%
                if ("Y".equalsIgnoreCase(clusterModified)) {
                %> 
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER.js"></script>-->
                    <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER";</script>
                <%
                } 
                %>
            <%
            } else if ("CLUSTER".equalsIgnoreCase(functionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER.js"></script>-->
                 <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER";</script>
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
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_KERNEL.js"></script>-->
                     <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_KERNEL";</script>
                    <%
                    if ("Y".equalsIgnoreCase(clusterModified)) {
                    %> 
                        <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CLUSTER.js"></script>-->
                         <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CLUSTER";</script>
                    <%
                    }
                    if ("Y".equalsIgnoreCase(customModified)) {
                    %>
                        <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CUSTOM.js"></script>-->
                        <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CUSTOM";</script>
                    <%
                    }
                    %>
                <%
                } else if ("CLUSTER".equalsIgnoreCase(superParentOrigin)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CLUSTER.js"></script>-->
                    <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CLUSTER";</script>
                    <%
                    if ("Y".equalsIgnoreCase(customModified)) {
                    %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CUSTOM.js"></script>-->
                     <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CUSTOM";</script>
                    <%
                    }
                    %>
                <%
                } else if ("CUSTOM".equalsIgnoreCase(superParentOrigin)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CUSTOM.js"></script>-->
                     <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(superParentFunction) %>_CUSTOM";</script>
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
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_KERNEL.js"></script>-->
                     <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_KERNEL";</script>
                    
                    <%
                    if ("Y".equalsIgnoreCase(clusterModified)) {
                    %>
                        <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CLUSTER.js"></script>-->
                          <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CLUSTER";</script>
                    <%
                    }
                    if ("Y".equalsIgnoreCase(customModified)) {
                    %>
                        <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CUSTOM.js"></script>-->
                          <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CUSTOM";</script>
                    <%
                    }
                    %>
                <%
                } else if ("CLUSTER".equalsIgnoreCase(parentOrigin)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CLUSTER.js"></script>-->
                    <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CLUSTER";</script>
                    <%
                    if ("Y".equalsIgnoreCase(customModified)) {
                    %>
                        <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CUSTOM.js"></script>-->
                       <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CUSTOM";</script>
                    <%
                    }
                    %>
                <%
                } else if ("CUSTOM".equalsIgnoreCase(parentOrigin)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CUSTOM.js"></script>-->
                    <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(parentFunction) %>_CUSTOM";</script>
                <%
                }
                %>
            <%
            } 
            if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL.js"></script>-->
                <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL";</script>
                <%
                if ("Y".equalsIgnoreCase(clusterModified)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER.js"></script>-->
                    <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER";</script>
                <%
                }
                if ("Y".equalsIgnoreCase(customModified)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM.js"></script>-->
                    <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM";</script>
                <%
                }
                %>
            <%
            } else if ("CLUSTER".equalsIgnoreCase(functionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER.js"></script
                 -->
                 <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER";</script>
                <%
                if ("Y".equalsIgnoreCase(customModified)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM.js"></script
                    -->
                    <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM";</script>
                <%
                }
                %>
            <%
            } else if ("CUSTOM".equalsIgnoreCase(functionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM.js"></script
                -->
                <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM";</script>
            <%
            }
            %>
        <%
        }
        %>
        <%--<%
        if(funcID.substring(2,3).equalsIgnoreCase("S")) {
        %>
            <script type="text/javascript" src="Script/ExtJS/ExtDashboardSummary.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%
        }
        %>--%>
        <script type="text/javascript" src="Script/OJET/main_dashboard.js"></script>
    </head>  
	<!--Fix for 18407538  starts-->
    <body  onkeydown="return doKeyActionDashhboard(event)" 
           
          oncontextmenu="return false;">
    <!--Fix for 18407538  ends-->
            <div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none"><!--HTML5 Changes-->
                <iframe id="ifr_AlertWin" class="frames" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
            <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
            </div>
        <div id="containerFldset"  class="oj-sm-margin-5x-start"></div>
        
        <div id="masker" class="masker" style="display:none">
            
        </div>
    </body>
</html>
