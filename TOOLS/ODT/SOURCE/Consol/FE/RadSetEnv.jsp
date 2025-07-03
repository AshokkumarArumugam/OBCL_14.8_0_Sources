<!--
  **
  **
  ** File Name  : RadSetEnv.jsp
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
  ** Copyright Â© 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

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
        <script type="text/javascript" src="Script/JS/RadLovHandler.js"></script>
		<script type="text/javascript" src="Script/JS/RadSetEnv.js"></script>
		<script type="text/javascript" src="Script/JS/Extensible.js"></script>
		<script type="text/javascript" src="Script/JS/RadUtil.js"></script> 
        <script type="text/javascript" type="text/javascript">
        
			var uname= parent.username;			
			var g_scrType ="S";   
			var scrht = 700;
			var scrwdt= 700;				 
            var mainWin  = parent;       
            var seqNo  = parent.funcGenSeqNo;                 
            window.frameElement.name = seqNo;
			if(parent.document.getElementById("testwin"))
            parent.document.getElementById("testwin").id = seqNo;      
             			 
                function fnMouseDownEvents()
                {    
                    return true;
                }
            function fnLoad()
            {
               mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
                fnCalcHgt();
				//fncalstyle()
               // var str = navigator.appName;
               // alert(navigator.appName);
                //if(str!='Microsoft Internet Explorer')
        
                var activeObj=checkActivex();
                //new ActiveXObject("Scripting.FileSystemObject");
            
                if(!activeObj){
                
                 var obj="";
				  obj=document.getElementsByTagName('SELECT')[0];
                   obj.length=0;
                     addOption(obj,"","",true);
					 addOption(obj,  "Zip","ZIP",false);
					 addOption(obj,  "Server","SHARE",false);
                             
                }
                  
		
            } 
   </script>
   </head> 
<body onload="fnLoad();setSchema()" onkeydown="fnAccessChildScreens(event)" >
<div style="WIDTH: 611px; HEIGHT: 576px"  class="WNDcontainer" id="DIVWNDContainer">
    <div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"><h1 class="WNDtitletxt">Preferences</h1>
            <div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; exitwarn(seqNo, event)">
					<span class="LBLinv">Close</span>
				</a>
				<a class="WNDmin" href="#nogo" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="Minimize" onclick="fnMinimize(seqNo, event)">
					<span class="LBLinv">Minimize</span>
				</a>
			</div>
        </div>
    </div> 

