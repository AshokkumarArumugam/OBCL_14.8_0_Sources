<!--
  **
  **
  ** File Name  : RadAddBlockfields.jsp
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
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
<head><title>DataBlock</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
		<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>	 
		
		<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
		<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
		<script type="text/javascript" src="Script/JS/RadValidations.js" ></script>
		<script type="text/javascript" src="Script/JS/RadUIUtils.js" ></script>
		<script type="text/javascript" src="Script/JS/RadSelectBlockFields.js" ></script> 
		<script type="text/javascript" src="Script/JS/RadAccessibility.js" ></script>
		<script type="text/javascript"> 
function fnInValues(){     
parent.document.getElementById("IFCHILD").style.width="650px";
parent.document.getElementById("IFCHILD").style.height="600px";
Populatexml('DATASRC_NAME');
document.getElementById("Cancel").focus(); 
}
function FnShowTabs(divid)
{
FnShowDbUiTabs(divid);
}
			 	
         
	function FnShowDbUiTabs(divid) {    
        var tablist = "DIV_BLOCK_FIELDS~DIV_UI_FIELDS";
		tablist=tablist.split('~');
		for(var i =0;i<tablist.length;i++)
		{
			document.getElementById(tablist[i]).style.display = "none";
			document.getElementsByName("TAB_"+tablist[i])[0].style.borderBottom="1px solid #fff";
			document.getElementsByName("TAB_"+tablist[i])[0].style.background="url(Images/Flexblue/RTabLeft.gif) no-repeat left top";
			document.getElementsByName("SP_"+tablist[i])[0].style.background="url(Images/Flexblue/RTabRight.gif) no-repeat right top";
		}
			document.getElementById(divid).style.display = "block";
			document.getElementsByName("TAB_"+divid)[0].style.borderBottom="1px solid #fff";
			document.getElementsByName("TAB_"+divid)[0].style.background="url(Images/Flexblue/RTabSLeft.gif) no-repeat left top";
			document.getElementsByName("SP_"+divid)[0].style.background="url(Images/Flexblue/RTabSRight.gif) no-repeat right top";
 
    }
 
	 function fieldvalidation(event)
	 {
          
		var tableObjectdbfield =  document.getElementById('blkfldTable');
		var rowslengthdbfield =tableObjectdbfield.tBodies[0].rows.length;
		var tableObjectuifield =  document.getElementById('BlkUIfldTable');
		var rowslengthUifield =tableObjectuifield.tBodies[0].rows.length;
		var columnName="";
		var columnui="";
		var fieldflag=0;
				  for(var i=0;i<rowslengthdbfield;i++)
							  {
								  for(var j=0;j<rowslengthUifield;j++)
								  {

										columnName = tableObjectdbfield.tBodies[0].rows[i].cells[2].getElementsByTagName("INPUT")[0].value.toUpperCase();
										columnui= tableObjectuifield.tBodies[0].rows[j].cells[1].getElementsByTagName("INPUT")[0].value;
										if(columnName==columnui)
											  {
												  fieldflag=1;
												  alertMessage("Field Already Exist in db and ui fileds ","I");
												  return false;
											  
											  }
								  }
							  }

		if(fieldflag!=1)
		 { 
			closeWindow();
			if(rowslengthUifield>=1)addFieldsUI();
			fnRADExitSub('ChildWin', event);
		 }
	 }
         </script>
</head>
<body  onload="fnInValues();FnShowDbUiTabs('DIV_BLOCK_FIELDS');" onkeydown="fnAccessChildScreens(event)" >
<div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle"  onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Select Fields & Add UI Fields </h1>                                      
            <div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
        </div>
</div>
 
<div class="DIVtab" name="DBBUTTONS" id="DBBUTTONS">
    <ul id="tablist">
        <li id="li_dbfields"><a class="Htaball"id="TAB_DIV_BLOCK_FIELDS" name="TAB_DIV_BLOCK_FIELDS" href="#nogo" onClick="FnShowTabs('DIV_BLOCK_FIELDS');"><span id="SP_DIV_BLOCK_FIELDS" name="SP_DIV_BLOCK_FIELDS">DataSource fields</span></a></li>
        <li id="li_Uifields"><a class="Htaball" id="TAB_DIV_UI_FIELDS"  name="TAB_DIV_UI_FIELDS"  href="#nogo" onClick="FnShowTabs('DIV_UI_FIELDS');"><span id="SP_DIV_UI_FIELDS" name ="SP_DIV_UI_FIELDS">UI Fields</span></a></li>
    </ul>
</div> 

<div class="DIVTabPageContent">
<div id="DIV_BLOCK_FIELDS" name="DIV_BLOCK_FIELDS" class="DIVMultipleBig" style="margin-left:20px;margin-right:20px;margin-top:0px;padding-top:0px;position:relative;">
	<div class="DIVmultiplebox">
		<div    class="Subcontainer" TYPE="SINGLE" >
         <!--Form fields column one-->
         <div class="DIVColumnOne"  style="width:100%">
         <fieldset class="FSTcell"> 
         
         <div class="DIVText">
		<LABEL class="LBLstd" for="DATASRC_NAME">Datasource</LABEL>
		<SELECT aria-required="false"    class="SELstd" name="DATASRC_NAME" id="DATASRC_NAME"  onchange="Populatefileds('')">
		</SELECT>
		</div>
		 
         </fieldset>
         </div>
         <!--End of Form fields column one-->
          
		</div>  
		<div class="DIVMultipleBigInner" style="float:left;height:350px;width:548px; border:1px solid #adcbfb;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);" id="blkfldTable" name="blkfldTable" summary="Multi Tenor" width="100%" TYPE="MULTIPLE"  class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('blkfldTable','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid" onclick="fnsorttable(1,'blkfldTable')"><span class="SPNtext">Column Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Field Name</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Label Code</span></th> 
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div> 
	</div>	
</div>
 
		   
<div id="DIV_UI_FIELDS"  name="DIV_UI_FIELDS"  class="DIVMultipleBig" style="margin-left:20px;margin-right:20px;margin-top:20px;padding-top:0px;position:relative;;width:90%">
	<div class="DIVmultiplebox" >
		<div class="MEButtons">
			<BUTTON class="BTNimg" title="Add Row" name="ADD" value="ADD" onclick="addNewRow('BlkUIfldTable');"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
			<BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL" onclick="delRow('BlkUIfldTable');"><img src="Images/Delrow.gif" alt="Delete Row"></BUTTON>
		</div>
		<div class="DIVMultipleBigInner" style="height:350px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);" id="BlkUIfldTable" name="BlkUIfldTable" summary="Multi Tenor" width="100%" TYPE="MULTIPLE"  class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_UIF" name="SEL_ALL_UIF" class="CHKstd" type="checkbox" onclick="checkAll('BlkUIfldTable','checkgroup','SEL_ALL_UIF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Field Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Data Type</span></th>  
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div> 
	</div>
</div> 

<div style="text-align:right; margin-top:10px; clear:both">
			<BUTTON class="BTNfooter" name="OK"  id="ok"onclick="fieldvalidation(event);"  style="height:25px;width:35px;">Ok</BUTTON>
			<BUTTON class="BTNfooter" id="Cancel" NAME="Cancel" onclick="fnRADExitSub('ChildWin', event);" style="height:25px;width :60px;">Cancel</BUTTON>
</div> 
</div>
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>
