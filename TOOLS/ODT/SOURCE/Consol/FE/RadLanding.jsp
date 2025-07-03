<!--
  **
  **
  ** File Name  : RadLanding.jsp
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
  ** Copyright © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  

-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@page import="com.ofss.odt.util.ODTUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<% 
String CSRFtoken    =   (String) session.getAttribute("X-CSRFTOKEN");  
String responseData = ODTUtils.stripXSS((String)request.getAttribute("RESPONSEDATA"));
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
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>ORACLE FLEXCUBE Development Workbench for Universal Banking</title>
<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
<link rel="stylesheet" type="text/css" href="Theme/ExtFlexblue.css"></link>
<link rel="stylesheet" type="text/css" href="Theme/ExtFlexNewUI.css"></link>

<style type="text/css" media="all">
* {
padding: 0;
margin: 0;
}
/* html, body {
	font-size: 100%;
	font-family: Arial,helvetica,sans-serif;
    color:#000000;
    background-image:url(Images/loginbkg.jpg); 
	background-color:#ffffff;
	background-repeat:repeat; 
	background-position:center;
	overflow:hidden;
	height:100%; 
	padding-top:0px; 
	margin-top:0px;
}
 */
h4	{ 
	font-family: Arial, Tahoma, Verdana, Helvetica, sans-serif;
	font-size:1.2em; 
	font-weight:normal; 
	color: #000000; 
	padding:0px; 
	margin:0px;
	}

a	{ 
    font-family: Arial, Tahoma, Verdana, Helvetica, sans-serif;
    font-size:.80em;
	text-decoration:none; 
	color:#000000; 
	font-weight:normal; 
    cursor:arrow;
	}

.header{ 
	border-top:2px solid #ff0000; 
	border-bottom:1px solid #6585ae;  
	background-color:#FFFFFF;
	background-repeat:no-repeat;
	display:block; 
	width:100%; 
	height:60px;
	}


.title{
	padding-top:8px; 
	padding-left:10px; 
	float:left; 
	position:absolute
	}

.menucontainer{
	width:100%;  
    background-repeat:repeat-x;
	top:37px; 
	position:absolute;  
	height:24px; 
	display:block;
	background-color:#f3f3f3;
	}

.loginname{
	padding-right:20px; 
	padding-top:8px; 
	float:right;  
	 position:relative;
	}

#browser {
	min-height: 100%; 
	border-right: 1px solid #ebebeb;
	width:100%; 
	float:left;
	margin: 0 auto; 
	}


#container2 {
	min-height: 100%;
	background-color: #ffffff;
	width: 100%; 
	float:left;
	margin: 0 auto;
	}

.tdheight{ height:25px;}
* html #container1 #container2 {
height: 100%;
}

/* .description{ font-family:Arial, Helvetica, sans-serif; color: #666666;} */
* {
padding: 0;
margin: 0;
}

h3{ font-family: Arial, Tahoma, Verdana, Helvetica, sans-serif; font-size:2em; font-weight:bold; color:#333333;}

#browser {
min-height: 100%;
background-color: #ffffff;
border-right: 1px solid #ebebeb;
width: 250px; 
float:left;
margin: 0 auto;
filter:alpha(opacity=60); 
  opacity:0.6;
}


#container2 {
min-height: 100%;
background-color: #ffffff;
width: 100%; 
float:left;
margin: 0 auto;

}

.tdheight{ height:25px;}
* html #container1 #container2 {
height: 100%;
}

/* .description{ font-family:Arial, Helvetica, sans-serif; color: #666666;} */
.logo{
	padding-right:20px; 
	padding-top:35px;
	width:110px; 
	float:right; 
	}
/* commented backslash hack \*/ 
html, body{height:100%;} 
/* end hack */


#outer{min-height:100%; height:100%;background:#ffffcc; display:block;}
* html #outer{height:100%;}/* ie6 and under*/ 

.dhtmlgoodies_question{	/* Styling question */
	/* Start layout CSS */
	color:black;
	/* End layout CSS */  
}
	
.dhtmlgoodies_answer{	/* Parent box of slide down content */
	/* Start layout CSS */ 
	background-color:#ffffff;	 
	visibility:hidden;
	overflow:auto;
	position:relative;
    }

