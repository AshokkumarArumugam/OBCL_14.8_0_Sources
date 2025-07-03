<!--
  **
  **
  ** File Name  : RadViewChild.jsp
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
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html" pageEncoding="UTF-8"%>
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
%>   
<html lang="en" >
<head><title>DataBlock</title>
	<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
    <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
	<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
	<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>	 
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
	<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>   
	<script type="text/javascript" src="Script/JS/RadAccessChild.js"></script>	
    <script type="text/javascript">
           
            
            function fnInValues(){
                            
							parent.document.getElementById("IFCHILD").style.width="450px";
							parent.document.getElementById("IFCHILD").style.height="300px"; 
							document.getElementById("RELEASE_TYPE").value=parent.parent.relType;
							document.getElementById("FUNCTION_TYPE1").value=parent.document.getElementById("FUNCTION_TYPE").value;
							document.getElementById("RELEASE_NAME").value=parent.parent.relCode;
							document.getElementById("Cancel").focus(); 
							
                   }
</script>
</head>
<body class="BODYDetails" onload="fnInValues()" onkeydown="fnAccessChildScreens(event)" >
<div  id="DIVWNDContainer">
    <div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle" id="wndtitle" onmousedown="startDrag('ChildWin', event)"> <h1 class="WNDtitletxt">View Changes</h1>
            <div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
            </div>
        </div>
    </div>  
<div>
				<div>
 
 <br>
	<div style="width:100%;display:block;margin-top:5px;margin-left:10px" align="left">   
        <table class="TABLELyt" id="RDDVWEXL_DETAILS" NAME="RDDVWEXL_DETAILS" DBT="RDDVWEXL_DETAILS" width="100%"  border="0" cellspacing="0" cellpadding="1"  TYPE="SINGLE" PARENT="NO" VIEW="NO">
 
				<tr>
				
				<td align="right"> </td> 
				<td align="left"><LABEL>Changes Shown are Based on</LABEL></td>   
	            </tr>
			    <tr><td align="right">&nbsp; </td> <td align="right"> &nbsp;</td> 
	            </tr> 
				<tr>
				<td align="right"><LABEL for="FUNCTION_TYPE1">Function Type</LABEL></td>
						<td>
						<SELECT aria-required="false" name="FUNCTION_TYPE1" id="FUNCTION_TYPE1"  >
						<option value="C">Child</option>
						<option selected="P" value="P">Parent</option>
						<option  value="S">Screen Child</option>
						</SELECT>
						</td>
				</tr> 
				<tr>
				 
				 <td align="right"><LABEL for="RELEASE_TYPE">Release Type</LABEL></td>
						<td>
						<SELECT aria-required="false" name="RELEASE_TYPE" id="RELEASE_TYPE">
						<option value="KERNEL">kernel</option>
						<option value="CLUSTER">Cluster</option>
						<option  value="CUSTOM">Custom</option>
						</SELECT>
						</td>
	            </tr> 
				
				<tr>
				  <td align="right"><LABEL for="RELEASE_NAME">Release Code</LABEL></td>
                  <td><INPUT aria-required="false"  type="text" name="RELEASE_NAME" id="RELEASE_NAME" value="" size="50"></td>
				</tr>
				<tr><td align="center"><BUTTON  style="width:40px;height:20px;background-color:#009900" ></BUTTON></td>
				  <td align="left"><LABEL>Green For New Items Added in this Release</LABEL></td>
				  </tr>
				<tr><td align="center"><BUTTON  style="width:40px;height:20px;background-color:#0033CC" ></BUTTON></td>
				  <td align="left"><LABEL>Blue For Modified Items in this Release</LABEL></td>
                  </tr>
				<tr>
				   
				<td><INPUT aria-required="false" type=hidden name="SOURCE_XML" id="SOURCE_XML" size=20 ></INPUT></td> 	
             	<td></td>
				<td></td>     
				<td><INPUT aria-required="false" name="LANG_CODE" id="LANG_CODE" style="visibility:hidden"></INPUT></td>
				<td><INPUT aria-required="false" type=hidden name="REALSE" id="REALSE" value=<%=ODTUtils.stripXSS(request.getParameter("title"))%> size=20></td>
				<td><INPUT aria-required="false" type=hidden name="TOOL" id="TOOL" value=<%=ODTUtils.stripXSS(request.getParameter("Tool"))%> size=20></td>
				 
				</tr>
             
        </table>
		 </div>
    <br>
 
 
 
</div>
         
   <div style="TEXT-ALIGN: right; MARGIN-TOP: 8px; PADDING-RIGHT: 30px; CLEAR: both">
		<BUTTON style="HEIGHT: 25px" id="Cancel" class="BTNfooter" onclick="fnRADExitSub('ChildWin', event)" name="Cancel">OK</BUTTON>
	</div> 
	</div>
</div>
</body>
</html>