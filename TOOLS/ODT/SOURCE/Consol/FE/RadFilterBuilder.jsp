<!--
  **
  **
  ** File Name  : RadFilterBuilder.jsp
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
	<script type="text/javascript" src="Script/JS/RadAccessibility.js" ></script>
<script type="text/javascript"> 
var undostr="";
var undoqry="";
var prestr=""; 
var preqry="";	
function fncalstyle(){ 
parent.document.getElementById("IFCHILD").style.width="700px";
parent.document.getElementById("IFCHILD").style.height="600px"; 
}	

function fnLoadData()
{
  var tab_b = parent.document.getElementById("PF_B_FILTERS").tBodies[0].rows;
  var tab_e = parent.document.getElementById("PF_E_FILTERS").tBodies[0].rows;
	var obj1=document.getElementById("FILTER_NAMES");
    obj1.length = 0;
    addOption(obj1, "", "", true);
	
	for (var i = 0;i < tab_b.length;i++) {
       if(tab_b[i].cells[4].getElementsByTagName('SELECT')[0].value == "T")
		continue;
		 addOption(obj1, tab_b[i].cells[1].getElementsByTagName('INPUT')[0].value, tab_b[i].cells[1].getElementsByTagName('INPUT')[0].value, false);
    } 
	for (var i = 0;i < tab_e.length;i++) {
        if(tab_e[i].cells[4].getElementsByTagName('SELECT')[0].value == "T")
		continue;
		 addOption(obj1, tab_e[i].cells[1].getElementsByTagName('INPUT')[0].value, tab_e[i].cells[1].getElementsByTagName('INPUT')[0].value, false);
    }
	addOption(obj1, "FREE_FORMAT_FILTER", "FREE_FORMAT_FILTER", false);
	document.getElementById('VALIDATE_EXPR').value = parent.poptextvalueFFqry;
	document.getElementById('textvalue').value = parent.poptextvalueFF;
	document.getElementById('textvalue1').value = parent.document.getElementById('FINAL_FILTER_EXPRESSION').value;
	prestr	= parent.poptextvalueFF;
	preqry  = parent.poptextvalueFFqry;
	document.getElementById('textvalue').readOnly =true;
	document.getElementById('Cancel').focus();
}
function addOption(obj, text, value, selected) {
    if (obj != null) {
        obj.options[obj.options.length] = new Option(text, value, false, selected);
    }
}
function fnfindExpr(fltrnm)
{
	var tab_b = parent.document.getElementById("PF_B_FILTERS").tBodies[0].rows;
	var tab_e = parent.document.getElementById("PF_E_FILTERS").tBodies[0].rows;
	var expr1="";
	for (var i = 0;i < tab_b.length;i++) {
        if(fltrnm == tab_b[i].cells[1].getElementsByTagName('INPUT')[0].value)
		expr1=parent.fnTexpresion(tab_b,i);
    } 
	for (var i = 0;i < tab_e.length;i++) {
        if(fltrnm == tab_e[i].cells[1].getElementsByTagName('INPUT')[0].value)
		expr1=parent.fnTexpresion(tab_e,i);
    } 
	if("FREE_FORMAT_FILTER"==fltrnm)
	{
	expr1 = parent.document.getElementById("PURGE_FF_FILTER").value
	}
	return expr1;
}
 function fnAddDb()
{  
	fnsetprevdt();
	var fltrname = document.getElementById("FILTER_NAMES").value;  
	var textvalue = document.getElementById("textvalue").value; 
	var textvalue1 = document.getElementById("textvalue1").value; 
	var textquer = document.getElementById("VALIDATE_EXPR").value; 
	var fltexpr=fnfindExpr(fltrname); 
	if(fltrname!= "" && fltexpr!= "") 
	{
	document.getElementById("textvalue1").value=textvalue1  + fltexpr + " \n"; 
	document.getElementById("textvalue").value=textvalue + " " + fltrname; 
	document.getElementById("VALIDATE_EXPR").value=textquer+ " 1=1"; 
	document.getElementById("FILTER_NAMES").value="";
	}
}
function fnAddGl()
{  
	fnsetprevdt();
	var Syparm = document.getElementById("SYSTEM_PARAMETERS").value; 
	var textvalue = document.getElementById("textvalue").value; 
	var textvalue1 = document.getElementById("textvalue1").value; 
	var textquer = document.getElementById("VALIDATE_EXPR").value; 
	if(Syparm!="")	
	{
	document.getElementById("textvalue1").value=textvalue1  + Syparm + " \n"; 
	document.getElementById("textvalue").value=textvalue + " " +  Syparm;  
	document.getElementById("VALIDATE_EXPR").value=textquer+ " " +Syparm;
	document.getElementById("SYSTEM_PARAMETERS").value="";
	}
}
 
 function fnReset()
{  
 document.getElementById("textvalue").value="";
document.getElementById("textvalue1").value=""; 
document.getElementById("VALIDATE_EXPR").value=""; 
}

