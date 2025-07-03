/*----------------------------------------------------------------------------------------------------
**
** File Name    : Alert.js
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

Copyright © 2009-2017  by Oracle Financial Services Software Limited..

  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 17-Aug-2016
  **  Modified Reason      : Changes done to show only the EXIT button in Session expiry alert window
  **  Retro Source         : 9NT1606_12_0_3_BARCLAYS_BANK_PLC
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_23655319
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes

**	Modified By   : Saurav
** 	Modified on   : 30/08/2017
** 	Description   : Signature verification is not applicable for Financial Inclusion Customers.
** 	Search String : FCUBS_12.5_Financial_Inclusion_changes

**  Modified By            : Ambika Selvaraj
**  Modified On            : 11-Sep-2017
**  Modified Reason        : Change done to restrict firing of  field event when the field is  focused.
**  Retro Source           : 9NT1606_12_3_COOPERATIEVE_RABOBANK_U.A.
**  Search String          : 9NT1606_12_4_RETRO_12_3_26780546
----------------------------------------------------------------------------------------------------
*/
var parentDivHeight = "";
var parentDivWidth  = "";
var parentHeight    = "";
var parentWidth     = "";
var gAlertMessage   = "";
var msgChar=""; /* security fixes for WF */	 
//REDWOOD_CHANGES
if ( typeof(extBpelJs) !=  'undefined' && extBpelJs != '' ) {
       coreFncloseAlerts = closeAlerts;
 } 
//REDWOOD_CHANGES
function fnBuildAlertXML(alertCode, type, msg, replaceString) {
    if (typeof(msg) == "undefined" || (typeof(msg) != "undefined" && msg == "") || type == "S") { //session expiry change  
        var alertCode1 = alertCode.split("~");
        msg = "";
        for(var i=0; i<alertCode1.length; i++){
            if(alertCode1[i] != "") { 
                var tempMsg = mainWin.getCommonErrorList()[alertCode1[i]];
                if (tempMsg == undefined) {
                    msg += mainWin.getItemDesc("LBL_UNKNOWN_ERROR") + "~";
                } else {
                    if (typeof(replaceString) != "undefined") {
                        replaceString = replaceString + "";
                        replaceStr = replaceString.split("~");
                        tempMsg = tempMsg.replace('$1', replaceStr[i]);
                        tempMsg = tempMsg.replace('{0}', replaceStr[i]);
                    }
                    msg += tempMsg.split("~")[0];
                    msg += "~";
                }
            }
        }
        
        msg = msg.substring(0,msg.length-1);  
    }
    var finalMessage = msg.split("~");
    		//Fix for 14779785 starts 
	for (var i = 0; i < finalMessage.length; i++) {
		if (typeof(replaceString) != "undefined") {
			replaceString = replaceString + "";
			replaceStr = replaceString.split("~");
			finalMessage[i] = finalMessage[i].replace('$1', replaceStr[i]);
			finalMessage[i] = finalMessage[i].replace('{0}', replaceStr[i]);
		}	 
	}
	//Fix for 14779785 ends 
    if (type == 'E') {
        var errCodes = alertCode.split("~");
        var alertResp = "<FCUBS_ERROR_RESP>";
        for (var i = 0; i < finalMessage.length; i++) {
            alertResp = alertResp + "<ERROR><ECODE>";
            alertResp = alertResp + errCodes[i];
            alertResp = alertResp + "</ECODE><EDESC>";
            alertResp = alertResp + finalMessage[i];
            alertResp = alertResp + "</EDESC></ERROR>"
        }
        alertResp = alertResp + "</FCUBS_ERROR_RESP>";
    } else {
        var alertResp = "<FCUBS_WARNING_RESP>";
        for (var i = 0; i < finalMessage.length; i++) {
            alertResp = alertResp + "<WARNING><WCODE></WCODE><WDESC>";
            alertResp = alertResp + finalMessage[i];
            alertResp = alertResp + "</WDESC></WARNING>"
        }
        alertResp = alertResp + "</FCUBS_WARNING_RESP>";
    }
    return alertResp;
}

function fnBuildMsgArr(errorXml) {
    errorStr = '<RESPONSE>' + errorXml + '</RESPONSE>';
    errorDom = loadXMLDoc(errorStr);
    var errArr = new Array();
    if (errorDom != null) {
        var respNode = selectSingleNode(errorDom, "//ERROR");
        if (respNode) {
            var msgNodes = selectNodes(respNode, "MESSAGE");
            if (msgNodes.length > 0) {
                for (var i = 0; i < msgNodes.length; i++) {
                    var msg = getNodeText(msgNodes[i]);
                    errArr[msg.substring(0, msg.indexOf(" "))] = msg.substring(msg.indexOf(" ") + 1, msg.length);
                }
            }
        }
    }
    return errArr;
}

