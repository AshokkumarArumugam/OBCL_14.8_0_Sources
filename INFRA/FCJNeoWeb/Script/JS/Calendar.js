/*----------------------------------------------------------------------------------------------------
**
** File Name    : Calendar.js
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

Copyright © 2004-2009  by Oracle Financial Services Software Limited..
---------------------------------------------------------------------------------------------------- 
 */

var gLongMonthValues = new Array();
//10.2SP1 Security changes, picking userid, branch_code,lang from session for child windows like lov , calendar.jsp , imagepload.jsp
/*gLongMonthValues[0]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("JANUARY");
gLongMonthValues[1]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("FEBRUARY");
gLongMonthValues[2]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("MARCH");
gLongMonthValues[3]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("APRIL");
gLongMonthValues[4]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("MAY");
gLongMonthValues[5]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("JUNE");
gLongMonthValues[6]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("JULY");
gLongMonthValues[7]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("AUGUST");
gLongMonthValues[8]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("SEPTEMBER");
gLongMonthValues[9]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("OCTOBER");
gLongMonthValues[10] = opener.dlgArg.mainWin.frames["Global"].getItemDesc("NOVEMBER");
gLongMonthValues[11] = opener.dlgArg.mainWin.frames["Global"].getItemDesc("DECEMBER");*/

gLongMonthValues[0] = opener.frames["Global"].getItemDesc("JANUARY");
gLongMonthValues[1] = opener.frames["Global"].getItemDesc("FEBRUARY");
gLongMonthValues[2] = opener.frames["Global"].getItemDesc("MARCH");
gLongMonthValues[3] = opener.frames["Global"].getItemDesc("APRIL");
gLongMonthValues[4] = opener.frames["Global"].getItemDesc("MAY");
gLongMonthValues[5] = opener.frames["Global"].getItemDesc("JUNE");
gLongMonthValues[6] = opener.frames["Global"].getItemDesc("JULY");
gLongMonthValues[7] = opener.frames["Global"].getItemDesc("AUGUST");
gLongMonthValues[8] = opener.frames["Global"].getItemDesc("SEPTEMBER");
gLongMonthValues[9] = opener.frames["Global"].getItemDesc("OCTOBER");
gLongMonthValues[10] = opener.frames["Global"].getItemDesc("NOVEMBER");
gLongMonthValues[11] = opener.frames["Global"].getItemDesc("DECEMBER");
var gShortDayValues = new Array();

//10.2SP1 Security changes, picking userid, branch_code,lang from session for child windows like lov , calendar.jsp , imagepload.jsp
/*gShortDayValues[0]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("MONDAY_3CHAR");
gShortDayValues[1]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("TUESDAY_3CHAR");
gShortDayValues[2]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("WEDNESDAY_3CHAR");
gShortDayValues[3]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("THURSDAY_3CHAR");
gShortDayValues[4]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("FRIDAY_3CHAR");
gShortDayValues[5]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("SATURDAY_3CHAR");
gShortDayValues[6]  = opener.dlgArg.mainWin.frames["Global"].getItemDesc("SUNDAY_3CHAR");*/

gShortDayValues[0] = opener.frames["Global"].getItemDesc("MONDAY_3CHAR");
gShortDayValues[1] = opener.frames["Global"].getItemDesc("TUESDAY_3CHAR");
gShortDayValues[2] = opener.frames["Global"].getItemDesc("WEDNESDAY_3CHAR");
gShortDayValues[3] = opener.frames["Global"].getItemDesc("THURSDAY_3CHAR");
gShortDayValues[4] = opener.frames["Global"].getItemDesc("FRIDAY_3CHAR");
gShortDayValues[5] = opener.frames["Global"].getItemDesc("SATURDAY_3CHAR");
gShortDayValues[6] = opener.frames["Global"].getItemDesc("SUNDAY_3CHAR");

var nCurrentYear = 0;
var nCurrentMonth = 0;
var nCurrentDay = 0;

