/*-----------------------------------------------------------------------------------------------------
 **
 ** File Name  : RadInfraUtil.js
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
var uplobjt = "";
var savep = false;
var firstrow = 0;
var lastrow = 15;
var page1 = 0;
var page2 = 1;
var formArray = new Array();
var relationArray = new Array();
var dbIndexArray = new Array();
var pkArray = new Array();
var pkLovArray = new Array();
var radxmlFiles = "";
var SignonSerialNo = "";
var msgxml_tcdmastr = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="TCTM_TC_MASTER">TC_CODE~TC_DESC~FUNCTION_ID~ACTION_CODE~SERVICE_NAME~OPERATION_CODE~TC_ORIGIN_RELEASE~REFERENCE_TC~MOD_NO~RECORD_STAT~MAKER_ID~MAKER_DT_STAMP</FN></FLD>';
var msgxml_tcsmastr = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="TCTM_TC_MASTER">TC_CODE~TC_DESC~FUNCTION_ID~ACTION_CODE~SERVICE_NAME~OPERATION_CODE~REFERENCE_TC~MOD_NO~RECORD_STAT~MAKER_ID~MAKER_DT_STAMP</FN></FLD>';
var msgxml_tcdxlupd = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="TCTB_TC_MASTER">TC_CODE~BRANCH_CODE~SOURCE_OPERATION~MOD_NO~MAKER_ID~MAKER_DT_STAMP</FN></FLD>';
var msgxml_tcdcrreq = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="TCTB_TC_MASTER">TC_CODE~BRANCH_CODE~SOURCE_OPERATION</FN><FN PARENT="TCTB_TC_MASTER" RELATION_TYPE="1" TYPE="TCTM_TC_MASTER">TC_DESC~FUNCTION_ID~ACTION_CODE~SERVICE_NAME~OPERATION_CODE</FN><FN PARENT="TCTB_TC_MASTER" RELATION_TYPE="1" TYPE="RDTB_UI_COLUMNS">CLOB_COL_1~CLOB_COL_2</FN></FLD>';

var msgxml_tcdrnreq = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="TCTB_TC_EXEC_MASTER">EXEC_REF_NO~RC_EXEC_REF_NO~TC_CODE~SOURCE_TYPE~ACTION_ON_OVD~AUTO_AUTH~MSG_XCHANGE_PATTERN~REQUEST~RESPONSE~STATUS~EXEC_DT_STAMP~EXEC_BY~KEY_VALUES~ERRORS</FN></FLD>';
var msgxml_tcsrnreq = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="TCTB_TC_EXEC_MASTER">EXEC_REF_NO~TC_CODE~SOURCE_TYPE~RC_EXEC_REF_NO~EXEC_DT_STAMP~STATUS</FN></FLD>';
var msgxml_tcdrcmst = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="TCTM_RC_MASTER">RC_CODE~RC_DESC~RC_ORIGIN_RELEASE~MOD_NO~MAKER_ID~MAKER_DT_STAMP</FN><FN PARENT="TCTM_RC_MASTER" RELATION_TYPE="N" TYPE="TCTM_RC_TCS">TC_CODE~SEQUENCE_NO</FN></FLD>';
var msgxml_tcsrcmst = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="TCTM_RC_MASTER">RC_CODE~RC_DESC~RC_ORIGIN_RELEASE</FN></FLD>';
var msgxml_tcdrcexc = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="TCTB_RC_EXEC_MASTER">EXEC_REF_NO~RC_CODE~STATUS~START_FROM_SEQ~HALT_ON_ERROR~EXEC_DT_STAMP~EXEC_BY~RELEASE_CODE~ENV_CODE</FN><FN PARENT="TCTB_RC_EXEC_MASTER" RELATION_TYPE="N" TYPE="TCTB_TC_EXEC_MASTER">SEQUENCE_NO~EXEC_REF_NO~TC_CODE~SOURCE_TYPE~ACTION_ON_OVD~AUTO_AUTH~EXCHANGE_PATTERN~REQUEST~RESPONSE~STATUS~KEY_VALUES~ERRORS~RC_EXEC_REF_NO</FN></FLD>';
var msgxml_tcsrcexc = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="TCTB_RC_EXEC_MASTER">EXEC_REF_NO~RC_CODE~STATUS</FN></FLD>';

var msgxml_rddusrdf = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="RDTM_USERS">USER_ID~USER_NAME~USER_PASSWORD~DEFAULT_RELEASE~DEFAULT_ENV~USER_STATUS~WORK_DIRECTORY~SAVEFORMAT~XLFORMAT~XMLFORMAT~LDAP_AUTH~MOD_NO~MAKER_ID~MAKER_DT_STAMP~SALT</FN><FN PARENT="RDTM_USERS" RELATION_TYPE="N" TYPE="RDTM_USER_RELEASES">RELEASE_CODE~USER_ROLE</FN></FLD>';
var msgxml_rdsusrdf = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="RDTM_USERS">USER_ID~USER_NAME~DEFAULT_RELEASE~DEFAULT_ENV</FN></FLD>';
var msgxml_rddreldf = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="RDTM_RELEASE_MASTER">RELEASE_CODE~RELEASE_DESC~RELEASE_TYPE~RELEASE_NO~BASE_RELEASE~RELEASE_ENV_CODE~RELEASE_STATUS~REMARKS~RELEASESPC~STREAM_NAME~CLUSTER_NAME~CUSTOM_NAME~RELEASE_STAGE~APPLICATION_NAME~DATA_MIGRATION_REQD~MOD_NO~MAKER_ID~MAKER_DT_STAMP</FN></FLD>';
var msgxml_rdsreldf = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="RDTM_RELEASE_MASTER">RELEASE_CODE~RELEASE_DESC~RELEASE_TYPE~RELEASE_NO~BASE_RELEASE~RELEASE_ENV_CODE~RELEASE_STATUS~REMARKS~RELEASESPC~STREAM_NAME~CLUSTER_NAME~CUSTOM_NAME~RELEASE_STAGE~APPLICATION_NAME~DATA_MIGRATION_REQD~MOD_NO~MAKER_ID~MAKER_DT_STAMP</FN></FLD>';
var msgxml_rddenvdf = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="RDTM_ENV_MASTER">ENV_CODE~ENV_DESC~RELEASE_CODE~LANG_CODE~DB_INSTANCE~DB_PORT~DB_IP~DB_HOSTNAME~DB_SCHEMA~DB_PASSWORD~APP_URL~APP_IP~APP_HOSTNAME~APP_OS_TYPE~APP_TRNF_TYPE~APP_JS_FOLDER~APP_XML_FOLDER~APP_FTP_USER~APP_FTP_PASSWORD~APP_HTTP_URL~APP_HTTP_USER~APP_HTTP_PASSWORD~JNDI_NAME~MOD_NO~MAKER_ID~MAKER_DT_STAMP</FN></FLD>';
var msgxml_rdsenvdf = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="RDTM_ENV_MASTER">ENV_CODE~ENV_DESC~RELEASE_CODE~LANG_CODE~DB_INSTANCE~DB_PORT~DB_IP~DB_HOSTNAME~DB_SCHEMA~APP_URL~APP_IP~APP_HOSTNAME~APP_OS_TYPE~APP_TRNF_TYPE~APP_JS_FOLDER~APP_XML_FOLDER~APP_FTP_USER~APP_HTTP_URL~APP_HTTP_USER~JNDI_NAME~MOD_NO~MAKER_ID~MAKER_DT_STAMP</FN></FLD>';

var msgxml_rddnftrg = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="GWTM_NOTIFICATION_TRIGGERS">TRIGGER_CODE~TRIGGER_DESCRIPTION~BASE_TABLE~TRIGGER_WHEN_CLAUSE~TRIGGER_TYPE~NOTIFICATION_CODES~FIRING_TIME~EACH_RECORD~TRIGGER_LOGIC</FN></FLD>';
var msgxml_rdsnftrg = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="GWTM_NOTIFICATION_TRIGGERS">TRIGGER_CODE~TRIGGER_DESCRIPTION~BASE_TABLE~TRIGGER_WHEN_CLAUSE~NOTIFICATION_CODES~EACH_RECORD~FIRING_TIME</FN></FLD>';

var msgxml_tcdxlbup = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="TCTB_TC_BULK_MASTER">UPLOAD_REF_NO~RELEASE_CODE~FUNCTION_ID~TC_CODE~MOD_NO~MAKER_ID~MAKER_DT_STAMP</FN><FN PARENT="TCTB_TC_BULK_MASTER" RELATION_TYPE="N" TYPE="TCTB_TC_BULK_TCS">TC_CODE~UPLOAD_STATUS~ERROR_MSG</FN><FN PARENT="" RELATION_TYPE="1" TYPE="TCTB_BLOCK_DETAILS">RELEASE_CODE~TC_CODE~BLOCK_NAME~BLOCK_DESC~FLD_NAMES_1~FLD_NAMES_2~FLD_NAMES_3~FLD_NAMES_4~FLD_NAMES_5~FLD_DESCS_1~FLD_DESCS_2~FLD_DESCS_3~FLD_DESCS_4~FLD_DESCS_5</FN><FN PARENT="TCTB_BLOCK_DETAILS" RELATION_TYPE="N" TYPE="TCTB_BLOCK_DATA">RELEASE_CODE~TC_CODE~BLOCK_NAME~REC_ID~REC_NO~ACTION_CODE~PARENT_REC_ID~FLD_VALUES_1~FLD_VALUES_2~FLD_VALUES_3~FLD_VALUES_4~FLD_VALUES_5~FLD_VALUES_6~FLD_VALUES_7~FLD_VALUES_8~FLD_VALUES_9~FLD_VALUES_10~FLD_VALUES_11~FLD_VALUES_12~FLD_VALUES_13~FLD_VALUES_14~FLD_VALUES_15~FLD_VALUES_16~FLD_VALUES_17~FLD_VALUES_18~FLD_VALUES_19~FLD_VALUES_20</FN></FLD>';

var msgxml_tcdtcrpt = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="TCDTCRPT_PARAMS">RELEASE_CODE~ENV_CODE~TC_CODE~EXEC_BY~FUNCTION_ID~ACTION_CODE</FN><FN PARENT="TCDTCRPT_PARAMS" RELATION_TYPE="N" TYPE="TCTB_TC_EXEC_MASTER_REPORT">Exec_Ref_No~TC_CODE~EXEC_BY~STATUS</FN><FN PARENT="TCDTCRPT_PARAMS" RELATION_TYPE="1" TYPE="TCDTCRPT_STATS">SUCCESS_TC_CODES~FAILED_TC_CODES~UPLOADED_TC_CODES~TOTAL_TC_CODES</FN></FLD>';
var msgxml_tcdrcrpt = '<FLD><FN PARENT="" RELATION_TYPE="1" TYPE="TCDRCRPT_PARAMS">RELEASE_CODE~ENV_CODE~RC_CODE~EXEC_BY</FN><FN PARENT="TCDRCRPT_PARAMS" RELATION_TYPE="N" TYPE="TCTB_RC_EXEC_MASTER_REPORT">RC_CODE~EXEC_BY~STATUS</FN><FN PARENT="TCDRCRPT_PARAMS" RELATION_TYPE="1" TYPE="TCDRCRPT_STATS">SUCCESS_RC_CODES~FAILED_RC_CODES~UPLOADED_RC_CODES~TOTAL_RC_CODES</FN></FLD>';

var tempFolder;
var responsexml;
var gPkField;
var ntfyTrgAction = "";

relationArray['TCTB_TC_MASTER'] = "";
relationArray['TCTM_TC_MASTER'] = "";
relationArray['TCTM_BLOCK_DETAILS'] = "";
relationArray['TCTM_RC_MASTER'] = "";
relationArray['TCTM_RC_TCS'] = "TCTM_RC_MASTER~N";
relationArray['TCTB_RC_EXEC_MASTER'] = "";
relationArray['TCTB_TC_EXEC_MASTER'] = "TCTB_RC_EXEC_MASTER~N";
relationArray['TCTB_TC_EXEC_MASTER'] = "";
relationArray['RDTM_USERS'] = "";
relationArray['RDTM_USER_RELEASES'] = "RDTM_USERS~N";
relationArray['RDTM_ENV_MASTER'] = "";
relationArray['RDTM_RELEASE_MASTER'] = "";
relationArray['GWTM_NOTIFICATION_TRIGGERS'] = "";
relationArray['TCTB_TC_BULK_MASTER'] = "";
relationArray['TCTB_TC_BULK_TCS'] = "TCTB_TC_BULK_MASTER~N";

pkArray['TCDMASTR'] = "TCTM_TC_MASTER.TC_CODE";
pkArray['TCDXLUPD'] = "TCTB_TC_MASTER.TC_CODE";
pkArray['TCDCRREQ'] = "TCTB_TC_MASTER.TC_CODE";
pkArray['TCDRNREQ'] = "TCTB_TC_EXEC_MASTER.EXEC_REF_NO";
pkArray['TCDRCMST'] = "TCTM_RC_MASTER.RC_CODE";
pkArray['TCDRCEXC'] = "TCTB_RC_EXEC_MASTER.RC_CODE";
pkArray['RDDUSRDF'] = "RDTM_USERS.USER_ID";
pkArray['RDDENVDF'] = "RDTM_ENV_MASTER.ENV_CODE";
pkArray['RDDRELDF'] = "RDTM_RELEASE_MASTER.RELEASE_CODE";
pkArray['RDDNFTRG'] = "GWTM_NOTIFICATION_TRIGGERS.TRIGGER_CODE";
pkArray['TCDTCRPT'] = "TCDTCRPT_PARAMS.RELEASE_CODE~TCDTCRPT_PARAMS.ENV_CODE~TCDTCRPT_PARAMS.EXEC_BY~TCDTCRPT_PARAMS.FUNCTION_ID";
pkArray['TCDRCRPT'] = "TCDRCRPT_PARAMS.RELEASE_CODE~TCDRCRPT_PARAMS.ENV_CODE~TCDRCRPT_PARAMS.RC_CODE~TCDRCRPT_PARAMS.EXEC_BY";
pkArray['TCDXLBUP'] = "TCTB_TC_BULK_MASTER.TC_CODE";

pkLovArray['TCDMASTR'] = "BTN_TCDMASTR_TC_CODE";
pkLovArray['TCDXLUPD'] = "";
pkLovArray['TCDCRREQ'] = "BTN_TC_CODE";
pkLovArray['TCDRNREQ'] = "";
pkLovArray['TCDRCMST'] = "";
pkLovArray['TCDRCEXC'] = "";
pkLovArray['RDDUSRDF'] = "USERID";
pkLovArray['RDDENVDF'] = "BTN_ENV_CODE";
pkLovArray['RDDRELDF'] = "BTN_REL_CODE";
pkLovArray['RDDNFTRG'] = "BTN_TRG_CODE";
pkLovArray['TCDTCRPT'] = "BTN_REL_CODE";
pkLovArray['TCDRCRPT'] = "BTN_REL_CODE";
pkLovArray['TCDXLBUP'] = "BTN_VIEWREPORT";

var multipleEntryIDs = new Array();
multipleEntryIDs['TCDMASTR'] = "";
multipleEntryIDs['TCDXLUPD'] = "";
multipleEntryIDs['TCDCRREQ'] = "";
multipleEntryIDs['TCDRNREQ'] = "";
multipleEntryIDs['TCDRCMST'] = "TCTM_RC_TCS";
multipleEntryIDs['TCDRCEXC'] = "TCTB_TC_EXEC_MASTER";
multipleEntryIDs['RDDUSRDF'] = "RDTM_USER_RELEASES";
multipleEntryIDs['RDDRELDF'] = "";
multipleEntryIDs['RDDENVDF'] = "";
multipleEntryIDs['RDDNFTRG'] = "";
multipleEntryIDs['TCDXLBUP'] = "TCTB_TC_BULK_TCS";

var gErrCodes;
var radResponseDOM;

var fileNamesArry = new Array();
var filePathsArry = new Array();

function fnEnableLogButtons(type) {
    if (type == undefined) {
        if (parent.gIsSummary == 0) {
            disableAllHeaderButtons();
            if (parent.groleRights.charAt(0) == 1) {
                fnEnableButton("enqry");
            }
            if (parent.groleRights.charAt(1) == 1) {
                if (parent.gwinFuncId != 'TCDXLBUP') {
                    fnEnableButton("new");
                }
            }
        }
        else {
            disableAllHeaderButtons();
            fnEnableButton("exqry");
            fnEnableButton("exit");
        }
    }
    else if (type == "NEW") {
        showHideLOVs("show", "NEW");
        fnHidelov(parent.gwinFuncId);
        disableAllHeaderButtons();
        fnEnableButton("save");
        fnEnableButton("close");
    }
    else if (type == "ENQRY") {
        showHideLOVs("show", "ENTER_QUERY");
        disableAllHeaderButtons();
        fnEnableButton("exqry");
        fnEnableButton("close");
    }
    else if (type == "EXQRY") {
        showHideLOVs("hide", "EXECUTE_QUERY");
        disableAllHeaderButtons();
        fnEnableButton("enqry");
        if (parent.groleRights.charAt(2) == 1)
            fnEnableButton("UnLck");
        fnEnableButton("close");
        if (parent.gwinFuncId == "TCDXLUPD") {
            document.getElementById("BTN_SHOWE").disabled = false;
            document.getElementById("BTN_SHOWOE").disabled = false;
        }
    }
    else if (type == "MODIFY") {
        showHideLOVs("show", "UNLOCK");
        fnHidelov(parent.gwinFuncId);
        disableAllHeaderButtons();
        fnEnableButton("save");
        fnEnableButton("close");
        if (parent.gwinFuncId == "RDDRELDF") {
            document.getElementById("RDTM_RELEASE_MASTER.DATA_MIGRATION_REQD").disabled = true;
            document.getElementById("RDTM_RELEASE_MASTER.DATA_MIGRATION_REQD").className = "TXTro";

        }
        if (parent.gwinFuncId == "TCDMASTR" || parent.gwinFuncId == "RDDRELDF") {
            fnEnableButton("CloseRecord");
        }
    }
    else if (type == "SAVE") {
        disableAllHeaderButtons();
        fnEnableButton("new");
        fnEnableButton("enqry");
        fnEnableButton("UnLck");
        fnEnableButton("close");
        fnEnableButton("exit");
    }
    else if (type == "CANCEL") {
        showHideLOVs("hide", "CANCEL");
        disableAllHeaderButtons();
        fnEnableButton("new");
        fnEnableButton("enqry");
    }
    else {
        disableAllHeaderButtons();
        fnEnableButton("exit");
    }

}

function disableAllHeaderButtons() {
    if (document.getElementById('Dtop') != null) {
        for (var i = 0;i < document.getElementById('Dtop').getElementsByTagName("BUTTON").length;i++) {
            document.getElementById('Dtop').getElementsByTagName("BUTTON")[i].disabled = true;
            document.getElementById('Dtop').getElementsByTagName("BUTTON")[i].className = "BUTTONToolbarD";
        }
    }
    else if (parent.document.getElementById('Dtop') != null) {
        for (var i = 0;i < parent.document.getElementById('Dtop').getElementsByTagName("BUTTON").length;i++) {
            parent.document.getElementById('Dtop').getElementsByTagName("BUTTON")[i].disabled = true;
            parent.document.getElementById('Dtop').getElementsByTagName("BUTTON")[i].className = "BUTTONToolbarD";
        }
    }
}

function fnEnableButton(btn) {
    if (document.getElementById(btn)) {
        document.getElementById(btn).disabled = false;
        document.getElementById(btn).className = "BUTTONToolbar";
    }
    else if (parent.document.getElementById(btn)) {
        parent.document.getElementById(btn).disabled = false;
        parent.document.getElementById(btn).className = "BUTTONToolbar";
    }
}

function fnHidelov(btn) {
    if (pkLovArray[btn] != "") {
        document.getElementById(pkLovArray[btn]).style.visibility = "hidden";
    }
}

function fnNew() {
    parent.gAction = "NEW";
    parent.gReqCode = parent.gAction;
    fnReset();
    enableForm();
    if (parent.gwinFuncId == "TCDRNREQ") {
        document.getElementById("TCTB_TC_EXEC_MASTER.EXEC_REF_NO").value = " ";
    }
    else if (parent.gwinFuncId == "TCDRCEXC") {
        document.getElementById("TCTB_RC_EXEC_MASTER.EXEC_REF_NO").disabled = true;
        document.getElementById("TCTB_RC_EXEC_MASTER.EXEC_REF_NO").readonly = true;
        document.getElementById("TCTB_RC_EXEC_MASTER.EXEC_REF_NO").className = "TXTro";

    }
    fnEnableLogButtons('NEW');
}

function fnCloseRecord() {
    parent.gReqType = "FID";
    parent.gAction = "CLOSERECORD";
    parent.gReqCode = parent.gAction;

    appendAdmnDOM();
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
    if (processResponse(response))
        return;
    else {
    }
}

function fnSave() {
    savep = true;
    if (parent.gwinFuncId == 'RDDRELDF') {
        if (document.getElementById("RDTM_RELEASE_MASTER.DATA_MIGRATION_REQD").checked == true)
            document.getElementById("RDTM_RELEASE_MASTER.DATA_MIGRATION_REQD").value = "Y";
        else 
            document.getElementById("RDTM_RELEASE_MASTER.DATA_MIGRATION_REQD").value = "";
    }
    if (parent.gwinFuncId == 'TCDRCEXC') {
        gPkField = "TCTB_RC_EXEC_MASTER.RC_CODE";
    }
    if (parent.gwinFuncId == 'TCDXLBUP') {
        gPkField = "TCTB_TC_BULK_MASTER.FUNCTION_ID";
    }
    if (parent.gwinFuncId == 'RDDENVDF') {
        if (document.getElementById('RDTM_ENV_MASTER.LANG_CODE').value == "") {
            alertMsg("Language Filed is Mandatory ...", "E");
            return;
        }
        if (document.getElementById('RDTM_ENV_MASTER.JNDI_NAME').value == "") {
            alertMsg("JNDI Name is Mandatory ...", "E");
            return;
        }
        if (document.getElementById('RDTM_ENV_MASTER.DB_INSTANCE').value == "") {
        	alertMsg("Database instance is Mandatory ...", "E");
        	return;
        }
        if (document.getElementById('RDTM_ENV_MASTER.DB_PORT').value == "") {
        	alertMsg("Database PORT is Mandatory ...", "E");
        	return;
        }
        if (document.getElementById('RDTM_ENV_MASTER.DB_IP').value == "") {
        	alertMsg("Database IP address is Mandatory ...", "E");
        	return;
        }
        if (document.getElementById('RDTM_ENV_MASTER.DB_HOSTNAME').value == "") {
        	alertMsg("Database Host Name is Mandatory ...", "E");
        	return;
        }
        if (document.getElementById('RDTM_ENV_MASTER.DB_SCHEMA').value == "") {
        	alertMsg("Database Schema is Mandatory ...", "E");
        	return;
        }
        if (document.getElementById('RDTM_ENV_MASTER.DB_PASSWORD').value == "") {
        	alertMsg("Database Password is Mandatory ...", "E");
        	return;
        }

    }
    if (document.getElementById(gPkField).value == "") {
        alertMsg("Mandatory Field Cannot Be Null...", "E");
        return;
    }
    if (fnEventsHandler('fnSave', '')) {
        return true;
    }
    else {
        parent.gReqType = "FID";
        appendAdmnDOM();
        var radReqDOM = parent.buildRADXml();
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
        processResponse(response);
    }
    savep = false;
	if (parent.gwinFuncId == "RDDUSRDF") { 
		document.getElementById("RDTM_USERS.USER_PASSWORD").value="XXXXXXXXXXX";
		}
    return;
}

function fnSave_TCDXLUPD(args) {
    var response = "";
    var fileName = document.getElementById("EXCELFILE").value;
    if (fileName == "") {
        alertMessage('Excel Sheet Not Uploaded', 'E');
        return false;
    }
    parent.gReqType = "FID";
    parent.gReqCode = parent.gAction;
    appendAdmnDOM();
    var radXML = parent.buildRADXml();

    parent.gReqType = "APP";
    parent.gReqCode = "READEXCEL";
    parent.gSubFolder = fileName;
    var radReqDOM = parent.buildRADXml();
    response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(radXML), "RADClientHandler");
    if (getXMLString(response) != "" && getXMLString(response) != undefined) {
        parent.gReqType = "FID";
        parent.gReqCode = parent.gAction;
        response = parent.fnPost(getXMLString(response) + parent.gBodySeparator + "", "RADClientHandler");
        processResponse(response);
    }
    else if (response == "null") {
        return true;
    }
    else {
        if (response != "")
            alertMsg(response, "E");
        else 
            alertMsg("Server Processing Failed", "E");
    }
}

function fnSave_TCDRNREQ(args) {
    var date1 = new Date();
    var tcst_code = document.getElementById("TCTB_TC_EXEC_MASTER.TC_CODE").value;
    var exeCount = fnTestCaseCount(tcst_code)
    if (exeCount > 0) {
        alertMsg("Multiple Execution is not allowed for this testcase", "E");
        return;

    }

    parent.gAction = "BUILDREQUEST";
    parent.gReqType = "FID";
    parent.gReqCode = parent.gAction;
    appendAdmnDOM();
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
    var fcubsRequest = response.split(parent.gBodySeparator)[1];
    response = response.split(parent.gBodySeparator)[0];
    response = loadXMLDoc(response);
    fnshowResponse(response);
    parent.gAction = "QUERYXML";
    parent.gReqType = "GEN";
    parent.gReqCode = parent.gAction;
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
    var queryXml = radReqDOM.createElement("QUERYXML");
    bodyNode.appendChild(queryXml);
    bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML");
    queryXml = radReqDOM.createElement("REQ_OR_RES");
    bodyNode.appendChild(queryXml);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML/REQ_OR_RES"), 'REQ');
    bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML");
    queryXml = radReqDOM.createElement("EXEC_REF_NO");
    bodyNode.appendChild(queryXml);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML/EXEC_REF_NO"), document.getElementById("TCTB_TC_EXEC_MASTER.EXEC_REF_NO").value);

    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
    document.getElementById("TAtcmrunreq").value = response;
    if (parent.g_appEntryPoint == 'DB') {

        var runReqResponse = fnRunRequest(response);
    }
    else {
        fnServiceLogin(response);
        runReqResponse = fnServicePost(response);
        fnServiceLoginOut(response);
    }

    if (getXMLString(runReqResponse) == "undefined")
        runReqResponse = loadXMLDoc(runReqResponse);
    document.getElementById("TAtcmshores").value = getXMLString(runReqResponse);
    var rep = getXMLString(runReqResponse).replace('<FCUBS_RES_ENV xmlns=\"http://fcubs.ofss.com/service/\">', '<FCUBS_RES_ENV>');
    runReqResponse = loadXMLDoc(rep);

    var status = getNodeText(selectSingleNode(runReqResponse, "//FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
    if (status == "FAILURE") {
        document.getElementById("TCTB_TC_EXEC_MASTER.STATUS").value = "F";
        if (selectSingleNode(runReqResponse, "//EDESC") != null) {
            var ecode = selectNodes(runReqResponse, "//ECODE");
            var ecodedec = "";
            for (var e = 0;e < ecode.length;e++) {
                if (e > 0)
                    ecodedec = ecodedec + ";" + getNodeText(selectSingleNode(ecode[e], "//ECODE"));
                else 
                    ecodedec = getNodeText(selectSingleNode(ecode[e], "//ECODE"));
            }
            document.getElementById("TCTB_TC_EXEC_MASTER.ERRORS").value = ecodedec;
        }
    }
    else {
        document.getElementById("TCTB_TC_EXEC_MASTER.STATUS").value = "S";
    }

    var status = document.getElementById("TCTB_TC_EXEC_MASTER.STATUS").value;
    var srcType = document.getElementById("TCTB_TC_EXEC_MASTER.SOURCE_TYPE").value;
    var tcCode = document.getElementById("TCTB_TC_EXEC_MASTER.TC_CODE").value;
    var execRefNo = document.getElementById("TCTB_TC_EXEC_MASTER.EXEC_REF_NO").value;
    var execResponse = document.getElementById("TAtcmshores").value;

    var keyValues = fnUpdateExecutionResponse(status, srcType, tcCode, execRefNo, execResponse);
    document.getElementById("TCTB_TC_EXEC_MASTER.KEY_VALUES").value = keyValues;
    var date = new Date();
    document.getElementById("TCTB_TC_EXEC_MASTER.EXEC_DT_STAMP").value = timeDifference(date, date1);

    disableForm();
    fnEnableLogButtons('SAVE');
}

function fnUpdateExecutionResponse(stat, srcType, tcCode, execRefNo, execResponse) {
    parent.gReqType = "GEN";
    parent.gReqCode = "RESUPD";

    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
    var statusXml = radReqDOM.createElement("STATUS");
    bodyNode.appendChild(statusXml);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/STATUS"), stat);

    bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
    statusXml = radReqDOM.createElement("EXEC_REF_NO");
    bodyNode.appendChild(statusXml);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/EXEC_REF_NO"), execRefNo);

    bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
    statusXml = radReqDOM.createElement("TC_CODE");
    bodyNode.appendChild(statusXml);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/TC_CODE"), tcCode);

    bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
    statusXml = radReqDOM.createElement("SOURCE_TYPE");
    bodyNode.appendChild(statusXml);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/SOURCE_TYPE"), srcType);

    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + execResponse, "RADClientHandler");

    return response;
}

function fnSave_TCDRCEXC(args) {
    savep = false;
    var date1 = new Date();
    var tcdrcexcNewFlag = false;
    var response = "";
    var len = document.getElementById("TCTB_TC_EXEC_MASTER").tBodies[0].rows.length + 1;
    parent.gAction = "NEW";
    parent.gReqType = "FID";
    parent.gReqCode = parent.gAction;
    var haltOnError = false;
    if (document.getElementById("TCTB_RC_EXEC_MASTER.HALT_ON_ERROR").checked) {
        haltOnError = true;
    }
    for (var z = 1;z < len;z++) {

        if (document.getElementsByName("TCTB_TC_EXEC_MASTER.AUTO_AUTH")[z - 1].checked) {

            var tempobj = selectNodes(parent.gAdmnDom, "//TCTB_TC_EXEC_MASTER");
            setNodeText(selectSingleNode(tempobj[z - 1], "AUTO_AUTH"), 'Y');
        }

    }

    var radReqDOM = parent.buildRADXml();
    response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
    fnReset();
    fnshowResponse(response);

    if (parent.g_appEntryPoint != 'DB') {
        fnServiceLogin(response);
    }

    for (var i = 1;i < len;i++) {
        var statusField = document.getElementsByName("TCTB_TC_EXEC_MASTER.STATUS")[i - 1];
        var tcst_code = document.getElementsByName("TCTB_TC_EXEC_MASTER.TC_CODE")[i - 1].value;
        var exeCount = fnTestCaseCount(tcst_code)
        if (exeCount > 0) {
            document.getElementsByName("TCTB_TC_EXEC_MASTER.ERRORS")[i - 1].value = 'Multiple execution is not allowed';
            continue;

        }

        if (statusField.value == "U") {
            parent.gAction = "QUERYXML";
            parent.gReqType = "GEN";
            parent.gReqCode = parent.gAction;
            var radReqDOM = parent.buildRADXml();
            var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
            var queryXml = radReqDOM.createElement("QUERYXML");
            bodyNode.appendChild(queryXml);
            bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML");
            queryXml = radReqDOM.createElement("REQ_OR_RES");
            bodyNode.appendChild(queryXml);
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML/REQ_OR_RES"), 'REQ');
            queryXml = radReqDOM.createElement("DERIVE_VALS");
            bodyNode.appendChild(queryXml);
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML/DERIVE_VALS"), 'Y');
            bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML");
            queryXml = radReqDOM.createElement("EXEC_REF_NO");
            bodyNode.appendChild(queryXml);
            var refNo = getFieldData(document.getElementsByName("TCTB_TC_EXEC_MASTER.EXEC_REF_NO")[i - 1]);
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML/EXEC_REF_NO"), refNo);
            var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
            //var sssssss = document.getElementsByName("TCTB_TC_EXEC_MASTER.EXEC_REF_NO")[i - 1].value;
            document.getElementsByName("TCTB_TC_EXEC_MASTER.REQUEST")[i - 1].value = response;

            if (parent.g_appEntryPoint != 'DB') {
                runReqResponse = fnServicePost(response);
            }
            else {
                var runReqResponse = fnRunRequest(response);
            }

            try {
                var rep = getXMLString(runReqResponse).replace('<FCUBS_RES_ENV xmlns=\"http://fcubs.ofss.com/service//\">', '<FCUBS_RES_ENV>');

            }
            catch (e) {
                var rep = runReqResponse.replace('<FCUBS_RES_ENV xmlns=\"http://fcubs.ofss.com/service//\">', '<FCUBS_RES_ENV>');
            }
            runReqResponse = loadXMLDoc(rep);

            if (selectSingleNode(runReqResponse, "//EDESC") != null) {
                document.getElementsByName("TCTB_TC_EXEC_MASTER.ERRORS")[i - 1].value = getNodeText(selectSingleNode(runReqResponse, "//EDESC"));
            }

            document.getElementById("TCTB_RC_EXEC_MASTER.STATUS").value = 'S';
            document.getElementsByName("TCTB_TC_EXEC_MASTER.RESPONSE")[i - 1].value = getXMLString(runReqResponse);
            if (getXMLString(runReqResponse) != "") {
                var status = getNodeText(selectSingleNode(runReqResponse, "//FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (status == "FAILURE") {
                    statusField.value = "F";
                    document.getElementById("TCTB_RC_EXEC_MASTER.STATUS").value = 'F';
                }
                else 
                    statusField.value = "S";
            }
            else 
                statusField.value = "F";
            var execStatus = document.getElementsByName("TCTB_TC_EXEC_MASTER.STATUS")[i - 1].value;
            var execSrcType = document.getElementsByName("TCTB_TC_EXEC_MASTER.SOURCE_TYPE")[i - 1].value;
            var execTcCode = document.getElementsByName("TCTB_TC_EXEC_MASTER.TC_CODE")[i - 1].value;
            var execRefNo = document.getElementsByName("TCTB_TC_EXEC_MASTER.EXEC_REF_NO")[i - 1].value;
            var execResponse = getXMLString(runReqResponse);

            var keyValues = fnUpdateExecutionResponse(execStatus, execSrcType, execTcCode, execRefNo, execResponse);
            document.getElementsByName("TCTB_TC_EXEC_MASTER.KEY_VALUES")[i - 1].value = keyValues;
        }

        if (haltOnError && execStatus == 'F') {
            document.getElementById("TCTB_RC_EXEC_MASTER.HALT_ON_ERROR").checked = true;
            break;
        }

    }

    var date = new Date();
    document.getElementById("TCTB_RC_EXEC_MASTER.EXEC_DT_STAMP").value = timeDifference(date, date1);
    len = 0;
    if (parent.g_appEntryPoint != 'DB') {
        fnServiceLoginOut(response);
    }
    fnEnableLogButtons('SAVE');
    disableForm();
}

function processResponse(response) {
    var msgStatus = getNodeText(selectSingleNode(response, "//RAD_RES_ENV/RAD_HEADER/MSGSTAT"));

    if (msgStatus == "FAILURE") {
        var logdbmsgs = selectNodes(response, "//RAD_RES_ENV/RAD_BODY/RAD_ERRORS/ERROR");
        var logmCODE = "";
        var logmMESSAGE = "";
        var log1, log2;
        for (var lb = 0;lb < logdbmsgs.length;lb++) {
            log1 = getNodeText(selectNodes(logdbmsgs[lb], "EDESC")[0]);
            log2 = getNodeText(selectNodes(logdbmsgs[lb], "ECODE")[0]);
            logmMESSAGE = log1 + "," + log2;
            logmCODE = logmCODE + "~" + logmMESSAGE;
        }
        var checkstatus1 = getNodeText(selectSingleNode(response, "//RAD_RES_ENV/RAD_BODY/RAD_ERRORS/ERROR/ETYPE"));
        alertMsg(logmCODE, checkstatus1);
    }

    else {
        alertMsg(getNodeText(response.getElementsByTagName("ERROR")[0]), "I");
        disableForm();
        fnEnableLogButtons('SAVE');
        fnshowResponse(response);
        return true;
    }
}

function winrtn() {
    fnEnableLogButtons("CANCEL");
    var r = alertMsg("Changes Will Be Lost Do You Want To Proceed", "O");
    logScreen = "A";

}

function upper(r) {
    r.value = r.value.toUpperCase();
}

function fnEnterQuery() {
    fnReset();
    disableForm();

    var gPkFieldfq = gPkField.split("~");
    for (var pklen = 0;pklen < gPkFieldfq.length;pklen++) {
        document.getElementById(gPkFieldfq[pklen]).disabled = false;
        document.getElementById(gPkFieldfq[pklen]).focus();
    }

    fnEnableLogButtons('ENQRY');
    if (parent.gwinFuncId == "TCDXLUPD") {
        document.getElementById(gPkField).disabled = true;
        document.getElementById(gPkField).className = "TXTro";
    }
    if (parent.gwinFuncId == 'TCDRCEXC') {
        document.getElementById("TCTB_RC_EXEC_MASTER.EXEC_REF_NO").disabled = false;
        document.getElementById("TCTB_RC_EXEC_MASTER.EXEC_REF_NO").className = "TXTstd";
    }
    if (parent.gwinFuncId == "TCDTCRPT") {
        document.getElementById("close").disabled = true;
        document.getElementsByName("close")[0].className = "BUTTONToolbarD";
        document.getElementById("TCDTCRPT_PARAMS.RELEASE_CODE").value = parent.relCode;
        document.getElementById("TCDTCRPT_PARAMS.ENV_CODE").value = parent.envCode;
    }

}

function checkAndAutoPupolateJNDI() {
	if (document.getElementById("RDTM_ENV_MASTER.ENV_CODE") == null) {
		alertMessage("Please mention Environment Code", "E");
	} else {
		document.getElementById("RDTM_ENV_MASTER.JNDI_NAME").value = "jdbc/"
				+ document.getElementById("RDTM_ENV_MASTER.ENV_CODE").value + "_"
				+ document.getElementById("RDTM_ENV_MASTER.DB_SCHEMA").value;
	}
}

function fnExecuteQuery(e) {
    var event = window.event || e;
    parent.gAction = "EXECUTEQUERY";
    parent.gReqType = "FID";
    parent.gReqCode = parent.gAction;
    if (parent.gwinFuncId == "RDSNFTRG" || parent.gwinFuncId == "RDDNFTRG") {
        parent.gRadOrUser = "USER";
    }

    if (parent.gIsSummary == 0) {

        if (parent.gwinFuncId == 'TCDRCEXC') {
            gPkField = "TCTB_RC_EXEC_MASTER.EXEC_REF_NO";
        }
        if (parent.gwinFuncId == 'TCDXLBUP') {
            parent.gAction = "FETCH_TCS";
            gPkField = "TCTB_TC_BULK_MASTER.FUNCTION_ID";
        }
        if (parent.gwinFuncId != 'TCDTCRPT' && parent.gwinFuncId != 'TCDRCRPT') {
            if (document.getElementById(gPkField).value == "") {
                alertMsg("Mandatory Field Cannot Be Null...", "E");
                return;
            }
        }
        if (parent.gwinFuncId == 'TCDXLBUP') {
            parent.gAction = "FETCH_TCS";
        }
        if (fnEventsHandler('fnExecuteQuery', '')) {
            return true;
        }
        else {
            createAdmnDom();
            var gPkFielder = gPkField.split("~");
            for (var pklen = 0;pklen < gPkFielder.length;pklen++) {
                var pkDbt = gPkFielder[pklen].split(".")[0];
                var pkDbc = gPkFielder[pklen].split(".")[1];
                setNodeText(selectSingleNode(parent.gAdmnDom, "//" + pkDbt + "/" + pkDbc), document.getElementById(gPkFielder[pklen]).value);
                setNodeText(selectSingleNode(parent.gAdmnDom, "//" + pkDbt + "/" + pkDbc), document.getElementById(gPkFielder[pklen]).value);
            }

            var radReqDOM = parent.buildRADXml();
            var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
            var msgStatus = getNodeText(selectSingleNode(response, "//RAD_RES_ENV/RAD_HEADER/MSGSTAT"));
            if (msgStatus == "FAILURE") {
                alertMsg(getNodeText(response.getElementsByTagName("ERROR")[0]), "E");
                return;
            }
            else {
                if (fnEventsHandler('fnPostExecuteQuery', getXMLString(response))) {
                    return true;
                }
                else {
                    fnshowResponse(response);
                }
            }
        }
        disableForm();
        fnEnableLogButtons('EXQRY');
        if (parent.gwinFuncId == "TCDTCRPT") {
            document.getElementById("close").disabled = true;
            document.getElementsByName("close")[0].className = "BUTTONToolbarD";

            document.getElementById("TCDTCRPT_PARAMS.RELEASE_CODE").value = parent.relCode;
            document.getElementById("TCDTCRPT_PARAMS.ENV_CODE").value = parent.envCode;
        }
		if (parent.gwinFuncId == "RDDUSRDF") { 
		document.getElementById("RDTM_USERS.USER_PASSWORD").value="XXXXXXXXXXX";
		}
    }
    else {
        deleteAll(parent.gwinFuncId + "_SUMMARY_RESULT");
        parent.gAction = "EXECUTEQUERY";
        var fldNode = loadXMLDoc(parent.gMsgxml);
        var type = selectSingleNode(fldNode, "//FLD/FN[@PARENT = '']").getAttribute("TYPE");
        var fldTag = getNodeText(selectSingleNode(fldNode, "//FLD"));
        fldTag = replaceAll(fldTag, "~", ",");
       // var testquery = "FETCH@SELECT count(*) FROM " + type;
        functtest1(type, event);
        page1 = Math.ceil(firstrow / 15);
        page1 = page1 + 1;
        page2 = Math.ceil(countoflines / 15);
        document.getElementById('pagesflow').innerText = " " + page1 + "of" + page2;
        if (page1 < page2 && page1 == 1) {
            document.getElementById('navFirst').disabled = true;
            document.getElementById('navPrev').disabled = true;
            document.getElementById('navNext').disabled = false;
            document.getElementById('navLast').disabled = false;
        }
        if (page1 <= page2 && page1 != 1) {
            document.getElementById('navFirst').disabled = false;
            document.getElementById('navPrev').disabled = false;
            document.getElementById('navNext').disabled = true;
            document.getElementById('navLast').disabled = true;
        }
        if (page2 == 1) {
            document.getElementById('navFirst').disabled = true;
            document.getElementById('navPrev').disabled = true;
            document.getElementById('navNext').disabled = true;
            document.getElementById('navLast').disabled = true;
        }
        if (page1 > 1 && page1 < page2) {
            document.getElementById('navFirst').disabled = false;
            document.getElementById('navPrev').disabled = false;
            document.getElementById('navNext').disabled = false;
            document.getElementById('navLast').disabled = false;
        }

       // var queryString = "FETCH@SELECT " + fldTag + " FROM (select b.*, rownum as rno from  " + type + " b )";
        var NumberOfTables = document.getElementById(parent.gwinFuncId).getElementsByTagName("fieldset");
        var fldVals = " WHERE rno > " + firstrow + " and rno <" + lastrow;
        var whereclause_1="";
        for (var tableIndex = 0;tableIndex < NumberOfTables.length;tableIndex++) {
            var tableObj = NumberOfTables[tableIndex];
            for (var index = 0;index < tableObj.getElementsByTagName("INPUT").length;index++) {
                value = tableObj.getElementsByTagName("INPUT")[index].value;
                if (tableObj.getElementsByTagName("INPUT")[index].value != "") {
                  //  queryString = "FETCH@SELECT " + fldTag + " FROM (select b.*, rownum as rno from  " + type + " b  WHERE " + tableObj.getElementsByTagName("INPUT")[index].getAttribute("dbcol") + " like '" + tableObj.getElementsByTagName('INPUT')[index].value + "')";
                    whereclause_1=" WHERE " + tableObj.getElementsByTagName("INPUT")[index].getAttribute("dbcol") + " like '" + tableObj.getElementsByTagName('INPUT')[index].value + "'" +
                    		" order by "+tableObj.getElementsByTagName("INPUT")[index].getAttribute("dbcol")+")";
                }
            }
        }
        //queryString += fldVals;
        if(whereclause_1==""){
        	whereclause_1=" )";
        }
        whereclause_1 += fldVals;
        var rsltTable = document.getElementById(parent.gwinFuncId).getElementsByTagName("TABLE")[0].id;
        fnQuerySummary("RADINFRA_QUERY~"+fldTag+"~"+type,whereclause_1, rsltTable, event);
    }
    parent.gRadOrUser = "RAD";
}

function doNavigate1(type) {

    switch (type) {
        case gcNAV_FIRST: {
            firstrow = 0;
            lastrow = 15;
            fnExecuteQuery();
        }
        break;
        case gcNAV_PREVIOUS: {
            if (firstrow <= 15) {
                firstrow = 0;
                lastrow = 15;
            }
            else {
                firstrow = firstrow - 15;
                lastrow = lastrow - 15;
            }

            fnExecuteQuery();
        }
        break;
        case gcNAV_NEXT: {
            if (lastrow >= countoflines) {
                firstrow = countoflines - 15;
                lastrow = countoflines;
            }
            else {
                firstrow = firstrow + 15;
                lastrow = lastrow + 15;
            }
            fnExecuteQuery();
        }
        break;
        case gcNAV_LAST: {
            if (countoflines >= 15) {
                firstrow = countoflines - 15;
                lastrow = countoflines;
            }
            else {
                firstrow = 0;
                lastrow = countoflines;

            }
            fnExecuteQuery();
        }
        break;
        default :
            alertMessage("Program Error: doNavigate doesn't handle this action", "E");
    }

}

function functtest1(queryData, e) {
    var event = window.event || e;
    parent.gReqType = "APP";
    parent.gReqCode = parent.gAction;
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), "RADINFRA_COUNT");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), queryData);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");

    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
    var multRec = "";
    //var tableObj = document.getElementById(tblname);
    try {
        multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
    }
    catch (e) {
        multRec = response.substring(9, response.indexOf("</Records>")).split(">");
    }

    countoflines = multRec[0];
    return true;
}

function fnExecuteQuery_RDDNFTRG() {
    parent.gAction = "FETCH_TRIGGERS";
    parent.gReqType = "APP";
    parent.gRadOrUser = "USER";
    parent.gReqCode = parent.gAction;
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    var tempQuery = "SELECT * FROM GWTM_NOTIFICATION_TRIGGERS WHERE TRIGGER_CODE ='" + document.getElementById(gPkField).value + "'";
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), tempQuery);

    //	var radReqDOM = "SELECT * FROM GWTM_NOTIFICATION_TRIGGERS WHERE TRIGGER_CODE ='" + document.getElementById(gPkField).value + "'";
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
    var msgStatus = getNodeText(selectSingleNode(response, "//RAD_RES_ENV/RAD_HEADER/MSGSTAT"));
    if (msgStatus == "FAILURE") {
        alertMsg(getNodeText(response.getElementsByTagName("ERROR")[0]), "E");
        return;
    }
    else {
        try {
            var fldNode = loadXMLDoc(parent.gMsgxml);
            fldNode = selectSingleNode(fldNode, "//FLD");
            selectSingleNode(response, "//RAD_BODY").insertBefore(fldNode, selectSingleNode(response, "//RAD_BODY/REC"));
            fnshowResponse(response);
        }
        catch (e) {
        }
    }
    parent.gRadOrUser = "RAD";
    disableForm();
    fnEnableLogButtons('EXQRY');
    var tab = document.getElementById("GWTM_NOTIFICATION_TRIGGERS.BASE_TABLE").value;
    fnbasetablepopulate(tab);
}

function showExcel() {

    var prevGAction = parent.gAction;
    //frames['itcmexcel'].location.href = "about:blank";
    parent.gAction = "EXECUTEQUERY";
    parent.gReqType = "FID";
    var tcId = document.getElementById("TCTB_TC_MASTER.TC_CODE").value;
    var queryData = "";
    createAdmnDom();
    var pkDbt = gPkField.split(".")[0];
    var pkDbc = gPkField.split(".")[1];
    setNodeText(selectSingleNode(parent.gAdmnDom, "//" + pkDbt + "/" + pkDbc), document.getElementById(gPkField).value);
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");

    parent.gReqType = "APP";
    parent.gReqCode = "SHOWEXCEL";
    parent.gSubFolder = tcId;
    var radReqDOM = parent.buildRADXml();
    response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(response), "RADClientHandler");
    parent.gAction = prevGAction;
    //var path = parent.username + "\\" + parent.userterminal + "\\" + parent.usersequence; 
    var path = parent.username + "\\" + parent.usersequence;
    window.open("DownLoadFile?USERNAME=" + path+"&X-CSRFTOKEN="+mainWin.CSRFtoken, "", "");

    parent.gReqType = "APP";
    parent.gReqCode = "DELETETEMP";
    parent.gSubFolder = tcId;
    var radReqDOM = parent.buildRADXml();
    response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");

}

function showOldExcel() {
    var prevGAction = parent.gAction
    //frames['itcmexcel'].location.href = "about:blank";
    parent.gAction = "EXECUTEQUERY";
    parent.gReqType = "FID";
    var tcId = document.getElementById("TCTB_TC_MASTER.TC_CODE").value;
    var queryData = "";
    createAdmnDom();
    var pkDbt = gPkField.split(".")[0];
    var pkDbc = gPkField.split(".")[1];
    setNodeText(selectSingleNode(parent.gAdmnDom, "//" + pkDbt + "/" + pkDbc), document.getElementById(gPkField).value);
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");

    parent.gReqType = "APP";
    parent.gReqCode = "OLD_SHOWEXCEL";
    parent.gSubFolder = tcId;
    var radReqDOM = parent.buildRADXml();
    response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(response), "RADClientHandler");
    //var path = parent.username + "\\" + parent.userterminal + "\\" + parent.usersequence; 
    var path = parent.username + "\\" + parent.usersequence;
    window.open("DownLoadFile?USERNAME=" + path+"&X-CSRFTOKEN="+mainWin.CSRFtoken, "", "");
    parent.gReqType = "APP";
    parent.gReqCode = "DELETETEMP";
    parent.gSubFolder = tcId;
    var radReqDOM = parent.buildRADXml();
    response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
    parent.gAction = prevGAction;
}

function fnUnlock() {
    parent.gAction = "MODIFY";
    parent.gReqCode = parent.gAction;
    enableForm();
    fnEnableLogButtons('MODIFY');
}

function createAdmnDom() {
    var action = parent.gwinFuncId;
    var objReturndbDOM;
    var objReturnDataRecNode;
    var objNewChildNode;
    var arrFieldNames;
    var fldNode = loadXMLDoc(parent.gMsgxml);
    var fnNodeList = selectNodes(fldNode, "//FLD/FN[@PARENT = '']");
    var parentDs = fnNodeList[0].getAttribute("TYPE");
    var FN = fnNodeList[0];
    var fldTag = getNodeText(FN);
    dbIndexArray[parentDs] = "1";
    var str = "<" + parentDs + " ID=\"1\"  TYPE=\"SINGLE\"/>";
    parent.gAdmnDom = loadXMLDoc(str);
    parent.gAdmnDom = selectSingleNode(parent.gAdmnDom, parentDs);
    arrFieldNames = fldTag.split("~");
    for (var i = 0;i < arrFieldNames.length;i++) {
        if (arrFieldNames[i] != "") {
            objNewChildNode = parent.gAdmnDom.parentNode.createElement(arrFieldNames[i]);
            parent.gAdmnDom.appendChild(objNewChildNode);
        }
    }
}

function updateAdmnDOM(DBT, tableName) {
    var rec = document.getElementById(tableName).tBodies[0].rows.length;
    var arrFieldNames;
    var parentNode;
    var node;
    var parentBlkType;
    var id;
    var relation = "1";
    var parent;
    var dbDataDOM;
    var dataXML = "<?xml version='1.0' encoding='UTF-8'?>";
    dbDataDOM = loadXMLDoc(dataXML);
    node = dbDataDOM.createElement(DBT);
    node.setAttribute("ID", rec);
    if (relationArray[DBT] != "") {
        relation = relationArray[DBT].split("~")[1];
    }
    if (relation == 'N')
        node.setAttribute("TYPE", "MULTIPLE");
    else if (relation == '1')
        node.setAttribute("TYPE", "SINGLE");
    var fldNode = loadXMLDoc(top.parent.gMsgxml);
    var fnNodeList = selectNodes(fldNode, "//FLD/FN[@TYPE = '" + DBT + "']");
    var FN = fnNodeList[0];
    var fldTag = getNodeText(FN);
    arrFieldNames = fldTag.split("~");
    for (var i = 0;i < arrFieldNames.length;i++) {
        if (arrFieldNames[i] != "") {
            var childNode = dbDataDOM.createElement(arrFieldNames[i]);
            node.appendChild(childNode);
        }
    }
    var nodepath = "";
    var tempnodepath = "";
    while (relationArray[DBT] != "") {
        parent = relationArray[DBT].split("~")[0];
        tempnodepath = parent + "[@ID=" + dbIndexArray[parent] + "]";
        DBT = parent;
    }
    nodepath = "//" + tempnodepath;
    parentNode = selectSingleNode(top.parent.gAdmnDom, nodepath);
    parentNode.appendChild(node);
}

function appendAdmnDOM() {
    var action = parent.gwinFuncId;
    var DBT = "";
    var DBC = "";
    var value = "";
    var tblObj;
    var tableobject;
    var tagName = "";
    var NumberOfTables = document.getElementById(parent.gwinFuncId).getElementsByTagName("div");
    for (var tableIndex = 0;tableIndex < NumberOfTables.length;tableIndex++) {
        tblObj = NumberOfTables[tableIndex];
        DBT = "";
        DBT = tblObj.getAttribute("DBT");
        var tablType = tblObj.getAttribute("TYPE");
        if (DBT && DBT != "") {
            var divele = tblObj.getElementsByTagName("*");
            for (var index = 0;index < divele.length;index++) {
                if (divele[index].tagName == "INPUT" || divele[index].tagName == "SELECT" || divele[index].tagName == "TEXTAREA") {
                    DBC = divele[index].getAttribute("DBC");
                    value = getFieldData(divele[index]);
                    if (DBC && DBC != "") {
                        if (tablType == 'SINGLE')
                            appendValue(DBT, DBC, value, 1);
                        else 
                            appendValue(DBT, DBC, value, index + 1);
                    }
                }
            }
        }
    }
    var NumberOfTables = document.getElementById(parent.gwinFuncId).getElementsByTagName("TABLE");
    for (var tableIndex = 0;tableIndex < NumberOfTables.length;tableIndex++) {
        tblObj = NumberOfTables[tableIndex];
        DBT = "";
        DBT = tblObj.getAttribute("DBT");
        var tablType = tblObj.getAttribute("TYPE");
        if (DBT && DBT != "") {
            for (var index = 0;index < tblObj.tBodies[0].rows.length;index++) {
                for (var cellindex = 0;cellindex < tblObj.tBodies[0].rows[index].cells.length;cellindex++) {
                    tableobject = tblObj.tBodies[0].rows[index].cells[cellindex];
                    var tagName = "";
                    if (tableobject.children[0])
                        tagName = tableobject.children[0].tagName;
                    if (tagName) {
                        DBC = tableobject.getElementsByTagName(tagName)[0].getAttribute("DBC");
                        value = getFieldData(tableobject.getElementsByTagName(tagName)[0]);
                    }
                    if (DBC && DBC != "") {
                        if (tablType == 'SINGLE')
                            appendValue(DBT, DBC, value, 1);
                        else 
                            appendValue(DBT, DBC, value, index + 1);
                    }
                }
            }
        }
    }

}

function deleteAdmnDOM(DBT, id) {
    var parentds;
    var dsnode;
    var nodeList;
    dsnode = selectSingleNode(parent.gAdmnDom, "//" + DBT + "[@ID='" + id + "']");
    dsnode.parentNode.removeChild(dsnode);
    nodeList = selectNodes(parent.gAdmnDom, "//" + DBT);
    var currNode = null;
    var idAttrValue = 0;
    for (var nodeIndex = 0;nodeIndex < nodeList.length;nodeIndex++) {
        idAttrValue = nodeIndex + 1;
        currNode = nodeList[nodeIndex];
        currNode.setAttribute("ID", idAttrValue);
    }
}

function delRow1(tableName) {
    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    var DBT = tableObject.DBT;
    for (var index = numRows - 1;index >= 0;index--) {
        if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            tableObject.tBodies[0].deleteRow(index);
            if (selectSingleNode(parent.gAdmnDom, "//" + DBT + "[@ID='" + (index + 1) + "']")) {
                deleteAdmnDOM(DBT, index + 1);
            }
        }
    }
}

function appendValue(DBT, DBC, value, id) {
    var parent1 = "";
    var nodepath = "";
    var tempnodepath = DBT + "[@ID='" + id + "']/" + DBC;
    while (relationArray[DBT] != "") {
        parent1 = relationArray[DBT].split("~")[0];
        tempnodepath = parent1 + "[@ID=" + dbIndexArray[parent1] + "]" + "/" + tempnodepath;
        DBT = parent1;
    }
    nodepath = "//" + tempnodepath;
    if (selectSingleNode(top.parent.gAdmnDom, nodepath))
        setNodeText(selectSingleNode(top.parent.gAdmnDom, nodepath), value);
}

function fnMulipleEntryRow_onClick(DBT) {
    var srcElement;
    var objTR;
    var DBT;
    if (event != null) {
        srcElement = event.srcElement;
        objTR = srcElement
        try {
            while (objTR.tagName != "TABLE") {
                objTR = objTR.parentElement;
            }
            DBT = objTR.getAttribute("DBT");
        }
        catch (e) {
        }
        dbIndexArray[DBT] = srcElement.parentElement.parentElement.rowIndex;
    }
}

function showData(dbDom) {
    var fldNode = loadXMLDoc(parent.gMsgxml);
    var fnNodeList1 = selectNodes(fldNode, "//FLD/FN");
    var currFNNode = null;
    var currFN = "";
    var fnTSL = "";
    var fnArray = null;
    var colName = "";
    for (var nodeIndex = 0;nodeIndex < fnNodeList1.length;nodeIndex++) {
        currFNNode = fnNodeList1[nodeIndex];
        currFN = currFNNode.getAttribute("TYPE");
        fnTSL = getNodeText(currFNNode);
        fnArray = fnTSL.split("~");
        var type = currFNNode.getAttribute("RELATION_TYPE");
        var parentDS = currFNNode.getAttribute("PARENT");
        if (type == "1") {
            for (var colIndex = 0;colIndex < fnArray.length;colIndex++) {
                colName = fnArray[colIndex];
                try {
                    if (document.getElementById(currFN + "." + colName).getAttribute("TYPE") == "checkbox") {
                        if (getNodeText(selectSingleNode(dbDom, "//" + currFN + "/" + colName)) == "Y")
                            document.getElementById(currFN + "." + colName).checked = true;
                        else 
                            document.getElementById(currFN + "." + colName).checked = false;
                    }
                    else 
                        document.getElementById(currFN + "." + colName).value = getNodeText(selectSingleNode(dbDom, "//" + currFN + "/" + colName));
                }
                catch (e) {
                }
            }
        }
        var tabobj = selectNodes(dbDom, "//" + currFN);
        if (type == "N") {
            for (var rec = 0;rec < tabobj.length;rec++) {
                var forDetail = true;
                if (savep == false)
                    addNewRow1(currFN, forDetail);
                for (var colIndex = 0;colIndex < fnArray.length;colIndex++) {
                    colName = fnArray[colIndex];
                    try {
                        if (document.getElementsByName(currFN + "." + colName)[rec].getAttribute("TYPE") == "checkbox") {
                            if (getNodeText(selectNodes(dbDom, "//" + currFN + "/" + colName)[rec]) == "Y") {
                                document.getElementsByName(currFN + "." + colName)[rec].checked = true;
                            }
                            else {
                                document.getElementsByName(currFN + "." + colName)[rec].checked = false;
                            }
                        }
                        else 
                            document.getElementsByName(currFN + "." + colName)[rec].value = getNodeText(selectNodes(dbDom, "//" + currFN + "/" + colName)[rec]);

                    }
                    catch (e) {
                    }
                }
            }
        }
    }
}

function fnCreateDOM(recs, head, dbDom, fld) {
    if (recs != null) {
        for (var j = 0;j < recs.length;j++) {
            var nodeName = recs[j].getAttribute("TYPE");
            if (selectNodes(fld, "//FN[@TYPE='" + nodeName + "']")[0]) {
                var rel = selectNodes(fld, "//FN[@TYPE='" + nodeName + "']")[0].getAttribute("RELATION_TYPE");
                if (rel == '1') {
                    rel = 'SINGLE'
                }
                if (rel == 'N') {
                    rel = 'MULTIPLE'
                }
                var str = "<" + nodeName + " ID='" + (j + 1) + "' TYPE='" + rel + "'/>";
                newl = loadXMLDoc(str);
                var tagArr = new Array();
                var valArr = new Array();
                fldTags = getNodeText(selectNodes(fld, "//FN[@TYPE='" + nodeName + "']")[0]);
                fvs = getNodeText(selectSingleNode(recs[j], "FV"));
                tagArr = fldTags.split("~");
                valArr = fvs.split("~");
                for (p = 0;p < tagArr.length;p++) {
                    newTag = newl.createElement(tagArr[p]);
                    setNodeText(newTag, valArr[p]);
                    selectSingleNode(newl, nodeName).appendChild(newTag);
                }
                head.appendChild(fnImportNode(head.parentNode, selectSingleNode(newl, nodeName)))
                var recnode = selectNodes(recs[j], "REC");
                var id = j + 1;
                h1 = selectSingleNode(dbDom, "//" + nodeName + "[@ID='" + id + "']");
                fnCreateDOM(recnode, h1, dbDom, fld);
            }
        }
    }
    return dbDom;
}

function fnReset() {
    resetElements();
    if (multipleEntryIDs[parent.gwinFuncId]) {
        var tables = multipleEntryIDs[parent.gwinFuncId].split("~");
        for (var i = 0;i < tables.length;i++) {
            if (tables[i] != "")
                deleteAll(tables[i]);
        }
    }
}

function fnRset() {
    resetElmnts();
    if (parent.multipleEntryIDs[parent.gwinFuncId]) {
        var tables = parent.multipleEntryIDs[parent.gwinFuncId].split("~");
        for (var i = 0;i < tables.length;i++) {
            if (tables[i] != "")
                parent.deleteAll(tables[i]);
        }
    }
}

function resetElmnts() {
    resetAllElmnts("INPUT");
    resetAllElmnts("TEXTAREA");
    resetAllElmnts("SELECT");
}

function resetAllElmnts(type) {
    elements = parent.document.getElementsByTagName(type);

    for (var loopIndex = 0;loopIndex < elements.length;loopIndex++) {
        var tmpElem = elements[loopIndex];
        if (tmpElem.tagName.toUpperCase() == 'INPUT') {
            tmpElem.value = "";
        }
        else if (tmpElem.tagName.toUpperCase() == 'TEXTAREA') {
            tmpElem.value = "";
        }
        else if (tmpElem.tagName.toUpperCase() == 'SELECT') {
            tmpElem.value = tmpElem.options[0].value;
        }
    }
}

function resetElements() {
    resetAllElements("INPUT");
    resetAllElements("TEXTAREA");
    resetAllElements("SELECT");
}

function resetAllElements(type) {

    if (document.getElementsByTagName(type) != null) {
        elements = document.getElementsByTagName(type);
    }
    else if (parent.document.getElementsByTagName(type) != null) {
        elements = parent.document.getElementsByTagName(type);
    }

    for (var loopIndex = 0;loopIndex < elements.length;loopIndex++) {
        var tmpElem = elements[loopIndex];
        if (tmpElem.tagName.toUpperCase() == 'INPUT') {
            tmpElem.value = "";
        }
        else if (tmpElem.tagName.toUpperCase() == 'TEXTAREA') {
            tmpElem.value = "";
        }
        else if (tmpElem.tagName.toUpperCase() == 'SELECT') {
            tmpElem.value = tmpElem.options[0].value;
        }
    }
}

function fnUploadBlockDetails() {
    var load_path = document.getElementById("TCTM_BLOCK_DETAILS.RAD_UPLOAD").value;
    if (load_path == "") {
        alertMsg("Source Directory Cannont Be Null ...", "E");
        return false;
    }
    deleteAll("LOG");
    var fileList = radxmlFiles;
    fileList = fileList.split("\n");
    for (var fl = 0;fl < fileList.length;fl++) {
        fileNamesArry[fl] = parent.trim(fileList[fl].substring(fileList[fl].lastIndexOf("\\") + 1, fileList[fl].length));
        filePathsArry[fileNamesArry[fl]] = fileList[fl].split("\r")[0];

    }
    for (var rfl = 0;rfl < fileNamesArry.length;rfl++) {
        subFldr = filePathsArry[fileNamesArry[rfl]].substring(0, filePathsArry[fileNamesArry[rfl]].lastIndexOf("\\"));
        subFldr = subFldr.substring(0, subFldr.lastIndexOf("\\"));
        subFldr = subFldr.substring(subFldr.lastIndexOf("\\") + 1, subFldr.length);
        if (fileNamesArry[rfl].indexOf("_RAD") !=  - 1) {
            fnIterateFiles(subFldr, fileNamesArry[rfl]);
        }
    }

}

function fnIterateFiles(subfldr, fileName) {
    var NewDOM = "";
    if (fileName.indexOf("_RAD") !=  - 1) {
        NewDOM = loadXMLDoc(NewDOM);
        if (!selectSingleNode(NewDOM, "RAD_FUNCTIONS")) {
            fnShowResult('LOG', fileName, subfldr, 'N', "Invalid RADXML");
        }
        if (selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_TYPE"))
            NewDOM = fnPrepareConsolDOM(NewDOM);

        parent.gReqCode = "TCMBLKUPLOAD";
        parent.gReqType = "GEN";
        var radReqDOM = parent.buildRADXml();
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(NewDOM), "RADClientHandler");
        fnShowResult('LOG', fileName, subfldr, parent.gfnPostStatus, "");
    }
}

function fnEventsHandler(eventName, arg) {
    try {
        if (!eval(eventName + "_" + parent.gwinFuncId + "(arg)"))
            return true;
    }
    catch (e) {
        return false;
    }

}

function fnExecuteQuery_TCDCRREQ(args) {
    var queryData = "";
    createAdmnDom();
    var pkDbt = gPkField.split(".")[0];
    var pkDbc = gPkField.split(".")[1];
    setNodeText(selectSingleNode(parent.gAdmnDom, "//" + pkDbt + "/" + pkDbc), document.getElementById(gPkField).value);
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");

    try {
        var index = response.indexOf("</FCUBS_REQ_ENV>");
    }
    catch (e) {
        index = getXMLString(response).indexOf("</FCUBS_REQ_ENV>");
    }

    if (index ==  - 1) {
        processResponse(response);
        return;
    }

    var fcjRes = response.substring(0, response.indexOf("</FCUBS_REQ_ENV>") + 16);
    fcjRes = fcjRes.substring(response.indexOf("<FCUBS_REQ_ENV>"));
    var wsRes = response.substring(0, response.lastIndexOf("</FCUBS_REQ_ENV>") + 16);
    wsRes = wsRes.substring(response.lastIndexOf("<FCUBS_REQ_ENV>"));
    document.getElementById("RDTB_UI_COLUMNS.CLOB_COL_1").value = fcjRes;
    document.getElementById("RDTB_UI_COLUMNS.CLOB_COL_2").value = wsRes;
    disableForm();
    fnEnableLogButtons('EXQRY');
}

function fnExecuteQuery_TCDRNREQ(args) {
    createAdmnDom();
    var pkDbt = gPkField.split(".")[0];
    var pkDbc = gPkField.split(".")[1];
    setNodeText(selectSingleNode(parent.gAdmnDom, "//" + pkDbt + "/" + pkDbc), document.getElementById(gPkField).value);
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
    var msgStatus = getNodeText(selectSingleNode(response, "//RAD_RES_ENV/RAD_HEADER/MSGSTAT"));
    if (msgStatus == "FAILURE") {
        alertMsg(getNodeText(response.getElementsByTagName("ERROR")[0]), "E");
        return;
    }
    parent.gAction = "QUERYXML";
    parent.gReqType = "GEN";
    parent.gReqCode = parent.gAction;
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
    var queryXml = radReqDOM.createElement("QUERYXML");
    bodyNode.appendChild(queryXml);
    bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML");
    queryXml = radReqDOM.createElement("REQ_OR_RES");
    bodyNode.appendChild(queryXml);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML/REQ_OR_RES"), 'REQ');
    bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML");
    queryXml = radReqDOM.createElement("EXEC_REF_NO");
    bodyNode.appendChild(queryXml);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML/EXEC_REF_NO"), document.getElementById(gPkField).value);
    var fcubsReq = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
    document.getElementById("TAtcmrunreq").value = fcubsReq
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
    var queryXml = radReqDOM.createElement("QUERYXML");
    bodyNode.appendChild(queryXml);
    bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML");
    queryXml = radReqDOM.createElement("REQ_OR_RES");
    bodyNode.appendChild(queryXml);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML/REQ_OR_RES"), 'RES');
    bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML");
    queryXml = radReqDOM.createElement("EXEC_REF_NO");
    bodyNode.appendChild(queryXml);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML/EXEC_REF_NO"), document.getElementById(gPkField).value);
    var fcubsRes = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
    document.getElementById("TAtcmshores").value = fcubsRes;
    var body = selectSingleNode(response, "//RAD_BODY");
    var recnode = selectNodes(body, "//REC");
    fvs = getNodeText(selectSingleNode(recnode[1], "FV"));
    var tmpFV = fvs.split("~");
    document.getElementById("TCTB_TC_EXEC_MASTER.TC_DESC").value = tmpFV[0];
    document.getElementById("TCTB_TC_EXEC_MASTER.FUNCTION_ID").value = tmpFV[1];
    document.getElementById("TCTB_TC_EXEC_MASTER.ACTION_CODE").value = tmpFV[2];
    document.getElementById("TCTB_TC_EXEC_MASTER.SERVICE_NAME").value = tmpFV[3];
    document.getElementById("TCTB_TC_EXEC_MASTER.OPERATION_CODE").value = tmpFV[4]
    fnshowResponse(response);
    disableForm();
    fnEnableLogButtons('EXQRY');
}

function fnQuerySummary(queryData,whereclause, tblname, e) {
    var event = window.event || e;
    parent.gReqType = "APP";
    parent.gReqCode = parent.gAction;
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryData);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"),    whereclause);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
    var multRec = "";
    var tableObj = document.getElementById(tblname);
    try {
        multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
    }
    catch (e) {
        multRec = response.substring(9, response.indexOf("</Records>")).split(">");
    }
    for (var sr = 0;sr < multRec.length;sr++) {
        if (multRec[sr] != "") {
            var singleRec = multRec[sr].split("~");
            var forDetail = false;
            addNewRow1(tblname, forDetail);
            addEvent(tableObj.tBodies[0].rows[sr], 'ondblclick', "fnShowDetail('" + tblname + "',event)");
            addEvent(tableObj.tBodies[0].rows[sr], 'onkeydown', "fnOnKeyShowDetail('" + tblname + "',event)");
            for (var pnt = 0;pnt < singleRec.length;pnt++) {
                if (singleRec[pnt] == "null") {
                    tableObj.tBodies[0].rows[sr].cells[pnt + 1].getElementsByTagName("INPUT")[0].value = "";
                }
                else {
                    tableObj.tBodies[0].rows[sr].cells[pnt + 1].getElementsByTagName("INPUT")[0].value = singleRec[pnt];
                }
            }
        }
    }
    if (tblname == "TCRPRT2_SUMMARY_RESULT" || tblname == "TCRPRT1_SUMMARY_RESULT") {
        var failcount = 0;
        var scount = 0;
        for (var sr = 0;sr < multRec.length;sr++) {
            if (multRec[sr] != "") {
                var singleRec = multRec[sr].split("~");
                if (singleRec[singleRec.length - 1] == 'F') {
                    failcount = failcount + 1;
                }
                else if (singleRec[singleRec.length - 1] == 'S') {
                    scount = scount + 1;
                }
            }
        }
        document.getElementById('TCTB_TC_EXEC_MASTER.success').value = scount;
        document.getElementById('TCTB_TC_EXEC_MASTER.Failure').value = failcount;
        document.getElementById('TCTB_TC_EXEC_MASTER.Total').value = sr - 1;
    }
}

function addNewRow1(tableName, forDetail) {
    var trow = getTblRow(tableName, forDetail);
    var tableRef = document.getElementById(tableName);
    var newRow = tableRef.tBodies[0].insertRow(tableRef.tBodies[0].rows.length);
    var rowArr = new Array();
    var tHead = tableRef.tHead.rows[0];
    var tBodyHTML = document.getElementById(tableName).tBodies[0].rows[0].innerHTML;
    tBodyHTML = trow;
    var trwln = document.getElementById(tableName).tBodies[0].rows.length
    var R = 0;
    var trCellArray = tBodyHTML.split("</TD>");
    for (var j = 0;j < trCellArray.length - 1;j++) {
        rowArr[j] = trCellArray[j] + "</TD>";
        newCell = newRow.insertCell(newRow.cells.length);
        newRow.cells[j].innerHTML = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        try {
            newRow.cells[j].getElementsByTagName("INPUT")[0].title = "Record " + trwln + " col " + R;
        }
        catch (e) {
            newRow.cells[j].getElementsByTagName("SELECT")[0].title = "Record " + trwln + " col " + R;
        }
        if (R == 0)
            newRow.cells[j].setAttribute("scope", "row");
        rowArr[j] = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        R++;
    }
}

function getTblRow(tblName, forDetail) {
    if (forDetail) {
        var tbleRow = "";
        if (tblName == "TCTM_RC_TCS") {
            tbleRow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" type=text id=TCTM_RC_TCS.SEQUENCE_NO name=TCTM_RC_TCS.SEQUENCE_NO DBC=SEQUENCE_NO size=\"6\"></TD>" + "<TD><INPUT aria-required=\"false\" type=text id=TCTM_RC_TCS.TC_CODE name=TCTM_RC_TCS.TC_CODE DBC=TC_CODE size=\"72\"><BUTTON   class=\"BTNimg\" title=\"List Of Values\" tabindex=\"-1\" onclick=\"LOV_TC_CODE.show_lov('TCTM_RC_TCS.TC_CODE~TCTM_RC_TCS.TC_DESC~TCTM_RC_TCS.FUNCTION_ID~TCTM_RC_TCS.UI_NAME~TCTM_RC_TCS.ORIGIN_RELEASE~TCTM_RC_TCS.ACTION_CODE~TCTM_RC_TCS.SERVICE_NAME~TCTM_RC_TCS.OPERATION_CODE~','frmTCM','', 'TC Code', 'TC Code~TC Desc', 'TC Code~TC Desc',event)\"><span class=\"ICOlov\"></span></BUTTON></TD>";
        }
        else if (tblName == "TCTB_TC_EXEC_MASTER") {
            tbleRow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" type=text id=TCTB_TC_EXEC_MASTER.SEQUENCE_NO name=TCTB_TC_EXEC_MASTER.SEQUENCE_NO DBC=SEQUENCE_NO SIZE=4></TD>" + "<TD><INPUT aria-required=\"false\" type=text id=TCTB_TC_EXEC_MASTER.EXEC_REF_NO name=TCTB_TC_EXEC_MASTER.EXEC_REF_NO DBC=EXEC_REF_NO SIZE=6></TD>" + "<TD><INPUT aria-required=\"false\" type=text id=TCTB_TC_EXEC_MASTER.TC_CODE name=TCTB_TC_EXEC_MASTER.TC_CODE DBC=TC_CODE></TD>" + "<TD><SELECT aria-required=\"false\" id=TCTB_TC_EXEC_MASTER.SOURCE_TYPE name=TCTB_TC_EXEC_MASTER.SOURCE_TYPE DBC=SOURCE_TYPE><OPTION value='FC'>Flexcube</OPTION><OPTION value='WS'>Web Service</OPTION></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=TCTB_TC_EXEC_MASTER.EXCHANGE_PATTERN name=TCTB_TC_EXEC_MASTER.EXCHANGE_PATTERN DBC=EXCHANGE_PATTERN><OPTION value='IOPK'>IOPK</OPTION><OPTION value='IOFS'>IOFS</OPTION><OPTION value='FSFS'>FSFS</OPTION></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=TCTB_TC_EXEC_MASTER.ACTION_ON_OVD name=TCTB_TC_EXEC_MASTER.ACTION_ON_OVD DBC=ACTION_ON_OVD><OPTION value='I'>Ignore</OPTION><OPTION value='E'>Error</OPTION></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=checkbox id=TCTB_TC_EXEC_MASTER.AUTO_AUTH name=TCTB_TC_EXEC_MASTER.AUTO_AUTH DBC=AUTO_AUTH></TD>" + "<TD><SELECT aria-required=\"false\" id=TCTB_TC_EXEC_MASTER.STATUS name=TCTB_TC_EXEC_MASTER.STATUS DBC=STATUS><OPTION value='U'>Unprocessed</OPTION><OPTION value='S'>Success</OPTION><OPTION value='F'>Failed</OPTION><OPTION value='P'>Skip</OPTION></SELECT></TD>" + "<TD><BUTTON class=\"BTNimg\" onclick=\"launchPopup('TCTB_TC_EXEC_MASTER','TCTB_TC_EXEC_MASTER.REQUEST',10,event)\" style=\"width:70px\" enabled><sup>Request</sup></BUTTON><INPUT aria-required=\"false\" type=hidden id=TCTB_TC_EXEC_MASTER.REQUEST name='REQUEST'></TD>" + "<TD><BUTTON class=\"BTNimg\" onclick=\"launchPopup('TCTB_TC_EXEC_MASTER','TCTB_TC_EXEC_MASTER.RESPONSE',12,event)\" style=\"width:70px\" enabled><sup>Response</sup></BUTTON><INPUT aria-required=\"false\" type=hidden id=TCTB_TC_EXEC_MASTER.RESPONSE name='RESPONSE'></TD><TD><INPUT aria-required=\"false\" type=text id=TCTB_TC_EXEC_MASTER.KEY_VALUES name=TCTB_TC_EXEC_MASTER.KEY_VALUES DBC=KEY_VALUES></TD><TD><INPUT aria-required=\"false\" type=text id=TCTB_TC_EXEC_MASTER.ERRORS name=TCTB_TC_EXEC_MASTER.ERRORS DBC=ERRORS></TD><TD><INPUT aria-required=\"false\" type=hidden id=TCTB_TC_EXEC_MASTER.RC_EXEC_REF_NO name=TCTB_TC_EXEC_MASTER.RC_EXEC_REF_NO DBC=RC_EXEC_REF_NO></TD>";
        }
        else if (tblName == "RDTM_USER_RELEASES") {
            var tbleRow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" type=text id=RDTM_USER_RELEASES.RELEASE_CODE name=RDTM_USER_RELEASES.RELEASE_CODE DBC=RELEASE_CODE size=60><BUTTON class=\"BTNimg\" title=\"List Of Values\" tabindex=\"-1\" name=\"LOV\" id=\"LOV\"   onclick=\"LOV_REL_CODE.show_lov('RDTM_USER_RELEASES.RELEASE_CODE~','frmTCM','', 'Release Code', 'Release Code', 'Release Code',event)\"><span class=\"ICOlov\"></span></BUTTON></TD>" + "<TD><SELECT aria-required=\"false\" id=RDTM_USER_RELEASES.USER_ROLE name=RDTM_USER_RELEASES.USER_ROLE DBC=USER_ROLE><OPTION value='DEVELOPER'>Developer</OPTION><OPTION value='RELADMINISTRATOR'>Release Admin</OPTION><OPTION value='TCMUSER'>TCM User</OPTION><OPTION value='TCMRUSER'>TCM Read User</OPTION><OPTION value='VERCON'>Vercon</OPTION></SELECT></TD>";
        }
        else if (tblName == "TCTB_TC_BULK_TCS") {
            var tbleRow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup>  </TD>" + "<TD><INPUT aria-required=\"false\" type=text id=TCTB_TC_BULK_TCS.TC_CODE name=TCTB_TC_BULK_TCS.TC_CODE DBC=TC_CODE size=60></TD><TD><INPUT aria-required=\"false\" type=text id=TCTB_TC_BULK_TCS.UPLOAD_STATUS name=TCTB_TC_BULK_TCS.UPLOAD_STATUS DBC=UPLOAD_STATUS size=60></TD>";
        }
        else if (tblName == "TCTB_TC_EXEC_MASTER_REPORT") {
            var tbleRow = "<TD><INPUT aria-required=\"false\"  type=checkbox name=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" type=text id=TCTB_TC_EXEC_MASTER_REPORT.EXEC_REF_NO name=TCTB_TC_EXEC_MASTER_REPORT.EXEC_REF_NO DBC=EXEC_REF_NO size=35></TD><TD><INPUT aria-required=\"false\" type=text id=TCTB_TC_EXEC_MASTER_REPORT.TC_CODE name=TCTB_TC_EXEC_MASTER_REPORT.TC_CODE DBC=TC_CODE size=30></TD><TD><INPUT aria-required=\"false\" type=text id=TCTB_TC_EXEC_MASTER_REPORT.EXEC_BY name=TCTB_TC_EXEC_MASTER_REPORT.EXEC_BY DBC=EXEC_BY size=30></TD><TD><SELECT aria-required=\"false\" id=TCTB_TC_EXEC_MASTER_REPORT.STATUS name=TCTB_TC_EXEC_MASTER_REPORT.STATUS DBC=STATUS><OPTION value='U'>Uploaded</OPTION><OPTION value='S'>Success</OPTION><OPTION value='F'>Failure</OPTION></SELECT></TD>";
        }
        else if (tblName == "TCTB_RC_EXEC_MASTER_REPORT") {
            var tbleRow = "<TD><INPUT aria-required=\"false\"  type=checkbox name=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" type=text id=TCTB_RC_EXEC_MASTER_REPORT.RC_CODE name=TCTB_RC_EXEC_MASTER_REPORT.RC_CODE DBC=RC_CODE size=40></TD><TD><INPUT aria-required=\"false\" type=text id=TCTB_RC_EXEC_MASTER_REPORT.EXEC_BY name=TCTB_RC_EXEC_MASTER_REPORT.EXEC_BY DBC=EXEC_BY size=40></TD><TD><SELECT aria-required=\"false\" id=TCTB_RC_EXEC_MASTER_REPORT.STATUS name=TCTB_RC_EXEC_MASTER_REPORT.STATUS DBC=STATUS><OPTION value='U'>Uploaded</OPTION><OPTION value='S'>Success</OPTION><OPTION value='F'>Failure</OPTION></SELECT></TD>";
        }

    }
    else {
        var tbleRow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup> </TD>";
        var td = document.getElementById(tblName).rows[0].cells;
        var width;
        for (var i = 0;i < td.length - 1;i++) {
            width = td[i + 1].getAttribute("width");
            tbleRow += "<TD><INPUT aria-required=\"false\" id='' class=\"TXTro\" readonly=\"yes\" size=" + width + "></TD>";
        }
    }
    return tbleRow;
}

function fnOnKeyShowDetail(tbName, e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if (evnt.keyCode == 13 || evnt.keyCode == 32) {
        fnShowDetail(tbName, evnt);
        fnDisableBrowserKey(evnt);
        preventpropagate(evnt);
        return;
    }
}

function fnShowDetail(tbName, e) {
    var event = window.event || e;
    var eventobject = event.srcElement || event.target;
    var tmpElem = eventobject;

    while (tmpElem.tagName != "TR") {
        if (tmpElem.parentNode != null) {
            tmpElem = tmpElem.parentNode;

        }
        else {
            break;
        }
    }
    var currRow = tmpElem.rowIndex;
    try {
        var detailFuncId = parent.gwinFuncId.substring(0, 2) + "D" + parent.gwinFuncId.substring(3);
        parent.gScreenPkVal = document.getElementById(tbName).rows[currRow].cells[1].firstChild.value;
        parent.setWinVariables(detailFuncId, parent.ctrlStrngArray[detailFuncId]);
        //parent.openWindow("testwin", "RadInfra.jsp?incFile=Rad" + detailFuncId + ".jsp", detailFuncId);
        parent.openWindow("testwin", "RadInfra.jsp?incFile="+ detailFuncId , detailFuncId);
        parent.gfromSummary = true;
    }
    catch (e) {
        return 
    }
}

function enableForm() {
    if (document.getElementById(parent.gwinFuncId)) {
        enableAllElements("INPUT");
        enableAllElements("TEXTAREA");
        enableAllElements("SELECT");
        enableAllElements("BUTTON");
    }
}

function disableForm() {
    if (document.getElementById(parent.gwinFuncId)) {
        disableAllElements("INPUT");
        disableAllElements("TEXTAREA");
        disableAllElements("SELECT");
        disableAllElements("BUTTON");
    }
    if (parent.gIsSummary != "0") {
        document.getElementById("INFRA_SEARCH").disabled = false;
        document.getElementById("INFRA_RESET").disabled = false;
    }
}

function disablFrm() {
    if (parent.document.getElementById(parent.gen_gwinFuncId)) {
        parent.disableAllElements("INPUT");
        parent.disableAllElements("TEXTAREA");
        parent.disableAllElements("SELECT");
        parent.disableAllElements("BUTTON");
    }

}

function enableAllElements(type) {
    var flds = document.getElementById(parent.gwinFuncId).getElementsByTagName(type);
    for (var i = 0;i < flds.length;i++) {
        if (flds[i].readonly == undefined) {
            flds[i].disabled = false;
            if (type == "INPUT")
                flds[i].className = "TXTstd";
        }
    }
}

function disableAllElements(type) {
    var flds = document.getElementById(parent.gwinFuncId).getElementsByTagName(type);
    for (var i = 0;i < flds.length;i++) {
        if (flds[i].getAttribute("enabled") == null) {
            flds[i].disabled = true;
            if (type == "INPUT")
                flds[i].className = "TXTro";
        }
    }
}

function shortcut(e) {
    var event = window.event || e;
    var srcElem = e.srcElement || e.target;
    var type = srcElem.type;
    if ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 95 && event.keyCode < 106)) {
        return;
    }
    else if (event.keyCode == 118) {
        // F7 Function key
        if (parent.gAction != "") {
        }
        parent.gAction = 'ENTERQUERY';
        fnEnterQuery();
    }
    else if (event.keyCode == 119) {
        // F8 Function key
        parent.gAction = 'EXECUTEQUERY';
        fnExecuteQuery();
    }
}

function fnRunRequest(responseStr) {
    parent.gAction = "RUNREQUEST";
    parent.gReqCode = parent.gAction;
    parent.gReqType = "APP";
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + responseStr, "RADClientHandler");
    return response;

}

function launchPopup(tbl, fld, cell, ev) {
    var reqOrRes = fld.split(".")[1];
    poptextvalue = "";

    if (parent.gAction != "RCDEFAULT") {
        var rowIndex = getRowIndex(event);
        var fldval = document.getElementsByName(fld)[rowIndex - 1].value;

        if (fldval == "") {

            var l_reqCode = "";
            if (reqOrRes == 'REQUEST') {
                l_reqCode = "REQ";
            }
            else if (reqOrRes == 'RESPONSE') {
                l_reqCode = "RES";

            }

            parent.gAction = "QUERYXML";
            parent.gReqType = "GEN";
            parent.gReqCode = parent.gAction;
            var radReqDOM = parent.buildRADXml();
            var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
            var queryXml = radReqDOM.createElement("QUERYXML");
            bodyNode.appendChild(queryXml);
            bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML");
            queryXml = radReqDOM.createElement("REQ_OR_RES");
            bodyNode.appendChild(queryXml);
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML/REQ_OR_RES"), l_reqCode);
            bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML");
            queryXml = radReqDOM.createElement("EXEC_REF_NO");
            bodyNode.appendChild(queryXml);
            var execRefNo = document.getElementsByName("TCTB_TC_EXEC_MASTER.EXEC_REF_NO")[rowIndex - 1].value;
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/QUERYXML/EXEC_REF_NO"), execRefNo);
            var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");

            document.getElementsByName(fld)[rowIndex - 1].value = response;
            poptextvalue = document.getElementsByName(fld)[rowIndex - 1].value;
        }
        else 
            poptextvalue = fldval;
    }
    loadSubScreenDIV("ChildWin", "RadshowXml.jsp?Title=" + reqOrRes);
}

function fnRCdefault() {
    if (parent.gAction == "NEW") {
        parent.gReqType = "FID";
        parent.gAction = "RCDEFAULT";
        parent.gReqCode = parent.gAction;
        createAdmnDom();
        setNodeText(selectSingleNode(parent.gAdmnDom, "//TCTB_RC_EXEC_MASTER/RC_CODE"), document.getElementById("TCTB_RC_EXEC_MASTER.RC_CODE").value);
        var radReqDOM = parent.buildRADXml();
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
        var msgStatus = getNodeText(selectSingleNode(response, "//RAD_RES_ENV/RAD_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            parent.alertMsg(getNodeText(response.getElementsByTagName("ERROR")[0]), "E");
            return;
        }
        else {
            fnshowResponse(response);
        }
    }
}

function fnshowResponse(response) {

    var dbDom;
    var tagArr = new Array();
    var valArr = new Array();
    var body = selectSingleNode(response, "//RAD_BODY");
    var fld = selectSingleNode(body, "//FLD");
    var recnode = selectNodes(body, "//REC");
    var nodeName = recnode[0].getAttribute("TYPE");
    var rel = selectNodes(fld, "//FN[@TYPE='" + nodeName + "']")[0].getAttribute("RELATION_TYPE");
    if (rel == '1') {
        rel = 'SINGLE';
    }
    if (rel == 'N') {
        rel = 'MULTIPLE';
    }
    var str = "<" + nodeName + " ID='1' TYPE= '" + rel + "'/>";
    newl = loadXMLDoc(str);
    fldTags = getNodeText(selectNodes(fld, "//FN[@TYPE='" + nodeName + "']")[0]);
    fvs = getNodeText(selectSingleNode(recnode[0], "FV"));
    tagArr = fldTags.split("~");
    valArr = fvs.split("~");
    for (var p = 0;p < tagArr.length;p++) {
        newTag = newl.createElement(tagArr[p]);

        /* --  Code added to avoid NULL getting displayed on the screen --*/
        if (valArr[p] == null || valArr[p] == "null")
            setNodeText(newTag, "");
        else 
            setNodeText(newTag, valArr[p]);

        selectSingleNode(newl, nodeName).appendChild(newTag);
    }
    dbDom = loadXMLDoc(getXMLString(newl));
    var recnod = selectNodes(recnode[0], "REC");
    head = selectNodes(dbDom, "//" + nodeName)[0];
    var dom1 = fnCreateDOM(recnod, head, dbDom, fld);
    parent.gAdmnDom = dom1;
    showData(dom1.childNodes[0]);
}

