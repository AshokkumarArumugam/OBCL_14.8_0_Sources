<!--
  **
  **
  ** File Name  : RadSrvGenerate.jsp
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

<TITLE>Generate Service</TITLE>
<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
<script type="text/javascript" src="Script/JS/RadGlobals.js"></script>
<script type="text/javascript" src="Script/JS/RadSrvCUtils.js"></script>
<script type="text/javascript" src="Script/JS/RadUIUtils.js" ></script>
<script type="text/javascript" src="Script/JS/RadUtil.js" ></script>
<script type="text/javascript" src="Script/JS/RADReadWriteFiles.js" ></script>
<script type="text/javascript" src="Script/JS/RadMultipleTables.js"></script>
<script type="text/javascript" src="Script/JS/RadAccessibility.js" ></script>

<script>
function addIEonScroll() {

	var thisContainer = document.getElementById('DIVGrid1');
	if (!thisContainer) { return; }

	var onClickAction = 'toggleSelectBoxes();';
	thisContainer.onscroll = new Function(onClickAction);
}
var xmlFileList = "";
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

parent.document.getElementById("IFCHILD").style.width=parent.scrwdt - 30 + "px";
parent.document.getElementById("IFCHILD").style.height=parent.scrht - 200 + "px";
parent.document.getElementById("IFCHILD").scrolling='no';  

function fnload() {
var obj1="XSD_LIST";
var obj2="RADXML_LIST"; 
    fngetReadMode('BULK');
    document.getElementsByName(obj1)[0].disabled = false;
    document.getElementsByName("BROWSE_SRC")[0].disabled = false;
    document.getElementsByName("FILE_SAVE_PATH_SRC")[0].disabled = false;
    document.getElementsByName(obj1)[0].style.visibility = "hidden";
    document.getElementsByName("BROWSE_SRC")[0].style.visibility = "visible";
    document.getElementsByName("FILE_SAVE_PATH_SRC")[0].style.visibility = "visible";  
	
    document.getElementsByName(obj2)[0].disabled = false;
    document.getElementsByName("BROWSE")[0].disabled = false;
    document.getElementsByName("FILE_SAVE_PATH")[0].disabled = false;
    document.getElementsByName(obj2)[0].style.visibility = "hidden";
    document.getElementsByName("BROWSE")[0].style.visibility = "visible";
    document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
	document.getElementById("Cancel").focus(); 
}

function fnLoadRadXMLFORNONIE(p_funcId)
			  {
                  if(xmlFileList==""){    	                                 
				   xmlFileList = loadxmldata;	
				   document.getElementById('FILE_SAVE_PATH').value =p_funcId ;
				 } else if(xmlFileList!=""){
				    xmlSrcFileList=loadxmldata;
					document.getElementById('FILE_SAVE_PATH_SRC').value =p_funcId ;
				 }
				 
				
			  }
			  
