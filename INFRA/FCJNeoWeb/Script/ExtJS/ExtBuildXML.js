/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtBuildXML.js
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
** Oracle Financial Services Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.
Copyright © 2004-2016   by Oracle Financial Services Software Limited..
**
**  Modified By          : Neethu Sreedharan
**  Modified On          : 21-Jun-2017
**  Modified Reason      : Changes done to handle special character in primary key field  
**  Retro Source         : 9NT1606_12_2_WELLS_FARGO_BANK_NATIONAL_ASSOCIATION
**  Search String        : 9NT1606_12_4_RETRO_12_2_26230406
**
**  Modified By          : Nagendra Satrasala
**  Modified On          : 21-Apr-2023
**  Modified Reason      : Changes done to handle Date in summary screen search
**  Search String        : 35292346_CHANGES
**
**
**  Modified By          : Girish M
**  Modified On          : 30-Aug-2023
**  Modified Reason      : Changes done to handle defaultwhere clause for extensible screens.
**  Search String        : REDWOOD_35303024
**
**  Modified By          : Manoj S
**  Modified On          : 31-Aug-2023
**  Modified Reason      : Changes done to handle amount and number separator in BuildXML
**  Search String        : Redwood_35685127
**
**  Modified By          : Meenakshi/ Girish M
**  Modified On          : 21-Mar-2024
**  Modified Reason      : If values are manually keyed in summary search criteria and F8 is pressed, search was not happening.
**  Search String        : REDWOOD_36388737
**
**  Modified By          : Manoj S
**  Modified On          : 08-Jan-2025
**  Modified Reason      : If values are manually keyed in summary search criteria and F8 is pressed, search was not happening.
**  Search String        : REDWOOD_37304998 

----------------------------------------------------------------------------------------------------
*/
var isQuery = new Array();
var isControl = new Array();
var isControlFieldsArrValues = new Array();
 //REDWOOD_CHANGES
if ( typeof(extBpelJs) !=  'undefined' && extBpelJs != '' ) {
    coreBuildUBSXml = buildUBSXml;
     coreAddHeaderNode = addHeaderNode;
}
 //REDWOOD_CHANGES
function fnPreparelist() {
    var list = "";
    var tableNames = new Array();
    var qryCriteria;
    tableNames = dataSrcLocationArray;
//    var fldStartIndex1 = msgxml.indexOf("<FLD");  MSGXML suppression start
//    var fldEndIndex1 = msgxml.indexOf("</FLD>");
//
//    msgxml_fld1 = msgxml.substring(fldStartIndex1, fldEndIndex1);
//    msgxml_fld1 = msgxml_fld1 + "</FLD>";
 //   var dbFCJDOM = loadXMLDoc(msgxml_fld1);
   // var fnNodeList1 = selectNodes(dbFCJDOM, "//FLD/FN[@PARENT = '']");
    //var currFNNode = null; MSGXML suppression end
    var currFN = "";
    var fnTSL = "";
    var fnArray = null;
    var currField = null;
    var fieldName = "";
    var defaultPK = false;
    var colName = "";

    //Known limitation doesn't support detail blocks.
    list += "<FV><![CDATA[";
   // for (var nodeIndex = 0; nodeIndex < fnNodeList1.length; nodeIndex++) {  MSGXML suppression
      for(var currFNNodeName in fieldNameArray ){
        currFN = currFNNodeName;
        fnTSL = fieldNameArray[currFNNodeName] ;
        break;
      }
       // currFNNode = fnNodeList1[nodeIndex];  MSGXML suppression start
        //currFN = currFNNode.getAttribute("TYPE");
       // fnTSL = getNodeText(currFNNode); MSGXML suppression end
        fnArray = fnTSL.split("~");
        for (var colIndex = 0; colIndex < fnArray.length; colIndex++) {
            colName = fnArray[colIndex];

            fieldName = currFN + "__" + colName;
            currField = document.getElementById(fieldName);
            if (currField) {
                qryCriteria = getFieldData(currField);
				//Redwood_35685127 Starts
				 var txtObjHTML = getOuterHTML(currField);
				if (txtObjHTML.indexOf("amountConverter") !=  - 1 || txtObjHTML.indexOf("numberConverter") !=  - 1){
				   var re = new RegExp(gDigitGroupingSymbol, "g");
				   if (re =="/./g"){ //REDWOOD_36396834 
	                   re ="/\./g";
                   }
					if (typeof qryCriteria == "string") {
						qryCriteria = qryCriteria.replace(re, "");
					}     
				}
				//Redwood_35685127 Ends
                qryCriteria = (qryCriteria == null || qryCriteria == '') ? '%' : qryCriteria;
                if (qryCriteria == "%") {
                    qryCriteria = "";
                    list += qryCriteria + "~";
                    qryCriteria = "%";
                } else {
                    list += qryCriteria + "~";
                }
            } else {
                if (qryCriteria != "") {
                    qryCriteria = "%";
                    list += "~";
                } else {
                    if (qryCriteria == "%") {
                        qryCriteria = "";
                        list += qryCriteria + "~";
                        qryCriteria = "%";
                    }
                }
            }
        }
   // } MSGXML suppression

    list = list + "]]></FV>";
    qryCriteria = "";

    var type = dataSrcLocationArray[0];
    dbStrRecords = dbStrRecords + "<REC TYPE=\"" + type + "\"";
    if (dataSrcLocationArray[0] == type) {
        dbStrRecords = dbStrRecords + " RECID='1'";
    }
    dbStrRecords = dbStrRecords + ">";
    dbStrRecords = dbStrRecords + list;
    list = "";
    dbStrRecords = dbStrRecords + "</REC>";
    return dbStrRecords;
}

