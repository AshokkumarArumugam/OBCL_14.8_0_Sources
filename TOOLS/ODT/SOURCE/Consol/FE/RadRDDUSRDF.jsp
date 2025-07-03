<div id="RDDUSRDF" style="display:none;padding-top:10px;margin-left:10px" scrSize = "M" scrTitle = "User Definition"> 
<div  id="RDTM_USERS"   name="RDTM_USERS" DBT="RDTM_USERS"  TYPE="SINGLE" PARENT="NO" VIEW="NO">
<!--Form fields column one-->
<div class="DIVColumnOne">
<fieldset class="FSTstd">
<legend>User Details</legend>
<div class="DIVText">
<LABEL for="RDTM_USERS.USER_ID" class="LBLstd star">User ID</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" name="RDTM_USERS.USER_ID" id="RDTM_USERS.USER_ID" DBC="USER_ID" onchange="upper(this)">
<BUTTON   class="BTNimg"   title="List Of Values" tabindex="-1" style ="visibility:hidden" id="USERID" onclick="LOV_USER_ID.show_lov('RDTM_USERS.USER_ID~','form1','', 'User Id', 'User Id', 'User Id',event)" enabled>
<span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd"  for="RDTM_USERS.USER_NAME">User Name</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text"  name="RDTM_USERS.USER_NAME" id="RDTM_USERS.USER_NAME" DBC="USER_NAME" >
</div>

<div class="DIVText">
<LABEL class="LBLstd"  for="RDTM_USERS.USER_PASSWORD">User Password</LABEL>
<INPUT aria-required="false" class="TXTstd" type="password"  name="RDTM_USERS.USER_PASSWORD" id="RDTM_USERS.USER_PASSWORD" DBC="USER_PASSWORD" value="" onchange="fnPasswordValidate(this)" >
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_USERS.DEFAULT_RELEASE">Default Release</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text"  name="RDTM_USERS.DEFAULT_RELEASE" id="RDTM_USERS.DEFAULT_RELEASE" DBC="DEFAULT_RELEASE" >
<BUTTON   class="BTNimg"  title="List Of Values" tabindex="-1"  style ="visibility:hidden" id="BTN_DEF_REL" onclick="LOV_REL_CODE.show_lov('RDTM_USERS.DEFAULT_RELEASE~','form1','', 'Release Code', 'Release Code', 'Release Code',event)" >
<span class="ICOlov"></span></BUTTON>
</div>
 
<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_USERS.DEFAULT_ENV">Default Environment</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text"  name="RDTM_USERS.DEFAULT_ENV" id="RDTM_USERS.DEFAULT_ENV" DBC="DEFAULT_ENV" >
<BUTTON  class="BTNimg"   title="List Of Values" tabindex="-1"  style ="visibility:hidden" id="BTN_DEF_ENV" onclick="LOV_ENV_CODE.show_lov('RDTM_USERS.DEFAULT_ENV~','form1','RDTM_USERS.DEFAULT_RELEASE', 'Environment', 'Environment Code', 'Environment Code',event)" >
<span class="ICOlov"></span></BUTTON>
</div>

</fieldset>
</div>

<div class="DIVColumnOne">
<fieldset class="FSTstd" style="border:none ">
<legend></legend>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_USERS.SAVEFORMAT">Save Format</LABEL> 
<SELECT aria-required="false"  disabled="true" name="RDTM_USERS.SAVEFORMAT" id="RDTM_USERS.SAVEFORMAT" DBC="SAVEFORMAT"> 
<option value="ZIP">Zip</option>
<option value="SHARE">Server path</option> 
</SELECT> 
</div> 
 
<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_USERS.WORK_DIRECTORY">Work Directory</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text"  name="RDTM_USERS.WORK_DIRECTORY" id="RDTM_USERS.WORK_DIRECTORY" DBC="WORK_DIRECTORY" >
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_USERS.XLFORMAT">Excel format</LABEL> 
<SELECT aria-required="false" disabled="true"  name="RDTM_USERS.XLFORMAT" id="RDTM_USERS.XLFORMAT" DBC="XLFORMAT"> 
<option value="XLS">XLS</option>
<option value="XLSX">XLSX</option> 
</SELECT> 
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="RDTM_USERS.XMLFORMAT">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="RDTM_USERS.XMLFORMAT" id="RDTM_USERS.XMLFORMAT" DBC="XMLFORMAT">XML Formatting</LABEL>
</div>
</div>

