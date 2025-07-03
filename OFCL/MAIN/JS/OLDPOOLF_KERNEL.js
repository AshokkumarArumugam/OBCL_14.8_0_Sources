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
**  Written by         : ANUSHA SURENDRAN
**  Date of creation   : 
**  File Name          : LDDPOOLF_KERNEL.js
**  Purpose            : Corporate_Lending_12.2.0.0.0
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Kirandeep Kaur
**  Last modified on   : 8-July-2016
**  Full Version       : //ofcl_12.1.0.0.0_conversion 
**  Reason             : To default branch code.

**  Last Modified By   :Rashmi B V 
**  Last modified on   :17-02-23 
**	Description        :Changes W.R.T REDWOOD ADOPTION
**	Search String      :Bug#34958820_REDWOOD_ADOPTION 
****************************************************************************************************************************/
var gPrevAction;

function fnPostNew_KERNEL() {
gPrevAction = gAction;
gAction = 'GENREF';
appendData();
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
	if (!fnProcessResponse()) {
fcjRequestDOM = buildUBSXml();
fnPost(fcjRequestDOM, servletURL, functionId);
var msgStatus = fnProcessResponse();
fnPostProcessResponse(msgStatus);}
if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        }
		else {
            if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
//if (msgStatus == "FAILURE") {
       // var returnVal = displayResponse(messageNode);
    //}
if (msgStatus == "SUCCESS") {
        fnDisableElement(document.getElementById("BLK_POOL_FUNDING_MASTER__BRANCH_CODE"));
        //DisableElement(document.getElementById("BLK_POOL_FUNDING_MASTER__BRANCH_DESCRIPTION"));   //ofcl_12.1.0.0.0_conversion 
        //fnDisableElement(document.getElementById("BLK_POOL_FUNDING_MASTER__EXTERNAL_REF_NO"));
        fnDisableElement(document.getElementById("BLK_POOL_FUNDING_MASTER__FUNDING_REF_NO"));

}
return true;
}


function fnpoolamount() {
//document.getElementById('BLK_POOL_FUNDING_MASTER__POOLAVAILABLEAMOUNTI').value = document.getElementById('BLK_POOL_FUNDING_MASTER__FUNDINGAMOUNTI').value;	
document.getElementById('BLK_POOL_FUNDING_MASTER__POOLAVAILABLEAMOUNT').value = document.getElementById('BLK_POOL_FUNDING_MASTER__FUNDINGAMOUNT').value; //Bug#34958820_REDWOOD_ADOPTION
//document.getElementById('BLK_POOL_FUNDING_MASTER__POOLAVAILABLEAMOUNT').value = document.getElementById('BLK_POOL_FUNDING_MASTER__FUNDINGAMOUNT').value;
//document.getElementById("BLK_POOL_FUNDING_MASTER__POOLAVAILABLEAMOUNT").value = document.getElementById("BLK_POOL_FUNDING_MASTER__FUNDINGAMOUNT").value;
}

function fnPostCopy_KERNEL(){
document.getElementById("BLK_POOL_FUNDING_MASTER__BRANCHCODE").value =  mainWin.CurrentBranch;
fnDisableElement(document.getElementById("BLK_MASTER__BRANCHCODE"));
gPrevAction = gAction;
gAction = 'GENREF';
appendData();
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
	if (!fnProcessResponse()) {
fcjRequestDOM = buildUBSXml();
fnPost(fcjRequestDOM, servletURL, functionId);
var msgStatus = fnProcessResponse();
fnPostProcessResponse(msgStatus);}
if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        }
		else {
            if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
//if (msgStatus == "FAILURE") {
        //var returnVal = displayResponse(messageNode);
   // }
if (msgStatus == "SUCCESS") {
        fnDisableElement(document.getElementById("BLK_POOL_FUNDING_MASTER__BRANCH_CODE"));
      //fnDisableElement(document.getElementById("BLK_POOL_FUNDING_MASTER__BRANCH_DESCRIPTION"));   //ofcl_12.1.0.0.0_conversion 
        //fnDisableElement(document.getElementById("BLK_POOL_FUNDING_MASTER__EXTERNAL_REF_NO"));
        fnDisableElement(document.getElementById("BLK_POOL_FUNDING_MASTER__FUNDING_REF_NO"));

}
return true;
}
