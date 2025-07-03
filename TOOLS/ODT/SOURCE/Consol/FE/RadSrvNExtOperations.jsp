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
<script>
var fld_name="";
var ServiceDom="";
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

parent.document.getElementById("IFCHILD").style.width="840px";
parent.document.getElementById("IFCHILD").style.height="620px";
parent.document.getElementById("IFCHILD").scrolling='no'; 

 var webSrvcTags_1="";
 var webSrvcTags_2="";
function fnload(fld){
var ServiceDom=parent.ServiceDom; 
fld_name=fld;
for (var mlt = 0;mlt < selectNodes(ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION[FUNCTION_ID='"+fld+"']/NONEXT_OPERATION").length;mlt++) {
                addNewRow1('OPERATION_CODE');
				   webSrvcTags_1 = "OPERATION_CODE~OPERATION_DESCRIPTION~FC_ACTION~SMS_FUNCTION_ID~SMS_ACTION~FS_REQ_XSD~PK_RES_XSD~FS_RES_XSD~IO_REQ_XSD~DEFAULT_FUNCTION".split("~"); 
                for (var cln = 0;cln < webSrvcTags_1.length;cln++) {
                    document.getElementById('OPERATION_CODE').tBodies[0].rows[mlt].cells[cln + 1].getElementsByTagName('INPUT')[0].value = getNodeText(selectSingleNode(selectNodes(ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION[FUNCTION_ID='"+fld+"']/NONEXT_OPERATION")[mlt], webSrvcTags_1[cln]));
                }

            }
for (var mlt = 0;mlt < selectNodes(ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION[FUNCTION_ID='"+fld+"']/NONEXT_SUSBSYSTEM").length;mlt++) {
                addNewRow1('SUB_SYSTEM');
				  webSrvcTags_2 = "SUBSYSTEM_XSD".split("~"); 
                for (var cln = 0;cln < webSrvcTags_2.length;cln++) {
                    document.getElementById('SUB_SYSTEM').tBodies[0].rows[mlt].cells[cln + 1].getElementsByTagName('INPUT')[0].value = getNodeText(selectSingleNode(selectNodes(ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION[FUNCTION_ID='"+fld+"']/NONEXT_SUSBSYSTEM")[mlt], webSrvcTags_2[cln]));
                }

            }  			
document.getElementById("Cancel").focus();
}
</script>
</head> 
<body  class="BODYDetails"  onload="fnload('<%=ODTUtils.stripXSS(request.getParameter("fld"))%>')"  onkeydown="fnAccessChildScreens(event)">
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
<div class="DIVTabPageContent" style="border:0px; ">	
<div id="DIV_RTN_FLD" name="DIV_RTN_FLD" class="DIVMultipleBig" style="margin-left:20px;margin-right:20px;position:relative;width:auto;margin-top:30px;">
	 <div class="DIVmultiplebox">
			<div class="MEButtons">
			   <!-- <BUTTON class="BTNimg" title="Add Row" onclick="addNewRow1('OPERATION_CODE');" name="ADD" id="btnAdd" value="ADD"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>-->
				<BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL"   id="btnDel" onclick="delRow1('OPERATION_CODE')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>
           </div>
		<div class="DIVMultipleBigInner" style=" width:800px;height:200px;"  >
			<table id="OPERATION_CODE" name="OPERATION_CODE" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('OPERATION_CODE','checkgroup','SEL_ALL_PREF')"></INPUT><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Operation Code</span></th>  
					<th scope="col" class="THgrid"><span class="SPNtext">Operation Description</span></th>  
					<th scope="col" class="THgrid"><span class="SPNtext">FC Action</span></th>  
					<th scope="col" class="THgrid"><span class="SPNtext">SMS Function ID</span></th>  
					<th scope="col" class="THgrid"><span class="SPNtext">SMS Action</span></th>  
					<th scope="col" class="THgrid"><span class="SPNtext">FS REQ_XSD</span></th>  
					<th scope="col" class="THgrid"><span class="SPNtext">PK RES_XSD</span></th>  
					<th scope="col" class="THgrid"><span class="SPNtext">FS RES_XSD</span></th>  
					<th scope="col" class="THgrid"><span class="SPNtext">IO REQ_XSD</span></th>  
					<th scope="col" class="THgrid"><span class="SPNtext">Default Function</span></th>  
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
	
	<div class="DIVmultiplebox"  style="margin-top:20px;padding-top:20px;position:relative;">
			<div class="MEButtons">
			    <!--<BUTTON class="BTNimg" title="Add Row" onclick="addNewRow1('SUB_SYSTEM');" name="ADD" id="btnAdd" value="ADD"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
				--><BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL"   id="btnDel" onclick="delRow1('SUB_SYSTEM')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>
           </div>
		<div class="DIVMultipleBigInner" style=" width:800px;height:200px;"  >
			<table id="SUB_SYSTEM" name="SUB_SYSTEM" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF1" name="SEL_ALL_PREF1" class="CHKstd" type="checkbox" onclick="checkAll('SUB_SYSTEM','checkgroup','SEL_ALL_PREF1')"></INPUT><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Sub System XSD Details</span></th>  
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
	
	<div style="margin-top:10px;float:right;display:block;">
		<BUTTON class="BTNfooter" name="OK"  id="OK" style="height:25px;width:35px"  onclick="UpdateData_NEO();UpdateData_NES();fnRADExitSub('ChildWin', event)" >Ok</BUTTON>&nbsp;
		<BUTTON class="BTNfooter" name="Cancel"  id="Cancel" style="height:25px;width:60px" onclick="fnRADExitSub('ChildWin', event);"  >Cancel</BUTTON>
	</div>
</div>
</div> 
</div>
</body>
</html>
  
  