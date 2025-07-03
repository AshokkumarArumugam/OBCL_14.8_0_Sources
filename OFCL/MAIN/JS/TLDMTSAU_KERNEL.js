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
**  File Name          : TLDMTSAU_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

 **Changed By         : Jayaram Namburaj
 **Date               : 23-Jul-2019
 **Change Description : SLT-Enhanced Approval during Ticket Level Settlement
 **Search String      : Bug#29959798 Changes	
 
   **  **  
  **  Last Modified By   : Kavitha Asokan
  **  Last modified on   : 24-May-2024
  **  Search String      : Bug#36619894_1 - REDWOOD ADOPTION CHANGES	 
  **  Reason             : Not able to authorize as override block length is returning value even when there are no overrides. 
						 Modified the code to get the length from getOjTableRowsLength instead of fetching it from getTableObjForBlock. 
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
	subScreen = 'Y';
		
		 if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	   fnEnableElement(document.getElementById("BLK_CONSOL_TICKET__BTN_AUTH"));	  
	gAction = 'AUTH';
	

	//Bug#36619894_1 changes starts						 
	//var rowRef =getTableObjForBlock("BLK_CONSOLE_PMNT").tBodies[0].rows;  
	var len = getOjTableRowsLength("BLK_CONSOLE_PMNT");
	//for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
	//Bug#36619894_1 changes ends 
      {
	     	getElementsByOjName("BTN_SETTLEMENT_INFO")[rowIndex].disabled=false;
			getElementsByOjName("FLAG")[rowIndex].disabled=false;
         
       }
	
	return true;
		
	

	
}

function fnPreAuthorize_KERNEL(){
    authFunction = 'TLDMTSAU';
    authUixml = 'TLDMTSAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';

    ArrFuncOrigin['TLDMTSAU'] = "KERNEL";
    ArrPrntFunc['TLDMTSAU'] = "";
    ArrPrntOrigin['TLDMTSAU'] = "";

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



function FN_ONAUTH(){
	 var gprev = gAction;
    gAction = 'AUTH';   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {		  
	fnDisableElement(document.getElementById("BLK_HEADER__BTNAUTH"));        
			disableForm();
		}	
        return true;
    }
}


function FnSettleInfo()
{
	
  var gA=gAction;
  // Bug#29959798 :: Start
  gAction = 'AUTH'; 
  fnSubScreenMain('OLCETMVW','OLCETMVW','CVS_SETTLEMENTINFO',false);  

  //Bug#36619894_1 changes starts						 
  //var row =getTableObjForBlock("BLK_CONSOLE_PMNT").tBodies[0].rows;  
	var len = getOjTableRowsLength("BLK_CONSOLE_PMNT");
  //for(var rowIndex =0; rowIndex < row.length; rowIndex++)
    for(var rowIndex =0; rowIndex < len; rowIndex++)	
  //Bug#36619894_1 changes ends 
      {
	     	getElementsByOjName("BTN_SETTLEMENT_INFO")[rowIndex].disabled=false;
	        getElementsByOjName("FLAG")[rowIndex].disabled=false;
         
       }
  ////////////////
  //fnEnableElement(document.getElementById("BLK_TLTB_SUBTICKET__CHECKBOX_FLAG"));
  return true;
  // Bug#29959798 :: End
	
}


/* 
function fnPostNew_KERNEL(){
	
	fnDisableElement(document.getElementById('BLK_TLTB_DCF_LIQD_AGENCY_MASTER__LIQUIDATION_REF_NO'));
	return true; 
} */

/*function fnPostExecuteQuery_KERNEL() {
	fnEnableElement(document.getElementById('BLK_OLTBS_LT_TRADE__BTN_UPLOAD'));
	fnEnableElement(document.getElementById('BLK_OLTBS_LT_TRADE__BTN_MARK_PRCSD'));
	fnEnableElement(document.getElementById('BLK_OLTBS_LT_TRADE__BTN_REJECT'));
	fnEnableElement(document.getElementById('BLK_OLTBS_LT_TRADE__BTN_REPLY'));
	return true;
}*/




function fnPostExecuteQuery_KERNEL(){
	//debugger;
	//fnEnableElement(document.getElementById("BLK_TLTB_SUBTICKET__BTN_SETTLEMENT_INFO"));
	DisableToolbar_buttons("Authorize");
			 

	//Bug#36619894_1 changes starts						 
	//var rowRef =getTableObjForBlock("BLK_CONSOLE_PMNT").tBodies[0].rows;  
	var len = getOjTableRowsLength("BLK_CONSOLE_PMNT");
	//for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
	//Bug#36619894_1 changes ends 
	
      {
		  fnEnableElement(getTableObjForBlock("BLK_CONSOLE_PMNT").tBodies[0].rows[rowIndex].cells[5].getElementsByTagName("oj-button")[0]);
	  }
		 
	return true;
}
