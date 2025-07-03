/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright   2004 - 2013  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
 
**  Written by         : 
**  Date of creation   : 
**  File Name          : STDFCHOL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG

  **  Modified By       : Suneetha C R
  **  Modified On       : 3-Feb-2022
  **  Modified Reason   : Included new JS to support Financial Center changes
  **  SFR Number        : 33800485

**  Modified By            : Monica Srinivasan
**  Modified On            : 30-June-2023
**  Modified Reason        : Modified code to work for Redwood Infra
**  Search String          : FCUBS_14_7_35307157_REDWOOD_Changes	  
  
*/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------
//Global variable used to store the Currency field reference and Year reference
var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes     = "";

var gCLGRef 		= null;
var gYearRef        = null;	
var gWeeklyHol1		= 0;
var gWeeklyHol2		= 6;
//9NT1587_FC_12.0.2_IUT BUGNo 31 starts
/*var gCSSReadOnly	= "TextRO"
var gCSSHoliday		= "TxtHD"*/
//var gCSSReadOnly	= "TXTro numeric";
//var gCSSHoliday		= "TXTro numeric TxtHD";
//9NT1587_FC_12.0.2_IUT BUGNo 31 ends
var gCSSReadOnly = []; //FCUBS_14_7_35307157_REDWOOD_Changes
var gCSSHoliday ="calendarHoliday"; //FCUBS_14_7_35307157_REDWOOD_Changes
var gModified = "viewchanges-modified"; //FCUBS_14_7_35307157_REDWOOD_Changes
var gLblYearOf;

var monthNames	  = new Array(12);
monthNames[0]	    = "JAN";
monthNames[1] 	  = "FEB";
monthNames[2] 	  = "MAR";
monthNames[3] 	  = "APR";
monthNames[4] 	  = "MAY";
monthNames[5] 	  = "JUN";
monthNames[6] 	  = "JUL";
monthNames[7] 	  = "AUG";
monthNames[8] 	  = "SEP";
monthNames[9] 	  = "OCT";
monthNames[10] 	  = "NOV";
monthNames[11] 	  = "DEC";
var gYearVal= "";
var gClearingHouseReference = "";
var curYear;
var gIsUnlock = false;
var isRefresh = false;


function fnPostLoad_KERNEL() {
	debugs("In fnPostLoad", "A");
  
	if (parent.ShowSummary =='TRUE'){
		displayCalendar();
	}
    gYearRef = document.getElementById("BLK_STTMS_FIC_HOL_MASTER__YEAR");
	document.getElementById("TAB_MAIN__SEC_7").style.visibility = "hidden";	//FCUBS_14_7_35307157_REDWOOD_Changes
   setOjetStyles(); //FCUBS_14_7_35307157_REDWOOD_Changes
    displayCalendar(); //FCUBS_14_7_35307157_REDWOOD_Changes  
	setCss(); //FCUBS_14_7_35307157_REDWOOD_Changes
	document.getElementById("dataContainer_BLK_STTMS_FIC_HOLIDAY").style.display="none";
      
   //document.getElementById("BLK_STTM_CLG_HOLIDAY").disabled = true;    
    //document.getElementById("FLDSET__BLK_STTM_CLG_HOLIDAY").style.visibility = 'hidden';
   // fnCalHolHeading();
   // identifyLabelforDay();               // To change the color of labels of weekly holidays   
   return true;//FCUBS_14_7_35307157_REDWOOD_Changes
  }

function fnPostNew_KERNEL(){
	debugs("In fnPostNew", "A");	
  gCLGRef     		= document.getElementById("BLK_STTMS_FIC_HOL_MASTER__FINANCIAL_CENTER");  
  gYearRef          = document.getElementById("BLK_STTMS_FIC_HOL_MASTER__YEAR");
  
   document.getElementById("BLK_STTMS_FIC_HOLIDAY").disabled = true;
   document.getElementById("BLK_STTMS_FIC_HOLIDAY").tabindex = -1;
   
   
    //identifyLabelforDay();               // To change the color of labels of weekly holidays       
    //fnCalHolHeading();
	return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}

function fnPostUnlock_KERNEL(){
	debugs("In fnPostUnlock", "A");  
   gCLGRef     		= document.getElementById("BLK_STTMS_FIC_HOL_MASTER__FINANCIAL_CENTER");      
   gYearRef         = document.getElementById("BLK_STTMS_FIC_HOL_MASTER__YEAR");
   gIsUnlock             = true;
   displayCalendar();
   //fnDisableElement(document.getElementsByName("BUTTON_POP")[0]); Commented for FCUBS_14_7_35307157_REDWOOD_Changes 
   fnDisableElement(getElementsByOjName("BUTTON_POP")[0]); //Added for FCUBS_14_7_35307157_REDWOOD_Changes 
   return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}

function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	displayCalendar();
	return true;
   //identifyLabelforDay();               // To change the color of labels of weekly holidays    
   //fnCalHolHeading();
   return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}

function fnPostCopy_KERNEL(){
	debugs("In fnPostCopy", "A");
	fnPostNew_KERNEL();
	return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}

function fnPostClose_KERNEL() {
	debugs("In fnPostClose", "A");
	displayCalendar();
	return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}

function fnPostReOpen_KERNEL() {
	debugs("In fnPostReOpen", "A");   
	displayCalendar();
	return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}

function fnPostDelete_KERNEL() {
	debugs("In fnPostDelete", "A");
	fnResetStyle();
	return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}
/*
 * Called to perform some neccessary operation before the fnEnterQuery() Action event
 * Specific to the functionid 
 */
function fnPreEnterQuery_KERNEL() {
  var execute = true;
	debugs("In fnPreEnterQuery", "A");
  fnResetStyle();
	return execute;	
	return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}
/*
 * Called to perform some neccessary operation after the fnEnterQuery() Action event
 * Specific to the functionid 
 */
