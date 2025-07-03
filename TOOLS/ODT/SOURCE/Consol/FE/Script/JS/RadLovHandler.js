/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadLovHandler.js
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

var LOV_MODULE_GROUP_ID = new lov("LOV_MODULE_GROUP_ID","MODULE_GROUP_ID","ORACLE");
var LOV_ENTITY_ID = new lov("LOV_ENTITY_ID","COMMON_ENTITY~MODULE_ID","ORACLE");
var LOV_ANNOTATION = new lov("LOV_ANNOTATION", "xsd_node_key~comment_id", "ORACLE");
var LOV_COMMENT_FLD = new lov("LOV_COMMENT_FLD","COMMENT_ID~COMMENT_TEXT","ORACLE");
var LOV_SRV_FUNCTION_ID = new lov("LOV_SRV_FUNCTION_ID","FUNCTION_ID~MODULE","ORACLE");
var LOV_PF_COLUMN = new lov("LOV_PF_COLUMN", "ORACLE");
var LOV_MODULE = new lov("LOV_MODULE", "MODULE_ID~MODULE_DESC", "ORACLE");
var LOV_MODULE_TRAX = new lov("LOV_MODULE_TRAX", "MODULE_ID~MODULE_DESC", "TRAX");
var LOV_XSD_NAME = new lov("LOV_XSD_NAME", "XSD_NAME", "TRAX");
var LOV_LABEL_CODE = new lov("LOV_LABEL_CODE", "LABEL_CODE~LABEL_DESCRIPTION", "ORACLE");
var LOV_BLKLABEL_CODE = new lov("LOV_BLKLABEL_CODE", "LABEL_CODE~LABEL_DESCRIPTION", "ORACLE");
var LOV_GLOBAL_LOV = new lov("LOV_GLOBAL_LOV", "LOV_ID", "GLOBAL_LOV_NAME", "ORACLE");
var LOV_SERVICE_NAME = new lov("LOV_SERVICE_NAME", "SERVICE_NAME~SERVICE_DESC", "ORACLE");
var LOV_SERVICE_NAME1 = new lov("LOV_SERVICE_NAME1", "SERVICE_NAME", "ORACLE");
var LOV_OPERATION_CODE = new lov("LOV_OPERATION_CODE", "OPERATION_CODE", "ORACLE");
var LOV_OPER_CODE = new lov("LOV_OPER_CODE", "OPERATION_CODE", "ORACLE");
var LOV_WSERVICE_NAME = new lov("LOV_WSERVICE_NAME", "SERVICE_NAME~SERVICE_DESCRIPTION", "RAD");
var LOV_OPERATION_NAME = new lov("LOV_OPERATION_NAME", "OPERATION_NAME~OPERATION_DESCRIPTION", "TRAX");
var LOV_LANG_CODE = new lov("LOV_LANG_CODE", "LANG_CODE~LANG_DESC", "RAD");
var LOV_LANG = new lov("LOV_LANG", "LANG_CODE~LANG_NAME", "ORACLE");
var LOV_REL_CODE = new lov("LOV_REL_CODE", "RELEASE_CODE", "RAD");
var LOV_XREL_CODE = new lov("LOV_XREL_CODE", "RELEASE_NAME~STRONGLY_TYPED", "RAD");
var LOV_ENV_CODE = new lov("LOV_ENV_CODE", "ENV_CODE", "RAD");
var LOV_SENV_CODE = new lov("LOV_SENV_CODE", "ENV_CODE", "RAD");
var LOV_DATASRC = new lov("LOV_DATASRC", "OBJECT_NAME", "ORACLE");
var LOV_PFDATASRC = new lov("LOV_PFDATASRC", "TABLE_NAME", "ORACLE");
var LOV_SETENV_RELCODE = new lov("LOV_SETENV_RELCODE", "RELEASE_CODE~RELEASE_TYPE", "RAD");
var LOV_USER_ID = new lov("LOV_USER_ID", "USER_ID", "RAD");
var LOV_SETENV_ENVCODE = new lov("LOV_SETENV_ENVCODE", "ENV_CODE", "RAD");
var LOV_USER_TABLES = new lov("LOV_USER_TABLES", "TABLE_NAME", "ORACLE");
var LOV_TRIGGER_CODE = new lov("LOV_TRIGGER_CODE", "TRIGGER_CODE", "ORACLE");
var LOV_TABLE_FIELDS = new lov("LOV_TABLE_FIELDS", "COLUMN_NAME~DATA_TYPE~DATA_LENGTH", "ORACLE");
var LOV_MASK_ID = new lov("LOV_MASK_ID", "MASK_ID~DESCRIPTION", "ORACLE");
var LOV_FUNCTION_ID_S = new lov("LOV_FUNCTION_ID_S", "FUNCTION_IDD", "RAD");
var LOV_FUNCTION_ID = new lov("LOV_FUNCTION_ID", "FUNCTION_ID~MODULE", "ORACLE");
var LOV_TC_CODE = new lov("LOV_TC_CODE", "TC_CODE~TC_DESC", "RAD");
var LOV_TC_CODE_R = new lov("LOV_TC_CODE_R", "TC_CODE", "RAD");
var LOV_TC_CD = new lov("LOV_TC_CD", "TC_CODE", "RAD");
var LOV_RC_CODE = new lov("LOV_RC_CODE", "RC_CODE~RC_DESC", "RAD");
var LOV_RC_CODE_R = new lov("LOV_RC_CODE_R", "RC_CODE", "RAD");
var LOV_ACTION_CODE = new lov("LOV_ACTION_CODE", "ACTION_NAME", "ORACLE");
var LOV_TRIGGER_CODE = new lov("LOV_TRIGGER_CODE", "TRIGGER_CODE", "ORACLE");


