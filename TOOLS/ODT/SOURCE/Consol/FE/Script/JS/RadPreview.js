/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadPreview.js
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

function showPreview(scr, fldloc) {

    var functionid = document.getElementsByName("FUNCTION_ID")[0].value;
    var fileSavePath = document.getElementsByName("FILE_SAVE_PATH")[0].value;
    fileSavePath = fileSavePath.substring(0, fileSavePath.length - 16);
    var DSO_PREVIEW = "";
    frompreview = "true";
    //amount field validatons start
    var tempbulkgenflag = bulkgenflag;
    bulkgenflag = "Y";
    //amount field validatons ends
    var uixml = transformDOMtoUIxml(dom);
    var engxml = fnSaveEngXml(fileSavePath, uixml, frompreview, "", parent.lang, "");
    var scrType = "";
    xml1 = engxml;
    bulkgenflag = tempbulkgenflag;//amount field validatons	
    if (scr != 'SUMMARY') {
        xml1 = loadXMLDoc(xml1);
        var btntyp = getNodeText(selectSingleNode(xml1, ("//FORM/SCREEN[@NAME='" + scr + "']/EXIT_BTN")));
        var tit = getNodeText(selectSingleNode(xml1, ("//FORM/SCREEN[@NAME='" + scr + "']/@TITLE")));
        scrType = getNodeText(selectSingleNode(xml1, ("//FORM/SCREEN[@NAME='" + scr + "']/@TMP_SCR_TYPE")));
    }
    else if (scr == 'SUMMARY') {
        xml1 = loadXMLDoc(xml1);
        if (selectSingleNode(xml1, ("//FORM/SUMMARY/@TITLE"))) {
            var tit = getNodeText(selectSingleNode(xml1, ("//FORM/SUMMARY/@TITLE")));
        }
        else {
            var tit = "Summary";
        }
    }
    var DSO_PREVIEW = xml1;
    var theme = "/Theme/Sky.css";
    DSO_PREVIEW = getXMLString(xml1);

    var screen = scr;
    var btntyp = btntyp;
    var clickedid = "";
    if (fldloc != undefined) {

        var fldDataTyp = getNodeText(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + clickedobjects[2] + "']/DATATYPE"));
        var fldDisTyp = getNodeText(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + clickedobjects[2] + "']/DISPLAY_TYPE"));
        if (fldDisTyp == "DATE" || fldDisTyp == "AMOUNT" || fldDisTyp == "DATETIME")
            clickedobjects[2] += "I";
        if (fldDataTyp == "NUMBER")
            clickedobjects[2] += "I";
    }
    var fieldid = clickedobjects[1] + "__" + clickedobjects[2];
    if (fldloc)
        var fldloc = fldloc;

    previewfldloc = fldloc;
    previewfieldid = fieldid;

    if (scr == 'SUMMARY') {
        var summary = 'SUMMARY';
    }
    parent.uixmlPreview = xml1;
    if (parent.dataXmlFlg == 'Y') {
        var dataxml = fnReadMode("", "D:\\fcj\\dataxml\\" + functionid + ".xml", "");
        prepareDataUIXML(dataxml, xml1);
    }

    parent.previewscreenType = scrType;
    try {
        loadPreviewScreenDIV("ChildWin", 'RadPreview.jsp?title=' + tit + '&function_id=' + functionid + '&ScreenName=' + scr, scrType);
    }
    catch (e) {

    }

}

var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
var multipleEntryCellsWidth = new Array();
var multipleEntryHeaderCellsWidth = new Array();

function fnBuildMultipleEntryIDsArray(uiXmlDom) {
    var screenName = parent.screen;

    var l_blkNodes = selectNodes(uiXmlDom, "//SCREEN/BODY/TAB/SECTION/PART/FLDSET[@TYPE='ME' and @VIEW='ME']");
    for (var bItr = 0;bItr < l_blkNodes.length;bItr++) {
        multipleEntryIDs[bItr] = l_blkNodes[bItr].getAttribute("ID");
    }
}

function toggleSelectBoxes(tableDivContainer, tableHeader) {
    if (!tableDivContainer || !tableHeader) {
        return;
    }
    var selectBoxes = tableDivContainer.getElementsByTagName('select');
    if (!selectBoxes) {
        return;
    }
    for (var i = 0;i < selectBoxes.length;i++) {
        if (tableDivContainer.scrollTop > eval(selectBoxes[i].parentNode.offsetTop - tableHeader.offsetHeight)) {
            selectBoxes[i].style.visibility = 'hidden';
        }
        else {
            selectBoxes[i].style.visibility = 'visible';
        }
    }
}

