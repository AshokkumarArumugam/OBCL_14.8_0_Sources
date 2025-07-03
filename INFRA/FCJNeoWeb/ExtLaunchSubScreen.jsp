<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtLaunchSubScreen.jsp
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

** @author Malaiah
**
** This is the single point rooter to all the function sub screens of Flexcube.
** All the object browser items will be calling this screen with
** Function ID, Theme, Lang Code as Parameters.

** Functions Specific Script File and XML will be loaded based on the QueryString Paremeters

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
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.utility.FCGenerateSysExt"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.io.StringReader"%>
<%@ page import="javax.xml.XMLConstants" %>
<%@ page import="org.w3c.dom.Document"%>
<%@ page import="org.w3c.dom.Element"%>
<%@ page import="org.xml.sax.InputSource"%>
<!--JC4XALAN --> 
<%@ page import="javax.xml.xpath.XPath"%>
<%@ page import="javax.xml.xpath.XPathConstants"%>
<%@ page import="javax.xml.xpath.XPathExpressionException"%>
<%@ page import="javax.xml.xpath.XPathFactory"%>
<%@ page import="com.ofss.fcc.common.FCUBSEntityResolver"%>
<!-- JC4XALAN --> 
<%!    private XPath xpath = XPathFactory.newInstance().newXPath(); %>
<!-- JC4XALAN --> 
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String ieCss         = (String)session.getAttribute("IECSS");
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String Strlang          = (String)session.getAttribute("LANG");
    String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
    String StrUserId        = (String) session.getAttribute("USERID");
     String entity        = (String) session.getAttribute("ENTITY");
    String strTheme         = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String FCJStream        = (String)session.getAttribute("FCJStream");
    FCUserGlobals Objuc     = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/

    FBContext fbContext     = new FBContext(StrUserId);
    BranchLogger brnLogger  = new BranchLogger(StrUserId);
    fbContext.setBrnLogger(brnLogger);
   /* # BUG 15978732 fixes start */ 
    String callFormLaunched = FCUtility.validateParameter(request.getParameter("callFormLaunched"));
    String scrType = FCUtility.validateParameter(request.getParameter("scrType"));
    /* # BUG 15978732 fixes end */ 
    
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
          
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    
    String funcID	    = FCUtility.validateParameter(request.getParameter("functionid"));
    String thirdChar        = "";
    if (funcID != null || "".equals(funcID)){
        thirdChar = funcID.substring(2,3);
    }
    String summaryAdvJsFile="";
    String isAdvSumScr="";
    String scrChldFnID = FCUtility.validateParameter(request.getParameter("scrChildFnId"));//Screenchild issue
    String parentFuncID = FCUtility.validateParameter(request.getParameter("parentFunc"));
    String uiXML	= FCUtility.validateParameter(request.getParameter("uixml"));
    if(uiXML == null || "".equals(uiXML)){
        uiXML = funcID;
    }
    String inLoadTime=request.getParameter("inTime");//Performance Changes
    String scriptName;
    String screenType           = null;
    String menuXML              = "";
     /* # BUG 15978732 fixes start */ 
    String scrName	        = FCUtility.validateParameter(request.getParameter("scr"));
    if ("".equalsIgnoreCase(scrName)) {
        scrName = "CVS_UNKNOWN";
    }
    String reKey	        = FCUtility.validateParameter(request.getParameter("rekey"));
    String gAction              = FCUtility.validateParameter(request.getParameter("gAction"));
    String description          = FCUtility.validateParameter(request.getParameter("description"));
    String childFunctionOrigin  = FCUtility.validateParameter(request.getParameter("funcOrigin"));
    String childParentFunction  = FCUtility.validateParameter(request.getParameter("prntFunc"));
    String childParentOrigin    = FCUtility.validateParameter(request.getParameter("prntOrigin"));
    String txnBranch            = FCUtility.validateParameter(request.getParameter("txnBranch"));
    String authReq              = FCUtility.validateParameter(request.getParameter("authReq"));
	//11.1 Remarks Changes - Starts Here
    String remarksReq       = FCUtility.validateParameter((String)request.getAttribute("remarksReq")); 
   
    String hoFunction   = FCUtility.validateParameter((String)request.getAttribute("hoFunction"));
    /*  logging reqd flag N issue */
    String loggingReqd      = FCUtility.validateParameter((String)request.getAttribute("loggingReqd"));
