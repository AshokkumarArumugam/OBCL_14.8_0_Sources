<!--
  **
  **
  ** File Name  : RadMain.jsp
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
 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap" %>
<html lang="en" >
    <head>
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>		
	    <link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
		<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>	 
		<title>Rad Main</title>  
</head>
<!--<body class="BODYTop" onload="dhtmlLoadScript();getSchemadetails();loadDOM();">    -->
<body class="BODYTop" onload="fngetReadMode('SINGLE')">    
<div id="toolbar" class="branding" align="right">    
<!-- start --> 
<table id="TOOLBARTAB" name="TOOLBARTAB" role="presentation" summary="" border="0" cellspacing="0" cellpadding="1">
<tbody>
<tr>
<td style="visibility:hidden"><BUTTON class="BUTTONToolbar" title="Exit" name="exit" id="exit" onclick="fnRADExitAll(seqNo, event)"><img src="Images/Exit.gif" alt="Exit" ></BUTTON></td>
<td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Save (CTRL + S)" name="saveRADXml" id="saveRADXml" onclick="storeXml();" disabled="true"><img  src="Images/Save.gif"  alt="Save (CTRL + S)"  ></BUTTON></td>
<td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Cancel"  name="close" id="close" onclick="if(isNotDoubleClick('close')) winrtn()" disabled="true"><img  src="Images/Cancel2.gif" alt="Cancel"></BUTTON></td>
<td align="center" width="25px"><BUTTON class="BUTTONToolbar" title="Labels" name="missingLabels" id="missingLabels" onclick="if(isNotDoubleClick('missingLabels')) fnfetchmissingLabelCodes();fnMissinglabels();"><img  src="Images/Label_l.gif" alt="Labels" ></BUTTON></td>
<td align="center" width="25px"><BUTTON class="BUTTONToolbar" title="Labels" name="missingComments" id="missingComments" onclick="if(isNotDoubleClick('missingLabels')) fnfetchmissingComments();fnMissingcomments();"><img  src="Images/Label_C.gif" alt="Comments" ></BUTTON></td>
<td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Generate"  name="genFiles"  id="genFiles" onclick="if(isNotDoubleClick('genFiles')) savexml()" disabled="true"><img src="Images/Generate.gif" alt="Generate" ></BUTTON></td>
<td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Deploy"  name="depFiles"  id="depFiles" onclick="if(isNotDoubleClick('depFiles')) deploy_files()" disabled="true"><img src="Images/Deploy.gif" alt="Deploy"></BUTTON></td>
<td align="center" width="25px" style="display:none"><BUTTON class="BUTTONToolbarD" title="Release"  name="chekinFiles"  id="chekinFiles" onclick="if(isNotDoubleClick('chekinFiles')) fnRelease()" disabled="true"><img src="Images/checkin.gif" alt="Release"></BUTTON></td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
 
