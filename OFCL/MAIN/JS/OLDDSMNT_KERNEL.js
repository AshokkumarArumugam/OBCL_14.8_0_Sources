/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2016, Oracle and/or its affiliates.
**  All rights reserved.
**  
**  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle and/or its affiliates.
**  
**  Oracle Financial Services Software Limited.
**  Oracle Park, Off Western Express Highway,
**  Goregaon (East),
**  Mumbai - 400 063,
**  India.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : LDDDSMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 23-Feb-2023
**  Reason             : REDWOOD_ADOPTION changes
**  Search String      : Bug#34958820
****************************************************************************************************************************/
function fnchecker(){ 

		//if(document.getElementById('BLK_TCTMS_DISCLOSURE__UCCCODE').checked==false) //Bug#34958820 changes
		if(document.getElementById('BLK_TCTMS_DISCLOSURE__UCCCODE').value==false) //Bug#34958820 changes
		{
		document.getElementById('BLK_TCTMS_DISCLOSURE__BTNUCC').disabled=true;
	
		}
 
		else		
		{
		document.getElementById('BLK_TCTMS_DISCLOSURE__BTNUCC').disabled=false;
		}
		
}


function fnpopUCC(){

//if(document.getElementById('BLK_TCTMS_DISCLOSURE__UCCCODE').checked==true)   //Bug#34958820 changes
if(document.getElementById('BLK_TCTMS_DISCLOSURE__UCCCODE').value==true)       //Bug#34958820 changes
{
   var e = mainWin.event || e;
	currRow = getRowIndex(e);
	fnSubScreenMain('OLDDSMNT', 'OLDDSMNT', 'CVS_UCC',false);

	
	}
}
