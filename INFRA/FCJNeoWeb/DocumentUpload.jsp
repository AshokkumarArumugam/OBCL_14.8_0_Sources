<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : DocumentUpload.jsp
**
** Module       : FCJNeoWeb
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

Copyright © 2004-2016  by Oracle Financial Services  Software Limited..

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css

---------------------------------------------------------------------------------------------------- 
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.BranchUserGlobals"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.BranchConfig"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger" %>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="com.ofss.fcc.common.BranchConfig"%>
<%
request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
String jsParser         = (String)session.getAttribute("JS_PARSER");
String strTheme         = (String)session.getAttribute("THEME");
String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
String ieCss            = (String)session.getAttribute("IECSS");
String browserCSS       = (String) session.getAttribute("BROWSER_CSS");
String CSRFtoken        = (String)session.getAttribute("X-CSRFTOKEN");
String isDmsEnabled = BranchConfig.getInstance().getConfigValue("DMS_ENABLED");
String action            = (String)request.getParameter("action");
String entity            = (String)session.getAttribute("ENTITY");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
 <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
<!DOCTYPE html><!--HTML5 Changes-->
 <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
<%
        request.setCharacterEncoding("UTF-8");
        FCUserGlobals uc    = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
        String user         = "";
        if(uc != null)
            user = uc.getCurrUser();
        BranchLogger brnLogger = new BranchLogger(user);
        String TerminalId = (String) FCUtility.validateParameter(FCUtility.getCleintIPAddr(request));
        if (user == null || "".equals(user)){
            user = TerminalId;
        }
        FBContext fbContext = new FBContext(user);
        fbContext.setBrnLogger(brnLogger);
	fbContext.getBrnLogger().dbg("In DocumentUpload.jsp---->");
        String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
        Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+BranchConstants.DEFAULT_LANGCODE + "~" + entity, branchIdentifier,user);
        String sTitle           = (String) itemDescMap.get("LBL_DOCUMENT_UPLOAD");
        String noScriptLabel    = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
        <title>
            <%=StringEscapeUtils.escapeHTML(sTitle)%>
        </title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
         <!--OJET changes
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/UIUtil.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
        <!--<script type="text/javascript" src="Script/ExtJS/ExtensibleMEUtil.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
        <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->

            <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>
            
            <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
            
        
            
        <script type="text/javascript">
            var csrfVal = "<%= StringEscapeUtils.escapeJavaScript(CSRFtoken)%>";
            var dmsEnabled = "<%=StringEscapeUtils.escapeJavaScript(isDmsEnabled)%>";
            function Initialize(){
		docSubmitDlgArg.docUplScreenWin.focus();                
                var screenParams=parent.docSubmitDlgArg;
                        document.getElementById("RequestFrame").style.width = "100%";
                        
                       // document.getElementById("RequestFrame").style.height = "100%";
                        
                if(screenParams.docUplScreenWin.document.getElementById('BLK_DOC_UPLOAD')) {
                    //document.getElementById("RequestFrame").contentWindow.document.getElementById('docCode').value=screenParams.docUplScreenWin.document.getElementById('BLK_DOC_UPLOAD').tBodies[0].rows[screenParams.rowIndex-1].getElementsByTagName('INPUT')[4].value;
                    //document.getElementById("RequestFrame").contentWindow.document.getElementById('docDescription').value=screenParams.docUplScreenWin.document.getElementById('BLK_DOC_UPLOAD').tBodies[0].rows[screenParams.rowIndex-1].getElementsByTagName('INPUT')[6].value;
                    document.getElementById("RequestFrame").contentWindow.document.getElementById('docCode').value=getTableObjForBlock("BLK_DOC_UPLOAD",screenParams.docUplScreenWin.document).tBodies[0].rows[screenParams.rowIndex-1].getElementsByTagName('INPUT')[4].value;
                    document.getElementById("RequestFrame").contentWindow.document.getElementById('docDescription').value=getTableObjForBlock("BLK_DOC_UPLOAD",screenParams.docUplScreenWin.document).tBodies[0].rows[screenParams.rowIndex-1].getElementsByTagName('INPUT')[6].value;
                } else {
                   // document.getElementById("RequestFrame").contentWindow.document.getElementById('docCode').value=screenParams.docUplScreenWin.document.getElementById('BLK_DOCTYPE_CHECKLIST').tBodies[0].rows[screenParams.rowIndex-1].getElementsByTagName('INPUT')[1].value;
                   var tabr=getTableObjForBlock('BLK_DOCTYPE_CHECKLIST',screenParams.docUplScreenWin.document);
                  document.getElementById("RequestFrame").contentWindow.document.getElementById('docCode').value= tabr.tBodies[0].rows[screenParams.rowIndex-1].getElementsByTagName('INPUT')[1].value;
                 // document.getElementById("RequestFrame").contentWindow.document.getElementById('docDescription').value=screenParams.docUplScreenWin.document.getElementById('BLK_DOCTYPE_CHECKLIST').tBodies[0].rows[screenParams.rowIndex-1].getElementsByTagName('INPUT')[6].value;
                     
                }
            }
            
            function iFrameHandler(){
                var responseXml;
                var iFrameName ="ResponseFrame";               
                document.getElementById("ResponseFrame").style.width = "100%";
			responseXml = loadXMLDoc(getXMLString(loadIFrameContent(document.getElementById(iFrameName))));
               /* responseXml = loadIFrameContent(document.getElementById(iFrameName));
                responseXml.setProperty("SelectionNamespaces", "xmlns:dms='http://webservices.iflex.com'");    
                if (window.ActiveXObject)
				{
					try
					{
						responseXml = new ActiveXObject("Msxml2.DOMDocument.6.0");
					} catch(e)
					{
						responseXml = new ActiveXObject("Msxml2.DOMDocument.4.0");
					}
					responseXml.async = false;
			if(document.getElementById(iFrameName).contentWindow.document.XMLDocument != undefined){
					responseXml.load(document.getElementById(iFrameName).contentWindow.document.XMLDocument);
                responseXml.setProperty("SelectionNamespaces", "xmlns:dms='http://webservices.iflex.com'");               
			} else
				responseXml =document.getElementById(iFrameName).contentDocument.documentElement;            
				} else if (document.implementation && document.implementation.createDocument)
				{
					responseXml = document.getElementById(iFrameName).contentDocument;
				}
           */
                /*var exceptionElement;
                if (document.getElementsByTagNameNS){
                    exceptionElement = responseXml.getElementsByTagNameNS("http://webservices.iflex.com", "ExceptionMessage")[0];
                } else if (window.ActiveXObject){
                    exceptionElement = responseXml.selectSingleNode("//dms:ExceptionMessage");
                }*/
            	var exceptionElement =selectSingleNode(responseXml,'//ExceptionMessage');
                if (exceptionElement != null){
                    var isErrored = handleException(exceptionElement);
                    if (isErrored == false)	{
                        var documentIDElement =selectSingleNode(responseXml,'//DocumentID') ;
                        /*if (document.getElementsByTagNameNS){
                            documentIDElement = responseXml.getElementsByTagNameNS("http://webservices.iflex.com","DocumentID")[0];
                        } else if (window.ActiveXObject){
                            documentIDElement = responseXml.selectSingleNode("//dms:DocumentID");
                        }*/
                        handleDocumentID(documentIDElement);
                    }
                }            
					/* flexcube not integrated with DMS	*/ 
                else if (dmsEnabled == 'N')
                  {
                     parent.mask();
                     /*parent.showAlerts(fnBuildAlertXML('','E','Application not integrated with DMS !!'), 'I');*/
                     parent.showErrorAlerts('CS-DOC-025','E','');
                     parent.alertAction = "UNMASK";	
                                
                }
                /* flexcube not integrated with DMS	*/ 
            }
            
            function handleException(exceptionElement){
                var isErrored = false;
                /*
				if (exceptionElement.text && (exceptionElement.text !== "")){
                    isErrored = true;
                    alert('Error !!\n' + exceptionElement.text);
                } else if (exceptionElement.textContent && (exceptionElement.textContent !== "")) {
                    isErrored = true;
                    alert('Error !!\n' + exceptionElement.textContent);
                }
				*/
				//9NT1462 - ITR1 13064105 And 13052407 Starts
				if (exceptionElement && getNodeText(exceptionElement) != undefined &&getNodeText(exceptionElement) != ""){
					isErrored = true;
					parent.mask();
					parent.showAlerts(fnBuildAlertXML('~','E','Error !!' + getNodeText(exceptionElement)), 'E');
					parent.alertAction = "UNMASK";				
				}
				//9NT1462 - ITR1 13064105 And 13052407 Ends
                return isErrored;
            }
                        
            function fncloseUpload(){
                var childDivObj = parent.document.getElementById("ChildWin");
                childDivObj.getElementsByTagName("IFRAME")[0].src = "";
                parent.document.getElementById("Div_ChildWin").removeChild(childDivObj);
            }
            
            function handleDocumentID(documentIDElement){
                //var screenParams=parent.docSubmitDlgArg;
				/*
                 if (documentIDElement.text && documentIDElement.text !== ""){                    
                  	 var screenParams=parent.docSubmitDlgArg;
                    if(screenParams.docUplScreenWin.document.getElementById('BLK_DOC_UPLOAD')){
                    screenParams.docUplScreenWin.document.getElementById('BLK_DOC_UPLOAD').rows(screenParams.rowIndex + 1).all['DCREFNO'].value=documentIDElement.text;
                    }
                    else{
                      screenParams.docUplScreenWin.document.getElementById('BLK_DOCTYPE_CHECKLIST').tBodies[0].rows[0].getElementsByTagName('INPUT')[9].value=documentIDElement.text;   
                    }
                    fncloseUpload();
                } else if (documentIDElement.textContent && documentIDElement.textContent !== ""){                    
		    var screenParams=parent.docSubmitDlgArg;
                    if(screenParams.docUplScreenWin.document.getElementById('BLK_DOC_UPLOAD')){
                    screenParams.docUplScreenWin.document.getElementById('BLK_DOC_UPLOAD').tBodies[0].rows[screenParams.rowIndex].getElementsByTagName('INPUT')[5].value=documentIDElement.textContent;
                     }
                    else{
                      screenParams.docUplScreenWin.document.getElementById('BLK_DOCTYPE_CHECKLIST').tBodies[0].rows[0].getElementsByTagName('INPUT')[9].value=documentIDElement.text;   
                    }
                    fncloseUpload();                
                }
				*/
				//9NT1462 - ITR1 13064105 And 13052407 Starts
				if(documentIDElement && getNodeText(documentIDElement) !=""){
					var docId = getNodeText(documentIDElement);
                                      if(docId == undefined)
					docId =documentIDElement.textContent;
				      if (docId != null || docId !=undefined)
					parent.showAlerts(fnBuildAlertXML("", "I", 'File  Uploaded successfully with Document Id '+docId), "I");
	
                  	var screenParams=parent.docSubmitDlgArg;
					 //9NT1462 - ITR1 13064105 And 13052407 Starts
                    if(screenParams.docUplScreenWin.document.getElementById('BLK_DOC_UPLOAD')){
//SFR # 14025063  Starts						

//screenParams.docUplScreenWin.document.getElementById('BLK_DOC_UPLOAD').rows(screenParams.rowIndex + 1).all['DCREFNO'].value=docId;
//screenParams.docUplScreenWin.document.getElementsByName('DCREFNO')[screenParams.rowIndex - 1].value=docId;
screenParams.docUplScreenWin.document.getElementById('BLK_DOC_UPLOAD__DCREFNORC'+(screenParams.rowIndex-1)).value=docId;

//SFR # 14025063  Ends						
                    } else if (screenParams.docUplScreenWin.document.getElementById('BLK_DOCUMENT_MODIFY_DETAIL') ){
						screenParams.docUplScreenWin.document.getElementsByName('DMS_DOC_ID')[screenParams.rowIndex - 1].value=docId;
						
					} else if (screenParams.docUplScreenWin.document.getElementById('BLK_BRN_PX_OUT_TXN_DOCDTLS')){
						screenParams.docUplScreenWin.document.getElementsByName('DMS_DOC_ID')[screenParams.rowIndex - 1].value=docId;
						
					} else if (screenParams.docUplScreenWin.document.getElementById('BLK_TXN_DOC_DETAILSINFO')){
						screenParams.docUplScreenWin.document.getElementsByName('DMS_DOC_ID')[screenParams.rowIndex - 1].value=docId;
						
                    }
                    else{//Added for uploading the documents from  BLK_DOCTYPE_CHECKLIST
                     // screenParams.docUplScreenWin.document.getElementById('BLK_DOCTYPE_CHECKLIST').tBodies[0].rows[screenParams.rowIndex - 1].getElementsByTagName('INPUT')[9].value=docId;
                      getTableObjForBlock('BLK_DOCTYPE_CHECKLIST',screenParams.docUplScreenWin.document).tBodies[0].rows[screenParams.rowIndex - 1].getElementsByTagName('INPUT')[9].value=docId;  
                    }
					//9NT1462 - ITR1 13064105 And 13052407 Ends
                    fncloseUpload();
				}
				//9NT1462 - ITR1 13064105 And 13052407 Ends
            }
