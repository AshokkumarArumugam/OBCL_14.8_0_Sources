<!--
  **
  **
  ** File Name  : RadGIFieldsIncomng.jsp
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
  ** Copyright ? 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  

-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
		<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>	 
		<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
		<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
		<script type="text/javascript" src="Script/JS/RadLovHandler.js"></script>
		<script type="text/javascript" src="Script/JS/RadUIUtils.js"></script>  
            <script type="text/javascript"> 
            
            function fnInValues(){ 
            parent.document.getElementById("IFCHILD").style.width="600px";
            parent.document.getElementById("IFCHILD").style.height="650px";
			document.getElementById("Cancel").focus();
                }
            function fnDefFldId(fld,length,datatype,datefmt,pos,key,tablename,padpref,padchr,value,excludesel,col){
			 document.getElementById("FIELD_CODE").value=fld;
			 document.getElementById("LENGTH").value=length;
			 document.getElementById("DATA_TYPE").value=datatype;
			 document.getElementById("DATE_FORMAT").value=datefmt;
			// document.getElementById("FIELD_POS").value=pos;
			 document.getElementById("KEYWORD").value=key;
			 document.getElementById("DB_TABLES").value=tablename;
			 document.getElementById("PADDING_PREF").value=padpref;
			 document.getElementById("PADDING_CHAR").value=padchr;
			 document.getElementById("VALUE").value=value;
			 if(tablename!="")
			 {
			 funcGIfieldcolumns(tablename,'ASSOCIATED_FIELDS_OUT');
			 document.getElementById("DB_COLUMN").value=col;
			 }
			  
			 if(excludesel=="true"){
			 document.getElementById("EXCLUDE_IN_SELECT").checked=true;
			 }else{
			   document.getElementById("EXCLUDE_IN_SELECT").checked=false;
			 }
			 	 
			}
            function fnAppendGIOutgoingFields(tbName,currRow){
              var tableObject=parent.document.getElementById(tbName);			  
			  
			  tableObject.tBodies[0].rows[currRow].cells[1].getElementsByTagName("INPUT")[0].value=document.getElementById("FIELD_CODE").value;
              tableObject.tBodies[0].rows[currRow].cells[2].getElementsByTagName("SELECT")[0].value=document.getElementById("DATA_TYPE").value;
	          tableObject.tBodies[0].rows[currRow].cells[3].getElementsByTagName("INPUT")[0].value=document.getElementById("DATE_FORMAT").value;
	          //tableObject.tBodies[0].rows[currRow].cells[4].getElementsByTagName("INPUT")[0].value=document.getElementById("FIELD_POS").value;
	          tableObject.tBodies[0].rows[currRow].cells[4].getElementsByTagName("INPUT")[0].value=document.getElementById("DB_TABLES").value;
	         
	          tableObject.tBodies[0].rows[currRow].cells[6].getElementsByTagName("INPUT")[0].value=document.getElementById("VALUE").value;
	          tableObject.tBodies[0].rows[currRow].cells[7].getElementsByTagName("INPUT")[0].value=document.getElementById("LENGTH").value;
	          tableObject.tBodies[0].rows[currRow].cells[8].getElementsByTagName("SELECT")[0].value=document.getElementById("KEYWORD").value;	
	          tableObject.tBodies[0].rows[currRow].cells[9].getElementsByTagName("SELECT")[0].value=document.getElementById("PADDING_PREF").value;
	          tableObject.tBodies[0].rows[currRow].cells[10].getElementsByTagName("INPUT")[0].value=document.getElementById("PADDING_CHAR").value;	
			  if(document.getElementById("DB_COLUMN").value!="")
			 {
			 parent.funcGIfieldcolumns(document.getElementById("DB_TABLES").value,tbName,currRow);
			 tableObject.tBodies[0].rows[currRow].cells[5].getElementsByTagName("SELECT")[0].value=document.getElementById("DB_COLUMN").value;
			 }
			  
			  
			  if(document.getElementById("EXCLUDE_IN_SELECT").checked==true)
	          tableObject.tBodies[0].rows[currRow].cells[11].getElementsByTagName("INPUT")[0].checked=true;
			  else
		     tableObject.tBodies[0].rows[currRow].cells[11].getElementsByTagName("INPUT")[0].checked=false;
             
			  
		  }
	      
		    function numberval(id)
             {
                var val=id.value;
                  if(val>=0){}
                  else
                  {
                  document.getElementById(id.uniqueID).value="";
                 parent.parent.alertMessage("Please enter valid number for "+id.id,"E");
				 return;
                  } 
             }
			 
			  function funcGIfieldcolumns(tab,tablename)
	   { 
     try{
	 	var tabname=tab.parentElement.getElementsByTagName('INPUT')[0].value;
		}
		catch (e)
		{
		var tabname=tab;
		}
	 var tabn=parent.funcGItablersyno(tabname);
	if(tabn!=""){
	tabname=tabn;
	}
	var queryString = "DEFAULT_ONLY_COLUMN";  
	var WhereString = "WHERE TABLE_NAME ='"+tabname+"'";
	parent.gReqType = "APP";
	parent.gReqCode = parent.gAction;
	var radReqDOM = parent.parent.buildRADXml();	
	var bodyNode=selectSingleNode(radReqDOM,"//RAD_REQ_ENV/RAD_HEADER");
	var tempNode=radReqDOM.createElement("QUERY");
	bodyNode.appendChild(tempNode);
	setNodeText(selectSingleNode(radReqDOM,"//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"),"UEXECUTEQUERY");
	setNodeText(selectSingleNode(radReqDOM,"//RAD_REQ_ENV/RAD_HEADER/ACTION"),"EXECUTEQUERY");
	setNodeText(selectSingleNode(radReqDOM,"//RAD_REQ_ENV/RAD_HEADER/QUERY"),queryString);
	setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
	setNodeText(selectSingleNode(radReqDOM,"//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"),"0");
	var response = parent.parent.fnPost(getXMLString(radReqDOM) + parent.parent.gBodySeparator+ "");   
	var multRec = "";
	 	try {
		multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
	} catch (e) {
		multRec = response.substring(9, response.indexOf("</Records>")).split(">");
	}
	
	         var obj1="";
	         var obj1=document.getElementById("DB_COLUMN");
             var cloumns=multRec.length;     
                      if(multRec.length>=2)
                    {
                               parent.addOption(obj1,"","",true);            
                               for(var i=0;i<cloumns-1;i++)
							     {
			                   parent.addOption(obj1, multRec[i], multRec[i],false);
			                       }
                     }
                      else
				    {
                         parent.addOption(obj1,"","",true);
                         obj1.length=1; 
                         parent.parent.alertMessage("Enter a valid table","E");
		                  return;      						  
			         }
	        
	     

    }
