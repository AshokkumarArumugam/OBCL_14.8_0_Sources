/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadTree.js
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

var openImg = new Image();
openImg.src = "Images/Minus.gif";
var closedImg = new Image();
closedImg.src = "Images/Plus.gif";

var dataSoureName = parent.jndiName;
var selectedval = "";
var tableName = "";
var pkCols = "";
var element = "";
var elementval = "";
var changesDOM = "";
var attr = "";
var ctrlStrng = "";
var ctrlFncId = "";
var ctrlrwIndx = "";
var calFrmName = "";
var scrArg = "";
var calFrmArgs = "";
var lcfrm = "";
var read = "";
var dbColumsArry = new Array();
var glblDataSrcCount = 0;
var glblDataSrcColsCount = new Array();

var glblScrCount = 0;
var glblScrHeaderTabCount = new Array();
var glblScrHeaderTabSecCount = new Array(100);
for (var i = 0;i < glblScrHeaderTabSecCount.length;i++) {
    glblScrHeaderTabSecCount[i] = new Array(100);
}
var glblScrBdyTabCount = new Array();
var glblScrBdyTabSecCount = new Array(100);
for (var i = 0;i < glblScrBdyTabSecCount.length;i++) {
    glblScrBdyTabSecCount[i] = new Array(100);
}
var glblScrFooterTabCount = new Array();
var glblScrFooterTabSecCount = new Array(100);
for (var i = 0;i < glblScrFooterTabSecCount.length;i++) {
    glblScrFooterTabSecCount[i] = new Array(100);
}
var glblBlkCount = 0;
var glblBlkRADFieldsCount = new Array();

var glblFldsetCount = 0;
var glblLovCount = 0;
var chkDelDataSrc = false;
var chkDelDataSrcFld = false;

function reInitVariables() {
    glblDataSrcCount = 0;
    glblScrCount = 0;
    glblBlkCount = 0;
    glblFldsetCount = 0;
    glblDataSrcColsCount = new Array();
    glblScrHeaderTabCount = new Array();
    glblScrHeaderTabSecCount = new Array(100);
    for (var i = 0;i < glblScrHeaderTabSecCount.length;i++) {
        glblScrHeaderTabSecCount[i] = new Array(100);
    }
    glblScrBdyTabCount = new Array();
    glblScrBdyTabSecCount = new Array(100);

    for (var i = 0;i < glblScrBdyTabSecCount.length;i++) {
        glblScrBdyTabSecCount[i] = new Array(100);
    }
    glblScrFooterTabCount = new Array();
    glblScrFooterTabSecCount = new Array(100);
    for (var i = 0;i < glblScrFooterTabSecCount.length;i++) {
        glblScrFooterTabSecCount[i] = new Array(100);
    }
    glblBlkRADFieldsCount = new Array();
    // order correction variables
    fldsetOrder = new Array();
    fldsetOrderNo = new Array();
    scrTabOrder = new Array();
    scrTabOrderNo = new Array();
    scrSecOrder = new Array();
    scrSecOrderNo = new Array();
    blkFldOrder = new Array();
    blkFldOrderNo = new Array();
	blkFldAttrOrder = new Array();
    blkFldAttrOrderNo = new Array();
}

