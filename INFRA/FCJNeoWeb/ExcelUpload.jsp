<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : Remarks.jsp
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

Copyright © 2010-2016  by Oracle Financial Services  Software Limited..
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
--------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import = "java.util.Map" %>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String Strlang         = (String)session.getAttribute("LANG");
    String StrlangISOMap   = (String)session.getAttribute("LANGISOMAP");
    String StrUserId       = (String) session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String strTheme     = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String currBranch       = (String)session.getAttribute("BRANCH_CODE");
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");
    String ieCss         = (String)session.getAttribute("IECSS");

    Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
      
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String remarks = (String)itemDescMap.get("LBL_REMARKS");
    String exit = (String)itemDescMap.get("LBL_EXIT");
    String ok = (String)itemDescMap.get("LBL_OK");
    String upload = (String)itemDescMap.get("LBL_UPLOAD");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
  <head>
    <title>Excel Upload</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content=0>
    <!--<link href="Theme/<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
   <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
    <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
    <!--<link href="Theme/<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
    <!-- <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> -->
        <!--HTML5 Changes Start-->
        <%-- <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
    <%}%>--%><!--HTML5 Changes End -->

            <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>
            <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>
            <!--<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>-->
            <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
        
	
    <script type="text/javascript">
        var mainWin = parent.mainWin;
        var parentScrID = "ChildWin";   
        if(typeof(parent.fromSubScr) == 'undefined') {
            parentScrID = parent.seqNo;
        }
        var strTheme    = '<%= StringEscapeUtils.escapeJavaScript(strTheme)%>';
        var launcherDIVWidth     = parent.parent.document.getElementById(parentScrID).style.width;
        var launcherDIVHeight    = parent.parent.document.getElementById(parentScrID).style.height;
        var launcherIFWidth      = parent.parent.document.getElementById(parentScrID).children[0].style.width;
        var launcherIFHeight     = parent.parent.document.getElementById(parentScrID).children[0].style.height;
        var launcherResTreeHeight= parent.document.getElementById("DIVScrContainer").style.height;
        var launcherResTreeWidth = parent.document.getElementById("DIVScrContainer").style.width;
        var launcherLeft         = parent.parent.document.getElementById(parentScrID).style.left;
        var g_scrType           = 'S';
        var fromSubScr          = true;
    </script>
    <script type="text/javascript">
       
        function fnExit() {
            parent.fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, "", launcherLeft);
        }
        function resize_iframe() 
		{			
          document.getElementById("ResTree").style.width = document.getElementById("DIVif1").offsetWidth+"px" ;
          document.getElementById("ResTree").style.height = document.getElementById("DIVif1").offsetHeight+"px" ;

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
        
function fnPostLoadImageScr(){            
            
            try{
                var fileInputField = document.getElementsByName("FILEUPLOAD")[0];
                var parent = fileInputField.parentNode;
                var csrfVal = "<%= StringEscapeUtils.escapeJavaScript(CSRFtoken)%>";
                debugger;
                var iFrameBody = "";
                iFrameBody += '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"><html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>"><head>';
				iFrameBody += '<link href="Theme/<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>';
                                iFrameBody += '<link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>';
                                iFrameBody += ' <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>';
//                                iFrameBody += '<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>';
                                iFrameBody += '<link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>';
                                iFrameBody += '<link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>';
                                iFrameBody += '<link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>';
				//iFrameBody += '</head><body style=\" display:inline; padding:0px; margin:0px; border:0px none; \">';
                   iFrameBody += '</head><body \">';       
                   iFrameBody += "<div slot='body'> ";
                iFrameBody += "<FORM id='fileUploadForm' method='post' action='ExcelDownload?actionType=UPLOAD' enctype='multipart/form-data' onsubmit='createXML();'>";
                iFrameBody += "<INPUT TYPE='HIDDEN' LABEL_VALUE='' ID='' DBT='' DBC='' NAME='REQXML' DTYPE='' SIZE='' REQUIRED='' class='hidden'>";
                iFrameBody += "<INPUT TYPE='HIDDEN' LABEL_VALUE='' ID='' DBT='' DBC='' NAME='FILENAME' DTYPE='' SIZE='' REQUIRED='' class='hidden'>";				
                iFrameBody += "<INPUT TYPE='File' class='oj-sm-padding-1x' LABEL_VALUE='Select' ID='' DBT='' DBC='' NAME='FILEUPLOAD' DTYPE='' SIZE='' REQUIRED='0'/>";
                iFrameBody += "<input type=\"hidden\" name=\"X-CSRFTOKEN\" value=\""+csrfVal+"\" />";
                //iFrameBody += "</FORM></body></html>";
                iFrameBody += "</FORM></div></body></html>";                
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
            //fnCalcHgt();
            setHeights();
            
                
        }
        function fnCalcHgt(){
            parent.mask();
            var containerDIV = "ChildWin";
            
            var scrWidth = parent.document.getElementById("DIVWNDContainer").offsetWidth;
            var scrHeight = parseInt(parent.document.getElementById("DIVWNDContainer").offsetHeight);
			//9NT1606_12_4_RETRO_12_2_26441057 starts 
			var dashHeight = parseInt(parent.parent.document.getElementById("dashboard").offsetHeight);
            if((dashHeight!=0) && (scrHeight > dashHeight)){
                    scrHeight = dashHeight;
            }	
            /*Fix for 21303803*/ 
            /*if(scrHeight > parseInt(parent.parent.document.getElementById("dashboard").offsetHeight))
                scrHeight = parseInt(parent.parent.document.getElementById("dashboard").offsetHeight);*/
			//9NT1606_12_4_RETRO_12_2_26441057 ends
            /*Fix for 20607797 starts*/
            parent.document.getElementById(containerDIV).style.width = (scrWidth - 250) + "px";
            parent.document.getElementById(containerDIV).children[0].style.width = (scrWidth - 250) + "px";
            parent.document.getElementById(containerDIV).style.height  = parseInt(scrHeight/2+ 35) +"px";
            parent.document.getElementById(containerDIV).children[0].style.height  = parseInt(scrHeight/2 + 35) +"px";
            parent.document.getElementById(containerDIV).style.top = document.getElementById("WNDtitlebar").offsetHeight+"px";
            parent.document.getElementById("ChildWin").style.left = "4px";
            var l_DivFooter = document.getElementById("DIV_AUDIT_BUTTONS").offsetHeight;
            var l_DivTmpHgt = parseInt(parent.document.getElementById(containerDIV).offsetHeight)-parseInt(l_DivFooter)-document.getElementById("WNDtitlebar").offsetHeight;
            //document.getElementById("WNDcontent").style.height = parseInt(l_DivTmpHgt)+'px';
            //document.getElementById("WNDcontent").style.width = parent.document.getElementById(containerDIV).style.width; 
			/*Fix for 21303803 ends*/
            if (containerDIV == "ChildWin") {
                if (parent.seqNo) {
                    containerDIV = parent.seqNo;                    
                    if((parent.parent.document.getElementById(containerDIV).offsetHeight - document.getElementById("WNDtitlebar").offsetHeight) < parent.document.getElementById("ChildWin").offsetHeight){
                        parent.parent.document.getElementById(containerDIV).style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight*2 + "px";
                        parent.parent.document.getElementById(containerDIV).children[0].style.height = parent.document.getElementById("ChildWin").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight*2 + "px";
                    }
                }
            } 
         }

		  function createXML(){
                  debugger;
            var iFrameFormDocument = document.getElementById('RequestFrame').contentWindow.document;
            var fileName = iFrameFormDocument.getElementsByName("FILEUPLOAD")[0].value;
            if(fileName == ""){
                return false;
            }
            fileName = fileName.substring(fileName.lastIndexOf("\\")+1);
            var pkName = '';
            var strFormData  = "<FILEATTACHMENT>";
            strFormData += "<SOURCEFILE>" +  iFrameFormDocument.getElementsByName("FILEUPLOAD")[0].value + "</SOURCEFILE>";
            strFormData += "<SEQNO>1</SEQNO>";
            strFormData += "<FILENAME>"+fileName+"</FILENAME>";
            strFormData += "<FUNCTIONID>CSDXLUPD</FUNCTIONID>";
            strFormData +="<CURRENTBRANCH><%=StringEscapeUtils.escapeJavaScript(currBranch)%></CURRENTBRANCH>";
            strFormData += "</FILEATTACHMENT>";
            //fnCalcHgt();
            setHeights();
            iFrameFormDocument.getElementsByName("REQXML")[0].value = strFormData;
			iFrameFormDocument.getElementById('fileUploadForm').target = 'ResponseFrame';
            iFrameFormDocument.getElementById("fileUploadForm").submit();
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
                                                + ' src=\"\" scrolling=\"no\" frameBorder=\"0\" onLoad=\"responseHandler(event)\" style=\"border:0px none; width:1px; height: 1px;\"><\/iframe>';
                responseFrameContainer.innerHTML = iFrameBody;
                return responseFrameContainer;
        }
          function fnCloseAlertWin() {
            unmask();
            return false;
        }
        function responseHandler(e) {
            var responseXml;
            var iFrameName;
            var imgFileName;
            var uploadFineName;
            var event = window.event || e;
            var srcElem = getEventSourceElement(event);
            if(srcElem) {
                iFrameName = srcElem.name;
            }
            
            responseXml = loadIFrameContent(document.getElementById(iFrameName));
              /*12.0.1 Security Changes Starts*/
            var errorDesc;
            var ecode;
            var sizeLimit;
            var errorText;
            if(selectSingleNode(responseXml, "//ECODE")){
            //if(selectSingleNode(responseXml, "//ECODE").text=='SM-SIG100'){ //9NT1606_14_0_RETRO_12_0_2_27453370
			if(getNodeText(selectSingleNode(responseXml, "//ECODE"))=='SM-SIG100'){ //9NT1606_14_0_RETRO_12_0_2_27453370
                 errorDesc = getNodeText(selectSingleNode(responseXml, "//EDESC"));
                 ecode     = getNodeText(selectSingleNode(responseXml, "//ECODE"));
                 sizeLimit = getNodeText(selectSingleNode(responseXml, "//SIZE"));
                 errorText = errorDesc+":"+sizeLimit+" bytes";
               mask();
                showAlerts(fnBuildAlertXML(ecode,'E',errorText), 'E');
            } 
            //if(selectSingleNode(responseXml, "//ECODE").text=='SM-SIG200'){ //9NT1606_14_0_RETRO_12_0_2_27453370
            if(getNodeText(selectSingleNode(responseXml, "//ECODE"))=='SM-SIG200'){ //9NT1606_14_0_RETRO_12_0_2_27453370
                errorDesc = getNodeText(selectSingleNode(responseXml, "//EDESC"));
                ecode     = getNodeText(selectSingleNode(responseXml, "//ECODE")); 
                errorText = errorDesc;
                mask();
                showAlerts(fnBuildAlertXML(ecode,'E',errorText), 'E');
              // alert(errorText);
            }/*9NT1606_14_0_RETRO_12_0_2_27453370 starts*/
            if (getNodeText(selectSingleNode(responseXml, "//ECODE")) == 'SM-UPD300') {
                    errorDesc = getNodeText(selectSingleNode(responseXml, "//EDESC"));
                    ecode = getNodeText(selectSingleNode(responseXml, "//ECODE"));
                    errorText = errorDesc;
                    mask();
                    mainWin.showAlerts(fnBuildAlertXML(ecode, 'E', errorText), 'E');
                    unmask();
                }/*9NT1606_14_0_RETRO_12_0_2_27453370 ends*/ 
             }
             /*12.0.1 Security Changes Ends*/
           attachMentData = getXMLString(responseXml);
		   
		   /*12_1_RETRO_12_2_23664488 Starts*/
		   if(attachMentData.indexOf("<FTYPE>") > -1)
             //showErrorAlerts("IN-HEAR-119");
		 mainWin.showErrorAlerts("IN-HEAR-119");
		   /*12_1_RETRO_12_2_23664488 ends*/
        }
		 function fnSaveImageUpload()
		{           
			 if (attachMentData.length > 0 && attachMentData.indexOf("<FTYPE>")!=-1 )
			{
			   parent.document.getElementById("BLK_XLUPLDMSTR__FILENAME").value = attachMentData.substring(attachMentData.indexOf("<FTYPE>") + 7, attachMentData.indexOf("</FTYPE>"));
                        }
                        else{
                            parent.document.getElementById("BLK_XLUPLDMSTR__FILENAME").value ="";
                        }
			fnExit();
                }
        
   </script>
   <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
   <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"> </script>
    <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
   <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
   <!--<script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
   <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
   <script type="text/javascript" src="Script/OJET/require-config.js"></script>
   <script type="text/javascript" src="Script/OJET/main_excelUpload.js"></script>
   
  </head>
  <body  class="BODYForm" onload="" oncontextmenu="return false;">
        <oj-dialog id="DIVif1"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"  
                      position.of="window"  style="height: 50vh;min-height:30vh;max-height:60vh" class="oj-sm-width-2/5 frames">
			
        <div slot="header" id="WNDtitlebar" class="oj-dialog-title">
                    <div class="oj-flex-bar-start">
                            <h1>Excel Upload</h1>
                    </div>
        </DIV>
				
        <DIV  slot="body" id="WNDcontent">
                    <div id="ResTree" style="width:100%" >
                        <div class="oj-flex-bar">
                                <div class="oj-flex-bar-start ">
                                <div>
					<INPUT TYPE="File" class="oj-sm-padding-1x" LABEL_VALUE="Select" ID="" DBT="" DBC="" NAME="FILEUPLOAD" DTYPE="" SIZE="" REQUIRED="0">
                                 </div>      
                                        <oj-button  class="action-button-primary oj-sm-margin-1x" chroming="solid" display="icons" 
                                                            LABEL_VALUE="Upload" 
                                                            ID="" DBT="" DBC="" NAME="UPLOAD" DTYPE="" SIZE=""
                                                            on-oj-action="[[function() {createXML()}.bind(null)]]"
                                                            REQUIRED="" 
                                                        >
                                                    <%=StringEscapeUtils.escapeHTML(upload)%>
                                        </oj-button>
                                   </div      
                        </div>
                    </div>
        </DIV>
					
        <DIV slot="footer" id="DIVFooter">

                <div id="DIV_AUDIT_BUTTONS" >
                 <div><div class="oj-flex-bar oj-sm-align-items-center oj-sm-padding-5x-horizontal">
                        <div class="footer-btn-container oj-flex-bar-end">
                                <oj-button  chroming="outlined" class="oj-sm-margin-1x oj-button oj-button-full-chrome oj-button-text-only oj-enabled oj-default oj-complete"  
                                                        display="icons" 
                                                        ID="BTN_OK_IMG" NAME="BTN_OK" 
							VALUE="Ok" DEFAULT="Ok" 
                                                        on-oj-action="[[function() {fnSaveImageUpload()}.bind(null)]]"
                                                        label='<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_OK"))%>'
                                                        >
                                                        <%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_OK"))%>
                                </oj-button> 
                                              
                                    <oj-button  chroming="solid" class="oj-sm-margin-1x oj-button oj-button-full-chrome oj-button-text-only oj-enabled oj-default oj-complete" 
                                                            display="icons" 
                                                            ID="BTN_EXIT_IMG" NAME="BTN_EXIT" 
                                                            VALUE="Exit" DEFAULT="Exit" 
                                                            on-oj-action="[[function() {fnExit()}.bind(null)]]"
                                                            onkeydown="return handleScrObj(this,event)" 
                                                            >
                                            <%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_EXIT"))%>													
                                 </oj-button>
                                </div>   </div> 
                    </div>				
                </div>	
                 
			
        </DIV>
    </oj-dialog>
        <div id="masker" class="masker" style="display:none">
            <div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none;z-index:6000"><!--HTML5 Changes-->
                <iframe id="ifr_AlertWin" class="frames"  src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
            <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
            </div>
        </div>	
    </body>
</html>
