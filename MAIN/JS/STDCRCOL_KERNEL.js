/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software System and is copyrighted by 
**  Oracle Financial Services Software Limited.
**  
**  All rights reserved.  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle Financial Services Software Limited.
**  
**  Oracle Financial Services Software Limited.
**  10-11, SDF I, SEEPZ, Andheri (East),
**  Mumbai - 400 096.
**  India.
**  
**  Copyright (c) 2008 - 2011 by Oracle Financial Services Software Limited. All rights reserved.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : STDCRCOL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**
** Modified  By         : Niranjana R
** Modified  On         : 23-Jan-2018
** Modified Reason      : NoELCM mode,minicore screens to be launched for facilites and collaterals.
** Search String        : NoELCM Changes
**
** Modified  By         : Lijeesh
** Modified  On         : 21-Apr-2022
** Modified Reason      : changes added to show the detail screen STDCRCOL, if the orgination of the summary screen STSCRCOL directly from menu..
** Search String        : 33062401
** Bug Number			: 34090119
**
** Modified  By         : Manoj
** Modified  On         : 08-feb-2023
** Modified Reason      : Redwood Changes done 
** Search String        : redwood_changes
** Bug Number			: 

****************************************************************************************************************************/

function fnPostCopy_KERNEL() {
	debugs( "In fnPostCopy", "A");
	document.getElementById("BLK_COLLATERALS__COLLATERAL_CODE").value = "";
	
	return true;
}	  
//NoELCM Changes starts
function fnPostLoad_KERNEL() {
	if (parent.screenArgs!=undefined && parent.screenArgs['ACTION']=='LAUNCH') {
		g_prev_action = gAction;
		gAction = "ENTERQUERY";
		fnEnterQuery();
		//document.getElementById("BLK_COLLATERALS__LIAB_ID").value = parent.screenArgs["LIAB_ID"];
		document.getElementById("BLK_COLLATERALS__LIAB_NO").value = parent.screenArgs["LIAB_ID"];
		document.getElementById("BLK_COLLATERALS__COLLATERAL_CODE").value = parent.screenArgs["COLLATERAL_CODE"];
		gAction = "EXECUTEQUERY";
		fnExecuteQuery();
		gAction = g_prev_action;
	}
	return true;
}
//NoELCM Changes ends
//14.0_POST_IT_FIX_CHANGES starts
function fnPostLoad_Sum_KERNEL() {
	if(typeof(mainWin.gCustInfo["LiabNo"])!= 'undefined' && mainWin.gCustInfo["LiabNo"]!=''){
//		document.getElementsByName("LIAB_NO")[0].value = mainWin.gCustInfo["LiabNo"]; 	//redwood_changes commented
		getElementsByOjName("LIAB_NO")[0].value = mainWin.gCustInfo["LiabNo"]; 	//redwood_changes
		document.getElementById("Search").children[0].click();
	}
}
function fnPreShowDetail_Sum_KERNEL(arg) {
var iRowIndex=getRowIndex();
if (iRowIndex == -1)
{
	screenArgs = new Array();  
/*redwood_changes commented
	screenArgs['LIAB_ID'] = getInnerText(document.getElementById("TBL_QryRslts").tBodies[0].rows[sumRsltRowNo].cells[3]); 
	screenArgs['COLLATERAL_CODE'] = getInnerText(document.getElementById("TBL_QryRslts").tBodies[0].rows[sumRsltRowNo].cells[4]);
	var collat_type =getInnerText(document.getElementById("TBL_QryRslts").tBodies[0].rows[sumRsltRowNo].cells[11]);
*/	
	screenArgs['LIAB_ID'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[sumRsltRowNo].cells[3]);   //redwood_changes
	screenArgs['COLLATERAL_CODE'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[sumRsltRowNo].cells[4]);  //redwood_changes
	var collat_type =getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[sumRsltRowNo].cells[11]);  //redwood_changes
}
else
{
    screenArgs = new Array();  
/*redwood_changes commented
	screenArgs['LIAB_ID'] = getInnerText(document.getElementById("TBL_QryRslts").tBodies[0].rows[iRowIndex-1].cells[3]); 
	screenArgs['COLLATERAL_CODE'] = getInnerText(document.getElementById("TBL_QryRslts").tBodies[0].rows[iRowIndex-1].cells[4]);
	var collat_type =getInnerText(document.getElementById("TBL_QryRslts").tBodies[0].rows[iRowIndex-1].cells[11]);
*/
	screenArgs['LIAB_ID'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[iRowIndex-1].cells[3]);   //redwood_changes
	screenArgs['COLLATERAL_CODE'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[iRowIndex-1].cells[4]);  //redwood_changes
	var collat_type =getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[iRowIndex-1].cells[11]);  //redwood_changes
}
//33062401 changes start
    if(mainWin.gCustInfo["FunctionId"] != undefined && mainWin.gCustInfo["FunctionId"] != '' && mainWin.gCustInfo["FunctionId"] == 'STDCUSUM') 
     {
//33062401 changes ends

	   if (typeof(collat_type)!= "undefined" && collat_type=='G'){
      if(mainWin.elcmMode == 'E')	   
       {
	   gAction='EXECUTEQUERY'; 
       screenArgs['SCREEN_NAME'] = 'CVS_MAIN';	
	   screenArgs['FUNCTION_ID'] = 'GEDCOLLT'; 
       screenArgs['ACTION']='LAUNCH';
       screenArgs['UI_XML'] = 'CVS_MAIN';
       screenArgs['LANG'] = mainWin.LangCode;
       screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/'+mainWin.LangCode+'/'+'GEDCOLLT'+'.xml',screenArgs['SCREEN_NAME']);
       screenArgs['PARENT_FUNC_ID'] = 'STDCRCOL';      
	   funcid='GEDCOLLT';
       parent.screenArgs=screenArgs;  
	   mainWin.dispHref1("GEDCOLLT",parent.seqNo);
		}
	  else if(mainWin.elcmMode == 'S')
	   {
	   gAction='EXECUTEQUERY'; 
       screenArgs['SCREEN_NAME'] = 'CVS_MAIN';	
	   screenArgs['FUNCTION_ID'] = 'GWDCOLLT'; 
       screenArgs['ACTION']='LAUNCH';
       screenArgs['UI_XML'] = 'CVS_MAIN';
       screenArgs['LANG'] = mainWin.LangCode;
       screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/'+mainWin.LangCode+'/'+'GWDCOLLT'+'.xml',screenArgs['SCREEN_NAME']);
       screenArgs['PARENT_FUNC_ID'] = 'STDCRCOL';      
	   funcid='GWDCOLLT';
       parent.screenArgs=screenArgs;  
	   mainWin.dispHref1("GWDCOLLT",parent.seqNo);
	   }
	   if(mainWin.elcmMode == 'N')
	   {
	   return true;
	   }
       }
       else if(typeof(collat_type)!= "undefined" && collat_type=='L')   
	  {
	   gAction='EXECUTEQUERY'; 
       screenArgs['SCREEN_NAME'] = 'CVS_COLLATERAL';	
	   screenArgs['FUNCTION_ID'] = 'STDCOLAT'; 
       screenArgs['ACTION']='LAUNCH';
       screenArgs['UI_XML'] = 'CVS_COLLATERAL';
       screenArgs['LANG'] = mainWin.LangCode;
       screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/'+mainWin.LangCode+'/'+'STDCOLAT'+'.xml',screenArgs['SCREEN_NAME']);
       screenArgs['PARENT_FUNC_ID'] = 'STDCRCOL';      
	   funcid='STDCOLAT';
       parent.screenArgs=screenArgs;  
	   mainWin.dispHref1("STDCOLAT",parent.seqNo);
	   }
	//33062401 changes start
	}
	else
	{
		return true;
	}
	//33062401 changes ends	

		return false;
}  
//14.0_POST_IT_FIX_CHANGES ends 