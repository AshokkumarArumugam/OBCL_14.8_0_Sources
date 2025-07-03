/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright © 2008 - 2012  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
**
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : SMDHOTKY_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**
**  Modified By           : Saurabh
**  Modified On           : 27-Mar-2012
**  Modified Reason       : 9NT1501 :: FC UBS 12.0.0 : Copyright clause updation of source units
***************************************************************************************************************************
*/

var fcjRequestDOM;
var fcjResponseDOM;


function fnPostLoad_KERNEL() {   
    document.getElementById("BLK_HOTKEYS__USERID").value = mainWin.curr_user;     
    gAction = "EXECUTEQUERY";        
    resetIndex();
    fnExecuteQuery();        
    fnUnlock();
    fnDisableElement(document.getElementById("cmdAddRow_BLK_DETAIL"));
    fnDisableElement(document.getElementById("cmdDelRow_BLK_DETAIL"));
}

function fnExitAll(v_scrName, e) {
    var e = window.event || e;
    if (gAction != "") {
        mask();
        showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_CANCEL_DESC")), "C");
        alertAction = "EXITACTION";
    } else {
        gAction = "";
        dbDataDOM = null;
        isExitTriggered = true;
        showToolbar("", "", "");
        var winObj = mainWin.document.getElementById(seqNo);
        mainWin.fnExit(winObj);
        e.cancelBubble = true;
    }
}

function fnPostSave_KERNEL() {
    var childNodes = selectSingleNode(dbDataDOM, "BLK_HOTKEYS").childNodes;
    for(var i=1;i<=childNodes.length;i++){
        mainWin.hotkeyArray[i-1] = getNodeText(selectSingleNode(dbDataDOM, "BLK_HOTKEYS").childNodes[i]);
    }
    return true;
}