function Fngen_service(){
    var gen_gwinFuncId = parent.gen_gwinFuncId;
    var fileNodes = "IMPL_FILE~CONFIG_FILES~WSDL_FILE~XSD_FILES~ANT_BUILD";
    fileNodes = fileNodes.split("~");
    parent.parent.gReqType = "GEN";
    var operation = "GENERATE";
    parent.debug('In Fngen_service for ' + operation);
	parent.parent.gReqCode = "GENERATE";    
    try {
        function_id = parent.document.getElementsByName("SERVICE_NAME")[0].value;
    }
    catch (e) {
    }
    parent.parent.gIsSummary = 0;
    parent.parent.gAction = "";
    gReleaseCode = parent.parent.relCode;
    parent.gSubFolder = "";
    var radReqDOM = parent.parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
	
    var listFileNode = radReqDOM.createElement("RADXML_LIST");
	bodyNode.appendChild(listFileNode);
	setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/RADXML_LIST"), document.getElementsByName("FILE_SAVE_PATH")[0].value);
	
	var listFileNode = radReqDOM.createElement("XSD_LIST");
	bodyNode.appendChild(listFileNode);
	setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/XSD_LIST"), document.getElementsByName("FILE_SAVE_PATH_SRC")[0].value);
	
	var listFileNode = radReqDOM.createElement("XSD_VALIDATION_REQD");
	bodyNode.appendChild(listFileNode);
	if (document.getElementById('XSD_VALIDATION_REQUIRED').checked == true) 
	 setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/XSD_VALIDATION_REQD"), 'Y');
	else
	 setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/XSD_VALIDATION_REQD"), 'N');
	
	
    var gennode = radReqDOM.createElement(operation);
    bodyNode.appendChild(gennode);
    if (!fnTestConnection()) {
        return false;
    }    
    for (var fln = 0;fln < fileNodes.length;fln++) {
        var node = radReqDOM.createElement(fileNodes[fln]);
        gennode.appendChild(node);
    }

    chldNodes = gennode.childNodes;
    for (i = 0;i < chldNodes.length;i++) {
        var nodeNm = chldNodes[i].nodeName;
        if (document.getElementById(nodeNm)) {
            if (document.getElementById(nodeNm).checked == true) {
                setNodeText(selectSingleNode(radReqDOM, "//" + operation + "//" + nodeNm), 'Y');
            }
            else {
                setNodeText(selectSingleNode(radReqDOM, "//" + operation + "//" + nodeNm), 'N');
            }
        }
    }    
    var result = "";	
    result = parent.fnSaveData('1',radReqDOM);
    if (result != false) {
        var logdbmsgs = selectNodes(loadXMLDoc(result), "//RAD_RES_ENV/RAD_BODY/RAD_ERRORS/ERROR");
        var logmCODE = "";
        var logmMESSAGE = "";
        var log1, log2;
        for (var lb = 0;lb < logdbmsgs.length;lb++) {
            log1 = getNodeText(selectNodes(logdbmsgs[lb], "EDESC")[0]);
            log2 = getNodeText(selectNodes(logdbmsgs[lb], "ECODE")[0]);
            logmMESSAGE = log1 + "," + log2;
            logmCODE = logmCODE + "~" + logmMESSAGE;
        }       
        var checkstatus1 = getNodeText(selectSingleNode(loadXMLDoc(result), "//RAD_RES_ENV/RAD_BODY/RAD_ERRORS/ERROR/ETYPE"));
            alertMessage(logmCODE, checkstatus1);
            deleteAll('fileResult');
            fileDtls = selectNodes(loadXMLDoc(result), "//RAD_RES_ENV/RAD_BODY/GENERATE/FILE_DETAILS");
        

        for (var fld = 0;fld < fileDtls.length;fld++) {
            
            var fileType = getNodeText(selectNodes(fileDtls[fld], "FILE_TYPE")[0]);
			try{
            var fileTag = getNodeText(selectNodes(fileDtls[fld], "FILE_TAG")[0]);
			}catch(e){
			 var fileTag = fileType;
			}
            var fileStatus = getNodeText(selectNodes(fileDtls[fld], "FILE_STATUS")[0]);
		    
            var rowRef = "";            
             addTableRow('fileResult');
                rowRef = document.getElementsByName('fileResult')[0].tBodies[0].rows[document.getElementsByName('fileResult')[0].tBodies[0].rows.length - 1];          

            rowRef.cells[0].getElementsByTagName("INPUT")[0].value = fld + 1;
            rowRef.cells[0].getElementsByTagName("INPUT")[0].readOnly = true;
            rowRef.cells[1].getElementsByTagName("INPUT")[0].value = getNodeText(selectNodes(fileDtls[fld], "FILE_NAME")[0]).substring(getNodeText(selectNodes(fileDtls[fld], "FILE_NAME")[0]).lastIndexOf("\\") + 1, getNodeText(selectNodes(fileDtls[fld], "FILE_NAME")[0]).length);
            rowRef.cells[1].getElementsByTagName("INPUT")[0].readOnly = true;
            rowRef.cells[2].getElementsByTagName("INPUT")[0].value = getNodeText(selectNodes(fileDtls[fld], "FILE_TYPE")[0]);
            rowRef.cells[2].getElementsByTagName("INPUT")[0].readOnly = true;
            rowRef.cells[3].getElementsByTagName("SELECT")[0].value = fileStatus;
            rowRef.cells[3].getElementsByTagName("SELECT")[0].readOnly = true;
            

        }

    }
}
			  

			  
</script>
</head> 
<body  class="BODYDetails" style="background-color:#ffffff" onload="fnload();"  onkeydown="fnAccessChildScreens(event)">
<div id="DIVWNDContainer">
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Generate Service</h1>                                      
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
		</div>
	</div>  
<div class="DIVTabPageContent" style="border:0px; ">
<div   class="Subcontainer" name="DIV_GENERATE" id="DIV_GENERATE" TYPE="SINGLE" VIEW="NO">

<!--Form fields column one-->
<div class="DIVColumnOne" style="width:48%" >
<fieldset class="FSTcell"> 

<div class="DIVText" >
<LABEL class="LBLstd star" for="RADXML_LIST">Radxml List</LABEL>
<INPUT aria-required="false" type="file" name ="RADXML_LIST" id ="RADXML_LIST"size="10" onchange="loadRADXMLData('RADXML_LIST')" style="display:none; position:absolute" disabled="true"/>                                      
<INPUT aria-required="false" class="TXTstd"  type="text" name="FILE_SAVE_PATH" id="FILE_SAVE_PATH" title="" value="" size="20" disabled="true" />                                        
<INPUT aria-required="false" type="button" name ="BROWSE"  class="BTNfooter" id ="BROWSE" value="BROWSE" onclick="loadBrowserXML(event)" style="visibility:hidden; position:absolute" disabled="true"/>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="XSD_VALIDATION_REQUIRED">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="XSD_VALIDATION_REQUIRED" id="XSD_VALIDATION_REQUIRED">XSD Validation Required</LABEL>
</div>
</div>
 
