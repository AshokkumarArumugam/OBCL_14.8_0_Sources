/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2018, Oracle and/or its affiliates.
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
**  File Name          : OLDPRDRS_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             :
**
**  Changed By         : Balaji Gopal
**  Date               : 04-Jul-2024
**  Change Description : Have introduced expandcontent function to populate the fetched response.
**  Search String      : Bug#36768706
****************************************************************************************************************************/

function fnCustClassDefault(blockId) {
    var g_prev_gAction = gAction;
    gAction = "DEFAULTCUST";
	appendData();
	fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	var msgStatus=fnProcessResponse();
	if(msgStatus!="SUCCESS"){	   	
		gAction=g_prev_gAction; 
		return false;
	}
	if (msgStatus=='SUCCESS') {
		showProcessMsg = false;
		var l_resp_code = fnProcessResponse();
		gAction = g_prev_gAction;
		return l_resp_code;

	}
}

function fnBrnCcyClassDefault(blockId) {
    var g_prev_gAction = gAction;
    gAction = "DEFAULTBRNCCY";
	appendData();
	fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	var msgStatus=fnProcessResponse();
	if(msgStatus!="SUCCESS"){	   	
		gAction=g_prev_gAction; 
		return false;
	}
	if (msgStatus=='SUCCESS') {
		showProcessMsg = false;
		var l_resp_code = fnProcessResponse();
		gAction = g_prev_gAction;
		return l_resp_code;
	}
}

//Bug#36768706 Starts Here
function fnPostEnterQuery_KERNEL() {
	expandcontent('TAB_CUST');
	expandcontent('TAB_BRN');
	return true;
}
//Bug#36768706 Ends Here