function fnPostEnterQuery_KERNEL() {
	debugs("In fnPostEnterQuery", "A");
	gCLGRef				= document.getElementById("BLK_STTMS_FIC_HOL_MASTER__FINANCIAL_CENTER");
  document.getElementById("BLK_STTMS_FIC_HOL_MASTER__FINANCIAL_CENTER").tabIndex=1;
  document.getElementById("BLK_STTMS_FIC_HOL_MASTER__YEAR").tabIndex=2;
	//fnEnableElement(gYearRef);  
	return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}
function fnPreExecuteQuery_KERNEL() {
  //var execute = true;//FCUBS_14_7_35307157_REDWOOD_Changes
	debugs("In fnPreExecuteQuery", "A");
	displayCalendar();//FCUBS_14_7_35307157_REDWOOD_Changes
	return true;//FCUBS_14_7_35307157_REDWOOD_Changes
	/*
  	var yearVal        = gYearRef.value;
  	execute = fnValidateYear(yearVal);  	
	if (!execute) {
		var msg = buildMessage(gErrCodes);
		alertMessage(msg);
		return false;
	}*/
	//return execute; //FCUBS_14_7_35307157_REDWOOD_Changes
}


function fnPostExecuteQuery_KERNEL(){
	debugs("In fnPostExecuteQuery", "A");
	setTimeout( function () {//FCUBS_14_7_35307157_REDWOOD_Changes
	displayCalendar();  
  document.getElementById("BLK_STTMS_FIC_HOLIDAY").tabindex = -1;
  },0);//FCUBS_14_7_35307157_REDWOOD_Changes
	return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}

/*
 * Called to perform some neccessary operation before the fnSave() Action event and
 * this function has to return a success/failure flag to fnSave function.
 * Specific to the functionid.
 */
function fnPreSave_KERNEL(){
	if(!fnValidate())
        return false;

	debugs("In fnPreSave", "A");	
	var isValid = true;	
  // Do Mandatory validations
	

	// Do basic datatype validations
	
  
  //Do Year Validations 
  var YearVal = document.getElementById("BLK_STTMS_FIC_HOL_MASTER__YEAR").value;
  var ClearingHouseReference= document.getElementById("BLK_STTMS_FIC_HOL_MASTER__FINANCIAL_CENTER").value;
	 gYearVal = YearVal;
     gClearingHouseReference= ClearingHouseReference;
		
	if (!isValid) {
		//Call Functions in Util
		var msg = buildMessage(gErrCodes)
        alertMessage(msg);
		return false;
	}
	return isValid;	
}
/*
 * Called to perform some neccessary operation after the fnSave() Action event
 * Specific to the functionid 
 */
function fnPostSave_KERNEL()
{
	debugs("In fnPostSave", "A");

     /*	document.getElementById("BLK_STTM_CLG_HOL_MASTER__BRANCH_CODE").value= gCLGReference;
	document.getElementById("BLK_STTM_CLG_HOL_MASTER__YEAR").value = gYearRef;*/
	//FCUBS_12.3_ITR1_BUG#24936653 STARTS
	/*
	if (gIsUnlock)
	{
		gAction = 'EXECUTEQUERY';
		fnEnterQuery();
		document.getElementById("BLK_STTMS_FIC_HOL_MASTER__FINANCIAL_CENTER").value= gClearingHouseReference;
		document.getElementById("BLK_STTMS_FIC_HOL_MASTER__YEAR").value = gYearVal;
		fnExecuteQuery(null);
		gAction = '';
	}*/
	//FCUBS_12.3_ITR1_BUG#24936653 ENDS
	displayCalendar();
        //fnCalHolHeading();
		return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}

function fnPostGoToRec_KERNEL() {
	fnResetStyle();
  displayCalendar();
  return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}



// Function to set the lov n date to the value field.
function fnsetLovDate_KERNEL(){                
          var misTable1 = document.getElementById("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL");
          var misRows1 = misTable1.tBodies[0].rows;          
          var rowIndex = 0;
          
           for(var nodeIndex = 0; nodeIndex <  misRows1.length; nodeIndex++) {
             
			 //Commented and Added for FCUBS_14_7_35307157_REDWOOD_Changes start
             //if (misRows1[nodeIndex].cells[6].getElementsByTagName("INPUT")[0].value != "V"){
             //    misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].nextSibling.style.visibility="hidden";
			 if (misRows1[nodeIndex].cells[6].getElementsByTagName("oj-input-text")[0].value != "V"){
				 misRows1[nodeIndex].cells[2].getElementsByTagName("oj-input-text")[0].nextSibling.style.visibility="hidden";			 
            }
            
            //misRows1[nodeIndex].cells[1].getElementsByTagName("INPUT")[0].readOnly = true;
			misRows1[nodeIndex].cells[1].getElementsByTagName("oj-input-text")[0].readOnly = true;
			//FCUBS_14_7_35307157_REDWOOD_Changes End
          }
		  return true;//FCUBS_14_7_35307157_REDWOOD_Changes
    }


/***************************************************
 STDCLHOL function specific functions starts here 
 ***************************************************/ 

/*
 *Returns number of days of a given month 
 *inMonth - Numeric equvalent of Month
 *inYear  - Current Year
 */
function fnGetDays(inMonth,inYear){
 	var noDays	= new Array(12);
 	
	noDays[0]	= 31; // January
 	noDays[1] 	= (fnLeapYear(inYear)) ? 29 : 28; // February
	noDays[2]	= 31; // March
 	noDays[3] 	= 30; // April
 	noDays[4] 	= 31; // May
	noDays[5]	= 30; // June
 	noDays[6] 	= 31; // July
 	noDays[7] 	= 31; // August
	noDays[8] 	= 30; // September
 	noDays[9] 	= 31; // October
 	noDays[10] 	= 30; // November
 	noDays[11] 	= 31; // December

 	// return number of days in the specified month (parameter)
 	return noDays[inMonth];
 }
 
/*
 *Returns the Function names
 */
