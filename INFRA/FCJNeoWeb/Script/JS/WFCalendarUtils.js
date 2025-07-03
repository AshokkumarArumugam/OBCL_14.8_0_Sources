/*----------------------------------------------------------------------------------------------------
**
** File Name    : WFCalendarUtils.js
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
Copyright © 2004-2012   by Oracle Financial Services Software Limited..
---------------------------------------------------------------------------------------------------- 
 */
var PrveClassElem = "";
var PrveTailClassElem = "";
var PrveHdrClassElem = "";
var focusCell = "";
var gLongMonthValues = new Array();
var gTasksDOM;
var gCalTasksArr = '';
var gNoteTasksArr = '';
var gReminderTaskList   = '';
var gAgingTaskList      = '';
 var screenArgs = new Array();

gLongMonthValues[0] = mainWin.getItemDesc("JANUARY");
gLongMonthValues[1] = mainWin.getItemDesc("FEBRUARY");
gLongMonthValues[2] = mainWin.getItemDesc("MARCH");
gLongMonthValues[3] = mainWin.getItemDesc("APRIL");
gLongMonthValues[4] = mainWin.getItemDesc("MAY");
gLongMonthValues[5] = mainWin.getItemDesc("JUNE");
gLongMonthValues[6] = mainWin.getItemDesc("JULY");
gLongMonthValues[7] = mainWin.getItemDesc("AUGUST");
gLongMonthValues[8] = mainWin.getItemDesc("SEPTEMBER");
gLongMonthValues[9] = mainWin.getItemDesc("OCTOBER");
gLongMonthValues[10] = mainWin.getItemDesc("NOVEMBER");
gLongMonthValues[11] = mainWin.getItemDesc("DECEMBER");

var gShortDayValues = new Array();
gShortDayValues[0] = mainWin.getItemDesc("MONDAY_3CHAR");
gShortDayValues[1] = mainWin.getItemDesc("TUESDAY_3CHAR");
gShortDayValues[2] = mainWin.getItemDesc("WEDNESDAY_3CHAR");
gShortDayValues[3] = mainWin.getItemDesc("THURSDAY_3CHAR");
gShortDayValues[4] = mainWin.getItemDesc("FRIDAY_3CHAR");
gShortDayValues[5] = mainWin.getItemDesc("SATURDAY_3CHAR");
gShortDayValues[6] = mainWin.getItemDesc("SUNDAY_3CHAR");

var gLongDayValues = new Array();
gLongDayValues[0] = "Monday";
gLongDayValues[1] = "Tuesday";
gLongDayValues[2] = "Wednesday";
gLongDayValues[3] = "Thursday";
gLongDayValues[4] = "Friday";
gLongDayValues[5] = "Saturday";
gLongDayValues[6] = "Sunday";

function setHeights() {
    parent.document.getElementById("ChildWin").style.width = document.getElementById("DIVWNDContainer").offsetWidth + "px";
    parent.document.getElementById("ChildWin").children[0].style.width = document.getElementById("DIVWNDContainer").offsetWidth + "px";
    parent.document.getElementById("ChildWin").style.height = document.getElementById("DIVWNDContainer").offsetHeight + "px";
    parent.document.getElementById("ChildWin").children[0].style.height = document.getElementById("DIVWNDContainer").offsetHeight + "px";
    parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);
    parent.document.getElementById("ChildWin").style.top = document.getElementById("WNDtitlebar").offsetHeight + "px";
    parent.document.getElementById("ChildWin").style.left = "4px";
    focusCell.focus();
}

function getDayString() {
    for (var days = 0; days < 7; days++) {
        var wkStr = "Week" + (Number(days) + Number(2));
        if (days == 0) {
            td7Days += "<td abbr='" + wkStr + "' tabindex=0 onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)></td>";
        } else {
            td7Days += "<td tabindex=0 onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)></td>";
        }
    }
    td7DaysL = td7Days.substring(0, td7Days.indexOf("</td>")) + "<span class='LBLinv'>" + wkStr + "</span>" + td7Days.substring(Number(td7Days.indexOf("</td>")) + Number(5), td7Days.length);
}

function fnMouseOverCal(curElem) {
    PrveClassElem = curElem.className;
    if (curElem.className == 'TDday') {
        curElem.className = 'calTDDaysOver';
    } else if (curElem.className == 'TDdayS') {
        curElem.className = 'calTDDaysOver';
    } else if (curElem.className == 'TDholiday') {
        curElem.className = 'calTDDaysOver';
    } else if (curElem.className == 'BTNicon2') {
        curElem.className = 'BTNicon2H';
    } else if (curElem.className == 'BTNtext') {
        curElem.className = 'BTNtextH';
    }

    return;
}

function fnMouseOutCal(curElem) {
    if (curElem.className == 'calTDDaysOver') {
        if (curElem.className != 'TDdayS') curElem.className = PrveClassElem;
    } else if (curElem.className == 'BTNicon2H') {
        curElem.className = 'BTNicon2';
    } else if (curElem.className == 'BTNtextH') {
        curElem.className = 'BTNtext';
    }

    return;
}

function fnMouseDownCal(curElem) {
    if (curElem.className == 'calTDDaysOver') {
        curElem.className = 'TDday';
    } else if (curElem.className == 'calTDDaysSelOver') {
        curElem.className = 'TDdayS';
    } else if (curElem.className == 'BTNicon2') {
        curElem.className = 'BTNicon2H';
    } else if (curElem.className == 'BTNtext') {
        curElem.className = 'BTNtextH';
    }
    return;
}