function createTree() {
    var divobject = document.getElementById("treebody");
    var bodyContent = "";

    var dsname = dom.getElementsByTagName("RAD_DATASOURCES");
    var screens = dom.getElementsByTagName("RAD_SCREENS");
    var Blocks = dom.getElementsByTagName("RAD_DATA_BLOCKS");
    var Fldsets = dom.getElementsByTagName("RAD_FIELDSETS");
    var Lovs = dom.getElementsByTagName("RAD_LOVS");
    var summary = dom.getElementsByTagName("RAD_SUMMARY");
    var menuDtls = dom.getElementsByTagName("RAD_MENU_DTLS");

    glblDataSrcCount = dsname.length;
    glblScrCount = screens.length;
    glblBlkCount = Blocks.length;
    glblFldsetCount = Fldsets.length;
    glblLovCount = Lovs.length;

    var DataSourceContentOld = "";
    var ScreensContentOld = "";
    var SectionContentOld = "";
    var TabContentOld = "";
    var BlocksContentOld = "";
    var FldSetContentOld = "";
    var LovContentOld = "";

    bodyContent = '';
    bodyContent = "<ul id='ulTreeMenu' class='TreeView'>";

    bodyContent += "<li id=\"li_MND\" noDrag=\"true\" noChildren=\"true\">";
    bodyContent += "<a  href=\"javaScript:getNodeDetails('MND'); \" id='TMND' class='parentNode' name=\"TMND\" >Preferences</a>";
    bodyContent += "</li>";

    bodyContent += "<li id=\"li_DSN\" noDrag=\"true\">";
    bodyContent += "<a href=\"javaScript:getNodeDetails('DSN');\" class=\"parentNode\" id='TDSN' class='parentNode' name=\"TDSN\" oncontextmenu=\"createMenu('DSN',event);getNodeDetails('DSN');\" >DataSource</a>";
    bodyContent += "<ul id ='ULDSN' class='Fields' name='details' >";

    for (var i = 0;i < dsname.length;i++) {
        var value = getNodeText(selectSingleNode(dsname[i], "DATASRC_NAME"));
        var DataSourceContent = "";
        var dsnNameValue = "DSN" + "~" + value;
        DataSourceContent += "<li id=li_" + dsnNameValue + " noDrag=\"true\">";
        DataSourceContent += "<a  href=\"javaScript:getNodeDetails('" + dsnNameValue + "');\" class=\"parentNode\" id='" + dsnNameValue + "' name='" + dsnNameValue + "' oncontextmenu=\"createMenu('" + dsnNameValue + "',event);getNodeDetails('" + dsnNameValue + "'); \" />";
        DataSourceContent += value;
        DataSourceContent += "</a>";
        DataSourceContent += "<ul id ='" + "UL" + dsnNameValue + "' class='Fields' name='details'>";
        glblDataSrcColsCount[i] = dsname[i].getElementsByTagName("RAD_FIELDS").length;
        for (var j = 0;j < dsname[i].childNodes.length;j++) {
            if (dsname[i].childNodes[j].nodeName == "RAD_FIELDS") {
                var fieldvalue = getNodeText(selectSingleNode(dsname[i].childNodes[j], "COLUMN_NAME"));
                var dsnFieldName = "DSN" + "~" + value + "~" + fieldvalue;
                DataSourceContent += "<li id=li_" + dsnFieldName + " noDrag=\"true\" noChildren=\"true\">";
                DataSourceContent += "<a  href=\"javaScript:getNodeDetails('" + dsnFieldName + "');\" class=\"parentNode\" id='" + dsnFieldName + "' name='" + dsnFieldName + "' oncontextmenu=\"createMenu('" + dsnFieldName + "',event); \" />";
                DataSourceContent += fieldvalue;
                DataSourceContent += "</a>";
                DataSourceContent += "</li>";
            }
        }
        DataSourceContent += "</ul>";
        DataSourceContent += "</li>";
        DataSourceContentOld = DataSourceContentOld + DataSourceContent;
    }

    bodyContent = bodyContent + DataSourceContentOld + "</ul></li>";

    bodyContent += "<li id=\"li_LOV\" noDrag=\"true\">";
    bodyContent += "<a  href=\"javaScript:getNodeDetails('LOV'); \" id='TLOV' class='parentNode' name=\"TLOV\" oncontextmenu=\"createMenu('LOV',event); \">ListOfValues</a>";
    bodyContent += "<ul id ='ULLOV' class='Fields' name='details'>";

    for (var i = 0;i < Lovs.length;i++) {
        var value = getNodeText(selectSingleNode(Lovs[i], "LOV_NAME"));
        var LovContent = "";
        var lovNameValue = "LOV" + "~" + value;
        LovContent += "<li id=li_" + lovNameValue + " noDrag=\"true\" noChildren=\"true\">";
        LovContent += "<a  href=\"javaScript:getNodeDetails('" + lovNameValue + "');\" class=\"parentNode\" id='" + lovNameValue + "' name='" + lovNameValue + "' oncontextmenu=\"createMenu('" + lovNameValue + "',event);getNodeDetails('" + lovNameValue + "'); \" />";
        LovContent += value;
        LovContent += "</a>";
        LovContent += "</li>";
        LovContentOld = LovContentOld + LovContent;
    }

    bodyContent += LovContentOld + "</ul></li>";

    bodyContent += "<li id=\"li_BLK\" noDrag=\"true\">";
    bodyContent += "<a href=\"javaScript:getNodeDetails('BLK'); \" id='TBLK' class='parentNode' name=\"TBLK\" oncontextmenu=\"createMenu('BLK',event); \">DataBlocks</a>";
    bodyContent += "<ul id ='ULBLK' class='Fields' name='details'>";

    for (var i = 0;i < Blocks.length;i++) {

        var blkvalue = getNodeText(selectSingleNode(Blocks[i], "BLOCK_NAME"));
        var BlocksContent = "";
        var blknameValue = "BLK" + "~" + blkvalue;
        BlocksContent += "<li id=li_" + blknameValue + ">";
        BlocksContent += "<a  href=\"javaScript:getNodeDetails('" + blknameValue + "');\" class=\"parentNode\" id='" + blknameValue + "' name='" + blknameValue + "' oncontextmenu=\"createMenu('" + blknameValue + "',event);getNodeDetails('" + blknameValue + "'); \" />";
        BlocksContent += blkvalue;
        BlocksContent += "</a>";

        BlocksContent += "<ul id ='" + "UL" + blknameValue + "' class='Fields' name='details'>";
        glblBlkRADFieldsCount[i] = Blocks[i].getElementsByTagName("RAD_BLK_FIELDS").length;

        for (var j = 0;j < Blocks[i].childNodes.length;j++) {
            if (Blocks[i].childNodes[j].nodeName == "RAD_BLK_FIELDS") {
                var fieldvalue = getNodeText(selectSingleNode(Blocks[i].childNodes[j], "FIELD_NAME"));
                var nameValueField = "BLK" + "~" + blkvalue + "~" + fieldvalue;
                BlocksContent += "<li id=li_" + nameValueField + " noChildren=\"true\">";
                BlocksContent += "<a href=\"javaScript:getNodeDetails('" + nameValueField + "');\" class=\"parentNode\" id='" + nameValueField + "' name='" + nameValueField + "' oncontextmenu=\"createMenu('" + nameValueField + "',event); \" />";
                BlocksContent += fieldvalue;
                BlocksContent += "</a>";
                BlocksContent += "</li>";
            }
        }
        BlocksContent += "</ul>";
        BlocksContent += "</li>";
        BlocksContentOld = BlocksContentOld + BlocksContent;
    }

    bodyContent += BlocksContentOld + "</ul></li>";

    bodyContent += "<li id=\"li_SCR\" noDrag=\"true\">";
    bodyContent += "<a  href=\"javaScript:getNodeDetails('SCR'); \" id='TSCR' class='parentNode' name=\"TSCR\" oncontextmenu=\"createMenu('SCR',event); \" >Screens</a>";
    bodyContent += "<ul id ='ULSCR' class='Fields' name='details' rel=\"closed\">";
    for (var i = 0;i < screens.length;i++) {
        var value = getNodeText(selectSingleNode(screens[i], "SCREEN_NAME"));
        var ScreensContent = "";
        var scrNameValue = "SCR" + "~" + value;
        ScreensContent += "<li id=li_" + scrNameValue + " noDrag=\"true\">";
        ScreensContent += "<a href=\"javaScript:getNodeDetails('" + scrNameValue + "');\" class=\"parentNode\" id='" + scrNameValue + "' name='" + scrNameValue + "' oncontextmenu=\"createMenu('" + scrNameValue + "',event);getNodeDetails('" + scrNameValue + "'); \" />";
        ScreensContent += value;
        ScreensContent += "</a>";
        ScreensContent += "<ul id ='" + "UL" + scrNameValue + "' class='Fields' name='details' rel=\"closed\">";

        if (screens[i].getElementsByTagName("HEADER").length >= 1)
            glblScrHeaderTabCount[i] = screens[i].getElementsByTagName("HEADER")[0].getElementsByTagName("RAD_TABS").length;
        if (screens[i].getElementsByTagName("BODY").length >= 1)
            glblScrBdyTabCount[i] = screens[i].getElementsByTagName("BODY")[0].getElementsByTagName("RAD_TABS").length;
        if (screens[i].getElementsByTagName("FOOTER").length >= 1)
            glblScrFooterTabCount[i] = screens[i].getElementsByTagName("FOOTER")[0].getElementsByTagName("RAD_TABS").length;

        if (screens[i].getElementsByTagName("HEADER").length >= 1) {
            for (var j = 0;j < screens[i].getElementsByTagName("HEADER")[0].getElementsByTagName("RAD_TABS").length;j++) {
                glblScrHeaderTabSecCount[i][j] = screens[i].getElementsByTagName("HEADER")[0].getElementsByTagName("RAD_TABS")[j].getElementsByTagName("RAD_SECTIONS").length;
            }
        }
        if (screens[i].getElementsByTagName("BODY").length >= 1) {
            for (var j = 0;j < screens[i].getElementsByTagName("BODY")[0].getElementsByTagName("RAD_TABS").length;j++) {
                glblScrBdyTabSecCount[i][j] = screens[i].getElementsByTagName("BODY")[0].getElementsByTagName("RAD_TABS")[j].getElementsByTagName("RAD_SECTIONS").length;
            }
        }
        if (screens[i].getElementsByTagName("FOOTER").length >= 1) {
            for (var j = 0;j < screens[i].getElementsByTagName("FOOTER")[0].getElementsByTagName("RAD_TABS").length;j++) {
                glblScrFooterTabSecCount[i][j] = screens[i].getElementsByTagName("FOOTER")[0].getElementsByTagName("RAD_TABS")[j].getElementsByTagName("RAD_SECTIONS").length;
            }
        }
        for (var j = 0;j < screens[i].childNodes.length;j++) {

            if (screens[i].childNodes[j].nodeName == "HEADER" || screens[i].childNodes[j].nodeName == "BODY" || screens[i].childNodes[j].nodeName == "FOOTER") {
                var ScreensecName = "";
                if (screens[i].childNodes[j].nodeName == "HEADER") {
                    ScreensecName = "HEADER";
                }
                else if (screens[i].childNodes[j].nodeName == "BODY") {
                    ScreensecName = "BODY";

                }
                else {
                    ScreensecName = "FOOTER";
                }
                ScreensContent += "<li id=\"li_" + ScreensecName + "\" noDrag=\"true\">";
                var scrPortValue = "SCR" + "~" + value + "~" + ScreensecName;
                var screenPortion = ScreensecName + i;
                ScreensContent += "<a href=\"javaScript:getNodeDetails('" + scrPortValue + "');\" class=\"parentNode\" id='" + scrPortValue + "' name='" + scrPortValue + "' oncontextmenu=\"createMenu('" + scrPortValue + "',event); \" />";
                ScreensContent += ScreensecName;
                ScreensContent += "</a>";
                ScreensContent += "<ul id ='" + "UL" + scrPortValue + "' class='Fields' name='details' rel=\"closed\">";

                for (var m = 0;m < screens[i].childNodes[j].childNodes.length;m++) {
                    if (screens[i].childNodes[j].childNodes[m].nodeName == "RAD_TABS") {
                        var tabvalue = getNodeText(selectSingleNode(screens[i].childNodes[j].childNodes[m], "TAB_NAME"));
                        var nameValueTab = "SCR" + "~" + value + "~" + ScreensecName + "~" + tabvalue;
                        ScreensContent += "<li id=li_" + nameValueTab + ">";
                        ScreensContent += "<a  href=\"javaScript:getNodeDetails('" + nameValueTab + "');\" class=\"parentNode\" id='" + nameValueTab + "' name='" + nameValueTab + "' oncontextmenu=\"createMenu('" + nameValueTab + "',event); \" />";
                        ScreensContent += tabvalue;
                        ScreensContent += "</a>";
                        ScreensContent += "<ul id ='" + "UL" + nameValueTab + "' class='Fields' name='details' rel=\"closed\">";

                        for (var k = 0;k < screens[i].childNodes[j].childNodes[m].childNodes.length;k++) {
                            if (screens[i].childNodes[j].childNodes[m].childNodes[k].nodeName == "RAD_SECTIONS") {

                                var SecName = getNodeText(selectSingleNode(screens[i].childNodes[j].childNodes[m].childNodes[k], "SECTION_NAME"));
                                var sectionContent = "";
                                var nameValueSec = "SCR" + "~" + value + "~" + ScreensecName + "~" + tabvalue + "~" + SecName;
                                ScreensContent += "<li id=li_" + nameValueSec + " noChildren=\"true\">";
                                ScreensContent += "<a  href=\"javaScript:getNodeDetails('" + nameValueSec + "');\" class=\"parentNode\" id='" + nameValueSec + "' name='" + nameValueSec + "' oncontextmenu=\"createMenu('" + nameValueSec + "',event); \" />";
                                ScreensContent += SecName;
                                ScreensContent += "</a>";
                                ScreensContent += "</li>";

                            }
                        }
                        ScreensContent += "</ul>";
                        ScreensContent += "</li>";
                    }
                }
                ScreensContent += "</ul>";
                ScreensContent += "</li>";

            }

        }
        ScreensContent += "</ul>";
        ScreensContent += "</li>";
        ScreensContentOld = ScreensContentOld + ScreensContent;
    }

    bodyContent = bodyContent + ScreensContentOld + "</ul></li>";

    bodyContent += "<li id=\"li_FLD\" noDrag=\"true\">";
    bodyContent += "<a  href=\"javaScript:getNodeDetails('FLD'); \" id='TFLD' class='parentNode' name=\"TFLD\" oncontextmenu=\"createMenu('FLD',event); \">FieldSets</a>";
    bodyContent += "<ul id ='ULFLD' class='Fields' name='details' rel=\"closed\">";

    for (var i = 0;i < Fldsets.length;i++) {
        var value = getNodeText(selectSingleNode(Fldsets[i], "FIELDSET_NAME"));
        var FldSetContent = "";
        var fldNameValue = "FLD" + "~" + value;
        FldSetContent += "<li id=li_" + fldNameValue + " noChildren=\"true\">";
        FldSetContent += "<a  href=\"javaScript:getNodeDetails('" + fldNameValue + "');\" class=\"parentNode\" id='" + fldNameValue + "' name='" + fldNameValue + "' oncontextmenu=\"createMenu('" + fldNameValue + "',event);getNodeDetails('" + fldNameValue + "'); \" />";
        FldSetContent += value;
        FldSetContent += "</a>";
        FldSetContent += "</li>";
        FldSetContentOld = FldSetContentOld + FldSetContent;
    }

    bodyContent += FldSetContentOld + "</ul></li>";

    bodyContent += "<li id=\"li_ACT\" noDrag=\"true\" noChildren=\"true\">";
    bodyContent += "<a  href=\"javaScript:getNodeDetails('ACT'); \" id='TACT' class='parentNode' name=\"TACT\">Actions</a>";
    bodyContent += "</li>";

    bodyContent += "<li id=\"li_CFM\" noDrag=\"true\" noChildren=\"true\">";
    bodyContent += "<a  href=\"javaScript:getNodeDetails('CFM'); \" id='TCFM' class='parentNode' name=\"TCFM\">CallForms</a>";
    bodyContent += "</li>";

    bodyContent += "<li id=\"li_LFM\" noDrag=\"true\" noChildren=\"true\">";
    bodyContent += "<a  href=\"javaScript:getNodeDetails('LFM'); \" id='TLFM' class='parentNode' name=\"TLFM\">LaunchForms</a>";
    bodyContent += "</li>";

    bodyContent += "<li id=\"li_SUM\" noDrag=\"true\" noChildren=\"true\">";
    bodyContent += "<a  href=\"javaScript:getNodeDetails('SUM'); \" id='TSUM' class='parentNode' name=\"TSUM\" oncontextmenu=\"createMenu('SUM',event)\" >Summary</a>";
    bodyContent += "</li>";

    bodyContent += "</ul>";
    divobject.innerHTML = "";
    divobject.innerHTML = bodyContent;
    fnPopulateCommon();
    if (parent.vwChg == "Y")
        fnsetTreeColor(divobject);
    paintTreeMenu();

}

