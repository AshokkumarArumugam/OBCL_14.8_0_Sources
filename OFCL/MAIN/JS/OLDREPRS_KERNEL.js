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
**  File Name          : OLDREPRS_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Ankit
**  Last modified on   : 25.10.2016
**  Full Version       : 
**  Reason             : Commented the date population.

  Changed By         :Chandra Achuta
  Change Description :Rate fixing days enhancement.
  Search String      :OBCL_12.5_Rate_Fixing_for_manual
  
  **Changed By         : RANJAN KUMAR
  **Date               : 18-AUG-2017
  **Change Description : Bug #26643007 added RC in multiblick ID
  **Search String      : Bug #26643007 
  **CHANGE LOG
  **Changed By         : Meha
  **Date               : 19-JAN-2018
  **Change Description : Enable/Disable Delete Button for Post/Pre Authorize
  **Search String      : OBCL14.0_27280026

  **Changed By         : Vigneshram S
  **Date               : 30-May-2018
  **Change Description : Assign value date UI field to backend value date field
  **Search String      : Bug#29832651 
  
  **Changed By         : Gomathi G
  **Date               : 11-JUN-2020
  **Change Description : To change Date format as per user preference
  **Search String      : OBCL_14.3_Support_Bug#31400838
  
**Changed By         : Gomathi G
**Date               : 14-MAY-2021
**Change Description : Asigning mainWin.AppDate to format the date as per user preference 
**Search String      : Bug#31400838

  **Changed By         : Abhinav Bhasker
  **Changed On         : 12-May-2021
  **Change Description : Add RFR Fields to OLDREPRS 
  **Search String      : Bug#32851658 

  **Changed By         : ARUNA DEVI RAJENDRAN
  **Date               : 3-SEP-2021
  **Change Description : To change Date format as per user preference
  **Search String      : OBCL_14.5_Support_Bug#33191157
  
  **Changed By         : Reghuraj
  **Date               :25-Nov-2021
  **Change Description : Address the data format issue at the time of auth.
  **Search String      : Bug#33569774

  **Changed By         : Mohan Pal
  **Date               : 28-Jan-2022
  **Change Description : Removing Message Info Box while Button Click
  **Search String      : Bug#33788397
  
  **Changed By         : Aishwarya Sekar
  **Date               : 09-Jul-2022
  **Change Description : Split value date populating incorrectly when we change date format in user preference. So commenting code for split value date which were added for on click of default button.
  **Search String      : OBCL_14.5_Support_Bug#34321130
