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
 **  File Name          : SMDJBBRW_KERNEL.js
 **  Purpose            :
 **  Called From        :
 **
 **  CHANGE LOG
 **  Last Modified By   :
 **  Last modified on   :
 **  Full Version       :
 **  Reason             :
  
 **  Modified By          : Selvam Manickam
 **  Modified On          : 15-May-2023
 **  Change Description   : convert to redwood standard getTableObjForBlock() instead of document.getElementById()
 **  Search String        : Redwood_Changes  
 
 **  Modified By          : Selvam Manickam
 **  Modified On          : 19-May-2023
 **  Change Description   : When click on search button with some inputs, Data showing twice in grid table
 **  Search String        : Redwood_35400765  
 ****************************************************************************************************************************/
var fcjRequestDOM;
var fcjResponseDOM;
var gErrCodes = "";
var servletURL = "FCClientHandler";
var msob_bulk = new Array();
var msob_fchk =  - 1;
var msob_tchk = 0;
var msob_dcnlist = "";
var len = 0;
var package_visted = 'N';
var local_dom = "";
var temp = 0;
var l_currRow = "";

function fnPostRefreshSummaryMain(e) {
    NextFireTime(e);
    //fnShowSummaryData(null, e);//Redwood_35400765
    return true;
}

function fnPostExecuteQuery_sum_KERNEL(e) {
    NextFireTime(e);
    //fnShowSummaryData(null, e);//Redwood_35400765
    return true;
}

function NextFireTime(e) {
    var l_ValueNodes = selectNodes(fcjResponseDOM, "//REC/FV");
    for (i = 0;i < l_ValueNodes.length;i++) {
        var longDate = getDateObject();
        var tempVals = getNodeText(l_ValueNodes[i]).split('~');
        var currTime = tempVals[3];
        longDate.setTime(currTime);
        if (currTime != 0)
            tempVals[3] = longDate.toLocaleString();
        else 
            tempVals[3] = '';
        setNodeText(l_ValueNodes[i], tempVals.join('~'));
    }
    return true;
}

function fnPreSave_KERNEL() {
    if (!fnValidate())
        return false;
    debugs("In fnPreSave", "A");
    var isValid = true;
    if (!isValid) {
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
        return false;
    }
    return isValid;
}

function fnPreGoToRec_KERNEL() {
    var navigate = true;
    return navigate;
}

function fnPostGoToRec_KERNEL() {
    return true;
}

function fnPauseJob(evnt) {
    var ret = bulk_check();
    if (ret) {
        gAction = 'PAUSEJOB';
        var fcjRequest = '<FCJMSG SRC="FLEXCUBE" BRANCH="' + mainWin.CurrentBranch + '" USERID="' + mainWin.UserId + '" ENTITY="' + mainWin.entity + '">';
        fcjRequest += '<MAINTQRY TYPE="N" ROOTTABLE="SMVW_JOB_SCHEDULE" QUERYFROM="" QUERYORDERBY="">';
        fcjRequest += '<OP>PAUSEJOB</OP>';
        fcjRequest += '<TABLE ID="SMVW_JOB_SCHEDULE">:' + msob_dcnlist + '</TABLE>';
        fcjRequest += '</MAINTQRY>';
        fcjRequest += '</FCJMSG>';
        fcjRequestDOM = loadXMLDoc(fcjRequest);
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);

        if (fcjResponseDOM) {
            debugs(getXMLString(fcjResponseDOM), "P");

            var msgStatus = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("MSGSTATUS");
            var messageNode = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG/RESPONSE");

            if (msgStatus != 'SUCCESS') {
                showErrorAlerts('SMS-VAL-001', getNodeText(messageNode));
            }
            else {
                //gAction = 'EXECUTEQUERY';
                fnExecuteQuery_sum('Y', evnt);
            }
        }
    }
}

