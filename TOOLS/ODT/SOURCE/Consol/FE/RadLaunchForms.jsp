<!--
  **
  **
  ** File Name  : RadLaunchForms.jsp
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
<span class="Subheader"><h2>Launch Form Details</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo" align="right" onclick="showData('');PopulateDataSourceForSummary('S');"><img src="Images/rollback.gif" alt="Roll Back" >
</BUTTON>
</span>
</div>
 
 
<div class="DIVMultipleBig" style="position:relative; margin-left:20px; margin-right:20px; width:AUTO;" id="dataContainer_BLK_CONTRACT_MULTITNR" name="dataContainer" >
		<div class="MEButtons">
			<BUTTON id="CallFrmArg"  name="CallFrmArg" onclick="fnCallFrmArgs('ScrArgs','lfmform')" class="Buttontext">Screen Arguments</BUTTON>
			<BUTTON title="Add Row"  id="ADD" name="ADD" onclick="addNewRow('lfmform')" class="BTNimg"><span class="ICOadd" tabindex="-1"><span class="LBLinv">Add Row</span></span></BUTTON>
			<BUTTON title="Delete Row"  id="DEL" name="DEL" onclick="delRow('lfmform')" class="BTNimg"><span class="ICOremove" tabindex="-1"><span class="LBLinv">Delete Row</span></span></BUTTON>
		</div>	    	 
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:300px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="lfmform" name="lfmform" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="NO" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			       	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('lfmform','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Function ID</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Active</span></th>  
			    	<th scope="col" class="THgrid" colspan="4"><span class="SPNtext" >Type</span></th>
					<th scope="col" class="THgrid" style="background-color:#e6f2f4;display:none"></th>
					<th scope="col" class="THgrid" style="background-color:#e6f2f4;display:none"></th>
					<th scope="col" class="THgrid" style="background-color:#e6f2f4;display:none"></th> 
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div> 
</div>