****************************************************************************************************************************/
//--OBCL14.0_27280026 Starts
function EnableDisableAuthBtn()
{
  if (document.getElementById("BLK_EVENT_LOG__AUTHSTATUS").value == "A")
{
DisableToolbar_buttons("Authorize");
DisableToolbar_buttons("Delete"); 
}
  if (document.getElementById("BLK_EVENT_LOG__AUTHSTATUS").value == "U")
{
EnableToolbar_buttons("Authorize");
EnableToolbar_buttons("Delete"); 
}
return true;
}
//--OBCL14.0_27280026 Ends
function fnPostNew_KERNEL(){
	//document.getElementById('BLK_SPLIT_MAST_HDR__SPLITVALUEDATEI').value = document.getElementById('BLK_SPLIT_MAST_HDR__SPLITBOOKDATEI').value;//OBCL_14.3_SUPPORT_BUG#31400838 COMMENTED
	//OBCL_14.3_SUPPORT_BUG#31400838 CHANGES STARTS
  document.getElementById('BLK_SPLIT_MAST_HDR__SPLITVALUEDATE').value = document.getElementById('BLK_SPLIT_MAST_HDR__SPLITBOOKDATE').value;
	document.getElementById("BLK_SPLIT_MAST_HDR__SPLITVALUEDATE").value = mainWin.AppDate; //added OBCL_14.5_Support_Bug#33191157
  	fireHTMLEvent(document.getElementById("BLK_SPLIT_MAST_HDR__SPLITVALUEDATE"),"onpropertychange");// Commented as part of Bug#31400838//added OBCL_14.5_Support_Bug#33191157
	document.getElementById("BLK_SPLIT_MAST_HDR__SPLITBOOKDATE").value = mainWin.AppDate;	//Bug#31400838
	fireHTMLEvent(document.getElementById("BLK_SPLIT_MAST_HDR__SPLITBOOKDATE"),"onpropertychange");
	document.getElementById('BLK_SPLIT_MAST_HDR__SPLITVALUEDATEI').value = document.getElementById('BLK_SPLIT_MAST_HDR__SPLITVALUEDATE').value; //added OBCL_14.5_Support_Bug#33191157
  //OBCL_14.3_SUPPORT_BUG#31400838 CHANGES ENDS
	document.getElementById("BLK_SPLIT_INTRATE_FIX__CURRENTRESETDATE").value = mainWin.AppDate;	//Bug#31400838
	fireHTMLEvent(document.getElementById("BLK_SPLIT_INTRATE_FIX__CURRENTRESETDATE"),"onpropertychange");//Bug#31400838
	
	//document.getElementById('BLK_SPLIT_MAST_HDR__SPLITBOOKDATEI').value = new Date().toISOString().slice(0,10); OFCL_Corporate_Lending_12_3_24946304 commented
	//document.getElementById('BLK_SPLIT_MAST_HDR__SPLITVALUEDATEI').value = new Date().toISOString().slice(0,10); OFCL_Corporate_Lending_12_3_24946304 commented
	document.getElementById('cmdAddRow_BLK_SPLIT_PROD_INTCOM').style.visibility='hidden';
	document.getElementById('cmdDelRow_BLK_SPLIT_PROD_INTCOM').style.visibility='hidden';
	document.getElementById('BTN_SINGLE_VIEW_BLK_SPLIT_PROD_INTCOM').style.visibility='hidden';
	return true;
}
function fnPostAddRow_BLK_SPLIT_MAST_DET_1_KERNEL(){
	var cnt = getTableObjForBlock('BLK_SPLIT_MAST_DET_1').tBodies[0].rows.length;
	for(var i = 0; i<=cnt; i++){
		//if (i ==1){
			// var blkfld = 'BLK_SPLIT_MAST_DET_1__TXTCURRENCY';
			//document.getElementById('BLK_SPLIT_MAST_DET_1__TXTCURRENCY').value = document.getElementById('BLK_SPLIT_MAST_HDR__CONTRACTCCY').value ;
			getTableObjForBlock('BLK_SPLIT_MAST_DET_1').tBodies[0].rows[i].cells[3].getElementsByTagName("oj-input-text")[0].value = document.getElementById('BLK_SPLIT_MAST_HDR__CONTRACTCCY').value ;
		//}
		//else{	
		  //var blkfld = 'BLK_SPLIT_MAST_DET_1__TXTCURRENCY'.concat(i-1); 
     		//document.getElementById('BLK_SPLIT_MAST_DET_1__TXTCURRENCY'.concat(i-1)).value = document.getElementById('BLK_SPLIT_MAST_HDR__CONTRACTCCY').value ; //Bug #26643007 changes commented
			//Bug #26643007 started
			//var flagstats=3;
			//getTableObjForBlock('BLK_SPLIT_MAST_DET_1').tBodies[0].rows[i].cells[flagstats].getElementsByTagName("oj-input-text")[0].value= getTableObjForBlock('BLK_SPLIT_MAST_HDR__CONTRACTCCY').value ;
			//Bug #26643007 end
		//}
	}	
return true;
	}

function FN_CALCULATE(){
	g_prev_gAction = gAction;
	gAction = 'CALCULATE';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	document.getElementById("BLK_SPLIT_MAST_HDR__BTNCALCULATE").disabled = true;
 gAction = g_prev_gAction;
 return true; 
}

