/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadServDeltahandler.js
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
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  -------------------------------------------------------------------------------------------------------
*/

function fnPrepareconsoldom_Service(NewDOM, funcid, action) {
    debug('Preparing Service consoldom');
    releaseType = parent.relType;
    NewDOM = fnSetDefaultvals_Srv(NewDOM, "RAD_KERNEL");
    NewDOM = fnSetDefaultvals_Srv(NewDOM, "RAD_CLUSTER");
    NewDOM = fnSetDefaultvals_Srv(NewDOM, "RAD_CUSTOM");
    NewDOM = fnSetDefaultvals_Srv(NewDOM, "RAD_CUSTOMER");
    NewDOM = ApplyreleaseChanges_Service(NewDOM, funcid, action);
    debug('succesfully prepared consoldom');
    return NewDOM;
}

function ApplyreleaseChanges_Service(dom, funcid, action) {
    debug('Performing ApplyreleaseChanges');
    var reltype = parent.relType;
    var funcorg = getNodeText(selectSingleNode(NewDOM, ("//RAD_FUNCTIONS/SERVICE_ORIGIN")));
    var funcid = funcid;
    var action = action;
    if (reltype == 'KERNEL') {
        consoldom_Srv = dom.cloneNode(true);
        funcdom_Srv = dom.cloneNode(true);
        var finalxml = dom.cloneNode(true);
         if (navigator.appName != navAppName()) {
            //consoldom_Srv.loadXML(finalxml);
         } else {
           consoldom_Srv.loadXML(finalxml.xml);
         }
    }
    if (reltype == 'CLUSTER') {
        basedom_Srv = dom.cloneNode(true);
        if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CLUSTER").length != 0) {
            var finalxml = clusterOnKernel_Srv(dom);
            consoldom_Srv.loadXML(finalxml.xml);
        }
        else {
            consoldom_Srv = dom.cloneNode(true);
            var finalxml = dom.cloneNode(true);
        }
        funcdom_Srv = dom.cloneNode(true);
    }
    if (reltype == 'CUSTOM') {
        basedom_Srv = dom.cloneNode(true);
        if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CLUSTER").length != 0) {
            var finalxml = clusterOnKernel_Srv(dom);
            consoldom_Srv.loadXML(finalxml.xml);
        }
        else {
            consoldom_Srv = dom.cloneNode(true);
            var finalxml = dom.cloneNode(true);
        }
        basedom_Srv.selectNodes("//RAD_KERNEL//*").removeAll();
        var nodes = consoldom_Srv.selectNodes("//RAD_KERNEL/*");
        for (var i = 0;i < nodes.length;i++) {
            basedom_Srv.selectSingleNode("//RAD_KERNEL").appendChild(nodes[i].cloneNode(true));
        }

        if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CUSTOM").length != 0) {
            var finalxml = customOnKernel_Srv(finalxml);
            consoldom_Srv.loadXML(finalxml.xml);
        }
        else {
            consoldom_Srv = consoldom_Srv.cloneNode(true);
            var finalxml = finalxml;
        }
        funcdom_Srv = dom.cloneNode(true);
    }
    if (reltype == 'CUSTOMER') {
        basedom_Srv = dom.cloneNode(true);
        if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CLUSTER").length != 0) {
            var finalxml = clusterOnKernel_Srv(dom);
            consoldom_Srv.loadXML(finalxml.xml);
        }
        else {
            consoldom_Srv = dom.cloneNode(true);
            var finalxml = dom.cloneNode(true);
        }
        if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CUSTOM").length != 0) {
            var finalxml = customOnKernel_Srv(finalxml);
            consoldom_Srv.loadXML(finalxml.xml);
        }
        else {
            consoldom_Srv = consoldom_Srv.cloneNode(true);
            var finalxml = finalxml;
        }
        basedom_Srv.selectNodes("//RAD_KERNEL//*").removeAll();
        var nodes = consoldom_Srv.selectNodes("//RAD_KERNEL/*");
        for (var i = 0;i < nodes.length;i++) {
            basedom_Srv.selectSingleNode("//RAD_KERNEL").appendChild(nodes[i].cloneNode(true));
        }
        if (dom.selectNodes("//RAD_FUNCTIONS/RAD_CUSTOMER").length != 0) {
            var finalxml = customerOnKernel_Srv(finalxml);
            consoldom_Srv.loadXML(finalxml.xml);
        }
        else {
            consoldom_Srv = consoldom_Srv.cloneNode(true);
            var finalxml = finalxml;
        }
        funcdom_Srv = dom.cloneNode(true);
    }
    return consoldom_Srv;
}

