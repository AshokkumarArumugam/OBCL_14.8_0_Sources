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
**  File Name          : TLDPOMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**	Changed By         : Jayaram Namburaj
**	Date               : 16-DEC-2019
**	Change Description : SLT:Primary Delayed Compensation
**  Search String      : SFRNUM:29959798 OBCL_14.4_Primary_Delayed_Compensation
****************************************************************************************************************************/

function fnPostNew_KERNEL() {
	document.getElementById("BLK_TLTMS_PORTFOLIO__COSTING_METHOD").value = "W";
	document.getElementById("BLK_TLTMS_PORTFOLIO__INTERFACE_TYPE").value = "I";
	document.getElementById("BLK_TLTMS_PORTFOLIO__REVAL_REQD").value = "Y";
	document.getElementById("BLK_TLTMS_PORTFOLIO__REVAL_FREQUENCY").value = "D";
	
	return true;
}

/* Added for SFR#29959798 OBCL_14.4_Primary_Delayed_Compensation - Start */
function fnPostCopy_KERNEL() 
{
	document.getElementById("BLK_TLTMS_PORTFOLIO__LINKED_UNFRONTED_PORTFOLIO").value = "";
	return true;
}
/* Added for SFR#29959798 OBCL_14.4_Primary_Delayed_Compensation - End */

