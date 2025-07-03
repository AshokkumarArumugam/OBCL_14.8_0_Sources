/*----------------------------------------------------------------------------------------------------
**
** File Name    : DateUtil.js
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

Copyright © 2004-2011   by Oracle Financial Services Software Limited..
---------------------------------------------------------------------------------------------------- 

*/

var gDateFormatDSO = "yyyy-MM-dd";
var gDateSeperator = "-";
var g_dateFromSystemSetting = true;
var gShortMonthValues = new Array();
gShortMonthValues[0] = mainWin.getItemDesc("JAN_3CHAR").toUpperCase();
gShortMonthValues[1] = mainWin.getItemDesc("FEB_3CHAR").toUpperCase();
gShortMonthValues[2] = mainWin.getItemDesc("MAR_3CHAR").toUpperCase();
gShortMonthValues[3] = mainWin.getItemDesc("APR_3CHAR").toUpperCase();
gShortMonthValues[4] = mainWin.getItemDesc("MAY_3CHAR").toUpperCase();
gShortMonthValues[5] = mainWin.getItemDesc("JUN_3CHAR").toUpperCase();
gShortMonthValues[6] = mainWin.getItemDesc("JUL_3CHAR").toUpperCase();
gShortMonthValues[7] = mainWin.getItemDesc("AUG_3CHAR").toUpperCase();
gShortMonthValues[8] = mainWin.getItemDesc("SEP_3CHAR").toUpperCase();
gShortMonthValues[9] = mainWin.getItemDesc("OCT_3CHAR").toUpperCase();
gShortMonthValues[10] = mainWin.getItemDesc("NOV_3CHAR").toUpperCase();
gShortMonthValues[11] = mainWin.getItemDesc("DEC_3CHAR").toUpperCase();

var gLongMonthValues = new Array();
gLongMonthValues[0] = mainWin.getItemDesc("JANUARY").toUpperCase();
gLongMonthValues[1] = mainWin.getItemDesc("FEBRUARY").toUpperCase();
gLongMonthValues[2] = mainWin.getItemDesc("MARCH").toUpperCase();
gLongMonthValues[3] = mainWin.getItemDesc("APRIL").toUpperCase();
gLongMonthValues[4] = mainWin.getItemDesc("MAY").toUpperCase();
gLongMonthValues[5] = mainWin.getItemDesc("JUNE").toUpperCase();
gLongMonthValues[6] = mainWin.getItemDesc("JULY").toUpperCase();
gLongMonthValues[7] = mainWin.getItemDesc("AUGUST").toUpperCase();
gLongMonthValues[8] = mainWin.getItemDesc("SEPTEMBER").toUpperCase();
gLongMonthValues[9] = mainWin.getItemDesc("OCTOBER").toUpperCase();
gLongMonthValues[10] = mainWin.getItemDesc("NOVEMBER").toUpperCase();
gLongMonthValues[11] = mainWin.getItemDesc("DECEMBER").toUpperCase();

var gCurDisplayDate;

function getSeparator(dateFormat)
{
    var separator = "";
    if (dateFormat && dateFormat != "")
    {
        for (i = 0; i < dateFormat.length; i++)
        {
            testCharacter = dateFormat.charAt(i);
            if ((testCharacter.toUpperCase() != 'D') && (testCharacter.toUpperCase() != 'Y') && (testCharacter.toUpperCase() != 'M'))
            {
                separator = testCharacter;
                break;
            }
        }
    }
    return separator;
}

function isValidYear(strYear)
{
    var validYear = true;
    if (!strYear || strYear == null || typeof(strYear) == 'undefined')
    {
        validYear = false;
    } else if ((strYear.length != 4) && (strYear.length != 2))
    {
        validYear = false;
    } else if (containsOnlyDigits(strYear) == false)
    {
        validYear = false;
    } else if (strYear.length == 4)
    {
        if (parseInt(strYear, 10) < 1601) validYear = false;
    }
    return validYear;
}

