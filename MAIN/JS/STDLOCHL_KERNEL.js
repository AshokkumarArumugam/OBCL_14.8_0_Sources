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
**  File Name          : STDLOCHL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   :  shashanka koormachalam
**  Last modified on   :  05-Jun-2013
**  Full Version       : 12.0.2.0.0
**  Reason             :  Holidays are not getting highlighted with color.
**  search string      :  9NT1587_FC_12.0.2_IUT BUGNo 16904799
**
**  Last Modified By   :  Guruprasad Bhat
**  Last modified on   :  25-Jun-2013
**  Full Version       :  12.0.2.0.0
**  Reason             :  Year not defaulted in Firefox and Opera
**  search string      :  9NT1587_FC_12.0.2_ITR1 Bug# 16995458 

**  Last Modified By   : Sandeep Sambidi
**  Last modified on   : 5-Aug-2013
**  Full Version       : 
**  Reason             : 
**  Search String      : 9NT1587_12.0.2_17211558

**  Last Modified By   : Tapsi Dubey
**  Last modified on   : 14-April-2014
**  Reason             :  Weekly Holidays maintained in branch parameters (STDBRANC) should be defaulted on click on refresh    
**  Search String      : 9NT1620_12.0.3_18999439

**  Last Modified By 	 : Deva Anand
**  Last modified on  	: 07-Oct-2014
**  Reason           		:  Modified the code  in order to display the changes in a different colour
**  Search String     	 : 9NT1620#1203RETRO#19767144

**  Modified by       : Geeta Adhikari
**  Modified Reason   : Bug#20659130
**  Search String     : FCUBS_12.1.0_21066833

**  Modified by       : Akshay Trivedi
**  Modified Reason   : When user clicks on view changes while authorization, system should display the changes in a blue colour. 
**  Search String     : Bug#34555322
**  Modified on       : 25-Aug-2022	
**
** Modified  By         : Manoj
** Modified  On         : 08-feb-2023
** Modified Reason      : Redwood Changes done 
** Search String        : redwood_changes
** Bug Number			: 
**
** Modified  By         : Manoj
** Modified  On         : 15-May-2023
** Modified Reason      : Redwood Changes done 
** Search String        : redwood_35389258
** Bug Number			: 35389258
**
** Modified  By         : Girish
** Modified  On         : 11-Aug-2023
** Modified Reason      : Redwood Changes done 
** Search String        : redwood_35657123
**
**
** Modified  By         : Girish
** Modified  On         : 08-Jan-2025
** Modified Reason      : Redwood Changes done 
** Search String        : REDWOOD_36876972
                          redwood_36876901
****************************************************************************************************************************/


//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes = "";

var gCCYRef         = null;
var gYearRef           = null;
var gWeeklyHol1        = 0;
var gWeeklyHol2        = 6;
//9NT1587_FC_12.0.2_IUT BUGNo 16904799 starts
/*var gCSSReadOnly    = "TXTro";
var gCSSHoliday        = "TXTHD";
var gCSSReadOnly	= "TXTro numeric";
var gCSSHoliday		= "TXTro numeric TxtHD";*/
//9NT1587_FC_12.0.2_IUT BUGNo 16904799 ends
var gCSSReadOnly = []; //Redwood_Changes
var gCSSHoliday ="calendarHoliday"; //Redwood_Changes
var gModified = "viewchanges-modified"; //Redwood_Changes

var gLblYearOf;
var isRefresh = false;
var monthNames    = new Array(12);
monthNames[0]    = "JAN";
monthNames[1]     = "FEB";
monthNames[2]     = "MAR";
monthNames[3]     = "APR";
monthNames[4]     = "MAY";
monthNames[5]     = "JUN";
monthNames[6]     = "JUL";
monthNames[7]     = "AUG";
monthNames[8]     = "SEP";
monthNames[9]     = "OCT";
monthNames[10]     = "NOV";
monthNames[11]     = "DEC";
var gyearValue    = "";
var gCcyReference = "";
//var gModified = "#1f77FF"; //9NT1620#1203RETRO#19767144


function fnPostLoad_KERNEL() 
{
	try{ //Bug#34555322
	//selectSingleNode(document, '//fieldset[@block="BLK_LOCAL_HOLIDAY"]').style.display = 'none';
	//document.getElementById("dataContainer_BLK_LOCAL_HOLIDAY").style.display="none";
	//document.getElementById("dataContainer_BLK_LOCAL_HOLIDAY").style.height = '0px';
	//document.getElementById("dataContainer_BLK_LOCAL_HOLIDAY").style.overflow = 'hidden';
	//document.getElementById("BLK_LOCAL_HOLIDAY").firstChild.nextSibling.style.display = 'none';
	//document.getElementById("dataContainer_BLK_LOCAL_HOLIDAY").firstChild.firstChild.style.display = 'none';
	//document.getElementById("dataContainer_BLK_LOCAL_HOLIDAY").visibility=false;
	//gYearRef = document.getElementsByName("YEAR")[0];
	//gYearRef=document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEARI").value;//FCUBS_12.1.0_21066833
	//gYearRef=document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEAR").value; //Redwood_Changes
	//
	gYearRef = getElementsByOjName("YEAR")[0]; //Redwood_Changes 
	} //Bug#34555322
	catch(e){} //Bug#34555322
	//9NT1620#1203RETRO#19767144 changes starts
	if (viewMnt) 
	{
	  gAction="VIEWMNTLOG";
         setTimeout( function () {//redwood_36876901 starts
            displayCalendar();
	},10);//redwood_36876901 Ends
	}
	//9NT1620#1203RETRO#19767144 changes ends
	document.getElementById("TAB_MAIN__SEC_MULTIGRID").style.visibility="hidden"; //Redwood_Changes
	setOjetStyles(); //Redwood_Changes
    displayCalendar(); //Redwood_Changes  //To_check
	setCss();
	//9NT1587_12.0.2_17211558 start
	if (parent.screenArgs['PARENT_FUNC_ID'] == "STDBRREF") 
	{
		fnPostLoad_CVS_MAIN_VIEWLOG();
    }
	//9NT1587_12.0.2_17211558 end
	return true;
}
function fnPostNew_KERNEL()  
{
		isRefresh = false;  //FCUBS_12.2.0.0.0_SUPPORT_23658200
        //document.getElementsByName("BRANCH_CODE")[0].value = mainWin.CurrentBranch;
        getElementsByOjName("BRANCH_CODE")[0].value = mainWin.CurrentBranch; //Redwood_Changes
      	//document.getElementsByName("YEAR")[0].value = parent.AppDate.substr(0,4); -- Commented as part of fix for 9NT1587_FC_12.0.2_ITR1 Bug# 16995458
		// Fix for 9NT1587_FC_12.0.2_ITR1 Bug# 16995458 Starts
		document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEAR").value = parent.AppDate.substr(0,4);  
        fireHTMLEvent(document.getElementById('BLK_LOCAL_HOLIDAY_MASTER__YEAR'), "onpropertychange");
		// Fix for 9NT1587_FC_12.0.2_ITR1 Bug# 16995458	Ends
		//fnEnableElement(document.getElementById("STTMS_LCL_HOL_MASTER__YEAR"));
		//9NT1620_12.0.3_18999439 Function Call
		fnDefaultWeeklyHolidays();		
		return true;

}


