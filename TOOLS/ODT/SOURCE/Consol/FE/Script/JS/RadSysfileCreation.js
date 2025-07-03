/*-----------------------------------------------------------------------------------------------------
 **
 ** File Name  : RadSysfileCreation.js
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
var arrParentScr = new Array();
var xml;
var DataSrc = "";
var fileSavePath1 = ""
var gFuncid = ""
var funCtgry = "";
var preview1;
var prevdatablocks = '~';// amount field validation shihab
var pfldList = '~';// amount field validation shihab  
function fnGetTempDOM() {
}

function saveScripts(fileSavePath, xml1, optn) {
    arrDataSrcMapping = new Array();
    arrTabList = new Array();
    fieldNameArray = new Array();
    arrMultipleEntryBlockIDs = new Array();

    fileSavePath1 = fileSavePath;

    xml = loadXMLDoc(xml1);
    gFuncid = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FUNCTION_ID")[0]);

    var pSrcNode = selectNodes(xml, "//RAD_SCREENS[SCREEN_VISIBLE='Y']");
    for (var sLength = 0;sLength < pSrcNode.length;sLength++) {
        var scrTemp = pSrcNode[sLength].getAttribute("ID");
        arrParentScr[scrTemp] = scrTemp;
    }

    var scriptpath = fileSavePath;

    var auditFlds = "";
    var Audittype = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FOOTER_TEMPLATE")[0]);
    if (Audittype == 'MAINTAUDIT' || Audittype == 'MAINTPROCESS')
        auditFlds = "MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH~";

    var nodesTab = selectNodes(xml, "//RAD_SCREENS[MAIN_SCREEN ='Y']/BODY/RAD_TABS[TAB_VISIBLE='Y']");
    var p = 0;

    for (var k = 0;k < nodesTab.length;k++) {

        if (nodesTab[k].getAttribute("ID") != 'TAB_HEADER' && nodesTab[k].getAttribute("ID") != 'TAB_FOOTER' && nodesTab[k].getAttribute("ID") != 'All') {
            arrTabList[p] = nodesTab[k].getAttribute("ID");
            p++;
        }
    }
    var msgArr = new Array();

    fnReassignIdsToNodes(selectNodes(xml, "//RAD_DATA_BLOCKS"));

    var nodesDataBlks = selectNodes(xml, "//RAD_DATA_BLOCKS[BLOCK_TYPE='NORMAL']");
    var nodesMEDataBlks = selectNodes(xml, "//RAD_FIELDSETS[MULTI_RECORD='Y' and VIEW_TYPE='MULTIPLE' and FIELDSET_VISIBLE='Y']");
    
    // 30817834 Starts
    var isModifiedInCluster = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/MODIFIED_IN_CLUSTER")[0]);
    var isModifiedInCustom = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOM")[0]);
    // 30817834 Ends
    for (var i = 0;i < nodesMEDataBlks.length;i++) {

        var MEDataBlkName = getNodeText(selectSingleNode(nodesMEDataBlks[i], "FIELDSET_BLOCK"));
        var len = arrMultipleEntryBlockIDs.length;
        var alreadyThere = "false"
        for (var j = 0;j < len;j++) {
            if (arrMultipleEntryBlockIDs[j] == MEDataBlkName) {
                alreadyThere = "true"
            }

        }
        if (alreadyThere == "false") {
            arrMultipleEntryBlockIDs[i] = MEDataBlkName;
        }

    }
    var prevdatablocks = '~';// amount field validation shihab
    for (var i = 0;i < nodesDataBlks.length;i++) {

        var strDatasrcName = getNodeText(selectSingleNode(nodesDataBlks[i], "BLOCK_NAME"));

        if (selectNodes(nodesDataBlks[i], "DATASRC_ALIAS")[0] != null) {
            var aliasName = getNodeText(selectSingleNode(nodesDataBlks[i], "DATASRC_ALIAS"));
            if (aliasName != "")
                strDatasrcName = strDatasrcName + "__" + aliasName;
        }
        // amount field validation shihab starts
        var pfldList = '~';
        prevdatablocks = prevdatablocks + strDatasrcName + '~';
        // amount field validation shihab ends
        msgArr[i] = strDatasrcName;

        arrDataSrcMapping[i] = strDatasrcName;

        arrDataSrcMapping[strDatasrcName] = getNodeText(selectSingleNode(nodesDataBlks[i], "BLOCK_PARENT")) + (getNodeText(selectSingleNode(nodesDataBlks[i], "BLOCK_PARENT")) == "" ? "" : "~" + getNodeText(selectSingleNode(nodesDataBlks[i], "RELATION_TYPE")));
        
        //30817834 Starts
//        var nodesRadFields = selectNodes(nodesDataBlks[i], "RAD_BLK_FIELDS[DISPLAY_TYPE!='LABEL']");    //30817834 Changes
        var nodesRadFields = selectNodes(nodesDataBlks[i], "RAD_KERNEL/RAD_BLK_FIELDS[DISPLAY_TYPE!='LABEL']");    //30817834 Changes
        
        if(isModifiedInCluster == 'Y'){
            var nodesRadFieldsCluster = selectNodes(nodesDataBlks[i], "RAD_CLUSTER/RAD_BLK_FIELDS[DISPLAY_TYPE!='LABEL']");
        }
        
        if(isModifiedInCustom == 'Y'){
            var nodesRadFieldsCustom = selectNodes(nodesDataBlks[i], "RAD_CUSTOM/RAD_BLK_FIELDS[DISPLAY_TYPE!='LABEL']");
        }
        // 30817834 Ends
        var fldLstArray = new Array();
        var strFieldList = "";
        var k = 0;
        writeLog("getting the Kernel fields");  //30817834 added
        for (var j = 0;j < nodesRadFields.length;j++) {
            // The field is present in a data block
            if (selectNodes(xml, ("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + strDatasrcName + "']/RAD_KERNEL/RAD_BLK_FIELDS[FIELD_NAME = '" + getNodeText(selectNodes(nodesRadFields[j], ("FIELD_NAME"))[0])) + "'and (ITEM_TYPE='DBITEM' or ITEM_TYPE='DESC')]").length > 0) {

                var fldDbc = getNodeText(selectSingleNode(nodesRadFields[j], "FIELD_NAME"));
                writeLog("--fldDbc =  " + fldDbc + " of block " + strDatasrcName + "j = " + j);  //30817834 added
                // amount field validation shihab starts
                if (getNodeText(selectSingleNode(nodesRadFields[j], ("DISPLAY_TYPE"))) == 'AMOUNT' && getNodeText(selectSingleNode(nodesRadFields[j], ("VISIBLE"))) == 'Y') {
                    var pRelatedBlock = getNodeText(selectSingleNode(nodesRadFields[j], ("RELATED_BLOCK")));
                    var pRelatedField = getNodeText(selectSingleNode(nodesRadFields[j], ("RELATED_FIELD")));
                    if (pRelatedBlock == "" || pRelatedField == "") {
                        //error 
                        if (bulkgenflag != 'Y') {
                            writeLog("---Warning  : Related Ccy not present for " + fldDbc + " of block " + strDatasrcName + ".Local CCY would be used for formatting", "A");
                            //amountValFlag=true;
                        }
                        //return false;
                    }
                    else {
                        if (pRelatedBlock == strDatasrcName) {
                            if (pfldList.indexOf('~' + pRelatedField + '~') < 0) {
                                //error;
                                if (bulkgenflag != 'Y') {
                                    writeLog("***Error in Block Field Order : Related CCY field " + pRelatedField + " should be above field " + fldDbc + " of block " + strDatasrcName, "A");
                                    amountValFlag = true;
                                }
                                //return false;
                            }
                        }
                        else if (prevdatablocks.indexOf('~' + pRelatedBlock + '~') < 0) {
                            //error;
                            if (bulkgenflag != 'Y') {
                                writeLog("***Error in Block Field Order : Related CCY field " + pRelatedField + " should be above field " + fldDbc + " of block " + strDatasrcName, "A");
                                amountValFlag = true;
                            }
                            //return false;
                        }
                    }
                }

                // amount field validation shihab ends
                var Audittype = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FOOTER_TEMPLATE")[0]);
                if ((Audittype == 'MAINTAUDIT' && (fldDbc != 'MAKERID' && fldDbc != 'MAKERDTSTAMP' && fldDbc != 'CHECKERID' && fldDbc != 'CHECKERDTSTAMP' && fldDbc != 'MODNO' && fldDbc != 'RECORDSTAT' && fldDbc != 'AUTHSTAT' && fldDbc != 'ONCEAUTH')) || Audittype != 'MAINTAUDIT') {
                    if (!fldLstArray[fldDbc]) {
                        fldLstArray[k] = fldDbc;
                        //pfldList=pfldList+fldDbc+'~'; // amount field validation shihab
                        fldLstArray[fldDbc] = 1;
                        k++;
                    }
                }

            }

            if (selectNodes(xml, ("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + strDatasrcName + "']/RAD_KERNEL/RAD_BLK_FIELDS[FIELD_NAME = '" + getNodeText(selectNodes(nodesRadFields[j], ("FIELD_NAME"))[0])) + "']").length > 0) {
                var fldDbc = getNodeText(selectSingleNode(nodesRadFields[j], "FIELD_NAME"));
                var Audittype = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FOOTER_TEMPLATE")[0]);
                if ((Audittype == 'MAINTAUDIT' && (fldDbc != 'MAKERID' && fldDbc != 'MAKERDTSTAMP' && fldDbc != 'CHECKERID' && fldDbc != 'CHECKERDTSTAMP' && fldDbc != 'MODNO' && fldDbc != 'RECORDSTAT' && fldDbc != 'AUTHSTAT' && fldDbc != 'ONCEAUTH')) || Audittype != 'MAINTAUDIT') {
                    pfldList = pfldList + fldDbc + '~';// amount field validation shihab 
                }
            }
        }
        
        //30817834 Changes Starts
		if(isModifiedInCluster == 'Y'){//32511835 changes
        writeLog("getting the Cluster fields");  //30817834 added
        for (var j = 0;j < nodesRadFieldsCluster.length;j++) {
            // The field is present in a data block
            if (selectNodes(xml, ("//RAD_CLUSTER/RAD_DATA_BLOCKS[BLOCK_NAME='" + strDatasrcName + "']/RAD_CLUSTER/RAD_BLK_FIELDS[FIELD_NAME = '" + getNodeText(selectNodes(nodesRadFieldsCluster[j], ("FIELD_NAME"))[0])) + "'and (ITEM_TYPE='DBITEM' or ITEM_TYPE='DESC')]").length > 0) {

                var fldDbc = getNodeText(selectSingleNode(nodesRadFieldsCluster[j], "FIELD_NAME"));
                writeLog("--fldDbc =  " + fldDbc + " of block " + strDatasrcName + "j = " + j);  //30817834 added
                // amount field validation shihab starts
                if (getNodeText(selectSingleNode(nodesRadFieldsCluster[j], ("DISPLAY_TYPE"))) == 'AMOUNT' && getNodeText(selectSingleNode(nodesRadFieldsCluster[j], ("VISIBLE"))) == 'Y') {
                    var pRelatedBlock = getNodeText(selectSingleNode(nodesRadFieldsCluster[j], ("RELATED_BLOCK")));
                    var pRelatedField = getNodeText(selectSingleNode(nodesRadFieldsCluster[j], ("RELATED_FIELD")));
                    if (pRelatedBlock == "" || pRelatedField == "") {
                        //error 
                        if (bulkgenflag != 'Y') {
                            writeLog("---Warning  : Related Ccy not present for " + fldDbc + " of block " + strDatasrcName + ".Local CCY would be used for formatting", "A");
                            //amountValFlag=true;
                        }
                        //return false;
                    }
                    else {
                        if (pRelatedBlock == strDatasrcName) {
                            if (pfldList.indexOf('~' + pRelatedField + '~') < 0) {
                                //error;
                                if (bulkgenflag != 'Y') {
                                    writeLog("***Error in Block Field Order : Related CCY field " + pRelatedField + " should be above field " + fldDbc + " of block " + strDatasrcName, "A");
                                    amountValFlag = true;
                                }
                                //return false;
                            }
                        }
                        else if (prevdatablocks.indexOf('~' + pRelatedBlock + '~') < 0) {
                            //error;
                            if (bulkgenflag != 'Y') {
                                writeLog("***Error in Block Field Order : Related CCY field " + pRelatedField + " should be above field " + fldDbc + " of block " + strDatasrcName, "A");
                                amountValFlag = true;
                            }
                            //return false;
                        }
                    }
                }

                // amount field validation shihab ends
                var Audittype = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FOOTER_TEMPLATE")[0]);
                if ((Audittype == 'MAINTAUDIT' && (fldDbc != 'MAKERID' && fldDbc != 'MAKERDTSTAMP' && fldDbc != 'CHECKERID' && fldDbc != 'CHECKERDTSTAMP' && fldDbc != 'MODNO' && fldDbc != 'RECORDSTAT' && fldDbc != 'AUTHSTAT' && fldDbc != 'ONCEAUTH')) || Audittype != 'MAINTAUDIT') {
                    if (!fldLstArray[fldDbc]) {
                        fldLstArray[k] = fldDbc;
                        //pfldList=pfldList+fldDbc+'~'; // amount field validation shihab
                        fldLstArray[fldDbc] = 1;
                        k++;
                    }
                }

            }

            if (selectNodes(xml, ("//RAD_CLUSTER/RAD_DATA_BLOCKS[BLOCK_NAME='" + strDatasrcName + "']/RAD_CLUSTER/RAD_BLK_FIELDS[FIELD_NAME = '" + getNodeText(selectNodes(nodesRadFieldsCluster[j], ("FIELD_NAME"))[0])) + "']").length > 0) {
                var fldDbc = getNodeText(selectSingleNode(nodesRadFieldsCluster[j], "FIELD_NAME"));
                var Audittype = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FOOTER_TEMPLATE")[0]);
                if ((Audittype == 'MAINTAUDIT' && (fldDbc != 'MAKERID' && fldDbc != 'MAKERDTSTAMP' && fldDbc != 'CHECKERID' && fldDbc != 'CHECKERDTSTAMP' && fldDbc != 'MODNO' && fldDbc != 'RECORDSTAT' && fldDbc != 'AUTHSTAT' && fldDbc != 'ONCEAUTH')) || Audittype != 'MAINTAUDIT') {
                    pfldList = pfldList + fldDbc + '~';// amount field validation shihab 
                }
            }
        }
		}
		if(isModifiedInCustom == 'Y'){//32511835 added
        writeLog("getting the Custom fields");  //30817834 added
        for (var j = 0;j < nodesRadFieldsCustom.length;j++) {
            // The field is present in a data block
            if (selectNodes(xml, ("//RAD_CUSTOM/RAD_DATA_BLOCKS[BLOCK_NAME='" + strDatasrcName + "']/RAD_CUSTOM/RAD_BLK_FIELDS[FIELD_NAME = '" + getNodeText(selectNodes(nodesRadFieldsCustom[j], ("FIELD_NAME"))[0])) + "'and (ITEM_TYPE='DBITEM' or ITEM_TYPE='DESC')]").length > 0) {

                var fldDbc = getNodeText(selectSingleNode(nodesRadFieldsCustom[j], "FIELD_NAME"));
                writeLog("--fldDbc =  " + fldDbc + " of block " + strDatasrcName + "j = " + j);  //30817834 added
                // amount field validation shihab starts
                if (getNodeText(selectSingleNode(nodesRadFieldsCustom[j], ("DISPLAY_TYPE"))) == 'AMOUNT' && getNodeText(selectSingleNode(nodesRadFieldsCustom[j], ("VISIBLE"))) == 'Y') {
                    var pRelatedBlock = getNodeText(selectSingleNode(nodesRadFieldsCustom[j], ("RELATED_BLOCK")));
                    var pRelatedField = getNodeText(selectSingleNode(nodesRadFieldsCustom[j], ("RELATED_FIELD")));
                    if (pRelatedBlock == "" || pRelatedField == "") {
                        //error 
                        if (bulkgenflag != 'Y') {
                            writeLog("---Warning  : Related Ccy not present for " + fldDbc + " of block " + strDatasrcName + ".Local CCY would be used for formatting", "A");
                            //amountValFlag=true;
                        }
                        //return false;
                    }
                    else {
                        if (pRelatedBlock == strDatasrcName) {
                            if (pfldList.indexOf('~' + pRelatedField + '~') < 0) {
                                //error;
                                if (bulkgenflag != 'Y') {
                                    writeLog("***Error in Block Field Order : Related CCY field " + pRelatedField + " should be above field " + fldDbc + " of block " + strDatasrcName, "A");
                                    amountValFlag = true;
                                }
                                //return false;
                            }
                        }
                        else if (prevdatablocks.indexOf('~' + pRelatedBlock + '~') < 0) {
                            //error;
                            if (bulkgenflag != 'Y') {
                                writeLog("***Error in Block Field Order : Related CCY field " + pRelatedField + " should be above field " + fldDbc + " of block " + strDatasrcName, "A");
                                amountValFlag = true;
                            }
                            //return false;
                        }
                    }
                }

                // amount field validation shihab ends
                var Audittype = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FOOTER_TEMPLATE")[0]);
                if ((Audittype == 'MAINTAUDIT' && (fldDbc != 'MAKERID' && fldDbc != 'MAKERDTSTAMP' && fldDbc != 'CHECKERID' && fldDbc != 'CHECKERDTSTAMP' && fldDbc != 'MODNO' && fldDbc != 'RECORDSTAT' && fldDbc != 'AUTHSTAT' && fldDbc != 'ONCEAUTH')) || Audittype != 'MAINTAUDIT') {
                    if (!fldLstArray[fldDbc]) {
                        fldLstArray[k] = fldDbc;
                        //pfldList=pfldList+fldDbc+'~'; // amount field validation shihab
                        fldLstArray[fldDbc] = 1;
                        k++;
                    }
                }

            }

            if (selectNodes(xml, ("//RAD_CUSTOM/RAD_DATA_BLOCKS[BLOCK_NAME='" + strDatasrcName + "']/RAD_CUSTOM/RAD_BLK_FIELDS[FIELD_NAME = '" + getNodeText(selectNodes(nodesRadFieldsCustom[j], ("FIELD_NAME"))[0])) + "']").length > 0) {
                var fldDbc = getNodeText(selectSingleNode(nodesRadFieldsCustom[j], "FIELD_NAME"));
                var Audittype = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FOOTER_TEMPLATE")[0]);
                if ((Audittype == 'MAINTAUDIT' && (fldDbc != 'MAKERID' && fldDbc != 'MAKERDTSTAMP' && fldDbc != 'CHECKERID' && fldDbc != 'CHECKERDTSTAMP' && fldDbc != 'MODNO' && fldDbc != 'RECORDSTAT' && fldDbc != 'AUTHSTAT' && fldDbc != 'ONCEAUTH')) || Audittype != 'MAINTAUDIT') {
                    pfldList = pfldList + fldDbc + '~';// amount field validation shihab 
                }
            }
        }
        //30817834  Changes Ends
		}
        for (var l = 0;l < k;l++) {
            strFieldList = strFieldList + fldLstArray[l] + "~";
        }
        var parentDSrc = getNodeText(selectSingleNode(nodesDataBlks[i], "BLOCK_PARENT"));
        if (parentDSrc != "") {
            if (selectSingleNode(xml, "//BLOCK_PARENT[BLOCK_NAME = '" + parentDSrc + "']/DATASRC_ALIAS")) {
                var parentAlias = getNodeText(selectSingleNode(xml, "//RAD_DATASOURCES[DATASRC_NAME = '" + parentDSrc + "']/DATASRC_ALIAS"));
                if (parentAlias != "")
                    parentDSrc = parentDSrc + "__" + parentAlias;
            }
        }

        var dsrcName = getNodeText(selectSingleNode(nodesDataBlks[i], "BLOCK_NAME"));

        if (selectSingleNode(nodesDataBlks[i], "DATASRC_ALIAS")) {
            var alias_ds = getNodeText(selectSingleNode(nodesDataBlks[i], "DATASRC_ALIAS"));
            if (alias_ds != "")
                dsrcName = dsrcName + "__" + alias_ds;
        }

        var auditdsrcName = selectSingleNode(xml, "//RAD_DATA_BLOCKS[MASTER_BLOCK='Y']")
        if (dsrcName == getNodeText(selectSingleNode(auditdsrcName, "BLOCK_NAME"))) {
            strFieldList += auditFlds;
        }
        fieldNameArray[i] = "\"" + strDatasrcName + "\":\"" + strFieldList.substring(0, strFieldList.length - 1) + "\"";

        var strFieldListPrefix = '<FN ';

        strFieldListPrefix += 'PARENT="' + parentDSrc + '" ';
        strFieldListPrefix += 'RELATION_TYPE="' + getNodeText(selectSingleNode(nodesDataBlks[i], "RELATION_TYPE")) + '" ';
        strFieldListPrefix += 'TYPE="' + strDatasrcName + '">';
        var strFieldListSuffix = "</FN>";
        strFieldList = strFieldListPrefix + strFieldList.substring(0, strFieldList.length - 1) + strFieldListSuffix;
        try {
            strFieldList = replaceAllChar(strFieldList, '\n', ' ');
            msgArr[strDatasrcName] = strFieldList;
        }
        catch (e) {
            msgArr[strDatasrcName] = strFieldList;
        }

    }

    var strLov = "";

    //LOV CHANGES
    var lovNewScriptElem = "";

    var lovfinalstr = "";
    var lovfinalstroffline = "";
    var lovNewretflds = "";
    var lovNewbndFlds = "";
    var lovNewlovVal = "";
    var lovNewofflineRetflds = "";
    var lovNewofflineBndFlds = "";
    var lovNewglobalRetflds = "";
    var lovNewglobalBndFlds = "";
    var lovvalreqstr = 'var lovVal = new Array();\r\n\r\n';

    lovNewScriptElem += 'var retflds = new Array();\r\n';
    lovNewScriptElem += 'var bndFlds = new Array();\r\n';
    lovNewScriptElem += 'var lovVal = new Array();\r\n\r\n';
    //VINIT
    lovNewScriptElem += 'var indexFlds = new Array();\r\n\r\n';

    lovNewScriptElem += 'var offlineRetflds = new Array();\r\n';
    lovNewScriptElem += 'var offlineBndFlds = new Array();\r\n\r\n';

    // lovfinalstr += 'var lovInfoFlds = {';
    var nodesLov = selectNodes(xml, "//RAD_BLK_FIELDS[LOV_NAME!=''or GLOBAL_LOV_NAME!='' or OFF_LINE_LOV_NAME!='' or GLOBAL_OFF_LINE_LOV_NAME!='']");

    for (var i = 0;i < nodesLov.length;i++) {
        var lovNewbndFlds = "";
        var lovBindVars = "";
        var lovBindblk = "";
        var lovRetfields = "";
        var lovDatatype = "";
        var lovColHeader = "";
        var lovRetVars = "";
        var lovRetBlk = "";
        var lovQueryCol = "";
        var lovBindVarType = "";

        //VINIT
        var lovIsIndexed = "";
        var lovMinChar = "";
        var lovIndex = "";
        var lovvalcheck = "";
        var offlovBindVars = "";
        var offlovRetfields = "";
        var offlovDatatype = "";
        var offlovColHeader = "";
        var offlovRetVars = "";
        var offlovRetBlk = "";
        var offlovQueryCol = "";
        var offlovBindVarType = "";

        var globalofflovBindVars = "";
        var globalofflovRetfields = "";
        var globalofflovDatatype = "";
        var globalofflovColHeader = "";
        var globalofflovRetVars = "";
        var globalofflovRetBlk = "";
        var globalofflovQueryCol = "";
        var globalofflovBindVarType = "";

        var lovType = "";

        if (getNodeText(selectSingleNode(nodesLov[i], "LOV_NAME")) != "") {
            var lovName = getNodeText(selectSingleNode(nodesLov[i], "LOV_NAME"));
            var BlkName = getNodeText(selectNodes(nodesLov[i].parentNode, "BLOCK_NAME")[0]);
            var fldName = getNodeText(selectNodes(nodesLov[i], "FIELD_NAME")[0]);

            var nodesLovbind = selectNodes(nodesLov[i], "RAD_BIND_VARS");
            //if (nodesLovbind.length >0)
            //{
            for (var j = 0;j < nodesLovbind.length;j++) {
                var lovBindblk = getNodeText(selectNodes(nodesLovbind[j], "BIND_VAR_BLK")[0]);

                lovBindVarType = getNodeText(selectNodes(nodesLovbind[j], "BIND_VAR_TYPE")[0])
                lovBindVars = lovBindVars + lovBindblk + "__" + getNodeText(selectNodes(nodesLovbind[j], "BIND_VAR_NAME")[0]) + '!' + lovBindVarType + '~';
            }
            //}
            var nodesLovRet = selectNodes(nodesLov[i], "RAD_RETURN_FIELDS");
            //if (nodesLovRet.length >0)
            //{
            for (var j = 0;j < nodesLovRet.length;j++) {
                var lovRetBlk = getNodeText(selectNodes(nodesLovRet[j], "RETURN_BLK_NAME")[0]);
                if (getNodeText(selectNodes(nodesLovRet[j], "QUERY_COLUMN")[0]) != "") {
                    if (getNodeText(selectNodes(nodesLovRet[j], "RETURN_FLD_NAME")[0]) != "" && lovRetBlk != "") {
                        lovRetVars = lovRetVars + lovRetBlk + "__" + getNodeText(selectNodes(nodesLovRet[j], "RETURN_FLD_NAME")[0]) + "~";
                    }
                    else {
                        lovRetVars = lovRetVars + "~";
                    }
                    lovQueryCol = lovQueryCol + '~' + getNodeText(selectNodes(nodesLovRet[j], "QUERY_COLUMN")[0]);
                }
            }
            //}
            //vinit
            var lovName = getNodeText(selectSingleNode(nodesLov[i], "LOV_NAME"));
            var radLovDet = selectNodes(xml, "//RAD_LOVS[@ID='" + lovName + "']/RAD_LOV_DETAILS");
            var lovIndex = "";
            var lovMinIndexLength = "";
            for (var j = 0;j < radLovDet.length;j++) {
                if (selectSingleNode(radLovDet[j], "REDN_FLD_FLAG") != null && getNodeText(selectNodes(radLovDet[j], "REDN_FLD_FLAG")[0]) == "Y") {
                    if (selectSingleNode(radLovDet[j], "IS_INDEXED") != null && getNodeText(selectNodes(radLovDet[j], "IS_INDEXED")[0]) == "Y") {
                        if (getNodeText(selectNodes(radLovDet[j], "MIN_SEARCH_CHAR_LEN")[0]) == "" || getNodeText(selectNodes(radLovDet[j], "MIN_SEARCH_CHAR_LEN")[0]) == null || getNodeText(selectNodes(radLovDet[j], "MIN_SEARCH_CHAR_LEN")[0]) < 3) {
                            lovIndex += getNodeText(selectNodes(radLovDet[j], "IS_INDEXED")[0]) + "!" + '3' + "~";
                        }
                        else {
                            lovIndex += getNodeText(selectNodes(radLovDet[j], "IS_INDEXED")[0]) + "!" + getNodeText(selectNodes(radLovDet[j], "MIN_SEARCH_CHAR_LEN")[0]) + "~";
                        }

                    }
                    else if (selectSingleNode(radLovDet[j], "IS_INDEXED") != null && getNodeText(selectNodes(radLovDet[j], "IS_INDEXED")[0]) == "N") {
                        lovIndex += "N" + "~";
                    }

                }
            }
            lovIndex = lovIndex.substring(0, lovIndex.length - 1);
            lovType = "L";

        }

        //offline lovs
        var offlovName = "";
        var offBlkName = "";

        if (selectSingleNode(nodesLov[i], ("OFF_LINE_LOV_NAME")) != null) {

            if (getNodeText(selectSingleNode(nodesLov[i], ("OFF_LINE_LOV_NAME"))) != "") {
                offBlkName = getNodeText(selectNodes(nodesLov[i].parentNode, "BLOCK_NAME")[0]);
                var offfldName = getNodeText(selectNodes(nodesLov[i], "FIELD_NAME")[0]);

                offlovName = getNodeText(selectSingleNode(nodesLov[i], "OFF_LINE_LOV_NAME"));
                lovName = getNodeText(selectSingleNode(nodesLov[i], "OFF_LINE_LOV_NAME"));

                var offnodesLovbind = selectNodes(nodesLov[i], "RAD_OFF_LINE_BIND_VARS");
                //if (offnodesLovbind.length >0)
                //{
                for (var j = 0;j < offnodesLovbind.length;j++) {
                    var offlovBindblk = getNodeText(selectNodes(offnodesLovbind[j], "BIND_VAR_BLK")[0]);
                    offlovBindVars = offlovBindVars + offlovBindblk + "__" + getNodeText(selectNodes(offnodesLovbind[j], "BIND_VAR_NAME")[0]) + "!" + getNodeText(selectNodes(offnodesLovbind[j], "BIND_VAR_TYPE")[0]) + "~";

                    offlovBindVarType = offlovBindVarType + '~' + getNodeText(selectNodes(offnodesLovbind[j], "BIND_VAR_TYPE")[0])
                }
                //}
                var offnodesLovRet = selectNodes(nodesLov[i], "RAD_OFF_LINE_RETURN_FIELDS");
                //if (offnodesLovRet.length >0) {
                for (var j = 0;j < offnodesLovRet.length;j++) {
                    var offlovRetBlk = getNodeText(selectNodes(offnodesLovRet[j], "RETURN_BLK_NAME")[0]);
                    if (getNodeText(selectNodes(offnodesLovRet[j], "RETURN_FLD_NAME")[0]) != "" && offlovRetBlk != "") {
                        offlovRetVars = offlovRetVars + offlovRetBlk + "__" + getNodeText(selectNodes(offnodesLovRet[j], "RETURN_FLD_NAME")[0]) + '~';
                    }
                    else {
                        lovRetVars = lovRetVars + "~";
                    }
                    offlovQueryCol = offlovQueryCol + '~' + getNodeText(selectNodes(offnodesLovRet[j], "QUERY_COLUMN")[0]);

                }
                //}
            }
            lovType = "L";
        }

        //Global lov
        if (selectSingleNode(nodesLov[i], ("GLOBAL_LOV_NAME")) != null) {

            if (getNodeText(selectSingleNode(nodesLov[i], ("GLOBAL_LOV_NAME"))) != "") {

                if (getNodeText(selectSingleNode(nodesLov[i], ("GLOBAL_LOV_NAME"))) != "" && getNodeText(selectSingleNode(nodesLov[i], ("LOV_NAME"))) == "") {
                    lovName = getNodeText(selectSingleNode(nodesLov[i], ("GLOBAL_LOV_NAME")));
                    var BlkName = getNodeText(selectNodes(nodesLov[i].parentNode, "BLOCK_NAME")[0]);
                    var fldName = getNodeText(selectNodes(nodesLov[i], "FIELD_NAME")[0]);

                    var nodesLovbind = selectNodes(nodesLov[i], "RAD_BIND_VARS");
                    // if (nodesLovbind.length >0)
                    // {
                    for (var j = 0;j < nodesLovbind.length;j++) {
                        var lovBindblk = getNodeText(selectNodes(nodesLovbind[j], "BIND_VAR_BLK")[0]);
                        lovBindVarType = getNodeText(selectNodes(nodesLovbind[j], "BIND_VAR_TYPE")[0]);
                        lovBindVars = lovBindVars + lovBindblk + "__" + getNodeText(selectNodes(nodesLovbind[j], "BIND_VAR_NAME")[0]) + '!' + lovBindVarType + "~";

                    }
                    //}
                    var nodesLovRet = selectNodes(nodesLov[i], "RAD_RETURN_FIELDS");
                    //if (nodesLovRet.length >0)
                    //{
                    for (var j = 0;j < nodesLovRet.length;j++) {
                        var lovRetBlk = getNodeText(selectNodes(nodesLovRet[j], "RETURN_BLK_NAME")[0]);
                        if (getNodeText(selectNodes(nodesLovRet[j], "QUERY_COLUMN")[0]) != "") {
                            if (getNodeText(selectNodes(nodesLovRet[j], "RETURN_FLD_NAME")[0]) != "" && lovRetBlk != "") {
                                lovRetVars = lovRetVars + lovRetBlk + "__" + getNodeText(selectNodes(nodesLovRet[j], "RETURN_FLD_NAME")[0]) + '~';
                            }
                            else {
                                lovRetVars = lovRetVars + "~";
                            }
                            lovQueryCol = lovQueryCol + '~' + getNodeText(selectNodes(nodesLovRet[j], "QUERY_COLUMN")[0]);
                        }
                    }
                    //}
                }
                lovType = "G";
            }

            //global offline
            var globalofflovName = "";
            var globaloffBlkName = "";

            if (selectSingleNode(nodesLov[i], ("GLOBAL_OFF_LINE_LOV_NAME")) != null) {

                if (getNodeText(selectSingleNode(nodesLov[i], "GLOBAL_OFF_LINE_LOV_NAME")) != "") {
                    globaloffBlkName = getNodeText(selectNodes(nodesLov[i].parentNode, "BLOCK_NAME")[0]);
                    var globalofffldName = getNodeText(selectNodes(nodesLov[i], "FIELD_NAME")[0]);

                    globalofflovName = getNodeText(selectSingleNode(nodesLov[i], "GLOBAL_OFF_LINE_LOV_NAME"));
                    lovName = getNodeText(selectSingleNode(nodesLov[i], "GLOBAL_OFF_LINE_LOV_NAME"));

                    var globaloffnodesLovbind = selectNodes(nodesLov[i], "RAD_OFF_LINE_BIND_VARS");
                    //if (globaloffnodesLovbind.length >0)
                    //{
                    for (var j = 0;j < globaloffnodesLovbind.length;j++) {
                        var globalofflovBindblk = getNodeText(selectNodes(globaloffnodesLovbind[j], "BIND_VAR_BLK")[0]);
                        globalofflovBindVars = globalofflovBindVars + globalofflovBindblk + "__" + getNodeText(selectNodes(globaloffnodesLovbind[j], "BIND_VAR_NAME")[0]) + "!" + getNodeText(selectNodes(globaloffnodesLovbind[j], "BIND_VAR_TYPE")[0]) + "~";

                        globalofflovBindVarType = globalofflovBindVarType + '~' + getNodeText(selectNodes(globaloffnodesLovbind[j], "BIND_VAR_TYPE")[0]);
                    }
                    //}
                    var globaloffnodesLovRet = selectNodes(nodesLov[i], "RAD_OFF_LINE_RETURN_FIELDS");
                    //if (globaloffnodesLovRet.length >0) {
                    for (var j = 0;j < globaloffnodesLovRet.length;j++) {
                        var globalofflovRetBlk = getNodeText(selectNodes(globaloffnodesLovRet[j], "RETURN_BLK_NAME")[0]);
                        if (getNodeText(selectNodes(globaloffnodesLovRet[j], "RETURN_FLD_NAME")[0]) != "" && globalofflovRetBlk != "") {
                            globalofflovRetVars = globalofflovRetVars + globalofflovRetBlk + "__" + getNodeText(selectNodes(globaloffnodesLovRet[j], "RETURN_FLD_NAME")[0]) + '~';
                        }
                        else {
                            globalofflovRetVars = globalofflovRetVars + "~";
                        }
                        globalofflovQueryCol = globalofflovQueryCol + '~' + getNodeText(selectNodes(globaloffnodesLovRet[j], "QUERY_COLUMN")[0]);

                    }
                    //}
                }

            }
            lovType = "G";
        }

        var noderadLov = selectNodes(xml, "//RAD_LOVS[LOV_NAME='" + lovName + "']");
        var lovForm = "";
        var lovTitle = "";
        var datapgsz = "";
        var fetchrows = "";
        var nodesLovDet = "";
        var lovRednFlds = "";
        var isindexed = "";
        var minCharLen = "";

        if (lovType != "G") {
            var nodesLovDet = selectNodes(noderadLov[0], "RAD_LOV_DETAILS");
            //lov detail elements
            for (var j = 0;j < nodesLovDet.length;j++) {

                if (selectSingleNode(nodesLovDet[j], "REDN_FLD_FLAG")) {

                    if (getNodeText(selectSingleNode(nodesLovDet[j], "REDN_FLD_FLAG")) == 'Y') {
                        lovRednFlds += getNodeText(selectSingleNode(nodesLovDet[j], "QUERY_COLS")) + "!";
                        lovRednFlds += getNodeText(selectSingleNode(nodesLovDet[j], "REDN_FLD_TYPE")) + "~";

                    }
                }
                lovDatatype += getNodeText(selectSingleNode(nodesLovDet[j], "DATATYPE")) + "~";
                lovColHeader += getNodeText(selectSingleNode(nodesLovDet[j], "COL_HEADING")) + "~";
            }
        }

        if (fldName && fldName != "") {
            lovNewScriptElem += "\r\n/***** Lov Infomation for Field " + BlkName + '__' + fldName + "  *****/\r\n";
        }
        if (offfldName && offfldName != "") {
            lovNewScriptElem += "\r\n/***** Lov Infomation for Field " + BlkName + '__' + offfldName + "  *****/\r\n";
        }

        if (globalofffldName && globalofffldName != "") {
            lovNewScriptElem += "\r\n/***** Lov Infomation for Field " + BlkName + '__' + globalofffldName + "  *****/\r\n";
        }

        //vinit lov
        if (BlkName && fldName != "") {
            lovNewScriptElem += 'retflds["' + BlkName + '__' + fldName + '__' + lovName + '"]="';
            lovNewScriptElem += lovRetVars + '";\r\n';

            lovNewretflds = "\"" + BlkName + '__' + fldName + '__' + lovName + "\"" + ":[";
            lovNewretflds += "\"" + lovRetVars + "\",";

            lovNewScriptElem += 'bndFlds["' + BlkName + '__' + fldName + '__' + lovName + '"]="';
            lovNewScriptElem += lovBindVars.substring(0, lovBindVars.length - 1) + '";\r\n';

            //  lovNewbndFlds += "\"" + BlkName + '__' + fldName + '__' + lovName ;
            if (lovBindVars.length > 0) {
                // var lovNewbndFlds = "";
                lovNewbndFlds = lovBindVars.substring(0, lovBindVars.length - 1);
            }
            if (getNodeText(selectSingleNode(nodesLov[i], "LOV_VAL_REQ")) && getNodeText(selectSingleNode(nodesLov[i], "LOV_VAL_REQ")) == 'N') {
                lovNewScriptElem += 'lovVal["' + BlkName + '__' + fldName + '__' + lovName + '"]="N";\r\n';
                lovvalreqstr += 'lovVal["' + BlkName + '__' + fldName + '__' + lovName + '"]="N";\r\n';
                lovvalcheck += 'N' + '~';
                lovvalcheck = lovvalcheck.substring(0, lovvalcheck.length - 1);
            }
            else 
                lovvalcheck += "";

            lovfinalstr += lovNewretflds + "\"" + lovNewbndFlds + "\"," + "\"" + lovIndex + "\"," + "\"" + lovvalcheck + "\"],";

            lovNewScriptElem += 'indexFlds["' + BlkName + '__' + fldName + '__' + lovName + '"]="';
            lovNewScriptElem += lovIndex + '";\r\n';

            fldName = "";
            lovNewScriptElem += '\r\n';
        }

        //off line LOVs
        if (offBlkName && offfldName != "") {
            lovNewScriptElem += 'offlineRetflds["' + offBlkName + '__' + offfldName + '__' + offlovName + '"]="';
            lovNewScriptElem += offlovRetVars + '";\r\n';

            lovNewofflineRetflds = "\"" + offBlkName + '__' + offfldName + '__' + offlovName + "\"" + ":[";
            lovNewofflineRetflds += "\"" + offlovRetVars + "\",";

            lovNewScriptElem += 'offlineBndFlds["' + offBlkName + '__' + offfldName + '__' + offlovName + '"]="';
            lovNewScriptElem += offlovBindVars.substring(0, offlovBindVars.length - 1) + '";\r\n\r\n';
            if (offlovBindVars.length > 0) {
                // var lovNewofflineBndFlds = "";
                lovNewofflineBndFlds = offlovBindVars.substring(0, offlovBindVars.length - 1);
            }
            lovfinalstroffline += lovNewofflineRetflds + "\"" + lovNewofflineBndFlds + "\"],";

            offfldName = "";

        }

        if (globaloffBlkName && globalofffldName != "") {
            lovNewScriptElem += 'offlineRetflds["' + globaloffBlkName + '__' + globalofffldName + '__' + globalofflovName + '"]="';
            lovNewScriptElem += globalofflovRetVars + '";\r\n';

            lovNewglobalRetflds = "\"" + globaloffBlkName + '__' + globalofffldName + '__' + globalofflovName + "\"" + ":[";
            lovNewglobalRetflds += "\"" + globalofflovRetVars + "\",";

            lovNewScriptElem += 'offlineBndFlds["' + globaloffBlkName + '__' + globalofffldName + '__' + globalofflovName + '"]="';
            lovNewScriptElem += globalofflovBindVars.substring(0, globalofflovBindVars.length - 1) + '";\r\n\r\n';
            if (globalofflovBindVars.length > 0) {
                //var lovNewglobalBndFlds = "";
                lovNewglobalBndFlds = "\"" + globalofflovBindVars.substring(0, globalofflovBindVars.length - 1) + "\"],";
            }
            lovfinalstroffline += lovNewglobalRetflds + "\"" + lovNewglobalBndFlds + "\"],";

            globalofffldName = "";
        }
    }

    if (getNodeText(selectSingleNode(xml, ("//RAD_FUNCTIONS/FUNCTION_CATEGORY"))) == "REPORT") {

        if (getNodeText(selectSingleNode(xml, ("//RAD_FUNCTIONS/FUNCTION_ID"))).substring(2, 3) != "C") {
            lovNewScriptElem += "\r\n/***** Lov Infomation for Field  BLK_REPORT_OPTIONS__PRINTER *****/\r\n";
            lovNewScriptElem += 'retflds[\"BLK_REPORT_OPTIONS__PRINTER__LOV_EXTRPT_PRINTER\"]=\"BLK_REPORT_OPTIONS__PRINTER~\";\r\n';
            lovNewScriptElem += 'bndFlds[\"BLK_REPORT_OPTIONS__PRINTER__LOV_EXTRPT_PRINTER\"]=\"\";\r\n\r\n';
			lovfinalstr +="\"BLK_REPORT_OPTIONS__PRINTER__LOV_EXTRPT_PRINTER\"" + ":[\"BLK_REPORT_OPTIONS__PRINTER~\",\"\",\"N~\",\"\"],";
	   }
    }

    // Summary Lov Details
    var nodes_SummLov = selectNodes(xml, "//RAD_SUMMARY/SUMMARY_DETAILS[LOV_NAME!='']");

    for (var S = 0;S < nodes_SummLov.length;S++) {
        lovvalcheck = "";
        lovRetVars = "";
        lovBindVars = "";
        lovNewbndFlds = "";
        var S_fldnmae = getNodeText(selectSingleNode(nodes_SummLov[S], "FIELD_NAME"));
        var S_lovname = getNodeText(selectSingleNode(nodes_SummLov[S], "LOV_NAME"));
        var S_mnchrl = getNodeText(selectSingleNode(nodes_SummLov[S], "MIN_CHAR_LEN"));
        var S_retrnflds = getNodeText(selectSingleNode(nodes_SummLov[S], "RETURN_FLDS")).split("~");
        var S_bndvar = getNodeText(selectSingleNode(nodes_SummLov[S], "BIND_FLDS")).split("~");
        var S_blkname = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY/RSLT_DATABLK")[0]);

        lovNewretflds = "\"" + S_blkname + '__' + S_fldnmae + '__' + S_lovname + "_S\"" + ":[";

        for (var j = 0;j < S_retrnflds.length;j++) {
            if (S_retrnflds[j] != "") {
                lovRetVars = lovRetVars + S_blkname + "__" + S_retrnflds[j] + "~";
            }
            else {
                lovRetVars = lovRetVars + "~";
            }
        }
        lovNewretflds += "\"" + lovRetVars + "\",";

        var binddata = "";
        for (var j = 0;j < S_bndvar.length;j++) {
            if (S_bndvar[j] != "") {
                binddata = S_bndvar[j].replace(':', '!');
                lovBindVars = lovBindVars + S_blkname + "__" + binddata + "~";
            }
        }

        if (lovBindVars.length > 0) {
            lovNewbndFlds = lovBindVars.substring(0, lovBindVars.length - 1);
        }

        var radLovDet = selectNodes(xml, "//RAD_LOVS[@ID='" + S_lovname + "']/RAD_LOV_DETAILS");
        var lovIndex = "";
        var lovMinIndexLength = "";
        for (var j = 0;j < radLovDet.length;j++) {
            if (selectSingleNode(radLovDet[j], "REDN_FLD_FLAG") != null && getNodeText(selectNodes(radLovDet[j], "REDN_FLD_FLAG")[0]) == "Y") {
                if (selectSingleNode(radLovDet[j], "IS_INDEXED") != null && getNodeText(selectNodes(radLovDet[j], "IS_INDEXED")[0]) == "Y") {
                    if (getNodeText(selectNodes(radLovDet[j], "MIN_SEARCH_CHAR_LEN")[0]) == "" || getNodeText(selectNodes(radLovDet[j], "MIN_SEARCH_CHAR_LEN")[0]) == null || getNodeText(selectNodes(radLovDet[j], "MIN_SEARCH_CHAR_LEN")[0]) < 3) {
                        lovIndex += getNodeText(selectNodes(radLovDet[j], "IS_INDEXED")[0]) + "!" + '3' + "~";
                    }
                    else {
                        lovIndex += getNodeText(selectNodes(radLovDet[j], "IS_INDEXED")[0]) + "!" + getNodeText(selectNodes(radLovDet[j], "MIN_SEARCH_CHAR_LEN")[0]) + "~";
                    }

                }
                else if (selectSingleNode(radLovDet[j], "IS_INDEXED") != null && getNodeText(selectNodes(radLovDet[j], "IS_INDEXED")[0]) == "N") {
                    lovIndex += "N" + "~";
                }

            }
        }
        lovIndex = lovIndex.substring(0, lovIndex.length - 1);

        lovfinalstr += lovNewretflds + "\"" + lovNewbndFlds + "\"," + "\"" + lovIndex + "\"," + "\"" + lovvalcheck + "\"],";

    }

    // Summary Lov Details
    // var strLOV = lovNewScriptElem;
    //vinit lov
    if (lovfinalstr != "")
        var strLOV = "var lovInfoFlds = {" + lovfinalstr.substring(0, (lovfinalstr.length - 1)) + "};\r\n";
    else var strLOV = "var lovInfoFlds = {};\r\n";

    if (lovfinalstroffline != "")
        var lovfinalstroffline = "var offlineLovInfoFlds = {" + lovfinalstroffline.substring(0, (lovfinalstroffline.length - 1)) + "};\r\n";
    else var lovfinalstroffline = "var offlineLovInfoFlds = {};\r\n";

    var strScripts1 = fnCreateJavascriptFiles(scriptpath, msgArr, strLOV + lovfinalstroffline, xml, optn);
    // var strScripts1 = fnCreateJavascriptFiles(scriptpath, msgArr, strLOV+lovfinalstroffline+lovvalreqstr, xml, optn);
    return strScripts1;
}

