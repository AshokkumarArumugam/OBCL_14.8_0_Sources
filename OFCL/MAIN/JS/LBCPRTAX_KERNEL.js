/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  File Name          : LBCPRTAX_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

  Changed By         : Vineeth T M
  Changed On         : 09-Feb-2021
  Search String      : OBCL_14.4_SUPP#32476729 changes
  Change Reason      : Visit all pages for waive all .
  
**  CHANGE LOG         : RAMYA M
**  Last modified on   : 11-APR-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

****************************************************************************************************************************/

function fnPostLoad_CVS_PARTTAX_KERNEL(){
	document.getElementById("cmdDelRow_BLK_LBTBS_CONTRACT_PARTICIPANT").style.visibility = 'hidden';
	document.getElementById("cmdAddRow_BLK_LBTBS_CONTRACT_PARTICIPANT").style.visibility = 'hidden';
	document.getElementById("cmdAddRow_BLK_LBTBS_CONTRACT_TAX_PREF").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_LBTBS_CONTRACT_TAX_PREF").style.visibility = 'hidden';
	
    getElementsByOjName("cmdAddRow_BLK_TXNRULE")[0].className="BTNhide";
	getElementsByOjName("cmdDelRow_BLK_TXNRULE")[0].className="BTNhide";
	getElementsByOjName("BTN_SINGLE_VIEW_BLK_TXNRULE")[0].className="BTNhide";
    getElementsByOjName("cmdAddRow_BLK_TXNRULE_DETAIL")[0].className="BTNhide";
	getElementsByOjName("cmdDelRow_BLK_TXNRULE_DETAIL")[0].className="BTNhide";
	getElementsByOjName("BTN_SINGLE_VIEW_BLK_TXNRULE_DETAIL")[0].className="BTNhide";
	
	return true;
}

function fnCheckWaiveAll()
{
	//var tableRef =document.getElementById("BLK_TXNRULE");
	var tableRef =getTableObjForBlock("BLK_TXNRULE");//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	//OBCL_14.4_SUPP#32476729 changes start
	//var totalRows = tableRef.tBodies[0].rows.length;
	//var rowRef = tableRef.tBodies[0].rows;
	var totalRows ; 
	//var l_tot = Number(getInnerText(document.getElementById("TotPage__BLK_TXNRULE")));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	var l_tot = getInnerText(getNextSibling(document.getElementById("paging_BLK_TXNRULE_nav_input")));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	l_tot = Number(l_tot.split(' ')[1]);//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	//var l_cur = Number(getInnerText(document.getElementById("CurrPage__BLK_TXNRULE")));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	var l_cur = Number(getInnerText(document.getElementById("paging_BLK_TXNRULE_nav_input")));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	Navigate(N_FIRST,'BLK_TXNRULE');
	for (j=0;j<l_tot;j++){
		totalRows = tableRef.tBodies[0].rows.length;
		//OBCL_14.4_SUPP#32476729 changes end
	if (document.getElementById("BLK_MAINTXN__WAIVER").value)
	{
			for( i=0 ; i <= totalRows ; i++ )
			{	   
			getElementsByOjName("WAIVER")[i].value = true;
			}		
	}	
	else
	{	
	for( i=0 ; i <= totalRows ; i++ )
			{	   
			getElementsByOjName("WAIVER")[i].value = false;
			}
	}
		//OBCL_14.4_SUPP#32476729 changes start
		//if(Number(getInnerText(document.getElementById("CurrPage__BLK_TXNRULE")))==l_tot)//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			if (Number(getInnerText(document.getElementById("paging_BLK_TXNRULE_nav_input")))==l_tot)//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		    break;
		else
		    Navigate(N_NEXT,'BLK_TXNRULE');
	}
	//while(Number(getInnerText(document.getElementById("CurrPage__BLK_TXNRULE")))!=l_cur)//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		while(Number(getInnerText(document.getElementById("paging_BLK_TXNRULE_nav_input")))!=l_cur)//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	    Navigate(N_PREVIOUS,'BLK_TXNRULE');
	//OBCL_14.4_SUPP#32476729 changes end
	return true;
}

