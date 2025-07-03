<!--
  **
  ** File Name  : RadLov.jsp
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
<%@page import="com.ofss.odt.util.ODTUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%
String userAgent = request.getHeader("USER-AGENT").toUpperCase();
String js_parser ="";
boolean bowserVer  = false; 
if(userAgent.contains("MSIE") || (userAgent.contains("TRIDENT") && userAgent.contains("RV"))) {//ie11 changes
    js_parser = "BROWSER_IE.js";
    bowserVer = true;
} else {
    js_parser = "BROWSER_NonIE.js";
}

String[] fields					= ODTUtils.stripXSS(request.getParameter("column_headings")).split("~");
String[] rednFldLabels			= ODTUtils.stripXSS(request.getParameter("rednFldLabels")).split("~");  
String par_fields				= ODTUtils.stripXSS(request.getParameter("ret_flds"));
String par_fields_recNum		= ODTUtils.stripXSS(request.getParameter("recNum"));   
String title					= ODTUtils.stripXSS(request.getParameter("title"));  
String bind_var					= ODTUtils.stripXSS(request.getParameter("Bindvars")); 
String lov_queryid				= ODTUtils.stripXSS(request.getParameter("lov_queryid")); 
String dsName					= ODTUtils.stripXSS(request.getParameter("radorUser"));   
String reduction_criteria		= ODTUtils.stripXSS(request.getParameter("reduction_criteria"));
String numReduc					= ODTUtils.stripXSS(request.getParameter("numReduc"));  
 %> 
<html lang="en" >
<HEAD>
<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>
<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>  
</HEAD> 
<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
<script type="text/javascript" src="Script/JS/RadUtil.js"></script>	  
<script type="text/javascript" src="Script/JS/RadLov.js"></script>
<script type="text/javascript">
if("<%=dsName%>"=="RAD")
var action="EXECUTEQUERY";
else  if("<%=dsName%>"=="TRAX")
var action="TREXECUTEQUERY";
else var action="UEXECUTEQUERY";
</script> 
<BODY id="BodyIframeLov" CLASS="BODYDetails" onload="fncalstyle(event);" onkeydown="lovAccessKeys(event)"  style="height:100%;width:100%" SCROLL="NO" >
<div  id="DIVWNDContainer1"> 
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt"><%=title%></h1>                                      
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="RADLOVC" name="RADLOVC" onclick="if(this.disabled) return false;fnexitlov(event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
		</div>
    </div> 
    <div class="DIVTwoColLyt" id="LOVPageHead" style="margin-top:20px;">
        <div class="DIVTwoColSectionContainer">
            <fieldset class="FSTcell" >   
                <div class="DIVColumnSingle">
                <%  
			    int numReduc1=Integer.parseInt(request.getParameter("numReduc"));
				for (int loopIndex = 0; loopIndex < numReduc1; loopIndex++){
                        if (loopIndex % 2 == 0){
                            out.print("<div class=\"DIVText\"><LABEL class=\"LBLstd\" for="+reduction_criteria.split("~")[loopIndex]+">"+rednFldLabels[loopIndex]+"</LABEL>");
                            out.print("<INPUT aria-required=\"false\" CLASS=\"TXTstd\" NAME="+reduction_criteria.split("~")[loopIndex]+" ID="+reduction_criteria.split("~")[loopIndex]+" TYPE=\"TEXT\"  ></div>");
                            } 
                  }
                %>
                </div>
                <div class="DIVColumnSingle">
                <%
				for (int loopIndex = 0; loopIndex < numReduc1; loopIndex++){
                        if (loopIndex % 2 == 1){
                            out.print("<div class=\"DIVText\"><LABEL class=\"LBLstd\" for="+reduction_criteria.split("~")[loopIndex]+">"+rednFldLabels[loopIndex]+"</LABEL>");
                            out.print("<INPUT aria-required=\"false\" CLASS=\"TXTstd\"  NAME="+reduction_criteria.split("~")[loopIndex]+" ID="+reduction_criteria.split("~")[loopIndex]+"  TYPE=\"TEXT\"  ></div>");
                             
                        }
                  }
                %>  
                </div> 
				</fieldset>
				 
        </div>
    </div>
				
	<div Style="diplay:none"> 
	<INPUT aria-required="false" type="hidden" Name="dsName" id="dsName" value="<%= dsName%>" />	
	<INPUT aria-required="false" type="hidden" Name="lov_queryid" id="lov_queryid" value="<%= lov_queryid%>" />
	<INPUT aria-required="false" type="hidden" Name="bind_var" id="bind_var" value="<%= bind_var%>" />
	<INPUT aria-required="false" TYPE="hidden" Name="par_field_names" value="<%= par_fields%>" id ="par_field_names"/>
	<INPUT aria-required="false" TYPE="hidden" Name="displfld" value="<%= reduction_criteria%>" id ="displfld"/>
	<INPUT aria-required="false" TYPE="hidden" Name="par_field_names_recNum" value="<%= par_fields_recNum%>" id ="par_field_names_recNum" />
	</div>  
	
	<div style="float:right;padding-right:20px;padding-top:10px;">            
                    <BUTTON class="BTNfooter"  style="height:25px;width :60px;"   OnClick="FnSearchfetchQuery(event)">Search</BUTTON>
                    <BUTTON class="BTNfooter"  style="height:25px;width :60px;"   OnClick="form_reset(event)">Reset</BUTTON>
	</div>

<div class="DIVMultipleBig" style="margin-top:10px; margin-left:20px; margin-right:20px;width:90%">
		<div class="MEButtons" id="RAD_LOV_ME" name="RAD_LOV_ME">
			<BUTTON   CLASS="BTNfooter" name="navFirst" id ="navFirst" onclick="FndoNavigate(gcNAV_FIRST,event);" ><sup tabindex="-1">&lt;&lt;</sup></BUTTON>
			<BUTTON   CLASS="BTNfooter" name="navPrev" id ="navPrev"   onclick="FndoNavigate(gcNAV_PREVIOUS,event);" ><sup tabindex="-1">&lt;</sup></BUTTON>
			<BUTTON   CLASS="BTNfooter"><span id="pagesflow"><sup>0 of 0</sup></span></BUTTON> 
			<BUTTON   CLASS="BTNfooter" name="navNext" id ="navNext" onclick="FndoNavigate(gcNAV_NEXT,event);" ><sup tabindex="-1">&gt;</sup></BUTTON>
			<BUTTON   CLASS="BTNfooter" name="navLast" id ="navLast" onclick="FndoNavigate(gcNAV_LAST,event);"><sup tabindex="-1">&gt;&gt;</sup></BUTTON>
		</div>
	<div class="DIVmultiplebox" >
	<div class="DIVMultipleBigInner" style="height:400px;overflow-x:hidden">
	<table  id="RAD_LOV" name="RAD_LOV" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO"  class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
      <THEAD>
      <TR>
     <%
      for(int cnt=0; cnt<fields.length; cnt++)
      {  
      %>
      <TH scope="col" class="thheaderlast"><%= fields[cnt] %></TH>
      <%
      }
      %>      
	  </TR>
     </THEAD> 
       <tbody></tbody>
       <tfoot><tr><td scope="row" tabindex="0" id="RAD_LOV_TE" name="RAD_LOV_TE" colspan="5"><span class="LBLinv">End of table</span></td></tr></tfoot>
   </table>
  </div>
 </div>
</div>  
</div> 
</BODY>
</html> 