function fnPostUnlock_KERNEL() {
/*
	fnDisableElement(document.getElementsByName('BTN_REFRESH')[0]);
	document.getElementsByName("BRANCH_CODE")[0].readOnly = true;
	document.getElementsByName("YEAR")[0].readOnly = true;
	*/
  	fnDisableElement(getElementsByOjName('BTN_REFRESH')[0]); //Redwood_Changes
	getElementsByOjName("BRANCH_CODE")[0].readOnly = true; //Redwood_Changes
	getElementsByOjName("YEAR")[0].readOnly = true; //Redwood_Changes
	//document.getElementsByName("BRANCH_CODE")[0].disabled = true;
    //document.getElementsByName("YEAR")[0].disabled = true;
    displayCalendar();
	return true;
}

function fnPostAuthorize_KERNEL() 
{
	displayCalendar();
	return true;
}

//FCUBS_12.2.0.0.0_SUPPORT_23657375 starts
function fnPostFocus_KERNEL() 
{
    if(gAction != 'NEW')
	   //displayCalendar(); //Redwood_Changes
	   
	return true;
}
//FCUBS_12.2.0.0.0_SUPPORT_23657375  ends

/*
 * Called to perform some neccessary operation after the fnEnterQuery() Action event
 * Specific to the functionid
 */
function fnPostEnterQuery_KERNEL() 
{
   
   //document.getElementsByName("BRANCH_CODE")[0].value = mainWin.CurrentBranch;   
   getElementsByOjName("BRANCH_CODE")[0].value = mainWin.CurrentBranch;   //Redwood_Changes
	return true;
}

function fnPostExecuteQuery_KERNEL() 
{
	
  setTimeout( function () {//redwood_35389258 starts
   displayCalendar();
	},0);//redwood_35389258 Ends
	return true;
}

function fnPostSave_KERNEL()  
{
	displayCalendar();
	return true;
}

function fnPreExecuteQuery_KERNEL()  
{
	displayCalendar();
	return true;
}

function fnPreUnlock_KERNEL()  
{
	displayCalendar();
	return true;
}



function fnPreSave_KERNEL() {
    debugs("In fnPreSave", "A");
    if(!isRefresh && gAction =='NEW'){
        //alert("Please Input the Calendar values.");
		showErrorAlerts('IN-HEAR-402');//NLS change -Removal of hardcoded alerts
        return false;
    }
    setChildKeyValues("STTMS_LCL_HOL_MASTER","BRANCH_CODE","BRANCH_CODE");
    setChildKeyValues("STTMS_LCL_HOL_MASTER","YEAR","YEAR");
    var yearVal        = document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEAR").value;
	var gBRANCHCODERef = document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__BRANCH_CODE").value;
	gyearValue    = yearVal;
    gYearRef      = yearVal;
	gBranchCodeReference = gBRANCHCODERef;
    displayCalendar();
    return true;
}

/***************************************************
 STDCCHOL function specific functions starts here
 ***************************************************/

/*
 *Returns number of days of a given month
 *inMonth - Numeric equvalent of Month
 *inYear  - Current Year
 */
function fnGetDays(inMonth,inYear)
{
    var noDays   = new Array(12);

    noDays[0]    = 31; // January
    noDays[1]    = (fnLeapYear(inYear)) ? 29 : 28; // February
    noDays[2]    = 31; // March
    noDays[3]    = 30; // April
    noDays[4]    = 31; // May
    noDays[5]    = 30; // June
    noDays[6]    = 31; // July
    noDays[7]    = 31; // August
    noDays[8]    = 30; // September
    noDays[9]    = 31; // October
    noDays[10]   = 30; // November
    noDays[11]   = 31; // December

    // return number of days in the specified month (parameter)
    return noDays[inMonth];
 }

/*
 *Returns the Function names
 */
function fnGetMonthName(inMonth)
{
    // return name of specified month (parameter)
    return monthNames[inMonth];
}

/*
 *Returns numeric equvalent of the given month
 */
