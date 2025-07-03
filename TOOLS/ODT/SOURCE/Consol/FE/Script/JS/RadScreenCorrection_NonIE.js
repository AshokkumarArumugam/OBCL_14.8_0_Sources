/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadScreenCorrection_NonIEjs
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
var correctedDom = "";
correctedDom.async = false;
correctedDom.resolveExternals = false;
correctedDom = "<?xml version='1.0' encoding='UTF-8'?>";
correctedDom = loadXMLDoc(correctedDom);
var workDom = "";
workDom.async = false;
workDom.resolveExternals = false;
workDom = "<?xml version='1.0' encoding='UTF-8'?>";
workDom = loadXMLDoc(workDom);
var TempCorrectionArray = new Array();
TempCorrectionArray['RAD_FIELDSETS'] = "FIELDSET_BLOCK~MULTI_RECORD~VIEW_TYPE";

function fnScreenNode_Correction(OriginalDom) {
    debug('In fnScreenNode_Correction to correct the screen nodes');
    var domxml;
    var traildom = "";
    traildom.async = false;
    traildom.resolveExternals = false;
    traildom = "<?xml version='1.0' encoding='UTF-8'?>";
    traildom = loadXMLDoc(traildom);
    OriginalDom = loadXMLDoc(getXMLString(OriginalDom).toString());
    workDom = loadXMLDoc(getXMLString(OriginalDom).toString());
    correctedDom = loadXMLDoc(getXMLString(OriginalDom).toString());
    //TEMP_CORRECTION_DONE node may not be present in case of source refresh, so adding the same
    if (selectSingleNode(workDom, "//RAD_FUNCTIONS/TEMP_CORRECTION_DONE") == null) {
        var tmpCorrection = traildom.createElement("TEMP_CORRECTION_DONE");
        var funcNode = selectSingleNode(correctedDom, "//RAD_FUNCTIONS");
        funcNode.appendChild(tmpCorrection);
        setNodeText(selectSingleNode(funcNode, "TEMP_CORRECTION_DONE"), "N");
    }
    if (getNodeText(selectSingleNode(correctedDom, "//RAD_FUNCTIONS/TEMP_CORRECTION_DONE")) == "") {
        setNodeText(selectSingleNode(correctedDom, "//RAD_FUNCTIONS/TEMP_CORRECTION_DONE"), "N");
    }
    if (selectNodes(correctedDom, "//RAD_CLUSTER").length != 0) {
        if (selectNodes(correctedDom, "//RAD_CLUSTER")[0].childNodes.length == 0) {
            selectNodes(correctedDom, "//RAD_FUNCTIONS")[0].removeChild(selectNodes(correctedDom, "//RAD_CLUSTER")[0]);
            selectNodes(workDom, "//RAD_FUNCTIONS")[0].removeChild(selectNodes(workDom, "//RAD_CLUSTER")[0]);
        }
    }
    if (selectNodes(correctedDom, "//RAD_CUSTOM").length != 0) {
        if (selectNodes(correctedDom, "//RAD_CUSTOM")[0].childNodes.length == 0) {
            selectNodes(correctedDom, "//RAD_FUNCTIONS")[0].removeChild(selectNodes(correctedDom, "//RAD_CUSTOM")[0]);
            selectNodes(workDom, "//RAD_FUNCTIONS")[0].removeChild(selectNodes(workDom, "//RAD_CUSTOM")[0]);
        }
    }
    if (selectNodes(correctedDom, "//RAD_CUSTOMER").length != 0) {
        if (selectNodes(correctedDom, "//RAD_CUSTOMER")[0].childNodes.length == 0) {
            selectNodes(correctedDom, "//RAD_FUNCTIONS")[0].removeChild(selectNodes(correctedDom, "//RAD_CUSTOMER")[0]);
            selectNodes(workDom, "//RAD_FUNCTIONS")[0].removeChild(selectNodes(workDom, "//RAD_CUSTOMER")[0]);
        }
    }
    if (getNodeText(selectSingleNode(correctedDom, "//RAD_FUNCTIONS/TEMP_CORRECTION_DONE")) == 'N') {
        var kernelnode = selectNodes(workDom, "//RAD_FUNCTIONS/RAD_KERNEL");
        var clusternode = selectNodes(workDom, "//RAD_FUNCTIONS/RAD_CLUSTER");
        var customnode = selectNodes(workDom, "//RAD_FUNCTIONS/RAD_CUSTOM");
        var customernode = selectNodes(workDom, "//RAD_FUNCTIONS/RAD_CUSTOMER");
        var childkernelnode = selectNodes(workDom, "//RAD_FUNCTIONS/RAD_CHILD_KERNEL");
        var childclusternode = selectNodes(workDom, "//RAD_FUNCTIONS/RAD_CHILD_CLUSTER");
        var childcustomnode = selectNodes(workDom, "//RAD_FUNCTIONS/RAD_CHILD_CUSTOM");
        var childcustomernode = selectNodes(workDom, "//RAD_FUNCTIONS/RAD_CHILD_CUSTOMER");
        var scrchildkernelnode = selectNodes(workDom, "//RAD_FUNCTIONS/RAD_SCRCHLD_KERNEL");
        var scrchildclusternode = selectNodes(workDom, "//RAD_FUNCTIONS/RAD_SCRCHLD_CLUSTER");
        var scrchildcustomnode = selectNodes(workDom, "//RAD_FUNCTIONS/RAD_SCRCHLD_CUSTOM");
        var scrchildcustomernode = selectNodes(workDom, "//RAD_FUNCTIONS/RAD_SCRCHLD_CUSTOMER");
        if (kernelnode.length == 0) {
            newl = traildom.createElement("RAD_KERNEL");
            head = selectNodes(workDom, "//RAD_FUNCTIONS")[0];
            head.appendChild(newl);
            newl = traildom.createElement("RAD_SCREENS");
            head = selectNodes(workDom, "//RAD_FUNCTIONS/RAD_KERNEL")[0];
            head.appendChild(newl);
            newl = traildom.createElement("RAD_FIELDSETS");
            head = selectNodes(workDom, "//RAD_FUNCTIONS/RAD_KERNEL")[0];
            head.appendChild(newl);
        }
        if (clusternode.length != 0) {
            fnCompareScrs("RAD_KERNEL", "RAD_CLUSTER");
            fnCompareFieldsets("RAD_KERNEL", "RAD_CLUSTER");
            fnCompareCustomAttr("RAD_KERNEL", "RAD_CLUSTER");
            domxml = childOnBase("RAD_CLUSTER", workDom);
            workDom = loadXMLDoc(getXMLString(domxml).toString());
        }

        if (customnode.length != 0) {
            fnCompareScrs("RAD_KERNEL", "RAD_CUSTOM");
            fnCompareFieldsets("RAD_KERNEL", "RAD_CUSTOM");
            fnCompareCustomAttr("RAD_KERNEL", "RAD_CUSTOM");
            domxml = childOnBase("RAD_CUSTOM", workDom);
            workDom = loadXMLDoc(getXMLString(domxml).toString());
        }
        if (customernode.length != 0) {
            fnCompareScrs("RAD_KERNEL", "RAD_CUSTOMER");
            fnCompareFieldsets("RAD_KERNEL", "RAD_CUSTOMER");
            fnCompareCustomAttr("RAD_KERNEL", "RAD_CUSTOMER");
            domxml = childOnBase("RAD_CUSTOMER", workDom);
            workDom = loadXMLDoc(getXMLString(domxml).toString());
        }
        if (childkernelnode.length != 0) {
            fnCompareScrs("RAD_KERNEL", "RAD_CHILD_KERNEL");
            fnCompareFieldsets("RAD_KERNEL", "RAD_CHILD_KERNEL");
            fnCompareCustomAttr("RAD_KERNEL", "RAD_CHILD_KERNEL");
            domxml = childOnBase("RAD_CHILD_KERNEL", workDom);
            workDom = loadXMLDoc(getXMLString(domxml).toString());
        }
        if (childclusternode.length != 0) {
            fnCompareScrs("RAD_KERNEL", "RAD_CHILD_CLUSTER");
            fnCompareFieldsets("RAD_KERNEL", "RAD_CHILD_CLUSTER");
            fnCompareCustomAttr("RAD_KERNEL", "RAD_CHILD_CLUSTER");
            domxml = childOnBase("RAD_CHILD_CLUSTER", workDom);
            workDom = loadXMLDoc(getXMLString(domxml).toString());
        }
        if (childcustomnode.length != 0) {
            fnCompareScrs("RAD_KERNEL", "RAD_CHILD_CUSTOM");
            fnCompareFieldsets("RAD_KERNEL", "RAD_CHILD_CUSTOM");
            fnCompareCustomAttr("RAD_KERNEL", "RAD_CHILD_CUSTOM");
            domxml = childOnBase("RAD_CHILD_CUSTOM", workDom);
            workDom = loadXMLDoc(getXMLString(domxml).toString());
        }
        if (childcustomernode.length != 0) {
            fnCompareScrs("RAD_KERNEL", "RAD_CHILD_CUSTOMER");
            fnCompareFieldsets("RAD_KERNEL", "RAD_CHILD_CUSTOMER");
            fnCompareCustomAttr("RAD_KERNEL", "RAD_CHILD_CUSTOMER");
            domxml = childOnBase("RAD_CHILD_CUSTOMER", workDom);
            workDom = loadXMLDoc(getXMLString(domxml).toString());
        }
        if (scrchildkernelnode.length != 0) {
            fnCompareScrs("RAD_KERNEL", "RAD_SCRCHLD_KERNEL");
            fnCompareFieldsets("RAD_KERNEL", "RAD_SCRCHLD_KERNEL");
            fnCompareCustomAttr("RAD_KERNEL", "RAD_SCRCHLD_KERNEL");
            domxml = childOnBase("RAD_SCRCHLD_KERNEL", workDom);
            workDom = loadXMLDoc(getXMLString(domxml).toString());
        }
        if (scrchildclusternode.length != 0) {
            fnCompareScrs("RAD_KERNEL", "RAD_SCRCHLD_CLUSTER");
            fnCompareFieldsets("RAD_KERNEL", "RAD_SCRCHLD_CLUSTER");
            fnCompareCustomAttr("RAD_KERNEL", "RAD_SCRCHLD_CLUSTER");
            domxml = childOnBase("RAD_SCRCHLD_CLUSTER", workDom);
            workDom = loadXMLDoc(getXMLString(domxml).toString());
        }
        if (scrchildcustomnode.length != 0) {
            fnCompareScrs("RAD_KERNEL", "RAD_SCRCHLD_CUSTOM");
            fnCompareFieldsets("RAD_KERNEL", "RAD_SCRCHLD_CUSTOM");
            fnCompareCustomAttr("RAD_KERNEL", "RAD_SCRCHLD_CUSTOM");
            domxml = childOnBase("RAD_SCRCHLD_CUSTOM", workDom);
            workDom = loadXMLDoc(getXMLString(domxml).toString());
        }
        if (scrchildcustomernode.length != 0) {
            fnCompareScrs("RAD_KERNEL", "RAD_SCRCHLD_CUSTOMER");
            fnCompareFieldsets("RAD_KERNEL", "RAD_SCRCHLD_CUSTOMER");
            fnCompareCustomAttr("RAD_KERNEL", "RAD_SCRCHLD_CUSTOMER");
        }
        correctedDom = fnMiscTempCorrection(correctedDom);
        setNodeText(selectSingleNode(correctedDom, "//RAD_FUNCTIONS/TEMP_CORRECTION_DONE"), 'Y');
    }
    return correctedDom;
}

