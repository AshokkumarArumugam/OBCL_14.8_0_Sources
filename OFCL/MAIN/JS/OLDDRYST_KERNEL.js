
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
**  File Name          : LDDDRYST_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Prakash Ravi
**  Last modified on   : 08-AUG-2019
**  Search String      : OBCL_14.4_DIARY_EVENT_UPDATE
**  Reason             : Added code to insert and update the status table with the all values.
****************************************************************************************************************************/

function fnPostUnlock_KERNEL() {     
        var b = document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE").on;
		var c = document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE").off;
		var d = document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE");
        document.getElementById("cmdAddRow_BLK_OLTWS_FIELDS_TEMP").style.visibility = 'hidden';
		document.getElementById("cmdDelRow_BLK_OLTWS_FIELDS_TEMP").style.visibility = 'hidden';
		document.getElementById("cmdAddRow_BLK_OLTWS_UDF_TEMP").style.visibility = 'hidden';
		document.getElementById("cmdDelRow_BLK_OLTWS_UDF_TEMP").style.visibility = 'hidden';
		fnEnableElement(document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__BTN_MSG_PREVIEW"));  //OBCL_14.4_DIARY_EVENT_UPDATE
	/* To Check if Read only Radio btn is RAD bug */
		fn_hidden("Unlock");
		var e = document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__STATUS").value;
		 if((document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__STATUS").value) == "P")
            {
               fnEnableElement(document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE"));
			   if((document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__INTERNALEVENT").value) == "N")
			   {
				   if((document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE").value) == "Y")
				   {
					   fnEnableElement(document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__COMPLETED"));
				   }
			   } 
            }
         else{
               fnDisableElement(document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE"));
			   fnDisableElement(document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__COMPLETED"));
            }
			return true;
} 

function fnchange(){
	if((document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__STATUS").value) == "P")
            {
               fnEnableElement(document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE"));
			   /*if((document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__INTERNALEVENT").value) == "N")
			   {
				   if((document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE").value) == "Y")
				   {
					   fnEnableElement(document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__COMPLETED"));
				   }
			   } */
            }
        else{
               fnDisableElement(document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE"));
            }
	return true;
}

function fngenmsg(){
	var a = document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE").value;
	/*var b = document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE").on;
	var c = document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE").off;
	var d = document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE"); */
	if(document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE").value==true)
	{
		fnEnableElement(document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__COMPLETED")); 
	}
	if(document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__GEN_MESSAGE").value==false)
	{
		fnDisableElement(document.getElementById("BLK_OLTBS_CONT_DIARY_STATUS__COMPLETED")); 
	}
	return true;
}

function fnPostLoad_KERNEL() { 
	fn_hidden("Load");
	return true;
}
function fnPostExecuteQuery_KERNEL() { 
	fn_hidden("EXECUTEQUERY");
	return true;
}
function fnPostSave_KERNEL() { 
	fn_hidden("EXECUTEQUERY");
	return true;
}
function fnPostEnterQuery_KERNEL() { 
	fn_hidden("ENTERQUERY");
	return true;
}
function fn_hidden(action){
	if(action == "Unlock")
		document.getElementById("OLCMEMGN").style.visibility = 'hidden';
	else
		document.getElementById("OLCMEMGN").style.visibility = 'visible';
	return true;
}
//OBCL_14.4_DIARY_EVENT_UPDATE starts
function fnMsgPreview(event){
	//document.getElementById("BLK_OLTBS_FFMT_MSG__BTN_GENERATE").disabled=false;
	g_prev_gAction = gAction;
	gAction = 'PREVIEW';
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
	//OFCL_12.3.0.0.0_25096590 changes starts
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
 fnSubScreenMain('OLDDRYST','','CVS_MESSAGE');
 gAction = g_prev_gAction;
 return true; 
}
//OBCL_14.4_DIARY_EVENT_UPDATE change ends