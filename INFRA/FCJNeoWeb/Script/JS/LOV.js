/*----------------------------------------------------------------------------------------------------
**
** File Name    : LOV.js
**
** Module       : FCJNeoWeb
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

Copyright ? 2004-2014  by Oracle Financial Services Software Limited..

 **  Modified By          : Neethu Sreedharan
 **  Modified On          : 07-Oct-2016
 **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                            to user as alert and on click of Ok button on alert window, screen will be 
                            unmasked and user can try the action again.
 **  Retro Source         : 9NT1606_12_0_3_INTERNAL
 **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929

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
**
**  Modified By          : Manoj S
**  Modified On          : 15-Jun-2023
**  Reason               : Redwood Fixes - Focusing the first Text field when Lov screen Launched.
**  Search String        : Redwood_35283152
**
**  Modified By          : Manoj S
**  Modified On          : 14-July-2023
**  Reason               : Redwood Fixes - navigation page number updation and Dropdown value of the lov results maintain.
**  Search String        : REDWOOD_35313042
********************************************************************************************
*/

var ascndg=1;
var parentDivHeight = "";
var onLoadLov = true;
//REDWOOD_CHANGES
var fieldListArray;
var rawDataProvider;
//REDWOOD_CHANGES
function setPages() {
    setInnerText(document.getElementById("TotPgCnt"), 1);
    setInnerText(document.getElementById("CurPage"), 1);
}

function gotoPage(){
    if ((Number(document.getElementById("goto").rawValue) > Number(getInnerText(document.getElementById("TotPgCnt"))))||(Number(document.getElementById("goto").rawValue)<1)){ //REDWOOD_CHANGES
        //alert(mainWin.getItemDesc("LBL_PAGE_NO_BLANK"));//REDWOOD_CHANGES
        document.getElementById("goto").value = Number(getInnerText(document.getElementById("TotPgCnt")));
//REDWOOD_CHANGES
        setInnerText(document.getElementById("CurPage"), Number(document.getElementById("goto").rawValue));
    }else if (isNaN(document.getElementById("goto").rawValue)){
        //alert(mainWin.getItemDesc("LBL_PAGE_NO_BLANK"));	 
//REDWOOD_CHANGES
        document.getElementById("goto").value = Number(getInnerText(document.getElementById("TotPgCnt")));
        setInnerText(document.getElementById("CurPage"), document.getElementById("goto").rawValue); //REDWOOD_CHANGES
    }
    setInnerText(document.getElementById("CurPage"), Number(document.getElementById("goto").rawValue));//REDWOOD_CHANGES
    getLovResults(Number(document.getElementById("goto").value)-1);
}

function string_parser(to_parse, del, str_arr){
    i = 0;
    str = to_parse;
    while ((p1 = str.indexOf(del, 0)) != -1){
        str_arr[i] = str.substr(0, p1);
        str = str.substr(p1 + 1);
        i++;
    }
    if (str != ""){
        str_arr[i] = str;
        i++;
    }
    return i;
}

