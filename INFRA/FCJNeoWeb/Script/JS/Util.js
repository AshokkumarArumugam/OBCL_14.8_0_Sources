/*----------------------------------------------------------------------------------------------------
**
** File Name    : Util.js
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

Copyright © 2004-2015   by Oracle Financial Services Software Limited..

**  Modified By          : Neethu Sreedharan
**  Modified On          : 27-Sep-2016
**  Modified Reason      : Code changes done to restrict the browser behavior of IE11 when F1 key is 
                           pressed 
**  Retro Source         : 9NT1606_12_0_1_WELLS_FARGO_BANK_NATIONAL_ASSOCIATION
**  Search String        : 9NT1606_12_2_RETRO_12_0_1_23653303

**  Modified By          : Neethu Sreedharan
**  Modified On          : 07-Oct-2016
**  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                           to user as alert and on click of Ok button on alert window, screen will be 
                           unmasked and user can try the action again.
**  Retro Source         : 9NT1606_12_0_3_INTERNAL
**  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929

**  Modified By          : Divyansh Sharma
**  Modified On          : 10-Apr-2017
**  Modified Reason      : Code changes done to enable enter key to select values in select box for IE
**  Search String        : Fix for Bug 25727823
**
**  Modified By          : Saurav
**  Modified On          : 26-Sep-2017
**  Modified Reason      : RETRO_Added UI_TXN_ACC field for Signature Verification.
**  Search String        : 9NT1606_12_4_INTERNAL_26820002
**
**   Modified By         : Ambika Selvaraj
**   Modified On         : 24-Oct-2017
**   Modified Reason   	 : Changes done to return proper date in case of different time zones. 
**   Retro Source        : 9NT1606_12_1_AFIANZADORA ASERTA
**   Search String       : 9NT1606_12_4_RETRO_12_1_26939865	
**
**	Modified By          : Ambika S
** 	Modified on          : 31-Jan-2018
** 	Modified Reason      : Changes done to auto fill Date Separator on inputting value on Date fields.
                           The Date separator should be based on Date format configured in User Settings.
** 	Search String        : 9NT1606_14_0_RETRO_12_0_3_27393036

**	Modified By          : Yathish D C
** 	Modified on          : 17-Jun-2021
** 	Modified Reason      : Issue  : Access key/Short key feature is not working in non-extensible screens.
                           Reason : As the evnt variable is not set, script errors are encountered.
						   Fix 	  : Fix provided to correct the event code from  evnt to e which is the event 
						   parameter passed to the function fnHandleButtons(e).
** 	Search String        : FCUBS_14.0_CNSL_HDFC_BANK_LIMITED_SFR#33013016
**
**	Modified By          : Bhawana Mishra
** 	Modified on          : 05-Dec-2022
** 	Modified Reason      : Code changes done to return proper date.
** 	Search String        : bug#34786584
**
**	Modified By          : Girish M
** 	Modified on          : 05-May-2023
** 	Modified Reason      : F4 was not working for LOV field.
** 	Search String        : REDWOOD_35349255
**
**
**  Modified By          : Chidambaram P
**  Modified On          : 30-Jan-2024
**  Modified Reason      : Fix provided to enable hotkeys functionality when pressed from 
						   non-extensible callforms.
**  Search String        : FCUBS_CNSL_OTPBANK_36244455

**  Modified By          : Chaitanya Pundlik
**  Modified On          : 17-Dec-2024
**  Change Description   : Enable Hotkeys for pps (non-codeployed setups) 
**  Search String        : Bug_36924146
********************************************************************************************
*/

/* FOR DATE AND AMOUT FORMATTING */
var gDecimalSymbol = mainWin.gDecimalSymbol;
var gNegativeSymbol = mainWin.gNegativeSymbol;
var gDigitGroupingSymbol = mainWin.gDigitGroupingSymbol;
var gNegativeFormat = mainWin.gNegativeFormat;
var hotkeySrcElem;
var hotKeyBrn = ""; //Fix for 15928835

function VirtualPath(fullurl)
{
    re = /http:\/\/[^\/]*/;
    virtual = fullurl.replace(re, "");

    if (virtual.substring(virtual.length - 1) == "/") virtual += "default.xml";
    return virtual;
}

