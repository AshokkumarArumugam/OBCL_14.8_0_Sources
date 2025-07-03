/*----------------------------------------------------------------------------------------------------
**
** File Name    : BROWSER_NonIE.js
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

Copyright © 2009-2021  by Oracle Financial Services Software Limited..

  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 07-Oct-2016
  **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                             to user as alert and on click of Ok button on alert window, screen will be 
                             unmasked and user can try the action again.
  **  Retro Source         : 9NT1606_12_0_3_INTERNAL
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
  
  **  Modified By          : Ramki
  **  Modified On          : 31-Mar-2021
  **  Modified Reason      : Screen launching (STDCUSAC) using Oracle Digital Assistant FCUBS_ChatBot Skill now working
  **  Search String        : 32470651
********************************************************************************************
*/

var dbDataDOM = document.implementation.createDocument("","",null);

function createHTTPActiveXObject() {
    if (window.XMLHttpRequest)
        return new XMLHttpRequest();
    else 
        return null;
}

function selectSingleNode(xmlDoc, strXMLPath) {
    var oEvaluator = new XPathEvaluator();
    var oResult = oEvaluator.evaluate(strXMLPath, xmlDoc, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null); 
    return oResult.singleNodeValue;    
}

function selectNodes(xmlDoc, strXMLPath) {
    var oEvaluator = new XPathEvaluator();
    var oResult = oEvaluator.evaluate(strXMLPath, xmlDoc, nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null); 
    var aNodes = new Array;
    if (oResult != null) {
        var oElement = oResult.iterateNext();
        while(oElement) {
            aNodes.push(oElement);
            oElement = oResult.iterateNext();
        }
    }
    return aNodes;
}

function loadXMLDoc(txt) {

    
    if(txt == "") 
	{
        return null;
	} 
	/* added the code for bug id :14755149 starts */
	else if(getBrowser().indexOf("OPERA") != -1) {//ie11 changes
	if(txt.indexOf("<?xml") != -1)
	{
     var startpos = txt.indexOf("<?xml");
     var endpos = txt.indexOf("?>");
	 var finaltxt = txt.substring(0,startpos) + txt.substring(endpos+2, txt.length);
	 var xmlDoc;
     parser=new DOMParser();
     xmlDoc=parser.parseFromString(finaltxt,"text/xml");
     return xmlDoc;
	}
	else
	{
	var xmlDoc;
    parser=new DOMParser();
     xmlDoc=parser.parseFromString(txt,"text/xml");
      return xmlDoc;
	}
	}
	/* added the code for bug id :14755149 ends */
	else {
	var xmlDoc;
        parser=new DOMParser();
        xmlDoc=parser.parseFromString(txt,"text/xml");
        return xmlDoc;
    }
}