function fnCompareScrs(basenode, childnode) {
    //removing screen portion from CorrectedDom 
    var correctNodes = selectNodes(correctedDom, "//" + childnode + "/RAD_SCREENS");
    for (var i = 0;i < correctNodes.length;i++) {
        correctNodes[i].parentNode.removeChild(correctNodes[i]);
    }
    var childscr = selectNodes(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS");
    for (i = 0;i < childscr.length;i++) {
        var scrName = getNodeText(selectSingleNode(childscr[i], "SCREEN_NAME"));
        var basescr = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
        if (basescr != null) {
            var diffscrs = fnCompNodes(basescr, childscr[i], "RAD_SCREENS");
            if (diffscrs == "1") {
                //add screen header to the node			
                fnaddScreen(childscr[i], scrName, childnode);
                //For SCREEN_ARGS 
                fnCompScrargs(childscr[i], scrName, basenode, childnode);
                //For HEADER
                fnCompTabs(scrName, basenode, childnode, "HEADER");
                //For RAD_BODY
                fnCompTabs(scrName, basenode, childnode, "BODY");
                //For RAD_FOOTER
                fnCompTabs(scrName, basenode, childnode, "FOOTER");
            }
            if (diffscrs == "3") {
                //For SCREEN_ARGS 
                fnCompScrargs(childscr[i], scrName, basenode, childnode);
                //For HEADER
                fnCompTabs(scrName, basenode, childnode, "HEADER");
                //For RAD_BODY
                fnCompTabs(scrName, basenode, childnode, "BODY");
                //For RAD_FOOTER
                fnCompTabs(scrName, basenode, childnode, "FOOTER");
            }
        }
        else {
            //whole node added in the child node 
            head = selectSingleNode(correctedDom, "//" + childnode);
            head.appendChild(fnImportNode(correctedDom, childscr[i]));
        }
    }
    //comparing base with child   
    var childscr = selectNodes(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_SCREENS");
    for (i = 0;i < childscr.length;i++) {
        var scrName = getNodeText(selectSingleNode(childscr[i], "SCREEN_NAME"));
        var basescr = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
        if (basescr == null) {
            fnaddScreen(childscr[i], scrName, childnode);
            setNodeText(selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_VISIBLE"), 'N');
        }
    }
}

function fnCompScrargs(scrNode, scrName, basenode, childnode) {
    var childscrargs = selectNodes(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS");
    for (var k = 0;k < childscrargs.length;k++) {
        var scrarg = getNodeText(selectSingleNode(childscrargs[k], "SCREEN_ARG_NAME"));
        var basescrargs = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS[SCREEN_ARG_NAME='" + scrarg + "']");
        if (basescrargs != null) {
            var diffscrargs = fnCompNodes(basescrargs, childscrargs[k], "SCREEN_ARGS");
            if (diffscrargs == "1") {
                fnaddScreen(scrNode, scrName, childnode);
                x = selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
                x.appendChild(fnImportNode(correctedDom, childscrargs[k]));
            }
        }
        else {
            fnaddScreen(scrNode, scrName, childnode);
            x = selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
            x.appendChild(fnImportNode(correctedDom, childscrargs[k]));
        }
    }
    //base with child
    var childscrargs = selectNodes(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS");
    for (var k = 0;k < childscrargs.length;k++) {
        var scrarg = getNodeText(selectSingleNode(childscrargs[k], "SCREEN_ARG_NAME"));
        var basescrargs = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS[SCREEN_ARG_NAME='" + scrarg + "']");
        if (basescrargs == null) {
            fnaddScreen(scrNode, scrName, childnode);
            x = selectSingleNode(correctedDom, "//" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
            x.appendChild(fnImportNode(correctedDom, childscrargs[k]));
            setNodeText(selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS[SCREEN_ARG_NAME='" + scrarg + "']/ACTIVE"), 'N');
        }
    }
}

function fnCompTabs(scrName, basenode, childnode, scrnode) {
    var scr = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
    var childheader = selectNodes(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode);
    for (var k = 0;k < childheader.length;k++) {
        //RAD_TABS				   
        var childtabs = selectNodes(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS");
        for (var l = 0;l < childtabs.length;l++) {
            var scrtab = getNodeText(selectSingleNode(childtabs[l], "TAB_NAME"));
            var basescrtabs = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']");
            if (basescrtabs != null) {
                var diffscrtabs = fnCompNodes(basescrtabs, childtabs[l], "RAD_TABS");
                if (diffscrtabs == "1") {
                    fnaddScreen(scr, scrName, childnode);
                    fnaddTabHeader(childtabs[l], scrtab, scrName, scrnode, childnode);
                    // RAD_SECTIONS 						   
                    var childsection = selectNodes(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS");
                    for (var m = 0;m < childsection.length;m++) {
                        var section = getNodeText(selectSingleNode(childsection[m], "SECTION_NAME"));

                        var basesection = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']");
                        if (basesection != null) {
                            var diffsections = fnCompNodes(basesection, childsection[m], "RAD_SECTIONS");
                            if (diffsections == "1") {
                                fnaddTabSec(childsection[m], section, scrtab, scrName, scrnode, childnode);
                            }
                            if (diffsections == "3") {
                                //RAD_PARTITION						  
                                var childpartition = selectNodes(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/RAD_PARTITIONS");
                                for (var n = 0;n < childpartition.length;n++) {
                                    var partition = getNodeText(selectSingleNode(childpartition[n], "PARTITION_NAME"));
                                    var basepartition = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/RAD_PARTITIONS[PARTITION_NAME='" + partition + "']");
                                    if (basepartition != null) {
                                        var diffpartitions = fnCompNodes(basepartition, childpartition[n], "RAD_PARTITIONS");
                                        if (diffpartitions == "1") {
                                            fnaddTabSec(childsection[m], section, scrtab, scrName, scrnode, childnode);
                                        }
                                    }
                                    else {
                                        fnaddTabSec(childsection[m], section, scrtab, scrName, scrnode, childnode);
                                    }
                                }
                            }
                        }
                        else {
                            fnaddTabSec(childsection[m], section, scrtab, scrName, scrnode, childnode);
                        }
                    }
                }
                if (diffscrtabs == "3") {
                    // RAD_SECTIONS 						   
                    var childsection = selectNodes(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS");
                    for (var m = 0;m < childsection.length;m++) {
                        var section = getNodeText(selectSingleNode(childsection[m], "SECTION_NAME"));
                        var basesection = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']");
                        if (basesection != null) {
                            var diffsections = fnCompNodes(basesection, childsection[m], "RAD_SECTIONS");
                            if (diffsections == "1") {
                                fnaddScreen(scr, scrName, childnode);
                                fnaddTabHeader(childtabs[l], scrtab, scrName, scrnode, childnode);
                                fnaddTabSec(childsection[m], section, scrtab, scrName, scrnode, childnode);
                            }
                            if (diffsections == "3") {
                                //RAD_PARTITION						  
                                var childpartition = selectNodes(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/RAD_PARTITIONS");
                                for (var n = 0;n < childpartition.length;n++) {
                                    var partition = getNodeText(selectSingleNode(childpartition[n], "PARTITION_NAME"));
                                    var basepartition = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/RAD_PARTITIONS[PARTITION_NAME='" + partition + "']");
                                    if (basepartition != null) {
                                        var diffpartitions = fnCompNodes(basepartition, childpartition[n], "RAD_PARTITIONS");
                                        if (diffpartitions == "1") {
                                            fnaddScreen(scr, scrName, childnode);
                                            fnaddTabHeader(childtabs[l], scrtab, scrName, scrnode, childnode);
                                            fnaddTabSec(childsection[m], section, scrtab, scrName, scrnode, childnode);
                                        }
                                    }
                                    else {
                                        fnaddScreen(scr, scrName, childnode);
                                        fnaddTabHeader(childtabs[l], scrtab, scrName, scrnode, childnode);
                                        fnaddTabSec(childsection[m], section, scrtab, scrName, scrnode, childnode);
                                    }
                                }
                            }
                        }
                        else {
                            fnaddScreen(scr, scrName, childnode);
                            fnaddTabHeader(childtabs[l], scrtab, scrName, scrnode, childnode);
                            fnaddTabSec(childsection[m], section, scrtab, scrName, scrnode, childnode);
                        }
                    }
                }
            }
            else {
                fnaddScreen(scr, scrName, childnode);
                fnaddTab(childtabs[l], scrtab, scrName, scrnode, childnode);
            }
        }
    }
    //compare base with child
    var scr = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
    var childheader = selectNodes(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode);
    for (var k = 0;k < childheader.length;k++) {
        //RAD_TABS				   
        var childtabs = selectNodes(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS");
        for (var l = 0;l < childtabs.length;l++) {
            var scrtab = getNodeText(selectSingleNode(childtabs[l], "TAB_NAME"));
            var basescrtabs = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']");
            if (basescrtabs == null) {
                fnaddScreen(scr, scrName, childnode);
                fnaddTabHeader(childtabs[l], scrtab, scrName, scrnode, childnode);
                setNodeText(selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/TAB_VISIBLE"), 'N');
            }
            else {
                var childsection = selectNodes(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS");
                for (var m = 0;m < childsection.length;m++) {
                    var section = getNodeText(selectSingleNode(childsection[m], "SECTION_NAME"));
                    var basesection = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']");
                    if (basesection == null) {
                        fnaddScreen(scr, scrName, childnode);
                        fnaddTabHeader(childtabs[l], scrtab, scrName, scrnode, childnode);
                        fnaddTabSec(childsection[m], section, scrtab, scrName, scrnode, childnode);
                        setNodeText(selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/SEC_VISIBLE"), 'N');
                    }
                    else {
                        var childpartition = selectNodes(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/RAD_PARTITIONS");
                        for (var n = 0;n < childpartition.length;n++) {
                            var partition = getNodeText(selectSingleNode(childpartition[n], "PARTITION_NAME"));
                            var basepartition = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrtab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']/RAD_PARTITIONS[PARTITION_NAME='" + partition + "']");
                            if (basepartition == null) {
                                // to be revisited
                            }
                        }
                    }
                }
            }
        }
    }
}

function fnaddScreen(scr, scrName, node) {
    if (selectSingleNode(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']") == null) {
        var head = selectSingleNode(correctedDom, "//" + node);
        head.appendChild(fnImportNode(correctedDom, scr));
        var nod = selectNodes(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
        var nod = selectNodes(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/HEADER");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
        var nod = selectNodes(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/BODY");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
        var nod = selectNodes(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/FOOTER");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
    }
}

function fnaddTab(scr, scrTab, scrName, scrnode, node) {
    if (selectSingleNode(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode) == null) {
        var scrdom = "";
        scrdom.async = false;
        scrdom.resolveExternals = false;
        scrdom = "<?xml version='1.0' encoding='UTF-8'?>";
        scrdom = loadXMLDoc(scrdom);
        newl = scrdom.createElement(scrnode);
        head = selectNodes(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']")[0];
        newl.setAttribute("ID", scrnode);
        head.appendChild(newl);

    }
    if (selectSingleNode(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[NAME='" + scrTab + "']") == null) {
        x = selectSingleNode(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode);
        x.appendChild(fnImportNode(correctedDom, scr));
    }
}

function fnaddTabHeader(scr, scrTab, scrName, scrnode, node) {
    if (selectSingleNode(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode) == null) {
        var scrdom = "";
        scrdom.async = false;
        scrdom.resolveExternals = false;
        scrdom = "<?xml version='1.0' encoding='UTF-8'?>";
        scrdom = loadXMLDoc(scrdom);
        newl = scrdom.createElement(scrnode);
        head = selectSingleNode(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
        newl.setAttribute("ID", scrnode);
        head.appendChild(newl);
    }
    if (selectSingleNode(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[NAME='" + scrTab + "']") == null) {
        x = selectSingleNode(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode);
        x.appendChild(fnImportNode(correctedDom, scr));
        var nod = selectNodes(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrTab + "']/RAD_SECTIONS");
        for (var p = 0;p < nod.length;p++) {
            nod[p].parentNode.removeChild(nod[p]);
        }
    }
}

function fnaddTabSec(scr, section, scrTab, scrName, scrnode, node) {
    var section = getNodeText(selectSingleNode(scr, "SECTION_NAME"));
    if (selectSingleNode(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrTab + "']/RAD_SECTIONS[SECTION_NAME='" + section + "']") == null) {
        x = selectSingleNode(correctedDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrnode + "/RAD_TABS[TAB_NAME='" + scrTab + "']");
        x.appendChild(fnImportNode(correctedDom, scr));
    }
}

function fnCompareFieldsets(basenode, childnode) {
    //removing screen portion from CorrectedDom 
    var correctNodes = selectNodes(correctedDom, "//" + childnode + "/RAD_FIELDSETS");
    for (var i = 0;i < correctNodes.length;i++) {
        correctNodes[i].parentNode.removeChild(correctNodes[i]);
    }
    var childfldset = selectNodes(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS");
    for (i = 0;i < childfldset.length;i++) {
        var fldsetname = getNodeText(selectSingleNode(childfldset[i], "FIELDSET_NAME"));
        var basefldset = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
        if (basefldset != null) {
            var diffldsets = fnCompNodes(basefldset, childfldset[i], "RAD_FIELDSETS");
            if (diffldsets == "1") {
                if (selectSingleNode(correctedDom, "//" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']") == null) {
                    head = selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode);
                    head.appendChild(fnImportNode(correctedDom, childfldset[i]));
                    var nod = selectNodes(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                    for (var p = 0;p < nod.length;p++) {
                        nod[p].parentNode.removeChild(nod[p]);
                    }
                }
                //FIELDSET_FIELDS			
                var childfldsetflds = selectNodes(childfldset[i], "//" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                for (var k = 0;k < childfldsetflds.length;k++) {
                    var fldsetfld = getNodeText(selectSingleNode(childfldsetflds[k], "FIELD_NAME"));
                    var basefldsetfld = selectSingleNode(basefldset, "//" + basenode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS[FIELD_NAME='" + fldsetfld + "']");
                    if (basefldsetfld != null) {
                        var diffldsetfld = fnCompNodes(basefldsetfld, childfldsetflds[k], "FIELDSET_FIELDS");
                        if (diffldsetfld == "1") {
                            x = selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
                            x.appendChild(fnImportNode(correctedDom, childfldsetflds[k]));
                        }
                    }
                    else {
                        x = selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
                        x.appendChild(fnImportNode(correctedDom, childfldsetflds[k]));
                    }
                }
            }
            if (diffldsets == "3") {
                //FIELDSET_FIELDS			
                var childfldsetflds = selectNodes(childfldset[i], "//" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                for (var k = 0;k < childfldsetflds.length;k++) {
                    var fldsetfld = getNodeText(selectSingleNode(childfldsetflds[k], "FIELD_NAME"));
                    var basefldsetfld = selectSingleNode(basefldset, "//" + basenode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS[FIELD_NAME='" + fldsetfld + "']");
                    if (basefldsetfld != null) {
                        var diffldsetfld = fnCompNodes(basefldsetfld, childfldsetflds[k], "FIELDSET_FIELDS");
                        if (diffldsetfld == "1") {
                            if (selectSingleNode(correctedDom, "//" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']") == null) {
                                head = selectSingleNode(correctedDom, "//" + childnode);
                                head.appendChild(fnImportNode(correctedDom, childfldset[i]));
                                var nod = selectNodes(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                                for (var p = 0;p < nod.length;p++) {
                                    nod[p].parentNode.removeChild(nod[p]);
                                }
                            }
                            x = selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
                            x.appendChild(fnImportNode(correctedDom, childfldsetflds[k]));
                        }
                    }
                    else {
                        if (selectSingleNode(correctedDom, "//" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']") == null) {
                            head = selectSingleNode(correctedDom, "//" + childnode);
                            head.appendChild(fnImportNode(correctedDom, childfldset[i]));
                            var nod = selectNodes(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        x = selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
                        x.appendChild(fnImportNode(correctedDom, childfldsetflds[k]));
                    }
                }
            }
            if (diffldsets == "2") {
                if (selectSingleNode(correctedDom, "//" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']") == null) {
                    head = selectSingleNode(correctedDom, "//" + childnode);
                    head.appendChild(fnImportNode(correctedDom, basefldset));
                    var nod = selectNodes(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                    for (var p = 0;p < nod.length;p++) {
                        nod[p].parentNode.removeChild(nod[p]);
                    }
                }
                setNodeText(selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_VISIBLE"), 'N');
                var cnt = 1;
                var exitFlag = false;
                var newFieldset = fldsetname + "__1";
                var existingFieldsets = selectNodes(workDom, "//RAD_KERNEL/RAD_FIELDSETS");
                while (!exitFlag) {
                    for (var ex = 0;ex < existingFieldsets.length;ex++) {
                        exitFlag = true;
                        if (getNodeText(selectSingleNode(existingFieldsets[ex], "FIELDSET_NAME")) == newFieldset) {
                            cnt = parseInt(cnt) + 1;
                            newFieldset = fldsetname + "__" + cnt;
                            exitFlag = false;
                            break;
                        }
                    }
                }
                var tempdom = loadXMLDoc(getXMLString(childfldset[i]).toString());
                tempdom.setAttribute("ID", newFieldset);
                setNodeText(selectSingleNode(tempdom, "FIELDSET_NAME"), newFieldset);
                setNodeText(selectSingleNode(tempdom, "FIELDSET_VISIBLE"), 'Y');
                head = selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode);
                head.appendChild(fnImportNode(correctedDom, tempdom));
            }
        }
        else {
            if (selectSingleNode(correctedDom, "//" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']") == null) {
                head = selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode);
                head.appendChild(fnImportNode(correctedDom, childfldset[i]));
            }
        }
    }
    //comparing base with child
    var childfldset = selectNodes(workDom, "//RAD_FUNCTIONS/" + basenode + "/RAD_FIELDSETS");
    for (i = 0;i < childfldset.length;i++) {
        var fldsetname = getNodeText(selectSingleNode(childfldset[i], "FIELDSET_NAME"));
        var basefldset = selectSingleNode(workDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
        if (basefldset == null) {
            if (selectSingleNode(correctedDom, "//" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']") == null) {
                head = selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode);
                head.appendChild(fnImportNode(correctedDom, childfldset[i]));
                var nod = selectNodes(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                for (var p = 0;p < nod.length;p++) {
                    nod[p].parentNode.removeChild(nod[p]);
                }
            }
            setNodeText(selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_VISIBLE"), 'N');
        }
        else {
            var diffldsets = fnCompNodes(basefldset, childfldset[i], "RAD_FIELDSETS");
            if (diffldsets != 2) {
                var childfldsetflds = selectNodes(childfldset[i], "//" + basenode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                for (var k = 0;k < childfldsetflds.length;k++) {
                    var fldsetfld = getNodeText(selectSingleNode(childfldsetflds[k], "FIELD_NAME"));
                    var basefldsetfld = selectSingleNode(basefldset, "//" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS[FIELD_NAME='" + fldsetfld + "']");
                    if (basefldsetfld == null) {
                        if (selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']") == null) {
                            head = selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode);
                            head.appendChild(fnImportNode(correctedDom, childfldset[i]));
                            var nod = selectNodes(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
                            for (var p = 0;p < nod.length;p++) {
                                nod[p].parentNode.removeChild(nod[p]);
                            }
                        }
                        head = selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "//RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
                        head.appendChild(fnImportNode(correctedDom, childfldsetflds[k]));
                        setNodeText(selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS[FIELD_NAME='" + fldsetfld + "']/ACTIVE"), 'N');
                    }
                }
            }
        }
    }
}

function fnCompareCustomAttr(basenode, childnode) {
    var basedisptype = "";
    //removing RAD_CUST_ATTR from CorrectedDom 
    var correctNodes = selectNodes(correctedDom, "//" + childnode + "/RAD_DATA_BLOCKS/RAD_BLK_FIELDS/RAD_FIELD_CUSTOM_ATTRS");
    for (var i = 0;i < correctNodes.length;i++) {
        correctNodes[i].parentNode.removeChild(correctNodes[i]);
    }
    //comparing child with base
    var childblkNodes = selectNodes(workDom, "//" + childnode + "/RAD_DATA_BLOCKS");
    for (var bkn = 0;bkn < childblkNodes.length;bkn++) {
        var blkName = getNodeText(selectSingleNode(childblkNodes[bkn], "BLOCK_NAME"));
        var childblkflds = selectNodes(childblkNodes[bkn], "//" + childnode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[DISPLAY_TYPE='SELECT' or DISPLAY_TYPE='RADIO' or DISPLAY_TYPE='ROSELECT']");
        for (var bkf = 0;bkf < childblkflds.length;bkf++) {
            var fieldName = getNodeText(selectSingleNode(childblkflds[bkf], 'FIELD_NAME'));
            var childdisptype = getNodeText(selectSingleNode(workDom, "//" + childnode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']/DISPLAY_TYPE"));
            if (selectSingleNode(workDom, "//" + basenode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']") != null) {
                basedisptype = getNodeText(selectSingleNode(workDom, "//" + basenode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']/DISPLAY_TYPE"));
            }
            if (childdisptype == basedisptype) {
                var childcustattr = selectNodes(childblkflds[bkf], "//" + childnode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']/RAD_FIELD_CUSTOM_ATTRS");
                for (var i = 0;i < childcustattr.length;i++) {
                    var attrName = getNodeText(selectSingleNode(childcustattr[i], 'ATTR_NAME'));
                    if (attrName != "" && attrName != null) {
                        var basecustattr = selectSingleNode(workDom, "//" + basenode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME='" + attrName + "']");
                        if (basecustattr != null) {
                            var diffdatascrs = fnCompNodes(basecustattr, childcustattr[i], "RAD_FIELD_CUSTOM_ATTRS");
                            if (diffdatascrs == "1") {
                                x = selectSingleNode(correctedDom, "//" + childnode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']");
                                x.appendChild(fnImportNode(correctedDom, childcustattr[i]));
                            }
                        }
                        else {
                            x = selectSingleNode(correctedDom, "//" + childnode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']");
                            x.appendChild(fnImportNode(correctedDom, childcustattr[i]));
                        }
                    }
                }
            }
            else {
                x = selectSingleNode(correctedDom, "//" + childnode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']");
                var childcustattr = selectNodes(childblkflds[bkf], "//" + childnode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']/RAD_FIELD_CUSTOM_ATTRS");
                for (var app = 0;app < childcustattr.length;app++) {
                    x.appendChild(fnImportNode(correctedDom, childcustattr[app]));
                }
            }
        }
    }
    //comparing base with child
    var childblkNodes = selectNodes(workDom, "//" + basenode + "/RAD_DATA_BLOCKS");
    for (var bkn = 0;bkn < childblkNodes.length;bkn++) {
        var blkName = getNodeText(selectSingleNode(childblkNodes[bkn], "BLOCK_NAME"));
        var childblkflds = selectNodes(childblkNodes[bkn], "//" + basenode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[DISPLAY_TYPE='SELECT' or DISPLAY_TYPE='RADIO' or DISPLAY_TYPE='CHECKBOX']");
        if (selectSingleNode(workDom, "//" + childnode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']") != null) {
            for (var bkf = 0;bkf < childblkflds.length;bkf++) {
                var fieldName = getNodeText(selectSingleNode(childblkflds[bkf], 'FIELD_NAME'));
                if (selectSingleNode(workDom, "//" + childnode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']") != null) {
                    var childdisptype = getNodeText(selectSingleNode(workDom, "//" + childnode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']/DISPLAY_TYPE"));
                    var basedisptype = getNodeText(selectSingleNode(workDom, "//" + basenode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']/DISPLAY_TYPE"));
                    if ((childdisptype == basedisptype) || (childdisptype == 'RADIO' && basedisptype == 'SELECT') || (childdisptype == 'SELECT' && basedisptype == 'RADIO')) {
                        var childcustattr = selectNodes(childblkflds[bkf], "//" + basenode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']/RAD_FIELD_CUSTOM_ATTRS");
                        for (var i = 0;i < childcustattr.length;i++) {
                            var attrName = getNodeText(selectSingleNode(childcustattr[i], 'ATTR_NAME'));
                            if (attrName != "" && attrName != null) {
                                var basecustattr = selectSingleNode(workDom, "//" + childnode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME='" + attrName + "']");
                                if (basecustattr == null) {
                                    //check whether display type is changed 
                                    // to be coded 				   
                                    x = selectSingleNode(correctedDom, "//" + childnode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']");
                                    x.appendChild(fnImportNode(correctedDom, childcustattr[i]));
                                    setNodeText(selectSingleNode(correctedDom, "//RAD_FUNCTIONS/" + childnode + "/RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME='" + attrName + "']/ACTIVE"), 'N');
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function fnCompNodes(base, cons, node) {
    var elelen = new Array();
    elelen = elementArray[node].split("~");
    var nonCompareArray = nodeNonCompareArray[node];
    var tempcorrectionArray = TempCorrectionArray[node];
    var addedTagPresent = 0;
    for (j = 0;j < elelen.length;j++) {
        if (selectSingleNode(cons, elelen[j]) != null && selectSingleNode(base, elelen[j]) != null) {
            if (nonCompareArray) {
                if (nonCompareArray.indexOf(elelen[j]) ==  - 1) {
                    if (getNodeText(selectSingleNode(cons, elelen[j])) != getNodeText(selectSingleNode(base, elelen[j]))) {
                        if (tempcorrectionArray) {
                            if (tempcorrectionArray.indexOf(elelen[j]) ==  - 1) {
                                return 1;
                            }
                            else {
                                return 2;
                            }
                        }
                        else {
                            return 1;
                        }
                    }
                }
            }
            else {
                if (getNodeText(selectSingleNode(cons, elelen[j])) != getNodeText(selectSingleNode(base, elelen[j]))) {
                    if (tempcorrectionArray) {
                        if (tempcorrectionArray.indexOf(elelen[j]) ==  - 1) {
                            return 1;
                        }
                        else {
                            return 2;
                        }
                    }
                    else {
                        return 1;
                    }

                }
            }
        }
    }
    return 3;
}

function childOnBase(node, myDom) {
    newDom = myDom;
    AssignOnKernel("RAD_SCREENS", node, newDom);
    AssignOnKernel("RAD_FIELDSETS", node, newDom);
    AssignOnKernel("RAD_DATA_BLOCKS", node, newDom);
    return newDom;
}

function fnMiscTempCorrection(NewDOM) {
    NewDOM = fnprocessTempCorrection(NewDOM, "RAD_KERNEL");
    NewDOM = fnprocessTempCorrection(NewDOM, "RAD_CLUSTER");
    NewDOM = fnprocessTempCorrection(NewDOM, "RAD_CUSTOM");
    NewDOM = fnprocessTempCorrection(NewDOM, "RAD_CUSTOMER");
    NewDOM = fnprocessTempCorrection(NewDOM, "RAD_CHILD_KERNEL");
    NewDOM = fnprocessTempCorrection(NewDOM, "RAD_CHILD_CLUSTER");
    NewDOM = fnprocessTempCorrection(NewDOM, "RAD_CHILD_CUSTOM");
    NewDOM = fnprocessTempCorrection(NewDOM, "RAD_CHILD_CUSTOMER");
    NewDOM = fnprocessTempCorrection(NewDOM, "RAD_SCRCHLD_KERNEL");
    NewDOM = fnprocessTempCorrection(NewDOM, "RAD_SCRCHLD_CLUSTER");
    NewDOM = fnprocessTempCorrection(NewDOM, "RAD_SCRCHLD_CUSTOM");
    NewDOM = fnprocessTempCorrection(NewDOM, "RAD_SCRCHLD_CUSTOMER");
    return NewDOM;
}

function fnprocessTempCorrection(NewDOM, mainNode) {
    if (selectSingleNode(NewDOM, "//" + mainNode) != null) {
        if (selectNodes(NewDOM, "//" + mainNode + "/RAD_DATA_BLOCKS").length > 0) {
            if (selectNodes(NewDOM, "//" + mainNode + "/RAD_DATA_BLOCKS/RAD_BLK_FIELDS").length > 0) {
                var btnNodes = selectNodes(NewDOM, "//" + mainNode + "/RAD_DATA_BLOCKS/RAD_BLK_FIELDS[DISPLAY_TYPE='BUTTON']");
                for (var i = 0;i < btnNodes.length;i++) {
                    var normalbtn = selectNodes(btnNodes[i], "RAD_FIELD_EVENTS[EVENTTYPE='NORMAL']").length;
                    if (normalbtn == 0) {
                        setNodeText(selectSingleNode(btnNodes[i], 'VISIBLE'), 'Y');
                    }
                }
            }
        }
    }
    return NewDOM;
}