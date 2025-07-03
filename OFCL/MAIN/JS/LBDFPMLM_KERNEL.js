/***************************************************************************************************************************
 **  This source is part of the FLEXCUBE Software Product.
 **  Copyright (c) 2007 ,2013, Oracle and/or its affiliates.
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
 **  Written by         :SUSHIL PANDEY
 **  Date of creation :
 **  File Name          : LBDFPMLM.js
 **  Purpose            :
 **  Called From        :
 **
**  Last Modified By   : Gomathi G
**  Last modified on   : 27-MAY-2020
**  Reason             : To Display  Date, as per user date formatt
**  Search String      : OBCL_14.3_SUPPORT_BUG#31400838 Changes

**Changed By         : Akhila Samson
**Date               : 18-MAR-2021
**Change Description : Date format.
**Search String      : Bug#31400838

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 28-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
 ****************************************************************************************************************************/
var jsElement = document.createElement('script');
jsElement.setAttribute('type', 'text/javascript');
jsElement.setAttribute('src', 'Script\/JS\/CSVUtility.js'); // CSVUtility.js call
document.getElementsByTagName("head")[0].appendChild(jsElement);
function fnChange(e) {
                var fileInputCSV = document.getElementById('BLK_PARTICIPANTS__BTN_FILE');  //Button Id of File chooser
                // parse as CSV
                var file = e.target.files[0];
                var csvParser = new CSVUtility.Parser.CSV();
                csvParser.setDelimiter(',');
                csvParser.loadFile(file, function () {
                                try{
                                                var data_blk = "BLK_PARTICIPANTS"; //Block Name
                                                var len = getTableObjForBlock(data_blk).tBodies[0].rows.length+1;
                                                for (var i = len-1; i < csvParser.getSheet(1).length+len-2; i++) {
                                                                fnAddRow(data_blk); // add dummy added row in the block
                                                                if (getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {
                                                                                var param_Label = getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[1].getElementsByTagName("oj-input-text")[0];
                                                                             //   var param_Value = getTableObjForBlock(data_blk).tBodies[0].rows[i].cells[3].getElementsByTagName("oj-input-text")[0];
                                                                                if((csvParser.getSheet(1).getCell(1, i-len+2).value != undefined)&&(csvParser.getSheet(1).getCell(2, i-len+2).value != undefined)){
                                                                                                //param_Label.value = csvParser.getSheet(1).getCell(1, i-len+2).value; // Assign value to the param_label field 
                                                                                              //  param_Value.value = csvParser.getSheet(1).getCell(2, i-len+2).value; // Assign value to the param_value field
                                                                                              param_Label.value = csvParser.getSheet(1).getCell(1, i-len+2).value;
                                                                                }
                                                                }
                                                }
                                                
                                }catch(e){}
                                
                });
                return true;
}

function fnPostExecuteQuery_KERNEL(){     
//fnEnableElement(document.getElementById("BLK_FPML_ADHOC_MSG__BTN_DRAWDOWNS"));
//fnEnableElement(document.getElementById("BLK_FPML_ADHOC_MSG__BTN_PARTICIPANTS"));
return true;
}

function fnDrawdown(){
fnSubScreenMain('LBDFPMLM', 'LBDFPMLM', 'CVS_DD', false);
    return true;
}

function fnParticipants(){
fnSubScreenMain('LBDFPMLM', 'LBDFPMLM', 'CVS_PART', false);    
    return true;
}

function fnPopulateDetails(){

	g_prev_gAction = gAction;
	gAction = 'POPULATE';
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
 return true; 
}

function fnPostNew_KERNEL(){

fnDisableElement(document.getElementById("BLK_FPML_ADHOC_MSG__BTN_DRAWDOWNS"));
fnDisableElement(document.getElementById("BLK_FPML_ADHOC_MSG__BTN_PARTICIPANTS"));


//document.getElementById("BLK_FPML_ADHOC_MSG__EFFECTIVE_DATE").value = mainWin.AppDate; 
//OBCL_14.3_SUPPORT_BUG#31400838 CHNAGES STARTS
document.getElementById("BLK_FPML_ADHOC_MSG__EFFECTIVE_DATE").value = mainWin.AppDate;
fireHTMLEvent(document.getElementById("BLK_FPML_ADHOC_MSG__EFFECTIVE_DATE"),"onpropertychange");
//OBCL_14.3_SUPPORT_BUG#31400838 CHNAGES ENDS

document.getElementById("BLK_FPML_ADHOC_MSG__ESN_TO_CANCEL").value="";
document.getElementById("BLK_FPML_ADHOC_MSG__ESN_TO_CANCEL").value="";
fnDisableElement(document.getElementById("BLK_FPML_ADHOC_MSG__ESN_TO_CANCEL"));
//fnDisableElement(document.getElementById("BLK_FPML_ADHOC_MSG__ESN_TO_CANCELI"));BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
return true;
}

function fnNoticeName(){

var noticeName=document.getElementById("BLK_FPML_ADHOC_MSG__NOTC_NAME").value;
var effectiveDate=new Date(document.getElementById("BLK_FPML_ADHOC_MSG__EFFECTIVE_DATE").value);
var appdate=new Date(mainWin.AppDate);



if(noticeName == "positionUpdate" && effectiveDate < appdate){

        g_prev_gAction = gAction;
	gAction = 'POSTNOTC';
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
       fnDisableElement(document.getElementById("BLK_FPML_ADHOC_MSG__BTN_DRAWDOWNS"));
       fnDisableElement(document.getElementById("BLK_FPML_ADHOC_MSG__BTN_PARTICIPANTS"));
       fnDisableElement(document.getElementById("BLK_FPML_ADHOC_MSG__EFFECTIVE_DATE"));
       document.getElementById("BLK_FPML_ADHOC_MSG__EFFECTIVE_DATE").value = mainWin.AppDate; 
       fireHTMLEvent(document.getElementById("BLK_FPML_ADHOC_MSG__EFFECTIVE_DATE"),"onpropertychange"); //Bug#31400838:Added
       document.getElementById("BLK_FPML_ADHOC_MSG__EFFECTIVE_DATE").value = mainWin.AppDate;
	   fireHTMLEvent(document.getElementById("BLK_FPML_ADHOC_MSG__EFFECTIVE_DATE"),"onpropertychange"); //Bug#31400838
        }
	//OFCL_12.3.0.0.0_25096590 changes starts
	else if (msgStatus == "SUCCESS")
			{
     fnEnableElement(document.getElementById("BLK_FPML_ADHOC_MSG__BTN_DRAWDOWNS"));
     fnEnableElement(document.getElementById("BLK_FPML_ADHOC_MSG__BTN_PARTICIPANTS"));
	}
 gAction = g_prev_gAction;
 return true; 
    
   // fnEnableElement(document.getElementById("BLK_FPML_ADHOC_MSG__BTN_DRAWDOWNS"));
   // fnEnableElement(document.getElementById("BLK_FPML_ADHOC_MSG__BTN_PARTICIPANTS"));
}else if(noticeName=="cancel"){
fnEnableElement(document.getElementById("BLK_FPML_ADHOC_MSG__ESN_TO_CANCEL"));
//fnEnableElement(document.getElementById("BLK_FPML_ADHOC_MSG__ESN_TO_CANCELI"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
}else{
    document.getElementById("BLK_FPML_ADHOC_MSG__ESN_TO_CANCEL").value="";
    document.getElementById("BLK_FPML_ADHOC_MSG__ESN_TO_CANCEL").value="";
     fnDisableElement(document.getElementById("BLK_FPML_ADHOC_MSG__ESN_TO_CANCEL"));
    // fnDisableElement(document.getElementById("BLK_FPML_ADHOC_MSG__ESN_TO_CANCELI"));//;BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
}
    return true;
}



function fnPostLoad_KERNEL()
{
  
   return true;

}

function fnEffectiveDate(){

var effectiveDate=new Date(document.getElementById("BLK_FPML_ADHOC_MSG__EFFECTIVE_DATE").value);
var appdate=new Date(mainWin.AppDate);
if(effectiveDate < appdate){
      fnEnableElement(document.getElementById("BLK_FPML_ADHOC_MSG__BTN_DRAWDOWNS"));
      fnEnableElement(document.getElementById("BLK_FPML_ADHOC_MSG__BTN_PARTICIPANTS"));
}
    return true;
}


