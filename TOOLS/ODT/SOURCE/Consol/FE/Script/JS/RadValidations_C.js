/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadValidations.js
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
  ** Copyright ? 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  -------------------------------------------------------------------------------------------------------
*/

function Populate() {

    var dtscr = selectNodes(dom, "//RAD_DATASOURCES");
    var dtblks = selectNodes(dom, "//RAD_DATA_BLOCKS");
    var blkTyp = document.getElementById('BLOCK_TYPE').value;
    if (blkTyp != "CONTROL") {
        document.getElementById('DATASOURCE_NAME').options.length = 0;
        var add = 0;
        var MltRecArray = new Array();
        var TempRecArray = new Array();
        var len = 0;

        if (document.getElementById('BLK_MULTI_RECORD').value == "Y") {
            for (var j = 0;j < dtscr.length;j++) {
                if (selectSingleNode(dtscr[j], "DATASRC_NAME") != null) {
                    if (getNodeText(selectSingleNode(dtscr[j], 'MULTI_RECORD')) == "Y") {
                        MltRecArray[len] = getNodeText(selectSingleNode(dtscr[j], "DATASRC_NAME"));
                        len++;
                    }
                }
            }
            TempRecArray = MltRecArray;

            for (var i = 0;i < dtblks.length;i++) {
                if (selectSingleNode(dtblks[i], 'BLK_DATASOURCES') != null) {
                    var blkName = getNodeText(selectSingleNode(dtblks[i], 'BLOCK_NAME'));
                    var BlkDtscr = selectNodes(dtblks[i], ("//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/BLK_DATASOURCES"));
                    for (var m = 0;m < BlkDtscr.length;m++) {
                        for (var k = 0;k < MltRecArray.length;k++) {
                            if (getNodeText(selectSingleNode(BlkDtscr[m], ('DATASOURCE_NAME'))) == MltRecArray[k]) {
                                TempRecArray.splice(k, 1)
                            }
                        }
                    }
                }
            }
            for (var n = 0;n < TempRecArray.length;n++) {
                addOption(document.getElementById('DATASOURCE_NAME'), TempRecArray[n], TempRecArray[n], false);
            }
        }
        else {

            for (var k = 0;k < dtscr.length;k++) {
                if (getNodeText(selectSingleNode(dtscr[k], 'MULTI_RECORD')) == "N") {
                    var dns = false;
                    var dbs = document.getElementById('DBLK_DATASOURCE_NAME').options.length;
                    for (var d = 0;d < dbs;d++) {
                        if (getNodeText(selectSingleNode(dtscr[k], "DATASRC_NAME")) == document.getElementById('DBLK_DATASOURCE_NAME').options[d].value) {
                            dns = true;
                            break;
                        }
                    }
                    if (dns == false) {
                        addOption(document.getElementById('DATASOURCE_NAME'), getNodeText(selectSingleNode(dtscr[k], "DATASRC_NAME")), getNodeText(selectSingleNode(dtscr[k], "DATASRC_NAME")), false);
                    }
                }
            }
        }
    }
    else {
        document.getElementById('DATASOURCE_NAME').options.length = 0;
    }

}

function PopulateLov() {

    var tmp = 0;
    document.getElementById('LOV_NAME').options.length = 0;
    document.getElementById('OFF_LINE_LOV_NAME').options.length = 0;
    var dtscrlen = selectNodes(dom, ("//RAD_LOVS")).length;
    for (var j = 0;j < dtscrlen;j++) {
        var datascr = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_LOVS"))[j], ("LOV_NAME")));
        addOption(document.getElementById('LOV_NAME'), datascr, datascr, false);
        addOption(document.getElementById('OFF_LINE_LOV_NAME'), datascr, datascr, false);
    }
    var glLovList = glblLovList.split("~");

    for (var glv = 0;glv < glLovList.length;glv++) {
        tmp = 0;
        for (var lv = 0;lv < dtscrlen;lv++) {
            if (glLovList[glv] == getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_LOVS"))[lv], ("LOV_NAME")))) {
                tmp = 1;
                break;
            }
        }
        if (tmp == 0) {
            addOption(document.getElementById('LOV_NAME'), glLovList[glv], glLovList[glv], true);
            addOption(document.getElementById('OFF_LINE_LOV_NAME'), glLovList[glv], glLovList[glv], true);
        }

        if (glv == glLovList.length - 1) {
            addOption(document.getElementById('LOV_NAME'), "", "", true);
            addOption(document.getElementById('OFF_LINE_LOV_NAME'), "", "", true);
        }
    }
}

function DataSrcDtls() {
    var arrFbox = new Array();
    var arrTbox = new Array();
    var arrLookup = new Array();
    var frombox = document.getElementById('DATASOURCE_NAME');
    var blkType = document.getElementById('BLOCK_TYPE').value;
    var fLength = 0;
    var tLength = 0;
    if (blkType != "CONTROL") {
        for (i = 0;i < frombox.options.length;i++) {
            arrLookup[frombox.options[i].text] = frombox.options[i].value;
            if (frombox.options[i].selected && frombox.options[i].value != "") {
                arrTbox[tLength] = frombox.options[i].text;
                tLength++;
            }
            else {
                arrFbox[fLength] = frombox.options[i].text;
                fLength++;
            }

        }
        if (document.getElementById('DBLK_DATASOURCE_NAME').options.length == "0") {
            for (var j = 0;j < arrTbox.length;j++) {
                addOption(document.getElementById('DBLK_DATASOURCE_NAME'), arrTbox[j], arrTbox[j], false);
            }
        }
        else {
            for (var j = 0;j < arrTbox.length;j++) {
                var add = 0;
                var rowlen = document.getElementById('DBLK_DATASOURCE_NAME').options.length;
                for (var i = 0;i < rowlen;i++) {
                    if (arrTbox[j] == document.getElementById('DBLK_DATASOURCE_NAME').options[i].text) {
                        add = 1;
                        break;
                    }
                }
                if (add != "1") {
                    addOption(document.getElementById('DBLK_DATASOURCE_NAME'), arrTbox[j], arrTbox[j], false);
                    add = 0;
                }

            }
        }
    }
    else {
        document.getElementById('DBLK_DATASOURCE_NAME').options.length = 0;
    }

}

function Populatefileds() {

    var Optlen = document.getElementById("DATAS_NAME").options.length;
    for (var j = 0;j < Optlen;j++) {
        if (document.getElementById("DATAS_NAME").options[j].selected == true) {
            var datascrname = document.getElementById("DATAS_NAME").options[j].text;
        }
    }
    var datafileds = selectNodes(dom, ("//RAD_DATASOURCES[@ID='" + datascrname + "']/RAD_FIELDS"));
    document.getElementById("DATASRC1_FIELDS_LIST").options.length = 0;
    for (var j = 0;j < datafileds.length;j++) {
        var add = 0;
        var val = datascrname + "." + datafileds[j].firstChild.text;
        var fldlen = document.getElementById("DATABLK1_FIELDS_LIST").options.length;
        if (fldlen > 0) {
            for (var k = 0;k < fldlen;k++) {
                if (document.getElementById("DATABLK1_FIELDS_LIST").options[k].value == val) {
                    add = 1;
                    break;
                }
            }
            if (add != 1) {
                addOption(document.getElementById("DATASRC1_FIELDS_LIST"), datafileds[j].firstChild.text, val, false);
                add = 0;
            }
        }
        if (fldlen == 0) {
            addOption(document.getElementById("DATASRC1_FIELDS_LIST"), datafileds[j].firstChild.text, val, false);
        }
    }
}

function move(fbox, tbox) {
    var arrFbox = new Array();
    var arrTbox = new Array();
    var arrLookup = new Array();
    var frombbox = document.getElementById(fbox);
    var tobox = document.getElementById(tbox);

    if (tobox.options.length > 0 && tobox.options[0].text == "") {
        tobox.options.length = 0;
    }
    var i;
    for (i = 0;i < tobox.options.length;i++) {
        arrLookup[tobox.options[i].text] = tobox.options[i].value;
        arrTbox[i] = tobox.options[i].text;
    }
    var fLength = 0;
    var tLength = arrTbox.length;
    for (i = 0;i < frombox.options.length;i++) {
        arrLookup[frombox.options[i].text] = frombox.options[i].value;
        if (frombox.options[i].selected && frombox.options[i].value != "") {
            arrTbox[tLength] = frombox.options[i].text;
            tLength++;
        }
        else {
            arrFbox[fLength] = frombox.options[i].text;
            fLength++;
        }
    }
    arrFbox.sort();
    arrTbox.sort();
    frombox.length = 0;
    tobox.length = 0;
    var c;
    for (c = 0;c < arrFbox.length;c++) {
        var no = new Option();
        no.value = arrLookup[arrFbox[c]];
        no.text = arrFbox[c];
        frombox[c] = no;
    }
    for (c = 0;c < arrTbox.length;c++) {
        var no = new Option();
        no.value = arrLookup[arrTbox[c]];
        no.text = arrTbox[c];
        tobox[c] = no;
    }
}

function PopulateScreens(obj) {
    document.getElementById('SCREEN_NAME11').options.length = 0;
    var dtscrlen = selectNodes(dom, "//RAD_SCREENS").length;
    for (var j = 0;j < dtscrlen;j++) {

        var datascr = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_SCREENS"))[j], "SCREEN_NAME"));
        var visible1 = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_SCREENS"))[j], "SCREEN_VISIBLE"));
        if (visible1 == "Y")
            addOption(document.getElementById('SCREEN_NAME11'), datascr, datascr, false);

    }
}

function PopulateBlkFields(obj) {
    if (document.getElementById('FIELDSET_VISIBLE').checked == true) {

        var screenName = document.getElementById('SCREEN_NAME11').value;
        PopulateScreens(obj);
        document.getElementById('SCREEN_NAME11').value = screenName;
    }
    var index = document.getElementById('DATABLOCK_NAME').options.selectedIndex;
    var blk_id = document.getElementById('DATABLOCK_NAME').options[index].text;
    var fldset = clickedobjects[1];

    if (obj == "") {
        deleteAll('FieldsetFields');
    }

    document.getElementById('DATASRC2_FIELDS_LIST').options.length = 0;

    var fldlen = document.getElementById("FieldsetFields").tBodies[0].rows.length;
    var blkFields = selectNodes(dom, "//RAD_DATA_BLOCKS[@ID='" + blk_id + "']/RAD_BLK_FIELDS");
    var dtscrlen = selectNodes(dom, "//RAD_DATA_BLOCKS[@ID='" + blk_id + "']/RAD_BLK_FIELDS").length;
    if (document.getElementById('DATASRC2_FIELDS_LIST').options) {
        document.getElementById('DATASRC2_FIELDS_LIST').options.length = 0;
    }

    var fldary1 = "";

    for (var j = 0;j < dtscrlen;j++) {
        var add = 0;
        if (getNodeText(selectSingleNode(blkFields[j], "FIELDSET_NAME")) == "" || getNodeText(selectSingleNode(blkFields[j], "FIELDSET_NAME")) == fldset) {
            fldary1 = getNodeText(selectSingleNode(blkFields[j], "FIELD_NAME"));
            if (fldlen > 0) {
                for (var k = 0;k < fldlen;k++) {
                    if (document.getElementById('FieldsetFields').tBodies[0].rows[k].cells[1].getElementsByTagName("INPUT")[0].value == fldary1) {
                        if (document.getElementById('FieldsetFields').tBodies[0].rows[k].cells[5].getElementsByTagName("INPUT")[0].value == 'Y') {
                            add = 1;
                            break;
                        }
                    }
                }
                if (add != 1) {
                    addOption(document.getElementById("DATASRC2_FIELDS_LIST"), fldary1, fldary1, false);
                    add = 0;
                }
            }
            if (fldlen == 0) {
                addOption(document.getElementById("DATASRC2_FIELDS_LIST"), fldary1, fldary1, false);
            }
        }
    }
    try {
        var fldset = document.getElementById('FDN').getElementsByTagName('fieldset')[0].getElementsByTagName('INPUT')[0].value;
    }
    catch (e) {
        var fldset = "";
    }
    if (obj == "") {
        if (selectNodes(dom, "//RAD_DATA_BLOCKS[@ID='" + blk_id + "']")[0] != null) {
            if (getNodeText(selectSingleNode(selectNodes(dom, "//RAD_DATA_BLOCKS[@ID='" + blk_id + "']")[0], 'MULTI_RECORD')) == "N") {
                document.getElementById('MULTI_RECORD_FST').value = "N";
                document.getElementById('VIEW_TYPE').value = "SINGLE";
            }
            else {
                document.getElementById('MULTI_RECORD_FST').value = "Y";
                document.getElementById('VIEW_TYPE').value = "MULTIPLE";
            }
        }
    }

    fn_attach_fieldset_name(fldset + "~" + fldset, fldset + "~" + fldset);
    FildSetValidations('');

	if(document.getElementById('FIELDSET_TYPE').value == "Version" ){
         MoveToFieldset('FDN','DATASRC2_FIELDS_LIST','FieldsetFields','true');
         document.getElementById("Datablkflds").disabled = true;
	  document.getElementById("FieldsetFields").disabled = true;
     }
	else if(document.getElementById('FIELDSET_TYPE').value == "ImageSet" ){
        document.getElementById("Datablkflds").disabled = true;
	    document.getElementById("FieldsetFields").disabled = true;
     }
	 else if(document.getElementById('FIELDSET_TYPE').value == "Normal" ){
	  document.getElementById("Datablkflds").disabled = false;
	    document.getElementById("FieldsetFields").disabled = false;
	 }

}

