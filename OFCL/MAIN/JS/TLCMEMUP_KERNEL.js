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
**  File Name          : TLCMEMUP_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**
**  Last Modified By   : Pallavi R
**  Last modified on   : 17-Apr-2017
**  Search String	   : FCUBS_12.4_OFCL_#25902762
**  Reason             :  BTN_GENERATE is not working
**
**  Last Modified By   : Lokendra Sharma
**  Last modified on   : 26-Apr-2017
**  Search String	   : FCUBS_12.4_OFCL_#25902762
**  Reason             : BTN SUM_AMT and DD selection is not working
**
**  Last Modified By   : Jayaram N
**  Last modified on   : 25-Apr-2022
**  Search String	   : TLDSETTL-INTEREST DETAILS ARE GETTING CLEARED FOR MULTIPLE DRAWDOWNS(MANUAL FUNDING MEMO SCREEN)
**  Reason             : Bug#34062996

**  CHANGE LOG         : KAVITHA ASOKAN
**  Last modified on   : 03-MAY-2024
**  Reason             : Enabling buttons after sessions is refresh. 
**  SEARCH STRING      : BUG#36596453 changes 

****************************************************************************************************************************/
/*function fnPreSave_CVS_MEMUP_MAIN_KERNEL(){
	debugger;
	//fnClassDefault("BLK_TLTBS_FMEM_UPLOAD_MASTER");
	return true;
}*/
var CurrRow = 0;
var callfrom;
var lAction; //SLT_Sofr_Change
function fnPreClassDefault_CVS_MEMUP_MAIN_KERNEL(){

	document.getElementById("BLK_TLTBS_FMEM_UPLOAD_MASTER__CURRENT_DD_ROW").value = CurrRow;
	//document.getElementById("BLK_TLTBS_FMEM_UPLOAD_MASTER__CURRENT_DD_ROW").value = CurrRow;
	if (callfrom=='BTN_GENERATE')
	{
		gAction = 'BTN_GENERATE';
	}
	else if (callfrom=='SUM_AMT')
	{
		gAction = 'SUM_AMT';
	}
	else if( callfrom == 'DD_SEL')
	{
		gAction = 'DD_SEL' ;
	}
	
	if (lAction == 'BTNDEFAULT'){
		gAction = 'BTNDEFAULT' ;
	}
	return true;
}

function fnPostClassDefault_CVS_MEMUP_MAIN_KERNEL(){
	if (lAction == 'BTNDEFAULT'){
		fnSubScreenMain('TLCMEMUP', 'TLCMEMUP', 'CVS_INT_DTLS', false);
	}
	lAction ="";	//Bug#34062996:Added
	return true;
}

function fnADD()
{
	fnSubScreenMain('TLCMEMUP', '', 'CVS_ADDL_DD', false);
	return true;
}

