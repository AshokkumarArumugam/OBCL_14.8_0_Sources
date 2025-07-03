/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2015, Oracle and/or its affiliates.
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
**  Date of creation   : 
**  File Name          : OLCTRUDF_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   	:  
**  Last modified on   	: 
**  Full Version       	: 
**  Reason             	:  
**
** Changed By         : Ravi Ranjan
** Change Description : Udf Changes based on new maintenance

** Changed By         : Ashokkumar Arumugam
** Change Description : LOV BUTTON IN UDF CALL FORM IS NOT WORKING OLDTRONL/LBDTRONL
** SFR Number		  : 27043643  

** Changed By         : Shishirkumar Aithal
** Change Description : Udf Changes based on new maintenance
** SFR Number		  : Bug#26265595 
** Date               : 15-Dec-2017

** Changed By         : Shishirkumar Aithal
** Change Description : Udf Changes based on new maintenance
** SFR Number		  : 26541376
** Date               : 22-Dec-2017 

** Changed By         : Shishirkumar Aithal
** Change Description : Added code to disable screen for OLDVAMND
** SFR Number		  : ofcl_12.3_Support_27335728
** Date               : 01-Feb-2018  

** Changed By         : Siddharth S
** Change Description : Support cube entity while using tab in keyboard instead of clicking
** SFR Number		   : Bug#27756812

** Changed By         : Satheesh Seshan
** Change Description : Added code to comment UDF disable screen for OLDVAMND
** SFR Number		  : Bug#34454500 
** Date               : 08-Sep-2022  

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 07-Mar-2023
**  Reason             : REDWOOD_ADOPTION changes
**  Search String      : Bug#34958820

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 22-May-2024
**  Reason             : Redwood UDF DESIGN changes - visibility changes 
**  Search String      : Bug#36630898 

