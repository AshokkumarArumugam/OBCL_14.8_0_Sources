<!--
  **
  **
  ** File Name  : RadFilterExpression.jsp
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
var FlrRow="";
var prestr=""; 
var preqry=""; 
var undostr="";
var undoqry="";
function fncalstyle(){ 
parent.document.getElementById("IFCHILD").style.width="700px";
parent.document.getElementById("IFCHILD").style.height="600px"; 
}

 function funcPFfieldTables() {
 try{
 if(parent.parent.dom!=undefined)
var fndom=parent.parent.dom;
else
var fndom=parent.dom;
}
catch(e)
{
var fndom=parent.dom;
} 
    var tabnam = selectNodes(fndom, "//PURGE_TABLES/PURGE_TABLE/TABLE_NAME");
	var obj1=document.getElementById("TABLE_NAME");
    obj1.length = 0;
    addOption(obj1, "", "", true);
    for (var i = 0;i < tabnam.length;i++) {
        addOption(obj1, getNodeText(tabnam[i]), getNodeText(tabnam[i]), false);
    } 
	document.getElementById('VALIDATE_EXPR').value = parent.poptextvalueqry;
	document.getElementById('textvalue').value = parent.poptextvalue;
	prestr	= parent.poptextvalue;
	preqry  = parent.poptextvalueqry;
	document.getElementById('textvalue').readOnly =true;
	document.getElementById('Cancel').focus();
}

function addOption(obj, text, value, selected) {
    if (obj != null) {
        obj.options[obj.options.length] = new Option(text, value, false, selected);
    }
} 


function fnDefault_columns() {
 
		var tableName = document.getElementById("TABLE_NAME").value; 
		
    var queryString = "DEFAULT_COLUMNS";
	var WhereString = "WHERE TABLE_NAME ='" + tableName + "'";
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
    }
	
	var obj1=document.getElementById("COLUMN_NAME");
    obj1.length = 0; 
    addOption(obj1, "", "", true);
    for (var i = 0;i < multRec.length;i++) {
        addOption(obj1, multRec[i].split("~")[0], multRec[i], false);
	} 
    
}
function fnsetColumnValue()
{
var obj1=document.getElementById("COLUMN_NAME");
var obj2=document.getElementById("DATA_TYPE");

 var val1= obj1.value ;
 obj1.length = 0;
 obj2.length = 0;
	addOption(obj1, val1.split("~")[0], val1.split("~")[0], true);
	addOption(obj2, val1.split("~")[1], val1.split("~")[1], true);
}

function fnAddDb()
{ 
	fnsetprevdt();
	var tableName = document.getElementById("TABLE_NAME").value;  
	var columnName = document.getElementById("COLUMN_NAME").value;  
	var data_type = document.getElementById("DATA_TYPE").value;  
	var textvalue = document.getElementById("textvalue").value; 
	var textquer = document.getElementById("VALIDATE_EXPR").value; 
	var Stv="";
	var Stq=""
	if(tableName!="" && columnName!="")
	 Stv=tableName+"."+columnName; 
	if(tableName!="" && columnName!="" && data_type!="")
	{
	if(data_type=="NUMBER")
		Stq="100" 
	if(data_type=="DATE")
		Stq="TO_DATE('28-05-2012','DD-MM-YYYY')" 
	else
	Stq="('TEST')" 
	}
	if(Stv!="" && textvalue!="")
	document.getElementById("textvalue").value=textvalue+ "\n" +Stv;
	else if(Stv!="")
	document.getElementById("textvalue").value=Stv;
	if(Stq!="")	
	document.getElementById("VALIDATE_EXPR").value=textquer+Stq;
	fnResetflds();
}
function fnAddGl()
{ 
	fnsetprevdt();
	var Syparm = document.getElementById("SYSTEM_PARAMETERS").value; 
	var textvalue = document.getElementById("textvalue").value; 
	var textquer = document.getElementById("VALIDATE_EXPR").value; 
	var Stv="";
	var Stq="" 
	if(Syparm!=""){
	 Stv=Syparm;
		if(Syparm.indexOf("DATE")!= -1)
		Stq="TO_DATE('28-05-2012','DD-MM-YYYY')" 
		else
		Stq="('TEST')" 
		}
	if(Stv!="" && textvalue!="")
	document.getElementById("textvalue").value=textvalue+ "\n" +Stv;
	else if(Stv!="")
	document.getElementById("textvalue").value=Stv;
	if(Stq!="")	
	document.getElementById("VALIDATE_EXPR").value=textquer+Stq;
	fnResetflds();
}
function fnAddOp()
{ 
	fnsetprevdt();
	var Oper = document.getElementById("OPERATORS").value; 
	var textvalue = document.getElementById("textvalue").value; 
	var textquer = document.getElementById("VALIDATE_EXPR").value; 
	var textquer = document.getElementById("VALIDATE_EXPR").value; 
	var Stv="";
	if(Oper!="")
	 Stv=Oper; 
	if(Stv!="" && textvalue!="")
	document.getElementById("textvalue").value=textvalue+ "\n" +Stv;
	else if(Stv!="")
	document.getElementById("textvalue").value=Stv;
	document.getElementById("VALIDATE_EXPR").value=textquer+Stv;
	
	fnResetflds();
}
function fnReset()
{ 
 fnResetflds();
 document.getElementById("textvalue").value=""; 
document.getElementById("VALIDATE_EXPR").value=""; 
}
function fnResetflds()
{
 document.getElementById("TABLE_NAME").value = "";  
 document.getElementById("COLUMN_NAME").length = 0;
 document.getElementById("SYSTEM_PARAMETERS").value = "";  
 document.getElementById("OPERATORS").value="";   	
} 
function fnsetprevdt()
{
undostr=document.getElementById("textvalue").value;
undoqry=document.getElementById("VALIDATE_EXPR").value;

}

