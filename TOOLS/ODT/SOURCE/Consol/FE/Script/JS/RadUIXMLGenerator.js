/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadUIXMLGenerator.js
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

var xmldoc = "";
var genuixml = "";
var pUixmlFldList = '~';// amount field validation shihab
var Customer_Land=false;
function transformDOMtoUIxml(xmldoc1) {
try{
if(getNodeText(selectSingleNode(xmldoc1, "//RAD_FUNCTIONS/LANDING_PAGE_COMPONENT"))=="Y")
Customer_Land=true;
else
Customer_Land=false;
}
catch(e){
Customer_Land=false;
}
    xmldoc = xmldoc1;
    try {
        newel = xmldoc.createElement("FORM");
    }
    catch (e) {
        xmldoc = loadXMLDoc(xmldoc);
        newel = xmldoc.createElement("FORM");
    }

    genuixml = loadXMLDoc('<?xml version="1.0"?>' + getXMLString(newel));
    if (selectNodes(xmldoc, "//RAD_SUMMARY").length > 0) {
		if(Customer_Land){
        newel = createSummaryNode_Customer();
		}
		else
		{
        newel = createSummaryNode();
		}
        x = selectNodes(genuixml, "FORM")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }
    var screens = selectNodes(xmldoc, "//RAD_SCREENS[SCREEN_VISIBLE='Y']");
    for (var i = 0;i < screens.length;i++) {
        var fld = screens[i].getAttribute("ID");
        if (!(newel = createScreenNode(fld))) {

            return false;
        }

        x = selectNodes(genuixml, "FORM")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));

    }

    return genuixml;
}

function setAttrib(obj, attr, value) {
    obj.setAttribute(attr, value);
}

function mapAttributeValue(obj, objId) {
    var atrrb = attributeArray[obj].split("~");
    for (var i = 0;i < atrrb.length;i++) {
        var attr = atrrb[i];
        var val = fngetval()
        setAttrib(obj, attr, val)
    }
}

function fnCreatefield(blkId, fldId, summaryfld) {

    var fldNode = selectSingleNode(xmldoc, "//RAD_DATA_BLOCKS[@ID='" + blkId + "']/RAD_BLK_FIELDS[@ID='" + fldId + "']");
    var traildom = createRootNode("FIELD");
    if (!fldNode) {
        return false;
    }

    x = traildom.getElementsByTagName("FIELD")[0];
    newl = traildom.createElement("NAME");
    setNodeText(newl, fldId);
    x.appendChild(newl);
    if (selectSingleNode(fldNode, "DISPLAY_TYPE")) {
        newl = traildom.createElement("TYPE");
        var lov111Name = getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE"));
        if (getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")) == "LOV" && getNodeText(selectSingleNode(fldNode, "VISIBLE")) == "Y") {
            setNodeText(newl, "TEXT");

        }
        else if (getNodeText(selectSingleNode(fldNode, "VISIBLE")) == "N") {
            setNodeText(newl, "HIDDEN");
        }
        else if (getNodeText(selectSingleNode(fldNode, "VISIBLE")) == "Y" && getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")) != "LOV" && getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")) != "ROSELECT") {
            if (getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")) == "BUTTON" && selectNodes(fldNode, "RAD_FIELD_EVENTS").length < 1) {
                setNodeText(newl, "HIDDEN");
            }
            else {
                setNodeText(newl, getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")));
            }
        }

        else if (getNodeText(selectSingleNode(fldNode, "VISIBLE")) == "Y" && getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")) == "ROSELECT") {
            setNodeText(newl, "ROSELECT");
        }
        else {
            setNodeText(newl, getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")));
        }

        x.appendChild(newl);
    }

    //Sum Lov Changes
	 var summaryfldNode = selectSingleNode(xmldoc, "//RAD_SUMMARY/SUMMARY_DETAILS[@ID='" + fldId + "']");
    var fldnode = selectSingleNode(xmldoc, "//RAD_SUMMARY");
	
	 if (summaryfld && selectSingleNode(summaryfldNode, "MIN_CHAR_LEN")) {
	 if(getNodeText(selectSingleNode(fldnode, "BLIND_SEARCH"))=='Y'){
        newl = traildom.createElement("MIN_CHAR");
        setNodeText(newl, getNodeText(selectSingleNode(summaryfldNode, "MIN_CHAR_LEN")));
        x.appendChild(newl);
    }
    }
    if (summaryfld) {
        var summaryfldlov = getNodeText(selectSingleNode(xmldoc, "//RAD_SUMMARY/SUMMARY_DETAILS[@ID='" + fldId + "']/LOV_NAME"))
        if (summaryfldlov != "") {
	
            if (selectNodes(xmldoc, "//RAD_LOVS[LOV_NAME='" + summaryfldlov + "']").length > 0) {
                var type = "L";
            }
            else {
                var type = "G";
            }
            var lovnode = "LOV";
            newel = createLovNode(lovnode, summaryfldlov + "_S", type, fldNode);
            x = traildom.getElementsByTagName("FIELD")[0];
            x.appendChild(fnImportNode(newel, newel.documentElement));

        }
    }

    //Sum Lov Changes
    if (/*!summaryfld &&*/ selectSingleNode(fldNode, "MAX_DECIMALS") && getNodeText(selectSingleNode(fldNode, "DATATYPE")) == "NUMBER") {
        newl = traildom.createElement("MAX_DECIMALS");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "MAX_DECIMALS")));
        x.appendChild(newl);
    }

    if (getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")) == "CHECKBOX") {
        var CustomAttrNodes = selectNodes(fldNode, "RAD_FIELD_CUSTOM_ATTRS");
        newel = createCustomCheckboxNode(blkId, fldId);
        x = traildom.getElementsByTagName("FIELD")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
        if (selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='ON']")) {
            if (getNodeText(selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='ON']/ATTR_NAME")) == "ON") {

                if (getNodeText(selectSingleNode(fldNode, "DEFAULT_VALUE")) == getNodeText(selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='ON']/ATTR_VALUE"))) {
                    newl = traildom.createElement("CHECKED");
                    setNodeText(newl, "-1");
                    x.appendChild(newl);
                }
                else {
                    newl = traildom.createElement("CHECKED");
                    setNodeText(newl, getNodeText(selectSingleNode(fldNode, "CHECKED")));
                    x.appendChild(newl);
                }
            }
        }
        else if (selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='YES']")) {
            if (getNodeText(selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='YES']/ATTR_NAME")) == "YES") {
                if (getNodeText(selectSingleNode(fldNode, "DEFAULT_VALUE")) == getNodeText(selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='YES']/ATTR_VALUE"))) {
                    newl = traildom.createElement("CHECKED");
                    setNodeText(newl, "-1");
                    x.appendChild(newl);
                }
                else {
                    newl = traildom.createElement("CHECKED");
                    setNodeText(newl, getNodeText(selectSingleNode(fldNode, "CHECKED")));
                    x.appendChild(newl);
                }
            }
        }
        else if (selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='LBL_ON']")) {
            if (getNodeText(selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='LBL_ON']/ATTR_NAME")) == "LBL_ON") {
                if (getNodeText(selectSingleNode(fldNode, "DEFAULT_VALUE")) == getNodeText(selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='LBL_ON']/ATTR_VALUE"))) {
                    newl = traildom.createElement("CHECKED");
                    setNodeText(newl, "-1");
                    x.appendChild(newl);
                }
                else {
                    newl = traildom.createElement("CHECKED");
                    setNodeText(newl, getNodeText(selectSingleNode(fldNode, "CHECKED")));
                    x.appendChild(newl);
                }
            }
        }
        else if (selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='LBL_CHECK']")) {
            if (getNodeText(selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='LBL_CHECK']/ATTR_NAME")) == "LBL_CHECK") {
                if (getNodeText(selectSingleNode(fldNode, "DEFAULT_VALUE")) == getNodeText(selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='LBL_CHECK']/ATTR_VALUE"))) {
                    newl = traildom.createElement("CHECKED");
                    setNodeText(newl, "-1");
                    x.appendChild(newl);
                }
                else {
                    newl = traildom.createElement("CHECKED");
                    setNodeText(newl, getNodeText(selectSingleNode(fldNode, "CHECKED")));
                    x.appendChild(newl);
                }
            }
        }
        else if (selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='LBL_CHECKED']")) {
            if (getNodeText(selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='LBL_CHECKED']/ATTR_NAME")) == "LBL_CHECKED") {
                if (getNodeText(selectSingleNode(fldNode, "DEFAULT_VALUE")) == getNodeText(selectSingleNode(fldNode, "RAD_FIELD_CUSTOM_ATTRS[@ID='LBL_CHECKED']/ATTR_VALUE"))) {
                    newl = traildom.createElement("CHECKED");
                    setNodeText(newl, "-1");
                    x.appendChild(newl);
                }
                else {
                    newl = traildom.createElement("CHECKED");
                    setNodeText(newl, getNodeText(selectSingleNode(fldNode, "CHECKED")));
                    x.appendChild(newl);
                }
            }
        }

    }

    if (getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")) == "SELECT" || getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")) == "ROSELECT") {
        var CustomAttrNodes = selectNodes(fldNode, "RAD_FIELD_CUSTOM_ATTRS");
        for (var attr = 0;attr < CustomAttrNodes.length;attr++) {
            if (getNodeText(selectSingleNode(CustomAttrNodes[attr], "ACTIVE")) == 'Y') {
                newl = traildom.createElement("OPTION");
                setNodeText(newl, getNodeText(selectSingleNode(CustomAttrNodes[attr], "ATTR_NAME")));
                if (getNodeText(selectSingleNode(fldNode, "DEFAULT_VALUE")) == getNodeText(selectSingleNode(CustomAttrNodes[attr], "ATTR_VALUE"))) {
                    newl.setAttribute("SELECTED", "-1");
                }
                else {
                    newl.setAttribute("SELECTED", "0");
                }
                newl.setAttribute("VALUE", getNodeText(selectSingleNode(CustomAttrNodes[attr], "ATTR_VALUE")));
                x.appendChild(newl);
            }
        }
    }
    if (getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")) == "RADIO") {

        var CustomAttrNodes = selectNodes(fldNode, "RAD_FIELD_CUSTOM_ATTRS");
        for (var attr = 0;attr < CustomAttrNodes.length;attr++) {
            if (getNodeText(selectSingleNode(CustomAttrNodes[attr], "ACTIVE")) == 'Y') {
                var options = CustomAttrNodes[attr].getAttribute("ID");
                newel = createOptionsForRadioNode(fldId, options, getNodeText(selectSingleNode(fldNode, "DEFAULT_VALUE")));
                x = traildom.getElementsByTagName("FIELD")[0];
                x.appendChild(fnImportNode(newel, newel.documentElement));
            }
        }
    }
    if (getNodeText(selectSingleNode(fldNode,"DISPLAY_TYPE")) == "OCX") {
			newl = traildom.createElement("OBJECT"); 
                        x.appendChild(newl);
                        traildom.getElementsByTagName("OBJECT")[0].setAttribute("ID", getNodeText(selectSingleNode(fldNode,"DISPLAY_TYPE")));
			traildom.getElementsByTagName("OBJECT")[0].setAttribute("CLASSID", getNodeText(selectSingleNode(fldNode,"CLASSID")));
    }
    if (selectSingleNode(fldNode, "LABEL_CODE")) {
        newl = traildom.createElement("LBL");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "LABEL_CODE")));
        x.appendChild(newl);
    }

    if (selectSingleNode(fldNode, "REQUIRED") && getNodeText(selectSingleNode(fldNode, "REQUIRED")) == "Y") {
        newl = traildom.createElement("REQD");
        setNodeText(newl, "-1");
        x.appendChild(newl);
    }

    if (selectSingleNode(fldNode, "MAX_LENGTH")) {
        newl = traildom.createElement("MAXLENGTH");
        if (getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")) == "DATE") {
            setNodeText(newl, "11");
        }
        // MAX_DECIMALS IN MAX_LENGTH Start here 
        else if (getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")) == "AMOUNT" && selectSingleNode(fldNode, "MAX_DECIMALS") != null) {
            if (getNodeText(selectSingleNode(fldNode, "MAX_DECIMALS")) != "") {
                var maxd = getNodeText(selectSingleNode(fldNode, "MAX_DECIMALS"));
                var maxl = getNodeText(selectSingleNode(fldNode, "MAX_LENGTH"));
                setNodeText(newl, maxl + "," + maxd);
            }
			else {
            setNodeText(newl, getNodeText(selectSingleNode(fldNode, "MAX_LENGTH")));
			}
        }
        // MAX_DECIMALS IN MAX_LENGTH ends here 
        else {
            setNodeText(newl, getNodeText(selectSingleNode(fldNode, "MAX_LENGTH")));
        }
        x.appendChild(newl);
    }
    if (selectSingleNode(fldNode, "READ_ONLY") && getNodeText(selectSingleNode(fldNode, "READ_ONLY")) == "Y") {
        newl = traildom.createElement("READ_ONLY");
        setNodeText(newl, "-1");
        x.appendChild(newl);
    }

    if (selectSingleNode(fldNode, "CALENDAR_TEXT") && getNodeText(selectSingleNode(fldNode, "CALENDAR_TEXT")) == "Y") {
        newl = traildom.createElement("CALENDARTEXT");
        setNodeText(newl, "-1");
        x.appendChild(newl);
    }

    if (getNodeText(selectSingleNode(fldNode, "VISIBLE")) == "N") {
        newl = traildom.createElement("HIDDEN");
        setNodeText(newl, "-1");
        x.appendChild(newl);
    }

    if (selectSingleNode(fldNode, "FORMAT_REQD") && getNodeText(selectSingleNode(fldNode, "FORMAT_REQD")) == "Y") {
        newl = traildom.createElement("FORMAT_REQD");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "FORMAT_REQD")));
        x.appendChild(newl);
    }
    if (selectSingleNode(fldNode, "CHK_UPPERCASE") && getNodeText(selectSingleNode(fldNode, "CHK_UPPERCASE")) == "Y") {
        newl = traildom.createElement("CASE");
        setNodeText(newl, "UPPER");
        x.appendChild(newl);
    }

    if (selectSingleNode(fldNode, "INPUT_ONLY_BY_LOV") && getNodeText(selectSingleNode(fldNode, "INPUT_ONLY_BY_LOV")) == "Y") {
        newl = traildom.createElement("INPUT_LOV");
        setNodeText(newl, "-1");
        x.appendChild(newl);
        if (!selectSingleNode(x, "READ_ONLY")) {
            newl = traildom.createElement("READ_ONLY");
            setNodeText(newl, "-1");
            x.appendChild(newl);
        }
    }

    if (selectSingleNode(fldNode, "DATATYPE")) {
        newl = traildom.createElement("DTYPE");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "DATATYPE")));
        x.appendChild(newl);
    }
    if (selectSingleNode(fldNode, "MAX_VAL") && selectSingleNode(fldNode, "DATATYPE") && getNodeText(selectSingleNode(fldNode, "DATATYPE")) == "NUMBER") {
        newl = traildom.createElement("MAX_VAL");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "MAX_VAL")));
        x.appendChild(newl);
    }

    if (selectSingleNode(fldNode, "MIN_VAL") && selectSingleNode(fldNode, "DATATYPE") && getNodeText(selectSingleNode(fldNode, "DATATYPE")) == "NUMBER") {
        newl = traildom.createElement("MIN_VAL");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "MIN_VAL")));
        x.appendChild(newl);
    }

    if (selectSingleNode(fldNode, "FIELD_SIZE")) {
        newl = traildom.createElement("SIZE");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "FIELD_SIZE")));
        x.appendChild(newl);
    }

    if (!summaryfld && selectSingleNode(fldNode, "TXTAREA_ROWS")) {
        newl = traildom.createElement("ROWS");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "TXTAREA_ROWS")));
        x.appendChild(newl);
    }

    if (!summaryfld && selectSingleNode(fldNode, "TXTAREA_COLS")) {
        newl = traildom.createElement("COLS");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "TXTAREA_COLS")));
        x.appendChild(newl);
    }

    if (selectSingleNode(fldNode, "RELATED_FIELD") && getNodeText(selectSingleNode(fldNode, "RELATED_FIELD")) != "") {
        newl = traildom.createElement("RELATED_FIELD");
        if (getNodeText(selectSingleNode(fldNode, "RELATED_BLOCK")) != blkId) {
            setNodeText(newl, getNodeText(selectSingleNode(fldNode, "RELATED_BLOCK")) + "__" + getNodeText(selectSingleNode(fldNode, "RELATED_FIELD")));
        }
        else {
            setNodeText(newl, getNodeText(selectSingleNode(fldNode, "RELATED_FIELD")));
        }
        x.appendChild(newl);
    }

    if (!summaryfld && (getNodeText(selectSingleNode(fldNode, "DEFAULT_VALUE")) != "")) {
        newl = traildom.createElement("VALUE");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "DEFAULT_VALUE")));
        x.appendChild(newl);
    }

    if (selectSingleNode(fldNode, "PREVIEW_VALUE") && getNodeText(selectSingleNode(fldNode, "PREVIEW_VALUE")) != "") {
        newl = traildom.createElement("PRE_VAL");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "PREVIEW_VALUE")));
        x.appendChild(newl);
    }

    if (selectSingleNode(fldNode, "MASK_ID") && getNodeText(selectSingleNode(fldNode, "MASK_ID")) != "" && getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")) == "DISPMASK") {
        newl = traildom.createElement("MASK_ID");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "MASK_ID")));
        x.appendChild(newl);
    }
	//vinit FOCUSREQ HOTKEYREQ
	if (selectSingleNode(fldNode, "HOTKEYREQ") && getNodeText(selectSingleNode(fldNode, "HOTKEYREQ")) != "" && getNodeText(selectSingleNode(fldNode, "HOTKEYREQ")) == "Y") {
        newl = traildom.createElement("HOTKEYREQ");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "HOTKEYREQ")));
        x.appendChild(newl);
    }
    
    if (selectSingleNode(fldNode, "HOTKEYREQJA") && getNodeText(selectSingleNode(fldNode, "HOTKEYREQJA")) != "" && getNodeText(selectSingleNode(fldNode, "HOTKEYREQJA")) == "Y") {
        newl = traildom.createElement("HOTKEYREQJA");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "HOTKEYREQJA")));
        x.appendChild(newl);
    }

	if (selectSingleNode(fldNode, "FOCUSREQ") && getNodeText(selectSingleNode(fldNode, "FOCUSREQ")) != "" && getNodeText(selectSingleNode(fldNode, "FOCUSREQ")) == "Y") {
        newl = traildom.createElement("FOCUSREQ");
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "FOCUSREQ")));
        x.appendChild(newl);
    }
