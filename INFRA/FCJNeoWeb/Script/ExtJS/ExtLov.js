/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtLov.js
**
** Module       : FCJWeb
**
** This source is part of the Oracle Flexcube Universal Banking
** Software System and is copyrighted by Oracle Financial Services Software Limited.
** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle Financial Services
** Software Limited.
** Oracle Financial Services Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.
Copyright ? 2004-2015   by Oracle Financial Services Software Limited..
---------------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes

 **  Modified By          : Neethu Sreedharan
 **  Modified On          : 07-Oct-2016
 **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                            to user as alert and on click of Ok button on alert window, screen will be 
                            unmasked and user can try the action again.
 **  Retro Source         : 9NT1606_12_0_3_INTERNAL
 **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
 
 **  Modified By          : Neethu Sreedharan
 **  Modified On          : 16-Oct-2016
 **  Modified Reason      : Changes done to check the proper object in case of Single view LOV 
 **  Retro Source         : 9NT1606_12_0_3_BANK_AUDI
 **  Search String        : 9NT1606_12_2_RETRO_12_0_3_25562060
 
 **  Modified By          : Neethu Sreedharan
 **  Modified On          : 11-May-2017
 **  Modified Reason      : Code changes done to alter the LOV column label width corresponding to screen 
                            width when the LOV is maximized 
 **  Retro Source         : 9NT1606_12_1_METROPOLITAN_BANK_TRUST_CO
 **  Search String        : 9NT1606_12_3_RETRO_12_1_25821364
 
 **  Modified By          : Ambika Selvaraj
 **  Modified On          : 03-Oct-2017
 **  Description    	  : Code changes done to accomodate special characters() used in reduction fields and bind variables of LOV. 
							'_OPARAN_' and '_CPARAN_' are the notations used to identify '(' and ')' respectively. 
 **  Retro Source         : 9NT1606_12_0_3_BANK_AUDI
 **  Search String        : 9NT1606_12_4_RETRO_12_0_3_26861671
 
 **  Modified By          : Ambika Selvaraj
 **  Modified On          : 07-Nov-2017
 **  Description    	  : Change done to reset the Auto LOV flag when value is selected from LOV. 
 **  Search String        : 9NT1606_12_4_RETRO_12_3_27041965
 
 **  Modified By          : Ambika Selvaraj
 **  Modified On          : 18-Jun-2018
 **  Description    	  : Code Changes done to clear the Date field value in LOV Screen on navigation. 
 **  Search String        : 9NT1606_14_1_RETRO_12_3_28117516

 **  Modified By          : Akshay Trivedi
 **  Modified On          : 16-Feb-2022
 **  Description    	  : Code Changes done to encode # for lovid. 
 **  Search String        : 9NT1606_14_5_33810041
 
**  Modified By          : Selvam Manickam
**  Modified On          : 20-Apr-2023
**  Modified Reason      : Redwood Fixes - UNABLE TO SELECT LOV OPTIONS OPENED IN SUBSCREEN 
**  Search String        : REDWOOD_35302672
 
**  Modified By          : Manoj S
**  Modified On          : 30-Apr-2023
**  Modified Reason      : Redwood Fixes - validating select value from the lov results before assign.
**  Search String        : REDWOOD_35335422 

**  Modified By          : Manoj S
**  Modified On          : 14-May-2023
**  Modified Reason      : Redwood Fixes - Focusing the first Text field when Lov screen Launched.
**  Search String        : redwood_35301776 

**  Modified By          : Manoj S
**  Modified On          : 16-May-2023
**  Modified Reason      : Redwood Fixes - updating goto value when we click First and Last navigate button.
**  Search String        : REDWOOD_35233678 

**  Modified By          : Selvam Manickam
**  Modified On          : 07-Sep-2023
**  Modified Reason      : Redwood Fixes - $ special character not working in summary screen LOV. it gave wrong result System shows "<FCUBS_RES_ENV><"
**  Search String        : REDWOOD_35772471

**  Modified By          : Manoj S
**  Modified On          : 21-Dec-2023
**  Modified Reason      : Redwood Fixes - parseLOVResponseXML handling the special character replacement code added
**  Search String        : Redwood_36111988

	Modified By          : Jay ram kumar
 **  Modified On          : 08-Jan-2024
 **  Description    	  : FCUBS_14.7.1: SUMMARY SCREEN LOV IS NOT WORKING AS EXPECTED. 
 **  Search String        : BUG#36159036_36037414
  
**  Modified By          : Girish M
**  Modified On          : 02-May-2024
**  Modified Reason      : Proper date format is not displayed for lov fields with data type as "DATE".
**  Search String        : REDWOOD_36549030
                           REDWOOD_36688469 
                           
**  Modified By          : Girish M
**  Modified On          : 05-Aug-2024
**  Modified Reason      : Date Lov Formatting issue.
**  Search String        : redwood_36763000

**  Modified By          : Manoj S
**  Modified On          : 15-Nov-2024
**  Modified Reason      : Changes done for displaying Minimum charInfo in love screen
**  Search String        : redwood_37246478

**  Modified By          : Girish M
**  Modified On          : 19-Nov-2024
**  Modified Reason      : Changes done for correct the return date value for lov date fields.
**  Search String        : Redwood_37135330
********************************************************************************************
*/
var orderBy = "";
var parentDivHeight = "";
var parentIFrame = "";
var parentDIVScrContainer = "";
var parentDivWidth = "";
var parentIFrameWidth = "";
var parentTitleWidth = "";
var fieldListArray;	//REDWOOD_CHANGES
var rawDataProvider;  //REDWOOD_CHANGES

function setPages() {
    setInnerText(document.getElementById("TotPgCnt"), 1);
    setInnerText(document.getElementById("CurPage"), 1);
}

