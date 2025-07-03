/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2004 - 2015  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
---------------------------------------------------------------------------------------- 
*/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes = "";
function fnPostLoad_CVS_MAIN_KERNEL(){
	getElementsByOjName('BTN_ADD_BLK_FMEM_LOR_INT_PARAMS')[0].style.visibility = 'hidden';
	getElementsByOjName('BTN_REMOVE_BLK_FMEM_LOR_INT_PARAMS')[0].style.visibility = 'hidden';
	
	return true;
}
function fnPostLoad_CVS_SSI_KERNEL(){
	
	getElementsByOjName('BTN_ADD_BLK_LOR_SSI_DETAILS')[0].style.visibility = 'hidden';
	getElementsByOjName('BTN_REMOVE_BLK_LOR_SSI_DETAILS')[0].style.visibility = 'hidden';
	return true;
}
function fnPostNew_KERNEL() {
	getElementsByOjName('BTN_ADD_BLK_FMEM_LOR_INT_PARAMS')[0].style.visibility = 'hidden';
	getElementsByOjName('BTN_REMOVE_BLK_FMEM_LOR_INT_PARAMS')[0].style.visibility = 'hidden';
	getElementsByOjName('BTN_ADD_BLK_LOR_SSI_DETAILS')[0].style.visibility = 'hidden';
	getElementsByOjName('BTN_REMOVE_BLK_LOR_SSI_DETAILS')[0].style.visibility = 'hidden';
	return true;
}
function fnRefreshApply(){
	g_prev_gAction = gAction;	
	gAction = 'REFRESHAPLY';
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
 return true; 
}
function fnCheckSettleAll()
{
	var tableRef =document.getElementById("BLK_FMEM_LOR_INT_PARAMS");
	var totalRows = tableRef.tBodies[0].rows.length;
	var rowRef = tableRef.tBodies[0].rows;
	
	if (document.getElementById("BLK_MAIN__CHK_SELECT_ALL").value)
	{
			for( i=0 ; i <= totalRows ; i++ )
			{	   
			getElementsByOjName("SETTLCHK")[i].value = true;
			}		
	}	
	else
	{	
	for( i=0 ; i <= totalRows ; i++ )
			{	   
			getElementsByOjName("SETTLCHK")[i].value = false;
			}
	}
	return true;
}