function getFieldData(currObject) {
    var fieldValue = "";
    var tagName = currObject.tagName;
    switch (tagName.toUpperCase()) {
        case 'INPUT': {
            var type = currObject.getAttribute("type");
            switch (type.toUpperCase()) {
                case 'TEXT': {
                    fieldValue = currObject.value;
                    break;
                }
                case 'HIDDEN': {
                    fieldValue = currObject.value;
                    break;
                }
                case 'CHECKBOX': {
                    if (currObject.checked) {
                        fieldValue = "Y";
                    }
                    else {
                        fieldValue = "N";
                    }
                    break;
                }
                case 'PASSWORD': {
                    fieldValue = currObject.value;
                    break;
                }
            }

            break;
        }
        case 'SELECT': {
            fieldValue = currObject.value;
            break;
        }
        case 'TEXTAREA': {
            fieldValue = currObject.value;
            break;
        }
    }
    return fieldValue;
}

function loadRADXMLFiles() {
    var radFlLst = fnReadMode("", document.getElementsByName("TCTM_BLOCK_DETAILS.RAD_UPLOAD")[0].value, document.getElementsByName("TCTM_BLOCK_DETAILS.RAD_UPLOAD")[0]);
    radxmlFiles = radFlLst;
}

var gFlag = 0;