function showAlerts(alertMsg, type) {
    unmask(); //REDWOOD_CHANGES
    var tempScrType = "M";
    var ovdRoutingType = "NX";
    if (typeof(screenType) != "undefined") {
        debugs("screenType=" + screenType, "");
        tempScrType = screenType;
    }
    
    if (typeof(routingType) != "undefined") {
        debugs("routingType=" + routingType, "");
        ovdRoutingType = routingType;
    }

    if(alertMsg != null && alertMsg != "") {
        
        debugs("AlertMesage nno null", "");
        
        var xmlDoc = loadXMLDoc(alertMsg);
        debugs("looking for //FCUBS_ERROR_RESP", "");
        var elem = selectSingleNode(xmlDoc, "//FCUBS_ERROR_RESP");
        if(elem==null){
            debugs("Error node not available , looking for //FCUBS_WARNING_RESP", "");
            elem = selectSingleNode(xmlDoc, "//FCUBS_WARNING_RESP");
        }
        
        if(elem != null) {    
            gAlertMessage = "";
            var errNodeList = selectNodes(elem, "ERROR");
            if(errNodeList.length > 0) {
                
                for(var i = 0; i < errNodeList.length; ++i) {
                    gAlertMessage = gAlertMessage + getNodeText(selectSingleNode(errNodeList[i], "ECODE"));
                    gAlertMessage = gAlertMessage + "~" + getNodeText(selectSingleNode(errNodeList[i], "EDESC"));
                    gAlertMessage += "__";
                }
                debugs("Error Message=", gAlertMessage);
            } else{
                errNodeList = selectNodes(elem, "WARNING");
                for(var i = 0; i < errNodeList.length; ++i) {
                    gAlertMessage = gAlertMessage + getNodeText(selectSingleNode(errNodeList[i], "WCODE"));
                    gAlertMessage = gAlertMessage + "~" + getNodeText(selectSingleNode(errNodeList[i], "WDESC"));
                    gAlertMessage += "__";
                }
                debugs("Warining Message=", gAlertMessage);
            }
            if(gAlertMessage.indexOf("__LineBreak__") != -1){
                gAlertMessage = replaceAll(gAlertMessage, "__LineBreak__", "<br/>");  
            }
            gAlertMessage = gAlertMessage.substring(0,gAlertMessage.length-2);
        } else {
            return;
        }
        
        var alertWindow = document.getElementById("ifr_AlertWin");
        if(alertWindow==null){
            alertWindow = parent.document.getElementById("ifr_AlertWin");
            strTheme = parent.window.strTheme;
        }
        
        debugs("Openning Alert.jsp with ", "MSG_TYPE="+type.toUpperCase()+"&MESSAGE=''&THEME="+strTheme+"&OVDSCRTYP="+tempScrType+"&OVDROUTINGTYP="+ovdRoutingType);
        alertWindow.src = encodeURI("Alert.jsp?MSG_TYPE="+type.toUpperCase()+"&MESSAGE="+msgChar+"&THEME="+strTheme+"&OVDSCRTYP="+tempScrType+"&OVDROUTINGTYP="+ovdRoutingType+"&ENTITY="+mainWin.entity);/* security fixes for WF */
        var alertWinObj = document.getElementById("Div_AlertWin");
        if(alertWinObj == null) {
            alertWinObj = parent.document.getElementById("Div_AlertWin");
        }	
//REDWOOD_CHANGES
    // setTimeout(function(){
//     if( parent.document.getElementById("scrollingDialog"))
//        parent.document.getElementById("scrollingDialog").open();
//        },0);
        alertWinObj.style.display = "block";
        alertWinObj.style.height = "100%";
        alertWinObj.style.width = "100%"; //For DIV
        alertWinObj.style.width = "100%";
         alertWinObj.style.top = "0px";
        alertWinObj.children[0].style.height = "100%"; //For IFRAME
        alertWinObj.children[0].style.width = "100%";
         alertWinObj.children[0].style.top = "0px";		  
//REDWOOD_CHANGES
    }
   
}

function showBranchAlerts(alertMsg, type) {
   var screenType = "WB";
   var rejectRequireFlag = "N";
   var autoOvdFlag = "N";
   var multiAuthReqd = "N"; //12.1_multi_auth
   if(typeof(mainWin) != "undefined"){
       if(mainWin.rejectRequireFlag != null && mainWin.rejectRequireFlag != "") { 
            if (mainWin.rejectRequireFlag == "Y")
                rejectRequireFlag = "Y";
            else
                rejectRequireFlag = "N";
       }
        if(mainWin.autoOvdFlag != null && mainWin.autoOvdFlag != "") { 
            if (mainWin.autoOvdFlag == "Y")
                autoOvdFlag = "Y";
            else
                autoOvdFlag = "N";
       }  
   }
    if(alertMsg != null && alertMsg != "") {
        var xmlDoc = loadXMLDoc(alertMsg);
        var elem = selectSingleNode(xmlDoc, "//FCUBS_ERROR_RESP");
        if(elem==null){
            elem = selectSingleNode(xmlDoc, "//FCUBS_WARNING_RESP");
        }
        if(elem != null) {
            gAlertMessage = "";
            var errNodeList = selectNodes(elem, "ERROR");
            if(errNodeList.length > 0) {
                for(var i = 0; i < errNodeList.length; ++i) {
                    gAlertMessage = gAlertMessage + getNodeText(selectSingleNode(errNodeList[i], "ECODE"));
                    gAlertMessage = gAlertMessage + "~" + getNodeText(selectSingleNode(errNodeList[i], "EDESC"));
                    gAlertMessage += "__";
                }
            } else{
                errNodeList = selectNodes(elem, "WARNING");
                for(var i = 0; i < errNodeList.length; ++i) {
                    gAlertMessage = gAlertMessage + getNodeText(selectSingleNode(errNodeList[i], "WCODE"));
                    gAlertMessage = gAlertMessage + "~" + getNodeText(selectSingleNode(errNodeList[i], "WDESC"));
                    gAlertMessage += "__";
                }
            }
            gAlertMessage = gAlertMessage.substring(0,gAlertMessage.length-2);
        } else {
            return;
        }
        var alertWindow = document.getElementById("ifr_AlertWin");
        if(alertWindow==null){
            alertWindow = parent.document.getElementById("ifr_AlertWin");
            strTheme = parent.window.strTheme;
        }
		
		
         //12.1_multi_auth starts
		// 12.5_Financial_Inclusion_changes start
		try {
		if(dataObj.multiAuth == "Y")
        multiAuthReqd = 'Y' ;
		 } catch(e) {
		 }
		 //12.5_Financial_Inclusion_changes end
        //alertWindow.src = encodeURI("Alert.jsp?MSG_TYPE="+type.toUpperCase()+"&MESSAGE="+msgChar+"&THEME="+strTheme+"&SCREENTYPE="+screenType+"&REJECTREQUIRED="+rejectRequireFlag+"&AUTOOVERRIDE="+autoOvdFlag);	//FCUBS11.1 WB Changes	 //fc11.1wb changes /* security fixes for WF */
        alertWindow.src = encodeURI("Alert.jsp?MSG_TYPE="+type.toUpperCase()+"&MESSAGE="+msgChar+"&THEME="+strTheme+"&SCREENTYPE="+screenType+"&REJECTREQUIRED="+rejectRequireFlag+"&AUTOOVERRIDE="+autoOvdFlag  + "&MULTIAUTH=" +  multiAuthReqd );	//FCUBS11.1 WB Changes	 //fc11.1wb changes /* security fixes for WF */
        //12.1_multi_auth  ends
        var alertWinObj = document.getElementById("Div_AlertWin");
        if(alertWinObj == null) {
            alertWinObj = parent.document.getElementById("Div_AlertWin");
        }
        alertWinObj.style.display = "block";
    }
   
}