//JS Segregation changes starts.
function doAction(type , e){

var evnt = window.event || e;
if (type == "EnterQuery") { 
        mainWin.fnUpdateScreenSaverInterval();
        gAction= 'ENTERQUERY';
        fnEnterQuery();
		return;
    }else if (type == 'Exit') {
        exitAll();
        
    } else if (type == 'ExitCurrWin') {
        exitCurrentWindow();
    }else if (type == 'procTerminate')
    {
        alert(type);
    } else if (type == 'procAccept')
    {
        alert(type);

    } else if (type == 'procReject')
    {
        alert(type);

    }else
    {

        if ((gAction == "MODIFY") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) //Ashok Ext Changes
        {
            gAction = 'MODIFY';

        } else if((gAction == "DELETE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) 
        {
             gAction = 'DELETE';
        
        } else if((gAction == "CLOSE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL")))  
        {
             gAction = 'CLOSE';
        
        } else if((gAction == "REOPEN") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) 
        {
             gAction = 'REOPEN';
        
        } else if((gAction == "REVERSE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) 
        {
             gAction = 'REVRESE';
        
        } else if((gAction == "ROLLOVER") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) 
        {
             gAction = 'ROLLOVER';
        
        } else if((gAction == "CONFIRM") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) 
        {
             gAction = 'CONFIRM';
             
        } else if((gAction == "LIQUIDATE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) 
        {
             gAction = 'LIQUIDATE';
             
        } else if((gAction == "CRYSTALLIZE") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL")))  
        {
             gAction = 'CRYSTALLIZE';
        
        } else if((gAction == "ROLLOVER") && ((type.toUpperCase() == "SAVE") || (type.toUpperCase() == "SAVEALL"))) 
        {
             gAction = 'ROLLOVER';
        } else
        {
            if (type.toUpperCase() == "HOLD") {
            } else {
                gAction = type.toUpperCase();
            }
            if ('PROCNEW' == gAction)
            {
                gAction = 'NEW';
                type = 'New';
            }
            if ('PROCSAVE' == gAction)
            {
                gAction = 'NEW';
                type = 'BPELOk'; //Added By Fahad
            }
            if ('PROCHOLD' == gAction)
            { //Added By Fahad
                gAction = 'HOLD'; //Added By Fahad
                type = 'BPELHold'; //Added By Fahad
            }
            if ('AUTHORIZE' == gAction)
            {
               gAction = 'AUTH';
            }
            if ('COPY' == gAction)
            {
                gAction = 'COPY';
            }
            if ('UNLOCK' == gAction)
            {
                gAction = 'MODIFY';
            }
            if ('SAVE' == gAction || 'SAVEALL' == gAction) //ashok Ext changes
            {
                gAction = 'NEW';
            }

            if (screenType == 'T')
            {
                if ('ROLLOVER' == gAction)
                {
                    gAction = 'ROLLOVER';
                }
                if ('REVERSE' == gAction)
                {
                   gAction = 'REVERSE';
                }
                if ('CONFIRM' == gAction)
                {
                   gAction = 'CONFIRM';
                }
                if ('LIQUIDATE' == gAction)
                {
                    gAction = 'LIQUIDATE';
                }
				if ('CRYSTALLIZE' == gAction)
                {
                    gAction = 'CRYSTALLIZE';
                }
              
            }
        }   
        if(type.toUpperCase() == "EXECUTEQUERY") {
			if (typeof(gSummaryOpened) != 'undefined' && gSummaryOpened) {
				//eval('parent.gActiveWindow.fn' + type + '(evnt)');
                                var fnEval = new Function('evnt','fn' + type + '(evnt)');  
                                fnEval(evnt);
			} else { 
				//eval('parent.gActiveWindow.fn' + type + '()');
                                var fnEval = new Function('fn' + type + '()');  
                                fnEval();
                        }
        }  else {
            mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
            //eval('parent.gActiveWindow.fn' + type + '(evnt)');
            var fnEval = new Function('evnt','fn' + type + '(evnt)');  
            fnEval(evnt);
        }
        if ('Print' == type) type = 'EXECUTEQUERY';
    }    


}
//JS Segregation changes ends.

//Bug_36924146 Starts
function isRofcFunctionId() {
	/*Code to get the function id on which Hotkey is pressed.
	  If its a callform then parent function is taken */
	
	var funId = functionId;
	if(!!funId && funId.substr(2,1) == "C") {
        funId = parent.functionId;
    }
	
	if(!!funId && mainWin.rofcInstalled == "Y"){
		if(!!(mainWin.g_functionModuleMap[funId]) && 
			 mainWin.g_functionModuleMap[funId].moduleGroupId == "FCROFC" 
		){
			return true;
		}else {
			return false;
		}	
	}else {
	    return false;	
	}	
}	
//Bug_36924146 Ends


function start()
{
    var dom = null;
    /*try
    {
        dom = new ActiveXObject("Msxml2.DOMDocument.6.0");
    } catch(e)
    {
        dom = new ActiveXObject("Msxml2.DOMDocument.4.0");
    }
    dom.async = false;
    dom.validateOnParse = false;
    dom.resolveExternals = true;*/
    return (dom);
}

function f1Help(e)
{
    var event = window.event || e;
    var sourceElem = getEventSourceElement(event);
    if (event.keyCode == 112)
    {
        
        if (mainWin.applicationName == "FCIS")
        {
            var filetoOpen = functionId;
            showDbt_dbc(filetoOpen);
            fnDisableBrowserKey(event);
            return;
        }
        if (mainWin.gActiveWindow)
        {
            if (mainWin.gActiveWindow.screenType)
            {
                if (mainWin.gActiveWindow.screenType == "WB")
                {
                    var xmlFile = mainWin.gActiveWindow.xmlFileName;
                    if (xmlFile.lastIndexOf(".xml") == -1) var funcId = xmlFile.substring(xmlFile.lastIndexOf("/") + 1, xmlFile.lastIndexOf(".XML"));
                    else var funcId = xmlFile.substring(xmlFile.lastIndexOf("/") + 1, xmlFile.lastIndexOf(".xml"));
                    var filetoOpen = funcId;
                    showDbt_dbc(filetoOpen);
                    fnDisableBrowserKey(event);
                    return;
                }
            }
        }
        var elem = getEventSourceElement(event);
        var docelem = document.activeElement;
        var blkname;
        var tblname;
        var colname;
        var id;

        if (elem.className == "TEXTAudit")
        {
            fnDisableBrowserKey(event);
            return;
        }
        if ((elem.tagName == "DIV") && (gAction == ""))
        {

            if (elem.className == "DIVMultiple")
            {
                fnDisableBrowserKey(event);
                return;
            }
            if (elem.className == "absDIVButton")
            {
                fnDisableBrowserKey(event);
                return;
            }
            var len = elem.childNodes.length;
            for (var i = 0; i < len; i++)
            {
                if (elem.childNodes[i].tagName == 'LABEL')
                {
                    if (elem.childNodes[i].childNodes.length != 0 && elem.childNodes[i].childNodes.length != 1)
                    {
                        elem = elem.childNodes[i];
                    }
                }
                if ((elem.childNodes[i].tagName == "INPUT") || (elem.childNodes[i].tagName == "SELECT") || (elem.childNodes[i].tagName == "TEXTAREA"))
                {
                    elem = elem.childNodes[i];
                    id = elem.id;
                    break;
                }
            }
            tblname = elem.getAttribute("DBT");
            blkname = "BLK_" + tblname;
            colname = elem.getAttribute("DBC");
            if (colname != "") {
                //11.1 Changes
                var l_srcElem = getEventSourceElement(event);
                var blockname;
                try{
                    blockname = l_srcElem.children[0].children[0].getAttribute("HELPBID");
                }catch(e){
                    blockname = l_srcElem.children[0].getAttribute("HELPBID");
                }
                var filetoOpen = functionId + "." + blockname + "." + colname;        
                if(isHelpFileExists(filetoOpen)){
                    showDbt_dbc(filetoOpen);  
                    fnDisableBrowserKey(event);
                    return;
                }else{
                    filetoOpen = functionId + "." + blkname + "." + colname;
                    showDbt_dbc(filetoOpen);  
                    fnDisableBrowserKey(event);
                    return;
                }
                /*var filetoOpen = functionId + "." + blkname + "." + colname;
                showDbt_dbc(filetoOpen);
                return;*/
            } else {
                fnDisableBrowserKey(event);
                return;
            }
        }

        if ((elem.tagName != "INPUT") && (elem.tagName != "SELECT") && (elem.tagName != "CHECKBOX") && (elem.tagName != "RADIO") && (elem.tagName != "TEXTAREA"))
        {
            fnDisableBrowserKey(event);
            return;
        }
        var elem = elem.id;
        if (elem.indexOf("cmd") != "-1")
        {
            fnDisableBrowserKey(event);
            return;
        }
        if (elem == "TBLPageAll")
        {
            fnDisableBrowserKey(event);
            return;
        }
        var objtbl;

        if (elem == "")

        {
            objtbl = document.activeElement;
            var count = 0;
            if ((objtbl.tagName != "INPUT") && (objtbl.tagName != "SELECT") && (objtbl.tagName != "CHECKBOX") && (objtbl.tagName != "RADIO") && (objtbl.tagName != "TEXTAREA"))
            {
                fnDisableBrowserKey(event);
                return;
            }
            while (objtbl.tagName != "TABLE")
            {
                objtbl = objtbl.parentNode;
                if (objtbl.tagName == "DIV")
                {
                    count = count + 1;
                }
                if (count > 2)
                {

                    blkname = document.activeElement.parentNode.parentNode.id;
                    if (functionId == "ICDRLMNT")
                    {
                        blkname = "BLK_ICTM_RULE";
                    }
                    colname = document.activeElement.name;
                    //11.1 Changes
                    var l_srcElem = getEventSourceElement(event);
                    var blockname;
                    try{
                        blockname = l_srcElem.children[0].children[0].getAttribute("HELPBID");
                    }catch(e){
                        blockname = l_srcElem.children[0].getAttribute("HELPBID");
                    }
                    var filetoOpen = functionId + "." + blockname + "." + colname;        
                    if(isHelpFileExists(filetoOpen)){
                        showDbt_dbc(filetoOpen);  
                        fnDisableBrowserKey(event);
                        return;
                    }else{
                        filetoOpen = functionId + "." + blkname + "." + colname;
                        showDbt_dbc(filetoOpen);  
                        fnDisableBrowserKey(event);
                        return;
                    }
                    /*var filetoOpen = functionId + "." + blkname + "." + colname;
                    showDbt_dbc(filetoOpen);
                    fnDisableBrowserKey(event);
                    return;*/
                }
                if (objtbl.tagName == "HTML")
                {
                    fnDisableBrowserKey(event);
                    return;
                }
            }
            blkname = objtbl.id;
            tblname = blkname.replace("BLK_", "");
            colname = document.activeElement.name;
        } else
        {
            tblname = document.activeElement.getAttribute("DBT");
            blkname = "BLK_" + tblname;
            colname = document.activeElement.name;
        }

        if (sourceElem.id.substring(0, 2) == "__")
        {
            if ((document.activeElement.parentNode.parentNode.tagName == "TD") || (document.activeElement.parentNode.parentNode.tagName == "TR"))
            {

                objtbl = document.activeElement;
                if ((objtbl.tagName != "INPUT") && (objtbl.tagName != "SELECT") && (objtbl.tagName != "CHECKBOX") && (objtbl.tagName != "RADIO") && (objtbl.tagName != "TEXTAREA"))
                {
                    fnDisableBrowserKey(event);
                    return;
                }
                while (objtbl.tagName != "TABLE")
                {
                    objtbl = objtbl.parentNode;
                    if (objtbl.tagName == "HTML")
                    {
                        fnDisableBrowserKey(event);
                        return;
                    }
                }
                blkname = objtbl.id;
                tblname = blkname.replace("BLK_", "");
                if (getPreviousSibling(document.activeElement) && getPreviousSibling(getPreviousSibling(document.activeElement))) {
                    if (blkname == "") 
                        blkname = getPreviousSibling(getPreviousSibling(document.activeElement)).id.substring(0, getPreviousSibling(getPreviousSibling(document.activeElement)).id.lastIndexOf("__"));
                    colname = getPreviousSibling(getPreviousSibling(document.activeElement)).name;
                } else { 
                    if (blkname == "") 
                        blkname = document.activeElement.id.substring(0, document.activeElement.id.lastIndexOf("__"));
                    colname = document.activeElement.name;
                }
            }
        }

        if ((document.activeElement.parentNode.parentNode.tagName != "TD") && (document.activeElement.parentNode.parentNode.tagName != "TR")) {
            var srcElem = getEventSourceElement(event);
            if (getPreviousSibling(document.activeElement)) {
                if (getPreviousSibling(getPreviousSibling(document.activeElement))) {
                    if (getPreviousSibling(getPreviousSibling(getPreviousSibling(document.activeElement)))) {
                        if (getPreviousSibling(getPreviousSibling(getPreviousSibling(document.activeElement))).id + "I" == document.activeElement.id) {
                            var elemD = getPreviousSibling(getPreviousSibling(getPreviousSibling(srcElem)));
                            tblname = elemD.getAttribute("DBT");
                            blkname = "BLK_" + tblname;
                            colname = elemD.getAttribute("DBC");
                        }
                    }
                }
            }
        }
        if (colname == "")
        {
            fnDisableBrowserKey(event);
            return;
        }
        // 11.0 Help File Fix Starts
        var l_srcElem = getEventSourceElement(event);
        var blockname = l_srcElem.getAttribute("HELPBID");
        var filetoOpen = functionId + "." + blockname + "." + colname;        
        if(isHelpFileExists(filetoOpen)){
            showDbt_dbc(filetoOpen);            
        }else{
            filetoOpen = functionId + "." + blkname + "." + colname;
            showDbt_dbc(filetoOpen);  
        }
        // 11.0 Help File Fix Ends
        fnDisableBrowserKey(event);
    } 

}

function showDbt_dbc(currobject)
{
    if (typeof(currobject) != "undefined")
    {
        var name = currobject;
		debugs("HelpFileName", name);
       /* var winParams = new Object();
        winParams.mainWin = top.window;*/
        if (name != "")
        {
            name = name.toLowerCase();
            mask();
            //var newWin = parent.showModelessDialog("HELP/" + name + ".htm", winParams, "center:yes; dialogHeight:350px; dialogWidth:500px; help:yes; resizable:yes; scroll:yes; status:no");
            loadHelpFileDIV("ChildWin","Help/" + mainWin.LangCode + "/" + name + ".htm");
            //window.focus();
        } else
        {
            alert(mainWin.getItemDesc("LBL_HELP_AVAILABLE"));
        }
        }
    } 
    
function fnExitHelpWindow() {
    /*Fix for 16714912 and 16785218 */
    var childDivObj = "";
    if(mainWin.applicationName == "FCIS"){
    unmask();
    childDivObj = document.getElementById("ChildWin");
    childDivObj.getElementsByTagName("IFRAME")[0].src = "";
    document.getElementById("Div_ChildWin").removeChild(childDivObj);
 }else{
    parent.unmask();
    childDivObj = parent.document.getElementById("ChildWin");
    childDivObj.getElementsByTagName("IFRAME")[0].src = "";
    parent.document.getElementById("Div_ChildWin").removeChild(childDivObj);
 }
}


function loadHelpFileDIV(divId, src) {
     /*Fix for 16714912 and 16785218 */
    src = mainWin.addIframeReqParam(src); //session expiry change  
    var customWin= "";
    var customWinData ="";
    var winObj = "";
    if(mainWin.applicationName == "FCIS"){
    customWin = document.createElement("div");
    customWin.id = divId;;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    customWinData = '<DIV id=DIVWNDContainer class=WNDcontainer>';
    customWinData += '<DIV class="WNDtitlebar" id="WNDtitlebar" style="Width:503px;" onmousedown="startDragHelp(\'ChildWin\', event)">';
    customWinData += '<div class="WNDtitle" id="wndtitle">';
    customWinData += '<B class="BTNicon"><span class="ICOflexcube"></span></B>';
    customWinData += '<h1 class="WNDtitletxt">' + mainWin.getItemDesc("LBL_HELP1") + '&nbsp;</h1>';
    customWinData += '<div class="WNDbuttons">';
    customWinData += '<a class="WNDcls" id ="WNDbuttons" href="#" onblur=\"this.className=\'WNDcls\'\" onmouseover=\"this.className=\'WNDclsH\'\" onfocus=\"this.className=\'WNDclsH\'\" onmouseout=\"this.className=\'WNDcls\'\" title="' + mainWin.getItemDesc("LBL_CLOSE") + '" onclick=\"fnExitHelpWindow()\"></a>';
    customWinData += '</div>';
    customWinData += '</div>';
    customWinData += '</div>';
    customWinData += '</div>';
    customWinData += '<DIV id=DIVHelpFileContainer>';
    customWinData += '<iframe class="frames" src="' + src + '" allowtransparency="true" frameborder="0" scrolling="auto" style="Height:400px; Width:500px"></iframe>';
    customWinData += '</DIV>';
    customWinData += '</DIV>';
    customWin.innerHTML = customWinData;
    document.getElementById("Div_ChildWin").appendChild(customWin);
    document.getElementById("Div_ChildWin").style.display = "block";
    winObj = document.getElementById(divId);
    winObj.style.visibility = "visible";
    winObj.style.display = "block";
    }
    else{
    customWin       = document.createElement("div");
    customWin.id        = divId;
    customWin.className = "dhtmlwindow";
    customWin.style.position = "absolute";
    screenArgs = new Array();
    screenArgs["HELPFILE"] = src;
    var customWinData = '<iframe class="frames" id="ifrSubScreen" title="" src="Help.jsp" allowtransparency="true" frameborder="0" scrolling="no"></iframe>';
    customWin.innerHTML = customWinData;
    document.getElementById("Div_ChildWin").appendChild(customWin);
    document.getElementById("Div_ChildWin").style.display="block";
    var winObj = document.getElementById(divId);
    winObj.style.visibility="visible";
    winObj.style.display="block";
    }
}

function startDragHelp(target, e) {
    var evt = window.event || e;
    /*Fix for 16714912 and 16785218*/
    var divObj = "";
    if(mainWin.applicationName == "FCIS"){
      divObj = document.getElementById(target);
      if (document.getElementById("ChildWin")) {} else {
        mainWin.setActiveWindow(divObj, window);
      }
    }
    else{
    divObj = parent.document.getElementById(target);
    if (parent.document.getElementById("ChildWin")) {} else {
        mainWin.setActiveWindow(divObj, window);
    }}
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
        if (document.getElementById("WNDtitlebar") != null) {
            tBarHgt = document.getElementById("WNDtitlebar").offsetHeight * -1;
        } else if (typeof(mainWin) != "undefined") {
            tBarHgt = mainWin.document.getElementById("masthead").offsetHeight;
        }
        if (ypos > (tBarHgt + 4)) {
            divObj.style.left = initx + dx + "px";
            divObj.style.top = inity + dy + "px";
            initx = initx + dx;
            inity = ypos;
        } else {
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

/**
 *	Specifies Shortcut keys: 
 *	F7:EnterQuery  F8:ExecuteQuery
 **/
function shortcut(e) {
    var event = window.event || e;
    var srcElem = getEventSourceElement(event);
    var type = srcElem.type;
    /*Fix for 18180616 Starts*/
    if(document.getElementById("masker")!= null && document.getElementById("masker").offsetHeight != 0){  
        /*Fix for 18380388 Start*/
         if(thirdChar !="S" ||(srcElem.tagName !='INPUT' && srcElem.tagName != 'TEXTAREA')){
            fnDisableBrowserKey(event);
            event.returnValue = false;
            return false;
        }
         /*Fix for 18380388 End*/
    }
    /*Fix for 18180616 Ends*/
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    /*if(event.shiftKey && event.keyCode == 9){
        if(document.getElementById("tablist")){
            var elemA = document.getElementById("tablist").getElementsByTagName("A");
            for(var i=0; i<elemA.length; i++){
                if(elemA[i].id == strCurrentTabID){
                    elemA[i].focus();
                    preventpropagate(event);
                    return false;
                }
            }
        }
    }*/
	/*Fix for 16799210*/
     if (e.keyCode == 116) {
      fnDisableBrowserKey(event);
      preventpropagate(event);
      try {
          event.keyCode = 0;
      } catch (e) {}
      return false;
    }
    /*Fix for 16799210*/
    if (event.keyCode == 8) {
        if(typeof(type) == "undefined") {
            return false;
        } else if((type.toUpperCase() != "TEXT" && type.toUpperCase() != "TEXTAREA" && type.toUpperCase() != "PASSWORD") || srcElem.readOnly) {
            return false;
        }
    }
    if (event.keyCode == 13) {
        if(typeof(type) == "undefined") {
            return false;
       /*Fix for Bug 25727823 */
        }else if ((type.toUpperCase() != "TEXTAREA" && type.toUpperCase() != "BUTTON"  && typeof(srcElem.tagName)!="undefined" && srcElem.tagName.toUpperCase()!="SELECT") || srcElem.readOnly )  {
            return false;
        }
    }
    if (event.ctrlKey == true && event.altKey == false && ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 106))) { //Fix for 22653877
        mainWin.fnHandleHotKeys(event.keyCode,event);
    }
    fnHandleButtons(event);
    //showMenuUsingKey(true); TODO
    
    if (event.ctrlKey == true && event.altKey == false && event.keyCode == 78) { // If 'N' is pressed with Ctrl Key...for NEW //Fix for 22653877
        if (! (document.getElementById("New").disabled)) 
            setTimeout("doAction(mainWin.ACTIONNEW)", 0); //JS Segregation changes   
        fnDisableBrowserKey(event);
        return false;
    } else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 83) { // If 'S' is pressed with Ctrl Key...for SAVE //Fix for 22653877
        fnDisableBrowserKey(event);
        if (document.getElementById("SaveCriteria")) {
            if (document.getElementById("SaveCriteria").style.display == "block") {
                fnOpenCriteriaScr(event);
                return false;
           }
        } else if (!(document.getElementById("Save").disabled)) {
            if (!fnValidateOnF8(event)) {
                return false;
            }
            Obj = new Object();
            Obj.event=event;
            setTimeout("doAction(mainWin.ACTIONSAVE,'Obj.event')", 0);//JS Segregation changes
        }
        return false;
    }else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 70) {//Ctrl + F  // 21594948 //Fix for 22653877
        fnDisableBrowserKey(event);
        mainWin.document.getElementById("fastpath").focus();
        return false;
    }else if (event.ctrlKey == true && event.altKey == false && event.shiftKey == true && event.keyCode == 67) { // If 'C' is pressed with Ctrl Key and Shift Kry...for Copy //Fix for 22653877
        fnDisableBrowserKey(event);
        if (! (document.getElementById("Copy").disabled)) 
            setTimeout("doAction(mainWin.ACTIONCOPY)", 0);//JS Segregation changes
        return false;
    } else if (event.ctrlKey == true && event.altKey == false && event.shiftKey == true && event.keyCode == 89) { // If 'Y' is pressed with Ctrl Key...for Close //Fix for 22653877
        fnDisableBrowserKey(event);
        if (! (document.getElementById("Close").disabled)) 
            setTimeout("doAction(mainWin.ACTIONCLOSE)", 0);//JS Segregation changes
        return false;
    } else if (event.ctrlKey == true && event.altKey == false && event.shiftKey == true && event.keyCode == 90) { // If 'Z' is pressed with Ctrl Key...for Authorize //Fix for 22653877
        fnDisableBrowserKey(event);
        if (! (document.getElementById("Authorize").disabled)) 
            setTimeout("doAction(mainWin.ACTIONAUTHORIZE)", 0);//JS Segregation changes
        return false;
    } else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 68) { // If 'D' is pressed with Ctrl Key...for Delete //Fix for 22653877
        fnDisableBrowserKey(event);
        if (! (document.getElementById("Delete").disabled)) 
            setTimeout("doAction(mainWin.ACTIONDELETE)", 0);//JS Segregation changes
        return false;
    } else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 85) { // If 'U' is pressed with Ctrl Key...for Unlock //Fix for 22653877
        fnDisableBrowserKey(event);
        if (! (document.getElementById("Unlock").disabled)) 
            setTimeout("doAction(mainWin.ACTIONUNLOCK)", 0);//JS Segregation changes
        return false;
    } else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 82) { // If 'R' is pressed with Ctrl Key...for Reopen //Fix for 22653877
        fnDisableBrowserKey(event);
        if (thirdChar == 'S') {
            fnResetQry(event);
            document.getElementById("BTN_EXIT").focus();
            return false;
        } else if (! (document.getElementById("Reopen").disabled)) 
            setTimeout("doAction(mainWin.ACTIONREOPEN)", 0);//JS Segregation changes
        event.returnValue = false;
    } else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 80) { // If 'P' is pressed with Ctrl Key...for Print //Fix for 22653877
        fnDisableBrowserKey(event);
        if (! (document.getElementById("Print").disabled)) 
            setTimeout("doAction(mainWin.ACTIONPRINT)", 0);//JS Segregation changes
        return false;
    } else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 69) { // If 'E' is pressed with Ctrl Key...for Reverse //Fix for 22653877
        fnDisableBrowserKey(event);
         if (document.getElementById("Export")) {
           if (document.getElementById("Export").style.display == "block") {
                fnExportToExcel(event);
           }
        } else if (! (document.getElementById("Reverse").disabled)) 
            setTimeout("doAction(mainWin.ACTIONREVERSE)", 0);//JS Segregation changes
        return false;
    } else if (event.ctrlKey == true && event.altKey == false && event.shiftKey == true && event.keyCode == 86) { // If 'V' is pressed with Ctrl Key...for Rollover //Fix for 22653877
        fnDisableBrowserKey(event);
        if (! (document.getElementById("Rollover").disabled)) 
            setTimeout("doAction(mainWin.ACTIONROLLOVER)", 0);//JS Segregation changes
        return false;
    } else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 77) { // If 'M' is pressed with Ctrl Key...for Confirm //Fix for 22653877
        fnDisableBrowserKey(event);
        if (! (document.getElementById("Confirm").disabled)) 
            setTimeout("doAction(mainWin.ACTIONCONFIRM)", 0);//JS Segregation changes
        return false;
    } else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 81) { // If 'Q' is pressed with Ctrl Key...for Liquidate // Fix for 17448572
        fnDisableBrowserKey(event);
         if (document.getElementById("advSearch")) {
          if (getIEVersionNumber() > 0) {
                fireHTMLEvent(document.getElementById("advSearch"), "onclick");
            } else {
                var fnEval = new Function("event",document.getElementById("advSearch").getAttribute("onclick"));  
                fnEval(event);
            }
            document.getElementById("BTN_EXIT").focus();
        }
        else if (! (document.getElementById("Liquidate").disabled)) 
            setTimeout("doAction(mainWin.ACTIONLIQUIDATE)", 0);//JS Segregation changes
        return false;
    } else if (event.ctrlKey == true && event.altKey == false && event.keyCode == 72) { // If 'H' is pressed with Ctrl Key...for Hold //Fix for 22653877
        fnDisableBrowserKey(event);
        if (! (document.getElementById("Hold").disabled)) 
            setTimeout("doAction(mainWin.ACTIONHOLD)", 0);//JS Segregation changes
        return false;
    } else if (event.altKey == true && event.keyCode == 49) { // If '1' is pressed with Alt key for focussing on toolbar first item
        var toolBarBtns = mainWin.document.getElementById("tbactions").getElementsByTagName("BUTTON");
        for (var l_Itr = 0; l_Itr < toolBarBtns.length; l_Itr++)
        {
            if (toolBarBtns[l_Itr].disabled == false && toolBarBtns[l_Itr].id != "btnHomeBranch" && toolBarBtns[l_Itr].id != "btnChangeBranch")
            {
                toolBarBtns[l_Itr].focus();
                break;
            }
        }
    } else if (event.altKey == true && event.keyCode == 70) { // If 'F' is pressed with Alt key for fastpath      
        mainWin.document.getElementById("fastpath").value = "";
        mainWin.document.getElementById("fastpath").focus();
    }

    if (event.ctrlKey == true && event.altKey == false && event.keyCode == 80) { // If 'P' is pressed with Ctrl Key...for PRINT //Fix for 22653877
        if (! (document.getElementById("Print").disabled)) mainWin.doAction(mainWin.ACTIONPRINT);
    }
    if (event.keyCode == 113) {
        switchWindows();
    }
    if (gAction != null && gAction != '' && gAction != "ENTERQUERY") {
        return;
    }

    if (event.keyCode == 118) {
            // F7 Function key
        if (thirdChar == 'S'){
            //event.returnValue = false;
            if (document.getElementById("SavedQry").style.display == 'block') {
                fnQueryCriteria('QUERYCRITERIA',event);
            }
                fnDisableBrowserKey(event);
                return;
        } else {
            if (gAction != "") {
                fnDisableBrowserKey(event);
                //event.returnValue = false;
                return;
            }
            gAction = 'ENTERQUERY';
            fnEnterQuery();
            fnDisableBrowserKey(event);
        }
    } else if (event.keyCode == 119) {
            // F8 Function key
             if(gAction != 'ENTERQUERY' && thirdChar != 'S'){
               return false;
        }
         if (thirdChar == 'S') {
            fnExecuteQuery('',event);
            document.getElementById("BTN_EXIT").focus();
            return false;
        } else {
        gAction = 'EXECUTEQUERY';
        if (!fnValidateOnF8(event)) {
            gAction = "ENTERQUERY";
            return;
        }
        if (!isAutoLOVOpened) {
            if (typeof(gSummaryOpened) != 'undefined' && gSummaryOpened)
                fnExecuteQuery(event);
            else
                fnExecuteQuery();
        } else {
            gAction = "ENTERQUERY";
            return;
        }
    } 
    }
}

