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
  ** Copyright © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  -------------------------------------------------------------------------------------------------------
  */
//Function  preapares the FuncDOM and BaseDom based on release and applies release specific changes to consolidated DOM 
//and returns the consolidated Kernel DOM
function ApplyreleaseChanges(dom, funcid, functype, action) {
    debug('Performing ApplyreleaseChanges');
    var reltype = parent.relType;
    var funcorg = dom.selectSingleNode("//RAD_FUNCTIONS/FUNCTION_ORIGIN").text;
    var funcid = funcid;
    var func_type = functype;
    var action = action;
    if (reltype == 'KERNEL') {
        consoldom = dom.cloneNode(true);
        funcdom = dom.cloneNode(true);
        if (func_type == 'C') {
            basedom = dom.cloneNode(true);
            if (action == 'LOAD') {
                var finalxml = dom.cloneNode(true);
                finalxml = childKernelOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
        }
        if (func_type == 'S') {
            basedom = dom.cloneNode(true);
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_KERNEL").length != 0) {
                var finalxml = dom.cloneNode(true);
                finalxml = childKernelOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
                basedom.selectNodes("//RAD_KERNEL//*").removeAll();
                var nodes = consoldom.selectNodes("//RAD_KERNEL/*");
                for (var i = 0;i < nodes.length;i++) {
                    basedom.selectSingleNode("//RAD_KERNEL").appendChild(nodes[i].cloneNode(true));
                }
            }
            else {
                var finalxml = dom.cloneNode(true);
                consoldom.loadXML(finalxml.xml);
            }

            if (action == 'LOAD') {
                finalxml = scrchildKernelOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
        }
        if (func_type == 'P') {
            var finalxml = dom.cloneNode(true);
            consoldom.loadXML(finalxml.xml);
        }
    }
    if (reltype == 'CLUSTER') {
        basedom = dom.cloneNode(true);
        if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CLUSTER").length != 0) {
            var finalxml = clusterOnKernel(dom);
            consoldom.loadXML(finalxml.xml);
        }
        else {
            consoldom = dom.cloneNode(true);
            var finalxml = dom.cloneNode(true);
        }
        if (func_type == 'C') {
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_KERNEL").length != 0) {
                finalxml = childKernelOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            basedom.selectNodes("//RAD_KERNEL//*").removeAll();
            var nodes = consoldom.selectNodes("//RAD_KERNEL/*");
            for (var i = 0;i < nodes.length;i++) {
                basedom.selectSingleNode("//RAD_KERNEL").appendChild(nodes[i].cloneNode(true));
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_CLUSTER").length != 0) {
                finalxml = childClusterOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
        }
        if (func_type == 'S') {
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_KERNEL")) {
                if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_KERNEL").length != 0) {
                    finalxml = childKernelOnKernel(finalxml);
                    consoldom.loadXML(finalxml.xml);
                }
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_CLUSTER")) {
                if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_CLUSTER").length != 0) {
                    finalxml = childClusterOnKernel(finalxml);
                    consoldom.loadXML(finalxml.xml);
                }
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_SCRCHLD_KERNEL")) {
                if (dom.selectNodes("//RAD_FUNCTIONS/RAD_SCRCHLD_KERNEL").length != 0) {
                    finalxml = scrchildKernelOnKernel(finalxml);
                    consoldom.loadXML(finalxml.xml);
                }
            }

            basedom.selectNodes("//RAD_KERNEL//*").removeAll();
            var nodes = consoldom.selectNodes("//RAD_KERNEL/*");
            for (var i = 0;i < nodes.length;i++) {
                basedom.selectSingleNode("//RAD_KERNEL").appendChild(nodes[i].cloneNode(true));
            }

            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_SCRCHLD_CLUSTER")) {
                if (dom.selectNodes("//RAD_FUNCTIONS/RAD_SCRCHLD_CLUSTER").length != 0) {
                    finalxml = scrchildClusterOnKernel(finalxml);
                    consoldom.loadXML(finalxml.xml);
                }
            }

        }
        funcdom = dom.cloneNode(true);
    }
    if (reltype == 'CUSTOM') {
        basedom = dom.cloneNode(true);
        if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CLUSTER").length != 0) {
            var finalxml = clusterOnKernel(dom);
            consoldom.loadXML(finalxml.xml);
        }
        else {
            consoldom = dom.cloneNode(true);
            var finalxml = dom.cloneNode(true);
        }
        basedom.selectNodes("//RAD_KERNEL//*").removeAll();
        var nodes = consoldom.selectNodes("//RAD_KERNEL/*");
        for (var i = 0;i < nodes.length;i++) {
            basedom.selectSingleNode("//RAD_KERNEL").appendChild(nodes[i].cloneNode(true));
        }

        if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CUSTOM").length != 0) {
            var finalxml = customOnKernel(finalxml);
            consoldom.loadXML(finalxml.xml);
        }
        else {
            consoldom = consoldom.cloneNode(true);
            var finalxml = finalxml;
        }
        if (func_type == 'C') {
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_KERNEL").length != 0) {
                finalxml = childKernelOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_CLUSTER").length != 0) {
                finalxml = childClusterOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            basedom.selectNodes("//RAD_KERNEL//*").removeAll();
            var nodes = consoldom.selectNodes("//RAD_KERNEL/*");
            for (var i = 0;i < nodes.length;i++) {
                basedom.selectSingleNode("//RAD_KERNEL").appendChild(nodes[i].cloneNode(true));
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_CUSTOM").length != 0) {
                finalxml = childCustomOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
        }
        if (func_type == 'S') {
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_KERNEL").length != 0) {
                finalxml = childKernelOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_CLUSTER").length != 0) {
                finalxml = childClusterOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_CUSTOM").length != 0) {
                finalxml = childCustomOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_SCRCHLD_KERNEL").length != 0) {
                finalxml = scrchildKernelOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_SCRCHLD_CLUSTER").length != 0) {
                finalxml = scrchildClusterOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            basedom.selectNodes("//RAD_KERNEL//*").removeAll();
            var nodes = consoldom.selectNodes("//RAD_KERNEL/*");
            for (var i = 0;i < nodes.length;i++) {
                basedom.selectSingleNode("//RAD_KERNEL").appendChild(nodes[i].cloneNode(true));
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_SCRCHLD_CUSTOM").length != 0) {
                finalxml = scrchildCustomOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }

        }
        funcdom = dom.cloneNode(true);
    }
    if (reltype == 'CUSTOMER') {
        basedom = dom.cloneNode(true);
        if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CLUSTER").length != 0) {
            var finalxml = clusterOnKernel(dom);
            consoldom.loadXML(finalxml.xml);
        }
        else {
            consoldom = dom.cloneNode(true);
            var finalxml = dom.cloneNode(true);
        }
        if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CUSTOM").length != 0) {
            var finalxml = customOnKernel(finalxml);
            consoldom.loadXML(finalxml.xml);
        }
        else {
            consoldom = consoldom.cloneNode(true);
            var finalxml = finalxml;
        }
        basedom.selectNodes("//RAD_KERNEL//*").removeAll();
        var nodes = consoldom.selectNodes("//RAD_KERNEL/*");
        for (var i = 0;i < nodes.length;i++) {
            basedom.selectSingleNode("//RAD_KERNEL").appendChild(nodes[i].cloneNode(true));
        }
        if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CUSTOMER").length != 0) {
            var finalxml = customerOnKernel(finalxml);
            consoldom.loadXML(finalxml.xml);
        }
        else {
            consoldom = consoldom.cloneNode(true);
            var finalxml = finalxml;
        }
        if (func_type == 'C') {
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_KERNEL").length != 0) {
                finalxml = childKernelOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_CLUSTER").length != 0) {
                finalxml = childClusterOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_CUSTOM").length != 0) {
                finalxml = childCustomOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            basedom.selectNodes("//RAD_KERNEL//*").removeAll();
            var nodes = consoldom.selectNodes("//RAD_KERNEL/*");
            for (var i = 0;i < nodes.length;i++) {
                basedom.selectSingleNode("//RAD_KERNEL").appendChild(nodes[i].cloneNode(true));
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_CUSTOMER").length != 0) {
                finalxml = childCustomerOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
        }
        if (func_type == 'S') {
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_KERNEL").length != 0) {
                finalxml = childKernelOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_CLUSTER").length != 0) {
                finalxml = childClusterOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);

            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_CUSTOM").length != 0) {
                finalxml = childCustomOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CHILD_CUSTOMER").length != 0) {
                finalxml = childCustomerOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_SCRCHLD_KERNEL").length != 0) {
                finalxml = scrchildKernelOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_SCRCHLD_CLUSTER").length != 0) {
                finalxml = scrchildClusterOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_SCRCHLD_CUSTOM").length != 0) {
                finalxml = scrchildCustomOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
            basedom.selectNodes("//RAD_KERNEL//*").removeAll();
            var nodes = consoldom.selectNodes("//RAD_KERNEL/*");
            for (var i = 0;i < nodes.length;i++) {
                basedom.selectSingleNode("//RAD_KERNEL").appendChild(nodes[i].cloneNode(true));
            }
            if (dom.selectNodes("//RAD_FUNCTIONS/RAD_SCRCHLD_CUSTOMER").length != 0) {
                finalxml = scrchildCustomerOnKernel(finalxml);
                consoldom.loadXML(finalxml.xml);
            }
        }
        funcdom = dom.cloneNode(true);
    }
    return consoldom;
}
//Function compares and restore the changes done in respective Releases nodes.
function RetroChangesToRespectiveRelease(dom) {
    debug('Performing RetroChangesToRespectiveRelease');
    var traildom = "";
    traildom.async = false;
    traildom.resolveExternals = false;
    traildom = "<?xml version='1.0' encoding='UTF-8'?>";
    traildom = loadXMLDoc(traildom);

    var funcorg = dom.selectSingleNode("//RAD_FUNCTIONS/FUNCTION_ORIGIN").text;
    var parentOrg = dom.selectSingleNode("//RAD_FUNCTIONS/PARENT_ORIGIN").text;
    var reltype = parent.relType;
    try
    {
    var funcid = document.getElementById('FUNCTION_ID').value;
    var func_type = document.getElementById('FUNCTION_TYPE').value;
    }
    catch(e)
    {
    	var funcid = dom.selectSingleNode("//RAD_FUNCTIONS/FUNCTION_ID").text;
    	var func_type = dom.selectSingleNode("//RAD_FUNCTIONS/FUNCTION_TYPE").text; 
    }
    consoldom = dom.cloneNode(true);
    if (reltype == 'KERNEL' && (func_type != 'C' && func_type != 'S')) {
        funcdom = dom.cloneNode(true);
    }
    if ((reltype == 'CLUSTER' || reltype == 'CUSTOM' || reltype == 'CUSTOMER') && (func_type != 'C' && func_type != 'S')) {
        var relNode = "RAD_" + reltype;
        var action = document.getElementById('ACTION').value;
        if (action == "NEW" && funcdom.xml == "") {
            funcdom = dom.cloneNode(true);
            funcdom.selectNodes("//RAD_KERNEL//*").removeAll();
        }
        if (funcdom.selectNodes("//" + relNode)[0] == null) {
            newl = traildom.createElement(relNode)
            head = funcdom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL")[0];
            head.parentNode.appendChild(newl)
        }
        else {
            funcdom.selectNodes("//" + relNode + "//*").removeAll();

        }
        //fnComparePreferences(relNode);		
        var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES").length;
        var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES");
        for (var i = 0;i < len1;i++) {
            funcdom.selectSingleNode("//" + relNode).appendChild(nodes[i].cloneNode(true));
        }
        fnComparedsn(relNode);
        fnResetDsnFieldsBlockName();
        fnComparescreens(relNode);
        fnResetBlkFieldsFieldsetName();
        fnComparedatablks(relNode);
        fnComparefieldset(relNode);
        fnComparelovs(relNode);
        fnCompareRestService(relNode);
        /* var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS").length;
        var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS");
        for (var i = 0;i < len1;i++) {
            funcdom.selectSingleNode("//" + relNode).appendChild(nodes[i].cloneNode(true));
        } */
        fnCompareCallforms(relNode, "RAD_CALLFORM");
        fnCompareCallforms(relNode, "RAD_LAUNCHFORM");
        fnCompare_RadActions(relNode, "RAD_ACTION");
		fnCompare_RadSummary(relNode,"RAD_SUMMARY");
        /*var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
        var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
        for (var i = 0;i < len1;i++) {
            funcdom.selectSingleNode("//" + relNode).appendChild(nodes[i].cloneNode(true));
        }*/
    }
    if (func_type == 'C') {
        var chlRelNode = "RAD_CHILD_" + reltype;
        if (funcdom.selectNodes("//" + chlRelNode)[0] == null) {
            newl = traildom.createElement(chlRelNode)
            head = funcdom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL")[0];
            head.parentNode.appendChild(newl);
        }
        else {
            funcdom.selectNodes("//" + chlRelNode + "//*").removeAll();
        }
        //fnComparePreferences(chlRelNode);
        var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES").length;
        var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES");
        for (var i = 0;i < len1;i++) {
            funcdom.selectSingleNode("//" + chlRelNode).appendChild(nodes[i].cloneNode(true));
        }
        fnComparedsn(chlRelNode);
        fnResetDsnFieldsBlockName();
        fnComparescreens(chlRelNode);
        fnResetBlkFieldsFieldsetName();
        fnComparedatablks(chlRelNode);
        fnComparefieldset(chlRelNode);
        fnComparelovs(chlRelNode);
        fnCompareRestService(chlRelNode);
        /*  var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS").length;
        var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS");
        for (var i = 0;i < len1;i++) {
            funcdom.selectSingleNode("//" + chlRelNode).appendChild(nodes[i].cloneNode(true));
        } */
        fnCompareCallforms(chlRelNode, "RAD_CALLFORM");
        fnCompareCallforms(chlRelNode, "RAD_LAUNCHFORM");
        fnCompare_RadActions(chlRelNode, "RAD_ACTION")
        fnCompare_RadSummary(chlRelNode,"RAD_SUMMARY");
        /*var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
        var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
        for (var i = 0;i < len1;i++) {
            funcdom.selectSingleNode("//" + chlRelNode).appendChild(nodes[i].cloneNode(true));
        }*/
    }
    if (func_type == 'S') {
        var scchlRelNode = "RAD_SCRCHLD_" + reltype;
        if (funcdom.selectNodes("//" + scchlRelNode)[0] == null) {
            newl = traildom.createElement(scchlRelNode);
            head = funcdom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL")[0];
            head.parentNode.appendChild(newl)
        }
        else {
            funcdom.selectNodes("//" + scchlRelNode + "//*").removeAll();
        }
        //fnComparePreferences(scchlRelNode);
        var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES").length;
        var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES");
        for (var i = 0;i < len1;i++) {
            funcdom.selectSingleNode("//" + scchlRelNode).appendChild(nodes[i].cloneNode(true));
        }
        fnComparedsn(scchlRelNode);
        fnResetDsnFieldsBlockName();
        fnComparescreens(scchlRelNode);
        fnResetBlkFieldsFieldsetName();
        fnComparedatablks(scchlRelNode);
        fnComparefieldset(scchlRelNode);
        fnComparelovs(scchlRelNode);
        fnCompareRestService(scchlRelNode);
        /* var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS").length;
        var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS");
        for (var i = 0;i < len1;i++) {
            funcdom.selectSingleNode("//" + scchlRelNode).appendChild(nodes[i].cloneNode(true));
        } */
        fnCompareCallforms(scchlRelNode, "RAD_CALLFORM");
        fnCompareCallforms(scchlRelNode, "RAD_LAUNCHFORM");
        fnCompare_RadActions(scchlRelNode, "RAD_ACTION")
        /*var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
        var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
        for (var i = 0;i < len1;i++) {
            funcdom.selectSingleNode("//" + scchlRelNode).appendChild(nodes[i].cloneNode(true));
        }*/
    }
    if (funcorg == 'CLUSTER' && parentOrg != 'KERNEL' && func_type == 'P') {
        funcdom.selectNodes("//RAD_KERNEL//*").removeAll();
    }
    if (funcorg == 'CUSTOM' && func_type == 'P') {
        if (parentOrg != 'KERNEL') {
            funcdom.selectNodes("//RAD_KERNEL//*").removeAll();
        }
        if (parentOrg != 'CLUSTER') {
            funcdom.selectNodes("//RAD_CLUSTER//*").removeAll();
        }
    }
    if (funcorg == 'CUSTOMER' && func_type == 'P') {
        if (parentOrg != 'KERNEL') {
            funcdom.selectNodes("//RAD_KERNEL//*").removeAll();
        }
        if (parentOrg != 'CLUSTER') {
            funcdom.selectNodes("//RAD_CLUSTER//*").removeAll();
        }
        if (parentOrg != 'CUSTOM') {
            funcdom.selectNodes("//RAD_CLUSTER//*").removeAll();
        }
    }
    fnupdateHeaderNodes(consoldom, funcdom);
    return funcdom;
}

