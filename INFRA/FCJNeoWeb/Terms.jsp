<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : Terms.jsp
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
<%@ page import="com.ofss.fcc.common.BranchUserGlobals"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="java.util.Map"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String Strlang          = (String)session.getAttribute("LANG");
    String strUserId        = (String)session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
    String strTheme         = (String)session.getAttribute("THEME");
    String browserCSS       = (String)session.getAttribute("BROWSER_CSS");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String ieCss            = (String)session.getAttribute("IECSS");
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
%>

<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
    <%
        FBContext fbContext = new FBContext(strUserId);
        Map itemDescMap = null;
        itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,strUserId);
        String strNoScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL"); 
        String l_licenseTerms = (String)itemDescMap.get("LBL_LICENSE_TERMS");
        String strOk= (String)itemDescMap.get("LBL_OK");
        
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
    %>
        <title>ORACLE FLEXCUBE Universal Banking End-User Licence Agreement</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link id="LINKCSS" href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(strNoScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <script type="text/javascript">
            var mainWin = parent.mainWin;
            function fnCalcHeight() {
                var iframeObj = parent.document.getElementById("ifrSubScreen");
                iframeObj.title = getInnerText(document.getElementById("DIVif1").getElementsByTagName("H1")[0]);
                document.getElementById("DIVAbout").style.height = "18em";
                parent.document.getElementById("ChildWin").style.height = document.getElementById("DIVif1").offsetHeight + "px";
                parent.document.getElementById("ChildWin").children[0].style.height = document.getElementById("DIVif1").offsetHeight + "px";
                parent.document.getElementById("ChildWin").style.width = document.getElementById("DIVif1").offsetWidth*1.75 + "px";
                parent.document.getElementById("ChildWin").children[0].style.width = document.getElementById("DIVif1").offsetWidth*1.75 + "px";
                parent.document.getElementById("ChildWin").style.top = document.getElementById("WNDtitlebar").offsetHeight + "px";
                document.getElementById("BTN_OK").focus();
            }

            function fnCloseTermsWndo() {
                parent.document.getElementById("Div_ChildWin").style.display = "none";
                parent.unmask();
                parent.document.getElementById("Div_ChildWin").removeChild(parent.document.getElementById("Div_ChildWin").children[0]);
                parent.document.getElementById("BTN_OK").focus();
            }
            
            function startDrag(e) {
                var evt = window.event || e;
                var winObj = parent.document.getElementById("ChildWin");
                //winObj.style.border = "2px dotted #666";
                winObj.style.cursor = "default";
                var x = evt.clientX;
                var y = evt.clientY;
                var initx = winObj.offsetLeft;
                var inity = winObj.offsetTop;
                document.onmousemove=function(e) {
                    var evt = window.event || e;
                    var ex = evt.clientX;
                    var ey = evt.clientY;
                    var dx = ex - x;
                    var dy = ey - y;
                    var ypos = inity + dy;
                    var tBarHgt = parent.document.getElementById("wndtitle").offsetHeight;
                    if(ypos > (tBarHgt + 4)) {
                        winObj.style.left = initx + dx + "px";
                        winObj.style.top = ypos + "px";
                        initx = initx + dx;
                        inity = ypos;
                    } else {
                        winObj.style.top = (tBarHgt + 4)+ "px";
                        inity = tBarHgt + 4;
                    }
                };
                document.onmouseup=function(event){
                    winObj.style.border = "none";
                    winObj.style.cusor = "default";
                    document.onmousemove=null;
                    document.onmouseup=null;
                }
            }

        </script><noscript><%=StringEscapeUtils.escapeJavaScript(strNoScriptLabel)%></noscript>
    </head>
    <body class="BDYdialog" onload="fnCalcHeight()">
        <DIV id=DIVif1 class="WNDcontainer">
            <div class="WNDtitlebar" id="WNDtitlebar" onmousedown="startDrag(event)">
                <B class="BTNicon"><span class="ICOflexcube"></span></B>
                <h1 class="WNDtitletxt">END-USER LICENSE AGREEMENT</h1>
                <div class="WNDbuttons">
                    <a class="WNDcls" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>"  onclick="fnCloseTermsWndo()">
                    <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                    </a>
                </div>
            </div>
            <div class="WNDcontent" > 
        <div class="DIVTwoColLyt">
        <table width="100%" border="0" cellspacing="0" cellpadding="5" summary="">
          <tr>
                            <td>
                <fieldset class="FIELDSETNormal" style="width:98%">
                <legend>END-USER LICENSE AGREEMENT</legend>
                                    <div class="DIVAbout" id="DIVAbout">
                            <p class="SPNtext"><%=StringEscapeUtils.escapeHTML(l_licenseTerms)%></p>
                                    </div>
                                </fieldset>	
                            </td>
          </tr>
          <tr>
                            <td>
                        <div class="DIVfooter">
                          <div style="text-align:right; padding:.75em">
                             <input class="BTNfooterH" Default="<%=StringEscapeUtils.escapeHTML(strOk)%>" onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(strOk)%> id="BTN_OK" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="fnCloseTermsWndo()"  name= <%=StringEscapeUtils.escapeHTML(strOk)%> type="button"/>
                          </div>
                        </div>
                            </td>
          </tr>
        </table>
        </div>
            </div>
        </DIV>
    </body>
</html>