function FN_DEFAULT()
{
    var g_prev_gAction = gAction;
    gAction = "DEFCOMPONENT";
	//OBCL_14.5_Support_Bug#34321130 Starts
	//Bug#29832651 starts
	//document.getElementById("BLK_SPLIT_MAST_HDR__SPLITVALUEDATE").value = document.getElementById("BLK_SPLIT_MAST_HDR__SPLITVALUEDATE").value;
	//setNodeText(selectSingleNode(dbDataDOM, "//BLK_SPLIT_MAST_HDR/SPLITVALUEDATE"), document.getElementById("BLK_SPLIT_MAST_HDR__SPLITVALUEDATE").value);
	//Bug#29832651 ends
	//OBCL_14.5_Support_Bug#34321130 Ends
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    var orgDom = loadXMLDoc(getXMLString(dbDataDOM));
	gDispAlertOnSuccess = 'N';//Bug#33788397 Message Info Box remove
    if (!fnProcessResponse()) {
        gAction = g_prev_gAction;
        dbDataDOM = loadXMLDoc(getXMLString(orgDom));
        return false;
    }
    if (dbDataDOM.documentElement.nodeName != dataSrcLocationArray[0]) {
        var blockId = 'BLK_SPLIT_PROD_INTCOM'
	 var removeNode = selectNodes(orgDom, getXPathQuery(blockId));  
        for (var i = 0; i < removeNode.length; i++) {
            removeNode[i].parentNode.removeChild(removeNode[i]);
        }
        var parentNode = relationArray[dbDataDOM.documentElement.nodeName]; 
        if(parentNode.indexOf("~") == -1){            
            orgDom.documentElement.appendChild(getCloneDocElement(dbDataDOM.documentElement));
        }else{
            var parentNodename =parentNode.substring(0,parentNode.indexOf("~"));
            var xpathquery = getXPathQuery(parentNodename) ;
            xpathquery = xpathquery + "[@ID=" + dbIndexArray[parentNodename] + "]";            
            selectSingleNode(orgDom,xpathquery).appendChild(getCloneDocElement(dbDataDOM.documentElement));
        }
        dbDataDOM = loadXMLDoc(getXMLString(orgDom));
        showData();
    }
    gAction = g_prev_gAction;
	fnSubScreenMain('OLDREPRS', 'OLDREPRS', 'CVS_INT_DTLS', false); //Bug#32851658 - Launch New Sub Screen 
return true;
}

function fnPreAuthorize_KERNEL(){
    authFunction = 'OLDRSAUT';
    authUixml = 'OLDRSAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['OLDRSAUT'] = "KERNEL";
    ArrPrntFunc['OLDRSAUT'] = "";
    ArrPrntOrigin['OLDRSAUT'] = "";
    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    EnableDisableAuthBtn();//OBCL14.0_27280026
	fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
	return true;
}
function fnPreLoad_CVS_AUTH_KERNEL(screenArgs) {
    screenArgs['CONREF'] = document.getElementById('BLK_SPLIT_MAST_HDR__CONTRACTREFNO').value;
    screenArgs['SPLITSERNO'] = document.getElementById('BLK_SPLIT_MAST_HDR__SPLITSERIALNO').value;
  //screenArgs['BOOKDATE'] = document.getElementById('BLK_SPLIT_MAST_HDR__SPLITBOOKDATEI').value;    --Bug#33569774 
  //screenArgs['VALUEDATE'] = document.getElementById('BLK_SPLIT_MAST_HDR__SPLITVALUEDATEI').value;    --Bug#33569774 
	screenArgs['BOOKDATE'] = document.getElementById('BLK_SPLIT_MAST_HDR__SPLITBOOKDATE').value;   //Bug#33569774  added
    screenArgs['VALUEDATE'] = document.getElementById('BLK_SPLIT_MAST_HDR__SPLITVALUEDATE').value; // Bug#33569774  added
	return true;
}
//OBCL_12.5_Rate_Fixing_for_manual  changes starts
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
function fnFetch(){
	var gPrevAction=gAction;
	gAction='FETCH';
	fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);	
	
	if (fcjResponseDOM) {
    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
		 gAction = g_prev_gAction;
        return false;
    }

	var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_SPLIT_INTRATE_FIX"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");			
				document.getElementById("BLK_SPLIT_INTRATE_FIX__INTRATE").value = TextContents[3];	
				document.getElementById("BLK_SPLIT_INTRATE_FIX__INTRATE").value = TextContents[3];				
		}
	}
	return true;
}
//OBCL_12.5_Rate_Fixing_for_manual  changes ends
//--Bug#32851658  Start --Enable Interest Details Button on Query
function fnPostExecuteQuery_KERNEL() {
	var rowRef=getTableObjForBlock("BLK_SPLIT_MAST_DET_1").tBodies[0].rows;  
		var append_index="";
		 for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
      {
		  if(rowIndex>0){
			  append_index=rowIndex;
		  }
		if(append_index == ""){
		fnEnableElement(document.getElementById("BLK_SPLIT_MAST_DET_1__BTNDEFAULT"+append_index));
		}else {		
				fnEnableElement(document.getElementById("BLK_SPLIT_MAST_DET_1__BTNDEFAULTRC"+append_index));
		}
       }
	   return true;
}
	//Hide "+ -" option on subscreen
function fnPostLoad_CVS_INT_DTLS_KERNEL(){
getElementsByOjName('BTN_ADD_BLK_SPLIT_PROD_INTCOM')[0].style.visibility = 'hidden';
getElementsByOjName('BTN_REMOVE_BLK_SPLIT_PROD_INTCOM')[0].style.visibility = 'hidden';
return true;
}
//--Bug#32851658  End