//vinit FOCUSREQ HOTKEYREQ
    var events = selectNodes(fldNode, "RAD_FIELD_EVENTS[EVENTTYPE='NORMAL']");
    // CUSTOMER CHANGES 
	if ((Customer_Land && events.length > 0 ) || (!summaryfld && events.length > 0)) {
        for (var i = 0;i < events.length;i++) {
            var eventId = events[i].getAttribute("ID");
            newel = createEventsNode(blkId, fldId, eventId);
            x = traildom.getElementsByTagName("FIELD")[0];
            x.appendChild(fnImportNode(newel, newel.documentElement));
        }
    }

    //Amount code
    var Rflds = selectNodes(fldNode, "RAD_AMOUNT_FIELDS");
    if (!summaryfld && Rflds.length > 0) {
        newel = createAmountMainNode(blkId, fldId, Rflds);
        x = traildom.getElementsByTagName("FIELD")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }

    var lovName = getNodeText(selectSingleNode(fldNode, "LOV_NAME"));
    if (!summaryfld && (getNodeText(selectSingleNode(fldNode, "LOV_NAME")) != "")) {
        if (selectNodes(xmldoc, "//RAD_LOVS[LOV_NAME='" + lovName + "']").length > 0) {
            lovName = getNodeText(selectSingleNode(fldNode, "LOV_NAME"));
            var type = "L";
        }
        else {
            lovName = getNodeText(selectSingleNode(fldNode, "LOV_NAME"));
            var type = "G";
        }
        var lovnode = "LOV";
        newel = createLovNode(lovnode, lovName, type , fldNode);
        x = traildom.getElementsByTagName("FIELD")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }

    var offlinelovName = getNodeText(selectSingleNode(fldNode, "OFF_LINE_LOV_NAME"));
    if (!summaryfld && getNodeText(selectSingleNode(fldNode, "OFF_LINE_LOV_NAME")) != "") {

        if (selectNodes(xmldoc, "//RAD_LOVS[LOV_NAME='" + offlinelovName + "']").length > 0) {
            offlinelovName = getNodeText(selectSingleNode(fldNode, "OFF_LINE_LOV_NAME"));
            var type = "L";
        }
        else {
            offlinelovName = getNodeText(selectSingleNode(fldNode, "OFF_LINE_LOV_NAME"));
            var type = "G";
        }
        var lovnode = "OFFLINE_LOV";
        newel = createLovNode(lovnode, offlinelovName, type ,fldNode);
        x = traildom.getElementsByTagName("FIELD")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }
    if (!summaryfld && getNodeText(selectSingleNode(fldNode, "POPEDIT_REQUIRED")) == "Y") {
        var title = getNodeText(selectSingleNode(fldNode, "LABEL_CODE"));
        var ImgSrc = "";
        newel = createPopupEditNode(title, ImgSrc);
        x = traildom.getElementsByTagName("FIELD")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }
    if (getNodeText(selectSingleNode(xmldoc, "//RAD_FUNCTIONS/FUNCTION_CATEGORY")) == 'DASHBOARD') {
        var sumscrName = getNodeText(selectSingleNode(xmldoc, "//RAD_SUMMARY/MAIN_SUMM_SCR"));
        if (getNodeText(selectSingleNode(fldNode, "DISPLAY_TYPE")) == 'LINK') {
            if (selectSingleNode(fldNode, "RAD_FIELD_DASHBD_LINK")) {
                var lovnode = "LINK";
                var linktype = getNodeText(selectSingleNode(fldNode, "RAD_FIELD_DASHBD_LINK/LINK_TYPE"));
                if (linktype == 'CUSTOM') {
                    linktype = "C";
                }
                if (linktype == 'STANDARD') {
                    linktype = "S";
                }
                var funcname = getNodeText(selectSingleNode(fldNode, "RAD_FIELD_DASHBD_LINK/LINKED"));
                var level = getNodeText(selectSingleNode(fldNode, "RAD_FIELD_DASHBD_LINK/LEVEL"));
                if (level == 'COLUMN') {
                    level = "COL";
                }
                newl = traildom.createElement("LINK");
                x.appendChild(newl);
                newl = linkFunction(lovnode, funcname, traildom, level, linktype);

            }
        }
    }
    return traildom;
}

function SubScrCallformHandler(scrName,Mnscr) {
    var traildom = createRootNode("SUBSCREEN");
    var fldNode = selectNodes(xmldoc, "//RAD_FIELD_EVENTS[BUTTON_SCREEN = '" + scrName + "' and (EVENTTYPE = 'SUBSCREEN' or EVENTTYPE = 'LAUNCH' or EVENTTYPE = 'OBIEE' or EVENTTYPE = 'CALLFORM' or EVENTTYPE = 'SUBFUNCTION')]");

    for (var i = 0;i < fldNode.length;i++) {
        if (getNodeText(selectSingleNode(fldNode[i].parentNode, 'VISIBLE')) == 'Y') {

				//obiee
			 if (getNodeText(selectSingleNode(fldNode[i], "EVENTTYPE")) == "OBIEE") {
			 if(getNodeText(selectSingleNode(fldNode[i], "SCREEN_NAME"))!='null' && getNodeText(selectSingleNode(fldNode[i], "SCREEN_NAME"))!=""){
			  var scrlbl = selectSingleNode(xmldoc, "//RAD_SCREENS[@ID='" + getNodeText(selectSingleNode(fldNode[i], "SCREEN_NAME")) + "']");
			  if(scrlbl != null){
			  var label= getNodeText(selectSingleNode(scrlbl, "SCREEN_TITLE"))
                newel = fnCreateSubscrNodes(scrName, fldNode[i],label);
                newel.documentElement.setAttribute("SEQ", i + 1);
                newel.documentElement.setAttribute("TYPE", "OB");
                newel.documentElement.setAttribute("id", getNodeText(selectSingleNode(fldNode[i], "SCREEN_NAME")));
				x = traildom.getElementsByTagName("SUBSCREEN")[0];
				x.appendChild(fnImportNode(newel, newel.documentElement));
                    }
                }
			}						
            else if (getNodeText(selectSingleNode(fldNode[i], "EVENTTYPE")) == "SUBSCREEN") {
                newel = fnCreateSubscrNodes(scrName, fldNode[i]);
                newel.documentElement.setAttribute("SEQ", i + 1);
                newel.documentElement.setAttribute("TYPE", "S");
                newel.documentElement.setAttribute("id", getNodeText(selectSingleNode(fldNode[i], "SCREEN_NAME")));
				x = traildom.getElementsByTagName("SUBSCREEN")[0];
				x.appendChild(fnImportNode(newel, newel.documentElement));
            }
            else if (getNodeText(selectSingleNode(fldNode[i], "EVENTTYPE")) == "CALLFORM") {
                newel = fnCreateSubscrNodes(scrName, fldNode[i]);
                newel.documentElement.setAttribute("SEQ", i + 1);
                newel.documentElement.setAttribute("TYPE", "C");
                newel.documentElement.setAttribute("id", getNodeText(selectSingleNode(fldNode[i], "CALLFORM_NAME")));
				x = traildom.getElementsByTagName("SUBSCREEN")[0];
				x.appendChild(fnImportNode(newel, newel.documentElement));
            }
		
            else if (getNodeText(selectSingleNode(fldNode[i], "EVENTTYPE")) == "SUBFUNCTION") {
                newel = fnCreateSubscrNodes(scrName, fldNode[i]);
                newel.documentElement.setAttribute("SEQ", i + 1);
                newel.documentElement.setAttribute("TYPE", "L");
                newel.documentElement.setAttribute("id", getNodeText(selectSingleNode(fldNode[i], "CALLFORM_NAME")));
				x = traildom.getElementsByTagName("SUBSCREEN")[0];
				x.appendChild(fnImportNode(newel, newel.documentElement));
            }
            else if (getNodeText(selectSingleNode(fldNode[i], "EVENTTYPE")) == "LAUNCH") {
                newel = fnCreateSubscrNodes(scrName, fldNode[i]);
                newel.documentElement.setAttribute("SEQ", i + 1);
                newel.documentElement.setAttribute("TYPE", "LF");
                newel.documentElement.setAttribute("id", getNodeText(selectSingleNode(fldNode[i], "CALLFORM_NAME")));
				x = traildom.getElementsByTagName("SUBSCREEN")[0];
                x.appendChild(fnImportNode(newel, newel.documentElement));
            }

        }
    }
	if(Mnscr=="Y"){
    if (selectNodes(xmldoc, "//RAD_FUNC_PREFERENCES/TANK_MODIFICATIONS")[0] && getNodeText(selectNodes(xmldoc, "//RAD_FUNC_PREFERENCES/TANK_MODIFICATIONS")[0]) == "Y") {
        newel = loadXMLDoc('<FORM SEQ=\"1\" TYPE=\"VL\" id=\"\"><FUNCTION></FUNCTION><SCREEN></SCREEN><LBL>LBL_CHNGLOG</LBL></FORM>');
        newel.documentElement.setAttribute("SEQ", fldNode.length + 1);
        x = traildom.getElementsByTagName("SUBSCREEN")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }
 }

    return traildom;
}

