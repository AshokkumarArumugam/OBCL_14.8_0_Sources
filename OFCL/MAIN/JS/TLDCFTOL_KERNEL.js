/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2019, Oracle and/or its affiliates.
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
**  File Name          : TLDCFTOL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**Changed By         : Jayaram Namburaj
**Date               : 25-SEP-2019
**Change Description : OBCL_14.4_SLT_Ticket Settlement Message Director Changes
**Search String      : Bug#30347839 Changes
****************************************************************************************************************************/



function hit_backend()
{
	
    appendData();
    fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	if (fcjResponseDOM) {
    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
    if (msgStatus == "FAILURE") 
	{
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
    } 
	else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
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
	msg_status=msgStatus;
    return true;
}


function fnPopulateComponents()
{
	l_prev_gAction=gAction;
	gAction = "ENRICH";
	hit_backend();
	gAction = l_prev_gAction;
	return true;
}



function fnPopulateLimit(e)
{
	var rowRef=getTableObjForBlock("BLK_THRESHOLD_DETAIL").tBodies[0].rows; 
	var val= document.getElementById("BLK_THRESHOLD_MASTER__THRESHOLDLMT").value;
	//  Bug#30347839 -- Added if condition for length check
	if (val.length != 0)
	{
		for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
		  {
			getTableObjForBlock("BLK_THRESHOLD_DETAIL").tBodies[0].rows[rowIndex].cells[4].getElementsByTagName("oj-input-text")[0].value=val;
			//getTableObjForBlock("BLK_THRESHOLD_DETAIL").tBodies[0].rows[rowIndex].cells[4].getElementsByTagName("oj-input-text")[1].value=val; //Redwood_changes_akhila	
		  }
	}
}