function onChangeSelected(element, node, addto, frmname) {
    var flag;

    if (node == 'RAD_TABS') {
        document.getElementById(addto).options.length = 0;
        document.getElementById("SECTION_NAME11").options.length = 0;
        document.getElementById("PARTITION_NAME11").options.length = 0;
        var index = document.getElementById(element).options.selectedIndex;
        var l_val1 = document.getElementById(element).options[index].text;
        if (l_val1 == "") {
            alertMessage("Select Screen Name..", "E");
            return false;
        }
        var tab_type_index = document.getElementById("SCREEN_PORTION_FST").options.selectedIndex;
        var tab_type = document.getElementById("SCREEN_PORTION_FST").options[tab_type_index].value;
        if (tab_type == "") {
            return;
        }
        var dtscrlen = selectNodes(dom, "//RAD_SCREENS[@ID='" + l_val1 + "']/" + tab_type + "[@ID='" + tab_type + "']" + "/" + node).length;

        if (document.getElementById(addto).options) {
            document.getElementById(addto).options.length = 0;
        }
        flag = 0;
        for (var j = 0;j < dtscrlen;j++) {
            if (selectNodes(dom, "//RAD_SCREENS[@ID='" + l_val1 + "']/" + tab_type + "[@ID='" + tab_type + "']" + "/" + node)[j]) {
                var sel = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_SCREENS[@ID='" + l_val1 + "']/" + tab_type + "[@ID='" + tab_type + "']" + "/" + node))[j], "TAB_NAME"));
                var visibletab = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_SCREENS[@ID='" + l_val1 + "']/" + tab_type + "[@ID='" + tab_type + "']" + "/" + node))[j], "TAB_VISIBLE"));
                if (visibletab == "Y") {
                    addOption(document.getElementById(addto), sel, sel, false);
                    flag = flag + 1;
                }
            }
            if (flag == 1) {
                onChangeSelected('TAB_NAME11', 'RAD_SECTIONS', 'SECTION_NAME11', 'frmFldSet');
            }
        }
    }
    // To Populate Blks
    if (node == "RAD_DATA_BLOCKS") {

        var dtblkslen = selectNodes(dom, "//RAD_DATA_BLOCKS").length
        document.getElementById('DATABLOCK_NAME').options.length = 0;
        for (var j = 0;j < dtblkslen;j++) {
            var datascr = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS"))[j], 'BLOCK_NAME'));
            addOption(document.getElementById('DATABLOCK_NAME'), datascr, datascr, false);
        }
        if (j >= dtblkslen) {
            addOption(document.getElementById('DATABLOCK_NAME'), "", "", true);
        }

    }

    if (node == 'RAD_SECTIONS') {
        if (element == 'TAB_NAME11') {
            var scr = 'SCREEN_NAME11';
        }
        if (element == 'TAB_NAME_DB') {
            var scr = 'SCREEN_NAME_DB';
        }

        var index = document.getElementById(scr).options.selectedIndex;
        var l_val1 = document.getElementById(scr).options[index].text;
        if (l_val1 == "") {
            alertMessage("Select Screen Name..", "E");
            return flase;
        }
        var tab_type_index = document.getElementById("SCREEN_PORTION_FST").options.selectedIndex;
        var tab_type = document.getElementById("SCREEN_PORTION_FST").options[tab_type_index].value;
        if (tab_type == "") {
            alertMessage("Select Screen Portion..", "E");
            return false;
        }
        index = document.getElementById(element).options.selectedIndex;
        var l_val2 = document.getElementById(element).options[index].text;
        var dtscrlen = selectNodes(dom, "//RAD_SCREENS[@ID='" + l_val1 + "']/" + tab_type + "[@ID='" + tab_type + "']" + "/RAD_TABS[@ID='" + l_val2 + "']/" + node).length
        if (document.getElementById(addto).options) {
            document.getElementById(addto).options.length = 0;
        }
        flag = 0;
        for (var j = 0;j < dtscrlen;j++) {
            if (selectNodes(dom, "//RAD_SCREENS[@ID='" + l_val1 + "']/" + tab_type + "[@ID='" + tab_type + "']" + "/RAD_TABS[@ID='" + l_val2 + "']/" + node)[j]) {
                var sel = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_SCREENS[@ID='" + l_val1 + "']/" + tab_type + "[@ID='" + tab_type + "']" + "/RAD_TABS[@ID='" + l_val2 + "']/" + node))[j], "SECTION_NAME"));
                var visibletab = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_SCREENS[@ID='" + l_val1 + "']/" + tab_type + "[@ID='" + tab_type + "']" + "/RAD_TABS[@ID='" + l_val2 + "']/" + node))[j], "SEC_VISIBLE"));
                if (visibletab == "Y") {
                    addOption(document.getElementById(addto), sel, sel, false);
                    flag = flag + 1;
                }

            }
            if (flag == 1) {
                onChangeSelected('SECTION_NAME11', 'RAD_PARTITIONS', 'PARTITION_NAME11', 'frmFldSet');
            }
        }
    }

    if (node == 'RAD_PARTITIONS') {
        if (element == 'SECTION_NAME11') {
            var scr = 'SCREEN_NAME11';
            var scr1 = 'TAB_NAME11';
        }
        if (element == 'SECTION_NAME_DB') {
            var scr = 'SCREEN_NAME_DB';
            var scr1 = 'TAB_NAME_DB';
        }

        var tab_type_index = document.getElementById("SCREEN_PORTION_FST").options.selectedIndex;
        var tab_type = document.getElementById("SCREEN_PORTION_FST").options[tab_type_index].value;
        var index = document.getElementById(scr).options.selectedIndex;
        var l_val1 = document.getElementById(scr).options[index].text;
        if (l_val1 == "") {
            alertMessage("Select Screen Name..", "E");
            return flase;
        }
        index = document.getElementById(scr1).options.selectedIndex;
        var l_val2 = document.getElementById(scr1).options[index].text;
        index = document.getElementById(element).options.selectedIndex;
        var l_val3 = document.getElementById(element).options[index].text;
        var dtscrlen = selectNodes(dom, "//RAD_SCREENS[@ID='" + l_val1 + "']/" + tab_type + "[@ID='" + tab_type + "']" + "/RAD_TABS[@ID='" + l_val2 + "']/RAD_SECTIONS[@ID='" + l_val3 + "']/" + node).length
        if (document.getElementById(addto).options) {
            document.getElementById(addto).options.length = 0;
        }

        for (var j = 0;j < dtscrlen;j++) {
            if (selectNodes(dom, "//RAD_SCREENS[@ID='" + l_val1 + "']/" + tab_type + "[@ID='" + tab_type + "']" + "/RAD_TABS[@ID='" + l_val2 + "']/RAD_SECTIONS[@ID='" + l_val3 + "']/" + node)[j]) {
                var sel = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_SCREENS[@ID='" + l_val1 + "']/" + tab_type + "/RAD_TABS[@ID='" + l_val2 + "']/RAD_SECTIONS[@ID='" + l_val3 + "']/" + node))[j], "PARTITION_NAME"));
                addOption(document.getElementById(addto), sel, sel, false);
            }
            if (j == 0) {
                SetSubpartition();
            }
        }

    }
}

function appendSelectValues(obj) {

    var Retvalue = "";
    var len = document.getElementById(obj).options.length;
    for (var i = 0;i < len;i++) {
        var val = document.getElementById(obj).options[i].value;
        Retvalue = Retvalue + val + '~';//+val+':';
    }
    return Retvalue;
}

function prepareSelectValues(obj, val) {
    var Retvalue;
    var val1 = new Array();
    val1 = val.split('~');
    var val2 = new Array();
    var len = val1.length;
    for (var i = 0;i < len;i++) {
        val2 = val1[i].split('.');
        addOption(document.getElementById(obj), val2[1], val1[i], false);
    }
    return Retvalue;
}

function fnOnChangeBlkTyp(frmName, fldName) {

    var blkName = clickedobjects[1];
    var blkType = document.getElementById("BLOCK_TYPE").value;
    var temp = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']"))[0], 'BLOCK_TYPE'));
    if (blkType == "CONTROL") {
        var blkDtScrs = document.getElementById("DBLK_DATASOURCE_NAME").options.length;
        if (blkDtScrs > 0) {
            logScreen = "D1";
            var get_res = alertMessage("All Block Fields Will Be Deleted..? ", "O", "" + blkName + "~" + frmName + "~" + fldName + "~" + temp + "~" + blkType + "");
            document.getElementById("BLOCK_TYPE").value = temp;//var get_res = confirm("All Block Fields Will Be Deleted..?");
        }
    }
    else {
        Populate();
    }
}

function fnOnChangeBlkTypalert(get_res, arguments) {
    arguments = arguments.split("~");
    var blkName = arguments[0];
    var frmName = arguments[1];
    var fldName = arguments[2];
    var temp = arguments[3];
    var blkType = arguments[4];
    if (get_res != true) {
        setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']"))[0], "BLOCK_TYPE"), document.getElementById('BLOCK_TYPE').value);
        return;
    }
    else {
        setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']"))[0], 'BLOCK_TYPE'), document.getElementById('BLOCK_TYPE').value);
        var obj = document.getElementsByName(fldName)[0];
        if (obj.options.length > 0) {
            for (var i = 0;i < obj.options.length;i++) {
                obj.options[i].selected = true;
            }
        }
        var res = MoveToFieldset(frmName, fldName, 'YES');
        if (res == false) {
            setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']"))[0], 'BLOCK_TYPE'), temp);
            document.getElementById("BLOCK_TYPE").value = temp;
            return;
        }
        else {
            setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']"))[0], 'BLOCK_TYPE'), blkType);
            document.getElementById("BLOCK_TYPE").value = blkType;
            document.getElementsByName("DATASOURCE_NAME")[0].options.length = 0;
            document.getElementById("DBLK_DATASOURCE_NAME").length = 0;
        }
    }
}

// onchage multi record for a block clearing datasources
function fnselectall(frmName, fldName) {
    var blkName = clickedobjects[1];
    var blkdtsrsc = document.getElementById("DBLK_DATASOURCE_NAME").options.length;
    var blkRecord = document.getElementById("BLK_MULTI_RECORD").value
    var temp = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']"))[0], 'MULTI_RECORD'));
    if (blkdtsrsc != 0) {
        document.getElementById("BLK_MULTI_RECORD").value = temp;
        logScreen = "D2";
        var get_res = alertMessage("All Block Fields Will Be Deleted..? ", "O", "" + blkName + "~" + frmName + "~" + fldName + "~" + blkRecord + "~" + temp + "");
        return;
    }
    Populate();
}

function fnselectallalert(get_res, arguments) {
    arguments = arguments.split("~");
    var blkName = arguments[0];
    var frmName = arguments[1];
    var fldName = arguments[2];
    var blkRecord = arguments[3];
    var temp = arguments[4];
    if (get_res != true) {
        document.getElementById("BLK_MULTI_RECORD").value = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']"))[0], ('MULTI_RECORD')));
        return;
    }
    else {
        document.getElementById("BLK_MULTI_RECORD").value = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']"))[0], 'MULTI_RECORD'));
    }
    var obj = document.getElementsByName(fldName)[0];

    if (obj.options.length > 0) {
        for (var i = 0;i < obj.options.length;i++) {
            obj.options[i].selected = true;
        }
        var valid = MoveToFieldset(frmName, fldName, 'YES');
        if (valid == false) {
            for (var j = 0;j < obj.options.length;j++) {
                obj.options[j].selected = false;
            }
            document.getElementById("BLK_MULTI_RECORD").value = temp;
            Populate();
            return;
        }
        else {
            document.getElementById("BLK_MULTI_RECORD").value = blkRecord;
            Populate();
            return;
        }

    }

}

function MoveToFieldsetD3alert(get_res, arguments) {
    arguments = arguments.split("~");
    var blkName = arguments[0];
    var fld = arguments[1];
    if (get_res != true) {
        return;
    }
    var frombox = document.getElementById(fld);
    var fLength = 0;
    var tLength = 0;
    var arrFbox = new Array();
    var arrTbox = new Array();
    var arrLookup = new Array();
    for (i = 0;i < frombox.options.length;i++) {
        arrLookup[frombox.options[i].text] = frombox.options[i].value;
        if (frombox.options[i].selected && frombox.options[i].value != "") {
            arrTbox[tLength] = frombox.options[i].text;
            tLength++;
        }
        else {
            arrFbox[fLength] = frombox.options[i].text;
            fLength++;
        }
    }
    var Optlen = document.getElementById(fld).options.length;
    for (var j = 0;j < arrTbox.length;j++) {
        var selectedfield = arrTbox[j];
        fnDelBlkFldsforDtScr(selectedfield, blkName);
        afterDelete();
    }
}

