/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadGenerate.js
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
var Spc_Sql = "MAIN_SPC~MAIN_SQL~KERNEL_SPC~KERNEL_SQL~CLUSTER_SPC~CLUSTER_SQL~CUSTOM_SPC~CUSTOM_SQL~CUSTOMER_SPC~CUSTOMER_SQL~UPLOAD_SPC~UPLOAD_SQL"
Spc_Sql = Spc_Sql.split("~");
var gen_gwinFuncId = parent.gen_gwinFuncId;
var function_id = '';
var fileNodes = "RAD_XML~MAIN_SPC~MAIN_SQL~KERNEL_SPC~KERNEL_SQL~CLUSTER_SPC~CLUSTER_SQL~CUSTOM_SPC~CUSTOM_SQL~CUSTOMER_SPC~CUSTOMER_SQL~XSD_FILES~XSD_ANNOTATED~LABEL_XML~UIXML~SYS_JS~EXCEL_TEMPLATE~SCREEN_HTMLS~MENU_DETAILS~LABEL_DETAILS~AMEND_DETAILS~SUMMARY_DETAILS~SCREEN_DETAILS~LOV_DETAILS~BLOCK_PK_COLS~CALL_FORM_DETAILS~BLOCK_DETAILS~DATASCR_DETAILS~FUNCTION_CALL_FORMS~GATEWAY_DETAILS~VARIABLE_MAPPING~NOTIFICATION_DETAILS~FUNCTION_PARAMETERS~NOTIFICATION_TRIGGER~PURGE_DETAILS~UPLOAD_SPC~UPLOAD_SQL~UPLOAD_TRIGGER~UPLOAD_TABLE_DDL~ARCHIVE_TBL_DEF~ELCM_METADATA_CLASS~ELCM_DTO_CLASS~ELCM_ENTITY_CLASS~ELCM_MAIN_CLASS~ELCM_DAO_CLASS~ELCM_ENTITY_ASSEMBLER~CLUSTER_CLASS~CUSTOM_CLASS~XSD_DETAILS";
fileNodes = fileNodes.split("~");

