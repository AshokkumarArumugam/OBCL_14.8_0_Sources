<!--
  **
  **
  ** File Name  : RadScreens.jsp
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
<script>
function fnObieeOperation(){
if(document.getElementById('SCREEN_OBIEE').checked == false){

}
}
</script>

<div class="titlecontainer" id="Screen_Details" name="Screen_Details">
<span class="Subheader"><h2>Screen Details</h2></span>
<span class="funcbtn">
<BUTTON id="bttnDeleteBlockField" class="func_btn_1" onclick="fnDel('SCR~'+clickedobjects[1],'1')" title="Delete Screen"><img src="Images/delete2.gif"   alt="Delete"></BUTTON>&nbsp;
<BUTTON id="bttnRenameBlockField" class="func_btn_1" onclick="fnRename('SCR~'+clickedobjects[1],'1')" title="Rename Screen"><img src="Images/rename.gif"   alt="Rename"></BUTTON>&nbsp;
<BUTTON class="func_btn_1" onclick="showPreview(clickedobjects[1])" title="Preview Screen"><img src="Images/preview.gif" alt="Preview" ></BUTTON>&nbsp;
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');PopulateDataSourceForSummary('S');"><img src="Images/rollback.gif" alt="Roll Back" ></BUTTON>
</span>
</div>
 

<div   class="Subcontainer"  TYPE="SINGLE"  NAME="SCR" id="SCR" >
<!--Form fields column one-->

<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 
  
<div class="DIVText">
<LABEL class="LBLstd" for="SCREEN_NAME_SC">Screen Name</LABEL>
<INPUT aria-required="false" class="TXTro"  readonly type="text" name="SCREEN_NAME" id="SCREEN_NAME_SC" value="" size="40">
</div> 

<div class="DIVText" >
<LABEL class="LBLstd" for="SCREEN_TITLE_S">Screen Title</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="SCREEN_TITLE" id="SCREEN_TITLE_S" value="" size="40">
<BUTTON    class="BTNimg"  title="List Of Values" tabindex="-1"  id="BTN_LBLCD" onclick="LOV_LABEL_CODE.show_lov('SCREEN_TITLE_S~','frmScrSnm','', 'Label Code', 'Label Code~Label Description', 'Label Code~Label Description',event)">
<span class="ICOlov"></span></BUTTON>
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="SCREEN_SIZE">Screen Size</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" name="SCREEN_SIZE" id="SCREEN_SIZE" >
	<option selected="Small" value="SMALL">Small</option>
    <option value="MEDIUM">Medium</option>
    <option value="LARGE">Large</option>
</SELECT>
</div>	

<div class="DIVText">
<LABEL class="LBLstd" for="EXIT_BUTTON_TYPE">Exit Button Type</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" name="EXIT_BUTTON_TYPE" id="EXIT_BUTTON_TYPE" >
	<option selected></option>
    <option value="1">Default Cancel</option>
    <option value="2">Default Ok Cancel</option>
    <option value="3">Default Ok Reject Cancel</option>
</SELECT>
</div>	

 
</fieldset>
<!--End of Form fields column two-->
</div> 
<!--Form fields column one-->

<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div   STYLE="display:none" > 
    <INPUT aria-required="false"  type="hidden"  name="RELEASE_NAME" id="RELEASE_NAME" value="" > 
    <INPUT aria-required="false"  type="hidden"  name="RELEASE_TYPE" id="RELEASE_TYPE" value="" >      
</div>  
  
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="MAIN_SCREEN">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="MAIN_SCREEN" id="MAIN_SCREEN" onClick="EnableScrArgs('1')">Main Screen</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="SCREEN_OBIEE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="SCREEN_OBIEE" id="SCREEN_OBIEE" onClick="fnObieeOperation(this)">OBIEE</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="SCREEN_VISIBLE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="SCREEN_VISIBLE" id="SCREEN_VISIBLE" checked="true" onClick="CheckVisibleVals(this,'SCR')">Visible</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="SCREEN_QUERYREQ">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="SCREEN_QUERYREQ" id="SCREEN_QUERYREQ" >Query Required</LABEL>
</div>
</div>

 
</fieldset>
<!--End of Form fields column two-->
</div> 
</div> 
 
<div class="DIVMultipleBig" style="position:relative; margin-left:20px; margin-right:20px; width:AUTO;" id="dataContainer_BLK_CONTRACT_MULTITNR" name="dataContainer" >
		<div class="MEButtons" id="ScrArgnts_ME" NAME="ScrArgnts_ME">
			<BUTTON class="BTNimg" title="Add Row" onclick="addNewRow('ScrArgnts');fn_populate_Blocks_toCallfrmFlds('RAD_DATA_BLOCKS','ScrArgnts','frmScrSnm','BLOCK_NAME',2);fn_populate_Blocks_toCallfrmFlds('RAD_DATA_BLOCKS','ScrArgnts','frmScrSnm','BLOCK_NAME',5);EnableScrArgs('')" name="ADD" value="ADD"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
			<BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL"  onclick="delRow('ScrArgnts')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>
		</div>
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:300px;"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="ScrArgnts" name="ScrArgnts" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('ScrArgnts','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Argument Name</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Source Block</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Source Field</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Argument Value</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Target Block</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Target Field</span></th>
					<th scope="col" class="THgrid" style="background-color:#e6f2f4;display:none"></th>
					<th scope="col" class="THgrid" style="background-color:#e6f2f4;display:none"></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Active</span></th>
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="ScrArgnts_TE" NAME="ScrArgnts_TE" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>  