function getLovResults() {
    //inDate = setActionTime();
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var serverURL = "ExtLovFetchData?";
    var redCriteria = buildReductionCriteria();
    //Index based search changes start
    var indexRequired = "";
    var minIndexLength = "";
    var filedIndexValue = "";
    var reductionValue = "";
    var countIndexField = 0;
    var firstIndexField = 0;
    if((parent.lovInfoFlds != "undefined") && (typeof(parent.lovInfoFlds[blockId + "__" + fldName + "__" + lovId]) != "undefined") &&
    (typeof(parent.lovInfoFlds[blockId + "__" + fldName + "__" + lovId][2]) != "undefined") && (parent.lovInfoFlds[blockId + "__" + fldName + "__" + lovId][2].indexOf("Y") != -1)){
    var indexFieldList= parent.lovInfoFlds[blockId + "__" + fldName + "__" + lovId][2].split("~");
    var reductionFieldValues= redCriteria.split("|");
    for(var i=0; i<(indexFieldList.length) ;i++){
      reductionValue=reductionFieldValues[i].split("!")[1];
      reductionValue = parent.replaceAll(reductionValue, "_PCT_", "");
      reductionValue = parent.replaceAll(reductionValue, "!", "");
      filedIndexValue=indexFieldList[i];
      if(filedIndexValue.indexOf("!") != -1){
        indexRequired=filedIndexValue.split("!")[0];
        minIndexLength=filedIndexValue.split("!")[1];
         if("Y" == indexRequired && firstIndexField == 0){
           firstIndexField=i+1;
         }
        if("Y" == indexRequired && reductionValue.length < minIndexLength){
          countIndexField++;
        }else  if("Y" == indexRequired && reductionValue.length >= minIndexLength){
        countIndexField = 0;
        break;
        }
      }
    }
    if(countIndexField >0){
      focusReqd = false;
      focusField = document.getElementById(firstIndexField);
      alert(parent.mainWin.getItemDesc("LBL_INDEX_ALERT_LOV"));
      document.getElementById(firstIndexField).value = "%";      
      return false;
    }
    }
//Index based search changes end
    serverURL += "Source=" + source;
    serverURL += "&functionId=" + functionId;
    serverURL += "&blockId=" + blockId;
    serverURL += "&fldName=" + fldName;
	lovId 	   = replaceAllChar(lovId, "#", "_HASH_");//fix for 9NT1606_14_5_33810041
    serverURL += "&lovId=" + lovId;
    serverURL += "&lovId=" + lovId;
    serverURL += "&signonSerial=" + mainWin.SignonSerial;//Logging changes
    serverURL += "&DEBUGWINDOW=" +mainWin.DebugWindowFlg; //logging changes
    serverURL += "&LOVCALL=" +document.getElementById("LOVCALL").value; //External Lov Changes
     
    
	/*SFR:17439180 : Fix for 17351640 starts*/
    if (typeof(redCriteria) != "undefined" && redCriteria != null && redCriteria!="") {
      var tempRedCriteria = redCriteria;
      tempRedCriteria = replaceAllChar(tempRedCriteria, "/", "_SLH_");
      tempRedCriteria = replaceAllChar(tempRedCriteria, "#", "_HASH_");//fix for 17378652
      tempRedCriteria = replaceAllChar(tempRedCriteria, "&", "_AMP_");//fix for 18312338
      tempRedCriteria = replaceAllChar(tempRedCriteria, ",", "_COMMA_");//Fix for 19274447
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Starts
	  tempRedCriteria = replaceAllChar(tempRedCriteria, "(", "_OPARAN_");
	  tempRedCriteria = replaceAllChar(tempRedCriteria, ")", "_CPARAN_");
	  tempRedCriteria = replaceAllChar(tempRedCriteria, "+", "_PLUS_");
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Ends
      serverURL += "&RedFldNames=" + tempRedCriteria;
    }
    else{
      serverURL += "&RedFldNames=" + redCriteria; 
    }
	/*SFR:17439180 : Fix for 17351640 Ends*/
    /* security fixes for WF starts*/
    if (typeof(orderBy) != "undefined" && orderBy != null && orderBy!="") {
        if(orderBy.indexOf(">")!=-1){
            var re = new RegExp(">", "g");
            orderBy = orderBy.replace(re, "!");
        }
    }
    serverURL += "&orderBy=" + orderBy;
     //SFR:17439180 : Fixes for 17176008 starts
    if (typeof(parent.bindFldsStr) != "undefined" && parent.bindFldsStr != null && parent.bindFldsStr!="") {
    var tempBindFldStr = parent.bindFldsStr;
    tempBindFldStr = replaceAllChar(parent.bindFldsStr, "/", "_SLH_");
    tempBindFldStr = replaceAllChar(tempBindFldStr, "#", "_HASH_");//fix for 17378652
    tempBindFldStr = replaceAllChar(tempBindFldStr,  "&", "_AMP_"); //Fox for 18260737
    tempBindFldStr = replaceAllChar(tempBindFldStr, ",", "_COMMA_");//Fix for 19274447
	//9NT1606_12_4_RETRO_12_0_3_26861671 Starts
	tempBindFldStr = replaceAllChar(tempBindFldStr, "(", "_OPARAN_");
	tempBindFldStr = replaceAllChar(tempBindFldStr, ")", "_CPARAN_");
	tempBindFldStr = replaceAllChar(tempBindFldStr, "+", "_PLUS_");
	//9NT1606_12_4_RETRO_12_0_3_26861671 Ends
    serverURL += "&bndVar=" + tempBindFldStr;
    }
    else{
      serverURL += "&bndVar=" + parent.bindFldsStr; 
    }
     //SFR:17439180 : Fixes for 17176008 ends
    serverURL += "&rednFldType=" + replaceTilde(rednFldType);
    /* security fixes for WF ends*/
    serverURL += "&fetchSize=25";
    serverURL += "&columnList=" + labelArrLength;
    serverURL += "&txnBranch=" + txnBranch;
    var screentype = "";
    if (getInnerText(document.getElementById("TotPgCnt")) == "1") serverURL += "&TotalPages=";
    else serverURL += "&TotalPages=" + getInnerText(document.getElementById("TotPgCnt"));
    serverURL += "&CurPage=" + getInnerText(document.getElementById("CurPage"));
    if ((functionId == "COMMON" || functionId == "SMCHGBRN") && strLov.indexOf(lovId) != -1) {   
        screentype = "M";
        //serverURL += "&screenType=M";
    } else {
       // serverURL += "&screenType=" + mainWin.gActiveWindow.screenType;
         screentype = mainWin.gActiveWindow.screenType;
    }
   
    if((mainWin.brnHostLinkStatus == "OFFLINE" && (functionId == "COMMON")) && (lovId == "LOV_ACCOUNT_CUSTOMER_OFFLINE" || lovId == "LOV_BRANCH_CUSTOMER_OFFLINE" || lovId == "LOV_CIFID_CUSTOMER_OFFLINE"|| lovId == "LOV_ACCOUNT_WORKFLOW_OFFLINE" ||lovId =="LOV_ENTITY")){//SMSStandalone12.3 Changes
      lovType = 'N';
      screentype = 'WB';
    }
     serverURL += "&screenType=" + screentype;
     serverURL += "&lovType=" + lovType;
    try {
        var objHTTP = createHTTPActiveXObject();
		try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes  
        objHTTP.open("POST", encodeURI(serverURL), false);
        objHTTP.setRequestHeader("charset", "utf-8");
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
         //Performance Changes  
        var t = getDateObject();
        // if(gAction != 'RELEASELOCK')
        posttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    
        objHTTP.send(null);
		} //9NT1606_12_2_RETRO_12_0_3_21182929 starts
         catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 ends 
        //Performance Changes
         t = getDateObject();
        //if(gAction != 'RELEASELOCK')
        afterposttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
        //Performance Changes
        if (objHTTP.status == 200) {
            mainWin.inactiveTime = 0;
            var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
            } else {
                var LOVResponseDOM = objHTTP.responseXML;
                if (LOVResponseDOM) {
                   // appendDebug(LOVResponseDOM); //Logging changes
                    /*var intTotPgs = Number(getNodeText(selectSingleNode(LOVResponseDOM, "//TOTALPAGES")));*/
                    var intTotPgs = getNodeText(selectSingleNode(LOVResponseDOM, "//TOTALPAGES"));
                    if (intTotPgs == 0) {
                        setInnerText(document.getElementById("TotPgCnt"), 1);
                       // setInnerText(document.getElementById("ALERTTBL").tHead.rows[0].cells[1].children[0], mainWin.getItemDesc("LBL_NO_RECORD"));//REDWOOD_CHANGES
                    } else {
                        setInnerText(document.getElementById("TotPgCnt"), intTotPgs);
                       // setInnerText(document.getElementById("ALERTTBL").tHead.rows[0].cells[1].children[0], mainWin.getItemDesc("LBL_MORE_RECORDS"));	 //REDWOOD_CHANGES
                       // if (intTotPgs != "10") setInnerText(document.getElementById("ALERTTBL").tHead.rows[0].cells[1].children[0], mainWin.getItemDesc("LBL_OK"));	//REDWOOD_CHANGES
                    }
                    //document.getElementById("ALERTTBL").tHead.rows[0].cells[0].children[0].src = "Images/" + strTheme.substring(0, strTheme.indexOf('.css')) + "/InfoSmall.gif";
                    //document.getElementById("ALERTTBL").tHead.rows[0].cells[0].children[0].className = "LovAlert"; //Data Uri change //REDWOOD_CHANGES
                    setInnerText(document.getElementById("CurPage"), Number(getInnerText(document.getElementById("CurPage"))));
                    enableButtons();
                    
                    var lovContent = getXMLString(LOVResponseDOM);
                    if(lovContent.indexOf("<FCUBS_RES_ENV><![CDATA[")!= -1) { //debugger;
                        lovContent = lovContent.substring(lovContent.indexOf("<FCUBS_RES_ENV><![CDATA[")+24, lovContent.indexOf("]]><TOTALPAGES>"));
						//REDWOOD_35772471 start
						if (lovContent == "<FCUBS_RES_ENV><![CDATA[" )
						{
							lovContent=" ";
						}
						//REDWOOD_35772471 end						
                    }
                    
                    //parseLOVResponseXML(getNodeText(LOVResponseDOM.childNodes[0]));
                    parseLOVResponseXML(lovContent);  
//REDWOOD_CHANGES
                    document.getElementById("lovqueryCollapsible").expanded = false;
                }
            }
            //fnSyncLovTableWidth();//static Header change 
//REDWOOD_CHANGES
            
           
        }
    } catch (e) {
       // setInnerText(document.getElementById("ALERTTBL").tHead.rows[0].cells[1].children[0], mainWin.getItemDesc("LBL_ERROR")); //REDWOOD_CHANGES
        //document.getElementById("ALERTTBL").tHead.rows[0].cells[0].children[0].className = "LovErrorAlert"; //Data Uri Changes  //REDWOOD_CHANGES
    }
}

function sortSelectedCol(colIndex, e) {
    var fieldVal = "";
    var firstRow = document.getElementById("TableLov").tBodies[0].rows[0].cells;
    if (firstRow[0].children[0].type == "DATE"){
        fieldVal = firstRow[0].children[firstRow[0].children.length - 1].value;
    }else{
        fieldVal = getInnerText(firstRow[0]);
    }
    if(fieldVal != ""){        
        var event = window.event || e;
        var elem = getEventSourceElement(event);
        if (elem.tagName.toUpperCase() == "SPAN") elem = elem.parentNode;/* security fixes for WF */
        //orderBy = Number(colIndex) + 1 + ">" + elem.getAttribute("order");
        orderBy = Number(colIndex) + 1 + "!" + elem.getAttribute("order");
        var imgLen = document.getElementById("TableLovHeader").tBodies[0].rows[0].getElementsByTagName("span"); //static header change
        if (imgLen.length > 0) {
            for (var i = 0; i < imgLen.length; i++) {
                imgLen[i].className = "SPNup hide";
            }
        }
        getLovResults();
        setSortImage(event);
    }

}

function setSortImage(event) {
    var elem = getEventSourceElement(event);
    if (elem.tagName.toUpperCase() == "SPAN") elem = elem.parentNode;
    var imgClass = "";
    if (elem.getAttribute("order") == "ASC") {
        imgClass = "SPNup";
        elem.setAttribute("order", "DESC");
    } else {
        imgClass = "SPNdown";
        elem.setAttribute("order", "ASC");
    }
    elem.getElementsByTagName("span")[0].className = imgClass;
}

function parseLOVResponseXML(strLovData) {
 //REDWOOD_CHANGES   
    var resValue = strLovData.split("!").filter(val=>val.trim()!== "");
	var resValueArr= resValue.map(v=>v.split('~'));
    //Redwood_36111988 starts
	for (var i = 0; i < resValueArr.length ; i++) {
        var resTD = resValueArr[i];
        for (var j = 0; j < resTD.length - 1; j++) {
            if (resTD[j].indexOf("&amp;") != -1) {
                resTD[j] = resTD[j].replace("&amp;", "&");
            }
            if (resTD[j].indexOf("&apos;") != -1) {
                resTD[j] = resTD[j].replace("&apos;", "'");
            }
            if (resTD[j].indexOf("&lt;") != -1) {
                resTD[j] = resTD[j].replace("&lt;", "<");
            }
            if (resTD[j].indexOf("&gt;") != -1) {
                resTD[j] = resTD[j].replace("&gt;", ">");
            }
			if (resTD[j].indexOf("_EXCL_") != -1){//12.0.3 citi_dev fix start
              var re = new RegExp('_EXCL_', "g");
              resTD[j] =  resTD[j].replace(re, "!");
            }//12.0.3 citi_dev fix start
  //REDWOOD_36549030 Starts
	      if (parent.document.getElementsByName(fldName)[0] && (parent.document.getElementsByName(fldName)[0].getAttribute('dtype') == "DATE")) {
            //REDWOOD_36688469 Start
              var lovParentFldID= parent.document.getElementsByName(fldName)[0].getAttribute('id'); 
              var lovInfoArr =  parent.lovInfoFlds[lovParentFldID + "__" + lovId][0].split("~");
              if(lovParentFldID == lovInfoArr[j]){
            //REDWOOD_36688469 Ends
                if (resTD[j] != "") {
                    parent.document.getElementsByName(fldName)[0].setAttribute('DateValue',resTD[j]);
                    var FormatDate = new getFrmtDate(resTD[j], gDateFormatDSO);
                    if (FormatDate.isValidDate()) resTD[j] = FormatDate.getShortDate();
             } //REDWOOD_36688469 
         }
            }
   //REDWOOD_36549030 Ends           
            var re = new RegExp('&amp;', "g");
            resTD[j] = resTD[j].replace(re, "&");
            var re1 = new RegExp('&apos;', "g");
            resTD[j] = resTD[j].replace(re1, "'");
           }
		   resValueArr[i]=resTD;
    }    
   //Redwood_36111988 Ends	
    
    rawDataProvider = getRawDataProvider(resValueArr);
    
    rawDataProvider = getUniqueArray(rawDataProvider);
    dataProvider(new lovDataProvider(rawDataProvider));
}