function containsOnlyDigits(strValue)
{
    var retVal = true;
    for (i = 0; i < strValue.length; i++)
    {
        dummyChr = strValue.charAt(i);
        if (dummyChr < '0' || dummyChr > '9')
        {
            retVal = false;
            break;
        }
    }
    return retVal;
}

function isValidFormat(dateFormat, separator)
{
    var validFormat = true;

    if (!dateFormat || dateFormat == "")
    {
        validFormat = false;
    }

    if (validFormat)
    {
        validFormatCharacters = 'dyM';
        if (separator && separator != "")
        {
            validFormatCharacters += separator;
        }

        for (i = 0; i < dateFormat.length; i++)
        {
            testCharacter = dateFormat.charAt(i);
            if (validFormatCharacters.indexOf(testCharacter) < 0)
            {
                validFormat = false;
                break;
            }
        }
    }

    if (validFormat)
    {
        if (separator && separator != "")
        {
            var arrFormatTokens = dateFormat.split(separator);
            if (arrFormatTokens.length != 3)
            {
                validFormat = false;
            } else
            {
                var numDateTokens = 0,
                numMonthTokens = 0,
                numYearTokens = 0;
                for (i = 0; i < 3; i++)
                {
                    token = arrFormatTokens[i];
                    switch (token)
                    {
                    case "d":
                        numDateTokens++;
                        break;
                    case "dd":
                        numDateTokens++;
                        break;
                    case "M":
                        numMonthTokens++;
                        break;
                    case "MM":
                        numMonthTokens++;
                        break;
                    case "MMM":
                        numMonthTokens++;
                        break;
                    case "MMMM":
                        numMonthTokens++;
                        break;
                    case "yy":
                        numYearTokens++;
                        break;
                    case "yyyy":
                        numYearTokens++;
                        break;

                    default:
                        validFormat = false;
                    }
                }

                if ((numDateTokens != 1) || (numMonthTokens != 1) || (numYearTokens != 1))
                {
                    validFormat = false;
                }
            }
        }
    }

    if (validFormat)
    {
        if (!separator || separator == "")
        {
            dayStartIndex = dateFormat.indexOf("d");
            dayEndIndex = dateFormat.lastIndexOf("d");
            token = dateFormat.substring(dayStartIndex, dayEndIndex + 1);
            if (token != "dd")
            {
                validFormat = false;
            }

            monthStartIndex = dateFormat.indexOf("M");
            monthEndIndex = dateFormat.lastIndexOf("M");
            token = dateFormat.substring(monthStartIndex, monthEndIndex + 1);
            if ((token != "MM") && (token != "MMM"))
            {
                validFormat = false;
            }

            yearStartIndex = dateFormat.indexOf("y");
            yearEndIndex = dateFormat.lastIndexOf("y");
            token = dateFormat.substring(yearStartIndex, yearEndIndex + 1);
            if ((token != "yy") && (token != "yyyy"))
            {
                validFormat = false;
            }
        }
    }
    return validFormat;
}

function getMonthFromMMM(MMM)
{
    var validMonth = false;
    var retVal = -1;

    if (MMM && MMM != "")
    {
        for (i = 0; i < gShortMonthValues.length; i++)
        {
            if (gShortMonthValues[i] == MMM.toUpperCase())
            {
                retVal = i;
                break;
            }
        }
    }
    return retVal;
}

function getMonthFromMMMM(MMMM)
{
    var validMonth = false;
    var retVal = -1;
    if (MMMM && MMMM != "")
    {
        for (i = 0; i < gLongMonthValues.length; i++)
        {
            if (gLongMonthValues[i] == MMMM.toUpperCase())
            {
                retVal = i;
                break;
            }
        }
    }
    return retVal;
}

function isValidMonth(month, lengthMonthFormat)
{
    var retVal = true;
    if (!month || month == "" || month == 'NaN' || typeof(month) == 'undefined')
    {
        retVal = false;
    } else
    {
        switch (month.length)
        {
        case 1:
        case 2:
            if (month.length > 2)
            {
                retVal = false;
            } else if (containsOnlyDigits(month) == false)
            {
                retVal = false;
            } else if ((parseInt(month, 10) < 1) || (parseInt(month, 10) > 12))
            {
                retVal = false;
            }
            break;
        case 3:
            if (getMonthFromMMM(month) < 0)
            {
                retVal = false;
            }
            break;
        case 4:
            if (getMonthFromMMMM(month) < 0)
            {
                retVal = false;
            }
            break;
        default:
            retVal = false;
            break;
        }
    }
    return retVal;
}

