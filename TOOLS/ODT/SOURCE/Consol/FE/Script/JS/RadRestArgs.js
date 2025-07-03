/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadRestArgs.js
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

//dlgArg       = dialogArguments;
var localDom = parent.dom.cloneNode(true);
var act = parent.actVal;
var prevobj = "";
var xmlFileList = "";
var callformrad="";
function fnLoadRadXMLFORNONIE(p_funcId) {
    xmlFileList = loadxmldata;
    document.getElementById('FILE_SAVE_PATH').value = p_funcId;
}

function fnDefaultCallformFlds() {
    callformrad = xmlFileList;
    if (callformrad.indexOf("RAD_KERNEL") ==  - 1) {
        alertMessage("Load Valid Radxml", "E");
        return false;
    }
    callformrad = loadXMLDoc(callformrad);
    //document.getElementById("DATABLK_LIST").options.length = 0;
    //prevobj="";
    //deleteAll1('REST_ARGS_TABLE');
    //addOption(document.getElementById("DATABLK_LIST"), "", "", true);
    var data_blks = selectNodes(callformrad, "//RAD_DATA_BLOCKS[BLOCK_TYPE='NORMAL']");
       
    var blks = selectNodes(callformrad, "//RAD_DATASOURCES[DATASRC_TYPE='NORMAL']");
    for (var i = 0;i < blks.length;i++) {
        var blkName = getNodeText(selectSingleNode(blks[i], 'REST_BLK_NAME'));
        if(blkName==""){
        	continue;
        }
        var dbtname = getNodeText(selectSingleNode(blks[i], 'DATASRC_NAME'));
        if(selectSingleNode(localDom, "//RAD_DATASOURCES[DATASRC_NAME='" + dbtname + "']")!=null){
        if(getNodeText(selectSingleNode(localDom, "//RAD_DATASOURCES[DATASRC_NAME='" + dbtname + "']/REST_BLK_NAME")) != ""){
        	continue;
        }
        if(getNodeText(selectSingleNode(localDom, "//RAD_DATASOURCES[DATASRC_NAME='" + dbtname + "']/RELATION_TYPE")) != getNodeText(selectSingleNode(blks[i], 'RELATION_TYPE'))){
        	continue;
        }
        if(getNodeText(selectSingleNode(localDom, "//RAD_DATASOURCES[DATASRC_NAME='" + dbtname + "']/MULTI_RECORD")) != getNodeText(selectSingleNode(blks[i], 'MULTI_RECORD'))){
        	continue;
        }
        }
        
        
        if (i == 0) {
            addOption(document.getElementById("DATABLK_LIST"), blkName, blkName, false);
            showBlkFlds();
        }
        else {
            addOption(document.getElementById("DATABLK_LIST"), blkName, blkName, false);
        }
        
        localDom.selectSingleNode("//RAD_KERNEL").appendChild(blks[i]);
         
    }
    for (var i = 0;i < data_blks.length;i++) {
    localDom.selectSingleNode("//RAD_KERNEL").appendChild(data_blks[i]);
    }
}

