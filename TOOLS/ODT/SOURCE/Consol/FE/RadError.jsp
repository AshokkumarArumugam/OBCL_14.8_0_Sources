<!--
  **
  **
  ** File Name  : RadError.jsp
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
  ** Copyright  2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

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

String title = ODTUtils.stripXSS(request.getParameter("Title"));
%>
<html lang="en">
<head>

<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>
<script type="text/javascript" src="Script/JS/RadInfraUtil.js"></script>
<script type="text/javascript" src="Script/JS/RadAccessChild.js"></script>
<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
<title><%=title%></title>
<script type="text/javascript">
var prntact="";
function FnRErrorExit(target, e)
{
	try{
	parent.unmask();
	}catch(e) { 
		 parent.parent.unmask();
        } 
	var e = window.event || e;
    var srcElement = e.srcElement || e.target;
    if(srcElement.disabled) return; 
	var winObj = document.getElementById(target); 
	var winDivObj = parent.document.getElementById("ChildWin");
    winDivObj.children[0].src = "";
    parent.document.getElementById("Div_ChildWin").removeChild(winDivObj);
    try {	
	prntact.focus(); 
		} catch(e) { 
		 
        }  
}

function fnSyncAlertTableWidth(){
    var headerTable = document.getElementById("ERRTBLHeader");
    var dataTable = document.getElementById("ERRTBL");
    headerTable.parentNode.style.width = dataTable.parentNode.clientWidth + "px";
    headerTable.parentNode.parentNode.style.width = dataTable.parentNode.offsetWidth + "px";
    if(dataTable.tBodies[0].rows[0].cells.length==2){/*HTML5 Changes Start*/
        dataTable.tBodies[0].rows[0].cells[0].width=headerTable.tBodies[0].rows[0].cells[0].width;
        /* dataTable.tBodies[0].rows[0].cells[1].width='*'; */
    }
    var iframeObj = parent.document.getElementById("IFCHILD");
    iframeObj.style.height = document.getElementById("DIVif1").offsetHeight + "px" ;
    iframeObj.style.width = document.getElementById("DIVif1").offsetWidth + "px" ;
}/*HTML5 Changes End*/

function fnAlertMsg() { 
	prntact=parent.document.activeElement;
/*  	parent.document.getElementById("IFCHILD").style.width="600px";
	parent.document.getElementById("IFCHILD").style.height="350px";   */
	
	var message = parent.showLogmessage;
	var img=""; 
	var thmsg1="";
	var thmsg2="";
	if (parent.errType == "O") {
		document.getElementById("BTN_CANCEL").style.display = "block";
		document.getElementById("BTN_CANCEL").style.display = "inline"; 
	}else if(parent.errType == "E" || parent.errType == "I" ){
	 document.getElementById("BTN_CANCEL").style.display = "none"; 
	}
	if (parent.errType == "O") img="ICOAlert_C";
	else if(parent.errType == "I") img="ICOAlert_I";
	else if(parent.errType == "E" ) img="ICOAlert_E"; 
	
	if (parent.errType == "O") {
	thmsg1="Warning Description";
	thmsg2="Warning Code";
	}
	else if(parent.errType == "I") {
	thmsg1="Information Description";
	thmsg2="Information Code";
	}
	else if(parent.errType == "E" ) {
	thmsg1="Error Description";
	thmsg2="Error Code";
	}
	
	
	
/* 	document.getElementById('ERRTBLHeader').tBodies[0].rows[0].cells[0].innerText=thmsg1;
	document.getElementById('ERRTBLHeader').tBodies[0].rows[0].cells[1].innerText=thmsg2; */
	
	document.getElementById('ERRTBLHeader').tBodies[0].rows[0].cells[0].innerHTML="<SPAN tabindex='0' class='SPNtbltwoH' title='"+thmsg1+"'>"+thmsg1+"</SPAN>";
	document.getElementById('ERRTBLHeader').tBodies[0].rows[0].cells[1].innerHTML="<SPAN tabindex='0' class='SPNtbltwoH' title='"+thmsg2+"'>"+thmsg2+"</SPAN>";
	
	
    message=message.split("~");
	var message1="";
	var tableObject=document.getElementById('ERRTBL').tBodies[0];
	var j=0;
	for(i=0;i<message.length;i++)
	{
	message1=message[i].split(",");
	if(message1[0]!="")
	{
	if(message1.length<=1)message1[1]="RD-VALS-00";
	/* message1=message[i].split(",");
	if(message1[0]!="")
	{
	if(message1.length<=1)message1[1]="RD-VALS-00";
    addNewRow1('ERRTBL');
	tableObject[j].cells[0].innerHTML=img;
	tableObject[j].cells[0].className="errtblr2c1";	
	tableObject[j].cells[1].innerHTML ="<span class=\"SPNtbltwoC\">"+message1[0]+"</span>";
	tableObject[j].cells[1].className="errtblr2c2";	  
	tableObject[j].cells[1].style.whiteSpace="normal";	
	tableObject[j].cells[2].innerHTML ="<span class=\"SPNtbltwoC\">"+message1[1]+"</span>";
	tableObject[j].cells[2].className="errtblr2c3";		
	j++;
	} */
	  var rowElem = document.createElement("TR");
        var cell1 = document.createElement("TD");
        cell1.setAttribute("scope", "row");
        var cell1Data = "<em class='BTNicon' title='"+thmsg1+"'><SPAN class='"+img+"' tabIndex=0 title='"+thmsg1+"'></SPAN></em><SPAN tabindex=\"0\"  class='SPNtbltwoC' title='"+message1[0]+"'>"+message1[0]+"</SPAN>";
        cell1.innerHTML = cell1Data;
        rowElem.appendChild(cell1);
        if (parent.errType == "E" || parent.errType == "O") {
            var cell2 = document.createElement("TD");
            var cell2Data = "<SPAN tabindex=\"0\"  class='SPNtbltwoC'  title='"+message1[1]+"'>"+message1[1]+"</SPAN>";
            cell2.innerHTML = cell2Data;
            rowElem.appendChild(cell2);
        }
        tableObject.appendChild(rowElem);
        }
   }
   fnSyncAlertTableWidth();
	/* tableObject[tableObject.length-1].cells[0].className="errtblr3c1";	
	tableObject[tableObject.length-1].cells[1].className="errtblr3c2";	
	tableObject[tableObject.length-1].cells[1].style.whiteSpace="normal";	
	tableObject[tableObject.length-1].cells[2].className="errtblr3c3";	
	tableObject[0].cells[0].className="errtblr1c1";	
	tableObject[0].cells[1].className="errtblr1c2";	
	tableObject[0].cells[1].style.whiteSpace="normal";	
	tableObject[0].cells[2].className="errtblr1c3";  */
   
	if(parent.logScreen=="D"){
	  document.getElementById("BTN_CANCEL").focus();
	}else{
	  document.getElementById("BTN_OK").focus();	  
	}  
} 

