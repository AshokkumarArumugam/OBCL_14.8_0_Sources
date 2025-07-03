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
**  File Name          : LDRPCALC_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
function fnPostAddRow_BLK_REPORT_MULTIPLE_KERNEL(arg) {
    var blockId = "BLK_REPORT_MULTIPLE";
    var length = document.getElementById(blockId).tBodies[0].rows.length;
    var currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));
    var pgSize = getPgSize(blockId);
    /*if (length > 0 && length != '' && length != "") {
        for (i = 0; i < length; i++) {
            document.getElementById(blockId).tBodies[0].rows[i].cells[7].getElementsByTagName("INPUT")[0].value = (currPg - 1) * pgSize + i + 1;
        }
    }*/
    return true;
}
function fnPostDeleteRow_BLK_REPORT_MULTIPLE(arg) {
    var blockId = "BLK_REPORT_MULTIPLE";
    var length = document.getElementById(blockId).tBodies[0].rows.length;
    var currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));
    var pgSize = getPgSize(blockId);
    /*if (length > 0 && length != '' && length != "") {
        for (i = 0; i < length; i++) {
            document.getElementById(blockId).tBodies[0].rows[i].cells[7].getElementsByTagName("INPUT")[0].value = (currPg - 1) * pgSize + i + 1;
        }
    }*/
    return true;
}
