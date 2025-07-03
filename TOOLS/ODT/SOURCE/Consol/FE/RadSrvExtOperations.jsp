<!--
  **
  **
  ** File Name  : RadSrvNExtOperations.jsp
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
<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>	 

<TITLE>Callfrom Arguments</TITLE>
<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
<script type="text/javascript" src="Script/JS/RadGlobals.js"></script>
<script type="text/javascript" src="Script/JS/RadSrvCUtils.js"></script>
<script type="text/javascript" src="Script/JS/RadUIUtils.js" ></script>
<script type="text/javascript" src="Script/JS/RadUtil.js" ></script>
<script type="text/javascript" src="Script/JS/RADReadWriteFiles.js"></script>
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
var ServiceDom=parent.ServiceDom; 
var Defaulting_function="";
parent.document.getElementById("IFCHILD").style.width="640px";
parent.document.getElementById("IFCHILD").style.height="640px";
parent.document.getElementById("IFCHILD").scrolling='no'; 
function fnload(fld){ 
Defaulting_function=fld;
var cur_row=0;
for (var mlt = 0;mlt < selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='"+Defaulting_function+"']/OPERATION").length;mlt++) {
      if( getNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='"+Defaulting_function+"']/OPERATION/ACTIVE")[mlt])=="Y"){
				           addNewRow1('E_OPERATION_CODE');
				 var webSrvcTags = "OPERATION_CODE".split("~"); 
                for (var cln = 0;cln < webSrvcTags.length;cln++) {
                    document.getElementById('E_OPERATION_CODE').tBodies[0].rows[cur_row].cells[cln].getElementsByTagName('INPUT')[0].value = getNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='"+Defaulting_function+"']/OPERATION/OPERATION_CODE")[mlt]);
                }
				cur_row++;

            }
			if( getNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='"+Defaulting_function+"']/IS_SUMMARY_PRESENT")[0])=="Y"){
	
			document.getElementById("IS_SUMMARY_PRESENT").checked=true; 
	}
}			
document.getElementById("OK").focus();
}
</script>
</head> 
<body  class="BODYDetails" onload="fnload('<%=ODTUtils.stripXSS(request.getParameter("fld"))%>')"  onkeydown="fnAccessChildScreens(event)">
<div id="DIVWNDContainer1">
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Operation Details</h1>                                      
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
		</div>
	</div>  
	
<div class="DIVHeader" style="width:100% ">
	<table role="presentation" summary="" class="TABLELyt" width="100%"  border="0" TYPE="SINGLE" NAME="RADMN" id="RADMN" VIEW="NO" cellpadding="1" cellspacing="0"> 
        <tr>
			 
			
			<td align="right"><LABEL id="LBL_NTFY_LOAD_XML" value="Load Screen Xml" for="FILE_SAVE_PATH">Load Radxml</LABEL></td>
			<td><INPUT aria-required="false" type="file" name ="NTFY_LOAD_SCREEN_XML" id ="NTFY_LOAD_SCREEN_XML"size="10" style="display:none;position:absolute" disabled="true"/>                                        
				<INPUT aria-required="false" type="text" name="FILE_SAVE_PATH" id="FILE_SAVE_PATH" title="" value="" size="20" disabled="true"/>                                        
				<INPUT aria-required="false" type="button"  class="BTNfooter" name ="BROWSE" id ="BROWSE" value="BROWSE" onclick="loadBrowserXML(event)"/> 			
			</td>
			<td><INPUT aria-required="false" type="hidden" id="NTFY_GEN_ALL" name="NTFY_GEN_ALL" disabled="true"></td> 
        </tr> 
	</table>
</div> 

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:100%">
<fieldset class="FSTcell"> 

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="IS_SUMMARY_PRESENT">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="IS_SUMMARY_PRESENT" readonly disabled id="IS_SUMMARY_PRESENT">Summary Query Operation</LABEL>
</div>
</div>

</fieldset>
<!--End of Form fields column two-->
</div> 

<div class="DIVTabPageContent" style="border:0px; ">	
<div id="DIV_RTN_FLD" name="DIV_RTN_FLD" class="DIVMultipleBig" style="margin-left:20px;margin-right:20px;position:relative;width:auto;margin-top:30px;">
	 <div class="DIVmultiplebox">
			<div class="MEButtons">
			 <BUTTON class="Buttontext" onclick="fn_srv_Default()" id="BTN1_Deflt" name="BTN1_Deflt">Default Operations</BUTTON>&nbsp; 
		  </div>
		<div class="DIVMultipleBigInner" style=" width:600px;height:400px;"  >
			<table id="E_OPERATION_CODE" name="E_OPERATION_CODE" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Operation Code</span></th>
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	
	
	<div class="Subcontainer" id="MnDt" NAME="MnDt" TYPE="SINGLE" >



</div>

</div>

	<div style="margin-top:10px;float:right;display:block;">
		<BUTTON class="BTNfooter" name="OK"  id="ok" style="height:25px;width:35px"  onclick="fnRADExitSub('ChildWin', event)" >Ok</BUTTON>&nbsp;
	</div>
</div>



</div> 
</div>
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>
  
  