<div class="DIVCheck"  role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad"  >
<LABEL class="LBLauto"  for="RDTM_USERS.LDAP_AUTH">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="RDTM_USERS.LDAP_AUTH" id="RDTM_USERS.LDAP_AUTH" DBC="LDAP_AUTH">LDAP Authentication</LABEL>
</div>
</div>

<div class="DIVText" style="display:none">
<LABEL class="LBLstd" for="RDTM_USERS.USER_STATUS">Excel format</LABEL> 
<SELECT aria-required="false" disabled="true" name="RDTM_USERS.USER_STATUS" id="RDTM_USERS.USER_STATUS" DBC="USER_STATUS"> 
<option value="E">Enabled</option>
<option value="D">Disabled</option> 
</SELECT> 
</div>

<div class="DIVText" style="display:none"> 
<LABEL class="LBLstd"  for="RDTM_USERS.SALT">SALT</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text"  name="RDTM_USERS.SALT" id="RDTM_USERS.SALT" DBC="SALT" >
</div>
 
</fieldset>
</div>
</div>

<div class="DIVMultipleBig" style="clear:both; margin-top:20px; margin-bottom:20px; margin-left:50px; margin-right:75px; width:auto">
	<div class="MEButtons" id="RDTM_USER_RELEASES_ME" name="RDTM_USER_RELEASES_ME">
            <BUTTON title="Add Row"  id="RDD" name="RDD" onclick= "addNewRow1('RDTM_USER_RELEASES',true);updateAdmnDOM('RDTM_USER_RELEASES','RDTM_USER_RELEASES');" class="BTNimg"><span class="ICOadd" tabindex="-1"><span class="LBLinv">Add Row</span></span></BUTTON>
			<BUTTON title="Delete Row"  id="DEL" name="DEL" onclick="delRow1('RDTM_USER_RELEASES')" class="BTNimg"><span class="ICOremove" tabindex="-1"><span class="LBLinv">Delete Row</span></span></BUTTON>
	</div>
	<div class="DIVmultiplebox" >
	<div class="DIVMultipleBigInner" style="width:700px; height:200px;">
	<table style="width:660px" onKeyDown="FnAcessTblkeys(this,event);" id="RDTM_USER_RELEASES" name="RDTM_USER_RELEASES" DBT="RDTM_USER_RELEASES" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO"  class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
       <thead>
        <tr>
					<TH class="THgrid1" scope="col" ><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL" name="SEL_ALL" class="CHKstd" type="checkbox" onclick="checkAll('RDTM_USER_RELEASES','checkgroup','SEL_ALL')"><span class="LBLinv">Select All Rows</span></TH>
                    <TH class="THgrid1" scope="col"><span class="SPNtext">Release Code</span></TH>
                    <TH class="THgrid1" scope="col"><span class="SPNtext">User Role</span></TH>
        </tr>
       </thead>
       <tbody></tbody>
       <tfoot><tr><td id="RDTM_USER_RELEASES_TE" name="RDTM_USER_RELEASES_TE" scope="row" tabindex="0" colspan="4"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
   </table>
  </div>
 </div>
</div>

<div style="margin-left:50px;margin-right:75px; width:700px; background-color:#e6f2f4; clear:both;border:1px solid #a2c2e5;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="1" border="0" name="RDTM_USERS_1" id="RDTM_USERS_1"> 
<tbody>
<tr>
<td align="right"><LABEL for="RDTM_USERS.MOD_NO">Modification Number</LABEL></td>
<td><INPUT aria-required="false" dbc="MOD_NO" name="RDTM_USERS.MOD_NO" id="RDTM_USERS.MOD_NO" readonly="readonly"> 
</td><td align="right"><LABEL for="RDTM_USERS.MAKER_ID">Maker Id</LABEL></td>
<td><INPUT aria-required="false" dbc="MAKER_ID" name="RDTM_USERS.MAKER_ID" id="RDTM_USERS.MAKER_ID" readonly="readonly"></td>
<td align="right"><LABEL for="RDTM_USERS.MAKER_DT_STAMP">Maker Date Stamp</LABEL></td>
<td><INPUT aria-required="false" dbc="MAKER_DT_STAMP" name="RDTM_USERS.MAKER_DT_STAMP" id="RDTM_USERS.MAKER_DT_STAMP" readonly="readonly"></td>
</tr> 
</tbody>
</table>
</div> 
</div> 