<div style="WIDTH:100%; DISPLAY:block; HEIGHT:450px" id="frmSetEnv1">
<div style=" BORDER-BOTTOM: #b9ccf6 1px solid; BORDER-LEFT: #b9ccf6 1px solid; BACKGROUND-COLOR: #ffffff; MARGIN-TOP: 20px; margin-left:20px; margin-right:20px; WIDTH:auto; DISPLAY: block; HEIGHT: 450px; BORDER-TOP: #b9ccf6 1px solid; BORDER-RIGHT: #b9ccf6 1px solid" id="frmSetEnv">
	<div>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
	<div class="" style="clear:both; margin-left:70px">
	<fieldset class="FSTstd" style="border:none; ">
	<legend></legend>
	
		<div class="DIVText">
		<LABEL class="LBLstd"  for="RELEASE_CODE_SETENV">Release Code</LABEL>
		<INPUT aria-required="false"  class="TXTstd" type="text"  id="RELEASE_CODE_SETENV" value="" name="RELEASE_CODE_SETENV" DBC="RELEASE_CODE" size="40">
		<BUTTON class="BTNimg" title="List Of Values" tabindex="-1" id="LOV_REL_CODE"  onclick="LOV_SETENV_RELCODE.show_lov('RELEASE_CODE_SETENV~','frmTCM','USER_ID~USER_ID', 'Release Code', 'Release Code~Release Type', 'Release Code~Release Type',event);fnUserpvalid();">
		<span class="ICOlov"></span></BUTTON>
		</div>
		
		<div class="DIVText">
		<LABEL class="LBLstd"  for="ENV_CODE">Environment Code</LABEL>
		<INPUT aria-required="false" type="text" class="TXTstd"  name="ENV_CODE" id="ENV_CODE" size="40">
		<BUTTON class="BTNimg" title="List Of Values" tabindex="-1"  id="LOV_ENV_CODE"  onclick="LOV_SETENV_ENVCODE.show_lov('ENV_CODE~ENV_DESC~ENV_LANG_CODE','frmSetEnv','RELEASE_CODE_SETENV', 'Environment', 'Environment Code', 'Environment Code',event)">
        <span class="ICOlov"></span></BUTTON>
		</div>

		<div class="DIVText">
		<LABEL class="LBLstd" for="ENV_LANG_CODE">Language</LABEL>
		<INPUT aria-required="false" type="text" class="TXTstd"  id="ENV_LANG_CODE" value="" name="ENV_LANG_CODE" size="">
		 <BUTTON class="BTNimg" title="List Of Values" tabindex="-1"  id="LOV_LANG"  onclick="LOV_LANG_CODE.show_lov('ENV_LANG_CODE~','frmSetEnv','', 'Language', 'Language Code~Language Desc', 'Language Code~Language Desc',event)">
        <span class="ICOlov"></span></BUTTON>
		</div>
	
		<div class="DIVText">
		<LABEL class="LBLstd"  id="LBL_SAVEFORMAT" for="SAVEFORMAT">Save Mode</LABEL>
		<SELECT aria-required="false" name="SAVEFORMAT" id="SAVEFORMAT" onchange="fnUsersaveformat()"> 							
			        <option value=""></option>
					<option value="CLIENT">Client</option>
					<option value="ZIP">Zip</option>
					<option value="SHARE">Server</option>
					</SELECT>
		</div>
		
		<div class="DIVText">
		<LABEL class="LBLstd" id="LBL_USER_DIR" for="USER_DIR">Work Directory</LABEL>
		<INPUT aria-required="false"  class="TXTstd" type="text" id="USER_DIR" name="USER_DIR" size="">
		</div>
		
		<div class="DIVText">
		<LABEL class="LBLstd"  id="LBL_SAVEFORMAT" for="XLFORMAT">Excel format</LABEL>
		<SELECT aria-required="false" name="XLFORMAT" id="XLFORMAT"> 							
			        <option value="XLS">XLS</option>
                    <option value="XLSX">XLSX</option>
		</SELECT>
		</div> 
	
		<div class="DIVText" role="group" aria-labelledby="groupidpymt">
		<b class="LBLstd" id="groupidpymt">&nbsp;</b>
		<div class="DIVchkrad">
		<LABEL class="LBLauto" for="XMLFORMAT">
		<INPUT aria-required="false" type="checkbox" class="CHKstd" name="XMLFORMAT" id="XMLFORMAT">XML Indentation</LABEL>
		</div>
		</div> 
		
	</fieldset>
	</div>
	<div>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
	<div class="" style="clear:both; margin-left:70px">
		<fieldset class="FSTstd" style="width:75%">
		<legend>Release Details</legend>
	
		<div class="DIVText">
		<LABEL class="LBLstd"  for="REL-CD">Release Code:</LABEL>
		<INPUT aria-required="false"  tabindex="-1" class="envdetails" type="text"  id="REL-CD" size="25">
		</div>
		
		<div class="DIVText">
		<LABEL class="LBLstd"  for="REL-TP">Release Type:</LABEL>
		<INPUT aria-required="false" tabindex="-1" type="text" class="envdetails"   id="REL-TP" size="25">
		</div>

		</fieldset>
	</div>
	<div>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>

	<div class="" style="clear:both; margin-left:70px">
	<fieldset class="FSTstd" style="width:75%">
	<legend>Environment Details</legend>
	
		<div class="DIVText">
		<LABEL class="LBLstd" style="width:150px" for="ENV-DESC">Environment Description:</LABEL>
		<INPUT aria-required="false" tabindex="-1" class="envdetails" type="text"  id="ENV-DESC" size="25">
		</div>
		
		<div class="DIVText">
		<LABEL class="LBLstd"  for="ENV-SCHME">Schema:</LABEL>
		<INPUT aria-required="false" tabindex="-1" type="text" class="envdetails"  id="ENV-SCHME" size="25">
		</div>

		<div class="DIVText">
		<LABEL class="LBLstd" for="ENV-LNG">Language:</LABEL>
		<INPUT aria-required="false" tabindex="-1" type="text" class="envdetails"  id="ENV-LNG" size="">
		</div>

	</fieldset>
	</div> 
	<div>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
	<div>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
</div>
</div>
	<div style="TEXT-ALIGN: right; MARGIN-TOP: 8px; PADDING-RIGHT: 30px; CLEAR: both">
		<BUTTON style="WIDTH: 35px; HEIGHT: 25px" class="BTNfooter" title="Choose" onclick="postData();" name="BTN_SET" value="BTN_SET">OK</BUTTON>
 		<BUTTON style="HEIGHT: 25px" id="Cancel" class="BTNfooter" onclick="fnRADExitAll(seqNo, event)" name="Cancel">Close</BUTTON>
	</div>
<div style="display:none"> 
<INPUT aria-required="false"  type="text"  id="USER_ID" name="USER_ID" value="" style="visibility:hidden">
</div>
</div>
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>  
</body>
</html>