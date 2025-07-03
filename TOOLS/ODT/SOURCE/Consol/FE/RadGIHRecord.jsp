<!--
  **
  **
  ** File Name  : RadGIHRecord.jsp
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
<span class="Subheader"><h2>Header Record Properties</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');"><img src="Images/rollback.gif" alt="Roll Back"></BUTTON>
</span>
</div>  

<div   class="Subcontainer" name="GI_Hrecords" id="GI_Hrecords"  TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText" >
<LABEL class="LBLstd" for="HR_REC_CODE">Record Code</LABEL>
<INPUT aria-required="false"  class="TXTro" readonly  type="text"  id="HR_REC_CODE" name="REC_CODE" value="" size="30">
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="HR_REC_CATEGORY">Record Category</LABEL>
<SELECT aria-required="false"  class="SELstd" name="REC_CATEGORY" id="HR_REC_CATEGORY">
			<option name="HDR" id="HDR"value="">Header</option> 
</SELECT>
</div>
 

<div class="DIVText" >
<LABEL class="LBLstd" for="HR_NO_OF_LINES">No. of  Lines</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  onchange="numberval(this)" id="HR_NO_OF_LINES" name="NO_OF_LINES" value="" size="30">
</div>


<div class="DIVText" >
<LABEL class="LBLstd" for="HR_LENGTH">Length</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  onchange="numberval(this)" id="HR_LENGTH" name="LENGTH" value="" size="30">
</div>


<div class="DIVText" >
<LABEL class="LBLstd" for="HR_DB_TABLES">Table Names</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="HR_DB_TABLES" name="DB_TABLES" value="" size="30">
</div>


<div class="DIVText" >
<LABEL class="LBLstd" for="HR_WHERE_CLAUSE">Where Clause</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="HR_WHERE_CLAUSE" name="WHERE_CLAUSE" value="" size="30">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" name="HWHERE_CLAUSE0" onclick="popupedit('GI_Hrecords','HWHERE_CLAUSE0','','')"><span class="ICOnarrative"></span></BUTTON>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="HR_ORDER_BY_CLAUSE">Order By Clause</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="HR_ORDER_BY_CLAUSE" name="ORDER_BY_CLAUSE" value="" size="30">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" name="HORDER_BY_CLAUSE0" onclick="popupedit('GI_Hrecords','HORDER_BY_CLAUSE0','','')"><span class="ICOnarrative"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="HR_REC_LOC_TYPE">Record Location Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="REC_LOC_TYPE" id="HR_REC_LOC_TYPE">
			<option name="RL_FXL" id="RL_FXL" value="RL_FXL">Fixed Length</option>
            <option name="RL_FNL" id="RL_FNL" value="RL_FNL">Fixed no. of Lines</option>
            <option name="RL_TDL" id="RL_TDL" value="RL_TDL">Tag Delimiter</option>
			<option name="RL_DLM" id="RL_DLM" value="RL_DLM">Delimiter</option>
</SELECT>
</div> 

<div class="DIVText" >
<LABEL class="LBLstd" for="HR_REC_DELIMITER">Record Delimiter</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="HR_REC_DELIMITER" name="REC_DELIMITER"  value="" size="30">
</div>



</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" > 


<div class="DIVText">
<LABEL class="LBLstd" for="HR_FIELD_TYPE">Field Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="FIELD_TYPE" id="HR_FIELD_TYPE">
			<option name="FL_FXL" id="FL_FXL"value="FL_FXL">Fixed Length</option>
            <option name="FL_TDL" id="FL_TDL"value="FL_DLM">Delimiter</option>
</SELECT>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="HR_FIELD_DELIMITER">Field Delimiter</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="HR_FIELD_DELIMITER" name="FIELD_DELIMITER" value="" size="30">
</div>
  

<div class="DIVText">
<LABEL class="LBLstd" for="HR_REC_ID_TYPE">Record ID Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="REC_ID_TYPE" id="HR_REC_ID_TYPE">
			<option name="RT_RDL" id="RT_RDL"value="RT_RDL">From Record Tag Delimiter</option>
			<option name="RT_FFL" id="RT_FFL"value="RT_FFL">From Field</option>
			<option name="RT_FXL" id="RT_FXL"value="RT_FXL">Fixed Length</option>
			<option name="RT_CST" id="RT_CST"value="RT_CST">Custom Tags</option>
</SELECT>
</div>
  
<div class="DIVText" >
<LABEL class="LBLstd" for="HR_TAG_FLD_POS">Field Position</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="HR_TAG_FLD_POS" name="TAG_FLD_POS"   value="" size="30">
</div>


<div class="DIVText" >
<LABEL class="LBLstd" for="HR_ST_TAG">Start Tag</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="HR_ST_TAG" name="ST_TAG"  value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="HR_ED_TAG">End Tag</LABEL>
<INPUT aria-required="false"  class="TXTstd"   type="text"  id="HR_ED_TAG" name="ED_TAG"   value="" size="30">
</div>
 

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="HR_HOMOGENOUS">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="HOMOGENOUS" id="HR_HOMOGENOUS">Homogenous</LABEL>
</div>
</div> 

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="HR_HIERARCHICAL">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="HIERARCHICAL" id="HR_HIERARCHICAL">Hierarchical</LABEL>
</div>
</div> 

</fieldset>
<!--End of Form fields column two-->
</div> 
</div>  