</script>
</head>
<body style="background-color:#ffffff"  onload="fnInValues();fnDefFldId('<%=ODTUtils.stripXSS(request.getParameter("fld"))%>','<%=ODTUtils.stripXSS(request.getParameter("length"))%>','<%=ODTUtils.stripXSS(request.getParameter("datatype"))%>','<%=ODTUtils.stripXSS(request.getParameter("datefmt"))%>','<%=ODTUtils.stripXSS(request.getParameter("pos"))%>','<%=ODTUtils.stripXSS(request.getParameter("key"))%>','<%=ODTUtils.stripXSS(request.getParameter("tablename"))%>','<%=ODTUtils.stripXSS(request.getParameter("padpref"))%>','<%=ODTUtils.stripXSS(request.getParameter("padchr"))%>','<%=ODTUtils.stripXSS(request.getParameter("value"))%>','<%=ODTUtils.stripXSS(request.getParameter("excludesel"))%>','<%=ODTUtils.stripXSS(request.getParameter("col"))%>')" onkeydown="fnAccessChildScreens(event)">
<div id="DIVWNDContainer">
	<div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle"  onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Fields   </h1>                                      
            <div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
        </div>
	</div> 
<div   class="Subcontainer" name="DIV_ASSOCIATED_FIELDS_OUT" id="DIV_ASSOCIATED_FIELDS_OUT" TYPE="SINGLE" VIEW="NO">