function switchWindows() {
    var cnt = 0;
    var windowsCnt = mainWin.arrChildWindows.length;
    if (windowsCnt > 0) {
        for (var currWin = 0; currWin < windowsCnt; currWin++) {
            if (currWin == windowsCnt - 1) {
                cnt = 0;
            } else {
                cnt = currWin + 1;
            }
            if (mainWin.arrChildWindows[currWin].children[0].contentWindow == mainWin.gActiveWindow) {
                mainWin.setActiveWindow(mainWin.arrChildWindows[cnt], mainWin.arrChildWindows[cnt].children[0].contentWindow, true);
                break;
            }
        }
        }
    }

function fnNavigateTabs(l_event, tab_arr, tab_ids) {
    var tab_obj = document.getElementById("tablist");
    if (document.getElementById("tablist")) {
        if (l_event == 'backward') {
            tablist_curr_id--;
            if (tablist_curr_id < 0) {
                tablist_curr_id = tab_arr.length - 1;
            }
            /*Tab disabled Changes */
            if(!document.getElementById(tab_ids[tablist_curr_id]).disabled)
            {
              expandcontent(tab_ids[tablist_curr_id], tab_arr[tablist_curr_id]);
              document.getElementById(tab_ids[tablist_curr_id].substring(7)).focus();
            }  
        }
        if (l_event == 'forward') {
            tablist_curr_id++;
            if (tablist_curr_id > tab_arr.length - 1) {
                tablist_curr_id = 0;
            }
            /*Tab disabled Changes */
            if(!document.getElementById(tab_ids[tablist_curr_id]).disabled)
            {
              expandcontent(tab_ids[tablist_curr_id], tab_arr[tablist_curr_id]);
              document.getElementById(tab_ids[tablist_curr_id].substring(7)).focus();
            }  
        }
    }
}
function fnTabDetails()
{
    var tab_obj = document.getElementById("tablist");
    if (document.getElementById("tablist"))
    {
        //for (var i = 0; i < tab_obj.childNodes.length; i++)
        for (var i = 0; i < tab_obj.children.length; i++)
        {
            //tab_arr[i] = tab_obj.childNodes[i].childNodes[0];
            tab_arr[i] = tab_obj.children[i].children[0];
            //tab_ids[i] = 'TBLPage' + tab_obj.childNodes[i].childNodes[0].id;
            tab_ids[i] = 'TBLPage' + tab_obj.children[i].children[0].id;
        }
    }
}

