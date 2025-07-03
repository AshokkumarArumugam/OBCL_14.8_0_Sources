/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2016, Oracle and/or its affiliates.
**  All rights reserved.
**  
**  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle and/or its affiliates.
**  
**  Oracle Financial Services Software Limited.
**  Oracle Park, Off Western Express Highway,
**  Goregaon (East),
**  Mumbai - 400 063,
**  India.
**  
**  Written by         : sandhya Nerlikar
**  Date of creation   : 
**  File Name          : MSDRLGRP_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  Last Modified By   : Girish M
**  Last modified on   : 02-FEB-2022
**  Reason             : REDWOOD CHANGES
**  Search String      : REDWOOD_CHANGES
****************************************************************************************************************************/
var fcjRequestDOM;
var fcjResponseDOM;
var objHTTP;

var gErrCodes = "";
var ruleid;
var rulename;
var ruledesc;
var rulepriority;
var rulecount;
//var reply_click = fnPostAddRow_BLK_MSTM_EMS_RULE_GROUP_DETAIL_DETAIL_KERNEL();
var index;
var DBT="BLK_DETAIL";


function fnpopulate() {
    var g_prevAction = gAction;


    gAction = "POPULATE";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    showProcessMsg = true;
    var l_resp_code = fnProcessResponse();
    var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
    gAction = "DEFAULT";
    setDataXML(getXMLString(pureXMLDOM));
    showData(dbStrRootTableName, 1);

   // fnDisableElement(document.getElementById("cmdAddRow_BLK_DETAIL"));
   // fnDisableElement(document.getElementById("cmdDelRow_BLK_DETAIL"));
    gAction = g_prevAction;
    return true;


}



function fn_swap() {
var rowlen = getTableObjForBlock("BLK_DETAIL").tBodies[0].rows.length;//rowlength of current page //redwood_changes
var total_rownum=selectNodes(dbDataDOM,"//BLK_DETAIL").length;
var rulenamearray=[total_rownum];
var ruledescarray=[total_rownum];
var rulepriorityarray=[total_rownum];
var temp=false;//validating whether given priority is available for swapping
var valcheckedrow=0;//validating whether user checked only one row
var checkedpriind=0;//getting checked priority index
var givenpriind=0;//getting given priority index
var temprulenamearray;
var tempruledescarray;
var temppriorityarray;
var l_nodes=selectNodes(dbDataDOM,"//BLK_DETAIL");//getting values of all nodes
var l_rulename;//dummy rule name to find current row


//for finding current row
for(t=0;t<rowlen;t++){
if (getTableObjForBlock("BLK_DETAIL").tBodies[0].rows[t].cells[0].getElementsByTagName("INPUT")[0].checked == true) //redwood_Changes
{
valcheckedrow=valcheckedrow+1;
l_rulename=getTableObjForBlock("BLK_DETAIL").tBodies[0].rows[t].cells[1].getElementsByTagName("oj-input-text")[0].value; //redwood_Changes
}
}


 if (document.getElementById("BLK_MSTM_EMS_RULE_GROUP__MOVETO_SWAPTO").value == '') {
        alert('Please enter the priority value to be swapped to.');
        return false;
    }
	
	if (document.getElementById("BLK_MSTM_EMS_RULE_GROUP__MOVETO_SWAPTO").value < 1) {
        alert('The minimum value for priority is 1.');
        return false;
    }
	
	if(valcheckedrow>1)
	{
	 alert('Please check only one row');
        return false;
	}
	if(valcheckedrow=1){
	for (var i = 1; i <= total_rownum ; i++) {
rulenamearray[i]=getNodeText(l_nodes [i-1].childNodes[1]);
ruledescarray[i]=getNodeText(l_nodes [i-1].childNodes[3]);
rulepriorityarray[i]=getNodeText(l_nodes [i-1].childNodes[0]);
if(rulepriorityarray[i]==document.getElementById("BLK_MSTM_EMS_RULE_GROUP__MOVETO_SWAPTO").value)
{
temp=true;
givenpriind=i;

}
if(rulenamearray[i]==l_rulename)
{

checkedpriind=i;
}


}
}

if(temp==false)
	{
	 alert('The entered priority is not available for swapping');
        return false;
	}

	
	
	if(givenpriind!=0 && checkedpriind!=0)
	{
 temprulenamearray=rulenamearray[givenpriind];
 tempruledescarray=ruledescarray[givenpriind];
 
 rulenamearray[givenpriind]=rulenamearray[checkedpriind];
 ruledescarray[givenpriind]=ruledescarray[checkedpriind];
 
 rulenamearray[checkedpriind]=temprulenamearray;
 ruledescarray[checkedpriind]=tempruledescarray;

	}
	for (var i = 1; i <= total_rownum ; i++) {
	
	setNodeText(l_nodes [i-1].childNodes[1],rulenamearray[i]);
setNodeText(l_nodes [i-1].childNodes[3],ruledescarray[i]);
	
	
	
	}
	showData();
	

}

