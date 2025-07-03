<!--
  **
  **
  ** File Name  : RadTableDetails.jsp
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
<%@page import="com.ofss.odt.util.ODTUtils"%>
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
var FlrRow = "";
  var tblname = "";

  function fncalstyle() {
      parent.document.getElementById("IFCHILD").style.width = "600px";
      parent.document.getElementById("IFCHILD").style.height = "400px";
  }

  function fnTbl_Det(rind, tabln) {
     FlrRow = rind;
      tblname = tabln;
      var tabp = parent.document.getElementById(tabln).tBodies[0].rows[FlrRow];
      var tbl_nm = tabp.cells[1].getElementsByTagName('INPUT')[0].value;
      var master = tabp.cells[2].getElementsByTagName('INPUT')[0].checked;
      var parent_t = tabp.cells[3].getElementsByTagName('SELECT')[0].value;
      var chldjoin = tabp.cells[4].getElementsByTagName('INPUT')[0].value;
      var keyflds = tabp.cells[5].getElementsByTagName('INPUT')[0].value;
      var datatype = tabp.cells[6].getElementsByTagName('INPUT')[0].value;
      var A_N_rqd = tabp.cells[7].getElementsByTagName('INPUT')[0].checked;
      var E_prge = tabp.cells[8].getElementsByTagName('INPUT')[0].checked;
	  if(E_prge)
	  tabp.cells[12].getElementsByTagName('INPUT')[0].value="";
      var History_name = tabp.cells[12].getElementsByTagName('INPUT')[0].value;

      document.getElementById("TABLE_NAME").value = tbl_nm;
      document.getElementById("MASTER").checked = master;
      document.getElementById("PARENT").value = parent_t;
      document.getElementById("CHILD_JOIN").value = chldjoin;
      document.getElementById("KEY_FIELDS").value = keyflds;
      document.getElementById("DATA_TYPE").value = datatype;
      document.getElementById("ARCHIVE_NOT_REQD").checked = A_N_rqd;
      document.getElementById("EXCLUDE_PURGE").checked = E_prge;
	  document.getElementById("HISTORY_NAME").value = History_name;


      document.getElementById("Cancel").focus();
  }

  function addOption(obj, text, value, selected) {
      if (obj != null) {
          obj.options[obj.options.length] = new Option(text, value, false, selected);
      }
  }

  function fn_Default(){
  var tbln=document.getElementById("TABLE_NAME").value ;  
var suffix=getNodeText(selectSingleNode(parent.dom, "//PURGE_PREFERENCES/ARCHIVE_TABLE_SUFFIX"));
 var history_name=tbln+"_"+suffix;
 
 if(history_name.length>26)
 {
 var len=history_name.length-26;
 tbln=tbln.substring(0,tbln.length-len+1);
 }
  history_name=tbln+"_"+suffix;
	document.getElementById("HISTORY_NAME").value=history_name;
  
  }
  function fn_Archive(){ 
	  if(document.getElementById("ARCHIVE_NOT_REQD").checked)
	  {
	  document.getElementById("HISTORY_NAME").value = "";
	   document.getElementById("HISTORY_NAME").className="TXTro" 
	   document.getElementById("HISTORY_NAME").disabled=true; 
	   document.getElementById("Default").disabled=true; 
      }
	  else
	  {
			 document.getElementById("HISTORY_NAME").className="TXTstd" 
			 document.getElementById("HISTORY_NAME").disabled=false; 
			 document.getElementById("Default").disabled=false; 
	  }
  
  }

  function fnSave_Table(event) {
      var tbl_nm = document.getElementById("TABLE_NAME").value;
      var master = document.getElementById("MASTER").checked;
      var parent_t = document.getElementById("PARENT").value;
      var chldjoin = document.getElementById("CHILD_JOIN").value;
      var keyflds = document.getElementById("KEY_FIELDS").value;
      var datatype = document.getElementById("DATA_TYPE").value;
      var A_N_rqd = document.getElementById("ARCHIVE_NOT_REQD").checked;
      var E_prge = document.getElementById("EXCLUDE_PURGE").checked;
	  var History_name = document.getElementById("HISTORY_NAME").value;

      var tabp = parent.document.getElementById(tblname).tBodies[0].rows[FlrRow];

      tabp.cells[1].getElementsByTagName('INPUT')[0].value = tbl_nm;
      tabp.cells[2].getElementsByTagName('INPUT')[0].checked = master;
      tabp.cells[3].getElementsByTagName('SELECT')[0].value = parent_t;
      tabp.cells[4].getElementsByTagName('INPUT')[0].value = chldjoin;
      tabp.cells[5].getElementsByTagName('INPUT')[0].value = keyflds;
      tabp.cells[6].getElementsByTagName('INPUT')[0].value = datatype;
      tabp.cells[7].getElementsByTagName('INPUT')[0].checked = A_N_rqd;
      tabp.cells[8].getElementsByTagName('INPUT')[0].checked = E_prge;
	  tabp.cells[12].getElementsByTagName('INPUT')[0].value = History_name;

      fnRADExitSub('ChildWin', event);
  }
			