function fnCreateJavascriptFiles(pstrScriptPath, parrMessage, pstrLOV, xml, optn) {
    var strScripts = parent.gBodySeparator;
    var consolScripts = "";

    var functionid = getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/FUNCTION_ID"));
    strScripts += "JS\\" + functionid + "_SYS.js--";
    //SCRIPTS FOR DETAILED SCREEN
    strScripts += fnGetScriptCodeForDetailScreen(parrMessage, pstrLOV, xml);
    //var actioncode = getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/ACTION"));
    var actioncode = "LOAD";
    if(document.getElementsByName("ACTION").length > 0) {
    	actioncode = document.getElementsByName("ACTION")[0].value;
    }
    //var genAll =getNodeText( selectSingleNode(xml,"//RAD_FUNCTIONS/GEN_ALL"));
    var funcorg = parent.relType;
    if (optn == 'N') {
        if (funcorg == 'CUSTOM') {
            if (actioncode == 'NEW') {
                var funcidCustomjs = parent.gBodySeparator + "JS\\" + functionid + "_CUSTOM.js--";
                funcidCustomjs += fnGetCopyrightInfo("", "", functionid + "_CUSTOM.js", "", "");

                consolScripts += funcidCustomjs;
            }

        }

        if (funcorg == 'CLUSTER') {
            if (actioncode == 'NEW') {
                var funcidClusterjs = parent.gBodySeparator + "JS\\" + functionid + "_CLUSTER.js--";
                funcidClusterjs += fnGetCopyrightInfo("", "", functionid + "_CLUSTER.js", "", "");

                consolScripts += funcidClusterjs;
            }

        }

        if (funcorg == 'KERNEL') {

            if (actioncode == 'NEW') {
                var funcidKerneljs = parent.gBodySeparator + "JS\\" + functionid + "_KERNEL.js--";
                funcidKerneljs += fnGetCopyrightInfo("", "", functionid + "_KERNEL.js", "", "");

                consolScripts += funcidKerneljs;
            }

        }
    }

    consolScripts += strScripts;

    return consolScripts;
}
//----------------------------------------------------------------------------------------------------------------------
function fnGetScriptCodeForDetailScreen(parrMessage, pstrLOV, xml) {
    var strScriptForDetailScreen = "";
    funCtgry = getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/FUNCTION_CATEGORY"));
    strScriptForDetailScreen += fnGetCopyrightInfo("", "", gFuncid + "_SYS.js", "", "");
     strScriptForDetailScreen += fnGetCodeForFCJXML(parrMessage, xml);

    if (selectNodes(xml, "//RAD_SUMMARY/RSLT_DATASRC").length != 0) {
        strScriptForDetailScreen += fnGetCodeForFCJXMLForSummary(xml);

        var tableName = getNodeText(selectNodes(xml, "//RAD_SUMMARY/RSLT_DATASRC")[0]);
        var defaultWhereClauseOrderBy = "";
        var defaultWhereClause = '';

        if (selectNodes(xml, "//RAD_SUMMARY_ORDERBY").length > 0) {
            defaultWhereClauseOrderBy = getNodeText(selectNodes(xml, "//RAD_SUMMARY_ORDERBY")[0]);
        }

        if (selectNodes(xml, "//RAD_SUMMARY_WHERECLAUSE").length > 0) {

            var defaultWhereClauseNodes = selectNodes(xml, "//RAD_SUMMARY_WHERECLAUSE");
            if (getNodeText(defaultWhereClauseNodes[0]) != "") {

                for (var whereCnt = 0;whereCnt < defaultWhereClauseNodes.length;whereCnt++) {
                    defaultWhereClause += getNodeText(defaultWhereClauseNodes[0]);

                }
            }
        }
        var multiBrnWhereClause = '';
        if (selectNodes(xml, ("//RAD_SUMMARY")).length > 0) {
            var multiBrnWhereClauseNodes = selectNodes(xml, ("//RAD_SUMMARY/RAD_MULTIBRN_WHERECLAUSE"));
            for (var whereCnt = 0;whereCnt < multiBrnWhereClauseNodes.length;whereCnt++) {
                multiBrnWhereClause += getNodeText(multiBrnWhereClauseNodes[0]);

            }
        }
        var g_SummaryType = 'S';
        var g_SummaryBtnCount = 0;
        if (selectNodes(xml, "//RAD_SUMMARY").length > 0) {
            var g_SummaryBlock = getNodeText(selectSingleNode(xml, "//RAD_SUMMARY/RSLT_DATABLK"));

            if (selectSingleNode(xml, ("//RAD_SUMMARY/SUMMARY_TYPE"))) {
                g_SummaryType = getNodeText(selectSingleNode(xml, ("//RAD_SUMMARY/SUMMARY_TYPE")));
            }
            if (selectNodes(xml, ("//RAD_SUMMARY/CUSTOM_BUTTONS_DETAILS")).length > 0) {
                g_SummaryBtnCount = selectNodes(xml, ("//RAD_SUMMARY/CUSTOM_BUTTONS_DETAILS")).length;
            }
        }
        strScriptForDetailScreen += "\r\n";
        var gfuncid = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FUNCTION_ID")[0]);
        strScriptForDetailScreen += 'var detailFuncId = "' + gfuncid + '";\r\n';
        strScriptForDetailScreen += 'var defaultWhereClause = "' + defaultWhereClause + '";\r\n';
        strScriptForDetailScreen += 'var defaultOrderByClause ="' + defaultWhereClauseOrderBy + '";\r\n';
        strScriptForDetailScreen += 'var multiBrnWhereClause ="' + multiBrnWhereClause + '";\r\n';
        strScriptForDetailScreen += 'var g_SummaryType ="' + g_SummaryType + '";\r\n';
        strScriptForDetailScreen += 'var g_SummaryBtnCount =' + g_SummaryBtnCount + ';\r\n';
        strScriptForDetailScreen += 'var g_SummaryBlock ="' + g_SummaryBlock + '";\r\n';
        strScriptForDetailScreen += "//----------------------------------------------------------------------------------------------------------------------\r\n"

    }
    strScriptForDetailScreen += fnGetScriptForDataBinding("DETAIL");
    strScriptForDetailScreen += fnGetCodeForQueryMode("DETAIL");
    strScriptForDetailScreen += fnGetCodeForAmendableSubsystem();

    strScriptForDetailScreen += fnGetCodeForLOVs(pstrLOV);
    if (funCtgry == "MAINTENANCE" || funCtgry == "TRANSACTION" || selectNodes(xml, "//RAD_SCREENS").length > 0) {
        strScriptForDetailScreen += fnScriptForTabs();
    }

    strScriptForDetailScreen += fnScriptForMultipleEntryBlocks("DETAIL");
    strScriptForDetailScreen += fnScriptForMultipleEntryViewSingleEntry();
    strScriptForDetailScreen += fnScriptForAttachedCallforms();
    // code For Copy from Block Removed.
    strScriptForDetailScreen += fnGetCodeForScreenArgs();
    strScriptForDetailScreen += fnGetCodeForSubSysDependentFlds();
    strScriptForDetailScreen += fnGetCodeForTabDependentFlds();
    strScriptForDetailScreen += fnGetCodeForCallformAsTabs();
    strScriptForDetailScreen += fnGetCodeForActStgArry();
    strScriptForDetailScreen += fnGetCodeForFLD_Image();
    if (funCtgry == "DASHBOARD") {
        strScriptForDetailScreen += fnGetCodeForDashBdLink();
    }
    //strScriptForDetailScreen += fnGetCodeForDashBdLink();
    return strScriptForDetailScreen;
}

