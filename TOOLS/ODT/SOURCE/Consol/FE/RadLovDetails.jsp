<!--
  **
  **
  ** File Name  : RadLovDetails.jsp
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
<span class="Subheader"><h2>List Of Values Details</h2></span>
<span class="funcbtn">
<BUTTON class="Buttontext" id="datatype_col" name="datatype_col" onclick="fnPopulateLOVdataype()">Refresh</BUTTON>&nbsp;
<BUTTON class="func_btn_1"  id="FNDEL" name="FNDEL" onclick="fnDel('LOV~'+clickedobjects[1],'1')"><img src="Images/delete2.gif" alt="Delete Lov" ></BUTTON>&nbsp;
<BUTTON class="func_btn_1"  id="FNRNM" name="FNRNM" onclick="fnRename('LOV~'+clickedobjects[1],'1')"><img src="Images/rename.gif" alt="Rename Lov"></BUTTON>&nbsp;
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');PopulateDataSourceForSummary('S');"><img src="Images/rollback.gif" alt="Roll Back" >
</BUTTON>
</span>
</div>
 
 

<div    class="Subcontainer"  id="LOVMAIN" NAME="LOVMAIN" TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:100%">
<fieldset class="FSTcell"> 

<div class="DIVText">
<LABEL class="LBLstd star" for="LOV_NAME_QUERY_LOVDTLS">LOV Name</LABEL>
<INPUT aria-required="true" class="TXTro" readonly type="text" name="LOV_NAME_QUERY" id="LOV_NAME_QUERY_LOVDTLS" value="" size="40">
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="LOV_QUERY_LOVDTS">LOV Query</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="LOV_QUERY" id="LOV_QUERY_LOVDTS" value="" size="130">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('LOVMAIN','LOV_QUERY_LOVDTS','',event)">
<span class="ICOnarrative"></span></BUTTON> 
</div> 


<div class="DIVText">
<LABEL class="LBLstd" for="MULTI_RECORD_DSR">LOV Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="LOV_STATUS" id="LOV_STATUS_LOVDTLS" onchange="fnCombinedButton();">
<option selected="Y" value="I">Internal</option>
<option value="E">External</option>
<option value="C">Combined</option>
</SELECT>
<BUTTON class="BTNimg" title="Populate" onclick="fn_Mapping();" name="POPLT_CMBD" id="POPLT_CMBD" value="POPLT_CMBD" style="height:25px;width :150px;">Combined Details</BUTTON> 
       
</div>  

<div class="DIVText" style="display:none">
<INPUT aria-required="false" type="text"    class="TXTstd" name="EXTERNAL_LOV_NAME" id="EXTERNAL_LOV_NAME_LOVDTLS"  />
<INPUT aria-required="false" type="text"    class="TXTstd" name="LOV_FUNC_NAME" id="LOV_FUNC_NAME_LOVDTLS"  />
<INPUT aria-required="false"  type="text" name="NO_DATA_FRM_EXT_SYS_PREF" id="NO_DATA_FRM_EXT_SYS_PREF_LOVDTLS" value="" >
<INPUT aria-required="false"  type="text" name="LOV_ID_OTHER" id="LOV_ID_OTHER_LOVDTLS" value="" >
<INPUT aria-required="false"  type="text" name="COMBINED_DTLS" id="COMBINED_DTLS_LOVDTLS" value="" >
<INPUT aria-required="false"  type="text" name="COMBINED_QUERY_DTLS" id="COMBINED_QUERY_DTLS_LOVDTLS" value="" >
<INPUT aria-required="false"  type="text"  name="RELEASE_NAME" id="RELEASE_NAME" value="" > 
<INPUT aria-required="false"  type="text"  name="RELEASE_TYPE" id="RELEASE_TYPE" value="" > 

</div>

</fieldset>
</div>
<!--End of Form fields column one-->
 
</div>  
 
 
<div class="DIVMultipleBig" style="position:relative; margin-left:20px; margin-right:20px; width:AUTO;" id="dataContainer_BLK_CONTRACT_MULTITNR" name="dataContainer" >
		<div class="MEButtons" id="lovDetails_ME" name="lovDetails_ME"  >
			<BUTTON id="LOV_POPULATE" name="LOV_POPULATE" style="height:25px;width :100px;" onclick="fnPopulateQueryCols(document.getElementById('LOV_QUERY_LOVDTS').value,document.getElementById('LOV_NAME_QUERY_LOVDTLS').value)" class="BTNimg">Populate</BUTTON>
		</div>
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner"   >
			<table  onKeyDown="FnAcessTblkeys(this,event);"  id="lovDetails" name="lovDetails" summary="Multi Tenor" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('lovDetails','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Query Columns</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Data Type</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Visible</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Reduction Field</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Reduction Field Type</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Reduction/Column Label</span></th>
					
					<!--VINIT CHANGES -->
					<th scope="col" class="THgrid"><span class="SPNtext">Is Mandatory</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Min No. of Search Characters</span></th>  
					<!--VINIT CHANGES ENDS -->					
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="lovDetails_TE" name="lovDetails_TE" colspan="10"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div> 

  
        