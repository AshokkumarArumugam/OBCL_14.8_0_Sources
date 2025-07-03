<!--
  **
  **
  ** File Name  : RadSections.jsp
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

<div class="titlecontainer">
<span class="Subheader"><h2>Section Details</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1"  id="FNDEL" name="FNDEL" onclick="fnDel('SCR~'+clickedobjects[1]+'~'+clickedobjects[2]+'~'+clickedobjects[3],'1')" title="Delete Section"><img src="Images/delete2.gif"   alt="Delete"></BUTTON>&nbsp;
<BUTTON class="func_btn_1"  id="FNRNM" name="FNRNM" onclick="fnRename('SCR~'+clickedobjects[1]+'~'+clickedobjects[2]+'~'+clickedobjects[3],'1')" title="Rename Section"><img src="Images/rename.gif"   alt="Rename"></BUTTON>&nbsp;
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo"  onclick="showData('');PopulateDataSourceForSummary('S');"><img src="Images/rollback.gif" alt="Roll Back"></BUTTON>
</span>
</div>
 

<div   class="Subcontainer"   NAME="SEC" id="SEC" TYPE="SINGLE" >
<!--Form fields column one-->

<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 
  
<div class="DIVText" >
<LABEL class="LBLstd" for="SECTION_NAME">Section Name</LABEL>
<INPUT aria-required="false" class="TXTro"  readonly type="text" name="SECTION_NAME" id="SECTION_NAME" value="" size="40">
</div> 

<div class="DIVText"  >
<LABEL class="LBLstd" for="SECTION_LBL">Section Label</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="SECTION_LBL" id="SECTION_LBL" value=""  onClick="FnCheckSecVal()" size="40">
<BUTTON class="BTNimg"  title="List Of Values" tabindex="-1"  id="BTN_LBL_SEC" onclick="LOV_LABEL_CODE.show_lov('SECTION_LBL~','frmScrSnm','', 'Label Code', 'Label Code~Label Description', 'Label Code~Label Description',event)">
<span class="ICOlov"></span></BUTTON>
</div> 

<div class="DIVText"  id="SECTION_FUNC_ID_DIV">
<LABEL class="LBLstd" for="SECTION_FUNC_ID">Function Name</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="SECTION_FUNC_ID" id="SECTION_FUNC_ID" value="" size="40">
</div> 

<div class="DIVText" id="SECTION_TYPE_DIV"> 
<LABEL class="LBLstd" for="SECTION_TYPE">Tab Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="SECTION_TYPE" id="SECTION_TYPE" >
	<option Selected="TRUE" value=""></option>
	<option value="DASHBOARD">DashBoard</option>
	<option value="DETAIL">Detail</option>
	<option value="SUBSYSTEM">Subsystem</option>
	<option value="TABS">Tabs</option>
	<option value="SUMMARY">Summary</option>	
</SELECT>
</div>
 
</fieldset>
<!--End of Form fields column two-->
</div> 
<!--Form fields column one-->
 
 <div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 
  
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="SEC_VISIBLE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="SEC_VISIBLE" id="SEC_VISIBLE" checked="true" onClick="CheckVisibleVals(this,'SEC')">Visible</LABEL>
</div>
</div>

 <div style="display:none">
 
    <INPUT aria-required="false"  type="hidden"  name="RELEASE_NAME" id="RELEASE_NAME" value="" > 
    <INPUT aria-required="false"  type="hidden"  name="RELEASE_TYPE" id="RELEASE_TYPE" value="" > 
    <INPUT aria-required="false"  type="hidden"  id="DEPENDENT_ON" name="DEPENDENT_ON" value="" >
    <INPUT aria-required="false"  type="hidden"  name="SECTION_ID" id="SECTION_ID" value="" > 
    <INPUT aria-required="false"  type="hidden"  name="TAB_NAME" id="TAB_NAME" value="" > 
    <SELECT aria-required="false" style="visibility:hidden;" name="SCREEN_PORTION" id="SCREEN_PORTION_SEC" disabled>
        <option value="HEADER">Header</option>
        <option selected="BODY" value="BODY">Body</option>
        <option value="FOOTER">Footer</option>
    </SELECT>	
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt" id="COLLAPSE_SEC_DIV">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="COLLAPSE_SEC">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="COLLAPSE" id="COLLAPSE_SEC" onClick="FnCheckSecVal()">Collapse</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt" id="COLLAPSE_EXPAND_DIV">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="COLLAPSE_EXPAND">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="COLLAPSE_EXPAND" id="COLLAPSE_EXPAND_ID" onClick="FnCheckSecVal()">Default Expand</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt" id="MULTIPLE_SECTION_DIV">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="MULTIPLE_SECTION">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="MULTIPLE_SEC" id="MULTIPLE_SECTION" onClick="FnCheckMltplSec()">Multiple Section</LABEL>
</div>
</div>

</fieldset>
<!--End of Form fields column two-->
</div> 


</div> 

<div class="DIVMultipleBig" style="position:relative; margin-left:20px; margin-right:20px; width:AUTO;" id="PARTITION_DETAILS_DIV" name="dataContainer" >
		<div class="MEButtons">
			<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="PARTDET">Partition Details</div>
			<BUTTON title="Add Row"  id="ADD" name="ADD" onclick="addNewRow('partition')" class="BTNimg"><span class="ICOadd" tabindex="-1"><span class="LBLinv">Add Row</span></span></BUTTON>
			<BUTTON title="Delete Row"  id="DEL" name="DEL" onclick="delRow('partition')" class="BTNimg"><span class="ICOremove" tabindex="-1"><span class="LBLinv">Delete Row</span></span></BUTTON>
		</div>
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner">
			<table id="partition" name="partition" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('partition','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Partition Sl No</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Partition Name</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Width</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Sub-partitions</span></th>
					<th scope="col" class="THgrid" style="background-color:#e6f2f4;display:none"></th>
					<th scope="col" class="THgrid" style="background-color:#e6f2f4;display:none"></th>
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>