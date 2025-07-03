<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : Launcher.jsp
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
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String Strlang         = (String)session.getAttribute("LANG");
    String StrlangISOMap   = (String)session.getAttribute("LANGISOMAP");
    String StrUserId       = (String) session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String strTheme         = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    FCUserGlobals Objuc     = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/

    int sessionInterval     =  session.getMaxInactiveInterval();
   /* # BUG 15978732 fixes start */ 
    String funcID	= FCUtility.validateParameter((String)request.getAttribute("functionid"));
    String uiXML	= FCUtility.validateParameter((String)request.getAttribute("uixml"));
    String description  = (String)request.getAttribute("description"); //9NT1606_14_0_RETRO_12_1_27296994 - removed validateParameter function
    //Fix for Bug 17344217 start
    if(description!=null && !"null".equals(description)) {
        description=description.replace("_amp_", "&");//16903925 bug fixes
    }
    //Fix for Bug 17344217 End
    String screenType   = FCUtility.validateParameter((String)request.getAttribute("typeString"));
    
    String autoAuth = FCUtility.validateParameter((String)request.getAttribute("autoAuth"));
	//Added for user function_id
    String userFuncId		= FCUtility.validateParameter((String)request.getAttribute("userFunctionId"));
    String exportReq            = FCUtility.validateParameter((String) request.getAttribute("exportReq"));  
    /* # BUG 15978732 fixes end */ 
    String multiBrnAccessReq=FCUtility.validateParameter( (String) request.getAttribute("multiBrnAccessReq"));  
    String scriptName;
   /* # BUG 15978732 fixes start */ 
    String scrName	= FCUtility.validateParameter(request.getParameter("scr"));
    String taskId       = FCUtility.validateParameter((String) request.getAttribute("taskId"));
    String branchStatus = FCUtility.validateParameter((String) request.getAttribute("branchStatus"));
    String masterFuncId = FCUtility.validateParameter((String) request.getAttribute("masterFuncId"));
    String todayDate    = FCUtility.validateParameter((String) request.getAttribute("TitleDate"));
    String routingType  = FCUtility.validateParameter((String) request.getAttribute("routingType"));
    String inLoadTime       = FCUtility.validateParameter(request.getParameter("inTime"));//Performance Changes
    String seqNo        = FCUtility.validateParameter((String)request.getAttribute("sequenceno"));
    String actionseqNo      = FCUtility.validateParameter((String)request.getAttribute("actionSeqNo"));
    String parentSeqNo  = FCUtility.validateParameter((String)request.getAttribute("parentSeqNo"));
    String dashboardSeqNo   = FCUtility.validateParameter((String)request.getAttribute("dashboardSeqNo"));
    String ieCss        = FCUtility.validateParameter((String)session.getAttribute("IECSS"));
    String moduleid     = FCUtility.validateParameter((String)request.getAttribute("moduleid"));
    String hoFunction        = FCUtility.validateParameter((String) request.getAttribute("hoFunction")); 
    String summaryQryCriteria   = FCUtility.validateParameter(String.valueOf(request.getAttribute("summaryQryCriteria")));
    String restrictReqd      = FCUtility.validateParameter((String)request.getAttribute("restrictReqd"));//jc2 changes//PIPA
	String restrictPrint     = FCUtility.validateParameter((String)request.getAttribute("restrictPrint"));//jc2 changes//PIPA
    String appDbg           = (String) request.getAttribute("APPLOG");
    String webDbg           = (String) request.getAttribute("WEBLOG");   
    String dbDbg           = (String) request.getAttribute("DBLOG");
    /* # BUG 15978732 fixes end */ 
    //Performance Changes Starts
    String clientHandlerEntry = FCUtility.validateParameter((String)request.getAttribute("clientEntry"));
    String clientHandlerExit = String.valueOf(System.currentTimeMillis());
    //Performance Changes Ends
    String FCJStream        = (String)session.getAttribute("FCJStream"); /*23657573 - HOOK REQUIRED FOR F11 Starts*/