//loki
function fnCheck(){
    len = getTableObjForBlock("BLK_TLTBS_FMEM_UPLOAD_DETAIL").tBodies[0].rows.length;
	msob_tchk = 0;
    for(i = 0;i < len; i++) {
        if(getTableObjForBlock("BLK_TLTBS_FMEM_UPLOAD_DETAIL").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) { //BUG#36596453 
          if(getTableObjForBlock("BLK_TLTBS_FMEM_UPLOAD_DETAIL").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {   //BUG#36596453         
            CurrRow = i +1 ; 
           	} 
         }
        else
          break;
     }	
	return true;	
}
function fnBtnGenerate(event){
	
	callfrom="BTN_GENERATE"
	l_prev_gAction=gAction;
	gAction = "BTN_GENERATE";
	fnCheck();
	fnClassDefault("BLK_TLTBS_FMEM_UPLOAD_MASTER");
	//fnClassDefault("BLK_TLTBS_FMEM_UPLOAD_DETAIL");
	/*var ele_id = event.target.id;
	console.log(ele_id);	
	const regex = /(\d+)$/g;
    var  str = ele_id;
    var  m;
	var fmatch = -1;

	//contract referenbce number
	//event.target.parentElement.parentElement.parentElement.children[15].children[0].children[1].value  = document.getElementById('BLK_TLTBS_FMEM_UPLOAD_MASTER__CONTRACT_REF_NO').value;
	
	//event seq number
	//event.target.parentElement.parentElement.parentElement.children[15].children[0].children[1].value =  document.getElementById('BLK_TLTBS_FMEM_UPLOAD_MASTER__EVENT_SEQ_NOI').value;
	
	
	while ((m = regex.exec(str)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		
		// The result can be accessed through the `m`-variable.
		m.forEach((match, groupIndex) => {
			console.log(`Found match, group ${groupIndex}: ${match}`);
			fmatch = match;
			
		});
	}
	
	
	if( fmatch  === -1) // this means first row
	{
		document.getElementById("BLK_TLTBS_FMEM_UPLOAD_MASTER__CURRENT_DD_ROW").value = 1;
	}
	else{
		document.getElementById("BLK_TLTBS_FMEM_UPLOAD_MASTER__CURRENT_DD_ROW").value = parseInt(fmatch) +1;
	}
	
	console.log( document.getElementById("BLK_TLTBS_FMEM_UPLOAD_MASTER__CURRENT_DD_ROW").value );
	
	var current_row_array = hit_backend();
	console.log(current_row_array);
	event.target.parentElement.parentElement.parentElement.children[1].children[0].children[1].value
		= current_row_array[5];
	gAction = l_prev_gAction;
	return true;*/
}


//loki
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
        //var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        
		
		
		//setDataXML(getXMLString(pureXMLDOM));
        //showData(dbStrRootTableName, 1);
		
		
    if (msgStatus == "FAILURE") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	msg_status=msgStatus;
	
	var RecnodeList = selectSingleNode(fcjResponseDOM, '//REC[@TYPE="BLK_TLTBS_FMEM_UPLOAD_DETAIL"]/FV');    
	var TextContents = mySplit(getText(RecnodeList),"~");
	//document.getElementById("BLK_CONTRA_MARGIN__TXTTOTAL").value = TextContents[8];
	//document.getElementById("BLK_CONTRA_MARGIN__TXTTOTAL").value = TextContents[8]; 
	
	
    return TextContents;
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


function fnSumAmt(){
	
	callfrom='SUM_AMT';
	l_prev_gAction=gAction;
	gAction = "SUM_AMT";
	fnCheck();
	fnClassDefault("BLK_TLTBS_FMEM_UPLOAD_MASTER");
	
	return true;
}

function fnDrawdownSelection(){
	
	callfrom = 'DD_SEL';
	l_prev_gAction=gAction;
	gAction = 'DD_SEL';

	fnClassDefault("BLK_TLTBS_FMEM_UPLOAD_MASTER");
	
	return true;
	
	
}
//SLT_sofr_Changes
function FN_DEFAULT()
{   
	lAction = "BTNDEFAULT";
	fnClassDefault("BLK_TLTBS_FMEM_UPLOAD_MASTER");
 return true; 
}

function  fnPostLoad_CVS_MEMUP_MAIN_KERNEL(){
	fnEnableIntDetBtn();
	return true;
}

function fnPostLoad_CVS_INT_DTLS_KERNEL(){	
    getElementsByOjName('BTN_ADD_BLK_FMEM_UPLOAD_INT_DETAIL')[0].style.visibility = 'hidden';
	getElementsByOjName('BTN_REMOVE_BLK_FMEM_UPLOAD_INT_DETAIL')[0].style.visibility = 'hidden';
	fnDisableElement(document.getElementById("BLK_FMEM_UPLOAD_INT_DETAIL__COMPONENT"));
	 // OBCL_14.5_SLT_Auto_DD_SOFR start
	fnClassDefault('BLK_TLTBS_FMEM_UPLOAD_MASTER'); // master block
	//OBCL_14.5_SLT_Auto_DD_SOFR end
    return true;
}

function fnPostSave_KERNEL() { 
 fnEnableIntDetBtn();
 return true;
}
function fnEnableIntDetBtn(){
	var noRows = getTableObjForBlock("BLK_TLTBS_FMEM_UPLOAD_DETAIL").tBodies[0].rows.length;
	for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
		fnEnableElement(getElementsByOjName("BTNDEFAULT")[rowIndex]);					
    }
}

//Bug#36596453 changes 

function fnPostFocus_KERNEL() {

	var rowcount = getOjTableRowsLength("BLK_TLTBS_FMEM_UPLOAD_DETAIL"); 
	for (var i = 0; i < rowcount; i++) {
	fnEnableElement(getElementsByOjName('BTN_GENERATE') [i]); 
	fnEnableElement(getElementsByOjName('BTNDEFAULT') [i]);
	}
return true;
}
//Bug#36596453 changes  