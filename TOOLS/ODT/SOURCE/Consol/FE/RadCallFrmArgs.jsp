<!--
  **
  **
  ** File Name  : RadCallFrmArgs.jsp
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
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>	 

<TITLE>Callfrom Arguments</TITLE>
<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
<script type="text/javascript" src="Script/JS/RadGlobals.js"></script>
<script type="text/javascript" src="Script/JS/RadCallFrmArgs.js"></script>
<script type="text/javascript" src="Script/JS/RadUIUtils.js" ></script>
<script type="text/javascript" src="Script/JS/RadUtil.js" ></script>
<script>
function addIEonScroll() {

	var thisContainer = document.getElementById('DIVGrid1');
	if (!thisContainer) { return; }

	var onClickAction = 'toggleSelectBoxes();';
	thisContainer.onscroll = new Function(onClickAction);
}

function toggleSelectBoxes() {

	var thisContainer = document.getElementById('DIVGrid1');
	var thisHeader = document.getElementById('ClfArgnts1');
	if (!thisContainer || !thisHeader) { return; }

	var selectBoxes = thisContainer.getElementsByTagName('select');
	if (!selectBoxes) { return; }

	for (var i = 0; i < selectBoxes.length; i++) {
		if (thisContainer.scrollTop >= eval(selectBoxes[i].parentNode.offsetTop - thisHeader.offsetHeight)+5) {
			selectBoxes[i].style.visibility = 'hidden';
		} else {
			selectBoxes[i].style.visibility = 'visible';
		}
	}
} 

parent.document.getElementById("IFCHILD").style.width="640px";
parent.document.getElementById("IFCHILD").style.height="320px";
parent.document.getElementById("IFCHILD").scrolling='no';

</script>
</head> 
<body  class="BODYDetails"  onload="showCalFrmArgs()" onkeydown="fnAccessChildScreens(event)">
<div id="DIVWNDContainer1">
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Call Form Arguments</h1>                                      
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
		</div>
	</div>  
<div class="DIVTabPageContent" style="border:0px; ">	
<div id="DIV_RTN_FLD" name="DIV_RTN_FLD" class="DIVMultipleBig" style="margin-left:20px;margin-right:20px;position:relative;width:auto;margin-top:30px;">
	 <div class="DIVmultiplebox">
			<div class="MEButtons">
				<BUTTON class="Buttontext" title="Populate" onclick="fn_populate_Blocks('RAD_DATA_BLOCKS','ClfArgnts','frmclfargs','BLOCK_NAME',2)" name="POPLT" value="POPLT" style="height:20px;width :50px;">Populate</BUTTON>         
				&nbsp;<img src="Images/seperator.gif" alt=""></img>&nbsp;
				<BUTTON class="Buttontext" title="Reset" onclick="reSetCallFormScrArg()" name="REST" value="REST" style="height:20px;width :40px;">Reset</BUTTON>&nbsp;
			</div>
		<div class="DIVMultipleBigInner" style=" width:600px;height:160px;overflow-x:hidden"  >
			<table id="ClfArgnts" name="ClfArgnts" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('ClfArgnts','checkgroup','SEL_ALL_PREF')"></INPUT><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Argument Name</span></th>  
					<th scope="col" class="THgrid"><span class="SPNtext">Source Block</span></th>  
					<th scope="col" width="195px" class="THgrid"><span class="SPNtext">Source Field</span></th>  
					<th scope="col" class="THgrid"><span class="SPNtext">Argument Value</span></th>  
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
	<div style="margin-top:10px;float:right;display:block;">
		<BUTTON class="BTNfooter" name="OK"  id="ok" style="height:25px;width:35px"  onclick="appendMultiple();fnRADExitSub('ChildWin', event)" >Ok</BUTTON>&nbsp;
		<BUTTON class="BTNfooter" name="Cancel"  id="Cancel" style="height:25px;width:60px" onclick="fnRADExitSub('ChildWin', event);"  >Cancel</BUTTON>
	</div>
</div>
</div> 
</div>
</body>
</html>
  
  