function fnResumeJob(evnt) {
    var ret = bulk_check();
    if (ret) {
        gAction = 'RESUMEJOB';
        var fcjRequest = '<FCJMSG SRC="FLEXCUBE" BRANCH="' + mainWin.CurrentBranch + '" USERID="' + mainWin.UserId + '" ENTITY="' + mainWin.entity + '">';
        fcjRequest += '<MAINTQRY TYPE="N" ROOTTABLE="SMVW_JOB_SCHEDULE" QUERYFROM="" QUERYORDERBY="">';
        fcjRequest += '<OP>RESUMEJOB</OP>';
        fcjRequest += '<TABLE ID="SMVW_JOB_SCHEDULE">:' + msob_dcnlist + '</TABLE>';
        fcjRequest += '</MAINTQRY>';
        fcjRequest += '</FCJMSG>';
        fcjRequestDOM = loadXMLDoc(fcjRequest);
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);

        if (fcjResponseDOM) {
            debugs(getXMLString(fcjResponseDOM), "P");

            var msgStatus = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("MSGSTATUS");
            var messageNode = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG/RESPONSE");

            if (msgStatus != 'SUCCESS') {
                showErrorAlerts('SMS-VAL-002', getNodeText(messageNode));
            }
            else {
                //gAction = 'EXECUTEQUERY';
                fnExecuteQuery_sum('Y', evnt);
            }
        }
    }
}

function bulk_check() {
    //len = document.getElementById("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Changes
   // var rows = document.getElementById("TBL_QryRslts").tBodies[0].rows;//Redwood_Changes
      len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Changes
      var rows = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;//Redwood_Changes
    msob_dcnlist = "";
    msob_fchk =  - 1;
    msob_tchk = 0;
    //len = document.getElementById("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Changes
	len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Changes
    for (i = 0;i <= len;i++) {
        msob_bulk[i] = 'N';
    }
    for (i = 0;i < len;i++) {
       // if (document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {//Redwood_Changes
       //     if (document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {//Redwood_Changes
	      if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {//Redwood_Changes
            if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {//Redwood_Changes
        		   
                msob_bulk[i] = 'Y';
                if (msob_fchk ==  - 1) {
                    msob_fchk = i;
                }
                msob_tchk = msob_tchk + 1;
                msob_dcnlist = msob_dcnlist + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[1]) + '~' + getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]) + '~' + getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[5]) + ':'); //Redwood_Changes
            }

        }
        else if (msob_tchk == 0) {
            showErrorAlerts('IN-HEAR-206');
            return false;
        }
        else 
            break;
    }
    msob_fchk = msob_fchk;
    return true;
}

function bulk_check_report() {
   // len = document.getElementById("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Changes
   // var rows = document.getElementById("TBL_QryRslts").tBodies[0].rows;//Redwood_Changes
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Changes
    var rows = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;	//Redwood_Changes
    msob_dcnlist = "";
    msob_fchk =  - 1;
    msob_tchk = 0;
   // len = document.getElementById("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Changes
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Changes
	
    for (i = 0;i <= len;i++) {
        msob_bulk[i] = 'N';
    }
    for (i = 0;i < len;i++) {
        //if (document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0][0]) {//Redwood_Changes
        //    if (document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0][0].checked) {//Redwood_Changes
          if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0][0]) {//Redwood_Changes
              if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0][0].checked) {//Redwood_Changes
		
                msob_bulk[i] = 'Y';
                if (msob_fchk ==  - 1) {
                    msob_fchk = i;
                }
                msob_tchk = msob_tchk + 1;
                msob_dcnlist = msob_dcnlist + (getTableObjForBlock("TBL_QryRslts")[0].tBodies[0].rows[i].cells[1].innerText + '~' + getTableObjForBlock("TBL_QryRslts")[0].tBodies[0].rows[i].cells[2].innerText + ':');//Redwood_Changes
            }
        }
        else if (msob_tchk == 0) {
            showErrorAlerts('IN-HEAR-206');
            return false;
        }
        else 
            break;
    }
    msob_fchk = msob_fchk;
    return true;
}

function fnPreShowDetail_Sum_KERNEL(arg) {
    return false;
}