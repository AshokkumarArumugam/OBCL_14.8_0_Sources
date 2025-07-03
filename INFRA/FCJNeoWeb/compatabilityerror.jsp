<%
/*----------------------------------------------------------------------------------------------------
**
** File Name    : compatabilityerror.jsp
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
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.common.BranchParam"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="java.util.HashMap"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    response.addHeader("X-FRAME-OPTIONS", "DENY");
    String StrlangISOMap   = (String)session.getAttribute("LANGISOMAP");
    String strTheme     = (String)session.getAttribute("THEME");
    String Strlang         = (String)session.getAttribute("LANG");
    FBContext fbContext = new FBContext("PRE-LOGIN");//Client.log changes
    BranchLogger brnLogger = new BranchLogger("PRE-LOGIN");//Client.log changes
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    /* # BUG 14278984 fixes end */  
        fbContext.setBrnLogger(brnLogger);
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~", branchIdentifier,"");
    Map releaseMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"RELEASE_VERSION~~", branchIdentifier, "PRE-LOGIN");//Fix for 22964200 
    if(itemDescMap == null){
        itemDescMap = BranchConstants.LABEL_MAP;
    }
    if(releaseMap == null){
        releaseMap = BranchConstants.RELEASE_MAP;
    }
    String errorPage        = (String)itemDescMap.get("LBL_ERROR_PAGE");
    String comptEnabled  = (String)itemDescMap.get("LBL_COMPATABLE_ENABLED");
    //String contactAdmin     = (String)itemDescMap.get("LBL_CONTACT_ADMIN");    
    String err              = (String)itemDescMap.get("LBL_ERROR"); 
    errorPage = "";
    String step1 = (String)itemDescMap.get("LBL_COMPATABLE_STEP1"); 
    String step2 = (String)itemDescMap.get("LBL_COMPATABLE_STEP2"); 
    String step3 = (String)itemDescMap.get("LBL_COMPATABLE_STEP3"); 
    String step4 = (String)itemDescMap.get("LBL_COMPATABLE_STEP4");
    //contactAdmin = "Please follow below steps to disable Compatabibility Setting"; //LBL_COMPATABLE_STEP1
    //String errDesc_1 = "Goto Tools menu and Click on compatibility view setting"; //LBL_COMPATABLE_STEP2
    //String errDesc_2 = "Uncheck the display all the websites in compatibility view";//LBL_COMPATABLE_STEP3
    //String errDesc_3 = "Click OK to relaunch"; //LBL_COMPATABLE_STEP4
    err = "Error Orrcured";
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
  
%>
<html class="loginHtml" lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/ExtBROWSER_IE.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Flexblue.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/ExtFlexblue.css" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start--><link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
        <script type="text/javascript">
          function debugs(msg, value, funcName) {
          }
          function launchApp() {
             // window.close();
              document.submitform.submit();
              
          }
        </script>
    </head>
    <body class="loginBody" oncontextmenu="return false;">
    <form action="welcome.jsp" name="submitform"></form>
        <div class="loginHeader" id="header">
            <span class="loginLogo ">
                <span class="LogoOracle" style="display:block" title="ORACLE"></span></span>
        </div>
        <br/>
        <div>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" summary="">
                <tr>
                    <%-- Security bug SEC-12-Patch-081 fixes starts--%>
                    <td width="100" align="center" valign="top">
                        <img src="Images/Flexblue/Icons/ICDialog.gif" alt="&lt;%=StringEscapeUtils.escapeHTML(err)%>"/>
                    </td>
                    <%-- Security bug SEC-12-Patch-081 fixes ends--%>
                    <td>
                        <div class="DIVDialog">
                            <table class='TABLEError' border='0' cellpadding='0' cellspacing='0' summary=''>
                                <%-- Security bug SEC-12-Patch-081 fixes starts--%>
                                 
                                <tr>
                                    <td class='TDErrorID'>
                                        <%=StringEscapeUtils.escapeHTML(comptEnabled)%>
                                    </td>
                                </tr>
                                 
                                <tr>
                                    <td>
                                        <p class="PErrorDesc">
                                            <%=StringEscapeUtils.escapeHTML(step1)%>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="PErrorDesc">
                                            <%=StringEscapeUtils.escapeHTML(step2)%>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="PErrorDesc">
                                            <%=StringEscapeUtils.escapeHTML(step3)%>
                                        </p>
                                    </td>
                                </tr>
                                 <tr>
                                    <td>
                                        <p class="PErrorDesc">
                                            <%=StringEscapeUtils.escapeHTML(step4)%>
                                        </p>
                                    </td>
                                </tr>
                                <tr><td><p></p></td></tr>
                                <tr>
                                    <td>
                                        <p >
                                             <input class="BTNtext" style="font-size:1.2em" type="submit" name="submit"
                                                   value='OK' id="fc_sbmit" onclick="launchApp()"  tabindex="1" accesskey="l"/>
                                        </p>
                                    </td>
                                </tr>
                                <%-- Security bug SEC-12-Patch-081 fixes ends--%>
                            </table>
                           
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="footer" class="loginFooter">
            <%
           String copyRights = "Oracle Flexcube Universal Banking <br>    Copyright © 2007, 2012, Oracle and/or its affiliates. All rights reserved.";
		   //Fix for 15896771
            if (BranchConstants.APPLICATION_COPYRIGHTS != null && !BranchConstants.APPLICATION_COPYRIGHTS.equals("")) {
                copyRights = BranchConstants.APPLICATION_COPYRIGHTS;
                copyRights = copyRights.substring(0, copyRights.indexOf("<br>")).concat(": ").concat((String)releaseMap.get("RELEASE")).concat("<br>").concat(copyRights.substring(copyRights.indexOf("<br>")+4, copyRights.length()));
            }
        %>
             
            <%-- Security bug SEC-12-Patch-081 fixes starts--%>
             
            <span class="loginCpyText"> 
                <%=copyRights%></span>
             
            <%-- Security bug SEC-12-Patch-081 fixes ends--%>
        </div>
    </body>
</html>