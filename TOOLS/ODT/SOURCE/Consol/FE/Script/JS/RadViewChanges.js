/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadViewChanges.js
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

function fnPrepareDOMforVwChg() {

    if (document.getElementsByName("FILE_SAVE_PATH")[0]) {
        var load_path = document.getElementsByName("FILE_SAVE_PATH")[0].value;
    }

    var NewDOM = createHTTPActiveXObject();
    var xml2 = loadxmldata;

    xml2 = replaceAll(xml2, "\n", "");
    xml2 = replaceAll(xml2, "\t", " ");
    xml2 = replaceAll(xml2, "\r", "");
    if (!xml2) {
        return false;
    }

    if (xml2.indexOf("RAD_FUNCTIONS") ==  - 1) {
        alertMessage("Load Valid RAD xml File", "E");
        return false;
    }

    if (xml2.indexOf("RAD_KERNEL") ==  - 1) {
        alertMessage("No Changes To Show", "I");
        return false;
    }

    NewDOM = loadXMLDoc(xml2);
    var ndeChk = fn_Chekc_RadXml(NewDOM);
    if (ndeChk == false) {
        return false;
    }

    NewDOM = fnrenameChildNode(NewDOM, func_type);
    NewDOM = setTempHeaderNodes(NewDOM);
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_KERNEL");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CLUSTER");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CUSTOM");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CUSTOMER");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CHILD");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CHILD_KERNEL");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CHILD_CLUSTER");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CHILD_CUSTOM");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_CHILD_CUSTOMER");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_SCRCHLD_KERNEL");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_SCRCHLD_CLUSTER");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_SCRCHLD_CUSTOM");
    NewDOM = fnSetDefaultvals(NewDOM, "RAD_SCRCHLD_CUSTOMER");
    NewDOM = fnSetCallFrmID(NewDOM);
    NewDOM = fnSetLovDetailsID(NewDOM);
    NewDOM = fnScreenNode_Correction(NewDOM);
    NewDOM = fnOrderCorrection(NewDOM);
    NewDOM = fnSetCallFrmID(NewDOM);
    NewDOM = fnSetLovDetailsID(NewDOM);
    NewDOM = TemproaryToModifyActions(NewDOM);

    var func_type = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
    document.getElementsByName("FUNCTION_TYPE")[0].value = func_type;
    var func_CaT = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_CATEGORY"));
    document.getElementsByName("FUNCTION_CATEGORY")[0].value = func_CaT;
    var func_id = getNodeText(selectSingleNode(NewDOM, "//RAD_FUNCTIONS/FUNCTION_ID"));
    document.getElementsByName("FUNCTION_ID")[0].value = func_id;

    if (getNodeText(selectSingleNode(NewDOM, "//RAD_KERNEL")) == "") {
        alertMessage("No Changes To Show", "I");
        return false;
    }

    if ((xml2.indexOf("RAD_" + parent.relType) && func_type != 'C') ==  - 1) {
        alertMessage("No Changes To Show", "I");
        return false;
    }

    if (func_type == 'C' && xml2.indexOf("RAD_CHILD_" + parent.relType) ==  - 1) {
        alertMessage("No Changes To Show", "I");
        return false;
    }
    trailDOM = selectSingleNode(NewDOM, "//RAD_KERNEL");
    selectSingleNode(NewDOM, "//RAD_FUNCTIONS").removeChild(trailDOM);
    newl = NewDOM.createElement("RAD_KERNEL");
    selectSingleNode(NewDOM, "//RAD_FUNCTIONS").appendChild(newl);

    if (func_type == 'P') {
        trailDOM = selectNodes(NewDOM, "//RAD_" + parent.relType + "/*");
    }
    else {
        trailDOM = selectNodes(NewDOM, "//RAD_CHILD_" + parent.relType + "/*");
    }
    for (var i = 0;i < trailDOM.length;i++) {
        selectSingleNode(NewDOM, "//RAD_KERNEL").appendChild(trailDOM[i]);
    }

    try {
        trailDOM = selectSingleNode(NewDOM, "//RAD_CHILD_" + parent.relType);
        selectSingleNode(NewDOM, "//RAD_FUNCTIONS").removeChild(trailDOM);
    }
    catch (e) {
    }
    try {
        trailDOM = selectSingleNode(NewDOM, "//RAD_CLUSTER");
        selectSingleNode(NewDOM, "//RAD_FUNCTIONS").removeChild(trailDOM);
    }
    catch (e) {
    }
    try {
        trailDOM = selectSingleNode(NewDOM, "//RAD_CUSTOM");
        selectSingleNode(NewDOM, "//RAD_FUNCTIONS").removeChild(trailDOM);
    }
    catch (e) {
    }

    return NewDOM;

}

