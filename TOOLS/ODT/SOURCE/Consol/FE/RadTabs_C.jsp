<!--
  **
  **
  ** File Name  : RadTabs.jsp
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
<span class="Subheader"><h2>Tab Details</h2></span>
<span class="funcbtn">
<BUTTON class="Buttontext" id="tabDepndtFlds" style="WIDTH: 120px; HEIGHT: 20px" name="tabDepndtFlds" onclick="fnCallFrmArgs('DpndtFlds','TAB')">Dependent Fields</BUTTON>&nbsp;
<BUTTON class="func_btn_1"  id="FNADD" name="FNADD" onclick="fnadd('SCR~'+clickedobjects[1]+'~'+clickedobjects[2]+'~'+clickedobjects[3],'1')" title="Add Section"><img src="Images/add1.gif" alt="Add" ></BUTTON>&nbsp;
<BUTTON class="func_btn_1"  id="FNDEL" name="FNDEL" onclick="fnDel('SCR~'+clickedobjects[1]+'~'+clickedobjects[2],'1')" title="Delete Tab"><img src="Images/delete2.gif"   alt="Delete"></BUTTON>&nbsp;
<BUTTON class="func_btn_1"  id="FNRNM" name="FNRNM" onclick="fnRename('SCR~'+clickedobjects[1]+'~'+clickedobjects[2],'1')" title="Rename Tab"><img src="Images/rename.gif"   alt="Rename"></BUTTON>&nbsp;
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo"  onclick="showData('');PopulateDataSourceForSummary('S');"><img src="Images/rollback.gif" alt="Roll Back"></BUTTON>
</span>
</div>
 
  
<div    class="Subcontainer"  TYPE="SINGLE" id="TAB"  name="TAB" >
<!--Form fields column one-->

<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 
  
<div class="DIVText"  >
<LABEL class="LBLstd" for="SCREEN_NAME">Screen Name</LABEL>
<INPUT aria-required="false" class="TXTro" readonly type="text" name="SCREEN_NAME" id="SCREEN_NAME" value="" size="40">
</div> 

<div class="DIVText"  >
<LABEL class="LBLstd" for="TAB_NAME">Tab Name</LABEL>
<INPUT aria-required="false" class="TXTstd" readonly type="text" name="TAB_NAME" id="TAB_NAME" value="" size="40">
</div> 

<div class="DIVText"  >
<LABEL class="LBLstd" for="TAB_LABEL">Tab Label</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="TAB_LABEL" id="TAB_LABEL" value="" size="40">
<BUTTON class="BTNimg"  title="List Of Values" tabindex="-1"  id="BTN_LBLCD" onclick="LOV_LABEL_CODE.show_lov('TAB_LABEL~','frmScrSnm','', 'Label Code', 'Label Code~Label Description', 'Label Code~Label Description',event)">
<span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText" id="TAB_FUNC_ID_DIV">
<LABEL class="LBLstd" for="TAB_FUNC_ID">Function Name</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="TAB_FUNC_ID" id="TAB_FUNC_ID" value="" size="40">
</div> 
 

<div class="DIVText" id="TAB_TYPE_TABS_DIV"> 
<LABEL class="LBLstd" for="TAB_TYPE_TABS">Tab Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="TAB_TYPE" id="TAB_TYPE_TABS" >
	<option Selected="TRUE" value=""></option>
	<option value="DASHBOARD">DashBoard</option>
	<option value="DETAIL">Detail</option>
	<option value="SUBSYSTEM">Subsystem</option>
	<option value="SUMMARY">Summary</option>	
</SELECT>
</div>




</fieldset>
<!--End of Form fields column two-->
</div> 
<!--Form fields column one-->

<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 
 
<div style="display:none"> 
    <INPUT aria-required="false"  type="text"  name="RELEASE_NAME" id="RELEASE_NAME"> 
    <INPUT aria-required="false"  type="text"  name="RELEASE_TYPE" id="RELEASE_TYPE"> 
    <INPUT aria-required="false"  type="text"  id="DEPENDENT_ON" name="DEPENDENT_ON">   
</div>	

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b  id="groupidpymt"></b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="TAB_VISIBLE">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="TAB_VISIBLE" id="TAB_VISIBLE" checked="true" onClick="CheckVisibleVals(this,'TAB')">Visible</LABEL>
</div>
</div>
 
</fieldset>
<!--End of Form fields column two-->
</div>  
</div> 
 
 