function buildFLD(ubsXMLDOM) {
  ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbFCJDOM.documentElement));    
  //dbFCJDOM = "";
}
var dbFCJDOM; 
function prepareFLD() {
  var fldStartIndex1 = msgxml.indexOf("<FLD");
      var fldEndIndex1 = msgxml.indexOf("</FLD>");
      msgxml_fld = msgxml.substring(fldStartIndex1, fldEndIndex1);
      msgxml_fld = msgxml_fld + "</FLD>";
      dbFCJDOM = loadXMLDoc(msgxml_fld);
}

function buildUBSXml(appendFld) {
    var ubsXMLDOM;
    ubsXMLDOM = addHeaderNode(ubsXMLDOM);
    var ubsnode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV");
    var bodyNode = ubsXMLDOM.createElement("FCUBS_BODY");
    ubsnode.appendChild(bodyNode);
    
    
    if ((typeof (screenType) != 'undefined' && (screenType == 'WB' ||  screenType == 'R' || screenType == 'P' || screenType == 'T'))||(typeof(functionId)!='undefined' &&  isFLDRequired(functionId))) 
        appendFld = true;
    else if(typeof (appendFld) == 'undefined' )
        appendFld = false;
    if(typeof(appendFld) != 'undefined' && appendFld == true) {
        prepareFLD();
    }
    
    if (gAction == "EXECUTEQUERY") {
        fnExecuteQry(ubsXMLDOM, appendFld);
    } else if (gAction == "AUTHQUERY" || gAction == "DELETEQUERY" || gAction == "CHANGELOG") {
        fnAuthQuery(ubsXMLDOM);
    } else if (gAction == "AUTH" || gAction == "DELETE") {
        fnAuth(ubsXMLDOM);
    } else if (gAction != "EXECUTEQUERY" && gAction != "AUTHQUERY" && gAction != "DELETEQUERY" && gAction != "CHANGELOG") {
        var rootNode = selectSingleNode(dbDataDOM, "/");
        var childNodes = rootNode.childNodes;
        var currNode = childNodes[0];
        dbStrRecords = "";
        processNode(currNode,appendFld);
        if(typeof(appendFld) != 'undefined' && appendFld == true) {
            buildFLD(ubsXMLDOM);
        }
        var dbStrRecordsDOM = loadXMLDoc(dbStrRecords);  
        //ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbFCJDOM.documentElement));
        ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbStrRecordsDOM.documentElement));
    }
    fnHasAttachments(ubsXMLDOM, bodyNode);
    fnBuildAddlNode(ubsXMLDOM, xmlns, bodyNode);
    if ((gAction == "NEW" || gAction == "MODIFY" || gAction == "BPELIMAGEUPLOAD") && attachmentData.length > 0) {
        ubsXMLDOM = createAttachmentNode(ubsXMLDOM);
    }
    dbFCJDOM = "";
    return ubsXMLDOM;
}

// 10.3 request XML changes - Added new method
function fnHasAttachments(ubsXMLDOM, bodyNode, xmlns) {
    var attachments = '';
    var tempName;
    var tempName_var = "";
    if (gAction != "EXECUTEQUERY" && gAction != "AUTHQUERY") {
        for (tempName_var in fileAttachments) {
            if (tempName_var != "") {
                var attachsNode = ubsXMLDOM.createElement("ATTACHMENTS");
                bodyNode.appendChild(attachsNode);
            }
        }
        for (tempName in fileAttachments) {
            attachments = attachments + fileAttachments[tempName];
            if (attachments != '') {
                var fileattachDOM = loadXMLDoc(attachments);
                attachments = "";
                attachsNode.appendChild(getCloneDocElement(fileattachDOM.documentElement));
            }
        }
    }
}

// 10.3 request XML changes - Added new method
function fnBuildAddlNode(ubsXMLDOM, xmlns, bodyNode) {
    var addlNode = ubsXMLDOM.createElement("MISC");
    bodyNode.appendChild(addlNode);
    var remarksNode = ubsXMLDOM.createElement("REMARKS");
    addlNode.appendChild(remarksNode);

}

// 10.3 request XML changes - Made this variable global
var xmlns = "";