function fnGetMonthName(inMonth){
  	// return name of specified month (parameter)
  	return monthNames[inMonth];
}

/*
 *Returns numeric equvalent of the given month
 */
function fnGetMonthIndex(monthName){
   	for(var monCnt = 0; monCnt < monthNames.length; monCnt++){
  		if(monthNames[monCnt] == monthName){
		  	return monCnt;
  		}
 	}
  	return -1;
}

/*
 * Function which fills the Calendar values corresponding the year entered 
 * and 
 * Value of gAction
 *///FCUBS_14_7_35307157_REDWOOD_Changes Starts
  function addNewCalenderMonth(year){
	var strCell   = "";
    var row       = 0;
    var col          = 0;
    var currObj   = null;
    var monthName = "";
    var noDays    = 0;
    var firstDay  = 0;
    var firstDayInstance = null;
    var monthList = "";
    var isValid   = true;
    var tabIndex = 1;
	var inYear = parseInt(year);
	for(let monthCnt = 0; monthCnt<12; monthCnt++)
                {
           firstDayInstance = new Date(inYear, monthCnt, 1);
        monthName = fnGetMonthName(monthCnt);
        noDays = fnGetDays(monthCnt, inYear);
        firstDay = firstDayInstance.getDay();
        col = firstDay;
        row = 0;
        monthList = "";
        for (var dayCnt = 1; dayCnt <= noDays; dayCnt++) {
            strCell = monthName + "_" + row + "_" + col; 
            currObj = eval("getElementsByOjName('" + strCell + "')[0]");						
            currObj.value = "";
            currObj.classList.add(...gCSSReadOnly);												
            currObj.value = dayCnt;
            currObj.tabIndex = tabIndex;          
            addEvent(currObj, "onkeydown", "fnToggleFromKey(this,event)");
            tabIndex++;
            if(col == gWeeklyHol1 || col == gWeeklyHol2){
                currObj.classList.add(gCSSHoliday);												
                currObj.classList.remove(gModified);											
                currObj.classList.add("numeric");												
                monthList += "H";
            }
         
            else if (col == gWeeklyHol2) {
                
                currObj.classList.remove(gCSSHoliday);											
                currObj.classList.add(gModified);												
                currObj.classList.add("numeric");												
                monthList += "H";
                
            }
            
            else {

                monthList += "W";
            }
            if (col == 6) {
                col = 0;
                row = row + 1;
            }
            else {
                col = col + 1;
            }
        }
       
        var rowno = monthCnt;																
        var currRow = getTableObjForBlock("BLK_STTMS_FIC_HOLIDAY").tBodies[0].rows[rowno];	
        currRow.cells[1].getElementsByTagName("OJ-INPUT-TEXT")[0].value =  gCLGRef.value;
        currRow.cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value = year;
        currRow.cells[3].getElementsByTagName("OJ-INPUT-TEXT")[0].value = monthCnt + 1;
        currRow.cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0].value = monthList; 
        //To clear the Existing unchanged values in the calendar
        for (var tempCol = 0; tempCol < firstDay; tempCol++) {
            strCell = monthName + "_0_" + tempCol; 								
          
            currObj = eval("getElementsByOjName('" + strCell + "')[0]");					
            currObj.value = "";																
            currObj.classList.add(...gCSSReadOnly);											
        }
        if (col != 6) {
            col--;
        }
        while (row <= 5) {
            for (var tempCol = col + 1; tempCol < 7; tempCol++) {
                strCell = monthName + "_" + row + "_" + tempCol; //17043238					
               
                currObj = eval("getElementsByOjName('" + strCell + "')[0]"); 				
                currObj.value = "";															
                currObj.classList.add(...gCSSReadOnly);										
            }
            tempCol = 0;
            col = -1;
            row++;
                    }
				}
 }
 //FCUBS_14_7_35307157_REDWOOD_Changes Ends
