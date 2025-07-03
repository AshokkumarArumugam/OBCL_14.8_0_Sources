/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2021, Oracle and/or its affiliates.
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
**  File Name          : IFDOBERL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**	Modified By   :	Aiswarya Donthi
** 	Modified on   : 7-Feb-2022
** 	Description   : Redwood Changes done 
** 	Search String : redwood_changes

****************************************************************************************************************************/
function fnPostLoad_KERNEL(){
var parentWin = fnGetParentWin();
  if (parent.screenArgs!=undefined && parent.screenArgs['ACTION']=='LAUNCH')
    {
	fnEnterQuery();
getElementsByOjName("MSGID")[0].value = parent.screenArgs['MSGID'];  //redwood_changes
getElementsByOjName("SEQ_NO")[0].value = parent.screenArgs['PROCESSSEQNO'];  //redwood_changes
gAction = 'EXECUTEQUERY';
 appendData();
 fnExecuteQuery();
parent.screenArgs = undefined;
showToolbar('', '', '', '');
}
return true;
 }