function parseLOVResponseXML_old(strLovData) { 
//REDWOOD_CHANGES
    //Initially clearing all fields
    for (var i = 0; i < 25; i++) {
        for (var j = 0; j < Number(noOfFlds); j++) {
            setInnerText(document.getElementById("TableLov").tBodies[0].rows[i].cells[j].getElementsByTagName("a")[0], '');
            document.getElementById("TableLov").tBodies[0].rows[i].cells[j].getElementsByTagName("a")[0].style.display = "";//Fix for 21809534 
			//9NT1606_14_1_RETRO_12_3_28117516 starts 
			var fldObj = document.getElementById("TableLov").tBodies[0].rows[i].cells[j].getElementsByTagName("a")[0];
			if(getNextSibling(fldObj) && getNextSibling(getNextSibling(fldObj))){
				getNextSibling(getNextSibling(fldObj)).value ="";
			} //9NT1606_14_1_RETRO_12_3_28117516 ends
        }
    }

    var resValue = strLovData.split("!");
    for (var i = 0; i < resValue.length ; i++) {
        addEvent(document.getElementById("TableLov").tBodies[0].rows[i], "onclick", "returnValToParent(event)");
        var resTD = resValue[i].split("~");
        for (var j = 0; j < resTD.length - 1; j++) {
            var anchorElem = document.getElementById("TableLov").tBodies[0].rows[i].cells[j].getElementsByTagName("a")[0];
            if (resTD[j].indexOf("&amp;") != -1) {
                resTD[j] = resTD[j].replace("&amp;", "&");
            }
            if (resTD[j].indexOf("&apos;") != -1) {
                resTD[j] = resTD[j].replace("&apos;", "'");
            }
            if (resTD[j].indexOf("&lt;") != -1) {
                resTD[j] = resTD[j].replace("&lt;", "<");
            }
            if (resTD[j].indexOf("&gt;") != -1) {
                resTD[j] = resTD[j].replace("&gt;", ">");
            }
			if (resTD[j].indexOf("_EXCL_") != -1){//12.0.3 citi_dev fix start
              var re = new RegExp('_EXCL_', "g");
              resTD[j] =  resTD[j].replace(re, "!");
            }//12.0.3 citi_dev fix start
            if (anchorElem.type == "DATE") {
                if (resTD[j] != "") {
                    getNextSibling(getNextSibling(anchorElem)).value = resTD[j];
                    var FormatDate = new getFrmtDate(resTD[j], gDateFormatDSO);
                    if (FormatDate.isValidDate()) resTD[j] = FormatDate.getShortDate();
                }
            }
            var re = new RegExp('&amp;', "g");
            resTD[j] = resTD[j].replace(re, "&");
            var re1 = new RegExp('&apos;', "g");
            resTD[j] = resTD[j].replace(re1, "'");
            setInnerText(anchorElem, resTD[j]);
            anchorElem.style.display = "inline-block";//Fix for 21809534 
        }
    }
}

function lovAccessKeys(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if(evnt.ctrlKey && (evnt.keyCode == 67 || evnt.keyCode == 88) && parent.restrictReqd == 'Y'){//jc2 changes begin //?PIPA
        try {
            evnt.keyCode = 0;
        }
        catch (ex) {
        }
        preventpropagate(evnt);
        fnDisableBrowserKey(evnt);
        return false;
    }//jc2 changes end //PIPA
	if(evnt.ctrlKey && (evnt.keyCode == 80 ) && parent.restrictPrint == 'Y'){//jc2 changes begin //?PIPA
        try {
            evnt.keyCode = 0;
        }
        catch (ex) {
        }
        preventpropagate(evnt);
        fnDisableBrowserKey(evnt);
        return false;
    }//jc2 changes end //PIPA
    if (evnt.keyCode == 27) {
        fnExitLov();
        return;
    } else if (evnt.keyCode == 8) {
        if (srcElement.tagName.toUpperCase() == 'OJ-INPUT-TEXT' || (srcElement.tagName.toUpperCase() == 'INPUT' &&  (srcElement.getAttribute("type") && srcElement.getAttribute("type").toUpperCase()  == 'TEXT') )) { //REDWOOD_CHANGES
            return true;
        } else {
            fnDisableBrowserKey(evnt);
            preventpropagate(evnt);
            try {
                evnt.keyCode = 0;
            } catch (e) {}
            return false;
        }
    } else if (evnt.keyCode == 33) {
        if (document.getElementsByName("navPrev")[0].disabled == false) doNavigate(gcNAV_PREVIOUS);
    } else if (evnt.keyCode == 34) {
        if (document.getElementsByName("navNext")[0].disabled == false) doNavigate(gcNAV_NEXT);
    } else if (evnt.keyCode == 35) {
        doNavigate(gcNAV_LAST);
    } else if (evnt.keyCode == 36) {
        doNavigate(gcNAV_FIRST);
    } else {
        return disableCommonKeys(evnt);
    }
}

function gotoPage() {	 
//REDWOOD_CHANGES
    if ((Number(document.getElementById("goto").rawValue) > Number(getInnerText(document.getElementById("TotPgCnt")))) || (Number(document.getElementById("goto").rawValue) < 1)) {
        //alert(mainWin.getItemDesc("LBL_PAGE_NO_BLANK"));
        document.getElementById("goto").value = Number(getInnerText(document.getElementById("TotPgCnt")));
        setInnerText(document.getElementById("CurPage"), Number(document.getElementById("goto").rawValue));
    } else if (isNaN(document.getElementById("goto").rawValue)) {
        //alert(mainWin.getItemDesc("LBL_PAGE_NO_BLANK"));
        document.getElementById("goto").value = Number(getInnerText(document.getElementById("TotPgCnt")));
        setInnerText(document.getElementById("CurPage"), document.getElementById("goto").rawValue);
    }
    setInnerText(document.getElementById("CurPage"), Number(document.getElementById("goto").rawValue));
//REDWOOD_CHANGES
    getLovResults(source, functionId, blockId, fldName, lovId);
}

function doNavigate(type) {
    switch (type) {
    case gcNAV_FIRST:
        setInnerText(document.getElementById("CurPage"), 1);
        setInnerText(document.getElementById("TotPgCnt"), "");
		document.getElementById("goto").value = Number(getInnerText(document.getElementById("CurPage")));  //REDWOOD_35233678
        getLovResults(source, functionId, blockId, fldName, lovId);
        break;
    case gcNAV_PREVIOUS:
        setInnerText(document.getElementById("CurPage"), Number(getInnerText(document.getElementById("CurPage"))) - 1);
        document.getElementById("goto").value = Number(getInnerText(document.getElementById("CurPage"))); //REDWOOD_CHANGES
        getLovResults(source, functionId, blockId, fldName, lovId);
        break;
    case gcNAV_NEXT:
        setInnerText(document.getElementById("CurPage"), Number(getInnerText(document.getElementById("CurPage"))) + 1);
        document.getElementById("goto").value = Number(getInnerText(document.getElementById("CurPage")));  //REDWOOD_CHANGES
        getLovResults(source, functionId, blockId, fldName, lovId);
        break;
    case gcNAV_LAST:
        setInnerText(document.getElementById("CurPage"), Number(getInnerText(document.getElementById("TotPgCnt"))));
		document.getElementById("goto").value = Number(getInnerText(document.getElementById("CurPage")));  //REDWOOD_35233678
        getLovResults(source, functionId, blockId, fldName, lovId);
        break;
    default:
        //alert("Program Error: doNavigate doesn't handle this action");//FC 11.4 NLS Changes
        showErrorAlerts('IN-HEAR-500'); //FC 11.4 NLS Changes
    }
}
//REDWOOD_CHANGES
function returnValToParent(evnt, selectedRowIndex) {
    

    var cnt = 0;
    var field_namesArr = parent.returnFlds.split("~");
    //field_namesArr = field_namesArr.filter((v)=>v);
    var field_names_recNum = parseInt(parent.recordNum, 10);
    var fieldValuesArr = new Array();
    fieldValuesArr = rawDataProvider.filter(function(val, index, arr) {
        return parseInt(selectedRowIndex) === index
    });
    fieldValuesArr = [].concat.apply([], fieldValuesArr.map((obj)=>Object.values(obj)));
//    for(var i=0;i<rednFlds.length;i++) { 
//        if (rednFlds[i].value) { 
//            rednFlds[i].name =rednFlds[i].name.replace('I','') 
//        } 
//    }
    

    for (var i = 0; i < field_namesArr.length -1; i++) {
        var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
        if (field_namesArr[i].indexOf("__") == -1) fldName = field_namesArr[i];

       // if (isME == 'true') { //REDWOOD_35302672
		  if (isME == 'true' && parent.lovBlockObj != null) { //REDWOOD_35302672
            var lovBlkObj = parent.lovBlockObj.tBodies[0].rows[parent.recordNum].cells;
            for (var j = 0; j < lovBlkObj.length; j++) {
                var lovFldObj = "";
                var tempTdElem = lovBlkObj[j]; //Static fix start
                if(lovBlkObj[j].children.length > 0 && lovBlkObj[j].children[0].tagName == "DIV"){
                  tempTdElem = lovBlkObj[j].children[0];
                }//Static fix end
                
                if (tempTdElem.children.length > 0) { //Static fix start
                    if (!tempTdElem.children[1]) {
                        lovFldObj = tempTdElem.children[0].children[0];
                        if (typeof (lovFldObj) == "undefined" || lovFldObj.type == undefined || lovFldObj.type.toUpperCase() == "CHECKBOX") {
                            lovFldObj = tempTdElem.children[0]; 
                        }
                    } else {
                        lovFldObj = tempTdElem.children[0];
                        //lovFldObj = getElementsByOjName(fldName)[0];
                    }//Static fix end

					//fix for 17486910 checkbox return field  in lov starts
					if (lovFldObj.tagName.toUpperCase()  =='LABEL') {
						lovFldObj = tempTdElem.children[1]; //Static fix 
					}
					//fix for 17486910 checkbox return field  in lov ends
                }
                
                var lovObjFldName = lovFldObj.getAttribute("name") || lovFldObj.name ;
                if (lovObjFldName == fldName) {
                    lovFldObj.value = fieldValuesArr[i];
                    if (getOuterHTML(lovFldObj).indexOf("onpropertychange") != -1) {
                        parent.fireHTMLEvent(lovFldObj, "onpropertychange", evnt);
                        break;
                    }
                    if (lovFldObj.tagName.toUpperCase() == 'OJ-SWITCH') {//OJET Migration
                        if (typeof (lovFldObj.getAttribute("ON")) != "undefined") {
                            if (lovFldObj.getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i].toUpperCase() == 'Y') {
                                lovFldObj.value = true;
                            } else {
                                lovFldObj.value = false;
                            }
                        } else {
                            if (fieldValuesArr[i] == 'Y') {
                                lovFldObj.value = true;
                            } else {
                                lovFldObj.value = false;
                            }
                        }
                    } else if (lovFldObj.tagName.toUpperCase() == 'OJ-RADIOSET') {//OJET Migration
                        setRadioButtonsData(lovFldObj, fieldValuesArr[i]);
                    }
                }
            }
        } else {
            if (field_namesArr[i] != "" && parent.document.getElementById(field_namesArr[i])) {
//                if (parent.document.getElementById(field_namesArr[i]).getAttribute("type").toUpperCase() == 'CHECKBOX') { //OJET Migration
//                    if (typeof (parent.document.getElementById(field_namesArr[i]).getAttribute("ON")) != "undefined") {
//                        if (parent.document.getElementById(field_namesArr[i]).getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i].toUpperCase() == 'Y') {
//                            parent.document.getElementById(field_namesArr[i]).checked = true;
//                        } else {
//                            parent.document.getElementById(field_namesArr[i]).checked = false;
//                        }
//                    } else {
//                        if (fieldValuesArr[i] == 'Y') {
//                            parent.document.getElementById(field_namesArr[i]).checked = true;
//                        } else {
//                            parent.document.getElementById(field_namesArr[i]).checked = false;
//                        }
//                    }
//                } else if (parent.document.getElementById(field_namesArr[i]).getAttribute("type").toUpperCase() == 'RADIO') { //OJET Migration
//                    setRadioButtonsData(parent.document.getElementById(field_namesArr[i]), fieldValuesArr[i]);
//                } else {
                    var reg = new RegExp('<br/>', "g");
                    fieldValuesArr[i] = fieldValuesArr[i] && fieldValuesArr[i].replace(reg, "\n");
                    if(parent.document.getElementById(field_namesArr[i]).tagName.toUpperCase() == 'OJ-INPUT-NUMBER'){
                        parent.document.getElementById(field_namesArr[i]).value = Number(fieldValuesArr[i]);
                    }else if (parent.document.getElementById(field_namesArr[i]).tagName.toUpperCase() == 'OJ-SWITCH') {
                        if (typeof (parent.document.getElementById(field_namesArr[i]).getAttribute("ON")) != "undefined") {
                            if (parent.document.getElementById(field_namesArr[i]).getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i].toUpperCase() == 'Y' ) {
                                parent.document.getElementById(field_namesArr[i]).value = true;
                            }
                            else {
                                parent.document.getElementById(field_namesArr[i]).value = false;
                            }
                        }
                        else {
                            if (fieldValuesArr[i] == 'Y') {
                                parent.document.getElementById(field_namesArr[i]).value = true;
                            }
                            else {
                                parent.document.getElementById(field_namesArr[i]).value = false;
                            }
                        }
                    }else if (parent.document.getElementById(field_namesArr[i]).tagName.toUpperCase() == 'OJ-SELECT-SINGLE') {//redwood_35335422 starts
						var selectedValue = "";
						var selectObject=parent.document.getElementById(field_namesArr[i]);
						for (var index = 0;index < selectObject.data.data.length;index++) {
							if (selectObject.data.data[index].value==fieldValuesArr[i]) {
								selectedValue = selectObject.data.data[index].value;
								break;
							}
						}
						parent.document.getElementById(field_namesArr[i]).value = selectedValue;
						parent.document.getElementById(field_namesArr[i]).setAttribute('value',selectedValue) ;
					}	//redwood_35335422 ends
         //Redwood_37135330 Starts
          else if (parent.document.getElementById(field_namesArr[i]).getAttribute('DateValue') && parent.document.getElementById(field_namesArr[i]).getAttribute('dtype')=='DATE' && parent.document.getElementById(field_namesArr[i]).getAttribute('DateValue') !=null){
                     var dateParts = fieldValuesArr[0].split('/');
                     var day = dateParts[1];
                     var month = dateParts[0];
                     var year = dateParts[2];
                     var Dateval = year + '-' + month + '-' + day;
	            parent.document.getElementById(field_namesArr[i]).setAttribute('DateValue',Dateval);
                    parent.document.getElementById(field_namesArr[i]).value = fieldValuesArr[i];
                }
	     //Redwood_37135330 Ends			
					else{
                        parent.document.getElementById(field_namesArr[i]).value = fieldValuesArr[i];
                    }
                    
                    parent.fireHTMLEvent(parent.document.getElementById(field_namesArr[i]), "onpropertychange", evnt);
              //  }
            } else if (fldName != "" && parent.document.getElementsByName(fldName)) {
                if (parent.document.getElementsByName(fldName).length > 0) {
					//SFR#35317667 Starts
                    //if (parent.document.getElementsByName(field_namesArr[i]).length > 0 && parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("type").toUpperCase() == 'CHECKBOX') { //OJET Migration
                    if (parent.document.getElementsByName(field_namesArr[i]).length > 0 && parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("type")!=null && parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("type").toUpperCase() == 'CHECKBOX') { 
					//SFR#35317667 Ends
                        if (typeof (parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("ON")) != "undefined") {
                            if (parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i] == 'Y') {
                                parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = true;
                            } else {
                                parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = false;
                            }
                        } else {
                            if (fieldValuesArr[i] == 'Y') {
                                parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = true;
                            } else {
                                parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = false;
                            }
                        }
                    } else {
                        var reg = new RegExp('<br/>', "g");
                        fieldValuesArr[i] = fieldValuesArr[i].replace(reg, "\n");
                        parent.document.getElementsByName(fldName)[field_names_recNum].value = fieldValuesArr[i];
                        parent.fireHTMLEvent(parent.document.getElementsByName(fldName)[field_names_recNum], "onpropertychange", evnt);
                    }
                }
            }
        }

        if (fieldValuesArr[i] == "") cnt++;
    }
    // if (cnt == field_namesArr.length - 1) return;
    try {
        parent.fnEventsHandler('fnPostReturnValToParent_' + lovId);
    } catch (e) {}
    fnExitLov(true);
}

