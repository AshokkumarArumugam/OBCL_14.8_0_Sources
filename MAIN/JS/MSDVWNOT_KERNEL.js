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
**  File Name          : MSDVWNOT_KERNEL.js
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
	//29606002 changes starts		
	document.getElementById("BLK_MSGDTLS__DCN").value = parent.screenArgs['DCN'];
	g_Prev_gAction = gAction;
	var l_sub_screen = parent.screenArgs['SUB_SCREEN'];
	if (l_sub_screen == 'Y') {
		gAction = 'EXECUTEQUERY';
		fnExecuteQuery();
	}
	var msg_type = parent.screenArgs['MSG_TYPE'];

	if (msg_type == 'NON_DELIVERY_WARNING'){
		//29606002_1 changes starts
		/*fnDisableElement(document.getElementById('BLK_MSGDTLS__ACK_NACK_MSG'));
		fnDisableElement(document.getElementById('BLK_MSGDTLS__DELIVERY_NOTIF_MSG'));
		fnDisableElement(document.getElementById('BLK_MSGDTLS__MESSAGE'));
		fnEnableElement(document.getElementById('BLK_MSGDTLS__NON_DELIVERY_MSG'));
		document.getElementById('BLK_MSGDTLS__ACK_NACK_MSG').value = '';
		document.getElementById('BLK_MSGDTLS__DELIVERY_NOTIF_MSG').value = '';*/
		document.getElementById('BLK_MSGDTLS__ACK_NACK_MSG').style.display = "none";
		document.getElementById('BLK_MSGDTLS__DELIVERY_NOTIF_MSG').style.display = "none";		
		document.getElementById('BLK_MSGDTLS__ACK_NACK_MSG_LBL').style.display = "none";
		document.getElementById('BLK_MSGDTLS__DELIVERY_NOTIF_MSG_LBL').style.display = "none";
		//29606002_1 changes ends
	}
	else if(msg_type == 'ACK_NAK'){
		//29606002_1 changes starts
		/*fnDisableElement(document.getElementById('BLK_MSGDTLS__NON_DELIVERY_MSG'));
		fnDisableElement(document.getElementById('BLK_MSGDTLS__DELIVERY_NOTIF_MSG'));
		fnDisableElement(document.getElementById('BLK_MSGDTLS__MESSAGE'));
		fnEnableElement(document.getElementById('BLK_MSGDTLS__ACK_NACK_MSG'));
		document.getElementById('BLK_MSGDTLS__NON_DELIVERY_MSG').value = '';
		document.getElementById('BLK_MSGDTLS__DELIVERY_NOTIF_MSG').value = '';*/
		document.getElementById('BLK_MSGDTLS__NON_DELIVERY_MSG').style.display = "none";
		document.getElementById('BLK_MSGDTLS__DELIVERY_NOTIF_MSG').style.display = "none";
		document.getElementById('BLK_MSGDTLS__NON_DELIVERY_MSG_LBL').style.display = "none";
		document.getElementById('BLK_MSGDTLS__DELIVERY_NOTIF_MSG_LBL').style.display = "none";
		//29606002_1 changes ends
	}
	else if(msg_type == 'DELIVERY_NOTIFY'){
		//29606002_1 changes starts
		/*fnDisableElement(document.getElementById('BLK_MSGDTLS__ACK_NACK_MSG'));
		fnDisableElement(document.getElementById('BLK_MSGDTLS__NON_DELIVERY_MSG'));
		fnDisableElement(document.getElementById('BLK_MSGDTLS__MESSAGE'));
		fnEnableElement(document.getElementById('BLK_MSGDTLS__DELIVERY_NOTIF_MSG'));
		document.getElementById('BLK_MSGDTLS__ACK_NACK_MSG').value = '';
		document.getElementById('BLK_MSGDTLS__NON_DELIVERY_MSG').value = '';*/
		document.getElementById('BLK_MSGDTLS__ACK_NACK_MSG').style.display = "none";
		document.getElementById('BLK_MSGDTLS__NON_DELIVERY_MSG').style.display = "none";
		document.getElementById('BLK_MSGDTLS__ACK_NACK_MSG_LBL').style.display = "none";
		document.getElementById('BLK_MSGDTLS__NON_DELIVERY_MSG_LBL').style.display = "none";
		//29606002_1 changes ends
	}
	else if(msg_type == 'MSG'){
		fnDisableElement(document.getElementById('BLK_MSGDTLS__ACK_NACK_MSG'));
		fnDisableElement(document.getElementById('BLK_MSGDTLS__NON_DELIVERY_MSG'));
		fnDisableElement(document.getElementById('BLK_MSGDTLS__DELIVERY_NOTIF_MSG'));
		fnEnableElement(document.getElementById('BLK_MSGDTLS__MESSAGE'));
	}
	DisableToolbar_buttons('ENTERQUERY');
	DisableToolbar_buttons('EXECUTEQUERY');
	parent.screenArgs['SUB_SCREEN'] = 'N';
	gAction = g_Prev_gAction;
	//29606002 changes ends
	return true;
}