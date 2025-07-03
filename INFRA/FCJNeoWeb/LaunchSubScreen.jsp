<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : LaunchSubScreen.jsp
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
<%@ page import="com.ofss.fcc.utility.FCGenerateSys"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.io.StringReader"%>
<%@ page import="javax.xml.XMLConstants" %>
<%@ page import="org.w3c.dom.Document"%>
<%@ page import="org.w3c.dom.Element"%>
<%@ page import="org.xml.sax.InputSource"%>
<!-- JC4XALAN --> 
<%@ page import="javax.xml.xpath.XPath"%>
<%@ page import="javax.xml.xpath.XPathConstants"%>
<%@ page import="javax.xml.xpath.XPathExpressionException"%>
<%@ page import="javax.xml.xpath.XPathFactory"%>
<!-- JC4XALAN --> 
  
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
    String Strlang         = (String)session.getAttribute("LANG");
    String StrlangISOMap   = (String)session.getAttribute("LANGISOMAP");
    String StrUserId       = (String) session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String strTheme     = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    FCUserGlobals Objuc    = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
    String CSRFtoken    = (String)session.getAttribute("X-CSRFTOKEN");
    String ieCss         = (String)session.getAttribute("IECSS");

    FBContext fbContext = new FBContext(StrUserId);
    BranchLogger brnLogger = new BranchLogger(StrUserId);
    fbContext.setBrnLogger(brnLogger);
    
    String funcID		   = FCUtility.validateParameter(request.getParameter("functionid"));
    String thirdChar ="";
    if (funcID != null || "".equals(funcID)){
        thirdChar = funcID.substring(2,3);
    }
    
    String parentFuncID        = FCUtility.validateParameter(request.getParameter("parentFunc"));
    String uiXML		   = FCUtility.validateParameter(request.getParameter("uixml"));
    if(uiXML == null || "".equals(uiXML)){
        uiXML = funcID;
    }
    String inTime=request.getParameter("inTime");//Performance Changes
   /* # BUG 15978732 fixes start */ 
    String callFormLaunched = FCUtility.validateParameter(request.getParameter("callFormLaunched"));
    String fromCallform = FCUtility.validateParameter(request.getParameter("fromCallform"));
    String description = FCUtility.validateParameter(request.getParameter("description"));
    String scrName		 = FCUtility.validateParameter(request.getParameter("scr"));
    String reKey		   = FCUtility.validateParameter(request.getParameter("rekey"));
   /* # BUG 15978732 fixes end */ 
    String scriptName;
    String screenType = null;
    /* # BUG 15978732 fixes start */ 
    String gAction   = FCUtility.validateParameter(request.getParameter("gAction"));
    String txnBranch = FCUtility.validateParameter((String)request.getParameter("txnBranch"));
    /* # BUG 15978732 fixes end */ 
    String menuXML = "";
    if ("Y".equalsIgnoreCase(branchIdentifier)) {
        menuXML = Objuc.getLoginProcessor().getMenuXml();
    } else {
        Map menuDetails = (HashMap)session.getAttribute("MENUDETAILS");
        menuXML = (String)menuDetails.get("MENU");
    }

    javax.xml.parsers.DocumentBuilderFactory docFactory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
    //docFactory.setValidating(true); //#FortifyCodeReview Changes
    docFactory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING,true);
    javax.xml.parsers.DocumentBuilder builder = docFactory.newDocumentBuilder();
     builder.setEntityResolver(new FCUBSEntityResolver());
    Document menuXMLDOM = builder.parse(new InputSource(new StringReader(menuXML)));
//JC4XALAN
//  if(XPathAPI.selectSingleNode(menuXMLDOM,"//LEAF[@FNID = '"+funcID+"']") != null){
//      Element element = (Element)XPathAPI.selectSingleNode(menuXMLDOM,"//LEAF[@FNID = '"+funcID+"']");
    if(xpath.evaluate("//LEAF[@FNID = '"+funcID+"']",menuXMLDOM,XPathConstants.NODE) != null){
        Element element = (Element)xpath.evaluate("//LEAF[@FNID = '"+funcID+"']",menuXMLDOM,XPathConstants.NODE);
        }
