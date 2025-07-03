/***************************************************************************************************************************
 **  This source is part of the FLEXCUBE Software System and is copyrighted by
 **  Oracle Financial Services Software Limited.
 **
 **  All rights reserved.  No part of this work may be reproduced, stored in a retrieval system,
 **  adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
 **  graphic, optic recording or otherwise, translated in any language or computer language,
 **  without the prior written permission of Oracle Financial Services Software Limited.
 **
 **  Oracle Financial Services Software Limited.
 **  10-11, SDF I, SEEPZ, Andheri (East),
 **  Mumbai - 400 096.
 **  India.
 **
 **  Copyright © 2008 - 2012 by Oracle Financial Services Software Limited. All rights reserved.
 **
 **  Written by         :
 **  Date of creation   :
 **  File Name          : DMSUtility.js
 **  Purpose            :
 **  Called From        :
 **
 **  CHANGE LOG
 **  Last Modified By   :
 **  Last modified on   :
 **  Full Version       :
 **  Reason             :
 
 **  Modified By          : Neethu Sreedharan
 **  Modified On          : 07-Oct-2016
 **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                            to user as alert and on click of Ok button on alert window, screen will be 
                            unmasked and user can try the action again.
 **  Retro Source         : 9NT1606_12_0_3_INTERNAL
 **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
 **
 **  Modified By          : Shayam Sundar Ragunathan
 **  Modified On          : 13-Jul-2017
 **  Modified Reason      : Changes done to avoid duplication of error messages in document screen.
 **  Search String        : 9NT1606_12_4_RETRO_12_0_3_26230180
 **
 **  Modified By          : Girish M
 **  Modified On          : 20-Jan-2025
 **  Modified Reason      : After saving a document the screen was hanging.
 **  Search String        : Bug_36099490
 ****************************************************************************************************************************/
var isDocUpLWin = false;
var gDMSRefNo;
var docSubmitDlgArg = new Object();
var corefnAddRow = fnAddRow;
var corefnDeleteRow = fnDeleteRow;

function iFrameHandler(event) {
    event = window.event || event;
    var iFrameName = getEventSourceElement(event);
    var responseXml = loadIFrameContent(document.getElementById(iFrameName));
    var exceptionElement = selectSingleNode(responseXml, "//dms:ExceptionMessage");
    if (exceptionElement != null) {
        var isErrored = handleException(exceptionElement);
        if (isErrored == false) {
            var documentIDElement = selectSingleNode(responseXml, "//dms:DocumentID");
            handleDocumentID(documentIDElement);
        }
    }
    return true;
}

function handleException(exceptionElement) {
    var isErrored = false;
    var exceptionText = getNodeText(exceptionElement);
    if (exceptionText && exceptionText != "") {
        isErrored = true;
        alert('Error !!\n' + exceptionText);
    }
    return isErrored;
}

function handleDocumentID(documentIDElement) {
   
}

function uploadDocument(rowIndex,action) {
    docSubmitDlgArg.docUplScreenWin = window;
    docSubmitDlgArg.rowIndex = rowIndex;
    if (isDocUpLWin == false) {
        isDocUpLWin = true;
         if(action)
          loadSubScreenDIV("ChildWin", "DocumentUpload.jsp?action=RatioUpload");
        else        
          loadSubScreenDIV("ChildWin", "DocumentUpload.jsp?action=Upload");
          //loadSubScreenDIV("ChildWin", "DocumentUpload.jsp");
        isDocUpLWin = false;
    }
}