// 10.3 request XML changes - Added new method
function addHeaderNode(ubsXMLDOM) {
    var ubsXML = '<?xml version="1.0"?><FCUBS_REQ_ENV/>';
    ubsXMLDOM = loadXMLDoc(ubsXML);
    var ubsnode = selectSingleNode(ubsXMLDOM, "//FCUBS_REQ_ENV");
    var headerNode = ubsXMLDOM.createElement("FCUBS_HEADER");
    ubsnode.appendChild(headerNode);
    var sourceNode = ubsXMLDOM.createElement("SOURCE");
    headerNode.appendChild(sourceNode);
    var ubscompNode = ubsXMLDOM.createElement("UBSCOMP");
    headerNode.appendChild(ubscompNode);
    var userIdnode = ubsXMLDOM.createElement("USERID");
    headerNode.appendChild(userIdnode);
    var branchNode = ubsXMLDOM.createElement("BRANCH");
    headerNode.appendChild(branchNode);
    var serviceNode = ubsXMLDOM.createElement("SERVICE");
    headerNode.appendChild(serviceNode);
    var opnode = ubsXMLDOM.createElement("OPERATION");
    headerNode.appendChild(opnode);
    var multitripNode = ubsXMLDOM.createElement("MULTITRIPID");
    headerNode.appendChild(multitripNode);
    var funcIdnode = ubsXMLDOM.createElement("FUNCTIONID");
    headerNode.appendChild(funcIdnode);
    var actionNode = ubsXMLDOM.createElement("ACTION");
    headerNode.appendChild(actionNode);
    var msgstatusNode = ubsXMLDOM.createElement("MSGSTAT");
    headerNode.appendChild(msgstatusNode);
    var moduleidNode = ubsXMLDOM.createElement("MODULEID");
    headerNode.appendChild(moduleidNode);
    //FCUBS10.3_WebBranch changes for validation layer starts
    var messageidNode = ubsXMLDOM.createElement("MSGID");
    headerNode.appendChild(messageidNode);
    var debugNode = ubsXMLDOM.createElement("DEBUG_MODE");
    headerNode.appendChild(debugNode);
    var entitynode = ubsXMLDOM.createElement("ENTITY");
    headerNode.appendChild(entitynode);
    //var sessionNode = ubsXMLDOM.createElement("APP_SESSIONID");
    //headerNode.appendChild(sessionNode);
    //var userLevelDebugNode = ubsXMLDOM.createElement("DEBUG_ENABLED");
   // headerNode.appendChild(userLevelDebugNode);
    //11.1 Remarks Changes - Starts Here
    if (typeof (remarksReq) != "undefined" && remarksReq == "Y") {
        var remarksNode = ubsXMLDOM.createElement("MAKERREMARKS");
        headerNode.appendChild(remarksNode);

        var ovdRemarksNode = ubsXMLDOM.createElement("MAKEROVDREMARKS");
        headerNode.appendChild(ovdRemarksNode);

        var checkerRemarksNode = ubsXMLDOM.createElement("CHECKERREMARKS");
        headerNode.appendChild(checkerRemarksNode);
    }
    //Snapshot ID Changes Starts Here
    
	var snapShotIdNode = ubsXMLDOM.createElement("SNAPSHOTID");
	headerNode.appendChild(snapShotIdNode);
    
    //Snapshot ID Changes Ends Here
	
    var pkVals = "";
    for (var i = 0; i < pkFields.length; ++i) {
        if (document.getElementById(pkFields[i])) {
//REDWOOD_CHANGES
            var formatter = document.getElementById(pkFields[i]).getAttribute('day-formatter');
            var converterType = document.getElementById(pkFields[i]).getAttribute('converter');
            if ((formatter && formatter.includes('dayFormatter')) || 
                (converterType && (converterType.includes("numberConverter") || converterType.includes("amountConverter")))) {
            pkVals = pkVals + "~" + document.getElementById(pkFields[i]).value;
            } else {
                pkVals = pkVals + "~" + (document.getElementById(pkFields[i]).rawValue || document.getElementById(pkFields[i]).value);//REDWOOD_37304998
            }	
//REDWOOD_CHANGES
        }
    }
    if (pkVals != "") {
        pkVals = pkVals.substring(1);
    }
    /* 9NT1606_12_4_RETRO_12_2_26230406 starts */
	pkVals = replaceAllChar(pkVals,"/","_SLH_"); 
    pkVals = replaceAllChar(pkVals,"+","_PLS_"); 
	pkVals = replaceAllChar(pkVals,"(","_OCB_"); 
	pkVals = replaceAllChar(pkVals,")","_CCB_");
	pkVals = replaceAllChar(pkVals,"-","_HYB_");
	/*9NT1606_12_4_RETRO_12_2_26230406 ends*/
	pkVals = replaceAllChar(pkVals,",","_CMA_"); //Fix for 30791337
    var pkValsNode = ubsXMLDOM.createElement("PKVALS");
    headerNode.appendChild(pkValsNode);
    setNodeText(pkValsNode, pkVals);
    
    /*Changes for PKFIELDS start*/
     var pkFieldsReq = "";
    for (var i = 0; i < pkFields.length; ++i) {
        if (document.getElementById(pkFields[i])) {
            //pkVals = pkVals + "~" + document.getElementById(pkFields[i]).value;
            pkFieldsReq = pkFieldsReq +"~"+ pkFields[i];
        }
    }
    if (pkFieldsReq != "") {
        pkFieldsReq = pkFieldsReq.substring(1);
    }
    var pkFldNode = ubsXMLDOM.createElement("PKFIELDS");
    headerNode.appendChild(pkFldNode);
    setNodeText(pkFldNode, pkFieldsReq);
    /*Changes for PKFIELDS end*/
    if (typeof (duplicateTaskcheckReq) != "undefined" && duplicateTaskcheckReq == "Y" && typeof (duplicateFieldList) != "undefined" && duplicateFieldList != "") //for CTCB 5 enhancement
    if (gAction.match('DUPLICATETASKCHECK')) {
        var addlNode = ubsXMLDOM.createElement("ADDL");
        headerNode.appendChild(addlNode);
        var paramNode = ubsXMLDOM.createElement("PARAM");
        addlNode.appendChild(paramNode);
        var nameNode = ubsXMLDOM.createElement("NAME");
        paramNode.appendChild(nameNode);
        var valueNode = ubsXMLDOM.createElement("VALUE");
        paramNode.appendChild(valueNode);
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[11].childNodes[0].childNodes[0], 'DUPLICATETASKCHECK');
        var duplicateFieldArray = duplicateFieldList.split("~");
        duplicateValueList = "";
        for (var i in duplicateFieldArray) {
            if (duplicateFieldArray[i] != "") {
                var tempfieldlist = duplicateFieldArray[i].split("__"); //ctcb change for duplicatetask        
                if (typeof (tempfieldlist[2]) != "undefined" && typeof (tempfieldlist[3]) != "undefined") {
                    var MEValueList = "";
                    for (var j = 0; j < selectNodes(dbDataDOM, "//" + tempfieldlist[0] + "[" + tempfieldlist[2] + "='" + tempfieldlist[3] + "']/" + tempfieldlist[1]).length; j++) {
                        MEValueList = MEValueList + "~" + getNodeText(selectNodes(dbDataDOM, "//" + tempfieldlist[0] + "[" + tempfieldlist[2] + "='" + tempfieldlist[3] + "']/" + tempfieldlist[1])[j]);
                    }
                    MEValueList = MEValueList.split("~").sort();
                    for (var k in MEValueList) {
                        duplicateValueList = duplicateValueList + MEValueList[k] + "~";
                    }
                } else {
                    duplicateValueList = duplicateValueList + getNodeText(selectSingleNode(dbDataDOM, "//" + tempfieldlist[0] + "/" + tempfieldlist[1])) + '~';
                }
            }
        }
        setNodeText(selectSingleNode(ubsXMLDOM, "//ADDL/PARAM[NAME='DUPLICATETASKCHECK']/VALUE"), duplicateValueList + "!" + getNodeText(selectSingleNode(txnXmlDOM, "//fcubs:txnId")));
    }
    if (functionId == 'CSDRASGN') if (gAction == 'BPELREASSIGN') {
        var addlNode = ubsXMLDOM.createElement("ADDL");
        headerNode.appendChild(addlNode);
        var paramNode = ubsXMLDOM.createElement("PARAM");
        addlNode.appendChild(paramNode);
        var nameNode = ubsXMLDOM.createElement("NAME");
        paramNode.appendChild(nameNode);
        var valueNode = ubsXMLDOM.createElement("VALUE");
        paramNode.appendChild(valueNode);
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[11].childNodes[0].childNodes[0], 'BPELREASSIGN')
        valueList = taskId + '~' + rUserId + '~' + status;
        setNodeText(selectSingleNode(ubsXMLDOM, "//ADDL/PARAM[NAME='BPELREASSIGN']/VALUE"), valueList);
    }
    
    /*Amend Array Changes Start*/
    if(typeof(originSystem)!= "undefined" && originSystem!="" ){
        if(gAction == "UNLOCK"){
            var origin_Node = ubsXMLDOM.createElement("ORIGIN_SOURCE");
            headerNode.appendChild(origin_Node);
            setNodeText(origin_Node, document.getElementById(originSystem).value);
            var actualActionNode = ubsXMLDOM.createElement("ACTUAL_ACTION");
            headerNode.appendChild(actualActionNode);
            if(actualAction !=""){
                setNodeText(actualActionNode, actualAction);            
            }else{
                setNodeText(actualActionNode, "UNLOCK");            
            }
        }      
    }
    /*Amend Array Changes End*/
    
    setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[8], gAction);
    setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[0], "FLEXCUBE");
    setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[2], mainWin.UserId);
    setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[3], g_txnBranch);
    setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[1], "FCUBS");
    setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[7], functionId);
    setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[8], gAction);
    var module = "";
    if (typeof (moduleid) == 'undefined') module = functionId.substring(0, 2);
    else module = moduleid;
    setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[10], module);
    setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[12], mainWin.DebugFlg);//Debug revert
    setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[13], mainWin.entity);
    
    //setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[12], mainWin.DebugFlg);
    //setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[14], mainWin.userLevelDbgEnabled);
    
    //11.1 Remarks Changes - Starts Here
    if (typeof (remarksReq) != "undefined" && remarksReq == "Y") {
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[14], maker_Remarks);
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[15], makerOverideRemarks);
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[16], checkerRemarks);
		//Snapshot ID Changes Starts Here
        setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[17], snapShotId);
	    //Snapshot ID Changes Ends Here
    }
        //Snapshot ID Changes Starts Here
        else{
		setNodeText(ubsXMLDOM.documentElement.childNodes[0].childNodes[14], snapShotId);
    }
    //Snapshot ID Changes Ends Here
    
    //11.1 Remarks Changes - Ends Here
    return ubsXMLDOM;
}