function showHideLOVs(status, action) {
    if (parent.gwinFuncId == 'RDDUSRDF' || parent.gwinFuncId == 'RDDENVDF' || parent.gwinFuncId == 'RDDRELDF' || parent.gwinFuncId == 'TCDMASTR' || parent.gwinFuncId == 'TCDXLUPD' || parent.gwinFuncId == 'TCDRNREQ' || parent.gwinFuncId == 'TCDRCEXC' || parent.gwinFuncId == 'TCDCRREQ' || parent.gwinFuncId == 'TCDRCRPT' || parent.gwinFuncId == 'TCDXLBUP' || parent.gwinFuncId == 'TCDTCRPT' || parent.gwinFuncId == 'TCDRCMST' || parent.gwinFuncId == 'RDDNFTRG') {
        var inlineButtonArray = document.getElementsByTagName("button");
        var myIndex;

        if (action == "ENTER_QUERY") {
            showHideLOVs("hide", "DUMMY");

            for (myIndex = 0;myIndex < inlineButtonArray.length;myIndex++) {
                if (inlineButtonArray[myIndex].title.search("List Of") !=  - 1) {
                    inlineButtonArray[myIndex].style.visibility = "visible";
                    if (inlineButtonArray[myIndex].disabled == true) {
                        inlineButtonArray[myIndex].disabled = false;
                    }
                    break;
                }
            }
        }
        else if (action == "UNLOCK" || action == "NEW") {
            showHideLOVs("show", "DUMMY");

            for (myIndex = 0;myIndex < inlineButtonArray.length;myIndex++) {
                if (inlineButtonArray[myIndex].title.search("List Of") !=  - 1) {
                    inlineButtonArray[myIndex].style.visibility = "visible";
                    if (action == "UNLOCK")
                        document.getElementById(gPkField).disabled = true;
                }
            }
        }
        else {
            for (myIndex = 0;myIndex < inlineButtonArray.length;myIndex++) {
                if (inlineButtonArray[myIndex].title.search("List Of") !=  - 1) {
                    if (status == "show")
                        inlineButtonArray[myIndex].style.visibility = "visible";
                    else if (status == "hide")
                        inlineButtonArray[myIndex].style.visibility = "hidden";
                }
            }
        }
    }

}

