/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadHandler.js
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
// Function called On Click of any node in the tree
function getNodeDetails(val) {
    debug('getnodeDetails val=' + val);
    var giVal;
    var pfVal;
    if (document.getElementById('ACTION').value == "NONE") {
        return;
    }
    if (giInterFace) {
        if (document.getElementById('FORMAT_ID').value == "") {
            reloadGIForm();
            alertMessage("Please enter Format Id", "E");
            return;
        }
        enablegifields();
        showhidedivid();
        fnincomingvalidations();
    }
    if (parent.chngUIFlg == "Y") {
        var chkNodes = "LOV~CFM~LFM~SUM~ACT~DSN~MND";
        chkNodes = chkNodes.split("~");
        for (var j = 0;j < chkNodes.length;j++) {
            if (val == chkNodes[j]) {
                return;
            }
        }
    }
    if (selected == "SEC") {
        validatePartionRows('partition', clickedobjects[1]);
    }
	
	if (selected == "SUM") {
	
	
/* old criteria backup
	//VINIT
       var parenttableObj = document.getElementById("cri_src_btn");	
    if(document.getElementById('BLIND_SEARCH').checked && parenttableObj.tBodies[0].rows.length<1){
     alertMessage("You have selected Criteria Based Search option so add at least one criteria ",'I');
	 document.getElementById("TSUM").focus();
	 return ;
   //  document.getElementById('BLIND_SEARCH').checked = true;
     }
	 */
	 //081214 starts
	 var parenttableObj = document.getElementById("cri_src_btn");
     var namevalueflag=checkNewCriteria();	 
     if(document.getElementById('BLIND_SEARCH').checked && !namevalueflag){
     alertMessage("At least one minimum search character length is required for criteria based search ",'I');
	 document.getElementById("TSUM").focus();
	 return ;
	// 081214 ends
	 
    }}
    var menudiv = "";
    if (document.getElementById(val).name) {
        selected = document.getElementById(val).name;
        clickedxpath = document.getElementById(val).name;
    }
    else {
        selected = document.getElementById(val).id;
        clickedxpath = document.getElementById(val).id;
    }
    clickedobjects = selected.split("~");
    var index = "";
    index = clickedobjects[0];
    var screensec = "";
    if (clickedobjects[2] != "") {
        screensec = clickedobjects[2];
    }
    for (var i = 0;i < DivGIArray.length;i++) {
        giVal = val.split("~");
        if (DivGIArray[i] == giVal[0]) {
            giInterFace = true;
            break;
        }
    }
    for (var i = 0;i < DivPFArray.length;i++) {
        pfVal = val.split("~");
        if (DivPFArray[i] == pfVal[0]) {
            purgeFilter = true;
            break;
        }
    }
    if (!giInterFace && !purgeFilter) {
        if (screensec == "HEADER" || screensec == "FOOTER" || screensec == "BODY") {
            for (var i = 0;i < clickedobjects.length;i++) {
                selected = TreeObjectsArray[screensec][i];
            }
        }
        else {
            for (var i = 0;i < clickedobjects.length;i++) {
                selected = TreeObjectsArray[index][i];
            }
        }
    }
    if (giInterFace) {
        fnfieldssetvalues('GI_HIN_fields');
        fnfieldssetvalues('GI_BIN_fields');
        fnfieldssetvalues('GI_FIN_fields');
        fnfieldssetvalues('GI_HOUT_fields');
        fnfieldssetvalues('GI_BOUT_fields');
        fnfieldssetvalues('GI_FOUT_fields');
    }
    previousNode = val;
    if (selected == "MND") {
        if (document.getElementById("TXN_BLOCK_NAME") != "") {
            var t = document.getElementById("TXN_BLOCK_NAME").value;
            buildOptions(document.getElementById('TXN_BLOCK_NAME'));
            document.getElementById("TXN_BLOCK_NAME").value = t;
        }
        else if (document.getElementById("TXN_BLOCK_NAME") == "") {
            buildOptions(document.getElementById('TXN_BLOCK_NAME'));
        }
		if (document.getElementById("SRC_BLOCK_NAME") != "") {
            var t = document.getElementById("SRC_BLOCK_NAME").value;
            buildOptions(document.getElementById('SRC_BLOCK_NAME'));
            document.getElementById("SRC_BLOCK_NAME").value = t;
        }
        else if (document.getElementById("SRC_BLOCK_NAME") == "") {
            buildOptions(document.getElementById('SRC_BLOCK_NAME'));
        }
		
        setCustomCheckbox(dom, 'RAD_FUNC_PREFERENCES/LOGGING_REQD', '1~Y', '0~N');
        if (document.getElementsByName('FUNCTION_TYPE')[0].value == "C" && selectNodes(dom, "//RAD_FUNC_PREFERENCES/MENU_DETAILS/FUNCTION_ID").length > 0) {
            if (document.getElementsByName("FUNCTION_ID")[0].value != getNodeText(selectNodes(dom, "//RAD_FUNC_PREFERENCES/MENU_DETAILS/FUNCTION_ID")[0]))
                dom = fnSetChildFId(dom);
        }
    }
    else if (selected == "SUM") {
        var bool = fnValidateSummaryQueryFlds();
        if (bool == false) {
            showData(clickedxpath);
            return;
        }
    }
    fnSetSmrQryOrder();
    if (selected == "ACT") {
        FnShowActions();
    }
    if (parent.vwChg != "Y")
        appendData(val);

    if (!giInterFace && !purgeFilter)
        setScreens(selected);
    else if (purgeFilter)
        setScreens(pfVal[0]);
    else 
        setScreens(giVal[0]);

    if (selected == "PND") {
	fn_Display_Arguments();        
    }
	
    if (selected == "PFD") {
        FnShowTabs('DIV_PRG_BUS_FLTR_D');
    }
    if (selected == "BFD") {
        fn_populate_Blocks('BFD');
        FnShowTabs('DIV_CUST_ATTRS');
    }
    else if (selected == "ACT") {
        setCustomCheckbox(dom, 'ACTION_STAGE_TYPE', '2~Y', '1~N');
    }
    if (!giInterFace && !purgeFilter) {
        showData(clickedxpath);
    }
    else if (purgeFilter) {
        showData(val);
    }
    else {
        if (document.getElementById('FORMAT_ID').value == "") {
            alertMessage("Please enter Format Id", "E");
            return;
        }
        showData(val);
    }

    if (selected == "SEC") {
        enablepartionname();
    }
    else if (selected == "BNM") {
        Populate();
    }
    else if (selected == "SSC") {
        fn_enableScreens(clickedobjects[1], '');
        EnableScrArgs('2');
    }
    else if (selected == "BFD") {
        enableCustAttributes();
        if (parent.chngUIFlg == "Y") {
            disableBlkFlds(clickedobjects[1], clickedobjects[2]);
        }
        EnableDBDFlds();
        LovEnableFlds();
    }
    else if (selected == "FDN") {
        PopulateBlkFields("S");
        fn_enableFieldsetFields(clickedobjects[1], '');
        FildSetValidations(clickedobjects[1]);
        fnHideInactiveFields("FieldsetFields");
    }
    else if (selected == "SUM") {
        if (selectNodes(dom, ("//RAD_SUMMARY")).length == 0) {
            CreateDOM("SUM");
        }
        PopulateDataSourceForSummary("S");
        fnpoplovs('SUM_DTLS');
        FnShowTabs('DIV_SUMORDER');
        FnShowTabs('DIV_DBF');
    }
    else if (selected == "MND") {
        fnAddMenuDtls();
        if (selectNodes(dom, ("//RAD_FUNC_PREFERENCES")).length == 0) {
            CreateDOM("MND");
        }
		FnShowTabs('DIV_MENUTABLS');
    }
    else if (selected == "ACT") {
        EnableFlds('ACTNS_TB');
    }
    else if (selected == "LNM") {
    	fnCombinedButton();
    }
    else if (selected == "CFM") {
        readOnlyFid('CALFRMS');
    }
    else if (selected == "TAB") {
        fn_enableTab(clickedobjects[1], clickedobjects[2], clickedobjects[3], '');
    }
    else if (selected == "PFD") {
        fncheckname();
        fnValidateExpresion();
    }

    if (!giInterFace && !purgeFilter) {
        if (parent.chngUIFlg == 'Y' || document.getElementById('FUNCTION_TYPE').value == "S") {
            if (document.getElementById('bttnAddBlock')) {
                document.getElementById('bttnAddBlock').style.visibility = "hidden";
            }
            if (document.getElementById("bttnAddDataBlockField")) {
                document.getElementById("bttnAddDataBlockField").style.visibility = "hidden";
            }
            if (document.getElementById("bttnDeleteDataBlock")) {
                document.getElementById("bttnDeleteDataBlock").style.visibility = "hidden";
            }
            if (document.getElementById("bttnRenameDataBlock")) {
                document.getElementById("bttnRenameDataBlock").style.visibility = "hidden";
            }
            if (document.getElementById("Undo")) {
                document.getElementById("Undo").style.visibility = "hidden";
            }
            if (document.getElementById("bttnDeleteBlockField")) {
                document.getElementById("bttnDeleteBlockField").style.visibility = "hidden";
            }
            if (document.getElementById("bttnRenameBlockField")) {
                document.getElementById("bttnRenameBlockField").style.visibility = "hidden";
            }
        }
        if (document.getElementById('FUNCTION_TYPE').value == "S") {
            fnDisableBlockElements();
        }
    }
    if (giInterFace) {
        if (selected == "HDRREC") {
            fncheckfieldsdup('GI_HOUT_fields');
            fncheckfieldsdup('GI_HIN_fields');
        }
        else if (selected == "FTRREC") {
            fncheckfieldsdup('GI_FOUT_fields');
            fncheckfieldsdup('GI_FIN_fields');
        }
        else {
            fncheckfieldsdup('GI_BOUT_fields');
            fncheckfieldsdup('GI_BIN_fields');
        }
    }

}