.dhtmlgoodies_answer_content{	/* Content that is slided down */
	padding:1px;
	font-weight:normal;
	position:relative; 
}

#sddm
{	margin: 0;
	padding: 0; 
	z-index: 30}

#sddm li
{	margin: 0;
	padding: 0;
	list-style: none; 
	float: left;
	}

#sddm li a
{	display: block;
	margin: 0 1px 0 0;
	padding: 4px 10px;
	text-align: center; 
	text-decoration: none}

#sddm li a:hover
{	
  background-color: red;
}

#sddm div
{	position: absolute;
	visibility: hidden;
	margin: 0px;
	padding: 0px;	
/* 	-webkit-transform: perspective(600px) rotateX(-90deg);
    transform: perspective(600px) rotateX(-90deg);
    -moz-transform: perspective(600px) rotateX(-90deg);
    -webkit-transform-origin: 0 0 0;
    -ms-transform-origin: 0 0 0;
    transform-origin: 0 0 0;
    transition: all .5s; */
	}

	#sddm div a
	{	position: relative;
		display: block;
		/* margin-top: 2px;	 */	
		width: auto;
		white-space: nowrap;
		text-align: left;
		text-decoration: none;
		background-color: #ffffff;
		border-right: 1px solid #ebebeb;
		font-size:0.75em; font-weight:bold; color:#333333;
		}

	#sddm div a:hover {
    background-color: red;
}


.dropdown{
	border:1px solid #3c537d;
	-webkit-transition: height 0.5s; /* For Safari 3.1 to 6.0 */
    transition: height 0.5s;
}
 	
</style> 
<script type="text/javascript" src="Script/JS/RadCBMenu.js"></script>
<script type="text/javascript" src="Script/JS/RadWelcome.js"></script>
<script type="text/javascript" src="Script/JS/RadDragNDropHandler1.js"></script>
<script type="text/javascript" src="Script/JS/RADReadWriteFiles.js"></script>
<script  type="text/javascript" src="Script/JS/<%=js_parser%>" ></script>
<script  type="text/javascript"> 
username='<%=ODTUtils.stripXSS(request.getParameter("username-field"))%>';
userterminal='<%=request.getRemoteAddr()%>';
var CSRFtoken = '<%=CSRFtoken%>';
var res=loadXMLDoc("<%=responseData%>");
function paintTreeMenu()
{
		treeObj = new JSDragDropTree();
		treeObj.setTreeId('ulTreeMenu');
		treeObj.setMaximumDepth(7);
		treeObj.setMessageMaximumDepthReached('Maximum depth reached'); // If you want to show a message when maximum depth is reached, i.e. on drop.
		treeObj.initTree(); 
		hideMenus();
} 
window.statusbar = 0;
window.toolbar =0;
window.resizeTo(screen.availWidth,screen.availHeight); 
window.moveTo(0,0);
function hideMenus()
{
	showHideContent("","dhtmlgoodies_a1");
} 

function hideContent(){
document.getElementById('idAppBrw' ).style.display = 'none';
}

function signOut(){
  window.open('RadLogin.jsp', '', "toolbar=no,location=false,status=no,menubar=no,scrollbars=no,directory=false,resizable=no,top=0,left=0,width=700,height=400");
  window.open('','_parent','');
  window.close();

}
 </script>
</head>
<body onload="initShowHideDivs();loadResponseTree(res);setHeight();fngetWriteMode('SINGLE');hideContent();" onunload="fnsignoutstatus();" onKeyDown="return shortcut(event)" onhelp="disableDefault();" onclick="fnOnclickVal(event)">

<div id="dashboard">
<div id="IFlauncher" class ="launcher"></div>
            <div id="vTabDB_CENTRAL_PROCESS"></div>
            <div id="vTabDB_DASHBOARD" style="visibility:hidden"></div>
            <div id="vTabDB_TELLER"style="visibility:hidden"></div>         
</div>

<div id="topHeader" class="header">
<div class="title"><img src="Images/title1.gif" width="463" height="19" alt="Oracle FLEXCUBE - Development Workbench for Universal Banking" ></img></div>
<div class="loginname" align="right" id="usr-disp-name"><h4></h4></div>
	
<div class="menucontainer">