function fnGetMonthIndex(monthName)
{
    for(var monCnt = 0; monCnt < monthNames.length; monCnt++)
    {
        if(monthNames[monCnt] == monthName)
        {
            return monCnt;
        }
    }
    return -1;
}
//Redwood_Changes start
 function displayCalendar(){
	 displayCalendarOJET();
 }
 //Redwood_Changes end
 function addNewCalenderMonth(year, branchCode ){
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
                    firstDayInstance = new Date(inYear,monthCnt,1);
                    monthName = fnGetMonthName(monthCnt);
                    noDays = fnGetDays(monthCnt, inYear);
                    firstDay = firstDayInstance.getDay();
                    col = firstDay;
                    row = 0;
                    monthList = "";
                    for(var dayCnt = 1; dayCnt <= noDays ; dayCnt++)
                    {
                        //strCell = monthName + "_" + row + "_" + col; //comment 9NT1587_FC_12.0.2_IUT BUGNo 16904799
						//strCell = monthName + "_" + row + "_" + col +  "I"; //added 9NT1587_FC_12.0.2_IUT BUGNo 16904799 
						strCell = monthName + "_" + row + "_" + col;	//Redwood_Changes
                        
				//currObj = eval(document.getElementsByName(strCell)[0]); //FCUBS11.2_Cross_Browser#1 //FCUBS_12.1.0_21066833 commented
				//currObj = eval(document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__" + monthName + "_" + row + "_" + col +  "I"));  //  FCUBS_12.1.0_21066833 added
				//currObj = eval(document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__" + monthName + "_" + row + "_" + col)); //Redwood_Changes
				//currObj = eval(getElementsByOjName("BLK_LOCAL_HOLIDAY_MASTER__" + monthName + "_" + row + "_" + col)); //Redwood_Changes
				currObj   = eval("getElementsByOjName('" + strCell+"')[0]");  //Redwood_Changes


                        currObj.value = "";
                        //currObj.className = gCSSReadOnly;
						currObj.classList.add(...gCSSReadOnly); //Redwood_Changes
                        currObj.value = dayCnt;
                        currObj.tabIndex = tabIndex;
						currObj.removeAttribute('onkeydown');//FCUBS11.2_Cross_Browser#1
                        tabIndex++;

                        if(col == gWeeklyHol1 || col == gWeeklyHol2)
                        {
                            //currObj.className = gCSSHoliday;
							currObj.classList.remove(gModified); //Redwood_Changes
							currObj.classList.add(gCSSHoliday); //Redwood_Changes
                            monthList += "H";
                        }
                        else
                        {
							currObj.classList.remove(gModified); //Redwood_Changes
							currObj.classList.remove(gCSSHoliday); //Redwood_Changes
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
			
                    //var currRow = addNewRow("BLK_LOCAL_HOLIDAY"); //Redwood_Changes
					var rowno=monthCnt; //Redwood_Changes
					var currRow=getTableObjForBlock("BLK_LOCAL_HOLIDAY").tBodies[0].rows[rowno]; //Redwood_Changes
                   // currRow.cells[1].getElementsByTagName("OJ-INPUT-TEXT")[0].value = document.getElementsByName("BRANCH_CODE")[0].value; //FCUBS_12.1.0_21066833 commented
                  // currRow.cells[1].getElementsByTagName("OJ-INPUT-TEXT")[0].value = document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__BRANCH_CODE").value; // FCUBS_12.1.0_21066833 added
				  currRow.cells[1].getElementsByTagName("OJ-INPUT-TEXT")[0].value = branchCode;
					//currRow.cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value = gYearRef.value;
                    //currRow.cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value = document.getElementsByName("YEAR")[0].value; //FCUBS_12.1.0_21066833 commented
					//currRow.cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value = document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEARI").value;  // FCUBS_12.1.0_21066833 added
					currRow.cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value = document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEAR").value;
                    currRow.cells[3].getElementsByTagName("OJ-INPUT-TEXT")[0].value = monthCnt+1;
                    currRow.cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0].value = monthList;

                    //To clear the Existing unchanged values in the calendar
                    for(var tempCol = 0; tempCol < firstDay; tempCol++)
                    {
                        //strCell   = monthName + "_0_" + tempCol; //comment 9NT1587_FC_12.0.2_IUT BUGNo 16904799
						//strCell   = monthName + "_0_" + tempCol +  "I"; //added 9NT1587_FC_12.0.2_IUT BUGNo 16904799  //Redwood_Changes
						strCell   = monthName + "_0_" + tempCol;  //Redwood_Changes
						
                        //currObj = eval(strCell); ///FCUBS11.1 ITR1 SFR 831 //FCUBS11.2_Cross_Browser#1
				//currObj = eval(document.getElementsByName(strCell)[0]);//FCUBS11.2_Cross_Browser#1 FCUBS_12.1.0_21066833 commented
                //currObj = eval(document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__" + monthName + "_0_" + tempCol +  "I")); // FCUBS_12.1.0_21066833 added  
				currObj   = eval("getElementsByOjName('" + strCell+"')[0]");  //Redwood_Changes				
						currObj.value         = "";
                        //currObj.className    = gCSSReadOnly;
						currObj.classList.add(...gCSSReadOnly); //Redwood_Changes
                    }

                    if(col != 6) { col--; }

                    while(row <= 5)
                    {
                        for(var tempCol = col+1; tempCol < 7; tempCol++)
                        {
                            //strCell   = monthName + "_" + row + "_" + tempCol; //comment 9NT1587_FC_12.0.2_IUT BUGNo 16904799
							//strCell   = monthName + "_" + row + "_" + tempCol + "I";  //added 9NT1587_FC_12.0.2_IUT BUGNo 16904799  //Redwood_Changes
							strCell   = monthName + "_" + row + "_" + tempCol; //Redwood_Changes
                           //currObj = eval(strCell); ///FCUBS11.1 ITR1 SFR 831  //FCUBS11.2_Cross_Browser#1
				    //currObj = eval(document.getElementsByName(strCell)[0]);//FCUBS11.2_Cross_Browser#1 //FCUBS_12.1.0_21066833 commented
					//currObj = eval(document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__" + monthName + "_" + row + "_" + tempCol + "I"));// FCUBS_12.1.0_21066833 added //Redwood_Changes
					
					currObj = eval(document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__" + monthName + "_" + row + "_" + tempCol)); //Redwood_Changes
                            currObj.value         = "";
                            //currObj.className    = gCSSReadOnly;
								currObj.classList.add(...gCSSReadOnly);
                        }

                        tempCol = 0;
                        col     = -1;
                        row++;
                    }
				}
 }
 
/*
 * Function which fills the Calendar values corresponding the year entered
 * and
 * Value of gAction
 */
//function displayCalendar()
function displayCalendarOJET()
{
   //var curYear2  = document.getElementsByName("YEAR")[0].value; FCUBS_12.1.0_21066833 commented
    //var curYear2  = document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEARI").value; //FCUBS_12.1.0_21066833 added
	var curYear2  = document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEAR").value; //FCUBS_12.1.0_21066833 added
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
	var inYear = parseInt(curYear2);
	//To populate the calendar only when the year and Currency both are entered.
    if(inYear != "")
    {
            if(gAction =="NEW")
            {
		  isRefresh = true;
		  deleteAllRows("BLK_LOCAL_HOLIDAY");//FCUBS11.2_Cross_Browser#1
                for(var monthCnt = 0; monthCnt<12; monthCnt++)
                {
					/*
                    firstDayInstance = new Date(inYear,monthCnt,1);
                    monthName = fnGetMonthName(monthCnt);
                    noDays = fnGetDays(monthCnt, inYear);
                    firstDay = firstDayInstance.getDay();
                    col = firstDay;
                    row = 0;
                    monthList = "";
                    for(var dayCnt = 1; dayCnt <= noDays ; dayCnt++)
                    {
                        //strCell = monthName + "_" + row + "_" + col; //comment 9NT1587_FC_12.0.2_IUT BUGNo 16904799
						strCell = monthName + "_" + row + "_" + col +  "I"; //added 9NT1587_FC_12.0.2_IUT BUGNo 16904799 
						
                        
				//currObj = eval(document.getElementsByName(strCell)[0]); //FCUBS11.2_Cross_Browser#1 //FCUBS_12.1.0_21066833 commented
				currObj = eval(document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__" + monthName + "_" + row + "_" + col +  "I"));  //  FCUBS_12.1.0_21066833 added
                        currObj.value = "";
                        //currObj.className = gCSSReadOnly;
                        currObj.value = dayCnt;
                        currObj.tabIndex = tabIndex;
						currObj.removeAttribute('onkeydown');//FCUBS11.2_Cross_Browser#1
                        tabIndex++;

                        if(col == gWeeklyHol1 || col == gWeeklyHol2)
                        {
                            //currObj.className = gCSSHoliday;
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
			
                    var currRow = addNewRow("BLK_LOCAL_HOLIDAY");
                   // currRow.cells[1].getElementsByTagName("OJ-INPUT-TEXT")[0].value = document.getElementsByName("BRANCH_CODE")[0].value; //FCUBS_12.1.0_21066833 commented
                   currRow.cells[1].getElementsByTagName("OJ-INPUT-TEXT")[0].value = document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__BRANCH_CODE").value; // FCUBS_12.1.0_21066833 added
					//currRow.cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value = gYearRef.value;
                    //currRow.cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value = document.getElementsByName("YEAR")[0].value; //FCUBS_12.1.0_21066833 commented
					currRow.cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value = document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEARI").value;  // FCUBS_12.1.0_21066833 added
                    currRow.cells[3].getElementsByTagName("OJ-INPUT-TEXT")[0].value = monthCnt+1;
                    currRow.cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0].value = monthList;

                    //To clear the Existing unchanged values in the calendar
                    for(var tempCol = 0; tempCol < firstDay; tempCol++)
                    {
                        //strCell   = monthName + "_0_" + tempCol; //comment 9NT1587_FC_12.0.2_IUT BUGNo 16904799
						strCell   = monthName + "_0_" + tempCol +  "I"; //added 9NT1587_FC_12.0.2_IUT BUGNo 16904799 
                        //currObj = eval(strCell); ///FCUBS11.1 ITR1 SFR 831 //FCUBS11.2_Cross_Browser#1
				//currObj = eval(document.getElementsByName(strCell)[0]);//FCUBS11.2_Cross_Browser#1 FCUBS_12.1.0_21066833 commented
                currObj = eval(document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__" + monthName + "_0_" + tempCol +  "I")); // FCUBS_12.1.0_21066833 added      
						currObj.value         = "";
                        //currObj.className    = gCSSReadOnly;
                    }

                    if(col != 6) { col--; }

                    while(row <= 5)
                    {
                        for(var tempCol = col+1; tempCol < 7; tempCol++)
                        {
                            //strCell   = monthName + "_" + row + "_" + tempCol; //comment 9NT1587_FC_12.0.2_IUT BUGNo 16904799
							strCell   = monthName + "_" + row + "_" + tempCol + "I";  //added 9NT1587_FC_12.0.2_IUT BUGNo 16904799 
                           //currObj = eval(strCell); ///FCUBS11.1 ITR1 SFR 831  //FCUBS11.2_Cross_Browser#1
				    //currObj = eval(document.getElementsByName(strCell)[0]);//FCUBS11.2_Cross_Browser#1 //FCUBS_12.1.0_21066833 commented
					currObj = eval(document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__" + monthName + "_" + row + "_" + tempCol + "I"));// FCUBS_12.1.0_21066833 added
                            currObj.value         = "";
                            //currObj.className    = gCSSReadOnly;
                        }

                        tempCol = 0;
                        col     = -1;
                        row++;
                    }*/
						fnAddRow('BLK_LOCAL_HOLIDAY'); //Redwood_Changes
						}
							setTimeout( function () { //Set the data in all rows within setTimeout
					
							addNewCalenderMonth(getElementsByOjName("YEAR")[0].value, 
								document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__BRANCH_CODE").value ); 
								
							},1000); //REDWOOD_36876972
                
            }
            else if(gAction == "EXECUTEQUERY" || gAction == 'MODIFY' || gAction == '')
            {
		  
               // var tblRef = document.getElementById("BLK_LOCAL_HOLIDAY").tBodies[0];
                var tblRef = getTableObjForBlock("BLK_LOCAL_HOLIDAY").tBodies[0]; //Redwood_Changes
		  //var tblRef = selectNodes(document,'//table[@id="BLK_LOCAL_HOLIDAY"]/tbody/tr/td[3]/input');
                var dayStatus = '';
					var l_len = 0 //fnGetDays(0);since jan alwary contain 31 days //Redwood_Changes
                for(var monthCnt = 0; monthCnt<12; monthCnt++)
                {
				var cnt = tblRef.rows[monthCnt].cells[3].getElementsByTagName("OJ-INPUT-TEXT")[0].value -1 ; //113_GBPFBN_16202684 added
                   // firstDayInstance = new Date(inYear,monthCnt,1); //113_GBPFBN_16202684 commented
					firstDayInstance = new Date(inYear,cnt,1); //113_GBPFBN_16202684 added
					monthName        = fnGetMonthName(cnt); //113_GBPFBN_16202684 added
                  //  monthName        = fnGetMonthName(monthCnt);  //113_GBPFBN_16202684 commented
                  //  noDays = fnGetDays(monthCnt, inYear); //113_GBPFBN_16202684   commented
				    noDays = fnGetDays(cnt, inYear); //113_GBPFBN_16202684 added
                    //gets the integer equavalent of the particular day
                    firstDay        = firstDayInstance.getDay();
                    col = firstDay; // sets to the first daycnt of the month
                    row = 0;
		  //Redwood_Changes START
if(typeof(tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0]) == 'undefined')
			{
                        monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-TEXT-AREA")[0].value; //Redwood_Changes
                    }
			else
			{
                    		monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0].value;
                    }	
					lastDayInstance = new Date(inYear,monthCnt,noDays);
					lastDay = lastDayInstance.getDay();
                    l_len = Number(l_len) + Number(noDays);
					//Redwood_Changes END

                    //BUG#11896253 starts
					//monthList =    tblRef.rows[monthCnt].cells[3].getElementsByTagName("OJ-INPUT-TEXT")[0].value;
					// monthList =    tblRef.rows[monthCnt].cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value;
                    //BUG#11896253 ends
                    for(var dayCnt = 1; dayCnt <= noDays ; dayCnt++)
                    {
                        dayStatus = monthList.charAt((dayCnt-1));
                        //strCell   = monthName + "_" + row + "_" + col; //comment 9NT1587_FC_12.0.2_IUT BUGNo 16904799
						//strCell   = monthName + "_" + row + "_" + col + "I";   //added 9NT1587_FC_12.0.2_IUT BUGNo 16904799 
						strCell   = monthName + "_" + row + "_" + col;  
                        //currObj = eval(strCell); ///FCUBS11.1 ITR1 SFR 831 //FCUBS11.2_Cross_Browser#1
				//currObj = eval(document.getElementsByName(strCell)[0]);//FCUBS11.2_Cross_Browser#1 
				//currObj = eval(getElementsByOjName(strCell)[0]);//FCUBS11.2_Cross_Browser#1  //Redwood_Changes
				currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //Redwood_Changes
                        currObj.value = "";
                        currObj.value = dayCnt;
                        currObj.tabIndex = tabIndex;
                        //currObj.detachEvent('onkeydown',fnToggleFromKey); //FCUBS11.2_Cross_Browser#1
               //currObj.attachEvent('onkeydown',fnToggleFromKey); ///FCUBS11.1 ITR1 SFR 1130
						//currObj.setAttribute('onkeydown',fnToggleFromKey);//FCUBS11.2_Cross_Browser#1
				currObj.removeAttribute('onkeydown'); //FCUBS11.2_Cross_Browser#1
                        tabIndex++;
                       if(dayStatus == 'H')
                        {
                            //currObj.className = gCSSHoliday;
							currObj.classList.add(gCSSHoliday); //Redwood_Changes
						 currObj.classList.remove(gModified); //Redwood_Changes
                         currObj.classList.add("numeric"); //Redwood_Changes
                        }
                        else
                        {
                            //currObj.className    = gCSSReadOnly;
								currObj.classList.add(...gCSSReadOnly); //Redwood_Changes 
						currObj.classList.add("numeric"); //Redwood_Changes
                        }
						//9NT1587_FC_12.0.2_IUT BUGNo 16904799 starts --comment starts 
						/*if (dayStatus !=modDayStatus)
						{
							currObj.style.color = gModified;
							currObj.title = modDayStatus;
						}*/						
						//9NT1587_FC_12.0.2_IUT BUGNo 16904799 ends --comment ends
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
                        //strCell   = monthName + "_0_" + tempCol; //comment 9NT1587_FC_12.0.2_IUT BUGNo 16904799
						//strCell   = monthName + "_0_" + tempCol + "I"; //added 9NT1587_FC_12.0.2_IUT BUGNo 16904799 
						strCell   = monthName + "_0_" + tempCol;  //Redwood_Changes
                        //currObj = eval(strCell); ///FCUBS11.1 ITR1 SFR 831 //FCUBS11.2_Cross_Browser#1
				//currObj = eval(document.getElementsByName(strCell)[0]);//FCUBS11.2_Cross_Browser#1 
				//currObj = eval(getElementsByOjName(strCell)[0]);//FCUBS11.2_Cross_Browser#1 //Redwood_Changes
				currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //Redwood_Changes
                        currObj.value         = "";
                        //currObj.className    = gCSSReadOnly;
						currObj.classList.add(...gCSSReadOnly); //Redwood_Changes
                    }

                    if(col != 6) { col--; }

                    while(row <= 5)
                    {
                        tempCol = 0;
                        for(var tempCol = col+1; tempCol < 7; tempCol++)
                        {
                            //strCell   = monthName + "_" + row + "_" + tempCol;  //comment 9NT1587_FC_12.0.2_IUT BUGNo 16904799
							//strCell   = monthName + "_" + row + "_" + tempCol + "I"; //added 9NT1587_FC_12.0.2_IUT BUGNo 16904799 
							strCell   = monthName + "_" + row + "_" + tempCol; //Redwood_Changes
                            //currObj = eval(strCell);///FCUBS11.1 ITR1 SFR 831  //FCUBS11.2_Cross_Browser#1
				    //currObj = eval(document.getElementsByName(strCell)[0]);//FCUBS11.2_Cross_Browser#1
					// currObj = eval(getElementsByOjName(strCell)[0]);//FCUBS11.2_Cross_Browser#1 //Redwood_Changes
					currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //Redwood_Changes
 
                            currObj.value         = "";
                            //currObj.className    = gCSSReadOnly;
							currObj.classList.add(...gCSSReadOnly); //Redwood_Changes
                        }

                        //tempCol = 0;
                        col     = -1;
                        row++;
                    }
                }
            }
		//9NT1620#1203RETRO#19767144 changes starts			
	   else if (gAction == "VIEWMNTLOG") //
            {
			setTimeout( function () {
                //var tblRef = document.getElementById('BLK_LOCAL_HOLIDAY').tBodies[0];
                var tblRef = getTableObjForBlock('BLK_LOCAL_HOLIDAY').tBodies[0]; //Redwood_Changes
                var dayStatus = '';
				var modDayStatus = '';
				var regExp = new RegExp('[^HW]','g');
				var title = "";			    
                for(var monthCnt = 0; monthCnt<12; monthCnt++)
                {
					var cnt = tblRef.rows[monthCnt].cells[3].getElementsByTagName("OJ-INPUT-TEXT")[0].value -1;
					modifiedMonthList="";
                    //gets the first days instance of the given Month
                    firstDayInstance = new Date(inYear,cnt,1);
                    //gets the Month name
					monthName        = fnGetMonthName(cnt);
                    //monthName        = fnGetMonthName(monthCnt);
                    //gets the numbers of days for the given Month
                    noDays = fnGetDays(cnt, inYear);
                    //gets the integer equavalent of the particular day
                    firstDay        = firstDayInstance.getDay();
                    col = firstDay; // sets to the first daycnt of the month
                    row = 0;					
					
                    if(typeof(tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0]) == 'undefined')
					{
						//monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("TEXTAREA")[0].value;
						monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-TEXT-AREA")[0].value; //Redwood_Changes
                        //var innerHTML = tblRef.rows[monthCnt].cells[4].getElementsByTagName("TEXTAREA")[0].getAttribute("oldInnerHTML"); //Bug#34555322 changes
						//var oldTitle = tblRef.rows[monthCnt].cells[4].getElementsByTagName("TEXTAREA")[0].getAttribute("title"); //Bug#34555322 changes
					   var oldTitle = tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-TEXT-AREA")[0].getAttribute("title"); //Bug#34555322 changes//Redwood_Changes
						//var el = document.createElement(innerHTML); //Bug#34555322 changes
						//if (el.title != '') //Bug#34555322 changes
						if (oldTitle != '') //Bug#34555322 changes
							{
								//title = el.title; //Bug#34555322 changes
 								title = oldTitle; //Bug#34555322 changes
								if (!regExp.test(title) && title.length == monthList.length )
									{
										modifiedMonthList = title;
									}
							}
                    }
					else
					{
						monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0].value;
					   if (tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0].title !='') 
					   {
							title = tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0].title;
							if (!regExp.test(title) && title.length == monthList.length )
								{
									modifiedMonthList = tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0].title;
								}
							}

                    }
					
                    for(var dayCnt = 1; dayCnt <= noDays ; dayCnt++)
                    {
                        dayStatus = monthList.charAt((dayCnt-1));
						if (modifiedMonthList != '')
							modDayStatus= modifiedMonthList.charAt((dayCnt-1));
						else
							modDayStatus = monthList.charAt((dayCnt-1));
                        //strCell   = monthName + "_" + row + "_" + col;
						//strCell   = monthName + "_" + row + "_" + col + "I"; 
						strCell   = monthName + "_" + row + "_" + col; //Redwood_Changes
						//currObj = eval(document.getElementsByName(strCell)[0]);
						//currObj = eval(getElementsByOjName(strCell)[0]); //Redwood_Changes
						currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //Redwood_Changes
                        currObj.value = "";
                        currObj.value = dayCnt;
                        currObj.tabIndex = tabIndex;
						currObj.removeAttribute('onkeydown');
                        tabIndex++;
                        if(dayStatus == 'H')
                        {
                            //currObj.className = gCSSHoliday;//Redwood_Changes
							currObj.classList.add(gCSSHoliday); //Redwood_Changes
						 currObj.classList.remove(gModified); //Redwood_Changes
                         currObj.classList.add("numeric"); //Redwood_Changes
                        }
                        else
                        {
                            //currObj.className    = gCSSReadOnly;
							currObj.classList.remove(gCSSHoliday); //Redwood_Changes
                         currObj.classList.add("numeric"); //Redwood_Changes
                        }
						if (dayStatus !=modDayStatus)
						{
							currObj.style.color = gModified;
              currObj.classList.add(gModified);  //redwood_36876901
							currObj.title = modDayStatus;
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
                        //strCell   = monthName + "_0_" + tempCol;
						//strCell   = monthName + "_0_" + tempCol + "I";
						strCell   = monthName + "_0_" + tempCol; //Redwood_Changes
						//currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512
            	//currObj = eval(getElementsByOjName(strCell)[0]);//FC11.2,ITR2 SFR512 //Redwood_Changes
				//currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //Redwood_Changes
				currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //Redwood_Changes
                        currObj.value         = "";
                        //currObj.className    = gCSSReadOnly; //Redwood_Changes
						currObj.classList.add(...gCSSReadOnly); //Redwood_Changes
                    }

                    if(col != 6) { col--; }

                    while(row <= 5)
                    {
                        tempCol = 0;
                        for(var tempCol = col+1; tempCol < 7; tempCol++)
                        {
                            //strCell   = monthName + "_" + row + "_" + tempCol;
							//strCell   = monthName + "_" + row + "_" + tempCol + "I";
							strCell   = monthName + "_" + row + "_" + tempCol; //Redwood_Changes
							//currObj = eval(document.getElementsByName(strCell)[0]);
              currObj = eval(getElementsByOjName(strCell)[0]); //Redwood_Changes
                            currObj.value         = "";
                            //currObj.className    = gCSSReadOnly; //Redwood_Changes
							currObj.classList.add(...gCSSReadOnly); //Redwood_Changes
                        }
                        col     = -1;
                        row++;
                    }					
                }
				},0);
			} //9NT1620#1203RETRO#19767144 changes ends
        

    }
    else
    {//Year is left blank
        appendErrorCode('ST-COM013','YEAR');
        isValid = false;
    }

    if(isValid == false)
    {
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
        //document.getElementById("YEAR").select(); //Redwood_Changes
		getElementsByOjName("YEAR")[0].select(); //Redwood_Changes
    }

    gYearRef.tabIndex = tabIndex++;
  //  document.getElementById("BLK_LOCAL_HOLIDAY").tabIndex = tabIndex++;
   // document.forms[0].BTN_EXIT.tabIndex   = tabIndex++;
