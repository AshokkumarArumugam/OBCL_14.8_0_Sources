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
**  File Name          : LBDMSGVW_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**	Changed By         : Jayaram N
**	Date               : 22-JAN-2023
**	Change Description : REDWOOD - Fix for error "Please select a record" when trying to reprocess Handoff records
**	Search String      : Bug#34958820
****************************************************************************************************************************/
var currRowIndex = "";
var local_dom = "" ;
var len = 0;
var msob_tchk = 0 ;
var temp = 0;
var l_currRow ="";


function fnOnClick_BTN_PREV()
{
	
	var esn=Number(document.getElementById("BLK_BORR_EVENTS__EVENT_SEQ_NO").value);
	var esn_Count=Number(document.getElementById("BLK_BORR_EVENTS__LATEST_EVENT_SEQ_NO").value);
	if(esn == 1){
		showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E"); //Already in the first record
	}
	esn--;
	if(esn>0)
	{			
		document.getElementById("BLK_BORR_EVENTS__EVENT_SEQ_NO").value=esn;		
		g_prev_gAction=gAction;
		
		gAction='EXECUTEQUERY';		
		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}

function fnOnClick_BTN_NEXT()
{
	
	var esn=Number(document.getElementById("BLK_BORR_EVENTS__EVENT_SEQ_NO").value);
	var esn_Count=Number(document.getElementById("BLK_BORR_EVENTS__LATEST_EVENT_SEQ_NO").value);
	if(esn == esn_Count){
		showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E"); //Already in the last record
	}
	if(esn<esn_Count)
	{
		esn++;
		document.getElementById("BLK_BORR_EVENTS__EVENT_SEQ_NO").value=esn;	
		g_prev_gAction=gAction;
		
		gAction='EXECUTEQUERY';		
		fnExecuteQuery();
		gAction=g_prev_gAction;
	}
	return true;
}

function fnPostExecuteQuery_KERNEL() 
{ 
//fnEnableElement(document.getElementById("BLK_MESSAGE__BTN_PRINT"));  // 9NT1606_ALLUBT_12.0.3_18972162
// 9NT1606_ALLUBT_12.0.3_18972162
		fnEnableElement(document.getElementById("BLK_BORR_EVENTS__BTN_NEXT"));
		fnEnableElement(document.getElementById("BLK_BORR_EVENTS__BTN_PREV"));
		
		
		len = getTableObjForBlock("BLK_BORR_MSG_OUT").tBodies[0].rows.length;
	
		for(i = 0;i < len; i++)
			{
				fnEnableElement(getElementsByOjName("BTN_VW_BRW")[i]); 
			}
			
		len = getTableObjForBlock("BLK_PART_MSG_OUT").tBodies[0].rows.length;
	
		for(i = 0;i < len; i++)
			{
				fnEnableElement(getElementsByOjName("BTN_VW_MSG")[i]); 
			}

//FCUBS_11.3.0_P01_FC11.1_IMPSUPP_513 - 08-09-2011 - Starts
local_dom =null;
      
local_dom=loadXMLDoc(getXMLString(fcjResponseDOM));

//FCUBS_11.3.0_P01_FC11.1_IMPSUPP_513 - 08-09-2011 - Ends
   return true; 
}


function fnView_Msg(screenArgs){
  var winParams = new Object();
  winParams.mainWin = parent.window;
  parentWinParams = new Object();
  var gAction='EXECUTEQUERY';
  SingleChecked ();
 if (currRowIndex == 0){
  return false;}
  //var QryTable = document.getElementById("BLK_BORR_MSG_OUT") //Bug#34958820:Commented
  var QryTable = getTableObjForBlock("BLK_BORR_MSG_OUT") //Bug#34958820:Added
  var rowInfo = QryTable.rows[currRowIndex];
  var er = fnGetDataXMLFromFCJXML(local_dom,currRowIndex);
  dbDataDOM = er;
  screenArgs = new Array();	
  screenArgs['SCREEN_NAME'] = 'CVS_OLDVWMSG';	
  screenArgs['MODULE'] = 'OL';
  screenArgs['LANG'] = mainWin.LangCode;
  screenArgs['UI_XML'] = 'OLDVWMSG';	
  screenArgs['PRNT_FUNCT'] = 'LBDMSGVW';
  
 screenArgs['ACTION_CODE'] = 'EXECUTEQUERY';
  screenArgs['OPERATION'] = 'EXECUTEQUERY';
  //screenArgs['DCN'] =  document.getElementById("BLK_BORR_MSG_OUT__DCN").value;
 
  screenArgs['DCN'] =  getElementsByOjName("DCN")[currRowIndex - 1].value;
  screenArgs['DBSTRROOTTABLENAME'] = dbStrRootTableName;
  
  mainWin.dispHref1('OLDVWMSG',seqNo);  	
  parent.screenArgs=screenArgs;	
  return true;
 } 
 
 
 function fnViewPart_Msg(screenArgs){
  var winParams = new Object();
  winParams.mainWin = parent.window;
  parentWinParams = new Object();
  var gAction='EXECUTEQUERY';
  SingleChecked ();
 if (currRowIndex == 0){
  return false;}
  //var QryTable = document.getElementById("BLK_BORR_MSG_OUT") //Bug#34958820:Commented
  var QryTable = getTableObjForBlock("BLK_BORR_MSG_OUT") //Bug#34958820:Added
  var rowInfo = QryTable.rows[currRowIndex];
  var er = fnGetDataXMLFromFCJXML(local_dom,currRowIndex);
  dbDataDOM = er;
  screenArgs = new Array();	
  screenArgs['SCREEN_NAME'] = 'CVS_OLDVWMSG';	
  screenArgs['MODULE'] = 'OL';
  screenArgs['LANG'] = mainWin.LangCode;
  screenArgs['UI_XML'] = 'LBDVWMSG';	
  screenArgs['PRNT_FUNCT'] = 'LBDMSGVW';
  
 screenArgs['ACTION_CODE'] = 'EXECUTEQUERY';
  screenArgs['OPERATION'] = 'EXECUTEQUERY';
  //screenArgs['DCN'] =  document.getElementById("BLK_BORR_MSG_OUT__DCN").value;
 
  screenArgs['DCN'] =  getElementsByOjName("DCN")[currRowIndex - 1].value;
  screenArgs['DBSTRROOTTABLENAME'] = dbStrRootTableName;
  
  mainWin.dispHref1('LBDVWMSG',seqNo);  	
  parent.screenArgs=screenArgs;	
  return true;
 }
 
function SingleChecked ()
   {
	var selected_row = 0 ;
	var msob_tchk = 0 ;
	l_currRow = 0 ;
	currRowIndex = 0 ;
	
	len = getTableObjForBlock("BLK_BORR_MSG_OUT").tBodies[0].rows.length;
	temp = 0 ;
	for(i = 0;i < len; i++)
	{
		/*if(getTableObjForBlock("BLK_BORR_MSG_OUT").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0])
		{
			if(getTableObjForBlock("BLK_BORR_MSG_OUT").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked)*///Bug#34958820:Commented
		if (getTableObjForBlock("BLK_BORR_MSG_OUT").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) { //Bug#34958820:Added
			if (getTableObjForBlock("BLK_BORR_MSG_OUT").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true) //Bug#34958820:Added		
				
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