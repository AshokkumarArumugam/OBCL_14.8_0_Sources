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
**  File Name          : FCDRCMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Modified By   : Divya J
**  Modified on   : 23-Nov-2018
**  Search String : OBCL_14.1_Bug#29588601
**  Reason        : MARGIN REVISION IS NOT WORKING AS EXPECTED 

	Changed By         : Vineeth T M
	Date               : 27-Jan-2021
	Change Description : Curreny Mapping Fix
	Search String      : OBCL_14.4_BUG#31598653:Curreny_Mapping_Fix changes
	
    Changed By         : Sowmya Bitra
	Date               : 01-Aug-2022
	Change Description : Moved the participant margin table to main screen and provided calculate button
	Search String      : Bug#34389739 Changes
	
	Changed By         : Akhila Samson
    Date               : 03-Mar-2023
    Change Description : Redwood changes
    Search String      : Bug#34958820_Redwood_changes
	
	Changed By         : Rashmi B V
	Date               : 03-Jan-2025
	Change Description : Enabling Participant Auto-Populate Button
	Search String      : Bug#37437951
****************************************************************************************************************************/
//OBCL_14.1_Bug#29588601 Starts
/*function fnPreLoad_CVS_PARTICIPANT_KERNEL(screenArgs){
	g_prev_gAction = gAction;
	gAction = 'PARTDEFAULT';
	appendData(document.getElementById('TBLPageAll'));
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
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
    gAction = g_prev_gAction;
	return true;
}*/   //Bug#34389739 Changes commented callform call
//OBCL_14.1_Bug#29588601 Ends

//OBCL_14.4_BUG#31598653:Curreny_Mapping_Fix changes start
//throw error if multiple rows are selected at ccy block
function fnPreAddRow_BLK_MARGIN_RATE_KERNEL() {
	var msob_tchk = 0 ;
	len = getTableObjForBlock("BLK_MARGIN_CCY").tBodies[0].rows.length; //Bug#34958820_Redwood_changes
	for(i = 0;i < len; i++)
      {
        if(getTableObjForBlock("BLK_MARGIN_CCY").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){ //Bug#34958820_Redwood_changes
          if(getTableObjForBlock("BLK_MARGIN_CCY").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) //Bug#34958820_Redwood_changes
          {
            msob_tchk = msob_tchk +1;
            }
         }
        else
          break;
       }

	 if (msob_tchk > 1 ) {                  
	  showErrorAlerts('IN-HEAR-138');
	  return false ;
	  }
	 else if (msob_tchk == 0 ) {                  
	  showErrorAlerts('IN-HEAR-206');
	  return false ;  }
	 else {
		 return true;
	 }
}
//assign ccy value to blk_margin_rate from ccy block 
function fnPostAddRow_BLK_MARGIN_RATE_KERNEL() {
	ri = dbIndexArray["BLK_MARGIN_RATE"];
	var sr = 0 ;
	var msob_tchk = 0 ;
	len = getTableObjForBlock("BLK_MARGIN_CCY").tBodies[0].rows.length; //Bug#34958820_Redwood_changes
	var tmp;
	for(i = 0;i < len; i++)
	  {
		if(getTableObjForBlock("BLK_MARGIN_CCY").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){ //Bug#34958820_Redwood_changes
		  if(getTableObjForBlock("BLK_MARGIN_CCY").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) //Bug#34958820_Redwood_changes
		  {
			msob_tchk = msob_tchk +1;
			sr = i ;
			break;
		  }
		 }
		else
		  break;
	   }
	tmp=getTableObjForBlock("BLK_MARGIN_CCY").tBodies[0].rows[sr].cells[1].getElementsByTagName("oj-input-text")[0].value; //Bug#34958820_Redwood_changes
	getTableObjForBlock("BLK_MARGIN_RATE").tBodies[0].rows[ri-1].cells[12].getElementsByTagName("oj-input-text")[0].value=tmp; //Bug#34958820_Redwood_changes
	return true;
}
//OBCL_14.4_BUG#31598653:Curreny_Mapping_Fix changes end



//Bug#34389739 Changes Start
function fnPostUnlock_KERNEL(){
	fnEnableElement(document.getElementById('BLK_MARGIN_COMPONENT__BTNCALC'));
	fnEnableElement(document.getElementById('BLK_MARGIN_COMPONENT__BTNPOP')); //Bug#37437951
	return true;
}

function fnCalculateRate(){
    var g_prev_gAction = gAction;
    gAction = 'PARTMARGIN';
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    var orgDom = loadXMLDoc(getXMLString(dbDataDOM));
    if (!fnProcessResponse()) {
        gAction = g_prev_gAction;
        dbDataDOM = loadXMLDoc(getXMLString(orgDom));
        return false;
    }
	if (fcjResponseDOM) {
		var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (msgStatus == "FAILURE") 
		{
			var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
			gAction = g_prev_gAction;
			return false;
		}
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
			var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
			if (msgStatus == "WARNING")
				{
					var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				}
		}
	}
    gAction = g_prev_gAction;
    return true;
}
//Bug#34389739 Changes End