function fnInValues() {
    parent.document.getElementById("IFCHILD").style.width = "800px";
    parent.document.getElementById("IFCHILD").style.height = "500px";
    parent.document.getElementById("IFCHILD").scrolling = "no";
    blks = selectNodes(localDom, "//RAD_DATASOURCES[DATASRC_TYPE='NORMAL']");
    for (var i = 0;i < blks.length;i++) {
        var blkName = getNodeText(selectSingleNode(blks[i], 'REST_BLK_NAME'));
        if(blkName==""){
        	continue;
        }
        if (i == 0) {
            addOption(document.getElementById("DATABLK_LIST"), blkName, blkName, true);
            showBlkFlds();
        }
        else {
            addOption(document.getElementById("DATABLK_LIST"), blkName, blkName, false);
        }
    }
    var obj =  document.getElementById('CALLFORM_NAME');
    
    if (selectNodes(localDom, ("//RAD_CALLFORM")).length>0) {
        var callformvalue = obj.value;
        obj.options.length = 0;
        addOption(obj, "", "", true);
        var call = selectNodes(localDom, ("//RAD_CALLFORM")).length;
        for (var j = 0;j < call;j++) {
            var calfrm = getNodeText(selectSingleNode(selectNodes(localDom, ("//RAD_CALLFORM"))[j], ("CALLFORM_FUCNTIONID")));
            if (getNodeText(selectSingleNode(selectNodes(localDom, ("//RAD_CALLFORM"))[j], ("CALLFORM_ACTIVE"))) == "Y")
                addOption(obj, calfrm, calfrm, false);
        }
        obj.value = callformvalue;
    }
    if(parent.restCallform !=""){
    	obj.value=parent.restCallform;
    	 //document.getElementById("DATABLK_LIST").options.length = 0;
    	    //prevobj="";
    	    //deleteAll1('REST_ARGS_TABLE');
    	   
    }
    document.getElementById("Cancel").focus();
}

function addOption(obj, text, value, selected) {
    if (obj != null) {
        if (parent.vwChg != "Y")
            obj.options[obj.options.length] = new Option(text, value, false, selected);
        else {
            obj.options[obj.options.length] = new Option(text, value, false, selected);
            try {
                var action = selectSingleNode(dom, xpath + "[@ID='" + text + "']").getAttribute("Action");
                if (action != null && action == "New") {
                    obj.options[obj.options.length - 1].style.color = "009900";
                }
            }
            catch (e) {
            }
        }
    }
}



function showBlkFlds() { 
	 if (prevobj != "") {
	        fn_append_data(prevobj);
	    }
    if (document.getElementById('DATABLK_LIST').options.length != 0) {
        var blkindex = document.getElementById('DATABLK_LIST').options.selectedIndex;
        var blkName = document.getElementById('DATABLK_LIST').options[blkindex].text;
        var req_v="",res_v="";
        var rowlen = parent.document.getElementById('REST_TABLE').tBodies[0].rows.length;
    	for (var j = 0; j < rowlen; j++) {
    		if (parent.document.getElementById("REST_TABLE").tBodies[0].rows[j].cells[1]
    				.getElementsByTagName("INPUT")[0].value == RestOperation) {
    			  req =parent.document.getElementById("REST_TABLE").tBodies[0].rows[j].cells[5]
    					.getElementsByTagName("INPUT")[0].value;
    			  res=parent.document.getElementById("REST_TABLE").tBodies[0].rows[j].cells[6]
    					.getElementsByTagName("INPUT")[0].value;
    			  break;
    		}
    		
    	}
    	if(req.length>1)
    	req=req.split(",");
    	if(res.length>1)
    	res=res.split(",");
    	/*var blkflds ="";var dbt="";
    	if(null != selectSingleNode(localDom, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName + "']")){
        */
    	var blkflds = selectNodes(selectSingleNode(localDom, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName + "']"), "RAD_FIELDS");
        var dbt= getNodeText(selectSingleNode(localDom, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName + "']/DATASRC_NAME"));
    	/*}
    	if(callformrad!=""){ 
        	if(null != selectSingleNode(callformrad, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName + "']")){
        		blkflds = selectNodes(selectSingleNode(callformrad, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName + "']"), "RAD_FIELDS");
        		dbt= getNodeText(selectSingleNode(callformrad, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName + "']/DATASRC_NAME"));
            //blkflds = blkflds.concat(blkflds1);
        	//dbt = dbt.concat(dbt1); 
        	}
        }*/
    	
        deleteAll1('REST_ARGS_TABLE');
        for (var i = 0;i < blkflds.length;i++) {
        	if(getNodeText(selectSingleNode(blkflds[i], 'FIELD_NAME'))!=""){
            addNewRow1('REST_ARGS_TABLE');
            var rowlen = document.getElementById('REST_ARGS_TABLE').tBodies[0].rows.length;
            var cells = document.getElementById('REST_ARGS_TABLE').tBodies[0].rows[rowlen - 1].cells.length;
            for (var j = 0;j < cells;j++) {
                if (document.getElementById('REST_ARGS_TABLE').tBodies[0].rows[rowlen - 1].cells[j].getElementsByTagName("INPUT")[0].type == "text") {
                    document.getElementById('REST_ARGS_TABLE').tBodies[0].rows[rowlen - 1].cells[0].getElementsByTagName("INPUT")[0].value = getNodeText(selectSingleNode(blkflds[i], 'FIELD_NAME'));
                    document.getElementById('REST_ARGS_TABLE').tBodies[0].rows[rowlen - 1].cells[0].getElementsByTagName("INPUT")[0].disabled = true;
                } 
            }
            
            for(var rq=0;rq<req.length;rq++){
            	req_v=req[rq].split(".");
            	if(dbt==req_v[0] && getNodeText(selectSingleNode(blkflds[i], 'COLUMN_NAME'))==req_v[1]){
            		document.getElementById('REST_ARGS_TABLE').tBodies[0].rows[rowlen - 1].cells[1].getElementsByTagName("INPUT")[0].checked=true;
            		break;
            	}
            	 
            }
            
            
            for(var rq=0;rq<res.length;rq++){
            	req_v=res[rq].split(".");
            	if(dbt==req_v[0] && getNodeText(selectSingleNode(blkflds[i], 'COLUMN_NAME'))==req_v[1]){
            		document.getElementById('REST_ARGS_TABLE').tBodies[0].rows[rowlen - 1].cells[2].getElementsByTagName("INPUT")[0].checked=true; 
            		break; 
            	}
            	 
            }	
        }
        }
        prevobj = blkName;
        } 
} 