%>
<%
    if ((scrName == null) || (scrName == ""))
        scrName	= "CVS_MAIN";
    
    scriptName = uiXML;
		
    if (uiXML == null)
        uiXML = "";

    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
    String eodDesc = (String)itemDescMap.get("LBL_EOD_DESC");//jc2 24*7 changes //changes_for_24x7
	String branchAvlbltyStatus = FCUtility.validateParameter((String)request.getAttribute("branchAvlbltyStatus"));//changes_for_24x7
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes

%>

<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
        <title><%= StringEscapeUtils.escapeHTML(description)%></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link href="Theme/<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>  
        <link href="Theme/<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/> 
        <!--HTML5 Changes Start -->
         <%--<%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%>--%><!--HTML5 Changes End -->
				<!--<link rel="stylesheet" href="Theme/css/redwood/10.1.1/web/redwood.css" id="css" /> -->
                <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>
                <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>
                <!--<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>-->
                <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
                <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
                <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
        
        <base target="_self"></base>
        <xml id="TxnXml">
        <%
            String txnXml = "";
            if(taskId != null){	
               /* # BUG 15978732 fixes start */ 
                txnXml = FCUtility.validateParameter((String)request.getAttribute("bpelTxnXml"));	
            /* # BUG 15978732 fixes end */ 
            }
        %>
        <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <%=StringEscapeUtils.escapeJavaScript(txnXml)%>
        <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        </xml>
        <script type="text/javascript">
            var mainWin             = parent;   
			var screenKo=""; //OJET Migration			
              var inLoadTime = '<%=StringEscapeUtils.escapeJavaScript(inLoadTime)%>';
              var taskId = '<%=StringEscapeUtils.escapeJavaScript(taskId)%>';
			var masterFuncId = '<%=StringEscapeUtils.escapeJavaScript(masterFuncId)%>';              
              var txnXmlDOM = null;
              var screenType = '<%=StringEscapeUtils.escapeJavaScript(screenType)%>';
				var transactionJSFile="";
				var maintenanceJSFile="";
				var processJSFile="";
				var utilCustom="";
				var utilCluster="";
              
    </script>
    <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Util.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript">
	var gInpDateFormat = "";
	var gAction        = "";
        var holdStatus = "";
        var onceAuthObj         = null;
        appDbg = '<%=StringEscapeUtils.escapeJavaScript(appDbg)%>';
        webDbg = '<%=StringEscapeUtils.escapeJavaScript(webDbg)%>' ;
        dbDbg = '<%=StringEscapeUtils.escapeJavaScript(dbDbg)%>';
        var strTheme    = '<%= StringEscapeUtils.escapeJavaScript(strTheme) %>';
        var branch_eoi = '<%=StringEscapeUtils.escapeJavaScript(branchStatus)%>';
        var seqNo               = '<%=StringEscapeUtils.escapeJavaScript(seqNo)%>';
        var actionseqNo               = '<%=StringEscapeUtils.escapeJavaScript(actionseqNo)%>';
        var parentSeqNo         = '<%=StringEscapeUtils.escapeJavaScript(parentSeqNo)%>';
        var dashboardSeqNo      = '<%=StringEscapeUtils.escapeJavaScript(dashboardSeqNo)%>';
        var exportReq           = '<%=StringEscapeUtils.escapeJavaScript(exportReq)%>';  
        var moduleid            = '<%=StringEscapeUtils.escapeJavaScript(moduleid)%>';
        var multiBrnAccessReq   = '<%=StringEscapeUtils.escapeJavaScript(multiBrnAccessReq)%>';
        var hoFunction          = '<%=StringEscapeUtils.escapeJavaScript(hoFunction)%>';
        var summaryQryCriteria  = '<%=StringEscapeUtils.escapeJavaScript(summaryQryCriteria)%>';
        var restrictReqd        = '<%= StringEscapeUtils.escapeJavaScript(restrictReqd)%>';//jc2 changes//PIPA
		var restrictPrint        = '<%= StringEscapeUtils.escapeJavaScript(restrictPrint)%>';//jc2 changes//PIPA
        var eodDesc          = '<%=StringEscapeUtils.escapeJavaScript(eodDesc)%>';//jc2 24*7 changes   //changes_for_24x7   
        var branchAvlbltyStatus        = '<%= StringEscapeUtils.escapeJavaScript(branchAvlbltyStatus)%>';//jc2 changes //changes_for_24x7
		mainWin.branchAvlbltyStatus = branchAvlbltyStatus;
        //Performance Changes Starts
        var clientHandlerEntry   = '<%= StringEscapeUtils.escapeJavaScript(clientHandlerEntry)%>';
        var clientHandlerExit    = '<%= StringEscapeUtils.escapeJavaScript(clientHandlerExit)%>';
        //Performance Changes Ends
        mainWin.sessionInterval = <%=StringEscapeUtils.escapeJavaScript(sessionInterval+"")%>;
        mainWin.inactiveTime  = 0;
        var branch_eoi_labelsArr = new Array();
        var strEODInputLabelDesc = ""; 
        if (mainWin.applicationName == "FCJ" || mainWin.applicationName == "FGL"){
            branch_eoi_labelsArr[0] = "LBL_TRANSACTION_INPUT";
            branch_eoi_labelsArr[1] = "LBL_BEGIN_OF_DAY";
            branch_eoi_labelsArr[2] = "LBL_END_FIN_INPUT";
            branch_eoi_labelsArr[3] = "LBL_END_OF_DAY";
            branch_eoi_labelsArr[4] = "LBL_END_TRANSAC_INPUT";
            mainWin.BranchEoi = branch_eoi;
             if(branch_eoi == "N"){
                strEODInputLabelDesc = "LBL_TRANSACTION_INPUT" ;
             }else if (branch_eoi == "B"){
                strEODInputLabelDesc = "LBL_BEGIN_OF_DAY" ;
             }else if(branch_eoi == "F"){
                strEODInputLabelDesc = "LBL_END_FIN_INPUT" ;
             }else if(branch_eoi == "E"){
                strEODInputLabelDesc = "LBL_END_OF_DAY" ;
             }else if(branch_eoi == "T"){
                strEODInputLabelDesc = "LBL_END_TRANSAC_INPUT" ;
             }
        }else{
             branch_eoi_labelsArr[0] = "LBL_ONLINE";
             branch_eoi_labelsArr[1] = "LBL_OFFLINE";
             mainWin.BranchEoi = branch_eoi;
             if(branch_eoi == "N"){
                 strEODInputLabelDesc = "LBL_ONLINE" ;
             }else{
                 strEODInputLabelDesc = "LBL_OFFLINE" ;
             }
        }
        var BranchEoiLabelDesc = "";
        var titleDate = '<%=StringEscapeUtils.escapeJavaScript(todayDate)%>';
         mainWin.AppDate = titleDate;//Fix for 17312442
        var dateComp = titleDate.split("-",-1);       
        dateComp = getSystemShortDate(parseInt(dateComp[0],10),parseInt(dateComp[1],10),parseInt(dateComp[2],10) );
        mainWin.document.getElementById("dateli").innerHTML = dateComp;//Fix for 17312442	//HTML5 Changes
        var screenTitleArray = (mainWin.document.title).split(" - ");
        screenTitleArray[5] = dateComp;
        screenTitleArray[6] = mainWin.getItemDesc(strEODInputLabelDesc);
        for (var i=0; i <screenTitleArray.length; i++){
            BranchEoiLabelDesc = BranchEoiLabelDesc + screenTitleArray[i] + " - ";
        }
        BranchEoiLabelDesc = BranchEoiLabelDesc.substring(0,BranchEoiLabelDesc.length-3);
        mainWin.document.title = BranchEoiLabelDesc;
        window.frameElement.name = seqNo;
        parent.document.getElementById("testwin").id     = seqNo;
        parent.document.getElementById(seqNo).className     = "dhtmlwindow functionCont show";//HTML5 Changes