function alertMsg(message, type) {
    showLogmessage = message;
    if (type == "I")
        var title = "Information";
    else if (type == "E")
        var title = "Error";
    else if (type == "O")
        var title = "Warning";

    errType = type;

    loadSubScrDIV("ChildWin", "RadError.jsp?Title=" + title);
}

function loadSubScrDIV(divId, src) {
    mask();
    src = encodeURI(src);
    var customWin = document.createElement("div");
    customWin.id = divId;
    customWin.style.zIndex = 1;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    var customWinData = '<iframe src="' + src + '" class="frames" title="iFrame" allowtransparency="true" frameborder="0" scrolling="no" id="IFCHILD"></iframe>';
    customWin.innerHTML = customWinData;
    document.getElementById("Div_ChildWin").appendChild(customWin);
    document.getElementById("Div_ChildWin").style.display = "block";
    var winObj = document.getElementById(divId);
    winObj.style.top = 0 + "px";
    winObj.style.left = 10 + "px";
    winObj.style.visibility = "visible";
    winObj.style.display = "block";

}

function fnServicePost(radMsgDOM, serverURL) {

    var l_functionId = loadXMLDoc(radMsgDOM);
    var ubsFunctionId = getNodeText(selectSingleNode(l_functionId, "FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"));
    var ubsAction = getNodeText(selectSingleNode(l_functionId, "FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"));
    var ubsOperation = getNodeText(selectSingleNode(l_functionId, "FCUBS_REQ_ENV/FCUBS_HEADER/OPERATION"));
    if (ubsAction == '' || ubsAction == null) {
        ubsAction = ubsOperation;
    }
    var objHTTP = createHTTPActiveXObject();
    objHTTP.open("POST", parent.g_ubsReqURL + "/HostUploadServlet", false);
    objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    objHTTP.setRequestHeader("USERID", parent.username);
    objHTTP.setRequestHeader("OPERATION", ubsAction);
    objHTTP.setRequestHeader("FUNCTIONID", ubsFunctionId);
    objHTTP.setRequestHeader("X-CSRFTOKEN",parent.CSRFtoken);
    objHTTP.send(radMsgDOM);
    return objHTTP.responseXML;

}

