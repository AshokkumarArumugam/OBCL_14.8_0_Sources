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
**  File Name          : OLDTRONL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
****************************************************************************************************************************/
//ChatBot Integration start
function fnPostLoad_Sum_KERNEL(e){
	try{
		var branch=mainWin.chatBotArray.respVal.trim();
		if(branch==='current'){
			branch=mainWin.CurrentBranch;
		}
		branch=branch.toUpperCase();document.getElementById("BLK_OLVW_PENDING_ITEMS__BR").value="%"+branch+"%";
		fnExecuteQuery_sum("Y", event);
	}catch(e){
		
	}finally{
		mainWin.chatBotArray.frmChatBot="";
	}
}
//ChatBot Integration end
  