<div id="smoothmenu1" class="ddsmoothmenu" >
	<div id="Dleft"  style="border:none;  margin-top:15px;">
		<div id="treebody" style="padding-top:2px;">
			<!-- <div class="dhtmlgoodies_question"  style="height:22px;padding-left:15px;"><a id="LAND_BROWSER" href="#nogo" title="Browser (ALT + B)"><h4>Browser&nbsp;&nbsp;<img src="Images/downarrow.gif" alt="Down Arrow" border="0" width="5px" height="3px"></h4></a></div> -->
			<div class="dhtmlgoodies_question" id='SYS_TBL_TABS' style='clear:both;padding-top:2px;'>
                <a class="hamMenu" id="LAND_BROWSER" accesskey="2" title='Expand Menu'  href="#nogo"></a>
			
			</div>
			<!-- <div class="dhtmlgoodies_answer" >
				<div class="dhtmlgoodies_answer_content" style="padding-top:8px;padding-left:10px;border-right:1px solid #96afd2;"></div>
			</div> -->
			 <div id="vtab" style="display:none">
            <div class="DIVvtabP" id="idAppBrw" style="display:block">
                <div class="tabcontent" id="vTabCN_EXPLORE" style="display:block;Width:100%"></div>
                <div class="tabcontent" id="vTabCN_CENTRAL_PROCESS" style="display:none;Width:100%"></div><!--HTML5 Changes 6/OCT/2016--><!--HTML5 Changes 14/NOV/2016-->
            </div>
       	      </div>
			
		</div>
	</div> 
</div> 



<div id="links" style="padding-top:0px; height:25px; vertical-align:top; float:right;padding-right:25px;">
<ul id="sddm" onkeydown="fnAcessLanding(event)">
		<li role="presentation" onclick="mopen('m1')">
			<a id="LAND_WINDOWS"  href="#nogo" title="Windows">Windows</a>
			<div id="m1" class="dropdown"></div> 
		</li>  
		<li role="presentation" onclick="showMenu(getEventSourceElement(event))">
			<a id="OPTIONS_MENU" aria-haspopup="true" role="menuitem" accesskey="O"  href="#nogo"  title="Options" >Options</a>
			<div id="landmenu" class="dropdown">
			    <a href="javascript:openWindow('testwin','RadSetEnv.jsp','User Preferences')" title="User Preferences">User Preferences</a>
			    <a href="javascript:openWindow('testwin','RadPassword.jsp','Change Password')" style="text-decoration:none " title="Change Password">Change Password</a>
				<a href="#nogo" id="FCUBSLINK"  target="_blank" title="Launch FC UBS">Launch FLEXCUBE UBS</a>
	  		    <a href="javascript:openWindow('testwin','RadAccessability.jsp','Accessibility')" title="Accessibility Help">Accessibility Help</a>
				<a onclick="downloadSilentOdt()" accesskey="O"  href="#nogo"  title="SilentOdt">Download SilentOdt</a>
			     <a href="javascript:openWindow('testwin','RadFaq.jsp','Faq')" title="radFaq">FAQ</a>
				<a href="javascript:openWindow('testwin','RadCopyright.jsp','About')" title="About">About</a>
			</div>
		</li>  
		<li role="presentation" > 
			<a id="LAND_SIGNOUT" href="javascript:fndebugsignout();signOut();" title="Sign Out">Sign Out</a>
		</li> 
	</ul>  
</div> 
</div>
</div>



<div id="masthead"></div>
<div id="vtab" style="visibility:hidden">
  <span class="DIVvtabH" id="vTab_Heading" tabindex="0" accesskey="3">
  <span class="SPNvtabH"></span>
  <BUTTON title="Refresh" class="BTNicon2" id="idBrwRefresh"><span tabindex="-1" class="ICOrefresh"></span></BUTTON>
  </span>
  <div class="tabcontent" id="vTabCN_EXPLORE" style="display:block"></div>
  <div class="tabcontent" id="vTabCN_TELLER" style="display:none"></div>
  <div class="tabcontent" id="vTabCN_CENTRAL_PROCESS" style="display:none"></div>
  <div class="tabcontent" id="vTabCN_CUSTOMER" style="display:none"></div>
  <div class="tabcontent" id="vTabCN_DASHBOARD" style="display:none"></div>
  <div id="vTab_Links" class="vtabs"></div>
</div>
<div id="masker" class="masker" style="display:none;"></div>
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>
</body> 
</html>
