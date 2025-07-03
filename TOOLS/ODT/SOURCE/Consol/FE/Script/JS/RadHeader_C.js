/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadHeader.js
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

var divobject = "";
var innerhtml = "";
var dbDataDOM = "";
var firstTreeobject = "";
var language = "";
var jspath = "";
var title = parent.relType;
var relName = parent.relName;
var language = parent.lang;
var username = parent.username;
var relcode = parent.relCode;
var originDate = parent.originDate;
var envcode = parent.envCode;
var vwChg = "N";
var g_local_dir = "";
var g_loaded_file = "";
var releaseType = title;
var releaseName = relName;
var changeUIonly = "";
var jspath = "";
var xmlpath = "";
var glblLovListArray = "";
var glblLovList = "";
var glblLovRetFldsList = new Array();

var fileManagerURL = "";
document.getElementsByName("firstTreeobject").value = "";
document.getElementsByName("vwChg").value = "N";
document.getElementsByName("releaseType").value = title;
document.getElementsByName("changeUIonly").value = changeUIonly;
document.getElementsByName("lang").value = language;

var roleRights = "111";

var dom = dbDataDOM;

function loadDOM() {

    var dataXML = "<?xml version='1.0' encoding='UTF-8'?>";
    dataXML = dataXML + "<RAD_FUNCTIONS><FUNCTION_ID/><FUNCTION_TYPE/><FUNCTION_CATEGORY/><FUNCTION_ORIGIN/><PARENT_MODULE_ID/><PARENT_ORIGIN/><HEADER_TEMPLATE/><FOOTER_TEMPLATE/><ACTION/><RELEASE_TYPE/><CALL_FORM_TYPE/><LANG_CODE/><OPERATION/><ORIGINATION_DATE/><USER_ID/><RELEASE_CODE/><SFR_NO/><CHECKIN_MODE/><SITE_CODE/><SUB_PROJECT/><DDL_REMARKS/><MODIFIED_IN_KERNEL/><MODIFIED_IN_CLUSTER/><MODIFIED_IN_CUSTOM/><MODIFIED_IN_CUSTOMER/><PARENT_MODIFIED_IN_KERNEL/><PARENT_MODIFIED_IN_CLUSTER/><PARENT_MODIFIED_IN_CUSTOM/><PARENT_MODIFIED_IN_CUSTOMER/><TEMP_CORRECTION_DONE></TEMP_CORRECTION_DONE><ORDER_CORRECTION_DONE></ORDER_CORRECTION_DONE><RAD_KERNEL/></RAD_FUNCTIONS>";
    dom = loadXMLDoc(dataXML);

    if (parent.chngUIFlg == "Y" || parent.vwChg == "Y") {
        document.getElementsByName("ACTION")[0].value = "LOAD";
        document.getElementsByName("ACTION")[0].disabled = true;
        document.getElementsByName("BROWSE")[0].disabled = false;
        document.getElementsByName("FILE_SAVE_PATH")[0].disabled = false;
        document.getElementsByName("BROWSE")[0].style.visibility = "visible";
        document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
        setInnerText((document.getElementsByName("LBL_LOAD_XML")[0]), "Load Screen Xml");
        document.getElementsByName("CALL_FORM_TYPE")[0].disabled = true;
    }
    if (vwChg == "Y") {
    }
    else if (parent.chngUIFlg == "Y")
        fnAllowedOperations('RDDSCRDF');
    else 
        return;

}

function enableAction() {
    document.getElementsByName("ACTION")[0].disabled = false;
}

function upper(r) {
    r.value = r.value.toUpperCase();
}

function getSchemadetails() {
    document.getElementsByName("LANG")[0].value = language;
    document.getElementsByName("ORIGINATION_DATE")[0].value = originDate;
    document.getElementsByName("USER_ID")[0].value = username;
    document.getElementsByName("RELEASE_CODE")[0].value = relcode;
    document.getElementsByName("ENV_CODE")[0].value = envcode;
    document.getElementsByName("ACTION")[0].disabled = true;

}

function enableMasterFlds1() {

    if (document.getElementsByName("FUNCTION_CATEGORY")[0].value == "DASHBOARD") {
        document.getElementsByName("FUNCTION_TYPE")[0].disabled = true;
        document.getElementsByName("FUNCTION_CATEGORY")[0].disabled = true;
        document.getElementsByName("FUNCTION_TYPE")[0].value = "P";
        document.getElementsByName("FOOTER_TEMPLATE")[0].disabled = true;
        fnAllowUIChangeOnlyDashboard();
    }

}

