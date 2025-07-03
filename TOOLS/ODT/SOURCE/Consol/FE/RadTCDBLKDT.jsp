<!--
  **
  **
  ** File Name  : RadTCDBLKDT.jsp
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
<%@page import="com.ofss.odt.util.ODTUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%
String title = ODTUtils.stripXSS(request.getParameter("title"));
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
		<title><%=title%></title>
		<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
		<script type="text/javascript" src="Script/JS/RadGlobals.js"></script>
        <script type="text/javascript" src="Script/JS/<%=js_Delta%>"></script>
		<script type="text/javascript" src="Script/JS/RadSelectColumns.js"></script>
		<script type="text/javascript" src="Script/JS/RadUIXMLGenerator.js"></script>
		<script type="text/javascript" src="Script/JS/RADReadWriteFiles.js"></script>
		<script type="text/javascript" src="Script/JS/RadSysfileCreation.js"></script>
		<script type="text/javascript" src="Script/JS/RadSmdradsc.js"></script>
      	<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
		<script type="text/javascript" src="Script/JS/RadBulkGenrator.js"></script>
		<script type="text/javascript" src="Script/JS/RadMultipleTables.js"></script>
		<script type="text/javascript" src="Script/JS/Extensible.js"></script>
		<script type="text/javascript" src="Script/JS/<%=js_ScrCorrection%>"></script>
		<script type="text/javascript" src="Script/JS/RadOrderCorrection.js"></script>
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
		  		
             function fnLoadRadXMLFORNONIE(p_funcId)
			  {
                  			   
				 xmlFileList = loadxmldata;	       
				  document.getElementsByName('FILE_SAVE_PATH')[0].value =p_funcId;				 
				 
			  }
</script>  
</head>
<body class="BODYDetails" style="background-color:#ffffff" onkeydown="return shortcut(event)" onload="fnLoad();getSchemadetails();fnSetMode('DEST_XML');fngetWriteMode('BULK')">
<div class="WNDcontainer" id="DIVWNDContainer">
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"> <h1 class="WNDtitletxt">Upload Block Details</h1>
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" id="header_Cls" onblur="this.className='WNDcls'" onmouseout="this.className='WNDcls'" title="Close" onclick="if(this.disabled) return false; fnRADExitAll(seqNo, event)">
					<span class="LBLinv">Close</span>
				</a>
				<a class="WNDmin" href="#nogo" id="header_Min" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="Minimize" onclick="fnMinimize(seqNo, event)">
					<span class="LBLinv">Minimize</span>
				</a>
			</div>
		</div>
	</div> 
<div   class="Subcontainer" TYPE="SINGLE" id="TCTM_BLOCK_DETAILS" NAME="TCTM_BLOCK_DETAILS" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText" >
<LABEL class="LBLstd" for="FILE_SAVE_PATH">Source File List</LABEL>
<INPUT aria-required="false" type="file" name ="DEST_XML" id ="DEST_XML"size="10" onchange="loadRADXMLData('DEST_XML')" style="display:none; position:absolute" disabled="true"/>                                      
<INPUT aria-required="false" class="TXTstd"  type="text" name="FILE_SAVE_PATH" id="FILE_SAVE_PATH" title="" value="" size="20" disabled="true" />                                        
<INPUT aria-required="false" type="button" name ="BROWSE" id ="BROWSE" value="BROWSE" onclick="loadBrowserXML(event)" style="visibility:hidden; position:absolute" disabled="true"/>
</div>


	 
<div class="DIVText">
<LABEL class="LBLstd" for="OLDNEW">Source Release Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="OLDNEW" id="OLDNEW" >
		<option value="BOTH">Both</option>
		<option value="NEW">Extensible</option>
		<option value="OLD">Non-Extensible</option> 
</SELECT>
</div> 

<div class="DIVText"  style="display:none">
<INPUT aria-required="false" type=hidden name="SOURCE_XML" id="SOURCE_XML" size=20 ></INPUT>  
<INPUT aria-required="false" name="LANG_CODE" id="LANG_CODE" style="visibility:hidden"></INPUT> 
<INPUT aria-required="false" type=hidden name="REALSE" id="REALSE" value=<%=title%> size=20> 
<INPUT aria-required="false" type=hidden name="TOOL" id="TOOL" value=<%=ODTUtils.stripXSS(request.getParameter("Tool"))%> size=20>  
</div> 
 
</fieldset>
<!--End of Form fields column two-->
</div>  
</div>  

<div class="DIVMultipleBig" style="position:relative; margin-left:20px; margin-right:20px;width:95%;">
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:400px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);" id="LOG" name="LOG" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			   <thead>
					<tr>
						<th scope="col" class="THgrid"><span class="SPNtext">Sl.No</span></th>
						<th scope="col" class="THgrid"><span class="SPNtext">File Name</span></th> 
						<th scope="col" class="THgrid"><span class="SPNtext">Sub Folder</span></th>
						<th scope="col" class="THgrid"><span class="SPNtext">File Status</span></th> 
						<th scope="col" class="THgrid"><span class="SPNtext">Error Description</span></th> 
					</tr>
				</thead>
			    <tbody></tbody>
			    <tfoot><tr><td id="LOG_TE" name="LOG_TE" scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>  
		<div style="float:right;padding-right:20px;padding-top:25px;">
			<BUTTON class="BTNimg" style="height:25px;width :70px;"  name="UPGRADE"  id="UPGRADE"  onclick="fnGenerateUtils('BLKUPD','LOG');">Upload</BUTTON>
			<BUTTON  class="BTNimg" name="Cls" style="width:60px;height:25px;" id="Cls" onclick="fnRADExitAll(seqNo, event)">Close</BUTTON>
		</div>
</div> 
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>  