function createSummaryNode() {
    var traildom = createRootNode("SUMMARY");
    var fldnode = selectSingleNode(xmldoc, "//RAD_SUMMARY");

    traildom.getElementsByTagName("SUMMARY")[0].setAttribute("TITLE", getNodeText(selectSingleNode(fldnode, "TITLE")));
    traildom.getElementsByTagName("SUMMARY")[0].setAttribute("POSITION", "TEMPLATE");
    var scr_size = getNodeText(selectSingleNode(fldnode, "SUM_SCREEN_SIZE"));
    if (scr_size == 'SMALL') {
        scr_size = "M";
    }
    if (scr_size == 'MEDIUM') {
        scr_size = "M";
    }
    if (scr_size == 'LARGE') {
        scr_size = "L";
    }
    traildom.getElementsByTagName("SUMMARY")[0].setAttribute("TMP_SCR_TYPE", scr_size);
    newel = traildom.createElement("TYPE");

    x = traildom.getElementsByTagName("SUMMARY")[0];
    x.appendChild(newel);
    setNodeText(selectSingleNode(traildom, "//SUMMARY/TYPE"), getNodeText(selectSingleNode(fldnode, "SUMMARY_TYPE")));

    newel = traildom.createElement("SUMMARY_DATA_BLK");
    x.appendChild(newel);

    var blk = getNodeText(selectSingleNode(fldnode, "RSLT_DATABLK"));
    setNodeText(selectSingleNode(traildom, "//SUMMARY/SUMMARY_DATA_BLK"), blk);
	/*
	//121change
     if(selectSingleNode(fldnode, "DETAIL_REQ")){	 
	 newel = traildom.createElement("DET_REQD");
     x.appendChild(newel);
     var detblk = getNodeText(selectSingleNode(fldnode, "DETAIL_REQ"));
     setNodeText(selectSingleNode(traildom, "//SUMMARY/DET_REQD"), detblk);
	 }
	 	//121change ends
		*/
		
	//081214 starts
	 if(selectSingleNode(fldnode, "BLIND_SEARCH")){	 
     var detblk = getNodeText(selectSingleNode(fldnode, "BLIND_SEARCH"));
	 traildom.getElementsByTagName("SUMMARY")[0].setAttribute("CRITERIA_SRCH", detblk);
   //  setNodeText(selectSingleNode(traildom, "//SUMMARY/CRITERIA_SRCH"), detblk);
	 }
	 //081214 ends
	

    newel = traildom.createElement("SUMMARY_BASE");
    x.appendChild(newel);

    newel = traildom.createElement("SUMBLOCK");
    x.appendChild(newel);

    newel = traildom.createElement("SUMBLOCK");
    x.appendChild(newel);

    traildom.getElementsByTagName("SUMBLOCK")[0].setAttribute("SCREEN", "SUMMARY");
    traildom.getElementsByTagName("SUMBLOCK")[0].setAttribute("TABPAGE", "QUERY");
    traildom.getElementsByTagName("SUMBLOCK")[0].setAttribute("TYPE", "SE");

    var footerTemplate = getNodeText(selectSingleNode(xmldoc, "//RAD_FUNCTIONS/FOOTER_TEMPLATE"));

    if (footerTemplate == "MAINTAUDIT") {
        var str = '<FIELD ID=\"1\" TYPE=\"ME\"><NAME>AUTHSTAT</NAME><TYPE>SELECT</TYPE><LBL>LBL_MNT_AUTHSTAT</LBL><OPTION VALUE=\"A\">LBL_MNT_AUTHORIZED</OPTION>';
        str += '<OPTION VALUE=\"U\">LBL_MNT_UNAUTHORIZED</OPTION><OPTION VALUE=\"R\">LBL_MNT_REJECTED</OPTION><MAXLENGTH>35</MAXLENGTH><READ_ONLY>-1</READ_ONLY><CASE></CASE><DTYPE>VARCHAR2</DTYPE><SIZE>1</SIZE>';
        str += '<CHECKED>N</CHECKED></FIELD>';

        footerdom = loadXMLDoc(str);
        traildom.getElementsByTagName("SUMBLOCK")[0].appendChild(fnImportNode(footerdom, footerdom.documentElement));

        footerdom = loadXMLDoc(str);
        traildom.getElementsByTagName("SUMBLOCK")[1].appendChild(fnImportNode(footerdom, footerdom.documentElement));

        str = '<FIELD ID=\"2\" TYPE=\"ME\"><NAME>TXNSTAT</NAME><TYPE>SELECT</TYPE><LBL>LBL_MNT_TXNSTAT</LBL><MAXLENGTH>35</MAXLENGTH><READ_ONLY>-1</READ_ONLY>';
        str += '<CASE></CASE><OPTION VALUE=\"O\">LBL_MNT_OPEN</OPTION><OPTION VALUE=\"C\">LBL_MNT_CLOSED</OPTION><DTYPE>VARCHAR2</DTYPE><SIZE>1</SIZE><CHECKED>N</CHECKED></FIELD>';

        footerdom = loadXMLDoc(str);
        traildom.getElementsByTagName("SUMBLOCK")[0].appendChild(fnImportNode(footerdom, footerdom.documentElement));

        footerdom = loadXMLDoc(str);
        traildom.getElementsByTagName("SUMBLOCK")[1].appendChild(fnImportNode(footerdom, footerdom.documentElement));
    }
    //summary fld order
    var sumQryflds = getNodeText(selectSingleNode(xmldoc, "//RAD_SUMMARY/SUM_QUERYORDER"));
    sumQryflds = sumQryflds.split("~");
    for (var i = 0;i < sumQryflds.length;i++) {
        var fld = sumQryflds[i];
        newel = fnCreatefield(blk, fld, true);

        if (newel) {
            if (footerTemplate == "MAINTAUDIT")
                selectSingleNode(newel, "//FIELD").setAttribute("ID", i + 3);
            else 
                selectSingleNode(newel, "//FIELD").setAttribute("ID", i + 1);

            selectSingleNode(newel, "//FIELD").setAttribute("TYPE", "ME");

            x = traildom.getElementsByTagName("SUMBLOCK")[0];
            x.appendChild(fnImportNode(newel, newel.documentElement));
        }
        else {
        }
    }

    var sumRsltfldords = getNodeText(selectSingleNode(xmldoc, "//RAD_SUMMARY/SUM_RESULTORDER"));
    sumRsltfldords = sumRsltfldords.split("~");
    for (i = 0;i < sumRsltfldords.length;i++) {
        var fld = sumRsltfldords[i];
        newel = fnCreatefield(blk, fld, true);

        if (newel) {
            if (footerTemplate == "MAINTAUDIT")
                selectSingleNode(newel, "//FIELD").setAttribute("ID", i + 3);
            else 
                selectSingleNode(newel, "//FIELD").setAttribute("ID", i + 1);

            selectSingleNode(newel, "//FIELD").setAttribute("TYPE", "ME");

            x = traildom.getElementsByTagName("SUMBLOCK")[1];
            x.appendChild(fnImportNode(newel, newel.documentElement));
        }
        else {
        }
    }
    var sumRsltflds = selectNodes(fldnode, "SUMMARY_DETAILS");

    for (i = 0;i < sumRsltflds.length;i++) {
        var fldname = getNodeText(selectSingleNode(sumRsltflds[i], "FIELD_NAME"));
        var lblcode = "";

        if (selectNodes(xmldoc, "//RAD_BLK_FIELDS[FIELD_NAME='" + fldname + "' and (DISPLAY_TYPE = 'SELECT' or DISPLAY_TYPE = 'RADIO')]").length > 0) {
            newel = createLegendsNode(fldname, lblcode);
            x = traildom.getElementsByTagName("SUMBLOCK")[1];
            x.appendChild(fnImportNode(newel, newel.documentElement));
        }
    }

    traildom.getElementsByTagName("SUMBLOCK")[1].setAttribute("SCREEN", "SUMMARY");
    traildom.getElementsByTagName("SUMBLOCK")[1].setAttribute("TABPAGE", "RESULT");
    traildom.getElementsByTagName("SUMBLOCK")[1].setAttribute("TYPE", "ME");

    if (selectNodes(xmldoc, "//RAD_SUMMARY/CUSTOM_BUTTONS_DETAILS").length > 0) {
        x = traildom.getElementsByTagName("SUMMARY")[0];
        x.appendChild(traildom.createElement("SUMBUTTONS"));

        x = traildom.getElementsByTagName("SUMBUTTONS")[0];
        newel = traildom.createElement("BUTTON_ROWS");
        setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(xmldoc, "//RAD_SUMMARY/NUMBER_OF_ROWS")));
        x.appendChild(fnImportNode(newel, newel));

        newel = traildom.createElement("BUTTONS_PER_ROW");
        setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(xmldoc, "//RAD_SUMMARY/BUTTONS_PER_ROW")));
        x.appendChild(fnImportNode(newel, newel));

        var fldNodes = selectNodes(xmldoc, "//RAD_SUMMARY/CUSTOM_BUTTONS_DETAILS");
        for (i = 0;i < selectNodes(xmldoc, "//RAD_SUMMARY/CUSTOM_BUTTONS_DETAILS").length;i++) {
            newel = createCustomButtonNodes(fldNodes[i]);

            selectSingleNode(newel, "//BUTTON").setAttribute("ID", i + 1);
            x = traildom.getElementsByTagName("SUMBUTTONS")[0];
            x.appendChild(fnImportNode(newel, newel.documentElement));
        }
    }
    return traildom;
}

function createSummaryNode_Customer() {
    var traildom = createRootNode("SUMMARY");
    var fldnode = selectSingleNode(xmldoc, "//RAD_SUMMARY");

    traildom.getElementsByTagName("SUMMARY")[0].setAttribute("TITLE", getNodeText(selectSingleNode(fldnode, "TITLE")));
    traildom.getElementsByTagName("SUMMARY")[0].setAttribute("POSITION", "TEMPLATE");
    var scr_size = getNodeText(selectSingleNode(fldnode, "SUM_SCREEN_SIZE"));
    if (scr_size == 'SMALL') {
        scr_size = "M";
    }
    if (scr_size == 'MEDIUM') {
        scr_size = "M";
    }
    if (scr_size == 'LARGE') {
        scr_size = "L";
    }
    traildom.getElementsByTagName("SUMMARY")[0].setAttribute("TMP_SCR_TYPE", scr_size);
    newel = traildom.createElement("TYPE");

    x = traildom.getElementsByTagName("SUMMARY")[0];
    x.appendChild(newel);
    setNodeText(selectSingleNode(traildom, "//SUMMARY/TYPE"), getNodeText(selectSingleNode(fldnode, "SUMMARY_TYPE")));

    newel = traildom.createElement("SUMMARY_DATA_BLK");
    x.appendChild(newel);

    var blk = getNodeText(selectSingleNode(fldnode, "RSLT_DATABLK"));
    setNodeText(selectSingleNode(traildom, "//SUMMARY/SUMMARY_DATA_BLK"), blk);

    newel = traildom.createElement("SUMMARY_BASE");
    x.appendChild(newel);

    newel = traildom.createElement("SUMBLOCK");
    x.appendChild(newel);

    newel = traildom.createElement("SUMBLOCK");
    x.appendChild(newel);

	newel = traildom.createElement("SUMBLOCK");
    x.appendChild(newel);

    traildom.getElementsByTagName("SUMBLOCK")[0].setAttribute("SCREEN", "SUMMARY");
    traildom.getElementsByTagName("SUMBLOCK")[0].setAttribute("TABPAGE", "QUERY");
    traildom.getElementsByTagName("SUMBLOCK")[0].setAttribute("TYPE", "SE");


	var fldsets = selectNodes(xmldoc, "//RAD_FIELDSETS[FIELDSET_TYPE='SUMMARY' and FIELDSET_VISIBLE='Y']");

    for (var i = 0;i < fldsets.length;i++) {
        var fld = fldsets[i].getAttribute("ID");
        if (!(newel = createFieldsets("", "", "", "", "", fld)))
            return false;
        newel.documentElement.setAttribute("INDEX", i + 1);
        x = traildom.getElementsByTagName("SUMBLOCK")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }

    //var footerTemplate = getNodeText(selectSingleNode(xmldoc, "//RAD_FUNCTIONS/FOOTER_TEMPLATE"));
 var footerTemplate = "";
    if (footerTemplate == "MAINTAUDIT") {
        var str = '<FIELD ID=\"1\" TYPE=\"ME\"><NAME>AUTHSTAT</NAME><TYPE>SELECT</TYPE><LBL>LBL_MNT_AUTHSTAT</LBL><OPTION VALUE=\"A\">LBL_MNT_AUTHORIZED</OPTION>';
        str += '<OPTION VALUE=\"U\">LBL_MNT_UNAUTHORIZED</OPTION><OPTION VALUE=\"R\">LBL_MNT_REJECTED</OPTION><MAXLENGTH>35</MAXLENGTH><READ_ONLY>-1</READ_ONLY><CASE></CASE><DTYPE>VARCHAR2</DTYPE><SIZE>1</SIZE>';
        str += '<CHECKED>N</CHECKED></FIELD>';

        footerdom = loadXMLDoc(str);
        traildom.getElementsByTagName("SUMBLOCK")[0].appendChild(fnImportNode(footerdom, footerdom.documentElement));

        footerdom = loadXMLDoc(str);
        traildom.getElementsByTagName("SUMBLOCK")[2].appendChild(fnImportNode(footerdom, footerdom.documentElement));

        str = '<FIELD ID=\"2\" TYPE=\"ME\"><NAME>TXNSTAT</NAME><TYPE>SELECT</TYPE><LBL>LBL_MNT_TXNSTAT</LBL><MAXLENGTH>35</MAXLENGTH><READ_ONLY>-1</READ_ONLY>';
        str += '<CASE></CASE><OPTION VALUE=\"O\">LBL_MNT_OPEN</OPTION><OPTION VALUE=\"C\">LBL_MNT_CLOSED</OPTION><DTYPE>VARCHAR2</DTYPE><SIZE>1</SIZE><CHECKED>N</CHECKED></FIELD>';

        footerdom = loadXMLDoc(str);
        traildom.getElementsByTagName("SUMBLOCK")[0].appendChild(fnImportNode(footerdom, footerdom.documentElement));

        footerdom = loadXMLDoc(str);
        traildom.getElementsByTagName("SUMBLOCK")[2].appendChild(fnImportNode(footerdom, footerdom.documentElement));
    }
    //summary fld order
    var sumQryflds = getNodeText(selectSingleNode(xmldoc, "//RAD_SUMMARY/SUM_QUERYORDER"));
    sumQryflds = sumQryflds.split("~");
    for (var i = 0;i < sumQryflds.length;i++) {
        var fld = sumQryflds[i];
        newel = fnCreatefield(blk, fld, true);

        if (newel) {
            if (footerTemplate == "MAINTAUDIT")
                selectSingleNode(newel, "//FIELD").setAttribute("ID", i + 3);
            else 
                selectSingleNode(newel, "//FIELD").setAttribute("ID", i + 1);

            selectSingleNode(newel, "//FIELD").setAttribute("TYPE", "ME");

            x = traildom.getElementsByTagName("SUMBLOCK")[0];
            x.appendChild(fnImportNode(newel, newel.documentElement));
        }
        else {
        }
    }

    var sumRsltfldords = getNodeText(selectSingleNode(xmldoc, "//RAD_SUMMARY/SUM_RESULTORDER"));
    sumRsltfldords = sumRsltfldords.split("~");
    for (i = 0;i < sumRsltfldords.length;i++) {
        var fld = sumRsltfldords[i];
        newel = fnCreatefield(blk, fld, true);

        if (newel) {
            if (footerTemplate == "MAINTAUDIT")
                selectSingleNode(newel, "//FIELD").setAttribute("ID", i + 3);
            else 
                selectSingleNode(newel, "//FIELD").setAttribute("ID", i + 1);

            selectSingleNode(newel, "//FIELD").setAttribute("TYPE", "ME");

            x = traildom.getElementsByTagName("SUMBLOCK")[2];
            x.appendChild(fnImportNode(newel, newel.documentElement));
        }
        else {
        }
    }
    var sumRsltflds = selectNodes(fldnode, "SUMMARY_DETAILS");

    for (i = 0;i < sumRsltflds.length;i++) {
        var fldname = getNodeText(selectSingleNode(sumRsltflds[i], "FIELD_NAME"));
        var lblcode = "";

        if (selectNodes(xmldoc, "//RAD_BLK_FIELDS[FIELD_NAME='" + fldname + "' and (DISPLAY_TYPE = 'SELECT' or DISPLAY_TYPE = 'RADIO')]").length > 0) {
            newel = createLegendsNode(fldname, lblcode);
            x = traildom.getElementsByTagName("SUMBLOCK")[2];
            x.appendChild(fnImportNode(newel, newel.documentElement));
        }
    }

    traildom.getElementsByTagName("SUMBLOCK")[2].setAttribute("SCREEN", "SUMMARY");
    traildom.getElementsByTagName("SUMBLOCK")[2].setAttribute("TABPAGE", "RESULT");
    traildom.getElementsByTagName("SUMBLOCK")[2].setAttribute("TYPE", "ME");
	
	 

    if (selectNodes(xmldoc, "//RAD_SUMMARY/CUSTOM_BUTTONS_DETAILS").length > 0) {
        x = traildom.getElementsByTagName("SUMMARY")[0];
        x.appendChild(traildom.createElement("SUMBUTTONS"));

        x = traildom.getElementsByTagName("SUMBUTTONS")[0];
        newel = traildom.createElement("BUTTON_ROWS");
        setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(xmldoc, "//RAD_SUMMARY/NUMBER_OF_ROWS")));
        x.appendChild(fnImportNode(newel, newel));

        newel = traildom.createElement("BUTTONS_PER_ROW");
        setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(xmldoc, "//RAD_SUMMARY/BUTTONS_PER_ROW")));
        x.appendChild(fnImportNode(newel, newel));

        var fldNodes = selectNodes(xmldoc, "//RAD_SUMMARY/CUSTOM_BUTTONS_DETAILS");
        for (i = 0;i < selectNodes(xmldoc, "//RAD_SUMMARY/CUSTOM_BUTTONS_DETAILS").length;i++) {
            newel = createCustomButtonNodes(fldNodes[i]);

            selectSingleNode(newel, "//BUTTON").setAttribute("ID", i + 1);
            x = traildom.getElementsByTagName("SUMBUTTONS")[0];
            x.appendChild(fnImportNode(newel, newel.documentElement));
        }
    }
	
	
	traildom.getElementsByTagName("SUMBLOCK")[1].setAttribute("SCREEN", "SUMMARY");
    traildom.getElementsByTagName("SUMBLOCK")[1].setAttribute("TABPAGE", "ADV_QUERY");
    traildom.getElementsByTagName("SUMBLOCK")[1].setAttribute("TYPE", "SE");
	
	 var sumRsltflds = selectNodes(fldnode, "SUMMARY_DETAILS"); 
    for (i = 0;i < sumRsltflds.length;i++) {
	if(getNodeText(selectSingleNode(sumRsltflds[i], "A_QUERY"))=="Y"){
        var fldname = getNodeText(selectSingleNode(sumRsltflds[i], "FIELD_NAME"));
    
        newel = fnCreatefield(blk, fldname, true);

        if (newel) {
            if (footerTemplate == "MAINTAUDIT")
                selectSingleNode(newel, "//FIELD").setAttribute("ID", i + 3);
            else 
                selectSingleNode(newel, "//FIELD").setAttribute("ID", i + 1);

            selectSingleNode(newel, "//FIELD").setAttribute("TYPE", "ME");

            x = traildom.getElementsByTagName("SUMBLOCK")[1];
            x.appendChild(fnImportNode(newel, newel.documentElement));
        }
        else {
        }
		}
    } 
	
	x = traildom.getElementsByTagName("SUMBLOCK")[2];
	newel = traildom.createElement("ROWS");
    x.appendChild(newel);
	
	var fldnode = selectSingleNode(xmldoc, "//RAD_SUMMARY");
    var blk = getNodeText(selectSingleNode(fldnode, "SUM_RESULT_ROWS"));
    setNodeText(selectSingleNode(selectNodes(traildom, "//SUMMARY/SUMBLOCK")[2],"ROWS"), blk);
   
    return traildom;
}


