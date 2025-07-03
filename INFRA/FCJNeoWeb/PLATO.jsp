<%
/*----------------------------------------------------------------------------------------------------
**
** File Name    : PLATO.jsp
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

Copyright © 2019-2019  by Oracle Financial Services  Software Limited..
----------------------------------------------------------------------------------------------------
*/
%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%
response.setHeader( "Pragma", "no-cache" );   
response.setHeader( "Cache-Control", "no-cache" );
response.setHeader( "Cache-Control", "no-store" );
response.setDateHeader( "Expires", -1 ); 
String lang         = (String)session.getAttribute("LANG");
String langISOMap   = ((String)session.getAttribute("LANGISOMAP")).toLowerCase();
String strTheme     = (String)session.getAttribute("THEME");
String jsParser     = (String)session.getAttribute("JS_PARSER");
String browserCSS     = (String)session.getAttribute("BROWSER_CSS");
String ieCss         = (String)session.getAttribute("IECSS");
String user             = (String)session.getAttribute("USERID");
String currBrn     = (String)session.getAttribute("BRANCH_CODE");
//String platoUrl                 =  BranchConstants.PLATO_URL;
String nonce    = (String)session.getAttribute("nonce");
String platoframeCnt       = FCUtility.validateParameter(request.getParameter("platoframeCnt"));
%>
<!DOCTYPE HTML>
<html>
    <head>
        <script type="text/javascript">
          function invokePLATO() {
              var frmPlato = document.getElementById("platoLogin");
              var platoframeCnt          = '<%=StringEscapeUtils.escapeJavaScript(platoframeCnt)%>';
              var platoWindowName = "platoWindow"+platoframeCnt;
                
              if (parent.nonceStatus) {
                  frmPlato.target = platoWindowName;
                  parent.platoRef = window.open("", platoWindowName, "toolbar=no,location=false,status=no,menubar=no,scrollbars=yes,directory=false,resizable=no,top=0,left=0");
                  parent.platoRef.resizeTo(screen.availWidth, screen.availHeight);
                  frmPlato.action = parent.platoURL;
                  frmPlato.submit();
                  parent.platoLaunched = true;
              }
              else {
                  parent.showAlerts(parent.fnBuildAlertXML("SYSERROR", "E"), "E");
              }
          }

        </script>
    </head>
    <body onload="invokePLATO()">
        <form method="POST" name="platoLogin" id="platoLogin" autocomplete="off">
            <input type="hidden" name="sourceCode" id="sourceCode" value="FCUBS"/>
            <input type="hidden" name="branchCode" id="branchCode" value="<%= StringEscapeUtils.escapeHTML(currBrn)%>"/>
            <input type="hidden" name="userId" id="userId" value="<%= StringEscapeUtils.escapeHTML(user)%>"/>
            <input type="hidden" name="callBackToken" id="callBackToken" value="<%= StringEscapeUtils.escapeHTML(nonce)%>"/>
        </form>
    </body>
</html>