//Appends the Data from the Screen to the DOM
function appendData(val) {
    var currType = val;
    var formName = "";
    var xpath = "";
    var tabelName = "";
    var Curobjec = "";
    var CurrNode = "";
    if (val != "") {
        Curobjec = val;
        CurrNode = val;
    }
    var xpathvalues = new Array();
    xpathvalues = getNodepath(Preobjec);
    xpath = xpathvalues[0];
    formName = xpathvalues[1];
    if (Preobjec != "") {
        var NumberOfTables = document.getElementById(formName).getElementsByTagName("fieldset");
        for (var tableIndex = 0;tableIndex < NumberOfTables.length;tableIndex++) {
            xpath = xpathvalues[0];
            tblObj = NumberOfTables[tableIndex];
            if (selectSingleNode(dom, xpath) != null) {
                var divele = tblObj.getElementsByTagName("*");
                for (index = 0;index < divele.length;index++) {
                    if (divele[index].tagName == "INPUT" || divele[index].tagName == "SELECT" || divele[index].tagName == "TEXTAREA") {
                        var value = getValue(divele[index]);
                        var valueArray = value.split("!");
                        var nodename = valueArray[1];
                        var nodevalue = valueArray[0];
                       
                        if (nodename != "") {
                        	 if(nodename=="REST_SERVICE_NAME"){
                        		 xpath_xsd="//RAD_KERNEL/RAD_REST_ACTIONS"; 
                        		  var rootnode = selectSingleNode(dom, xpath_xsd);
                        		 if (rootnode == null) {
                        	            var mainNode = selectSingleNode(dom, ("//RAD_FUNCTIONS/RAD_KERNEL"));
                        	            var domElement = dom.createElement("RAD_REST_ACTIONS");
                        	            mainNode.appendChild(domElement);
                        	        }
                        		 
                        		 
                        		 try {
                                     setNodeText(selectSingleNode(selectSingleNode(dom, xpath_xsd), nodename), nodevalue);
                                 }
                                 catch (e) {
                                     createElementInDOM(nodename, xpath_xsd, formName);
                                     setNodeText(selectSingleNode(selectSingleNode(dom, xpath_xsd), nodename), nodevalue);
                                 }
                        	 }
                            try {
                                setNodeText(selectSingleNode(selectSingleNode(dom, xpath), nodename), nodevalue);
                            }
                            catch (e) {
                                createElementInDOM(nodename, xpath, formName);
                                setNodeText(selectSingleNode(selectSingleNode(dom, xpath), nodename), nodevalue);
                            }
                        }
                    }
                }
            }
        }
        var NumberOfTables = document.getElementById(formName).getElementsByTagName("TABLE");
        for (var tableIndex = 0;tableIndex < NumberOfTables.length;tableIndex++) {
            if (NumberOfTables[tableIndex].getAttribute("TYPE") == "MULTIPLE" && NumberOfTables[tableIndex].getAttribute("VIEW") == "NO") {
                appendMultiple(xpathvalues, NumberOfTables[tableIndex]);
            }
            else if (NumberOfTables[tableIndex].getAttribute("TYPE") == "BLOCK") {
                var tableName = NumberOfTables[tableIndex].id;
                var tableObject = NumberOfTables[tableIndex];
                if (tableName == 'blkDsns') {
                    if (tableObject.getAttribute("PARENT") == "YES") {
                        parentPath = xpath;
                        multinode = multipleTableArray[tableName];
                        xpath += "/" + multinode;
                    }
                    else {
                        multinode = multipleTableArray[tableName];
                        parentPath = "//RAD_FUNCTIONS/RAD_KERNEL"
                    }
                    var removeNode = selectNodes(dom, xpath);
                    for (var i = 0;i < removeNode.length;i++) {
                        removeNode[i].parentNode.removeChild(removeNode[i]);
                    }
                    var len = document.getElementById('DBLK_DATASOURCE_NAME').options.length;
                    for (var index = 0;index < len;index++) {
                        var rootnode = selectSingleNode(dom, parentPath);
                        var domElement = dom.createElement(multinode);
                        rootnode.appendChild(domElement);
                        RadCallFormArray = elementArray[multinode].split("~");
                        for (var i = 0;i < RadCallFormArray.length;i++) {
                            var childElements = dom.createElement(RadCallFormArray[i]);
                            domElement.appendChild(childElements);
                        }
                        var txt = document.getElementById('DBLK_DATASOURCE_NAME').options[index].text;
                        setNodeText(selectNodes(dom, xpath)[index].childNodes[0], txt);
                        domElement.setAttribute("ID", getNodeText(selectNodes(dom, xpath)[index].childNodes[0]));
                    }
                }
            }
        }
    }
    if (Preobjec.split("~").length == 3 && Preobjec.split("~")[0] == "DSN") {
        fnSetMaxLength(Preobjec.split("~")[1], Preobjec.split("~")[2]);
    }
    PreNode = CurrNode;
    Preobjec = Curobjec;
}
//Appending Multiple Entry Tables to DOM
function appendMultiple(xpathvalues, tableObject) {
    xpath = xpathvalues[0];
    formName = xpathvalues[1];
    var tabelName = tableObject.id;
    var parentPath = "";
    var multinode = "";
    var flag = false;
    if (tableObject.getAttribute("PARENT") == "YES") {
        parentPath = xpath;
        multinode = multipleTableArray[tabelName];
        xpath += "/" + multinode;
    }
    else {
        multinode = multipleTableArray[tabelName];
        parentPath = "//RAD_FUNCTIONS/RAD_KERNEL"
    }
    
    if (tabelName == "REST_TABLE") {
        parentPath = "//RAD_KERNEL/RAD_REST_ACTIONS";
        	xpath = "//RAD_KERNEL/RAD_REST_ACTIONS/RAD_REST_ACTION";
    }
    
    if (giInterFace) {
        flag = fnCheckGiDel(tabelName);
    }
    var pfxpath = xpath;
    if (tabelName == "PF_B_FILTERS" || tabelName == "PF_E_FILTERS") {

        if (tabelName == "PF_E_FILTERS") {
            xpath += "[@ATR='E']";
        }
        if (tabelName == "PF_B_FILTERS") {
            xpath += "[@ATR='B']";
        }

    }

    if (!flag) {
        var node = selectNodes(dom, xpath);
        if (node != null) {
            for (var i = 0;i < node.length;i++) {
                node[i].parentNode.removeChild(node[i]);
            }

        }
    }
    var tableref = tableObject;
    for (var index = 0;index < tableref.tBodies[0].rows.length;index++) {
        var rootnode = selectSingleNode(dom, parentPath);
        if (rootnode == null && tabelName == 'ACTNS_TB') {
            var mainNode = selectSingleNode(dom, ("//RAD_FUNCTIONS/RAD_KERNEL"));
            var domElement = dom.createElement("RAD_ACTIONS");
            mainNode.appendChild(domElement);
        }
        if (rootnode == null && tabelName == 'REST_TABLE') {
            var mainNode = selectSingleNode(dom, ("//RAD_FUNCTIONS/RAD_KERNEL"));
            var domElement = dom.createElement("RAD_REST_ACTIONS");
            mainNode.appendChild(domElement);
        }
        rootnode = selectSingleNode(dom, parentPath);
        var nodeElement = dom.createElement(multinode);
        rootnode.appendChild(nodeElement);
        RadCallFormArray = elementArray[multinode].split("~");
        for (var i = 0;i < RadCallFormArray.length;i++) {
            var childElements = dom.createElement(RadCallFormArray[i]);
            nodeElement.appendChild(childElements);
        }
        for (var cellindex = 0;cellindex < tableref.tBodies[0].rows[index].cells.length;cellindex++) {
            var tableobject = tableref.tBodies[0].rows[index].cells[cellindex];
            if (tableobject.children.length > 0) {
                var value = getTabValue(tableobject);
                var valueArray = value.split("!");
                var nodename = valueArray[1];
                var nodevalue = valueArray[0];
                if (nodename != "") {
                    if (tabelName == "PF_E_FILTERS") {
                        nodeElement.setAttribute("ATR", "E");
                    }
                    if (tabelName == "PF_B_FILTERS") {
                        nodeElement.setAttribute("ATR", "B");
                    }

                    try {
                        setNodeText(selectSingleNode(selectNodes(dom, (xpath))[index], nodename), nodevalue);
                        nodeElement.setAttribute("ID", getNodeText(selectNodes(dom, (xpath))[index].childNodes[0]));
                        if (tabelName == "AMOUNTTAB") {
                            nodeElement.setAttribute("ID", index);
                        }
                    }
                    catch (e) {
                    }
                }
            }
        }
    }
}
//Set Style to Block for the current working Screen 
function setScreens(screenId) {
    if (!giInterFace && !purgeFilter) {
        for (var i = 0;i < DivNamesArray.length;i++) {
            document.getElementById(DivNamesArray[i]).style.display = "none";
        }
        try {
            document.getElementById(screenId).style.display = "block";
            if (screenId == "SUM")
                PopulateSumary();
        }
        catch (e) {
        }
    }
    else if (purgeFilter) {
        setPFScreens(screenId);
    }
    else {
        setGIScreens(screenId);
    }
}
//Paint the Screen Fields using DOM values
function showData(ActiveObject) {
    if (ActiveObject == "") {
        ActiveObject = undo;
    }
    else {
        undo = ActiveObject;
    }
    var parentPath = "";
    var pathArray = new Array();
    var pathArray = getNodepath(ActiveObject);
    xpath = pathArray[0];
    formName = pathArray[1];
    var NumberOfTables = document.getElementById(formName).getElementsByTagName("fieldset");
    for (var tableIndex = 0;tableIndex < NumberOfTables.length;tableIndex++) {
        var tblObj = NumberOfTables[tableIndex];
        xpath = pathArray[0];
        var divele = tblObj.getElementsByTagName("*");
        for (index = 0;index < divele.length;index++) {
            if (divele[index].tagName == "INPUT" || divele[index].tagName == "SELECT" || divele[index].tagName == "TEXTAREA") {
            	 xpath = pathArray[0];
                var cellname = getCellName(divele[index]);
                if (cellname != "") {
                    try {
                        if (cellname == 'LOV_NAME_QUERY') {
                            cellname = 'LOV_NAME';
                        }
                        if(cellname=="REST_SERVICE_NAME"){
                      		 xpath="//RAD_KERNEL/RAD_REST_ACTIONS"; 
                      	   }
                        var nodeValue = getNodeText(selectSingleNode(selectSingleNode(dom, xpath), cellname));
                        
                        if (parent.vwChg == "Y") {
                            if (nodeValue != "" && selectSingleNode(dom, xpath)) {
                                action = selectSingleNode(dom, xpath).getAttribute("Action");
                                var change = selectSingleNode(dom, xpath).getAttribute("Changed");
                            }
                            if (typeof action != "undefined" && action != null && action == "New") {
                                var color = "009900";
                                setValue(divele[index], nodeValue, cellname, color);
                            }
                            else if (typeof change != "undefined" && change != null && change.indexOf(cellname) !=  - 1) {
                                var color = "#0033CC";
                                setValue(divele[index], nodeValue, cellname, color);
                            }
                            else 
                                setValue(divele[index], nodeValue, cellname, "");
                        }
                        else {
                            setValue(divele[index], nodeValue, cellname);
                        }
                    }
                    catch (e) {
                    }
                }
            }
        }
    }
    var NumberOfTables = document.getElementById(formName).getElementsByTagName("TABLE");
    for (var tableIndex = 0;tableIndex < NumberOfTables.length;tableIndex++) {
        if (NumberOfTables[tableIndex].getAttribute("TYPE") == "MULTIPLE") {
            var tabelName = NumberOfTables[tableIndex].id;
            if (tabelName != 'ACTNS_TB')
                deleteAll(tabelName);
            xpath = pathArray[0];
            if (NumberOfTables[tableIndex].getAttribute("PARENT") == "YES") {
                var multinode = multipleTableArray[tabelName];
                xpath += "/" + multinode;
            }
            
            if (tabelName == "REST_TABLE") {
                parentPath = "//RAD_KERNEL/RAD_REST_ACTIONS";
                	xpath = "//RAD_KERNEL/RAD_REST_ACTIONS/RAD_REST_ACTION";
            }
            
            
            if (tabelName == "PF_B_FILTERS" || tabelName == "PF_E_FILTERS") {
                if (tabelName == "PF_E_FILTERS") {
                    xpath += "[@ATR='E']";
                }
                if (tabelName == "PF_B_FILTERS") {
                    xpath += "[@ATR='B']";
                }

            }
            for (var i = 0;i < selectNodes(dom, xpath).length;i++) {
                if (selectNodes(dom, xpath).length > 0) {
                    if (tabelName != 'ACTNS_TB') {
                        addNewRow(tabelName);
                    }
                    var tableref = document.getElementById(tabelName);
                    for (var cellindex = 0;cellindex < tableref.tBodies[0].rows[i].cells.length;cellindex++) {
                        var tableobject = tableref.tBodies[0].rows[i].cells[cellindex];
                        if (tableobject.children.length > 0) {
                            var cellname = getTabCellName(tableobject);
                            if (cellname != "") {
                                try {
                                    if (cellname == 'LOV_NAME_QUERY') {
                                        cellname = 'LOV_NAME';
                                    }
                                    if (cellname == 'RELATION_WITH_PARENT_GRID') {
                                        cellname = 'RELATION_WITH_PARENT';
                                    }

                                    var nodeValue = getNodeText(selectSingleNode(selectNodes(dom, xpath)[i], cellname));

                                    if (parent.vwChg == "Y") {
                                        if (nodeValue != "" && selectSingleNode(dom, xpath)) {
                                            action = selectNodes(dom, xpath)[i].getAttribute("Action");
                                            var change = selectNodes(dom, xpath)[i].getAttribute("Changed");
                                        }
                                        if (tableobject.children.length > 0) {
                                            if (typeof action != "undefined" && action != null && action == "New") {
                                                var color = "009900";
                                                setTabValue(tableobject, nodeValue, cellname, color);
                                            }
                                            else if (typeof action != "undefined" && action != null && action == "Deleted") {
                                                var color = "990000";
                                                setTabValue(tableobject, nodeValue, cellname, color);
                                            }
                                            else if (typeof change != "undefined" && change != null && change.indexOf(cellname) !=  - 1) {
                                                var color = "#0033CC";
                                                setTabValue(tableobject, nodeValue, cellname, color);
                                            }
                                            else 
                                                setTabValue(tableobject, nodeValue, cellname, "");
                                        }
                                    }
                                    else {
                                        if (tableobject.children.length > 0) {
                                            setTabValue(tableobject, nodeValue, cellname, "");
                                        }
                                    }
                                }
                                catch (e) {
                                }
                            }
                        }
                    }
                }
            }
            if (tabelName == "partition" || tabelName == "FieldsetFields") {
                for (var i = 0;i < selectNodes(dom, xpath).length;i++) {
                    if (selectNodes(dom, xpath).length > 0) {
                        for (var j = 0;j < selectNodes(dom, (xpath))[i].childNodes.length;j++) {
                            var nodename = selectNodes(dom, (xpath))[i].childNodes[j].nodeName;
                            var nodeValue = getNodeText(selectNodes(dom, (xpath))[i].childNodes[j]);
                            var tableref = document.getElementById(tabelName);
                            for (var index = 0;index < tableref.tBodies[0].rows.length;index++) {
                                for (var cellindex = 0;cellindex < tableref.tBodies[0].rows[index].cells.length;cellindex++) {
                                    var tableobject = tableref.tBodies[0].rows[i].cells[cellindex];
                                    setValue(tableobject.childNodes[0], nodeValue, nodename, "");
                                }
                            }
                        }
                    }
                }
            }
        }
        else if (NumberOfTables[tableIndex].getAttribute("TYPE") == "BLOCK") {
            var tabelName = NumberOfTables[tableIndex].id;
            if (NumberOfTables[tableIndex].getAttribute("PARENT") == "YES") {
                var multinode = multipleTableArray[tabelName];
                xpath += "/" + multinode;
            }
            document.getElementById('DBLK_DATASOURCE_NAME').options.length = 0;
            for (var index = 0;index < selectNodes(dom, xpath).length;index++) {
                if (selectNodes(dom, xpath).length > 0) {
                    for (var j = 0;j < selectNodes(dom, (xpath))[index].childNodes.length;j++) {
                        var nodeValue = getNodeText(selectNodes(dom, (xpath))[index].childNodes[j]);
                        if (nodeValue != " ")
                            addOption(document.getElementById('DBLK_DATASOURCE_NAME'), nodeValue, nodeValue, false);

                    }
                }
            }
        }
    }
    if (giInterFace) {
        fnDelDuplGiTableAfterShowData();
    }
}
//Get Cell Name
function getCellName(tableobject) {
    var name = "";
    var tagName = tableobject.tagName;
    if (tagName == "INPUT") {
        name = tableobject.name;
    }
    else if (tagName == "TEXTAREA") {
        name = tableobject.name;
    }
    else if (tagName == "SELECT") {
        name = tableobject.name;
    }
    return name;
}
//Get Cell Name
function getTabCellName(tableobject) {
    var name = "";
    var tagName = tableobject.children[0].tagName;
    if (tagName == "INPUT") {
        name = tableobject.getElementsByTagName('INPUT')[0].name;
    }
    else if (tagName == "SELECT") {
        name = tableobject.getElementsByTagName('SELECT')[0].name;
    }
    return name;
}
//Set Cell Value in Screen from DOM
function setValue(tableobject, value, nodeName, color) {
    var tagName = tableobject.tagName;
    if (tagName == "INPUT") {
        if (tableobject.name == 'LOV_NAME_QUERY') {
            if (nodeName == 'LOV_NAME') {
                nodeName = 'LOV_NAME_QUERY';
            }
        }
        if (tableobject.name == 'RELATION_WITH_PARENT_GRID') {
            if (nodeName == 'RELATION_WITH_PARENT') {
                nodeName = 'RELATION_WITH_PARENT_GRID';
            }
        }
        if (tableobject.name == nodeName) {
            if (tableobject.type == "text") {
                tableobject.value = value;
                tableobject.style.color = color;
            }
            else if (tableobject.type == "checkbox") {
                if (value == "Y") {
                    tableobject.checked = true;
                }
                else {
                    tableobject.checked = false;
                }
                tableobject.style.background = color;
            }
            else if (tableobject.type == "hidden") {
                tableobject.value = value;
            }
        }
    }
    else if (tagName == "TEXTAREA") {
        if (tableobject.name == nodeName) {
            tableobject.value = value;
            tableobject.style.color = color;
        }
    }
    else if (tagName == "LABEL") {
        if (tableobject.name == nodeName) {
            tableobject.innerHTML = value;
            tableobject.style.color = color;
        }
    }
    else if (tagName == "SELECT") {
        var isThere = "NO";
        if (tableobject.name == nodeName) {
            if (nodeName == "ITEM_TYPE") {
                BlkFldItemValidation(xpath);
            }
            else if (nodeName == "PARENT_FIELD") {
                fn_add_flds(clickedobjects[1], 'BFD', 'PARENT_FIELD');
            }
            else if (nodeName == "RELATED_FIELD") {
            }
            else if (nodeName == "FIELDSET_BLOCK") {
                onChangeSelected('DATABLOCK_NAME', 'RAD_DATA_BLOCKS', 'DATABLOCK_NAME', 'FDN');
            }
            var optlen = tableobject.options.length
            for (var i = 0;i < optlen;i++) {
                if (tableobject.options[i].value == value) {
                    tableobject.value = value;
                    isThere = "YES";
                }
            }
            if (isThere == "NO") {
                var optn = document.createElement("OPTION");
                optn.text = value;
                optn.value = value;
                tableobject.options.add(optn);
                tableobject.value = value;
            }
            tableobject.style.color = color;
        }
    }
}
//Set Cell Value in table Screen from DOM
function setTabValue(tableobject, value, nodeName, color) {
    var tagName = tableobject.children[0].tagName;
    if (tagName == "INPUT") {
        if (tableobject.getElementsByTagName('INPUT')[0].name == 'LOV_NAME_QUERY') {
            if (nodeName == 'LOV_NAME') {
                nodeName = 'LOV_NAME_QUERY';
            }
        }
        if (tableobject.getElementsByTagName('INPUT')[0].name == 'RELATION_WITH_PARENT_GRID') {
            if (nodeName == 'RELATION_WITH_PARENT') {
                nodeName = 'RELATION_WITH_PARENT_GRID';
            }
        }
        if (tableobject.getElementsByTagName('INPUT')[0].name == nodeName) {
            if (tableobject.getElementsByTagName('INPUT')[0].type == "text") {
                tableobject.getElementsByTagName('INPUT')[0].value = value;
                tableobject.getElementsByTagName('INPUT')[0].style.color = color;
            }
            else if (tableobject.getElementsByTagName('INPUT')[0].type == "checkbox") {
                if (value == "Y") {
                    tableobject.getElementsByTagName('INPUT')[0].checked = true;
                }
                else {
                    tableobject.getElementsByTagName('INPUT')[0].checked = false;
                }
                tableobject.getElementsByTagName('INPUT')[0].style.background = color;
            }
            else if (tableobject.getElementsByTagName('INPUT')[0].type == "hidden") {
                tableobject.getElementsByTagName('INPUT')[0].value = value;
            }
        }
    }
    else if (tagName == "LABEL") {
        if (tableobject.getElementsByTagName('LABEL')[0].name == nodeName) {
            tableobject.getElementsByTagName('LABEL')[0].innerHTML = value;
            tableobject.getElementsByTagName('LABEL')[0].style.color = color;
        }
    }
    else if (tagName == "SELECT") {
        var isThere = "NO";
        if (tableobject.getElementsByTagName('SELECT')[0].name == nodeName) {
            if (nodeName == "ITEM_TYPE") {
                BlkFldItemValidation(xpath);
            }
            else if (nodeName == "PARENT_FIELD") {
                fn_add_flds(clickedobjects[1], 'BFD', 'PARENT_FIELD');
            }
            else if (nodeName == "RELATED_FIELD") {
            }
            else if (nodeName == "FIELDSET_BLOCK") {
                onChangeSelected('DATABLOCK_NAME', 'RAD_DATA_BLOCKS', 'DATABLOCK_NAME', 'FDN');
            }
            var optlen = tableobject.getElementsByTagName('SELECT')[0].options.length
            for (var i = 0;i < optlen;i++) {
                if (tableobject.getElementsByTagName('SELECT')[0].options[i].value == value) {
                    tableobject.getElementsByTagName('SELECT')[0].value = value;
                    isThere = "YES";
                }
            }
            if (isThere == "NO") {
                var optn = document.createElement("OPTION");
                optn.text = value;
                optn.value = value;
                addOption(tableobject.getElementsByTagName('SELECT')[0], value, value, false);
                //tableobject.getElementsByTagName('SELECT')[0].options.add(optn);
                tableobject.getElementsByTagName('SELECT')[0].value = value;
            }
            tableobject.getElementsByTagName('SELECT')[0].style.color = color;
        }
    }
}
//Get value of a div from Screen
function getValue(tableobject) {
    var value = "";
    var name = "";
    var tagName = tableobject.tagName;
    if (tagName == "INPUT") {
        if (tableobject.getAttribute("type") == "text") {
            value = tableobject.value;
        }
        else if (tableobject.getAttribute("type") == "checkbox") {
            if (tableobject.checked == true) {
                value = "Y";
            }
            else {
                value = "N";
            }
        }
        else if (tableobject.getAttribute("type") == "hidden") {
            value = tableobject.value;
        }
        name = tableobject.name;
    }
    else if (tagName == "TEXTAREA") {
        value = tableobject.value;
        name = tableobject.name;
    }
    else if (tagName == "LABEL") {
        value = tableobject.innerHTML;
        name = "";
    }
    else if (tagName == "SELECT") {
        value = tableobject.value;
        name = tableobject.name;
    }
    if (name == 'LOV_NAME_QUERY') {
        name = 'LOV_NAME';
    }
    return value + "!" + name;
}
//Get value of a table  from Screen
function getTabValue(tableobject) {
    var value = "";
    var name = "";
    var tagName = tableobject.children[0].tagName;
    if (tagName == "INPUT") {
        if (tableobject.getElementsByTagName('INPUT')[0].getAttribute("type") == "text") {
            value = tableobject.getElementsByTagName('INPUT')[0].value;
        }
        else if (tableobject.getElementsByTagName('INPUT')[0].getAttribute("type") == "checkbox") {
            if (tableobject.getElementsByTagName('INPUT')[0].checked == true) {
                value = "Y";
            }
            else {
                value = "N";
            }
        }
        else if (tableobject.getElementsByTagName('INPUT')[0].getAttribute("type") == "hidden") {
            value = tableobject.getElementsByTagName('INPUT')[0].value;
        }
        name = tableobject.getElementsByTagName('INPUT')[0].name;
    }
    else if (tagName == "LABEL") {
        value = tableobject.getElementsByTagName('LABEL')[0].innerHTML;
        name = "";
    }
    else if (tagName == "SELECT") {
        value = tableobject.getElementsByTagName('SELECT')[0].value;
        name = tableobject.getElementsByTagName('SELECT')[0].name;
    }
    if (name == 'LOV_NAME_QUERY') {
        name = 'LOV_NAME';
    }
    return value + "!" + name;
}
//Get NodePath 
function getNodepath(ActiveObject) {
    var xpathArray = new Array();
    var releaseNode = "//" + "RAD_KERNEL";
    var xpath = new Array();
    xpathArray = ActiveObject.split("~");
    if (xpathArray[0] == "DSN") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                xpath[0] = releaseNode + "//RAD_DATASOURCES";
                xpath[1] = "DSN";
                xpath[2] = "GRD";
                xpath[3] = "datasources";
            }
            if (j == 1) {
                xpath[0] = releaseNode + "//RAD_DATASOURCES[@ID=" + "'" + xpathArray[1] + "'" + "]";
                xpath[1] = "DBT";
                xpath[2] = "DTL";

            }
            if (j == 2) {
                xpath[0] = releaseNode + "//RAD_DATASOURCES[@ID=" + "'" + xpathArray[1] + "'" + "]/RAD_FIELDS[@ID=" + "'" + xpathArray[2] + "'" + "]";
                xpath[1] = "DBC";
                xpath[2] = "DTL";
            }
        }
    }
    else if (xpathArray[0] == "SCR") {
        var ScreenSec = "";
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                xpath[0] = releaseNode + "//RAD_SCREENS";
                xpath[1] = "SCR";
                xpath[2] = "GRD";
                xpath[3] = "datasources";
            }
            if (j == 1) {
                xpath[0] = releaseNode + "//RAD_SCREENS[@ID=" + "'" + xpathArray[1] + "'" + "]";
                xpath[1] = "SSC";
                xpath[2] = "DTL";
            }
            if (j == 2) {
                if (xpathArray[2] == "HEADER") {
                    ScreenSec = "HEADER";
                }
                else if (xpathArray[2] == "BODY") {
                    ScreenSec = "BODY";
                }
                else {
                    ScreenSec = "FOOTER";
                }
                xpath[0] = releaseNode + "//RAD_SCREENS[@ID=" + "'" + xpathArray[1] + "'" + "]/" + ScreenSec + "[@ID=" + "'" + xpathArray[2] + "'" + "]";
                xpath[1] = "TAB";
                xpath[2] = "DTL";
            }
            if (j == 3) {
                xpath[0] = releaseNode + "//RAD_SCREENS[@ID=" + "'" + xpathArray[1] + "'" + "]/" + ScreenSec + "[@ID=" + "'" + xpathArray[2] + "'" + "]/RAD_TABS[@ID=" + "'" + xpathArray[3] + "'" + "]";
                xpath[1] = "TAB";
                xpath[2] = "DTL";
            }
            if (j == 4) {
                xpath[0] = releaseNode + "//RAD_SCREENS[@ID=" + "'" + xpathArray[1] + "'" + "]/" + ScreenSec + "[@ID=" + "'" + xpathArray[2] + "'" + "]/RAD_TABS[@ID=" + "'" + xpathArray[3] + "'" + "]/RAD_SECTIONS[@ID=" + "'" + xpathArray[4] + "'" + "]";
                xpath[1] = "SEC";
                xpath[2] = "DTL";
            }
        }

    }
    else if (xpathArray[0] == "BLK") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                xpath[0] = releaseNode + "//RAD_DATA_BLOCKS";
                xpath[1] = "BLK";
                xpath[2] = "GRD";
                xpath[3] = "datasources";
            }
            if (j == 1) {
                xpath[0] = releaseNode + "//RAD_DATA_BLOCKS[@ID=" + "'" + xpathArray[1] + "'" + "]";
                xpath[1] = "BNM";
                xpath[2] = "DTL";
            }
            if (j == 2) {
                xpath[0] = releaseNode + "//RAD_DATA_BLOCKS[@ID=" + "'" + xpathArray[1] + "'" + "]/RAD_BLK_FIELDS[@ID=" + "'" + xpathArray[2] + "'" + "]";
                xpath[1] = "BFD";
                xpath[2] = "DTL";
            }
        }
    }
    else if (xpathArray[0] == "FLD") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                xpath[0] = releaseNode + "//RAD_FIELDSETS";
                xpath[1] = "FLD";
                xpath[2] = "GRD";
                xpath[3] = "datasources";
            }
            if (j == 1) {
                xpath[0] = releaseNode + "//RAD_FIELDSETS[@ID=" + "'" + xpathArray[1] + "'" + "]";
                xpath[1] = "FDN";
                xpath[2] = "DTL";
            }
        }
    }
    else if (xpathArray[0] == "LOV") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                xpath[0] = releaseNode + "//RAD_LOVS";
                xpath[1] = "LOV";
                xpath[2] = "GRD";
                xpath[3] = "datasources";
            }
            if (j == 1) {
                xpath[0] = releaseNode + "//RAD_LOVS[@ID=" + "'" + xpathArray[1] + "'" + "]";
                xpath[1] = "LNM";
                xpath[2] = "DTL";
            }
        }
    }
    else if (xpathArray[0] == "CFM") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                xpath[0] = releaseNode + "//RAD_CALLFORM";
                xpath[1] = "CFM";
                xpath[2] = "GRD";
                xpath[3] = "callforms";
            }
            if (j == 1) {
                xpath[0] = releaseNode + "//RAD_LOV[@ID=" + "'" + xpathArray[1] + "'" + "]";
                xpath[1] = "LNM";
                xpath[2] = "DTL";
            }
        }
    }
    else if (xpathArray[0] == "LFM") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                xpath[0] = releaseNode + "//RAD_LAUNCHFORM";
                xpath[1] = "LFM";
                xpath[2] = "GRD";
                xpath[3] = "launchforms";
            }
            if (j == 1) {
                xpath[0] = releaseNode + "//RAD_LOV[@ID=" + "'" + xpathArray[1] + "'" + "]";
                xpath[1] = "LNM";
                xpath[2] = "DTL";
            }
        }
    }
    else if (xpathArray[0] == "ACT") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                xpath[0] = releaseNode + "//RAD_ACTIONS";
                xpath[1] = "ACT";
                xpath[2] = "GRD";
                xpath[3] = "callforms";
            }
        }
    }
    else if (xpathArray[0] == "SUM") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                xpath[0] = releaseNode + "//RAD_SUMMARY";
                xpath[1] = "SUM";
                xpath[2] = "GRD";
                xpath[3] = "callforms";
            }
        }
    }
    else if (xpathArray[0] == "MND") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                xpath[0] = releaseNode + "//RAD_FUNC_PREFERENCES";
                xpath[1] = "MND";
                xpath[2] = "GRD";
                xpath[3] = "callforms";
            }
        }
    }
    if (giInterFace) {
        xpath = getGINodePath(xpathArray);
    }
    if (purgeFilter) {
        xpath = getPFNodePath(xpathArray);
    }
    return xpath;
}
//Create Elemnet in DOM  
function createElementInDOM(nodename, xpath, formName) {
    var childNode = selectSingleNode(dom, xpath).firstChild;
    var rootNode = selectSingleNode(dom, xpath);
    var newElem = dom.createElement(nodename);
    rootNode.insertBefore(newElem, childNode);
    if (nodename == "RELEASE_TYPE" || nodename == "RELEASE_NAME") {
        document.getElementById('RELEASE_TYPE').value = releaseType;
        document.getElementById('RELEASE_NAME').value = releaseName;
    }
}
// Add option to a select field
function addOption(obj, text, value, selected) {
    if (obj != null) {
        obj.options[obj.options.length] = new Option(text, value, false, selected);
    }
}
//Enable Partitions
function enablepartionname() {
    var objTable = document.getElementById("partition");
    var trows = objTable.tBodies[0].rows;
    for (var i = 0;i < trows.length;i++) {
        trows[i].cells[1].getElementsByTagName("INPUT")[0].disabled = true;
        trows[i].cells[2].getElementsByTagName("INPUT")[0].disabled = true;
        trows[i].cells[3].getElementsByTagName("SELECT")[0].disabled = false;
    }
}
//Enable ustom Attributes
function enableCustAttributes() {
    var objTable = document.getElementById("attributes");
    var trows = objTable.tBodies[0].rows;
    for (var i = 0;i < trows.length;i++) {
        trows[i].cells[1].getElementsByTagName("INPUT")[0].disabled = true;
        trows[i].cells[1].getElementsByTagName("BUTTON")[0].disabled = true;
        if (trows[i].cells[7].getElementsByTagName("INPUT")[0].value == parent.relName) {
            trows[i].cells[1].getElementsByTagName("BUTTON")[0].disabled = false;
        }
     } 
}
var ActionsCheck = false;

function FnShowActions() {
    if (ActionsCheck == false) {
        var actlen = selectNodes(dom, "//RAD_KERNEL//RAD_ACTIONS/RAD_ACTION").length;
        for (var i = 0;i < selectNodes(dom, "//RAD_KERNEL//RAD_ACTIONS/RAD_ACTION").length;i++) {
            if (actlen >= 12 && i >= 12) {
                ActionsCheck = true;
                addNewRow('ACTNS_TB');
            }
        }
    }
    fnRestActionsUI();
}