function enableMasterFlds() {
    //document.getElementsByName("FOOTER_TEMPLATE")[0].disabled = false;
    if ((document.getElementsByName("FUNCTION_TYPE")[0].value == "C" || document.getElementsByName("FUNCTION_TYPE")[0].value == "S") && document.getElementsByName("ACTION")[0].value == "NEW") {
       // document.getElementById("PARENT_FUNC_ID").disabled = true;
        //document.getElementById("PARENT_XML").disabled = true;
        document.getElementById("FUNCTION_CATEGORY").disabled = false;
        document.getElementById("FUNCTION_ID").focus();
        //document.getElementsByName("BROWSEPRNT")[0].style.visibility = "visible";
        //document.getElementsByName("BROWSEPRNT")[0].disabled = false;

        if (document.getElementsByName("FUNCTION_TYPE")[0].value == "S") {
            fnAllowUIChangeOnly();
        }
        else {
            fnShowTree();
        }
    }
    else if (document.getElementsByName("FUNCTION_CATEGORY")[0].value == "DASHBOARD") {
        document.getElementsByName("FUNCTION_TYPE")[0].disabled = true;
        document.getElementsByName("FUNCTION_CATEGORY")[0].disabled = true;
        document.getElementsByName("FUNCTION_TYPE")[0].value = "P";
        //document.getElementsByName("FOOTER_TEMPLATE")[0].disabled = true;
        fnAllowUIChangeOnlyDashboard();
    }
    else {
       // document.getElementsByName("PARENT_FUNC_ID")[0].disabled = true;
        //document.getElementsByName("PARENT_XML")[0].disabled = true;
        document.getElementsByName("FUNCTION_CATEGORY")[0].disabled = false;
       // document.getElementsByName("BROWSEPRNT")[0].style.visibility = "hidden";
        fnShowTree();
    }

    if (document.getElementsByName("FUNCTION_CATEGORY")[0].value == "TRANSACTION" || document.getElementsByName("FUNCTION_CATEGORY")[0].value == "REPORT") {
       // document.getElementsByName("FOOTER_TEMPLATE")[0].value = "NONE";
       // document.getElementsByName("FOOTER_TEMPLATE")[0].disabled = true;
    }
	
	if (document.getElementsByName("FUNCTION_CATEGORY")[0].value == "MASTER") {
       fnShowTree_Master();
    } 
	else if(document.getElementsByName("FUNCTION_CATEGORY")[0].value == "SUBSYSTEM"){
	  fnShowTree_SubSystem();
	}
}

