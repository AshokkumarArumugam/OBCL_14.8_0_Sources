<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : Depict.jsp
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

Copyright © 2010-2016 by Oracle Financial Services Software Limited..
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
-------------------------------------------------------------------------------------------------------- -
*/%>
<%@ page language="java" contentType="text/html;"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.common.BranchUserGlobals"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.FBContext" %>
<%@ page import="java.util.Map"%>

<%
/*JAN_CPU_BUG-25068346 Start-- */
	response.setCharacterEncoding("UTF-8");
	response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 );
	/*JAN_CPU_BUG-25068346 End-- */
    request.setCharacterEncoding("UTF-8");
    String filelUrl      = (String)request.getParameter("fileUrl");   
    String reportName    = "Process Flow";  
    String closeLabel  = (String)request.getParameter("Closelbl"); 
    String browserCSS    = (String)session.getAttribute("BROWSER_CSS");
    String strTheme      = (String)session.getAttribute("THEME");
    String StrlangISOMap = (String)session.getAttribute("LANGISOMAP");
    //String seqNo         = (String)request.getParameter("seqNo");
    String ieCss         = (String)session.getAttribute("IECSS");
	 // Getting Labels for Dashboard 
    String user             = (String)session.getAttribute("USERID");
    String entity             = (String)session.getAttribute("ENTITY");
    String lang         = (String)session.getAttribute("LANG");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    FBContext fbContext     = new FBContext(user);
    Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+lang + "~" + entity, branchIdentifier,user);
    String labelProcessFlowDiagram =(String) itemDescMap.get("LBL_PROCESSFLOWDG_DSH");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
	
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>
       <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
        
        <script type = "text/javascript"> 
			var ismaximie = false;
            function fnInitialize(){
				var content ='<div id=\'imgDiv\' class="DIVMultipleSmallInner" style="overflow: auto; clear: both"><img id="emdReports" src ="data:image/png;base64,'+parent.base64image+'"  onclick="fnShowFullsize(event)" style="margin-left:2px;margin-top:2px;"/></div>';  
				document.getElementById("DIVWNDContainer").insertAdjacentHTML("beforeEnd", content);
            }
            function fnExitPrintReport(){
                       
                var childDivObj = parent.document.getElementById("ChildWin");
                childDivObj.getElementsByTagName("IFRAME")[0].src = "";
                parent.document.getElementById("DIVTabContent").removeChild(childDivObj);
            }
            function startDrag(target, e) {
                var evt = window.event || e;
                var divObj = parent.document.getElementById(target);
                if (parent.document.getElementById("ChildWin")) {
                } else {
                    mainWin.setActiveWindow(divObj, window);
                }
            
                //winObj.style.border = "2px dotted #666";
                divObj.style.cursor = "default";
                var x = evt.clientX;
                var y = evt.clientY;
                var initx = divObj.offsetLeft;
                var inity = divObj.offsetTop;
                document.onmousemove=function(e) {
                    var evt = window.event || e;
                    var ex = evt.clientX;
                    var ey = evt.clientY;
                    var dx = ex - x;
                    var dy = ey - y;
                    var ypos = inity + dy;
                    var tBarHgt = 0;
                    if(parent.document.getElementById("WNDtitlebar") != null) {
                        tBarHgt = parent.document.getElementById("WNDtitlebar").offsetHeight * -1;
                    } else if(typeof(mainWin) != "undefined") {
                        tBarHgt = mainWin.document.getElementById("masthead").offsetHeight;
                    }
                    if(ypos > (tBarHgt + 4)) {
                    divObj.style.left = initx + dx + "px";
                    divObj.style.top = inity + dy + "px";
                    initx = initx + dx;
                    inity = inity + dy;
                    } else {
                        divObj.style.top = (tBarHgt + 4)+ "px";
                        inity = tBarHgt + 4;
                    }
                };
                document.onmouseup=function(event){
                    //winObj.style.border = "none";
                    divObj.style.cusor = "default";
                    document.onmousemove=null;
                    document.onmouseup=null;
                }
            }
function reSize()
{
	var imageObj = document.getElementById("emdReports");
	var currH = imageObj.height;
	var currW = imageObj.width;
	var divObj =  parent.document.getElementById("DIVTabContent");
	var maxH = divObj.clientHeight - document.getElementById("WNDtitlebar").clientHeight;
	var maxW = divObj.clientWidth-4;
	var ratio = currH / currW;
	if(currW >= maxW && ratio <= 1){
		currW = maxW;
		currH = currW * ratio;
	} else if(currH >= maxH){
		currH = maxH;
		currW = currH / ratio;
	}
	document.getElementById("emdReports").height =currH - 24;
	document.getElementById("emdReports").width = currW;
	document.getElementById("imgDiv").height =currH  +'px';
	document.getElementById("imgDiv").width = currW  + 'px';	
	document.getElementById("DIVWNDContainer").style.height = currH+'px';
	document.getElementById("DIVWNDContainer").style.width = currW +'px';	
	parent.document.getElementById("ifrSubScreen").height=currH + 'px';
	parent.document.getElementById("ifrSubScreen").width = currW + 'px';
} 
function fnShowFullsize(event){
	var imageObj = document.getElementById("emdReports");
	imageObj.style.overflow ='auto';
	imageObj.style.height =imageObj.naturalHeight;
	imageObj.style.width =imageObj.naturalWidth;
	imageObj = document.getElementById("imgDiv");
	imageObj.style.overflow ='auto';
	imageObj.style.height =imageObj.naturalHeight;
	imageObj.style.width =imageObj.naturalWidth;	
} 
 </script>        
    </head>    
    <body class="BODYForm" onload='fnInitialize();reSize()'> 
     <div class="WNDcontainer" id="DIVWNDContainer">
            <DIV class=WNDtitlebar id="WNDtitlebar" onmousedown="startDrag('ChildWin', event)">
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(labelProcessFlowDiagram)%></h1>
                    <div class="WNDbuttons" style="float:right;">
					<a class="WNDcls" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%= StringEscapeUtils.escapeHTML(closeLabel) %>" onclick="fnExitPrintReport()">
                        <span class="LBLinv"><%= StringEscapeUtils.escapeHTML(closeLabel) %></span>
                        </a>
                    </div>
            </DIV>          
        </div> 
    </body>
</html>