<div id="RDSUSRDF" style="display:none;padding-top:10px" scrSize = "M" scrTitle = "User Summary">
    <!--Form fields column one-->
<div class="DIVColumnOne">
<fieldset class="FSTcell">
<legend>User Summary</legend>

<div class="DIVText">
<LABEL  id="ENVCODE" for="RDTM_USERS.USER_ID_1" class="LBLstd star">User ID</LABEL>
<INPUT aria-required="true"  class="TXTstd" type="text"  id="RDTM_USERS.USER_ID_1" value="" onchange="upper(this)" DBC="USER_ID" name="RDTM_USERS.USER_ID_1" dbcol="USER_ID" enabled>
<BUTTON title="List Of Values" tabindex="-1" id="USERID" onclick="LOV_USER_ID.show_lov('RDTM_USERS.USER_ID_1~','form1','', 'User Id', 'User Id', 'User Id',event)" enabled  class="BTNimg">
<span class="ICOlov"></span></BUTTON>
</div>
 
</fieldset>
</div>  

<div id="SummButtons" style="margin-left:600px;padding-top:10px;">            
                    <BUTTON class="BTNfooter"  style="height:25px;width :60px;"  id="INFRA_SEARCH" NAME="INFRA_SEARCH"  OnClick="fnExecuteQuery()">Search</BUTTON>
                    <BUTTON class="BTNfooter"  style="height:25px;width :60px;"  ID="INFRA_RESET" NAME="INFRA_RESET" OnClick="fnSumreset('RDSUSRDF_SUMMARY_RESULT')">Reset</BUTTON>
</div>

<div class="DIVMultipleBig" style="clear:both; margin-top:20px; margin-bottom:20px; margin-left:50px; margin-right:75px; width:auto">
		<div class="MEButtons" id="RDSUSRDF_SUMMARY_RESULT_ME" name="RDSUSRDF_SUMMARY_RESULT_ME">
			<BUTTON CLASS="BTNfooter" name="navFirst" id ="navFirst" onclick="doNavigate1(gcNAV_FIRST)" ><sup tabindex="-1">&lt;&lt;</sup></BUTTON>
			<BUTTON CLASS="BTNfooter" name="navPrev" id ="navPrev"   onclick="doNavigate1(gcNAV_PREVIOUS)" ><sup tabindex="-1">&lt;</sup></BUTTON>
			<BUTTON  CLASS="BTNfooter"><span id="pagesflow"><sup>0 of 0</sup></span></BUTTON> 
			<BUTTON CLASS="BTNfooter" name="navNext" id ="navNext" onclick="doNavigate1(gcNAV_NEXT)" ><sup tabindex="-1">&gt;</sup></BUTTON>
			<BUTTON CLASS="BTNfooter" name="navLast" id ="navLast" onclick="doNavigate1(gcNAV_LAST)"><sup tabindex="-1">&gt;&gt;</sup></BUTTON>
		</div>
	<div class="DIVmultiplebox" >
	<div class="DIVMultipleBigInner" style="width:725PX; height:300px;">
	<table onKeyDown="FnAcessTblkeys(this,event);" id="RDSUSRDF_SUMMARY_RESULT" name="RDSUSRDF_SUMMARY_RESULT" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO"  class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
       <thead>
        <tr>					
					<TH class="THgrid1" scope="col"><INPUT aria-required="false" type="checkbox"  name='SEL_ALL' id='SEL_ALL'><span class="LBLinv">Select All Rows</span></TH>
                    <TH scope="col" class="THgrid"><span class="SPNtext">User Id</span></TH>
					<TH scope="col" class="THgrid"><span class="SPNtext">User Name</span></TH>
					<TH scope="col" class="THgrid"><span class="SPNtext">Default Release</span></TH>
					<TH scope="col" class="THgrid"><span class="SPNtext">Default Environment</span></TH> 
        </tr>
       </thead>
       <tbody></tbody>
       <tfoot><tr><td id="RDSUSRDF_SUMMARY_RESULT_TE" name="RDSUSRDF_SUMMARY_RESULT_TE" scope="row" tabindex="0" colspan="5"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
   </table>
  </div>
 </div>
</div>

</div>