function fn_append_data(blkName) { 
	 
	/*	if(null != selectNodes(localDom, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName	+ "']") &&  selectNodes(localDom, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName	+ "']").length>0){
		*/
	    var blk = selectNodes(localDom, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName	+ "']"); 
		var blkflds = selectNodes(selectSingleNode(localDom,"//RAD_DATASOURCES[REST_BLK_NAME='" + blkName + "']"),"RAD_FIELDS");
		var dbt= getNodeText(selectSingleNode(localDom, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName + "']/DATASRC_NAME"));
	/*}
	if(callformrad!=""){
		if(null != selectNodes(callformrad, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName	+ "']") &&  selectNodes(callformrad, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName	+ "']").length>0){
		var blk = selectNodes(callformrad, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName	+ "']");
		var blkflds = selectNodes(selectSingleNode(callformrad,"//RAD_DATASOURCES[REST_BLK_NAME='" + blkName + "']"),"RAD_FIELDS");
		var dbt= getNodeText(selectSingleNode(callformrad, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName + "']/DATASRC_NAME"));
		
		/*blk = blk.concat(blk1);
		blkflds = blkflds.concat(blkflds1);
		dbt = dbt.concat(dbt1);*/
		/*}
	}*/
    
	var rowlen = document.getElementById('REST_ARGS_TABLE').tBodies[0].rows.length;
	for (j = 0; j < rowlen; j++) {
		 
		var blkfldnmae=document.getElementById('REST_ARGS_TABLE').tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].value;
		//if(null != selectNodes(localDom, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName	+ "']") &&  selectNodes(localDom, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName	+ "']").length>0){
			
			var restfld =dbt+"."+getNodeText(selectSingleNode(localDom,"//RAD_DATASOURCES[REST_BLK_NAME='" + blkName + "']/RAD_FIELDS[FIELD_NAME='"+blkfldnmae +"']/COLUMN_NAME"));
		//}
		/*if(callformrad!=""){
			if(null != selectSingleNode(callformrad, "//RAD_DATASOURCES[REST_BLK_NAME='" + blkName + "']")){
	    		
			var restfld =dbt+"."+getNodeText(selectSingleNode(callformrad,"//RAD_DATASOURCES[REST_BLK_NAME='" + blkName + "']/RAD_FIELDS[FIELD_NAME='"+blkfldnmae +"']/COLUMN_NAME"));
	 		 
			}
		}*/
		if (document.getElementById('REST_ARGS_TABLE').tBodies[0].rows[j].cells[1].getElementsByTagName("INPUT")[0].checked == true) {
			if(req.indexOf(restfld) == -1){
				 
					req += restfld+","; 
		} 
		}
		else{
			if(req.indexOf(restfld) != -1){
				req.replace(restfld,"");
			}
		}
		if (document.getElementById('REST_ARGS_TABLE').tBodies[0].rows[j].cells[2].getElementsByTagName("INPUT")[0].checked == true) {
			if(res.indexOf(restfld) == -1){
				 
					res += restfld+","; 
			} 
		} else{
			if(res.indexOf(restfld) != -1){
				res.replace(restfld,"");
			}
		}
	}
	if(req.length>1)
	req = req.substring(0, req.length - 1);
	/*if(res.length>1)
	res = res.substring(0, res.length - 1);
*/
	var rowlen = parent.document.getElementById('REST_TABLE').tBodies[0].rows.length;
	for (var j = 0; j < rowlen; j++) {
		if (parent.document.getElementById("REST_TABLE").tBodies[0].rows[j].cells[1]
				.getElementsByTagName("INPUT")[0].value == RestOperation) {
			parent.document.getElementById("REST_TABLE").tBodies[0].rows[j].cells[5]
					.getElementsByTagName("INPUT")[0].value = req;
			parent.document.getElementById("REST_TABLE").tBodies[0].rows[j].cells[6]
					.getElementsByTagName("INPUT")[0].value = res;
			parent.document.getElementById("REST_TABLE").tBodies[0].rows[j].cells[7]
			.getElementsByTagName("INPUT")[0].value = document.getElementById('CALLFORM_NAME').value;
		}
	}
}

