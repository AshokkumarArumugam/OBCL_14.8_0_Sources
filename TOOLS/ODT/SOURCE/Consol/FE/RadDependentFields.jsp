<!--
  **
  **
  ** File Name  : RadDependentFields.jsp
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
		
<TITLE>Dependends On</TITLE>
<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
<script type="text/javascript" src="Script/JS/RadGlobals.js"></script>
<script type="text/javascript" src="Script/JS/RadUtil.js" ></script>
<script type="text/javascript" src="Script/JS/RadCallFrmArgs.js"></script> 
<script type="text/javascript" src="Script/JS/RadUIUtils.js" ></script>
<script type="text/javascript" src="Script/JS/RadAccessibility.js" ></script>
<script type="text/javascript" > 

parent.document.getElementById("IFCHILD").style.width="400px";
parent.document.getElementById("IFCHILD").style.height="600px";
parent.document.getElementById("IFCHILD").scrolling='no';

</script>
</head>
<body class="BODYDetails"  onload="showdpndtFlds()" onkeydown="fnAccessChildScreens(event)">
<div id="DIVWNDContainer1">
	<div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Dependends On</h1>                                      
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
        </div>
    </div>
<fieldset class="FSTstd" style=" width:380px;  margin:0px; margin-top:20px; height:240px; padding:0px;clear:both">
<legend style="padding-left:20px; margin:0px;">Fields</legend>
<!--<div class="DIVTabPageContent" style="border:0px">	-->
<div id="DIV_dpndtflds" name="DIV_dpndtflds" class="DIVMultipleBig"  style="margin-top:0px;margin-left:20px;position:relative;width:90%;">
	<div class="DIVmultiplebox">
			<div class="MEButtons">
				<!--<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="Fields">Fields</div>-->
				<BUTTON class="Buttontext" title="Populate" onclick="fn_populate_Blocks('RAD_DATA_BLOCKS','dpndtflds','frmdpntflds','BLOCK_NAME',1);fn_Populate_CalFrms();" name="POPLT" value="POPLT" style="height:20px;width :55px;">Populate</BUTTON>         
				&nbsp;<img src="Images/seperator.gif" alt="">&nbsp;
				<BUTTON class="BTNimg" title="Add Row" onclick="addNewRow1('dpndtflds');fn_populate_Blocks_toScreenArgs('RAD_DATA_BLOCKS','dpndtflds','frmdpntflds','BLOCK_NAME',1);" name="ADD" value="ADD"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
				<BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL"  onclick="delRow1('dpndtflds')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>&nbsp;&nbsp;
			</div>
		<div class="DIVMultipleBigInner" style="height:160px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="dpndtflds" name="dpndtflds" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('dpndtflds','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Block Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Field Name</span></th> 
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>
</fieldset>	  

<fieldset class="FSTstd" style=" width:380px;  margin:0px; margin-top:20px; height:240px; padding:0px;clear:both">
<legend style="padding-left:20px; margin:0px;">Services</legend>
<div id="DIV_RTN_FLD" name="DIV_RTN_FLD" class="DIVMultipleBig" style=" margin-top:0px;margin-left:20px;position:relative;width:90%;">
	 <div class="DIVmultiplebox">
			<div class="MEButtons">
				<!--<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="Services">Services</div>-->
				<BUTTON class="Buttontext" title="Populate" onclick="fn_Populate_CalFrms()" name="POPLT" value="POPLT" style="height:20px;width :55px;">Populate</BUTTON>
                &nbsp;<img src="Images/seperator.gif" alt="">&nbsp;
                <BUTTON class="BTNimg" title="Add Row" onclick="fn_get_CalFrms(event);" name="ADD" value="ADD"><img src="Images/Addrow.gif"  alt="Add Row"></BUTTON>
                <BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL"  onclick="delRow1('dpndtsvrs')"><img src="Images/Delrow.gif"  alt="Delete Row"></BUTTON>&nbsp;&nbsp;
            </div>
		<div class="DIVMultipleBigInner" style="height:160px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="dpndtsvrs" name="dpndtsvrs" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('dpndtsvrs','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Service</span></th>  
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
	</div>
</fieldset>	
	<div style="margin-top:10px; margin-right:40px;float:right;">
        <BUTTON class="BTNfooter" name="OK"  id="ok" style="height:25px;width:35px"  onclick="fnSaveDpndtFlds();fnRADExitSub('ChildWin', event)" >Ok</BUTTON>
        <BUTTON class="BTNfooter" name="Cancel"  id="Cancel" style="height:25px;width:60px" onclick="fnRADExitSub('ChildWin', event)" >Cancel</BUTTON>
    </div>
</div>
</div> 
</div>
</body>
</html>
  