// 10.3 request XML changes - Added new method
function fnExecuteQry(ubsXMLDOM, appendFld) {
    dbStrRecords = "";
    
    fnPreparelist();
    var dbStrRecordsDOM = loadXMLDoc(dbStrRecords);
    if(typeof(appendFld) != 'undefined' && appendFld == true)
          buildFLD(ubsXMLDOM);
    //ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbFCJDOM.documentElement));
    ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbStrRecordsDOM.documentElement));
}

// 10.3 request XML changes - Added new method
function fnAuthQuery(ubsXMLDOM) {
    dbStrRecords = "";
    var fnStartIndex1 = msgxml.indexOf("<FN");
    var fnEndIndex1 = msgxml.lastIndexOf("</FN>");
    msgxml_fn = '<FLD>' + msgxml.substring(fnStartIndex1, fnEndIndex1);
    msgxml_fn += '</FN>';
    msgxml_fn += '<FN ISQUERY="0" PARENT="' + dbStrRootTableName + '"  RELATION="" TYPE="BLK_AUDIT_LOG">MODNO~TXNSTAT~FIRSTAUTHSTAT~AUTHSTAT~MAKER~MAKERSTAMP~FIRSTCHECKER~FIRSTCHECKERSTAMP~CHECKER~CHECKERSTAMP~MAKERREMARKS~FIRSTCHECKERREMARKS~CHECKERREMARKS</FN><FN ISQUERY="0" PARENT="BLK_AUDIT_LOG" RELATION="BLK_AUDIT_LOG.MODNO=BLK_OVERRIDE_MASTER.MODNO" TYPE="BLK_OVERRIDE_MASTER">MODNO~REQID~MAKEROVDREMARKS</FN><FN ISQUERY="0" PARENT="BLK_AUDIT_LOG" RELATION="" TYPE="BLK_OVERRIDE_DETAILS">REQID~WCODE~WDESC</FN><FN ISQUERY="0" PARENT="BLK_AUDIT_LOG" RELATION="BLK_AUDIT_LOG.MODNO=BLK_FIELD_LOG.MODNO" TYPE="BLK_FIELD_LOG">MODNO~FIELDNAME~OLDVALUE~NEWVALUE</FN>';
    msgxml_fn += '</FLD>';
    var dbFCJDOM2 = loadXMLDoc(msgxml_fn);
    fnPreparelist();
    var dbStrRecordsDOM = loadXMLDoc(dbStrRecords);
    ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbFCJDOM2.documentElement));
    ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbStrRecordsDOM.documentElement));
}

// 10.3 request XML changes - Added new method
function fnAuth(ubsXMLDOM) {
    var rootNode = selectSingleNode(dbDataDOM, "/");
    var childNodes = rootNode.childNodes;
    var currNode = childNodes[0];

    dbStrRecords = "";
    dbFCJDOM = loadXMLDoc(msgxml_fld);
    processNode(currNode);
    var dbStrRecordsDOM = loadXMLDoc(dbStrRecords);
    ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbFCJDOM.documentElement));
    ubsXMLDOM.documentElement.childNodes[1].appendChild(getCloneDocElement(dbStrRecordsDOM.documentElement));
}

