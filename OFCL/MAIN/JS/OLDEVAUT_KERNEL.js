/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : UDDEVAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 

**	Last Modified By   : Sudharshini Balaji
**	Last modified on   : 05-Nov-2020
**	Search String      : Bug#32025374
**	Reason             : To Launch Authorize screen OLDEVAUT from OLDUDEVT
****************************************************************************************************************************/


//Bug#32025374 Changes starts
var subScreen='N';

function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	 fnEnableElement(document.getElementById("BLK_CONTRACT__BTN_AUTH"));
	return true;
}

//Bug#32025374 Changes ends

function appending_data()
{
	appendData(document.getElementById("TBLPageAll"));
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	if (fcjResponseDOM) 
	{
    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
    if (msgStatus == "FAILURE") 
	{
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
		} 
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
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
	else if (msgStatus == "SUCCESS") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'I');
        return true;
    }	
}
//function fnAuthorize() //27427930_changes
function FNAUTHORIZE() //27427930_Changes
{
	var l_prev_gAction;
	l_prev_gAction=gAction;
	gAction = "AUTH_UDDEVAUT";
	//appending_data(); commented for Bug#32025374
	// Bug#32025374 Changes starts
	 if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {		  
	fnDisableElement(document.getElementById("BLK_CONTRACT__BTN_AUTH"));        
			disableForm();
		}	
				
	if (l_msgStat == 'FAILURE') {
		gAction = l_prev_gAction ;
		}
	 
        return true;
    }
	// Bug#32025374 Changes ends
}

function fnPostExecuteQuery_KERNEL()
{
	DisableToolbar_buttons("Authorize");// Bug#32025374 Changes
	var s = document.getElementById("BLK_OLVWS_CONTRACT_EVENT__FCCREF").value;//Bug#32025374 Changes 
	fnEnableElement(document.getElementById('BLK_CONTRACT__BTN_AUTH'));
	fnEnableElement(document.getElementById('BLK_LIQ_SUMMARY__VALUEDATE'));
	return true;
}
