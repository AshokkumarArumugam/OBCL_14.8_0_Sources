<!--
  **
  **
  ** File Name  : RadRestArgs.jsp
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
<TITLE> Amendable Details -- <%=ODTUtils.stripXSS(request.getParameter("Title")) %> </TITLE>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
<script type="text/javascript" src="Script/JS/RadRestArgs.js" ></script>
<script type="text/javascript" src="Script/JS/RadAccessibility.js" ></script>
<script type="text/javascript" src="Script/JS/RadUtil.js" ></script>
<script type="text/javascript" src="Script/JS/RADReadWriteFiles.js"></script>
<script type="text/javascript"> 
var RestOperation='<%=ODTUtils.stripXSS(request.getParameter("Title"))%>'; 
var req = "";
res = "";
parent.CSRFtoken = parent.parent.CSRFtoken
parent.usersequence= parent.parent.usersequence; 
</script>
</head> 
<body class="BODYDetails"  onload="fnInValues();"  onkeydown="fnAccessChildScreens(event)" onKeyDown="return parent.shortcut(event)"; onKeyDown="parent.parent.windowCtrl(event);">
<div  id="DIVWNDContainer1">
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt"><%=ODTUtils.stripXSS(request.getParameter("Title"))%></h1>                                      
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
		</div>
    </div> 
    
    <div class="DIVHeader" style="width:100% ">
	<table role="presentation" summary="" class="TABLELyt" width="100%"  border="0" TYPE="SINGLE" NAME="RADMN" id="RADMN" VIEW="NO" cellpadding="1" cellspacing="0"> 
        <tr>
			 
			<td align="right"><LABEL id="CALLFORM_RST" value="Rest Callform" for="CALLFORM_RST">Callform</LABEL><SELECT aria-required="false" id=CALLFORM_NAME style="WIDTH: 100px; HEIGHT: 20px" name=CALLFORM_NAME ><OPTION></OPTION> </SELECT></td>
			<td align="right"><LABEL id="LBL_NTFY_LOAD_XML" value="Load Screen Xml" for="FILE_SAVE_PATH">Load Radxml</LABEL></td>
			<td><INPUT aria-required="false" type="file" name ="NTFY_LOAD_SCREEN_XML" id ="NTFY_LOAD_SCREEN_XML"size="10" style="display:none;position:absolute" disabled="true"/>                                        
				<INPUT aria-required="false" type="text" name="FILE_SAVE_PATH" id="FILE_SAVE_PATH" title="" value="" size="20" disabled="true"/>                                        
				<INPUT aria-required="false" type="button"  class="BTNfooter" name ="BROWSE" id ="BROWSE" value="BROWSE" onclick="loadBrowserXML(event)"/> 			
			</td>
			<td>
			 <BUTTON type="button"  class="BTNfooter" onclick="fnDefaultCallformFlds()" id="BTN1_Deflt" name="BTN1_Deflt">Default Operations</BUTTON>&nbsp; 
		  </td> 
        </tr> 
	</table>
</div> 

<div class="DIVTabPageContent">		
    <div class="DIVmultiplebox">
	<table  border="0" cellspacing="0" cellpadding="3" width="100%">	
     	<tr>
            <td style="width:45%">
			<div style="width:100%;border:1px solid #a2c2e5; background:#ffffff;">
				<table width="100%" id="DatablkfldsSUM" name="DatablkfldsSUM" border="0" cellspacing="0" cellpadding="1">
				<tr>
					<th class="THgrid" scope="col"><span>Data Blocks</span></th>
				</tr>
				<tr>
				<td align="right" style="width:100%;">
				<SELECT aria-required="false" size="10" style="height:340px;width:100%;border:1px solid #CCCCCC" title="Data Blocks" name="DATABLK_LIST " id="DATABLK_LIST" onkeydown="if(event.keyCode== 13 || event.keyCode== 32) showBlkFlds()" onchange="showBlkFlds()" ></SELECT>
				</td>
				</tr>
				</table>
			</div>
			</td>
            <td>&nbsp;</td>
            <td style="width:55%"> 
                <div style=" height:305px;width:100%;overflow:auto; border:1px solid #a2c2e5; background:#ffffff;">
	    		 	<table onKeyDown="FnAcessTblkeys(this,event);" width="100%" class="TABLEData" id="REST_ARGS_TABLE" TYPE="MULTIPLE" VIEW="NO" PARENT="YES"  border="0" cellpadding="0" cellspacing="0">
						<tHead>
							<th scope="col" class="THgrid"><LABEL>Field Name</LABEL></th>
							<th scope="col" class="THgrid"><LABEL>Request</LABEL></th>
							<th scope="col" class="THgrid"><LABEL>Response</LABEL></th>
						</tHead>
						<tbody></tbody>
						<tfoot><tr><td scope="row" tabindex="0" id="actBlkFlds_TE" name="actBlkFlds_TE" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
					</table>
				</div>
            </td>
        </tr>
	</table>
	</div>
	<div style="margin-top:10px;float:right;">
	     <BUTTON class="BTNfooter" name="OK" style="height:25px;width:35px" id="ok"  onclick="returnAmnds();fnRADExitSub('ChildWin', event)" >Ok</BUTTON>
         <BUTTON class="BTNfooter" name="Cancel" style="height:25px;width:60px"  id="Cancel"  onclick="fnRADExitSub('ChildWin', event)" >Cancel</BUTTON>  
	</div>
</div>
</div>
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div> 
</body>
</html>