// variable for F11 and F12
var hotKeyPressed = false;

function fnHandleButtons(e) {
    var e = window.event || e;
    var srcElem =getEventSourceElement(e);
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
	var type = srcElem.type; //Fix for 16754359 and 16785081 
	/*Fix for 16799210*/
     if (e.keyCode == 116) {
      fnDisableBrowserKey(e);
      preventpropagate(e);
      try {
          e.keyCode = 0;
      } catch (ex) {}
      return false;
    }
    /*Fix for 16799210*/
    if(e.ctrlKey && (e.keyCode == 67 || e.keyCode == 88) && restrictReqd == 'Y'){//jc2 changes begin //PIPA
        try {
            e.keyCode = 0;
        }
        catch (ex) {
        }
        preventpropagate(e);
        fnDisableBrowserKey(e);
        return false;
    }
	//FCUBS_14.0_CNSL_HDFC_BANK_LIMITED_SFR#33013016 changes starts
	/*if(evnt.ctrlKey && (evnt.keyCode == 80 ) && parent.restrictPrint == 'Y'){//jc2 changes begin //PIPA
        try {
            evnt.keyCode = 0;
        }
        catch (ex) {
        }
        preventpropagate(evnt);
        fnDisableBrowserKey(evnt);
        return false;
    }//jc2 changes end//PIPA
	*/
	if(e.ctrlKey && (e.keyCode == 80 ) && parent.restrictPrint == 'Y'){//jc2 changes begin //PIPA
        try {
            e.keyCode = 0;
        }
        catch (ex) {
        }
        preventpropagate(e);
        fnDisableBrowserKey(e);
        return false;
    }
	//FCUBS_14.0_CNSL_HDFC_BANK_LIMITED_SFR#33013016 changes ends
	//Fix for 16754359 and 16785081 
	if (e.keyCode == 8) {
        if (typeof (type) == "undefined") {
            return false;
        } else if ((type.toUpperCase() != "TEXT" && type.toUpperCase() != "TEXTAREA" && type.toUpperCase() != "PASSWORD") || srcElem.readOnly) {
            return false;
        }
    }
    if (!e.ctrlKey && !e.shiftKey && e.keyCode == 115){
        // F4 Function key
        var event = e;
        //REDWOOD_35349255 Starts
      /* if (getNextSibling(srcElem) && getNextSibling(srcElem).tagName == "BUTTON") {
            if (srcElem.disabled == false && !srcElem.readOnly) {
                if(getIEVersionNumber() > 0)
                    fireHTMLEvent(getNextSibling(srcElem),"onclick");
                else {
                    //eval(getNextSibling(srcElem).getAttribute("onclick"));
                    var fnEval = new Function("event",getNextSibling(srcElem).getAttribute("onclick"));  
                    fnEval();
                }
            } else if (srcElem.getAttribute("INPUT_LOV")) {
                if(getIEVersionNumber() > 0)
                    fireHTMLEvent(getNextSibling(srcElem),"onclick");
                else {
                    //eval(getNextSibling(srcElem).getAttribute("onclick"));
                    var fnEval = new Function("event",getNextSibling(srcElem).getAttribute("onclick"));  
                    fnEval();
                }
            }
        }*/
		//redwood_changes
		var ojObject = getNextSibling(srcElem.parentElement);  //REDWOOD_CHANGES
        if (ojObject && ojObject.getElementsByTagName("OJ-BUTTON").length > 0 && ojObject.getElementsByTagName("OJ-BUTTON").type!="hidden") { //REDWOOD_CHANGES
            if (srcElem.disabled == false && !srcElem.readOnly) {
                if (getIEVersionNumber() > 0)
                    fireHTMLEvent(ojObject.getElementsByTagName("OJ-BUTTON")[0], "onClick"); //REDWOOD_CHANGES
                else {
                    var fnEval = new Function("event", getClickFunction(ojObject.getElementsByTagName("OJ-BUTTON")[0])); //REDWOOD_CHANGES
                    fnEval(event);//shortcut fix
                }
            }
            else if (srcElem.getAttribute("INPUT_LOV")) {
                if (getIEVersionNumber() > 0)
                    fireHTMLEvent(getNextSibling(srcElem), "onclick");
                else {
                    var fnEval = new Function("event", getClickFunction(ojObject.getElementsByTagName("OJ-BUTTON")[0])); //REDWOOD_CHANGES
                    fnEval(event);//shortcut fix
                }
            }
        }
		//REDWOOD_35349255 Ends
        fnDisableBrowserKey(e);
        try {
            e.keyCode = 0;
        } catch(ex) { //Fix for 19224303          
        }        
        return false;        
    } else if(e.shiftKey == true && e.keyCode == 115){
        fnDisableBrowserKey(e);
        try {
            e.keyCode = 0;
        } catch(ex) {} //Fix for 19224303
        var event = e;
        if (getNextSibling(getNextSibling(srcElem)) && getNextSibling(getNextSibling(srcElem)).tagName == "BUTTON") {
            if(getIEVersionNumber() > 0){
                fireHTMLEvent(getNextSibling(getNextSibling(srcElem)), "onclick");
            }else {
                //eval(getNextSibling(getNextSibling(srcElem)).getAttribute('onclick'));
                var fnEval = new Function("event",getNextSibling(srcElem).getAttribute("onclick"));  
                fnEval();
            }
        }
        return false;
    }
   /* if (e.keyCode == 120) if (srcElem.tagName == "INPUT" && srcElem.type.toUpperCase() == 'TEXT') if (typeof(srcElem.parentNode.getElementsByTagName("BUTTON")[0]) != 'undefined') srcElem.parentNode.getElementsByTagName("BUTTON")[0].click();*/
   // fix for bug: 19060316 starts
   if (e.keyCode == 120 && mainWin.applicationExt == "JP") { 
         fieldName = srcElem.name;
         parentWinParams = new Object();
         var custFieldNames = "CUSTOMER_NO~CUSTNO~CUSTID~R_CUSTID~CUST_NO~CUSTOMER_ID~CIFID~CUSTOMER1~CUSTOMER2~CUSTOMERNO";
         if(custFieldNames.indexOf(fieldName) >  - 1) {
            parentWinParams.custNo = srcElem.value;
            //mainWin.dispHref1("STDCUADL",seqNo);//FCUBS_CNSL_OTPBANK_36244455 Commented
            mainWin.dispHref1("STDCUADL",getSeqNo()); //FCUBS_CNSL_OTPBANK_36244455 Added
         } else if ((fieldName.indexOf('AC') != '-1') && srcElem.value != "") { 
                parentWinParams.accNo = srcElem.value;
                var brn = "";
                var prevSib = "";
                try{
                    try{
                    if (getEventSourceElement(e).parentNode.tagName && getEventSourceElement(e).parentNode.tagName == 'TD') {
                        prevSib = getEventSourceElement(e).parentNode.parentNode.getElementsByTagName("INPUT");
                    } else {
                        prevSib = getPreviousSibling(getEventSourceElement(e).parentNode).childNodes;
                    }
					/*Fix for 17434292  Starts*/
                    if(getPreviousSibling(getEventSourceElement(e).parentNode).nodeType=='3'){
                       prevSib = getPreviousSibling(getPreviousSibling(getEventSourceElement(e).parentNode)).childNodes;
                    }
                    /*Fix for 17434292  Ends*/
					}catch(er){}
                    for (var i = 0; i < prevSib.length; i++) {
                        if (prevSib[i].maxLength == '3') {
                            /*Fix for 17434292*/
                          //if (prevSib[i].name.indexOf('BRN') != '-1' || prevSib[i].name.indexOf('BRANCH') != '-1') {
                           if (prevSib[i].name.indexOf('BR') != '-1') {  /*Fix for 17434292*/
                                brn = prevSib[i].value;
                            }
                        }
                    }
                }catch(ex){
                    brn = g_txnBranch;  
                }
                if (brn == "") {
                    if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {  
                        //fix for 14807178 starts
                        if(document.getElementById(txnBranchFld)!= null){
                        brn = document.getElementById(txnBranchFld).value;   
                        //fix for 14807178 ends
                        }
                    }               
                }
                //fix for 14807178 starts
                if (brn == "") {
                  if(typeof(acnoBrn) != "undefined")brn = acnoBrn;
                }
                //fix for 14807178 ends
                if (brn == "") brn = g_txnBranch;
                currtxnBranch = g_txnBranch;
              
              parentWinParams.brn = brn;
              //mainWin.dispHref1("STDCUADL",seqNo);//FCUBS_CNSL_OTPBANK_36244455 Commented
              mainWin.dispHref1("STDCUADL",getSeqNo());//FCUBS_CNSL_OTPBANK_36244455 Added
         } else {
             return false;
         }
     }//fix for bug: 19060316 ends
     //FCUBS_12.1_CASA_Joint_Holder_Display Changes starts
      if (e.ctrlKey && !e.shiftKey && !e.altKey && e.keyCode == 74) {
        parentWinParams = new Object();
        if(srcElem.getAttribute("HOTKEYREQJA")=='Y') {
            parentWinParams.accNo = srcElem.value;                     
            parentWinParams.brn = getAccBranch(e);
            //mainWin.dispHref1("STDJHMNT",seqNo);//FCUBS_CNSL_OTPBANK_36244455 Commented
            mainWin.dispHref1("STDJHMNT",getSeqNo());//FCUBS_CNSL_OTPBANK_36244455 Added
            fnDisableBrowserKey(e);
            try {
                e.keyCode = 0;
            } catch (e) {}
        }else{
            preventpropagate(e);
            fnDisableBrowserKey(e);
            try {
                e.keyCode = 0;
            } catch (e) {}
            return false;
        }     
     }
     //FCUBS_12.1_CASA_Joint_Holder_Display Changes Ends
    f1Help(e);

    if (e.ctrlKey == true && e.altKey == false && e.keyCode == 76) {
       if (gAction == 'NEW' || gAction == 'MODIFY'|| gAction == 'ENTERQUERY') {
            if (window.document.title != mainWin.gActiveWindow.document.title) {
                if (document.getElementById("BTN_EXIT_IMG")) 
                    if (!document.getElementById("BTN_EXIT_IMG").disabled) {
                        fnDisableBrowserKey(e);
                        fnExitSubScreen(e);
                    }
            } else {                
                if (document.getElementById("BTN_EXIT_IMG")) {
                    if (!document.getElementById("BTN_EXIT_IMG").disabled) {// FCUBS 11 Key Board Keyboard Shotcut Changes - Start
                        fnDisableBrowserKey(e);
                        if ( mainWin.gActiveWindow.screenType == "WB" && returnValue != "N"){
                            fnBrnCancel()
                        } else{
                            /*fnExitAll();*/
                            fnExit(e);
                        }// FCUBS 11 Key Board Keyboard Shotcut Changes - End
                    }
                }
            }
        }else{
            preventpropagate(e);
            fnDisableBrowserKey(e);
            try {
                e.keyCode = 0;
            } catch(ex) {} //Fix for 19224303
            return false;
        } 
    } else if (e.ctrlKey == true && e.altKey == false && e.keyCode == 75) { //Fix for 22653877
        fnDisableBrowserKey(e);
        if (window.document.title != mainWin.gActiveWindow.document.title){ 
            if (document.getElementById("BTN_OK_IMG")) {
                if (!document.getElementById("BTN_OK_IMG").disabled){                     
                    fnSaveSubScreenData();
                }
            }
        }else{
            if(document.getElementById("BTN_OK_IMG")){
                if (!document.getElementById("BTN_OK_IMG").disabled){
                    fnSave(e);
                }
            }
        }
    } else if (e.ctrlKey == true && e.altKey == false && e.keyCode == 87) { // If 'W' is pressed with Ctrl Key... //Fix for 22653877
        fnDisableBrowserKey(e);
        if (window.document.title != mainWin.gActiveWindow.document.title) {
            if (document.getElementById("BTN_EXIT_IMG")) {
                if (!document.getElementById("BTN_EXIT_IMG").disabled) {
                    fnExitSubScreen(e);
                }
            }
        } else {                
            if (document.getElementById("BTN_EXIT_IMG")) {
                if (!document.getElementById("BTN_EXIT_IMG").disabled) {// FCUBS 11 Key Board Keyboard Shotcut Changes - Start
                    if ( mainWin.gActiveWindow.screenType == "WB" && returnValue != "N"){
                        fnBrnCancel()
                    } else{
                        /*fnExitAll();*/
                        fnExit(e);
                    }// FCUBS 11 Key Board Keyboard Shotcut Changes - End
                }
            }
        }
        return false;
    } else if (e.ctrlKey == true && e.altKey == false && e.keyCode == 33) { // If 'Page Up' is pressed with Ctrl Key...for PREVIOUS TAB //Fix for 22653877
        fnNavigateTabs('backward', tab_arr, tab_ids);
        fnDisableBrowserKey(e);
    } else if (e.ctrlKey == true && e.keyCode == 34) { // If 'Page Down' is pressed with Ctrl Key...for NEXT TAB
        fnNavigateTabs('forward', tab_arr, tab_ids);
        fnDisableBrowserKey(e);
    }
    
    if(e.keyCode == 123 || e.keyCode == 121 ){
        hotKeyPressed = false;
        fireHTMLEvent(srcElem, "onchange",e);//Fix for 21485708
        if (isLovOpen){
            fnDisableBrowserKey(e);
            try {
                e.keyCode = 0;
            } catch (e) {}
            return false;
        }
     var imgType = "";
        if (e.keyCode == 123) {
            imgType = "S";
        }
        else {
            imgType = "I";
        }
        hotKeyPressed = true;
		//Fix for 18635762 -User Level Hot Key restriction Starts
        if( e.keyCode == 121 && mainWin.f10_Reqd == 'N'){
          alert(mainWin.getItemDesc("LBL_INFRA_F12REST"));
          fnDisableBrowserKey(e);
          try {
              e.keyCode = 0;
          } catch (ex) {} //Fix for 19224303
          focusReqd = false;
          focusField = hotkeySrcElem;
          e.returnValue = false;
          gIsValid = false;
          return false;
        }
       if(e.keyCode == 123 && mainWin.f12_Reqd == 'N'){
          alert(mainWin.getItemDesc("LBL_INFRA_F10REST"));
          fnDisableBrowserKey(e);
          try {
              e.keyCode = 0;
          } catch (ex) {} //Fix for 19224303
          focusReqd = false;
          focusField = hotkeySrcElem;
          e.returnValue = false;
          gIsValid = false;
          return false;
        }
		//Fix for 18635762 -User Level Hot Key restriction Ends
        hotkeySrcElem = srcElem;
        var fieldName = srcElem.name;
        if (fieldName != undefined) {
		    /* Fix for bug 17320161 - start */
            /*if ((fieldName.indexOf('ACCNO') != '-1' || fieldName.indexOf('ACNO') != '-1' || fieldName.indexOf('AC_NO') != '-1' || fieldName.indexOf('ACC') != '-1' || (typeof(acnoFields) !=  "undefined" && acnoFields.indexOf(fieldName) != '-1')) && srcElem.value != "") {//fix for 14807178*/
			if ((fieldName.indexOf('AC') != '-1') && srcElem.value != "") {
			/* Fix for bug 17320161 - end */
                var accNo = srcElem.value;
                var brn = "";
                var prevSib = "";
				if(getEventSourceElement(e).parentNode.tagName && getEventSourceElement(e).parentNode.tagName == 'TD'){
					prevSib= getEventSourceElement(e).parentNode.parentNode.getElementsByTagName("INPUT");
				}else{					
				//	prevSib = getPreviousSibling(getEventSourceElement(e).parentNode).childNodes;	//FCUBS_CNSL_OTPBANK_36244455 Commented				
					prevSib = getPreviousSibling(getEventSourceElement(e).parentNode.parentNode).childNodes; //FCUBS_CNSL_OTPBANK_36244455 Added
				}
				/*Fix for 17434292  Starts*/
	//if(getPreviousSibling(getEventSourceElement(e).parentNode).nodeType=='3'){//FCUBS_CNSL_OTPBANK_36244455 Commented
					if(getPreviousSibling(getEventSourceElement(e).parentNode.parentNode).nodeType=='3'){ //FCUBS_CNSL_OTPBANK_36244455 Added
					   prevSib = getPreviousSibling(getPreviousSibling(getEventSourceElement(e).parentNode)).childNodes;
					}
          		/*Fix for 17434292  Ends*/
                for(var i=0;i<prevSib.length;i++){
                    if(prevSib[i].maxLength == '3') {
                        /*Fix for 17434292*/
                        //if (prevSib[i].name.indexOf('BRN') != '-1' || prevSib[i].name.indexOf('BRANCH') != '-1') {
                        if (prevSib[i].name.indexOf('BR') != '-1') {  /*Fix for 17434292*/
                            brn = prevSib[i].value;
                        }
                    }         
                }
                if (brn == "") {
                    if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {          
                    //fix for 14807178 starts
                    if(document.getElementById(txnBranchFld)!= null){
                      brn = document.getElementById(txnBranchFld).value;   
                    }
                    //fix for 14807178 ends                
                    }               
                }   
                //fix for 14807178 starts
                if (brn == "") {
                  if(typeof(acnoBrn) != "undefined")brn = acnoBrn;
                }
                //fix for 14807178 ends
                if(brn == "")
                    brn = g_txnBranch;
                var opt = "DISPCUSTIMG";
                var kvalue = "";
                if(e.keyCode == 123){
                    kvalue = "S";		   //FCUBS11.1 ITR2 SFR#983 changes
                }else {
                    kvalue = "P";
                }
				//Fix for 15928835,19558009
				try{
					fnSetHotKeyBranch(e);
				}catch(ex){} //Fix for 19224303
				if(hotKeyBrn != ""){
					brn = hotKeyBrn;
				}
				//Fix for 15928835
                 if (screenType == 'WB') {
                    if (mainWin.functionDef[functionId].txnAcc != "null") {
                        //if (srcElem.id == mainWin.functionDef[functionId].txnAcc) { //12.0.3_18374725 
                        //if (srcElem.id == mainWin.functionDef[functionId].txnAcc || srcElem.id == "BLK_TRANSACTION_DETAILS__VIRACCNO") { //9NT1606_12_4_INTERNAL_26820002 - Commented
                        if (srcElem.id == mainWin.functionDef[functionId].txnAcc || srcElem.id == "BLK_TRANSACTION_DETAILS__VIRACCNO" || srcElem.id == "BLK_TRANSACTION_DETAILS__UI_TXN_ACC") { //9NT1606_12_4_INTERNAL_26820002
                            //12.0.3_18374725 			
                            parent.gAccToBeVerified = true;
                        }
                        else {
                            parent.gAccToBeVerified = false;
                        }
                    }
                }
               //12.0.2_single_step_process             
                if (srcElem.tagName == "INPUT" && srcElem.type.toUpperCase() == 'TEXT') {
					if(typeof(parent.seqNo)!= "undefined" && parent.seqNo!= null&& getSeqNo() == parent.seqNo){//FCUBS_CNSL_OTPBANK_36244455 added if //if Hot key pressed from callforms
                   parent.parentWinParams.accNo = accNo;
                    parent.parentWinParams.brn = brn;
                    parent.parentWinParams.imgType = imgType;
                    }
                    else{
                    parentWinParams.accNo = accNo;
                    parentWinParams.brn = brn;
                    parentWinParams.imgType = imgType;
                    
					}
				//	mainWin.dispHref1("SVDIMGVW", seqNo);//FCUBS_CNSL_OTPBANK_36244455 Commented
					//Bug_36924146 Changes Starts	
					if(isRofcFunctionId()){
					//Bug_36924146 Changes Ends	
					mainWin.dispHref1("SVDIMGVW", getSeqNo());//FCUBS_CNSL_OTPBANK_36244455 Added
                    //fndispImage(accNo, kvalue, brn);//FCUBS11.1 ITR2 SFR#983 changes, kvalue included					
                    //Bug_36924146 Changes Starts
					}else{
						 if(imgType == 'I'){  
						   mainWin.dispHref1("SVDCOIMG", getSeqNo());
						}else{
						   mainWin.dispHref1("SVDCOSGN", getSeqNo());	
						}
                    }
					//Bug_36924146 Changes Ends
				}
                fnDisableBrowserKey(e);
                try {
                    e.keyCode = 0;
                    } catch(ex) {} //Fix for 19224303		   
            }else{
                alert(mainWin.getItemDesc("LBL_INFRA_INVFLD"));
                return false;
            }
        } else {
            fnDisableBrowserKey(e);
            try {
                e.keyCode = 0;
            } catch(ex) {} //Fix for 19224303
            return false;
        }
    }else if(e.keyCode == 122){
		 /*Fix for 20143643 Starts */
        hotKeyPressed = false;
        fireHTMLEvent(srcElem, "onchange",e);//Fix for 21490979
        if (isLovOpen){
            fnDisableBrowserKey(e);
            try {
                e.keyCode = 0;
            } catch (e) {}
            return false;
        }
        /*Fix for 20143643 Ends */
        hotKeyPressed = true; 
		//Fix for 18635762 -User Level Hot Key restriction Starts
        if(mainWin.f11_Reqd == 'N'){
          alert(mainWin.getItemDesc("LBL_INFRA_F11REST"));
          fnDisableBrowserKey(e);
          try {
              e.keyCode = 0;
          } catch (ex) {} //Fix for 19224303
          focusReqd = false;
          focusField = hotkeySrcElem;
          e.returnValue = false;
          gIsValid = false;
          return false;
        }
		//Fix for 18635762 -User Level Hot Key restriction Ends
        hotkeySrcElem = srcElem;
        var fieldName = srcElem.name;
        if (fieldName != undefined) {
		   /* Fix for bug 17320161 - start */
           /*if ((fieldName.indexOf('ACCNO') != '-1' || fieldName.indexOf('ACNO') != '-1' || fieldName.indexOf('AC_NO') != '-1' || fieldName.indexOf('ACC') != '-1' || (typeof(acnoFields) !=  "undefined" && acnoFields.indexOf(fieldName) != '-1')) && srcElem.value != "") {//fix for 14807178*/
		   if ((fieldName.indexOf('AC') != '-1') && srcElem.value != "") {
		   /* Fix for bug 17320161 - end */
                var accNo = srcElem.value;
                //11.0INDITR1 SFR 459 Starts
                var brn = "";
                var prevSib = "";
                try{
                    if(getEventSourceElement(e).parentNode.tagName && getEventSourceElement(e).parentNode.tagName == 'TD'){
                            prevSib= getEventSourceElement(e).parentNode.parentNode.getElementsByTagName("INPUT");
                    }else{					
                            prevSib = getPreviousSibling(getEventSourceElement(e).parentNode).childNodes;
                    }
					/*Fix for 17434292  Starts*/
					if(getPreviousSibling(getEventSourceElement(e).parentNode).nodeType=='3'){
					   prevSib = getPreviousSibling(getPreviousSibling(getEventSourceElement(e).parentNode)).childNodes;
					}
          			/*Fix for 17434292  Ends*/
                    for(var i=0;i<prevSib.length;i++){
                        if(prevSib[i].maxLength == '3'){
                           /*Fix for 17434292*/
                        //if (prevSib[i].name.indexOf('BRN') != '-1' || prevSib[i].name.indexOf('BRANCH') != '-1') {
                        if (prevSib[i].name.indexOf('BR') != '-1') {  /*Fix for 17434292*/
                                brn = prevSib[i].value;
                            }
                        }         
                    }
                }catch(ex){ //Fix for 19224303
                    brn = g_txnBranch;
                }
				if (brn == "") {
                    if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") {          
                    //fix for 14807178 starts
                    if(document.getElementById(txnBranchFld)!= null){
                      brn = document.getElementById(txnBranchFld).value;   
                    }
                    //fix for 14807178 ends                       
                    }               
                }   
                 //fix for 14807178 starts
                if (brn == "") {
                  if(typeof(acnoBrn) != "undefined")brn = acnoBrn;
                }
                //fix for 14807178 ends
                if(brn == "")
                    brn = g_txnBranch;
                var opt = "CUSTACCBAL";
                currtxnBranch = g_txnBranch;
                //Fix for 15928835,19558009
                try{
                if(!fnSetHotKeyBranch(e)){
                 fnDisableBrowserKey(e);
                   try {
                     e.keyCode = 0;
                       } catch(ex) {} //Fix for 19224303
                   return false;
                }
                    }catch(ex){} //Fix for 19224303
                    if(hotKeyBrn != ""){
                    brn = hotKeyBrn;
                }
                //Fix for 15928835
                g_txnBranch = brn;
                           if (srcElem.tagName == "INPUT" && srcElem.type.toUpperCase() == 'TEXT') {
                    //F11 extensible
                    parentWinParams.accNo = accNo;
                    parentWinParams.brn = brn;//debugger;
                    var addlArgs = new Array();
                	try {
                		addlArgs = fnGetAddlArgsF11();
                	} catch(e){}
                    var cnt = 0;
                    for (var i in addlArgs) {
                        cnt++;
                    }
                    if (cnt > 0)
                        parentWinParams.addlArgs = addlArgs;

    //mainWin.dispHref1("STDCUBAL", seqNo);//FCUBS_CNSL_OTPBANK_36244455 Commented
                   
					//Bug_36924146 Changes Starts
					if(isRofcFunctionId()){
					//Bug_36924146 Changes Ends	
					   mainWin.dispHref1("STDCUBAL", getSeqNo()); //FCUBS_CNSL_OTPBANK_36244455 Added
                    //Bug_36924146 Changes Starts 
					}else{
					   mainWin.dispHref1("STDCOBAL",getSeqNo());
					}	
					//Bug_36924146 Changes Ends		
					// fndispCustbal(accNo, brn);
                }
                g_txnBranch = currtxnBranch;
                fnDisableBrowserKey(e);
                try {
                e.keyCode = 0;
                } catch(ex) { //Fix for 19224303
                   
                }
            }else{
                alert(mainWin.getItemDesc("LBL_INFRA_INVFLD"));
                return false;
            }
        } else {
            fnDisableBrowserKey(e);
            try {
                e.keyCode = 0;
            } catch(ex) {} //Fix for 19224303
            return false;
        }
    } else if(e.keyCode == 117) {
        hotKeyPressed = true;
        var fieldValue = srcElem.value;
        var fieldName = srcElem.name;
        var l = document.getElementsByTagName("INPUT").length;
        var brn_fldname;
        var brnFldValue;
        if (fieldName.indexOf("ACC")!= -1 || fieldName.indexOf("AC")!= -1) {
            for(var i=0;i<l;i++) {
                if(document.getElementsByTagName("INPUT")[i].name == fieldName){
                    brn_fldname = document.getElementsByTagName("INPUT")[i-1].name;
                    break;
                }
            }
        }
        if (typeof(brn_fldname) != 'undefined' && brn_fldname != null && brn_fldname != "") {
            brnFldValue = document.getElementsByName(brn_fldname)[0].value;
        }
        if (brnFldValue == null || typeof(brnFldValue) == 'undefined'|| brnFldValue=="") {
            brnFldValue = mainWin.CurrentBranch;
        }
        var fieldId = srcElem.id;
        
        //fndispInstr(fieldValue,fieldName,fieldId,brnFldValue);  //Bug_36924146
		fndispInstrCore(fieldValue,fieldName,fieldId,brnFldValue);//Bug_36924146
        fnDisableBrowserKey(e);
        e.keyCode = 0;
    }
    /* FC11.1 Notepad Changes Ends*/
    if(typeof(fromSubScr) != "undefined" && fromSubScr == true){
        if(e.altKey == false && ((e.ctrlKey == true && e.keyCode == 68) || (e.ctrlKey == true && e.keyCode == 77) || (e.ctrlKey == true && e.keyCode == 78) || (e.ctrlKey == true && e.keyCode == 79) || (e.ctrlKey == true && e.keyCode == 80) || (e.ctrlKey == true && e.keyCode == 82))){ //Fix for 22653877
            preventpropagate(e);
            fnDisableBrowserKey(e);
            try {
                e.keyCode = 0;
            } catch(ex) {} //Fix for 19224303
            return false;
        }    
    }
}

