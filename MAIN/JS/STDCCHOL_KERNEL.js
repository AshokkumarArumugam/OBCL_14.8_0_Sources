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
**  File Name          : STDCCHOL_SYS.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

** Modified By         : Vijeta S
** Modified On         : 26-Jul-2022
** Modified Reason     : Fix provided to display toolbar when operation is cancelled in Currency Holiday Calendar maintenance screen (STDCCHOL).
** Search String       : Bug#34311264

** Modified By         : Akshay Trivedi
** Modified On         : 25-Aug-2022
** Modified Reason     : Fix provided to display the view changes (in blue colour) in Currency Holiday Calendar maintenance screen (STDCCHOL).
** Search String       : Bug#34555322

** Modified  By         : Manoj
** Modified  On         : 08-feb-2023
** Modified Reason      : Redwood Changes done 
** Search String        : redwood_changes

**
** Modified  By         : Girish
** Modified  On         : 11-Aug-2023
** Modified Reason      : Redwood Changes done 
** Search String        : redwood_35657123
**
**
** Modified  By         : Girish
** Modified  On         : 15-Sep-2023
** Modified Reason      : Redwood Changes done 
** Search String        : redwood_35763168
**
**
** Modified  By         : Girish
** Modified  On         : 08-Jan-2025
** Modified Reason      : Redwood Changes done 
** Search String        : REDWOOD_36876972
                          redwood_36876901
****************************************************************************************************************************/

var gErrCodes = "";
var gCCYRef         = null;
var gYearRef           = null;
var gWeeklyHol1        = 0;
var gWeeklyHol2        = 6;
//var gCSSReadOnly    = "TXTro";
//var gCSSHoliday        = "TextHoliday";
//var gCSSReadOnly         = "TextReadonly";
//var gCSSHoliday          = "TextHoliday";

//var gCSSReadOnly	= "TXTro numeric"; //17043238
//var gCSSHoliday		= "TXTro numeric TxtHD"; //17043238
//var gCSSHalfday          = "TXTro numeric TxtHFD";//FCUBS_12.0.2_#17043238 Changes

//var gCSSReadOnly = ['TXTro'];
var gCSSReadOnly = []; //Redwood_Changes
var gCSSHoliday ="calendarHoliday"; //Redwood_Changes
var gModified = "viewchanges-modified"; //Redwood_Changes
var gCSSHalfday ="viewchanges-halfday"; //redwood_35763168

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
var gModified = "#1f77FF";  //Bug#34555322
function fnPostLoad_KERNEL() {
	try{ //Bug#34555322
/*
	document.getElementById("dataContainer_BLK_STTMS_CCY_HOLIDAY").style.display="none";
	document.getElementById("dataContainer_BLK_STTMS_CCY_HOLIDAY").style.height = '0px';
	document.getElementById("dataContainer_BLK_STTMS_CCY_HOLIDAY").style.overflow = 'hidden';
	document.getElementById("BLK_STTMS_CCY_HOLIDAY").firstChild.nextSibling.style.display = 'none';
	document.getElementById("dataContainer_BLK_STTMS_CCY_HOLIDAY").firstChild.firstChild.style.display = 'none';
  */
	//FCUBS12.3Payments_Hide_HolidayList ends
	
	//gYearRef = document.getElementsByName("YEAR")[0]; //Redwood_Changes
     
	gYearRef = document.getElementsByName("YEAR")[0];
	} //Bug#34555322
	catch(e){} //Bug#34555322
	//Bug#34555322 changes starts 
	if (viewMnt) 
	{
	  gAction="VIEWMNTLOG";
           setTimeout( function () {//redwood_36876901 starts
            displayCalendar();
	},10);//redwood_36876901 Ends
 
	}
	//Bug#34555322 changes ends	  
    document.getElementById("TAB_MAIN__SEC_BRN_YEAR_REFBTN").style.display="none"; //Redwood_Changes
    document.getElementById("TAB_MAIN__SEC_GRID__P1").style.visibility="hidden"; //Redwood_Changes
	setOjetStyles(); 
    displayCalendar();
	setCss();
	return true;
}
function fnPostNew_KERNEL(){
//Bug_22937194  Starts
//    getElementsByOjName("YEAR")[0].value = parent.AppDate.substr(0,4); 
    document.getElementById("BLK_STTMS_CCY_HOL_MASTER__YEAR").value  = parent.AppDate.substr(0,4); 
    fireHTMLEvent(document.getElementById('BLK_STTMS_CCY_HOL_MASTER__YEAR'), "onpropertychange");
     appendData();
//Bug_22937194  Ends
		return true;
}
function fnPostUnlock_KERNEL() {
	fnDisableElement(getElementsByOjName('BTN_GO')[0]); //Redwood_Changes
	getElementsByOjName("CCY")[0].readOnly = true; //Redwood_Changes
	getElementsByOjName("YEAR")[0].readOnly = true; //Redwood_Changes
	displayCalendar();
	return true;
}
function fnPostClose_KERNEL() {
	displayCalendar();
	return true;
}