function MoveToFieldset(frmname, fld, tableName,flag) {
   if(document.getElementById('FIELDSET_TYPE').value != "Version" || flag){
    
    var arrFbox = new Array();
    var arrTbox = new Array();
    var arrLookup = new Array();
    var frombox = document.getElementById(fld);
    var blkname = clickedobjects[1];
    var addFlag = true;
    if (frmname == 'frmFldSet') {
        var fldsetblk = clickedobjects[1];
        if (fldsetblk == "") {
            alertMessage("Select Block..", "E");
            return;
        }
    }
	 if(flag){
	 var count = 0;
	 var tablname='FieldsetFields';
	 var rowlen = document.getElementById(tablname).tBodies[0].rows.length;
	 
	 var frombox1 = document.getElementById(fld);
	 for (i = 0;i < frombox1.options.length;i++) {
	    if(frombox1.options[i].value != "" && (frombox1.options[i].value=='VERNO' || frombox1.options[i].value=='LASTVERNO')){
		frombox1.options[i].selected=true;
		count++;
		}       
      }
	  var count1=0;
	  var frombox2 = document.getElementById(tablname);
	  var rowlen1 = document.getElementById(tablname).tBodies[0].rows.length;
	  if(rowlen>0){
	  for (i = 0;i < rowlen;i++) {
	  if(document.getElementById(tablname).tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value == 'VERNO' || document.getElementById(tablname).      tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value == 'LASTVERNO'	)  
	  count1++;
	 }
	  }
	  
	  if (count != 2 && count1 !=2) {
	                document.getElementById('FIELDSET_TYPE').value = "Normal";
					document.getElementById("Datablkflds").disabled = false;
		            document.getElementById("FieldsetFields").disabled = false;					
                    alertMessage("VERNO and LASTVERNO fields should be in the selected datablock for the fielset to be of version type", "O");
					return false;                    
                }
	 if(rowlen>0){
	 for (i = 0;i < rowlen;i++) {
	   document.getElementById(tablname).tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked = true;	   
	 }
	 if(count == 2)
	   MoveToDtBlkFlds('FDN','FieldsetFields','DATASRC2_FIELDS_LIST','true');
	 }
	 }
    var fLength = 0;
    var tLength = 0;
    for (i = 0;i < frombox.options.length;i++) {
        arrLookup[frombox.options[i].text] = frombox.options[i].value;
        if (frombox.options[i].selected && frombox.options[i].value != "") {
            arrTbox[tLength] = frombox.options[i].text;
            tLength++;
        }
        else {
            arrFbox[fLength] = frombox.options[i].text;
            fLength++;
        }
    }
    if (arrTbox.length > 0) {
        if (frombox.id == "DBLK_DATASOURCE_NAME") {
            for (var j = 0;j < arrTbox.length;j++) {
                var selectedfield = arrTbox[j];
                var val1 = fnCheckDSRDtchfrmBlk(selectedfield, blkname);
                if (val1 == 1) {
                    alertMessage("Parent DataSource Cannot Be Dettached", "E");
                    return false;
                }
                else if (val1 == 2) {
                    alertMessage("Previous Release DataSource Cannot Be Dettached", "E");
                    return false;
                }
                else if (val1 == 3) {
                    alertMessage("In Screen Customizer Mode DataSource Cannot Be Dettached", "E");
                    return false;
                }
            }

            if (tableName != "YES") {
                logScreen = "D3";
                var get_res = alertMessage("All Block Fields Will Be Deleted..? ", "O", "" + blkname + "~" + fld + "");
                return;
            }
            else {
                var Optlen = document.getElementById(fld).options.length;
                for (var j = 0;j < arrTbox.length;j++) {
                    var selectedfield = arrTbox[j];
                    fnDelBlkFldsforDtScr(selectedfield, blkname);
                    afterDelete();
                }
            }
        }
        else if (frombox.id == "DATASRC2_FIELDS_LIST") {
            var Optlen = document.getElementById(fld).options.length;
            for (var j = 0;j < arrTbox.length;j++) {
                var selectedfield = arrTbox[j];
                var fldsetName = document.getElementById('FDN').getElementsByTagName('fieldset')[0].getElementsByTagName('INPUT')[0].value;
                var blkname = document.getElementById('FDN').getElementsByTagName('fieldset')[0].getElementsByTagName('SELECT')[0].value;
                var res = fn_val_movetofldsetfields(blkname, fldsetName, selectedfield);
                if (res == false) {
                    return false;
                }
                addFlag = true;

                for (k = 0;k < document.getElementById(tableName).tBodies[0].rows.length;k++) {
                    if (document.getElementById(tableName).tBodies[0].rows[k].cells[1].getElementsByTagName("INPUT")[0].value == arrTbox[j]) {
                        document.getElementById(tableName).tBodies[0].rows[k].cells[5].getElementsByTagName("INPUT")[0].value = 'Y';
                        document.getElementById(tableName).getElementsByTagName('TBODY')[0].getElementsByTagName('TR')[k].style.display = 'block';
                        addFlag = false;
                    }
                }

                if (addFlag) {
                    addNewRow(tableName);
                    var rowlen = document.getElementById(tableName).tBodies[0].rows.length;
                    document.getElementById(tableName).tBodies[0].rows[rowlen - 1].cells[1].getElementsByTagName("INPUT")[0].value = arrTbox[j];
                    document.getElementById(tableName).tBodies[0].rows[rowlen - 1].cells[5].getElementsByTagName("INPUT")[0].value = 'Y';
                }

            }
            try {
                var fldset = document.getElementById('FDN').getElementsByTagName('fieldset')[0].getElementsByTagName('INPUT')[0].value;
            }
            catch (e) {
                var fldset = "";
            }
            fn_attach_fieldset_name(fldset + "~" + fldset, fldset + "~" + fldset);
            fnHideInactiveFields("FieldsetFields");
        }
        else {
            var Optlen = document.getElementById(fld).options.length;
            for (var j = 0;j < arrTbox.length;j++) {
                var selectedfield = arrTbox[j];
                addNewRow(tableName);
                var rowlen = document.getElementById(tableName).tBodies[0].rows.length;
                document.getElementById(tableName).tBodies[0].rows[rowlen - 1].cells[1].getElementsByTagName("INPUT")[0].value = arrTbox[j];
            }
        }

    }
    else {
        return true;
    }
    for (var k = 0;k < arrTbox.length;k++) {
        frombox.remove(arrTbox[k]);
    }
    var c;
    frombox.length = 0;
    for (c = 0;c < arrFbox.length;c++) {
        if (arrFbox[c] != "") {
            var no = new Option();
            no.value = arrLookup[arrFbox[c]];
            no.text = arrFbox[c];
            frombox[c] = no;
        }
    }
return true;
}
else{
alertMessage("Fieldset is verion control field set so no movement of field is allowed", "E");
}
}
function MoveToDtBlkFlds(frmname, tablname, fldname ,flag) {
  if(document.getElementById('FIELDSET_TYPE').value != "Version" || flag){
    var rowlen = document.getElementById(tablname).tBodies[0].rows.length;
    var arrfbox = new Array;
    var arrindex = new Array;
    var flength = 0;
    var addFlag = true;
    var InactiveFields = "";

    if (tablname == "FieldsetFields") {
        for (var j = 0;j < rowlen;j++) {
            if (document.getElementById(tablname).tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                arrfbox[flength] = document.getElementById(tablname).tBodies[0].rows[j].cells[1].getElementsByTagName("INPUT")[0].value;
                arrindex[flength] = j;
                if (document.getElementById(tablname).tBodies[0].rows[j].cells[5].getElementsByTagName("INPUT")[0].value == 'N') {
                    InactiveFields = InactiveFields + arrfbox[flength] + "~";

                }
                flength++;

            }

        }
        fn_val_MoveToDtBlkFlds(clickedobjects[0], clickedobjects[1], arrfbox, arrindex);

        delRow(tablname);

        for (var i = 0;i < arrfbox.length;i++) {
            addFlag = true;
            for (var j = 0;j < document.getElementById(fldname).getElementsByTagName("OPTION").length;j++) {
                if (document.getElementById(fldname).getElementsByTagName("OPTION")[j].value == arrfbox[i]) {
                    addFlag = false;
                }
            }
            if (InactiveFields.indexOf(arrfbox[i]) !=  - 1) {
                addFlag = false;
            }
            if (addFlag) {
                addOption(document.getElementById(fldname), arrfbox[i], arrfbox[i], false);
            }
        }

        try {
            var fldset = document.getElementById('FDN').getElementsByTagName('fieldset')[0].getElementsByTagName('INPUT')[0].value;
        }
        catch (e) {
            var fldset = "";
        }
        fn_attach_fieldset_name(fldset + "~" + fldset, fldset + "~" + fldset);
        fnHideInactiveFields("FieldsetFields");
    }
    else {
        for (var j = 0;j < rowlen;j++) {
            if (document.getElementById(tablname).tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                arrfbox[flength] = document.getElementById(tablname).tBodies[0].rows[j].cells[1].getElementsByTagName("INPUT")[0].value;

                flength++;
            }

        }
        delRow(tablname);
        for (var i = 0;i < arrfbox.length;i++) {
            addOption(document.getElementById(fldname), arrfbox[i], arrfbox[i], false);
        }
    }
}
else{
alertMessage("Fieldset is verion control field set so no movement of field is allowed", "E");
}
}

function PopulateSumary() {

    var dtscrlen = selectNodes(dom, "//RAD_DATA_BLOCKS").length;
    document.getElementById('RSLT_DATABLK').options.length = 0;
    addOption(document.getElementById('RSLT_DATABLK'), '', '', false);
    for (var j = 0;j < dtscrlen;j++) {
        var datascr = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS"))[j], "BLOCK_NAME"));
        if (getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + datascr + "']"))[0], "MULTI_RECORD")) == "N") {
            addOption(document.getElementById('RSLT_DATABLK'), datascr, datascr, false);
            PopulateDataSourceForSummary("S");
        }
    }
}

function PopulateDataSourceForSummary(obj) {

    var blockName = ""
    var blcklength = document.getElementById("RSLT_DATABLK").options.length;
    for (var i = 0;i < blcklength;i++) {
        if (document.getElementById("RSLT_DATABLK").options[i].selected == true) {
            blockName = document.getElementById("RSLT_DATABLK").options[i].value;
            if (blockName == "") {
                document.getElementById("DATASRC_SUM_FIELDS_LIST").options.length = 0;
            }
            document.getElementById("RSLT_DATASRC").options.length = 0;

            var dsnLength = selectNodes(dom, "//RAD_DATA_BLOCKS[@ID='" + blockName + "']/BLK_DATASOURCES").length;
            var datascr = "";
            for (var j = 0;j < dsnLength;j++) {
                datascr = getNodeText(selectSingleNode(selectNodes(dom, "//RAD_DATA_BLOCKS[@ID='" + blockName + "']/BLK_DATASOURCES")[j], "DATASOURCE_NAME"));
                if (getNodeText(selectNodes(dom, "//RAD_SUMMARY/RSLT_DATASRC")[0]) == datascr) {
                    addOption(document.getElementById("RSLT_DATASRC"), datascr, datascr, true);
                }
                else {
                    addOption(document.getElementById("RSLT_DATASRC"), datascr, datascr, false);
                }
                if (j == 0) {
                    PopulatefiledsForSummary(datascr, blockName, 'NO');
                }
            }
            addOption(document.getElementById("RSLT_DATASRC"), '', '', false);
        }
        if (obj == "C") {
            deleteAll('SUM_DTLS');
            var node = selectNodes(dom, "//RAD_SUMMARY/SUMMARY_DETAILS");
            if (node != null) {
                //node.removeAll();
                for (var m = 0;m < node.length;m++) {
                    node[m].parentNode.removeChild(node[m]);
                }

            }
        }
    }
}

function PopulatefiledsForSummary(datascr, blockName, flag) {

    var datascrname = "";
    if (datascr == "") {
        deleteAll('SUM_DTLS');
        var node = selectNodes(dom, "//RAD_SUMMARY/SUMMARY_DETAILS");
        for (var i = 0;i < node.length;i++) {
            node[i].parentNode.removeChild(node[i]);
        }
        var Optlen = document.getElementById("RSLT_DATASRC").options.length;
        for (var j = 0;j < Optlen;j++) {
            if (document.getElementById("RSLT_DATASRC").options[j].selected == true) {
                datascrname = document.getElementById("RSLT_DATASRC").options[j].text;
            }
        }
    }
    else {
        datascrname = datascr;
    }
    if (blockName == "") {
        blockName = document.getElementById("RSLT_DATABLK").value;
    }
    if (flag == "YES") {
        deleteAll('SUM_DTLS');
        var node = selectNodes(dom, "//RAD_SUMMARY/SUMMARY_DETAILS");
        for (var i = 0;i < node.length;i++) {
            node[i].parentNode.removeChild(node[i]);
        }
    }
    var blkFields = selectNodes(dom, "//RAD_DATA_BLOCKS[@ID='" + blockName + "']/RAD_BLK_FIELDS").length;
    document.getElementById('DATASRC_SUM_FIELDS_LIST').options.length = 0;
    for (var index = 0;index < blkFields;index++) {
        if (getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blockName + "']/RAD_BLK_FIELDS"))[index], "DBT")) == datascrname) {
            if (getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blockName + "']/RAD_BLK_FIELDS"))[index], "DBT")) != "") {
                var val = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blockName + "']/RAD_BLK_FIELDS"))[index], "FIELD_NAME"));
                addOption(document.getElementById('DATASRC_SUM_FIELDS_LIST'), val, val, false);
            }
        }
		if (getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blockName + "']/RAD_BLK_FIELDS"))[index], "ITEM_TYPE")) == "CONTROL") {
                 var val = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blockName + "']/RAD_BLK_FIELDS"))[index], "FIELD_NAME"));
                addOption(document.getElementById('DATASRC_SUM_FIELDS_LIST'), val, val, false);
        }
    }
    var sumFldLength = selectNodes(dom, "//RAD_SUMMARY/SUMMARY_DETAILS").length;
    for (var index = 0;index < sumFldLength;index++) {
        var value = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_SUMMARY/SUMMARY_DETAILS"))[index], "FIELD_NAME"));
        var optlength = document.getElementById('DATASRC_SUM_FIELDS_LIST').options.length;
        for (var i = 0;i < optlength;i++) {
            if (document.getElementById('DATASRC_SUM_FIELDS_LIST').options[i].text == value) {
                document.getElementById('DATASRC_SUM_FIELDS_LIST').removeChild(document.getElementById('DATASRC_SUM_FIELDS_LIST').options[i]);
                optlength--;
            }
        }
    }

}

function addOption(obj, text, value, selected) {
    if (obj != null) {
        obj.options[obj.options.length] = new Option(text, value, false, selected);
    }
}

