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
<LABEL class="LBLstd" for="MAX_LINE_SIZE">Maximum Line size</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="MAX_LINE_SIZE" name="MAX_LINE_SIZE" onchange="numberval(this)" value="" size="30">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="FORMAT_DESCRIPTION">Format Description</LABEL>
<INPUT aria-required="false"  class="TXTstd"  type="text"  id="FORMAT_DESCRIPTION" name="FORMAT_DESCRIPTION" onchange="upper(this)" value="" size="30">
</div> 
  
</fieldset>
</div>
<!--End of Form fields column one--> 
</div>