function loadXMLFile(fname) {
    var xmlhttp = createHTTPActiveXObject();
	try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    xmlhttp.open("GET", fname, false);
    xmlhttp.send(null);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 starts
     catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 ends
    if (xmlhttp.status == 200 && selectSingleNode(xmlhttp.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(xmlhttp.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change start  
        mainWin.mask(); 
        mainWin.sessionTimeOut = true;
        mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
        return false;
   }//session expiry change end  
    var xmlDoc = loadXMLDoc(xmlhttp.responseText);
    return xmlDoc;
}

function loadIFrameContent(iFrameObj) {
    return iFrameObj.contentDocument;
}

function loadXSLFile(xslFilePath) {
    return loadXMLFile(xslFilePath);
}

function transform(xmlDoc, xslDoc, params) {
    var xslProc = new XSLTProcessor();
    xslProc.importStylesheet(xslDoc);
    if(params!=null){
    for(var i in params) {
        xslProc.setParameter(null, i, params[i]);
        }
    }
    var oResultDom = xslProc.transformToFragment(xmlDoc, document); 
    return oResultDom;
}
function fnDisableBrowserKey(e) {
    e.preventDefault();
}

function getCurrentStyle(currObj, styleName) {
    return document.defaultView.getComputedStyle(currObj,null).getPropertyValue(styleName);
}

function getXMLString(xmlDoc) {
    var serializer = new XMLSerializer();
    var xml = serializer.serializeToString(xmlDoc);
    return xml;
}

function getNodeText(textNode) {
    return textNode.textContent;
}
function setNodeText(textNode, text) {
    textNode.textContent = text;
}

function getOuterHTML(ele) {
    var tempDIV = document.createElement("DIV");
    tempDIV.appendChild(ele.cloneNode(false));
    var outerHTML = tempDIV.innerHTML;
    tempDIV = null;
    return outerHTML;
}

function setOuterHTML(ele, strHTML) {
    ele.parentNode.innerHTML = strHTML;
}

function getOuterHTML_TXADisp(ele) {
    var tempDIV = document.createElement("DIV");
    tempDIV.appendChild(ele.cloneNode(true));
    var outerHTML = tempDIV.innerHTML;
    tempDIV = null;
    return outerHTML;
}

function setOuterHTML_TXADisp(ele, strHTML) {
    var oldOuterHTML = getOuterHTML_TXADisp(ele);
    var oldInnerHTML = ele.parentNode.innerHTML;
    var oldOuterIndex = oldInnerHTML.indexOf(oldOuterHTML);
    ele.parentNode.innerHTML = oldInnerHTML.substring(0, oldOuterIndex) +  strHTML + oldInnerHTML.substring(oldOuterIndex + oldOuterHTML.length);
}

function getInnerText(ele) {
    return ele.textContent;
}

function setInnerText(ele, txt) {
    ele.textContent = txt;
}

function getPosition(pintRecNumber) {
    return Number(pintRecNumber);
}

function getBrowser() {//12.0.4 changes//ie11 changes starts
    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isFirefox = typeof InstallTrigger !== 'undefined';   
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var isChrome = !!window.chrome && !isOpera;              
   // var ua = (navigator.userAgent).toUpperCase();
    var browser = "SAFARI";
    if (isFirefox) {
        browser = "FIREFOX";
    }
    else if (isOpera) {
        browser = "OPERA";
    }
    else if (isChrome) {
        browser = "CHROME";
    }
    else if (isSafari) {
        browser = "SAFARI";
    }
    return browser;

}//ie11 changes ends

function fireHTMLEvent(object, eventName, event) {//changed starts
    var eventHandlerStr = object.getAttribute(eventName);
    if(eventHandlerStr) {
        eventHandlerStr = eventHandlerStr.replace(new RegExp("this", "g"), "object");
        //Fix for  17162382 start
		if(eventHandlerStr.indexOf("event") != -1){
			var fnEval = new Function("object, event",eventHandlerStr);
			fnEval(object, event);
        }
        else
        {
			var fnEval = new Function("object",eventHandlerStr);
			fnEval(object); 
        }
		//Fix for  17162382 end
	}
    return true; //Fix for 20059188 //Fix for 20771102
}//changed ends
//REDWOOD_CHANGES
//function getEventSourceElement(e) {
//    
//    if((getBrowser().indexOf("SAFARI") != -1) || (getBrowser().indexOf("CHROME") != -1)) {//ie11 changes
//		var currentTarget = e.currentTarget;
//		var currentTargetTagName = currentTarget.tagName.toUpperCase();
//		if(currentTargetTagName == "BODY" || currentTargetTagName == "TABLE" || currentTargetTagName == "TR" || currentTargetTagName == "LI" || currentTargetTagName == "DIV")//HTML5 Changes 6/OCT/2016
//	        return e.target;
//		else
//			return currentTarget;
//    } else {
//        return e.target;
//    }
//}	 
//REDWOOD_CHANGES
function getEventSourceElement(e) {
		var currentTarget = e.currentTarget;
		var currentTargetTagName = currentTarget.tagName.toUpperCase();
		if(currentTargetTagName == "BODY" || currentTargetTagName == "TABLE" || currentTargetTagName == "TR" || currentTargetTagName == "LI" || currentTargetTagName == "DIV")//HTML5 Changes 6/OCT/2016
	        return e.target;
		else
			return currentTarget;
}
//REDWOOD_CHANGES
function getCloneDocElement(docEle) {
    if((getBrowser().indexOf("SAFARI") != -1) || (getBrowser().indexOf("CHROME") != -1)) {//ie11 changes
        return docEle.cloneNode(true);
    } else {
        return docEle;
    }
}

function getNextSibling(ele) {
    if((getBrowser().indexOf("SAFARI") != -1) || (getBrowser().indexOf("CHROME") != -1)) {//ie11 changes
		//Fix for 21355639 start
		var nextSiblingElem = ele.nextElementSibling;
        while((nextSiblingElem != null) && (nextSiblingElem.nodeType == '3'))
        {
            nextSiblingElem = nextSiblingElem.nextElementSibling;
        }
        return nextSiblingElem;
        //return ele.nextElementSibling;
    } else {
		var nextSiblingElem = ele.nextSibling;
        while((nextSiblingElem != null) && (nextSiblingElem.nodeType == '3'))
        {
            nextSiblingElem = nextSiblingElem.nextSibling;
        }
        return nextSiblingElem;
        //return ele.nextSibling;
		//Fix for 21355639 end
    }
}

function getPreviousSibling(ele) {
    if((getBrowser().indexOf("SAFARI") != -1) || (getBrowser().indexOf("CHROME") != -1)) {//ie11 changes
		//Fix for 21104956 start
        var prevSiblingElem = ele.previousElementSibling;
        while((prevSiblingElem != null) && (prevSiblingElem.nodeType == '3'))
        {
            prevSiblingElem = prevSiblingElem.previousElementSibling;
        }
        return prevSiblingElem;
        //return ele.previousElementSibling;
    } else {
        var prevSiblingElem = ele.previousSibling;
        while((prevSiblingElem != null) && (prevSiblingElem.nodeType == '3'))
        {
            prevSiblingElem = prevSiblingElem.previousSibling;
        }
        return prevSiblingElem;
        //return ele.previousSibling;
		//Fix for 21104956 end
    }
}

function getToolBarNextSibling(ele) {
    return ele.nextElementSibling;
}

function getToolBarPreviousSibling(ele) {
    return ele.previousElementSibling;
}

function addEvent(ele, eventType, eventHandler) {
    ele.setAttribute(eventType, eventHandler);
}

function nsResolver(sPrefix) {
    switch (sPrefix) {
        case "fcubs" :
            return "http://fcubs.iflex.com";
        case "dms" :
            return "http://webservices.iflex.com";
        default:
            return null;
    }
}

function setValueOfTextBox(innerHTML, ele) {
	/*Fix for 18259139 Ends*/
	//innerHTML = innerHTML.substring(0, innerHTML.indexOf(">")) + " value = '" + ele.value + "'" + innerHTML.substring(innerHTML.indexOf(">"));
	innerHTML = innerHTML.substring(0, innerHTML.indexOf(">")) + " value = \"" + ele.value + "\"" + innerHTML.substring(innerHTML.indexOf(">"));
	/*Fix for 18259139 Ends*/	    
    return innerHTML;
}

function preventpropagate(e){ 
    e.stopPropagation(); 
}

function fnGetParentHTMLElement(ele){
    if((getBrowser().indexOf("SAFARI") != -1) || (getBrowser().indexOf("CHROME") != -1)) {//ie11 changes
        return ele.parentElement;
    } else {
        return ele.parentNode;
    }
}


function fnRotateImage(imgObj,deg){
    objCanvas = document.getElementById('canvas');	   
    document.getElementById("IMAGEDISPLAY").className = "hidden";
    document.getElementById("IMAGEDISPLAY").style.display='none';
    objCanvas.className = "";
    document.getElementById("canvas").style.display=''; 
    imgObj.style.display='none';
                               
    var cContext = objCanvas.getContext('2d');
    var cw = imgObj.width, ch = imgObj.height, cx = 0, cy = 0;              
    switch(deg){
        default:
        case 0 :
                objCanvas.setAttribute('width', cw);
                objCanvas.setAttribute('height', ch);
                cContext.rotate(deg * Math.PI / 180);
                cContext.drawImage(imgObj, 0, 0,imgObj.width, imgObj.height);
        break;
        case 90:
                objCanvas.setAttribute('width', ch);
                objCanvas.setAttribute('height', cw);
                cContext.rotate(deg * Math.PI / 180);
                cContext.drawImage(imgObj, 0, -imgObj.height,imgObj.height, imgObj.width);
        break;
        case 180:
                cx = imgObj.width * (-1);
                cy = imgObj.height * (-1);
                objCanvas.setAttribute('width', cw);
                objCanvas.setAttribute('height', ch);
                cContext.rotate(deg * Math.PI / 180);
                cContext.drawImage(imgObj, cx, cy,imgObj.width, imgObj.height);
        break;
        case 270:
                cx = imgObj.width * (-1);
                objCanvas.setAttribute('width', ch);
                objCanvas.setAttribute('height', cw);
                cContext.rotate(deg * Math.PI / 180);
                cContext.drawImage(imgObj, cx, cy,objCanvas.height, objCanvas.width);
        break;
    }
}

function fnFlipHorizontal(imgObj){
    objCanvas = document.getElementById('canvas');	   
    document.getElementById("IMAGEDISPLAY").className = "hidden";
    document.getElementById("IMAGEDISPLAY").style.display='none';
    imgObj.style.display='none';
    document.getElementById("canvas").style.display=''; 
    objCanvas.className = "";
    var cContext = objCanvas.getContext('2d');
    if(hz==0){
        SetRotation(0);
        cContext.translate(imgObj.width, 0);
        cContext.scale(1,-1);
        cContext.translate(imgObj.width, 0);
        cContext.scale(-1,1);
        cContext.translate(imgObj.width, 0);
        cContext.scale(1,-1);
        cContext.drawImage(imgObj, 0, 0,imgObj.width, imgObj.height);
         hz=1;
        }else{
    if(hz==1){
        cContext.translate(imgObj.width, 0);
        cContext.scale(-1,1);
        cContext.drawImage(imgObj, 0, 0,imgObj.width, imgObj.height);
        hz=0;
    }
    }   
}

function fnFlipVerticalal(imgObj){
    objCanvas = document.getElementById('canvas');	   
    document.getElementById("IMAGEDISPLAY").className = "hidden";
    document.getElementById("IMAGEDISPLAY").style.display='none';
    document.getElementById("canvas").style.display=''; 
    imgObj.style.display='none';
    objCanvas.className = "";
    var cContext = objCanvas.getContext('2d');                   
    if(vt==0){
        SetRotation(0);
        cContext.translate(0,imgObj.height);
        cContext.scale(-1, 1);
        cContext.translate(0, imgObj.height);
        cContext.scale(1, -1);
        cContext.translate(0,imgObj.height);
        cContext.scale(-1, 1);
        cContext.drawImage(imgObj,0,0,imgObj.width, imgObj.height);   
        vt=1;
    }else{
        if(vt==1){
            cContext.translate(0, imgObj.height);
            cContext.scale(1, -1);
            cContext.drawImage(imgObj,0,0,imgObj.width, imgObj.height);   
            vt=0;
        }
    }
}
var clientAuthEnabled = false;
function initChatBot(name) {
    // Default name is Bots
    if (!name) {
        name = 'Bots';
    }
    setTimeout(() => {
		initSdk(name); //Chatbot Added newly
        if (clientAuthEnabled) {
            window[name] = new WebSDK(chatWidgetSettings, generateToken);
        } else {
            window[name] = new WebSDK(chatWidgetSettings);
        }
        window[name].connect()
            .then(() => {
                console.log("Connection Successful");
                const delegate = {
                    beforeDisplay: function(message) {
                        //var inMsg = message.text;//32470651
                        var inMsg = message.messagePayload.text;//32470651
                        if (inMsg.indexOf("|") > -1) {

                            var functionId = (inMsg.substring(inMsg.indexOf("|"), inMsg.length)).split("|")[2];
                            message.messagePayload.text=inMsg.substring(0,inMsg.indexOf("|"));//32470651
                            chatBotArray = new Object();
                            if ((inMsg.substring(inMsg.indexOf("|"), inMsg.length)).split("|").length > 3) {
                                chatBotArray.respVal = (inMsg.substring(inMsg.indexOf("|"), inMsg.length)).split("|")[3];
                                //chatBotArray.fldLIst = 
                                chatBotArray.frmChatBot = "Y";
                            }
                            dispHref1(functionId, parent.seqNo);
                        }
                        return message;
                    },
                    beforeSend: function(message) {
                        return message;
                    },
                    beforePostbackSend: function(postback) {
                        return postback;
                    }
                }
                Bots.setDelegate(delegate);
            })
            .catch((reason) => {
                console.log("Connection failed");
                console.log(reason);
            });
    });
    

}