function fnGetCopyrightInfo(pstrUserID, pdtCreationDate, pstrFileName, pstrPurpose, pstrCalledFrom) {
    var strCopyrightInfo = "";

    var objDate = new Date();
    var strCurrentYear = objDate.getFullYear();

    strCopyrightInfo += "/***************************************************************************************************************************\r\n";
    strCopyrightInfo += "**  This source is part of the FLEXCUBE Software Product. \r\n";
    strCopyrightInfo += "**  Copyright (c) 2008 ," + strCurrentYear + ", Oracle and/or its affiliates.\r\n";
    strCopyrightInfo += "**  All rights reserved.\r\n";
    strCopyrightInfo += "**  \r\n";
    strCopyrightInfo += "**  No part of this work may be reproduced, stored in a retrieval system, \r\n";
    strCopyrightInfo += "**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, \r\n";
    strCopyrightInfo += "**  graphic, optic recording or otherwise, translated in any language or computer language, \r\n";
    strCopyrightInfo += "**  without the prior written permission of Oracle and/or its affiliates.\r\n";
    strCopyrightInfo += "**  \r\n";
    strCopyrightInfo += "**  Oracle Financial Services Software Limited.\r\n";
    strCopyrightInfo += "**  Oracle Park, Off Western Express Highway,\r\n";
    strCopyrightInfo += "**  Goregaon (East),\r\n";
    strCopyrightInfo += "**  Mumbai - 400 063,\r\n";
    strCopyrightInfo += "**  India.\r\n";
    strCopyrightInfo += "**  \r\n";
    strCopyrightInfo += "**  Written by         : " + pstrUserID + "\r\n";
    strCopyrightInfo += "**  Date of creation   : " + pdtCreationDate + "\r\n";
    strCopyrightInfo += "**  File Name          : " + pstrFileName + "\r\n";
    strCopyrightInfo += "**  Purpose            : " + pstrPurpose + "\r\n";
    strCopyrightInfo += "**  Called From        : " + pstrCalledFrom + "\r\n";
    strCopyrightInfo += "**  \r\n";
    strCopyrightInfo += "**  CHANGE LOG\r\n";
    strCopyrightInfo += "**  Last Modified By   : \r\n";
    strCopyrightInfo += "**  Last modified on   : \r\n";
    strCopyrightInfo += "**  Full Version       : \r\n";
    strCopyrightInfo += "**  Reason             : \r\n";
    strCopyrightInfo += "****************************************************************************************************************************/\r\n";

    return strCopyrightInfo;
}
//----------------------------------------------------------------------------------------------------------------------
//vinit new 
function fnCreateNewChanges(xml) {
    var dataBlksNodesString = "var fieldNameArray = {";
    var funIdType = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FUNCTION_CATEGORY")[0]);

    var procesHederType = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/HEADER_TEMPLATE")[0]);
    var procesFooterType = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FOOTER_TEMPLATE")[0]);
    var processFields = "";

    if (fieldNameArray.length > 0) {
        for (var i = 0;i < fieldNameArray.length;i++) {
            dataBlksNodesString += fieldNameArray[i] + ",";

        }
        if (funIdType == 'REPORT') {
            dataBlksNodesString += "\"BLK_REPORT_OPTIONS\"" + ":" + "\"REPREF~REPFID~FILEPATH~FILENAME~GENMODE~REPFMT~REPOUTPUT~PRINTAT~PRINTER~PARAMNAMES~PARAMVALS~PARAMTYPES\"" + ",";
        }

        if (procesHederType == 'PROCESS') {
            dataBlksNodesString += "\"BLK_REPORT_OPTIONS\"" + ":" + "\"WF_REF_NO~WF_PRTY\"" + ",";

        }

        if (procesFooterType == 'PROCESS' || procesFooterType == 'MAINTPROCESS') {
            if (procesHederType == 'PROCESS') {
                processFields += '~';
            }
            dataBlksNodesString += "\"BLK_REPORT_OPTIONS\"" + ":" + "\"PREV_REMARK~REMARK~AUDIT~OUTCOME\"" + ",";

        }

        dataBlksNodesString = dataBlksNodesString.substring(0, dataBlksNodesString.length - 1) + "};\r\n\n";
    }
    else 
        dataBlksNodesString += "};\r\n\n";

    return dataBlksNodesString;
}