function createScreenNode(scrId) {
    var fldNode = selectSingleNode(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']")
    var traildom = createRootNode("SCREEN");
    traildom.getElementsByTagName("SCREEN")[0].setAttribute("NAME", getNodeText(selectSingleNode(fldNode, "SCREEN_NAME")));
    traildom.getElementsByTagName("SCREEN")[0].setAttribute("MAIN_WIN", getNodeText(selectSingleNode(fldNode, "MAIN_SCREEN")));
    traildom.getElementsByTagName("SCREEN")[0].setAttribute("TITLE", getNodeText(selectSingleNode(fldNode, "SCREEN_TITLE")));
    traildom.getElementsByTagName("SCREEN")[0].setAttribute("POSITION", getNodeText(selectSingleNode(fldNode, "SCREEN_POSITION")).toLowerCase());
	//customer changes tabs
	if(Customer_Land){
	if(getNodeText(selectSingleNode(xmldoc, ("//RAD_FUNCTIONS/FUNCTION_CATEGORY")))=="TABS"){
	traildom.getElementsByTagName("SCREEN")[0].setAttribute("MULTIFUNC", "Y");
	}

	if(getNodeText(selectSingleNode(xmldoc, ("//RAD_FUNCTIONS/FUNCTION_CATEGORY")))=="SUBSYSTEM"){
	traildom.getElementsByTagName("SCREEN")[0].setAttribute("SUBSYS", "Y");
	}

	if(getNodeText(selectSingleNode(xmldoc, ("//RAD_FUNCTIONS/FUNCTION_CATEGORY")))=="OTHERS"){
	traildom.getElementsByTagName("SCREEN")[0].setAttribute("QUERY_REQD", getNodeText(selectSingleNode(fldNode, "SCREEN_QUERYREQ")));
	}
}
    if (getNodeText(selectSingleNode(fldNode, "SCREEN_SIZE")) == "LARGE")
        traildom.getElementsByTagName("SCREEN")[0].setAttribute("TMP_SCR_TYPE", "L");
    if (getNodeText(selectSingleNode(fldNode, "SCREEN_SIZE")) == "MEDIUM")
        traildom.getElementsByTagName("SCREEN")[0].setAttribute("TMP_SCR_TYPE", "M");
    if (getNodeText(selectSingleNode(fldNode, "SCREEN_SIZE")) == "SMALL")
        traildom.getElementsByTagName("SCREEN")[0].setAttribute("TMP_SCR_TYPE", "S");

    if (selectNodes(xmldoc, "//RAD_CALLFORM[CALLFORM_DISPLAY_TYPE != 'BUTTON']").length > 0 && getNodeText(selectSingleNode(fldNode, "MAIN_SCREEN")) == "Y") {
        newel = SubscrAsTabHandler(scrId);
        x = traildom.getElementsByTagName("SCREEN")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }

    x = traildom.getElementsByTagName("SCREEN")[0];
    x.appendChild(fnImportNode(traildom, traildom.createElement("EXIT_BTN")));
    setNodeText(selectSingleNode(traildom, "//EXIT_BTN"), getNodeText(selectSingleNode(fldNode, "EXIT_BUTTON_TYPE")));
    pUixmlFldList = '~';//amount field validation
    if (!(newel = createHeaderPortion(scrId))) {
    }
    else {
        x = traildom.getElementsByTagName("SCREEN")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }

    if (!(newel = createBodyPortion(scrId))) {
    }
    else {
        x = traildom.getElementsByTagName("SCREEN")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }

    if (!(newel = createFooterPortion(scrId))) {
    }
    else {
        x = traildom.getElementsByTagName("SCREEN")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }
   //obiee
    if (selectNodes(xmldoc, "//RAD_FIELD_EVENTS[BUTTON_SCREEN = '" + scrId + "' and (EVENTTYPE = 'SUBSCREEN' or EVENTTYPE = 'CALLFORM' or EVENTTYPE = 'OBIEE' or EVENTTYPE = 'SUBFUNCTION' or EVENTTYPE = 'LAUNCH')]").length > 0) {
  	var Mn_Scrn=getNodeText(selectSingleNode(fldNode,("MAIN_SCREEN")));
		newel = SubScrCallformHandler(scrId,Mn_Scrn);  

        x = traildom.getElementsByTagName("SCREEN")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));

    }
    else if (getNodeText(selectSingleNode(fldNode, ("MAIN_SCREEN"))) == "Y" && selectNodes(xmldoc, ("//RAD_FUNC_PREFERENCES/TANK_MODIFICATIONS"))[0] && getNodeText(selectNodes(xmldoc, ("//RAD_FUNC_PREFERENCES/TANK_MODIFICATIONS"))[0]) == "Y") {
        newel = loadXMLDoc('<SUBSCREEN><FORM SEQ=\"1\" TYPE=\"VL\" id=\"\"><FUNCTION></FUNCTION><SCREEN></SCREEN><LBL>LBL_CHNGLOG</LBL></FORM></SUBSCREEN>');
        newel.documentElement.setAttribute("SEQ", "1");

        x = traildom.getElementsByTagName("SCREEN")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }

    return traildom;
}

function createReportPortion() {

    var reportDom = "";
    var str = '<SECTION ID=\"SEC_REPORT_OPTIONS\" NAME=\"SEC_REPORT_OPTIONS\"><PART ID=\"REPORT_OPTIONS_PART_1\" NAME=\"REPORT_OPTIONS_PART_1\" WIDTH=\"100\"><SPRTCNT>2</SPRTCNT>';
    str += '<FLDSET ID=\"FLD_REPORT_OPTIONS_1\" VIEW=\"SE\" TYPE=\"SE\" INDEX=\"1\"><LBL/><BLOCK>BLK_REPORT_OPTIONS</BLOCK><HREQ>0</HREQ><HEIGHT></HEIGHT><WIDTH></WIDTH>';
    str += '<FIELD INDEX=\"1\" SPRT=\"1\"><NAME>REPREF</NAME><ID>REPREF</ID><TYPE>HIDDEN</TYPE><MAX_DECIMALS></MAX_DECIMALS><LBL>LBL_REP_REPFID</LBL><MAXLENGTH>1</MAXLENGTH><DTYPE>CHAR</DTYPE><SIZE>1</SIZE><CHECKED>N</CHECKED><ROWS></ROWS><COLS></COLS></FIELD>';
    str += '<FIELD INDEX=\"2\" SPRT=\"1\"><NAME>REPFID</NAME><ID>REPFID</ID><TYPE>HIDDEN</TYPE><MAX_DECIMALS></MAX_DECIMALS><LBL>LBL_REP_REPFID</LBL><MAXLENGTH>1</MAXLENGTH><DTYPE>CHAR</DTYPE><SIZE>1</SIZE><CHECKED>N</CHECKED><ROWS></ROWS><COLS></COLS></FIELD>';
    str += '<FIELD INDEX=\"3\" SPRT=\"1\"><NAME>FILEPATH</NAME><ID>FILEPATH</ID><TYPE>HIDDEN</TYPE><MAX_DECIMALS></MAX_DECIMALS><LBL>LBL_REP_FILEPATH</LBL><MAXLENGTH>1</MAXLENGTH><DTYPE>CHAR</DTYPE><SIZE>1</SIZE><CHECKED>N</CHECKED><ROWS></ROWS><COLS></COLS></FIELD>';
    str += '<FIELD INDEX=\"4\" SPRT=\"1\"><NAME>FILENAME</NAME><ID>FILENAME</ID><TYPE>HIDDEN</TYPE><LBL>LBL_REP_FILENAME</LBL><MAXLENGTH>32000</MAXLENGTH><READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR</DTYPE><SIZE>4</SIZE><WIDTH>3</WIDTH></FIELD>';
    str += '<FIELD INDEX=\"5\" SPRT=\"1\"><NAME>REPFMT</NAME><ID>REPFMT</ID><TYPE>SELECT</TYPE><MAX_DECIMALS></MAX_DECIMALS><OPTION SELECTED="0" VALUE="pdf">LBL_PDF</OPTION><OPTION VALUE=\"html\">LBL_HTML</OPTION><OPTION VALUE=\"xls\">LBL_EXCEL</OPTION><OPTION VALUE=\"xlsx\">LBL_XLSX</OPTION><OPTION VALUE=\"rtf\">LBL_RTF</OPTION><LBL>LBL_REP_REPFMT</LBL><MAXLENGTH>1</MAXLENGTH><DTYPE>CHAR</DTYPE><SIZE>1</SIZE><CHECKED>N</CHECKED><ROWS></ROWS><COLS></COLS></FIELD>';
    str += '<FIELD INDEX=\"6\" SPRT=\"1\"><NAME>REPOUTPUT</NAME><ID>REPOUTPUT</ID><TYPE>SELECT</TYPE><MAX_DECIMALS></MAX_DECIMALS><OPTION SELECTED="0" VALUE=\"V\">LBL_VIEW1</OPTION><OPTION  VALUE="P">LBL_PRINT</OPTION><OPTION VALUE=\"S\">LBL_SPOOL</OPTION><LBL>LBL_REP_REPOUTPUT</LBL><MAXLENGTH>1</MAXLENGTH><DTYPE>CHAR</DTYPE><SIZE>1</SIZE><CHECKED>N</CHECKED><ROWS></ROWS><COLS></COLS></FIELD>';
    str += '<FIELD INDEX=\"7\" SPRT=\"1\"><NAME>PARAMNAMES</NAME><ID>PARAMNAMES</ID><TYPE>HIDDEN</TYPE><LBL>LBL_REP_PARAMNAMES</LBL><MAXLENGTH>32000</MAXLENGTH>';
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR2</DTYPE><SIZE>4</SIZE><WIDTH/></FIELD>';
    str += '<FIELD INDEX=\"1\" SPRT=\"2\"><NAME>GENMODE</NAME><ID>GENMODE</ID><TYPE>HIDDEN</TYPE><LBL>LBL_REP_GENMODE</LBL><MAXLENGTH>32000</MAXLENGTH><READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR</DTYPE><SIZE>4</SIZE><WIDTH>3</WIDTH></FIELD>';
    str += '<FIELD INDEX=\"2\" SPRT=\"2\"><NAME>PRINTAT</NAME><ID>PRINTAT</ID><TYPE>SELECT</TYPE><MAX_DECIMALS></MAX_DECIMALS><OPTION SELECTED="0" VALUE="C">LBL_CLIENT</OPTION><OPTION VALUE=\"S\">LBL_SERVER</OPTION><LBL>LBL_REP_PRINTAT</LBL><MAXLENGTH>1</MAXLENGTH><DTYPE>CHAR</DTYPE><SIZE>1</SIZE><CHECKED>N</CHECKED><ROWS></ROWS><COLS></COLS></FIELD>';
    str += '<FIELD INDEX=\"3\" SPRT=\"2\"><NAME>PRINTER</NAME><ID>PRINTER</ID><TYPE>TEXT</TYPE><LBL>LBL_REP_PRINTER</LBL><MAXLENGTH>15</MAXLENGTH>';
    str += '<DTYPE>VARCHAR2</DTYPE><SIZE>15</SIZE><WIDTH>3</WIDTH><LOV><NAME>LOV_EXTRPT_PRINTER</NAME><TYPE>G</TYPE></LOV></FIELD>';
    str += '<FIELD INDEX=\"4\" SPRT=\"2\"><NAME>PARAMVALS</NAME><ID>PARAMVALS</ID><TYPE>HIDDEN</TYPE><HIDDEN>-1</HIDDEN><LBL>LBL_REP_PARAMVALS</LBL><MAXLENGTH>32000</MAXLENGTH><READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR</DTYPE><SIZE>4</SIZE><WIDTH>3</WIDTH></FIELD>';
    str += '<FIELD INDEX=\"5\" SPRT=\"2\"><NAME>PARAMTYPES</NAME><ID>FILENAME</ID><TYPE>HIDDEN</TYPE><LBL>LBL_REP_FILENAME</LBL><MAXLENGTH>32000</MAXLENGTH><READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR</DTYPE><SIZE>4</SIZE><WIDTH>3</WIDTH></FIELD></FLDSET></PART></SECTION>';
    reportDom = loadXMLDoc(str);

    return reportDom;

}

