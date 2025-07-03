<!--
  **
  **
  ** File Name  : RadInfra.jsp
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
<%@ page import="com.ofss.odt.util.ODTApplicationGlobals"%>
<%@ page import="java.util.Hashtable"%>
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
String displayJspName = request.getParameter("incFile");
displayJspName = ODTUtils.stripXSS(ODTApplicationGlobals.getScreenName().get(displayJspName)+"");

%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
        		
		<title><%=ODTUtils.stripXSS(request.getParameter("title"))%></title>
		<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>
		<script type="text/javascript" src="Script/JS/RadInfraUtil.js"></script>
		<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
		<script type="text/javascript" src="Script/JS/RadDeltaHandler.js"></script>
		<script type="text/javascript" src="Script/JS/RadGlobals.js"></script>
		<script type="text/javascript" src="Script/JS/RadLovHandler.js"></script>
		<script type="text/javascript" src="Script/JS/Extensible.js"></script>
		<script type="text/javascript" src="Script/JS/RadUIUtils.js"></script>
		<script type="text/javascript" src="Script/JS/RadInfraAccess.js"></script>
		<script>
		var g_scrType = "";
		var scrht = "";
		var scrwdt= "";			
		var mainWin = parent;
		var seqNo = parent.funcGenSeqNo;
		window.frameElement.name = seqNo;
		parent.document.getElementById("testwin").id = seqNo;
		var gen_gwinFuncId = parent.parent.gwinFuncId; 
		
		function fnMouseDownEvents() {
			return true;
		}

		function fnLoadRad() {

			mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
			g_scrType = document.getElementById(parent.gwinFuncId).getAttribute("scrSize");

			var containerDIV = "ChildWin";
			if (typeof (fromSubScr) == 'undefined')
				containerDIV = seqNo;
			if (g_scrType == "M") {
				scrht = (screen.availHeight / 2) + 200;
				scrwdt = screen.availWidth / 2 + 200;
			} else if (g_scrType == "S") {
				scrht = (screen.availHeight / 3) + 200;
				scrwdt = screen.availWidth / 3 + 200;
			}

			var scrwidth = scrwdt;
			var scrHeight = scrht;
			var tempDh = parent.document.getElementById("topHeader").offsetHeight - 10
			parent.document.getElementById(containerDIV).style.width = scrwidth + "px";
			parent.document.getElementById(containerDIV).children[0].style.width = scrwidth - 15 + "px";
			parent.document.getElementById(containerDIV).style.height = scrHeight - tempDh + "px";
			parent.document.getElementById(containerDIV).children[0].style.height = scrHeight - tempDh + "px";
			document.getElementById("DIVWNDContainer").style.width = scrwidth - 15 + "px";
			document.getElementById("DIVWNDContainer").style.height = scrHeight - 5 + "px";
			if (g_scrType == "L") {
				parent.hideMenus();
				if (mainWin.x - (document.getElementById("DIVWNDContainer").offsetWidth + 12) > 0) {
					parent.document.getElementById(containerDIV).style.left = mainWin.x
							- (document.getElementById("DIVWNDContainer").offsetWidth + 12) + "px";
				} else {
					parent.document.getElementById(containerDIV).style.left = 0 + 'px';
				}
			}
			var tempCount = document.getElementById("DIVWNDContainer").style.height;
			var str = navigator.appName;
			tempCount = tempCount.substring(0, tempCount.indexOf('px'));
			document.getElementById(parent.gwinFuncId).style.display = "BLOCK";
			selectedFuncId = parent.gwinFuncId;
			if (parent.gwinFuncId.charAt(2) == 'D') {
				parent.gIsSummary = 0;
			} else {
				document.getElementById("RadInfraHeaderButtons").style.display = "none";
				parent.gIsSummary = -1;
			}
			fnReset();
			disableForm();
			fnEnableLogButtons();

			try {
				parent.gMsgxml = eval("msgxml_" + parent.gwinFuncId.toLowerCase());
				if (parent.gwinFuncId == 'TCDRCEXC') {
					gPkField = "TCTB_RC_EXEC_MASTER.RC_CODE";
				} else {
					gPkField = pkArray[parent.gwinFuncId];
				}
			} catch (e) {
			}

			if (parent.gIsSummary == 0 && parent.gwinFuncId != 'TCDBLKDT')
				createAdmnDom();
			if (parent.gfromSummary && parent.gIsSummary == 0) {
				if (parent.gwinFuncId == 'TCDRCEXC') {
					gPkField = "TCTB_RC_EXEC_MASTER.EXEC_REF_NO";
				}
				document.getElementById(gPkField).value = parent.gScreenPkVal;
				fnExecuteQuery();
			}
			parent.gfromSummary = false;
			parent.gScreenPkVal = "";
			parent.gGenPckgs = "YES";
			if (parent.gwinFuncId == "TCDCRREQ" || parent.gwinFuncId == "TCDRNREQ")
				enableDIVTab();
			document.getElementById('WNDtitletxt').innerHTML = document.getElementById(parent.gwinFuncId).getAttribute(
					"scrTitle");
			document.getElementById("Cls").focus();
		}

	</script>
</head>    
<body  onload="fnLoadRad();" onkeydown="return shortcut(event)">
        <div class="WNDcontainer" id="DIVWNDContainer">
            <div class="WNDtitlebar" id="WNDtitlebar" >
                <div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"><h1 class="WNDtitletxt" id="WNDtitletxt"></h1>
                    <div class="WNDbuttons">					
						<a class="WNDcls" id="INFRA_Cls" href="#nogo" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" onclick="if(this.disabled) return false; fnRADExitAll(seqNo, event)">
							<span class="LBLinv">Close</span>
						</a>	
						<a class="WNDmin" id="INFRA_Min" href="#nogo" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="Minimize" onclick="fnMinimize(seqNo, event)">
							<span class="LBLinv">Minimize</span>
						</a>
					</div>
                </div>
            </div> 
			<div class="" id="DIVScrContainer">
				<div class="DIVTwoColLyt" id="ResTree">
					<div id="PageHead" class="DIVTwoColLyt">
						<div class="DIVTwoColSectionContainer">
							<div class="WNDcontent" id="DIVScrContainer">
								<div id="ResTree" style="width:800px">        
									<div id="Dtop">
										<jsp:include page="RadInfraHeader.jsp" flush="true" /> 
									</div>                                   
									<div  id="Dright1" style="display:block">              
										<jsp:include page='<%= displayJspName %>' flush="true" />                
									</div>
								</div>
							</div> 
						</div>         
					</div>
					<div style="float:right;padding-right:20px;padding-top:25px;">
						<BUTTON  class="BTNfooter" name="Cls" style="width:60px;height:25px;" id="Cls" onclick="fnRADExitAll(seqNo, event)">Close</BUTTON>
					</div>
				</div>
			</div>
		</div>
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>	
</html>