function fnMouseOverDBCal(curElem) {
    PrveClassElem = curElem.className;
    if (curElem.className == 'TDday') {
        curElem.className = 'calTDDaysOver';
    } else if (curElem.className == 'TDdayS') {
        curElem.className = 'calTDDaysOver';
    } else if (curElem.className == 'TDholiday') {
        curElem.className = 'calTDDaysOver';
    } else if (curElem.className == 'BTNicon2') {
        curElem.className = 'BTNicon2H';
    } else if (curElem.className == 'BTNtext') {
        curElem.className = 'BTNtextH';
    }
    var bodyId = "CalBody_"+curElem.id.substr(10);

/*	loop1:
	for (var idx2=0; idx2 <7; idx2++) {
		if (curElem.parentNode.nextSibling.children[idx2].offsetLeft == curElem.offsetLeft) {
			var curTailElem = curElem.parentNode.nextSibling.children[idx2];*/
                        var curTailElem = document.getElementById(bodyId);
			PrveTailClassElem = curTailElem.className;
			if (curTailElem.className == 'TDday') {
				curTailElem.className = 'calTDDaysOver';
			} else if (curTailElem.className == 'TDdayS') {
				curTailElem.className = 'calTDDaysOver';
			} else if (curTailElem.className == 'TDholiday') {
				curTailElem.className = 'calTDDaysOver';
			} else if (curTailElem.className == 'BTNicon2') {
				curTailElem.className = 'BTNicon2H';
			} else if (curElem.className == 'BTNtext') {
				curTailElem.className = 'BTNtextH';
			}
/*			break loop1;
		}
	}*/
    
    return;
}

function fnMouseOutDBCal(curElem) {
    if (curElem.className == 'calTDDaysOver') {
        if (curElem.className != 'TDdayS') curElem.className = PrveClassElem;
    } else if (curElem.className == 'BTNicon2H') {
        curElem.className = 'BTNicon2';
    } else if (curElem.className == 'BTNtextH') {
        curElem.className = 'BTNtext';
    }
    var bodyId = "CalBody_"+curElem.id.substr(10);
    /*
	loop1:
	for (var idx2=0; idx2 <7; idx2++) {
		if (curElem.parentNode.nextSibling.children[idx2].offsetLeft == curElem.offsetLeft) {
			var curTailElem = curElem.parentNode.nextSibling.children[idx2];*/
                        var curTailElem = document.getElementById(bodyId);
			if (curTailElem.className == 'calTDDaysOver') {
				if (curTailElem.className != 'TDdayS') curTailElem.className = PrveTailClassElem;
			} else if (curTailElem.className == 'BTNicon2H') {
				curTailElem.className = 'BTNicon2';
			} else if (curTailElem.className == 'BTNtextH') {
				curTailElem.className = 'BTNtext';
			}
/*			break loop1;
		}
	}*/
	
    return;
}

function fnMouseOverCalTail(curElem) {
    PrveClassElem = curElem.className;
    if (curElem.className == 'TDday') {
        curElem.className = 'calTDDaysOver';
    } else if (curElem.className == 'TDdayS') {
        curElem.className = 'calTDDaysOver';
    } else if (curElem.className == 'TDholiday') {
        curElem.className = 'calTDDaysOver';
    } else if (curElem.className == 'BTNicon2') {
        curElem.className = 'BTNicon2H';
    } else if (curElem.className == 'BTNtext') {
        curElem.className = 'BTNtextH';
    }
    var headerElmID ="CalHeader_"+curElem.id.substr(8);
/*    
	loop1:
	for (var idx2=0; idx2 <7; idx2++) {
		if (curElem.parentNode.previousSibling.children[idx2].offsetLeft == curElem.offsetLeft) {
			var curHdrElem = curElem.parentNode.previousSibling.children[idx2];*/
                        var curHdrElem = document.getElementById(headerElmID);
			PrveHdrClassElem = curHdrElem.className;
			if (curHdrElem.className == 'TDday') {
				curHdrElem.className = 'calTDDaysOver';
			} else if (curHdrElem.className == 'TDdayS') {
				curHdrElem.className = 'calTDDaysOver';
			} else if (curHdrElem.className == 'TDholiday') {
				curHdrElem.className = 'calTDDaysOver';
			} else if (curHdrElem.className == 'BTNicon2') {
				curHdrElem.className = 'BTNicon2H';
			} else if (curElem.className == 'BTNtext') {
				curHdrElem.className = 'BTNtextH';
			}
/*			break loop1;
		}
	}
  */  
    return;
}

function fnMouseOutCalTail(curElem) {
    if (curElem.className == 'calTDDaysOver') {
        if (curElem.className != 'TDdayS') curElem.className = PrveClassElem;
    } else if (curElem.className == 'BTNicon2H') {
        curElem.className = 'BTNicon2';
    } else if (curElem.className == 'BTNtextH') {
        curElem.className = 'BTNtext';
    }
    var headerElmID ="CalHeader_"+curElem.id.substr(8);
    /*
	loop1:
	for (var idx2=0; idx2 <7; idx2++) {
		if (curElem.parentNode.previousSibling.children[idx2].offsetLeft == curElem.offsetLeft) {
			var curHdrElem = curElem.parentNode.previousSibling.children[idx2];*/
                        var curHdrElem = document.getElementById(headerElmID);
			if (curHdrElem.className == 'calTDDaysOver') {
				if (curHdrElem.className != 'TDdayS') curHdrElem.className = PrveHdrClassElem;
			} else if (curHdrElem.className == 'BTNicon2H') {
				curHdrElem.className = 'BTNicon2';
			} else if (curHdrElem.className == 'BTNtextH') {
				curHdrElem.className = 'BTNtext';
			}
/*			break loop1;
		}
	}*/
	
    return;
}

function getHolidayList(winId, day) {
    var calReqDom = null;
    var serverURL = "ExtHolidayFetchData?";
    serverURL += "year=" + year;
    serverURL += "&month=" + month;
    serverURL += "&functionId=" + functionId;
    serverURL += "&txnBranch=" + txnBranch;
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var objHTTP = createHTTPActiveXObject();
    objHTTP.open("POST", serverURL, false);
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objHTTP.send(calReqDom);
    if (objHTTP.status == 200) {
        mainWin.inactiveTime = 0;
        var respDOM = objHTTP.responseXML;
        var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
        if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
            alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
        } else {
            holidays = getNodeText(selectSingleNode(respDOM, "//RESPONSE"));
            date = txnBranchDate;
            if (parentDsoDt && parentDsoDt != '' && parentDsoDt.value && (parentDsoDt.value != '')) {
                var curDate = parentDsoDt.value;
                if (parentDateFormatDSO == "yyyy-MM-dd") {
                    nCurrentYear = curDate.substr(0, 4);
                    nCurrentMonth = curDate.substr(5, 2);
                    nCurrentDay = curDate.substr(8, 2);
                } else {
                    nCurrentYear = curDate.substr(0, 4);
                    nCurrentMonth = curDate.substr(4, 2);
                    nCurrentDay = curDate.substr(6, 2);
                }
            } else {
                var l_date = date.split("-");
                nCurrentYear = l_date[0];
                if (parseInt(nCurrentYear) < 1000) parseInt(nCurrentYear) += 1900;
                nCurrentMonth = l_date[1];
                nCurrentDay = l_date[2];
            }
            if (winId == "M")
            	setYearMonth(year, month);
            else
            	setDBYearMonth(year, month, day);
        }
    }
}