</script>
<noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
   <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
  <!--  <script type="text/javascript" src="Script/JS/GlobalConstants.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/AuditTrail.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/UIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/AmountUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/MaskFormatter.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Validations.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/BuildXML.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/TabContent.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/TabPersist.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
   <!--<%
        if(uiXML.substring(2,3).equalsIgnoreCase("D")) {
    %>
   
            <script type="text/javascript" src="Script/JS/SYS/<%= StringEscapeUtils.escapeURL(scriptName) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
   
    <%
        }else{
        String sumFuncId = funcID.substring(0,2) + "D" + funcID.substring(3,funcID.length());
    %>
    
        <script type="text/javascript" src="Script/JS/SYS/<%= StringEscapeUtils.escapeURL(sumFuncId) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    
    <%
        }
    %>
 <script type="text/javascript" src="Script/JS/Databinding.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
    <%-- <script type="text/javascript" src="Script/JS/SmmdiFrm.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> --%>
<script type="text/javascript" src="Script/JS/Print.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%
        if(screenType.equalsIgnoreCase("M")  || screenType.equalsIgnoreCase("B") ) {  //Kirti for Batch.
    %>
    <script type="text/javascript"> maintenanceJSFile="JS/Maintenance";</script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%
        }
    %>
    <%
        if(screenType.equalsIgnoreCase("O")) {
    %>
    <script type="text/javascript">transactionJSFile="JS/Transaction";</script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%
        }
    %>
    <%  
        if(screenType.equalsIgnoreCase("P") || screenType.equalsIgnoreCase("T")) { //Added the or condition By Fahad as part of IPFB Changes
    %>
    <script type="text/javascript"> processJSFile ="JS/Process";</script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%
        }
    %>
   <!--
    <script type="text/javascript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML) %>.js">
    </script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
   
    <%
	if(funcID.substring(2,3).equalsIgnoreCase("S")) {
    %>
    <script type="text/javascript" src="Script/JS/GlobalSummary.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%        
	}        
    %>-->
    <script type="text/javascript">
    var cache1, cache2;
    var xmlFileName;
    var xslFileName
    var unmaskTitle = false;
    //var timeLogsArray = new Array();
    var functionId 	= '<%= StringEscapeUtils.escapeJavaScript(funcID) %>';
	//Added for function numeric
    var userFuncId     = '<%= StringEscapeUtils.escapeJavaScript(userFuncId) %>';
   
    var uiXML 		= '<%= StringEscapeUtils.escapeJavaScript(uiXML) %>';
    var parentFunc;
    var isDetailed  = true;
    var langCode    = "/<%= StringEscapeUtils.escapeJavaScript(Strlang) %>/";
    
    var screenTitle = '<%= StringEscapeUtils.escapeJavaScript(description) %>';
    
    var autoAuth  = '<%= StringEscapeUtils.escapeJavaScript(autoAuth) %>';

    
    cache1		= new Image();
    cache1.src	= ""; //Data Uri change
    cache2		= new Image();
    cache2.src	= "";//Data Uri change
    //cache3		= new Image(); 
    //cache3.src	= "Images/ICON/QAPUB.gif"; 
			
    var thirdChar 	= functionId.substring(2,3);
    parentFunc 		= functionId.substring(2,0) + "D" + functionId.substring(3,functionId.length);
    if (thirdChar == "S") {
            isDetailed = false;
    }
    
    if (uiXML == "") {
            xmlFileName		= mainWin.UIXmlPath + "/<%= StringEscapeUtils.escapeURL(Strlang) %>/" + parentFunc + ".xml";
    } else {
            xmlFileName		= mainWin.UIXmlPath+ "/<%= StringEscapeUtils.escapeURL(Strlang) %>/" + uiXML + ".xml";
    }  
   var gCurrentScreen = "CVS_MAIN";
	
    if (isDetailed) {
            xslFileName = "Detail.xsl";
    }	
    else {
            xslFileName = "Summary.xsl";
    }
  document.title = screenTitle;