function SetSubpartition() {

    var tbllen = document.getElementById("FieldsetFields").tBodies[0].rows.length;
    if (tbllen == "") {
        return;
    }
    else {
        if (document.getElementById('SCREEN_NAME11').options.value != "") {
            var selscrindex = document.getElementById('SCREEN_NAME11').options.selectedIndex;
            var scrVal = document.getElementById('SCREEN_NAME11').options[selscrindex].value;
        }
        else {
            scrVal = "";
        }
        if (document.getElementById('SCREEN_PORTION_FST').options.value !== "") {
            var scrprtypeindex = document.getElementById('SCREEN_PORTION_FST').options.selectedIndex;
            var scrprVal = document.getElementById('SCREEN_PORTION_FST').options[scrprtypeindex].value;
        }
        else {
            scrprVal = "";
        }
        if (document.getElementById('TAB_NAME11').options.value != "") {
            var tabIndex = document.getElementById('TAB_NAME11').options.selectedIndex;
            var tabVal = document.getElementById('TAB_NAME11').options[tabIndex].value;
        }
        else {
            tabVal = "";
        }
        if (document.getElementById('SECTION_NAME11').options.value != "") {
            var secIndex = document.getElementById('SECTION_NAME11').options.selectedIndex;
            var secVal = document.getElementById('SECTION_NAME11').options[secIndex].value;
        }
        else {
            secVal = "";
        }
        if (document.getElementById('PARTITION_NAME11').options.value != "") {
            var prtIndex = document.getElementById('PARTITION_NAME11').options.selectedIndex;
            var prtVal = document.getElementById('PARTITION_NAME11').options[prtIndex].value;
        }
        else {
            prtVal = "";
        }
        if (prtVal == "" || secVal == "" || tabVal == "" || scrprVal == "" || scrVal == "") {
            for (var i = 0;i < tbllen;i++) {
                document.getElementById('FieldsetFields').tBodies[0].rows[i].cells[2].getElementsByTagName('SELECT')[0].options.length = 0;
            }
            return false;
        }
        else {
            var subprtVal = "";
            if (selectNodes(dom, ("//RAD_SCREENS[@ID='" + scrVal + "']/" + scrprVal + "[@ID='" + scrprVal + "']" + "/RAD_TABS[@ID='" + tabVal + "']/RAD_SECTIONS[@ID='" + secVal + "']/RAD_PARTITIONS[PARTITION_NAME='" + prtVal + "']"))[0] != null) {
                subprtVal = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_SCREENS[@ID='" + scrVal + "']/" + scrprVal + "[@ID='" + scrprVal + "']" + "/RAD_TABS[@ID='" + tabVal + "']/RAD_SECTIONS[@ID='" + secVal + "']/RAD_PARTITIONS[PARTITION_NAME='" + prtVal + "']"))[0], "NO_OF_SUBPARTITIONS"));
                if (subprtVal == "") {
                    for (var i = 0;i < tbllen;i++) {
                        document.getElementById('FieldsetFields').tBodies[0].rows[i].cells[2].getElementsByTagName('SELECT')[0].options.length = 0;
                    }
                }
                else if (subprtVal == "3") {
                    var selectBoxsub = document.getElementById('FieldsetFields').tBodies[0].rows[tbllen - 1].cells[2].getElementsByTagName('SELECT')[0];
                    selectBoxsub.options.length = 0;
                    var optnsub = document.createElement("OPTION");
                    optnsub = document.createElement("OPTION");
                    optnsub.text = "1";
                    optnsub.value = "1";
                    selectBoxsub.options.add(optnsub);
                    optnsub = document.createElement("OPTION");
                    optnsub.text = "2";
                    optnsub.value = "2";
                    selectBoxsub.options.add(optnsub);
                    optnsub = document.createElement("OPTION");
                    optnsub.text = "3";
                    optnsub.value = "3";
                    selectBoxsub.options.add(optnsub);
                }
                else if (subprtVal == "4") {
                    var selectBoxsub = document.getElementById('FieldsetFields').tBodies[0].rows[tbllen - 1].cells[2].getElementsByTagName('SELECT')[0];
                    selectBoxsub.options.length = 0;
                    var optnsub = document.createElement("OPTION");
                    optnsub = document.createElement("OPTION");
                    optnsub.text = "1";
                    optnsub.value = "1";
                    selectBoxsub.options.add(optnsub);
                    optnsub = document.createElement("OPTION");
                    optnsub.text = "2";
                    optnsub.value = "2";
                    selectBoxsub.options.add(optnsub);
                    optnsub = document.createElement("OPTION");
                    optnsub.text = "3";
                    optnsub.value = "3";
                    selectBoxsub.options.add(optnsub);
                    optnsub = document.createElement("OPTION");
                    optnsub.text = "4";
                    optnsub.value = "4";
                    selectBoxsub.options.add(optnsub);

                }
                else if (subprtVal == "2") {
                    var selectBoxsub = document.getElementById('FieldsetFields').tBodies[0].rows[tbllen - 1].cells[2].getElementsByTagName('SELECT')[0];
                    selectBoxsub.options.length = 0;
                    var optnsub = document.createElement("OPTION");
                    optnsub = document.createElement("OPTION");
                    optnsub.text = "1";
                    optnsub.value = "1";
                    selectBoxsub.options.add(optnsub);
                    optnsub = document.createElement("OPTION");
                    optnsub.text = "2";
                    optnsub.value = "2";
                    selectBoxsub.options.add(optnsub);

                }
            }
            else {
                if (subprtVal == "") {
                    for (var i = 0;i < tbllen;i++) {
                        document.getElementById('FieldsetFields').tBodies[0].rows[i].cells[2].getElementsByTagName('SELECT')[0].options.length = 0;
                    }
                }
                document.getElementById('PARTITION_NAME11').length = 0;
                document.getElementById('PARTITION_NAME11').value = "";
            }
        }
    }

}

function fn_attach_fieldset_name(val, Preobjec) {

    var path = Preobjec;
    var fldset = new Array();
    fldset = val.split("~");
    var fldsetName = fldset[1];
    var blklen = selectNodes(dom, "//RAD_DATA_BLOCKS").length;
    for (var i = 0;i < blklen;i++) {
        var datablk = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS"))[i], "BLOCK_NAME"));
        var blkflds = selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + datablk + "']/RAD_BLK_FIELDS"));
        var blkfldslen = blkflds.length;
        for (var j = 0;j < blkfldslen;j++) {
            if (getNodeText(selectSingleNode(blkflds[j], "FIELDSET_NAME")) == fldsetName) {
                setNodeText(selectSingleNode(blkflds[j], "FIELDSET_NAME"), "");
            }
        }
    }
    if ((path != 0) && (getNodeText(selectSingleNode(dom, "//RAD_FIELDSETS[FIELDSET_NAME='" + fldsetName + "']/FIELDSET_VISIBLE")) == 'Y')) {
        var blkname = document.getElementById('DATABLOCK_NAME').value;
        var tabref = document.getElementById('FDN').getElementsByTagName("TABLE");
        for (var tableIndex = 0;tableIndex < tabref.length;tableIndex++) {

            if (tabref[tableIndex].getAttribute("TYPE") == "MULTIPLE") {

                var rowlen = tabref[tableIndex].tBodies[0].rows.length;

                //var rowlen=document.forms["FieldsetFields"].tBodies[0].rows.length;
                var arrfbox = new Array;
                var flength = 0;
                for (var j = 0;j < rowlen;j++) {

                    //arrfbox[flength]=document.getElementById('FieldsetFields').tBodies[0].rows[j].cells[1].getElementsByTagName("INPUT")[0].value;
                    var tableObj = tabref[tableIndex].tBodies[0].rows[j].cells[1];
                    arrfbox[flength] = tableObj.getElementsByTagName('INPUT')[0].value;
                    var blkflds1 = selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkname + "']/RAD_BLK_FIELDS[@ID='" + arrfbox[flength] + "']"));
                    flength++;
                    if (blkflds1[0] != null) {
                        if (tabref[tableIndex].tBodies[0].rows[j].cells[5].getElementsByTagName('INPUT')[0].value == 'Y') {
                            setNodeText(selectSingleNode(blkflds1[0], "FIELDSET_NAME"), fldset[1]);
                        }
                    }
                }

            }

        }

    }
}

function fn_populate_objects(node, frmname, fld) {

    var obj = "";
    var nodevalue = "";
    if (fld == "PARENT_DATASRC_DSN") {
        obj = document.getElementById('PARENT_DATASRC_DSN');
        nodevalue = "DATASRC_NAME";
    }
    else if (fld == "BLOCK_PARENT_BLK") {
        obj = document.getElementById('BLOCK_PARENT_BLK');
        nodevalue = "BLOCK_NAME";
    }
    var blks = selectNodes(dom, ("//" + node + ""));
    var blkslen = blks.length;
    if (obj.options) {
        obj.options.length = 0;
        addOption(obj, "", "", true);
        for (var i = 0;i < blkslen;i++) {
            addOption(obj, getNodeText(selectSingleNode(blks[i], nodevalue)), getNodeText(selectSingleNode(blks[i], nodevalue)), false);
        }
    }
}

function fn_add_flds(blkname, frmname, fld) {
    var blks = selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkname + "']/RAD_BLK_FIELDS"));
    var blkslen = blks.length;
    document.getElementById(fld).options.length = 0;
    addOption(document.getElementById(fld), "", "", true);
    if (fld == "PARENT_FIELD") {
        var objPrnt = document.getElementById('PARENT_FIELD');
        for (var i = 0;i < blkslen;i++) {
            if (getNodeText(selectSingleNode(blks[i], "DBC")) != "" && getNodeText(selectSingleNode(blks[i], "ITEM_TYPE")) == "DBITEM") {
                addOption(objPrnt, getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), false);
            }
        }
    }
    else {
        var objRelFld = document.getElementById('RELATED_FIELD');
        for (var i = 0;i < blkslen;i++) {
            if (getNodeText(selectSingleNode(blks[i], "FIELD_NAME")) != blkname) {
                addOption(objRelFld, getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), false);
            }
        }
    }
}

function fn_populate_Blocks_toCallfrmFlds(node, tablename, frmname, fld, cellno) {
    if (node == "RAD_DATA_BLOCKS") {
        var nodename = "BLOCK_NAME";
    }
    else if (node == "RAD_SCREENS" || node == "RAD_SCREENS[MAIN_SCREEN='Y']") {
        var nodename = "SCREEN_NAME";
    }
    var obj = "";
    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;
    if (tablen != 0) {
        obj = tab.rows[tablen - 1].cells[cellno].getElementsByTagName('SELECT')[0];
        obj.options.length = 0
        var blks = selectNodes(dom, ("//" + node + ""));
        var blkslen = blks.length;
        addOption(obj, "", "", true);
        for (var i = 0;i < blkslen;i++) {
            addOption(obj, getNodeText(selectSingleNode(blks[i], nodename)), getNodeText(selectSingleNode(blks[i], nodename)), false);
        }

    }

}

function fnAppndRelFlag(tablename) {
    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;
    if (tablename == 'CALFRMS') {
        tab.rows[tablen - 1].cells[9].getElementsByTagName('INPUT')[0].value = parent.relType;
        tab.rows[tablen - 1].cells[10].getElementsByTagName('INPUT')[0].value = parent.relName;
    }
    if (tablename == 'lfmform') {
        tab.rows[tablen - 1].cells[3].getElementsByTagName('INPUT')[0].value = parent.relType;
        tab.rows[tablen - 1].cells[4].getElementsByTagName('INPUT')[0].value = parent.relName;
    }
    if (tablename == 'ScrArgnts') {
        tab.rows[tablen - 1].cells[8].getElementsByTagName('INPUT')[0].value = parent.relType;
        tab.rows[tablen - 1].cells[9].getElementsByTagName('INPUT')[0].value = parent.relName;
    }
    if (tablename == 'partition') {
        tab.rows[tablen - 1].cells[5].getElementsByTagName('INPUT')[0].value = parent.relType;
        tab.rows[tablen - 1].cells[6].getElementsByTagName('INPUT')[0].value = parent.relName;
    }
    if (tablename == 'FieldsetFields') {
        tab.rows[tablen - 1].cells[3].getElementsByTagName('INPUT')[0].value = parent.relType;
        tab.rows[tablen - 1].cells[4].getElementsByTagName('INPUT')[0].value = parent.relName;
    }
    if (tablename == 'attributes') {
        tab.rows[tablen - 1].cells[6].getElementsByTagName('INPUT')[0].value = parent.relType;
        tab.rows[tablen - 1].cells[7].getElementsByTagName('INPUT')[0].value = parent.relName;
    }
}

function fn_populate_DataScr_toCallfrmFlds(tablename, frmcell, tocell, event) {

    var rowNum = getRowIndex(event);
    var tab = document.getElementById(tablename).tBodies[0];
    var blkname = tab.rows[rowNum - 1].cells[frmcell].getElementsByTagName('SELECT')[0].value;
    var dsfld = tab.rows[rowNum - 1].cells[tocell].getElementsByTagName('SELECT')[0];
    dsfld.options.length = 0;
    addOption(dsfld, "", "", true);
    var dsnodes = selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkname + "']/BLK_DATASOURCES"));
    for (i = 0;i < dsnodes.length;i++) {
        addOption(dsfld, getNodeText(selectSingleNode(dsnodes[i], 'DATASOURCE_NAME')), getNodeText(selectSingleNode(dsnodes[i], 'DATASOURCE_NAME')), false);
    }
}

function BlkFldItemValidation(xpath) {

    var obj = document.getElementById("ITEM_TYPE_BLKF");
    obj.options.length = 0;
    var valNode = selectNodes(dom, xpath)[0];
    if (getNodeText(selectSingleNode(valNode, 'DBC')) != "" && getNodeText(selectSingleNode(valNode, 'ITEM_TYPE')) == "DBITEM") {
        var optn = document.createElement("OPTION");
        optn.text = "Database Item";
        optn.value = "DBITEM";
        obj.options.add(optn);
    }
    else {
        var optn = document.createElement("OPTION");
        optn.text = "Control";
        optn.value = "CONTROL";
        obj.options.add(optn);
        optn = document.createElement("OPTION");
        optn.text = "Desc";
        optn.value = "DESC";
        obj.options.add(optn);
    }
}

function fn_Populate_BlkFields_toRetunflds(tableName, blkcelno, fldcelno, event) {
    var rowNum = getRowIndex(event);
    var tablerows = document.getElementById(tableName).tBodies[0].rows.length;
    var blkName = document.getElementById(tableName).tBodies[0].rows[rowNum - 1].cells[blkcelno].getElementsByTagName("SELECT")[0].value;
    var blks = selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS"));
    var blkslen = blks.length;

    obj = document.getElementById(tableName).tBodies[0].rows[rowNum - 1].cells[fldcelno].getElementsByTagName("SELECT")[0];
    obj.options.length = 0;
    addOption(obj, "", "", true);
    for (var i = 0;i < blkslen;i++) {
        addOption(obj, getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), false);
    }

}

function fn_Populate_BlkFields_toBindVrbls(tableName, event) {

    var rowNum = getRowIndex(event);
    var tablerows = document.getElementById(tableName).tBodies[0].rows.length;
    var blkName = document.getElementById(tableName).tBodies[0].rows[rowNum - 1].cells[1].getElementsByTagName("SELECT")[0].value;

    var blks = selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS"));
    var blkslen = blks.length;
    obj = document.getElementById(tableName).tBodies[0].rows[rowNum - 1].cells[2].getElementsByTagName("SELECT")[0];
    obj.options.length = 0;
    addOption(obj, "", "", true);
    for (var i = 0;i < blkslen;i++) {
        addOption(obj, getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), false);
    }

}

function fn_populate_Blocks_toBlkLovFlds(node, tablename, frmname, fld, cellno, event) {

    var obj = "";
    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;
    if (tablen != 0) {
        for (var j = 0;j < tablen;j++) {
            obj = tab.rows[j].cells[cellno].getElementsByTagName('SELECT')[0];
            obj.options.length = 0
            var blks = selectNodes(dom, ("//" + node + ""));
            var blkslen = blks.length;
            addOption(obj, "", "", true);
            for (var i = 0;i < blkslen;i++) {
                addOption(obj, getNodeText(selectSingleNode(blks[i], "BLOCK_NAME")), getNodeText(selectSingleNode(blks[i], "BLOCK_NAME")), false);
            }
        }

    }
}

function fn_populate_Blocks(frmName) {

    var objleratedBlk = "";

    if (frmName == "BFD") {
        objleratedBlk = document.getElementById('RELATED_BLOCK');
    }

    var blks = selectNodes(dom, ("//RAD_DATA_BLOCKS"));

    objleratedBlk.options.length = 0;

    addOption(objleratedBlk, "", "", true);

    for (var i = 0;i < blks.length;i++) {
        addOption(objleratedBlk, getNodeText(selectSingleNode(blks[i], "BLOCK_NAME")), getNodeText(selectSingleNode(blks[i], "BLOCK_NAME")), false);

    }
}

