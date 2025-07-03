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
**  File Name          : LFDTRSRM_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**Changed By         : Gomathi G
**Date               : 08-JUN-2020
**Change Description : To change Date format as per user preference
**Search String      : OBCL_14.3_Support_Bug#31400838 
**Changed By         : Gomathi G
**Date               : 14-MAY-2021
**Change Description : Asigning mainWin.AppDate to format the date as per user preference 
**Search String      : Bug#31400838 
****************************************************************************************************************************/
//OBCL_14.3_Support_Bug#31400838 CHANGES STARTS
function fnPostNew_KERNEL(){
	
	 document.getElementById("BLK_LFTM_TREAS_RATE_MASTER__EFFECTIVEDATE").value = mainWin.AppDate; //Bug#31400838
     fireHTMLEvent(document.getElementById("BLK_LFTM_TREAS_RATE_MASTER__EFFECTIVEDATE"),"onpropertychange");

	return true;
}
//OBCL_14.3_Support_Bug#31400838  CHANGES ENDS