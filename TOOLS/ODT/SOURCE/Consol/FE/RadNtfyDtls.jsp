<!--
  **
  **
  ** File Name  : RadNtfyDtls.jsp
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
<html lang="en" >
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>		
	    <link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
		<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link> 
    </head>
<body> 
<div class="DIVMultipleBig" style="margin-top:0px;padding-top:0px;position:relative;margin-left:20px; margin-right:20px;width:95%;">	

<div   class="Subcontainer" TYPE="SINGLE" id="NOTIFDTLS" name="NOTIFDTLS">

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText" >
<LABEL class="LBLstd star"  id="NOTIFICATIONCODE" for="NOTIFICATION_CODE">Notification Code</LABEL>
<INPUT aria-required="true"  class="TXTstd"  size="40" type="text"  NAME="NOTIFICATION_CODE" id="NOTIFICATION_CODE" onchange="upper(this);fn_notxsdformat()" value="" >
</div>

<div class="DIVText" >
<LABEL class="LBLstd" id="NOTIFICATIONDESC" for="NOTIFICATION_DESC">Description</LABEL>
<INPUT aria-required="false" class="TXTstd" size="40" type="text" name="NOTIFICATION_DESC" id="NOTIFICATION_DESC"  >
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" id="BTN_DESC_POPUP" name="BTN_DESC_POPUP"onclick="popupedit('frmTrgDtls','NOTIFICATION_DESC','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" id="NOTIFICATIONXSD" for="NOTIFICATION_XSD">Notification Xsd</LABEL>
<INPUT aria-required="false" class="TXTstd" size="40" type="text" name="NOTIFICATION_XSD" id="NOTIFICATION_XSD"> 
</div>

<div class="DIVText">
<LABEL class="LBLstd" id="LBL_OPERATION" for="OPERATION">Firing Time</LABEL>
<SELECT aria-required="false"  class="SELstd" name="OPERATION" id="OPERATION" >
			<option value="INSERT">Insert</option>
            <option value="DELETE">Delete</option>
            <option value="BOTH">Both</option>
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" id="FILTERTYPE" for="FILTER_TYPE">Filter Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="FILTER_TYPE" id="FILTER_TYPE" >
			<option value="N">None</option>
             <option value="P">Plsql Block</option>
             <option value="W">Where Clause</option>
</SELECT>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" id="GATEWAYSERVICE" for="GATEWAY_SERVICE">Gateway Service</LABEL>
<INPUT aria-required="false" class="TXTstd" size="40" type="text" name="GATEWAY_SERVICE" id="GATEWAY_SERVICE">
<BUTTON class="BTNimg" title="List Of Values" tabindex="-1" id="BTN_SERVICE_NAME" name="BTN_SERVICE_NAME" onclick="LOV_SERVICE_NAME1.show_lov('GATEWAY_SERVICE~','frmAct','', 'Service Name', 'Service Name', 'Service Name',event)" style="visibility:hidden"><span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" id="GATEWAYOPERATION" for="GATEWAY_OPERATION">Gateway Operation</LABEL>
<INPUT aria-required="false" class="TXTstd" size="40" type="text" name="GATEWAY_OPERATION" id="GATEWAY_OPERATION" onchange="fnxsdflds()">
 <BUTTON class="BTNimg" title="List Of Values" tabindex="-1" id="BTN_OPERATION_CODE" name="BTN_OPERATION_CODE"  onclick="LOV_OPERATION_CODE.show_lov('GATEWAY_OPERATION~FS_RES_XSD~PK_RES_XSD~FC_FUNCTION_ROUTING','frmAct','GATEWAY_SERVICE', 'Operation Code', 'Operation Code~Fs Xsd~Pk Xsd~Routing', 'Operation Code',event)" style="visibility:hidden"><span class="ICOlov"></span></BUTTON>
 </div>

<div class="DIVText" >
<LABEL class="LBLstd" id="GATEWAYIOREQUEST" for="GATEWAY_IO_REQUEST_NODE">Gateway IO Request</LABEL>
<INPUT aria-required="false" class="TXTstd" size="40" type="text" name="GATEWAY_IO_REQUEST_NODE" id="GATEWAY_IO_REQUEST_NODE" onchange="fnxsdflds();" >
</div>

<div class="DIVText" >
<LABEL class="LBLstd" id="TYPEXSD" for="TYPE_XSD">Type XSD Name</LABEL>
<INPUT aria-required="false" class="TXTstd" size="40" type="text" name="TYPE_XSD" id="TYPE_XSD">
</div>

</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" >  

<div class="DIVText" >
<LABEL class="LBLstd"  id="NOTIFICATIONMODULE" for="NOTIFICATION_MODULE">Module</LABEL>
<INPUT aria-required="false"  class="TXTstd" size="40" type="text"  NAME="NOTIFICATION_MODULE" id="NOTIFICATION_MODULE"  >
<BUTTON class="BTNimg" title="List Of Values" tabindex="-1" id="BTN_NTFY_MODULE" NAME="BTN_NTFY_MODULE" onclick="LOV_MODULE.show_lov('NOTIFICATION_MODULE~NOTIFICATION_MODULEDESC~','frmNtfyDtls','', 'Module Code', 'Module Code~Module Description', 'Module Code~Module Description',event)" style="visibility:hidden"  ><span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText" >
<LABEL class="LBLstd"  id="NOTIFICATIONMODULEDESC" for="NOTIFICATION_MODULEDESC">Module Description</LABEL>
<INPUT aria-required="false"  class="TXTstd" size="40" type="text"  NAME="NOTIFICATION_MODULEDESC" id="NOTIFICATION_MODULEDESC"  >
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" id="BTN_MODULEDESC_POPUP" NAME="BTN_MODULEDESC_POPUP" onclick="popupedit('frmNtfyDtls','NOTIFICATION_MODULEDESC','')" style="visibility:hidden"><span class="ICOnarrative"></span></BUTTON>
</div>

<div class="DIVText" >
<LABEL class="LBLstd star"  id="BASETABLE" for="BASE_TABLE">Base Table</LABEL>
<INPUT aria-required="true"  class="TXTstd" false="40" type="text"  NAME="BASE_TABLE" id="BASE_TABLE" DBC="BASE_TABLE" onchange="upper(this);fnAddNtfyPkColsNFlds();" value="" >
<BUTTON class="BTNimg"  title="List Of Values" tabindex="-1" id="BTN_BASE_TABLE" NAME="BTN_BASE_TABLE" onclick="LOV_USER_TABLES.show_lov('BASE_TABLE','frmTrgDtls','', 'Base Table', 'Base Table', 'Base Table',event);" ><span class="ICOlov"></span></BUTTON> 
</div>

<div class="DIVText">
<LABEL class="LBLstd star" id="NTFYPKCOLS" for="PK_COLS">PK Cols</LABEL>
<INPUT aria-required="true" class="TXTstd" size="40" type="text" name="PK_COLS" id="PK_COLS" value="" >
</div>

<div class="DIVText">
<LABEL class="LBLstd star" id="NTFYPKTYPES" for="PK_TYPES">PK Types</LABEL>
<INPUT aria-required="true" class="TXTstd" size="40" type="text" name="PK_TYPES" id="PK_TYPES" value="" >
</div> 

 <div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="FULL_SCREEN_RESPONSE" id="FSREPLY">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="FULL_SCREEN_RESPONSE" id="FULL_SCREEN_RESPONSE">Full Screen Reply</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="HO_ONLY" id="HOONLY">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="HO_ONLY" id="HO_ONLY">HO Only</LABEL>
</div>
</div>
<!-- VINIT SPECIFIC NOTIFICATION -->
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="SPECIFIC_NOTIFICATION" id="SPECIFICNOTIFICATION">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="SPECIFIC_NOTIFICATION" id="SPECIFIC_NOTIFICATION">Specific Notification</LABEL>
</div>
</div>

<div class="DIVText" style="display:none">
<INPUT aria-required="false" name="FS_RES_XSD" id="FS_RES_XSD" value="" style="visibility:hidden"></INPUT>
<INPUT aria-required="false" name="PK_RES_XSD" id="PK_RES_XSD" value="" style="visibility:hidden"></INPUT>
<INPUT aria-required="false" name="FC_FUNCTION_ROUTING" id="FC_FUNCTION_ROUTING" value="" style="visibility:hidden"></INPUT> 
<INPUT aria-required="false"  type="text" style="visibility:hidden" name="RAD_SCHEMA" id="RAD_SCHEMA"  >
</div>

</fieldset>
<!--End of Form fields column two-->
</div> 
</div> 

<div class="DIVMultipleBig" id="DIV_FILTERLOGIC" name="DIV_FILTERLOGIC" style="margin-top:0px;padding-top:0px;position:relative;">
	<table role="presentation" class="TABLELyt" align="left"   border="0" cellspacing="0" cellpadding="0"  TYPE="SINGLE" VIEW="NO">
        <tr>
            <td align="right"><LABEL id="NTFYFILTERLOGIC">Filter Logic</LABEL></td>
            <td><LABEL style="color:blue">( Set $NOTIFY To Y/N & Refer Current Record as $CURRENT_RECORD )</LABEL></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td colspan=6><textarea title="Filter Logic" rows="15" cols="135" style="border:1px solid #a2c2e5;" id="FILTERLOGIC" name="FILTERLOGIC" ></textarea></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </table>
</div>

<div class="DIVMultipleBig" style="margin-top:0px;padding-top:0px;position:relative;">
	<div class="DIVmultiplebox">
		    <div class="MEButtons" id="wbsrvtgs_ME" name="wbsrvtgs_ME" >
                <div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="Tags">Web Service Tags</div>
				<BUTTON class="BTNimg" title="Add Row" onclick="addNewRow1('wbsrvtgs');" name="ADD" id="btnAdd" value="ADD"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
				<BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL"   id="btnDel" onclick="delRow1('wbsrvtgs')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>
            </div>
		<div class="DIVMultipleBigInner" style="height:250px;overflow-x:hidden"  >
			<table id="wbsrvtgs" name="wbsrvtgs" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
					<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('wbsrvtgs','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Order</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Xsd Field</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Table Field</span></th>  
					<th scope="col" class="THgrid"><span class="SPNtext">Data Type</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Maximum Length</span></th>
			    	</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="wbsrvtgs_TE" name="wbsrvtgs_TE" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div> 
</div>      
</body>
</html>