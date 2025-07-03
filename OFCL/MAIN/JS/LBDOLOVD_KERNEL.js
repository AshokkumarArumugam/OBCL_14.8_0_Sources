/*----------------------------------------------------------------------------------------------------
**
** File Name    : Template.js
**
** Module       : FCJWeb
**
** This source is part of the FLEXCUBE Corporate - Corporate Banking
** Software System and is copyrighted by Oracle Financial Services Software Limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle 
** Financial Services Software Limited.

** Oracle Financial Services Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

 Copyright c @2010-2011 by Oracle Financial Services Software Limited..
---------------------------------------------------------------------------------------------------- 



**  CHANGE LOG         : RAMYA M
**  Last modified on   : 28-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
*/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------


function appending_data()
{
	//appendData(document.getElementById("TBLPageAll"));
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

function fnPreAuthorize_KERNEL(screenArgs) {
	var gprev = gAction; 
	gAction = "AUTH";
	appendData();
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	return true;
}

function fnPostAuthorize_KERNEL() {

    gAction = "EXECUTEQUERY";
    fnExecuteQuery();
    return true;
}


function fnPostUnlock_KERNEL() {
	//debugs("In fnPostUnlock", "A");
        //currAction = 'MODIFY';

	getTableObjForBlock("cmdAddRow_BLK_LBTBS_COLL_OVD").disabled = true;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
    getTableObjForBlock("cmdDelRow_BLK_LBTBS_COLL_OVD").disabled = true;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

	return true;
}