function fn_populate_BlockFields(blkName, fldName) {

    var objleratedBlk = "";
    var obj = "";

    if (blkName != "") {

        var blks = selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS"));
        objleratedBlk = document.getElementById('RELATED_FIELD');

        objleratedBlk.options.length = 0;

        addOption(objleratedBlk, "", "", true);

        for (var i = 0;i < blks.length;i++) {
            addOption(objleratedBlk, getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), false);
        }

    }
    else {

        if (fldName == "RELATED_FIELD") {
            blkName = document.getElementById('RELATED_BLOCK').value;
            obj = document.getElementById('RELATED_FIELD');
        }
        var blks = selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS"));
        obj.options.length = 0;
        addOption(obj, "", "", true);

        for (var i = 0;i < blks.length;i++) {
            addOption(obj, getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), false);
        }
    }
}

function getTabsToCallforms(tablename, cellno) {
    var obj = "";
    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;
    if (tablen != 0) {
        obj = tab.rows[tablen - 1].cells[cellno].getElementsByTagName('SELECT')[0];
        obj.options.length = 0
        addOption(obj, "Button", "BUTTON", true);
        var scrns = selectNodes(dom, ("//RAD_SCREENS[SCREEN_VISIBLE='Y']"));
        for (var i = 0;i < scrns.length;i++) {
            var scrName = getNodeText(selectSingleNode(scrns[i], "SCREEN_NAME"));
            if (getNodeText(selectSingleNode(scrns[i], "MAIN_SCREEN")) == "Y") {
                var tabs = selectNodes(scrns[i], ("//RAD_SCREENS[SCREEN_NAME='" + scrName + "']/BODY[@ID='BODY']/RAD_TABS[TAB_VISIBLE='Y']"));
                for (var j = 0;j < tabs.length;j++) {
                    tabName = getNodeText(selectSingleNode(tabs[j], "TAB_NAME"));
                    addOption(obj, tabName, tabName, false);
                }
                break;
            }
        }
    }
}

function validPartitions() {
    var screensize = getNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + clickedobjects[1] + "']"), "SCREEN_SIZE"));

    var objTable = document.getElementById("partition");
    var trows = objTable.tBodies[0].rows;
    if (trows.length == "1") {
        var selectBox = trows[0].cells[3].getElementsByTagName("SELECT")[0];
        var selectBoxsub = trows[0].cells[4].getElementsByTagName("SELECT")[0];
        for (var slen = selectBoxsub.options.length;slen >= 0;slen--) {
            selectBoxsub.remove(slen);
        }
        trows[0].cells[1].getElementsByTagName("INPUT")[0].value = 1;
        for (var i = selectBox.length - 1;i >= 0;i--) {
            selectBox.remove(i);
        }
        var optn = document.createElement("OPTION");
        optn.text = "100";
        optn.value = "100";
        selectBox.options.add(optn);
        selectBox.selectedIndex = 0;
        trows[0].cells[4].getElementsByTagName("SELECT")[0].options.text = "3";
        trows[0].cells[4].getElementsByTagName("SELECT")[0].options.value = "3";
        trows[0].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
        var optnsub = document.createElement("OPTION");
        optnsub.text = "";
        optnsub.value = "";
        selectBoxsub.options.add(optnsub);
        optnsub = document.createElement("OPTION");
        optnsub.text = "2";
        optnsub.value = "2";
        selectBoxsub.options.add(optnsub);
        optnsub = document.createElement("OPTION");
        if (document.getElementById("SCREEN_PORTION_SEC").value == "FOOTER" || screensize == "LARGE") {
            optnsub.text = "3";
            optnsub.value = "3";
            selectBoxsub.options.add(optnsub);
        }
        optnsub = document.createElement("OPTION");
        if (document.getElementById("SCREEN_PORTION_SEC").value == "FOOTER") {
            optnsub.text = "4";
            optnsub.value = "4";
            selectBoxsub.options.add(optnsub);
        }

    }
    else if (trows.length == "2") {
        if (document.getElementById("SCREEN_PORTION_SEC").value == "FOOTER") {
            for (var rowCnt = 0;rowCnt < trows.length;rowCnt++) {

                var selectBox = trows[rowCnt].cells[3].getElementsByTagName("SELECT")[0];
                var selectBoxsub = trows[rowCnt].cells[4].getElementsByTagName("SELECT")[0];
                trows[rowCnt].cells[1].getElementsByTagName("INPUT")[0].value = rowCnt + 1;
                for (var slen = selectBoxsub.options.length;slen >= 0;slen--) {
                    selectBoxsub.remove(slen);
                }
                for (var i = selectBox.options.length - 1;i >= 0;i--) {
                    selectBox.remove(i);
                }
                optn = document.createElement("OPTION");
                optn.text = "50";
                optn.value = "50";
                selectBox.options.add(optn);
                if (screensize == "LARGE" || document.getElementById("SCREEN_PORTION_SEC").value == "FOOTER") {
                    var optn = document.createElement("OPTION");
                    optn.text = "25";
                    optn.value = "25";
                    selectBox.options.add(optn);
                    optn = document.createElement("OPTION");
                    optn.text = "33";
                    optn.value = "33";
                    selectBox.options.add(optn);

                    optn = document.createElement("OPTION");
                    optn.text = "66";
                    optn.value = "66";
                    selectBox.options.add(optn);
                    optn = document.createElement("OPTION");
                    optn.text = "75";
                    optn.value = "75";
                    selectBox.options.add(optn);

                }
                selectBox.selectedIndex = 0;
                var optnsub = document.createElement("OPTION");
                optnsub.text = "";
                optnsub.value = "";
                selectBoxsub.options.add(optnsub);
                optnsub = document.createElement("OPTION");
                optnsub.text = "2";
                optnsub.value = "2";
                selectBoxsub.options.add(optnsub);
                optnsub = document.createElement("OPTION");
                optnsub.text = "3";
                optnsub.value = "3";
                selectBoxsub.options.add(optnsub);
            }
        }
        else {
            for (var rowCnt = 0;rowCnt < trows.length;rowCnt++) {
                var selectBox = trows[rowCnt].cells[3].getElementsByTagName("SELECT")[0];
                var selectBoxsub = trows[rowCnt].cells[4].getElementsByTagName("SELECT")[0];
                trows[rowCnt].cells[1].getElementsByTagName("INPUT")[0].value = rowCnt + 1;
                for (var slen = selectBoxsub.options.length;slen >= 0;slen--) {
                    selectBoxsub.remove(slen);
                }
                for (var i = selectBox.options.length - 1;i >= 0;i--) {
                    selectBox.remove(i);
                }
                optn = document.createElement("OPTION");
                optn.text = "50";
                optn.value = "50";
                selectBox.options.add(optn);
                if (screensize == "LARGE" || screensize == "MEDIUM") {
                    var optn = document.createElement("OPTION");
                    optn.text = "33";
                    optn.value = "33";
                    selectBox.options.add(optn);

                    optn = document.createElement("OPTION");
                    optn.text = "66";
                    optn.value = "66";
                    selectBox.options.add(optn);

                }
                selectBox.selectedIndex = 0;
                trows[rowCnt].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                var optnsub = document.createElement("OPTION");
                optnsub.text = "";
                optnsub.value = "";
                selectBoxsub.options.add(optnsub);
                if (screensize == "LARGE") {
                    for (var slen = selectBoxsub.options.length;slen >= 0;slen--) {
                        selectBoxsub.remove(slen);
                    }
                    if (trows[rowCnt].cells[3].getElementsByTagName("SELECT")[0].value != "33") {
                        trows[rowCnt].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
                        var optnsub = document.createElement("OPTION");
                        optnsub.text = "";
                        optnsub.value = "";
                        selectBoxsub.options.add(optnsub);
                        optnsub = document.createElement("OPTION");
                        optnsub.text = "2";
                        optnsub.value = "2";
                        selectBoxsub.options.add(optnsub);
                    }
                }
            }
        }
    }
    else if (trows.length == 3) {
        if (document.getElementById("SCREEN_PORTION_SEC").value == "FOOTER") {
            for (var rowCnt = 0;rowCnt < trows.length;rowCnt++) {
                var selectBox = trows[rowCnt].cells[3].getElementsByTagName("SELECT")[0];
                var selectBoxsub = trows[rowCnt].cells[4].getElementsByTagName("SELECT")[0];
                for (var slen = selectBoxsub.options.length;slen >= 0;slen--) {
                    selectBoxsub.remove(slen);
                }
                trows[rowCnt].cells[1].getElementsByTagName("INPUT")[0].value = rowCnt + 1;
                for (var i = selectBox.options.length - 1;i >= 0;i--) {
                    selectBox.remove(i);
                }
                var optn = document.createElement("OPTION");
                optn.text = "25";
                optn.value = "25";
                selectBox.options.add(optn);
                optn = document.createElement("OPTION");
                optn.text = "50";
                optn.value = "50";
                selectBox.options.add(optn);
                trows[0].cells[3].getElementsByTagName("SELECT")[0].value = "50";
                trows[0].cells[4].getElementsByTagName("SELECT")[0].disabled = false;
                trows[1].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                trows[2].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                var optnsub = document.createElement("OPTION");
                optnsub.text = "";
                optnsub.value = "";
                selectBoxsub.options.add(optnsub);
                optnsub = document.createElement("OPTION");
                optnsub.text = "2";
                optnsub.value = "2";
                selectBoxsub.options.add(optnsub);
            }
        }
        else {
            for (var rowCnt = 0;rowCnt < trows.length;rowCnt++) {
                var selectBox = trows[rowCnt].cells[3].getElementsByTagName("SELECT")[0];
                var selectBoxsub = trows[rowCnt].cells[4].getElementsByTagName("SELECT")[0];
                for (var slen = selectBoxsub.options.length;slen >= 0;slen--) {
                    selectBoxsub.remove(slen);
                }
                trows[rowCnt].cells[1].getElementsByTagName("INPUT")[0].value = rowCnt + 1;
                for (var i = selectBox.options.length - 1;i >= 0;i--) {
                    selectBox.remove(i);
                }
                var optn = document.createElement("OPTION");
                optn.text = "33";
                optn.value = "33";
                selectBox.options.add(optn);

                trows[rowCnt].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
                var optnsub = document.createElement("OPTION");
                optnsub.text = "";
                optnsub.value = "";
                selectBoxsub.options.add(optnsub);

            }
        }
    }
    else if (trows.length == 4) {
        for (var rowCnt = 0;rowCnt < trows.length;rowCnt++) {
            var selectBox = trows[rowCnt].cells[3].getElementsByTagName("SELECT")[0];
            var selectBoxsub = trows[rowCnt].cells[4].getElementsByTagName("SELECT")[0];
            for (var slen = selectBoxsub.options.length;slen >= 0;slen--) {
                selectBoxsub.remove(slen);
            }
            trows[rowCnt].cells[1].getElementsByTagName("INPUT")[0].value = rowCnt + 1;
            for (var i = selectBox.options.length - 1;i >= 0;i--) {
                selectBox.remove(i);
            }
            var optn = document.createElement("OPTION");
            optn.text = "25";
            optn.value = "25";
            selectBox.options.add(optn);

            trows[rowCnt].cells[4].getElementsByTagName("SELECT")[0].disabled = true;

        }
        var optnsub = document.createElement("OPTION");
        optnsub.text = "";
        optnsub.value = "";
        selectBoxsub.options.add(optnsub);
    }
	 if (document.getElementById('MULTIPLE_SECTION').checked == true) {	 
	//prasanth
	 for (var rowCnt = 0;rowCnt < trows.length;rowCnt++) {
	 var selectBox = trows[rowCnt].cells[3].getElementsByTagName("SELECT")[0];
	 for (var i = selectBox.options.length - 1;i >= 0;i--) {
                selectBox.remove(i);
            }
			for(var fl=1;fl<=100;fl++){
		   var optn = document.createElement("OPTION");
            optn.text = fl;
            optn.value = fl;
            selectBox.options.add(optn);
		}
		if(trows.length==1)
		selectBox.selectedIndex = 99;
		else if(trows.length==2)
		selectBox.selectedIndex = 49;
		else if(trows.length==3){
		trows[0].cells[3].getElementsByTagName("SELECT")[0].selectedIndex = 49;
		trows[1].cells[3].getElementsByTagName("SELECT")[0].selectedIndex = 24;
		trows[2].cells[3].getElementsByTagName("SELECT")[0].selectedIndex = 24;
		}
		else if(trows.length==4){
		trows[0].cells[3].getElementsByTagName("SELECT")[0].selectedIndex = 24;
		trows[1].cells[3].getElementsByTagName("SELECT")[0].selectedIndex = 24;
		trows[2].cells[3].getElementsByTagName("SELECT")[0].selectedIndex = 24;
		trows[3].cells[3].getElementsByTagName("SELECT")[0].selectedIndex = 24;
		}
		else if(trows.length==5){
		trows[0].cells[3].getElementsByTagName("SELECT")[0].selectedIndex = 19;
		trows[1].cells[3].getElementsByTagName("SELECT")[0].selectedIndex = 19;
		trows[2].cells[3].getElementsByTagName("SELECT")[0].selectedIndex = 19;
		trows[3].cells[3].getElementsByTagName("SELECT")[0].selectedIndex = 19;
		trows[4].cells[3].getElementsByTagName("SELECT")[0].selectedIndex = 19;
		}
	 trows[rowCnt].cells[1].getElementsByTagName("INPUT")[0].value = rowCnt + 1;
	 trows[rowCnt].cells[4].getElementsByTagName("SELECT")[0].disabled = true;
	 }
  }
}

function fnValidateSummaryQueryFlds() {

    var count = 0;

    var tableObject = document.getElementById("SUM_DTLS");

    var tablerows = tableObject.tBodies[0].rows;
    for (var index = 0;index < tablerows.length;index++) {

        if (tableObject.tBodies[0].rows[index].cells[2].getElementsByTagName("INPUT")[0].checked == true) {
            count++;
        }
    }

   /* if (count > 14 && document.getElementById("FOOTER_TEMPLATE").value == "MAINTAUDIT") {
        alertMessage("Query Fileds Can't Be More Than 14", "E");
        return false;
    }*/

}

function fnSetMaxLength(dtscrname, colname) {
    //var dtscrname=window.parent.frames['Tree'].clickedobjects[1];
    var maxlen = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATASOURCES[@ID='" + dtscrname + "']/RAD_FIELDS[@ID='" + colname + "']"))[0], ("MAX_LENGTH")));
    //var colname=document.getElementById("frmFLD").COLUMN_NAME.value;
    if (selectNodes(dom, ("//RAD_DATASOURCES[@ID='" + dtscrname + "']/RAD_FIELDS[@ID='" + colname + "']"))[0] != null) {
        var blkName = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATASOURCES[@ID='" + dtscrname + "']/RAD_FIELDS[@ID='" + colname + "']"))[0], ("BLOCK_NAME")));
    }
    else {
        blkName = "";
    }
    if (blkName != "") {
        setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[DBC='" + colname + "'][DBT='" + dtscrname + "']"))[0], ('MAX_LENGTH')), maxlen);
    }
}

