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
**  File Name          : TADRULES_SYS.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

function fnscrcvstwo(){
	var e = mainWin.event || e;
	currRow = getRowIndex(e);	
	fnSubScreenMain('TXDRULES', 'TXDRULES', 'CVS_TWO',false);	
}
function fnPostUnlock_KERNEL() {
	 fnDisableElement(document.getElementById("BLK_TATMS_RULE_EFFECTIVE_DATE"));
	 	 fnDisableElement(document.getElementById("BLK_TATMS_RULE_TAX_GROUP"));
	 		 	 fnDisableElement(document.getElementById("BLK_TATMS_RULE_CUMULATIVE"));
		 	 	 fnDisableElement(document.getElementById("BLK_TATMS_RULE_CUMULATIVE"));
		 	 	 fnDisableElement(document.getElementById("BLK_TATMS_RULE_METHOD"));

		return true;
		}
