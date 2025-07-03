<!--
  **
  **
  ** File Name  : RadAddElements.jsp
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
        <title> <%=ODTUtils.stripXSS(request.getParameter("Title")) %> </title>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
		<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
		<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
		<script type="text/javascript" src="Script/JS/RadTree.js"></script>
		<script type="text/javascript" src="Script/JS/RadDeleteRename.js"></script> 
		<script type="text/javascript" src="Script/JS/RadAccessChild.js"></script>		
		<script type="text/javascript">		
        function empty(e)
        {      
			var evnt = window.event || e;
               
		   if(document.getElementById('TABLENAME').value=="")
            {
       		  alertMessage("Please Enter  " +document.getElementById('LBL_FROM_NAME').innerText,"E");
       		  return;
            }else if(document.getElementById('LBL_FROM_NAME').innerText=="New Value"){
                    var retu=parent.checkDublicate(document.getElementById('TABLENAME').value);
                    if(retu==1){
						alertMessage("Field Already Exists","E");
						return;
                    }else if(retu==3){
						return;
                    }
            }
            parent.element= document.getElementById('TABLENAME').value;
			parent.elementval= document.getElementById('LBL_FROM_NAME').innerText;
			if(parent.renameFlg=="NO"){
			
		     	fnAddAttr(parent.selectedval);
				
			}else{
			    
			   if(!fnRenameval(parent.selectedval))
			    return false;
				
			}
			
			if(parent.document.getElementById('FUNCTION_TYPE').value =="S"){
            parent.document.getElementById('BLOCK_TYPE').value="CONTROL";
			parent.document.getElementById('BLOCK_TYPE').disabled=true;
		    parent.document.getElementById('MASTER_BLOCK').disabled=true;

             }
			 
			 fnRADExitSub('ChildWin', evnt);
           
        }
    
        
         function upper(r){
              r.value = r.value.toUpperCase();
         }
		 
		 function fnSetFcs(){
		  document.getElementById('Cancel').focus();
		 }
		
		function fncalht()
		{
		parent.document.getElementById("IFCHILD").style.width="650px";
		parent.document.getElementById("IFCHILD").style.height="600px";  
		}		
		 
		
        </script> 
    </head>   
    <body onload="fncalht();SetCursorToTextEnd('TABLENAME');fnSetFcs()" onkeydown="fnAccessChildScreens(event)" style="height:100%;width:100%" SCROLL="NO" >
 	<div id="DIVWNDContainer1">
	    <div class="WNDtitlebar" id="WNDtitlebar" >
	    	<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt"><%=ODTUtils.stripXSS(request.getParameter("Title"))%></h1>                                      
	    		<div class="WNDbuttons">
					<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
						<span class="LBLinv">Close</span>
					</a>
				</div>
	    	</div>
	    </div>  

        <div class="Div_small" id="ResTree"  style="width:21em; border:none">
          <fieldset class="FSTcell">
          <legend>&nbsp;</legend>
          	
          	<div class="DIVText">
          	<LABEL id="LBL_FROM_NAME"  for="TABLENAME" class="LBLstd" style="width:100px;"><%=ODTUtils.stripXSS(request.getParameter("ColumnName"))%></LABEL>
          	 <INPUT aria-required="false" type="text" id="TABLENAME" name="TABLENAME" size="30" onchange="upper(this)" value="<%=ODTUtils.stripXSS(request.getParameter("defaultValue"))%>" >
                
          	</div>
          	 
          </fieldset>
                      
          <div style="float:right;padding-right:40px;padding-top:20px;"> 
          	<BUTTON class="BTNfooter" name="OK"  id="ok" onclick="empty(event);" style="visibility:visible;height:25px;width :35px;">Ok</BUTTON>
          	<BUTTON class="BTNfooter" id="Cancel" name="Cancel" onclick="fnRADExitSub('ChildWin', event)"  style="height:25px;width :60px;">Cancel</BUTTON>
          </div>
         </div>		
	</div>
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div> 
</div>
</body>
 </html>
   	    