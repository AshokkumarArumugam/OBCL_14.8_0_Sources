/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2018, Oracle and/or its affiliates.
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
**  File Name          : OLDMSPRV_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  Last Modified By   :Rashmi B V 
**  Last modified on   :17-02-23 
**	Description        :Changes W.R.T REDWOOD ADOPTION
**	Search String      :Bug#34958820_REDWOOD_ADOPTION 
****************************************************************************************************************************/
var local_dom = null;
function fnPostExecuteQuery_KERNEL(screenArgs){
	fnEnableElement(document.getElementById("BLK_PREV_HEADER__BTN_PRINT"));
	local_dom = null;
    local_dom = loadXMLDoc(getXMLString(fcjResponseDOM));
	return true;
}
function fnPreExit_KERNEL(){
    if (getNodeText(selectSingleNode(dbDataDOM,"//BLK_PREV_HEADER/PARENTFID"))== undefined)
    {
		fnExitall();
		return;
    }
    else
    {
		gAction = "ADVDELETE";
		fcjRequestDOM = buildUBSXml();
		fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		gAction = "";
    return true;
    }
}
function fnPrint_new(screenArgs){
	var winParams = new Object();
	winParams.mainWin = parent.window;
	parentWinParams = new Object();
	SingleChecked ();
	if (currRowIndex == 0){
		return false;
	}
	//var QryTable = document.getElementById("BLK_MESSAGE_PREV")
	var QryTable = getTableObjForBlock("BLK_MESSAGE_PREV") //Bug#34958820_REDWOOD_ADOPTION
	var rowInfo = QryTable.rows[currRowIndex];
	var er = fnGetDataXMLFromFCJXML(local_dom,currRowIndex);
	dbDataDOM = er;
	screenArgs = new Array();
	screenArgs['SCREEN_NAME'] = 'CVS_OLCMSPRT';
	screenArgs['FUNCTION_ID'] = 'OLCMSPRT';
	screenArgs['MODULE'] = 'OL';
	screenArgs['LANG'] = mainWin.LangCode;
	screenArgs['UI_XML'] = 'OLCMSPRT';
	screenArgs['DESCRIPTION'] = 'Print';
	screenArgs['OPERATION'] = 'Print';
	//screenArgs['CONTREF'] = document.getElementsByName("REFERENCENO").value;
	//screenArgs['LATVERNO'] = document.getElementsByName("LATEVNSEQNO").value;
	//screenArgs['DCN'] =  document.getElementsByName("DCN")[currRowIndex-1].value;
	screenArgs['CONTREF'] = getElementsByOjName("REFERENCENO").value; //Bug#34958820_REDWOOD_ADOPTION
	screenArgs['LATVERNO'] = getElementsByOjName("LATEVNSEQNO").value; //Bug#34958820_REDWOOD_ADOPTION
	screenArgs['DCN'] =  getElementsByOjName("DCN")[currRowIndex-1].value; //Bug#34958820_REDWOOD_ADOPTION
	screenArgs['DBSTRROOTTABLENAME'] = dbStrRootTableName;
	parent.screenArgs=screenArgs;
	mainWin.dispHref1('OLCMSPRT',seqNo);
} 
function fnPreLaunchForm_CVS_MSG_PREV_KERNEL(screenArgs){
    SingleChecked();
    if (currRowIndex == 0){
    return false;}
	 return true;
}
function SingleChecked ()
   {
	var selected_row = 0 ;
	var msob_tchk = 0 ;
	l_currRow = 0 ;
	currRowIndex = 0 ;
	//len = document.getElementById("BLK_MESSAGE_PREV").tBodies[0].rows.length;	
	len = getTableObjForBlock("BLK_MESSAGE_PREV").tBodies[0].rows.length; //Bug#34958820_REDWOOD_ADOPTION
	temp = 0 ;
	for(i = 0;i < len; i++)	{
		//if(document.getElementById("BLK_MESSAGE_PREV").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0])
		if(getTableObjForBlock("BLK_MESSAGE_PREV").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) //Bug#34958820_REDWOOD_ADOPTION
		{
			//if(document.getElementById("BLK_MESSAGE_PREV").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked)
			if(getTableObjForBlock("BLK_MESSAGE_PREV").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) //Bug#34958820_REDWOOD_ADOPTION 			
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
		showErrorAlerts('CS-MSVW-01');
		return false ;
	}
	else if (msob_tchk == 0 )
	{
		showErrorAlerts('CS-MSVW-02');
		return false ;
	}
	else
	{
		currRowIndex = selected_row +1; 
		return true;
	}
}