function displayCalendar()
{
    
    var inYear    = document.getElementById("BLK_STTMS_FIC_HOL_MASTER__YEAR").value;
    var strCell   = "";
    var row       = 0;
    var col       = 0;
    var currObj   = null;
    var monthName = "";
    var noDays    = 0;
    var firstDay  = 0;
    var firstDayInstance = null;
    var monthList = "";
    var isValid   = true;
    var tabIndex  = 1;

    //To populate the calendar only when the year and Currency both are entered.
    if(inYear != "")
    {
	      //9NT1587_FC_12.0.2_IUT BUGNo 31 starts
        /*if(isNumeric(inYear))
        {*/
	     //9NT1587_FC_12.0.2_IUT BUGNo 31 ends
            if(gAction =='NEW')
            {
                isRefresh = true;
                //Delete all the existing vlaues from Multiple Entry Block
                deleteAllRows("BLK_STTMS_FIC_HOLIDAY");

                //To delete the Existing List of Holiday values
                for(var monthCnt = 0; monthCnt<12; monthCnt++)
                {
                    //gets the first day's instance of the given Month
					/*Commented FCUBS_14_7_35307157_REDWOOD_Changes starts 
                    firstDayInstance = new Date(inYear,monthCnt,1);
                    //gets the Month name
                    monthName = fnGetMonthName(monthCnt);
                    //gets the numbers of days for the given Month
                    noDays = fnGetDays(monthCnt, inYear);
                    //gets the integer equavalent of the particular day
                    firstDay = firstDayInstance.getDay();
                    // sets to the first daycnt of the month
                    col = firstDay;
                    //resets the row
                    row = 0;
                    monthList = "";
                    for(var dayCnt = 1; dayCnt <= noDays ; dayCnt++)
                    {
                        //strCell = monthName + "_" + row + "_" + col;//9NT1587_FC_12.0.2_IUT BUGNo 31
                        strCell = monthName + "_" + row + "_" + col + "I";//9NT1587_FC_12.0.2_IUT BUGNo 31
                        //currObj = eval("document.form1." + strCell);
                        //currObj = eval(strCell);//FCUBS11.1 SFR#73,--FC11.2,ITR2 SFR512
						currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512 Dhivya Commented for FCUBS_14_7_35307157_REDWOOD_Changes 											
						//currObj   = eval("getElementsByOjName('" + strCell+"')[0]");  //Added for FCUBS_14_7_35307157_REDWOOD_Changes
                        currObj.value = "";
                        currObj.className = gCSSReadOnly;
                        currObj.value = dayCnt;
                        currObj.tabIndex = tabIndex;
						/*FC11.2,ITR2 SFR512 STARTS
                        currObj.detachEvent('onkeydown',fnToggleFromKey);
                        currObj.setAttribute('onkeydown',"fnToggleFromKey()");
						FC11.2,ITR2 SFR512 ENDS
						currObj.removeAttribute('onkeydown');//FC11.2,ITR2 SFR512
                        tabIndex++;

                        if(col == gWeeklyHol1 || col == gWeeklyHol2)
                        {
                            currObj.className = gCSSHoliday;
                            monthList += "H";
                        }
                        else
                        {
                            monthList += "W";
                        }

                        if(col == 6)
                        {
                            col = 0;
                            row = row + 1;
                        }
                        else
                        {
                            col = col + 1;
                        }
                    }

                    //var currRow = addNewRow("BLK_STTM_CLG_HOLIDAY",tabIndex); //nitish commenting
					var currRow = addNewRow("BLK_STTMS_FIC_HOLIDAY");	//nitish
                    currRow.cells[1].getElementsByTagName("INPUT")[0].value = gCLGRef.value; // Commented for FCUBS_14_7_35307157_REDWOOD_Changes 
					//currRow.cells[1].getElementsByTagName("oj-input-text")[0].value = gCLGRef.value; //Added for FCUBS_14_7_35307157_REDWOOD_Changes start
					//currRow.cells[1].getElementsByTagName("INPUT")[0].value = document.getElementById("STTM_CLG_HOL_MASTER__FINANCIAL_CENTER").value;
                    //currRow.cells[2].getElementsByTagName("INPUT")[0].value = gYearRef.value;
					
					//Commented and Added for FCUBS_14_7_35307157_REDWOOD_Changes  Dhivya revert START
                    currRow.cells[2].getElementsByTagName("INPUT")[0].value = document.getElementById("BLK_STTMS_FIC_HOL_MASTER__YEAR").value;
                    currRow.cells[3].getElementsByTagName("INPUT")[0].value = monthCnt+1;
                    currRow.cells[4].getElementsByTagName("INPUT")[0].value = monthList;
                    //currRow.cells[2].getElementsByTagName("oj-input-text")[0].value = document.getElementById("BLK_STTMS_FIC_HOL_MASTER__YEAR").value;
                    //currRow.cells[3].getElementsByTagName("oj-input-text")[0].value = monthCnt+1;
                    //currRow.cells[4].getElementsByTagName("oj-input-text")[0].value = monthList;
					//FCUBS_14_7_35307157_REDWOOD_Changes END
					
                    //To clear the Existing unchanged values in the calendar
                    for(var tempCol = 0; tempCol < firstDay; tempCol++)
                    {
                        //strCell   = monthName + "_0_" + tempCol;//9NT1587_FC_12.0.2_IUT BUGNo 31
                        strCell   = monthName + "_0_" + tempCol + "I";//9NT1587_FC_12.0.2_IUT BUGNo 31
                        //currObj   = eval("document.form1." + strCell);
                       //currObj = eval(strCell);//FCUBS11.1 SFR#73,--FC11.2,ITR2 SFR512
						//currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512 Commented for FCUBS_14_7_35307157_REDWOOD_Changes 
						currObj = eval(getElementsByOjName(strCell)[0]);//Added for FCUBS_14_7_35307157_REDWOOD_Changes 
                        currObj.value         = "";
                        currObj.className    = gCSSReadOnly;
                    }

                    if(col != 6) { col--; }

                    while(row <= 5)
                    {
                        for(var tempCol = col+1; tempCol < 7; tempCol++)
                        {
                            //strCell   = monthName + "_" + row + "_" + tempCol;//9NT1587_FC_12.0.2_IUT BUGNo 31
                            strCell   = monthName + "_" + row + "_" + tempCol + "I";//9NT1587_FC_12.0.2_IUT BUGNo 31
                            //currObj   = eval("document.form1." + strCell);
                            //currObj = eval(strCell);//FCUBS11.1 SFR#73,--FC11.2,ITR2 SFR512
						    //currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512 Commented for FCUBS_14_7_35307157_REDWOOD_Changes 
							currObj = eval(getElementsByOjName(strCell)[0]); //Added for FCUBS_14_7_35307157_REDWOOD_Changes 
                            currObj.value         = "";
                            currObj.className     = gCSSReadOnly;
                        }

                        tempCol = 0;
                        col     = -1;
                        row++;
						*/ 
						//FCUBS_14_7_35307157_REDWOOD_Changes Ends
						fnAddRow('BLK_STTMS_FIC_HOLIDAY'); //FCUBS_14_7_35307157_REDWOOD_Changes starts
						}
							setTimeout( function () { //Set the data in all rows within setTimeout
					
							addNewCalenderMonth(getElementsByOjName("YEAR")[0].value);
								
								
							},100);
//FCUBS_14_7_35307157_REDWOOD_Changes Ends
            }
            else if(gAction == "EXECUTEQUERY" || gAction == 'MODIFY' || gAction == '')
            {
                //var tblRef = document.getElementById('BLK_STTMS_FIC_HOLIDAY').tBodies[0]; Commented for FCUBS_14_7_35307157_REDWOOD_Changes start
				var tblRef = getTableObjForBlock('BLK_STTMS_FIC_HOLIDAY').tBodies[0]; //Added for FCUBS_14_7_35307157_REDWOOD_Changes
                var dayStatus = '';
var l_len = 0 //fnGetDays(0);since jan alwary contain 31 days //FCUBS_14_7_35307157_REDWOOD_Changes
                for(var monthCnt = 0; monthCnt<12; monthCnt++)
                {
					var cnt = tblRef.rows[monthCnt].cells[3].getElementsByTagName("OJ-INPUT-TEXT")[0].value -1 ; 
                    //gets the first day's instance of the given Month
                    //firstDayInstance = new Date(inYear,monthCnt,1);//FCUBS_14_7_35307157_REDWOOD_Changes
					firstDayInstance = new Date(inYear,cnt,1);//FCUBS_14_7_35307157_REDWOOD_Changes
                    //gets the Month name
                  //  monthName        = fnGetMonthName(monthCnt);//FCUBS_14_7_35307157_REDWOOD_Changes
					monthName        = fnGetMonthName(cnt); //FCUBS_14_7_35307157_REDWOOD_Changes
                    //gets the numbers of days for the given Month
                    //noDays            = fnGetDays(monthCnt); FCUBS 10.5 STR1 SFR#7 30-06-2009
                  //  noDays = fnGetDays(monthCnt, inYear); //FCUBS_14_7_35307157_REDWOOD_Changes
		    noDays = fnGetDays(cnt, inYear);
                    //gets the integer equavalent of the particular day
                    firstDay        = firstDayInstance.getDay();
                    col = firstDay; // sets to the first daycnt of the month
                    row = 0;
                    //if(typeof(tblRef.rows[monthCnt].cells[4].getElementsByTagName("INPUT")[0]) == 'undefined'){ Commented for FCUBS_14_7_35307157_REDWOOD_Changes 
					if(typeof(tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0]) == 'undefined'){ //Added for FCUBS_14_7_35307157_REDWOOD_Changes 
                        monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-TEXT-AREA")[0].value;
                    }else {
                    //monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("INPUT")[0].value; Commented for FCUBS_14_7_35307157_REDWOOD_Changes 
					monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0].value; //Added for FCUBS_14_7_35307157_REDWOOD_Changes 
                    }
					lastDayInstance = new Date(inYear,monthCnt,noDays);//FCUBS_14_7_35307157_REDWOOD_Changes
					lastDay = lastDayInstance.getDay();//FCUBS_14_7_35307157_REDWOOD_Changes
                    l_len = Number(l_len) + Number(noDays);//FCUBS_14_7_35307157_REDWOOD_Changes
                   // monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("TEXTAREA")[0].value;
                    for(var dayCnt = 1; dayCnt <= noDays ; dayCnt++)
                    {
                        dayStatus = monthList.charAt((dayCnt-1));
                        //strCell   = monthName + "_" + row + "_" + col;//9NT1587_FC_12.0.2_IUT BUGNo 31
                       // strCell   = monthName + "_" + row + "_" + col + "I";//9NT1587_FC_12.0.2_IUT BUGNo 31
					   strCell   = monthName + "_" + row + "_" + col;  
                        //currObj   = eval("document.form1." + strCell);
                        //currObj = eval(strCell);//FCUBS11.1 SFR#73,--FC11.2,ITR2 SFR512
						//currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512 Commented for FCUBS_14_7_35307157_REDWOOD_Changes 
						currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //FCUBS_14_7_35307157_REDWOOD_Changes
                        currObj.value = "";
                        currObj.value = dayCnt;
                        currObj.tabIndex = tabIndex;
                        /*FC11.2,ITR2 SFR512 STARTS
                        currObj.detachEvent('onkeydown',fnToggleFromKey);
                        currObj.setAttribute('onkeydown',"fnToggleFromKey()");
						FC11.2,ITR2 SFR512 ENDS*/
						currObj.removeAttribute('onkeydown');//FC11.2,ITR2 SFR512
                        tabIndex++;
                        if(dayStatus == 'H')
                        {
                            //currObj.className = gCSSHoliday;
							currObj.classList.add(gCSSHoliday); //FCUBS_14_7_35307157_REDWOOD_Changes
							currObj.classList.remove(gModified); //FCUBS_14_7_35307157_REDWOOD_Changes TO REMOVE BLUE COLOR FOR 
                         currObj.classList.add("numeric"); //FCUBS_14_7_35307157_REDWOOD_Changes
                        }
                        else
                        {
                          //  currObj.className    = gCSSReadOnly;
						  currObj.classList.add(...gCSSReadOnly); //FCUBS_14_7_35307157_REDWOOD_Changes
						currObj.classList.add("numeric"); //FCUBS_14_7_35307157_REDWOOD_Changes
                        }

                        if(col == 6)
                        {
                            col = 0;
                            row = row + 1;
                        }
                        else
                        {
                            col = col + 1;
                        }
                    }

                    //To clear the Existing unchanged values and style of the calendar
                    for(var tempCol = 0; tempCol < firstDay; tempCol++)
                    {
                        //strCell   = monthName + "_0_" + tempCol;//9NT1587_FC_12.0.2_IUT BUGNo 31
                       // strCell   = monthName + "_0_" + tempCol + "I";//9NT1587_FC_12.0.2_IUT BUGNo 31
					   strCell   = monthName + "_0_" + tempCol;  //FCUBS_14_7_35307157_REDWOOD_Changes
                        //currObj   = eval("document.form1." + strCell);
                        //currObj = eval(strCell);//FCUBS11.1 SFR#73,--FC11.2,ITR2 SFR512
						//currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512 Commented for FCUBS_14_7_35307157_REDWOOD_Changes 
						currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //FCUBS_14_7_35307157_REDWOOD_Changes
                        currObj.value         = "";
                        //currObj.className    = gCSSReadOnly;//FCUBS_14_7_35307157_REDWOOD_Changes
						currObj.classList.add(...gCSSReadOnly); //FCUBS_14_7_35307157_REDWOOD_Changes
                    }

                    if(col != 6) { col--; }

                    while(row <= 5)
                    {
                        tempCol = 0;
                        for(var tempCol = col+1; tempCol < 7; tempCol++)
                        {
                            //strCell   = monthName + "_" + row + "_" + tempCol;//9NT1587_FC_12.0.2_IUT BUGNo 31
                          //  strCell   = monthName + "_" + row + "_" + tempCol + "I";//9NT1587_FC_12.0.2_IUT BUGNo 31
						  strCell   = monthName + "_" + row + "_" + tempCol; //FCUBS_14_7_35307157_REDWOOD_Changes
                            //currObj   = eval("document.form1." + strCell);
                            //currObj = eval(strCell);//FCUBS11.1 SFR#73,--FC11.2,ITR2 SFR512
						    //currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512 Commented for FCUBS_14_7_35307157_REDWOOD_Changes 
							currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //FCUBS_14_7_35307157_REDWOOD_Changes
                            currObj.value         = "";
                            //currObj.className    = gCSSReadOnly;
							currObj.classList.add(...gCSSReadOnly); //FCUBS_14_7_35307157_REDWOOD_Changes
                        }
                        //tempCol = 0;

                        col     = -1;
                        row++;
                    }
                }
            }
        }
		//9NT1587_FC_12.0.2_IUT BUGNo 31 starts
        /*else
        {//Year is no numeric value
            appendErrorCode('ST-COM015','YEAR');
            isValid = false;
        }
    }*/
	//9NT1587_FC_12.0.2_IUT BUGNo 31 ends
    else
    {//Year is left blank
        appendErrorCode('ST-COM013','YEAR');
        isValid = false;
    }

    if(isValid == false)
    {
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
        //document.getElementsByName("YEAR")[0].select(); //Commented for FCUBS_14_7_35307157_REDWOOD_Changes 
		getElementsByOjName("YEAR")[0].select(); //Added for FCUBS_14_7_35307157_REDWOOD_Changes
    }

    gYearRef.tabIndex = tabIndex++;
    //document.getElementsByName("BTN_EXIT")[0].tabIndex   = tabIndex++; //Commented for FCUBS_14_7_35307157_REDWOOD_Changes 
    document.getElementById("BLK_STTMS_FIC_HOL_MASTER__FINANCIAL_CENTER").tabIndex = tabIndex++;
	getElementsByOjName("BTN_EXIT")[0].tabIndex   = tabIndex++; //Added for FCUBS_14_7_35307157_REDWOOD_Changes

    if(document.getElementById("BLK_STTMS_FIC_HOL_MASTER__YEAR").disabled == false) {
        document.getElementById("BLK_STTMS_FIC_HOL_MASTER__YEAR").readOnly = true;        
    }
}

