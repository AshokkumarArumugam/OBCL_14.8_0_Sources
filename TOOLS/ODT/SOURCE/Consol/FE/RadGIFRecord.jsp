<!--
  **
  **
  ** File Name  : RadGIFRecord.jsp
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
<span class="Subheader"><h2>Footer Record Properties</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');"><img src="Images/rollback.gif" alt="Roll Back"></BUTTON>
</span>
</div>  

<div   class="Subcontainer" name="GI_Frecords" id="GI_Frecords"  TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText" >
<LABEL class="LBLstd" for="FR_REC_CODE">Record Code</LABEL>
<INPUT aria-required="false"  class="TXTro" readonly  type="text"  id="FR_REC_CODE" name="REC_CODE" value="" size="30">
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="FR_REC_CATEGORY">Record Category</LABEL>
<SELECT aria-required="false"  class="SELstd" name="REC_CATEGORY" id="FR_REC_CATEGORY">
			<option value="FTR" selected="FTR" >Footer</option> 
</SELECT>
</div>
 

<div class="DIVText" >
<LABEL class="LBLstd" for="FR_NO_OF_LINES">No. of  Lines</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  onchange="numberval(this)" id="FR_NO_OF_LINES" name="NO_OF_LINES" value="" size="30">
</div>


<div class="DIVText" >
<LABEL class="LBLstd" for="FR_LENGTH">Length</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  onchange="numberval(this)" id="FR_LENGTH" name="LENGTH" value="" size="30">
</div>


<div class="DIVText" >
<LABEL class="LBLstd" for="FR_DB_TABLES">Table Names</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="FR_DB_TABLES" name="DB_TABLES" value="" size="30">
</div>


<div class="DIVText" >
<LABEL class="LBLstd" for="FR_WHERE_CLAUSE">Where Clause</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="FR_WHERE_CLAUSE" name="WHERE_CLAUSE" value="" size="30">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" name="FWHERE_CLAUSE2" onclick="popupedit('GI_Hrecords','FWHERE_CLAUSE2','','')"><span class="ICOnarrative"></span></BUTTON>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="FR_ORDER_BY_CLAUSE">Order By Clause</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="FR_ORDER_BY_CLAUSE" name="ORDER_BY_CLAUSE" value="" size="30">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" name="FORDER_BY_CLAUSE2" onclick="popupedit('GI_Hrecords','FORDER_BY_CLAUSE2','','')"><span class="ICOnarrative"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="FR_REC_LOC_TYPE">Record Location Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="REC_LOC_TYPE" id="FR_REC_LOC_TYPE">
			<option name="RL_FXL" id="RL_FXL" value="RL_FXL">Fixed Length</option>
            <option name="RL_FNL" id="RL_FNL" value="RL_FNL">Fixed no. of Lines</option>
            <option name="RL_TDL" id="RL_TDL" value="RL_TDL">Tag Delimiter</option>
			<option name="RL_DLM" id="RL_DLM" value="RL_DLM">Delimiter</option>
</SELECT>
</div> 

<div class="DIVText" >
<LABEL class="LBLstd" for="FR_REC_DELIMITER">Record Delimiter</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="FR_REC_DELIMITER" name="REC_DELIMITER"  value="" size="30">
</div>



</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" > 


<div class="DIVText">
<LABEL class="LBLstd" for="FR_FIELD_TYPE">Field Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="FIELD_TYPE" id="FR_FIELD_TYPE">
			<option name="FL_FXL" id="FL_FXL"value="FL_FXL">Fixed Length</option>
            <option name="FL_TDL" id="FL_TDL"value="FL_DLM">Delimiter</option>
</SELECT>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="FR_FIELD_DELIMITER">Field Delimiter</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="FR_FIELD_DELIMITER" name="FIELD_DELIMITER" value="" size="30">
</div>
  

<div class="DIVText">
<LABEL class="LBLstd" for="FR_REC_ID_TYPE">Record ID Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="REC_ID_TYPE" id="FR_REC_ID_TYPE">
			<option name="RT_RDL" id="RT_RDL"value="RT_RDL">From Record Tag Delimiter</option>
			<option name="RT_FFL" id="RT_FFL"value="RT_FFL">From Field</option>
			<option name="RT_FXL" id="RT_FXL"value="RT_FXL">Fixed Length</option>
			<option name="RT_CST" id="RT_CST"value="RT_CST">Custom Tags</option>
</SELECT>
</div>
  
<div class="DIVText" >
<LABEL class="LBLstd" for="FR_TAG_FLD_POS">Field Position</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="FR_TAG_FLD_POS" name="TAG_FLD_POS"   value="" size="30">
</div>


<div class="DIVText" >
<LABEL class="LBLstd" for="FR_ST_TAG">Start Tag</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="FR_ST_TAG" name="ST_TAG"  value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="FR_ED_TAG">End Tag</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="FR_ED_TAG" name="ED_TAG"   value="" size="30">
</div>
 

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="FR_HOMOGENOUS">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="HOMOGENOUS" id="FR_HOMOGENOUS">Homogenous</LABEL>
</div>
</div> 

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="FR_HIERARCHICAL">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="HIERARCHICAL" id="FR_HIERARCHICAL">Hierarchical</LABEL>
</div>
</div> 

</fieldset>
<!--End of Form fields column two-->
</div> 
</div>