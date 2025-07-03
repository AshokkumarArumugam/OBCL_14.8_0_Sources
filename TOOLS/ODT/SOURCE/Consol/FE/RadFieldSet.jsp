<!--
  **
  **
  ** File Name  : RadFieldSet.jsp
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
<span class="Subheader"><h2>Fieldset Properties</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1"  id="FNDEL" name="FNDEL" onclick="fnDel('FLD~'+clickedobjects[1],'1')" title="Delete Fieldset"><img src="Images/delete2.gif"   alt="Delete"></BUTTON>&nbsp;
<BUTTON class="func_btn_1"  id="FNRNM" name="FNRNM" onclick="fnRename('FLD~'+clickedobjects[1],'1')" title="Rename Fieldset"><img src="Images/rename.gif"   alt="Rename"></BUTTON>&nbsp;
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo"  onclick="showData('');PopulateDataSourceForSummary('S');"><img src="Images/rollback.gif" alt="Roll Back"></BUTTON>
</span>
</div>
 

<div TYPE="SINGLE"  class="Subcontainer" style="width:120%" name="FLDSET" id="FLDSET">

<!--Form fields column one-->
<div class="DIVColumnOne" style="width:35%" >
<fieldset class="FSTcell"> 

<div class="DIVText">
<LABEL class="LBLstd" for="FIELDSET_NAME">Fieldset Name</LABEL>
<INPUT aria-required="false" class="TXTro" readonly type="text" name="FIELDSET_NAME" id="FIELDSET_NAME" value="" size="25">
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="FIELDSET_LABEL">Fieldset Label</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="FIELDSET_LABEL" id="FIELDSET_LABEL" value="" size="25">
<BUTTON    class="BTNimg"  title="List Of Values" tabindex="-1"  id="BTN_FST_LBLCD" onclick="LOV_LABEL_CODE.show_lov('FIELDSET_LABEL~','frmScrSnm','', 'Label Code', 'Label Code~Label Description', 'Label Code~Label Description',event)">
<span class="ICOlov"></span></BUTTON>
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="DATABLOCK_NAME">Data Block</LABEL>
<SELECT aria-required="false" width="200" style="width:200px" class="SELstd" name="FIELDSET_BLOCK" id="DATABLOCK_NAME" onChange="PopulateBlkFields('');FildSetValidations('')"></SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="MULTI_RECORD_FST">Multi Record</LABEL>
<SELECT aria-required="false"  class="SELstd" id="MULTI_RECORD_FST"  name="MULTI_RECORD" Disabled="TRUE">
                	<option selected="N" value="N">No</option>
                   	<option value="Y">Yes</option>
</SELECT>
</div>	

<div class="DIVText">
<LABEL class="LBLstd" for="VIEW_TYPE">View Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="VIEW_TYPE" id="VIEW_TYPE" onchange="FildSetValidations('')">
                    <option selected="SINGLE" value="SINGLE">Single</option>
                     <option value="MULTIPLE">Multiple</option>
</SELECT>
</div>	

<div class="DIVText">
<LABEL class="LBLstd" for="FIELDSET_HEIGHT">Fieldset Height</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="FIELDSET_HEIGHT" id="FIELDSET_HEIGHT" value="" size="25">
</div>


<div class="DIVText">
<LABEL class="LBLstd" for="ROWS_PER_PAGE">Number Of Rows</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="ROWS_PER_PAGE" id="ROWS_PER_PAGE" value="" disabled="true" size="25">
</div>

</fieldset>
</div>


<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne" style="width:35%" >
<fieldset class="FSTcell" > 

<!--VERSIONCONTROL-->
<div class="DIVText">
<LABEL class="LBLstd" for="FIELDSET_TYPE">Fieldset Type</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" name="FIELDSET_TYPE" id="FIELDSET_TYPE" onChange="fnFieldsetType()">
	<option selected="Normal" value="Normal">Normal</option>
    <option value="ImageSet">Image Set</option>
    <option value="Version">Version</option>
</SELECT>
</div>
<div class="DIVText">
<LABEL class="LBLstd" for="SCREEN_NAME11">Screen Name</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" name="FIELDSET_SCREEN" id="SCREEN_NAME11" onChange="fnfldsetval('SCREEN_NAME11')"></SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="SCREEN_PORTION_FST">Screen Portion</LABEL>
<SELECT aria-required="false" width="200" style="width:200px" class="SELstd" name="FIELDSET_PORTION" id="SCREEN_PORTION_FST" onChange="fnfldsetval('SCREEN_PORTION_FST');onChangeSelected('SCREEN_NAME11','RAD_TABS','TAB_NAME11','frmFldSet')">
	            	<option selected=true value=""></option>
	                <option value="HEADER">Header</option>
	                <option value="BODY">Body</option>
	                <option value="FOOTER">Footer</option>
			</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="TAB_NAME11">Tab Name</LABEL>
<SELECT aria-required="false" width="200" style="width:200px" class="SELstd" name="FIELDSET_TAB" id="TAB_NAME11" onChange="fnfldsetval('TAB_NAME11');onChangeSelected('TAB_NAME11','RAD_SECTIONS','SECTION_NAME11','frmFldSet')"></SELECT> 
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="SECTION_NAME11">Section Name</LABEL>
<SELECT aria-required="false" width="200" style="width:200px" class="SELstd" name="FIELDSET_SECTION" id="SECTION_NAME11" onChange="fnfldsetval('SECTION_NAME11');onChangeSelected('SECTION_NAME11','RAD_PARTITIONS','PARTITION_NAME11','frmFldSet')"></SELECT>
</div>
 			