function DisableFormControls(gotoField) {
    var objControls = document.getElementById("ResTree").getElementsByTagName("TABLE");
    for (var i = 0;i < objControls.length;i++) {
        objControls[i].setAttribute("onclick", "", 0);
        objControls[i].setAttribute("onmousemove", "", 0);
        objControls[i].setAttribute("onmouseup", "", 0);
        objControls[i].setAttribute("onmousedown", "", 0);
    }

    objControls = document.getElementById("ResTree").getElementsByTagName("INPUT");

    for (var i = 0;i < objControls.length;i++) {

        if (objControls[i].type != "hidden") {
            objControls[i].setAttribute("onpropertychange", "", 0);
            objControls[i].setAttribute("onclick", "", 0);
            objControls[i].setAttribute("onblur", "", 0);
            objControls[i].setAttribute("onchange", "", 0);
            objControls[i].setAttribute("oncontextmenu", "", 0);
            objControls[i].setAttribute("onactivate", "", 0);
            objControls[i].setAttribute("onbeforedeactivate", "", 0);
            if (gotoField) {

                //objControls[i].setAttribute("ondblclick", "fnGoToField(this, event)");
                objControls[i].ondblclick = function () {
                    event.data = "preview";
                    fnGoToField(this, event)
                };

            }
        }
    }

    var objControls = document.getElementById("ResTree").getElementsByTagName("SELECT");
    if (gotoField) {
        for (var i = 0;i < objControls.length;i++) {
            //objControls[i].setAttribute("ondblclick", "fnGoToField(this, event)");
            objControls[i].ondblclick = function () {
                event.data = "preview";
                fnGoToField(this, event)
            };

        }
    }

    var objControls = document.getElementById("ResTree").getElementsByTagName("BUTTON");
    for (var i = 0;i < objControls.length;i++) {
        if (objControls[i].title != "$expand_section" && objControls[i].title != "$collapse_section") {
            objControls[i].setAttribute("onclick", "", 0);
            objControls[i].setAttribute("oncontextmenu", "", 0);
            if (gotoField) {
                //objControls[i].setAttribute("ondblclick", "fnGoToField(this, event)");
                objControls[i].ondblclick = function () {
                    fnGoToField(this, event)
                };

            }
        }
    }

    var objControls = document.getElementById("ResTree").getElementsByTagName("TEXTAREA");
    for (var i = 0;i < objControls.length;i++) {
        objControls[i].setAttribute("onclick", "", 0);
        objControls[i].setAttribute("oncontextmenu", "", 0);
        if (gotoField) {
            //objControls[i].setAttribute("ondblclick", "fnGoToField(this, event)");
            objControls[i].ondblclick = function () {
                fnGoToField(this, event)
            };
        }
    }

    var callform = document.getElementsByName("DIVSubSystem")[0];
    if (callform) {

        var btn = document.getElementsByName("DIVSubSystem")[0].getElementsByTagName("li")[0];
        for (var i = 0;i < btn.length;i++) {
            btn[i].getElementsByTagName("a")[0].setAttribute("onclick", "", 0);
        }
    }

    var callform = document.getElementsByName("DIV_SUBSCR_CALLFORM")[0];
    if (callform) {
        var callformTable = callform.getElementsByTagName("TABLE")[0];
        var objControls = callformTable.tBodies[0].rows;
        for (var i = 0;i < objControls.length;i++) {
            var objControl = objControls[i].getElementsByTagName("TD");
            for (var j = 0;j < objControl.length;j++) {
                objControl[j].setAttribute("onclick", "", 0);
                objControl[j].setAttribute("oncontextmenu", "", 0);
            }
        }
    }
    var summaryBtnsTable = document.getElementsByName("SUMMARY_BTNS")[0];
    if (summaryBtnsTable) {
        var objControls = summaryBtnsTable.tBodies[0].rows;
        for (var i = 0;i < objControls.length;i++) {
            var objControl = objControls[i].getElementsByTagName("TD");
            for (var j = 0;j < objControl.length;j++) {
                objControl[j].setAttribute("onclick", "", 0);
                objControl[j].setAttribute("oncontextmenu", "", 0);
            }
        }
    }
}

