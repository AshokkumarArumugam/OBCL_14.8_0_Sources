<!--
  **
  **
  ** File Name  : RadMenuDtls.jsp
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
  ** Copyright  2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  

-->


<div class="titlecontainer" id="Preferences" name="Preferences">
<span class="Subheader"><h2>Preferences</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');PopulateDataSourceForSummary('S');">
<img src="Images/rollback.gif" alt="Roll Back" >
</BUTTON>
</span>
</div>
  

<div class="Subcontainer" id="MnDt" NAME="MnDt" TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="HO_FUNCTION">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="HO_FUNCTION" id="HO_FUNCTION">Head Office Function</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="LOGGING_REQD">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="LOGGING_REQD" id="LOGGING_REQD">Logging Required</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="AUTO_AUTH">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="AUTO_AUTH" id="AUTO_AUTH">Auto Authorization</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="MODULE_AUTO_AUTH">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="MODULE_AUTO_AUTH" id="MODULE_AUTO_AUTH">Module Auto Authorization</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="TANK_MODIFICATIONS">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="TANK_MODIFICATIONS" id="TANK_MODIFICATIONS">Tank Modifications</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="FIELD_LOG_REQD">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="FIELD_LOG_REQD" id="FIELD_LOG_REQD">Field Log Required</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="MULTI_BRANCH_ACCESS">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="MULTI_BRANCH_ACCESS" id="MULTI_BRANCH_ACCESS">Multi Branch Access</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="EXPORT_REQD">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="EXPORT_REQD" id="EXPORT_REQD">Excel Export Required</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
	<b class="LBLstd" id="groupidpymt">&nbsp;</b>
		<div class="DIVchkrad">
			<LABEL class="LBLauto" for="ELCM_FUNCTION">
			<INPUT aria-required="false" type="checkbox" class="CHKstd" name="ELCM_FUNCTION" id="ELCM_FUNCTION" onclick="fnGatewayvalidation('ELCM_FUNCTION');getNodeDetails('MND');">Java Functions</LABEL>
		</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
	<b class="LBLstd" id="groupidpymt">&nbsp;</b>
		<div class="DIVchkrad">
			<LABEL class="LBLauto" for="GW_FUNCTION">
			<INPUT aria-required="false" type="checkbox" class="CHKstd" name="GW_FUNCTION" id="GW_FUNCTION" onclick="fnGatewayvalidation('GW_FUNCTION')">GateWay Screen</LABEL>
		</div>
</div>

</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" > 
<div class="DIVText">
<LABEL class="LBLstd" for="MODULE_ID">Module</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="MODULE_ID" id="MODULE_ID" value="" size="20">
<BUTTON   class="BTNimg"  title="List Of Values" tabindex="-1" id="BTN_LBLCD" onclick="LOV_MODULE.show_lov('MODULE_ID~MODULE_DESC~','frmMnDtls','', 'Module Code', 'Module Code~Module Description', 'Module Code~Module Description',event);">
<span class="ICOlov"></span></BUTTON>
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="MODULE_DESC">Module Description</LABEL>
<INPUT aria-required="false" class="TXTro" readonly type="text" name="MODULE_DESC" id="MODULE_DESC" value="" size="40">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="MODULE_GROUP_ID">Module Group</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="MODULE_GROUP_ID" id="MODULE_GROUP_ID" value="" size="20">
<BUTTON   class="BTNimg"  title="List Of Values" tabindex="-1" id="BTN_LBLCD" onclick="LOV_MODULE_GROUP_ID.show_lov('MODULE_GROUP_ID~','frmMnDtls','', 'Module Group', 'Module Group', 'Module Group',event);">
<span class="ICOlov"></span></BUTTON>
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="BRANCH_PROGRAM_ID">Branch Program Id</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="BRANCH_PROGRAM_ID" id="BRANCH_PROGRAM_ID" value="" size="40">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="PROCESS_CODE">Process Code</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="PROCESS_CODE" id="PROCESS_CODE" value="" size="40">
</div>
   
<div class="DIVText">
<LABEL class="LBLstd" for="VCS_FOLDER">SVN Repository URL</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="VCS_FOLDER" id="VCS_FOLDER" value="" size="40">
</div>

