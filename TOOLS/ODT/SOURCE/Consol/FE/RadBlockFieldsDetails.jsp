<!--
  **
  **
  ** File Name  : RadBlockFieldsDetails.jsp
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

<div class="titlecontainer">
<span class="Subheader"><h2>Block Field Properties</h2></span>
<span class="funcbtn">
<BUTTON id="bttnDeleteBlockField" class="func_btn_1" onclick="fnDel('BFD~'+clickedobjects[1],'1')" title="Delete Block Field"><img src="Images/delete2.gif"   alt="Delete"></BUTTON>&nbsp;
<BUTTON id="bttnRenameBlockField" class="func_btn_1" onclick="fnRename('BFD~'+clickedobjects[1],'1')" title="Rename Block Field"><img src="Images/rename.gif"   alt="Rename"></BUTTON>&nbsp;
<BUTTON id="bttnLocateBlockField" class="func_btn_1" onclick="fnFieldLocator();" title="Locate Block Field"><img src="Images/preview.gif"  alt="Preview"></BUTTON>&nbsp;
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');PopulateDataSourceForSummary('S');"><img src="Images/rollback.gif" alt="Roll Back" ></BUTTON>
</span>
</div>
  
   

<div  class="Subcontainer" name="DBFD" id="DBFD" style="width:120%" TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne" style="width:35%" >
<fieldset class="FSTcell"> 

<div class="DIVText">
<LABEL class="LBLstd star" for="FIELD_NAME">Field Name</LABEL>
<INPUT aria-required="true" class="TXTro" readonly type="text" name="FIELD_NAME" id="FIELD_NAME" value="" size="25">
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="LABEL_CODE">Field Label</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="LABEL_CODE" id="LABEL_CODE" value="" size="25">
<BUTTON  class="BTNimg"  title="List Of Values" tabindex="-1"  id="BTN_LBLCD" onclick="LOV_BLKLABEL_CODE.show_lov('LABEL_CODE~FLD_ANNOTATION~XSD_TAG~','frmScrSnm','', 'Label Code', 'Label Code~Label Description', 'Label Code~Label Description',event);">
<span class="ICOlov"></span></BUTTON>
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="DBT">DataSource</LABEL>
<INPUT aria-required="true" readonly class="TXTro" type="text" name="DBT" id="DBT" value="" size="25">
</div>

<div class="DIVText">
<LABEL class="LBLstd star" for="DBC">Column Name</LABEL>
<INPUT aria-required="true" readonly class="TXTro" type="text" name="DBC" id="DBC" value="" size="25">
</div>

<div class="DIVText">
<LABEL class="LBLstd star" for="DATATYPE_BLKF">Data Type</LABEL>
<SELECT aria-required="true"  class="SELstd" name="DATATYPE" id="DATATYPE_BLKF" value="" disabled="true">
	     <option value=""></option>
                            <option value="DATE">Date</option>
                            <option value="VARCHAR2">Varchar2</option>
                            <option value="NUMBER">Number</option>
                            <option value="DATETIME">DateTime</option>
							<option value="CHAR">Char</option>
							<option value="LONG">Long</option>
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="DISPLAY_TYPE_BLKF">Display Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="DISPLAY_TYPE" id="DISPLAY_TYPE_BLKF" onChange="fnSelectParentFld();fnSetCustmAttrbts('attributes'); EnableDBDFlds();LovEnableFlds();">
	      <option value="ACCOUNT">Account</option> 
          <option value="AMOUNT">Amount</option> 
          <option value="BUTTON">Button</option>
          <option value="CHECKBOX">CheckBox</option>
          <option value="CUSTOMER">Customer</option>
          <option value="DATE">Date</option> 
          <option value="DATETIME">DateTime</option>
          <option value="FILE">File</option> 
          <option value="GLCODE">Gl Code</option> 
          <option value="LABEL">Label</option>
          <option value="LOV">Lov</option>
          <option value="DISPMASK">Mask</option>
          <option value="PASSWORD">Password</option>
		  <option value="PRODUCT">Product</option> 
          <option value="RADIO">Radio</option>
          <option value="ROSELECT">ReadOnly Select</option>
          <option value="RESTRICTED_TEXT">Restricted Text</option>
		  <option value="SELECT">Select</option>
          <option value="TEXT">Text</option>
          <option value="TEXTAREA">TextArea</option> 
          <option value="OCX">OCX</option>
