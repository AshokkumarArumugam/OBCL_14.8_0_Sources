<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : Processing.JSP
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

Copyright © 2011-2016 by Oracle Financial Services Software Limited..
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
-------------------------------------------------------------------------------------------------------- -
*/%>

<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import = "java.util.Map" %>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.BranchConfig"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>

<%
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String Strlang          = (String)session.getAttribute("LANG");
    String userId           = (String)session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String branchIdentifier = BranchConfig.getInstance().getConfigValue("BRANCH_CENTRALIZED");
    String StrIsoLang       = (String)session.getAttribute("LANGISOMAP");
    
    Map itemDescMap         =  (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,userId);
    String processing       = (String)itemDescMap.get("LBL_PROCESSING");
%>

<html lang="<%=StringEscapeUtils.escapeHTML(StrIsoLang)%>">
    <head>
        <title><%=StringEscapeUtils.escapeHTML(processing)%></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="cache-control" content="no-cache">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <script>
            function fnLoad(){
                self.close();
                document.refresh;
                return;
            }
        </script>
    </head>
    <body onactivate="fnLoad()">
    </body>
</html>