function fnGetFieldNames(fieldName, opt, accNo){
    var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>'+mainWin.UserId+'</USERID><BRANCH>'+mainWin.CurrentBranch+'</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>'+functionId+'</FUNCTIONID><FIELDNAME>'+ fieldName +'</FIELDNAME><ACCNO>'+ accNo +'</ACCNO><ACTION>'+ opt +'</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    var requestDom = createDOMActiveXObject();
    requestDom.async = false;
    requestDom.resolveExternals = true;
    requestDom=loadXMLDoc(requsetStr);
    var responseDom = createDOMActiveXObject();
    responseDom.async = false;
    responseDom.resolveExternals = true;
    responseDom = fnPost(requestDom, "FCClientHandler", functionId);
    if (responseDom && getXMLString(responseDom) != "") {
        var msgStat = getNodeText(selectSingleNode(responseDom, "//RESPONSE/MSGSTAT"));
        var field = getNodeText(selectSingleNode(responseDom, "//RESPONSE/FIELDLIST"));
        var acc = getNodeText(selectSingleNode(responseDom, "//RESPONSE/ACCLIST"));
        if (msgStat == "SUCCESS" && field != "" && acc != "") {
            return true;           
        }else{         
            if(acc =="")
                alert(mainWin.getItemDesc("LBL_INFRA_INVACC"));            
            else
                alert(mainWin.getItemDesc("LBL_INFRA_INVFLD"));
            return false;
        }
    }
}