function getSignonSerial(responseXML) {

    var singleSignOn = new Array();
    var singleSignOn1 = new Array();
    var singleSignOnValue;
    //var l_fcubsXML = loadXMLDoc(responseXML);
    var parmList = selectNodes(responseXML, "//ADDL/PARAM");
    for (var i = 0;i < parmList.length;i++) {

        var fieldName = getNodeText(selectSingleNode(parmList[i], "NAME"));
        if (fieldName == 'USER_GLOBALS_Key') {

            var fieldValue = getNodeText(selectSingleNode(parmList[i], "VALUE"));
            singleSignOn = fieldValue.split('~');

        }
        else if (fieldName == 'USER_GLOBALS_Value') {

            var fieldKeyValue = getNodeText(selectSingleNode(parmList[i], "VALUE"));
            singleSignOn1 = fieldKeyValue.split('~');
            break;

        }
    }

    for (var j = 0;j < singleSignOn.length;j++) {

        if (singleSignOn[j] == 'SignonSerial')
            singleSignOnValue = singleSignOn1[j];
    }

    return singleSignOnValue;

}

function buildFCUBSLOGINXml() {
    var ubsXMLDOM = addHeaderNode();
    var ubsnode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV");
    var bodyNode = ubsXMLDOM.createElement("FCUBS_BODY");
    ubsnode.appendChild(bodyNode);
    var fcubsLogin = '<FLD><FN PARENT="" RELATION_TYPE="1">PARAM~USERID~PASSWORD~FUNCTION_ID~APP~PARAM1~PARAM2~PARAM3~</FN></FLD>';
    var fcubsLoginfv = '<REC TYPE = "" RECID = "1"><FV>~PARAMVAL~' + parent.username + '~' + parent.password + '~' + parent.userterminal + '~' + parent.userterminal + '~' + parent.userterminal + '~' + parent.userterminal + '~</FV></REC>';
    var fldNode = loadXMLDoc(fcubsLogin);
    var fvNode = loadXMLDoc(fcubsLoginfv);
    selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_BODY").appendChild(selectSingleNode(fldNode, "//FLD").cloneNode(true));
    selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_BODY").appendChild(selectSingleNode(fvNode, "//REC").cloneNode(true));
    return ubsXMLDOM;
}