function fnCreateNewChangesmultiblk(xml) {
    var dataBlksNodesString = "";
    var count = 0;
    var f = 0;
    var rowflag = 0;
    var datablocks = new Array();
    var dataBlksNodes = selectNodes(xml, "//RAD_FIELDSETS[ VIEW_TYPE='MULTIPLE' and FIELDSET_VISIBLE='Y']");
    // var dataBlksNodes = selectNodes(xml, "//RAD_FIELDSETS");
    var modified = 0;
    if (dataBlksNodes.length > 0) {
        dataBlksNodesString = "var multipleEntryPageSize = {";
        for (var i = 0;i < dataBlksNodes.length;i++) {
            var flag = true;

            for (var k = 0;k < count;k++) {
                if (datablocks[k] == getNodeText(selectSingleNode(dataBlksNodes[i], "FIELDSET_BLOCK"))) {
                    flag = false;
                    break;
                }

            }

            if (flag) {
                if (selectSingleNode(dataBlksNodes[i], "ROWS_PER_PAGE") != null) {
                    var noperpage = getNodeText(selectSingleNode(dataBlksNodes[i], "ROWS_PER_PAGE"));

                    if (noperpage != "") {
                        datablocks[count] = getNodeText(selectSingleNode(dataBlksNodes[i], "FIELDSET_BLOCK"));

                        dataBlksNodesString += "\"" + getNodeText(selectSingleNode(dataBlksNodes[i], "FIELDSET_BLOCK")) + "\" : \"" + noperpage + " \",";
                        count++;
                    }
                    else {
                        datablocks[count] = getNodeText(selectSingleNode(dataBlksNodes[i], "FIELDSET_BLOCK"));

                        dataBlksNodesString += "\"" + getNodeText(selectSingleNode(dataBlksNodes[i], "FIELDSET_BLOCK")) + "\" :\"15\" ,";
                        count++;
                    }
                    rowflag++;
                }
                else {
                    datablocks[count] = getNodeText(selectSingleNode(dataBlksNodes[i], "FIELDSET_BLOCK"));
                    dataBlksNodesString += "\"" + getNodeText(selectSingleNode(dataBlksNodes[i], "FIELDSET_BLOCK")) + "\" :\"15\" ,";
                    rowflag++;
                    count++;
                }
            }
            modified++;

        }
        if (dataBlksNodesString.length > 0 && modified > 0) {
            if (rowflag != 0)
                dataBlksNodesString = dataBlksNodesString.substring(0, dataBlksNodesString.length - 1) + "};\r\n\n";
            else 
                dataBlksNodesString = dataBlksNodesString.substring(0, dataBlksNodesString.length) + "};\r\n\n";
        }
        else {
            dataBlksNodesString = dataBlksNodesString + "};\r\n\n";
        }
    }

    else {
        dataBlksNodesString = "var multipleEntryPageSize = {};\r\n\n"

    }
    return dataBlksNodesString;
}

function fnCreatemultipleEntrySVBlocks(xml) {
    var f = 0;
    var modified = 0;
    var count = 0;
    var datablocks = new Array();
    var multipleEntrySVBlocks = "";
    var dataFieldsetNodes = selectNodes(xml, "//RAD_FIELDSETS[MULTI_RECORD='Y' and VIEW_TYPE='SINGLE' and FIELDSET_VISIBLE='Y']");
    if (dataFieldsetNodes.length > 0) {
        multipleEntrySVBlocks = "var multipleEntrySVBlocks = "
        for (var i = 0;i < dataFieldsetNodes.length;i++) {
            var flag = true;
            if (f == 0) {
                datablocks[count] = getNodeText(selectSingleNode(dataFieldsetNodes[i], "FIELDSET_BLOCK"));

                multipleEntrySVBlocks += "\"" + getNodeText(selectSingleNode(dataFieldsetNodes[i], "FIELDSET_BLOCK")) + "~";
                f++;
                count++;
            }

            else {
                for (var k = 0;k < count;k++) {
                    if (datablocks[k] == getNodeText(selectSingleNode(dataFieldsetNodes[i], "FIELDSET_BLOCK"))) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    datablocks[count] = getNodeText(selectSingleNode(dataFieldsetNodes[i], "FIELDSET_BLOCK"));

                    multipleEntrySVBlocks += getNodeText(selectSingleNode(dataFieldsetNodes[i], "FIELDSET_BLOCK")) + "~";
                    count++;
                }
            }
            modified++;
        }
        if (multipleEntrySVBlocks.length > 0 && modified > 0) {
            multipleEntrySVBlocks = multipleEntrySVBlocks.substring(0, multipleEntrySVBlocks.length - 1) + "\";\r\n\n";
        }
        else {
            multipleEntrySVBlocks = multipleEntrySVBlocks + "\"\";\r\n\n";
        }
    }
    else {
        multipleEntrySVBlocks = "var multipleEntrySVBlocks = \"\";\r\n\n ";
    }
    return multipleEntrySVBlocks;
}

function fnCreatetabMEBlks(xml) {
    var fnCreatetabMEBlks = "";
    var screenNames = "";
    var tabNames = "";
    var blkNames = "";
    var finalarrayvalue = new Array();
    var datablocks = new Array();
    var count = 0;
    //	var dataFieldsetNodes = selectNodes(xml, "//RAD_FIELDSETS[MULTI_RECORD='Y' and VIEW_TYPE='SINGLE' and FIELDSET_VISIBLE='Y']"); 
    //	 var dataBlksNodes = selectNodes(xml, "//RAD_FIELDSETS[ VIEW_TYPE='MULTIPLE' and FIELDSET_VISIBLE='Y']"); 
    var fieldsetNodes = selectNodes(xml, "//RAD_FIELDSETS[ VIEW_TYPE='MULTIPLE' and FIELDSET_VISIBLE='Y']");
    if (fieldsetNodes.length > 0) {
        fnCreatetabMEBlks = "var tabMEBlks = {\"";
        var j = 0;
        for (var i = 0;i < fieldsetNodes.length;i++) {
            var repeatflag = true;

            for (var k = 0;k < count;k++) {
                if (datablocks[k] == getNodeText(selectSingleNode(fieldsetNodes[i], "FIELDSET_BLOCK"))) {
                    repeatflag = false;
                    break;
                }
            }

            if (repeatflag) {
                datablocks[count] = getNodeText(selectSingleNode(fieldsetNodes[i], "FIELDSET_BLOCK"));
                count++;
            }
            screenNames = getNodeText(selectSingleNode(fieldsetNodes[i], "FIELDSET_SCREEN"));
            tabNames = getNodeText(selectSingleNode(fieldsetNodes[i], "FIELDSET_TAB"));
            blkNames = getNodeText(selectSingleNode(fieldsetNodes[i], "FIELDSET_BLOCK"));
            if (repeatflag) {
                finalarrayvalue[j] = screenNames + "__" + tabNames + "~" + blkNames;
                j++;
            }

        }

        var d1 = "", d2 = "", s1 = "", s2 = "";
        var key = false;
        for (var l = 0;l < finalarrayvalue.length;l++) {
            key = false;
            d1 = finalarrayvalue[l].split("~");
            s = d1[0] + "\":\"";
            s1 = "";
            for (var ln = l;ln < finalarrayvalue.length;ln++) {
                d2 = finalarrayvalue[ln].split("~");

                if (d1[0] == d2[0] && s2.indexOf(d1[0]) ==  - 1) {
                    s1 += d2[1] + "~";
                    key = true;
                }
            }
            if (key)
                s2 += s + s1.substring(0, s1.length - 1) + "\",\"";

        }
        if (s2.length > 1)
            fnCreatetabMEBlks += s2.substring(0, s2.length - 2) + "};\r\n\n";
        else 
            fnCreatetabMEBlks = fnCreatetabMEBlks.substring(0, fnCreatetabMEBlks.length - 1) + "};\r\n\n";

    }

    else 
        fnCreatetabMEBlks = "var tabMEBlks = {};\r\n\n";
    return fnCreatetabMEBlks;
}

function fnGetCriteria() {
    var blindsearchflag = "";
    var summarynode = selectNodes(xml, "//RAD_SUMMARY");
    if (summarynode[0] != null) {
        if (selectSingleNode(summarynode[0], "BLIND_SEARCH") != null)
            blindsearchflag = getNodeText(selectSingleNode(summarynode[0], "BLIND_SEARCH"));
    }

    var criteriastringvalue = "";
    //081214
    criteriastringvalue = "var criteriaSearch  = " + "'" + blindsearchflag + "';\r\n"

    return criteriastringvalue;
}
//old criteria backup
function fnGetCriteriaold() {
    var blindsearchflag = "";
    var summarynode = selectNodes(xml, "//RAD_SUMMARY");
    if (summarynode[0] != null) {
        if (selectSingleNode(summarynode[0], "BLIND_SEARCH") != null)
            blindsearchflag = getNodeText(selectSingleNode(summarynode[0], "BLIND_SEARCH"));
    }

    var criteriastringvalue = "";
    criteriastringvalue = "var blindSearch = " + "'" + blindsearchflag + "';\r\n"

    var criterianode = selectNodes(xml, "//CRITERIA_SEARCH");
    var criteriastring = "";

    for (var i = 0;i < criterianode.length;i++) {
        var criteriaName = getNodeText(selectSingleNode(criterianode[i], "CRITERIA_NAME"));
        var criteriaValue = getNodeText(selectSingleNode(criterianode[i], "CRITERIA_VALUE"));
        criteriastring += "\"" + criteriaName + '~' + criteriaValue + "\",";
    }

    if (!criteriastring == "")
        criteriastringvalue += 'var recommendedCriteria =new Array(' + criteriastring.substring(0, criteriastring.length - 1) + ");" + '\r\n';

    return criteriastringvalue;
}

