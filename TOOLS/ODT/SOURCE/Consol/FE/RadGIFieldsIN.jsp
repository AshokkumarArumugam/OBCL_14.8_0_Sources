<!--
  **
  **
  ** File Name  : RadGIFieldsIn.jsp
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
		<script type="text/javascript" src="Script/JS/RadUIUtils.js"></script>  
		<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
		<script type="text/javascript">
           
            
            function fnInValues(){
                            
            parent.document.getElementById("IFCHILD").style.width="500px";
            parent.document.getElementById("IFCHILD").style.height="400px"; 
			document.getElementById("Cancel").focus();
                }

            function fnDefFldId(fld,trimpref,datatype,trimchr,datefmt,blk,fldpos,fldname,stpos,fcfldpos,length,parentblk,exitsfile){
			 
			 fnblocks();
			 document.getElementById("FIELD_CODE").value=fld;
			 document.getElementById("TRIM_PREF").value=trimpref;
			 document.getElementById("DATA_TYPE").value=datatype;
			 document.getElementById("TRIM_CHAR").value=trimchr;
			 document.getElementById("DATE_FORMAT").value=datefmt;
			 document.getElementById("BLK_NAME").value=blk;
			 fnfields();
			 //document.getElementById("FIELD_POS").value=fldpos;
			 document.getElementById("FLD_NAME").value=fldname;
			 document.getElementById("ST_POS").value=stpos;
			 //document.getElementById("FC_FLD_POS").value=fcfldpos;
			 document.getElementById("LENGTH").value=length;
			 document.getElementById("PARENT_BLK").value=parentblk;		
            
             if(exitsfile=="true"){
			 document.getElementById("EXISTS_IN_FILE").checked=true;
			 }else{
			   document.getElementById("EXISTS_IN_FILE").checked=false;
			 }			 
			 
			}
            function fnAppendGIIncomingFields(tbName,currRow){
              var tableObject=parent.document.getElementById(tbName);			  
			  
			  tableObject.tBodies[0].rows[currRow].cells[1].getElementsByTagName("INPUT")[0].value=document.getElementById('FIELD_CODE').value;
              tableObject.tBodies[0].rows[currRow].cells[2].getElementsByTagName("SELECT")[0].value=document.getElementById("DATA_TYPE").value;
	          tableObject.tBodies[0].rows[currRow].cells[3].getElementsByTagName("INPUT")[0].value=document.getElementById("DATE_FORMAT").value;
	          //tableObject.tBodies[0].rows[currRow].cells[4].getElementsByTagName("INPUT")[0].value=document.getElementById("FIELD_POS").value;
	          tableObject.tBodies[0].rows[currRow].cells[4].getElementsByTagName("INPUT")[0].value=document.getElementById("ST_POS").value;
	          tableObject.tBodies[0].rows[currRow].cells[5].getElementsByTagName("INPUT")[0].value=document.getElementById("LENGTH").value;
	          tableObject.tBodies[0].rows[currRow].cells[6].getElementsByTagName("SELECT")[0].value=document.getElementById("TRIM_PREF").value;	
	          tableObject.tBodies[0].rows[currRow].cells[7].getElementsByTagName("INPUT")[0].value=document.getElementById("TRIM_CHAR").value;
	          tableObject.tBodies[0].rows[currRow].cells[8].getElementsByTagName("SELECT")[0].value=document.getElementById("BLK_NAME").value;
              parent.fn_populate_FieldsFIELD_togi(tbName,8,9,event); 
	          tableObject.tBodies[0].rows[currRow].cells[9].getElementsByTagName("SELECT")[0].value=document.getElementById("FLD_NAME").value;
			 // tableObject.tBodies[0].rows[currRow].cells[11].getElementsByTagName("INPUT")[0].value=document.getElementById("FC_FLD_POS").value;
			  tableObject.tBodies[0].rows[currRow].cells[10].getElementsByTagName("SELECT")[0].value=document.getElementById("PARENT_BLK").value;
			   
			   if(document.getElementById("EXISTS_IN_FILE").checked==true)
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
			 function fnblocks()
			 {
			 var obj1="";
			 var obj2="";
			 var result1=document.getElementById("BLK_NAME").value;			
             var result2=document.getElementById("PARENT_BLK").value;			
            obj1=document.getElementById("BLK_NAME");
			obj1.options.length=0   
			obj2=document.getElementById("PARENT_BLK");
			obj2.options.length=0   
			var blks=selectNodes(parent.domgi,("//RAD_DATA_BLOCKS"));            
            var blkslen=blks.length;            
            parent.addOption(obj1,"","",true);            
            parent.addOption(obj2,"","",true);            
            for(var i=0;i<blkslen;i++)
			{
			   try{
			    parent.addOption(obj1,getNodeText(selectSingleNode(blks[i],"BLOCK_NAME")),getNodeText(selectSingleNode(blks[i],"BLOCK_NAME")),false);
			    parent.addOption(obj2,getNodeText(selectSingleNode(blks[i],"BLOCK_NAME")),getNodeText(selectSingleNode(blks[i],"BLOCK_NAME")),false);
			    }
			catch(e)
				{
			   parent.addOption(obj1,getNodeText(selectSingleNode(blks[i],"BLOCK_ID")),getNodeText(selectSingleNode(blks[i],"BLOCK_ID")),false);
			   parent.addOption(obj2,getNodeText(selectSingleNode(blks[i],"BLOCK_ID")),getNodeText(selectSingleNode(blks[i],"BLOCK_ID")),false);
			    }
		    }
			document.getElementById("BLK_NAME").value=result1;
			document.getElementById("PARENT_BLK").value=result2;	
		 	
		 }
		 function fnfields()
		 {
		           /*  to  populate Fields in gi for INCOMING*/
	               var result=document.getElementById("FLD_NAME").value;
	               var blkname=document.getElementById("BLK_NAME").value;
	               var dsfld=document.getElementById("FLD_NAME");
	                dsfld.options.length=0;
	                parent.addOption(dsfld,"","",true);
	                var dsnodes=selectNodes(parent.domgi,("//RAD_DATA_BLOCKS[@ID='"+blkname+"']/RAD_BLK_FIELDS"));
	                 for (i=0;i<dsnodes.length;i++){
	                parent.addOption(dsfld,getNodeText(selectSingleNode(dsnodes[i],'FIELD_NAME')),getNodeText(selectSingleNode(dsnodes[i],'FIELD_NAME')),false);
	               } 
				   document.getElementById("FLD_NAME").value=result;
     	 }
	
         </script>
</head>
<body style="background-color:#ffffff" onload="fnInValues();fnDefFldId('<%=ODTUtils.stripXSS(request.getParameter("fld"))%>','<%=ODTUtils.stripXSS(request.getParameter("trimpref"))%>','<%=ODTUtils.stripXSS(request.getParameter("datatype"))%>','<%=ODTUtils.stripXSS(request.getParameter("trimchr"))%>','<%=ODTUtils.stripXSS(request.getParameter("datefmt"))%>','<%=ODTUtils.stripXSS(request.getParameter("blk"))%>','<%=ODTUtils.stripXSS(request.getParameter("fldpos"))%>','<%=ODTUtils.stripXSS(request.getParameter("fldname"))%>','<%=ODTUtils.stripXSS(request.getParameter("stpos"))%>','<%=ODTUtils.stripXSS(request.getParameter("fcfldpos"))%>','<%=ODTUtils.stripXSS(request.getParameter("length"))%>','<%=ODTUtils.stripXSS(request.getParameter("parentblk"))%>','<%=ODTUtils.stripXSS(request.getParameter("exitsfile"))%>')" onkeydown="fnAccessChildScreens(event)" >
<div id="DIVWNDContainer">
	<div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle"  onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Fields</h1>                                      
            <div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
        </div>
	</div>
	
<div   class="Subcontainer" name="DIV_ASSOCIATED_FIELDS_IN" id="DIV_ASSOCIATED_FIELDS_IN" TYPE="SINGLE" VIEW="NO">

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
<LABEL class="LBLstd" for="ST_POS">Start Position</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="ST_POS" name="ST_POS" value="" size="30">
</div>

 
<div class="DIVText" >
<LABEL class="LBLstd" for="LENGTH">Length</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="LENGTH" name="LENGTH" value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="TRIM_PREF">Trimming Preference</LABEL>
<SELECT aria-required="false"  class="SELstd" name="TRIM_PREF" id="TRIM_PREF" >
		<option name="L" id="L"value="L">Left</option>
        <option name="R" id="R"value="R">Right</option>
</SELECT>
</div> 

<div class="DIVText" >
<LABEL class="LBLstd" for="TRIM_CHAR">Trimming Charcater</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="TRIM_CHAR" name="TRIM_CHAR" value="" size="30">
</div>


<div class="DIVText" >
<LABEL class="LBLstd" for="BLK_NAME">Block Name</LABEL>
<SELECT aria-required="false"  class="SELstd" name="BLK_NAME" id="BLK_NAME" onchange="fnblocks();fnfields()"> 
</SELECT>
</div> 

<div class="DIVText" >
<LABEL class="LBLstd" for="FLD_NAME">Field Name</LABEL>
<SELECT aria-required="false"  class="SELstd" name="FLD_NAME" id="FLD_NAME" onchange="fnfields()" > 
</SELECT>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="PARENT_BLK">Key Word</LABEL>
<SELECT aria-required="false"  class="SELstd" name="PARENT_BLK" id="PARENT_BLK" onchange="fnblocks()" > 
</SELECT>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="EXISTS_IN_FILE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="EXISTS_IN_FILE" id="EXISTS_IN_FILE">Exists in File</LABEL>
</div>
</div> 

</fieldset>
<!--End of Form fields column two-->
</div> 
</div>   
     <div style="float:right;padding-right:20px;padding-top:25px;" >
		<BUTTON class="BTNfooter" name="OK"  id="ok"onclick="fnAppendGIIncomingFields('<%=ODTUtils.stripXSS(request.getParameter("tbName"))%>','<%=ODTUtils.stripXSS(request.getParameter("rowid"))%>');fnRADExitSub('ChildWin', event);"  style="visibility:visible;height:25px;width :35px;">Ok</BUTTON>
		<BUTTON class="BTNfooter" id="Cancel" name="Cancel" onclick="fnRADExitSub('ChildWin', event);" style="height:25px;width :60px;">Cancel</BUTTON>
	</div>
</div>
</body>
</html>
