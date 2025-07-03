<!--
  **
  **
  ** File Name  : XsdAnnotation.jsp
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
<%@ page import="java.util.HashMap" %>
<%@page import="com.ofss.odt.util.ODTUtils"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%
String js_parser ="";
String js_Delta ="";
String js_ScrCorrection ="";
boolean bowserVer  = false; 
String operMode = "";

String userAgent = request.getHeader("USER-AGENT").toUpperCase();
if(userAgent.contains("MSIE") || (userAgent.contains("TRIDENT") && userAgent.contains("RV"))) {//ie11 changes
	js_parser = "BROWSER_IE.js";
    js_Delta  = "RadDeltaHandler.js";
    js_ScrCorrection="RadScreenCorrection.js";
    bowserVer = true;
	operMode="CLIENT";
} else {
    js_parser = "BROWSER_NonIE.js";
	js_Delta  = "RadDeltaHandler_NonIE.js";
	js_ScrCorrection="RadScreenCorrection_NonIE.js";
	operMode="CLIENT";
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
        <script type="text/javascript" src="Script/JS/RadAllowedOperations.js"></script>
        <script type="text/javascript" src="Script/JS/RadSelectColumns.js"></script>
		<script type="text/javascript" src="Script/JS/RadBulkGenrator.js"></script>
        <script type="text/javascript" src="Script/JS/RadMultipleTables.js"></script>
		<script type="text/javascript" src="Script/JS/Extensible.js"></script>
		<script type="text/javascript" src="Script/JS/RadGlobals.js"></script>
		<script type="text/javascript" src="Script/JS/<%=js_Delta%>"></script>        
		<script type="text/javascript" src="Script/JS/<%=js_ScrCorrection%>"></script>
		<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
		<script type="text/javascript" src="Script/JS/RadUIUtils.js"></script>
		<script type="text/javascript" src="Script/JS/RadOrderCorrection.js"></script>
		<script type="text/javascript" src="Script/JS/RadInfraAccess.js"></script>		
         <script type="text/javascript" src="Script/JS/RadLovHandler.js"></script>
        <script type="text/javascript" >
          var g_scrType = "C";
          var mainWin = parent;
          var scrht = (screen.availHeight / 2) + 300;
          var scrwdt = (screen.availWidth / 2) + 400;
          var seqNo = parent.funcGenSeqNo;
          var elements_xsd = new Array();
          window.frameElement.name = seqNo;

          var XSDdom = createHTTPActiveXObject();

          if (parent.document.getElementById("testwin"))
              parent.document.getElementById("testwin").id = seqNo;
          var gen_gwinFuncId = parent.parent.gwinFuncId;

          function fnMouseDownEvents() {
              return true;
          }

          function createDOM() {

              var Xdom = "";
              var dataXML = "<?xml version='1.0' encoding='UTF-8'?>";
              dataXML = dataXML + "<RAD_FUNCTIONS><XSD_NAME/><XSD_DESC/><LANG_CODE/><ORIGINATION_DATE/><USER_ID/><RELEASE_CODE/><ENV_CODE/><RAD_XSD_ANNOTATION/></RAD_FUNCTIONS>";
              Xdom = loadXMLDoc(dataXML);
              XSDdom = Xdom;
          }

          function appendHdrData(XSDdom) {
              setNodeText(selectSingleNode(XSDdom, "//RAD_FUNCTIONS/XSD_NAME"), document.getElementById("FILE_SAVE_PATH").value);
              setNodeText(selectSingleNode(XSDdom, "//RAD_FUNCTIONS/XSD_DESC"), document.getElementById("FILE_SAVE_PATH").value);
              setNodeText(selectSingleNode(XSDdom, "//RAD_FUNCTIONS/RELEASE_CODE"), parent.relCode);

              try {
                  setNodeText(selectSingleNode(XSDdom, "//RAD_FUNCTIONS/LANG_CODE"), parent.lang);
                  setNodeText(selectSingleNode(XSDdom, "//RAD_FUNCTIONS/USER_ID"), parent.username);
                  setNodeText(selectSingleNode(XSDdom, "//RAD_FUNCTIONS/ENV_CODE"), parent.envCode);
              }
              catch (e) {
                  var rootnode = selectSingleNode(XSDdom, "//RAD_FUNCTIONS");
                  var nodeElement = XSDdom.createElement("LANG_CODE");
                  rootnode.insertBefore(nodeElement, selectSingleNode(rootnode, "RELEASE_CODE"));
                  nodeElement = XSDdom.createElement("USER_ID");
                  rootnode.insertBefore(nodeElement, selectSingleNode(rootnode, "RELEASE_CODE"));
                  nodeElement = XSDdom.createElement("ENV_CODE");
                  rootnode.insertBefore(nodeElement, selectSingleNode(rootnode, "RELEASE_CODE"));

                  setNodeText(selectSingleNode(XSDdom, "//RAD_FUNCTIONS/LANG_CODE"), parent.lang);
                  setNodeText(selectSingleNode(XSDdom, "//RAD_FUNCTIONS/USER_ID"), parent.username);
                  setNodeText(selectSingleNode(XSDdom, "//RAD_FUNCTIONS/ENV_CODE"), parent.envCode);
              }

              return XSDdom;
          }

          function fnLoad() {
              mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
              fnCalcHgt();
              document.getElementById("Cls").focus();
          }

          function ReplaceAll1(Source, stringToFind, stringToReplace) {
              var temp = Source;
              var index = temp.indexOf(stringToFind);
              while (index !=  - 1) {
                  temp = temp.replace(stringToFind, stringToReplace);
                  index = temp.indexOf(stringToFind);
              }
              return temp;

          }

          function fnLoadRadXMLFORNONIE(p_funcId) {
              xmlFileList = loadxmldata;
              xmlFileList = ReplaceAll1(xmlFileList, ":", "");
              var l = xmlFileList.indexOf('">');
              xmlFileList = "<?xml version=\"1.0\"?><xsschema>" + xmlFileList.substring(l + 2, xmlFileList.length);
              //xmlFileList=xmlFileList.substring(1,xmlFileList.length)
              document.getElementById('FILE_SAVE_PATH').value = p_funcId;
          }
		  function fnValidateXsd(){
		  var Xsdname = document.getElementById("FILE_SAVE_PATH").value;
		  var queryString = "FETCH@SELECT count(*) from CSTB_FID_XSDS where FUNCTION_ID IN ('NONEXTOPERATION','COMMON') AND XSD_NAME ='" + Xsdname + "'";
			  parent.gReqType = "APP";
              parent.gReqCode = parent.gAction;
              var radReqDOM = parent.buildRADXml();
              var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
              var tempNode = radReqDOM.createElement("QUERY");
              bodyNode.appendChild(tempNode);
              setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
              setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
              setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);
              setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
              var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
              var multRec = "";
              try {
                  multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
              }
              catch (e) {
                  multRec = response.substring(9, response.indexOf("</Records>")).split(">");
              }
			  
			  if(multRec[0]>0)
			  return true;
			  else 
			  return false;		  
		  
		  }

          function fn_Default_xsdvalues() {
		      deleteAll("XSD_Annotation");
			  var Validation=fnValidateXsd();
			  if(Validation==false){
			  document.getElementById("FILE_SAVE_PATH").value="";
			  alertMessage("Load Non-Extensible XSD's Only", "E");
			  return;
			  }
              var element_XSDArray = new Array();
              var traildom = "";
              traildom = loadXMLDoc(xmlFileList);
              var node_key = "";
              var Element_key = "";
              var node_k = "";
              var node_l = "";

              var len = selectNodes(traildom, "//xselement");
              var tablerowCount = 0;
              for (var i = 0;i < len.length;i++) {
                  if (len[i].getAttribute("name") != null) {
                      node_key = "ELEMENT^" + len[i].getAttribute("name");
                      Element_key = "ELEMENT^" + len[i].getAttribute("name");
                      node_k = len[i];

                      for (n = 0;n < 20;n++) {

                          if (node_k.parentNode != null)
                              node_k = node_k.parentNode;
                          if (node_k.attributes != null && node_k.getAttribute("name") != null)
                              node_key = node_k.tagName.substring(2, node_k.length).toUpperCase() + "^" + node_k.getAttribute("name") + "~" + node_key;
                      }
                      addNewRow("XSD_Annotation");
                      document.getElementsByName("XSD_Annotation")[0].tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value = node_key;
                      document.getElementsByName("XSD_Annotation")[0].tBodies[0].rows[i].cells[2].getElementsByTagName("INPUT")[0].value = len[i].getAttribute("name");
                      document.getElementsByName("XSD_Annotation")[0].tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0].value = "";
                      element_XSDArray[i] = node_key + "!" + Element_key + "!";
                      tablerowCount = i;
                  }
              }

              var lenCmpl = selectNodes(traildom, "//xscomplexType");

              for (var i = 0;i < lenCmpl.length;i++) {
                  if (lenCmpl[i].getAttribute("name") != null) {
                      tablerowCount++;
                      node_key = "COMPLEXTYPE^" + lenCmpl[i].getAttribute("name");
                      Element_key = "COMPLEXTYPE^" + lenCmpl[i].getAttribute("name");
                      node_k = lenCmpl[i];

                      for (n = 0;n < 4;n++) {
                          if (node_k.parentNode != null)
                              node_k = node_k.parentNode;
                          if (node_k.attributes != null && node_k.getAttribute("name") != null)
                              node_key = node_k.tagName.substring(2, node_k.length).toUpperCase() + "^" + node_k.getAttribute("name") + "~" + node_key;
                      }
                      addNewRow("XSD_Annotation");
                      document.getElementsByName("XSD_Annotation")[0].tBodies[0].rows[tablerowCount].cells[1].getElementsByTagName("INPUT")[0].value = node_key;
                      document.getElementsByName("XSD_Annotation")[0].tBodies[0].rows[tablerowCount].cells[2].getElementsByTagName("INPUT")[0].value = lenCmpl[i].getAttribute("name");
                      document.getElementsByName("XSD_Annotation")[0].tBodies[0].rows[tablerowCount].cells[3].getElementsByTagName("INPUT")[0].value = "";
                      element_XSDArray[tablerowCount] = node_key + "!" + Element_key + "!";
                  }
              }

              var lenSmpl = selectNodes(traildom, "//xssimpleType");

              for (var i = 0;i < lenSmpl.length;i++) {
                  if (lenSmpl[i].getAttribute("name") != null) {
                      tablerowCount++;
                      node_key = "SIMPLETYPE^" + lenSmpl[i].getAttribute("name");
                      Element_key = "SIMPLETYPE^" + lenSmpl[i].getAttribute("name");
                      node_k = lenSmpl[i];

                      for (n = 0;n < 4;n++) {
                          if (node_k.parentNode != null)
                              node_k = node_k.parentNode;
                          if (node_k.attributes != null && node_k.getAttribute("name") != null)
                              node_key = node_k.tagName.substring(2, node_k.length).toUpperCase() + "^" + node_k.getAttribute("name") + "~" + node_key;
                      }
                      addNewRow("XSD_Annotation");
                      document.getElementsByName("XSD_Annotation")[0].tBodies[0].rows[tablerowCount].cells[1].getElementsByTagName("INPUT")[0].value = node_key;
                      document.getElementsByName("XSD_Annotation")[0].tBodies[0].rows[tablerowCount].cells[2].getElementsByTagName("INPUT")[0].value = lenSmpl[i].getAttribute("name");
                      document.getElementsByName("XSD_Annotation")[0].tBodies[0].rows[tablerowCount].cells[3].getElementsByTagName("INPUT")[0].value = "";
                      element_XSDArray[tablerowCount] = node_key + "!" + Element_key + "!";
                  }
              }
              fnsetvalues();
          }

          function fnGenXsdAnnotaions() {
              createDOM();
              XSDdom = appendHdrData(XSDdom);
              var tblObj_XSD = document.getElementById('XSD_Annotation');
              if (tblObj_XSD.tBodies[0].rows.length > 0) {
                  var nodename = "XSD_NAME~XSD_NODE_KEY~ELEMENT_NAME~LABEL_NAME".split("~");
                  var xsdname = document.getElementById("FILE_SAVE_PATH").value;
                  var XsdNdKey = "";
                  var Elemnt_Name = "";
                  var Label = ""; 
                  for (var j = 0;j < tblObj_XSD.tBodies[0].rows.length;j++) {
                      XsdNdKey = "";
                      Elemnt_Name = "";
                      Label = ""; 
                      if (tblObj_XSD.tBodies[0].rows[j].cells[1].getElementsByTagName('INPUT')[0].value != "") {
                          var rootnode = selectSingleNode(XSDdom, "//RAD_XSD_ANNOTATION");
                          var nodeElement = XSDdom.createElement("XSD_DETAIL");
                          rootnode.appendChild(nodeElement);
                          var nodevalue = "";
                          for (var i = 0;i < nodename.length;i++) {
                              var childElements = XSDdom.createElement(nodename[i]);
                              nodeElement.appendChild(childElements);

                              if (nodename[i] == "XSD_NAME")
                                  nodevalue = xsdname;
                              else if (nodename[i] == "XSD_NODE_KEY")
                                  nodevalue = tblObj_XSD.tBodies[0].rows[j].cells[1].getElementsByTagName('INPUT')[0].value;
                              else if (nodename[i] == "ELEMENT_NAME")
                                  nodevalue = tblObj_XSD.tBodies[0].rows[j].cells[2].getElementsByTagName('INPUT')[0].value;
                              else if (nodename[i] == "LABEL_NAME")
                                  nodevalue = tblObj_XSD.tBodies[0].rows[j].cells[3].getElementsByTagName('INPUT')[0].value;
                              
                              setNodeText(selectSingleNode(selectNodes(XSDdom, "//RAD_XSD_ANNOTATION/XSD_DETAIL")[j], nodename[i]), nodevalue);

                          }
                      }
                  }
              }

              parent.gReqType = "XSD_ANOTATION";
              parent.gReqCode = "XSD_ANOTATION";
              parent.gClnUsrDir = "YES";
              parent.gIsSummary = 0;
              parent.gAction = "";
              gReleaseCode = parent.relCode;
              parent.gSubFolder = "";
              var radReqDOM = parent.buildRADXml();
              var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
              var gennode = radReqDOM.createElement("GENERATE");
              bodyNode.appendChild(gennode);
              var node = radReqDOM.createElement("INC");
              gennode.appendChild(node);
              setNodeText(selectSingleNode(radReqDOM, "//GENERATE/INC"), 'Y');
              var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(XSDdom), "RADClientHandler");
              response = frntndFiles + "--##FILE##--" + response;
              var wres = fnwritedata(response, parent.saveformat);
              if (wres == true) {
                  alertMessage("File Saved", "I");
                  debug('Succesfully saved File');
                  return true;
              }
              else {
                  alertMessage("Failed", "E");
                  debug('Failed to save File');
                  return false;
              }

          }

          function fnsetvalues() {
              var tablenam = document.getElementById("XSD_Annotation").tBodies[0];
              var columnnms = "";
              for (var i = 0;i < tablenam.rows.length;i++) {
                  columnnms = columnnms + "'" + tablenam.rows[i].cells[1].getElementsByTagName("INPUT")[0].value + "',";
              }
              columnnms = columnnms + "''";
              var ser_nam = document.getElementById("FILE_SAVE_PATH").value;
              var queryString = "FETCH@select  COMMENT_ID,XSD_NODE_KEY from  CSTB_OLD_XSD_COMMENTS   where   XSD_NAME = '" + ser_nam + "'  and XSD_NODE_KEY in( " + columnnms + ")";
              parent.gReqType = "APP";
              parent.gReqCode = parent.gAction;
              var radReqDOM = parent.buildRADXml();
              var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
              var tempNode = radReqDOM.createElement("QUERY");
              bodyNode.appendChild(tempNode);
              setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
              setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
              setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);
              setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
              var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
              var multRec = "";
              try {
                  multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
              }
              catch (e) {
                  multRec = response.substring(9, response.indexOf("</Records>")).split(">");
              }

              var tableObj = document.getElementById("XSD_Annotation");
              for (var sr = 0;sr < tableObj.tBodies[0].rows.length;sr++) {
                  for (var ml = 0;ml < multRec.length;ml++) {
                      if (tableObj.tBodies[0].rows[sr].cells[1].getElementsByTagName("INPUT")[0].value == multRec[ml].substring(multRec[ml].indexOf("~") + 1, multRec[ml].length)) {
                          tableObj.tBodies[0].rows[sr].cells[3].getElementsByTagName("INPUT")[0].value = multRec[ml].split("~")[0];
                          break;
                      }
                  }
              }
          }

