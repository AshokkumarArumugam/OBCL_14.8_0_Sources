<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : GIImageUpload.jsp
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

Copyright © 2010-2016 by Oracle Financial Services Software Limited..
 ----------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------
     CHANGE HISTORY
     Changed By         : 
     Change Description : 
-------------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
--------------------------------------------------------------------------------------------------------- -
*/%>
<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="com.ofss.fcc.common.FCMessages"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.common.BranchUserGlobals"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%
request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
String strTheme = (String)session.getAttribute("THEME");
String imagePath = "Images/Ext"+strTheme.substring(0,strTheme.indexOf(".css"));
/* # BUG 15978732 fixes start */ 
String pkName = FCUtility.validateParameter(request.getParameter("keyName"));
String pkColName =FCUtility.validateParameter( request.getParameter("pkColName"));
String pkColValues = FCUtility.validateParameter(request.getParameter("pkColVal"));
String seqNo = FCUtility.validateParameter(request.getParameter("seqNo"));
String imageName = FCUtility.validateParameter(request.getParameter("image"));
String actionCode = FCUtility.validateParameter(request.getParameter("action"));
String title = FCUtility.validateParameter(request.getParameter("title"));
String upload = FCUtility.validateParameter(request.getParameter("upload"));
String functionId = FCUtility.validateParameter(request.getParameter("functionId"));
/* # BUG 15978732 fixes end */ 

String ieCss         = (String)session.getAttribute("IECSS");
/* # BUG 15978732 fixes start */ 
String imageFieldName = FCUtility.validateParameter(request.getParameter("imgFieldName"));
//Added for GI Module
String targetLocation = FCUtility.validateParameter(request.getParameter("targetLocation"));
/* # BUG 15978732 fixes end */ 
/*String currBranch = request.getParameter("currBranch");
String userId = request.getParameter("userId");*/
FCUserGlobals uc    = (FCUserGlobals)session.getAttribute(com.ofss.fcc.common.BranchConstants.USERGLOBALS); 
String currBranch = uc.getCurrBranch();
String userId = uc.getCurrUser();
String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>