function setDBYearMonth(nYear, nMonth, nDay) {
    nCurrentMonth = parseInt(month, 10);
    document.getElementById("gotoYY").innerHTML = gLongMonthValues[nCurrentMonth - 1] + "&nbsp;" + year;
    var date = getDateObject(year, nCurrentMonth - 1, 1);
    var nDate;
    var dayTbl = document.getElementById("tblDays").tBodies[0];
    var startDay = 0;
    startDay = date.getDay() - 2;
    var dayRows = 0;
    var dayCells = 0;
    var dayRowsAdj = 0;
    var cellIndexAdj = 0;
    var calDayTasksArr = '';

	getCalendarTasksCount(month, year);

    while (date.getMonth() == nCurrentMonth - 1) {
        nDate = date.getDate();
        if (date.getDate() == 1 && date.getDay() == 0) {
            dayRows = 0;
            startDay = startDay + 7;
        } else {
            dayRows = Math.floor((startDay + date.getDate()) / 7);
        }

        if (dayRows == 0) {
        	dayRowsAdj = 1;
        } else if (dayRows == 1) {
        	dayRowsAdj = 4;
        } else if (dayRows == 2) {
        	dayRowsAdj = 7;
        } else if (dayRows == 3) {
        	dayRowsAdj = 10;
        } else if (dayRows == 4) {
        	dayRowsAdj = 13;
	} else if (dayRows == 5) {
        	dayRowsAdj = 16;
        }
        var cellIndex;
        if (date.getDay() == 0) cellIndex = date.getDay() + 6;
        else cellIndex = date.getDay() - 1;

        if (cellIndex == 0) {
        	cellIndexAdj = 0;
        } else if (cellIndex == 1) {
        	cellIndexAdj = 1;
        } else if (cellIndex == 2) {
        	cellIndexAdj = 2;
        } else if (cellIndex == 3) {
        	cellIndexAdj = 3;
        } else if (cellIndex == 4) {
        	cellIndexAdj = 4;
	} else if (cellIndex == 5) {
        	cellIndexAdj = 5;
	} else if (cellIndex == 6) {
        	cellIndexAdj = 6;
	} else if (cellIndex == 7) {
        	cellIndexAdj = 7;
        }

        if (date.getDate() == nCurrentDay) {
            dayTbl.rows[dayRowsAdj].cells[cellIndexAdj].className = 'TDdayS';
            dayTbl.rows[dayRowsAdj+1].cells[cellIndexAdj].className = 'TDdayS';
            focusCell = dayTbl.rows[dayRowsAdj].cells[cellIndexAdj];
            nDay = nCurrentDay;
        } else {
            dayTbl.rows[dayRowsAdj].cells[cellIndexAdj].className = 'TDday';
            dayTbl.rows[dayRowsAdj+1].cells[cellIndexAdj].className = 'TDday';
        }
        //addEvent(dayTbl.rows[dayRowsAdj].cells[cellIndexAdj], "onclick", "fnOpenDay(event)");
        addEvent(dayTbl.rows[dayRowsAdj].cells[cellIndexAdj], "onclick", "fnOpenDay('"+date.getDate()+"')");
        //addEvent(dayTbl.rows[dayRowsAdj+1].cells[cellIndexAdj], "onclick", "fnOpenDayTail(event)");
        addEvent(dayTbl.rows[dayRowsAdj+1].cells[cellIndexAdj], "onclick", "fnOpenDayTail('"+date.getDate()+"',event)");
        //addEvent(dayTbl.rows[dayRowsAdj].cells[cellIndex], "onkeydown", "fnHandleCalKeys(event);fnRetSelDate(event);");
        //addEvent(dayTbl.rows[dayRowsAdj+1].cells[cellIndex], "onkeydown", "fnHandleCalKeys(event);fnRetSelDate(event);");
        //addEvent(dayTbl.rows[dayRowsAdj].cells[cellIndex], "onfocus", "fnSelDBDay(event)");
        //addEvent(dayTbl.rows[dayRowsAdj+1].cells[cellIndex], "onfocus", "fnSelDBDay(event)");

        if (holidays.substring(date.getDate() - 1, date.getDate()) == "H") {
            setInnerText(dayTbl.rows[dayRowsAdj].cells[cellIndexAdj], date.getDate());
            if (dayTbl.rows[dayRowsAdj].cells[cellIndexAdj].className == 'TDdayS') {
                dayTbl.rows[dayRowsAdj].cells[cellIndexAdj].className = "TDholidayS";
                dayTbl.rows[dayRowsAdj+1].cells[cellIndexAdj].className = "TDholidayS";
            } else {
                dayTbl.rows[dayRowsAdj].cells[cellIndexAdj].className = "TDholiday";
                dayTbl.rows[dayRowsAdj+1].cells[cellIndexAdj].className = "TDholiday";
            }
        } else {
            setInnerText(dayTbl.rows[dayRowsAdj].cells[cellIndexAdj], date.getDate());
        }
        if (holidays == null || holidays == "") {
            if (date.getDay() == 0 || date.getDay() == 6) {
                setInnerText(dayTbl.rows[dayRowsAdj].cells[cellIndexAdj], date.getDate());
                if (dayTbl.rows[dayRowsAdj].cells[cellIndexAdj].className == 'TDdayS') {
                    dayTbl.rows[dayRowsAdj].cells[cellIndexAdj].className = "TDholidayS";
                } else {
                    dayTbl.rows[dayRowsAdj].cells[cellIndexAdj].className = "TDholiday";
                }
            } else {
                setInnerText(dayTbl.rows[dayRowsAdj].cells[cellIndexAdj], date.getDate());
            }
        }
        var daySummary = "";
        var dayReminderCount = "";
        var dayAgeCount = "";
        var dayNoteCount = "";
        var dayStartTime = mainWin.AppDate + ' 00:00:00';
        var dayEndTime = mainWin.AppDate + ' 23:59:59';
        
        calDayTasksArr = gCalTasksArr[nDate].split("~");
        dayReminderCount = calDayTasksArr[1];
        dayAgeCount = calDayTasksArr[2];
        dayNoteCount = calDayTasksArr[3];
        //dayNoteCount = calDayTasksArr[3];
        /*if (date.getDate() == "15") {
        	dayReminderCount = "10";
        	//dayReminderCount = selectNodes(gTasksDOM, "//Tasks/Task[PROTECTEDDATEATTRIBUTE1>='"+dayStartTime+"' && PROTECTEDDATEATTRIBUTE1<='"+dayEndTime+"']").length;
        	dayAgeCount = "1";
        	//dayAgeCount  = selectNodes(gTasksDOM, "//Tasks/Task[PROTECTEDDATEATTRIBUTE1>='"+dayStartTime+"' && PROTECTEDDATEATTRIBUTE1<='"+dayEndTime+"']").length;
        	dayNoteCount = "0";
        }
        if (date.getDate() == "17") {
        	dayReminderCount = "2";
        	dayAgeCount = "13";
        	dayNoteCount = "7";
        }
        if (date.getDate() == "4") {
        	dayReminderCount = "2";
        	dayAgeCount = "";
        	dayNoteCount = "";
        }
        if (date.getDate() == "27") {
        	dayReminderCount = "1";
        	dayAgeCount = "15";
        	dayNoteCount = "2";
        }*/
        if (dayReminderCount != "" && dayReminderCount != 0) {
        	daySummary+= "Task Reminders ("+dayReminderCount+")";
        	daySummary+= "\n";
        }
        if (dayAgeCount != "" && dayAgeCount != 0) {
        	daySummary+= "Aging Tasks ("+dayAgeCount+")";
        	daySummary+= "\n";
        }
        if (dayNoteCount != "" && dayNoteCount != 0) {
        	daySummary+= "Day Notes ("+dayNoteCount+")";
        	daySummary+= "\n";
        }        
        
        //dayTbl.rows[dayRowsAdj+1].cells[cellIndexAdj].innerText = daySummary;
        setInnerText(dayTbl.rows[dayRowsAdj+1].cells[cellIndexAdj],daySummary);
        date = getDateObject(year, date.getMonth(), date.getDate() + 1);
    }
    	if (nDay) {
        var framsObj = window.parent.frames;
        loop0:
        for(var idx3=0;idx3<framsObj.length;idx3++){
        //if(framsObj[idx3].document.title && framsObj[idx3].document.title =="Calender DashBoard" ){
        if(framsObj[idx3].document.title && framsObj[idx3].document.title == mainWin.getItemDesc("LBL_DASH_CALENDER") ){
		//var calObj = window.parent.frames[3].document.getElementsByTagName("TR");
                var calObj =framsObj[idx3].document.getElementsByTagName("TR");
		loop1:
		for (var idx1=3; idx1<calObj.length;idx1=idx1+3) {
			for (var idx2=0; idx2 <7; idx2++) {
				if (calObj[idx1].children[idx2].innerText == Number(nDay)) {
					if (calObj[idx1].children[idx2].className == "TDholiday" || calObj[idx1].children[idx2].className == "TDholidayS") {
						framsObj[idx3].document.getElementsByTagName("TR")[idx1].children[idx2].className = "TDholidayS";
						framsObj[idx3].document.getElementsByTagName("TR")[idx1+1].children[idx2].className = "TDholidayS";
					} else {
						framsObj[idx3].document.getElementsByTagName("TR")[idx1].children[idx2].className = "TDdayS";
						framsObj[idx3].document.getElementsByTagName("TR")[idx1+1].children[idx2].className = "TDdayS";
					}
					break loop1;
				}
			}
		}
            break loop0;
            }
	}
    }
}