function fnViewChanges(NewDOM) {

    var load_path = document.getElementsByName("FILE_SAVE_PATH")[0].value;
    var xml2 = loadxmldata;
    radDOM = loadXMLDoc(xml2);
    fnCompareDataSrc_vwChng(NewDOM);
    fnCompareDataBlk_vwChng(NewDOM);
    fnRemove_Screens(NewDOM);
    // fnCompareSCREENS_vwChng(NewDOM);
    fnCompareFIELDS_vwChng(NewDOM);
    fnCompareCallforms_vwChng("RAD_CALLFORM", NewDOM);
    fnCompareLovs_vwChng(NewDOM);

    return NewDOM;
}

function fnCompareforVwChanges(base, cons, node) {
    var str = "~";
    var elelen = new Array();
    var node1 = node;
    if (node == "RAD_DATASOURCES/RAD_FIELDS")
        node = "RAD_FIELDS";
    if (node == "RAD_DATA_BLOCKS/RAD_BLK_FIELDS")
        node = "RAD_BLK_FIELDS";
    if (node == "RAD_FIELDSETS/FIELDSET_FIELDS")
        node = "FIELDSET_FIELDS";

    elelen = elementArray[node].split("~");
    var nonCompareArray = nodeNonCompareArray[node];
    for (j = 0;j < elelen.length;j++) {
        if (selectSingleNode(cons, elelen[j]) != null && selectSingleNode(base, elelen[j]) != null) {
            if (nonCompareArray) {
                if (nonCompareArray.indexOf(elelen[j]) ==  - 1) {
                    /*if (getNodeText(selectSingleNode(cons,elelen[j])) != getNodeText(selectSingleNode(base,elelen[j]))) {
					 if(getNodeText(selectSingleNode(base,"RELEASE_NAME"))!=parent.relName)
                      selectSingleNode(NewDOM,"//RAD_KERNEL").removeChild(cons);
				    	str = str + elelen[j] + "~";  }*/
                    if (getNodeText(selectSingleNode(cons, elelen[j])) != getNodeText(selectSingleNode(base, elelen[j]))) {
                        str = str + elelen[j] + "~";
                        continue;

                    }
                }
            }
            else {
                /*if (getNodeText(selectSingleNode(cons,elelen[j])) != getNodeText(selectSingleNode(base,elelen[j]))) {
					    if(getNodeText(selectSingleNode(base,"RELEASE_NAME"))!=parent.relName)
                       {selectSingleNode(NewDOM,"//RAD_KERNEL").removeChild(cons);
				       str = str + elelen[j] + "~";}*/
                if (getNodeText(selectSingleNode(cons, elelen[j])) != getNodeText(selectSingleNode(base, elelen[j]))) {
                    str = str + elelen[j] + "~";
                    continue;

                }
            }
        }
    }
    return str;
}

function fnCompareLovs_vwChng(NewDOM) {
    var consLovs = selectNodes(NewDOM, "//RAD_KERNEL/RAD_LOVS");
    for (i = 0;i < consLovs.length;i++) {
        var lovName = getNodeText(selectSingleNode(consLovs[i], "LOV_NAME"));
        var baseLovs = selectSingleNode(radDOM, "//RAD_KERNEL/RAD_LOVS[LOV_NAME='" + lovName + "']");
        if (baseLovs) {
            var diffLovFlds = fnCompareforVwChanges(baseLovs, consLovs[i], "RAD_LOVS");
            if (diffLovFlds != "~") {
                if (parent.relName == getNodeText(selectSingleNode(consLovs[i], "RELEASE_NAME"))) {
                    consLovs[i].setAttribute("Changed", diffLovFlds);
                }
                else {
                    selectSingleNode(NewDOM, "//RAD_KERNEL").removeChild(consLovs[i]);
                }
            }
            var consLovDet = selectNodes(consLovs[i], "//RAD_KERNEL/RAD_LOVS[LOV_NAME='" + lovName + "']/RAD_LOV_DETAILS");
            for (var k = 0;k < consLovDet.length;k++) {
                var id = consLovDet[k].getAttribute("ID");
                var baseLovDet = selectSingleNode(baseLovs, "//RAD_KERNEL/RAD_LOVS[LOV_NAME='" + lovName + "']/RAD_LOV_DETAILS[@ID='" + id + "']");
                if (baseLovDet)
                    var diffLovDet = fnCompareforVwChanges(consLovDet[k], baseLovDet, "RAD_LOV_DETAILS");
                if (diffLovDet != "~") {
                    consLovDet[k].setAttribute("Changed", diffLovDet);
                    consLovs[i].setAttribute("Changed", diffLovDet);
                }
            }
        }
        else {
            if (parent.relName == getNodeText(selectSingleNode(consLovs[i], "RELEASE_NAME"))) {
                consLovs[i].setAttribute("Action", "New");
                var consLovDet = selectNodes(consLovs[i], "//RAD_KERNEL/RAD_LOVS[LOV_NAME='" + lovName + "']/RAD_LOV_DETAILS");
                for (var k = 0;k < consLovDet.length;k++) {
                    consLovDet[k].setAttribute("Action", "New");
                }
            }
            else {
                selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_LOVS[LOV_NAME='" + lovName + "']").removeChild(consLovDet[k]);
            }
        }
    }
}

