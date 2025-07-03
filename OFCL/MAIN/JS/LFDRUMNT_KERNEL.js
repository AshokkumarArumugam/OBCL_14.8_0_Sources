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
**  Written by         : Avinav Seal
**  Date of creation   : 18-05-2016
**  File Name          : CFDRUMNE_KERNEL.js
**  Purpose            : New CFDRUMNE screen

**  Changed By         : Narendra Dhaker
**  Changed On         : 14-Apr-2021
**  Change Description : ALL CURRENCY TO *.* CHANGES
**  Search String      : Bug#32700428
  
****************************************************************************************************************************/
function fnPostNew_KERNEL()
{
	//disabling all fields on new, till rule ID and rule type is selected.
	disableForm();
	disableTabs('TAB_RATE_DETAILS');
	disableTabs('TAB_TENOR_DETAILS');
	fnEnableElement(document.getElementById('BLK_LFTMS_RULE__RULE'));
	fnEnableElement(document.getElementById('BLK_LFTMS_RULE__TYPE'));
	fnEnableElement(document.getElementById('BLK_LFTMS_RULE__DESCRIPTION'));
}
function fnPostUnlock_KERNEL()
{
	enableForm();
	fnDisableElement(document.getElementById('BLK_LFTMS_RULE__RULE'));
	fnDisableElement(document.getElementById('BLK_LFTMS_RULE__TYPE'));
	fnDisableElement(document.getElementById('BLK_LFTMS_RULE__CURRENCY'));
	fnDisableElement(document.getElementById('BLK_LFTMS_RULE__ACCT_CATEGORY'));
	fnDisableElement(document.getElementById('BLK_LFTMS_RULE__BRANCH'));
	fnDisableElement(document.getElementById('BLK_LFTMS_RULE__ACCOUNT_NO'));
	fnDisableElement(document.getElementById('BLK_LFTMS_RULE__CUST_GROUP'));
	fnDisableElement(document.getElementById('BLK_LFTMS_RULE__CUSTOMER'));
	fnDisableElement(document.getElementById('BLK_LFTMS_BRACKET__BASIS_AMOUNT_TO'));
	fnDisableElement(document.getElementById('BLK_LFTMS_BRACKET_TENOR__TENOR_TO'));
}
function fnPostEnterQuery_KERNEL()
{
	fnEnableElement(document.getElementById('BLK_LFTMS_RULE__RULE'));
	fnEnableElement(document.getElementById('BLK_LFTMS_RULE__TYPE'));
	fnEnableElement(document.getElementById('BLK_LFTMS_RULE__DESCRIPTION'));
}
function fn_rate_change() 
{
	enableForm();
	enableTabs('TAB_RATE_DETAILS');
	enableTabs('TAB_TENOR_DETAILS');
	document.getElementById('BLK_LFTMS_RULE__CURRENCY').value='*.*'; //Bug#32700428
	document.getElementById('BLK_LFTMS_RULE__BRANCH').value='ALL';	
	document.getElementById('BLK_LFTMS_RULE__ACCT_CATEGORY').value='ALL';	
	document.getElementById('BLK_LFTMS_RULE__ACCOUNT_NO').value='ALL';	
	document.getElementById('BLK_LFTMS_RULE__CUST_GROUP').value='ALL';	
	document.getElementById('BLK_LFTMS_RULE__CUSTOMER').value='ALL';
	if(document.getElementById('BLK_LFTMS_RULE__TYPE').value == 'I')	//if interest
	{
		disableForm();
		disableTabs('TAB_RATE_DETAILS');
		disableTabs('TAB_TENOR_DETAILS');
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__RULE'));
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__TYPE'));
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__DESCRIPTION'));
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__BRANCH'));
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__ACCT_CATEGORY'));
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__ACCOUNT_NO'));
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__CUST_GROUP'));
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__CUSTOMER'));
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__CURRENCY'));
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__CASCADE_AMOUNT'));
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__CUSTOMER_TYPE'));
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__RATE_CODE'));
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__RATE_CODE_TYPE'));
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__RATE_CODE_TYPE2'));
		fnEnableElement(document.getElementById('BLK_LFTMS_RULE__RATE_CODE_TYPE3'));
	}	
	if(document.getElementById('BLK_LFTMS_RULE__TYPE').value == 'H')	//if charges/fees
	{
		fnDisableElement(document.getElementById('BLK_LFTMS_RULE__TENOR_BASIS'));
		fnDisableElement(document.getElementById('BLK_LFTMS_RULE__TIERED_TENOR'));
		fnDisableElement(document.getElementById('BLK_LFTMS_RULE__CUMULATIVE'));
		fnDisableElement(document.getElementById('BLK_LFTMS_RULE__CASCADE_AMOUNT'));
	}		
}
