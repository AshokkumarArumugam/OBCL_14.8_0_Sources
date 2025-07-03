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
**  File Name          : MSDNDLNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOGMESSAGE
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

function fnPostLoad_KERNEL(screenArgs) {
	g_Prev_gAction = gAction;
	document.getElementById("BLK_MSVW_DLY_MSG_NON_DLVRY_NOTIF__DCN").value = parent.screenArgs['DCN'];
	var l_sub_screen = parent.screenArgs['SUB_SCREEN'];
	if (l_sub_screen == 'Y') {
		gAction = 'EXECUTEQUERY';
		fnExecuteQuery();
	}
	DisableToolbar_buttons('ENTERQUERY');
	DisableToolbar_buttons('EXECUTEQUERY');
	parent.screenArgs['SUB_SCREEN'] = 'N';
	parent.screenArgs['DCN'] = '';
	gAction = g_Prev_gAction;
	return true;
}