</SELECT>
<BUTTON class="BTNfooter" title="Patterns" tabindex="-1"  id="BTN_PATTERNS" name="BTN_PATTERNS" style="visibility:hidden;" onclick="fN_BTN_PATTERNS()" ></BUTTON>
</div>	 

<div class="DIVText">
<LABEL class="LBLstd" for="ITEM_TYPE_BLKF">Item Type</LABEL>
<SELECT aria-required="false"   class="SELstd" name="ITEM_TYPE" id="ITEM_TYPE_BLKF" onChange="fnSelectParentFld()" >
	    <option value="DBITEM">Database Item</option>
        <option value="DESC">Desc</option>
        <option value="BUTTON">Button</option>
        <option value="CONTROL">Control</option>
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="PARENT_FIELD">Parent Field</LABEL>
<SELECT aria-required="false" class="SELstd" name="PARENT_FIELD" id="PARENT_FIELD" value=""></SELECT>
</div>
   
<div class="DIVText">
<LABEL class="LBLstd" for="RELATED_BLOCK">Related Block</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" name="RELATED_BLOCK" id="RELATED_BLOCK" onchange="fn_populate_BlockFields('','RELATED_FIELD')">
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RELATED_FIELD">Related Field</LABEL>
<SELECT aria-required="false" class="SELstd" name="RELATED_FIELD" id="RELATED_FIELD" value="" ></SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="LOV_NAME">LOV Name</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" name="LOV_NAME" id="LOV_NAME" onchange="LovEnableLOVFlds('LOV_NAME');showBindVariables('Lov','bindvar','');showReturnFields('retflds','')">
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="OFF_LINE_LOV_NAME">Off Line LOV Name</LABEL>
<SELECT aria-required="false" width="200" style="width:200px" class="SELstd" name="OFF_LINE_LOV_NAME" id="OFF_LINE_LOV_NAME"   onchange="LovEnableLOVFlds('OFF_LINE_LOV_NAME');showBindVariables('Lov','offlinebindvar','');showReturnFields('offlineretflds','')"></SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="FIELDSET_NAME_BLKF">Fieldset Name</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="FIELDSET_NAME" id="FIELDSET_NAME_BLKF" value="" size="25">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="CLASSID_BLKF">CLASSID</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="CLASSID" id="CLASSID_BLKF" value="" size="25">
</div>

</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne" style="width:35%" >
<fieldset class="FSTcell" > 

<div class="DIVText">
<LABEL class="LBLstd" for="XSD_TAG">XSD Tag</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="XSD_TAG" id="XSD_TAG" value="" size="25">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="FLD_COMMENT_ID">Comment ID</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="FLD_COMMENT_ID" id="FLD_COMMENT_ID" value="" size="25">
<BUTTON  class="BTNimg"  title="List Of Values" tabindex="-1"  id="BTN_COMMENT_ID" onclick="LOV_COMMENT_FLD.show_lov('FLD_COMMENT_ID~','frmScrSnm','', 'Comment ID', 'Comment ID~Comment Description', 'Comment ID~Comment Description',event);">
<span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd star" for="FIELD_SIZE">Field Size</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" name="FIELD_SIZE" id="FIELD_SIZE" onkeypress="return numbersonly(this, event)" value="" size="25">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="MAX_LENGTH_BLKF">Maximum Length</LABEL>
<INPUT aria-required="false" class="TXTro" readonly type="text" name="MAX_LENGTH" id="MAX_LENGTH_BLKF" onkeypress="return numbersonly(this, event)" value="" size="25">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="MIN_VAL">Minimum Value</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="MIN_VAL" id="MIN_VAL" onkeypress="return isValidNumber(this, event)" value="" size="25">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="MAX_VAL">Maximum Value</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="MAX_VAL" id="MAX_VAL" onkeypress="return isValidNumber(this, event)" value="" size="25">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="MAX_DECIMALS">Maximum Decimals</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="MAX_DECIMALS" id="MAX_DECIMALS" onkeypress="return numbersonly(this, event)" value="" size="25">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="TXTAREA_ROWS">TextArea Rows</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="TXTAREA_ROWS" id="TXTAREA_ROWS" onkeypress="return numbersonly(this, event)" value="" size="25">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="TXTAREA_COLS">TextArea Columns</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="TXTAREA_COLS" id="TXTAREA_COLS" onkeypress="return numbersonly(this, event)" value="" size="25">
</div>