function returnValToParent_old(evnt) { 
//REDWOOD_CHANGES
    var evnt = window.event || evnt;
    var srcElement = getEventSourceElement(evnt);
    var cnt = 0;
    var selectedRowNum = "";
    if (srcElement.tagName.toUpperCase() == "A") selectedRowNum = srcElement.parentNode.parentNode.parentNode.rowIndex;//static header change
    else if (srcElement.tagName.toUpperCase() == "DIV") selectedRowNum = srcElement.parentNode.parentNode.rowIndex;//static header change
    else selectedRowNum = srcElement.parentNode.rowIndex;
    var field_namesArr = parent.returnFlds.split("~");
    var field_names_recNum = parseInt(parent.recordNum, 10);
    var fieldValuesArr = new Array();
    var selectedRowObj = document.getElementById("TableLov").tBodies[0].rows[selectedRowNum].cells;//static header change
    for (var rowNum = 0; rowNum < selectedRowObj.length; rowNum++) {
        if (typeof(selectedRowObj[rowNum].children[0].children[0])!="undefined" && selectedRowObj[rowNum].children[0].children[0].type == "DATE") //21110362 
        //fieldValuesArr[rowNum] = selectedRowObj[rowNum].lastChild.value;
            fieldValuesArr[rowNum] = selectedRowObj[rowNum].children[0].children[selectedRowObj[rowNum].children[0].children.length - 1].value;//21110362 
        else fieldValuesArr[rowNum] = getInnerText(selectedRowObj[rowNum]);
    }

    for (var i = 0; i < field_namesArr.length - 1; i++) {
        var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
        if (field_namesArr[i].indexOf("__") == -1) fldName = field_namesArr[i];

        if (isME == 'true') {
            var lovBlkObj = parent.lovBlockObj.tBodies[0].rows[parent.recordNum].cells;
            for (var j = 0; j < lovBlkObj.length; j++) {
                var lovFldObj = "";
                var tempTdElem = lovBlkObj[j]; //Static fix start
                if(lovBlkObj[j].children.length > 0 && lovBlkObj[j].children[0].tagName == "DIV"){
                  tempTdElem = lovBlkObj[j].children[0];
                }//Static fix end
                
                if (tempTdElem.children.length > 0) { //Static fix start
                    if (!tempTdElem.children[1]) {
                        lovFldObj = tempTdElem.children[0].children[0];
                        if (typeof (lovFldObj) == "undefined" || lovFldObj.type == undefined) lovFldObj = tempTdElem.children[0]; 
                    } else {
                        lovFldObj = tempTdElem.children[1];
                    }//Static fix end
					//fix for 17486910 checkbox return field  in lov starts
					if (lovFldObj.tagName.toUpperCase()  =='LABEL') {
						lovFldObj = tempTdElem.children[0].children[1]; //Static fix 
					}
					//fix for 17486910 checkbox return field  in lov ends
                }
				
                if (lovFldObj.name == fldName) {
                    lovFldObj.value = fieldValuesArr[i];
                    if (getOuterHTML(lovFldObj).indexOf("onpropertychange") != -1) {
                        parent.fireHTMLEvent(lovFldObj, "onpropertychange", evnt);
                        break;
                    }
                    if (lovFldObj.tagName.toUpperCase() == 'OJ-SWITCH') {//REDWOOD_CHANGES
                        if (typeof (lovFldObj.getAttribute("ON")) != "undefined") {
                            if (lovFldObj.getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i].toUpperCase() == 'Y') {
                                lovFldObj.checked = true;
                            } else {
                                lovFldObj.checked = false;
                            }
                        } else {
                            if (fieldValuesArr[i] == 'Y') {
                                lovFldObj.checked = true;
                            } else {
                                lovFldObj.checked = false;
                            }
                        }
                    } else if (lovFldObj.tagName.toUpperCase() == 'OJ-RADIOSET') {//REDWOOD_CHANGES
                        setRadioButtonsData(lovFldObj, fieldValuesArr[i]);
                    }
                }
            }
        } else {
            if (field_namesArr[i] != "" && parent.document.getElementById(field_namesArr[i])) {
                if (parent.document.getElementById(field_namesArr[i]).type.toUpperCase() == 'CHECKBOX') {
                    if (typeof (parent.document.getElementById(field_namesArr[i]).getAttribute("ON")) != "undefined") {
                        if (parent.document.getElementById(field_namesArr[i]).getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i].toUpperCase() == 'Y') {
                            parent.document.getElementById(field_namesArr[i]).checked = true;
                        } else {
                            parent.document.getElementById(field_namesArr[i]).checked = false;
                        }
                    } else {
                        if (fieldValuesArr[i] == 'Y') {
                            parent.document.getElementById(field_namesArr[i]).checked = true;
                        } else {
                            parent.document.getElementById(field_namesArr[i]).checked = false;
                        }
                    }
                } else if (parent.document.getElementById(field_namesArr[i]).type.toUpperCase() == 'RADIO') {
                    setRadioButtonsData(parent.document.getElementById(field_namesArr[i]), fieldValuesArr[i]);
                } else {
                    var reg = new RegExp('<br/>', "g");
                    fieldValuesArr[i] = fieldValuesArr[i].replace(reg, "\n");
                    parent.document.getElementById(field_namesArr[i]).value = fieldValuesArr[i];
                    parent.fireHTMLEvent(parent.document.getElementById(field_namesArr[i]), "onpropertychange", evnt);
                }
            } else if (fldName != "" && parent.document.getElementsByName(fldName)) {
                if (parent.document.getElementsByName(fldName).length > 0) {
                    if (parent.document.getElementsByName(fldName)[field_names_recNum].type.toUpperCase() == 'CHECKBOX') { //9NT1606_12_2_RETRO_12_0_3_25562060 changes 
                        if (typeof (parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("ON")) != "undefined") {
                            if (parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i] == 'Y') {
                                parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = true;
                            } else {
                                parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = false;
                            }
                        } else {
                            if (fieldValuesArr[i] == 'Y') {
                                parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = true;
                            } else {
                                parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = false;
                            }
                        }
                    } else {
                        var reg = new RegExp('<br/>', "g");
                        fieldValuesArr[i] = fieldValuesArr[i].replace(reg, "\n");
                        parent.document.getElementsByName(fldName)[field_names_recNum].value = fieldValuesArr[i];
                        parent.fireHTMLEvent(parent.document.getElementsByName(fldName)[field_names_recNum], "onpropertychange", evnt);
                    }
                }
            }
        }

        if (fieldValuesArr[i] == "") cnt++;
    }
    if (cnt == field_namesArr.length - 1) return;
    try {
        parent.fnEventsHandler('fnPostReturnValToParent_' + lovId);
    } catch (e) {}
    fnExitLov(true);
}