function createxml() {
    parent.parent.gReqType = "GEN";
    var operation = parent.document.getElementsByName("OPERATION")[0].value;
    parent.debug('In createxml for ' + operation);
    if (operation == "RELEASE") {
        parent.parent.gReqCode = "RELEASE";
    }
    else {
        parent.parent.gReqCode = "GENERATE";
    }

    try {
        function_id = parent.document.getElementsByName("FUNCTION_ID")[0].value;
    }
    catch (e) {
    }
    parent.parent.gIsSummary = 0;
    parent.parent.gAction = "";
    gReleaseCode = parent.parent.relCode;
    parent.gSubFolder = "";
    var radReqDOM = parent.parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");

    try {
        var elcm_function = "";
        if (parent.document.getElementById("ELCM_FUNCTION").checked) {
            var radnode1 = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
            var ElcmNode = radReqDOM.createElement("ELCM_FUNCTION");
            radnode1.appendChild(ElcmNode);
	    	//ELCM_METADATA_CLASS~ELCM_DTO_CLASS~ELCM_ENTITY_CLASS~ELCM_MAIN_CLASS~ELCM_DAO_CLASS~ELCM_ENTITY_ASSEMBLER
            if(document.getElementById("ELCM_DTO_CLASS")
            		&& document.getElementById("ELCM_DTO_CLASS").checked) {
            	elcm_function="N~Y~Y~Y~Y~Y~";
            }
            setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ELCM_FUNCTION"), elcm_function);
        }
    }
    catch (e) {
    }

    if (gen_gwinFuncId == "RDDNOTIF") {
        operation = parent.ntfyAction;
    }
    else if (gen_gwinFuncId == "RDDNFTRG") {
        operation = parent.ntfyTrgAction;
    }

    var gennode = radReqDOM.createElement(operation);
    bodyNode.appendChild(gennode);
    if (!fnTestConnection()) {
        return false;
    }
    if (operation == "DEPLOY") {
        var file_trnf_type = radReqDOM.createElement("FILE_TRNF_TYPE");
        gennode.appendChild(file_trnf_type);
        setNodeText(selectSingleNode(radReqDOM, "//FILE_TRNF_TYPE"), parent.parent.filedeployMode);
        if (parent.parent.filedeployMode == "FILEMANAGER") {
            var flMngrUrl = radReqDOM.createElement("FILE_MNGR_URL");
            gennode.appendChild(flMngrUrl);
            setNodeText(selectSingleNode(radReqDOM, "//FILE_MNGR_URL"), parent.parent.FilemgrURL);
        }
        var jsPth = radReqDOM.createElement("JS_PATH");
        gennode.appendChild(jsPth);
        setNodeText(selectSingleNode(radReqDOM, "//JS_PATH"), parent.parent.jsPath);
        var uixmlpth = radReqDOM.createElement("UIXML_PATH");
        gennode.appendChild(uixmlpth);
        setNodeText(selectSingleNode(radReqDOM, "//UIXML_PATH"), parent.parent.uixmlPath);
    }
    else if (operation == "RELEASE" && gen_gwinFuncId != "RDDNFTRG") {

        var chkIndx = document.getElementById("CHK_MD").options.selectedIndex;
        var chkInVal = document.getElementById("CHK_MD").options[chkIndx].value;
        setNodeText(selectSingleNode(parent.dom, "//CHECKIN_MODE"), chkInVal);
        setNodeText(selectSingleNode(parent.dom, "//SFR_NO"), document.getElementById("SFR_NO").value);
        setNodeText(selectSingleNode(parent.dom, "//SUB_PROJECT"), document.getElementById("SUB_PROJECT").value);
        setNodeText(selectSingleNode(parent.dom, "//DDL_REMARKS"), document.getElementById("DDL_REMARKS").value);
        setNodeText(selectSingleNode(parent.dom, "//SVN_USER"), document.getElementById("SVN_USER").value);
        setNodeText(selectSingleNode(parent.dom, "//SVN_PASS"), document.getElementById("SVN_PASS").value);
    }
    for (var fln = 0;fln < fileNodes.length;fln++) {
        var node = radReqDOM.createElement(fileNodes[fln]);
        gennode.appendChild(node);
    }

    chldNodes = gennode.childNodes;
    for (i = 0;i < chldNodes.length;i++) {
        var nodeNm = chldNodes[i].nodeName;
        if (document.getElementById(nodeNm)) {
            if (document.getElementById(nodeNm).checked == true) {
                setNodeText(selectSingleNode(radReqDOM, "//" + operation + "//" + nodeNm), 'Y');
            }
            else {
                setNodeText(selectSingleNode(radReqDOM, "//" + operation + "//" + nodeNm), 'N');
            }
        }
    }
    setNodeText(selectSingleNode(radReqDOM, "//" + operation + "//EXCEL_TEMPLATE"), 'N');
    var result = "";
    // if (parent.document.baseURI.indexOf("RadIndex.jsp") == 0 || gen_gwinFuncId == "RDDSCRDF") {
    if (gen_gwinFuncId == "RDDFNCGN" || gen_gwinFuncId == "RDDLNPGE" || gen_gwinFuncId == "RDDSCRDF") {
        if (operation == "GENERATE") {
            result = parent.saveradxml("1", radReqDOM);
        }
        else if (operation == "DEPLOY") {
            result = parent.saveradxml("2", radReqDOM);
        }
        else if (operation == "RELEASE") {
            result = parent.saveradxml("3", radReqDOM);
        }
    }
    else if (gen_gwinFuncId == "RDDNOTIF") {
        if (operation == "GENERATE") {
            result = parent.fnSaveData("1", radReqDOM);
        }
        else if (operation == "DEPLOY") {
            result = parent.fnSaveData("2", radReqDOM);
        }
        else if (operation == "RELEASE") {
            result = parent.fnSaveData("3", radReqDOM);
        }
	} else if (gen_gwinFuncId == "RDDNFTRG") {
		if (operation == "GENERATE") {
			// Fix for Notification Trigger
			var radnode1 = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
			var ElcmNode = radReqDOM.createElement("ELCM_FUNCTION");
			radnode1.appendChild(ElcmNode);
			elcm_function = "NON-EXT";
			setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ELCM_FUNCTION"), elcm_function);
			// Fix for Notification Trigger finishes
			result = parent.fnSave_RDDNFTRG("1", radReqDOM, operation);
		} else if (operation == "DEPLOY") {
			result = parent.fnSave_RDDNFTRG("2", radReqDOM, operation);
		} else if (operation == "RELEASE") {
			result = parent.fnSave_RDDNFTRG("3", radReqDOM, operation);
		}
	}
    else if (gen_gwinFuncId == "RDDGIMNT") {
        if (operation == "GENERATE") {
            result = parent.saveGIxml("1", radReqDOM);
        }
        else if (operation == "DEPLOY") {
            result = parent.saveGIxml("2", radReqDOM);
        }
        else if (operation == "RELEASE") {
            result = parent.saveGIxml("3", radReqDOM);
        }
    }
    else if (gen_gwinFuncId == "RDDPURGE") {
        if (operation == "GENERATE") {
            result = parent.savePFxml("1", radReqDOM);
        }
        else if (operation == "DEPLOY") {
            result = parent.savePFxml("2", radReqDOM);
        }
        else if (operation == "RELEASE") {
            result = parent.savePFxml("3", radReqDOM);
        }
    }
    if (result != false) {
        var logdbmsgs = selectNodes(loadXMLDoc(result), "//RAD_RES_ENV/RAD_BODY/RAD_ERRORS/ERROR");
        var logmCODE = "";
        var logmMESSAGE = "";
        var log1, log2;
        for (var lb = 0;lb < logdbmsgs.length;lb++) {
            log1 = getNodeText(selectNodes(logdbmsgs[lb], "EDESC")[0]);
            log2 = getNodeText(selectNodes(logdbmsgs[lb], "ECODE")[0]);
            logmMESSAGE = log1 + "," + log2;
            logmCODE = logmCODE + "~" + logmMESSAGE;
        }
        try {
            var checkstatus1 = getNodeText(selectSingleNode(loadXMLDoc(result), "//RAD_RES_ENV/RAD_BODY/RAD_ERRORS/ERROR/ETYPE"));
            if ((gen_gwinFuncId == "RDDFNCGN" || gen_gwinFuncId == "RDDLNPGE") && parent.amterrLogMsg != "") {
                logmMESSAGE = "Currency not mapped to Amount Fields.Local Currency will be used for formatting.Check Log for Details" + "," + "RD-AMT-001";
                logmCODE = logmMESSAGE + "~" + logmCODE;
            }
            alertMessage(logmCODE, checkstatus1);
        }
        catch (e) {
            if (parent.amountValFlag) {
                alertMessage("Amount Field Issues. Check Log for Details", "E");
            }
            else {
                alertMessage(result, "E");
            }
        }

        var fileDtls = "";
        if (operation == "RELEASE") {
            deleteAll('fileResult1');
            fileDtls = selectNodes(loadXMLDoc(result), "//RAD_RES_ENV/RAD_BODY/RELEASE/FILE_DETAILS");
        }
        else {
            deleteAll('fileResult');
            fileDtls = selectNodes(loadXMLDoc(result), "//RAD_RES_ENV/RAD_BODY/GENERATE/FILE_DETAILS");
        }

        for (var fld = 0;fld < fileDtls.length;fld++) {

            var fileType = getNodeText(selectNodes(fileDtls[fld], "FILE_TYPE")[0]);
            var fileTag = getNodeText(selectNodes(fileDtls[fld], "FILE_TAG")[0]);
            var fileStatus = getNodeText(selectNodes(fileDtls[fld], "FILE_STATUS")[0]);
            var rowRef = "";
            if (operation == "RELEASE") {
                addTableRow('fileResult1');
                rowRef = document.getElementsByName('fileResult1')[0].tBodies[0].rows[document.getElementsByName('fileResult1')[0].tBodies[0].rows.length - 1];
            }
            else {
                addTableRow('fileResult');
                rowRef = document.getElementsByName('fileResult')[0].tBodies[0].rows[document.getElementsByName('fileResult')[0].tBodies[0].rows.length - 1];
            }

            rowRef.cells[0].getElementsByTagName("INPUT")[0].value = fld + 1;
            rowRef.cells[0].getElementsByTagName("INPUT")[0].readOnly = true;
            rowRef.cells[1].getElementsByTagName("INPUT")[0].value = getNodeText(selectNodes(fileDtls[fld], "FILE_NAME")[0]).substring(getNodeText(selectNodes(fileDtls[fld], "FILE_NAME")[0]).lastIndexOf("\\") + 1, getNodeText(selectNodes(fileDtls[fld], "FILE_NAME")[0]).length);
            rowRef.cells[1].getElementsByTagName("INPUT")[0].readOnly = true;
            rowRef.cells[2].getElementsByTagName("INPUT")[0].value = getNodeText(selectNodes(fileDtls[fld], "FILE_TYPE")[0]);
            rowRef.cells[2].getElementsByTagName("INPUT")[0].readOnly = true;
            rowRef.cells[3].getElementsByTagName("SELECT")[0].value = fileStatus;
            rowRef.cells[3].getElementsByTagName("SELECT")[0].readOnly = true;

            if (operation == "RELEASE") {
                if (getNodeText(selectNodes(fileDtls[fld], "FILE_TYPE")[0]) == 'INC') {
                    rowRef.cells[4].getElementsByTagName("BUTTON")[0].disabled = false;
                }
                else {
                    rowRef.cells[4].getElementsByTagName("BUTTON")[0].disabled = true;
                }
            }

        }

    }

}

