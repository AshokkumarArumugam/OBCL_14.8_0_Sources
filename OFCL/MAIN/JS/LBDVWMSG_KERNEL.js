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
**  File Name          : LBDVWMSG_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Search String      :  
**  Reason             : 
****************************************************************************************************************************/
function fnPostLoad_KERNEL(screenArgs) {
	
	screenArgs = parent.screenArgs;
	
	var parentWin = screenArgs['PRNT_FUNCT'];
	
	if (parentWin == "LBDMSGVW") {
		fnEnterQuery();
		document.getElementById("BLK_DCN__DCN").value = screenArgs['DCN'];
		gAction = "EXECUTEQUERY";
		fnExecuteQuery();
	}
	return true;
	
	

}