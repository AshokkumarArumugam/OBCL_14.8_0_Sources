/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  Written by         : 
**  Date of creation   : 
**  File Name          : TLDERONL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
var PkArr= new Array();
var pFlag = false;
function fnCheck() {
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
    msob_tchk = 0;
    for (i = 0; i < len; i++) {
        if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
            if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
                msob_tchk = msob_tchk + 1;
                selected_row = i;
            }
        } else
            break;
    }
    if (msob_tchk == 0) {
        alert('Please Select a Record');
        return false;
    } else if (msob_tchk > 1) {
        alert('Please Select One Record');
        return false;
    }
    return true;
}
function fn_GetCellIndex(pVar){
	for (var i = 0 ; i < getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[1].cells.length ; i++){
		if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[1].cells[i].getAttribute("name") == pVar){
			return i;
		}
	}
}
function fn_GetId() {
    screenArgs = new Array();
    var tableObject = getTableObjForBlock('TBL_QryRslts');
    var numRows = tableObject.tBodies[0].rows.length;
	var count = 0;
    if (fnCheck()) {
        for (var index = 0; index <= numRows - 1; index++) {
            if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
		var recIdcell= fn_GetCellIndex("CONTRACTREFNO");
		var recId = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[index].cells[recIdcell]);  
		var verCell= fn_GetCellIndex("LATESTVERNO");
		var verId = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[index].cells[verCell]); 
		var srcIdcell= fn_GetCellIndex("SOURCECODE");
		var srcId = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[index].cells[srcIdcell]); 
		var brnIdcell= fn_GetCellIndex("BRANCH");
		var brnId = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[index].cells[brnIdcell]); 
		
		PkArr[count] = recId +'~'+ srcId +'~'+ brnId +'~'+ verId;
		count++;
           }
        }
    }
    return false;
}
function fnPreShowDetail_Sum_KERNEL(){
	if(pFlag){
		fn_GetId();
		userDetailPk = PkArr;
		userParentFunc = 'TLDTDUPL';	
		pFlag = false;
	}
	return true;
}
function fnContractDetails(){
	if(fnCheck()){
		pFlag = true;
		fnShowDetail(selected_row);
		
	}
}