<div class="DIVText">
<LABEL class="LBLstd" for="DEFAULT_VALUE">Default Value</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="DEFAULT_VALUE" id="DEFAULT_VALUE" value="" size="25">
<BUTTON class="BTNfooter" title="Default Value" tabindex="-1"  id="POP_DEFAULT_VALUE" name="POP_DEFAULT_VALUE" onclick="fnDefault_valscrn()"></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="PREVIEW_VALUE">Preview Value</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="PREVIEW_VALUE" id="PREVIEW_VALUE" value="" size="25">
</div>

<div   STYLE="display:none" > 
  <INPUT aria-required="false" type=checkbox name="BLOCK_PK_FLD" id="BLOCK_PK_FLD" >  
  <INPUT aria-required="false" type=checkbox name="CHECKED" id="CHECKED" > 
  <INPUT aria-required="false"  type="hidden"  name="RELEASE_NAME" id="RELEASE_NAME" value="" > 
  <INPUT aria-required="false" name="GLOBAL_LOV_NAME" id="GLOBAL_LOV_NAME" size="24" onchange="globalLOV()" style="visibility:hidden">
  <BUTTON  style="visibility:hidden" id="BTN_GLB_LOV" title="List Of Values" tabindex="-1" onclick="LOV_GLOBAL_LOV.show_lov('GLOBAL_LOV_NAME','frmBlkFldDtls','', 'Global Lov', 'Lov Name', 'Lov Name',event)"><span class="ICOlov"></span></BUTTON>
  <INPUT aria-required="false" name="GLOBAL_OFF_LINE_LOV_NAME" id="GLOBAL_OFF_LINE_LOV_NAME"  onchange="globalLOV()" size="24" style="visibility:hidden">
  <BUTTON  style="visibility:hidden" id="BTN_GLB_OFF_LOV" title="List Of Values" tabindex="-1" onclick="LOV_GLOBAL_LOV.show_lov('GLOBAL_OFF_LINE_LOV_NAME','frmBlkFldDtls','', 'Global  Name', 'Lov Name', 'Lov Name',event)"><span class="ICOlov"></span></BUTTON>
  <INPUT aria-required="false" type=checkbox name="SUBSYSTEM_DEPENDANT" id="SUBSYSTEM_DEPENDANT" > 
  <INPUT aria-required="false"  type="hidden"  name="RELEASE_TYPE" id="RELEASE_TYPE" value="" >                
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="MASK_ID">Mask Id</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="MASK_ID" id="MASK_ID" value="" size="25">
<BUTTON class="BTNfooter" id="BTN_MSK_ID" title="List Of Values" tabindex="-1" style="display:none;" onclick="LOV_MASK_ID.show_lov('MASK_ID~','frmBlkFldDtls','', 'Mask Id', 'Mask Id~Description', 'Mask Id~Description',event)"><span class="ICOlov"></span></BUTTON>
</div>

</fieldset>
<!--End of Form fields column two-->

</div>

