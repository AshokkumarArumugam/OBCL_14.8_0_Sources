<!--
  **
  **
  ** File Name  : RadGIIndex.jsp
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
		<script type="text/javascript" src="Script/JS/Extensible.js"></script>
        <script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>	
	    <script type="text/javascript" src="Script/JS/<%=js_Delta%>"></script>
        <script type="text/javascript" src="Script/JS/<%=js_ScrCorrection%>"></script>
		<script type="text/javascript" src="Script/JS/RadUIUtils.js"></script>        
        <script type="text/javascript" src="Script/JS/RadUtil.js"></script>
        <script type="text/javascript" src="Script/JS/RadDragNDropHandler.js"></script>        
        <script type="text/javascript" src="Script/JS/RadContext-menu.js"></script>
        <script type="text/javascript" src="Script/JS/RadHandler.js"></script>  
        <script type="text/javascript" src="Script/JS/RadGIHandler.js"></script>            
        <script type="text/javascript" src="Script/JS/RadGIUtils.js"></script> 
		<script type="text/javascript" src="Script/JS/RadGITree.js"></script>
        <script type="text/javascript" src="Script/JS/RadMultipleTables.js"></script> 			
        <script type="text/javascript" src="Script/JS/RadAllowedOperations.js"></script>        
        <script type="text/javascript" src="Script/JS/RadHeader.js"></script> 
		<script type="text/javascript" src="Script/JS/RadLovHandler.js"></script> 
		<script type="text/javascript" src="Script/JS/RadDomCreator.js"></script>
	    <script type="text/javascript" src="Script/JS/RadGlobals.js"></script>        	 
        <script type="text/javascript" src="Script/JS/RADReadWriteFiles.js"></script>	
        <script type="text/javascript" src="Script/JS/RadOrderCorrection.js"></script>
        <script type="text/javascript" src="Script/JS/RadGiAccessibility.js"></script>
        		  
        
	    <script>
            
                 var g_scrType ="L";     
				 var loadxmldata = "";
                 var mainWin  = parent;       
                 var seqNo  = parent.funcGenSeqNo;                 
                 window.frameElement.name = seqNo;
                if(parent.document.getElementById("testwin"))
                  parent.document.getElementById("testwin").id = seqNo; 
				var gen_gwinFuncId = parent.parent.gwinFuncId; 
              
             function fnLoadRad()
               {
			    setInnerText(document.getElementById("fnTtl"),"Generic Interface");
				mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
                fnCalcHgt();
                document.getElementById("DIVScrContainer").style.width  =document.getElementById("DIVWNDContainer").style.width 
                var  tempCount = document.getElementById("DIVWNDContainer").style.height;
                var str = navigator.appName;			
                tempCount = tempCount.substring(0,tempCount.indexOf('px'));                                                
                document.getElementById("Dright").style.height = (tempCount -(document.getElementById("WNDtitlebar").offsetHeight + 				document.getElementById("Dtop").offsetHeight) )+'px';
             /*    if(str=='Microsoft Internet Explorer')
                {
                    document.getElementById("Dleft").style.height = (tempCount -(document.getElementById("WNDtitlebar").offsetHeight + document.getElementById("Dtop").offsetHeight) )+'px';
                    document.getElementById("treebody").style.height = (document.getElementById("Dleft").offsetHeight)+ "px";				
                }
                else
                { */
                    document.getElementById("Dleft").style.height = (tempCount -(document.getElementById("WNDtitlebar").offsetHeight + document.getElementById("Dtop").offsetHeight) )+'px';

               // }
                parent.hideMenus();
                document.getElementById("ACTION").focus();
            }
            function paintTreeMenu()
            {
                    treeObj = new JSDragDropTree();
                    treeObj.setTreeId('ulTreeMenu');
                    treeObj.setMaximumDepth(7);
                    treeObj.setMessageMaximumDepthReached('Maximum depth reached'); // If you want to show a message when maximum depth is reached, i.e. on drop.
                    treeObj.initTree();
                    
            }
</script>
</head>
<body onload="disableAll2();paintTreeMenu();fnLoadRad();" onKeyDown="return shortcut(event)">
<div class="WNDcontainer" id="DIVWNDContainer" border="2">
    <div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"> <h1 class="WNDtitletxt" id="fnTtl"></h1>
            <div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="RADGIINDEXCLOSE" name="RADGIINDEXCLOSE" onclick="fnRADExitAll(seqNo, event)">
					<span class="LBLinv">Close</span>
				</a>
				<a class="WNDmin" href="#nogo" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="Minimize" id="RADGIINDEXMIN" name="RADGIINDEXMIN" onclick="fnMinimize(seqNo, event)">
					<span class="LBLinv">Minimize</span>
				</a>
			</div>
        </div>
    </div>  
    <div class="WNDcontent" id="DIVScrContainer">
        <div id="ResTree">      
            <div id="Dtop" >
                <jsp:include page="RadGIMain.jsp" flush="true" /> 
            </div>               
            <div id="Dleft" style="background-color: rgb(85, 113, 118);">						
                <jsp:include page="RadGITree.jsp" flush="true" />
            </div>
            <div  id="Dright" style="display:block">              
                <jsp:include page="RadGIDetails.jsp" flush="true" />                
            </div>
        </div>
    </div>  
</div>
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>