<!DOCTYPE html><!--HTML5 Changes-->
<html>
  <head>
    <title><%=StringEscapeUtils.escapeHTML(title)%></title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content=0>
    <link href="Theme/<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>  
        <!--HTML5 Changes Start--><link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
    <script language="JavaScript" src="Script/JS/UIUtil.js"></script>
  </head>
  <body  class="BODYForm" onload="fnPostLoadImageScr();">
    <div class="DIVTwoColLyt">
	<div class="DIVHeaderBodyContainer" id="DIVMainTmp" style="height:300px; overflow:auto">
                   <div class="DIVText">
		<table border="0" cellpadding="0" cellspacing="0">
		<tr>
                        <td><label class="LABELNormal" FOR=""></label>
                        <%--<img src="Images/star_disabled.gif" title="">--%>
                        <SPAN class="stardisabled"></SPAN><%--Data Uri changes --%>
                        </td>
			<td><INPUT TYPE="File" class="TEXTNormal" LABEL_VALUE="Select" ID="" DBT="" DBC="" NAME="FILEUPLOAD" DTYPE="" SIZE="" REQUIRED="0"></td>
			<td><BUTTON class="BUTTONInlineText" onMouseOver="this.className='BUTTONInlineTextHover'" onMouseOut="this.className='BUTTONInlineText'" onFocus="this.className='BUTTONInlineTextHover'" onBlur="this.className='BUTTONInlineText'" LABEL_VALUE="Upload" ID="" DBT="" DBC="" NAME="UPLOAD" DTYPE="" SIZE="" onclick="createXML()" REQUIRED=""><sup><%=StringEscapeUtils.escapeHTML(upload)%></sup></BUTTON></td>
                    </tr>
                        <tr>
                            <%--//Added for GI Module--%>
                            <td><INPUT TYPE="HIDDEN"  NAME="targetLocation" value=<%=StringEscapeUtils.escapeHTML(targetLocation)%>></td>
                        </tr>
                    </table>
                    </div>
                    
                    <div class="DIVText" ID="IMAGEDIV">
                                <label class="LABELNormal" FOR=""></label>
                      
                        <%--<img src="Images/star_disabled.gif" title="" ALT="">--%>
                        <SPAN class="stardisabled"></SPAN><%--Data Uri changes --%>
                 
                                <IMG CLASS="IMGButton" SRC=""  LABEL_VALUE="" ID="" DBT="" DBC="" NAME="IMAGEDISPLAY" DTYPE="" SIZE="" REQUIRED="" ALT="">
                            </div>
                    
                            
    </div>
    <div class="DIVFooter" id="DIVFooter">
        <div class="DIVAudit" id="DIV_AUDIT_BUTTONS">
            <table summary="" cellpadding="0" cellspacing="0" border="0" width="99%">
                <tr>
                    <td class="THEADAudit" style="width:100%">
                        <table class="TABLEAudit" summary="" cellpadding="0" cellspacing="0" border="0" style="width:99%;">
                            <tr>
                                <td class="TDAuditButton" width="90%" valign="middle"><input type="button" class="BUTTONOk" LABEL_VALUE="" ID="BTN_OK_IMG" DBT="" DBC="" NAME="BTN_OK" DTYPE="" VALUE="Ok" DEFAULT="Ok" SIZE="" onclick="fnSaveImageUpload()" disabled="true" REQUIRED=""></td>
                                <td class="TDAuditButton" width="90%" valign="middle"><input type="button" class="BUTTONExit" LABEL_VALUE="" ID="BTN_EXIT_IMG" DBT="" DBC="" NAME="BTN_EXIT" DTYPE="" VALUE="Exit" DEFAULT="Exit" SIZE="" onclick="fnExitUpload()" REQUIRED=""></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <script language="javascript">
        var attachMentData = "";
        var displayImage = '<%=StringEscapeUtils.escapeJavaScript(imageName)%>';
        var actionCode= '<%=StringEscapeUtils.escapeJavaScript(actionCode)%>';
        
        function createXML(){
            var iFrameFormDocument = document.getElementById('RequestFrame').contentWindow.document;
            var fileName = iFrameFormDocument.getElementsByName("FILEUPLOAD")[0].value;
            if(fileName == ""){
                return false;
            }
            fileName = fileName.substring(fileName.lastIndexOf("\\")+1);
            var pkName = '<%=StringEscapeUtils.escapeJavaScript(pkName)%>';
            var strFormData  = "<FILEATTACHMENT>";
            strFormData += "<PKCOLNAME>" + '<%=StringEscapeUtils.escapeJavaScript(pkColName)%>' + "</PKCOLNAME>";
            strFormData += "<PKCOLVALUE>" + '<%=StringEscapeUtils.escapeJavaScript(pkColValues)%>' + "</PKCOLVALUE>";
            strFormData += "<SOURCEFILE>" +  iFrameFormDocument.getElementsByName("FILEUPLOAD")[0].value + "</SOURCEFILE>";
            strFormData += "<SEQNO>" + '<%=StringEscapeUtils.escapeJavaScript(seqNo)%>' + "</SEQNO>";
            strFormData += "<FILENAME>" + pkName + fileName + "</FILENAME>";
            strFormData += "<IMGFIELDNAME>" + '<%=StringEscapeUtils.escapeJavaScript(imageFieldName)%>' + "</IMGFIELDNAME>";
            strFormData += "<FUNCTIONID>" + '<%=StringEscapeUtils.escapeJavaScript(functionId)%>' + "</FUNCTIONID>";
            strFormData += "<CURRENTBRANCH>" + '<%=StringEscapeUtils.escapeJavaScript(currBranch)%>' + "</CURRENTBRANCH>";
            strFormData += "<USERID>" + '<%=StringEscapeUtils.escapeJavaScript(userId)%>' + "</USERID>";
            //Added for GI Module
            if(document.getElementById("targetLocation").value != null && document.getElementById("targetLocation").value != "null" && document.getElementById("targetLocation").value != ""){
            strFormData += "<TARGETLOCATION>" + '<%=StringEscapeUtils.escapeJavaScript(targetLocation)%>' + "</TARGETLOCATION>";
            }
            strFormData += "</FILEATTACHMENT>";
            iFrameFormDocument.getElementsByName("REQXML")[0].value = strFormData;
			iFrameFormDocument.getElementById('fileUploadForm').target = 'ResponseFrame';
            iFrameFormDocument.getElementById("fileUploadForm").submit();
        }
        
        function responseHandler() {
            var responseXml;
            var iFrameName;
            var imgFileName;
            var uploadFineName;
            if(getEventSourceElement(event)) {
                    iFrameName = getEventSourceElement(event).name;
            }
            if(navigator.userAgent.indexOf("MSIE ") != -1 || (navigator.userAgent.indexOf("Trident") != -1 && navigator.userAgent.indexOf("rv") != -1)) {//ie11 changes
                    responseXml = new ActiveXObject("Microsoft.XMLDOM");
                    responseXml.async = false;
                    responseXml.load(document.getElementById(iFrameName).contentWindow.document.XMLDocument);
            }
            else if(document.implementation && document.implementation.createDocument)	{
                    responseXml = document.getElementById(iFrameName).contentDocument;
            }
        }
                        
        function fnPostLoadImageScr(){            
            if (actionCode == "" || actionCode == null){
                document.getElementsByName("UPLOAD")[0].disabled = true;
                document.getElementsByName("FILEUPLOAD")[0].disabled = true;
            }
            try{
                var fileInputField = document.getElementsByName("FILEUPLOAD")[0];
                var parent = fileInputField.parentElement;
                var iFrameBody = "";
                var csrfVal = "<%= StringEscapeUtils.escapeJavaScript(CSRFtoken)%>";
                iFrameBody += '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"><html><head>';
				iFrameBody += '<link href="Theme/<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>';
				iFrameBody += '</head><body style=\" display:inline; padding:0px; margin:0px; border:0px none; \">';
                //iFrameBody += "<FORM id='fileUploadForm' method='post' action='SignatureUploadServlet?X-CSRFTOKEN="+csrfVal+"' enctype='multipart/form-data' onsubmit='createXML();'>";
                iFrameBody += "<FORM id='fileUploadForm' method='post' action='GIUploadServlet' enctype='multipart/form-data' onsubmit='createXML();'>";
                
                
                
                iFrameBody += "<INPUT TYPE='HIDDEN' LABEL_VALUE='' ID='' DBT='' DBC='' NAME='REQXML' DTYPE='' SIZE='' REQUIRED='' class='hidden'>";
                iFrameBody += "<INPUT TYPE='HIDDEN' LABEL_VALUE='' ID='' DBT='' DBC='' NAME='FILENAME' DTYPE='' SIZE='' REQUIRED='' class='hidden'>";
				if (actionCode == "" || actionCode == null){
	                iFrameBody += "<INPUT TYPE='File' class='TEXTNormal' disabled LABEL_VALUE='Select' ID='' DBT='' DBC='' NAME='FILEUPLOAD' DTYPE='' SIZE='' REQUIRED='0'/>";
				} else {
	                iFrameBody += "<INPUT TYPE='File' class='TEXTNormal' LABEL_VALUE='Select' ID='' DBT='' DBC='' NAME='FILEUPLOAD' DTYPE='' SIZE='' REQUIRED='0'/>";
				}
                iFrameBody += "<input type=\"hidden\" name=\"X-CSRFTOKEN\" value=\""+csrfVal+"\" />";
                iFrameBody += "</FORM></body></html>";
                
                var iFrameHeight = fileInputField.offsetHeight;
                var iFrameWidth =  fileInputField.offsetWidth;
				//document.getElementById("uploadFrameID").contentWindow.document.body.innerHTML= html;
				
                var requestIFrame = createRequestIFrame(iFrameHeight+5,iFrameWidth+50);
                parent.appendChild(requestIFrame);
                var iRequestFrameID = 'RequestFrame';
                if(self.frames[iRequestFrameID].name != iRequestFrameID){
                        /* *** IMPORTANT: This is a BUG FIX for Internet Explorer *** */
                        self.frames[iRequestFrameID].name = iRequestFrameID;
                }
                document.getElementById('RequestFrame').contentWindow.document.write(iFrameBody);
                var responseIFrame = createResponseIFrame();
                parent.appendChild(responseIFrame);
                var iResponseFrameID = 'ResponseFrame';
                if(self.frames[iResponseFrameID].name != iResponseFrameID){
                        /* *** IMPORTANT: This is a BUG FIX for Internet Explorer *** */
                        self.frames[iResponseFrameID].name = iResponseFrameID;
                }
                parent.removeChild(fileInputField);
            }catch(e){
                // do Nothing
            }
            fnCalcHgt();
            if(displayImage != "" && displayImage != 'undefined'){
                document.getElementsByName("IMAGEDISPLAY")[0].style.visibility = '';
                document.getElementsByName("IMAGEDISPLAY")[0].src = "Images\\Signature\\" + displayImage;
            }else{
                document.getElementsByName("IMAGEDISPLAY")[0].style.visibility = 'hidden';
            }
                //Added for GI Module
                if(document.getElementById("targetLocation").value != null && document.getElementById("targetLocation").value != "null" && document.getElementById("targetLocation").value != ""){
                    document.getElementById("IMAGEDIV").style.visibility = 'hidden';
                }
        }
        
        function createRequestIFrame(height,width) {
                var requestIFrame = document.createElement('iframe');
                requestIFrame.setAttribute('id','RequestFrame');
                requestIFrame.setAttribute('name','RequestFrame');
                requestIFrame.setAttribute('class','TextNormal');
                requestIFrame.setAttribute('src','');
                requestIFrame.setAttribute('frameBorder','0');
                requestIFrame.setAttribute('height',height+'px');
                requestIFrame.setAttribute('width',width+'px');
                requestIFrame.setAttribute('scrolling','no');
                requestIFrame.style.border='0px none';
                requestIFrame.style.margin='0px';
                requestIFrame.style.padding='0px';
                return requestIFrame;
        }
        
        function createResponseIFrame() {
                var responseFrameContainer = document.createElement('div');
                responseFrameContainer.setAttribute('id','responseContainer');
                var iFrameID = 'ResponseFrame';
                var iFrameBody = '<iframe id=\"' + iFrameID + '\"' 
                                                + ' name=\"' + iFrameID + '\"'
                                                + ' src=\"\" scrolling=\"no\" frameBorder=\"0\" onLoad=\"responseHandler()\" style=\"border:0px none; width:1px; height: 1px;\"><\/iframe>';
                responseFrameContainer.innerHTML = iFrameBody;
                return responseFrameContainer;
        }
        
        function responseHandler() {
            var responseXml;
            var iFrameName;
            var imgFileName;
            var uploadFineName;
            if(getEventSourceElement(event)) {
                    iFrameName = getEventSourceElement(event).name;
            }
            if(navigator.userAgent.indexOf("MSIE ") != -1 || (navigator.userAgent.indexOf("Trident") != -1 && navigator.userAgent.indexOf("rv") != -1)) {//ie11 changes
                    responseXml = new ActiveXObject("Microsoft.XMLDOM");
                    responseXml.async = false;
                    responseXml.load(document.getElementById(iFrameName).contentWindow.document.XMLDocument);
                    attachMentData = responseXml.xml;       
                    if(responseXml.selectSingleNode("//EDESC")){
                        var errorDesc = responseXml.selectSingleNode("//EDESC").text;
                        var ecode      =responseXml.selectSingleNode("//ECODE").text;
                        var sizeLimit  =responseXml.selectSingleNode("//SIZE").text;
                        var errorText = ecode+" "+errorDesc+":"+sizeLimit+" bytes";
                        ShowErrorDialog('E',errorText);
                    }  
                    if(responseXml.selectSingleNode("//FTYPE")){
                        document.getElementsByName("IMAGEDISPLAY")[0].style.visibility = '';
                        document.getElementsByName("IMAGEDISPLAY")[0].src = "Images\\Signature\\" + responseXml.selectSingleNode("//FTYPE").text;
                        document.getElementById("BTN_OK_IMG").disabled = false;
                        /* FC 11.4 NLS Changes */
                             //alert("File Transferred Successfully");
                             alert(mainWin.getItemDesc("LBL_FILETSFRSUCCESS"));     
                                                
                    }                    
            }
            else if(document.implementation && document.implementation.createDocument)	{
                    responseXml = document.getElementById(iFrameName).contentDocument;
            }
        }
        
        function fnSaveImageUpload(){
            var newWinParams = new Object();
            newWinParams.attachMent = attachMentData;
            window.returnValue = newWinParams;  
            self.close();
        }
        
        function fnExitUpload(){
            self.close();
        }
        
        function fnCalcHgt()
         {
            var l_tmp_scr_type = 'medium';
             var scrHeight = parseInt("512");
             var l_DivFooter = document.getElementById("DIVFooter").offsetHeight;
             var l_DivTmpHgt = parseInt(scrHeight)-parseInt(l_DivFooter)-35;
             document.getElementById("DIVMainTmp").style.height = parseInt(l_DivTmpHgt)+'px';
             document.getElementById("DIVMainTmp").style.width = parseInt("495")+'px';
         }
    </script>

	</div>
  </body>
</html>