//JC4XALAN


        
    if(screenType == null || screenType == "")
        screenType = Objuc.getTypeString(parentFuncID);

    scriptName 	= uiXML;
		
    String l_XslFileName = "Detail.xsl";
   /* # BUG 15978732 fixes start */ 
    if (FCUtility.validateParameter(request.getParameter("IsAdv_Sum_Scr")) != null && FCUtility.validateParameter(request.getParameter("IsAdv_Sum_Scr")).equalsIgnoreCase("Y"))
      /* # BUG 15978732 fixes end */ 
      l_XslFileName = "Summary_Advanced.xsl";     
      
    
    Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
      
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
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
    <link href="Theme/<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>
    <link href="Theme/<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
    <link href="Theme/<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
    <link href="Theme/<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
    <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>
    <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>
    <!--<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>-->
    <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
    <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
    <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
      
    <script type="text/javascript">
	//var dlgArg         = dialogArguments;
        var mainWin        = parent.mainWin;
        var onceAuthObj    = parent.onceAuthObj;
        var transactionJSFile="";
        var maintenanceJSFile="";
	var processJSFile="";
				
	var gInpDateFormat = "dd/MM/yyyy";
	var gAction        = "";
        var strTheme    = '<%= StringEscapeUtils.escapeJavaScript(strTheme) %>';
        var txnBranch = '<%=StringEscapeUtils.escapeJavaScript(txnBranch)%>';   
        var callFormLaunched = '<%=StringEscapeUtils.escapeJavaScript(callFormLaunched)%>';
        var fromCallform = '<%=StringEscapeUtils.escapeJavaScript(fromCallform)%>';
        var screenType     = '<%=StringEscapeUtils.escapeJavaScript(screenType)%>';
        if(typeof(parent.restrictReqd) != undefined) var restrictReqd = parent.restrictReqd;//jc2 changes//PIPA
		if(typeof(parent.restrictPrint) != undefined) var restrictPrint = parent.restrictPrint;//jc2 changes//PIPA
    </script>
    <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/GlobalConstants.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/UIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Util.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/AmountUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/MaskFormatter.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
   <%-- <script type="text/javascript" src="Script/JS/OvrdMsgs.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>--%>
    <script type="text/javascript" src="Script/JS/Validations.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Authorize.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%
        if("C".equalsIgnoreCase(thirdChar) || "R".equalsIgnoreCase(thirdChar) || "B".equalsIgnoreCase(thirdChar)){
    %>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
     <!--   <script type="text/javascript" src="Script/JS/<%= StringEscapeUtils.escapeURL(scriptName) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
    <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <%
        }else{
            String tempFilePath = getServletConfig().getServletContext().getRealPath("/Script/JS/");
            FCGenerateSys fileGen = null;// extJSUIXML changes sarts
            if(!BranchConstants.EXT_JSUIXML_PATH.equals("")) { 
                tempFilePath = BranchConstants.EXT_JSUIXML_PATH + "/Script/JS/";
            }
            fileGen = new FCGenerateSys(fbContext, tempFilePath);// extJSUIXML changes ends
            fileGen.GenSys(scriptName);
    %>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
       <!-- <script type="text/javascript" src="Script/JS/SYS/<%= StringEscapeUtils.escapeURL(scriptName) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <%
        }
    %>
   <!-- <script type="text/javascript" src="Script/JS/Databinding.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/AuditTrail.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/TabContent.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/TabPersist.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
    <%
      if(gAction != null) {
      if(!(gAction.indexOf("AUTH") != -1)){
      if(screenType.equalsIgnoreCase("O")) {
    %>
    <script type="text/javascript" >transactionJSFile="JS/Transaction";</script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%
      }
    %>
    <%
      if(screenType.equalsIgnoreCase("M")) {
    %>
    <script type="text/javascript" > maintenanceJSFile="JS/Maintenance";</script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%
      }
      }
      }
    %>
  <!--  <script type="text/javascript" src="Script/JS/BuildXML.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
  <!--  <script type="text/javascript" src="Script/JS/<%= StringEscapeUtils.escapeURL(scriptName) %>.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
    <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <%
%>
    <%

if(funcID.substring(2,3).equalsIgnoreCase("R")){
%>
    <script type="text/javascript" src="Script/JS/FCJReport.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%
} 
else if(funcID.substring(2,3).equalsIgnoreCase("S")) {  
    String sumFuncId = uiXML.substring(0,2) + "D" + uiXML.substring(3,uiXML.length());
%>    
    <script type="text/javascript" src="Script/JS/Maintenance.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/GlobalSummary.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%
        if("C".equalsIgnoreCase(thirdChar)){
    %>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <script type="text/javascript" src="Script/JS/<%= StringEscapeUtils.escapeURL(sumFuncId) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <%
        }else{
    %>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/SYS/<%= StringEscapeUtils.escapeURL(sumFuncId) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <%
        }
    %>
    
    <%
	}
  
