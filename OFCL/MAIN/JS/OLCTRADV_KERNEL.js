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
**  File Name          : CSCTRADV_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
function fnPostLoad_CVS_ADVICE_KERNEL(screenArgs)
{
	//document.getElementById('BLK_ADVICES__CONREFNO').value=screenArgs['CONTRACT_REF_NO'];
  	document.getElementById("cmdAddRow_BLK_ADVICE_DETAILS").style.visibility="hidden";
    document.getElementById("cmdDelRow_BLK_ADVICE_DETAILS").style.visibility="hidden";
	document.getElementById("BTN_SINGLE_VIEW_BLK_ADVICE_DETAILS").style.visibility="hidden";
	return true;
}
