/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2014, Oracle and/or its affiliates.
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
**  Written by         : Neeraj.Krishna
**  Date of creation   : 03-AUG-2016
**  File Name          : OLDIRRNQ_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  SFR Number         :25038551
**  Changed By         :Neeraj.krishna
**  Change Description : Description fields after execute query
**  Search String     : OFCL12.3_25038551 changes
***************************************************************************************************************************
*/
function fnPreAuthorize_KERNEL() {
    authFunction   = 'OLDIRAUT';
    authUixml      = 'OLDIRAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['OLDIRAUT']="KERNEL";
    ArrPrntFunc['OLDIRAUT'] = "";
    ArrPrntOrigin['OLDIRAUT'] ="";
    return true;
}

function fnPostAuthorize_KERNEL() {
	gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
	debugs("In fnPostAuthorize ", "A");
}
function fnPostExecuteQuery_KERNEL() {
if (document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__AUTHSTATUS").value == 'A') //OFCL12.3_25038551 changes
{
DisableToolbar_buttons("Authorize");
DisableToolbar_buttons("Delete");
}
return true;
}
function fnPostLoad_KERNEL(){   
document.getElementById("cmdAddRow_BLK_OLTBS_CONTRACT_REVISION_SCH").style.visibility = 'hidden';
document.getElementById("cmdDelRow_BLK_OLTBS_CONTRACT_REVISION_SCH").style.visibility = 'hidden';

	return true;
}