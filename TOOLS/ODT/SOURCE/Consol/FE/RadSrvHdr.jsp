<!--
  **
  **
  ** File Name  : RadSrvHdr.jsp
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
   
<html lang="en" >
    <head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>		
	    <link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
		<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>	 
		
<script>

var loadxmldata = "";
	  
	  
	     function fnLoadRadXMLFORNONIE(p_funcId)
			  {
                                	                                 
				 xml2 = loadxmldata;	                                 
				 loadSRVRad(p_funcId);                                                              
				 document.getElementById('SRV_FILE_SAVE_PATH').value =p_funcId ;
				 document.getElementsByName("SRV_FILE_SAVE_PATH")[0].disabled=false;			  
				 document.getElementById('SRV_FILE_SAVE_PATH').style.visibility="visible";				                                   
                 document.getElementsByName("BROWSE")[0].disabled=true;
			  }
                          
                            isNotDoubleClick = function () {
                             if (document.getElementById('save').className=='BUTTONToolbar') document.getElementById('save').disabled=true;
                             setTimeout("blockClick()", 200);
                             return document.getElementById('save').disabled;
                                }
                            blockClick = function () {
                            document.getElementById('save').disabled=false;
                                }
</script>
</head>
<!--<body class="BODYTop" onload="dhtmlLoadScript();getSchemadetails();loadDOM();">    -->
<body class="BODYTop">    
<div id="toolbar" class="branding" align="right">    
<!-- start --> 
<table role="presentation" summary="" border="0" cellspacing="0" cellpadding="1">
<tr>
			<td style="visibility:hidden"><img src="Images/seperator.gif" alt="" width="1px" height="13px"></td>
			<td style="visibility:hidden"><BUTTON class="BUTTONToolbarD" title="Deploy"  name="depFiles"  id="depFiles" onclick="fnLnchGen('DEPLOY')" disabled="true"><img src="Images/Deploy.gif" alt="Deploy"></BUTTON></td>
			<td style="visibility:hidden"><BUTTON class="BUTTONToolbarD" title="Release"  name="chekinFiles"  id="chekinFiles" onclick="fnLnchGen('RELEASE')" disabled="true"><img src="Images/checkin.gif" alt="checkin"></BUTTON></td>		
			<td  style="visibility:hidden"><BUTTON class="BUTTONToolbar" title="Exit" name="exit" id="exit" onclick="fnRADExitAll(seqNo, event)"><img  src="Images/Exit.gif" alt="Exit"></BUTTON></td>		
            <td ><BUTTON class="BUTTONToolbarD" title="Save" name="save" id="save" onclick="if(isNotDoubleClick()) fnSaveData('0')" disabled="true"><img  src="Images/Save.gif"  alt="Save" ></BUTTON></td>
			<td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Cancel"  name="close" id="close" onclick="fn_cancel()" disabled="true"><img  src="Images/Cancel2.gif" alt="Cancel"></BUTTON></td>
			<td  style="visibility:hidden"><BUTTON class="BUTTONToolbarD" title="Generate"  name="genFiles"  id="genFiles" onclick="if(isNotDoubleClick()) fngen_service()" disabled="true"><img src="Images/Generate.gif" alt="Generate"></BUTTON></td>
			<td>&nbsp;</td>
</tr>
</table>

<div class="DIVHeader" style="width:100% ">
	<table role="presentation" summary="" class="TABLELyt" align="left" width="80%"  border="0" TYPE="SINGLE" NAME="RADMN" id="RADMN" VIEW="NO" cellpadding="1" cellspacing="0"> 
        <tr>
			<td align="right"><LABEL for="SRV_ACTION">Action</LABEL></td>
			<td>
				<SELECT aria-required="false" name="SRV_ACTION" id="SRV_ACTION" onchange="fnSrvActions();">
				<option selected="NONE" value="NONE" >None</option>
				<option value="NEW" >New</option>
				<option value="LOAD" >Load</option>
				</SELECT>
			</td>
			
			<td align="right"><LABEL for="SERVICE_NAME" mrs2='"mrs2"'>Service Name</LABEL></td>
			<td><INPUT aria-required="false" accesskey="1" id="SERVICE_NAME" name="SERVICE_NAME" type="text" size="30" disabled="true"></INPUT>
			<BUTTON  id="LOVSERVICENAME" name="LOVSERVICENAME" class="BTNimg"  title="List Of Values" tabindex="-1"  onclick="LOV_SERVICE_NAME.show_lov('SERVICE_NAME~SERVICE_DESC~','frmAct','', 'Service Name', 'Service Name~Service Description', 'Service Name~Service Description',event)">
			<span class="ICOlov"></span></BUTTON></td>
			
			
			<td></td>
		</tr> 
		<tr>
					
			<td align="right"><LABEL id="LBL_SRV_LOAD_XML" value="Load Screen Xml" for="SRV_FILE_SAVE_PATH">Save XML Path</LABEL></td>
			<td><INPUT aria-required="false" type="file" name ="SRV_LOAD_SCREEN_XML" id ="SRV_LOAD_SCREEN_XML"size="10" style="display:none;position:absolute" disabled="true"/>                                        
				<INPUT aria-required="false" type="text" name="SRV_FILE_SAVE_PATH" id="SRV_FILE_SAVE_PATH" title="" value="" size="20" disabled="true"/>                                        
				<INPUT aria-required="false" type="button"  class="BTNfooter"  name ="BROWSE" id ="BROWSE" value="BROWSE" onclick="loadBrowserXML(event)" style="visibility:hidden; position:absolute" disabled="true"/> 			
			</td> 
			
			 <td align="right"><LABEL for="SRV_PRODUCT">Product</LABEL></td>
			<td>
				<SELECT aria-required="false" name="SRV_PRODUCT" id="SRV_PRODUCT">
				<option selected="FCUBS" value="FCUBS" >FCUBS</option>
				<option value="ELCM" >ELCM</option>
				<option value="FCIS" >FCIS</option>
				<option value="PM" >Payments</option>
				<option value="SMS" >SMS</option>
				<option value="VAMS" >VAMS</option>
				</SELECT>
			</td>
			
			<td></td>
		</tr> 
	</table>
</div> 	
</div>
</body>
</html>