<div class="DIVText">
<LABEL class="LBLstd" for="PARTITION_NAME11">Partition Name</LABEL>
<SELECT aria-required="false" width="200" style="width:200px" class="SELstd" name="FIELDSET_PARTITION" id="PARTITION_NAME11" onChange="SetSubpartition()"></SELECT>
</div>		 

<div style="display:none"> 
    <INPUT aria-required="false" class="TXTstd" type="text" name="FIELDSET_WIDTH" id="FIELDSET_WIDTH" value="" size="25">
</div>	
 

</fieldset>
<!--End of Form fields column two-->

</div>

<div class="DIVColumnOne" style="width:20%">
<fieldset class="FSTcell" > 

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="HORIZONTAL_FIELDSET">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="HORIZONTAL_FIELDSET" id="HORIZONTAL_FIELDSET">Horizontal Fieldset</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="FIELDSET_READONLY">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="FIELDSET_READ_ONLY" id="FIELDSET_READONLY">ReadOnly</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="NAV_BUTTONS_REQ">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="NAV_BUTTONS_REQ" id="NAV_BUTTONS_REQ" onClick="fnFldstNavVal()" >Navigation Button</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="NAV_BTN_FULL_WIDTH">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="NAV_BTN_FULL_WIDTH" id="NAV_BTN_FULL_WIDTH">Navigation Button Full Width</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="FIELDSET_VISIBLE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="FIELDSET_VISIBLE" id="FIELDSET_VISIBLE" checked="true" onClick="CheckVisibleVals(this,'FDN')">Visible</LABEL>
</div>
</div>
<!--
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="FIELDSET_IMAGE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="FIELDSET_IMAGE" id="FIELDSET_IMAGE" checked="false" onClick="fnFieldsetImage()">Image Set</LABEL>
</div>
</div>
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="VERSION_CONTROL">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="VERSION_CONTROL" id="VERSION_CONTROL"  onClick="fnSelectVersion()">version control</LABEL>
</div>
</div>
versioncontrol-->
</fieldset>
<!--End of Form fields column two-->
</div>  
 
</div>  

<div class="DIVMultipleBig" >
<div align="center">
    <div style="width:900px;">
        <table  border="0" cellspacing="0" cellpadding="1" name="Fieldset_TB" id="Fieldset_TB">
            <tbody>
			<tr>
            <td>
            <div style="border:1px solid #a2c2e5; background:#ffffff;">
			<table id="Datablkflds" name="Datablkflds" border="0" cellspacing="0" cellpadding="1">
            <tr>
            <th scope="col" class="thheader" ><span>Data Block Fields</span></th>
            </tr>
            <tr>
            <td align="right">
            <SELECT aria-required="false" multiple style="height:210px; width:350px;border:1px solid #CCCCCC" title="Data Block Fields" name="DATASRC_FIELDS_LIST " id="DATASRC2_FIELDS_LIST" ></SELECT>
            </td>
            </tr>
            </table>
			</div>
            </td>
            
            <td>
            <BUTTON title="Add" class="BUTTONInline" name="ADD1" id="ADD1" onclick="MoveToFieldset('FDN','DATASRC2_FIELDS_LIST','FieldsetFields');"><img src="Images/Last2.gif" alt="last" ></BUTTON>
            <br>
            <BUTTON title="Remove" class="BUTTONInline" name="DEL" id="DEL" onclick="MoveToDtBlkFlds('FDN','FieldsetFields','DATASRC2_FIELDS_LIST')"  value="DEL"><img src="Images/First2.gif" alt="first" ></BUTTON>                            
            </td>

            <td valign="top" >
            <div style=" height:230px;overflow:auto; border:1px solid #a2c2e5; background:#ffffff;">
				<table onKeyDown="FnAcessTblkeys(this,event);" summary="Multi Tenor" class="TABLEData" id="FieldsetFields" name="FieldsetFields" TYPE="MULTIPLE" VIEW="NO" PARENT="YES" width ="100%" border="0" cellpadding="1" cellspacing="0"  valign="left" align="left">
				<tHead>
				<th scope="col" class="thheader" align="center"><INPUT aria-required="false" type="checkbox" title="Select All Rows" name='SEL_ALL_FST' id='SEL_ALL_FST' onclick="checkAll('FieldsetFields','checkgroup','SEL_ALL_FST')"></th>
				<th scope="col" class="thheader" align="center"><span>FieldSet Fields</span></th>
                <th scope="col" class="thheader" align="center"><span>Subpartition Name</span></th>
                <th scope="col" class="thheader" style="display:none"></th>
                <th scope="col" class="thheader" style="display:none"></th>
			    <th scope="col" class="thheader" style="display:none"></th>
			    <th scope="col" class="thheader" style="display:none"></th>
		        </tHead>
				<tbody>
				</tbody>
				<tfoot><tr><td scope="row" name="FieldsetFields_TE" id="FieldsetFields_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
	           </table>
			</div>
            </td>
            </tr>
			</tbody>
			<tfoot><tr><td scope="row" name="Fieldset_TE" id="Fieldset_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
	    </table>
    </div>
</div> 
</div> 