// 10.3 request XML changes - Added new method
function fnIsControlField(ubsXMLDOM, dbFCJDOM) {
    /*****************************************************************/
    /* Added for isControl 16/09/08 */
    var tmp_dbFCJDOM = selectNodes(dbFCJDOM, '//FLD/FN[@ISCONTROL="1"]');
    /*dbFCJDOM.selectNodes('//FLD/FN[@ISCONTROL="1"]').removeAll();*/
    var removeNode = selectNodes(dbFCJDOM, '//FLD/FN[@ISCONTROL="1"]');
    for (var i = 0; i < removeNode.length; i++) {
        removeNode[i].parentNode.removeChild(removeNode[i]);
    }
    var isControlNodes = "";
    for (var i = 0; i < tmp_dbFCJDOM.length; i++) {
        isControlNodes = isControlNodes + getXMLString(tmp_dbFCJDOM[i]);
    }
    var isControlFields = "";
    if (tmp_dbFCJDOM.length > 1) {
        for (var i = 0; i < tmp_dbFCJDOM.length; i++) {
            isControlFields = isControlFields + isControlNodes.substring(isControlNodes.indexOf(">") + 1, isControlNodes.indexOf("</FN>"));
            isControlNodes = isControlNodes.substring(isControlNodes.indexOf("</FN><FN") + 5, isControlNodes.length);
        }
    } else if (tmp_dbFCJDOM.length == 1) {
        isControlFields = isControlNodes.substring(isControlNodes.indexOf(">") + 1, isControlNodes.indexOf("</FN>"));
    }
    if (tmp_dbFCJDOM.length != 0) {
        var isControlFieldsArr = isControlFields.split("~");
        for (var i = 0; i < isControlFieldsArr.length; i++) {
            isControlFieldsArr[isControlFieldsArr[i]] = document.getElementById(isControlFieldsArr[i]).value;
        }
        isControlFieldsArrValues = isControlFieldsArr;
    }
    /* Added for isControl ends 16/09/08 */
    /*****************************************************************/
}

function createAttachmentNode(ubsXmlDOM) {

    var xml1 = getXMLString(ubsXmlDOM).substring(0, getXMLString(ubsXmlDOM).indexOf("<MISC>") - 6);
    var xml2 = getXMLString(ubsXmlDOM).substring(getXMLString(ubsXmlDOM).indexOf("<MISC>") - 6, getXMLString(ubsXmlDOM).length);
    var attachMentXML = getAttachmentxml();
    var l_dom = loadXMLDoc(xml1 + attachMentXML + xml2);
    return l_dom;
}

function buildSummaryQueryXML(fromAdv) {
    var strCriteria = "";
    var currPage = 1;
    var fetchSize = 15;
    var totalPages = 1;
	//Fix for 19767202
    //if (fromAdv != 'A') {
        //currPage = Number(getInnerText(document.getElementById("CurPage")));
        currPage = getInnerText(document.getElementById("CurPage"));
        fetchSize = document.getElementsByName("Records")[0].value;
        totalPages = getInnerText(document.getElementById("TotPgCnt"));
    //}
    if (totalPages == 1) totalPages = 0;
    var summaryFN = msgxml_sum.substring(msgxml_sum.indexOf("<FN"), msgxml_sum.indexOf("</FN>"));
    var sumfldTag = summaryFN.substring(summaryFN.indexOf(">") + 1, summaryFN.length);
    var queryOrderBy = defaultOrderByClause;
    var l_strCriteria = "";
    if (strCurrentTabId == 'idQuery') {
        debugs('Inside First Tab ', 'A');
        if (whereClause_adv == "" && orderByClause_adv == "") {
            l_strCriteria = getCriteriaList();
        } else {
            strCurrentTabId = 'idAdvanced';
            l_strCriteria = gGetAdvancedCriteria();
        }
    } else if (strCurrentTabId == 'idAdvanced') {
        debugs('Inside Advanced', 'A');
        l_strCriteria = gGetAdvancedCriteria();
    }
    //12.3_Bug#25772150 Changes Starts
    var sqNo = "";
    if(typeof(seqNo) != "undefined") {
       sqNo = seqNo;
    } else {
       sqNo = parent.seqNo;
    }
    //12.3_Bug#25772150 Changes Ends
    var sumPkFlds = "";
    for (var i = 0; i < queryFields.length; i++) {
        sumPkFlds = sumPkFlds + queryFields[i].substring(queryFields[i].lastIndexOf("__") + 2, queryFields[i].length) + "~";
    }
    strCriteria = '<FCJMSG SRC="' + mainWin.AppSource + '" ';
    strCriteria += 'BRANCH = "' + mainWin.CurrentBranch + '" ';
    strCriteria += 'USERID = "' + mainWin.UserId + '" ';
    strCriteria += 'MODULEID = "' + mainWin.CurrentModule + '" ';
    strCriteria += 'SUMPKFIELDS = "' + sumPkFlds + '" ';
    strCriteria += 'SQNO = "' + sqNo + '" >'; //12.3_Bug#25772150 Changes
    strCriteria += '<MAINTQRY TYPE="N" ROOTTABLE = "' + g_SummaryBlock + '" QUERYFROM="" QUERYORDERBY = "' + queryOrderBy + '" CURRENTPAGE = "' + currPage + '" FETCHSIZE = "' + fetchSize + '" TOTALPAGES = "' + totalPages + '" SUMFN= "' + sumfldTag + '">';
    strCriteria += l_strCriteria;
    //Debug revert start
    strCriteria += '</MAINTQRY></FCJMSG>' ;
    /*strCriteria +='<DEBUG_MODE>'+mainWin.userLevelDbgEnabled+'</DEBUG_MODE>';
    
    strCriteria +='<APP_SESSIONID/><SQNO>'+getSeqNo()+'</SQNO><FCUBS_DEBUG_RESP><AP_DEBUG/> <DB_DEBUG/><WB_DEBUG/></FCUBS_DEBUG_RESP></FCUBS_HEADER></FCJMSG>';*/// performance changes;Debug revert end
    var localDOM = loadXMLDoc(strCriteria);
    return localDOM;
}

