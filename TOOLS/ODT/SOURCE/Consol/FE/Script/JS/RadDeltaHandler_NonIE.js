/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadDeltaHandler.js
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
  ** Copyright � 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
   Changed By         :Vikas Parmar
   Change Date		  :04-JAN-2023
   Change Description :Issue : CUSTOM developed screen is not loading in non-IE browser. 
                         Fix  : Fix provided to validate the custom screen details.
   Search String	  :Bug_36138507 
   Base Bug           : 34282199  
  
  -------------------------------------------------------------------------------------------------------
  */

var consdatascrs = "";

function ApplyreleaseChanges(NewDOM, funcid, func_type, action) {
    var reltype = parent.relType;
    var funcorg = getNodeText(selectSingleNode(NewDOM, ("//RAD_FUNCTIONS/FUNCTION_ORIGIN")));
    var funcid = funcid;
    var func_type = func_type;
    var action = action;
    dom = loadXMLDoc(getXMLString(NewDOM).toString());
    if (reltype == 'KERNEL') {
        consoldom = loadXMLDoc(getXMLString(dom).toString());
        funcdom = loadXMLDoc(getXMLString(dom).toString());
        if (func_type == 'C') {
            basedom = loadXMLDoc(getXMLString(dom).toString());
            if (action == 'LOAD') {
                var finalxml = loadXMLDoc(getXMLString(dom).toString());
                finalxml = childKernelOnKernel(finalxml);
                consoldom = loadXMLDoc(getXMLString(finalxml));
            }
        }
        if (func_type == 'S') {
            basedom = loadXMLDoc(getXMLString(dom).toString());
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CHILD_KERNEL").length != 0) {
                var finalxml = loadXMLDoc(getXMLString(dom).toString());
                finalxml = childKernelOnKernel(finalxml);
                consoldom = loadXMLDoc(getXMLString(finalxml));
                var bskNodes = selectNodes(basedom, "//RAD_KERNEL//*");
                for (var j = 0;j < bskNodes.length;j++) {
                    bskNodes[j].parentNode.removeChild(bskNodes[j]);
                }
                var nodes = selectNodes(consoldom, "//RAD_KERNEL/*");
                for (var i = 0;i < nodes.length;i++) {
                    selectSingleNode(basedom, "//RAD_KERNEL").appendChild(fnImportNode(basedom, getCloneDocElement(nodes[i])));
                }
            }
            else {
                var finalxml = loadXMLDoc(getXMLString(dom).toString());
                consoldom = loadXMLDoc(getXMLString(finalxml));
            }
            if (action == 'LOAD') {
                finalxml = scrchildKernelOnKernel(finalxml);
                consoldom = loadXMLDoc(getXMLString(finalxml));
            }
        }
        if (func_type == 'P') {
            var finalxml = loadXMLDoc(getXMLString(dom).toString());
            consoldom = loadXMLDoc(getXMLString(finalxml));
        }
    }
    if (reltype == 'CLUSTER') {
        basedom = loadXMLDoc(getXMLString(dom).toString());
        funcdom = getCloneDocElement(dom);
        if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CLUSTER").length != 0) {
            var finalxml = clusterOnKernel(dom);
            consoldom = loadXMLDoc(getXMLString(finalxml));
        }
        else {
            var finalxml = loadXMLDoc(getXMLString(dom));
            consoldom = loadXMLDoc(getXMLString(finalxml));
        }
        if (func_type == 'C') {
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CHILD_KERNEL").length != 0) {
                finalxml = childKernelOnKernel(finalxml);
                consoldom = loadXMLDoc(getXMLString(finalxml));
            }
            var bskNodes = selectNodes(basedom, "//RAD_KERNEL//*");
            for (var j = 0;j < bskNodes.length;j++) {
                bskNodes[j].parentNode.removeChild(bskNodes[j]);
            }
            var nodes = selectNodes(consoldom, "//RAD_KERNEL/*");
            for (var i = 0;i < nodes.length;i++) {
                selectSingleNode(basedom, "//RAD_KERNEL").appendChild(fnImportNode(basedom, getCloneDocElement(nodes[i])));
            }
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CHILD_CLUSTER").length != 0) {
                finalxml = childClusterOnKernel(finalxml);
                consoldom = loadXMLDoc(getXMLString(finalxml));
            }
        }
        if (func_type == 'S') {
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CHILD_KERNEL")) {
                if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CHILD_KERNEL").length != 0) {
                    finalxml = childKernelOnKernel(finalxml);
                    consoldom = loadXMLDoc(getXMLString(finalxml));
                }
            }
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CHILD_CLUSTER")) {
                if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CHILD_CLUSTER").length != 0) {
                    finalxml = childClusterOnKernel(finalxml);
                    consoldom = loadXMLDoc(getXMLString(finalxml));
                }
            }
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_SCRCHLD_KERNEL")) {
                if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_SCRCHLD_KERNEL").length != 0) {
                    finalxml = scrchildKernelOnKernel(finalxml);
                    consoldom = loadXMLDoc(getXMLString(finalxml));
                }
            }
            var bskNodes = selectNodes(basedom, "//RAD_KERNEL//*");
            for (var j = 0;j < bskNodes.length;j++) {
                bskNodes[j].parentNode.removeChild(bskNodes[j]);
            }

            var nodes = selectNodes(consoldom, "//RAD_KERNEL/*");
            for (var i = 0;i < nodes.length;i++) {
                selectSingleNode(basedom, "//RAD_KERNEL").appendChild(fnImportNode(basedom, getCloneDocElement(nodes[i])));
            }
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_SCRCHLD_CLUSTER")) {
                if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_SCRCHLD_CLUSTER").length != 0) {
                    finalxml = scrchildClusterOnKernel(finalxml);
                    consoldom = loadXMLDoc(getXMLString(finalxml));
                }
            }
        }
    }
    if (reltype == 'CUSTOM') {
        basedom = loadXMLDoc(getXMLString(dom).toString());
        funcdom = loadXMLDoc(getXMLString(dom).toString());
        if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CLUSTER").length != 0) {

            var finalxml = clusterOnKernel(dom);
            consoldom = loadXMLDoc(getXMLString(finalxml));
        }
        else {
            var finalxml = loadXMLDoc(getXMLString(dom));
            consoldom = loadXMLDoc(getXMLString(finalxml));
        }
        var bskNds = selectNodes(basedom, "//RAD_KERNEL//*");
        for (var bk = 0;bk < bskNds.length;bk++) {
            bskNds[bk].parentNode.removeChild(bskNds[bk]);
        }
        var nodes = selectNodes(consoldom, "//RAD_KERNEL/*");
        for (var i = 0;i < nodes.length;i++) {
            //selectSingleNode(basedom,"//RAD_KERNEL").appendChild(fnImportNode(basedom,getCloneDocElement(nodes[i])));
            selectSingleNode(basedom, "//RAD_KERNEL").appendChild(fnImportNode(basedom, nodes[i].cloneNode(true)));
        }

        if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CUSTOM").length != 0) {
            var finalxml = customOnKernel(finalxml);
            consoldom = loadXMLDoc(getXMLString(finalxml));
        }
        else {
            consoldom = consoldom;
            finalxml = finalxml;
        }
        if (func_type == 'C') {
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CHILD_KERNEL").length != 0) {
                finalxml = childKernelOnKernel(finalxml);
                consoldom = loadXMLDoc(getXMLString(finalxml));
            }
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CHILD_CLUSTER").length != 0) {
                finalxml = childClusterOnKernel(finalxml);
                consoldom = loadXMLDoc(getXMLString(finalxml));
            }
            var bskNds = selectNodes(basedom, "//RAD_KERNEL//*");
            for (var bk = 0;bk < bskNds.length;bk++) {
                bskNds[bk].parentNode.removeChild(bskNds[bk]);
            }

            var nodes = selectNodes(consoldom, "//RAD_KERNEL/*");
            for (var i = 0;i < nodes.length;i++) {
                //selectSingleNode(basedom, "//RAD_KERNEL").appendChild(fnImportNode(basedom, getCloneDocElement(nodes[i])));
                selectSingleNode(basedom, "//RAD_KERNEL").appendChild(fnImportNode(basedom, nodes[i].cloneNode(true)));
            }
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CHILD_CUSTOM").length != 0) {
                finalxml = childCustomOnKernel(finalxml);
                consoldom = loadXMLDoc(getXMLString(finalxml));
            }
        }
        if (func_type == 'S') {
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CHILD_KERNEL").length != 0) {
                finalxml = childKernelOnKernel(finalxml);
                consoldom = loadXMLDoc(getXMLString(finalxml));
            }
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CHILD_CLUSTER").length != 0) {
                finalxml = childClusterOnKernel(finalxml);
                consoldom = loadXMLDoc(getXMLString(finalxml));
            }
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_CHILD_CUSTOM").length != 0) {
                finalxml = childCustomOnKernel(finalxml);
                consoldom = loadXMLDoc(getXMLString(finalxml));
            }
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_SCRCHLD_KERNEL").length != 0) {
                finalxml = scrchildKernelOnKernel(finalxml);
                consoldom = loadXMLDoc(getXMLString(finalxml));
            }
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_SCRCHLD_CLUSTER").length != 0) {
                finalxml = scrchildClusterOnKernel(finalxml);
                consoldom = loadXMLDoc(getXMLString(finalxml));
            }
            var bskNds = selectNodes(basedom, "//RAD_KERNEL//*");
            for (var bk = 0;bk < bskNds.length;bk++) {
                bskNds[bk].parentNode.removeChild(bskNds[bk]);
            }
            var nodes = selectNodes(consoldom, "//RAD_KERNEL/*");
            for (var i = 0;i < nodes.length;i++) {
                selectSingleNode(basedom, "//RAD_KERNEL").appendChild(fnImportNode(basedom, getCloneDocElement(nodes[i])));
            }
            if (selectNodes(dom, "//RAD_FUNCTIONS/RAD_SCRCHLD_CUSTOM").length != 0) {
                finalxml = scrchildCustomOnKernel(finalxml);
                consoldom = loadXMLDoc(getXMLString(finalxml));
            }
        }
    }
    return consoldom;
}

