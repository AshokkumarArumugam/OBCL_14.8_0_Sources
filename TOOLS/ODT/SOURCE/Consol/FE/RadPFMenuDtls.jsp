<!--
  **
  **
  ** File Name  : RadGIMenuDtls.jsp
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

<div class="titlecontainer">
<span class="Subheader"><h2>Preferences</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');"><img src="Images/rollback.gif" alt="Roll Back"></BUTTON>
</span>
</div> 

<div   class="Subcontainer" name="GMnDt" id="GMnDt"  TYPE="SINGLE" VIEW="NO">

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell">

<div class="DIVText" >
<LABEL class="LBLstd" for="ENTITY_DESCRIPTION">Entity Description</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="ENTITY_DESCRIPTION" name="ENTITY_DESCRIPTION"  value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('DSRC','ENTITY_DESCRIPTION','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="PURGE_TYPE">Purge Type</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" style="width:170px;" name="PURGE_TYPE" id="PURGE_TYPE" >
	    <option selected="D" value="D">Delete</option> 
		<option value="A">Archive</option>		
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="PURGE_MODE">Purge Mode</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" style="width:170px;" name="PURGE_MODE" id="PURGE_MODE" >
	    <option selected="E" value="E">Entity</option>
		<option value="B">Bulk</option>  
</SELECT>
</div> 


<div style="display:none">

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="ACTIVE_FLAG">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="ACTIVE_FLAG" id="ACTIVE_FLAG">Active Flag</LABEL>
</div>
</div> 

<div class="DIVText" >
<LABEL class="LBLstd" for="START_DATE">Start Date</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="START_DATE" name="START_DATE"  value="" size="30">
</div>

</div>


<div class="DIVText">
<LABEL class="LBLstd" for="PURGE_FREQUENCY">Purge Frequency</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" style="width:170px;" name="PURGE_FREQUENCY" id="PURGE_FREQUENCY" >
	    <option></option>
		<option value="E">Ad-hoc</option>
		<option value="D">Daily</option>
		<option value="W">Weekly</option>
		<option value="M">Monthly</option>
		<option value="Q">Quarterly</option>
		<option value="Y">Yearly</option>		
</SELECT>
</div> 


  
</fieldset>
</div> 



<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell">


<div class="DIVText" >
<LABEL class="LBLstd" for="ARCHIVE_TABLE_SUFFIX">Archive Table Suffix</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="ARCHIVE_TABLE_SUFFIX" name="ARCHIVE_TABLE_SUFFIX"  value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('DSRC','ARCHIVE_TABLE_SUFFIX','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div>
  

<div class="DIVText">
<LABEL class="LBLstd" for="ARCHIVAL_DESTINATION">Archival Destination</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" style="width:170px;" name="ARCHIVAL_DESTINATION" id="ARCHIVAL_DESTINATION" >
	    <option></option>
		<option value="SS">Same Schema</option>
		<option value="DS">Different Schema in same instance</option>
		<option value="DD">Different Database</option> 
</SELECT>
</div> 

</fieldset>
</div> 
</div>

<div id="DIV_PF_ARGDESC" name="DIV_PF_ARGDESC"   class="DIVMultipleBig" style="position:relative; margin-top:40px; margin-left:20px; margin-right:20px; width:AUTO;">
	    <div class="MEButtons" id="PF_ARGDESC_ME" name="PF_ARGDESC_ME">
			<BUTTON title="Add Row"  id="ADD" name="ADD" onclick="addNewRow('PF_ARGDESC')" class="BTNimg"><span class="ICOadd" tabindex="-1"><span class="LBLinv">Add Row</span></span></BUTTON>
			<BUTTON title="Delete Row"  id="DEL" name="DEL" onclick="delRow('PF_ARGDESC')" class="BTNimg"><span class="ICOremove" tabindex="-1"><span class="LBLinv">Delete Row</span></span></BUTTON>
	    </div>
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="overflow-x:hidden">
			<table onKeyDown="FnAcessTblkeys(this,event);" id="PF_ARGDESC" name="PF_ARGDESC" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO"  class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('PF_ARGDESC','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Argument Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Target Table</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Target Column</span></th>
			    	</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" id="PF_ARGDESC_TE" name="PF_ARGDESC_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>