function getCriteriaList() {//OJET Migration	//REDWOOD_CHANGES
    debugs("Inside method getCriteriaList", "P");
    var objBody = document.getElementById("TblQuery");
    var objInput = objBody.getElementsByTagName("OJ-INPUT-TEXT");  //REDWOOD_CHANGES
    var objSelect = objBody.getElementsByTagName("OJ-SELECT-SINGLE");	  //REDWOOD_CHANGES
    var txtInput;
    var tempStr = '';
    var strCriteria = '';
    for (var i = 0; i < objInput.length; i++) {
    if(objInput[i].id.toLowerCase().indexOf( 'oj-searchselect-filter') == -1){	   //REDWOOD_CHANGES
        txtInput = objInput[i];
        if ((txtInput) && txtInput.getAttribute("DBT") == "") //set default master table if table not present
        txtInput.setAttribute("DBT", g_SummaryBlock);
        if (txtInput.getAttribute("DBC") == null || txtInput.value == "") continue;
        var txtInput_check = 'N';
        if (txtInput.checked == true) {
            txtInput_check = 'Y';
        } else {
            txtInput_check = 'N';
        }  
//REDWOOD_CHANGES
//        if (txtInput.type.toUpperCase() == "CHECKBOX") {
//            if (txtInput.checked) {
//                if (txtInput.getAttribute("ON")) tempStr += txtInput.getAttribute("DBC") + '>' + txtInput.getAttribute("ON") + "~";
//                else tempStr += txtInput.getAttribute("DBC") + '>' + txtInput_check + "~";
//            } else {
//                if (txtInput.getAttribute("OFF")) tempStr += txtInput.getAttribute("DBC") + '>' + txtInput.getAttribute("OFF") + "~";
//                else tempStr += txtInput.getAttribute("DBC") + '>' + txtInput_check + "~";
//            }
//        } else if (txtInput.type.toUpperCase() == "RADIO") {
//            var l_RdoFldName = txtInput.name;
//            var l_RdoFlds = document.getElementsByName(l_RdoFldName);
//            var l_RdoChkdVal = "";
//            for (var l_RdoCnt = 0; l_RdoCnt < l_RdoFlds.length; l_RdoCnt++) {
//                if (l_RdoFlds[l_RdoCnt].checked) l_RdoChkdVal = l_RdoFlds[l_RdoCnt].value;
//            }
//            tempStr += txtInput.getAttribute("DBC") + '>' + l_RdoChkdVal + "~";
//        } else {	 
//REDWOOD_CHANGES
		     if (txtInput.value!=txtInput.rawValue){ //REDWOOD_36388737 
			       txtInput.value=txtInput.rawValue;
		      }
            if (txtInput.value) {
				// Retro bug 18312338 replace all occurance of & with &amp; start 
                //var temp_txtInputVal = (txtInput.value).replace('&', '&amp;');
				  var temp_txtInputVal = replaceAllChar(txtInput.value ,'&', '&amp;');
				// Retro bug 18312338 replace all occurance of & with &amp; end 
                //Fix for dot,comma issue begins
                if (getOuterHTML(txtInput).indexOf("displayAmount") != -1) {
                    temp_txtInputVal = txtInput.value;
                    temp_txtInputVal = temp_txtInputVal.replace(".", decimalSymbol);
                }
                if (getOuterHTML(txtInput).indexOf("displayFormattedNumber") != -1) {
                    temp_txtInputVal = txtInput.value;
                    temp_txtInputVal = temp_txtInputVal.replace(".", decimalSymbol);
                }
                //ends
                // FCUBS10.0ITR2 SFR 545. -- & 'll be recoganized as &amp;
                if (txtInput.value.indexOf('>') != -1) {
                    var re = new RegExp('>', "g");
                    temp_txtInputVal = temp_txtInputVal.replace(re, "^GT^");
                }
                if (txtInput.value.indexOf('~') != -1) {
                    var re = new RegExp('~', "g");
                    temp_txtInputVal = temp_txtInputVal.replace(re, "^TD^");
                }
                if (txtInput.getAttribute("today") != null) {//Summary save - calendar changes
                    temp_txtInputVal = "today";
                }
                tempStr += txtInput.getAttribute("DBC") + '>' + temp_txtInputVal + '~';
            }
        }
    }

    for (var j = 0; j < objSelect.length; j++) {
        txtInput = objSelect[j];
        if (txtInput.getAttribute("DBC") == null || txtInput.value == "") continue;
 //REDWOOD_CHANGES    
   if (txtInput.value) {
        if(typeof(txtInput.value) == 'number'){
            txtInput.value = ''+txtInput.value;
        } 
//REDWOOD_CHANGES
            var temp_txtInputVal = (txtInput.value).replace('&', '&amp;');

            if (txtInput.value.indexOf('>') != -1) {
                var re = new RegExp('>', "g");
                temp_txtInputVal = temp_txtInputVal.replace(re, "^GT^");
            }
            if (txtInput.value && txtInput.value.indexOf('~') != -1) {	 //REDWOOD_CHANGES
                var re = new RegExp('~', "g");
                temp_txtInputVal = temp_txtInputVal.replace(re, "^TD^");
            }
            //tempStr = tempStr + txtInput.getAttribute("DBC") + '>' + temp_txtInputVal;
            tempStr += txtInput.getAttribute("DBC") + '>' + temp_txtInputVal + '#SLCT~'; /*Fix for 17855306*/
        }
    }
     /* Fix for 16497868- Textarea support in Summary screen starts */
    var objTextarea = objBody.getElementsByTagName("TEXTAREA");
     for (var j = 0; j < objTextarea.length; j++) {
        txtInput = objTextarea[j];
        if ((txtInput) && txtInput.getAttribute("DBT") == "") 
        txtInput.setAttribute("DBT", g_SummaryBlock);
		//SFR#35317667 Starts
       if ((txtInput) && txtInput.getAttribute("DBC") == null && txtInput.value != "") 
        txtInput.setAttribute("DBC",txtInput.getAttribute("name"));
		//SFR#35317667 Ends
        if (txtInput.getAttribute("DBC") == null || txtInput.value == "") continue;
        if (txtInput.value != '') {
            var temp_txtInputVal = (txtInput.value).replace('&', '&amp;');
            if (getOuterHTML(txtInput).indexOf("displayAmount") != -1) {
                temp_txtInputVal = txtInput.value;
                temp_txtInputVal = temp_txtInputVal.replace(".", decimalSymbol);
            }
            if (getOuterHTML(txtInput).indexOf("displayFormattedNumber") != -1) {
                temp_txtInputVal = txtInput.value;
                temp_txtInputVal = temp_txtInputVal.replace(".", decimalSymbol);
            }
            if (txtInput.value.indexOf('>') != -1) {
                var re = new RegExp('>', "g");
                temp_txtInputVal = temp_txtInputVal.replace(re, "^GT^");
            }
            if (txtInput.value.indexOf('~') != -1) {
                var re = new RegExp('~', "g");
                temp_txtInputVal = temp_txtInputVal.replace(re, "^TD^");
            }
            tempStr += txtInput.getAttribute("DBC") + '>' + temp_txtInputVal + '~';
        }
    }
    /* Fix for 16497868- Textarea support in Summary screen */
	
	//35292346_CHANGES starts
	var objDate = objBody.getElementsByTagName("OJ-INPUT-DATE");	  
	
	for (var j = 0; j < objDate.length; j++) {
        txtInput = objDate[j];
        if (txtInput.getAttribute("DBC") == null || txtInput.value == "") continue;   
    if (txtInput.value) {
        if(typeof(txtInput.value) == 'number'){
            txtInput.value = ''+txtInput.value;
        } 
            var temp_txtInputVal = (txtInput.value).replace('&', '&amp;');

            if (txtInput.value.indexOf('>') != -1) {
                var re = new RegExp('>', "g");
                temp_txtInputVal = temp_txtInputVal.replace(re, "^GT^");
            }
            if (txtInput.value && txtInput.value.indexOf('~') != -1) {	 //REDWOOD_CHANGES
                var re = new RegExp('~', "g");
                temp_txtInputVal = temp_txtInputVal.replace(re, "^TD^");
            }
            tempStr += txtInput.getAttribute("DBC") + '>' + temp_txtInputVal + '~';
        }
    }
    //35292346_CHANGES ends
    if (tempStr.charAt(tempStr.length - 1) == '~') //remove last char '~'
    tempStr = tempStr.substring(0, tempStr.length - 1);
    var firstPKCols = pkFields[0].substring(pkFields[0].lastIndexOf('__') + 2, pkFields[0].length);
    var whereCls = "";
	defaultWhereClause =""; //REDWOOD_35303024
    whereCls = fnHandleDefaultWhere();
    if (whereCls != "" && whereCls.indexOf(firstPKCols) == -1) {
        strCriteria = '<TABLE ID="' + g_SummaryBlock + '">' + pkFields[0].substring(pkFields[0].lastIndexOf('__') + 2, pkFields[0].length) + ':*' + "~" + whereCls + tempStr + '</TABLE>';
    } else {
        strCriteria = '<TABLE ID="' + g_SummaryBlock + '">' + whereCls + tempStr + '</TABLE>';
    }

    if (whereCls != "" && strCriteria.indexOf(whereCls) == -1) {
        var strCriteriaBefore = strCriteria.substring(0, strCriteria.indexOf("</TABLE>"));
        var strCriteriaAfter = strCriteria.substring(strCriteria.indexOf("</TABLE>"), strCriteria.length);
        strCriteria = strCriteriaBefore + "~" + whereCls + strCriteriaAfter;

    }

    debugs("Exiting method getCriteriaList . Built criteria :\n" + strCriteria, "P");
    return strCriteria;
}