//FCUBS11.1 CROSSBROWSER Changes ends here

function resize_iframe() {
    var iframeObj = parent.document.getElementById("ifr_AlertWin");
    iframeObj.style.height = document.getElementById("DIVif1").offsetHeight + "px" ;
    iframeObj.style.width = document.getElementById("wndtitle").offsetWidth+"px" ;//21845944 //REDWOOD_CHANGES
	document.getElementById("wndwidth").style.width = (document.getElementById("wndtitle").offsetWidth - 10)+"px" ;//alert related changes //REDWOOD_CHANGES
  //  document.getElementById("wndtitle").style.width = document.getElementById("wndwidth").offsetWidth + "px"; //21845944
   // iframeObj.title = getInnerText(document.getElementById("DIVif1").getElementsByTagName("H1")[0]); //REDWOOD_CHANGES
    var alertWinObj = parent.document.getElementById("Div_AlertWin");
    if (parent.location.pathname.indexOf("TxnBranch.jsp") != -1){
        resize_txnBrn(alertWinObj);
        parent.mask();
        return;
    } else if(parent.location.pathname.indexOf("ExtEditor.jsp") != -1) {
        resize_txnBrn(alertWinObj);
        parent.mask();
        return;			
//REDWOOD_CHANGES
    }/*else if(parent.location.pathname.indexOf("LocalAuth.jsp") != -1 || parent.location.pathname.indexOf("RemoteAuth.jsp") != -1){//Fix for 21471903
        resize_txnBrn(alertWinObj);
        parent.mask();
        return;
    }*/		   
//REDWOOD_CHANGES
    //fix for bug num 16982344 start 
    var scrWidth = document.getElementById("wndwidth").offsetWidth;
    //fix for bug num 16982344 end 
    try {//HTML5 Changes Start
        if(typeof(accessKeyDetail) != "undefined"){
            //document.getElementById("DIVif1").style.height = mainWin.y - 4 + "px" ;
            if(document.getElementById("DIVif1").offsetHeight > (mainWin.y - mainWin.document.getElementById("masthead").offsetHeight-mainWin.document.getElementById("taskbar").offsetHeight)){
                iframeObj.style.height = mainWin.y - mainWin.document.getElementById("masthead").offsetHeight -mainWin.document.getElementById("taskbar").offsetHeight - 4 + "px" ;
            }else{
                iframeObj.style.height = document.getElementById("DIVif1").offsetHeight + "px" ;
            }
            document.getElementById("wndwidth").style.height = iframeObj.offsetHeight - document.getElementById("wndtitle").offsetHeight - document.getElementById("WNDfooter").offsetHeight + "px";
            document.getElementById("WNDfooter").style.width = document.getElementById("wndwidth").offsetWidth + "px";
            alertWinObj.style.top = parent.document.getElementById("masthead").offsetHeight - 3 + "px";
           //1202 nls
           // alertWinObj.style.left = "4px";
           //fix for bug num 16982344 start 
           // setHorizontalPosition(alertWinObj, false, 4);
            setHorizontalPosition(alertWinObj, false, (mainWin.x - (scrWidth + 2)));
            //  alertWinObj.style.left=  mainWin.x - (scrWidth + 12) + "px";
            //fix for bug num 16982344 end 
         
        } else{
            var x,y;
            if (parent.self.innerHeight) {
                x = parent.self.innerWidth;
                y = parent.self.innerHeight;
            }else if (parent.document.documentElement && parent.document.documentElement.clientHeight){
                x = parent.document.documentElement.clientWidth;
                y = parent.document.documentElement.clientHeight;
            }else if (parent.document.body) {
                x = parent.document.body.clientWidth;
                y = parent.document.body.clientHeight;
            }
            //1202 nls
            //alertWinObj.style.left = x/2 - ((alertWinObj.offsetWidth)/2) +"px";
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                var orientation = window.orientation;
                if (orientation != 0) {
                    x=1000;
                } else {
                    x=768;
                }
                setHorizontalPosition(alertWinObj, false, (x/2 - 280));
            } else {
                setHorizontalPosition(alertWinObj, false, (x/2 - ((alertWinObj.offsetWidth)/2)));
            }
            alertWinObj.style.top = y/2 - ((alertWinObj.offsetHeight)/2) +"px";        }//HTML5 Changes End
    } catch(e) {
        var x,y;
        if (parent.self.innerHeight) {
            x = parent.self.innerWidth;
            y = parent.self.innerHeight;
        }else if (parent.document.documentElement && parent.document.documentElement.clientHeight){
            x = parent.document.documentElement.clientWidth;
            y = parent.document.documentElement.clientHeight;
        }else if (parent.document.body) {
            x = parent.document.body.clientWidth;
            y = parent.document.body.clientHeight;
        }
        //1202 nls
        //alertWinObj.style.left = x/2 - ((alertWinObj.offsetWidth)/2) +"px";
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            var orientation = window.orientation;
            if (orientation != 0) {
                x=1000;
            } else {
                x=768;
            }
            setHorizontalPosition(alertWinObj, false, (x/2 - 280));
        } else {
            setHorizontalPosition(alertWinObj, false, (x/2 - ((alertWinObj.offsetWidth)/2)));
        }
        alertWinObj.style.top = y/2 - ((alertWinObj.offsetHeight)/2) +"px";
    }//HTML5 Changes End
    if(location.pathname.indexOf("SMCHGPWD.jsp") != -1){
          var txtField = document.getElementById("DIVif1").getElementsByTagName("INPUT");
          txtField[1].focus();
    }
    else {
        var btns = document.getElementById("DIVif1").getElementsByTagName("INPUT");
//REDWOOD_CHANGES
//        //Fix for Bug No :18629260 starts
//        if(!parent.slipopened && alertType != "S"){
//            if (alertType != "I" && alertType != "E"){
//                btns[btns.length-2].focus();
//            } 
//             	else{
//				btns[btns.length-1].focus(); //Fix for 18902676
//			}		
//            }else{
//                btns[btns.length-1].focus();
//            }					 
//REDWOOD_CHANGES
        //Fix for Bug No :18629260 ends
    }
        parent.slipopened=false;
}


