<!--
  **
  **
  ** File Name  : RadCommentActions.jsp
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
if(userAgent.contains("MSIE") || (userAgent.contains("TRIDENT") && userAgent.contains("RV"))) {
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
<script type="text/javascript" src="Script/JS/RadLovHandler.js"></script> 	
<script> 
parent.document.getElementById("IFCHILD").style.width="650px";
parent.document.getElementById("IFCHILD").style.height="650px";  							
parent.document.getElementById("IFCHILD").scrolling='no';  
var Actions_list="QUERY~NEW~MODIFY~AUTHORIZE~DELETE~CLOSE~REOPEN~REVERSE~ROLLOVER~CONFIRM~LIQUIDATE~SUMMARYQUERY";
Actions_list=Actions_list.split("~");
var CurrRow="";
var localDom = parent.dom;
var Actionid="<%=ODTUtils.stripXSS(request.getParameter("Title")) %>";
function fnLoad_Comments()
{
for(var n=0;n<Actions_list.length;n++)
{
if(Actionid==Actions_list[n])
CurrRow=n;
}
 var blk = selectNodes(localDom, "//RAD_ACTIONS/RAD_ACTION[ACTION_CODE='" + Actionid + "']");
   var fsrq=getNodeText(selectSingleNode(blk[0], "FSREQ_CMT_ID"));
   var iorq=getNodeText(selectSingleNode(blk[0], "IOREQ_CMT_ID"));
   var fsrs=getNodeText(selectSingleNode(blk[0], "FSRES_CMT_ID"));
   var pkrs=getNodeText(selectSingleNode(blk[0], "PKRES_CMT_ID"));
 
 document.getElementById("FSREQ_CMT_ID").value=fsrq;
 document.getElementById("IOREQ_CMT_ID").value=iorq;
 document.getElementById("FSRES_CMT_ID").value=fsrs;
 document.getElementById("PKRES_CMT_ID").value=pkrs;
 if(Actionid=="QUERY" || Actionid=="SUMMARYQUERY"){
 
 document.getElementById("FSREQ_CMT_ID").className = "TXTro";
 document.getElementById("PKRES_CMT_ID").className = "TXTro";
 document.getElementById("FSREQ_CMT_ID").value="";
 document.getElementById("PKRES_CMT_ID").value="";
 document.getElementById("FSREQ_CMT_ID").disabled=true;
 document.getElementById("PKRES_CMT_ID").disabled=true;
 document.getElementById("BTN_COMMENT_ID1").disabled=true;
 document.getElementById("BTN_COMMENT_ID4").disabled=true;
 }
 
document.getElementById("Cancel").focus();
}

function fnUpdateActionComments(event){
var fsrq=document.getElementById("FSREQ_CMT_ID").value;
var iorq=document.getElementById("IOREQ_CMT_ID").value;
var fsrs=document.getElementById("FSRES_CMT_ID").value;
var pkrs=document.getElementById("PKRES_CMT_ID").value;

var tableObject=parent.document.getElementById("ACTNS_TB");

tableObject.tBodies[0].rows[CurrRow].cells[7].getElementsByTagName("INPUT")[0].value=fsrq;
tableObject.tBodies[0].rows[CurrRow].cells[8].getElementsByTagName("INPUT")[0].value=iorq;
tableObject.tBodies[0].rows[CurrRow].cells[9].getElementsByTagName("INPUT")[0].value=fsrs;
tableObject.tBodies[0].rows[CurrRow].cells[10].getElementsByTagName("INPUT")[0].value=pkrs;
	          

var blk = selectNodes(localDom, "//RAD_ACTIONS/RAD_ACTION[ACTION_CODE='" + Actionid + "']");
    if (selectSingleNode(blk[0], "FSREQ_CMT_ID") == null) {
        var amndElmt = localDom.createElement("FSREQ_CMT_ID");
        blk[0].insertBefore(amndElmt, selectSingleNode(blk[0], "ACTION_STAGE_TYPE"));
    }
    if (selectSingleNode(blk[0], "IOREQ_CMT_ID") == null) {
        var amndElmt = localDom.createElement("IOREQ_CMT_ID");
        blk[0].insertBefore(amndElmt, selectSingleNode(blk[0], "ACTION_STAGE_TYPE"));
    }
    if (selectSingleNode(blk[0], "FSRES_CMT_ID") == null) {
        var amndElmt = localDom.createElement("FSRES_CMT_ID");
        blk[0].insertBefore(amndElmt, selectSingleNode(blk[0], "ACTION_STAGE_TYPE"));
    }
    if (selectSingleNode(blk[0], "PKRES_CMT_ID") == null) {
        var amndElmt = localDom.createElement("PKRES_CMT_ID");
        blk[0].insertBefore(amndElmt, selectSingleNode(blk[0], "ACTION_STAGE_TYPE"));
    }
	setNodeText(selectSingleNode(blk[0], "FSREQ_CMT_ID"), fsrq);
	setNodeText(selectSingleNode(blk[0], "IOREQ_CMT_ID"), iorq);
	setNodeText(selectSingleNode(blk[0], "FSRES_CMT_ID"), fsrs);
	setNodeText(selectSingleNode(blk[0], "PKRES_CMT_ID"), pkrs);
	
	
	parent.dom = localDom;
}

</script>
</head> 
<body  class="BODYDetails"   onload="fnLoad_Comments()"  onkeydown="fnAccessChildScreens(event)">
<div id="DIVWNDContainer1">
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt"><%=ODTUtils.stripXSS(request.getParameter("Title")) %> Action Comments</h1>                                      
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
			    	<th scope="col" class="THgrid" colspan="2"><span class="SPNtext">Comment's</span></th> 
			    	</tr>
			    </thead>
			    <tbody>
                         <tr>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSREQ" name="FSREQ" title="Column Desc" value="Full Request Message"  size="30"  class="TXTstd" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSREQ_CMT_ID" name="FSREQ_CMT_ID" title="Column"   size="30"  class="TXTstd" ><BUTTON  class="BTNimg"  title="List Of Values" tabindex="-1"  id="BTN_COMMENT_ID1" onclick="LOV_COMMENT_FLD.show_lov('FSREQ_CMT_ID~','frmScrSnm','', 'Comment ID', 'Comment ID~Comment Description', 'Comment ID~Comment Description',event);"><span class="ICOlov"></span></BUTTON></td>
						  </tr>
                        <tr>
                               <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="IOREQ" name="IOREQ" title="Column Desc"  value="IO Request Message" size="30"  class="TXTstd" ></td>
                             <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="IOREQ_CMT_ID" name="IOREQ_CMT_ID" title="Column"   size="30"  class="TXTstd" ><BUTTON  class="BTNimg"  title="List Of Values" tabindex="-1"  id="BTN_COMMENT_ID2" onclick="LOV_COMMENT_FLD.show_lov('IOREQ_CMT_ID~','frmScrSnm','', 'Comment ID', 'Comment ID~Comment Description', 'Comment ID~Comment Description',event);"><span class="ICOlov"></span></BUTTON></td>
						  </tr>
                        <tr>
                               <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSRES" name="FSRES" title="Column Desc"  value="Full Response Message" size="30"  class="TXTstd" ></td>
                             <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSRES_CMT_ID" name="FSRES_CMT_ID" title="Column"   size="30"  class="TXTstd" ><BUTTON  class="BTNimg"  title="List Of Values" tabindex="-1"  id="BTN_COMMENT_ID3" onclick="LOV_COMMENT_FLD.show_lov('FSRES_CMT_ID~','frmScrSnm','', 'Comment ID', 'Comment ID~Comment Description', 'Comment ID~Comment Description',event);"><span class="ICOlov"></span></BUTTON></td>
                          </tr>
                          <tr>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="PKRES" name="PKRES" title="Column Desc"  value="PK Response Message" size="30"  class="TXTstd" ></td>
                             <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="PKRES_CMT_ID" name="PKRES_CMT_ID" title="Column"   size="30"  class="TXTstd" ><BUTTON  class="BTNimg"  title="List Of Values" tabindex="-1"  id="BTN_COMMENT_ID4" onclick="LOV_COMMENT_FLD.show_lov('PKRES_CMT_ID~','frmScrSnm','', 'Comment ID', 'Comment ID~Comment Description', 'Comment ID~Comment Description',event);"><span class="ICOlov"></span></BUTTON></td>
                           </tr>  
                  </tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
	<div style="margin-top:10px;float:right;display:block;">
		<BUTTON class="BTNfooter" name="OK"  id="ok" style="height:25px;width:35px"  onclick="fnUpdateActionComments(event);fnRADExitSub('ChildWin', event);" >Ok</BUTTON>&nbsp;
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
  
  