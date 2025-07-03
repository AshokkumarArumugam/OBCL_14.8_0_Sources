<!--
  **
  **
  ** File Name  : RadFilterDetails.jsp
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
<TITLE> Amendable Details -- <%=ODTUtils.stripXSS(request.getParameter("Title")) %> </TITLE>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>  
<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
<script type="text/javascript" src="Script/JS/RadLovHandler.js"></script>
<script type="text/javascript" src="Script/JS/RadMultipleTables.js"></script>
<script type="text/javascript" src="Script/JS/RadPFUtils.js"></script>
<script type="text/javascript" src="Script/JS/RadUIUtils.js"></script>  
<script type="text/javascript" src="Script/JS/RadAccessibility.js" ></script>
<script type="text/javascript">
var FlrRow="";
var tblname ="";
function fncalstyle(){ 
parent.document.getElementById("IFCHILD").style.width="800px";
parent.document.getElementById("IFCHILD").style.height="700px"; 
}
			function fnFlt_Det(rind , tabln){
			FlrRow=rind;
			tblname = tabln;
var tabp=parent.document.getElementById(tabln).tBodies[0].rows[FlrRow];
var flt_nm=tabp.cells[1].getElementsByTagName('INPUT')[0].value;
var flt_tp=tabp.cells[2].getElementsByTagName('INPUT')[0].value;
var flt_Dtp=tabp.cells[3].getElementsByTagName('SELECT')[0].value;
var flt_Scp=tabp.cells[4].getElementsByTagName('SELECT')[0].value;
var flt_Exp=tabp.cells[5].getElementsByTagName('INPUT')[0].value;
var flt_op=tabp.cells[6].getElementsByTagName('SELECT')[0].value;
var flt_Dfl=tabp.cells[7].getElementsByTagName('INPUT')[0].value;
var flt_Maln=tabp.cells[8].getElementsByTagName('INPUT')[0].value;
var flt_lbl=tabp.cells[9].getElementsByTagName('INPUT')[0].value;
var flt_QRY=tabp.cells[10].getElementsByTagName('INPUT')[0].value;
			
document.getElementById("FILTER_NAME").value=flt_nm;
document.getElementById("FILTER_TYPE").value=flt_tp;
document.getElementById("FILTER_SCOPE").value=flt_Scp;
document.getElementById("FILTER_DATA_TYPE").value=flt_Dtp;
document.getElementById("FILTER_EXPRESSION").value=flt_Exp;  
document.getElementById("FILTER_OPERATOR").value=flt_op;
document.getElementById("DEFAULT_VALUE").value=flt_Dfl; 
document.getElementById("MAXIMUM_LENGTH").value=flt_Maln;
document.getElementById("LABEL_CODE").value=flt_lbl;
document.getElementById("FILTER_QUERY").value=flt_QRY;

document.getElementById("Cancel").focus();
			 }
			 
			 function funcPFfieldTables(tablnam) {

    var tabnam = selectNodes(parent.dom, "//PURGE_TABLES/PURGE_TABLE/TABLE_NAME");
    var tabl = document.getElementById(tablnam).tBodies[0];
    var tablen = tabl.rows.length;
    var obj1 = tabl.rows[tablen - 1].cells[1].getElementsByTagName('SELECT')[0];
    var result = tabl.rows[tablen - 1].cells[1].getElementsByTagName('SELECT')[0].value;
    obj1.length = 0;
    addOption(obj1, "", "", true);
    for (var i = 0;i < tabnam.length;i++) {
        addOption(obj1, getNodeText(tabnam[i]), getNodeText(tabnam[i]), false);
    }
    tabl.rows[tablen - 1].cells[1].getElementsByTagName('SELECT')[0].value = result;

}

function addOption(obj, text, value, selected) {
    if (obj != null) {
        obj.options[obj.options.length] = new Option(text, value, false, selected);
    }
} 
 

function fnSave_filter(event)
{
var flt_name=document.getElementById("FILTER_NAME").value;
var flt_tp=document.getElementById("FILTER_TYPE").value;
var flt_op=document.getElementById("FILTER_OPERATOR").value;
var flt_Scp=document.getElementById("FILTER_SCOPE").value;
var flt_Dtp=document.getElementById("FILTER_DATA_TYPE").value;
var flt_Exp=document.getElementById("FILTER_EXPRESSION").value ;
var flt_Dfl=document.getElementById("DEFAULT_VALUE").value;
var flt_Maln=document.getElementById("MAXIMUM_LENGTH").value;
var flt_lbl=document.getElementById("LABEL_CODE").value;
var flt_QRY=document.getElementById("FILTER_QUERY").value;
	
var tabp=parent.document.getElementById(tblname).tBodies[0].rows[FlrRow];

tabp.cells[1].getElementsByTagName('INPUT')[0].value=flt_name;
tabp.cells[2].getElementsByTagName('INPUT')[0].value=flt_tp;
tabp.cells[3].getElementsByTagName('SELECT')[0].value=flt_Dtp;
tabp.cells[4].getElementsByTagName('SELECT')[0].value=flt_Scp;
tabp.cells[5].getElementsByTagName('INPUT')[0].value=flt_Exp;
tabp.cells[6].getElementsByTagName('SELECT')[0].value=flt_op;
tabp.cells[7].getElementsByTagName('INPUT')[0].value=flt_Dfl;
tabp.cells[8].getElementsByTagName('INPUT')[0].value=flt_Maln;
tabp.cells[9].getElementsByTagName('INPUT')[0].value=flt_lbl; 
tabp.cells[10].getElementsByTagName('INPUT')[0].value=flt_QRY; 
 
fnRADExitSub('ChildWin', event);
}
			