function fnPostReOpen_KERNEL() {
	displayCalendar();
	return true;
}

function fnPostAuthorize_KERNEL(){
	displayCalendar();
	return true;
}
//21439734
/*
function fnPostCopy_KERNEL(){
 document.getElementById('BLK_STTMS_CCY_HOL_MASTER__COUNTRY_OFFICE_CODE').value =  mainWin.countryCode; /*countryOfficeCode; ZENGIN CHANGES Srinidhi Rao //testing country
return true;
}
//21439734
*/
/*
 * Called to perform some neccessary operation after the fnEnterQuery() Action event
 * Specific to the functionid
 */
function fnPostEnterQuery_KERNEL(){

    getElementsByOjName("YEAR")[0].value = parent.AppDate.substr(0,4);  //Redwood_Changes
		return true;
}
function fnPostExecuteQuery_KERNEL(){

   displayCalendar();
	return true;
}
function fnPostSave_KERNEL(){
	displayCalendar();
	return true;
}
function fnPreExecuteQuery_KERNEL(){
	//displayCalendar();
	 // Bug_22954654 changes commented
	return true;
}
function fnPreUnlock_KERNEL(){
	displayCalendar();
	return true;
}
function fnPreSave_KERNEL() {
    if(!isRefresh && gAction =='NEW'){
        //alert("Please Input the Calendar values.");
		showErrorAlerts('IN-HEAR-402');
        return false;
    }
    setChildKeyValues("STTMS_CCY_HOL_MASTER","CCY","CCY");
    setChildKeyValues("STTMS_CCY_HOL_MASTER","YEAR","YEAR");
    var yearVal        = getElementsByOjName("YEAR").value; //Redwood_Changes
	
	gyearValue    = yearVal;
    gYearRef      = yearVal;

    displayCalendar();
    return true;
}
/*
 *Returns number of days of a given month
 *inMonth - Numeric equvalent of Month
 *inYear  - Current Year
 */
