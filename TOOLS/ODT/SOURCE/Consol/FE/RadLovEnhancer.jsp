<!--
  **
  **
  ** File Name  : RadLovEnhancer.jsp
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
String userAgent = request.getHeader("USER-AGENT").toUpperCase();
String operMode = "";
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
          if (parent.document.getElementById("testwin"))
              parent.document.getElementById("testwin").id = seqNo;
          var gen_gwinFuncId = parent.parent.gwinFuncId;

          function fnMouseDownEvents() {
              return true;
          }
function fnChangeStatus(obj){
	if(obj.parentNode.parentNode.getElementsByTagName("INPUT")[3].value=="NO")
	obj.parentNode.parentNode.getElementsByTagName("INPUT")[3].value="YES";
	else
		obj.parentNode.parentNode.getElementsByTagName("INPUT")[3].value="NO";
	
}

          function createxml() { 
        	  var func_id = document.getElementById("E_FUNCTION_ID").value; 
              var tableObject = document.getElementById("LOV_ENHANCER");
              var tablerows = tableObject.tBodies[0].rows; 
              var internal="" ,external="",Combined="",CMB_DATA="#";
              for (var i = 0;i < tablerows.length;i++) {
                  if (tableObject.tBodies[0].rows[i].cells[4].getElementsByTagName("INPUT")[0].value == "YES") {
                	  if(tablerows[i].cells[2].getElementsByTagName("SELECT")[0].value=="I"){
                		  internal=internal+ tablerows[i].cells[1].getElementsByTagName("INPUT")[0].value +"~";
                	  }
                	  else if(tablerows[i].cells[2].getElementsByTagName("SELECT")[0].value=="E"){
                		  external=external+ tablerows[i].cells[1].getElementsByTagName("INPUT")[0].value +"~";
                	  } 
                	  else if(tablerows[i].cells[2].getElementsByTagName("SELECT")[0].value=="C"){
                		  Combined=Combined+ tablerows[i].cells[1].getElementsByTagName("INPUT")[0].value +"~";
                	  } 
                  }
                  
                  if (tableObject.tBodies[0].rows[i].cells[2].getElementsByTagName("SELECT")[0].value == "C") {
                	  CMB_DATA=CMB_DATA+ tablerows[i].cells[5].getElementsByTagName("INPUT")[0].value +"#";
                  }
              }
              internal=internal.substring(0, internal.length-1);
              external=external.substring(0, external.length-1);
              Combined=Combined.substring(0, Combined.length-1);
              var updateString=internal+"!"+external+"!"+Combined+"!"+func_id+"!"+CMB_DATA;
              
              parent.gReqType = "LOV_ENHANCER";
              parent.gReqCode = "LOV_ENHANCER"; 
              var radReqDOM = parent.buildRADXml();
              var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY"); 
              var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + updateString, "RADClientHandler");  
             var wres = fnwritedata(response, parent.saveformat); 
              if (wres == true) {
                  alertMessage("File Saved", "I");
                  debug('Succesfully saved File');
                  loadfunctionid();
                  return true;
              }
              else {
                  alertMessage("Failed", "E");
                  debug('Failed to save File');
                  return false;
              }
                }
          
          function loadfunctionid(){
        	  deleteAll('LOV_ENHANCER');
        	var func_id = document.getElementById("E_FUNCTION_ID").value; 
      		var func_query="FUNCTION_ID_QUERY";
      		 var WhereString= "WHERE FUNCTION_ID='"+ func_id +"'";
      		try {
                  parent.parent.gReqType = "APP";
                  parent.parent.gReqCode = parent.parent.gAction;
                  var radReqDOM = parent.parent.buildRADXml();
                  var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
                  var tempNode = radReqDOM.createElement("QUERY");
                  bodyNode.appendChild(tempNode);
                  setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
                  setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
                  setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), func_query);
      			  setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
                  setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
                  var response = parent.parent.fnPost(getXMLString(radReqDOM) + parent.parent.gBodySeparator + "");
              }catch (e) {}  
              var multRecd = "";
              try {
                  multRecd = getNodeText(selectSingleNode(response, "//Records")).split(">");
              }
              catch (e) {
                  multRecd = response.substring(9, response.indexOf("</Records>")).split(">");
              }
              
              var tableObj = document.getElementById("LOV_ENHANCER");
              for (var sr = 0;sr < multRecd.length-1;sr++) {
            	  addNewRow("LOV_ENHANCER"); 
            	  		   
                          tableObj.tBodies[0].rows[sr].cells[1].getElementsByTagName("INPUT")[0].value = multRecd[sr].split("~")[0]; 
                          if(multRecd[sr].split("~")[1]!="null")
                          tableObj.tBodies[0].rows[sr].cells[2].getElementsByTagName("SELECT")[0].value = multRecd[sr].split("~")[1];
                          if(multRecd[sr].split("~")[2]!="null" && multRecd[sr].split("~")[2]!=undefined)
                          tableObj.tBodies[0].rows[sr].cells[3].getElementsByTagName("INPUT")[0].value = multRecd[sr].split("~")[2] +"!"+multRecd[sr].split("~")[3]; 
                          tableObj.tBodies[0].rows[sr].cells[0].getElementsByTagName("INPUT")[0].checked=false;
              }
              
          }
          function fnLoad() {
              mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
              fnCalcHgt();
              document.getElementById("Cls").focus();
          }
           
          function fn_Mapping() { 
        	  var callorlaunch="LOV_ENHANCER";
              var tmp = 0;
              var rowindex = 0;
              var scrArg = "";
              var tabObj = document.getElementById(callorlaunch); 
                  for (var i = 0;i < tabObj.tBodies[0].rows.length;i++) {
                      if (tabObj.tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                          tmp = tmp + 1;
                          rowindex = i;
                      }
                  }
                  if (tmp > 1) { 
                          alertMessage("Select only one Lov", "I"); 
                      return false;
                  }
                  else if (tmp == 0) { 
                          alertMessage("Lov is not selected", "I"); 
                      return false;
                  } 
                  if (tabObj.tBodies[0].rows[rowindex].cells[2].getElementsByTagName("SELECT")[0].value != "C") { 
                      alertMessage("Select any Combined Lov", "I"); 
                  return false;
              }
                  
                  var Lov_Name = tabObj.tBodies[0].rows[rowindex].cells[1].getElementsByTagName("INPUT")[0].value;
                  var Lov_QUERY = tabObj.tBodies[0].rows[rowindex].cells[3].getElementsByTagName("INPUT")[0].value;
                  var functionname = document.getElementById("E_FUNCTION_ID").value; 
                 
                  
                ctrlrwIndx = rowindex;   
                  loadSubScreenDIV("ChildWin", "RadLovCMapping.jsp?&rowid=" + ctrlrwIndx + "&lovName=" + Lov_Name + "&functionname=" + functionname + "&lovquery=" + Lov_QUERY);
          }

