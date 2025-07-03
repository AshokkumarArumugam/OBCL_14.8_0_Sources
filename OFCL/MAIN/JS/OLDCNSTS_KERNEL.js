/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2019, Oracle and/or its affiliates.
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
**  File Name          : OLDCNSTS_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

 **  Modified By   		: Kavitha Asokan 
 **  Modified on   		: 22-07-2024
 **	Modified Reason	   	: Unable to select record after selecting the row - modified the type for checkbox selection - "oj-input-text" ==> "INPUT" 
 **  Bug no     		: Bug#36850522  
****************************************************************************************************************************/
var REQ_LIST;
var len = 0;
var currRowIndex = 0;
var actionCode;


function fnPreLaunchForm_CVS_ELCM_KERNEL(screenArgs) {
    SingleCheck();
    if (currRowIndex == 0) {
        return false;
    }
	screenArgs['TRN_BRN'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[1]);
    screenArgs['USER_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[2]);
    
	parent.screenArgs = screenArgs;

    return true;
}

function fnPreLaunchForm_CVS_ECA_KERNEL(screenArgs) {
    SingleCheck();
    if (currRowIndex == 0) {
        return false;
    }
	screenArgs['BRANCH_CODE'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[1]);
    screenArgs['CONTRACT_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[2]);
    
	parent.screenArgs = screenArgs;

    return true;
}

function fnPreLaunchForm_CVS_ACCOUNTING_KERNEL(screenArgs) {
    SingleCheck();
    if (currRowIndex == 0) {
        return false;
    }
	screenArgs['BRANCH'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[1]);
    screenArgs['CONTRACT_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[2]);
	screenArgs['PROCESS_STATUS'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[9]);
    
	parent.screenArgs = screenArgs;

    return true;
}

function fnPreLaunchForm_CVS_PAYMENT_KERNEL(screenArgs) {
    SingleCheck();
    if (currRowIndex == 0) {
        return false;
    }
    screenArgs['CONTRACT_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[2]);
    
	parent.screenArgs = screenArgs;

    return true;
}

function fnPreLaunchForm_CVS_CD_KERNEL(screenArgs) {
    SingleCheck();
    if (currRowIndex == 0) {
        return false;
    }
	screenArgs['BRANCH'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[1]);
    screenArgs['CONTRACTREFNO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[2]);
    
	parent.screenArgs = screenArgs;

    return true;
}

function SingleCheck() {
    var selected_row = 0;
    var msob_tchk = 0;
    currRowIndex = 0;
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
    var temp = 0;
    for (i = 0;i < len;i++) {
        if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) { ){//Bug#36850522 
            if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) { ){//Bug#36850522 
                msob_tchk = msob_tchk + 1;
                selected_row = i;
                temp = i;
            }
        }
        else 
            break;
    }
    if (msob_tchk > 1) {
        showErrorAlerts('IN-HEAR-205');
        return false;
    }
    else if (msob_tchk == 0) {
        showErrorAlerts('IN-HEAR-206');
        return false;
    }
    else {
        currRowIndex = selected_row + 1;
    }
}