function addHeaderNode() {
    var ubsXMLDOM = loadXMLDoc('<FCUBS_REQ_ENV/>');
    var radnode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV");
    var headerNode = ubsXMLDOM.createElement("FCUBS_HEADER");
    radnode.appendChild(headerNode);
    var node = ubsXMLDOM.createElement("SOURCE");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("UBSCOMP");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("MSGID");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("CORRELID");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("USERID");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("BRANCH");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("SERVICE");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("OPERATION");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("SOURCE_OPERATION");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("DESTINATION");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("MULTITRIPID");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("MODULEID");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("FUNCTIONID");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("ACTION");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("MSGSTAT");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("ACTIONONOVD");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("AUTOAUTH");
    headerNode.appendChild(node);
    node = ubsXMLDOM.createElement("ADDL");
    headerNode.appendChild(node);
    setNodeText(selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_HEADER/USERID"), parent.username);
    setNodeText(selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
    setNodeText(selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "LOGIN");

    return ubsXMLDOM;
}

function buildFCUBSSignOffXml() {
    var ubsXMLDOM = addHeaderNode();
    var ubsnode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV");
    var bodyNode = ubsXMLDOM.createElement("FCUBS_BODY");
    ubsnode.appendChild(bodyNode);
    var fcubsLogin = '<FLD><FN PARENT="" RELATION_TYPE="1">PARAM~USERID~PASSWORD~FUNCTION_ID~APP~PARAM1~PARAM2~PARAM3~</FN></FLD>';
    var fcubsLoginfv = '<REC TYPE = "LOGIN"><FV>~PARAMVAL~' + parent.username + '~' + parent.password + '~' + SignonSerialNo + '~' + parent.userterminal + '~~' + parent.userterminal + '~</FV></REC>';
    var fldNode = loadXMLDoc(fcubsLogin);
    var fvNode = loadXMLDoc(fcubsLoginfv);
    selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_BODY").appendChild(selectSingleNode(fldNode, "//FLD").cloneNode(true));
    selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV/FCUBS_BODY").appendChild(selectSingleNode(fvNode, "//REC").cloneNode(true));
    return ubsXMLDOM;
}

function fnServiceLogin(radMsgDOM) {

    var test = buildFCUBSLOGINXml();
    var objHTTP = createHTTPActiveXObject();
    objHTTP.open("POST", parent.g_ubsReqURL + "/HostUploadServlet", false);
    objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    objHTTP.setRequestHeader("USERID", parent.username);
    objHTTP.setRequestHeader("OPERATION", "LOGIN");
    objHTTP.setRequestHeader("FUNCTIONID", "LOGIN");
    objHTTP.setRequestHeader("X-CSRFTOKEN",parent.CSRFtoken);
    objHTTP.send(getXMLString(test));
    var response = objHTTP.responseXML;
    SignonSerialNo = getSignonSerial(response);

}

function fnServiceLoginOut(radMsgDOM) {

    var test = buildFCUBSSignOffXml();
    var objHTTP = createHTTPActiveXObject();
    objHTTP.open("POST", parent.g_ubsReqURL + "/HostUploadServlet", false);
    objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    objHTTP.setRequestHeader("USERID", parent.username);
    objHTTP.setRequestHeader("OPERATION", "SignOff");
    objHTTP.setRequestHeader("FUNCTIONID", "LOGOFF");
    objHTTP.setRequestHeader("X-CSRFTOKEN",parent.CSRFtoken);
    objHTTP.send(getXMLString(test));
    var response = objHTTP.responseXML;
}

function fnExecuteQuery_TCDXLBUP(args) {
    var queryData = "";
    createAdmnDom();
    var pkDbt = gPkField.split(".")[0];
    var pkDbc = gPkField.split(".")[1];
    setNodeText(selectSingleNode(parent.gAdmnDom, "//" + pkDbt + "/" + pkDbc), document.getElementById(gPkField).value);
    setNodeText(selectSingleNode(parent.gAdmnDom, "//" + pkDbt + "/FUNCTION_ID"), document.getElementById('TCTB_TC_BULK_MASTER.FUNCTION_ID').value);
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
    fnshowResponse(response);
    disableForm();
    fnEnableLogButtons('EXQRY');

}

function showExcelBulk() {
    //frames['itcmexcel'].location.href = "about:blank";
    parent.gAction = "FETCH_DATA";
    parent.gReqType = "FID";
    var tcId = document.getElementById('TCTB_TC_BULK_MASTER.FUNCTION_ID').value;
    var queryData = "";
    //updateAdmnDOM('TCTB_TC_BULK_TCS', 'TCTB_TC_BULK_TCS');
    var pkDbt = gPkField.split(".")[0];
    var pkDbc = gPkField.split(".")[1];
    setNodeText(selectSingleNode(parent.gAdmnDom, "//" + pkDbt + "/" + pkDbc), document.getElementById(gPkField).value);
    appendAdmnDOM();
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
    parent.gAction = "EXECUTEQUERY";
    parent.gReqType = "APP";
    parent.gReqCode = "SHOWEXCEL";
    parent.gSubFolder = tcId;
    var radReqDOM = parent.buildRADXml();
    response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(response), "RADClientHandler");

    //frames['itcmexcel'].location.href = location.protocol + "//" + location.host + "/" + location.pathname.split("/")[1] + "/Temp/" + parent.username + "/" + tcId + ".xls";
    window.open("DownLoadFile?USERNAME=" + parent.username+"&X-CSRFTOKEN="+mainWin.CSRFtoken, "", "");
    parent.gReqType = "APP";
    parent.gReqCode = "DELETETEMP";
    parent.gSubFolder = tcId;
    var radReqDOM = parent.buildRADXml();
    response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
}

function fnSave_TCDXLBUP(args) {
    var response = "";
    var fileName = document.getElementById("EXCELFILE").value;
    if (fileName == "") {
        alertMessage('Excel Sheet Not Uploaded', 'E');
        return false;
    }
    parent.gReqType = "FID";
    parent.gReqCode = parent.gAction;
    //appendAdmnDOM();
    parent.gAction = "NEW";
    var radXML = parent.buildRADXml();

    parent.gReqType = "APP";
    parent.gReqCode = "READBULKEXCEL";
    parent.gSubFolder = fileName;
    var radReqDOM = parent.buildRADXml();
    response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(radXML), "RADClientHandler");
    if (getXMLString(response) != "" && getXMLString(response) != undefined) {
        parent.gReqType = "FID";
        parent.gReqCode = parent.gAction;
        response = parent.fnPost(getXMLString(response) + parent.gBodySeparator + "", "RADClientHandler");
        fnReset();
        fnshowResponse(response);
        disableForm();
    }
    else if (response == "null") {
        return true;
    }
    else {
        if (response != "")
            alertMsg(response, "E");
        else 
            alertMsg("Server Processing Failed", "E");
    }
}