</script>  
</head>
<body class="BODYDetails" style="background-color:#ffffff" onkeydown="return shortcut(event)" onload="fnLoad();fnSetMode('DEST_XML');createDOM()">



<div class="WNDcontainer" id="DIVWNDContainer">
    <div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"> <h1 class="WNDtitletxt">XSD Annotations</h1>
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

<div   class="Subcontainer" TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText" >
<LABEL class="LBLstd" for="FILE_SAVE_PATH">Xsd File List</LABEL>
<INPUT aria-required="false" type="file" name ="DEST_XML" id ="DEST_XML"size="10" onchange="loadRADXMLData('DEST_XML')" style="display:none; position:absolute" disabled="true"/>                                      
<INPUT aria-required="false" class="TXTstd"  type="text" name="FILE_SAVE_PATH" id="FILE_SAVE_PATH" title="" value="" size="20" disabled="true" />                                        
<INPUT aria-required="false" type="button" name ="BROWSE"  class="BTNfooter"  id ="BROWSE" value="BROWSE" onclick="loadBrowserXML(event)" style="visibility:hidden; position:absolute" disabled="true"/>

</div>
  
</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" >  

<div class="DIVText"  style="display:none">
<INPUT aria-required="false" type=hidden name="REALSE" id="REALSE" value=<%=ODTUtils.stripXSS(request.getParameter("title"))%> size=20> 
<INPUT aria-required="false" type=hidden name="TOOL" id="TOOL" value=<%=ODTUtils.stripXSS(request.getParameter("Tool"))%> size=20>  
</div> 
 
