<!--
  **
  **
  ** File Name  : RadPopup.jsp
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
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="com.ofss.odt.util.ODTUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
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
<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
<script type="text/javascript" src="Script/JS/RadUtil.js"></script>

<script type="text/javascript">
        function save(){
       		
			parent.popTextObj.value=document.getElementById('textvalue').value;
			parent.popTextObj.focus();
       		
        } 
		
		function read(yesno){
			if(yesno=="YES"){
				document.getElementById('textvalue').readOnly =true;
				document.getElementById('ok').style.visibility='hidden';
			}else{
			    document.getElementById('textvalue').readOnly =false;
				SetCursorToTextEnd('textvalue');
			}
		}
		
		function fnInValues(){
			parent.document.getElementById("IFCHILD").style.width="380px";
			parent.document.getElementById("IFCHILD").style.height="350px";
			if(parent.popReadOnly=="YES")
			{
			read("YES");
			}else{
			 read("NO");
			}
			document.getElementById('textvalue').value = parent.poptextvalue;
			parent.popReadOnly = "NO"; 
			document.getElementById('Cancel').focus();
		}  

</script> 
</head>
<body class="BODYDetails" onload="fnInValues();" onkeydown="fnAccessChildScreens(event)">
<div class="WNDcontainer" id="DIVWNDContainer1" style="width:100%;background-color:#e6f2f4;">
	<DIV class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)">                   
		<h1 class="WNDtitletxt"><%=ODTUtils.stripXSS(request.getParameter("Title"))%></h1>
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
		</div>
	</DIV>

<div id="ResTree" class="DIVTwoColLyt" style="width:100%; "  align="center">
<div style="height:350px;width:100%; padding-top:20px;" align="center">
<textarea rows="16" cols="58" style="border:1px solid #a2c2e5; " id="textvalue" name="textvalue" title="<%=ODTUtils.stripXSS(request.getParameter("Title"))%>"></textarea>
<div style="text-align:right; margin-top:10px;padding-right:34px; clear:both">
<BUTTON class="BTNfooter" name="OK"  id="ok" onclick="save();fnRADExitSub('ChildWin', event)"   style="visibility:visible;height:25px;width :35px;">Ok</BUTTON>&nbsp;
<BUTTON class="BTNfooter" id="Cancel" onclick="fnRADExitSub('ChildWin', event);" style="height:25px;width :60px;">Cancel</BUTTON>
</div>
</div>
</div> 

</div>
</body>
</html>