function clusterOnKernel_Srv(myDom) {
    newDom = myDom.cloneNode(true);
    AssignOnKernel_Srv("RAD_FUNCTION_ID", "RAD_CLUSTER", newDom);
    newDom.selectNodes("//RAD_CLUSTER//*").removeAll();
    return newDom;
}

function AssignOnKernel_Srv(node, currnode, newDom) {
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
            elelen = elementArray_service[node].split("~");
            for (j = 0;j < elelen.length;j++) {
                if (kernode.selectSingleNode(elelen[j]) == null) {
                    newl = traildom.createElement(elelen[j]);
                    kernode.appendChild(newl);
                }
                if (kernode.selectSingleNode(elelen[j]) != null && clusnode.selectSingleNode(elelen[j]) != null) {
                    setNodeText(selectSingleNode(kernode, (elelen[j])), getNodeText(selectSingleNode(clusnode, (elelen[j]))));
                }
            }
            if (nodeChildArray_service[node]) {
                ReplaceLeafeNodes_Srv(kernode, clusnode, node, currnode, newDom);
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

function ReplaceLeafeNodes_Srv(kernelnode, clusternode, node, currnode, newDom) {
    var traildom = "";
    traildom.async = false;
    traildom.resolveExternals = false;
    traildom = "<?xml version='1.0' encoding='UTF-8'?>";
    traildom = loadXMLDoc(traildom);
    var childNode = new Array();
    if (nodeChildArray_service[node]) {
        childNode = nodeChildArray_service[node].split("~");
    }
    if (childNode.length > 0) {
        for (var i = 0;i < childNode.length;i++) {
            var datscr = clusternode.selectNodes(childNode[i]);
            for (var k = 0;k < datscr.length;k++) {
                var id = datscr[k].getAttribute("ID");
                var kernelchild = kernelnode.selectSingleNode(childNode[i] + "[@ID='" + id + "']");
                var clusterchild = clusternode.selectSingleNode(childNode[i] + "[@ID='" + id + "']");
                if (kernelchild) {
                    kernelchild.parentNode.replaceChild(clusterchild.cloneNode(true), kernelchild);
                }
                else {
                    kernelnode.appendChild(clusterchild);
                }
            }
        }
    }
}

function customOnKernel_Srv(myDom) {
    newDom = myDom.cloneNode(true);
    AssignOnKernel_Srv("RAD_FUNCTION_ID", "RAD_CUSTOM", newDom);
    newDom.selectNodes("//RAD_CUSTOM//*").removeAll();
    return newDom;
}

function RetroChangesToRespectiveRelease_service(dom) {
    debug('Performing RetroChangesToRespectiveRelease_service');
    var traildom = "";
    traildom.async = false;
    traildom.resolveExternals = false;
    traildom = "<?xml version='1.0' encoding='UTF-8'?>";
    traildom = loadXMLDoc(traildom);
    var parentOrg = "";
    var funcorg = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/SERVICE_ORIGIN"));
    var reltype = parent.relType;
    var funcid = document.getElementById('SERVICE_NAME').value;
    consoldom_Srv = dom.cloneNode(true);
    if (reltype == 'KERNEL') {
        funcdom_Srv = dom.cloneNode(true);
    }
    if ((reltype == 'CLUSTER' || reltype == 'CUSTOM' || reltype == 'CUSTOMER')) {
        var relNode = "RAD_" + reltype;
        var action = document.getElementById('SRV_ACTION').value;
        if (action == "NEW" && funcdom_Srv.xml == "") {
            funcdom_Srv = dom.cloneNode(true);
            funcdom_Srv.selectNodes("//RAD_KERNEL//*").removeAll();
        }
        if (funcdom_Srv.selectNodes("//" + relNode)[0] == null) {
            newl = traildom.createElement(relNode)
            head = funcdom_Srv.selectNodes("//RAD_FUNCTIONS/RAD_KERNEL")[0];
            head.parentNode.appendChild(newl);
        }
        else {
            funcdom_Srv.selectNodes("//" + relNode + "//*").removeAll();

        }
        fnCompare_Funcid(relNode);
    }

    removeChildren(selectNodes(funcdom_Srv,"//NONEXT_FUNCTIONS"));
    if (selectNodes(dom, "//NONEXT_FUNCTIONS").length > 0) {
        head = selectSingleNode(funcdom_Srv, "//RAD_FUNCTIONS");
        head.appendChild(selectNodes(dom, "//NONEXT_FUNCTIONS")[0].cloneNode(true));
    }
    return funcdom_Srv;
}

function fnCompare_Funcid(mainode) {
    var consdatascrs = consoldom_Srv.selectNodes("//RAD_KERNEL/RAD_FUNCTION_ID");
    for (i = 0;i < consdatascrs.length;i++) {
        var dsnName = getNodeText(selectSingleNode(consdatascrs[i], "NAME"));
        var basedatascrs = basedom_Srv.selectSingleNode("//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + dsnName + "']");
        if (basedatascrs != null) {
            var diffdatascrs = fnComparenodes_Srv(basedatascrs, consdatascrs[i], "RAD_FUNCTION_ID");
            if (diffdatascrs == "1") {
                head = funcdom_Srv.selectSingleNode("//" + mainode);
                head.appendChild(consdatascrs[i].cloneNode(true));
                var nod = funcdom_Srv.selectNodes("//" + mainode + "/RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }
                var consradfileds = consdatascrs[i].selectNodes("//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION")
                for (var k = 0;k < consradfileds.length;k++) {
                    var fldname = consradfileds[k].getAttribute("ID");
                    var baseradfiled = basedatascrs.selectSingleNode("//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION[ACTION_CODE='" + fldname + "']")
                    if (baseradfiled != null) {
                        var difffields = fnComparenodes_Srv(consradfileds[k], baseradfiled, "OPERATION");
                        if (difffields == "1") {
                            var fldname = consradfileds[k].getAttribute("ID");
                            if (funcdom_Srv.selectSingleNode("//" + mainode + "//RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION[ACTION_CODE='" + fldname + "']") != null) {
                                x = funcdom_Srv.selectSingleNode("//" + mainode + "//RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION[ACTION_CODE='" + fldname + "']");
                                x.parentNode.removeChild(x);
                            }
                            x = funcdom_Srv.selectSingleNode("//" + mainode + "/RAD_FUNCTION_ID[NAME='" + dsnName + "']");
                            x.appendChild(consradfileds[k].cloneNode(true));
                        }
                    }
                    else {
                        if (funcdom_Srv.selectSingleNode("//" + mainode + "/RAD_FUNCTION_ID[NAME='" + dsnName + "']") == null) {
                            head = funcdom_Srv.selectSingleNode("//" + mainode);
                            head.appendChild(consdatascrs[i].cloneNode(true))
                            var nod = funcdom_Srv.selectNodes("//" + mainode + "/RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }

                        }
                        var fldname = consradfileds[k].getAttribute("ID");
                        if (funcdom_Srv.selectSingleNode("//" + mainode + "//RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION[ACTION_CODE='" + fldname + "']") != null) {
                            x = funcdom_Srv.selectSingleNode("//" + mainode + "//RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION[ACTION_CODE='" + fldname + "']");
                            x.parentNode.removeChild(x);
                        }
                        x = funcdom_Srv.selectSingleNode("//" + mainode + "/RAD_FUNCTION_ID[NAME='" + dsnName + "']");
                        x.appendChild(consradfileds[k].cloneNode(true));
                    }
                }
            }
            if (diffdatascrs != "1") {
                var consradfileds = consdatascrs[i].selectNodes("//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION")
                for (var k = 0;k < consradfileds.length;k++) {
                    var fldname = consradfileds[k].getAttribute("ID");
                    var baseradfiled = basedatascrs.selectSingleNode("//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION[ACTION_CODE='" + fldname + "']")
                    if (baseradfiled != null) {
                        var difffields = fnComparenodes_Srv(consradfileds[k], baseradfiled, "OPERATION");
                        if (difffields == "1") {
                            if (funcdom_Srv.selectSingleNode("//" + mainode + "/RAD_FUNCTION_ID[NAME='" + dsnName + "']") == null) {
                                head = funcdom_Srv.selectSingleNode("//" + mainode);
                                head.appendChild(consdatascrs[i].cloneNode(true))
                                var nod = funcdom_Srv.selectNodes("//" + mainode + "/RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION");
                                for (var p = 0;p < nod.length;p++) {
                                    nod[p].parentNode.removeChild(nod[p]);
                                }
                            }
                            var fldname = consradfileds[k].getAttribute("ID");
                            if (funcdom_Srv.selectSingleNode("//" + mainode + "//RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION[ACTION_CODE='" + fldname + "']") != null) {
                                x = funcdom_Srv.selectSingleNode("//" + mainode + "//RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION[ACTION_CODE='" + fldname + "']");
                                x.parentNode.removeChild(x);
                            }
                            x = funcdom_Srv.selectSingleNode("//" + mainode + "/RAD_FUNCTION_ID[NAME='" + dsnName + "']");
                            x.appendChild(consradfileds[k].cloneNode(true));
                        }
                    }
                    else {
                        if (funcdom_Srv.selectSingleNode("//" + mainode + "/RAD_FUNCTION_ID[NAME='" + dsnName + "']") == null) {
                            head = funcdom_Srv.selectSingleNode("//" + mainode);
                            head.appendChild(consdatascrs[i].cloneNode(true))
                            var nod = funcdom_Srv.selectNodes("//" + mainode + "/RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        var fldname = consradfileds[k].getAttribute("ID");
                        if (funcdom_Srv.selectSingleNode("//" + mainode + "//RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION[ACTION_CODE='" + fldname + "']") != null) {
                            x = funcdom_Srv.selectSingleNode("//" + mainode + "//RAD_FUNCTION_ID[NAME='" + dsnName + "']/OPERATION[ACTION_CODE='" + fldname + "']");
                            x.parentNode.removeChild(x);
                        }
                        x = funcdom_Srv.selectSingleNode("//" + mainode + "/RAD_FUNCTION_ID[NAME='" + dsnName + "']");
                        x.appendChild(consradfileds[k].cloneNode(true));
                    }
                }
            }
        }
        else {
            head = funcdom_Srv.selectSingleNode("//" + mainode);
            head.appendChild(consdatascrs[i].cloneNode(true))
        }
    }
}

function fnComparenodes_Srv(base, cons, node) {
    var elelen = new Array();
    elelen = elementArray_service[node].split("~");
    var nonCompareArray = nodeNonCompareArray_service[node];
    var addedTagPresent = 0;
    for (j = 0;j < elelen.length;j++) {
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

function fnSetDefaultvals_Srv(NewDOM, mainNode) {
    debug('In fnSetDefaultvals  mainnode=' + mainNode);
    // New Node Maintenance. 
    if (selectNodes(NewDOM, "//" + mainNode)) {
        //update Release
        var screens = selectNodes(NewDOM, "//" + mainNode + "/RAD_FUNCTION_ID");
        for (var j = 0;j < screens.length;j++) {
            var datasrcnm = getNodeText(selectSingleNode(screens[j], "NAME"));
            if (selectSingleNode(NewDOM, "//" + mainNode + "/RAD_FUNCTION_ID[NAME='" + datasrcnm + "']/RELEASE_TYPE") == null) {
                var lname = NewDOM.createElement("RELEASE_TYPE");
                selectSingleNode(NewDOM, "//" + mainNode + "/RAD_FUNCTION_ID[NAME='" + datasrcnm + "']").appendChild(lname);
                setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_FUNCTION_ID[NAME='" + datasrcnm + "']/RELEASE_TYPE"), "KERNEL");
            }
            if (selectSingleNode(NewDOM, "//" + mainNode + "/RAD_FUNCTION_ID[NAME='" + datasrcnm + "']/RELEASE_NAME") == null) {
                var lname = NewDOM.createElement("RELEASE_NAME");
                selectSingleNode(NewDOM, "//" + mainNode + "/RAD_FUNCTION_ID[NAME='" + datasrcnm + "']").appendChild(lname);
                setNodeText(selectSingleNode(NewDOM, "//" + mainNode + "/RAD_FUNCTION_ID[NAME='" + datasrcnm + "']/RELEASE_NAME"), "BASE_RELEASE");
            }
            var scrargs = selectNodes(NewDOM, "//" + mainNode + "/RAD_FUNCTION_ID[NAME='" + datasrcnm + "']/OPERATION");
            for (var k = 0;k < scrargs.length;k++) {
                if (selectSingleNode(scrargs[k], "RELEASE_TYPE") == null) {
                    var active = NewDOM.createElement("RELEASE_TYPE");
                    scrargs[k].appendChild(active);
                    setNodeText(selectSingleNode(scrargs[k], "RELEASE_TYPE"), "KERNEL");
                }
                if (selectSingleNode(scrargs[k], "RELEASE_NAME") == null) {
                    var active = NewDOM.createElement("RELEASE_NAME");
                    scrargs[k].appendChild(active);
                    setNodeText(selectSingleNode(scrargs[k], "RELEASE_NAME"), "BASE_RELEASE");
                }
            }
        }
        // update Release
    }
    return NewDOM;

}