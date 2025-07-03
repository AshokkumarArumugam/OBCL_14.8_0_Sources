<!--
  **
  **
  ** File Name  : RadViewExcel.jsp
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
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="com.ofss.odt.util.ODTUtils"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%
String js_parser ="";
String js_Delta = "";
String js_ScrCorrection = "";
boolean bowserVer  = false; 
String userAgent = request.getHeader("USER-AGENT").toUpperCase();
if(userAgent.contains("MSIE") || (userAgent.contains("TRIDENT") && userAgent.contains("RV"))) {//ie11 changes
    js_parser = "BROWSER_IE.js";
	js_Delta  = "RadDeltaHandler.js";
	js_ScrCorrection="RadScreenCorrection.js";
    bowserVer = true;
} else {
    js_parser = "BROWSER_NonIE.js";
	js_Delta  = "RadDeltaHandler_NonIE.js";
	js_ScrCorrection="RadScreenCorrection_NonIE.js";
}

%>

   <html lang="en" >
   <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
		<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>	 
		<title><%=ODTUtils.stripXSS(request.getParameter("title"))%></title>
		<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
		<script type="text/javascript" src="Script/JS/RadGlobals.js"></script>
        <script type="text/javascript" src="Script/JS/<%=js_Delta%>"></script>
		<script type="text/javascript" src="Script/JS/RADReadWriteFiles.js"></script>
		<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
        <script type="text/javascript" src="Script/JS/RadBulkGenrator.js"></script>
        <script type="text/javascript" src="Script/JS/RadHeader.js"></script>
	 	<script type="text/javascript" src="Script/JS/RadMultipleTables.js"></script>
		<script type="text/javascript" src="Script/JS/Extensible.js"></script>
		<script type="text/javascript" src="Script/JS/<%=js_ScrCorrection%>"></script>
		<script type="text/javascript" src="Script/JS/RadOrderCorrection.js"></script>
    <script type="text/javascript" src="Script/JS/RadChangeReport.js"></script>
	<script type="text/javascript" src="Script/JS/RadInfraAccess.js"></script>
        <script type="text/javascript" >
		         var g_scrType ="S";      
				 var scrht = (screen.availHeight/2)+200;
				 var scrwdt= (screen.availWidth/2)+250;				 
                 var loadxmldata = "";        
                 var mainWin  = parent;       
                 var seqNo  = parent.funcGenSeqNo;                 
                 window.frameElement.name = seqNo;
				 if(parent.document.getElementById("testwin"))
                 parent.document.getElementById("testwin").id = seqNo;      
                  var gen_gwinFuncId = parent.parent.gwinFuncId; 
				  
                function fnMouseDownEvents()
                {    
                    return true;
                }
            function fnLoad()
            {
                mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
                fnCalcHgt();
                document.getElementById("Cls").focus();         
            }
		  
			</script>  
     
     </head>
<body class="BODYDetails" style="background-color:#ffffff" onkeydown="return shortcut(event)" onload="fnLoad();fnSetMode('DEST_XML1');fnSetModeSrc('DEST_XML2');fngetWriteMode('BULK')">
<div class="WNDcontainer" id="DIVWNDContainer">
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"><h1 class="WNDtitletxt">View Changes Excel</h1>
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" id="header_Cls" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" onclick="if(this.disabled) return false; fnRADExitAll(seqNo, event)">
					<span class="LBLinv">Close</span>
				</a>
				<a class="WNDmin" href="#nogo" id="header_Min" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="Minimize" onclick="parent.fnMinimize(seqNo, event)">
					<span class="LBLinv">Minimize</span>
				</a>
			</div>
		</div>
	</div> 
<div   class="Subcontainer" id="RDDVWEXL_DETAILS" NAME="RDDVWEXL_DETAILS" TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne" style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText" >
<LABEL class="LBLstd" for="FILE_SAVE_PATH">Source File List</LABEL>
<INPUT aria-required="false" type="file" name ="DEST_XML1" id ="DEST_XML1"size="10" onchange="loadRADXMLData('DEST_XML1')" style="display:none;position:absolute" disabled="true"/>                                      
<INPUT aria-required="false" class="TXTstd"  type="text" name="FILE_SAVE_PATH" id="FILE_SAVE_PATH" title="" value="" size="20" disabled="true"/>                                        
<INPUT aria-required="false" type="button"  class="BTNfooter"  name ="BROWSE" id ="BROWSE" value="BROWSE" onclick="loadBrowserXML(event)" style="visibility:hidden; position:absolute" disabled="true"/>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="Comparison_Type">Comparison Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="Comparison_Type" id="Comparison_Type">
	<option value="FUNCTION_SPECIFIC">Same Function</option>
	<option value="PARENT_CHILD">Parent Child</option>
