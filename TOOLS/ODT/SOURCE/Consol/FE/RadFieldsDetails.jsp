<!--
  **
  **
  ** File Name  : RadFieldsDetails.jsp
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
<div class="Subheader"><h2>Data Source Field Details</h2></div>
<div class="funcbtn">
<BUTTON class="Buttontext" id="datatype_col" name="datatype_col" onclick="fnPopulatedataype()">Refresh</BUTTON>&nbsp;
<BUTTON class="func_btn_1"  id="FNDEL" name="FNDEL" onclick="fnDel('DSN~'+clickedobjects[1]+'~'+clickedobjects[2],'1')" title="Delete DB Field"><img src="Images/delete2.gif"   alt="Delete"></BUTTON>&nbsp;
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo"  onclick="showData('');PopulateDataSourceForSummary('S');"><img src="Images/rollback.gif" alt="Roll Back"></BUTTON>
</div>
</div>
 
<div  class="Subcontainer" TYPE="SINGLE"  id="fields"  name="fields" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText">
<LABEL class="LBLstd" for="COLUMN_NAME">Column Name</LABEL>
<INPUT aria-required="false"  class="TXTro"  disabled="true" type="text"  id="COLUMN_NAME" name="COLUMN_NAME" value="" size="40">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="BLOCK_NAME_DT">Block Name</LABEL>
<INPUT aria-required="false"  class="TXTro"  disabled="true" type="text"  id="BLOCK_NAME_DT" name="BLOCK_NAME" value="" size="40">
</div> 

<div class="DIVText" >
<LABEL class="LBLstd" for="FIELD_NAME_DT">Field Name</LABEL>
<INPUT aria-required="false"  class="TXTro"  disabled="true" type="text"  id="FIELD_NAME_DT" name="FIELD_NAME" value="" size="40">
</div> 
 
</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" > 
 

<div class="DIVText">
<LABEL class="LBLstd" for="DATATYPE_DT">Data Type</LABEL>
<INPUT aria-required="false" class="TXTro" disabled="true" type="text" name="DATATYPE" id="DATATYPE_DT" value="" size="40">
</div> 

<div class="DIVText"  STYLE="display:none"> 
<INPUT aria-required="false"  type="text"  name="RELEASE_NAME" id="RELEASE_NAME" value="" > 
<INPUT aria-required="false"  type="text"  name="RELEASE_TYPE" id="RELEASE_TYPE" value="" >  
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="MAX_LENGTH">Max.Length</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="MAX_LENGTH" name="MAX_LENGTH" onkeypress="return numbersonly(this, event)" value="" size="40">
</div>


<div class="DIVText">
<LABEL class="LBLstd" for="UPLD_TABLE_COLUMN">Upload Table Column</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="UPLD_TABLE_COLUMN" name="UPLD_TABLE_COLUMN" onchange="upper(this);" value="" size="40">
</div>
 
 
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="NOT_REQD_IN_UPLOAD_PKGS">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="NOT_REQD_IN_UPLOAD_PKGS" id="NOT_REQD_IN_UPLOAD_PKGS">Not Required in Upload Tables</LABEL>
</div>
</div>


</fieldset>
<!--End of Form fields column two-->
</div> 
</div> 