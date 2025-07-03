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
**  File Name          : SMDCSDDB_KERNEL.js
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
    if(document.getElementById("BLK_B1__CUSTTYPE").value == "I"){
        document.getElementById("BLK_B1__CUSTTYPE").value = "Individual";
    }else if(document.getElementById("BLK_B1__CUSTTYPE").value == "C"){
        document.getElementById("BLK_B1__CUSTTYPE").value = "Corporate";
    }else if(document.getElementById("BLK_B1__CUSTTYPE").value == "B"){
        document.getElementById("BLK_B1__CUSTTYPE").value = "Bank";
    }
    return true;
}