function fnComparedsn(mainode) {
    var consdatascrs = consoldom.selectNodes("//RAD_KERNEL/RAD_DATASOURCES");
    for (i = 0;i < consdatascrs.length;i++) {
        var dsnName = consdatascrs[i].selectSingleNode("DATASRC_NAME").text;
        var basedatascrs = basedom.selectSingleNode("//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']");
        if (basedatascrs != null) {
            var diffdatascrs = fnComparenodes(basedatascrs, consdatascrs[i], "RAD_DATASOURCES");
            if (diffdatascrs == "1") {
                head = funcdom.selectSingleNode("//" + mainode);
                head.appendChild(consdatascrs[i].cloneNode(true));
                var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }
                var consradfileds = consdatascrs[i].selectNodes("//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS")
                for (var k = 0;k < consradfileds.length;k++) {
                    var fldname = consradfileds[k].getAttribute("ID");
                    var baseradfiled = basedatascrs.selectSingleNode("//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']")
                    if (baseradfiled != null) {
                        var difffields = fnComparenodes(consradfileds[k], baseradfiled, "RAD_FIELDS");
                        if (difffields == "1") {
                            var fldname = consradfileds[k].getAttribute("ID");
                            if (funcdom.selectSingleNode("//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']") != null) {
                                x = funcdom.selectSingleNode("//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']");
                                x.parentNode.removeChild(x);
                            }
                            x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']");
                            x.appendChild(consradfileds[k].cloneNode(true));
                        }
                    }
                    else {
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']") == null) {
                            head = funcdom.selectSingleNode("//" + mainode);
                            head.appendChild(consdatascrs[i].cloneNode(true))
                            var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }

                        }
                        var fldname = consradfileds[k].getAttribute("ID");
                        if (funcdom.selectSingleNode("//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']") != null) {
                            x = funcdom.selectSingleNode("//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']");
                            x.parentNode.removeChild(x);
                        }
                        x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']");
                        x.appendChild(consradfileds[k].cloneNode(true));
                    }
                }
            }
            if (diffdatascrs != "1") {
                var consradfileds = consdatascrs[i].selectNodes("//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS")
                for (var k = 0;k < consradfileds.length;k++) {
                    var fldname = consradfileds[k].getAttribute("ID");
                    var baseradfiled = basedatascrs.selectSingleNode("//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']")
                    if (baseradfiled != null) {
                        var difffields = fnComparenodes(consradfileds[k], baseradfiled, "RAD_FIELDS");
                        if (difffields == "1") {
                            if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']") == null) {
                                head = funcdom.selectSingleNode("//" + mainode);
                                head.appendChild(consdatascrs[i].cloneNode(true))
                                var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS");
                                for (var p = 0;p < nod.length;p++) {
                                    nod[p].parentNode.removeChild(nod[p]);
                                }
                            }
                            var fldname = consradfileds[k].getAttribute("ID");
                            if (funcdom.selectSingleNode("//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']") != null) {
                                x = funcdom.selectSingleNode("//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']");
                                x.parentNode.removeChild(x);
                            }
                            x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']");
                            x.appendChild(consradfileds[k].cloneNode(true));
                        }
                    }
                    else {
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']") == null) {
                            head = funcdom.selectSingleNode("//" + mainode);
                            head.appendChild(consdatascrs[i].cloneNode(true))
                            var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        var fldname = consradfileds[k].getAttribute("ID");
                        if (funcdom.selectSingleNode("//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']") != null) {
                            x = funcdom.selectSingleNode("//" + mainode + "//RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']");
                            x.parentNode.removeChild(x);
                        }
                        x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']");
                        x.appendChild(consradfileds[k].cloneNode(true));
                    }
                }
            }
        }
        else {
            head = funcdom.selectSingleNode("//" + mainode);
            head.appendChild(consdatascrs[i].cloneNode(true))
        }
    }
}

