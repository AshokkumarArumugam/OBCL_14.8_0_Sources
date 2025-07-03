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
**  File Name          : TLCMEMUP_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Arunprasath
**  Last modified on   : 12-Nov-2021
**  Full Version       : 
**  Reason             : SOFR Changes

**  CHANGE LOG
**  Last Modified By   : Arunprasath
**  Last modified on   : 27-Nov-2021
**  Full Version       : 
**  Reason             : SOFR Changes
**  Search String      : OBCL_14.5_SLT_DCF_FEE_SOFR

****************************************************************************************************************************/

function  fnPostLoad_CVS_TLCFMEMO_KERNEL(){
	fnEnableIntDetBtn();
	//OBCL_14.5_SLT_DCF_FEE_SOFR start
	fnClassDefault('BLK_TLTBS_FMEM_MASTER');//Master block
	//OBCL_14.5_SLT_DCF_FEE_SOFR end
	return true;
}

function fnInTab_TAB_TRADE_DETAILS_KERNEL() { 
	fnEnableIntDetBtn()
		return true;
}

function FN_DEFAULT()
{    
 fnSubScreenMain('TLCFMEMO', 'TLCFMEMO', 'CVS_INT_DTLS', false);
 debugs("gAction");
 return true; 
}

function fnEnableIntDetBtn(){
	var noRows = getTableObjForBlock("BLK_TLTBS_FMEM_PRICE_DETAIL").tBodies[0].rows.length;
	for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
		fnEnableElement(getElementsByOjName("BTNDEFAULT")[rowIndex]);					
    }
}