<!--Form fields column one-->
<div class="DIVColumnOne"  >
<fieldset class="FSTcell"> 

<div class="DIVText" >
<LABEL class="LBLstd" for="FIELD_CODE">Field Code</LABEL>
<INPUT aria-required="false"  class="TXTro" readonly type="text"  id="FIELD_CODE" name="FIELD_CODE" value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="DATA_TYPE">Data Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="DATA_TYPE" id="DATA_TYPE" >
		<option name="STRING" id="STRING"value="STRING">String</option>
        <option name="NUMBER" id="NUMBER"value="NUMBER">Number</option>
		<option name="DATE" id="DATE"value="DATE">Date</option> 
</SELECT>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="DATE_FORMAT">Date Format</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="DATE_FORMAT" name="DATE_FORMAT" value="" size="30">
</div> 
 
 
<div class="DIVText" >
<LABEL class="LBLstd" for="DB_TABLES">Table Names</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"   name="DB_TABLES"  id="DB_TABLES" onchange="parent.upper(this);" value="" size="30"  >
<BUTTON   class="BTNimg" title="List Of Values" tabindex="-1"  id="lov1" onclick="LOV_DATASRC.show_lov('DB_TABLES~','frmDSLOV','', 'Data Source', 'Table Name', 'Table Name',event)"><span class="ICOlov"></span></BUTTON>
<BUTTON class="BTNfooter" title="Click to fetch columns" onclick="funcGIfieldcolumns(this,'ASSOCIATED_FIELDS_OUT')">P</BUTTON>
</div>	

<div class="DIVText" >
<LABEL class="LBLstd" for="DB_COLUMN">Column Name</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" name="DB_COLUMN" id="DB_COLUMN" > 
</SELECT>
</div> 
 
<div class="DIVText" >
<LABEL class="LBLstd" for="VALUE">Value</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="VALUE" name="VALUE" value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="LENGTH">Length</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="LENGTH" name="LENGTH" value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="KEYWORD">Key Word</LABEL>
<SELECT aria-required="false"  class="SELstd" name="KEYWORD" id="KEYWORD" >
		<option name="CURR_BRANCH" id="CURR_BRANCH" value="CURR_BRANCH">Current Branch</option>
        <option name="CURR_DATE" id="CURR_DATE" value="CURR_DATE">Current Date</option>
</SELECT>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="PADDING_PREF">Padding Preference</LABEL>
<SELECT aria-required="false"  class="SELstd" name="PADDING_PREF" id="PADDING_PREF" >
		<option name="L" id="L"value="L">Left</option>
        <option name="R" id="R"value="R">Right</option>
</SELECT>
</div> 

<div class="DIVText" >
<LABEL class="LBLstd" for="PADDING_CHAR">Padding Charcater</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="PADDING_CHAR" name="PADDING_CHAR" value="" size="30">
</div>


<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="EXCLUDE_IN_SELECT">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="EXCLUDE_IN_SELECT" id="EXCLUDE_IN_SELECT">Exclude in File</LABEL>
</div>
</div> 

</fieldset>
<!--End of Form fields column two-->
</div> 
</div>   
     <div style="float:right;padding-right:20px;padding-top:25px;" >
		<BUTTON class="BTNfooter" name="OK"  id="ok" onclick="fnAppendGIOutgoingFields('<%=ODTUtils.stripXSS(request.getParameter("tbName"))%>','<%=ODTUtils.stripXSS(request.getParameter("rowid"))%>');fnRADExitSub('ChildWin', event);"  style="visibility:visible;height:25px;width :35px;">Ok</BUTTON>
		<BUTTON class="BTNfooter" id="Cancel" name="Cancel" onclick="fnRADExitSub('ChildWin', event);" style="height:25px;width :60px;">Cancel</BUTTON>
	</div> 
</div> 
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>