function readResponseXMLTags(doc) {
      var xml="";
      try {
          var startEmt=doc.contentWindow.document.documentElement;
          var startTag="<"+startEmt.tagName+">";
          var endTag="</"+startEmt.tagName+">";
          if(startEmt.tagName=="ServiceResponse")   { // parsing success xml
           xml=startTag;
              for (var i = 0; i < doc.contentWindow.document.documentElement.childNodes.length; i++) {
                            var data=doc.contentWindow.document.documentElement.childNodes[i]
                             xml=xml+"<"+data.tagName+">"+data.textContent+"</"+data.tagName+">";
              }
              return (xml+endTag);
          }else if(startEmt.tagName=="HTML"){
		temp= doc.contentWindow.document.documentElement.getElementsByTagName("BODY")[0].innerText;
		temp = '<ServiceResponse><DocumentID>'+temp.substring(temp.indexOf("DocumentID")+11,temp.indexOf("</DocumentID"))+'</DocumentID><ExceptionMessage /></ServiceResponse>';
		return temp;
          }
    } catch (ex) {
        
      }
}

                    function setWindowWidth(){
                    //debugger;
                    
				// document.getElementById("DIVif1").style.width = screen.availWidth / 3 + "px";
                        parent.document.getElementById("ChildWin").style.width = "100%";
                        parent.document.getElementById("ChildWin").children[0].style.width = "100%";
                        parent.document.getElementById("ChildWin").style.height = "100%";
                        parent.document.getElementById("ChildWin").children[0].style.height =  "100%";
                        parent.document.getElementById("ChildWin").style.top = "0px";
                        parent.document.getElementById("ChildWin").children[0].style.top = "0px";
                        parent.document.getElementById("ChildWin").style.zIndex= 5980;
                        
			}


    </script>
        <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_documentUpload.js"></script>
    </head>     
    <body>
        <div id="DIVif1"  >
		<oj-dialog id="WNDtitlebar"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"
                      position.of="window" class="oj-sm-width-2/5 frames" >
			
				<DIV  slot=header id="wndtitle" class="oj-sm-width-full oj-dialog-title oj-flex-bar oj-sm-align-items-center bottom-border">
                                        <div class="oj-flex-bar-start">
					  <h1><%=StringEscapeUtils.escapeHTML(sTitle)%></h1>
                    </div>
						
					<div class="oj-flex-bar-end">
						<oj-button display="icons" chroming="borderless" type="button"
                                                       id ="WNDbuttons" 
                                                 	title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" 
							on-oj-action="[[function() {fncloseUpload()}.bind(null)]]">
                                                    <span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
                                                </oj-button>
                </div>
            </DIV>
			
            <iframe id="RequestFrame" class="frames" name="RequestFrame" src="DocumentSubmit.jsp?action=<%=StringEscapeUtils.escapeHTML(action)%>" frameborder="0" scrolling="no" onload="Initialize()"></iframe>
                        <iframe id="ResponseFrame" class="frames" name="ResponseFrame" src="" frameborder="0" height="1px" onload="iFrameHandler()"></iframe>
		</oj-dialog>
        </div>
    </body>	
</html>
   	    