</fieldset>
<!--End of Form fields column two-->
</div> 

<!--Form fields column two-->
<div class="DIVColumnOne" style="width:48%" >
<fieldset class="FSTcell" >  

<div class="DIVText" >
<LABEL class="LBLstd star" for="XSD_LIST">Xsd List</LABEL>
<INPUT aria-required="false" type="file" name ="XSD_LIST" id ="XSD_LIST"size="10" onchange="loadRADXMLFilesSrc('XSD_LIST')" style="display:none; position:absolute" disabled="true"/>                                        
<INPUT aria-required="false" class="TXTstd" type="text" name="FILE_SAVE_PATH_SRC" id="FILE_SAVE_PATH_SRC" title="" value="" size="20" disabled="true" />                                        
<INPUT aria-required="false" type="button"  class="BTNfooter"  name ="BROWSE_SRC" id ="BROWSE_SRC" value="BROWSE" onclick="loadBrowserXML(event)" style="visibility:hidden; position:absolute" disabled="true"/>  
 </div>  
 
 <div class="DIVText"  style="display:none">      
<INPUT aria-required="false" name="LANG_CODE" id="LANG_CODE" style="visibility:hidden"></INPUT> 
<INPUT aria-required="false" type=hidden name="REALSE" id="REALSE" value=<%=ODTUtils.stripXSS(request.getParameter("title"))%> size=20> 
<INPUT aria-required="false" type=hidden name="TOOL" id="TOOL" value=<%=ODTUtils.stripXSS(request.getParameter("Tool"))%> size=20>
</div>
 
</fieldset>
</div> 


 
</div> 


		 
<div class="DIVMultipleBig"  style="width:95%;position:relative; margin-top:20px; margin-left:20px; margin-right:20px;" >
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="width:100%;overflow-x:hidden"  >
			<table role="presentation" onKeyDown="FnAcessTblkeys(this,event);"  id="RDGENTBL" name="RDGENTBL" width="100%" align="center" cellpadding="0" cellspacing="0" border="0">
					<thead>
			    	<tr>
						<th scope="col" class="THgrid" ><BUTTON class="THgrid"  ><span class="SPNtext">Wsdl Files</span></BUTTON></th>
						<th scope="col" class="THgrid" ><BUTTON class="THgrid"  ><span class="SPNtext">Xsd</span></BUTTON></th>
						<th scope="col" class="THgrid" ><BUTTON class="THgrid"   ><span class="SPNtext">Others</span></BUTTON></th>
					 </tr>
					</thead>
					<tbody>
					<tr>
					    <td><INPUT aria-required="false" type="checkbox" id="CONFIG_FILES" name="CONFIG_FILES" ><LABEL for="CONFIG_FILES" id="LBL_CONFIG_FILES">Config Files</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="XSD_FILES" name="XSD_FILES" ><LABEL for="XSD_FILES" id="LBL_XSD_FILES">Xsd Files</LABEL></td>
						<td><INPUT aria-required="false" type="checkbox" id="ANT_BUILD" name="ANT_BUILD" ><LABEL for="ANT_BUILD" id="LBL_ANT_BUILD">Ant Build Scripts</LABEL></td>
					</tr> 
					<tr>
					    <td><INPUT aria-required="false" type="checkbox" id="WSDL_FILE" name="WSDL_FILE" ><LABEL for="WSDL_FILE" id="LBL_WSDL_FILE">Wsdl File</LABEL></td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr> 
					<tr>
					    <td><INPUT aria-required="false" type="checkbox" id="IMPL_FILE" name="IMPL_FILE" ><LABEL for="IMPL_FILE" id="LBL_IMPL_FILE">Impl File</LABEL></td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr> 
					</tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>	
</div>

<div id="GENRATEDIV" name="GENRATEDIV" class="DIVMultipleBig"  style="width:95%;position:relative; margin-top:20px; margin-left:20px; margin-right:20px;" >
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:350px;width:100%;overflow-x:hidden"  >
			<table id="fileResult" name="fileResult" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Sl.No</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">File Name</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">File Type</span></th>  
					<th scope="col" class="THgrid"><span class="SPNtext">Status</span></th>  
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div> 

</div> 
</div>

<div style="margin-top:10px;float:right;display:block;padding-right:20px;">
		<BUTTON class="BTNfooter" name="OK"  id="ok" style="height:25px;width:70px"  onclick="Fngen_service();" >Generate</BUTTON>&nbsp;
		<BUTTON class="BTNfooter" name="Cancel"  id="Cancel" style="height:25px;width:60px" onclick="fnRADExitSub('ChildWin', event);"  >Cancel</BUTTON>
	</div>
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>
  
  