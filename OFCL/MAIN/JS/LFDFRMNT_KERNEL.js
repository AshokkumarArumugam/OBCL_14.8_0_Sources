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
**  File Name          : CFDFRMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

 function fnPostNew_KERNEL() {
	if (functionId == 'LFDFRMNT')
	{
	fnDisableElement(document.getElementById("BLK_LFTMS_FEE_COMPONENT__BTN_MEDIA"));
	}
	if (functionId == 'LDDFRMNT') 
	{
	 fnDisableElement(document.getElementById("BLK_LFTMS_FEE_COMPONENT__RATEORAMT"));
     fnDisableElement(document.getElementById("BLK_LFTMS_FEE_COMPONENT__COMPTYPE"));   
	}
}
		
