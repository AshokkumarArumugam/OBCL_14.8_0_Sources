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
**  File Name          : LBDPMCFC_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 28-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
****************************************************************************************************************************/


function fnPostUnlock_KERNEL() {
	//debugs("In fnPostUnlock", "A");
        //currAction = 'MODIFY';

		getTableObjForBlock("cmdAddRow_BLK_OLTBS_REUTERS_RATE_UPLOAD").disabled = true; //BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
        	getTableObjForBlock("cmdDelRow_BLK_OLTBS_REUTERS_RATE_UPLOAD").disabled = true;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

	return true;
}