function enableAllButtons() {
//REDWOOD_CHANGES
    //document.getElementsByName("navFirst")[0].className = "BTNtext";
    //document.getElementsByName("navPrev")[0].className = "BTNtext";
    //document.getElementsByName("navNext")[0].className = "BTNtext";
    //document.getElementsByName("navLast")[0].className = "BTNtext";
    //document.getElementsByName("go")[0].className = "BTNtext";  
//REDWOOD_CHANGES
    document.getElementsByName("navFirst")[0].disabled = false;
    document.getElementsByName("navPrev")[0].disabled = false;
    document.getElementsByName("navNext")[0].disabled = false;
    document.getElementsByName("navLast")[0].disabled = false;
    document.getElementById("goto").readOnly = false;	 //REDWOOD_CHANGES
}

function disableAllButtons() {
//REDWOOD_CHANGES
    //document.getElementsByName("navFirst")[0].className = "BTNtextD";
    //document.getElementsByName("navPrev")[0].className = "BTNtextD";
    //document.getElementsByName("navNext")[0].className = "BTNtextD";
    //document.getElementsByName("navLast")[0].className = "BTNtextD";
    //document.getElementsByName("go")[0].className = "BTNtextD";  
//REDWOOD_CHANGES
    document.getElementsByName("navFirst")[0].disabled = true;
    document.getElementsByName("navPrev")[0].disabled = true;
    document.getElementsByName("navNext")[0].disabled = true;
    document.getElementsByName("navLast")[0].disabled = true;
    document.getElementById("goto").readOnly = true;  //REDWOOD_CHANGES
}

function enableButtons() {
    disableAllButtons();
    if (Number(getInnerText(document.getElementById("TotPgCnt"))) > 1) {
        if (Number(getInnerText(document.getElementById("CurPage"))) == Number(getInnerText(document.getElementById("TotPgCnt")))) {
     //REDWOOD_CHANGES   
            //document.getElementsByName("navFirst")[0].className = "BTNtext";
            //document.getElementsByName("navPrev")[0].className = "BTNtext";
            //document.getElementsByName("navNext")[0].className = "BTNtextD";
            //document.getElementsByName("navLast")[0].className = "BTNtextD";
    //REDWOOD_CHANGES
            //document.getElementsByName("go")[0].className = "BTNtextD";
            document.getElementsByName("navFirst")[0].disabled = false;
            document.getElementsByName("navPrev")[0].disabled = false;
            //document.getElementsByName("go")[0].disabled = true;        
        } else if (Number(getInnerText(document.getElementById("CurPage"))) == 1) {
            //document.getElementsByName("navNext")[0].className = "BTNtext"; //REDWOOD_CHANGES
            //document.getElementsByName("navLast")[0].className = "BTNtext"; //REDWOOD_CHANGES
            //document.getElementsByName("go")[0].className = "BTNtext";
            //document.getElementsByName("navFirst")[0].className = "BTNtextD";//REDWOOD_CHANGES
            //document.getElementsByName("navPrev")[0].className = "BTNtextD";	//REDWOOD_CHANGES
            document.getElementsByName("navNext")[0].disabled = false;
            document.getElementsByName("navLast")[0].disabled = false;
            //document.getElementsByName("go")[0].disabled = false;
        } else {
            enableAllButtons();
        }
        
        //document.getElementsByName("go")[0].disabled = false;	//REDWOOD_CHANGES
    }
}


function buildReductionCriteria() {
    var rednString = "";		 
//REDWOOD_CHANGES
    var rednFlds = [...document.getElementsByTagName("oj-input-text")];
    var dateRednFlds = [...document.getElementsByTagName("oj-input-date")];
    //var rednFlds = [...rednFlds, ...dateRednFlds];
    for (var dateFldCnt = 0; dateFldCnt < dateRednFlds.length; dateFldCnt++) {
        var idx = Number(dateRednFlds[dateFldCnt].name);
        rednFlds.splice(idx-1, 0, dateRednFlds[dateFldCnt]);
    }	 
//REDWOOD_CHANGES
    var tmp_date = "";
	var rednDate=""; //redwood_36763000
    /*if(typeof(redValue)!="undefined" && redValue!=""){
        rednFlds[1].value=redValue+"%";
    }*/
    for (var flds = 0; flds < rednFlds.length; flds++) { //REDWOOD_CHANGES
//REDWOOD_CHANGES
//        if (rednFlds[flds].value && rednFlds[flds].tagName.toLowerCase() === 'oj-input-date') {
//            rednFlds[flds].name = rednFlds[flds].name.replace('I', ''); 
//        }		 
//REDWOOD_CHANGES
        if (rednFlds[flds].name == "" || rednFlds[flds].type == "hidden") {
            /*Fix for 16861079*/
            if (rednFlds[flds].tagName == 'OJ-INPUT-DATE') {  //REDWOOD_CHANGES
                tmp_date = rednFlds[flds].value;
            }
            continue;
        } else {
            if (tmp_date != "" || (getPreviousSibling(typeof (rednFlds[flds])) != "undefined" && getPreviousSibling(rednFlds[flds]) != null && getPreviousSibling(rednFlds[flds]).getAttribute("data_type") == "DATE")) {
/* security fixes for WF starts */
                //rednString += getPreviousSibling(rednFlds[flds]).name + ">" + tmp_date + "~";
				/*Fix for 16861079*/
             //   rednString += getPreviousSibling(getPreviousSibling(rednFlds[flds])).name + "!" + tmp_date + "|";//March22 for security changes //REDWOOD_CHANGES
                rednString += getPreviousSibling(getPreviousSibling(rednFlds[flds])).name + "!" + tmp_date + "|";//March22 for security changes
                tmp_date = "";
            } else {
                if (rednFlds[flds].value ) {//REDWOOD_CHANGES
        //redwood_36763000 Starts
				if (parent.document.getElementById(blockId+"__"+fldName)!=null && parent.document.getElementById(blockId+"__"+fldName).getAttribute('dtype')=='DATE' && rednFlds[flds].value!='%'){
							rednDate = rednFlds[flds].value;
							rednFlds[flds].value=rednFlds[flds].value.replace('%',"");
						 if (rednFlds[flds].value !=null && rednFlds[flds].value !=""){
		         var dateParts = rednFlds[flds].value.split('/');
             var day = dateParts[1];
             var month = dateParts[0];
             var year = dateParts[2];
             rednFlds[flds].value = year + '-' + month + '-' + day+'%';
						}
						}
      //redwood_36763000 Ends
                    //rednString += rednFlds[flds].name + ">" + rednFlds[flds].value + "~";
                    var str= rednFlds[flds].value;
                     if (typeof(str) != "undefined" && str != null) {
                        if(str.indexOf("%")!=-1)
                        {
                        var re = new RegExp("%", "g");
                        str = str.replace(re, "_PCT_");
                        }
                   }
                    rednString += rednFlds[flds].name + "!" + str + "|"; //March22 for security changes
                } else {
                    //rednString += rednFlds[flds].name + ">" + "%~";
                    rednString += rednFlds[flds].name + "!" + "_PCT_|";//March22 for security changes
/* security fixes for WF ends */
                }
         //redwood_36763000 Starts
				if(rednDate!=null && rednDate!="" && rednDate !='%'){
					rednFlds[flds].value = rednDate ;
					rednDate ="";
				}
        //redwood_36763000 Ends
            }
        }
    }
    if (rednString != '') {
        rednString = rednString.substring(0, rednString.length - 1);
    }
    return rednString;
}

function setHeights() {
  //REDWOOD_CHANGES 
    parent.document.getElementById("ChildWin").style.width = "100%";

    parent.document.getElementById("ChildWin").children[0].style.width = "100%";
    parent.document.getElementById("ChildWin").style.height = parseInt(mainWin.document.getElementById("mainContent").offsetHeight)+"px";
    parent.document.getElementById("ChildWin").children[0].style.height =  parseInt(mainWin.document.getElementById("mainContent").offsetHeight)+"px";
    parent.document.getElementById("ChildWin").style.top = "0px";
    parent.document.getElementById("ChildWin").children[0].style.top = "0px";
    parent.document.getElementById("ChildWin").style.zIndex= 5990;
    if(!parent.document.getElementById("WNDtitlebar")){
         parent.document.getElementById("ChildWin").children[0].style.top =  mainWin.document.getElementById("masthead").offsetHeight  + "px";
         parent.document.getElementById("ChildWin").style.top =mainWin.document.getElementById("masthead").offsetHeight  + "px";
    }
//redwood_35301776 starts
    setTimeout(function(){
	if (document.getElementById("LOVPageHead").getElementsByTagName("oj-input-text").length > 0) 
		document.getElementById("LOVPageHead").getElementsByTagName("oj-input-text")[0].focus();
	},1000);
//redwood_35301776 Ends   
   
   // parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H3")[0]);
    // if (parent.g_scrType != undefined && parent.g_scrType != 'L') {
    //     parent.document.getElementById("ChildWin").className = "oj-sm-width-full";
    // } else {
         /*parent.document.getElementById("ChildWin").className = "oj-sm-width-2/3";
    // }
    if ((typeof (parent.showChgBrnLOV) != 'undefined') && (parent.showChgBrnLOV == true)) {
        parent.document.getElementById("ChildWin").style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
        parent.document.getElementById("ChildWin").style.left = mainWin.document.getElementById("vtab").offsetWidth + 8 + "px";
        /*citi ui change start 
		if (parent.document.getElementById("vtab") != null && parent.document.getElementById("vtab").style.display == "none") {
            parent.document.getElementById("ChildWin").style.left = mainWin.document.getElementById("vtabMin").offsetWidth + 8 + "px";
        } citi ui chnage end*/
       /* parent.showChgBrnLOV = false;
    } else {
        parent.document.getElementById("ChildWin").style.top = document.getElementById("WNDtitlebar").offsetHeight + "px";
        parent.document.getElementById("ChildWin").style.left = "4px";
    }
    if (typeof (parent.showChgBrnLOV) == 'undefined') {
        if (typeof (parent.fromSubScr) == 'undefined' && singleView == 'false') {
            var parentScrID = parent.seqNo;
            parentDivHeight = parseInt(parent.parent.document.getElementById(parentScrID).clientHeight);
            parentIFrame = parseInt(parent.parent.document.getElementById(parentScrID).children[0].clientHeight);
            parentDIVScrContainer = parseInt(parent.document.getElementById("DIVScrContainer").clientHeight);
            if ((parent.parent.document.getElementById(parentScrID).offsetHeight - document.getElementById("WNDtitlebar").offsetHeight) < parent.document.getElementById("ChildWin").offsetHeight) {
               // parent.parent.document.getElementById(parentScrID).style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
             //   parent.parent.document.getElementById(parentScrID).children[0].style.height = parent.document.getElementById("ChildWin").children[0].offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
             //   parent.document.getElementById("DIVScrContainer").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
            }
        } else {
            parentDivHeight = parent.parent.document.getElementById("ChildWin").clientHeight;
            parentIFrame = parent.parent.document.getElementById("ChildWin").children[0].clientHeight;
            parentDIVScrContainer = parent.document.getElementById("DIVScrContainer").clientHeight;
            parentDivWidth = parent.parent.document.getElementById("ChildWin").clientWidth;
            parentIFrameWidth = parent.parent.document.getElementById("ChildWin").children[0].clientWidth;
            parentTitleWidth = parent.document.getElementById("WNDtitlebar").clientWidth;
            if ((parent.parent.document.getElementById("ChildWin").offsetHeight - document.getElementById("WNDtitlebar").offsetHeight) < parent.document.getElementById("ChildWin").offsetHeight) {
             //   parent.parent.document.getElementById("ChildWin").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
             //   parent.parent.document.getElementById("ChildWin").children[0].style.height = parent.document.getElementById("ChildWin").children[0].offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
             //   parent.document.getElementById("DIVScrContainer").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
            }
            if (parent.parent.document.getElementById("ChildWin").offsetWidth < parent.document.getElementById("ChildWin").offsetWidth) {
                parent.parent.document.getElementById("ChildWin").style.width = parent.document.getElementById("ChildWin").offsetWidth + 10 + "px";
                parent.parent.document.getElementById("ChildWin").children[0].style.width = parent.document.getElementById("ChildWin").offsetWidth + 10 + "px";
                parent.document.getElementById("WNDtitlebar").style.width = parent.document.getElementById("ChildWin").offsetWidth + 10 + "px";
            }
        }
    }
    if (istxnBrn == "true") {
        parentDivHeight = parent.parent.document.getElementById("ChildWin").clientHeight;
        parentIFrame = parent.parent.document.getElementById("ChildWin").children[0].clientHeight;
        parentDivWidth = parent.parent.document.getElementById("ChildWin").clientWidth;
        parentIFrameWidth = parent.parent.document.getElementById("ChildWin").children[0].clientWidth;
        parentTitleWidth = parent.document.getElementById("WNDtitlebar").clientWidth;
        parent.parent.document.getElementById("ChildWin").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.height = parent.document.getElementById("ChildWin").children[0].offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
        parent.parent.document.getElementById("ChildWin").style.width = parent.document.getElementById("ChildWin").offsetWidth + 10 + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.width = parent.document.getElementById("ChildWin").children[0].offsetWidth + 10 + "px";
        parent.document.getElementById("WNDtitlebar").style.width = parent.document.getElementById("ChildWin").offsetWidth + 40 + "px";
        parent.document.getElementById("ChildWin").style.top = "0px";
        parent.document.getElementById("ChildWin").style.left = "4px";
    }
    //document.getElementById("DIVWNDContainer").style.width = parent.document.getElementById("ChildWin").offsetWidth + "px";
    //parent.mask();
    var lovWinObj = parent.document.getElementById("Div_ChildWin");
    lovWinObj.focus();
    if (document.getElementById("LOVPageHead").getElementsByTagName("oj-input").length > 0) document.getElementById("LOVPageHead").getElementsByTagName("INPUT")[0].focus();
     //Bug 14267164 fix start
    //if(navigator.userAgent.indexOf('MSIE 7.0') !=-1){
    if(getBrowser().indexOf("IE") != -1 && getBrowser().indexOf("7") != -1){//ie11 changes
      document.getElementById('TblInnerDiv').children[0].style.position = "fixed"
    }
    //Bug 14267164 fix end
    if(maximize=='Y') fnMaximizeLov();/*BUG 19619967*/
}

