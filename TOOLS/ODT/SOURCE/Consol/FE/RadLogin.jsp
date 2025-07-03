<!DOCTYPE html><!--HTML5 Changes-->
<%@page import="com.ofss.odt.util.ODTUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%String js_parser ="";
boolean bowserVer  = false; 
String userAgent = request.getHeader("USER-AGENT").toUpperCase();
if(userAgent.contains("MSIE") || (userAgent.contains("TRIDENT") && userAgent.contains("RV"))) {//ie11 changes
    js_parser = "BROWSER_IE.js";
    bowserVer = true;
} else {
    js_parser = "BROWSER_NonIE.js";
}

String  res = (String)request.getAttribute("RESPONSEDATA");
String  err = (String)request.getAttribute("ERROR");
%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>

<title>ORACLE FLEXCUBE Development Workbench for Universal Banking</title>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<!-- <style type="text/css" media="all">
*{margin: 0px; padding: 0px;}

html{
	overflow:hidden;
	height:100%;
	} 
.frames{
	BORDER-BOTTOM: #38578f 2px solid;
	BORDER-LEFT: #38578f 2px solid;
	BACKGROUND: #fff;
	BORDER-TOP: #38578f 2px solid;
	BORDER-RIGHT: #38578f 2px solid
}

body {
	padding:0px;
	margin:0px;
	font-size: .9em;
	font-family: arial,helvetica,sans-serif;
	background-image:url(Images/loginbkg.jpg); 
	background-color:#ffffff;
	background-repeat:repeat; 
	background-position:center;
	height:100%; 
}

.logo{ 
	padding-top:12px;
	margin-left:10px;
	width:110px; 
	float:left; 
	} 
	
form.login {
	padding-left:6px;
	padding-right:6px;
	padding-bottom:6px;
	padding-top:0px;
	position:relative; 
}


div#username,

div#password {
	position:relative; 
	margin-right:3px;
	margin-top:3px;
	}


label.overlabel {
	color:#999;
	}

label.overlabel-apply {
	position:absolute;
	top:3px;
	left:40px;
	z-index:1;
	color:#000;
	}
	
.header{
	height:60px; 
	border-top:2px solid #ff0000; 
	border-bottom:1px solid #6585ae;  
	background-color:#FFFFFF;
	}
	
#wrapper {
	background-color: transparent;
	position: absolute;
	top: 48%;
	left: 0px;
	width: 100%;
	margin-top: -200px;
	text-align: center;
	min-width: 900px; 

}

#content {
	margin: 0px auto;
	background-color:transparent;
	position: relative; 
    /*background-image:url(Images/logincentre_new.gif); */
	background-position:center; 
	background-repeat:no-repeat; 
	height: 350px;	
	}
#title{width:315px; height:50px;}

.submit{
	border:1px solid #3c537d; 
	background-color:#4e6ca4;
	padding-top:2px; 
	padding-bottom:4px;
	margin-top:10px; 
	font-weight:bold; 
	color:#fff;
	}
	
.copy{font-family:Arial, Helvetica, sans-serif; font-size:.75em; padding:0px; margin-left:10px; margin-top:4px; margin-bottom:0px; height:20px;}

h5{padding-top:15px;}
</style> -->

<script type="text/javascript">
window.statusbar = 0;
window.toolbar =0;  

function alertMsg(message,type) { 
showLogmessage = message;
        if(type == "I")
	var title="Information";
        else if(type == "E")
	var title="Error";
        else if(type == "O")
	var title="Warning"; 
		errType = type; 
loadSubScrDIV("ChildWin", "RadError.jsp?Title=" + title);
}

function loadSubScrDIV(divId, src) {

    src = encodeURI(src);
    var customWin       = document.createElement("div");
    customWin.id        = divId;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    var customWinData = '<iframe src="'+src+'" title="frames" class="frames" allowtransparency="true" frameborder="2" scrolling="no" id="IFCHILD"></iframe>';
    customWin.innerHTML = customWinData;
    document.getElementById("Div_ChildWin").appendChild(customWin);
    document.getElementById("Div_ChildWin").style.display="block";    
    var winObj = document.getElementById(divId);
    winObj.style.top = parent.document.getElementById("Div_ChildWin").offsetHeight + "px";
    winObj.style.left = parent.document.getElementById("Div_ChildWin").offsetWidth + "px";
    winObj.style.visibility="visible";
    winObj.style.display="block"; 
} 