function updateTreeAfterAdd(element) {

    var dsname = dom.getElementsByTagName("RAD_DATASOURCES");
    var screens = dom.getElementsByTagName("RAD_SCREENS");
    var Blocks = dom.getElementsByTagName("RAD_DATA_BLOCKS");
    var Fldsets = dom.getElementsByTagName("RAD_FIELDSETS");
    var Lovs = dom.getElementsByTagName("RAD_LOVS");
    var summary = dom.getElementsByTagName("RAD_SUMMARY");
    var menuDtls = dom.getElementsByTagName("RAD_MENU_DTLS");

    if (element.split("~")[0] == "DSN") {
        levelsCount = element.split("~");
        if (levelsCount.length == 1) {
            if (dsname.length > glblDataSrcCount) {
                var value = getNodeText(selectSingleNode(dsname[dsname.length - 1], "DATASRC_NAME"));
                var DataSourceContent = "";
                var dsnNameValue = "DSN" + "~" + value;
                DataSourceContent += "<li id=li_" + dsnNameValue + " noDrag=\"true\">";
                DataSourceContent += "<a  href=\"javaScript:getNodeDetails('" + dsnNameValue + "');\" class=\"parentNode\" id='" + dsnNameValue + "' name='" + dsnNameValue + "' oncontextmenu=\"createMenu('" + dsnNameValue + "',event);getNodeDetails('" + dsnNameValue + "'); \" />";
                DataSourceContent += value;
                DataSourceContent += "</a>";
                DataSourceContent += "<ul id ='" + "UL" + dsnNameValue + "' class='Fields' name='details' rel=\"closed\">";
                DataSourceContent += "</ul>";
                DataSourceContent += "</li>";
                var dataSrcHTML = document.getElementById("ULDSN").innerHTML;
                document.getElementById("ULDSN").innerHTML = dataSrcHTML + DataSourceContent;
                glblDataSrcCount = dsname.length;
                document.getElementById("ULDSN").style.display = "block";

            }

        }
        else if (levelsCount.length == 2) {
            var radFldCntr = 0;
            var fldsDiff = 0;
            for (var i = 0;i < dsname.length;i++) {
                if (glblDataSrcColsCount[i] == undefined || dsname[i].getElementsByTagName("RAD_FIELDS").length > glblDataSrcColsCount[i]) {
                    if (glblDataSrcColsCount[i] == undefined) {
                        fldsDiff = dsname[i].getElementsByTagName("RAD_FIELDS").length;
                    }
                    else {
                        fldsDiff = dsname[i].getElementsByTagName("RAD_FIELDS").length - glblDataSrcColsCount[i];
                    }
                    for (var j = 0;j < dsname[i].childNodes.length;j++) {
                        if (dsname[i].childNodes[j].nodeName == "RAD_FIELDS") {
                            radFldCntr = radFldCntr + 1;
                            if (radFldCntr == dsname[i].getElementsByTagName("RAD_FIELDS").length - (fldsDiff - 1)) {
                                fldsDiff = fldsDiff - 1;
                                var fieldvalue = getNodeText(selectSingleNode(dsname[i].childNodes[j], "COLUMN_NAME"));
                                var dsnFieldName = element + "~" + fieldvalue;
                                var DataSourceColumnContent = "<li id=li_" + dsnFieldName + " noDrag=\"true\" noChildren=\"true\">";
                                DataSourceColumnContent += "<a   href=\"javaScript:getNodeDetails('" + dsnFieldName + "');\" class=\"parentNode\" id='" + dsnFieldName + "' name='" + dsnFieldName + "' oncontextmenu=\"createMenu('" + dsnFieldName + "',event); \" />";
                                DataSourceColumnContent += fieldvalue;
                                DataSourceColumnContent += "</a>";
                                DataSourceColumnContent += "</li>";
                                var dataSrcColHTML = document.getElementById("UL" + element).innerHTML;
                                document.getElementById("UL" + element).innerHTML = dataSrcColHTML + DataSourceColumnContent;
                                glblDataSrcColsCount[i] = dsname[i].getElementsByTagName("RAD_FIELDS").length;
                                document.getElementById("UL" + element).style.display = "block";

                            }
                        }
                    }

                }
            }

        }
    }
    if (element.split("~")[0] == "SCR")//
    {
        levelsCount = element.split("~");
        if (levelsCount.length == 1) {
            if (screens.length > glblScrCount) {
                var value = getNodeText(selectSingleNode(screens[screens.length - 1], "SCREEN_NAME"));
                var ScreensContent = "";
                var scrNameValue = "SCR" + "~" + value;
                ScreensContent += "<li id=li_" + scrNameValue + " noDrag=\"true\">"
                ScreensContent += "<a href=\"javaScript:getNodeDetails('" + scrNameValue + "');\" class=\"parentNode\"  id='" + scrNameValue + "' name='" + scrNameValue + "' oncontextmenu=\"createMenu('" + scrNameValue + "',event);getNodeDetails('" + scrNameValue + "'); \" />";
                ScreensContent += value;
                ScreensContent += "</a>";
                ScreensContent += "<ul id ='" + "UL" + scrNameValue + "' class='Fields' name='details' >";

                ScreensContent += "<li id=\"li_HEADER\" noDrag=\"true\">";
                var scrPortValue = "SCR" + "~" + value + "~" + "HEADER";//"SCR"+"~"+value+"~"+ScreensecName
                ScreensContent += "<a href=\"javaScript:getNodeDetails('" + scrPortValue + "');\" class=\"parentNode\" id='" + scrPortValue + "' name='" + scrPortValue + "' oncontextmenu=\"createMenu('" + scrPortValue + "',event); \" />";
                ScreensContent += "HEADER";
                ScreensContent += "</a>";
                ScreensContent += "<ul id ='" + "UL" + scrPortValue + "' class='Fields' name='details'>";
                var nameValueTab = "SCR" + "~" + value + "~" + "HEADER" + "~" + "TAB_HEADER";
                ScreensContent += "<li id=li_" + nameValueTab + ">";
                ScreensContent += "<a  href=\"javaScript:getNodeDetails('" + nameValueTab + "');\" class=\"parentNode\" id='" + nameValueTab + "' name='" + nameValueTab + "' oncontextmenu=\"createMenu('" + nameValueTab + "',event); \" />";
                ScreensContent += "TAB_HEADER";
                ScreensContent += "</a>";
                ScreensContent += "<ul id ='" + "UL" + nameValueTab + "' class='Fields' name='details'>";
                ScreensContent += "</ul>";
                ScreensContent += "</li>";
                ScreensContent += "</ul>";
                ScreensContent += "</li>";

                ScreensContent += "<li id=\"li_BODY\" noDrag=\"true\">";
                var scrPortValue = "SCR" + "~" + value + "~" + "BODY";//"SCR"+"~"+value+"~"+ScreensecName
                ScreensContent += "<a href=\"javaScript:getNodeDetails('" + scrPortValue + "');\" class=\"parentNode\" id='" + scrPortValue + "' name='" + scrPortValue + "' oncontextmenu=\"createMenu('" + scrPortValue + "',event); \" />";
                ScreensContent += "BODY";
                ScreensContent += "</a>";
                ScreensContent += "<ul id ='" + "UL" + scrPortValue + "' class='Fields' name='details'>";
                var nameValueTab = "SCR" + "~" + value + "~" + "BODY" + "~" + "TAB_MAIN";
                ScreensContent += "<li id=li_" + nameValueTab + ">";
                ScreensContent += "<a  href=\"javaScript:getNodeDetails('" + nameValueTab + "');\" class=\"parentNode\"  id='" + nameValueTab + "' name='" + nameValueTab + "' oncontextmenu=\"createMenu('" + nameValueTab + "',event); \" />";
                ScreensContent += "TAB_MAIN";
                ScreensContent += "</a>";
                ScreensContent += "<ul id ='" + "UL" + nameValueTab + "' class='Fields' name='details'>";
                ScreensContent += "</ul>";
                ScreensContent += "</li>";
                ScreensContent += "</ul>";
                ScreensContent += "</li>";

                ScreensContent += "<li id=\"li_FOOTER\" noDrag=\"true\">";
                var scrPortValue = "SCR" + "~" + value + "~" + "FOOTER";//"SCR"+"~"+value+"~"+ScreensecName
                ScreensContent += "<a href=\"javaScript:getNodeDetails('" + scrPortValue + "');\" class=\"parentNode\" id='" + scrPortValue + "' name='" + scrPortValue + "' oncontextmenu=\"createMenu('" + scrPortValue + "',event); \" />";
                ScreensContent += "FOOTER";
                ScreensContent += "</a>";
                ScreensContent += "<ul id ='" + "UL" + scrPortValue + "' class='Fields' name='details'>";
                var nameValueTab = "SCR" + "~" + value + "~" + "FOOTER" + "~" + "TAB_FOOTER";
                ScreensContent += "<li id=li_" + nameValueTab + ">";
                ScreensContent += "<a  href=\"javaScript:getNodeDetails('" + nameValueTab + "');\" class=\"parentNode\" id='" + nameValueTab + "' name='" + nameValueTab + "' oncontextmenu=\"createMenu('" + nameValueTab + "',event); \" />";
                ScreensContent += "TAB_FOOTER";
                ScreensContent += "</a>";
                ScreensContent += "<ul id ='" + "UL" + nameValueTab + "' class='Fields' name='details'>";
                ScreensContent += "</ul>";
                ScreensContent += "</li>";
                ScreensContent += "</ul>";
                ScreensContent += "</li>";

                ScreensContent += "</ul>";
                ScreensContent += "</li>";
                var scrHTML = document.getElementById("ULSCR").innerHTML;
                document.getElementById("ULSCR").innerHTML = scrHTML + ScreensContent;

                glblScrHeaderTabCount[screens.length - 1] = 1;
                glblScrBdyTabCount[screens.length - 1] = 1;
                glblScrFooterTabCount[screens.length - 1] = 1;
                glblScrCount = screens.length;
                document.getElementById("ULSCR").style.display = "block";
            }
        }
        else if (levelsCount.length == 3) {
            if (element.split("~")[2] == "HEADER") {
                for (var i = 0;i < screens.length;i++) {
                    var scrHeader = screens[i].getElementsByTagName("HEADER");
                    if (glblScrHeaderTabCount[i] == undefined || scrHeader[0].getElementsByTagName("RAD_TABS").length > glblScrHeaderTabCount[i]) {
                        var tabvalue = getNodeText(selectSingleNode(scrHeader[0].getElementsByTagName("RAD_TABS")[scrHeader[0].getElementsByTagName("RAD_TABS").length - 1], "TAB_NAME"));
                        var nameValueTab = element + "~" + tabvalue;
                        var ScreensContent = "<li id=li_" + nameValueTab + ">";
                        ScreensContent += "<a  href=\"javaScript:getNodeDetails('" + nameValueTab + "');\" class=\"parentNode\" id='" + nameValueTab + "' name='" + nameValueTab + "' oncontextmenu=\"createMenu('" + nameValueTab + "',event); \" />";
                        ScreensContent += tabvalue;
                        ScreensContent += "</a>";
                        ScreensContent += "<ul id ='" + "UL" + nameValueTab + "' class='Fields' name='details'>";
                        ScreensContent += "</ul>";
                        ScreensContent += "</li>";
                        var ScrHeaderTabHTML = document.getElementById("UL" + element).innerHTML;
                        document.getElementById("UL" + element).innerHTML = ScrHeaderTabHTML + ScreensContent;
                        glblScrHeaderTabCount[i] = scrHeader[0].getElementsByTagName("RAD_TABS").length;
                        document.getElementById("UL" + element).style.display = "block";
                        break;
                    }
                }
            }
            else if (element.split("~")[2] == "BODY") {
                for (var i = 0;i < screens.length;i++) {
                    var scrBdy = screens[i].getElementsByTagName("BODY");
                    if (glblScrBdyTabCount[i] == undefined || scrBdy[0].getElementsByTagName("RAD_TABS").length > glblScrBdyTabCount[i]) {
                        var tabvalue = getNodeText(selectSingleNode(scrBdy[0].getElementsByTagName("RAD_TABS")[scrBdy[0].getElementsByTagName("RAD_TABS").length - 1], "TAB_NAME")); //Cross Browser bug#32499898
                        var nameValueTab = element + "~" + tabvalue;
                        var ScreensContent = "<li id=li_" + nameValueTab + ">";
                        ScreensContent += "<a  href=\"javaScript:getNodeDetails('" + nameValueTab + "');\" class=\"parentNode\" id='" + nameValueTab + "' name='" + nameValueTab + "' oncontextmenu=\"createMenu('" + nameValueTab + "',event); \" />";
                        ScreensContent += tabvalue;
                        ScreensContent += "</a>";
                        ScreensContent += "<ul id ='" + "UL" + nameValueTab + "' class='Fields' name='details'>";
                        ScreensContent += "</ul>";
                        ScreensContent += "</li>";
                        var ScrBdyTabHTML = document.getElementById("UL" + element).innerHTML;
                        document.getElementById("UL" + element).innerHTML = ScrBdyTabHTML + ScreensContent;
                        glblScrBdyTabCount[i] = scrBdy[0].getElementsByTagName("RAD_TABS").length;
                        document.getElementById("UL" + element).style.display = "block";
                        break;
                    }
                }
            }
            else if (element.split("~")[2] == "FOOTER") {
                for (var i = 0;i < screens.length;i++) {
                    var scrFooter = screens[i].getElementsByTagName("FOOTER");
                    if (glblScrFooterTabCount[i] == undefined || scrFooter[0].getElementsByTagName("RAD_TABS").length > glblScrFooterTabCount[i]) {
                        var tabvalue = getNodeText(selectSingleNode(scrFooter[0].getElementsByTagName("RAD_TABS")[scrFooter[0].getElementsByTagName("RAD_TABS").length - 1], "TAB_NAME"));
                        var nameValueTab = element + "~" + tabvalue;
                        var ScreensContent = "<li id=li_" + nameValueTab + ">";
                        ScreensContent += "<a  href=\"javaScript:getNodeDetails('" + nameValueTab + "');\" class=\"parentNode\" id='" + nameValueTab + "' name='" + nameValueTab + "' oncontextmenu=\"createMenu('" + nameValueTab + "',event); \" />";
                        ScreensContent += tabvalue;
                        ScreensContent += "</a>";
                        ScreensContent += "<ul id ='" + "UL" + nameValueTab + "' class='Fields' name='details'>";
                        ScreensContent += "</ul>";
                        ScreensContent += "</li>";
                        var ScrFooterTabHTML = document.getElementById("UL" + element).innerHTML;
                        document.getElementById("UL" + element).innerHTML = ScrFooterTabHTML + ScreensContent;
                        glblScrFooterTabCount[i] = scrFooter[0].getElementsByTagName("RAD_TABS").length;
                        document.getElementById("UL" + element).style.display = "block";
                        break;
                    }
                }
            }
        }
        else if (levelsCount.length == 4) {
            if (element.split("~")[2] == "HEADER") {
                for (var i = 0;i < screens.length;i++) {
                    var scrHeader = screens[i].getElementsByTagName("HEADER");
                    var scrHeaderTab = scrHeader[0].getElementsByTagName("RAD_TABS");
                    for (j = 0;j < scrHeaderTab.length;j++) {
                        if (glblScrHeaderTabSecCount[i][j] == undefined || scrHeaderTab[j].getElementsByTagName("RAD_SECTIONS").length > glblScrHeaderTabSecCount[i][j]) {
                            if (scrHeaderTab[j].getElementsByTagName("RAD_SECTIONS")[scrHeaderTab[j].getElementsByTagName("RAD_SECTIONS").length - 1]) {
                                var SecName = getNodeText(selectSingleNode(scrHeaderTab[j].getElementsByTagName("RAD_SECTIONS")[scrHeaderTab[j].getElementsByTagName("RAD_SECTIONS").length - 1], "SECTION_NAME"));
                                var nameValueSec = element + "~" + SecName;
                                var sectionContent = "<li id=li_" + nameValueSec + " noChildren=\"true\">";
                                sectionContent += "<a  href=\"javaScript:getNodeDetails('" + nameValueSec + "');\" class=\"parentNode\" id='" + nameValueSec + "' name='" + nameValueSec + "' oncontextmenu=\"createMenu('" + nameValueSec + "',event); \" />";
                                sectionContent += SecName;
                                sectionContent += "</a>";
                                sectionContent += "</li>";
                                var ScrHeaderTabSecHTML = document.getElementById("UL" + element).innerHTML;
                                document.getElementById("UL" + element).innerHTML = ScrHeaderTabSecHTML + sectionContent;
                                glblScrHeaderTabSecCount[i][j] = scrHeaderTab[j].getElementsByTagName("RAD_SECTIONS").length;
                                document.getElementById("UL" + element).style.display = "block";
                                break;
                            }
                        }
                    }
                }
            }
            else if (element.split("~")[2] == "BODY") {

                for (var i = 0;i < screens.length;i++) {

                    var scrBdy = screens[i].getElementsByTagName("BODY");
                    var scrBdyTab = scrBdy[0].getElementsByTagName("RAD_TABS");
                    for (var j = 0;j < scrBdyTab.length;j++) {
                        if (glblScrBdyTabSecCount[i][j] == undefined || scrBdyTab[j].getElementsByTagName("RAD_SECTIONS").length > glblScrBdyTabSecCount[i][j]) {
                            if (scrBdyTab[j].getElementsByTagName("RAD_SECTIONS")[scrBdyTab[j].getElementsByTagName("RAD_SECTIONS").length - 1]) {
                                var SecName = getNodeText(selectSingleNode(scrBdyTab[j].getElementsByTagName("RAD_SECTIONS")[scrBdyTab[j].getElementsByTagName("RAD_SECTIONS").length - 1], "SECTION_NAME"));
                                var nameValueSec = element + "~" + SecName;
                                var sectionContent = "<li id=li_" + nameValueSec + " noChildren=\"true\">";
                                sectionContent += "<a href=\"javaScript:getNodeDetails('" + nameValueSec + "');\" class=\"parentNode\" id='" + nameValueSec + "' name='" + nameValueSec + "' oncontextmenu=\"createMenu('" + nameValueSec + "',event); \" />";
                                sectionContent += SecName;
                                sectionContent += "</a>";
                                sectionContent += "</li>";
                                var ScrBdyTabSecHTML = document.getElementById("UL" + element).innerHTML;
                                document.getElementById("UL" + element).innerHTML = ScrBdyTabSecHTML + sectionContent;
                                glblScrBdyTabSecCount[i][j] = scrBdyTab[j].getElementsByTagName("RAD_SECTIONS").length;
                                document.getElementById("UL" + element).style.display = "block";
                                break;
                            }
                        }
                    }
                }
            }
            else if (element.split("~")[2] == "FOOTER") {
                for (var i = 0;i < screens.length;i++) {
                    var scrFooter = screens[i].getElementsByTagName("FOOTER");
                    var scrFooterTab = scrFooter[0].getElementsByTagName("RAD_TABS");
                    for (j = 0;j < scrFooterTab.length;j++) {
                        if (glblScrFooterTabSecCount[i][j] == undefined || scrFooterTab[j].getElementsByTagName("RAD_SECTIONS").length > glblScrFooterTabSecCount[i][j]) {
                            if (scrFooterTab[j].getElementsByTagName("RAD_SECTIONS")[scrFooterTab[j].getElementsByTagName("RAD_SECTIONS").length - 1]) {
                                var SecName = getNodeText(selectSingleNode(scrFooterTab[j].getElementsByTagName("RAD_SECTIONS")[scrFooterTab[j].getElementsByTagName("RAD_SECTIONS").length - 1], "SECTION_NAME"));
                                var nameValueSec = element + "~" + SecName;
                                var sectionContent = "<li id=li_" + nameValueSec + " noChildren=\"true\">";
                                sectionContent += "<a href=\"javaScript:getNodeDetails('" + nameValueSec + "');\" class=\"parentNode\" id='" + nameValueSec + "' name='" + nameValueSec + "' oncontextmenu=\"createMenu('" + nameValueSec + "',event); \" />";
                                sectionContent += SecName;
                                sectionContent += "</a>";
                                ScreensContent += "<ul id ='" + "UL" + nameValueTab + "' class='Fields' name='details'>";
                                ScreensContent += "</ul>";
                                sectionContent += "</li>";
                                var ScrFooterTabSecHTML = document.getElementById("UL" + element).innerHTML;
                                document.getElementById("UL" + element).innerHTML = ScrFooterTabSecHTML + sectionContent;
                                glblScrFooterTabSecCount[i][j] = scrFooterTab[j].getElementsByTagName("RAD_SECTIONS").length;
                                document.getElementById("UL" + element).style.display = "block";
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    if (element.split("~")[0] == "BLK") {
        levelsCount = element.split("~");
        if (levelsCount.length == 1) {
            if (Blocks.length > glblBlkCount) {
                var blkvalue = getNodeText(selectSingleNode(Blocks[Blocks.length - 1], "BLOCK_NAME"));
                var BlocksContent = "";
                var blknameValue = "BLK" + "~" + blkvalue;
                BlocksContent += "<li id=li_" + blknameValue + ">";
                BlocksContent += "<a  href=\"javaScript:getNodeDetails('" + blknameValue + "');\" class=\"parentNode\" id='" + blknameValue + "' name='" + blknameValue + "' oncontextmenu=\"createMenu('" + blknameValue + "',event);getNodeDetails('" + blknameValue + "'); \" />";
                BlocksContent += blkvalue;
                BlocksContent += "</a>";
                BlocksContent += "<ul id ='" + "UL" + blknameValue + "' class='Fields' name='details'>";
                BlocksContent += "</ul>";
                BlocksContent += "</li>";
                var blkHTML = document.getElementById("ULBLK").innerHTML;
                document.getElementById("ULBLK").innerHTML = blkHTML + BlocksContent;
                glblBlkCount = Blocks.length;
                document.getElementById("ULBLK").style.display = "block";
            }
        }
        else if (levelsCount.length == 2) {
            var radBlkFieldCntr = 0;
            var BlkRADFieldsDiff = 0;
            for (var i = 0;i < Blocks.length;i++) {
                if (glblBlkRADFieldsCount[i] == undefined || Blocks[i].getElementsByTagName("RAD_BLK_FIELDS").length > glblBlkRADFieldsCount[i]) {
                    if (glblBlkRADFieldsCount[i] == undefined) {
                        BlkRADFieldsDiff = Blocks[i].getElementsByTagName("RAD_BLK_FIELDS").length;
                    }
                    else {
                        BlkRADFieldsDiff = Blocks[i].getElementsByTagName("RAD_BLK_FIELDS").length - glblBlkRADFieldsCount[i];
                    }

                    for (var j = 0;j < Blocks[i].childNodes.length;j++) {
                        if (Blocks[i].childNodes[j].nodeName == "RAD_BLK_FIELDS") {
                            radBlkFieldCntr = radBlkFieldCntr + 1;
                            if (radBlkFieldCntr == Blocks[i].getElementsByTagName("RAD_BLK_FIELDS").length - (BlkRADFieldsDiff - 1)) {
                                BlkRADFieldsDiff = BlkRADFieldsDiff - 1;
                                var fieldvalue = getNodeText(selectSingleNode(Blocks[i].childNodes[j], "FIELD_NAME"));
                                var nameValueField = element + "~" + fieldvalue;
                                var BlocksContent = "<li id=li_" + nameValueField + " noChildren=\"true\">";
                                BlocksContent += "<a href=\"javaScript:getNodeDetails('" + nameValueField + "');\" class=\"parentNode\" id='" + nameValueField + "' name='" + nameValueField + "' oncontextmenu=\"createMenu('" + nameValueField + "',event); \" />";
                                BlocksContent += fieldvalue;
                                BlocksContent += "</a>";
                                BlocksContent += "</li>";
                                var BlkRADFieldHTML = document.getElementById("UL" + element).innerHTML;
                                document.getElementById("UL" + element).innerHTML = BlkRADFieldHTML + BlocksContent;
                                glblBlkRADFieldsCount[i] = Blocks[i].getElementsByTagName("RAD_BLK_FIELDS").length;
                                document.getElementById("UL" + element).style.display = "block";

                            }
                        }
                    }

                }
            }
        }
    }
    if (element.split("~")[0] == "FLD") {
        levelsCount = element.split("~");
        if (levelsCount.length == 1) {
            if (Fldsets.length > glblFldsetCount) {
                var value = getNodeText(selectSingleNode(Fldsets[Fldsets.length - 1], "FIELDSET_NAME"));
                var FldSetContent = "";
                var fldNameValue = "FLD" + "~" + value;
                FldSetContent += "<li id=li_" + fldNameValue + " noChildren=\"true\">";
                FldSetContent += "<a href=\"javaScript:getNodeDetails('" + fldNameValue + "');\" class=\"parentNode\" id='" + fldNameValue + "' name='" + fldNameValue + "' oncontextmenu=\"createMenu('" + fldNameValue + "',event);getNodeDetails('" + fldNameValue + "'); \" />";
                FldSetContent += value;
                FldSetContent += "</a>";
                FldSetContent += "</li>";
                var fldSetHTML = document.getElementById("ULFLD").innerHTML;
                document.getElementById("ULFLD").innerHTML = fldSetHTML + FldSetContent;
                glblFldsetCount = Fldsets.length;
                document.getElementById("ULFLD").style.display = "block";
            }
        }
    }
    if (element.split("~")[0] == "LOV") {
        levelsCount = element.split("~");
        if (levelsCount.length == 1) {
            if (Lovs.length > glblLovCount) {
                var value = getNodeText(selectSingleNode(Lovs[Lovs.length - 1], "LOV_NAME"));
                var LovContent = "";
                var lovNameValue = "LOV" + "~" + value;
                LovContent += "<li id=li_" + lovNameValue + " noDrag=\"true\" noChildren=\"true\">";
                LovContent += "<a  href=\"javaScript:getNodeDetails('" + lovNameValue + "');\" class=\"parentNode\" id='" + lovNameValue + "' name='" + lovNameValue + "' oncontextmenu=\"createMenu('" + lovNameValue + "',event);getNodeDetails('" + lovNameValue + "'); \" />";
                LovContent += value;
                LovContent += "</a>";
                LovContent += "</li>";
                var lovHTML = document.getElementById("ULLOV").innerHTML;
                document.getElementById("ULLOV").innerHTML = lovHTML + LovContent;
                glblLovCount = Lovs.length;
                document.getElementById("ULLOV").style.display = "block";
            }
        }
    }
    fnPopulateCommon();
    paintTreeMenu();

}

function updateTreeAfterDelete(elementtodel) {

    var dsname = dom.getElementsByTagName("RAD_DATASOURCES");
    var screens = dom.getElementsByTagName("RAD_SCREENS");
    var Blocks = dom.getElementsByTagName("RAD_DATA_BLOCKS");
    var Fldsets = dom.getElementsByTagName("RAD_FIELDSETS");
    var Lovs = dom.getElementsByTagName("RAD_LOVS");
    var summary = dom.getElementsByTagName("RAD_SUMMARY");
    element = elementtodel;

    if (element.split("~")[0] == "DSN") {
        var levelsCount = element.split("~");
        if (levelsCount.length == 2 && dsname.length < glblDataSrcCount) {
            document.getElementById("li_" + element).innerHTML = "";
            var dataSrcHTML = document.getElementById("ULDSN").innerHTML;
            var pattern = "<LI id=li_" + element + " noDrag=\"true\"></LI>";
            dataSrcHTML = dataSrcHTML.replace(pattern, "");
            document.getElementById("ULDSN").innerHTML = dataSrcHTML;
            glblDataSrcCount = dsname.length;
            glblDataSrcColsCount = null;
            glblDataSrcColsCount = new Array(dsname.length);
            for (var i = 0;i < dsname.length;i++) {
                glblDataSrcColsCount[i] = dsname[i].getElementsByTagName("RAD_FIELDS").length;
            }

        }
        else if (levelsCount.length == 3) {
            for (var i = 0;i < dsname.length;i++) {
                if (dsname[i].getElementsByTagName("RAD_FIELDS").length < glblDataSrcColsCount[i]) {
                    document.getElementById("li_" + element).innerHTML = "";
                    var dataSrcColHTML = document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1]).innerHTML;
                    var pattern = "<LI id=li_" + element + " noDrag=\"true\" noChildren=\"true\"></LI>";
                    dataSrcColHTML = dataSrcColHTML.replace(pattern, "");
                    document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1]).innerHTML = dataSrcColHTML;
                    glblDataSrcColsCount[i] = dsname[i].getElementsByTagName("RAD_FIELDS").length;
                    break;
                }
            }

        }
        paintTreeMenu();
    }
    else if (element.split("~")[0] == "SCR") {
        var levelsCount = element.split("~");
        if (levelsCount.length == 2 && screens.length < glblScrCount) {
            document.getElementById("li_" + element).innerHTML = "";
            var scrHTML = document.getElementById("ULSCR").innerHTML;
            var pattern = "<LI id=li_" + element + " noDrag=\"true\"></LI>";
            scrHTML = scrHTML.replace(pattern, "");
            document.getElementById("ULSCR").innerHTML = scrHTML;
            glblScrCount = screens.length;
        }
        else if (levelsCount.length == 4) {
            for (var i = 0;i < screens.length;i++) {
                if (element.split("~")[2] == "HEADER") {
                    var scrHeader = screens[i].getElementsByTagName("HEADER");
                    if (scrHeader[0].getElementsByTagName("RAD_TABS").length < glblScrHeaderTabCount[i]) {
                        document.getElementById("li_" + element).innerHTML = "";
                        var scrHeaderTabHTML = document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1] + "~" + element.split("~")[2]).innerHTML;
                        var pattern = "<LI id=li_" + element + "></LI>";
                        scrHeaderTabHTML = scrHeaderTabHTML.replace(pattern, "");
                        document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1] + "~" + element.split("~")[2]).innerHTML = scrHeaderTabHTML;
                        glblScrHeaderTabCount[i] = scrHeader[0].getElementsByTagName("RAD_TABS").length;
                        break;
                    }
                }
                else if (element.split("~")[2] == "BODY") {
                    var scrBdy = screens[i].getElementsByTagName("BODY");
                    if (scrBdy[0].getElementsByTagName("RAD_TABS").length < glblScrBdyTabCount[i]) {
                        document.getElementById("li_" + element).innerHTML = "";
                        var scrBdyTabHTML = document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1] + "~" + element.split("~")[2]).innerHTML;
                        var pattern = "<LI id=li_" + element + "></LI>";
                        scrBdyTabHTML = scrBdyTabHTML.replace(pattern, "");
                        document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1] + "~" + element.split("~")[2]).innerHTML = scrBdyTabHTML;
                        glblScrBdyTabCount[i] = scrBdy[0].getElementsByTagName("RAD_TABS").length;
                        break;
                    }
                }
                else if (element.split("~")[2] == "FOOTER") {
                    var scrFooter = screens[i].getElementsByTagName("FOOTER");
                    if (scrFooter[0].getElementsByTagName("RAD_TABS").length < glblScrFooterTabCount[i]) {
                        document.getElementById("li_" + element).innerHTML = "";
                        var scrFooterTabHTML = document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1] + "~" + element.split("~")[2]).innerHTML;
                        var pattern = "<LI id=li_" + element + "></LI>";
                        scrFooterTabHTML = scrFooterTabHTML.replace(pattern, "");
                        document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1] + "~" + element.split("~")[2]).innerHTML = scrFooterTabHTML;
                        glblScrFooterTabCount[i] = scrFooter(0).getElementsByTagName("RAD_TABS").length;
                        break;
                    }
                }
            }
        }
        else if (levelsCount.length == 5) {
            for (var i = 0;i < screens.length;i++) {
                if (element.split("~")[2] == "HEADER") {
                    var scrHeader = screens[i].getElementsByTagName("HEADER");
                    var scrHeaderTab = scrHeader[0].getElementsByTagName("RAD_TABS");
                    for (var j = 0;j < scrHeaderTab.length;j++) {
                        if (scrHeaderTab[j].getElementsByTagName("RAD_SECTIONS").length < glblScrHeaderTabSecCount[i][j]) {
                            document.getElementById("li_" + element).innerHTML = "";
                            var scrHeaderTabSecHTML = document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1] + "~" + element.split("~")[2] + "~" + element.split("~")[3]).innerHTML;
                            var pattern = "<LI id=li_" + element + " noChildren=\"true\"></LI>";
                            scrHeaderTabSecHTML = scrHeaderTabSecHTML.replace(pattern, "");
                            document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1] + "~" + element.split("~")[2] + "~" + element.split("~")[3]).innerHTML = scrHeaderTabSecHTML;
                            glblScrHeaderTabSecCount[i][j] = scrHeaderTab[j].getElementsByTagName("RAD_SECTIONS").length;
                            break;
                        }
                    }
                }
                else if (element.split("~")[2] == "BODY") {
                    var scrBdy = screens[i].getElementsByTagName("BODY");
                    var scrBdyTab = scrBdy[0].getElementsByTagName("RAD_TABS");
                    for (var j = 0;j < scrBdyTab.length;j++) {
                        if (scrBdyTab[j].getElementsByTagName("RAD_SECTIONS").length < glblScrBdyTabSecCount[i][j]) {
                            document.getElementById("li_" + element).innerHTML = "";
                            var scrBdyTabSecHTML = document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1] + "~" + element.split("~")[2] + "~" + element.split("~")[3]).innerHTML;
                            var pattern = "<LI id=li_" + element + " noChildren=\"true\"></LI>";
                            scrBdyTabSecHTML = scrBdyTabSecHTML.replace(pattern, "");
                            document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1] + "~" + element.split("~")[2] + "~" + element.split("~")[3]).innerHTML = scrBdyTabSecHTML;
                            glblScrBdyTabSecCount[i][j] = scrBdyTab[j].getElementsByTagName("RAD_SECTIONS").length;
                            break;
                        }
                    }
                }
                else if (element.split("~")[2] == "FOOTER") {
                    var scrFooter = screens[i].getElementsByTagName("FOOTER");
                    var scrFooterTab = scrFooter[0].getElementsByTagName("RAD_TABS");
                    for (var j = 0;j < scrFooterTab.length;j++) {
                        if (scrFooterTab(j).getElementsByTagName("RAD_SECTIONS").length < glblScrFooterTabSecCount[i][j]) {
                            document.getElementById("li_" + element).innerHTML = "";
                            var scrFooterTabSecHTML = document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1] + "~" + element.split("~")[2] + "~" + element.split("~")[3]).innerHTML;
                            var pattern = "<LI id=li_" + element + " noChildren=\"true\"></LI>";
                            scrFooterTabSecHTML = scrFooterTabSecHTML.replace(pattern, "");
                            document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1] + "~" + element.split("~")[2] + "~" + element.split("~")[3]).innerHTML = scrFooterTabSecHTML;
                            glblScrFooterTabSecCount[i][j] = scrFooterTab[j].getElementsByTagName("RAD_SECTIONS").length;
                            break;
                        }
                    }
                }
            }
        }
        paintTreeMenu();
    }
    else if (element.split("~")[0] == "BLK") {
        var levelsCount = element.split("~");
        if (levelsCount.length == 2 && Blocks.length < glblBlkCount) {
            document.getElementById("li_" + element).innerHTML = "";
            var blkHTML = document.getElementById("ULBLK").innerHTML;
            var pattern = "<LI id=li_" + element + "></LI>";
            blkHTML = blkHTML.replace(pattern, "");
            document.getElementById("ULBLK").innerHTML = blkHTML;
            glblBlkCount = Blocks.length;
            glblBlkRADFieldsCount = null;
            glblBlkRADFieldsCount = new Array(Blocks.length);
            for (var i = 0;i < Blocks.length;i++) {
                glblBlkRADFieldsCount[i] = Blocks[i].getElementsByTagName("RAD_BLK_FIELDS").length;
            }
        }
        else if (levelsCount.length == 3) {
            for (var i = 0;i < Blocks.length;i++) {
                if (Blocks[i].getElementsByTagName("RAD_BLK_FIELDS").length < glblBlkRADFieldsCount[i]) {
                    document.getElementById("li_" + element).innerHTML = "";
                    var blkFldHTML = document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1]).innerHTML;
                    var pattern = "<LI id=li_" + element + " noChildren=\"true\"></LI>";
                    blkFldHTML = blkFldHTML.replace(pattern, "");
                    document.getElementById("UL" + element.split("~")[0] + "~" + element.split("~")[1]).innerHTML = blkFldHTML;
                    glblBlkRADFieldsCount[i] = Blocks[i].getElementsByTagName("RAD_BLK_FIELDS").length;
                    break;
                }
            }
        }
        if (chkDelDataSrc || chkDelDataSrcFld) {
            return;
        }
        paintTreeMenu();
    }
    else if (element.split("~")[0] == "FLD") {
        var levelsCount = element.split("~");
        if (levelsCount.length == 2 && Fldsets.length < glblFldsetCount) {
            document.getElementById("li_" + element).innerHTML = "";
            var fieldSetHTML = document.getElementById("ULFLD").innerHTML;
            var pattern = "<LI id=li_" + element + " noChildren=\"true\"></LI>";
            fieldSetHTML = fieldSetHTML.replace(pattern, "");
            document.getElementById("ULFLD").innerHTML = fieldSetHTML;
            glblFldsetCount = Fldsets.length;
        }
        paintTreeMenu();
    }
    else if (element.split("~")[0] == "LOV") {
        var levelsCount = element.split("~");
        if (levelsCount.length == 2 && Lovs.length < glblLovCount) {
            document.getElementById("li_" + element).innerHTML = "";
            var lovHTML = document.getElementById("ULLOV").innerHTML;
            var pattern = "<LI id=li_" + element + " noDrag=\"true\" noChildren=\"true\"></LI>";
            lovHTML = lovHTML.replace(pattern, "");
            document.getElementById("ULLOV").innerHTML = lovHTML;
            glblLovCount = Lovs.length;
        }
        paintTreeMenu();
    }
    fnPopulateCommon();

}

