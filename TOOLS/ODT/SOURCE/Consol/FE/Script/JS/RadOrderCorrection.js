/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadOrderCorrection.js
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
// datablock order numbers array indexed by datablock name
var dataBlkOrder = new Array();
var dblklength = "0";
// datablock field name and order numbers arrays indexed by datablock_name
//var blkFldOrder = new Array();
//var blkFldOrderNo = new Array();
//
//// Custom Attr order numbers arrays indexed by datablock_name
//var blkFldAttrOrder = new Array();
//var blkFldAttrOrderNo = new Array();

// tabnames and order nos arrays (indexed by screen_section)
var scrTabOrder = new Array();
var scrTabOrderNo = new Array();

// section name and order numbers arrays (indexed by screen_section_tab)
var scrSecOrder = new Array();
var scrSecOrderNo = new Array();

// partition name and order numbers arrays (indexed by screen_section_tab_section)
var scrParOrder = new Array();
var scrParOrderNo = new Array();

// filedset order number arrays indexed by fieldset name 
var fldsetNameOrder = new Array();
var fstslength = "0";
// fieldsetfield names and order nos populated in 2 arrays(indexed by fieldset name)
var fldsetOrder = new Array();
var fldsetOrderNo = new Array();
var RelNodes = "RAD_KERNEL~RAD_CLUSTER~RAD_CUSTOM~RAD_CUSTOMER~RAD_CHILD_KERNEL~RAD_CHILD_CLUSTER~RAD_CHILD_CUSTOM~RAD_CHILD_CUSTOMER~RAD_SCRCHLD_KERNEL~RAD_SCRCHLD_CLUSTER~RAD_SCRCHLD_CUSTOM~RAD_SCRCHLD_CUSTOMER".split("~");

