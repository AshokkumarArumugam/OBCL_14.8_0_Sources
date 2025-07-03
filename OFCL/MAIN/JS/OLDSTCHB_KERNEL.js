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
**  Last Modified By   : Arunprasath K
**  Last modified on   : 14-FEB-2020
**  Search String      : OBCL_14.4_Credit_Acceleration 
**  Reason             : Added code for query fetch action.	

**  Last Modified By   : Aishwarya
**  Last modified on   : 17-Jun-2020
**  Reason             : Updating audit trail when unlock
**  Search String      : OBCL_14.4_SUPPORT_BUG#31527262

**  Last Modified By   : Gomathi G
**  Last modified on   : 14-May-2021
**  Reason             : Assigning mainWin.AppDate to format the date as per user preference. 
**  Search String      : Bug#31400838

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 28-Feb-2023
**  Full Version       : REDWOOD ADOPTION changes
**  Reason             : Bug#34958820
****************************************************************************************************************************/
var gPrevAction;
var gEnableButton = false;
var gDisabledefschButton= false;
var gDisablerdfschButton= false;
var gDisableschblock= false;
var gSubSysStat ;  
var totalOutstanding ;
var dsbrOutstanding ;
function fnPostNew_KERNEL() {
	document.getElementById("BLK_OLTB_BULK_STCH_MASTER__VALUE_DATE").value = mainWin.AppDate; //Bug#31400838
	fireHTMLEvent(document.getElementById("BLK_OLTB_BULK_STCH_MASTER__VALUE_DATE"),"onpropertychange");//Bug#31400838
	return true;
}

function fnPostEnterQuery_KERNEL() {
	return true;
}
function fnFetch(){
		if (gAction == 'MODIFY' || gAction == 'NEW')
	{
	g_prev_gAction = gAction;
	gAction = 'FETCH';
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
		 gAction = g_prev_gAction;
        return false;
    }
  gAction = g_prev_gAction;
	}
fnEnableMEBlock("BLK_OLTB_BULK_STCH_MASTER",true);	
fnDisableElement(document.getElementById("BLK_OLTB_BULK_STCH_MASTER__BTN_FETCH"));
gDisableschblock = false;
  
 return true; 
}
//OBCL_14.4_SUPPORT_BUG#31527262 start
function fnPostUnlock_KERNEL() {
	document.getElementById("BLK_OLTB_BULK_STCH_MASTER__MAKERID").value = "";
    document.getElementById("BLK_OLTB_BULK_STCH_MASTER__CHECKERID").value = "";
	//Bug#34958820 changes starts
    //document.getElementById("BLK_OLTB_BULK_STCH_MASTER__MAKERDTSTI").value = "";
    //document.getElementById("BLK_OLTB_BULK_STCH_MASTER__CHECKERDTSTI").value = "";
	document.getElementById("BLK_OLTB_BULK_STCH_MASTER__MAKERDTST").value = "";
    document.getElementById("BLK_OLTB_BULK_STCH_MASTER__CHECKERDTST").value = "";
	//Bug#34958820 changes ends
	return true;
}
//OBCL_14.4_SUPPORT_BUG#31527262 end