function fnPopulateCommon() {
    Populate();
    PopulateScreens('SCREEN_NAME11');
    onChangeSelected('DATABLOCK_NAME', 'RAD_DATA_BLOCKS', 'DATABLOCK_NAME', 'FDN');
    PopulateLov();//moved to dom creator
    fn_populate_objects('RAD_DATA_BLOCKS', 'BNM', 'BLOCK_PARENT_BLK');
    fn_populate_objects('RAD_DATASOURCES', 'DBT', 'PARENT_DATASRC_DSN');
}

function updateTreeAfterRename(element, oldElement) {

    var divobject = parent.document.getElementById("treebody");
    var preInnerHtml = divobject.innerHTML;
    var bodyContent = "";

    if (oldElement.split("~")[0] == "BLK") {
        var Blocks = selectSingleNode(dom, ("//RAD_DATA_BLOCKS[@ID='" + element.split("~")[1] + "']"));
        var BlocksContentOld = "";
        if (element.split("~").length == 2) {

            var blkvalue = getNodeText(selectSingleNode(Blocks, "BLOCK_NAME"));
            var BlocksContent = "";
            var blknameValue = "BLK" + "~" + blkvalue;
            BlocksContent += "<li id=li_" + blknameValue + ">";
            BlocksContent += "<a  href=\"javaScript:getNodeDetails('" + blknameValue + "');\" class=\"parentNode\" id='" + blknameValue + "' name='" + blknameValue + "' oncontextmenu=\"createMenu('" + blknameValue + "',event);getNodeDetails('" + blknameValue + "'); \" />";
            BlocksContent += blkvalue;
            BlocksContent += "</a>";

            BlocksContent += "<ul id ='" + "UL" + blknameValue + "' class='Fields' name='details'>";
            glblBlkRADFieldsCount[i] = Blocks.getElementsByTagName("RAD_BLK_FIELDS").length;

            for (var j = 0;j < Blocks.childNodes.length;j++) {
                if (Blocks.childNodes[j].nodeName == "RAD_BLK_FIELDS") {
                    var fieldvalue = getNodeText(selectSingleNode(Blocks.childNodes[j], "FIELD_NAME"));
                    var nameValueField = "BLK" + "~" + blkvalue + "~" + fieldvalue;
                    BlocksContent += "<li id=li_" + nameValueField + " noChildren=\"true\">";
                    BlocksContent += "<a href=\"javaScript:getNodeDetails('" + nameValueField + "');\" class=\"parentNode\" id='" + nameValueField + "' name='" + nameValueField + "' oncontextmenu=\"createMenu('" + nameValueField + "',event); \" />";
                    BlocksContent += fieldvalue;
                    BlocksContent += "</a>";
                    BlocksContent += "</li>";
                }
            }
            BlocksContent += "</ul>";
            BlocksContentOld = BlocksContentOld + BlocksContent;
            bodyContent += BlocksContentOld;

            var blkFldHTML = getOuterHTML_TXADisp(parent.document.getElementById("li_BLK~" + oldElement.split("~")[1]));
            var preInnerHtml = preInnerHtml.replace(blkFldHTML, bodyContent);
            divobject.innerHTML = preInnerHtml;
            parent.paintTreeMenu();

        }
        else if (element.split("~").length == 3) {
            var fieldContent = "";
            if (selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + element.split("~")[1] + "']/RAD_BLK_FIELDS[FIELD_NAME='" + element.split("~")[2] + "']") != null) {
                var nameValueField = "BLK" + "~" + element.split("~")[1] + "~" + element.split("~")[2];
                fieldContent += "<li id=li_" + nameValueField + " noChildren=\"true\">";
                fieldContent += "<a href=\"javaScript:getNodeDetails('" + nameValueField + "');\" class=\"parentNode\" id='" + nameValueField + "' name='" + nameValueField + "' oncontextmenu=\"createMenu('" + nameValueField + "',event);getNodeDetails('" + nameValueField + "'); \" />";
                fieldContent += element.split("~")[2];
                fieldContent += "</a>";
                fieldContent += "</li>";
                var fldHTML = getOuterHTML_TXADisp(parent.document.getElementById("li_BLK~" + oldElement.split("~")[1] + "~" + oldElement.split("~")[2]));
                var preInnerHtml = preInnerHtml.replace(fldHTML, fieldContent);
                divobject.innerHTML = preInnerHtml;
                parent.paintTreeMenu();
            }
        }
    }
    else if (oldElement.split("~")[0] == "SCR") {

        var screens = selectSingleNode(dom, ("//RAD_SCREENS[@ID='" + element.split("~")[1] + "']"));

        if (element.split("~").length == 2) {
            ScreensContent += "<li id=\"li_SCR\" noDrag=\"true\">";
            ScreensContent += "<a  href=\"javaScript:getNodeDetails('SCR'); \" id='SCR' class='parentNode' name=\"SCR\" oncontextmenu=\"createMenu('SCR',event); \" >Screens</a>";
            ScreensContent += "<ul id ='ULSCR' class='Fields' name='details' >";

            var value = getNodeText(selectSingleNode(screens, "SCREEN_NAME"));
            var ScreensContent = "";
            var scrNameValue = "SCR" + "~" + value;
            ScreensContent += "<li id=li_" + scrNameValue + " noDrag=\"true\">";
            ScreensContent += "<a href=\"javaScript:getNodeDetails('" + scrNameValue + "');\" class=\"parentNode\" id='" + scrNameValue + "' name='" + scrNameValue + "' oncontextmenu=\"createMenu('" + scrNameValue + "',event);getNodeDetails('" + scrNameValue + "'); \" />";
            ScreensContent += value;
            ScreensContent += "</a>";
            ScreensContent += "<ul id ='" + "UL" + scrNameValue + "' class='Fields' name='details'>";

            for (var j = 0;j < screens.childNodes.length;j++) {

                if (screens.childNodes[j].nodeName == "HEADER" || screens.childNodes[j].nodeName == "BODY" || screens.childNodes[j].nodeName == "FOOTER") {
                    var ScreensecName = "";
                    if (screens.childNodes[j].nodeName == "HEADER") {
                        ScreensecName = "HEADER";
                    }
                    else if (screens.childNodes[j].nodeName == "BODY") {
                        ScreensecName = "BODY";

                    }
                    else {
                        ScreensecName = "FOOTER";
                    }
                    ScreensContent += "<li id=\"li_" + ScreensecName + "\" noDrag=\"true\">";
                    var scrPortValue = "SCR" + "~" + value + "~" + ScreensecName;
                    var screenPortion = ScreensecName + i;
                    ScreensContent += "<a href=\"javaScript:getNodeDetails('" + scrPortValue + "');\" class=\"parentNode\" id='" + scrPortValue + "' name='" + scrPortValue + "' oncontextmenu=\"createMenu('" + scrPortValue + "',event); \" />";
                    ScreensContent += ScreensecName;
                    ScreensContent += "</a>";
                    ScreensContent += "<ul id ='" + "UL" + scrPortValue + "' class='Fields' name='details'>";

                    for (var m = 0;m < screens.childNodes[j].childNodes.length;m++) {
                        if (screens.childNodes[j].childNodes[m].nodeName == "RAD_TABS") {
                            var tabvalue = getNodeText(selectSingleNode(screens.childNodes[j].childNodes[m], "TAB_NAME"));
                            var nameValueTab = "SCR" + "~" + value + "~" + ScreensecName + "~" + tabvalue;
                            ScreensContent += "<li id=li_" + nameValueTab + ">";
                            ScreensContent += "<a  href=\"javaScript:getNodeDetails('" + nameValueTab + "');\" class=\"parentNode\" id='" + nameValueTab + "' name='" + nameValueTab + "' oncontextmenu=\"createMenu('" + nameValueTab + "',event); \" />";
                            ScreensContent += tabvalue;
                            ScreensContent += "</a>";
                            ScreensContent += "<ul id ='" + "UL" + nameValueTab + "' class='Fields' name='details'>";

                            for (var k = 0;k < screens.childNodes[j].childNodes[m].childNodes.length;k++) {
                                if (screens.childNodes[j].childNodes[m].childNodes[k].nodeName == "RAD_SECTIONS") {
                                    var SecName = getNodeText(selectSingleNode(screens.childNodes[j].childNodes[m].childNodes[k], "SECTION_NAME"));
                                    var sectionContent = "";
                                    var nameValueSec = "SCR" + "~" + value + "~" + ScreensecName + "~" + tabvalue + "~" + SecName;
                                    ScreensContent += "<li id=li_" + nameValueSec + " noChildren=\"true\">";
                                    ScreensContent += "<a  href=\"javaScript:getNodeDetails('" + nameValueSec + "');\" class=\"parentNode\" id='" + nameValueSec + "' name='" + nameValueSec + "' oncontextmenu=\"createMenu('" + nameValueSec + "',event); \" />";
                                    ScreensContent += SecName;
                                    ScreensContent += "</a>";
                                    ScreensContent += "</li>";
                                }
                            }

                            ScreensContent += "</ul>";
                            ScreensContent += "</li>";
                        }
                    }
                    ScreensContent += "</ul>";
                    ScreensContent += "</li>";

                }

            }
            ScreensContent += "</ul>";
            ScreensContent += "</li>";
            var screensHTML = getOuterHTML_TXADisp(parent.document.getElementById("li_" + oldElement));
            var preInnerHtml = preInnerHtml.replace(screensHTML, ScreensContent);
            divobject.innerHTML = preInnerHtml;
            parent.paintTreeMenu();

        }
        else if (element.split("~").length == 4) {

            var tabs = selectSingleNode(dom, ("//RAD_SCREENS[@ID='" + element.split("~")[1] + "']/" + element.split("~")[2] + "/RAD_TABS[@ID='" + element.split("~")[3] + "']"));
            var scrName = element.split("~")[1];
            var ScreensecName = element.split("~")[2]
            var tabContent = "";
            var tabvalue = getNodeText(selectSingleNode(tabs, "TAB_NAME"));
            var nameValueTab = "SCR" + "~" + scrName + "~" + ScreensecName + "~" + tabvalue;
            tabContent += "<li id=li_" + nameValueTab + ">";
            tabContent += "<a  href=\"javaScript:getNodeDetails('" + nameValueTab + "');\" class=\"parentNode\" id='" + nameValueTab + "' name='" + nameValueTab + "' oncontextmenu=\"createMenu('" + nameValueTab + "',event); \" />";
            tabContent += tabvalue;
            tabContent += "</a>";
            tabContent += "<ul id ='" + "UL" + nameValueTab + "' class='Fields' name='details'>";
            for (var k = 0;k < tabs.childNodes.length;k++) {
                if (tabs.childNodes[k].nodeName == "RAD_SECTIONS") {
                    var SecName = getNodeText(selectSingleNode(tabs.childNodes[k], "SECTION_NAME"));
                    var nameValueSec = "SCR" + "~" + scrName + "~" + ScreensecName + "~" + tabvalue + "~" + SecName;
                    tabContent += "<li id=li_" + nameValueSec + " noChildren=\"true\">";
                    tabContent += "<a  href=\"javaScript:getNodeDetails('" + nameValueSec + "');\" class=\"parentNode\" id='" + nameValueSec + "' name='" + nameValueSec + "' oncontextmenu=\"createMenu('" + nameValueSec + "',event); \" />";
                    tabContent += SecName;
                    tabContent += "</a>";
                    tabContent += "</li>";
                }
            }

            tabContent += "</ul>";
            tabContent += "</li>";

            var tabsHTML = getOuterHTML_TXADisp(parent.document.getElementById("li_" + oldElement));
            var preInnerHtml = preInnerHtml.replace(tabsHTML, tabContent);
            divobject.innerHTML = preInnerHtml;
            parent.paintTreeMenu();

        }
        else if (element.split("~").length == 5) {

            var screenName = element.split("~")[1]
            var PortionName = element.split("~")[2]
            var tabvalue = element.split("~")[3]
            var secName = element.split("~")[4]
            var secContent = "";

            if (selectSingleNode(dom, ("//RAD_SECTIONS[SECTION_NAME='" + secName + "']"))) {

                var nameValueSec = "SCR" + "~" + screenName + "~" + PortionName + "~" + tabvalue + "~" + secName;
                secContent += "<li id=li_" + nameValueSec + " noChildren=\"true\">";
                secContent += "<a  href=\"javaScript:getNodeDetails('" + nameValueSec + "');\" class=\"parentNode\" id='" + nameValueSec + "' name='" + nameValueSec + "' oncontextmenu=\"createMenu('" + nameValueSec + "',event); \" />";
                secContent += secName;
                secContent += "</a>";
                secContent += "</li>";

                var secsHTML = getOuterHTML_TXADisp(parent.document.getElementById("li_" + oldElement));
                var preInnerHtml = preInnerHtml.replace(secsHTML, secContent);
                divobject.innerHTML = preInnerHtml;
                parent.paintTreeMenu();

            }

        }
    }
    else if (oldElement.split("~")[0] == "FLD") {

        var FldSetContent = "";
        var fldNameValue = "FLD" + "~" + element.split("~")[1];
        FldSetContent += "<li id=li_" + fldNameValue + " noChildren=\"true\">";
        FldSetContent += "<a href=\"javaScript:getNodeDetails('" + fldNameValue + "');\" class=\"parentNode\" id='" + fldNameValue + "' name='" + fldNameValue + "' oncontextmenu=\"createMenu('" + fldNameValue + "',event);getNodeDetails('" + fldNameValue + "'); \" />";
        FldSetContent += element.split("~")[1];
        FldSetContent += "</a>";
        FldSetContent += "</li>";

        var fldSetHTML = getOuterHTML_TXADisp(parent.document.getElementById("li_" + oldElement));
        var preInnerHtml = preInnerHtml.replace(fldSetHTML, FldSetContent);
        divobject.innerHTML = preInnerHtml;
        parent.paintTreeMenu();

    }
    else if (oldElement.split("~")[0] == "LOV") {

        var LovContent = "";
        var lovName = "LOV" + "~" + element.split("~")[1];
        LovContent += "<li id=li_" + lovName + " noChildren=\"true\">";
        LovContent += "<a href=\"javaScript:getNodeDetails('" + lovName + "');\" class=\"parentNode\" id='" + lovName + "' name='" + lovName + "' oncontextmenu=\"createMenu('" + lovName + "',event);getNodeDetails('" + lovName + "'); \" />";
        LovContent += element.split("~")[1];
        LovContent += "</a>";
        LovContent += "</li>";

        var lovHTML = getOuterHTML_TXADisp(parent.document.getElementById("li_" + oldElement));
        var preInnerHtml = preInnerHtml.replace(lovHTML, LovContent);

        divobject.innerHTML = preInnerHtml;
        parent.paintTreeMenu();

    }
    parent.fnPopulateCommon();
}