function getLovResults(Pgs,criteriaColIndex) {    
    //inDate = setActionTime();
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    l_sub_str = new Object();
    var reductionValues = buildReductionCriteria();
    //Index based search changes start
    var indexRequired = "";
    var minIndexLength = "";
    var filedIndexValue = "";
    var reductionValue = "";
    var countIndexField = 0;
    var firstIndexField = 0;
    if(typeof(indexFlds) != "undefined" && indexFlds != "" && indexFlds.indexOf("Y") != -1){
    var indexFieldList= indexFlds.split("~");
    if(reductionValues != ""){     
    var reductionFieldValues= reductionValues.split("|");
    for(var i=0; i<(indexFieldList.length) ;i++){
      reductionValue=reductionFieldValues[i].split("!")[1];
      reductionValue = replaceAll(reductionValue, "_PCT_", "");
      filedIndexValue=indexFieldList[i];
      if(filedIndexValue.indexOf("!") != -1){
        indexRequired=filedIndexValue.split("!")[0];
        minIndexLength=filedIndexValue.split("!")[1];
         if("Y" == indexRequired && firstIndexField == 0){
           firstIndexField=tmpReductionCriteria[0].split("!")[0];
         }
        if("Y" == indexRequired && reductionValue.length < minIndexLength){
          countIndexField++;
        }else  if("Y" == indexRequired && reductionValue.length >= minIndexLength){
        countIndexField = 0;
        break;
        }
      }
    }
    }
    if(countIndexField >0){
      focusReqd = false;
      focusField = document.getElementById(firstIndexField);
      alert(parent.mainWin.getItemDesc("LBL_INDEX_ALERT"));
      document.getElementById(firstIndexField).value = "%";      
      return false;
    }
    }
//Index based search changes end
    onLoadLov = false;
    var serverURL  ="lovfetchdata?";
    //serverURL += "Query="+ Query;
/* security fixes for WF starts */
        serverURL += "&Datatypes="+replaceTilde(Datatypes);
        serverURL += "&Bindvars="+replaceTilde(Bindvars);
/* security fixes for WF ends */
		/*SFR:17439180 :  Fix for 17351640 starts*/
        if (typeof(Bindvars) != "undefined" && Bindvars != null && Bindvars!="") {
          var tempBindvars = Bindvars;
          tempBindvars = replaceAllChar(tempBindvars, "/", "_SLH_");
          tempBindvars = replaceAllChar(tempBindvars, "#", "_HASH_");//fix for 17378652
          tempBindvars = replaceAllChar(tempBindvars, ",", "_COMMA_")//Fix for 19274447
		  //9NT1606_12_4_RETRO_12_0_3_26861671 Starts
		  tempBindvars = replaceAllChar(tempBindvars, "(", "_OPARAN_");
		  tempBindvars = replaceAllChar(tempBindvars, ")", "_CPARAN_");
		  tempBindvars = replaceAllChar(tempBindvars, "+", "_PLUS_");
		  //9NT1606_12_4_RETRO_12_0_3_26861671 Ends
          serverURL += "&Bindvars=" + replaceTilde(tempBindvars);
        }
        else{
          serverURL += "&Bindvars="+replaceTilde(Bindvars);
        }
        /*SFR:17439180 : Fix for 17351640 Ends*/
        serverURL += "&PageSize="+PageSize;
        serverURL += "&selectDB="+selectDB;
        serverURL += "&lovId="+lovId;
        serverURL += "&containerId="+containerId;
        serverURL += "&functionId="+functionId;
        serverURL += "&lovId="+lovId;
        serverURL += "&ascndg="+ascndg;
        serverURL +="&txnBranch="+txnBranch;
        serverURL += "&DEBUGWINDOW=" +mainWin.DebugWindowFlg; //logging changes
        serverURL += "&seqNo=" +getSeqNo(); //logging changes
        if(typeof(Pgs) != 'undefined'){
            serverURL += "&page="+Pgs;
        }
        if(typeof(criteriaColIndex) != 'undefined'){
            serverURL += "&criteriaColIndex="+criteriaColIndex;
        }
        
		/*SFR:17439180 :  Fix for 17351640 starts*/
	    if (typeof(reductionValues) != "undefined" && reductionValues != null && reductionValues!="") {
	      var tempReductionValues = reductionValues;
	      tempReductionValues = replaceAllChar(tempReductionValues, "/", "_SLH_");
	      tempReductionValues = replaceAllChar(tempReductionValues, "#", "_HASH_");//fix for 17378652
              tempReductionValues = replaceAllChar(tempReductionValues, "&", "_AMP_"); //fix for 18312338
              tempReductionValues = replaceAllChar(tempReductionValues, ",", "_COMMA_");//Fix for 19274447
		  //9NT1606_12_4_RETRO_12_0_3_26861671 Starts
		  tempReductionValues = replaceAllChar(tempReductionValues, "(", "_OPARAN_");
		  tempReductionValues = replaceAllChar(tempReductionValues, ")", "_CPARAN_");
		  tempReductionValues = replaceAllChar(tempReductionValues, "+", "_PLUS_");
		  //9NT1606_12_4_RETRO_12_0_3_26861671 Ends
	      serverURL += "&reductionValues=" + tempReductionValues;
	    }
	    else{
	      serverURL += "&reductionValues=" + reductionValues; 
	    }
     	/*SFR:17439180 : Fix for 17351640 Ends*/
    if(reductionValues == ""){
        setInnerText(document.getElementById("TotPgCnt"), 1);
        //setInnerText(document.getElementById("ALERTTBL").tHead.rows[0].cells[1].children[0],mainWin.getItemDesc("LBL_NO_RECORD")); //REDWOOD_CHANGES
    }else{
    try{
    var objHTTP = createHTTPActiveXObject();
	try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", encodeURI(serverURL), false);
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    var t = getDateObject();
    posttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    
    objHTTP.send(null);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start 
     catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    
    t = getDateObject();
    afterposttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    
    var LOVResponseDOM = objHTTP.responseXML;
    mainWin.inactiveTime = 0;
    if(LOVResponseDOM){
       // appendDebug(LOVResponseDOM); //Logging changes
        var intTotPgs = getNodeText(selectSingleNode(LOVResponseDOM, "//TOTALPAGES"));
        ascndg        = Number(getNodeText(selectSingleNode(LOVResponseDOM, "//ASC")));
        if (intTotPgs == 0){
            setInnerText(document.getElementById("TotPgCnt"), 1);
            // setInnerText(document.getElementById("ALERTTBL").tHead.rows[0].cells[1].children[0],mainWin.getItemDesc("LBL_NO_RECORD")); //REDWOOD_CHANGES
        }else{
            setInnerText(document.getElementById("TotPgCnt"), intTotPgs); 
//REDWOOD_CHANGES
            // setInnerText(document.getElementById("ALERTTBL").tHead.rows[0].cells[1].children[0],mainWin.getItemDesc("LBL_MORE_RECORDS"));
            /* if(intTotPgs!="10")
                setInnerText(document.getElementById("ALERTTBL").tHead.rows[0].cells[1].children[0],mainWin.getItemDesc("LBL_OK"));*/
//REDWOOD_CHANGES
        }
        //document.getElementById("ALERTTBL").tHead.rows[0].cells[0].children[0].className = "LovAlert"; //Data Uri change //REDWOOD_CHANGES
        setInnerText(document.getElementById("CurPage"), Number(getInnerText(document.getElementById("CurPage"))));
        enableButtons();
        var lovContent = getXMLString(LOVResponseDOM);
        if(lovContent.indexOf("<FCUBS_RES_ENV><![CDATA[")!= -1) { //debugger;
            lovContent = lovContent.substring(lovContent.indexOf("<FCUBS_RES_ENV><![CDATA[")+24, lovContent.indexOf("]]><TOTALPAGES>"));
        }
        parseLOVResponseXML(lovContent);
        //parseLOVResponseXML(getNodeText(LOVResponseDOM.childNodes[0]));
        //fnpostAction('LOVDATA',LOVResponseDOM);
         document.getElementById("lovqueryCollapsible").expanded = false;  //REDWOOD_CHANGES
    }
    //fnSyncLovTableWidth();//static Header change //REDWOOD_CHANGES
    }catch(e){
       // setInnerText(document.getElementById("ALERTTBL").tHead.rows[0].cells[1].children[0],mainWin.getItemDesc("LBL_ERROR")); //REDWOOD_CHANGES
        //document.getElementById("ALERTTBL").tHead.rows[0].cells[0].children[0].className = "LovErrorAlert"; //Data Uri Changes  //REDWOOD_CHANGES
        
    }
    }
}