function setYearMonth(nYear, nMonth) {
    nCurrentMonth = parseInt(month, 10);
    document.getElementById("gotoYY").innerHTML = gLongMonthValues[nCurrentMonth - 1] + "&nbsp;" + year;
    var date = getDateObject(year, nCurrentMonth - 1, 1);
    var nDate;
    var dayTbl = document.getElementById("tblDays").tBodies[0];
    var startDay = 0;
    startDay = date.getDay() - 2;
    var dayRows = 0;
    var dayCells = 0;
    for (dayIndex = 0; dayIndex < 42; dayIndex++) {
        dayRows = Math.floor(dayIndex / 7);
        dayCells = dayIndex % 7;
        setInnerText(dayTbl.rows[dayRows].cells[dayCells], " ");
        dayTbl.rows[dayRows].cells[dayCells].className = 'TDblank';
        dayTbl.rows[dayRows].cells[dayCells].removeAttribute('onclick');
        dayTbl.rows[dayRows].cells[dayCells].removeAttribute('ondblclick');
    }
    while (date.getMonth() == nCurrentMonth - 1) {
        nDate = date.getDate();
        if (date.getDate() == 1 && date.getDay() == 0) {
            dayRows = 0;
            startDay = startDay + 7;
        } else {
            dayRows = Math.floor((startDay + date.getDate()) / 7);
        }
        var cellIndex;
        if (date.getDay() == 0) cellIndex = date.getDay() + 6;
        else cellIndex = date.getDay() - 1;

        if (date.getDate() == nCurrentDay) {
            dayTbl.rows[dayRows].cells[cellIndex].className = 'TDdayS';
            focusCell = dayTbl.rows[dayRows].cells[cellIndex];
        } else {
            dayTbl.rows[dayRows].cells[cellIndex].className = 'TDday';
        }
        addEvent(dayTbl.rows[dayRows].cells[cellIndex], "onclick", "fnOpenMonth(event)");
        //addEvent(dayTbl.rows[dayRows].cells[cellIndex], "ondblclick", "fnOpenDate(event)");
        addEvent(dayTbl.rows[dayRows].cells[cellIndex], "onkeydown", "fnHandleCalKeys(event);fnRetSelDate(event);");
        addEvent(dayTbl.rows[dayRows].cells[cellIndex], "onfocus", "fnSelDay(event)");
        if (holidays.substring(date.getDate() - 1, date.getDate()) == "H") {
            setInnerText(dayTbl.rows[dayRows].cells[cellIndex], date.getDate());
            if (dayTbl.rows[dayRows].cells[cellIndex].className == 'TDdayS') {
                dayTbl.rows[dayRows].cells[cellIndex].className = "TDholidayS";
            } else {
                dayTbl.rows[dayRows].cells[cellIndex].className = "TDholiday";
            }
        } else {
            setInnerText(dayTbl.rows[dayRows].cells[cellIndex], date.getDate());
        }
        if (holidays == null || holidays == "") {
            if (date.getDay() == 0 || date.getDay() == 6) {
                setInnerText(dayTbl.rows[dayRows].cells[cellIndex], date.getDate());
                if (dayTbl.rows[dayRows].cells[cellIndex].className == 'TDdayS') {
                    dayTbl.rows[dayRows].cells[cellIndex].className = "TDholidayS";
                } else {
                    dayTbl.rows[dayRows].cells[cellIndex].className = "TDholiday";
                }
            } else {
                setInnerText(dayTbl.rows[dayRows].cells[cellIndex], date.getDate());
            }
        }
        date = getDateObject(year, date.getMonth(), date.getDate() + 1);
    }
}