function Calendar()
{
    var calString = "";

    calString += "<Div CLASS='calDivMain'>";
    calString += "<table CLASS='calTableMain' cellspacing='0' cellpadding='0' border=0 summary=''>\n";
    calString += "<tr>";
    calString += "<td>";

    calString += "<table CLASS='calTableNav' cellspacing='0' cellpadding='0' border=0 summary=''><tr>";
    calString += "<td><BUTTON CLASS='calBtnNav' onclick='prevYear()' onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)>&lt;&lt;</BUTTON></td>";
    calString += "<td><BUTTON CLASS='calBtnNav' onclick='prevMonth()' onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)>&lt;</BUTTON></td>";
    calString += "<td width=100%><BUTTON CLASS='calBtnGoto' onclick='goToYear()' id=gotoYY onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)></BUTTON></td>";
    calString += "<td><BUTTON CLASS='calBtnNav' onclick='nextMonth()' onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)>&gt;</BUTTON></td>";
    calString += "<td><BUTTON CLASS='calBtnNav' onclick='nextYear()' onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)>&gt;&gt;</BUTTON></td>";
    calString += "</tr>";
    calString += "</table>";

    calString += "</td>";
    calString += "</tr>";

    calString += "<tr>";
    calString += "<td valign='top'>";

    calString += "<table id='tblDays' CLASS='calTableDays' cellspacing='0' cellpadding='0' border=0 summary='"+ opener.frames["Global"].getItemDesc("LBL_CALENDAR_DAYS") +"'>\n";
    calString += "<thead>";
    calString += "	<tr CLASS='calTRDaysHead'>";
    calString += "		<th CLASS='calTHDays'>" + gShortDayValues[0] + "</th>";
    calString += "		<th CLASS='calTHDays'>" + gShortDayValues[1] + "</th>";
    calString += "		<th CLASS='calTHDays'>" + gShortDayValues[2] + "</th>";
    calString += "		<th CLASS='calTHDays'>" + gShortDayValues[3] + "</th>";
    calString += "		<th CLASS='calTHDays'>" + gShortDayValues[4] + "</th>";
    calString += "		<th CLASS='calTHDays' style=color:Red>" + gShortDayValues[5] + "</th>";
    calString += "		<th CLASS='calTHDays' style=color:Red>" + gShortDayValues[6] + "</th>";
    calString += "</tr>";
    calString += "</thead>";
    calString += "<tbody>";

    var td7Days = "<td onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)></td><td onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)></td><td onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)></td><td onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)></td><td onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)></td><td onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)></td><td onmouseover=fnMouseOverCal(this) onmouseout=fnMouseOutCal(this) onmousedown=fnMouseDownCal(this)></td>";

    calString += "	<tr CLASS='calTRDays'>" + td7Days + "</tr>";
    calString += "	<tr CLASS='calTRDays'>" + td7Days + "</tr>";
    calString += "	<tr CLASS='calTRDays'>" + td7Days + "</tr>";
    calString += "	<tr CLASS='calTRDays'>" + td7Days + "</tr>";
    calString += "	<tr CLASS='calTRDays'>" + td7Days + "</tr>";
    calString += "	<tr CLASS='calTRDays'>" + td7Days + "</tr>";
    calString += "</tbody>";
    calString += "</table>";
    calString += "</td>";
    calString += "</tr>";
    calString += "</table>";
    calString += "</Div>";
    ResTree.innerHTML = calString;
}

