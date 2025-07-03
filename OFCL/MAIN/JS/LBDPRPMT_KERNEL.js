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
**  Written by         : Neeraj.Krishna
**  Date of creation   : 06-feb-2017
**  File Name          : LBDPRPMT_KERNEL.js
**  Purpose            : Development of OFCL_12.4.0.0.0
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   :
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

function fnPopulate(){
	g_prev_gAction = gAction;
	gAction = 'POPULATE';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }

 gAction = g_prev_gAction;
 
 return true;
 
}

function fnPreAuthorize_KERNEL() {
    authFunction   = 'LBDPRAUT';
    authUixml      = 'LBDPRAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LBDPRAUT']="KERNEL";
    ArrPrntFunc['LBDPRAUT'] = "";
    ArrPrntOrigin['LBDPRAUT'] ="";
    return true;
}

function fnPostAuthorize_KERNEL() {
	gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
	debugs("In fnPostAuthorize ", "A");
}
function fnPostExecuteQuery_KERNEL() {
if (document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__AUTHSTATUS").value == 'A') //OFCL12.3_25038551 changes
{
DisableToolbar_buttons("Authorize");
DisableToolbar_buttons("Delete");
}
return true;
}
function fnPostLoad_KERNEL(){   
	document.getElementById("cmdAddRow_BLK_LBTB_PR_DETAIL").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_LBTB_PR_DETAIL").style.visibility = 'hidden';
	document.getElementById("cmdAddRow_BLK_LBTB_PR_AMOUNT_PAID").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_LBTB_PR_AMOUNT_PAID").style.visibility = 'hidden';
	/* ASHOK Changes Starts */
	addEvent(document.getElementById("BLK_LBTB_PR_DETAIL"), "onclick", "fnCalculateLiquidateAmount()"); //Adding event on click of BLK_LBTB_PR_DETAIL
    addEvent(document.getElementById("BLK_LBTB_PR_AMOUNT_PAID"), "onclick", "fnCalculateLiquidateAmount()"); //Adding event on change of BLK_LBTB_PR_AMOUNT_PAID
	addEvent(document.getElementById("BLK_LBTB_PR_AMOUNT_PAID"), "onchange", "fnCalculateLiquidateAmount()"); //Adding event on change of BLK_LBTB_PR_AMOUNT_PAID
	fnCalculateLiquidateAmount();
	/* ASHOK Changes Ends */
	return true;
}
/* ASHOK Changes Starts */
function fnCalculateLiquidateAmount(){
	try {
        var blockId = "BLK_LBTB_PR_DETAIL";
        var len = getTableObjForBlock(blockId).tBodies[0].rows.length;
		var LiqAmtDueTotal = 0;
        for (var idx = 0;idx < len;idx++) {
            if (getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[0].getElementsByTagName("INPUT")[0]) {
				if (getTableObjForBlock(blockId).tBodies[0].rows[idx].cells[0].getElementsByTagName("INPUT")[0].checked) {
					var participantblockId = "BLK_LBTB_PR_AMOUNT_PAID";
					var participantLen = getTableObjForBlock(participantblockId).tBodies[0].rows.length;					
					for (var index = 0;index < participantLen;index++) {
						if(getTableObjForBlock(participantblockId).tBodies[0].rows[index].cells[6].getElementsByTagName("oj-input-text")[0].value){
							LiqAmtDueTotal = +LiqAmtDueTotal + +getTableObjForBlock(participantblockId).tBodies[0].rows[index].cells[3].getElementsByTagName("oj-input-text")[0].value;
						}
					}
				}	
			}
		}
		document.getElementById("BLK_LBTB_PR_MASTER__AMOUNTSUM").value = LiqAmtDueTotal;
		fireHTMLEvent(document.getElementById("BLK_LBTB_PR_MASTER__AMOUNTSUM"), "onpropertychange");
    }		
    catch (e) {}
	return true;
}
/* ASHOK Changes Ends */