function resize_txnBrn(alertWinObj){ 
    //1202 nls
    //alertWinObj.style.left = "4px";
    setHorizontalPosition(alertWinObj, false, 4);
    alertWinObj.style.top = "0px";
    parentDivHeight = parent.parent.document.getElementById("ChildWin").clientHeight;
    parentHeight = parent.parent.document.getElementById("ChildWin").children[0].clientHeight;
    parentDivWidth = parent.parent.document.getElementById("ChildWin").clientWidth;
    parentWidth = parent.parent.document.getElementById("ChildWin").children[0].clientWidth;
    if(parent.parent.document.getElementById("ChildWin")){
        parent.parent.document.getElementById("ChildWin").style.height = parent.document.getElementById("ifr_AlertWin").offsetHeight + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.height = parent.document.getElementById("ifr_AlertWin").offsetHeight + "px";
        parent.parent.document.getElementById("ChildWin").style.width = parent.document.getElementById("ifr_AlertWin").offsetWidth + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.width = parent.document.getElementById("ifr_AlertWin").offsetWidth + "px";
    }
    document.getElementById("wndwidth").style.width = parent.document.getElementById("ifr_AlertWin").offsetWidth + "px";
    document.getElementById("wndtitle").style.width = document.getElementById("wndwidth").offsetWidth + "px";    
    var btns = document.getElementById("DIVif1").getElementsByTagName("INPUT");
    if (alertType != "I" && alertType != "E")
        btns[btns.length-2].focus();
    else
        btns[btns.length-1].focus();
}

