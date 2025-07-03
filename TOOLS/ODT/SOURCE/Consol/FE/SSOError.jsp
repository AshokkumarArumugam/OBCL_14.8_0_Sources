<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=windows-1252"%>
<%
String  err = (String)request.getAttribute("ERROR");
%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>

<title>ORACLE FLEXCUBE Development Workbench for Universal Banking</title>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link> 
<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>	
<style type="text/css" media="all">
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

input#username-field,

input#password-field {
	width:10em;
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
	background-image:url(Images/logincentre_new.gif); 
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

#footer{width:100%; background-color:#85a4cc; border-top:1px solid #6585ae; height:20px; position:absolute; bottom:0;}
h5{padding-top:15px;}
</style>    
    </head>
    <body> 

<div id="topHeader" class="header">
<div class="title"><img src="Images/title1.gif" width="463" height="19" alt="Oracle FLEXCUBE - Development Workbench for Universal Banking" ></img></div>
<div class="loginname" align="right" id="usr-disp-name"><h4></h4></div>
</div>

    <br>
    <br>
    <br><br>
    <br>
    <div align="center"><h4><font color="Red"><%=err%></font></h4>
    <br>
    <br>
    <br>    
    <div style="TEXT-ALIGN: center; MARGIN-TOP: 8px; PADDING-RIGHT: 30px; CLEAR: both">    
  <BUTTON style="HEIGHT: 25px" id="Cancel" class="BTNfooter" onclick="window.close();" name="Cancel">Close</BUTTON>
</div>
</div>

</div>
<div id="footer">
<span class="copy">Copyright &copy; 2012, Oracle and/or its affiliates. All rights reserved.</span></div> 

</body> 
<script>
window.resizeTo(screen.availWidth,screen.availHeight); 
window.moveTo(0,0); 
 
</script>
</html>