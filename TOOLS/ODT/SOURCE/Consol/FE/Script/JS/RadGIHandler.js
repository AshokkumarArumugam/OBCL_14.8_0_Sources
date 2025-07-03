/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadGIHandler.js
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

function setGIScreens(screenId) {
    /* to set ecreens in gi*/
    for (var i = 0;i < DivGIArray.length;i++) {
        document.getElementById(DivGIArray[i]).style.display = "none";
    }
    try {
        document.getElementById(screenId).style.display = "block";
    }
    catch (e) {
    }
}

function getGINodePath(xpathArray) {
    /* getGINodePath will  create gixpath array */
    var gixpath = new Array();

    if (xpathArray[0] == "GND") {
        gixpath[0] = "//FORMAT_PREFERENCES";
        gixpath[1] = xpathArray[0];
    }
    else if (xpathArray[0] == "HAD") {
        gixpath[0] = "//FORMAT_HEADER";
        gixpath[1] = xpathArray[0];
    }
    else if (xpathArray[0] == "BDY") {
        gixpath[0] = "//FORMAT_BODY";
        gixpath[1] = xpathArray[0];
    }
    else if (xpathArray[0] == "FTR") {
        gixpath[0] = "//FORMAT_FOOTER";
        gixpath[1] = xpathArray[0];
    }
    else if (xpathArray[0] == "DHAD") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                gixpath[0] = "//FORMAT_HEADER/RECORD";
                gixpath[1] = xpathArray[0];
            }
            if (j == 1) {
                gixpath[0] = "//FORMAT_HEADER/RECORD[@ID='" + xpathArray[1] + "']";
                gixpath[1] = 'RHAD';
            }
        }

    }
    else if (xpathArray[0] == "DBDY") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                gixpath[0] = "//FORMAT_BODY/RECORD";
                gixpath[1] = xpathArray[0];
            }
            if (j == 1) {
                gixpath[0] = "//FORMAT_BODY/RECORD[@ID='" + xpathArray[1] + "']";
                gixpath[1] = 'RBDY';
            }
        }
    }
    else if (xpathArray[0] == "DFTR") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                gixpath[0] = "//FORMAT_FOOTER/RECORD";
                gixpath[1] = xpathArray[0];
            }
            if (j == 1) {
                gixpath[0] = "//FORMAT_FOOTER/RECORD[@ID='" + xpathArray[1] + "']";
                gixpath[1] = 'RFTR';
            }
        }
    }
    else if (xpathArray[0] == "RHAD") {
        gixpath[0] = "//FORMAT_HEADER/RECORD[@ID='" + xpathArray[1] + "']";
        gixpath[1] = 'RHAD';
    }
    else if (xpathArray[0] == "RBDY") {
        gixpath[0] = "//FORMAT_BODY/RECORD[@ID='" + xpathArray[1] + "']";
        gixpath[1] = 'RBDY';
    }
    else if (xpathArray[0] == "RFTR") {
        gixpath[0] = "//FORMAT_FOOTER/RECORD[@ID='" + xpathArray[1] + "']";
        gixpath[1] = 'RFTR';
    }
    else if (xpathArray[0] == "FHAD") {
        gixpath[0] = "//FORMAT_HEADER/RECORD[@ID='" + xpathArray[1] + "']";
        gixpath[1] = 'FHAD';
    }
    else if (xpathArray[0] == "FBDY") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 1) {
                gixpath[0] = "//FORMAT_BODY/RECORD[@ID='" + xpathArray[1] + "']";
                gixpath[1] = 'FBDY';
            }
            if (j == 2) {
                gixpath[0] = "//FORMAT_BODY/RECORD[@ID='" + xpathArray[2] + "']";
                gixpath[1] = 'FBDY';
            }
        }
    }
    else if (xpathArray[0] == "FFTR") {
        gixpath[0] = "//FORMAT_FOOTER/RECORD[@ID='" + xpathArray[1] + "']";
        gixpath[1] = 'FFTR';
    }
    return gixpath;

}

function fnCheckGiDel(tableName) {
    /*To check gi del */
    var fmtcat = getNodeText(selectSingleNode(dom, "//FORMAT_CATEGORY"));
    if (fmtcat == 'I') {
        if (tableName == 'GI_HIN_fields' || tableName == 'GI_BIN_fields' || tableName == 'GI_FIN_fields' || tableName == 'GI_F_AssocBlocks' || tableName == 'GI_B_AssocBlocks' || tableName == 'GI_H_AssocBlocks') {
            return false;
        }
        else {
            return true;
        }
    }
    else if (fmtcat == 'O') {
        if (tableName == 'GI_HOUT_fields' || tableName == 'GI_BOUT_fields' || tableName == 'GI_FOUT_fields' || tableName == 'GI_F_AssocRecords' || tableName == 'GI_B_AssocRecords' || tableName == 'GI_H_AssocRecords') {
            return false;
        }
        else {
            return true;
        }
    }
    return false;
}

function fnDelDuplGiTableAfterShowData() {
    /*Todelete duplicate data after show data is done */
    var tableobj;
    var IncomingTables = 'GI_HIN_fields~GI_BIN_fields~GI_FIN_fields~GI_B_AssocBlocks';
    var OutgoingTables = 'GI_HOUT_fields~GI_BOUT_fields~GI_FOUT_fields~GI_B_AssocRecords';
    var fmtcat = getNodeText(selectSingleNode(dom, "//FORMAT_CATEGORY"));
    if (fmtcat == 'O') {
        var tableName = IncomingTables.split("~");
        for (var i = 0;i < tableName.length;i++) {
            tableobj = document.getElementById(tableName[i]);
            var len = tableobj.tBodies[0].rows.length;
            for (var index = 0;index < len;index++) {
                tableobj.tBodies[0].deleteRow(index);
                len = len - 1;
                index = index - 1;
            }
        }
    }
    else if (fmtcat == 'I') {
        var tableName = OutgoingTables.split("~");
        for (var i = 0;i < tableName.length;i++) {
            tableobj = document.getElementById(tableName[i]);
            var len = tableobj.tBodies[0].rows.length;
            for (var index = 0;index < len;index++) {
                tableobj.tBodies[0].deleteRow(index);
                len = len - 1;
                index = index - 1;
            }
        }
    }
}