function startDrag(e) { /* Zooming Changes */
    var evt = window.event || e;
    var winObj = parent.document.getElementById("Div_AlertWin");
    winObj.style.cursor = "default";
    var x = evt.clientX;
    var y = evt.clientY;
    var initx = winObj.offsetLeft;
    var inity = winObj.offsetTop;
     if(typeof (mainWin) != "undefined"){
        scrnWidth = mainWin.document.getElementById("vtab").offsetWidth + mainWin.document.getElementById("dashboard").offsetWidth - 4 ;
        scrnHeight =  mainWin.document.getElementById("masthead").offsetHeight + mainWin.document.getElementById("dashboard").offsetHeight + 
                  mainWin.document.getElementById("taskbar").offsetHeight - 4;
     }
    document.onmousemove=function(e) {
        var winObj = parent.document.getElementById("Div_AlertWin");
        var evt = window.event || e;
        var ex = evt.clientX;
        var ey = evt.clientY;
        var dx = ex - x;
        var dy = ey - y;
        var ypos = inity + dy;
        var tBarHgt = 0;
        if (parent.document.getElementById("WNDtitlebar") != null) {
            //tBarHgt = parent.document.getElementById("WNDtitlebar").offsetHeight * -1;
			tBarHgt = parent.document.getElementById("WNDtitlebar").offsetHeight; // Fix for 19487262
        } else if (typeof (mainWin) != "undefined") {
            tBarHgt = parent.document.getElementById("masthead").offsetHeight;
        }
         if((ypos+ parseInt(winObj.offsetHeight))  > parseInt(scrnHeight)){
         inity =  scrnHeight -  (winObj.offsetHeight + 4);
         winObj.style.top = inity;
        }
        else if (ypos > (tBarHgt + 4)) {
            //divObj.style.left = initx + dx + "px";
            winObj.style.top = inity + dy + "px";
            //initx = initx + dx;
            inity = ypos;
        } 
        else {
            winObj.style.top = (tBarHgt + 4) + "px";
            inity = tBarHgt + 4;
        }
        if((parseInt(initx) + parseInt(dx) + parseInt(winObj.offsetWidth))  > scrnWidth){
         initx =  scrnWidth - (winObj.offsetWidth +4);
         winObj.style.left = initx + 'px';
        }
        else{
        winObj.style.left = initx + dx + "px";
        initx = initx + dx;
        }
        };

    document.onmouseup=function(event){
        winObj.style.border = "none";
        winObj.style.cusor = "default";
        document.onmousemove=null;
        document.onmouseup=null;
    }
}
//REDWOOD_CHANGES
function closeAlerts_temp(event) {
    var alertType = document.getElementById("alertBody").children[0].contentWindow.alertType;
    if(alertType == "O" && document.getElementById("REMARKS"))
        parent.override_remarks = document.getElementById("REMARKS").value;
//    window.frameElement.src = "";
//    window.frameElement.height = 0;
//    window.frameElement.width = 0;
    if (parent.location.pathname.indexOf("TxnBranch.jsp") != -1){
        parent.parent.document.getElementById("ChildWin").style.height = parentDivHeight + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.height = parentHeight + "px";
        parent.parent.document.getElementById("ChildWin").style.width = parentDivWidth + "px";    
        parent.parent.document.getElementById("ChildWin").children[0].style.width = parentWidth + "px";
    } else if(parent.location.pathname.indexOf("ExtEditor.jsp") != -1) {
        parent.parent.document.getElementById("ChildWin").style.height = parentDivHeight + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.height = parentHeight + "px";
        parent.parent.document.getElementById("ChildWin").style.width = parentDivWidth + "px";    
        parent.parent.document.getElementById("ChildWin").children[0].style.width = parentWidth + "px";
    }
    parent.document.getElementById("Div_AlertWin").children[0].src = "";
    parent.document.getElementById("Div_AlertWin").style.display = "none";
    //eval("parent."+parent.document.getElementById("Div_AlertWin").getAttribute("onclose"));
    var fnEval = new Function("event","parent."+parent.document.getElementById("Div_AlertWin").getAttribute("onclose"));  
    fnEval(event);
    parent.document.getElementById("scrollingDialog").close();
//    parent.document.getElementById('dialogTitleId').innerHTML =   "";
//    parent.document.getElementById('alertFooter').innerHTML = "";
//     parent.document.getElementById('alertBody').children[0].contentWindow = "";
    if (parent.focusReqd) {
        try{
            if(parent.document.getElementById('BTN_EXIT_IMG'))
                parent.document.getElementById('BTN_EXIT_IMG').focus();
            else if (parent.document.getElementById('BTN_CANCEL'))
                parent.document.getElementById('BTN_CANCEL').focus();
            else 
                parent.document.getElementById('WNDbuttons').focus();
        }catch(e){
            if(parent.document.getElementById('BTN_EXIT'))
                parent.document.getElementById('BTN_EXIT').focus();
            else
                if(parent.document.getElementById('fastpath'))
                    //9NT1606_12_4_RETRO_12_3_26780546 starts
					/* 14.1 Fortify fix */
                    parent.document.getElementById('fastpath').focus();
                    //9NT1606_12_4_RETRO_12_3_26780546 ends
        }
		try{ if(typeof(parent.seqNo)!= "undefined" )  parent.fnFocus(); } catch(e){}//fix for 19438154 
    } else {
        if (parent.focusField != null) {
            parent.focusField.focus();
            parent.focusReqd = true;
            parent.focusField = null;
        }
    }  
	//Changes made for bug id 14810721 child bug to 14593312 starts
			try {
				parent.fnEventsHandler('fnPostFocus');
			} catch (e) {
				try {
				parent.fnPostFocus();
				} catch (e1) {
				}
			}//Changes made for bug id 14810721 child bug to 14593312 ends
    //if(parent.parent.document.getElementById("masker").style.height =="0px"){  
    /*if((parent.parent.document.getElementById("masker").style.height =="0px" || parent.parent.document.getElementById("masker").style.height =="")  && parent.document.getElementById("masker").style.height =="0px") {
        if(mainWin.document.getElementById("TlBarOper"))
            mainWin.showToolbar(parent.functionId, '', '');
    }*/
}

