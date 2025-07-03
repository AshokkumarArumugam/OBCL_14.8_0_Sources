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
**  File Name          : SMDTXSTS_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
function fnPostExecuteQuery_sum_KERNEL(e) {
    fnShowSummaryData(null, e);
    ModifyFieldAsCheckBox();
    return true;
}

function fnPostRefreshSummaryMain(e) {    
    fnShowSummaryData(null, e);
    ModifyFieldAsCheckBox();
    return true;
}
function ModifyFieldAsCheckBox() {
    var len = document.getElementById("TBL_QryRslts").tBodies[0].rows.length;
    var headers = ["New", "Copy", "Delete", "Closed","Unlock", "Reopen", "Print", "Authorize","Reverse", "Rollover", "Confirm", "Liquidate","Hold", "Template", "View", "Generate"];
    for (i = 0;i < len;i++) {
        for (j = 3;j < 19;j++) {
            if (document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[j]) {
                var indexValue=j-2;
                var result= "CONTROL_"+ indexValue.toString();
                var headerIdx = headers[indexValue-1].toString();
                var blk_header="TH_BLK_SMTBS_TXN_STATUS__"+ result.toString();
                var blk_div_width=document.getElementById(blk_header).getElementsByTagName("DIV")[0].style.width;
                var checkbox_value = document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[j].getElementsByTagName("A")[0].textContent;
                document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[j].outerHTML = '<td name="'+result+'" class="TDgrid" nowrap="nowrap" style="text-align: center;"><div style="width:'+blk_div_width+';"><label class="LBLChkRadSel NewChkbox" for="'+result+'"><span class="LBLinv">'+headerIdx+'</span><input type="checkbox" class="CHKstd" disabled="" label_value="'+headerIdx+'" id="'+result+'" dbt="'+result+'" dbc="'+result+'" name="'+result+'" dtype="VARCHAR2" size="" off="N" on="Y" required="" aria-required="false" title="'+headerIdx+'"><div class="DIVChkRadSel"><span></span></div></label></div></td>'
                if (checkbox_value == 1) {
                    document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[j].getElementsByTagName("INPUT")[0].checked = true;
                }
                else {
                    document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[j].getElementsByTagName("INPUT")[0].checked = false;
                }
            }
        }
    }
    return true;
}