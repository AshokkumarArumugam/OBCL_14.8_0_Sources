<!--
  **
  **
  ** File Name  : RadLog.jsp
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
  ** Copyright � 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  

-->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
	<title>Log Details</title>
	<link rel="stylesheet" type="text/css" href="Theme/RAD.css" />
	<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
	<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
		<script type="text/javascript" src="Script/JS/RadUIUtils.js"></script>
             <script type="text/javascript">
             //var dlg=dialogArguments;
        function fnlogdtls(){

           document.getElementById("ERR_LOG_DTLS").value=parent.errLogMsg;
           document.getElementById("ERR_LOG_DTLS").readOnly=true;
           document.getElementById("INF_LOG_DTLS").value=parent.logMsg;
           document.getElementById("INF_LOG_DTLS").readOnly=true;

		   parent.document.getElementById("IFCHILD").style.width="565px";
		   parent.document.getElementById("IFCHILD").style.height="640px";
		   parent.document.getElementById("IFCHILD").scrolling='yes';
        }
        </script>

	</head>
<body  onload="fnlogdtls()">

  <DIV class="WNDtitlebar" id="WNDtitlebar" >
                <div class="WNDtitle" onmousedown="startDrag('ChildWin', event)">                   
                    <h1 class="WNDtitletxt">Log Details</h1>                                      
                    <div class="WNDbuttons">
					<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" onclick="if(this.disabled) return false; fnRADChildExitSub('ChildWin', event)">
						<span class="LBLinv">Close</span>
					</a>
					<a class="WNDmin" href="#nogo" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="Minimize">
						<span class="LBLinv">Minimize</span>
					</a>
				</div>
                </div>
            </DIV>
			 <div class="WNDcontent" id="wndwidth">
			  <div id="ResTree" class="DIVTwoColLyt">

 <h2>Error Messages</h2>
  <textarea name="ERR_LOG_DTLS" id="ERR_LOG_DTLS" cols="100" rows="5" value="" onload="this.value=''"></textarea>
  <h2>Information Messages</h2>
  <textarea name="SES_LOG_DTLS" id="INF_LOG_DTLS" cols="100" rows="15" value="" onload="this.value=''"></textarea> 

<div align="right">
<BUTTON class="BTNfooter" name="ok"  id="ok"  style="height:25px;width :45px;" onclick="fnRADChildExitSub('ChildWin', event)"><sup>Ok</sup></BUTTON>
</div>

</div></div>
</body>
</html>