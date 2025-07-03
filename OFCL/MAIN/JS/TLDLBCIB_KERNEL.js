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
**  File Name          : TLDLBCIB_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/


function fnBackendCall(){
    fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	if (fcjResponseDOM) {
    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
    if (msgStatus == "FAILURE") 
	{
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    if (msgStatus == "FAILURE") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
    return true; 
}
function fnPreUnlock_KERNEL() {
	var p_status=document.getElementById('BLK_TLTBS_CONSOL_LS_BROWSER__PROCESSING_STATUS').value;
	var consol_ticket_ref_no=document.getElementById('BLK_TLTBS_CONSOL_LS_BROWSER__CONSOL_TICKET_REF_NO').value;
	var agency_ref_no=document.getElementById('BLK_TLTBS_CONSOL_LS_BROWSER__AGENCY_REF_NO').value;
	if (!((consol_ticket_ref_no=="" && agency_ref_no=="") ||(consol_ticket_ref_no!="" && p_status=='E'))){
		showAlerts(fnBuildAlertXML('', 'E',"Processing status is not in Failed, so not allowed to unlock."),'E');
		return false;
	}
	return true;
}
function fnPostExecuteQuery_KERNEL() {
	fnEnableElement(document.getElementById('BLK_TLTBS_CONSOL_LS_BROWSER__BTN_REPROCESS'));
	return true;
}

function fnReprocess(){
	appendData(document.getElementById("TBLPageAll"));		
    gPrevAction=gAction;
    gAction='REPROCESS';
    fnBackendCall();
    gAction=gPrevAction;
    return true
}