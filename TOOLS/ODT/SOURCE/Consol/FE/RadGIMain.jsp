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
  ** Copyright Â© 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

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
                if(document.getElementById("ACTION").value!="NEW" && document.getElementById("FUNCTION_ID").value=="")
				{
				xml2 = loadxmldata;	                                 
				 LoadGIxml();                                                                  
				 document.getElementById('FILE_SAVE_PATH').value =p_funcId ;
				 document.getElementsByName("FILE_SAVE_PATH")[0].disabled=false;			  
				 document.getElementById('FILE_SAVE_PATH').style.visibility="visible";		
				 document.getElementsByName("BROWSE")[0].disabled=true;
				 }
				else{fnLoadMstRadXMLFORNONIE(p_funcId);}
		 }
		function fnLoadMstRadXMLFORNONIE(p_funcId)
    	 {
                 xml3 = loadxmldata;	  
                 domgi=loadXMLDoc(xml3);
				 var relt=parent.relType;
				 if (selectNodes(domgi, "RAD_FUNCTIONS/RAD_CUSTOMER").length > 0) 
				 { parent.relType="CUSTOMER"; }
				  else if (selectNodes(domgi, "RAD_FUNCTIONS/RAD_CUSTOM").length > 0) 
				 { parent.relType="CUSTOM"; }
				 else if (selectNodes(domgi, "RAD_FUNCTIONS/RAD_CLUSTER").length > 0) 
				 { parent.relType="CLUSTER"; }
				 else { parent.relType="KERNEL"; }
				 var funcid = getNodeText(selectSingleNode(domgi, "//RAD_FUNCTIONS/FUNCTION_ID"));
				 var functid=document.getElementsByName('FUNCTION_ID')[0].value;
				 if(document.getElementsByName('FUNCTION_ID')[0].value=="")
		 {
    		     try
				 {
				 var funcTyp = getNodeText(selectSingleNode(domgi, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
    		     domgi=fnPrepareConsolDOM(domgi,funcid,funcTyp,"LOAD");	
				 }
				 catch (e)
				 {}
		 }
		 else if(document.getElementsByName('FUNCTION_ID')[0].value==funcid)
		 {
    		     try
				 {
				 var funcTyp = getNodeText(selectSingleNode(domgi, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
    		     domgi=fnPrepareConsolDOM(domgi,funcid,funcTyp,"LOAD");	
				 }
				 catch (e)
				 {}
		 }
		 else
		 {                           
		        document.getElementsByName('FUNCTION_ID')[0].value=functid;
				document.getElementById("PARENT_XML").disabled=false;
				document.getElementsByName("PARENT_XML")[0].value="";
			    document.getElementById("PARENT_XML").style.visibility="visible";
				domgi="";
			    alertMessage("please load original Radxml","I");	
		        return;
		 }
		 
				 parent.relType=relt;			 
                 document.getElementsByName('FUNCTION_ID')[0].value = funcid;				 
                 document.getElementById('FILE_SAVE_PATH').style.visibility="visible";	
				 document.getElementsByName("BROWSE")[0].disabled=true;
				 document.getElementById("PARENT_XML").disabled=true;
		 }
		function loadMasterXMLData()
		{
				var radXml = fnReadMode("",document.getElementsByName("PARENT_XML")[0].value , document.getElementsByName("PARENT_XML")[0]);		
				loadMstxmldata = radXml;            
				fnLoadMstRadXMLFORNONIE(document.getElementsByName("PARENT_XML")[0].value);
		}
</script>
</head>
<body class="BODYTop" onload="fngetReadMode('SINGLE')">  
<div id="toolbar" class="branding" align="right">
<!-- start-->    
<table role="presentation" summary="" border="0" cellspacing="0" cellpadding="1" name="RadGiHMain" id="RadGiHMain"> 
<tr>
<td style="visibility:hidden"><BUTTON class="BUTTONToolbar" title="Exit" name="exit" id="exit" onclick="fnRADExitAll(seqNo, event)"><img  src="Images/Exit.gif" alt="Exit" ></BUTTON></td>
<td ><BUTTON class="BUTTONToolbarD" title="Save (CTRL + S)" name="saveRADXml" id="saveRADXml" onclick="saveGIxml('0','')" disabled="true"><img  src="Images/Save.gif" alt="Save (CTRL + S)" ></BUTTON></td>
<td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Cancel"  name="close" id="close" onclick="winrtn()" disabled="true"><img  src="Images/Cancel2.gif" alt="Cancel"></BUTTON></td>
<td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Generate"  name="genFiles"  id="genFiles" onclick="savexml()" disabled="true"><img src="Images/Generate.gif"  alt="Generate"></BUTTON></td>
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
                <SELECT aria-required="false" name="ACTION" id="ACTION" onchange="GIBasicVals()">
                <option selected="NONE" value="NONE" >None</option>
                <option value="NEW" >New</option>
                <option value="LOAD" >Load</option>
                </SELECT>
                </td>
                    
                <td align="right"><LABEL for="FORMAT_CATEGORY">Format Category</LABEL></td>
                <td>
                <SELECT aria-required="false" name="FORMAT_CATEGORY" id="FORMAT_CATEGORY" disabled="true" onchange="showhidedivid()">
                <option selected="O" value="O" >Outgoing</option>
                <option value="I" >Incoming</option>                            
                </SELECT>
                </td> 
				<td align="right"><LABEL for="FUNCTION_ID">Function Id</LABEL></td>
                <td><INPUT aria-required="false" accesskey="1" id="FUNCTION_ID" name="FUNCTION_ID" onchange="upper(this)" disabled="true"  type="text" size="10"  maxlength="8" ></INPUT></td>
				         
				  
			</tr>
			<tr>
				
                <td align="right"><LABEL for="FORMAT_ID">Format Id</LABEL></td>
                <td><INPUT aria-required="false" accesskey="1" id="FORMAT_ID" name="FORMAT_ID" disabled="true" onchange="createGIMainElements();upper(this)"  type="text" size="10"  maxlength="8" ></INPUT></td>                            
                
				<td align="right"><LABEL id="LBL_LOAD_XML" name ="LBL_LOAD_XML" value="Load Screen Xml" for="FILE_SAVE_PATH">Save XML Path</LABEL></td>
                <td id="LOAD_XML">                                                                                
                <INPUT aria-required="false" type="file" name ="LOAD_SCREEN_XML" id ="LOAD_SCREEN_XML"size="10" onchange="loadRADXMLData()" style="display:none;position:absolute" disabled="true">                                        
                <INPUT aria-required="false" type="text" name="FILE_SAVE_PATH" id="FILE_SAVE_PATH" title="" value="" size="10" disabled="true" >                                        
                <INPUT aria-required="false" type="button" class="BTNfooter" name ="BROWSE" id ="BROWSE" value="BROWSE" onclick="loadBrowserXML(event);" style="visibility:hidden; position:absolute" disabled="true">                                 
                </td>
					
				<td align="right"><LABEL for="PARENT_XML">RAD Xml</LABEL></td>
				<td><INPUT aria-required="false" type="file" name="PARENT_XML" id="PARENT_XML" size="10"  onchange="loadMasterXMLData()" style="display:none;position:absolute" disabled="true" >
					<INPUT aria-required="false" type="text" id="PARENT_XML" name="PARENT_XML" size="10"  disabled="true" >
					<INPUT aria-required="false" type="button" name ="BROWSEPRNT" id ="BROWSEPRNT" value="BROWSE" onclick="loadBrowserXML(event)" style="visibility:hidden; position:absolute" disabled="true"></td> 
                <td style="visibility:hidden"></td> 
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