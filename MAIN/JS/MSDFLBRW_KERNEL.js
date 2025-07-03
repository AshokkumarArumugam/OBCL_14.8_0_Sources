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
**  Copyright (c) 2008 - 2012 by Oracle Financial Services Software Limited. All rights reserved.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : MSDFLBRW_KERNEL.js
**  Purpose            : 
**  Called From        : 
****************************************************************************************************************************/
var  currRowIndex= "";
var DCN_LIST;
var msob_bulk = new Array();
var local_dom = "" ;
var gTsname = '';
var gTsvalue = '';
var gCalledForAuth="N"; 
var gCalledForEdit="N";  
 function SingleCheck() {
	var selected_row = 0 ;
	var msob_tchk = 0 ;
	currRowIndex = 0 ;
	len = document.getElementById("TBL_QryRslts").tBodies[0].rows.length;
	temp = 0 ;


    for(i = 0;i < len; i++)
    {
		if(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
			if(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked)
			{
				msob_tchk = msob_tchk +1;
				selected_row = i ;
				temp=i ;
            }
        }
        else
			break;
    }

	if (msob_tchk > 1 ) {                  
		showErrorAlerts('IN-HEAR-205');
		return false ;
	}
	else if (msob_tchk == 0 ) {                  
		showErrorAlerts('IN-HEAR-206');
		return false ;  
	}
	else {
		currRowIndex = selected_row +1 ;  
	}
	return true;
}
//Function  for View
function fnView(event)
{	 
	return callMSCIOMVW('View');	
}
function callMSCIOMVW(actionCode){
	if (!SingleCheck())
	{
		return false;
	}	
	var detailPk = g_DetPkArray[currRowIndex-1];
	detailWinParams.ShowSummary = "TRUE";
	detailWinParams.DetailPkVals = detailPk;
	
	screenArgs = new Array();
	screenArgs['SCREEN_NAME'] = 'CVS_MAIN';
	screenArgs['FUNCTION_ID'] = 'MSCIOMVW';
	screenArgs['MODULE'] = 'MS';
	screenArgs['LANG'] = mainWin.LangCode;
	screenArgs['UI_XML'] = 'MSCIOMVW'; 
	screenArgs['DESCRIPTION'] = actionCode;
	screenArgs['OPERATION'] = actionCode;
	screenArgs['FILEREFID']=getInnerText(document.getElementById("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[1]);
	parent.screenArgs=screenArgs;
mainWin.dispHref1('MSCIOMVW',seqNo); 
	return true;
}
