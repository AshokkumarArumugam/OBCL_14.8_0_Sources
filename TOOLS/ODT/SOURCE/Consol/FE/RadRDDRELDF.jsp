<div id="RDDRELDF"  style="display:none;" scrSize = "M" scrTitle = "Release Master" >
<div  id="RDTM_RELEASE_MASTER"   name="RDTM_RELEASE_MASTER" DBT="RDTM_RELEASE_MASTER"  TYPE="SINGLE" PARENT="NO" VIEW="NO">
<!--Form fields column one-->
<div class="DIVColumnOne" style="width:auto;">
<fieldset class="FSTstd" >
<legend>Release Detailed</legend>
<div class="DIVText">
<LABEL class="LBLstd star" for="RDTM_RELEASE_MASTER.RELEASE_CODE">Release Code</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" name="RDTM_RELEASE_MASTER.RELEASE_CODE" id="RDTM_RELEASE_MASTER.RELEASE_CODE" DBC="RELEASE_CODE" size="40">
<BUTTON  class="BTNimg" title="List Of Values" tabindex="-1" style ="visibility:hidden" id="BTN_REL_CODE"  onclick="LOV_REL_CODE.show_lov('RDTM_RELEASE_MASTER.RELEASE_CODE~','frmTCM','', 'Release Code', 'Release Code', 'Release Code',event)" enabled>
<span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_RELEASE_MASTER.RELEASE_DESC">Description</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text"  name="RDTM_RELEASE_MASTER.RELEASE_DESC" id="RDTM_RELEASE_MASTER.RELEASE_DESC" DBC="RELEASE_DESC" size="40">
</div>
 
<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_RELEASE_MASTER.RELEASE_TYPE">Release Type</LABEL>
<SELECT aria-required="false" name="RDTM_RELEASE_MASTER.RELEASE_TYPE" id="RDTM_RELEASE_MASTER.RELEASE_TYPE" DBC="RELEASE_TYPE" disabled="true">
<option value="KERNEL">Kernel</option>
<option value="CLUSTER">Cluster</option><option value="CUSTOM">Custom</option>
</SELECT>
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_RELEASE_MASTER.BASE_RELEASE">Base Release</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_RELEASE_MASTER.BASE_RELEASE" id="RDTM_RELEASE_MASTER.BASE_RELEASE" DBC="BASE_RELEASE" size="40">
<BUTTON  class="BTNimg" title="List Of Values" tabindex="-1" style ="visibility:hidden" id="BTN_BASE_REL"  onclick="LOV_REL_CODE.show_lov('RDTM_RELEASE_MASTER.BASE_RELEASE~','frmTCM','', 'Release Code', 'Release Code', 'Release Code',event)">
<span class="ICOlov"></span></BUTTON>
</div>
 
<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_RELEASE_MASTER.RELEASE_ENV_CODE">Environment</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_RELEASE_MASTER.RELEASE_ENV_CODE" id="RDTM_RELEASE_MASTER.RELEASE_ENV_CODE" DBC="RELEASE_ENV_CODE" size="40">
</div>
 