/*	 document.getElementsByName("BTN_EXIT")[0].tabIndex   = tabIndex++; //FCUBS11.1 ITR1 SFR 1130
	if(document.getElementsByName("YEAR")[0].readOnly == false) {
    document.getElementsByName("YEAR")[0].readOnly = true;*/
    getElementsByOjName("BTN_EXIT")[0].tabIndex   = tabIndex++; //FCUBS11.1 ITR1 SFR 1130 //Redwood_Changes
  	if(getElementsByOjName("YEAR")[0].readOnly == false) { //Redwood_Changes
    getElementsByOjName("YEAR")[0].readOnly = true; //Redwood_Changes
    }
}
//Redwood_Changes START
function fnToggleColor(currObj){
	 setTimeout( function () { fnToggleColorOJET(currObj); }, 0);
}
//Redwood_Changes END
/*
 * Toggle color when the user duble click on the day
 * and
 * Create holiday list of that particular month
 */
//function fnToggleColor(currObj)
function fnToggleColorOJET(currObj)
{
    if(gAction == "NEW" || gAction == "MODIFY")
    {
		
		
        var currObjName = currObj.name;
        var index = currObjName.indexOf("_");
        var day = 1;
		//if (//currObj.className != gCSSHoliday){ //Redwood_Changes
		//currObj.className = gCSSReadOnly; //Redwood_Changes
		//}
        if(currObj.value != "")
        {
            day = currObj.value;
			var monthName        = currObjName.substring(0, index);
			var month            = fnGetMonthIndex(monthName);
			var loopObj          = null;
			/*var currMonthCell    = document.getElementById("BLK_LOCAL_HOLIDAY").tBodies[0].rows[month].cells[4].getElementsByTagName("INPUT")[0];
			var inYear           = document.getElementById("BLK_LOCAL_HOLIDAY").tBodies[0].rows[month].cells[2].getElementsByTagName("INPUT")[0].value;
			*/
		  //Redwood_Changes START
	  	var currMonthCell;
			var inYear;
			var monthList; 
		
		try{
       currMonthCell    = getTableObjForBlock("BLK_LOCAL_HOLIDAY").tBodies[0].rows[month].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0]; //Redwood_Changes
			 inYear           = getTableObjForBlock("BLK_LOCAL_HOLIDAY").tBodies[0].rows[month].cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value; //Redwood_Changes
			 	monthList=currMonthCell.value;
					}
			catch(e){
				//monthList=getOjMeDataObject('BLK_STTMS_CCY_HOLIDAY')[month]['HOLIDAY_LIST'];
				//inYear=getOjMeDataObject('BLK_STTMS_CCY_HOLIDAY')[month]['YEAR'];
			}
			//Redwood_Changes END
			var firstDayInstance = new Date(inYear,month,1);

			col                  = firstDayInstance.getDay();

            //if(currObj.className == gCSSReadOnly) //Redwood_Changes
			if(currObj.classList.contains(gCSSHoliday)) //Redwood_Changes
            {
                //currObj.className = gCSSHoliday;
				currObj.classList.remove(gCSSHoliday); //Redwood_Changes
				currObj.classList.add(...gCSSReadOnly); //Redwood_Changes
				//currMonthCell.value = currMonthCell.value.substring(0,day-1) + "H" + currMonthCell.value.substring(day,currMonthCell.value.length)
					//monthList = monthList.substring(0,day-1) + "H" + monthList.substring(day,monthList.length) //Redwood_Changes
					monthList = monthList.substring(0,day-1) + "W" + monthList.substring(day,monthList.length) //Redwood_Changes
            }
            else
            {
                //currObj.className = gCSSReadOnly; //Redwood_Changes
					currObj.classList.add(gCSSHoliday); //Redwood_Changes
					currObj.classList.add(...gCSSReadOnly); //Redwood_Changes
				//currMonthCell.value = currMonthCell.value.substring(0,day-1) + "W" + currMonthCell.value.substring(day,currMonthCell.value.length)
				//monthList = monthList.substring(0,day-1) + "W" + monthList.substring(day,monthList.length) //Redwood_Changes
				monthList = monthList.substring(0,day-1) + "H" + monthList.substring(day,monthList.length) //Redwood_Changes
				
            }
			if(currMonthCell){
				currMonthCell.value=monthList;
            }
        }
    }
}

