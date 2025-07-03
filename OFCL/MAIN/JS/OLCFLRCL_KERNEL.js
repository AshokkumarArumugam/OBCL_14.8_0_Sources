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
**  File Name          : OLCFLRCL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Meha
**  Last modified on   : 12-SEP-2019	
**  Search String      : OBCL_14.4_FLRCLG 
**  Change Description : Floor & Ceiling Changes

****************************************************************************************************************************/
var lAction; 
function fnPostLoad_CVS_FLRCL_KERNEL(screenArgs){	
	if (gAction == 'MODIFY')
	{
	disableForm();
	document.getElementById('cmdAddRow_BLK_CURRENCY_DETAILS').style.visibility='hidden';
	document.getElementById('cmdDelRow_BLK_CURRENCY_DETAILS').style.visibility='hidden';
	document.getElementById('cmdDelRow_BLK_EFFECTIVE_DATE').style.visibility='hidden';
	document.getElementById('cmdAddRow_BLK_EFFECTIVE_DATE').style.visibility='hidden';
	document.getElementById('cmdAddRow_BLK_RATE_DETAILS').style.visibility='hidden';
	document.getElementById('cmdDelRow_BLK_RATE_DETAILS').style.visibility='hidden';	
	}
	return true;
}