</script>
<noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <!--23657573 - HOOK REQUIRED FOR F11 Starts-->
        <%
        if("CLUSTER".equalsIgnoreCase(FCJStream) || "CUSTOM".equalsIgnoreCase(FCJStream)) {
        %>
        <script  type="text/javascript">utilCluster="JS/Util_<%= StringEscapeUtils.escapeURL(FCJStream)%>";</script>                
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%
        }
        %>
     <!--23657573 - HOOK REQUIRED FOR F11 Starts-->  
	 <script type="text/javascript" src="Script/OJET/main_nonExt.js"></script>
  </head>  
  <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
  <body class="BDYform" 
        onkeydown="return shortcut(event)"
        
        onfocus="fnFocus();"
        oncontextmenu="return false;"
        onmousedown="fnMouseDownEvents(event)" onhelp="return disableDefault();"
        onclick="mainWin.setActiveWindow(mainWin.document.getElementById('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>'), window)"><%--// Reddy Prasad added onhelp attribute to disable the windows help window on F1 in IE --%>
        <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <div id="DIVWNDContainer" style="height: 100%;">
            <DIV id="WNDtitlebar" >
               <!-- <div class="WNDtitle" id="wndtitle">
                    <B class="BTNicon">
                        <span class="ICOflexcube"></span>
                    </B>
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(description)%>&nbsp;</h1>
                    <div class="WNDbuttons">
                        <a class="WNDcls" accesskey="7" id="WNDbuttons" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onclick="if(this.disabled) return false; fnExit(event); event.cancelBubble = true; event.returnValue = false;" onkeydown="return fnHandleScrBtn(event)">
                        <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                        </a> --!>
                          <%-- Security bug SEC-12-Patch-081 fixes starts  --%> <!-- 1203 fix for oghag 
                        <a class="WNDmin" accesskey="6" id ="WNDbuttonsMin" href="#" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%>" onclick="if(this.disabled) return false; mainWin.addTab('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>', '<%=StringEscapeUtils.escapeJavaScript(description)%>', event)" onkeydown="return fnHandleScrBtn(event)">
                          <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%></span>
                        </a>
                          <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
                    </div>
                </div>-->
				
				<div class="oj-flex-bar oj-sm-align-items-center oj-sm-margin-4x-start oj-sm-margin-4x-end bottom-border" id="wndtitle">
                <div class="oj-flex-bar-start">
                    <h1><%=StringEscapeUtils.escapeHTML(description)%>&nbsp;</h1>
                    </div>
                     <div class="oj-flex-bar-end">
                       <oj-button display="icons" chroming="borderless" type="button" class="WNDcls" accesskey="7" id ="WNDbuttonsMin" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%>" onclick="if(this.disabled) return false; mainWin.addTab('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>', '<%=StringEscapeUtils.escapeJavaScript(description)%>', event)" onkeydown="return fnHandleScrBtn(event)">
                       <span slot="startIcon" tabindex="-1" class="oj-panel-collapse-icon"></span>
                       </oj-button>
                       <oj-button display="icons" chroming="borderless" type="button" class="WNDcls" accesskey="6" id ="WNDbuttons" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onclick="if(this.disabled) return false; fnExit('', event)" onkeydown="return fnHandleScrBtn(event)">
                       <span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
                       </oj-button>
                </div>
                </div>
            </DIV>
            <div id="DIVScrContainer">
			<div id="toolbar" class="oj-flex-bar"  style="display:none;">
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
        
                  </div>
                <div id="ResTree">
                  
            </div>
        </div> 
		<div id="Div_AlertWin"  onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none;z-index:6000"> 
                <iframe id="ifr_AlertWin"  src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>	

		</div>
        
        <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
        </div> 		
        <div id="masker" class="masker" style="display:none">
            
        </div>
        </div>
    </body>
</html>