function fnRADExitAll(target, e)
{ 
	if(target != null && parent.errType == "O" && target.substring(30, 5)=="UserPreferences"){
		var e = window.event || e;
		var srcElement = e.srcElement || e.target;
		if(srcElement.disabled) return; 
		var winObj = parent.parent.document.getElementById(target);
        if(winObj != null){
            try{
                parent.fnExit(winObj);
            }catch(e){
	            parent.parent.fnExit(winObj);
			}
        }
    }
}

function CloseWindow(bool) {
	window.returnValue = bool;
	self.close();
}
function fnAlertExit(e)
{
	var arguments=document.getElementById("arguments").value; 
	arguments=doTrim(arguments);
	if(parent.errType=='I' && parent.logScreen=="T")
	{}
	else if(parent.errType=='O' && parent.logScreen=="C")
	{
		parent.logScreen="";
        if(parent.gen_gwinFuncId=="RDDFNCGN" || parent.gen_gwinFuncId=="RDDLNPGE"){	
			parent.reloadForm();
		}if(parent.gen_gwinFuncId=="RDDSCRDF"){	
			parent.reloadForm();
		}if(parent.gen_gwinFuncId=="RDDGIMNT"){	
			parent.reloadGIForm();
		}else if(parent.gen_gwinFuncId=="RDDNOTIF"){
		   parent.reloadNtfyForm();
		}
		
	}else if(parent.errType=='O' && parent.logScreen=="D"){
	 parent.fnCnfrmDel(true);
	}else if(parent.errType=='O' && parent.logScreen=="A"){
			fnRset();
			disablFrm();
			showHideLOVs("hide", "CLOSE");
			fnEnableLogButtons("CANCEL");

	}else if(parent.errType=='O' && parent.logScreen=="T"){
			parent.fnReset();
			parent.disableForm();
			parent.showHideLOVs("hide", "CLOSE");
			parent.fnEnableLogButtons("CANCEL");

	}else if(parent.logScreen=="D1") 
	{
	parent.fnOnChangeBlkTypalert(true,arguments);
	}else if(parent.logScreen=="D2") 
	{
	parent.fnselectallalert(true,arguments);
	}else if(parent.logScreen=="D3") 
	{
	parent.MoveToFieldsetD3alert(true,arguments);
	}else if(parent.errType=='O' && parent.logScreen=="FLD_IMAGE"){
	 parent.fnFieldsetImage_Val();
	}else if(parent.errType=='O' && parent.logScreen=="FLD_VERSION"){
	 parent.fnFieldsetVersion_Val();
	}
	
	parent.logScreen="F";
	FnRErrorExit('ChildWin', e); 
}
function fnErrorAcess(e)
{ 
	var srcElement = getEventSourceElement(e);
	var e = window.event || e;
      if(e.keyCode == 9 && !e.shiftKey && (srcElement.id=="BTN_CANCEL" || srcElement.id=="BTN_OK" && parent.errType != "O")){ 
          document.getElementById("WINCLOSE").focus();   
          fnDisableBrowserKey(e);
		  preventpropagate(e);
          return false;
      } else if(e.keyCode == 9 && e.shiftKey && srcElement.id=="WINCLOSE") {
			if(document.getElementById("BTN_CANCEL"))
				document.getElementById("BTN_CANCEL").focus();
			else
			document.getElementById("BTN_OK").focus();
			fnDisableBrowserKey(e);		  
			preventpropagate(e);
			return false;
      } else if(e.keyCode == 27)
	  {
		FnRErrorExit('ChildWin', e);
        return false;
	  }
    return true;
} 