/*
 * Toggle color when the user duble click on the day 
 * and 
 * Create holiday list of that particular month
 */
function fnToggleColor(currObj){
	setTimeout(function () { fnToggleColorOJET(currObj); }, 0);	//FCUBS_14_7_35307157_REDWOOD_Changes
	return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}
function fnToggleColorOJET(currObj){//FCUBS_14_7_35307157_REDWOOD_Changes
    if(gAction == "NEW" || gAction == "MODIFY"){
        var currObjName = currObj.name;
        var index = currObjName.indexOf("_");
        var day = 1;
//FCUBS_14_7_35307157_REDWOOD_Changes starts
		/* if(currObj.value != ""){
            if(currObj.className == gCSSReadOnly){
                currObj.className = gCSSHoliday;
            }
            else{
                currObj.className = gCSSReadOnly;
            }*/
			//FCUBS_14_7_35307157_REDWOOD_Changes ends
	
        if(currObj.value != ""){
            day = currObj.value;//FCUBS_14_7_35307157_REDWOOD_Changes
			var monthName        = currObjName.substring(0, index);
			var month            = fnGetMonthIndex(monthName);
			var loopObj          = null;
			//FCUBS_14_7_35307157_REDWOOD_Changes starts
			//var currMonthCell    = getTableObjForBlock("BLK_NETWORK_HOLIDAY").tBodies[0].rows[month].cells[3].getElementsByTagName("INPUT")[0];
			//var inYear           = getTableObjForBlock("BLK_NETWORK_HOLIDAY").tBodies[0].rows[month].cells[1].getElementsByTagName("INPUT")[0].value;
			var currMonthCell;
            var inYear;
            var monthList;
            try {
                currMonthCell = getTableObjForBlock("BLK_STTMS_FIC_HOLIDAY").tBodies[0].rows[month].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0]; 	//FCUBS_14_7_35307157_REDWOOD_Changes
                inYear = getTableObjForBlock("BLK_STTMS_FIC_HOLIDAY").tBodies[0].rows[month].cells[1].getElementsByTagName("OJ-INPUT-TEXT")[0].value; 	//FCUBS_14_7_35307157_REDWOOD_Changes
                monthList = currMonthCell.value;
//FCUBS_14_7_35307157_REDWOOD_Changes Commenting Starts
//Rebuliding the holiday list for the current month
            /*    for(var dayCnt = 1; dayCnt <= noDays ; dayCnt++){
                    //strCell = monthName + "_" + row + "_" + col;//9NT1587_FC_12.0.2_IUT BUGNo 31
                    strCell = monthName + "_" + row + "_" + col + "I";//9NT1587_FC_12.0.2_IUT BUGNo 31
                    //loopObj = eval("document.form1." + strCell);
					//FC11.2,ITR2 SFR512 starts
                    //loopObj = eval(strCell);
					loopObj = eval(document.getElementsByName(strCell)[0]);
					//FC11.2,ITR2 SFR512 ends
                    if(loopObj.className == gCSSHoliday && loopObj.value != "") {
                        monthList += "H";
                    }
                    else {
                        if(loopObj.value != "") {
                            monthList += "W";
                         }
                    }
                    if(col == 6){
                        col = 0;
                        row = row + 1;
                    }
                    else{
                        col = col + 1;
                    }
                }              
                currMonthCell.value = monthList;
                }*/
		//FCUBS_14_7_35307157_REDWOOD_Changes Commenting Ends
            }
            catch (e) {
                //monthList=getOjMeDataObject('BLK_STTMS_CCY_HOLIDAY')[month]['HOLIDAY_LIST'];
                //inYear=getOjMeDataObject('BLK_STTMS_CCY_HOLIDAY')[month]['YEAR'];
            }
			//FCUBS_14_7_35307157_REDWOOD_Changes ends
			var firstDayInstance = new Date(inYear,month,1);
			col                  = firstDayInstance.getDay();
			//if(currObj.className == gCSSReadOnly){									//FCUBS_14_7_35307157_REDWOOD_Changes
			if (currObj.classList.contains(gCSSHoliday)) {								//FCUBS_14_7_35307157_REDWOOD_Changes
                //currObj.className = gCSSHoliday;										//FCUBS_14_7_35307157_REDWOOD_Changes
				currObj.classList.remove(gCSSHoliday);									//FCUBS_14_7_35307157_REDWOOD_Changes
                currObj.classList.add(...gCSSReadOnly);									//FCUBS_14_7_35307157_REDWOOD_Changes
				//currMonthCell.value = currMonthCell.value.substring(0,day-1) + "H" + currMonthCell.value.substring(day,currMonthCell.value.length)	//FCUBS_14_7_35307157_REDWOOD_Changes
				monthList = monthList.substring(0, day - 1) + "S" + monthList.substring(day, monthList.length);											//FCUBS_14_7_35307157_REDWOOD_Changes
		    }
			//FCUBS_12.0.2_#17043238 Changes Starts
			//else if (currObj.className == gCSSHoliday){																								//FCUBS_14_7_35307157_REDWOOD_Changes
			else if (!(currObj.classList.contains(gCSSHoliday) || currObj.classList.contains(gModified))) {												//FCUBS_14_7_35307157_REDWOOD_Changes
                //currObj.className = gCSSHalfday ;																										//FCUBS_14_7_35307157_REDWOOD_Changes
				currObj.classList.add(gCSSHoliday);																										//FCUBS_14_7_35307157_REDWOOD_Changes
                //currMonthCell.value = currMonthCell.value.substring(0,day-1) + "S" + currMonthCell.value.substring(day,currMonthCell.value.length)	//FCUBS_14_7_35307157_REDWOOD_Changes
				monthList = monthList.substring(0, day - 1) + "H" + monthList.substring(day, monthList.length);											//FCUBS_14_7_35307157_REDWOOD_Changes
            }
			//FCUBS_12.0.2_#17043238 Changes Ends
            else{
                //currObj.className = gCSSReadOnly;																										//FCUBS_14_7_35307157_REDWOOD_Changes
				currObj.classList.add(...gCSSReadOnly);																									//FCUBS_14_7_35307157_REDWOOD_Changes
				//currMonthCell.value = currMonthCell.value.substring(0,day-1) + "W" + currMonthCell.value.substring(day,currMonthCell.value.length)	//FCUBS_14_7_35307157_REDWOOD_Changes
				monthList = monthList.substring(0, day - 1) + "W" + monthList.substring(day, monthList.length); 										//FCUBS_14_7_35307157_REDWOOD_Changes
			}
			//FCUBS_14_7_35307157_REDWOOD_Changes Starts
			if(currMonthCell){			
			currMonthCell.value=monthList;     
			}
			////FCUBS_14_7_35307157_REDWOOD_Changes Ends
        }
    }
	return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}
 /*
  * Funtion to clear the calendar and set its default style
  */
