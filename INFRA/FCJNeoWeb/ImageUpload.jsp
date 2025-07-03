<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : ImageUpload.jsp
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

Copyright © 2004-2016 by Oracle Financial Services Software Limited..
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes

  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 23-Sep-2016
  **  Modified Reason      : Code change done to restrict right click on the signature/image displayed.
  **  Retro Source         : 9NT1606_12_0_2_CREDIT_AGRICOLE_EGYPT
  **  Search String        : 9NT1606_12_2_RETRO_12_0_2_23656542
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 18-Oct-2016
  **  Modified Reason      : Code changes done to disable file browse button during modify operation
  **  Retro Source         : 9NT1606_12_1_MUFG_ALTERNATIVE_FUND_SERVICES_LIMITED 
  **  Search String        : 9NT1606_12_2_RETRO_12_1_24901851
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 30-Nov-2016
  **  Modified Reason      : SYSTEM MUST THROW ERROR WHILE UPLOAD THE IMAGE OF GREATER SIZE IN GOOGLECHROME 
  **  Retro Source         : 9NT1606_12_1_PRASAC_MICROFINANCE_INSTITUTION
  **  Search String        : 9NT1606_12_2_RETRO_12_1_25160101
  
  **  Modified By          : Ambika Selvaraj
  **  Modified On          : 15-Sep-2017
  **  Modified Reason      : The -ms-filter property used for flipping signature/image is deprecated from IE9. Canvas object is used instead. Changes done for the same. 
  **  Retro Source         : 9NT1606_12_0_3_DHAKA_BANK_LTD
  **  Search String        : 9NT1606_12_4_RETRO_12_0_3_26780544
  
  **  Modified By          : Ambika Selvaraj
  **  Modified On          : 18-Jun-2018
  **  Modified Reason      : Increasing Image View area. 
  **  Search String        : 9NT1606_14_1_RETRO_12_4_28113965
--------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%
    request.setCharacterEncoding("UTF-8"); 
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 );    
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String Strlang          = (String)session.getAttribute("LANG");
    String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
    String StrUserId        = (String) session.getAttribute("USERID");
    String entity        = (String) session.getAttribute("ENTITY");
    String strTheme         = (String)session.getAttribute("THEME");
    String ieCss            = (String)session.getAttribute("IECSS");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");    
    String currBranch       = (String)session.getAttribute("BRANCH_CODE");
    String browserCSS       = (String)session.getAttribute("BROWSER_CSS");
    String CSRFtoken        = (String)session.getAttribute("X-CSRFTOKEN");

    Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
    
    String noScriptLabel    = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String imagePath        = "Images/"+strTheme.substring(0,strTheme.indexOf(".css"));
   /* # BUG 15978732 fixes start */ 
    String pkName           = FCUtility.validateParameter(request.getParameter("keyName"));
    String pkColName        = FCUtility.validateParameter(request.getParameter("pkColName"));
  /* security fixes for WF starts*/
    if(pkColName!=null)
    pkColName           = pkColName.replace("|","~");
    String pkColValues      = FCUtility.validateParameter(request.getParameter("pkColVal"));
    if(pkColValues!=null)
    pkColValues           = pkColValues.replace("|","~");
    /* security fixes for WF ends*/
    String seqNo            = FCUtility.validateParameter(request.getParameter("seqNo"));
    String imageName        = FCUtility.validateParameter(request.getParameter("image"));
    String actionCode       = FCUtility.validateParameter(request.getParameter("action"));
    String title            = FCUtility.validateParameter(request.getParameter("title"));
    String upload           = FCUtility.validateParameter(request.getParameter("upload"));
    String functionId       = FCUtility.validateParameter(request.getParameter("functionId"));
    String imageFieldName   = FCUtility.validateParameter(request.getParameter("imgFieldName"));
    String targetLocation   = FCUtility.validateParameter(request.getParameter("targetLocation"));
    String rowIndex         = FCUtility.validateParameter(request.getParameter("rowIndex"));
   /* # BUG 15978732 fixes end */ 
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>

