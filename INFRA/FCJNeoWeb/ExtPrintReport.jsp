<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtPrintReport.jsp
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
---------------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
----------------------------------------------------------------------------------------------------
 
 -->*/%>
<%@ page language="java" contentType="text/html;"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.common.BranchUserGlobals"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="com.ofss.fcc.common.BranchConfig"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="java.io.File"%>
<%@ page import="java.io.FileInputStream"%>
<%@ page import="java.io.OutputStream"%>
<%@ page import="java.io.BufferedInputStream"%>

<%if (null!=FCUtility.validateParameter( request.getParameter("action"))|| "PRINT".equalsIgnoreCase(FCUtility.validateParameter( request.getParameter("action")))){%>
<%
                String fileName =FCUtility.validateParameter( request.getParameter("fileName"));                
                /* # BUG 15978732 fixes end*/ 
                FCUserGlobals uc = (FCUserGlobals)request.getSession().getAttribute(BranchConstants.USERGLOBALS);
                if (!fileName.equalsIgnoreCase("") && !fileName.equalsIgnoreCase(null)) {
                    ServletContext context =getServletConfig().getServletContext();
                    fileName ="Reports".concat(File.separator).concat("BIP").concat(File.separator).concat(uc.getLangCd()).concat(File.separator).concat(fileName);
                    String filePath =BranchConfig.getInstance().getConfigValue("APPLICATION_WORK_AREA") +uc.getSignonSerial() + File.separator + fileName;
                    String mimetype = context.getMimeType(filePath);
                    response.setContentType(mimetype);
                    File file = new File(filePath);
                    if (file.exists()) {
                        ServletOutputStream outputStream =response.getOutputStream();
                       byte[] arrayOfByte = new byte[4096];
                BufferedInputStream bufferedInputStream=null;
                 try {
                      bufferedInputStream = new BufferedInputStream(new FileInputStream(file));
                 int i;
                    while ((i = bufferedInputStream.read(arrayOfByte, 0, 4096)) != -1) {
                      outputStream.write(arrayOfByte, 0, i);
                    }
                    outputStream.flush();
                    
              }catch (Exception exception) {
              }finally{
                     bufferedInputStream.close();
                     outputStream.close();
                     }
                    }
                } 
    
     
%>
<%}else{%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
  
    
    /* # BUG 15978732 fixes start */ 
    String filelUrl      = FCUtility.validateParameter((String)request.getParameter("fileUrl"));   
    String reportName    = FCUtility.validateParameter((String)request.getParameter("reportName"));  
    String closeLabel  = FCUtility.validateParameter((String)request.getParameter("Closelbl")); 
    /* # BUG 15978732 fixes end */ 
    String browserCSS    = (String)session.getAttribute("BROWSER_CSS");
    String strTheme      = (String)session.getAttribute("THEME");
    String StrlangISOMap = (String)session.getAttribute("LANGISOMAP");
    /* # BUG 15978732 fixes start */ 
    String seqNo         = FCUtility.validateParameter((String)request.getParameter("seqNo"));
    /* # BUG 15978732 fixes end */ 
    String ieCss         = (String)session.getAttribute("IECSS");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    
String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
        <title>
            <%= StringEscapeUtils.escapeHTML(reportName) %>
        </title>    
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>
       <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
 	<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start-->
                <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->

        <script type = "text/javascript"> 
            var parentScrID = "<%=StringEscapeUtils.escapeJavaScript(seqNo)%>"; 
            var printReportDIVWidth     = parent.parent.document.getElementById(parentScrID).style.width;
            var printReportDIVHeight    = parent.parent.document.getElementById(parentScrID).clientHeight;
            var printReportIFWidth      = parent.parent.document.getElementById(parentScrID).children[0].style.width;
            var printReportIFHeight     = parent.parent.document.getElementById(parentScrID).children[0].clientHeight;
            
            function fnCalcHgt(){
                parent.mask();
                parent.document.getElementById("ChildWin").style.width  = parent.document.getElementById("DIVWNDContainer").offsetWidth - 50 +"px";
                parent.document.getElementById("ChildWin").children[0].style.width = parent.document.getElementById("DIVWNDContainer").offsetWidth - 50 +"px";
                document.getElementById("emdReports").style.width = parent.document.getElementById("DIVWNDContainer").offsetWidth - 50 +"px";
                parent.document.getElementById("ChildWin").style.height  = parent.document.getElementById("DIVWNDContainer").offsetHeight + 49 + "px";
                parent.document.getElementById("ChildWin").children[0].style.height = parent.document.getElementById("DIVWNDContainer").offsetHeight + 49 + "px";
                document.getElementById("emdReports").style.height = parent.document.getElementById("DIVWNDContainer").offsetHeight+"px";
                document.getElementById("WNDtitlebar").style.width = parent.document.getElementById("DIVWNDContainer").offsetWidth - 50 +"px";
                
                if((parent.parent.document.getElementById(parentScrID).offsetHeight - document.getElementById("WNDtitlebar").offsetHeight) < parent.document.getElementById("ChildWin").offsetHeight){
                    parent.parent.document.getElementById(parentScrID).style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight*2 + "px";
                    parent.parent.document.getElementById(parentScrID).children[0].style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight*2 + "px";
                    parent.mask();
                }
                parent.document.getElementById("ChildWin").style.top = document.getElementById("WNDtitlebar").offsetHeight+"px";
                parent.document.getElementById("ChildWin").style.left = "4px";
             }
         
            function fnExitPrintReport(e){
                parent.unmask();
				/*Fix for 20190127 Starts*/
				parent.gAction ="";
				parent.fnExitAll('', e);
				/*Fix for 20190127 Ends*/
                if((printReportDIVHeight - document.getElementById("WNDtitlebar").offsetHeight) < parent.document.getElementById("ChildWin").offsetHeight){
                    parent.parent.document.getElementById(parentScrID).style.height = printReportDIVHeight + "px";
                    parent.parent.document.getElementById(parentScrID).children[0].style.height = printReportIFHeight + "px";
                }
                          
                var childDivObj = parent.document.getElementById("ChildWin");
                childDivObj.getElementsByTagName("IFRAME")[0].src = "";
                parent.document.getElementById("Div_ChildWin").removeChild(childDivObj);
            }
            function startDrag(target, e) {
               /* Zooming Changes */
              var evt = window.event || e;
              var divObj = parent.document.getElementById(target);
              if (parent.document.getElementById("ChildWin")) {
              }
              else {
                  mainWin.setActiveWindow(divObj, window);
              }
              divObj.style.cursor = "default";
              var x = evt.clientX;
              var y = evt.clientY;
              var initx = divObj.offsetLeft;
              var inity = divObj.offsetTop;

              var scrnWidth = 0, scrnHeight = 0;

              scrnWidth = parent.document.getElementById("vtab").offsetWidth + parent.document.getElementById("dashboard").offsetWidth - 4;
              scrnHeight = parent.document.getElementById("masthead").offsetHeight + parent.document.getElementById("dashboard").offsetHeight + parent.document.getElementById("taskbar").offsetHeight - 4;
              document.onmousemove = function (e) {
                  var evt = window.event || e;
                  var ex = evt.clientX;
                  var ey = evt.clientY;
                  var dx = ex - x;
                  var dy = ey - y;
                  var ypos = inity + dy;
                  var tBarHgt = 0;
                  if (parent.document.getElementById("WNDtitlebar") != null) {
                      tBarHgt = parent.document.getElementById("WNDtitlebar").offsetHeight *  - 1;
                  }
                  else if (typeof (mainWin) != "undefined") {
                      tBarHgt = mainWin.document.getElementById("masthead").offsetHeight;
                  }
                  if ((ypos + parseInt(parent.document.getElementById(seqNo).offsetHeight)) > parseInt(scrnHeight)) {
                      inity = scrnHeight - (parseInt(parent.document.getElementById(seqNo).offsetHeight) + 4);
                      divObj.style.top = inity;
                  }
                  else if (ypos > (tBarHgt + 4)) {
                      //divObj.style.left = initx + dx + "px";
                      divObj.style.top = inity + dy + "px";
                      //initx = initx + dx;
                      inity = ypos;
                  }
                  else {
                      divObj.style.top = (tBarHgt + 4) + "px";
                      inity = tBarHgt + 4;
                  }
                  if ((parseInt(initx) + parseInt(dx) + parseInt(parent.document.getElementById(seqNo).offsetWidth)) > scrnWidth) {
                      initx = scrnWidth - (parent.document.getElementById(seqNo).offsetWidth + 4);
                      parent.document.getElementById(seqNo).style.left = initx + 'px';
                  }
                  else {
                      divObj.style.left = initx + dx + "px";
                      initx = initx + dx;
                  }
              };
              document.onmouseup = function (event) {
                  divObj.style.cusor = "default";
                  document.onmousemove = null;
                  document.onmouseup = null;
              }
            }
                function doPrint(){
                    setTimeout( printReport, 1000 );
                }
                function printReport() {
                    var prnDlgWindow = document.getElementById("emdReports");                                 
                    prnDlgWindow.print();                       
                }                
        </script>        
    </head>    
    <body class="BODYForm" onload ="fnCalcHgt();doPrint();" oncontextmenu="return false;"> 
     <div class="WNDcontainer" id="DIVWNDContainer">
            <DIV class=WNDtitlebar id="WNDtitlebar" onmousedown="startDrag('ChildWin', event)">
                <div class="WNDtitle" id="wndtitle">
                    <B class="BTNicon">
                        <span class="ICOflexcube"></span>
                    </B>
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML("")%>&nbsp;</h1>
                    <div class="WNDbuttons">
                        <a class="WNDcls" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%= StringEscapeUtils.escapeHTML(closeLabel) %>" onclick="fnExitPrintReport(event)">
                        <span class="LBLinv"><%= StringEscapeUtils.escapeHTML(closeLabel) %></span>
                        </a>
                    </div>
                </div>
            </DIV>  
            
            <%--<embed  id="emdReports"   src="ExtPrintReport.jsp?action=PRINT&fileName=<%=StringEscapeUtils.escapeURL(reportName)%>"/> --%> <!--9NT1606_12_4_RETRO_12_0_3_26440993 comments-->
			<iframe  id="emdReports"   src="ExtPrintReport.jsp?action=PRINT&fileName=<%=StringEscapeUtils.escapeURL(reportName)%>"/> <!-- 9NT1606_12_4_RETRO_12_0_3_26440993 added -->
            
           
        </div> 
    </body>
</html>
<%}%>