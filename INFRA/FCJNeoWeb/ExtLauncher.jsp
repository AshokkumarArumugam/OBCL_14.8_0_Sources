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
**
**
**  Modified By          : Shishirkumar Aithal
**  Modified On          : 03-04-2017
**  Modified Reason      : LOV MUST DISPLAY SYSTEM DATE AS DEFAULT. 
**  Search String        : //Bug No 25817688 Changes 
**
**  Modified By          : Ambika S
**  Modified On          : 03-Jan-2017
**  Modified Reason      : Code Changes done to relax input validation for the description as the
                           same is sanitized through escape functions
**  Search String        : 9NT1606_14_0_RETRO_12_1_27296994
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
<%@ page import="com.ofss.fcc.common.FCUserGlobals" %> <!--Bug 25817688 changes-->
<%@ page import="com.ofss.fcc.common.BranchConstants"%> <!--Bug 25817688 changes-->
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
    String description      = (String) request.getAttribute("description"); //9NT1606_14_0_RETRO_12_1_27296994 - removed validateParameter function
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
    String restrictReqd      = FCUtility.validateParameter((String)request.getAttribute("restrictReqd"));//jc2 changes//PIPA
	String restrictPrint     = FCUtility.validateParameter((String)request.getAttribute("restrictPrint"));//jc2 changes//PIPA
    String helpPath         = FCUtility.validateParameter((String)request.getAttribute("helpfile"));//helpfile changes
    String summaryQryCriteria   = FCUtility.validateParameter(String.valueOf(request.getAttribute("summaryQryCriteria")));
	String branchAvlbltyStatus = FCUtility.validateParameter((String)request.getAttribute("branchAvlbltyStatus"));//changes_for_24x7
         String reqEncReqd     = FCUtility.validateParameter((String)request.getAttribute("reqEncReqd"));//E2E Changes
    /* Bug 19609280 - Asynchronous summary export changes */
    String expAllReq        = FCUtility.validateParameter((String) request.getAttribute("expAllReq"));  
    String expAllCount        = FCUtility.validateParameter((String) request.getAttribute("expAllCount")); 
    /* Bug 19609280 - Asynchronous summary export changes */
    
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
    FCUserGlobals uc        = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);//Bug 25817688
    String defaultDate = String.valueOf(uc.getDefaultDate()); //Bug 25817688
	String eodDesc = (String)itemDescMap.get("LBL_EOD_DESC");//jc2 24*7 changes
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
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(langISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
        <!--HTML5 Changes Start-->
        <%--<%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="texet/css"/>
<%}%>--%><!--HTML5 Changes End -->
		<!--<link rel="stylesheet" href="Theme/css/redwood/10.1.1/web/redwood.css" id="css" /> -->
                <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>
                <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>
               <!--<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>-->
                <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
                <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
                <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript">
            var mainWin        = parent;
            var screenKo=""; //OJET Migration
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <!--
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtFuncs.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtBuildXML.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        -->
        <script type="text/javascript">
            var meBlockResponse     = "";
            var isPartialDOM        = false;
            var recDataLength       = new Array();
            var kernelJSFile="";
            var clusterJSFile="";
            var customJSFile="";
            var extUtilCustom="";
            var extUtilCluster="";
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
            var langISOMap          = '<%= StringEscapeUtils.escapeJavaScript(langISOMap) %>'; 
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
            var helpPath         = '<%=StringEscapeUtils.escapeJavaScript(helpPath)%>';//helpfile changes
            var eodDesc          = '<%=StringEscapeUtils.escapeJavaScript(eodDesc)%>';//jc2 24*7 changes
            var restrictReqd        = '<%= StringEscapeUtils.escapeJavaScript(restrictReqd)%>';//jc2 changes//PIPA
			var restrictPrint        = '<%= StringEscapeUtils.escapeJavaScript(restrictPrint)%>';//jc2 changes//PIPA
	    var branchAvlbltyStatus        = '<%= StringEscapeUtils.escapeJavaScript(branchAvlbltyStatus)%>';//jc2 changes//changes_for_24x7
            var reqEncReqd        = '<%= StringEscapeUtils.escapeJavaScript(reqEncReqd)%>';//E2E Changes
            if(helpPath != null && helpPath != ''){ 
                helpPath = replaceAll(helpPath,"_BSLH_","\\");//helpfile changes
                helpPath = replaceAll(helpPath,"_FSLH_","/");//helpfile changes
                mainWin.extHelpFile ="Y";   
            }else{
                mainWin.extHelpFile ="N";   
            }
            mainWin.sessionInterval = '<%=StringEscapeUtils.escapeJavaScript(sessionInterval+"")%>';
            mainWin.inactiveTime  = 0;
            mainWin.BranchEoi = branch_eoi;//Fix for 17070419
			mainWin.branchAvlbltyStatus = branchAvlbltyStatus;//Fix for 17070419 //changes_for_24x7
            if (mainWin.applicationName == "FCJ" || mainWin.applicationName == "FGL"){
             //Bug 25817688 changes Start
               var defaultDate = "<%=StringEscapeUtils.escapeJavaScript(defaultDate)%>";
                    if(defaultDate == "false")
                    {
                     var curDate = '<%= StringEscapeUtils.escapeJavaScript(String.valueOf(uc.getCurrHostDate()))%>'; 
                    }
                    else
                    {
                     var curDate = '<%= StringEscapeUtils.escapeJavaScript(String.valueOf(uc.getCurrDate()))%>';
                    }
             //Bug 25817688 changes End
    
                strEODInputLabelDesc = "LBL_BRANCH_EOI_" + branch_eoi;
            } else {
                strEODInputLabelDesc = "LBL_BRANCH_STATUS_" + branch_eoi;
            }
            
            var BranchEoiLabelDesc = "";
            //var titleDate          = '<%=StringEscapeUtils.escapeJavaScript(todayDate)%>';
            var titleDate          = curDate;  //Bug 25817688 changes 
            mainWin.AppDate = titleDate;
            var dateComp           = titleDate.split("-",-1);   
           // dateComp               = getSystemShortDate(parseInt(dateComp[0],10),parseInt(dateComp[1],10),parseInt(dateComp[2],10) );
            //mainWin.document.getElementById("dateli").innerHTML = dateComp;//Fix for 17312442	//HTML5 Changes
            //Fix for bug#21278850 begins
            /*var screenTitleArray   = (mainWin.document.title).split(" - ");
            screenTitleArray[5]    = dateComp;
            screenTitleArray[6]    = mainWin.getItemDesc(strEODInputLabelDesc);
            for (var i=0; i <screenTitleArray.length; i++){
                BranchEoiLabelDesc = BranchEoiLabelDesc + screenTitleArray[i] + " - ";
            }
            BranchEoiLabelDesc     = BranchEoiLabelDesc.substring(0,BranchEoiLabelDesc.length-3);
            mainWin.document.title = BranchEoiLabelDesc;*/
            //fix for bug#21278850 ends
            
            window.frameElement.name = seqNo;
            parent.document.getElementById("testwin").id     = seqNo;
            parent.document.getElementById(seqNo).className     = "dhtmlwindow functionCont show";//HTML5 Changes
            
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
            parentFunc 	= functionId.substring(2,0) + "D" + functionId.substring(3,functionId.length); //detail func id for summary
            if (thirdChar == "S") {
                isDetailed = false;
            }
            
            if (uiXML == "") {
                xmlFileName = mainWin.UIXmlPath + "/<%= StringEscapeUtils.escapeJavaScript(langCode) %>/" + parentFunc  + ".xml";
            } else {
                xmlFileName = mainWin.UIXmlPath+ "/<%= StringEscapeUtils.escapeJavaScript(langCode) %>/" + uiXML + ".xml";
            }  
               
            if (isDetailed) {
                xslFileName = "ExtDetail.xsl";
            } else {
                xslFileName = "ExtSummary.xsl";
            }    
                
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript><!-- 12.0.3 js segregation changes starts -->
        <script type="text/javascript" src="Script/ExtJS/ExtPrint.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    	<script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <!--<script type="text/javascript" src="Script/OJET/require-config.js"></script>-->
        
       <!-- <script type="text/javascript" src="Script/ExtJS/ExtDatabinding.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtensibleMEUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtensibleUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtPrint.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/Extensible.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
       <!--  <%
        if(funcID.substring(2,3).equalsIgnoreCase("S")) {
        %>
            <script type="text/javascript" src="Script/ExtJS/ExtGlobalSumUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
            <script type="text/javascript" src="Script/ExtJS/ExtGlobalSum.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%        
        }        
        %>-->
        <!--<%
        if("P".equals(screenType) || "T".equals(screenType)){
        %>
            <script type="text/javascript" src="Script/ExtJS/ExtensibleBPEL.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%
        }
         %>-->
         <%
        if ("KERNEL".equalsIgnoreCase(FCJStream)) {
        %>
            <% if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
            %>
            
                <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL";
                </script>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL.js"></script>-->
            <%
            }
            %>
        <%
        } else if ("CLUSTER".equalsIgnoreCase(FCJStream)) {
        %>
            <% if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL.js"></script>-->
                <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL";
                </script>
                <%
                if ("Y".equalsIgnoreCase(clusterModified)) {
                %>
                <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER";
                </script>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER.js"></script>-->
                <%
                } 
                %>
            <%
            } else if ("CLUSTER".equalsIgnoreCase(functionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER.js"></script>-->
                <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER";
                </script>
            <%
            }
            %>
        <%
        } else if ("CUSTOM".equalsIgnoreCase(FCJStream)) {
        %>
            <% if ("KERNEL".equalsIgnoreCase(functionOrigin)) {
            %>
            <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL";
                </script>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_KERNEL.js"></script>-->
                <%
                if ("Y".equalsIgnoreCase(clusterModified)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER.js"></script>-->
                    <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER";
                    </script>
                <%
                }
                if ("Y".equalsIgnoreCase(customModified)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM.js"></script>-->
                    <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM";
                </script>
                <%
                }
                %>
            <%
            } else if ("CLUSTER".equalsIgnoreCase(functionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER.js"></script>-->
                <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CLUSTER";
                </script>
                <%
                if ("Y".equalsIgnoreCase(customModified)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM.js"></script>-->
                    <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM";
                </script>
                <%
                }
                %>
            <%
            } else if ("CUSTOM".equalsIgnoreCase(functionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM.js"></script>-->
                <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(FinalJSFile) %>_CUSTOM";
                </script>
            <%
            }
            %>
        <%
        }
        %>
        <!--23657573 - HOOK REQUIRED FOR F11 Starts-->
        <%
        if("CLUSTER".equalsIgnoreCase(FCJStream) || "CUSTOM".equalsIgnoreCase(FCJStream)) {
        %>
                 <%
                if ("Y".equalsIgnoreCase(clusterModified)) {
                %>
                    <!--<script language="JavaScript" src="Script/ExtJS/ExtUtil_CLUSTER.js"></script>-->
                    <script language="JavaScript">extUtilCluster = "ExtJS/ExtUtil_CLUSTER";  </script>
                <%
                }
                if ("Y".equalsIgnoreCase(customModified)) {
                %>
                <script language="JavaScript">extUtilCustom = "ExtJS/ExtUtil_CUSTOM";
                </script>
                     <!--<script language="JavaScript" src="Script/ExtJS/ExtUtil_CUSTOM.js"></script>-->
                <%
                }
                %>
        <%
        }
        %>
        <!--23657573 - HOOK REQUIRED FOR F11 ends-->
        <script type="text/javascript" src="Script/OJET/main.js"></script>
    </head>  
     <!-- Security bug SEC-12-Patch-081 fixes starts  -->
    <body onkeydown="return shortcut(event)" 
          onfocus="fnFocus();" 
          onmousedown="fnMouseDownEvents(event)" 
          onhelp="return disableDefault();"
          oncontextmenu="return false;"
          onclick="mainWin.setActiveWindow(mainWin.document.getElementById('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>'), window)">
        <div id="DIVWNDContainer" style="height: 100%;">
            <DIV id="WNDtitlebar" >
                <div class="oj-flex-bar oj-sm-align-items-center oj-sm-margin-4x-start oj-sm-margin-4x-end bottom-border" id="wndtitle">
                <div class="oj-flex-bar-start">
                    <h1><%=StringEscapeUtils.escapeHTML(description)%>&nbsp;</h1>
                    </div>
                     <div class="oj-flex-bar-end">
                       <oj-button display="icons" chroming="borderless" type="button" class="WNDcls" accesskey="7" id ="WNDbuttonsMin" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%>" onclick="if(this.disabled) return false; mainWin.addTab('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>', '<%=StringEscapeUtils.escapeJavaScript(description)%>', event)" onkeydown="return fnHandleScrBtn(event)">
                       <span slot="startIcon" tabindex="-1" class="oj-panel-collapse-icon"></span>
                       </oj-button>
                       <oj-button display="icons" chroming="borderless" type="button" class="WNDcls" accesskey="6" id ="WNDbuttons" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onclick="if(this.disabled) return false; fnExitAll('', event)" onkeydown="return fnHandleScrBtn(event)">
                       <span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
                       </oj-button>
                </div>
                </div>
            </DIV>
            <div   id="DIVScrContainer">
             <div id="toolbar" class="oj-flex-bar"  style="display:none;">
                    <!--12.0.3 Summary to detail changes starts-->
                    <div class="oj-flex-bar-start">
                        <jsp:include page="SMHTLBAR.jsp" flush="true" /> 
                    </div>
                    <div id="btnDiv" class="oj-flex-bar-end">
                        <oj-button  display="icons" chroming="borderless"  id = "navigatePrev" currPage = "0" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_INFRA_PREVIOUS"))%>" style="display:none;"  onclick="fnQueryMultiDetail(gcNAV_PREVIOUS,event)">
                        <span class="oj-ux-ico-caret-left"  title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_INFRA_PREVIOUS"))%>"></span>
                        </oj-button>
                        <input type= "HIDDEN"></input>
                        <oj-button display="icons" chroming="borderless"   id = "navigateNext" currPage = "0" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_NEXT"))%>" style="display:none;"   onclick="fnQueryMultiDetail(gcNAV_NEXT,event)">
                             <span class="oj-ux-ico-caret-right" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_NEXT"))%>"></span>
                        </oj-button>
                    </div>
                    <!--12.0.3 Summary to detail changes ends-->
                   
                     <!--<oj-conveyor-belt class="convyorBeltContainer oj-sm-padding-4x-start oj-sm-margin-2x-top oj-sm-margin-2x-bottom" arrow-visibility="visible" data-oj-binding-provider="none">
                    
                    </oj-conveyor-belt>-->
                  </div>
                <div id="ResTree" style="height: 345px;">
                 
                </div>
                </div>
             <div id="Div_AlertWin"  onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none;z-index:6000"> 
                <iframe id="ifr_AlertWin"  src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
        
        <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
        </div>     
       
        <div id="masker" class="masker" style="display:none">
            
           <!-- <div id="Div_ChildWin" style="display:none; width:100%; height:100%">-->
            </div>
        </div>
    </body>
</html>
