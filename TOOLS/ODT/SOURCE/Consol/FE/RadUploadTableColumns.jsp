<!--
  **
  **
  ** File Name  : RadUploadTableColumns.jsp
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

<TITLE>Callfrom Arguments</TITLE>
<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>  
<script type="text/javascript" src="Script/JS/RadUIUtils.js" ></script>
<script type="text/javascript" src="Script/JS/RadUtil.js" ></script>
<script> 
 
parent.document.getElementById("IFCHILD").style.width="650px";
parent.document.getElementById("IFCHILD").style.height="550px"; 							
parent.document.getElementById("IFCHILD").scrolling='no'; 
var heading = "Source code~External Reference Number~Source Sequence Number~Branch Code~Function Id~Action Code~Upload Id~Module Code~Upload Status~Source Operation".split("~");
var datalen;
function showColumns()
{
var data=parent.uplclm.split("~");
datalen=data.length;
var lr=0; 
for( var i=0;i<data.length;i++)
{
lr=data[i].split(":")[0];
document.getElementById("UP_CLV"+i).value=data[i].split(":")[1]; 
document.getElementById("UP_HD"+i).value = heading[lr-1];
} 
for(i=data.length;i<10;i++)
{ 
document.getElementById("UP_CLV"+i).style.display="none";
document.getElementById("UP_CL"+i).style.display="none";
document.getElementById("UP_HD"+i).style.display="none";
}
var k=data.length-1;
/*if(document.getElementById("UP_CLV"+k).value=="SOURCE_OPERATION")
{
document.getElementById("UP_CLV"+k).value = "";
document.getElementById("UP_CL"+k).checked =true;
document.getElementById("UP_CLV"+k).disabled= true; 
}
*/
if(document.getElementById("UP_CLV"+k).value==""){
document.getElementById("UP_CL"+k).checked =true;
document.getElementById("UP_CLV"+k).disabled= true; 
}
document.getElementById("Cancel").focus();
}
function appendUpload_column(event)
{  
	var e = window.event || event;
	var v1 = document.getElementById("UP_CLV0").value;
	var v2 = document.getElementById("UP_CLV1").value;
	if(v1 =="" || v2 =="")
	{
	alertMessage("Source code and External Reference Number are Mandatory.", "E");
	return false;
	}
	var list_data=parent.document.getElementById("DS_UP_TBL_PK_COLS").value;
	list_data=list_data.split("~");
	var datam="";
	for( var i=1;i<=datalen;i++)
	{ 
		var n=list_data[i-1].split(":")[0];
		var l=i-1;
		if(i>1)
		datam=datam+"~"+n+":"+document.getElementById("UP_CLV"+l).value;
		else
		datam=n+":"+document.getElementById("UP_CLV"+l).value; 
	} 
	
	parent.document.getElementById("DS_UP_TBL_PK_COLS").value=datam;
	fnRADExitSub('ChildWin', e)
}
function fnCheckreq(e)
{
	var e = window.event || e;
    var srcElement = getEventSourceElement(e);
	var id1= "UP_CLV" +srcElement.id.split("UP_CL")[1];
	if(srcElement.checked == true)
	{ 
	document.getElementById(id1).value = "";
	document.getElementById(id1).disabled= true; 
	}else
	{
	document.getElementById(id1).disabled= false;
	if(document.getElementById("UP_HD"+srcElement.id.split("UP_CL")[1]).value == "Source Operation"){
	document.getElementById("UP_CLV"+srcElement.id.split("UP_CL")[1]).value="SOURCE_OPERATION";
	}
	}
}
</script>
</head> 
<body  class="BODYDetails"  onload="showColumns()" onkeydown="fnAccessChildScreens(event)">
<div id="DIVWNDContainer1">
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Table Standard Columns</h1>                                      
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
		</div>
	</div>  