function fnShowProperty(obj, event) {

    var fieldname = "";
    var blkName = "";
    if (obj == "FLD") {
        var inde = getRowIndex(event);
        var tableobject = document.getElementById('FieldsetFields');
        fieldname = tableobject.tBodies[0].rows[inde - 1].cells[1].getElementsByTagName('INPUT')[0].value;
        blkName = document.getElementById("DATABLOCK_NAME").value;

    }
    else {
        var Optlen = document.getElementById('DATABLK1_FIELDS_LIST').options.length;
        var selectedValue = "";
        for (var j = 0;j < Optlen;j++) {
            if (document.getElementById("DATABLK1_FIELDS_LIST").options[j].selected == true) {
                selectedValue = document.getElementById("DATABLK1_FIELDS_LIST").options[j].value;
            }
        }
        var vls = new Array();
        vls = selectedValue.split(".");
        var blkName = vls[0];
        var fieldname = vls[1];
    }

    document.getElementById("ULBLK").style.display = "block";
    document.getElementById("ULBLK" + "~" + blkName).style.display = "block";
    getNodeDetails("BLK" + "~" + blkName + "~" + fieldname);

}

function fnDisableBlockElements() {
    if (document.getElementById('FUNCTION_TYPE').value == "S") {

        var blkfldElmntsToDsbl = "MAX_LENGTH~REQUIRED~DISPLAY_TYPE~RELATED_BLOCK~RELATED_FIELD~PARENT_FIELD~LOV_NAME~GLOBAL_LOV_NAME~OFF_LINE_LOV_NAME~GLOBAL_OFF_LINE_LOV_NAME~XSD_TAG~DBT~DBC~FIELDSET_NAME~SUBSYSTEM_DEPENDANT~MIN_VAL~MAX_VAL~MAX_DECIMAL~CHECKED~TXTAREA_ROWS~ITEM_TYPE~TXTAREA_COLS~AMENDABLE_IN~RELEASE_TYPE~RELEASE_NAME~LOV_VAL_REQ~MASK_ID~REPORT_PARAMETER~BTN_MSK_ID~BTN_BV_LOV~BTN_DL_CST~BTN_AD_CST~BTN_AD_EVNT~BTN_DL_EVNT~BTN_RT_LOV~BTN_OF_BV_LOV~BTN_OF_RT_LOV~events~attributes~blkDsns~BLOCK_NAME~BLOCK_TITLE~BLOCK_PARENT_BLK~RELATION_TYPE_DSR~XSD_NODE~BLOCK_TYPE~MULTI_RECORD~MASTER_BLOCK~BLK_PK_FLD~BLK_MULTI_RECORD";

        blkfldElmntsToDsbl = blkfldElmntsToDsbl.split("~");
        for (var fln = 0;fln < blkfldElmntsToDsbl.length;fln++) {
            if (document.getElementById(blkfldElmntsToDsbl[fln])) {
                document.getElementById(blkfldElmntsToDsbl[fln]).disabled = true;
            }
        }
        if (document.getElementById("ITEM_TYPE_BLKF").value == "CONTROL") {
            document.getElementById("DISPLAY_TYPE_BLKF").disabled = false;
            document.getElementById("events").disabled = false;
            document.getElementById("attributes").disabled = false;
            document.getElementById("BTN_AD_EVNT").disabled = false;
            document.getElementById("BTN_DL_EVNT").disabled = false;
            document.getElementById("BTN_AD_CST").disabled = false;
            document.getElementById("BTN_DL_CST").disabled = false;

            var tab = document.getElementById("events").tBodies[0];
            var tablen = tab.rows.length;
            var obj = "";

            for (i = 0;i < tablen;i++) {
                var result = tab.rows[i].cells[3].getElementsByTagName("SELECT")[0].value;
                if (result != "CALLFORM" && result != "LAUNCH") {
                    tab.rows[i].cells[5].getElementsByTagName("SELECT")[0].disabled = true;
                    tab.rows[i].cells[5].getElementsByTagName("SELECT")[0].value = "";
                    obj = tab.rows[i].cells[3].getElementsByTagName("SELECT")[0];
                    obj.options.length = 0;
                    addOption(obj, "", "", true);
                    addOption(obj, "Normal", "NORMAL", false);
                    addOption(obj, "Subscreen", "SUBSCREEN", false);
                    addOption(obj, "Subfunction", "SUBFUNCTION", false);
                    tab.rows[i].cells[3].getElementsByTagName("SELECT")[0].value = result;
                }
                else if (result == "CALLFORM") {
                    var res = tab.rows[i].cells[5].getElementsByTagName("SELECT")[0].value;
                    obj = tab.rows[i].cells[3].getElementsByTagName("SELECT")[0];
                    obj.options.length = 0;
                    addOption(obj, "", "", true);
                    addOption(obj, "Normal", "NORMAL", false);
                    addOption(obj, "Callform", "CALLFORM", false);
                    addOption(obj, "Subscreen", "SUBSCREEN", false);
                    addOption(obj, "Subfunction", "SUBFUNCTION", false);
                    tab.rows[i].cells[3].getElementsByTagName("SELECT")[0].value = result;

                }
                else if (result == "LAUNCH") {
                    var res = tab.rows[i].cells[5].getElementsByTagName("SELECT")[0].value;
                    obj = tab.rows[i].cells[3].getElementsByTagName("SELECT")[0];
                    obj.options.length = 0;
                    addOption(obj, "", "", true);
                    addOption(obj, "Normal", "NORMAL", false);
                    addOption(obj, "Launch", "LAUNCH", false);
                    addOption(obj, "Subscreen", "SUBSCREEN", false);
                    addOption(obj, "Subfunction", "SUBFUNCTION", false);
                    tab.rows[i].cells[3].getElementsByTagName("SELECT")[0].value = result;
                }

            }

        }

        if (document.getElementById("BLOCK_TYPE").value == "CONTROL") {

            var blkfldElmntsToENBL = "BTN_DL_CST~BTN_AD_CST~BTN_DL_EVNT~BTN_AD_EVNT~attributes~events~DISPLAY_TYPE_BLKF~BLOCK_NAME~BLOCK_TITLE~BLOCK_PARENT_BLK~RELATION_TYPE~XSD_NODE~BLK_PK_FLD~BLK_MULTI_RECORD";
            blkfldElmntsToENBL = blkfldElmntsToENBL.split("~");
            for (var fln = 0;fln < blkfldElmntsToENBL.length;fln++) {
                if (document.getElementById(blkfldElmntsToENBL[fln])) {
                    document.getElementById(blkfldElmntsToENBL[fln]).disabled = false;
                }
            }

        }

    }
}

function fnBasicValidations(dom) {
    if (document.getElementsByName("FUNCTION_CATEGORY")[0].value == "MAINTENANCE") {
        if (document.getElementsByName("FOOTER_TEMPLATE")[0].value == "NONE" || document.getElementsByName("FOOTER_TEMPLATE")[0].value == "MAINTAUDIT") {
            return true;
        }
        else {
            alertMessage("Footer Template must be None or Maint Audit", "E");
            return false;
        }
    }
    else if (document.getElementsByName("FUNCTION_CATEGORY")[0].value == "TRANSACTION" || document.getElementsByName("FUNCTION_CATEGORY")[0].value == "REPORT") {
        if (document.getElementsByName("FOOTER_TEMPLATE")[0].value != "NONE") {
            alertMessage("Footer Template must be None For Transactions", "E");
            return false;
        }
    }
}

function fn_Chekc_RadXml(NewDOM) {
    if (parent.relType == "KERNEL") {
        if (selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_CLUSTER") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_CUSTOM") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_CUSTOMER") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_CHILD_CLUSTER") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_CHILD_CUSTOM") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_CHILD_CUSTOMER") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_SCRCHLD_CLUSTER") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_SCRCHLD_CUSTOM") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_SCRCHLD_CUSTOMER") != null) {
            alertMessage("Radxml Had Been Modified in Other Release", "I");
            reloadForm();
            return false;

        }
    }
    else if (parent.relType == "CLUSTER") {
        if (selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_CUSTOM") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_CUSTOMER") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_CHILD_CUSTOM") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_CHILD_CUSTOMER") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_SCRCHLD_CUSTOM") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_SCRCHLD_CUSTOMER") != null) {
            alertMessage("Radxml Had Been Modified in Other Release", "I");
            reloadForm();
            return false;

        }
    }
    else if (parent.relType == "CUSTOM") {
        if (selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_CUSTOMER") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_CHILD_CUSTOMER") != null || selectSingleNode(NewDOM, "//RAD_FUNCTIONS/RAD_SCRCHLD_CUSTOMER") != null) {
            alertMessage("Radxml Had Been Modified in Other Release", "I");
            reloadForm();
            return false;

        }
    }
}

