<!--
  **
  **
  ** File Name  : RadActions.jsp
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
<span class="Subheader"><h2>Form Actions</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');PopulateDataSourceForSummary('S');">
<img src="Images/rollback.gif" alt="Roll Back" >
</BUTTON>
</span>
</div>
 
 
<div   class="Subcontainer" id="actheader"  name="actheader"  TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne" style="width:48%" >
<fieldset class="FSTcell"> 

<div class="DIVText" >
<LABEL class="LBLstd" for="RAD_XSD_TYPE_NAME">XSD Type Identifier</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="RAD_XSD_TYPE_NAME" name="RAD_XSD_TYPE_NAME" value="" size="40" maxlength="15" onchange="checkIdentifier(this.value,'XSD Type Identifier');">
</div>

 <div class="DIVText">
<LABEL class="LBLstd" for="OPERATION_ID">Operation Id</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="OPERATION_ID" name="OPERATION_ID" value="" size="40" maxlength="15" onchange="checkIdentifier(this.value,'Operation ID');getNodeDetails('ACT');">
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="REST_ENABLED">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="REST_ENABLED" id="REST_ENABLED" onClick="fnRestActionsUI()">Rest Enabled</LABEL>
</div>
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="REST_MICRO_ENABLED">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="REST_MICRO_ENABLED" id="REST_MICRO_ENABLED" disabled="true" onClick="fnRestActionsUI()">Fine Grained Service Required</LABEL>
</div>
</div>

<!-- Start 33914847   -->
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="REST_CACHE_ENABLED">
<INPUT aria-required="false" type="checkbox" class="CHKstd" name="REST_CACHE_ENABLED" id="REST_CACHE_ENABLED" disabled="true" onClick="fnRestActionsUI()">Shared Cache Mode</LABEL>
</div>
</div>
<!-- End 33914847   --> 
</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column one-->
<div class="DIVColumnOne" style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText">
<LABEL class="LBLstd" for="SERVICE_NAME">Service Name</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="SERVICE_NAME" name="SERVICE_NAME" value="" size="40">
<BUTTON  id="LOVSERVICENAME" name="LOVSERVICENAME" class="BTNimg"  title="List Of Values" tabindex="-1"  onclick="LOV_SERVICE_NAME.show_lov('SERVICE_NAME~','frmAct','', 'Service Name', 'Service Name~Service Description', 'Service Name~Service Description',event)">
<span class="ICOlov"></span></BUTTON>
</div> 

 <div class="DIVText">
<LABEL class="LBLstd" for="XSD_MODULE_FOLDER">XSD Module Folder</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="XSD_MODULE_FOLDER" name="XSD_MODULE_FOLDER" value="" size="40">
</div>
  
<div class="DIVText" >
<LABEL class="LBLstd" for="REST_SERVICE_NAME">Rest Service Name</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="REST_SERVICE_NAME" name="REST_SERVICE_NAME" value="" size="40" onchange="fnRestActionsUI()">
</div>
  
</fieldset>
</div>
<!--End of Form fields column one-->
 </div> 

