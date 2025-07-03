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
**  File Name          : LBCCYRST_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 28-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

**Changed By         : Vineeth T M
**Date               : 23-Feb-2024
**Change Description : Populate list of particpants, it will be used as bind variable in participant LOV to pick only tranche particpants
**Search String      : Bug#36263557 Changes
****************************************************************************************************************************/
function mySplit(str, ch) {
    var pos, start = 0, result = [];
    while ((pos = str.indexOf(ch, start)) != -1) {
        result.push(str.substring(start, pos));
        start = pos + 1;
    }
    result.push(str.substr(start));
    return(result);    
}
function getText(elem) {
	if (getBrowser().indexOf("IE") != -1) {
		return elem.text;
	}else{
		return elem.textContent;
	}
}

function fnCompute(){
	g_prev_gAction = gAction;
	gAction = 'FASCAL';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else {
            if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        //var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        //setDataXML(getXMLString(pureXMLDOM));
        //showData(dbStrRootTableName, 1);
    }
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E'); 
        return false;    
    }
    var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_CCY_RESTR_DETAIL"]/FV');
    if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");
				getTableObjForBlock("BLK_CCY_RESTR_DETAIL").tBodies[0].rows[i].cells[4].getElementsByTagName("oj-input-text")[0].value = TextContents[4]; // getting TextContents[4] value//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
				fireHTMLEvent(getTableObjForBlock("BLK_CCY_RESTR_DETAIL").tBodies[0].rows[i].cells[4].getElementsByTagName("oj-input-text")[0], "onpropertychange");//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		}
	}
    	 gAction = g_prev_gAction;
   return true; 
}
//Bug#36263557 Changes start
function fnPostLoad_CVS_CCYRST_KERNEL(){
	debugs("fnPreLoad_CVS_CCYRST_KERNEL");
	document.getElementById("BLK_OLTBS_CONTRACT_CCYR__TXTPARTICIPANTS").value = parent.listTrancheParticipants;
	return true;
}
//Bug#36263557 Changes end