//Function compares and restore the changes done in respective Releases nodes.
function RetroChangesToRespectiveRelease(dom) {
    var traildom = "";
    traildom = "<?xml version=\"1.0\"?>";
    traildom = loadXMLDoc(traildom);
    var funcorg = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_ORIGIN"));
    var parentOrg = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/PARENT_ORIGIN"));
    var reltype = parent.relType;
    var funcid = document.getElementsByName('FUNCTION_ID')[0].value;
    var func_type = document.getElementsByName('FUNCTION_TYPE')[0].value;
    consoldom = loadXMLDoc(getXMLString(dom).toString());
    if (funcdom != null)
        funcdom = loadXMLDoc(getXMLString(funcdom).toString());
    if (basedom != null)
        basedom = loadXMLDoc(getXMLString(basedom).toString());
    if (reltype == 'KERNEL' && (func_type != 'C' && func_type != 'S')) {
        funcdom = getCloneDocElement(dom);
        funcdom = loadXMLDoc(getXMLString(funcdom).toString());
    }
    if ((reltype == 'CLUSTER' || reltype == 'CUSTOM' || reltype == 'CUSTOMER') && (func_type != 'C' && func_type != 'S')) {
        var relNode = "RAD_" + reltype;
        var action = document.getElementById('ACTION').value;
        if (action == "NEW" && funcdom == null) {
            funcdom = getCloneDocElement(dom);
            var fncDm = selectNodes(funcdom, "//RAD_KERNEL//*");
            for (var fcd = 0;fcd < fncDm.length;fcd++) {
                fncDm[fcd].parentNode.removeChild(fncDm[fcd]);
            }
        }
        if (selectNodes(funcdom, "//" + relNode)[0] == null) {
            newl = traildom.createElement(relNode)
            head = selectNodes(funcdom, "//RAD_FUNCTIONS/RAD_KERNEL")[0];
            head.parentNode.appendChild(newl)
        }
        else {
            var fnDm = selectNodes(funcdom, ("//" + relNode + "//*"));
            for (var fdm = 0;fdm < fnDm.length;fdm++) {
                fnDm[fdm].parentNode.removeChild(fnDm[fdm]);
            }

        }
        //fnComparePreferences(relNode);		
        var len1 = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES").length;
        var nodes = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES");
        for (var i = 0;i < len1;i++) {
            selectSingleNode(funcdom, "//" + relNode).appendChild(fnImportNode(funcdom, nodes[i]));
        }
        fnComparedsn(relNode);
        fnResetDsnFieldsBlockName();
        fnComparescreens(relNode);
        fnResetBlkFieldsFieldsetName();
        fnComparedatablks(relNode);
        fnComparefieldset(relNode);
        fnComparelovs(relNode);
        var nodesact = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS");
        for (var acl = 0;acl < nodesact.length;acl++) {
            selectSingleNode(funcdom, "//" + relNode).appendChild(fnImportNode(funcdom, nodesact[acl]));
        }
        fnCompareCallforms(relNode, "RAD_CALLFORM");
        fnCompareCallforms(relNode, "RAD_LAUNCHFORM");
        var nodessmry = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
        for (var sml = 0;sml < nodessmry.length;sml++) {
            selectSingleNode(funcdom, "//" + relNode).appendChild(fnImportNode(funcdom, nodessmry[sml]));
        }
    }
    if (func_type == 'C') {
        var chlRelNode = "RAD_CHILD_" + reltype;
        if (selectNodes(funcdom, "//" + chlRelNode)[0] == null) {
            newl = traildom.createElement(chlRelNode)
            head = selectNodes(funcdom, "//RAD_FUNCTIONS/RAD_KERNEL")[0];
            head.parentNode.appendChild(newl);
        }
        else {
            var rmFcChl = selectNodes(funcdom, "//" + chlRelNode + "//*");
            for (var rch = 0;rch < rmFcChl.length;rch++) {
                rmFcChl[rch].parentNode.removeChild(rmFcChl[rch]);
            }

        }
        //fnComparePreferences(chlRelNode);
        var len1 = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES").length;
        var nodes = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES");
        for (var i = 0;i < len1;i++) {
            selectSingleNode(funcdom, "//" + chlRelNode).appendChild(fnImportNode(funcdom, nodes[i]));
        }
        fnComparedsn(chlRelNode);
        fnResetDsnFieldsBlockName();
        fnComparescreens(chlRelNode);
        fnResetBlkFieldsFieldsetName();
        fnComparedatablks(chlRelNode);
        fnComparefieldset(chlRelNode);
        fnComparelovs(chlRelNode);
        var len1 = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS").length;
        var nodes = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS");
        for (var i = 0;i < len1;i++) {
            selectSingleNode(funcdom, "//" + chlRelNode).appendChild(fnImportNode(funcdom, nodes[i]));
        }
        fnCompareCallforms(chlRelNode, "RAD_CALLFORM");
        fnCompareCallforms(chlRelNode, "RAD_LAUNCHFORM");
        var len1 = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
        var nodes = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
        for (var i = 0;i < len1;i++) {
            selectSingleNode(funcdom, "//" + chlRelNode).appendChild(fnImportNode(funcdom, nodes[i]));
        }
    }
    if (func_type == 'S') {
        var scchlRelNode = "RAD_SCRCHLD_" + reltype;
        if (selectNodes(funcdom, "//" + scchlRelNode)[0] == null) {
            newl = traildom.createElement(scchlRelNode);
            head = selectNodes(funcdom, "//RAD_FUNCTIONS/RAD_KERNEL")[0];
            head.parentNode.appendChild(newl)
        }
        else {
            var rmFcChl = selectNodes(funcdom, "//" + scchlRelNode + "//*");
            for (var rch = 0;rch < rmFcChl.length;rch++) {
                rmFcChl[rch].parentNode.removeChild(rmFcChl[rch]);
            }

        }
        //fnComparePreferences(scchlRelNode);
        var len1 = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES").length;
        var nodes = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES");
        for (var i = 0;i < len1;i++) {
            selectSingleNode(funcdom, "//" + scchlRelNode).appendChild(fnImportNode(funcdom, nodes[i]));
        }
        fnComparedsn(scchlRelNode);
        fnResetDsnFieldsBlockName();
        fnComparescreens(scchlRelNode);
        fnResetBlkFieldsFieldsetName();
        fnComparedatablks(scchlRelNode);
        fnComparefieldset(scchlRelNode);
        fnComparelovs(scchlRelNode);
        var len1 = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS").length;
        var nodes = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS");
        for (var i = 0;i < len1;i++) {
            selectSingleNode(funcdom, "//" + scchlRelNode).appendChild(fnImportNode(funcdom, nodes[i]));
        }
        fnCompareCallforms(scchlRelNode, "RAD_CALLFORM");
        fnCompareCallforms(scchlRelNode, "RAD_LAUNCHFORM");
        var len1 = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
        var nodes = selectNodes(consoldom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
        for (var i = 0;i < len1;i++) {
            selectSingleNode(funcdom, "//" + scchlRelNode).appendChild(fnImportNode(funcdom, nodes[i]));
        }
    }
    if (funcorg == 'CLUSTER' && parentOrg != 'KERNEL' && func_type == 'P') {
        var rmFcK = selectNodes(funcdom, "//RAD_KERNEL//*");
        for (var rfk = 0;rfk < rmFcK.length;rfk++) {
            rmFcK[rfk].parentNode.removeChild(rmFcK[rfk]);
        }
    }
    if (funcorg == 'CUSTOM' && func_type == 'P') {
        if (parentOrg != 'KERNEL') {
            var rmFcK = selectNodes(funcdom, "//RAD_KERNEL//*");
            for (var rfk = 0;rfk < rmFcK.length;rfk++) {
                rmFcK[rfk].parentNode.removeChild(rmFcK[rfk]);
            }
        }
        if (parentOrg != 'CLUSTER') {
            var rmFcCst = selectNodes(funcdom, "//RAD_CLUSTER//*");
            for (var rfcs = 0;rfcs < rmFcCst.length;rfcs++) {
                rmFcCst[rfcs].parentNode.removeChild(rmFcCst[rfcs]);
            }
        }
    }
    if (funcorg == 'CUSTOMER' && func_type == 'P') {
        if (parentOrg != 'KERNEL') {
            var rmFcK = selectNodes(funcdom, "//RAD_KERNEL//*");
            for (var rfk = 0;rfk < rmFcK.length;rfk++) {
                rmFcK[rfk].parentNode.removeChild(rmFcK[rfk]);
            }
        }
        if (parentOrg != 'CLUSTER') {
            var rmFcCst = selectNodes(funcdom, "//RAD_CLUSTER//*");
            for (var rfcs = 0;rfcs < rmFcCst.length;rfcs++) {
                rmFcCst[rfcs].parentNode.removeChild(rmFcCst[rfcs]);
            }
        }
        if (parentOrg != 'CUSTOM') {
            var rmFcCst = selectNodes(funcdom, "//RAD_CUSTOM//*");
            for (var rfcs = 0;rfcs < rmFcCst.length;rfcs++) {
                rmFcCst[rfcs].parentNode.removeChild(rmFcCst[rfcs]);
            }
        }
    }
    fnupdateHeaderNodes(consoldom, funcdom);
    return funcdom;
}

function fnComparedsn(mainode) {
    var consdatascrs = selectNodes(consoldom, "//RAD_KERNEL/RAD_DATASOURCES");
    for (i = 0;i < consdatascrs.length;i++) {
        var dsnName = getNodeText(selectSingleNode(consdatascrs[i], "DATASRC_NAME"));
        var basedatascrs = selectSingleNode(basedom, "//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']");
        if (basedatascrs != null) {
            var diffdatascrs = fnComparenodes(basedatascrs, consdatascrs[i], "RAD_DATASOURCES");
            if (diffdatascrs == "1") {
                head = selectSingleNode(funcdom, "//" + mainode);
                head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
                var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }
                var consradfileds = selectNodes(consdatascrs[i], "//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS");
                for (var k = 0;k < consradfileds.length;k++) {
                    var fldname = consradfileds[k].getAttribute("ID");
                    var baseradfiled = selectSingleNode(basedatascrs, "//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']")
                    if (baseradfiled != null) {
                        var difffields = fnComparenodes(consradfileds[k], baseradfiled, "RAD_FIELDS");
                        if (difffields == "1") {
                            var fldname = consradfileds[k].getAttribute("ID");
                            if (selectSingleNode(funcdom, "//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']") != null) {
                                x = selectSingleNode(funcdom, "//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']");
                                x.parentNode.removeChild(x);
                            }
                            x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']");
                            x.appendChild(fnImportNode(funcdom, consradfileds[k]));
                        }
                    }
                    else {
                        if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']") == null) {
                            head = selectSingleNode(funcdom, "//" + mainode);
                            head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
                            var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        var fldname = consradfileds[k].getAttribute("ID");
                        if (selectSingleNode(funcdom, "//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']") != null) {
                            x = selectSingleNode(funcdom, "//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']");
                            x.parentNode.removeChild(x);
                        }
                        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']");
                        x.appendChild(fnImportNode(funcdom, consradfileds[k]));
                    }
                }
            }
            if (diffdatascrs != "1") {
                var consradfileds = selectNodes(consdatascrs[i], "//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS")
                for (var k = 0;k < consradfileds.length;k++) {
                    var fldname = consradfileds[k].getAttribute("ID");
                    var baseradfiled = selectSingleNode(basedatascrs, "//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']")
                    if (baseradfiled != null) {
                        var difffields = fnComparenodes(consradfileds[k], baseradfiled, "RAD_FIELDS");
                        if (difffields == "1") {
                            if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']") == null) {
                                head = selectSingleNode(funcdom, "//" + mainode);
                                head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
                                var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS");
                                for (var p = 0;p < nod.length;p++) {
                                    nod[p].parentNode.removeChild(nod[p]);
                                }
                            }
                            var fldname = consradfileds[k].getAttribute("ID");
                            if (selectSingleNode(funcdom, "//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']") != null) {
                                x = selectSingleNode(funcdom, "//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']");
                                x.parentNode.removeChild(x);
                            }
                            x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']");
                            x.appendChild(fnImportNode(funcdom, consradfileds[k]));
                        }
                    }
                    else {
                        if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']") == null) {
                            head = selectSingleNode(funcdom, "//" + mainode);
                            head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
                            var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        var fldname = consradfileds[k].getAttribute("ID");
                        if (selectSingleNode(funcdom, "//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']") != null) {
                            x = selectSingleNode(funcdom, "//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']");
                            x.parentNode.removeChild(x);
                        }
                        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']");
                        x.appendChild(fnImportNode(funcdom, consradfileds[k]));
                    }
                }
            }
        }
        else {
            head = selectSingleNode(funcdom, "//" + mainode);
            head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
        }
    }
}

