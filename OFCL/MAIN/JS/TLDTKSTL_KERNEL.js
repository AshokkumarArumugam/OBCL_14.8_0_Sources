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
**  File Name          : TLDTKSTL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 24-May-2024
**  Search String      : Bug#36619894_1 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize as override block length is returning value even when there are no overrides. 
						 Modified the code to get the length from getOjTableRowsLength instead of fetching it from getTableObjForBlock. 
****************************************************************************************************************************/


var data_blk = "BLK_TRD_DET";

 function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
	//debugger;
    screenArgs['TKTID'] = document.getElementById('BLK_TKT_MASTER__TKT_ID').value;
	  screenArgs['TKT_REF_NO'] = document.getElementById('BLK_TKT_MASTER__TKT_REF_NO').value;
	  screenArgs['MAKER'] = document.getElementById('BLK_FOOTER__MAKER').value;
	   screenArgs['MAKER_DT_STAMP'] = document.getElementById('BLK_FOOTER__MAKER_DT_STAMP').value;
	   	  screenArgs['ACT_STL_DTI'] = document.getElementById('BLK_TKT_MASTER__ACT_STL_DTI').value;
		  //screenArgs['PARAMETER_FIELD'] = document.getElementById('BLK_TKT_MASTER__PARAMETER_FIELD').value;
		  
		  /////////////////////setting trade date and expt setl date
		   //var tableObject = document.getElementById('BLK_TRD_DET');
		   var tableObject = getTableObjForBlock('BLK_TRD_DET'); //Redwood_Changes
	//Bug#36619894_1 changes starts	
    //var numRows = tableObject.tBodies[0].rows.length;
	var numRows = getOjTableRowsLength("BLK_TRD_DET");
	//Bug#36619894_1 changes ends
    var rowid;
	
    for (var index = 0; index <= numRows - 1; index++) {
       // if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("input")[0].value == true) {  //Redwood_Changes
        if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {  //Redwood_Changes
            rowid = index;
			tableObject.tBodies[0].rows[rowid].cells[11].value
			
        }
		
    }
	//}
		  ////////////////setting trade date and expt setl date
		    
    screenArgs['SUB_SCREEN'] = 'Y';
	
    return true;
}

function fnPreAuthorize_KERNEL(screenArgs) {
	
	////////////////////////////////////////////////////////
		var p_status=document.getElementById("BLK_FOOTER__UI_TICKET_AUTH_STAT").value;

	
	if (p_status=='Authorized'){
		showAlerts(fnBuildAlertXML('', 'E',"Nothing to Authorize"),'E');
		return false;
	}
	
	////////////////////////////////////////////////////////
	
	
		authFunction = 'TLDTKSAU';
		authUixml = 'TLDTKSAU';
		authScreenName = 'CVS_AUTH';
		gAction = 'EXECUTEQUERY';
		ArrFuncOrigin['TLDTKSAU'] = "KERNEL";
		ArrPrntFunc['TLDTKSAU'] = "";
		ArrPrntOrigin['TLDTKSAU'] = "";
		return true;
}

function fnPostAuthorize_KERNEL() {
//debugger;
    /* gAction = "EXECUTEQUERY";
    fnExecuteQuery();
    return true; */
	
	debugs("In fnPostAuthorize", "A");
	if(document.getElementById("BLK_FOOTER__UI_TICKET_AUTH_STAT").value=='Authorized'){
		DisableToolbar_buttons("AUTHORIZE");
		DisableToolbar_buttons("DELETE");
	}
	//DisableToolbar_buttons('AUTHORIZE');
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
	return true;
}	 


function fnFee(){
	//debugger;
	fnSubScreenMain('TLDTKSTL', 'TLDTKSTL', 'CVS_ASSIGN_FEE', false);
	return true;
}

function fnPaymntDetail(){
	//debugger;
	fnSubScreenMain('TLDTKSTL', 'TLDTKSTL', 'CVS_PAY_DTL', false);
	return true;
}

function fnSSI(){
	//debugger;
	fnSubScreenMain('TLDTKSTL', 'TLDTKSTL', 'CVS_TKT_SSI', false);
	return true;
}
function fnError(){

		//debugger;
	fnSubScreenMain('TLDTKSTL', 'TLDTKSTL', 'CVS_ERROR', false);
	return true;
}
	
	
	


	