function fnGetDays(inMonth,inYear){
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
 */											  
 function displayCalendar(){
	 displayCalendarOJET();
}
					
function addNewCalenderMonth(year, ccy ){
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
	
	for(let monthCnt = 0; monthCnt<12; monthCnt++){
					firstDayInstance = new Date(inYear,monthCnt,1);
                    monthName = fnGetMonthName(monthCnt);
                    noDays = fnGetDays(monthCnt, inYear);
                    firstDay = firstDayInstance.getDay();
                    col = firstDay;
                    row = 0;
                    monthList = "";
                    for(var dayCnt = 1; dayCnt <= noDays ; dayCnt++){
                
						strCell = monthName + "_" + row + "_" + col ; //17043238 //redwood_changes
						currObj   = eval("getElementsByOjName('" + strCell+"')[0]");  //redwood_changes
                        currObj.value = "";
						currObj.classList.add(...gCSSReadOnly); //redwood_changes
                        currObj.value = dayCnt;
                        currObj.tabIndex = tabIndex;
						
						addEvent(currObj, "onkeydown", "fnToggleFromKey(this,event)"); //redwood_changes
                        tabIndex++;
                       
						if(col == gWeeklyHol1 || col == gWeeklyHol2){//FCUBS_12.0.2_#17043238 Changes 
					        //currObj.className = gCSSHoliday;
							currObj.classList.remove(gModified);
							currObj.classList.add(gCSSHoliday);
                            monthList += "H";
                        }
                        else{
							currObj.classList.remove(gCSSHoliday);
							currObj.classList.remove(gModified);
                            monthList += "W";
                        }
                        if(col == 6){
                            col = 0;
                            row = row + 1;
                        }
                        else{
                            col = col + 1;
                        }
                    }

						//var i=(getTableObjForBlock("BLK_STTMS_CCY_HOLIDAY").tBodies[0].rows.length)-1;
						var rowno=monthCnt;
						var currRow=getTableObjForBlock("BLK_STTMS_CCY_HOLIDAY").tBodies[0].rows[rowno];
					
					//currRow.cells[1].getElementsByTagName("OJ-INPUT-TEXT")[0].value = getElementsByOjName("YEAR")[0].value; //redwood_changes
					currRow.cells[1].getElementsByTagName("OJ-INPUT-TEXT")[0].value = year;
                    currRow.cells[2].getElementsByTagName("OJ-INPUT-TEXT")[0].value = monthCnt+1; //redwood_changes
                    currRow.cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0].value = monthList; //redwood_changes
					
					//currRow.cells[3].getElementsByTagName("OJ-INPUT-TEXT")[0].value = getElementsByOjName("CCY")[0].value; //redwood_changes
					currRow.cells[3].getElementsByTagName("OJ-INPUT-TEXT")[0].value = ccy; //redwood_changes
					 
					
					//To clear the Existing unchanged values in the calendar
                    for(var tempCol = 0; tempCol < firstDay; tempCol++){
                      
						strCell   = monthName + "_0_" + tempCol; //17043238 //redwood_changes
                 
						currObj   = eval("getElementsByOjName('" + strCell+"')[0]");  //redwood_changes
                        currObj.value         = "";
                        
						currObj.classList.add(...gCSSReadOnly); //redwood_changes
                    }
                    if(col != 6){ 
						col--; 
					}
                    while(row <= 5){
                        for(var tempCol = col+1; tempCol < 7; tempCol++){
                            //strCell   = monthName + "_" + row + "_" + tempCol + "I"; //17043238  //redwood_changes
							strCell   = monthName + "_" + row + "_" + tempCol ; //17043238  //redwood_changes
							//currObj = eval(document.getElementsByName(strCell)[0]);  //redwood_changes
							currObj   = eval("getElementsByOjName('" + strCell+"')[0]");  //redwood_changes
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

function displayCalendarOJET(){
   var curYear2  = getElementsByOjName("YEAR")[0].value;
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
    if(inYear != ""){
       if(gAction =="NEW"){
		  isRefresh = true;
		  deleteAllRows("BLK_STTMS_CCY_HOLIDAY");
                for(var monthCnt = 0; monthCnt<12; monthCnt++){
                   /* firstDayInstance = new Date(inYear,monthCnt,1);
                    monthName = fnGetMonthName(monthCnt);
                    noDays = fnGetDays(monthCnt, inYear);
                    firstDay = firstDayInstance.getDay();
                    col = firstDay;
                    row = 0;
                    monthList = "";
                    for(var dayCnt = 1; dayCnt <= noDays ; dayCnt++){
                        strCell = monthName + "_" + row + "_" + col + "I"; //17043238
						currObj = eval(document.getElementsByName(strCell)[0]); 
                        currObj.value = "";
                        currObj.className = gCSSReadOnly;
                        currObj.value = dayCnt;
                        currObj.tabIndex = tabIndex;
						currObj.removeAttribute('onkeydown'); 
						currObj.setAttribute('onkeydown',"fnToggleFromKey()");
                        tabIndex++;
                        //if(col == gWeeklyHol1 || col == gWeeklyHol2){//FCUBS_12.0.2_#17043238 Changes
						if(col == gWeeklyHol1 || col == gWeeklyHol2){//FCUBS_12.0.2_#17043238 Changes 
					        currObj.className = gCSSHoliday;
                            monthList += "H";
                        }
                        else{

                            monthList += "W";
                        }
                        if(col == 6){
                            col = 0;
                            row = row + 1;
                        }
                        else{
                            col = col + 1;
                        }
                    }
			        var currRow = addNewRow("BLK_STTMS_CCY_HOLIDAY");
                    currRow.cells[1].getElementsByTagName("INPUT")[0].value = document.getElementsByName("YEAR")[0].value;
                    currRow.cells[2].getElementsByTagName("INPUT")[0].value = monthCnt+1;
                    currRow.cells[4].getElementsByTagName("INPUT")[0].value = monthList;
					currRow.cells[3].getElementsByTagName("INPUT")[0].value = document.getElementsByName("CCY")[0].value;
                    //currRow.cells[5].getElementsByTagName("INPUT")[0].value =  mainWin.CurrentBranch; //testing
					//To clear the Existing unchanged values in the calendar
                    for(var tempCol = 0; tempCol < firstDay; tempCol++){
                        strCell   = monthName + "_0_" + tempCol + "I"; //17043238
                        currObj = eval(document.getElementsByName(strCell)[0]); 
                        currObj.value         = "";
                        currObj.className    = gCSSReadOnly;
                    }
                    if(col != 6){ 
						col--; 
					}
                    while(row <= 5){
                        for(var tempCol = col+1; tempCol < 7; tempCol++){
                            strCell   = monthName + "_" + row + "_" + tempCol + "I"; //17043238
							currObj = eval(document.getElementsByName(strCell)[0]); 
                            currObj.value         = "";
                            currObj.className    = gCSSReadOnly;
                        }
                        tempCol = 0;
                        col     = -1;
                        row++; 
*/						 
fnAddRow('BLK_STTMS_CCY_HOLIDAY');
                    }	
setTimeout( function () { //Set the data in all rows within setTimeout
					
							addNewCalenderMonth(getElementsByOjName("YEAR")[0].value, 
								getElementsByOjName("CCY")[0].value ); 
								
							},1000); //REDWOOD_36876972
                
            }
            else if(gAction == "EXECUTEQUERY" || gAction == 'MODIFY' || gAction == ''){
                var tblRef = getTableObjForBlock("BLK_STTMS_CCY_HOLIDAY").tBodies[0]; //Redwood_Changes
	            var dayStatus = '';
				//var startPos1 = 0;
				var l_len = 0 //fnGetDays(0);since jan alwary contain 31 days
			setTimeout( function () { 	//redwood_36876901
                for(var monthCnt = 0; monthCnt<12; monthCnt++){
                    //gets the first day's instance of the given Month
                    firstDayInstance = new Date(inYear,monthCnt,1);
                    //gets the Month name
                    monthName        = fnGetMonthName(monthCnt);
                    //gets the numbers of days for the given Month
                  	noDays            = fnGetDays(monthCnt,inYear);  
                    //gets the integer equavalent of the particular day
                    firstDay        = firstDayInstance.getDay();
                    col = firstDay; // sets to the first daycnt of the month
                    row = 0;
		// Bug_22954654 changes starts
		//if(typeof(tblRef.rows[monthCnt].cells[3].getElementsByTagName("INPUT")[0]) == undefined){
			//redwood_changes START
				try{
               if(typeof(tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0]) == "undefined"){
	       // Bug_22954654 changes ends
					monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-TEXT-AREA")[0].value;
                }
				else{
                   monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0].value;
                }
				}
				catch(e){
					//monthList=getOjMeDataObject('BLK_STTMS_CCY_HOLIDAY')[monthCnt]['HOLIDAY_LIST'];
				}
				
					
					lastDayInstance = new Date(inYear,monthCnt,noDays);
					lastDay = lastDayInstance.getDay();
                    l_len = Number(l_len) + Number(noDays);
					
					//redwood_changes END
                for(var dayCnt = 1; dayCnt <= noDays ; dayCnt++){
                    dayStatus = monthList.charAt((dayCnt-1));
                   // strCell   = monthName + "_" + row + "_" + col + "I"; //redwood_changes
				    strCell   = monthName + "_" + row + "_" + col ; //redwood_changes
					//currObj = eval(document.getElementsByName(strCell)[0]);  //redwood_changes
					//currObj = eval(getElementsByOjName(strCell)[0]);  //redwood_changes
					currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //redwood_changes
                    currObj.value = "";
                    currObj.value = dayCnt;
                    currObj.tabIndex = tabIndex;
					//currObj.removeAttribute('onkeydown');  //redwood_changes
					//currObj.setAttribute('onkeydown',"fnToggleFromKey()");  //redwood_changes
					addEvent(currObj, "onkeydown", "fnToggleFromKey(this,event)");  //redwood_changes
					tabIndex++;
					if(dayStatus == 'H'){
					    // currObj.className = gCSSHoliday;
						 currObj.classList.add(gCSSHoliday);
						 currObj.classList.remove(gModified);
                         currObj.classList.add("numeric");
					 }
					//FCUBS_12.0.2_#17043238 Changes Starts
					else if (dayStatus == 'S'){
						//currObj.className = gCSSHalfday;
						 currObj.classList.add(gCSSHalfday); //redwood_35763168
						currObj.classList.remove(gCSSHoliday);						
						//currObj.classList.add(gModified); //redwood_35763168
						currObj.classList.add("numeric");
					}
					else{
                        //currObj.className    = gCSSReadOnly;
						currObj.classList.add(...gCSSReadOnly); 
						 currObj.classList.remove(gModified); //Redwood_Changes
						currObj.classList.add("numeric");
                    }
					//FCUBS_12.0.2_#17043238 Changes Ends
                   if(col == 6){
                     col = 0;
                     row = row + 1;
                   }
                   else{
                      col = col + 1;
                   }
               }
				//To clear the Existing unchanged values and style of the calendar
                for(var tempCol = 0; tempCol < firstDay; tempCol++){
                   // strCell   = monthName + "_0_" + tempCol + "I"; //17043238 //redwood_changes
				    strCell   = monthName + "_0_" + tempCol ; //17043238 //redwood_changes
                    //currObj = eval(document.getElementsByName(strCell)[0]); //redwood_changes
					//currObj = eval(getElementsByOjName(strCell)[0]); //redwood_changes
					currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //redwood_changes
					currObj.value         = "";
                    //currObj.className    = gCSSReadOnly;
					currObj.classList.add(...gCSSReadOnly);
				}
				if(col != 6) { col--; }
                    while(row <= 5) {
                        tempCol = 0;
                        for(var tempCol = col+1; tempCol < 7; tempCol++){
                            //strCell   = monthName + "_" + row + "_" + tempCol + "I"; //17043238 //redwood_changes
							strCell   = monthName + "_" + row + "_" + tempCol ; //17043238 //redwood_changes
							//currObj = eval(document.getElementsByName(strCell)[0]); //redwood_changes
							//currObj = eval(getElementsByOjName(strCell)[0]); //redwood_changes
							currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //redwood_changes
                             currObj.value         = "";
                            currObj.className    = gCSSReadOnly;
                        }
                        col     = -1;
                        row++;
                    }
                }
				},500); //redwood_36876901

            }
			//Bug#34555322 starts
		else if (gAction == "VIEWMNTLOG") //
            {
                       // var tblRef = document.getElementById('BLK_STTMS_CCY_HOLIDAY').tBodies[0];
                var tblRef = getTableObjForBlock('BLK_STTMS_CCY_HOLIDAY').tBodies[0]; //Redwood_Changes //redwood_36876901
               
                var dayStatus = '';
				var modDayStatus = '';
				var regExp = new RegExp('[^HW]','g');
				var title = "";			   
        	setTimeout( function () { 	//redwood_36876901 
                for(var monthCnt = 0; monthCnt<12; monthCnt++)
                {
					modifiedMonthList="";
                    //gets the first days instance of the given Month
                    firstDayInstance = new Date(inYear,monthCnt,1);
                    //gets the Month name
					monthName        = fnGetMonthName(monthCnt);
                    //monthName        = fnGetMonthName(monthCnt);
                    //gets the numbers of days for the given Month
                    noDays = fnGetDays(monthCnt, inYear);
                    //gets the integer equavalent of the particular day
                    firstDay        = firstDayInstance.getDay();
                    col = firstDay; // sets to the first daycnt of the month
                    row = 0;					
					
                    if(typeof(tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0]) == 'undefined')			 //Redwood_Changes
					{
						monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-TEXT-AREA")[0].value;	 //Redwood_Changes
						var oldTitle = tblRef.rows[monthCnt].cells[4].getElementsByTagName("OJ-TEXT-AREA")[0].getAttribute("title");  //Redwood_Changes

						if (oldTitle != '') 
							{
								title = oldTitle;
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
						//strCell   = monthName + "_" + row + "_" + col + "I"; 
						//currObj = eval(document.getElementsByName(strCell)[0]);
                        strCell   = monthName + "_" + row + "_" + col; //Redwood_Changes
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
              currObj.classList.add(gModified); //redwood_36876901
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
					//strCell   = monthName + "_0_" + tempCol + "I";
						strCell   = monthName + "_0_" + tempCol; //Redwood_Changes
						//currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512
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
                	},500); //redwood_36876901
			} //Bug#34555322 changes ends
        	
        }
    else{//Year is left blank
        appendErrorCode('ST-COM013','YEAR');
        isValid = false;
    }
    if(isValid == false){
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
       // document.getElementById("YEAR").select(); //redwood_changes
		getElementsByOjName("YEAR")[0].select(); //redwood_changes
    }
    gYearRef.tabIndex = tabIndex++;
	/*
   document.getElementsByName("BTN_EXIT")[0].tabIndex   = tabIndex++;  
	if(document.getElementsByName("YEAR")[0].readOnly == false) {
		document.getElementsByName("YEAR")[0].readOnly = true;
    }		   
	*/
   getElementsByOjName("BTN_EXIT")[0].tabIndex   = tabIndex++;  //Redwood_Changes
	if(getElementsByOjName("YEAR")[0].readOnly == false) { //Redwood_Changes
		getElementsByOjName("YEAR")[0].readOnly = true; //Redwood_Changes
    }
}

function fnToggleColor(currObj){
	 setTimeout( function () { fnToggleColorOJET(currObj); }, 0);
	//fnToggleColorOJET(currObj);
}

/*
 * Toggle color when the user duble click on the day
 * and
 * Create holiday list of that particular month
 */
function fnToggleColorOJET(currObj){
    if(gAction == "NEW" || gAction == "MODIFY"){
        var currObjName = currObj.name;
        var index = currObjName.indexOf("_");
        var day = 1;
		//FCUBS_12.0.2_#17043238 Changes Starts
		/*if (currObj.className != gCSSHoliday){
		//currObj.className = gCSSReadOnly;
		}*/
		//FCUBS_12.0.2_#17043238 Changes Ends
        if(currObj.value != ""){
            day = currObj.value;
			var monthName        = currObjName.substring(0, index);
			var month            = fnGetMonthIndex(monthName);
			var loopObj          = null;
			//var currMonthCell    = document.getElementById("BLK_STTMS_CCY_HOLIDAY").tBodies[0].rows[month].cells[4].getElementsByTagName("INPUT")[0];
			//var inYear           = document.getElementById("BLK_STTMS_CCY_HOLIDAY").tBodies[0].rows[month].cells[1].getElementsByTagName("INPUT")[0].value;
			var currMonthCell;
			var inYear;
			var monthList;
			try{
				currMonthCell    = getTableObjForBlock("BLK_STTMS_CCY_HOLIDAY").tBodies[0].rows[month].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0]; //redwood_changes
				 inYear          = getTableObjForBlock("BLK_STTMS_CCY_HOLIDAY").tBodies[0].rows[month].cells[1].getElementsByTagName("OJ-INPUT-TEXT")[0].value; //redwood_changes
				monthList=currMonthCell.value;
			}
			catch(e){
				//monthList=getOjMeDataObject('BLK_STTMS_CCY_HOLIDAY')[month]['HOLIDAY_LIST'];
				//inYear=getOjMeDataObject('BLK_STTMS_CCY_HOLIDAY')[month]['YEAR'];
			}
			
			
			var firstDayInstance = new Date(inYear,month,1);
			col                  = firstDayInstance.getDay();
			//if(currObj.className == gCSSReadOnly){
			if(currObj.classList.contains(gCSSHoliday)){
                //currObj.className = gCSSHalfday ;
				currObj.classList.remove(gCSSHoliday); 
				//currObj.classList.add(...gCSSReadOnly); //redwood_35763168
			//	currObj.classList.add(gModified); //redwood_35763168
      	currObj.classList.add(gCSSHalfday); //redwood_35763168
                //currMonthCell.value = currMonthCell.value.substring(0,day-1) + "S" + currMonthCell.value.substring(day,currMonthCell.value.length);
				monthList = monthList.substring(0,day-1) + "S" + monthList.substring(day,monthList.length)
            }
			//else if(currObj.classList.contains(gCSSReadOnly)){
			else if(!(currObj.classList.contains(gCSSHoliday) || currObj.classList.contains(gCSSHalfday))){ //redwood_35763168
                //currObj.className = gCSSHoliday;
				currObj.classList.add(gCSSHoliday);
				//currMonthCell.value = currMonthCell.value.substring(0,day-1) + "H" + currMonthCell.value.substring(day,currMonthCell.value.length)
				monthList = monthList.substring(0,day-1) + "H" + monthList.substring(day,monthList.length)
		    }
			//FCUBS_12.0.2_#17043238 Changes Starts
			//else if (currObj.className == gCSSHoliday){
			
			//FCUBS_12.0.2_#17043238 Changes Ends
            else{
                //currObj.className = gCSSReadOnly;
				currObj.classList.add(...gCSSReadOnly);
				//currObj.classList.remove(gModified); //redwood_35763168
        	currObj.classList.remove(gCSSHalfday); //redwood_35763168
				//currMonthCell.value = currMonthCell.value.substring(0,day-1) + "W" + currMonthCell.value.substring(day,currMonthCell.value.length);
				monthList = monthList.substring(0,day-1) + "W" + monthList.substring(day,monthList.length)
			}
			if(currMonthCell){
				currMonthCell.value=monthList;
			}
			/*
			else{
				getOjMeDataObject('BLK_STTMS_CCY_HOLIDAY')[month]['HOLIDAY_LIST']=monthList;
			}
			*/
        }
    }
}

 

function fnToggleColor_old(currObj){
    if(gAction == "NEW" || gAction == "MODIFY"){
        var currObjName = currObj.name;
        var index = currObjName.indexOf("_");
        var day = 1;
		//FCUBS_12.0.2_#17043238 Changes Starts
		/*if (currObj.className != gCSSHoliday){
		currObj.className = gCSSReadOnly;
		}*/
		//FCUBS_12.0.2_#17043238 Changes Ends
        if(currObj.value != ""){
            day = currObj.value;
			var monthName        = currObjName.substring(0, index);
			var month            = fnGetMonthIndex(monthName);
			var loopObj          = null;
			//var currMonthCell    = document.getElementById("BLK_STTMS_CCY_HOLIDAY").tBodies[0].rows[month].cells[4].getElementsByTagName("INPUT")[0];
			//var inYear           = document.getElementById("BLK_STTMS_CCY_HOLIDAY").tBodies[0].rows[month].cells[1].getElementsByTagName("INPUT")[0].value;
			var currMonthCell;
			var inYear 
			try{
				currMonthCell    = getTableObjForBlock("BLK_STTMS_CCY_HOLIDAY").tBodies[0].rows[month].cells[4].getElementsByTagName("OJ-INPUT-TEXT")[0]; //redwood_changes
				 inYear          = getTableObjForBlock("BLK_STTMS_CCY_HOLIDAY").tBodies[0].rows[month].cells[1].getElementsByTagName("OJ-INPUT-TEXT")[0].value; //redwood_changes
			}
			catch(e){
				//currMonthCell=getOjMeDataObject('BLK_STTMS_CCY_HOLIDAY')[month]['HOLIDAY_LIST'];
				//inYear=getOjMeDataObject('BLK_STTMS_CCY_HOLIDAY')[month]['YEAR'];
			}
			
			
			var firstDayInstance = new Date(inYear,month,1);
			col                  = firstDayInstance.getDay();
			//if(currObj.className == gCSSReadOnly){
			if(currObj.classList.contains(gCSSReadOnly)){
                //currObj.className = gCSSHoliday;
				currObj.classList.add(gCSSHoliday);
				currMonthCell.value = currMonthCell.value.substring(0,day-1) + "H" + currMonthCell.value.substring(day,currMonthCell.value.length)
		    }
			//FCUBS_12.0.2_#17043238 Changes Starts
			//else if (currObj.className == gCSSHoliday){
			else if(currObj.classList.contains(gCSSHoliday)){
                //currObj.className = gCSSHalfday ;
				currObj.classList.remove(gCSSHoliday);
				currObj.classList.add(...gCSSReadOnly);
                currMonthCell.value = currMonthCell.value.substring(0,day-1) + "S" + currMonthCell.value.substring(day,currMonthCell.value.length)
            }
			//FCUBS_12.0.2_#17043238 Changes Ends
            else{
                //currObj.className = gCSSReadOnly; //Redwood_Changes
        currObj.classList.add(...gCSSReadOnly); //Redwood_Changes
				currMonthCell.value = currMonthCell.value.substring(0,day-1) + "W" + currMonthCell.value.substring(day,currMonthCell.value.length)
			}
        }
    }
}
/*
 * Funtion to clear the calendar and set its default style
 */
function fnResetStyle(){
    var monthName = "";
    var strCell   = "";
    var currObj   = null;
    //gYearRef      = document.getElementsByName("YEAR")[0];//redwood_changes
    //gLblYearOf    = document.getElementsByName("YEAR")[0]; //redwood_changes
    gYearRef      = getElementsByOjName("YEAR")[0]; //Redwood_Changes
    gLblYearOf    = getElementsByOjName("YEAR")[0]; //Redwood_Changes
    for(var monthCnt = 0; monthCnt < 12 ;monthCnt++){
        monthName = fnGetMonthName(monthCnt);
        for(var rowCnt = 0; rowCnt < 6; rowCnt++){
            for(var colCnt = 0; colCnt < 7;colCnt++){
                //strCell = monthName + "_" + rowCnt + "_" + colCnt + "I"; //17043238 //redwood_changes
				strCell = monthName + "_" + rowCnt + "_" + colCnt; //17043238 //redwood_changes
				//currObj = eval(document.getElementsByName(strCell)[0]); //redwood_changes
				currObj   = eval("getElementsByOjName('" + strCell+"')[0]"); //redwood_changes
               // currObj.className = gCSSReadOnly;
				currObj.classList.add(...gCSSReadOnly);
                currObj.tabIndex  = -1;
            }
        }
    }
    gYearRef.tabIndex = -1;
	getElementsByOjName("BTN_EXIT")[0].tabIndex = -1;   //Redwood_Changes
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
function fnPrevYear(){
    if (gAction == "NEW"){
		if(getElementsByOjName("YEAR")[0].value == ""){ //Redwood_Changes
			alert("Please Enter valid Year");
			return false;
		}	
		var inputYear = getElementsByOjName("YEAR")[0].value; //Redwood_Changes
		var curYear2 = parseInt(inputYear);
        curYear2 = curYear2 - 1;
        getElementsByOjName("YEAR")[0].value = curYear2; //Redwood_Changes
 //Bug_22937194  Starts 
        document.getElementById("BLK_STTMS_CCY_HOL_MASTER__YEAR").value  = curYear2; 
         fireHTMLEvent(document.getElementById('BLK_STTMS_CCY_HOL_MASTER__YEAR'), "onpropertychange");
//Bug_22937194  Ends

      }
	displayCalendar();
return true;
}
function fnNextYear(){
    if (gAction == "NEW"){
		if(getElementsByOjName("YEAR")[0].value == ""){ //Redwood_Changes
			alert("Please Enter valid Year");
			return false;
		}
		var inputYear = getElementsByOjName("YEAR")[0].value; //Redwood_Changes
		var curYear2 = parseInt(inputYear);
        curYear2 = curYear2 + 1;
        getElementsByOjName("YEAR")[0].value = curYear2; //Redwood_Changes
 //Bug_22937194  Starts
       document.getElementById("BLK_STTMS_CCY_HOL_MASTER__YEAR").value  = curYear2; 
        fireHTMLEvent(document.getElementById('BLK_STTMS_CCY_HOL_MASTER__YEAR'), "onpropertychange");
 //Bug_22937194  Ends
    }
	displayCalendar();
return true;	
}
function fnCalHolHeading() {
    var l_hol_head_list = new Array("SUNDAY1", "MONDAY1", "TUESDAY1", "WEDNESDAY1", "THURSDAY1", "FRIDAY1", "SATURDAY1",
                        "SUNDAY2", "MONDAY2", "TUESDAY2", "WEDNESDAY2", "THURSDAY2", "FRIDAY2", "SATURDAY2",
                        "SUNDAY3", "MONDAY3", "TUESDAY3", "WEDNESDAY3", "THURSDAY3", "FRIDAY3", "SATURDAY3");
    document.getElementById("BLK_STTMS_CCY_HOL_MASTER").style.display="none";
    for (var i=0; i<l_hol_head_list.length; i++){    
        getElementsByOjName(l_hol_head_list[i])[0].className = "TEXTCalHead"; //Redwood_Changes
    }
}
function setCss(){
	////redwood_changes start
	/*
	document.getElementsByName("SUNDAY1")[0].className = gCSSReadOnly;
	document.getElementsByName("MONDAY1")[0].className = gCSSReadOnly;
	document.getElementsByName("TUESDAY1")[0].className = gCSSReadOnly;
	document.getElementsByName("WEDNESDAY1")[0].className = gCSSReadOnly;
	document.getElementsByName("THURSDAY1")[0].className = gCSSReadOnly;
	document.getElementsByName("FRIDAY1")[0].className = gCSSReadOnly;
	document.getElementsByName("SATURDAY1")[0].className = gCSSReadOnly;
	document.getElementsByName("SUNDAY2")[0].className = gCSSReadOnly;
	document.getElementsByName("SUNDAY3")[0].className = gCSSReadOnly;
	document.getElementsByName("MONDAY2")[0].className = gCSSReadOnly;
	document.getElementsByName("MONDAY3")[0].className = gCSSReadOnly;
	document.getElementsByName("TUESDAY2")[0].className = gCSSReadOnly;
	document.getElementsByName("TUESDAY3")[0].className = gCSSReadOnly;
	document.getElementsByName("WEDNESDAY2")[0].className = gCSSReadOnly;
	document.getElementsByName("WEDNESDAY3")[0].className = gCSSReadOnly;
	document.getElementsByName("THURSDAY2")[0].className = gCSSReadOnly;
	document.getElementsByName("THURSDAY3")[0].className = gCSSReadOnly;
	document.getElementsByName("FRIDAY2")[0].className = gCSSReadOnly;
	document.getElementsByName("FRIDAY3")[0].className = gCSSReadOnly;
	document.getElementsByName("SATURDAY2")[0].className = gCSSReadOnly;
	document.getElementsByName("SATURDAY3")[0].className = gCSSReadOnly;
	*/
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
	//redwood_changes END
}

function fnPreExit_KERNEL(event) {
	
	if (gAction == "MODIFY"){
	customAlertAction = "ACCEPTCLOSEBATCH";
	}
	return true;    
}

function fnCloseAlertWin_ACCEPTCLOSEBATCH(event) {
	
	if (alertAction == "EXITACTION"){
		if (gAction != "" && gAction != 'EXECUTEQUERY'){
			if (gAction == "MODIFY"){
                releaseLock();
                showData();//Bug#34311264
			}
		}	
		event.cancelBubble = true;
		gAction = "";
	}
    fnSetExitButton(); 
    alertAction = "";//Bug#34311264
    customAlertAction = "";//Bug#34311264
    showToolbar(functionId, "", "");//Bug#34311264
    displayCalendar();//Bug#34311264
    return true;
}

function setOjetStyles(id){
	var ids= new Array( 'TAB_MAIN__SEC_JAN_FEB_MAR','TAB_MAIN__SEC_APR_MAY_JUN','TAB_MAIN__SEC_JUL_AUG_SEP','TAB_MAIN__SEC_OCT_NOV_DEC');
	ids.forEach(id=>setOjetStylesById(id));
}

function setOjetStylesById(id){
	//var daysDivObject =document.getElementById(id).getElementsByClassName("oj-flex-bar oj-sm-width-full");
    var daysDivObject = document.getElementsByClassName("oj-flex-bar oj-sm-width-full");
   //redwood_36876901 Starts
    var style = document.createElement('style');
    style.textContent = '.hfieldset-max-width {width :-webkit-fill-available}';
    document.head.appendChild(style);
    //redwood_36876901 Ends
    for(var i=0; i< daysDivObject.length; i++){
        if(daysDivObject[i].children.length == 7){
            var daysDivChildObject  = daysDivObject[i].children;
            for(var j=0; j< daysDivChildObject.length; j++){ //redwood_35657123 //redwood_36876901 Changed j=0
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