function format(y, m, d, dateFormat, separator)
{
    var l_retval = '';
    var y1;
    var m1;
    var d1;
    var dateFormatComp = '';

    if (!dateFormat || dateFormat == '')
    {
        dateFormat = gDateFormatDSO;
    }
    if (!separator || separator == '')
    {
        separator = gDateSeperator
    }
    d1 = parseInt(d, 10);
    y1 = y % 100;
    m1 = parseInt(m, 10) + 1;
    dateFormatComp = splitDateFormat(dateFormat, separator);
    for (var i = 0; i < 3; i++)
    {
        switch (dateFormatComp[i])
        {
        case 'd':
            l_retval += d1;
            break;
        case 'D':
            l_retval += d1;
            break;
        case 'dd':
            if (d1 < 10) l_retval += '0';
            l_retval += d1;
            break;
        case 'DD':
            if (d1 < 10) l_retval += '0';
            l_retval += d1;
            break;
        case 'M':
            l_retval += m1;
            break;
        case 'MM':
            if (m1 < 10) l_retval += '0';
            l_retval += m1;
            break;
        case 'MMM':
            l_retval += getMonthFromMMM(m);
            break;
        case 'MON':
            l_retval += gShortMonthValues[m];
            break;
        case 'MMMM':
            l_retval += getMonthFromMMMm(m);
            break;
        case 'yy':
            if (y1 == 0) l_retval += "00";
            else
            {
                if (y1 < 10) l_retval += "0";
                l_retval += y1;
            }
            break;
        case 'YY':
            if (y1 == 0) l_retval += "00";
            else
            {
                if (y1 < 10) l_retval += "0";
                l_retval += y1;
            }
            break;

        case 'YYYY':
            var fulYear = getYYYYfromYYMMDD(y + '', m1 + '', d1 + '');
            l_retval += fulYear;
            break;
        case 'yyyy':
            var fulYear = getYYYYfromYYMMDD(y + '', m1 + '', d1 + '');
            l_retval += fulYear;
            break;
        }
        if (i < 2) if (separator && separator != '' && separator.toUpperCase() != "NULL");
        l_retval += separator;
    }
    l_retval = l_retval.substring(0,l_retval.length-1);
    return l_retval;
}

function hostFormat(clientDate)
{
    var l_retval = '';
    var m1;
    var y1;
    var dmy = new Array();

    get_dd_mm_yy(clientDate, dmy);
    y1 = parseInt(dmy[2], 10);
    m1 = dmy[1] + 1;
    if (y1 >= 0 && y1 <= 99) y1 += (y1 < 50 ? 2000 : 1900);

    dmy[2] = y1;
    l_retval += dmy[2];
    if (dmy[1] < 9) l_retval += '0';
    l_retval += m1;

    if (dmy[0] < 10) l_retval += '0';
    l_retval += dmy[0];

    return l_retval;
}

function clientFormat(hostDate)
{
    var dmy = new Array();
    dmy[0] = hostDate.substring(6, hostDate.length);
    dmy[1] = hostDate.substring(4, 6);
    dmy[2] = hostDate.substring(0, 4);

    var clientDate = format(parseInt(dmy[2], 10), parseInt(dmy[1], 10) - 1, parseInt(dmy[0], 10));
    return clientDate;
}

function getInputDateFormat(dateFormat)
{
    var dateInputFormat = null;
    if (dateFormat && dateFormat != "")
    {
        dateInputFormat = dateFormat;
    } else if (gInpDateFormat && gInpDateFormat != "")
    {
        dateInputFormat = gInpDateFormat;
    } else
    {
        dateInputFormat = getSystemShortDateFormat();
    }
    return dateInputFormat;
}

