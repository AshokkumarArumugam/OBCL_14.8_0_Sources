<!--
  **
  **
  ** File Name  : RadUIXmlGen.jsp
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
		<script type="text/javascript" src="Script/JS/RadSelectColumns.js"></script>
        <script type="text/javascript" src="Script/JS/RadGlobals.js"></script>
        <script type="text/javascript" src="Script/JS/<%=js_Delta%>"></script>
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
		         var g_scrType ="M"; 
                 var bulkreadstatus="N";				 
				 var scrht = 800;
				 var scrwdt= 1000;				 
                 var loadxmldata = "";        
                 var mainWin  = parent;   
				 var xmlFileList = "";
                 var seqNo  = parent.funcGenSeqNo;                 
                 window.frameElement.name = seqNo;
				 if(parent.document.getElementById("testwin"))
                 parent.document.getElementById("testwin").id = seqNo;      
                 var gen_gwinFuncId = parent.parent.gwinFuncId; 
				 
function fnMouseDownEvents() {
                    return true;
                }

function fnLoad() {
                mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
                fnCalcHgt();
				/* 
				document.getElementById("NOTIFICATION_TRIGGER").checked= false;
				document.getElementById("NOTIFICATION_TRIGGER").disabled= true;
				document.getElementById("NOTIFICATION_DETAILS").checked= false;
				document.getElementById("NOTIFICATION_DETAILS").disabled= true; 
				*/
                document.getElementById("Cls").focus();          
            }

function fnLoadRadXMLFORNONIE(p_funcId) {
    if (bulkreadstatus == "N") {
				 xmlFileList = loadxmldata;	       
				 document.getElementById('FILE_SAVE_PATH').value =p_funcId ;				 
				}
				else{
				NewDOM=loadxmldata;	  
				}
			  }
function FnDefaultoptions() {
if (parent.username == "VERCON") {
        document.getElementById("MAIN_SPC").checked = false;
        document.getElementById("MAIN_SQL").checked = false;
		     
    }

if(parent.username == "BUILDUSER"){
 document.getElementById("MAIN_SPC").checked = true;
 document.getElementById("MAIN_SQL").checked = true;

 document.getElementById("UIXML").checked = false;
 document.getElementById("SYS_JS").checked = false;

}
    var hokpkgs = "KERNEL_SPC~KERNEL_SQL~CLUSTER_SPC~CLUSTER_SQL~CUSTOM_SPC~CUSTOM_SQL~CUSTOMER_SPC~CUSTOMER_SQL".split("~");
    for (var i = 0;i < hokpkgs.length;i++) {
        document.getElementById(hokpkgs[i]).checked = false;
        document.getElementById(hokpkgs[i]).disabled = true; 
    }
    document.getElementById(parent.parent.relType + "_SPC").checked = false;
    document.getElementById(parent.parent.relType + "_SPC").disabled = false;
    document.getElementById(parent.parent.relType + "_SQL").checked = false;
    document.getElementById(parent.parent.relType + "_SQL").disabled = false;
}	     
			</script>  
     
     </head>
<body class="BODYDetails" style="background-color:#ffffff" onkeydown="return shortcut(event)" onload="fnLoad();getSchemadetails();fnSetMode('DEST_XML');fngetWriteMode('BULK');FnDefaultoptions()">
<div class="WNDcontainer" id="DIVWNDContainer">
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"><h1 class="WNDtitletxt">Bulk Generation</h1>
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" id="header_Cls" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" onclick="if(this.disabled) return false; fnRADExitAll(seqNo, event)">
					<span class="LBLinv">Close</span>
				</a>
				<a class="WNDmin" href="#nogo" id="header_Min" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="Minimize" onclick="fnMinimize(seqNo, event)">
					<span class="LBLinv">Minimize</span>
				</a>
			</div>
		</div>
	</div>

	<div   class="Subcontainer" TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText" >
<LABEL class="LBLstd" for="FILE_SAVE_PATH">Source File List</LABEL>
<INPUT aria-required="false" type="file" name ="DEST_XML" id ="DEST_XML"size="10" onchange="loadRADXMLData('DEST_XML')" style="display:none; position:absolute" disabled="true">                                      
<INPUT aria-required="false" class="TXTstd"  type="text" name="FILE_SAVE_PATH" id="FILE_SAVE_PATH" title="" value="" size="20" disabled="true">       
<INPUT aria-required="false" type="button" name ="BROWSE"  class="BTNfooter"  id ="BROWSE" value="BROWSE" onclick="loadBrowserXML(event)" style="visibility:hidden; position:absolute" disabled="true">
</div>
 
