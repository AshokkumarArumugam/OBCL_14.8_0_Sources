/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadLoadandGen.js
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
var deplyFls = "";
var parentPath = "";
var lblFile = "";
var ua = navigator.userAgent.toLowerCase();
var functionid = "";

function Masterxml() {
    if (document.getElementsByName("PARENT_XML")[0]) {
        var load_path = document.getElementsByName("PARENT_XML")[0].value;
        var MasterDOM = "";
        var xml2 = loadMstxmldata;
        if (!xml2) {
            return false;
        }
        if (xml2.indexOf("RAD_KERNEL") !=  - 1) {
            MasterDOM = loadXMLDoc(xml2);
        }
        else {
            alertMessage("Parent Xml not Valid...", "E");
            return false;
        }
        funcid = document.getElementsByName('FUNCTION_ID')[0].value;
        func_type = document.getElementsByName('FUNCTION_TYPE')[0].value;
        action = document.getElementsByName('ACTION')[0].value;
        if (parent.relType == "KERNEL" && document.getElementsByName('FUNCTION_TYPE')[0].value == "C") {
            if (selectNodes(MasterDOM, "//RAD_CLUSTER").length != 0) {
                if (selectNodes(MasterDOM, "//RAD_CLUSTER")[0].childNodes.length == 0) {
                    selectNodes(MasterDOM, "//RAD_FUNCTIONS")[0].removeChild(selectNodes(MasterDOM, "//RAD_CLUSTER")[0]);
                }
            }
        }
        if (func_type == "S") {
        	if (getNodeText(selectSingleNode(MasterDOM,"//RAD_KERNEL/RAD_FUNC_PREFERENCES/ELCM_FUNCTION")) == "Y"){
        		alertMessage("'Java Functions' RADs cannot have a SCREEN CHILD...", "E");
        		return false;
        	}
            if (selectNodes(MasterDOM, "//RAD_CHILD").length != 0) {
                newl = MasterDOM.createElement("RAD_CHILD_" + parent.relType);
                head = selectNodes(MasterDOM, "//RAD_FUNCTIONS/RAD_KERNEL")[0];
                head.parentNode.appendChild(newl);
                var len1 = selectNodes(MasterDOM, "//RAD_CHILD")[0].childNodes.length;
                var nodes = selectNodes(MasterDOM, "//RAD_CHILD")[0].childNodes;
                for (var i = 0;i < len1;i++) {
                    selectSingleNode(MasterDOM, "//RAD_CHILD_" + parent.relType).appendChild(fnImportNode(MasterDOM, getCloneDocElement(nodes[i])));
                }
            }
            var bskNodes = selectNodes(MasterDOM, "//RAD_CHILD//*");
            for (var j = 0;j < bskNodes.length;j++) {
                bskNodes[j].parentNode.removeChild(bskNodes[j]);
            }
            if (selectNodes(MasterDOM, "//RAD_CHILD")[0])
                selectNodes(MasterDOM, "//RAD_FUNCTIONS")[0].removeChild(selectNodes(MasterDOM, "//RAD_CHILD")[0]);
        }
        document.getElementsByName("PARENT_FUNC_ID")[0].value = getNodeText(selectSingleNode(MasterDOM, "//RAD_FUNCTIONS/FUNCTION_ID"));
        document.getElementsByName("FUNCTION_CATEGORY")[0].value = getNodeText(selectSingleNode(MasterDOM, "//RAD_FUNCTIONS/FUNCTION_CATEGORY"));
        dom = fnPrepareConsolDOM(MasterDOM, funcid, func_type, action);
        createTree();
        if (selectSingleNode(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/MODULE_ID"))
            document.getElementsByName("PARENT_MODULE_ID")[0].value = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/MODULE_ID"));
        if (func_type == "S") {
            fnAllowUIChangeOnly();
        }
        else if (parent.chngUIFlg == "Y") {
            fnAllowUIChangeOnly_ScrnCstm();
        }
    }
}

function Loadradxml() {
	var xml2 = loadxmldata;
	if (!xml2) {
		return false;
	}
	if (xml2.indexOf("RAD_FUNCTIONS") == -1) {
		alertMessage("Load Valid RAD xml File", "E");
		reloadForm();
		return false;
	}
	if (xml2.indexOf("RAD_KERNEL") == -1) {
		var get_confirm = alertMessage("Non-Ext RAD xml Cannot Be Loaded  ", "O");
		reloadForm();
		return false;
	}
	if (xml2.indexOf("RAD_NOTIFICATIONS") != -1) {
		alertMessage("Notification RAD xml File Cannot Be Loaded", "E");
		reloadForm();
		return false;
	}
	if (xml2.indexOf("RAD_PURGE") != -1) {
		alertMessage("Purge RAD xml File Cannot Be Loaded", "E");
		reloadForm();
		return false;
	}

	NewDOM = loadXMLDoc(xml2);

	var landingPage = selectSingleNode(NewDOM, "//RAD_FUNCTIONS/LANDING_PAGE_COMPONENT");
	if (landingPage && getNodeText(landingPage) == 'Y') {
		var get_confirm = alertMessage("This RADXML seems to be a Customer Landing Page "
				+ "which cannot be loaded in function generation.", "E");
		reloadForm();
		return false;
	}

    if (parent.vwChg == 'Y') {
        var funcId_v = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_ID"));
        var funcTyp_v = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
        var ndeChk = fn_Chekc_RadXml(NewDOM);
        NewDOM = fnPrepareConsolDOM(NewDOM, funcId_v, funcTyp_v, "LOAD");
        var NewDOM1 = NewDOM;
        if (getXMLString(NewDOM)) {
            dom = fnViewChangeskernel(NewDOM);
            createTree();
            dom = NewDOM1;
        }
        loadSubScreenDIV("ChildWin", "RadViewChild.jsp?Title=");
    }
    else {
        if (document.getElementsByName('FILE_SAVE_PATH')) {
            var load_path = document.getElementsByName('FILE_SAVE_PATH')[0].value;

        }
        if (selectNodes(NewDOM, "//RAD_CLUSTER").length != 0) {
            if (selectNodes(NewDOM, "//RAD_CLUSTER")[0].childNodes.length == 0)
                selectNodes(NewDOM, "//RAD_FUNCTIONS")[0].removeChild(selectNodes(NewDOM, "//RAD_CLUSTER")[0]);
        }
        if (selectNodes(NewDOM, "//RAD_CUSTOM").length != 0) {
            if (selectNodes(NewDOM, "//RAD_CUSTOM")[0].childNodes.length == 0)
                selectNodes(NewDOM, "//RAD_FUNCTIONS")[0].removeChild(selectNodes(NewDOM, "//RAD_CUSTOM")[0]);
        }
        if (selectNodes(NewDOM, "//RAD_CUSTOMER").length != 0) {
            if (selectNodes(NewDOM, "//RAD_CUSTOMER")[0].childNodes.length == 0)
                selectNodes(NewDOM, "//RAD_FUNCTIONS")[0].removeChild(selectNodes(NewDOM, "//RAD_CUSTOMER")[0]);
        }
        var rlChk = fn_Chekc_RelType(NewDOM);
        if (rlChk == 1) {
            alertMessage("Function Orginated In Cluster cannot be loaded in Kernel", "I");
            reloadForm();
            return;
        }
        else if (rlChk == 2) {
            alertMessage("Function Orginated In Custom cannot be loaded in Kernel or Cluster", "I");
            reloadForm();
            return;
        }
        var ndeRes = fnvalRel_Raddnode(NewDOM);
        if (ndeRes == false) {
            return false;
        }
        try {
            document.getElementsByName('FUNCTION_ID')[0].value = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_ID"));
            document.getElementsByName('FUNCTION_CATEGORY')[0].value = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_CATEGORY"));
            document.getElementsByName('FUNCTION_TYPE')[0].value = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
            document.getElementsByName('PARENT_FUNC_ID')[0].value = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/PARENT_FUNC_ID"));
            if (selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/MODULE_ID") != null) {
                document.getElementsByName('PARENT_MODULE_ID')[0].value = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/MODULE_ID"));
            }

        }
        catch (err) {
            alertMessage("Error : Some Header Tags are Missing In Loaded xml Re-Convert the XML", "E")
            reloadForm();
            return false;
        }

        var ndeChk = fn_Chekc_RadXml(NewDOM);
        if (ndeChk == false)
            return false;
        
        funcId = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_ID"));
        funcTyp = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
        if (funcTyp == "C") {
            if (selectNodes(NewDOM, "//RAD_CHILD").length != 0) {
                newl = NewDOM.createElement("RAD_CHILD_" + parent.relType);
                head = selectNodes(NewDOM, "//RAD_FUNCTIONS/RAD_KERNEL")[0];
                head.parentNode.appendChild(newl);
                var len1 = selectNodes(NewDOM, "//RAD_CHILD")[0].childNodes.length;
                var nodes = selectNodes(NewDOM, "//RAD_CHILD")[0].childNodes;
                for (var i = 0;i < len1;i++) {
                    selectSingleNode(NewDOM, "//RAD_CHILD_" + parent.relType).appendChild(fnImportNode(NewDOM, getCloneDocElement(nodes[i])));
                }
            }
            var bskNodes = selectNodes(NewDOM, "//RAD_CHILD//*");
            for (var j = 0;j < bskNodes.length;j++) {
                bskNodes[j].parentNode.removeChild(bskNodes[j]);
            }
            if (selectNodes(NewDOM, "//RAD_CHILD")[0])
                selectNodes(NewDOM, "//RAD_FUNCTIONS")[0].removeChild(selectNodes(NewDOM, "//RAD_CHILD")[0]);
        }
        dom = fnPrepareConsolDOM(NewDOM, funcId, funcTyp, "LOAD");
		dom = fnXsdRefresh(dom);
        createTree();
        if (document.getElementsByName("FUNCTION_TYPE")[0].value == "S") {
            fnAllowUIChangeOnly();
        }
        else if (parent.chngUIFlg == "Y") {
            fnAllowUIChangeOnly_ScrnCstm();
        }
    }
    return true;
}

function saveradxml(val, radReqDOM) {
    var ua = navigator.userAgent.toLowerCase();
    var frntndFiles = "";
    var domforsys = "";
	var Elcm_dom="";
    if (document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD") {
        CreateSCR("SCR");
    }
    var func_type = document.getElementsByName('FUNCTION_TYPE')[0].value;
    var oprtn = document.getElementsByName("OPERATION")[0].value;
    var rest = FnFstMltRecValidation();
    functionid = document.getElementsByName("FUNCTION_ID")[0].value;
    if (rest != "") {
        alertMessage("For " + rest + "  only one MULTIPLE ViewType Filedset Allowed  ", "E");
        return false;
    }
    logMsg = "";
    errType = "";
    errLogMsg = "";
    amterrLogMsg = "";//amount field validations
    if (document.getElementsByName("FUNCTION_ID")[0].value == "") {
        alertMessage("Function Id Cannot Be Null", "E");
        return false;
    }
    if (func_type == "C" || func_type == "S") {
        if (document.getElementsByName("PARENT_FUNC_ID")[0].value == "") {
            alertMessage("Parent Function Id Cannot Be Null", "E");
            return false;
        }
    }
    var act = document.getElementsByName("ACTION")[0].value;
    if ((ua.indexOf("safari") !=  - 1) || (ua.indexOf("chrome") !=  - 1) || (ua.indexOf("opera") !=  - 1)) {
        g_Save_Dir = "";
        parentPath = "";
    }
    else {
        if (parent.g_Wrk_Dir == "CURRENT_DIRECTORY") {
            if (act == "NEW") {
                if (func_type == "P") {
                    g_Save_Dir = document.getElementsByName("FILE_SAVE_PATH")[0].value;
                }
                else {
                    g_Save_Dir = document.getElementsByName("FILE_SAVE_PATH")[0].value;
                    g_Save_Dir = g_Save_Dir.substring(0, (g_Save_Dir.lastIndexOf("\\") + 1))
                }
            }
            else {
                g_Save_Dir = document.getElementsByName("FILE_SAVE_PATH")[0].value;
                g_Save_Dir = g_Save_Dir.substring(0, (g_Save_Dir.lastIndexOf("\\") + 1))
            }
        }
        else {
            g_Save_Dir = parent.g_Wrk_Dir;
        }
    }
    fileSavePath = g_Save_Dir;
    var len = fileSavePath.length;
    var last_char = fileSavePath.charAt(len - 1);
    if (last_char != "\\") {
        fileSavePath = fileSavePath + "\\";
    }
    if (fileSavePath.indexOf("\\RADXML\\") !=  - 1) {
        var radPath = fileSavePath;
        parentPath = fileSavePath.substring(0, fileSavePath.indexOf("\\RADXML\\") + 1);
    }
    else {
        var radPath = fileSavePath + "RADXML\\";
        parentPath = fileSavePath;
    }
    if (selectSingleNode(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY")) {
        var summNode = selectSingleNode(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
        if (getNodeText(selectSingleNode(summNode, "RSLT_DATASRC")) == "") {
            var delNode = selectSingleNode(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
            delNode.parentNode.removeChild(delNode);
        }
        else {
            //summary ordering
            fnShowSummaryOrders();
        }
    }
    if (func_type == "S") {
        if (getNodeText(selectSingleNode(selectNodes(consoldom, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/MENU_DETAILS"))[0], ("FUNCTION_ID"))) != functionid)
            fnAddScrChldMnDtls();
    }
    setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/ACTION")), act);
    fnSetCheckBoxOnSave(dom);
    fnCollectGlobalLov(dom);
    fnCollectCallfrmData(dom);
    if (func_type == "C") {
        if (act == "NEW" || act == "LOAD") {
            setChildFlg();
        }
    }
    if (func_type == "P") {
        appendMainData();
    }
    else if (func_type == "C" || func_type == "S") {
        appendChildData();
    }
    dom = setTempHeaderNodes(dom);
    domforsys = getCloneDocElement(dom);
    domforsys = loadXMLDoc(getXMLString(domforsys).toString());
    var resDtScr = fn_basic_valids(domforsys);
    if (resDtScr != "1" && val != "0") {
        writeLog(resDtScr, "E");
        return resDtScr;
    }
    dom = FnPopulate_Order(dom);// populate Orders.
    dom = RetroChangesToRespectiveRelease(dom);
    
    var lang = parent.lang;
    frntndFiles += parent.gBodySeparator + ("RADXML\\" + functionid + "_RAD.xml--") + getXMLString(dom);
    schName = parent.jndiName;
	Elcm_dom = dom;
    if (val == "0") {
        parent.gReqType = "SAVEXML";
        parent.gReqCode = "SAVE";
        parent.gClnUsrDir = "YES";
        parent.gIsSummary = 0;
        parent.gAction = "";
        gReleaseCode = parent.relCode;
        parent.gSubFolder = "";
        var radReqDOM = parent.buildRADXml();
        var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
        var gennode = radReqDOM.createElement("GENERATE");
        bodyNode.appendChild(gennode);
        var node = radReqDOM.createElement("RAD_XML");
        gennode.appendChild(node);
        setNodeText(selectSingleNode(radReqDOM, "//GENERATE/RAD_XML"), 'Y');
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + getXMLString(dom) + frntndFiles, "RADClientHandler");
        response = frntndFiles + "--##FILE##--" + response;
        var wres = fnwritedata(response, parent.saveformat);
        if (wres == true) {
            alertMessage("File Saved", "I");
            debug('Succesfully saved File');
            dom = domforsys;
            return true;
        }
        else {
            alertMessage("Failed", "E");
            debug('Failed to save File');
            dom = domforsys;
            return false;
        }

    }
    else {
        jsFils.length = 0;
        xmlFils.length = 0;
        spFils = "";
        sqFils = "";
        inFils.length = 0;
        jsrFils.length = 0;
        xmlrFils.length = 0;
        sprFils = "";
        sqrFils = "";
        incrFils.length = 0;
        radxmlFils.length = 0;
        jsflCntnts.length = 0;
        uixmlCntnts.length = 0;
        spcflsCntnts.length = 0;
        sqlflsCntnts.length = 0;
        incCntnts.length = 0;
        radxmlCntnts.length = 0;
        var mainArray = new Array();
        if (resDtScr == "1") {
            amountValFlag = false;//amount field validation shihab 
            /*
            if (getNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + oprtn + "/SYS_JS")) == "Y") {
                jsPath = parentPath + "JS\\";
                frntndFiles += parent.gBodySeparator;
                frntndFiles += saveScripts(jsPath, getXMLString(domforsys), 'N');
            }
            if (getNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + oprtn + "/UIXML")) == "Y") {
                uixml = transformDOMtoUIxml(domforsys);
                if (uixml) {
                    uixmlPath = parentPath + "UIXML\\";
                    var xmlDt = parent.gBodySeparator + "UIXML\\" + lang + "\\" + functionid + ".xml--";
                    xmlDt += fnSaveEngXml(uixmlPath, uixml, false, functionid, lang, schName);
                    frntndFiles += xmlDt;
                }

            }
            */
            if (getNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + oprtn + "/SCREEN_HTMLS")) == "Y") {
                htmlPath = parentPath + "HTML\\";
                frntndFiles += parent.gBodySeparator;
                frntndFiles += fnGenerareHtml(domforsys, htmlPath, "NEW", "");
            }

            var lblsNodes = fnGetLableXml(domforsys, functionid, radReqDOM);
            lblFile = parent.gBodySeparator + "LBLXML\\RAD_" + functionid + "_LBL.xml--";
            lblFile += getXMLString(lblsNodes);
            frntndFiles += lblFile;
            var x = selectNodes(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/" + document.getElementsByName("OPERATION")[0].value)[0];
            x.appendChild(fnImportNode(radReqDOM, selectNodes(lblsNodes, "RAD_FID_LABELS")[0]));
            frntndFiles += parent.gBodySeparator + ("\\" + functionid + "_MISSINGLABELS.txt--") + errLogMsg;
            dom = domforsys;
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/OPERATION"), oprtn);
            try {
                parent.g_clearCaseDir = getNodeText(selectSingleNode(dom, "//VCS_FOLDER"));
            }
            catch (e) {
                parent.g_clearCaseDir = "";
            }
            if (parent.chngUIFlg != "Y") {

                //amount field validations start
                if (amterrLogMsg != "") {
                    frntndFiles += parent.gBodySeparator + ("\\" + functionid + "_AmountField_Log.txt--") + amterrLogMsg;

                }
                if (amterrLogMsg != "" && amountValFlag) {
                    frntndFiles = parent.gBodySeparator + ("\\" + functionid + "_AmountField_Log.txt--") + amterrLogMsg;
                    var fileNodes = "RAD_XML~MAIN_SPC~MAIN_SQL~KERNEL_SPC~KERNEL_SQL~CLUSTER_SPC~CLUSTER_SQL~CUSTOM_SPC~CUSTOM_SQL~CUSTOMER_SPC~CUSTOMER_SQL~XSD_FILES~XSD_ANNOTATED~LABEL_XML~UIXML~SYS_JS~EXCEL_TEMPLATE~SCREEN_HTMLS~MENU_DETAILS~LABEL_DETAILS~AMEND_DETAILS~SUMMARY_DETAILS~SCREEN_DETAILS~LOV_DETAILS~BLOCK_PK_COLS~CALL_FORM_DETAILS~BLOCK_DETAILS~DATASCR_DETAILS~FUNCTION_CALL_FORMS~GATEWAY_DETAILS~VARIABLE_MAPPING~NOTIFICATION_DETAILS~FUNCTION_PARAMETERS~NOTIFICATION_TRIGGER~PURGE_DETAILS~UPLOAD_SPC~UPLOAD_SQL~UPLOAD_TRIGGER~UPLOAD_TABLE_DDL~ARCHIVE_TBL_DEF~ELCM_METADATA_CLASS~ELCM_DTO_CLASS~ELCM_ENTITY_CLASS~ELCM_MAIN_CLASS~ELCM_DAO_CLASS~ELCM_ENTITY_ASSEMBLER~CLUSTER_CLASS~CUSTOM_CLASS~XSD_DETAILS";
                    fileNodes = fileNodes.split("~");
                    for (i = 0;i < fileNodes.length;i++) {
                        setNodeText(selectSingleNode(radReqDOM, "//" + oprtn + "//" + fileNodes[i]), 'N');
                    }
                }
                if(document.getElementById("GW_FUNCTION").checked){
                	 var fileNodes = "MAIN_SPC~MAIN_SQL~KERNEL_SPC~KERNEL_SQL~CLUSTER_SPC~CLUSTER_SQL~CUSTOM_SPC~CUSTOM_SQL~CUSTOMER_SPC~CUSTOMER_SQL";
                     fileNodes = fileNodes.split("~");
                     for (i = 0;i < fileNodes.length;i++) {
                         setNodeText(selectSingleNode(radReqDOM, "//" + oprtn + "//" + fileNodes[i]), 'N');
                     }
                }
                //amount field validations end
				if (document.getElementById("ELCM_FUNCTION").checked)  
                  response = CallCodeGenerator(radReqDOM, getXMLString(dom), frntndFiles); 
				else
				  response = CallCodeGenerator(radReqDOM, getXMLString(dom), frntndFiles); 
				
                if (response == false || response == "false") {
                    if (document.getElementById("ELCM_FUNCTION").checked)  
						response = CallCodeGenerator(radReqDOM, getXMLString(dom), frntndFiles); 
					else
                    response = CallCodeGenerator(radReqDOM, getXMLString(dom), frntndFiles);
                    if (response == false || response == "false") {
                        parent.alertMessage("Error in generating packages", "E");
                        return false;
                    }
                }
                if (response != null) {
                    response = frntndFiles + "--##FILE##--" + response;
                    var files = response.split("--##FILE##--");
                    var error = "";
                }
            }
            else if (parent.chngUIFlg == "Y") {
                spc = null;
                sql = null;
                xsd = null;
                script = null;
                parent.gGenPckgs = "NO";
                parent.gClnUsrDir = "YES";
                parent.gReqCode = "ONLYUI";
                var response = CallCodeGenerator(radReqDOM, getXMLString(dom), frntndFiles);
                if (response != null) {
                    response = frntndFiles + "--##FILE##--" + response;
                    var files = response.split("--##FILE##--");
                    var error = "";
                }
            }
            if (parent.gfnPostStatus != 'S') {
                if (error != "") {
                    writeLog(error, 'E');
                    debug('Failed in saving file');
                }
                else {
                    writeLog('Package Generation Failed..', 'E');
                    debug('Package Generation Failed..');
                }
                if (errType == "E") {
                    var res = fnLaunchLog(logMsg, errLogMsg, errType);
                }
            }
            else {
                //amount field validations start
                if (amterrLogMsg != "" && amountValFlag) {
                    response = parent.gBodySeparator + ("\\" + functionid + "_AmountField_Log.txt--") + amterrLogMsg;
                    var files = response.split("--##FILE##--");
                }
                else if (amterrLogMsg != "" && !amountValFlag) {
                    response = parent.gBodySeparator + ("\\" + functionid + "_AmountField_Log.txt--") + amterrLogMsg + response;
                    var files = response.split("--##FILE##--");
                }
                //amount field validations end
                var wres = fnwritedata(response, parent.saveformat);

            }
        }
        else {
            writeLog("Invalid Rad XML:" + functionid + "...Failed Generating Uixml", "E");
            alertMessage("Invalid Rad XML:" + functionid + "...Failed Generating Uixml", "E");
            debug('Invalid Rad XML:' + functionid + '...Failed Generating Uixml');
        }
    }
    return files[files.length - 1];
}

function fnGenerareHtml(xml, destpath, oldNew, subFldrName) {
    var datascr = parent.jndiName;
    var result = "";
    var lang = parent.lang;
    if (lang == "ARB") {
        var lngCss = "ar";
    }
    else if (lang == "FRC") {
        var lngCss = "fr";
    }
    else {
        var lngCss = "en";
    }
    //amount field validatons start
    var tempbulkgenflag = bulkgenflag;
    bulkgenflag = "Y";
    //amount field validatons ends
    var uixml = transformDOMtoUIxml(xml);
    var engxml = fnSaveEngXml('', uixml, "true", functionid, lang, datascr);
    var xslName = "Templates/ExtXSL/ExtDetail.xsl";
    bulkgenflag = tempbulkgenflag;//amount field validatons
    var len = selectNodes(xml, "//RAD_SCREENS");
    for (var i = 0;i < len.length;i++) {
        var scr = getNodeText(selectSingleNode(len[i], "SCREEN_NAME"));
        if (getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/FUNCTION_CATEGORY")) != "DASHBOARD") {
            var xmlDt = "";
            var btntyp = ""
            if (scr != 'SUMMARY') {
                if (oldNew == "NEW") {
                    if (selectSingleNode(loadXMLDoc(engxml), "//FORM/SCREEN[@NAME='" + scr + "']") != null) {
                        btntyp = getNodeText(selectSingleNode(loadXMLDoc(engxml), "//FORM/SCREEN[@NAME='" + scr + "']/EXIT_BTN"));
                        xmlDoc = loadXMLDoc(engxml);
                        var html = ShowPreview(xslName, xmlDoc, scr, btntyp);
                        if (navigator.appName != navAppName()) {
                            html = getXMLString(html);
                        }
                        var tabNodes = selectNodes(xmlDoc, ("//SCREEN[@NAME = '" + scr + "']/HEADER/TAB"));
                        var tabNodes1 = selectNodes(xmlDoc, ("//SCREEN[@NAME = '" + scr + "']/BODY/TAB[@ID != 'All']"));
                        var scrNode = selectSingleNode(xmlDoc, ("//SCREEN[@NAME = '" + scr + "']"));
                        var scrTitle = selectSingleNode(xmlDoc, ("//SCREEN[@NAME = '" + scr + "']")).getAttribute("TITLE");
                        var scrSize = selectSingleNode(xmlDoc, ("//SCREEN[@NAME = '" + scr + "']")).getAttribute("TMP_SCR_TYPE");
                        if (scrTitle == "" || scrTitle == null) {
                            var descwhrCls = " WHERE FUNCTION_ID ='" + functionid + "' AND LANG_CODE='" + lang + "'";
                            var radReqDOM = parent.buildRADXml();
                            var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R021" + parent.gBodySeparator + descwhrCls, "RADClientHandler");
                            scrTitle = response;
                        }
                        if (scrSize == "L" || scrSize == "large") {
                            var resCls = "DIVThreeColLyt";
                            var winType = "bigwin";
                        }
                        else if (scrSize == "M" || scrSize == "medium") {
                            var resCls = "DIVTwoColLyt";
                            var winType = "mediumwin";
                        }
                        else {
                            var resCls = "DIVTwoColLyt";
                            var winType = "mediumwin";
                        }
                        if (tabNodes.length > 1) {
                            for (var tb = 0;tb < tabNodes.length;tb++) {
                                var tabId = tabNodes[tb].getAttribute("ID");
                                xmlDt = parent.gBodySeparator + "HTML\\" + functionid + "__" + scr + "__" + tabId + ".html--";
                                result += xmlDt + generateHTML(html, destpath, scr, tabId, scrTitle, resCls, functionid, winType, lngCss) + parent.gBodySeparator;
                            }
                        }
                        if (tabNodes1.length > 1) {
                            for (var tbl = 0;tbl < tabNodes1.length;tbl++) {
                                var tabId1 = tabNodes1[tbl].getAttribute("ID");
                                xmlDt = parent.gBodySeparator + "HTML\\" + functionid + "__" + scr + "__" + tabId1 + ".html--";
                                result += xmlDt + generateHTML(html, destpath, scr, tabId1, scrTitle, resCls, functionid, winType, lngCss) + parent.gBodySeparator;
                            }
                        }
                        else {
                            xmlDt = parent.gBodySeparator + "HTML\\" + functionid + "__" + scr + ".html--";
                            result += xmlDt + generateHTML(html, destpath, scr, "", scrTitle, resCls, functionid, winType, lngCss) + parent.gBodySeparator;
                        }
                    }
                }
            }
        }
        else {
            if (getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/FUNCTION_CATEGORY")) == "DASHBOARD" && scr != "CVS_MAIN") {
                xslName = "Templates/ExtXSL/ExtDashboardDetail.xsl";
                var html = ShowPreview(xslName, loadXMLDoc(engxml), scr, "");
                if (navigator.appName != navAppName()) {
                    html = getXMLString(html);
                }
                xmlDt = parent.gBodySeparator + "HTML\\" + functionid + "__" + scr + ".html--";
                result += xmlDt + generateDashboardHTML(html, destpath, scr, "", scrTitle, resCls, functionid, winType, lngCss) + parent.gBodySeparator;
            }
        }
    }
    var sumrylen = selectNodes(xml, "//RAD_SUMMARY");
    if (sumrylen.length > 0) {
        func_id = functionid.substr(0, 2) + "S" + functionid.substr(3, functionid.length)
        if (getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/FUNCTION_CATEGORY")) != "DASHBOARD") {
            if (oldNew == "NEW") {
                if (selectSingleNode(loadXMLDoc(engxml), "//FORM/SCREEN[@NAME='" + scr + "']") != null) {
                    btntyp = getNodeText(selectSingleNode(loadXMLDoc(engxml), "//FORM/SCREEN[@NAME='" + scr + "']/EXIT_BTN"));
                    var smryTitle = getNodeText(selectSingleNode(loadXMLDoc(engxml), ("//FORM/SUMMARY/@TITLE")));
                    if (smryTitle == "" || smryTitle == null) {
                        var descwhrCls = " WHERE FUNCTION_ID ='" + func_id + "' AND LANG_CODE='" + lang + "'";
                        var radReqDOM = parent.buildRADXml();
                        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R021" + parent.gBodySeparator + descwhrCls, "RADClientHandler");
                        smryTitle = response;
                    }
                    var html = ShowPreview("Templates/ExtXSL/ExtSummary.xsl", loadXMLDoc(engxml), scr, btntyp);
                    if (navigator.appName != navAppName()) {
                        html = getXMLString(html);
                    }
                    xmlDt = parent.gBodySeparator + "HTML\\" + func_id + "__SUMMARY.html--";
                    result += xmlDt + generateHTMLSmry(html, destpath, scr, "", smryTitle, resCls, functionid, winType, lngCss) + parent.gBodySeparator;
                }
            }
        }
        else {
            var smryTitle = getNodeText(selectSingleNode(loadXMLDoc(engxml), ("//FORM/SUMMARY/@TITLE")));
            if (smryTitle == "" || smryTitle == null) {
                var descwhrCls = " WHERE FUNCTION_ID ='" + func_id + "' AND LANG_CODE='" + lang + "'";
                var radReqDOM = parent.buildRADXml();
                var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R021" + parent.gBodySeparator + descwhrCls, "RADClientHandler");
                smryTitle = response;
            }
            var html = ShowPreview("Templates/ExtXSL/ExtDashboardSummary.xsl", loadXMLDoc(engxml), scr, btntyp);
            if (navigator.appName != navAppName()) {
                html = getXMLString(html);
            }
            xmlDt = parent.gBodySeparator + "HTML\\" + func_id + "__SUMMARY.html--";
            result += xmlDt + generateDashboardHTML(html, destpath, scr, "", smryTitle, resCls, functionid, winType, lngCss) + parent.gBodySeparator;
        }
    }
    if (logMsg != "") {
        if (errType == "E" && errLogMsg != "") {
            var res = (logMsg, errLogMsg, errType);
            if(checkActivex()){ 
                if (!(fnCreateFileFF(destpath, functionid + "_MISSINGLABELS.txt", errLogMsg, false))) {
                    return false;
                }
                errLogMsg = "";
            }
        }
    }
    return result;
}

function ShowPreview(xslName, engxml, screenName, btntyp) {
    var html = "";
    var xmlData = engxml;
    var btn_type = btntyp;
    var tmpXmlDoc = "";
    tmpXmlDoc = xmlData;
    if (xslName == 'Templates/ExtXSL/ExtSummary.xsl') {
        var pos = 'absolute';
        var detailScrNode = selectSingleNode(tmpXmlDoc, "//FORM/SCREEN[@MAIN_WIN='Y']");
        if (detailScrNode) {
            pos = detailScrNode.getAttribute("POSITION");
        }
        else {
            if (selectSingleNode(tmpXmlDoc, "//FORM/SUMMARY").getAttribute("POSITION"))
                pos = selectSingleNode(tmpXmlDoc, "//FORM/SUMMARY").getAttribute("POSITION");
        }
        if (pos == 'template') {
            xslName = 'Templates/ExtXSL/ExtSummary.xsl';
        }
    }
    var xslProc;
    var xslDoc = "";
    var xmlDoc = "";
    xslDoc = loadXSLFile(xslName);
    xmlDoc = xmlData;
    var scrNode = selectSingleNode(xmlDoc, "//SCREEN[@NAME = '" + screenName + "']");
    var dtldQery = "WHERE LANGUAGE_CODE = '" + parent.lang + "' AND  FUNCTION_ID='INFRA' AND(( ITEM_NAME IN ('LBL_ADVANCED','LBL_RESET','LBL_QRY_QUERY','LBL_REFRESH','LBL_RESULT','LBL_MAKERID','LBL_CHECKER_ID','LBL_MAKER_DT_STAMP','LBL_CHECKER_DT_STAMP','LBL_RECORD_STAT','LBL_AUTHORISATION_STATUS','LBL_A','LBL_SUMMARY_U','LBL_UN_AUTH_FLG','LBL_O','LBL_OPEN','LBL_C','LBL_CLOSED','LBL_EXIT','LBL_OK','LBL_CANCEL','LBL_FIELDS','LBL_OPERATOR','LBL_VALUE','LBL_AND','LBL_CLEAR_QUERY','LBL_ORDER_BY','LBL_ASCENDING','LBL_DESCENDING','LBL_ACCEPT','LBL_TO','LBL_OR','LBL_SEARCH','LBL_RECORDS_PER_PAGE','LBL_GOTO_PAGE','LBL_OF','LBL_AUTHORIZED','LBL_INPUT_BY','LBL_AUTH_BY','LBL_DATE_TIME','LBL_MOD_NO','LBL_OPEN','LBL_CONTRACT_STATUS','LBL_PAYMENT_STATUS','LBL_COLLECTION_STATUS','LBL_DEAL_STATUS','LBL_PROCESS_STATUS','LBL_REVERSAL','LBL_REMARKS','LBL_AUDIT','LBL_PRIORITY_AUDIT','LBL_HIGH','LBL_NORMAL','LBL_SHOWERR','LBL_REMARKS','LBL_GETPRIORITY','LBL_SUM_LOCK','LBL_CHECKBOX_YES','LBL_CHECKBOX_NO','LBL_INFRA_MANDATORY','LBL_NOSCRIPT_LABEL','LBL_SUMMARY','LBL_EXPAND_GROUP','LBL_LIST_OF_VALUES','LBL_INFRA_PREVIOUS','LBL_NEXT','LBL_FIRST','LBL_LAST','LBL_ADDROW','LBL_DELETEROW','LBL_SINGLE_REC_VIEW','LBL_LOCK','LBL_COLUMNS','LBL_NARRATIVE','LBL_SELECT_ALL_ROWS','LBL_REJECT','LBL_EXPORT','LBL_SELECT_ROW','LBL_CALENDAR','LBL_DISMISS') ))"
    lblDesc = fnDtldLables(dtldQery);
    var params = new Array();
    params["screen"] = screenName;
    params["imgPath"] = 'Images/ExtFlexblue';
    params["uiXML"] = functionid;
    params["displaySize"] = '800';
    //params["exit"] = 'Exit';
    // params["cancel"] = 'cancel';
    params["thirdChar"] = '';
    params["XslLabels"] = lblDesc;
    params["applicationName"] = 'Flexcube';
    params["functionId"] = functionid;
    params["scrTitle"] = selectSingleNode(xmlDoc, ("//SCREEN[@NAME = '" + screenName + "']")).getAttribute("TITLE");
    params["fetchSize"] = '5';
    html = transform(xmlDoc, xslDoc, params);
    return html;
}

function fnDtldLables(query) {
    var labels = "";
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R015" + parent.gBodySeparator + query, "RADClientHandler");
    var responseXML = response;
    var error = selectSingleNode(responseXML, "/ROOT/ERROR");
    if (error != null) {
        return xmlDoc;
    }
    if (getXMLString(responseXML) != "") {
        if (getNodeText(selectSingleNode(responseXML, "/ROOT")) != "null") {
            var labelCodes = getNodeText(selectSingleNode(responseXML, "/ROOT/LABEL_CODES")).split("~");
            var labelTexts = getNodeText(selectSingleNode(responseXML, "/ROOT/LABEL_TEXTS")).split("~");
        }
    }
    for (var lbc = 0;lbc < labelCodes.length;lbc++) {
        labels += "@@" + labelCodes[lbc] + "~~" + labelTexts[lbc];
    }
    return labels;
}

function fnappendToolbar(func_Id) {
    
	var toolbarHtml = "<div id=\"toolbar\" class=\"DIVnav\" style=\"display:block;\">";
    toolbarHtml += "<ul id=\"navTB\">";
    controlstr = getNodeText(selectSingleNode(xmldoc, "//RAD_FUNC_PREFERENCES/MENU_DETAILS [@ID = '" + func_Id + "']/CONTROL_STRING"));
    var newaction = controlstr.substring(0, 1);
    var queryaction = controlstr.substring(14, 15);
    var queryinfra ="CSTBITEMDESC";    
	//var queryinfra = "FETCH@select item_desc from cstb_item_desc where item_name in ('LBL_ENTR_QUERY','LBL_NEW') AND laNguage_CODE='"+parent.lang+"' AND FUNCTION_ID='INFRA'";
	var WhereString = "where item_name in ('LBL_ENTR_QUERY','LBL_NEW') AND laNguage_CODE='"+parent.lang+"' AND FUNCTION_ID='INFRA'";
	parent.gReqType = "APP";
	var radReqDOMI = parent.buildRADXml();	
	var bodyNode=selectSingleNode(radReqDOMI,"//RAD_REQ_ENV/RAD_HEADER");
	var tempNode=radReqDOMI.createElement("QUERY");
	bodyNode.appendChild(tempNode);
	setNodeText(selectSingleNode(radReqDOMI,"//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"),"UEXECUTEQUERY");
	setNodeText(selectSingleNode(radReqDOMI,"//RAD_REQ_ENV/RAD_HEADER/ACTION"),"EXECUTEQUERY");
	setNodeText(selectSingleNode(radReqDOMI,"//RAD_REQ_ENV/RAD_HEADER/QUERY"),queryinfra);
	setNodeText(selectSingleNode(radReqDOMI, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
	setNodeText(selectSingleNode(radReqDOMI,"//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"),"0");
	
	var response1 = parent.fnPost(getXMLString(radReqDOMI) + parent.gBodySeparator+ "");   
	var multRec = "";
	 try {
		multRec = getNodeText(selectSingleNode(response1, "//Records")).split(">");
	     } 
    catch (e) {
		multRec = response1.substring(9, response1.indexOf("</Records>")).split(">");
	    }	
	
	if (newaction == '1') {
        toolbarHtml += "<li id=\"New\" class=\"BTNIconNew\"><a href=\"#\" class=\"TBitem\">"+multRec[1] +"</a></li>";
    }
    if (queryaction == '1') {
        toolbarHtml += "<li id=\"EnterQuery\" class=\"BTNIconEnterQuery\"><a href=\"#\" class=\"TBitem\">"+multRec[0] +"</a></li>";
    } 
    toolbarHtml += "</ul></div>";
    return toolbarHtml;
}

function generateHTML(html, destpath, screen, tabId, scrTitle, resCls, func_Id, winType, lngCss) {
    var innderHtml = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\">"
    innderHtml += "<html id=idHTML>";
    innderHtml += "<head>";
    innderHtml += "<title>'" + scrTitle + "' </title>";
    innderHtml += "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">";
    innderHtml += " <link type=\"text/css\" href=\"Theme/ExtFlexblue.css\" rel=\"stylesheet\">";
    innderHtml += "<link type=\"text/css\" href=\"Theme/Ext" + lngCss + ".css\" rel=\"stylesheet\">";
    innderHtml += "<link type=\"text/css\" href=\"Theme/ExtBROWSER_IE.css\" rel=\"stylesheet\">	";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/ExtTabContent.js\"></script>";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/RadPreview.js\"></script>";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/RADPreviewHelp.js\"></script>";
    innderHtml += "</head>";
    innderHtml += "<body  onload=\"getFuncid('" + func_Id + "');expandcontent('" + tabId + "')\">";
    innderHtml += "<div class=\"WNDcontainer frames\" id=\"DIVWNDContainer\">";
    innderHtml += "<div class=\"WNDtitlebar\" id=\"WNDtitlebar\" onmousedown=\"startDrag('212566', event)\">";
    innderHtml += "<div class=\"WNDtitle\" id=\"wndtitle\">";
    innderHtml += " <b class=\"BTNicon\"> <span class=\"ICOflexcube\"></span></b>";
    innderHtml += "<h1 class=\"WNDtitletxt\">" + scrTitle + " </h1> </div>";
    innderHtml += "<div class=\"WNDbuttons\"><a class=\"WNDcls\" href=\"javascript;one()\" onblur=\"this.className='WNDcls'\" onmouseover=\"this.className='WNDclsH'\" onfocus=\"this.className='WNDclsH'\" onmouseout=\"this.className='WNDcls'\" title=\"Close\"></a><a class=\"WNDmin\" href=\"#\" onblur=\"this.className='WNDmin'\" onmouseover=\"this.className='WNDminH'\" onfocus=\"this.className='WNDminH'\" onmouseout=\"this.className='WNDmin'\" title=\"Minimize\"></a></div></div>"
    innderHtml += "<DIV class=\"WNDcontent " + winType + "\" id=\"DIVScrContainer\">";
    innderHtml += "<DIV class=\"" + resCls + "\" id=\"ResTree\">";
    if (getNodeText(selectSingleNode(xmldoc, "//RAD_SCREENS[@ID = '" + screen + "']/MAIN_SCREEN")) == 'Y' && getNodeText(selectSingleNode(xmldoc, ("//RAD_FUNCTIONS/FUNCTION_ID"))).substring(2, 3) != 'C' && getNodeText(selectSingleNode(xmldoc, ("//RAD_FUNCTIONS/FUNCTION_ID"))).substring(2, 3) != 'R' && getNodeText(selectSingleNode(xmldoc, "//RAD_FUNCTIONS/FUNCTION_CATEGORY")) != 'DASHBOARD') {
        innderHtml += fnappendToolbar(func_Id);
    }
    innderHtml += html;
    innderHtml += "</div>";
    innderHtml += "</div>";
    innderHtml += "<INPUT aria-required=\"false\" type=\"hidden\" ID=\"Op\" Name=\"Op\" value=\"\">";
    innderHtml += "<INPUT aria-required=\"false\" type=\"hidden\" ID=\"Authorisation\" value=\"N\">";
    innderHtml += "</body>";
    innderHtml += "</html>";
    return innderHtml;
}

function generateHTMLSmry(html, destpath, screen, tabId, scrTitle, resCls, func_Id, winType, lngCss) {
    var innderHtml = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\">"
    innderHtml += "<html id=idHTML>";
    innderHtml += "<head>";
    innderHtml += "<title>'" + funcId + "' Label Descriptions</title>";
    innderHtml += "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">";
    innderHtml += " <link type=\"text/css\" href=\"Theme/ExtFlexblue.css\" rel=\"stylesheet\">";
    innderHtml += "<link type=\"text/css\" href=\"Theme/ODTExten.css\" rel=\"stylesheet\">";
    innderHtml += "<link type=\"text/css\" href=\"Theme/ExtBROWSER_IE.css\" rel=\"stylesheet\">	";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/RadExtTabContent.js\"></script>";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/RadPreview.js\"></script>";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/RadPreviewHelp.js\"></script>";
    innderHtml += "</HEAD>";
    innderHtml += "<body  onload=\"getFuncid('" + func_Id + "');expandcontent('" + tabId + "')\">";
    innderHtml += "<div class=\"WNDcontainer frames\" id=\"DIVWNDContainer\">";
    innderHtml += "<div class=\"WNDtitlebar\">";
    innderHtml += "<div class=\"WNDtitle\" id=\"wndtitle\">";
    innderHtml += "<h1 class=\"WNDtitletxt\">" + scrTitle + " </h1> </div>";
    innderHtml += "<div class=\"WNDbuttons\"><a class=\"WNDcls\" href=\"javascript;one()\" onblur=\"this.className='WNDcls'\" onmouseover=\"this.className='WNDclsH'\" onfocus=\"this.className='WNDclsH'\" onmouseout=\"this.className='WNDcls'\" title=\"Close\"></a><a class=\"WNDmin\" href=\"#\" onblur=\"this.className='WNDmin'\" onmouseover=\"this.className='WNDminH'\" onfocus=\"this.className='WNDminH'\" onmouseout=\"this.className='WNDmin'\" title=\"Minimize\"></a></div></DIV>"
    innderHtml += "<div class=\"WNDcontent mediumwin \"  id=\"DIVScrContainer\">";
    innderHtml += "<div class=\"" + resCls + "\" id=\"ResTree\">";
    innderHtml += html;
    innderHtml += "</div>";
    innderHtml += "</div>";
    innderHtml += "</Form>";
    innderHtml += "<INPUT aria-required=\"false\" TYPE=\"hidden\" ID=\"Op\" Name=\"Op\" VALUE=\"\">";
    innderHtml += "<INPUT aria-required=\"false\" TYPE=\"hidden\" ID=\"Authorisation\" VALUE=\"N\">";
    innderHtml += "</body>";
    innderHtml += "</html>";
    htmlPath = destpath + "HTML\\";
    return innderHtml;
}

function generateDashboardHTML(html, destpath, screen, tabId, scrTitle, resCls, func_Id, winType, lngCss) {
    var innderHtml = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\">"
    innderHtml += "<html id=idHTML>";
    innderHtml += "<head>";
    //innderHtml += "<title>'" + scrTitle + "' </title>";
    innderHtml += "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">";
    innderHtml += " <link type=\"text/css\" href=\"Theme/ExtFlexblue.css\" rel=\"stylesheet\">";
    innderHtml += "<link type=\"text/css\" href=\"Theme/Ext" + lngCss + ".css\" rel=\"stylesheet\">";
    innderHtml += "<link type=\"text/css\" href=\"Theme/ExtBROWSER_IE.css\" rel=\"stylesheet\">	";
    innderHtml += "<link type=\"text/css\" href=\"Theme/dash.css\" rel=\"stylesheet\">	";
    /*innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/ExtTabContent.js\"></script>";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/RadPreview.js\"></script>";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/RADPreviewHelp.js\"></script>"; */
    innderHtml += "</head>";
    innderHtml += "<body>";
    innderHtml += "<fieldset id=\"containerFldset\" class=\"FSTcell\">";
    innderHtml += html;
    innderHtml += "</fieldset>";
    innderHtml += "</body>";
    innderHtml += "</html>";
    return innderHtml;
}