function fngenOptions() {

    if (gen_gwinFuncId == "RDDFNCGN" || gen_gwinFuncId == "RDDLNPGE") {

        var action = parent.document.getElementsByName("ACTION")[0].value;
        if (action == "NEW") {
            if (parent.document.getElementsByName("FUNCTION_TYPE")[0].value != "S" && parent.document.getElementById("FUNCTION_CATEGORY").value != "DASHBOARD") {
                for (var fln = 0;fln < fileNodes.length;fln++) {
                    if (document.getElementById(fileNodes[fln])) {
                        document.getElementById(fileNodes[fln]).checked = true;
                        document.getElementById(fileNodes[fln]).disabled = false;
                    }
                }

                if (parent.parent.relType == "KERNEL") {
                    document.getElementById("CLUSTER_SPC").checked = false;
                    document.getElementById("CLUSTER_SQL").checked = false;
                    document.getElementById("CLUSTER_SPC").disabled = true;
                    document.getElementById("CLUSTER_SQL").disabled = true;
                    document.getElementById("CUSTOM_SPC").checked = false;
                    document.getElementById("CUSTOM_SQL").checked = false;
                    document.getElementById("CUSTOM_SPC").disabled = true;
                    document.getElementById("CUSTOM_SQL").disabled = true;
                    document.getElementById("CUSTOMER_SPC").checked = false;
                    document.getElementById("CUSTOMER_SQL").checked = false;
                    document.getElementById("CUSTOMER_SPC").disabled = true;
                    document.getElementById("CUSTOMER_SQL").disabled = true;

                }
                else if (parent.parent.relType == "CLUSTER") {
                    document.getElementById("KERNEL_SPC").checked = false;
                    document.getElementById("KERNEL_SQL").checked = false;
                    document.getElementById("KERNEL_SPC").disabled = true;
                    document.getElementById("KERNEL_SQL").disabled = true;
                    document.getElementById("CUSTOM_SPC").checked = false;
                    document.getElementById("CUSTOM_SQL").checked = false;
                    document.getElementById("CUSTOM_SPC").disabled = true;
                    document.getElementById("CUSTOM_SQL").disabled = true;
                    document.getElementById("CUSTOMER_SPC").checked = false;
                    document.getElementById("CUSTOMER_SQL").checked = false;
                    document.getElementById("CUSTOMER_SPC").disabled = true;
                    document.getElementById("CUSTOMER_SQL").disabled = true;

                }
                else if (parent.parent.relType == "CUSTOM") {
                    document.getElementById("KERNEL_SPC").checked = false;
                    document.getElementById("KERNEL_SQL").checked = false;
                    document.getElementById("KERNEL_SPC").disabled = true;
                    document.getElementById("KERNEL_SQL").disabled = true;
                    document.getElementById("CLUSTER_SPC").checked = false;
                    document.getElementById("CLUSTER_SQL").checked = false;
                    document.getElementById("CLUSTER_SPC").disabled = true;
                    document.getElementById("CLUSTER_SQL").disabled = true;
                    document.getElementById("CUSTOMER_SPC").checked = false;
                    document.getElementById("CUSTOMER_SQL").checked = false;
                    document.getElementById("CUSTOMER_SPC").disabled = true;
                    document.getElementById("CUSTOMER_SQL").disabled = true;
                }
                else if (parent.parent.relType == "CUSTOMER") {
                    document.getElementById("KERNEL_SPC").checked = false;
                    document.getElementById("KERNEL_SQL").checked = false;
                    document.getElementById("KERNEL_SPC").disabled = true;
                    document.getElementById("KERNEL_SQL").disabled = true;
                    document.getElementById("CLUSTER_SPC").checked = false;
                    document.getElementById("CLUSTER_SQL").checked = false;
                    document.getElementById("CLUSTER_SPC").disabled = false;
                    document.getElementById("CLUSTER_SQL").disabled = false;
                    document.getElementById("CUSTOM_SPC").disabled = false;
                    document.getElementById("CUSTOM_SQL").disabled = false;
                    document.getElementById("CUSTOM_SPC").disabled = true;
                    document.getElementById("CUSTOM_SQL").disabled = true;

                }
            }
            else if (parent.document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD") {
                for (var fln = 0;fln < fileNodes.length;fln++) {
                    if (document.getElementById(fileNodes[fln])) {
                        document.getElementById(fileNodes[fln]).checked = false;
                        document.getElementById(fileNodes[fln]).disabled = true;
                    }
                }
                document.getElementById("UIXML").checked = true;
                document.getElementById("RAD_XML").checked = true;
                document.getElementById("UIXML").disabled = false;
                document.getElementById("SYS_JS").checked = true;
                document.getElementById("SYS_JS").disabled = false;
                document.getElementById("MENU_DETAILS").checked = true;
                document.getElementById("MENU_DETAILS").disabled = false;
                document.getElementById("LABEL_DETAILS").checked = true;
                document.getElementById("LABEL_DETAILS").disabled = false;
                document.getElementById("LOV_DETAILS").checked = true;
                document.getElementById("LOV_DETAILS").disabled = false;
                document.getElementById("SUMMARY_DETAILS").checked = true;
                document.getElementById("SUMMARY_DETAILS").disabled = false;
                document.getElementById("SCREEN_HTMLS").disabled = false;
            }
            else {
                for (var fln = 0;fln < fileNodes.length;fln++) {
                    if (document.getElementById(fileNodes[fln])) {
                        document.getElementById(fileNodes[fln]).checked = false;
                        document.getElementById(fileNodes[fln]).disabled = true;
                    }
                }
                document.getElementById("RAD_XML").checked = true;
                document.getElementById("UIXML").checked = true;
                document.getElementById("UIXML").disabled = false;
                /*document.getElementById("SYS_JS").checked = true;
                document.getElementById("SYS_JS").disabled = false;*/
                document.getElementById("MENU_DETAILS").checked = true;
                document.getElementById("MENU_DETAILS").disabled = false;
                document.getElementById("LABEL_DETAILS").checked = true;
                document.getElementById("LABEL_DETAILS").disabled = false;
                document.getElementById("XSD_DETAILS").checked = true;
                document.getElementById("XSD_DETAILS").disabled = false;
                document.getElementById("SCREEN_HTMLS").checked = true;
                document.getElementById("SCREEN_HTMLS").disabled = false;
                document.getElementById("XSD_FILES").checked = true;
                document.getElementById("XSD_FILES").disabled = false;
                document.getElementById("GATEWAY_DETAILS").checked = true;
                document.getElementById("GATEWAY_DETAILS").disabled = false;
                document.getElementById("AMEND_DETAILS").checked = true;
                document.getElementById("AMEND_DETAILS").disabled = false;

            }

            if (parent.document.getElementById("GW_FUNCTION").checked) { 
				for (var fln = 0; fln < Spc_Sql.length; fln++) {
					if (document.getElementById(Spc_Sql[fln])) {
						document.getElementById(Spc_Sql[fln]).checked = false;
						document.getElementById(Spc_Sql[fln]).disabled = true;
					}
				}
			} 
            
            if (parent.document.getElementById("ELCM_FUNCTION").checked) {
				if (document.getElementById("ELCM_DTO_CLASS")) {
					document.getElementById("ELCM_DTO_CLASS").checked = true;
					document.getElementById("ELCM_DTO_CLASS").disabled = false;
				}

				for (var fln = 0; fln < Spc_Sql.length; fln++) {
					if (document.getElementById(Spc_Sql[fln])) {
						document.getElementById(Spc_Sql[fln]).checked = false;
						document.getElementById(Spc_Sql[fln]).disabled = true;
					}
				}
			} else {
				if (document.getElementById("ELCM_DTO_CLASS")) {
					document.getElementById("ELCM_DTO_CLASS").checked = false;
					document.getElementById("ELCM_DTO_CLASS").disabled = true;
				}
			}
		}
        else if (action == "LOAD") {
            if (parent.document.getElementsByName("FUNCTION_TYPE")[0].value != "S" && parent.document.getElementById("FUNCTION_CATEGORY").value != "DASHBOARD") {
                document.getElementById("MAIN_SPC").checked = true;
                document.getElementById("MAIN_SQL").checked = true;
                document.getElementById("SYS_JS").checked = true;
                document.getElementById("UIXML").checked = true;
                if (parent.parent.relType == "KERNEL") {
                    document.getElementById("CLUSTER_SPC").checked = false;
                    document.getElementById("CLUSTER_SQL").checked = false;
                    document.getElementById("CLUSTER_SPC").disabled = true;
                    document.getElementById("CLUSTER_SQL").disabled = true;
                    document.getElementById("CUSTOM_SPC").checked = false;
                    document.getElementById("CUSTOM_SQL").checked = false;
                    document.getElementById("CUSTOM_SPC").disabled = true;
                    document.getElementById("CUSTOM_SQL").disabled = true;
                    document.getElementById("CUSTOMER_SPC").checked = false;
                    document.getElementById("CUSTOMER_SQL").checked = false;
                    document.getElementById("CUSTOMER_SPC").disabled = true;
                    document.getElementById("CUSTOMER_SQL").disabled = true;

                }
                else if (parent.parent.relType == "CLUSTER") {
                    document.getElementById("KERNEL_SPC").checked = false;
                    document.getElementById("KERNEL_SQL").checked = false;
                    document.getElementById("KERNEL_SPC").disabled = true;
                    document.getElementById("KERNEL_SQL").disabled = true;
                    document.getElementById("CUSTOM_SPC").checked = false;
                    document.getElementById("CUSTOM_SQL").checked = false;
                    document.getElementById("CUSTOM_SPC").disabled = true;
                    document.getElementById("CUSTOM_SQL").disabled = true;
                    document.getElementById("CUSTOMER_SPC").checked = false;
                    document.getElementById("CUSTOMER_SQL").checked = false;
                    document.getElementById("CUSTOMER_SPC").disabled = true;
                    document.getElementById("CUSTOMER_SQL").disabled = true;
                }
                else if (parent.parent.relType == "CUSTOM") {
                    document.getElementById("KERNEL_SPC").checked = false;
                    document.getElementById("KERNEL_SQL").checked = false;
                    document.getElementById("KERNEL_SPC").disabled = true;
                    document.getElementById("KERNEL_SQL").disabled = true;
                    document.getElementById("CLUSTER_SPC").checked = false;
                    document.getElementById("CLUSTER_SQL").checked = false;
                    document.getElementById("CLUSTER_SPC").disabled = true;
                    document.getElementById("CLUSTER_SQL").disabled = true;
                    document.getElementById("CUSTOMER_SPC").checked = false;
                    document.getElementById("CUSTOMER_SQL").checked = false;
                    document.getElementById("CUSTOMER_SPC").disabled = true;
                    document.getElementById("CUSTOMER_SQL").disabled = true;
                }
                else if (parent.parent.relType == "CUSTOMER") {
                    document.getElementById("KERNEL_SPC").checked = false;
                    document.getElementById("KERNEL_SQL").checked = false;
                    document.getElementById("KERNEL_SPC").disabled = true;
                    document.getElementById("KERNEL_SQL").disabled = true;
                    document.getElementById("CLUSTER_SPC").checked = false;
                    document.getElementById("CLUSTER_SQL").checked = false;
                    document.getElementById("CLUSTER_SPC").disabled = true;
                    document.getElementById("CLUSTER_SQL").disabled = true;
                    document.getElementById("CUSTOM_SPC").checked = false;
                    document.getElementById("CUSTOM_SQL").checked = false;
                    document.getElementById("CUSTOM_SPC").disabled = true;
                    document.getElementById("CUSTOM_SQL").disabled = true;

                }
            }
            else if (parent.document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD") {
                for (var fln = 0;fln < fileNodes.length;fln++) {
                    if (document.getElementById(fileNodes[fln])) {
                        document.getElementById(fileNodes[fln]).checked = false;
                        document.getElementById(fileNodes[fln]).disabled = true;
                    }
                }
                document.getElementById("UIXML").checked = true;
                document.getElementById("RAD_XML").checked = true;
                document.getElementById("UIXML").disabled = false;
                document.getElementById("SYS_JS").checked = true;
                document.getElementById("SYS_JS").disabled = false;
                document.getElementById("MENU_DETAILS").checked = true;
                document.getElementById("MENU_DETAILS").disabled = false;
                document.getElementById("LABEL_DETAILS").checked = true;
                document.getElementById("LABEL_DETAILS").disabled = false;
                document.getElementById("LOV_DETAILS").checked = true;
                document.getElementById("LOV_DETAILS").disabled = false;
                document.getElementById("SUMMARY_DETAILS").checked = true;
                document.getElementById("SUMMARY_DETAILS").disabled = false;
                document.getElementById("SCREEN_HTMLS").disabled = false;

            }

            else {
                for (var fln = 0;fln < fileNodes.length;fln++) {
                    if (document.getElementById(fileNodes[fln])) {
                        document.getElementById(fileNodes[fln]).checked = false;
                        document.getElementById(fileNodes[fln]).disabled = true;
                    }
                }
                document.getElementById("RAD_XML").checked = true;
                document.getElementById("UIXML").checked = true;
                document.getElementById("UIXML").disabled = false;
                document.getElementById("MENU_DETAILS").disabled = false;
                document.getElementById("LABEL_DETAILS").disabled = false;
                document.getElementById("SCREEN_HTMLS").disabled = false;
                document.getElementById("XSD_FILES").disabled = false;
                document.getElementById("GATEWAY_DETAILS").disabled = false;
                document.getElementById("AMEND_DETAILS").disabled = false;
                document.getElementById("XSD_DETAILS").disabled = false;
            }
            if (parent.document.getElementById("GW_FUNCTION").checked) { 
				for (var fln = 0; fln < Spc_Sql.length; fln++) {
					if (document.getElementById(Spc_Sql[fln])) {
						document.getElementById(Spc_Sql[fln]).checked = false;
						document.getElementById(Spc_Sql[fln]).disabled = true;
					}
				}
			}
            if (parent.document.getElementById("ELCM_FUNCTION").checked) {

				document.getElementById("ELCM_DTO_CLASS").checked = false;
				document.getElementById("ELCM_DTO_CLASS").disabled = false;

				for (var fln = 0; fln < Spc_Sql.length; fln++) {
					if (document.getElementById(Spc_Sql[fln])) {
						document.getElementById(Spc_Sql[fln]).checked = false;
						document.getElementById(Spc_Sql[fln]).disabled = true;
					}
				}
			} else {
				if (document.getElementById("ELCM_DTO_CLASS")) {
					document.getElementById("ELCM_DTO_CLASS").checked = false;
					document.getElementById("ELCM_DTO_CLASS").disabled = true;
				}
			}
		}
        if (parent.document.getElementsByName("OPERATION")[0].value == "GENERATE") {
            document.getElementById("Gen_ok").value = "Generate";
            document.getElementsByName("RAD_XML")[0].checked = true;
            document.getElementsByName("RAD_XML")[0].disabled = true;
            document.getElementById("LBL_RAD_XML").disabled = true;
            document.getElementById("SFR_TBL").style.display = "none";
            document.getElementById("GENRATEDIVRELEASE").style.display = "none";
            document.getElementById("GENRATEDIV").style.display = "block";

        }
        else if (parent.document.getElementsByName("OPERATION")[0].value == "DEPLOY") {
            document.getElementById("Gen_ok").value = "Deploy";
            document.getElementsByName("SCREEN_HTMLS")[0].checked = false;
            document.getElementsByName("SCREEN_HTMLS")[0].disabled = true;
            document.getElementsByName("XSD_FILES")[0].checked = false;
            document.getElementsByName("XSD_FILES")[0].disabled = true;
            document.getElementsByName("RAD_XML")[0].checked = false;
            document.getElementsByName("RAD_XML")[0].disabled = true;
            document.getElementById("LBL_RAD_XML").disabled = true;
            document.getElementById("SFR_TBL").style.display = "none";
            document.getElementById("GENRATEDIVRELEASE").style.display = "none";
            document.getElementById("GENRATEDIV").style.display = "block";

        }
        else if (parent.document.getElementsByName("OPERATION")[0].value == "RELEASE") {
            document.getElementById("Gen_ok").value = "Release";
            var fileNodes1 = "RAD_XML~MAIN_SPC~MAIN_SQL";
            fileNodes1 = fileNodes1.split("~");
            for (var fln = 0;fln < fileNodes1.length;fln++) {
                if (document.getElementById(fileNodes1[fln])) {
                    document.getElementById(fileNodes1[fln]).checked = true;
                    document.getElementById(fileNodes1[fln]).disabled = false;
                }
            }
            var fileNodes2 = "KERNEL_SPC~KERNEL_SQL~CLUSTER_SPC~CLUSTER_SQL~CUSTOM_SPC~CUSTOM_SQL~CUSTOMER_SPC~CUSTOMER_SQL~SCREEN_HTMLS~PURGE_DETAILS~XSD_FILES~XSD_ANNOTATED~LABEL_XML~UIXML~SYS_JS~EXCEL_TEMPLATE~MENU_DETAILS~LABEL_DETAILS~AMEND_DETAILS~SUMMARY_DETAILS~SCREEN_DETAILS~LOV_DETAILS~BLOCK_PK_COLS~CALL_FORM_DETAILS~BLOCK_DETAILS~DATASCR_DETAILS~FUNCTION_CALL_FORMS~GATEWAY_DETAILS~VARIABLE_MAPPING~NOTIFICATION_DETAILS~FUNCTION_PARAMETERS~NOTIFICATION_TRIGGER~UPLOAD_TRIGGER~UPLOAD_TABLE_DDL~ARCHIVE_TBL_DEF~XSD_DETAILS";
            fileNodes2 = fileNodes2.split("~");
            for (var fln = 0;fln < fileNodes2.length;fln++) {
                if (document.getElementById(fileNodes2[fln])) {
                    document.getElementById(fileNodes2[fln]).checked = false;
                    document.getElementById(fileNodes2[fln]).disabled = true;
                }
            }

            document.getElementsByName("RAD_XML")[0].disabled = true;

            document.getElementById("SFR_TBL").style.display = "block";
            document.getElementById("GENRATEDIVRELEASE").style.display = "block";
            document.getElementById("GENRATEDIV").style.display = "none";

        }

        document.getElementById("PURGE_DETAILS").checked = false;
        document.getElementById("PURGE_DETAILS").disabled = true;
        document.getElementById("ARCHIVE_TBL_DEF").checked = false;
        document.getElementById("ARCHIVE_TBL_DEF").disabled = true;
        document.getElementById("NOTIFICATION_TRIGGER").checked = false;
        document.getElementById("NOTIFICATION_TRIGGER").disabled = true;
        document.getElementById("NOTIFICATION_DETAILS").checked = false;
        document.getElementById("NOTIFICATION_DETAILS").disabled = true;
    }
    else if (gen_gwinFuncId == "RDDNOTIF") {

        var action = parent.document.getElementsByName("NTFY_ACTION")[0].value;
        for (var fln = 0;fln < fileNodes.length;fln++) {
            if (document.getElementById(fileNodes[fln])) {
                document.getElementById(fileNodes[fln]).disabled = true;
            }
        }
        document.getElementById("RAD_XML").checked = true;
        document.getElementById("MAIN_SPC").checked = true;
        document.getElementById("MAIN_SQL").checked = true;
        document.getElementById("XSD_FILES").checked = true;
        document.getElementById("XSD_FILES").disabled = false;
        document.getElementById("RAD_XML").disabled = false;
        document.getElementById("MAIN_SPC").disabled = false;
        document.getElementById("MAIN_SQL").disabled = false;
        document.getElementById("NOTIFICATION_DETAILS").checked = true;
        document.getElementById("NOTIFICATION_DETAILS").disabled = false;
        document.getElementById("NOTIFICATION_TRIGGER").checked = true;
        document.getElementById("NOTIFICATION_TRIGGER").disabled = false;

        if (action == "NEW") {

            if (parent.parent.relType == "KERNEL") {
                document.getElementById("KERNEL_SPC").checked = true;
                document.getElementById("KERNEL_SQL").checked = true;
                document.getElementById("KERNEL_SPC").disabled = false;
                document.getElementById("KERNEL_SQL").disabled = false;
                document.getElementById("CLUSTER_SPC").checked = true;
                document.getElementById("CLUSTER_SQL").checked = true;
                document.getElementById("CLUSTER_SPC").disabled = false;
                document.getElementById("CLUSTER_SQL").disabled = false;
                document.getElementById("CUSTOM_SPC").checked = true;
                document.getElementById("CUSTOM_SQL").checked = true;
                document.getElementById("CUSTOM_SPC").disabled = false;
                document.getElementById("CUSTOM_SQL").disabled = false;
                document.getElementById("CUSTOMER_SPC").checked = true;
                document.getElementById("CUSTOMER_SQL").checked = true;
                document.getElementById("CUSTOMER_SPC").disabled = false;
                document.getElementById("CUSTOMER_SQL").disabled = false;

            }
            else if (parent.parent.relType == "CLUSTER") {
                document.getElementById("CUSTOM_SPC").checked = false;
                document.getElementById("CUSTOM_SQL").checked = false;
                document.getElementById("CUSTOM_SPC").disabled = true;
                document.getElementById("CUSTOM_SQL").disabled = true;
                document.getElementById("CLUSTER_SPC").checked = true;
                document.getElementById("CLUSTER_SQL").checked = true;
                document.getElementById("CLUSTER_SPC").disabled = false;
                document.getElementById("CLUSTER_SQL").disabled = false;
                document.getElementById("CUSTOMER_SPC").checked = true;
                document.getElementById("CUSTOMER_SQL").checked = true;
                document.getElementById("CUSTOMER_SPC").disabled = false;
                document.getElementById("CUSTOMER_SQL").disabled = false;

            }
            else if (parent.parent.relType == "CUSTOM") {
                document.getElementById("CUSTOM_SPC").checked = true;
                document.getElementById("CUSTOM_SQL").checked = true;
                document.getElementById("CUSTOM_SPC").disabled = false;
                document.getElementById("CUSTOM_SPC").disabled = false;
                document.getElementById("CUSTOMER_SPC").checked = true;
                document.getElementById("CUSTOMER_SQL").checked = true;
                document.getElementById("CUSTOMER_SPC").disabled = false;
                document.getElementById("CUSTOMER_SQL").disabled = false;
            }
            else if (parent.parent.relType == "CUSTOMER") {
                document.getElementById("CUSTOMER_SPC").checked = true;
                document.getElementById("CUSTOMER_SQL").checked = true;
                document.getElementById("CUSTOMER_SPC").disabled = false;
                document.getElementById("CUSTOMER_SQL").disabled = false;
            }

        }
        else if (action == "LOAD") {
            if (parent.parent.relType == "KERNEL") {
                document.getElementById("KERNEL_SPC").disabled = false;
                document.getElementById("KERNEL_SQL").disabled = false;
                document.getElementById("CLUSTER_SPC").disabled = false;
                document.getElementById("CLUSTER_SQL").disabled = false;
                document.getElementById("CUSTOM_SPC").disabled = false;
                document.getElementById("CUSTOM_SQL").disabled = false;
                document.getElementById("CUSTOMER_SPC").disabled = false;
                document.getElementById("CUSTOMER_SQL").disabled = false;

            }
            else if (parent.parent.relType == "CLUSTER") {
                document.getElementById("CLUSTER_SPC").disabled = false;
                document.getElementById("CLUSTER_SQL").disabled = false;
                document.getElementById("CUSTOM_SPC").disabled = false;
                document.getElementById("CUSTOM_SQL").disabled = false;
                document.getElementById("CUSTOMER_SPC").disabled = false;
                document.getElementById("CUSTOMER_SQL").disabled = false;

            }
            else if (parent.parent.relType == "CUSTOM") {
                document.getElementById("CUSTOM_SPC").disabled = false;
                document.getElementById("CUSTOM_SQL").disabled = false;
                document.getElementById("CUSTOMER_SPC").disabled = false;
                document.getElementById("CUSTOMER_SQL").disabled = false;

            }
            else if (parent.parent.relType == "CUSTOMER") {
                document.getElementById("CUSTOMER_SPC").disabled = false;
                document.getElementById("CUSTOMER_SQL").disabled = false;

            }
        }
        if (parent.ntfyAction == "RELEASE") {
            document.getElementById("Gen_ok").value = "Release";
            document.getElementsByName("RAD_XML")[0].disabled = true;
            document.getElementById("SFR_TBL").style.display = "block";
            document.getElementById("GENRATEDIVRELEASE").style.display = "block";
            document.getElementById("GENRATEDIV").style.display = "none";

        }
        else {
            document.getElementById("Gen_ok").value = "Generate";
            document.getElementsByName("RAD_XML")[0].checked = true;
            if (parent.ntfyAction == "DEPLOY") {
                document.getElementById("Gen_ok").value = "Deploy";
                document.getElementsByName("RAD_XML")[0].checked = false;
            }
            document.getElementsByName("RAD_XML")[0].disabled = true;
            document.getElementById("LBL_RAD_XML").disabled = true;
            document.getElementById("SFR_TBL").style.display = "none";
            document.getElementById("GENRATEDIVRELEASE").style.display = "none";
            document.getElementById("GENRATEDIV").style.display = "block";

        }

    }
    else if (gen_gwinFuncId == "RDDNFTRG") {

        for (var fln = 0;fln < fileNodes.length;fln++) {
            if (document.getElementById(fileNodes[fln])) {
                document.getElementById(fileNodes[fln]).disabled = true;
            }
        }
        document.getElementsByName("RAD_XML")[0].disabled = true;
        document.getElementsByName("RAD_XML")[0].checked = false;
        document.getElementById("NOTIFICATION_TRIGGER").checked = true;
        document.getElementById("NOTIFICATION_TRIGGER").disabled = false;
        document.getElementById("NOTIFICATION_DETAILS").checked = true;
        document.getElementById("NOTIFICATION_DETAILS").disabled = false;
        if (parent.ntfyTrgAction == "RELEASE") {
            document.getElementById("Gen_ok").value = "Release";
            document.getElementsByName("RAD_XML")[0].disabled = true;
            document.getElementsByName("RAD_XML")[0].checked = false;
            document.getElementById("SFR_TBL").style.display = "block";
            document.getElementById("GENRATEDIVRELEASE").style.display = "block";
            document.getElementById("GENRATEDIV").style.display = "none";
        }
        else {
            document.getElementById("Gen_ok").value = "Generate";
            if (parent.ntfyTrgAction == "DEPLOY") {
                document.getElementById("Gen_ok").value = "Deploy";
            }
            document.getElementsByName("RAD_XML")[0].checked = false;
            document.getElementsByName("RAD_XML")[0].disabled = true;
            document.getElementById("LBL_RAD_XML").disabled = true;
            document.getElementById("SFR_TBL").style.display = "none";
            document.getElementById("GENRATEDIVRELEASE").style.display = "none";
            document.getElementById("GENRATEDIV").style.display = "block";
        }
    }
    else if (gen_gwinFuncId == "RDDSCRDF") {

        var checkBoxElements = document.getElementsByTagName("INPUT");

        for (var i = 0;i < checkBoxElements.length;i++) {
            checkBoxElements[i].disabled = true;
        }

        document.getElementById("UIXML").disabled = false;
        document.getElementById("SYS_JS").disabled = false;
        if (parent.document.getElementsByName("OPERATION")[0].value == "DEPLOY") {
            document.getElementById("RAD_XML").disabled = true;
            document.getElementById("RAD_XML").checked = false;
        }
        else {
            document.getElementById("RAD_XML").disabled = true;
            document.getElementById("RAD_XML").checked = true;
        }
        if (parent.document.getElementsByName("OPERATION")[0].value == "GENERATE") {
            document.getElementById("Gen_ok").value = "Generate";
            document.getElementsByName("RAD_XML")[0].checked = true;
            document.getElementsByName("RAD_XML")[0].disabled = true;
            document.getElementById("LBL_RAD_XML").disabled = true;
            document.getElementById("SFR_TBL").style.display = "none";
            document.getElementById("GENRATEDIVRELEASE").style.display = "none";
            document.getElementById("GENRATEDIV").style.display = "block";

        }
        else if (parent.document.getElementsByName("OPERATION")[0].value == "DEPLOY") {
            document.getElementById("Gen_ok").value = "Deploy";
            document.getElementsByName("RAD_XML")[0].checked = false;
            document.getElementsByName("RAD_XML")[0].disabled = true;
            document.getElementById("LBL_RAD_XML").disabled = true;
            document.getElementById("SFR_TBL").style.display = "none";
            document.getElementById("GENRATEDIVRELEASE").style.display = "none";
            document.getElementById("GENRATEDIV").style.display = "block";

        }
        else if (parent.document.getElementsByName("OPERATION")[0].value == "RELEASE") {
            document.getElementById("Gen_ok").value = "Release";
            document.getElementsByName("RAD_XML")[0].disabled = true;
            document.getElementById("SFR_TBL").style.display = "block";
            document.getElementById("GENRATEDIVRELEASE").style.display = "block";
            document.getElementById("GENRATEDIV").style.display = "none";
        }

    }
    else if (gen_gwinFuncId == "RDDGIMNT") {
        document.getElementById("Gen_ok").value = "Generate";
        for (var fln = 0;fln < fileNodes.length;fln++) {
            if (document.getElementById(fileNodes[fln])) {
                document.getElementById(fileNodes[fln]).checked = false;
                document.getElementById(fileNodes[fln]).disabled = true;
            }
        }
        document.getElementById("RAD_XML").disabled = false;
        document.getElementById("RAD_XML").checked = true;
        document.getElementById("MAIN_SPC").disabled = false;
        document.getElementById("MAIN_SQL").disabled = false;
        document.getElementById("MAIN_SPC").checked = true;
        document.getElementById("MAIN_SQL").checked = true;
        document.getElementById("KERNEL_SPC").disabled = true;
        document.getElementById("KERNEL_SQL").disabled = true;
        document.getElementById("CLUSTER_SPC").disabled = true;
        document.getElementById("CLUSTER_SQL").disabled = true;
        document.getElementById("CUSTOM_SPC").disabled = true;
        document.getElementById("CUSTOM_SQL").disabled = true;
        document.getElementById("CUSTOMER_SPC").disabled = true;
        document.getElementById("CUSTOMER_SQL").disabled = true;
        document.getElementById("NOTIFICATION_TRIGGER").disabled = true;
        document.getElementById("NOTIFICATION_DETAILS").disabled = true;

        if (parent.parent.relType == "KERNEL") {
            document.getElementById("KERNEL_SPC").disabled = false;
            document.getElementById("KERNEL_SQL").disabled = false;
            document.getElementById("KERNEL_SPC").checked = true;
            document.getElementById("KERNEL_SQL").checked = true;

        }
        else if (parent.parent.relType == "CLUSTER") {
            document.getElementById("CLUSTER_SPC").disabled = false;
            document.getElementById("CLUSTER_SQL").disabled = false;
            document.getElementById("CLUSTER_SPC").checked = true;
            document.getElementById("CLUSTER_SQL").checked = true;

        }
        else if (parent.parent.relType == "CUSTOM") {
            document.getElementById("CUSTOM_SPC").disabled = false;
            document.getElementById("CUSTOM_SQL").disabled = false;
            document.getElementById("CLUSTER_SPC").checked = true;
            document.getElementById("CLUSTER_SQL").checked = true;

        }
        else if (parent.parent.relType == "CUSTOMER") {
            document.getElementById("CUSTOMER_SPC").disabled = false;
            document.getElementById("CUSTOMER_SQL").disabled = false;
            document.getElementById("CLUSTER_SPC").checked = true;
            document.getElementById("CLUSTER_SQL").checked = true;

        }

        document.getElementById("SFR_TBL").style.display = "none";
        document.getElementById("GENRATEDIVRELEASE").style.display = "none";
        document.getElementById("GENRATEDIV").style.display = "block";
    }
    else if (gen_gwinFuncId == "RDDPURGE") {
        document.getElementById("Gen_ok").value = "Generate";
        for (var fln = 0;fln < fileNodes.length;fln++) {
            if (document.getElementById(fileNodes[fln])) {
                document.getElementById(fileNodes[fln]).checked = false;
                document.getElementById(fileNodes[fln]).disabled = true;
            }
        }

        document.getElementById("PURGE_DETAILS").disabled = false;
        document.getElementById("PURGE_DETAILS").checked = true;
        document.getElementById("ARCHIVE_TBL_DEF").disabled = false;
        document.getElementById("ARCHIVE_TBL_DEF").checked = true;
        document.getElementById("MAIN_SQL").disabled = false;
        document.getElementById("MAIN_SQL").checked = true;
        document.getElementById("RAD_XML").disabled = true;
        document.getElementById("RAD_XML").checked = false;
        document.getElementById("MAIN_SPC").disabled = false;
        document.getElementById("MAIN_SPC").checked = true;
        document.getElementById("KERNEL_SPC").disabled = true;
        document.getElementById("KERNEL_SQL").disabled = true;
        document.getElementById("CLUSTER_SPC").disabled = true;
        document.getElementById("CLUSTER_SQL").disabled = true;
        document.getElementById("CUSTOM_SPC").disabled = true;
        document.getElementById("CUSTOM_SQL").disabled = true;
        document.getElementById("CUSTOMER_SPC").disabled = true;
        document.getElementById("CUSTOMER_SQL").disabled = true;
        document.getElementById("NOTIFICATION_TRIGGER").disabled = true;
        document.getElementById("NOTIFICATION_DETAILS").disabled = true;
        document.getElementById("SFR_TBL").style.display = "none";
        document.getElementById("GENRATEDIVRELEASE").style.display = "none";
        document.getElementById("GENRATEDIV").style.display = "block";

        if (parent.parent.relType == "KERNEL") {
            document.getElementById("KERNEL_SPC").disabled = false;
            document.getElementById("KERNEL_SQL").disabled = false;
            document.getElementById("KERNEL_SPC").checked = true;
            document.getElementById("KERNEL_SQL").checked = true;

        }
        else if (parent.parent.relType == "CLUSTER") {
            document.getElementById("CLUSTER_SPC").disabled = false;
            document.getElementById("CLUSTER_SQL").disabled = false;
            document.getElementById("CLUSTER_SPC").checked = true;
            document.getElementById("CLUSTER_SQL").checked = true;

        }
        else if (parent.parent.relType == "CUSTOM") {
            document.getElementById("CUSTOM_SPC").disabled = false;
            document.getElementById("CUSTOM_SQL").disabled = false;
            document.getElementById("CLUSTER_SPC").checked = true;
            document.getElementById("CLUSTER_SQL").checked = true;

        }
        else if (parent.parent.relType == "CUSTOMER") {
            document.getElementById("CUSTOMER_SPC").disabled = false;
            document.getElementById("CUSTOMER_SQL").disabled = false;
            document.getElementById("CLUSTER_SPC").checked = true;
            document.getElementById("CLUSTER_SQL").checked = true;

        }
    }

    if (parent.document.getElementsByName("OPERATION")[0].value == "GENERATE") {
        setInnerText((document.getElementById("title_wnd")), "Generate");
    }
    else if (parent.document.getElementsByName("OPERATION")[0].value == "DEPLOY") {
        setInnerText((document.getElementById("title_wnd")), "Deploy");
    }
    else if (parent.document.getElementsByName("OPERATION")[0].value == "RELEASE") {
        setInnerText((document.getElementById("title_wnd")), "Release");
    }

    document.getElementById("Cancel").focus();
}