function buildReductionCriteria(){
    var valCount = 0;
    var recCount = 0;
    arrReduc = new Object();
    //numReduc = string_parser(forDocReductionCriteria, '~', arrReduc);
    numReduc = string_parser(forDocReductionCriteria, '|', arrReduc); /* security fixes for WF */
    var reductionValues = "";
    for (loopIndex = 0; loopIndex < numReduc; loopIndex++){
        l_sub_numReduc = string_parser(arrReduc[loopIndex], '!', l_sub_str);
        if(typeof(autoRedCtr)!="undefined" && autoRedCtr!="" && autoRedCtr!="null"){
            document.getElementById(l_sub_str[0].toUpperCase()).value=autoRedCtr+"%";
            autoRedCtr = "";
        }
        if (dateLOV[loopIndex]) {
            reductionValues += "TO_DATE(" + l_sub_str[0].toUpperCase() + ",'YYYY-MM-DD')!"+ document.getElementById(l_sub_str[0].toUpperCase()).value;
        } else {
/* security fixes for WF starts*/
                    var str=document.getElementById(l_sub_str[0].toUpperCase()).value;
                    if (typeof(str) != "undefined" && str != null) {
                        if(str.indexOf("%")!=-1)
                        {
                        var re = new RegExp("%", "g");
                        str = str.replace(re, "_PCT_");
                        }
                   }
            //reductionValues += l_sub_str[0].toUpperCase() + '!' + document.getElementById(l_sub_str[0].toUpperCase()).value;
            reductionValues += l_sub_str[0].toUpperCase() + '!' + str;
        }
        if(document.getElementById(l_sub_str[0].toUpperCase()).value == "%"){
            valCount++;
        }
        recCount++;
        if (loopIndex < numReduc - 1){
            //reductionValues += "~";
            reductionValues += "|";
/* security fixes for WF ends*/
        }

    }
    if((valCount == recCount) && onLoadLov && mainWin.lovDataFetch=='N'){
        return "";
    }
    return reductionValues;
}


function parseLOVResponseXML(strLovData){
 //REDWOOD_CHANGES   
    var resValue = strLovData.split("!").filter(val=>val.trim()!== "");
    
    var resValueArr = resValue.map(v=>v.split('~'));
    
    rawDataProvider = getRawDataProvider(resValueArr);
    
    rawDataProvider = getUniqueArray(rawDataProvider);
    dataProvider(new lovDataProvider(rawDataProvider));
}
function parseLOVResponseXML_old(strLovData){	 
//REDWOOD_CHANGES
    //Initially clearing all fields
    for(var i=0;i<10;i++){
        for(var j=0;j<Number(resColCount);j++){
            setInnerText(document.getElementById("TableLov").tBodies[0].rows[i].cells[j].getElementsByTagName("a")[0], '');
        }
    }
    
     var resValue = strLovData.split("!");
     if((resValue.length) == 0){
         setInnerText(document.getElementById("ALERTTBL").tHead.rows[0].cells[1].children[0],mainWin.getItemDesc("LBL_NO_RECORD"));
     }
     for (var i=0;i<resValue.length;i++) {
        if(i==10) break;
        document.getElementById("TableLov").tBodies[0].rows[i].setAttribute("onclick", "returnValToParent(event)");
        var resTD = resValue[i].split("~");
        for (var j=0;j<resTD.length-1;j++) {
            var anchorElem = document.getElementById("TableLov").tBodies[0].rows[i].cells[j].getElementsByTagName("a")[0];
            if(resTD[j].indexOf("&amp;") != -1){
            	resTD[j]=resTD[j].replace("&amp;","&");
            }
            if(resTD[j].indexOf("&apos;") != -1){
            	resTD[j]=resTD[j].replace("&apos;","'");
            }
            if(resTD[j].indexOf("&lt;") != -1){
            	resTD[j]=resTD[j].replace("&lt;","<");
            }
            if(resTD[j].indexOf("&gt;") != -1){
            	resTD[j]=resTD[j].replace("&gt;",">");
            }
			 if (resTD[j].indexOf("_EXCL_") != -1){ //12.0.3 citi_dev fix start
              var re = new RegExp('_EXCL_', "g");
              resTD[j] =  resTD[j].replace(re, "!");
            }
            if (anchorElem.type == "DATE") {
                if(resTD[j] != ""){
                getNextSibling(anchorElem).value = resTD[j];
                var FormatDate = new getFrmtDate(resTD[j], gDateFormatDSO);
                if (FormatDate.isValidDate())
                    resTD[j] = FormatDate.getShortDate();
                }
            }
            var re = new RegExp('&amp;', "g");
            resTD[j] =  resTD[j].replace(re, "&");
            var re1 = new RegExp('&apos;', "g");
            resTD[j] =  resTD[j].replace(re1, "'");
            setInnerText(anchorElem, resTD[j]);
        }
    }
}

