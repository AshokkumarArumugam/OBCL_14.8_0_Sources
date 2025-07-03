/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : Extensible.js
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

Copyright © 2012 - 2013  by Oracle Financial Services Software Limited.. 

---------------------------------------------------------------------------------------------------------*/
var subScrHeaderTabId = "";
var subScrBodyTabId = "";

function fnCalcHgt() {

    var containerDIV = "ChildWin";
    if (typeof (fromSubScr) == 'undefined')
        containerDIV = seqNo;

    var scrwidth = document.getElementById("DIVWNDContainer").offsetWidth;
    var scrHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight);

    if (scrwidth > mainWin.x)
        scrwidth = mainWin.x - 8;

    scrHeight = parseInt(mainWin.document.getElementById("vtab").offsetHeight) - document.getElementById("WNDtitlebar").offsetHeight;

    if (containerDIV == "ChildWin" && scrHeight + document.getElementById("WNDtitlebar").offsetHeight >= parseInt(mainWin.document.getElementById("vtab").offsetHeight)) {
        scrHeight = scrHeight - document.getElementById("WNDtitlebar").offsetHeight;
    }
    //scrHeight = screen.availWidth;
    scrHeight = screen.availHeight;

    if (g_scrType == 'M') {
        scrHeight = scrht;
        scrwidth = scrwdt;
    }
    else if (g_scrType == 'S') {
        scrHeight = scrht;
        scrwidth = scrwdt;
    }
    else if (g_scrType == 'C') {
        scrHeight = scrht;
        scrwidth = scrwdt;
    }
    else {
        document.getElementById("ResTree").className = "DIVThreeColLyt";
        document.getElementById("DIVScrContainer").className = "WNDcontent bigwin";
        var str = navigator.appName;
     /*   if (str == 'Microsoft Internet Explorer') {
            scrHeight = screen.availHeight - 50;

        }

        else {*/
            scrHeight = screen.availHeight - 70;

       // }
        scrwidth = screen.availWidth;

    }
    var tempDh = parent.document.getElementById("topHeader").offsetHeight - 10
    parent.document.getElementById(containerDIV).style.width = scrwidth - 15 + "px";
    parent.document.getElementById(containerDIV).children[0].style.width = scrwidth - 15 + "px";
    parent.document.getElementById(containerDIV).style.height = scrHeight - tempDh + "px";
    parent.document.getElementById(containerDIV).children[0].style.height = scrHeight - tempDh + "px";
    document.getElementById("DIVWNDContainer").style.width = scrwidth - 15 + "px";
    document.getElementById("DIVWNDContainer").style.height = scrHeight - 5 + "px";

    if (containerDIV == "ChildWin") {

        if (parent.seqNo) {
            containerDIV = parent.seqNo;
            parent.parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
        }
        var mainScrHeight = parseInt(mainWin.document.getElementById("vtab").offsetHeight);
        parent.parent.document.getElementById(containerDIV).style.height = mainScrHeight + "px";
        parent.parent.document.getElementById(containerDIV).children[0].style.height = mainScrHeight + "px";
        parent.parent.document.getElementById(containerDIV).style.width = mainWin.x + "px";
        parent.parent.document.getElementById(containerDIV).children[0].style.width = mainWin.x + "px";
        parent.document.getElementById("DIVScrContainer").style.height = mainScrHeight - document.getElementById("WNDtitlebar").offsetHeight - 4 + "px";
        parent.document.getElementById("DIVScrContainer").style.width = mainWin.x - 8 + "px";
        parent.document.getElementById("DIVWNDContainer").style.width = mainWin.x + "px";
        parent.parent.document.getElementById(containerDIV).style.left = "4px";
    }
    else {
        parent.document.getElementById(containerDIV).style.top = parent.document.getElementById("topHeader").offsetHeight + "px";
        var scrpg = parent.parent.document.getElementById(containerDIV).children[0].src;
        if (g_scrType == 'L') {
            parent.hideMenus();

            if (mainWin.x - (document.getElementById("DIVWNDContainer").offsetWidth + 12) > 0) {
                parent.document.getElementById(containerDIV).style.left = mainWin.x - (document.getElementById("DIVWNDContainer").offsetWidth + 12) + "px";
            }
            else {
                parent.document.getElementById(containerDIV).style.left = 0 + 'px';
            }
        }
        else if ( scrpg.indexOf("RadLovEnhancer.jsp") != -1 || scrpg.indexOf("RadRefresh.jsp") != -1 || scrpg.indexOf("RadCopyright.jsp") != -1 || scrpg.indexOf("RadAccessability.jsp") != -1 || scrpg.indexOf("RadSetEnv.jsp") != -1 || scrpg.indexOf("RadPassword.jsp") != -1 || scrpg.indexOf("RadViewExcel.jsp") != -1 || scrpg.indexOf("RadUIXmlGen.jsp") != -1 || scrpg.indexOf("RadExcelTemplate.jsp") != -1 || scrpg.indexOf("RadXSD.jsp") != -1 || scrpg.indexOf("RadXSDBulkGen.jsp") != -1 || scrpg.indexOf("RadTCDBLKDT.jsp") != -1 ) {
            parent.document.getElementById(containerDIV).style.left = 253 + "px";
            parent.document.getElementById(containerDIV).style.top = 62 + "px";
        }
        else {
            if (parent.document.getElementById('dhtmlgoodies_a1') 
            		&& parent.document.getElementById('dhtmlgoodies_a1').style.display == "block") {
                parent.hideMenus();
            }

            parent.document.getElementById(containerDIV).style.left = 0 + 'px';

        }

    }

}