function fnComparelovs(mainode) {
    var len;
    //Code To Compare Lovs
    var consdatascrs = consoldom.selectNodes("//RAD_KERNEL/RAD_LOVS");
    for (i = 0;i < consdatascrs.length;i++) {
        var dsnName = consdatascrs[i].selectSingleNode("LOV_NAME").text;
        var basedatascrs = basedom.selectSingleNode("//RAD_KERNEL/RAD_LOVS[LOV_NAME='" + dsnName + "']");
        if (basedatascrs) {
            var diffdatascrs = fnComparenodes(basedatascrs, consdatascrs[i], "RAD_LOVS");
            if (diffdatascrs == "1") {
                head = funcdom.selectSingleNode("//" + mainode);
                head.appendChild(consdatascrs[i].cloneNode(true))
            }
            if (diffdatascrs != "1") {
                var consradfileds = consdatascrs[i].selectNodes("//RAD_KERNEL/RAD_LOVS[LOV_NAME='" + dsnName + "']/RAD_LOV_DETAILS")
                for (var k = 0;k < consradfileds.length;k++) {
                    var id = consradfileds[k].getAttribute("ID");
                    var baseradfileds = basedatascrs.selectSingleNode("//RAD_KERNEL/RAD_LOVS[LOV_NAME='" + dsnName + "']/RAD_LOV_DETAILS[@ID='" + id + "']");
                    var difffields = fnComparenodes(consradfileds[k], baseradfileds, "RAD_LOV_DETAILS");
                    if (difffields == "1") {
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_LOVS[LOV_NAME='" + dsnName + "']") == null) {
                            head = funcdom.selectSingleNode("//" + mainode);
                            head.appendChild(consdatascrs[i].cloneNode(true))
                        }
                    }
                }
                if (baseradfileds) {
                    if (consradfileds.length < baseradfileds.length) {
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_LOVS[LOV_NAME='" + dsnName + "']") == null) {
                            head = funcdom.selectSingleNode("//" + mainode);
                            head.appendChild(consdatascrs[i].cloneNode(true))
                        }
                    }
                    if (consradfileds.length > baseradfileds.length) {
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_LOVS[LOV_NAME='" + dsnName + "']") == null) {
                            head = funcdom.selectSingleNode("//" + mainode);
                            head.appendChild(consdatascrs[i].cloneNode(true))
                        }
                    }
                }
            }
        }
        else {
            head = funcdom.selectSingleNode("//" + mainode);
            head.appendChild(consdatascrs[i].cloneNode(true))

        }
    }
}


function fnCompareRestService(mainode) {
    var len;
    //Code To Compare Lovs
    var consdatascrs = consoldom.selectNodes("//RAD_KERNEL/RAD_REST_ACTIONS");
    for (i = 0;i < consdatascrs.length;i++) {
        var dsnName = consdatascrs[i].selectSingleNode("REST_SERVICE_NAME").text;
        var basedatascrs = basedom.selectSingleNode("//RAD_KERNEL/RAD_REST_ACTIONS[REST_SERVICE_NAME='" + dsnName + "']");
        if (basedatascrs) {
            var diffdatascrs = fnComparenodes(basedatascrs, consdatascrs[i], "RAD_REST_ACTIONS");
            if (diffdatascrs == "1") {
                head = funcdom.selectSingleNode("//" + mainode);
                head.appendChild(consdatascrs[i].cloneNode(true))
            }
            if (diffdatascrs != "1") {
                var consradfileds = consdatascrs[i].selectNodes("//RAD_KERNEL/RAD_REST_ACTIONS[REST_SERVICE_NAME='" + dsnName + "']/RAD_REST_ACTION")
                for (var k = 0;k < consradfileds.length;k++) {
                    var id = consradfileds[k].getAttribute("ID");
                    var baseradfileds = basedatascrs.selectSingleNode("//RAD_KERNEL/RAD_REST_ACTIONS[REST_SERVICE_NAME='" + dsnName + "']/RAD_REST_ACTION[@ID='" + id + "']");
                    var difffields = fnComparenodes(consradfileds[k], baseradfileds, "RAD_REST_ACTION");
                    if (difffields == "1") {
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_REST_ACTIONS[REST_SERVICE_NAME='" + dsnName + "']") == null) {
                            head = funcdom.selectSingleNode("//" + mainode);
                            head.appendChild(consdatascrs[i].cloneNode(true))
                        }
                    }
                }
                if (baseradfileds) {
                    if (consradfileds.length < baseradfileds.length) {
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_REST_ACTIONS[REST_SERVICE_NAME='" + dsnName + "']") == null) {
                            head = funcdom.selectSingleNode("//" + mainode);
                            head.appendChild(consdatascrs[i].cloneNode(true))
                        }
                    }
                    if (consradfileds.length > baseradfileds.length) {
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_REST_ACTIONS[REST_SERVICE_NAME='" + dsnName + "']") == null) {
                            head = funcdom.selectSingleNode("//" + mainode);
                            head.appendChild(consdatascrs[i].cloneNode(true))
                        }
                    }
                }
            }
        }
        else {
            head = funcdom.selectSingleNode("//" + mainode);
            head.appendChild(consdatascrs[i].cloneNode(true))

        }
    }
}


function fnCompareCallforms(mainode, callorlaunch) {
    var len;
    var consdatascrs = consoldom.selectNodes("//RAD_KERNEL/" + callorlaunch);
    for (i = 0;i < consdatascrs.length;i++) {
        if (callorlaunch == "RAD_CALLFORM") {
            var dsnName = consdatascrs[i].selectSingleNode("CALLFORM_FUCNTIONID").text;
            var basedatascr = basedom.selectSingleNode("//RAD_KERNEL/RAD_CALLFORM[CALLFORM_FUCNTIONID='" + dsnName + "']");
            if (basedatascr) {
                var diffdatascrs = fnComparenodes(basedatascr, consdatascrs[i], "RAD_CALLFORM");
                if (diffdatascrs == "1") {
                    head = funcdom.selectSingleNode("//" + mainode);
                    head.appendChild(consdatascrs[i].cloneNode(true));
                }
            }
            else {
                head = funcdom.selectSingleNode("//" + mainode);
                head.appendChild(consdatascrs[i].cloneNode(true));
            }
        }
        if (callorlaunch == "RAD_LAUNCHFORM") {
            var dsnName = consdatascrs[i].selectSingleNode("LAUNCHFORM_FUCNTIONID").text;
            var basedatascr = basedom.selectSingleNode("//RAD_KERNEL/RAD_LAUNCHFORM[LAUNCHFORM_FUCNTIONID='" + dsnName + "']")
            if (basedatascr) {
                var diffdatascrs = fnComparenodes(basedatascr, consdatascrs[i], "RAD_LAUNCHFORM");
                if (diffdatascrs == "1") {
                    head = funcdom.selectSingleNode("//" + mainode);
                    head.appendChild(consdatascrs[i].cloneNode(true));
                }
            }
            else {
                head = funcdom.selectSingleNode("//" + mainode);
                head.appendChild(consdatascrs[i].cloneNode(true));
            }
        }
    }
}

function fnCompare_RadActions(mainode) {
    var consolfldsets = consoldom.selectNodes("//RAD_KERNEL/RAD_ACTIONS");
    for (i = 0;i < consolfldsets.length;i++) {
       if(consolfldsets[i].selectSingleNode("RAD_XSD_TYPE_NAME")==null || consolfldsets[i].selectSingleNode("RAD_XSD_TYPE_NAME").text=='')
           consolfldsets[i].parentNode.removeChild(consolfldsets[i]);           
       
    }
    consolfldsets = consoldom.selectNodes("//RAD_KERNEL/RAD_ACTIONS");
    for (i = 0;i < consolfldsets.length;i++) {
        var fldsetname = consolfldsets[i].selectSingleNode("RAD_XSD_TYPE_NAME").text;
        var basefldset = basedom.selectSingleNode("//RAD_KERNEL/RAD_ACTIONS[RAD_XSD_TYPE_NAME='" + fldsetname + "']");
        if (basefldset) {
            var diffldsets = fnComparenodes_RadActions(basefldset, consolfldsets[i], "RAD_ACTIONS");
            if (diffldsets == "1") {
                var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS").length;
                var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS");
                for (var i = 0;i < len1;i++) {
                    funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                }
                return;

                var nod = funcdom.selectNodes("//" + mainode + "/RAD_ACTIONS[RAD_XSD_TYPE_NAME='" + fldsetname + "']/RAD_ACTION");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }
                //RAD_ACTION
                var consolfldsetflds = consolfldsets[i].selectNodes("//RAD_KERNEL/RAD_ACTIONS[RAD_XSD_TYPE_NAME='" + fldsetname + "']/RAD_ACTION");
                for (var k = 0;k < consolfldsetflds.length;k++) {
                    var fldsetfld = consolfldsetflds[k].selectSingleNode("ACTION_CODE").text;
                    var basefldsetfld = basefldset.selectSingleNode("//RAD_KERNEL/RAD_ACTIONS[RAD_XSD_TYPE_NAME='" + fldsetname + "']/RAD_ACTION[ACTION_CODE='" + fldsetfld + "']");
                    if (basefldsetfld) {
                        var diffldsetfld = fnComparenodes_RadActions(basefldsetfld, consolfldsetflds[k], "RAD_ACTION");
                        if (diffldsetfld == "1") {
                            var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS").length;
                            var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS");
                            for (var i = 0;i < len1;i++) {
                                funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                            }
                            return;
                        }
                    }
                    else {
                        var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS").length;
                        var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS");
                        for (var i = 0;i < len1;i++) {
                            funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                        }
                        return 
                    }
                }
            }
            if (diffldsets != "1") {
                //RAD_ACTION
                var consolfldsetflds = consolfldsets[i].selectNodes("//RAD_KERNEL/RAD_ACTIONS[RAD_XSD_TYPE_NAME='" + fldsetname + "']/RAD_ACTION");
                for (var k = 0;k < consolfldsetflds.length;k++) {
                    var fldsetfld = consolfldsetflds[k].selectSingleNode("ACTION_CODE").text;
                    var basefldsetfld = basefldset.selectSingleNode("//RAD_KERNEL/RAD_ACTIONS[RAD_XSD_TYPE_NAME='" + fldsetname + "']/RAD_ACTION[ACTION_CODE='" + fldsetfld + "']");
                    if (basefldsetfld) {
                        var diffldsetfld = fnComparenodes_RadActions(basefldsetfld, consolfldsetflds[k], "RAD_ACTION");
                        if (diffldsetfld == "1") {
                            if (funcdom.selectSingleNode("//" + mainode + "/RAD_ACTIONS[RAD_XSD_TYPE_NAME='" + fldsetname + "']") == null) {
                                var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS").length;
                                var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS");
                                for (var i = 0;i < len1;i++) {
                                    funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                                }
                                return;
                                var nod = funcdom.selectNodes("//" + mainode + "/RAD_ACTIONS[RAD_XSD_TYPE_NAME='" + fldsetname + "']/RAD_ACTION");
                                for (var p = 0;p < nod.length;p++) {
                                    nod[p].parentNode.removeChild(nod[p]);
                                }
                            }
                            var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS").length;
                            var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS");
                            for (var i = 0;i < len1;i++) {
                                funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                            }
                            return;
                        }
                    }
                    else {
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_ACTIONS[RAD_XSD_TYPE_NAME='" + fldsetname + "']") == null) {
                            var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS").length;
                            var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS");
                            for (var i = 0;i < len1;i++) {
                                funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                            }
                            return;
                            var nod = funcdom.selectNodes("//" + mainode + "/RAD_ACTIONS[RAD_XSD_TYPE_NAME='" + fldsetname + "']/RAD_ACTION");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS").length;
                        var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS");
                        for (var i = 0;i < len1;i++) {
                            funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                        }
                        return;
                    }
                }
            }
        }
        else {
            var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS").length;
            var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS");
            for (var i = 0;i < len1;i++) {
                funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
            }
            return;

        }
    }
}