function downloadDocument(documentId, sourceElement) {
	// SFR# 14005554
    //var objwindow = mainWin.open("FCDocumentControllerServlet?Action=Download Document&documentID=" + documentId, null, "width=640px,height=480px,resizable=yes,scrollbars=yes,status=1,toolbar=no", false);
    
		 //Fix for 15883647	START
	//var objwindow = mainWin.open("TempForward.jsp?action=FCDocumentControllerServlet&actionType=Download Document&documentID=" + documentId , null, "width=640px,height=480px,resizable=yes,scrollbars=yes,status=1,toolbar=no", false);

	createTempForwardIframe( "FCDocumentControllerServlet?actionType=Download Document&documentID=" + documentId, sourceElement);



}
function createTempForwardIframe(src, sourceElement){
    try {
	//Added for upload issue start
       clearTempDiv();
	   //Added for upload issue end
       // var parent = sourceElement.parentNode;
        var iFrameBody = "";
        var fileInputField = document.getElementById("ResTree"); //Bug_36099490
        var parent = fileInputField.parentNode; //Bug_36099490
        var customWin       = document.createElement("div");
		customWin.id        = "tempForwardDiv";
		customWin.className = "dhtmlwindow";
		customWin.style.position = "absolute";
		customWin.style.zIndex = 10;
       
       iFrameBody += '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"><html><head>' //Bug_36099490
        iFrameBody += '<meta http-equiv="Content-Type" content="application/x-unknown;charset=utf-8">';
        iFrameBody += '</head><body style=\" display:inline; padding:0px; margin:0px; border:0px none; \">'; //Bug_36099490
        iFrameBody += "<FORM id='tempForward' method='post' action=\""+src+"\">";
        iFrameBody += "<input type=\"hidden\" name=\"X-CSRFTOKEN\" value=\""+mainWin.CSRFtoken+"\" />";
        iFrameBody += "</FORM></body></html>";
        customWin.innerHTML = iFrameBody;
        parent.appendChild(customWin);
        
          var winObj = document.getElementById("tempForwardDiv");
		winObj.style.visibility="visible";
		winObj.style.display="block";
		document.getElementById("tempForward").submit();

    } catch (e) {}
}
//Fix for 15883647	END
//Added for upload issue start
function clearTempDiv(){
  var tempDiv = document.getElementById('tempForwardDiv');
  
  if(tempDiv){
  tempDiv.parentNode.removeChild(tempDiv);
}
}
//Added for upload issue end
function createIFrames(newRow) {
    var inputFields = newRow.getElementsByTagName('input');
    var fileInputField;
    var fileInputFieldHTML;
    for (var ctr = 0;ctr < inputFields.length;ctr++) {
        if (inputFields[ctr].type != 'file') {
            continue;
        }
        else {
            try {
                fileInputField = inputFields[ctr];
                var parent = fileInputField.parentElement;
                var CSRF_token = mainWin.CSRFtoken;
                var iFrameBody = '<html><head><link href=\"' + document.styleSheets(0).href + '\" type=\"text\/css\" rel=\"stylesheet\"></head><body style=\"padding:0px; margin:0px; border:0px none; overflow:visible;\"><form id=\"fileUploadForm\" action=\"FBDocControllerServlet\" method=\"post\" enctype=\"multipart\/form-data\" onSubmit=\"uploadDocument();\">' + fileInputField.parentElement.innerHTML + '<label class="LBLinv" for="docCode"></label><input type=\"hidden\" name="docCode" id="docCode" \/><label class="LBLinv" for="docDescription"></label><input type=\"hidden\" name="docDescription" id="docDescription" \/>' + '<\/form></body></html>';
                var rowIndex = newRow.rowIndex;
                var iFrameHeight = parent.offsetHeight;
                var iFrameWidth = parent.offsetWidth;
                var requestIFrame = createRequestIFrame(rowIndex, iFrameHeight, iFrameWidth);
                parent.appendChild(requestIFrame);

                var iRequestFrameID = 'RequestFrame' + rowIndex;
                if (self.frames[iRequestFrameID].name != iRequestFrameID) {
                    /* *** IMPORTANT: This is a BUG FIX for Internet Explorer *** */
                    self.frames[iRequestFrameID].name = iRequestFrameID;
                }
                document.getElementById('RequestFrame' + rowIndex).contentWindow.document.write(iFrameBody);

                var responseIFrame = createResponseIFrame(rowIndex);
                parent.appendChild(responseIFrame);
                var iResponseFrameID = 'ResponseFrame' + rowIndex;
                if (self.frames[iResponseFrameID].name != iResponseFrameID) {
                    /* *** IMPORTANT: This is a BUG FIX for Internet Explorer *** */
                    self.frames[iResponseFrameID].name = iResponseFrameID;
                }

                parent.removeChild(fileInputField);
            }
            catch (e) {
                alert(e.description);
            }
        }
    }
    return true;
}

function createRequestIFrame(rowIndex, height, width) {
    var requestIFrame = document.createElement('iframe');
    requestIFrame.setAttribute('id', 'RequestFrame' + rowIndex);
    requestIFrame.setAttribute('name', 'RequestFrame' + rowIndex);
    requestIFrame.setAttribute('class', 'TextNormal');
    requestIFrame.setAttribute('src', '');
    requestIFrame.setAttribute('frameborder', '0');
    requestIFrame.setAttribute('height', height + 'px');
    requestIFrame.setAttribute('width', width + 'px');
    requestIFrame.setAttribute('scrolling', 'no');
    requestIFrame.style.border = '0px none';
    requestIFrame.style.margin = '0px';
    requestIFrame.style.padding = '0px';
    return requestIFrame;
}

function createResponseIFrame(rowIndex) {
    var responseFrameContainer = document.createElement('div');
    responseFrameContainer.setAttribute('id', 'responseContainer');
    var iFrameID = 'ResponseFrame' + rowIndex;
    var iFrameBody = '<iframe id=\"' + iFrameID + '\"' + ' name=\"' + iFrameID + '\"' + ' src=\"\" scrolling=\"no\" frameBorder=\"0\" onLoad=\"iFrameHandler()\" style=\"border:0px none; width:1px; height: 1px;\"><\/iframe>';
    responseFrameContainer.innerHTML = iFrameBody;
    return responseFrameContainer;
}
fnAddRow = function (v_MeblockId) {
    corefnAddRow(v_MeblockId);    
}

