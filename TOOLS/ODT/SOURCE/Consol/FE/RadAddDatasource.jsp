<!--
  **
  **
  ** File Name  : RadAddDatasource.jsp
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
    
	<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
    <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>
    <link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
	<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link> 
    <script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
    <script type="text/javascript" src="Script/JS/RadUIUtils.js"></script> 
	<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
	<script type="text/javascript" src="Script/JS/RadLovHandler.js"></script> 	
	<script type="text/javascript">

            function fncalstyle(){
                            
							parent.document.getElementById("IFCHILD").style.width="650px";
							parent.document.getElementById("IFCHILD").style.height="600px"; 
            }
			function emptyalias(e)
            {
                
                var  tableName = document.getElementById('TABLENAME').value;
                var returArray =new Array();
				if(tableName=="")
                { 
                    alertMessage("Table Name Is Mandatory","E");
                    return;
				}
               else
               {
            	  
                    top.parent.gReqCode = 'UICONTROLLER';
                    top.parent.gReqType = "APP";
                    var radReqDOM = top.parent.buildRADXml();
                    var response = top.parent.fnPost(getXMLString(radReqDOM) + top.parent.gBodySeparator + "R001" + top.parent.gBodySeparator + tableName, "RADClientHandler");
                                          
                   if(getNodeText(selectSingleNode(response,"//VALIDITY"))=="INVALID" && getNodeText(selectNodes(parent.dom, "//RAD_FUNC_PREFERENCES/GW_FUNCTION")[0]) != "Y")
                   {
                       
                       alertMessage("Enter a valid table","E");
                        return false;
                  }
                  else
                  {  
                        var response = top.parent.fnPost(getXMLString(radReqDOM) + top.parent.gBodySeparator + "R007" + top.parent.gBodySeparator + tableName, "RADClientHandler");
                        try
						{ var pkdetails = getXMLString(response);
                        
						  if(pkdetails.indexOf("DB Error")!=-1){
                            returArray[0]="";               
                            }else{
                               returArray[0]=pkdetails.substring(pkdetails.indexOf("<pkfields>")+10,pkdetails.indexOf("<\/pkfields>"));
                             }
						}catch(e){returArray[0]="";}
                }
          }
            
          if(document.getElementById('DATASRC_ALIAS').value=="" ){
            var tablename=tableName;
          }else{    
            var tablename=tableName + '__'+document.getElementById('DATASRC_ALIAS').value; 
          }     		  
          tablename=tablename.toUpperCase();
          returArray[1]=tablename;
          parent.parent.tableName= returArray[1];
		  parent.parent.pkCols= returArray[0];               
          fnAddAttr('DSN');
          fnRADExitSub('ChildWin', e);
             
           
        }
       function getdlgattrs()
       {
           var schem=parent.jndiName;        
           document.getElementById("Cancel").focus();
       }
        
      function setValues(tabName)
      {
        document.getElementById('TABLENAME').value = tabName;
      }
	    
        </script>
     </head>
<body onload="getdlgattrs();fncalstyle();" onkeydown="fnAccessChildScreens(event)" style="height:100%;width:100%" SCROLL="NO">
 <div id="DIVWNDContainer1">
  <div class="WNDtitlebar" id="WNDtitlebar" >
	<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">AddTable</h1>                                      
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
	<LABEL id="ENVCODE"  for="TABLENAME" class="LBLstd" style="width:100px;">Table Name</LABEL>
	 <INPUT aria-required="false" type="text" id="TABLENAME" name="TABLENAME" onchange="upper(this)"></INPUT>
     <BUTTON   class="BTNimg" title="List Of Values" tabindex="-1" onclick="LOV_DATASRC.show_lov('TABLENAME~','frmDSLOV','', 'Data Source', 'Table Name', 'Table Name',event)">
     <span class="ICOlov"></span></BUTTON>
	</div>
	<div class="DIVText">
	<LABEL for="DATASRC_ALIAS"  class="LBLstd" style="width:100px;">Alias Name</LABEL>
	<INPUT aria-required="false" type="text" id="DATASRC_ALIAS" name="DATASRC_ALIAS"></INPUT> 	
	</div>

</fieldset>
            
<div style="text-align:right; margin-top:10px;padding-right:35px; clear:both">
	<BUTTON class="BTNfooter" name="OK"  id="ok" onclick="emptyalias(event)" style="visibility:visible;height:25px;width :35px;">Ok</BUTTON>
	<BUTTON class="BTNfooter" id="Cancel" name="Cancel" onclick="fnRADExitSub('ChildWin', event)"  style="height:25px;width :60px;">Cancel</BUTTON>
</div>
	</div>
	</div> 
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div> 
</div>
</body> 
</html> 
   	    