function fnGetCodeForFCJXML(parrMessage, xml) {
    var strScriptForFCJXML = "";
    funCtgry = getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/FUNCTION_CATEGORY"));
    strScriptForFCJXML += "\r\n";
    strScriptForFCJXML += "//***** Code for criteria Search *****\r\n";
    strScriptForFCJXML += fnGetCriteria();
    strScriptForFCJXML += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    strScriptForFCJXML += "//***** FCJ XML FOR THE SCREEN *****\r\n";
    strScriptForFCJXML += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    strScriptForFCJXML += fnCreateNewChanges(xml);
    strScriptForFCJXML += fnCreateNewChangesmultiblk(xml);
    strScriptForFCJXML += fnCreatemultipleEntrySVBlocks(xml);
    strScriptForFCJXML += fnCreatetabMEBlks(xml);

    //vinit new change
    strScriptForFCJXML += "var msgxml=\"\"; \r\n";

    strScriptForFCJXML += "msgxml += '    <FLD>'; \r\n";
    for (var i = 0;i < parrMessage.length;i++) {
        strScriptForFCJXML += "msgxml += '      " + parrMessage[parrMessage[i]] + "'; \r\n";
    }

    if (funCtgry == "REPORT") {
        if (getNodeText(selectSingleNode(xml, ("//RAD_FUNCTIONS/FUNCTION_ID"))).substring(2, 3) != "C") {
            var mstrBlk = getNodeText(selectSingleNode(xml, ("//RAD_DATA_BLOCKS[MASTER_BLOCK='Y']/BLOCK_NAME")));
            strScriptForFCJXML += "msgxml +='<FN PARENT= \"" + mstrBlk + "\"  RELATION_TYPE=\"1\" TYPE=\"BLK_REPORT_OPTIONS\">REPREF~REPFID~FILEPATH~FILENAME~GENMODE~REPFMT~REPOUTPUT~PRINTAT~PRINTER~PARAMNAMES~PARAMVALS~PARAMTYPES</FN>';\r\n";
        }
    }

    //Process flow changes starts
    var procesHederType = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/HEADER_TEMPLATE")[0]);
    var procesFooterType = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FOOTER_TEMPLATE")[0]);
    var processFields = "";
    if (procesHederType == 'PROCESS') {
        processFields += 'WF_REF_NO~WF_PRTY';
    }

    if (procesFooterType == 'PROCESS' || procesFooterType == 'MAINTPROCESS') {
        if (procesHederType == 'PROCESS') {
            processFields += '~';
        }
        processFields += 'PREV_REMARK~REMARK~AUDIT~OUTCOME';
    }

    if (processFields != "") {
        var processfldlist = "msgxml += '      " + '<FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PROCESS_AUDIT">' + processFields + "</FN>'; \r\n\r\n"
        strScriptForFCJXML += processfldlist;
    }
    // process Flow changes ends
    strScriptForFCJXML += "msgxml += '    </FLD>'; \r\n\r\n";
    //if(funCtgry=="MAINTENANCE"||funCtgry=="TRANSACTION"){
    var mainscr = getNodeText(selectNodes(selectNodes(xml, ("//RAD_SCREENS[MAIN_SCREEN ='Y']"))[0], ("SCREEN_NAME"))[0]);
	var qryReqd_mainscreen = getNodeText(selectNodes(selectNodes(xml, ("//RAD_SCREENS[MAIN_SCREEN ='Y']"))[0], ("SCREEN_QUERYREQ"))[0]);

    strScriptForFCJXML += "var strScreenName = \"" + mainscr + "\";\r\n";
	strScriptForFCJXML += "var qryReqd = \"" + qryReqd_mainscreen + "\";\r\n";
    var txnBranchFldNode = "";

    if (selectSingleNode(xml, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/TXN_BLOCK_NAME") != null) {
        if (getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/TXN_BLOCK_NAME")) != "") {
            var blockname = getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/TXN_BLOCK_NAME"));
            var fieldname = getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/TXN_FIELD_NAME"));
            txnBranchFldNode = blockname + "__" + fieldname;
            if (txnBranchFldNode == "__") {
                txnBranchFldNode = "";
            }
        }
    }
    strScriptForFCJXML += "var txnBranchFld = \"" + txnBranchFldNode + "\" ;\r\n";
	var txnoriginSystem="";
 if (selectSingleNode(xml, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/SRC_BLOCK_NAME") != null) {
        if (getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/SRC_BLOCK_NAME")) != "") {
            var blockname = getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/SRC_BLOCK_NAME"));
            var fieldname = getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/SRC_FIELD_NAME"));
            txnoriginSystem = blockname + "__" + fieldname;
            if (txnoriginSystem == "__") {
                txnoriginSystem = "";
            }
        }
    }
    strScriptForFCJXML += "var originSystem = \"" + txnoriginSystem + "\";\r\n";
    //}
    strScriptForFCJXML += "//----------------------------------------------------------------------------------------------------------------------\r\n"

    return strScriptForFCJXML;
}
//----------------------------------------------------------------------------------------------------------------------
function fnGetScriptForDataBinding(pstrScreenMode) {
    var strScriptForDataBinding = "";
    try {
    funCtgry = getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/FUNCTION_CATEGORY"));
    if (arrDataSrcMapping.length >= 1) {
        strScriptForDataBinding += "//***** CODE FOR DATABINDING *****\r\n";
        strScriptForDataBinding += "//----------------------------------------------------------------------------------------------------------------------\r\n"

        //Code for relationArrary variable
        if (pstrScreenMode == "DETAIL") {
            strScriptForDataBinding += " var relationArray = {";
            for (var i = 0;i < arrDataSrcMapping.length;i++) {
                strScriptForDataBinding += "\"" + arrDataSrcMapping[i] + "\" : \"" + arrDataSrcMapping[arrDataSrcMapping[i]] + "\",";
            }
            // process Flow changes starts 
            var procesHederType = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/HEADER_TEMPLATE")[0]);
            var procesFooterType = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FOOTER_TEMPLATE")[0]);

            if (funCtgry == "REPORT") {
                strScriptForDataBinding += "\"BLK_REPORT_OPTIONS\":\"" + arrDataSrcMapping[0] + '~1' + "\",";
            }
            if (procesHederType == 'PROCESS' || procesFooterType == 'PROCESS' || procesFooterType == 'MAINTPROCESS') {
                strScriptForDataBinding += "\"BLK_PROCESS_AUDIT\":\"" + arrDataSrcMapping[0] + '~1' + "\",";
            }
            strScriptForDataBinding = strScriptForDataBinding.substring(0, (strScriptForDataBinding.length - 1));
            strScriptForDataBinding += "}" + "; \r\n";

            // process Flow changes ends
        }
        else if (pstrScreenMode == "SUMMARY") {
            strScriptForDataBinding += " var relationArray = {";
            strScriptForDataBinding += "\"SUMMARY\":\"" + arrDataSrcMapping[0] + "\"SUMMARY~N\"";
            strScriptForDataBinding += "}" + "; \r\n";
        }
        strScriptForDataBinding += "\r\n"

        //Code for dataSrcLocationArrary variable
        // strScriptForDataBinding += "var dataSrcLocationArray = new Array(); \t";
        if (pstrScreenMode == "DETAIL") {
            strScriptForDataBinding += " var dataSrcLocationArray = new Array(";
            for (var i = 0;i < arrDataSrcMapping.length;i++) {
                strScriptForDataBinding += "\"" + arrDataSrcMapping[i] + "\",";
            }
            // process Flow changes starts 
            var procesHederType = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/HEADER_TEMPLATE")[0]);
            var procesFooterType = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FOOTER_TEMPLATE")[0]);

            if (procesHederType == 'PROCESS' || procesFooterType == 'PROCESS' || procesFooterType == 'MAINTPROCESS') {
                strScriptForDataBinding += "\"BLK_PROCESS_AUDIT\"" + ",";
            }
            if (funCtgry == "REPORT") {
                strScriptForDataBinding += "\"BLK_REPORT_OPTIONS\"" + ",";
            }
            // process Flow changes ends
            strScriptForDataBinding = strScriptForDataBinding.substring(0,(strScriptForDataBinding.length - 1));

            strScriptForDataBinding += "); \r\n // Array of all Data Sources used in the screen \r\n";

        }
        else if (pstrScreenMode == "SUMMARY") {
            strScriptForDataBinding += " var dataSrcLocationArray = new Array(";
            strScriptForDataBinding += "\"" + arrDataSrcMapping[0] + "\""
            strScriptForDataBinding += "); \r\n";
        }
    }
    else {
        strScriptForDataBinding += "//***** CODE FOR DATABINDING *****\r\n";
        strScriptForDataBinding += "//----------------------------------------------------------------------------------------------------------------------\r\n"
        strScriptForDataBinding += " var relationArray = {};\r\n";
        strScriptForDataBinding += " var dataSrcLocationArray = {};\r\n";
    }
    strScriptForDataBinding += "//----------------------------------------------------------------------------------------------------------------------\r\n"

    return strScriptForDataBinding;
}
    catch (e) {
        if (getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/LANDING_PAGE_COMPONENT")) == "Y") {
            strScriptForDataBinding += "//***** CODE FOR DATABINDING *****\r\n";
            strScriptForDataBinding += "//----------------------------------------------------------------------------------------------------------------------\r\n"

            strScriptForDataBinding += "var relationArray = {}" + "; \r\n";
            strScriptForDataBinding += "var dataSrcLocationArray = {}" + "; \r\n";

            return strScriptForDataBinding;
        }
    }
}
//----------------------------------------------------------------------------------------------------------------------
function fnGetCodeForQueryMode(pstrScreenMode) {
    var strCodeForQueryMode = "";

    try{
	if (getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/LANDING_PAGE_COMPONENT")) == "Y") {
        strCodeForQueryMode += "//***** CODE FOR QUERY MODE *****\r\n";
        strCodeForQueryMode += "//----------------------------------------------------------------------------------------------------------------------\r\n"

        strCodeForQueryMode += "var detailRequired = {}" + "; \r\n";
        strCodeForQueryMode += "var intCurrentQueryResultIndex = 0;\r\n"
        strCodeForQueryMode += "var intCurrentQueryRecordCount = 0;\r\n\r\n"
        strCodeForQueryMode += "var queryFields = new Array();    //Values should be set inside " + gFuncid + ".js, in \"BlockName__FieldName\" format\r\n";
        strCodeForQueryMode += "var pkFields    = new Array();    //Values should be set inside " + gFuncid + ".js, in \"BlockName__FieldName\" format\r\n";

        if (pstrScreenMode == "SUMMARY") {
            strCodeForQueryMode += "\r\n";
            strCodeForQueryMode += "var servletURL   = \"MaintenanceServlet\";\r\n";
            strCodeForQueryMode += "var detailFuncId = \"" + gFuncid + "\";\r\n";
            strCodeForQueryMode += "var gErrCodes    = \"\";\r\n";
        }

        return strCodeForQueryMode;
    }
	}catch(e){}

    strCodeForQueryMode += "//***** CODE FOR QUERY MODE *****\r\n";
    strCodeForQueryMode += "//----------------------------------------------------------------------------------------------------------------------\r\n"

    if (getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FUNCTION_CATEGORY")[0]) == 'SUMMARY') {
        strCodeForQueryMode += "var detailRequired = false ;\r\n";
    }
    else {
        strCodeForQueryMode += "var detailRequired = true ;\r\n";
    }
    strCodeForQueryMode += "var intCurrentQueryResultIndex = 0;\r\n"
    strCodeForQueryMode += "var intCurrentQueryRecordCount = 0;\r\n\r\n"
    strCodeForQueryMode += "var queryFields = new Array();    //Values should be set inside " + gFuncid + ".js, in \"BlockName__FieldName\" format\r\n";
    strCodeForQueryMode += "var pkFields    = new Array();    //Values should be set inside " + gFuncid + ".js, in \"BlockName__FieldName\" format\r\n";

    var msterdsn = selectNodes(xml, "//RAD_DATASOURCES[MASTER_DATASRC ='Y']");
    var msterdsnname = getNodeText(selectNodes(selectNodes(xml, "//RAD_DATASOURCES[MASTER_DATASRC ='Y']")[0], "DATASRC_NAME")[0]);
    var pkcols = getNodeText(selectNodes(msterdsn[0], "PK_COLS")[0]);
    var pktypes = getNodeText(selectNodes(msterdsn[0], "PK_TYPES")[0]);
    var msterblock = selectNodes(xml, "//RAD_DATA_BLOCKS[MASTER_BLOCK ='Y']");
    var msterblockName = getNodeText(selectNodes(msterblock[0], "BLOCK_NAME")[0]);
    var msterfields = selectNodes(xml, "//RAD_DATA_BLOCKS[MASTER_BLOCK ='Y']/RAD_BLK_FIELDS");
    var pkData = new Array();

    var fldIndex = 0;
    pkData = pkcols.split("~");
    for (var pkFieldIndex = 0;pkFieldIndex < pkData.length;pkFieldIndex++) {
        for (var j = 0;j < msterfields.length;j++) {
            if (getNodeText(selectNodes(msterfields[j], "DBT")[0]) == msterdsnname) {
                if (getNodeText(selectNodes(msterfields[j], "DBC")[0]) == pkData[pkFieldIndex]) {
                    if (pkData[pkFieldIndex] != '') {
                        strCodeForQueryMode += "queryFields[" + fldIndex + "] = \"" + msterblockName + "__" + getNodeText(selectNodes(msterfields[j], "FIELD_NAME")[0]) + "\";\r\n";
                        strCodeForQueryMode += "pkFields[" + fldIndex + "] = \"" + msterblockName + "__" + getNodeText(selectNodes(msterfields[j], "FIELD_NAME")[0]) + "\";\r\n";
                        fldIndex++;
                    }
                }
            }
        }
    }

    if (pstrScreenMode == "SUMMARY") {
        strCodeForQueryMode += "\r\n";
        strCodeForQueryMode += "var servletURL   = \"MaintenanceServlet\";\r\n";
        strCodeForQueryMode += "var detailFuncId = \"" + gFuncid + "\";\r\n";
        strCodeForQueryMode += "var gErrCodes    = \"\";\r\n";
    }
    strCodeForQueryMode += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    return strCodeForQueryMode;
}
//----------------------------------------------------------------------------------------------------------------------
function fnGetCodeForIncXMLs(pstrIncludedXMLString) {
    var strCodeForIncXMLs = "";
    return strCodeForIncXMLs;
}

//----------------------------------------------------------------------------------------------------------------------
function fnGetCodeForLOVs(pstrLOV) {
    var strCodeForLOVs = "";

    if (pstrLOV != null && typeof (pstrLOV) != "undefined" && trim(pstrLOV) != "") {
        strCodeForLOVs += "\r\n//***** CODE FOR LOVs *****\r\n";
        strCodeForLOVs += "//----------------------------------------------------------------------------------------------------------------------\r\n"
        strCodeForLOVs += pstrLOV;
        strCodeForLOVs += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    }

    return strCodeForLOVs;
}

function fnScriptForSubscreens() {

    // Delete the Call from screens.
    var allScreens = selectNodes(xml, "//RAD_SCREENS[SCREEN_VISIBLE='Y']");
    for (var scrCnt = 0;scrCnt < allScreens.length;scrCnt++) {
        var l_ScrId = allScreens[scrCnt].getAttribute("ID");
        if (!arrParentScr[l_ScrId]) {
            var l_scrNode_toDel = selectSingleNode(xml, "//RAD_SCREENS[@ID = '" + l_ScrId + "']");
            if (l_scrNode_toDel != null)
                l_scrNode_toDel.parentNode.removeChild(l_scrNode_toDel);
        }
    }

    var strScrLaunchScripts = "";
    var screens = selectNodes(xml, "//RAD_SCREENS[SCREEN_VISIBLE='Y']");
    for (var i = 0;i < screens.length;i++) {
        if (getNodeText(selectSingleNode(screens[i], "MAIN_SCREEN")) == 'Y') {
            var mainscrName = getNodeText(selectSingleNode(screens[i], "SCREEN_NAME"));
        }

    }

    var subscreenNodes = selectNodes(xml, "//RAD_SCREENS[SCREEN_NAME !='" + mainscrName + "' and SCREEN_NAME !='SUMMARY']");
    var languageCode = "ENG";

    strScrLaunchScripts += "\r\n/***** Script for subscreen functionalities *****/\r\n";
    for (var i = 0;i < subscreenNodes.length;i++) {
        var subscrName = getNodeText(selectSingleNode(subscreenNodes[i], "SCREEN_NAME"));
        //Code for subscreen launch
        if (selectNodes(xml, "//RAD_FIELD_EVENTS[EVENTTYPE='SUBSCREEN' and SCREEN_NAME='" + subscrName + "']").length > 0) {
            var desc = getNodeText(selectSingleNode(selectSingleNode(xml, "//RAD_SCREENS[SCREEN_NAME='" + subscrName + "']"), "SCREEN_TITLE"));
            strScrLaunchScripts += "\r\nfunction fnShowSubscreen_" + subscrName + "(){\r\n";
            strScrLaunchScripts += "\tscreenArgs = new Array();\r\n";
            strScrLaunchScripts += "\tscreenArgs['SCREEN_NAME'] = '" + subscrName + "';\r\n";
            strScrLaunchScripts += "\tscreenArgs['FUNCTION_ID'] = '" + gFuncid + "';\r\n";
            strScrLaunchScripts += "\tscreenArgs['LANG'] = '" + parent.lang + "';\r\n";
            strScrLaunchScripts += "\tscreenArgs['UI_XML'] = '" + gFuncid + "';\r\n";
            strScrLaunchScripts += "\tappendData(document.getElementById('TBLPage'+strCurrentTabId));\r\n";
            strScrLaunchScripts += "\tscreenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/" + parent.lang + "/" + gFuncid + ".xml',screenArgs['SCREEN_NAME']);\r\n";
            strScrLaunchScripts += "\r\n\tfnShowSubScreen(screenArgs);\r\n}\r\n";
        }

        //Code for save and exit functionalities of subscreens      
        strScrLaunchScripts += "\r\nfunction fnSave_" + subscrName + "(){\r\n";
        strScrLaunchScripts += "\tfnSaveSubScreenData();\r\n}\r\n";

        strScrLaunchScripts += "\r\nfunction fnExit_" + subscrName + "(){\r\n";
        strScrLaunchScripts += "\tfnExitSubScreen();\r\n}\r\n";
    }

    return strScrLaunchScripts;
}

//----------------------------------------------------------------------------------------------------------------------
function fnScriptForTabs() {

    var strTabScripts = "";

    strTabScripts += "//***** SCRIPT FOR TABS *****\r\n"
    strTabScripts += "//----------------------------------------------------------------------------------------------------------------------\r\n";
    var headerTab = '';
    var FooterTab = '';

    var screens = selectNodes(xml, "//RAD_SCREENS[SCREEN_VISIBLE='Y']");
    for (var i = 0;i < screens.length;i++) {
        if (getNodeText(selectSingleNode(screens[i], "MAIN_SCREEN")) == 'Y') {
            var mainscrName = getNodeText(selectSingleNode(screens[i], "SCREEN_NAME"));
        }

    }
    var nodesTab = selectNodes(xml, "//RAD_SCREENS[MAIN_SCREEN ='Y']/HEADER/RAD_TABS[TAB_VISIBLE='Y']");
    if (nodesTab.length > 0) {
        headerTab = nodesTab[0].getAttribute("ID");
        if (headerTab == "") {
            headerTab = 'TAB_HEADER';
        }
    }
    var nodesTab = selectNodes(xml, "//RAD_SCREENS[MAIN_SCREEN ='Y']/FOOTER/RAD_TABS[TAB_VISIBLE='Y']");
    if (nodesTab.length > 0) {
        FooterTab = nodesTab[0].getAttribute("ID");
        if (headerTab == "") {
            FooterTab = 'TAB_FOOTER';
        }
    }
    strTabScripts += "var strHeaderTabId = '" + headerTab + "';\r\n";
    strTabScripts += "var strFooterTabId = '" + FooterTab + "';\r\n";
    //Global variables for Tabs
    var currTab = "";
    if (!arrTabList[0]) {
        currTab = "All";
        strTabScripts += "var strCurrentTabId = '" + currTab + "';\r\n";
    }
    else {
        strTabScripts += "var strCurrentTabId = '" + arrTabList[0] + "';\r\n";
    }
    strTabScripts += "//--------------------------------------------\r\n";

    strTabScripts += "//----------------------------------------------------------------------------------------------------------------------\r\n";

    return strTabScripts;
}

function fnScriptForScreens() {
    var strScreenScripts = "";
    var nodeList = selectNodes(DSO_UI_MASTER, "//FORM/SCREEN[@NAME != 'CVS_MAIN' and @NAME != 'SUMMARY']");
    for (var nodeIndex = 0;nodeIndex < nodeList.length;nodeIndex++) {
        var screenName = nodeList.item(nodeIndex).getAttribute("NAME");
        strScreenScripts += "function fnSave_" + screenName + "()\r\n{";
        strScreenScripts += "\r\n}\r\n";
        strScreenScripts += "function fnExit_" + screenName + "()\r\n{";
        strScreenScripts += "\r\n}\r\n";
    }

    return strScreenScripts;
}

function fnGetCodeForDashBdLink() {
    if (getNodeText(selectSingleNode(xml, ("//RAD_FUNCTIONS/FUNCTION_CATEGORY"))) == "DASHBOARD") {
        var strDashBdLinkScripts = "";
        strDashBdLinkScripts += "//----------------------------------------------------------------------------------------------------------------------\r\n";
        strDashBdLinkScripts += "//***** SCRIPT FOR DashBoard Link *****\r\n"
        strDashBdLinkScripts += "//----------------------------------------------------------------------------------------------------------------------\r\n";
        var mainsumscrName = getNodeText(selectSingleNode(dom, "//RAD_SUMMARY/MAIN_SUMM_SCR"));
        strDashBdLinkScripts += "var mainSummaryScr = '" + mainsumscrName + "';\r\n";
        return strDashBdLinkScripts;
    }
}

function fnScriptForMultipleEntryBlocks(pstrScreenMode) {
    var tempstrMultipleEntryScripts = "";
    var modified = 0;
    var strMultipleEntryScripts = "";
    strMultipleEntryScripts += "//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****\r\n";
    strMultipleEntryScripts += "//----------------------------------------------------------------------------------------------------------------------\r\n";

    //Global variables for Multiple Entry Blocks
    strMultipleEntryScripts += "var multipleEntryIDs = new Array(";
    // strMultipleEntryScripts += "//--------------------------------------------\r\n";
    //Set Multiple Entry Block IDs
    if (pstrScreenMode == "DETAIL") {
        for (var i = 0;i < arrMultipleEntryBlockIDs.length;i++) {
            strMultipleEntryScripts += "\"" + arrMultipleEntryBlockIDs[i] + "\",";
            modified++;
        }

    }
    if (modified > 0) {
        strMultipleEntryScripts = strMultipleEntryScripts.substring(0, (strMultipleEntryScripts.length - 1)) + ");\r\n";
    }
    else {
        strMultipleEntryScripts = strMultipleEntryScripts + ");\r\n";
    }
    strMultipleEntryScripts += "var multipleEntryArray = new Array();\r\n"
    strMultipleEntryScripts += "var multipleEntryCells = new Array();\r\n"
    strMultipleEntryScripts += "//----------------------------------------------------------------------------------------------------------------------\r\n";

    return strMultipleEntryScripts;
}
//----------------------------------------------------------------------------------------------------------------------
function fnScriptForMultipleEntryViewSingleEntry() {
    var strMultipleEntryViewSingleScripts = "";

    strMultipleEntryViewSingleScripts += "//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****\r\n"
    strMultipleEntryViewSingleScripts += "//----------------------------------------------------------------------------------------------------------------------\r\n";
    var strMultipleEntrySingleViewBlks = selectNodes(xml, "//RAD_DATA_BLOCKS[@Type='MULTIPLE' and VIEW_TYPE = 'Single Entry']");
    if (strMultipleEntrySingleViewBlks.length > 0) {
        for (var i = 0;i < strMultipleEntrySingleViewBlks.length;i++) {

            var blockId = strMultipleEntrySingleViewBlks[i].getAttribute("ID");
            var dataSrcId = blockId.substring(4, blockId.length);
            var strSingleViewBlkFields = selectNodes(strMultipleEntrySingleViewBlks[i], "RAD_BLK_FIELDS[FIELD_TYPE = 'BUTTON' and (FIELD_NAME = 'BTN_NEXT_" + blockId.toUpperCase() + "' or FIELD_NAME = 'BTN_PREV_" + blockId.toUpperCase() + "' or FIELD_NAME = 'BTN_ADD_" + blockId.toUpperCase() + "'  or FIELD_NAME = 'BTN_REMOVE_" + blockId.toUpperCase() + "')]");

            if (strSingleViewBlkFields.length > 0) {
                for (var cnt = 0;cnt < strSingleViewBlkFields.length;cnt++) {
                    if (getNodeText(selectSingleNode(strSingleViewBlkFields[cnt], "FIELD_NAME")) == "BTN_NEXT_" + blockId.toUpperCase()) {
                        strMultipleEntryViewSingleScripts += "function fnMoveNext_" + strMultipleEntrySingleViewBlks[i].getAttribute("ID") + "()\r\n{\r\n    appendData(document.getElementById('TBLPage' + strCurrentTabId)); \r\n    displayNextData('" + dataSrcId + "');\r\n}\r\n";
                        strMultipleEntryViewSingleScripts += "//--------------------------------------------\r\n";
                    }
                    if (getNodeText(selectSingleNode(strSingleViewBlkFields[cnt], "FIELD_NAME")) == "BTN_PREV_" + blockId.toUpperCase()) {
                        strMultipleEntryViewSingleScripts += "function fnMovePrev_" + strMultipleEntrySingleViewBlks[i].getAttribute("ID") + "()\r\n{\r\n    appendData(document.getElementById('TBLPage' + strCurrentTabId)); \r\n    displayPrevData('" + dataSrcId + "'); \r\n}\r\n";
                        strMultipleEntryViewSingleScripts += "//--------------------------------------------\r\n";
                    }
                    if (getNodeText(selectSingleNode(strSingleViewBlkFields[cnt], "FIELD_NAME")) == "BTN_ADD_" + blockId.toUpperCase()) {
                        strMultipleEntryViewSingleScripts += "function fnAddRow_" + strMultipleEntrySingleViewBlks[i].getAttribute("ID") + "()\r\n{\r\n    appendData(document.getElementById('TBLPage' + strCurrentTabId));\r\n    disableAllBlockElements('" + blockId + "' , false , true);\r\n    if(selectNodes(xml,getXPathQuery('" + dataSrcId + "')).length > 0);\r\n      dbIndexArray['" + dataSrcId + "'] = dbIndexArray['" + dataSrcId + "']+1;\r\n}\r\n";
                        strMultipleEntryViewSingleScripts += "//--------------------------------------------\r\n";
                    }
                    if (getNodeText(selectSingleNode(strSingleViewBlkFields[cnt], "FIELD_NAME")) == "BTN_REMOVE_" + blockId.toUpperCase()) {
                        strMultipleEntryViewSingleScripts += "function fnDelRow_" + strMultipleEntrySingleViewBlks[i].getAttribute("ID") + "()\r\n{\r\n    appendData(document.getElementById('TBLPage' + strCurrentTabId));\r\n    deleteData('" + dataSrcId + "');\r\n}\r\n";
                        strMultipleEntryViewSingleScripts += "//--------------------------------------------\r\n";
                    }
                }
            }
        }
    }
    return strMultipleEntryViewSingleScripts;
}

function fnScriptForCallform() {

    var strScrLaunchScripts = "";
    var callFormNodes = selectNodes(xml, "//RAD_BLK_FIELDS/RAD_FIELD_EVENTS[EVENTTYPE = 'CALLFORM' ]");

    strScrLaunchScripts += "\r\n/***** Script for call form functionalities *****/\r\n";
    for (var i = 0;i < callFormNodes.length;i++) {
        var funcName = getNodeText(selectSinlgeNode(callFormNodes[i], "FUNCTION_NAME"));
        var callFnId = getNodeText(selectSinlgeNode(callFormNodes[i], "CALLFORM_NAME"));
        var callScreen = getNodeText(selectSinlgeNode(callFormNodes[i], "SCREEN_NAME"));

        //Code for callForm launch
        var fnName = funcName.split("(");
        strScrLaunchScripts += "\r\nfunction " + fnName[0] + "(functionId,ScreenName){\r\n";
        if (callFnId != "" && callScreen != "") {
            strScrLaunchScripts += "\t screenArgs=getOtherScreenArgs(functionId,ScreenName);\r\n";
            strScrLaunchScripts += "\tscreenArgs['SCREEN_NAME'] = ScreenName;\r\n";
            strScrLaunchScripts += "\tscreenArgs['FUNCTION_ID'] = functionId;\r\n";
            strScrLaunchScripts += "\tappendData(document.getElementById('TBLPage'+strCurrentTabId));\r\n";
            strScrLaunchScripts += "\r\n\tfnShowCallForm(screenArgs);\r\n";
        }
        strScrLaunchScripts += "\r\n}\r\n";
    }
    return strScrLaunchScripts;
}

function getCallFormDataSources(callFormNode) {
    var callFormPath = getNodeText(selectSingleNode(callFormNode, "CALLFROM_PATH"));
    var callFormFunctionId = getNodeText(selectSingleNode(callFormNode, "CALLFORM_FUCNTIONID"));
    var callingFrom = "";

    if (callingFrom == 'SYSJS') {
        var callFormRadFile = document.getElementById("RAD_UIGEN__SRC_FOLDER_PATH").value + "\\" + callFormFunctionId + "_RAD.xml";
    }
    else {
        var callFormRadFile = callFormPath + "\\" + callFormFunctionId + "_RAD.xml";
    }

    xmlCallFormRad.async = false;
    xmlCallFormRad.resolveExternals = false;
    xmlCallFormRad = loadXMLFile(callFormRadFile);
    if (xmlCallFormRad.parseError.errorCode != 0) {
        var myErr = xmlCallFormRad.parseError;
        alertMessage("Error in loading XML " + myErr.reason, "E");
    }
    else {
        var DataSrcNodes = selectNodes(xmlCallFormRad, "//RAD_DATA_BLOCKS");
    }

    return DataSrcNodes;
}

function getCallFormParentInfo(callFormNode) {
    var callFormParent = getNodeText(selectSingleNode(callFormNode, "CALLFROM_PARENT"));
    var callFormRelation = getNodeText(selectSingleNode(callFormNode, "CALLFROM_RELATION"));
    var callFormRelType = getNodeText(selectSingleNode(callFormNode, "CALLFORM_RELATION_TYPE"));
    var info = callFormParent + "~" + callFormRelation + "!" + callFormRelType;
    return info;
}

function fnReassignIdsToNodes(nodes) {
    for (var i = 0;i < nodes.length;i++)
        nodes[i].setAttribute("ID", i + 1);
}

function fnAddCallFormScrens() {

    var callFormNodes = selectNodes(dom, "//RAD_FUNCTIONS/RAD_CALLFORM");
    for (var k = 0;k < callFormNodes.length;k++) {

        var screenNodesCallFrm = getCallFormRadScreens(callFormNodes[k]);
        for (var scrnIndex = 0;scrnIndex < screenNodesCallFrm.length;scrnIndex++) {
            //Insert the data source node of the call form in the parent function id's data sources node.
            dom.documentElement.insertBefore(screenNodesCallFrm[scrnIndex], null);
        }
    }

}

function getCallFormRadScreens(callFormNode) {
    var callFormFunctionId = getNodeText(selectSingleNode(callFormNode, "CALLFORM_FUCNTIONID"));
    var callFormPath = getNodeText(selectSingleNode(callFormNode, "CALLFROM_PATH"));
    var callingFrom = "";
    if (callingFrom == 'SYSJS') {
        var callFormRadFile = document.getElementById("RAD_UIGEN__SRC_FOLDER_PATH").value + "\\" + callFormFunctionId + "_RAD.xml";
    }
    else {
        var callFormRadFile = callFormPath + "\\" + callFormFunctionId + "_RAD.xml";
    }

    xmlCallFormRad.async = false;
    xmlCallFormRad.resolveExternals = false;
    xmlCallFormRad = loadXMLFile(callFormRadFile);
    var radScreenNodes;
    if (xmlCallFormRad.parseError.errorCode != 0) {
        var myErr = xmlCallFormRad.parseError;
        alertMessage("Error in loading XML " + myErr.reason, "E");
    }
    else {
        radScreenNodes = selectNodes(xmlCallFormRad, "//RAD_SCREENS[SCREEN_VISIBLE='Y']");
    }
    return radScreenNodes;
}
//vinit
function fnGetCodeForScreenArgs() {

    var strCodeForargName = "";
    var strCodeForargScr = "";
    var strCodeForargDest = "";
    var strCodeForargVals = "";

    var strCodeForScreenArgs = "";

    //obiee
    var screenobiee = selectNodes(xml, "//RAD_SCREENS[SCREEN_VISIBLE='Y' and SCREEN_OBIEE='Y']");

    strCodeForScreenArgs += "\r\n /* Code For OBIEE functionalities */ \r\n";

    strCodeForScreenArgs += "var obScrArgName  = new Array(); \r\n";
    strCodeForScreenArgs += "var obScrArgSource  = new Array(); \r\n";
    for (var cnt = 0;cnt < screenobiee.length;cnt++) {
        var screenName = getNodeText(selectSingleNode(screenobiee[cnt], "SCREEN_NAME"));
        var screenArguments = selectNodes(xml, "//RAD_SCREENS[SCREEN_NAME = '" + screenName + "']/SCREEN_ARGS[ACTIVE='Y']");
        var argName = "";
        var argScr = "";
        if (screenArguments.length > 0) {
            for (var cnt1 = 0;cnt1 < screenArguments.length;cnt1++) {
                if (getNodeText(selectSingleNode(screenArguments[cnt1], "ACTIVE")) == 'Y') {
                    argName += getNodeText(selectSingleNode(screenArguments[cnt1], "SCREEN_ARG_NAME")) + "~";
                    if (getNodeText(selectSingleNode(screenArguments[cnt1], "SRC_BLK")) != "" && getNodeText(selectSingleNode(screenArguments[cnt1], "SRC_FLD")) != "") {
                        argScr += getNodeText(selectSingleNode(screenArguments[cnt1], "SRC_BLK")) + "__" + getNodeText(selectSingleNode(screenArguments[cnt1], "SRC_FLD")) + "~";
                    }
                    else {
                        argScr += "~";
                    }
                }
            }
            argName = argName.substring(0, argName.length - 1);
            argScr = argScr.substring(0, argScr.length - 1);

            strCodeForScreenArgs += "obScrArgName['" + screenName + "'] = \"" + argName + "\";\r\n";
            strCodeForScreenArgs += "obScrArgSource['" + screenName + "'] = \"" + argScr + "\";\r\n";

        }
    }
    strCodeForScreenArgs += "//***** CODE FOR SCREEN ARGS *****\r\n";
    strCodeForScreenArgs += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    //  strCodeForScreenArgs += "var scrArgName = new Array(";
    var screens = selectNodes(xml, "//RAD_SCREENS[SCREEN_VISIBLE='Y' and SCREEN_OBIEE!='Y']");

    for (var cnt = 0;cnt < screens.length;cnt++) {
        var screenName = getNodeText(selectSingleNode(screens[cnt], "SCREEN_NAME"));
        var screenArguments = selectNodes(xml, "//RAD_SCREENS[SCREEN_NAME = '" + screenName + "']/SCREEN_ARGS[ACTIVE='Y']");
        if (screenArguments.length > 0) {
            var argName = "";
            var argScr = "";
            var argscr_val = false;
            var argDest = "";
            var argVals = "";
            for (var cnt1 = 0;cnt1 < screenArguments.length;cnt1++) {
                if (getNodeText(selectSingleNode(screenArguments[cnt1], "ACTIVE")) == 'Y' && getNodeText(selectSingleNode(screenArguments[cnt1], "SCREEN_ARG_NAME")) != "") {
                    argName += getNodeText(selectSingleNode(screenArguments[cnt1], "SCREEN_ARG_NAME")) + "~";
                    if (getNodeText(selectSingleNode(screenArguments[cnt1], "SRC_BLK")) != "" && getNodeText(selectSingleNode(screenArguments[cnt1], "SRC_FLD")) != "") {
                        argScr += getNodeText(selectSingleNode(screenArguments[cnt1], "SRC_BLK")) + "__" + getNodeText(selectSingleNode(screenArguments[cnt1], "SRC_FLD")) + "~";
                        argscr_val = true;
                    }
                    else {
                        argScr += "~";
                    }
                    if (getNodeText(selectSingleNode(screenArguments[cnt1], "TRG_BLK")) != "" && getNodeText(selectSingleNode(screenArguments[cnt1], "TRG_FLD")) != "") {
                        argDest += getNodeText(selectSingleNode(screenArguments[cnt1], "TRG_BLK")) + "__" + getNodeText(selectSingleNode(screenArguments[cnt1], "TRG_FLD")) + "~";
                    }
                    else {
                        argDest += "~";
                    }
                    if (getNodeText(selectSingleNode(screenArguments[cnt1], "SCR_VAL")) != "") {
                        argVals += getNodeText(selectSingleNode(screenArguments[cnt1], "SCR_VAL")) + "~";
                    }
                    else {
                        argVals += "~";
                    }
                }
            }
            argName = argName.substring(0, argName.length - 1);
            argScr = argScr.substring(0, argScr.length - 1);
            argDest = argDest.substring(0, argDest.length - 1);
            argVals = argVals.substring(0, argVals.length - 1);
            // strCodeForScreenArgs += "\""+ screenName + "\":\"" + argName + "\"";
            strCodeForargName += "\"" + screenName + "\":\"" + argName + "\",";
            if (argscr_val)
                strCodeForargScr += "\"" + screenName + "\":\"" + argScr + "\",";
            strCodeForargDest += "\"" + screenName + "\":\"" + argDest + "\",";
            strCodeForargVals += "\"" + screenName + "\":\"" + argVals + "\",";
         }

    }
    var callforms = selectNodes(xml, "//RAD_CALLFORM[CALLFORM_ACTIVE='Y']");
    for (var cnt = 0;cnt < callforms.length;cnt++) {
        var callformName = getNodeText(selectSingleNode(callforms[cnt], "CALLFORM_FUCNTIONID"));
        if (selectSingleNode(callforms[cnt], "SCREEN_ARGS") != null) {
            var callScreenArguments = getNodeText(selectSingleNode(callforms[cnt], "SCREEN_ARGS"));
            var arglist = callScreenArguments.split(":");
            if (arglist) {
                var scrargName = "";
                var scrargScr = "";
                var scrargVal = "";
                for (var cnt1 = 0;cnt1 < arglist.length;cnt1++) {
                    var argArr = arglist[cnt1].split("~");
                    if (argArr[0] != undefined) {
                        scrargName += argArr[0] + "~";
                    }
                    if (argArr[1] != undefined) {
                        if (argArr[1] != "__") {
                            scrargScr += argArr[1] + "~";
                        }
                        else {
                            scrargScr += "~";
                        }
                    }
                    if (argArr[2] != undefined) {
                        scrargVal += argArr[2] + "~";
                    }
                }
                scrargName = scrargName.substring(0, scrargName.length - 1);
                scrargScr = scrargScr.substring(0, scrargScr.length - 1);
                scrargVal = scrargVal.substring(0, scrargVal.length - 1);
                strCodeForargName += "\"" + callformName + "\":\"" + scrargName + "\",";
                strCodeForargScr += "\"" + callformName + "\":\"" + scrargScr + "\",";
                strCodeForargVals += "\"" + callformName + "\":\"" + scrargVal + "\",";
            }
        }
    }
    var launchForms = selectNodes(xml, "//RAD_LAUNCHFORM[LAUNCHFORM_ACTIVE='Y']");
    for (var cnt = 0;cnt < launchForms.length;cnt++) {
        var launchformName = getNodeText(selectSingleNode(launchForms[cnt], "LAUNCHFORM_FUCNTIONID"));
        if (selectSingleNode(launchForms[cnt], "SCREEN_ARGS") != null) {
            var callScreenArguments = getNodeText(selectSingleNode(launchForms[cnt], "SCREEN_ARGS"));
            var arglist = callScreenArguments.split(":");
            if (arglist) {
                var scrargName = "";
                var scrargScr = "";
                var scrargVal = "";
                for (var cnt1 = 0;cnt1 < arglist.length;cnt1++) {
                    var argArr = arglist[cnt1].split("~");
                    if (argArr[0] != undefined) {
                        scrargName += argArr[0] + "~";
                    }
                    if (argArr[1] != undefined) {
                        if (argArr[1] != "__") {
                            scrargScr += argArr[1] + "~";
                        }
                        else {
                            scrargScr += "~";
                        }
                    }

                    if (argArr[2] != undefined) {
                        scrargVal += argArr[2] + "~";
                    }
                }
                scrargName = scrargName.substring(0, scrargName.length - 1);
                scrargScr = scrargScr.substring(0, scrargScr.length - 1);
                scrargVal = scrargVal.substring(0, scrargVal.length - 1);
                strCodeForargName += "\"" + launchformName + "\":\"" + scrargName + "\",";
                strCodeForargScr += "\"" + launchformName + "\":\"" + scrargScr + "\",";
                strCodeForargVals += "\"" + launchformName + "\":\"" + scrargVal + "\",";
            }
        }
    }

    strCodeForScreenArgs += "var scrArgName = {" + strCodeForargName.substring(0, (strCodeForargName.length - 1)) + "};" + "\r\n";
    strCodeForScreenArgs += "var scrArgSource = {" + strCodeForargScr.substring(0, (strCodeForargScr.length - 1)) + "};" + "\r\n";
    strCodeForScreenArgs += "var scrArgVals = {" + strCodeForargVals.substring(0, (strCodeForargVals.length - 1)) + "};" + "\r\n";
    strCodeForScreenArgs += "var scrArgDest = {" + strCodeForargDest.substring(0, (strCodeForargDest.length - 1)) + "};" + "\r\n";
    return strCodeForScreenArgs;
}

function fnGetCodeForSubSysDependentFlds() {

    var strCodeFordpndntOnFlds = "";
    var strCodeFordpndntOnSrvs = "";

    var strCodeForSubSysDependentFlds = "";
    strCodeForSubSysDependentFlds += "//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****\r\n";
    strCodeForSubSysDependentFlds += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    var callforms = selectNodes(xml, "//RAD_CALLFORM[CALLFORM_ACTIVE='Y']");
    for (var cnt = 0;cnt < callforms.length;cnt++) {
        var callformName = getNodeText(selectSingleNode(callforms[cnt], "CALLFORM_FUCNTIONID"));
        if (selectSingleNode(callforms[cnt], "DEPENDENT_ON") != null) {
            var callScreenArguments = getNodeText(selectSingleNode(callforms[cnt], "DEPENDENT_ON"));
            if (callScreenArguments != "") {
                var arglist = callScreenArguments.split(":");
                if (arglist) {
                    var dpndtFlds = "";
                    var dpndtSrvs = "";

                    if (arglist[0] != undefined) {
                        dpndtFlds += arglist[0] + "~";
                    }
                    if (arglist[1] != undefined) {
                        dpndtSrvs += arglist[1] + "~";
                    }
                }
            }
            else {
                dpndtFlds = "";
                dpndtSrvs = "";
            }
            if (dpndtSrvs == "~") {
                dpndtSrvs = "";
            }
            else if (dpndtFlds == "~") {
                dpndtFlds = "";
            }
            dpndtFlds = dpndtFlds.substring(0, dpndtFlds.length - 1);
            dpndtSrvs = dpndtSrvs.substring(0, dpndtSrvs.length - 1);

            strCodeFordpndntOnFlds += "\"" + callformName + "\":\"" + dpndtFlds + "\",";
            strCodeFordpndntOnSrvs += "\"" + callformName + "\":\"" + dpndtSrvs + "\",";

            //   strCodeForSubSysDependentFlds += "dpndntOnFlds['" + callformName + "'] = \"" + dpndtFlds + "\";\r\n";
            //  strCodeForSubSysDependentFlds += "dpndntOnSrvs['" + callformName + "'] = \"" + dpndtSrvs + "\";\r\n";
        }
    }
    strCodeForSubSysDependentFlds += "var dpndntOnFlds = {" + strCodeFordpndntOnFlds.substring(0, (strCodeFordpndntOnFlds.length - 1)) + "};" + "\r\n";
    strCodeForSubSysDependentFlds += "var dpndntOnSrvs = {" + strCodeFordpndntOnSrvs.substring(0, (strCodeFordpndntOnSrvs.length - 1)) + "};" + "\r\n";

    return strCodeForSubSysDependentFlds;
}

function fnGetCodeForTabDependentFlds() {
    var strCodeForTabDependentFlds = "";
    strCodeForTabDependentFlds += "//***** CODE FOR TAB DEPENDENT  FIELDS   *****\r\n";
    strCodeForTabDependentFlds += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    var scrns = selectNodes(xml, "//RAD_SCREENS[SCREEN_VISIBLE='Y']");
    for (var cnt = 0;cnt < scrns.length;cnt++) {
        var scrnName = getNodeText(selectSingleNode(scrns[cnt], "SCREEN_NAME"));
        var tabs = selectNodes(xml, "//RAD_SCREENS[SCREEN_NAME = '" + scrnName + "']/BODY/RAD_TABS[TAB_VISIBLE='Y']");
        for (var cnt1 = 0;cnt1 < tabs.length;cnt1++) {
            if (selectSingleNode(tabs[cnt1], "DEPENDENT_ON") != null) {
                var tabDpndtFlds = getNodeText(selectSingleNode(tabs[cnt1], "DEPENDENT_ON"));
                var dpndtFlds = "";
                var dpndtSrvs = "";
                if (getNodeText(selectSingleNode(tabs[cnt1], "TAB_TYPE")) == "SERVICE") {
                    if (tabDpndtFlds != "") {
                        var arglist = tabDpndtFlds.split(":");
                        if (arglist) {

                            if (arglist[0] != undefined) {
                                dpndtFlds += arglist[0] + "~";
                            }
                            if (arglist[1] != undefined) {
                                dpndtSrvs += arglist[1] + "~";
                            }
                        }
                    }
                    else {
                        dpndtFlds = "";
                        dpndtSrvs = "";
                    }

                    if (dpndtSrvs == "~") {
                        dpndtSrvs = "";
                    }
                    else if (dpndtFlds == "~") {
                        dpndtFlds = "";
                    }
                    var scrTab = scrnName + "__" + getNodeText(selectSingleNode(tabs[cnt1], "TAB_NAME"));
                    dpndtFlds = dpndtFlds.substring(0, dpndtFlds.length - 1);
                    dpndtSrvs = dpndtSrvs.substring(0, dpndtSrvs.length - 1);
                    strCodeForTabDependentFlds += "dpndntOnFlds['" + scrTab + "'] = \"" + dpndtFlds + "\";\r\n";
                    strCodeForTabDependentFlds += "dpndntOnSrvs['" + scrTab + "'] = \"" + dpndtSrvs + "\";\r\n";
                }
            }
        }
    }
    return strCodeForTabDependentFlds;
}

function fnGetCodeForAmendableSubsystem() {
    var strCodeForAmendableSubsys = "";
    strCodeForAmendableSubsys += "//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****\r\n";
    strCodeForAmendableSubsys += "//----------------------------------------------------------------------------------------------------------------------\r\n"

    var amendableNodes = selectNodes(xml, "//RAD_BLK_FIELDS[AMENDABLE_IN != '']");

    var unlockamendArray = new Array();
    var closeamendArray = new Array();
    var reopenamendArray = new Array();
    var reverseamendArray = new Array();
    var deleteAmendArr = new Array();
    var confirmamendArray = new Array();
    var rolloveramendArray = new Array();
    var liquidateamendArray = new Array();
    var queryamendArray = new Array();
    var authorizeamendArray = new Array();
    var subsysArray = new Array();

    for (var cnt = 0;cnt < amendableNodes.length;cnt++) {

        var ActionArr = new Array();
        ActionArr = getNodeText(selectSingleNode(amendableNodes[cnt], "AMENDABLE_IN")).split("~")
        if (ActionArr.length > 0) {
            var fldName = getNodeText(selectSingleNode(amendableNodes[cnt], "FIELD_NAME"));
            var fldType = getNodeText(selectSingleNode(amendableNodes[cnt], "DISPLAY_TYPE"));
            datasrc = getNodeText(selectSingleNode(amendableNodes[cnt].parentNode, "BLOCK_NAME"));
            if (fldType == 'DATE')
                fldName += "I";
            for (var nodeCnt = 0;nodeCnt < ActionArr.length;nodeCnt++) {

                if (ActionArr[nodeCnt] == 'MODIFY') {
                    var count = unlockamendArray.length;
                    unlockamendArray[count] = datasrc + "__" + fldName;
                }
                if (ActionArr[nodeCnt] == 'CLOSE') {
                    var count = closeamendArray.length;
                    closeamendArray[count] = datasrc + "__" + fldName;
                }
                if (ActionArr[nodeCnt] == 'REOPEN') {
                    var count = reopenamendArray.length;
                    reopenamendArray[count] = datasrc + "__" + fldName;
                }
                if (ActionArr[nodeCnt] == 'REVERSE') {
                    var count = reverseamendArray.length;
                    reverseamendArray[count] = datasrc + "__" + fldName;
                }
                if (ActionArr[nodeCnt] == 'DELETE') {
                    var count = deleteAmendArr.length;
                    deleteAmendArr[count] = datasrc + "__" + fldName;
                }
                if (ActionArr[nodeCnt] == 'ROLLOVER') {
                    var count = rolloveramendArray.length;
                    rolloveramendArray[count] = datasrc + "__" + fldName;
                }
                if (ActionArr[nodeCnt] == 'CONFIRM') {
                    var count = confirmamendArray.length;
                    confirmamendArray[count] = datasrc + "__" + fldName;
                }
                if (ActionArr[nodeCnt] == 'LIQUIDATE') {
                    var count = liquidateamendArray.length;
                    liquidateamendArray[count] = datasrc + "__" + fldName;
                }
                if (ActionArr[nodeCnt] == 'QUERY') {
                    var count = queryamendArray.length;
                    queryamendArray[count] = datasrc + "__" + fldName;
                }
                if (ActionArr[nodeCnt] == 'AUTHORIZE') {
                    var count = authorizeamendArray.length;
                    authorizeamendArray[count] = datasrc + "__" + fldName;
                }

            }

        }
    }
	
	unlockamendArray.sort();
    closeamendArray.sort();
    reopenamendArray.sort();
    reverseamendArray.sort();
    deleteAmendArr.sort();
    confirmamendArray.sort();
    rolloveramendArray.sort();
    liquidateamendArray.sort();
    queryamendArray.sort();
    authorizeamendArray.sort();
	
	
    if (unlockamendArray.length > 0) {
        strCodeForAmendableSubsys += "//***** Fields Amendable while Modification *****\r\n";
        strCodeForAmendableSubsys += "var modifyAmendArr = {";
        strCodeForAmendableSubsys += fnFormatAmendableFields(unlockamendArray);
    }
    else 
        strCodeForAmendableSubsys += "var modifyAmendArr = new Array(); \r\n";

    if (closeamendArray.length > 0) {
        strCodeForAmendableSubsys += "//***** Fields Amendable while Close *****\r\n";
        strCodeForAmendableSubsys += "var closeAmendArr = {";
        strCodeForAmendableSubsys += fnFormatAmendableFields(closeamendArray);
    }
    else 
        strCodeForAmendableSubsys += "var closeAmendArr = new Array(); \r\n";

    if (reopenamendArray.length > 0) {
        strCodeForAmendableSubsys += "//***** Fields Amendable while Reopen *****\r\n";
        strCodeForAmendableSubsys += "var reopenAmendArr = {";
        strCodeForAmendableSubsys += fnFormatAmendableFields(reopenamendArray);
    }
    else 
        strCodeForAmendableSubsys += "var reopenAmendArr = new Array(); \r\n";

    if (reverseamendArray.length > 0) {
        strCodeForAmendableSubsys += "//***** Fields Amendable while Reverse *****\r\n";
        strCodeForAmendableSubsys += "var reverseAmendArr = {";
        strCodeForAmendableSubsys += fnFormatAmendableFields(reverseamendArray);
    }
    else 
        strCodeForAmendableSubsys += "var reverseAmendArr = new Array(); \r\n";

    if (deleteAmendArr.length > 0) {
        strCodeForAmendableSubsys += "//***** Fields Amendable while Delete *****\r\n";
        strCodeForAmendableSubsys += "var deleteAmendArr = {";
        strCodeForAmendableSubsys += fnFormatAmendableFields(deleteAmendArr);
    }
    else 
        strCodeForAmendableSubsys += "var deleteAmendArr = new Array(); \r\n";

    if (rolloveramendArray.length > 0) {
        strCodeForAmendableSubsys += "//***** Fields Amendable while Rollover *****\r\n";
        strCodeForAmendableSubsys += "var rolloverAmendArr = {";
        strCodeForAmendableSubsys += fnFormatAmendableFields(rolloveramendArray);
    }
    else 
        strCodeForAmendableSubsys += "var rolloverAmendArr = new Array(); \r\n";

    if (confirmamendArray.length > 0) {
        strCodeForAmendableSubsys += "//***** Fields Amendable while Confirm *****\r\n";
        strCodeForAmendableSubsys += "var confirmAmendArr = {";
        strCodeForAmendableSubsys += fnFormatAmendableFields(confirmamendArray);
    }
    else 
        strCodeForAmendableSubsys += "var confirmAmendArr = new Array(); \r\n";

    if (liquidateamendArray.length > 0) {
        strCodeForAmendableSubsys += "//***** Fields Amendable while Liquidate *****\r\n";
        strCodeForAmendableSubsys += "var liquidateAmendArr = {";
        strCodeForAmendableSubsys += fnFormatAmendableFields(liquidateamendArray);
    }
    else 
        strCodeForAmendableSubsys += "var liquidateAmendArr = new Array(); \r\n";

    if (queryamendArray.length > 0) {
        strCodeForAmendableSubsys += "//***** Fields Amendable while Query *****\r\n";
        strCodeForAmendableSubsys += "var queryAmendArr = {";
        strCodeForAmendableSubsys += fnFormatAmendableFields(queryamendArray);
    }
    else 
        strCodeForAmendableSubsys += "var queryAmendArr = new Array(); \r\n";

    if (authorizeamendArray.length > 0) {
        strCodeForAmendableSubsys += "//***** Fields Amendable while Authorize *****\r\n";
        strCodeForAmendableSubsys += "var authorizeAmenArr = {";
        strCodeForAmendableSubsys += fnFormatAmendableFields(authorizeamendArray);
    }
    else 
        strCodeForAmendableSubsys += "var authorizeAmendArr = new Array(); \r\n";
    strCodeForAmendableSubsys += "//----------------------------------------------------------------------------------------------------------------------\r\n"

    strCodeForAmendableSubsys += "\r\n";
    var subsysNodes = selectNodes(xml, "//RAD_BLK_FIELDS[DBC != ''][SUBSYSTEM_DEPENDANT = 'Y']");
    if (subsysNodes.length > 0) {
        for (var nodeCnt = 0;nodeCnt < subsysNodes.length;nodeCnt++) {
            var fldName = getNodeText(selectSingleNode(subsysNodes[nodeCnt], "FIELD_NAME"));
            var fldType = getNodeText(selectSingleNode(subsysNodes[nodeCnt], "DISPLAY_TYPE"));
            if (fldType == 'DATE')
                fldName += "I";

            datasrc = getNodeText(selectSingleNode(subsysNodes[nodeCnt].parentNode, "BLOCK_NAME"));
            subsysArray[nodeCnt] = datasrc + "__" + fldName;
        }
    }
    if (subsysArray.length > 0) {
        strCodeForAmendableSubsys += "var subsysArr = {";
        strCodeForAmendableSubsys += fnFormatAmendableFields(subsysArray);
    }
    else {
        strCodeForAmendableSubsys += "var subsysArr    = new Array(); \r\n";
        strCodeForAmendableSubsys += "\r\n";
    }

    strCodeForAmendableSubsys += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    return strCodeForAmendableSubsys;
}

function getTranslationQuery(xmlDoc, functionID, language) {
    if (language == "") {
        var language = document.getElementsByName("LANG").value;
    }

    var queryScreens = getScreenLabelsQuery();
    var fieldsetHEADER = getFieldsetLabelsQuery(functionID, "HEADER");
    var fieldsetBODY = getFieldsetLabelsQuery(functionID, "BODY");
    var fieldsetFOOTER = getFieldsetLabelsQuery(functionID, "FOOTER");

    var SectionHEADER = getSectionLabelsQuery(functionID, "HEADER");
    var SectionBODY = getSectionLabelsQuery(functionID, "BODY");
    var SectionFOOTER = getSectionLabelsQuery(functionID, "FOOTER");

    var headerFldlbl = getFieldLabelsQuery(functionID, "HEADER");
    var bodyFldlbl = getFieldLabelsQuery(functionID, "BODY");
    var footerFldlbl = getFieldLabelsQuery(functionID, "FOOTER");

    var HeaderLabels = getTitleQuery(functionID, "HEADER");
    var BodyLabels = getTitleQuery(functionID, "BODY");
    var FooterLabels = getTitleQuery(functionID, "FOOTER");

	var HeaderLabels = getTabsPageFldLabelsQuery(functionID, "HEADER");
    var BodyLabels = getTabsPageFldLabelsQuery(functionID, "BODY");
    var FooterLabels = getTabsPageFldLabelsQuery(functionID, "FOOTER");
	 

    var partitionFieldSetFields = getPartitionFieldSetQuery(functionID);

    var summaryQueryFields = getSummaryFieldLabelsQuery(functionID);

    var summaryButtons = getSummaryButtonLabelsQuery(functionID);
    var query = "WHERE LANGUAGE_CODE = '" + language + "' AND ";
    var queryString = queryScreens + "|" + fieldsetHEADER + "|" + fieldsetBODY + "|" + fieldsetFOOTER + "|" + SectionHEADER + "|" + SectionBODY + "|" + SectionFOOTER + "|" + headerFldlbl + "|" + bodyFldlbl + "|" + footerFldlbl + "|" + summaryQueryFields + "|" + summaryButtons + "|" + HeaderLabels + "|" + BodyLabels + "|" + FooterLabels + "|" + partitionFieldSetFields;//"|" + querySummary +
    var nodes = selectNodes(xmlDoc, "(" + queryString + ")");
    var whereClause = makeWhereClause(functionID, nodes);

    if (whereClause != "") {
        query += "(" + whereClause + ") ";

        return query;

    }
    else 
        return "";
}

function getSectionLabelsQuery(functionID, portion) {
    var predicate = "//FORM/SCREEN/" + portion + "/TAB/SECTION/";
    var tags = new Array("LBL", "ACCESSKEY", "ALT");
    var queryFields = "(" + predicate + tags[0] + ")";

    for (var index = 1;index < tags.length;index++) {
        queryFields += "|" + "(" + predicate + tags[index] + ")";
    }

    return queryFields;
}

function getFieldsetLabelsQuery(functionID, portion) {
    var predicate = "//FORM/SCREEN/" + portion + "/TAB/SECTION/PART/FLDSET/";
    var tags = new Array("LBL", "ACCESSKEY", "ALT");
    var queryFields = "(" + predicate + tags[0] + ")";

    for (var index = 1;index < tags.length;index++) {
        queryFields += "|" + "(" + predicate + tags[index] + ")";
    }

    return queryFields;
}

function getFieldLabelsQuery(functionID, portion) {
    var predicate = "//FORM/SCREEN/" + portion + "/TAB/SECTION/PART/FLDSET/FIELD/";
    var tags = new Array("LBL", "ACCESSKEY", "ALT", "LEGEND", "POPUPEDIT/TITLE", "OPTION", "OPTION/LBL", "LOV/COL_HEADING", "LOV/REDUCTION_FLD_LABELS", "LOV/TITLE", "FIELD/LBL", "FIELD/OPTION", "FIELD/OPTION/LBL", "FIELD/ACCESSKEY", "FIELD/ALT", "FIELD/LEGEND", "FIELD/POPUPEDIT/TITLE", "FIELD/LOV/COL_HEADING", "FIELD/LOV/REDUCTION_FLD_LABELS", "FIELD/LOV/TITLE", "VALUE", "FIELD/VALUE");

    var queryFields = "(" + predicate + tags[0] + ")";

    for (var index = 1;index < tags.length;index++) {
        queryFields += "|" + "(" + predicate + tags[index] + ")";
    }

    return queryFields;
}
function getTabsPageFldLabelsQuery(functionID, portion){
	var predicate = "//FORM/SCREEN/" + portion + "/FLDSET/FIELD/";
    var tags = new Array("LBL", "ACCESSKEY", "ALT", "LEGEND", "POPUPEDIT/TITLE", "OPTION", "OPTION/LBL", "LOV/COL_HEADING", "LOV/REDUCTION_FLD_LABELS", "LOV/TITLE", "FIELD/LBL", "FIELD/OPTION", "FIELD/OPTION/LBL", "FIELD/ACCESSKEY", "FIELD/ALT", "FIELD/LEGEND", "FIELD/POPUPEDIT/TITLE", "FIELD/LOV/COL_HEADING", "FIELD/LOV/REDUCTION_FLD_LABELS", "FIELD/LOV/TITLE", "VALUE", "FIELD/VALUE");

    var queryFields = "(" + predicate + tags[0] + ")";

    for (var index = 1;index < tags.length;index++) {
        queryFields += "|" + "(" + predicate + tags[index] + ")";
    }

    return queryFields;
}
function getTitleQuery(functionID, portion) {
    var predicate = "//FORM/SCREEN/" + portion + "/TAB/";
    var tags = new Array("LBL");

    var blockTitle = "(" + predicate + tags[0] + ")";

    for (var index = 1;index < tags.length;index++) {
        blockTitle += "|" + "(" + predicate + tags[index] + ")";
    }

    return blockTitle;
}

function getPartitionFieldSetQuery(functionID) {
    var predicate = "//FORM/SCREEN/TAB/PAGE/SECTION/PARTITION/";
    var tags = new Array("LBL");
    var blockTitle = "(" + predicate + tags[0] + ")";
    return blockTitle;
}

function getSummaryFieldLabelsQuery(functionID) {
    var predicate = "//FORM/SUMMARY/SUMBLOCK/";
    var tags = new Array("FIELD/LBL", "FIELD/POPUPEDIT/TITLE", "FIELD/OPTION", "FIELD/OPTION/LBL", "FIELD/LOV/COL_HEADING", "FIELD/LOV/REDUCTION_FLD_LABELS", "LEGENDS/LBL", "LEGENDS/OPTION");

    var summaryQueryFields = "(//FORM/SUMMARY/@TITLE)|(" + predicate + tags[0] + ")";

    for (var index = 1;index < tags.length;index++) {
        summaryQueryFields += "|" + "(" + predicate + tags[index] + ")";
    }

    return summaryQueryFields;
}

function getSummaryButtonLabelsQuery(functionID) {
    var predicate = "//FORM/SUMMARY/";
    var tags = new Array("SUMBUTTONS/BUTTON/BUTTON_LBL");

    var summaryButtons = "(" + predicate + tags[0] + ")";

    for (var index = 1;index < tags.length;index++) {
        summaryButtons += "|" + "(" + predicate + tags[index] + ")";
    }

    return summaryButtons;
}

function getScreenLabelsQuery() {

    var predicate = "//FORM/SCREEN/";
    var tags = new Array("@TITLE", "HEADER/TAB/ACCESSKEY", "HEADER/TAB/LBL", "BODY/TAB/LBL", "FOOTER/TAB/LBL", "SUBSCREEN/FORM/LBL");

    var queryScreens = "(" + predicate + tags[0] + ")";

    for (var index = 1;index < tags.length;index++) {
        queryScreens += "|" + "(" + predicate + tags[index] + ")";
    }
    return queryScreens;

}

function getLovLabelsQuery() {
    var lovNodes = selectNodes(dom, "//RAD_LOV_DETAILS");
    labels = ",";
    for (var index = 1;index < lovNodes.length;index++) {
        if (getNodeText(selectSingleNode(lovNodes[index], "COL_HEADING")) != "") {
            labels += "'" + getNodeText(selectSingleNode(lovNodes[index], "COL_HEADING")) + "'" + ",";
        }
    }

    return labels.substring(0, labels.length - 1);
}

function translateUIXML(xmlDoc, funcid, lang, Datscr, request) {
    if (funcid == "") {
        gFuncid = document.getElementById("FUNCTION_ID").value;
    }
    else {
        gFuncid = funcid;
    }
    var functionID = gFuncid;
    if (lang == "") {
        var language = document.getElementById("LANG").value;
    }
    else {
        var language = lang;
    }
    var translationQuery = getTranslationQuery(xmlDoc, functionID, language);
    if (translationQuery == "")
        return xmlDoc;

    if (Datscr == "") {
        DataSrc = parent.jndiName;
    }
    else {
        DataSrc = Datscr;
    }

    parent.gReqCode = 'UICONTROLLER';
    parent.gReqType = "APP";
    var radReqDOM = parent.buildRADXml();
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R006" + parent.gBodySeparator + translationQuery, "RADClientHandler");
    var responseXML = response;
    var error = selectSingleNode(responseXML, "/ROOT/ERROR");
    if (error != null) {
        return xmlDoc;
    }
    if (request == "LBLS") {
        return getXMLString(responseXML);
    }
    if (getXMLString(responseXML) != "") {

        if (getNodeText(selectSingleNode(responseXML, "/ROOT")) != "null") {
            var labelCodes = getNodeText(selectSingleNode(responseXML, "/ROOT/LABEL_CODES")).split("~");
            var labelTexts = getNodeText(selectSingleNode(responseXML, "/ROOT/LABEL_TEXTS")).split("~");
            if (preview1 != undefined && !preview1) {
                var respLBL = getNodeText(selectSingleNode(responseXML, "/ROOT/LABEL_CODES")) + "~";
                var strtIndex = translationQuery.indexOf("LBL_");
                var endIndex = translationQuery.indexOf("')");
                var lblsArr = translationQuery.substring(strtIndex, endIndex).split("','");
                var noLblDesc = "";
                for (var i = 0;i < lblsArr.length;i++) {
                    if (respLBL.indexOf(lblsArr[i] + "~") ==  - 1)
                        noLblDesc += lblsArr[i] + "~";
                }

                if (noLblDesc != "") {
                    writeLog("No Maintenance For Label Codes.. ", "");
                    noLblDesc = noLblDesc.split("~");
                    for (j = 0;j < noLblDesc.length;j++) {
                        writeLog(noLblDesc[j], "");
                    }
                    writeLog("", "E");
                }

            }

            for (var i = 0;i < labelCodes.length;i++) {

                try {
                    var nodes = selectNodes(xmlDoc, "(//LOV/REDUCTION_FLD_LABELS[normalize-space(text())='" + labelCodes[i] + "'])|(//LOV/COL_HEADING[normalize-space(text())='" + labelCodes[i] + "'])|(//LBL[normalize-space(text())='" + labelCodes[i] + "']) | (//LEGEND[normalize-space(text())='" + labelCodes[i] + "']) | (//OPTION[normalize-space(text())='" + labelCodes[i] + "']) | (//@TITLE[(.) ='" + labelCodes[i] + "']) | (//TITLE[normalize-space(text())='" + labelCodes[i] + "']) | (//BUTTON_LBL[normalize-space(text())='" + labelCodes[i] + "']) | (//FIELD/VALUE[text()='" + labelCodes[i] + "'])");
                }
                catch (e) {
                    var nodes = selectNodes(xmlDoc, "(//LOV/REDUCTION_FLD_LABELS[text()='" + labelCodes[i] + "'])|(//LOV/COL_HEADING[text()='" + labelCodes[i] + "'])|(//LBL[text()='" + labelCodes[i] + "']) | (//LEGEND[text()='" + labelCodes[i] + "']) | (//OPTION[text()='" + labelCodes[i] + "']) | (//@TITLE[(.) ='" + labelCodes[i] + "']) | (//TITLE[text()='" + labelCodes[i] + "']) | (//BUTTON_LBL[text()='" + labelCodes[i] + "']) | (//FIELD/VALUE[text()='" + labelCodes[i] + "'])");
                }
                for (var j = 0;j < nodes.length;j++) {
                    if (labelTexts[i] != 'null') {
                        setNodeText(nodes[j], labelTexts[i]);
                    }
                    else {
                        setNodeText(nodes[j], "");
                    }
                }
            }
        }
    }

    return xmlDoc;
}

function fnGetTranslatedXml(lang, xmlStr, funcid, Datscr) {

    var tmpDom = "";;
    tmpDom = xmlStr;

    var newdom = translateUIXML(tmpDom, funcid, lang, Datscr, "");
    return fntransferRadFld(newdom);

}

function fnSaveEngXml(fileSavePath, uixml, preview, funcid, lang, Datscr) {
    preview1 = preview;
    var funcorg = parent.relType;

    var transXml = fnGetTranslatedXml(lang, uixml, funcid, Datscr);

    return getXMLString(transXml);
}

function fnGetCodeForFCJXMLForSummary(xml) {

    var uixmlResultFldsOrder = "";
    var rsltDS = getNodeText(selectSingleNode(xml, "//RAD_SUMMARY/RSLT_DATABLK"));

    var nodesDatasource = selectSingleNode(xml, "//RAD_DATA_BLOCKS[BLOCK_NAME = '" + rsltDS + "']");
    var parentDSrc = getNodeText(selectSingleNode(nodesDatasource, "BLOCK_PARENT"));
    var sumnodes = selectNodes(xml, "//RAD_SUMMARY/SUMMARY_DETAILS");
    var strFieldList = "";
    var fldLstArray = new Array();

    var k = 0;
    for (var j = 0;j < sumnodes.length;j++) {
        // The field is present in a data block
        if (selectNodes(xml, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + rsltDS + "']/RAD_BLK_FIELDS[FIELD_NAME = '" + getNodeText(selectNodes(sumnodes[j], "FIELD_NAME")[0]) + "'and (ITEM_TYPE='DBITEM' or ITEM_TYPE='DESC')]").length > 0) {
            var fldDbc = getNodeText(selectSingleNode(sumnodes[j], "FIELD_NAME"));
            if (!fldLstArray[fldDbc]) {
                fldLstArray[k] = fldDbc;
                fldLstArray[fldDbc] = 1;
                k++;
            }
        }
    }
    for (var l = 0;l < k;l++) {
        strFieldList = strFieldList + fldLstArray[l] + "~";
    }

    var auditFlds = "";
    if (getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FOOTER_TEMPLATE")[0]) == 'MAINTAUDIT') {
        auditFlds = "AUTHSTAT~TXNSTAT~";
    }
    strFieldList = auditFlds + strFieldList;

    var strFieldListPrefix = '<FN ';
    strFieldListPrefix += 'PARENT="' + parentDSrc + '" ';
    strFieldListPrefix += 'RELATION_TYPE="' + getNodeText(selectSingleNode(nodesDatasource, "RELATION_TYPE")) + '" ';
    strFieldListPrefix += 'TYPE="' + rsltDS + '">';
    var strFieldListSuffix = "</FN>";
    strFieldList = strFieldListPrefix + strFieldList.substring(0, strFieldList.length - 1) + strFieldListSuffix;

    try {
        strFieldList = replaceAllChar(strFieldList, '\n', ' ');
    }
    catch (e) {
        strFieldList = strFieldList;
    }

    var strScriptForFCJXML = "";
    strScriptForFCJXML += "\r\n";
    strScriptForFCJXML += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    strScriptForFCJXML += "//***** FCJ XML FOR SUMMARY SCREEN *****\r\n";
    strScriptForFCJXML += "//----------------------------------------------------------------------------------------------------------------------\r\n"
    strScriptForFCJXML += "var msgxml_sum=\"\"; \r\n";
    strScriptForFCJXML += "msgxml_sum += '    <FLD>'; \r\n";
    strScriptForFCJXML += "msgxml_sum += '      " + strFieldList + "'; \r\n";
    strScriptForFCJXML += "msgxml_sum += '    </FLD>'; \r\n";

    return strScriptForFCJXML;
}

function makeWhereClause(functionID, nodes) {
    var whereClause = "";
    var labelCodes = new Array();

    if (nodes.length > 0) {
        whereClause = "( LABEL_CODE IN (";

        for (var index = 0;index < nodes.length;index++) {

            if (getNodeText(nodes[index]) == '' || ((getNodeText(nodes[index])).substring(0, 4)) != "LBL_")
                continue;
            var label = getNodeText(nodes[index]);
            //if already added to where clause do not add again
            if (label != '') {
                var labels = label.split('~');
                if (labels.length > 0) {
                    for (var i = 0;i < labels.length;i++) {
                        if (labelCodes[labels[i]] == undefined) {
                            labelCodes[labels[i]] = "";
                            whereClause += "'" + labels[i] + "',";
                        }
                    }
                }
            }
        }
        var lovLabels = "";
        if (dom && selectNodes(dom, "//RAD_LOV_DETAILS").length > 0)
            lovLabels = getLovLabelsQuery();
        whereClause = whereClause.substring(0, whereClause.length - 1) + lovLabels + ") )";
    }

    return whereClause;
}

function fnScriptForAttachedCallforms() {
    var strCallformScript = '';
    var tempStr = '';
    var modified = 0;
    var callFormNodes = selectNodes(xml, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_CALLFORM[CALLFORM_ACTIVE='Y']");
    //vinit
    strCallformScript += "\r\n//----------------------------------------------------------------------------------------------------------------------";
    strCallformScript += "\r\n//***** SCRIPT FOR ATTACHED CALLFORMS *****";
    strCallformScript += "\r\n //----------------------------------------------------------------------------------------------------------------------";
    strCallformScript += '\r\n';
    strCallformScript += '\r\n var CallFormArray= new Array(';

    for (var index = 0;index < callFormNodes.length;index++) {
        strCallformScript += "\"" + getNodeText(selectSingleNode(callFormNodes[index], "CALLFORM_FUCNTIONID")) + "~" + getNodeText(selectSingleNode(callFormNodes[index], "CALLFORM_PARENT_BLOCK")) + "\",";
        modified++;
    }
    if (modified > 0)
        strCallformScript = strCallformScript.substring(0, (strCallformScript.length - 1));
    strCallformScript += ")" + "; \r\n";
    modified = 0;
    strCallformScript += '\r\n var CallFormRelat=new Array(';
    for (var index = 0;index < callFormNodes.length;index++) {
        strCallformScript += "\"" + getNodeText(selectSingleNode(callFormNodes[index], "CALLFORM_RELATION")) + '",';
        modified++;
    }
    if (modified > 0)
        strCallformScript = strCallformScript.substring(0, (strCallformScript.length - 1));
    strCallformScript += ")" + "; \r\n";
    modified = 0;
    strCallformScript += '\r\n var CallRelatType= new Array(';
    for (var index = 0;index < callFormNodes.length;index++) {
        strCallformScript += "\"" + getNodeText(selectSingleNode(callFormNodes[index], "CALLFORM_RELATION_TYPE")) + '",';
        modified++;
    }
    if (modified > 0)
        strCallformScript = strCallformScript.substring(0, (strCallformScript.length - 1));
    strCallformScript += ")" + "; \r\n";
    modified = 0;
    strCallformScript += '\r\n';

    var callFormList = "";
    var function_id = "";

    for (var i = 0;i < callFormNodes.length;i++) {
        callFormList += getNodeText(selectSingleNode(callFormNodes[i], "CALLFORM_FUCNTIONID")) + "~"

    }

    function_id = getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/FUNCTION_ID"));
	 try{
	var par = getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/PARENT_FUNC_ID"));
    var parOrgin = getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/PARENT_ORIGIN"));
	}
	catch(e){
	var par ="";
	var parOrgin =""; 
    } 
    var M_Cluster = getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/MODIFIED_IN_CLUSTER"));
    var M_Custom = getNodeText(selectSingleNode(xml, "//RAD_FUNCTIONS/MODIFIED_IN_CUSTOM"));

    var inValues = function_id + "!" + callFormList
    try {
        var Datscr = parent.opener.jndiName;
    }
    catch (e) {
        var Datscr = parent.jndiName;
    }
    strCallformScript += '\r\n var ArrFuncOrigin=new Array();';
    strCallformScript += '\r\n var ArrPrntFunc=new Array();';
    strCallformScript += '\r\n var ArrPrntOrigin=new Array();';
    strCallformScript += '\r\n var ArrRoutingType=new Array();\r\n\r\n';
    strCallformScript += '\r\n // Code for Loading Cluster/Custom js File Starts';
    strCallformScript += '\r\n var ArrClusterModified=new Array();';
    strCallformScript += '\r\n var ArrCustomModified=new Array();';
    strCallformScript += '\r\n // Code for Loading Cluster/Custom js File ends\r\n\r\n';

    var funcorg = getNodeText(selectNodes(xml, "//RAD_FUNCTIONS/FUNCTION_ORIGIN")[0]);
    strCallformScript += 'ArrFuncOrigin["' + gFuncid + '"]="' + funcorg + '";\r\n';
    strCallformScript += 'ArrPrntFunc["' + gFuncid + '"]="' + par + '";\r\n';
    if (par != '') {
        strCallformScript += 'ArrPrntOrigin["' + gFuncid + '"]="' + parOrgin + '";\r\n';
    }
    else {
        strCallformScript += 'ArrPrntOrigin["' + gFuncid + '"]="";\r\n';
    }

    strCallformScript += 'ArrRoutingType["' + gFuncid + '"]="' + "X" + '";\r\n\r\n';
    strCallformScript += '\r\n // Code for Loading Cluster/Custom js File Starts';

    if (M_Cluster == "Y") {
        strCallformScript += '\r\nArrClusterModified["' + gFuncid + '"]="Y";';
    }
    else {
        strCallformScript += '\r\nArrClusterModified["' + gFuncid + '"]="N";';
    }
    if (M_Custom == "Y") {
        strCallformScript += '\r\nArrCustomModified["' + gFuncid + '"]="Y";\r\n';
    }
    else {
        strCallformScript += '\r\nArrCustomModified["' + gFuncid + '"]="N";\r\n';
    }
    strCallformScript += '\r\n // Code for Loading Cluster/Custom js File ends\r\n\r\n';

    return strCallformScript;
}

function fnGetCodeForCallformAsTabs() {
    var strCallformAsTabScript = "";
    var callFormNodes = selectNodes(xml, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_CALLFORM[CALLFORM_DISPLAY_TYPE!='BUTTON']");
    strCallformAsTabScript += "//***** CODE FOR CALLFORM TABS *****\r\n";
    strCallformAsTabScript += "//----------------------------------------------------------------------------------------------------------------------\r\n";
    strCallformAsTabScript += "var callformTabArray = new Array(); \r\n";

    var mainScrname = getNodeText(selectNodes(xml, "//RAD_SCREENS[MAIN_SCREEN ='Y']/SCREEN_NAME")[0]);
    for (var index = 0;index < callFormNodes.length;index++) {
        var cfDispType = getNodeText(selectSingleNode(callFormNodes[index], 'CALLFORM_DISPLAY_TYPE'));
        var callformFuncId = getNodeText(selectSingleNode(callFormNodes[index], 'CALLFORM_FUCNTIONID'));
		 
        strCallformAsTabScript += 'callformTabArray["' + mainScrname + '__' + cfDispType + '"] = "' + callformFuncId + '";\r\n';
    }
    return strCallformAsTabScript;

}

function fnGetCodeForActStgArry() {
    var stractStgScript = "";
    var modified = 0;
    var actionNodes = selectNodes(xml, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS/RAD_ACTION");
    stractStgScript += "//***** CODE FOR ACTION STAGE DETAILS *****\r\n";
    stractStgScript += "//----------------------------------------------------------------------------------------------------------------------\r\n";
    stractStgScript += "var actStageArry = {";

    for (var index = 0;index < actionNodes.length;index++) {
        var actCode = getNodeText(selectSingleNode(actionNodes[index], 'ACTION_CODE'));
        var actStgVal = getNodeText(selectSingleNode(actionNodes[index], 'ACTION_STAGE_TYPE'));
        stractStgScript += "\"" + actCode + "\":\"" + actStgVal + "\",";
        modified++;
    }
    if (modified > 0)
        stractStgScript = stractStgScript.substring(0, (stractStgScript.length - 1)) + "};\r\n";
    else 
        stractStgScript += "};\r\n";
    return stractStgScript;
}

function fnFormatAmendableFields(m_Array) {
    var blockName = "";
    var strTemp = "";
    for (var j = 0;j < m_Array.length;j++) {
        var temp = m_Array[j].split("__");
        var block = temp[0];
        var field = temp[1];
        if (blockName != block) {
            blockName = block;
            if (j == 0)
                strTemp += "\"" + block + "\":[";
            else {
                strTemp = strTemp.substring(0, strTemp.length - 1);
                strTemp += "],\"" + block + "\":[";
            }
        }
        strTemp += "\"" + field + "\",";
    }
    strTemp = strTemp.substring(0, strTemp.length - 1);
    strTemp += "]};";
    return strTemp + "\r\n";
}

function fnGetCodeForFLD_Image() {

    var stractStgScript = "";
    var fld_mages = selectNodes(xml, "//RAD_FIELDSETS[FIELDSET_TYPE ='ImageSet' and FIELDSET_VISIBLE='Y']");
    // int length = fld_mages.length;
    stractStgScript += "//***** CODE FOR IMAGE FLDSET *****\r\n";
    stractStgScript += "//----------------------------------------------------------------------------------------------------------------------\r\n";
    var tablength = new Array();
    var flag = true;
    var k = 0;
    for (var i = 0;i < fld_mages.length;i++) {
        flag = true;
        for (var j = 0;j < tablength.length;j++) {
            if (tablength[j] == getNodeText(selectSingleNode(fld_mages[i], "FIELDSET_TAB"))) {
                flag = false;
                break;
            }

        }
        if (flag) {
            tablength[k] = getNodeText(selectSingleNode(fld_mages[i], "FIELDSET_TAB"));
            k++;
        }

    }
    for (var m = 0;m < k;m++) {
        var c = 0;
        for (var i = 0;i < fld_mages.length;i++) {
            if (getNodeText(selectSingleNode(fld_mages[i], "FIELDSET_TAB")) == tablength[m]) {
                if (c == 0) {
                    stractStgScript += 'var imageFldset_' + getNodeText(selectSingleNode(fld_mages[i], "FIELDSET_TAB")) + '= new Array(); \r\n';
                    stractStgScript += 'imageFldset_' + getNodeText(selectSingleNode(fld_mages[i], "FIELDSET_TAB")) + '[' + c + ']="' + getNodeText(selectSingleNode(fld_mages[i], "FIELDSET_TAB")) + "__" + getNodeText(selectSingleNode(fld_mages[i], "FIELDSET_SECTION")) + "__" + getNodeText(selectSingleNode(fld_mages[i], "FIELDSET_PARTITION")) + "__" + getNodeText(selectSingleNode(fld_mages[i], "FIELDSET_NAME")) + '";\r\n';
                }
                else 
                    stractStgScript += 'imageFldset_' + getNodeText(selectSingleNode(fld_mages[i], "FIELDSET_TAB")) + '[' + c + ']="' + getNodeText(selectSingleNode(fld_mages[i], "FIELDSET_TAB")) + "__" + getNodeText(selectSingleNode(fld_mages[i], "FIELDSET_SECTION")) + "__" + getNodeText(selectSingleNode(fld_mages[i], "FIELDSET_PARTITION")) + "__" + getNodeText(selectSingleNode(fld_mages[i], "FIELDSET_NAME")) + '";\r\n';

                c++;
            }
        }
    }
    return stractStgScript;

}