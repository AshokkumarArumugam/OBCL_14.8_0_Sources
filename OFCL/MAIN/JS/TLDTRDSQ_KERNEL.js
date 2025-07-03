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
**  File Name          : TLDTRDSQ_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  Changed By         : Jayaram Namburaj
**	Date               : 22-NOV-2019
**	Change Description : Ticket Settlement Message Director
**  Search String      : SFR#29959798 OBCL_14.4_Ticket_Settlement_Message_Director
****************************************************************************************************************************/
var fcjResponseDOM;
var fcjRequestDOM;
var gPrevAction;
function fnPostExecuteQuery_KERNEL() {
fnEnableElement(document.getElementById('BLK_TLTBS_MRKT_TRD_STTL_QUEUE__BTN_INT'));
/*OBCL14.4:SFR#29959798:Ticket Settlement Message Director - Changes - Start */
fnEnableElement(document.getElementById('BLK_TLTBS_MRKT_TRD_STTL_QUEUE__BTN_MARK_AS_PROCESS'));
fnEnableElement(document.getElementById('BLK_TLTBS_MRKT_TRD_STTL_QUEUE__BTN_REPROCESS'));
/*OBCL14.4:SFR#29959798:Ticket Settlement Message Director - Changes - End */
 return true;
}
function fnBackendCall(){
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
        showData(dbStrRootTableName, 1);
if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    } else if (msgStatus == "SUCCESS") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'I');
        return true;
   }  
       else if (msgStatus == "SUCCESS") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'O');
        return true;
   }  


}
function fninitMatchProcess(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='MATCH_IN';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}

/*OBCL14.4:SFR#29959798:Ticket Settlement Message Director - Changes - Start */
function fninitReprocess(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='INIT_REPROC';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}

function fninitMarkAsProcess(){
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='INIT_MRK_AS_PROC';
 fnBackendCall();
 gAction=gPrevAction;
 return true;
}
/*OBCL14.4:SFR#29959798:Ticket Settlement Message Director - Changes - End */

function fnPreAuthorize_KERNEL(){
    authFunction = 'TLDTRDSA';
    authUixml = 'TLDTRDSA';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['TLDTRDSA'] = "KERNEL";
    ArrPrntFunc['TLDTRDSA'] = "";
    ArrPrntOrigin['TLDTRDSA'] = "";
    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
	return true;
}