function fnMouseDownEvents()
{
    //dlgArg.mainWin.frames["FrameMenu"].oPopup.hide();
    return true;
}

function string_parser(to_parse, del, str_arr)
{
    i = 0;
    str = to_parse;
    while ((p1 = str.indexOf(del, 0)) != -1)
    {
        str_arr[i] = str.substr(0, p1);
        str = str.substr(p1 + 1);
        i++;
    }
    if (str != "")
    {
        str_arr[i] = str;
        i++;
    }
    return i;
}

function fnCheckSWIFTFormat(stringToCheck)
{
    var strSWIFTCharSet;

    strSWIFTCharSet = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    strSWIFTCharSet = strSWIFTCharSet + '0123456789.,-()+/\=*&%:?!"<>;~`@#$^_[]{}|';
    strSWIFTCharSet = strSWIFTCharSet + "'";

    for (var i = 0; i < stringToCheck.length; i++)
    {
        if (strSWIFTCharSet.indexOf(stringToCheck.substr(i, 1)) == -1) return false;
    }

    return true;
}

function NVL(strToCheck, defaultValue)
{

    var lDefaultValue = "";
    if (arguments.length == 2)
    {
        lDefaultValue = defaultValue;
    }
    return (strToCheck == null ? lDefaultValue: strToCheck);
}

