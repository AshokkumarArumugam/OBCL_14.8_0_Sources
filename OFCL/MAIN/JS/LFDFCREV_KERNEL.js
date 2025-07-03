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
**  File Name          : LBDFCREV_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   :
**  Last modified on   : 
**  Search String      :  
**  Reason             : 

****************************************************************************************************************************/
function fnPostLoad_CVS_MAIN_CREV_KERNEL() 
{
	/*//fnEnableElement(document.getElementById("BLK_CHILD__REVERSAL_REQD"));
	
	var sumTblObj = getTableObjForBlock("BLK_CHILD").tBodies[0].rows;
    for(var j = 0; j < sumTblObj.length; j++){
		fnEnableElement(sumTblObj[j].cells[5].getElementsByTagName('INPUT')[0]);
        //var isChkd = .value;
		//var currentRowIndex=j;
			// if(isChkd)
		//	break;  
    }

	fnEnableElement(document.getElementById("BLK_PARENT__BTN_REVERSE"));*/
	enableForm();
	return true;
}
function fnPostExecuteQuery_KERNEL() 
{
	/*//fnEnableElement(document.getElementById("BLK_CHILD__REVERSAL_REQD"));
	
	var sumTblObj = getTableObjForBlock("BLK_CHILD").tBodies[0].rows;
    for(var j = 0; j < sumTblObj.length; j++){
		fnEnableElement(sumTblObj[j].cells[5].getElementsByTagName('INPUT')[0]);
        //var isChkd = .value;
		//var currentRowIndex=j;
			// if(isChkd)
		//	break;  
    }

	fnEnableElement(document.getElementById("BLK_PARENT__BTN_REVERSE"));*/
	enableForm();
	gAction = "NEW";
	return true;
}
/*
function fnRefresh()
{
	//fnEnableElement(document.getElementById("BLK_CHILD__REVERSAL_REQD"));
	
	var sumTblObj = getTableObjForBlock("BLK_CHILD").tBodies[0].rows;
    for(var j = 0; j < sumTblObj.length; j++){
		fnEnableElement(sumTblObj[j].cells[5].getElementsByTagName('INPUT')[0]);
        //var isChkd = .value;
		//var currentRowIndex=j;
			// if(isChkd)
		//	break;  
    }

	fnEnableElement(document.getElementById("BLK_PARENT__BTN_REVERSE"));
	return true;
}

function fnPostEnterQuery_KERNEL() 
{
	//fnEnableElement(document.getElementById("BLK_CHILD__REVERSAL_REQD"));
	
	var sumTblObj = getTableObjForBlock("BLK_CHILD").tBodies[0].rows;
    for(var j = 0; j < sumTblObj.length; j++){
		fnEnableElement(sumTblObj[j].cells[5].getElementsByTagName('INPUT')[0]);
        //var isChkd = .value;
		//var currentRowIndex=j;
			// if(isChkd)
		//	break;  
    }

	fnEnableElement(document.getElementById("BLK_PARENT__BTN_REVERSE"));
	return true;
}*/
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
	else if (msgStatus == "SUCCESS") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'I');
        return true;
    }	
	return true;
}
function fn_lfdfcrev_rev()
{
    var g_prev_gAction = gAction;
    gAction = 'FCREVERSAL';
    appending_data();
    gAction = g_prev_gAction;
	return true;
}