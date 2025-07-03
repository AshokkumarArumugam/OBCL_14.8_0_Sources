<!--
  **
  **
  ** File Name  : RadIndex.jsp
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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap" %>
<%@page import="com.ofss.odt.util.ODTUtils"%>
<%
	String js_parser = "";
	String js_Delta = "";
        String js_ScrCorrection = "";
	String userAgent = request.getHeader("USER-AGENT").toUpperCase();
	if(userAgent.contains("MSIE") || (userAgent.contains("TRIDENT") && userAgent.contains("RV"))) {//ie11 changes
     	js_parser = "BROWSER_IE.js";
		js_Delta  = "RadDeltaHandler.js";
		js_ScrCorrection="RadScreenCorrection.js";
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
	    <script type="text/javascript" src="Script/JS/<%=js_Delta%>"></script>
        <script type="text/javascript" src="Script/JS/<%=js_ScrCorrection%>"></script>		
		<script type="text/javascript" src="Script/JS/Extensible.js"></script>		
	    <script type="text/javascript" src="Script/JS/RadUtil.js"></script>
        <script type="text/javascript" src="Script/JS/RadLoadandGen.js"></script>
        <script type="text/javascript" src="Script/JS/RadUIUtils.js"></script>
        <script type="text/javascript" src="Script/JS/RadValidations.js"></script>		
        <script type="text/javascript" src="Script/JS/RadMultipleTables.js"></script>
        <script type="text/javascript" src="Script/JS/RadLovHandler.js"></script>
        <script type="text/javascript" src="Script/JS/RadUIXMLGenerator.js"></script>
        <script type="text/javascript" src="Script/JS/RadAllowedOperations.js"></script>
		<script type="text/javascript" src="Script/JS/RadGlobals.js"></script>
        <script type="text/javascript" src="Script/JS/RadTree.js"></script>
		<script type="text/javascript" src="Script/JS/RadDomCreator.js"></script>
        <script type="text/javascript" src="Script/JS/RadHandler.js"></script>
        <script type="text/javascript" src="Script/JS/RadContext-menu.js"></script>
    	<script type="text/javascript" src="Script/JS/RadDragNDropHandler.js"></script>
        <script type="text/javascript" src="Script/JS/RadSelectColumns.js"></script>
        <script type="text/javascript" src="Script/JS/RadPreview.js"></script>
        <script type="text/javascript" src="Script/JS/RadSysfileCreation.js"></script>
		<script type="text/javascript" src="Script/JS/RadDeleteRename.js"></script>
        <script type="text/javascript" src="Script/JS/RadSearch.js"></script>
		<script type="text/javascript" src="Script/JS/RadOrderCorrection.js"></script>        
        <script type="text/javascript" src="Script/JS/RadHeader.js"></script> 
	    <script type="text/javascript" src="Script/JS/RADReadWriteFiles.js"></script>
        <script type="text/javascript" src="Script/JS/RadViewChanges.js"></script>  
        <script type="text/javascript" src="Script/JS/RadAccessibility.js"></script> 
	    <script>
var g_scrType = "L";
var loadxmldata = "";
var mainWin = parent;
var seqNo = parent.funcGenSeqNo;
window.frameElement.name = seqNo;
if (parent.document.getElementById("testwin"))
    parent.document.getElementById("testwin").id = seqNo;
var gen_gwinFuncId = parent.parent.gwinFuncId;

function buildOptions(targetId) {
    var targetE = targetId.id;
    if (targetE == "TXN_BLOCK_NAME") {
		removeAll(targetE);
        var nodes = selectNodes(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_DATA_BLOCKS");
        addOpt("Choose Block", "TXN_BLOCK_NAME");
        for (var i = 0;i < nodes.length;i++) {
            var option = getNodeText(selectSingleNode(nodes[i], "BLOCK_NAME"));
            addOpt(option, targetE);
        }
    }
	else if (targetE == "SRC_FIELD_NAME") {
        removeAll(targetE);
        var Block_cname = document.getElementById("SRC_BLOCK_NAME").value;
        nodes1 = selectNodes(dom, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + Block_cname + "']/RAD_BLK_FIELDS")
        addOpt("Choose Field", "SRC_FIELD_NAME")
        for (var i = 0;i < nodes1.length;i++) {
            var option = getNodeText(selectSingleNode(nodes1[i], "FIELD_NAME"));
            addOpt(option, targetE);
        }
    }
    else if (targetE == "SRC_BLOCK_NAME") {
        removeAll(targetE);
        var nodes = selectNodes(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_DATA_BLOCKS");
        addOpt("Choose Block", "SRC_BLOCK_NAME")
        for (var i = 0;i < nodes.length;i++) {
            var option = getNodeText(selectSingleNode(nodes[i], "BLOCK_NAME"));
            addOpt(option, targetE);
        }
    }
    else if (targetE == "TXN_FIELD_NAME") {
        removeAll(targetE);
        var Block_cname = document.getElementById("TXN_BLOCK_NAME").value;
        nodes1 = selectNodes(dom, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + Block_cname + "']/RAD_BLK_FIELDS")
        addOpt("Choose Field", "TXN_FIELD_NAME")
        for (var i = 0;i < nodes1.length;i++) {
            var option = getNodeText(selectSingleNode(nodes1[i], "FIELD_NAME"));
            addOpt(option, targetE);
        }
    }
    if (document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD" && targetE == "SCREEN_SIZE") {
        removeAll(targetE);
        addOpt("Small", targetE);
        addOpt("Medium", targetE);
    }
    if (document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD" && targetE == "SUM_SCREEN_SIZE") {
        removeAll(targetE);
        addOpt("Small", targetE);
    }
    if ((document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD" && targetE == "RELATION_TYPE_DSR") || (document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD" && targetE == "RELATION_TYPE")) {
        removeAll(targetE);
        addOpt("One to One", targetE);
    }
    if ((document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD" && targetE == "BLK_MULTI_RECORD") || (document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD" && targetE == "MULTI_RECORD_DSR")) {
        removeAll(targetE);
        addOpt("No", targetE);
    }
    if ((document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD" && targetE == "DISPLAY_TYPE_BLKF")) {
        removeAll(targetE);
        addOpt("Text", targetE);
        addOpt("Amount", targetE);
        addOpt("Date", targetE);
        addOpt("Link", targetE);
        addOpt("CheckBox", targetE);
    }
}

function addOpt(value, e) {
    // Create an Option object   
    var opt = document.createElement("option");
    // Add an Option object to Drop Down/List Box
    document.getElementById(e).options.add(opt);
    // Assign text and value to Option object
    opt.text = value;
    if (value == "Choose Field" || value == "Choose Block") {
        opt.value = "";
    }
    else if (value == "One to One") {
        opt.value = "1";
    }
    else if (value == "No") {
        opt.value = "N";
    }
    else {
        opt.value = value.toUpperCase();
    }
}

function removeAll(e) {
    document.getElementById(e).options.length = 0;
}

function fnLoadRad() {
    mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
    fnCalcHgt();
    document.getElementById("DIVScrContainer").style.width = document.getElementById("DIVWNDContainer").style.width;
    var tempCount = document.getElementById("DIVWNDContainer").style.height;
    var str = navigator.appName;
    tempCount = tempCount.substring(0, tempCount.indexOf('px'));
    document.getElementById("Dright").style.height = (tempCount - (document.getElementById("WNDtitlebar").offsetHeight + document.getElementById("Dtop").offsetHeight) - 46) + 'px';
/*     if (str == 'Microsoft Internet Explorer') {
        document.getElementById("Dleft").style.height = (tempCount - (document.getElementById("WNDtitlebar").offsetHeight + document.getElementById("Dtop").offsetHeight) - 46) + 'px';
        document.getElementById("treebody").style.height = (document.getElementById("Dleft").offsetHeight) - (document.getElementById("SearchHead").offsetHeight) + "px";

    }
    else { */
        document.getElementById("Dleft").style.height = (tempCount - (document.getElementById("WNDtitlebar").offsetHeight + document.getElementById("Dtop").offsetHeight) - 46) + 'px';
        document.getElementById("treebody").style.height = (document.getElementById("Dleft").offsetHeight) - (document.getElementById("SearchHead").offsetHeight + 10) + "px";

   // }
    parent.hideMenus();

}

var isNS = (navigator.appName == "Netscape") ? 1 : 0;
if (navigator.appName == "Netscape")
    document.captureEvents(Event.MOUSEDOWN || Event.MOUSEUP);

function mischandler() {
    return false;
}

function mousehandler(e) {
    var myevent = (isNS) ? e : event;
    var eventbutton = (isNS) ? myevent.which : myevent.button;
    if ((eventbutton == 2) || (eventbutton == 3))
        return false;
}
document.oncontextmenu = mischandler;
document.onmousedown = mousehandler;
document.onmouseup = mousehandler;

function fnLoadRadXMLFORNONIE(p_funcId) {
    xml2 = loadxmldata;
    Loadxml();
    if (document.getElementById('ACTION').value == "LOAD") {
        if (document.getElementById('FUNCTION_TYPE').value == "P") {
            document.getElementById('FILE_SAVE_PATH').value = p_funcId;
            document.getElementsByName("FILE_SAVE_PATH")[0].disabled = false;
            document.getElementById('FILE_SAVE_PATH').style.visibility = "visible";
            document.getElementsByName("BROWSE")[0].disabled = true;
        }
        else {
            document.getElementById('FILE_SAVE_PATH').value = p_funcId;
            document.getElementsByName("FILE_SAVE_PATH")[0].disabled = false;
            document.getElementById('FILE_SAVE_PATH').style.visibility = "visible";
            document.getElementsByName("BROWSE")[0].disabled = true;
            document.getElementsByName("PARENT_XML")[0].disabled = true;
            document.getElementById('PARENT_XML').style.visibility = "visible";
            document.getElementsByName("BROWSEPRNT")[0].disabled = true;
        }
    }
    else {
        document.getElementsByName("FILE_SAVE_PATH")[0].disabled = true;
        document.getElementById('FILE_SAVE_PATH').style.visibility = "visible";
        document.getElementsByName("BROWSE")[0].disabled = true;
        document.getElementById('PARENT_XML').value = p_funcId;
        document.getElementsByName("PARENT_XML")[0].disabled = false;
        document.getElementById('PARENT_XML').style.visibility = "visible";
        document.getElementsByName("BROWSEPRNT")[0].disabled = true;
    }
    enableMasterFlds1();
    buildOptions(document.getElementById('SUM_SCREEN_SIZE'));
    buildOptions(document.getElementById('SCREEN_SIZE'));
    buildOptions(document.getElementsByName('RELATION_TYPE')[0]);
    buildOptions(document.getElementById('DISPLAY_TYPE_BLKF'));
    buildOptions(document.getElementById('BLK_MULTI_RECORD'));
    buildOptions(document.getElementById('MULTI_RECORD_DSR'))

}

function setWindowAct() {
    if (g_scrType = "L") {
        inputId = "dhtmlgoodies_a1" + '';
        var numericId = inputId.replace(/[^0-9]/g, '');
        var answerDiv = parent.document.getElementById('dhtmlgoodies_a' + numericId);
        if (answerDiv && answerDiv.style.display != 'none') {
            parent.hideMenus();
        }
    }
    if (mainWin.document.getElementById(seqNo)) {
        mainWin.setActiveWindow(mainWin.document.getElementById(seqNo), window);
    }
}

function fnsetTitle() {
    if (parent.gwinFuncId == "RDDFNCGN" || parent.gwinFuncId == "RDDLNPGE") {
        setInnerText(document.getElementById("fnTtl"), "Function Generation");
        debug('Opened Function Generation Screen');
    }
    else if (parent.gwinFuncId == "RDDSCRDF") {
        setInnerText(document.getElementById("fnTtl"), "Screen Customization");
        document.getElementById("FILE_SAVE_PATH").focus();
        debug('Opened Screen Customization');
    }
    else if (parent.gwinFuncId == "RDDVWCHG") {
        setInnerText(document.getElementById("fnTtl"), "View Changes");
        debug('Opened View Changes');
    } 
}

function disableHeaderButtons() {
    if (parent.vwChg == 'Y') {
        document.getElementById("saveRADXml").disabled = true;
        document.getElementById("missingLabels").disabled = true;
        document.getElementById("genFiles").disabled = true;
        document.getElementById("depFiles").disabled = true;
        document.getElementById("chekinFiles").disabled = true;
        document.getElementById("FILE_SAVE_PATH").focus();
    }
    if (parent.gwinFuncId == "RDDSCRDF") {
        document.getElementById("FILE_SAVE_PATH").focus();
    }
    /*if (navigator.appName == "Microsoft Internet Explorer") {
      	 alertMessage("Please use Mozilla/Chrome", "E");
      	document.getElementById("ACTION").disabled = true;
      	return;
      }*/
}

function loadRADXMLData() {
    if (parent.vwChg == 'Y') {
        loadSubScreenDIV("ChildWin", "RadViewChild.jsp?Title=");
    }
    var radXml = fnReadMode("", document.getElementsByName("LOAD_SCREEN_XML")[0].value, document.getElementsByName("LOAD_SCREEN_XML")[0]);
    loadxmldata = radXml;
    fnLoadRadXMLFORNONIE(document.getElementsByName("LOAD_SCREEN_XML")[0].value);

}
</script>
</head>    
<body  onload="fnsetTitle();getSchemadetails();loadDOM();fnLoadRad();enableHeaderAction();disableAll2();paintTreeMenu();getGlobalLovs();disableHeaderButtons();" onclick ="setWindowAct();" onKeyDown="return shortcut(event)" onKeyDown="parent.windowCtrl(event);" onhelp="disableDefault();">         
    <div class="WNDcontainer" id="DIVWNDContainer" border="2">
            <div class="WNDtitlebar" id="WNDtitlebar" >
                <div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"><h1 class="WNDtitletxt" id="fnTtl"></h1>
                    <div class="WNDbuttons">
						<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" id="RADINDEXCLOSE" name="RADINDEXCLOSE" onmouseout="this.className='WNDcls'" title="Close" onclick="fnRADExitAll(seqNo, event)">
							<span class="LBLinv">Close</span>
						</a>
						<a class="WNDmin" href="#nogo" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" id="RADINDEXMINIMIZE" name="RADINDEXMINIMIZE" onmouseout="this.className='WNDmin'" title="Minimize"  onclick="fnMinimize(seqNo, event)">
							<span class="LBLinv">Minimize</span>
						</a>
					</div>
                </div>
            </div>            
            <div class="WNDcontent" id="DIVScrContainer">
              <div id="ResTree">        
                <div id="Dtop">
                   <jsp:include page="RadMain.jsp" flush="true" /> 
                </div>  
                <div id="Dleft" style="display:block">						
                    <jsp:include page="RadTree.jsp" flush="true" />
                </div>             
                <div  id="Dright" style="display:block">              
                <jsp:include page="RadDetails.jsp" flush="true" />                
                </div>                
              </div>            
            </div>         
        </div>
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>      
</body>  
</html>