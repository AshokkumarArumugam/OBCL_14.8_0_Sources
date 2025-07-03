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
**  File Name          : LBCCONDP_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  Last Modified By   : Surya Prabha
**  Last modified on   : 08-OCT-2021
**  Reason             : Code fix to disable margin rate field during amendment
**  Search String      : Bug#33426455 changes
**
**  Last Modified By   : Pallavi R
**  Last modified on   : 23-Dec-2021c-2021
**  Reason             : Code fix to disable margin rate field during amendment
**  Search String      : OBCL_14.5_Supp_SMTB_#33426455 Changes
**
**  Last Modified By   : Mohan Pal
**  Last modified on   : 08-Mar-2022
**  Reason             : Code fix to disable + and - button in 'ALTERNATIVE RISK FREE PREFERENCES' TAB
**  Search String      : Bug#33931359

**  Last Modified By   : Rajni Kumari
**  Last modified on   : 26-Apr-2022
**  Reason             : Bug 34098344 - ADDITIOMRG DELETION AND ADDITION ALLOWED. 
**  Search String      : Bug#34098344

** Changed By         : Abhinav Bhasker
** Date               : 16-Jun-2022
** Change Description : DD Product, Alternate RFR Tab-> Enabled +/- and Duplicate Currency Validation
** Search String      : Bug#34284399

**  Last Modified By   : Sowmya Bitra
**  Last modified on   : 05-Sept-2022
**  Reason             : Code fix to enable amendment of margin rate during unlock before first auth
**  Search String      : Bug#34558019


  Changed By         : Anusha K
  Changed On         : 12-Sep-2023
  Search String      : obcl_14.6_#35789127 changes
  Change Reason      : Changes done to do margin callform repickup when user adds or deletes product in dd product callform
  
  Changed By         : Chandra Achuta
  Changed On         : 10-JAN-2025 
  Change Reason      : Added code to assign the subsys status to R instead of D for FCCRCMNT. 
  Search String      : Bug#37452040_1 
****************************************************************************************************************************/
function fnPostLoad_CVS_DRAWDOWN_PROD_KERNEL(){
	getElementsByOjName('cmdAddRow_BLK_LBTBS_BORR_DRAWDOWN_COMP')[0].style.visibility = 'hidden';
	getElementsByOjName('cmdDelRow_BLK_LBTBS_BORR_DRAWDOWN_COMP')[0].style.visibility = 'hidden';
	
	//BUG#34098344 changes start
	getElementsByOjName('cmdAddRow_BLK_LBTBS_BORROWER_DD_MARGIN')[0].style.visibility = 'hidden';
	getElementsByOjName('cmdDelRow_BLK_LBTBS_BORROWER_DD_MARGIN')[0].style.visibility = 'hidden';
		
	getElementsByOjName('cmdAddRow_BLK_LBTBS_INTERIM_INTEREST_SCH')[0].style.visibility = 'hidden';
	getElementsByOjName('cmdDelRow_BLK_LBTBS_INTERIM_INTEREST_SCH')[0].style.visibility = 'hidden';
	
	getElementsByOjName('cmdAddRow_BLK_LBTBS_TR_DD_PART_RATIO')[0].style.visibility = 'hidden';
	getElementsByOjName('cmdDelRow_BLK_LBTBS_TR_DD_PART_RATIO')[0].style.visibility = 'hidden';
	//BUG#34098344 changes end
	
	//getElementsByOjName('BTN_ADD_BLK_DD_SOFR_PREF')[0].style.visibility = 'hidden';//Bug#33931359 //Commented as part of Bug#34284399 --Multi Currency Maintenance
	//getElementsByOjName('BTN_REMOVE_BLK_DD_SOFR_PREF')[0].style.visibility = 'hidden';//Bug#33931359 //Commented as part of Bug#34284399 --Multi Currency Maintenance
	
	//OBCL_14.5_Supp_SMTB_#33426455 Changes Starts
	/*// Bug#33426455 changes start         	
	addEvent(document.getElementById("BLK_LBTBS_BORROWER_DD_MARGIN"), "onclick", "fnDisablefield()"); 	
	// Bug#33426455 changes end*/
	addEvent(document.getElementById("BLK_LBTBS_BORROWER_DD_MARGIN"), "onkeydown", "fnDisablefield()"); 	
	addEventListener(document.getElementById("BLK_LBTBS_BORROWER_DD_MARGIN"), "blur", "fnDisablefield()"); 		
	//OBCL_14.5_Supp_SMTB_#33426455 Changes Ends
	return true;
}

