<!--
  **
  **
  ** File Name  : RadDataBlocks.jsp
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
var front='FRONT';
var back='BACK';
//vinit changes for validating dataBlocks
function findselected() {
    var selparentblk = document.getElementById('BLOCK_PARENT_BLK');
    var masterblkField = document.getElementById('MASTER_BLOCK');
	var blkField = document.getElementById('BNM').getElementsByTagName('INPUT')[0]
       if((masterblkField.value == 'Y')&& (selparentblk.value != ""))
	      {
			masterblkField.value= "N";
			selparentblk.value="";	
			alertMessage("Master block cannot have parent",'I');
			//alert("Master block cannot have parent"); 
	      }		
			else if((masterblkField.value == 'N')&& (selparentblk.value != "") && (blkField.value == selparentblk.value)  )
			{
			  selparentblk.value="";	
			  //alert("Parent and Block Name cannot be same");
			  alertMessage("Parent and Block Name cannot be same",'I');
			}		
		   else
		   {
			selparentblk.disabled = false;
		   }
	}
	
</script>


<div class="titlecontainer">
<div class="Subheader"><h2>Block Properties</h2></div>
<div class="funcbtn">
<BUTTON id="bttnAddDataBlockFieldclass" class="func_btn_1" onclick="fnadd('BLK~'+clickedobjects[1],'1')"><img src="Images/add1.gif" alt="Add Field to DataBlock" ></BUTTON>&nbsp;
<BUTTON id="bttnDeleteDataBlock" class="func_btn_1" onclick="fnDel('BLK~'+clickedobjects[1],'1')"><img src="Images/delete2.gif" alt="Delete DataBlock"></BUTTON>&nbsp;
<BUTTON id="bttnRenameDataBlock" class="func_btn_1" onclick="fnRename('BLK~'+clickedobjects[1],'1')" title="Rename DataBlock"><img src="Images/rename.gif" alt="Rename"></BUTTON>&nbsp;
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');PopulateDataSourceForSummary('S');"><img src="Images/rollback.gif" alt="Roll Back" ></BUTTON>
</div>
</div>
 
 

    
<div  class="Subcontainer" name="DBLK" id="DBLK" TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 
<div class="DIVText">
<LABEL class="LBLstd" for="BLOCK_NAME_BL">Block Name</LABEL>
<INPUT aria-required="false"  class="TXTro" readonly type="text"  id="BLOCK_NAME_BL" name="BLOCK_NAME" value="" size="40">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="BLOCK_TITLE">Block Title</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="BLOCK_TITLE" name="BLOCK_TITLE" value="" size="40">
<BUTTON    class="BTNimg"  title="List Of Values" tabindex="-1"  onclick="LOV_LABEL_CODE.show_lov('BLOCK_TITLE~BLK_ANNOTATION~','frmBlkDetls','', 'Label Code', 'Label Code~Label Description', 'Label Code~Label Description',event)">
<span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="BLOCK_PARENT_BLK">Parent</LABEL>
<SELECT aria-required="false" width="200" style="width:200px" class="SELstd" name="BLOCK_PARENT" id="BLOCK_PARENT_BLK" onChange="findselected()"></SELECT> 
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RELATION_TYPE">Relation Type</LABEL>
<SELECT aria-required="false"   class="SELstd" name="RELATION_TYPE" id="RELATION_TYPE"  >
			<option  value="1" selected="1">One To One</option>
            <option value="N">One To Many</option>
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="BLK_PK_FLD">Block PK Fields</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="BLK_PK_FLD" name="BLK_PK_FLD" value="" size="40">
</div>

</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" >