<div class="DIVText" >
<LABEL class="LBLstd" for="DATA_XML">Data XML Path</LABEL>
<INPUT aria-required="false" type="TXTstd" name ="DATA_XML" id ="DATA_XML">
</div> 


</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" > 

<div class="DIVText" >
<LABEL class="LBLstd" for="SOURCE_XML">Destination  Path</LABEL>
<INPUT aria-required="false" type="TXTstd" name ="SOURCE_XML" id ="SOURCE_XML">
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="OLDNEW">Source Files</LABEL>
<SELECT aria-required="false"   class="SELstd" name="OLDNEW" id="OLDNEW">
	<option value="BOTH">Both</option>
	<option value="NEW">Extensible</option>
	<option value="OLD">Non-Extensible</option>
</SELECT>
</div>			
  
<div class="DIVText"  Style="display:none">  
<INPUT aria-required="false" name="LANG_CODE" id="LANG_CODE" style="visibility:hidden"></INPUT>
<INPUT aria-required="false" type=hidden name="REALSE" id="REALSE" value=<%=ODTUtils.stripXSS(request.getParameter("title"))%> >
<INPUT aria-required="false" type=hidden name="TOOL" id="TOOL" value=<%=ODTUtils.stripXSS(request.getParameter("Tool"))%>> 
</div> 
 
</fieldset>
<!--End of Form fields column two-->
</div>  
</div>   

