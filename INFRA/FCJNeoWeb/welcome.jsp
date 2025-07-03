<%
/*----------------------------------------------------------------------------------------------------
**
** File Name    : welcome.jsp
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

Copyright © 2004-2016  by Oracle Financial Services  Software Limited..
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
--------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.io.StringWriter"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="java.util.List"%>

<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    response.setHeader("X-CONTENT-TYPE-OPTIONS", "nosniff");/*Fix for 34010028 */
    response.setHeader("X-FRAME-OPTIONS", "DENY");
    if("Y".equalsIgnoreCase(BranchConstants.SSL_ENABLED)) {
        response.setHeader("Strict-Transport-Security", "max-age=31622400; includeSubDomains"); 
        response.setHeader("Content-Security-Policy", "upgrade-insecure-requests");
    }
    String ssoReqd = BranchConstants.SSO_REQD;
    String lDN = "";//Fix for 17466253 
    String ssoKey = "DN";//Fix for 17466253
    String samlDN ="";//Fix for 28778852
    if ("Y".equalsIgnoreCase(ssoReqd)) {
        ssoKey = BranchConstants.SSO_KEY;
        //Fix for 28778852
        if("SAML".equalsIgnoreCase(BranchConstants.SSO_TYPE))		{
            samlDN=request.getParameter(ssoKey);
        }
    }
   // String lDN = request.getHeader("DN"); //Fix for 17466253 
    if (ssoKey != null && !"".equals(ssoKey)) {
        lDN = ssoKey;
    }    
    lDN = request.getHeader(ssoKey); //Fix for 17466253 
    String DN =     validateParameter(lDN);
    if (DN != null) {
        DN = DN.replaceAll("\\\\", "");
    }
    session.setAttribute("SSODN", DN);
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*///FCUBS10.0 SSO 
    String Strlang          = BranchConstants.DEFAULT_LANGCODE;
    String StrlangISOMap    = (BranchConstants.DEFAULT_LANG_ISOMAP).toLowerCase();
    String branchIdentifier = BranchConstants.BRANCH_CENTRALIZED;
    boolean isDebug         = BranchConstants.SINGLETON_DEBUG;   
    String TerminalId       = (String) FCUtility.getCleintIPAddr(request);    
    String strAllTheme      = BranchConstants.DEFAULT_STYLE;
    String strThemArray[]   = strAllTheme.split("!");
    String strTheme         = "Flexblue";
    for (int i=0; i<strThemArray.length; i++) {
        if (strThemArray[i].indexOf("~D") >0) {
            strTheme = strThemArray[i].split("~")[0];
            break;
        }
    }
    String entity = "";
    if ("Y".equalsIgnoreCase(ssoReqd)) {//Fix for 23069092 
        entity = FCUtility.validateParameter(request.getHeader("entity"))!=null?FCUtility.validateParameter(request.getHeader("entity")):"";
    }else{
        entity = FCUtility.validateParameter(request.getParameter("entity"))!=null?FCUtility.validateParameter(request.getParameter("entity")):"";
    }
    if (entity != null && !"".equals(entity)) {
        List entityList = BranchConstants.ENTITY_LIST;
        if (entityList.size() > 0 && !entityList.contains(entity)) {
            entity = "";
        }
    }
    session.setAttribute("ENTITY", entity);
    String multiEntity = BranchConstants.MULTI_ENTITY;
    FBContext fbContext = new FBContext("Client");
    BranchLogger brnLogger = new BranchLogger("Client");
    fbContext.setBrnLogger(brnLogger);
    fbContext.setDebug(isDebug);
    
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+BranchConstants.DEFAULT_LANGCODE + "~" + entity, branchIdentifier,"");
    Map releaseMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"RELEASE_VERSION~~", branchIdentifier,"");//Fix for 22964200 
    
    if(itemDescMap == null){
        itemDescMap = BranchConstants.LABEL_MAP;
    }
    if(releaseMap == null){
        releaseMap = BranchConstants.RELEASE_MAP;
    }
    
    String title = null;
    if ("FGL".equalsIgnoreCase(BranchConstants.APPLICATION_NAME)) {
        title = (String)itemDescMap.get("LBL_FCUBSFGL_TITLE") + releaseMap.get("RELEASE") + itemDescMap.get("LBL_FCUBS_LOGIN");
    } else {
        title = (String)itemDescMap.get("LBL_FCUBS_TITLE") + releaseMap.get("RELEASE") + itemDescMap.get("LBL_FCUBS_LOGIN");
    }
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
%>
<%!
    public String validateParameter(String input) {
        if(input == null)
            return null;
        if("".equalsIgnoreCase(input))
                return "";
       StringWriter writer = new StringWriter((int)(input.length() * 1.5));
        int length = input.length();
          for (int ctr = 0; ctr < length; ctr++) {
            char token = input.charAt(ctr);
            if ((token >= 48 && token <= 57) || (token >= 65 && token <= 90) || (token >= 97 && token <= 122) || token == 92 || token == 95 || token == 126 || token == 45 || token == 64 || token == 61 || token == 44 || token == 46 || token == 58) {//21568039
                writer.write(token);
            } else {
                return "";
            }
        }
        return writer.toString();
    } 
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
  <head>
   <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <title><%=StringEscapeUtils.escapeHTML(title)%></title>
     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
	 <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content=0>
      <link rel="SHORTCUT ICON" href="data:;base64,="/><!--citi ui change-->
    <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
    <!--<LINK href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme)%>.css" rel="stylesheet"  type="text/css"/>-->
        <!--HTML5 Changes --><!--<link href="Theme/ExtFlexNewUI.css" rel="stylesheet" type="text/css"/>-->
    <script type="text/javascript">
    var entity = "<%=StringEscapeUtils.escapeJavaScript(entity)%>";
    var multiEntity = "<%=StringEscapeUtils.escapeJavaScript(multiEntity)%>";
    function checkCompatible() { //21038361 starts
	var ua = navigator.userAgent;
	var MSIEOffset = ua.indexOf("MSIE ");
        if (MSIEOffset == -1) {
            if(ua.indexOf("TRIDENT") != -1 && ua.indexOf("RV:")!= -1){
                var rv=ua.indexOf("RV:");
                // return parseFloat(ua.substring(rv+3 ,ua.indexOf(")", rv)));
            }
        }
	if (ua.indexOf("MSIE 7.0") > -1) {
            this.compatibilityMode = true;
	}
   if (this.compatibilityMode) {
            <%
                if(session != null) {
                    session.setAttribute("LANGISOMAP",StrlangISOMap);
                    session.setAttribute("THEME","Flexblue.css");
                    session.setAttribute("LANG",Strlang);
                }
            %>
        document.submitForm.action = "compatabilityerror.jsp";
        document.submitForm.target = "_self";
        document.submitForm.submit();
    } 
// else if (multiEntity == "Y" && (entity == "null" || entity == "")) {
//        document.submitForm.action = "Entity.jsp";
//        var widnowDateTime = new Date();
//        var windowID = "" + widnowDateTime.getFullYear() + "" + widnowDateTime.getMonth() + "" + widnowDateTime.getDate() + "" + widnowDateTime.getDay() + "" + widnowDateTime.getHours() + "" + widnowDateTime.getMinutes() + "" + widnowDateTime.getSeconds() + "" + widnowDateTime.getMilliseconds(); 
//        var windowName = "EntityWindow" + windowID;
//        window.open('', windowName, "toolbar=no,location=false,status=no,menubar=no,scrollbars=yes,directory=false,resizable=no,top=0,left=0,width=" + screen.availWidth + ",height=" +  screen.availHeight);
//        document.submitForm.target = windowName;
//        document.submitForm.submit();
//        window.open('','_parent','');
//        window.close();        
//    } 
    else {
        fnappInit();
    }
}

    
        function fnappInit() {
            var widnowDateTime = new Date();
            var windowID = "" + widnowDateTime.getFullYear() + "" + widnowDateTime.getMonth() + "" + widnowDateTime.getDate() + "" + widnowDateTime.getDay() + "" + widnowDateTime.getHours() + "" + widnowDateTime.getMinutes() + "" + widnowDateTime.getSeconds() + "" + widnowDateTime.getMilliseconds(); 
            var windowName = "LoginWindow" + windowID;
            var ssoType =  '<%= BranchConstants.SSO_TYPE %>';
            if(ssoType !='IDCS_TOKEN') { //BUG#32891272:
            	window.open('', windowName, "toolbar=no,location=false,status=no,menubar=no,scrollbars=yes,directory=false,resizable=no,top=0,left=0,width=" + screen.availWidth + ",height=" +  screen.availHeight);
            	document.submitForm.target = windowName;
            }
            document.submitForm.submit();
            if(ssoType !='IDCS_TOKEN') { //BUG#32891272:
            	window.open('','_parent','');
            	window.close();
            }
        }
    </script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
  </head>
  <body onload="checkCompatible()"><!--21038361  -->
   <%if("IDCS_TOKEN".equalsIgnoreCase(BranchConstants.SSO_TYPE)) { %> <!--BUG#32891272  -->
    <form name="submitForm" action="LoginServlet" method="post">
   <% }else { %>
    	<form name="submitForm" action="LoginServlet" method="post" target="LoginWindow">
    <% } %>
    <input type="hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
    <!--Fix for 28778852-->
    <%if("SAML".equalsIgnoreCase(BranchConstants.SSO_TYPE)) { %>
    <input type="hidden" name="<%= StringEscapeUtils.escapeHTML(ssoKey)%>" value="<%= samlDN%>"></input>
    <% } %>
    </form>
  </body>
</html>
