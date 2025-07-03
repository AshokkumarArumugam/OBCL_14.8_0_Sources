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
  ** Copyright © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.
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
	
	for (var i = 0;i < clickedobjects.length;i++) {
        selected = TreeObjectsArray[index][i];
	} 
     
    previousNode = val;  
    appendData(val); 
    setScreens(selected);  
    showData(clickedxpath);    

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
                    if (divele[index].tagName == "INPUT" || divele[index].tagName == "SELECT") {
                        var value = getValue(divele[index]);
                        var valueArray = value.split("!");
                        var nodename = valueArray[1];
                        var nodevalue = valueArray[0];
                        if (nodename != "") {
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
    if (giInterFace) {
        flag = fnCheckGiDel(tabelName);
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
            var tableobject = tableref.tBodies[0].rows[index].cells[cellindex];
            if (tableobject.children.length > 0) {
                var value = getTabValue(tableobject);
                var valueArray = value.split("!");
                var nodename = valueArray[1];
                var nodevalue = valueArray[0];
                if (nodename != "") {
                    try {
                        setNodeText(selectSingleNode(selectNodes(dom, (xpath))[index], nodename), nodevalue);
                        nodeElement.setAttribute("ID", getNodeText(selectNodes(dom, (xpath))[index].childNodes[0]));

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
        for (var i = 0;i < DivNamesArray.length;i++) {
            document.getElementById(DivNamesArray[i]).style.display = "none";
        }
        try {
            document.getElementById(screenId).style.display = "block"; 
        }
        catch (e) {
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
            if (divele[index].tagName == "INPUT" || divele[index].tagName == "SELECT") {
                var cellname = getCellName(divele[index]);
                if (cellname != "") {
                    try { 
                        var nodeValue = getNodeText(selectSingleNode(selectSingleNode(dom, xpath), cellname)); 
                        setValue(divele[index], nodeValue, cellname); 
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
                                    var nodeValue = getNodeText(selectSingleNode(selectNodes(dom, xpath)[i], cellname));
                                    
                                        if (tableobject.children.length > 0) {
                                            setTabValue(tableobject, nodeValue, cellname, "");
                                        } 
                                }
                                catch (e) {
                                }
                            }
                        }
                    }
                }
            } 
        } 
    } 
}
//Get Cell Name
function getCellName(tableobject) {
    var name = "";
    var tagName = tableobject.tagName;
    if (tagName == "INPUT") {
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
    else if (tagName == "LABEL") {
        if (tableobject.name == nodeName) {
            tableobject.innerHTML = value;
            tableobject.style.color = color;
        }
    }
    else if (tagName == "SELECT") {
        var isThere = "NO";
        if (tableobject.name == nodeName) { 
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
    return value + "!" + name;
}
//Get NodePath 
function getNodepath(ActiveObject) {
    var xpathArray = new Array();
    var releaseNode = "//" + "RAD_KERNEL";
    var xpath = new Array();
    xpathArray = ActiveObject.split("~"); 
	if (xpathArray[0] == "XSD") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                xpath[0] = releaseNode + "//RAD_XSD";
                xpath[1] = "XSD";
                xpath[2] = "GRD";
                xpath[3] = "datasources";
            }
            if (j == 1) {
                xpath[0] = releaseNode + "//RAD_XSD[@ID=" + "'" + xpathArray[1] + "'" + "]";
                xpath[1] = "BNM";
                xpath[2] = "DTL";
            }
            if (j == 2) {
                xpath[0] = releaseNode + "//RAD_XSD[@ID=" + "'" + xpathArray[1] + "'" + "]/RAD_BLK_FIELDS[@ID=" + "'" + xpathArray[2] + "'" + "]";
                xpath[1] = "BFD";
                xpath[2] = "DTL";
            }
        }
    } 
    else if (xpathArray[0] == "XND") {
        for (var j = 0;j < xpathArray.length;j++) {
            if (j == 0) {
                xpath[0] = releaseNode + "//RAD_PREFERENCES";
                xpath[1] = "XND";
                xpath[2] = "GRD";
                xpath[3] = "callforms";
            }
        }
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