/*
 * Funtion to clear the calendar and set its default style
 */
function fnResetStyle()
{
    var monthName = "";
    var strCell   = "";
    var currObj   = null;
    //gYearRef      = document.getElementsByName("YEAR")[0];
    //gLblYearOf    = document.getElementsByName("YEAR")[0];
    gYearRef      = getElementsByOjName("YEAR")[0]; //Redwood_Changes
    gLblYearOf    = getElementsByOjName("YEAR")[0]; //Redwood_Changes
    
    for(var monthCnt = 0; monthCnt < 12 ;monthCnt++)
    {
        monthName = fnGetMonthName(monthCnt);

        for(var rowCnt = 0; rowCnt < 6; rowCnt++)
        {
            for(var colCnt = 0; colCnt < 7;colCnt++)
            {
                //strCell = monthName + "_" + rowCnt + "_" + colCnt; //comment 9NT1587_FC_12.0.2_IUT BUGNo 16904799
				//strCell = monthName + "_" + rowCnt + "_" + colCnt + "I";  //added 9NT1587_FC_12.0.2_IUT BUGNo 16904799
				strCell = monthName + "_" + rowCnt + "_" + colCnt;   //Redwood_Changes
                //currObj = eval(strCell);      ///FCUBS11.1 ITR1 SFR 831 //FCUBS11.2_Cross_Browser#1
		    //currObj = eval(document.getElementsByName(strCell)[0]);//FCUBS11.2_Cross_Browser#1
         //currObj = eval(getElementsByOjName(strCell)[0]);//FCUBS11.2_Cross_Browser#1 //Redwood_Changes
		 currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //Redwood_Changes
                //currObj.className = gCSSReadOnly;
					currObj.classList.add(...gCSSReadOnly);
                currObj.tabIndex  = -1;
            }
        }
    }

    gYearRef.tabIndex = -1;
 //   document.getElementById("BLK_LOCAL_HOLIDAY").tabIndex = -1;
   // document.forms[0].BTN_EXIT.tabIndex = -1; ///FCUBS11.1 ITR1 SFR 831
	//document.getElementsByName("BTN_EXIT")[0].tabIndex = -1;   ///FCUBS11.1 ITR1 SFR 1130
  	getElementsByOjName("BTN_EXIT")[0].tabIndex = -1;   ///FCUBS11.1 ITR1 SFR 1130 //Redwood_Changes
}

