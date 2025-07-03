/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software System and is copyrighted by 
**  Oracle Financial Services Software Limited.
**  
**  All rights reserved.  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle Financial Services Software Limited.
**  
**  Oracle Financial Services Software Limited.
**  10-11, SDF I, SEEPZ, Andheri (East),
**  Mumbai - 400 096.
**  India.
**  
**  Copyright (c) 2008 - 2014 by Oracle Financial Services Software Limited. All rights reserved.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : CSDRHCLM_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  Last Modified By   :Rashmi B V 
**  Last modified on   :17-02-23 
**	Description        :Changes W.R.T REDWOOD ADOPTION
**	Search String      :Bug#34958820_REDWOOD_ADOPTION 
****************************************************************************************************************************/

/*
 * Called to perform some neccessary operation after the fnCopy() Action event
 * Specific to the functionid 
 */
function fnPostCopy_KERNEL() {
	//document.getElementsByName("CLASDESC")[0].value = "";
	//document.getElementsByName("MODULEDESC")[0].value = "";
	getElementsByOjName("CLASDESC")[0].value = ""; //Bug#34958820_REDWOOD_ADOPTION 
	getElementsByOjName("MODULEDESC")[0].value = ""; //Bug#34958820_REDWOOD_ADOPTION 

	debugs("In fnPostCopy", "A");
}

/*
 * Called to perform some neccessary operation after the New Action event
 * Specific to the functionid 
 */
function fnPostNew_KERNEL()  {
	
	debugs("In fnPostNew", "A");
	//document.getElementsByName("CLASCD")[0].focus();
	getElementsByOjName("CLASCD")[0].focus(); //Bug#34958820_REDWOOD_ADOPTION 
	debugs("In fnPostNew called focus() ", "Focused on CLASCD");
	return true;
}
