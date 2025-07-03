<!--
  **
  **
  ** File Name  : RadPassword.jsp
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
  ** Copyright Â© 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

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
String  err = (String)request.getAttribute("ERROR");
%>

<html lang="en" >
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
        <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link> 
        <link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link> 
        <link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
		<title><%=ODTUtils.stripXSS(request.getParameter("title"))%></title>
		<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>
  	    <script type="text/javascript" src="Script/JS/RadUtil.js"></script>
		<script type="text/javascript" src="Script/JS/Extensible.js"></script>
        <script type="text/javascript">
        
				var g_scrType ="S";                
				 var mainWin  = parent;    
				 //var scrht = (screen.availHeight/4)+10;
				 //var scrwdt= (screen.availWidth/4)+50;
				 var scrht = 700;
				 var scrwdt= 700;
                 var seqNo  = parent.funcGenSeqNo;                 
                 window.frameElement.name = seqNo;
				 if(parent.document.getElementById("testwin"))
                 parent.document.getElementById("testwin").id = seqNo;      
                  			 
                function fnMouseDownEvents()
                {    
                    return true;
                }
            function fnLoad()
            { 
                mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
                fnCalcHgt();
				document.getElementById("Cancel").focus();  
            }
			
function setSchema() {       
	    document.getElementById("USER_ID").value = parent.username;
} 
function fnPasswordValidate(r){
	if(r.value.length>13 || r.value.length<6 ) { 
		r.value="";  
		alertMessage("Minimum 6 and Maximum 14 Characters are required for Password", "E"); 
	    return;
	}
	}
</script>
</head>
<body class="BODYDetails" style="background-color:#dceafe;" onload="fnLoad();setSchema()" onkeydown="fnAccessChildScreens(event)" >
<form id="login" name ="login" action="RadChangePwd" method="post" autocomplete="off"> 
<input type="hidden" name="X-CSRFTOKEN" id="X-CSRFTOKEN" value="${sessionScope.X-CSRFTOKEN}"/>
<div style="WIDTH: 611px; HEIGHT: 576px" class="WNDcontainer" id="DIVWNDContainer">
    <DIV class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)">                   
        <h1 class="WNDtitletxt">Change Password</h1>
            <div class="WNDbuttons">
            <a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE"  onclick="if(this.disabled) return false; fnRADExitAll(seqNo, event)">
				<span class="LBLinv">Close</span>
			</a>
            <a class="WNDmin" href="#nogo" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="Minimize" onclick="fnMinimize(seqNo, event)">
				<span class="LBLinv">Minimize</span>
			</a>
            </div>
        </div>
    </DIV>
<div style="width:100%;display:block" align="center">
<div id="frmSetEnv" style="margin-top:20px;background-color:#ffffff;border:1px solid #b9ccf6;width:90%;display:block;HEIGHT:450px">
<table role="presentation" class="TABLELyt" id="" width="50%" cellpadding="1" cellspacing="0" align="center" border="0" style="margin-top:10px">
    <tr>
        <td align="right"><LABEL id="LBL_OLD_PWD" for="OLD_PWD">Old Password</LABEL></td>
        <td><INPUT aria-required="false"  type="password"  id="OLD_PWD" name="OLD_PWD" value=""></td>
    </tr>
    <tr>
        <td align="right"><LABEL id="LBL_NEW_PWD" for="NEW_PWD">New Password</LABEL></td>
        <td><INPUT aria-required="false"  type="password"  id="NEW_PWD" name="NEW_PWD" onchange="fnPasswordValidate(this)" value=""></td>
    </tr>
    <tr>
        <td align="right"><LABEL id="LBL_RENEW_PWD" for="RENEW_PWD">Confirm Password</LABEL></td>
        <td><INPUT aria-required="false"  type="password"  id="RENEW_PWD" name="RENEW_PWD" onchange="fnPasswordValidate(this)" value=""></td>
    </tr>
    <tr>
        
        <td align="center">&nbsp;
        
        </td>
		<td align="center">
        </td>
    </tr>
  <tr>        
        <td style="display:none"><INPUT aria-required="false"  type="text"  id="USER_ID" name="USER_ID" value="" style="display:none">
    </tr>
</table>
        

</div>

</div>
<div style="display:block;margin-top:10px;margin-bottom:10px;">
        <table width="95%" cellpadding="1" cellspacing="0" border="0">
        <tr>
        <td align="right">
        <BUTTON class="BTNfooter" style="height:25px;width:60px;" title="Close" type="submit" name="BTN_CLOSE" value="BTN_CLOSE">OK</BUTTON>&nbsp;
        <BUTTON class="BTNfooter" style="height:25px;width:60px;" name="Cancel"  id="Cancel"  onclick="fnRADExitAll(seqNo, event)">Cancel</BUTTON></td>
        </tr>
        </table>
</div>  
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div> 
</form>
</BODY>
<script> 
var response ="<%=err%>";
if(response!='null' && response!="")
{
window.close();
alertMessage(response,"I"); 
} 
</script>
</html>