function fnOrderCorrection(OriginalDom) {
    debug('In fnOrderCorrection to keep the fields in proper order');
    var domxml;
    var traildom = "";
    traildom.async = false;
    traildom.resolveExternals = false;
    traildom = "<?xml version='1.0' encoding='UTF-8'?>";
    traildom = loadXMLDoc(traildom);
    //resetting all array variables
    dataBlkOrder = new Array();
    dblklength = "0";

    blkFldOrder = new Array();
    blkFldOrderNo = new Array();

    blkFldAttrOrder = new Array();
    blkFldAttrOrderNo = new Array();

    scrTabOrder = new Array();
    scrTabOrderNo = new Array();

    scrSecOrder = new Array();
    scrSecOrderNo = new Array();

    scrParOrder = new Array();
    scrParOrderNo = new Array();

    fldsetNameOrder = new Array();
    fstslength = "0";

    fldsetOrder = new Array();
    fldsetOrderNo = new Array();

    fldOrderfinalDom = loadXMLDoc(getXMLString(OriginalDom).toString());
    if (selectSingleNode(fldOrderfinalDom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE") == null) {
        var orderCorrection = traildom.createElement("ORDER_CORRECTION_DONE");
        var funcNode = selectSingleNode(fldOrderfinalDom, "//RAD_FUNCTIONS");
        funcNode.insertBefore(orderCorrection, selectSingleNode(funcNode, "RAD_KERNEL"));
        setNodeText(selectSingleNode(funcNode, "ORDER_CORRECTION_DONE"), "N");

    }
    if (getNodeText(selectSingleNode(fldOrderfinalDom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE")) == "") {
        setNodeText(selectSingleNode(fldOrderfinalDom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE"), "N");
    }

    if (getNodeText(selectSingleNode(fldOrderfinalDom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE")) == 'N') {

        for (var r = 0;r < RelNodes.length;r++) {
            if (selectNodes(fldOrderfinalDom, "//RAD_FUNCTIONS/" + RelNodes[r]).length != 0) {
                fnDefaultBlkOrder("RAD_KERNEL", RelNodes[r]);
                fnDefaultTabOrder("RAD_KERNEL", RelNodes[r]);
                fnDefaultfldsetorder("RAD_KERNEL", RelNodes[r]);
                fnDefaultBlkAttr("RAD_KERNEL", RelNodes[r]);

            }
        }
    }
    if (getNodeText(selectSingleNode(fldOrderfinalDom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE")) == 'Y' || getNodeText(selectSingleNode(fldOrderfinalDom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE")) == 'R') {
        for (var r = 0;r < RelNodes.length;r++) {
            if (selectNodes(fldOrderfinalDom, "//RAD_FUNCTIONS/" + RelNodes[r]).length != 0) {
                fnDefaultBlkAttr("RAD_KERNEL", RelNodes[r]);
            }
        }
    }
    
    for (var r = 0;r < RelNodes.length;r++) {
        if (selectNodes(fldOrderfinalDom, "//RAD_FUNCTIONS/" + RelNodes[r]).length != 0) {
            fnDefaultAutoAuth("RAD_KERNEL", RelNodes[r]);
        }
    }
    
    setNodeText(selectSingleNode(fldOrderfinalDom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE"), 'D');
    return fldOrderfinalDom;
}

function FnChek_RefreshedFldSet(fldOrderfinalDom) {
    if (selectSingleNode(fldOrderfinalDom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE") != null)
        if (getNodeText(selectSingleNode(fldOrderfinalDom, "//RAD_FUNCTIONS/ORDER_CORRECTION_DONE")) == 'R') {
            for (var r = 0;r < RelNodes.length;r++) {
                for (var rj = r;rj < RelNodes.length;rj++) {
                    if (RelNodes[r] != RelNodes[rj])
                        if (selectNodes(fldOrderfinalDom, "//RAD_FUNCTIONS/" + RelNodes[r]).length != 0 && selectNodes(fldOrderfinalDom, "//RAD_FUNCTIONS/" + RelNodes[rj]).length != 0) {
                            //debugger;
                            fnSrtRefreshedOrder(RelNodes[r], RelNodes[rj], fldOrderfinalDom);
                        }
                }
            }
        }
    return fldOrderfinalDom;
}

function fnSrtRefreshedOrder(basenode, childnode, fldOrderfinalDom) {
    var fieldsets = selectNodes(fldOrderfinalDom, "//" + basenode + "/RAD_FIELDSETS");
    for (var a = 0;a < fieldsets.length;a++) {
        var fldset = getNodeText(selectSingleNode(fieldsets[a], "FIELDSET_NAME"));
        fnRefreshfldsetfldorder(basenode, childnode, fldset, fldOrderfinalDom);
    }
}

function fnRefreshfldsetfldorder(basenode, childnode, fldset, fldOrderfinalDom) {
    var fldsetfields = selectNodes(fldOrderfinalDom, "//" + basenode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_FIELDS");
    for (var k = 0;k < fldsetfields.length;k++) {
        var fldsetfld = getNodeText(selectSingleNode(fldsetfields[k], "FIELD_NAME"));
        if (getNodeText(selectSingleNode(fldsetfields[k], "ACTIVE")) == 'N') {
            setNodeText(selectSingleNode(fldsetfields[k], "FIELD_ORDER"), "0");
            /*try {//Refresh Issue Fix (FieldSets not coming as Active)
                setNodeText(selectSingleNode(selectNodes(fldOrderfinalDom, ("//" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_FIELDS[FIELD_NAME='" + fldsetfld + "']"))[0], "FIELD_ORDER"), "0");
                setNodeText(selectSingleNode(selectNodes(fldOrderfinalDom, ("//" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_FIELDS[FIELD_NAME='" + fldsetfld + "']"))[0], "ACTIVE"), "N");
            }
            catch (e) {
            }*/
        }
        else if (getNodeText(selectSingleNode(fldsetfields[k], "ACTIVE")) == 'Y') {
            try {
                var fldsetBlock = getNodeText(selectSingleNode(fldOrderfinalDom, "//" + basenode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_BLOCK"));
                if (fldsetBlock == "undefined")
                    break;
                var fldsetfld_chlds = selectNodes(fldOrderfinalDom, "//" + childnode + "/RAD_FIELDSETS");
                for (var f = 0;f < fldsetfld_chlds.length;f++) {
                    if (getNodeText(selectSingleNode(fldsetfld_chlds[f], "FIELDSET_BLOCK")) == fldsetBlock) {
                        var fldset_chl = getNodeText(selectSingleNode(fldsetfld_chlds[f], "FIELDSET_NAME"));
                        var fldsetfields_chld = selectNodes(fldOrderfinalDom, "//" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldset_chl + "']/FIELDSET_FIELDS");
                        for (var fl = 0;fl < fldsetfields_chld.length;fl++) {
                            var fldsetfld_cld = getNodeText(selectSingleNode(fldsetfields_chld[fl], "FIELD_NAME"));
                            if (fldsetfld_cld == fldsetfld) {
                                try {
                                    if (fldset == fldset_chl) {

                                        if (getNodeText(selectSingleNode(fldsetfields_chld[fl], "ACTIVE")) == "N")
                                            break;
                                    }
                                    else if (fldset != fldset_chl) {
                                        if (getNodeText(selectSingleNode(fldsetfields_chld[fl], "ACTIVE")) == "Y") {
                                            setNodeText(selectSingleNode(fldsetfields[k], "ACTIVE"), "N");
                                        }
                                    }
                                }
                                catch (e) {
                                }
                                break;
                            }
                        }
                    }
                }
            }
            catch (e) {
            }
        }
    }
}

function fnDefaultBlkOrder(basenode, childnode) {
    var dblkno = 0;
    dblkno = dblklength;
    var datablks = selectNodes(fldOrderfinalDom, "//" + childnode + "/RAD_DATA_BLOCKS");
    for (var k = 0;k < datablks.length;k++) {
        var blkName = getNodeText(selectSingleNode(datablks[k], "BLOCK_NAME"));
        if (selectSingleNode(datablks[k], "DATA_BLK_ORDER") == null) {
            var blkorder = fldOrderfinalDom.createElement("DATA_BLK_ORDER");
            datablks[k].insertBefore(blkorder, selectSingleNode(datablks[k], "RAD_BLK_FIELDS"));
        }
        if (dataBlkOrder[blkName]) {
            setNodeText(selectSingleNode(datablks[k], "DATA_BLK_ORDER"), dataBlkOrder[blkName]);
        }
        else {
            dblkno = parseInt(dblkno) + 1;
            setNodeText(selectSingleNode(datablks[k], "DATA_BLK_ORDER"), dblkno);
            dataBlkOrder[blkName] = dblkno;
        }
        fnDefaultBlkFldOrder(basenode, childnode, blkName);
    }
    dblklength = dblkno;
}

function fnDefaultBlkFldOrder(basenode, childnode, blkName) {
    var blkfldno = 0;
	var blkFldOrder = new Array();
	var blkFldOrderNo = new Array();
    var blkflds = selectNodes(fldOrderfinalDom, "//" + childnode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS");
    blkfldno = 0;
    for (var kk = 0;kk < blkflds.length;kk++) {
        var blkfldName = getNodeText(selectSingleNode(blkflds[kk], "FIELD_NAME"));
        if (selectSingleNode(blkflds[kk], "BLK_FIELD_ORDER") == null) {
            var blkfldorder = fldOrderfinalDom.createElement("BLK_FIELD_ORDER");
            blkflds[kk].insertBefore(blkfldorder, selectSingleNode(blkflds[kk], "REPORT_PARAMETER"));
        }

        if (blkFldOrder[blkName]) {
            var blkarray = blkFldOrder[blkName].split("~");
            if (blkFldOrder[blkName].indexOf(blkfldName) ==  - 1) {
                blkfldno = blkarray.length + 1;
                setNodeText(selectSingleNode(blkflds[kk], "BLK_FIELD_ORDER"), blkfldno);
                blkFldOrder[blkName] = blkFldOrder[blkName] + '~' + blkfldName;
                blkFldOrderNo[blkName] = blkFldOrderNo[blkName] + '~' + blkfldno;
            }
            else {
                var orderIndex = 
                include (blkarray, blkfldName);
                if (orderIndex == "-1") {
                    blkfldno = blkarray.length + 1;
                    setNodeText(selectSingleNode(blkflds[kk], "BLK_FIELD_ORDER"), blkfldno);
                    blkFldOrder[blkName] = blkFldOrder[blkName] + '~' + blkfldName;
                    blkFldOrderNo[blkName] = blkFldOrderNo[blkName] + '~' + blkfldno;
                }
                else {

                    var blkorderarray = String(blkFldOrderNo[blkName]).split("~");
                    var blkOrderIndex = blkorderarray[parseInt(orderIndex)];

                    setNodeText(selectSingleNode(blkflds[kk], "BLK_FIELD_ORDER"), blkOrderIndex);
                }
            }
        }
        else {
            blkfldno = parseInt(blkfldno) + 1;
            setNodeText(selectSingleNode(blkflds[kk], "BLK_FIELD_ORDER"), blkfldno);
            blkFldOrder[blkName] = blkfldName;
            blkFldOrderNo[blkName] = blkfldno;
        }

    }

}

function fnDefaultTabOrder(basenode, childnode) {
    var tabno = 0;
    var scrportion = 'HEADER~BODY~FOOTER';
    scrportion = scrportion.split("~");
    var screens = selectNodes(fldOrderfinalDom, "//" + childnode + "/RAD_SCREENS");
    for (var j = 0;j < screens.length;j++) {
        var scrname = getNodeText(selectSingleNode(screens[j], "SCREEN_NAME"));
        for (var hn = 0;hn < scrportion.length;hn++) {
            var prtn = scrportion[hn];
            var tabs = selectNodes(fldOrderfinalDom, "//" + childnode + "/RAD_SCREENS[SCREEN_NAME='" + scrname + "']/" + scrportion[hn] + "/RAD_TABS");
            tabno = 0;
            for (var k = 0;k < tabs.length;k++) {
                var tabName = getNodeText(selectSingleNode(tabs[k], "TAB_NAME"));
                if (selectSingleNode(tabs[k], "TAB_ORDER") == null) {
                    var taborder = fldOrderfinalDom.createElement("TAB_ORDER");
                    tabs[k].insertBefore(taborder, selectSingleNode(tabs[k], "RAD_SECTIONS"));
                }
                if ((getNodeText(selectSingleNode(screens[j], "SCREEN_VISIBLE")) == 'N') || (getNodeText(selectSingleNode(tabs[k], "TAB_VISIBLE")) == 'N')) {
                    setNodeText(selectSingleNode(tabs[k], "TAB_ORDER"), "0");
                }
                else {
                    if (scrTabOrder[scrname + "_" + prtn]) {
                        var scrarray = scrTabOrder[scrname + "_" + prtn].split("~");
                        if (scrTabOrder[scrname + "_" + prtn].indexOf(tabName) ==  - 1) {
                            tabno = scrarray.length + 1;
                            setNodeText(selectSingleNode(tabs[k], "TAB_ORDER"), tabno);
                            scrTabOrder[scrname + "_" + prtn] = scrTabOrder[scrname + "_" + prtn] + '~' + tabName;
                            scrTabOrderNo[scrname + "_" + prtn] = scrTabOrderNo[scrname + "_" + prtn] + '~' + tabno;
                        }
                        else {
                            var orderIndex = 
                            include (scrarray, tabName);
                            if (orderIndex == "-1") {
                                tabno = scrarray.length + 1;
                                setNodeText(selectSingleNode(tabs[k], "TAB_ORDER"), tabno);
                                scrTabOrder[scrname + "_" + prtn] = scrTabOrder[scrname + "_" + prtn] + '~' + tabName;
                                scrTabOrderNo[scrname + "_" + prtn] = scrTabOrderNo[scrname + "_" + prtn] + '~' + tabno;
                            }
                            else {
                                var scrorderarray = String(scrTabOrderNo[scrname + "_" + prtn]).split("~");
                                var tabOrderIndex = scrorderarray[parseInt(orderIndex)];
                                setNodeText(selectSingleNode(tabs[k], "TAB_ORDER"), tabOrderIndex);
                            }
                        }
                    }
                    else {
                        tabno = parseInt(tabno) + 1;
                        setNodeText(selectSingleNode(tabs[k], "TAB_ORDER"), tabno);
                        scrTabOrder[scrname + "_" + prtn] = tabName;
                        scrTabOrderNo[scrname + "_" + prtn] = tabno;
                    }
                }
                fnDefaultSecOrder(childnode, scrname, prtn, tabName);
            }
        }
    }

}

function fnDefaultSecOrder(node, scrname, portion, tabName) {
    var secno = 0;

    var sections = selectNodes(fldOrderfinalDom, "//" + node + "/RAD_SCREENS[SCREEN_NAME='" + scrname + "']/" + portion + "/RAD_TABS[TAB_NAME='" + tabName + "']/RAD_SECTIONS");
    for (var m = 0;m < sections.length;m++) {
        var secname = getNodeText(selectSingleNode(sections[m], "SECTION_NAME"));
        if (selectSingleNode(sections[m], "SEC_ORDER") == null) {
            var secorder = fldOrderfinalDom.createElement("SEC_ORDER");
            sections[m].insertBefore(secorder, selectSingleNode(sections[m], "RAD_PARTITIONS"));
        }
        if (getNodeText(selectSingleNode(sections[m], "SEC_VISIBLE")) == 'N') {
            setNodeText(selectSingleNode(sections[m], "SEC_ORDER"), "0");
        }
        else {
            if (scrSecOrder[scrname + "_" + portion + "_" + tabName]) {
                var secarray = scrSecOrder[scrname + "_" + portion + "_" + tabName].split("~");
                if (scrSecOrder[scrname + "_" + portion + "_" + tabName].indexOf(secname) ==  - 1) {
                    secno = secarray.length + 1;
                    setNodeText(selectSingleNode(sections[m], "SEC_ORDER"), secno);
                    scrSecOrder[scrname + "_" + portion + "_" + tabName] = scrSecOrder[scrname + "_" + portion + "_" + tabName] + '~' + secname;
                    scrSecOrderNo[scrname + "_" + portion + "_" + tabName] = scrSecOrderNo[scrname + "_" + portion + "_" + tabName] + '~' + secno;
                }
                else {
                    var orderIndex = 
                    include (secarray, secname);
                    if (orderIndex == "-1") {
                        secno = secarray.length + 1;
                        setNodeText(selectSingleNode(sections[m], "SEC_ORDER"), secno);
                        scrSecOrder[scrname + "_" + portion + "_" + tabName] = scrSecOrder[scrname + "_" + portion + "_" + tabName] + '~' + secname;
                        scrSecOrderNo[scrname + "_" + portion + "_" + tabName] = scrSecOrderNo[scrname + "_" + portion + "_" + tabName] + '~' + secno;
                    }
                    else {

                        var secorderarray = String(scrSecOrderNo[scrname + "_" + portion + "_" + tabName]).split("~");
                        var secOrderIndex = secorderarray[parseInt(orderIndex)];

                        setNodeText(selectSingleNode(sections[m], "SEC_ORDER"), secOrderIndex);
                    }

                }
            }
            else {
                secno = parseInt(secno) + 1;
                setNodeText(selectSingleNode(sections[m], "SEC_ORDER"), secno);
                scrSecOrder[scrname + "_" + portion + "_" + tabName] = secname;
                scrSecOrderNo[scrname + "_" + portion + "_" + tabName] = secno;
            }
        }

    }
}

function fnDefaultfldsetorder(basenode, childnode) {
    var fldetno = 0;
    fldetno = fstslength;
    var fieldsets = selectNodes(fldOrderfinalDom, "//" + childnode + "/RAD_FIELDSETS");
    for (var a = 0;a < fieldsets.length;a++) {
        var fldset = getNodeText(selectSingleNode(fieldsets[a], "FIELDSET_NAME"));
        if (selectSingleNode(fieldsets[a], "FIELDSET_ORDER") == null) {
            var fldstorder = fldOrderfinalDom.createElement("FIELDSET_ORDER");
            fieldsets[a].insertBefore(fldstorder, selectSingleNode(fieldsets[a], "FIELDSET_FIELDS"));
        }
        if (fldsetNameOrder[fldset]) {
            setNodeText(selectSingleNode(fieldsets[a], "FIELDSET_ORDER"), fldsetNameOrder[fldset]);
        }
        else {
            fldetno = parseInt(fldetno) + 1;
            setNodeText(selectSingleNode(fieldsets[a], "FIELDSET_ORDER"), fldetno);
            fldsetNameOrder[fldset] = fldetno;
        }
        fndefaultfldsetfldorder(basenode, childnode, fldset);

    }
    fstslength = fldetno;
}

function fnDefaultAutoAuth(basenode, childnode) {
	var fldetno = 0;
	fldetno = fstslength;
	var funcPreference = selectSingleNode(fldOrderfinalDom, "//" + childnode + "/RAD_FUNC_PREFERENCES");
	if (funcPreference) {
		var autoAuth = selectSingleNode(funcPreference, "MODULE_AUTO_AUTH");
		if (autoAuth == null) {
			var autoAuth = fldOrderfinalDom.createElement("MODULE_AUTO_AUTH");
			setNodeText(autoAuth, "");
			funcPreference.insertBefore(autoAuth, selectSingleNode(funcPreference, "TANK_MODIFICATIONS"));
		}
		var autoAuthVal = getNodeText(autoAuth);
		if (!autoAuthVal || autoAuthVal == '') {
			var baseAutoAuth = selectSingleNode(fldOrderfinalDom, "//" + basenode
					+ "/RAD_FUNC_PREFERENCES/MODULE_AUTO_AUTH")
			if (baseAutoAuth) {
				var baseAutoAuthVal = getNodeText(baseAutoAuth);
				setNodeText(autoAuth, baseAutoAuthVal);
			}
		}
	}

}

function fndefaultfldsetfldorder(basenode, childnode, fldset) {
    var fldetfldno = 0;

    var fldsetfields = selectNodes(fldOrderfinalDom, "//" + childnode + "/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_FIELDS");
    fldetfldno = 0;
    for (var k = 0;k < fldsetfields.length;k++) {
        var fldsetfld = getNodeText(selectSingleNode(fldsetfields[k], "FIELD_NAME"));
        if (selectSingleNode(fldsetfields[k], "FIELD_ORDER") == null) {
            var fldorder = fldOrderfinalDom.createElement("FIELD_ORDER");
            fldsetfields[k].appendChild(fldorder);
        }
        if (getNodeText(selectSingleNode(fldsetfields[k], "ACTIVE")) == 'N') {
            setNodeText(selectSingleNode(fldsetfields[k], "FIELD_ORDER"), "0");
        }
        else {
            if (fldsetOrder[fldset]) {
                var fldarray = fldsetOrder[fldset].split("~");
                if (fldsetOrder[fldset].indexOf(fldsetfld) ==  - 1) {
                    fldetfldno = fldarray.length + 1;
                    setNodeText(selectSingleNode(fldsetfields[k], "FIELD_ORDER"), fldetfldno);
                    fldsetOrder[fldset] = fldsetOrder[fldset] + '~' + fldsetfld;
                    fldsetOrderNo[fldset] = fldsetOrderNo[fldset] + '~' + fldetfldno;
                }
                else {
                    var orderIndex = 
                    include (fldarray, fldsetfld);
                    if (orderIndex == "-1") {
                        fldetfldno = fldarray.length + 1;
                        setNodeText(selectSingleNode(fldsetfields[k], "FIELD_ORDER"), fldetfldno);
                        fldsetOrder[fldset] = fldsetOrder[fldset] + '~' + fldsetfld;
                        fldsetOrderNo[fldset] = fldsetOrderNo[fldset] + '~' + fldetfldno;
                    }
                    else {

                        var fldorderarray = String(fldsetOrderNo[fldset]).split("~");
                        var fldOrderIndex = fldorderarray[parseInt(orderIndex)];

                        setNodeText(selectSingleNode(fldsetfields[k], "FIELD_ORDER"), fldOrderIndex);
                    }

                }
            }
            else {
                fldetfldno = parseInt(fldetfldno) + 1;
                setNodeText(selectSingleNode(fldsetfields[k], "FIELD_ORDER"), fldetfldno);
                fldsetOrder[fldset] = fldsetfld;
                fldsetOrderNo[fldset] = fldetfldno;

            }
        }
    }

}

function 
include (arr, obj) {
    for (var i = 0;i < arr.length;i++) {
        if (arr[i] == obj)
            return i;
    }
    return  - 1;
}

function fnPopulateBlkOrder(Newdom) {
    var blkno = 0;
    dataBlkOrder = new Array();
    var blks = selectNodes(Newdom, "//RAD_KERNEL/RAD_DATA_BLOCKS");
    for (var j = 0;j < blks.length;j++) {
        var blkName = getNodeText(selectSingleNode(blks[j], "BLOCK_NAME"));
        blkno = parseInt(blkno) + 1;
        setNodeText(selectSingleNode(blks[j], "DATA_BLK_ORDER"), blkno);
        fnPopulateBlkfldOrder(Newdom, blkName)
    }
    return Newdom;
}

function fnPopulateBlkfldOrder(Newdom, blkName) {
    var blkfldno = 0;
    var blkflds = selectNodes(Newdom, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS");
    blkfldno = 0;
    for (var k = 0;k < blkflds.length;k++) {
        var blkfldName = getNodeText(selectSingleNode(blkflds[k], "FIELD_NAME"));
        blkfldno = parseInt(blkfldno) + 1;
        setNodeText(selectSingleNode(blkflds[k], "BLK_FIELD_ORDER"), blkfldno);

    }
    return Newdom;
}

function fnPopulateTabOrder(Newdom) {
    var tabno = 0;
    scrTabOrder = new Array();
    scrTabOrderNo = new Array();
    var scrportion = 'HEADER~BODY~FOOTER';
    scrportion = scrportion.split("~");
    var screens = selectNodes(Newdom, "//RAD_KERNEL/RAD_SCREENS");
    for (var j = 0;j < screens.length;j++) {
        var scrname = getNodeText(selectSingleNode(screens[j], "SCREEN_NAME"));
        for (var hn = 0;hn < scrportion.length;hn++) {
            var prtn = scrportion[hn];
            var tabs = selectNodes(Newdom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrname + "']/" + scrportion[hn] + "/RAD_TABS");
            tabno = 0;
            for (var k = 0;k < tabs.length;k++) {
                var tabName = getNodeText(selectSingleNode(tabs[k], "TAB_NAME"));

                if ((getNodeText(selectSingleNode(screens[j], "SCREEN_VISIBLE")) == 'N') || (getNodeText(selectSingleNode(tabs[k], "TAB_VISIBLE")) == 'N')) {
                    setNodeText(selectSingleNode(tabs[k], "TAB_ORDER"), "0");
                }
                else {
                    tabno = parseInt(tabno) + 1;
                    setNodeText(selectSingleNode(tabs[k], "TAB_ORDER"), tabno);

                }
                Newdom = fnPopulateSecOrder(Newdom, scrname, prtn, tabName);
            }
        }
    }
    return Newdom;
}

function fnPopulateSecOrder(Newdom, scrname, prtn, tabName) {
    var secno = 0;
    scrSecOrder = new Array();
    scrSecOrderNo = new Array();
    var sections = selectNodes(Newdom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrname + "']/" + prtn + "/RAD_TABS[TAB_NAME='" + tabName + "']/RAD_SECTIONS");
    for (var m = 0;m < sections.length;m++) {
        var secname = getNodeText(selectSingleNode(sections[m], "SECTION_NAME"));
        if (getNodeText(selectSingleNode(sections[m], "SEC_VISIBLE")) == 'N') {
            setNodeText(selectSingleNode(sections[m], "SEC_ORDER"), "0");
        }
        else {
            secno = parseInt(secno) + 1;
            setNodeText(selectSingleNode(sections[m], "SEC_ORDER"), secno);

        }

    }
    return Newdom;
}

function fnPopulateFieldsetOrder(Newdom) {
    var fldno = 0;
    fldsetNameOrder = new Array();
    var fldsets = selectNodes(Newdom, "//RAD_KERNEL/RAD_FIELDSETS");
    for (var j = 0;j < fldsets.length;j++) {
        var fieldsetName = getNodeText(selectSingleNode(fldsets[j], "FIELDSET_NAME"));
        if ((getNodeText(selectSingleNode(fldsets[j], "FIELDSET_VISIBLE")) == 'N')) {
            setNodeText(selectSingleNode(fldsets[j], "FIELDSET_ORDER"), "0");
        }
        else {
            fldno = parseInt(fldno) + 1;
            setNodeText(selectSingleNode(fldsets[j], "FIELDSET_ORDER"), fldno);
        }
        Newdom = fnPopulateFiledsetFieldOrder(Newdom, fieldsetName);
    }
    return Newdom;
}

function fnPopulateFiledsetFieldOrder(Newdom, fieldsetName) {
    var fstfldno = 0;
    fldsetOrder = new Array();
    fldsetOrderNo = new Array();
    var fstflds = selectNodes(Newdom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fieldsetName + "']/FIELDSET_FIELDS");
    for (var m = 0;m < fstflds.length;m++) {
        var fstfldname = getNodeText(selectSingleNode(fstflds[m], "FIELD_NAME"));
        if (getNodeText(selectSingleNode(fstflds[m], "ACTIVE")) == 'N') {
            setNodeText(selectSingleNode(fstflds[m], "FIELD_ORDER"), "0");
        }
        else {
            fstfldno = parseInt(fstfldno) + 1;
            setNodeText(selectSingleNode(fstflds[m], "FIELD_ORDER"), fstfldno);

        }

    }
    return Newdom;
}

function fnSortBlks(Newdom) {
    debug('In fnSortBlks');
    var blklist = Newdom.getElementsByTagName('RAD_DATA_BLOCKS');
    var blkArray = new Array();

    for (var y = 0;y < blklist.length;y++) {

        var blkname = blklist[y].getElementsByTagName('BLOCK_NAME')[0].firstChild.data;

        blkArray.push(blklist[y]);
        blkArray[y] = fnSortBlkfields(blkArray[y], blkname);
    }
    blkArray.sort(function (a, b) {
        return (Number(a.getElementsByTagName('DATA_BLK_ORDER')[0].firstChild.data) - Number(b.getElementsByTagName('DATA_BLK_ORDER')[0].firstChild.data));
    });
    var correctNodes = selectNodes(Newdom, "//RAD_DATA_BLOCKS");
    for (var fld = 0;fld < correctNodes.length;fld++) {
        correctNodes[fld].parentNode.removeChild(correctNodes[fld]);
    }
    var head = selectSingleNode(Newdom, "//RAD_KERNEL");
    for (var k = 0;k < blkArray.length;k++) {
        head.appendChild(blkArray[k]);
    }
    return Newdom;
}

function fnSortBlkfields(blkarr, blkname) {

    var nodeArray = new Array();
    var nodeList = blkarr.getElementsByTagName('RAD_BLK_FIELDS');
    for (var len = 0;len < nodeList.length;len++) {
        nodeArray.push(nodeList[len]);

    }

    nodeArray.sort(function (a, b) {
        return (Number(a.getElementsByTagName('BLK_FIELD_ORDER')[0].firstChild.data) - Number(b.getElementsByTagName('BLK_FIELD_ORDER')[0].firstChild.data));
    });

    var correctNodes = selectNodes(blkarr, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkname + "']/RAD_BLK_FIELDS");
    for (var fld = 0;fld < correctNodes.length;fld++) {
        correctNodes[fld].parentNode.removeChild(correctNodes[fld]);
    }
    var head = selectSingleNode(blkarr, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkname + "']");
    for (var k = 0;k < nodeArray.length;k++) {
        head.appendChild(nodeArray[k]);
    }

    return blkarr;

}

function fnSortfldsets(Newdom) {
    debug('In fnSortfldsets');
    var fldsetlist = Newdom.getElementsByTagName('RAD_FIELDSETS');
    var fldsetArray = new Array();
    for (var y = 0;y < fldsetlist.length;y++) {
        var fldsetName = fldsetlist[y].getElementsByTagName('FIELDSET_NAME')[0].firstChild.data;
        fldsetArray.push(fldsetlist[y]);
        fldsetArray[y] = fnSortfldsetflds(fldsetArray[y], fldsetName);

    }
    fldsetArray.sort(function (a, b) {
        return (Number(a.getElementsByTagName('FIELDSET_ORDER')[0].firstChild.data) - Number(b.getElementsByTagName('FIELDSET_ORDER')[0].firstChild.data));
    });
    var correctNodes = selectNodes(Newdom, "//RAD_FIELDSETS");
    for (var fld = 0;fld < correctNodes.length;fld++) {
        correctNodes[fld].parentNode.removeChild(correctNodes[fld]);
    }
    var head = selectSingleNode(Newdom, "//RAD_KERNEL");
    for (var k = 0;k < fldsetArray.length;k++) {
        head.appendChild(fldsetArray[k]);
    }
    return Newdom;
}

function fnSortfldsetflds(fldsetarr, fldsetName) {

    var nodeArray = new Array();
    var nodeList = fldsetarr.getElementsByTagName('FIELDSET_FIELDS');
    var fldsetName = fldsetarr.getElementsByTagName('FIELDSET_NAME')[0].firstChild.data;
    //fill array
    for (var len = 0;len < nodeList.length;len++) {
        nodeArray.push(nodeList[len]);
    }
    //sort array
    nodeArray.sort(function (a, b) {
        return (Number(a.getElementsByTagName('FIELD_ORDER')[0].firstChild.data) - Number(b.getElementsByTagName('FIELD_ORDER')[0].firstChild.data));
    });
    var correctNodes = selectNodes(fldsetarr, "//RAD_FIELDSETS[FIELDSET_NAME='" + fldsetName + "']/FIELDSET_FIELDS");
    for (var fld = 0;fld < correctNodes.length;fld++) {
        correctNodes[fld].parentNode.removeChild(correctNodes[fld]);
    }
    var head = selectSingleNode(fldsetarr, "//RAD_FIELDSETS[FIELDSET_NAME='" + fldsetName + "']");
    for (var k = 0;k < nodeArray.length;k++) {
        head.appendChild(nodeArray[k]);
    }

    return fldsetarr;

}

function fnSortTabs(Newdom) {
    debug('In fnSortTabs');
    var screens = Newdom.getElementsByTagName('RAD_SCREENS');
    var scrportion = 'HEADER~BODY~FOOTER';
    scrportion = scrportion.split("~");
    for (var i = 0;i < screens.length;i++) {
        var scrName = screens[i].getElementsByTagName('SCREEN_NAME')[0].firstChild.data;

        for (var hn = 0;hn < scrportion.length;hn++) {
            var nodeArray = new Array();
            var nodeList = screens[i].getElementsByTagName(scrportion[hn])[0].getElementsByTagName('RAD_TABS');

            for (var len = 0;len < nodeList.length;len++) {
                nodeArray.push(nodeList[len]);
                nodeArray[len] = fnSortSections(nodeArray[len], scrName, scrportion[hn]);
            }

            nodeArray.sort(function (a, b) {
                return (Number(a.getElementsByTagName('TAB_ORDER')[0].firstChild.data) - Number(b.getElementsByTagName('TAB_ORDER')[0].firstChild.data));
            });

            var correctNodes = selectNodes(Newdom, "//RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrportion[hn] + "/RAD_TABS");
            for (var fld = 0;fld < correctNodes.length;fld++) {
                correctNodes[fld].parentNode.removeChild(correctNodes[fld]);
            }
            var head = selectSingleNode(Newdom, "//RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrportion[hn]);
            for (var k = 0;k < nodeArray.length;k++) {
                head.appendChild(nodeArray[k]);
            }
        }
    }

    return Newdom;

}

function fnSortSections(tabarray, scrName, scrptn) {
    var secarray = new Array();
    var sortedarray = "";
    var secList = tabarray.getElementsByTagName('RAD_SECTIONS');
    var tabId = tabarray.getElementsByTagName('TAB_NAME')[0].firstChild.data;
    for (var l = 0;l < secList.length;l++) {
        secarray.push(secList[l]);
    }
    secarray.sort(function (a, b) {
        return (Number(a.getElementsByTagName('SEC_ORDER')[0].firstChild.data) - Number(b.getElementsByTagName('SEC_ORDER')[0].firstChild.data));
    });
    var correctNodes = selectNodes(tabarray, "//RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrptn + "/RAD_TABS[TAB_NAME='" + tabId + "']/RAD_SECTIONS");
    for (var fld = 0;fld < correctNodes.length;fld++) {
        correctNodes[fld].parentNode.removeChild(correctNodes[fld]);
    }
    var head = selectSingleNode(tabarray, "//RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrptn + "/RAD_TABS[TAB_NAME='" + tabId + "']");
    for (var k = 0;k < secarray.length;k++) {
        head.appendChild(secarray[k]);
    }
    return tabarray;
}

function FnPopulate_Order(dom) {
    dom = fnPopulateBlkOrder(dom);
    dom = fnPopulateTabOrder(dom);
    dom = fnPopulateFieldsetOrder(dom);
    dom = fnPopulateBlkAttrOrder(dom);
    return dom;
}

function FnSort_Nodes(NewDOM) {
    NewDOM = fnSortBlks(NewDOM);
    NewDOM = fnSortfldsets(NewDOM);
    NewDOM = fnSortTabs(NewDOM);
    NewDOM = fnSortBlksAttr(NewDOM);
    return NewDOM;
}

function fnDefaultBlkAttr(basenode, childnode) {
      var datablks = selectNodes(fldOrderfinalDom, "//" + childnode + "/RAD_DATA_BLOCKS");
    for (var k = 0;k < datablks.length;k++) {
        var blkName = getNodeText(selectSingleNode(datablks[k], "BLOCK_NAME"));
            var blkflds = selectNodes(fldOrderfinalDom, "//" + childnode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS");
            for (var kk = 0;kk < blkflds.length;kk++) {
                var blkfldName = getNodeText(selectSingleNode(blkflds[kk], "FIELD_NAME"));
                var fldKdispTyp = getNodeText(selectSingleNode(blkflds[kk], "DISPLAY_TYPE"));
                if (fldKdispTyp == "SELECT" || fldKdispTyp == "RADIO" || fldKdispTyp == "CHECKBOX" || fldKdispTyp == "ROSELECT") {
                    fnDefaultBlkAttrOrder(basenode, childnode, blkName, blkfldName);
                }
            }
        }
    } 

function fnDefaultBlkAttrOrder(basenode, childnode, blkName, blkfldName) {
    var blkfldno = 0;
	var blkFldOrder = new Array();
	var blkFldOrderNo = new Array();

	// Custom Attr order numbers arrays indexed by datablock_name
	var blkFldAttrOrder = new Array();
	var blkFldAttrOrderNo = new Array();
    var blkflds = selectNodes(fldOrderfinalDom, "//" + childnode + "/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS[@ID='" + blkfldName + "']/RAD_FIELD_CUSTOM_ATTRS");
    for (var kk = 0;kk < blkflds.length;kk++) {
        var AttrName = getNodeText(selectSingleNode(blkflds[kk], "ATTR_NAME"));
        if (selectSingleNode(blkflds[kk], "ATTR_POSITION") == null) {
            var blkFldAttrOrder_P = fldOrderfinalDom.createElement("ATTR_POSITION");
            blkflds[kk].insertBefore(blkFldAttrOrder_P, selectSingleNode(blkflds[kk], "ACTIVE"));
        }
        if (blkFldAttrOrder[blkName+"__"+blkfldName]) {
            var blkarray = blkFldAttrOrder[blkName+"__"+blkfldName].split("~");
            if (blkFldAttrOrder[blkName+"__"+blkfldName].indexOf(AttrName) ==  - 1) {
                blkfldno = blkarray.length + 1;
                setNodeText(selectSingleNode(blkflds[kk], "ATTR_POSITION"), blkfldno);
                blkFldAttrOrder[blkName+"__"+blkfldName] = blkFldAttrOrder[blkName+"__"+blkfldName] + '~' + AttrName;
                blkFldAttrOrderNo[blkName+"__"+blkfldName] = blkFldAttrOrderNo[blkName+"__"+blkfldName] + '~' + blkfldno;
            }
            else {
                var orderIndex = 
                include (blkarray, AttrName);
                if (orderIndex == "-1") {
                    blkfldno = blkarray.length + 1;
                    setNodeText(selectSingleNode(blkflds[kk], "ATTR_POSITION"), blkfldno);
                    blkFldAttrOrder[blkName+"__"+blkfldName] = blkFldAttrOrder[blkName+"__"+blkfldName] + '~' + AttrName;
                    blkFldAttrOrderNo[blkName+"__"+blkfldName] = blkFldAttrOrderNo[blkName+"__"+blkfldName] + '~' + blkfldno;
                }
                else {
                    var blkorderarray = String(blkFldAttrOrderNo[blkName+"__"+blkfldName]).split("~");
                    var blkOrderIndex = blkorderarray[parseInt(orderIndex)];
                    setNodeText(selectSingleNode(blkflds[kk], "ATTR_POSITION"), blkOrderIndex);
                }
            }
        }
        else {
            blkfldno = parseInt(blkfldno) + 1;
            setNodeText(selectSingleNode(blkflds[kk], "ATTR_POSITION"), blkfldno);
			if(AttrName=="")AttrName=" ";
            blkFldAttrOrder[blkName+"__"+blkfldName] = AttrName;
            blkFldAttrOrderNo[blkName+"__"+blkfldName] = blkfldno;
        }

    }
    
}

function fnSortBlksAttr(Newdom) {
    debug('In fnSortBlksAttr');
    var blklist = Newdom.getElementsByTagName('RAD_DATA_BLOCKS');
    var blkArray = new Array();

    for (var y = 0;y < blklist.length;y++) {
        var blkname = blklist[y].getElementsByTagName('BLOCK_NAME')[0].firstChild.data;
        //for (var k = 0;k < blklist.length;k++) {
            var nodeListb = blklist[y].getElementsByTagName('RAD_BLK_FIELDS');
            for (var l = 0;l < nodeListb.length;l++) {
                var blkfldName = nodeListb[l].getElementsByTagName('FIELD_NAME')[0].firstChild.data;
                var fldKdispTyp = getNodeText(selectSingleNode(nodeListb[l], "DISPLAY_TYPE"));
                if (fldKdispTyp == "SELECT" || fldKdispTyp == "RADIO" || fldKdispTyp == "CHECKBOX" || fldKdispTyp == "ROSELECT") {
                    blkArray.push(nodeListb[l]);
                    blkArray[l] = fnSortBlkAttrfields(nodeListb[l], blkname, blkfldName);
                }
           // }
        }
    }
    return Newdom;
}

function fnSortBlkAttrfields(blkarr, blkname, blkfldName) {

    var nodeArray = new Array();
    var nodeList = blkarr.getElementsByTagName('RAD_FIELD_CUSTOM_ATTRS');
    for (var len = 0;len < nodeList.length;len++) {
        nodeArray.push(nodeList[len]);

    }

    nodeArray.sort(function (a, b) {
        return (Number(a.getElementsByTagName('ATTR_POSITION')[0].firstChild.data) - Number(b.getElementsByTagName('ATTR_POSITION')[0].firstChild.data));
    });

    var correctNodes = selectNodes(blkarr, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkname + "']/RAD_BLK_FIELDS[@ID='" + blkfldName + "']/RAD_FIELD_CUSTOM_ATTRS");
    for (var fld = 0;fld < correctNodes.length;fld++) {
        correctNodes[fld].parentNode.removeChild(correctNodes[fld]);
    }
    var head = selectSingleNode(blkarr, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkname + "']/RAD_BLK_FIELDS[@ID='" + blkfldName + "']");
    for (var k = 0;k < nodeArray.length;k++) {
        head.appendChild(nodeArray[k]);
    }
    return blkarr;
}

function fnPopulateBlkAttrOrder(Newdom) {
    var blks = selectNodes(Newdom, "//RAD_KERNEL/RAD_DATA_BLOCKS");
    for (var j = 0;j < blks.length;j++) {
        var blkName = getNodeText(selectSingleNode(blks[j], "BLOCK_NAME"));
        var blkflds = selectNodes(Newdom, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS");
        for (var kk = 0;kk < blkflds.length;kk++) {
            var blkfldName = getNodeText(selectSingleNode(blkflds[kk], "FIELD_NAME"));
            var fldKdispTyp = getNodeText(selectSingleNode(blkflds[kk], "DISPLAY_TYPE"));
            if (fldKdispTyp == "SELECT" || fldKdispTyp == "RADIO" || fldKdispTyp == "CHECKBOX" || fldKdispTyp == "ROSELECT") {
                fnPopulateBlkfldAttrOrder(Newdom, blkName, blkfldName);
            }
        }
    }
    return Newdom;
}

function fnPopulateBlkfldAttrOrder(Newdom, blkName, blkfldName) {
    var blkfldno = 0;
    var blkflds = selectNodes(Newdom, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS[@ID='" + blkfldName + "']/RAD_FIELD_CUSTOM_ATTRS");
    blkfldno = 0;
    for (var k = 0;k < blkflds.length;k++) {
        var blkfldName = getNodeText(selectSingleNode(blkflds[k], "ATTR_NAME"));
        blkfldno = parseInt(blkfldno) + 1;
        setNodeText(selectSingleNode(blkflds[k], "ATTR_POSITION"), blkfldno);
    }
    return Newdom;
}