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
**  File Name          : LDDINTLM_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  Changed By         : Abhinav Kumar
**  Date               : 22-May-2023
**  Change Description : OLDINTLM -- INTEREST LIMITS DETAIL -- Not able to update Default Amount For *.* Currency Component
                         Currency Field LOV was as mapped as related block/field for Amount. As *.* is not a proper currency it was failing while Amount validation and clearing the value.
						 Added new DB Column CCY_FORMAT in LFTM_PRODUCT_CURRENCY_LIMITS with which we will format the default Amount field.(e.g. For *.* = LCY, JPY=JPY)
**  Search String      : Bug#35487799
****************************************************************************************************************************/
var gPrevAction;

function Fn_PopulateCCY(){
	g_prev_gAction = gAction;
	gAction = 'PopulateCCY';
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
 gAction = g_prev_gAction;
 return true; 
}
//Bug#35487799 Starts
function fnPostFocus_KERNEL(){	
    var rowLength=document.getElementById("BLK_LFTMS_PRODUCT_CURRENCY_LIMITS").tBodies[0].rows.length;
	for(var i=0;i<rowLength;i++){		
	var ccyCode = document.getElementsByName("CURRENCY")[i].value ;
       if (ccyCode != "*.*") {
	   document.getElementsByName("CCYFORMAT")[i].value = ccyCode;	
       }
       else {
	   document.getElementsByName("CCYFORMAT")[i].value = mainWin.Lcy;	
	   }
    }
    return true;
}
//Bug#35487799 Ends
function fnPostEnterQuery_KERNEL(){
	fnEnableElement(document.getElementById("BLK_LFTMS_PROD_COMP_MASTER__MODULE_CODE"));
	/*fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__TXT_EVENT_SEQ_NOI"));
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__TXT_VAL_DATEI"));
	document.getElementById("BLK_OLTBS_CONTRACT__TXT_SUMMARY_ID").value = "Summary"; */
	return true;
}
