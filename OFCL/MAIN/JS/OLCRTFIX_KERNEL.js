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
**  Written by         : Neeraj.Krishna
**  Date of creation   : 01-SEP-2016
**  File Name          : LDDRTFIX_KERNEL.js
**  Purpose            : OFCL-12.3 Development
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
var fcjResponseDOM;
var fcjRequestDOM;
var gPrevAction;
function fnPopulate(){
	g_prev_gAction = gAction;
	gAction = 'POPLUATE';
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
        return false;
    }
 fnEnabFields();
 gAction = g_prev_gAction; 
 return true; 
}

function fnEnabFields(){
fnEnableElement(document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__RESETVALUEDATE"));
fnEnableElement(document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__NEXTRESETDATE"));
fnEnableElement(document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__REMARKS"));
fnEnableElement(document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__RATECODE"));
fnEnableElement(document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__RATE"));
fnEnableElement(document.getElementById("BLK_OLTBS_RATE_FIXING_DETAILS__SPREAD"));
}