function startDrag(target, e) {
    var evt = window.event || e;
    var divObj = parent.document.getElementById(target);
    if (parent.document.getElementById("ChildWin")) {
    }
    else {
        mainWin.setActiveWindow(divObj, window);
    }

    divObj.style.cursor = "default";
    var x = evt.clientX;
    var y = evt.clientY;
    var initx = divObj.offsetLeft;
    var inity = divObj.offsetTop;
    document.onmousemove = function (e) {
        var evt = window.event || e;
        var ex = evt.clientX;
        var ey = evt.clientY;
        var dx = ex - x;
        var dy = ey - y;
        var ypos = inity + dy;
        var tBarHgt = 0;
        if (parent.document.getElementById("WNDtitlebar") != null) {
            tBarHgt = parent.document.getElementById("WNDtitlebar").offsetHeight *  - 1;
        }
        else if (typeof (mainWin) != "undefined") {
            tBarHgt = mainWin.document.getElementById("masthead").offsetHeight;
        }
        if (ypos > (tBarHgt + 4)) {
            divObj.style.left = initx + dx + "px";
            divObj.style.top = inity + dy + "px";
            initx = initx + dx;
            inity = ypos;
        }
        else {
            divObj.style.top = (tBarHgt + 4) + "px";
            inity = tBarHgt + 4;
        }
    };
    document.onmouseup = function (event) {
        divObj.style.cusor = "default";
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

function fnRADExitAll(target, e) {
	var e = window.event || e;
	var srcElement = e.srcElement || e.target;
	if (srcElement.disabled || (e.shiftKey == true && e.keyCode == 9) || e.keyCode == 9)
		return;

	if (mainWin) {
		var winObj = mainWin.document.getElementById(target);
		mainWin.fnExit(winObj);
		//after fnExit mainWin becomes undefined sometimes
		if (mainWin)
			mainWin.document.getElementById("LAND_BROWSER").focus();
	}
}

function showDbt_dbc(currobject, title) {
    if (typeof (currobject) != "undefined") {
        var name = currobject;
        if (name != "") {
            name = name.toLowerCase();
            //mask();
            loadHelpFileDIV("ChildWin", "Help/" + name + ".htm", title);
        }
        else {
            //alert(mainWin.getItemDesc("LBL_HELP_AVAILABLE"));
null;
        }
    }
}

function loadHelpFileDIV(divId, src, title) {
    var srcFile = 'RadHelp.jsp?title=' + title;
    srcFile = encodeURI(srcFile);
    var customWin = document.createElement("div");
    customWin.id = divId;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    screenArgs = new Array();
    screenArgs["HELPFILE"] = src;
    var customWinData = '<iframe class="frames" id="IFCHILD"  title="iFrame" src="' + srcFile + '" allowtransparency="true" frameborder="0" scrolling="no"></iframe>';
    customWin.innerHTML = customWinData;
    document.getElementById("Div_ChildWin").appendChild(customWin);
    document.getElementById("Div_ChildWin").style.display = "block";
    var winObj = document.getElementById(divId);
    winObj.style.visibility = "visible";
    winObj.style.display = "block";
}

function disableDefault() {
    event.returnValue = false;
    return false;
}
document.onclick = parent.mclose;