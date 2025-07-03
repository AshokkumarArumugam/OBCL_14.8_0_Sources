<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : error404.jsp
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

Copyright � 2004-2016  by Oracle Financial Services  Software Limited..
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
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.common.BranchUserGlobals"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String StrlangISOMap   = (String)session.getAttribute("LANGISOMAP");
    String strTheme     = (String)session.getAttribute("THEME");
    String Strlang         = (String)session.getAttribute("LANG");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String entity = (String)session.getAttribute("ENTITY");
    if((entity==null || "".equals(entity))&& "Y".equals(branchIdentifier))
        entity="SMS";
    
    
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~"+entity, branchIdentifier,"");
     if(itemDescMap == null){
        itemDescMap = BranchConstants.LABEL_MAP;
     }
        
    String errorPage        = (String)itemDescMap.get("LBL_ERROR_PAGE");
    String pageDoesntExist  = (String)itemDescMap.get("LBL_PAGE_DOESNOT_EXIST");
    String contactAdmin     = (String)itemDescMap.get("LBL_CONTACT_ADMIN");    
    String err              = (String)itemDescMap.get("LBL_ERROR");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes    
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
        <title><%=StringEscapeUtils.escapeHTML(errorPage)%></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <!--<link id="LINKCSS" href="Theme/<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
        <!--HTML5 Changes Start--><link href="Theme/ExtFlexNewUI.css" rel="stylesheet" type="text/css"/>
        <!--
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
    </head>
    <body class="BDYdialog" >
        <table width="100%" border="0" cellspacing="0" cellpadding="0" summary="">
            <tr>
             <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
                <td width="100" align="center" valign="top" ><img src="Images/Flexblue/ICDialog.gif" alt="<%=StringEscapeUtils.escapeHTML(err)%>" ></td>
                 <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
                <td>  
                    <div class="DIVDialog">
                        <table class='TABLEError'  border='0' cellpadding='0' cellspacing='0' summary=''>
                         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
                            <tr>
                                <td class='TDErrorID'><%=StringEscapeUtils.escapeHTML(pageDoesntExist)%></td>
                            </tr>
                            <tr>
                                <td><p class="PErrorDesc"><%=StringEscapeUtils.escapeHTML(contactAdmin)%></p></td></tr>
                                 <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
                        </table>
                    </div>
                </td>
            </tr>
        </table>   
    </body>
</html>