%>
<%
%>
    <script type="text/javascript">
    
        var xmlFileName;
        var xslFileName;//OJET Migration
        var cache1, cache2;
        var langCode = '<%=StringEscapeUtils.escapeJavaScript(Strlang)%>';
        var functionId 	= '<%= StringEscapeUtils.escapeJavaScript(funcID) %>';
        var reKey	 	= '<%= StringEscapeUtils.escapeJavaScript(reKey) %>';
        var uiXML 		= '<%= StringEscapeUtils.escapeJavaScript(uiXML) %>';
         var scrName             = '<%=StringEscapeUtils.escapeJavaScript(scrName)%>';
        var fromSubScr          = true;
        cache1		= new Image();
        cache1.src	= ""; //Data Uri change
        cache2		= new Image();
        cache2.src	= ""; //Data Uri change
         var thirdChar 	        = functionId.substring(2,3);
        var dbDataDOM;	// This Variable Holds dbDataDOM of parent screen and appended data of current sub screen
                    
        if (uiXML == "") {
            xmlFileName = mainWin.UIXmlPath + "/<%= StringEscapeUtils.escapeURL(Strlang) %>/" + functionId + ".xml";
        } else {
            xmlFileName	= mainWin.UIXmlPath + "/<%= StringEscapeUtils.escapeURL(Strlang) %>/" + uiXML + ".xml";
        }
        
        var parentScrID = "ChildWin";   
        if(typeof(parent.fromSubScr) == 'undefined') {
            parentScrID = parent.seqNo;
        }
         xslFileName= '<%= StringEscapeUtils.escapeJavaScript(l_XslFileName)%>'; //OJET Migration
        var inTime           = '<%=StringEscapeUtils.escapeJavaScript(inTime)%>';//Performance Changes
        var launcherDIVWidth     = parent.parent.document.getElementById(parentScrID).style.width;
        var launcherDIVHeight    = parent.parent.document.getElementById(parentScrID).style.height;
        var launcherIFWidth      = parent.parent.document.getElementById(parentScrID).children[0].style.width;
        var launcherIFHeight     = parent.parent.document.getElementById(parentScrID).children[0].style.height;
        var launcherResTreeHeight= parent.document.getElementById("DIVScrContainer").style.height;
        var launcherResTreeWidth = parent.document.getElementById("DIVScrContainer").style.width;
        var launcherLeft         = parent.parent.document.getElementById(parentScrID).style.left;
        var launcherHeaderWidth  = parent.document.getElementById("DIVWNDContainer").style.width;   
    var dialogZIndex = parent.dialogZIndex;
    </script>
    <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <!--<script type="text/javascript" src="Script/OJET/require-config.js"></script>-->
        <script type="text/javascript" src="Script/OJET/main_nonextsubscreen.js"></script>
  </head>
   <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
  <body class="BODYForm" onkeydown="return fnHandleButtons(event)"
        onhelp="return disableDefault();"
        onmousedown="event.cancelBubble=true;">
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
         <div id="Div_AlertWin"   onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none;z-index:6000"><!--HTML5 Changes-->
                    <iframe id="ifr_AlertWin"  src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
                 </div>
                <div id="Div_ChildWin" style="display:none;  ">
                </div>
            <div id="DIVWNDContainer" style="height:100%">
            <oj-dialog id="subscreenDialog"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"          position.of="window"  style=" min-width: 100vw;min-height: 100vh;max-height: 100vh;height: 100vh;" class="frames">
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
           
    
    <!--        <DIV class=WNDtitlebar id="WNDtitlebar" onmousedown="startDrag('ChildWin', event)">
                <div class="WNDtitle" id="wndtitle">
                    <B class="BTNicon">
                        <span class="ICOflexcube"></span>
                    </B>
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(description)%>&nbsp;</h1>
                    <div class="WNDbuttons">
                        <a id="WNDbuttons" class="WNDcls" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" onkeydown="return fnHandleScrBtn(event)" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>">
                        <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                        </a>
                    </div>
                </div>
            </DIV>
            <div class="WNDcontent" id="DIVScrContainer">
            <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
                <div id="ResTree"></div>
            </div>--> 
        </div>    
        <div id="masker" class="masker" style="display:none">
            </div>
    </body>
</html>
