/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  File Name          : OLQAHIS_KERNEL.js
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
function fnPostLoad_KERNEL(){
var parentWin = fnGetParentWin();
  if (parent.screenArgs!=undefined && parent.screenArgs['ACTION']=='LAUNCH')
    {
	fnEnterQuery();
//document.getElementsByName("MSGID")[0].value = parent.screenArgs['MSGID'];
//document.getElementsByName("PROCESS_SEQ_NO")[0].value = parent.screenArgs['PROCESSSEQNO'];	
getElementsByOjName("MSGID")[0].value = parent.screenArgs['MSGID']; //Bug#34958820_REDWOOD_ADOPTION
getElementsByOjName("PROCESS_SEQ_NO")[0].value = parent.screenArgs['PROCESSSEQNO']; //Bug#34958820_REDWOOD_ADOPTION
gAction = 'EXECUTEQUERY';
 appendData();
 fnExecuteQuery(); 
parent.screenArgs = undefined;
showToolbar('', '', '', '');
}
return true;
 }