function StatusChange()
{
	var flagstats =22;
	var l_TRADE_SUBSYSTEM_STAT=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[flagstats].getElementsByTagName("oj-input-text")[0].value;
	
				var l_TRADE_SUBSYSTEM_STAT=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[flagstats].getElementsByTagName("oj-input-text")[0].value;
				var TextContents_TRADE_SUBSYSTEM_STAT=mySplit(l_TRADE_SUBSYSTEM_STAT,";");
				if (TextContents_TRADE_SUBSYSTEM_STAT[0]=="TLCMEMUP:P")
					{
						TextContents_TRADE_SUBSYSTEM_STAT[0]='TLCMEMUP:D';
					}
					if (TextContents_TRADE_SUBSYSTEM_STAT[1]=="TLCFMEMO:P")
					{
						TextContents_TRADE_SUBSYSTEM_STAT[1]="TLCFMEMO:D";
					}
				
	return true;
}


function SetMultiCallformflag(P_screen)
{
	row_checked=-1;
	var data_blk = "BLK_TRD_DET";
	//Bug#36619894_1 changes starts	
    //var numRows = getTableObjForBlock(data_blk).tBodies[0].rows.length;
	var numRows = getOjTableRowsLength("BLK_TRD_DET");
	//Bug#36619894_1 changes ends
        for (var index = 0; index <= numRows - 1; index++) {
            if (getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true)
			{
				//'SUBSYSSTAT'
				row_checked=index;
				//l_curr_SUBSYSSTAT:=TLCEXSSI:D;TLCMEMUP:D;TLCFMEMO:D;OLCETMVW:D;LBCCOLAT:D;
				l_curr_SUBSYSSTAT=document.getElementById("BLK_TKT_MASTER__SUBSYSSTAT").value;
				//var flagstats = fn_GetCellIndex("SUBSYSTEM_STAT","BLK_TLTBS_CONSOL_TRADE_DETAIL");
				var flagstats =22;
				//var l_TRADE_SUBSYSTEM_STAT=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[flagstats].value;
				var l_TRADE_SUBSYSTEM_STAT=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[flagstats].getElementsByTagName("oj-input-text")[0].value;
				

var TextContents = mySplit(l_curr_SUBSYSSTAT,";");

var TextContents_TRADE_SUBSYSTEM_STAT=mySplit(l_TRADE_SUBSYSTEM_STAT,";");

				if(l_TRADE_SUBSYSTEM_STAT=="TLCFMEMO:U;TLCMEMUP:U;"|| l_TRADE_SUBSYSTEM_STAT=="TLCMEMUP:U;TLCFMEMO:U;")
				{
					var l_curr_SUBSYSSTAT=TextContents[0]+";"+"TLCFMEMO:U;TLCMEMUP:U"+";"+TextContents[3]+";"+TextContents[4]+";";
				}
				else{
if (TextContents_TRADE_SUBSYSTEM_STAT[0]=="TLCMEMUP:P")
					{
						TextContents_TRADE_SUBSYSTEM_STAT[0]='TLCMEMUP:D';
					}
					if (TextContents_TRADE_SUBSYSTEM_STAT[1]=="TLCFMEMO:P")
					{
						TextContents_TRADE_SUBSYSTEM_STAT[1]="TLCFMEMO:D";
					}
					if (P_screen=='TLCFMEMO')
					{
						var l_curr_SUBSYSSTAT=TextContents[0]+";"+"TLCFMEMO:D;"+TextContents[2]+";"+TextContents[3]+";"+TextContents[4]+";";
						

l_TRADE_SUBSYSTEM_STAT=TextContents_TRADE_SUBSYSTEM_STAT[0]+";"+"TLCFMEMO:P;";
	}
					else if( P_screen=='TLCMEMUP')
						{
							var l_curr_SUBSYSSTAT=TextContents[0]+";"+TextContents[1]+";"+"TLCMEMUP:D;"+TextContents[3]+";"+TextContents[4]+";";
							//var l_curr_SUBSYSSTAT=TextContents[0]+";"+"TLCFMEMO:D;TLCMEMUP:D"+";"+TextContents[3]+";"+TextContents[4]+";";
							//l_TRADE_SUBSYSTEM_STAT="TLCFMEMO:P;TLCMEMUP:D;";
							//l_TRADE_SUBSYSTEM_STAT=TextContents_TRADE_SUBSYSTEM_STAT[1]+";"+"TLCMEMUP:P;";
							l_TRADE_SUBSYSTEM_STAT="TLCMEMUP:P;"+TextContents_TRADE_SUBSYSTEM_STAT[1]+";";
						}
				}
				
				getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[flagstats].getElementsByTagName("oj-input-text")[0].value=l_TRADE_SUBSYSTEM_STAT;
				document.getElementById("BLK_TKT_MASTER__SUBSYSSTAT").value	   =l_curr_SUBSYSSTAT;
				
				return true;
            }
        }
		if(row_checked < 0) 
		{
			alert('Please select one record');
			return false;
		}
	return true;
}
function mySplit(str, ch) {
    var pos, start = 0, result = [];
    while ((pos = str.indexOf(ch, start)) != -1) {
        result.push(str.substring(start, pos));
        start = pos + 1;
    }
    result.push(str.substr(start));
    return(result);    
}
function getText(elem) {
	if (getBrowser().indexOf("IE") != -1) {
		return elem.text;
	}else{
		return elem.textContent;
	}
}
	