function closeAlerts(event) {
    if(alertType == "O" && document.getElementById("REMARKS"))
        parent.override_remarks = document.getElementById("REMARKS").value;
    window.frameElement.src = "";
    window.frameElement.height = 0;
    window.frameElement.width = 0;
    if (parent.location.pathname.indexOf("TxnBranch.jsp") != -1){
        parent.parent.document.getElementById("ChildWin").style.height = parentDivHeight + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.height = parentHeight + "px";
        parent.parent.document.getElementById("ChildWin").style.width = parentDivWidth + "px";    
        parent.parent.document.getElementById("ChildWin").children[0].style.width = parentWidth + "px";
    } else if(parent.location.pathname.indexOf("ExtEditor.jsp") != -1) {
        parent.parent.document.getElementById("ChildWin").style.height = parentDivHeight + "px";
        parent.parent.document.getElementById("ChildWin").children[0].style.height = parentHeight + "px";
        parent.parent.document.getElementById("ChildWin").style.width = parentDivWidth + "px";    
        parent.parent.document.getElementById("ChildWin").children[0].style.width = parentWidth + "px";
    }
    parent.document.getElementById("Div_AlertWin").children[0].src = "";
    parent.document.getElementById("Div_AlertWin").style.display = "none";
    //eval("parent."+parent.document.getElementById("Div_AlertWin").getAttribute("onclose"));
    var fnEval = new Function("event","parent."+parent.document.getElementById("Div_AlertWin").getAttribute("onclose"));  
    fnEval(event);
    if (parent.focusReqd) {
        try{
            if(parent.document.getElementById('BTN_EXIT_IMG'))
                parent.document.getElementById('BTN_EXIT_IMG').focus();
            else if (parent.document.getElementById('BTN_CANCEL'))
                parent.document.getElementById('BTN_CANCEL').focus();
            else 
                parent.document.getElementById('WNDbuttons').focus();
        }catch(e){
            if(parent.document.getElementById('BTN_EXIT'))
                parent.document.getElementById('BTN_EXIT').focus();
            else
                if(parent.document.getElementById('fastpath'))
                    parent.document.getElementById('fastpath').focus();
        }
		try{ if(typeof(parent.seqNo)!= "undefined" )  parent.fnFocus(); } catch(e){}//fix for 19438154 
    } else {
        if (parent.focusField != null) {
            parent.focusField.focus();
            parent.focusReqd = true;
            parent.focusField = null;
        }
    }  
	//Changes made for bug id 14810721 child bug to 14593312 starts
			try {
				parent.fnEventsHandler('fnPostFocus');
			} catch (e) {
				try {
				parent.fnPostFocus();
				} catch (e1) {
				}
			}//Changes made for bug id 14810721 child bug to 14593312 ends
    //if(parent.parent.document.getElementById("masker").style.height =="0px"){  
    /*if((parent.parent.document.getElementById("masker").style.height =="0px" || parent.parent.document.getElementById("masker").style.height =="")  && parent.document.getElementById("masker").style.height =="0px") {
        if(mainWin.document.getElementById("TlBarOper"))
            mainWin.showToolbar(parent.functionId, '', '');
    }*/
}  
//REDWOOD_CHANGES
function cancelAlerts(event) {

    window.frameElement.src = "";
    window.frameElement.height = 0;
    window.frameElement.width = 0;
    parent.document.getElementById("Div_AlertWin").style.display = "none";
    //eval("parent."+parent.document.getElementById("Div_AlertWin").getAttribute("oncancel"));
    var fnEval = new Function("event","parent."+parent.document.getElementById("Div_AlertWin").getAttribute("oncancel"));  
    fnEval(event);
    if(parent.document.getElementById('BTN_EXIT_IMG')){
        parent.document.getElementById('BTN_EXIT_IMG').focus();
    }else if(parent.document.getElementById('fastpath')){
        parent.document.getElementById('fastpath').focus();
    }
    /*if(parent.parent.document.getElementById("masker").style.height =="0px"){    
        if(mainWin.document.getElementById("TlBarOper"))
            mainWin.showToolbar(parent.functionId, '', '');
    }*/
}


function openLogin(event) {
    parent.alertAction="DISPLOGIN";
    //eval("parent."+parent.document.getElementById("Div_AlertWin").getAttribute("onclose"));
    var fnEval = new Function("event","parent." + parent.document.getElementById("Div_AlertWin").getAttribute("onclose"));  
    fnEval(event);
}

function exitApplication(event) {
    parent.alertAction="EXITAPP";
    //eval("parent."+parent.document.getElementById("Div_AlertWin").getAttribute("onclose"));
    var fnEval = new Function("event","parent." + parent.document.getElementById("Div_AlertWin").getAttribute("onclose"));  
    fnEval(event);
}
//FCUBS11.1 CROSSBROWSER Changes starts here
function handleLocalAuth(){
   parent.mask();
   window.frameElement.src = "";
   window.frameElement.height = 0;
   window.frameElement.width = 0;
   parent.document.getElementById("Div_AlertWin").children[0].src = "";
   parent.document.getElementById("Div_AlertWin").style.display = "none";
   parent.handleBrnLocalAuth();
   parent.alertAction="UNMASK";
   /*if(parent.parent.document.getElementById("masker").style.height =="0px"){    
        if(mainWin.document.getElementById("TlBarOper"))
            mainWin.showToolbar(parent.functionId, '', '');
    }*/
}
//FCUBS11.1 WB Changes starts here
function handleRejectTransaction(){
    parent.unmask(); 
    window.frameElement.src = "";
    window.frameElement.height = 0;
    window.frameElement.width = 0;
    parent.document.getElementById("Div_AlertWin").children[0].src = "";
    parent.document.getElementById("Div_AlertWin").style.display = "none";
    parent.handleBrnRejectTransaction();
    parent.alertAction="UNMASK";
    /*if(parent.parent.document.getElementById("masker").style.height =="0px"){    
        if(mainWin.document.getElementById("TlBarOper"))
            mainWin.showToolbar(parent.functionId, '', '');
    }*/
}
//FCUBS11.1 WB Changes ends here

//FCUBS11.1 CROSSBROWSER Changes ends here

function showErrorAlerts(errcode,alertType,replaceString){
    var alertXML = fnBuildAlertXML(errcode,'E','',replaceString);
    mask();
    if(typeof(alertType) != 'undefined')
        showAlerts(alertXML, alertType);
    else
        showAlerts(alertXML, 'I');
	
	alertAction = "UNMASK";
}

