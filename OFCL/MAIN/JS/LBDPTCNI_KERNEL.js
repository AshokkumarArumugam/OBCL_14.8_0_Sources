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
**  File Name          : LBDPTCNI_KERNEL.js
**  Purpose            : 
**  Called From        : 

**  CHANGE LOG
**  Last Modified By   : Arunprasath
**  Last modified on   : 02-Mar-2021
**  Reason             : OBCL_14.3_Simplified STP Changes

**  CHANGE LOG
**  Last Modified By   : Narendra
**  Last modified on   : 21-Nov-2023
**  Reason             : BUG#36013461
**  
****************************************************************************************************************************/
function fnDisableButtons() {
 DisableToolbar_buttons("Authorize");
 DisableToolbar_buttons("Delete");
 DisableToolbar_buttons("Copy");
 DisableToolbar_buttons("Close");
 DisableToolbar_buttons("Unlock");
 DisableToolbar_buttons("Reopen");
 DisableToolbar_buttons("Print");
 DisableToolbar_buttons("Reverse");
 DisableToolbar_buttons("Rollover");
 DisableToolbar_buttons("Confirm");
 DisableToolbar_buttons("Liquidate");
 DisableToolbar_buttons("Template");
 DisableToolbar_buttons("New");
 try{   
		var parentWin = fnGetParentWin();
		var screenArgs = parentWin.launchFormScrArgs;
		if (screenArgs != undefined) 
		{	
			DisableToolbar_buttons("EnterQuery");
		}
	}
	catch(e){}
 return true;
}

function fnPostExecuteQuery_KERNEL() {
 fnDisableButtons();
 fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_PART_EVENT"));
 fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_OL_EVENT"));
 return true;
}
function fnPostLoad_KERNEL()
 {
 fnDisableButtons();
 fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_PART_EVENT"));
 fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_MASTER__BTN_OL_EVENT"));
 return true;
}

function fn_partEvents(){
	debugger;	
	var contractRefNo="";
	var tblObj = getTableObjForBlock("BLK_LBSVW_STP_PART_LD_CONTRACT_INFO").tBodies[0].rows;
	var chkd = false;
	for(var j = 0; j < tblObj.length; j++){
	   //  var isChkd = tblObj[j].cells[0].getElementsByTagName('oj-input-text')[0].value;//BUG#36013461 code commented
		var isChkd = getTableObjForBlock("BLK_LBSVW_STP_PART_LD_CONTRACT_INFO").tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked;//BUG#36013461 code added
		if(isChkd){
			chkd = true;
			if(getTableObjForBlock("BLK_LBSVW_STP_PART_LD_CONTRACT_INFO").tBodies[0].rows[j].cells[3].getElementsByTagName("oj-input-text")[0].value!=""){
				contractRefNo=getTableObjForBlock("BLK_LBSVW_STP_PART_LD_CONTRACT_INFO").tBodies[0].rows[j].cells[3].getElementsByTagName("oj-input-text")[0].value;
			}
					
		}
	}
	g_prev_gAction = gAction;
	gAction='EXECUTEQUERY';
	screenArgs = new Array();		
    screenArgs['ACTION']='EXECUTEQUERY';
	screenArgs['ACTION_CODE'] = 'EXECUTEQUERY';	
	screenArgs['MODULE'] = 'OL';
	screenArgs['LANG'] = mainWin.LangCode;
	screenArgs['OPERATION']='View';
	screenArgs['SCREEN_NAME'] = 'CVS_EVENTS';	
	screenArgs['UI_XML'] = 'OLDEVENT';
	screenArgs['CONTREF'] = contractRefNo;
	launchFormScrArgs = screenArgs;
    //funcid = 'OLDEVENT';
	mainWin.dispHref1('OLDEVENT', seqNo);
	return true;
}

function fn_olEvents(){
	debugger;	
	var contractRefNo="";
	var tblObj = getTableObjForBlock("BLK_LBSVW_STP_PART_LD_CONTRACT_INFO").tBodies[0].rows;
	var chkd = false;
	for(var j = 0; j < tblObj.length; j++){
            //  var isChkd = tblObj[j].cells[0].getElementsByTagName('oj-input-text')[0].value;//BUG#36013461 code commented
		var isChkd = getTableObjForBlock("BLK_LBSVW_STP_PART_LD_CONTRACT_INFO").tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked;//BUG#36013461 code added
		
		if(isChkd){
			chkd = true;
			if(getTableObjForBlock("BLK_LBSVW_STP_PART_LD_CONTRACT_INFO").tBodies[0].rows[j].cells[4].getElementsByTagName("oj-input-text")[0].value!=""){
				contractRefNo=getTableObjForBlock("BLK_LBSVW_STP_PART_LD_CONTRACT_INFO").tBodies[0].rows[j].cells[4].getElementsByTagName("oj-input-text")[0].value;
			}
					
		}
	}
	g_prev_gAction = gAction;
	gAction='EXECUTEQUERY';
	screenArgs = new Array();		
    screenArgs['ACTION']='EXECUTEQUERY';
	screenArgs['ACTION_CODE'] = 'EXECUTEQUERY';	
	screenArgs['MODULE'] = 'OL';
	screenArgs['LANG'] = mainWin.LangCode;
	screenArgs['OPERATION']='View';
	screenArgs['SCREEN_NAME'] = 'CVS_EVENTS';	
	screenArgs['UI_XML'] = 'OLDEVENT';
	screenArgs['CONTREF'] = contractRefNo;
	launchFormScrArgs = screenArgs;
    //funcid = 'OLDEVENT';
	mainWin.dispHref1('OLDEVENT', seqNo);
	return true;
}