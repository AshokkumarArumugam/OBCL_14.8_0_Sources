<!--
  **
  **
  ** File Name  : RadGIMain.jsp
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
	       
	    function loadRADXMLData()
         {
				var radXml = fnReadMode("",document.getElementsByName("LOAD_SCREEN_XML")[0].value , document.getElementsByName("LOAD_SCREEN_XML")[0]);		
				loadxmldata = radXml;            
				fnLoadRadXMLFORNONIE(document.getElementsByName("LOAD_SCREEN_XML")[0].value);
         }
		function fnLoadRadXMLFORNONIE(p_funcId)
    	 {
                if(document.getElementById("ACTION").value!="NEW")
				{
				 xml2 = loadxmldata;	 
				 LoadPFxml(); 
				 var ddom= loadXMLDoc(xml2);
				 document.getElementById('FILE_SAVE_PATH').value = p_funcId ;
				 document.getElementById('MODULE_NAME').value = getNodeText(selectSingleNode(ddom,"//RAD_FUNCTIONS/ENTITY_MODULE_CODE"));
				 document.getElementById('ENTITY_NAME').value = getNodeText(selectSingleNode(ddom,"//RAD_FUNCTIONS/ENTITY_NAME"));
				 try{
				 document.getElementById('ENTITY_TYPE').value = getNodeText(selectSingleNode(ddom,"//RAD_FUNCTIONS/ENTITY_TYPE"));
				 }
				 catch(e){
				 document.getElementById('ENTITY_TYPE').selected ="NORMAL";
				 }
				 document.getElementById('ENTITY_ID').value =  p_funcId.split("_")[0]; 
				 document.getElementsByName("FILE_SAVE_PATH")[0].disabled=false;			  
				 document.getElementById('FILE_SAVE_PATH').style.visibility="visible";		
				 document.getElementsByName("BROWSE")[0].disabled=true;
				 } 
		 } 
</script>
</head>
<body class="BODYTop" onload="fngetReadMode('SINGLE')">  
<div id="toolbar" class="branding" align="right">
<!-- start-->    
<table role="presentation" summary="" border="0" cellspacing="0" cellpadding="1" name="RadGiHMain" id="RadGiHMain"> 
<tr>
<td style="visibility:hidden"><BUTTON class="BUTTONToolbar" title="Exit" name="exit" id="exit" onclick="fnRADExitAll(seqNo, event)"><img  src="Images/Exit.gif" alt="Exit" ></BUTTON></td>
<td ><BUTTON class="BUTTONToolbarD" title="Save (CTRL + S)" name="saveRADXml" id="saveRADXml" onclick="savePFxml('0','')" disabled="true"><img  src="Images/Save.gif" alt="Save (CTRL + S)" ></BUTTON></td>
<td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Cancel"  name="close" id="close" onclick="winrtn()" disabled="true"><img  src="Images/Cancel2.gif" alt="Cancel"></BUTTON></td>
<td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Generate"  name="genFiles"  id="genFiles" onclick="fn_default_tabledetails();savexml()" disabled="true"><img src="Images/Generate.gif"  alt="Generate"></BUTTON></td>
<td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Deploy"  name="depFiles"  id="depFiles" onclick="deploy_files()" disabled="true"><img src="Images/Deploy.gif" alt="Deploy"></BUTTON></td>
<td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Release"  name="chekinFiles"  id="chekinFiles" onclick="fnRelease()" disabled="true"><img src="Images/checkin.gif" alt="Release"></BUTTON></td>		
<td>&nbsp;</td>
</tr>
</table> 

<div class="DIVHeader" style="width:100% "> 
<table role="presentation" summary="" class="TABLELyt" width="100%"  border="0" TYPE="SINGLE" NAME="RADGIMN" id="RADGIMN" VIEW="NO" cellpadding="1" cellspacing="0">
			<tr>
                <td align="right"><LABEL for="ACTION">Action</LABEL></td>
                <td>
                <SELECT aria-required="false" name="ACTION" id="ACTION" onchange="PFBasicVals()">
                <option selected="NONE" value="NONE" >None</option>
                <option value="NEW" >New</option>
                <option value="LOAD" >Load</option>
                </SELECT>
                </td>
                
				 <td align="right"><LABEL for="ENTITY_NAME">Entity Name</LABEL></td>
                <td><INPUT aria-required="false" class="TXTstd" id="ENTITY_NAME" name="ENTITY_NAME"  disabled="true" onchange="createPFMainElements();upper(this)"  type="text"  ></INPUT></td>                            
                
				<td align="right"><LABEL for="ENTITY_ID">Entity Id</LABEL></td>
                <td><INPUT aria-required="false" class="TXTro" id="ENTITY_ID" name="ENTITY_ID"  readonly tabindex="-1"  type="text" size="30" ></INPUT></td>                            
                
				  
			</tr>
			<tr>
				
				
				<td align="right"><LABEL id="LBL_LOAD_XML" name ="LBL_LOAD_XML" value="Load Screen Xml" for="FILE_SAVE_PATH">Save XML Path</LABEL></td>
                <td id="LOAD_XML">                                                                                
                <INPUT aria-required="false" type="file" name ="LOAD_SCREEN_XML" id ="LOAD_SCREEN_XML" size="10" onchange="loadRADXMLData()" style="display:none;position:absolute" disabled="true">                                        
                <INPUT aria-required="false" class="TXTstd" type="text" name="FILE_SAVE_PATH" id="FILE_SAVE_PATH" title="" value=""   disabled="true" >                                        
                <INPUT aria-required="false" type="button"  class="BTNfooter" name ="BROWSE" id ="BROWSE" value="BROWSE" onclick="loadBrowserXML(event);" style="visibility:hidden; position:absolute" disabled="true">                                 
                </td>
					
				<td align="right"><LABEL for="MODULE_NAME">Module Name</LABEL></td>
				<td>
				<INPUT aria-required="false"  class="TXTstd"  type="text"  id="MODULE_NAME" name="MODULE_NAME"  disabled="true" onkeydown="FnEntityid()" onchange="FnEntityid()" value="" >
				<BUTTON  class="BTNimg"  title="List Of Values" tabindex="-1" id="BTN_LBLCD" onclick="LOV_MODULE.show_lov('MODULE_NAME~','frmMnDtls','', 'Module Code', 'Module Code~Module Description', 'Module Code~Module Description',event);">
				<span class="ICOlov"></span></BUTTON> 
				</td>
				 
				<td align="right"><LABEL for="ENTITY_TYPE">Entity Type</LABEL></td>
                <td>
                <SELECT aria-required="false" name="ENTITY_TYPE" id="ENTITY_TYPE" onchange="fn_Display_Arguments()">
                <option selected="NORMAL" value="NORMAL" >Normal</option> 
                <option value="COMMON" >Common</option>
                </SELECT>
                </td>
				
			</tr> 
</table>
</div>
<div style="display:none">
<INPUT aria-required="false" type="text" name="OPERATION" id="OPERATION">
<INPUT aria-required="false" type="date" name="ORIGINATION_DATE" id="ORIGINATION_DATE" style="visibility:hidden;width:1px">
<INPUT aria-required="false" type="text" name="USER_ID" id="USER_ID" style="visibility:hidden;width:1px">
<INPUT aria-required="false" type="text" name="RELEASE_CODE" id="RELEASE_CODE" style="visibility:hidden;width:1px">
<INPUT aria-required="false" type="text" name="ENV_CODE" id="ENV_CODE" style="visibility:hidden;width:1px">
</div> 
</div>
</body>
</html>