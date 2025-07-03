/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadSrvCUtils.js
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

function addOption(obj, text, value, selected) {
    if (obj != null) {
        obj.options[obj.options.length] = new Option(text, value, false, selected);
    }
}

function getTabelRow1(tableName) {

    if (tableName == "OPERATION_CODE") {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" id=OPERATION_CODE style=\"height: 20px\" name=OPERATION_CODE disabled > </TD>" + "<TD><INPUT aria-required=\"false\" id=OPERATION_DESCRIPTION style=\"height: 20px\" name=OPERATION_DESCRIPTION disabled> </TD>" + "<TD><INPUT aria-required=\"false\" id=FC_ACTION style=\"height: 20px\" name=FC_ACTION disabled> </TD>" + "<TD><INPUT aria-required=\"false\" id=SMS_FUNCTION_ID style=\"height: 20px\" name=SMS_FUNCTION_ID disabled> </TD>" + "<TD><INPUT aria-required=\"false\" id=SMS_ACTION style=\"height: 20px\" name=SMS_ACTION disabled> </TD>" + "<TD><INPUT aria-required=\"false\" id=FS_REQ_XSD style=\"height: 20px\" name=FS_REQ_XSD disabled> </TD>" + "<TD><INPUT aria-required=\"false\" id=PK_RES_XSD style=\"height: 20px\" name=PK_RES_XSD disabled> </TD>" + "<TD><INPUT aria-required=\"false\" id=FS_RES_XSD style=\"height: 20px\" name=FS_RES_XSD disabled> </TD>" + "<TD><INPUT aria-required=\"false\" id=IO_REQ_XSD style=\"height: 20px\" name=IO_REQ_XSD disabled> </TD>" + "<TD><INPUT aria-required=\"false\" id=DEFAULT_FUNCTION style=\"height: 20px\" name=DEFAULT_FUNCTION disabled > </TD>";
    }
    else if (tableName == 'SUB_SYSTEM') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" id=SUB_SYSTEM size=60 name=SUB_SYSTEM disabled > </TD>";

    }
    else if (tableName == 'E_OPERATION_CODE') {
        trow = "<TD><INPUT aria-required=\"false\" id=OPERATION_CODE size=60 name=OPERATION_CODE disabled> </TD>";
    }
    return trow;
}

function addNewRow1(tableName) {

    var trow = getTabelRow1(tableName);
    var newRow = document.getElementById(tableName).tBodies[0].insertRow(document.getElementById(tableName).tBodies[0].rows.length);
    var rowArr = new Array();
    var cellsArr = new Array();
    var arrSize = new Array();
    var tableRef = document.getElementById(tableName);
    var tHead = tableRef.tHead.rows[0];
    var tBodyHTML = document.getElementById(tableName).tBodies[0].rows[0].innerHTML;
    tBodyHTML = trow;
    var styleArray = new Array();
    var trCellArray = tBodyHTML.split("</TD>");
    var trwln = document.getElementById(tableName).tBodies[0].rows.length
    var R = 0;
    for (var j = 0;j < trCellArray.length - 1;j++) {
        rowArr[j] = trCellArray[j] + "</TD>";
        newCell = newRow.insertCell(newRow.cells.length);
        styleArray[j] = rowArr[j].substring(rowArr[j].indexOf("=") + 1, rowArr[j].indexOf(">"));
        newCell.setAttribute("className", styleArray[j], 0);
        newRow.cells[j].innerHTML = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        try {
            newRow.cells[j].getElementsByTagName("INPUT")[0].title = "Record " + trwln + " col " + R;
        }
        catch (e) {
            newRow.cells[j].getElementsByTagName("SELECT")[0].title = "Record " + trwln + " col " + R;
        }
        if (R == 0)
            newRow.cells[j].setAttribute("scope", "row");
        R++;
        cellsArr[j] = newRow.cells[j];
        rowArr[j] = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        arrSize[j] = newRow.cells[j].offsetWidth;
        if (newRow.cells[j].offsetWidth != 0) {
            tHead.cells[j].width = newRow.cells[j].offsetWidth;
        }
    }
}

function delRow1(tableName) {
    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    for (var index = numRows - 1;index >= 0;index--) {
        if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            tableObject.tBodies[0].deleteRow(index);

        }
    }
}

function deleteAll1(tableName) {

    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    for (var index = numRows - 1;index >= 0;index--) {
        tableObject.tBodies[0].deleteRow(index);
    }
}