<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
        <title><%=StringEscapeUtils.escapeHTML(title)%></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <!--<link href="Theme/<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>-->  
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <!--<link href="Theme/<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
        <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">
        <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>
        <!--<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>-->
        <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
        <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
        <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
        
        <!--HTML5 Changes Start-->
        <!--
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_upload.js"></script>
    </head>
    <body  class="BODYForm" onload="" oncontextmenu="return false;" >
    <div id="DIVif1" >
         <oj-dialog id="scrollingDialog"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"  
                      position.of="window"  style="height: 98vh;min-height:98vh;max-height:98vh" >
   
       
               <DIV   slot=header id="wndtitle" class="oj-dialog-title" >
                    <h1><%=StringEscapeUtils.escapeHTML(title)%>&nbsp;</h1>
                </DIV>
            
               <DIV slot="body" id="wndwidth">
        <div id="DIVWNDContainer">
            
            <div >
                <div  id="DIVMainTmp"  style="overflow: hidden;">
                    <div  id="DIVToolbar" style="width:100%">
                        <div class="oj-flex-bar">
                
                                            <div class="oj-flex-bar-start ">
                                                
                                                <div>
                                                <input type="File" class="oj-sm-padding-1x" label_value="Select" id="FILEUPLOAD" dbt="" dbc="" name="FILEUPLOAD" dtype="" size="" required="0" >
                                                </div>
                                                
                                                &nbsp;&nbsp;
                                                <oj-BUTTON  LABEL_VALUE="Upload" ID="" DBT="" DBC="" NAME="UPLOAD" DTYPE="" SIZE="" onclick="createXML()" REQUIRED="" ><%=StringEscapeUtils.escapeHTML(upload)%></oj-BUTTON>
                                                &nbsp;&nbsp;
                                                <oj-button   name="incSize"  id="incSize" onClick="enlargeImage()"  title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_ZOOMIN"))%>"><span slot="startIcon" class="oj-ux-ico-zoom-in"  id="imgAdd_incSize" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_ZOOMIN"))%>"></span> </oj-button>&nbsp;
                                                <oj-button   name="decSize"  id="decSize" onClick="dropImage()"  title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_ZOOMOUT"))%>"><span slot="startIcon" class="oj-ux-ico-zoom-out"  id="imgAdd_decSize" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_ZOOMOUT"))%>"></span></oj-button>&nbsp;
                                                <oj-button   name="rotate"   id="rotate" onClick="fnCrotate()" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_RACWISE"))%>"><span slot="startIcon" class="oj-ux-ico-rotate-cw"  id="imgAdd_rcWise" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_RCWISE"))%>"></span></oj-button>&nbsp;
                                                <oj-button   name="rotate"   id="rotate" onClick="fnArotate()"  title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_RACWISE"))%>"><span slot="startIcon" class="oj-ux-ico-rotate-ccw"  id="imgAdd_racWise" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_RACWISE"))%>"></span></oj-button>&nbsp;
                                                <oj-button   name="flipH"   id="flipH" onClick="fnFlipH()"  title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_HORIZONTAL"))%>"><span slot="startIcon" class="oj-ux-ico-expand ico-rotate-45" id="imgAdd_horizontal" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_HORIZONTAL"))%>"></span></oj-button>&nbsp;
                                                <oj-button   name="flipV"   id="flipV" onClick="fnFlipV()"  title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_VERTICAL"))%>"><span slot="startIcon" class="oj-ux-ico-expand ico-rotate-135"  id="imgAdd_vertical" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_VERTICAL"))%>"></span></oj-button>
                                            
                    </div>
                </div>
                         <label class="LBLinv" for=""><%=StringEscapeUtils.escapeHTML(targetLocation)%></label><INPUT TYPE="HIDDEN"  NAME="targetLocation" value=<%=StringEscapeUtils.escapeHTML(targetLocation)%>>
            
                    
                    <div style="display:block; height:328px; width:688px;" class="oj-sm-margin-4x-top DIVText"  ID="IMAGEDIV">
                        <label class="LABELNormal" FOR=""></label>
						<%-- <IMG CLASS="IMGButton" SRC=""  LABEL_VALUE="" ID="IMAGEDISPLAY" DBT="" DBC="" NAME="IMAGEDISPLAY" DTYPE="" SIZE="" REQUIRED="" ALT="">--%>
						<!--9NT1606_12_2_RETRO_12_0_2_23656542 changes-->
						<iframe id="IMAGEDISPLAY" onload ="disableClick();" style="display:block; height:335px; width:580px; overflow:auto;"  frameborder='0' NAME="IMAGEDISPLAY" SRC="">
            			</iframe>
                        <INPUT TYPE='HIDDEN' LABEL_VALUE='' ID='X-CSRFTOKEN' DBT='' DBC='' NAME='X-CSRFTOKEN' DTYPE='' SIZE='' REQUIRED='' class='hidden'>
                        <canvas id="canvas"  style="overflow:auto;height:335px; width:480px;  "></canvas>
                    </div>
                </div>
                
        </div>
    
        <%
        if(request.getHeader("User-Agent").contains("MSIE") || (request.getHeader("User-Agent").contains("Trident") && request.getHeader("User-Agent").contains("rv")) ){//ie11 changes
        %>
            <style>
                .IMGButton{cursor: default; FILTER: progid:DXImageTransform.Microsoft.Matrix(sizingmethod='auto expand') flipv flipv fliph fliph }    
            </style>    
        <%        
        }        
        %>
        <script type="text/javascript">
            var mainWin         = parent.mainWin;
            var attachMentData  = "";
            var displayImage    = '<%=StringEscapeUtils.escapeJavaScript(imageName)%>';
            var actionCode      = '<%=StringEscapeUtils.escapeJavaScript(actionCode)%>';
            var rowIndex        = '<%=StringEscapeUtils.escapeJavaScript(rowIndex)%>';
            var seqNo           = '<%=StringEscapeUtils.escapeJavaScript(seqNo)%>';
            var functionId      = '<%=StringEscapeUtils.escapeJavaScript(functionId)%>';
            var strTheme        = '<%=StringEscapeUtils.escapeJavaScript(strTheme)%>';            
            var parentScrID     = "ChildWin";   
            if(typeof(parent.fromSubScr) == 'undefined') {
                parentScrID = parent.seqNo;
            }
            var imgUploadDIVWidth     = parent.parent.document.getElementById(parentScrID).style.width;
            var imgUploadDIVHeight    = parent.parent.document.getElementById(parentScrID).clientHeight;
            var imgUploadIFWidth      = parent.parent.document.getElementById(parentScrID).children[0].style.width;
            var imgUploadIFHeight     = parent.parent.document.getElementById(parentScrID).children[0].clientHeight;
            var imgIFrame;
            var uploadedImgObj;
            
            function populateFileName(){
             var iFrameFormDocument = document.getElementById('RequestFrame').contentWindow.document;
              var fileName = iFrameFormDocument.getElementById("FILEUPLOAD").value;
            if(fileName == ""){
                return false;
            }
            fileName = fileName.substring(fileName.lastIndexOf("\\")+1);
            iFrameFormDocument.getElementById("selectedFile").innerHTML=fileName;
            
            }
            
          function setHeights() {
              
              var winObj = parent.document.getElementById("ChildWin");
              winObj.style.visibility = "visible";
              winObj.style.display = "block";

              winObj.style.display = "block";
              winObj.style.height = "100%";
              winObj.style.width = "100%";//For DIV
              winObj.style.width = "100%";
              winObj.style.top = "0px";
              winObj.children[0].style.height = "100%";//For IFRAME
              winObj.children[0].style.width = "100%";
              winObj.children[0].style.top = "0px";
              return winObj;
          }
            
        function createXML(){
            setinit();
            var iFrameFormDocument = document.getElementById('RequestFrame').contentWindow.document;
            var fileName = iFrameFormDocument.getElementsByName("FILEUPLOAD")[0].value;
            if(fileName == ""){
                return false;
            }
            fileName = fileName.substring(fileName.lastIndexOf("\\")+1);
            var pkName       = '<%=StringEscapeUtils.escapeJavaScript(pkName)%>';
            var strFormData  = "<FILEATTACHMENT>";
            strFormData += "<PKCOLNAME>" + '<%=StringEscapeUtils.escapeJavaScript(pkColName)%>' + "</PKCOLNAME>";
            strFormData += "<PKCOLVALUE>" + '<%=StringEscapeUtils.escapeJavaScript(pkColValues)%>' + "</PKCOLVALUE>";
            strFormData += "<SOURCEFILE>" +  iFrameFormDocument.getElementsByName("FILEUPLOAD")[0].value + "</SOURCEFILE>";
            strFormData += "<SEQNO>" + '<%=StringEscapeUtils.escapeJavaScript(seqNo)%>' + "</SEQNO>";
            strFormData += "<FILENAME>" + pkName + fileName + "</FILENAME>";
            strFormData += "<IMGFIELDNAME>" + '<%=StringEscapeUtils.escapeJavaScript(imageFieldName)%>' + "</IMGFIELDNAME>";
            strFormData += "<FUNCTIONID>" + '<%=StringEscapeUtils.escapeJavaScript(functionId)%>' + "</FUNCTIONID>";
            strFormData += "<CURRENTBRANCH>" + '<%=StringEscapeUtils.escapeJavaScript(currBranch)%>' + "</CURRENTBRANCH>";
            strFormData += "<USERID>" + '<%=StringEscapeUtils.escapeJavaScript(StrUserId)%>' + "</USERID>";            
            if(document.getElementsByName("targetLocation")[0].value != null && document.getElementsByName("targetLocation")[0].value != "null" && document.getElementsByName("targetLocation")[0].value != ""){
                strFormData += "<TARGETLOCATION>" + '<%=StringEscapeUtils.escapeJavaScript(targetLocation)%>' + "</TARGETLOCATION>";
            }
            strFormData += "</FILEATTACHMENT>";
            
//            fnCalcHgt();
            iFrameFormDocument.getElementsByName("REQXML")[0].value = strFormData;
            iFrameFormDocument.getElementById('fileUploadForm').target = 'ResponseFrame';
            iFrameFormDocument.getElementById("fileUploadForm").submit();
            
             document.getElementById("IMAGEDISPLAY").style.display='';
             document.getElementById("canvas").style.display='none';
        }
        
        function responseHandler(e) {
            var responseXml;
            var iFrameName;
            var event = window.event || e;
            var srcElem = getEventSourceElement(event);
            if(srcElem) {
                iFrameName = srcElem.name;
            }
            responseXml = loadIFrameContent(document.getElementById(iFrameName));            
        }
                        
        function fnPostLoadImageScr(){ 
            setinit();    
            //fnCalcHgt();
            if (actionCode == "" || actionCode == null){
                document.getElementsByName("UPLOAD")[0].disabled = true;
                document.getElementsByName("FILEUPLOAD")[0].disabled = true;
            }
            try{
                var fileInputField = document.getElementsByName("FILEUPLOAD")[0];
                var parent = fileInputField.parentNode;
                var csrfVal = "<%= StringEscapeUtils.escapeJavaScript(CSRFtoken)%>";
                var iFrameBody = "";
                iFrameBody += '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"><html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>"><head>';
                iFrameBody += '<link href="Theme/<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>';
                iFrameBody += '<link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">';
                iFrameBody += '<link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>';
//                iFrameBody += '<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>';
                iFrameBody += '<link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>';
                iFrameBody += '<link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>';
                iFrameBody += '<link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>';
                debugger;
              
                iFrameBody += '</head><body \">';
                iFrameBody += "<div slot='body'> <FORM id='fileUploadForm' method='post' action='FCUBSSignatureServlet?actionType=UPLOAD' enctype='multipart/form-data' onsubmit='createXML();'>";
                iFrameBody += "<label class='LBLinv' for='REQXML'></label><input type=\"hidden\" name=\"X-CSRFTOKEN\"  id=\"X-CSRFTOKEN\" value=\"<%=StringEscapeUtils.escapeHTML(CSRFtoken)%>\" />";
                iFrameBody += "<label class='LBLinv' for='REQXML'></label><INPUT TYPE='HIDDEN' LABEL_VALUE='' ID='' DBT='' DBC='' NAME='REQXML' DTYPE='' SIZE='' REQUIRED='' class='hidden'>";
                iFrameBody += "<label class='LBLinv' for='REQXML'></label><INPUT TYPE='HIDDEN' LABEL_VALUE='' ID='' DBT='' DBC='' NAME='FILENAME' DTYPE='' SIZE='' REQUIRED='' class='hidden'>";
                
                iFrameBody += "<div class='upload'>";
                iFrameBody += '<oj-button label_value="Browse"  name="BROWSE"  class="oj-button oj-button-outlined-chrome oj-button-text-only oj-enabled oj-complete oj-default"><button class="oj-button-button" aria-labelledby="_oj0|text"><div class="oj-button-label"><span><span class="oj-button-text" id="_ojs0|text">Browse</span></span></div></button></oj-button>';
                iFrameBody += "<input type='File' class='oj-sm-padding-1x' label_value='Select' id='FILEUPLOAD' dbt='' dbc='' name='FILEUPLOAD' dtype='' size='' required='0'' onchange='parent.populateFileName()'"+((actionCode == "" || actionCode == null)?" disabled":"")+" >";
                iFrameBody += "<span id='selectedFile' class='fileName'>Select file..</span>";
                iFrameBody += "</div>";
                iFrameBody += "</FORM></div></body></html>";
                
                var iFrameHeight = fileInputField.offsetHeight;
                var iFrameWidth =  fileInputField.offsetWidth;
                
                var requestIFrame = createRequestIFrame(iFrameHeight+5,iFrameWidth+50);
                parent.appendChild(requestIFrame);
                var iRequestFrameID = 'RequestFrame';
                if(self.frames[iRequestFrameID].name != iRequestFrameID){
                    self.frames[iRequestFrameID].name = iRequestFrameID;
                }
                document.getElementById('RequestFrame').contentWindow.document.write(iFrameBody);
                var responseIFrame = createResponseIFrame();
                parent.appendChild(responseIFrame);
                var iResponseFrameID = 'ResponseFrame';
                if(self.frames[iResponseFrameID].name != iResponseFrameID){
                    self.frames[iResponseFrameID].name = iResponseFrameID;
                }
                parent.removeChild(fileInputField);
               
                
            }catch(e){}
//            fnCalcHgt();
            if(displayImage != "" && displayImage != 'undefined'){
               var csrfVal = "<%= StringEscapeUtils.escapeJavaScript(CSRFtoken)%>";
                document.getElementsByName("IMAGEDISPLAY")[0].style.visibility = '';
                document.getElementsByName('X-CSRFTOKEN').value=csrfVal;
				document.getElementsByName("IMAGEDISPLAY")[0].src = "\TempForward.jsp?action=FCUBSSignatureServlet&fileName="+ displayImage+"&actionType=READ";
                if(actionCode == "MODIFY"){ //9NT1606_12_2_RETRO_12_1_24901851 added
                  document.getElementsByName("UPLOAD")[0].disabled = true;
				  try{ //9NT1606_12_2_RETRO_12_1_24901851 starts
					document.frames[0].document.getElementsByName("FILEUPLOAD")[0].disabled = true;
				  }catch(e){}
				} //9NT1606_12_2_RETRO_12_1_24901851 ends  
            }else{
                document.getElementsByName("IMAGEDISPLAY")[0].style.visibility = 'hidden';
            }
            if(document.getElementsByName("targetLocation")[0].value != null && document.getElementsByName("targetLocation")[0].value != "null" && document.getElementsByName("targetLocation")[0].value != ""){
                document.getElementById("IMAGEDIV").style.visibility = 'hidden';
            }
            document.getElementById("BTN_EXIT_IMG").focus();
        }
        
        function createRequestIFrame(height,width) {
            var requestIFrame = document.createElement('iframe');
            requestIFrame.setAttribute('id','RequestFrame');
            requestIFrame.setAttribute('name','RequestFrame');
            requestIFrame.setAttribute('class','TextNormal');
            requestIFrame.setAttribute('src','');
            requestIFrame.setAttribute('frameBorder','0');
		    requestIFrame.setAttribute('style','width:14rem;height:3rem');
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
                                                + ' src=\"\" scrolling=\"no\" frameBorder=\"0\" onLoad=\"responseHandler(event)\" style=\"border:0px none; width:1px; height: 1px;\"><\/iframe>';
                responseFrameContainer.innerHTML = iFrameBody;
                
                responseFrameContainer.style.display="none";
                return responseFrameContainer;
        }
        
        function responseHandler(e) {
            var responseXml;
            var iFrameName;
            var event = window.event || e;
            var srcElem = getEventSourceElement(event);
            if(srcElem) {
                iFrameName = srcElem.name;
            }            
            responseXml = loadIFrameContent(document.getElementById(iFrameName));
            attachMentData = getXMLString(responseXml);
            /*12.0.1 Security Changes Starts*/
            var errorDesc;
            var ecode;
            var sizeLimit;
            var errorText;
            if(selectSingleNode(responseXml, "//ECODE")){
            //if(selectSingleNode(responseXml, "//ECODE").text=='SM-SIG100'){ //9NT1606_12_2_RETRO_12_1_25160101 changes 
			  if( getNodeText(selectSingleNode(responseXml, "//ECODE"))=='SM-SIG100'){ //9NT1606_12_2_RETRO_12_1_25160101 changes 
                 errorDesc = getNodeText(selectSingleNode(responseXml, "//EDESC"));
                 ecode     = getNodeText(selectSingleNode(responseXml, "//ECODE"));
                 sizeLimit = getNodeText(selectSingleNode(responseXml, "//SIZE"));
                 errorText = errorDesc+":"+sizeLimit+" bytes";
                parent.parent.mask(); //30893251 security fix
                parent.parent.showAlerts(fnBuildAlertXML(ecode,'E',errorText), 'E');//30893251 security fix
            } 
            //if(selectSingleNode(responseXml, "//ECODE").text=='SM-SIG200'){ //9NT1606_12_2_RETRO_12_1_25160101 changes 
				if(getNodeText(selectSingleNode(responseXml, "//ECODE"))=='SM-SIG200'){ //9NT1606_12_2_RETRO_12_1_25160101 changes 
                errorDesc = getNodeText(selectSingleNode(responseXml, "//EDESC"));
                ecode     = getNodeText(selectSingleNode(responseXml, "//ECODE")); 
                errorText = errorDesc;
                parent.parent.mask();//30893251 security fix
                parent.parent.showAlerts(fnBuildAlertXML(ecode,'E',errorText), 'E');//30893251 security fix
            } 
             }
             /*12.0.1 Security Changes Ends*/
            if(selectSingleNode(responseXml, "//FTYPE")){
                var csrfVal = "<%= StringEscapeUtils.escapeJavaScript(CSRFtoken)%>";
                document.getElementsByName("IMAGEDISPLAY")[0].style.visibility = '';
                document.getElementsByName("IMAGEDISPLAY")[0].src = "\TempForward.jsp?action=FCUBSSignatureServlet&fileName="+ getNodeText(selectSingleNode(responseXml, "//FTYPE"))+"&actionType=READ";
            }
        }
        
        function fnSaveImageUpload(){
            if (attachMentData.length > 0 && attachMentData.indexOf("<FTYPE>")!=-1   ){
                parent.attachmentData[rowIndex - 1] = attachMentData;
                parent.fileNameArray[rowIndex - 1]  = attachMentData.substring(attachMentData.indexOf("<FTYPE>") + 7, attachMentData.indexOf("</FTYPE>"));
            }
            fnExitUpload();
        }
        
        function fnExitUpload(){
           //            parent.unmask();
            if (parent.seqNo) {
                containerDIV = parent.seqNo;                    
            }            
            var childDivObj = parent.document.getElementById("ChildWin");
            var parentDiv= parent.document.getElementById("Div_ChildWin");
            parentDiv.removeChild(childDivObj);
            window.frameElement.src = "";
            window.frameElement.height = 0;
            window.frameElement.width = 0;
        }
        
        function fnCalcHgt(){            
            var containerDIV = "ChildWin";
            parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);
            var scrWidth = parent.document.getElementById("DIVWNDContainer").offsetWidth;
            var scrHeight = parseInt(parent.document.getElementById("DIVWNDContainer").offsetHeight);
        
            if(parseInt(mainWin.document.getElementById("vtab").offsetHeight) > 0 && scrHeight > parseInt(mainWin.document.getElementById("vtab").offsetHeight) -4) //Fix for 18433312 
                scrHeight = parseInt(mainWin.document.getElementById("vtab").offsetHeight -50);
            
            parent.document.getElementById(containerDIV).style.width = (scrWidth - 200) + "px";
            parent.document.getElementById(containerDIV).children[0].style.width = (scrWidth - 200) + "px";
            parent.document.getElementById(containerDIV).style.height  = scrHeight +"px";
            parent.document.getElementById(containerDIV).children[0].style.height  = scrHeight +"px";
            parent.document.getElementById(containerDIV).style.top = document.getElementById("WNDtitlebar").offsetHeight+"px";
            parent.document.getElementById("ChildWin").style.left = "4px";
        
            //var l_DivFooter = document.getElementById("DIVFooter").offsetHeight;
            var l_DivFooter = document.getElementById("DIV_AUDIT_BUTTONS").offsetHeight;
            var l_DivTmpHgt = parseInt(scrHeight)-parseInt(l_DivFooter)-document.getElementById("WNDtitlebar").offsetHeight;
            document.getElementById("DIVMainTmp").style.height = parseInt(l_DivTmpHgt)+'px';
            document.getElementById("DIVMainTmp").style.width = scrWidth - 200 + "px";        
            document.getElementById("IMAGEDIV").style.height = (document.getElementById("DIVMainTmp").offsetHeight) - (document.getElementById("DIVToolbar").offsetHeight ) +"px";
            document.getElementById("IMAGEDIV").style.width = scrWidth -200+ "px";
			//9NT1606_14_1_RETRO_12_4_28113965 Starts
			document.getElementById("IMAGEDISPLAY").style.height = (document.getElementById("DIVMainTmp").offsetHeight) - (document.getElementById("DIVToolbar").offsetHeight ) +"px";
            document.getElementById("IMAGEDISPLAY").style.width = scrWidth -200+ "px";
			//9NT1606_14_1_RETRO_12_4_28113965 Ends
            if (containerDIV == "ChildWin") {
                if (parent.seqNo) {
                    containerDIV = parent.seqNo;                    
                    if((parent.parent.document.getElementById(containerDIV).offsetHeight - document.getElementById("WNDtitlebar").offsetHeight) < parent.document.getElementById("ChildWin").offsetHeight){
                        parent.parent.document.getElementById(containerDIV).style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight*2 + "px";
                        parent.parent.document.getElementById(containerDIV).children[0].style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight*2 + "px";
                    }
                }
            } 
            parent.mask();
         }
        
        function getUploadImageObj()
        {
            
               imgIFrame = document.getElementById('IMAGEDISPLAY');
               if( imgIFrame.contentWindow.document.getElementsByTagName("IMG").length> 0){
                       var imgObj =  imgIFrame.contentWindow.document.getElementsByTagName("IMG")[0];
                       imgObj.setAttribute("id", "uploadImg"); 
               }
              uploadedImgObj= imgIFrame.contentWindow.document.getElementById("uploadImg");
        }
        
        function enlargeImage(){ 
                 getUploadImageObj();
                 document.getElementById("IMAGEDISPLAY").style.display='';
                 document.getElementById("canvas").style.display='none';
                 uploadedImgObj.style.display='';
                if(navigator.userAgent.indexOf("Opera") != -1){
                    alert(mainWin.getItemDesc("LBL_NSUPPORT"))
                    return;
                }
				//9NT1606_12_4_RETRO_12_0_3_26780544 changes Commented
                //if(navigator.userAgent.indexOf("MSIE ") == -1 && (navigator.userAgent.indexOf("Trident") == -1 && navigator.userAgent.indexOf("rv") == -1)){ //ie11 changes 
                      objCanvas = document.getElementById('canvas');	   
                      document.getElementById("IMAGEDISPLAY").className = "IMGBUTTON";
                      objCanvas.className = "hidden";                
                //}//9NT1606_12_4_RETRO_12_0_3_26780544 changes Commented
                if(uploadedImgObj.height < 1000){
                        if(navigator.userAgent.indexOf("MSIE ") == -1 && (navigator.userAgent.indexOf("Trident") == -1 && navigator.userAgent.indexOf("rv") == -1)){ //ie11 changes
                            uploadedImgObj.width=uploadedImgObj.width+100;
                            document.getElementById("IMAGEDISPLAY").width= document.getElementById("IMAGEDISPLAY").width+100;
                        }    
                        uploadedImgObj.height = uploadedImgObj.height +100;
                        document.getElementById("IMAGEDISPLAY").height= document.getElementById("IMAGEDISPLAY").height+100;
                        document.getElementById("decSize").disabled = false;    
                }else{
                    document.getElementById("incSize").disabled = true;   
                }               
            }
        
        function dropImage(){   
               getUploadImageObj();
               document.getElementById("IMAGEDISPLAY").style.display='';
               document.getElementById("canvas").style.display='none';
               uploadedImgObj.style.display='';
               if(navigator.userAgent.indexOf("Opera") != -1){
                     alert(mainWin.getItemDesc("LBL_NSUPPORT"))
                      return;
               }
			   //9NT1606_12_4_RETRO_12_0_3_26780544 changes Commented
               //if(navigator.userAgent.indexOf("MSIE ") == -1 && (navigator.userAgent.indexOf("Trident") == -1 && navigator.userAgent.indexOf("rv") == -1)){//ie11 changes  
                      objCanvas = document.getElementById('canvas');	   
                      document.getElementById("IMAGEDISPLAY").className = "IMGBUTTON";
                      objCanvas.className = "hidden";                
               //}//9NT1606_12_4_RETRO_12_0_3_26780544 changes Commented
               if(uploadedImgObj.height > 100){                
                       uploadedImgObj.height = uploadedImgObj.height - 100;
                       if(navigator.userAgent.indexOf("MSIE ") == -1 && (navigator.userAgent.indexOf("Trident") == -1 && navigator.userAgent.indexOf("rv") == -1)){//ie11 changes 
                            uploadedImgObj.width=uploadedImgObj.width-100;
                       }
                       document.getElementById("incSize").disabled = false;
                }else {
                            document.getElementById("decSize").disabled = true;     
                      }             
        }
       
        function fnCrotate(){ 
            angle += 90;
            if (angle > 359){
                    angle = 0;
            }
            SetRotation(angle);
        }
        
        function fnArotate(){ 
            angle -= 90;
            if (angle < 0){
                    angle = 360;
            }
            SetRotation(angle);
        }

        function SetRotation(deg){
                getUploadImageObj();
                uploadedImgObj.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11='1.0', sizingmethod='auto expand')";   
                if(navigator.userAgent.indexOf("Opera") != -1){
                            alert(mainWin.getItemDesc("LBL_NSUPPORT"))
                            return;
                }
                fnRotateImage(uploadedImgObj,deg);
        }

        function fnFlipH(){ 
                getUploadImageObj();
                if(navigator.userAgent.indexOf("Opera") != -1){
                        alert(mainWin.getItemDesc("LBL_NSUPPORT"))
                        return;
                }
               fnFlipHorizontal(uploadedImgObj);             
        }

        function fnFlipV(){    
           getUploadImageObj();
            if(navigator.userAgent.indexOf("Opera") != -1){
                alert(mainWin.getItemDesc("LBL_NSUPPORT"));                
                return;
            }
            fnFlipVerticalal(uploadedImgObj);
        }
        
        function setinit(){
            angle = 0;
            deg2rad = Math.PI / 180;
            hz=1;
            vt=1;
            var myIFrame = document.getElementById('IMAGEDISPLAY');
           if(myIFrame.getElementsByTagName("IMG").length> 0){
                var imgTagObj = myIFrame.getElementsByTagName("IMG")[0];
                imgTagObj.id = 'uploadImg';
				//9NT1606_12_4_RETRO_12_0_3_26780544 changes Commented
                //if(navigator.userAgent.indexOf("MSIE ") == -1 && (navigator.userAgent.indexOf("Trident") == -1 && navigator.userAgent.indexOf("rv") == -1)){//ie11 changes               
                    img = document.getElementById('IMAGEDISPLAY');
                    imgh = document.getElementById('IMAGEDISPLAY').height;
                    objCanvas = document.getElementById('canvas');	   
                    if(!objCanvas || !objCanvas.getContext){
                       objCanvas.parentNode.removeChild(canvas);
                    } else {
                       imgTagObj.style.visibility = 'hidden';
                    }                
				//9NT1606_12_4_RETRO_12_0_3_26780544 changes Commented
                /*}else{                 
                    fnCrotate();
                    fnFlipH();
                    fnFlipV();          
                    //document.getElementById("IMAGEDIV").innerHTML = "<LABEL class=LABELNormal for=\"\"></LABEL><IMG class=IMGButton id=IMAGEDISPLAY style=\"VISIBILITY: hidden\" alt=\"\" src=\"\" name=IMAGEDISPLAY REQUIRED=\"\" DTYPE=\"\" DBC=\"\" DBT=\"\" LABEL_VALUE=\"\" SIZE=\"\"> "
                    document.getElementById("IMAGEDIV").innerHTML = "<LABEL class=LABELNormal for=\"\"></LABEL><iframe id=IMAGEDISPLAY style=\"overflow:hidden\"  scrolling=\"NO\" onload=\"this.style.height=IMAGEDISPLAY.document.body.scrollHeight + 5;this.style.width=IMAGEDISPLAY.document.body.scrollWidth + 5;\" frameborder=\'0\' NAME=\"IMAGEDISPLAY\" SRC=\"\"> "
                    
                }*/
          }
      }
        
        function fnCloseAlertWin() {
            unmask();
            return false;
        }
        
        function handleScrObj(scrObj,e){
            var e = window.event || e;
            if(e.keyCode == 9){
                document.frames[0].document.getElementsByName("FILEUPLOAD")[0].focus();
                preventpropagate(e);
                return false;
            }
        }
		//9NT1606_12_2_RETRO_12_0_2_23656542 starts
        function disableClick(){
            document.getElementById("IMAGEDISPLAY").contentWindow.document.oncontextmenu = function(){return false;};;  
        }  
		//9NT1606_12_2_RETRO_12_0_2_23656542 ends
        </script>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        </div>
        <div id="masker" class="masker" style="display:none">
            <div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none"><!--HTML5 Changes-->
                <iframe id="ifr_AlertWin" class="frames"  src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
            <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
            </div>
        </div>
        </div>
        </div>
        <DIV slot="footer">
                  <div class="oj-flex-bar oj-sm-margin-4x-bottom" >
                
                      <div class="oj-sm-margin-4x-top oj-flex-bar-end">
                      <oj-button   chroming="outlined" class="oj-sm-margin-1x" ID="BTN_EXIT_IMG" NAME="BTN_EXIT" VALUE="Exit" DEFAULT="Exit" onclick="fnExitUpload()" label=<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_EXIT"))%> >
                    </oj-button>
                    
                    <oj-button  class="action-button-primary oj-sm-margin-1x" chroming="solid"  ID="BTN_OK_IMG" NAME="BTN_OK" VALUE="Ok" DEFAULT="Ok" onclick="fnSaveImageUpload()" >
                    <%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_OK"))%></oj-button>
                    
                      </div>  
                  </div>
                </div>
         </oj-dialog>
    </div>
    </body>
</html>
