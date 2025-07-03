<!--
  **
  **
  ** File Name  : RadAmendables.jsp
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
<script type="text/javascript" src="Script/JS/RadAmendables.js" ></script>
<script type="text/javascript" src="Script/JS/RadAccessibility.js" ></script>
<script type="text/javascript" src="Script/JS/RadUtil.js" ></script>

</head> 
<body class="BODYDetails"  onload="fnInValues();"  onkeydown="fnAccessChildScreens(event)" onKeyDown="return parent.shortcut(event)"; onKeyDown="parent.parent.windowCtrl(event);">
<div  id="DIVWNDContainer1">
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Amendable Details --<%=ODTUtils.stripXSS(request.getParameter("Title"))%></h1>                                      
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
		</div>
    </div> 
<div class="DIVTabPageContent">		
    <div class="DIVmultiplebox">
	<table  border="0" cellspacing="0" cellpadding="3" width="100%">	
     	<tr>
            <td>
			<div style="width:100%;border:1px solid #a2c2e5; background:#ffffff;">
				<table width="100%" id="DatablkfldsSUM" name="DatablkfldsSUM" border="0" cellspacing="0" cellpadding="1">
				<tr>
					<th class="THgrid" scope="col"><span>Data Blocks</span></th>
				</tr>
				<tr>
				<td align="right">
				<SELECT aria-required="false" multiple style="height:340px;width:380PX;border:1px solid #CCCCCC" title="Data Blocks" name="DATABLK_LIST " id="DATABLK_LIST" onkeydown="if(event.keyCode== 13 || event.keyCode== 32) showBlkFlds()" onclick="showBlkFlds()" ></SELECT>
				</td>
				</tr>
				</table>
			</div>
			</td>
            <td>&nbsp;</td>
            <td>
	            <div style="width:100%;border:1px solid #a2c2e5; background:#ffffff;">
				    <table   name="actBlks" id="actBlks"  VIEW="NO" PARENT="NO"  border="0" cellpadding="0" cellspacing="3">
	                	<tHead>
	                    	<tr><th class="THgrid" scope="col"><span>DataBlock Fields</span></th></tr>
						</tHead>
						<tbody>
						<tr>
							<td><LABEL><INPUT aria-required="false" type="checkbox" title="New" id="NEW_ALLOWED_IN" name="NEW_ALLOWED_IN" disabled="true">New Allowed</LABEL>
     	                        <LABEL><INPUT aria-required="false" type="checkbox" title="Delete" id="DELETE_ALLOWED_IN" name="DELETE_ALLOWED_IN" disabled="true">Delete Allowed</LABEL>
								<LABEL><INPUT aria-required="false" type="checkbox" title="All Records" id="ALL_RECORDS" name="ALL_RECORDS" disabled="true">All Records</LABEL>
								<LABEL><INPUT aria-required="false" type="checkbox" title="Mandatory" id="MANDATORY_IN" name="MANDATORY_IN" disabled="true">Mandatory</LABEL>
							</td>
						</tr> 
	                    </tbody>
						<tfoot><tr><td scope="row" tabindex="0" id="actBlks_TE" name="actBlks_TE" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
					</table>
                </div>
                <div style=" height:305px;width:100%;overflow:auto; border:1px solid #a2c2e5; background:#ffffff;">
	    		 	<table onKeyDown="FnAcessTblkeys(this,event);" width="100%" class="TABLEData" id="actBlkFlds" TYPE="MULTIPLE" VIEW="NO" PARENT="YES"  border="0" cellpadding="0" cellspacing="0">
						<tHead>
							<th scope="col" class="THgrid"><LABEL>Field Name</LABEL></th>
							<th scope="col" class="THgrid"><LABEL>Amendable</LABEL></th>
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
</body>
</html>