function fnundo()
{
document.getElementById("textvalue").value=undostr;
document.getElementById("VALIDATE_EXPR").value=undoqry;
}
function fnLoadData()
{
funcPFfieldTables();
} 

function fnSave_filter(event)
{  
fnRADExitSub('ChildWin', event)
}

function fnSaveData(event)
{
if(prestr!=document.getElementById('textvalue').value)
{
var qury=document.getElementById('VALIDATE_EXPR').value; 
  var queryString = "SELECT "+qury+" FROM DUAL";
  var WhereString=queryString;
	top.parent.gReqCode = 'UICONTROLLER';
    top.parent.gReqType = "APP";
    var radReqDOM = top.parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), "EMPTY");
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
parent.popTextObj.value=document.getElementById('textvalue').value;
parent.popTextObjqry.value=document.getElementById('VALIDATE_EXPR').value;
parent.popTextObj.focus();
 fnRADExitSub('ChildWin', event)      		 
}
			
</script>
</head>
<body  onload="fncalstyle();fnLoadData()" onkeydown="fnAccessChildScreens(event)">
 <div id="DIVWNDContainer1">
  <div class="WNDtitlebar" id="WNDtitlebar" >
	<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Filter Expression</h1>                                      
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
<legend>Table Columns</legend> 

<div class="DIVText">
<LABEL class="LBLstd" for="TABLE_NAME">Table Name</LABEL>
<SELECT aria-required="true" width="200" style="width:200px" class="SELstd"  type="text" name="TABLE_NAME" id="TABLE_NAME" value="" onchange="fnDefault_columns()">
<option></option>
</SELECT>
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="COLUMN_NAME">Column Name</LABEL>
<SELECT aria-required="true"  width="200" style="width:200px" class="SELstd"  type="text" name="COLUMN_NAME" id="COLUMN_NAME" onchange="fnsetColumnValue();" value="">
<option></option> 
</SELECT>
 <BUTTON class="Buttontext"  style="height:25px;width :60px;"  id="Add" NAME="Add"  OnClick="fnAddDb()">Add</BUTTON>
</div>

<div style="display:none">
<SELECT aria-required="true"  width="200" style="width:200px" class="SELstd"  type="text" name="DATA_TYPE" id="DATA_TYPE" value="">
<option></option> 
</SELECT>
<INPUT type="text" name="VALIDATE_EXPR" id="VALIDATE_EXPR" value="">
</div> 

</fieldset> 
<fieldset class="FSTstd">
<legend>System Parameters</legend> 
 
 
 <div class="DIVText">
<LABEL class="LBLstd" for="SYSTEM_PARAMETERS">Parameters</LABEL>
<SELECT aria-required="true" width="200" style="width:200px" class="SELstd" name="SYSTEM_PARAMETERS" id="SYSTEM_PARAMETERS" value="" >
	     <option value=""></option>
         <option value="SYSDATE">SYSDATE</option>
		 <option value="GLOBAL.APPLICATION_DATE">Application Date</option> 
		 <option value="GLOBAL.CURRENT_BRANCH">Current Branch</option> 
		 <option value="GLOBAL.LANG">Local Language</option> 
		 <option value="GLOBAL.LCY">Local Currency</option> 
         <option value="GLOBAL.USER_ID">Current User</option>
		 <option value="GLOBAL.HEAD_OFFICE">Head Office Branch</option>  
</SELECT>
<BUTTON class="Buttontext"  style="height:25px;width :60px;"  id="Add" NAME="Add"  OnClick="fnAddGl()">Add</BUTTON> 
</div>  

</fieldset>
 
	<fieldset class="FSTstd">
<legend>Operators</legend> 
 
<div class="DIVText">
<LABEL class="LBLstd" for="OPERATORS">Operators</LABEL>
<SELECT aria-required="true" width="200" style="width:200px" class="SELstd" name="OPERATORS" id="OPERATORS" value="" >
	     <option value=""></option>
         <option value="+">+</option>
		 <option value="-">-</option> 
		 <option value="*">*</option> 
		 <option value="/">/</option> 
		 <option value="%">%</option> 
         <option value="NVL">NVL</option>
		 <option value="(">(</option> 
		 <option value=")">)</option> 
		 <option value=",">,</option>
</SELECT>
<BUTTON class="Buttontext"  style="height:25px;width :60px;"  id="Add" NAME="Add"  OnClick="fnAddOp()">Add</BUTTON> 
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
<textarea rows="15" cols="90" style="border:1px solid #a2c2e5; " id="textvalue" name="textvalue" readonly="yes" title="Expresion Builder"></textarea>
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
        