function reCountTreeElements(element) {
    var elementDepth = element.split("~");
    if (elementDepth[0].replace("li_", "") == "BLK") {
        if (elementDepth.length == 2) {
            var blocks = dom.getElementsByTagName("RAD_DATA_BLOCKS");
            for (var i = 0;i < blocks.length;i++) {
                glblBlkRADFieldsCount[i] = blocks[i].getElementsByTagName("RAD_BLK_FIELDS").length;
            }
        }
    }
    else if (elementDepth[0].replace("li_", "") == "SCR") {
        if (elementDepth.length == 4) {
            var screens = dom.getElementsByTagName("RAD_SCREENS");
            for (var i = 0;i < screens.length;i++) {
                for (var j = 0;j < screens[i].getElementsByTagName("HEADER")[0].getElementsByTagName("RAD_TABS").length;j++) {
                    glblScrHeaderTabSecCount[i][j] = screens[i].getElementsByTagName("HEADER")[0].getElementsByTagName("RAD_TABS")[j].getElementsByTagName("RAD_SECTIONS").length;
                }
                for (var j = 0;j < screens[i].getElementsByTagName("BODY")[0].getElementsByTagName("RAD_TABS").length;j++) {
                    glblScrBdyTabSecCount[i][j] = screens[i].getElementsByTagName("BODY")[0].getElementsByTagName("RAD_TABS")[j].getElementsByTagName("RAD_SECTIONS").length;
                }
                for (var j = 0;j < screens[i].getElementsByTagName("FOOTER")[0].getElementsByTagName("RAD_TABS").length;j++) {
                    glblScrFooterTabSecCount[i][j] = screens[i].getElementsByTagName("FOOTER")[0].getElementsByTagName("RAD_TABS")[j].getElementsByTagName("RAD_SECTIONS").length;
                }
            }
        }
    }
}

