<div id="RDDENVDF" style="display:none;" scrSize = "M" scrTitle = "Environment Master" >
<div  id="RDTM_ENV_MASTER"   NAME="RDTM_ENV_MASTER" DBT="RDTM_ENV_MASTER"  TYPE="SINGLE" PARENT="NO" VIEW="NO">
<!--Form fields column one-->
<div class="DIVColumnOne"  >
<fieldset class="FSTstd">
<legend> Environment Details</legend>
<div class="DIVText">
<LABEL class="LBLstd star" for="RDTM_ENV_MASTER.ENV_CODE">Environment Code</LABEL>
<INPUT aria-required="true"  class="TXTstd" type="text"  name="RDTM_ENV_MASTER.ENV_CODE" id="RDTM_ENV_MASTER.ENV_CODE" DBC="ENV_CODE" onchange="upper(this)" size="" maxlength="50">
<BUTTON  class="BTNimg" title="List Of Values" tabindex="-1" style ="visibility:hidden" id="BTN_ENV_CODE"  onclick="LOV_SENV_CODE.show_lov('RDTM_ENV_MASTER.ENV_CODE~','frmTCM','', 'Environment Code', 'Environment Code', 'Environment Code',event)" enabled>
<span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd star" for="RDTM_ENV_MASTER.RELEASE_CODE">Release Code</LABEL>
<INPUT aria-required="true"  class="TXTstd" type="text"  name="RDTM_ENV_MASTER.RELEASE_CODE" id="RDTM_ENV_MASTER.RELEASE_CODE" DBC="RELEASE_CODE" onchange="upper(this)" size="" maxlength="50">
<BUTTON  class="BTNimg" title="List Of Values" tabindex="-1" style ="visibility:hidden" id="BTN_REL_CODE"  onclick="LOV_REL_CODE.show_lov('RDTM_ENV_MASTER.RELEASE_CODE~','frmTCM','', 'Release Code', 'Release Code', 'Release Code',event)" enabled>
<span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd star" for="RDTM_ENV_MASTER.LANG_CODE">Language Code</LABEL>
<INPUT aria-required="true"  class="TXTstd" type="text" name="RDTM_ENV_MASTER.LANG_CODE" id="RDTM_ENV_MASTER.LANG_CODE" DBC="LANG_CODE" size="3">
<BUTTON  class="BTNimg" title="List Of Values" tabindex="-1" style ="visibility:hidden" id="BTN_LANG_CODE" onclick="LOV_LANG_CODE.show_lov('RDTM_ENV_MASTER.LANG_CODE~','frmTCM','', 'Language', 'Language Code~Language Desc', 'Language Code~Language Desc',event)" enabled>
<span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.ENV_DESC">Description</LABEL>
<INPUT aria-required="false" type="text" class="TXTstd"  name="RDTM_ENV_MASTER.ENV_DESC" id="RDTM_ENV_MASTER.ENV_DESC" DBC="ENV_DESC" size="">
</div>
</fieldset>

<fieldset class="FSTstd">
<legend>JNDI name</legend>
<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.JNDI_NAME">JNDI Name</LABEL>
<INPUT aria-required="true" class="TXTstd" type="text" title="auto populated" placeholder="auto populated" style="background-color: gray;" name="RDTM_ENV_MASTER.JNDI_NAME" id="RDTM_ENV_MASTER.JNDI_NAME" dbc="JNDI_NAME" readonly="readonly">
</div>
</fieldset>


<fieldset class="FSTstd">
<legend> Database Details</legend>
<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.DB_INSTANCE">Database Instance</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text" name="RDTM_ENV_MASTER.DB_INSTANCE" id="RDTM_ENV_MASTER.DB_INSTANCE" dbc="DB_INSTANCE">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.DB_PORT">Database Port</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  name="RDTM_ENV_MASTER.DB_PORT" id="RDTM_ENV_MASTER.DB_PORT" dbc="DB_PORT" >
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.DB_IP">Database IP Address</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  name="RDTM_ENV_MASTER.DB_IP" id="RDTM_ENV_MASTER.DB_IP" dbc="DB_IP">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.DB_HOSTNAME">Database Host Name</LABEL>
<INPUT aria-required="false" type="text" class="TXTstd"  name="RDTM_ENV_MASTER.DB_HOSTNAME" id="RDTM_ENV_MASTER.DB_HOSTNAME" dbc="DB_HOSTNAME" >
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.DB_SCHEMA">Database Name</LABEL>
<INPUT aria-required="false" type="text" class="TXTstd" name="RDTM_ENV_MASTER.DB_SCHEMA" id="RDTM_ENV_MASTER.DB_SCHEMA" dbc="DB_SCHEMA" onblur="checkAndAutoPupolateJNDI()">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.DB_PASSWORD">Database Password</LABEL>
<INPUT aria-required="false" class="TXTstd"  name="RDTM_ENV_MASTER.DB_PASSWORD" id="RDTM_ENV_MASTER.DB_PASSWORD" dbc="DB_PASSWORD" type="password"  onchange="fnDbPasswordEncrypt()">
</div>

