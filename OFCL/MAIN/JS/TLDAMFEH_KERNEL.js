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
**  File Name          : TLDAMFEH_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/


function fnPostLoad_CVS_AMEFEHST_KERNEL(screenArgs)
{

document.getElementById('cmdAddRow_BLK_AMNDFEHSTRY').style.visibility='hidden';
document.getElementById('cmdDelRow_BLK_AMNDFEHSTRY').style.visibility='hidden';

document.getElementById('BLK_MASTERFEE__AMENDREFNO').value=getTableObjForBlock("BLK_AMNDFEHSTRY").tBodies[0].rows[0].cells[1].getElementsByTagName("oj-input-text")[0].value;  //Redwood_Changes
var rowLength=getTableObjForBlock("BLK_AMNDFEHSTRY").tBodies[0].rows.length;
	 
return true;
}

function fnPostLaunchForm_CVS_AMEFEHST_KERNEL() {
    document.getElementById('cmdAddRow_BLK_AMNDFEHSTRY').style.visibility='hidden';
    document.getElementById('cmdDelRow_BLK_AMNDFEHSTRY').style.visibility='hidden';    
    document.getElementById('BLK_MASTERFEE__AMENDREFNO').value=getTableObjForBlock("BLK_AMNDFEHSTRY").tBodies[0].rows[0].cells[1].getElementsByTagName("oj-input-text")[0].value;  //Redwood_Changes
    var rowLength=getTableObjForBlock("BLK_AMNDFEHSTRY").tBodies[0].rows.length;             
    return true;
}