<!--
  **
  **
  ** File Name  : RadGIHeader.jsp
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
  
  SFR Number              :  
  Changed By                :  
  Change Description :  
 
-->

<div class="titlecontainer">
<span class="Subheader"><h2>Header</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');"><img src="Images/rollback.gif" alt="Roll Back"></BUTTON>
</span>
</div> 

<div   class="Subcontainer" name="actheader" id="actheader"  TYPE="SINGLE" VIEW="NO">

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText">
<LABEL class="LBLstd" for="H_SECTION_TYPE">Section Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="SECTION_TYPE" id="H_SECTION_TYPE" >
		<option value="SC_FXL">Fixed Length</option>
        <option value="SC_FNL">Fixed no. of Lines</option>
        <option value="SC_TDL">Tag Delimiter</option>
</SELECT>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="H_NO_OF_LINES">No. Of Lines</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="H_NO_OF_LINES" name="NO_OF_LINES" value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="H_ST_TAG">Start Tag</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="H_ST_TAG" name="ST_TAG" value="" size="30">
</div> 
  
</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" >
 
<div class="DIVText" >
<LABEL class="LBLstd" for="H_LENGTH">Length</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="H_LENGTH" name="LENGTH" value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="H_END_TAG">End Tag</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="H_END_TAG" name="END_TAG" value="" size="30">
</div> 

</fieldset>
<!--End of Form fields column two-->
</div> 
</div>