</fieldset>

</div>
<!--End of Form fields column one-->

<!--End of Form fields column two-->
<div class="DIVColumnOne">
<fieldset class="FSTstd">
<legend>Application Details</legend>
<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.APP_URL">Application URL</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_ENV_MASTER.APP_URL" id="RDTM_ENV_MASTER.APP_URL" dbc="APP_URL">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.APP_IP">Application IP Address</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_ENV_MASTER.APP_IP" id="RDTM_ENV_MASTER.APP_IP" dbc="APP_IP">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.APP_HOSTNAME">Application Name</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_ENV_MASTER.APP_HOSTNAME" id="RDTM_ENV_MASTER.APP_HOSTNAME" dbc="APP_HOSTNAME" size="" >
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.APP_OS_TYPE">Application OS</LABEL>
<SELECT aria-required="false" disabled="disabled" name="RDTM_ENV_MASTER.APP_OS_TYPE" id="RDTM_ENV_MASTER.APP_OS_TYPE" dbc="APP_OS_TYPE">
<option value="UNIX">Unix</option>
<option value="WINDOWS">Windows</option>
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.APP_TRNF_TYPE">Application Transfer Type</LABEL>
<SELECT aria-required="false" disabled="disabled" name="RDTM_ENV_MASTER.APP_TRNF_TYPE" id="RDTM_ENV_MASTER.APP_TRNF_TYPE" dbc="APP_TRNF_TYPE">
<option value="FILEMANAGER">File Manager</option>
<option value="FILECOPY">File Copy</option>
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.APP_JS_FOLDER">JS Directory Path</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text"  name="RDTM_ENV_MASTER.APP_JS_FOLDER" id="RDTM_ENV_MASTER.APP_JS_FOLDER" dbc="APP_JS_FOLDER" size="">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.APP_XML_FOLDER">UI XML Directory Path</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text"   name="RDTM_ENV_MASTER.APP_XML_FOLDER" id="RDTM_ENV_MASTER.APP_XML_FOLDER" dbc="APP_XML_FOLDER" size="" >
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.APP_FTP_USER">Server User Name</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_ENV_MASTER.APP_FTP_USER" id="RDTM_ENV_MASTER.APP_FTP_USER" dbc="APP_FTP_USER">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.APP_FTP_PASSWORD">Server Password</LABEL>
<INPUT aria-required="false" class="TXTstd" type="password" name="RDTM_ENV_MASTER.APP_FTP_PASSWORD" id="RDTM_ENV_MASTER.APP_FTP_PASSWORD" dbc="APP_FTP_PASSWORD">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.APP_HTTP_URL">Server Filemanager URL</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_ENV_MASTER.APP_HTTP_URL" id="RDTM_ENV_MASTER.APP_HTTP_URL" dbc="APP_HTTP_URL">
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.APP_HTTP_USER">File Manager User Name</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RDTM_ENV_MASTER.APP_HTTP_USER" id="RDTM_ENV_MASTER.APP_HTTP_USER" dbc="APP_HTTP_USER" >
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="RDTM_ENV_MASTER.APP_HTTP_PASSWORD">File Manager Password</LABEL>
<INPUT aria-required="false" class="TXTstd" type="password" name="RDTM_ENV_MASTER.APP_HTTP_PASSWORD" id="RDTM_ENV_MASTER.APP_HTTP_PASSWORD" dbc="APP_HTTP_PASSWORD">
</div>
</fieldset>

<div class="DIVText" style="float:right; margin-right:62px ">
<BUTTON class="BTNfooter" title="Test JNDI" name="JNDITEST" id="JNDITEST" onclick="fnENVTestConn('JNDI');" style="visibility:visible;"><sup>Test JNDI</sup></BUTTON>
<BUTTON class="BTNfooter" title="Environment details must be saved before testing connectivity." name="ENVTEST" id="ENVTEST" onclick="fnENVTestConn('ENV');" style="visibility:visible;"><sup>Test Environment</sup></BUTTON>
</div> 

