<!--
  **
  **
  ** File Name  : RadMissingLabels.jsp
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
  ** Copyright ? 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

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

	<title>Label Code</title>
	<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
    <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
	<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
	<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>	 
	<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
	<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
	<script type="text/javascript" src="Script/JS/RadUIUtils.js"></script>
	<script type="text/javascript" src="Script/JS/RadLabelCode.js"></script>
    <script type="text/javascript" src="Script/JS/RadGlobals.js"></script> 
	<script type="text/javascript" src="Script/JS/RadAccessibility.js" ></script>
	<script type="text/javascript"> 
            
function fncalstyle(){
                            
	parent.document.getElementById("IFCHILD").style.width="1000px";
	parent.document.getElementById("IFCHILD").style.height="600px"; 
	document.getElementById("Cancel").focus();
}
</script>
</head>
<body onload="fncalstyle();" onkeydown="fnAccessChildScreens(event)">
<div  id="DIVWNDContainer1"> 
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Labels</h1>                                      
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
		</div>
    </div>  
<div  class="DIVMultipleBig" id="ResTree"  style="height:500px;position:relative; margin-top:40px; margin-left:20px; margin-right:20px;width:95%">
	<div class="MEButtons"  id="mlabelCode_ME" name="mlabelCode_ME">
	 	<BUTTON disabled CLASS="BTNfooter" name="lblFirst" id ="lblFirst" onclick="doNavigatelbl1m(gcNAV_FIRST)" ><sup>&lt;&lt;</sup></BUTTON>
   		<BUTTON disabled CLASS="BTNfooter" name="lblPrev" id ="lblPrev"   onclick="doNavigatelbl1m(gcNAV_PREVIOUS)" ><sup>&lt;</sup></BUTTON>
        <BUTTON CLASS="BTNfooter" id="pagesflow" name="pagesflow" ><sup>0 of 0</sup></BUTTON>
		<BUTTON disabled CLASS="BTNfooter" name="lblNext" id ="lblNext" onclick="doNavigatelbl1m(gcNAV_NEXT)" ><sup>&gt;</sup></BUTTON>
	    <BUTTON disabled CLASS="BTNfooter" name="lblLast" id ="lblLast" onclick="doNavigatelbl1m(gcNAV_LAST)"><sup>&gt;&gt;</sup></BUTTON>
		
        <BUTTON class="BTNimg" title="Add Row" onclick="addNewRow('mlabelCode')" name="ADD" value="ADD"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
        <BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL" class="trigger" onclick="delRow('mlabelCode')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>&nbsp;&nbsp;   
  	</div> 
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:440px;overflow-x:hidden" >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="mlabelCode" name="mlabelCode" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO"  class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('mlabelCode','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Label Code</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Label Description</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Label Type</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Operation</span></th>
			    	</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="mlabelCode_TE" name="mlabelCode_TE" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
	<div style="text-align:right; margin-top:10px; clear:both">
        <BUTTON class="BTNfooter" id="FetchAll" onclick="fnLoadAlllabels(document.getElementById('mlabelCode'));" style="height:25px;width :150px;">Fetch All Labels</BUTTON>
		<BUTTON class="BTNfooter" id="Fetch" onclick="fnLoadmissinglabels(document.getElementById('mlabelCode'));" style="height:25px;width :180px;">Fetch Missing Labels</BUTTON>		
        <BUTTON class="BTNfooter" name="OK"  id="ok" onclick="createxml();"   style="visibility:visible;height:25px;width :60px;">Deploy</BUTTON>
		<BUTTON class="BTNfooter" id="Cancel" name="Cancel"  onclick="fnRADExitSub('ChildWin', event)"  style="height:25px;width :60px;">Exit</BUTTON>
	</div> 
</div> 
</div> 
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>