function createHeaderPortion(scrId) {
    var fldNode = selectSingleNode(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']");
  if(!Customer_Land){
    var headerTemplate = getNodeText(selectSingleNode(xmldoc, "//RAD_FUNCTIONS/HEADER_TEMPLATE"));
    }
else {
 var headerTemplate ="";
}
    if (headerTemplate == "PROCESS" && getNodeText(selectSingleNode(fldNode, "MAIN_SCREEN")) == "Y") {
        var traildom = createRootNode("HEADER");
        if (selectNodes(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']/HEADER/RAD_TABS").length == 0) {

            var str = '<TAB NAME=\"TAB_HEADER\" ID=\"TAB_HEADER\" HEIGHT=\"\"><LBL></LBL><SECTION ID=\"PROCESS_HEADER_TEMPLATE\">';
            str += '<PART ID=\"PROCESS_HEADER_PART_1\" NAME=\"PROCESS_HEADER_PART_1\" WIDTH=\"100\"><SPRTCNT>2</SPRTCNT>';
            str += '<FLDSET ID=\"FLD_HEADER_PROCESS1\" VIEW=\"SE\" TYPE=\"SE\" INDEX=\"1\"><LBL></LBL><BLOCK>BLK_PROCESS_AUDIT</BLOCK>';
            str += '<HREQ>0</HREQ><FIELD INDEX=\"1\" SPRT=\"1\"><NAME>WF_REF_NO</NAME><ID>WF_REF_NO</ID><TYPE>TEXT</TYPE><LBL>LBL_WFREFNO</LBL>';
            str += '<MAXLENGTH>50</MAXLENGTH><HIDDEN>-1</HIDDEN><READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR2</DTYPE><SIZE>30</SIZE><WIDTH>3</WIDTH></FIELD>';
            str += '<FIELD INDEX=\"1\" SPRT=\"2\"><NAME>WF_PRTY</NAME><ID>WF_PRTY</ID><TYPE>SELECT</TYPE><OPTION SELECTED=\"0\" VALUE=\"L\">LBL_LOW</OPTION>';
            str += '<OPTION SELECTED=\"0\" VALUE=\"M\">LBL_MEDIUM</OPTION><OPTION SELECTED=\"0\" VALUE=\"H\">LBL_HIGH</OPTION><LBL>LBL_PRIORITY</LBL>';
            str += '<MAXLENGTH>12</MAXLENGTH><HIDDEN>-1</HIDDEN><READ_ONLY>0</READ_ONLY><DTYPE>VARCHAR2</DTYPE><SIZE></SIZE><WIDTH></WIDTH></FIELD></FLDSET></PART></SECTION></TAB>';
            headerdom = loadXMLDoc(str);
            x = traildom.getElementsByTagName("HEADER")[0];
            x.appendChild(fnImportNode(headerdom, headerdom.documentElement));
        }
        else {
            var traildom = createRootNode("HEADER");
            var tabs = selectNodes(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']/HEADER/RAD_TABS[TAB_VISIBLE='Y']");
            for (var i = 0;i < tabs.length;i++) {
                var fld = tabs[i].getAttribute("ID");
                if (!(newel = createTabs(fld, "HEADER", scrId)))
                    return false;
                x = traildom.getElementsByTagName("HEADER")[0];
                x.appendChild(fnImportNode(newel, newel.documentElement));
            }
        }
    }

    if (selectNodes(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']/HEADER/RAD_TABS").length > 0 && (headerTemplate != "PROCESS" || (headerTemplate == "PROCESS" && getNodeText(selectSingleNode(fldNode, "MAIN_SCREEN")) != "Y"))) {
        var traildom = createRootNode("HEADER");
        var tabs = selectNodes(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']/HEADER/RAD_TABS[TAB_VISIBLE='Y']");
        for (var i = 0;i < tabs.length;i++) {
            var fld = tabs[i].getAttribute("ID");
            if (!(newel = createTabs(fld, "HEADER", scrId)))
                return false;
            x = traildom.getElementsByTagName("HEADER")[0];
            x.appendChild(fnImportNode(newel, newel.documentElement));
        }
    }

    return traildom;
}

function createBodyPortion(scrId) {
    var traildom = createRootNode("BODY");
    var fldNode = selectSingleNode(xmldoc, ("//RAD_SCREENS[@ID='" + scrId + "']"));
    var tabs = selectNodes(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']/BODY/RAD_TABS[TAB_VISIBLE='Y']");
    for (var i = 0;i < tabs.length;i++) {
        var fld = tabs[i].getAttribute("ID");
        if (!(newel = createTabs(fld, "BODY", scrId)))
            return false;
        x = traildom.getElementsByTagName("BODY")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }
if(Customer_Land){
	//CUSTOMER CHANGES TABS
	if(getNodeText(selectSingleNode(xmldoc, ("//RAD_FUNCTIONS/FUNCTION_CATEGORY")))=="TABS"){
	var fldsets = selectNodes(xmldoc, "//RAD_FIELDSETS[FIELDSET_TYPE='TABS' and FIELDSET_VISIBLE='Y']");

    for (var i = 0;i < fldsets.length;i++) {
        var fld = fldsets[i].getAttribute("ID");
        if (!(newel = createFieldsets("", "", "", "", "", fld)))
            return false;
        newel.documentElement.setAttribute("INDEX", i + 1);
        x = traildom.getElementsByTagName("BODY")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }
	}

  }
    return traildom;
}

function createFooterPortion(scrId) {
    var fldNode = selectSingleNode(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']")
    if(!Customer_Land){
    var footerTemplate = getNodeText(selectSingleNode(xmldoc, "//RAD_FUNCTIONS/FOOTER_TEMPLATE"));
   }
else {
	 var footerTemplate ="";

}
    if (footerTemplate == "MAINTAUDIT" && getNodeText(selectSingleNode(fldNode, "MAIN_SCREEN")) == "Y") {
        var mstblk = getNodeText(selectSingleNode(xmldoc, "//RAD_DATA_BLOCKS[MASTER_BLOCK='Y']/BLOCK_NAME"));
        var traildom = createRootNode("FOOTER");
        newel = createMaintAuditTemplate(mstblk);
        x = traildom.getElementsByTagName("FOOTER")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }
    if (footerTemplate == "PROCESS" && getNodeText(selectSingleNode(fldNode, "MAIN_SCREEN")) == "Y") {
        var traildom = createRootNode("FOOTER");
        newel = createProcessTemplate();
        x = traildom.getElementsByTagName("FOOTER")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }

    if (footerTemplate == "MAINTPROCESS" && getNodeText(selectSingleNode(fldNode, "MAIN_SCREEN")) == "Y") {
        var mstblk = getNodeText(selectSingleNode(xmldoc, "//RAD_DATA_BLOCKS[MASTER_BLOCK='Y']/BLOCK_NAME"));
        var traildom = createRootNode("FOOTER");
        newel = createMaintProcessTemplate(mstblk);
        x = traildom.getElementsByTagName("FOOTER")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }
    if ((footerTemplate != 'MAINTAUDIT' && footerTemplate != 'PROCESS' && footerTemplate != 'MAINTPROCESS') || getNodeText(selectSingleNode(fldNode, "MAIN_SCREEN")) == 'N') {
        var traildom = createRootNode("FOOTER");
        var tabs = selectNodes(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']/FOOTER/RAD_TABS[TAB_VISIBLE='Y']");
        for (var i = 0;i < tabs.length;i++) {
            var fld = tabs[i].getAttribute("ID");
            if (!(newel = createTabs(fld, "FOOTER", scrId)))
                return false;
            x = traildom.getElementsByTagName("FOOTER")[0];
            x.appendChild(fnImportNode(newel, newel.documentElement));
        }
    }

    return traildom;
}

function createTabs(tabId, port, scrId) {
    var fldNode = selectSingleNode(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']/" + port + "/RAD_TABS[@ID='" + tabId + "']");
    var funcId = getNodeText(selectSingleNode(xmldoc, ("//RAD_FUNCTIONS/FUNCTION_ID")));
    var traildom = createRootNode("TAB");

    traildom.getElementsByTagName("TAB")[0].setAttribute("ID", getNodeText(selectSingleNode(fldNode, "TAB_NAME")));
    x = traildom.getElementsByTagName("TAB")[0];
    //newel = traildom.createElement("LBL");
    //setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(fldNode, "TAB_LABEL")));
    var vl=getNodeText(selectSingleNode(fldNode, "TAB_LABEL"));
    var nl=loadXMLDoc("<LBL>"+vl+"</LBL>");
    try{
    x.appendChild(selectSingleNode(nl, "//LBL"));
    }catch(e){
    }
if(Customer_Land){
	
	if(getNodeText(selectSingleNode(xmldoc, ("//RAD_FUNCTIONS/FUNCTION_CATEGORY")))=="TABS"){
	
	try{
	/*newel = traildom.createElement("FUNCID");
    setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(fldNode, "TAB_FUNC_ID")));
    x.appendChild(newel);*/
    
    var vl=getNodeText(selectSingleNode(fldNode, "TAB_FUNC_ID"));
    var nl=loadXMLDoc("<FUNCID>"+vl+"</FUNCID>");
    x.appendChild(selectSingleNode(nl, "//FUNCID"));
	
	/*newel = traildom.createElement("TYPE");
    setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(fldNode, "TAB_TYPE")));
    x.appendChild(newel);*/
    
    var vl=getNodeText(selectSingleNode(fldNode, "TAB_TYPE"));
    var nl=loadXMLDoc("<TYPE>"+vl+"</TYPE>");
    x.appendChild(selectSingleNode(nl, "//TYPE"));
    
	}
	catch(e){
	/*newel = traildom.createElement("FUNCID");
    setNodeText(selectSingleNode(newel, "/"), "");
    x.appendChild(newel);*/
    
    var vl="";
    var nl=loadXMLDoc("<FUNCID>"+vl+"</FUNCID>");
    x.appendChild(selectSingleNode(nl, "//FUNCID"));
    
	
	/*newel = traildom.createElement("TYPE");
    setNodeText(selectSingleNode(newel, "/"), "");
    x.appendChild(newel);*/
    
    var vl="";
    var nl=loadXMLDoc("<TYPE>"+vl+"</TYPE>");
    x.appendChild(selectSingleNode(nl, "//TYPE"));
	}
	}
	
}
    if (port == 'HEADER') {
       try{
        var headerTemplate = getNodeText(selectSingleNode(xmldoc, "//RAD_FUNCTIONS/HEADER_TEMPLATE"));
 		}catch(e){
		var headerTemplate ="";
       }
        if (headerTemplate == "PROCESS" && getNodeText(selectSingleNode(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']/MAIN_SCREEN")) == "Y") {
            newel = createHeaderProcessTemplate();
            x = traildom.getElementsByTagName("TAB")[0];
            x.appendChild(fnImportNode(newel, newel.documentElement));

        }
    }

    var sections = selectNodes(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']/" + port + "/RAD_TABS[@ID='" + tabId + "']/RAD_SECTIONS[SEC_VISIBLE='Y']");

    for (var i = 0;i < sections.length;i++) {
        var fld = sections[i].getAttribute("ID");
        if (!(newel = createSection(tabId, port, scrId, fld)))
            return false;
        x = traildom.getElementsByTagName("TAB")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }

    if (getNodeText(selectSingleNode(xmldoc, ("//RAD_SCREENS[@ID='" + scrId + "']/MAIN_SCREEN"))) == "Y" && port == "BODY" && getNodeText(selectSingleNode(xmldoc, ("//RAD_FUNCTIONS/FUNCTION_CATEGORY"))) == "REPORT") {
        if (funcId.substring(2, 3) != "C") {
            var tabs = selectNodes(xmldoc, ("//RAD_SCREENS[@ID='" + scrId + "']/" + port + "/RAD_TABS"));
            for (i = 0;i <= tabs.length;i++) {
                if (i == 0) {
                    newel = createReportPortion();
                    x = traildom.getElementsByTagName("TAB")[0];
                    x.appendChild(fnImportNode(newel, newel.documentElement));
                }
            }
        }

    }

    return traildom;
}

function createSection(tabId, port, scrId, secId) {
    var fldNode = selectSingleNode(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']/" + port + "/RAD_TABS[@ID='" + tabId + "']/RAD_SECTIONS[@ID='" + secId + "']")
    var traildom = createRootNode("SECTION");
    traildom.getElementsByTagName("SECTION")[0].setAttribute("ID", getNodeText(selectSingleNode(fldNode, "SECTION_NAME")));
	
    traildom.getElementsByTagName("SECTION")[0].setAttribute("COLLAPSE", getNodeText(selectSingleNode(fldNode, "COLLAPSE")));
    try{
	traildom.getElementsByTagName("SECTION")[0].setAttribute("EXPAND", getNodeText(selectSingleNode(fldNode, "COLLAPSE_EXPAND")));
    }
	catch(e){}
    x = traildom.getElementsByTagName("SECTION")[0];

    if (selectSingleNode(fldNode, "SECTION_LBL")) {
       /* newel = traildom.createElement("LBL");
        setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(fldNode, "SECTION_LBL")));
        x.appendChild(newel);*/
        
        var vl=getNodeText(selectSingleNode(fldNode, "SECTION_LBL"));
        var nl=loadXMLDoc("<LBL>"+vl+"</LBL>");
        x.appendChild(selectSingleNode(nl, "//LBL"));
    }

	if(Customer_Land){

		if(getNodeText(selectSingleNode(xmldoc, ("//RAD_FUNCTIONS/FUNCTION_CATEGORY")))=="MASTER"){
	
	 if (selectSingleNode(fldNode, "SECTION_FUNC_ID")) {
       /*newel = traildom.createElement("FUNCID");
        setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(fldNode, "SECTION_FUNC_ID")));
        x.appendChild(newel);*/
        
        var vl=getNodeText(selectSingleNode(fldNode, "SECTION_FUNC_ID"));
        var nl=loadXMLDoc("<FUNCID>"+vl+"</FUNCID>");
        x.appendChild(selectSingleNode(nl, "//FUNCID"));
    }
	
	 if (selectSingleNode(fldNode, "SECTION_TYPE")) {
      /*  newel = traildom.createElement("TYPE");
        setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(fldNode, "SECTION_TYPE")));
        x.appendChild(newel);*/
        
        var vl=getNodeText(selectSingleNode(fldNode, "SECTION_TYPE"));
        var nl=loadXMLDoc("<TYPE>"+vl+"</TYPE>");
        x.appendChild(selectSingleNode(nl, "//TYPE"));
    }
	
	}
}

    var partitions = selectNodes(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']/" + port + "/RAD_TABS[@ID='" + tabId + "']/RAD_SECTIONS[@ID='" + secId + "']/RAD_PARTITIONS");
    for (var i = 0;i < partitions.length;i++) {
        var fld = partitions[i].getAttribute("ID");
        if (!(newel = createPartition(tabId, port, scrId, secId, fld)))
            return false;
        x = traildom.getElementsByTagName("SECTION")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }

    return traildom;
}

function createPartition(tabId, port, scrId, secId, partId) {
    var fldNode = selectSingleNode(xmldoc, "//RAD_SCREENS[@ID='" + scrId + "']/" + port + "/RAD_TABS[@ID='" + tabId + "']/RAD_SECTIONS[@ID='" + secId + "']/RAD_PARTITIONS[@ID='" + partId + "']")
    var traildom = createRootNode("PART");

    if (getNodeText(selectSingleNode(fldNode, "NO_OF_SUBPARTITIONS")) > 0) {
        newel = traildom.createElement("SPRTCNT");
        newel.appendChild(traildom.createTextNode(getNodeText(selectSingleNode(fldNode, "NO_OF_SUBPARTITIONS"))));
        traildom.getElementsByTagName("PART")[0].appendChild(newel);
    }

    traildom.getElementsByTagName("PART")[0].setAttribute("ID", getNodeText(selectSingleNode(fldNode, "PARTITION_NAME")));
    traildom.getElementsByTagName("PART")[0].setAttribute("NAME", getNodeText(selectSingleNode(fldNode, "PARTITION_NAME")));
    traildom.getElementsByTagName("PART")[0].setAttribute("WIDTH", getNodeText(selectSingleNode(fldNode, "PARTITION_WIDTH")));

    partId = traildom.getElementsByTagName("PART")[0].getAttribute("ID");

    var fldsets = selectNodes(xmldoc, "//RAD_FIELDSETS[FIELDSET_SCREEN='" + scrId + "' and FIELDSET_PORTION='" + port + "' and FIELDSET_TAB ='" + tabId + "' and FIELDSET_SECTION = '" + secId + "' and FIELDSET_PARTITION='" + partId + "' and FIELDSET_VISIBLE='Y']");

    for (var i = 0;i < fldsets.length;i++) {
        var fld = fldsets[i].getAttribute("ID");
        if (!(newel = createFieldsets(tabId, port, scrId, secId, partId, fld)))
            return false;
        newel.documentElement.setAttribute("INDEX", i + 1);
        x = traildom.getElementsByTagName("PART")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }

    return traildom;
}

function createFieldsets(tabId, port, scrId, secId, partId, fldsetId) {

    var fldNode = selectSingleNode(xmldoc, "//RAD_FIELDSETS[@ID='" + fldsetId + "']");
    var traildom = createRootNode("FLDSET");

    traildom.getElementsByTagName("FLDSET")[0].setAttribute("ID", getNodeText(selectSingleNode(fldNode, "FIELDSET_NAME")));
    if (getNodeText(selectSingleNode(fldNode, "VIEW_TYPE")) == "SINGLE")
        traildom.getElementsByTagName("FLDSET")[0].setAttribute("VIEW", "SE");
    else 
        traildom.getElementsByTagName("FLDSET")[0].setAttribute("VIEW", "ME");
    if (getNodeText(selectSingleNode(fldNode, "MULTI_RECORD")) == "Y")
        traildom.getElementsByTagName("FLDSET")[0].setAttribute("TYPE", "ME");
    else 
        traildom.getElementsByTagName("FLDSET")[0].setAttribute("TYPE", "SE");
	if(selectSingleNode(fldNode, "FIELDSET_TYPE")!=null)	{
    if (getNodeText(selectSingleNode(fldNode, "FIELDSET_TYPE")) == "Version")
	    traildom.getElementsByTagName("FLDSET")[0].setAttribute("TYPE", "VC");
	}
	  if (selectSingleNode(fldNode, "FIELDSET_TYPE") != null)
	  if (getNodeText(selectSingleNode(fldNode, "FIELDSET_TYPE")) == "SUMMARY"){ 
            traildom.getElementsByTagName("FLDSET")[0].setAttribute("TYPE", "ME");
			traildom.getElementsByTagName("FLDSET")[0].setAttribute("HREQ", "Y");
		}  

    x = traildom.getElementsByTagName("FLDSET")[0];
    if (getNodeText(selectSingleNode(fldNode, "NAV_BUTTONS_REQ")) == "Y") {
        /*newel = traildom.createElement("NAV_BTN_REQ");
        setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(fldNode, "NAV_BUTTONS_REQ")));
        x.appendChild(newel);*/
        
        var vl=getNodeText(selectSingleNode(fldNode, "NAV_BUTTONS_REQ"));
        var nl=loadXMLDoc("<NAV_BTN_REQ>"+vl+"</NAV_BTN_REQ>");
        x.appendChild(selectSingleNode(nl, "//NAV_BTN_REQ"));
    }
	if (selectSingleNode(fldNode, "NAV_BTN_FULL_WIDTH") != null
			&& getNodeText(selectSingleNode(fldNode, "NAV_BTN_FULL_WIDTH")) == "Y") {
		var nl = loadXMLDoc("<NAV_BTN_FULL_WIDTH>Y</NAV_BTN_FULL_WIDTH>");
		x.appendChild(selectSingleNode(nl, "//NAV_BTN_FULL_WIDTH"));
    }

   /* newel = traildom.createElement("LBL");
    setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(fldNode, "FIELDSET_LABEL")));
    x.appendChild(newel);*/
    
    var vl=getNodeText(selectSingleNode(fldNode, "FIELDSET_LABEL"));
    var nl=loadXMLDoc("<LBL>"+vl+"</LBL>");
    x.appendChild(selectSingleNode(nl, "//LBL"));

   /* newel = traildom.createElement("BLOCK");
    setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(fldNode, "FIELDSET_BLOCK")));
    x.appendChild(newel);*/

    var vl=getNodeText(selectSingleNode(fldNode, "FIELDSET_BLOCK"));
    var nl=loadXMLDoc("<BLOCK>"+vl+"</BLOCK>");
    x.appendChild(selectSingleNode(nl, "//BLOCK"));

    
    //newel = traildom.createElement("HREQ");
    if (getNodeText(selectSingleNode(fldNode, "HORIZONTAL_FIELDSET")) == "Y"){
    	var nl=loadXMLDoc("<HREQ>-1</HREQ>");
        x.appendChild(selectSingleNode(nl, "//HREQ"));
    }
         
    else 
    {
    	var nl=loadXMLDoc("<HREQ>0</HREQ>");
        x.appendChild(selectSingleNode(nl, "//HREQ"));
    }
        //setNodeText(selectSingleNode(newel, "/"), "0");
 //   x.appendChild(newel);
    if (selectSingleNode(fldNode, "FIELDSET_HEIGHT")) {
        /*newel = traildom.createElement("HEIGHT");
        setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(fldNode, "FIELDSET_HEIGHT")));
        x.appendChild(newel);*/
        
        var vl=getNodeText(selectSingleNode(fldNode, "FIELDSET_HEIGHT"));
        var nl=loadXMLDoc("<HEIGHT>"+vl+"</HEIGHT>");
        x.appendChild(selectSingleNode(nl, "//HEIGHT"));
    }
    if (selectSingleNode(fldNode, "FIELDSET_READ_ONLY") && getNodeText(selectSingleNode(fldNode, "FIELDSET_READ_ONLY")) == "Y") {
       /* newel = traildom.createElement("READ_ONLY");
        setNodeText(selectSingleNode(newel, "/"), "-1");
        x.appendChild(newel);*/
        
        var vl="-1";
        var nl=loadXMLDoc("<READ_ONLY>"+vl+"</READ_ONLY>");
        x.appendChild(selectSingleNode(nl, "//READ_ONLY"));
    }

    if (selectSingleNode(fldNode, "FIELDSET_WIDTH")) {
        /*newel = traildom.createElement("WIDTH");
        setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(fldNode, "FIELDSET_WIDTH")));
        x.appendChild(newel);*/
        
        var vl=getNodeText(selectSingleNode(fldNode, "FIELDSET_WIDTH"));
        var nl=loadXMLDoc("<WIDTH>"+vl+"</WIDTH>");
        x.appendChild(selectSingleNode(nl, "//WIDTH"));
    }

    if (getNodeText(selectSingleNode(fldNode, "VIEW_TYPE")) == "MULTIPLE" && getNodeText(selectSingleNode(fldNode, "MULTI_RECORD")) == "Y") {
        newel = traildom.createElement("PGSIZE");
        if (selectSingleNode(fldNode, "ROWS_PER_PAGE") && getNodeText(selectSingleNode(fldNode, "ROWS_PER_PAGE")) != "") {
            //setNodeText(selectSingleNode(newel, "/"), getNodeText(selectSingleNode(fldNode, "ROWS_PER_PAGE")));
            var vl=getNodeText(selectSingleNode(fldNode, "ROWS_PER_PAGE"));
        }
        else {
        	var vl="15";
            //setNodeText(selectSingleNode(newel, "/"), "15");
        }
        var nl=loadXMLDoc("<PGSIZE>"+vl+"</PGSIZE>");
        x.appendChild(selectSingleNode(nl, "//PGSIZE"));
       // x.appendChild(newel);

    }
    var fldsetFileds = selectNodes(xmldoc, "//RAD_FIELDSETS[@ID='" + fldsetId + "']/FIELDSET_FIELDS");
    var fldsetblk = getNodeText(selectSingleNode(fldNode, "FIELDSET_BLOCK"));

    // data xml Code start here for Multiple 
    if (parent.dataXmlFlg == 'Y') {

        var tmpfunctionid = getNodeText(selectSingleNode(xmldoc, "//FUNCTION_ID"));
        var dataxml = fnReadMode("", parent.dataxmlPath + "\\" + tmpfunctionid + ".xml", "");
        dataxml = loadXMLDoc(dataxml);
        var l_dataBlock = selectNodes(dataxml, "//" + fldsetblk);
        for (z = 0;z < l_dataBlock.length;z++) {
            if (getNodeText(selectSingleNode(fldNode, "VIEW_TYPE")) == "MULTIPLE" && getNodeText(selectSingleNode(fldNode, "MULTI_RECORD")) == "Y") {
                newel = traildom.createElement("DATA_ROWNO");
                //traildom.getElementsByTagName("DATA_ROWNO")[0].setAttribute("ID", z);
                //setNodeText(selectSingleNode(newel,"/"), z+1);        
                newel.setAttribute("ID", z);
                x.appendChild(newel);

            }
        }
        for (z = 0;z < l_dataBlock.length;z++) {

            for (var i = 0;i < fldsetFileds.length;i++) {
                //shihab
                if (getNodeText(selectSingleNode(fldsetFileds[i], "ACTIVE")) == 'Y') {
                    var fld = fldsetFileds[i].getAttribute("ID");
                    var currfield = selectSingleNode(xmldoc, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + fldsetblk + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fld + "']");
                    if (!(newel = fnCreatefield(fldsetblk, fld, false))) {
                        continue;
                    }
                    if (selectSingleNode(fldsetFileds[i], "FIELD_INDEX")) {
                        selectSingleNode(newel, "//FIELD").setAttribute("INDEX", getNodeText(selectSingleNode(fldsetFileds[i], "FIELD_INDEX")));
                    }
                    else {
                        selectSingleNode(newel, "//FIELD").setAttribute("INDEX", "");
                    }
                    if (getNodeText(selectSingleNode(currfield, "ITEM_TYPE")) == "CONTROL") {
                        selectSingleNode(newel, "//FIELD").setAttribute("CONTROL", "Y");
                    }
                    else {
                        selectSingleNode(newel, "//FIELD").setAttribute("CONTROL", "N");
                    }
                    if (selectSingleNode(fldsetFileds[i], "SUBPARTITION_NAME") && getNodeText(selectSingleNode(fldsetFileds[i], "SUBPARTITION_NAME")) != "")
                        selectSingleNode(newel, "//FIELD").setAttribute("SPRT", getNodeText(selectSingleNode(fldsetFileds[i], "SUBPARTITION_NAME")));
                    if (getNodeText(selectSingleNode(fldNode, "VIEW_TYPE")) == "MULTIPLE" && getNodeText(selectSingleNode(fldNode, "MULTI_RECORD")) == "Y") {
                        x = traildom.getElementsByTagName("DATA_ROWNO")[z];
                        x.appendChild(fnImportNode(newel, newel.documentElement));
                    }
                    else {
                        x = traildom.getElementsByTagName("FLDSET")[0];
                        x.appendChild(fnImportNode(newel, newel.documentElement));
                    }
                    if (getNodeText(selectSingleNode(currfield, "DISPLAY_TYPE")) == 'ROSELECT') {
                        if (selectSingleNode(fldsetFileds[i], "SUBPARTITION_NAME") && getNodeText(selectSingleNode(fldsetFileds[i], "SUBPARTITION_NAME")) != '')
                            var sprtval = getNodeText(selectSingleNode(fldsetFileds[i], "SUBPARTITION_NAME"));
                        else var sprtval = '';
                    }
                }
            }
        }
    }
    else {

        for (var i = 0;i < fldsetFileds.length;i++) {
            //shihab
            if (getNodeText(selectSingleNode(fldsetFileds[i], "ACTIVE")) == 'Y') {
                var fld = fldsetFileds[i].getAttribute("ID");
                var currfield = selectSingleNode(xmldoc, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + fldsetblk + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fld + "']");
                //amount field validation shihab starts
                pUixmlFldList = pUixmlFldList + fld + '~';
                if (currfield != null) {
                    if (getNodeText(selectSingleNode(currfield, "VISIBLE")) == 'Y') {

                        if (getNodeText(selectSingleNode(currfield, "DISPLAY_TYPE")) == 'AMOUNT') {
                            var pRelatedFld = getNodeText(selectSingleNode(currfield, "RELATED_FIELD"));
                            if (pRelatedFld == '') {
                                //error
                                if (bulkgenflag != 'Y') {
                                    //writeLog("Related Ccy not present for "+fld+" of block "+fldsetblk, "A");			 
                                    //amountValFlag=true;
                                }
                            }
                            else {
                                if (pUixmlFldList.indexOf('~' + pRelatedFld + '~') < 0) {
                                    //error;
                                    if (bulkgenflag != 'Y') {
                                        writeLog("***Error in Fieldset Field Order: Related CCY field " + pRelatedFld + " should be above amount field " + fld + " in screen " + scrId, "A");
                                        amountValFlag = true;
                                    }
                                }
                            }
                        }
                    }
                }
                //amount field validation shihab ends
                if (!(newel = fnCreatefield(fldsetblk, fld, false))) {
                    continue;
                }
                if (selectSingleNode(fldsetFileds[i], "FIELD_INDEX")) {
                    selectSingleNode(newel, "//FIELD").setAttribute("INDEX", getNodeText(selectSingleNode(fldsetFileds[i], "FIELD_INDEX")));
                }
                else {
                    selectSingleNode(newel, "//FIELD").setAttribute("INDEX", "");
                }
                if (getNodeText(selectSingleNode(currfield, "ITEM_TYPE")) == "CONTROL") {
                    selectSingleNode(newel, "//FIELD").setAttribute("CONTROL", "Y");
                }
                else {
                    selectSingleNode(newel, "//FIELD").setAttribute("CONTROL", "N");
                }
                if (selectSingleNode(fldsetFileds[i], "SUBPARTITION_NAME") && getNodeText(selectSingleNode(fldsetFileds[i], "SUBPARTITION_NAME")) != "")
                    selectSingleNode(newel, "//FIELD").setAttribute("SPRT", getNodeText(selectSingleNode(fldsetFileds[i], "SUBPARTITION_NAME")));
                x = traildom.getElementsByTagName("FLDSET")[0];
                x.appendChild(fnImportNode(newel, newel.documentElement));

            }
        }

    }

    return traildom;
}

function createOptionsForRadioNode(fldId, optId, dfltVal) {
    var traildom = createRootNode("OPTION");

    traildom.getElementsByTagName("OPTION")[0].setAttribute("ROW", optId);
    traildom.getElementsByTagName("OPTION")[0].setAttribute("COL", "1");
    var optNode = selectSingleNode(xmldoc, "//RAD_BLK_FIELDS[@ID='" + fldId + "']/RAD_FIELD_CUSTOM_ATTRS[@ID='" + optId + "']");

    x = traildom.getElementsByTagName("OPTION")[0];
    newl = traildom.createElement("ID");
    setNodeText(newl, getNodeText(selectSingleNode(optNode, "ATTR_VALUE")));
    x.appendChild(newl);

    newl = traildom.createElement("VALUE");
    setNodeText(newl, getNodeText(selectSingleNode(optNode, "ATTR_VALUE")));
    x.appendChild(newl);

    newl = traildom.createElement("LBL");
    setNodeText(newl, getNodeText(selectSingleNode(optNode, "ATTR_NAME")));
    x.appendChild(newl);

    newl = traildom.createElement("SELECTED");

    if (dfltVal == getNodeText(selectSingleNode(optNode, "ATTR_VALUE")))
        setNodeText(newl, "-1");
    else 
        setNodeText(newl, "0");
    x.appendChild(newl);

    return traildom;
}

function createCustomCheckboxNode(blkId, fldId) {
    var traildom = createRootNode("CUSTOM");

    var optNode = selectNodes(xmldoc, "//RAD_DATA_BLOCKS[@ID='" + blkId + "']/RAD_BLK_FIELDS[@ID='" + fldId + "']/RAD_FIELD_CUSTOM_ATTRS");
    x = traildom.getElementsByTagName("CUSTOM")[0];
    for (var i = 0;i < optNode.length;i++) {
        var attr_name = getNodeText(selectSingleNode(optNode[i], "ATTR_NAME"));
        if (attr_name == "ON" || attr_name == "LBL_ON" || attr_name == "YES" || attr_name == "LBL_CHECK" || attr_name == "LBL_CHECKED") {
            newl = traildom.createElement("ON");
            setNodeText(newl, getNodeText(selectSingleNode(optNode[i], "ATTR_VALUE")));
            x.appendChild(newl);
        }
        if (attr_name == "OFF" || attr_name == "LBL_OFF" || attr_name == "NO" || attr_name == "LBL_UNCHECK" || attr_name == "LBL_UNCHECKED") {
            newl = traildom.createElement("OFF");
            setNodeText(newl, getNodeText(selectSingleNode(optNode[i], "ATTR_VALUE")));
            x.appendChild(newl);
        }

    }
    return traildom;

}

function createEventsNode(blkId, fldId, eventId) {
    var traildom = createRootNode("EVENT");

    var eventNode = selectSingleNode(xmldoc, "//RAD_DATA_BLOCKS[@ID='" + blkId + "']/RAD_BLK_FIELDS[@ID='" + fldId + "']/RAD_FIELD_EVENTS[@ID='" + eventId + "']");
    x = traildom.getElementsByTagName("EVENT")[0];
    newl = traildom.createElement("NAME");
    setNodeText(newl, getNodeText(selectSingleNode(eventNode, "EVENT_NAME")));
    x.appendChild(newl);

    newl = traildom.createElement("FUNCTION");
    setNodeText(newl, getNodeText(selectSingleNode(eventNode, "FUNCTION_NAME")));
    x.appendChild(newl);

    return traildom;
}

function createAmountMainNode(blkId, fldId, events) {
    var traildom = createRootNode("REFERRED_FIELDS");
    for (var i = 0;i < events.length;i++) {
        var eventId = events[i].getAttribute("ID");
        newel = createAmmountNodes(blkId, fldId, eventId);
        x = traildom.getElementsByTagName("REFERRED_FIELDS")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }
    return traildom;
}

function createAmmountNodes(blkId, fldId, eventId) {
    
    var eventNode = selectSingleNode(xmldoc, "//RAD_DATA_BLOCKS[@ID='" + blkId + "']/RAD_BLK_FIELDS[@ID='" + fldId + "']/RAD_AMOUNT_FIELDS[@ID='" + eventId + "']");
    if(getNodeText(selectSingleNode(eventNode, "C_BLK_NAME"))!==""){
    var traildom = createRootNode("RFIELD");

    var eventNode = selectSingleNode(xmldoc, "//RAD_DATA_BLOCKS[@ID='" + blkId + "']/RAD_BLK_FIELDS[@ID='" + fldId + "']/RAD_AMOUNT_FIELDS[@ID='" + eventId + "']");
    x = traildom.getElementsByTagName("RFIELD")[0];
    newl = traildom.createElement("RNAME");
    setNodeText(newl, getNodeText(selectSingleNode(eventNode, "C_BLK_NAME")) + "__" + getNodeText(selectSingleNode(eventNode, "C_FLD_NAME")));
    x.appendChild(newl);

    newl = traildom.createElement("RTYPE");
    setNodeText(newl, getNodeText(selectSingleNode(eventNode, "INOUT")));
    x.appendChild(newl);
   }
    return traildom;
}

function fnCreateSubscrNodes(scrName, fldNode,label) {
    var traildom = createRootNode("FORM");

    x = traildom.getElementsByTagName("FORM")[0];
    newl = traildom.createElement("FUNCTION");
    if (selectSingleNode(fldNode, "CALLFORM_NAME"))
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "CALLFORM_NAME")));
    x.appendChild(newl);

    newl = traildom.createElement("SCREEN");
    setNodeText(newl, getNodeText(selectSingleNode(fldNode, "SCREEN_NAME")));
    x.appendChild(newl);

   //if(selectSingleNode(xmldoc, "//RAD_SCREENS[@ID='" + getNodeText(selectSingleNode(fldNode, "SCREEN_NAME"))+ "']")!="" && selectSingleNode(xmldoc, "//RAD_SCREENS[@ID='" + getNodeText(selectSingleNode(fldNode, "SCREEN_NAME"))+ "']")!==null){
   if(selectSingleNode(xmldoc, "//RAD_SCREENS[@ID='" + getNodeText(selectSingleNode(fldNode, "SCREEN_NAME"))+ "']")!==null){
   if(getNodeText(selectSingleNode(selectSingleNode(xmldoc, "//RAD_SCREENS[@ID='" + getNodeText(selectSingleNode(fldNode, "SCREEN_NAME"))+ "']"), "SCREEN_OBIEE"))=='Y'){
	newl = traildom.createElement("TITLE");
	setNodeText(newl, label);
	x.appendChild(newl);
	
    newl = traildom.createElement("LBL");
    setNodeText(newl, getNodeText(selectSingleNode(fldNode, "../LABEL_CODE")));
    x.appendChild(newl);
	}
	 else{
    newl = traildom.createElement("LBL");
    setNodeText(newl, getNodeText(selectSingleNode(fldNode, "../LABEL_CODE")));
    x.appendChild(newl);
	}

	}
   else{
    newl = traildom.createElement("LBL");
    setNodeText(newl, getNodeText(selectSingleNode(fldNode, "../LABEL_CODE")));
    x.appendChild(newl);
	}
    return traildom;
}

function linkFunction(lovnode, funcname, traildom, level, linktype) {
    var x1 = traildom.getElementsByTagName(lovnode)[0];

    newl = traildom.createElement("LEVEL");
    setNodeText(newl, level);
    x1.appendChild(newl);

    newl = traildom.createElement("TYPE");
    setNodeText(newl, linktype);
    x1.appendChild(newl);

    newl = traildom.createElement("FID");
    setNodeText(newl, funcname);
    x1.appendChild(newl);

    return traildom;
}

function createLovNode(lovnode, Lovname, typ ,fldNode) {
    var traildom = createRootNode(lovnode);

    x = traildom.getElementsByTagName(lovnode)[0];
    newl = traildom.createElement("NAME");
    setNodeText(newl, Lovname);

    x.appendChild(newl);

    newl = traildom.createElement("TYPE");
    setNodeText(newl, typ);
    x.appendChild(newl);

		//VINIT exactfetch_changes
    if (selectSingleNode(fldNode, "EXACT_FETCH") && getNodeText(selectSingleNode(fldNode, "EXACT_FETCH")) == "Y") {
	newl = traildom.createElement("EXACT_FETCH");
	setNodeText(newl, "Y");
	x.appendChild(newl);
	
   }  
//VINIT ENDS
    return traildom;
}

function createPopupEditNode(title, imgSrc) {
    var traildom = createRootNode("POPUPEDIT");

    x = traildom.getElementsByTagName("POPUPEDIT")[0];

    newl = traildom.createElement("TITLE");
    newl.appendChild(traildom.createTextNode(title));
    x.appendChild(newl);

    newl = traildom.createElement("OK_IMG_SRC");
    newl.appendChild(traildom.createTextNode(imgSrc));
    x.appendChild(newl);

    newl = traildom.createElement("CANCEL_IMG_SRC");
    newl.appendChild(traildom.createTextNode(imgSrc));
    x.appendChild(newl);

    return traildom;
}

function createMaintAuditTemplate(mstblk) {

    var str = '<TAB NAME=\"TAB_FOOTER\" ID=\"TAB_FOOTER\" HEIGHT=\"\"><LBL></LBL>';
    str += '<SECTION ID=\"AUDIT_TEMPLATE\" NAME=\"AUDIT_TEMPLATE\"><PART ID=\"AUDIT_PART_1\" NAME=\"AUDIT_PART_1\" WIDTH=\"50\"><SPRTCNT>4</SPRTCNT>';
    str += '<FLDSET ID=\"FLD_AUDIT1\" VIEW=\"SE\" TYPE=\"SE\" INDEX=\"1\"><LBL/><BLOCK>' + mstblk + '</BLOCK><HREQ>0</HREQ>';
    //str += '<FIELD INDEX=\"1\" SPRT=\"1\"><NAME>MAKER</NAME><ID>MAKER</ID><TYPE>TEXT</TYPE><LBL>LBL_MNT_MAKER</LBL><MAXLENGTH>12</MAXLENGTH>'; //Bug 36392889 commented
    str += '<FIELD INDEX=\"1\" SPRT=\"1\"><NAME>MAKER</NAME><ID>MAKER</ID><TYPE>TEXT</TYPE><LBL>LBL_MNT_MAKER</LBL><MAXLENGTH>320</MAXLENGTH>';//Bug 36392889 modified
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR2</DTYPE><SIZE>12</SIZE><WIDTH>3</WIDTH></FIELD>';
    //str += '<FIELD INDEX=\"1\" SPRT=\"1\"><NAME>CHECKER</NAME><ID>CHECKER</ID><TYPE>TEXT</TYPE><LBL>LBL_MNT_CHECKER</LBL><MAXLENGTH>12</MAXLENGTH>';//Bug 36392889 commented
    str += '<FIELD INDEX=\"1\" SPRT=\"1\"><NAME>CHECKER</NAME><ID>CHECKER</ID><TYPE>TEXT</TYPE><LBL>LBL_MNT_CHECKER</LBL><MAXLENGTH>320</MAXLENGTH>';//Bug 36392889 modified
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR2</DTYPE><SIZE>12</SIZE><WIDTH/></FIELD>';
    str += '<FIELD INDEX=\"2\" SPRT=\"2\"><NAME>MAKERSTAMP</NAME><ID>MAKERSTAMP</ID><TYPE>DATETIME</TYPE><LBL>LBL_MNT_DTTM</LBL><MAXLENGTH>15</MAXLENGTH>';
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>DATE</DTYPE><SIZE>15</SIZE><WIDTH>3</WIDTH></FIELD>';
    str += '<FIELD INDEX=\"2\" SPRT=\"2\"><NAME>CHECKERSTAMP</NAME><ID>CHECKERSTAMP</ID><TYPE>DATETIME</TYPE><LBL>LBL_MNT_DTTM</LBL><MAXLENGTH>15</MAXLENGTH>';
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>DATE</DTYPE><SIZE>15</SIZE><WIDTH/></FIELD>';
    str += '<FIELD INDEX=\"1\" SPRT=\"3\"><NAME>MODNO</NAME><ID>MODNO</ID><TYPE>TEXT</TYPE><LBL>LBL_MNT_MODNO</LBL><MAXLENGTH>8</MAXLENGTH>';
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>NUMBER</DTYPE><SIZE>4</SIZE><WIDTH/></FIELD>';
    str += '<FIELD INDEX=\"2\" SPRT=\"3\"><NAME>ONCEAUTH</NAME><ID>ONCEAUTH</ID><TYPE>HIDDEN</TYPE><HIDDEN>-1</HIDDEN><LBL/><MAXLENGTH>1</MAXLENGTH>';
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR</DTYPE><SIZE>1</SIZE><WIDTH>3</WIDTH></FIELD>';
    str += '<FIELD INDEX=\"\" SPRT=\"4\"><NAME>TXNSTAT</NAME><ID>TXNSTAT</ID><TYPE>ROSELECT</TYPE><MAX_DECIMALS></MAX_DECIMALS><OPTION SELECTED="0" VALUE=""/><OPTION VALUE=\"C\">LBL_MNT_CLOSED</OPTION><OPTION VALUE=\"O\">LBL_MNT_OPEN</OPTION><LBL>LBL_MNT_TXNSTAT</LBL><MAXLENGTH>1</MAXLENGTH><DTYPE>CHAR</DTYPE><SIZE>1</SIZE><CHECKED>N</CHECKED><ROWS></ROWS><COLS></COLS></FIELD>';
    //str += '<FIELD INDEX=\"\" SPRT=\"4\"><NAME>TXNSTATI</NAME><ID>TXNSTATI</ID><TYPE>TEXT</TYPE><LBL>LBL_MNT_TXNSTAT</LBL><MAXLENGTH>10</MAXLENGTH><READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR2</DTYPE><SIZE>10</SIZE></FIELD>';
    str += '<FIELD INDEX=\"\" SPRT=\"4\"><NAME>AUTHSTAT</NAME><ID>AUTHSTAT</ID><TYPE>ROSELECT</TYPE><MAX_DECIMALS></MAX_DECIMALS><OPTION SELECTED="0" VALUE=""/><OPTION VALUE=\"A\">LBL_MNT_AUTHORIZED</OPTION><OPTION VALUE=\"R\">LBL_MNT_REJECTED</OPTION><OPTION  VALUE=\"U\">LBL_MNT_UNAUTHORIZED</OPTION><LBL>LBL_MNT_AUTHSTAT</LBL><MAXLENGTH>1</MAXLENGTH><DTYPE>CHAR</DTYPE><SIZE>1</SIZE><CHECKED>N</CHECKED><ROWS></ROWS><COLS></COLS></FIELD>';
    // str += '<FIELD INDEX=\"\" SPRT=\"4\"><NAME>AUTHSTATI</NAME><ID>AUTHSTATI</ID><TYPE>TEXT</TYPE><LBL>LBL_MNT_AUTHSTAT</LBL><MAXLENGTH>10</MAXLENGTH><READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR2</DTYPE><SIZE>10</SIZE></FIELD>';
    str += '</FLDSET></PART></SECTION></TAB>';
    footerdom = loadXMLDoc(str);

    return footerdom;

}

function createMaintProcessTemplate(mstblk) {

    var str = '<TAB NAME=\"TAB_FOOTER\" ID=\"TAB_FOOTER\" HEIGHT=\"\"><LBL></LBL>';
    str += '<SECTION ID=\"AUDIT_TEMPLATE\" NAME=\"AUDIT_TEMPLATE\"><PART ID=\"AUDIT_PART_1\" NAME=\"AUDIT_PART_1\" WIDTH=\"50\"><SPRTCNT>4</SPRTCNT>';
    str += '<FLDSET ID=\"FLD_AUDIT1\" VIEW=\"SE\" TYPE=\"SE\" INDEX=\"1\"><LBL/><BLOCK>' + mstblk + '</BLOCK><HREQ>0</HREQ>';
    //str += '<FIELD INDEX=\"1\" SPRT=\"1\"><NAME>MAKER</NAME><ID>MAKER</ID><TYPE>HIDDEN</TYPE><LBL>LBL_MNT_MAKER</LBL><MAXLENGTH>12</MAXLENGTH>'; //Bug 36392889 commented
    str += '<FIELD INDEX=\"1\" SPRT=\"1\"><NAME>MAKER</NAME><ID>MAKER</ID><TYPE>HIDDEN</TYPE><LBL>LBL_MNT_MAKER</LBL><MAXLENGTH>320</MAXLENGTH>';//Bug 36392889 modified
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR2</DTYPE><SIZE>12</SIZE><WIDTH>3</WIDTH></FIELD>';
    //str += '<FIELD INDEX=\"1\" SPRT=\"1\"><NAME>CHECKER</NAME><ID>CHECKER</ID><TYPE>HIDDEN</TYPE><LBL>LBL_MNT_CHECKER</LBL><MAXLENGTH>12</MAXLENGTH>';//Bug 36392889 commented
    str += '<FIELD INDEX=\"1\" SPRT=\"1\"><NAME>CHECKER</NAME><ID>CHECKER</ID><TYPE>HIDDEN</TYPE><LBL>LBL_MNT_CHECKER</LBL><MAXLENGTH>320</MAXLENGTH>';//Bug 36392889 modified
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR2</DTYPE><SIZE>12</SIZE><WIDTH></WIDTH></FIELD>';
    str += '<FIELD INDEX=\"2\" SPRT=\"2\"><NAME>MAKERSTAMP</NAME><ID>MAKERSTAMP</ID><TYPE>HIDDEN</TYPE><LBL>LBL_MNT_DTTM</LBL><MAXLENGTH>15</MAXLENGTH>';
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>DATE</DTYPE><SIZE>15</SIZE><WIDTH>3</WIDTH></FIELD>';
    str += '<FIELD INDEX=\"2\" SPRT=\"2\"><NAME>CHECKERSTAMP</NAME><ID>CHECKERSTAMP</ID><TYPE>HIDDEN</TYPE><LBL>LBL_MNT_DTTM</LBL><MAXLENGTH>15</MAXLENGTH>';
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>DATE</DTYPE><SIZE>15</SIZE><WIDTH></WIDTH></FIELD>';
    str += '<FIELD INDEX=\"1\" SPRT=\"3\"><NAME>MODNO</NAME><ID>MODNO</ID><TYPE>HIDDEN</TYPE><LBL>LBL_MNT_MODNO</LBL><MAXLENGTH>8</MAXLENGTH>';
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>NUMBER</DTYPE><SIZE>4</SIZE><WIDTH></WIDTH></FIELD>';
    str += '<FIELD INDEX=\"2\" SPRT=\"3\"><NAME>ONCEAUTH</NAME><ID>ONCEAUTH</ID><TYPE>HIDDEN</TYPE><HIDDEN>-1</HIDDEN><LBL></LBL><MAXLENGTH>1</MAXLENGTH>';
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR</DTYPE><SIZE>1</SIZE><WIDTH>3</WIDTH></FIELD>';
    str += '<FIELD INDEX=\"2\" SPRT=\"4\"><NAME>TXNSTAT</NAME><ID>TXNSTAT</ID><TYPE>HIDDEN</TYPE><LBL>LBL_MNT_OPEN</LBL><MAXLENGTH>1</MAXLENGTH>';
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR</DTYPE><SIZE>1</SIZE><WIDTH>3</WIDTH><CUSTOM><ON>O</ON><OFF>C</OFF></CUSTOM></FIELD>';
    str += '<FIELD INDEX=\"1\" SPRT=\"4\"><NAME>AUTHSTAT</NAME><ID>AUTHSTAT</ID><TYPE>HIDDEN</TYPE><LBL>LBL_MNT_AUTHORIZED</LBL><MAXLENGTH>1</MAXLENGTH>';
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR</DTYPE><SIZE>1</SIZE><WIDTH>3</WIDTH><CUSTOM><ON>A</ON><OFF>U</OFF></CUSTOM></FIELD></FLDSET></PART></SECTION>';
    str += '<SECTION ID=\"PROCESS_FOOTER_TEMPLATE\" NAME=\"PROCESS_FOOTER_TEMPLATE\"><PART ID=\"PROCESS_FOOTER_PART_1\" NAME=\"PROCESS_FOOTER_PART_1\" WIDTH=\"50\">';
    str += '<SPRTCNT>4</SPRTCNT>';
    str += '<FLDSET ID=\"FLD_FOOTER_PROCESS1\" VIEW=\"SE\" TYPE=\"SE\" INDEX=\"1\"><LBL/><BLOCK>BLK_PROCESS_AUDIT</BLOCK><HREQ>0</HREQ>';
    str += '<FIELD INDEX=\"1\" SPRT=\"1\"><NAME>PREV_REMARK</NAME><ID>PREV_REMARK</ID><TYPE>TEXTAREA</TYPE><LBL>LBL_MNT_PREVREM</LBL><MAXLENGTH>50</MAXLENGTH>';
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR2</DTYPE><SIZE></SIZE><WIDTH>3</WIDTH><ROWS>3</ROWS><COLS>15</COLS></FIELD>';
    str += '<FIELD INDEX=\"2\" SPRT=\"2\"><NAME>REMARK</NAME><ID>REMARK</ID><TYPE>TEXTAREA</TYPE><LBL>LBL_MNT_REM</LBL><MAXLENGTH>50</MAXLENGTH>';
    str += '<DTYPE>VARCHAR2</DTYPE><SIZE></SIZE><WIDTH></WIDTH><ROWS>3</ROWS><COLS>15</COLS></FIELD>';
    str += '<FIELD INDEX=\"\" SPRT=\"3\"><NAME>AUDIT</NAME><ID>AUDIT</ID><TYPE>BUTTON</TYPE><LBL>LBL_MNT_AUDIT</LBL><MAXLENGTH></MAXLENGTH>';
    str += '<DTYPE></DTYPE><SIZE>15</SIZE><WIDTH>3</WIDTH></FIELD>';
    str += '<FIELD INDEX=\"\" SPRT=\"4\"><NAME>OUTCOME</NAME><ID>OUTCOME</ID><TYPE>SELECT</TYPE><OPTION SELECTED=\"0\" VALUE=\"\"></OPTION> ';
    str += '<OPTION SELECTED=\"0\" VALUE=\"O\">LBL_MNT_OUTCOME</OPTION><LBL>LBL_MNT_OUTCOME</LBL><MAXLENGTH>15</MAXLENGTH>';
    str += '<SIZE></SIZE><WIDTH></WIDTH></FIELD>';
    str += '</FLDSET></PART></SECTION></TAB>';
    footerdom = loadXMLDoc(str);
    return footerdom;

}

function createProcessTemplate() {

    var str = '<TAB ID=\"TAB_FOOTER\" NAME=\"TAB_FOOTER\" HEIGHT=\"\"><LBL></LBL>';
    str += '<SECTION ID=\"PROCESS_FOOTER_TEMPLATE\" NAME=\"PROCESS_FOOTER_TEMPLATE\"><PART ID=\"PROCESS_FOOTER_PART_1\" NAME=\"PROCESS_FOOTER_PART_1\" WIDTH=\"50\">';
    str += '<SPRTCNT>4</SPRTCNT>';
    str += '<FLDSET ID=\"FLD_FOOTER_PROCESS1\" VIEW=\"SE\" TYPE=\"SE\" INDEX=\"1\"><LBL/><BLOCK>BLK_PROCESS_AUDIT</BLOCK><HREQ>0</HREQ>';
    str += '<FIELD INDEX=\"1\" SPRT=\"1\"><NAME>PREV_REMARK</NAME><ID>PREV_REMARK</ID><TYPE>TEXTAREA</TYPE><LBL>LBL_MNT_PREVREM</LBL><MAXLENGTH>50</MAXLENGTH>';
    str += '<READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR2</DTYPE><SIZE></SIZE><WIDTH>3</WIDTH><ROWS>3</ROWS><COLS>15</COLS></FIELD>';
    str += '<FIELD INDEX=\"2\" SPRT=\"2\"><NAME>REMARK</NAME><ID>REMARK</ID><TYPE>TEXTAREA</TYPE><LBL>LBL_MNT_REM</LBL><MAXLENGTH>50</MAXLENGTH>';
    str += '<DTYPE>VARCHAR2</DTYPE><SIZE></SIZE><WIDTH></WIDTH><ROWS>3</ROWS><COLS>15</COLS></FIELD>';
    str += '<FIELD INDEX=\"\" SPRT=\"3\"><NAME>AUDIT</NAME><ID>AUDIT</ID><TYPE>BUTTON</TYPE><LBL>LBL_MNT_AUDIT</LBL><MAXLENGTH></MAXLENGTH>';
    str += '<DTYPE></DTYPE><SIZE>15</SIZE><WIDTH>3</WIDTH></FIELD>';
    str += '<FIELD INDEX=\"\" SPRT=\"4\"><NAME>OUTCOME</NAME><ID>OUTCOME</ID><TYPE>SELECT</TYPE><OPTION SELECTED=\"0\" VALUE=\"\"></OPTION> ';
    str += '<OPTION SELECTED=\"0\" VALUE=\"O\">LBL_MNT_OUTCOME</OPTION><LBL>LBL_MNT_OUTCOME</LBL><MAXLENGTH>15</MAXLENGTH>';
    str += '<SIZE></SIZE><WIDTH></WIDTH></FIELD></FLDSET></PART></SECTION></TAB>';
    footerdom = loadXMLDoc(str);
    return footerdom;
}

function createRootNode(node) {
    newel = xmldoc.createElement(node);
    rootNode = loadXMLDoc(getXMLString(newel));
    return rootNode;
}

function createLegendsNode(fldnm, lblcd) {
    var traildom = createRootNode("LEGENDS");
    x = traildom.getElementsByTagName("LEGENDS")[0];

    newl = traildom.createElement("FIELD_NAME");
    setNodeText(newl, fldnm);
    x.appendChild(newl);

    newl = traildom.createElement("LBL");
    setNodeText(newl, lblcd);
    x.appendChild(newl);

    var fldnode = selectNodes(xmldoc, "//RAD_BLK_FIELDS[FIELD_NAME='" + fldnm + "']/RAD_FIELD_CUSTOM_ATTRS");
    for (var attr = 0;attr < fldnode.length;attr++) {
        if (getNodeText(selectSingleNode(fldnode[attr], "ATTR_NAME")) != "") {
            newl = traildom.createElement("OPTION");
            setNodeText(newl, getNodeText(selectSingleNode(fldnode[attr], "ATTR_NAME")));
            newl.setAttribute("VALUE", getNodeText(selectSingleNode(fldnode[attr], "ATTR_VALUE")));
            x.appendChild(newl);
        }
    }

    return traildom;
}

function createHeaderProcessTemplate() {
    var str = '<SECTION ID=\"PROCESS_HEADER_TEMPLATE\">';
    str += '<PART ID=\"PROCESS_HEADER_PART_1\" NAME=\"PROCESS_HEADER_PART_1\" WIDTH=\"100\"><SPRTCNT>2</SPRTCNT>';
    str += '<FLDSET ID=\"FLD_HEADER_PROCESS1\" VIEW=\"SE\" TYPE=\"SE\" INDEX=\"1\"><LBL></LBL><BLOCK>BLK_PROCESS_AUDIT</BLOCK>';
    str += '<HREQ>0</HREQ><FIELD INDEX=\"1\" SPRT=\"1\"><NAME>WF_REF_NO</NAME><ID>WF_REF_NO</ID><TYPE>TEXT</TYPE><LBL>LBL_MNT_WFREFNO</LBL>';
    str += '<MAXLENGTH>50</MAXLENGTH><READ_ONLY>-1</READ_ONLY><DTYPE>VARCHAR2</DTYPE><SIZE>30</SIZE><WIDTH>3</WIDTH></FIELD>';
    str += '<FIELD INDEX=\"1\" SPRT=\"2\"><NAME>WF_PRTY</NAME><ID>WF_PRTY</ID><TYPE>SELECT</TYPE><OPTION SELECTED=\"0\" VALUE=\"L\">LBL_MNT_LOW</OPTION>';
    str += '<OPTION SELECTED=\"0\" VALUE=\"M\">LBL_MNT_MEDIUM</OPTION><OPTION SELECTED=\"0\" VALUE=\"H\">LBL_MNT_HIGH</OPTION><LBL>LBL_MNT_PRIORITY</LBL>';
    str += '<MAXLENGTH>12</MAXLENGTH><READ_ONLY>0</READ_ONLY><DTYPE>VARCHAR2</DTYPE><SIZE></SIZE><WIDTH></WIDTH></FIELD></FLDSET></PART></SECTION>';
    headerdom = loadXMLDoc(str);

    return headerdom;
}

function createCustomButtonNodes(buttonNode) {

    var traildom = createRootNode("BUTTON");
    x = traildom.getElementsByTagName("BUTTON")[0];
    newl = traildom.createElement("BUTTON_NAME");
    setNodeText(newl, getNodeText(selectSingleNode(buttonNode, "FIELD_NAME")));
    x.appendChild(fnImportNode(newl, newl));

    newl = traildom.createElement("BUTTON_LBL");
    setNodeText(newl, getNodeText(selectSingleNode(buttonNode, "FIELD_LABEL")));
    x.appendChild(fnImportNode(newl, newl));

    newl = traildom.createElement("BUTTON_EVENT");
    setNodeText(newl, getNodeText(selectSingleNode(buttonNode, "FUNCTION_NAME")));
    x.appendChild(fnImportNode(newl, newl));

    return traildom;
}

function SubscrAsTabHandler(scrName) {
    var traildom = createRootNode("CALLFORMS");
    var fldNode = selectNodes(xmldoc, "//RAD_CALLFORM[CALLFORM_DISPLAY_TYPE != 'BUTTON']");
    for (var i = 0;i < fldNode.length;i++) {
        newel = createCallFormNodes(scrName, fldNode[i]);
        newel.documentElement.setAttribute("SEQ", i + 1);
        newel.documentElement.setAttribute("id", getNodeText(selectSingleNode(fldNode[i], "CALLFORM_FUCNTIONID")));

        x = traildom.getElementsByTagName("CALLFORMS")[0];
        x.appendChild(fnImportNode(newel, newel.documentElement));
    }
    return traildom;
}

function createCallFormNodes(scrName, fldNode) {
    var traildom = createRootNode("FORM");
    x = traildom.getElementsByTagName("FORM")[0];
    newl = traildom.createElement("FUNCTION");
    if (selectSingleNode(fldNode, "CALLFORM_FUCNTIONID"))
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "CALLFORM_FUCNTIONID")));
    x.appendChild(fnImportNode(newl, newl));

    newl = traildom.createElement("DISP_TYPE");
    setNodeText(newl, "TAB");
    x.appendChild(fnImportNode(newl, newl));

    newl = traildom.createElement("DISP_TAB");

    setNodeText(newl, getNodeText(selectSingleNode(fldNode, "CALLFORM_DISPLAY_TYPE")));
    x.appendChild(fnImportNode(newl, newl));

    newl = traildom.createElement("CLFR_TYPE");
    if (selectSingleNode(fldNode, "CALLFORM_TYPE"))
        setNodeText(newl, getNodeText(selectSingleNode(fldNode, "CALLFORM_TYPE")));
    x.appendChild(fnImportNode(newl, newl));

    return traildom;
}