isNotDoubleClick = function (targetE) {
    parent.timerbtn = targetE;
    document.getElementById(targetE).disabled = true;
    setTimeout("blockClick()", 200);
    return document.getElementById(targetE).disabled;
}
blockClick = function () {
    document.getElementById(parent.timerbtn).disabled = false;
}

function toClearCase(ccPath, fileName, comments, filesDir) {

    var parm1 = "Z:\\FCUBS_11.3.0\\Soft\\TOOLS\\RAD\\Installer\\InstallOptions\\copy\\";
    var parm2 = "SourceCopy.xml";
    var parm3 = "SourceCopy.xml";

    var result = "";

    try {

        var clrfle = fnReadMode("", ccPath + "\\" + fileName, "");
        var wsh = new ActiveXObject('WScript.Shell');
        var checkOut = wsh.Exec("cleartool co -nc " + ccPath + "\\" + fileName);
        var cresult = wsh.Exec("cleartool.error");
        while (checkOut.Status == 0) {
            //sleep(100);
        }
        if (checkOut.Status == 1) {

            var filedata = fnReadMode("", filesDir, "");
            fnWriteMode(ccPath, filedata, fileName);

        }

        var checkin = wsh.Exec('cleartool checkin -c  \"' + comments + '\" ' + ccPath + "\\" + fileName);
        while (checkin.Status == 0) {
            //sleep(100);
        }
        result = checkin.Status;
    }
    catch (err) {
        alertMessage(err);
    }

    return result;

}
