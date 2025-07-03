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
**  File Name          : LFCFRMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Satheesh Seshan
**  Last modified on   : 24-Dec-2024
**  Full Version       : Created this kernel JS as part of 37147325.
**  Reason             : To hide the +- sign during ROLLOVER action from LBDRLOVR or OLDRLOVR.

****************************************************************************************************************************/
var parentFunctionId;
function fnPostLoad_CVS_FEERULEMAINT_KERNEL() {
try{   
parentFunctionId = parent.functionId;
}catch(e){}

if ((parentFunctionId =='OLDRLOVR' ||parentFunctionId =='LBDRLOVR') && gAction == 'ROLLOVER')	
{

getElementsByOjName("BTN_ADD_BLK_LFTMS_FEE_COMPONENT_MULTI")[0].className="BTNhide";
getElementsByOjName("BTN_REMOVE_BLK_LFTMS_FEE_COMPONENT_MULTI")[0].className="BTNhide";
getElementsByOjName("cmdAddRow_BLK_LFTMS_FEE_CCY")[0].className="BTNhide";
getElementsByOjName("cmdDelRow_BLK_LFTMS_FEE_CCY")[0].className="BTNhide";
getElementsByOjName("cmdAddRow_BLK_LFTMS_FEE_CCY_EFFDATE")[0].className="BTNhide";
getElementsByOjName("cmdDelRow_BLK_LFTMS_FEE_CCY_EFFDATE")[0].className="BTNhide";
getElementsByOjName("cmdAddRow_BLK_LFTMS_FEE_RATE")[0].className="BTNhide";
getElementsByOjName("cmdDelRow_BLK_LFTMS_FEE_RATE")[0].className="BTNhide";

}
return true;

}