function fnFmemo(){
/* 	debugger;
	var rowRef =getTableObjForBlock("BLK_TRD_DET").tBodies[0].rows; 

if (fnCheck()) {	
    for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
      {
	     
		 getTableObjForBlock("BLK_TRD_DET").tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked = true;
		 
         //alert(getTableObjForBlock("BLK_TRD_DET").tBodies[0].rows[rowIndex].cells[1].value);
       }
	} */
	if(SetMultiCallformflag('TLCFMEMO'))
	{
		fnSubScreenMain('TLCFMEMO', '', 'CVS_TLCFMEMO', false);
	}
	fnEnable();
	StatusChange();
	return true;
}

function fnFmemup(){
	if (SetMultiCallformflag('TLCMEMUP'))
	{
		fnSubScreenMain('TLCMEMUP', '', 'CVS_MEMUP_MAIN', false);
	}
	fnEnable();
	StatusChange();
	return true;
}



function fnPreLoad_CVS_MEMUP_MAIN_KERNEL(){
	
	//fnFundingMemo();
	/* if (!check_screen('TLCMEMUP'))
	{
			 showErrorAlerts('IN-TRD-002');
			return false;
		}	 */
	return true;
}
function fnPreLoad_CVS_TLCFMEMO_KERNEL(){
	
	/* if (!check_screen('TLCMEMO'))
	{
			 showErrorAlerts('IN-TRD-001');
			return false;
	}		
	 */
	return true;
}




function check_screen(P_screen)
{
	if (row_checked >=0)
	{
		var COLUMNScreen =23;
		var l_SCREENFLAG_STAT=getTableObjForBlock(data_blk).tBodies[0].rows[row_checked].cells[COLUMNScreen].getElementsByTagName("oj-input-text")[0].value;
		var COLUMNTRADE_SUBSYSTEM =22;
		var l_TRADE_SUBSYSTEM_STAT=getTableObjForBlock(data_blk).tBodies[0].rows[row_checked].cells[COLUMNTRADE_SUBSYSTEM].getElementsByTagName("oj-input-text")[0].value;
		var TRADE_SUBSYSTEM_STAT=mySplit(l_TRADE_SUBSYSTEM_STAT,";");
		var TextContentsSCREEN = mySplit(l_SCREENFLAG_STAT,";");
		//if ((l_memo == 'Y') && (l_memup == 'N')){
		//if (TextContentsSCREEN[0]=='TLCMEMUP:Y' && TextContentsSCREEN[]=='TLCMEMUP:P')
		//	'TLCMEMUP:N;TLCFMEMO:N;VALIDATION:N;FUNCTIONID:N';'TLCMEMUP:N;TLCFMEMO:N;VALIDATION:N;FUNCTIONID:N';
		if('TLCMEMUP'==P_screen && TextContentsSCREEN[2]=='VALIDATION:Y')
		{
			if(TextContentsSCREEN[0]=='TLCMEMUP:N')
			{
				showErrorAlerts('IN-TRD-002');
				return false;
			}
			else if (TextContentsSCREEN[0]=='TLCMEMUP:Y')
			{
				return true;
			}
		}
		if('TLCFMEMO'==P_screen && TextContentsSCREEN[2]=='VALIDATION:Y')
		{
			if(TextContentsSCREEN[1]=='TLCFMEMO:N')
			{
				showErrorAlerts('IN-TRD-001');
				return false;
			}
			else if(TextContentsSCREEN[1]=='TLCFMEMO:Y')
			{
				return true;
			}
			
		}
			
		
	}
	return true;
}