function prepareDataUIXML(dataxml, puixml) {
    var partionNode = new Array();
    partionNode[0] = 'HEADER';
    partionNode[1] = 'BODY';
    partionNode[2] = 'FOOTER';
    dataxml = loadXMLDoc(dataxml);
    var l_screen = selectNodes(puixml, "//SCREEN");

    for (var s = 0;s < l_screen.length;s++) {

        var l_ScreenId = l_screen[s].getAttribute("NAME");
        for (var p = 0;p < partionNode.length;p++) {
            var l_tab = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB");
            for (var a = 0;a < l_tab.length;a++) {

                var l_TabName = l_tab[a].getAttribute("ID");

                var l_section = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION");

                //var l_section = selectNodes(puixml,"//SECTION");
                for (i = 0;i < l_section.length;i++) {
                    var NodeName = l_section[i].getAttribute("ID");
                    var l_part = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART");
                    for (j = 0;j < l_part.length;j++) {
                        var partNodeName = l_part[j].getAttribute("ID");
                        var l_fldset = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET");
                        for (k = 0;k < l_fldset.length;k++) {

                            var fldsetNodeName = l_fldset[k].getAttribute("ID");
                            var fldsetType = l_fldset[k].getAttribute("TYPE");
                            var blockName = getNodeText(selectSingleNode(l_fldset[k], "BLOCK"));
                            if (fldsetType != "ME") {

                                var l_fields = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD");

                                var l_count =  - 1;
                                var l_row = 'Y';
                                for (var l = 0;l < l_fields.length;l++) {

                                    var fieldName = getNodeText(selectSingleNode(l_fields[l], "NAME"));
                                    var htmlType = getNodeText(selectSingleNode(l_fields[l], "TYPE"));
                                    if (fldsetType != "ME") {
                                        var fiedValue = "";
                                        if (selectSingleNode(dataxml, "//" + blockName + "/" + fieldName) != null) {
                                            fiedValue = getNodeText(selectSingleNode(dataxml, "//" + blockName + "/" + fieldName));
                                            if (fiedValue != "") {
                                                var bodyNode = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD")[l];
                                                var tempNode = puixml.createElement("PRE_VAL");
                                                bodyNode.appendChild(tempNode);
                                                setNodeText(selectSingleNode(selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD")[l], "PRE_VAL"), fiedValue);
                                                var selectHtml = "";
                                                if (htmlType == "SELECT") {

                                                    //selectHtml = selectNodes(puixml,"//SCREEN[@NAME='" + l_ScreenId + "']/"+partionNode[p]+"/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD/OPTION");
                                                    selectHtml = selectNodes((selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD")[l]), "OPTION");
                                                    for (t = 0;t < selectHtml.length;t++) {
                                                        var htmlVal = selectHtml[t].getAttribute("VALUE");
                                                        if (htmlVal == fiedValue) {
                                                            selectHtml[t].setAttribute("SELECTED", "-1");

                                                        }
                                                        else {
                                                            selectHtml[t].setAttribute("SELECTED", "0");
                                                        }
                                                    }

                                                }
                                                else if (htmlType == "RADIO") {

                                                    //selectHtml = selectNodes(puixml,"//SCREEN[@NAME='" + l_ScreenId + "']/"+partionNode[p]+"/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD")[l];
                                                    selectHtml = selectNodes((selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD")[l]), "OPTION");
                                                    //var selectRadioOpt = selectNodes(selectHtml,"//OPTION");
                                                    for (t = 0;t < selectHtml.length;t++) {
                                                        //var htmlVal = selectHtml[t].getAttribute("VALUE");
                                                        var htmlVal = getNodeText(selectSingleNode(selectHtml[t], "VALUE"));
                                                        if (htmlVal == fiedValue) {

                                                            //selectHtml[t].setAttribute("SELECTED","-1");
                                                            setNodeText(selectSingleNode(selectHtml[t], "SELECTED"), "-1");

                                                        }
                                                        else {
                                                            //selectHtml[t].setAttribute("SELECTED","0");
                                                            setNodeText(selectSingleNode(selectHtml[t], "SELECTED"), "0");
                                                        }
                                                    }

                                                }
                                                else if (htmlType == "CHECKBOX") {
                                                    selectHtml = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD")[l];

                                                    if (fiedValue == "Y") {
                                                        setNodeText(selectSingleNode(selectHtml, "CHECKED"), "-1");
                                                    }

                                                }

                                            }
                                        }

                                    }

                                }

                            }
                            else {
                                l_dataBlock = selectNodes(dataxml, "//" + blockName);
                                var l_dataRow = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/DATA_ROWNO");
                                for (var d = 0;d < l_dataRow.length;d++) {
                                    var g_dataRow = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/DATA_ROWNO[@ID='" + d + "']/FIELD");
                                    for (var g = 0;g < g_dataRow.length;g++) {
                                        fieldName = getNodeText(selectSingleNode(g_dataRow[g], "NAME"));
                                        fiedValue = getNodeText(selectSingleNode(l_dataBlock[d], fieldName));
                                        //var bodyNode= selectNodes(puixml,"//SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/FIELD")[l];                                                                                                                   
                                        var bodyNode = selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/DATA_ROWNO[@ID='" + d + "']/FIELD")[g];
                                        var tempNode = puixml.createElement("PRE_VAL");
                                        bodyNode.appendChild(tempNode);
                                        setNodeText(selectSingleNode(selectNodes(puixml, "//SCREEN[@NAME='" + l_ScreenId + "']/" + partionNode[p] + "/TAB[@ID='" + l_TabName + "']/SECTION[@ID='" + NodeName + "']/PART[@ID='" + partNodeName + "']/FLDSET[@ID='" + fldsetNodeName + "']/DATA_ROWNO[@ID='" + d + "']/FIELD")[g], "PRE_VAL"), fiedValue);
                                    }

                                }
                            }

                        }

                    }
                }

            }
        }
    }
}