</fieldset>
<!--End of Form fields column two-->
</div>  
</div> 
 <!--<div id="Container1">--> 
 
 <div class="DIVtab" name="BUTTONMENUDTLS" id="BUTTONMENUDTLS">
    <ul id="tablist">
        <li id="li_MENUTABLS"><a class="Htaball" id="TAB_DIV_MENUTABLS" name="TAB_DIV_MENUTABLS" href="#nogo" onclick="FnShowTabs('DIV_MENUTABLS')"><span id="SP_DIV_MENUTABLS" name="SP_DIV_MENUTABLS">Menu Details</span></a></li>
		<li id="li_BLKFLDS"><a class="Htaball" id="TAB_DIV_BLKFLDS" name="TAB_DIV_BLKFLDS" href="#nogo" onclick="FnShowTabs('DIV_BLKFLDS')"><span id="SP_DIV_BLKFLDS" name="SP_DIV_BLKFLDS">Parameter Value Mappings</span></a></li>
    </ul>
</div> 

<div class="DIVTabPageContent">

<div name="DIV_BLKFLDS" id="DIV_BLKFLDS" class="DIVMultipleBig" >
<div class="Subcontainer" id="MnDt1" NAME="MnDt1" TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTstd"> 

<legend>Transaction Branch</legend>    

<div class="DIVText">
<LABEL class="LBLstd" for="TXN_BLOCK_NAME">Block Name</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" name="TXN_BLOCK_NAME" id="TXN_BLOCK_NAME" style="width:170px;" onchange="buildOptions(document.getElementById('TXN_FIELD_NAME'))">
	<option value="">Choose Block</option>
</SELECT>
</div>	

<div class="DIVText">
<LABEL class="LBLstd" for="TXN_FIELD_NAME">Field Name</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" style="width:170px;" name="TXN_FIELD_NAME" id="TXN_FIELD_NAME" >
	    <option value="">Choose Field</option>
</SELECT> 
</div>	 

</fieldset>
</div>
<!--End of Form fields column one-->

</div> 

<div class="Subcontainer" id="MnDt2" NAME="MnDt2" TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTstd"> 

<legend>Origin Source</legend>    

<div class="DIVText">
<LABEL class="LBLstd" for="SRC_BLOCK_NAME">Block Name</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" name="SRC_BLOCK_NAME" id="SRC_BLOCK_NAME" style="width:170px;" onchange="buildOptions(document.getElementById('SRC_FIELD_NAME'))">
	<option value="">Choose Block</option>
</SELECT>
</div>	

<div class="DIVText">
<LABEL class="LBLstd" for="SRC_FIELD_NAME">Field Name</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" style="width:170px;" name="SRC_FIELD_NAME" id="SRC_FIELD_NAME" >
	    <option value="">Choose Field</option>
</SELECT> 
</div>	 

</fieldset>
</div>
<!--End of Form fields column one--> 

</div> 
 <!--<div id="Container1">--> 
 
 </div>
 <!--<div id="Container1">--> 

 <div name="DIV_MENUTABLS" id="DIV_MENUTABLS" class="DIVMultipleBig" style="WIDTH: 94%"> <!-- changed screen responsive -->
 
<div class="DIVMultipleBig" style="position:relative; margin-top:40px; margin-left:20px; margin-right:20px; WIDTH:100%"> <!-- changed screen responsive -->
	    <div class="MEButtons" id="funcDesc_ME" name="funcDesc_ME" style="WIDTH: 100%"><!-- changed screen responsive -->
			<BUTTON id="actns" name="actns"  onclick="fnActions('');" class="Buttontext">Control String</BUTTON>&nbsp;
            <BUTTON title="Add Row"  id="ADD" name="ADD" onclick="addNewRow('funcDesc')" class="BTNimg"><span class="ICOadd" tabindex="-1"><span class="LBLinv">Add Row</span></span></BUTTON>
			<BUTTON title="Delete Row"  id="DEL" name="DEL" onclick="delRow('funcDesc')" class="BTNimg"><span class="ICOremove" tabindex="-1"><span class="LBLinv">Delete Row</span></span></BUTTON>
	    </div>
	<div class="DIVmultiplebox" style="WIDTH: 100%;"><!-- changed screen responsive -->
		<div class="DIVMultipleBigInner" style="overflow-x:hidden; WIDTH: 100%"><!-- changed screen responsive -->
			<table style="WIDTH: 100%;" onKeyDown="FnAcessTblkeys(this,event);" id="funcDesc" name="funcDesc" summary="Multi Tenor" TYPE="MULTIPLE" PARENT="YES" VIEW="NO"  class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('funcDesc','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Function Id</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Module<img src="Images/star.gif" alt="Required Field"></img></span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Module Description</span></th>
			    	</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" id="funcDesc_TE" name="funcDesc_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>
 </div>
  </div>