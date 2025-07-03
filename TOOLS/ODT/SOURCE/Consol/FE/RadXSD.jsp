<!--
  **
  **
  ** File Name  : RadXSD.jsp
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
		<script type="text/javascript" src="Script/JS/RADReadWriteFiles.js"></script>
        <script type="text/javascript" src="Script/JS/RadUtil.js"></script>
		<script type="text/javascript" src="Script/JS/RadLovHandler.js"></script>
        <script type="text/javascript" src="Script/JS/RadXsd.js"></script>
        <script type="text/javascript" src="Script/JS/RadMultipleTables.js"></script>
		<script type="text/javascript" src="Script/JS/Extensible.js"></script>
		<script type="text/javascript" src="Script/JS/RadInfraAccess.js"></script>
		<script type="text/javascript" >
		         var g_scrType ="M";      
				 var scrht = 692;
			     var scrwdt= 840;		 
                var loadxmldata = "";        
                 var mainWin  = parent;   
				 var xmlFileList = "";
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
<body class="BODYDetails" style="background-color:#ffffff" onkeydown="return shortcut(event)" onload="fnLoad();getSchemadetails();fnconto();">
<div class="WNDcontainer" id="DIVWNDContainer"> 
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"> <h1 class="WNDtitletxt">Web Service Units Generation</h1>
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

<div   class="Subcontainer" TYPE="SINGLE" name="WS_HEADER" id="WS_HEADER">

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 
 
<div class="DIVText">
<LABEL class="LBLstd" for="CONNECT_TO">Connect to</LABEL> 
<SELECT aria-required="false" class="SELstd" type="text" name="CONNECT_TO" id="CONNECT_TO" onchange="fnconto();">
	<option value="F">Flexcube</option> 
	<option value="T">Trax</option>
</SELECT>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="SERVICE_NAME">Service Name</LABEL>
<INPUT aria-required="false"  type="text"  id="SERVICE_NAME" name="SERVICE_NAME" value=""  size="35">
<BUTTON class="BTNimg" title="List Of Values" tabindex="-1" onclick="fnlov(event);"><span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="SERVICE_DESC">Service Description</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="SERVICE_DESC" name="SERVICE_DESC" value=""  size="35">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1"   onclick="popupedit('WS_HEADER','SERVICE_DESC',2,event)"><span class="ICOnarrative"></span></BUTTON>
</div>
  
	 
<div class="DIVText">
<LABEL class="LBLstd" for="TYPE_SYSTEM">Type System</LABEL>
<SELECT aria-required="false"  class="SELstd" name="TYPE_SYSTEM" id="TYPE_SYSTEM" >
		<option value="S">Strong</option> 
		<option value="W">Weak</option>
</SELECT>
</div> 

<div class="DIVText" >
<LABEL class="LBLstd" for="XSD_PATH">XSD Path</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="XSD_PATH" name="XSD_PATH" value=""  size="35">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1"  id="XSD_PATH1" name="XSD_PATH1" onclick="popupedit('WS_HEADER','XSD_PATH',2,event)"><span class="ICOnarrative"></span></BUTTON>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="SOAP_FAULT">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="SOAP_FAULT" id="SOAP_FAULT">SOAP Fault</LABEL>
</div>
</div>
  
</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" > 

<div class="DIVText" >
<LABEL class="LBLstd" for="XELEASE_NAME">Release Code</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="XELEASE_NAME" name="XELEASE_NAME" value=""  size="35">
<BUTTON class="BTNimg" title="List Of Values" tabindex="-1" style="visibility:hidden" id="BTN_XELEASE_NAME" onclick="deleteAll('XSDGEN');LOV_XREL_CODE.show_lov('XELEASE_NAME~TYPE_SYSTEM~','frmTCM','', 'Release Code', 'Release Code~Type System', 'Release Code~Type System',event);"><span class="ICOlov"></span></BUTTON>
</div>


<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="CONFIG_FILES">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="CONFIG_FILES" id="CONFIG_FILES">Config Files</LABEL>
</div>
</div>


<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="WSDL_FILE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="WSDL_FILE" id="WSDL_FILE">Wsdl File</LABEL>
</div>
</div>


<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="IMPL_FILE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="IMPL_FILE" id="IMPL_FILE">Impl File</LABEL>
</div>
</div>

<div class="DIVText"  style="display:none">      
<INPUT aria-required="false" name="LANG_CODE" id="LANG_CODE" style="visibility:hidden"></INPUT> 
<INPUT aria-required="false" type=hidden name="REALSE" id="REALSE" value=<%=ODTUtils.stripXSS(request.getParameter("title"))%> size=20> 
<INPUT aria-required="false" type=hidden name="TOOL" id="TOOL" value=<%=ODTUtils.stripXSS(request.getParameter("Tool"))%> size=20>
<INPUT aria-required="false"   style="visibility:hidden" type=text name="DEST_XML" id="DEST_XML" size=20 ></INPUT>
</div>

</fieldset>
<!--End of Form fields column two-->
</div>  
</div>   

<div class="DIVMultipleBig" style="position:relative; margin-left:20px; margin-right:20px;width:AUTO;">
		<div class="MEButtons">
			<BUTTON class="Buttontext" title="Validate" onclick="fn_validate_xsd();" name="VALIDT" value="VALIDT" style="visibility:hidden;height:20px;width:50px;">Validate</BUTTON>&nbsp;        
			<BUTTON class="Buttontext" title="Populate" onclick="fn_populate_xsd();" name="POPLT" value="POPLT" style="height:20px;width :50px;">Populate</BUTTON>&nbsp;        
			<BUTTON class="BUTTONInline" title="Remove Row" name="DEL" value="DEL"  onclick="delRow('XSDGEN');xsddom();"><img src="Images/Delrow.gif" alt="Delete Row" ></BUTTON>&nbsp;&nbsp;
       </div> 
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:300px;"  >
			<table id="XSDGEN" name="XSDGEN" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			   <thead>
					<tr>
						<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('XSDGEN','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
						<th scope="col" class="THgrid" onclick="fnsorttable(1)"><span class="SPNtext">Operation Code</span></th>
						<th scope="col" class="THgrid" onclick="fnsorttable(2)"><span class="SPNtext">Operation Description</span></th> 
						<th scope="col" class="THgrid" onclick="fnsorttable(3)"><span class="SPNtext">Function ID</span></th>
						<th scope="col" class="THgrid" onclick="fnsorttable(4)"><span class="SPNtext">Action</span></th>  
					</tr>
				</thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>  
		<div style="float:right;padding-right:20px;padding-top:25px;">
			<BUTTON class="BTNfooter" style="height:25px;width:80px;"  name="OK"  id="ok"  onclick="fnGeneratexsd('XSDGEN')">Generate</BUTTON>
			<BUTTON  class="BTNfooter" name="Cls" style="width:60px;height:25px;" id="Cls" onclick="fnRADExitAll(seqNo, event)">Close</BUTTON>
		</div>
</div>
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>