/* # BUG 15978732 fixes end */ 
	/*12.0.2 Code for Loading Cluster/Custom js File starts*/
    /*
    String clusterModified  = FCUtility.validateParameter((String)request.getAttribute("clusterModified"));
    String customModified   = FCUtility.validateParameter((String)request.getAttribute("customModified"));
	*/
    String clusterModified  = FCUtility.validateParameter(request.getParameter("clusterModified"));
    String customModified   = FCUtility.validateParameter(request.getParameter("customModified"));
	/*12.0.2 Code for Loading Cluster/Custom js File ends*/
	//11.1 Remarks Changes - Ends Here
    if ("Y".equalsIgnoreCase(branchIdentifier)) {
        menuXML = Objuc.getLoginProcessor().getMenuXml();
    } else {
        Map menuDetails = (HashMap)session.getAttribute("MENUDETAILS");
                
        menuXML = (String)menuDetails.get("MENU");
    }
    
    javax.xml.parsers.DocumentBuilderFactory docFactory = javax.xml.parsers.DocumentBuilderFactory.newInstance(); 
    docFactory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING,true);
    javax.xml.parsers.DocumentBuilder builder = docFactory.newDocumentBuilder();
     builder.setEntityResolver(new FCUBSEntityResolver());
    Document menuXMLDOM = builder.parse(new InputSource(new StringReader(menuXML)));