function lov(lovid, reductionFlds, radorUser) {
    this.lov_queryid = lovid;
    this.reduction_criteria = reductionFlds.toUpperCase();
    this.radorUser = radorUser;
    this.show_lov = disp_lov;

}

function disp_lov(returnflds, frm, bindVars, title, columnHeaders, rednFldLabels, e) {
    var event = window.event || e;
    //Determine if the LOV is part of Single Entry block or Multiple Entry
    var recNum = 0;
    var inputBoxName = "";
    var elementsLength = "";
    var eventobject = event.srcElement || event.target;
    if (eventobject.previousSibling == null) {
        elementsLength = 1;
        recNum = eventobject.parentElement.parentNode.parentElement.rowIndex;
    }
    else {
        inputBoxName = eventobject.previousSibling.name;
        elementsLength = document.getElementsByName(inputBoxName).length;
    }
    if (elementsLength == 1 && recNum == 0) {
        // There is only one element on the screen.
        recNum = 0;
    }
    else if (recNum == 0) {
        tmpElem = eventobject;
        while (tmpElem.tagName != "TR") {
            if (tmpElem.parentNode != null) {
                tmpElem = tmpElem.parentNode;
            }
            else {
                break;
            }
        }
        recNum = tmpElem.rowIndex;
    }
    strReduc = this.reduction_criteria;
    numReduc = strReduc.split("~").length;
    if (recNum == undefined)
        recNum = 0;
    var bindVars_val = "";
    var bindv = bindVars.split("~");
    for (var b = 0;b < bindv.length;b++) {
        if (bindv[b] != "" && recNum == 0)
            bindVars_val += document.getElementById(bindv[b]).value + "~";
        else if (bindv[b] != "")
            try {
                bindVars_val += document.getElementsByName(bindv[b])[recNum - 1].value + "~";
            }
            catch (e) {
                bindVars_val += document.getElementById(bindv[b]).value + "~";
            }
    }
    try {
        if (document.getElementById('FUNCTION_TYPE').value == "S" && returnflds == "LABEL_CODE~FLD_ANNOTATION~XSD_TAG~") {
            returnflds = "LABEL_CODE~FLD_ANNOTATION~";
            //this.lov_queryid = "SELECT Label_Code, Label_Description FROM Cstb_Labels WHERE  Language_Code = 'ENG'";
            this.lov_queryid="LOV_LABEL_CODE"
        }
    }
    catch (e) {
    }
    var lov_Params = "";
    lov_Params = "title=" + title;
    lov_Params += "&Bindvars=" + bindVars_val;
    lov_Params += "&rednFldLabels=" + rednFldLabels;
    lov_Params += "&lov_queryid=" + this.lov_queryid;
    lov_Params += "&reduction_criteria=" + strReduc;
    lov_Params += "&ret_flds=" + returnflds;
    lov_Params += "&column_headings=" + columnHeaders;
    lov_Params += "&radorUser=" + this.radorUser;
    lov_Params += "&recNum=" + recNum;
    lov_Params += "&numReduc=" + numReduc;

    try {
        loadSubScreenDIV("ChildWin", "RadLov.jsp?" + lov_Params);
    }
    catch (e) {
        //parent.loadSubScreenDIV("ChildWin", "RadLov.jsp?"+lov_Params);
    }
}