//obcl_14.6_#35789127 changes starts
function fnPostAddRow_BLK_LBTBS_BORR_DRAWDOWN_PROD_KERNEL(){
	
	var l_statusStr = parent.document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value;
	if (gAction == 'NEW' ||  gAction == 'SUBSYSPKP_NEW'|| ((gAction == 'MODIFY' || gAction == 'SUBSYSPKP_MODIFY') 
					&& (parent.document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'N')))  {
	//parent.document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value = l_statusStr.replace("FCCRCMNT:U", "FCCRCMNT:D"); 	//Bug#37452040_1  Code Commented
	parent.document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value = l_statusStr.replace("FCCRCMNT:U", "FCCRCMNT:R"); 	    //Bug#37452040_1  Code Added
	
	}
	}
	
function fnPostDeleteRow_BLK_LBTBS_BORR_DRAWDOWN_PROD_KERNEL(){
	
	var l_statusStr = parent.document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value;
	if (gAction == 'NEW' ||  gAction == 'SUBSYSPKP_NEW'|| ((gAction == 'MODIFY' || gAction == 'SUBSYSPKP_MODIFY') 
					&& (parent.document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'N')))  {
	//parent.document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value = l_statusStr.replace("FCCRCMNT:U", "FCCRCMNT:D");   //Bug#37452040_1  Code Commented
    parent.document.getElementById("BLK_OLTBS_CONTRACT__SUBSYSSTAT").value = l_statusStr.replace("FCCRCMNT:U", "FCCRCMNT:R"); 	  //Bug#37452040_1  Code Added
	}
	}
//obcl_14.6_#35789127 changes ends		
// Bug#33426455 changes start
function fnDisablefield() 
{
	var noRowsprod = getTableObjForBlock("BLK_LBTBS_BORR_DRAWDOWN_PROD").tBodies[0].rows.length;
	for (var rowIndexprod = 0;rowIndexprod < noRowsprod;rowIndexprod++) 
	{
		var noRowscomp = getTableObjForBlock("BLK_LBTBS_BORR_DRAWDOWN_COMP").tBodies[0].rows.length;
		for (var rowIndexcomp = 0;rowIndexcomp < noRowscomp;rowIndexcomp++) 
		{
			var noRows = getTableObjForBlock("BLK_LBTBS_BORROWER_DD_MARGIN").tBodies[0].rows.length;
			for (var rowIndex = 0;rowIndex < noRows;rowIndex++) 
			{
				if ((gAction == 'MODIFY' || gAction == 'SUBSYSPKP_MODIFY') 
					&& (parent.document.getElementById("BLK_OLTBS_CONTRACT__ONCEAUTH").value == 'Y')) //Bug#34558019
				{					
					fnDisableElement(getElementsByOjName("DEFAULT_MARGIN_RATE")[rowIndex]);
				}
				else if (gAction != 'EXECUTEQUERY')
				{
					if (getElementsByOjName("MARGIN_BASIS_DESC")[rowIndex].value == 'TRANCHE')
					{
						fnDisableElement(getElementsByOjName("DEFAULT_MARGIN_RATE")[rowIndex]);
					}	
				}
		    }
		}
	}    		
}
// Bug#33426455 changes end