<div class="DIVColumnOne" align="center" style="width:20%">
<fieldset class="FSTcell" >  

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="REQUIRED">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="REQUIRED" id="REQUIRED">Required</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="VISIBLE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="VISIBLE" id="VISIBLE">Visible</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="READ_ONLY">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="READ_ONLY" id="READ_ONLY">Read Only</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="CALENDAR_TEXT">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="CALENDAR_TEXT" id="CALENDAR_TEXT">Calender Text</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="POPEDIT_REQUIRED">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="POPEDIT_REQUIRED" id="POPEDIT_REQUIRED">Popup Edit Required</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="CHK_UPPERCASE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="CHK_UPPERCASE" id="CHK_UPPERCASE">Uppercase Only</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="LOV_VAL_REQ">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="LOV_VAL_REQ" id="LOV_VAL_REQ">LOV Validation Required</LABEL>
</div>
</div> 

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="INPUT_ONLY_BY_LOV">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="INPUT_ONLY_BY_LOV" id="INPUT_ONLY_BY_LOV">Input by LOV Only</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="NOT_REQD_IN_XSD">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="NOT_REQD_IN_XSD" id="NOT_REQD_IN_XSD">Not Required In Xsd</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="REPORT_PARAMETER">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="REPORT_PARAMETER" id="REPORT_PARAMETER">Report Parameter</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="FORMAT_REQD">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="FORMAT_REQD" id="FORMAT_REQD">Format Required</LABEL>
</div>
</div>

<!--VINIT hotkey changes-->
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="HOTKEYREQ">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="HOTKEYREQ" id="HOTKEYREQ">Hot Key Required</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="FOCUSREQ">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="FOCUSREQ" id="FOCUSREQ">Focus Required</LABEL>
</div>
</div>

<!--VINIT EXACT FETCH-->
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="EXACT_FETCH">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="EXACT_FETCH" id="EXACT_FETCH">Exact Fetch</LABEL>
</div>
</div>
<!--VINIT EXACT FETCH ENDS-->

<!--AMIT EXACT FETCH-->
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="HOTKEYREQJA">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="HOTKEYREQJA" id="HOTKEYREQJA">Joint Holder Hot Key Required</LABEL>
</div>
</div>
<!--
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad" style="display: none;">
<LABEL class="LBLauto" for="CHK_TRIM">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="CHK_TRIM" id="CHK_TRIM" title="Applicable only for Text and Textarea">Trim</LABEL>
</div>
</div>
-->
</fieldset>
</div>
<!--AMIT EXACT FETCH ENDS-->


<!--End of Form fields column two-->
</div> 
  