<div class="DIVTabPageContent" style="border:0px; ">	
<div id="DIV_RTN_FLD" name="DIV_RTN_FLD" class="DIVMultipleBig" style="margin-left:20px;margin-right:20px;position:relative;width:auto;margin-top:30px;">
	 <div class="DIVmultiplebox">
			<div class="MEButtons">
					<!-- <BUTTON title="Delete Row"  id="DEL" name="DEL" onclick="delRow('sum_cust_btn')" class="BTNfooter"><span class="ICOremove" tabindex="-1"><span class="LBLinv">Delete Row</span></span></BUTTON>-->
	        </div>
		<div class="DIVMultipleBigInner" style="width:610px;height:360px;overflow-x:hidden"  >
			<table id="UPLOAD_COLUMNS" name="UPLOAD_COLUMNS" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			     <thead>
			    	<tr> 
			    	<th scope="col" class="THgrid" colspan="2"><span class="SPNtext">Columns</span></th> 
			    	<th scope="col" class="THgrid"><span class="SPNtext">Not Required</span></th> 
			    	</tr>
			    </thead>
			    <tbody>
                         <tr>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_HD0" name="UP_HD0" title="Column Desc"   size="30"  class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_CLV0" name="UP_CLV0" title="Column"   size="30"  class="TXTstd" ></td>
								<td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Check Box" type="checkbox" onclick="fnCheckreq(event)" id="UP_CL0" name="UP_CL0" disabled="true"></td>
                         </tr>
                        <tr>
                               <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_HD1" name="UP_HD1" title="Column Desc"   size="30"  class="TXTro" ></td>
                             <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_CLV1" name="UP_CLV1" title="Column"   size="30"  class="TXTstd" ></td>
							<td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Check Box" type="checkbox" onclick="fnCheckreq(event)" id="UP_CL1" name="UP_CL1" disabled="true"></td>
                        </tr>
                        <tr>
                               <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_HD2" name="UP_HD2" title="Column Desc"   size="30"  class="TXTro" ></td>
                             <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_CLV2" name="UP_CLV2" title="Column"   size="30"  class="TXTstd" ></td>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Check Box" type="checkbox" onclick="fnCheckreq(event)" id="UP_CL2" name="UP_CL2" ></td>
                         </tr>
                          <tr>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_HD3" name="UP_HD3" title="Column Desc"   size="30"  class="TXTro" ></td>
                             <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_CLV3" name="UP_CLV3" title="Column"   size="30"  class="TXTstd" ></td>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Check Box" type="checkbox" onclick="fnCheckreq(event)" id="UP_CL3" name="UP_CL3"  ></td>
                          </tr> 
						 <tr>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_HD4" name="UP_HD4" title="Column Desc"   size="30"  class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_CLV4" name="UP_CLV4" title="Column"   size="30"  class="TXTstd" ></td>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Check Box" type="checkbox" onclick="fnCheckreq(event)" id="UP_CL4" name="UP_CL4"  ></td>
                         </tr> 
						 <tr>
                               <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_HD5" name="UP_HD5" title="Column Desc"   size="30"  class="TXTro" ></td>
                             <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_CLV5" name="UP_CLV5" title="Column"   size="30"  class="TXTstd" ></td>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Check Box" type="checkbox" onclick="fnCheckreq(event)" id="UP_CL5" name="UP_CL5"  ></td>
                         </tr> 
						 <tr>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_HD6" name="UP_HD6" title="Column Desc"   size="30"  class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_CLV6" name="UP_CLV6" title="Column"   size="30"  class="TXTstd" ></td>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Check Box" type="checkbox" onclick="fnCheckreq(event)" id="UP_CL6" name="UP_CL6"  ></td>
                         </tr> 
						 <tr>
                             <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_HD7" name="UP_HD7" title="Column Desc"   size="30"  class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_CLV7" name="UP_CLV7" title="Column"   size="30"  class="TXTstd" ></td>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Check Box" type="checkbox" onclick="fnCheckreq(event)" id="UP_CL7" name="UP_CL7"  ></td>
                          </tr> 
						 <tr>
                             <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_HD8" name="UP_HD8" title="Column Desc"   size="30"  class="TXTro" ></td>
                               <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_CLV8" name="UP_CLV8" title="Column"   size="30"  class="TXTstd" ></td>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Check Box" type="checkbox" onclick="fnCheckreq(event)" id="UP_CL8" name="UP_CL8"  ></td>
                         </tr> 
						 <tr>
                             <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_HD9" name="UP_HD9" title="Column Desc"   size="30"  class="TXTro" ></td>
                               <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="UP_CLV9" name="UP_CLV9" title="Column"   size="30"  class="TXTstd" ></td>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Check Box" type="checkbox" onclick="fnCheckreq(event)" id="UP_CL9" name="UP_CL9"  ></td>
                         </tr> 
                  </tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
	<div style="margin-top:10px;float:right;display:block;">
		<BUTTON class="BTNfooter" name="OK"  id="ok" style="height:25px;width:35px"  onclick="appendUpload_column(event);" >Ok</BUTTON>&nbsp;
		<BUTTON class="BTNfooter" name="Cancel"  id="Cancel" style="height:25px;width:60px" onclick="fnRADExitSub('ChildWin', event);"  >Cancel</BUTTON>
	</div>
</div>
</div> 
</div>
<div id="masker" class="masker" style="display:none;"> 
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div> 
</body>
</html>
  
  