</SELECT>
</div>
	 
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt"> 
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="Data_source_cr" >
<INPUT aria-required="false" type="checkbox" class="CHKstd"  name ="Data_source_cr" id ="Data_source_cr" checked="true">Data source Changes</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt"> 
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="Data_blocks_cr" >
<INPUT aria-required="false" type="checkbox" class="CHKstd"  name ="Data_blocks_cr" id ="Data_blocks_cr" checked="true">Data Blocks Changes</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt"> 
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="Screen_cr" >
<INPUT aria-required="false" type="checkbox" class="CHKstd"  name="Screen_cr" id="Screen_cr" checked="true">Screen Changes</LABEL>
</div>
</div>
  
</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" > 

<div class="DIVText" >
<LABEL class="LBLstd" for="FILE_SAVE_PATH_SRC">Base  File List</LABEL>
<INPUT aria-required="false" type="file" name ="DEST_XML2" id ="DEST_XML2"size="10" onchange="loadRADXMLFilesSrc('DEST_XML2')" style="display:none;position:absolute" disabled="true"/>                                        
<INPUT aria-required="false" class="TXTstd" type="text" name="FILE_SAVE_PATH_SRC" id="FILE_SAVE_PATH_SRC" title="" value="" size="20" disabled="true" />                                        
<INPUT aria-required="false" type="button"  class="BTNfooter"  name ="BROWSE_SRC" id ="BROWSE_SRC" value="BROWSE" onclick="loadBrowserXML(event)" style="visibility:hidden; position:absolute" disabled="true"/>  
 </div> 

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt"> 
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="Lov_Changes" >
<INPUT aria-required="false" type="checkbox" class="CHKstd"  name ="Lov_Changes" id ="Lov_Changes" checked="true">Lov Changes</LABEL>
</div>
</div>		
 
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt"> 
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="Fieldset_cr" >
<INPUT aria-required="false" type="checkbox" class="CHKstd"  name ="Fieldset_cr" id ="Fieldset_cr" checked="true">Fieldset Changes</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt"> 
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="all_nodes_cr" >
<INPUT aria-required="false" type="checkbox" class="CHKstd"  name ="all_nodes_cr" id ="all_nodes_cr"   checked="true">Other Nodes Changes</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt"> 
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="Order_Changes" >
<INPUT aria-required="false" type="checkbox" class="CHKstd"  name ="Order_Changes" id ="Order_Changes"   >Order Changes</LABEL>
</div>
</div>

<div class="DIVText"  STYLE="display:none">
<INPUT aria-required="false" type=hidden name="SOURCE_XML" id="SOURCE_XML"></INPUT> 
<INPUT aria-required="false" name="LANG_CODE" id="LANG_CODE" ></INPUT> 
<INPUT aria-required="false" type=hidden name="REALSE" id="REALSE" value=<%=ODTUtils.stripXSS(request.getParameter("title"))%> > 
<INPUT aria-required="false" type=hidden name="TOOL" id="TOOL" value=<%=ODTUtils.stripXSS(request.getParameter("Tool"))%>> 
</div> 
 
</fieldset>
<!--End of Form fields column two-->
</div>  
</div>  

<div class="DIVMultipleBig" style="position:relative; margin-left:20px; margin-right:20px;width:95%;">
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:350px;overflow-x:hidden"  >
			<table id="changereport" name="changereport" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			   <thead>
					<tr>
						<th scope="col" class="THgrid"><span class="SPNtext">Sl.No</span></th>
						<th scope="col" class="THgrid"><span class="SPNtext">File Name</span></th> 
						<th scope="col" class="THgrid"><span class="SPNtext">File Status</span></th> 
						<th scope="col" class="THgrid"><span class="SPNtext">Error Description</span></th> 
					</tr>
				</thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>  
		<div style="float:right;padding-right:20px;padding-top:25px;">
			<BUTTON class="BTNfooter" style="height:25px;width:70px;"  name="BTN_RAD_COMPARE"  id="BTN_RAD_COMPARE"  onclick="fnGenChangeRpt()">Generate</BUTTON>
			<BUTTON class="BTNfooter" style="width:60px;height:25px;" id="Cls" name="Cls" onclick="fnRADExitAll(seqNo, event)">Close</BUTTON>
		</div>
</div> 
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html> 