function fnOpenDay(nCurrentDay) {
    /*var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    /*if (srcElement.className != "TDblank") {
        nCurrentDay = parseInt(getInnerText(srcElement), 10);*/
        //setYearMonth(nCurrentYear, nCurrentMonth);
	//setDBYearMonth(nCurrentYear, nCurrentMonth, nCurrentDay);
	//getCalendarTasks(nCurrentYear, nCurrentMonth, nCurrentDay);*/
       getCalendarTasks(year, nCurrentMonth, nCurrentDay);
        var selectedDsoDt = '';
        if (parentDateFormatDSO == "yyyy-MM-dd") {
            selectedDsoDt = '' + year + '-' + zeroPrefix(month, 2) + '-' + zeroPrefix(nCurrentDay, 2);
        } else {
            selectedDsoDt = '' + year + zeroPrefix(month, 2) + zeroPrefix(nCurrentDay, 2);
        }
	var l_Params  = "&g_txnBranch=" +mainWin.CurrentBranch;
	l_Params += "&rowIndex=" +'1';
	l_Params += "&appDate=" +selectedDsoDt;//mainWin.AppDate;
	
	var reminderCount = gNoteTasksArr[0].split(";");
	l_Params += "&reminderCount=" +reminderCount.length;
	l_Params += "&reminderTasks=" +gNoteTasksArr[0];
	
	var agingCount = gNoteTasksArr[1].split(";");
	l_Params += "&agingCount=" +agingCount.length;
	l_Params += "&agingTasks=" +gNoteTasksArr[1];
	
	var notesCount = gNoteTasksArr[2].split(";");
	l_Params += "&notesCount=" +notesCount.length;
	l_Params += "&dayNotes=" +gNoteTasksArr[2];
	try {
                parent.gAlertsArr = gNoteTasksArr;
                parent.gSelectDt = selectedDsoDt;
                screenArgs['SCREEN_NAME'] = 'CVS_MAIN';
                screenArgs['FUNCTION_ID'] ='ORDAYTSK';
                screenArgs["AUTHORIZE_SCREEN_TYPE"] = 'M';
                screenArgs['LANG'] = mainWin.LangCode;
                screenArgs['DESCRIPTION'] = selectedDsoDt;
                scrChldFnId = 'ORDAYTSK';
                gAction = 'NEW';
                parent.dispHref1Dashboard('ORDAYTSK');
		//loadSubScreenDIV("ChildWinwfNotes", "WFDayNotes.jsp?"+l_Params);
	} catch (e) {}
  //  } else return false;
}

function fnOpenDayTail(nCurrentDay,e) {
	var evnt = window.event || e;
	var srcElement = getEventSourceElement(evnt);
	mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
        /*
	loop1:
	for (var idx2=0; idx2 <7; idx2++) {
		if (srcElement.parentNode.previousSibling.children[idx2].offsetLeft == srcElement.offsetLeft) {
			nCurrentDay = srcElement.parentNode.previousSibling.children[idx2].innerText;
			break loop1;
		}
	}*/
	//setDBYearMonth(nCurrentYear, nCurrentMonth, nCurrentDay);
	//getCalendarTasks(nCurrentYear, nCurrentMonth, nCurrentDay);
  setDBYearMonth(year, nCurrentMonth, nCurrentDay);
  getCalendarTasks(year, nCurrentMonth, nCurrentDay);
    if (srcElement.className != "TDblank") {
        var selectedDsoDt = '';
        if (parentDateFormatDSO == "yyyy-MM-dd") {
            selectedDsoDt = '' + year + '-' + zeroPrefix(month, 2) + '-' + zeroPrefix(nCurrentDay, 2);
        } else {
            selectedDsoDt = '' + year + zeroPrefix(month, 2) + zeroPrefix(nCurrentDay, 2);
        }
//	var l_Params  = "&g_txnBranch=" +mainWin.CurrentBranch;
//	l_Params += "&rowIndex=" +'1';
//	l_Params += "&appDate=" +selectedDsoDt;//mainWin.AppDate;
//	
//	var reminderCount = gNoteTasksArr[0].split(";");
//	l_Params += "&reminderCount=" +reminderCount.length;
//	l_Params += "&reminderTasks=" +gNoteTasksArr[0];
//	
//	var agingCount = gNoteTasksArr[1].split(";");
//	l_Params += "&agingCount=" +agingCount.length;
//	l_Params += "&agingTasks=" +gNoteTasksArr[1];
//	
//	var notesCount = gNoteTasksArr[2].split(";");
//	l_Params += "&notesCount=" +notesCount.length;
//	l_Params += "&dayNotes=" +gNoteTasksArr[2];
        if(document.getElementById('ChildWinwfNotes'))
            document.getElementById('ChildWinwfNotes').parentNode.removeChild(document.getElementById('ChildWinwfNotes'));
	try {
                parent.gAlertsArr = gNoteTasksArr;
                parent.gSelectDt = selectedDsoDt;
                screenArgs['SCREEN_NAME'] = 'CVS_MAIN';
                screenArgs['FUNCTION_ID'] ='ORDAYTSK';
                screenArgs["AUTHORIZE_SCREEN_TYPE"] = 'M';
                screenArgs['LANG'] = mainWin.LangCode;
                screenArgs['DESCRIPTION'] = selectedDsoDt;
                scrChldFnId = 'ORDAYTSK';
                gAction = 'NEW';
                parent.dispHref1Dashboard('ORDAYTSK');
                //fnLaunchSubScreen(screenArgs,scrChldFnId,functionId,funcOrigin);
		//loadSubScreenDIV("ChildWinwfNotes", "WFDayNotes.jsp?"+l_Params);
	} catch (e) {}
    } else return false;
}

