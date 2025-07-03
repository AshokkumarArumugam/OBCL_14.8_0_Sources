/*----------------------------------------------------------------------------------------------------
**
** File Name    : BROWSER_IE.js
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

Copyright © 2009-2015  by Oracle Financial Services Software Limited..

  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 07-Oct-2016
  **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                             to user as alert and on click of Ok button on alert window, screen will be 
                             unmasked and user can try the action again.
  **  Retro Source         : 9NT1606_12_0_3_INTERNAL
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929

  **  Modified By          : Ambika Selvaraj
  **  Modified On          : 15-Sep-2017
  **  Modified Reason      : The -ms-filter property used for flipping signature/image is deprecated from IE9. Canvas object is used instead. Changes done for the same. 
  **  Retro Source         : 9NT1606_12_0_3_DHAKA_BANK_LTD
  **  Search String        : 9NT1606_12_4_RETRO_12_0_3_26780544

********************************************************************************************
*/
var useHTTPForXSL = false;
function loadFileWithHTTP(filePath) {
	var xmlDoc = null;
	var xmlHttpObj = createHTTPActiveXObject();
	try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
	xmlHttpObj.open("GET", filePath, false);
	xmlHttpObj.send(null);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start 
    catch(exp){
          mainWin.handleNetWorkErr(exp);
        }  //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
	if ((xmlHttpObj.status == 200) && (xmlHttpObj.readyState == 4)) {
  if(selectSingleNode(xmlHttpObj.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(xmlHttpObj.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change  start
        mainWin.mask(); 
        mainWin.sessionTimeOut = true;
        mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
        return false;
  }//session expiry change  end
		xmlDoc = loadXMLDoc(xmlHttpObj.responseText);
	}
	return xmlDoc;
}

function setXSLParamsWithHTTP(xslDoc, params) {
	xslDoc.setProperty('SelectionNamespaces',  'xmlns:xsl="http://www.w3.org/1999/XSL/Transform"');
	for(var i in params) {
		var paramNode = selectSingleNode(xslDoc, "//xsl:param[@name='"+i+"']");
		if(paramNode != null) {
			paramNode.text=params[i];
		}
	}
}



function createHTTPActiveXObject() {
    var HttpObj;
    try {
        HttpObj = new ActiveXObject("MSXML2.XMLHTTP.6.0");
    } catch(e) {
        HttpObj = new ActiveXObject("MSXML2.XMLHTTP.4.0");
    }
    return HttpObj;
}

function selectSingleNode(xmlDoc, strXMLPath) {
    return xmlDoc.selectSingleNode(strXMLPath);
}

function selectNodes(xmlDoc, strXMLPath) {
    return xmlDoc.selectNodes(strXMLPath);
}

function loadXMLDoc(txt) {
    if(txt == "") {
        return null;
    } else {
    var xmlDoc = null;
    try {
        xmlDoc=new ActiveXObject("Msxml2.DOMDocument.6.0");
    } catch(e) {
        xmlDoc=new ActiveXObject("Msxml2.DOMDocument.4.0");
    }
    xmlDoc.async=false;
    xmlDoc.loadXML(txt);
    return xmlDoc;
    }
}

function loadXMLFile(fname) {
    var xmlDoc = null;
    // code for IE
    try {
        xmlDoc=new ActiveXObject("Msxml2.DOMDocument.6.0");
    } catch(e) {
        xmlDoc=new ActiveXObject("Msxml2.DOMDocument.4.0");
    }
    xmlDoc.async=false;
    xmlDoc.load(fname);
    if (typeof(fname) != 'undefined' && fname != null) {
        if(xmlDoc.parseError.errorCode != 0) {
            useHTTPForXSL = true;
            xmlDoc= loadFileWithHTTP(fname);
        }
    }
    return xmlDoc;
}

/* ArunT modified  for ie9 image upload issue starts */
/* 19864500 changes starts */
function readResponseXMLTags(doc) { 
      var xml="";
      try {
          var startEmt=doc.contentWindow.document.documentElement;
          var startTag="<"+startEmt.tagName+">";
          var endTag="</"+startEmt.tagName+">";
          if(startEmt.tagName=="ATTACHMENT")   { // parsing success xml
           xml=startTag;
              for (var i = 0; i < doc.contentWindow.document.documentElement.childNodes.length; i++) {
                            var data=doc.contentWindow.document.documentElement.childNodes[i]
                             xml=xml+"<"+data.tagName+">"+data.textContent+"</"+data.tagName+">";
              }
              return (xml+endTag);
          }
          else if(startEmt.tagName=="FCJMSG") //parsing failure xml
              {
               startTag="<"+startEmt.tagName+" ";
               xml=startTag;
               if(startEmt.attributes)  {
                    xml=xml+startEmt.attributes[0].name+" =\" "+startEmt.attributes[0].textContent+"\" >"// getting attributes of FCJMSG
               }
               for (var i = 1; i < doc.contentWindow.document.documentElement.childNodes.length; i++) {
                    var data=doc.contentWindow.document.documentElement.childNodes[i];
                    xml=xml+"<"+data.tagName;
                    if(data.attributes.length>0)    {
                        for (var j = 0; j < data.attributes.length; j++) {
                            xml=xml+" "+data.attributes[j].nodeName+" =\""+data.attributes[j].nodeValue+"\"";
                        }
                    xml=xml+"></"+ data.tagName+">"
                    }
                    else{
                       xml=xml+">";
                       var sizeVal="";
                       for (var n = 0; n < data.childNodes.length; n++)     {
                             xml=xml+"<"+data.childNodes[n].tagName+">"
                            if(data.childNodes[n].childNodes.length>0  )
                            {
                            if(typeof(data.childNodes[n].childNodes[0].tagName)!='undefined') {
                                for (var m = 0; m < data.childNodes[n].childNodes.length; m++) {
                                    xml=xml+"<"+ data.childNodes[n].childNodes[m].tagName+">";
                                    if(data.childNodes[n].childNodes[m].tagName=="SIZE")
                                    {
                                    xml=xml+data.childNodes[n].childNodes[m].textContent+"</"+data.childNodes[n].childNodes[m].tagName+">";
                                    sizeVal="";
                                    }
                                if( data.childNodes[m] && data.childNodes[m].childNodes.length>0)
                                {
                                    for (var h = 0; h < data.childNodes[m].childNodes.length; h++) {
                                           if(data.childNodes[m].childNodes[h].childNodes.length==1){
                                                //sizeVal=data.childNodes[m].childNodes[h].textContent;
                                            }
                                            else    {
                                                for (var x = 0; x <data.childNodes[m].childNodes[h].childNodes.length; x++)     {
                                                        xml=xml+"<"+data.childNodes[m].childNodes[h].childNodes[x].tagName+">"+data.childNodes[m].childNodes[h].childNodes[x].textContent+"</"+data.childNodes[m].childNodes[h].childNodes[x].tagName+">";
                                                }
                                                if(typeof(data.childNodes[m].childNodes[h].tagName)!='undefined') 
                                                xml=xml+"</"+data.childNodes[m].childNodes[h].tagName+">";
                                            }
                                      }
                                  }
                                else{
                                  if(data.childNodes[n].childNodes[m].tagName !="SIZE")
                                      xml=xml+"</"+data.childNodes[n].childNodes[m].tagName+">";
                                  }
                                }
                            }
                            if(data.childNodes[n].tagName == 'FNAME')
                                xml=xml+data.childNodes[n].textContent+"</"+data.childNodes[n].tagName+">";
                            else
                                xml=xml+"</"+data.childNodes[n].tagName+">";
                            }
                        
                    }
                     xml=xml+"</"+data.tagName+">";
                }
            }  
        return (xml+endTag);
       }
    } catch (ex) {
        
      }
}
/* 19864500 changes ends */
function loadIFrameContent(iFrameObj) {
     try {
     if(iFrameObj.contentWindow.document.XMLDocument){
    return loadXMLFile(iFrameObj.contentWindow.document.XMLDocument);
     }
     else{
     return loadXMLDoc(readResponseXMLTags(iFrameObj));
     }
     }
 catch (ex) {
       return loadXMLDoc(readResponseXMLTags(iFrameObj));
}
}


function loadXSLFile(xslFilePath) {
    var xslObj = null;
    try {
        xslObj = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.6.0");
    } catch(e) {
        xslObj = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.4.0");
    }
    xslObj.async = false;
    xslObj.resolveExternals = true;
    xslObj.load(xslFilePath);
	if(xslObj.parseError.errorCode != 0) {
		useHTTPForXSL = true;
		xslObj = loadFileWithHTTP(xslFilePath);
	}
	
    return xslObj;
}

function transform(xmlDoc, xslDoc, params) {
    var xslt = null;
	var html = "";
    try {
        xslt = new ActiveXObject("Msxml2.XSLTemplate.6.0");
    } catch(e) {
        xslt = new ActiveXObject("Msxml2.XSLTemplate.4.0");
    }
	if(useHTTPForXSL ) {
		if(params != null) {
			setXSLParamsWithHTTP(xslDoc, params);
		}
		html = xmlDoc.transformNode(xslDoc);
	} else {
    xslt.stylesheet = xslDoc;
    xslProc = xslt.createProcessor();
    xslProc.input = xmlDoc;
    if(params!=null){
    for(var i in params) {
        xslProc.addParameter(i, params[i]);
        }
    }
    xslProc.transform();
    html = xslProc.output;
	}
    return html;
}

function fnDisableBrowserKey(e) {
    if (getBrowser().indexOf("IE") != -1 && getIEVersionNumber() == 11) {//21800458   
        e.preventDefault();					
    }else {
        e.returnValue = false;
    }
}

function getCurrentStyle(currObj, styleName) {
    return currObj.currentStyle[styleName];
}

function getOuterHTML(ele) {
    return ele.outerHTML;
}

function setOuterHTML(ele, strHTML) {
    ele.outerHTML = strHTML;
}

function getOuterHTML_TXADisp(ele) {
   return ele.outerHTML;
}

function setOuterHTML_TXADisp(ele, strHTML) {
    ele.outerHTML = strHTML;
}

function getInnerText(ele) {
    return ele.innerText;
}

function setInnerText(ele, txt) {
    ele.innerText = txt;
}

function getXMLString(xmlDoc) {
    return xmlDoc.xml;
}

function getNodeText(textNode) {
    return textNode.text;
}
function setNodeText(textNode, text) {
    textNode.text = text;
}

function getPosition(pintRecNumber) {
    return Number(pintRecNumber) -1;
}

function getBrowser(){//12.0.4 changes//ie11 changes starts
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if(isIE){
        var ie=" IE: ";
        var version=getIEVersionNumber();
        return ie.concat(version);
    }
}//ie11 changes ends

function fireHTMLEvent(object, eventName,evnt) {//ie11 changes starts   changed starts //21246832 
    
     if (getBrowser().indexOf("IE") >=0 && getBrowser().indexOf("11") != -1) {//ie11 changes
        var eventHandlerStr = object.getAttribute(eventName);
        if (eventHandlerStr) {
            eventHandlerStr = eventHandlerStr.replace(new RegExp("this", "g"), "object");
            //Fix for  17162382 start
            if (eventHandlerStr.indexOf("event") !=  - 1) {
                var fnEval = new Function("object, event", eventHandlerStr);
                fnEval(object, evnt);//21246832
            }
            else {
                var fnEval = new Function("object", eventHandlerStr);
                fnEval(object);
            }
            //Fix for  17162382 end
        }
        return true; //Fix for 20059188 //Fix for 20771102
    } else {
		//Fix for 20059188
        if (eventName != "onpropertychange") {
            return object.fireEvent(eventName);
        }
    }
}//ie11 changes ends changed ends

function getEventSourceElement(e) {
    return e.srcElement;
}

function getCloneDocElement(docEle) {
    //return docEle;
    return docEle.cloneNode(true);//Fix given for caching issue for branch screens
}
/*Fix For Bug 17356684 Start */
function getNextSibling(ele) {
    var nextSibElem = ele.nextSibling;
  while((nextSibElem != null) && (nextSibElem.nodeType == '3'))
  {
    nextSibElem = nextSibElem.nextSibling;
    
  }
    return nextSibElem;
}

function getPreviousSibling(ele) {
     var prevSiblingElem = ele.previousSibling;
     while((prevSiblingElem != null) && (prevSiblingElem.nodeType == '3'))
    {
        prevSiblingElem = prevSiblingElem.previousSibling;
      }
    return prevSiblingElem;
}

function getToolBarNextSibling(ele) {
   var nextSibElem = ele.nextSibling;
  while((nextSibElem != null) && (nextSibElem.nodeType == '3'))
  {
    nextSibElem = nextSibElem.nextSibling;
    
  }
    return nextSibElem;
}

function getToolBarPreviousSibling(ele) {
var prevSiblingElem = ele.previousSibling;
     while((prevSiblingElem != null) && (prevSiblingElem.nodeType == '3'))
    {
        prevSiblingElem = prevSiblingElem.previousSibling;
      }
    return prevSiblingElem;
}
/*Fix For Bug 17356684 End */
function addEvent(ele, eventType, eventHandler) {
    //if(navigator.userAgent.indexOf("MSIE 7.0") >= 0) {
    if((getBrowser().indexOf("IE") !=-1 && getBrowser().indexOf("7") !=-1)){//ie11 changes
        if(eventType == "class") {
            ele.setAttribute("className", eventHandler);
        } else {
            //eval("ele."+eventType+"="+"function(event){"+eventHandler+";};");
            ele.attachEvent(eventType, function(){eventHandler.apply(ele);});
        }
    } else {
        ele.setAttribute(eventType, eventHandler);
    }
}

function setValueOfTextBox(innerHTML, ele) {
	/*Fix for 18259139 Starts*/
	//innerHTML = innerHTML.substring(0, innerHTML.indexOf(">")) + " value = '" + ele.value + "'" + innerHTML.substring(innerHTML.indexOf(">")); /*Fix for 16845053*/   
	innerHTML = innerHTML.substring(0, innerHTML.indexOf(">")) + " value = \"" + ele.value + "\"" + innerHTML.substring(innerHTML.indexOf(">"));
	/*Fix for 18259139 Ends*/	
    return innerHTML;
}

function preventpropagate(e){     
    if (event != undefined)
        event.cancelBubble = true;
    else
        e.cancelBubble = true;
}

function fnGetParentHTMLElement(ele){
    return ele.parentNode;
}

/*9NT1606_12_4_RETRO_12_0_3_26780544 changes Starts*/
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
/*9NT1606_12_4_RETRO_12_0_3_26780544 changes Ends*/