function BasicVals() {
    debug('Checking basic validations');
    var roleRights = parent.rolerights;

    var actIndex = document.getElementsByName("ACTION")[0].selectedIndex;
    var actVal = document.getElementsByName("ACTION")[0].options[actIndex].value;
    var funIndx = document.getElementsByName("FUNCTION_TYPE")[0].selectedIndex;
    var funType = document.getElementsByName("FUNCTION_TYPE")[0].options[funIndx].value;

    if (actVal == "LOAD") {
        // disableAll();
        fngetReadMode("SINGLE");
        document.getElementsByName("BROWSE")[0].disabled = false;
        document.getElementsByName("FILE_SAVE_PATH")[0].disabled = false;
        document.getElementsByName("BROWSE")[0].style.visibility = "visible";
        document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
        setInnerText((document.getElementsByName("LBL_LOAD_XML")[0]), "Load Screen Xml");
        document.getElementsByName("FUNCTION_ID")[0].disabled = true;
        document.getElementsByName("FUNCTION_TYPE")[0].disabled = true;
        document.getElementsByName("FUNCTION_CATEGORY")[0].disabled = true;
        //document.getElementsByName("PARENT_FUNC_ID")[0].disabled = true;
        //document.getElementsByName("HEADER_TEMPLATE")[0].disabled = true;
        //document.getElementsByName("FOOTER_TEMPLATE")[0].disabled = true;
        document.getElementsByName("LANG")[0].disabled = true;
        //document.getElementsByName("PARENT_XML")[0].disabled = true;
        //document.getElementsByName("BROWSEPRNT")[0].style.visibility = "hidden";
        //document.getElementsByName("BROWSEPRNT")[0].disabled = true;
        // document.getElementsByName("GEN_ALL")[0].disabled=false;
        document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbarD";
        document.getElementsByName("saveRADXml")[0].disabled = true;
        document.getElementsByName("genFiles")[0].className = "BUTTONToolbarD";
        document.getElementsByName("genFiles")[0].disabled = true;
        document.getElementsByName("depFiles")[0].className = "BUTTONToolbarD";
        document.getElementsByName("depFiles")[0].disabled = true;
        document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbarD";
        document.getElementsByName("chekinFiles")[0].disabled = true;
        document.getElementsByName("close")[0].className = "BUTTONToolbarD";
        document.getElementsByName("close")[0].disabled = true;
        document.getElementsByName("exit")[0].className = "BUTTONToolbar";
        document.getElementsByName("exit")[0].disabled = false;
        if (vwChg == "Y") {
            document.getElementsByName("CALL_FORM_TYPE")[0].disabled = true;
            document.getElementsByName("addLabels")[0].className = "BUTTONToolbarD";
            document.getElementsByName("addLabels")[0].disabled = true;
        }

    }
    else if (actVal == "NEW" && funType == "LNC") {
        if (parent.chngUIFlg == "Y") {
            setInnerText((document.getElementsByName("LBL_LOAD_XML")[0]), "Save XML Path");
            document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
            document.getElementsByName("FILE_SAVE_PATH")[0].disabled = true;
            return;
        }
        setInnerText((document.getElementsByName("LBL_LOAD_XML")[0]), "Save XML Path");
        document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
        document.getElementsByName("FILE_SAVE_PATH")[0].disabled = false;
        document.getElementsByName("BROWSE")[0].style.visibility = "hidden";
        document.getElementsByName("FUNCTION_ID")[0].disabled = false;
        document.getElementsByName("FUNCTION_TYPE")[0].disabled = false;
        document.getElementsByName("FUNCTION_CATEGORY")[0].disabled = false;
        //document.getElementsByName("PARENT_FUNC_ID")[0].disabled = false;
        document.getElementsByName("LANG")[0].disabled = false;
       // document.getElementsByName("PARENT_XML")[0].disabled = false;
        document.getElementsByName("BROWSEPRNT")[0].style.visibility = "visible";
        document.getElementsByName("BROWSEPRNT")[0].disabled = false;
        //document.getElementsByName("HEADER_TEMPLATE")[0].disabled = false;
       // document.getElementsByName("FOOTER_TEMPLATE")[0].disabled = false;
        document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbar";
        document.getElementsByName("saveRADXml")[0].disabled = false;
        document.getElementsByName("genFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("genFiles")[0].disabled = false;
        document.getElementsByName("close")[0].className = "BUTTONToolbar";
        document.getElementsByName("close")[0].disabled = false;
        document.getElementsByName("exit")[0].className = "BUTTONToolbarD";
        document.getElementsByName("exit")[0].disabled = true;
        //document.getElementById("PARENT_XML").focus();
        document.getElementsByName("FUNCTION_ORIGIN")[0].value = parent.relType;

    }
    else if (actVal == "NEW" && funType == "S") {
        if (parent.chngUIFlg == "Y") {
            setInnerText((document.getElementsByName("LBL_LOAD_XML")[0]), "Save XML Path");
            document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
            document.getElementsByName("FILE_SAVE_PATH")[0].disabled = true;
            return;
        }
        setInnerText(document.getElementsByName("LBL_LOAD_XML")[0], "Save XML Path");
        document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
        document.getElementsByName("FILE_SAVE_PATH")[0].disabled = false;
        document.getElementsByName("BROWSE")[0].style.visibility = "hidden";
        document.getElementsByName("FUNCTION_ID")[0].disabled = false;
        document.getElementsByName("FUNCTION_TYPE")[0].disabled = false;
        document.getElementsByName("FUNCTION_CATEGORY")[0].disabled = false;
        //document.getElementsByName("PARENT_FUNC_ID")[0].disabled = false;
        document.getElementsByName("LANG")[0].disabled = false;
        //document.getElementsByName("PARENT_XML")[0].disabled = false;
        //document.getElementsByName("BROWSEPRNT")[0].style.visibility = "visible";
        //document.getElementsByName("BROWSEPRNT")[0].disabled = false;
       // document.getElementsByName("HEADER_TEMPLATE")[0].disabled = false;
        //document.getElementsByName("FOOTER_TEMPLATE")[0].disabled = false;
        document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbar";
        document.getElementsByName("saveRADXml")[0].disabled = false;
        document.getElementsByName("genFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("genFiles")[0].disabled = false;
        document.getElementsByName("close")[0].className = "BUTTONToolbar";
        document.getElementsByName("close")[0].disabled = false;
        document.getElementsByName("exit")[0].className = "BUTTONToolbarD";
        document.getElementsByName("exit")[0].disabled = true;
        //document.getElementById("PARENT_XML").focus();
        document.getElementsByName("FUNCTION_ORIGIN")[0].value = parent.relType;
    }
    else if (actVal == "NEW" && funType == "LNM") {

        if (parent.chngUIFlg == "Y") {
            setInnerText((document.getElementsByName("LBL_LOAD_XML")[0]), "Save XML Path");
            document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
            document.getElementsByName("FILE_SAVE_PATH")[0].disabled = true;
            return;
        }
        setInnerText((document.getElementsByName("LBL_LOAD_XML")[0]), "Save XML Path");
        document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
        document.getElementsByName("FILE_SAVE_PATH")[0].disabled = false;
        document.getElementsByName("BROWSE")[0].style.visibility = "hidden";
        document.getElementsByName("FUNCTION_ID")[0].disabled = false;
        document.getElementsByName("FUNCTION_TYPE")[0].disabled = false;
        document.getElementsByName("FUNCTION_CATEGORY")[0].disabled = false;
        //document.getElementsByName("PARENT_FUNC_ID")[0].disabled = true;
       // document.getElementsByName("HEADER_TEMPLATE")[0].disabled = false;
       // document.getElementsByName("FOOTER_TEMPLATE")[0].disabled = false;
        document.getElementsByName("LANG")[0].disabled = false;
       // document.getElementsByName("PARENT_XML")[0].disabled = true;
       // document.getElementsByName("BROWSEPRNT")[0].style.visibility = "hidden";
       // document.getElementsByName("BROWSEPRNT")[0].disabled = true;
        document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbar";
        document.getElementsByName("saveRADXml")[0].disabled = false;
        document.getElementsByName("genFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("genFiles")[0].disabled = false;
        document.getElementsByName("depFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("depFiles")[0].disabled = false;
        document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbar";
        document.getElementsByName("chekinFiles")[0].disabled = false;
        document.getElementsByName("close")[0].className = "BUTTONToolbar";
        document.getElementsByName("close")[0].disabled = false;
        document.getElementsByName("exit")[0].className = "BUTTONToolbarD";
        document.getElementsByName("exit")[0].disabled = true;
        document.getElementsByName("FUNCTION_ORIGIN")[0].value = parent.relType;
        document.getElementsByName("CALL_FORM_TYPE")[0].disabled = false;
        document.getElementsByName("FUNCTION_ID")[0].focus();

    }
    else if (actVal == "NEW" && funType == "LNM") {
        alertMessage("New Not Allowed...", "E");
        document.getElementsByName("frmMAIN")[0].reset();
        return false;
    }
    else {
        setInnerText((document.getElementsByName("LBL_LOAD_XML")[0]), "Save XML Path");
        document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
        document.getElementsByName("FILE_SAVE_PATH")[0].disabled = true;
        document.getElementsByName("BROWSE")[0].style.visibility = "hidden";
        document.getElementsByName("FUNCTION_ID")[0].disabled = true;
        document.getElementsByName("FUNCTION_TYPE")[0].disabled = true;
        document.getElementsByName("FUNCTION_CATEGORY")[0].disabled = true;
        //document.getElementsByName("PARENT_FUNC_ID")[0].disabled = true;
       // document.getElementsByName("HEADER_TEMPLATE")[0].disabled = true;
       // document.getElementsByName("FOOTER_TEMPLATE")[0].disabled = true;
        document.getElementsByName("LANG")[0].disabled = false;
        //document.getElementsByName("PARENT_XML")[0].disabled = true;
       // document.getElementsByName("BROWSEPRNT")[0].disabled = true;
       // document.getElementsByName("BROWSEPRNT")[0].style.visibility = "hidden";
        document.getElementsByName("ACTION")[0].disabled = false;
        document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbarD";
        document.getElementsByName("saveRADXml")[0].disabled = true;
        document.getElementsByName("genFiles")[0].className = "BUTTONToolbarD";
        document.getElementsByName("genFiles")[0].disabled = true;
        document.getElementsByName("depFiles")[0].className = "BUTTONToolbarD";
        document.getElementsByName("depFiles")[0].disabled = true;
        document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbarD";
        document.getElementsByName("chekinFiles")[0].disabled = true;
        document.getElementsByName("close")[0].className = "BUTTONToolbarD";
        document.getElementsByName("close")[0].disabled = true;
        document.getElementsByName("exit")[0].className = "BUTTONToolbar";
        document.getElementsByName("exit")[0].disabled = false;
        document.getElementsByName("CALL_FORM_TYPE")[0].disabled = true;
    }

}

function winrtn() {
    logScreen = "C";
    var r = alertMessage("Changes Will Be Lost Do You Want To Proceed", "O");
}

function reloadForm() {
    debug('Reloading form');
    document.getElementsByTagName("SELECT")[3].value = "NONE";
    document.getElementsByName("ACTION")[0].value = "NONE";
    document.getElementsByName("FUNCTION_ID")[0].value = "";
    //document.getElementsByName("PARENT_FUNC_ID")[0].value = "";
    document.getElementsByName("FILE_SAVE_PATH")[0].value = "";
    document.getElementsByName("FUNCTION_TYPE")[0].value = "P";
    document.getElementsByName("close")[0].className = "BUTTONToolbarD";
    document.getElementsByName("close")[0].disabled = true;
    document.getElementsByName("exit")[0].className = "BUTTONToolbar";
    document.getElementsByName("exit")[0].disabled = false;
    document.getElementsByName("ACTION")[0].disabled = false;
    var nodes = selectNodes(dom, ("//RAD_FUNCTIONS"));
    for (var i = 0;i < nodes.length;i++) {
        nodes[i].parentNode.removeChild(nodes[i]);
    }
    dom = "";
    document.getElementById("treebody").innerHTML = firstTreeobject;
    setScreens("OTH");
    reInitVariables();
    Preobjec = "";
    previousNode = "";
    loadDOM();
    BasicVals();
    enableHeaderAction();
    disableAll2();
    paintTreeMenu();

}

function reloadGIForm() {
    document.getElementsByName("ACTION")[0].value = "NONE";
    document.getElementsByName("FUNCTION_ID")[0].value = "";
    document.getElementsByName("MAX_LINE_SIZE")[0].value = "";
    document.getElementsByName("FORMAT_DESCRIPTION")[0].value = "";
    document.getElementsByName("FORMAT_ID")[0].value = "";
    document.getElementsByName("FORMAT_CATEGORY")[0].value = "O";
    document.getElementsByName("close")[0].className = "BUTTONToolbarD";
    document.getElementsByName("close")[0].disabled = true;
    document.getElementsByName("exit")[0].className = "BUTTONToolbar";
    document.getElementsByName("exit")[0].disabled = false;
    document.getElementsByName("ACTION")[0].disabled = false;
    if (document.getElementById("FORMAT_ID").value != "") {
        var nodes = selectNodes(dom, ("//RAD_FUNCTIONS"));
        for (var i = 0;i < nodes.length;i++) {
            nodes[i].parentNode.removeChild(nodes[i]);
        }
    }
    dom = "";
    document.getElementById("treebody").innerHTML = firstTreeobject;
    giInterFace = true;
    setScreens("");
    Preobjec = "";
    previousNode = "";
    GIBasicVals();
    disableAll2();
    paintTreeMenu();

}

function winclose() {
    //self.close();
    javaScript : self.close();
}

function savexml() {
    debug('preparing files to generate files');

    try {
        var namevalueflag = checkNewCriteria();
        if (document.getElementById('BLIND_SEARCH').checked && !namevalueflag) {
            alertMessage("At least one minimum search character length is required for criteria based search  ", 'I');
        }
        else {
            var ua = navigator.userAgent.toLowerCase();
            if ((ua.indexOf("safari") !=  - 1) || (ua.indexOf("chrome") !=  - 1) || (ua.indexOf("opera") !=  - 1)) {
                dom = loadXMLDoc(getXMLString(dom));
            }
            var fileSavePath = document.getElementsByName("FILE_SAVE_PATH")[0].value;
            if (document.getElementsByName("ACTION")[0].value == "NEW") {
                fileSavePath = document.getElementsByName("FILE_SAVE_PATH")[0].value;
            }
            else if (document.getElementsByName("ACTION")[0].value == "LOAD") {
                fileSavePath = fileSavePath.substring(0, fileSavePath.length - 16);
            }
            fileSavePath = fileSavePath;
            document.getElementsByName("OPERATION")[0].value = "GENERATE";
            appendData("");
            loadSubScreenDIV("ChildWin", "RadGenerate_C.jsp"); 
        }
    }
    catch (e) {
        var ua = navigator.userAgent.toLowerCase();
        if ((ua.indexOf("safari") !=  - 1) || (ua.indexOf("chrome") !=  - 1) || (ua.indexOf("opera") !=  - 1)) {
            dom = loadXMLDoc(getXMLString(dom));
        }
        var fileSavePath = document.getElementsByName("FILE_SAVE_PATH")[0].value;
        if (document.getElementsByName("ACTION")[0].value == "NEW") {
            fileSavePath = document.getElementsByName("FILE_SAVE_PATH")[0].value;
        }
        else if (document.getElementsByName("ACTION")[0].value == "LOAD") {
            fileSavePath = fileSavePath.substring(0, fileSavePath.length - 16);
        }
        fileSavePath = fileSavePath;
        document.getElementsByName("OPERATION")[0].value = "GENERATE";
        appendData("");
        loadSubScreenDIV("ChildWin", "RadGenerate_C.jsp"); 
    }

}

function deploy_files() {
    debug('preparing files to deploy');
    var fileSavePath = document.getElementsByName("FILE_SAVE_PATH")[0].value;
    if (document.getElementsByName("ACTION")[0].value == "NEW") {
        fileSavePath = document.getElementsByName("FILE_SAVE_PATH")[0].value;
    }
    else if (document.getElementsByName("ACTION")[0].value == "LOAD") {
        fileSavePath = fileSavePath.substring(0, fileSavePath.length - 16);
    }

    fileSavePath = fileSavePath;
    document.getElementsByName("OPERATION")[0].value = "DEPLOY";
    appendData("");
    loadSubScreenDIV("ChildWin", "RadGenerate_C.jsp");

}

function fnRelease() {
    debug('preparing files to Release');
    var fileSavePath = document.getElementsByName("FILE_SAVE_PATH")[0].value;
    if (document.getElementsByName("ACTION")[0].value == "NEW") {
        fileSavePath = document.getElementsByName("FILE_SAVE_PATH")[0].value;
    }
    else if (document.getElementsByName("ACTION")[0].value == "LOAD") {
        fileSavePath = fileSavePath.substring(0, fileSavePath.length - 16);
    }

    fileSavePath = fileSavePath;
    document.getElementsByName("OPERATION")[0].value = "RELEASE";
    appendData("");

    loadSubScreenDIV("ChildWin", "RadGenerate_C.jsp");

}

function storeXml() {
    /*  
// old criteria backup
//vinit
    //document.getElementById("saveRADXml").disabled=true;
    debug('Preparing to save Radxml');
	var parenttableObj = document.getElementById("cri_src_btn");	
	var namevalueflag=checkNameValue();
	
	if(namevalueflag){
     alertMessage("Criteria name and value mismatch..please add properly ",'I');
	//break;
     }
	 else if(document.getElementById('BLIND_SEARCH').checked && parenttableObj.tBodies[0].rows.length<1 && !namevalueflag )	
	 alertMessage("Please add criteria for criteria based search  ",'I');
     //document.getElementById('BLIND_SEARCH').checked = true;
	  //old criteria backup
	 */
    var namevalueflag = checkNewCriteria();
    if (document.getElementById('BLIND_SEARCH').checked && !namevalueflag) {
        alertMessage("At least one minimum search character length is required for criteria based search  ", 'I');
    }
    else {
      /*  var ua = navigator.userAgent.toLowerCase();
        if ((ua.indexOf("safari") !=  - 1) || (ua.indexOf("chrome") !=  - 1) || (ua.indexOf("opera") !=  - 1)) {
            dom = loadXMLDoc(getXMLString(dom));
        }
		*/
        document.getElementsByName("OPERATION")[0].value = "SAVE";
        appendData("");
        saveradxml("0", "");
        //document.getElementById("saveRADXml").disabled=false;
    }
}

function Loadxml() {
    debug('Loading file');

    if ((document.getElementsByName("FUNCTION_TYPE")[0].value == "C" || document.getElementsByName("FUNCTION_TYPE")[0].value == "S") && document.getElementsByName("ACTION")[0].value == "NEW") {
        var retVal = Masterxml();
        createNodes();
        setInnerText((document.getElementsByName("LBL_LOAD_XML")[0]), "Save XML Path");
        document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
        document.getElementsByName("FILE_SAVE_PATH")[0].disabled = false;
        document.getElementsByName("FUNCTION_TYPE")[0].disabled = true;

        document.getElementsByName("FILE_SAVE_PATH")[0].value = "";
        document.getElementsByName("HEADER_TEMPLATE")[0].value = getNodeText(selectNodes(dom, ("//RAD_FUNCTIONS/HEADER_TEMPLATE"))[0]);
        document.getElementsByName("FOOTER_TEMPLATE")[0].value = getNodeText(selectNodes(dom, ("//RAD_FUNCTIONS/FOOTER_TEMPLATE"))[0]);
        document.getElementsByName("HEADER_TEMPLATE")[0].disabled = false;
        document.getElementsByName("FOOTER_TEMPLATE")[0].disabled = false;
        document.getElementsByName("ACTION")[0].disabled = true;
        document.getElementsByName("LANG")[0].disabled = false;
        document.getElementsByName("close")[0].className = "BUTTONToolbar";
        document.getElementsByName("close")[0].disabled = false;
        document.getElementsByName("exit")[0].className = "BUTTONToolbarD";
        document.getElementsByName("exit")[0].disabled = true;
    }
    else {
        var success = Loadradxml();
        if (success) {
            if (changeUIonly != "Y") {
            }
            createNodes();
            setInnerText((document.getElementsByName("LBL_LOAD_XML")[0]), "Save XML Path");
            document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
            document.getElementsByName("FILE_SAVE_PATH")[0].disabled = true;
            //document.getElementsByName("HEADER_TEMPLATE")[0].value = getNodeText(selectNodes(dom, ("//RAD_FUNCTIONS/HEADER_TEMPLATE"))[0]);
            //document.getElementsByName("FOOTER_TEMPLATE")[0].value = getNodeText(selectNodes(dom, ("//RAD_FUNCTIONS/FOOTER_TEMPLATE"))[0]);
           // document.getElementsByName("HEADER_TEMPLATE")[0].disabled = false;
            //document.getElementsByName("FOOTER_TEMPLATE")[0].disabled = false;
            document.getElementsByName("ACTION")[0].disabled = true;
            document.getElementsByName("LANG")[0].disabled = false;
            document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbar";
            document.getElementsByName("saveRADXml")[0].disabled = false;
            document.getElementsByName("genFiles")[0].className = "BUTTONToolbar";
            document.getElementsByName("genFiles")[0].disabled = false;
            document.getElementsByName("depFiles")[0].className = "BUTTONToolbar";
            document.getElementsByName("depFiles")[0].disabled = false;
            document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbar";
            document.getElementsByName("chekinFiles")[0].disabled = false;
            document.getElementsByName("close")[0].className = "BUTTONToolbar";
            document.getElementsByName("close")[0].disabled = false;
            document.getElementsByName("exit")[0].className = "BUTTONToolbarD";
            document.getElementsByName("exit")[0].disabled = true;
            if (parent.chngUIFlg == "Y") {
              //  document.getElementsByName("HEADER_TEMPLATE")[0].disabled = true;
              //  document.getElementsByName("FOOTER_TEMPLATE")[0].disabled = true;
            }
            if (parent.vwChg == "Y") {
                document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbarD";
                document.getElementsByName("saveRADXml")[0].disabled = true;
                document.getElementsByName("genFiles")[0].className = "BUTTONToolbarD";
                document.getElementsByName("genFiles")[0].disabled = true;
                document.getElementsByName("depFiles")[0].className = "BUTTONToolbarD";
                document.getElementsByName("depFiles")[0].disabled = true;
                document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbarD";
                document.getElementsByName("chekinFiles")[0].disabled = true;
               // document.getElementsByName("HEADER_TEMPLATE")[0].disabled = true;
               // document.getElementsByName("FOOTER_TEMPLATE")[0].disabled = true;
                document.getElementsByName("FUNCTION_ID")[0].value = getNodeText(selectNodes(dom, ('//RAD_FUNCTIONS/FUNCTION_ID'))[0]);
                document.getElementsByName("FUNCTION_TYPE")[0].value = getNodeText(selectNodes(dom, ('//RAD_FUNCTIONS/FUNCTION_TYPE'))[0]);
               // document.getElementsByName("PARENT_FUNC_ID")[0].value = getNodeText(selectNodes(dom, ('//RAD_FUNCTIONS/PARENT_FUNC_ID'))[0]);
            }
        }
        g_local_dir = document.getElementsByName("FILE_SAVE_PATH")[0].value;
    }

}

function createNodes() {
    var rootnode = selectSingleNode(dom, "//RAD_FUNCTIONS");
    var nodeArray = new Array();
    nodeArray = elementArray['RAD_MAIN'].split("~");
    for (var i = 0;i < nodeArray.length;i++) {
        if (selectSingleNode(rootnode, ("//RAD_FUNCTIONS/" + nodeArray[i])) == null) {
            var radFncts = dom.createElement(nodeArray[i]);
            rootnode.insertBefore(radFncts, selectSingleNode(rootnode, ("//RAD_FUNCTIONS/RAD_KERNEL")));

        }
    }
}

function appendAuditTemp() {
    setNodeText(selectNodes(dom, "//RAD_FUNCTIONS/FOOTER_TEMPLATE")[0], document.getElementsByName("FOOTER_TEMPLATE")[0].options.value);
    setNodeText(selectNodes(dom, "//RAD_FUNCTIONS/HEADER_TEMPLATE")[0], document.getElementsByName("HEADER_TEMPLATE")[0].options.value);
}

function createMainElements() {

    if (document.getElementsByName("FUNCTION_TYPE")[0].value == "LNM") {
        loadDOM();
        dom = dom;
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FUNCTION_ID")), document.getElementById('FUNCTION_ID').value);
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FUNCTION_CATEGORY")), document.getElementById('FUNCTION_CATEGORY').value);
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/ORIGINATION_DATE")), document.getElementById('ORIGINATION_DATE').value);
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/OPERATION")), document.getElementById('OPERATION').value);
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/USER_ID")), document.getElementById('USER_ID').value);
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/RELEASE_CODE")), document.getElementById('RELEASE_CODE').value);
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/TEMP_CORRECTION_DONE")), 'Y');
    }
    if (document.getElementsByName("FUNCTION_TYPE")[0].value == "LNC" || document.getElementsByName("FUNCTION_TYPE")[0].value == "S") {
        dom = dom;
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FUNCTION_ID")), document.getElementById('FUNCTION_ID').value);
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FUNCTION_CATEGORY")), document.getElementById('FUNCTION_CATEGORY').value);
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/OPERATION")), document.getElementById('OPERATION').value);
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/ORIGINATION_DATE")), document.getElementById('ORIGINATION_DATE').value);
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/USER_ID")), document.getElementById('USER_ID').value);
        setNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/RELEASE_CODE")), document.getElementById('RELEASE_CODE').value);
    }

}

function Populatexml(obj) {
    if (dom) {
        FUNCTION_ID.value = getNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FUNCTION_ID")));
        FUNCTION_CATEGORY.value = getNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FUNCTION_CATEGORY")));
        FUNCTION_TYPE.value = getNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/FUNCTION_TYPE")));
       // PARENT_FUNC_ID.value = getNodeText(selectSingleNode(dom, ("//RAD_FUNCTIONS/PARENT_FUNC_ID")));

    }
}

function addOption(obj, text, value, selected) {
    if (obj != null) {
        obj.options[obj.options.length] = new Option(text, value, false, selected);
    }
}

function getGlobalLovs() {
    if (!fnTestConnection()) {
        return false;
    }
    var gLOVList = "";
    gLOVList = " WHERE FUNCTION_ID='COMMON'";

    parent.gReqCode = 'UICONTROLLER';
    parent.gReqType = "APP";
    var radReqDOM = parent.buildRADXml();
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_TYPE"), "APP");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UICONTROLLER");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/RADORUSER"), "USER");
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R019" + parent.gBodySeparator + gLOVList, "RADClientHandler");

    glblLovListArray = response.split("<GLOV>");
    for (var cnt = 0;cnt < glblLovListArray.length;cnt++) {
        glblLovList += glblLovListArray[cnt].split("!")[0] + "~";
        glblLovRetFldsList[glblLovListArray[cnt].split("!")[0]] = glblLovListArray[cnt].split("!")[4] + "!" + glblLovListArray[cnt].split("!")[1];
    }
    glblLovList = glblLovList.substring(0, (glblLovList.length - 1));

}

function fnAddScrChldMnDtls() {
    if (document.getElementsByName("FUNCTION_TYPE")[0].value == "S") {
        if (basedom.xml != "") {
            var bseFuncId = "";
            var funcId = document.getElementById('FUNCTION_ID').value;
            var bseMenu = selectNodes(basedom, ("//RAD_KERNEL/RAD_FUNC_PREFERENCES/MENU_DETAILS/FUNCTION_ID"));
            var bseMenuLen = selectNodes(basedom, ("//RAD_KERNEL/RAD_FUNC_PREFERENCES/MENU_DETAILS/FUNCTION_ID")).length;
            for (var menuIndex = 0;menuIndex < bseMenuLen;menuIndex++) {
                if (getNodeText(bseMenu[menuIndex]).substr(2, 1) == 'D') {
                    bseFuncId = getNodeText(bseMenu[menuIndex]);
                }
            }
            if (bseFuncId != "") {
                setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/MENU_DETAILS[@ID='" + bseFuncId + "']"))[0], "FUNCTION_ID"), funcId);
                selectNodes(dom, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/MENU_DETAILS[@ID='" + bseFuncId + "']"))[0].setAttribute("ID", funcId);
                if (selectSingleNode(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY") != null) {
                    bseFuncId = bseFuncId.substr(0, 2) + "S" + bseFuncId.substr(3, bseFuncId.length);
                    funcId = funcId.substr(0, 2) + "S" + funcId.substr(3, funcId.length);
                    setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/MENU_DETAILS[@ID='" + bseFuncId + "']"))[0], "FUNCTION_ID"), funcId);
                    selectNodes(dom, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/MENU_DETAILS[@ID='" + bseFuncId + "']"))[0].setAttribute("ID", funcId);
                }
            }
        }
    }
}