function fnComparelovs(mainode) {
    var len;
    //Code To Compare Lovs
    var consdatascrs = selectNodes(consoldom, "//RAD_KERNEL/RAD_LOVS");
    for (i = 0;i < consdatascrs.length;i++) {
        var dsnName = getNodeText(selectSingleNode(consdatascrs[i], "LOV_NAME"));
        var basedatascrs = selectSingleNode(basedom, "//RAD_KERNEL/RAD_LOVS[LOV_NAME='" + dsnName + "']");
        if (basedatascrs) {
            var diffdatascrs = fnComparenodes(basedatascrs, consdatascrs[i], "RAD_LOVS");
            if (diffdatascrs == "1") {
                head = selectSingleNode(funcdom, "//" + mainode);
                head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
            }
            if (diffdatascrs != "1") {
                var consradfileds = selectNodes(consdatascrs[i], "//RAD_KERNEL/RAD_LOVS[LOV_NAME='" + dsnName + "']/RAD_LOV_DETAILS")
                for (var k = 0;k < consradfileds.length;k++) {
                    var id = consradfileds[k].getAttribute("ID");
                    var baseradfileds = selectSingleNode(basedatascrs, "//RAD_KERNEL/RAD_LOVS[LOV_NAME='" + dsnName + "']/RAD_LOV_DETAILS[@ID='" + id + "']");
                    var difffields = fnComparenodes(consradfileds[k], baseradfileds, "RAD_LOV_DETAILS");
                    if (difffields == "1") {
                        if (selectSingleNode(funcdom, "//" + mainode + "/RAD_LOVS[LOV_NAME='" + dsnName + "']") == null) {
                            head = selectSingleNode(funcdom, "//" + mainode);
                            head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
                        }
                    }
                }
                if (baseradfileds) {
                    if (consradfileds.length < baseradfileds.length) {
                        if (selectSingleNode(funcdom, "//" + mainode + "/RAD_LOVS[LOV_NAME='" + dsnName + "']") == null) {
                            head = selectSingleNode(funcdom, "//" + mainode);
                            head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
                        }
                    }
                    if (consradfileds.length > baseradfileds.length) {
                        if (selectSingleNode(funcdom, "//" + mainode + "/RAD_LOVS[LOV_NAME='" + dsnName + "']") == null) {
                            head = selectSingleNode(funcdom, "//" + mainode);
                            head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
                        }
                    }
                }
            }
        }
        else {
            head = selectSingleNode(funcdom, "//" + mainode);
            head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
        }
    }
}

function fnCompareCallforms(mainode, callorlaunch) {
    var len;
    var consdatascrs = selectNodes(consoldom, "//RAD_KERNEL/" + callorlaunch);
    for (i = 0;i < consdatascrs.length;i++) {
        if (callorlaunch == "RAD_CALLFORM") {
            var dsnName = getNodeText(selectSingleNode(consdatascrs[i], "CALLFORM_FUCNTIONID"));
            var basedatascr = selectSingleNode(basedom, "//RAD_KERNEL/RAD_CALLFORM[CALLFORM_FUCNTIONID='" + dsnName + "']");
            if (basedatascr) {
                var diffdatascrs = fnComparenodes(basedatascr, consdatascrs[i], "RAD_CALLFORM");
                if (diffdatascrs == "1") {
                    head = selectSingleNode(funcdom, "//" + mainode);
                    head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
                }
            }
            else {
                head = selectSingleNode(funcdom, "//" + mainode);
                head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
            }
        }
        if (callorlaunch == "RAD_LAUNCHFORM") {
            var dsnName = getNodeText(selectSingleNode(consdatascrs[i], "LAUNCHFORM_FUCNTIONID"));
            var basedatascr = selectSingleNode(basedom, "//RAD_KERNEL/RAD_LAUNCHFORM[LAUNCHFORM_FUCNTIONID='" + dsnName + "']")
            if (basedatascr) {
                var diffdatascrs = fnComparenodes(basedatascr, consdatascrs[i], "RAD_LAUNCHFORM");
                if (diffdatascrs == "1") {
                    head = selectSingleNode(funcdom, "//" + mainode);
                    head.appendChild(consdatascrs[i].cloneNode(true));
                }
            }
            else {
                head = selectSingleNode(funcdom, "//" + mainode);
                head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
            }
        }
    }
}