function fnOpenDate(e) {
	fnOpenMonth(e);
}

function fnLaunchSubScreen(screenArgs,scrChldFnId,functionId,funcOrigin)
{
    var params = "scr=" + screenArgs['SCREEN_NAME'] + "&";
    params += "functionid=" + screenArgs['FUNCTION_ID'] + "&";
    params += "scrChildFnId=" + scrChldFnId + "&";//ScreenChild issue
    params += "parentFunc=" + functionId + "&";
    params += "lang=" + screenArgs['LANG'] + "&";
    params += "description=" + screenArgs['DESCRIPTION'] + "&";
    params += "gAction=" + gAction + "&";
    params += "uixml=" + functionId + "&";
    params += "funcOrigin=" + 'KERNEL' + "&";
    params += "prntFunc=" + '' + "&";
    params += "prntOrigin=" + '' + "&";
    params += "IsAdv_Sum_Scr=" + 'N' + "&";
    params += "txnBranch=" + g_txnBranch + "&";
    params += "scrType=" + 'M' + "&";
    //12.0.2 Code for Loading Cluster/Custom js File starts
    params += "clusterModified=" + 'N' + "&";
    params += "customModified=" + 'N' + "&";
    //12.0.2 Code for Loading Cluster/Custom js File ends
    params += "callFormLaunched=yes";
    debugs("Calling loadSubScreenDIV","");
    loadSubScreenDIV("ChildWin", "ExtLaunchSubScreen.jsp?" + params);
}
function fnOpenMonth(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if (typeof (evnt.keyCode) == "undefined" || evnt.keyCode == 0 || evnt.keyCode == 18) {
        if (typeof (mainWin.gActiveWindow) != 'undefined' || mainWin.gActiveWindow != null) {
            parentDsoDt = parent.gCalDSODate;
            parentBtnDt = parent.gCalBtn;
            parentDateFormatDSO = parent.gDateFormatDSO;
        }
        var selectedDsoDt = '';
        nCurrentDay = parseInt(getInnerText(srcElement), 10);
        if (parentDateFormatDSO == "yyyy-MM-dd") {
            selectedDsoDt = '' + year + '-' + zeroPrefix(month, 2) + '-' + zeroPrefix(nCurrentDay, 2);
        } else {
            selectedDsoDt = '' + year + zeroPrefix(month, 2) + zeroPrefix(nCurrentDay, 2);
        }
        if (parentDsoDt && (parentDsoDt.value != selectedDsoDt)) {
            parentDsoDt.value = selectedDsoDt;
            fireHTMLEvent(parentDsoDt, "onpropertychange")
        }
        if (gCalBtn && gCalBtn != '') {
            parentBtnDt.focus();
        }
        if(document.getElementById("hTab_DBoardTasks")!=null)
            document.getElementById("hTab_DBoardTasks").style.display='none';
        if(document.getElementById("DIVTabContentDBoardTasks")!=null)
            document.getElementById("DIVTabContentDBoardTasks").innerHTML = ""; 
        if(parent.document.getElementById("DIVTabContentDBoardTasks")!=null)
            parent.document.getElementById("DIVTabContentDBoardTasks").innerHTML = "";             
        calYear = year;
        calMonth = zeroPrefix(month, 2);
	var monthTitle = "Current Month";
	var winId = "DIVTabContentDBoardTasks";
	var l_Params  = "&winId=" +winId;
	nCurrYear = calYear;
	nCurrMonth = calMonth;
	l_Params += "&g_txnBranch=" +mainWin.CurrentBranch;
	l_Params += "&appDate=" +mainWin.AppDate;
	l_Params += "&monthTitle=" +monthTitle;
	l_Params += "&year=" + nCurrYear;
	l_Params += "&month=" + nCurrMonth;
	l_Params += "&day=" + e.srcElement.innerText;
	l_Params += "&txnBranch=" + g_txnBranch;
	l_Params += "&txnBranchDate=" +date;
	var customWin = document.createElement("div");
	customWin.id = winId+"ChildWinCalenderDashBoard";
	customWin.className = "dhtmlwindow";
	customWin.style.position = "absolute";
	customWin.style.height =parent.document.getElementById("DIVTabContentDBoardTasks").scrollHeight+"px";
	customWin.style.width =parent.document.getElementById("DIVTabContentDBoardTasks").scrollWidth+"px";
	var objwindow = '<iframe  id="ifrSubScreen" title="" src="WFCalendarDBoard.jsp?' + l_Params + '" allowtransparency="false" frameborder="0" scrolling="no"  draggable="true"></iframe>';
	customWin.innerHTML = objwindow;
	if(parent.document.getElementById("DIVTabContentDBoardTasks").children.namedItem(winId+'ChildWinCalenderDashBoard')){
		parent.document.getElementById("DIVTabContentDBoardTasks").children.namedItem(winId+'ChildWinCalenderDashBoard').children.namedItem('ifrSubScreen').src='WFCalendarDBoard.jsp?' + l_Params;
	} else {
		parent.document.getElementById("DIVTabContentDBoardTasks").appendChild(customWin);
	}
    }
}