</fieldset>
<!--End of Form fields column two-->
</div>  
</div>  

<div class="DIVMultipleBig" style="position:relative; margin-left:20px; margin-right:20px;width:95%;">
	<div class="MEButtons">
			<BUTTON class="Buttontext" title="Validate" onclick="fn_Default_xsdvalues();" name="VALIDT" value="VALIDT" style="margin-right:10px; height:20px;width:50px;">Default</BUTTON>&nbsp;        
	     </div> <div class="DIVmultiplebox">
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:400px;overflow-x:hidden"  >
			<table id="XSD_Annotation" summary="Multi Tenor" width="100%" class="TBLgrid" title="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			   <thead>
					<tr>
						<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('XSD_Annotation','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
						<th scope="col" class="THgrid"><span class="SPNtext">Node Key</span></th>
						<th scope="col" class="THgrid"><span class="SPNtext">Element Name</span></th>
						<th scope="col" class="THgrid"><span class="SPNtext">Label</span></th> 
					</tr>
				</thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
	</div>
</div>  
		<div style="TEXT-ALIGN: right; MARGIN-TOP: 8px; PADDING-RIGHT: 30px; CLEAR: both">
			<BUTTON class="BTNfooter" style="height:25px;width :100px;"  name ="missingLabels" id ="missingLabels" size="10" onclick="fnfetchmissingComments();fnMissingcomments_XsdAnnotation();"> MissingLabels</BUTTON>
			<BUTTON class="BTNfooter" style="height:25px;width :70px;"  name="GENERATE"  id="GENERATE"  onclick="fnGenXsdAnnotaions()">Generate</BUTTON>
			<BUTTON  class="BTNfooter" name="Cls" style="width:60px;height:25px;" id="Cls" onclick="fnRADExitAll(seqNo, event)">Close</BUTTON>
		</div>
</div> 
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>