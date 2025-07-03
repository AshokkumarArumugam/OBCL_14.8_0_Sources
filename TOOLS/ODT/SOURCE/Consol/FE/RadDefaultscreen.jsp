<!--
  **
  **
  ** File Name  : RadDefaultscreen.jsp
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
  ** Copyright © 2008 - 2009 Oracle Financial Services Software Limited. All rights reserved.

  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  

-->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
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
   <html>
   <head>
       <link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>  
        <script language="JavaScript" src="Script/JS/<%=js_parser%>"></script> 
		<script language="JavaScript" src="Script/JS/RadUtil.js"></script>
        <script language="JavaScript" src="Script/JS/RadUIUtils.js" ></script>
		<script language="JavaScript" src="Script/JS/RadLovHandler.js"></script> 
        <script language="JavaScript" type="text/javascript">
        
        var uname= parent.username;
        var schm = parent.radSchema;
		var g_scrType ="S";   
		var scrht = (screen.availHeight/3);
		var scrwdt= screen.availWidth/3;			
		
				 var mainWin  = parent;       
                 var seqNo  = parent.funcGenSeqNo;                 
                 window.frameElement.name = seqNo;
				 if(parent.document.getElementById("testwin"))
                 parent.document.getElementById("testwin").id = seqNo;      
                  
           function fnInValues(){
                            
							parent.document.getElementById("IFCHILD").style.width="650px";
							parent.document.getElementById("IFCHILD").style.height="600px"; 
							
            }
			
			function fnGLOBAL_VALUES()
			{
			document.getElementById("LABEL_CODE").value="";
			}
			function fnLabel_VALUES()
			{
			document.getElementById("GLOBAL_VALUES").value="";
			}
			 
function postData() {  

if(document.getElementById("LABEL_CODE").value=="" && document.getElementById("GLOBAL_VALUES").value!="")
{
parent.document.getElementById("DEFAULT_VALUE").value=document.getElementById("GLOBAL_VALUES").value;
}
else if(document.getElementById("GLOBAL_VALUES").value=="" && document.getElementById("LABEL_CODE").value!="")
{
parent.document.getElementById("DEFAULT_VALUE").value=document.getElementById("LABEL_CODE").value; 
}
fnRADExitSub('ChildWin', event);
}

function getdlgattrs()
       {
           var schem=parent.jndiName;        
           document.getElementById("Cancel").focus();
       }
   </script>
   </head> 
<body onload="getdlgattrs();fnInValues()" onkeydown="fnAccessChildScreens(event)" style="height:100%;width:100%" SCROLL="NO">
 <div id="DIVWNDContainer1">
  <div class="WNDtitlebar" id="WNDtitlebar" >
	<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Default Value</h1>                                      
		<div class="WNDbuttons">
			<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
				<span class="LBLinv">Close</span>
			</a>
		</div>
   </div>
 </div> 

<div class="Div_small" id="ResTree"  style="width:21em; border:none">
<fieldset class="FSTcell"> 
	
	<div class="DIVText">
	<LABEL  for="LABEL_CODE" class="LBLstd" >Label code</LABEL>
	 <INPUT aria-required="false" class="TXTstd" type="text" id="LABEL_CODE" name="LABEL_CODE" onchange="upper(this)"></INPUT>
     <BUTTON   class="BTNimg" title="List Of Values" tabindex="-1" onclick="LOV_LABEL_CODE.show_lov('LABEL_CODE~','frmTCM','', 'Label Code', 'Label Code~Label Description', 'Label Code~Label Description',event);fnLabel_VALUES();">
     <span class="ICOlov"></span></BUTTON>
	</div>
	
	<div class="DIVText">
	<LABEL class="LBLstd" for="GLOBAL_VALUES">Global Values</LABEL>
	<SELECT aria-required="false" class="SELstd" name="GLOBAL_VALUES" id="GLOBAL_VALUES" onChange="fnGLOBAL_VALUES()" >
	    <option value=""></option> 
		<option value="global.HOBranch">HOBranch</option> 
        <option value="global.BankCode">BankCode</option>
        <option value="global.Lcy">Lcy</option>
        <option value="global.countryOfficeCode">countryOfficeCode</option> 
        <option value="global.CurrentBranch">CurrentBranch</option>
        <option value="global.CurrentLV">CurrentLV</option> 
        <option value="global.UserId">UserId</option>
        <option value="global.AppDate">AppDate</option>
        <option value="global.LangCode">LangCode</option>
        <option value="global.BranchEoi">BranchEoi</option>
        <option value="global.countryCode">countryCode</option> 
        <option value="global.HostCode">HostCode</option> 
	</SELECT>
	</div>
 
</fieldset>
            
<div style="text-align:right; margin-top:10px;padding-right:35px; clear:both">
	<BUTTON class="BTNfooter" name="OK"  id="ok" onclick="postData()" style="visibility:visible;height:25px;width :35px;">Ok</BUTTON>
	<BUTTON class="BTNfooter" id="Cancel" name="Cancel" onclick="fnRADExitSub('ChildWin', event)"  style="height:25px;width :60px;">Cancel</BUTTON>
</div>
	</div>
	</div> 
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div> 
</div>
</body> 
</html> 
   