function fnCompareFldProperties(node, NewDOM, consBlkFlds) {

    var baseBlkFlds = selectSingleNode(radDOM, "//RAD_KERNEL/RAD_DATA_BLOCKS/RAD_BLK_FIELDS[@ID='" + consBlkFlds.getAttribute("ID") + "']");
    var consFldProps = selectNodes(consBlkFlds, node);
    if (baseBlkFlds == null)
        return;
    var baseFldProps = selectNodes(baseBlkFlds, node);

    for (var i = 0;i < consFldProps.length;i++) {
        var baseFldProp = selectSingleNode(baseBlkFlds, node + "[@ID='" + consFldProps[i].getAttribute("ID") + "']");
        if (baseFldProp == null) {
            if (parent.relName == getNodeText(selectSingleNode(consFldProps[i], "RELEASE_NAME"))) {
                consFldProps[i].setAttribute("Action", "New");
            }
        }
        else {
            var changed = fnCompareforVwChanges(baseFldProp, consFldProps[i], node);
            if (changed != '~')
                consFldProps[i].setAttribute("Changed", changed);
        }

    }

    if (baseFldProps.length > consFldProps.length) {
        for (var i = 0;i < baseFldProps.length;i++) {
            var consFldProp = selectSingleNode(consBlkFlds, node + "[@ID='" + baseFldProps[i].getAttribute("ID") + "']");
            if (consFldProp == null) {
                if (parent.relName == getNodeText(selectSingleNode(baseFldProps[i], "RELEASE_NAME"))) {
                    baseFldProps[i].setAttribute("Action", "Deleted");
                    consBlkFlds.appendChild(baseFldProps[i]);
                }
            }
        }
    }
}

function fnCompareCallforms_vwChng(node, NewDOM) {
    var consNode = selectNodes(NewDOM, "//RAD_KERNEL/" + node);
    for (i = 0;i < consNode.length;i++) {
        var NodeName = consNode[i].getAttribute("ID");
        var baseNode = selectSingleNode(radDOM, "//RAD_KERNEL/" + node + "[@ID='" + NodeName + "']");
        if (baseNode) {
            var diffNodeFlds = fnCompareforVwChanges(baseNode, consNode[i], node);
            if (diffNodeFlds != "~") {
                consNode[i].setAttribute("Changed", diffNodeFlds);
            }
        }
        else {
            if (parent.relName == getNodeText(selectSingleNode(consNode[i], "RELEASE_NAME"))) {
                consNode[i].setAttribute("Action", "New");
            }
        }
    }
}

function fnCompareBlockDataSources(consDatasrc, NewDOM) {

    var baseDatasrc = selectSingleNode(radDOM, "//RAD_KERNEL/RAD_DATA_BLOCKS[@ID='" + consDatasrc.getAttribute("ID") + "']");

    if (baseDatasrc == null)
        return;

    var baseBlkDS = selectNodes(baseDatasrc, "BLK_DATASOURCES");
    var consBlkDS = selectNodes(consDatasrc, "BLK_DATASOURCES");
    var blkds = consBlkDS.length - baseBlkDS.length;
    if (blkds != 0) {
        for (var i = 0;i < blkds;i++) {
            if (parent.relName == getNodeText(selectSingleNode(consBlkDS[baseBlkDS.length], "RELEASE_NAME"))) {
                consBlkDS[baseBlkDS.length].setAttribute("Action", "New");
            }
        }
    }
}

function fnCompareDataSrc_vwChng(NewDOM) {
    var DataSrcNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_DATASOURCES");
    for (i = 0;i < DataSrcNode.length;i++) {
        var NodeName = DataSrcNode[i].getAttribute("ID");
        var baseNode = selectSingleNode(radDOM, "//RAD_KERNEL/RAD_DATASOURCES[@ID='" + NodeName + "']");
        if (baseNode) {
            var diffNodeFlds = fnCompareforVwChanges(baseNode, DataSrcNode[i], "RAD_DATASOURCES");
            if (diffNodeFlds != "~") {
                DataSrcNode[i].setAttribute("Changed", diffNodeFlds);
            }
        }
        else {
            if (parent.relName == getNodeText(selectSingleNode(DataSrcNode[i], "RELEASE_NAME"))) {
                DataSrcNode[i].setAttribute("Action", "New");
            }

            var fldNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_DATASOURCES[@ID='" + NodeName + "']/RAD_FIELDS");
            for (var item = 0;item < fldNode.length;item++) {
                if (parent.relName == getNodeText(selectSingleNode(fldNode[item], "RELEASE_NAME"))) {
                    fldNode[item].setAttribute("Action", "New");
                }
            }
            continue;
        }
        fnCompareDSFields(NodeName, NewDOM);
    }
}