function fnBuildAlertHTML(alertMsgTitle, imageClass) {	 
//REDWOOD_CHANGES
    //var tableBody = document.getElementById("ERRTBL");
    var messageArr = parent.gAlertMessage.split("__");
    
    if(alertType== 'E' || alertType== 'O'){
        var code = lblErrCode;
        if(alertType== 'O'){
            code = lblOvdCode;
        }
        var header = [{"headerText" : code, "field" : "code"},{"headerText" :lblDescription, "field" : "description"}];
        alertHeaders(header);
    }else {
        var header = [{"headerText" : lblDescription, "field" : "description"}];
        alertHeaders(header);
    }
    
    if (alertType == "S") {
        //mainWin.mask();//session expiry change
        alertMsgTitle = mainWin.getItemDesc("LBL_ALERT_MSG_S");
        /*Fix for Bug No :16481538 starts*/
        if (ssoReq != 'Y'){ /*Fix for 18872800*/
                setInnerText(document.getElementById("BTN_LOGIN"), mainWin.getItemDesc("LBL_CURR_LOGIN"));
        }else{ /*9NT1606_12_2_RETRO_12_0_3_23655319 Starts*/
			document.getElementById("BTN_LOGIN").className = "hidden";
		}
		/*9NT1606_12_2_RETRO_12_0_3_23655319 Ends*/
		/*Fix for Bug No :16481538 ends*/
        //setInnerText(document.getElementById("BTN_EXIT"), mainWin.getItemDesc("LBL_EXIT"));
		/* Fix for Bug 16099420 - start */
        setInnerText(document.getElementById("wndtitle").getElementsByTagName("H1")[0], mainWin.getItemDesc("LBL_ALERT_MSG_S"));
       document.getElementById("BTN_LOGIN").label = mainWin.getItemDesc("LBL_CURR_LOGIN");
        document.getElementById("BTN_EXIT").label = mainWin.getItemDesc("LBL_EXIT");
        /* Fix for Bug 16099420 - end */
    }
    for (var i=0;i<messageArr.length;i++) {
        //var liElem = document.createElement("li");
      //  liElem.className="oj-divider-bottom oj-sm-padding-2x-top oj-sm-padding-2x-bottom";
        var liData = messageArr[i].split("~")[1];
        var obj = {"description": liData};
        if (alertType == "E" || alertType == "O") {
            liData = messageArr[i].split("~")[0]+"     "+ messageArr[i].split("~")[1];
            obj = {"code":messageArr[i].split("~")[0],"description": messageArr[i].split("~")[1]};
        }
        //liElem.innerText = liData;
        //tableBody.appendChild(liElem);
        alerMessages.push(obj);
    }
}
function fnBuildAlertHTML_Old(alertMsgTitle, imageClass) {		 

//REDWOOD_CHANGES
    var tableBody = document.getElementById("ERRTBL").tBodies[0];
    var messageArr = parent.gAlertMessage.split("__");
    if (alertType == "S") {
        //mainWin.mask();//session expiry change
        alertMsgTitle = mainWin.getItemDesc("LBL_ALERT_MSG_S");
        /*Fix for Bug No :16481538 starts*/
        if (ssoReq != 'Y'){ /*Fix for 18872800*/
                setInnerText(document.getElementById("BTN_LOGIN"), mainWin.getItemDesc("LBL_CURR_LOGIN"));
        }else{ /*9NT1606_12_2_RETRO_12_0_3_23655319 Starts*/
			document.getElementById("BTN_LOGIN").className = "hidden";
		}
		/*9NT1606_12_2_RETRO_12_0_3_23655319 Ends*/
		/*Fix for Bug No :16481538 ends*/
        setInnerText(document.getElementById("BTN_EXIT"), mainWin.getItemDesc("LBL_EXIT"));
		/* Fix for Bug 16099420 - start */
        setInnerText(document.getElementById("wndtitle").getElementsByTagName("H1")[0], mainWin.getItemDesc("LBL_ALERT_MSG_S"));
       // document.getElementById("ERRTBL").tHead.childNodes[0].childNodes[0].innerHTML = "<SPAN class='SPNtbltwoH'>"+mainWin.getItemDesc("LBL_ALERT_MSG_S")+"</SPAN>";
       //document.getElementById("ERRTBL").tHead.getElementsByTagName("TH")[0].innerHTML = "<SPAN tabindex=\"0\"  class='SPNtbltwoH'>"+mainWin.getItemDesc("LBL_ALERT_MSG_S")+"</SPAN>"; /*Fix for 18872800*/
        document.getElementById("BTN_LOGIN").value = mainWin.getItemDesc("LBL_CURR_LOGIN");
        document.getElementById("BTN_EXIT").value = mainWin.getItemDesc("LBL_EXIT");
        /* Fix for Bug 16099420 - end */
    }
    for (var i=0;i<messageArr.length;i++) {
        var rowElem = document.createElement("TR");
        var cell1 = document.createElement("TD");
        cell1.setAttribute("scope", "row");
        var cell1Data = "<em class='BTNicon' title='"+alertMsgTitle+"'><SPAN class='"+imageClass+"' tabIndex=0 title='"+alertMsgTitle+"'></SPAN></em><SPAN tabindex=\"0\"  class='SPNtbltwoC' title='"+messageArr[i].split("~")[1]+"'>"+messageArr[i].split("~")[1]+"</SPAN>";
        cell1.innerHTML = cell1Data;
        rowElem.appendChild(cell1);
        if (alertType == "E" || alertType == "O") {
            var cell2 = document.createElement("TD");
            var cell2Data = "<SPAN tabindex=\"0\"  class='SPNtbltwoC'  title='"+messageArr[i].split("~")[0]+"'>"+messageArr[i].split("~")[0]+"</SPAN>";
            cell2.innerHTML = cell2Data;
            rowElem.appendChild(cell2);
        }
        tableBody.appendChild(rowElem);
    }
    //Changes for error note start
//	if(alertType == "E" && (typeof(parent.fcjResponseDOM) != "undefined") && (parent.fcjResponseDOM != null)  && (typeof(parent.isResponseProcessed) != "undefined") && (!parent.isResponseProcessed) ){
//	var seqListNode = selectSingleNode(parent.fcjResponseDOM, "//SEQLIST");
//		if((typeof(seqListNode) != "undefined") && (seqListNode != null)){
//        	var seqListArr = getNodeText(seqListNode).split("~");
//                if(typeof(seqListArr[2])!='undefined' &&  seqListArr[2] != null && seqListArr[2]!=''){//fix for 21126264
//                        seqListVal = seqListArr[0]+"L~"+seqListArr[1]+"S~"+seqListArr[2]+"A";
//			var xmlMenuDOM = loadXMLDoc(mainWin.gXmlMenu);
//			var xmlNode = selectNodes(xmlMenuDOM, "//*/LEAF[contains(@FNID,'SMSUSTAT')]");
//			if(xmlNode.length > 0){
//				var lblElem = document.createElement("LABEL");
//				lblElem.setAttribute("class", "SPNtbltwoC");
//				lblElem.innerHTML = mainWin.getItemDesc("LBL_ERROR_NOTE1");
//				var hyperlink = 	document.createElement("A")
//				hyperlink.setAttribute("class", "SPNtbltwoC");
//				hyperlink.setAttribute("href", "#");
//				hyperlink.innerHTML = mainWin.getItemDesc("LBL_ERROR_NOTE3");
//				addEvent(hyperlink,"onclick", "mainWin.dispHref1(\'SMSUSTAT\',\'" + seqListVal+ "\')");
//				document.getElementById("noteTD").innerHTML = lblElem.outerHTML + hyperlink.outerHTML;
//			}
//			else{
//				var lblElem = document.createElement("LABEL");
//				lblElem.setAttribute("class", "SPNtbltwoC");
//				lblElem.innerHTML = mainWin.getItemDesc("LBL_ERROR_NOTE2") + seqListVal;
//				document.getElementById("noteTD").innerHTML = lblElem.outerHTML ;
//			}
//                }
//		}
//	}//Changes for error note end
}