function fnResetStyle()
{
	var monthName = "";
 	var strCell   = "";
	var currObj   = null;
 // 	gYearRef      = document.getElementById("BLK_STTMS_FIC_HOL_MASTER__YEAR");
   gYearRef      = getElementsByOjName("YEAR")[0]; //FCUBS_14_7_35307157_REDWOOD_Changes
    gLblYearOf    = getElementsByOjName("YEAR")[0]; //FCUBS_14_7_35307157_REDWOOD_Changes
	for(var monthCnt = 0; monthCnt < 12 ;monthCnt++)
	{
  		monthName		= fnGetMonthName(monthCnt);
  		
  		for(var rowCnt = 0; rowCnt < 6; rowCnt++)
  		{
			for(var colCnt = 0; colCnt < 7;colCnt++)
			{
				//strCell = monthName + "_" + rowCnt + "_" + colCnt + "I"; 	//FCUBS_14_7_35307157_REDWOOD_Changes
				strCell = monthName + "_" + rowCnt + "_" + colCnt; 			//FCUBS_14_7_35307157_REDWOOD_Changes
			//	currObj = eval("getElementsByOjName('" + strCell + "')[0]");			//FCUBS_14_7_35307157_REDWOOD_Changes
				//currObj = eval(getElementsByOjName(strCell)[0]);						//FCUBS_14_7_35307157_REDWOOD_Changes
                //currObj.className = gCSSReadOnly;										//FCUBS_14_7_35307157_REDWOOD_Changes
					currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //FCUBS_14_7_35307157_REDWOOD_Changes
				currObj.classList.add(...gCSSReadOnly);									//FCUBS_14_7_35307157_REDWOOD_Changes
                currObj.tabIndex  = -1;
  			}
  		}
 	}
 	
   // gYearRef = document.getElementById("BLK_STTMS_FIC_HOL_MASTER__YEAR");//FCUBS_14_7_35307157_REDWOOD_Changes
    gYearRef.tabIndex = -1;   
   // document.getElementById("BLK_STTMS_FIC_HOL_MASTER__FINANCIAL_CENTER").tabIndex = -1;      //FCUBS_14_7_35307157_REDWOOD_Changes
    //document.getElementsByName("BTN_EXIT")[0].tabIndex = -1; Commented for FCUBS_14_7_35307157_REDWOOD_Changes 
	getElementsByOjName("BTN_EXIT")[0].tabIndex = -1; //Added for FCUBS_14_7_35307157_REDWOOD_Changes
}