function fnHandleCalKeys(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var dayTbl = document.getElementById("tblDays").tBodies[0].rows;
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (evnt.shiftKey && evnt.keyCode == 9) {
        document.getElementById("gotoYY").focus();
        preventpropagate(evnt);
        return false;
    }
    if (evnt.keyCode == 9) {
        document.getElementById("WNDbuttons").focus();
        fnMouseOutCal(srcElement);
        preventpropagate(evnt);
        return false;
    } else if (evnt.keyCode == 40) {
        for (var i = 0; i < dayTbl.length; i++) {
            var tblCells = dayTbl[i].cells;
            for (var j = 0; j < tblCells.length; j++) {
                if (tblCells[j] == srcElement) {
                    if (dayTbl[i + 1] != undefined && dayTbl[i + 1].cells[j].className != "TDblank") {
                        dayTbl[i + 1].cells[j].focus();
                        preventpropagate(evnt);
                        return false;
                    }
                }
            }
        }
    } else if (evnt.keyCode == 39) {
        if (getToolBarNextSibling(srcElement) != null) {
            if (getToolBarNextSibling(srcElement).className != "TDblank" && getToolBarNextSibling(srcElement).className != "") {
                getToolBarNextSibling(srcElement).focus();
                preventpropagate(evnt);
                return false;
            }
        }
    } else if (evnt.keyCode == 38) {
        for (var i = 0; i < dayTbl.length; i++) {
            var tblCells = dayTbl[i].cells;
            for (var j = 0; j < tblCells.length; j++) {
                if (tblCells[j] == srcElement) {
                    if (dayTbl[i - 1] != undefined && dayTbl[i - 1].cells[j].className != "TDblank") {
                        dayTbl[i - 1].cells[j].focus();
                        preventpropagate(evnt);
                        return false;
                    }
                }
            }
        }
    } else if (evnt.keyCode == 37) {
        if (getToolBarPreviousSibling(srcElement) != null) {
            if (getToolBarPreviousSibling(srcElement).className != "TDblank" && getToolBarPreviousSibling(srcElement).className != "") {
                getToolBarPreviousSibling(srcElement).focus();
                preventpropagate(evnt);
                return false;
            }
        }
    }
}

function fnHandleCalBtn(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var eleCal = document.getElementById("tblDays").tBodies[0].rows;
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (evnt.shiftKey && evnt.keyCode == 9) {
        if (srcElement.id == "WNDbuttons") {
            for (var j = eleCal.length - 1; j >= 0; j--) {
                var ele = eleCal[j].cells;
                for (var i = ele.length - 1; i >= 0; i--) {
                    if (getPreviousSibling(ele[i]).className != "TDblank" && getPreviousSibling(ele[i]).className != "") {
                        getPreviousSibling(ele[i]).focus();
                        preventpropagate(evnt);
                        return false;
                    }
                }
            }
        } else {
            document.getElementById("WNDbuttons").focus();
            preventpropagate(evnt);
            return false;
        }
    }
    if (evnt.keyCode == 9) {
        if (srcElement.id == "WNDbuttons") {
            document.getElementById("gotoYY").focus();
            preventpropagate(evnt);
            return false;
        } else {
            var elem = eleCal[0].cells;
            for (var i = 0; i < elem.length; i++) {
                if (elem[i].className != "TDblank") {
                    elem[i].focus();
                    preventpropagate(evnt);
                    return false;
                }
            }
        }
    }
}

function goToYear() {
    var gotoYY = nCurrentYear;
    do {
        gotoYY = prompt(mainWin.getItemDesc("ENTER_YEAR"), nCurrentYear);
        if (!gotoYY) break;
    } while (isNaN(gotoYY) || (gotoYY < 1900) || (gotoYY > 9999));

    if (gotoYY) {
        year = gotoYY;
        getHolidayList();
    }
}

function wfNextMonth() {
    month++;
    if (month > 12) {
        month -= 12;
        year++;
    }
    getHolidayList();
}

function wfPrevMonth() {
    month--;
    if (month < 1) {
        month += 12;
        year--;
    }
    getHolidayList();
}

function wfPrevYear() {
    year--;
    getHolidayList();
}

function wfNextYear() {
    year++;
    getHolidayList();
}

function fnExitCal() {
    parent.unmask();
    //Fix for 17235409
    if(getNextSibling(getNextSibling(parentDsoDt)).tagName.toUpperCase() == "INPUT"){
      getNextSibling(getNextSibling(parentDsoDt)).focus();
    }else{
      getNextSibling(getNextSibling(getNextSibling(parentDsoDt))).focus();
    }
    var winDivObj = parent.document.getElementById("ChildWinwfNotes");
    winDivObj.children[0].src = "";
    parent.document.getElementById("Div_ChildWin").removeChild(winDivObj);
}

function CalendarAccessKeys(e) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var evnt = window.event || e;
    if (evnt.keyCode == 27) {
        fnExitCal();
        return;
    } else if (evnt.keyCode == 8) {
        fnDisableBrowserKey(evnt);
        preventpropagate(evnt);
        try {
            evnt.keyCode = 0;
        } catch (e) {}
        return false;
    } else if (evnt.keyCode == 33) {
        prevMonth();
    } else if (evnt.keyCode == 34) {
        nextMonth();
    } else if (evnt.keyCode == 35) {
        nextYear();
    } else if (evnt.keyCode == 36) {
        prevYear();
    } else {
        return disableCommonKeys(evnt);
    }
}


function fnCalcHgtCalendar(winId) {
	var scrWidth = "";
	parent.document.getElementById(winId).style.width = parent.document.getElementById(winId).parentNode.offsetWidth - 1 + "px";
	scrWidth = parent.document.getElementById(winId).parentNode.offsetWidth - 1;
	parent.document.getElementById(winId).children[0].style.width = scrWidth + "px";
	var scrHeight = parent.document.getElementById(winId).parentNode.offsetHeight;
	parent.document.getElementById(winId).style.height = scrHeight/2-10 + "px";
	parent.document.getElementById(winId).children[0].style.height = scrHeight/2 -12 + "px";
        parent.document.getElementById("vTabCN_CENTRAL_PROCESSPart1Calender").style.height = scrHeight/2-10 + "px";
        document.getElementById('DIVif1').style.height = scrHeight/2-14 + "px";
        document.getElementById('DIVif1').childNodes[0].style.height = scrHeight/2-14 + "px";
        document.getElementById('DIVif1').childNodes[0].childNodes[2].style.height = scrHeight/2-54 + "px";
        //parent.document.getElementById(winId).children[0].style.height = document.getElementById('DIVif1').clientHeight+"px";
}

function fnCalcHgtCalendarDBoard(winId) {
	var scrWidth = parent.document.getElementById("DIVTabContentDBoardTasks").offsetWidth - 4;
	var scrHeight = parent.document.getElementById("DIVTabContentDBoardTasks").offsetHeight - parent.document.getElementById("taskbar").offsetHeight- 4;
	parent.document.getElementById("DIVTabContentDBoardTasks").children.namedItem(winId+'ChildWinCalenderDashBoard').children.namedItem('ifrSubScreen').style.width = scrWidth+ "px";
	parent.document.getElementById("DIVTabContentDBoardTasks").children.namedItem(winId+'ChildWinCalenderDashBoard').children.namedItem('ifrSubScreen').style.height = scrHeight+ "px";
        parent.document.getElementById("DIVTabContentDBoardTasks").children.namedItem(winId+'ChildWinCalenderDashBoard').children[0].contentDocument.getElementById('tblDays').style.width = scrWidth + "px";
        parent.document.getElementById("DIVTabContentDBoardTasks").children.namedItem(winId+'ChildWinCalenderDashBoard').children[0].contentDocument.getElementById('tblDays').style.height = scrHeight-10 + "px";
}