function fnHandleAlertBtn(e){
    e = window.event || e;
    var srcElement = getEventSourceElement(e);
    var prevSibling = getPreviousSibling(srcElement);
    var nextSibling = getNextSibling(srcElement);
    var remarks = document.getElementById("REMARKS");
    var btns = document.getElementById("DIVif1").getElementsByTagName("INPUT");
    if(e.shiftKey == true && e.keyCode == 9){
           if(btns.length ==4){
              if(srcElement.id =="BTN_LOCALAUTHACCEPT"){
              document.getElementById("BTN_CANCEL").focus();
              return false;
              }
            }
            if(prevSibling && prevSibling.tagName != undefined){
                if(prevSibling.tagName.toUpperCase() == "INPUT")
                    prevSibling.focus();
            }else if(remarks && remarks.getAttribute("TYPE") != 'hidden'){
                remarks.focus();
            }else if(nextSibling && nextSibling.tagName != undefined){
                if(nextSibling.tagName.toUpperCase() == "INPUT")
                    nextSibling.focus();
        }
        
        return false;
    }
    if(e.keyCode == 9){         
           if(btns.length ==4){
              if(srcElement.id =="BTN_CANCEL"){
              document.getElementById("BTN_LOCALAUTHACCEPT").focus();
              return false;
              }
            }
            if(nextSibling && nextSibling.tagName != undefined){
                if(nextSibling.tagName.toUpperCase() == "INPUT")
                    nextSibling.focus();
            }/*else if(remarks && remarks.getAttribute("TYPE") != 'hidden'){ Fix for 17414210 
                remarks.focus();
            }*//*Fix for bug 	17414804 start
			else if(prevSibling && prevSibling.tagName != undefined){
                if(prevSibling.tagName.toUpperCase() == "INPUT")
                    prevSibling.focus();
        }*/
		else if((srcElement.tagName="INPUT") || (srcElement.tagName="BUTTON"))
        { 
		  //Fix for 21769239 start
		  document.getElementsByTagName("TABLE")[0].getElementsByTagName("TD")[0].getElementsByTagName("SPAN")[0].tabIndex = 0;
          document.getElementsByTagName("TABLE")[0].getElementsByTagName("TD")[0].getElementsByTagName("SPAN")[0].focus();
          //Fix for 21769239 end
        }
		//Fix for 	17414804 end
        return false;
    }
}

function replaceAll(Source,stringToFind,stringToReplace){
  var temp = Source;
  var index = temp.indexOf(stringToFind);
  while(index != -1){
      temp = temp.replace(stringToFind,stringToReplace);
      index = temp.indexOf(stringToFind);
  }
  return temp;
}

function fnSyncAlertTableWidth(){
    var headerTable = document.getElementById("ERRTBLHeader");
    var dataTable = document.getElementById("ERRTBL");
    headerTable.parentNode.style.width = dataTable.parentNode.clientWidth + "px";
    headerTable.parentNode.parentNode.style.width = dataTable.parentNode.offsetWidth + "px";
    if(dataTable.tBodies[0].rows[0].cells.length==2){/*HTML5 Changes Start*/
        dataTable.tBodies[0].rows[0].cells[0].width='84.5%';
        dataTable.tBodies[0].rows[0].cells[1].width='15.5%';
    }
    var iframeObj = parent.document.getElementById("ifr_AlertWin");
    iframeObj.style.height = document.getElementById("DIVif1").offsetHeight + "px" ;
}/*HTML5 Changes End*/

function setParentWinActive(evnt) {
    if (parent.seqNo && mainWin.document.getElementById(parent.seqNo)) {  //REDWOOD_CHANGES
        mainWin.document.getElementById(parent.seqNo).style.zIndex = 11;
    } else if (parent.parent.seqNo &&  mainWin.document.getElementById(parent.parent.seqNo)) {//REDWOOD_CHANGES
        mainWin.document.getElementById(parent.parent.seqNo).style.zIndex = 11;
    }
}