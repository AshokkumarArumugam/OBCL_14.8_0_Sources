<!--
  **
  **
  ** File Name  : RadPFTables.jsp
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
<span class="Subheader"><h2>Purge Filter Details</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');"><img src="Images/rollback.gif" alt="Roll Back"></BUTTON>
</span>
</div> 

<div class="DIVtab" name="BUTTONPURGE" id="BUTTONPURGE">
    <ul id="tablist">
        <li id="li_BUSINESS"><a class="Htaball" id="TAB_DIV_PRG_BUS_FLTR_D" name="TAB_DIV_PRG_BUS_FLTR_D" href="#nogo" onclick="FnShowTabs('DIV_PRG_BUS_FLTR_D')"><span id="SP_DIV_PRG_BUS_FLTR_D" name="SP_DIV_PRG_BUS_FLTR_D">Business Filters</span></a></li>
        <li id="li_EXCECUTION"><a class="Htaball" id="TAB_DIV_PRG_EXE_FLTR_D" name="TAB_DIV_PRG_EXE_FLTR_D" href="#nogo" onclick="FnShowTabs('DIV_PRG_EXE_FLTR_D')"><span id="SP_DIV_PRG_EXE_FLTR_D" name="SP_DIV_PRG_EXE_FLTR_D">Execution Filters</span></a></li>
        <li id="li_FREEFORMAT"><a class="Htaball" id="TAB_DIV_PRG_FF_FLTR_D" name="TAB_DIV_PRG_FF_FLTR_D" href="#nogo" onclick="FnShowTabs('DIV_PRG_FF_FLTR_D')"><span id="SP_DIV_PRG_FF_FLTR_D" name="SP_DIV_PRG_FF_FLTR_D">Free Format Filter</span></a></li>
    </ul>
</div> 

<div class="DIVTabPageContent">