/*
 * Function  to validate year
 */
function fnValidateYear(year){
	var isValid = true;
	if(year != '' ){
		if(isNumeric(year)){
			if(year < 2000){
               appendErrorCode('ST-CCH01','YEAR');
               isValid = true;
               //document.getElementsByName("YEAR")[0].select(); Commented for FCUBS_14_7_35307157_REDWOOD_Changes 
			   getElementsByOjName("YEAR")[0].select(); //Added for FCUBS_14_7_35307157_REDWOOD_Changes
			}
		}
		else{
			 appendErrorCode('ST-COM015','YEAR');
             isValid = false;
             //document.getElementsByName("YEAR")[0].select(); Commented for FCUBS_14_7_35307157_REDWOOD_Changes 
			 getElementsByOjName("YEAR")[0].select(); //Added for FCUBS_14_7_35307157_REDWOOD_Changes
		}
	}
	return isValid;
	      
}

/*
 * used to toggle the between holiday to working day using SPACEBAR
 */
 function fnToggleFromKey(){
    var srcElem = event.srcElement;
    if(event.keyCode == 32 && srcElem.value != ""){
        fnToggleColor(srcElem);
    }
    event.cancelBubble = true;
 }
 
 
 
 /*code started to apply color to Weekly holidays labels*/
 var week1 = new Array();
 var week2 = new Array();
 var week3 = new Array();
 var week4 = new Array();
 
 function fnSetLableColorforHolidays(){
   fnSetColorofDay(gWeeklyHol1);
   fnSetColorofDay(gWeeklyHol2);
 }
 function fnSetColorofDay(day){ 
  for(var cnt=1;cnt<=3;cnt++ ){
    
    eval('week'+cnt+'['+day+'].style.color="red"');  // doubt
    //eval('week'+cnt+'['+day+'].style.fontWeight="bold"');
  }  
 } 
 function identifyLabelforDay(){
       var labels = document.getElementsByTagName("INPUT");  
       for(var cntL = 0 ;cntL < labels.length ;cntL++){
          if(week1.length == 7 && week2.length == 7 && week3.length == 7 && week4.length == 7 )
            break;
          for(var cnt=1;cnt<=3;cnt++ ){
             if(!  storeLabel(labels[cntL],'SUNDAY',cnt,0 ) )
              if( !storeLabel(labels[cntL],'MONDAY',cnt ,1) )
               if( !storeLabel(labels[cntL],'TUESDAY',cnt ,2) )
                if( !storeLabel(labels[cntL],'WEDNESDAY',cnt ,3))
                  if(! storeLabel(labels[cntL],'THURSDAY',cnt ,4) )
                    if(! storeLabel(labels[cntL],'FRIDAY',cnt ,5))
                      storeLabel(labels[cntL],'SATURDAY',cnt ,6);                             
          } 
       }
       fnSetLableColorforHolidays();
 }
 function storeLabel(obj,day,count,offset){
    if(obj.name)
      if(obj.name == day +'_'+ count){
          eval('week'+count+'['+offset+']=obj');
          return true;
      } else
      return false;
 }
 //FCUBS_14_7_35307157_REDWOOD_Changes Starts