fnDeleteRow = function (v_MeblockId) {
    corefnDeleteRow(v_MeblockId);    
}

function fnFinalAddrow() {  
    var len = document.getElementById("BLK_DOC_UPLOAD").rows.length;
    for (var i = 1;i < len;i++) {
        fnAttachEachRow(document.getElementById("BLK_DOC_UPLOAD").tBodies[0].rows[i]);
    }
}

function fnAttachEachRow(eachRow) {
    createIFrames(eachRow);
    addEvent(document.getElementById("BLK_DOC_UPLOAD"), 'onclick', 'fnCheck');
}

function fnCheck(event) {
    event = window.event || event;
    var indx = getRowIndex(event);
    if (indx > 0) {
        var curRow = document.getElementById("BLK_DOC_UPLOAD").tBodies[0].rows[indx];
        createIFrames(curRow);
        var iFrameFormDocument = document.getElementById('RequestFrame' + indx).contentWindow.document;
        iFrameFormDocument.getElementById('docpth').disabled = false;
        iFrameFormDocument.getElementById('docpth').readOnly = false;
    }
}

function fnPreDeleteRow_BLK_DOC_UPLOAD_KERNEL() {
    var tableObject = document.getElementById('BLK_DOC_UPLOAD');
    var noOfRows = tableObject.tBodies[0].rows.length;
    var isDeleteSuccessful = true;
    var count = 0;
    for (var index = noOfRows - 1;index >= 0;index--) {
        if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            var documentID = tableObject.tBodies[0].rows[index].all['DCREFNO'].value;
            if (documentID == null || documentID == "") {
                continue;
            }
            var parameters = encodeURI("Action=Delete Document&documentID=" + documentID);
            var xmlHttp = createHTTPActiveXObject();
			try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
            xmlHttp.open("POST", "FCDocumentControllerServlet", false);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.setRequestHeader("Content-length", parameters.length);
            xmlHttp.setRequestHeader("Connection", "close");
           // bjHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
		   xmlHttp.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
            xmlHttp.send(parameters);
			} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
             catch(exp){
             mainWin.handleNetWorkErr(exp);
            } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
          //  var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
		  var csrfNode = selectSingleNode(xmlHttp.responseXML, "//CSRF");
            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
            }
            else if (selectSingleNode(xmlHttp.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(xmlHttp.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change  start
                mainWin.mask(); 
                mainWin.sessionTimeOut = true;
                mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
                return false;
            }//session expiry change  end
            else {
                var xmlHttpResponse = xmlHttp.responseXML;
                if (xmlHttpResponse != null) {
                    var responseDOM = loadXMLDoc(xmlHttp.responseXML);
                    responseDOM.setProperty("SelectionNamespaces", "xmlns:dms='http://webservices.iflex.com'");
                    var exceptionMessage = selectSingleNode(responseDOM, "//dms:ExceptionMessage");
                    var exceptionText = getNodeText(exceptionMessage);
                    if (exceptionMessage != null && exceptionText != null && exceptionText != "") {
                        isDeleteSuccessful = false;
                    }
                    else {
                        var deletionStatus = selectSingleNode(responseDOM, "//dms:DeletionStatus");
                        if (deletionStatus != null && getNodeText(edeletionStatus) != null && getNodeText(edeletionStatus) == "false") {
                            isDeleteSuccessful = false;
                        }
                    }
                }
                count++;
            }
        }
    }
    if (count > 0 && isDeleteSuccessful == true) {
    //FC 11.4 NLS Changes Starts*/
        //alert('The selected documents have been deleted from the Document Management System.');
        showErrorAlerts('IN-HEAR-502');
         //FC 11.4 NLS Changes Ends*/
    }
    else if (count > 0 && isDeleteSuccessful == false) {
     //FC 11.4 NLS Changes Starts*/
        //alert('The selected documents have been delinked from the Document Management System. Some documents could not be deleted.');
        showErrorAlerts('IN-HEAR-503');
         //FC 11.4 NLS Changes Ends*/
    }
    else {       
        return true;
    }
    return true;
}

//9NT1606_12_4_RETRO_12_0_3_26230180 Starts
function appendErrorCode(code, anyArg) {
    if (anyArg != null && anyArg != "") {
        if(replaceStr.indexOf(anyArg)!= -1)return;
        replaceStr += anyArg;
        replaceStr += "~";
    } else replaceStr += "~";
    gErrCodes += code;
    gErrCodes += "~";
}
//9NT1606_12_4_RETRO_12_0_3_26230180 ends