function splitDateFormat(dateInputFormat, separator)
{
    if (!separator || separator == '' || separator.toUpperCase() == "NULL")
    {
        var dateFormat = new Array();
        var upperCaseDateFormat = dateInputFormat.toUpperCase();
        var yStartIndex = -1;
        var yEndIndex = -1;

        yStartIndex = upperCaseDateFormat.indexOf("Y");
        yEndIndex = upperCaseDateFormat.lastIndexOf("Y");
        dateFormat.push(dateInputFormat.substring(yStartIndex, yEndIndex + 1));
        yStartIndex = -1;
        yEndIndex = -1;
        yStartIndex = upperCaseDateFormat.indexOf("M");
        yEndIndex = upperCaseDateFormat.lastIndexOf("M");
        dateFormat.push(dateInputFormat.substring(yStartIndex, yEndIndex + 1));
        yStartIndex = -1;
        yEndIndex = -1;
        yStartIndex = upperCaseDateFormat.indexOf("D");
        yEndIndex = upperCaseDateFormat.lastIndexOf("D");
        dateFormat.push(dateInputFormat.substring(yStartIndex, yEndIndex + 1));
        return dateFormat;
    } else
    {
        return dateInputFormat.split(separator);
    }
}

function splitDate(dt, dateFormatComp, separator)
{
    if (!separator || separator == '' || separator.toUpperCase() == "NULL")
    {
        var dateComp = new Array();
        var offset = 0;
        for (var cnt = 0; cnt < dateFormatComp.length; cnt++)
        {
            dateComp.push(dt.substring(offset, offset + dateFormatComp[cnt].length));
            offset = offset + dateFormatComp[cnt].length;
        }
        return dateComp;
    } else
    {
        return dt.split(separator);
    }
}

function get_dd_mm_yy(dt, dateInputFormat, separator, dmy)
{
    var dd, mm, yy;
    var date_format_parts = splitDateFormat(dateInputFormat, separator);
    var date_parts = splitDate(dt, date_format_parts, separator);
    for (var cnt = 0; cnt < date_format_parts.length; cnt++)
    {
        if (date_format_parts[cnt].toUpperCase().charAt(0) == 'Y')
        {
            yy = date_parts[cnt];
        } else if (date_format_parts[cnt].toUpperCase().charAt(0) == 'D')
        {
            dd = date_parts[cnt];
        } else if (date_format_parts[cnt].toUpperCase().charAt(0) == 'M')
        {
            switch (date_format_parts[cnt].toUpperCase())
            {
            case 'M':
                mm = date_parts[cnt];
                break;
            case 'MM':
                mm = date_parts[cnt];
                break;
            case 'MMM':
                mm = parseInt(getMonthFromMMM(date_parts[cnt].toUpperCase()), 10) + 1 + '';
                break;
            case 'MON':
                mm = parseInt(getMonthFromMMM(date_parts[cnt].toUpperCase()), 10) + 1 + '';
                break;
            case 'MMMM':
                mm = parseInt(getMonthFromMMMM(date_parts[cnt].toUpperCase()), 10) + 1 + '';
                break;
            }

        }
    }
    dmy[0] = dd;
    dmy[1] = mm;
    dmy[2] = yy;
    return;
}

