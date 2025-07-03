<!--
  **
  **
  ** File Name  : RadNotify.jsp
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
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
		<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>
		 <script type="text/javascript" src="Script/JS/RadUtil.js"></script>
		 <script type="text/javascript" src="Script/JS/RadInfraUtil.js"></script>
		 <script type="text/javascript" src="Script/JS/RadLoadandGen.js"></script>
		 <script type="text/javascript" src="Script/JS/RadNotify.js"></script> 
         <script type="text/javascript" src="Script/JS/Extensible.js"></script>		 
		 <script type="text/javascript" src="Script/JS/RadAllowedOperations.js"></script>
		 <script type="text/javascript" src="Script/JS/RADReadWriteFiles.js"></script> 
         <script type="text/javascript" src="Script/JS/RadUIUtils.js"></script>
         <script type="text/javascript" src="Script/JS/RadLovHandler.js"></script>
         <script>
				
                var g_scrType ="L";                
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
            function fnLoadRad()
            {
                mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
                fnCalcHgt();
                document.getElementById("DIVScrContainer").style.width  =document.getElementById("DIVWNDContainer").style.width 
                var  tempCount = document.getElementById("DIVWNDContainer").style.height;
                
                tempCount = tempCount.substring(0,tempCount.indexOf('px'));                                                
                document.getElementById("Dright1").style.height = (tempCount -(document.getElementById("WNDtitlebar").offsetHeight + document.getElementById("Dtop").offsetHeight) )+'px';
                document.getElementsByName("NTFY_ACTION")[0].focus();               
                
            }
			var isNS = (navigator.appName == "Netscape") ? 1 : 0;
			  if(navigator.appName == "Netscape") 
			  document.captureEvents(Event.MOUSEDOWN||Event.MOUSEUP);
			  function mischandler(){
			   return false;
			 }
			  function mousehandler(e){
				var myevent = (isNS) ? e : event;
				var eventbutton = (isNS) ? myevent.which : myevent.button;
				if((eventbutton==2)||(eventbutton==3)) return false;
			 }
			 document.oncontextmenu = mischandler;
			 document.onmousedown = mousehandler;
			 document.onmouseup = mousehandler;

</script>
</head> 
<body onload="fnLoadRad();fnNtfyActions();" onKeyDown="FnNotifEvnt(event)";>
<div class="WNDcontainer" id="DIVWNDContainer" border="2">
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"> <h1 class="WNDtitletxt">Notification Maintenance</h1>
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="RADNOTIFCLOSE" name="RADNOTIFCLOSE" onclick="fnRADExitAll(seqNo, event)">
					<span class="LBLinv">Close</span>
				</a>
				<a class="WNDmin" href="#nogo" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="Minimize" onclick="parent.fnMinimize(seqNo, event)">
					<span class="LBLinv">Minimize</span>
				</a>
			</div>
		</div>
	</div>
	<div class="WNDcontent" id="DIVScrContainer">
		<div id="ResTree">        
		<div id="Dtop">
		<jsp:include page="RadNtfyHdr.jsp" flush="true" /> 
		</div>  
		<div  id="Dright1" style="display:block">              
		<jsp:include page="RadNtfyDtls.jsp" flush="true" />                
		</div>
		</div>
	</div> 
</div>
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>