//JC4XALAN
//  if(XPathAPI.selectSingleNode(menuXMLDOM,"//LEAF[@FNID = '"+funcID+"']") != null){
//      Element element = (Element)XPathAPI.selectSingleNode(menuXMLDOM,"//LEAF[@FNID = '"+funcID+"']");
    if(xpath.evaluate("//LEAF[@FNID = '"+funcID+"']",menuXMLDOM,XPathConstants.NODE) != null){
        Element element = (Element)xpath.evaluate("//LEAF[@FNID = '"+funcID+"']",menuXMLDOM,XPathConstants.NODE);
//JC4XALAN

        screenType = element.getAttribute("TYPSTR");
    }
        
    if(screenType == null || screenType == "")
        screenType = Objuc.getTypString(parentFuncID); //21678016

    String l_XslFileName = "ExtDetail.xsl";
    
   /* # BUG 15978732 fixes start */ 
    if (FCUtility.validateParameter(request.getParameter("IsAdv_Sum_Scr")) != null && FCUtility.validateParameter(request.getParameter("IsAdv_Sum_Scr")).equalsIgnoreCase("Y"))
    /* # BUG 15978732 fixes end */ 
    
      l_XslFileName = "ExtSummary_Advanced.xsl";     
    
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    
String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
  <head>
    <title><%=StringEscapeUtils.escapeHTML(description)%></title>
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
    <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>
    <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>
    <!--<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>-->
    <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
    <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
    <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
       
    <%
    /* # BUG 15978732 fixes start */ 
    if (FCUtility.validateParameter(request.getParameter("IsAdv_Sum_Scr")) != null && FCUtility.validateParameter(request.getParameter("IsAdv_Sum_Scr")).equalsIgnoreCase("Y")) {
    /* # BUG 15978732 fixes end */ 
   
    %>
        <style>
            .TBLoneTH {background:transparent; border:none; text-align:left}
            .TBLone td {border:none}
        </style>
    <%
    }
    %>
    <script type="text/javascript">
	//var dlgArg         = dialogArguments;
	var mainWin        = parent.mainWin;
        var screenKo=""; //OJET Migration
        
         
        var parentKernelJSFile="";
        var kernelJSFile="";
            
        var parentClusterJSFile="";
        var clusterJSFile="";

         var parentCustomJSFile="";
         var customJSFile="";
        
        var onceAuthObj    = parent.onceAuthObj;
		var moduleid = parent.moduleid; //9NT1606_12_4_RETRO_12_1_26230724 changes 
        var gInpDateFormat = "dd/MM/yyyy";
	var gAction        = "";
        var strTheme       = '<%= StringEscapeUtils.escapeJavaScript(strTheme) %>';
        var screenType     = '<%=StringEscapeUtils.escapeJavaScript(screenType)%>';
        if(screenType=='') ////21678016 starts
            screenType = parent.screenType;
        if(screenType=='')
            screenType='M';////21678016 ends // code moved from FCUSerGloabls
        var txnBranch      = '<%=StringEscapeUtils.escapeJavaScript(txnBranch)%>';
        if(typeof(parent.restrictReqd) != undefined) var restrictReqd = parent.restrictReqd;//jc2 changes//PIPA
		if(typeof(parent.restrictPrint) != undefined) var restrictPrint = parent.restrictPrint;//jc2 changes//PIPA
        if(typeof(parent.reqEncReqd) != undefined) var reqEncReqd = parent.reqEncReqd;//E2E Changes
    </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> 
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <!--
    <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtFuncs.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    -->
    <%
        if("C".equalsIgnoreCase(thirdChar) || "R".equalsIgnoreCase(thirdChar) || "B".equalsIgnoreCase(thirdChar) || "EXTAUTHORIZE".equalsIgnoreCase(funcID) ){
    %>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <!--<script type="text/javascript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <%
        }else{
            String tempFilePath = getServletConfig().getServletContext().getRealPath("/Script/JS/");
            FCGenerateSysExt fileGen = null;// extJSUIXML changes sarts
            if(BranchConstants.EXT_JSUIXML_PATH.equals("")) { 
                fileGen = new FCGenerateSysExt(fbContext, tempFilePath);
            } else {
                tempFilePath = BranchConstants.EXT_JSUIXML_PATH + "/Script/JS/";
                fileGen = new FCGenerateSysExt(fbContext, tempFilePath,tempFilePath);
            }// extJSUIXML changes ends
            //FCGenerateSys fileGen = new FCGenerateSys(fbContext, tempFilePath);
            fileGen.GenSys(uiXML);
    %>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <!--<script type="text/javascript" src="Script/JS/SYS/<%= StringEscapeUtils.escapeURL(uiXML) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
    <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <%
        }
    %>
    <!--<script type="text/javascript" src="Script/ExtJS/ExtDatabinding.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtensibleMEUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtensibleUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/Extensible.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtBuildXML.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->    
    <%
    if ("WB".equalsIgnoreCase(scrType)) {
    %>
    <script type="text/javascript" src="Script/ExtJS/ExtBranch.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%
    }
    %>   
    <%
    if ("EXTAUTHORIZE".equalsIgnoreCase(funcID)) {
    %>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML)%>.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <%
    } else {
    %>
        <%
        if ("KERNEL".equalsIgnoreCase(FCJStream)) {
        %>
            <%
            if (!"".equalsIgnoreCase(childParentFunction)) {
            %>
                <%
                if ("KERNEL".equalsIgnoreCase(childParentOrigin)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_KERNEL.js"></script>-->
                    <script language="JavaScript">parentKernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_KERNEL";  </script>
                    
                <%
                }
                %>
            <%
            } 
            if ("KERNEL".equalsIgnoreCase(childFunctionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_KERNEL.js"></script>-->
                  <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_KERNEL";  </script>
            <%
            }
            %>
        <%
        } else if ("CLUSTER".equalsIgnoreCase(FCJStream)) {
        %>
            <%
            if (!"".equalsIgnoreCase(childParentFunction)) {
            %>
                <%
                if ("KERNEL".equalsIgnoreCase(childParentOrigin)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_KERNEL.js"></script>-->
                     <script language="JavaScript">parentKernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_KERNEL";  </script>
                    <%
                    if ("Y".equalsIgnoreCase(clusterModified)) {
                    %>
                        <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_CLUSTER.js"></script>-->
                         <script language="JavaScript">parentClusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_CLUSTER";  </script>
                    <%
                    }
                    %>
                <%
                } else if ("CLUSTER".equalsIgnoreCase(childParentOrigin)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_CLUSTER.js"></script>-->
                     <script language="JavaScript">parentClusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_CLUSTER";  </script>
                <%
                }
                %>
            <%
            } 
            if ("KERNEL".equalsIgnoreCase(childFunctionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_KERNEL.js"></script>-->
                <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_KERNEL";  </script>
                <%
                if ("Y".equalsIgnoreCase(clusterModified)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CLUSTER.js"></script>-->
                     <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CLUSTER";  </script>
                <%
                }
                %>
            <%
            } else if ("CLUSTER".equalsIgnoreCase(childFunctionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CLUSTER.js"></script>-->
                <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CLUSTER";  </script>
            <%
            }
            %>
        <%
        } else if ("CUSTOM".equalsIgnoreCase(FCJStream)) {
        %>
            <% 
            if (!"".equalsIgnoreCase(childParentFunction)) {
            %>
                <%
                if ("KERNEL".equalsIgnoreCase(childParentOrigin)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_KERNEL.js"></script>-->
                    <script language="JavaScript">parentKernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_KERNEL";  </script>
                    <%
                    if ("Y".equalsIgnoreCase(clusterModified)) {
                    %> 
                        <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_CLUSTER.js"></script>-->
                         <script language="JavaScript">parentClusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_CLUSTER";  </script>
                    <%
                    }
                    if ("Y".equalsIgnoreCase(customModified)) {
                    %>
                        <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_CUSTOM.js"></script>-->
                         <script language="JavaScript">parentCustomJSFile = "JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_CUSTOM";  </script>
                    <%
                    }
                    %>
                <%
                } else if ("CLUSTER".equalsIgnoreCase(childParentOrigin)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_CLUSTER.js"></script>-->
                     <script language="JavaScript">parentClusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_CLUSTER";  </script>
                    <%
                    if ("Y".equalsIgnoreCase(customModified)) {
                    %>
                        <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_CUSTOM.js"></script>-->
                         <script language="JavaScript">parentCustomJSFile = "JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_CUSTOM";  </script>
                    <%
                    }
                    %>
                <%
                } else if ("CUSTOM".equalsIgnoreCase(childParentOrigin)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_CUSTOM.js"></script>-->
                     <script language="JavaScript">parentCustomJSFile = "JS/<%= StringEscapeUtils.escapeURL(childParentFunction) %>_CUSTOM";  </script>
                <%
                }
                %>
            <%
            } 
            if ("KERNEL".equalsIgnoreCase(childFunctionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_KERNEL.js"></script>-->
                 <script language="JavaScript">kernelJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_KERNEL";  </script>
                <%
                if ("Y".equalsIgnoreCase(clusterModified)) {
                %> 
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CLUSTER.js"></script>-->
                    <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CLUSTER";  </script>
                <%
                }
                if ("Y".equalsIgnoreCase(customModified)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CUSTOM.js"></script>-->
                     <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CUSTOM";  </script>
                <%
                }
                %>
            <%
            } else if ("CLUSTER".equalsIgnoreCase(childFunctionOrigin)) {
            %>
            <script language="JavaScript">clusterJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CLUSTER";  </script>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CLUSTER.js"></script>-->
                <%
                if ("Y".equalsIgnoreCase(customModified)) {
                %>
                    <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CUSTOM.js"></script>-->
                      <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CUSTOM";  </script>
                <%
                }
                %>
            <%
            } else if ("CUSTOM".equalsIgnoreCase(childFunctionOrigin)) {
            %>
                <!--<script language="JavaScript" src="Script/JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CUSTOM.js"></script>-->
                  <script language="JavaScript">customJSFile = "JS/<%= StringEscapeUtils.escapeURL(uiXML) %>_CUSTOM";  </script>
            <%
            }
            %>
        <%
        }
        %>   
    <%
    }
    %>
    <%
        if(funcID.substring(2,3).equalsIgnoreCase("R")){
    %>
    <script type="text/javascript" src="Script/JS/FCJReport.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%
        } 
          /* # BUG 15978732 fixes start */ 
        else if(funcID.substring(2,3).equalsIgnoreCase("S") || (FCUtility.validateParameter(request.getParameter("IsAdv_Sum_Scr")) != null && FCUtility.validateParameter(request.getParameter("IsAdv_Sum_Scr")).equalsIgnoreCase("Y"))) {  
          /* # BUG 15978732 fixes end */ 
            String sumFuncId = uiXML.substring(0,2) + "D" + uiXML.substring(3,uiXML.length());
            summaryAdvJsFile=sumFuncId+"_SYS";
            isAdvSumScr="Y";
    %>    
    <!--<script type="text/javascript" src="Script/ExtJS/ExtGlobalSumUtil.js"></script>--> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <!--<script type="text/javascript" src="Script/ExtJS/ExtGlobalSumAdv.js"></script>--> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <!--<script type="text/javascript" src="Script/ExtJS/ExtGlobalSum.js"></script>--> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <!--<script type="text/javascript" src="Script/JS/SYS/<%= StringEscapeUtils.escapeURL(sumFuncId) %>_SYS.js"></script>--> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <%
	}
    %>
    <script type="text/javascript">
        if(screenType =="WB"){            
            dataObj             = parent.dataObj;
        }
		mainWin             = parent.mainWin;
        var xmlFileName;
        var xslFileName;//OJET Migration
        //var timeLogsArray = new Array();
        var cache1, cache2;
        var summaryAdvJsFile    = '<%=StringEscapeUtils.escapeJavaScript(summaryAdvJsFile)%>';
        var isAdvSumScr         = '<%=StringEscapeUtils.escapeJavaScript(isAdvSumScr)%>';
        var FCJStream           = '<%=StringEscapeUtils.escapeJavaScript(FCJStream)%>';
        var langCode            = '<%=StringEscapeUtils.escapeJavaScript(Strlang)%>';
        var functionId 	        = '<%= StringEscapeUtils.escapeJavaScript(funcID) %>';
        var scrName             = '<%=StringEscapeUtils.escapeJavaScript(scrName)%>';
        var thirdChar 	        = functionId.substring(2,3);
        var routingType         = "X";
        var reKey	 	= '<%= StringEscapeUtils.escapeJavaScript(reKey) %>';
        var uiXML 		= '<%= StringEscapeUtils.escapeJavaScript(uiXML) %>';
        var childFunctionOrigin = '<%=StringEscapeUtils.escapeJavaScript(childFunctionOrigin)%>';
        var childParentFunction = '<%=StringEscapeUtils.escapeJavaScript(childParentFunction)%>';
        var childParentOrigin   = '<%=StringEscapeUtils.escapeJavaScript(childParentOrigin)%>';
        var callFormLaunched    = '<%=StringEscapeUtils.escapeJavaScript(callFormLaunched)%>';
        var hoFunction          = '<%=StringEscapeUtils.escapeJavaScript(hoFunction)%>';
      //  logging reqd flag N issue
        var loggingReqd      = '<%= StringEscapeUtils.escapeJavaScript(loggingReqd)%>';
      
        var fromSubScr          = true;
        //11.1 Remarks Changes - Starts Here
		var remarksReq          = '<%=StringEscapeUtils.escapeJavaScript(remarksReq)%>';  
		var scrChldFnID			 = '<%=StringEscapeUtils.escapeJavaScript(scrChldFnID)%>';//ScreenChild issue 
        var inLoadTime           = '<%=StringEscapeUtils.escapeJavaScript(inLoadTime)%>';//Performance Changes
		//11.1 Remarks Changes - Ends Here
        cache1		        = new Image();
        cache1.src	        = "";//Data Uri change
        cache2		        = new Image();
        cache2.src	        = "";//Data Uri change
        var dbDataDOM;	// This Variable Holds dbDataDOM of parent screen and appended data of current sub screen
        var dataObj;    //FC11.0 WB CHANGES        
        if (uiXML == "") {
            if(scrChldFnID != ""){//ScreenChild issue fixes begin
                xmlFileName = mainWin.UIXmlPath + "/<%= StringEscapeUtils.escapeURL(Strlang) %>/" + scrChldFnID + ".xml";
            }else{
            xmlFileName	= mainWin.UIXmlPath + "/<%= StringEscapeUtils.escapeURL(Strlang) %>/" + functionId + ".xml";
            }
        } else {
		if(scrChldFnID != ""){
                xmlFileName = mainWin.UIXmlPath + "/<%= StringEscapeUtils.escapeURL(Strlang) %>/" + scrChldFnID + ".xml";
            }else{
			xmlFileName	= mainWin.UIXmlPath + "/<%= StringEscapeUtils.escapeURL(Strlang) %>/" + uiXML + ".xml";
		}
        }//ScreenChild issue fixes end
        xslFileName= '<%= StringEscapeUtils.escapeJavaScript(l_XslFileName)%>'; //OJET Migration
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
        var launcherHeaderWidth  = parent.document.getElementById("DIVWNDContainer").style.width;
        var launcherLeft         = parent.parent.document.getElementById(parentScrID).style.left;
        var clusterModified     = '<%= StringEscapeUtils.escapeJavaScript(clusterModified)%>';
        var customModified      = '<%= StringEscapeUtils.escapeJavaScript(customModified)%>';
        var dialogZIndex = parent.dialogZIndex;
    </script>
    <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>    
    
    <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <!--<script type="text/javascript" src="Script/OJET/require-config.js"></script>-->
        <script type="text/javascript" src="Script/OJET/main_subscreen.js"></script>
       
    </head>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <body class="BDYform" onkeydown="return fnHandleButtons(event)" oncontextmenu="return false;"
          onhelp="return disableDefault();">
        <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
           <div id="Div_AlertWin"   onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none;z-index:6000"><!--HTML5 Changes-->
                    <iframe id="ifr_AlertWin"  src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
                 </div>
                <div id="Div_ChildWin" style="display:none;  ">
                </div>
        <div  id="DIVWNDContainer" style="height:100%">
       
        <oj-dialog id="subscreenDialog"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"  id="DIVWNDContainer"
                      position.of="window"  style=" min-width: 100vw;min-height: 100vh;max-height: 100vh;height: 100vh;" class="frames">
                <div slot=header id="WNDtitlebar" class="oj-dialog-title oj-flex-bar oj-sm-align-items-center bottom-border"  style="width: 100%">
                <div class="oj-flex-bar-start" id="wndtitle">
                    <h3><%=StringEscapeUtils.escapeHTML(description)%>&nbsp;</h3>
                    </div>
                     <div class="oj-flex-bar-end">
                      <oj-button display="icons" chroming="borderless" type="button" id="WNDbuttons" class="WNDcls" onkeydown="return fnHandleScrBtn(event)" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>">
                        <span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
                        </oj-button>
        
                    </div>
                </div>
                
                <div  id="DIVScrContainer" slot="body">
                
                <div id="ResTree" ></div>
                
                <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
               
                    
                 </div>
                <div id="subscreenFooter" class="DIVfooter oj-sm-padding-1x"  slot="footer"></div>
            </oj-dialog>
           
    
            <!--<DIV id="WNDtitlebar"    >
                <div class="oj-flex-bar oj-sm-align-items-center oj-sm-margin-4x-start oj-sm-margin-4x-end bottom-border" id="wndtitle">
                <div class="oj-flex-bar-start">
                    <h3><%=StringEscapeUtils.escapeHTML(description)%>&nbsp;</h3>
                    </div>
                    
                    <div class="oj-flex-bar-end">
                       <oj-button display="icons" chroming="borderless" type="button" id="WNDbuttons" class="WNDcls" onkeydown="return fnHandleScrBtn(event)" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>">
                        <span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
                        </oj-button>
                       --><!-- Security bug SEC-12-Patch-081 fixes starts  --><!-- --><!-- 1203 oghag fix changed id --><!--
                    </div>
                    
                    
                </div>
            </DIV>-->
            <!--<div  id="DIVScrContainer">
                <div id="ResTree"></div>
                <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
            </div>-->
            </div>
         
        
        <div id="masker" class="masker" style="display:none">
          
            
        </div>
    </body>
</html>