function MB3Date(inputDate, dateFormat)
{
    this.validDate = true;
    this.yyyy = 0;
    this.mm = 0;
    this.dd = 0;
    this.separator = null;
    this.dateInputFormat = null;

    var sep = null;
    var dFormat = null
    var lengthMonthFormat = null;
    var ddInput, mmInput, yyInput;

    if (inputDate == null || inputDate == "")
    {
        return;
    }
    dFormat = getInputDateFormat(dateFormat);
    sep = getSeparator(dFormat);
    var dmy = new Array();
    try
    {
        get_dd_mm_yy(inputDate, dFormat, sep, dmy);
        ddInput = dmy[0];
        mmInput = dmy[1];
        yyInput = dmy[2];
    } catch(e)
    {
        //alert('Exception while Parsing date ');
        //CHANGES FOR NLS
        alert(mainWin.getItemDesc("LBL_EXCEPTION_PARS_DATE"));
        this.validDate = false;
    }

    if (this.validDate)
    {
        if (!isValidYear(yyInput))
        {
            displayMsg('ST-COM005', dFormat + '~');
            this.validDate = false;
        }
    }

    if (this.validDate)
    {
        if (!isValidMonth(mmInput + ''))
        {
            displayMsg('ST-COM006', dFormat + '~');
            this.validDate = false;
        }
    }

    if (this.validDate)
    {
        if (containsOnlyDigits(ddInput) == false)
        {
            displayMsg('ST-COM007', dFormat + '~');
            this.validDate = false;
        }
    }

    if (this.validDate)
    {
        var dummyDate = getDateObject(yyInput, mmInput - 1, ddInput);
        if ((dummyDate.getMonth() + 1) != (mmInput))
        {
            displayMsg('ST-COM007', dFormat + '~');
            this.validDate = false;
        }
    }

    if (this.validDate)
    {
        this.yyyy = yyInput;
        this.mm = mmInput - 1 + '';
        this.dd = ddInput;
        this.separator = sep;
        this.dateInputFormat = dFormat;
    }

    this.isValidDate = isValidDate;
    this.getShortDate = getShortDate;
    this.getLongDate = getLongDate;
    this.getInputDate = getInputDate;
    this.getDSODate = getDSODate;
    this.getFormattedDate = getFormattedDate;
    this.getInputDateFormat = getInputDateFormat;
}

function getDSODate()
{
    var dateFormat = gDateFormatDSO;
    var retDate = format(this.yyyy, this.mm, this.dd, gDateFormatDSO, gDateSeperator);
    return retDate;
}

function getFormattedDate(dateFormat)
{
    if (this.isValidDate())
    {
        var Separator = getSeparator(dateFormat);
        var retDate = format(this.yyyy, this.mm, this.dd, dateFormat, Separator); // formatDate('' + this.yyyy + zeroPrefix(this.mm,2) + zeroPrefix(this.dd,2), dateFormat);
        return retDate;
    }
}

function getInputDate()
{
    if (this.isValidDate())
    {
        var retDate = format(this.yyyy, this.mm, this.dd, this.dateInputFormat, this.separator);
        return retDate;
    }
}

function getShortDate()
{
    if (this.isValidDate())
    {
        return getSystemShortDate(this.yyyy, parseInt(this.mm, 10) + 1, this.dd);
    }
}

function getLongDate()
{
    if (this.isValidDate())
    {
        return getSystemLongDate(this.yyyy, parseInt(this.mm, 10) + 1, this.dd);
    }
}

function isValidDate()
{
    return (this.validDate);
}

function changeDateFormatFromOracleToJava(dsDate)
{
    var oraDate = dsDate;
    var oraDateParts = oraDate.split("-");
    var javaDateParts = new Array();
    javaDateParts[0] = oraDateParts[2];
    javaDateParts[2] = oraDateParts[0];

    var oraMonths = new Array();

    oraMonths['JAN'] = "01";
    oraMonths['FEB'] = "02";
    oraMonths['MAR'] = "03";
    oraMonths['APR'] = "04";
    oraMonths['MAY'] = "05";
    oraMonths['JUN'] = "06";
    oraMonths['JUL'] = "07";
    oraMonths['AUG'] = "08";
    oraMonths['SEP'] = "09";
    oraMonths['OCT'] = "10";
    oraMonths['NOV'] = "11";
    oraMonths['DEC'] = "12";

    javaDateParts[1] = oraMonths[oraDateParts[1]]
    var javaFormatDate = javaDateParts[0] + "-" + javaDateParts[1] + "-" + javaDateParts[2];
    return javaFormatDate;

}