<div id="DIV_PRG_BUS_FLTR_D" name="DIV_PRG_BUS_FLTR_D" class="DIVMultipleBig" style="position:relative; margin-top:40px; margin-left:20px; margin-right:20px; width:AUTO;">
		<div class="MEButtons" id="PF_B_FILTERS_ME" name="PF_B_FILTERS_ME">
			<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="TABLES_ME">Filter Details</div>
			<BUTTON id="pf_details" name="pf_details"  onclick="FnFilterDetails('PF_B_FILTERS')" title="Filter Details" class="Buttontext">Details</BUTTON>
            <BUTTON class="BTNimg" title="Add Row" onclick="fncheckname();addNewRow('PF_B_FILTERS');" name="ADD" value="ADD"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
			<BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL"  onclick="delRow('PF_B_FILTERS');fnDefaultBuilder();"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>&nbsp;&nbsp;
    	</div>
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:280px;">
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="PF_B_FILTERS" name="PF_B_FILTERS" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('PF_B_FILTERS','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
				    <th scope="col" class="THgrid"><span class="SPNtext">Filter Name</span></th> 
					<th scope="col" class="THgrid" colspan="2"><span class="SPNtext">Filter Data Type</span></th> 
			    	<th scope="col" class="THgrid"><span class="SPNtext">Scope</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Filter Expression</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Filter Operator</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Default Value</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Maximum Length</span></th> 
					<th scope="col" style="display:none"></th>
					<th scope="col" style="display:none"></th> 
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="PF_B_FILTERS_TE" name="PF_B_FILTERS_TE" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>  

<div id="DIV_PRG_EXE_FLTR_D" name="DIV_PRG_EXE_FLTR_D" class="DIVMultipleBig" style="position:relative; margin-top:40px; margin-left:20px; margin-right:20px; width:AUTO;">
		<div class="MEButtons" id="PF_E_FILTERS_ME" name="PF_E_FILTERS_ME">
			<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="TABLES_ME">Filter Details</div>
			<BUTTON id="pf_details" name="pf_details"  onclick="FnFilterDetails('PF_E_FILTERS')" title="Filter Details" class="Buttontext">Details</BUTTON>
            <BUTTON class="BTNimg" title="Add Row" onclick="fncheckname();addNewRow('PF_E_FILTERS');" name="ADD" value="ADD"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
			<BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL"  onclick="delRow('PF_E_FILTERS');fnDefaultBuilder();"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>&nbsp;&nbsp;
    	</div>
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:280px;">
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="PF_E_FILTERS" name="PF_E_FILTERS" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('PF_E_FILTERS','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
				    <th scope="col" class="THgrid"><span class="SPNtext">Filter Name</span></th>  
					<th scope="col" class="THgrid" colspan="2"><span class="SPNtext">Filter Data Type</span></th> 
			    	<th scope="col" class="THgrid"><span class="SPNtext">Scope</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Filter Expression</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Filter Operator</span></th>
					<th scope="col" class="THgrid"><span class="SPNtext">Default Value</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Maximum Length</span></th> 
					<th scope="col" style="display:none"></th>
					<th scope="col" style="display:none"></th> 
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="PF_E_FILTERS_TE" name="PF_E_FILTERS_TE" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>  

<div id="DIV_PRG_FF_FLTR_D" name="DIV_PRG_FF_FLTR_D" class="DIVMultipleBig" style="position:relative; margin-top:40px; margin-left:20px; margin-right:20px; width:AUTO;">
		 
		 
		<div  class="Subcontainer" name="BUTTONS_NO" id="BUTTONS_NO" TYPE="SINGLE" style="height:290px;">
            <!--Form fields column one-->
            <div class="DIVColumnOne"  style="width:100%">
            <fieldset class="FSTcell"> 
              
            <div class="DIVText">
            <LABEL class="LBLstd" style="color:blue" for="PURGE_FF_FILTER">Free Format Filter</LABEL>
            <textarea  title="Free Format Filter" rows="15" cols="135"  style="border:1px solid #a2c2e5;" id="PURGE_FF_FILTER" name="PURGE_FF_FILTER" onchange="fnDefaultFilter();"></textarea> 
			</div>  
            
            </fieldset>
            </div> 
        </div>
</div>  
</div>  

<div class="DIVTabPageContent" style="margin-top:30px;" >
<div id="DIV_FOOTER" name="DIV_FOOTER" class="DIVMultipleBig" style="position:absolute; margin-top:40px; margin-left:20px; margin-right:20px; width:AUTO;">
		 
		 
		<div  class="Subcontainer" name="FOOTER" id="FOOTER" TYPE="SINGLE" >
            <!--Form fields column one-->
            <div class="DIVColumnOne"  style="width:100%">
            <fieldset class="FSTcell"> 
              
            <div style="display:none">
            <LABEL class="LBLstd" style="color:blue" for="FINAL_FILTER">Final Filter</LABEL>
            <textarea  title="Free Format Filter" rows="10" cols="135"  style="border:1px solid #a2c2e5;" id="FINAL_FILTER" name="FINAL_FILTER" ></textarea> 
			</div> 

			<div class="DIVText">
            <LABEL class="LBLstd" style="color:blue" for="FINAL_FILTER_EXPRESSION">Final Filter Expression</LABEL>
            <textarea  title="Free Format Filter" rows="10" cols="135"  style="border:1px solid #a2c2e5;" id="FINAL_FILTER_EXPRESSION" name="FINAL_FILTER_EXPRESSION" readonly="yes"></textarea> 
			</div> 
			
			<div class="DIVText" style="float:left;margin-left:150px">
			<BUTTON class="BTNfooter" title="Default Builder" name="FF2" id="FF2" onclick="fnDefaultBuilder()" style="visibility:visible;"><sup>Default</sup></BUTTON>
			<BUTTON class="BTNfooter" title="Filter Builder" name="FF1" id="FF1" onclick="fnFinalFilter_builder('','FINAL_FILTER','',event)" style="visibility:visible;"><sup>Custom Builder</sup></BUTTON>
			</div> 
			
			<div style="display:none"> 
			<INPUT type="text" name="FINAL_FILTER_QUERY" id="FINAL_FILTER_QUERY" value="">
			<INPUT type="text" name="FINAL_FILTER_VALIDATION" id="FINAL_FILTER_VALIDATION" value="N">
			</div>
            
            </fieldset>
            </div> 
        </div>
</div>  
</div>