<div class="DIVText">
<LABEL class="LBLstd" for="XSD_NODE">XSD Node</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="XSD_NODE" name="XSD_NODE" value="" size="40">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="BLK_COMMENT_ID">Comment ID</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="BLK_COMMENT_ID" name="BLK_COMMENT_ID" value="" size="40">
<BUTTON  class="BTNimg"  title="List Of Values" tabindex="-1"  id="BTN_COMMENT_ID" onclick="LOV_COMMENT_FLD.show_lov('BLK_COMMENT_ID~','frmScrSnm','', 'Comment ID', 'Comment ID~Comment Description', 'Comment ID~Comment Description',event);">
<span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="MASTER_BLOCK">Master Block</LABEL>
<SELECT aria-required="false"   class="SELstd" name="MASTER_BLOCK" id="MASTER_BLOCK" onChange="findselected()">
	<option value="Y">Yes</option>
    <option selected="N" value="N">No</option>
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="BLK_MULTI_RECORD">Multi Record</LABEL>
<SELECT aria-required="false"   class="SELstd" name="MULTI_RECORD" id="BLK_MULTI_RECORD"   onchange="fnselectall('frmBlkDetls','DBLK_DATASOURCE_NAME');">
<option  value="Y">Yes</option>
<option selected="N" value="N">No</option>
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="BLOCK_TYPE">Block Type</LABEL>
<SELECT aria-required="false"  class="SELstd" name="BLOCK_TYPE" id="BLOCK_TYPE" onchange="fnOnChangeBlkTyp('frmBlkDetls','DBLK_DATASOURCE_NAME')">
	<option value="CONTROL">Control</option>
    <option value="NORMAL" selected="NORMAL">Normal</option>
    <option value="SUMMARY">Summary</option>
</SELECT>
</div> 

<div class="DIVText"  STYLE="display:none">
<INPUT aria-required="false"  type="text" name="RELEASE_TYPE" id="RELEASE_TYPE" value="">	
<INPUT aria-required="false"  type="text"  name="RELEASE_NAME" id="RELEASE_NAME" value="" > 
</div> 

</fieldset>
<!--End of Form fields column two-->
</div> 
</div> 

<div STYLE="WIDTH:95%; clear:left;DISPLAY:BLOCK;padding-top:10px;" ALIGN="CENTER">
	<table role="presentation" summary="" id="blkDsns" NAME="blkDsns"  ALIGN="CENTER"  border="0" cellspacing="0" cellpadding="1" TYPE="BLOCK" PARENT="YES" VIEW="NO">
        <tbody>
			<tr>
            <td scope="col" class="thheaderlast" style="border:1px solid #a2c2e5;" align="center">Datasource Available</td>
            <td scope="col" align="center">&nbsp;</td>
            <td scope="col" class="thheaderlast" style="border:1px solid #a2c2e5;" align="center">Datasource Added</td>
        </tr>
	    <tr>
                <td align="center" style="border:1px solid #a2c2e5; background:#ffffff;"><SELECT aria-required="false" style="height:180px;width:260px;border:1px solid #CCCCCC" size="15" title="Datasource Available" name="DATASOURCE_NAME" id="DATASOURCE_NAME"></SELECT></td>
                <td width="15px" align="center">
                    <BUTTON title="Add" class="BUTTONInline" name="ADD1" onclick="DataSrcDtls();"><img src="Images/Last2.gif" alt="Add Datasource"></BUTTON>
                    <br>
                    <BUTTON title="Remove" class="BUTTONInline" name="DEL" onclick="MoveToFieldset('frmBlkDetls','DBLK_DATASOURCE_NAME','blkDsns');"  value="DEL"><img src="Images/First2.gif" alt="Remove Datasource"></BUTTON>
                </td>
                <td align="center" style="border:1px solid #a2c2e5; background:#ffffff;">
                    <SELECT aria-required="false" style="height:180px;width:260px; border:1px solid #CCCCCC"   size="15" title="Datasource Added" name="DBLK_DATASOURCE_NAME" id="DBLK_DATASOURCE_NAME"></SELECT>
                </td>
	    </tr> 
		</tbody>
		<tfoot><tr><td scope="row" id="blkDsns_TE" NAME="blkDsns_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
	</table>
</div>