function doLoad()
{
    Calendar();
    //10.2SP1 Security changes, picking userid, branch_code,lang from session for child windows like lov , calendar.jsp , imagepload.jsp
    //date = window.opener.dlgArg.mainWin.frames['Global'].AppDate;    
   // date = window.opener.frames['Global'].AppDate;
    date=txnBranchDate;
    if (parentDsoDt && parentDsoDt != '' && parentDsoDt.value && (parentDsoDt.value != ''))
    {
        var curDate = parentDsoDt.value;
        if (parentDateFormatDSO == "yyyy-MM-dd")
        {
            nCurrentYear = curDate.substr(0, 4);
            nCurrentMonth = curDate.substr(5, 2);
            nCurrentDay = curDate.substr(8, 2);
        } else
        {
            nCurrentYear = curDate.substr(0, 4);
            nCurrentMonth = curDate.substr(4, 2);
            nCurrentDay = curDate.substr(6, 2);
        }
    } else
    {
        var l_date = date.split("-");
        nCurrentYear = l_date[0];
        if (parseInt(nCurrentYear) < 1000) parseInt(nCurrentYear) += 1900;
        nCurrentMonth = l_date[1];
        nCurrentDay = l_date[2];
    }
    setYearMonth(nCurrentYear, nCurrentMonth);
}

function fnSelDay()
{
    nCurrentDay = parseInt(event.srcElement.innerText, 10);
    setYearMonth(nCurrentYear, nCurrentMonth);
}

function fnRetSelDate()
{
    //10.2SP1 Security changes, picking userid, branch_code,lang from session for child windows like lov , calendar.jsp , imagepload.jsp
    if (typeof(opener.gActiveWindow) != 'undefined' || opener.gActiveWindow != null)
    {
        /*
					10.2 SP1 - Obtain the dependent date input area from the opener window.
				*/
        parentDsoDt = opener.gCalDSODate;
        parentBtnDt = opener.gCalBtn;
        parentDateFormatDSO = opener.gActiveWindow.gDateFormatDSO;
    }
    if (opener && !opener.closed)
    {
        var selectedDsoDt = '';
        if (parentDateFormatDSO == "yyyy-MM-dd")
        {
            selectedDsoDt = '' + nCurrentYear + '-' + zeroPrefix(nCurrentMonth, 2) + '-' + zeroPrefix(nCurrentDay, 2);
        } else
        {
            selectedDsoDt = '' + nCurrentYear + zeroPrefix(nCurrentMonth, 2) + zeroPrefix(nCurrentDay, 2);
        }
        if (parentDsoDt && (parentDsoDt.value != selectedDsoDt)) parentDsoDt.value = selectedDsoDt;
        if (gCalBtn && gCalBtn != '')
        {
            parentBtnDt.focus();
        }
    }
    self.close();
}

function fnMouseOverCal(curElem)
{
    if (curElem.className == 'calTDDays')
    {
        curElem.className = 'calTDDaysOver';
    } else if (curElem.className == 'calTDDaysSel')
    {
        curElem.className = 'calTDDaysSelOver';
    } else if (curElem.className == 'calBtnNav')
    {
        curElem.className = 'calBtnNavOver';
    } else if (curElem.className == 'calBtnGoto')
    {
        curElem.className = 'calBtnGotoOver';
    }
    return;
}

function fnMouseOutCal(curElem)
{
    if (curElem.className == 'calTDDaysOver')
    {
        curElem.className = 'calTDDays';
    } else if (curElem.className == 'calTDDaysSelOver')
    {
        curElem.className = 'calTDDaysSel';
    } else if (curElem.className == 'calBtnNavOver')
    {
        curElem.className = 'calBtnNav';
    } else if (curElem.className == 'calBtnGotoOver')
    {
        curElem.className = 'calBtnGoto';
    }
    return;
}

function fnMouseDownCal(curElem)
{
    if (curElem.className == 'calTDDaysOver')
    {
        curElem.className = 'calTDDays';
    } else if (curElem.className == 'calTDDaysSelOver')
    {
        curElem.className = 'calTDDaysSel';
    } else if (curElem.className == 'calBtnNav')
    {
        curElem.className = 'calBtnNavOver';
    } else if (curElem.className == 'calBtnGoto')
    {
        curElem.className = 'calBtnGotoOver';
    }
    return;
}
