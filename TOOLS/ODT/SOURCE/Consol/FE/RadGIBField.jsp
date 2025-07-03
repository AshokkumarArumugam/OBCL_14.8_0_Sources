<!--
  **
  **
  ** File Name  : RadGIBField.jsp
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
<span class="Subheader"><h2>Body Field Properties</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');"><img src="Images/rollback.gif" alt="Roll Back"></BUTTON>
</span>
</div>
  

<div id="DIV_ASSOCIATED_B_FIELDS_OUT" name="DIV_ASSOCIATED_B_FIELDS_OUT" class="DIVMultipleBig" style="position:relative; margin-top:40px; margin-left:20px; margin-right:20px; width:AUTO;">
		<div class="MEButtons" id="GI_BOUT_fields_ME" name="GI_BOUT_fields_ME">
			<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="Fields">Fields</div>
			<BUTTON class="Buttontext" onclick="fngipopulate('ScrArgs','GI_BOUT_fields')" id="BTN1_Details" name="BTN1_Details">Details</BUTTON>&nbsp;
			<BUTTON class="BTNimg" title="Add Row" onclick="addNewRow('GI_BOUT_fields')" name="ADD" value="ADD"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
			<BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL"  onclick="delRow('GI_BOUT_fields')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>&nbsp;&nbsp;
    	</div> 
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:500px;">
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="GI_BOUT_fields" name="GI_BOUT_fields" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('GI_BOUT_fields','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Field Code</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Data Type</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Date Format</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Table Names</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Column Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Value</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Length</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Key Word</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Padding Preference</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Padding Charcater</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Exclude in File</span></th> 
			    	</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="GI_BOUT_fields_TE" name="GI_BOUT_fields_TE" colspan="14"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>

<div id="DIV_ASSOCIATED_B_FIELDS_IN" name="DIV_ASSOCIATED_B_FIELDS_IN" class="DIVMultipleBig" style="position:relative; margin-top:40px; margin-left:20px; margin-right:20px; width:AUTO;">
		<div class="MEButtons" id="GI_BIN_fields_ME" name="GI_BIN_fields_ME">
			<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="Fields">Fields</div>
			<BUTTON class="Buttontext" onclick="fngipopulate('ScrArgs','GI_BIN_fields')" id="BTN2_Details" name="BTN2_Details" >Details</BUTTON>&nbsp;
			<BUTTON class="BTNimg" title="Add Row" onclick="addNewRow('GI_BIN_fields');fn_populate_Blocks_togi('RAD_DATA_BLOCKS','GI_BIN_fields','frmSum','BLK_NAME',8,3)" name="ADD" value="ADD"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
			<BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL"  onclick="delRow('GI_BIN_fields')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>&nbsp;&nbsp;
    	</div>
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:500px;">
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="GI_BIN_fields" name="GI_BIN_fields" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('GI_BIN_fields','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Field Code</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Data Type</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Date Format</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Start Position</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Length</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Trimming Preference</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Trimming Charcater</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Block Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Field Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Parent Block</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Exists In File</span></th> 
			    	</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="GI_BIN_fields_TE" name="GI_BIN_fields_TE" colspan="14"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div> 