function doTrim(obj) {  
  if(obj.indexOf( "\' ") != -1)
  return obj.substring(0,obj.indexOf( "\' "));  
  return obj.replace(/^\\s*(\\b.*\\b|)\\s*$/,  "$1 "); 
  } 
  
</script>
<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>
<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
<!-- <link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link> -->

<link rel="stylesheet" type="text/css" href="Theme/ExtFlexblue.css"></link>
<link rel="stylesheet" type="text/css" href="Theme/ExtFlexNewUI.css"></link>
</head>
<body onload="fnAlertMsg();" onkeyDown="fnErrorAcess(event)">
	<div id="DIVif1" class="WNDcontainerModal">

		<DIV style="width: 560px;" class=WNDtitlebar id="wndtitle"
			onmousedown="startDrag(event)">
			<B class="BTNicon"><span class="ICOalert2"></span></B>
			<h1 class="WNDtitletxt"><%=title%></h1>
		</DIV>
		<DIV class="WNDcontentmodal" id="wndwidth">

			<DIV class="DIVtblbox1outer2">


				<div style="BACKGROUND: #f3f1ec;">
					<div id="tblHeader-container" class="DIVtblbox2 DIVTblHeader"
						style="height: auto;">

						<TABLE id="ERRTBLHeader" class="TBLtwoH" border=0 cellSpacing=0
							cellPadding=0 width="100%" summary="Override Messages">
							<TBODY>
								<TR>
									<!--HTML5 Changes-->
									<TD width="82%" scope=col><SPAN tabindex="0"
										class="SPNtbltwoH" title="Error Description">Error
											Description</SPAN></TD>
									<TD class="THLast" scope=col><SPAN
										tabindex="0" class="SPNtbltwoH" title="Error Code">Error
											Code</SPAN></TD>
								</TR>
							</TBODY>
						</TABLE>

					</div>
				</div>
				<DIV id="tbl-container" class="DIVtblbox2" style="border: none;">
					<TABLE id="ERRTBL" class="TBLtwo" border=0 cellSpacing=0
						cellPadding=0 width="100%" summary="Override Messages">
						<TBODY>
						</TBODY>
					</TABLE>


				</DIV>

				<div style="display: none">
					<INPUT aria-required="false" class="TXTstd" type="text"
						name="arguments" id="arguments"
						value="<%=ODTUtils.stripXSS(request.getParameter("arguments"))%>" size="25">
				</div>
				</div>
				<div class="WNDfootermodal">
					<div class="WNDfbuttons">
						<table role="presentation" width="99%" border="0" cellspacing="0"
							cellpadding="0" id="TBLPageTAB_FOOTER">
							<tbody>
								<tr>
									<td valign="top" width="98%" id="noteTD"></td>
									<td style="padding-left: 10px" nowrap="nowrap"><input
										class="BTNfooterH" onblur="this.className='BTNfooter'"
										value="Cancel" title="Cancel" id="BTN_CANCEL"
										onfocus="this.className='BTNfooterH'"
										onmouseover="this.className='BTNfooterH'"
										onmouseout="this.className='BTNfooter'"
										onclick="FnRErrorExit('ChildWin', event)" name="Cancel"
										type="button" /> <input class="BTNfooterH"
										onblur="this.className='BTNfooter'" value="Ok" title="Ok"
										id="BTN_OK"
										onclick="fnRADExitAll(parent.parent.funcGenSeqNo, event);fnAlertExit(event)"
										name="Ok" type="button" /></td>
								</tr>
							</tbody>
						</table>

					</div>
				</div>

			
		</div>
</body>
</html>