function zeroPrefix(nValue, numOfZeroes)
{
    tmpStr = "00000000000000000000000000000000000000000000000000000000";
    tmpStr += nValue;
    return tmpStr.substr(tmpStr.length - numOfZeroes);
}

/*
 * This function replaces the given character in a string with  
 * replace character
 * For those who are curious on why this function has been written instead of 
 * JScript's pattern matching/replace, special characters like *, . cause lot of problem
 */
function replaceAllChar(str, searchChar, replaceChar)
{
    var retStr = "";

    for (var loopIndex = 0; loopIndex < str.length; loopIndex++)
    {
        if (str.substr(loopIndex, 1) == searchChar)
        {
            retStr += replaceChar;
        } else
        {
            retStr += str.substr(loopIndex, 1);
        }
    }

    return retStr;
}

function fnReverseStr(str)
{
    var retStr = "";
    var s = new String(str);
    for (i = s.length - 1; i >= 0; i--)
    {
        retStr = retStr + s.charAt(i);
    }
    return retStr;
}

//utilities
function isWhitespace(ch)
{
    if (ch == ' ' || ch == '\n' || ch == '\r' || ch == '\t' || ch == '\f' || ch == '\b') return true;
    return false;
}

function ltrim(argvalue)
{
    argvalue = argvalue + "";
    while (true)
    {
        if (!isWhitespace(argvalue.substring(0, 1))) break;
        argvalue = argvalue.substring(1, argvalue.length);
    }
    return argvalue;
}

function rtrim(argvalue)
{
    argvalue = argvalue + "";
    while (true)
    {
        if (!isWhitespace(argvalue.substring(argvalue.length - 1))) break;
        argvalue = argvalue.substring(0, argvalue.length - 1);
    }
    return argvalue;
}

/* To trim any field*/

function trim(argvalue)
{
    argvalue = argvalue + "";
    var tmpstr = ltrim(argvalue);
    return rtrim(tmpstr);
}

function getLabelDescription(fieldObject)
{

    var objUIXML = loadXMLFile(xmlFileName);
    var fieldName = fieldObject.name;
    if (fieldObject.getAttribute("DBT"))
    {
        // It's an element from Single Entry Block
    } else
    {
        // It's an element from Multiple Entry Block
    }
    var filedNode = selectSingleNode(objUIXML, "//" + fieldName);

}

function gEncodeQuery(mainStr)
{

    var re;
    var encodedText = "";

    //Replace all occurence of % with *
    re = new RegExp("%", "g");
    encodedText = mainStr.replace(re, "*");
    return (encodedText);

}

// Reddy Prasad added this function to disable the windows help window on F1 in IE
function disableDefault()
{
	// 9NT1606_12_2_RETRO_12_0_1_23653303 starts
    if (getBrowser().indexOf("IE") >=0 && getBrowser().indexOf("11") != -1) {  
      event.preventDefault();
    }else{ //9NT1606_12_2_RETRO_12_0_1_23653303 ends 
    event.returnValue = false;
	} //9NT1606_12_2_RETRO_12_0_1_23653303 changes 
    return false;
}

function gEncodeData(mainStr)
{

    var re;
    var encodedText = "";
    re = new RegExp("%", "g");
    encodedText = mainStr.replace(re, "*");
    return (encodedText);
}

// 11.0 Help File Fix Starts
function isHelpFileExists(filename)
{
    var strFormData = "IS_HELPFILE_EXISTS=Y";
    var objHTTP = createHTTPActiveXObject();
	try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", "BranchServlet", false); 
    objHTTP.setRequestHeader("Content-Type", "application/text");
    objHTTP.setRequestHeader("FILENAME",filename);
	objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objHTTP.send();
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
     catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    mainWin.inactiveTime = 0;
    var responseXML = objHTTP.responseXML;
    var sessionNode = selectSingleNode(responseXML, "//HELPFILE");   
    var sessionText = getNodeText(sessionNode);
    if (sessionText == "NOT AVAILABLE"){          
        return false;
    }else{
        return true;
    }
}
// 11.0 Help File Fix Ends

function gDecodeQuery(mainStr)
{

    var re;
    var decodedText = "";

    //Replace all occurence of &amp with &
    re = new RegExp("&amp;", "g");
    decodedText = mainStr.replace(re, "&");

    //Replace all occurence of &lt with <
    re = new RegExp("&lt;", "g");
    decodedText = decodedText.replace(re, "<");

    //Replace all occurence of &gt with >
    re = new RegExp("&gt;", "g");
    decodedText = decodedText.replace(re, ">");

    //Replace all occurence of &apos with '
    re = new RegExp("&apos;", "g");
    decodedText = decodedText.replace(re, "'");

    //Replace all occurence of &quot with "
    re = new RegExp("&quot;", "g");
    decodedText = decodedText.replace(re, "\"");

    return (decodedText);
}
/**
    Function to get the current Help File Path.
*/
function helpFinalPath(path)
{
    var s = path;
    var filePath = "";
    //var fso = new ActiveXObject("Scripting.FileSystemObject");
    var fileName = "";
    var fileNm = "";

    s = true;
    for (var i = path.length; i > 0; i--)
    {
        if (path.charAt(i) == "/")
        {
            fileName = path.split("/", i - 1, path.length);
            break;
        }
    }

    fileNm = fileName[fileName.length - 2] + "/";
    return fileNm;
}
/*  SFR#3203
	Javascript is very uncertain in case of Floating point multiplication.
	for e.g. 51 * 0.1 should be 5.1 but js give 5.10000000000000005 as a result.
  	This uncertainty create problem in other calculations. so an equivalent function
  	is created. which will do an Integer multiplication after converting 
  	floating points to Integer. and then again convert the Result of multiplication
  	in floating point.
  	eg 51 * 0.1  then 51 * 1 / 10 will be the computation made by the function.
*/
function floatingPointMultiplication(num1, num2)
{
    var gDecimalSymbol = mainWin.nlsAmountFormat.substr(0, 1);
    if (Math.round(num1) == num1 && Math.round(num2) == num2) return num1 * num2;
    var num1Comps = (num1 + '').split(gDecimalSymbol);
    var num1Decimals = 1;
    if (num1Comps[1])
    {
        for (var cnt = 0; cnt < num1Comps[1].length; cnt++)
        {
            num1Decimals *= 10
        }
    } else {
        num1Comps[1] = '0';
    }
    var num2Comps = (num2 + '').split(gDecimalSymbol);
    var num2Decimals = 1;
    if (num2Comps[1])
    {
        for (var cnt = 0; cnt < num2Comps[1].length; cnt++)
        {
            num2Decimals *= 10
        }
    } else {
        num2Comps[1] = '0';
    }
    var intNum1 = Number(num1Comps[0]) * num1Decimals + Number(num1Comps[1]);
    var intNum2 = Number(num2Comps[0]) * num2Decimals + Number(num2Comps[1]);
    return (intNum1 * intNum2) / (num1Decimals * num2Decimals); 
}

function getSystemShortDate(y, m, d) {
    return format(y, m - 1, d, mainWin.systemDateFormat, getSeparator(mainWin.systemDateFormat));
}

/* THE MTHODS HAVE BEEN COPIED FORM DateUtil.js - START */

function getSeparator(dateFormat) {
    var separator = "";
    if (dateFormat && dateFormat != "") {
        for (i = 0; i < dateFormat.length; i++) {
            testCharacter = dateFormat.charAt(i);
            if ((testCharacter.toUpperCase() != 'D') && (testCharacter.toUpperCase() != 'Y') && (testCharacter.toUpperCase() != 'M')) {
                separator = testCharacter;
                break;
            }
        }
    }
    return separator;
}

function format(y, m, d, dateFormat, separator) {
    var l_retval = '';
    var y1;
    var m1;
    var d1;
    var dateFormatComp = '';
    if (!dateFormat || dateFormat == '') {
        dateFormat = gDateFormatDSO;
    }
    if (!separator || separator == '') {
        separator = gDateSeperator
    }
    d1 = parseInt(d, 10);
    y1 = y % 100;
    m1 = parseInt(m, 10) + 1;
    dateFormatComp = splitDateFormat(dateFormat, separator);
    for (var i = 0; i < 3; i++) {
        switch (dateFormatComp[i]) {
        case 'd':
        case 'D':
            l_retval += d1;
            break;
        case 'dd':
        case 'DD':
            if (d1 < 10) l_retval += '0';
            l_retval += d1;
            break;
        case 'M':
            l_retval += m1;
            break;
        case 'mm':
        case 'MM':
            if (m1 < 10) l_retval += '0';
            l_retval += m1;
            break;
        case 'MMM':
        case 'MON':
            l_retval += gShortMonthValues[m];
            break;
        case 'MMMM':
            l_retval += getMonthFromMMMm(m);
            break;
        case 'yy':
        case 'YY':
            if (y1 == 0) l_retval += "00";
            else {
                if (y1 < 10) l_retval += "0";
                l_retval += y1;
            }
            break;
        case 'YYYY':
        case 'yyyy':
            var fulYear = getYYYYfromYYMMDD(y + '', m + '', d1 + '');
            l_retval += fulYear;
            break;
        }
        if (i < 2) if (separator && separator != '' && separator.toUpperCase() != "NULL");
        l_retval += separator;
    }
    l_retval = l_retval.substring(0, l_retval.length - 1);
    return l_retval;
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

function splitDateFormat(dateInputFormat, separator) {
    if (!separator || separator == '' || separator.toUpperCase() == "NULL") {
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
    } else {
        return dateInputFormat.split(separator);
    }
}

//the following code has been copied from DateUtil.js fro performance tuning

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

function getYYYYfromYYMMDD(y, m, d) {
    return (getDateObject(y, m, d)).getFullYear();
}

function displayDate(dataBoundElem, triggerOnChange)
{
    //var idDispVal = dataBoundElem.id + "I"; changed from id to name Hitesh
    var idDispVal = dataBoundElem.name + "I";
    var inpElem;
    if (dataBoundElem.parentNode.tagName.toUpperCase() == "NOBR" || dataBoundElem.parentNode.tagName.toUpperCase() == "DIV") 
        inpElem = getInpElem(dataBoundElem.parentNode.parentNode.parentNode, idDispVal);
    else 
        inpElem = getInpElem(dataBoundElem.parentNode.parentNode, idDispVal);

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
		yyInput = parseInt(yyInput, 10);
		if (yyInput >= 0 && yyInput <= 99) yyInput += (yyInput < 50 ? 2000 : 1900);
        this.yyyy = yyInput;
        this.mm = mmInput - 1 + '';
        this.dd = ddInput;
        this.separator = sep;
        this.dateInputFormat = dFormat;
    }

    this.isValidDate = isValidDate;
    this.getShortDate = getShortDate;
   // this.getLongDate = getLongDate;
    this.getInputDate = getInputDate;
    this.getDSODate = getDSODate;
    this.getFormattedDate = getFormattedDate;
    this.getInputDateFormat = getInputDateFormat;
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
        dateInputFormat = mainWin.systemDateFormat;
    }
    return dateInputFormat;
}

