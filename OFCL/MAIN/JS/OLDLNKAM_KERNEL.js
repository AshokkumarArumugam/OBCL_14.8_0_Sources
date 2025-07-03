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
**  Written by         : 
**  Date of creation   : 
**  File Name          : OLDLNKAM_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
	**Changed By         : Prakash Ravi
	**Date               : 22-JAN-2018
	**Change Description : Validate on unlock in OLDLNKAM when modified from other screens.
	**Search String      : BUG#27224926 
	
**  Last Modified By   : Aishwarya
**  Last modified on   : 17-Jun-2020
**  Reason             : Updating audit trail when unlock
**  Search String      : OBCL_14.4_SUPPORT_BUG#31452933

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 23-Feb-2023
**  Full Version       : 
**  Reason             : Bug#34958820 - REDWOOD ADOPTION
****************************************************************************************************************************/
var gPrevAction;
function fnPostUnlock_KERNEL() {
	fnEnableElement(document.getElementById("BLK_CONTRACT_LINK_AMENDMENT__LINKED_TO_REF"));
	fnEnableElement(document.getElementById("BLK_CONTRACT_LINK_AMENDMENT__EXCHANGE_RATE"));
	fnEnableElement(document.getElementById("BLK_CONTRACT_LINK_AMENDMENT__CONVERTED_LINKED_AMOUNT"));
	fnEnableElement(document.getElementById("BLK_CONTRACT_LINK_AMENDMENT__TXTAMD_DATE"));
	fnEnableElement(document.getElementById("BLK_CONTRACT_LINK_AMENDMENT__BTN_PREVIOUS"));
	fnEnableElement(document.getElementById("BLK_CONTRACT_LINK_AMENDMENT__BTN_NEXT"));
	return true;
}

function fnPostExecuteQuery_KERNEL(){
  fnEnableElement(document.getElementById("BLK_CONTRACT_LINK_AMENDMENT__BTN_PREVIOUS"));
  fnEnableElement(document.getElementById("BLK_CONTRACT_LINK_AMENDMENT__BTN_NEXT"));
  return true;
}

function fnOnClick_BTN_NEXT() {
gPrevAction = gAction;
gAction = 'NEXT';
appendData(document.getElementById("TBLPageAll"));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else {
            if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    }
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
    
     gAction = gPrevAction;
    return true;
}

function fnOnClick_BTN_PREVIOUS() {
gPrevAction = gAction;
gAction = 'PREV';
appendData(document.getElementById("TBLPageAll"));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else {
            if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    }
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
    
     gAction = gPrevAction;
    return true;
}
//BUG#27224926 Changes start
function fnPreUnlock_KERNEL(){
	var PCode = (document.getElementById("BLK_OLTBS_CONTRACT_CONTROL__PROCESSCODE").value);
	var ProcessCode = PCode.substring(PCode.length - 4);
	var UnauthFunctionId;
	if (PCode != 'OLDLNKAM'){
		if (ProcessCode == 'REVP' || ProcessCode == 'PMNT') {
			UnauthFunctionId ='OLDPMNT';
		}
		else if (PCode == 'LDREVC' || PCode == 'LDBOOK' ||PCode == 'LDCAMD' || PCode == 'LDINIT' ||PCode == 'LDROLL' || PCode == 'LDRAMD'){
			UnauthFunctionId ='OLDTRONL';
		}
		else if (ProcessCode == 'RFND'){
			UnauthFunctionId ='OLDREFND';
		}
		else if(PCode == 'OLFEE')
		{
			UnauthFunctionId ='LFDACFIN';
		}
		else if(PCode == 'LDMSC')
		{
			UnauthFunctionId ='OLDMSCDT';
		}
		else if(ProcessCode == 'AMND')
		{
			UnauthFunctionId ='OLDVAMND';
		}
		else {
			UnauthFunctionId = PCode;
		}
		if (PCode != "" && UnauthFunctionId != undefined) {
                showErrorAlerts('OL-01490', 'E', UnauthFunctionId);
                return false;
            }
		}
		//OBCL_14.4_SUPPORT_BUG#31452933 start
	    document.getElementById("BLK_AUDIT__MAKER_ID").value = "";
	    //document.getElementById("BLK_AUDIT__MAKER_DT_STAMPI").value = ""; Bug#34958820 changes
        document.getElementById("BLK_AUDIT__MAKER_DT_STAMP").value = ""; //Bug#34958820 changes
	    document.getElementById("BLK_AUDIT__CHECKER_ID").value = "";
        //document.getElementById("BLK_AUDIT__CHECKER_DT_STAMPI").value = ""; Bug#34958820 changes
	    document.getElementById("BLK_AUDIT__CHECKER_DT_STAMP").value = "";  //Bug#34958820 changes
	    //OBCL_14.4_SUPPORT_BUG#31452933 end
	return true;
}
//BUG#27224926 Changes end