<!--
  **
  **
  ** File Name  : RadLovGrid.jsp
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
<span class="Subheader"><h2>List Of Values Summary</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1"  id="FNADD" name="FNADD" onclick="fnadd('LOV','1')"><img src="Images/add1.gif" alt="Add Lov" ></BUTTON>
</span>
</div>
 

<div class="DIVMultipleBig" style="position:relative; margin-left:20px; margin-right:20px; width:AUTO;">
	<div class="DIVmultiplebox">
		<div class="DIVMultipleBigInner" style="height:500px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);" id="lovgrid" name="lovgrid" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="NO" VIEW="YES" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			   <thead>
					<tr>
						<th scope="col" class="THgrid"><span class="SPNtext">Lov Name</span></th>
						<th scope="col" class="THgrid"><span class="SPNtext">Lov Query</span></th> 
					</tr>
				</thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" id="lovgrid_TE" name="lovgrid_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>  