</div>
</div>
<!--End of Form fields column two-->
<div style="margin-left:50px; margin-right:75px; width:700px; background-color:#e6f2f4; clear:both;border:1px solid #a2c2e5;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="1" border="0" name="RDTM_ENV_MASTER_1" id="RDTM_ENV_MASTER_1">
<tbody>
<tr>
<td align="right"><LABEL for="RDTM_ENV_MASTER.MOD_NO">Modification Number</LABEL></td>
<td><INPUT aria-required="false" dbc="MOD_NO" name="RDTM_ENV_MASTER.MOD_NO" id="RDTM_ENV_MASTER.MOD_NO" readonly="readonly"> 
</td><td align="right"><LABEL for="RDTM_ENV_MASTER.MAKER_ID">Maker Id</LABEL></td>
<td><INPUT aria-required="false" dbc="MAKER_ID" name="RDTM_ENV_MASTER.MAKER_ID" id="RDTM_ENV_MASTER.MAKER_ID" readonly="readonly"></td>
<td align="right"><LABEL for="RDTM_ENV_MASTER.MAKER_DT_STAMP">Maker Date Stamp</LABEL></td>
<td><INPUT aria-required="false" dbc="MAKER_DT_STAMP" name="RDTM_ENV_MASTER.MAKER_DT_STAMP" id="RDTM_ENV_MASTER.MAKER_DT_STAMP" readonly="readonly"></td>
</tr>
</tbody>
</table>
</div>
</div>
 
 
<div id="RDSENVDF" style="display:none;margin-top:10px" scrSize = "M" scrTitle = "Environment Master Summary">
<!--Form fields column one-->
<div class="DIVColumnOne">
<fieldset class="FSTcell">
<legend> Environment Details</legend>

<div class="DIVText">
<LABEL  for="RDTM_ENV_MASTER.ENV_CODE_1" class="LBLstd">Environment Code</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  name="RDTM_ENV_MASTER.ENV_CODE_1" id="RDTM_ENV_MASTER.ENV_CODE_1" DBC="ENV_CODE" dbcol="ENV_CODE" onchange="upper(this)" size="" enabled>
<BUTTON title="List Of Values" tabindex="-1" id=""  class="BTNimg" onclick="LOV_SENV_CODE.show_lov('RDTM_ENV_MASTER.ENV_CODE_1~','form1','', 'Environment Code', 'Environment Code', 'Environment Code',event)" enabled>
<span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL  id="ENV_NAME" for="RDTM_ENV_MASTER.ENV_NAME"  class="LBLstd">Environment name</LABEL>
<INPUT aria-required="false"  class="TXTstd" id="RDTM_ENV_MASTER.ENV_NAME" onchange="upper(this)" name="" enabled dbcol="ENV_DESC">
</div>

<div class="DIVText">
<LABEL  id="RELCODE" for="RDTM_ENV_MASTER.RELEASE_CODE_1" class="LBLstd">Release Code</LABEL>
<INPUT aria-required="false"  class="TXTstd"  id="RDTM_ENV_MASTER.RELEASE_CODE_1" onchange="upper(this)" name="RDTM_ENV_MASTER.RELEASE_CODE_1" DBC="RELEASE_CODE"  dbcol="RELEASE_CODE" enabled>
<BUTTON title="List Of Values" tabindex="-1" id=""  onclick="LOV_REL_CODE.show_lov('RDTM_ENV_MASTER.RELEASE_CODE_1~','frmTCM','', 'Release Code', 'Release Code', 'Release Code',event)"enabled  class="BTNimg">
<span class="ICOlov"></span></BUTTON>
</div>


</fieldset>
</div>

<!--Form fields column two-->
<div class="DIVColumnOne">
<fieldset class="FSTcell">
<legend></legend>
<div class="DIVText">
<LABEL id="LANGCODE" for="RDTM_ENV_MASTER.LANG_CODE_1" class="LBLstd">Language Code</LABEL>
<INPUT aria-required="false"   class="TXTstd" type="text"  id="RDTM_ENV_MASTER.LANG_CODE_1" onchange="upper(this)" name="RDTM_ENV_MASTER.LANG_CODE_1" DBC="LANG_CODE"  dbcol="LANG_CODE" enabled>
<BUTTON  title="List Of Values" tabindex="-1" id="BTN_LANG_CODE" onclick="LOV_LANG_CODE.show_lov('RDTM_ENV_MASTER.LANG_CODE_1~','frmTCM','', 'Language', 'Language Code~Language Desc', 'Language Code~Language Desc',event)" enabled  class="BTNimg">
<span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL for="RDTM_ENV_MASTER.DB_NAME" class="LBLstd">Database Name</LABEL>
<INPUT aria-required="false"   class="TXTstd" type="text"  id="RDTM_ENV_MASTER.DB_NAME" onchange="upper(this)" name=""  dbcol="DB_HOSTNAME" enabled>
</div>