function enableAllButtons() {				
//REDWOOD_CHANGES
  /*  document.getElementsByName("navFirst")[0].className = "BTNtext";
    document.getElementsByName("navPrev")[0].className = "BTNtext";
    document.getElementsByName("navNext")[0].className = "BTNtext";
    document.getElementsByName("navLast")[0].className = "BTNtext";*/	  
//REDWOOD_CHANGES
    document.getElementsByName("navFirst")[0].disabled = false;
    document.getElementsByName("navPrev")[0].disabled = false;
    document.getElementsByName("navNext")[0].disabled = false;
    document.getElementsByName("navLast")[0].disabled = false;
    document.getElementById("goto").readOnly = false;	//REDWOOD_CHANGES
}

function disableAllButtons() {	 
//REDWOOD_CHANGES
   /* document.getElementsByName("navFirst")[0].className = "BTNtextD";
    document.getElementsByName("navPrev")[0].className = "BTNtextD";
    document.getElementsByName("navNext")[0].className = "BTNtextD";
    document.getElementsByName("navLast")[0].className = "BTNtextD"; */		
//REDWOOD_CHANGES
    document.getElementsByName("navFirst")[0].disabled = true;
    document.getElementsByName("navPrev")[0].disabled = true;
    document.getElementsByName("navNext")[0].disabled = true;
    document.getElementsByName("navLast")[0].disabled = true;
    document.getElementById("goto").readOnly = false; //REDWOOD_CHANGES
}

function enableButtons() {
    disableAllButtons();
    if (Number(getInnerText(document.getElementById("TotPgCnt"))) > 1) {
        if (Number(getInnerText(document.getElementById("CurPage"))) == Number(getInnerText(document.getElementById("TotPgCnt")))) {
//REDWOOD_CHANGES
           /* document.getElementsByName("navFirst")[0].className = "BTNtext";
            document.getElementsByName("navPrev")[0].className = "BTNtext";
            document.getElementsByName("navNext")[0].className = "BTNtextD";
            document.getElementsByName("navLast")[0].className = "BTNtextD";*/	  
//REDWOOD_CHANGES
            document.getElementsByName("navFirst")[0].disabled = false;
            document.getElementsByName("navPrev")[0].disabled = false;
        } else if (Number(getInnerText(document.getElementById("CurPage"))) == 1) {	
//REDWOOD_CHANGES
           /* document.getElementsByName("navNext")[0].className = "BTNtext";
            document.getElementsByName("navLast")[0].className = "BTNtext";
            document.getElementsByName("navFirst")[0].className = "BTNtextD";
            document.getElementsByName("navPrev")[0].className = "BTNtextD";*/	 
//REDWOOD_CHANGES
            document.getElementsByName("navNext")[0].disabled = false;
            document.getElementsByName("navLast")[0].disabled = false;
        } else {
            enableAllButtons();
        }
        //document.getElementsByName("go")[0].disabled = false; //REDWOOD_CHANGES       
    }
}

