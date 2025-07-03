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
**  File Name          : LBCENTTY_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  SRF : 27322722
**  Purpose : Added Fetch button for LS rate fixing
**  Search string : OBCL_27322722

**  CHANGE LOG         : Arunprsath
**  Last modified on   : 27-Jul-2023
**  Reason             : Drawdown SSI change - Disabling SSI mnemonic during camd action 
**  SEARCH STRING      : Bug#35647444
****************************************************************************************************************************/
//Bug#35647444 start
var gParentFid;
var gAuthStat;
function fnPostLoad_CVS_ENTITYLB_KERNEL(){
	gParentFid = parent.screenArgs['FID'];	
	gAuthStat  = parent.screenArgs['AUTH_STAT'];
    if ((gAction == 'MODIFY' || gAction == 'SUBSYSPKP_MODIFY') && (gParentFid == 'LBDDDONL') && (gAuthStat =='Y'))
		{

		      fnDisableElement(document.getElementById("BLK_LBTBS_BORR_SETTLE_CURR_DET__SSIMNEMO"));			 	
		}
	return true;
}
//Bug#35647444 End