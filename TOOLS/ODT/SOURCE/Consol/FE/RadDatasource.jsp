<!--
  **
  **
  ** File Name  : RadDatasource.jsp
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


 
 

<script>
//vinit changes for validating master
function findselectedDs() {
    var selparentDs = document.getElementById('PARENT_DATASRC_DSN');
    var masterDsField = document.getElementById('MASTER_DATASRC');
	var dsField = document.getElementById('DBT').getElementsByTagName('INPUT')[0]
       if((masterDsField.value == 'Y')&& (selparentDs.value != ""))
	      {
			masterDsField.value= "N";
			selparentDs.value="";	
			alertMessage("Master DataSource cannot have parent",'I');
			//alert("Master block cannot have parent"); 
	      }		
			else if((masterDsField.value == 'N')&& (selparentDs.value != "") && (dsField.value == selparentDs.value)  )
			{
			  selparentDs.value="";	
			  //alert("Parent and Block Name cannot be same");
			  alertMessage("DataSource Name and Parent cannot be same",'I');
			}		
		   else
		   {
			selparentDs.disabled = false;
		   }
	}
</script>

<div class="titlecontainer" id="DTSRCDTLS" name="DTSRCDTLS">
<span class="Subheader"><h2>Data Source Details</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1"  id="FNADD" name="FNADD" onclick="fnadd('DSN~'+clickedobjects[1],'1')"><img src="Images/add1.gif" alt="Add DB Field" ></BUTTON>&nbsp;
<BUTTON class="func_btn_1"  id="FNDEL" name="FNDEL" onclick="fnDel('DSN~'+clickedobjects[1],'1')"><img src="Images/delete2.gif" alt="Delete DataSource"></BUTTON>&nbsp;
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');PopulateDataSourceForSummary('S');">
<img src="Images/rollback.gif" alt="Roll Back" >
</BUTTON>
</span>
</div>