function fnHandleDefaultWhere() {
    var defWhere = defaultWhereClause;
    var newDefaultWhereClause = "";
    if (defWhere != "") {
        var defWhereArr = new Array();
        //there are more tilde seperated default bind variable.
        defWhereArr = defWhere.split('~');
        var l_DefWhrLen = defWhereArr.length;
        if (l_DefWhrLen == 0) l_DefWhrLen = 1;
        for (var l_index = 0; l_index < l_DefWhrLen; l_index++) {
            // Get each bind variable
            var currentBindvarPair = defWhereArr[l_index];
            if (currentBindvarPair.indexOf('dlgArg.mainWin.frames') != -1) {
                //The curent bind var contains a global parameter             
                var bindVar = currentBindvarPair.substring(0, currentBindvarPair.indexOf('>'));
                //var bindVal = eval(currentBindvarPair.substring(currentBindvarPair.indexOf('>') + 1, currentBindvarPair.length));
                var fnEval = new Function(currentBindvarPair.substring(currentBindvarPair.indexOf('>') + 1, currentBindvarPair.length));  
                var bindVal = fnEval();
                newDefaultWhereClause = newDefaultWhereClause + bindVar + '>' + bindVal;
                if (l_index < l_DefWhrLen - 1) {
                    newDefaultWhereClause = newDefaultWhereClause + '~';
                }
            } else {
                //The curent bind var does not contains a global parameter 
                newDefaultWhereClause = newDefaultWhereClause + currentBindvarPair;
                if (l_index < l_DefWhrLen - 1) {
                    newDefaultWhereClause = newDefaultWhereClause + '~';
                }
            }
        }
    } //end of if != ""
    return newDefaultWhereClause;
} //end of function
function gGetAdvancedCriteria() {
    var strCriteria = "";
    strCriteria += '<SUMTABLE>';
    strCriteria += g_SummaryBlock;
    strCriteria += '</SUMTABLE>';
    strCriteria += '<WHERE><![CDATA[';
    if (whereClause_adv != "") {
        var advDefWhrClause = fnDefaulWhereForAdvance();
        strCriteria += advDefWhrClause;
    }
    if (defaultWhereClause != "" && whereClause_adv != "") {
        strCriteria += " AND ";
    }

    strCriteria += whereClause_adv;
    strCriteria += ']]></WHERE>';
    strCriteria += '<ORDERBY>';
    strCriteria += orderByClause_adv;
    strCriteria += '</ORDERBY>';
    strCriteria += '<ADVVALUES><![CDATA[';
    strCriteria += advValueClause;
    strCriteria += ']]></ADVVALUES>';
    strCriteria += '<ADOPT><![CDATA[';
    strCriteria += advOperationClause;
    strCriteria += ']]></ADOPT>';
    strCriteria += '<ORDEBYOPT><![CDATA[';
    strCriteria += advOrderOptClause;
    strCriteria += ']]></ORDEBYOPT>';


    return strCriteria;
}

