/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2015, Oracle and/or its affiliates.
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
**  File Name          : STDCOBAL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**
**  Modified by        : Shayam Sundar Ragunathan
**  Modified on        : 28-Jul-2015
**  Modified reason    : Changed LOV id from LOV_ACCBAL to LOV_ACCBAL_OFFLINE as suggested by INFRA
**  Search string      : PNTFLX01016_FCUBS_12.1.0_ITR1_21505318

**  Modified by        : Arunkumar R
**  Modified on        : 16-Sep-2019
**  Modified reason    : Code changes done to pass the branch code available in the screen to launch Detail Launch form.
**  Search string      : Fix for 30261493
****************************************************************************************************************************/
function fnPostFocus_KERNEL() {
    showToolbar('', '', '');
    return true;
}

function fnPostLoad_KERNEL() {
//debugger;
 if (parentSeqNo != "" && parentSeqNo != "null") {
    var parentWin = "";
    for (var i = 0; i < mainWin.arrChildWindows.length; i++) {
        if (mainWin.arrChildWindows[i].id == parentSeqNo) {
            parentWin = mainWin.arrChildWindows[i].children[0].contentWindow;
            break;
        }
    }
    //var custNo = parentWin.parentWinParams.custNo;
    var brn = parentWin.parentWinParams.brn;
    var accNo = parentWin.parentWinParams.accNo;
	var ccy=parentWin.parentWinParams.ccy;
	
    document.getElementById('BLK_CUSTBAL_DTL__BRANCH_CODE').value = brn;
    document.getElementById('BLK_CUSTBAL_DTL__CUST_ACCOUNT').value = accNo;
	if(typeof(ccy)!="undefined") {
	document.getElementById('BLK_CUSTBAL_DTL__CURRENCY').value = ccy;
	};
    //document.getElementById('BLK_CUSTBAL_DTL__LOV_ID').value = "LOV_ACCBAL"; //PNTFLX01016_FCUBS_12.1.0_ITR1_21505318 - Commented
	document.getElementById('BLK_CUSTBAL_DTL__LOV_ID').value = "LOV_ACCBAL_OFFLINE"; //PNTFLX01016_FCUBS_12.1.0_ITR1_21505318
    createDOM(dbStrRootTableName);
   /* fnAddRowMESV("BLK_CUST_DETAILS");
    if(typeof(custNo)!="undefined") {
        document.getElementById('BLK_CUSTBAL_DTL__BRANCH_CODE').value = custNo;
        document.getElementById('BLK_ACC_DETAILS__LOVID').value = "CUSTOMER_LOVID";
    }
    if(typeof(accNo)!="undefined") {
        document.getElementById('BLK_ACC_DETAILS__CUS_ACNO').value = accNo;
        document.getElementById('BLK_ACC_DETAILS__BRN_CODE').value = parentWin.parentWinParams.brn;
        document.getElementById('BLK_ACC_DETAILS__LOVID').value = "ACCOUNT_LOVID";
    }*/
    //enableMESVFields('BLK_CUST_DETAILS') ;
    gAction = "CUSTOMVIEW_F11";
    appendData();
    fcjRequestDOM = buildUBSXml();
    
    fcjResponseDOM = fnPost(fcjRequestDOM, "FCExtRestCallServlet", functionId);
	
	 //Bug_36924146 Changes Starts
    if(selectSingleNode(fcjResponseDOM, "ERROR") != null) {
		var errorCodeMsg = getNodeText(selectSingleNode(fcjResponseDOM, "ERROR"));
		if(errorCodeMsg != null){
			mask();
            var message = errorCodeMsg.substr(0,errorCodeMsg.indexOf(' ')); 
			var errCode = errorCodeMsg.substr(errorCodeMsg.indexOf(' ')+1);
            var alertResp = "<FCUBS_ERROR_RESP>";
                alertResp = alertResp + "<ERROR><ECODE>";
                alertResp = alertResp + message;
                alertResp = alertResp + "</ECODE><EDESC>";
                alertResp = alertResp + errCode;
                alertResp = alertResp + "</EDESC></ERROR>";
		alertResp = alertResp + "</FCUBS_ERROR_RESP>";
		customAlertAction = "CLOSESIGWIN";
		//showBranchAlerts(alertResp, 'E');		
		showAlerts(alertResp,'E');
		return;
		}
		
	}//Bug_36924146 Changes Ends
	
    gDispAlertOnSuccess = 'N';
    var msgStatus = fnProcessResponse();
    gDispAlertOnSuccess = 'Y';
    gAction = "";
    disableForm();    
    //12.1.1_Decentralised Changes starts
	if(mainWin.brnHostLinkStatus=='OFFLINE' && selectSingleNode(fcjResponseDOM, "//ERROR") != null){				
			var errorCodeMsg = getNodeText(selectSingleNode(fcjResponseDOM, "//ERROR"));
		if(errorCodeMsg != null && errorCodeMsg.indexOf('OF-4088') > -1){ //22467398 Other error messages should be treated in the same way as that of Online
        mask();
            var message = errorCodeMsg.substr(0,errorCodeMsg.indexOf(' ')); 
			var errCode = errorCodeMsg.substr(errorCodeMsg.indexOf(' ')+1);
            var alertResp = "<FCUBS_ERROR_RESP>";
                alertResp = alertResp + "<ERROR><ECODE>";
                alertResp = alertResp + message;
                alertResp = alertResp + "</ECODE><EDESC>";
                alertResp = alertResp + errCode;
                alertResp = alertResp + "</EDESC></ERROR>";
		alertResp = alertResp + "</FCUBS_ERROR_RESP>";
		customAlertAction = "CLOSESIGWIN";
		//showBranchAlerts(alertResp, 'E');		
		showAlerts(alertResp,'E');
		return;
		}
            }
	    //12.1.1_Decentralised Changes ends
 }
return true;
}
//12.1.1_Decentralised Changes starts
function fnCloseAlertWin_CLOSESIGWIN(event){
	gAction = "";
	fnExitAll('', event);
}
//12.1.1_Decentralised Changes ends

function fnShowLaunchForm(){
	/*Fix for 30261493 Starts*/
    /*if (parentSeqNo != "" && parentSeqNo != "null") {
        var parentWin = "";
        for (var i = 0; i < mainWin.arrChildWindows.length; i++) {
            if (mainWin.arrChildWindows[i].id == parentSeqNo) {
                parentWin = mainWin.arrChildWindows[i].children[0].contentWindow;
                break;
            }
        }
    var brn = parentWin.parentWinParams.brn;
    var accNo = parentWin.parentWinParams.accNo;
	var ccy = parentWin.parentWinParams.ccy;
    document.getElementById('BLK_CUSTBAL_DTL__BRANCH_CODE').value = brn;
    document.getElementById('BLK_CUSTBAL_DTL__CUST_ACCOUNT').value = accNo;
	if(typeof(ccy)!="undefined") {
	document.getElementById('BLK_CUSTBAL_DTL__CURRENCY').value = ccy;
	};
    fndispAccDetails(accNo,'CUST_ACC','',brn);
}*/	
	var brn   = document.getElementById('BLK_CUSTBAL_DTL__BRANCH_CODE').value;
    var accNo = document.getElementById('BLK_CUSTBAL_DTL__CUST_ACCOUNT').value;
    fndispAccDetails(accNo,'CUST_ACC','',brn);
	/*Fix for 30261493 Ends*/
}