/*
 * Function  to validate year
 */
 /*
function fnValidateYear(year)		//Commented as a part of FC8.0LOT2ITR2 SFR 888
{
    var isValid = true;
    if(year != '' )
    {
        		
		if(isNumeric(year))
        {				
            if(year < 2000)
            {
                appendErrorCode('ST-CCH01','YEAR');
                isValid = true;  //Changed from false to true in order to save calender earlier than 2000.
                document.getElementById("YEAR").select();
            }
        }        
		else
        {
            appendErrorCode('ST-COM015','YEAR');
            isValid = false;
            document.getElementById("YEAR").select();
        }		
    }
    return isValid;

}
*/		//Commented as a part of FC8.0LOT2ITR2 SFR 888


/*
 * used to toggle the between holiday to working day using SPACEBAR
 */
function fnToggleFromKey()
{
    var srcElem = event.srcElement;
    if(event.keyCode == 32 && srcElem.value != "")
    {
        fnToggleColor(srcElem);
    }
    event.cancelBubble = true;
}



function fnPrevYear()
{
    if (gAction == "NEW")
    {
		//if(document.getElementsByName("YEAR")[0].value == "") //FCUBS_12.1.0_21066833 commented
		//if(document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEARI").value == "")  //FCUBS_12.1.0_21066833 added
		if(document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEAR").value == "")
		{
			alert("Please Enter valid Year");
			return false;
		}	
		// var inputYear = document.getElementsByName("YEAR")[0].value; //FCUBS_12.1.0_21066833 commented
		//var inputYear = document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEARI").value;  // FCUBS_12.1.0_21066833 added
		var inputYear = document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEAR").value;
		var curYear2 = parseInt(inputYear);
        curYear2 = curYear2 - 1;
        // document.getElementsByName("YEAR")[0].value = curYear2; //FCUBS_12.1.0_21066833 commented
		//document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEARI").value=curYear2; // FCUBS_12.1.0_21066833 added
		document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEAR").value=curYear2;  // FCUBS_12.1.0_21066833 added
		document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEAR").value=curYear2;  // FCUBS_12.1.0_21066833 added
		
		
        
    }
	displayCalendar();
return true;
}


function fnNextYear()
{
    if (gAction == "NEW")
    {
		// if(document.getElementsByName("YEAR")[0].value == "") //FCUBS_12.1.0_21066833 commented
		//if(document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEARI").value == "")  // FCUBS_12.1.0_21066833 added
		if(document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEAR").value == "")
		{
			alert("Please Enter valid Year");
			return false;
		}
		//var inputYear = document.getElementsByName("YEAR")[0].value; //FCUBS_12.1.0_21066833 commented
		//var inputYear = document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEARI").value; // FCUBS_12.1.0_21066833 added
		var inputYear = document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEAR").value; 
		var curYear2 = parseInt(inputYear);
        curYear2 = curYear2 + 1;
       // document.getElementsByName("YEAR")[0].value = curYear2; //FCUBS_12.1.0_21066833 commented
	   //document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEARI").value=curYear2;  // FCUBS_12.1.0_21066833 added
	   document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEAR").value=curYear2;
		document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__YEAR").value=curYear2;   // FCUBS_12.1.0_21066833 added
    }
	displayCalendar();
return true;	
}

function fnCalHolHeading() {
    var l_hol_head_list = new Array("SUNDAY1", "MONDAY1", "TUESDAY1", "WEDNESDAY1", "THURSDAY1", "FRIDAY1", "SATURDAY1",
                        "SUNDAY2", "MONDAY2", "TUESDAY2", "WEDNESDAY2", "THURSDAY2", "FRIDAY2", "SATURDAY2",
                        "SUNDAY3", "MONDAY3", "TUESDAY3", "WEDNESDAY3", "THURSDAY3", "FRIDAY3", "SATURDAY3");
    document.getElementById("BLK_LOCAL_HOLIDAY_MASTER").style.display="none";
    for (var i=0; i<l_hol_head_list.length; i++) {    
        //document.getElementsByName(l_hol_head_list[i])[0].className = "TEXTCalHead";
        getElementsByOjName(l_hol_head_list[i])[0].className = "TEXTCalHead"; //Redwood_Changes
    }
}
function setCss()
{   //Redwood_Changes start 
	//getElementsByOjName("SUNDAY1")[0].className = gCSSReadOnly;
	//getElementsByOjName("MONDAY1")[0].className = gCSSReadOnly;
	//getElementsByOjName("TUESDAY1")[0].className = gCSSReadOnly;
	//getElementsByOjName("WEDNESDAY1")[0].className = gCSSReadOnly;
	//getElementsByOjName("THURSDAY1")[0].className = gCSSReadOnly;
	//getElementsByOjName("FRIDAY1")[0].className = gCSSReadOnly;
	//getElementsByOjName("SATURDAY1")[0].className = gCSSReadOnly;
	//getElementsByOjName("SUNDAY2")[0].className = gCSSReadOnly;
	//getElementsByOjName("SUNDAY3")[0].className = gCSSReadOnly;
	//getElementsByOjName("MONDAY2")[0].className = gCSSReadOnly;
	//getElementsByOjName("MONDAY3")[0].className = gCSSReadOnly;
	//getElementsByOjName("TUESDAY2")[0].className = gCSSReadOnly;
	//getElementsByOjName("TUESDAY3")[0].className = gCSSReadOnly;
	//getElementsByOjName("WEDNESDAY2")[0].className = gCSSReadOnly;
	//getElementsByOjName("WEDNESDAY3")[0].className = gCSSReadOnly;
	//getElementsByOjName("THURSDAY2")[0].className = gCSSReadOnly;
	//getElementsByOjName("THURSDAY3")[0].className = gCSSReadOnly;
	//getElementsByOjName("FRIDAY2")[0].className = gCSSReadOnly;
	//getElementsByOjName("FRIDAY3")[0].className = gCSSReadOnly;
	//getElementsByOjName("SATURDAY2")[0].className = gCSSReadOnly;
	//getElementsByOjName("SATURDAY3")[0].className = gCSSReadOnly;
	
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
	//Redwood_Changes end
}

//9NT1620_12.0.3_18999439 function Start
function fnDefaultWeeklyHolidays(){
	 try
	 {
		debugs("In fnDefaultWeeklyHolidays", "A");
		var fcjRequestDOM;
		var fcjResponseDOM;

		var oldAction = gAction;
		var holList = "0-6";
		gAction = 'DEFAULT';
		appendData();
		fcjRequestDOM = buildUBSXml();
		fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		var wklyHolydaysList =getNodeText(selectSingleNode(fcjResponseDOM,"//FCUBS_RES_ENV/FCUBS_BODY/REC/FV"));
			
		if  (wklyHolydaysList)
		{
			/*
			wklyHolydaysList = wklyHolydaysList.split('~').join('');
			var wekholsprtr= wklyHolydaysList.substring(7,10);
			gWeeklyHol1 = wklyHolydaysList.substring(7,8);
			gWeeklyHol2 = wklyHolydaysList.substring(9,10);
			document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__WEEKLY_HOLIDAYS").value=wekholsprtr.replace('-','');
			*/ //Common_Entity_Length_Changes Commented
			
			//Common_Entity_Length_Changes Start
			let wklyHolydaysArr = wklyHolydaysList.split('~',3);
			var wekholsprtr = wklyHolydaysArr[2];
			gWeeklyHol1 = wekholsprtr.substring(0,1);
			gWeeklyHol2 = wekholsprtr.substring(2,3);
			document.getElementById("BLK_LOCAL_HOLIDAY_MASTER__WEEKLY_HOLIDAYS").value=wekholsprtr.replace('-','');
			//Common_Entity_Length_Changes End
			
			gAction = oldAction;
		}	
	  }catch(e) 
	  {
	  	  gWeeklyHol1 = 0 ; 	
		  gWeeklyHol2 = 6 ;		 
		  gAction = oldAction;
		  debugs("TAP Exception In frontend", "A")
		  debugs("Error: " + e.description,"A" );  
	  }
      
}
//9NT1620_12.0.3_18999439 function End

//9NT1587_12.0.2_17211558 start
function fnPostLoad_CVS_MAIN_VIEWLOG() {

	 var codes = new Array();

	 createDOM(dbStrRootTableName);

	 codes = parent.screenArgs['KEY'].split("|");

	 if (codes.length > 0)
	 {
		  //document.getElementsByName("BRANCH_CODE")[0].value = codes[0];
		  //document.getElementsByName("YEAR")[0].value = codes[1];
		  getElementsByOjName("BRANCH_CODE")[0].value = codes[0]; //Redwood_Changes
		  getElementsByOjName("YEAR")[0].value = codes[1]; //Redwood_Changes      
	 }
	  //document.getElementsByName("MODNO")[0].value = parent.screenArgs['MOD_NO'];
    getElementsByOjName("MODNO")[0].value = parent.screenArgs['MOD_NO']; //Redwood_Changes
	  gAction = 'VIEWMNTLOG';
	  functionId = 'STDLOCHL' ;  

	var relationArray = new Array(); 			// {Table Name} is the array index, {Parent Table Name}~{Relation} is the array value 
relationArray['BLK_LOCAL_HOLIDAY_MASTER'] = ""; 
relationArray['BLK_LOCAL_HOLIDAY'] = "BLK_LOCAL_HOLIDAY_MASTER~N"; 

var dataSrcLocationArray = new Array(); 	// Array of all Data Sources used in the screen 
dataSrcLocationArray[0] = "BLK_LOCAL_HOLIDAY_MASTER"; 
dataSrcLocationArray[1] = "BLK_LOCAL_HOLIDAY"; 


	//appendData(document.getElementById("TBLPageAll"));
  /*
	appendTextFieldValue(document.getElementsByName('BRANCH_CODE')[0], 1, 'BLK_LOCAL_HOLIDAY_MASTER');
	appendTextFieldValue(document.getElementsByName('YEAR')[0], 1, 'BLK_LOCAL_HOLIDAY_MASTER');	
	appendTextFieldValue(document.getElementsByName('MODNO')[0], 1, 'BLK_LOCAL_HOLIDAY_MASTER');	
  */
  appendTextFieldValue(getElementsByOjName('BRANCH_CODE')[0], 1, 'BLK_LOCAL_HOLIDAY_MASTER'); //Redwood_Changes
	appendTextFieldValue(getElementsByOjName('YEAR')[0], 1, 'BLK_LOCAL_HOLIDAY_MASTER');	//Redwood_Changes
	appendTextFieldValue(getElementsByOjName('MODNO')[0], 1, 'BLK_LOCAL_HOLIDAY_MASTER');	//Redwood_Changes

	//  dbFCJDOM.loadXML(dbDataDOM.xml);
	fcjRequestDOM = buildUBSXml();

	// Post the XML to Server
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);

	if(fcjResponseDOM) {
		var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));

		if (msgStatus == 'FAILURE') {
			var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
		    var returnVal = displayResponse(messageNode);
	    }

		if(msgStatus == 'SUCCESS') {
			var authResDom = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
			setDataXML(getXMLString(authResDom));
			mainWin.Authdom = null;
			resetIndex();
			//showTabData_Viewchg();
			viewMnt = true;
			showData();
	        gAction = "";
		}
	//disableForm();
  }
}
//9NT1587_12.0.2_17211558 end


 function setOjetStyles(id){
	var ids= new Array( 'TAB_MAIN__SEC_JAN_FEB_MAR','TAB_MAIN__SEC_APR_MAY_JUN','TAB_MAIN__SEC_JUL_AUG_SEP','TAB_MAIN__SEC_OCT_NOV_DEC');
	ids.forEach(id=>setOjetStylesById(id));
}

function setOjetStylesById(id){
	//var daysDivObject =document.getElementById(id).getElementsByClassName("oj-flex-bar oj-sm-width-full");
    var daysDivObject = document.getElementsByClassName("oj-flex-bar oj-sm-width-full");
    for(var i=0; i< daysDivObject.length; i++){
        if(daysDivObject[i].children.length == 7){
            var daysDivChildObject  = daysDivObject[i].children;
            for(var j=0; j< daysDivChildObject.length; j++){ //redwood_35657123 //redwood_36876901 j=0
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