function fnTestCaseCount(tc_code) {

    var tc_countQuery = "FETCH@SELECT COUNT(*) AS TC_COUNT FROM   Rdtm_Env_Master Env, Tctb_Tc_Curr_Data Cur WHERE Env.Env_Code = Cur.Env_Code AND Env.Env_Stage = Cur.Env_Stage  AND  Nvl(Env.Allow_Multiple_Execs_Of_Tcs, 'Y') = 'N' AND Cur.Tc_Code = '" + tc_code + "'";
    parent.gReqType = "APP";
    parent.gAction = "EXECUTEQUERY";
    parent.gReqCode = parent.gAction;
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), tc_countQuery);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
    var tempValue = getNodeText(selectSingleNode(response, "//Records")).split(">");
    return tempValue[0];

}

function createRequestIFrame(height, width) {
    var requestIFrame = document.createElement('iframe');
    requestIFrame.setAttribute('id', 'RequestFrame');
    requestIFrame.setAttribute('name', 'RequestFrame');
    requestIFrame.setAttribute('class', 'TextNormal');
    requestIFrame.setAttribute('src', '');
    requestIFrame.setAttribute('title', '');
    requestIFrame.setAttribute('frameBorder', '0');
    requestIFrame.setAttribute('height', height + 'px');
    requestIFrame.setAttribute('width', width + 'px');
    requestIFrame.setAttribute('scrolling', 'no');
    requestIFrame.style.border = '0px none';
    requestIFrame.style.margin = '0px';
    requestIFrame.style.padding = '0px';
    return requestIFrame;
}

