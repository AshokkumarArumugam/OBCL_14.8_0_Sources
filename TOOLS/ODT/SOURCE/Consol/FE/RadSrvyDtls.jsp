<!--
  **
  **
  ** File Name  : RadSrvyDtls.jsp
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
<html lang="en" >
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>		
	    <link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
		<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link> 
    </head>
<body> 

<div   class="Subcontainer" name="SUM1" id="SUM1" TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText"  >
<LABEL class="LBLstd" for="SERVICE_DESC">Service Description</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="SERVICE_DESC" name="SERVICE_DESC" value="" size="40">
</div> 

<!--

<div class="DIVText"  >
<LABEL class="LBLstd" for="TYPE_SYSTEM">Type System</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd"  id="TYPE_SYSTEM" name="TYPE_SYSTEM"  disabled value="" >
		<option value="S">Strong</option> 
		<option value="W">Weak</option>
</SELECT>
</div> 
-->

</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" > 
 
<div class="DIVText"  >
<LABEL class="LBLstd" for="MODULE_ID">Module</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="MODULE_ID" name="MODULE_ID" value="" size="40">
<BUTTON   class="BTNimg"  title="List Of Values" tabindex="-1" id="BTN_LBLCD" onclick="LOV_MODULE.show_lov('MODULE_ID~','frmMnDtls','', 'Module Code', 'Module Code~Module Description', 'Module Code~Module Description',event);">
			<span class="ICOlov"></span></BUTTON>
</div> 
 
 
</fieldset>
<!--End of Form fields column two-->
</div> 
</div>  
 
<div name="DIV_EXTRAD" id="DIV_EXTRAD" class="DIVMultipleBig" style="margin-top:40px;padding-top:0px;position:relative;margin-left:20px; margin-right:20px;width:95%;">	
 

<div class="DIVMultipleBig" style="margin-top:0px;padding-top:0px;position:relative;">
	<div class="DIVmultiplebox">
		    <div class="MEButtons" id="EXTRAD_ME" name="EXTRAD_ME" >
                <div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="Tags">Function id Details</div>
				<BUTTON class="Buttontext" onclick="fn_save_details();fn_srv_populate()" id="BTN1_Details" name="BTN1_Details">Operations</BUTTON>&nbsp;
				<img src="Images/seperator.gif" width="1px" height="13px" alt="">&nbsp;
			    <BUTTON class="BTNimg" title="Add Row" onclick="addNewRow1('EXTRAD');fn_save_details();" name="ADD" id="btnAdd" value="ADD"><img src="Images/Addrow.gif" alt="Add Row"></BUTTON>
				<BUTTON class="BTNimg" title="Remove Row" name="DEL" value="DEL"   id="btnDel" onclick="delRow('EXTRAD');fn_del_records()"><img src="Images/Delrow.gif" alt="Del Row"></BUTTON>
            </div>
		<div class="DIVMultipleBigInner" style="width:100%;height:500px;"  >
			<table id="EXTRAD" name="EXTRAD" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
					<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('EXTRAD','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Function ID</span></th> 
			    	<th scope="col" class="THgrid"><span class="SPNtext">Extensible/Non-Extensible</span></th> 
			    	<th scope="col" class="THgrid"><span class="SPNtext">Type Xsd Name</span></th>   
			    	</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="EXTRAD_TE" name="EXTRAD_TE" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div> 
</div>   

<div name="DIV_NONEXTRAD" id="DIV_NONEXTRAD" class="DIVMultipleBig" style="margin-top:40px;padding-top:0px;position:relative;margin-left:20px; margin-right:20px;width:95%;"> 
</div>      
</body>
</html>