<div  class="DIVtab" name="BUTTONS" id="BUTTONS">
    <ul id="tablist" style="width:100%;">
        <li id="li_customAttributes" style="display:inline"><a class="Htaball" id="TAB_DIV_CUST_ATTRS" name="TAB_DIV_CUST_ATTRS" href="#nogo" accesskey="4"   onClick="FnShowTabs('DIV_CUST_ATTRS')"><span id="SP_DIV_CUST_ATTRS" name="SP_DIV_CUST_ATTRS">Custom Attributes</span></a></li>
        <li id="li_eventsDiv" style="display:inline"><a class="Htaball" id="TAB_DIV_EVENTS"  name = "TAB_DIV_EVENTS" href="#nogo"  onClick="FnShowTabs('DIV_EVENTS')"><span id="SP_DIV_EVENTS" name ="SP_DIV_EVENTS">Events</span></a></li>
        <li id="li_bindVariables" style="display:inline"><a class="Htaball" id="TAB_DIV_BIND_VRBLS" href="#nogo" name="TAB_DIV_BIND_VRBLS"  onclick="FnShowTabs('DIV_BIND_VRBLS')"><span id="SP_DIV_BIND_VRBLS" name="SP_DIV_BIND_VRBLS">Bind Variables</span></a></li>
        <li id="li_returnField" style="display:inline"><a class="Htaball" id="TAB_DIV_RTN_FLD" href="#nogo" name="TAB_DIV_RTN_FLD"  onclick="FnShowTabs('DIV_RTN_FLD')"><span id="SP_DIV_RTN_FLD" name ="SP_DIV_RTN_FLD">Return Fields</span></a></li>
        <li id="li_offlineBindVariables" style="display:inline"><a class="Htaball" id="TAB_DIV_OFF_LINE_BIND_VRBLS" href="#nogo" name="TAB_DIV_OFF_LINE_BIND_VRBLS" onclick="FnShowTabs('DIV_OFF_LINE_BIND_VRBLS')"><span id="SP_DIV_OFF_LINE_BIND_VRBLS" name="SP_DIV_OFF_LINE_BIND_VRBLS">Off Line Bind Variables</span></a></li>								
        <li id="li_offlineReturnField" style="display:inline"><a class="Htaball" href="#nogo" id="TAB_DIV_OFF_LINE_RTN_FLD" name="TAB_DIV_OFF_LINE_RTN_FLD"  onclick="FnShowTabs('DIV_OFF_LINE_RTN_FLD')"><span id="SP_DIV_OFF_LINE_RTN_FLD" name="SP_DIV_OFF_LINE_RTN_FLD">Off Line Return Fields</span></a></li>
		<li id="li_DashBoardLink" style="display:inline"><a class="Htaball" id="TAB_DIV_DASHBOARD_LINK"  href="#nogo" name = "TAB_DIV_DASHBOARD_LINK"   onClick="FnShowTabs('DIV_DASHBOARD_LINK')"><span id="SP_DIV_DASHBOARD_LINK" name ="SP_DIV_DASHBOARD_LINK">DashBoard Link</span></a></li>
		<li id="li_AmountTab" style="display:inline"><a class="Htaball" id="TAB_DIV_AMOUNTTAB"  href="#nogo" name = "TAB_DIV_AMOUNTTAB"   onClick="FnShowTabs('DIV_AMOUNTTAB')"><span id="SP_DIV_AMOUNTTAB" name ="SP_DIV_AMOUNTTAB">Related Field</span></a></li>
    	<li id="li_Patternstab" style="display:inline"><a class="Htaball" id="TAB_DIV_PATTERNS"  href="#nogo" name = "TAB_DIV_PATTERNS"   onClick="FnShowTabs('DIV_PATTERNS')"><span id="SP_DIV_PATTERNS" name ="SP_DIV_PATTERNS">Patterns</span></a></li>
    </ul>