function fnScreenVisibleVals(scr, visible) {
    if (visible == 'N') {
        var fldsets = selectNodes(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_SCREEN='" + scr + "']");
        for (i = 0;i < fldsets.length;i++) {
            var fld = getNodeText(selectSingleNode(fldsets[i], ("FIELDSET_NAME")));
            setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fld + "']/FIELDSET_VISIBLE"), visible);
            fn_attach_fieldset_name(fld + "~" + fld, "");

        }
        var tabshead = selectNodes(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/HEADER/RAD_TABS");
        var tabsbody = selectNodes(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/BODY/RAD_TABS");
        var tabsfooter = selectNodes(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/FOOTER/RAD_TABS");
        for (i = 0;i < tabshead.length;i++) {
            tabname = getNodeText(selectSingleNode(tabshead[i], ("TAB_NAME")));
            setNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/HEADER/RAD_TABS[TAB_NAME='" + tabname + "']/TAB_VISIBLE"), visible);
            var sections = selectNodes(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/HEADER/RAD_TABS[TAB_NAME='" + tabname + "']/RAD_SECTIONS");
            for (j = 0;j < sections.length;j++) {
                var sectname = getNodeText(selectSingleNode(sections[j], ("SECTION_NAME")));
                setNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/HEADER/RAD_TABS[TAB_NAME='" + tabname + "']/RAD_SECTIONS[SECTION_NAME='" + sectname + "']/SEC_VISIBLE"), visible);
            }
        }
        for (i = 0;i < tabsbody.length;i++) {
            tabname = getNodeText(selectSingleNode(tabsbody[i], ("TAB_NAME")));
            setNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/BODY/RAD_TABS[TAB_NAME='" + tabname + "']/TAB_VISIBLE"), visible);
            var tabname = getNodeText(selectSingleNode(tabsbody[i], ("TAB_NAME")));
            var sections = selectNodes(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/BODY/RAD_TABS[TAB_NAME='" + tabname + "']/RAD_SECTIONS");
            for (j = 0;j < sections.length;j++) {
                var sectname = getNodeText(selectSingleNode(sections[j], ("SECTION_NAME")));
                setNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/BODY/RAD_TABS[TAB_NAME='" + tabname + "']/RAD_SECTIONS[SECTION_NAME='" + sectname + "']/SEC_VISIBLE"), visible);
            }
        }
        for (i = 0;i < tabsfooter.length;i++) {
            tabname = getNodeText(selectSingleNode(tabsfooter[i], ("TAB_NAME")));
            setNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/FOOTER/RAD_TABS[TAB_NAME='" + tabname + "']/TAB_VISIBLE"), visible);
            var tabname = getNodeText(selectSingleNode(tabsfooter[i], ("TAB_NAME")));
            var sections = selectNodes(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/FOOTER/RAD_TABS[TAB_NAME='" + tabname + "']/RAD_SECTIONS");
            for (j = 0;j < sections.length;j++) {
                var sectname = getNodeText(selectSingleNode(sections[j], ("SECTION_NAME")));
                setNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/FOOTER/RAD_TABS['" + tabname + "']/RAD_SECTIONS['" + sectname + "']/SEC_VISIBLE"), visible);
            }
        }
    }
    return true;
}

function fnTabVisibleVals(scr, portion, tab, visible) {
    if (visible == 'N') {
        var fldsets = selectNodes(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_SCREEN='" + scr + "']");
        for (i = 0;i < fldsets.length;i++) {
            if (getNodeText(selectSingleNode(fldsets[i], ("FIELDSET_PORTION"))) == portion) {
                if (getNodeText(selectSingleNode(fldsets[i], ("FIELDSET_TAB"))) == tab) {
                    var fld = getNodeText(selectSingleNode(fldsets[i], ("FIELDSET_NAME")));
                    setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fld + "']/FIELDSET_VISIBLE"), visible);
                    fn_attach_fieldset_name(fld + "~" + fld, "");
                }
            }
        }
        var sections = selectNodes(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/" + portion + "/RAD_TABS[TAB_NAME='" + tab + "']/RAD_SECTIONS");
        for (j = 0;j < sections.length;j++) {
            var sectname = getNodeText(selectSingleNode(sections[j], ("SECTION_NAME")));
            setNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/" + portion + "/RAD_TABS[TAB_NAME='" + tab + "']/RAD_SECTIONS[SECTION_NAME='" + sectname + "']/SEC_VISIBLE"), visible);
        }
    }
    if (visible == 'Y') {
        var scrVisible = getNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/SCREEN_VISIBLE"));
        if (scrVisible == 'N') {
            document.getElementById('TAB').getElementsByTagName('fieldset')[0].getElementsByTagName('INPUT')[5].checked = false;
            alertMessage("The Screen containing this Tab is invisible", "E");
            return false;
        }

    }
    return true;
}

function fnSectionVisibleVals(scr, portion, tab, sec, visible) {
    if (visible == 'N') {
        var fldsets = selectNodes(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_SCREEN='" + scr + "']");
        for (i = 0;i < fldsets.length;i++) {
            if (getNodeText(selectSingleNode(fldsets[i], ("FIELDSET_PORTION"))) == portion) {
                if (getNodeText(selectSingleNode(fldsets[i], ("FIELDSET_TAB"))) == tab) {
                    if (getNodeText(selectSingleNode(fldsets[i], ("FIELDSET_SECTION"))) == sec) {
                        var fld = getNodeText(selectSingleNode(fldsets[i], ("FIELDSET_NAME")));
                        setNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fld + "']/FIELDSET_VISIBLE"), visible);
                        fn_attach_fieldset_name(fld + "~" + fld, "");
                    }
                }
            }
        }
    }
    if (visible == 'Y') {
        var scrVisible = getNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/SCREEN_VISIBLE"));
        var tabVisible = getNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/" + portion + "/RAD_TABS[TAB_NAME='" + tab + "']/TAB_VISIBLE"));
        if (scrVisible == 'N') {
            document.getElementById('SEC').getElementsByTagName('fieldset')[0].getElementsByTagName('INPUT')[1].checked = false;
            alertMessage("The Screen containing this Section is invisible", "E");
            return false;
        }
        if (tabVisible == 'N') {
            document.getElementById('SEC').getElementsByTagName('fieldset')[0].getElementsByTagName('INPUT')[1].checked = false;
            alertMessage("The Tab containing this Section is invisible", "E");
            return false;
        }
    }
    return true;
}

function fnFldsetVisibleVals(fldset, visible) {
    if (visible == 'N') {
        document.getElementById("FIELDSET_NAME").disabled = true;
        document.getElementById("SCREEN_NAME11").disabled = true;
        document.getElementById("HORIZONTAL_FIELDSET").disabled = true;
        document.getElementById("FIELDSET_LABEL").disabled = true;
        document.getElementById("SCREEN_PORTION_FST").disabled = true;
        document.getElementById("FIELDSET_READONLY").disabled = true;
        document.getElementById("TAB_NAME11").disabled = true;
        document.getElementById("DATABLOCK_NAME").disabled = true;
        document.getElementById("NAV_BUTTONS_REQ").disabled = true;
		document.getElementById("NAV_BTN_FULL_WIDTH").disabled = true;
        document.getElementById("MULTI_RECORD_FST").disabled = true;
        document.getElementById("SECTION_NAME11").disabled = true;
        document.getElementById("VIEW_TYPE").disabled = true;
        document.getElementById("PARTITION_NAME11").disabled = true;
        document.getElementById("FIELDSET_HEIGHT").disabled = true;
        document.getElementById("FIELDSET_WIDTH").disabled = true;
        document.getElementById("ROWS_PER_PAGE").disabled = true;
        document.getElementById("DATASRC2_FIELDS_LIST").disabled = true;
        fn_attach_fieldset_name(fldset + "~" + fldset, "");
    }
    if (visible == 'Y') {
        var scr = getNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_SCREEN"));
        var portion = getNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_PORTION"));
        var tab = getNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_TAB"));
        var sec = getNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_SECTION"));
        if (scr != "") {
            var scrVisible = getNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/SCREEN_VISIBLE"));
            if (scrVisible == 'N') {
                document.getElementById('FDN').getElementsByTagName('fieldset')[2].getElementsByTagName('INPUT')[3].checked = false;
                alertMessage("The Screen containing this fieldset is invisible", "E");
                return false;
            }
        }
        if (tab != "") {
            var tabVisible = getNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/" + portion + "/RAD_TABS[TAB_NAME='" + tab + "']/TAB_VISIBLE"));
            if (tabVisible == 'N') {
                document.getElementById('FDN').getElementsByTagName('fieldset')[2].getElementsByTagName('INPUT')[3].checked = false;
                alertMessage("The Tab containing this fieldset is invisible", "E");
                return false;
            }
        }
        if (sec != "") {
            var secvisible = getNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scr + "']/" + portion + "/RAD_TABS[TAB_NAME='" + tab + "']/RAD_SECTIONS[SECTION_NAME='" + sec + "']/SEC_VISIBLE"));
            if (secvisible == 'N') {
                document.getElementById('FDN').getElementsByTagName('fieldset')[2].getElementsByTagName('INPUT')[3].checked = false;
                alertMessage("The Section containing this fieldset is invisible", "E");
                return false;
            }
        }

        var fldsetnode = selectSingleNode(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']");
        var datablock = getNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_BLOCK"));
        var fldsetsamedtblk = selectNodes(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_BLOCK='" + datablock + "']");
        for (i = 0;i < fldsetsamedtblk.length;i++) {
            var fieldset = getNodeText(selectSingleNode(fldsetsamedtblk[i], ("FIELDSET_NAME")));
            if (fieldset != fldset && getNodeText(selectSingleNode(fldsetsamedtblk[i], ("FIELDSET_VISIBLE"))) != 'N') {
                var datablkfields = selectNodes(fldsetsamedtblk[i], "//RAD_FIELDSETS[FIELDSET_NAME='" + fieldset + "']/FIELDSET_FIELDS");
                for (j = 0;j < datablkfields.length;j++) {
                    var blkfld = getNodeText(selectSingleNode(datablkfields[j], "FIELD_NAME"));
                    if (getNodeText(selectSingleNode(datablkfields[j], "ACTIVE")) == 'Y') {

                        if (selectSingleNode(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_FIELDS[FIELD_NAME='" + blkfld + "']") != null) {
                            var fldlen = document.getElementById('FDN').getElementsByTagName('TABLE')[2].getElementsByTagName('TR').length;
                            for (j = 1;j < fldlen;j++) {
                                if (blkfld == document.getElementById('FDN').getElementsByTagName('TABLE')[2].getElementsByTagName('TR')[j].getElementsByTagName('INPUT')[1].value) {
                                    if (document.getElementById('FDN').getElementsByTagName('TABLE')[2].getElementsByTagName('TR')[j].getElementsByTagName('INPUT')[4].value == 'Y') {
                                        document.getElementById('FDN').getElementsByTagName('fieldset')[2].getElementsByTagName('INPUT')[3].checked = false;
                                        alertMessage("The fields attached to this fieldset  is used by other fieldsets", "E");
                                        return false;
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }
        setNodeText(selectSingleNode(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldset + "']/FIELDSET_VISIBLE"), visible);

        var screenName = document.getElementById('SCREEN_NAME11').value;
        PopulateScreens('');
        document.getElementById('SCREEN_NAME11').value = screenName;
        fn_attach_fieldset_name(fldset + "~" + fldset, fldset + "~" + fldset);
        fn_enableFieldsetFields(fldset, '1');
    }
    return true;
}

function FnCheckSecVal() {
    if (document.getElementById('SECTION_LBL').value == "" && document.getElementById('COLLAPSE_SEC').checked == true) {
        document.getElementById('COLLAPSE_SEC').checked = false;
        alertMessage("Section Label Is Mandatory", "E");
        return false;
    }
	if(document.getElementById('COLLAPSE_SEC').checked == false)
	{
	document.getElementById('COLLAPSE_EXPAND_ID').checked=false;
	document.getElementById('COLLAPSE_EXPAND_ID').disabled=true;
	}
	else
	{
	document.getElementById('COLLAPSE_EXPAND_ID').disabled=false;
	}
}

function FnCheckMltplSec() {
    if (document.getElementById('MULTIPLE_SECTION').checked == true) {
		var scr = clickedobjects[1];
        var portion = clickedobjects[2];
        var tab = clickedobjects[3];
        var section = clickedobjects[4];  
		
		var fldsets = selectNodes(dom, "//RAD_FIELDSETS[FIELDSET_SCREEN='" + scr + "' and FIELDSET_PORTION='" + portion + "' and FIELDSET_TAB='" + tab + "' and FIELDSET_SECTION='" + section + "']");
		
		var fldflag=false; 
	for (var i = 0;i < fldsets.length;i++) {
	if(getNodeText(selectSingleNode(fldsets[i], 'MULTI_RECORD'))=="N"){
	fldflag=true;
	}
	
	}
	if(fldflag){
	
        document.getElementById('MULTIPLE_SECTION').checked = false;
        alertMessage("Single entry Partitions are present under this Section", "E");
        return false;
    }
	
	}
}

function CheckVisibleVals(chkbox, node) {
    var flag;
    if (chkbox.checked == true) {
        var visible = 'Y';
    }
    else {
        var visible = 'N';
    }
    if (node == 'SCR') {
        var scr = clickedobjects[1];
        var flag = fnScreenVisibleVals(scr, visible);
    }
    if (node == 'TAB') {
        var scr = clickedobjects[1];
        var portion = clickedobjects[2];
        var tab = clickedobjects[3];
        var flag = fnTabVisibleVals(scr, portion, tab, visible);
    }
    if (node == 'SEC') {
        var scr = clickedobjects[1];
        var portion = clickedobjects[2];
        var tab = clickedobjects[3];
        var section = clickedobjects[4];
        var flag = fnSectionVisibleVals(scr, portion, tab, section, visible);
    }
    if (node == 'FDN') {
        var fldset = document.getElementById('FDN').getElementsByTagName('fieldset')[0].getElementsByTagName('INPUT')[0].value;
        var flag = fnFldsetVisibleVals(fldset, visible);
    }
    return flag;
}

function fn_checkRepetition(tablename, field) {
    if (field.value != "") {
        var flag = 0;
        var fieldname = field.value;
        var tab = document.getElementById(tablename).tBodies[0];
        var tablen = tab.rows.length;
        if (tablename == 'ScrArgnts') {
            for (i = 0;i < tablen;i++) {
                if (tab.rows[i].cells[1].getElementsByTagName('INPUT')[0].value == fieldname) {
                    flag = flag + 1;
                }
            }
            if (flag > 1) {
                alertMessage("Screen Argument Name already present", "E");
                field.value = "";
                return false;
            }

        }
        if (tablename == 'partition') {
            for (i = 0;i < tablen;i++) {
                if (tab.rows[i].cells[2].getElementsByTagName('INPUT')[0].value == fieldname) {
                    flag = flag + 1;
                    if (flag > 1) {
                        tab.rows[i].cells[0].getElementsByTagName("INPUT")[0].checked = true;
                        delRow('partition');
                        try {
                            alertMessage("Partition Name already present", "E");
                        }
                        catch (e) {
                            parent.alertMessage("Partition Name already present", "E");
                        }

                    }

                }
            }

        }
    }
}

function fn_val_movetofldsetfields(blk, fldset, field) {
    var fldsetsamedtblk = selectNodes(dom, "//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_BLOCK='" + blk + "']");
    for (i = 0;i < fldsetsamedtblk.length;i++) {
        var fieldset = getNodeText(selectSingleNode(fldsetsamedtblk[i], ("FIELDSET_NAME")));
        if (fieldset != fldset && getNodeText(selectSingleNode(fldsetsamedtblk[i], ("FIELDSET_VISIBLE"))) != 'N') {
            var datablkfields = selectNodes(fldsetsamedtblk[i], "//RAD_FIELDSETS[FIELDSET_NAME='" + fieldset + "']/FIELDSET_FIELDS[FIELD_NAME='" + field + "' and ACTIVE='Y']");
            if (datablkfields.length > 0) {
                alertMessage("The field is used by another fieldset", "E");
                return false;
            }
        }
    }
}

function fnfldsetval(field) {
    if (field == "SCREEN_NAME11") {
        document.getElementById("SCREEN_PORTION_FST").value = "";
        document.getElementById("TAB_NAME11").options.length = 0;
        document.getElementById("SECTION_NAME11").options.length = 0;
        document.getElementById("PARTITION_NAME11").options.length = 0;
        addOption(document.getElementById("TAB_NAME11"), "", "", true);
        addOption(document.getElementById("SECTION_NAME11"), "", "", true);
        addOption(document.getElementById("PARTITION_NAME11"), "", "", true);

    }
    else if (field == "SCREEN_PORTION_FST") {
        document.getElementById("TAB_NAME11").options.length = 0;
        document.getElementById("SECTION_NAME11").options.length = 0;
        document.getElementById("PARTITION_NAME11").options.length = 0;
        addOption(document.getElementById("TAB_NAME11"), "", "", true);
        addOption(document.getElementById("SECTION_NAME11"), "", "", true);
        addOption(document.getElementById("PARTITION_NAME11"), "", "", true);
    }
    else if (field == "TAB_NAME11") {
        document.getElementById("SECTION_NAME11").options.length = 0;
        document.getElementById("PARTITION_NAME11").options.length = 0;
        addOption(document.getElementById("SECTION_NAME11"), "", "", true);
        addOption(document.getElementById("PARTITION_NAME11"), "", "", true);
    }
    else if (field == "SECTION_NAME11") {
        document.getElementById("PARTITION_NAME11").options.length = 0;
        addOption(document.getElementById("PARTITION_NAME11"), "", "", true);
    }
}

function fncallformselect(tablename) {

    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;
    var event = "";
    var obj = "";
    for (i = 0;i < tablen;i++) {
        obj = tab.rows[i].cells[5].getElementsByTagName('SELECT')[0];

        event = tab.rows[i].cells[3].getElementsByTagName("SELECT")[0].value;
        if (event == "CALLFORM") {
            var callformvalue = tab.rows[i].cells[5].getElementsByTagName("SELECT")[0].value;
            obj.options.length = 0;
            addOption(obj, "", "", true);
            var call = selectNodes(dom, ("//RAD_CALLFORM")).length;
            for (var j = 0;j < call;j++) {
                var calfrm = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_CALLFORM"))[j], ("CALLFORM_FUCNTIONID")));
                if (getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_CALLFORM"))[j], ("CALLFORM_ACTIVE"))) == "Y")
                    addOption(obj, calfrm, calfrm, false);
            }
            tab.rows[i].cells[5].getElementsByTagName("SELECT")[0].value = callformvalue;
        }
        else if (event == "LAUNCH") {
            var launchvalue = tab.rows[i].cells[5].getElementsByTagName("SELECT")[0].value;
            obj.options.length = 0;
            addOption(obj, "", "", true);
            var launch = selectNodes(dom, ("//RAD_LAUNCHFORM")).length;
            for (var j = 0;j < launch;j++) {
                var laun = getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_LAUNCHFORM"))[j], ("LAUNCHFORM_FUCNTIONID")));
                if (getNodeText(selectSingleNode(selectNodes(dom, ("//RAD_LAUNCHFORM"))[j], ("LAUNCHFORM_ACTIVE"))) == "Y")
                    addOption(obj, laun, laun, false);
            }
            tab.rows[i].cells[5].getElementsByTagName("SELECT")[0].value = launchvalue;

        }
        else {
            obj.options.length = 0;

        }

    }

}

function fnPopulatedataype() {
    /* for fetch columns from the table selected   */

    var tabname = clickedobjects[1];
    var tabname1 = tabname;
    var tabn = fn_dsrvalidate(tabname);
    if (tabn != "") {
        tabname = tabn;
    }
    var clname = clickedobjects[2];
	var queryString = "FNPOPULATEDATAYPE";
    //var queryString = "FETCH@SELECT DATA_TYPE , DECODE(DATA_TYPE,'CHAR', CHAR_LENGTH, 'VARCHAR2', CHAR_LENGTH, 'NUMBER', NVL(DATA_PRECISION,DATA_LENGTH), DATA_LENGTH) DATA_LENGTH FROM user_tab_cols  WHERE TABLE_NAME ='" + tabname + "' and COLUMN_NAME='" + clname + "'";
    var WhereString = "WHERE TABLE_NAME ='" + tabname + "' and COLUMN_NAME='" + clname + "'";
    parent.gReqType = "APP";
    parent.gReqCode = parent.gAction;
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);
	setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");

    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
    var multRec = "";
    try {
        multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
    }
    catch (e) {
        multRec = response.substring(9, response.indexOf("</Records>")).split(">");
    }
    //if ((multRec[0] != "") && (document.getElementById("DATATYPE").value != (multRec[0].split("~"))[0])) {
    if ((multRec[0] != "")) {

        var res = multRec[0].split("~");
        document.getElementById("DATATYPE").value = res[0];
        document.getElementById("MAX_LENGTH").value = res[1];

        if (document.getElementById("BLOCK_NAME").value != "") {
            var blname = document.getElementById("BLOCK_NAME").value;
            setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blname + "']/RAD_BLK_FIELDS[DBC='" + clname + "'][DBT='" + tabname1 + "']"))[0], ('DATATYPE')), res[0]);
            setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_DATA_BLOCKS[@ID='" + blname + "']/RAD_BLK_FIELDS[DBC='" + clname + "'][DBT='" + tabname1 + "']"))[0], ('MAX_LENGTH')), res[1]);
            alertMessage("Data Type has been Repopulated in Data Block Also", "I");
        }
        else {
            alertMessage("Data Type has been Repopulated in Data Sources", "I");
        }

    }

}

function fn_dsrvalidate(tablename) {
    /** remove alias name if present **/
    var tabName = tablename
    if (tabName.indexOf("__") > 0)
        tabName = tabName.substring(0, tabName.indexOf("__"));
    /* for check if  the table is synonym or not  */
	var queryString = "USERSYNONYMS";
    //var queryString = "FETCH@SELECT TABLE_NAME FROM USER_SYNONYMS WHERE SYNONYM_NAME='" + tabName + "'";
    var WhereString = "WHERE SYNONYM_NAME='" + tabName + "'";
    parent.gReqType = "APP";
    parent.gReqCode = parent.gAction;
    var radReqDOM = parent.buildRADXml();
    var bodyNode = selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER");
    var tempNode = radReqDOM.createElement("QUERY");
    bodyNode.appendChild(tempNode);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/REQ_CODE"), "UEXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ACTION"), "EXECUTEQUERY");
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/QUERY"), queryString);
	setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/WHERECLAUSE"), WhereString);
    setNodeText(selectSingleNode(radReqDOM, "//RAD_REQ_ENV/RAD_HEADER/ISSUMMARY"), "0");
    var response = parent.fnPost(getXMLString(radReqDOM) + parent.gBodySeparator + "");
    var multRec = "";
    try {
        multRec = getNodeText(selectSingleNode(response, "//Records")).split(">");
    }
    catch (e) {
        multRec = response.substring(9, response.indexOf("</Records>")).split(">");
    }
    if (multRec[0] != "")
    return multRec[0];
    else 
        return tabName;

}

var sortflag;
var sortcell;

function fnsorttable(cell, tablename) {
    sortcell = cell;
    var tableObj1 = document.getElementById(tablename);
    var tableObj = document.getElementById(tablename);
    var newRows = new Array();
    var cellk = tableObj1.tBodies[0].rows[0].cells.length;
    for (var j = 0;j < tableObj1.tBodies[0].rows.length;j++) {
        newRows[j] = new Array(cellk);
        for (var k = 0;k < cellk;k++) {
            try {
                newRows[j][k] = tableObj1.tBodies[0].rows[j].cells[k].getElementsByTagName("INPUT")[0].value;
            }
            catch (e) {
                newRows[j][k] = tableObj1.tBodies[0].rows[j].cells[k].getElementsByTagName("SELECT")[0].value;
            }
        }
    }
    newRows.sort(mySortingdown);
    deleteAll(tablename);

    for (var j = 0;j < newRows.length;j++) {
        addNewRow(tablename);
        for (var k = 0;k < cellk;k++) {
            try {
                tableObj.tBodies[0].rows[j].cells[k].getElementsByTagName("INPUT")[0].value = newRows[j][k];
                if (k == 4)
                    tableObj.tBodies[0].rows[j].cells[k].getElementsByTagName("INPUT")[0].value = j + 1;
            }
            catch (e) {
                tableObj.tBodies[0].rows[j].cells[k].getElementsByTagName("SELECT")[0].value = newRows[j][k];
            }
        }
    }

}

function mySortingdown(a, b) {
    sortflag = 1;
    a = a[sortcell];
    b = b[sortcell];
    return parseInt(a) == parseInt(b) ? 0 : (parseInt(a) > parseInt(b) ? 1 :  - 1)
}

function FnUpTbl_pkcols() {
    if (document.getElementById("DS_UPLOAD_TABLE").value != "") {
        if (document.getElementById("DS_UP_TBL_PK_COLS").value == "") {
            if (document.getElementById("FUNCTION_CATEGORY").value == "TRANSACTION")
                document.getElementById("DS_UP_TBL_PK_COLS").value = "1:SOURCE_CODE~2:SOURCE_REF~3:SOURCE_SEQ_NO~4:BRANCH_CODE";
            else if (document.getElementById("FUNCTION_CATEGORY").value == "MAINTENANCE")
                document.getElementById("DS_UP_TBL_PK_COLS").value = "1:SOURCE_CODE~2:MAINTENANCE_SEQ_NO~3:SOURCE_SEQ_NO~4:BRANCH_CODE";

            if (document.getElementById("MASTER_DATASRC").value == "Y" && document.getElementById("FUNCTION_ID").value.charAt(2) != "C") {
                if (document.getElementById("FUNCTION_CATEGORY").value == "TRANSACTION")
                    document.getElementById("DS_UP_TBL_PK_COLS").value = "1:SOURCE_CODE~2:SOURCE_REF~3:SOURCE_SEQ_NO~4:BRANCH_CODE~5:FUNCTION_ID~6:ACTION_CODE~7:UPLOAD_ID~8:MODULE~10:";
                else if (document.getElementById("FUNCTION_CATEGORY").value == "MAINTENANCE")
                    document.getElementById("DS_UP_TBL_PK_COLS").value = "1:SOURCE_CODE~2:MAINTENANCE_SEQ_NO~3:SOURCE_SEQ_NO~4:BRANCH_CODE~5:FUNCTION_ID~6:ACTION_CODE~10:";
                if (document.getElementById("DATASRC_NAME_DN").value == document.getElementById("DS_UPLOAD_TABLE").value) {
                    if (document.getElementById("FUNCTION_CATEGORY").value == "TRANSACTION")
                        document.getElementById("DS_UP_TBL_PK_COLS").value = "1:SOURCE_CODE~2:SOURCE_REF~3:SOURCE_SEQ_NO~4:BRANCH_CODE~5:FUNCTION_ID~6:ACTION_CODE~7:UPLOAD_ID~8:MODULE~9:UPLOAD_STATUS~10:";

                }
            }
        }
    }
    else {
        document.getElementById("DS_UP_TBL_PK_COLS").value = "";
    }
}
var uplclm = "";

function fNUpload_tblclm() {
    FnUpTbl_pkcols();
    uplclm = document.getElementById("DS_UP_TBL_PK_COLS").value;
    if (document.getElementById("DS_UPLOAD_TABLE").value == "" || uplclm == "") {
        alertMessage("Please Enter Upload Table", "E");
        return false;
    }
    loadSubScreenDIV("ChildWin", "RadUploadTableColumns.jsp?Title='UploadTableColumns'");
}

function fn_populate_Blocks_toBlk_Amount(event) {
    fn_populate_Blocks_toamtss('RAD_DATA_BLOCKS', 'AMOUNTTAB', 'frmBlkFldDtls', 'C_BLK_NAME', 1, event);
}

function fn_populate_Blocks_toamtss(node, tablename, frmname, fld, cellno, event) {

    var obj = "";
    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;
    if (tablen != 0) {
        obj = tab.rows[tablen - 1].cells[cellno].getElementsByTagName('SELECT')[0];
        obj.options.length = 0
        var blks = selectNodes(dom, ("//" + node + ""));
        var blkslen = blks.length;
        addOption(obj, "", "", true);
        for (var i = 0;i < blkslen;i++) {
            addOption(obj, getNodeText(selectSingleNode(blks[i], "BLOCK_NAME")), getNodeText(selectSingleNode(blks[i], "BLOCK_NAME")), false);
        }

    }
}

function fn_populate_Blocks_toPatterns() {
    deleteAll('PATTERNTAB');
    var tab = document.getElementById("PATTERNTAB").tBodies[0];
    var disptype = document.getElementById('DISPLAY_TYPE_BLKF').value;

    if (disptype == "ACCOUNT" || disptype == "GLCODE") {
        addNewRow('PATTERNTAB');
        tab.rows[0].cells[1].getElementsByTagName('INPUT')[0].value = "Name";
        fn_populate_Blocks_toamtss('RAD_DATA_BLOCKS', 'PATTERNTAB', 'frmBlkFldDtls', 'P_BLK_NAME', 2, event);
        addNewRow('PATTERNTAB');
        tab.rows[1].cells[1].getElementsByTagName('INPUT')[0].value = "Branch";
        fn_populate_Blocks_toamtss('RAD_DATA_BLOCKS', 'PATTERNTAB', 'frmBlkFldDtls', 'P_BLK_NAME', 2, event);
        addNewRow('PATTERNTAB');
        tab.rows[2].cells[1].getElementsByTagName('INPUT')[0].value = "Currency";
        fn_populate_Blocks_toamtss('RAD_DATA_BLOCKS', 'PATTERNTAB', 'frmBlkFldDtls', 'P_BLK_NAME', 2, event);
    }
    else if (disptype == "CUSTOMER") {
        addNewRow('PATTERNTAB');
        tab.rows[0].cells[1].getElementsByTagName('INPUT')[0].value = "Customer No";
        fn_populate_Blocks_toamtss('RAD_DATA_BLOCKS', 'PATTERNTAB', 'frmBlkFldDtls', 'P_BLK_NAME', 2, event);

    }
}

function fnFieldsetType() {

    if (document.getElementById('FIELDSET_TYPE').value == "ImageSet") {
        logScreen = "FLD_IMAGE";
        document.getElementById("Datablkflds").disabled = true;
        if (document.getElementById("FieldsetFields").getElementsByTagName('TBODY')[0].getElementsByTagName('TR').length == 0) {
            return;
        }
        alertMessage("All Fieldset Fields Will be Removed", "O");
        document.getElementById('FIELDSET_TYPE').value = "Normal";
        return;
    }
	else if (document.getElementById('FIELDSET_TYPE').value == "Version") {
	    logScreen = "FLD_VERSION";
		var k = MoveToFieldset('FDN','DATASRC2_FIELDS_LIST','FieldsetFields','true');
		if(k){
		document.getElementById("Datablkflds").disabled = true;
	    document.getElementById("FieldsetFields").disabled = true;
		}
	}else if (document.getElementById('FIELDSET_TYPE').value == "SUMMARY" || document.getElementById('FIELDSET_TYPE').value == "TABS") {
	    logScreen = "FLD_SUMMARY"; 
		 document.getElementById("SCREEN_NAME11").value = "";
        document.getElementById("HORIZONTAL_FIELDSET").checked = true; 
	}
    else { 
        document.getElementById("Datablkflds").disabled = false;
		document.getElementById("FieldsetFields").disabled = false;
    }
}

function fnFldstNavVal(){
	 if (document.getElementById('NAV_BUTTONS_REQ').checked == true) {
          document.getElementById("NAV_BTN_FULL_WIDTH").disabled = false;  
        }
		else {
        document.getElementById("NAV_BTN_FULL_WIDTH").disabled = true; 
		document.getElementById("NAV_BTN_FULL_WIDTH").checked = false; 
    }
}
//versioncontrol
function fnSelectVersion()
{
     if (document.getElementById('VERSION_CONTROL').checked == true) {
          document.getElementById("ADD1").disabled = true;
          document.getElementById("DEL").disabled = true;

        }
}
//versioncontrol
function fnFieldsetImage_Val() {
    document.getElementById('FieldsetFields').rows[0].getElementsByTagName("INPUT")[0].checked = true;
    checkAll('FieldsetFields', 'checkgroup', 'SEL_ALL_FST');
    MoveToDtBlkFlds('FDN', 'FieldsetFields', 'DATASRC2_FIELDS_LIST');
    document.getElementById('FIELDSET_TYPE').value = "ImageSet";
}
function fnFieldsetVersion_Val() {
    document.getElementById('FieldsetFields').rows[0].getElementsByTagName("INPUT")[0].checked = true;
    checkAll('FieldsetFields', 'checkgroup', 'SEL_ALL_FST');
    MoveToDtBlkFlds('FDN', 'FieldsetFields', 'DATASRC2_FIELDS_LIST');
    document.getElementById('FIELDSET_TYPE').value = "Normal";
}
 
function fnDefault_valscrn() {
    loadSubScreenDIV("ChildWin", "RadDefaultscreen.jsp?Title='Default Value'");
}
function fnRestActionsUI(){
	 if (document.getElementById('REST_ENABLED').checked == true) {
         document.getElementById("REST_MICRO_ENABLED").disabled = false;  
       }
		else {
       document.getElementById("REST_MICRO_ENABLED").disabled = true; 
		document.getElementById("REST_MICRO_ENABLED").checked = false; 
		document.getElementById("RESTADD").disabled = true; 
		document.getElementById("RESTDEL").disabled = true; 
      }
	 if (document.getElementById('REST_MICRO_ENABLED').checked == true) {
         document.getElementById("RESTADD").disabled = false;
         document.getElementById("RESTDEL").disabled = false;
       }else{
    	   deleteAll('REST_TABLE');
    	   document.getElementById("RESTADD").disabled = true;
           document.getElementById("RESTDEL").disabled = true;
       }
	 
	 if (document.getElementById('REST_ENABLED').checked == true) {
		 for (var k = 1;k < 13;k++) {  
			 document.getElementById("REST_OPERATION_ENABLED"+K).disabled =  false; 
	        }
       }
		else {
			for (var k = 1;k < 13;k++) {  
				document.getElementById("REST_OPERATION_ENABLED"+K).disabled = true;
				 document.getElementById("REST_OPERATION_ENABLED"+K).checked = false; 
        }
      }
	 
}