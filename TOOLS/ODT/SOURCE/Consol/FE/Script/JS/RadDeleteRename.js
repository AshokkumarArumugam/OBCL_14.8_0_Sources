/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadDeleteRename.js
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
var renameObject = ""
var selectedBlk = "";
// Function to delete fieldset.   Parameter : fieldset Name
function fnDelFldset(fldsetname) {
    var fldset = selectNodes(dom, "//RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
    var blkName = getNodeText(selectSingleNode(fldset[0], 'FIELDSET_BLOCK'));
    var fldsetflds = selectNodes(dom, "//RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
    for (var i = 0;i < fldsetflds.length;i++) {
        if (getNodeText(selectSingleNode(fldsetflds[i], 'ACTIVE')) == 'Y') {
            var fldname = getNodeText(selectSingleNode(fldsetflds[i], 'FIELD_NAME'));
            fnDettachFldsetfromBlkFld(fldname, fldsetname, blkName);
        }
    }
    fnRemoveChildren(fldset);
    updateTreeAfterDelete("FLD~" + fldsetname);
}
// Function to delete a field in the fieldset.    Parameters : FieldName,FieldSet Name
function fnDelFldInFldset(fldname, fldsetname) {
    var fldset = selectNodes(dom, "//RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
    var fldsetfields = selectNodes(fldset[0], "//FIELDSET_FIELDS[FIELD_NAME='" + fldname + "']");
    if (fldsetfields.length > 0) {
        fnRemoveChildren(fldsetfields);
    }
}
// Function to delete all the fields in a fieldset.  Parameters : FieldSet Name
function fnDelAllFldsInFldset(fldsetname) {
    var fldset = selectNodes(dom, "//RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']");
    var fldsetfields = selectNodes(fldset[0], "//RAD_FIELDSETS[FIELDSET_NAME='" + fldsetname + "']/FIELDSET_FIELDS");
    blkname = getNodeText(selectSingleNode(fldset[0], 'FIELDSET_BLOCK'));
    fnDettachBlkfromFldset(fldsetname, blkname);
    fnRemoveChildren(fldsetfields);
}
// Function to Delete a DataBlock.    Parameters : DataBlock Name
function fnDelBlock(blkname) {
    var block = selectNodes(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkname + "']");
    var fieldset = selectNodes(block[0], "//RAD_FIELDSETS[FIELDSET_BLOCK='" + blkname + "']");
    for (var j = 0;j < fieldset.length;j++) {
        var set = getNodeText(selectSingleNode(fieldset[j], "FIELDSET_NAME"));
        fnDelAllFldsInFldset(set);
    }
    fnRemvBlkFromSmry(blkname);
    fnRemoveChildren(block);
    fnDettachBlkfromDatascr(blkname);
    var elemtoDel = ("BLK~" + blkname);
    updateTreeAfterDelete(elemtoDel);
}
//Function to dettach a DataBlock from Summary.    Parameters : DataBlock Name
function fnRemvBlkFromSmry(block) {
    if (selectNodes(dom, "//RAD_SUMMARY[RSLT_DATABLK='" + block + "']").length != 0) {
        var delblkNds = selectNodes(dom, "//RAD_SUMMARY[RSLT_DATABLK='" + block + "']/SUMMARY_DETAILS");
        fnRemoveChildren(delblkNds);
        setNodeText(selectSingleNode(selectNodes(dom, ("//RAD_SUMMARY[RSLT_DATABLK='" + block + "']"))[0], "RSLT_DATABLK"), "");
    }
}
//Function to Delete a Datablock field.     Parameters : Block Field Name, DataBlock Name
function fnDelFldInBlockFrmDs(fldname, blkname) {
    var blockfields = selectNodes(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkname + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldname + "']");
    var fieldset = selectNodes(dom, "//RAD_FIELDSETS[FIELDSET_BLOCK='" + blkname + "']");
    var fldsetlen = fieldset.length;
    for (var i = 0;i < fldsetlen;i++) {
        fldsetname = getNodeText(selectSingleNode(fieldset[i], "FIELDSET_NAME"));
        fnDelFldInFldset(fldname, fldsetname);
    }
    fnDelSmryFld(fldname, blkname);
    fnRemoveChildren(blockfields);
}
// Entry point function to Delete a Datablock field       Parameters : Block Field Name, DataBlock Name
function fnDelFldInBlock(fldname, blkname) {
    var blockfields = selectNodes(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkname + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fldname + "']");
    var dbfld = getNodeText(selectSingleNode(blockfields[0], 'DBC'));
    var dsname = getNodeText(selectSingleNode(blockfields[0], 'DBT'));
    if (dsname != "") {
        fnDettachBlkfldfromDatascr(dsname, dbfld, blkname);
    }
    fnDelFldInBlockFrmDs(fldname, blkname);
    updateTreeAfterDelete("BLK~" + blkname + "~" + fldname);
}
// To Remove a Field from Summary.    Parameters:Field Name,DataBlock Name
function fnDelSmryFld(fldname, blkname) {
    var summaryfld = selectNodes(dom, "//RAD_SUMMARY[RSLT_DATABLK='" + blkname + "']/SUMMARY_DETAILS[FIELD_NAME='" + fldname + "']");
    fnRemoveChildren(summaryfld);
}
//Function to Delete Block fields due to Removal of a DataSource from the Block
function fnDelBlkFldsforDtScr(DataScr, blkname) {
    var block = selectNodes(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkname + "']/BLK_DATASOURCES[DATASOURCE_NAME='" + DataScr + "']");
    var blockfields = selectNodes(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkname + "']/RAD_BLK_FIELDS");
    for (var i = 0;i < blockfields.length;i++) {
        if (getNodeText(selectSingleNode(blockfields[i], 'DBT')) == DataScr) {
            var fldname = getNodeText(selectSingleNode(blockfields[i], 'FIELD_NAME'));
            fnDelFldInBlock(fldname, blkname);
        }
    }
    if (block[0] != null) {
        block[0].parentNode.removeChild(block[0]);
    }
}
// Function To Dettach Field Set From  Block Field. Parameters:Field Name,FieldSet Name,Block Name
function fnDettachFldsetfromBlkFld(fldname, set, blkName) {
    var blkflds = selectNodes(dom, "//RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[@ID='" + fldname + "']");
    var blkfldsest = getNodeText(selectSingleNode(blkflds[0], 'FIELDSET_NAME'));
    if (blkfldsest == set) {
        setNodeText(selectSingleNode(blkflds[0], 'FIELDSET_NAME'), "");
    }
}
// Function To Dettach Block From  Fieldset
function fnDettachBlkfromFldset(set, blkname) {
    var fldset = selectNodes(dom, "//RAD_FIELDSETS[FIELDSET_NAME='" + set + "']");
    if (getNodeText(selectSingleNode(fldset[0], 'FIELDSET_BLOCK')) == blkname) {
        setNodeText(selectSingleNode(fldset[0], 'FIELDSET_BLOCK'), "");
    }
}
// Function To Dettach Block From a Datasource Field
function fnDettachBlkfldfromDatascr(dbname, fieldname, blkname) {
    var dsnode = selectNodes(dom, "//RAD_DATASOURCES");
    if (selectNodes(dsnode[0], "//RAD_DATASOURCES[DATASRC_NAME='" + dbname + "']/RAD_FIELDS[COLUMN_NAME='" + fieldname + "']")[0] != null) {
        fldBlkName = getNodeText(selectSingleNode(selectNodes(dsnode[0], ("//RAD_DATASOURCES[DATASRC_NAME='" + dbname + "']/RAD_FIELDS[COLUMN_NAME='" + fieldname + "']"))[0], 'BLOCK_NAME'));
        if (fldBlkName == blkname) {
            setNodeText(selectSingleNode(selectNodes(dsnode[0], ("//RAD_DATASOURCES[DATASRC_NAME='" + dbname + "']/RAD_FIELDS[COLUMN_NAME='" + fieldname + "']"))[0], 'BLOCK_NAME'), "");
            setNodeText(selectSingleNode(selectNodes(dsnode[0], ("//RAD_DATASOURCES[DATASRC_NAME='" + dbname + "']/RAD_FIELDS[COLUMN_NAME='" + fieldname + "']"))[0], 'FIELD_NAME'), "");
        }
    }
}
// Function To Dettach Block From a DataSource
function fnDettachBlkfromDatascr(blkname) {
    var dsnode = selectNodes(dom, "//RAD_DATASOURCES");
    for (var i = 0;i < dsnode.length;i++) {
        var dsname = getNodeText(selectSingleNode(dsnode[i], 'DATASRC_NAME'));
        var dsflds = selectNodes(dsnode[i], "//RAD_DATASOURCES[DATASRC_NAME='" + dsname + "']/RAD_FIELDS/BLOCK_NAME").length;
        for (var j = 0;j < dsflds;j++) {
            var fldname = getNodeText(selectSingleNode(selectNodes(dsnode[i], "//RAD_DATASOURCES[DATASRC_NAME=('" + dsname + "')]/RAD_FIELDS")[j], 'COLUMN_NAME'));
            var fdlBlkNode = selectNodes(dsnode[i], "//RAD_DATASOURCES[DATASRC_NAME='" + dsname + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']/BLOCK_NAME");
            fldBlkName = getNodeText(selectSingleNode(selectNodes(dsnode[i], ("//RAD_DATASOURCES[DATASRC_NAME='" + dsname + "']/RAD_FIELDS[COLUMN_NAME=('" + fldname + "')]"))[0], 'BLOCK_NAME'));
            if (fldBlkName == blkname) {
                setNodeText(selectSingleNode(selectNodes(dsnode[i], ("//RAD_DATASOURCES[DATASRC_NAME='" + dsname + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']"))[0], 'BLOCK_NAME'), "");
                setNodeText(selectSingleNode(selectNodes(dsnode[i], ("//RAD_DATASOURCES[DATASRC_NAME='" + dsname + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']"))[0], 'FIELD_NAME'), "");
            }

        }
    }
}
//Function to Delete a DataSource
function fnDelDatascr(dsname) {
    var dsnode = selectSingleNode(dom, "//RAD_DATASOURCES[@ID='" + dsname + "']");
    var dtblks = selectNodes(dom, "//RAD_DATA_BLOCKS");
    for (var i = 0;i < dtblks.length;i++) {
        datablk = getNodeText(selectSingleNode(dtblks[i], "BLOCK_NAME"));
        var blkdtscr = selectNodes(dom, "//RAD_DATA_BLOCKS[@ID='" + datablk + "']/BLK_DATASOURCES");
        for (var j = 0;j < blkdtscr.length;j++) {
            if (getNodeText(selectSingleNode(blkdtscr[j], "DATASOURCE_NAME")) == dsname) {
                var blkdsflds = selectNodes(dom, "//RAD_DATA_BLOCKS[@ID='" + datablk + "']/RAD_BLK_FIELDS");
                var fldlen = blkdsflds.length;
                for (var k = 0;k < fldlen;k++) {
                    if (getNodeText(selectSingleNode(blkdsflds[k], 'DBT')) == dsname) {
                        fldname = getNodeText(selectSingleNode(blkdsflds[k], 'FIELD_NAME'));
                        fnDelFldInBlockFrmDs(fldname, datablk);
                        chkDelDataSrc = true;
                        updateTreeAfterDelete("BLK~" + datablk + "~" + getNodeText(selectSingleNode(blkdsflds[k], 'FIELD_NAME')));
                        chkDelDataSrc = false;
                    }
                }
                blkdtscr[j].parentNode.removeChild(blkdtscr[j]);
            }
        }
    }
    dsnode.parentNode.removeChild(dsnode);
    updateTreeAfterDelete("DSN~" + dsname);
}
// Function to delete a field in the datascr
function fnDelFldIndatascr(fldname, dsrname) {
    var datascr = selectNodes(dom, "//RAD_DATASOURCES [DATASRC_NAME='" + dsrname + "']");
    var datascrfields = selectNodes(datascr[0], "//RAD_DATASOURCES[DATASRC_NAME='" + dsrname + "']/RAD_FIELDS[COLUMN_NAME='" + fldname + "']");
    var blkname = getNodeText(selectSingleNode(datascrfields[0], 'BLOCK_NAME'));
    if (fldname != "" && blkname != "") {
        var blkfldname = getNodeText(selectSingleNode(selectNodes(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkname + "']/RAD_BLK_FIELDS[DBC='" + fldname + "'][DBT='" + dsrname + "']")[0], 'FIELD_NAME'));
        fnDelFldInBlockFrmDs(blkfldname, blkname);
        chkDelDataSrcFld = true;
        updateTreeAfterDelete("BLK~" + blkname + "~" + blkfldname);
        chkDelDataSrcFld = false;

    }
    fnRemoveChildren(datascrfields);
    updateTreeAfterDelete("DSN~" + dsrname + "~" + fldname);
}
//Function To Delete a Screen
function fnDeleteScreen(scrname) {
    var dsnode = selectNodes(dom, "//RAD_SCREENS[@ID='" + scrname + "']");
    var fldsets = selectNodes(dom, "//RAD_FIELDSETS");
    for (var i = 0;i < fldsets.length;i++) {
        var fldsetname = getNodeText(selectSingleNode(fldsets[i], 'FIELDSET_NAME'));
        var fldSetScr = getNodeText(selectSingleNode(fldsets[i], 'FIELDSET_SCREEN'));
        if (fldSetScr == scrname) {
            fnDettachFldset(fldsetname, scrname);
        }
    }
    dsnode[0].parentNode.removeChild(dsnode[0]);
    updateTreeAfterDelete("SCR~" + scrname);
}
//Function To Detach Fieldset From a Screen
function fnDettachFldset(fldsetname, scrname) {
    var fldSetNode = selectNodes(dom, "//RAD_FIELDSETS[@ID='" + fldsetname + "']");
    var fldSetFlds = selectNodes(fldSetNode[0], "//RAD_FIELDSETS[@ID='" + fldsetname + "']/FIELDSET_FIELDS");
    for (var i = 0;i < fldSetFlds.length;i++) {
        setNodeText(selectSingleNode(fldSetFlds[i], 'SUBPARTITION_NAME'), "");
    }
    setNodeText(selectSingleNode(fldSetNode[0], 'FIELDSET_SECTION'), "");
    setNodeText(selectSingleNode(fldSetNode[0], 'FIELDSET_PARTITION'), "");
    setNodeText(selectSingleNode(fldSetNode[0], 'FIELDSET_SCREEN'), "");
    setNodeText(selectSingleNode(fldSetNode[0], 'FIELDSET_PORTION'), "");
    setNodeText(selectSingleNode(fldSetNode[0], 'FIELDSET_TAB'), "");
}
//Function To Delete a Tab
function fnDeleteTab(scrName, scrPrtn, scrTab) {
    var scrNode = selectNodes(dom, "//RAD_SCREENS[@ID='" + scrName + "']/" + scrPrtn + "/RAD_TABS[@ID='" + scrTab + "']");
    for (var i = 0;i < scrNode.length;i++) {
        var secNode = selectNodes(scrNode[i], 'RAD_SECTIONS');
        if (secNode.length > 0) {
            for (j = 0;j < secNode.length;j++) {
                fnDeleteSection(scrName, scrPrtn, scrTab, getNodeText(selectSingleNode(secNode[j], ('SECTION_NAME'))));
            }
        }
    }
    var fldsets = selectNodes(dom, "//RAD_FIELDSETS");
    for (var i = 0;i < fldsets.length;i++) {
        var fldsetname = getNodeText(selectSingleNode(fldsets[i], 'FIELDSET_NAME'));
        var fldSetPrtn = getNodeText(selectSingleNode(fldsets[i], 'FIELDSET_PORTION'));
        var fldSettab = getNodeText(selectSingleNode(fldsets[i], 'FIELDSET_TAB'));
        var fldSetScr = getNodeText(selectSingleNode(fldsets[i], 'FIELDSET_SCREEN'));
        if (fldSetScr == scrName && fldSetPrtn == scrPrtn && fldSettab == scrTab) {
            fnDettachTabfrmFldset(fldsetname, scrName, scrTab);
        }
    }
    scrNode[0].parentNode.removeChild(scrNode[0]);
    updateTreeAfterDelete("SCR~" + scrName + "~" + scrPrtn + "~" + scrTab);
}
//Function To Detach Fieldset From a Tab
function fnDettachTabfrmFldset(fldset, scrname, scrTab) {
    var fldSetNode = selectNodes(dom, "//RAD_FIELDSETS[@ID='" + fldset + "']");
    if (getNodeText(selectSingleNode(fldSetNode[0], 'FIELDSET_TAB')) == scrTab) {
        setNodeText(selectSingleNode(fldSetNode[0], 'FIELDSET_TAB'), "");
        setNodeText(selectSingleNode(fldSetNode[0], 'FIELDSET_SECTION'), "");
        setNodeText(selectSingleNode(fldSetNode[0], 'FIELDSET_PARTITION'), "");
    }
}
//Function To Delete a Section
function fnDeleteSection(scrName, scrPrtn, scrTab, scrSec) {
    var scrNode = selectSingleNode(dom, "//RAD_SCREENS[@ID='" + scrName + "']/" + scrPrtn + "/RAD_TABS[@ID='" + scrTab + "']/RAD_SECTIONS[@ID='" + scrSec + "']");
    var fldsets = selectNodes(dom, "//RAD_FIELDSETS");
    for (var i = 0;i < fldsets.length;i++) {
        var fldsetname = getNodeText(selectSingleNode(fldsets[i], 'FIELDSET_NAME'));
        var fldSetPrtn = getNodeText(selectSingleNode(fldsets[i], 'FIELDSET_PORTION'));
        var fldSettab = getNodeText(selectSingleNode(fldsets[i], 'FIELDSET_TAB'));
        var fldSetScr = getNodeText(selectSingleNode(fldsets[i], 'FIELDSET_SCREEN'));
        if (fldSetScr == scrName && fldSetPrtn == scrPrtn && fldSettab == scrTab) {
            fnDettachSecfrmFldset(fldsetname, scrName, scrSec);
        }
    }
    scrNode.parentNode.removeChild(scrNode);
    updateTreeAfterDelete("SCR~" + scrName + "~" + scrPrtn + "~" + scrTab + "~" + scrSec);
}
//Function To Detach Fieldset From a Section
function fnDettachSecfrmFldset(fldset, scrname, scrSec) {
    var fldSetNode = selectNodes(dom, "//RAD_FIELDSETS[@ID='" + fldset + "']");
    if (getNodeText(selectSingleNode(fldSetNode[0], 'FIELDSET_SECTION')) == scrSec) {
        var fldSetFlds = selectNodes(fldSetNode[0], "//RAD_FIELDSETS[@ID='" + fldset + "']/FIELDSET_FIELDS");
        for (var i = 0;i < fldSetFlds.length;i++) {
            setNodeText(selectSingleNode(fldSetFlds[i], 'SUBPARTITION_NAME'), "");
        }
        setNodeText(selectSingleNode(fldSetNode[0], 'FIELDSET_SECTION'), "");
        setNodeText(selectSingleNode(fldSetNode[0], 'FIELDSET_PARTITION'), "");
    }
}
//Function to delete LOV
function fnDleteLov(lovName) {
    var lovNode = selectSingleNode(dom, "//RAD_LOVS[@ID='" + lovName + "']");
    var datascr = selectNodes(dom, "//RAD_DATA_BLOCKS");
    for (var i = 0;i < datascr.length;i++) {
        var blkName = getNodeText(selectSingleNode(datascr[i], 'BLOCK_NAME'));
        var blkFlds = selectNodes(datascr[i], "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS");
        for (var j = 0;j < blkFlds.length;j++) {
            var fldlovName = getNodeText(selectSingleNode(blkFlds[j], 'LOV_NAME'));
            if (fldlovName == lovName) {
                var bndNodes = selectNodes(blkFlds[j], "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS[LOV_NAME='" + lovName + "']/RAD_BIND_VARS");
                fnRemoveChildren(bndNodes);
                var rtnNodes = selectNodes(blkFlds[j], "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS[LOV_NAME='" + lovName + "']/RAD_RETURN_FIELDS");
                fnRemoveChildren(rtnNodes);
                setNodeText(selectSingleNode(blkFlds[j], 'LOV_NAME'), "");
                setNodeText(selectSingleNode(blkFlds[j], 'DISPLAY_TYPE'), "TEXT");
            }
        }
    }
    lovNode.parentNode.removeChild(lovNode);
    updateTreeAfterDelete("LOV~" + lovName);
}
// Checking whether calform can be deleted
function fnCheckCallForm(calfrm) {
    if (getXMLString(basedom) != "") {
        var basecalfrms = selectNodes(basedom, "//RAD_KERNEL/RAD_CALLFORM");
        for (var i = 0;i < basecalfrms.length;i++) {
            if (getNodeText(selectSingleNode(basecalfrms[i], "CALLFORM_FUCNTIONID")) == calfrm) {
                return 1;
            }
        }
    }
    if (selectNodes(dom, "//RAD_KERNEL/RAD_CALLFORM[CALLFORM_FUCNTIONID='" + calfrm + "']")[0] != null) {
        var RelNameTyp = setReleaseNameAndType("//RAD_KERNEL/RAD_CALLFORM[CALLFORM_FUCNTIONID='" + calfrm + "']");
        relArr = RelNameTyp.split("~");
        prvsRelsName = relArr[0];
        prvsRelsType = relArr[1];
        if (prvsRelsName == parent.relName && prvsRelsType == parent.relType) {
        }
        else {
            return 2;
        }
    }
}
// Checking whether launchform can be deleted
function fnCheckLaunchForm(lnchfrm) {
    if (getXMLString(basedom) != "") {
        var basecalfrms = selectNodes(basedom, "//RAD_KERNEL/RAD_LAUNCHFORM");
        for (var i = 0;i < basecalfrms.length;i++) {
            if (getNodeText(selectSingleNode(basecalfrms[i], "LAUNCHFORM_FUCNTIONID")) == lnchfrm) {
                return 1;
            }
        }
    }
    if (selectNodes(dom, "//RAD_KERNEL/RAD_LAUNCHFORM[LAUNCHFORM_FUCNTIONID='" + lnchfrm + "']")[0] != null) {
        var RelNameTyp = setReleaseNameAndType("//RAD_KERNEL/RAD_LAUNCHFORM[LAUNCHFORM_FUCNTIONID='" + lnchfrm + "']");
        relArr = RelNameTyp.split("~");
        prvsRelsName = relArr[0];
        prvsRelsType = relArr[1];
        if (prvsRelsName == parent.relName && prvsRelsType == parent.relType) {
        }
        else {
            return 2;
        }
    }
}
// Checking whether DataSource can be deleted
function fnCheckDataSource(dsrName) {
    if (getXMLString(basedom) != "") {
        var baseDscs = selectNodes(basedom, "//RAD_KERNEL/RAD_DATASOURCES");
        for (var i = 0;i < baseDscs.length;i++) {
            if (getNodeText(selectSingleNode(baseDscs[i], "DATASRC_NAME")) == dsrName) {
                return 1;
            }
        }
    }
    if (selectNodes(dom, "//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsrName + "']")[0] != null) {
        var RelNameTyp = setReleaseNameAndType("//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsrName + "']");
        relArr = RelNameTyp.split("~");
        prvsRelsName = relArr[0];
        prvsRelsType = relArr[1];
        if (prvsRelsName == parent.relName && prvsRelsType == parent.relType) {
        }
        else {
            return 2;
        }
    }
    else {
        return 2;
    }
}
// Checking whether DataBlock can be deleted
function fnCheckDataBlk(blkName) {
    if (getXMLString(basedom) != "") {
        var baseDtBlks = selectNodes(basedom, "//RAD_KERNEL/RAD_DATA_BLOCKS ");
        for (var i = 0;i < baseDtBlks.length;i++) {
            if (getNodeText(selectSingleNode(baseDtBlks[i], "BLOCK_NAME")) == blkName) {
                return 1;
            }
        }
    }
    var RelNameTyp = setReleaseNameAndType("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']");
    relArr = RelNameTyp.split("~");
    prvsRelsName = relArr[0];
    prvsRelsType = relArr[1];
    if (prvsRelsName == parent.relName && prvsRelsType == parent.relType) {
    }
    else {
        return 2;
    }
}
// Checking whether DataBlock Field can be deleted
function fnCheckDataBlkFld(blkName, blkFldName) {
    if (getXMLString(basedom) != "") {
        var baseDtBlkflds = selectNodes(basedom, "//RAD_KERNEL/RAD_DATA_BLOCKS [BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS");
        for (var i = 0;i < baseDtBlkflds.length;i++) {
            if (getNodeText(selectSingleNode(baseDtBlkflds[i], "FIELD_NAME")) == blkFldName) {
                return 1;
            }
        }
    }
    var RelNameTyp = setReleaseNameAndType("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + blkFldName + "']");
    relArr = RelNameTyp.split("~");
    prvsRelsName = relArr[0];
    prvsRelsType = relArr[1];
    if (prvsRelsName == parent.relName && prvsRelsType == parent.relType) {
    }
    else {
        return 2;
    }
}
// Checking whether Block Field Custom Attribute can be deleted
function fnCheckCustAttr(blkName, fieldName, CustAttr) {
    if (getXMLString(basedom) != "") {
        if (selectSingleNode(basedom, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']") !== null) {
            var basedisptype = getNodeText(selectSingleNode(basedom, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']/DISPLAY_TYPE"));
            var consdisptype = document.getElementById('DISPLAY_TYPE_BLKF').value;
            if ((consdisptype == basedisptype) || (consdisptype == 'RADIO' && basedisptype == 'SELECT') || (consdisptype == 'SELECT' && basedisptype == 'RADIO')) {
                var baseCustAttr = selectNodes(basedom, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']/RAD_FIELD_CUSTOM_ATTRS");
                for (var i = 0;i < baseCustAttr.length;i++) {
                    if (getNodeText(selectSingleNode(baseCustAttr[i], "ATTR_NAME")) == CustAttr) {
                        return 1;
                    }
                }
            }
            else {
                return 3;
            }
        }
    }
    if (selectNodes(dom, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME='" + CustAttr + "']").length != 0) {
        var RelNameTyp = setReleaseNameAndType("//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + fieldName + "']/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME='" + CustAttr + "']");
        relArr = RelNameTyp.split("~");
        prvsRelsName = relArr[0];
        prvsRelsType = relArr[1];
        if (prvsRelsName == parent.relName && prvsRelsType == parent.relType) {
        }
        else {
            return 2;
        }
    }
}
// Checking whether Screen Arguments can be deleted
function fnCheckScrArgnts(scrName, scrArg) {
    if (getXMLString(basedom) != "") {
        var baseScrArgs = selectNodes(basedom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS");
        for (var i = 0;i < baseScrArgs.length;i++) {
            if (getNodeText(selectSingleNode(baseScrArgs[i], "SCREEN_ARG_NAME")) == scrArg) {
                return 1;
            }
        }
    }
    if (selectNodes(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS[SCREEN_ARG_NAME='" + scrArg + "']").length != 0) {
        var RelNameTyp = setReleaseNameAndType("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/SCREEN_ARGS[SCREEN_ARG_NAME='" + scrArg + "']");
        relArr = RelNameTyp.split("~");
        prvsRelsName = relArr[0];
        prvsRelsType = relArr[1];
        if (prvsRelsName == parent.relName && prvsRelsType == parent.relType) {
        }
        else {
            return 2;
        }
    }
}
// Checking whether dataSource Field can be deleted
function fnCheckDataSrcFld(dsrName, fldName) {
    if (getXMLString(basedom) != "") {
        var baseDscsflds = selectNodes(basedom, "//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsrName + "']/RAD_FIELDS");
        for (var i = 0;i < baseDscsflds.length;i++) {
            if (getNodeText(selectSingleNode(baseDscsflds[i], "COLUMN_NAME")) == fldName) {
                return 1;
            }
        }
    }
    var RelNameTyp = setReleaseNameAndType("//RAD_KERNEL/RAD_DATASOURCES[DATASRC_NAME='" + dsrName + "']/RAD_FIELDS[COLUMN_NAME='" + fldName + "']");
    relArr = RelNameTyp.split("~");
    prvsRelsName = relArr[0];
    prvsRelsType = relArr[1];
    if (prvsRelsName == parent.relName && prvsRelsType == parent.relType) {
    }
    else {
        return 2;
    }
}
// Checking whether LOV can be deleted
function fnCheckLov(lovName) {
    if (getXMLString(basedom) != "") {
        var baseLovs = selectNodes(basedom, "//RAD_KERNEL/RAD_LOVS");
        for (var i = 0;i < baseLovs.length;i++) {
            if (getNodeText(selectSingleNode(baseLovs[i], "LOV_NAME")) == lovName) {
                return 1;
            }
        }
    }
}
// Checking whether Fieldset can be deleted
function fnCheckFieldSet(fldsetName) {
    if (getXMLString(basedom) != "") {
        var baseFldSets = selectNodes(basedom, "//RAD_KERNEL/RAD_FIELDSETS ");
        for (var i = 0;i < baseFldSets.length;i++) {
            if (getNodeText(selectSingleNode(baseFldSets[i], "FIELDSET_NAME")) == fldsetName) {
                return 1;
            }
        }
    }
    var RelNameTyp = setReleaseNameAndType("//RAD_KERNEL/RAD_FIELDSETS[FIELDSET_NAME='" + fldsetName + "']");
    relArr = RelNameTyp.split("~");
    prvsRelsName = relArr[0];
    prvsRelsType = relArr[1];
    if (prvsRelsName == parent.relName && prvsRelsType == parent.relType) {
    }
    else {
        return 2;
    }
}
// Checking whether Screen can be deleted
function fnCheckScreens(scrName) {
    if (getXMLString(basedom) != "") {
        var baseFldSets = selectNodes(basedom, "//RAD_KERNEL/RAD_SCREENS ");
        for (var i = 0;i < baseFldSets.length;i++) {
            if (getNodeText(selectSingleNode(baseFldSets[i], "SCREEN_NAME")) == scrName) {
                return 1;
            }
        }
    }
    var RelNameTyp = setReleaseNameAndType("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']");
    relArr = RelNameTyp.split("~");
    prvsRelsName = relArr[0];
    prvsRelsType = relArr[1];
    if (prvsRelsName == parent.relName && prvsRelsType == parent.relType) {
    }
    else {
        return 2;
    }
}
// Checking whether Tab can be deleted
function fnCheckTabs(scrName, scrPrtn, tabName) {
    if (getXMLString(basedom) != "") {
        var baseFldSets = selectNodes(basedom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrPrtn + "/RAD_TABS");
        for (var i = 0;i < baseFldSets.length;i++) {
            if (getNodeText(selectSingleNode(baseFldSets[i], "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrPrtn + "/RAD_TABS")) == tabName) {
                return 1;
            }
        }
    }
    var RelNameTyp = setReleaseNameAndType("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrPrtn + "/RAD_TABS[TAB_NAME='" + tabName + "']");
    relArr = RelNameTyp.split("~");
    prvsRelsName = relArr[0];
    prvsRelsType = relArr[1];
    if (prvsRelsName == parent.relName && prvsRelsType == parent.relType) {
    }
    else {
        return 2;
    }
}
// Checking whether Section can be deleted
function fnCheckSections(scrName, scrPrtn, tabName, secName) {
    if (getXMLString(basedom) != "") {
        var baseFldSets = selectNodes(basedom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrPrtn + "/RAD_TABS[TAB_NAME='" + tabName + "']/RAD_SECTIONS");
        for (var i = 0;i < baseFldSets.length;i++) {
            if (getNodeText(selectSingleNode(baseFldSets[i], "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrPrtn + "/RAD_TABS[TAB_NAME='" + tabName + "']/RAD_SECTIONS")) == secName) {
                return 1;
            }
        }
    }
    var RelNameTyp = setReleaseNameAndType("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrPrtn + "/RAD_TABS[TAB_NAME='" + tabName + "']/RAD_SECTIONS[SECTION_NAME='" + secName + "']");
    relArr = RelNameTyp.split("~");
    prvsRelsName = relArr[0];
    prvsRelsType = relArr[1];
    if (prvsRelsName == parent.relName && prvsRelsType == parent.relType) {
    }
    else {
        return 2;
    }
}
// Checking whether Partition can be deleted
function fnCheckPartition(scrName, scrPrtn, tabName, secName, parName) {
    if (getXMLString(basedom) != "") {
        var basePartition = selectNodes(basedom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrPrtn + "/RAD_TABS[TAB_NAME='" + tabName + "']/RAD_SECTIONS[SECTION_NAME='" + secName + "']/RAD_PARTITIONS[PARTITION_SL_NO='" + parName + "']");
        for (var i = 0;i < basePartition.length;i++) {
            if (getNodeText(selectSingleNode(basePartition[i], "PARTITION_SL_NO")) == parName) {
                return 1;
            }
        }
    }
    if (selectNodes(dom, "//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrPrtn + "/RAD_TABS[TAB_NAME='" + tabName + "']/RAD_SECTIONS[SECTION_NAME='" + secName + "']/RAD_PARTITIONS[PARTITION_SL_NO='" + parName + "']").length != 0) {
        var RelNameTyp = setReleaseNameAndType("//RAD_KERNEL/RAD_SCREENS[SCREEN_NAME='" + scrName + "']/" + scrPrtn + "/RAD_TABS[TAB_NAME='" + tabName + "']/RAD_SECTIONS[SECTION_NAME='" + secName + "']/RAD_PARTITIONS[PARTITION_SL_NO='" + parName + "']");
        relArr = RelNameTyp.split("~");
        prvsRelsName = relArr[0];
        prvsRelsType = relArr[1];
        if (prvsRelsName == parent.relName && prvsRelsType == parent.relType) {
        }
        else {
            return 2;
        }
    }
}
// Checking whether DataSource can be detached from DataBlock 
function fnCheckDSRDtchfrmBlk(dsrName, blkname) {
    if (parent.chngUIFlg == "Y") {
        return 3;
    }
    if (getXMLString(basedom) != "") {
        var chckBlk = fnCheckDataBlk(blkname);
        if (chckBlk != 1) {
            return;
        }
        var baseDscs = selectNodes(basedom, "//RAD_KERNEL/RAD_DATASOURCES");
        var baseBlks = selectNodes(basedom, "//RAD_KERNEL/RAD_DATA_BLOCKS[BLOCK_NAME='" + blkname + "']/BLK_DATASOURCES");
        for (var i = 0;i < baseDscs.length;i++) {
            if (getNodeText(selectSingleNode(baseDscs[i], "DATASRC_NAME")) == dsrName) {
                for (var k = 0;k < baseBlks.length;k++) {
                    if (getNodeText(selectSingleNode(baseBlks[k], "DATASOURCE_NAME")) == dsrName) {
                        return 1;
                    }
                }
            }
        }
    }
    var blockfields = selectNodes(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkname + "']/RAD_BLK_FIELDS");
    for (var i = 0;i < blockfields.length;i++) {
        if (getNodeText(selectSingleNode(blockfields[i], 'DBT')) == dsrName) {
            var fldname = getNodeText(selectSingleNode(blockfields[i], 'FIELD_NAME'));
            var val1 = fnCheckDataBlkFld(blkname, fldname);
            if (val1 == 2) {
                return 2;
            }
        }
    }

}
//To derive Release Name and release Type  of the particular Node
function setReleaseNameAndType(xpath) {
    if (selectSingleNode(selectNodes(dom, xpath)[0], "RELEASE_NAME") == null) {
        var preNode = dom.createElement("RELEASE_NAME");
        selectNodes(dom, xpath)[0].appendChild(preNode);
        setNodeText(selectSingleNode(selectNodes(dom, (xpath))[0], "RELEASE_NAME"), "BASE_RELEASE");
    }
    if (selectSingleNode(selectNodes(dom, xpath)[0], "RELEASE_TYPE") == null) {
        var preNode = dom.createElement("RELEASE_TYPE");
        selectNodes(dom, xpath)[0].appendChild(preNode);
        setNodeText(selectSingleNode(selectNodes(dom, (xpath))[0], "RELEASE_TYPE"), "KERNEL");
    }
    var prvsRelsName = getNodeText(selectSingleNode(selectNodes(dom, xpath)[0], "RELEASE_NAME"));
    var prvsRelsType = getNodeText(selectSingleNode(selectNodes(dom, xpath)[0], "RELEASE_TYPE"));
    if (prvsRelsName == "") {
        prvsRelsName = "10.3";
    }
    if (prvsRelsType == "") {
        prvsRelsType = "KERNEL";
    }
    return prvsRelsName + "~" + prvsRelsType;
}
//Removing a node from dom 
function fnRemoveChildren(node) {
    for (var i = 0;i < node.length;i++) {
        x = node[i];
        x.parentNode.removeChild(x);
    }
}
//rename functions start here 
// Entry point on clicking Rename (launching of RadAddElemnts.jsp)
function fnRename(val, flag) {
    var xpathvalues = getNodepath(val);
    var xpath = xpathvalues[0];
    var formName = xpathvalues[1];
    var index = "";
    var ColumnName = "New Value"
    var Title = "";
    var oldval = "";
    var blkName = "";
    var defaultValue = "";
    relType = parent.relType;
    index = clickedobjects[0];
    var screensec = "";
    if (clickedobjects[2] != "") {
        screensec = clickedobjects[2];
    }
    if (screensec == "HEADER" || screensec == "FOOTER" || screensec == "BODY") {
        for (var i = 0;i < clickedobjects.length;i++) {
            renameObject = TreeObjectsArray[screensec][i];
        }
    }
    else {
        for (var i = 0;i < clickedobjects.length;i++) {
            renameObject = TreeObjectsArray[index][i];
        }
    }
    if (renameObject == "BNM") {
        Title = "Rename RAD Block";
        defaultValue = "BLK_";
    }
    else if (renameObject == "BFD") {
        Title = "Rename RAD Block Field"
        defaultValue = "";
    }
    else if (renameObject == "FDN") {
        Title = "Rename RAD Field Set"
        defaultValue = "FST_";
    }
    else if (renameObject == "LNM") {
        Title = "Rename RAD LOV"
        defaultValue = "LOV_";
    }
    else if (renameObject == "SSC") {
        Title = "Rename RAD Screen";
        defaultValue = "CVS_";
    }
    else if (renameObject == "TAB") {
        Title = "Rename RAD  Tab";
        defaultValue = "TAB_";
    }
    else if (renameObject == "SEC") {
        defaultValue = "SEC_";
        Title = "Rename RAD Section";
    }
    selectedval = renameObject;
    parent.selectedval = selectedval;
    attr = val;
    parent.attr = attr;
    reNamepath = xpath;
    renameFlg = "YES";
    if (flag == "") {
        menuobj.style.visibility = "hidden";
    }
    loadSubScreenDIV("ChildWin", "RadAddElements.jsp?Title=" + Title + "&ColumnName=" + ColumnName + "&defaultValue=" + defaultValue, "Lov_Window", "Height:200; Width:400; status=no;help:no;");
}
//Function for Processing of Renaming after entering the new Name
function fnRenameval(renameObject) {
    NewValue = parent.element;
    xpath = parent.reNamepath;
    dom = parent.dom;
    clickedobjects = parent.clickedobjects;
    val = parent.attr;
    basedom = parent.basedom;
    releaseName = parent.relName;
    releaseType = parent.relType;
    if (renameObject == "BNM") {
        oldval = parent.clickedobjects[parent.clickedobjects.length - 1];
        var retv = fnCheckDataBlk(oldval);
        if (!showRenameError(retv))
            return false;
        renameRadBlk(xpath, NewValue, oldval, val);
    }
    else if (renameObject == "BFD") {
        oldval = clickedobjects[clickedobjects.length - 1];
        blkName = clickedobjects[1];
        selectedBlk = clickedobjects[1];
        var retv = fnCheckDataBlkFld(blkName, oldval);
        if (!showRenameError(retv))
            return false;
        renameRadBlkFileds(xpath, NewValue, oldval, blkName, val);
    }
    else if (renameObject == "SSC") {
        oldval = clickedobjects[clickedobjects.length - 1];
        var retv = fnCheckScreens(oldval);
        if (!showRenameError(retv))
            return false;
        renameRadScreen(xpath, NewValue, oldval, val);
    }
    else if (renameObject == "TAB") {
        oldval = clickedobjects[clickedobjects.length - 1];
        var retv = fnCheckTabs(clickedobjects[1], clickedobjects[2], clickedobjects[3]);
        if (!showRenameError(retv))
            return false;
        renameRadTabs(xpath, NewValue, oldval, val);
    }
    else if (renameObject == "SEC") {
        oldval = clickedobjects[clickedobjects.length - 1];
        var retv = fnCheckSections(clickedobjects[1], clickedobjects[2], clickedobjects[3], clickedobjects[4]);
        if (!showRenameError(retv))
            return false;
        renameRadSections(xpath, NewValue, oldval, val);
    }
    else if (renameObject == "FDN") {
        oldval = clickedobjects[clickedobjects.length - 1];
        var retv = fnCheckFieldSet(clickedobjects[1]);
        if (!showRenameError(retv))
            return false;
        renameRadFldSets(xpath, NewValue, oldval, val);
    }
    else if (renameObject == "LNM") {
        oldval = clickedobjects[clickedobjects.length - 1];
        var retv = fnCheckLov(oldval);
        if (!showRenameError(retv))
            return false;
        renameRadLovs(xpath, NewValue, oldval, val);
    }
    return true;
}
//Displaying validation errors if any while Renaming
function showRenameError(retv) {
    if (retv == "1") {
        alertMessage("Rename not allowed to Base Elements...", "I");
        return false;
    }
    else if (retv == "2") {
        alertMessage("Elements From Previous Releases Cannot be Renamed", "I");
        return false;
    }
    return true;
}
//Renaming of datablock Field
function renameRadBlk(xpath, NewVal, oldVal, val) {
    var blockNode = selectSingleNode(dom, xpath);
    var radBlocks = selectNodes(dom, "//RAD_DATA_BLOCKS");
    for (var blksindex = 0;blksindex < radBlocks.length;blksindex++) {
        if (getNodeText(selectSingleNode(radBlocks[blksindex], "BLOCK_PARENT")) == oldVal) {
            setNodeText(selectSingleNode(radBlocks[blksindex], "BLOCK_PARENT"), NewVal);
        }
        var blkFields = selectNodes(radBlocks[blksindex], "RAD_BLK_FIELDS");
        for (var i = 0;i < blkFields.length;i++) {
            if (getNodeText(selectSingleNode(blkFields[i], "RELATED_BLOCK")) == oldVal) {
                setNodeText(selectSingleNode(blkFields[i], "RELATED_BLOCK"), NewVal);
            }
            var blkReturnFields = selectNodes(blkFields[i], "RAD_RETURN_FIELDS");
            for (var index = 0;index < blkReturnFields.length;index++) {
                if (getNodeText(selectSingleNode(blkReturnFields[index], "RETURN_BLK_NAME")) == oldVal) {
                    setNodeText(selectSingleNode(blkReturnFields[index], "RETURN_BLK_NAME"), NewVal);
                }
            }
            var blkBindVars = selectNodes(blkFields[i], "RAD_BIND_VARS");
            for (var index = 0;index < blkBindVars.length;index++) {
                if (getNodeText(selectSingleNode(blkBindVars[index], "BIND_VAR_BLK")) == oldVal) {
                    setNodeText(selectSingleNode(blkBindVars[index], "BIND_VAR_BLK"), NewVal);
                }
            }
            var blkOfflineReturnFields = selectNodes(blkFields[i], "RAD_OFF_LINE_RETURN_FIELDS");
            for (var index = 0;index < blkOfflineReturnFields.length;index++) {
                if (getNodeText(selectSingleNode(blkOfflineReturnFields[index], "RETURN_BLK_NAME")) == oldVal) {
                    setNodeText(selectSingleNode(blkOfflineReturnFields[index], "RETURN_BLK_NAME"), NewVal);
                }
            }
            var blkOfflineBindVars = selectNodes(blkFields[i], "RAD_OFF_LINE_BIND_VARS");
            for (var index = 0;index < blkOfflineBindVars.length;index++) {
                if (getNodeText(selectSingleNode(blkOfflineBindVars[index], "BIND_VAR_BLK")) == oldVal) {
                    setNodeText(selectSingleNode(blkOfflineBindVars[index], "BIND_VAR_BLK"), NewVal);
                }
            }
        }
    }
    var datscrFields = selectNodes(dom, "//RAD_FIELDS");
    for (var index = 0;index < datscrFields.length;index++) {
        if (getNodeText(selectSingleNode(datscrFields[index], "BLOCK_NAME")) == oldVal) {
            setNodeText(selectSingleNode(datscrFields[index], "BLOCK_NAME"), NewVal);
        }
    }
    var radFieldSets = selectNodes(dom, "//RAD_FIELDSETS");
    for (var index = 0;index < radFieldSets.length;index++) {
        if (selectSingleNode(radFieldSets[index], "FIELDSET_BLOCK") != null) {
            if (getNodeText(selectSingleNode(radFieldSets[index], "FIELDSET_BLOCK")) == oldVal) {
                setNodeText(selectSingleNode(radFieldSets[index], "FIELDSET_BLOCK"), NewVal);
            }
        }
    }
    var radCallForms = selectNodes(dom, "//RAD_CALLFORM");
    for (var index = 0;index < radCallForms.length;index++) {
        if (selectSingleNode(radCallForms[index], "CALLFORM_PARENT_BLOCK") != null) {
            if (getNodeText(selectSingleNode(radCallForms[index], "CALLFORM_PARENT_BLOCK")) == oldVal) {
                setNodeText(selectSingleNode(radCallForms[index], "CALLFORM_PARENT_BLOCK"), NewVal);
            }
        }
    }
    if (selectSingleNode(dom, "//RAD_SUMMARY/RSLT_DATABLK") != null) {
        if (getNodeText(selectSingleNode(dom, "//RAD_SUMMARY/RSLT_DATABLK")) == oldVal) {
            setNodeText(selectSingleNode(dom, "//RAD_SUMMARY/RSLT_DATABLK"), NewVal);
        }
    }
    var xsd_node = NewVal.substring(4, NewVal.length);
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
    blockNode.setAttribute("ID", NewVal);
    setNodeText(selectSingleNode(blockNode, "BLOCK_NAME"), NewVal);
    setNodeText(selectSingleNode(blockNode, "XSD_NODE"), xsd_node);
    parent.Preobjec = "BLK~" + NewVal;
    parent.document.getElementById("BLOCK_NAME").value = NewVal;
    updateTreeAfterRename("BLK~" + NewVal, val);
    parent.document.getElementById("BLK~" + NewVal).style.background = 'navy';
    parent.document.getElementById("BLK~" + NewVal).style.color = '#fff';
    parent.previousNode = "BLK~" + NewVal;
    parent.showData("BLK~" + NewVal);
}

//Remaning of Datablock Field
function renameRadBlkFileds(xpath, NewVal, oldVal, blkName, val) {
    var blkField = selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + oldVal + "']")
    var lbl = getNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + oldVal + "']"), "LABEL_CODE"));
    lbl = lbl.substring(lbl.indexOf("LBL_") + 4, lbl.length);
    if (lbl != "") {
        setNodeText(selectSingleNode(selectSingleNode(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + oldVal + "']")), "LABEL_CODE"), "LBL_" + NewVal);
        setNodeText(selectSingleNode(selectSingleNode(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + oldVal + "']")), "XSD_TAG"), NewVal);
    }
    setNodeText(selectSingleNode(selectSingleNode(dom, ("//RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + oldVal + "']")), "FIELD_NAME"), NewVal);
    var parentfld = selectNodes(dom, "//RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS");
    for (var index = 0;index < parentfld.length;index++) {
        if (getNodeText(selectSingleNode(parentfld[index], "PARENT_FIELD")) == oldVal) {
            setNodeText(selectSingleNode(parentfld[index], "PARENT_FIELD"), NewVal);
            selectSingleNode(parentfld[index], "PARENT_FIELD").setAttribute("ID", NewVal);
        }
    }
    var radBlocks = selectNodes(dom, "//RAD_DATA_BLOCKS");
    for (var blksindex = 0;blksindex < radBlocks.length;blksindex++) {
        var blkFields = selectNodes(radBlocks[blksindex], "RAD_BLK_FIELDS");
        for (var i = 0;i < blkFields.length;i++) {
            if (getNodeText(selectSingleNode(blkFields[i], "RELATED_BLOCK")) == blkName && getNodeText(selectSingleNode(blkFields[i], "RELATED_FIELD")) == oldVal) {
                setNodeText(selectSingleNode(blkFields[i], "RELATED_FIELD"), NewVal);
            }
            var blkReturnFields = selectNodes(blkFields[i], "RAD_RETURN_FIELDS");
            for (var index = 0;index < blkReturnFields.length;index++) {
                if (getNodeText(selectSingleNode(blkReturnFields[index], "RETURN_BLK_NAME")) == blkName && getNodeText(selectSingleNode(blkReturnFields[index], "RETURN_FLD_NAME")) == oldVal) {
                    setNodeText(selectSingleNode(blkReturnFields[index], "RETURN_FLD_NAME"), NewVal);
                }
            }
            var blkBindVars = selectNodes(blkFields[i], "RAD_BIND_VARS");
            for (var index = 0;index < blkBindVars.length;index++) {
                if (getNodeText(selectSingleNode(blkBindVars[index], "BIND_VAR_BLK")) == blkName && getNodeText(selectSingleNode(blkBindVars[index], "BIND_VAR_NAME")) == oldVal) {
                    setNodeText(selectSingleNode(blkBindVars[index], "BIND_VAR_NAME"), NewVal);
                }
            }
            var blkOfflineReturnFields = selectNodes(blkFields[i], "RAD_OFF_LINE_RETURN_FIELDS");
            for (var index = 0;index < blkOfflineReturnFields.length;index++) {
                if (getNodeText(selectSingleNode(blkOfflineReturnFields[index], "RETURN_BLK_NAME")) == blkName && getNodeText(selectSingleNode(blkOfflineReturnFields[index], "RETURN_FLD_NAME")) == oldVal) {
                    setNodeText(selectSingleNode(blkOfflineReturnFields[index], "RETURN_FLD_NAME"), NewVal);
                }
            }
            var blkOfflineBindVars = selectNodes(blkFields[i], "RAD_OFF_LINE_BIND_VARS");
            for (var index = 0;index < blkOfflineBindVars.length;index++) {
                if (getNodeText(selectSingleNode(blkOfflineBindVars[index], "BIND_VAR_BLK")) == oldVal && getNodeText(selectSingleNode(blkOfflineBindVars[index], "BIND_VAR_NAME")) == oldVal) {
                    setNodeText(selectSingleNode(blkOfflineBindVars[index], "BIND_VAR_NAME"), NewVal);
                }
            }
        }
    }
    var datscrFields = selectNodes(dom, "//RAD_FIELDS");
    for (var index = 0;index < datscrFields.length;index++) {
        if (getNodeText(selectSingleNode(datscrFields[index], "FIELD_NAME")) == oldVal) {
            setNodeText(selectSingleNode(datscrFields[index], "FIELD_NAME"), NewVal);
        }
    }
    var summary = selectSingleNode(dom, "//RAD_SUMMARY");
    if (summary != null) {
        if (getNodeText(selectSingleNode(summary, "RSLT_DATABLK")) == blkName) {
            if (selectSingleNode(summary, "//SUMMARY_DETAILS[@ID='" + oldVal + "']") != null) {
                setNodeText(selectSingleNode(selectSingleNode(summary, ("//SUMMARY_DETAILS[@ID='" + oldVal + "']")), "FIELD_NAME"), NewVal);
                selectSingleNode(summary, "//SUMMARY_DETAILS[@ID='" + oldVal + "']").setAttribute("ID", NewVal);
            }
        }
    }

    var fldsetName = getNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + blkName + "']/RAD_BLK_FIELDS[FIELD_NAME='" + NewVal + "']"), "FIELDSET_NAME"));
    if (getNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_FIELDSETS[@ID='" + fldsetName + "']"), "FIELDSET_BLOCK")) == blkName) {
        var fldsetflds = selectNodes(dom, "//RAD_FIELDSETS[FIELDSET_NAME='" + fldsetName + "']/FIELDSET_FIELDS");
        for (var i = 0;i < fldsetflds.length;i++) {
            if (getNodeText(selectSingleNode(fldsetflds[i], 'FIELD_NAME')) == oldVal) {
                setNodeText(selectSingleNode(fldsetflds[i], "FIELD_NAME"), NewVal);
                fldsetflds[i].setAttribute("ID", NewVal);
            }
        }

    }

    blkField.setAttribute("ID", NewVal);
    parent.Preobjec = "BLK~" + blkName + "~" + NewVal;
    parent.document.getElementById("FIELD_NAME").value = NewVal;
    updateTreeAfterRename("BLK~" + blkName + "~" + NewVal, val);
    parent.document.getElementById("BLK~" + blkName + "~" + NewVal).style.background = 'navy';
    parent.document.getElementById("BLK~" + blkName + "~" + NewVal).style.color = '#fff';
    parent.previousNode = "BLK~" + blkName + "~" + NewVal;
    parent.showData("BLK~" + blkName + "~" + NewVal);
}
//Renaming a screen
function renameRadScreen(xpath, NewVal, oldval, val) {
    var scr = selectSingleNode(dom, "//RAD_SCREENS[@ID='" + oldval + "']");
    var scrName = getNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_SCREENS[@ID='" + oldval + "']"), "SCREEN_NAME"));
    if (scrName == oldval) {
        setNodeText(selectSingleNode(selectSingleNode(dom, ("//RAD_SCREENS[@ID='" + oldval + "']")), "SCREEN_NAME"), NewVal);
    }
    if (selectNodes(selectNodes(dom, "//RAD_SCREENS[@ID='" + oldval + "']")[0], "//RAD_TABS")) {
        var tabs = selectNodes(selectNodes(dom, "//RAD_SCREENS[@ID='" + oldval + "']")[0], "//RAD_TABS");
        for (var index = 0;index < tabs.length;index++) {
            if (getNodeText(selectSingleNode(tabs[index], "SCREEN_NAME")) == oldval) {
                setNodeText(selectSingleNode(tabs[index], "SCREEN_NAME"), NewVal);
            }
        }
    }
    if (selectNodes(dom, "//RAD_FIELD_EVENTS")) {
        var radEvents = selectNodes(dom, "//RAD_FIELD_EVENTS")
        for (var index = 0;index < radEvents.length;index++) {
            if (getNodeText(selectSingleNode(radEvents[index], "BUTTON_SCREEN")) == oldval) {
                setNodeText(selectSingleNode(radEvents[index], "BUTTON_SCREEN"), NewVal);
            }
            if (getNodeText(selectSingleNode(radEvents[index], "EVENTTYPE")) == "SUBSCREEN" && getNodeText(selectSingleNode(radEvents[index], "SCREEN_NAME")) == oldval) {
                setNodeText(selectSingleNode(radEvents[index], "SCREEN_NAME"), NewVal);
            }
        }
    }
    if (selectNodes(dom, "//RAD_FIELDSETS")) {
        var fldsets = selectNodes(dom, "//RAD_FIELDSETS");
        for (var index = 0;index < fldsets.length;index++) {
            if (getNodeText(selectSingleNode(fldsets[index], "FIELDSET_SCREEN")) == oldval) {
                setNodeText(selectSingleNode(fldsets[index], "FIELDSET_SCREEN"), NewVal);
            }
        }
    }
    scr.setAttribute("ID", NewVal);
    parent.Preobjec = "SCR~" + NewVal;
    updateTreeAfterRename("SCR~" + NewVal, val);
    parent.previousNode = "SCR~" + NewVal;
    parent.showData("SCR~" + NewVal);
}
//renaming a Tab
function renameRadTabs(xpath, NewVal, oldval, val) {
    var scrName = val.split("~")[1];
    var portion = val.split("~")[2];
    var tabName = val.split("~")[3];
    var tab = selectSingleNode(dom, "//RAD_SCREENS[@ID='" + scrName + "']/" + portion + "/RAD_TABS[@ID='" + tabName + "']");
    if (selectNodes(dom, "//RAD_SCREENS[@ID='" + scrName + "']/" + portion + "/RAD_TABS")) {
        var tabs = selectNodes(dom, "//RAD_SCREENS[@ID='" + scrName + "']/" + portion + "/RAD_TABS");
        for (var index = 0;index < tabs.length;index++) {
            if (getNodeText(selectSingleNode(tabs[index], "TAB_NAME")) == oldval) {
                setNodeText(selectSingleNode(tabs[index], "TAB_NAME"), NewVal);
            }
        }
    }
    var sections = selectNodes(dom, "//RAD_SCREENS[@ID='" + scrName + "']/" + portion + "/RAD_TABS[@ID='" + oldval + "']/RAD_SECTIONS");
    for (var index = 0;index < sections.length;index++) {
        if (getNodeText(selectSingleNode(sections[index], "TAB_NAME")) == oldval) {
            setNodeText(selectSingleNode(sections[index], "TAB_NAME"), NewVal);
        }
    }
    if (selectNodes(dom, "//RAD_FIELDSETS")) {
        var fldsets = selectNodes(dom, "//RAD_FIELDSETS");
        for (var index = 0;index < fldsets.length;index++) {
            if (getNodeText(selectSingleNode(fldsets[index], "FIELDSET_SCREEN")) == scrName && getNodeText(selectSingleNode(fldsets[index], "FIELDSET_PORTION")) == portion && getNodeText(selectSingleNode(fldsets[index], "FIELDSET_TAB")) == oldval) {
                setNodeText(selectSingleNode(fldsets[index], "FIELDSET_TAB"), NewVal);
            }
        }
    }
    if (selectNodes(dom, "//RAD_CALLFORM")) {
        var callfrms = selectNodes(dom, "//RAD_CALLFORM");
        for (var index = 0;index < callfrms.length;index++) {
            if (getNodeText(selectSingleNode(callfrms[index], "CALLFORM_DISPLAY_TYPE")) == oldval) {
                setNodeText(selectSingleNode(callfrms[index], "CALLFORM_DISPLAY_TYPE"), NewVal);
            }
        }
    }
    tab.setAttribute("ID", NewVal);
    parent.Preobjec = "SCR~" + scrName + "~" + portion + "~" + NewVal;
    updateTreeAfterRename("SCR~" + scrName + "~" + portion + "~" + NewVal, val);
    parent.previousNode = "SCR~" + scrName + "~" + portion + "~" + NewVal;
    parent.showData("SCR~" + scrName + "~" + portion + "~" + NewVal);
}
//Renaming Sections
function renameRadSections(xpath, NewVal, oldval, val) {
    var scrName = val.split("~")[1];
    var portion = val.split("~")[2];
    var tabName = val.split("~")[3];
    var SecName = val.split("~")[4];
    var sec = selectSingleNode(dom, "//RAD_SCREENS[@ID='" + scrName + "']/" + portion + "/RAD_TABS[@ID='" + tabName + "']/RAD_SECTIONS[@ID='" + SecName + "']");
    if (selectNodes(dom, "//RAD_SCREENS[@ID='" + scrName + "']/" + portion + "/RAD_TABS[@ID='" + tabName + "']/RAD_SECTIONS")) {
        var secs = selectNodes(dom, "//RAD_SCREENS[@ID='" + scrName + "']/" + portion + "/RAD_TABS[@ID='" + tabName + "']/RAD_SECTIONS");
        for (var index = 0;index < secs.length;index++) {
            if (getNodeText(selectSingleNode(secs[index], "SECTION_NAME")) == oldval) {
                setNodeText(selectSingleNode(secs[index], "SECTION_NAME"), NewVal);
            }
        }
    }
    if (selectNodes(dom, "//RAD_FIELDSETS")) {
        var fldsets = selectNodes(dom, "//RAD_FIELDSETS");
        for (var index = 0;index < fldsets.length;index++) {
            if (getNodeText(selectSingleNode(fldsets[index], "FIELDSET_SCREEN")) == scrName && getNodeText(selectSingleNode(fldsets[index], "FIELDSET_PORTION")) == portion && getNodeText(selectSingleNode(fldsets[index], "FIELDSET_TAB")) == tabName && getNodeText(selectSingleNode(fldsets[index], "FIELDSET_SECTION")) == oldval) {
                setNodeText(selectSingleNode(fldsets[index], "FIELDSET_SECTION"), NewVal);
            }
        }
    }
    sec.setAttribute("ID", NewVal);
    parent.Preobjec = "SCR~" + scrName + "~" + portion + "~" + tabName + "~" + NewVal
    updateTreeAfterRename("SCR~" + scrName + "~" + portion + "~" + tabName + "~" + NewVal, val);
    parent.previousNode = "SCR~" + scrName + "~" + portion + "~" + tabName + "~" + NewVal;
    parent.showData("SCR~" + scrName + "~" + portion + "~" + tabName + "~" + NewVal);
}
//Renaming FieldSets
function renameRadFldSets(xpath, NewVal, oldval, val) {
    if (getNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_FIELDSETS[@ID='" + oldval + "']"), "FIELDSET_BLOCK")) != "") {
        var fldSetBlk = getNodeText(selectSingleNode(selectSingleNode(dom, "//RAD_FIELDSETS[@ID='" + oldval + "']"), "FIELDSET_BLOCK"));
        var blk = selectSingleNode(dom, ("//RAD_DATA_BLOCKS[BLOCK_NAME='" + fldSetBlk + "']"));
        var fldsetName = selectNodes(blk, ("RAD_BLK_FIELDS"));
        for (var index = 0;index < fldsetName.length;index++) {
            if (getNodeText(selectSingleNode(fldsetName[index], "FIELDSET_NAME")) == oldval) {
                setNodeText(selectSingleNode(fldsetName[index], "FIELDSET_NAME"), NewVal);
            }
        }
    }
    if (selectSingleNode(dom, ("//RAD_FIELDSETS[@ID='" + oldval + "']"))) {
        var fld = selectSingleNode(dom, ("//RAD_FIELDSETS[@ID='" + oldval + "']"));
        if (getNodeText(selectSingleNode(selectSingleNode(dom, ("//RAD_FIELDSETS[@ID='" + oldval + "']")), "FIELDSET_NAME")) == oldval) {
            setNodeText(selectSingleNode(selectSingleNode(dom, ("//RAD_FIELDSETS[@ID='" + oldval + "']")), "FIELDSET_NAME"), NewVal);
        }
        fld.setAttribute("ID", NewVal);
    }
    parent.Preobjec = "FLD~" + NewVal;
    updateTreeAfterRename("FLD~" + NewVal, val);
    parent.previousNode = "FLD~" + NewVal
    parent.showData("FLD~" + NewVal);
}
//Renaming Lovs
function renameRadLovs(xpath, NewVal, oldval, val) {
    var dataBlk = selectNodes(dom, "//RAD_DATA_BLOCKS");
    for (var i = 0;i < dataBlk.length;i++) {
        var blkName = getNodeText(selectSingleNode(dataBlk[i], 'BLOCK_NAME'));
        var blkFlds = selectNodes(dataBlk[i], "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkName + "']/RAD_BLK_FIELDS");
        if (blkFlds.length != "0") {
            for (var j = 0;j < blkFlds.length;j++) {
                var fldlovName = getNodeText(selectSingleNode(blkFlds[j], 'LOV_NAME'));
                if (fldlovName == oldval) {
                    setNodeText(selectSingleNode(blkFlds[j], 'LOV_NAME'), NewVal);
                }
            }
        }
    }
    if (selectSingleNode(dom, "//RAD_LOVS[@ID='" + oldval + "']")) {
        var fld = selectSingleNode(dom, "//RAD_LOVS[@ID='" + oldval + "']");
        if (getNodeText(selectSingleNode(selectSingleNode(dom, ("//RAD_LOVS[@ID='" + oldval + "']")), "LOV_NAME")) == oldval) {
            setNodeText(selectSingleNode(selectSingleNode(dom, ("//RAD_LOVS[@ID='" + oldval + "']")), "LOV_NAME"), NewVal);
        }
        fld.setAttribute("ID", NewVal);
    }
    parent.Preobjec = "LOV~" + NewVal;
    updateTreeAfterRename("LOV~" + NewVal, val);
    parent.previousNode = "LOV~" + NewVal
    parent.showData("LOV~" + NewVal);
}
//Checking whether New Name is already present
function checkDublicate(newVal) {
    newVal = newVal.toUpperCase();
    if (renameObject == "BNM") {
        var valid = checkNamingConv(newVal, 'Block Name', 'BLK_');
        if (valid == false) {
            return 3;
        }
        var blkName = selectNodes(dom, "//RAD_KERNEL/RAD_DATA_BLOCKS");
        for (var i = 0;i < blkName.length;i++) {
            if (getNodeText(selectSingleNode(blkName[i], "BLOCK_NAME")) == newVal) {
                return 1;
            }
        }
    }
    else if (renameObject == "BFD") {
        selectedBlk = clickedobjects[1];
        if (selectSingleNode(dom, "//RAD_DATA_BLOCKS[@ID='" + selectedBlk + "']/RAD_BLK_FIELDS[FIELD_NAME='" + newVal + "']") != null)
            return 1;
        else 
            return 0;
    }
    else if (renameObject == "SSC") {
        var valid = checkNamingConv(newVal, 'Screen Name', 'CVS_');
        if (valid == false) {
            return 3;
        }
        if (selectSingleNode(dom, "//RAD_SCREENS[SCREEN_NAME='" + newVal + "']") != null)
            return 1;
        else 
            return 0;
    }
    else if (renameObject == "TAB") {
        var valid = checkNamingConv(newVal, 'TAB Name', 'TAB_');
        if (valid == false) {
            return 3;
        }
        if (selectSingleNode(dom, "//RAD_SCREENS[SCREEN_NAME='" + clickedobjects[1] + "']/" + clickedobjects[2] + "/RAD_TABS[TAB_NAME='" + newVal + "']") != null)
            return 1;
        else 
            return 0;
    }
    else if (renameObject == "SEC") {
        var valid = checkNamingConv(newVal, 'SEC Name', 'SEC_');
        if (valid == false) {
            return 3;
        }
        if (selectSingleNode(dom, "//RAD_SCREENS[SCREEN_NAME='" + clickedobjects[1] + "']/" + clickedobjects[2] + "/RAD_TABS[TAB_NAME='" + clickedobjects[3] + "']/RAD_SECTIONS[SECTION_NAME='" + newVal + "']") != null)
            return 1;
        else 
            return 0;
    }
    else if (renameObject == "FDN") {
        var valid = checkNamingConv(newVal, 'Fieldset Name', 'FST_');
        if (valid == false) {
            return 3;
        }
        if (selectSingleNode(dom, "//RAD_FIELDSETS[@ID='" + newVal + "']") != null)
            return 1;
        else 
            return 0;

    }
}