<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : custtb.jsp
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
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String StrlangISOMap   = (String)session.getAttribute("LANGISOMAP");
    String Strlang         = (String)session.getAttribute("LANG");
    String StrUserId       = (String) session.getAttribute("USERID");
    String entity         = (String) session.getAttribute("ENTITY");
    String strTheme     = (String)session.getAttribute("THEME");
    String StrCurBranch = (String)session.getAttribute("BRANCH_CODE");
    String homebrn = (String)session.getAttribute("HOMEBRN");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");
    
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
     
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String confToolbar = (String)itemDescMap.get("LBL_CONFIGURE_TOOLBAR");
    String ieCss         = (String)session.getAttribute("IECSS");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
        <title><%=StringEscapeUtils.escapeHTML(confToolbar)%></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start--><link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
        <script language="JavaScript" src="Script/JS/Util.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script language="JavaScript" src="Script/JS/UIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script language="JavaScript" src="Script/JS/OvrdMsgs.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script language="JavaScript" src="Script/JS/SmhTlBar.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script language="JavaScript">

            var dlgArg = dialogArguments;
			/*12.0 cpu02 fixes for sql query starts*/
            var LOV_IMAGE = new lov("","IMAGE_NAME!TEXT!IMAGE_NAME~IMAGE_DESC!TEXT!IMAGE_DESC","STRING~STRING","ICON_FILE~","IMAGE_NAME","IMAGE_NAME~LBL_IMAGES", "form1", "", "100","10","ORACLE","~"); 
            /*12.0 cpu02 fixes for sql query ends*/
            function fnLoad() {	
                ResTree.innerHTML = ShowXML("UIXML/ENG/CUSTTB.xml","CVS_MAIN","Detail.xsl");    
                document.getElementsByName("USER_ID")[0].value = "<%=StringEscapeUtils.escapeJavaScript(StrUserId)%>";
                document.getElementsByName("USER_ID")[0].disabled = "true";
            }
        </script>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    </head>
    <body onload="fnLoad()">
        <form name="form1">
        <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
            <div id="ResTree"></div>
        </form>
    </body>
</html>