function fnCloseNote(processFlag, rowIndex) {
	var childDivObj = document.getElementById("ChildWinwfNotes");
	if (navigator.userAgent.toLowerCase().indexOf("opera") != -1)
		childDivObj.parentNode.removeChild(childDivObj);
	else {
		childDivObj.getElementsByTagName("IFRAME")[0].src = "";
		document.getElementById("Div_ChildWin").removeChild(childDivObj);
	}
}

function fnSelDay(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if (srcElement.className != "TDblank") {
        nCurrentDay = parseInt(getInnerText(srcElement), 10);
        setYearMonth(nCurrentYear, nCurrentMonth);
    } else return false;
}

function fnExitCal() {
    var winDivObj = parent.document.getElementById("ChildWinwfNotes");
    winDivObj.children[0].src = "";
    parent.document.getElementById("Div_ChildWin").removeChild(winDivObj);
}

function getCalendarTasksCount(pMonth, pYear) {
	var queueId = "CALENDAR";
	var page = "FIRST";
	var SortField = "";
	var SortOrder = "";
	var i = 0;
	var calTaskList = '';
	var currPage = 1;
  if (pMonth.length < 2 && pMonth < 10)
		pMonth = '0'+pMonth;
	if (!SortField || SortField == '' || SortField == null) {
		SortField = 'CREATEDDATE';
	}
	if (!SortOrder || SortOrder == '' || SortOrder == null) {
		SortOrder = 'ASCENDING';
	}
	currQueueId = queueId;
	currSortField = SortField;
	currSortOrder = SortOrder;
	var totPageTemp=1;
	if(document.getElementById("totalPages")!=null&&((document.getElementById("totalPages").value!=undefined)||typeof(document.getElementById("totalPages").value) != 'undefined')) {   //12.0.2 Changes 
	totPageTemp=document.getElementById("totalPages").value; 
	}
	page = page + "," + currPage + "," + totPageTemp ;
	if (!isTaskSearch) 
		pCode = 'ALL';
	var taskRequestXml = "<TaskRequest OP = 'CALENDAR'>";
	taskRequestXml += "<CalendarMonth>" +pYear+pMonth+ "</CalendarMonth>";
        taskRequestXml += "</TaskRequest>";
        
	var NotaskErrcode = true;
	try {
		tasksDom = getTasksDom(taskRequestXml, pCode);
		gTasksDOM = tasksDom;
	} catch(e) {
		return false;
	}
	if (selectNodes(gTasksDOM, "//RESPONSE").length == 1) {
		//calTaskList = selectSingleNode(gTasksDOM,"//RESPONSE").firstChild.xml;
                calTaskList = getNodeText(selectSingleNode(gTasksDOM,"//RESPONSE"));
		gCalTasksArr = calTaskList.split("#");
	}
	return true;
}

function getCalendarTasks(pYear, pMonth, pDate) {
	var calTaskList = '';
	var pCode = 'ALL';
	if (pMonth < 10)
		pMonth = '0'+pMonth;
	if (pDate < 10)
		pDate = '0'+pDate;
	var calDate = pYear + pMonth + pDate;
	var taskRequestXml = "<TaskRequest OP = 'CALENDARTASKS'>";
	taskRequestXml += "<CalendarDate>" +pYear+pMonth+pDate+ "</CalendarDate>";
        taskRequestXml += "</TaskRequest>";
        
	try {
		tasksDom = getTasksDom(taskRequestXml, pCode);
	} catch(e) {
		return false;
	}
	if (selectNodes(tasksDom, "//RESPONSE").length == 1) {
		//calTaskList = selectSingleNode(tasksDom,"//RESPONSE").firstChild.xml;
                calTaskList = getXMLString(selectSingleNode(tasksDom,"//RESPONSE"));
		gNoteTasksArr = calTaskList.split("#");
	}
	return true;
}

function updateCalendarTasks(pDate, param) {
	var taskRequestXml = "<TaskRequest OP = 'UPDATECALENDARTASKS'>";
	taskRequestXml += "<CalendarDate>" +pDate.substring(0,4)+pDate.substring(5,7)+pDate.substring(8,10)+ "</CalendarDate>";
        taskRequestXml += "<DayNotes>" +param+ "</DayNotes>";
        taskRequestXml += "</TaskRequest>";
      //  updateReminders(pDate, param);
	try {
		tasksDom = getTasksDom(taskRequestXml, pCode);
	} catch(e) {
		fnCloseNote();
		return false;
	}
	if (selectNodes(tasksDom, "//RESPONSE").length == 1) {
		//calTaskList = selectSingleNode(tasksDom,"//RESPONSE").firstChild.xml;
                calTaskList = getXMLString(selectSingleNode(tasksDom,"//RESPONSE"));
		gNoteTasksArr = calTaskList.split("#");
	}
  fnCloseNote();
  setDBYearMonth(pDate.substring(0,4), pDate.substring(5,7), pDate.substring(8,10));
  getCalendarTasks(pDate.substring(0,4), pDate.substring(5,7), pDate.substring(8,10));
	return true;
}
function updateReminders(pDate, param){
    var notesArray = param.split("#");
    for(var i=0;i<notesArray.length-1;i++){
        var tempArray = notesArray[i].split("~");
        var tempArr =new Array();
        tempArr[0] =tempArray[1];
        tempArr[1] =tempArray[2];
        tempArr[2] =pDate+"-"+tempArray[0].replace(/:/g,'-');
        //tempArr[3] =getNodeText(selectSingleNode(taskNodes[idx1],'TASKID'));
        tempArr[3] ='NA';
        tempArr[4] ='DISMISS,RESET,NOTIFY';
        tempArr[5] ='NA';
        parent.reminderAlertArray[parent.reminderAlertArray.length] = tempArr;        
    }
}