function fnundo()
{
document.getElementById("textvalue").value=undostr;
document.getElementById("VALIDATE_EXPR").value=undoqry;
}
function fnsetprevdt()
{
undostr=document.getElementById("textvalue").value;
undoqry=document.getElementById("VALIDATE_EXPR").value;

}

function fnSaveData(event)
{
if(prestr!=document.getElementById('textvalue').value)
{
var qury=document.getElementById('VALIDATE_EXPR').value; 
var queryString = "DEFAULT_COLUMNS";
var WhereString = "WHERE "+qury+"";
	top.parent.gReqCode = 'UICONTROLLER';
    top.parent.gReqType = "APP";
    var radReqDOM = top.parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);
	setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");

    var response = top.parent.fnPost(getXMLString(radReqDOM) +  top.parent.gBodySeparator + "");
     var multRec = ""; 
  try {
        multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
    }
    catch (e) {
        multRec = response.substring(9, response.indexOf("</Records>")).split(">"); 
		alertMessage("Invalid Expression", "E");
		fnReset();
		return;
	} 
 }  
parent.document.getElementById('FINAL_FILTER_VALIDATION').value="C";
parent.popTextObjFF.value=document.getElementById('textvalue').value;
parent.popTextObjFFqry.value=document.getElementById('VALIDATE_EXPR').value;
var textvalue1 = document.getElementById("textvalue1").value; 
parent.document.getElementById('FINAL_FILTER_EXPRESSION').value=textvalue1;
	

fnRADExitSub('ChildWin', event);
try{
parent.popTextObjFF.focus();    
}
catch(e)
{}  		 
}
</script>
</head>
<body  onload="fncalstyle();fnLoadData()" onkeydown="fnAccessChildScreens(event)">
 <div id="DIVWNDContainer1">
  <div class="WNDtitlebar" id="WNDtitlebar" >
	<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Final Filter Builter</h1>                                      
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
<fieldset class="FSTstd">  
<legend>Filter Names</legend> 

<div class="DIVText">
<LABEL class="LBLstd" for="FILTER_NAMES">Filter Name</LABEL>
<SELECT aria-required="true" width="200" style="width:200px" class="SELstd"  type="text" name="FILTER_NAMES" id="FILTER_NAMES" value="">
<option></option>
</SELECT>
<BUTTON class="Buttontext"  style="height:25px;width :60px;"  id="Add" NAME="Add"  OnClick="fnAddDb()">Add</BUTTON>
</div>  

<div style="display:none"> 
<INPUT type="text" name="VALIDATE_EXPR" id="VALIDATE_EXPR" value="">
<textarea rows="15" cols="90" style="border:1px solid #a2c2e5; " id="textvalue" name="textvalue" title="Expresion Builder"></textarea> 
</div>

</fieldset> 
<fieldset class="FSTstd">
<legend>Operators</legend> 
 
 
<div class="DIVText">
<LABEL class="LBLstd" for="SYSTEM_OPERATORS">Operator</LABEL>
<SELECT aria-required="true" width="200" style="width:200px" class="SELstd" name="SYSTEM_PARAMETERS" id="SYSTEM_PARAMETERS" value="" >
	     <option value=""></option>
         <option value="AND">AND</option>
		 <option value="OR">OR</option> 
		 <option value="(">(</option> 
		 <option value=")">)</option>   
</SELECT>
<BUTTON class="Buttontext"  style="height:25px;width :60px;"  id="Add" NAME="Add"  OnClick="fnAddGl()">Add</BUTTON> 
</div>  

</fieldset> 
 
</div>
<!--End of Form fields column one-->
 
</div>   

<div id="SummButtons" style="margin-left:300px;padding-top:10px;">  
		<BUTTON class="BTNfooter"  style="height:25px;width :60px;"  ID="Reset" NAME="Reset" OnClick="fnReset()">Reset</BUTTON>
	    <BUTTON class="BTNfooter"  style="height:25px;width :60px;"  ID="Redo" NAME="Redo" OnClick="fnundo()">Undo</BUTTON>
</div>

<div id="ResTree" class="DIVTwoColLyt" style="width:100%; "  align="center">
<div style="height:350px;width:100%; padding-top:20px;" align="center">
<textarea rows="15" cols="90" style="border:1px solid #a2c2e5; " id="textvalue1" name="textvalue1" readonly="yes" title="Expresion Builder"></textarea> 
<div style="text-align:right; margin-top:10px;padding-right:34px; clear:both">
<BUTTON class="BTNfooter" name="OK"  id="ok" onclick="fnSaveData(event);" style="visibility:visible;height:25px;width :35px;">Ok</BUTTON>&nbsp;
<BUTTON class="BTNfooter" id="Cancel" onclick="fnRADExitSub('ChildWin', event);" style="height:25px;width :60px;">Cancel</BUTTON>
</div>
</div>
</div> 

</div>  
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body> 
</html>