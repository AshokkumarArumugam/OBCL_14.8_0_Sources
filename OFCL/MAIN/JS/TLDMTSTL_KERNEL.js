/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : TLDMTSTL_KERNEL.js
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

var msg_status='';
var l_perv_SUBSYSSTAT="";
var l_curr_SUBSYSSTAT="";
var existing_flag="";
var row_checked;
var stat_col_no=0;
var data_blk = "BLK_TLTBS_CONSOL_TRADE_DETAIL";

function SetMultiCallformflag(P_screen)
{
	row_checked=-1;
	
   
	//Bug#36619894_1 changes starts	
    //var numRows = getTableObjForBlock(data_blk).tBodies[0].rows.length;
	var numRows = getOjTableRowsLength(data_blk);
	//Bug#36619894_1 changes ends
        for (var index = 0; index <= numRows - 1; index++) {
            if (getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true)
			{
				row_checked=index;
				//l_curr_SUBSYSSTAT:=TLCEXSSI:D;TLCMEMUP:D;TLCFMEMO:D;OLCETMVW:D;LBCCOLAT:D;
				l_curr_SUBSYSSTAT=document.getElementById("BLK_TLTBS_CONSOL_TICKET_MASTER__SUBSYSSTAT").value;
				//var flagstats = fn_GetCellIndex("SUBSYSTEM_STAT","BLK_TLTBS_CONSOL_TRADE_DETAIL");
				var flagstats =23;
				//var l_TRADE_SUBSYSTEM_STAT=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[flagstats].value;
				var l_TRADE_SUBSYSTEM_STAT=getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[flagstats].getElementsByTagName("oj-input-text")[0].value;
				var TextContents = mySplit(l_curr_SUBSYSSTAT,";");
				var TextContents_TRADE_SUBSYSTEM_STAT=mySplit(l_TRADE_SUBSYSTEM_STAT,";");
				if(l_TRADE_SUBSYSTEM_STAT=="TLCFMEMO:U;TLCMEMUP:U;" || l_TRADE_SUBSYSTEM_STAT=="TLCMEMUP:U;TLCFMEMO:U;")
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
						//l_TRADE_SUBSYSTEM_STAT="TLCFMEMO:D;TLCMEMUP:P;";
						//l_TRADE_SUBSYSTEM_STAT="TLCFMEMO:P;"+TextContents_TRADE_SUBSYSTEM_STAT[1]+";";
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
				document.getElementById("BLK_TLTBS_CONSOL_TICKET_MASTER__SUBSYSSTAT").value	   =l_curr_SUBSYSSTAT;
				
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
function fn_GetCellIndex(pVar,p_tablename) {
	
	//Bug#36619894_1 changes starts	
    //var len=getTableObjForBlock(p_tablename).tBodies[0].rows[1].cells.length
	var len = getOjTableRowsLength(p_tablename);
	//Bug#36619894_1 changes ends
    for (var i = 0; i < len; i++) {
        if (getTableObjForBlock(p_tablename).tBodies[0].rows[1].cells[i].innerText == pVar) {
            return i;
        }
    }
}

function hit_backend()
{
	
    appendData();
    fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	if (fcjResponseDOM) {
    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
    if (msgStatus == "FAILURE") 
	{
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
    } 
	else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
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
	msg_status=msgStatus;
    return true;
}
function fnPreAuthorize_KERNEL(){
    authFunction = 'TLDMTSAU';
    authUixml = 'TLDMTSAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
	screenArgs['CONSOL_TICKET_REF_NO'] = document.getElementById('BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO').value;    
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
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
	return true;
}
function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONSOL_TICKET_REF_NO'] = document.getElementById('BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO').value;    
    return true;
}
function FnFmemo()
{
	if(gAction == "EXECUTEQUERY")
	{
		fnSubScreenMain('TLCFMEMO', '', 'CVS_TLCFMEMO', false);
	}
	else
		{
		if(SetMultiCallformflag('TLCFMEMO'))
		{
			fnSubScreenMain('TLCFMEMO', '', 'CVS_TLCFMEMO', false);
		}
	}
	
	return true;
}
function FnFmemup()
{
	if(gAction == "EXECUTEQUERY")
	{
		fnSubScreenMain('TLCMEMUP', '', 'CVS_MEMUP_MAIN', false);
	}
	else
		{
	
			if (SetMultiCallformflag('TLCMEMUP'))
			{
				fnSubScreenMain('TLCMEMUP', '', 'CVS_MEMUP_MAIN', false);
			}
		}
	
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
function fnPreLoad_CVS_MEMUP_MAIN_KERNEL(){

	//fnFundingMemo();
	if (!check_screen('TLCMEMUP'))
	{
			 showErrorAlerts('IN-TRD-002');
			return false;
		}	
	return true;
}
function fnPreLoad_CVS_TLCFMEMO_KERNEL(){

	if (!check_screen('TLCMEMO'))
	{
			 showErrorAlerts('IN-TRD-001');
			return false;
	}		
	/*
	//fnFundingMemo();
	var l_memup = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "//BLK_TRD_STL/FMEMUP"));
	var l_memo = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1), "//BLK_TRD_STL/FMEMO"));
	if ((l_memo == 'N') && (l_memup == 'Y')){
		//alret
		 showErrorAlerts('IN-TRD-001');
        return false; 
	}
	*/
	return true;
}


function fnPopulateTrade()
{
	l_prev_gAction=gAction;
	gAction = "ENRICH";
	hit_backend();
	gAction = l_prev_gAction;
	return true;
}
function  fnGenerate_Ref()
{
	l_prev_gAction=gAction;
	gAction = "PRDDFLT";
	hit_backend();
	gAction = l_prev_gAction;
	if(document.getElementById('BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO')!="" && (msg_status == "WARNING" || msg_status == "SUCCESS") ){
		//fnDisableElement(document.getElementById('BLK_TLTBS_CONSOL_TXT_ACTUAL_SETTL_DATE'));
		fnDisableElement(document.getElementById('BLK_TLTBS_CONSOL_TICKET_MASTER__BTN_SETDT_POP'));
	}
	
	return true;
}

function fnPostNew_KERNEL()
{	
	document.getElementById("BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO").disabled=true; 
	document.getElementById("BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO").nextSibling.style.visibility='hidden'; 
	return true;
}

function fnPostExecuteQuery_KERNEL() {
	if(document.getElementById('BLK_TLTBS_CONSOL_TICKET_MASTER__AUTHBTNFLAG')=="N")
	{
		DisableToolbar_buttons('Authorize'); 
	}
	var  l_Auth_Stat = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1),"//BLK_TLTBS_CONSOL_TICKET_MASTER/AUTHSTAT"));
	if (l_Auth_Stat == 'A'){
		 DisableToolbar_buttons('Authorize'); 
		 DisableToolbar_buttons('Delete');
	}
	var l_Maker = getNodeText(selectSingleNode(fnGetDataXMLFromFCJXML(fcjResponseDOM, 1),"//BLK_TLTBS_CONSOL_TICKET_MASTER/MAKERID"));
	if (l_Maker == mainWin.UserId) {
			 DisableToolbar_buttons('Authorize'); 
		}
	var data_blk = "BLK_TLTBS_CONSOL_TRADE_DETAIL";
var len = 0;

//Bug#36619894_1 changes starts	
//len = getTableObjForBlock("BLK_TLTBS_CONSOL_TRADE_DETAIL").tBodies[0].rows.length;
  len = getOjTableRowsLength("BLK_TLTBS_CONSOL_TRADE_DETAIL");
//Bug#36619894_1 changes ends
	
		for(i = 0;i < len; i++)
			{
				fnEnableElement(getElementsByOjName("BTN_FMEMO")[i]); 
				fnEnableElement(getElementsByOjName("BTN_FMEMUP")[i]); 
			}
			
		

   
	return true;
}

function fnPaymentDetail()
{
	return true;
}
function fnSSI()
{
	return true;
}
function fnEvent()
{
	return true;
}
function fnExtParty()
{
	return true;
}

function fnErrorLog()
{
	return true;
}

function fnSettlementInfo()
{
	return true;

}
function fnVwmsg()
{
	return true;

}