function setHeights_old() {	  
//REDWOOD_CHANGES
    parent.document.getElementById("ChildWin").style.width = document.getElementById("DIVWNDContainer").offsetWidth + "px";
    parent.document.getElementById("ChildWin").children[0].style.width = document.getElementById("DIVWNDContainer").offsetWidth + "px";
    parent.document.getElementById("ChildWin").style.height = document.getElementById("DIVWNDContainer").offsetHeight + "px";
    parent.document.getElementById("ChildWin").children[0].style.height = document.getElementById("DIVWNDContainer").offsetHeight + "px";
    parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);

    if ((typeof (parent.showChgBrnLOV) != 'undefined') && (parent.showChgBrnLOV == true)) {
        parent.document.getElementById("ChildWin").style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
        parent.document.getElementById("ChildWin").style.left = mainWin.document.getElementById("vtab").offsetWidth + 8 + "px";
        /*citi ui change start 
		if (parent.document.getElementById("vtab") != null && parent.document.getElementById("vtab").style.display == "none") {
            parent.document.getElementById("ChildWin").style.left = mainWin.document.getElementById("vtabMin").offsetWidth + 8 + "px";
        } citi ui chnage end*/
        parent.showChgBrnLOV = false;
    } else {
        parent.document.getElementById("ChildWin").style.top = document.getElementById("WNDtitlebar").offsetHeight + "px";
        parent.document.getElementById("ChildWin").style.left = "4px";
    }
    if (typeof (parent.showChgBrnLOV) == 'undefined') {
        if (typeof (parent.fromSubScr) == 'undefined' && singleView == 'false') {
            var parentScrID = parent.seqNo;
            parentDivHeight = parseInt(parent.parent.document.getElementById(parentScrID).clientHeight);
            parentIFrame = parseInt(parent.parent.document.getElementById(parentScrID).children[0].clientHeight);
            parentDIVScrContainer = parseInt(parent.document.getElementById("DIVScrContainer").clientHeight);
            if ((parent.parent.document.getElementById(parentScrID).offsetHeight - document.getElementById("WNDtitlebar").offsetHeight) < parent.document.getElementById("ChildWin").offsetHeight) {
                parent.parent.document.getElementById(parentScrID).style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
                parent.parent.document.getElementById(parentScrID).children[0].style.height = parent.document.getElementById("ChildWin").children[0].offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
                parent.document.getElementById("DIVScrContainer").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
            }
        } else {
            parentDivHeight = parent.parent.document.getElementById("ChildWin").clientHeight;
            parentIFrame = parent.parent.document.getElementById("ChildWin").children[0].clientHeight;
            parentDIVScrContainer = parent.document.getElementById("DIVScrContainer").clientHeight;
            parentDivWidth = parent.parent.document.getElementById("ChildWin").clientWidth;
            parentIFrameWidth = parent.parent.document.getElementById("ChildWin").children[0].clientWidth;
            parentTitleWidth = parent.document.getElementById("WNDtitlebar").clientWidth;
            if ((parent.parent.document.getElementById("ChildWin").offsetHeight - document.getElementById("WNDtitlebar").offsetHeight) < parent.document.getElementById("ChildWin").offsetHeight) {
                parent.parent.document.getElementById("ChildWin").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
                parent.parent.document.getElementById("ChildWin").children[0].style.height = parent.document.getElementById("ChildWin").children[0].offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
                parent.document.getElementById("DIVScrContainer").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
            }
            if (parent.parent.document.getElementById("ChildWin").offsetWidth < parent.document.getElementById("ChildWin").offsetWidth) {
                parent.parent.document.getElementById("ChildWin").style.width = parent.document.getElementById("ChildWin").offsetWidth + 10 + "px";
                parent.parent.document.getElementById("ChildWin").children[0].style.width = parent.document.getElementById("ChildWin").offsetWidth + 10 + "px";
                parent.document.getElementById("WNDtitlebar").style.width = parent.document.getElementById("ChildWin").offsetWidth + 10 + "px";
            }
        }
    }
    if (istxnBrn == "true") {
        parentDivHeight = parent.parent.document.getElementById("ChildWin").clientHeight;
        parentIFrame = parent.parent.document.getElementById("ChildWin").children[0].clientHeight;
        parentDivWidth = parent.parent.document.getElementById("ChildWin").clientWidth;
        parentIFrameWidth = parent.parent.document.getElementById("ChildWin").children[0].clientWidth;
        parentTitleWidth = parent.document.getElementById("WNDtitlebar").clientWidth;
        parent.parent.document.getElementById("ChildWin").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.height = parent.document.getElementById("ChildWin").children[0].offsetHeight + document.getElementById("WNDtitlebar").offsetHeight * 2 + "px";
        parent.parent.document.getElementById("ChildWin").style.width = parent.document.getElementById("ChildWin").offsetWidth + 10 + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.width = parent.document.getElementById("ChildWin").children[0].offsetWidth + 10 + "px";
        parent.document.getElementById("WNDtitlebar").style.width = parent.document.getElementById("ChildWin").offsetWidth + 40 + "px";
        parent.document.getElementById("ChildWin").style.top = "0px";
        parent.document.getElementById("ChildWin").style.left = "4px";
    }
    document.getElementById("DIVWNDContainer").style.width = parent.document.getElementById("ChildWin").offsetWidth + "px";
    parent.mask();
    var lovWinObj = parent.document.getElementById("Div_ChildWin");
    lovWinObj.focus();
    if (document.getElementById("LOVPageHead").getElementsByTagName("INPUT").length > 0) document.getElementById("LOVPageHead").getElementsByTagName("INPUT")[0].focus();
     //Bug 14267164 fix start
    //if(navigator.userAgent.indexOf('MSIE 7.0') !=-1){
    if(getBrowser().indexOf("IE") != -1 && getBrowser().indexOf("7") != -1){//ie11 changes
      document.getElementById('TblInnerDiv').children[0].style.position = "fixed"
    }
    //Bug 14267164 fix end
    if(maximize=='Y') fnMaximizeLov();/*BUG 19619967*/
}