<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_RELEASE_MASTER.REMARKS">Remarks</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_RELEASE_MASTER.REMARKS" id="RDTM_RELEASE_MASTER.REMARKS" DBC="REMARKS" size="40">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_RELEASE_MASTER.RELEASESPC">Release SPC</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_RELEASE_MASTER.RELEASESPC" id="RDTM_RELEASE_MASTER.RELEASESPC" DBC="RELEASESPC" size="40" maxlength="50">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_RELEASE_MASTER.STREAM_NAME">Stream Name</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_RELEASE_MASTER.STREAM_NAME" id="RDTM_RELEASE_MASTER.STREAM_NAME" DBC="STREAM_NAME" size="40">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_RELEASE_MASTER.CLUSTER_NAME">Cluster Name</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_RELEASE_MASTER.CLUSTER_NAME" id="RDTM_RELEASE_MASTER.CLUSTER_NAME" DBC="CLUSTER_NAME" size="40">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_RELEASE_MASTER.CUSTOM_NAME">Custom Name</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_RELEASE_MASTER.CUSTOM_NAME" id="RDTM_RELEASE_MASTER.CUSTOM_NAME" DBC="CUSTOM_NAME" size="40">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_RELEASE_MASTER.RELEASE_STAGE">Release Stage</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_RELEASE_MASTER.RELEASE_STAGE" id="RDTM_RELEASE_MASTER.RELEASE_STAGE" DBC="RELEASE_STAGE" size="40">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_RELEASE_MASTER.APPLICATION_NAME">Application Name</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_RELEASE_MASTER.APPLICATION_NAME" id="RDTM_RELEASE_MASTER.APPLICATION_NAME" DBC="APPLICATION_NAME" size="40">
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b><div class="DIVchkrad">
<LABEL id="DATA_MIGRATION_REQD" for="RDTM_RELEASE_MASTER.DATA_MIGRATION_REQD">
<INPUT aria-required="false" class="CHKstd" type="checkbox" name="RDTM_RELEASE_MASTER.DATA_MIGRATION_REQD" id="RDTM_RELEASE_MASTER.DATA_MIGRATION_REQD" DBC="DATA_MIGRATION_REQD" >Migrate Test Case Data From Base Release</LABEL>
</div>
</div>

<div class="DIVText" style="display:none"> 
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_RELEASE_MASTER.CUSTOMER_NAME" id="RDTM_RELEASE_MASTER.CUSTOMER_NAME" DBC="CUSTOMER_NAME">
</div>

</fieldset>
</div>
</div>  

<div style="margin-left:50px; margin-right:75px; width:700px; background-color:#e6f2f4; clear:both;border:1px solid #557176;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="1" border="0" name="RDTM_RELEASE_MASTER_1" id="RDTM_RELEASE_MASTER_1">
<tbody>
<tr>
<td align="right"><LABEL for="RDTM_RELEASE_MASTER.MOD_NO">Modification Number</LABEL></td>
<td><INPUT aria-required="false" dbc="MOD_NO" name="RDTM_RELEASE_MASTER.MOD_NO" id="RDTM_RELEASE_MASTER.MOD_NO" readonly="readonly"></td> 
<td align="right"><LABEL for="RDTM_RELEASE_MASTER.RELEASE_STATUS">Release Status</LABEL></td>
<td><SELECT aria-required="false" readonly="readonly" name="RDTM_RELEASE_MASTER.RELEASE_STATUS" id="RDTM_RELEASE_MASTER.RELEASE_STATUS" DBC="RELEASE_STATUS" disabled="true"><option value="O">Open</option><option value="C">Closed</option></SELECT></td>
</tr>
<tr>
<td align="right"><LABEL for="RDTM_RELEASE_MASTER.MAKER_ID">Maker Id</LABEL></td>
<td><INPUT aria-required="false" dbc="MAKER_ID" name="RDTM_RELEASE_MASTER.MAKER_ID" id="RDTM_RELEASE_MASTER.MAKER_ID" readonly="readonly"></td>
<td align="right"><LABEL for="RDTM_RELEASE_MASTER.MAKER_DT_STAMP">Maker Date Stamp</LABEL></td>
<td><INPUT aria-required="false" dbc="MAKER_DT_STAMP" name="RDTM_RELEASE_MASTER.MAKER_DT_STAMP" id="RDTM_RELEASE_MASTER.MAKER_DT_STAMP" readonly="readonly"></td>
</tr> 
</tbody>
</table>
</div> 
</div>

<div id="RDSRELDF" style="display:none;" scrSize = "M" scrTitle = "Release Master Summary">
<!--Form fields column one-->
<div class="DIVColumnOne" style="width:auto; height:auto">
<fieldset class="FSTcell">
<legend>Release Detailed</legend>

