<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : index.jsp
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
*/
%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import = "java.util.Map" %>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
String StrIsoLang = (String)session.getAttribute("LANGISOMAP");
String Strlang         = (String)session.getAttribute("LANG");
String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
String StrUserId        = (String) session.getAttribute("USERID");
String entity         = (String) session.getAttribute("ENTITY");
Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
    
    
    String index = (String)itemDescMap.get("LBL_INDEX");
    String appServer = (String)itemDescMap.get("LBL_APPSERVER_STARTED");
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrIsoLang)%>">

  <head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content=0>
    <title><%=StringEscapeUtils.escapeHTML(index)%></title>
  </head>
  <body><%=StringEscapeUtils.escapeHTML(appServer)%></body>
</html>