function fnExitLov(flag) {
    parent.unmask();
    if (typeof (flag) != "undefined") {
        if (flag) {
            parent.fnCheckProductPickup(parent.lovSrcElem);
            parent.fnCheckLOVReferredPickup(parent.lovSrcElem); // Fix for 16785126 
            flag = false;
        }
    }
    if (parent.document.getElementById("ChildWin") == null) {
        return;
    }
    if (typeof (parent.fromChgBrn) != 'undefined') {
        mainWin.document.getElementById("Div_AlertWin").style.width = brDIVWidth;
        mainWin.document.getElementById("Div_AlertWin").children[0].style.width = brIFWidth;
        mainWin.document.getElementById("Div_AlertWin").style.height = brDIVHeight;
        mainWin.document.getElementById("Div_AlertWin").children[0].style.height = brIFHeight;
        parent.document.getElementById("ResTree").style.width = brDIVWidth;
        parent.document.getElementById("ResTree").style.height = brDIVHeight;
    }
    if (typeof (parent.fromSubScr) == 'undefined' && singleView == 'false') {
        var parentScrID = parent.seqNo;
        if (typeof (parentScrID) != 'undefined') {
            if ((parentDivHeight - document.getElementById("WNDtitlebar").offsetHeight) < parent.document.getElementById("ChildWin").offsetHeight) {
                parent.parent.document.getElementById(parentScrID).style.height = parentDivHeight + "px";
                parent.parent.document.getElementById(parentScrID).children[0].style.height = parentIFrame + "px";
                parent.document.getElementById("DIVScrContainer").style.height = parentDIVScrContainer + "px";
            }
        }
    } else {
        if ((parentDivHeight - document.getElementById("WNDtitlebar").offsetHeight) < parent.document.getElementById("ChildWin").offsetHeight) {
            parent.parent.document.getElementById("ChildWin").style.height = parentDivHeight + "px";
            parent.parent.document.getElementById("ChildWin").children[0].style.height = parentIFrame + "px";
            parent.document.getElementById("DIVScrContainer").style.height = parentDIVScrContainer + "px";
        }
        if (parentDivWidth < parent.document.getElementById("ChildWin").offsetWidth) {
            parent.parent.document.getElementById("ChildWin").style.width = parentDivWidth + "px";
            parent.parent.document.getElementById("ChildWin").children[0].style.width = parentIFrameWidth + "px";
            parent.document.getElementById("WNDtitlebar").style.width = parentTitleWidth + "px";
        }
    }
    if (istxnBrn == "true") {
        parent.parent.document.getElementById("ChildWin").style.height = parentDivHeight + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.height = parentIFrame + "px";
        parent.parent.document.getElementById("ChildWin").style.width = parentDivWidth + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.width = parentIFrameWidth + "px";
        parent.document.getElementById("WNDtitlebar").style.width = parentTitleWidth + "px";
    }
    if (functionId == "SMCHGBRN") {
        if (mainWin.document.getElementById('BLK_BRANCH__BRANCH_CODE').value != "") mainWin.chgBrn(mainWin.document.getElementById('BLK_BRANCH__BRANCH_CODE').value);
        /*	 merging conflict below present instead of commented
if (mainWin.document.getElementById('BLK_BRANCH__STAGE').value != "")mainWin.fnCopyTask(mainWin.document.getElementById('BLK_BRANCH__STAGE').value);//Fix for 16064733
*/		
//Fix for 14761358 start
		//if (mainWin.document.getElementById('BLK_BRANCH__STAGE').value != "")mainWin.fnCopyTask(mainWin.document.getElementById('BLK_BRANCH__STAGE').value);//FCUBS_12.0_PS_01 
		//Fix for 17169177 start
		if (mainWin.document.getElementById('BLK_BRANCH__STAGE').value != "")mainWin.fnCopyTask(mainWin.document.getElementById('BLK_BRANCH__STAGE').value);//FCUBS_12.0_PS_01 
		//Fix for 17169177 end
        //Fix for 14761358 end
     //12.0.2 fix
	//	if (!mainWin.document.getElementById("nav").children[0].children[0].disabled) mainWin.document.getElementById("nav").children[0].children[0].focus();
//HTML5 Changes Start
/*if(mainWin.document.getElementById("nav").children[0].children[0].children.length>0){//BUG 16374733,21623940 
    	if (!mainWin.document.getElementById("nav").children[0].children[0].children[1].disabled) mainWin.document.getElementById("nav").children[0].children[0].children[1].focus();
}*/  	/*BUG 16374733*/
        if (mainWin.document.getElementById("Branch_Menu")) {
            mainWin.document.getElementById("Branch_Menu").focus();
        }//HTML5 Changes End
    } else if (functionId == "COMMON" && mainWin.document.getElementById('BLK_ENTITY_DETAILS__ENTITY_ID')) { //REDWOOD_CHANGES
        if (mainWin.document.getElementById('BLK_ENTITY_DETAILS__ENTITY_ID').value != "") mainWin.chgEntity(mainWin.document.getElementById('BLK_ENTITY_DETAILS__ENTITY_ID').value);
    }
    //SMSStandalone12.3 Changes Ends
    else if (functionId == "SMCHGDEP") {
        if (mainWin.document.getElementById('BLK_DEPT__DEPT_CODE').value != "") mainWin.fnChangeDept(mainWin.document.getElementById('BLK_DEPT__DEPT_CODE').value);
    } else if (functionId == "COMMON" && mainWin.document.getElementById('BLK_MODULE__MODULE_CODE')) {
        if (mainWin.document.getElementById('BLK_MODULE__MODULE_CODE').value != "") mainWin.chgMod(mainWin.document.getElementById('BLK_MODULE__MODULE_CODE').value);
        //mainWin.document.getElementById("nav").children[0].children[0].children[0].focus();//Fix for 21623940 
		//mainWin.document.getElementById("nav").children[0].children[0].focus();//HTML5 Changes 6/OCT/2016 //REDWOOD_CHANGES
    } else {
        parent.lovSrcElem.setAttribute("PREVAUTOLOVVAL", parent.lovSrcElem.value);
        if (!parent.lovSrcElem.disabled && typeof (parent.lovSrcElem.type) != "undefined" && parent.lovSrcElem.type.toUpperCase() != "HIDDEN") {
		/*Bug 16402725 Changes*/
         if (parent.lovSrcElem.type.toUpperCase() == "TEXT" && parent.lovSrcElem.className.toUpperCase() !="HIDDEN")          {
		 
                parent.lovSrcElem.focus();
                    //if (navigator.userAgent.indexOf("MSIE 7.0") >= 0) {
                    if(getBrowser().indexOf("IE") != -1 && getBrowser().indexOf("7") != -1){//ie11 changes
                    
                        parent.lovSrcElem.select();
                    
                }
            }
        }
    }
    parent.isLovOpen = false;
	parent.isAutoLOVOpened = false;//9NT1606_12_4_RETRO_12_3_27041965
    var winDivObj = parent.document.getElementById("ChildWin");
    winDivObj.children[0].src = "";
    parent.document.getElementById("Div_ChildWin").removeChild(winDivObj);
}

//Added Functionality for Maximizing LOV window bug #19619967
function fnMaximizeLov() {
    var  mainScrHeight = mainWin.y / 2;                                         // Fix For 19694812
    var mainScrWidth = mainWin.x / 2;
    if (parent.seqNo) {
        var parentDiv = parent.seqNo;
        mainScrHeight = parseInt(parent.parent.document.getElementById(parentDiv).style.height) - parseInt(document.getElementById("WNDtitlebar").offsetHeight * 2);
        mainScrWidth = parseInt(parent.parent.document.getElementById(parentDiv).style.width) - 10;
    }
    else if (parent.parent.seqNo) {
        mainScrHeight = parseInt(parent.document.getElementById("Div_ChildWin").offsetHeight) - parseInt(document.getElementById("WNDtitlebar").offsetHeight * 2);
        mainScrWidth = parseInt(parent.document.getElementById("Div_ChildWin").offsetWidth) - 10;
    }

    var containerDIV = "ChildWin";
    parent.document.getElementById(containerDIV).style.width = mainScrWidth + "px";
    parent.document.getElementById(containerDIV).children[0].style.width = mainScrWidth + "px";
    parent.document.getElementById(containerDIV).style.height = mainScrHeight + "px";
    parent.document.getElementById(containerDIV).children[0].style.height = mainScrHeight + "px";
    //document.getElementById("DIVScrContainer").style.height = mainScrHeight + "px";
    document.getElementById("DIVScrContainer").style.width = mainScrWidth - 8 + "px";
    document.getElementById("DIVWNDContainer").style.width = mainScrWidth + "px";
    document.getElementById("DIVWNDContainer").style.height = mainScrHeight + "px";
    //var pgHeadObj = document.getElementById("divLovPgHead");
    var pgHeadObj = document.getElementById("LOVPageHead");
    pgHeadObj.style.width = mainScrWidth + "px";
    var fstObj = document.getElementById("LOVPageHead").getElementsByTagName("fieldset");
   // var firstDivObj = fstObj[0].getElementsByTagName("div")[0];
   //firstDivObj.style.width = mainScrWidth / 2 + "px";
    //document.getElementById("TblInnerDiv").style.height = mainScrHeight - parseInt(pgHeadObj.offsetHeight) - parseInt(document.getElementById("WNDtitlebar").offsetHeight * 2) - parseInt(document.getElementById("ALERTTBL").offsetHeight * 2) + "px";
    //document.getElementById("LovDiv").style.height = mainScrHeight - parseInt(fstObj[0].offsetHeight) - parseInt(document.getElementById("WNDtitlebar").offsetHeight * 2) - parseInt(document.getElementById("ALERTTBL").offsetHeight * 2) - parseInt(document.getElementById("LovHeaderDiv").offsetHeight) - parseInt(document.getElementById("LovNavDiv").offsetHeight) + "px";//REDWOOD_CHANGES
    document.getElementById("WNDmaxBTN").style.visibility = 'hidden';
	document.getElementById("LovHeaderDiv").style.width = mainScrWidth + "px"; //9NT1606_12_3_RETRO_12_1_25821364 changes 
}

function fnCloseAlertWin(evnt) {
    if (alertAction == "UNMASK") {
        unmask();
        document.getElementById("goto").focus();
    }
}

/*9NT1399 :: Russia Cluster -Fix*/
function setRadioButtonsData(radioObject, value) {
    //fix for 16182798 starts
    //var radioObjects = parent.document.getElementsbyName(radioObject.name);
    var radioObjects =  parent.document.getElementById(radioObject.id).parentNode.parentNode.getElementsByTagName("INPUT");
	//fix for 16182798 ends
    for (var index = 0; index < radioObjects.length; index++) {
		//fix for bug: 19224439 starts
		if(value == null || value == "")
			radioObjects[index].checked = false;
		//fix for bug: 19224439 ends
        if (value == radioObjects[index].value) {
            radioObjects[index].checked = true;
            break;
        }
    }
    }
/*9NT1399 :: Russia Cluster -Fix*/

function fnHandleLovTh(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var l_TableObj = document.getElementById("TableLov").tBodies[0].rows[0].cells[0];
    if (evnt.shiftKey && evnt.keyCode == 9) {
        var ele = document.getElementById("LovNavDiv").children;//Fix for 21627033
        for (var i = 0; i < ele.length; i++) {
            if (!ele[i].disabled && ele[i].tagName.toUpperCase() != "LABEL") ele[i].focus();
        }
        preventpropagate(evnt);
        return false;
    }
    if (evnt.keyCode == 9) {
        if (getInnerText(l_TableObj) != "") l_TableObj.children[0].children[0].focus();//Fix for 21627033
        preventpropagate(evnt);
        return false;
    } else if (evnt.keyCode == 37) {
//Fix for 21627033
        if (getToolBarPreviousSibling(srcElement.parentNode.parentNode) != null && getToolBarPreviousSibling(srcElement.parentNode.parentNode).children[0].children[0]!=null) {
            getToolBarPreviousSibling(srcElement.parentNode.parentNode).children[0].children[0].focus();
            preventpropagate(evnt);
            return false;
        }
    } else if (evnt.keyCode == 39) {
//Fix for 21627033
        if (getToolBarNextSibling(srcElement.parentNode.parentNode) != null && getToolBarNextSibling(srcElement.parentNode.parentNode).children[0].children[0]!=null) {
            getToolBarNextSibling(srcElement.parentNode.parentNode).children[0].children[0].focus();        
            preventpropagate(evnt);
            return false;
        }
    } else if (evnt.keyCode == 40) {
        return false;
    }
}