function fncheckValue(val) {

    if (val.match(act)) {
        return "Y";
    }
    else {
        return "N";
    }
}

function returnAmnds() {

    var blkindex = document.getElementById('DATABLK_LIST').options.selectedIndex;
    var blkName = document.getElementById('DATABLK_LIST').options[blkindex].text;
    fn_append_data(blkName);
   // parent.dom = localDom;

}

function addNewRow1(tableName) {

    var numRows = document.getElementById(tableName).tBodies[0].rows.length;
    var trow = "<TD><INPUT aria-required=\"false\" type=\"text\"  size=40 name=FIELD_NAME id=FIELD_NAME  readonly=\"true\" ></TD><TD><INPUT aria-required=\"false\" align=\"center\" type=checkbox name=REST_IN id=REST_IN></TD><TD><INPUT aria-required=\"false\" align=\"center\" type=checkbox name=REST_OUT id=REST_OUT></TD>";
    var newRow = document.getElementById(tableName).tBodies[0].insertRow(document.getElementById(tableName).tBodies[0].rows.length);
    var rowArr = new Array();
    var cellsArr = new Array();
    var arrSize = new Array();
    var tableRef = document.getElementById(tableName);
    var tHead = tableRef.tHead.rows[0];
    var tBodyHTML = document.getElementById(tableName).tBodies[0].rows[0].innerHTML;
    tBodyHTML = trow;
    var styleArray = new Array();
    var trwln = document.getElementById(tableName).tBodies[0].rows.length
    var R = 0;
    var trCellArray = tBodyHTML.split("</TD>");
    for (var j = 0;j < trCellArray.length - 1;j++) {
        rowArr[j] = trCellArray[j] + "</TD>";
        newCell = newRow.insertCell(newRow.cells.length);
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
    }
}

function deleteAll1(tableName) {

    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    if (numRows > 0) {
        for (var index = numRows - 1;index >= 0;index--) {
            tableObject.tBodies[0].deleteRow(index);
        }
    }
}