<div class="DIVText">
<LABEL for="RDTM_ENV_MASTER.DB_INST" class="LBLstd">Database Instance</LABEL>
<INPUT aria-required="false"   class="TXTstd" type="text"  id="RDTM_ENV_MASTER.DB_INST"  onchange="upper(this)" name=""  dbcol="DB_INSTANCE" enabled>
</div>
</fieldset>
</div>

<div id="SummButtons"  style="margin-left:600px;padding-top:10px;">                
                    <BUTTON class="BTNfooter"  style="height:25px;width :60px;"  id="INFRA_SEARCH" NAME="INFRA_SEARCH"  OnClick="fnExecuteQuery()">Search</BUTTON>
                    <BUTTON class="BTNfooter"  style="height:25px;width :60px;"  ID="INFRA_RESET" NAME="INFRA_RESET" OnClick="fnSumreset('RDSENVDF_SUMMARY_RESULT')">Reset</BUTTON>
</div>

<div class="DIVMultipleBig" style="clear:both; margin-top:20px; margin-bottom:20px; margin-left:50px; margin-right:75px; width:auto">
		<div class="MEButtons" id="RDSENVDF_SUMMARY_RESULT_ME" name="RDSENVDF_SUMMARY_RESULT_ME">
			<BUTTON disabled CLASS="BTNfooter" name="navFirst" id ="navFirst" onclick="doNavigate1(gcNAV_FIRST)" ><sup tabindex="-1">&lt;&lt;</sup></BUTTON>
			<BUTTON disabled CLASS="BTNfooter" name="navPrev" id ="navPrev"   onclick="doNavigate1(gcNAV_PREVIOUS)" ><sup tabindex="-1">&lt;</sup></BUTTON>
			<BUTTON  CLASS="BTNfooter"><span id="pagesflow"><sup>0 of 0</sup></span></BUTTON> 
			<BUTTON disabled CLASS="BTNfooter" name="navNext" id ="navNext" onclick="doNavigate1(gcNAV_NEXT)" ><sup tabindex="-1">&gt;</sup></BUTTON>
			<BUTTON disabled CLASS="BTNfooter" name="navLast" id ="navLast" onclick="doNavigate1(gcNAV_LAST)"><sup tabindex="-1">&gt;&gt;</sup></BUTTON>
		</div>
	<div class="DIVmultiplebox">
	<div class="DIVMultipleBigInner" style="width:725PX; height:300px;">
		<table onKeyDown="FnAcessTblkeys(this,event);" id="RDSENVDF_SUMMARY_RESULT" name="RDSENVDF_SUMMARY_RESULT" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO"  class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
       <thead>
        <TR>
			<TH scope="col" class="THgrid1"><span class="LBLinv">Select All Rows</span><INPUT aria-required="false" id="SEL_ALL" value="" title="Select All Rows" type="checkbox" name="SEL_ALL"></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Environment Code</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Environment Name</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Release Code</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Language Code</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Database Instance</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Database Port</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Database IP Address</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Database HostName</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Database Name</span></TH> 
			<TH scope="col" class="THgrid"><span class="SPNtext">Application URL</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Application IP Address</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Application Name</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Application OS</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Application Transfer Type</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">JS Directory Path</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">UIXML Directory Path</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Server Username</span></TH> 
			<TH scope="col" class="THgrid"><span class="SPNtext">Server Filemanager URL</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Filemanager Username</span></TH> 
			<TH scope="col" class="THgrid"><span class="SPNtext">JNDI Name</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Modification Number</span></TH>
			<TH scope="col" class="THgrid"><span class="SPNtext">Maker ID</span></TH> 
			<TH scope="col" class="THgrid"><span class="SPNtext">Maker Date Stamp</span></TH>
			</TR>
       </thead>
       <tbody></tbody>
       <tfoot><tr><td id="RDSENVDF_SUMMARY_RESULT_TE" name="RDSENVDF_SUMMARY_RESULT_TE" scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
   </table>
  </div>
 </div>	
</div>
</div>   