function fn_move(){
var rowlen = getTableObjForBlock("BLK_DETAIL").tBodies[0].rows.length;//rowlength of current page //redwood_Changes
var total_rownum=selectNodes(dbDataDOM,"//BLK_DETAIL").length;
var rulenamearray=[total_rownum];
var ruledescarray=[total_rownum];
var rulepriorityarray=[total_rownum];
var temp=false;//validating whether given priority is available for moving
var valcheckedrow=0;//validating whether user checked only one row
var checkedpriind=0;//getting checked priority index
var givenpriind=0;//getting given priority index
var temprulenamearray;
var tempruledescarray;
var temppriorityarray;
var l_nodes=selectNodes(dbDataDOM,"//BLK_DETAIL");//getting values of all nodes
var l_rulename;//dummy rule name to find current row

//for finding current row
for(t=0;t<rowlen;t++){
if (getTableObjForBlock("BLK_DETAIL").tBodies[0].rows[t].cells[0].getElementsByTagName("INPUT")[0].checked == true) //redwood_Changes
{
valcheckedrow=valcheckedrow+1;
l_rulename=getTableObjForBlock("BLK_DETAIL").tBodies[0].rows[t].cells[1].getElementsByTagName("oj-input-text")[0].value; //redwood_Changes
}
}



 if (document.getElementById("BLK_MSTM_EMS_RULE_GROUP__MOVETO_SWAPTO").value == '') {
        alert('Please enter the priority value to be moved to.');
        return false;
    }
	
	if (document.getElementById("BLK_MSTM_EMS_RULE_GROUP__MOVETO_SWAPTO").value < 1) {
        alert('The minimum value for priority is 1.');
        return false;
    }
	
	if(valcheckedrow>1)
	{
	 alert('Please check only one row');
        return false;
	}
	
	
		if(valcheckedrow=1){
	for (var i = 1; i <= total_rownum ; i++) {
rulenamearray[i]=getNodeText(l_nodes [i-1].childNodes[1]);
ruledescarray[i]=getNodeText(l_nodes [i-1].childNodes[3]);
rulepriorityarray[i]=getNodeText(l_nodes [i-1].childNodes[0]);
if(rulepriorityarray[i]==document.getElementById("BLK_MSTM_EMS_RULE_GROUP__MOVETO_SWAPTO").value)
{
temp=true;


givenpriind=i;

}
if(rulenamearray[i]==l_rulename)
{

checkedpriind=i;
}


}
}


if(temp==false)
	{
	 alert('The entered priority is not available for moving');
        return false;
	}
	
	
	
		if(givenpriind!=0 && checkedpriind!=0)
	{
	if(givenpriind>checkedpriind){
	
	for(g=1;givenpriind>=checkedpriind;givenpriind--){
	temprulenamearray=rulenamearray[givenpriind];
 tempruledescarray=ruledescarray[givenpriind];
 
 rulenamearray[givenpriind]=rulenamearray[checkedpriind];
 ruledescarray[givenpriind]=ruledescarray[checkedpriind];
 
 rulenamearray[checkedpriind]=temprulenamearray;
 ruledescarray[checkedpriind]=tempruledescarray;
	
	}
	
	}
	
	else if(givenpriind<checkedpriind)
	{
	
	for(g=1;givenpriind<=checkedpriind;givenpriind++){
	temprulenamearray=rulenamearray[givenpriind];
 tempruledescarray=ruledescarray[givenpriind];
 
 rulenamearray[givenpriind]=rulenamearray[checkedpriind];
 ruledescarray[givenpriind]=ruledescarray[checkedpriind];
 
 rulenamearray[checkedpriind]=temprulenamearray;
 ruledescarray[checkedpriind]=tempruledescarray;
	
	}
	
	}
	
	}
		for (var i = 1; i <= total_rownum ; i++) {
	
		setNodeText(l_nodes [i-1].childNodes[1],rulenamearray[i]);
setNodeText(l_nodes [i-1].childNodes[3],ruledescarray[i]);
	
	
	
	}
	showData();
	
	}
	function fnPreSave_KERNEL() {
    //gAction = 'MODIFY';
    return true;
}

function fnPostUnlock_KERNEL(){
fnpopulate();
}
function fnPostNew_KERNEL(){
fnDisableElement(document.getElementById("BLK_MSTM_EMS_RULE_GROUP__POPULATE_RULES"));
}