function fnCompare_RadSummary(mainode) {
    var consolfldsets = consoldom.selectNodes("//RAD_KERNEL/RAD_SUMMARY");
    for (i = 0;i < consolfldsets.length;i++) {
        var fldsetname = consolfldsets[i].selectSingleNode("RSLT_DATASRC").text;
        var basefldset = basedom.selectSingleNode("//RAD_KERNEL/RAD_SUMMARY[RSLT_DATASRC='" + fldsetname + "']");
        if (basefldset) {
            var diffldsets = fnComparenodes_RadSummary(basefldset, consolfldsets[i], "RAD_SUMMARY");
            if (diffldsets == "1") {
                var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
                var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
                for (var i = 0;i < len1;i++) {
                    funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                }
                return; 
            }
            if (diffldsets != "1") {
                //SUMMARY_DETAILS
                var consolfldsetflds = consolfldsets[i].selectNodes("//RAD_KERNEL/RAD_SUMMARY[RSLT_DATASRC='" + fldsetname + "']/SUMMARY_DETAILS");
                for (var k = 0;k < consolfldsetflds.length;k++) {
                    var fldsetfld = consolfldsetflds[k].selectSingleNode("FIELD_NAME").text;
                    var basefldsetfld = basefldset.selectSingleNode("//RAD_KERNEL/RAD_SUMMARY[RSLT_DATASRC='" + fldsetname + "']/SUMMARY_DETAILS[FIELD_NAME='" + fldsetfld + "']");
                    if (basefldsetfld) {
                        var diffldsetfld = fnComparenodes_RadSummary(basefldsetfld, consolfldsetflds[k], "SUMMARY_DETAILS");
                        if (diffldsetfld == "1") {
                            if (funcdom.selectSingleNode("//" + mainode + "/RAD_SUMMARY[RSLT_DATASRC='" + fldsetname + "']") == null) {
                                var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
                                var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
                                for (var i = 0;i < len1;i++) {
                                    funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                                }
                                return;
                                var nod = funcdom.selectNodes("//" + mainode + "/RAD_SUMMARY[RSLT_DATASRC='" + fldsetname + "']/SUMMARY_DETAILS");
                                for (var p = 0;p < nod.length;p++) {
                                    nod[p].parentNode.removeChild(nod[p]);
                                }
                            }
                            var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
                            var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
                            for (var i = 0;i < len1;i++) {
                                funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                            }
                            return;
                        }
                    }
                    else {
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_SUMMARY[RSLT_DATASRC='" + fldsetname + "']") == null) {
                            var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
                            var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
                            for (var i = 0;i < len1;i++) {
                                funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                            }
                            return;
                            var nod = funcdom.selectNodes("//" + mainode + "/RAD_SUMMARY[RSLT_DATASRC='" + fldsetname + "']/FIELD_NAME");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
                        var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
                        for (var i = 0;i < len1;i++) {
                            funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                        }
                        return;
                    }
                }
				//CUSTOM_BUTTONS_DETAILS
				var consolfldsetflds = consolfldsets[i].selectNodes("//RAD_KERNEL/RAD_SUMMARY[RSLT_DATASRC='" + fldsetname + "']/CUSTOM_BUTTONS_DETAILS");
                for (var k = 0;k < consolfldsetflds.length;k++) {
                    var fldsetfld = consolfldsetflds[k].selectSingleNode("FIELD_NAME").text;
                    var basefldsetfld = basefldset.selectSingleNode("//RAD_KERNEL/RAD_SUMMARY[RSLT_DATASRC='" + fldsetname + "']/CUSTOM_BUTTONS_DETAILS[FIELD_NAME='" + fldsetfld + "']");
                    if (basefldsetfld) {
                        var diffldsetfld = fnComparenodes_RadSummary(basefldsetfld, consolfldsetflds[k], "CUSTOM_BUTTONS_DETAILS");
                        if (diffldsetfld == "1") {
                            if (funcdom.selectSingleNode("//" + mainode + "/RAD_SUMMARY[RSLT_DATASRC='" + fldsetname + "']") == null) {
                                var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
                                var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
                                for (var i = 0;i < len1;i++) {
                                    funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                                }
                                return;
                                var nod = funcdom.selectNodes("//" + mainode + "/RAD_SUMMARY[RSLT_DATASRC='" + fldsetname + "']/CUSTOM_BUTTONS_DETAILS");
                                for (var p = 0;p < nod.length;p++) {
                                    nod[p].parentNode.removeChild(nod[p]);
                                }
                            }
                            var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
                            var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
                            for (var i = 0;i < len1;i++) {
                                funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                            }
                            return;
                        }
                    }
                    else {
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_SUMMARY[RSLT_DATASRC='" + fldsetname + "']") == null) {
                            var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
                            var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
                            for (var i = 0;i < len1;i++) {
                                funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                            }
                            return;
                            var nod = funcdom.selectNodes("//" + mainode + "/RAD_SUMMARY[RSLT_DATASRC='" + fldsetname + "']/FIELD_NAME");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
                        var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
                        for (var i = 0;i < len1;i++) {
                            funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
                        }
                        return;
                    }
                }
			
			}
        }
        else {
            var len1 = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY").length;
            var nodes = consoldom.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY");
            for (var i = 0;i < len1;i++) {
                funcdom.selectSingleNode("//" + mainode).appendChild(nodes[i].cloneNode(true));
            }
            return;

        }
    }
}