** Changed By         : Abhik Das
** Change Description : Added code to enable UDF during rollover
** SFR Number		  : OBCL_14.7_TFB_Bug#37253327_Changes
** Date               : 03-Dec-2024
****************************************************************************************************************************/
function  fnPreDispLov_LOV_UDF_KERNEL(lovSrcElem)
{
	//var UdfTable1 = document.getElementById("BLK_TXN_UDF_DETAILS");  //Bug#34958820
	var UdfTable1 = getTableObjForBlock("BLK_TXN_UDF_DETAILS");        //Bug#34958820
    var UdfRows1 = UdfTable1.tBodies[0].rows;
	len1 = UdfRows1.length;
//Bug#27756812 starts 
//	for (i = 0; i < len1; i++) {
//		if (UdfRows1[i].cells[0].getElementsByTagName("oj-input-text")[0]) {
//			if (UdfRows1[i].cells[0].getElementsByTagName("oj-input-text")[0].value) { 
//			 /* 26265595 Changes Starts */
//				//if (UdfRows1[i].cells[3].getElementsByTagName("oj-input-text")[0].value == 'C'){
//			    if (UdfRows1[i].cells[6].getElementsByTagName("oj-input-text")[0].value == 'C'){
//			    /* 26265595 Changes Ends */
//					lovScreenArgs["CUBE_ENTITY"] = true;
//				}
//			}
//		}
//	}
    var evnt = window.event || e;
	try{
		if (UdfRows1[getRowIndex(evnt)-1].cells[0].getElementsByTagName("INPUT")[0]) {
			 if (UdfRows1[getRowIndex(evnt)-1].cells[6].getElementsByTagName("oj-input-text")[0].value == 'C'){
					lovScreenArgs["CUBE_ENTITY"] = true;
			 }
		}
	}catch(e){}
//Bug#27756812 ends 
  return true;
}
function fnPostLoad_CVS_UDF_KERNEL(screenArgs){
setTimeout(function(){ 
    var l_Num_Value = "";
	var l_Date_Value = "";
	if (gAction != '') {
		//var UdfTable1 = document.getElementById("BLK_TXN_UDF_DETAILS"); //Bug#34958820
		var UdfTable1 = getTableObjForBlock("BLK_TXN_UDF_DETAILS");        //Bug#34958820
		var UdfRows1 = UdfTable1.tBodies[0].rows;  
		for(var nodeIndex = 0; nodeIndex <  UdfRows1.length; nodeIndex++) {
			//UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].nextSibling.style.visibility="hidden";
              UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].getElementsByTagName("oj-button")[0].style.visibility="hidden"; //Bug#36630898 changes 
			if (UdfRows1[nodeIndex].cells[7].getElementsByTagName("oj-input-text")[0].value == "V" || UdfRows1[nodeIndex].cells[6].getElementsByTagName("oj-input-text")[0].value == "C"){
            //Bug#36630898 changes starts
				//UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].nextSibling.style.visibility="";
                  UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].getElementsByTagName("oj-button")[0].style.visibility=""; //Bug#36630898 changes 			
}
            //Commenting the below piece of code as date and number fields are moved to different blocks 
			/*else if (UdfRows1[nodeIndex].cells[6].getElementsByTagName("oj-input-text")[0].value == "N"){
				l_Num_Value = UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].value;
				if(nodeIndex==0){
					UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].outerHTML = '<label class="LBLinv" for="FLDVAL"></label><input onpropertychange="displayFormattedNumber(this)" id="BLK_TXN_UDF_DETAILS__FLDVAL" aria-required="false" name="FLDVAL" value="'+l_Num_Value+'" type="HIDDEN" REQUIRED="" LABEL_VALUE="Value" DBC="FLDVAL" DBT="BLK_TXN_UDF_DETAILS"><label class="LBLinv" for="FLDVALI"></label><input onblur="validateInputNumber(this, event);" id="BLK_TXN_UDF_DETAILS__FLDVALI" class="TXTstd numeric" title="Value" value="'+l_Num_Value+'" name="FLDVALI" size="60" type="text" viewMode="Y" MAXLENGTH1="22"  MIN_VAL="0">';
					//27043643 Removed MAX_DECIMALS="0" //Bug26541376
				}else{
					UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].outerHTML = '<label class="LBLinv" for="FLDVAL"></label><input onpropertychange="displayFormattedNumber(this)" id="BLK_TXN_UDF_DETAILS__FLDVAL'+nodeIndex+'" aria-required="false" name="FLDVAL" value="'+l_Num_Value+'" type="HIDDEN" REQUIRED="" LABEL_VALUE="Value" DBC="FLDVAL" DBT="BLK_TXN_UDF_DETAILS"><label class="LBLinv" for="FLDVALI'+nodeIndex+'"></label><input onblur="validateInputNumber(this, event);" id="BLK_TXN_UDF_DETAILS__FLDVALI'+nodeIndex+'" class="TXTstd numeric" title="Value" value="'+l_Num_Value+'" name="FLDVALI" size="60" type="text" viewMode="Y" MAXLENGTH1="22"  MIN_VAL="0">';
					//27043643 Removed MAX_DECIMALS="0" //Bug26541376
				}
			    fnDisableElement(UdfRows1[nodeIndex].cells[12].getElementsByTagName("oj-input-text")[0]);
			}
			else if (UdfRows1[nodeIndex].cells[6].getElementsByTagName("oj-input-text")[0].value == "D"){
				l_Date_Value = UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].value;
				if(nodeIndex==0){
					UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].outerHTML = '<input onpropertychange="displayDate(this)" id="BLK_TXN_UDF_DETAILS__FLDVAL" aria-required="false" name="FLDVAL" type="HIDDEN" REQUIRED="" value="'+l_Date_Value+'" DBC="FLDVAL" DBT="BLK_TXN_UDF_DETAILS" LABEL_VALUE="Date" data_type="DATE"><label class="LBLinv" for="FLDVALI"></label><input onblur="validateInputDate(\'FLDVAL\', event)" placeholder="YYYY-MM-DD" id="BLK_TXN_UDF_DETAILS__FLDVALI"  value="'+l_Date_Value+'" class="TXTstd" title="Date" tabIndex="0" name="FLDVALI" maxLength="11" size="60" type="TEXT"><button class="BTNimg" title="Calendar" tabIndex="0" onclick="disp_cal(\'FLDVAL\', event)" type="button" oldClassName="BTNimg"><span class="ICOcalendar" tabIndex="-1"><span class="LBLinv">Calendar</span></span></button>';	
				}
				else{
					UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].outerHTML = '<input onpropertychange="displayDate(this)" id="BLK_TXN_UDF_DETAILS__FLDVAL'+nodeIndex+'" aria-required="false" name="FLDVAL" type="HIDDEN" REQUIRED="" value="'+l_Date_Value+'" DBC="FLDVAL" DBT="BLK_TXN_UDF_DETAILS" LABEL_VALUE="Date" data_type="DATE"><label class="LBLinv" for="FLDVALI'+nodeIndex+'"></label><input onblur="validateInputDate(\'FLDVAL\', event)" placeholder="YYYY-MM-DD" id="BLK_TXN_UDF_DETAILS__FLDVALI'+nodeIndex+'"  value="'+l_Date_Value+'" class="TXTstd" title="Date" tabIndex="0" name="FLDVALI" maxLength="11" size="60" type="TEXT"><button class="BTNimg" title="Calendar" tabIndex="0" onclick="disp_cal(\'FLDVAL\', event)" type="button" oldClassName="BTNimg"><span class="ICOcalendar" tabIndex="-1"><span class="LBLinv">Calendar</span></span></button>';	
				}
			    fnDisableElement(UdfRows1[nodeIndex].cells[12].getElementsByTagName("oj-input-text")[0]);
			}*/
                        //Bug#36630898 changes ends 
			else {
                                	
				UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].setAttribute("onchange",'');
				fnDisableElement(UdfRows1[nodeIndex].cells[12].getElementsByTagName("oj-input-text")[0]);
			}
		}
	}
	//Bug#34454500 Start
	//if(parent.functionId=="OLDVAMND"){	 //ofcl_12.3_Support_27335728 
	//	disableForm();	 //ofcl_12.3_Support_27335728 
	//}
	//Bug#34454500 End
	
	//OBCL_14.7_TFB_Bug#37253327_Changes Starts
	if(parent.functionId=="OLDTRONL" && gAction=="ROLLOVER"){ 
		enableForm();
	}
	//OBCL_14.7_TFB_Bug#37253327_Changes Ends

    //Bug#36630898 changes
    document.getElementById("cmdAddRow_BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_DATE").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_DATE").style.visibility = 'hidden';
    document.getElementById("cmdAddRow_BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_NUM").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_NUM").style.visibility = 'hidden';
    //Bug#36630898 changes ends 


},500);
	return true;
}
function fnPostNavigate_BLK_TXN_UDF_DETAILS_KERNEL(screenArgs){
    var l_Num_Value = "";
	var l_Date_Value = "";
	if (gAction != '') {
		//var UdfTable1 = document.getElementById("BLK_TXN_UDF_DETAILS"); //Bug#34958820
		var UdfTable1 = getTableObjForBlock("BLK_TXN_UDF_DETAILS"); //Bug#34958820
		var UdfRows1 = UdfTable1.tBodies[0].rows;  
		for(var nodeIndex = 0; nodeIndex <  UdfRows1.length; nodeIndex++) {
			//UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].nextSibling.style.visibility="hidden";
            UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].getElementsByTagName("oj-button")[0].style.visibility="hidden"; //Bug#36630898 changes 

			if (UdfRows1[nodeIndex].cells[7].getElementsByTagName("oj-input-text")[0].value == "V" || UdfRows1[nodeIndex].cells[6].getElementsByTagName("oj-input-text")[0].value == "C"){
			//Bug#36630898 changes starts
				//UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].nextSibling.style.visibility="";
				UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].getElementsByTagName("oj-button")[0].style.visibility=""; //Bug#36630898 changes 			
			}
			//Commenting the below piece of code as date and number fields are moved to different blocks 
			/*
			else if (UdfRows1[nodeIndex].cells[6].getElementsByTagName("oj-input-text")[0].value == "N"){
				l_Num_Value = UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].value;
				if(nodeIndex==0){
					UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].outerHTML = '<label class="LBLinv" for="FLDVAL"></label><input onpropertychange="displayFormattedNumber(this)" id="BLK_TXN_UDF_DETAILS__FLDVAL" aria-required="false" name="FLDVAL" value="'+l_Num_Value+'" type="HIDDEN" REQUIRED="" LABEL_VALUE="Value" DBC="FLDVAL" DBT="BLK_TXN_UDF_DETAILS"><label class="LBLinv" for="FLDVALI"></label><input onblur="validateInputNumber(this, event);" id="BLK_TXN_UDF_DETAILS__FLDVALI" class="TXTstd numeric" title="Value" value="'+l_Num_Value+'" name="FLDVALI" size="60" type="text" viewMode="Y" MAXLENGTH1="22"  MIN_VAL="0">';
					//27043643 Removed MAX_DECIMALS="0" //Bug26541376
				}else{
					UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].outerHTML = '<label class="LBLinv" for="FLDVAL"></label><input onpropertychange="displayFormattedNumber(this)" id="BLK_TXN_UDF_DETAILS__FLDVAL'+nodeIndex+'" aria-required="false" name="FLDVAL" value="'+l_Num_Value+'" type="HIDDEN" REQUIRED="" LABEL_VALUE="Value" DBC="FLDVAL" DBT="BLK_TXN_UDF_DETAILS"><label class="LBLinv" for="FLDVALI'+nodeIndex+'"></label><input onblur="validateInputNumber(this, event);" id="BLK_TXN_UDF_DETAILS__FLDVALI'+nodeIndex+'" class="TXTstd numeric" title="Value" value="'+l_Num_Value+'" name="FLDVALI" size="60" type="text" viewMode="Y" MAXLENGTH1="22"  MIN_VAL="0">';
					//27043643 Removed MAX_DECIMALS="0" //Bug26541376
				}
			    fnDisableElement(UdfRows1[nodeIndex].cells[12].getElementsByTagName("oj-input-text")[0]);
			}
			else if (UdfRows1[nodeIndex].cells[6].getElementsByTagName("oj-input-text")[0].value == "D"){
				l_Date_Value = UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].value;
				if(nodeIndex==0){
					UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].outerHTML = '<input onpropertychange="displayDate(this)" id="BLK_TXN_UDF_DETAILS__FLDVAL" aria-required="false" name="FLDVAL" type="HIDDEN" REQUIRED="" value="'+l_Date_Value+'" DBC="FLDVAL" DBT="BLK_TXN_UDF_DETAILS" LABEL_VALUE="Date" data_type="DATE"><label class="LBLinv" for="FLDVALI"></label><input onblur="validateInputDate(\'FLDVAL\', event)" placeholder="YYYY-MM-DD" id="BLK_TXN_UDF_DETAILS__FLDVALI"  value="'+l_Date_Value+'" class="TXTstd" title="Date" tabIndex="0" name="FLDVALI" maxLength="11" size="60" type="TEXT"><button class="BTNimg" title="Calendar" tabIndex="0" onclick="disp_cal(\'FLDVAL\', event)" type="button" oldClassName="BTNimg"><span class="ICOcalendar" tabIndex="-1"><span class="LBLinv">Calendar</span></span></button>';	
				}
				else{
					UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].outerHTML = '<input onpropertychange="displayDate(this)" id="BLK_TXN_UDF_DETAILS__FLDVAL'+nodeIndex+'" aria-required="false" name="FLDVAL" type="HIDDEN" REQUIRED="" value="'+l_Date_Value+'" DBC="FLDVAL" DBT="BLK_TXN_UDF_DETAILS" LABEL_VALUE="Date" data_type="DATE"><label class="LBLinv" for="FLDVALI'+nodeIndex+'"></label><input onblur="validateInputDate(\'FLDVAL\', event)" placeholder="YYYY-MM-DD" id="BLK_TXN_UDF_DETAILS__FLDVALI'+nodeIndex+'"  value="'+l_Date_Value+'" class="TXTstd" title="Date" tabIndex="0" name="FLDVALI" maxLength="11" size="60" type="TEXT"><button class="BTNimg" title="Calendar" tabIndex="0" onclick="disp_cal(\'FLDVAL\', event)" type="button" oldClassName="BTNimg"><span class="ICOcalendar" tabIndex="-1"><span class="LBLinv">Calendar</span></span></button>';	
				}
			    fnDisableElement(UdfRows1[nodeIndex].cells[12].getElementsByTagName("oj-input-text")[0]);
			}*/
            //Bug#36630898 changes ends 

			else {	
				UdfRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].setAttribute("onchange",'');
				fnDisableElement(UdfRows1[nodeIndex].cells[12].getElementsByTagName("oj-input-text")[0]);
			}
		}
	}
	//Bug#34454500 Start
	//if(parent.functionId=="OLDVAMND"){	 //ofcl_12.3_Support_27335728 
	//	disableForm();	 //ofcl_12.3_Support_27335728 
	//} //ofcl_12.3_Support_27335728
    //Bug#34454500 End 	
    
    //OBCL_14.7_TFB_Bug#37253327_Changes Starts
	if(parent.functionId=="OLDTRONL" && gAction=="ROLLOVER"){
		enableForm(); 
	}
	//OBCL_14.7_TFB_Bug#37253327_Changes Ends

    //Bug#36630898 changes
    document.getElementById("cmdAddRow_BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_DATE").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_DATE").style.visibility = 'hidden';
    document.getElementById("cmdAddRow_BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_NUM").style.visibility = 'hidden';
	document.getElementById("cmdDelRow_BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_NUM").style.visibility = 'hidden';
    //Bug#36630898 changes ends 

	return true;
}