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
**  File Name          : LBDIRTFX_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**
**Changed By         : Prakash Ravi
**Date               : 25-OCT-2017
**Change Description : After clicking new entered contract ref no and clicked on populate system is
                       not populating details hence unable to save the record. After click on fetch button spread and next reset date values are become nuull. 
**Search String      : OBCL_12.6_26924338

**Changed By         : Priyadarshini K
**Date               : 13-NOV-2017
**Change Description : Only for unlock enable the newly added new rate start date                      
**Search String      : OBCL_27049973 

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 28-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
****************************************************************************************************************************/
function appending_data()
{
	appendData(document.getElementById("TBLPageAll"));
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
function fn_default(){
	l_prev_gAction=gAction;
	gAction = "DFLT";
	appending_data();
	gAction = l_prev_gAction;
	return true;
}
function fnPreAuthorize_KERNEL(){
    authFunction = 'LBDIRAUT';
    authUixml = 'LBDIRAUT';
    authScreenName = 'CVS_AUTH_IRFX';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LBDIRAUT'] = "KERNEL";
    ArrPrntFunc['LBDIRAUT'] = "";
    ArrPrntOrigin['LBDIRAUT'] = "";
    return true;
}
function fnPostAuthorize_KERNEL(){
    DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    return true;
}
function fnPreLoad_CVS_AUTH_IRFX_KERNEL(screenArgs) {
    screenArgs['CONREF'] = document.getElementById('BLK_COMPONENT_RATE__CONTRACT_REF_NO').value;    
    return true;
}

//OBCL_12.6_26924338  changes starts
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
        
        //showData(dbStrRootTableName, 1);
        var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_COMPONENT_RATE"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");			
			    document.getElementById("BLK_COMPONENT_RATE__RATE").value = TextContents[12]; 
				document.getElementById("BLK_COMPONENT_RATE__RATE").value = TextContents[12];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		}
	}
    
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
		 gAction = g_prev_gAction;
        return false;
    }  		
	return true;
}
//OBCL_12.6_26924338  changes ends

function fnPostNew_KERNEL(){
fnDisableElement(document.getElementById('BLK_COMPONENT_RATE__TXT_NEW_RATE_EFF_START_DATE'));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
fnDisableElement(document.getElementById('BLK_COMPONENT_RATE__TXT_NEW_RATE_EFF_START_DATE'));
return true;
}