</script> 
<script type="text/javascript" src="Script/JS/RadWelcome.js"></script>
<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>
<link rel="stylesheet" type="text/css" href="Theme/ExtFlexblue.css"></link>
<link rel="stylesheet" type="text/css" href="Theme/ExtFlexNewUI.css"></link>
</head>
<body class="loginBody">
	<form id="login" name="login" action="RADLoginServlet" method="post"
		autocomplete="off" onkeydown="fnloginshortcut(event)">
		<!--  <div class="header">
			<span class="logo"><img src="Images/oracle_logo.gif"
				alt="Oracle logo" title="ORACLE" height="15px" width="105px" /></span>
		</div>-->
		<div class="header">
		<span class="oracle_tp"></span>
		</div>
		<!-- <div id="wrapper"> -->
			<!-- <div id="content" align="center"> -->
			<div class="loginCont">
				<!--HTML5 Changes-->
				<!--  <div id="title"><img src="Images/title.gif" width="315px" height="50px;" alt="Oracle FLEXCUBE Development Workbench for Universal Banking" /></div>
-->
				<div class="redPatch">
					<span>Oracle FLEXCUBE Development WorkBench for Universal
						Banking</span>
					<!--//Bug#24908374 LOGIN Label Changes Ends //-->
					<span class="lshadow"></span>
					<!--HTML5 Changes 6/OCT/2016 -->
					<span class="rshadow"></span>
					<!--HTML5 Changes 6/OCT/2016 -->
				</div>

				<div id="username" align="center">
					<label for="username-field" class="overlabel">Username</label>
					<!--HTML5 Changes 6/OCT/2016 -->

					<input id="username-field" type="text" name="username-field"
						title='Username' tabindex="0" size="15" maxlength="20" value="" onchange="this.value=this.value.toUpperCase();"/>
					<!--HTML5 Changes-->

				</div>
				<div id="password" align="center">
					<label for="password-field" class="overlabel">Password</label> <input
						id="password-field" name="password-field" type="password"
						onpaste="return false;" title='Password' maxlength="35" size="15"
						tabindex="0" value="" />
				</div>

				<!-- 
				<table style="padding:0px;margin:0px;" cellpadding="2" cellspacing="0" border="0" >
<tr>
	<td style="padding-top:40px;padding-bottom:40px;" align="center">
	<h5 id="login" name="login" >LOGIN</h5>
	</td>
</tr>
<tr>
	<td>
		<div id="username" align="center">
		<LABEL for="username-field" class="overlabel">Username</LABEL>
		<INPUT aria-required="false" id="username-field" type="text" name="username-field" title="Username" value="" tabindex="1" onchange="upper(this)"/>
		</div>
	</td>
</tr>
<tr>
	<td>
		<div id="password"  align="center">
		<LABEL for="password-field" class="overlabel">Password</LABEL>
		<INPUT aria-required="false" id="password-field" type="password" name="password-field" title="Password" value="" tabindex="2" />
		</div>
	</td>
</tr>
<tr>
	<td align="center">
	 -->
				<div id="submit" class="loginSubmitBtn">
					<input class="BTNtext" type="submit" name="submit" value='Sign In'
						id="fc_sbmit" tabindex="0" accesskey="l" />
					<!--HTML5 Changes-->
				</div>

				<!--  <div id="submit">
		<INPUT aria-required="false"  class="submit" type="submit" name="submit" value="Sign In" tabindex="3" accesskey="l"/>
		</div>
	</td>
</tr>
<tr>
	<td>
				<div STYLE="display: none">
					<INPUT aria-required="false" type="hidden" id="SUBDETAILS"
						name="SUBDETAILS" value=""> <INPUT aria-required="false"
						type="hidden" id="REQ_TYPE" name="REQ_TYPE" value="GEN"> <INPUT
						aria-required="false" type="hidden" id="REQ_CODE" name="REQ_CODE"
						value="LOGIN"> <INPUT aria-required="false" type="hidden"
						id="ISSUMMARY" name="ISSUMMARY" value="0"> <INPUT
						aria-required="false" type="hidden" id="USERTERMINAL"
						name="USERTERMINAL" value="">
				</div>
				 	</td>
        
</tr> 
</table>   
			</div> -->
		</div>
		<div id="Div_ChildWin"
			style="display: none; width: 300px; height: 200px"></div>
	</form>
	
	<div id="footer" class="loginFooter">

		<span class="loginCpyText">Copyright © 2007, 2016, Oracle
			and/or its affiliates. All rights reserved.</span>

	</div>
	<script>
		window.statusbar = 0;
        window.toolbar = 0;
		window.resizeTo(screen.availWidth, screen.availHeight);
		<%-- window.moveTo(0, 0);
		document.getElementById("username-field").focus();
		document.getElementsByTagName('label')[0].style.textIndent = (true) ? '-2400px'
				: '0px';
				--%>
		var response = "<%=err%>";
if(response!='null' && response!="")
{
 alertMsg(response,"E");		
}  
</script>
</body>
</html>