<div class="DIVMultipleBig" style="position:relative; margin-left:20px; margin-right:20px; width:AUTO;" id="dataContainer_BLK_CONTRACT_MULTITNR" name="dataContainer" >
		<div class="MEButtons" id="ACTNS_TB_ME" name="ACTNS_TB_ME" style="display:none">
			<BUTTON title="Add Row"  id="ADD" name="ADD" onclick="addNewRow('ACTNS_TB')" class="BTNimg"><span class="ICOadd" tabindex="-1"><span class="LBLinv">Add Row</span></span></BUTTON>
			<BUTTON title="Delete Row"  id="DEL" name="DEL" onclick="delRow('ACTNS_TB')" class="BTNimg"><span class="ICOremove" tabindex="-1"><span class="LBLinv">Delete Row</span></span></BUTTON>
		</div>    	
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:400px;"  >
			<table onKeyDown="FnAcessTblkeys(this,event);" id="ACTNS_TB" name="ACTNS_TB" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Web Service</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Action Code</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Operation Code</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Action Stage Type</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Rest Enabled</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Amendables</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Comment Code</span></th>
			    	</tr>
			    </thead>
			    <tbody>
                         <tr>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Web Service Applicable" type="checkbox" id="WEBSERVICE_APPLICABLE1" name="WEBSERVICE_APPLICABLE" onclick="EnableFlds('ACTNS_TB')" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="ACTION_CODE1" name="ACTION_CODE" title="Action Code"  value="QUERY" ondblclick="fnenblDsblOpCd(event)" size="20" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="OPERATION_CODE1" name="OPERATION_CODE" title="Operation Code"  size="50"  class="TXTro" ></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Action Stage" type="checkbox" checked="true" id="ACTION_STAGE_TYPE1" name="ACTION_STAGE_TYPE"  readonly="readonly"></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Rest Enabled" type="checkbox" disabled="true"  id="REST_OPERATION_ENABLED1" name="REST_OPERATION_ENABLED"  readonly="readonly"></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Amendables1"  title="Amendables" name="Amendables"  onclick="fnAmendables(event)" class="Buttontext">Amendables</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Comments1"  title="Comments" name="COMMENTS"  onclick="fnComments(event)" class="Buttontext">Comments</BUTTON></td> 
							  <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSREQ_CMT_ID1" name="FSREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
							  <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="IOREQ_CMT_ID1" name="IOREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
							  <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSRES_CMT_ID1" name="FSRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
							  <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="PKRES_CMT_ID1" name="PKRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                          </tr>
                          <tr>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Web Service Applicable" type="checkbox" id="WEBSERVICE_APPLICABLE2" name="WEBSERVICE_APPLICABLE" onclick="EnableFlds('ACTNS_TB')" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="ACTION_CODE2" name="ACTION_CODE" title="Action Code"  value="NEW" ondblclick="fnenblDsblOpCd(event)" size="20" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="OPERATION_CODE2" name="OPERATION_CODE" title="Operation Code"  size="50"  class="TXTro" ></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Action Stage" type="checkbox" checked="true" id="ACTION_STAGE_TYPE2" name="ACTION_STAGE_TYPE"  readonly="readonly"></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Rest Enabled" type="checkbox" disabled="true"  id="REST_OPERATION_ENABLED2" name="REST_OPERATION_ENABLED"  readonly="readonly"></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Amendables2"  title="Amendables" name="Amendables"  onclick="fnAmendables(event)" class="Buttontext">Amendables</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Comments2"  title="Comments" name="COMMENTS"  onclick="fnComments(event)" class="Buttontext">Comments</BUTTON></td>                          
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSREQ_CMT_ID2" name="FSREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="IOREQ_CMT_ID2" name="IOREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSRES_CMT_ID2" name="FSRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="PKRES_CMT_ID2" name="PKRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                          </tr>
                          <tr>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Web Service Applicable" type="checkbox" id="WEBSERVICE_APPLICABLE3" name="WEBSERVICE_APPLICABLE" onclick="EnableFlds('ACTNS_TB')" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="ACTION_CODE3" name="ACTION_CODE" title="Action Code"  value="MODIFY" ondblclick="fnenblDsblOpCd(event)" size="20" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="OPERATION_CODE3" name="OPERATION_CODE" title="Operation Code"  size="50"  class="TXTro" ></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Action Stage" type="checkbox" checked="true" id="ACTION_STAGE_TYPE3" name="ACTION_STAGE_TYPE"  readonly="readonly"></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Rest Enabled" type="checkbox" disabled="true"  id="REST_OPERATION_ENABLED3" name="REST_OPERATION_ENABLED"  readonly="readonly"></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Amendables3"  title="Amendables" name="Amendables"  onclick="fnAmendables(event)" class="Buttontext">Amendables</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Comments3"  title="Comments" name="COMMENTS"  onclick="fnComments(event)" class="Buttontext">Comments</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSREQ_CMT_ID3" name="FSREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="IOREQ_CMT_ID3" name="IOREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSRES_CMT_ID3" name="FSRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="PKRES_CMT_ID3" name="PKRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                          </tr>
                          <tr>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Web Service Applicable" type="checkbox" id="WEBSERVICE_APPLICABLE4" name="WEBSERVICE_APPLICABLE" onclick="EnableFlds('ACTNS_TB')" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="ACTION_CODE4" name="ACTION_CODE" title="Action Code"  value="AUTHORIZE" ondblclick="fnenblDsblOpCd(event)" size="20" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="OPERATION_CODE4" name="OPERATION_CODE" title="Operation Code"  size="50"  class="TXTro" ></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Action Stage" type="checkbox"  id="ACTION_STAGE_TYPE4" name="ACTION_STAGE_TYPE"  readonly="readonly"></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Rest Enabled" type="checkbox" disabled="true"  id="REST_OPERATION_ENABLED4" name="REST_OPERATION_ENABLED"  readonly="readonly"></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Amendables4"  title="Amendables" name="Amendables"  onclick="fnAmendables(event)" class="Buttontext">Amendables</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Comments4"  title="Comments" name="COMMENTS"  onclick="fnComments(event)" class="Buttontext">Comments</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSREQ_CMT_ID4" name="FSREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="IOREQ_CMT_ID4" name="IOREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSRES_CMT_ID4" name="FSRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="PKRES_CMT_ID4" name="PKRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                          </tr>
                           <tr>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Web Service Applicable" type="checkbox" id="WEBSERVICE_APPLICABLE5" name="WEBSERVICE_APPLICABLE" onclick="EnableFlds('ACTNS_TB')" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="ACTION_CODE5" name="ACTION_CODE" title="Action Code"  value="DELETE" ondblclick="fnenblDsblOpCd(event)" size="20" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="OPERATION_CODE5" name="OPERATION_CODE" title="Operation Code"  size="50"  class="TXTro" ></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Action Stage" type="checkbox"  id="ACTION_STAGE_TYPE5" name="ACTION_STAGE_TYPE"  readonly="readonly"></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Rest Enabled" type="checkbox" disabled="true"  id="REST_OPERATION_ENABLED5" name="REST_OPERATION_ENABLED"  readonly="readonly"></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Amendables5"  title="Amendables" name="Amendables"  onclick="fnAmendables(event)" class="Buttontext">Amendables</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Comments5"  title="Comments" name="COMMENTS"  onclick="fnComments(event)" class="Buttontext">Comments</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSREQ_CMT_ID5" name="FSREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="IOREQ_CMT_ID5" name="IOREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSRES_CMT_ID5" name="FSRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="PKRES_CMT_ID5" name="PKRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                          </tr>
                           <tr>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Web Service Applicable" type="checkbox" id="WEBSERVICE_APPLICABLE6" name="WEBSERVICE_APPLICABLE" onclick="EnableFlds('ACTNS_TB')" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="ACTION_CODE6" name="ACTION_CODE" title="Action Code" value="CLOSE" ondblclick="fnenblDsblOpCd(event)" size="20" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="OPERATION_CODE6" name="OPERATION_CODE" title="Operation Code"  size="50"  class="TXTro" ></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Action Stage" type="checkbox"  id="ACTION_STAGE_TYPE6" name="ACTION_STAGE_TYPE"  readonly="readonly"></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Rest Enabled" type="checkbox" disabled="true"  id="REST_OPERATION_ENABLED6" name="REST_OPERATION_ENABLED"  readonly="readonly"></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Amendables6"  title="Amendables" name="Amendables"  onclick="fnAmendables(event)" class="Buttontext">Amendables</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Comments6"  title="Comments" name="COMMENTS"  onclick="fnComments(event)" class="Buttontext">Comments</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSREQ_CMT_ID6" name="FSREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="IOREQ_CMT_ID6" name="IOREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSRES_CMT_ID6" name="FSRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="PKRES_CMT_ID6" name="PKRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                          </tr>
                          <tr>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Web Service Applicable" type="checkbox" id="WEBSERVICE_APPLICABLE7" name="WEBSERVICE_APPLICABLE" onclick="EnableFlds('ACTNS_TB')" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="ACTION_CODE7" name="ACTION_CODE" title="Action Code" value="REOPEN" ondblclick="fnenblDsblOpCd(event)" size="20" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="OPERATION_CODE7" name="OPERATION_CODE" title="Operation Code"  size="50"  class="TXTro" ></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Action Stage" type="checkbox"  id="ACTION_STAGE_TYPE7" name="ACTION_STAGE_TYPE"  readonly="readonly"></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Rest Enabled" type="checkbox" disabled="true"  id="REST_OPERATION_ENABLED7" name="REST_OPERATION_ENABLED"  readonly="readonly"></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Amendables7"  title="Amendables" name="Amendables"  onclick="fnAmendables(event)" class="Buttontext">Amendables</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Comments7"  title="Comments" name="COMMENTS"  onclick="fnComments(event)" class="Buttontext">Comments</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSREQ_CMT_ID7" name="FSREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="IOREQ_CMT_ID7" name="IOREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSRES_CMT_ID7" name="FSRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="PKRES_CMT_ID7" name="PKRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                          </tr>
                          <tr>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Web Service Applicable" type="checkbox" id="WEBSERVICE_APPLICABLE8" name="WEBSERVICE_APPLICABLE" onclick="EnableFlds('ACTNS_TB')" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="ACTION_CODE8" name="ACTION_CODE" title="Action Code" value="REVERSE" ondblclick="fnenblDsblOpCd(event)" size="20" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="OPERATION_CODE8" name="OPERATION_CODE" title="Operation Code"  size="50"  class="TXTro" ></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Action Stage" type="checkbox"  id="ACTION_STAGE_TYPE8" name="ACTION_STAGE_TYPE"  readonly="readonly"></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Rest Enabled" type="checkbox" disabled="true"  id="REST_OPERATION_ENABLED8" name="REST_OPERATION_ENABLED"  readonly="readonly"></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Amendables8"  title="Amendables" name="Amendables"  onclick="fnAmendables(event)" class="Buttontext">Amendables</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Comments8"  title="Comments" name="COMMENTS"  onclick="fnComments(event)" class="Buttontext">Comments</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSREQ_CMT_ID8" name="FSREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="IOREQ_CMT_ID8" name="IOREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSRES_CMT_ID8" name="FSRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="PKRES_CMT_ID8" name="PKRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                          </tr>
                          <tr>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Web Service Applicable" type="checkbox" id="WEBSERVICE_APPLICABLE9" name="WEBSERVICE_APPLICABLE" onclick="EnableFlds('ACTNS_TB')" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="ACTION_CODE9" name="ACTION_CODE" title="Action Code" value="ROLLOVER" ondblclick="fnenblDsblOpCd(event)" size="20" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="OPERATION_CODE9" name="OPERATION_CODE" title="Operation Code"  size="50"  class="TXTro" ></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Action Stage" type="checkbox"  id="ACTION_STAGE_TYPE9" name="ACTION_STAGE_TYPE"  readonly="readonly"></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Rest Enabled" type="checkbox" disabled="true"  id="REST_OPERATION_ENABLED9" name="REST_OPERATION_ENABLED"  readonly="readonly"></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Amendables9"  title="Amendables" name="Amendables"  onclick="fnAmendables(event)" class="Buttontext">Amendables</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Comments9"  title="Comments" name="COMMENTS"  onclick="fnComments(event)" class="Buttontext">Comments</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSREQ_CMT_ID9" name="FSREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="IOREQ_CMT_ID9" name="IOREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSRES_CMT_ID9" name="FSRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="PKRES_CMT_ID9" name="PKRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                          </tr>
                          <tr>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Web Service Applicable" type="checkbox" id="WEBSERVICE_APPLICABLE10" name="WEBSERVICE_APPLICABLE" onclick="EnableFlds('ACTNS_TB')" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="ACTION_CODE10" name="ACTION_CODE" title="Action Code" value="CONFIRM" ondblclick="fnenblDsblOpCd(event)" size="20" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="OPERATION_CODE10" name="OPERATION_CODE" title="Operation Code"  size="50"  class="TXTro" ></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Action Stage" type="checkbox"  id="ACTION_STAGE_TYPE10" name="ACTION_STAGE_TYPE"  readonly="readonly"></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Rest Enabled" type="checkbox" disabled="true"  id="REST_OPERATION_ENABLED10" name="REST_OPERATION_ENABLED"  readonly="readonly"></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Amendables10"  title="Amendables" name="Amendables"  onclick="fnAmendables(event)" class="Buttontext">Amendables</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Comments10"  title="Comments" name="COMMENTS"  onclick="fnComments(event)" class="Buttontext">Comments</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSREQ_CMT_ID10" name="FSREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="IOREQ_CMT_ID10" name="IOREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSRES_CMT_ID10" name="FSRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="PKRES_CMT_ID10" name="PKRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                          </tr>
                         <tr>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Web Service Applicable" type="checkbox" id="WEBSERVICE_APPLICABLE11" name="WEBSERVICE_APPLICABLE" onclick="EnableFlds('ACTNS_TB')" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="ACTION_CODE11" name="ACTION_CODE" title="Action Code" value="LIQUIDATE" ondblclick="fnenblDsblOpCd(event)" size="20" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="OPERATION_CODE11" name="OPERATION_CODE" title="Operation Code"  size="50"  class="TXTro" ></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Action Stage" type="checkbox"  id="ACTION_STAGE_TYPE11" name="ACTION_STAGE_TYPE"  readonly="readonly"></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Rest Enabled" type="checkbox" disabled="true"  id="REST_OPERATION_ENABLED11" name="REST_OPERATION_ENABLED"  readonly="readonly"></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Amendables11"  title="Amendables" name="Amendables"  onclick="fnAmendables(event)" class="Buttontext">Amendables</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Comments11"  title="Comments" name="COMMENTS"  onclick="fnComments(event)" class="Buttontext">Comments</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSREQ_CMT_ID11" name="FSREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="IOREQ_CMT_ID11" name="IOREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSRES_CMT_ID11" name="FSRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="PKRES_CMT_ID11" name="PKRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                          </tr>
                          <tr>
                              <td scope="col" class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Web Service Applicable" type="checkbox" id="WEBSERVICE_APPLICABLE12" name="WEBSERVICE_APPLICABLE" onclick="EnableFlds('ACTNS_TB')" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="ACTION_CODE12" name="ACTION_CODE" title="Action Code" value="SUMMARYQUERY" ondblclick="fnenblDsblOpCd(event)" size="20" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="OPERATION_CODE12" name="OPERATION_CODE" title="Operation Code"  size="50"  class="TXTro" ></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Action Stage" type="checkbox" checked="true" id="ACTION_STAGE_TYPE12" name="ACTION_STAGE_TYPE"  readonly="readonly"></td>
                              <td class="TDgrid1" nowrap="nowrap"><INPUT aria-required="false" title="Rest Enabled" type="checkbox" disabled="true"  id="REST_OPERATION_ENABLED12" name="REST_OPERATION_ENABLED"  readonly="readonly"></td>
                              <td class="TDgrid" nowrap="nowrap"></td>
                              <td class="TDgrid" nowrap="nowrap"><BUTTON id="Comments12"  title="Comments" name="COMMENTS"  onclick="fnComments(event)" class="Buttontext">Comments</BUTTON></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSREQ_CMT_ID12" name="FSREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="IOREQ_CMT_ID12" name="IOREQ_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="FSRES_CMT_ID12" name="FSRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                              <td class="TDgrid" nowrap="nowrap"><INPUT aria-required="false" type="text"  id="PKRES_CMT_ID12" name="PKRES_CMT_ID" style="display:none" readonly="readonly" class="TXTro" ></td>
                          </tr>
                          
                </tbody>
			    <tfoot><tr><td scope="col" id="ACTNS_TB_TE" name="ACTNS_TB_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
	
	<div class="DIVMultipleBig" style="position:relative; margin-left:20px; margin-right:20px; width:AUTO;height:500px;" id="dataContainer_BLK_CONTRACT_MULTITNR" name="dataContainer" >
	<div class="MEButtons">
			<BUTTON title="Add Row"  id="RESTADD" name="RESTADD" onclick="addNewRow('REST_TABLE')" class="BTNimg"><span class="ICOadd" tabindex="-1"><span class="LBLinv">Add Row</span></span></BUTTON>
			<BUTTON title="Delete Row"  id="RESTDEL" name="RESTDEL" onclick="delRow('REST_TABLE')" class="BTNimg"><span class="ICOremove" tabindex="-1"><span class="LBLinv">Delete Row</span></span></BUTTON>
		</div>	
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:300px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="REST_TABLE" name="REST_TABLE" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="NO" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			       	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('REST_TABLE','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Operation Code</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Req&Res</span></th>   
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div> 
	</div> 
	
</div> 
	 