<!--
  **
  **
  ** File Name  : RadMenuActions.jsp
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
  ** Copyright � 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

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
<TITLE>Control String Actions</TITLE> 
<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>
		 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
		<script type="text/javascript" src="Script/JS/RadCtrlStrnActns.js" ></script>
		<script type="text/javascript" src="Script/JS/RadUtil.js" ></script>
</head>
<body overflow:hidden" onload="fnShowCtrlStrngActns();" onkeydown="fnAccessChildScreens(event)">
<div  id="DIVWNDContainer1"  >
	<div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Control String Actions--<%=ODTUtils.stripXSS(request.getParameter("Title"))%></h1>                                      
            <div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
        </div>
    </div>
	
<div class="DIVMultipleBig"  style="position:relative; margin-top:40px; overflow:hidden; margin-left:20px; margin-right:20px;width:85%" id="ResTree" >
<div class="DIVmultiplebox">
<div class="DIVMultipleBigInner" >
<div class="Subcontainer" id="MnDt" NAME="MnDt" TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  name="ctrlStr" id="ctrlStr" style="width:100%; overflow:hidden">
<fieldset class="FSTcell"> 

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="SEL_ALL_PREF">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="SEL_ALL_PREF" id="SEL_ALL_PREF" onclick="checkAllStrActns('ctrlStr','checkgroup','SEL_ALL_PREF')"><h3>Action</h3></LABEL>
</div>
</div> 

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="NEW">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="NEW">New</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="COPY">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="COPY">Copy</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="DELETE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="DELETE">Delete</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="CLOSE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="CLOSE">Close</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="UNLOCK">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="UNLOCK">Unlock</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="REOPEN">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="REOPEN">Reopen</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="PRINT">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="PRINT">Print</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="AUTHORIZE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="AUTHORIZE">Authorize</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="REVERSE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="REVERSE">Reverse</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="ROLLOVER">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="ROLLOVER">Rollover</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="CONFIRM">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="CONFIRM">Confirm</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="LIQUIDATE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="LIQUIDATE">Liquidate</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="HOLD">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="HOLD">Hold</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="TEMPLATE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="TEMPLATE">Template</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="VIEW">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="VIEW">View</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b   id="groupidpymt"></b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="GENERATE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="checkgroup" id="GENERATE">Generate</LABEL>
</div>
</div> 

</fieldset>
</div>
</div>
</div>
</div>
</div> 
	<div style="text-align:right; margin-top:10px;padding-right:35px; clear:both">
				<BUTTON class="BTNfooter" name="OK"  id="ok" style="height:25px;width:35px" onclick="fnSaveActions();fnRADExitSub('ChildWin', event)" >Ok</BUTTON>
				<BUTTON class="BTNfooter" name="Cancel"  id="Cancel" style="height:25px;width:60px" onclick="fnRADExitSub('ChildWin', event);">Cancel</BUTTON>
				 
	</div> 
 </div>
</body>
</html>