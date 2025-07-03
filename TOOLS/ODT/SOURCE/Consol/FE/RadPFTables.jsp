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
<span class="Subheader"><h2>Purge Table Details</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');"><img src="Images/rollback.gif" alt="Roll Back"></BUTTON>
</span>
</div>   

<div id="DIV_PURGE_TABLE_DETAILS" name="DIV_PURGE_TABLE_DETAILS" class="DIVMultipleBig" style="position:relative; margin-top:40px; margin-left:20px; margin-right:20px; width:AUTO;">
		<div class="MEButtons" id="PF_TABLES_ME" name="PF_TABLES_ME">
			<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="TABLES_ME">Purge Table Details</div>
			<BUTTON id="tf_Refresh" name="tf_Refresh"  onclick="fn_Refresh_tabledetails()" title="Table Refresh" class="Buttontext">Repopulate</BUTTON>
			<BUTTON id="tf_details" name="tf_details"  onclick="FnTABLEDetails('PF_TABLES')" title="Table Details" class="Buttontext">Details</BUTTON>
            <BUTTON class="BTNimg" title="Add Row" onclick="addNewRow('PF_TABLES');" name="ADD" value="ADD"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
			<BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL"  onclick="fndeltabfil();delRow('PF_TABLES')"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>&nbsp;&nbsp;
    	</div>
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:500px;">
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="PF_TABLES" name="PF_TABLES" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('PF_TABLES','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
				    <th scope="col" class="THgrid"><span class="SPNtext">Table Name</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Master</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Parent</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Relation With Parent</span></th> 
			    	<th scope="col" class="THgrid"><span class="SPNtext">Key Fields</span></th> 
			    	<th scope="col" class="THgrid"><span class="SPNtext">Key Field Data Types</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Archiving Not Required</span></th> 
			    	<th scope="col" class="THgrid"><span class="SPNtext">Exclude from Purging</span></th> 
			    	<th scope="col" class="THgrid" colspan="4"><span class="SPNtext">History Table Name</span></th> 
			    	</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="PF_TABLES_TE" name="PF_TABLES_TE" colspan="15"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div> 