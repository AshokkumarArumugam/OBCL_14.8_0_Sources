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
**  Written by         : Avinav Seal
**  Date of creation   : 
**  File Name          : LBDIRAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  Last Modified By   : Jayaram N
**  Last modified on   : 11-Mar-2021
**  Search String      : Bug#32599971
**  Reason             : Authorization Scrren was not auto closing after the contract is authorized
****************************************************************************************************************************/
var subScreen='N';
var inputScr;
function appending_data()
{
	appendData(document.getElementById("TBLPageAll"));
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	if (fcjResponseDOM) 
	{
    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
    if (msgStatus == "FAILURE") 
			var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
		else if ((msgStatus == "WARNING" || msgStatus == "SUCCESS")&& inputScr==0)
			var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    if (msgStatus == "FAILURE") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }	
		else if (msgStatus == "SUCCESS" && inputScr==0) 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'I');
        return true;
    }	
  }
}

function fn_auth()
{
	//Bug#32599971:Starts here
	/*l_prev_gAction=gAction;
	gAction = "USRAUTH";
	inputScr=0;
	appending_data();
	gAction = l_prev_gAction;
	fnDisableElement(document.getElementById('BLK_AUTH_RATE_FIX__BTN_AUTH'));
	fnDisableElement(document.getElementById('BLK_AUTH_RATE_FIX__BTN_REJECT'));
	return true;*/
	var g_prev_gAction = gAction;
    gAction = 'USRAUTH';
    if (!fnOnlineAuthorize(subScreen)) {
        var l_msgStat =getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (l_msgStat == 'SUCCESS') {
            disableForm();
        }
    gAction = g_prev_gAction;
    return true;
    }
	//Bug#32599971:Ends here
}

function fn_reject()
{
	l_prev_gAction=gAction;
	gAction = "USRREJECT";
	inputScr=0;
	appending_data();
	gAction = l_prev_gAction;
	fnDisableElement(document.getElementById('BLK_AUTH_RATE_FIX__BTN_AUTH'));
	fnDisableElement(document.getElementById('BLK_AUTH_RATE_FIX__BTN_REJECT'));
	return true; 
}

function fnPostExecuteQuery_KERNEL()
{
	fnEnableElement(document.getElementById('BLK_AUTH_RATE_FIX__BTN_AUTH'));
	fnEnableElement(document.getElementById('BLK_AUTH_RATE_FIX__BTN_REJECT'));
	return true;
}

function fnPostLoad_CVS_AUTH_IRFX_KERNEL(screenArgs) {
    subScreen = 'Y';
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	document.getElementById('BLK_AUTH_RATE_FIX__CONTRACT_REF_NO').value=screenArgs.CONREF;
	fnEnableElement(document.getElementById('BLK_AUTH_RATE_FIX__BTN_AUTH'));
	fnEnableElement(document.getElementById('BLK_AUTH_RATE_FIX__BTN_REJECT'));
	gAction = "EXECUTEQUERY";
	inputScr=1;
	appending_data();
	return true;
}