function checkDraggable(sourceNode, destinationNode, mode) {
    var sourceNodeId = sourceNode.id
    var srcParent = extractParent(sourceNodeId);
    var destParent = "";
    if (mode == 1) {
        destParent = destinationNode.getElementsByTagName('UL')[0].id;
        if (srcParent == destParent) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (mode == 2) {
        var srcNodeDepth = sourceNodeId.split("~");
        var dstNodeDepth = destinationNode.id.split("~");
        if (srcNodeDepth.length == dstNodeDepth.length) {
            destParent = destinationNode.parentNode.id;
            if (srcParent == destParent) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}

function extractParent(sourceNodeId) {
    var srcNodeDepth = sourceNodeId.split("~");
    var prntIndex = srcNodeDepth.length - 1;
    var parent = "";
    for (var i = 0;i < prntIndex;i++) {
        parent = parent + "~" + srcNodeDepth[i];

    }
    parent = parent.replace("~li_", "UL");
    return parent;

}

function updateDOMAfterDrop(sourceNode, destinationNode) {
    var srcNodeId = sourceNode.id;
    var dstNodeId = destinationNode.id;
    var parent = extractParent(srcNodeId);
    var prntNode = document.getElementById(parent);
    var children = prntNode.getElementsByTagName("LI");
    var childrenArray = new Array(getChildrenCount(children, parent));
    var childCount = 0;
    for (var i = 0;i < children.length;i++) {
        if (children[i].parentNode.id == parent) {
            childrenArray[childCount] = children[i].id.split("~")[children[i].id.split("~").length - 1];
            childCount = childCount + 1;
        }
    }
    updateDOMElement(parent, childrenArray, srcNodeId);

}

function getChildrenCount(children, parent) {
    var count = 0;
    for (var i = 0;i < children.length;i++) {
        if (children[i].parentNode.id == parent) {
            count = count + 1;
        }
    }
    return count;
}

function updateDOMElement(parent, childrenArray, srcNodeId) {
    var parentDepth = parent.split("~");
    var srcNodeIdDepth = srcNodeId.split("~");
    if (srcNodeIdDepth[0].replace("li_", "") == "SCR") {
        if (srcNodeIdDepth.length == 4) {
            var radScreenContentIdXpath = "//RAD_SCREENS[@ID='" + parentDepth[1] + "']/" + parentDepth[2] + "[@ID='" + parentDepth[2] + "']";
            var radTabsTagName = "RAD_TABS";
            var radScreenContentNode = selectSingleNode(dom, radScreenContentIdXpath);
            var radTabs = radScreenContentNode.getElementsByTagName(radTabsTagName);
            reOrderDOM(childrenArray, radTabs, radTabsTagName, radScreenContentNode);
        }
        else if (srcNodeIdDepth.length == 5) {
            var radTabIdXpath = "//RAD_SCREENS[@ID='" + parentDepth[1] + "']/" + parentDepth[2] + "[@ID='" + parentDepth[2] + "']" + "/RAD_TABS[@ID='" + parentDepth[3] + "']";
            var radTabSectionsTagName = "RAD_SECTIONS";
            var radTabNode = selectSingleNode(dom, radTabIdXpath);
            var radTabSections = radTabNode.getElementsByTagName(radTabSectionsTagName);
            reOrderDOM(childrenArray, radTabSections, radTabSectionsTagName, radTabNode);
        }

    }
    else if (srcNodeIdDepth[0].replace("li_", "") == "BLK") {
        if (srcNodeIdDepth.length == 2) {
            var radKernelTagName = "RAD_KERNEL";
            var radDataBlockTagName = "RAD_DATA_BLOCKS";
            var radKernelNode = dom.getElementsByTagName(radKernelTagName)[0];
            var radDataBlockNodes = dom.getElementsByTagName(radDataBlockTagName);
            reOrderDOM(childrenArray, radDataBlockNodes, radDataBlockTagName, radKernelNode);
        }
        else if (srcNodeIdDepth.length == 3) {
            var radDataBlockIdXpath = "//RAD_DATA_BLOCKS[@ID='" + parentDepth[1] + "']";
            var radBlockFieldsTagName = "RAD_BLK_FIELDS";
            var radDataBlockNode = selectSingleNode(dom, radDataBlockIdXpath);
            var radBlockFields = radDataBlockNode.getElementsByTagName(radBlockFieldsTagName);
            reOrderDOM(childrenArray, radBlockFields, radBlockFieldsTagName, radDataBlockNode);
        }
    }
    else if (srcNodeIdDepth[0].replace("li_", "") == "FLD") {
        if (srcNodeIdDepth.length == 2) {
            var radKernelTagName = "RAD_KERNEL";
            var radFieldSetTagName = "RAD_FIELDSETS";
            var radKernelNode = dom.getElementsByTagName(radKernelTagName)[0];
            var radFieldSetNodes = dom.getElementsByTagName(radFieldSetTagName);
            reOrderDOM(childrenArray, radFieldSetNodes, radFieldSetTagName, radKernelNode);
        }
    }

}

function reOrderDOM(childrenArray, radElements, tagName, parentNode) {
    for (var i = 0;i < childrenArray.length;i++) {
        for (var j = 0;j < radElements.length;j++) {
            if (childrenArray[i] == radElements[j].getAttribute("ID")) {
                if (i != j) {
                    var newNode = parentNode.removeChild(radElements[j]);
                    var oldNode = parentNode.replaceChild(newNode, radElements[i]);
                    appendChildInOrder(parentNode, oldNode, tagName);
                    radElements = parentNode.getElementsByTagName(tagName);
                }
            }
        }
    }
}

function appendChildInOrder(parentNode, childNode, tagName) {
    if (tagName == "RAD_TABS" || tagName == "RAD_SECTIONS" || tagName == "RAD_BLK_FIELDS") {
        parentNode.appendChild(childNode);
    }
    else if (tagName == "RAD_DATA_BLOCKS") {
        var check = insertBeforeDOMNode(parentNode, childNode, "RAD_FIELDSETS");
        if (check == true) {
            return;
        }
        else if (check == false) {
            check = insertBeforeDOMNode(parentNode, childNode, "RAD_LOVS");
            if (check == true) {
                return;
            }
            else if (check == false) {
                check = insertBeforeDOMNode(parentNode, childNode, "RAD_ACTIONS");
                if (check == true) {
                    return;
                }
                else if (check == false) {
                    check = insertBeforeDOMNode(parentNode, childNode, "RAD_SUMMARY");
                    if (check == true) {
                        return;
                    }
                    else if (check == false) {
                        check = insertBeforeDOMNode(parentNode, childNode, "RAD_CALLFORM");
                        if (check == true) {
                            return;
                        }
                        else if (check == false) {
                            parentNode.appendChild(childNode);
                        }
                    }
                }
            }
        }
    }
    else if (tagName == "RAD_FIELDSETS") {
        var check = insertBeforeDOMNode(parentNode, childNode, "RAD_LOVS");
        if (check == true) {
            return;
        }
        else if (check == false) {
            check = insertBeforeDOMNode(parentNode, childNode, "RAD_ACTIONS");
            if (check == true) {
                return;
            }
            else if (check == false) {
                check = insertBeforeDOMNode(parentNode, childNode, "RAD_SUMMARY");
                if (check == true) {
                    return;
                }
                else if (check == false) {
                    check = insertBeforeDOMNode(parentNode, childNode, "RAD_CALLFORM");
                    if (check == true) {
                        return;
                    }
                    else if (check == false) {
                        parentNode.appendChild(childNode);
                    }
                }
            }
        }
    }
}

function insertBeforeDOMNode(parentNode, childNode, tagName) {
    var elements = dom.getElementsByTagName(tagName);
    if (elements.length > 0) {
        parentNode.insertBefore(childNode, elements[0]);
        return true;
    }
    else if (elements.length == 0) {
        return false;
    }
}

function fnsetTreeColor(divobject) {
    var greenNode = selectNodes(dom, ("//*[@Action='New']"));
    var blueNodes = selectNodes(dom, ("//*[@Changed]"));
    var treetags = divobject.getElementsByTagName("a");
    var strgreen = '~';
    var strblue = '~';
    for (var i = 0;i < greenNode.length;i++) {
        strgreen += greenNode[i].getAttribute("ID") + "~";
    }

    for (var i = 0;i < blueNodes.length;i++) {
        strblue += blueNodes[i].getAttribute("ID") + "~";
    }

    if (strgreen != '~' || strblue != '~') {
        for (var j = 0;j < treetags.length;j++) {
            if (strgreen.indexOf('~' + getInnerText(treetags[j]) + '~') !=  - 1)
                treetags[j].style.color = '#009900';
            if (strblue.indexOf('~' + getInnerText(treetags[j]) + '~') !=  - 1)
                treetags[j].style.color = '#0033CC';
        }
    }
}