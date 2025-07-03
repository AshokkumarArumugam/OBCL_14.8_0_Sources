/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2007 ,2013, Oracle and/or its affiliates.
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
**  File Name          : OLDDSBVW_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

****************************************************************************************************************************/
function fnPostLoad_KERNEL(){
	try{      
		g_prev_gAction = gAction;
		if(parent.screenArgs["ACTION"] == 'LAUNCHDSBVW'){ 
			function_id  = parent.screenArgs['PARENT_FUNC_ID'];			
     		document.getElementById("BLK_MASTER__CONTRACT_REF_NO").value = parent.screenArgs['CONTREF'];   
			gAction = 'EXECUTEQUERY';
			appendData();
			fcjRequestDOM = buildUBSXml();
			fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
			resetIndex();
			var msgStatus = fnProcessResponse();
		}
		parent.screenArgs = undefined;	
	}
	catch(e){
	}
	gAction =g_prev_gAction;
	return true;
}
