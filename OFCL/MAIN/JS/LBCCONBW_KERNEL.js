/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2018, Oracle and/or its affiliates.
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
**  File Name          : LBCCONBW_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Modified By   : Divya J
**  Modified On   : 27-Sep-2018
**  Reason        : ISSUE WITH SSI MNEMONIC
**	Search String : OBCL_14.2_Bug#28384204
**
**  Modified By   : Akhila Samson
**  Modified On   : 28-Oct-2020
**  Reason        : Unable to delete the Borrower records
**	Search String : Bug#31976285
****************************************************************************************************************************/


function fnPostAddRow_BLK_SYND_BORR_LIM_KERNEL(){
	var cnt = getTableObjForBlock('BLK_SYND_BORR_LIM').tBodies[0].rows.length;
	for(var i=1;i<=cnt;i++){
	   if (i == 1){
	        var blkfld = 'BLK_SYND_BORR_LIM__CCY_CODE';
	    }
		else{
	       var blkfld = 'BLK_SYND_BORR_LIM__CCY_CODERC'.concat(i-1);
	}
	document.getElementById(blkfld).value = document.getElementById('BLK_HEADER_CONBW__CONTRACT_CCY').value;
	}
	return true;
}

//OBCL_14.2_Bug#28384204 Starts 
var l_functionId;



function fnPostLoad_CVS_LBCCONBW_KERNEL(screenArgs){
	
	l_functionId = parent.uiXML;
	
	if (l_functionId == 'FCDTRONL')
	{
		document.getElementById('BLK_HEADER_CONBW__MODULE_CODE').value = 'FC';
	}else if (l_functionId == 'LBDTRONL')
	{
		document.getElementById('BLK_HEADER_CONBW__MODULE_CODE').value = 'LB';
	}
	return true;
}
//OBCL_14.2_Bug#28384204 Ends

//Bug#31976285 starts
function fnPostDeleteRow_BLK_CONBW_KERNEL()
{
	showTabData(strHeaderTabId);
	return true;
}
//Bug#31976285 Ends