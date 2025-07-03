/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  :RadBulkGenrator.js
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
var Elcm_units = "ELCM_METADATA_CLASS~ELCM_DTO_CLASS~ELCM_ENTITY_CLASS~ELCM_MAIN_CLASS~ELCM_DAO_CLASS~ELCM_ENTITY_ASSEMBLER";
Elcm_units = Elcm_units.split("~");
var ua = navigator.userAgent.toLowerCase();
var releaseType;
var lang_code;
var function_id;
var params = "MAIN_SPC~MAIN_SQL~KERNEL_SPC~KERNEL_SQL~CLUSTER_SPC~CLUSTER_SQL~CUSTOM_SPC~CUSTOM_SQL~CUSTOMER_SPC~CUSTOMER_SQL~XSD_FILES~RAD_XML~LABEL_XML~UIXML~SYS_JS~EXCEL_TEMPLATE~SCREEN_HTMLS~MENU_DETAILS~LABEL_DETAILS~AMEND_DETAILS~SUMMARY_DETAILS~SCREEN_DETAILS~LOV_DETAILS~BLOCK_PK_COLS~CALL_FORM_DETAILS~BLOCK_DETAILS~DATASCR_DETAILS~FUNCTION_CALL_FORMS~GATEWAY_DETAILS~VARIABLE_MAPPING~NOTIFICATION_DETAILS~FUNCTION_PARAMETERS~REPORT_PARAMETERS~NOTIFICATION_TRIGGER~DATA_HTMLS~UPLOAD_SPC~UPLOAD_SQL~UPLOAD_TRIGGER~UPLOAD_TABLE_DDL~ARCHIVE_TBL_DEF~JAVA_CLASSES";
var incFlsList = "MENU_DETAILS~LABEL_DETAILS~AMEND_DETAILS~SUMMARY_DETAILS~SCREEN_DETAILS~LOV_DETAILS~BLOCK_PK_COLS~CALL_FORM_DETAILS~BLOCK_DETAILS~DATASCR_DETAILS~FUNCTION_CALL_FORMS~GATEWAY_DETAILS~VARIABLE_MAPPING~NOTIFICATION_DETAILS~FUNCTION_PARAMETERS~REPORT_PARAMETERS~NOTIFICATION_TRIGGER";
incFlsList = incFlsList.split("~");
var bckndList = "MAIN_SPC~MAIN_SQL~KERNEL_SPC~KERNEL_SQL~CLUSTER_SPC~CLUSTER_SQL~CUSTOM_SPC~CUSTOM_SQL~CUSTOMER_SPC~CUSTOMER_SQL~XSD_FILES~MENU_DETAILS~LABEL_DETAILS~AMEND_DETAILS~SUMMARY_DETAILS~SCREEN_DETAILS~LOV_DETAILS~BLOCK_PK_COLS~CALL_FORM_DETAILS~BLOCK_DETAILS~DATASCR_DETAILS~FUNCTION_CALL_FORMS~GATEWAY_DETAILS~VARIABLE_MAPPING~NOTIFICATION_DETAILS~FUNCTION_PARAMETERS~REPORT_PARAMETERS~NOTIFICATION_TRIGGER~UPLOAD_SPC~UPLOAD_SQL~UPLOAD_TRIGGER~UPLOAD_TABLE_DDL~ARCHIVE_TBL_DEF";
bckndList = bckndList.split("~");
var parms = "";
var fso;
var gen = new Array();
var xlsLabels = "";
var label = new Array();
var oWB;
var udfcallForm;
var calFrmPath = "";
var tool = "";
var log = "";
var Uixml1;
var status = "";
var frntndFiles = "";
var xmlDt = "";
var filnme = "";
var fileNamesArry = new Array();
var filePathsArry = new Array();
var callformContents = "";
var tempInc = 0;
var xmlFileList = "";
var g_Save_Dir = "";
var onlyFrntEndFiles = "";
var ElcmFrntEndFiles = "N";
var log = "";
var logHdr = "";
var countlog = "";
var ttlFiles = "";
var cmntdFiles = 0;
var sucesFiles = 0;
var failedFiles = 0;
var ignrdFiles = 0;
var ntfctnFiles = 0;
var purgeFiles = 0;
var tenzeofiles = 0;
var callFrmUiXml = new Array();
var debugLog = "";
var dataxml = "";

function getToolDetails() {
    var slIndx = document.getElementsByName("OLDNEW")[0].options.selectedIndex;
    tool = document.getElementsByName("OLDNEW")[0].options[slIndx].value;

}

function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
}

function getSchemadetails() {
	// Validations Changes
	if(parent.saveformat!="CLIENT")	{
		alertMessage("Please Set Save format as Client in USER PREFERENCES!!","I");
		return;
	}
    parms = params.split("~");
    disableCheckBox(true);

    schema = parent.jndiName;
    releaseType = parent.relType;
    language = parent.lang;
    document.getElementsByName("LANG_CODE")[0].value = language;

}

function addOption(obj, text, value, selected) {
    if (obj != null) {
        obj.options[obj.options.length] = new Option(text, value, false, selected);
    }
}

function fnGenerateUtils(type, tblObj) {
    bulkgenflag = 'Y';// amount field validation
    getToolDetails();
    var fileSavePath = "";
    var funcId = "";
    var Datscr = parent.jndiName;
    var scrpath = document.getElementsByName("DEST_XML")[0].value;
    if (document.getElementsByName("DATA_XML")[0]) {
        parent.dataxmlPath = document.getElementsByName("DATA_XML")[0].value;
    }

    var parval = params.split("~");
    parent.gReqType = "GEN";
    var radReqDOM = parent.parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/BULKGENFLAG"), "Y");

    if (document.getElementsByName(tblObj)[0].tBodies[0].rows.length > 0) {
        deleteAll(tblObj);
    }
    if (parent.saveformat == "ZIP") {
        alertMessage("Save Mode Should be Client Or Server", "E");
        return false;
    }
    if (!fnTestConnection()) {
        return false;
    }
    if (type == "BLKUPD") {
        onlyFrntEndFiles = "N";
        var destpath = scrpath.substring(0, scrpath.lastIndexOf('\\'));;
        var gennode = radReqDOM.createElement("TCMBLKUPLOAD");
        bodyNode.appendChild(gennode);
    }
    else {
        if (type != "EXCEL") {
            var destpath = document.getElementsByName("SOURCE_XML")[0].value;
            if (destpath == "") {
                alertMessage("Destination Path Cannont Be Null ...", "E");
                return false;
            }
        }
        parent.gReqCode = "GENERATE";
        setNodeText(selectSingleNode(radReqDOM, "//RAD_HEADER//REQ_CODE"), parent.gReqCode);
        var gennode = radReqDOM.createElement("GENERATE");
        bodyNode.appendChild(gennode);
        for (var fln = 0;fln < parms.length;fln++) {
            var node = radReqDOM.createElement(parms[fln]);
            gennode.appendChild(node);
        }
        chldNodes = gennode.childNodes;
        for (i = 0;i < chldNodes.length;i++) {
            var nodeNme = chldNodes[i].nodeName;
            if (type == "BULKGEN") {
                if (document.getElementById(nodeNme)) {
                    if (document.getElementById(nodeNme).checked == true) {
                        setNodeText(selectSingleNode(radReqDOM, "//GENERATE/" + nodeNme), 'Y');
                    }
                    else {
                        setNodeText(selectSingleNode(radReqDOM, "//GENERATE/" + nodeNme), 'N');
                    }
                }
                else {
                    setNodeText(selectSingleNode(radReqDOM, "//GENERATE/" + nodeNme), 'N');
                }

            }
            else if (type == "EXCEL") {
                if (document.getElementById(nodeNme)) {
                    setNodeText(selectSingleNode(radReqDOM, "//GENERATE/" + nodeNme), 'N');
                }
                else {
                    setNodeText(selectSingleNode(radReqDOM, "//GENERATE/" + nodeNme), 'N');
                }

            }
        }
    	if (document.getElementById("JAVA_CLASSES").checked == true) {
      		Elcm_units="N~Y~Y~Y~Y~Y";
      	}
    }
    if (type == "EXCEL") {
        setNodeText(selectSingleNode(radReqDOM, "//GENERATE/EXCEL_TEMPLATE"), 'Y');
        setNodeText(selectSingleNode(radReqDOM, "//RAD_HEADER/REQ_TYPE"), 'APP');
        setNodeText(selectSingleNode(radReqDOM, "//RAD_HEADER/REQ_CODE"), 'EXCELTEMPLATE');
    }
    else if (type == "BULKGEN") {
        setNodeText(selectSingleNode(radReqDOM, "//GENERATE/EXCEL_TEMPLATE"), 'N');
    }
    onlyFrntEndFiles = "Y";
    for (var bnl = 0;bnl < bckndList.length;bnl++) {
        if (selectSingleNode(radReqDOM, "//GENERATE/" + bckndList[bnl])) {
            if (getNodeText(selectSingleNode(radReqDOM, "//GENERATE/" + bckndList[bnl])) == "Y") {
                onlyFrntEndFiles = "N";
                break;
            }
        }
    }

    var fileList = "";
    lang_code = document.getElementsByName("LANG_CODE")[0].value;
    if (type != "EXCEL") {
        var len = destpath.length;
        var last_char = destpath.charAt(len - 1);
        if (last_char != "\\") {
            destpath = destpath + "\\";
        }
    }
    len = scrpath.length;
    var last_char = scrpath.charAt(len - 1);
    if (last_char != "\\") {
        scrpath = scrpath + "\\";
    }
    parent.gClnUsrDir = "YES";

    if((fso=checkActivex())){

        if (type == "EXCEL") {
            destpath = scrpath;
            destpath = destpath.substring(0, destpath.lastIndexOf("\\"));
            destpath = destpath.substring(0, destpath.lastIndexOf("\\"));
            g_Save_Dir = destpath;
        }

    }

    g_Save_Dir = destpath;
    if (xmlFileList == "") {
        xmlFileList = javaScriptReadFile(document.getElementsByName("FILE_SAVE_PATH")[0].value, document.getElementsByName("FILE_SAVE_PATH")[0]);
    }
    fileList = xmlFileList;
    fileList = fileList.split("\n");
    for (var fl = 0;fl < fileList.length;fl++) {
        if (fileList[fl] == "" || fileList[fl] == "\n" || fileList[fl] == "\r") {
        }
        else {
            fileNamesArry[fl] = trim(fileList[fl].substring(fileList[fl].lastIndexOf("\\") + 1, fileList[fl].length));
            filePathsArry[fileNamesArry[fl]] = fileList[fl].split("\r")[0];
            if (filePathsArry[fileNamesArry[fl]].indexOf("--") !=  - 1) {
                cmntdFiles = cmntdFiles + 1;
            }
        }
    }
    parent.tempFile = fileNamesArry.length;

    log += "---------------------------------------------------------------------------------------------------------------";
    log += "\n  FILE NAME \t\t\t\t\t\t\t   STATUS \t\t\t Error Description \t\t \n";
    log += "----------------------------------------------------------------------------------------------------------------\n";
    log += " Start Date Time " + dateDispaly();
    log += "----------------------------------------------------------------------------------------------------------------\n";
    for (var rfl = 0;rfl < fileNamesArry.length;rfl++) {
        subFldr = filePathsArry[fileNamesArry[rfl]].substring(0, filePathsArry[fileNamesArry[rfl]].lastIndexOf("\\"));
        // subFldr = subFldr.substring(subFldr.lastIndexOf("\\") + 1,
		// subFldr.length);
        var flname_A=filePathsArry[fileNamesArry[rfl]].substring(0, filePathsArry[fileNamesArry[rfl]].lastIndexOf("\\")).toUpperCase();
		if (flname_A.indexOf("MAIN") !=  - 1) {
            var mainindex = flname_A.lastIndexOf("MAIN");
            subFldr = subFldr.substring(mainindex + 4, subFldr.lastIndexOf("\\"));
            // subFldr = subFldr.substring(subFldr.lastIndexOf("\\") + 1,
			// subFldr.length);
        }
        else {
			subFldr = subFldr.substring(0, subFldr.lastIndexOf("\\"));
            subFldr = subFldr.substring(subFldr.lastIndexOf("\\") + 1, subFldr.length);
        }        if (/[^A-z|0-9|_|-]/.test(subFldr)) {
            subFldr = "";
        }
        debugLog += 'Filename ::::::' + fileNamesArry[rfl] + '***********\n';
        if (fileNamesArry[rfl] != undefined) {
            if (fileNamesArry[rfl] != "") {
                if (filePathsArry[fileNamesArry[rfl]].indexOf("--") ==  - 1) {
                    try {
                        var finalres = fnIterateFiles(subFldr, fileNamesArry[rfl], destpath, parent.jndiName, radReqDOM, type, tblObj);
                    }
                    catch (e) {
                        failedFiles = failedFiles + 1;
                        countlog = "\n\nTotal No Of Files                      \t  : " + fileNamesArry.length + "\n";
                        countlog += "Total No Of Commented Files               \t  : " + cmntdFiles + "\n";
                        countlog += "Total No Of Successfully Generated Files  \t  : " + sucesFiles + "\n";
                        countlog += "Total No Of Failed  Files                 \t  : " + failedFiles + "\n";
                        countlog += "Total No Of Notification Files            \t  : " + ntfctnFiles + "\n";
                        countlog += "Total No Of Purge Files                   \t  : " + purgeFiles + "\n";
                        countlog += "Total No Of 10.0  Files                   \t  : " + tenzeofiles + "\n";
                        fnShowResult(tblObj, fileNamesArry[rfl], subFldr, 'N', "Failed");
                        log += filePathsArry[fileNamesArry[rfl]] + "\t\t\t\t\t Failed \t\t Failed ..\n";
                        fnWriteMode(destpath, log + countlog, parent.username + "_FILE_STATUS_LOG.txt");
                        fnWriteMode(destpath, debugLog, parent.username + "_FRONTEND_LOG.txt");

                    }
                    countlog = "\nTotal No Of Files                        \t  : " + fileNamesArry.length + "\n";
                    countlog += "Total No Of Commented Files               \t  : " + cmntdFiles + "\n";
                    countlog += "Total No Of Successfully Generated Files  \t  : " + sucesFiles + "\n";
                    countlog += "Total No Of Failed  Files                 \t  : " + failedFiles + "\n";
                    countlog += "Total No Of Notification Files            \t  : " + ntfctnFiles + "\n";
                    countlog += "Total No Of Purge Files                   \t  : " + purgeFiles + "\n";
                    countlog += "Total No Of 10.0  Files                   \t  : " + tenzeofiles + "\n";
                    fnWriteMode(destpath, log + countlog, parent.username + "_FILE_STATUS_LOG.txt");
                    fnWriteMode(destpath, debugLog, parent.username + "_FRONTEND_LOG.txt");
                }
            }
        }
    }
    log += "----------------------------------------------------------------------------------------------------------------\n";
    log += "End Date Time : " + dateDispaly();
    log += "----------------------------------------------------------------------------------------------------------------\n";
    fnWriteMode(destpath, log + countlog, parent.username + "_FILE_STATUS_LOG.txt");
    if (sucesFiles >= 1) {
        if (finalres != false) {
            if (selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/EXCEL_TEMPLATE")) {
                if (getNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/EXCEL_TEMPLATE")) == "Y") {
                    if (parent.funcGenSeqNo.indexOf("ExcelTemplateGeneration") !=  - 1)
                        var wres = fnwritedata(finalres, "ZIP");
                }
            }
        }
        try {
            alertMessage("File Saved", "I");
        }
        catch (e) {
            // parent.alertMessage("File Saved", "I");
        }
    }

    fileNamesArry.length = 0;
    filePathsArry.length = 0;
    sucesFiles = 0;
    ntfctnFiles = 0;
    purgeFiles = 0;
    cmntdFiles = 0;
    failedFiles = 0;
    tenzeofiles = 0;
    log = "";
}