</script>
</head>
<body  onload="fncalstyle();fnTbl_Det('<%=ODTUtils.stripXSS(request.getParameter("rowindex"))%>', '<%=ODTUtils.stripXSS(request.getParameter("tabl"))%>')" onkeydown="fnAccessChildScreens(event)">
 <div id="DIVWNDContainer1">
  <div class="WNDtitlebar" id="WNDtitlebar" >
	<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Table Details</h1>                                      
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
<LABEL class="LBLstd star" for="TABLE_NAME">Table Name</LABEL>
<INPUT aria-required="true" class="TXTro"  readonly type="text" name="TABLE_NAME" id="TABLE_NAME" value="" size="40">
</div> 

<div class="DIVText">
<LABEL class="LBLstd star" for="MASTER">Master</LABEL>
<INPUT aria-required="true" class="TXTstd" type="checkbox" name="MASTER" id="MASTER" value="" size="40">
</div> 

<div class="DIVText">
<LABEL class="LBLstd star" for="PARENT">Parent</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" name="PARENT" id="PARENT" value="" size="40">
</div> 

<div class="DIVText">
<LABEL class="LBLstd star" for="CHILD_JOIN">Relation With Parent</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" name="CHILD_JOIN" id="CHILD_JOIN" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('LOVMAIN','CHILD_JOIN','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div> 

<div class="DIVText">
<LABEL class="LBLstd star" for="KEY_FIELDS">Key Fields</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" name="KEY_FIELDS" id="KEY_FIELDS" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('LOVMAIN','KEY_FIELDS','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div> 

<div class="DIVText">
<LABEL class="LBLstd star" for="DATA_TYPE">Key Field Data Types</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" name="DATA_TYPE" id="DATA_TYPE" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('LOVMAIN','DATA_TYPE','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div> 

<div class="DIVText">
<LABEL class="LBLstd star" for="ARCHIVE_NOT_REQD">Archiving Not Required</LABEL>
<INPUT aria-required="true" class="TXTstd" type="checkbox" name="ARCHIVE_NOT_REQD" id="ARCHIVE_NOT_REQD" onclick="fn_Archive()" value="" size="40">
</div> 

<div class="DIVText">
<LABEL class="LBLstd star" for="HISTORY_NAME">History Table Name</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" name="HISTORY_NAME" id="HISTORY_NAME" value="" size="40">
<BUTTON class="BTNfooter" name="Default"  id="Default" onclick="fn_Default()" style="visibility:visible;height:25px;width:20px;">D</BUTTON>
</div> 
 
<div class="DIVText">
<LABEL class="LBLstd" for="EXCLUDE_PURGE">Exclude from Purging</LABEL>
<INPUT aria-required="true" class="TXTstd" type="checkbox" name="EXCLUDE_PURGE" id="EXCLUDE_PURGE" value="" size="40">
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
	<BUTTON class="BTNfooter" name="OK"  id="ok" onclick="fnSave_Table(event)" style="visibility:visible;height:25px;width :35px;">Ok</BUTTON>
	<BUTTON class="BTNfooter" id="Cancel" name="Cancel" onclick="fnRADExitSub('ChildWin', event)"  style="height:25px;width :60px;">Cancel</BUTTON>
</div>
 
</div>  
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body> 
</html> 
        