<div class="DIVMultipleBig"  style="width:95%;position:relative; margin-top:20px; margin-left:20px; margin-right:20px;" >
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="width:100%;overflow-x:hidden"  >
			<table role="presentation" width="100%" align="center" cellpadding="0" cellspacing="0" border="0">
					<thead>
			    	<tr>
						<th scope="col" class="THgrid" onclick="fnChkUnChkFlds('Front-End Files')"><span class="SPNtext">Front-End Files</span></th>
						<th scope="col" class="THgrid" onclick="fnChkUnChkFlds('System Packages')"><span class="SPNtext">System Packages</span></th>
						<th scope="col" class="THgrid" onclick="fnChkUnChkFlds('Hook Packages')"><span class="SPNtext">Hook Packages</span></th>
						<th scope="col" class="THgrid" colspan="2" onclick="fnChkUnChkFlds('Meta Data')"><span class="SPNtext">Meta Data</span></th>
						 <th scope="col" class="THgrid" onclick="fnChkUnChkFlds('Others')"><span class="SPNtext">Others</span></th>
					</tr>
					</thead>
					<tbody>
					<tr>
					    <td><INPUT aria-required="false" type="checkbox" id="RAD_XML" name="RAD_XML" disabled="disabled"><LABEL for="RAD_XML" id="LBL_RAD_XML">RadXML</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="MAIN_SPC" name="MAIN_SPC" ><LABEL for="MAIN_SPC" id="MAINSPC">Main Package Spec</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="KERNEL_SPC" name="KERNEL_SPC" ><LABEL for="KERNEL_SPC" id="KERNELSPC">Kernel Package Spec</LABEL></td>	
						<td><INPUT aria-required="false" type="checkbox" id="MENU_DETAILS" name="MENU_DETAILS" ><LABEL for="MENU_DETAILS" id="MENU_DETAILS">Menu Details</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="LABEL_DETAILS" name="LABEL_DETAILS" ><LABEL for="LABEL_DETAILS" id="LBL_DTLS" >Label Details</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="XSD_FILES" name="XSD_FILES" ><LABEL for="XSD_FILES" id="LBL_XSDS">Xsds</LABEL></td>
					</tr>
					<tr>
					    <td><INPUT aria-required="false" type="checkbox" id="UIXML" name="UIXML"  ><LABEL for="UIXML" id="LBL_UIXML">Screen Xml</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="MAIN_SQL" name="MAIN_SQL" ><LABEL for="MAIN_SQL" id="MAINSQL">Main Package Body</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="KERNEL_SQL" name="KERNEL_SQL" ><LABEL for="KERNEL_SQL" id="KERNELSQL">Kernel Package Body</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="DATASCR_DETAILS" name="DATASCR_DETAILS"><LABEL for="DATASCR_DETAILS" id="DATASCR_DETAILS_LBL">Datasource Details</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="BLOCK_PK_COLS" name="BLOCK_PK_COLS" ><LABEL for="BLOCK_PK_COLS" id="AUDIT_PKCOLLIST" >Block PK Columns</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="SCREEN_HTMLS" name="SCREEN_HTMLS" ><LABEL for="SCREEN_HTMLS" id="LBL_HTML">Screen Html</LABEL></td>
					</tr>
					<tr>
						<td><INPUT aria-required="false" type="checkbox" id="SYS_JS" name="SYS_JS" ><LABEL for="SYS_JS" id="SYS_JS">System JS</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="NOTIFICATION_TRIGGER" name="NOTIFICATION_TRIGGER" ><LABEL for="NOTIFICATION_TRIGGER" id="NOTIFICATIONTRIGGER">Notification Triggers</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="CLUSTER_SPC" name="CLUSTER_SPC" ><LABEL for="CLUSTER_SPC" id="CLUSTERSPC">Cluster Package Spec</LABEL></td>						
						<td><INPUT aria-required="false" type="checkbox" id="LOV_DETAILS" name="LOV_DETAILS" ><LABEL for="LOV_DETAILS" id="LOV_DTLS">LOV Details</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="FUNCTION_CALL_FORMS" name="FUNCTION_CALL_FORMS" ><LABEL for="FUNCTION_CALL_FORMS" id="FUNCTION_CALLFORMS">Function Call Forms</LABEL></td>
						<td style="visibility:hidden"><INPUT aria-required="false" type="checkbox" id="EXCEL_TEMPLATE" name="EXCEL_TEMPLATE"  ><LABEL for="EXCEL_TEMPLATE" id="XLS">Upload Templates</LABEL></td>		
					</tr>
					<tr>
					    <td>&nbsp;</td>
						<td><INPUT aria-required="false" type="checkbox" id="UPLOAD_SPC" name="UPLOAD_SPC" ><LABEL for="UPLOAD_SPC" id="UPLOADSPC">Upload Package Spec</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="CLUSTER_SQL" name="CLUSTER_SQL" ><LABEL for="CLUSTER_SQL" id="CLUSTER_SQL">Cluster Package Body</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="BLOCK_DETAILS" name="BLOCK_DETAILS" ><LABEL for="BLOCK_DETAILS" id="BLK_DTLS">Block Details</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="GATEWAY_DETAILS" name="GATEWAY_DETAILS" ><LABEL for="GATEWAY_DETAILS" id="GATEWAY_DETAILS_LBL">Gateway Details</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="UPLOAD_TRIGGER" name="UPLOAD_TRIGGER" ><LABEL for="UPLOAD_TRIGGER" id="UPLOADTRIGGER">Upload Table Trigger</LABEL></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><INPUT aria-required="false" type="checkbox" id="UPLOAD_SQL" name="UPLOAD_SQL" ><LABEL for="UPLOAD_SQL" id="UPLOADSQL">Upload Package Body</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="CUSTOM_SPC" name="CUSTOM_SPC" ><LABEL for="CUSTOM_SPC" id="CUSTOMSPC">Custom Package Spec</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="SCREEN_DETAILS" name="SCREEN_DETAILS" ><LABEL for="SCREEN_DETAILS" id="SCR_DTLS">Screen Details</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="NOTIFICATION_DETAILS" name="NOTIFICATION_DETAILS" ><LABEL for="NOTIFICATION_DETAILS" id="LBL_NTFY_DTLS">Notification Details</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="UPLOAD_TABLE_DDL" name="UPLOAD_TABLE_DDL" ><LABEL for="UPLOAD_TABLE_DDL" id="UPLOADTABLEDDL">Upload Tables Definition</LABEL></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><INPUT aria-required="false" type="checkbox" id="JAVA_CLASSES" name="JAVA_CLASSES" ><LABEL for="JAVA_CLASSES" id="JAVA_CLASSES">Java Classes</LABEL></td>
					    <td><INPUT aria-required="false" type="checkbox" id="CUSTOM_SQL" name="CUSTOM_SQL"><LABEL for="CUSTOM_SQL" id="CUSTOMSQL">Custom Package Body</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="AMEND_DETAILS" name="AMEND_DETAILS" ><LABEL for="AMEND_DETAILS" id="AMEND_DTLS">Amendable Details</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="FUNCTION_PARAMETERS" name="FUNCTION_PARAMETERS" ><LABEL for="FUNCTION_PARAMETERS" id="LBL_FUNC_PRMTRS">Function Parameters</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="ARCHIVE_TBL_DEF" name="ARCHIVE_TBL_DEF" ><LABEL for="ARCHIVE_TBL_DEF" id="LBL_ARCHIVE_TBL_DEF">Archive Table Definition</LABEL></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<!-- <td><INPUT aria-required="false" type="checkbox" id="ELCM_ENTITY_CLASS" name="ELCM_ENTITY_CLASS" ><LABEL for="ELCM_ENTITY_CLASS" id="ELCMENTITYCLASS">ELCM Entity Class</LABEL></td> -->
						<td style="visibility:hidden"><INPUT aria-required="false" type="checkbox" id="CUSTOMER_SPC" name="CUSTOMER_SPC" ><LABEL for="CUSTOMER_SPC" id="CUSTOMERSPC" >Customer Package Spec</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="CALL_FORM_DETAILS" name="CALL_FORM_DETAILS" ><LABEL for="CALL_FORM_DETAILS" id="CLFM_DETAILS">Call form Details</LABEL></td>						
						<td><INPUT aria-required="false" type="checkbox" id="ELCM_METADATA_CLASS" name="ELCM_METADATA_CLASS" ><LABEL for="ELCM_METADATA_CLASS" id="ELCMMETADATACLASS">ELCM MetaData Class</LABEL></td>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<!-- <td><INPUT aria-required="false" type="checkbox" id="ELCM_MAIN_CLASS" name="ELCM_MAIN_CLASS" ><LABEL for="ELCM_MAIN_CLASS" id="ELCMMAINCLASS">ELCM Main Class</LABEL></td> -->
						<td style="visibility:hidden"><INPUT aria-required="false" type="checkbox" id="CUSTOMER_SQL" name="CUSTOMER_SQL" ><LABEL for="CUSTOMER_SQL" id="CUSTOMERSQL" >Customer Package Body</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="SUMMARY_DETAILS" name="SUMMARY_DETAILS"><LABEL for="SUMMARY_DETAILS" id="SMRY_DTLS">Summary Details</LABEL></td>
						<td style="visibility:hidden"><INPUT aria-required="false" type="checkbox" id="LABEL_XML" name="LABEL_XML" ><LABEL for="LABEL_XML" id="LBL_XML_LBL">Label Html</LABEL></td>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<!-- <td><INPUT aria-required="false" type="checkbox" id="ELCM_DAO_CLASS" name="ELCM_DAO_CLASS" ><LABEL for="ELCM_DAO_CLASS" id="ELCMDAOCLASS">ELCM DAO Class</LABEL></td> -->
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td> 
					</tr>
					<tr>
						<td>&nbsp;</td>
						<!-- <td><INPUT aria-required="false" type="checkbox" id="ELCM_ENTITY_ASSEMBLER" name="ELCM_ENTITY_ASSEMBLER" ><LABEL for="ELCM_ENTITY_ASSEMBLER" id="ELCMENTITYASSEMBLER">ELCM Entity Assembler</LABEL></td> -->
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
					</tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>	
</div>

  
  
<div class="DIVMultipleBig"  style="width:95%;position:relative; margin-top:20px; margin-left:20px; margin-right:20px;" >
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:320px;width:100%;overflow-x:hidden"  >
			<table id="bulkresult" name="bulkresult" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
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
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>  
         
	<div style="float:right;padding-right:20px;padding-top:25px;">
		<BUTTON class="BTNfooter" style="width:75px;height:25px;"  name="OK"  id="ok"  onclick="fnGenerateUtils('BULKGEN','bulkresult')">Generate</BUTTON>
		<BUTTON  class="BTNfooter" name="Cls" style="width:60px;height:25px;" id="Cls" onclick="fnRADExitAll(seqNo, event)">Close</BUTTON>
	</div> 
</div> 
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>