function setOjetStyles(id){
	var ids= new Array( 'TAB_MAIN__SEC_2','TAB_MAIN__SEC_3','TAB_MAIN__SEC_4','TAB_MAIN__SEC_5');
	ids.forEach(id=>setOjetStylesById(id));
	return true;//FCUBS_14_7_35307157_REDWOOD_Changes
}//FCUBS_14_7_35307157_REDWOOD_Changes Ends
function setCss()
{   //FCUBS_14_7_35307157_REDWOOD_Changes start 
	
		getElementsByOjName("SUNDAY1")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("MONDAY1")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("TUESDAY1")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("WEDNESDAY1")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("THURSDAY1")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("FRIDAY1")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("SATURDAY1")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("SUNDAY2")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("SUNDAY3")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("MONDAY2")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("MONDAY3")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("TUESDAY2")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("TUESDAY3")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("WEDNESDAY2")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("WEDNESDAY3")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("THURSDAY2")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("THURSDAY3")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("FRIDAY2")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("FRIDAY3")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("SATURDAY2")[0].classList.add(...gCSSReadOnly);
	getElementsByOjName("SATURDAY3")[0].classList.add(...gCSSReadOnly);
	return true;//FCUBS_14_7_35307157_REDWOOD_Changes
	//FCUBS_14_7_35307157_REDWOOD_Changes end
}


function setOjetStylesById(id){
	//var daysDivObject =document.getElementById(id).getElementsByClassName("oj-flex-bar oj-sm-width-full");
    var daysDivObject = document.getElementsByClassName("oj-flex-bar oj-sm-width-full");
    for(var i=0; i< daysDivObject.length; i++){
        if(daysDivObject[i].children.length == 7){
            var daysDivChildObject  = daysDivObject[i].children;
            for(var j=0; j< daysDivChildObject.length; j++){
                daysDivChildObject[j].style.width = (100 / daysDivChildObject.length) + "%";
                daysDivChildObject[j].children[0].style.textAlign = "center";
                daysDivChildObject[j].children[0].getElementsByClassName("oj-text-field-container")[0].style.border = "none";
                daysDivChildObject[j].children[0].getElementsByClassName("oj-user-assistance-inline-container")[0].style.minHeight= "0px";                
                daysDivChildObject[j].children[0].getElementsByClassName("oj-user-assistance-inline-container")[0].style.marginBottom= "0px";
            }
        }
    }
    $.each($("h4"), function( index, value ) {
  value.style.textAlign = "center"
});
}
//FCUBS_14_7_35307157_REDWOOD_Changes ends