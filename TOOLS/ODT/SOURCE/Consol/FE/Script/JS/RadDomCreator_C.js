/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadDomCreator.js
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
function CreateDOM(element) {

    var releaseNode = "RAD_KERNEL";

    var DATASRCNAME = "";
    DATASRCNAME = latestvalue;
    var rootnode = selectSingleNode(dom, ("//RAD_FUNCTIONS/" + releaseNode));
    var nodeArray = new Array();

    var ScreenSec = "";
    if (selected == "DSN") {

        var DataSource = dom.createElement("RAD_DATASOURCES");
        rootnode.appendChild(DataSource);
        nodeArray = elementArray['RAD_DATASOURCES'].split("~");

        for (var i = 0;i < nodeArray.length;i++) {
            var DsDetails = dom.createElement(nodeArray[i]);
            DataSource.appendChild(DsDetails);

            DataSource.setAttribute("ID", DATASRCNAME);
        }
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + DATASRCNAME + "']"), "DATASRC_NAME"), DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + DATASRCNAME + "']"), "MULTI_RECORD"), "N");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + DATASRCNAME + "']"), "RELATION_TYPE"), "1");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + DATASRCNAME + "']"), "MASTER_DATASRC"), "N");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + DATASRCNAME + "']"), "DATASRC_TYPE"), "NORMAL");
        if (pkcols != "null") {
            setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + DATASRCNAME + "']"), "PK_COLS"), pkcols);
        }
        if (pkcolsDataType != "null") {
            setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + DATASRCNAME + "']"), "PK_TYPES"), pkcolsDataType);
        }
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + DATASRCNAME + "']"), "RELEASE_TYPE"), parent.relType);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + DATASRCNAME + "']"), "RELEASE_NAME"), parent.relName);

        setScreens("DBT");
        showData("DSN~" + DATASRCNAME);
        Preobjec = "DSN~" + DATASRCNAME;
        PreNode = DATASRCNAME;

    }
    else if (selected == "SCR") {

        var RadScreens = dom.createElement("RAD_SCREENS");
        rootnode.appendChild(RadScreens);
        nodeArray = elementArray['RAD_SCREENS'].split("~");

        for (var i = 0;i < nodeArray.length;i++) {
            var Screens = dom.createElement(nodeArray[i]);
            RadScreens.appendChild(Screens);
            RadScreens.setAttribute("ID", DATASRCNAME);
        }
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "SCREEN_NAME"), DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "SCREEN_POSITION"), "TEMPLATE");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "SCREEN_SIZE"), "SMALL");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "MAIN_SCREEN"), "N");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "EXIT_BUTTON_TYPE"), "1");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "SCREEN_VISIBLE"), "Y");
		setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "SCREEN_QUERYREQ"), "N");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "IMGFLD_QUERYREQ"), "N");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "RELEASE_TYPE"), parent.relType);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']"), "RELEASE_NAME"), parent.relName);

        var screensecArray = new Array();
        var secRootNode = selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']");

        var sec1 = dom.createElement("HEADER");

        var headerTab = dom.createElement("RAD_TABS");
        headerTab.setAttribute("ID", "TAB_HEADER");

        screensecArray = "";
        screensecArray = elementArray['RAD_TABS'].split("~");
        for (var i = 0;i < screensecArray.length;i++) {
            var prop = dom.createElement(screensecArray[i]);
            headerTab.appendChild(prop);
        }

        sec1.appendChild(headerTab);
        secRootNode.appendChild(sec1);
        sec1.setAttribute("ID", "HEADER");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/HEADER[@ID='HEADER']/RAD_TABS[@ID='TAB_HEADER']"), "TAB_NAME"), "TAB_HEADER");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/HEADER[@ID='HEADER']/RAD_TABS[@ID='TAB_HEADER']"), "SCREEN_NAME"), DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/HEADER[@ID='HEADER']/RAD_TABS[@ID='TAB_HEADER']"), "TAB_VISIBLE"), "Y");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/HEADER[@ID='HEADER']/RAD_TABS[@ID='TAB_HEADER']"), "TAB_FUNC_ID"), "");
		setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/HEADER[@ID='HEADER']/RAD_TABS[@ID='TAB_HEADER']"), "RELEASE_TYPE"), parent.relType);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/HEADER[@ID='HEADER']/RAD_TABS[@ID='TAB_HEADER']"), "RELEASE_NAME"), parent.relName);

        var sec2 = dom.createElement("BODY");
        var bodyTab = dom.createElement("RAD_TABS");
        bodyTab.setAttribute("ID", "TAB_MAIN");

        screensecArray = "";
        screensecArray = elementArray['RAD_TABS'].split("~");
        for (var i = 0;i < screensecArray.length;i++) {
            var prop = dom.createElement(screensecArray[i]);
            bodyTab.appendChild(prop);
        }

        sec2.appendChild(bodyTab);
        secRootNode.appendChild(sec2);
        sec2.setAttribute("ID", "BODY");

        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/BODY[@ID='BODY']/RAD_TABS[@ID='TAB_MAIN']"), "TAB_NAME"), "TAB_MAIN");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/BODY[@ID='BODY']/RAD_TABS[@ID='TAB_MAIN']"), "SCREEN_NAME"), DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/BODY[@ID='BODY']/RAD_TABS[@ID='TAB_MAIN']"), "TAB_VISIBLE"), "Y");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/BODY[@ID='BODY']/RAD_TABS[@ID='TAB_MAIN']"), "TAB_FUNC_ID"), "");
		setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/BODY[@ID='BODY']/RAD_TABS[@ID='TAB_MAIN']"), "RELEASE_TYPE"), parent.relType);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/BODY[@ID='BODY']/RAD_TABS[@ID='TAB_MAIN']"), "RELEASE_NAME"), parent.relName);

        var sec3 = dom.createElement("FOOTER");
        var footerTab = dom.createElement("RAD_TABS");
        footerTab.setAttribute("ID", "TAB_FOOTER");

        screensecArray = "";

        screensecArray = elementArray['RAD_TABS'].split("~");
        for (var i = 0;i < screensecArray.length;i++) {
            var prop = dom.createElement(screensecArray[i]);
            footerTab.appendChild(prop);
        }

        sec3.appendChild(footerTab);
        secRootNode.appendChild(sec3);
        sec3.setAttribute("ID", "FOOTER");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/FOOTER[@ID='FOOTER']/RAD_TABS[@ID='TAB_FOOTER']"), "TAB_NAME"), "TAB_FOOTER");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/FOOTER[@ID='FOOTER']/RAD_TABS[@ID='TAB_FOOTER']"), "SCREEN_NAME"), DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/FOOTER[@ID='FOOTER']/RAD_TABS[@ID='TAB_FOOTER']"), "TAB_VISIBLE"), "Y");
		setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/FOOTER[@ID='FOOTER']/RAD_TABS[@ID='TAB_FOOTER']"), "TAB_FUNC_ID"), "");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/FOOTER[@ID='FOOTER']/RAD_TABS[@ID='TAB_FOOTER']"), "RELEASE_TYPE"), parent.relType);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + DATASRCNAME + "']/FOOTER[@ID='FOOTER']/RAD_TABS[@ID='TAB_FOOTER']"), "RELEASE_NAME"), parent.relName);

        setScreens("SSC");
        showData("SCR~" + DATASRCNAME);
        Preobjec = "SCR~" + DATASRCNAME;
        PreNode = DATASRCNAME;

    }
    else if (selected == "SSC" || selected == "HEADER" || selected == "BODY" || selected == "FOOTER") {
        if (clickedobjects[2] == "HEADER") {
            ScreenSec = "HEADER";
        }
        else if (clickedobjects[2] == "BODY") {
            ScreenSec = "BODY";
        }
        else {
            ScreenSec = "FOOTER";
        }

        var tabs = dom.createElement("RAD_TABS");

        nodeArray = elementArray['RAD_TABS'].split("~");
        for (var i = 0;i < nodeArray.length;i++) {
            var prop = dom.createElement(nodeArray[i]);
            tabs.appendChild(prop);
        }

        tabs.setAttribute("ID", DATASRCNAME);

        selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']/" + ScreenSec + "[@ID='" + clickedobjects[2] + "']").appendChild(tabs);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']/" + ScreenSec + "[@ID='" + clickedobjects[2] + "']/RAD_TABS[@ID='" + DATASRCNAME + "']"), "TAB_NAME"), DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']/" + ScreenSec + "[@ID='" + clickedobjects[2] + "']/RAD_TABS[@ID='" + DATASRCNAME + "']"), "SCREEN_NAME"), clickedobjects[1]);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']/" + ScreenSec + "[@ID='" + clickedobjects[2] + "']/RAD_TABS[@ID='" + DATASRCNAME + "']"), "TAB_VISIBLE"), "Y");
		setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']/" + ScreenSec + "[@ID='" + clickedobjects[2] + "']/RAD_TABS[@ID='" + DATASRCNAME + "']"), "TAB_FUNC_ID"), "");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']/" + ScreenSec + "[@ID='" + clickedobjects[2] + "']/RAD_TABS[@ID='" + DATASRCNAME + "']"), "RELEASE_TYPE"), parent.relType);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']/" + ScreenSec + "[@ID='" + clickedobjects[2] + "']/RAD_TABS[@ID='" + DATASRCNAME + "']"), "RELEASE_NAME"), parent.relName);

        setScreens("TAB");
        showData("SCR" + "~" + clickedobjects[1] + "~" + clickedobjects[2] + "~" + DATASRCNAME);
        Preobjec = "SCR" + "~" + clickedobjects[1] + "~" + clickedobjects[2] + "~" + DATASRCNAME;
        PreNode = DATASRCNAME;

    }
    else if (selected == "TAB") {

        var Sections = dom.createElement("RAD_SECTIONS");

        nodeArray = elementArray['RAD_SECTIONS'].split("~");

        for (var i = 0;i < nodeArray.length;i++) {
            var prop = dom.createElement(nodeArray[i]);
            Sections.appendChild(prop);
        }
        Sections.setAttribute("ID", DATASRCNAME);

        if (clickedobjects[2] == "HEADER") {
            ScreenSec = "HEADER";
        }
        else if (clickedobjects[2] == "BODY") {
            ScreenSec = "BODY";
        }
        else {
            ScreenSec = "FOOTER";
        }

        selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']/" + ScreenSec + "[@ID='" + clickedobjects[2] + "']/RAD_TABS[@ID='" + clickedobjects[3] + "']").appendChild(Sections);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']/" + ScreenSec + "[@ID='" + clickedobjects[2] + "']/RAD_TABS[@ID='" + clickedobjects[3] + "']/RAD_SECTIONS[@ID='" + DATASRCNAME + "']"), "SECTION_NAME"), DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']/" + ScreenSec + "[@ID='" + clickedobjects[2] + "']/RAD_TABS[@ID='" + clickedobjects[3] + "']/RAD_SECTIONS[@ID='" + DATASRCNAME + "']"), "TAB_NAME"), clickedobjects[3]);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']/" + ScreenSec + "[@ID='" + clickedobjects[2] + "']/RAD_TABS[@ID='" + clickedobjects[3] + "']/RAD_SECTIONS[@ID='" + DATASRCNAME + "']"), "SCREEN_PORTION"), clickedobjects[2]);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']/" + ScreenSec + "[@ID='" + clickedobjects[2] + "']/RAD_TABS[@ID='" + clickedobjects[3] + "']/RAD_SECTIONS[@ID='" + DATASRCNAME + "']"), "SEC_VISIBLE"), "Y");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']/" + ScreenSec + "[@ID='" + clickedobjects[2] + "']/RAD_TABS[@ID='" + clickedobjects[3] + "']/RAD_SECTIONS[@ID='" + DATASRCNAME + "']"), "RELEASE_TYPE"), parent.relType);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']/" + ScreenSec + "[@ID='" + clickedobjects[2] + "']/RAD_TABS[@ID='" + clickedobjects[3] + "']/RAD_SECTIONS[@ID='" + DATASRCNAME + "']"), "RELEASE_NAME"), parent.relName);

        setScreens("SEC");
        showData("SCR" + "~" + clickedobjects[1] + "~" + clickedobjects[2] + "~" + clickedobjects[3] + "~" + DATASRCNAME);
        Preobjec = "SCR" + "~" + clickedobjects[1] + "~" + clickedobjects[2] + "~" + clickedobjects[3] + "~" + DATASRCNAME;
        PreNode = DATASRCNAME;

    }
    else if (selected == "BLK") {

        var Blocks = dom.createElement("RAD_DATA_BLOCKS");

        rootnode.appendChild(Blocks);
        nodeArray = elementArray['RAD_DATA_BLOCKS'].split("~");

        for (var i = 0;i < nodeArray.length;i++) {
            var prop = dom.createElement(nodeArray[i]);
            Blocks.appendChild(prop);
        }
        Blocks.setAttribute("ID", DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + DATASRCNAME + "']"), "BLOCK_NAME"), DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + DATASRCNAME + "']"), "MULTI_RECORD"), "N");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + DATASRCNAME + "']"), "MASTER_BLOCK"), "N");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + DATASRCNAME + "']"), "RELATION_TYPE"), "1");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + DATASRCNAME + "']"), "BLOCK_TYPE"), "NORMAL");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + DATASRCNAME + "']"), "RELEASE_TYPE"), parent.relType);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + DATASRCNAME + "']"), "RELEASE_NAME"), parent.relName);

        var xsd_node = DATASRCNAME.substring(4, DATASRCNAME.length);
        xsd_node = xsd_node.replace("-", "_");
        var xsd_modify = "";

        var xsd_underscr = xsd_node.split("_");
        for (var index = 0;index < xsd_underscr.length;index++) {
            xsd_modify = xsd_modify + xsd_underscr[index].substring(0, 1).toUpperCase() + xsd_underscr[index].substring(1, xsd_underscr[index].length).toLowerCase() + "-";
        }
        if (xsd_modify != "") {
            xsd_node = xsd_modify;
        }

        if (xsd_node.substring(xsd_node.length - 1, xsd_node.length) == "-") {
            xsd_node = xsd_node.substring(0, xsd_node.length - 1)
        }

        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + DATASRCNAME + "']"), "XSD_NODE"), xsd_node);

        setScreens("BNM");
        showData("BLK" + "~" + DATASRCNAME);
        Preobjec = "BLK" + "~" + DATASRCNAME;
        PreNode = DATASRCNAME;

    }
    else if (selected == "BNM") {
        if (UIFlag == "FIELD") {
            for (var index = 0;index < blockColumnArray.length;index++) {
                var blkFields = dom.createElement("RAD_BLK_FIELDS");

                nodeArray = elementArray['RAD_BLK_FIELDS'].split("~");

                for (var i = 0;i < nodeArray.length;i++) {
                    var prop = dom.createElement(nodeArray[i]);
                    blkFields.appendChild(prop);
                }
                blkFields.setAttribute("ID", blockFieldsArray[index]);
                selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']").appendChild(blkFields);
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + blockFieldsArray[index] + "']"), "DBC"), blockColumnArray[index]);
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + blockFieldsArray[index] + "']"), "FIELD_NAME"), blockFieldsArray[index]);
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + blockFieldsArray[index] + "']"), "DBT"), DATASRCNAME);
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + blockFieldsArray[index] + "']"), "MAX_LENGTH"), blockMaxLengthArray[index]);
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + blockFieldsArray[index] + "']"), "MAX_DECIMALS"), blockDecimalArray[index]);
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + blockFieldsArray[index] + "']"), "DATATYPE"), blockDataTypeArray[index]);
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + blockFieldsArray[index] + "']"), "VISIBLE"), "Y");
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + blockFieldsArray[index] + "']"), "LOV_VAL_REQ"), "Y");
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + blockFieldsArray[index] + "']"), "ITEM_TYPE"), "DBITEM");
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + blockFieldsArray[index] + "']"), "DISPLAY_TYPE"), "TEXT");
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + blockFieldsArray[index] + "']"), "RELEASE_TYPE"), parent.relType);
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + blockFieldsArray[index] + "']"), "RELEASE_NAME"), parent.relName);
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + blockFieldsArray[index] + "']"), "LABEL_CODE"), blockLblCodeArray[index]);
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + blockFieldsArray[index] + "']"), "XSD_TAG"), blockLblCodeArray[index].substring(blockLblCodeArray[index].indexOf("LBL_") + 4, blockLblCodeArray[index].length));
				
                setScreens("BFD");
                showData("BLK" + "~" + clickedobjects[1] + "~" + blockFieldsArray[0]);
                Preobjec = "BLK" + "~" + clickedobjects[1] + "~" + blockFieldsArray[0];
                PreNode = blockColumnArray[0];
            }

        }
        else {
            for (var index = 0;index < columnsUIArr.length - 1;index++) {
                var FIEDLS = dom.createElement("RAD_BLK_FIELDS");
                nodeArray = elementArray['RAD_BLK_FIELDS'].split("~");

                for (var i = 0;i < nodeArray.length;i++) {
                    var prop = dom.createElement(nodeArray[i]);
                    FIEDLS.appendChild(prop);
                }

                FIEDLS.setAttribute("ID", columnsUIArr[index]);
                selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']").appendChild(FIEDLS);

                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + columnsUIArr[index] + "']"), "FIELD_NAME"), columnsUIArr[index]);
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + columnsUIArr[index] + "']"), "DATATYPE"), columnsUIDTArr[index]);
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + columnsUIArr[index] + "']"), "VISIBLE"), "Y");
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + columnsUIArr[index] + "']"), "RELEASE_TYPE"), parent.relType);
                setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + columnsUIArr[index] + "']"), "RELEASE_NAME"), parent.relName);
                if (getNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + columnsUIArr[index] + "']"), "DISPLAY_TYPE")) != "") {
                    setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + columnsUIArr[index] + "']"), "ITEM_TYPE"), "CONTROL");
                    setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + columnsUIArr[index] + "']"), "DISPLAY_TYPE"), "TEXT");
                }
                else {
                    setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + columnsUIArr[index] + "']"), "ITEM_TYPE"), "CONTROL");
                    setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + columnsUIArr[index] + "']"), "DISPLAY_TYPE"), "TEXT");
                }

            }
            setScreens("BFD");
            showData("BLK" + "~" + clickedobjects[1] + "~" + columnsUIArr[0]);
            Preobjec = "BLK" + "~" + clickedobjects[1] + "~" + columnsUIArr[0];
            PreNode = columnsUIArr[0];
        }

    }
    else if (selected == "FLD") {

        var Fieldsets = dom.createElement("RAD_FIELDSETS");

        rootnode.appendChild(Fieldsets);
        nodeArray = elementArray['RAD_FIELDSETS'].split("~");

        for (var i = 0;i < nodeArray.length;i++) {
            var prop = dom.createElement(nodeArray[i]);
            Fieldsets.appendChild(prop);
        }
        Fieldsets.setAttribute("ID", DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_FIELDSETS[@ID='" + DATASRCNAME + "']"), "FIELDSET_NAME"), DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_FIELDSETS[@ID='" + DATASRCNAME + "']"), "FIELDSET_VISIBLE"), "Y");
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_FIELDSETS[@ID='" + DATASRCNAME + "']"), "RELEASE_TYPE"), parent.relType);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_FIELDSETS[@ID='" + DATASRCNAME + "']"), "RELEASE_NAME"), parent.relName);
		setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_FIELDSETS[@ID='" + DATASRCNAME + "']"), "FIELDSET_TYPE"), "Normal");

        setScreens("FDN");
        showData("FLD" + "~" + DATASRCNAME);
        Preobjec = "FLD" + "~" + DATASRCNAME;
        PreNode = DATASRCNAME;

    }
    else if (selected == "SUM") {

        if (selectNodes(dom, "//RAD_SUMMARY").length == 0) {

            var summary = dom.createElement("RAD_SUMMARY");
            rootnode.appendChild(summary);
            nodeArray = elementArray['RAD_SUMMARY'].split("~");
            for (var i = 0;i < nodeArray.length;i++) {
                var prop = dom.createElement(nodeArray[i]);
                summary.appendChild(prop);
            }
            summary.setAttribute("ID", "SUMMARY");

        }
    }
    else if (selected == "MND") {

        if (selectNodes(dom, "//RAD_FUNC_PREFERENCES").length == 0) {
            var menudtls = dom.createElement("RAD_FUNC_PREFERENCES");
            rootnode.appendChild(menudtls);
            nodeArray = elementArray['RAD_FUNC_PREFERENCES'].split("~");
            for (var i = 0;i < nodeArray.length;i++) {
                var prop = dom.createElement(nodeArray[i]);
                menudtls.appendChild(prop);
            }
            menudtls.setAttribute("ID", "MENU");
        }

    }
    else if (selected == "LOV") {

        var Lovs = dom.createElement("RAD_LOVS");

        rootnode.appendChild(Lovs);
        nodeArray = elementArray['RAD_LOVS'].split("~");

        for (var i = 0;i < nodeArray.length;i++) {
            var prop = dom.createElement(nodeArray[i]);
            Lovs.appendChild(prop);
        }
        Lovs.setAttribute("ID", DATASRCNAME);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_LOVS[@ID='" + DATASRCNAME + "']"), "LOV_NAME"), DATASRCNAME); 
		setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_LOVS[@ID='" + DATASRCNAME + "']"), "RELEASE_TYPE"), parent.relType);
        setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_LOVS[@ID='" + DATASRCNAME + "']"), "RELEASE_NAME"), parent.relName);
        setScreens("LNM");
        showData("LOV" + "~" + DATASRCNAME);
        Preobjec = "LOV" + "~" + DATASRCNAME;
        PreNode = DATASRCNAME;

    }
    else {

        for (var index = 0;index < columns.length;index++) {
            var FIEDLS = dom.createElement("RAD_FIELDS");

            nodeArray = elementArray['RAD_FIELDS'].split("~");

            for (var i = 0;i < nodeArray.length;i++) {
                var prop = dom.createElement(nodeArray[i]);
                FIEDLS.appendChild(prop);
            }
            FIEDLS.setAttribute("ID", columns[index]);
            selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + clickedobjects[1] + "']").appendChild(FIEDLS);
            setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + clickedobjects[1] + "']/RAD_FIELDS[@ID='" + columns[index] + "']"), "COLUMN_NAME"), columns[index]);
            setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + clickedobjects[1] + "']/RAD_FIELDS[@ID='" + columns[index] + "']"), "DATATYPE"), columnDataTypes[index]);
            setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + clickedobjects[1] + "']/RAD_FIELDS[@ID='" + columns[index] + "']"), "MAX_LENGTH"), columnSizes[index]);
            setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + clickedobjects[1] + "']/RAD_FIELDS[@ID='" + columns[index] + "']"), "MAX_DECIMALS"), coldecimal[index]);
            setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + clickedobjects[1] + "']/RAD_FIELDS[@ID='" + columns[index] + "']"), "FIELD_NAME"), columnFiledName[index]);
            setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + clickedobjects[1] + "']/RAD_FIELDS[@ID='" + columns[index] + "']"), "RELEASE_TYPE"), parent.relType);
            setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + clickedobjects[1] + "']/RAD_FIELDS[@ID='" + columns[index] + "']"), "RELEASE_NAME"), parent.relName);
			if(getNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + clickedobjects[1] + "']"), "UPLOAD_TABLE")) != ""){
			   setNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + clickedobjects[1] + "']/RAD_FIELDS[@ID='" + columns[index] + "']"), "UPLD_TABLE_COLUMN"), columns[index]);
            }
		}
        setScreens("DBC");
        showData("DSN" + "~" + clickedobjects[1] + "~" + columns[0]);
        Preobjec = "DSN" + "~" + clickedobjects[1] + "~" + columns[0];
        PreNode = columns[0];
        for (var i = 0;i < columns.length;i++) {
            delete columns[i];
        }
    }

    if (selected != "SUM") {
        if (selected != "MND") {
            updateTreeAfterAdd(element);

            for (var i = 0;i < clickedobjects.length;i++) {

                if (clickedobjects[i] != null) {
                    var value = getbranch(clickedxpath, i);
                    var valueWithtilda = value.substring(value.length, value.length - 1);
                    if (valueWithtilda == "~") {
                        value = value.substring(0, value.length - 1);
                    }
                }
            }
        }
    }
}

function getbranch(brahcValue, count) {

    var branchArray = new Array();
    branchArray = brahcValue.split("~");
    var value = "";
    if (count == 0) {
        value = branchArray[0];
    }
    else {
        for (var i = 0;i <= count;i++) {
            value += branchArray[i] + "~";
        }
    }

    return value;

}