<div class="DIVHeader" style="width:100% ">
			<table role="presentation" summary="" class="TABLELyt" width="100%"  border="0" TYPE="SINGLE" NAME="RADMN" id="RADMN" VIEW="NO" cellpadding="1" cellspacing="0">
						<tr>
						<td align="right" width="150px"><LABEL for="ACTION">Action</LABEL></td>
						<td width="150px">
						<SELECT aria-required="false" name="ACTION" id="ACTION" onchange="BasicVals()">
						<option selected="NONE" value="NONE" >None</option>
						<option value="NEW" >New</option>
						<option value="LOAD" >Load</option>
						</SELECT>
						</td>
						<td align="right"><LABEL for="FUNCTION_TYPE">Function Type</LABEL></td>
						<td>
						<SELECT aria-required="false" name="FUNCTION_TYPE" id="FUNCTION_TYPE" disabled="true" onchange="enableMasterFlds()">
						<option value="C">Child</option>
						<option selected="P" value="P">Parent</option>
						<option  value="S">Screen Child</option>
						</SELECT>
						</td>
						<td align="right"><LABEL for="FUNCTION_CATEGORY">Function Category</LABEL></td>
						<td>
						<SELECT aria-required="false" name="FUNCTION_CATEGORY" id="FUNCTION_CATEGORY" disabled="true" onchange="enableMasterFlds(); buildOptions(document.getElementById('SUM_SCREEN_SIZE')); buildOptions(document.getElementById('SCREEN_SIZE')); buildOptions(document.getElementsByName('RELATION_TYPE')[0]); buildOptions(document.getElementById('DISPLAY_TYPE_BLKF'));  buildOptions(document.getElementById('BLK_MULTI_RECORD')) ; buildOptions(document.getElementById('MULTI_RECORD_DSR'))">
						<option value="MAINTENANCE">Maintenance</option>
						<option value="REPORT">Report</option>
						<option value="TRANSACTION">Transaction</option>
                        <option value="SUMMARY">Summary</option>						
                        <option value="DASHBOARD">DashBoard</option> 
						<option value="OTHERS">Others</option>
						</SELECT>
						</td>
                        <td align="right" style="visibility:hidden"></td>
                       	<td style="visibility:hidden"></td>
					</tr>
					<tr>
					<td align="right"><LABEL for="FUNCTION_ID" mrs2='"mrs2"'>Function Id</LABEL></td>
					<td><INPUT aria-required="false" accesskey="1" id="FUNCTION_ID" name="FUNCTION_ID"  onchange="createMainElements();upper(this)"  type="text" size="10"  maxlength="8" disabled="true"></INPUT></td>
					<td align="right"><LABEL for="PARENT_FUNC_ID">Parent Function</LABEL></td>
					<td><INPUT aria-required="false" type="text" name="PARENT_FUNC_ID" id="PARENT_FUNC_ID" size="10" disabled="true"></td>
					<td align="right"><LABEL for="HEADER_TEMPLATE">Header Template</LABEL></td>
					<td>
					<SELECT aria-required="false" name="HEADER_TEMPLATE" id="HEADER_TEMPLATE" onchange="appendAuditTemp()" disabled="true">
					<option selected="None" value="NONE" >None</option>
					<option value="PROCESS" >Process</option>
					</SELECT>
					</td>
					<td style="visibility:hidden"></td>
					<td style="visibility:hidden">
					</td>
                    </tr>
					<tr>
					<td align="right"><LABEL id="LBL_LOAD_XML" name ="LBL_LOAD_XML" for="FILE_SAVE_PATH" value="Load Screen Xml" >Save XML Path</LABEL></td>
					<td id="LOAD_XML">                                                                                
                                       <input type="file" name ="LOAD_SCREEN_XML" id ="LOAD_SCREEN_XML"size="10" onchange="loadRADXMLData(); enableMasterFlds1(); buildOptions(document.getElementById('SUM_SCREEN_SIZE')); buildOptions(document.getElementById('SCREEN_SIZE')); buildOptions(document.getElementsByName('RELATION_TYPE')[0]); buildOptions(document.getElementById('DISPLAY_TYPE_BLKF')); buildOptions(document.getElementById('BLK_MULTI_RECORD')) ; buildOptions(document.getElementById('MULTI_RECORD_DSR'))" style="visibility:hidden; position:absolute" disabled="true">                                        
                                       <INPUT aria-required="false" type="text" name="FILE_SAVE_PATH" id="FILE_SAVE_PATH" title="" value="" size="10" disabled="true" >                                        
                                       <INPUT aria-required="false" class="BTNfooter" type="button" name="BROWSE" id="BROWSE" value="BROWSE" onclick="loadBrowserXML(event)" style="visibility:hidden; position:absolute" disabled="true">  
                                       
		 			</td>
					<td align="right"><LABEL for="PARENT_XML">Parent Xml</LABEL></td>
					<td><INPUT aria-required="false" type="text" id="PARENT_XML" name="PARENT_XML" title="" value=""  size="10"  disabled="true">	
						<INPUT aria-required="false" class="BTNfooter"  type="button" name ="BROWSEPRNT" id ="BROWSEPRNT" value="BROWSE" onclick="loadBrowserXML(event)" style="visibility:hidden; position:absolute" disabled="true">  
                            						
					</td>
					<td align="right"><LABEL for="FOOTER_TEMPLATE">Footer Template</LABEL></td>
					<td>
					<SELECT aria-required="false" name="FOOTER_TEMPLATE" id="FOOTER_TEMPLATE" onchange="appendAuditTemp()" disabled="true">
					<option selected="None" value="NONE" >None</option>
					<option value="MAINTAUDIT" >Maint Audit</option>
					<option value="MAINTPROCESS" >Maint Process</option>
					<option value="PROCESS" >Process</option>
					</SELECT>
					</td>
                    <td style="visibility:hidden;width:1px"></td>
					<td style="visibility:hidden"></td>   
		   		</tr>
	 		</table>
            </div>  
		</div>
		<div style="display:none">
					<SELECT aria-required="false" name="CALL_FORM_TYPE" id="CALL_FORM_TYPE">
					<option selected="DATA" value="DATA">Data</option>
					</SELECT>
					<INPUT aria-required="false" type="checkbox" id="GEN_ALL" name="GEN_ALL" disabled="true">
					<INPUT aria-required="false" type="text" name="LANG" id="LANG" > 
					<SELECT aria-required="false" name="FUNCTION_ORIGIN" id="FUNCTION_ORIGIN" style="visibility:hidden;width:1px">
					<option value="KERNEL">Kernel</option>
					<option value="CLUSTER">Cluster</option>
					<option value="CUSTOM">Custom</option>
					</SELECT>
					<SELECT aria-required="false" name="PARENT_ORIGIN" id="PARENT_ORIGIN" style="visibility:hidden;width:1px">
					<option value="KERNEL">Kernel</option>
					<option value="CLUSTER">Cluster</option>
					<option value="CUSTOM">Custom</option>
					</SELECT>
					<INPUT aria-required="false" type="text" name="OPERATION" id="OPERATION" style="visibility:hidden;width:1px"/>
					<INPUT aria-required="false" type="date" name="ORIGINATION_DATE" id="ORIGINATION_DATE" style="visibility:hidden;width:1px"/>
					<INPUT aria-required="false" type="text" name="USER_ID" id="USER_ID" style="visibility:hidden;width:1px"/>
					<INPUT aria-required="false" type="date" name="RELEASE_CODE" id="RELEASE_CODE" style="visibility:hidden;width:1px"/>
					<INPUT aria-required="false" type="text" name="ENV_CODE" id="ENV_CODE" style="visibility:hidden;width:1px"/>
					<INPUT aria-required="false" type="date" name="CHECKIN_MODE" id="CHECKIN_MODE" style="visibility:hidden;width:1px"/>
					<INPUT aria-required="false" type="text" name="SITE_CODE" id="SITE_CODE" style="visibility:hidden;width:1px"/>
					<INPUT aria-required="false" type="date" name="SFR_NO" id="SFR_NO" style="visibility:hidden;width:1px"/>
					<INPUT aria-required="false" type="text" name="PARENT_MODULE_ID" id="PARENT_MODULE_ID" style="visibility:hidden;width:1px">
					
		</div>
     </body>
 </html>