function fnComparescreens(mainode) {
    var consolscrs = consoldom.selectNodes("//RAD_KERNEL/RAD_SCREENS");
    for (i = 0;i < consolscrs.length;i++) {
        var scrName = consolscrs[i].selectSingleNode("SCREEN_NAME").text;
        var basescr = basedom.selectSingleNode("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
        if (basescr) {
            var diffscrs = fnComparenodes(basescr, consolscrs[i], "RAD_SCREENS");
            if (diffscrs == "1") {
                fnaddScrheader(consolscrs[i], scrName, mainode);
                //For SCREEN_ARGS childs
                var consolscrargs = consolscrs[i].selectNodes("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS");
                for (var k = 0;k < consolscrargs.length;k++) {
                    var scrarg = consolscrargs[k].selectSingleNode("SCREEN_ARG_NAME").text;
                    var basescrargs = basescr.selectSingleNode("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS[SCREEN_ARG_NAME='" + scrarg + "']");
                    if (basescrargs) {
                        var diffscrargs = fnComparenodes(basescrargs, consolscrargs[k], "SCREEN_ARGS");
                        if (diffscrargs == "1") {
                            x = funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
                            x.appendChild(consolscrargs[k].cloneNode(true));
                        }
                    }
                    else {
                        x = funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
                        x.appendChild(consolscrargs[k].cloneNode(true));
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
                var consolscrargs = consolscrs[i].selectNodes("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS");
                for (var k = 0;k < consolscrargs.length;k++) {
                    var scrarg = consolscrargs[k].selectSingleNode("SCREEN_ARG_NAME").text;
                    var basescrargs = basescr.selectSingleNode("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS[SCREEN_ARG_NAME='" + scrarg + "']");
                    if (basescrargs) {
                        var diffscrargs = fnComparenodes(basescrargs, consolscrargs[k], "SCREEN_ARGS");
                        if (diffscrargs == "1") {
                            fnaddScrheader(consolscrs[i], scrName, mainode);
                            x = funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
                            x.appendChild(consolscrargs[k].cloneNode(true));
                        }
                    }
                    else {
                        fnaddScrheader(consolscrs[i], scrName, mainode);
                        x = funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
                        x.appendChild(consolscrargs[k].cloneNode(true));
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
            head = funcdom.selectSingleNode("//" + mainode);
            head.appendChild(consolscrs[i].cloneNode(true))
        }
    }
}

function fnComparescrtabs(consolscr, basescr, scrName, mainode, scrnode) {
    var consolheader = consolscr.selectNodes("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode);
    for (var k = 0;k < consolheader.length;k++) {
        //RAD_TABS
        var consolscrtabs = consolscr.selectNodes("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS");
        for (var l = 0;l < consolscrtabs.length;l++) {
            var scrtab = consolscrtabs[l].selectSingleNode("TAB_NAME").text;
            var basescrtabs = basescr.selectSingleNode("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']");
            if (basescrtabs) {
                var diffscrtabs = fnComparenodes(basescrtabs, consolscrtabs[l], "RAD_TABS");
                if (diffscrtabs == "1") {
                    fnaddScrheader(consolscr, scrName, mainode);
                    fnaddScrtabHeader(scrName, scrnode, consolscrtabs[l], mainode);

                    // RAD_SECTIONS 
                    var consolsection = consolscr.selectNodes("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS");
                    for (var m = 0;m < consolsection.length;m++) {
                        var section = consolsection[m].selectSingleNode("SECTION_NAME").text;
                        var basesection = basescr.selectSingleNode("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']");
                        if (basesection) {
                            var diffsections = fnComparenodes(basesection, consolsection[m], "RAD_SECTIONS");
                            if (diffsections == "1") {
                                fnaddTabSection(scrName, scrnode, scrtab, consolsection[m], mainode);
                            }
                            if (diffsections != "1") {
                                //RAD_PARTITION	
                                var consolpartition = consolscr.selectNodes("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/RAD_PARTITIONS");
                                for (var n = 0;n < consolpartition.length;n++) {
                                    var partition = consolpartition[n].selectSingleNode("PARTITION_NAME").text;
                                    var basepartition = basescr.selectSingleNode("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/RAD_PARTITIONS[PARTITION_NAME='" + partition + "']");
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
                    var consolsection = consolscr.selectNodes("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS");
                    for (var m = 0;m < consolsection.length;m++) {
                        var section = consolsection[m].selectSingleNode("SECTION_NAME").text;
                        var basesection = basescr.selectSingleNode("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']");
                        if (basesection) {
                            var diffsections = fnComparenodes(basesection, consolsection[m], "RAD_SECTIONS");
                            if (diffsections == "1") {
                                fnaddScrheader(consolscr, scrName, mainode);
                                fnaddScrtabHeader(scrName, scrnode, consolscrtabs[l], mainode);
                                fnaddTabSection(scrName, scrnode, scrtab, consolsection[m], mainode);
                            }
                            if (diffsections != "1") {
                                //RAD_PARTITION	
                                var consolpartition = consolscr.selectNodes("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/RAD_PARTITIONS");
                                for (var n = 0;n < consolpartition.length;n++) {
                                    var partition = consolpartition[n].selectSingleNode("PARTITION_NAME").text;
                                    var basepartition = basescr.selectSingleNode("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/RAD_PARTITIONS[PARTITION_NAME='" + partition + "']");
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
    if (funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']") == null) {
        head = funcdom.selectSingleNode("//" + mainode);
        head.appendChild(scr.cloneNode(true));
        var nod = funcdom.selectNodes("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
        var nod = funcdom.selectNodes("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/HEADER");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
        var nod = funcdom.selectNodes("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/BODY");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
        var nod = funcdom.selectNodes("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/FOOTER");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
    }
}

function fnaddScrtab(scrName, scrnode, consolscrtab, mainode) {
    if (funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode) == null) {
        var scrdom = "";
        scrdom.async = false;
        scrdom.resolveExternals = false;
        scrdom = "<?xml version='1.0' encoding='UTF-8'?>";
        scrdom = loadXMLDoc(scrdom);
        newl = scrdom.createElement(scrnode);
        head = funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
        newl.setAttribute("ID", scrnode);
        head.appendChild(newl);
    }
    var tabname = consolscrtab.selectSingleNode("TAB_NAME").text;
    if (funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + tabname + "']") == null) {
        x = funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode);
        x.appendChild(consolscrtab.cloneNode(true));
    }
}

function fnaddScrtabHeader(scrName, scrnode, consolscrtab, mainode) {
    if (funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode) == null) {
        var scrdom = "";
        scrdom.async = false;
        scrdom.resolveExternals = false;
        scrdom = "<?xml version='1.0' encoding='UTF-8'?>";
        scrdom = loadXMLDoc(scrdom);
        newl = scrdom.createElement(scrnode);
        head = funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
        newl.setAttribute("ID", scrnode);
        head.appendChild(newl);
    }
    var tabname = consolscrtab.selectSingleNode("TAB_NAME").text;
    if (funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + tabname + "']") == null) {
        x = funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode);
        x.appendChild(consolscrtab.cloneNode(true));
        var nod = funcdom.selectNodes("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + tabname + "']/RAD_SECTIONS");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
    }
}

function fnaddTabSection(scrName, scrnode, tabname, consolsection, mainode) {
    var section = consolsection.selectSingleNode("SECTION_NAME").text;
    if (funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + tabname + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']") == null) {
        x = funcdom.selectSingleNode("//" + mainode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + tabname + "']");
        x.appendChild(consolsection.cloneNode(true));
    }
}

function fnComparefieldset(mainode) {
    var consolfldsets = consoldom.selectNodes("//RAD_KERNEL/RAD_FIELDSETS");
    for (i = 0;i < consolfldsets.length;i++) {
        var fldsetname = consolfldsets[i].selectSingleNode("FIELDSET_NAME").text;
        var basefldset = basedom.selectSingleNode("//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
        if (basefldset) {
            var diffldsets = fnComparenodes(basefldset, consolfldsets[i], "RAD_FIELDSETS");
            if (diffldsets == "1") {
                head = funcdom.selectSingleNode("//" + mainode);
                head.appendChild(consolfldsets[i].cloneNode(true));
                var nod = funcdom.selectNodes("//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }
                //FIELDSET_FIELDS
                var consolfldsetflds = consolfldsets[i].selectNodes("//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                for (var k = 0;k < consolfldsetflds.length;k++) {
                    var fldsetfld = consolfldsetflds[k].selectSingleNode("FIELD_NAME").text;
                    var basefldsetfld = basefldset.selectSingleNode("//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS[FIELD_NAME='" + fldsetfld + "']");
                    if (basefldsetfld) {
                        var diffldsetfld = fnComparenodes(basefldsetfld, consolfldsetflds[k], "FIELDSET_FIELDS");
                        if (diffldsetfld == "1") {
                            x = funcdom.selectSingleNode("//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
                            x.appendChild(consolfldsetflds[k].cloneNode(true));
                        }
                    }
                    else {
                        x = funcdom.selectSingleNode("//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
                        x.appendChild(consolfldsetflds[k].cloneNode(true));
                    }
                }
            }
            if (diffldsets != "1") {
                //FIELDSET_FIELDS
                var consolfldsetflds = consolfldsets[i].selectNodes("//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                for (var k = 0;k < consolfldsetflds.length;k++) {
                    var fldsetfld = consolfldsetflds[k].selectSingleNode("FIELD_NAME").text;
                    var basefldsetfld = basefldset.selectSingleNode("//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS[FIELD_NAME='" + fldsetfld + "']");
                    if (basefldsetfld) {
                        var diffldsetfld = fnComparenodes(basefldsetfld, consolfldsetflds[k], "FIELDSET_FIELDS");
                        if (diffldsetfld == "1") {
                            if (funcdom.selectSingleNode("//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']") == null) {
                                head = funcdom.selectSingleNode("//" + mainode);
                                head.appendChild(consolfldsets[i].cloneNode(true));
                                var nod = funcdom.selectNodes("//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                                for (var p = 0;p < nod.length;p++) {
                                    nod[p].parentNode.removeChild(nod[p]);
                                }
                            }
                            x = funcdom.selectSingleNode("//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
                            x.appendChild(consolfldsetflds[k].cloneNode(true));
                        }
                    }
                    else {
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']") == null) {
                            head = funcdom.selectSingleNode("//" + mainode);
                            head.appendChild(consolfldsets[i].cloneNode(true));
                            var nod = funcdom.selectNodes("//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        x = funcdom.selectSingleNode("//" + mainode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
                        x.appendChild(consolfldsetflds[k].cloneNode(true));
                    }
                }
            }
        }
        else {
            head = funcdom.selectSingleNode("//" + mainode);
            head.appendChild(consolfldsets[i].cloneNode(true));

        }
    }
}

function fnComparedatablks(mainode) {
    var consdatascrs = consoldom.selectNodes("//RAD_KERNEL/RAD_DATA_BLOCKS");
    for (i = 0;i < consdatascrs.length;i++) {
        var dsnName = consdatascrs[i].selectSingleNode("BLOCK_NAME").text;
        var basedatascr = basedom.selectSingleNode("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
        if (basedatascr) {
            var diffdatascrs = fnComparenodes(basedatascr, consdatascrs[i], "RAD_DATA_BLOCKS");
            if (diffdatascrs == "1") {
                head = funcdom.selectSingleNode("//" + mainode);
                head.appendChild(consdatascrs[i].cloneNode(true));
                var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }
                //For RAD_BLK_FIELDS Childs
                var consradfileds = consdatascrs[i].selectNodes("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS")
                for (var k = 0;k < consradfileds.length;k++) {
                    var fldName = consradfileds[k].selectSingleNode("FIELD_NAME").text;
                    var baseradfiled = basedatascr.selectSingleNode("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']")
                    if (baseradfiled) {
                        var difffields = fnComparenodes(baseradfiled, consradfileds[k], "RAD_BLK_FIELDS");
                        if (difffields == "1") {
                            x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                            x.appendChild(consradfileds[k].cloneNode(true));
                            var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS");
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
                        x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                        x.appendChild(consradfileds[k].cloneNode(true));
                    }
                }
                // blk_datasources    
                var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }
                var consradblkdtrs = consdatascrs[i].selectNodes("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                for (var bld = 0;bld < consradblkdtrs.length;bld++) {
                    var bldDsrName = consradblkdtrs[bld].selectSingleNode("DATASOURCE_NAME").text;
                    var baseradblkSrc = basedatascr.selectSingleNode("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES[DATASOURCE_NAME='" + bldDsrName + "']");
                    if (baseradblkSrc) {
                        var difffields = fnComparenodes(baseradblkSrc, consradblkdtrs[bld], "BLK_DATASOURCES");
                        if (difffields == "1") {
                            x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                            x.appendChild(consradblkdtrs[bld].cloneNode(true));
                        }
                    }
                    else {
                        x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                        x.appendChild(consradblkdtrs[bld].cloneNode(true));
                    }
                }
            }
            //If no difference in Data block level
            if (diffdatascrs != "1") {
                var consradfileds = consdatascrs[i].selectNodes("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                var dsnName = consdatascrs[i].selectSingleNode("BLOCK_NAME").text;
                for (var k = 0;k < consradfileds.length;k++) {
                    var fldName = consradfileds[k].selectSingleNode("FIELD_NAME").text;
                    var baseradfiled = basedatascr.selectSingleNode("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']")
                    if (baseradfiled) {
                        var difffields = fnComparenodes(baseradfiled, consradfileds[k], "RAD_BLK_FIELDS");
                        if (difffields == "1") {
                            if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                                head = funcdom.selectSingleNode("//" + mainode);
                                head.appendChild(consdatascrs[i].cloneNode(true));
                                var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                                for (var p = 0;p < nod.length;p++) {
                                    nod[p].parentNode.removeChild(nod[p]);
                                }
                            }
                            x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                            x.appendChild(consradfileds[k].cloneNode(true));
                            var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS");
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
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                            head = funcdom.selectSingleNode("//" + mainode);
                            head.appendChild(consdatascrs[i].cloneNode(true));
                            var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                        x.appendChild(consradfileds[k].cloneNode(true));
                    }
                }
                var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }
                var consradblkdtrs = consdatascrs[i].selectNodes("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                for (var bld = 0;bld < consradblkdtrs.length;bld++) {
                    var bldDsrName = consradblkdtrs[bld].selectSingleNode("DATASOURCE_NAME").text;
                    var baseradblkSrc = basedatascr.selectSingleNode("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES[DATASOURCE_NAME='" + bldDsrName + "']");
                    if (baseradblkSrc) {
                        var difffields = fnComparenodes(baseradblkSrc, consradblkdtrs[bld], "BLK_DATASOURCES");
                        if (difffields == "1") {
                            x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                            x.appendChild(consradblkdtrs[bld].cloneNode(true));
                        }
                    }
                    else {
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                            var head = funcdom.selectSingleNode("//" + mainode);
                            head.appendChild(consdatascrs[i].cloneNode(true));
                            var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                            var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                        x.appendChild(consradblkdtrs[bld].cloneNode(true));
                    }
                }
            }
        }
        else {
            head = funcdom.selectSingleNode("//" + mainode);
            head.appendChild(consdatascrs[i].cloneNode(true));
        }
    }
}

function fnComparenodes_RadActions(base, cons, node) {
    var elelen = new Array();
    elelen = elementArray_Actions[node].split("~");
    var addedTagPresent = 0;
    for (j = 0;j < elelen.length;j++) {
        if (base.selectSingleNode(elelen[j]) == null) {
            if (arrayAddedTags[node]) {
                if (arrayAddedTags[node].match(elelen[j])) {
                    var childNode = basedom.createElement(elelen[j]);
                    base.appendChild(childNode);
                    if (arrayDefaultValues[elelen[j]]) {
                        base.selectSingleNode(elelen[j]).text = arrayDefaultValues[elelen[j]];
                    }
                }
            }
        }
        if (cons.selectSingleNode(elelen[j]) != null && base.selectSingleNode(elelen[j]) != null) {
            if (cons.selectSingleNode(elelen[j]).text != base.selectSingleNode(elelen[j]).text) {
                return 1;
            }
        }
    }
}

function fnComparenodes_RadSummary(base, cons, node) {
    var elelen = new Array();
    elelen = elementArray_Summary[node].split("~");
    var addedTagPresent = 0;
    for (j = 0;j < elelen.length;j++) {
        if (base.selectSingleNode(elelen[j]) == null) {
            if (arrayAddedTags[node]) {
                if (arrayAddedTags[node].match(elelen[j])) {
                    var childNode = basedom.createElement(elelen[j]);
                    base.appendChild(childNode);
                    if (arrayDefaultValues[elelen[j]]) {
                        base.selectSingleNode(elelen[j]).text = arrayDefaultValues[elelen[j]];
                    }
                }
            }
        }
        if (cons.selectSingleNode(elelen[j]) != null && base.selectSingleNode(elelen[j]) != null) {
            if (cons.selectSingleNode(elelen[j]).text != base.selectSingleNode(elelen[j]).text) {
                return 1;
            }
        }
    }
}

function fnComparenodes(base, cons, node) {
    var elelen = new Array();
    elelen = elementArray[node].split("~");
    var nonCompareArray = nodeNonCompareArray[node];
    var addedTagPresent = 0;
    for (j = 0;j < elelen.length;j++) {
        if (base.selectSingleNode(elelen[j]) == null) {
            if (arrayAddedTags[node]) {
                if (arrayAddedTags[node].match(elelen[j])) {
                    var childNode = basedom.createElement(elelen[j]);
                    base.appendChild(childNode);
                    if (arrayDefaultValues[elelen[j]]) {
                        base.selectSingleNode(elelen[j]).text = arrayDefaultValues[elelen[j]];
                    }
                }
            }
        }
        if (cons.selectSingleNode(elelen[j]) != null && base.selectSingleNode(elelen[j]) != null) {
            if (arrayDefaultValues[elelen[j]]){
                if(base.selectSingleNode(elelen[j]).text=='') base.selectSingleNode(elelen[j]).text = arrayDefaultValues[elelen[j]];
                if(cons.selectSingleNode(elelen[j]).text=='') cons.selectSingleNode(elelen[j]).text = arrayDefaultValues[elelen[j]]
            }
            if (nonCompareArray) {
                if (nonCompareArray.indexOf(elelen[j]) ==  - 1) {
                    if (cons.selectSingleNode(elelen[j]).text != base.selectSingleNode(elelen[j]).text) {
                        return 1;
                    }
                }
            }
            else {
                if (cons.selectSingleNode(elelen[j]).text != base.selectSingleNode(elelen[j]).text) {
                    return 1;
                }
            }
        }
    }
}

function fnResetBlkFieldsFieldsetName() {
    var Block = consoldom.selectNodes("//RAD_KERNEL/RAD_DATA_BLOCKS");
    for (var p = 0;p < Block.length;p++) {
        var blkName = Block[p].selectSingleNode("BLOCK_NAME").text;
        var blkfields = Block[p].selectNodes("RAD_BLK_FIELDS");
        for (var t = 0;t < blkfields.length;t++) {
            var fldname = blkfields[t].selectSingleNode("FIELD_NAME").text
            var excNode = consoldom.selectNodes("//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_BLOCK='" + blkName + "']/FIELDSET_FIELDS[FIELD_NAME='" + fldname + "']");
            if (excNode.length > 0) {
                for (var i = 0;i < excNode.length;i++) {
                    if (excNode[i].selectSingleNode("ACTIVE").text == 'Y') {
                        var newfldsetName = excNode[i].parentNode.selectSingleNode("FIELDSET_NAME").text
                        blkfields[t].selectSingleNode("FIELDSET_NAME").text = newfldsetName;
                    }
                }
            }
        }
    }
}

function fnResetDsnFieldsBlockName() {
    var dsn = consoldom.selectNodes("//RAD_KERNEL/RAD_DATASOURCES");
    if (dsn.length > 0) {
        for (var p = 0;p < dsn.length;p++) {
            var dsnName = dsn[p].selectSingleNode("DATASRC_NAME").text;
            var fields = consoldom.selectSingleNode("//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsnName + "']/RAD_FIELDS");
            if (fields != null) {
                for (var k = 0;k < fields.length;k++) {
                    var colName = fields.selectSingleNode("COLUMN_NAME");
                    var exenode = consoldom.selectSingleNode("//RAD_KERNEL/RAD_DATA_BLOCKS/RAD_BLK_FIELDS[DBT='" + dsnName + "' and DBC='" + colName + "']");
                    var blkName = exenode.parentNode.selectSingleNode("BLOCK_NAME").text;
                    fields.selectSingleNode("BLOCK_NAME").text = blkName;
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
                var attrName = consretfileds[attr].selectSingleNode("ATTR_NAME").text;
                var baseretfileds = basedom.selectSingleNode("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME='" + attrName + "']");
                if (baseretfileds != null) {
                    var diffdatascrs = fnComparenodes(baseretfileds, consretfileds[attr], "RAD_FIELD_CUSTOM_ATTRS");
                    if (diffdatascrs == "1") {
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                            head = funcdom.selectSingleNode("//" + mainode);
                            parNode = consretfileds[attr].parentNode;
                            grandparNode = parNode.parentNode;
                            head.appendChild(grandparNode.cloneNode(true));
                            var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                            //for BLK_DATASOURCES
                            var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']") == null) {
                            head = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                            parNode = consretfileds[attr].parentNode
                            head.appendChild(parNode.cloneNode(true));
                            var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                            x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']");
                            x.appendChild(consretfileds[attr].cloneNode(true));
                        }
                        else {
                             if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME = '" + attrName + "']") != null) {
                              var nod = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME = '" + attrName + "']");
                              nod.parentNode.removeChild(nod);
                            }
                            x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']");
                            x.appendChild(consretfileds[attr].cloneNode(true));
                        }
                    }
                }
                else {
                    if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                        head = funcdom.selectSingleNode("//" + mainode);
                        parNode = consretfileds[attr].parentNode
                        grandparNode = parNode.parentNode
                        head.appendChild(grandparNode.cloneNode(true));
                        var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                        for (var p = 0;p < nod.length;p++) {
                            nod[p].parentNode.removeChild(nod[p]);
                        }
                        //for BLK_DATASOURCES
                        var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                        for (var p = 0;p < nod.length;p++) {
                            nod[p].parentNode.removeChild(nod[p]);
                        }

                    }
                    if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']") == null) {
                        head = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                        parNode = consretfileds[attr].parentNode
                        head.appendChild(parNode.cloneNode(true));
                        var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS");
                        for (var p = 0;p < nod.length;p++) {
                            nod[p].parentNode.removeChild(nod[p]);
                        }
                        x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']");
                        x.appendChild(consretfileds[attr].cloneNode(true));
                    }
                    else {
                        if (selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME = '" + attrName + "']") != null) {
                            var nod = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME = '" + attrName + "']");
                            nod.parentNode.removeChild(nod);
                        }
                        x = selectSingleNode(funcdom, "//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']");
                        x.appendChild(consretfileds[attr].cloneNode(true));
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
        if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']") != null) {
            var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']");
            nod[0].parentNode.removeChild(nod[0]);
        }
        return '1';
    }
}

function fnprocessBlkFieldLeaves(consdatascrs, basedatascrs, dsnName, fldName, mainode, leafNodes) {
    var custattrCompFlag = '1';
    var len2 = "";
    var consretfileds = consdatascrs[i].selectNodes("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/" + leafNodes)
    var baseretfileds = basedatascrs.selectNodes("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/" + leafNodes)
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
            if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                par = consdatascrs[i].selectNodes("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']")[0];
                gpar = par.parentNode;
                head = funcdom.selectSingleNode("//" + mainode);
                head.appendChild(gpar.cloneNode(true));
                var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                for (var p = 0;p < nod.length;p++) {
                    if (nod[p].selectSingleNode("FIELD_NAME").text != fldName) {
                        nod[p].parentNode.removeChild(nod[p]);
                    }
                }
                //For BLK_DATASOURCES
            }
            if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']") == null) {
                par = consdatascrs[i].selectNodes("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']")[0];
                gpar = par.parentNode;
                head = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                head.appendChild(par.cloneNode(true))
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
            if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                head = funcdom.selectSingleNode("//" + mainode);
                parNode = consretfileds[m].parentNode
                grandparNode = parNode.parentNode
                head.appendChild(grandparNode.cloneNode(true));

                var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                for (var p = 0;p < nod.length;p++) {
                    if (nod[p].selectSingleNode("FIELD_NAME").text != fldName) {
                        nod[p].parentNode.removeChild(nod[p]);
                    }
                }
                //For BLK_DATASOURCES
                var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }

                if (childname != "RAD_FIELD_CUSTOM_ATTRS") {
                    var attrs = "RAD_FIELD_CUSTOM_ATTRS";
                    var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/" + attrs);
                    for (var p = 0;p < nod.length;p++) {
                        nod[p].parentNode.removeChild(nod[p]);
                    }
                }
            }
            var id = consretfileds[m].getAttribute("ID");
            if (funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']/" + childname + "[@ID='" + id + "']").length == 0) {
                if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']") == null) {
                    head = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                    par = consretfileds[m].parentNode;
                    head.appendChild(par.cloneNode(true))

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
                if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']") == null) {
                    head = funcdom.selectSingleNode("//" + mainode);
                    parNode = consretfileds[m].parentNode
                    grandparNode = parNode.parentNode
                    head.appendChild(grandparNode.cloneNode(true));
                    var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS");
                    for (var p = 0;p < nod.length;p++) {
                        nod[p].parentNode.removeChild(nod[p]);
                    }
                    //for BLK_DATASOURCES
                    var nod = funcdom.selectNodes("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/BLK_DATASOURCES");
                    for (var p = 0;p < nod.length;p++) {
                        nod[p].parentNode.removeChild(nod[p]);
                    }

                }

                if (funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']") == null) {
                    head = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                    parNode = consretfileds[m].parentNode
                    head.appendChild(parNode.cloneNode(true))
                }
                else {
                    x = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldName + "']");
                    x.parentNode.removeChild(x);
                    head = funcdom.selectSingleNode("//" + mainode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + dsnName + "']");
                    parNode = consretfileds[m].parentNode
                    head.appendChild(parNode.cloneNode(true))
                }
            }
        }
    }
}

function clusterOnKernel(myDom) {
    newDom = myDom.cloneNode(true);
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_CLUSTER", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_CLUSTER", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_CLUSTER", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_CLUSTER", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_CLUSTER", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_CLUSTER", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_CLUSTER", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_CLUSTER", newDom);
    newDom.selectNodes("//RAD_CLUSTER//*").removeAll();
    return newDom;
}

function customOnKernel(myDom) {
    newDom = myDom.cloneNode(true);
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_CUSTOM", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_CUSTOM", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_CUSTOM", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_CUSTOM", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_CUSTOM", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_CUSTOM", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_CUSTOM", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_CUSTOM", newDom);
    newDom.selectNodes("//RAD_CUSTOM//*").removeAll();
    return newDom;
}

function customerOnKernel(myDom) {
    newDom = myDom.cloneNode(true);
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_CUSTOMER", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_CUSTOMER", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_CUSTOMER", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_CUSTOMER", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_CUSTOMER", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_CUSTOMER", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_CUSTOMER", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_CUSTOMER", newDom);
    newDom.selectNodes("//RAD_CUSTOMER//*").removeAll();
    return newDom;
}

function childKernelOnKernel(myDom) {
    newDom = myDom.cloneNode(true);
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_CHILD_KERNEL", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_CHILD_KERNEL", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_CHILD_KERNEL", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_CHILD_KERNEL", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_CHILD_KERNEL", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_CHILD_KERNEL", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_CHILD_KERNEL", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_CHILD_KERNEL", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_CHILD_KERNEL", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_CHILD_KERNEL", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_CHILD_KERNEL", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_CHILD_KERNEL", newDom);
    newDom.selectNodes("//RAD_CLUSTER//*").removeAll();
    newDom.selectNodes("//RAD_CUSTOM//*").removeAll();
    newDom.selectNodes("//RAD_CUSTOMER//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_KERNEL//*").removeAll();
    return newDom;
}

function childClusterOnKernel(myDom) {
    newDom = myDom.cloneNode(true);
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_CHILD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_CHILD_CLUSTER", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_CHILD_CLUSTER", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_CHILD_CLUSTER", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_CHILD_CLUSTER", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_CHILD_CLUSTER", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_CHILD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_CHILD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_CHILD_CLUSTER", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_CHILD_CLUSTER", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_CHILD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_CHILD_CLUSTER", newDom);
    newDom.selectNodes("//RAD_CLUSTER//*").removeAll();
    newDom.selectNodes("//RAD_CUSTOM//*").removeAll();
    newDom.selectNodes("//RAD_CUSTOMER//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_KERNEL//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_CLUSTER//*").removeAll();
    return newDom;
}

function childCustomOnKernel(myDom) {
    newDom = myDom.cloneNode(true);
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_CHILD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_CHILD_CUSTOM", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_CHILD_CUSTOM", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_CHILD_CUSTOM", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_CHILD_CUSTOM", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_CHILD_CUSTOM", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_CHILD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_CHILD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_CHILD_CUSTOM", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_CHILD_CUSTOM", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_CHILD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_CHILD_CUSTOM", newDom);
    newDom.selectNodes("//RAD_CLUSTER//*").removeAll();
    newDom.selectNodes("//RAD_CUSTOM//*").removeAll();
    newDom.selectNodes("//RAD_CUSTOMER//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_KERNEL//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_CLUSTER//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_CUSTOM//*").removeAll();
    return newDom;
}

function childCustomerOnKernel(myDom) {
    newDom = myDom.cloneNode(true);
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_CHILD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_CHILD_CUSTOMER", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_CHILD_CUSTOMER", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_CHILD_CUSTOMER", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_CHILD_CUSTOMER", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_CHILD_CUSTOMER", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_CHILD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_CHILD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_CHILD_CUSTOMER", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_CHILD_CUSTOMER", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_CHILD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_SUMMARY", "RAD_CHILD_CUSTOMER", newDom);
    newDom.selectNodes("//RAD_CLUSTER//*").removeAll();
    newDom.selectNodes("//RAD_CUSTOM//*").removeAll();
    newDom.selectNodes("//RAD_CUSTOMER//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_KERNEL//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_CLUSTER//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_CUSTOM//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_CUSTOMER//*").removeAll();
    return newDom;
}

function scrchildKernelOnKernel(myDom) {
    newDom = myDom.cloneNode(true);
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_SCRCHLD_KERNEL", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_SCRCHLD_KERNEL", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_SCRCHLD_KERNEL", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_SCRCHLD_KERNEL", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_SCRCHLD_KERNEL", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_SCRCHLD_KERNEL", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_SCRCHLD_KERNEL", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_SCRCHLD_KERNEL", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_SCRCHLD_KERNEL", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_SCRCHLD_KERNEL", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_SCRCHLD_KERNEL", newDom);
    //ReplaceFullNodes("RAD_SUMMARY", "RAD_SCRCHLD_KERNEL", newDom);
    newDom.selectNodes("//RAD_CHILD_KERNEL//*").removeAll();
    newDom.selectNodes("//RAD_SCRCHLD_KERNEL//*").removeAll();
    return newDom;
}

function scrchildClusterOnKernel(myDom) {
    newDom = myDom.cloneNode(true);
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_SCRCHLD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_SCRCHLD_CLUSTER", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_SCRCHLD_CLUSTER", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_SCRCHLD_CLUSTER", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_SCRCHLD_CLUSTER", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_SCRCHLD_CLUSTER", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_SCRCHLD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_SCRCHLD_CLUSTER", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_SCRCHLD_CLUSTER", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_SCRCHLD_CLUSTER", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_SCRCHLD_CLUSTER", newDom);
    //ReplaceFullNodes("RAD_SUMMARY", "RAD_SCRCHLD_CLUSTER", newDom);
    newDom.selectNodes("//RAD_CLUSTER//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_KERNEL//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_CLUSTER//*").removeAll();
    newDom.selectNodes("//RAD_SCRCHLD_KERNEL//*").removeAll();
    newDom.selectNodes("//RAD_SCRCHLD_CLUSTER//*").removeAll();
    return newDom;
}

function scrchildCustomOnKernel(myDom) {
    newDom = myDom.cloneNode(true);
    //AssignOnKernel("RAD_FUNC_PREFERENCES", "RAD_SCRCHLD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_FUNC_PREFERENCES", "RAD_SCRCHLD_CUSTOM", newDom);
    AssignOnKernel("RAD_DATASOURCES", "RAD_SCRCHLD_CUSTOM", newDom);
    AssignOnKernel("RAD_SCREENS", "RAD_SCRCHLD_CUSTOM", newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", "RAD_SCRCHLD_CUSTOM", newDom);
    AssignOnKernel("RAD_FIELDSETS", "RAD_SCRCHLD_CUSTOM", newDom);
    AssignOnKernel("RAD_LOVS", "RAD_SCRCHLD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_SCRCHLD_CUSTOM", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_SCRCHLD_CUSTOM", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_SCRCHLD_CUSTOM", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_SCRCHLD_CUSTOM", newDom);
    //ReplaceFullNodes("RAD_SUMMARY", "RAD_SCRCHLD_CUSTOM", newDom);
    newDom.selectNodes("//RAD_CLUSTER//*").removeAll();
    newDom.selectNodes("//RAD_CUSTOM//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_KERNEL//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_CLUSTER//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_CUSTOM//*").removeAll();
    newDom.selectNodes("//RAD_SCRCHLD_KERNEL//*").removeAll();
    newDom.selectNodes("//RAD_SCRCHLD_CLUSTER//*").removeAll();
    newDom.selectNodes("//RAD_SCRCHLD_CUSTOM//*").removeAll();
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
    ReplaceFullNodes("RAD_REST_ACTIONS", "RAD_SCRCHLD_CUSTOMER", newDom);
    ReplaceFullNodes("RAD_ACTIONS", "RAD_SCRCHLD_CUSTOMER", newDom);
    AssignOnKernel("RAD_CALLFORM", "RAD_SCRCHLD_CUSTOMER", newDom);
    AssignOnKernel("RAD_LAUNCHFORM", "RAD_SCRCHLD_CUSTOMER", newDom);
    //ReplaceFullNodes("RAD_SUMMARY", "RAD_SCRCHLD_CUSTOMER", newDom);
    newDom.selectNodes("//RAD_CLUSTER//*").removeAll();
    newDom.selectNodes("//RAD_CUSTOM//*").removeAll();
    newDom.selectNodes("//RAD_CUSTOMER//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_KERNEL//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_CLUSTER//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_CUSTOM//*").removeAll();
    newDom.selectNodes("//RAD_CHILD_CUSTOMER//*").removeAll();
    newDom.selectNodes("//RAD_SCRCHLD_KERNEL//*").removeAll();
    newDom.selectNodes("//RAD_SCRCHLD_CLUSTER//*").removeAll();
    newDom.selectNodes("//RAD_SCRCHLD_CUSTOM//*").removeAll();
    newDom.selectNodes("//RAD_SCRCHLD_CUSTOMER//*").removeAll();
    return newDom;
}

function AssignOnKernel(node, currnode, newDom) {
    var traildom = "";
    traildom.async = false;
    traildom.resolveExternals = false;
    traildom = "<?xml version='1.0' encoding='UTF-8'?>";
    traildom = loadXMLDoc(traildom);
    var datascr = newDom.selectNodes("//" + currnode + "/" + node);
    for (var k = 0;k < datascr.length;k++) {
        var id = datascr[k].getAttribute("ID");
        var kernode = newDom.selectSingleNode("//RAD_KERNEL/" + node + "[@ID='" + id + "']");
        var clusnode = newDom.selectSingleNode("//" + currnode + "/" + node + "[@ID='" + id + "']");
        if (kernode) {
            var elelen = new Array();
            elelen = elementArray[node].split("~");
            for (j = 0;j < elelen.length;j++) {
                if (kernode.selectSingleNode(elelen[j]) == null) {
                    newl = traildom.createElement(elelen[j]);
                    kernode.appendChild(newl);
                }
                if (kernode.selectSingleNode(elelen[j]) != null && clusnode.selectSingleNode(elelen[j]) != null) {
                    kernode.selectSingleNode(elelen[j]).text = clusnode.selectSingleNode(elelen[j]).text;
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
                kernode.parentNode.replaceChild(clusnode.cloneNode(true), kernode);
            }
        }
        else {
            newDom.selectSingleNode("//RAD_KERNEL").appendChild(clusnode.cloneNode(true))
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
            var datscr = clusnode.selectNodes(childNode[i]);
            for (var k = 0;k < datscr.length;k++) {
                var id = datscr[k].getAttribute("ID");
                var kerchild = kernode.selectSingleNode(childNode[i] + "[@ID='" + id + "']");
                var cluschild = clusnode.selectSingleNode(childNode[i] + "[@ID='" + id + "']");
                if (kerchild) {
                    if (id == 'BODY' || id == 'HEADER' || id == 'FOOTER') {
                        AssignLeafNodes(kerchild, cluschild, childNode[i], currnode, newDom);
                    }
                    else {
                        kerchild.parentNode.replaceChild(cluschild.cloneNode(true), kerchild);
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
            var datscr = clusnode.selectNodes(childNode[i]);
            for (var k = 0;k < datscr.length;k++) {
                var id = datscr[k].getAttribute("ID");
                var kerchild = kernode.selectSingleNode(childNode[i] + "[@ID='" + id + "']");
                var cluschild = clusnode.selectSingleNode(childNode[i] + "[@ID='" + id + "']");
                if (kerchild) {
                    var elelen = new Array();
                    elelen = elementArray[childNode[i]].split("~");
                    for (j = 0;j < elelen.length;j++) {
                        if (kerchild.selectSingleNode(elelen[j]) == null) {
                            newl = traildom.createElement(elelen[j]);
                            kerchild.appendChild(newl);
                        }
                        if (kerchild.selectSingleNode(elelen[j]) != null && cluschild.selectSingleNode(elelen[j]) != null) {
                            kerchild.selectSingleNode(elelen[j]).text = cluschild.selectSingleNode(elelen[j]).text;
                        }
                    }
                    if (nodeChildArray[childNode[i]]) {
                        ReplaceLeafeNodes(kerchild, cluschild, childNode[i], currnode, newDom);
                    }
                    else {
                        kerchild.parentNode.replaceChild(cluschild.cloneNode(true), kerchild);
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
    var childNode = new Array();
    if (nodeChildArray[node]) {
        childNode = nodeChildArray[node].split("~");
    }
    if (childNode.length > 0) {
        for (var i = 0;i < childNode.length;i++) {
            var datscr = clusternode.selectNodes(childNode[i]);
            for (var k = 0;k < datscr.length;k++) {
                var id = datscr[k].getAttribute("ID");
                var kernelchild = kernelnode.selectSingleNode(childNode[i] + "[@ID='" + id + "']");
                var clusterchild = clusternode.selectSingleNode(childNode[i] + "[@ID='" + id + "']");
                if (kernelchild) {
                    if (childNode[i] == 'RAD_BLK_FIELDS') {
                        //traildom.appendChild(clusterchild.cloneNode(true));
                        traildom = loadXMLDoc(getXMLString(clusterchild).toString());
                        traildom = selectSingleNode(traildom, 'RAD_BLK_FIELDS');
                       // var nod = traildom.selectNodes("RAD_FIELD_CUSTOM_ATTRS");
                        /*for (var p = 0;p < nod.length;p++) {
                            nod[p].parentNode.removeChild(nod[p]);
                        }*/
                        traildom = fnCompCustAttrbutes(kernelchild,traildom);
                        /*var clusCustNodes = selectNodes(clusterchild, "RAD_FIELD_CUSTOM_ATTRS");
                        for (var custnode = 0;custnode < clusCustNodes.length;custnode++) {
                            traildom.appendChild(clusCustNodes[custnode]);
                        }*/
                        kernelchild.parentNode.replaceChild(traildom.cloneNode(true), kernelchild);
                    }
                    else {
                        kernelchild.parentNode.replaceChild(clusterchild.cloneNode(true), kernelchild);
                    }
                }
                else {
                    kernelnode.appendChild(clusterchild);
                }
            }
        }
    }
}

function fnCompCustAttrbutes(kerchild,  traildom) {
    var kerdisptyp = getNodeText(selectSingleNode(kerchild, "DISPLAY_TYPE"));
    var clusdisptyp = getNodeText(selectSingleNode(traildom, "DISPLAY_TYPE"));
    if ((kerdisptyp == clusdisptyp) || (kerdisptyp == 'RADIO' && clusdisptyp == 'SELECT') || (kerdisptyp == 'SELECT' && clusdisptyp == 'RADIO')) {
        var kerCustAttr = selectNodes(kerchild, "RAD_FIELD_CUSTOM_ATTRS");
        for (var k = 0;k < kerCustAttr.length;k++) {
            var attrName = getNodeText(selectSingleNode(kerCustAttr[k], "ATTR_NAME"));
            var clusCustAttr = selectNodes(traildom, "//RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME='" + attrName + "']");
            if (clusCustAttr.length == 0) {
                //check if display type is changed..
                traildom.appendChild(kerCustAttr[k].cloneNode(true));
            }
        }
    }

    return traildom;
}

function ReplaceFullNodes(node, currnode, newDom) {
    if (node == 'RAD_ACTIONS' || node == 'RAD_REST_ACTIONS' ) {
        var cluschild = newDom.selectSingleNode("//" + currnode + "/" + node);
        if (cluschild) {
            newDom.selectNodes("//RAD_KERNEL/" + node).removeAll();
            newDom.selectSingleNode("//RAD_KERNEL").appendChild(cluschild.cloneNode(true));
        }
    }
    else if (node == 'RAD_FUNC_PREFERENCES') {
        if (newDom.selectSingleNode("//" + currnode + "/" + node) != null) {
            var datscr = newDom.selectNodes("//" + currnode + "/" + node);
            newDom.selectNodes("//RAD_KERNEL/" + node).removeAll();
            for (var k = 0;k < datscr.length;k++) {
                var id = datscr[k].getAttribute("ID");
                var clusnode = newDom.selectSingleNode("//" + currnode + "/" + node + "[@ID='" + id + "']");
                if (clusnode) {
                    newDom.selectSingleNode("//RAD_KERNEL").appendChild(clusnode.cloneNode(true));
                }
            }
        }
    }
    else {
        var datscr = newDom.selectNodes("//" + currnode + "/" + node);
        for (var k = 0;k < datscr.length;k++) {
            var id = datscr[k].getAttribute("ID");
            var clusnode = newDom.selectSingleNode("//" + currnode + "/" + node + "[@ID='" + id + "']");
            if (clusnode) {
			    newDom.selectNodes("//RAD_KERNEL/" + node).removeAll();
                newDom.selectSingleNode("//RAD_KERNEL").appendChild(clusnode.cloneNode(true));
            }
        }
    }
}

function fnupdateHeaderNodes(consd, funcd) {
    var headernode = "";
    headernode.async = false;
    headernode.resolveExternals = false;
    headernode = "<?xml version='1.0' encoding='UTF-8'?>";
    headernode = loadXMLDoc(headernode);
    var radMainarray = elementArray['RAD_MAIN'].split("~");
    var hdnode = funcd.selectSingleNode("//RAD_FUNCTIONS");
    for (var hdcnt = 0;hdcnt < radMainarray.length;hdcnt++) {
    	
        headernode.loadXML(consd.selectSingleNode("//" + radMainarray[hdcnt]).xml);
        try {
            hdnode.replaceChild(headernode.childNodes[0], hdnode.selectSingleNode(radMainarray[hdcnt]));
        }
        catch (e) {
            try {
                hdnode.insertBefore(headernode.childNodes[0], funcd.selectSingleNode("//RAD_KERNEL"));
            }
            catch (e) {
            }
        }
    }
 }