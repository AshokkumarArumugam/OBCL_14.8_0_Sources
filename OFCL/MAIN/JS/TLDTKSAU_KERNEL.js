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
**  File Name          : TLDTKSAU_KERNEL.js
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
var currRowIndex = "";
var local_dom = "" ;
var len = 0;
var msob_tchk = 0 ;
var temp = 0;
var l_currRow ="";
var subScreen='N';

function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
	//debugger;
	subScreen = 'Y';
	if (screenArgs['SUB_SCREEN'] == 'Y'){		
		document.getElementById('BLK_TLTB_TICKET__TICKET_ID').value = screenArgs['TKTID'];	
		 document.getElementById('BLK_TLTB_TICKET__TICKET_REF_NO').value =screenArgs['TKT_REF_NO']  ;
	document.getElementById('BLK_TLTB_TICKET__MAKER_ID').value   =screenArgs['MAKER'] ;
	document.getElementById('BLK_TLTB_TICKET__MAKER_DT_STAMP').value   =  screenArgs['MAKER_DT_STAMP'];
	   document.getElementById('BLK_TLTB_TICKET__ACTUAL_SETTL_DATE').value	 =    screenArgs['ACT_STL_DTI'];
	    //document.getElementById('BLK_TLTB_TICKET__PARAMETER_FIELD').value =screenArgs['PARAMETER_FIELD'];
	   
		functionOrigin = 'KERNEL'; 
		dbIndexArray['BLK_TLTB_TICKET'] = getDbIndex("BLK_TLTB_TICKET");
		gAction = 'EXECUTEQUERY';
		appendData();
		fcjRequestDOM = buildUBSXml();
		fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
		var msgStatus = fnProcessResponse();
		//fnEnableElement(document.getElementById("BLK_TLTB_SUBTICKET__BTN_SETTLEMENT_INFO"));
		fnEnableElement(document.getElementById("BLK_TLTB_TICKET__BTN_AUTH"));
	

	}
	
	//Bug#36619894_1 changes starts						 
	//var row=getTableObjForBlock("BLK_TLTB_SUBTICKET").tBodies[0].rows; 
	//for(var rowIndex =0; rowIndex < row.length; rowIndex++)
	var len = getOjTableRowsLength("BLK_TLTB_SUBTICKET");
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
	//Bug#36619894_1 changes ends 
      {
	     	getElementsByOjName("BTN_SETTLEMENT_INFO")[rowIndex].disabled=false;
	  getElementsByOjName("CHECKBOX_FLAG")[rowIndex].disabled=false;
         
       }	
	
	//Bug#36619894_1 changes starts						 
	//var rowRef =getTableObjForBlock("BLK_OLTB_CONTRACT_OVD").tBodies[0].rows;  
	//for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	var len = getOjTableRowsLength("BLK_OLTB_CONTRACT_OVD");
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
	//Bug#36619894_1 changes ends 
      {
	     fnEnableElement(getTableObjForBlock("BLK_OLTB_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_OLTB_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
		 fnEnableElement(getTableObjForBlock("BLK_OLTB_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);
         
       }
	   
	   
	   
	   
	return true;
}


function FN_ONAUTH(){
    var gprev = gAction;
   gAction = 'AUTH';   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {		  
	fnDisableElement(document.getElementById("BLK_TLTB_TICKET__BTN_AUTH"));        
			disableForm();
		}	
        return true;
    }
}


/*  function Fn_OnAuth(){
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
} */ 



function fnPostExecuteQuery_KERNEL(){
	//debugger;
	//fnEnableElement(document.getElementById("BLK_TLTB_SUBTICKET__BTN_SETTLEMENT_INFO"));
	DisableToolbar_buttons("Authorize");
	fnEnableElement(document.getElementById("BTN_OK"));
	mainWin.t['1+2'] = ['Enter Query'];
	//Bug#36619894_1 changes starts		
	//var rowRef =getTableObjForBlock("BLK_OLTB_CONTRACT_OVD").tBodies[0].rows;	
	//for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	var len = getOjTableRowsLength("BLK_OLTB_CONTRACT_OVD");
	for(var rowIndex =0; rowIndex < len; rowIndex++)
	//Bug#36619894_1 changes ends 		
      {
	     fnEnableElement(getTableObjForBlock("BLK_OLTB_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0]);
		 getTableObjForBlock("BLK_OLTB_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
		 fnDisableElement(getTableObjForBlock("BLK_OLTB_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[4].getElementsByTagName("oj-input-text")[0]);  
		 fnEnableElement(getTableObjForBlock("BLK_OLTB_CONTRACT_OVD").tBodies[0].rows[rowIndex].cells[6].getElementsByTagName("oj-input-text")[0]);   
		 }
		 
	// Bug#29959798 :: Start
	//Bug#36619894_1 changes starts
	//var rowRef =getTableObjForBlock("BLK_TLTB_SUBTICKET").tBodies[0].rows; 
	//for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	var len = getOjTableRowsLength("BLK_TLTB_SUBTICKET");
	for(var rowIndex =0; rowIndex < len; rowIndex++)
	//Bug#36619894_1 changes ends
      {
		  fnEnableElement(getTableObjForBlock("BLK_TLTB_SUBTICKET").tBodies[0].rows[rowIndex].cells[5].getElementsByTagName("oj-button")[0]);
	  }
	 // Bug#29959798 :: End
		 
	return true;
}
//function fnOnlineAuth() {	
function fnPreSave_KERNEL() {
//debugger;
   var gprev = ""; 
	gAction = 'AUTH';
	if (!fnOnlineAuthorize(subScreen)) {
       var l_msgStat =getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
       if (l_msgStat == 'SUCCESS') {
          disableForm();
		 gAction = gprev;
       }
        processingAction = 'Auth';
	   return;
	 }
	return true;
}
function fnAuthSuccess(args){
//debugger;
var gprev = "";  
gAction = gprev ; 
disableForm();
alertAction = 'ONLINEAUTH'; 
}
function fnPostClose_CVS_AUTH_KERNEL(screenArgs){	
	mainWin.t['1+2'] = '';
	return true;
}
 




function fnViewPart_Msg(){
	//debugger;
	
  var gA=gAction;
  gAction = 'AUTH'; // Bug#29959798 :: Changed
  fnSubScreenMain('OLCETMVW','OLCETMVW','CVS_SETTLEMENTINFO',false);  // Bug#29959798 :: Changed

  	//Bug#36619894_1 changes starts
	//var row =getTableObjForBlock("BLK_TLTB_SUBTICKET").tBodies[0].rows; 
	//for(var rowIndex =0; rowIndex < row.length; rowIndex++)
	var len = getOjTableRowsLength("BLK_TLTB_SUBTICKET");
	for(var rowIndex =0; rowIndex < len; rowIndex++)
	//Bug#36619894_1 changes ends
      {
	     	// Bug#29959798 starts
			if(getTableObjForBlock("BLK_TLTB_SUBTICKET").tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked == true){			     
			getTableObjForBlock("BLK_TLTB_SUBTICKET").tBodies[0].rows[rowIndex].cells[1].getElementsByTagName("oj-input-text")[0].value = true;
			// Bug#29959798 ends
			getElementsByOjName("BTN_SETTLEMENT_INFO")[rowIndex].disabled=false;
	        getElementsByOjName("CHECKBOX_FLAG")[rowIndex].disabled=false;
         }
       }
  ////////////////
  //fnEnableElement(document.getElementById("BLK_TLTB_SUBTICKET__CHECKBOX_FLAG"));
  return true;
 }
 
 function SingleChecked ()
   {
	var selected_row = 0 ;
	var msob_tchk = 0 ;
	l_currRow = 0 ;
	currRowIndex = 0 ;
	
	len = getTableObjForBlock("BLK_TLTB_SUBTICKET").tBodies[0].rows.length;
	temp = 0 ;
	for(i = 0;i < len; i++)
	{
		if(getTableObjForBlock("BLK_TLTB_SUBTICKET").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0])
		{
			if(getTableObjForBlock("BLK_TLTB_SUBTICKET").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked)
			
			{
			    l_currRow = i;
			    msob_tchk = msob_tchk +1;
				selected_row = i ;
				temp=i ;
			}
		}
		else
		break;
	}
	if (msob_tchk > 1 )
	{
	    //9NT1525_12.0.1NLS_INTERNAL_16321819 Starts
		//alert ( 'Bulk Operation is Not supported ');
		showErrorAlerts('CS-MSVW-01');
		//9NT1525_12.0.1NLS_INTERNAL_16321819 Ends
		return false ;
	}
	else if (msob_tchk == 0 )
	{
	    //9NT1525_12.0.1NLS_INTERNAL_16321819 Starts
		//alert ( 'Please Select a Record');
		showErrorAlerts('CS-MSVW-02');
		//9NT1525_12.0.1NLS_INTERNAL_16321819 Ends
		return false ;
	}
	else
	{
	currRowIndex = selected_row +1 ;
	return true;
	}
}