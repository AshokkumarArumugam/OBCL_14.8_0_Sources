<%/*------------------------------------------------------------------------------------------------------
**
** File Name    : z.jsp
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
-------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN">
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>


<%
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
String strTheme     = (String)session.getAttribute("THEME");
String lang         = (String)session.getAttribute("LANG");
String langISOMap   = ((String)session.getAttribute("LANGISOMAP")).toLowerCase();
String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
String ieCss         = (String)session.getAttribute("IECSS");
Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+lang + "~", branchIdentifier,"");

String title = (String)itemDescMap.get("LBL_DUMMY_PAGE");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    
String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>

<html lang="<%=StringEscapeUtils.escapeHTML(langISOMap)%>">
  <head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(langISOMap)%>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content=0>
    <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(langISOMap)%>.css" rel="stylesheet" type="text/css"/>
    <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
    <link id="LINKCSS" href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
    <title><%=StringEscapeUtils.escapeHTML(title)%></title>
  </head>
  <body  class="BDYlfooter"></body>
</html>
