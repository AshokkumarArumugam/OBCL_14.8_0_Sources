/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : RadSetEnv.js
**
** Module       : FCJWeb
**
** This source is part of the Oracle Flexcube Universal Banking
** Software System and is copyrighted by Oracle Financial Services Software Limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle Financial Services
** Software Limited.

** Oracle Financial Services Software Limited..
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright © 2012 - 2013  by Oracle Financial Services Software Limited.. 

---------------------------------------------------------------------------------------------------------*/
function setSchema() {	   
    document.getElementById("USER_ID").value = parent.username;
    document.getElementById("RELEASE_CODE_SETENV").value = parent.relCode;
    document.getElementById("ENV_CODE").value = parent.envCode;
    document.getElementById("ENV_LANG_CODE").value = parent.lang;
    document.getElementById("USER_DIR").value = parent.g_Wrk_Dir;
    document.getElementById("SAVEFORMAT").value = parent.saveformat;
    document.getElementById("XLFORMAT").value = parent.Xlformat;
    if (parent.Xmlformat == "Y")
        document.getElementById("XMLFORMAT").checked = true;
    else 
        document.getElementById("XMLFORMAT").checked = false;
    document.getElementById("ENV-DESC").value = parent.envDesc;
    document.getElementById("ENV-SCHME").value = parent.userSchema + "@" + parent.dbInst;
    document.getElementById("ENV-LNG").value = parent.initCap(parent.langDesc);
    document.getElementById("REL-CD").value = parent.relCode;
    document.getElementById("REL-TP").value = parent.relType;
    fnUsersaveformat();
    document.getElementById("Cancel").focus();
}

function exitwarn(seqNo, event) {
    var xml_flag = parent.Xmlformat;
    if (xml_flag == "Y") {
        xml_flag = true;
    }
    else {
        xml_flag = false;
    }

    if (document.getElementById("RELEASE_CODE_SETENV").value != parent.relCode || document.getElementById("ENV_CODE").value != parent.envCode || document.getElementById("ENV_LANG_CODE").value != parent.lang || document.getElementById("USER_DIR").value != parent.g_Wrk_Dir || document.getElementById("SAVEFORMAT").value != parent.saveformat || document.getElementById("XLFORMAT").value != parent.Xlformat || document.getElementById("XMLFORMAT").checked != xml_flag) {
        if (document.getElementById("RELEASE_CODE_SETENV").value != parent.relCode) {
            var r = alertMessage("New Release Details are not Set. Do You Want To Proceed without Changes?", "O");
        }
        else if (document.getElementById("ENV_CODE").value != parent.envCode) {
            var r = alertMessage("New Env details are not Set. Do You Want To Proceed without Changes?", "O");
        }
        else if (document.getElementById("ENV_LANG_CODE").value != parent.lang) {
            var r = alertMessage("New Language Details are not Set. Do You Want To Proceed without Changes?", "O");
        }
        else if (document.getElementById("USER_DIR").value != parent.g_Wrk_Dir) {
            var r = alertMessage("New User Path Details are not Set. Do You Want To Proceed without Changes?", "O");
        }
        else if (document.getElementById("SAVEFORMAT").value != parent.saveformat) {
            var r = alertMessage("New User Path Details are not Set. Do You Want To Proceed without Changes?", "O");
        }
        else if (document.getElementById("XLFORMAT").value != parent.Xlformat) {
            var r = alertMessage("New User Path Details are not Set. Do You Want To Proceed without Changes?", "O");
        }
        else if (document.getElementById("XMLFORMAT").checked != xml_flag) {
            var r = alertMessage("New User Path Details are not Set. Do You Want To Proceed without Changes?", "O");
        }
        if (r == true) {
            fnRADExitAll(seqNo, event);
            //parent.document.getElementById("PREFERENCES").focus();
        }
        else {
            return;
        }
    }
    else if (document.getElementById("RELEASE_CODE_SETENV").value == parent.relCode && document.getElementById("ENV_CODE").value == parent.envCode) {
        fnRADExitAll(seqNo, event);
    }
    //parent.document.getElementById("PREFERENCES").focus();
}

