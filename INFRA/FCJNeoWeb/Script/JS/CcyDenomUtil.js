/*----------------------------------------------------------------------------------------------------
**
** File Name    : CcyDenomUtil.js
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
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var ccyDenomList = new Array();
function ccyDetail(ccy, allDenomDetail)
{
    this.ccy = ccy;
    this.allDenomDetail = allDenomDetail;
}
function denomDetail(denomCode, denomTxt, denomVal)
{
    this.denomCode = denomCode;
    this.denomTxt = denomTxt;
    this.denomVal = denomVal;
}

var oPopup;
var curDenomDetail;
function onKeyPress(entObj, scrWin)
{
    try
    {
        if (oPopup)
        {
            if (entObj.keyCode == 13)
            {
                entObj.srcElement.value = oPopup.document.getElementById("sel").value
                if (entObj.srcElement.name == "CDDENOM" && curDenomDetail && oPopup)
                {
                    scrWin.document.all.item(entObj.srcElement.sourceIndex + 6).value = curDenomDetail[oPopup.document.getElementById("sel").selectedIndex].denomVal;
                    curDenomDetail = null;
                    entObj.srcElement.parentElement.parentElement.parentElement.all.item("UNITS").focus();
                }
                removePopup();
            } else if (entObj.keyCode == 40)
            {
                if (oPopup.isOpen)
                {
                    var sIndex = oPopup.document.getElementById("sel").selectedIndex;
                    var len = oPopup.document.getElementById("sel").length;
                    if (sIndex >= (len - 1)) oPopup.document.getElementById("sel").selectedIndex = len - 1;
                    else oPopup.document.getElementById("sel").selectedIndex += 1;
                }
            } else if (entObj.keyCode == 38)
            {
                if (oPopup.isOpen)
                {
                    var sIndex = oPopup.document.getElementById("sel").selectedIndex;
                    if (sIndex <= 0) oPopup.document.getElementById("sel").selectedIndex = 0;
                    else oPopup.document.getElementById("sel").selectedIndex -= 1;
                }
            } else if (entObj.keyCode == 27)
            {
                removePopup();
            }
        }
    } catch(e)
    {;
    }
}
function onCdCcyPropertyChange(entObj, scrWin)
{
    if ((entObj.keyCode >= 48 && entObj.keyCode <= 57) || (entObj.keyCode >= 65 && entObj.keyCode <= 90) || (entObj.keyCode >= 97 && entObj.keyCode <= 122) || entObj.srcElement.value == " ")
    {
        removePopup();
        crtCcyPopup(entObj, scrWin);
    } else if (entObj.keyCode == 8) removePopup();
    else onKeyPress(entObj, scrWin);
}
function removePopup()
{
    try
    {
        if (oPopup)
        {
            oPopup.document.body.innerHTML = " ";
            oPopup.hide();
            oPopup = null;
        }
    } catch(e)
    {;
    }
}
function crtCcyPopup(entObj, scrWin)
{
    try
    {
        var wid = entObj.srcElement.clientWidth;
        var hgt = entObj.srcElement.clientHeight;
        var flag = false;
        var innHTML = "<SELECT hideFocus disabled style='WIDTH:" + wid + "; HEIGHT:" + 100 + "border-style :none" + ";BORDER-TOP:none;BORDER-LEFT:none;BORDER-RIGHT:none;BORDER-BOTTOM:none" + "BACKGROUNDCOLOR: powderblue;" + "' size=5 id='sel' name='sel'>";
        for (var i = 0; i < ccyDenomList.length; i++)
        {
            var len = entObj.srcElement.value.length;
            if (entObj.srcElement.value == " " && len == 1)
            {
                if (!flag) innHTML += "<option value =" + ccyDenomList[i].ccy + " selected>" + ccyDenomList[i].ccy + "</option>";
                else innHTML += "<option value =" + ccyDenomList[i].ccy + ">" + ccyDenomList[i].ccy + "</option>";
                flag = true;
            } else if ((ccyDenomList[i].ccy.substring(0, len) == entObj.srcElement.value) && entObj.srcElement.value != "")
            {
                if (!flag) innHTML += "<option value =" + ccyDenomList[i].ccy + " selected>" + ccyDenomList[i].ccy + "</option>";
                else innHTML += "<option value =" + ccyDenomList[i].ccy + ">" + ccyDenomList[i].ccy + "</option>";
                flag = true;
            }
        }
        innHTML += "</select>";

        if (flag)
        {
            oPopup = scrWin.window.createPopup();
            var oPopBody = oPopup.document.body;
            oPopBody.innerHTML = innHTML;
            oPopBody.style.backgroundColor = "lightyellow";
            oPopBody.style.border = "solid black 0px";
            oPopBody.style.zIndex = "1";
            oPopup.show(0, hgt + 2, wid, 90, entObj.srcElement);
        }
        entObj.srcElement.focus();
    } catch(e)
    {}
}

function onCdDenomPropertyChange(entObj, scrWin)
{
    if ((entObj.keyCode >= 48 && entObj.keyCode <= 57) || (entObj.keyCode >= 65 && entObj.keyCode <= 90) || (entObj.keyCode >= 96 && entObj.keyCode <= 122) || entObj.srcElement.value == " "

    )
    {
        removePopup();
        crtDenomPopup(entObj, scrWin);
    } //Alpha Numeric with 0 in NumLock On in Numeric pad
    else if (entObj.keyCode == 8) //BackSpace
    removePopup();
    else onKeyPress(entObj, scrWin); //detect the standard keys
}

function crtDenomPopup(entObj, scrWin)
{
    try
    {
        var srcIndex = entObj.srcElement.sourceIndex;
        var ccyTxtBoxValue = entObj.srcElement.parentElement.parentElement.parentElement.all.item("CDCCY").value;
        var selAllDenomDetail = null;
        var wid = entObj.srcElement.clientWidth;
        var hgt = entObj.srcElement.clientHeight;
        var flag = false;
        var innHTML = "<SELECT hideFocus disabled style='WIDTH:" + wid + "; HEIGHT:" + 100 + "border-style :none" + ";BORDER-TOP:none;BORDER-LEFT:none;BORDER-RIGHT:none;BORDER-BOTTOM:none" + "BACKGROUNDCOLOR: powderblue;" + "' size=5 id='sel' name='sel'>";
        for (var i = 0; i < ccyDenomList.length; i++)
        {
            if ((ccyDenomList[i].ccy == ccyTxtBoxValue) && entObj.srcElement.value != "")
            {
                selAllDenomDetail = ccyDenomList[i].allDenomDetail;
                break;
            }
        }

        if (selAllDenomDetail)
        {
            var curDDindex = 0;
            curDenomDetail = new Array();
            for (var i = 0; i < selAllDenomDetail.length; i++)
            {
                var len = entObj.srcElement.value.length;
                if (entObj.srcElement.value == " " && len == 1)
                {
                    curDenomDetail[curDDindex] = selAllDenomDetail[i];
                    curDDindex++;
                    if (!flag) innHTML += "<option value =" + selAllDenomDetail[i].denomCode + " selected>" + selAllDenomDetail[i].denomCode + "</option>";
                    else innHTML += "<option value =" + selAllDenomDetail[i].denomCode + ">" + selAllDenomDetail[i].denomCode + "</option>";
                    flag = true;
                } else if ((selAllDenomDetail[i].denomCode.substring(0, len) == entObj.srcElement.value) && entObj.srcElement.value != "")
                {
                    curDenomDetail[curDDindex] = selAllDenomDetail[i];
                    curDDindex++;
                    if (!flag) innHTML += "<option value =" + selAllDenomDetail[i].denomCode + " selected>" + selAllDenomDetail[i].denomCode + "</option>";
                    else innHTML += "<option value =" + selAllDenomDetail[i].denomCode + ">" + selAllDenomDetail[i].denomCode + "</option>";
                    flag = true;
                }
            }
        }

        innHTML += "</select>";
        if (flag)
        {
            oPopup = scrWin.window.createPopup();
            var oPopBody = oPopup.document.body;
            oPopBody.innerHTML = innHTML;
            oPopBody.style.backgroundColor = "lightyellow";
            oPopBody.style.border = "solid black 0px";
            oPopBody.style.zIndex = "1";
            oPopup.show(0, hgt + 2, wid, 90, entObj.srcElement);
        }
        entObj.srcElement.focus();
    } catch(e)
    {}
}