</script>  
</head>
<body class="BODYDetails" style="background-color:#ffffff" onkeydown="return shortcut(event)" onload="fnLoad();">



<div class="WNDcontainer" id="DIVWNDContainer">
    <div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"> <h1 class="WNDtitletxt">Lov Enhancer</h1>
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
<LABEL class="LBLstd" for="FILE_SAVE_PATH">Function ID</LABEL>
<INPUT aria-required="false" type="text" name ="E_FUNCTION_ID" id ="E_FUNCTION_ID"size="10" onchange="upper(this);loadfunctionid()" />                                      
<BUTTON class="BTNimg" title="List Of Values" tabindex="-1"  name="LOV"  id="LOV"  onclick="LOV_FUNCTION_ID.show_lov('E_FUNCTION_ID~','frmLovDetls','', 'Function Name~Module', 'Function Name~Module', 'Function Name~Module',event)"><span class="ICOlov"></span></BUTTON>

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
			 <BUTTON class="BTNimg" title="Populate" onclick="loadfunctionid();" name="POPLT" value="POPLT" style="height:25px;width :62px;">Populate</BUTTON> 
			 <BUTTON class="BTNimg" title="Populate" onclick="fn_Mapping();" name="POPLT" value="POPLT" style="height:25px;width :150px;">Combined Details</BUTTON> 
       </div>
	 <div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:500px;" width="100%"  >
			<table id="LOV_ENHANCER" name="LOV_ENHANCER" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			   <thead>
					<tr>
						<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('LOV_ENHANCER','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
						<th scope="col" class="THgrid"><span class="SPNtext">Lov Id</span></th>
						<th scope="col" class="THgrid"><span class="SPNtext">Internal/External/Combined</span></th> 
						<!-- <th scope="col" class="THgrid"><span class="SPNtext">Modified</span></th>  -->
					</tr>
				</thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>  
		<div style="TEXT-ALIGN: right; MARGIN-TOP: 8px; PADDING-RIGHT: 30px; CLEAR: both">
			<BUTTON class="BTNimg" style="height:25px;width :70px;"  name="GENERATE"  id="GENERATE"  onclick="createxml()">Generate</BUTTON>
			<BUTTON  class="BTNimg" name="Cls" style="width:60px;height:25px;" id="Cls" onclick="fnRADExitAll(seqNo, event)">Close</BUTTON>
		</div>
</div> 
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>