</div>  
  
  
<div id="DIV_EVENTS" name="DIV_EVENTS"  class="DIVMultipleBig" style="margin-top:0px;padding-top:0px;position:relative;">
	<div class="DIVmultiplebox" >
			<div class="MEButtons" id="events_ME" name="events_ME">
				<BUTTON class="BTNimg" title="Add Row" id="BTN_AD_EVNT" name="ADD" value="ADD" onclick="addNewRow('events');fn_populate_Blocks_toCallfrmFlds('RAD_SCREENS','events','frmBlkFldDtls','BUTTON_SCREEN',4);fnDisableBlockElements();"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
				<BUTTON class="BTNimg" title="Remove Row"  id="BTN_DL_EVNT" name="DEL" value="DEL" onclick="delRow('events')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>
			</div>
		<div class="DIVMultipleBigInner" style="height:250px;"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="events" name="events" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('events','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Event Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Function Name</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Event Type</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Button Screen</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">CallForm Name</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Screen Name</span></th> 
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" id="events_TE" name="events_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>
 
		   
<div id="DIV_CUST_ATTRS"  name="DIV_CUST_ATTRS" class="DIVMultipleBig" style="margin-top:0px;padding-top:0px;position:relative;display:none">
	<div class="DIVmultiplebox" >
			<div class="MEButtons"  id="attributes_ME" name="attributes_ME" >
				<BUTTON class="BUTTONInline" title="Add Row" id="BTN_AD_CST" name="ADD" value="ADD" onclick="addNewRow('attributes')"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
				<BUTTON class="BUTTONInline" title="Remove Row"  id="BTN_DL_CST" name="DEL" value="DEL" onclick="delRow('attributes')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>
			</div>
		<div class="DIVMultipleBigInner" style="height:250px;"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="attributes" name="attributes" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			       <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('attributes','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Attribute Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Attribute Value</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Active</span></th>  
					<!--  <th scope="col" class="THgrid" ><BUTTON class="THgrid"  onclick="fnsorttable(4,'attributes');enableCustAttributes()"><span class="SPNtext">Position</span></BUTTON></th>     -->
					<th width="1px"></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Move Up</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Move Down</span></th>
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" id="attributes_TE" name="attributes_TE"  tabindex="0" colspan="5"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>
 
	 
	
<div id="DIV_BIND_VRBLS" name="DIV_BIND_VRBLS" class="DIVMultipleBig"  style="margin-top:0px;padding-top:0px;position:relative;display:none" >
	<div class="DIVmultiplebox" >
			<div class="MEButtons" id="bindvar_ME" name="bindvar_ME">
				<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="Bindvar">Bind Variables Mapping</div>
				<BUTTON class="Buttontext" id ="BTN_BV_LOV" onclick="showBindVariables('Bind','bindvar','');fn_populate_Blocks_toBlkLovFlds('RAD_DATA_BLOCKS','bindvar','frmBlkFldDtls','BIND_VAR_BLK',1,event)">Default From Lov Definition</BUTTON>&nbsp;&nbsp;
            </div>
		<div class="DIVMultipleBigInner" style="height:250px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="bindvar" name="bindvar" summary="Multi Tenor"  TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('bindvar','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Block Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Bind Variable</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Data Type</span></th>  
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="bindvar_TE" name="bindvar_TE"  colspan="4"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>
  
	
<div id="DIV_RTN_FLD" name="DIV_RTN_FLD" class="DIVMultipleBig" style="margin-top:0px;padding-top:0px;position:relative;display:none">
	 <div class="DIVmultiplebox">
			<div class="MEButtons" id="retflds_ME" name="retflds_ME" >
				<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="rtnvar">Return Fields Mapping</div>
				<BUTTON class="Buttontext"  id="BTN_RT_LOV" onclick="showReturnFields('retflds','');fn_populate_Blocks_toBlkLovFlds('RAD_DATA_BLOCKS','retflds','frmBlkFldDtls','RETURN_BLK_NAME',2,event)">Default From Lov Definition</BUTTON>&nbsp;&nbsp;
    	    </div>
		<div class="DIVMultipleBigInner" style="height:250px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="retflds" name="retflds" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('retflds','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Query Column</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Block Name</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Return Field Name</span></th>  
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="retflds_TE" name="retflds_TE"  colspan="4"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>
  
   
   
<div id="DIV_OFF_LINE_BIND_VRBLS" name="DIV_OFF_LINE_BIND_VRBLS" class="DIVMultipleBig" style="margin-top:0px;padding-top:0px;position:relative;display:none">
	<div class="DIVmultiplebox">
			<div class="MEButtons" id="offlinebindvar_ME" name="offlinebindvar_ME">
				<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="offbndvar">Off Line Bind Variables Mapping</div>
				<BUTTON class="Buttontext" id="BTN_OF_BV_LOV" onclick="showBindVariables('Bind','offlinebindvar','');fn_populate_Blocks_toBlkLovFlds('RAD_DATA_BLOCKS','offlinebindvar','frmBlkFldDtls','BIND_VAR_BLK',1,event)">Default From Off Line Lov Definition</BUTTON>&nbsp;&nbsp;
            </div>
		<div class="DIVMultipleBigInner" style="height:250px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="offlinebindvar" name="offlinebindvar" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('offlinebindvar','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Block Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Bind Variable</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Data Type</span></th>  
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="offlinebindvar_TE" name="offlinebindvar_TE" colspan="4"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>
   
  
<div id="DIV_OFF_LINE_RTN_FLD" name="DIV_OFF_LINE_RTN_FLD" class="DIVMultipleBig" style="margin-top:0px;padding-top:0px;position:relative;display:none">
	<div class="DIVmultiplebox">
		    <div class="MEButtons" id="offlineretflds_ME" name="offlineretflds_ME" >
                <div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="offtrnvar">Off Line Return Variables Mapping</div>
				<BUTTON class="Buttontext" id ="BTN_OF_RT_LOV" onclick="showReturnFields('offlineretflds','');fn_populate_Blocks_toBlkLovFlds('RAD_DATA_BLOCKS','offlineretflds','frmBlkFldDtls','RETURN_BLK_NAME',2,event)">Default From Off Line Lov Definition</BUTTON>&nbsp;&nbsp;
            </div>
		<div class="DIVMultipleBigInner" style="height:250px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="offlineretflds" name="offlineretflds" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
					<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('offlineretflds','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Query Column</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Block Name</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Return Field Name</span></th>  
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="offlineretflds_TE" name="offlineretflds_TE"  colspan="4"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>
   
    
		
<div id="DIV_DASHBOARD_LINK" name="DIV_DASHBOARD_LINK" class="DIVMultipleBig" style="margin-top:0px;padding-top:0px;position:relative;display:none">
	<div class="DIVmultiplebox">
			<div class="MEButtons" id="DBlink_ME" name="DBlink_ME">
                <BUTTON class="BTNimg" title="Add Row" id="BTN_AD_EVNT" name="ADD" value="ADD" onclick="addNewRow('DBlink');fn_populate_Blocks_toCallfrmFlds('RAD_SCREENS','events','frmBlkFldDtls','BUTTON_SCREEN',4);fnDisableBlockElements();"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
                <BUTTON class="BTNimg" title="Remove Row"  id="BTN_DL_EVNT" name="DEL" value="DEL" onclick="delRow('DBlink')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>
            </div>
		<div class="DIVMultipleBigInner" style="height:250px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="DBlink" name="DBlink" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('DBlink','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Level</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Link Type</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Function Name</span></th>  
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="DBlink_TE" name="DBlink_TE"  colspan="4"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div> 

<div id="DIV_AMOUNTTAB" name="DIV_AMOUNTTAB"  class="DIVMultipleBig" style="margin-top:0px;padding-top:0px;position:relative;display:none">
	<div class="DIVmultiplebox" >
			<div class="MEButtons" id="AMOUNTTAB_ME" name="AMOUNTTAB_ME">
				<BUTTON class="BTNimg" title="Add Row" id="BTN_AD_AMTAB" name="ADD" value="ADD" onclick="addNewRow('AMOUNTTAB');fn_populate_Blocks_toBlk_Amount(event)"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
				<BUTTON class="BTNimg" title="Remove Row"  id="BTN_DL_AMTAB" name="DEL" value="DEL" onclick="delRow('AMOUNTTAB')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>
			</div>
		<div class="DIVMultipleBigInner" style="height:250px;"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="AMOUNTTAB" name="AMOUNTTAB" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('AMOUNTTAB','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid" ><span class="SPNtext">Block Name</span></th> 
					<th scope="col" class="THgrid" ><span class="SPNtext">Field Name</span></th>  
					<th scope="col" class="THgrid" ><span class="SPNtext">In/Out</span></th> 					
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" id="AMOUNTTAB_TE" name="AMOUNTTAB_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>

<div id="DIV_PATTERNS" name="DIV_PATTERNS"  class="DIVMultipleBig" style="margin-top:0px;padding-top:0px;position:relative;display:none">
	<div class="DIVmultiplebox" > 
			<div class="MEButtons" id="PATTERNTAB_ME" name="PATTERNTAB_ME" >
                <div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="PATTER">Pattern Mapping</div>
				<BUTTON class="Buttontext" id ="BTN_PATTER" onclick="fn_populate_Blocks_toPatterns()">Default Patterns</BUTTON>&nbsp;&nbsp;
            </div>
		<div class="DIVMultipleBigInner" style="height:250px;"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="PATTERNTAB" name="PATTERNTAB" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('PATTERNTAB','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid" ><span class="SPNtext">Field Type</span></th> 					
					<th scope="col" class="THgrid" ><span class="SPNtext">Block Name</span></th> 
					<th scope="col" class="THgrid" ><span class="SPNtext">Field Name</span></th>  
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" id="PATTERNTAB_TE" name="PATTERNTAB_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>