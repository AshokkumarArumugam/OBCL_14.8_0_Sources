/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadCtrlStrnActns.js
  **
  ** 
  ** This source is part of the Oracle FLEXCUBE Software System and is copyrighted by Oracle Financial Services Software Limited.
  ** 
  ** 
  ** All rights reserved. No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
  ** graphic, optic recording or otherwise, translated in any language or computer language,
  ** without the prior written permission of Oracle Financial Services Software Limited.
  ** 
  ** Oracle Financial Services Software Limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** India
  ** Copyright © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  -------------------------------------------------------------------------------------------------------
*/

var ctrlStr = parent.ctrlStrng;
var fncId = parent.ctrlFncId;
var rowindex = parent.ctrlrwIndx;
var actFlds = new Array();
actFlds['FIELDS'] = "NEW~COPY~DELETE~CLOSE~UNLOCK~REOPEN~PRINT~AUTHORIZE~REVERSE~ROLLOVER~CONFIRM~LIQUIDATE~HOLD~TEMPLATE~VIEW~GENERATE"
actFlds['FIELDSSMRY'] = "NEW~COPY~DELETE~CLOSE~UNLOCK~REOPEN~PRINT~AUTHORIZE~REVERSE~ROLLOVER~CONFIRM~LIQUIDATE~HOLD~TEMPLATE~VIEW~GENERATE"

function fnShowCtrlStrngActns() {
    parent.document.getElementById("IFCHILD").style.width = "300px";
    parent.document.getElementById("IFCHILD").style.height = "570px";
    parent.document.getElementById("IFCHILD").scrolling = 'yes';
    document.getElementById("Cancel").focus();
    var str = fncId.substring(2, 3);
    if (str == "S") {
        document.getElementsByName('checkgroup')[0].disabled = true;
        var smflds = new Array();
        smflds = actFlds['FIELDSSMRY'].split("~");
        for (var sf = 0;sf < smflds.length;sf++) {
            document.getElementById(smflds[sf]).checked = false;
            document.getElementById(smflds[sf]).disabled = true;
        }
        return;
    }
    if (ctrlStr != '') {
        ctrlStr = ctrlStr.split("");
        for (var strAct = 0;strAct < ctrlStr.length;strAct++) {
            var flds = new Array();
            flds = actFlds['FIELDS'].split("~");
            if (ctrlStr[strAct] == "1") {
                document.getElementById(flds[strAct]).checked = true;
            }
            else {
                document.getElementById(flds[strAct]).checked = false;

            }
        }
    }
    else {
        return false;
    }

}

function checkAllStrActns(tableName, chk) {

    var l_ChkStatus = true;
    var rowList = document.getElementById(tableName).getElementsByTagName("INPUT");
    var numRows = rowList.length;

    var l_ChBoxs = document.getElementsByName("SEL_ALL_PREF");
    if (l_ChBoxs[0].checked == true)
        l_ChkStatus = true;
    else 
        l_ChkStatus = false;

    for (var i = 0;i < numRows;i++) {
        document.getElementById(tableName).getElementsByTagName("INPUT")[i].checked = l_ChkStatus;
    }
}

function fnSaveActions() {
    var norows = document.getElementsByTagName("fieldset")[0].getElementsByTagName("INPUT");
    var actnRslts = "";
    for (var rwlen = 1;rwlen < norows.length;rwlen++) {
        if (norows[rwlen].checked == true) {
            actnRslts += "1";
        }
        else {
            actnRslts += "0";
        }
    }
    parent.document.getElementById("funcDesc").tBodies[0].rows[rowindex].cells[4].getElementsByTagName("INPUT")[0].value = actnRslts;
}