function createResponseIFrame() {
    var responseFrameContainer = document.createElement('div');
    responseFrameContainer.setAttribute('id', 'responseContainer');
    var iFrameID = 'ResponseFrame';
    var iFrameBody = '<iframe id=\"' + iFrameID + '\"' + ' name=\"' + iFrameID + '\"' + ' src=\"\" scrolling=\"no\" title="" frameBorder=\"0\" onLoad=\"\" style=\"border:0px none; width:1px; height: 1px;\"><\/iframe>';
    responseFrameContainer.innerHTML = iFrameBody;
    return responseFrameContainer;
}

function fnENVTestConn(connType) {

    var query = "TEST_SUCCESS";
    var multRec="";
    try {

        var tempParent = parent;
        if( !(tempParent && typeof tempParent.buildRADXml  === "function") ) {
            tempParent = parent.parent;
        }
        
        tempParent.gReqType = "APP";
        tempParent.gReqCode = tempParent.gAction;
        var radReqDOM = tempParent.buildRADXml();
        
        var jndiName = document.getElementById("RDTM_ENV_MASTER.JNDI_NAME").value;
        var envCode = document.getElementById("RDTM_ENV_MASTER.ENV_CODE").value;
        
        if (jndiName == "") {
            parent.alertMessage("Enter Jndi name", "I");
            return false;
        }
        
        var param = "";
        if(connType == "JNDI") {
        	param="JNDI#"+jndiName;
        } else {
        	param="ENV#"+envCode;
        }
        
        setNodeText(selectSingleNode(radReqDOM, "//RAD_HEADER/REQ_TYPE"), 'APP');
        setNodeText(selectSingleNode(radReqDOM, "//RAD_HEADER/REQ_CODE"), 'UICONTROLLER');
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/USERSCHEMA"), jndiName);
        
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R022" + parent.gBodySeparator + param, "RADClientHandler");
        multRec = getNodeText(selectSingleNode(response, "//RESULT"));
    }
    catch (e) {
    	multRec = "<RESULT>Error occurred while connecting to schema. Environment details seem to be incorrect.</RESULT>"
    }
	
    if (multRec=="TEST_SUCCESS") {
        alertMessage("User Schema Connecting", "I");
        return true;
    } else {
        alertMessage(multRec, "E");
        return false;
    }
}

function fnSumreset(tab) {
    deleteAll(tab);
}

function timeDifference(laterdate, earlierdate) {

    var difference = laterdate.getTime() - earlierdate.getTime();

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60

    var secondsDifference = Math.floor(difference / 1000);

    return hoursDifference + ':' + minutesDifference + ':' + secondsDifference + ':(hh:mm:ss)';

}


function fnDbPasswordEncrypt() {
	var PSWRD=document.getElementById("RDTM_ENV_MASTER.DB_PASSWORD").value;
    var fileData = ""; 
    try {
        var objHTTP = createHTTPActiveXObject();
        objHTTP.open("POST", "ReadServlet", false);
        objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
        objHTTP.setRequestHeader("PSWRD", PSWRD);
        objHTTP.setRequestHeader("ACTION", 'ENCRYPTPWD');
        objHTTP.setRequestHeader("X-CSRFTOKEN",parent.CSRFtoken);        
        objHTTP.send();
        fileData = objHTTP.responseText;
    }
    catch (e) {
        fileData = null;
    }
    document.getElementById("RDTM_ENV_MASTER.DB_PASSWORD").value=fileData;
    return fileData;

}
function fnPasswordValidate(r){
if(r.value.length>13 || r.value.length<6 ) { 
	r.value="";  
    alertMsg("Minimum 6 and Maximum 14 Characters are required for Password", "E"); 
    return;
}
}