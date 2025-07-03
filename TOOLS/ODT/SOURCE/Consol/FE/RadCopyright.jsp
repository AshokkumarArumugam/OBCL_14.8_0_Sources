<!--
  **
  **
  ** File Name  : RadCopyright.jsp
  **
  ** 
  ** This source is part of the Oracle FLEXCUBE Software System and is copyrighted by Oracle Financial Services Software Limited.
  ** 
  ** 
  ** All rights reserved. No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
  ** graphic, optic recording or otherwise, translated in any language or computer language,
  ** without the prior written permission of Oracle Financial Services Software Limited.
  ** 
  ** Oracle Financial Services Software Limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** India
  ** Copyright   2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  

-->
<%@page import="com.ofss.odt.util.ODTUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 <%
String js_parser ="";
boolean bowserVer  = false; 
String userAgent = request.getHeader("USER-AGENT").toUpperCase();
if(userAgent.contains("MSIE") || (userAgent.contains("TRIDENT") && userAgent.contains("RV"))) {//ie11 changes
    js_parser = "BROWSER_IE.js";
    bowserVer = true;
} else {
    js_parser = "BROWSER_NonIE.js";
}
%>
<html lang="en" >
   <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
		<meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
        <link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
        
		<title><%=ODTUtils.stripXSS(request.getParameter("title"))%></title>
		<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>
		<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
		<script type="text/javascript" src="Script/JS/Extensible.js"></script>
        <script type="text/javascript" type="text/javascript">
        
				var g_scrType ="C";                
				 var mainWin  = parent;    
				 var scrht = (screen.availHeight/4)+250;
				 var scrwdt= (screen.availWidth/4)+150;				 
                 var seqNo  = parent.funcGenSeqNo;                 
                 window.frameElement.name = seqNo;
				 if(parent.document.getElementById("testwin"))
                 parent.document.getElementById("testwin").id = seqNo;   
            function fnLoad()
            {
                mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
                fnCalcHgt();
				document.getElementById("Cancel").focus(); 
            } 
</script> 
</head>
<body class="BODYDetails"  onload="fnLoad()" onkeydown="fnAccessChildScreens(event)" >
<div class="WNDcontainer" id="DIVWNDContainer">
    <div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"> <h1 class="WNDtitletxt">Copyright</h1>
            <div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE"  onclick="if(this.disabled) return false; fnRADExitAll(seqNo, event)">
					<span class="LBLinv">Close</span>
				</a>
				<a class="WNDmin" href="#nogo" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="Minimize" onclick="parent.fnMinimize(seqNo, event)">
					<span class="LBLinv">Minimize</span>
				</a>
            </div>
        </div>
    </div>
<div>
<form> 
<div class="logo" style="padding-top:10px">
<div style="BORDER:#b9ccf6 1px solid; BACKGROUND-COLOR:#ffffff; MARGIN-TOP:15px; margin-left:25px;margin-right:25px;WIDTH:auto;DISPLAY: block;HEIGHT:350px;">

<div align="center"><img src="Images/title.gif" height="50" width="315" alt="ORACLE FLEXCUBE - Development Workbench for Universal Banking">
<h3>Version : 14.2</h3>
<p style="font:Arial, Helvetica, sans-serif; font-size:.75em ">Copyright &copy; 2017, Oracle and/or its affiliates. All rights reserved.</p></div>

<div style="padding-left:10px ">
<p style="font:Arial, Helvetica, sans-serif; font-size:.75em ">  
Oracle and Java are registered trademarks of Oracle and/or its affiliates. Other names may be trademarks of their respective owners.

This software and related documentation are provided under a license agreement containing restrictions on use and disclosure and are protected by intellectual property laws. Except as expressly permitted in your license agreement or allowed by law, you may not use, copy, reproduce, translate, broadcast, modify, license, transmit, distribute, exhibit, perform, publish or display any part, in any form, or by any means. Reverse engineering, disassembly, or decompilation of this software, unless required by law for interoperability, is prohibited.

The information contained herein is subject to change without notice and is not warranted to be error-free. If you find any errors, please report them to us in writing.
</p>
</div>
</div>
	<div style="TEXT-ALIGN: right; MARGIN-TOP: 8px; PADDING-RIGHT: 30px; CLEAR: both">
		<BUTTON style="HEIGHT: 25px" id="Cancel" class="BTNfooter" onclick="fnRADExitAll(seqNo, event)" name="Cancel">Cancel</BUTTON>
	</div>
</div>
</form>
</div>
</div>
</body>
</html>