<!--
  **
  **
  ** File Name  : RadAccessability.jsp
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
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
        <title>Access Keys and Hotkey information</title>
		<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>
		<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
		<script type="text/javascript" src="Script/JS/Extensible.js"></script>
        <script type="text/javascript" type="text/javascript">
        
				var g_scrType ="S";   
				var mainWin  = parent;    
				var scrht = 650;
				var scrwdt= 700;				 
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
<body onload="fnLoad()" onkeydown="fnAccessChildScreens(event)" >
<div class="WNDcontainer" id="DIVWNDContainer">
    <div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"><h1 class="WNDtitletxt">Accesibility Help</h1>
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

<div  id="MnDt" NAME="MnDt" style="MARGIN-TOP: 20px;" TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTstd"> 
<legend>Application Hot Keys</legend>
<div class="DIVText"><LABEL class="LBLstd" for="h1">Help</LABEL><INPUT aria-required="false"  tabindex="-1" id="h1" class="TXTro"  value="F1" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="h2">Enter Query</LABEL><INPUT aria-required="false"  tabindex="-1" id="h2" class="TXTro"  value="F7" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="h3">Execute Query</LABEL><INPUT aria-required="false"  tabindex="-1" id="h3" class="TXTro"  value="F8" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="h4">Open LOV/PopUP-Edit</LABEL><INPUT aria-required="false"  tabindex="-1" id="h4" class="TXTro"  value="F9" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="h5">Save</LABEL><INPUT aria-required="false"  tabindex="-1" id="h5" class="TXTro"  value="Ctrl + S" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="h6">Undo</LABEL><INPUT aria-required="false"  tabindex="-1" id="h6" class="TXTro"  value="Ctrl + Z" size="15"></div>
</fieldset>
<fieldset class="FSTstd"> 
<legend>Application Access Keys</legend>
<div class="DIVText"><LABEL class="LBLstd" for="l1">Browser</LABEL><INPUT aria-required="false"  tabindex="-1" id="l1" class="TXTro"  value="Alt + B" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="l2">Windows</LABEL><INPUT aria-required="false"  tabindex="-1" id="l2" class="TXTro"  value="Alt + W" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="l3">Options</LABEL><INPUT aria-required="false"  tabindex="-1" id="l3" class="TXTro"  value="Alt + O" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="l4">Sign Out</LABEL><INPUT aria-required="false"  tabindex="-1" id="l4" class="TXTro"  value="Alt + S" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="l4">New(Infra Screens)</LABEL><INPUT aria-required="false"  tabindex="-1" id="l4" class="TXTro"  value="Ctrl + N" size="15"></div>
</fieldset>

<fieldset class="FSTstd"> 
<legend>Shortcuts for Windows and Widgets</legend>
<div class="DIVText"><LABEL class="LBLstd" for="w1">Switch between Windows</LABEL><INPUT aria-required="false"  tabindex="-1" id="w1" class="TXTro"  value="F2" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="w2">Close window</LABEL><INPUT aria-required="false"  tabindex="-1" id="w2" class="TXTro"  value="Ctrl + W" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="w3">Close Dialogs</LABEL><INPUT aria-required="false"  tabindex="-1" id="w3" class="TXTro"  value="Esc" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="w4">Next Tab</LABEL><INPUT aria-required="false"  tabindex="-1" id="w4" class="TXTro"  value="Left Arrow" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="w5">Previous Tab</LABEL><INPUT aria-required="false"  tabindex="-1" id="w5" class="TXTro"  value="Right Arrow" size="15"></div>
</fieldset>


</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTstd" >
<legend>Data Table</legend>
<div class="DIVText"><LABEL class="LBLstd" for="D1">Navigate Between Rows</LABEL><INPUT aria-required="false"  tabindex="-1" id="D1" class="TXTro"  value="Up &amp; Down keys" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="D2">Navigate between cells </LABEL><INPUT aria-required="false"  tabindex="-1" id="D2" class="TXTro"  value="Tab &amp; Shift+Tab" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="D3">First Page</LABEL><INPUT aria-required="false"  tabindex="-1" id="D3" class="TXTro"  value="Home" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="D4">Previous Page</LABEL><INPUT aria-required="false"  tabindex="-1" id="D4" class="TXTro"  value="Page Up" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="D5">Next Page</LABEL><INPUT aria-required="false"  tabindex="-1" id="D5" class="TXTro"  value="Page Down" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="D6">Last Page</LABEL><INPUT aria-required="false"  tabindex="-1" id="D6" class="TXTro"  value="End" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="D7">Add Row</LABEL><INPUT aria-required="false"  tabindex="-1" id="D7" class="TXTro"  value="Ctrl + Insert" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="D8">Delete Row</LABEL><INPUT aria-required="false"  tabindex="-1" id="D8" class="TXTro"  value="Ctrl + Delete" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="D9">Exit Table</LABEL><INPUT aria-required="false"  tabindex="-1" id="D9" class="TXTro"  value="Ctrl + End" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="D10">Go to Button before table</LABEL><INPUT aria-required="false"  tabindex="-1" id="D10" class="TXTro"  value="Ctrl + Home" size="15"></div>
</fieldset> 

<fieldset class="FSTstd"> 
<legend>Function Generation Access Keys</legend>
<div class="DIVText"><LABEL class="LBLstd" for="F1">Access to Header</LABEL><INPUT aria-required="false"  tabindex="-1" id="F1" class="TXTro"  value="Alt + H" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="F2">Access to Search</LABEL><INPUT aria-required="false"  tabindex="-1" id="F2" class="TXTro"  value="Alt + F" size="15"></div>
<div class="DIVText"><LABEL class="LBLstd" for="F3">Access to Detail Screen Button</LABEL><INPUT aria-required="false"  tabindex="-1" id="F3" class="TXTro"  value="Alt + M" size="15"></div>
</fieldset> 
<!--End of Form fields column two-->
</div>
 
</div>  
	<div style="TEXT-ALIGN: right; MARGIN-TOP: 8px; PADDING-RIGHT: 30px; CLEAR: both">
		<BUTTON style="HEIGHT: 25px" id="Cancel" class="BTNfooter" onclick="fnRADExitAll(seqNo, event)" name="Cancel">Cancel</BUTTON>
	</div>
</div> 
</BODY>
</html>