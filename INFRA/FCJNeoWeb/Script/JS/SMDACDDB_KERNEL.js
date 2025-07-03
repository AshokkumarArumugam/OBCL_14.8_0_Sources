/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software System and is copyrighted by 
**  Oracle Financial Services Software Limited.
**  
**  All rights reserved.  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle Financial Services Software Limited.
**  
**  Oracle Financial Services Software Limited.
**  10-11, SDF I, SEEPZ, Andheri (East),
**  Mumbai - 400 096.
**  India.
**  
**  Copyright (c) 2008 - 2012 by Oracle Financial Services Software Limited. All rights reserved.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : SMDACDDB_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
strScreenName = "CVS_DB";

function fnPostLoad_KERNEL(){
    setInnerText(document.getElementById("BLK_B1__PRODUCT_LIST"), mainWin.getItemDesc("LBL_START"));
    var accType = document.getElementById("BLK_B1__ACCOUNT_TYPE").value;
    if(accType == "J"){
        accType = mainWin.getItemDesc("LBL_JOINT");
    }else if(accType == "S"){
        accType = mainWin.getItemDesc("LBL_SINGLE");
    }else if(accType == "L"){
        accType = mainWin.getItemDesc("LBL_LOAN");
    }
    document.getElementById("BLK_B1__ACCOUNT_TYPE").value = accType;
    return true;
}