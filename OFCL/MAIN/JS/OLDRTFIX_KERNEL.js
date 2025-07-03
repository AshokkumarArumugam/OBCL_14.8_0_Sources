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
**  Date of creation   : 01-SEP-2016
**  File Name          : LDDRTFIX_KERNEL.js
**  Purpose            : OFCL-12.3 Development
**  Called From        : 
**  
**Changed By         : Chandra Achuta
**Date               : 07-AUG-2017
**Change Description : After clicking new entered contract ref no and clicked on populate system is
                       not populating details hence unable to save the record. 
**Search String      : OBCL_12.5_26574589

**Changed By         : Chandra Achuta
**Date               : 21-AUG-2017
**Change Description : After click on fetch button spread and next reset date values are become nuull. 
**Search String      : OBCL_12.5_26625954

**  Last Modified By   : Aishwarya
**  Last modified on   : 17-Jun-2020
**  Reason             : Updating audit trail when unlock
**  Search String      : OBCL_14.4_SUPPORT_BUG#31527262

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 28-Feb-2023
**  Full Version       : REDWOOD ADOPTION
**  Reason             : Bug#34958820 changes
****************************************************************************************************************************/
var fcjResponseDOM;
var fcjRequestDOM;
var gPrevAction;
function fnPopulate(){
	g_prev_gAction = gAction;
	gAction = 'POPLUATE';
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
 fnEnabFields();
 gAction = g_prev_gAction; 
 return true; 
}

function fnEnabFields(){
fnEnableElement(document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__RESETVALUEDATE"));
fnEnableElement(document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__NEXTRESETDATE"));
fnEnableElement(document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__REMARKS"));
fnEnableElement(document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__RATECODE"));
fnEnableElement(document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__RATE"));
fnEnableElement(document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__SPREAD"));
}
function fnPreAuthorize_KERNEL(){
    authFunction = 'OLDRTAUT';
    authUixml = 'OLDRTAUT';
    authScreenName = 'CVS_MAIN';
    gAction = 'EXECUTEQUERY';

    ArrFuncOrigin['OLDRTAUT'] = "KERNEL";
    ArrPrntFunc['OLDRTAUT'] = "";
    ArrPrntOrigin['OLDRTAUT'] = "";

    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    //var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
    //setDataXML(getXMLString(pureXMLDOM));
    //showData(dbStrRootTableName, 1);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
}

//OBCL_12.5_26574589  changes starts
//OBCL_12.5_26625954  changes starts
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
//OBCL_12.5_26625954  changes ends
function fnFetch(){
	var gPrevAction=gAction;
	gAction='FETCH';
	fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);	
	
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
        //OBCL_12.5_26625954  changes starts  changes starts
        //showData(dbStrRootTableName, 1);
        var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_OLTBS_RATE_FIXING_DETAILS"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");			
			    document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__RATE").value = TextContents[13]; 
				//document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__RATEI").value = TextContents[13]; //Bug#34958820 changes
				document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__RATE").value = TextContents[13]; //Bug#34958820 changes
		}
	}
    //OBCL_12.5_26625954  changes starts  changes ends
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
		 gAction = g_prev_gAction;
        return false;
    }  		
	return true;
}
//OBCL_12.5_26574589  changes ends
//OBCL_14.4_SUPPORT_BUG#31527262 start
function fnPostUnlock_KERNEL() {
	document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__MAKERID").value = "";
    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__CHECKERID").value = "";
	//Bug#34958820 changes starts
    //document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__MAKERDTSTAMPI").value = "";
    //document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__CHECKERDTSTAMPI").value = "";
	document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__MAKERDTSTAMP").value = "";
    document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__CHECKERDTSTAMP").value = "";
	//Bug#34958820 changes ends
	return true;
}
//OBCL_14.4_SUPPORT_BUG#31527262 end