<div class="DIVText">
<LABEL  id="ENVCODE" for="RDTM_RELEASE_MASTER.RELEASE_CODE_1" class="LBLstd">Release Code</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="RDTM_RELEASE_MASTER.RELEASE_CODE_1" value="" onchange="upper(this)" DBC="RELEASE_CODE" name="RDTM_RELEASE_MASTER.RELEASE_CODE_1" dbcol="RELEASE_CODE" enabled>
<BUTTON  title="List Of Values" tabindex="-1" id="" title="List Of Values" tabindex="-1" id=""  onclick="LOV_REL_CODE.show_lov('RDTM_RELEASE_MASTER.RELEASE_CODE_1~','frmTCM','', 'Release Code', 'Release Code', 'Release Code',event)" enabled  class="BTNimg">
<span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL  id="DESC" for="RDTM_RELEASE_MASTER.RELEASE_DESC_1"  class="LBLstd">Description</LABEL>
<INPUT aria-required="false"  class="TXTstd" id="RDTM_RELEASE_MASTER.RELEASE_DESC_1" onchange="upper(this)" name="" enabled dbcol="RELEASE_DESC">
</div>
 

</fieldset>
</div>
<!--Form fields column two-->       
<div id="SummButtons" style="margin-left:600px;padding-top:10px;">            
                    <BUTTON class="BTNfooter"  style="height:25px;width :60px;"  id="INFRA_SEARCH" NAME="INFRA_SEARCH"  OnClick="fnExecuteQuery()">Search</BUTTON>
                    <BUTTON class="BTNfooter"  style="height:25px;width :60px;"  ID="INFRA_RESET" NAME="INFRA_RESET" OnClick="fnSumreset('RDSRELDF_SUMMARY_RESULT')">Reset</BUTTON>
</div>

<div class="DIVMultipleBig" style="clear:both; margin-top:20px; margin-bottom:20px; margin-left:50px; margin-right:75px; width:auto">
		<div class="MEButtons" id="RDSRELDF_SUMMARY_RESULT_ME" name="RDSRELDF_SUMMARY_RESULT_ME">
			<BUTTON disabled CLASS="BTNfooter" name="navFirst" id ="navFirst" onclick="doNavigate1(gcNAV_FIRST)" ><sup tabindex="-1">&lt;&lt;</sup></BUTTON>
			<BUTTON disabled CLASS="BTNfooter" name="navPrev" id ="navPrev"   onclick="doNavigate1(gcNAV_PREVIOUS)" ><sup tabindex="-1">&lt;</sup></BUTTON>
			<BUTTON  CLASS="BTNfooter"><span id="pagesflow"><sup>0 of 0</sup></span></BUTTON> 
			<BUTTON disabled CLASS="BTNfooter" name="navNext" id ="navNext" onclick="doNavigate1(gcNAV_NEXT)" ><sup tabindex="-1">&gt;</sup></BUTTON>
			<BUTTON disabled CLASS="BTNfooter" name="navLast" id ="navLast" onclick="doNavigate1(gcNAV_LAST)"><sup tabindex="-1">&gt;&gt;</sup></BUTTON>
		</div>
	<div class="DIVmultiplebox" >
	<div class="DIVMultipleBigInner" style="width:725PX; height:300px;">
		<table id="RDSRELDF_SUMMARY_RESULT" name="RDSRELDF_SUMMARY_RESULT" onKeyDown="FnAcessTblkeys(this,event);" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO"  class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
       <thead>
        <TR>
			<TH scope="col"class="THgrid1"><span class="LBLinv">Select All Rows</span><INPUT aria-required="false" id="SEL_ALL" value="" title="Select All Rows" type="checkbox" name="SEL_ALL"></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Release Code</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Description</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Release Type</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Release Number</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Base Release</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Environment</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Release Status</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Remarks</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Release Spc</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Stream Name</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Cluster Name</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Custom Name</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Release Stage</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Application Name</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Migration required</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Modification Number</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Maker ID</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Maker Date Stamp</span></TH>
		</TR>
       </thead>
       <tbody></tbody>
       <tfoot><tr><td id="RDSRELDF_SUMMARY_RESULT_TE" name="RDSRELDF_SUMMARY_RESULT_TE" style="border:NONE;" scope="row" tabindex="0" colspan="19"><span class="LBLinv" >End of table</span>&nbsp;</td></tr></tfoot>
   </table>
  </div>
 </div>
</div>
</div>