function fnHandleLovRslt(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var l_TableObj = getTableObjForBlock("TableLov").tBodies[0].rows;  //REDWOOD_CHANGES
    if (evnt.shiftKey && evnt.keyCode == 9) {
        document.getElementById("TableLovHeader").tBodies[0].rows[0].cells[0].children[0].children[0].focus(); //static header change
        preventpropagate(evnt);
        return false;
    }
    if(evnt.ctrlKey && (evnt.keyCode == 80 || evnt.keyCode == 67 || evnt.keyCode == 88) && parent.restrictReqd == 'Y'){//jc2 changes begin //PIPA
        try {
            evnt.keyCode = 0;
        }
        catch (ex) {
        }
        preventpropagate(evnt);
        fnDisableBrowserKey(evnt);
        return false;
    }//jc2 changes end //PIPA
    if (evnt.keyCode == 9) {
        document.getElementById("WNDbuttons").focus();
        preventpropagate(evnt);
        return false;
    } else if (evnt.keyCode == 40) {
        for (var i = 0; i < l_TableObj.length; i++) {
            var tblCells = l_TableObj[i].cells;
            for (var j = 0; j < tblCells.length; j++) {
//Fix for 21627033
                if (tblCells[j].children[0].children[0] == srcElement) {
                    if (l_TableObj[i + 1] != undefined) l_TableObj[i + 1].cells[j].children[0].children[0].focus();
                    preventpropagate(evnt);
                    return false;
                }
            }
        }
    } else if (evnt.keyCode == 38) {
        for (var i = 0; i < l_TableObj.length; i++) {
            var tblCells = l_TableObj[i].cells;
            for (var j = 0; j < tblCells.length; j++) {
//Fix for 21627033
                if (tblCells[j].children[0].children[0] == srcElement) {
                    if (l_TableObj[i - 1] != undefined) {
                        l_TableObj[i - 1].cells[j].children[0].children[0].focus();
                        preventpropagate(evnt);
                        return false;
                    }
                }
            }
        }
    } else if (evnt.keyCode == 39) {
        activeElement = document.activeElement;
//Fix for 21627033
        if (getNextSibling(activeElement.parentNode.parentNode) != null && getNextSibling(activeElement.parentNode.parentNode).children[0].children[0]) {
            getNextSibling(activeElement.parentNode.parentNode).children[0].children[0].focus();
            preventpropagate(evnt);
            return false;
        }
    } else if (evnt.keyCode == 37) {
        activeElement = document.activeElement;
//Fix for 21627033
        if (getPreviousSibling(activeElement.parentNode.parentNode) != null && getPreviousSibling(activeElement.parentNode.parentNode).children[0].children[0]) {
            getPreviousSibling(activeElement.parentNode.parentNode).children[0].children[0].focus();
            preventpropagate(evnt);
            return false;
        }
    }
}

function fnHandleLovBtn(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var l_TableObj = document.getElementById("TableLov").tBodies[0].rows[0].cells[0];
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (evnt.shiftKey && evnt.keyCode == 9) {
        if (getInnerText(l_TableObj) != "") l_TableObj.children[0].focus();
        else document.getElementById("TableLovHeader").tBodies[0].rows[0].cells[0].children[0].children[0] .focus(); //static header change
        preventpropagate(evnt);
        return false;
    }
}

//Reduction fld postion change start
function getReductionFldPosition(){
    var lovParentFldID= blockId + "__" + fldName;
    var fldNameIndex = 0;
    var lovInfoArr =  parent.lovInfoFlds[lovParentFldID + "__" + lovId][0].split("~");
    for(var cnt = 0; cnt < lovInfoArr.length; cnt++){
        if(lovParentFldID == lovInfoArr[cnt]){
            fldNameIndex = cnt;
            break;
        }
    }
    var reductionFldArr = reductionList.split("|");
    var reductionfldCnt = 0;
    for(var cnt = 0; cnt <= fldNameIndex; cnt++){
        if(reductionFldArr[cnt] == 'Y')
        {
            reductionfldCnt++;
        }
    }
    return reductionfldCnt ;
}
//Reduction fld postion change end
function parseLovOnLoad() {
    try {
        var t = getDateObject();
        var startjsTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
                /*Fix for 16861079*/
       var reductionFldIndex =  getReductionFldPosition(); //Reduction fld postion change
       
	if(document.getElementById(reductionFldIndex+"I")){ //Reduction fld postion change start
          document.getElementById(reductionFldIndex+"1").value =  "";
          document.getElementById(reductionFldIndex+"I").value = "";
        }else{
        document.getElementById(reductionFldIndex).value = redValue + "%"; //Reduction fld postion change end
		}
		/*Fix for 16861079*/
    } catch (e) {}
	if(parent.gFromSummary && typeof(reductionFldIndex) == 'undefined') document.getElementById(1).value = redValue + "%"; //BUG#36159036_36037414
	//Bug 14836553 Changes Starts 
    if(offlineLov=='Y'){
      getLovResults();
      return;
    }
    //Bug 14836553 Changes Ends
    if (pageCount == 0) setInnerText(document.getElementById("TotPgCnt"), 1);
    else setInnerText(document.getElementById("TotPgCnt"), pageCount);
    setInnerText(document.getElementById("CurPage"), 1);
    enableButtons();
    try {
        parseLOVResponseXML(lovResult);
    } catch (e) {
       // setInnerText(document.getElementById("ALERTTBL").tHead.rows[0].cells[1].children[0], mainWin.getItemDesc("LBL_ERROR")); //REDWOOD_CHANGES
     //   document.getElementById("ALERTTBL").tHead.rows[0].cells[0].children[0].className = "LovErrorAlert"; //Data Uri change	  //REDWOOD_CHANGES
    }
    /*var dbtime = 0;
    var servertime = clientHandlerExit - clientHandlerEntry;
    t = getDateObject();
    jsEndTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    var jstime = parseFloat(parseFloat(jsEndTime)-parseFloat(startjsTime)) ; 
    totaltime = parseFloat(parseFloat(t.getTime())-parseFloat(inLoadTime)) ;
    totaltime = parseFloat(parseFloat(t.getTime())-parseFloat(inLoadTime)) ;
    startDate = new Date(parseFloat(inLoadTime));
    startTime = startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate()+" "+startDate.getHours()+':'+startDate.getMinutes()+':'+startDate.getSeconds();
    endTime = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()+" "+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
    jstime = Math.round(jstime*100)/100;
    var seqno = seqList.split('~')[1];
    var actionseqNo = seqList.split('~')[2];
    
        //fnPostActionLog(jstime,dbtime,servertime,startTime, endTime, totaltime,"","","",seqNo,"",mainWin.SignonSerial,seqNo,"LOAD"); 
        if(typeof(actionseqNo) != 'undefined')
            fnPopulateTimes(mainWin.SignonSerial,seqno,actionseqNo,jstime,dbtime,servertime,startTime,endTime,totaltime);
            */

}

function dispCalendar(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if (evnt.keyCode == 115) parent.fireHTMLEvent(getNextSibling(srcElement), "onclick");   
    //Bug 16975272 Changes Starts
    if (evnt.keyCode == 8) {
        if (srcElement.tagName.toUpperCase() == 'INPUT') {
            return true;
        } else {
            fnDisableBrowserKey(evnt);
            preventpropagate(evnt);
            try {
                evnt.keyCode = 0;
            } catch (e) {}
            return false;
        }
    }else {
        return disableCommonKeys(evnt);
    }
    //Bug 16975272 Changes Ends
}

//Static Header change
function fnSyncLovTableWidth(){
  var headerTable = document.getElementById("TableLovHeader");
				var dataTable = document.getElementById("TableLov");
				headerTable.parentNode.style.width = dataTable.parentNode.clientWidth + "px";
        headerTable.parentNode.parentNode.style.width = dataTable.parentNode.offsetWidth + "px";
				for(i=0;i<headerTable.tBodies[0].rows[0].cells.length-1;i++){
        headerTable.tBodies[0].rows[0].cells[i].children[0].style.width = "auto";
        dataTable.tBodies[0].rows[0].cells[i].children[0].style.width = "auto";
				var w = Math.max(headerTable.tBodies[0].rows[0].cells[i].children[0].offsetWidth,dataTable.tBodies[0].rows[0].cells[i].children[0].offsetWidth);
				 headerTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w  + "px";
				 dataTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w  + "px";
				}
}

function fnSyncLovScroll(scrollDiv){
				 var divElem = getPreviousSibling(scrollDiv).children[0];
				 divElem.scrollLeft = scrollDiv.scrollLeft;
				}
        

 // LOV index field change start 
function displayMiniCharInfo(){
	 if((parent.lovInfoFlds != "undefined") && (typeof(parent.lovInfoFlds[blockId + "__" + fldName + "__" + lovId]) != "undefined") &&
    (typeof(parent.lovInfoFlds[blockId + "__" + fldName + "__" + lovId][2]) != "undefined") && (parent.lovInfoFlds[blockId + "__" + fldName + "__" + lovId][2].indexOf("Y") != -1)){
    var indexfldNames = parent.lovInfoFlds[blockId +"__"+fldName+"__"+lovId][2];
    if(indexfldNames != undefined){
    var indexfldNamesArr = indexfldNames.split("~");
    var indexFldcnt = 0;
    var indexFldInfo = "";
    for(var cnt = 0; cnt <indexfldNamesArr.length ; cnt++){
    var isIndexFld = indexfldNamesArr[cnt].split("!")[0];
    var indexFldCharAllowed = indexfldNamesArr[cnt].split("!")[1];
    if(isIndexFld == "Y"){    
       var curfieldLabel = document.getElementById(cnt+1).parentNode.getElementsByTagName("OJ-LABEL")[0].innerHTML; //REDWOOD_CHANGES
       if(indexFldcnt > 0) indexFldInfo += " || "
        indexFldInfo +=  curfieldLabel + "( " + indexFldCharAllowed + " )" ;    
         indexFldcnt++;
    }
    
    }
    if(indexFldcnt > 0){
       document.getElementById("charInfo").innerHTML = indexFldInfo;
   //     document.getElementById("LOVCharInfo").style.display = "block";  //REDWOOD_CHANGES
        document.getElementById("divLovPgHead").style.display = "block";  //redwood_37246478
   
    }
    
    }
    }
}
 //REDWOOD_CHANGES
function isNullOrWhitespace( input ) {
    if (typeof input === 'undefined' || input == null) return true;
    return input.replace(/\s/g, '').length < 1;
}
//OJET Migration
function getRawDataProvider(lovResultArray) {
    var tempArray = [];
    if (fieldList && fieldList.length > 0) {
        fieldListArray= fieldList.split('|');
        for(var i=0;i<lovResultArray.length;i++) { 
                    var t={}; 
                         
            for(var j=0;j<lovResultArray[i].length;j++) {                
                t[fieldListArray[j]] = lovResultArray[i][j]; 
                    }                    
            tempArray.push(t);
        }
    }    
    return tempArray;
}

function getUniqueArray(arr) {
    return arr.filter((thing, index) => {
      var _thing = JSON.stringify(thing);
      return index === arr.findIndex(obj => {
        return JSON.stringify(obj) === _thing;
      });
    });
}
   //REDWOOD_CHANGES
        
        // LOV index field change end  
        