function isValidDate()
{
    return (this.validDate);
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

function getShortDate()
{
    if (this.isValidDate())
    {
        return getSystemShortDate(this.yyyy, parseInt(this.mm, 10) + 1, this.dd);
    }
}

/*function getLongDate()
{
    if (this.isValidDate())
    {
        return getSystemLongDate(this.yyyy, parseInt(this.mm, 10) + 1, this.dd);
    }
}*/

function getInputDate()
{
    if (this.isValidDate())
    {
        var retDate = format(this.yyyy, this.mm, this.dd, this.dateInputFormat, this.separator);
        return retDate;
    }
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

function acceptInputDate(idDate)
{
    var curInpElem = getEventSourceElement(event);
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV") var curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode.parentNode,idDate);
    else var curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode,idDate);

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
          //  window.status = mb3Date.getLongDate();
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
function validateInputDate(idDate, e)
{
    var event = window.event || e;
    var curInpElem = getEventSourceElement(event);
    if (curInpElem.parentNode.tagName.toUpperCase() == "NOBR" || curInpElem.parentNode.tagName.toUpperCase() == "DIV") var curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode.parentNode,idDate);
    else var curDataBoundElem = getInpElem(curInpElem.parentNode.parentNode,idDate);
    var inpDate = curInpElem.value;
    var mb3Date;
    window.status = '';
    //If the input date has changed, validate the date and
    //set it in Field that is bound to Data Source
    if (inpDate && inpDate != "")
    {
        if (g_dateFromSystemSetting)
        {
            var mb3Date = new MB3Date(inpDate, mainWin.systemDateFormat);
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
             if(getPreviousSibling(getPreviousSibling(dispNumField)).tagName != "LABEL"){
                getPreviousSibling(getPreviousSibling(curInpElem)).value = ""; 
            }else{
                getPreviousSibling(getPreviousSibling(getPreviousSibling(curInpElem))).value = ""; 
            }            
            event.returnValue = false;
            gIsValid = false;
        }
    } else
    {
        curDataBoundElem.value = "";
    }
}
//9NT1606_14_0_RETRO_12_0_3_27393036 changes starts
function autoPopSep(idDate1, e) {
    var event = window.event || e;
    var curInpElem = getEventSourceElement(event);    
    var dFormat1 = getInputDateFormat();
    var sep1 = getSeparator(dFormat1);
    var numChars = curInpElem.value.length;
    if(e.which != 8) {
        if (dFormat1.charAt(numChars) == sep1) {
            curInpElem.value = curInpElem.value + sep1;
        }
    }
} 
//9NT1606_14_0_RETRO_12_0_3_27393036 changes ends

/* THE MTHODS HAVE BEEN COPIED FORM DateUtil.js - END */

function getInpElem(node, elemId) {
    var inputElem = node.getElementsByTagName("INPUT");
    var inpElem;
    for (var i=0;i<inputElem.length;i++) {
        if (inputElem[i].name == elemId) {
            inpElem = inputElem[i];
            break;
        }
    }
    return inpElem;
}

function doTrim(obj) {
    return obj.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function fnValidate() {
    if(!fnValidateMandatory()) {
        mask();
        showAlerts(fnBuildAlertXML(gErrCodes.substring(0,gErrCodes.length-1),'I','', replaceStr.substring(0,replaceStr.length-1)), 'I');
        alertAction = "UNMASK";
        gErrCodes = "";
        replaceStr = "";
        return false;
    }
    
    if(!fnValidateDataType()) {
        mask();
        showAlerts(fnBuildAlertXML(gErrCodes.substring(0,gErrCodes.length-1),'I','', replaceStr.substring(0,replaceStr.length-1)), 'I');
        alertAction = "UNMASK";
        gErrCodes = "";
        replaceStr = "";
        return false;	
    }
    return true;
}

/******OvrdMsgs.js Functions Start**************************/
function displayMsg(arg1, arg2, fromServer)
{
    if (fromServer == null) fromServer = false;
    var msg;
    var msgtype;
    var errDesc;

    if (fromServer)
    {
        msg = arg1;
        msgtype = arg2;
    } else
    {
        errDesc = funcErrList[arg1];
        if (errDesc != undefined)
        {
            var rec = new Array();
            var rec = funcErrList[arg1].split('~');
            msg = getMessage(rec[0], arg2);
            msgtype = rec[1];
        } else
        {
            errDesc = mainWin.getCommonErrorList()[arg1];
            if (errDesc != undefined)
            {
                var rec = new Array();
                var rec = errDesc.split('~');
                msg = getMessage(rec[0], arg2);
                msgtype = rec[1];
            } else
            {
                msg = arg1 + " - Error Occured but message could not be determined";
                msgtype = "E";
            }
        }
    }
    if (msgtype == "O")
    {
        dispMsg();
        var ret = confirm(msg);
        if (ret == false) if (!fromServer) null;
    } else if (msgtype == "E")
    {
        alert(msg);
        if (!fromServer) null; //throw Error("ERROR");
    } else if (msgtype == 'I')
    {
        var labelDesc = "";
        alert(msg);
    }
}

function getMessage(eMsg, ePar)
{
    var init = 0;
    var cnt = 1;
    var params = new String(ePar);
    var tilda = params.indexOf("~");

    while (tilda != -1)
    {
        var param = params.substring(init, tilda);
        init = tilda;
        eMsg = eMsg.replace('$' + cnt, param);
        eMsg = eMsg.replace('{' + (cnt - 1) + '}', param);
        tilda = params.indexOf("~", tilda + 1);
        cnt++;
    }
    return eMsg;
}
/******OvrdMsgs.js Functions End**************************/

/*Fix for issue while getting date in Daylight Saving enabled mode*/
// bug#34786584 starts //commented this function and added a new logic to get the date object
/*
function getDateObject(y, m, d) {
    var dt = null;
    if(y != null && m != null && d != null) {
        var timestamp = Date.UTC(y, m , 0, 0,0,0);
        var dummydate = new Date(timestamp);
	var tzoffset = dummydate.getTimezoneOffset()/60;
	if (( m >8 ) || (m<2) ) tzoffset++; //9NT1606_12_4_RETRO_12_1_26939865 changes
	if (tzoffset >+0){
        /* Fix for Bug No 16838594 Start */
		//var millisecs = parseInt(timestamp) + (Number(d)+parseFloat(tzoffset/24))*86400000
        /* Fix for Bug No 16838594 End*/
        	/*dt= new Date(millisecs);
	} else {
		 dt= new Date(timestamp+(d)*86400000);
	}
    } else {
        dt = new Date();
    }
    return dt;
}*/

function getDateObject(y, m, d) {
	var dt = null;
	if (y != null && m != null && d != null) {
		dt = new Date(y,m,d);
	}
	else {
		dt = new Date();
	}
	return dt;
}
//bug#34786584 ends

//FCUBS_12.1_CASA_Joint_Holder_Display Changes starts
function getAccBranch(e){
    var prevSib = "";
    try{
        if (getEventSourceElement(e).parentNode.tagName && getEventSourceElement(e).parentNode.tagName == 'TD') {
            prevSib = getEventSourceElement(e).parentNode.parentNode.getElementsByTagName("INPUT");
        } else {
            prevSib = getPreviousSibling(getEventSourceElement(e).parentNode).childNodes;
        }
        if(getPreviousSibling(getEventSourceElement(e).parentNode).nodeType=='3'){
            prevSib = getPreviousSibling(getPreviousSibling(getEventSourceElement(e).parentNode)).childNodes;
        }
    }catch(er){}
    for (var i = 0; i < prevSib.length; i++) {
        if (prevSib[i].maxLength == '3') {
            if (prevSib[i].name.indexOf('BR') != '-1') { 
                brn = prevSib[i].value;
            }
        }
    }  
    if (brn == "") {
        if (typeof (txnBranchFld) != "undefined" && txnBranchFld != "") { 
            if(document.getElementById(txnBranchFld)!= null){
              brn = document.getElementById(txnBranchFld).value;   
            }
        }               
    }
    if (brn == "") brn = g_txnBranch;
    try{
        fnSetHotKeyBranch(e);
    }catch(ex){}
    if(hotKeyBrn != ""){
        brn = hotKeyBrn;
    }
    return brn;				
}	   
//REDWOOD_CHANGES
function getHolidayList(year,month) {
    //inDate = setActionTime();
    var calReqDom = null;
    var serverURL = "ExtHolidayFetchData?";
    serverURL += "year=" + year;
    serverURL += "&month=" + month;
    serverURL += "&functionId=" + functionId;
    serverURL += "&txnBranch=" + g_txnBranch;
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
            return holidays;
           }
    }
}

function getClickFunction(element) {
    var ojFunction = element.getAttribute("on-oj-action");
    if(ojFunction.indexOf("[[function() {") == 0) {
        return ojFunction.substring(ojFunction.indexOf("{") + 1, ojFunction.indexOf("}")).trim();
    } else {
        var funcName = ojFunction.substring(ojFunction.indexOf("[[") + 2, ojFunction.indexOf("]]"));
        var clickFunc = funcName.split(".bind(null,");
        return clickFunc[0] + "(" + clickFunc[1];
    }
    
}

function focusElement(element){
    if (element){
        element.tabindex = 0;
        element.focus();
    }  
    if(getInnerText(element) != "") {
        setTimeout(document.activeElement.classList.add('oj-table-custom-focus'), 0);
    }
}

function getTableTdObjElement(ele) {
    var tdElement = ele;
    while (tdElement.tagName.toUpperCase() != "TD") {
            tdElement = tdElement.parentNode;
        }    
    return tdElement;
}


//REDWOOD_CHANGES