function fnCompareDataBlk_vwChng(NewDOM) {
    var DataBlkNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_DATA_BLOCKS");

    for (i = 0;i < DataBlkNode.length;i++) {
        var NodeName = DataBlkNode[i].getAttribute("ID");
        var baseNode = selectSingleNode(radDOM, "//RAD_KERNEL/RAD_DATA_BLOCKS[@ID='" + NodeName + "']");
        if (baseNode) {
            var diffNodeFlds = fnCompareforVwChanges(baseNode, DataBlkNode[i], "RAD_DATA_BLOCKS");
            if (diffNodeFlds != "~") {
                DataBlkNode[i].setAttribute("Changed", diffNodeFlds);
            }
        }
        else {
            if (parent.relName == getNodeText(selectSingleNode(DataBlkNode[i], "RELEASE_NAME"))) {
                DataBlkNode[i].setAttribute("Action", "New");
            }
            else {
                selectSingleNode(NewDOM, "//RAD_KERNEL").removeChild(DataBlkNode[i]);
            }
        }
        fnCompareDataBlkFlds(NodeName, NewDOM);
        fnCompareBlockDataSources(DataBlkNode[i], NewDOM);
    }
}

function fnCompareDSFields(NodeName, NewDOM) {
    var fldNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_DATASOURCES[@ID='" + NodeName + "']/RAD_FIELDS");
    for (var item = 0;item < fldNode.length;item++) {
        var fldName = fldNode[item].getAttribute("ID");
        var baseNode = selectSingleNode(radDOM, "//RAD_KERNEL/RAD_DATASOURCES[@ID='" + NodeName + "']/RAD_FIELDS[@ID='" + fldName + "']");
        if (baseNode) {
            var diffNodeFlds = fnCompareforVwChanges(baseNode, fldNode[item], "RAD_DATASOURCES/RAD_FIELDS");
            if (diffNodeFlds != "~") {
                fldNode[item].setAttribute("Changed", diffNodeFlds);

                //set change attribute
            }
        }
        else {
            if (parent.relName == getNodeText(selectSingleNode(fldNode[item], "RELEASE_NAME"))) {
                fldNode[item].setAttribute("Action", "New");
            }
            else {
                selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_DATASOURCES[@ID='" + NodeName + "']").removeChild(fldNode[item]);
            }
        }
    }
}

function fnCompareDataBlkFlds(NodeName, NewDOM) {
    var fldNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS");
    for (var item = 0;item < fldNode.length;item++) {
        var fldName = fldNode[item].getAttribute("ID");
        var baseNode = selectSingleNode(radDOM, "//RAD_KERNEL/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS[@ID='" + fldName + "']");
        if (baseNode) {
            var diffNodeFlds = fnCompareforVwChanges(baseNode, fldNode[item], "RAD_DATA_BLOCKS/RAD_BLK_FIELDS");
            if (diffNodeFlds != "~") {
                fldNode[item].setAttribute("Changed", diffNodeFlds);

                //set change attribute
            }
        }
        else {
            if (parent.relName == getNodeText(selectSingleNode(fldNode[item], "RELEASE_NAME"))) {
                fldNode[item].setAttribute("Action", "New");
            }
            else {
                selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_DATA_BLOCKS[@ID='" + NodeName + "']").removeChild(fldNode[item]);
            }
        }

        fnCompareFldProperties("RAD_FIELD_CUSTOM_ATTRS", NewDOM, fldNode[item]);
        fnCompareFldProperties("RAD_FIELD_EVENTS", NewDOM, fldNode[item]);
        fnCompareFldProperties("RAD_BIND_VARS", NewDOM, fldNode[item]);
        fnCompareFldProperties("RAD_RETURN_FIELDS", NewDOM, fldNode[item]);
    }
}