function fnDefaulWhereForAdvance() {
    var defaultWhereAdv = fnHandleDefaultWhere();
    var defWhereAdvArr = new Array();
    var finalWhereClause = "";
    defWhereAdvArr = defaultWhereAdv.split('~');
    var l_DefWhrLen = defWhereAdvArr.length;
    for (var len = 0; len < l_DefWhrLen; len++) {
        var currClause = defWhereAdvArr[len];
        if (currClause != "") {
            var dbc = currClause.split(">")[0];
            var value = currClause.split(">")[1];
            var dtype = getFldDType(dbc);
            if (dtype == "INT") {
                finalWhereClause = finalWhereClause + dbc + " = " + value;
            } else {
                finalWhereClause = finalWhereClause + dbc + " = '" + value + "'";
            }
            if (len < l_DefWhrLen - 1) finalWhereClause = finalWhereClause + "  AND ";
        }
    }
    return finalWhereClause;
}

function getFldDType(dbc) {
    var userLanguageCode = mainWin.LangCode;
    var xmlFile = "UIXML/" + userLanguageCode + "/" + detailFuncId + ".xml";
    var xmlDoc = loadXMLFile(xmlFile);
    var fldNode = selectSingleNode(xmlDoc, "//FIELD[NAME = '" + dbc + "']");
    var Dtype = "";
    if (fldNode && selectSingleNode(fldNode, "DTYPE")) {
        Dtype = getNodeText(selectSingleNode(fldNode, "DTYPE"));
    }
    if (Dtype == 'VARCHAR' || Dtype == 'VARCHAR2' || Dtype == 'CHAR') {
        Dtype = 'STRING';
    } else if (Dtype == 'NUMBER' || Dtype == 'INTEGER' || Dtype == 'NUMERIC') {
        Dtype = 'INT';
    } else if (Dtype == 'DATE') {
        Dtype = 'DATE';
    } else {
        Dtype = 'STRING';
    }
}


/*---------- copied from BuildXML.js Start-----------*/

/** added to build the request xml for web services call**/
// TODO event has to be passed from web services button RAD change
function fnBuildReqxml(service, operation, requesttype) {
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    var webDOM = buildUBSXml();
    var request_type = requesttype;
    setNodeText(webDOM.documentElement.childNodes[0].childNodes[4], service);
    setNodeText(webDOM.documentElement.childNodes[0].childNodes[5], operation);
    if (request_type == "F") {
        return (getXMLString(webDOM));
    } else if (request_type == "P") {
        var requestxml = fnBuildParReqxml(webDOM);
        return (requestxml);
    }
}

function fnBuildParReqxml(webDOM, e) {
    var event = window.event || e;
    buttonrowIndex = getRowIndex(event);
    var eventobject = getEventSourceElement(event);
    var blockDBT = eventobject.parentElement.parentElement.parentElement.parentElement.id;
    var currNode = blockDBT.substring(4, blockDBT.length);
    var request_xml = getXMLString(webDOM);
    var request_header = request_xml.substring(request_xml.indexOf("<FCUBS_REQ_ENV>"), request_xml.indexOf("<FCUBS_BODY>"));
    var fieldnodes_string = request_xml.substring(request_xml.indexOf("<FLD>") + 5, request_xml.indexOf("</FLD>"));
    var fieldnodes_array = fieldnodes_string.split("</FN>");
    for (var i = 0; i < fieldnodes_array.length; i++) {
        if (fieldnodes_array[i].indexOf("TYPE=" + '"' + currNode) != -1) {
            break;
        }
    }
    var fieldnode = fieldnodes_array[i] + "</FN>";
    fieldnode = "<FCUBS_BODY><FLD>" + fieldnode.substring(fieldnode.indexOf("<FN"), fieldnode.length) + "</FLD>";
    var field_value_string = request_xml.substring(request_xml.indexOf("<REC"), request_xml.indexOf("<MISC>") - 6);
    var field_value_array = field_value_string.split("</FV>");
    var fv_array = new Array();
    var count = 0;
    for (var i = 0; i < field_value_array.length; i++) {
        if (field_value_array[i].indexOf("TYPE=" + '"' + currNode) != -1) {
            fv_array[count] = field_value_array[i];
            count++;
        }
    }
    var fieldvalue = fv_array[buttonrowIndex - 1].substring(fv_array[buttonrowIndex - 1].indexOf("<REC"), fv_array[buttonrowIndex - 1].length) + "</FV></REC>";
    var endxml = request_xml.substring(request_xml.indexOf("<MISC>"), request_xml.indexOf("</FCUBS_REQ_ENV>") + 16);
    var webrequest = request_header + fieldnode + fieldvalue + endxml;
    return (webrequest);
}
/*---------- copied from BuildXML.js End-----------*/