function UpdateData_NEO() {
    var tblObj_NE = document.getElementById('OPERATION_CODE');

    var removeNode = selectNodes(parent.ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION[FUNCTION_ID='" + fld_name + "']/NONEXT_OPERATION");
    for (var i = 0;i < removeNode.length;i++) {
        removeNode[i].parentNode.removeChild(removeNode[i]);
    }

    if (tblObj_NE.tBodies[0].rows.length > 0) {
        var nodename = webSrvcTags_1;

        for (var j = 0;j < tblObj_NE.tBodies[0].rows.length;j++) {

            var rootnode = selectSingleNode(parent.ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION[FUNCTION_ID='" + fld_name + "']");
            var nodeElement = parent.ServiceDom.createElement("NONEXT_OPERATION");
            rootnode.appendChild(nodeElement);

            for (var i = 0;i < webSrvcTags_1.length;i++) {
                var childElements = parent.ServiceDom.createElement(webSrvcTags_1[i]);
                nodeElement.appendChild(childElements);
            }

            for (var cl = 1;cl < tblObj_NE.tBodies[0].rows[j].cells.length;cl++) {
                var nodevalue = tblObj_NE.tBodies[0].rows[j].cells[cl].getElementsByTagName('INPUT')[0].value;
                if (nodevalue != "") {
                    setNodeText(selectSingleNode(selectNodes(parent.ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION[FUNCTION_ID='" + fld_name + "']/NONEXT_OPERATION")[j], nodename[cl - 1]), nodevalue);
                }
            }
        }
    }
}

function UpdateData_NES() {
    var tblObj_NE = document.getElementById('SUB_SYSTEM');

    var removeNode = selectNodes(parent.ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION[FUNCTION_ID='" + fld_name + "']/NONEXT_SUSBSYSTEM");
    for (var i = 0;i < removeNode.length;i++) {
        removeNode[i].parentNode.removeChild(removeNode[i]);
    }

    if (tblObj_NE.tBodies[0].rows.length > 0) {
        var nodename = webSrvcTags_2;

        for (var j = 0;j < tblObj_NE.tBodies[0].rows.length;j++) {

            var rootnode = selectSingleNode(parent.ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION[FUNCTION_ID='" + fld_name + "']");
            var nodeElement = parent.ServiceDom.createElement("NONEXT_SUSBSYSTEM");
            rootnode.appendChild(nodeElement);

            for (var i = 0;i < webSrvcTags_2.length;i++) {
                var childElements = parent.ServiceDom.createElement(webSrvcTags_2[i]);
                nodeElement.appendChild(childElements);
            }

            for (var cl = 1;cl < tblObj_NE.tBodies[0].rows[j].cells.length;cl++) {
                var nodevalue = tblObj_NE.tBodies[0].rows[j].cells[cl].getElementsByTagName('INPUT')[0].value;
                if (nodevalue != "") {
                    setNodeText(selectSingleNode(selectNodes(parent.ServiceDom, "//NONEXT_FUNCTIONS/NONEXT_FUNCTION[FUNCTION_ID='" + fld_name + "']/NONEXT_SUSBSYSTEM")[j], nodename[cl - 1]), nodevalue);
                }
            }
        }
    }
}
var xmlFileList = "";

function fnLoadRadXMLFORNONIE(p_funcId) {
    xmlFileList = loadxmldata;
    document.getElementById('FILE_SAVE_PATH').value = p_funcId;
}

function fn_srv_Default() {
	
	var tblObj_E1 = parent.document.getElementById('EXTRAD');
    var servicerad = xmlFileList;
    if (servicerad.indexOf("RAD_KERNEL") ==  - 1) {
        alertMessage("Load Valid Radxml", "E");
        return false;
    }
    servicerad = loadXMLDoc(servicerad);
  
	//	var typeNotification=getNodeText(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/FUNCTION_CATEGORY")));
	//  if(typeNotification=="NOTIFICATION") {
	//    	fn_srv_Default_Notify(servicerad);
	//    	return;
	//    }	 
	    
    document.getElementById("IS_SUMMARY_PRESENT").checked=false; 
	  var funcType = getNodeText(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/FUNCTION_TYPE")));
    var action = getNodeText(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/ACTION")));
    var Rad_funcid = getNodeText(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/FUNCTION_ID")));

    if (Defaulting_function != Rad_funcid) {
        alertMessage("Loaded Radxml is not Matching with " + Defaulting_function, "E");
        return false;
    }
    servicerad = parent.fnPrepareConsolDOM(servicerad, Rad_funcid, funcType, action);
    var actionNodes = selectNodes(servicerad, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS/RAD_ACTION");
    if (actionNodes.length > 0) {

        var removeNode = selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION");
        for (var i = 0;i < removeNode.length;i++) {
            if (getNodeText(selectSingleNode(removeNode[i], "RELEASE_TYPE")) == parent.relType && getNodeText(selectSingleNode(removeNode[i], "RELEASE_NAME")) == parent.relCode) {
                removeNode[i].parentNode.removeChild(blkdtscr[k]);
            }
            else {
                setNodeText(selectSingleNode(removeNode[i], "ACTIVE"), "N");
            }
        }
        var op1 = selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION");
        var op = op1.length;
        var rootnode = selectSingleNode(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']");
        for (var actN = 0;actN < actionNodes.length;actN++) {
            var nodevalue = getNodeText(selectSingleNode(actionNodes[actN], "OPERATION_CODE"));

            for (var i = 0;i < op1.length;i++) {
                if (getNodeText(selectSingleNode(op1[i], "OPERATION_CODE")) == nodevalue)
                    op1[i].parentNode.removeChild(op1[i]);
            }
        }
        op1 = selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION");
        op = op1.length;
		var Summary_query_operation="";
        for (var actN = 0;actN < actionNodes.length;actN++) {
            var nodevalue = getNodeText(selectSingleNode(actionNodes[actN], "OPERATION_CODE"));
            var ACTION_CODE = getNodeText(selectSingleNode(actionNodes[actN], "ACTION_CODE"));
            if (nodevalue != "") {
				if(ACTION_CODE == "SUMMARYQUERY")
				{
				Summary_query_operation=nodevalue;
				continue;
				}
                var childElements = ServiceDom.createElement("OPERATION");
                rootnode.appendChild(childElements);

                var operationchild1 = ServiceDom.createElement("ACTION_CODE");
                childElements.appendChild(operationchild1);
                var operationchild2 = ServiceDom.createElement("OPERATION_CODE");
                childElements.appendChild(operationchild2);
                var operationchild3 = ServiceDom.createElement("ACTIVE");
                childElements.appendChild(operationchild3);
                var operationchild1 = ServiceDom.createElement("RELEASE_TYPE");
                childElements.appendChild(operationchild1);
                var operationchild1 = ServiceDom.createElement("RELEASE_NAME");
                childElements.appendChild(operationchild1);
                if (ACTION_CODE == "AUTHORIZE") {
                    ACTION_CODE = "AUTH";
                }
                if (ACTION_CODE == "QUERY") {
                    ACTION_CODE = "EXECUTEQUERY";
                }
                childElements.setAttribute("ID", ACTION_CODE);
                setNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION/ACTION_CODE")[op], ACTION_CODE);
                setNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION/OPERATION_CODE")[op], nodevalue);
                setNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION/ACTIVE")[op], "Y");
                setNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION/RELEASE_TYPE")[op], parent.parent.relType);
                setNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION/RELEASE_NAME")[op], parent.parent.relName);
                op++;

            }
        }
    }
    deleteAll('E_OPERATION_CODE');
    var cur_row = 0;
    for (var mlt = 0;mlt < selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION").length;mlt++) {
        if (getNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION/ACTIVE")[mlt]) == "Y") {
            addNewRow1('E_OPERATION_CODE');
            var webSrvcTags = "OPERATION_CODE".split("~");
            for (var cln = 0;cln < webSrvcTags.length;cln++) {
                document.getElementById('E_OPERATION_CODE').tBodies[0].rows[cur_row].cells[cln].getElementsByTagName('INPUT')[0].value = getNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION/OPERATION_CODE")[mlt]);
            }
            cur_row++;
        }

    }
    var tab_id = "";
    for (var j = 0;j < tblObj_E1.tBodies[0].rows.length;j++) {
        if (tblObj_E1.tBodies[0].rows[j].cells[0].getElementsByTagName('INPUT')[0].checked == true) {
            tab_id = j;
            break;
        }
    }
	var Module="";
    if(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/MODULE_ID")) !=null)
	Module = getNodeText(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_FUNC_PREFERENCES/MODULE_ID")));
    if (Module == "")
        Module = Defaulting_function.substring(0, 2); 
    if (selectSingleNode(servicerad, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS/RAD_XSD_TYPE_NAME")) != null) {
        var xsddesc = getNodeText(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_ACTIONS/RAD_XSD_TYPE_NAME")));
        var xsdvalue = Module + "-" + xsddesc + "-Types.xsd";
        tblObj_E1.tBodies[0].rows[tab_id].cells[3].getElementsByTagName('INPUT')[0].value = xsdvalue;
        setNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/TYPE_XSD_NAME")[0], xsdvalue);
    }
	if(Summary_query_operation!=""){
	var Summary_webservie = getNodeText(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY/SUMMARY_WEBSERVICE_REQD")));
		if(Summary_webservie=="Y"){
			document.getElementById("IS_SUMMARY_PRESENT").checked=true; 
			setNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/IS_SUMMARY_PRESENT")[0], "Y");
		}
	}

}

function fn_srv_Default_Notify(servicerad) {  
	var tblObj_E1 = parent.document.getElementById('EXTRAD');
   var servicerad = xmlFileList;
   if (servicerad.indexOf("RAD_KERNEL") ==  - 1) {
       alertMessage("Load Valid Radxml", "E");
       return false;
   }
   servicerad = loadXMLDoc(servicerad);
   var funcType = getNodeText(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/FUNCTION_TYPE"))); 
   var Rad_funcid = getNodeText(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/FUNCTION_ID")));

   if (Defaulting_function != Rad_funcid) {
       alertMessage("Loaded Radxml is not Matching with " + Defaulting_function, "E");
       return false;
   }
   //servicerad = parent.fnPrepareConsolDOM(servicerad, Rad_funcid, funcType, action); 
       var op1 = selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION");
       var op = op1.length;
           for (var i = 0;i < op1.length;i++) { 
                   op1[i].parentNode.removeChild(op1[i]);
           } 
     	 var rootnode = selectSingleNode(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']");  
           var nodevalue = getNodeText(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_NOTIFICATIONS/GATEWAY_OPERATION"))); 
           var ACTION_CODE = getNodeText(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_NOTIFICATIONS/OPERATION"))); 
           if (nodevalue != "") { 
               var childElements = ServiceDom.createElement("OPERATION");
               rootnode.appendChild(childElements);

               var operationchild1 = ServiceDom.createElement("ACTION_CODE");
               childElements.appendChild(operationchild1);
               var operationchild2 = ServiceDom.createElement("OPERATION_CODE");
               childElements.appendChild(operationchild2);
               var operationchild3 = ServiceDom.createElement("ACTIVE");
               childElements.appendChild(operationchild3);
               var operationchild1 = ServiceDom.createElement("RELEASE_TYPE");
               childElements.appendChild(operationchild1);
               var operationchild1 = ServiceDom.createElement("RELEASE_NAME");
               childElements.appendChild(operationchild1);
               if (ACTION_CODE == "AUTHORIZE") {
                   ACTION_CODE = "AUTH";
               }
               if (ACTION_CODE == "QUERY") {
                   ACTION_CODE = "EXECUTEQUERY";
               }
               childElements.setAttribute("ID", ACTION_CODE);
               setNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION/ACTION_CODE")[0], ACTION_CODE);
               setNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION/OPERATION_CODE")[0], nodevalue);
               setNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION/ACTIVE")[0], "Y");
               setNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION/RELEASE_TYPE")[0], parent.parent.relType);
               setNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION/RELEASE_NAME")[0], parent.parent.relName);
               

           } 
   deleteAll('E_OPERATION_CODE');
   var cur_row = 0;
   for (var mlt = 0;mlt < selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION").length;mlt++) {
       if (getNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION/ACTIVE")[mlt]) == "Y") {
           addNewRow1('E_OPERATION_CODE');
           var webSrvcTags = "OPERATION_CODE".split("~");
           for (var cln = 0;cln < webSrvcTags.length;cln++) {
               document.getElementById('E_OPERATION_CODE').tBodies[0].rows[cur_row].cells[cln].getElementsByTagName('INPUT')[0].value = getNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/OPERATION/OPERATION_CODE")[mlt]);
           }
           cur_row++;
       }

   }
   var tab_id = "";
   for (var j = 0;j < tblObj_E1.tBodies[0].rows.length;j++) {
       if (tblObj_E1.tBodies[0].rows[j].cells[0].getElementsByTagName('INPUT')[0].checked == true) {
           tab_id = j;
           break;
       }
   }
	var Module="";
   if(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_NOTIFICATIONS/NOTIFICATION_MODULE")) !=null)
	Module = getNodeText(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_NOTIFICATIONS/NOTIFICATION_MODULE")));
   if (Module == "")
       Module = Defaulting_function.substring(0, 2); 
   if (selectSingleNode(servicerad, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_NOTIFICATIONS/TYPE_XSD")) != null) {
       var xsddesc = getNodeText(selectSingleNode(servicerad, ("//RAD_FUNCTIONS/RAD_KERNEL/RAD_NOTIFICATIONS/TYPE_XSD")));
       var xsdvalue = Module + "-" + xsddesc + "-Types.xsd";
       tblObj_E1.tBodies[0].rows[tab_id].cells[3].getElementsByTagName('INPUT')[0].value = xsdvalue;
       setNodeText(selectNodes(ServiceDom, "//RAD_KERNEL/RAD_FUNCTION_ID[NAME='" + Defaulting_function + "']/TYPE_XSD_NAME")[0], xsdvalue);
   }
    
}