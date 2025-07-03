/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtCalendar.js
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

**  Modified By          : Neethu Sreedharan
**  Modified On          : 07-Oct-2016
**  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                           to user as alert and on click of Ok button on alert window, screen will be 
                           unmasked and user can try the action again.
**  Retro Source         : 9NT1606_12_0_3_INTERNAL
**  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
---------------------------------------------------------------------------------------------------- 
 */
var PrveClassElem = "";
var focusCell = "";
var gLongMonthValues = new Array();

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

function setHeights() {
    var childWinObj = parent.document.getElementById("ChildWin");
    childWinObj.style.width = document.getElementById("DIVWNDContainer").offsetWidth + "px";
    childWinObj.children[0].style.width = document.getElementById("DIVWNDContainer").offsetWidth + "px";
    childWinObj.style.height = document.getElementById("DIVWNDContainer").offsetHeight + "px";
    childWinObj.children[0].style.height = document.getElementById("DIVWNDContainer").offsetHeight + "px";
    parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);
    childWinObj.style.top = document.getElementById("WNDtitlebar").offsetHeight + "px";
    childWinObj.style.left = "4px";
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

function getHolidayList() {
    //inDate = setActionTime();
    var calReqDom = null;
    var serverURL = "ExtHolidayFetchData?";
    serverURL += "year=" + year;
    serverURL += "&month=" + month;
    serverURL += "&functionId=" + functionId;
    serverURL += "&txnBranch=" + txnBranch;
    serverURL += "&DEBUGWINDOW=" +mainWin.DebugWindowFlg; //logging changes
    //serverURL += "&seqNo=" + getSeqNo();//Logging changes
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var objHTTP = createHTTPActiveXObject();
	try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", serverURL, false);
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    var t = getDateObject();
    posttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    
    objHTTP.send(calReqDom);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start 
     catch(exp){
          mainWin.handleNetWorkErr(exp);
    } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    
    t = getDateObject();
    afterposttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    
    if (objHTTP.status == 200) {
        mainWin.inactiveTime = 0;
        var respDOM = objHTTP.responseXML;
        var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
        if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
            alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
        } 
        else if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change start
            mainWin.mask(); 
            mainWin.sessionTimeOut = true;
            mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
            return false;
        }//session expiry change end
        else {
           /* var respTxt = getXMLString(respDOM);
            if (respTxt.indexOf("<FCUBS_DEBUG_RESP>") !=  - 1) {
                appendDebug(respDOM);
                var start = respTxt.substring(0, respTxt.indexOf("<FCUBS_DEBUG_RESP>"));
                var end = respTxt.substring(respTxt.indexOf("</FCUBS_DEBUG_RESP>") + 19, respTxt.length);
                respTxt = start + end;
                respDOM = loadXMLDoc(respTxt);
            }*/
            holidays = getNodeText(selectSingleNode(respDOM, "FCUBS_RES_ENV/RESPONSE"));
            
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
            setYearMonth(year, month);
           // fnpostAction('CALENDAR',respDOM);
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
        dayTbl.rows[dayRows].cells[dayCells].removeAttribute('ontouchstart');//HTML5 Changes
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
        addEvent(dayTbl.rows[dayRows].cells[cellIndex], "onclick", "fnSelDay(event)");
        addEvent(dayTbl.rows[dayRows].cells[cellIndex], "ondblclick", "fnRetSelDate(event)");
        addEvent(dayTbl.rows[dayRows].cells[cellIndex], "ontouchstart", "fnRetSelDateDevice(event)");//HTML5 Changes
        //Fix for 17274087 start
		//addEvent(dayTbl.rows[dayRows].cells[cellIndex], "onkeypress", "fnRetSelDate(event)");
        addEvent(dayTbl.rows[dayRows].cells[cellIndex], "onkeydown", "fnHandleCalKeys(event);fnRetSelDate(event);");
        //Fix for 17274087 end
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
    } //End of While loop
}

function fnSelDay(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if (srcElement.className != "TDblank") {
        nCurrentDay = parseInt(getInnerText(srcElement), 10);
        setYearMonth(nCurrentYear, nCurrentMonth);
    } else return false;
}

/*HTML5 Changes Start*/
var doubleTap = false;
function fnRetSelDateDevice(event) {
    var evnt = window.event || event;
    if(!doubleTap) {
        doubleTap = true;
        setTimeout( function() { doubleTap = false; }, 500 );
        return false;
    }
    preventpropagate(evnt);
    fnRetSelDate(event);
}
/*HTML5 Changes End*/
function fnRetSelDate(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if (typeof (evnt.keyCode) == "undefined" || evnt.keyCode == 0 || evnt.keyCode == 13) {
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
            parentDsoDt.removeAttribute("today");//Summary save - calendar changes
            fireHTMLEvent(parentDsoDt, "onpropertychange")
        }
        if (gCalBtn && gCalBtn != '') {
            parentBtnDt.focus();
        }
        fnExitCal();
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

function nextMonth() {
    month++;
    if (month > 12) {
        month -= 12;
        year++;
    }
    getHolidayList();
}

function prevMonth() {
    month--;
    if (month < 1) {
        month += 12;
        year--;
    }
    getHolidayList();
}

function prevYear() {
    year--;
    getHolidayList();
}

function nextYear() {
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
    var winDivObj = parent.document.getElementById("ChildWin");
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

function selectToday(e) {//Summary save - calendar changes
    var evnt = window.event || e;
    if (typeof (evnt.keyCode) == "undefined" || evnt.keyCode == 0 || evnt.keyCode == 13) {
        if (typeof (mainWin.gActiveWindow) != 'undefined' || mainWin.gActiveWindow != null) {
            parentDsoDt = parent.gCalDSODate;
            parentBtnDt = parent.gCalBtn;
            parentDateFormatDSO = parent.gDateFormatDSO;
        }
        var selectedDsoDt = mainWin.AppDate;
        if (parentDsoDt && (parentDsoDt.value != selectedDsoDt)) {
            parentDsoDt.value = selectedDsoDt;
            parentDsoDt.setAttribute("today","true");
            fireHTMLEvent(parentDsoDt, "onpropertychange")
        }
        if (gCalBtn && gCalBtn != '') {
            parentBtnDt.focus();
        }
        fnExitCal();
    }
}