</script>
</head>
<body  onload="fncalstyle();fnFlt_Det('<%=ODTUtils.stripXSS(request.getParameter("rowindex"))%>', '<%=ODTUtils.stripXSS(request.getParameter("tabl"))%>')" onkeydown="fnAccessChildScreens(event)">
 <div id="DIVWNDContainer1">
  <div class="WNDtitlebar" id="WNDtitlebar" >
	<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Filter Details</h1>                                      
		<div class="WNDbuttons">
			<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
				<span class="LBLinv">Close</span>
			</a>
		</div>
   </div>
 </div> 
 

<div    class="Subcontainer"  id="LOVMAIN" NAME="LOVMAIN" TYPE="SINGLE" style="width:100%;MARGIN-TOP:30px;">

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:100%">
<fieldset class="FSTcell"> 
<div>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
<div class="DIVText">
<LABEL class="LBLstd star" for="FILTER_NAME">Filter Name</LABEL>
<INPUT aria-required="true" class="TXTro"  readonly type="text" name="FILTER_NAME" id="FILTER_NAME" value="" size="40">
</div> 

<div class="DIVText">
<LABEL class="LBLstd star" for="FILTER_TYPE">Filter Type</LABEL>
<SELECT aria-required="true"  class="SELstd" disabled type="text" name="FILTER_TYPE" id="FILTER_TYPE" value="">
<option></option>
<option value="B">Business</option>
<option  value="E">Execution</option>
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd star" for="FILTER_SCOPE">Filter Scope</LABEL>
<SELECT aria-required="true"  class="SELstd" type="text" name="FILTER_SCOPE" id="FILTER_SCOPE" value="">
<option></option>
<option value="E">Entity</option>
<option  value="T">Table</option>
</SELECT>
</div>

<div Style="display:none">
<LABEL class="LBLstd" for="LABEL_CODE">Filter Label</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="LABEL_CODE" id="LABEL_CODE" value="" size="25">
<BUTTON    class="BTNimg"  title="List Of Values" tabindex="-1"  id="BTN_LBLCD" onclick="LOV_LABEL_CODE.show_lov('LABEL_CODE~','frmScrSnm','', 'Label Code', 'Label Code~Label Description', 'Label Code~Label Description',event)">
<span class="ICOlov"></span></BUTTON>
<INPUT aria-required="false" class="TXTstd" type="text" name="FILTER_QUERY" id="FILTER_QUERY" value="" size="25"> 
</div>
</fieldset>
<div>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
<fieldset class="FSTstd">
<legend>Filter Expression</legend> 

<div class="DIVText">
<LABEL class="LBLstd" for="FILTER_EXPRESSION">LHS Expression</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="FILTER_EXPRESSION" id="FILTER_EXPRESSION" readonly value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('LOVMAIN','FILTER_EXPRESSION','',event)">
<span class="ICOnarrative"></span></BUTTON>
<BUTTON class="Buttontext" name="E_ok"  id="E_ok" onclick="fnExpression_builder('','FILTER_EXPRESSION','',event)" style="visibility:visible;height:25px;width:150px;">Expression Builder</BUTTON>
</div> 

<div class="DIVText">
<LABEL class="LBLstd star" for="FILTER_OPERATOR">Filter Operator</LABEL>
<SELECT aria-required="true"  class="SELstd" name="FILTER_OPERATOR" id="FILTER_OPERATOR" value="" >
	     <option value=""></option>
    <option value="EQUALS">Equals</option>
    <option value="NOT EQUALS">Not Equals</option>
    <option value="GREATER THAN">Greater Than</option>
    <option value="LESSER THAN">Lesser Than</option> 
	<option value="GREATER OR EQUAL">Greater Or EquaL</option>
    <option value="LESSER OR EQUAL">Lesser Or Equal</option>
    <option value="IS NULL">Is Null</option>
    <option value="IS NOT NULL">Is Not Null</option>
	<option value="BETWEEN">Between</option>
	<option value="NOT BETWEEN">Not Between</option>
	<option value="LIKE">Like</option>
	<option value="NOT LIKE">Not Like</option>
	<option value="NOT IN">Not In</option>
	<option value="IN">In</option>
</SELECT>  
</div>  

</fieldset>

<div>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>

	<fieldset class="FSTstd">
<legend>Value Details</legend> 

<div class="DIVText">
<LABEL class="LBLstd star" for="FILTER_DATA_TYPE">Filter Data Type</LABEL>
<SELECT aria-required="true"  class="SELstd" name="FILTER_DATA_TYPE" id="FILTER_DATA_TYPE" value="" >
	     <option value=""></option>
                            <option value="DATE">Date</option>
                            <option value="VARCHAR2">String</option>
                            <option value="NUMBER">Number</option> 
</SELECT>
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="MAXIMUM_LENGTH">Maximum Length</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" name="MAXIMUM_LENGTH" id="MAXIMUM_LENGTH" value="" size="40">
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="DEFAULT_VALUE">Default Value</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" name="DEFAULT_VALUE" id="DEFAULT_VALUE" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('LOVMAIN','DEFAULT_VALUE','',event)">
<span class="ICOnarrative"></span></BUTTON> 
</div> 
</fieldset>

<div>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div><div>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
</div>
<!--End of Form fields column one-->
 
</div>  

 <div style="text-align:right; margin-top:10px;padding-right:35px; clear:both">
	<BUTTON class="BTNfooter" name="OK"  id="ok" onclick="fnSave_filter(event)" style="visibility:visible;height:25px;width :35px;">Ok</BUTTON>
	<BUTTON class="BTNfooter" id="Cancel" name="Cancel" onclick="fnRADExitSub('ChildWin', event)"  style="height:25px;width :60px;">Cancel</BUTTON>
</div>
 
</div>  
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body> 
</html> 
        