<div   class="Subcontainer" name="DSRC" id="DSRC"  TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText" >
<LABEL class="LBLstd" for="DATASRC_NAME">Data Source</LABEL>
<INPUT aria-required="false"  class="TXTro" readonly type="text"  id="DATASRC_NAME_DN" name="DATASRC_NAME" value="" onchange="upper(this);" size="40">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="MASTER_DATASRC">Master</LABEL>
<SELECT aria-required="false"  class="SELstd" name="MASTER_DATASRC" id="MASTER_DATASRC" onChange="findselectedDs()">
<option value="Y">Yes</option>
<option selected="N" value="N">No</option>
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RELATION_TYPE_DSR">Relation Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="RELATION_TYPE" id="RELATION_TYPE_DSR"   onChange="SetMultirec()">
<option selected="true" value="1">One To One</option>
<option value="N">One To Many</option>
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="MULTI_RECORD_DSR">Multi Record</LABEL>
<SELECT aria-required="false"  class="SELstd" name="MULTI_RECORD" id="MULTI_RECORD_DSR">
<option selected="Y" value="Y">Yes</option>
<option value="N">No</option>
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd star" for="PK_COLS">PK Cols</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" name="PK_COLS" id="PK_COLS" onchange="upper(this);" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1"  id="POP_PK_COLS" name="POP_PK_COLS" onclick="popupedit('DSRC','PK_COLS','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd star" for="PK_TYPES">PK Types</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" name="PK_TYPES" id="PK_TYPES" onchange="upper(this);" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1"  id="POP_PK_TYPES" name="POP_PK_TYPES" onclick="popupedit('DSRC','PK_TYPES','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="UPLOAD_TABLE">Upload Table</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" name="UPLOAD_TABLE" id="DS_UPLOAD_TABLE" onchange="upper(this);FnUpTbl_pkcols()" value="" size="40"> 
<BUTTON class="BTNfooter" title="Upload Table Columns" tabindex="-1"  id="POP_UPLOAD_TABLE" name="POP_UPLOAD_TABLE" onclick="fNUpload_tblclm()"></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="UP_TBL_WHERE_CLAUSE">Upload Where Clause</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" name="UP_TBL_WHERE_CLAUSE" id="UP_TBL_WHERE_CLAUSE" onchange="upper(this);" value="" size="40"> 
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1"  id="POP_WC_TYPES" name="POP_WC_TYPES" onclick="popupedit('DSRC','UP_TBL_WHERE_CLAUSE','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div>

</fieldset>

<fieldset class="FSTstd"> 
<legend>Fine Grained Service Details Only</legend>

<div class="DIVText" >
<LABEL class="LBLstd" for="REST_BLK_NAME">Rest Data Block</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="REST_BLK_NAME" name="REST_BLK_NAME" value="" onchange="upper(this);" size="40">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="REST_XSD_NODE">XSD Node</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="REST_XSD_NODE" name="REST_XSD_NODE" value="" size="40">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="REST_RELATION_WITH_PARENT">Rest Relation</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="REST_RELATION_WITH_PARENT" id="REST_RELATION_WITH_PARENT" onchange="upper(this);" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('DSRC','REST_RELATION_WITH_PARENT','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="REST_RELATION_TYPE_DSR">Rest Relation Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="REST_RELATION_TYPE" id="REST_ELATION_TYPE_DSR"   onChange="SetMultirec()">
<option selected="true" value="1">One To One</option>
<option value="N">One To Many</option>
</SELECT>
</div>

<!-- 
<div class="DIVText">
<LABEL class="LBLstd" for="MULTI_RECORD_DSR">Multi Record</LABEL>
<SELECT aria-required="false"  class="SELstd" name="MULTI_RECORD" id="MULTI_RECORD_DSR">
<option selected="Y" value="Y">Yes</option>
<option value="N">No</option>
</SELECT>
</div>  -->

<div class="DIVText">
<LABEL class="LBLstd star" for="REST_PK_COLS">Rest PK Cols</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="REST_PK_COLS" id="REST_PK_COLS" onchange="upper(this);" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1"  id="REST_POP_PK_COLS" name="REST_POP_PK_COLS" onclick="popupedit('DSRC','REST_PK_COLS','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd star" for="REST_PK_TYPES">Rest PK Types</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="REST_PK_TYPES" id="REST_PK_TYPES" onchange="upper(this);" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1"  id="REST_POP_PK_TYPES" name="REST_POP_PK_TYPES" onclick="popupedit('DSRC','REST_PK_TYPES','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div> 

</fieldset>

</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" > 
<div class="DIVText" >
<LABEL class="LBLstd" for="PARENT_DATASRC_DSN">Parent</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" name="PARENT_DATASRC" id="PARENT_DATASRC_DSN" value="" onChange="findselectedDs()" ></SELECT> 
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="RELATION_WITH_PARENT">Relation</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RELATION_WITH_PARENT" id="RELATION_WITH_PARENT" onchange="upper(this);" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('DSRC','RELATION_WITH_PARENT','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="DEFAULT_WHERE">Where Clause</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="DEFAULT_WHERE" id="DEFAULT_WHERE" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('DSRC','DEFAULT_WHERE','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div>
 
<div class="DIVText">
<LABEL class="LBLstd" for="DEFAULT_ORDER_BY">Default Order By</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="DEFAULT_ORDER_BY" id="DEFAULT_ORDER_BY" onchange="upper(this);" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('DSRC','DEFAULT_ORDER_BY','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div> 
   

<div class="DIVText">
<LABEL class="LBLstd" for="DATASRC_TYPE">Type</LABEL>
<SELECT aria-required="false"   class="SELstd" name="DATASRC_TYPE" id="DATASRC_TYPE">
	<option selected="NORMAL" value="NORMAL">Normal</option>
    <option value="QUERY">Query</option>
    <option value="INONLY">InOnly</option>
    <option value="SUMMARY">Summary</option>
</SELECT>
</div>			
 
<div class="DIVText"  STYLE="display:none">
<INPUT aria-required="false"  type="text" name="DATASRC_ALIAS" id="DATASRC_ALIAS" value="">	
<INPUT aria-required="false"  type="text"  name="RELEASE_NAME" id="RELEASE_NAME" value="" > 
<INPUT aria-required="false"  type="text"  name="RELEASE_TYPE" id="RELEASE_TYPE" value="" > 
<INPUT aria-required="false"  type=checkbox name="CHILD_DATASRC" id="CHILD_DATASRC" checked="false">
<INPUT aria-required="false"  type="text" name="UP_TBL_PK_COLS" id="DS_UP_TBL_PK_COLS"  value="" > 
</div> 

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="IS_MANDATORY">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="IS_MANDATORY" id="IS_MANDATORY">Mandatory</LABEL>
</div>
</div> 

</fieldset>
<!--End of Form fields column two-->
</div> 

</div> 