function postData() {
    if (fnSavedircheck() == false) {
        return false;
    }
    var reqData = "";
    envCode = parent.envCode = document.getElementById("ENV_CODE").value;
    relCode = parent.relCode = document.getElementById("RELEASE_CODE_SETENV").value;
    var envLangCode = document.getElementById("ENV_LANG_CODE").value;
    var savefmt = document.getElementById("SAVEFORMAT").value;
    var xsl_f = document.getElementById("XLFORMAT").value;
    var xml_f = document.getElementById("XMLFORMAT").checked;
    if (xml_f == true) {
        xml_f = "Y";
    }
    else {
        xml_f = "N";
    }
    var curDir = document.getElementById("USER_DIR").value;
    if (envCode == "" || relCode == "" || (envCode == "" && relCode == "")) {
        alertMessage("Release Code and Environment Code are Mandatory", "E");
        return;
    }

    var objHTTP = createHTTPActiveXObject();
    var finalRes = "";
    parent.gReqType = "GEN";
    parent.gReqCode = "SETRELEASE";
    var radReqDOM = parent.buildRADXml();
    var radnode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY");
    var setrelnode = radReqDOM.createElement("SETRELEASE");
    radnode.appendChild(setrelnode);
    var node = radReqDOM.createElement("RELEASE_CODE");
    setrelnode.appendChild(node);
    var node = radReqDOM.createElement("ENV_CODE");
    setrelnode.appendChild(node);
    var node = radReqDOM.createElement("ENV_LANG_CODE");
    setrelnode.appendChild(node);
    var node = radReqDOM.createElement("WORK_DIRECTORY");
    setrelnode.appendChild(node);
    var node = radReqDOM.createElement("SAVEFORMAT");
    setrelnode.appendChild(node);
    var node = radReqDOM.createElement("XLFORMAT");
    setrelnode.appendChild(node);
    var node = radReqDOM.createElement("XMLFORMAT");
    setrelnode.appendChild(node);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/SETRELEASE/RELEASE_CODE"), relCode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/SETRELEASE/ENV_CODE"), envCode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/SETRELEASE/ENV_LANG_CODE"), envLangCode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/SETRELEASE/WORK_DIRECTORY"), curDir);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/SETRELEASE/SAVEFORMAT"), savefmt);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/SETRELEASE/XLFORMAT"), xsl_f);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_BODY/SETRELEASE/XMLFORMAT"), xml_f);

    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "", "RADClientHandler");
    finalRes = loadXMLDoc(response);
    var jndi=getNodeText(selectSingleNode(finalRes, "//RAD_RES_ENV/RAD_BODY/SETRELEASE/USER_DETAILS/JNDI_NAME"));
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/USERSCHEMA"), jndi);
	
    var status = fnTestConnHere(radReqDOM);

	if (getNodeText(selectSingleNode(finalRes, "//RAD_RES_ENV/RAD_HEADER/MSGSTAT")) == "FAILURE" || !status) {
		if (!status) {
			alertMessage("Unable to connect to user schema", "E");
		} else {
			alertMessage(getNodeText(finalRes.getElementsByTagName("ERROR")[0]), "E");
		}
	}
    else {
        parent.setUserData(selectNodes(finalRes, "//RAD_RES_ENV/RAD_BODY/SETRELEASE"));
        parent.createTree(selectNodes(finalRes, "//RAD_RES_ENV/RAD_BODY/SETRELEASE/MENU_DETAILS")[0], "vTabCN_EXPLORE");
        setSchema();
        parent.document.getElementById("FCUBSLINK").href = parent.appUrl;
        alertMessage("User Preferences Set Successfully", "I");
    }
}
function fnTestConnHere(radReqDOM) {
	var query = "TEST_SUCCESS";
	try {
        var jndiName = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/USERSCHEMA");
        var envCode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ENV_CODE");
        setNodeText(selectSingleNode(radReqDOM, "//RAD_HEADER/REQ_TYPE"), 'APP');
        setNodeText(selectSingleNode(radReqDOM, "//RAD_HEADER/REQ_CODE"), 'UICONTROLLER');
        
        setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
        var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "R022" + parent.gBodySeparator +"ENV#"+ getNodeText(envCode), "RADClientHandler");
    }
     catch (e) {
		response = "<RESULT>Unknown error ocurred while testing connection</RESULT>"
	}
	return response == "<RESULT>TEST_SUCCESS</RESULT>";
}

function fnUserpvalid() {
    document.getElementById("ENV_CODE").value = "";
    document.getElementById("ENV_LANG_CODE").value = "";
}

function fnUsersaveformat() {
    document.getElementById("XMLFORMAT").disabled = false;
    if (document.getElementById("SAVEFORMAT").value == "ZIP") {
        document.getElementById("USER_DIR").value = "";
        parent.g_Wrk_Dir = "";
        document.getElementById("USER_DIR").disabled = true;
    }
    else {
        document.getElementById("USER_DIR").disabled = false;
    }
    if (document.getElementById("SAVEFORMAT").value == "CLIENT") {
        document.getElementById("XMLFORMAT").disabled = true;
        document.getElementById("XMLFORMAT").checked = false;
        fnIEsettingsval();
    }
    fnSavedircheck();
}

function addOption(obj, text, value, selected) {
    if (obj != null) {
        if (parent.vwChg != "Y")
            obj.options[obj.options.length] = new Option(text, value, false, selected);
        else {
            obj.options[obj.options.length] = new Option(text, value, false, selected);
            try {
                var action = selectSingleNode(dom, xpath + "[@ID='" + text + "']").getAttribute("Action");
                if (action != null && action == "New") {
                    obj.options[obj.options.length - 1].style.color = "009900";
                }
            }
            catch (e) {
            }
        }
    }
}

function fnSavedircheck() {
    /*if(document.getElementById("SAVEFORMAT").value=="SHARE")
   {
    var upath=document.getElementById("USER_DIR").value;
    if(upath.substring(0,2)=="\\\\")
      {
	  
      }
    else
    {
     document.getElementById("USER_DIR").value="";
	 alertMessage("Mention proper Shared path","E");
	 return false;
	 }
	}	*/
}