function fnEnable(){
	    //Bug#36619894_1 changes starts	
		//var rowRef=getTableObjForBlock("BLK_TRD_DET").tBodies[0].rows;  
		var len = getOjTableRowsLength("BLK_TRD_DET");
	
		var append_index="";
		 //for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
		 for(var rowIndex =0; rowIndex < len; rowIndex++)	
	    //Bug#36619894_1 changes ends 	
			 
      {
		  if(rowIndex>0){
			  append_index=rowIndex;
		  }
		
	fnEnableElement(document.getElementById("BLK_TRD_DET__BTN_FMEMO"+append_index));
	fnEnableElement(document.getElementById("BLK_TRD_DET__BTN_FMEMUP"+append_index));
        
       }
}




function fnCheck() {
	//Bug#36619894_1 changes starts	
    // len = getTableObjForBlock("BLK_TRD_DET").tBodies[0].rows.length;
	var len = getOjTableRowsLength("BLK_TRD_DET");
	//Bug#36619894_1 changes ends
    //alert(len);
    msob_tchk = 0;
    for (var i = 0; i < len; i++) {
        if (getTableObjForBlock("BLK_TRD_DET").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
            if (getTableObjForBlock("BLK_TRD_DET").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
                msob_tchk = msob_tchk + 1;
                selected_row = i;
            }
        } else
            break;
    }
    if (msob_tchk == 0) {
        alert('Please Select a Record');
        //showErrorAlerts('IN-HEAR-206');
        return false;
    } else if (msob_tchk > 1) {
        alert('Please Select One Record');
        //showErrorAlerts('IN-HEAR-206');
        return false;
    }
    return true;
}


  
  
  function fnDefaultAndPopulate(){
	  // document.getElementById("BLK_TKT_MASTER__ACT_STL_DTI").disabled=true;
	 // document.getElementById("BLK_TKT_MASTER__ACT_STL_DTI").nextSibling.disabled=true;
	  
	  
	  	  document.getElementById("BLK_TKT_MASTER__TKT_ID").disabled=true;
	  document.getElementById("BLK_TKT_MASTER__TKT_ID").nextSibling.disabled=true;
	  
	 
	  	  	 // document.getElementById("BLK_TKT_MASTER__AGENCY_ID").disabled=true;
	  //document.getElementById("BLK_TKT_MASTER__AGENCY_ID").nextSibling.disabled=true;
	  
	  
	   document.getElementById("BLK_TKT_MASTER__NEW_NON_PRORATA").disabled=true;
	  
	g_prev_gAction = gAction;
	gAction = "ENRICH";
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if (fcjResponseDOM) 
	{
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") 
		{
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } 
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	//OFCL_12.3.0.0.0_25096590 changes starts
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
 gAction = g_prev_gAction;
 
 
 
 
 
 ////////////////////////////////////////////////////////////////////////to enable funding memo
    //Bug#36619894_1 changes starts	
 	//var rowRef=getTableObjForBlock("BLK_TRD_DET").tBodies[0].rows;  
	var len = getOjTableRowsLength("BLK_TRD_DET");
	
	var append_index="";
	//for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	for(var rowIndex =0; rowIndex < len; rowIndex++)	
    //Bug#36619894_1 changes ends
      {
		  if(rowIndex>0){
			  append_index=rowIndex;
		  }
		
	fnEnableElement(document.getElementById("BLK_TRD_DET__BTN_FMEMO"+append_index));
	fnEnableElement(document.getElementById("BLK_TRD_DET__BTN_FMEMUP"+append_index));
        
       }
 
 ///////////////////////////////////////////////////////////////////////to enable funding memo
 
 
 
 
 return true; 
}




function fnViewSett_Msg(){
	
  //fnSubScreenMain('OLCETMVW','','CVS_SETTLEMENTINFO');
  return true;
 }
 
 
 
 function fnPostLoad_CVS_PAY_DTL_KERNEL(screenArgs) {
	//debugger;
	subScreen = 'Y';
	//if (screenArgs['SUB_SCREEN'] == 'Y'){		
		/* document.getElementById('BLK_TLTB_TICKET__TICKET_ID').value = screenArgs['TKTID'];	
		 document.getElementById('BLK_TLTB_TICKET__TICKET_REF_NO').value =screenArgs['TKT_REF_NO']  ;
	document.getElementById('BLK_TLTB_TICKET__MAKER_ID').value   =screenArgs['MAKER'] ;
	document.getElementById('BLK_TLTB_TICKET__MAKER_DT_STAMP').value   =  screenArgs['MAKER_DT_STAMP'];
	   document.getElementById('BLK_TLTB_TICKET__ACTUAL_SETTL_DATE').value	 =    screenArgs['ACT_STL_DTI']; */
	    //document.getElementById('BLK_TLTB_TICKET__PARAMETER_FIELD').value =screenArgs['PARAMETER_FIELD'];
	   
		/* functionOrigin = 'KERNEL'; 
		dbIndexArray['BLK_PAY_DTL'] = getDbIndex("BLK_PAY_DTL");
		gAction = "EXECUTEQUERY";
		appendData();
		fcjRequestDOM = buildUBSXml();
		fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
		var msgStatus = fnProcessResponse(); */
		//fnEnableElement(document.getElementById("BLK_TLTB_SUBTICKET__BTN_SETTLEMENT_INFO"));
		
		//Bug#36619894_1 changes starts	
		//var rowRef=getTableObjForBlock("BLK_PAY_DTL").tBodies[0].rows;  
		var len = getOjTableRowsLength("BLK_PAY_DTL");
		
		var append_index="";
		//for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
		for(var rowIndex =0; rowIndex < len; rowIndex++)
		//Bug#36619894_1 changes ends
      {
		  if(rowIndex>0){
			  append_index=rowIndex;
		  }
			//fnEnableElement(getTableObjForBlock("BLK_PAY_DTL").tBodies[0].rows[rowIndex].cells[7].getElementById("BLK_PAY_DTL__BTN_PAY_STL_INFO"+append_index));
	
	fnEnableElement(document.getElementById("BLK_PAY_DTL__BTN_PAY_STL_INFO"+append_index));
       
       }
		
		
		//fnEnableElement(document.getElementById("BLK_PAY_DTL__BTN_PAY_STL_INFO"));
	

	//}
	
	

	   
	   
	   
	   
	return true;
}




function fnPostNew_KERNEL() {
	//debugger;

    //Bug#36619894_1 changes starts	
	//var rowRef=getTableObjForBlock("BLK_TRD_DET").tBodies[0].rows;  
	var len = getOjTableRowsLength("BLK_TRD_DET");
	
		var append_index="";
	//for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	for(var rowIndex =0; rowIndex < len; rowIndex++)
	//Bug#36619894_1 changes ends
      {
		  if(rowIndex>0){
			  append_index=rowIndex;
		  }
		
	fnEnableElement(document.getElementById("BLK_TRD_DET__BTN_FMEMO"+append_index));
        fnEnableElement(document.getElementById("BLK_TRD_DET__BTN_FMEMUP"+append_index));
		
       
       }
	 fnEnableElement(document.getElementById("BLK_TKT_MASTER__NEW_NON_PRORATA"));
	   
	return true;
}

function fnPostExecuteQuery_KERNEL(){
	//debugger;
 
	//Bug#36619894_1 changes starts	
	//var rowRef=getTableObjForBlock("BLK_TRD_DET").tBodies[0].rows;  
	var len = getOjTableRowsLength("BLK_TRD_DET");
		
		var append_index="";
		 //for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
	for(var rowIndex =0; rowIndex < len; rowIndex++)
	//Bug#36619894_1 changes ends
      {
		  if(rowIndex>0){
			  append_index=rowIndex;
		  }
		
	fnEnableElement(document.getElementById("BLK_TRD_DET__BTN_FMEMO"+append_index));
        fnEnableElement(document.getElementById("BLK_TRD_DET__BTN_FMEMUP"+append_index));
       }
	   if(document.getElementById("BLK_FOOTER__UI_TICKET_AUTH_STAT").value=='Authorized'){
		DisableToolbar_buttons("AUTHORIZE");
		DisableToolbar_buttons("DELETE");
	}
}