function fnCompareSCREENS_vwChng(NewDOM) {
    var screenname = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS");

    for (i = 0;i < screenname.length;i++) {
        var NodeName = screenname[i].getAttribute("ID");
        var baseNode = selectSingleNode(radDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']");
        if (baseNode) {
            var diffNodeFlds = fnCompareforVwChanges(baseNode, screenname[i], "RAD_SCREENS");
            if (diffNodeFlds != "~") {
                screenname[i].setAttribute("Changed", diffNodeFlds);
            }
        }
        else {
            if (parent.relName == getNodeText(selectSingleNode(screenname[i], "RELEASE_NAME"))) {
                screenname[i].setAttribute("Action", "New");
            }
            else {
                selectSingleNode(NewDOM, "//RAD_KERNEL").removeChild(screenname[i]);
            }
        }
        fnCompareSCREENS(NodeName, NewDOM);

    }
}

function fnCompareSCREENS(NodeName, NewDOM) {
    var HEADERNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/HEADER");
    var BODYNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/BODY");
    var FOOTERNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/FOOTER");

    for (var item = 0;item < HEADERNode.length;item++) {
        var fldName = HEADERNode[item].getAttribute("ID");
        var baseNode = selectSingleNode(radDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/HEADER[@ID='" + fldName + "']");
        if (baseNode) {
            var diffNodeFlds = fnCompareforVwChanges(baseNode, HEADERNode[item], "RAD_SCREENS");
            if (diffNodeFlds != "~") {
                HEADERNode[item].setAttribute("Changed", diffNodeFlds);
            }
        }
        else {
            if (parent.relName == getNodeText(selectSingleNode(HEADERNode[item], "RELEASE_NAME"))) {
                HEADERNode[item].setAttribute("Action", "New");
            }
        }

    }
    for (var item = 0;item < BODYNode.length;item++) {
        var fldName = BODYNode[item].getAttribute("ID");
        var baseNode = selectSingleNode(radDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/BODY[@ID='" + fldName + "']");
        if (baseNode) {
            var diffNodeFlds = fnCompareforVwChanges(baseNode, BODYNode[item], "RAD_SCREENS");
            if (diffNodeFlds != "~") {
                BODYNode[item].setAttribute("Changed", diffNodeFlds);
            }
        }
        else {
            if (parent.relName == getNodeText(selectSingleNode(BODYNode[item], "RELEASE_NAME"))) {
                BODYNode[item].setAttribute("Action", "New");
            }
        }

    }

    for (var item = 0;item < FOOTERNode.length;item++) {
        var fldName = FOOTERNode[item].getAttribute("ID");
        var baseNode = selectSingleNode(radDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/FOOTER[@ID='" + fldName + "']");
        if (baseNode) {
            var diffNodeFlds = fnCompareforVwChanges(baseNode, FOOTERNode[item], "RAD_SCREENS");
            if (diffNodeFlds != "~") {
                FOOTERNode[item].setAttribute("Changed", diffNodeFlds);
            }
        }
        else {
            if (parent.relName == getNodeText(selectSingleNode(FOOTERNode[item], "RELEASE_NAME"))) {
                FOOTERNode[item].setAttribute("Action", "New");
            }
        }

    }
}

function fnCompareFIELDS_vwChng(NewDOM) {
    var fieldsetname = selectNodes(NewDOM, "//RAD_KERNEL/RAD_FIELDSETS");

    for (i = 0;i < fieldsetname.length;i++) {
        var NodeName = fieldsetname[i].getAttribute("ID");
        var baseNode = selectSingleNode(radDOM, "//RAD_KERNEL/RAD_FIELDSETS[@ID='" + NodeName + "']");
        if (baseNode) {
            var diffNodeFlds = fnCompareforVwChanges(baseNode, fieldsetname[i], "RAD_FIELDSETS");
            if (diffNodeFlds != "~") {
                fieldsetname[i].setAttribute("Changed", diffNodeFlds);
            }
        }
        else {
            if (parent.relName == getNodeText(selectSingleNode(fieldsetname[i], "RELEASE_NAME"))) {
                fieldsetname[i].setAttribute("Action", "New");
            }
        }
        fnComparefieldsetfields(NodeName, NewDOM);
        /* fnCompareBlockDataSources(DataBlkNode[i], NewDOM);*/
    }
}

function fnComparefieldsetfields(NodeName, NewDOM) {
    var fldsetNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_FIELDSETS[@ID='" + NodeName + "']/FIELDSET_FIELDS");
    for (var item = 0;item < fldsetNode.length;item++) {
        var fldName = fldsetNode[item].getAttribute("ID");
        var baseNode = selectSingleNode(radDOM, "//RAD_KERNEL/RAD_FIELDSETS[@ID='" + NodeName + "']/FIELDSET_FIELDS[@ID='" + fldName + "']");
        if (baseNode) {
            var diffNodeFlds = fnCompareforVwChanges(baseNode, fldsetNode[item], "RAD_FIELDSETS/FIELDSET_FIELDS");
            if (diffNodeFlds != "~") {
                fldsetNode[item].setAttribute("Changed", diffNodeFlds);
                //set change attribute
            }
        }
        else {
            if (parent.relName == getNodeText(selectSingleNode(fldsetNode[item], "RELEASE_NAME"))) {
                fldsetNode[item].setAttribute("Action", "New");
            }
        }

    }
}

function fnViewChangeskernel(NewDOM) {
    var cmpflag = 0;

    fnCompareDataSrc_vwChng_Kenrnel(NewDOM);
    fnCompareDataBlk_vwChng_kernel(NewDOM);
    //fnRemove_Screens(NewDOM);
    fnCompareSCREENS_vwChng_kernel(NewDOM);
    fnCompareFIELDS_vwChng_kernel(NewDOM);
    fnCompareCallforms_vwChng_kernel("RAD_CALLFORM", NewDOM);
    fnCompareCallforms_vwChng_kernel("RAD_LAUNCHFORM", NewDOM);
    fnCompareLovs_vwChng_kernel(NewDOM);
    return NewDOM;
}

function fnCompareDataSrc_vwChng_Kenrnel(NewDOM) {
    var DataSrcNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_DATASOURCES");
    for (i = 0;i < DataSrcNode.length;i++) {
        cmpflag = 0;
        var NodeName = DataSrcNode[i].getAttribute("ID");

        if (parent.relName == getNodeText(selectSingleNode(DataSrcNode[i], "RELEASE_NAME"))) {
            DataSrcNode[i].setAttribute("Action", "New");
            cmpflag++;
        }

        var fldNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_DATASOURCES[@ID='" + NodeName + "']/RAD_FIELDS");
        for (var item = 0;item < fldNode.length;item++) {
            if (parent.relName == getNodeText(selectSingleNode(fldNode[item], "RELEASE_NAME"))) {
                fldNode[item].setAttribute("Action", "New");
                cmpflag++;
            }
            else {
                selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_DATASOURCES[@ID='" + NodeName + "']").removeChild(fldNode[item]);
            }

        }
        if (cmpflag == 0) {
            selectSingleNode(NewDOM, "//RAD_KERNEL").removeChild(DataSrcNode[i]);
        }
        continue;

    }
}

function fnCompareDataBlk_vwChng_kernel(NewDOM) {
    var DataBlkNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_DATA_BLOCKS");
    for (i = 0;i < DataBlkNode.length;i++) {
        cmpflag = 0;
        var NodeName = DataBlkNode[i].getAttribute("ID");

        if (parent.relName == getNodeText(selectSingleNode(DataBlkNode[i], "RELEASE_NAME"))) {
            DataBlkNode[i].setAttribute("Action", "New");
            cmpflag++;
        }

        fnCompareDataBlkFlds_kernel(NodeName, NewDOM);
        if (cmpflag == 0) {
            selectSingleNode(NewDOM, "//RAD_KERNEL").removeChild(DataBlkNode[i]);
        }
        //fnCompareBlockDataSources_kernel(DataBlkNode[i], NewDOM);
    }
}

function fnCompareDataBlkFlds_kernel(NodeName, NewDOM) {
    var fldNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_DATA_BLOCKS[@ID='" + NodeName + "']/RAD_BLK_FIELDS");
    for (var item = 0;item < fldNode.length;item++) {
        var fldName = fldNode[item].getAttribute("ID");

        if (parent.relName == getNodeText(selectSingleNode(fldNode[item], "RELEASE_NAME"))) {
            fldNode[item].setAttribute("Action", "New");
            cmpflag++;
        }
        else {
            selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_DATA_BLOCKS[@ID='" + NodeName + "']").removeChild(fldNode[item]);
        }

        /*fnCompareFldProperties_kernel("RAD_FIELD_CUSTOM_ATTRS", NewDOM, fldNode[item]);
		fnCompareFldProperties_kernel("RAD_FIELD_EVENTS", NewDOM, fldNode[item]);
		fnCompareFldProperties_kernel("RAD_BIND_VARS", NewDOM, fldNode[item]);
		fnCompareFldProperties_kernel("RAD_RETURN_FIELDS", NewDOM, fldNode[item]);*/
    }
}

function fnCompareFldProperties_kernel(node, NewDOM, consBlkFlds) {

    var consFldProps = selectNodes(consBlkFlds, node);

    for (var i = 0;i < consFldProps.length;i++) {
        if (parent.relName == getNodeText(selectSingleNode(consFldProps[i], "RELEASE_NAME"))) {
            consFldProps[i].setAttribute("Action", "New");
        }
    }
}

function fnCompareBlockDataSources_kernel(consDatasrc, NewDOM) {

    var consBlkDS = selectNodes(consDatasrc, "BLK_DATASOURCES");
    var blkds = consBlkDS.length;
    if (blkds != 0) {
        for (var i = 0;i < blkds;i++) {
            if (parent.relName == getNodeText(selectSingleNode(consBlkDS[i], "RELEASE_NAME"))) {
                consBlkDS[i].setAttribute("Action", "New");
            }

        }
    }
}

function fnCompareSCREENS_vwChng_kernel(NewDOM) {
    var screenname = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS");

    for (i = 0;i < screenname.length;i++) {

        var NodeName = screenname[i].getAttribute("ID");
        if (parent.relName == getNodeText(selectSingleNode(screenname[i], "RELEASE_NAME"))) {
            screenname[i].setAttribute("Action", "New");
        }
        var scnt = fnCompareSCREENS_kernel(NodeName, NewDOM);
        if (scnt == 0) {
            selectSingleNode(NewDOM, "//RAD_KERNEL").removeChild(screenname[i]);
        }
    }
}

function fnCompareSCREENS_kernel(NodeName, NewDOM) {
    var HEADERNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/HEADER/RAD_TABS");
    var BODYNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/BODY/RAD_TABS");
    var FOOTERNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/FOOTER/RAD_TABS");
    var scnt = 0;
    //HEADER
    for (var item = 0;item < HEADERNode.length;item++) {
        cmpflag = 0;
        var fldName = HEADERNode[item].getAttribute("ID");
        if (parent.relName == getNodeText(selectSingleNode(HEADERNode[item], "RELEASE_NAME"))) {
            HEADERNode[item].setAttribute("Action", "New");
            scnt++;
            cmpflag++;
        }
        // SECTIONS START
        var fldNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/HEADER/RAD_TABS[@ID='" + fldName + "']/RAD_SECTIONS");
        for (var items = 0;items < fldNode.length;items++) {
            var fldNameP = fldNode[items].getAttribute("ID");
            if (parent.relName == getNodeText(selectSingleNode(fldNode[items], "RELEASE_NAME"))) {
                fldNode[items].setAttribute("Action", "New");
                scnt++;
                cmpflag++;
            }

            // PARTIOTIONS START
            var fldNodeP = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/BODY/RAD_TABS[@ID='" + fldName + "']/RAD_SECTIONS[@ID='" + fldNameP + "']/RAD_PARTITIONS");
            for (var itemP = 0;itemP < fldNodeP.length;itemP++) {
                if (parent.relName == getNodeText(selectSingleNode(fldNodeP[itemP], "RELEASE_NAME"))) {
                    fldNodeP[itemP].setAttribute("Action", "New");
                    scnt++;
                    cmpflag++;
                }
            }
            // PARTIOTIONS ENDS 
            if (cmpflag == 0) {
                selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/HEADER/RAD_TABS[@ID='" + fldName + "']").removeChild(fldNode[items]);
            }
            // SECTIONS ENDS
        }

        if (cmpflag == 0) {
            selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/HEADER").removeChild(HEADERNode[item]);
        }
    }
    if (cmpflag == 0) {
        var hnd = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/HEADER")[0];
        selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']").removeChild(hnd);
    }
    //BODY1
    for (var item = 0;item < BODYNode.length;item++) {
        cmpflag = 0;
        var fldName = BODYNode[item].getAttribute("ID");
        if (parent.relName == getNodeText(selectSingleNode(BODYNode[item], "RELEASE_NAME"))) {
            BODYNode[item].setAttribute("Action", "New");
            scnt++;
            cmpflag++;
        }
        // SECTIONS START
        var fldNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/BODY/RAD_TABS[@ID='" + fldName + "']/RAD_SECTIONS");
        for (var items = 0;items < fldNode.length;items++) {
            var fldNameP = fldNode[items].getAttribute("ID");
            if (parent.relName == getNodeText(selectSingleNode(fldNode[items], "RELEASE_NAME"))) {
                fldNode[items].setAttribute("Action", "New");
                scnt++;
                cmpflag++;
            }

            // PARTIOTIONS START 
            /*
			var fldNodeP = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/BODY/RAD_TABS[@ID='" +fldName +"']/RAD_SECTIONS[@ID='" +fldNameP +"']/RAD_PARTITIONS");
        for (var itemP = 0;itemP < fldNodeP.length;itemP++) {
            if (parent.relName == getNodeText(selectSingleNode(fldNodeP[itemP], "RELEASE_NAME"))) {
                fldNodeP[itemP].setAttribute("Action", "New");
                scnt++;
				cmpflag++;
            } 

        }*/
            // PARTIOTIONS ENDS 
            if (cmpflag == 0) {
                selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/BODY/RAD_TABS[@ID='" + fldName + "']").removeChild(fldNode[items]);
            }
            // SECTIONS ENDS
        }

        if (cmpflag == 0) {
            selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/BODY").removeChild(BODYNode[item]);
        }
    }
    if (cmpflag == 0) {
        var hnd = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/BODY")[0];
        selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']").removeChild(hnd);
    }

    //FOOTER 
    for (var item = 0;item < FOOTERNode.length;item++) {
        cmpflag = 0;
        var fldName = FOOTERNode[item].getAttribute("ID");
        if (parent.relName == getNodeText(selectSingleNode(FOOTERNode[item], "RELEASE_NAME"))) {
            FOOTERNode[item].setAttribute("Action", "New");
            scnt++;
            cmpflag++;
        }
        // SECTIONS START
        var fldNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/FOOTER/RAD_TABS[@ID='" + fldName + "']/RAD_SECTIONS");
        for (var items = 0;items < fldNode.length;items++) {
            var fldNameP = fldNode[items].getAttribute("ID");
            if (parent.relName == getNodeText(selectSingleNode(fldNode[items], "RELEASE_NAME"))) {
                fldNode[items].setAttribute("Action", "New");
                scnt++;
                cmpflag++;
            }

            // PARTIOTIONS START
            var fldNodeP = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/FOOTER/RAD_TABS[@ID='" + fldName + "']/RAD_SECTIONS[@ID='" + fldNameP + "']/RAD_PARTITIONS");
            for (var itemP = 0;itemP < fldNodeP.length;itemP++) {
                if (parent.relName == getNodeText(selectSingleNode(fldNodeP[itemP], "RELEASE_NAME"))) {
                    fldNodeP[itemP].setAttribute("Action", "New");
                    scnt++;
                    cmpflag++;
                }

            }
            // PARTIOTIONS ENDS 
            if (cmpflag == 0) {
                selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/FOOTER/RAD_TABS[@ID='" + fldName + "']").removeChild(fldNode[items]);
            }
            // SECTIONS ENDS
        }

        if (cmpflag == 0) {
            selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/FOOTER").removeChild(FOOTERNode[item]);
        }
    }
    if (cmpflag == 0) {
        var hnd = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/FOOTER")[0];
        selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']").removeChild(hnd);
    }
    return scnt;
}

function fnComparSeections_kernel(NodeName, NewDOM) {
    var HEADERNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/HEADER");
    var BODYNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/BODY");
    var FOOTERNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS[@ID='" + NodeName + "']/FOOTER");

    for (var item = 0;item < HEADERNode.length;item++) {
        var fldName = HEADERNode[item].getAttribute("ID");
        if (parent.relName == getNodeText(selectSingleNode(HEADERNode[item], "RELEASE_NAME"))) {
            HEADERNode[item].setAttribute("Action", "New");
        }

    }
    for (var item = 0;item < BODYNode.length;item++) {
        var fldName = BODYNode[item].getAttribute("ID");
        if (parent.relName == getNodeText(selectSingleNode(BODYNode[item], "RELEASE_NAME"))) {
            BODYNode[item].setAttribute("Action", "New");
        }

    }

    for (var item = 0;item < FOOTERNode.length;item++) {
        var fldName = FOOTERNode[item].getAttribute("ID");
        if (parent.relName == getNodeText(selectSingleNode(FOOTERNode[item], "RELEASE_NAME"))) {
            FOOTERNode[item].setAttribute("Action", "New");
        }

    }
}

function fnCompareFIELDS_vwChng_kernel(NewDOM) {
    var fieldsetname = selectNodes(NewDOM, "//RAD_KERNEL/RAD_FIELDSETS");

    for (i = 0;i < fieldsetname.length;i++) {
        cmpflag = 0;
        var NodeName = fieldsetname[i].getAttribute("ID");
        if (parent.relName == getNodeText(selectSingleNode(fieldsetname[i], "RELEASE_NAME"))) {
            fieldsetname[i].setAttribute("Action", "New");
            cmpflag++;
        }

        fnComparefieldsetfields_kernel(NodeName, NewDOM);
        if (cmpflag == 0) {
            selectSingleNode(NewDOM, "//RAD_KERNEL").removeChild(fieldsetname[i]);
        }
        /* fnCompareBlockDataSources(DataBlkNode[i], NewDOM);*/
    }
}

function fnComparefieldsetfields_kernel(NodeName, NewDOM) {
    var fldsetNode = selectNodes(NewDOM, "//RAD_KERNEL/RAD_FIELDSETS[@ID='" + NodeName + "']/FIELDSET_FIELDS");
    for (var item = 0;item < fldsetNode.length;item++) {
        var fldName = fldsetNode[item].getAttribute("ID");
        if (parent.relName == getNodeText(selectSingleNode(fldsetNode[item], "RELEASE_NAME"))) {
            fldsetNode[item].setAttribute("Action", "New");
            cmpflag++;
        }
        else {
            selectSingleNode(NewDOM, "//RAD_KERNEL/RAD_FIELDSETS[@ID='" + NodeName + "']").removeChild(fldsetNode[item]);
        }
    }
}

function fnCompareCallforms_vwChng_kernel(node, NewDOM) {
    var consNode = selectNodes(NewDOM, "//RAD_KERNEL/" + node);
    for (i = 0;i < consNode.length;i++) {
        cmpflag = 0;
        var NodeName = consNode[i].getAttribute("ID");
        if (parent.relName == getNodeText(selectSingleNode(consNode[i], "RELEASE_NAME"))) {
            consNode[i].setAttribute("Action", "New");
        }
        else {
            selectSingleNode(NewDOM, "//RAD_KERNEL").removeChild(consNode[i]);
        }

    }
}

function fnCompareLovs_vwChng_kernel(NewDOM) {

    var consLovs = selectNodes(NewDOM, "//RAD_KERNEL/RAD_LOVS");
    for (i = 0;i < consLovs.length;i++) {
        if (parent.relName == getNodeText(selectSingleNode(consLovs[i], "RELEASE_NAME"))) {
            consLovs[i].setAttribute("Action", "New");
        }
        else {
            selectSingleNode(NewDOM, "//RAD_KERNEL").removeChild(consLovs[i]);
        }

    }
}

function fnRemove_Screens(NewDOM) {
    var screenname = selectNodes(NewDOM, "//RAD_KERNEL/RAD_SCREENS");

    for (i = 0;i < screenname.length;i++) {
        selectSingleNode(NewDOM, "//RAD_KERNEL").removeChild(screenname[i]);
    }
}