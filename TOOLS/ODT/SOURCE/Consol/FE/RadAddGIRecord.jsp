<!--
  **
  **
  ** File Name  : RadAddGIRecord.jsp
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
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
        <title><%=ODTUtils.stripXSS(request.getParameter("Title")) %></title>
		<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
		<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>
        <script type="text/javascript" src="Script/JS/RadUtil.js"></script>		
		<script type="text/javascript">
		
           
        function fnGIprocess(val,action,e){            
          if(action=='rename'){
             parent.fnRenameGIrec(val,document.getElementById("RECORD_ID").value);
             fnRADExitSub('ChildWin', e);
			}else if (action=='add'){
			 parent.addGIAtrr(val,document.getElementById("RECORD_ID").value);
             fnRADExitSub('ChildWin', e);
			}            
            
        }
         function upper(r){
              r.value = r.value.toUpperCase();
         }		 
		
		 
		
        </script> 
    </head>     
    <body style="background-color:#f1f2f5;">
<div   id="DIVWNDContainer1">
<div class="WNDtitlebar" id="WNDtitlebar" >
                <div class="WNDtitle" onmousedown="startDrag('ChildWin', event)">                   
                    <h1 class="WNDtitletxt"><%=ODTUtils.stripXSS(request.getParameter("Title"))%></h1>                                      
                    <div class="WNDbuttons">
					<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
						<span class="LBLinv">Close</span>
					</a>
					<a class="WNDmin" href="#nogo" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="Minimize">
						<span class="LBLinv">Minimize</span>
					</a>
				</div>
                </div>
            </div>
	 
<div class="Div_small" id="ResTree"  style="width:21em; border:none">
	<fieldset class="FSTcell">
	<legend>&nbsp;</legend>
	
		<div class="DIVText">
		<LABEL for="RECORD_ID" class="LBLstd" style="width:100px;">Record Name</LABEL>
		<INPUT aria-required="false" type="text" id="RECORD_ID" name="RECORD_ID" onchange="upper(this)">
		</div> 

	</fieldset>
            
		<div style="text-align:right; margin-top:10px;padding-right:35px; clear:both">
			<BUTTON class="BTNfooter" name="OK"  id="ok" onclick="fnGIprocess('<%=ODTUtils.stripXSS(request.getParameter("FormatType"))%>','<%=ODTUtils.stripXSS(request.getParameter("Action"))%>',event);fnRADExitSub('ChildWin', event)"  style="visibility:visible;height:25px;width :35px;">Ok</BUTTON>
			<BUTTON class="BTNfooter" id="Cancel" onclick="fnRADExitSub('ChildWin', event);" style="height:25px;width :60px;">Cancel</BUTTON>
		</div>
    </div>	 
</div>
</body>
</html>
   	    