function fnGenXml(NewDOM, filename, destpath, scrpath, Datscr, subFldrName, radReqDOM, type, tblObj) {
	var radExtReqDOM =radReqDOM.cloneNode(true);
    amountValFlag = false;// amount field validation shihab
    frntndFiles = parent.gBodySeparator;
    var BulkActualDom=NewDOM.cloneNode(true);
    var xmlFilesContent = "";
    var jsFilesContent = "";
    var htmlFilesContent = "";
    oldNew = "NEW";
    function_id = filename.substring(filename, filename.indexOf("_RAD"));
    function_id = function_id.substring(filename.lastIndexOf("\\") + 1, function_id.length);
    var radFlname = function_id + "_RAD.xml";
	var purge_bulk=false;
	if (selectNodes(NewDOM, "RAD_FUNCTIONS/RAD_KERNEL/RAD_PURGE").length > 0) {
	purge_bulk=true;
	}

	if (type != "EXCEL" && type != "BLKUPD") {
        if (destpath != "") {
            var destpath = destpath + subFldrName + "\\";
            if(checkActivex()){ 
            try {
                    if (!fso.FolderExists(destpath))
                    	fnfolder(destpath);
                }
                catch (e) {
                }
            }
        }
    }

    if (subFldrName != "") {
        setNodeText(selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_HEADER/SUBFOLDER"), subFldrName);
    }
    if (destpath != "" && parent.saveformat == "SHARE") {
        setNodeText(selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_HEADER/BULKPATH"), destpath);
    }
    else {
        setNodeText(selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_HEADER/BULKPATH"), "");
    }
    
	var radNotif = selectNodes(NewDOM, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_NOTIFICATIONS").length > 0;
	paramsList = params.split('~');
    if(radNotif) { 
    	for (var bnl = 0;bnl < paramsList.length;bnl++) {
    		if (selectSingleNode(radExtReqDOM, "//GENERATE/" + paramsList[bnl])) {
    			if (paramsList[bnl]!= "MAIN_SPC" 
    				&& paramsList[bnl]!= "MAIN_SQL"
    					&& paramsList[bnl]!= "XSD_FILES"
    						&& paramsList[bnl]!= "RAD_XML"
    							&& paramsList[bnl]!= "NOTIFICATION_TRIGGER"
    							&& paramsList[bnl]!= "NOTIFICATION_DETAILS"
    				&& selectSingleNode(radExtReqDOM, "//GENERATE/" + paramsList[bnl]) 
    				&& getNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/" + paramsList[bnl])) == "Y") { 
    				setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/" + paramsList[bnl]), "N");
    			}
    		}
    	} 
    }
    
    if (selectNodes(NewDOM, "RAD_FUNCTIONS/RAD_KERNEL").length > 0) {

        if (selectNodes(NewDOM, "RAD_FUNCTIONS/RAD_KERNEL/RAD_NOTIFICATIONS").length > 0) {
            //fnShowResult(tblObj, filename, subFldrName, 'N', "Notification Rad Xml Need Not Be Generated");
            log += filePathsArry[radFlname] + "\t\t\t\t\t Ignored \t\t Notification Rad Xml...\n";
            ntfctnFiles = ntfctnFiles + 1;
            //return false;
        }
	try{
	setNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/OPERATION"), "GENERATE");
	}
catch(e){}
       
	   if (selectNodes(NewDOM, "RAD_FUNCTIONS/RAD_KERNEL/RAD_PURGE").length > 0){
	   debugLog += "Bulk Generation of Purge \n";
	   }
	   else{
	    debugLog += "Before Calling the fnPrepareConsolDOM \n";
        var funcTyp = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
        NewDOM = fnPrepareConsolDOM(NewDOM, function_id, funcTyp, "LOAD");
        dom = NewDOM;
        fnCollectGlobalLov(dom);
        fnCollectCallfrmData(dom);
		// for Populating Data Type Values.
		// fnPopulate_Maxlength_bulk();
        debugLog += "After  Calling the fnPrepareConsolDOM \n";
		}
        var lblsNodes = "";
        if (type != "EXCEL" && !purge_bulk && !radNotif) {
            try {
                lblsNodes = fnGetLableXml(NewDOM, function_id, radExtReqDOM);
            }
            catch (e) {
                try {
                    lblsNodes = fnGetLableXml(NewDOM, function_id, radExtReqDOM);
                }
                catch (e) {
                    log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Extracting the Label ..\n";
                    failedFiles = failedFiles + 1;
                    return;
                }

            }

        }
		
        debugLog += "After  Calling the fnGetLableXml \n"
        if (selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/UIXML") != null && !purge_bulk) {

            if (getNodeText(selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/UIXML")) == "Y") {
                var uixmlPath = destpath + "UIXML\\";
                var x = selectNodes(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE")[0];
                x.appendChild(selectNodes(lblsNodes, "RAD_FID_LABELS")[0]);
                uixml = transformDOMtoUIxml(NewDOM);
                // amount field validation shihab
                if (amountValFlag) {
                    log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Amount Field Issue ..\n";
                    fnShowResult(tblObj, filename, subFldrName, 'N', "Amount Field issue");
                    failedFiles = failedFiles + 1;
                    return false;
                }
                // amount field validation shihab
                var xmlDt = "UIXML\\" + lang_code + "\\" + function_id + ".xml--";
                debugLog += "Before   Calling the fnSaveEngXml \n";
                xmlDt += fnSaveEngXml(uixmlPath, uixml, false, function_id, lang_code, Datscr);
                debugLog += "After   Calling the fnSaveEngXml \n";
                xmlFilesContent += xmlDt;
                if (errType == "E") {
                    fnWriteMode(destpath, errLogMsg, function_id + "_DESC_MISSING_LABELS.txt");
                    errLogMsg = "";
                }
                status = "Successful";

            }
        }
        if (selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/SYS_JS") != null && !purge_bulk) {
            if (getNodeText(selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/SYS_JS")) == "Y") {
			var funtype = getNodeText(selectNodes(NewDOM, "//RAD_FUNCTIONS/FUNCTION_TYPE")[0]);
               if(funtype != 'S'){
                var jsPath = destpath + "JS\\";
                parent.gGenPckgs = "NO";
                parent.gGenElTemp = "NO";
                debugLog += "Before Calling the saveScripts \n";
                jsFilesContent += saveScripts(jsPath, getXMLString(NewDOM), 'B');
                // amount field validation shihab
                if (amountValFlag) {
                    log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Amount Field Issue ..\n";
                    fnShowResult(tblObj, filename, subFldrName, 'N', "Amount Field issue");
                    failedFiles = failedFiles + 1;
                    return false;
                }
                // amount field validation shihab
                debugLog += "After  Calling the saveScripts \n";
                status = "Successful";

            }
        }
        }
        if (selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/EXCEL_TEMPLATE") != null) {
            callformContents = "";
            if (getNodeText(selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/EXCEL_TEMPLATE")) == "Y") {
                var callforms = selectNodes(NewDOM, "//RAD_CALLFORM");
                if (callforms.length > 0) {
                    debugLog += "Before  Calling the fnGetCallformContents \n";
                    var tmpDom = getCloneDocElement(NewDOM);
                    callformContents = fnGetCallformContents(NewDOM, subFldrName, tblObj);
                    NewDOM = tmpDom;
                    debugLog += "After  Calling the fnGetCallformContents \n";
                    if (callformContents == false) {
                        return false;
                    }
                    if (function_id.charAt(2) != "C") {
                        status = "Successful";

                    }
                }
            }
        }
        
       var funtype = getNodeText(selectNodes(NewDOM, "//RAD_FUNCTIONS/FUNCTION_TYPE")[0]);
        if(funtype == 'S') { 
        	for (var bnl = 0;bnl < incFlsList.length;bnl++) {
        		if (selectSingleNode(radExtReqDOM, "//GENERATE/" + incFlsList[bnl])) {
        			if (incFlsList[bnl]!= "MENU_DETAILS" 
        				&& incFlsList[bnl]!= "LABEL_DETAILS"
        					&& incFlsList[bnl]!= "GATEWAY_DETAILS"
        						&& incFlsList[bnl]!= "AMEND_DETAILS"
        							&& incFlsList[bnl]!= "XSD_FILES"
        				&& selectSingleNode(radExtReqDOM, "//GENERATE/" + incFlsList[bnl]) 
        				&& getNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/" + incFlsList[bnl])) == "Y") { 
        				setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/" + incFlsList[bnl]), "N");
        			}
        		}
        	} 

        }
        
        if (selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/SCREEN_HTMLS") != null && !purge_bulk) {
            if (getNodeText(selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/SCREEN_HTMLS")) == "Y") {
                function_id = filename.substring(filename, filename.indexOf("_RAD"));
                function_id = function_id.substring(filename.lastIndexOf("\\") + 1, function_id.length);
                if (function_id.match("_")) {
                    var htmlRes = fnGetBranchCallFrms(NewDOM, tblObj);
                    if (!htmlRes) {
                        return false;
                    }

                }
                parent.dataXmlFlg = 'N';
                htmlFilesContent += fnGenerareHtml(NewDOM, destpath, oldNew, subFldrName);
            }
        }
        else if (selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/DATA_HTMLS") != null && !purge_bulk) {
            if (getNodeText(selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/DATA_HTMLS")) == "Y") {
                function_id = filename.substring(filename, filename.indexOf("_RAD"));
                function_id = function_id.substring(filename.lastIndexOf("\\") + 1, function_id.length);
                if (function_id.match("_")) {
                    var htmlRes = fnGetBranchCallFrms(NewDOM, tblObj);
                    if (!htmlRes) {
                        return false;
                    }

                }

                parent.dataXmlFlg = 'Y';
                htmlFilesContent += fnGenerareHtml(NewDOM, destpath, oldNew, subFldrName);
            }
        }

        if (type == "BLKUPD") {
            debugLog += "Inside the block details   \n";
            parent.gReqType = "GEN";
            parent.gReqCode = "TCMBLKUPLOAD";
            setNodeText(selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "TCMBLKUPLOAD");
            var x = selectNodes(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/TCMBLKUPLOAD")[0];
            x.appendChild(selectNodes(lblsNodes, "RAD_FID_LABELS")[0]);
            debugLog += "Before uploading the details  \n";
            var response = parent.fnPost(getXMLString(radExtReqDOM) + parent.gBodySeparator + getXMLString(NewDOM), "RADClientHandler");
            if (response == "") {
                debugLog += "Response is null \n";
                response = parent.fnPost(getXMLString(radExtReqDOM) + parent.gBodySeparator + getXMLString(NewDOM), "RADClientHandler");
            }
            if (response == "") {
                debugLog += "2nd time Response is null \n";
                failedFiles = failedFiles + 1;
                log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Generated Successfully...\n";
            }
            else {
                sucesFiles = sucesFiles + 1;
                log += filePathsArry[radFlname] + "\t\t\t\t\t Successful \t\t Generated Successfully...\n";
            }
            if (parent.gfnPostStatus == "") {
                parent.gfnPostStatus = 'F';
            }
            fnShowResult('LOG', filename, subFldrName, parent.gfnPostStatus, "");
            return true;
        }

        try {
        	if (getNodeText(selectNodes(NewDOM, "//RAD_FUNC_PREFERENCES/ELCM_FUNCTION")[0]) == "Y") {
        		ElcmFrntEndFiles = "Y";

        		try {
        			var elcm_function = "";
        			var radnode1 = selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
        			var ElcmNode = radExtReqDOM.createElement("ELCM_FUNCTION");
        			
        			radnode1.appendChild(ElcmNode);
        			if(document.getElementById("JAVA_CLASSES").checked == true) {
        				elcm_function += "Y~Y~Y~Y~Y~Y";
        			}
        			setNodeText(selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ELCM_FUNCTION"), elcm_function);
        			setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/MAIN_SPC"), 'N');
        			setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/MAIN_SQL"), 'N');
        			setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/KERNEL_SPC"), 'N');
        			setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/KERNEL_SQL"), 'N');
        			setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/CLUSTER_SPC"), 'N');
        			setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/CLUSTER_SQL"), 'N');
        			setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/CUSTOM_SPC"), 'N');
        			setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/CUSTOM_SQL"), 'N');
        		} catch (e) {
        		}
        	} else {
        		ElcmFrntEndFiles = "N";
        	}
        } catch (e) {
        }
        if (htmlFilesContent != "")
        	frntndFiles += htmlFilesContent + parent.gBodySeparator;

       /* if (xmlFilesContent != "")
            frntndFiles += xmlFilesContent + parent.gBodySeparator;
        if (jsFilesContent != "")
            frntndFiles += jsFilesContent + parent.gBodySeparator;
        if (htmlFilesContent != "")
            frntndFiles += htmlFilesContent + parent.gBodySeparator;
			if(getNodeText(selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/RAD_XML"))=="Y"){
			dom = RetroChangesToRespectiveRelease(dom); 
			frntndFiles += parent.gBodySeparator + ("RADXML\\" + function_id + "_RAD.xml--") + getXMLString(dom);
			}

        if (onlyFrntEndFiles == "Y" && parent.saveformat != "SHARE" && ElcmFrntEndFiles == "N") {
            if (getNodeText(selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/EXCEL_TEMPLATE")) == "N") {
                debugLog += "Before  Calling the fnSplitFiles \n";
                fnSplitFiles(frntndFiles, destpath, parent.operMode);
                debugLog += "After  Calling the fnSplitFiles \n";
                tblObj = "bulkresult";
                fnShowResult(tblObj, radFlname, subFldrName, 'G', "");
                sucesFiles = sucesFiles + 1;
                log += filePathsArry[radFlname] + "\t\t\t\t\t Successful \t\t Generated Successfully...\n";

            }
            else {
                GenPackages(radExtReqDOM, NewDOM, destpath, subFldrName, callformContents, tblObj,BulkActualDom);
            }
        }
        else */ {
            GenPackages(radExtReqDOM, NewDOM, destpath, subFldrName, callformContents, tblObj,BulkActualDom);
        }
    }
	purge_bulk=false;
}

function fnGenOldXml(NewDOM, filename, destpath, scrpath, subFldrName, radReqDOM, type, tblObj) {

var radNonReqDOM = radReqDOM.cloneNode(true);
    amountValFlag = false;// amount field validation shihab
    frntndFiles = parent.gBodySeparator;
    var xmlFilesContent = "";
    var jsFilesContent = "";
    var htmlFilesContent = "";

    oldNew = "OLD";
    function_id = filename.substring(filename, filename.indexOf("_RAD"));
    function_id = function_id.substring(filename.lastIndexOf("\\") + 1, function_id.length);
    var radFlname = function_id + "_RAD.xml";
    if (type != "EXCEL") {
        if (destpath != "") {
            var destpath = destpath + subFldrName + "\\";
            if(checkActivex()){ 
                if (!fso.FolderExists(destpath))
                	fnfolder(destpath);
            }
        }
    }
    if (subFldrName != "") {
        setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_HEADER/SUBFOLDER"), subFldrName);
    }
    if (destpath != "") {
        setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_HEADER/BULKPATH"), destpath);
    }
    if (selectNodes(NewDOM, "RAD_FUNCTIONS/RAD_KERNEL").length == 0) {
        if (!selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_DATASOURCES/IS_CONTROLDS")) {
            fnShowResult(tblObj, filename, subFldrName, 'N', "10.0 Rad Xml Cannot Be Generated");
            log += filePathsArry[radFlname] + "\t\t\t\t\t Ignored \t\t  10.0 Rad Xml Needs to be Converted to 10.2 Compatible\n";
            tenzeofiles = tenzeofiles + 1;
            return false;
        }
        debugLog += "before  Calling the fnGetLableXml_Old \n"
        var lblsNodes = "";
        if (type != "EXCEL") {
            try {
                lblsNodes = fnGetLableXml_Old(NewDOM, function_id, radNonReqDOM);
            }
            catch (e) {

                try {
                    lblsNodes = fnGetLableXml_Old(NewDOM, function_id, radNonReqDOM);
                }
                catch (e) {
                    log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Extracting the old Label ..\n";
                    failedFiles = failedFiles + 1;
                    return;

                }

            }

        }
        debugLog += "After  Calling the fnGetLableXml_Old \n"
        if (type == "BLKUPD") {
            setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "OLDPKFIELDS");
            setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_TYPE"), "APP");
            var response = parent.fnPost(getXMLString(radNonReqDOM) + parent.gBodySeparator + getXMLString(NewDOM), "RADClientHandler");
            var node = radNonReqDOM.createElement("MASTER_PK_COLS");
            var radnode = selectSingleNode(radNonReqDOM, "//RAD_BODY");
            radnode.appendChild(node);
            setNodeText(selectSingleNode(radNonReqDOM, "//RAD_BODY/MASTER_PK_COLS"), response);
            setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_TYPE"), "GEN");
            parent.gReqType = "GEN";
            parent.gReqCode = "TCMBLKUPLOAD";
            setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "TCMBLKUPLOAD");
            var x = selectNodes(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/TCMBLKUPLOAD")[0];
            x.appendChild(selectNodes(lblsNodes, "RAD_FID_LABELS")[0]);
            var response = parent.fnPost(getXMLString(radNonReqDOM) + parent.gBodySeparator + getXMLString(NewDOM), "RADClientHandler");
            if (response == "") {
                debugLog += " Response is null \n";
                response = parent.fnPost(getXMLString(radNonReqDOM) + parent.gBodySeparator + getXMLString(NewDOM), "RADClientHandler");
            }
            if (response == "") {
                debugLog += "2nd time Response is null \n";
                failedFiles = failedFiles + 1;
                log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Generated Successfully...\n";
            }
            else {
                sucesFiles = sucesFiles + 1;
                log += filePathsArry[radFlname] + "\t\t\t\t\t Successful \t\t Generated Successfully...\n";
            }
            fnShowResult('LOG', filename, subFldrName, parent.gfnPostStatus, "");
            return true;
        }
        callformContents = "";
        if (selectNodes(NewDOM, "//RAD_CALLFORM").length > 0) {
            debugLog += "before  Calling the fnGetCallformContents \n";
            callformContents = fnGetCallformContents(NewDOM, subFldrName, tblObj);
            debugLog += "After  Calling the fnGetCallformContents \n";
            if (callformContents == false) {
                return false;
            }
        }

        if (getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/UIXML")) == "Y") {
            var uixmlPath = destpath + "UIXML\\";
            var x = selectNodes(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE")[0];
            x.appendChild(selectNodes(lblsNodes, "RAD_FID_LABELS")[0]);
            var langFileDir = uixmlPath + lang_code + "\\";
            var xmlDt = parent.gBodySeparator + "UIXML\\" + lang_code + "\\" + function_id + ".xml--";
            debugLog += "before  Calling the fnCreateUIXMLFiles_Old \n";
            xmlDt += fnCreateUIXMLFiles_Old(getXMLString(NewDOM), langFileDir);
            debugLog += "After  Calling the fnCreateUIXMLFiles_Old \n";
            // amount field validation shihab
            if (amountValFlag) {
                log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Amount Field Issue ..\n";
                fnShowResult(tblObj, filename, subFldrName, 'N', "Amount Field issue");
                failedFiles = failedFiles + 1;
                return false;
            }
            // amount field validation shihab
            xmlFilesContent += xmlDt;
            parent.gGenPckgs = "NO";
            parent.gGenElTemp = "NO";
        }

        if (getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/SYS_JS")) == "Y") {

            var jsPath = destpath + "JS\\";
            var xmlDt = parent.gBodySeparator + "JS\\" + function_id + "_SYS.js--";
            debugLog += "before  Calling the fnCreateSysFiles_Old \n";
            var jsRslt = fnCreateSysFiles_Old(getXMLString(NewDOM), jsPath);
            debugLog += "After  Calling the fnCreateSysFiles_Old \n";
            // amount field validation shihab
            if (amountValFlag) {
                log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Amount Field Issue ..\n";
                fnShowResult(tblObj, filename, subFldrName, 'N', "Amount Field issue");
                failedFiles = failedFiles + 1;
                return false;
            }
            // amount field validation shihab
            if (jsRslt != false) {
                xmlDt += jsRslt;
                jsFilesContent += xmlDt;
            }

        }

        if (getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/EXCEL_TEMPLATE")) == "Y") {
            if (function_id.charAt(2) != "C") {

                if (callformContents == "" || callformContents != false) {

                }

            }
        }
        else {
            if (getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/SCREEN_HTMLS")) == "Y") {
                parent.dataXmlFlg = 'N';
                htmlFilesContent += fnGenerareHtml(NewDOM, destpath, oldNew, subFldrName);

            }
            else if (getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/DATA_HTMLS")) == "Y") {
                parent.dataXmlFlg = 'Y';
                htmlFilesContent += fnGenerareHtml(NewDOM, destpath, oldNew, subFldrName);

            }

            if (getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/MAIN_SQL")) == "Y" || getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/MAIN_SPC")) == "Y") {
                setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/MAIN_SQL"), "N");
                setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/MAIN_SPC"), "N");

            }
            if (getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/KERNEL_SQL")) == "Y" || getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/KERNEL_SPC")) == "Y") {
                setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/KERNEL_SQL"), "N");
                setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/KERNEL_SPC"), "N");
            }
            if (getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/CLUSTER_SQL")) == "Y" || getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/CLUSTER_SPC")) == "Y") {
                setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/CLUSTER_SQL"), "N");
                setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/CLUSTER_SPC"), "N");
            }
            if (getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/CUSTOM_SQL")) == "Y" || getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/CUSTOM_SPC")) == "Y") {
                setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/CUSTOM_SQL"), "N");
                setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/CUSTOM_SPC"), "N");
            }
            if (getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/CUSTOMER_SQL")) == "Y" || getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/CUSTOMER_SPC")) == "Y") {
                setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/CUSTOMER_SQL"), "N");
                setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/CUSTOMER_SPC"), "N");
            }
            if (getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/XSD_FILES")) == "Y") {
                setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/XSD_FILES"), "N");
            }
            if (xmlFilesContent != "")
                frntndFiles += xmlFilesContent + parent.gBodySeparator;
            if (jsFilesContent != "")
                frntndFiles += jsFilesContent + parent.gBodySeparator;
            if (htmlFilesContent != "")
                frntndFiles += htmlFilesContent + parent.gBodySeparator;
        }
        
        try {
            var elcm_function = "NON-EXT"; 
           var radnode1 = selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
           var ElcmNode = radNonReqDOM.createElement("ELCM_FUNCTION");
           radnode1.appendChild(ElcmNode); 
           setNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ELCM_FUNCTION"), elcm_function);
       
   }
   catch (e) {
   }
        

        if (onlyFrntEndFiles == "Y" && parent.operMode == "JS") {
            if (getNodeText(selectSingleNode(radNonReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/EXCEL_TEMPLATE")) == "N") {
                debugLog += "Before  Calling the fnSplitFiles \n";
                fnSplitFiles(frntndFiles, destpath, parent.operMode);
                debugLog += "After  Calling the fnSplitFiles \n";
                tblObj = "bulkresult";
                fnShowResult(tblObj, radFlname, subFldrName, 'G', "");
                sucesFiles = sucesFiles + 1;
                log += filePathsArry[radFlname] + "\t\t\t\t\t Successful \t\t Generated Successfully...\n";
            }
            else {
                fnCallCodeGenerator(radNonReqDOM, NewDOM, destpath, callformContents, subFldrName, frntndFiles, tblObj);
            }
        }
        else {
            fnCallCodeGenerator(radNonReqDOM, NewDOM, destpath, callformContents, subFldrName, frntndFiles, tblObj);
        }

    }
}

function checkForAllGenerations(xml) {
    if (document.getElementsByName("ALL")[0].checked == true) {
        for (var i = 0;i < parms.length;i++) {
            if (document.getElementById(parms[i])) {
                document.getElementsByName(parms[i])[0].checked = false;
            }
        }
        disableCheckBox(true);
    }
    else 
        disableCheckBox(false);
}

function disableCheckBox(value) {
    if (gen_gwinFuncId == "TCDBLKDT") {
        for (var i = 0;i < parms.length;i++) {
            if (document.getElementById(parms[i])) {
                document.getElementsByName(parms[i])[0].checked = value;
            }
        }
    }
    else if (gen_gwinFuncId != "RDDELTMP") {
        document.getElementById("UIXML").checked = true;
        document.getElementById("SYS_JS").checked = true;
    }
    if (document.getElementById("NOTIFICATION_TRIGGER")) {
        document.getElementById("NOTIFICATION_TRIGGER").checked = false;
        document.getElementById("NOTIFICATION_TRIGGER").disabled = true;
        document.getElementById("NOTIFICATION_DETAILS").checked = false;
        document.getElementById("NOTIFICATION_DETAILS").disabled = true;
    }
}

function GenPackages(radReqDOM, xml, filepath, subFldrName, callformContents, tblObj,BulkActualDom) 
{

    var radExtReqDOM = radReqDOM.cloneNode(true);
   	var gfuncid ="";
	
	if (selectNodes(NewDOM, "RAD_FUNCTIONS/RAD_KERNEL/RAD_PURGE").length > 0) { 
      gfuncid = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/ENTITY_ID")[0]);
	  setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/SYS_JS"), 'N');
      setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/UIXML"), 'N');
      
	}
	else{	
	var funtype = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FUNCTION_TYPE")[0]);
    if(funtype == 'S'){
      setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/MAIN_SPC"), 'N');
      setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/MAIN_SQL"), 'N');
      setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/KERNEL_SPC"), 'N');
      setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/KERNEL_SQL"), 'N');
      setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/CUSTOM_SPC"), 'N');
      setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/CUSTOM_SQL"), 'N');
      setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/CUSTOMER_SPC"), 'N');
      setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/CUSTOMER_SQL"), 'N');
      setNodeText(selectSingleNode(radExtReqDOM, "//GENERATE/SYS_JS"), 'N');

     }
	 
	  
      gfuncid = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FUNCTION_ID")[0]);
	}
    var radFlname = gfuncid + "_RAD.xml";
    var  BulkActualDomvar = parent.gBodySeparator + ("RADXML\\" + gfuncid + "_RAD.xml--") + getXMLString(BulkActualDom);
    var response = CallCodeGenerator(radExtReqDOM, getXMLString(xml) + BulkActualDomvar + "--END OF RAD XML --" + callformContents, "");//chinmay
    parent.gSubFolder = subFldrName;
    response = frntndFiles + "--##FILE##--" + response;
    if (response != null) {
        if (getNodeText(selectSingleNode(radExtReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/EXCEL_TEMPLATE")) == "N") {
            fnSplitFiles(response, filepath, parent.operMode);
            tblObj = "bulkresult";
        }
        var files = response.split("--##FILE##--");

        var finRslt = files[files.length - 1];

        if (getNodeText(selectSingleNode(loadXMLDoc(finRslt), "//RAD_RES_ENV/RAD_HEADER/MSGSTAT")) == "SUCCESS") {
            fnShowResult(tblObj, radFlname, subFldrName, 'G', "");
            sucesFiles = sucesFiles + 1;
            log += filePathsArry[radFlname] + "\t\t\t\t\t Successful \t\t Generated Successfully..\n";

        }
        else {
            fnShowResult(tblObj, radFlname, subFldrName, 'N', "Inc Genration Failed..");
            log += filePathsArry[radFlname] + "\t\t\t Failed \t\t Inc Generation Failed...\n";
            failedFiles = failedFiles + 1;
        }
        parent.currentCount = 1;
        var error = "";
    }

}

function fnCallCodeGenerator(radReqDOM, radXml, savePath, callformContents, subFldrName, frntndFiles, tblObj) {

    var gfuncid = getNodeText(selectNodes(radXml, "//RAD_FUNCTIONS/FUNCTION_ID")[0]);
    var fileNameAppend = "PKS_FCJ_" + gfuncid;
    var module = "";
    var fileName = "";
    var errorMsg = "";
    parent.gSubFolder = subFldrName;

    var radFlname = gfuncid + "_RAD.xml";
    var response = CallCodeGenerator(radReqDOM, getXMLString(radXml) + "--END OF RAD XML --" + callformContents, frntndFiles);
    var tblObj = "exlresult";
    response = frntndFiles + "--##FILE##--" + response;
    if (response != null) {

        if (getNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/GENERATE/EXCEL_TEMPLATE")) == "N") {
            fnSplitFiles(response, savePath, parent.operMode);
            tblObj = "bulkresult";
        }
        var files = response.split("--##FILE##--");

        var finRslt = files[files.length - 1];

        if (getNodeText(selectSingleNode(loadXMLDoc(finRslt), "//RAD_RES_ENV/RAD_HEADER/MSGSTAT")) == "SUCCESS") {
            fnShowResult(tblObj, radFlname, subFldrName, 'G', "");
            sucesFiles = sucesFiles + 1;
            log += filePathsArry[radFlname] + "\t\t\t\t\t Successful \t\t Generated Successfully..\n";

        }
        else {
            fnShowResult(tblObj, radFlname, subFldrName, 'N', "Inc Genration Failed..");
            log += filePathsArry[radFlname] + "\t\t\t Failed \t\t Inc Generation Failed...\n";
            failedFiles = failedFiles + 1;

        }
        parent.currentCount = 1;
        var error = "";
    }
}

function getLabelDescription(labels) {
    parent.gReqCode = 'UICONTROLLER';
    parent.gReqType = "APP";
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R006" + parent.gBodySeparator + labels, "RADClientHandler");

    var responseXML = response;
    var error = selectSingleNode(responseXML, "/ROOT/ERROR");
    if (error != null) {
        return false;
    }
    else {
        return responseXML;
    }
}

function fnGenerareHtml(xml, destpath, oldNew, subFldrName) {

    var datascr = parent.jndiName;
    var result = "";
    var lang = parent.lang;
    if (parent.dataXmlFlg == 'Y') {
        dataxml = javaBulkReadFile(parent.dataxmlPath + "\\" + function_id + ".xml", "");
        dataxml = loadXMLDoc(dataxml);
    }
    if (lang == "ARB") {
        var lngCss = "ar";
    }
    else if (lang == "FRC") {
        var lngCss = "fr";
    }
    else {
        var lngCss = "en";
    }
    if (oldNew == "OLD") {

        if (parent.dataXmlFlg == 'Y') {
            updatedMultiRecord(dataxml, xml);
        }
        var uixml = fntransform(xml, 'XSLold/2oldXML.xsl');

        if (navigator.appName == navAppName()) {
            var transquery = translateUIXML_Old(loadXMLDoc(uixml));
            uixml = fnMakeStdBtnBlkHTML(transquery, xml);
            uixml = fnGetTabAllHgtHTML(uixml);
        }
        else {
            var transquery = translateUIXML_Old(loadXMLDoc(getXMLString(uixml).toString()));
            uixml = fnMakeStdBtnBlkHTML(loadXMLDoc(getXMLString(uixml).toString()), xml);
            uixml = fnGetTabAllHgtHTML(uixml);
        }
        var xslName = "Templates/XSL/Detail.xsl";
        var langFileDir = destpath + lang + "\\";
    }
    else {
        var uixml = transformDOMtoUIxml(xml);
        var engxml = fnSaveEngXml('', uixml, "true", function_id, lang, datascr);
        var xslName = "Templates/ExtXSL/ExtDetail.xsl";
    }

    var len = selectNodes(xml, "//RAD_SCREENS");

    for (var i = 0;i < len.length;i++) {
        var scr = getNodeText(selectSingleNode(len[i], "SCREEN_NAME"));
        var xmlDt = "";
        var btntyp = ""

        if (scr != 'SUMMARY') {
            if (oldNew == "NEW") {
                if (getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/FUNCTION_CATEGORY")) != "DASHBOARD") {
                    if (selectSingleNode(loadXMLDoc(engxml), "//FORM/SCREEN[@NAME='" + scr + "']") != null) {
                        btntyp = getNodeText(selectSingleNode(loadXMLDoc(engxml), "//FORM/SCREEN[@NAME='" + scr + "']/EXIT_BTN"));

                        xmlDoc = loadXMLDoc(engxml);
                        if (parent.dataXmlFlg == 'Y') {
                            prepareDataUIXML(dataxml, xmlDoc);
                        }
                        if (function_id.match("_")) {
                            xmlDoc = brachHtml(xmlDoc);
                            xmlStng = replaceEmbeddedXML(xmlDoc);
                            xmlDoc = loadXMLDoc(xmlStng);
                        }
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
                            var descwhrCls = " WHERE FUNCTION_ID ='" + function_id + "' AND LANG_CODE='" + lang + "'";
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
                                xmlDt = parent.gBodySeparator + "HTML\\" + function_id + "__" + scr + "__" + tabId + ".html--";
                                result += xmlDt + generateHTML(html, destpath, scr, tabId, scrTitle, resCls, function_id, winType, lngCss) + parent.gBodySeparator;

                            }
                        }
                        if (tabNodes1.length > 1) {
                            for (var tbl = 0;tbl < tabNodes1.length;tbl++) {
                                var tabId1 = tabNodes1[tbl].getAttribute("ID");
                                xmlDt = parent.gBodySeparator + "HTML\\" + function_id + "__" + scr + "__" + tabId1 + ".html--";
                                result += xmlDt + generateHTML(html, destpath, scr, tabId1, scrTitle, resCls, function_id, winType, lngCss) + parent.gBodySeparator;
                            }
                        }
                        else {
                            xmlDt = parent.gBodySeparator + "HTML\\" + function_id + "__" + scr + ".html--";
                            result += xmlDt + generateHTML(html, destpath, scr, "", scrTitle, resCls, function_id, winType, lngCss) + parent.gBodySeparator;
                        }

                    }
                }
                else {
                    if (getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/FUNCTION_CATEGORY")) == "DASHBOARD" && scr != "CVS_MAIN") {
                        xslName = "Templates/ExtXSL/ExtDashboardDetail.xsl";
                        xmlDoc = loadXMLDoc(engxml);
                        var scrTitle = selectSingleNode(xmlDoc, ("//SCREEN[@NAME = '" + scr + "']")).getAttribute("TITLE");
                        if (scrTitle == "" || scrTitle == null) {
                            var descwhrCls = " WHERE FUNCTION_ID ='" + function_id + "' AND LANG_CODE='" + lang + "'";
                            var radReqDOM = parent.buildRADXml();
                            var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R021" + parent.gBodySeparator + descwhrCls, "RADClientHandler");
                            scrTitle = response;
                        }
                        var html = ShowPreview(xslName, loadXMLDoc(engxml), scr, "");
                        if (navigator.appName != navAppName()) {
                            html = getXMLString(html);
                        }
                        xmlDt = parent.gBodySeparator + "HTML\\" + function_id + "__" + scr + ".html--";
                        result += xmlDt + generateDashboardHTML(html, destpath, scr, "", scrTitle, resCls, function_id, winType, lngCss) + parent.gBodySeparator;

                    }
                }
            }
            else {

                if (parent.dataXmlFlg == 'Y') {
                    prepareOldDataUIXML(dataxml, uixml);
                }
                var html = ShowPreviewForOldRadXml(xslName, uixml, scr);
                if (navigator.appName != navAppName()) {
                    html = getXMLString(html);
                }
                var tabNodes = selectNodes(uixml, ("//SCREEN[@NAME = '" + scr + "']/HEADER/PAGE"));
                var tabNodes1 = selectNodes(uixml, ("//SCREEN[@NAME = '" + scr + "']/TAB/PAGE[@NAME != 'All']"));
                var scrNode = selectSingleNode(uixml, ("//SCREEN[@NAME = '" + scr + "']"));
                var scrTitle = selectSingleNode(uixml, ("//SCREEN[@NAME = '" + scr + "']")).getAttribute("TITLE");
                var scrSize = selectSingleNode(uixml, ("//SCREEN[@NAME = '" + scr + "']")).getAttribute("TMP_SCR_TYPE");
                if (scrTitle == "" || scrTitle == null) {
                    var descwhrCls = " WHERE FUNCTION_ID ='" + function_id + "' AND LANG_CODE='" + lang + "'";
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
                        xmlDt = parent.gBodySeparator + "HTML\\" + function_id + "__" + scr + "__" + tabId + ".html--";
                        result += xmlDt + generateHTMLOld(html, destpath, scr, tabId, scrTitle, resCls, function_id, winType, lngCss, xml) + parent.gBodySeparator;
                    }
                }
                if (tabNodes1.length > 1) {
                    for (var tbl = 0;tbl < tabNodes1.length;tbl++) {
                        var tabId1 = tabNodes1[tbl].getAttribute("ID");
                        xmlDt = parent.gBodySeparator + "HTML\\" + function_id + "__" + scr + "__" + tabId1 + ".html--";
                        result += xmlDt + generateHTMLOld(html, destpath, scr, tabId1, scrTitle, resCls, function_id, winType, lngCss, xml) + parent.gBodySeparator;

                    }
                }
                else {
                    xmlDt = parent.gBodySeparator + "HTML\\" + function_id + "__" + scr + ".html--";
                    result += xmlDt + generateHTMLOld(html, destpath, scr, "", scrTitle, resCls, function_id, winType, lngCss, xml) + parent.gBodySeparator;
                }

            }

        }

    }
    var sumrylen = selectNodes(xml, "//RAD_SUMMARY");
    if (sumrylen.length > 0) {
        func_id = function_id.substr(0, 2) + "S" + function_id.substr(3, function_id.length)

        if (oldNew == "NEW") {
            if (getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/FUNCTION_CATEGORY")) != "DASHBOARD") {
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
                    result += xmlDt + generateHTMLSmry(html, destpath, scr, "", smryTitle, resCls, function_id, winType, lngCss) + parent.gBodySeparator;
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
                result += xmlDt + generateDashboardHTML(html, destpath, scr, "", "Summary", resCls, func_id, winType, lngCss) + parent.gBodySeparator;
            }
        }
        else {
            var smryTitle = "";
            var descwhrCls = " WHERE FUNCTION_ID ='" + func_id + "' AND LANG_CODE='" + lang + "'";
            var radReqDOM = parent.buildRADXml();
            var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R021" + parent.gBodySeparator + descwhrCls, "RADClientHandler");
            smryTitle = response;
            var html = ShowPreviewForOldRadXml("Templates/XSL/Tmp_Summary.xsl", transquery, scr);
            if (navigator.appName != navAppName()) {
                html = getXMLString(html);
            }
            xmlDt = parent.gBodySeparator + "HTML\\" + func_id + "__SUMMARY.html--";
            result += xmlDt + generateHTMLOldSmry(html, destpath, scr, "", "Summary", resCls, function_id, winType, lngCss) + parent.gBodySeparator;
        }
    }

    if (logMsg != "") {

        if (errType == "E" && errLogMsg != "") {
            var res = (logMsg, errLogMsg, errType);
            if(checkActivex()){ 
                if (!(fnCreateFileFF(destpath, function_id + "_MISSINGLABELS.txt", errLogMsg, false))) {
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

    var dtldQery = "WHERE LANGUAGE_CODE = '" + parent.lang + "' AND  FUNCTION_ID='INFRA' AND(( ITEM_NAME IN ('LBL_ADVANCED','LBL_RESET','LBL_QRY_QUERY','LBL_REFRESH','LBL_RESULT','LBL_MAKERID','LBL_CHECKER_ID','LBL_MAKER_DT_STAMP','LBL_CHECKER_DT_STAMP','LBL_RECORD_STAT','LBL_AUTHORISATION_STATUS','LBL_A','LBL_SUMMARY_U','LBL_UN_AUTH_FLG','LBL_O','LBL_OPEN','LBL_C','LBL_CLOSED','LBL_EXIT','LBL_OK','LBL_CANCEL','LBL_FIELDS','LBL_OPERATOR','LBL_VALUE','LBL_AND','LBL_CLEAR_QUERY','LBL_ORDER_BY','LBL_ASCENDING','LBL_DESCENDING','LBL_ACCEPT','LBL_TO','LBL_OR','LBL_SEARCH','LBL_RECORDS_PER_PAGE','LBL_GOTO_PAGE','LBL_OF','LBL_AUTHORIZED','LBL_INPUT_BY','LBL_AUTH_BY','LBL_DATE_TIME','LBL_MOD_NO','LBL_OPEN','LBL_CONTRACT_STATUS','LBL_PAYMENT_STATUS','LBL_COLLECTION_STATUS','LBL_DEAL_STATUS','LBL_PROCESS_STATUS','LBL_REVERSAL','LBL_REMARKS','LBL_AUDIT','LBL_PRIORITY_AUDIT','LBL_HIGH','LBL_NORMAL','LBL_SHOWERR','LBL_REMARKS','LBL_GETPRIORITY','LBL_SUM_LOCK','LBL_CHECKBOX_YES','LBL_CHECKBOX_NO','LBL_INFRA_MANDATORY','LBL_NOSCRIPT_LABEL','LBL_SUMMARY','LBL_EXPAND_GROUP','LBL_LIST_OF_VALUES','LBL_INFRA_PREVIOUS','LBL_NEXT','LBL_FIRST','LBL_LAST','LBL_ADDROW','LBL_DELETEROW','LBL_SINGLE_REC_VIEW','LBL_LOCK','LBL_COLUMNS','LBL_NARRATIVE','LBL_SELECT_ALL_ROWS','LBL_REJECT','LBL_EXPORT') ))"
    lblDesc = fnDtldLables(dtldQery);
    var params = new Array();
    params["screen"] = screenName;
    params["imgPath"] = 'Images/ExtFlexblue';
    params["uiXML"] = function_id;
    params["displaySize"] = '800';
    params["thirdChar"] = '';
    params["XslLabels"] = lblDesc;
    params["applicationName"] = 'Flexcube';
    params["functionId"] = function_id;
    params["fetchSize"] = '5';
    params["scrTitle"] = selectSingleNode(xmlDoc, ("//SCREEN[@NAME = '" + screenName + "']")).getAttribute("TITLE");
    html = transform(xmlDoc, xslDoc, params);
    return html;
}

function fnSummaryLables(query) {
    var labels = "";
    radFlname = function_id + "_RAD.xml";
    var radReqDOM = parent.buildRADXml();

    try {
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R015" + parent.gBodySeparator + query, "RADClientHandler");
    }
    catch (e) {
        try {
            var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R015" + parent.gBodySeparator + query, "RADClientHandler");
        }
        catch (e) {
            log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Failed in Getting Label Desc for Old Radxml ..\n";
            failedFiles = failedFiles + 1;
            return;
        }

    }

    var responseXML = response;
    var error = selectSingleNode(responseXML, "/ROOT/ERROR");

    if (error != null) {

        return xmlDoc;
    }

    var labelCodes = getNodeText(selectSingleNode(responseXML, "/ROOT/LABEL_CODES")).split("~");

    var labelTexts = getNodeText(selectSingleNode(responseXML, "/ROOT/LABEL_TEXTS")).split("~");
    for (var lbc = 0;lbc < labelCodes.length;lbc++) {
        labels += "@@" + labelCodes[lbc] + "~~" + labelTexts[lbc];
    }
    return labels;
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
    controlstr = fngetControlStrings(func_Id);
	var queryinfra ="CSTBITEMDESC";
    // var queryinfra = "FETCH@select item_desc from cstb_item_desc where
	// item_name in ('LBL_ENTR_QUERY','LBL_NEW') AND
	// laNguage_CODE='"+parent.lang+"' AND FUNCTION_ID='INFRA'";
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
catch (e){
		multRec = response1.substring(9, response1.indexOf("</Records>")).split(">");
	 }
    toolbarHtml+="<li id=\"New\" class=\"BTNIconNew\"><a href=\"#\" class=\"TBitem\">"+multRec[1] +"</a></li>";
    toolbarHtml+="<li id=\"EnterQuery\" class=\"BTNIconEnterQuery\"><a href=\"#\" class=\"TBitem\">"+multRec[0] +"</a></li>";    
    toolbarHtml+="</ul></div>";
    return toolbarHtml;
}

function fngetControlStrings(func_Id) {

    var tmpReqType = parent.gReqType;
    var tmpReqcode = parent.gReqCode;
	var queryString ="CONTROLSTRING";
   // var queryString = "FETCH@SELECT Control_STRING FROM Smtb_MENU WHERE
	// FUNCTION_ID= '" + func_Id + "'";
	var WhereString = "WHERE FUNCTION_ID= '" + func_Id + "'";
    parent.gReqType = "APP";
    parent.gReqCode = parent.gAction;
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);	
	setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
    var multRec = "";
    try {
        multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
    }
    catch (e) {
        multRec = response.substring(9, response.indexOf("</Records>")).split(">");
    }
    parent.gReqType = tmpReqType;
    parent.gReqCode = tmpReqcode;
    return multRec[0];
}

function generateHTML(html, destpath, screen, tabId, scrTitle, resCls, func_Id, winType, lngCss) {
    var innderHtml = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\">"
    innderHtml += "<html id=idHTML>";
    innderHtml += "<head>";
    innderHtml += "<title>'" + scrTitle + "' </title>";
    innderHtml += "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">";
    innderHtml += "<link type=\"text/css\" href=\"Theme/ExtFlexblue.css\" rel=\"stylesheet\"></link>";
    innderHtml += "<link type=\"text/css\" href=\"Theme/Ext" + lngCss + ".css\" rel=\"stylesheet\"></link>";
    innderHtml += "<link type=\"text/css\" href=\"Theme/ExtBROWSER_IE.css\" rel=\"stylesheet\"></link>";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/ExtTabContent.js\"></script>";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/RadPreview.js\"></script>";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/RADPreviewHelp.js\"></script>";
    innderHtml += "</head>";
    innderHtml += "<body  onload=\"getFuncid('" + func_Id + "');expandcontent('" + tabId + "')\">";
    innderHtml += "<div class=\"WNDcontainer frames\" id=\"DIVWNDContainer\">";
    innderHtml += "<div class=\"WNDtitlebar\" id=\"WNDtitlebar\" onmousedown=\"startDrag('212566', event)\">";
    innderHtml += "<div class=\"WNDtitle\" id=\"wndtitle\">";
    innderHtml += "<b class=\"BTNicon\"> <span class=\"ICOflexcube\"></span></b>";
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

function generateHTMLOld(html, destpath, screen, tabId, scrTitle, resCls, func_Id, winType, lngCss, xml) {

    var innderHtml = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\">"
    innderHtml += "<html id=idHTML>";
    innderHtml += "<head>";
    innderHtml += "<title>'" + scrTitle + "' </title>";
    innderHtml += "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">";
    innderHtml += " <link type=\"text/css\" href=\"Theme/Flexblue.css\" rel=\"stylesheet\">";
    innderHtml += "<link type=\"text/css\" href=\"Theme/" + lngCss + ".css\" rel=\"stylesheet\">";
    innderHtml += "<link type=\"text/css\" href=\"Theme/BROWSER_IE.css\" rel=\"stylesheet\">";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/ExtTabContent.js\"></script>";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/RadPreview.js\"></script>";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/RADPreviewHelp.js\"></script>";
    innderHtml += "</head>";
    innderHtml += "<body onload=\"getFuncid('" + func_Id + "');expandcontent('" + tabId + "')\">";
    innderHtml += "<div class=\"WNDcontainer frames\" id=\"DIVWNDContainer\">";
    innderHtml += "<div class=\"WNDtitlebar\" id=\"WNDtitlebar\" onmousedown=\"startDrag('212566', event)\">";
    innderHtml += "<div class=\"WNDtitle\" id=\"wndtitle\">";
    innderHtml += " <b class=\"BTNicon\"> <span class=\"ICOflexcube\"></span></b>";
    innderHtml += "<h1 class=\"WNDtitletxt\">" + scrTitle + " </h1> </div>";
    innderHtml += "<div class=\"WNDbuttons\"><a class=\"WNDcls\" href=\#\" onblur=\"this.className='WNDcls'\" onmouseover=\"this.className='WNDclsH'\" onfocus=\"this.className='WNDclsH'\" onmouseout=\"this.className='WNDcls'\" title=\"Close\" onclick=\"if(this.disabled) return false; fnExit(event); event.cancelBubble = true; event.returnValue = false;\"></a><a class=\"WNDmin\" href=\"#\" onblur=\"this.className='WNDmin'\" onmouseover=\"this.className='WNDminH'\" onfocus=\"this.className='WNDminH'\" onmouseout=\"this.className='WNDmin'\" title=\"Minimize\"></a></div></DIV>"
    innderHtml += "<DIV class=\"WNDcontent " + winType + "\" id=\"DIVScrContainer\">";
    innderHtml += "<div class=\"" + resCls + "\" id=\"ResTree\">";
    if (getNodeText(selectSingleNode(xml, ("//RAD_FUNCTIONS/MAIN_SCR"))) == screen && func_Id.substring(2, 3) != 'C' && func_Id.substring(2, 3) != 'R') {
        innderHtml += fnappendToolbar(func_Id);
    }
    innderHtml += html;
    innderHtml += "</div>";
    innderHtml += "</div>";
    innderHtml += "<INPUT aria-required=\"false\" type=\"hidden\" id=\"Op\" Name=\"Op\" value=\"\">";
    innderHtml += "<INPUT aria-required=\"false\" type=\"hidden\" id=\"Authorisation\" value=\"N\">";
    innderHtml += "</body>";
    innderHtml += "</html>";
    htmlPath = destpath + "HTML\\";
    return innderHtml;
}

function generateHTMLOldSmry(html, destpath, screen, tabId, scrTitle, resCls, func_Id, winType, lngCss) {

    var innderHtml = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\">"
    innderHtml += "<html id=idHTML>";
    innderHtml += "<head>";
    innderHtml += "<title>" + scrTitle + " Label Descriptions</title>";
    innderHtml += "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">";
    innderHtml += "<link type=\"text/css\" href=\"Theme/Flexblue.css\" rel=\"stylesheet\">";
    innderHtml += "<link type=\"text/css\" href=\"Theme/" + lngCss + ".css\" rel=\"stylesheet\">";
    innderHtml += "<link href=\"Theme/Frame.css\" rel=\"stylesheet\" type=\"text/css\"/>	";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/ExtTabContent.js\"></script>";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/RadPreview.js\"></script>";
    innderHtml += "<script language=\"JavaScript\" src=\"Script/JS/RADPreviewHelp.js\"></script>";
    innderHtml += "</head>";
    innderHtml += "<body  onload=\"getFuncid('" + func_Id + "');expandcontent('" + tabId + "')\">";
    innderHtml += "<Form class=\"form1\" name=\"MainForm\">";
    innderHtml += "<div class=\"WNDcontainer frames\" id=\"DIVif3\">";
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
    innderHtml += "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">";
    innderHtml += " <link type=\"text/css\" href=\"Theme/ExtFlexblue.css\" rel=\"stylesheet\">";
    innderHtml += "<link type=\"text/css\" href=\"Theme/Ext" + lngCss + ".css\" rel=\"stylesheet\">";
    innderHtml += "<link type=\"text/css\" href=\"Theme/ExtBROWSER_IE.css\" rel=\"stylesheet\">	";
    innderHtml += "<link type=\"text/css\" href=\"Theme/dash.css\" rel=\"stylesheet\">	";
    innderHtml += "</head>";
    innderHtml += "<body>";
    innderHtml += "<fieldset id=\"containerFldset\" class=\"FSTcell\">";
    innderHtml += html;
    innderHtml += "</fieldset>";
    innderHtml += "</body>";
    innderHtml += "</html>";
    return innderHtml;
}

function ShowPreviewForOldRadXml(xslName, engxml, screenName) {
    var html = "";
    var xslProc;
    var xslDoc = "";
    xslDoc = loadXSLFile(xslName);
    var xmlDoc = "";
    xmlDoc = engxml;
    radFlname = function_id + "_RAD.xml";
    var scrNode = selectSingleNode(xmlDoc, "//SCREEN[@NAME = '" + screenName + "']");
    var appName = 'FCJ';
    var langCode = document.getElementById("LANG_CODE").value;
    var detaildLblQry = "WHERE LANGUAGE_CODE = '" + langCode + "' AND FUNCTION_ID='INFRA'  AND  ((Item_Name IN  ('LBL_INPUT_BY', 'LBL_AUTH_BY', 'LBL_DATE_TIME', 'LBL_MOD_NO', 'LBL_OPEN', 'LBL_AUTHORIZED', 'LBL_CONTRACT_STATUS', 'LBL_PAYMENT_STATUS','LBL_COLLECTION_STATUS', 'LBL_DEAL_STATUS', 'LBL_PROCESS_STATUS', 'LBL_REVERSAL', 'LBL_EXIT', 'LBL_CANCEL', 'LBL_OK', 'LBL_REMARKS',     'LBL_AUDIT', 'LBL_ACCEPT', 'LBL_OF', 'LBL_PRIORITY_AUDIT', 'LBL_HIGH', 'LBL_NORMAL', 'LBL_SHOWERR', 'LBL_REMARKS', 'LBL_GETPRIORITY',        'LBL_AUDIT', 'LBL_INFRA_MANDATORY', 'LBL_COLLAPSED', 'LBL_ADDROW', 'LBL_DELETEROW', 'LBL_SINGLE_REC_VIEW', 'LBL_NOSCRIPT_LABEL',        'LBL_GATEWAY_BROWSER', 'LBL_SELECT_ALL_ROWS', 'LBL_TASKLIST') ))";
    var radReqDOM = parent.buildRADXml();
    try {
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R015" + parent.gBodySeparator + detaildLblQry, "RADClientHandler");
    }
    catch (e) {
        try {
            var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R015" + parent.gBodySeparator + detaildLblQry, "RADClientHandler");
        }
        catch (e) {
            log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Failed in Getting Label Desc for Old Radxml ..\n";
            failedFiles = failedFiles + 1;
            return;
        }

    }

    var responseXML = response;
    var error = selectSingleNode(responseXML, "/ROOT/ERROR");
    if (error != null) {
        return xmlDoc;
    }

    var labelCodesD = getNodeText(selectSingleNode(responseXML, "/ROOT/LABEL_CODES")).split("~");
    var labelTextsD = getNodeText(selectSingleNode(responseXML, "/ROOT/LABEL_TEXTS")).split("~");

    var lablDesc = new Array();
    for (var lbld = 0;lbld < labelCodesD.length;lbld++) {
        lablDesc[labelCodesD[lbld]] = labelTextsD[lbld];
    }
    var smryQry = "WHERE LANGUAGE_CODE = '" + langCode + "' AND FUNCTION_ID='INFRA'  AND  ((Item_Name IN  ('LBL_EXPORT','LBL_ADVANCED','LBL_RESET','LBL_QRY_QUERY','LBL_REFRESH','LBL_RESULT','LBL_MAKERID','LBL_CHECKER_ID','LBL_MAKER_DT_STAMP','LBL_CHECKER_DT_STAMP','LBL_RECORD_STAT','LBL_AUTHORISATION_STATUS','LBL_A','LBL_SUMMARY_U','LBL_UN_AUTH_FLG','LBL_O','LBL_OPEN','LBL_C','LBL_CLOSED','LBL_EXIT','LBL_OK','LBL_CANCEL','LBL_FIELDS','LBL_OPERATOR','LBL_VALUE','LBL_AND','LBL_ACCEPT','LBL_CLEAR_QUERY','LBL_ORDER_BY','LBL_ASCENDING','LBL_DESCENDING','LBL_ACCEPT','LBL_TO','LBL_OR','LBL_SEARCH','LBL_RECORDS_PER_PAGE','LBL_GOTO_PAGE','LBL_OF','LBL_AUTHORIZED','LBL_CALENDAR','LBL_NARRATIVE','LBL_LIST_OF_VALUES','LBL_INFRA_PREVIOUS','LBL_NEXT','LBL_FIRST','LBL_LAST','LBL_NOSCRIPT_LABEL','LBL_INFRA_ADVANCED','LBL_RECORDS','LBL_ADVANCED_SUMMARY','LBL_SUMMARY') ))";
    var summaryLabels = fnSummaryLables(smryQry);
    var params = new Array();
    params["langCode"] = langCode;
    params["containerId"] = function_id;
    params["screen"] = screenName;
    params["isChildFunc"] = "N";
    params["funcId"] = function_id;
    params["paginationReq"] = "N"
    params["priority"] = lablDesc["LBL_PAYMENT_STATUS"];
    params["high"] = lablDesc["LBL_HIGH"];
    params["normal"] = lablDesc["LBL_NORMAL"];
    params["showErr"] = lablDesc["LBL_SHOWERR"];
    params["remarks"] = lablDesc["LBL_REMARKS"];
    params["getPriority"] = lablDesc["LBL_GETPRIORITY"];
    params["audit_au"] = lablDesc["LBL_AUDIT"];
    params["typeString"] = "M";
    params["imgPath"] = "Images/Flexblue";
    params["makerId"] = lablDesc["LBL_INPUT_BY"];
    params["checkerId"] = lablDesc["LBL_AUTH_BY"];
    params["DtStamp"] = lablDesc["LBL_DATE_TIME"];
    params["modNo"] = lablDesc["LBL_MOD_NO"];
    params["recStat"] = lablDesc["LBL_OPEN"];
    params["authStat"] = lablDesc["LBL_AUTHORIZED"];
    params["contractStat"] = lablDesc["LBL_CONTRACT_STATUS"];
    params["paymentStat"] = lablDesc["LBL_PAYMENT_STATUS"];
    params["collectionStat"] = lablDesc["LBL_COLLECTION_STATUS"];
    params["dealStat"] = lablDesc["LBL_DEAL_STATUS"];
    params["processStat"] = lablDesc["LBL_PROCESS_STATUS"];
    params["reversal"] = lablDesc["LBL_REVERSAL"];
    params["exit"] = lablDesc["LBL_EXIT"];
    params["cancel"] = lablDesc["LBL_CANCEL"];
    params["ok"] = lablDesc["LBL_OK"];
    params["displaySize"] = '254';
    params["audit"] = lablDesc["LBL_AUDIT"];
    params["accept"] = lablDesc["LBL_ACCEPT"];
    params["vernoOfLbl"] = lablDesc["LBL_OF"];
    params["mandatory"] = lablDesc["LBL_INFRA_MANDATORY"];
    params["collapsed"] = lablDesc["LBL_COLLAPSED"];
    params["add_row"] = lablDesc["LBL_ADDROW"];
    params["delete_row"] = lablDesc["LBL_DELETEROW"];
    params["single_rec_view"] = lablDesc["LBL_SINGLE_REC_VIEW"];
    params["noScript"] = lablDesc["LBL_NOSCRIPT_LABEL"];
    params["gateway_browser"] = lablDesc["LBL_GATEWAY_BROWSER"];
    params["select_all_rows"] = lablDesc["LBL_SELECT_ALL_ROWS"];
    params["taskList"] = lablDesc["LBL_TASKLIST"];
    params["summaryLabels"] = summaryLabels;
    params["applicationName"] = "FCUBS";
    params["oldTheme"] = 'Theme';
    if (parent.dataXmlFlg == 'Y') {
        var footerDesc = new Array();
        footerDesc = getFooterDetails();
        params["maker"] = footerDesc['MAKER'];
        params["makertime"] = footerDesc['MAKERTIME'];
        params["checker"] = footerDesc['CHECKER'];
        params["checkertime"] = footerDesc['CHECKERTIME'];
        params["modid"] = footerDesc['MODNO'];
        params["authstatus_d"] = footerDesc['AUTHSTAT'];
        params["txnstati"] = footerDesc['TXNSTATI'];
    }

    html = transform(xmlDoc, xslDoc, params);

    return html;
}

function initCap(str) {
    var words = str.split(" ");
    var string = "";
    for (var i = 0;i < words.length;i++) {
        words[i] = words[i].substring(0, 1).toUpperCase() + words[i].substring(1, words[i].length).toLowerCase();
    }
    return words.join(" ");
}

function replaceAll(str, searchChar, replaceChar) {
    var retStr = "";
    for (var loopIndex = 0;loopIndex < str.length;loopIndex++) {
        if (str.substr(loopIndex, 1) == searchChar)
            retStr += replaceChar;
        else 
            retStr += str.substr(loopIndex, 1);
    }
    return retStr;
}

function LoadxmlBULK() {
    document.formb.action = "UploadFileToServer?USER_NAME=" + parent.username;
    document.formb.submit();
}

function fnIterateFiles(subfldr, fileName, destpath, Datscr, radReqDOM, type, tblObj) {
    if (fileName.indexOf("_RAD") !=  - 1) {
        NewDOM = javaBulkReadFile(filePathsArry[fileName], "");
        if (NewDOM == null) {
            log += filePathsArry[fileName] + "\t\t\t\t\t  Failed \t\t\t\t File Not Found...\n";
            fnShowResult(tblObj, fileName, subfldr, 'N', "File Not Found..\n");
            return;
        }
        if (NewDOM == false) {
            log += filePathsArry[fileName] + "\t\t\t\t\t  Failed \t\t\t\t File Not Found...\n";
            failedFiles = failedFiles + 1;
            fnShowResult(tblObj, fileName, subfldr, 'N', "File Not Found..\n");
            return;
        }
        else {
            NewDOM = loadXMLDoc(NewDOM);
        }

        if (!NewDOM) {
            log += filePathsArry[fileName] + "\t\t\t\t\t Failed \t\t\t\t Invalid RadXml...\n";
            fnShowResult(tblObj, fileName, subfldr, 'N', "Invalid RadXml..\n");
            failedFiles = failedFiles + 1;
            return false;
        }
        if (!selectSingleNode(NewDOM, "RAD_FUNCTIONS")) {
            log += filePathsArry[fileName] + "\t\t\t\t\t Failed \t\t\t\t Invalid RadXml...\n";
            fnShowResult(tblObj, fileName, subfldr, 'N', "Invalid RadXml..\n");
            failedFiles = failedFiles + 1;
            return false;
        }

        try {
            if (destpath.substring(destpath.length - 1, destpath.length) != "\\") {
                destpath = destpath + "\\";
            }
        }
        catch (e) {
        }

        if (tool == "NEW") {

            var resn = fnGenXml(NewDOM, fileName, destpath, '', Datscr, subfldr, radReqDOM, type, tblObj);
            if (resn == false) {
                return false;
            }
        }

        if (tool == "OLD") {
            var reso = fnGenOldXml(NewDOM, fileName, destpath, calFrmPath, subfldr, radReqDOM, type, tblObj);
            if (reso == false) {
                return false;
            }
        }

        if (tool == "BOTH") {
            debugLog += "Before Calling the fnGenXml \n";
            if (selectNodes(NewDOM, "RAD_FUNCTIONS/RAD_KERNEL").length > 0) {
                var resn = fnGenXml(NewDOM, fileName, destpath, '', Datscr, subfldr, radReqDOM, type, tblObj);
                if (resn == false) {
                    return false;
                }
                debugLog += "After  Calling the fnGenXml \n";
            }

            if (selectNodes(NewDOM, "RAD_FUNCTIONS/RAD_KERNEL").length == 0) {
                debugLog += "Before Calling the fnGenOldXml \n";
                var reso = fnGenOldXml(NewDOM, fileName, destpath, calFrmPath, subfldr, radReqDOM, type, tblObj);
                if (reso == false) {
                    return false;
                }
                debugLog += "After  Calling the fnGenOldXml \n";
            }
        }

    }
}

function fnGetCallformContents(NewDOM, subFldrName, tblObj) {
    var callformContents = "";
    var callforms = selectNodes(NewDOM, "//RAD_CALLFORM");
    var callformRadXml;
    var callfrmPth = "";
    var radFlname = (function_id + "_RAD.xml");
    for (var callformCnt = 0;callformCnt < callforms.length;callformCnt++) {
        var callform = callforms[callformCnt];
        var callformFuncId = getNodeText(selectSingleNode(callform, "CALLFORM_FUCNTIONID"));
        var callformRadXmlFile = (callformFuncId + "_RAD.xml");
        if (filePathsArry[callformRadXmlFile] != undefined) {
            if (filePathsArry[callformRadXmlFile].indexOf("--") !=  - 1) {
                callfrmPth = filePathsArry[callformRadXmlFile];
                callfrmPth = callfrmPth.replace("--", "");
            }
            else {
                callfrmPth = filePathsArry[callformRadXmlFile];
            }
            var callformRadXml = javaBulkReadFile(callfrmPth, "");
        }
        else {
            fnShowResult(tblObj, radFlname, subFldrName, 'N', "Callforms Not Available");
            log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Callforms Not Found...\n";
            failedFiles = failedFiles + 1;
            return false;
        }
        if (callformRadXml == false) {
            fnShowResult(tblObj, radFlname, subFldrName, 'N', "Callforms Not Available");
            log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Callforms Not Found...\n";
            failedFiles = failedFiles + 1;
            return false;
        }
        var callformRadXml = loadXMLDoc(callformRadXml);
        try {
            var calformType = getNodeText(selectSingleNode(callformRadXml, "//RAD_FUNCTIONS//FUNCTION_TYPE"));
            callformRadXml = fnPrepareConsolDOM(callformRadXml, callformFuncId, calformType, "LOAD");
            callformRadXml = getXMLString(callformRadXml);
        }
        catch (e) {
            callformRadXml = getXMLString(callformRadXml);
        }
        callformContents += callformRadXml;
        if (callformCnt != callforms.length - 1)
            callformContents += "--END OF RAD XML --";
    }

    return callformContents;
}

function loadRADXMLData(obj) {
    var radXml = javaBulkReadFile(document.getElementsByName(obj)[0].value, "");
    xmlFileList = radXml;
}

function fnTransOldForBlkUpld(radXML, xslName) {
    var xslProc;
    var xslt = "";
    var xslDoc = "";
    xslDoc = loadXSLFile(xslName);
    var xmlDoc = ""
    xmlDoc = radXML;
    xslPro = transform(xmlDoc, xslDoc, "");
    return xslPro;
}

function fnGetLableXml_Old(NewDOM, function_id, radReqDOM) {
    debugLog += "Before Calling the fnTransOldForBlkUpld \n";
    var xml = fnTransOldForBlkUpld(NewDOM, "XSLold/2oldXML.xsl");
    debugLog += "After Calling the fnTransOldForBlkUpld \n";
    if (navigator.appName != navAppName()) {
        var uixmlcontent = translateUIXML_Old(loadXMLDoc(getXMLString(xml)), "LBLS");
    }
    else {
        var uixmlcontent = translateUIXML_Old(loadXMLDoc(xml), "LBLS");
    }
    var newel = fnRtnLabls(getXMLString(uixmlcontent), radReqDOM);
    debugLog += "After Calling the fnRtnLabls \n";
    return newel;
}

function brachHtml(xmlDoc) {
    var xmlDOMtest1;
    var xmlDOMfile2;
    var arr2 = new Array();
    var i = selectNodes(xmlDoc, "//FORM/SCREEN/CALLFORMS/FORM").length;
    var fid = selectNodes(xmlDoc, "//FORM/SCREEN/CALLFORMS/FORM/FUNCTION").length;
    if (fid > 0) {
        for (var loopIndex = 0;loopIndex < i;loopIndex++) {
            xmlDOMtest1 = selectNodes(xmlDoc, "//FORM/SCREEN/CALLFORMS/FORM")[loopIndex];
            arr2[loopIndex] = new Array();
            arr2[loopIndex]["SEQ"] = selectNodes(xmlDoc, "//FORM/SCREEN/CALLFORMS/FORM")[loopIndex].getAttribute("SEQ");
            arr2[loopIndex]["DISP_TAB"] = getNodeText(selectSingleNode(xmlDOMtest1, "DISP_TAB"));
            arr2[loopIndex]["DISP_TYPE"] = getNodeText(selectSingleNode(xmlDOMtest1, "DISP_TYPE"));
            arr2[loopIndex]["FUNCTION"] = getNodeText(selectSingleNode(xmlDOMtest1, "FUNCTION"));
        }
        for (var loopIndex = 0;loopIndex < arr2.length;loopIndex++) {
            if (arr2[loopIndex]["DISP_TYPE"] == 'TAB') {
                xmlDOMfile2 = callFrmUiXml[arr2[loopIndex]["FUNCTION"]];
                var secNodes = selectNodes(loadXMLDoc(xmlDOMfile2), "//SCREEN/BODY/TAB[@ID = '" + arr2[loopIndex]["DISP_TAB"] + "']/SECTION");
                for (var secCnt = 0;secCnt < secNodes.length;secCnt++) {
                    if (selectSingleNode(xmlDoc, "//SCREEN/BODY/TAB[@ID = '" + arr2[loopIndex]["DISP_TAB"] + "']"))
                        selectSingleNode(xmlDoc, "//SCREEN/BODY/TAB[@ID = '" + arr2[loopIndex]["DISP_TAB"] + "']").appendChild(getCloneDocElement(secNodes[secCnt]));
                }
            }
        }
    }
    return xmlDoc;
}

function fnModifyMISXml(arrMIS) {
    var currXml = loadXMLFile("UIXML/" + langCode + "/" + arrMIS["FUNCTION"] + ".xml");
    var partNodes = selectNodes(currXml, "//PART");
    var recMIS = getNodeText(selectSingleNode(fcjResponseDOM, "//REC[@TYPE = 'BLK_MIS_DETAILS']/FV")).split("~");
    for (var i = 0;i < partNodes.length - 2;i++) {
        var fldNodes = selectNodes(partNodes[i + 2], "FLDSET/FIELD");
        for (var j = 0;j < fldNodes.length;j++) {
            setNodeText(selectSingleNode(fldNodes[j], "LBL"), recMIS[i * fldNodes.length + j]);
        }
    }
    return currXml;
}

function fnMakeStdBtnBlkHTML(xml) {
    var uixml = "";
    uixml = loadXMLDoc(getXMLString(xml));
    if (navigator.appName == navAppName()) {
        var scrNodes = selectNodes(uixml, "//SCREEN[@NAME != 'SUMMARY']");

        for (var scrCnt = 0;scrCnt < scrNodes.length;scrCnt++) {
            var scrNode = scrNodes[scrCnt];
            var scrName = scrNodes[scrCnt].getAttribute("NAME");
            var stdBtnImgBlk = selectSingleNode(uixml, "//BLOCK[@SCREEN = '" + scrName + "' and ID = 'BLK_STD_BUTTONS_IMG']");
            if (!stdBtnImgBlk) {
                var stdBtnNodes = selectNodes(uixml, "//BLOCK[@SCREEN = '" + scrName + "' and ID != 'BLK_STD_BUTTONS_IMG']/FIELD[NAME = 'BTN_OK' or NAME = 'BTN_EXIT']");
                if (stdBtnNodes.length > 0) {
                    var stdBtnBlkNode = xml.createElement("BLOCK");
                    var blkIdNode = xml.createElement("ID");
                    setNodeText(blkIdNode, 'BLK_STD_BUTTONS_IMG');
                    stdBtnBlkNode.appendChild(blkIdNode);
                    var scrName = "CVS_MAIN";
                    for (var btnCnt = 0;btnCnt < stdBtnNodes.length;btnCnt++) {
                        var btnNode = stdBtnNodes[btnCnt];
                        scrName = btnNode.parentNode.getAttribute("SCREEN");
                        if (scrName == 'SUMMARY')
                            continue;
                        stdBtnBlkNode.appendChild(btnNode.cloneNode(true));
                        btnNode.parentNode.removeChild(btnNode);
                    }
                    stdBtnBlkNode.setAttribute("SCREEN", scrName);
                    stdBtnBlkNode.setAttribute("TYPE", "Single Entry");
                    selectSingleNode(uixml, "//FORM").appendChild(stdBtnBlkNode);
                }
            }
        }
    }
    else {
        var scrNodes = selectNodes(uixml, "//SCREEN[@NAME != 'SUMMARY']");

        for (var scrCnt = 0;scrCnt < scrNodes.length;scrCnt++) {
            var scrNode = scrNodes[scrCnt];
            var scrName = scrNodes[scrCnt].getAttribute("NAME");
            var stdBtnImgBlk = selectSingleNode(uixml, "//BLOCK[@SCREEN = '" + scrName + "' and id = 'BLK_STD_BUTTONS_IMG']");
            if (!stdBtnImgBlk) {
                var stdBtnNodes = selectNodes(uixml, "//BLOCK[@SCREEN = '" + scrName + "' and id != 'BLK_STD_BUTTONS_IMG']/FIELD[NAME = 'BTN_OK' OR NAME = 'BTN_EXIT']");
                if (stdBtnNodes.length > 0) {
                    var stdBtnBlkNode = xml.createElement("block");
                    var blkIdNode = xml.createElement("id");
                    blkIdNode.text = 'BLK_STD_BUTTONS_IMG';
                    stdBtnBlkNode.appendChild(blkIdNode);
                    var scrName = "CVS_MAIN";
                    for (var btnCnt = 0;btnCnt < stdBtnNodes.length;btnCnt++) {
                        var btnNode = stdBtnNodes[btnCnt];
                        scrName = btnNode.parentNode.getAttribute("screen");
                        if (scrName == 'SUMMARY')
                            continue;
                        stdBtnBlkNode.appendChild(btnNode.cloneNode(true));
                        btnNode.parentNode.removeChild(btnNode);
                    }
                    stdBtnBlkNode.setAttribute("screen", scrName);
                    stdBtnBlkNode.setAttribute("type", "Single Entry");
                    selectSingleNode(uixml, "//FORM").appendChild(stdBtnBlkNode);
                }
            }
        }
    }
    return uixml;
}

function fnGetTabAllHgtHTML(xml) {
    var uixml = "";
    uixml = xml;
    var scrNodes = selectNodes(uixml, "/FORM/SCREEN");
    for (var scrCnt = 0;scrCnt < scrNodes.length;scrCnt++) {
        var scrNode = scrNodes[scrCnt];
        var scrName = scrNode.getAttribute("NAME");
        if (scrName != 'SUMMARY') {
            var fldInTabAllCnt = 0;
            var blocksInTabAllCnt = selectNodes(uixml, "/FORM/BLOCK[id != 'BLK_STD_BUTTONS_IMG' and @SCREEN = '" + scrName + "']");
            if (blocksInTabAllCnt.length > 0)
                for (var blkCnt = 0;blkCnt < blocksInTabAllCnt.length;blkCnt++) {
                    var blkType = blocksInTabAllCnt[blkCnt].getAttribute("type");
                    if (blkType != 'Multiple Entry') {
                        var fldNodes = selectNodes(blocksInTabAllCnt[blkCnt], "field[@tabpage = 'All']");
                        if (fldNodes.length > 0) {
                            fldInTabAllCnt++;
                            break;
                        }
                    }
                    else {
                        if (blocksInTabAllCnt[blkCnt].getAttribute("tabpage") == 'All') {
                            fldInTabAllCnt++;
                            break;
                        }
                    }
                }
            if (fldInTabAllCnt > 0) {
                var tabAllNode = uixml.createElement("tabpage_all");
                tabAllNode.setAttribute("height", "75");
                var labelNode = uixml.createElement("label");
                setNodeText(labelNode, 'All');
                tabAllNode.appendChild(labelNode);
                selectSingleNode(uixml, "/FORM/SCREEN[@NAME = '" + scrName + "']").appendChild(tabAllNode);
            }
            else {
                var tabAllNode = uixml.createElement("tabpage_all");
                tabAllNode.setAttribute("height", "0");
                var labelNode = uixml.createElement("label");
                setNodeText(labelNode, 'All');
                tabAllNode.appendChild(labelNode);
                selectSingleNode(uixml, "/FORM/SCREEN[@NAME = '" + scrName + "']").appendChild(tabAllNode);
            }
        }
    }
    return uixml;
}

function fnGetBranchCallFrms(xml, tblObj) {
    var calfrms = selectNodes(xml, ("//RAD_CALLFORM"));
    var clfUixml = "";
    var callfrmPth = "";
    var radFlname = (function_id + "_RAD.xml");
    for (var callformCnt = 0;callformCnt < calfrms.length;callformCnt++) {
        var callform = calfrms[callformCnt];
        var callformFuncId = getNodeText(selectSingleNode(callform, "CALLFORM_FUCNTIONID"));
        var callformRadXmlFile = (callformFuncId + "_RAD.xml");
        if (filePathsArry[callformRadXmlFile] != undefined) {
            if (filePathsArry[callformRadXmlFile].indexOf("--") !=  - 1) {
                callfrmPth = filePathsArry[callformRadXmlFile];
                callfrmPth = callfrmPth.replace("--", "");
            }
            else {
                callfrmPth = filePathsArry[callformRadXmlFile];
            }
            var callformRadXml = javaBulkReadFile(callfrmPth, "");
            callformRadXml = loadXMLDoc(callformRadXml);
            funcType = getNodeText(selectSingleNode(callformRadXml, ("//RAD_FUNCTIONS/FUNCTION_TYPE")));
            action = getNodeText(selectSingleNode(callformRadXml, ("//RAD_FUNCTIONS/ACTION")));
            callformRadXml = fnSetCallFrmID(callformRadXml);
            callformRadXml = ApplyreleaseChanges(callformRadXml, callformFuncId, funcType, action);
            callformRadXml = TemproaryToModifyActions(callformRadXml);
            callformRadXml = fnPrepareConsolDOM(callformRadXml, callformFuncId, funcType, action);
            callformRadXml = fn_Reset_BlkFld_FldSets(callformRadXml);
            clfUixml = transformDOMtoUIxml(callformRadXml);
            clfUixml = fnSaveEngXml('', clfUixml, "true", callformFuncId, parent.lang, parent.jndiName);
            callFrmUiXml[callformFuncId] = clfUixml;
        }
        else {
            fnShowResult(tblObj, radFlname, "", 'N', "Callforms Not Available");
            log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Callforms Not Found...\n";
            failedFiles = failedFiles + 1;
            return false;
        }
        if (!callformRadXml) {
            fnShowResult(tblObj, radFlname, "", 'N', "Callforms Not Available");
            log += filePathsArry[radFlname] + "\t\t\t\t\t Failed \t\t Callforms Not Found...\n";
            failedFiles = failedFiles + 1;
            return false;
        }
        callformContents += callformRadXml;
        if (callformCnt != calfrms.length - 1)
            callformContents += "--END OF RAD XML --";
    }
    return callFrmUiXml;
}

function replaceEmbeddedXML(xmlDoc) {

    var xslDetailed = "";
    xslDetailed = loadXSLFile("Templates/ExtXSL/EmbedXML.xsl");
    xmlString = transform(xmlDoc, xslDetailed, "");
    return xmlString;
}

function prepareDataUIXML(dataxml, puixml) {
    var partionNode = new Array();
    partionNode[0] = 'HEADER';
    partionNode[1] = 'BODY';
    partionNode[2] = 'FOOTER';
    var l_screen = selectNodes(puixml, "//SCREEN");

    for (var s = 0;s < l_screen.length;s++) {

        var l_ScreenId = l_screen[s].getAttribute("NAME");
        for (var p = 0;p < partionNode.length;p++) {
            var l_tab = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB");
            for (var a = 0;a < l_tab.length;a++) {

                var l_TabName = l_tab[a].getAttribute("ID");

                var l_section = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION");

                for (i = 0;i < l_section.length;i++) {
                    var NodeName = l_section[i].getAttribute("ID");
                    var l_part = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART");
                    for (j = 0;j < l_part.length;j++) {
                        var partNodeName = l_part[j].getAttribute("ID");
                        var l_fldset = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET");
                        for (k = 0;k < l_fldset.length;k++) {

                            var fldsetNodeName = l_fldset[k].getAttribute("ID");
                            var fldsetType = l_fldset[k].getAttribute("TYPE");
                            var blockName = getNodeText(selectSingleNode(l_fldset[k], "BLOCK"));
                            if (fldsetType != "ME") {

                                var l_fields = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD");

                                var l_count =  - 1;
                                var l_row = 'Y';
                                for (var l = 0;l < l_fields.length;l++) {

                                    var fieldName = getNodeText(selectSingleNode(l_fields[l], "NAME"));
                                    var htmlType = getNodeText(selectSingleNode(l_fields[l], "TYPE"));
                                    if (fldsetType != "ME") {
                                        var fiedValue = "";
                                        if (selectSingleNode(dataxml, "//" + blockName + "/" + fieldName) != null) {
                                            fiedValue = getNodeText(selectSingleNode(dataxml, "//" + blockName + "/" + fieldName));
                                            if (fiedValue != "") {
                                                var bodyNode = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD")[l];
                                                var tempNode = puixml.createElement("PRE_VAL");
                                                bodyNode.appendChild(tempNode);
                                                setNodeText(selectSingleNode(selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD")[l], "PRE_VAL"), fiedValue);
                                                var selectHtml = "";
                                                if (htmlType == "SELECT") {

                                                    // selectHtml =
													// selectNodes(puixml,"//SCREEN[@NAME='"
													// + l_ScreenId +
													// "']/"+partionNode[p]+"/TAB[@ID='"
													// + l_TabName +
													// "']/SECTION[@ID='" +
													// NodeName +
													// "']/PART[@ID='" +
													// partNodeName +
													// "']/FLDSET[@ID='" +
													// fldsetNodeName +
													// "']/FIELD/OPTION");
                                                    selectHtml = selectNodes((selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD")[l]), "OPTION");
                                                    for (t = 0;t < selectHtml.length;t++) {
                                                        var htmlVal = selectHtml[t].getAttribute("VALUE");
                                                        if (htmlVal == fiedValue) {
                                                            selectHtml[t].setAttribute("SELECTED", "-1");

                                                        }
                                                        else {
                                                            selectHtml[t].setAttribute("SELECTED", "0");
                                                        }
                                                    }

                                                }
                                                else if (htmlType == "RADIO") {

                                                    // selectHtml =
													// selectNodes(puixml,"//SCREEN[@NAME='"
													// + l_ScreenId +
													// "']/"+partionNode[p]+"/TAB[@ID='"
													// + l_TabName +
													// "']/SECTION[@ID='" +
													// NodeName +
													// "']/PART[@ID='" +
													// partNodeName +
													// "']/FLDSET[@ID='" +
													// fldsetNodeName +
													// "']/FIELD")[l];
                                                    selectHtml = selectNodes((selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD")[l]), "OPTION");
                                                    // var selectRadioOpt =
													// selectNodes(selectHtml,"//OPTION");
                                                    for (t = 0;t < selectHtml.length;t++) {
                                                        // var htmlVal =
														// selectHtml[t].getAttribute("VALUE");
                                                        var htmlVal = getNodeText(selectSingleNode(selectHtml[t], "VALUE"));
                                                        if (htmlVal == fiedValue) {

                                                            // selectHtml[t].setAttribute("SELECTED","-1");
                                                            setNodeText(selectSingleNode(selectHtml[t], "SELECTED"), "-1");

                                                        }
                                                        else {
                                                            // selectHtml[t].setAttribute("SELECTED","0");
                                                            setNodeText(selectSingleNode(selectHtml[t], "SELECTED"), "0");
                                                        }
                                                    }

                                                }
                                                else if (htmlType == "CHECKBOX") {
                                                    selectHtml = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD")[l];

                                                    if (fiedValue == "Y") {
                                                        setNodeText(selectSingleNode(selectHtml, "CHECKED"), "-1");
                                                    }

                                                }

                                            }
                                        }
                                    }
                                }

                            }
                            else {
                                l_dataBlock = selectNodes(dataxml, "//" + blockName);
                                var l_dataRow = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/DATA_ROWNO");
                                for (var d = 0;d < l_dataRow.length;d++) {
                                    var g_dataRow = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/DATA_ROWNO[@ID='" + d + "']/FIELD");
                                    for (var g = 0;g < g_dataRow.length;g++) {
                                        fieldName = getNodeText(selectSingleNode(g_dataRow[g], "NAME"));
                                        fiedValue = getNodeText(selectSingleNode(l_dataBlock[d], fieldName));
                                        // var bodyNode=
										// selectNodes(puixml,"//SECTION[@ID='"
										// + NodeName + "']/PART[@ID='" +
										// partNodeName + "']/FLDSET[@ID='" +
										// fldsetNodeName + "']/FIELD")[l];
                                        var bodyNode = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/DATA_ROWNO[@ID='" + d + "']/FIELD")[g];
                                        var tempNode = puixml.createElement("PRE_VAL");
                                        bodyNode.appendChild(tempNode);
                                        setNodeText(selectSingleNode(selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/DATA_ROWNO[@ID='" + d + "']/FIELD")[g], "PRE_VAL"), fiedValue);
                                    }

                                }
                            }

                        }

                    }
                }

            }
        }
    }
}

function prepareOldDataUIXML(dataxml, puixml) {

    var l_screen = selectNodes(puixml, "//BLOCK");

    for (var s = 0;s < l_screen.length;s++) {

        var l_screenTyp = l_screen[s].getAttribute("TYPE");

        if (l_screenTyp == "Single Entry") {

            var l_fields = selectNodes(l_screen[s], "FIELD");
            for (var i = 0;i < l_fields.length;i++) {

                var l_fldTyp = l_fields[i].getAttribute("TYPE");
                if (l_fldTyp == null) {

                    var fieldName = getNodeText(selectSingleNode(l_fields[i], "NAME"));
                    if (selectSingleNode(l_fields[i], "DBT") != null) {
                        var l_dbt = getNodeText(selectSingleNode(l_fields[i], "DBT"));
                        var fiedValue = "";
                        if (selectSingleNode(dataxml, "//" + l_dbt + "/" + fieldName) != null) {
                            fiedValue = getNodeText(selectSingleNode(dataxml, "//" + l_dbt + "/" + fieldName));
                            var tempNode = puixml.createElement("PRE_VAL");
                            l_fields[i].appendChild(tempNode);
                            setNodeText(selectSingleNode(l_fields[i], "PRE_VAL"), fiedValue);
                        }
                    }
                }
                else {

                    var l_fldSet = selectNodes(l_fields[i], "FIELD");

                    for (var f = 0;f < l_fldSet.length;f++) {
                        fieldName = getNodeText(selectSingleNode(l_fldSet[f], "NAME"));
                        if (selectSingleNode(l_fldSet[f], "DBT") != null) {
                            l_dbt = getNodeText(selectSingleNode(l_fldSet[f], "DBT"));
                            fiedValue = "";
                            if (selectSingleNode(dataxml, "//" + l_dbt + "/" + fieldName) != null) {
                                fiedValue = getNodeText(selectSingleNode(dataxml, "//" + l_dbt + "/" + fieldName));
                                tempNode = puixml.createElement("PRE_VAL");
                                l_fldSet[f].appendChild(tempNode);
                                setNodeText(selectSingleNode(l_fldSet[f], "PRE_VAL"), fiedValue);

                            }
                        }

                    }

                }

            }
        }
        else {
            l_fields = selectNodes(l_screen[s], "DATA_ROWNO");
            l_dbt = getNodeText(selectSingleNode(l_screen[s], "DBT"));
            l_dataBlock = selectNodes(dataxml, "//" + l_dbt);
            for (i = 0;i < l_fields.length;i++) {
                l_fldSet = selectNodes(l_fields[i], "FIELD");

                for (var f = 0;f < l_fldSet.length;f++) {
                    fieldName = getNodeText(selectSingleNode(l_fldSet[f], "NAME"));

                    fiedValue = "";

                    if (selectSingleNode(l_dataBlock[i], fieldName) != null) {
                        fiedValue = getNodeText(selectSingleNode(l_dataBlock[i], fieldName));

                        tempNode = puixml.createElement("PRE_VAL");
                        l_fldSet[f].appendChild(tempNode);
                        setNodeText(selectSingleNode(l_fldSet[f], "PRE_VAL"), fiedValue);
                    }

                }

            }

        }

    }

}

function updatedMultiRecord(dataxml, uixml) {
    var l_raddatasrc = selectNodes(uixml, "//RAD_DATASOURCES");
    for (var a = 0;a < l_raddatasrc.length;a++) {

        var l_screenTyp = l_raddatasrc[a].getAttribute("Type");
        if (l_screenTyp == "MULTIPLE") {
            l_datasrcName = getNodeText(selectSingleNode(l_raddatasrc[a], "DATASRC_NAME"));
            var l_dataBlock = selectNodes(dataxml, "//" + l_datasrcName);
            for (var z = 0;z < l_dataBlock.length;z++) {
                tempNode = uixml.createElement("DATA_ROWNO");
                l_raddatasrc[a].insertBefore(tempNode, selectSingleNode(l_raddatasrc[a], "RELATION_TYPE"))

            }

        }

    }
}

function getFooterDetails() {

    var footerDesc = new Array();
    footerDesc['MAKER'] = '';
    footerDesc['MAKERTIME'] = '';
    footerDesc['CHECKER'] = '';
    footerDesc['CHECKERTIME'] = '';
    footerDesc['MODNO'] = '';
    footerDesc['TXNSTAT'] = '';
    footerDesc['AUTHSTAT'] = '';
    footerDesc['ONCEAUTH'] = '';
    footerDesc['TXNSTATI'] = '';

    if (selectSingleNode(dataxml, "//MAKER") != null) {
        footerDesc['MAKER'] = getNodeText(selectSingleNode(dataxml, "//MAKER"));
    }
    if (selectSingleNode(dataxml, "//MAKERSTAMP") != null) {
        footerDesc['MAKERTIME'] = getNodeText(selectSingleNode(dataxml, "//MAKERSTAMP"));
    }
    if (selectSingleNode(dataxml, "//CHECKER") != null) {
        footerDesc['CHECKER'] = getNodeText(selectSingleNode(dataxml, "//CHECKER"));
    }
    if (selectSingleNode(dataxml, "//CHECKERSTAMP") != null) {
        footerDesc['CHECKERTIME'] = getNodeText(selectSingleNode(dataxml, "//CHECKERSTAMP"));
    }
    if (selectSingleNode(dataxml, "//MODNO") != null) {
        footerDesc['MODNO'] = getNodeText(selectSingleNode(dataxml, "//MODNO"));
    }
    if (selectSingleNode(dataxml, "//TXNSTAT") != null) {
        footerDesc['TXNSTAT'] = getNodeText(selectSingleNode(dataxml, "//TXNSTAT"));
    }
    if (selectSingleNode(dataxml, "//AUTHSTAT") != null) {
        footerDesc['AUTHSTAT'] = getNodeText(selectSingleNode(dataxml, "//AUTHSTAT"));
    }
    if (selectSingleNode(dataxml, "//ONCEAUTH") != null) {
        footerDesc['ONCEAUTH'] = getNodeText(selectSingleNode(dataxml, "//ONCEAUTH"));
    }
    if (selectSingleNode(dataxml, "//TXNSTATI") != null) {
        footerDesc['TXNSTATI'] = getNodeText(selectSingleNode(dataxml, "//TXNSTATI"));
    }

    return footerDesc;
}

function dateDispaly() {
    var currentTime = new Date()
    var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var millsec = currentTime.getMilliseconds();
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    var pmam = "";
    if (hours > 11) {
        pmam = "PM";
    }
    else {
        pmam = "AM";
    }

    return month + "/" + day + "/" + year + " " + hours + ":" + minutes + " : " + millsec + " " + pmam + "\n";

}


function fnPopulate_Maxlength_bulk() {

    var dataSrcs = selectNodes(dom, "//RAD_DATASOURCES")
    for (var i = 0;i < dataSrcs.length;i++) {
        try {
            var dsName = getNodeText(selectSingleNode(dataSrcs[i], "DATASRC_NAME"));
            if (dsName.indexOf("__") !=  - 1) {
                dsName = dsName.split("__")[0];
            }
            var tabname = dsName;
            var tabname1 = tabname;
            var tabn = fn_dsrvalidate(tabname);
            if (tabn != "") {
                tabname = tabn;
            }
            var queryString="MAXLENGTH_TABCOLS";
			// var queryString = "FETCH@SELECT COLUMN_NAME,
			// DECODE(DATA_TYPE,'CHAR', CHAR_LENGTH, 'VARCHAR2', CHAR_LENGTH,
			// 'NUMBER', NVL(DATA_PRECISION,DATA_LENGTH), DATA_LENGTH)
			// DATA_LENGTH , DATA_SCALE , DATA_TYPE FROM user_tab_cols WHERE
			// TABLE_NAME ='" + tabname + "'";
            var WhereString = "WHERE TABLE_NAME ='" + tabname + "'";
			parent.gReqType = "APP";
            parent.gReqCode = parent.gAction;
            var radReqDOM = parent.buildRADXml();
            var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
            var tempNode = radReqDOM.createElement("QUERY");
            bodyNode.appendChild(tempNode);
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);			
			setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");

            var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
            var multRec = "";
            try {
                multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
            }
            catch (e) {
                multRec = response.substring(9, response.indexOf("</Records>")).split(">");
            }

            for (var sr = 0;sr < multRec.length;sr++) {
                if (multRec[sr] != "") {
                    var singleRec = multRec[sr].split("~");
                    try {
                        var blkname = getNodeText(selectSingleNode(dom, "//RAD_DATASOURCES[DATASRC_NAME='" + dsName + "']/RAD_FIELDS[COLUMN_NAME='" + singleRec[0] + "']/BLOCK_NAME"));
                        setNodeText(selectSingleNode(selectNodes(dom, "//RAD_DATASOURCES[DATASRC_NAME='" + dsName + "']/RAD_FIELDS[COLUMN_NAME='" + singleRec[0] + "']")[0], ('MAX_LENGTH')), singleRec[1]);
						if(singleRec[2] != "" && singleRec[2] != "null")
                        setNodeText(selectSingleNode(selectNodes(dom, "//RAD_DATASOURCES[DATASRC_NAME='" + dsName + "']/RAD_FIELDS[COLUMN_NAME='" + singleRec[0] + "']")[0], ('MAX_DECIMALS')), singleRec[2]);
                        if (blkname != "") {
                            setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkname + "']/RAD_BLK_FIELDS[DBC='" + singleRec[0] + "'][DBT='" + tabname1 + "']"))[0], ('MAX_LENGTH')), singleRec[1]);
                       
                        if(singleRec[2] != "" && singleRec[2] != "null") {
                            setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkname + "']/RAD_BLK_FIELDS[DBC='" + singleRec[0] + "'][DBT='" + tabname1 + "']"))[0], ('MAX_DECIMALS')), singleRec[2]);

                        }
						}
							if(singleRec[3] != "" && singleRec[3] != "null") {
						setNodeText(selectSingleNode(selectNodes(dom, "//RAD_DATASOURCES[DATASRC_NAME='" + dsName + "']/RAD_FIELDS[COLUMN_NAME='" + singleRec[0] + "']")[0], ('DATATYPE')), singleRec[3]);
                        if (blkname != "")
						setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkname + "']/RAD_BLK_FIELDS[DBC='" + singleRec[0] + "'][DBT='" + tabname1 + "']"))[0], ('DATATYPE')), singleRec[3]);
						}
					}
                    catch (e) {
                    }

                }

            }
        }
        catch (e) {

        }

    }
}


function fn_dsrvalidate(tablename) {
    /** remove alias name if present * */
    var tabName = tablename
    if (tabName.indexOf("__") > 0)
        tabName = tabName.substring(0, tabName.indexOf("__"));
    /* for check if the table is synonym or not */
	var queryString = "USERSYNONYMS";
    // var queryString = "FETCH@SELECT TABLE_NAME FROM USER_SYNONYMS WHERE
	// SYNONYM_NAME='" + tabName + "'";
	var WhereString = "WHERE SYNONYM_NAME='" + tabName + "'";
    parent.gReqType = "APP";
    parent.gReqCode = parent.gAction;
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);
	setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
    var multRec = "";
    try {
        multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
    }
    catch (e) {
        multRec = response.substring(9, response.indexOf("</Records>")).split(">");
    }
    if (multRec[0] != "")
        return multRec[0];
    else 
        return tabName;

}