function doNavigate (type) {
    switch (type) {
        case gcNAV_FIRST:
            setInnerText(document.getElementById("CurPage"), 1);
            setInnerText(document.getElementById("TotPgCnt"), 0);
			document.getElementById("goto").value = Number(getInnerText(document.getElementById("CurPage")));//REDWOOD_35313042
            getLovResults("first");
            break;
        case gcNAV_PREVIOUS:
            setInnerText(document.getElementById("CurPage"), Number(getInnerText(document.getElementById("CurPage"))) - 1);
            document.getElementById("goto").value = Number(getInnerText(document.getElementById("CurPage")));//REDWOOD_CHANGES
            getLovResults("previous");
            break;
        case gcNAV_NEXT:
            setInnerText(document.getElementById("CurPage"), Number(getInnerText(document.getElementById("CurPage"))) + 1);
            document.getElementById("goto").value = Number(getInnerText(document.getElementById("CurPage"))); //REDWOOD_CHANGES
            getLovResults("next");
            break;
        case gcNAV_LAST:
            setInnerText(document.getElementById("CurPage"), Number(getInnerText(document.getElementById("TotPgCnt"))));
			document.getElementById("goto").value = Number(getInnerText(document.getElementById("CurPage")));  //REDWOOD_35313042
            getLovResults("last");
            break;
        default:
            //alert("Program Error: doNavigate doesn't handle this action");/* FC 11.4 NLS Changes
            showErrorAlerts('IN-HEAR-500');//FC 11.4 NLS Changes
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
    
  //  for (var i = 0; i < field_namesArr.length -1; i++) {
     for (var i = 0; i < field_namesArr.length ; i++) {
        var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
        if (field_namesArr[i].indexOf("__") == -1) fldName = field_namesArr[i];

        if (isME == 'true' && parent.lovBlockObj != null) { //Redwood_35283152
           // var lovBlkObj = parent.lovBlockObj.tBodies[0].rows[parent.recordNum].cells;
            var lovBlkObj = parent.lovBlockObj.tBodies[0].rows[parent.recordNum-1].cells;
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
                    }else if (parent.document.getElementById(field_namesArr[i]).tagName.toUpperCase() == 'OJ-SELECT-SINGLE') {//REDWOOD_35313042 starts
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
					}	//REDWOOD_35313042 ends 
					else{
                        parent.document.getElementById(field_namesArr[i]).value = fieldValuesArr[i];
                    }
                    
                    parent.fireHTMLEvent(parent.document.getElementById(field_namesArr[i]), "onpropertychange", evnt);
              //  }
            } else if (fldName != "" && parent.document.getElementsByName(fldName)) {
                if (parent.document.getElementsByName(fldName).length > 0) {
                
                    if (parent.document.getElementsByName(field_namesArr[i]).length > 0 && getElementsByOjName(field_namesArr[i],parent)[field_names_recNum].tagName.toUpperCase() == 'OJ-SELECT') { //OJET Migration
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
    
    fnExitLov();
    evnt.cancelBubble=true;
}


function returnValToParent_old(evnt) {	
//REDWOOD_CHANGES
    var evnt = window.event || evnt;
    var srcElement = getEventSourceElement(evnt);
    var cnt = 0;
    var selectedRowNum = "";
    if(srcElement.tagName.toUpperCase() == "A")
        selectedRowNum = srcElement.parentNode.parentNode.parentNode.rowIndex;//static header change
    else if(srcElement.tagName.toUpperCase() == "DIV")
        selectedRowNum = srcElement.parentNode.parentNode.rowIndex;//static header change
    else
        selectedRowNum = srcElement.parentNode.rowIndex;
    var field_namesArr = parent.returnFlds.split("~");
    var field_names_recNum = parseInt(parent.recordNum, 10);
    var fieldValuesArr = new Array();
    var selectedRowObj = document.getElementById("TableLov").tBodies[0].rows[selectedRowNum].cells;//static header change
    for (var rowNum=0;rowNum<selectedRowObj.length;rowNum++) {
        if (typeof(selectedRowObj[rowNum].children[0].children[0]) != "undefined" && selectedRowObj[rowNum].children[0].children[0].type == "DATE") //21110362 
            fieldValuesArr[rowNum] = selectedRowObj[rowNum].children[0].children[selectedRowObj[rowNum].children[0].children.length-2].value; //21110362 
        else
            fieldValuesArr[rowNum] = getInnerText(selectedRowObj[rowNum]);
    }
    
    for (var i = 0; i < field_namesArr.length; i++) {
        var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__")+2);
        if (field_namesArr[i].indexOf("__") == -1)
            fldName = field_namesArr[i];

        if(isME == 'true'){
            var lovBlkObj = parent.lovBlockObj.tBodies[0].rows[parent.recordNum].cells;
            for(var j=0; j<lovBlkObj.length; j++){
                    var lovFldObj = "";
                    if(lovBlkObj[j].children.length > 0){
                        if(!lovBlkObj[j].children[1]){
                            //lovFldObj = lovBlkObj[j].children[0].children[0];
							lovFldObj = lovBlkObj[j].children[0].children[1]; //21147471 
                            if(typeof(lovFldObj) == "undefined" || lovFldObj.type == undefined) // Fix for Bug 16834780 - Added a condition lovFldObj.type == undefined
                                lovFldObj = lovBlkObj[j].children[0];  
                        }else{
                            lovFldObj = lovBlkObj[j].children[1];
                        }
                    }
                     if(lovFldObj.name == fldName){
                        lovFldObj.value = fieldValuesArr[i];
                        /* fix for bug 18872769 starts */
                        if (getOuterHTML(lovFldObj).indexOf("onpropertychange") != -1) {
                        parent.fireHTMLEvent(lovFldObj, "onpropertychange", evnt);
                        break;
                        }
                        /* fix for bug 18872769 ends */
                        if (lovFldObj.type.toUpperCase() == 'CHECKBOX') {
                        if (typeof(lovFldObj.getAttribute("ON")) != "undefined") {
                            if (lovFldObj.getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i].toUpperCase() == 'Y') {
                                lovFldObj.checked = true;
                            }else {
                                lovFldObj.checked = false;
                            }
                        }else {
                            if (fieldValuesArr[i] == 'Y') {
                                lovFldObj.checked = true;
                            }else {
                                lovFldObj.checked = false;
                            }
                        }
                    }
                }                        
            }
        } else {
            if (field_namesArr[i] != "" && parent.document.getElementById(field_namesArr[i])) {
                if (parent.document.getElementById(field_namesArr[i]).type.toUpperCase() == 'CHECKBOX') {
                    if (typeof(parent.document.getElementById(field_namesArr[i]).getAttribute("ON")) != "undefined") {
                        if (parent.document.getElementById(field_namesArr[i]).getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i].toUpperCase()  == 'Y') {
                            parent.document.getElementById(field_namesArr[i]).checked = true;
                    }
                    else {
                            parent.document.getElementById(field_namesArr[i]).checked = false;
                    }
                } else {
                    if (fieldValuesArr[i] == 'Y') {
                            parent.document.getElementById(field_namesArr[i]).checked = true;
                    }
                    else {
                            parent.document.getElementById(field_namesArr[i]).checked = false;
                    }
                }
                } else {
                    /* Handle new line characters */
                    var reg = new RegExp('<br/>', "g");
                    fieldValuesArr[i] = fieldValuesArr[i].replace(reg,"\n");                
                    parent.document.getElementById(field_namesArr[i]).value = fieldValuesArr[i];
                    /* fix for bug 18872769 starts */
                    /*if(getOuterHTML(parent.document.getElementById(field_namesArr[i])).indexOf("displayAmount") != -1 || getOuterHTML(parent.document.getElementById(field_namesArr[i])).indexOf("displayFormattedNumber") != -1)
                        getNextSibling(parent.document.getElementById(field_namesArr[i])).value = fieldValuesArr[i];*/
                    parent.fireHTMLEvent(parent.document.getElementById(field_namesArr[i]), "onpropertychange", evnt);
                    /* fix for bug 18872769 ends */
                }
            } else if(fldName != "" && parent.document.getElementsByName(fldName)){
                if (parent.document.getElementsByName(fldName).length > 0) {
                    if (parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].type.toUpperCase() == 'CHECKBOX') {
                        if (typeof(parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("ON")) != "undefined") {
                            if (parent.document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i].toUpperCase() == 'Y') {
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
                        fieldValuesArr[i] = fieldValuesArr[i].replace(reg,"\n");                
                        parent.document.getElementsByName(fldName)[field_names_recNum].value = fieldValuesArr[i];
                        /* fix for bug 18872769 starts */
                        /*if(getOuterHTML(parent.document.getElementsByName(fldName)[field_names_recNum]).indexOf("displayAmount") != -1 || getOuterHTML(parent.document.getElementsByName(fldName)[field_names_recNum]).indexOf("displayFormattedNumber") != -1) {
                            parent.document.getElementsByName(fldName+"I")[field_names_recNum].value = fieldValuesArr[i];
                        }*/
                        parent.fireHTMLEvent(parent.document.getElementsByName(fldName)[field_names_recNum], "onpropertychange", evnt);
                        /* fix for bug 18872769 ends */
                    }
                }
            }
        }
        if(fieldValuesArr[i] == "")
            cnt++;
    }
    fnExitLov();
    evnt.cancelBubble=true;
}

/* functions moved from LOV.js */
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
    
//Redwood_35283152 starts
    setTimeout(function(){
	if (document.getElementById("LOVPageHead").getElementsByTagName("oj-input-text").length > 0) 
		document.getElementById("LOVPageHead").getElementsByTagName("oj-input-text")[0].focus();
	},1000);
//Redwood_35283152 Ends   
   
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

function setHeightsold() { 
//REDWOOD_CHANGES 
    parent.document.getElementById("ChildWin").style.width  = document.getElementById("DIVWNDContainer").offsetWidth+"px";
    parent.document.getElementById("ChildWin").children[0].style.width = document.getElementById("DIVWNDContainer").offsetWidth+"px";
    parent.document.getElementById("ChildWin").style.height  = document.getElementById("DIVWNDContainer").offsetHeight+"px";
    parent.document.getElementById("ChildWin").children[0].style.height = document.getElementById("DIVWNDContainer").offsetHeight+"px";
    
    parent.document.getElementById("ChildWin").style.top = document.getElementById("WNDtitlebar").offsetHeight+"px";
    parent.document.getElementById("ChildWin").style.left = "4px";
        
    if (typeof(parent.showChgBrnLOV) == 'undefined') {
        if(typeof(parent.fromSubScr) == 'undefined' && singleView == 'false') {
            var parentScrID = parent.seqNo;               
            parentDivHeight = parseInt(parent.parent.document.getElementById(parentScrID).clientHeight);
            parentIFrame = parseInt(parent.parent.document.getElementById(parentScrID).children[0].clientHeight);
            parentDIVScrContainer = parseInt(parent.document.getElementById("DIVScrContainer").clientHeight);
            if((parent.parent.document.getElementById(parentScrID).offsetHeight - document.getElementById("WNDtitlebar").offsetHeight) < parent.document.getElementById("ChildWin").offsetHeight){            
                parent.parent.document.getElementById(parentScrID).style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight*2 + "px";
                parent.parent.document.getElementById(parentScrID).children[0].style.height = parent.document.getElementById("ChildWin").children[0].offsetHeight + document.getElementById("WNDtitlebar").offsetHeight*2 + "px";
                parent.document.getElementById("DIVScrContainer").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight*2 + "px";
            }            
        }else{
            parentDivHeight = parent.parent.document.getElementById("ChildWin").clientHeight;
            parentIFrame = parent.parent.document.getElementById("ChildWin").children[0].clientHeight;
            parentDIVScrContainer = parent.document.getElementById("DIVScrContainer").clientHeight;
            if((parent.parent.document.getElementById("ChildWin").offsetHeight - document.getElementById("WNDtitlebar").offsetHeight) < parent.document.getElementById("ChildWin").offsetHeight){            
                parent.parent.document.getElementById("ChildWin").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight*2 + "px";
                parent.parent.document.getElementById("ChildWin").children[0].style.height = parent.document.getElementById("ChildWin").children[0].offsetHeight + document.getElementById("WNDtitlebar").offsetHeight*2 + "px";
                parent.document.getElementById("DIVScrContainer").style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight*2 + "px";
            }
        }
    }
    onLoadLov = false;
    parent.mask();
    var lovWinObj = parent.document.getElementById("Div_ChildWin");
    lovWinObj.focus();
    if(document.getElementById("LOVPageHead").getElementsByTagName("INPUT").length > 0)
        document.getElementById("LOVPageHead").getElementsByTagName("INPUT")[0].focus();
  //Bug 14267164 fix start
    //if(navigator.userAgent.indexOf('MSIE 7.0') !=-1){
    if(getBrowser().indexOf("IE") != -1 && getBrowser().indexOf("7") != -1){//ie11 changes  
      document.getElementById('TblInnerDiv').children[0].style.position = "fixed"
    }
    //Bug 14267164 fix end
}

function fnExitLov() {
    parent.unmask();
    if (parent.document.getElementById("ChildWin") == null) {
        return;
    }
 //REDWOOD_CHANGES   
  /*  if(typeof(parent.fromSubScr) == 'undefined' && singleView == 'false') {
        var parentScrID = parent.seqNo;  
        if(typeof(parentScrID) != 'undefined'){
            if((parentDivHeight - document.getElementById("WNDtitlebar").offsetHeight) < parent.document.getElementById("ChildWin").offsetHeight){
                parent.parent.document.getElementById(parentScrID).style.height = parentDivHeight + "px";
                parent.parent.document.getElementById(parentScrID).children[0].style.height = parentIFrame + "px";
                parent.document.getElementById("DIVScrContainer").style.height = parentDIVScrContainer + "px";
            }
        }
    }else{
        if((parentDivHeight - document.getElementById("WNDtitlebar").offsetHeight)< parent.document.getElementById("ChildWin").offsetHeight){
            parent.parent.document.getElementById("ChildWin").style.height = parentDivHeight + "px";
            parent.parent.document.getElementById("ChildWin").children[0].style.height = parentIFrame + "px";
            parent.document.getElementById("DIVScrContainer").style.height = parentDIVScrContainer + "px";
        }
    }*/	  
//REDWOOD_CHANGES
    
    if(functionId == "SMCHGBRN") {
        if (mainWin.document.getElementById('BLK_BRANCH__BRANCH_CODE').value != "") {
            mainWin.chgBrn(mainWin.document.getElementById('BLK_BRANCH__BRANCH_CODE').value);
        }
    } else if(functionId == "COMMON") {
        if (mainWin.document.getElementById('BLK_MODULE__MODULE_CODE').value != "")
            mainWin.chgMod(mainWin.document.getElementById('BLK_MODULE__MODULE_CODE').value);
        
    } else {
        if(parent.lovSrcElem){
            parent.lovSrcElem.setAttribute("PREVAUTOLOVVAL",parent.lovSrcElem.value);		
            if(!parent.lovSrcElem.disabled && typeof(parent.lovSrcElem.type) != "undefined" && parent.lovSrcElem.type.toUpperCase() != "HIDDEN") {
                if (parent.lovSrcElem.type.toUpperCase() == "TEXT") {
                    parent.lovSrcElem.focus();
                }
            }
	}	
    }
    parent.isLovOpen = false;
	parent.isAutoLOVOpened = false;//9NT1606_12_4_RETRO_12_3_27041965
	parent.returnFlds ="";
    var winDivObj = parent.document.getElementById("ChildWin");
    winDivObj.children[0].src = "";
    parent.document.getElementById("Div_ChildWin").removeChild(winDivObj);
}

function sortSelectedCol(criteriaColIndex){
   
    getLovResults("sort",criteriaColIndex);
}

function fnCloseAlertWin(evnt) {
    unmask();
    document.getElementById("goto").focus();
    return false;
}

function lovAccessKeys(e){
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if(evnt.ctrlKey && (evnt.keyCode == 67 || evnt.keyCode == 88) && parent.restrictReqd == 'Y'){//jc2 changes begin //PIPA
        try {
            evnt.keyCode = 0;
        }
        catch (ex) {
        }
        preventpropagate(evnt);
        fnDisableBrowserKey(evnt);
        return false;
    }
	if(evnt.ctrlKey && (evnt.keyCode == 80 ) && parent.restrictPrint == 'Y'){//jc2 changes begin //PIPA
        try {
            evnt.keyCode = 0;
        }
        catch (ex) {
        }
        preventpropagate(evnt);
        fnDisableBrowserKey(evnt);
        return false;
    }//jc2 changes end//PIPA
    if (evnt.keyCode == 27) {
        fnExitLov();
        return;
    }else if(evnt.keyCode == 8){
        if (srcElement.tagName.toUpperCase() == 'OJ-INPUT-TEXT' || (srcElement.tagName.toUpperCase() == 'INPUT' &&  (srcElement.getAttribute("type") && srcElement.getAttribute("type").toUpperCase()  == 'TEXT') )) { //REDWOOD_CHANGES
            return true;
        }else{
            fnDisableBrowserKey(evnt);
            preventpropagate(evnt);
            try {
                evnt.keyCode = 0;
            } catch(e) {}
            return false;
        }
    }else if(evnt.keyCode == 33){
        if(document.getElementsByName("navPrev")[0].disabled == false)
            doNavigate(gcNAV_PREVIOUS);
    }else if(evnt.keyCode == 34){
        if(document.getElementsByName("navNext")[0].disabled == false)
            doNavigate(gcNAV_NEXT);
    }else if(evnt.keyCode == 35){
        doNavigate(gcNAV_LAST);
    }else if(evnt.keyCode == 36){
        doNavigate(gcNAV_FIRST);
    }else{
        return disableCommonKeys(evnt); 
    }
}

function fnHandleLovTh(e){
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var l_TableObj = document.getElementById("TableLov").tBodies[0].rows[0].cells[0];
    if(evnt.shiftKey && evnt.keyCode == 9){
        var ele = document.getElementById("TblDiv").children;
        for(var i=0; i<ele.length; i++){
            if(!ele[i].disabled && ele[i].tagName.toUpperCase() != "OJ-LABEL") //REDWOOD_CHANGES
                ele[i].focus();
        }
        preventpropagate(evnt);
        return false; 
    }
    if(evnt.keyCode == 9){
        if(getInnerText(l_TableObj) != "")
            l_TableObj.children[0].children[0].focus();//Fix for 21627033
        preventpropagate(evnt);
        return false; 
    }else if(evnt.keyCode == 37){
//Fix for 21627033
        if(getToolBarPreviousSibling(srcElement) != null){
            getToolBarPreviousSibling(srcElement).focus();
            preventpropagate(evnt);
            return false; 
        }
    }else if(evnt.keyCode == 39){
//Fix for 21627033
        if(getToolBarNextSibling(srcElement) != null){
            getToolBarNextSibling(srcElement).focus();
            preventpropagate(evnt);
            return false; 
        }
    }
}

function fnHandleLovRslt(e){
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var l_TableObj = getTableObjForBlock("TableLov").tBodies[0].rows; //REDWOOD_CHANGES
    if(evnt.shiftKey && evnt.keyCode == 9){
        document.getElementById("TableLov").tHead.rows[1].cells[0].children[0].focus();
        preventpropagate(evnt);
        return false; 
    }
    if(evnt.keyCode == 9){
        document.getElementById("WNDbuttons").focus();
        preventpropagate(evnt);
        return false; 
    }else if(evnt.keyCode == 40){
        for(var i=0; i<l_TableObj.length; i++){
            var tblCells = l_TableObj[i].cells;
            for(var j=0; j<tblCells.length; j++){
//Fix for 21627033
                if(tblCells[j].children[0].children[0] == srcElement){
                    if(l_TableObj[i+1] != undefined )
                        l_TableObj[i+1].cells[j].children[0].children[0].focus();
                        preventpropagate(evnt);
                        return false; 
                }
            }
        }
    }else if(evnt.keyCode == 38){
        for(var i=0; i<l_TableObj.length; i++){
            var tblCells = l_TableObj[i].cells;
            for(var j=0; j<tblCells.length; j++){
//Fix for 21627033
                if(tblCells[j].children[0].children[0] == srcElement){
                    if(l_TableObj[i-1] != undefined){
                        l_TableObj[i-1].cells[j].children[0].children[0].focus();
                        preventpropagate(evnt);
                        return false; 
                    }
                }
            }
        }
    }else if(evnt.keyCode == 39){
        activeElement = document.activeElement;
//Fix for 21627033
        if(getNextSibling(activeElement.parentNode.parentNode)!= null && getNextSibling(activeElement.parentNode.parentNode).children[0].children[0]!=null){
            getNextSibling(activeElement.parentNode.parentNode).children[0].children[0].focus();
            preventpropagate(evnt);
            return false; 
        }
    }else if(evnt.keyCode == 37){
        activeElement = document.activeElement;
//Fix for 21627033
        if(getPreviousSibling(activeElement.parentNode.parentNode)!= null && getPreviousSibling(activeElement.parentNode.parentNode).children[0].children[0]!=null){
            getPreviousSibling(activeElement.parentNode.parentNode).children[0].children[0].focus();
            preventpropagate(evnt);
            return false; 
        }
    }
}

function fnHandleLovBtn(e){
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var l_TableObj = document.getElementById("TableLov").tBodies[0].rows[0].cells[0];
    if(evnt.shiftKey && evnt.keyCode == 9){
        if(getInnerText(l_TableObj) != "")
            l_TableObj.children[0].focus();
        else
            document.getElementById("TableLov").tHead.rows[1].cells[0].children[0].focus();
        preventpropagate(evnt);
        return false; 
    }
}

//Static Header change
function fnSyncLovTableWidth(){
  var headerTable = document.getElementById("TableLovHeader");
				var dataTable = document.getElementById("TableLov");
				headerTable.parentNode.style.width = dataTable.parentNode.clientWidth + "px";
        headerTable.parentNode.parentNode.style.width = dataTable.parentNode.offsetWidth + "px";
				for(i=0;i<headerTable.tBodies[0].rows[0].cells.length-1;i++){
				var w = Math.max(headerTable.tBodies[0].rows[0].cells[i].offsetWidth,dataTable.tBodies[0].rows[0].cells[i].offsetWidth);
				 headerTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w - 13 + "px";
				 dataTable.tBodies[0].rows[0].cells[i].children[0].style.width =  w - 13 + "px";
				}
}

function fnSyncLovScroll(scrollDiv){
				 var divElem = getPreviousSibling(scrollDiv).children[0];
				 divElem.scrollLeft = scrollDiv.scrollLeft;
				}
        
        
        
// LOV index field change start 
function displayMiniCharInfo(){
    var indexfldNames = indexFlds;
    if(indexfldNames != undefined && indexfldNames != "" && indexfldNames.indexOf("Y") != -1){
    var indexfldNamesArr = indexfldNames.split("~");
    var indexFldcnt = 0;
    var indexFldInfo = "";
    for(var cnt = 0; cnt <indexfldNamesArr.length ; cnt++){
      var isIndexFld = indexfldNamesArr[cnt].split("!")[0];
      var indexFldCharAllowed = indexfldNamesArr[cnt].split("!")[1];
      if(isIndexFld == "Y"){    
         var curfieldLabel = document.getElementById(tmpReductionCriteria[cnt].split("!")[0]).parentNode.getElementsByTagName("OJ-LABEL")[0].innerHTML; //REDWOOD_CHANGES
         if(indexFldcnt > 0) indexFldInfo += " || "
          indexFldInfo +=  curfieldLabel + "( " + indexFldCharAllowed + " )" ;    
           indexFldcnt++;
      }
    }
    if(indexFldcnt > 0){
       document.getElementById("charInfo").innerHTML = indexFldInfo;   
//REDWOOD_CHANGES
       //document.getElementById("LOVCharInfo").style.display = "block";
    }
    
    }
    }
function isNullOrWhitespace( input ) {
    if (typeof input === 'undefined' || input == null) return true;
    return input.replace(/\s/g, '').length < 1;
}
//OJET Migration
function getRawDataProvider(lovResultArray) {
    var tempArray = [];
    if (templbllist && templbllist.length > 0) {
        fieldListArray= templbllist.split('|');
        for(var i=0;i<lovResultArray.length;i++) { 
                    var t={}; 
                         
            for(var j=0;j<lovResultArray[i].length-1;j++) {                
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
//REDWOOD_CHANGES
    }
        
        // LOV index field change end  