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
**  File Name          : OLDLDENT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : K.PRIYADARSHINI
**  Last modified on   : 03-NOV-16
**  Search String      : OFCL_12.3.0.0.0_25038677
**  Reason             : The toolbar buttons to be enabled and disabled based on contract_status

**  Last Modified By   : Krithika G
**  Last modified on   : 22-FEB-18
**  Search String      : OFCL_12.3.0.0.0_27556403_Forward_Port_Changes 
****************************************************************************************************************************/
var gPrevAction;
queryFields[1] = "BLK_CONTRACT__LATEVNSEQNO";
pkFields[1] = "BLK_CONTRACT__LATEVNSEQNO";
function fnPostAddRow_BLK_CONTRACT_ADJ_DETAIL_KERNEL(e){
try {
	var tObject = document.getElementById("BLK_CONTRACT_ADJ_DETAIL").tBodies[0];
	var rows = tObject.rows;
	tObject.rows[rows.length -1].cells[3].getElementsByTagName("INPUT")[0].value = document.getElementById("BLK_CONTRACT__BRANCH").value ;
	tObject.rows[rows.length -1].cells[7].getElementsByTagName("INPUT")[0].value = document.getElementById("BLK_CONTRACT__BRANCH").value ;//27871780 changed number to 7 from 6
	
}catch(e){}
return true ; 
}

function fnPreAuthorize_KERNEL(){
    authFunction = 'OLDLDEAU';
    authUixml = 'OLDLDEAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['OLDLDEAU'] = "KERNEL";
    ArrPrntFunc['OLDLDEAU'] = "";
    ArrPrntOrigin['OLDLDEAU'] = "";
    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    //var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
    //setDataXML(getXMLString(pureXMLDOM));
    //showData(dbStrRootTableName, 1);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
}
function EnableDisableAuthBtn()
{
  if (document.getElementById("BLK_CONTRACT_EVENT_LOG__AUTHSTATUS").value == "A")
{
DisableToolbar_buttons("Authorize");
DisableToolbar_buttons("Delete");
}
  if (document.getElementById("BLK_CONTRACT_EVENT_LOG__AUTHSTATUS").value == "U")
{
EnableToolbar_buttons("Authorize");
}
return true;
}
function fnPostExecuteQuery_KERNEL(){
  DisableToolbar_buttons("Close");
  EnableDisableAuthBtn();
  
  return true;
}
/* OFCL_12.3.0.0.0_27556403_Forward_Port_Changes Ashok Added :: Passing Summary Values to Detail */
function getText(elem) {
	if (getBrowser().indexOf("IE") != -1) {
		return elem.text;
	}else{
		return elem.textContent;
	}
}
/* Ashok Added :: Passing Summary Values to Detail */
/* Ashok Added :: Passing Summary Values to Detail */
function fnShowDetail(v_rowid) {
    if (typeof (detailRequired) != 'undefined' && !detailRequired) {
        return false;
    }
    sumRsltRowNo = v_rowid;
    userParentFunc = "";
    userDetailPk = "";
    var fromSummary = 'TRUE';
    if (!fnPreShowDetail_SumMain())
        return false;
    //if (!fnEventsHandler('fnPreShowDetail_Sum')) return false;
    if (userParentFunc == "") {
		for (var count = 0; count < g_DetPkArray.length; count++ ){
			g_DetPkArray[count] = getText(document.getElementById("TBL_QryRslts").tBodies[0].rows[count].cells[1].getElementsByTagName("A")[0]) + '~' + getText(document.getElementById("TBL_QryRslts").tBodies[0].rows[count].cells[2].getElementsByTagName("A")[0]);
		}
        if (g_DetPkArray.length > 0 && g_DetPkArray.length > v_rowid) {
            var detailPk = g_DetPkArray[v_rowid];
            detailWinParams.ShowSummary = "TRUE";
            detailWinParams.DetailPkVals = detailPk;
            detailWinParams.sumTxnBranch = sumTxnBranch;
            mainWin.dispHref1(parentFunc, seqNo, fromSummary);
        }
    } else {
        detailWinParams.ShowSummary = "TRUE";
        detailWinParams.DetailPkVals = userDetailPk;
        detailWinParams.sumTxnBranch = sumTxnBranch;
        mainWin.dispHref1(userParentFunc, seqNo, fromSummary);
    }
	/* var len = document.getElementById("TBL_QryRslts").tBodies[0].rows.length;
    for(i = 0;i < len; i++) {
        if(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
          if(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
				detailWinParams["CONREFNO"] = getText(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[1].getElementsByTagName("A")[0]);
				detailWinParams["LATEVNSEQNOI"] = getText(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[2].getElementsByTagName("A")[0]);
				detailWinParams["LATEVNSEQNO"] = getText(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[2].getElementsByTagName("A")[0]);
           	} 
		}
    } */
	return true;
}
/* OFCL_12.3.0.0.0_27556403_Forward_Port_Changes Ashok Added :: Passing Summary Values to Detail */



