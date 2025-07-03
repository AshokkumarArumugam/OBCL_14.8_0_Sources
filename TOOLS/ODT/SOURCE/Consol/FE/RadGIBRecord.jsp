<!--
  **
  **
  ** File Name  : RadGIBRecord.jsp
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
<span class="Subheader"><h2>Body Record Properties</h2></span>
<span class="funcbtn">
<BUTTON id="bttnDeleteBlockRecord" class="func_btn_1" onclick="fnDel('RBDY~'+clickedobjects[0],'1')" title="Delete Record"><img src="Images/delete2.gif"   alt="Delete"></BUTTON>&nbsp;
<BUTTON id="bttnRenameBlockRecord" class="func_btn_1" onclick="fnGIRename('RBDY~'+clickedobjects[0],'1')" title="Rename Record"><img src="Images/rename.gif"   alt="Rename"></BUTTON>&nbsp;
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');"><img src="Images/rollback.gif" alt="Roll Back"></BUTTON>
</span>
</div>  

<div   class="Subcontainer" name="GI_records" id="GI_records"  TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText" >
<LABEL class="LBLstd" for="BR_REC_CODE">Record Code</LABEL>
<INPUT aria-required="false"  class="TXTro" readonly  type="text"  id="BR_REC_CODE" name="REC_CODE" value="" size="30">
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="BR_REC_CATEGORY">Record Category</LABEL>
<SELECT aria-required="false"  class="SELstd" name="REC_CATEGORY" id="BR_REC_CATEGORY">
			<option name="RSHDR" id="RSHDR"value="RSHDR">Record Set Header</option>
            <option name="REC" id="REC"value="REC">Records</option>
			<option name="RSFTR" id="RSFTR"value="RSFTR">Record Set Footer</option>
</SELECT>
</div>
 

<div class="DIVText" >
<LABEL class="LBLstd" for="BR_NO_OF_LINES">No. of  Lines</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  onchange="numberval(this)" id="BR_NO_OF_LINES" name="NO_OF_LINES" value="" size="30">
</div>


<div class="DIVText" >
<LABEL class="LBLstd" for="BR_LENGTH">Length</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  onchange="numberval(this)" id="BR_LENGTH" name="LENGTH" value="" size="30">
</div>


<div class="DIVText" >
<LABEL class="LBLstd" for="BR_DB_TABLES">Table Names</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="BR_DB_TABLES" name="DB_TABLES" value="" size="30">
</div>


<div class="DIVText" >
<LABEL class="LBLstd" for="BR_WHERE_CLAUSE">Where Clause</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="BR_WHERE_CLAUSE" name="WHERE_CLAUSE" value="" size="30">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" name="BWHERE_CLAUSE1" onclick="popupedit('GI_Hrecords','BWHERE_CLAUSE1','','')"><span class="ICOnarrative"></span></BUTTON>
</div> 
 

<div class="DIVText" >
<LABEL class="LBLstd" for="BR_ORDER_BY_CLAUSE">Order By Clause</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="BR_ORDER_BY_CLAUSE" name="ORDER_BY_CLAUSE" value="" size="30">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" name="BORDER_BY_CLAUSE1" onclick="popupedit('GI_Hrecords','BORDER_BY_CLAUSE1','','')"><span class="ICOnarrative"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="BR_REC_LOC_TYPE">Record Location Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="REC_LOC_TYPE" id="BR_REC_LOC_TYPE">
			<option name="RL_FXL" id="RL_FXL" value="RL_FXL">Fixed Length</option>
            <option name="RL_FNL" id="RL_FNL" value="RL_FNL">Fixed no. of Lines</option>
            <option name="RL_TDL" id="RL_TDL" value="RL_TDL">Tag Delimiter</option>
			<option name="RL_DLM" id="RL_DLM" value="RL_DLM">Delimiter</option>
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="BR_FIELD_TYPE">Field Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="FIELD_TYPE" id="BR_FIELD_TYPE">
			<option name="FL_FXL" id="FL_FXL"value="FL_FXL">Fixed Length</option>
            <option name="FL_TDL" id="FL_TDL"value="FL_DLM">Delimiter</option>
</SELECT>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="BR_FIELD_DELIMITER">Field Delimiter</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="BR_FIELD_DELIMITER" name="FIELD_DELIMITER" value="" size="30">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="BR_REC_ID_TYPE">Record ID Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="REC_ID_TYPE" id="BR_REC_ID_TYPE">
			<option name="RT_RDL" id="RT_RDL"value="RT_RDL">From Record Tag Delimiter</option>
			<option name="RT_FFL" id="RT_FFL"value="RT_FFL">From Field</option>
			<option name="RT_FXL" id="RT_FXL"value="RT_FXL">Fixed Length</option>
			<option name="RT_CST" id="RT_CST"value="RT_CST">Custom Tags</option>
