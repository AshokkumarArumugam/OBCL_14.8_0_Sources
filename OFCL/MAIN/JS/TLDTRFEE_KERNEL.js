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
 **  File Name          : TLDTRFEE_KERNEL.js
 **  Purpose            :
 **  Called From        :
 **
 **  CHANGE LOG
 **  Last Modified By   :
 **  Last modified on   :
 **  Full Version       :
 **  Reason             :
 ****************************************************************************************************************************/
function fnPostExecuteQuery_KERNEL(){
    addEvent(document.getElementById("BLK_TLTBS_CONTRACT_FEE_MASTER"), "onclick", "fnDisableChecks()");
    fnDisableChecks();
    return true;
}

function fnPostLaunchForm_CVS_FEE_KERNEL() {
    addEvent(document.getElementById("BLK_TLTBS_CONTRACT_FEE_MASTER"), "onclick", "fnDisableChecks()");
    fnDisableChecks();
    return true;
}
function fnPreLaunchForm_CVS_AMEFEHST_KERNEL() {
    screenArgs = new Array();
    screenArgs["AMENRENO"] = "";
    screenArgs["CONTRACTREF"] = document.getElementById("BLK_OLTBS_CONTRACT_FEE__CONTRACTREFNO").value;
    screenArgs["ACTION_CODE"] = "EXECUTEQUERY";
    parent.screenArgs = screenArgs;          
    return true;
}
function fnDisableChecks() {
    try {
        var data_blk = "BLK_TLTBS_CONTRACT_FEE_MASTER";
        var len = getTableObjForBlock(data_blk).tBodies[0].rows.length;
        for (var index = 0;index <= len;index++) {
            if (getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                var amdfee = getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[3].getElementsByTagName("oj-input-text")[0].value;

                var subSyslen = document.getElementById("DIVSubSystem").children[0].children.length;
                for (var idx = 0;idx < subSyslen;idx++) {
                    if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "TLDAMFEH") {
                        var amdfeeLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonD")[0];
                        if (amdfeeLink == undefined) {
                            amdfeeLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0];
                        }
                        if (amdfee == 'AM') {
                            fnEnableSubSysButtons(amdfeeLink);
                        }
                        else {
                            fnDisableSubSysButtons(amdfeeLink);
                        }
                    }

                }
            }
        }
    }
    catch (e) {
    }
    return true;
}