function displayDate(dataBoundElem, triggerOnChange)
{
    var idDispVal = dataBoundElem.id + "I";

    if (dataBoundElem.parentNode.tagName.toUpperCase() == "NOBR" || dataBoundElem.parentNode.tagName.toUpperCase() == "DIV") var inpElem = dataBoundElem.parentNode.parentNode.parentNode[idDispVal];
    else var inpElem = dataBoundElem.parentNode.parentNode[idDispVal];

    var dsDate = dataBoundElem.value;
    if (dsDate && dsDate != "")
    {
        var mb3Date = new MB3Date(dsDate, gDateFormatDSO);
        if (mb3Date.isValidDate())
        {
            var oldVal = inpElem.value;
            if (g_dateFromSystemSetting)
            {
                inpElem.value = mb3Date.getShortDate();
            } else
            {
                inpElem.value = mb3Date.getInputDate();
            }
        }
    } else
    {
        inpElem.value = "";
    }
}

/*
 * Display the date on the screen
 */
function acceptInputDate(idDate)
{
    var curInpElem = getEventSourceElement(event);
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV") var curDataBoundElem = curInpElem.parentNode.parentNode.parentNode[idDate];
    else var curDataBoundElem = curInpElem.parentNode.parentNode[idDate];

    var dsDate = curDataBoundElem.value;
    if (dsDate && dsDate != "")
    {
        var mb3Date = new MB3Date(dsDate, gDateFormatDSO);
        if (mb3Date.isValidDate())
        {
            if (g_dateFromSystemSetting)
            {
                curInpElem.value = mb3Date.getShortDate();
            } else
            {
                curInpElem.value = mb3Date.getInputDate();
            }
            window.status = mb3Date.getLongDate();
        }
    }
    //Store the current display date in global variable
    //so that we can know if date has changed during focus out event
    gCurDisplayDate = curInpElem.value;
}

/*
 * Validate the date entered. If the date entered is valid, set the
 * date bound to DSO with entered date
 */
function validateInputDate(idDate)
{
    var curInpElem = getEventSourceElement(event);
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV") var curDataBoundElem = curInpElem.parentNode.parentNode.parentNode[idDate];
    else var curDataBoundElem = curInpElem.parentNode.parentNode[idDate];
    var inpDate = curInpElem.value;
    var mb3Date;
    window.status = '';
    //If the input date has changed, validate the date and
    //set it in Field that is bound to Data Source
    if (inpDate && inpDate != "")
    {
        if (g_dateFromSystemSetting)
        {
            var mb3Date = new MB3Date(inpDate, getSystemShortDateFormat());
        } else
        {
            var mb3Date = new MB3Date(inpDate, gDateFormatDSO);
        }
        if (mb3Date.isValidDate())
        {
            //always set hidden field's value equal to mask field value
            //Reddy prasad - set hidden field and input field values to mb3Date,
            //since curDataBoundElem is a collection of both hidden and input fields
            if (curDataBoundElem.length == 2)
            {
                curDataBoundElem[0].value = mb3Date.getDSODate();
                curDataBoundElem[1].value = mb3Date.getDSODate();
            } else
            {
                curDataBoundElem.value = mb3Date.getDSODate();
            }
        } else
        {
            curInpElem.value = "";
            if(getPreviousSibling(getPreviousSibling(curInpElem)).tagName != "LABEL"){
                getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
            }else{
                getPreviousSibling(getPreviousSibling(getPreviousSibling(curInpElem))).value = "";
            } 
            event.returnValue = false;
        }
    } else
    {
        curDataBoundElem.value = "";
    }
}

/*
 *Returns True if the given year is leap year else False
 */
function fnLeapYear(inYear)
{
    var leapFlag = false;
    if (inYear % 4 == 0)
    {
        if (inYear % 100 == 0)
        {
            if (inYear % 400 == 0) leapFlag = true;
            else leapFlag = false;
        } else
        {
            leapFlag = true;
        }
    } else
    {
        leapFlag = false;
    }
    return leapFlag;
}

function getAuditBlockDate(serverDate)
{
    var dateArr = serverDate.split(" ");
    var sysDate = "";
    var mb3Date = new MB3Date(dateArr[0], gDateFormatDSO);
    if (mb3Date.isValidDate()) sysDate = mb3Date.getShortDate();
    var sysTime = getSystemTime(dateArr[1]);
    return sysDate + " " + sysTime;
}