</SELECT>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="BR_TAG_DELIMITER">Tag Delimiter</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="BR_TAG_DELIMITER" name="TAG_DELIMITER" value="" size="30">
</div>

</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" > 


<div class="DIVText" >
<LABEL class="LBLstd" for="BR_TAG_FLD_POS">Tag Field Position</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="BR_TAG_FLD_POS" name="TAG_FLD_POS" value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="BR_TAG_LENGTH">Tag Length</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="BR_TAG_LENGTH" name="TAG_LENGTH"  onchange="numberval(this)" value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="BR_TAG_ST_POS">Tag Start Position</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="BR_TAG_ST_POS" name="TAG_ST_POS"   value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="BR_TAG_VALUE">Tag Value</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="BR_TAG_VALUE" name="TAG_VALUE"   value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="BR_ST_TAG">Start Tag</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="BR_ST_TAG" name="ST_TAG"  value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="BR_ED_TAG">End Tag</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="BR_ED_TAG" name="ED_TAG"   value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="BR_HIERARCHY_MODE">Hierarchy mode</LABEL>
<SELECT aria-required="false" class="SELstd" name="HIERARCHY_MODE" id="BR_HIERARCHY_MODE" value="" >
			<option name="ORD" id="ORD" value="ORD" selected="ORD">Ordered</option>
			<option name="REL" id="REL" value="REL">Relational</option>
			<option name="EXP" id="EXP" value="EXP">Explicit</option>
	</SELECT>
</div> 

<div class="DIVText" >
<LABEL class="LBLstd" for="BR_REC_DELIMITER">Record Delimiter</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="BR_REC_DELIMITER" name="REC_DELIMITER"  value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="BR_CUSTOM_TAGS">Custom tags</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="BR_CUSTOM_TAGS" name="CUSTOM_TAGS"   value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="BR_FLD_POS">Field Position</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="BR_FLD_POS" name="FLD_POS"   value="" size="30">
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="BR_HOMOGENOUS">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="HOMOGENOUS" id="BR_HOMOGENOUS">Homogenous</LABEL>
</div>
</div> 

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="BR_HIERARCHICAL">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="HIERARCHICAL" id="BR_HIERARCHICAL">Hierarchical</LABEL>
</div>
</div> 

</fieldset>
<!--End of Form fields column two-->
</div> 
</div>  

<div id="DIV_ASSOCIATED_B_RECORDS" name="DIV_ASSOCIATED_B_RECORDS" class="DIVMultipleBig" style="position:relative; margin-top:40px; margin-left:20px; margin-right:20px; width:AUTO;">
	    <div class="MEButtons" id="GI_B_AssocRecords_ME" name="GI_B_AssocRecords_ME">
			<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="Records">Associated Records</div>
			<BUTTON class="BTNimg" title="Add Row" onclick="addNewRow('GI_B_AssocRecords');fn_populate_RECORDS_togi('REC_CODE','GI_B_AssocRecords','frmSum','REC_CODE',1,4)" name="ADD" value="ADD"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
			<BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL"  onclick="delRow('GI_B_AssocRecords')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>&nbsp;&nbsp;
		</div>
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:200px;overflow-x:hidden">
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="GI_B_AssocRecords" name="GI_B_AssocRecords" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO"  class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('GI_B_AssocRecords','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Record  Code</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Parent Record</span></th> 
			    	</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="GI_B_AssocRecords_TE" name="GI_B_AssocRecords_TE"colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>

<div id="DIV_ASSOCIATED_B_BLOCKS" name="DIV_ASSOCIATED_B_BLOCKS" class="DIVMultipleBig" style="position:relative; margin-top:40px; margin-left:20px; margin-right:20px; width:AUTO;">
	    <div class="MEButtons" id="GI_B_AssocBlocks_ME" name="GI_B_AssocBlocks_ME">
			<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="Records">Generate New Records in Blocks</div>
			<BUTTON class="BTNimg" title="Add Row" onclick="addNewRow('GI_B_AssocBlocks');fn_populate_Blocks_togi('RAD_DATA_BLOCKS','GI_B_AssocBlocks','frmSum','BLK_NAME',1,4)" name="ADD" value="ADD"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
			<BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL"  onclick="delRow('GI_B_AssocBlocks')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>&nbsp;&nbsp;
		</div>
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:200px;overflow-x:hidden">
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="GI_B_AssocBlocks" name="GI_B_AssocBlocks" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO"  class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('GI_B_AssocRecords','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Block Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Generate New Blocks</span></th> 
			    	</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="GI_B_AssocBlocks_TE" name="GI_B_AssocBlocks_TE" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div> 
    
 
 
 