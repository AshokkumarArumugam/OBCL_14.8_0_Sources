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
**  File Name          : LFCLICCF_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
function fnMarginBasis(){
	try {
        var x = getElementsByOjName("MARGINBASIS").length;
        for (var index = 0; index < x; index++) {
               if (getTableObjForBlock("BLK_MARGIN_ICCF").tBodies[0].rows[index].cells[6].getElementsByTagName("oj-select-single")[0].value == "D") {
					//getElementsByOjName("BASISAMTTAG")[index].options[2].selected = true; //Basic Amount Tag will be "User Input"
					getElementsByOjName("BASISAMTTAG")[index].value = 'U';
                }
				else{
					//getElementsByOjName("BASISAMTTAG")[index].options[1].selected = true; //Basic Amount Tag will be "Tranche Outstanding"
					getElementsByOjName("BASISAMTTAG")[index].value = 'T';
				}
				
            }
    } catch (e) {}
    return true;
}
function fnPostAddRow_BLK_MARGIN_ICCF_KERNEL() {
    var blockId = "BLK_MARGIN_ICCF";
    var length = getTableObjForBlock(blockId).tBodies[0].rows.length;
   // var currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));
	var currPg = Number(getInnerText(document.getElementById("paging_" + blockId + "_nav_input")));
    var pgSize = getPgSize(blockId);
    if (length > 0 && length != '' && length != "") {
        for (var idx = 0;idx < length;idx++) {
            getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value = (currPg - 1) * pgSize + idx + 1;
            displayFormattedNumber(getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0]);
        }
    }
	return true;
}

function fnPostDeleteRow_BLK_MARGIN_ICCF_KERNEL() {
    var blockId = "BLK_MARGIN_ICCF";
    var length = getTableObjForBlock(blockId).tBodies[0].rows.length;
    //var currPg = Number(getInnerText(document.getElementById("CurrPage__" + blockId)));
    var currPg = Number(getInnerText(document.getElementById("paging_" + blockId + "_nav_input")));
    var pgSize = getPgSize(blockId);
    var currRow = 0
    if (length > 0 && length != '' && length != "") {
        for (var idx = 0;idx < length;idx++) {
            getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0].value = (currPg - 1) * pgSize + idx + 1;
            displayFormattedNumber(getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[3].getElementsByTagName("oj-input-text")[0]);
        }
    }
	return true;
}