function fnComparescreens(mainode) {
    var consolscrs = selectNodes(consoldom, "//RAD_KERNEL/RAD_SCREENS");
    for (i = 0;i < consolscrs.length;i++) {
        var scrName = getNodeText(selectSingleNode(consolscrs[i], "SCREEN_NAME"));
        var basescr = selectSingleNode(basedom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
        if (basescr) {
            var diffscrs = fnComparenodes(basescr, consolscrs[i], "RAD_SCREENS");
            if (diffscrs == "1") {
                fnaddScrheader(consolscrs[i], scrName, mainode);
                //For SCREEN_ARGS childs
                var consolscrargs = selectNodes(consolscrs[i], "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS");
                for (var k = 0;k < consolscrargs.length;k++) {
                    var scrarg = getNodeText(selectSingleNode(consolscrargs[k], "SCREEN_ARG_NAME"));
                    var basescrargs = selectSingleNode(basescr, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS[SCREEN_ARG_NAME='" + scrarg + "']");
                    if (basescrargs) {
                        var diffscrargs = fnComparenodes(basescrargs, consolscrargs[k], "SCREEN_ARGS");
                        if (diffscrargs == "1") {
                            x = selectSingleNode(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
                            x.appendChild(fnImportNode(funcdom, consolscrargs[k]));
                        }
                    }
                    else {
                        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
                        x.appendChild(fnImportNode(funcdom, consolscrargs[k]));
                    }
                }
                //For HEADER
                fnComparescrtabs(consolscrs[i], basescr, scrName, mainode, "HEADER");
                //For RAD_BODY
                fnComparescrtabs(consolscrs[i], basescr, scrName, mainode, "BODY");
                //For RAD_FOOTER
                fnComparescrtabs(consolscrs[i], basescr, scrName, mainode, "FOOTER");
            }
            if (diffscrs != "1") {
                //For SCREEN_ARGS childs
                var consolscrargs = selectNodes(consolscrs[i], "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS");
                for (var k = 0;k < consolscrargs.length;k++) {
                    var scrarg = getNodeText(selectSingleNode(consolscrargs[k], "SCREEN_ARG_NAME"));
                    var basescrargs = selectSingleNode(basescr, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS[SCREEN_ARG_NAME='" + scrarg + "']");
                    if (basescrargs) {
                        var diffscrargs = fnComparenodes(basescrargs, consolscrargs[k], "SCREEN_ARGS");
                        if (diffscrargs == "1") {
                            fnaddScrheader(consolscrs[i], scrName, mainode);
                            x = selectSingleNode(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
                            x.appendChild(fnImportNode(funcdom, consolscrargs[k]));
                        }
                    }
                    else {
                        fnaddScrheader(consolscrs[i], scrName, mainode);
                        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
                        x.appendChild(fnImportNode(funcdom, consolscrargs[k]));
                    }
                }
                //For HEADER
                fnComparescrtabs(consolscrs[i], basescr, scrName, mainode, "HEADER");
                //For RAD_BODY
                fnComparescrtabs(consolscrs[i], basescr, scrName, mainode, "BODY");
                //For RAD_FOOTER
                fnComparescrtabs(consolscrs[i], basescr, scrName, mainode, "FOOTER");
            }
        }
        else {
            head = selectSingleNode(funcdom, "//" + mainode);
            head.appendChild(fnImportNode(funcdom, consolscrs[i]));
        }
    }
}

function fnComparescrtabs(consolscr, basescr, scrName, mainode, scrnode) {
    var consolheader = selectNodes(consolscr, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode);
    for (var k = 0;k < consolheader.length;k++) {
        //RAD_TABS
        var consolscrtabs = selectNodes(consolscr, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS");
        for (var l = 0;l < consolscrtabs.length;l++) {
            var scrtab = getNodeText(selectSingleNode(consolscrtabs[l], "TAB_NAME"));
            var basescrtabs = selectSingleNode(basescr, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']");
            if (basescrtabs) {
                var diffscrtabs = fnComparenodes(basescrtabs, consolscrtabs[l], "RAD_TABS");
                if (diffscrtabs == "1") {
                    fnaddScrheader(consolscr, scrName, mainode);
                    fnaddScrtabHeader(scrName, scrnode, consolscrtabs[l], mainode);
                    // RAD_SECTIONS 
                    var consolsection = selectNodes(consolscr, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS");
                    for (var m = 0;m < consolsection.length;m++) {
                        var section = getNodeText(selectSingleNode(consolsection[m], "SECTION_NAME"));
                        var basesection = selectSingleNode(basescr, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']");
                        if (basesection) {
                            var diffsections = fnComparenodes(basesection, consolsection[m], "RAD_SECTIONS");
                            if (diffsections == "1") {
                                fnaddTabSection(scrName, scrnode, scrtab, consolsection[m], mainode);
                            }
                            if (diffsections != "1") {
                                //RAD_PARTITION	
                                var consolpartition = selectNodes(consolscr, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/RAD_PARTITIONS");
                                for (var n = 0;n < consolpartition.length;n++) {
                                    var partition = getNodeText(selectSingleNode(consolpartition[n], "PARTITION_NAME"));
                                    var basepartition = selectSingleNode(basescr, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/RAD_PARTITIONS[PARTITION_NAME='" + partition + "']");
                                    if (basepartition) {
                                        var diffpartitions = fnComparenodes(basepartition, consolpartition[n], "RAD_PARTITIONS");
                                        if (diffpartitions == "1") {
                                            fnaddTabSection(scrName, scrnode, scrtab, consolsection[m], mainode);
                                        }
                                    }
                                    else {
                                        fnaddTabSection(scrName, scrnode, scrtab, consolsection[m], mainode);
                                    }
                                }
                            }
                        }
                        else {
                            fnaddTabSection(scrName, scrnode, scrtab, consolsection[m], mainode);
                        }
                    }
                }
                if (diffscrtabs != "1") {
                    // RAD_SECTIONS 
                    var consolsection = selectNodes(consolscr, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS");
                    for (var m = 0;m < consolsection.length;m++) {
                        var section = getNodeText(selectSingleNode(consolsection[m], "SECTION_NAME"));
                        var basesection = selectSingleNode(basescr, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']");
                        if (basesection) {
                            var diffsections = fnComparenodes(basesection, consolsection[m], "RAD_SECTIONS");
                            if (diffsections == "1") {
                                fnaddScrheader(consolscr, scrName, mainode);
                                fnaddScrtabHeader(scrName, scrnode, consolscrtabs[l], mainode);
                                fnaddTabSection(scrName, scrnode, scrtab, consolsection[m], mainode);
                            }
                            if (diffsections != "1") {
                                //RAD_PARTITION	
                                var consolpartition = selectNodes(consolscr, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/RAD_PARTITIONS");
                                for (var n = 0;n < consolpartition.length;n++) {
                                    var partition = getNodeText(selectSingleNode(consolpartition[n], "PARTITION_NAME"));
                                    var basepartition = selectSingleNode(basescr, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/RAD_PARTITIONS[PARTITION_NAME='" + partition + "']");
                                    if (basepartition) {
                                        var diffpartitions = fnComparenodes(basepartition, consolpartition[n], "RAD_PARTITIONS");
                                        if (diffpartitions == "1") {
                                            fnaddScrheader(consolscr, scrName, mainode);
                                            fnaddScrtabHeader(scrName, scrnode, consolscrtabs[l], mainode);
                                            fnaddTabSection(scrName, scrnode, scrtab, consolsection[m], mainode);
                                        }
                                    }
                                    else {
                                        fnaddScrheader(consolscr, scrName, mainode);
                                        fnaddScrtabHeader(scrName, scrnode, consolscrtabs[l], mainode);
                                        fnaddTabSection(scrName, scrnode, scrtab, consolsection[m], mainode);
                                    }
                                }
                            }
                        }
                        else {
                            fnaddScrheader(consolscr, scrName, mainode);
                            fnaddScrtabHeader(scrName, scrnode, consolscrtabs[l], mainode);
                            fnaddTabSection(scrName, scrnode, scrtab, consolsection[m], mainode);
                        }
                    }
                }
            }
            else {
                fnaddScrheader(consolscr, scrName, mainode);
                fnaddScrtab(scrName, scrnode, consolscrtabs[l], mainode);
            }
        }
    }
}

function fnaddScrheader(scr, scrName, mainode) {
    if (selectSingleNode(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']") == null) {
        head = selectSingleNode(funcdom, "//" + mainode);
        head.appendChild(fnImportNode(funcdom, scr));
        var nod = selectNodes(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
        var nod = selectNodes(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/HEADER");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
        var nod = selectNodes(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/BODY");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
        var nod = selectNodes(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/FOOTER");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
    }
}

function fnaddScrtab(scrName, scrnode, consolscrtab, mainode) {
    if (selectSingleNode(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode) == null) {
        var scrdom = "";
        scrdom.async = false;
        scrdom.resolveExternals = false;
        scrdom = "<?xml version='1.0' encoding='UTF-8'?>";
        scrdom = loadXMLDoc(scrdom);
        newl = scrdom.createElement(scrnode);
        head = selectNodes(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']")[0];
        newl.setAttribute("ID", scrnode);
        head.appendChild(newl);
    }
    var tabname = getNodeText(selectSingleNode(consolscrtab, "TAB_NAME"));
    if (selectSingleNode(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[NAME='" + tabname + "']") == null) {
        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode);
        x.appendChild(fnImportNode(funcdom, consolscrtab));
    }
}

function fnaddScrtabHeader(scrName, scrnode, consolscrtab, mainode) {
    if (selectSingleNode(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode) == null) {
        var scrdom = "";
        scrdom.async = false;
        scrdom.resolveExternals = false;
        scrdom = "<?xml version='1.0' encoding='UTF-8'?>";
        scrdom = loadXMLDoc(scrdom);
        newl = scrdom.createElement(scrnode);
        head = selectNodes(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']")[0];
        newl.setAttribute("ID", scrnode);
        head.appendChild(newl);
    }
    var tabname = getNodeText(selectSingleNode(consolscrtab, "TAB_NAME"));
    if (selectSingleNode(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[NAME='" + tabname + "']") == null) {
        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode);
        x.appendChild(fnImportNode(funcdom, consolscrtab));
        var nod = selectNodes(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + tabname + "']/RAD_SECTIONS");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
    }
}

function fnaddTabSection(scrName, scrnode, tabname, consolsection, mainode) {
    var section = getNodeText(selectSingleNode(consolsection, "SECTION_NAME"));
    if (selectSingleNode(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + tabname + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']") == null) {
        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + tabname + "']");
        x.appendChild(fnImportNode(funcdom, consolsection));
    }
}

function fnComparefieldset(mainode) {
    var consolfldsets = selectNodes(consoldom, "//RAD_KERNEL/RAD_FIELDSETS");
    for (i = 0;i < consolfldsets.length;i++) {
        var fldsetname = getNodeText(selectSingleNode(consolfldsets[i], "FIELDSET_NAME"));
        var basefldset = selectSingleNode(basedom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
        if (basefldset) {
            var diffldsets = fnComparenodes(basefldset, consolfldsets[i], "RAD_FIELDSETS");
            if (diffldsets == "1") {
                head = selectSingleNode(funcdom, "//" + mainode);
                head.appendChild(fnImportNode(funcdom, consolfldsets[i]));
                var nod = selectNodes(funcdom, "//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }
                //FIELDSET_FIELDS
                var consolfldsetflds = selectNodes(consolfldsets[i], "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                for (var k = 0;k < consolfldsetflds.length;k++) {
                    var fldsetfld = getNodeText(selectSingleNode(consolfldsetflds[k], "FIELD_NAME"));
                    var basefldsetfld = selectSingleNode(basefldset, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS[FIELD_NAME='" + fldsetfld + "']");
                    if (basefldsetfld) {
                        var diffldsetfld = fnComparenodes(basefldsetfld, consolfldsetflds[k], "FIELDSET_FIELDS");
                        if (diffldsetfld == "1") {
                            x = selectSingleNode(funcdom, "//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
                            x.appendChild(fnImportNode(funcdom, consolfldsetflds[k]));
                        }
                    }
                    else {
                        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
                        x.appendChild(fnImportNode(funcdom, consolfldsetflds[k]));
                    }
                }
            }
            if (diffldsets != "1") {
                //FIELDSET_FIELDS
                var consolfldsetflds = selectNodes(consolfldsets[i], "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                for (var k = 0;k < consolfldsetflds.length;k++) {
                    var fldsetfld = getNodeText(selectSingleNode(consolfldsetflds[k], "FIELD_NAME"));
                    var basefldsetfld = selectSingleNode(basefldset, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS[FIELD_NAME='" + fldsetfld + "']");
                    if (basefldsetfld) {
                        var diffldsetfld = fnComparenodes(basefldsetfld, consolfldsetflds[k], "FIELDSET_FIELDS");
                        if (diffldsetfld == "1") {
                            if (selectSingleNode(funcdom, "//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']") == null) {
                                head = selectSingleNode(funcdom, "//" + mainode);
                                head.appendChild(fnImportNode(funcdom, consolfldsets[i]));
                                var nod = selectNodes(funcdom, "//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                                for (var p = 0;p < nod.length;p++) {
                                    nod[p].parentNode.removeChild(nod[p]);
                                }
                            }
                            x = selectSingleNode(funcdom, "//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
                            x.appendChild(fnImportNode(funcdom, consolfldsetflds[k]));
                        }
                    }
                    else {
                        if (selectSingleNode(funcdom, "//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']") == null) {
                            head = selectSingleNode(funcdom, "//" + mainode);
                            head.appendChild(fnImportNode(funcdom, consolfldsets[i]));
                            var nod = selectNodes(funcdom, "//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
                        x.appendChild(fnImportNode(funcdom, consolfldsetflds[k]));
                    }
                }
            }
        }
        else {
            head = selectSingleNode(funcdom, "//" + mainode);
            head.appendChild(fnImportNode(funcdom, consolfldsets[i]));
        }
    }
}

function fnComparedatablks(mainode) {
    var consdatascrs = selectNodes(consoldom, "//RAD_KERNEL/RAD_DATA_BLOCKS");
    for (i = 0;i < consdatascrs.length;i++) {
        var dsnName = getNodeText(selectSingleNode(consdatascrs[i], "BLOCK_NAME"));
        var basedatascr = selectSingleNode(basedom, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
        if (basedatascr) {
            var diffdatascrs = fnComparenodes(basedatascr, consdatascrs[i], "RAD_DATA_BLOCKS");
            if (diffdatascrs == "1") {
                head = selectSingleNode(funcdom, "//" + mainode);
                head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
                var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }
                //For RAD_BLK_FIELDS Childs
                var consradfileds = selectNodes(consdatascrs[i], "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS")
                for (var k = 0;k < consradfileds.length;k++) {
                    var fldName = getNodeText(selectSingleNode(consradfileds[k], "FIELD_NAME"));
                    var baseradfiled = selectSingleNode(basedatascr, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']")
                    if (baseradfiled) {
                        var difffields = fnComparenodes(baseradfiled, consradfileds[k], "RAD_BLK_FIELDS");
                        if (difffields == "1") {
                            x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                            x.appendChild(fnImportNode(funcdom, consradfileds[k]));
                            var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldName, mainode, "RAD_FIELD_CUSTOM_ATTRS");
                        }
                        if (difffields != "1") {
                            var fldId = consradfileds[k].getAttribute("ID");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_RETURN_FIELDS");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_BIND_VARS");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_FIELD_EVENTS");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_AMOUNT_FIELDS");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_PATTERN_FIELDS");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_OFF_LINE_BIND_VARS");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_OFF_LINE_RETURN_FIELDS");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_FIELD_CUSTOM_ATTRS");
                        }
                    }
                    else {
                        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                        x.appendChild(fnImportNode(funcdom, consradfileds[k]));
                    }
                }
                var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }
                var consradblkdtrs = selectNodes(consdatascrs[i], "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                for (var bld = 0;bld < consradblkdtrs.length;bld++) {
                    var bldDsrName = getNodeText(selectSingleNode(consradblkdtrs[bld], "DATASOURCE_NAME"));
                    var baseradblkSrc = selectSingleNode(basedatascr, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES[DATASOURCE_NAME='" + bldDsrName + "']");
                    if (baseradblkSrc) {
                        var difffields = fnComparenodes(baseradblkSrc, consradblkdtrs[bld], "BLK_DATASOURCES");
                        if (difffields == "1") {
                            x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                            x.appendChild(fnImportNode(funcdom, consradblkdtrs[bld]));
                        }
                    }
                    else {
                        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                        x.appendChild(fnImportNode(funcdom, consradblkdtrs[bld]));
                    }
                }
            }
            //If no difference in Data block level
            if (diffdatascrs != "1") {
                var consradfileds = selectNodes(consdatascrs[i], "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS")
                var dsnName = getNodeText(selectSingleNode(consdatascrs[i], "BLOCK_NAME"));
                for (var k = 0;k < consradfileds.length;k++) {
                    var fldName = getNodeText(selectSingleNode(consradfileds[k], "FIELD_NAME"));
                    var baseradfiled = selectSingleNode(basedatascr, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']")
                    if (baseradfiled) {
                        var difffields = fnComparenodes(baseradfiled, consradfileds[k], "RAD_BLK_FIELDS");
                        if (difffields == "1") {
                            if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                                head = selectSingleNode(funcdom, "//" + mainode);
                                head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
                                var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                                for (var p = 0;p < nod.length;p++) {
                                    nod[p].parentNode.removeChild(nod[p]);
                                }
                            }
                            x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                            x.appendChild(fnImportNode(funcdom, consradfileds[k]));
                            var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldName, mainode, "RAD_FIELD_CUSTOM_ATTRS");
                        }
                        if (difffields != "1") {
                            var fldId = consradfileds[k].getAttribute("ID");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_RETURN_FIELDS");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_BIND_VARS");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_FIELD_EVENTS");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_AMOUNT_FIELDS");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_PATTERN_FIELDS");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_OFF_LINE_BIND_VARS");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_OFF_LINE_RETURN_FIELDS");
                            fnprocessBlkFieldLeaves(consdatascrs, basedatascr, dsnName, fldId, mainode, "RAD_FIELD_CUSTOM_ATTRS");
                        }
                    }
                    else {
                        if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                            head = selectSingleNode(funcdom, "//" + mainode);
                            head.appendChild(fnImportNode(funcdom, consdatascrs[i]));

                            var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                        x.appendChild(fnImportNode(funcdom, consradfileds[k]));
                    }
                }
                var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }
                var consradblkdtrs = selectNodes(consdatascrs[i], "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                for (var bld = 0;bld < consradblkdtrs.length;bld++) {
                    var bldDsrName = getNodeText(selectSingleNode(consradblkdtrs[bld], "DATASOURCE_NAME"));
                    var baseradblkSrc = selectSingleNode(basedatascr, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES[DATASOURCE_NAME='" + bldDsrName + "']");
                    if (baseradblkSrc) {
                        var difffields = fnComparenodes(baseradblkSrc, consradblkdtrs[bld], "BLK_DATASOURCES");
                        if (difffields == "1") {
                            x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                            x.appendChild(fnImportNode(funcdom, consradblkdtrs[bld]));
                        }
                    }
                    else {
                        if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                            var head = selectSingleNode(funcdom, "//" + mainode);
                            head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
                            var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                            var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                        x.appendChild(fnImportNode(funcdom, consradblkdtrs[bld]));
                    }
                }
            }
        }
        else {
            head = selectSingleNode(funcdom, "//" + mainode);
            head.appendChild(fnImportNode(funcdom, consdatascrs[i]));
        }
    }
}

function fnComparenodes(base, cons, node) {
    var elelen = new Array();
    elelen = elementArray[node].split("~");
    var nonCompareArray = nodeNonCompareArray[node];
    var addedTagPresent = 0;
    for (j = 0;j < elelen.length;j++) {
        if (selectSingleNode(base, elelen[j]) == null) {
            if (arrayAddedTags[node]) {
                if (arrayAddedTags[node].match(elelen[j])) {
                    var childNode = basedom.createElement(elelen[j]);
                    base.appendChild(childNode);
                    if (arrayDefaultValues[elelen[j]]) {
                        setNodeText(selectSingleNode(base, elelen[j]), arrayDefaultValues[elelen[j]]);
                    }
                }
            }
        }
        if (selectSingleNode(cons, elelen[j]) != null && selectSingleNode(base, elelen[j]) != null) {
            if (nonCompareArray) {
                if (nonCompareArray.indexOf(elelen[j]) ==  - 1) {
                    if (getNodeText(selectSingleNode(cons, elelen[j])) != getNodeText(selectSingleNode(base, elelen[j]))) {
                        return 1;
                    }
                }
            }
            else {
                if (getNodeText(selectSingleNode(cons, elelen[j])) != getNodeText(selectSingleNode(base, elelen[j]))) {
                    return 1;
                }
            }
        }
    }
}

function fnResetBlkFieldsFieldsetName() {
    var Block = selectNodes(consoldom, "//RAD_KERNEL/RAD_DATA_BLOCKS");
    for (var p = 0;p < Block.length;p++) {
        var blkName = getNodeText(selectSingleNode(Block[p], "BLOCK_NAME"));
        var blkfields = selectNodes(Block[p], "RAD_BLK_FIELDS");
        for (var t = 0;t < blkfields.length;t++) {
            var fldname = getNodeText(selectSingleNode(blkfields[t], "FIELD_NAME"));
            var excNode = selectNodes(consoldom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_BLOCK='" + blkName + "']/FIELDSET_FIELDS[FIELD_NAME='" + fldname + "']");
            if (excNode.length > 0) {
                for (var i = 0;i < excNode.length;i++) {
                    if (getNodeText(selectSingleNode(excNode[i], "ACTIVE")) == 'Y') {
                        var newfldsetName = getNodeText(selectSingleNode(excNode[i].parentNode, "FIELDSET_NAME"));
                        setNodeText(selectSingleNode(blkfields[t], "FIELDSET_NAME"), newfldsetName);
                    }
                }
            }
        }
    }
}

function fnResetDsnFieldsBlockName() {
    var dsn = selectNodes(consoldom, "//RAD_KERNEL/RAD_DATASOURCES");
    if (dsn.length > 0) {
        for (var p = 0;p < dsn.length;p++) {
            var dsnName = getNodeText(selectSingleNode(dsn[p], "DATASRC_NAME"));
            var fields = selectSingleNode(consoldom, "//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS");
            if (fields != null) {
                for (var k = 0;k < fields.length;k++) {
                    var colName = selectSingleNode(fields, "COLUMN_NAME");
                    var exenode = selectSingleNode(consoldom, "//RAD_KERNEL/RAD_DATA_BLOCKS/RAD_BLK_FIELDS[DBT='" + dsnName + "' and DBC='" + colName + "']");
                    var blkName = getNodeText(selectSingleNode(exenode.parentNode, "BLOCK_NAME"));
                    setNodeText(selectSingleNode(fields, "BLOCK_NAME"), blkName);
                }
            }
        }
    }
}

function fnprocessBlkFldCustAttr(consretfileds, baseretfileds, dsnName, fldName, mainode) {
    if ((consretfileds.length > 0) && (baseretfileds.length > 0)) {
        var consdisptype = getNodeText(selectSingleNode(consretfileds[0].parentNode, "DISPLAY_TYPE"));
        var basedisptype = getNodeText(selectSingleNode(baseretfileds[0].parentNode, "DISPLAY_TYPE"));
        if (consdisptype == basedisptype) {
            for (var attr = 0;attr < consretfileds.length;attr++) {
                var attrName = getNodeText(selectSingleNode(consretfileds[attr], "ATTR_NAME"));
                var baseretfileds = selectSingleNode(basedom, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME='" + attrName + "']");
                if (baseretfileds != null) {
                    var diffdatascrs = fnComparenodes(baseretfileds, consretfileds[attr], "RAD_FIELD_CUSTOM_ATTRS");
                    if (diffdatascrs == "1") {
                        if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                            head = selectSingleNode(funcdom, "//" + mainode);

                            parNode = consretfileds[attr].parentNode;
                            grandparNode = parNode.parentNode;
                            head.appendChild(fnImportNode(funcdom, grandparNode));

                            var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                            //for BLK_DATASOURCES
                            var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }

                        }
                        if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']") == null) {
                            head = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                            parNode = consretfileds[attr].parentNode;
                            head.appendChild(fnImportNode(funcdom, parNode));
                            var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                            x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']");
                            x.appendChild(fnImportNode(funcdom, consretfileds[attr]));
                        }
                        else {
                             if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME = '" + attrName + "']") != null) {
                                var nod = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME = '" + attrName + "']");
                                nod.parentNode.removeChild(nod);
                            }
                            x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']");
                            x.appendChild(fnImportNode(funcdom, consretfileds[attr]));

                        }
                    }
                }
                else {
                    if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                        head = selectSingleNode(funcdom, "//" + mainode);
                        parNode = consretfileds[attr].parentNode;
                        grandparNode = parNode.parentNode;
                        head.appendChild(fnImportNode(funcdom, grandparNode));
                        var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                        for (var p = 0;p < nod.length;p++) {
                            nod[p].parentNode.removeChild(nod[p]);
                        }
                        //for BLK_DATASOURCES
                        var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                        for (var p = 0;p < nod.length;p++) {
                            nod[p].parentNode.removeChild(nod[p]);
                        }

                    }
                    if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']") == null) {
                        head = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                        parNode = consretfileds[attr].parentNode;
                        head.appendChild(fnImportNode(funcdom, parNode));
                        var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS");
                        for (var p = 0;p < nod.length;p++) {
                            nod[p].parentNode.removeChild(nod[p]);
                        }
                        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']");
                        x.appendChild(fnImportNode(funcdom, consretfileds[attr]));
                    }
                    else {
                        if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME = '" + attrName + "']") != null) {
                            var nod = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME = '" + attrName + "']");
                            nod.parentNode.removeChild(nod);
                        }
                        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']");
                        x.appendChild(fnImportNode(funcdom, consretfileds[attr]));
                    }
                }
            }
            return '2';
        }
        else {
            return '1';
        }
    }
    if ((consretfileds.length > 0) && (baseretfileds.length == 0)) {
        if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']") != null) {
            var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']");
            nod[0].parentNode.removeChild(nod[0]);
        }
        return '1';
    }
}

function fnprocessBlkFieldLeaves(consdatascrs, basedatascrs, dsnName, fldName, mainode, leafNodes) {
    var custattrCompFlag = '1';
    var len2 = "";
    var consretfileds = selectNodes(consdatascrs[i], "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/" + leafNodes)
    var baseretfileds = selectNodes(basedatascrs, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/" + leafNodes)
    if (leafNodes == 'RAD_FIELD_CUSTOM_ATTRS') {
        custattrCompFlag = fnprocessBlkFldCustAttr(consretfileds, baseretfileds, dsnName, fldName, mainode);
    }
    if (custattrCompFlag == '1') {
        if (consretfileds.length > baseretfileds.length) {
            len2 = baseretfileds.length;
        }
        if (consretfileds.length == baseretfileds.length) {
            len2 = consretfileds.length;
        }
        if (consretfileds.length < baseretfileds.length) {
            if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                par = selectNodes(consdatascrs[i], "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']")[0];
                gpar = par.parentNode;
                head = selectSingleNode(funcdom, "//" + mainode);
                head.appendChild(fnImportNode(funcdom, gpar));
                var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                for (var p = 0;p < nod.length;p++) {
                    if (getNodeText(selectSingleNode(nod[p], "FIELD_NAME")) != fldName) {
                        nod[p].parentNode.removeChild(nod[p]);
                    }
                }
                //For BLK_DATASOURCES

            }
            if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']") == null) {
                par = selectNodes(consdatascrs[i], "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']")[0];
                gpar = par.parentNode;
                head = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                head.appendChild(fnImportNode(funcdom, par));
            }
        }
        fncheckBlkFieldChildnodes(consretfileds, baseretfileds, dsnName, fldName, mainode, len2, leafNodes);
        if (consretfileds.length > baseretfileds.length) {
            fnAddedBlkFieldChildnodes(consretfileds, baseretfileds, dsnName, fldName, mainode, leafNodes)
        }
    }
}

function fnAddedBlkFieldChildnodes(consretfileds, baseretfileds, dsnName, fldName, mainode, childname) {
    for (var m = baseretfileds.length;m < consretfileds.length;m++) {
        if (consretfileds[m] != null) {
            if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                head = selectSingleNode(funcdom, "//" + mainode);
                parNode = consretfileds[m].parentNode;
                grandparNode = parNode.parentNode;
                head.appendChild(fnImportNode(funcdom, grandparNode));
                var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                for (var p = 0;p < nod.length;p++) {
                    if (getNodeText(selectSingleNode(nod[p], "FIELD_NAME")) != fldName) {
                        nod[p].parentNode.removeChild(nod[p]);
                    }
                }
                //For BLK_DATASOURCES
                var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }

            }
            var id = consretfileds[m].getAttribute("ID");
            if (selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/" + childname + "[@ID='" + id + "']").length == 0) {
                if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']") == null) {
                    head = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                    par = consretfileds[m].parentNode;
                    head.appendChild(fnImportNode(funcdom, par));
                }
            }
        }
    }
}

function fncheckBlkFieldChildnodes(consretfileds, baseretfileds, dsnName, fldName, mainode, len2, childname) {
    for (var m = 0;m < len2;m++) {
        if (consretfileds[m] != null && baseretfileds[m] != null) {
            var diffretfields = fnComparenodes(baseretfileds[m], consretfileds[m], childname);
            if (diffretfields == "1") {
                if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                    head = selectSingleNode(funcdom, "//" + mainode);
                    parNode = consretfileds[m].parentNode;
                    grandparNode = parNode.parentNode;
                    head.appendChild(fnImportNode(funcdom, grandparNode));
                    var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                    for (var p = 0;p < nod.length;p++) {
                        nod[p].parentNode.removeChild(nod[p]);
                    }
                    //for BLK_DATASOURCES
                    var nod = selectNodes(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                    for (var p = 0;p < nod.length;p++) {
                        nod[p].parentNode.removeChild(nod[p]);
                    }

                }
                if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']") == null) {
                    head = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                    parNode = consretfileds[m].parentNode;
                    head.appendChild(fnImportNode(funcdom, parNode));
                }
                else {
                    x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']");
                    x.parentNode.removeChild(x);
                    head = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                    parNode = consretfileds[m].parentNode;
                    head.appendChild(fnImportNode(funcdom, parNode));
                }
            }
        }
    }
}

function clusterOnKernel(myDom) {
    newDom = myDom;
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_CLUSTER", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_CLUSTER", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_CLUSTER", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_CLUSTER", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_CLUSTER", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_CLUSTER", newDom);      //bug#32499898
    ReplaceFullNodes("RAD_ACTIONS", "RAD_CLUSTER", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_CLUSTER", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_CLUSTER", newDom);
    var remClst = selectNodes(newDom, "//RAD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    return newDom;
}

function customOnKernel(myDom) {
    newDom = myDom;
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_CUSTOM", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_CUSTOM", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_CUSTOM", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_CUSTOM", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_CUSTOM", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_CUSTOM", newDom);      //bug#32499898
    ReplaceFullNodes("RAD_ACTIONS", "RAD_CUSTOM", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_CUSTOM", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_CUSTOM", newDom);
    var remClst = selectNodes(newDom, "//RAD_CUSTOM//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    return newDom;
}

function customerOnKernel(myDom) {
    newDom = myDom;
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_CUSTOMER", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_CUSTOMER", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_CUSTOMER", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_CUSTOMER", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_CUSTOMER", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_CUSTOMER", newDom);      //bug#32499898
    ReplaceFullNodes("RAD_ACTIONS", "RAD_CUSTOMER", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_CUSTOMER", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_CUSTOMER", newDom);
    var remClst = selectNodes(newDom, "//RAD_CUSTOMER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    return newDom;
}

function childKernelOnKernel(myDom) {
    newDom = myDom;
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_CHILD_KERNEL", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_CHILD_KERNEL", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_CHILD_KERNEL", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_CHILD_KERNEL", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_CHILD_KERNEL", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_CHILD_KERNEL", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_CHILD_KERNEL", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_CHILD_KERNEL", newDom);      //bug#32499898
    ReplaceFullNodes("RAD_ACTIONS", "RAD_CHILD_KERNEL", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_CHILD_KERNEL", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_CHILD_KERNEL", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_CHILD_KERNEL", newDom);
    var remClst = selectNodes(newDom, "//RAD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CUSTOM//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CUSTOMER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_KERNEL//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    return newDom;
}

function childClusterOnKernel(myDom) {
    newDom = myDom;
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_CHILD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_CHILD_CLUSTER", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_CHILD_CLUSTER", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_CHILD_CLUSTER", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_CHILD_CLUSTER", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_CHILD_CLUSTER", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_CHILD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_CHILD_CLUSTER", newDom);      //bug#32499898
    ReplaceFullNodes("RAD_ACTIONS", "RAD_CHILD_CLUSTER", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_CHILD_CLUSTER", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_CHILD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_CHILD_CLUSTER", newDom);
    var remClst = selectNodes(newDom, "//RAD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CUSTOM//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CUSTOMER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_KERNEL//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    return newDom;
}

function childCustomOnKernel(myDom) {
    newDom = myDom;
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_CHILD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_CHILD_CUSTOM", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_CHILD_CUSTOM", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_CHILD_CUSTOM", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_CHILD_CUSTOM", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_CHILD_CUSTOM", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_CHILD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_CHILD_CUSTOM", newDom);      //bug#32499898
    ReplaceFullNodes("RAD_ACTIONS", "RAD_CHILD_CUSTOM", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_CHILD_CUSTOM", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_CHILD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_CHILD_CUSTOM", newDom);
    var remClst = selectNodes(newDom, "//RAD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CUSTOM//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CUSTOMER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_KERNEL//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_CUSTOM//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    return newDom;
}

function childCustomerOnKernel(myDom) {
    newDom = myDom;
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_CHILD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_CHILD_CUSTOMER", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_CHILD_CUSTOMER", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_CHILD_CUSTOMER", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_CHILD_CUSTOMER", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_CHILD_CUSTOMER", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_CHILD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_CHILD_CUSTOMER", newDom);      //bug#32499898
    ReplaceFullNodes("RAD_ACTIONS", "RAD_CHILD_CUSTOMER", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_CHILD_CUSTOMER", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_CHILD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_CHILD_CUSTOMER", newDom);
    var remClst = selectNodes(newDom, "//RAD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CUSTOM//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CUSTOMER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_KERNEL//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_CUSTOM//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_CUSTOMER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    return newDom;
}

function scrchildKernelOnKernel(myDom) {
    newDom = myDom;
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_SCRCHLD_KERNEL", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_SCRCHLD_KERNEL", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_SCRCHLD_KERNEL", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_SCRCHLD_KERNEL", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_SCRCHLD_KERNEL", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_SCRCHLD_KERNEL", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_SCRCHLD_KERNEL", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_SCRCHLD_KERNEL", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_SCRCHLD_KERNEL", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_SCRCHLD_KERNEL", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_SCRCHLD_KERNEL", newDom);
    var remClst = selectNodes(newDom, "//RAD_CHILD_KERNEL//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_SCRCHLD_KERNEL//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    return newDom;
}

function scrchildClusterOnKernel(myDom) {
    newDom = myDom;
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_SCRCHLD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_SCRCHLD_CLUSTER", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_SCRCHLD_CLUSTER", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_SCRCHLD_CLUSTER", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_SCRCHLD_CLUSTER", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_SCRCHLD_CLUSTER", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_SCRCHLD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_SCRCHLD_CLUSTER", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_SCRCHLD_CLUSTER", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_SCRCHLD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_SCRCHLD_CLUSTER", newDom);
    var remClst = selectNodes(newDom, "//RAD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_KERNEL//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_SCRCHLD_KERNEL//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_SCRCHLD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    return newDom;
}

function scrchildCustomOnKernel(myDom) {
    newDom = myDom;
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_SCRCHLD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_SCRCHLD_CUSTOM", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_SCRCHLD_CUSTOM", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_SCRCHLD_CUSTOM", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_SCRCHLD_CUSTOM", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_SCRCHLD_CUSTOM", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_SCRCHLD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_SCRCHLD_CUSTOM", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_SCRCHLD_CUSTOM", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_SCRCHLD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_SCRCHLD_CUSTOM", newDom);
    var remClst = selectNodes(newDom, "//RAD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CUSTOM//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_KERNEL//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_CUSTOM//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_SCRCHLD_KERNEL//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_SCRCHLD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_SCRCHLD_CUSTOM//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    return newDom;
}

function scrchildCustomerOnKernel(myDom) {
    newDom = myDom.cloneNode(true);
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_SCRCHLD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_SCRCHLD_CUSTOMER", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_SCRCHLD_CUSTOMER", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_SCRCHLD_CUSTOMER", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_SCRCHLD_CUSTOMER", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_SCRCHLD_CUSTOMER", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_SCRCHLD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_SCRCHLD_CUSTOMER", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_SCRCHLD_CUSTOMER", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_SCRCHLD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_SCRCHLD_CUSTOMER", newDom);
    var remClst = selectNodes(newDom, "//RAD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CUSTOM//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CUSTOMER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_KERNEL//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_CUSTOM//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_CHILD_CUSTOMER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_SCRCHLD_KERNEL//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_SCRCHLD_CLUSTER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_SCRCHLD_CUSTOM//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    var remClst = selectNodes(newDom, "//RAD_SCRCHLD_CUSTOMER//*");
    for (var rc = 0;rc < remClst.length;rc++) {
        remClst[rc].parentNode.removeChild(remClst[rc]);
    }
    return newDom;
}

function AssignOnKernel(node, currnode, newDom) {
    var traildom = "";
    traildom.async = false;
    traildom.resolveExternals = false;
    traildom = "<?xml version='1.0' encoding='UTF-8'?>";
    traildom = loadXMLDoc(traildom);
    var datascr = selectNodes(newDom, "//" + currnode + "/" + node);
    for (var k = 0;k < datascr.length;k++) {
        var id = datascr[k].getAttribute("ID");
        var kernode = selectSingleNode(newDom, "//RAD_KERNEL/" + node + "[@ID='" + id + "']");
        var clusnode = selectSingleNode(newDom, "//" + currnode + "/" + node + "[@ID='" + id + "']");
        if (kernode) {
            var elelen = new Array();
            elelen = elementArray[node].split("~");
            for (j = 0;j < elelen.length;j++) {
                if (selectSingleNode(kernode, elelen[j]) == null) {
                    newl = traildom.createElement(elelen[j]);
                    kernode.appendChild(fnImportNode(newDom, newl));
                }
                if (selectSingleNode(kernode, elelen[j]) != null && selectSingleNode(clusnode, elelen[j]) != null) {
                    setNodeText(selectSingleNode(kernode, (elelen[j])), getNodeText(selectSingleNode(clusnode, (elelen[j]))));
                }
            }
            if (nodeChildArray[node]) {
                if (node == "RAD_SCREENS") {
                    AssignLeafNodesOfScreen(kernode, clusnode, node, currnode, newDom);
                }
                else {
                    ReplaceLeafeNodes(kernode, clusnode, node, currnode, newDom);
                }
            }
            else {
                kernode.parentNode.replaceChild(clusnode, kernode);
            }
        }
        else {
            selectSingleNode(newDom, "//RAD_KERNEL").appendChild(clusnode)
        }
    }
}

function AssignLeafNodesOfScreen(kernode, clusnode, node, currnode, newDom) {
    var childNode = new Array();
    if (nodeChildArray[node]) {
        childNode = nodeChildArray[node].split("~");
    }
    if (childNode.length > 0) {
        for (var i = 0;i < childNode.length;i++) {
            var datscr = selectNodes(clusnode, childNode[i]);
            for (var k = 0;k < datscr.length;k++) {
                var id = datscr[k].getAttribute("ID");
                var kerchild = selectSingleNode(kernode, childNode[i] + "[@ID='" + id + "']");
                var cluschild = selectSingleNode(clusnode, childNode[i] + "[@ID='" + id + "']");
                if (kerchild) {
                    if (id == 'BODY' || id == 'HEADER' || id == 'FOOTER') {
                        AssignLeafNodes(kerchild, cluschild, childNode[i], currnode, newDom);
                    }
                    else {
                        kerchild.parentNode.replaceChild(cluschild, kerchild);
                    }
                }
                else {
                    kernode.appendChild(cluschild);
                }
            }
        }
    }
}

function AssignLeafNodes(kernode, clusnode, node, currnode, newDom) {
    var traildom = "";
    traildom.async = false;
    traildom.resolveExternals = false;
    traildom = "<?xml version='1.0' encoding='UTF-8'?>";
    traildom = loadXMLDoc(traildom);
    var childNode = new Array();
    if (nodeChildArray[node]) {
        childNode = nodeChildArray[node].split("~");
    }
    if (childNode.length > 0) {
        for (var i = 0;i < childNode.length;i++) {
            var datscr = selectNodes(clusnode, childNode[i]);
            for (var k = 0;k < datscr.length;k++) {
                var id = datscr[k].getAttribute("ID");
                var kerchild = selectSingleNode(kernode, childNode[i] + "[@ID='" + id + "']");
                var cluschild = selectSingleNode(clusnode, childNode[i] + "[@ID='" + id + "']");
                if (kerchild) {
                    var elelen = new Array();
                    elelen = elementArray[childNode[i]].split("~");
                    for (j = 0;j < elelen.length;j++) {
                        if (selectSingleNode(kerchild, elelen[j]) == null) {
                            newl = traildom.createElement(elelen[j]);
                            kerchild.appendChild(newl);
                        }
                        if (selectSingleNode(kerchild, elelen[j]) != null && selectSingleNode(cluschild, elelen[j]) != null) {
                            setNodeText(selectSingleNode(kerchild, (elelen[j])), getNodeText(selectSingleNode(cluschild, (elelen[j]))));
                        }
                    }
                    if (nodeChildArray[childNode[i]]) {
                        ReplaceLeafeNodes(kerchild, cluschild, childNode[i], currnode, newDom);
                    }
                    else {
                        kerchild.parentNode.replaceChild(cluschild, kerchild);
                    }
                }
                else {
                    kernode.appendChild(cluschild);
                }
            }
        }
    }
}

function ReplaceLeafeNodes(kernelnode, clusternode, node, currnode, newDom) {
    var traildom = "";
    traildom.async = false;
    traildom.resolveExternals = false;
    traildom = "<?xml version='1.0' encoding='UTF-8'?>";
    traildom = loadXMLDoc(traildom);
    var newl = "";
    /*newl .async = false;
    newl .resolveExternals = false;
    newl = "<?xml version='1.0' encoding='UTF-8'?>";
    newl = loadXMLDoc(newl);
    var newl = traildom.createElement("DUMMY"); */
    var childNode = new Array();
    if (nodeChildArray[node]) {
        childNode = nodeChildArray[node].split("~");
    }
    if (childNode.length > 0) {
        for (var i = 0;i < childNode.length;i++) {
            var datscr = selectNodes(clusternode, childNode[i]);
            for (var k = 0;k < datscr.length;k++) {
                var id = datscr[k].getAttribute("ID");
                var kernelchild = selectSingleNode(kernelnode, childNode[i] + "[@ID='" + id + "']");
                var clusterchild = selectSingleNode(clusternode, childNode[i] + "[@ID='" + id + "']");
                if (kernelchild) {
                    //shihab
                    if (childNode[i] == 'RAD_BLK_FIELDS') {
                        //traildom.appendChild(clusterchild);
                        //traildom=selectSingleNode(traildom,'RAD_BLK_FIELDS');
                        //newl.appendChild(clusterchild);
                        newl = loadXMLDoc(getXMLString(clusterchild).toString());
                        newl = selectSingleNode(newl, 'RAD_BLK_FIELDS');
                        var nod = selectNodes(newl, "RAD_FIELD_CUSTOM_ATTRS");
                        /* for (var p = 0;p < nod.length;p++) {
                            nod[p].parentNode.removeChild(nod[p]);
                        } */
                        newl = fnCompCustAttrbutes(kernelchild, newl);
                        /*var clusCustNodes = selectNodes(clusterchild, "RAD_FIELD_CUSTOM_ATTRS");
                        for (var custnode = 0;custnode < clusCustNodes.length;custnode++) {
                            newl.appendChild(clusCustNodes[custnode]);
                        }*/
                        kernelchild.parentNode.replaceChild(newl, kernelchild);
                    }
                    else {
                        kernelchild.parentNode.replaceChild(clusterchild, kernelchild);
                    }
                }
                else {
                    kernelnode.appendChild(clusterchild);
                }
            }
        }
    }
}

function fnCompCustAttrbutes(kerchild, traildom) {
    var kerdisptyp = getNodeText(selectSingleNode(kerchild, "DISPLAY_TYPE"));
    var clusdisptyp = getNodeText(selectSingleNode(traildom, "DISPLAY_TYPE"));
    if ((kerdisptyp == clusdisptyp) || (kerdisptyp == 'RADIO' && clusdisptyp == 'SELECT') || (kerdisptyp == 'SELECT' && clusdisptyp == 'RADIO')) {
        var kerCustAttr = selectNodes(kerchild, "RAD_FIELD_CUSTOM_ATTRS");
        for (var k = 0;k < kerCustAttr.length;k++) {
            var attrName = getNodeText(selectSingleNode(kerCustAttr[k], "ATTR_NAME"));
            var clusCustAttr = selectSingleNode(traildom, "/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME='" + attrName + "']");
            if (clusCustAttr == null) {
                //check if display type is changed..
                traildom.appendChild(kerCustAttr[k]);
            }
        }
    }
    return traildom;
}

function ReplaceFullNodes(node, currnode, newDom) {
    if (node == 'RAD_ACTIONS'|| node == 'RAD_REST_ACTIONS') {             //bug#32499898
        var selNd = selectNodes(newDom, "//RAD_KERNEL/" + node);
        for (var snd = 0;snd < selNd.length;snd++) {
            selNd[snd].parentNode.removeChild(selNd[snd]);
        }
        var cluschild = selectSingleNode(newDom, "//" + currnode + "/" + node);
        if (cluschild) {
            selectSingleNode(newDom, "//RAD_KERNEL").appendChild(cluschild);
        }
    }
    else if (node == 'RAD_FUNC_PREFERENCES') {
        if (selectSingleNode(newDom, "//" + currnode + "/" + node) != null) {

            var datscr = selectNodes(newDom, "//" + currnode + "/" + node);
            var selNds = selectNodes(newDom, "//RAD_KERNEL/" + node);
            for (var sn = 0;sn < selNds.length;sn++) {
                selNds[sn].parentNode.removeChild(selNds[sn]);
            }
            for (var k = 0;k < datscr.length;k++) {
                var id = datscr[k].getAttribute("ID");
                var clusnode = selectSingleNode(newDom, "//" + currnode + "/" + node + "[@ID='" + id + "']");
                if (clusnode) {
                    selectSingleNode(newDom, "//RAD_KERNEL").appendChild(clusnode);
                }
            }
        }
    }
    else {
        var datscr = selectNodes(newDom, "//" + currnode + "/" + node);
        var selNds = selectNodes(newDom, "//RAD_KERNEL/" + node);
       /* for (var sn = 0;sn < selNds.length;sn++) {               //bug#32499898
            selNds[sn].parentNode.removeChild(selNds[sn]);
        }*/
        for (var k = 0;k < datscr.length;k++) {
            var id = datscr[k].getAttribute("ID");
            var clusnode = selectSingleNode(newDom, "//" + currnode + "/" + node + "[@ID='" + id + "']");
           
      
            if (clusnode) {
            	//Bug_36138507 if condition added
            	 if (selNds[k]) {
               selNds[k].parentNode.removeChild(selNds[k]);                    //bug#32499898
            	 }
            	//Bug_36138507 if condition ends
            	
                selectSingleNode(newDom, "//RAD_KERNEL").appendChild(clusnode);
            }
        }
    }
}

function fnupdateHeaderNodes(consd, funcd) {
    var headernode = "";
    var radMainarray = elementArray['RAD_MAIN'].split("~");
    var hdnode = selectSingleNode(funcd, "//RAD_FUNCTIONS");
    for (var hdcnt = 0;hdcnt < radMainarray.length;hdcnt++) {
        if (radMainarray[hdcnt] != "GEN_ALL" || radMainarray[hdcnt] != "SFR_NO") {
            headernode = selectSingleNode(consd, ("//" + (radMainarray[hdcnt])));
            try {
                setNodeText(selectSingleNode(hdnode, radMainarray[hdcnt]), getNodeText(selectSingleNode(consd, ("//" + radMainarray[hdcnt]))));

            }
            catch (e) {
                hdnode.insertBefore(headernode.childNodes[0], selectSingleNode(funcd, "//RAD_KERNEL"));
            }
        }
    }
}

// added-same as IE function-to support Server mode issue.  bug#32499898
function fnComparenodes_RadSummary(base, cons, node) {
    var elelen = new Array();
    elelen = elementArray_Summary[node].split("~");
    var addedTagPresent = 0;
    for (j = 0;j < elelen.length;j++) {
        if (selectSingleNode(base,elelen[j]) == null) {
            if (arrayAddedTags[node]) {
                if (arrayAddedTags[node].match(elelen[j])) {
                    var childNode = basedom.createElement(elelen[j]);
                    base.appendChild(childNode);
                    if (arrayDefaultValues[elelen[j]]) {
                    	selectSingleNode(base,elelen[j]).innerHTML = arrayDefaultValues[elelen[j]];
                    }
                }
            }
        }
        if (selectSingleNode(cons,elelen[j]) != null && selectSingleNode(base,elelen[j]) != null) {
            if (selectSingleNode(cons,elelen[j]).innerHTML != selectSingleNode(base,elelen[j]).innerHTML) {
                return 1;
            }
        }
    }
}

//added-same as IE function-to support Server mode issue. bug#32499898
function fnComparenodes_RadActions(base, cons, node) {
    var elelen = new Array();
    elelen = elementArray_Actions[node].split("~");
    var addedTagPresent = 0;
    for (j = 0;j < elelen.length;j++) {
        if (selectSingleNode(base,elelen[j]) == null) {
            if (arrayAddedTags[node]) {
                if (arrayAddedTags[node].match(elelen[j])) {
                    var childNode = basedom.createElement(elelen[j]);
                    base.appendChild(childNode);
                    if (arrayDefaultValues[elelen[j]]) {
                    	selectSingleNode(base,elelen[j]).innerHTML = arrayDefaultValues[elelen[j]];
                    }
                }
            }
        }
        if (selectSingleNode(cons,elelen[j]) != null && selectSingleNode(base,elelen[j]) != null) {
            if (selectSingleNode(cons,elelen[j]).innerHTML != selectSingleNode(base,elelen[j]).innerHTML) {
                return 1;
            }
        }
    }
}