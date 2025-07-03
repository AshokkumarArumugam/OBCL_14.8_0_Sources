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

Copyright © 2004-2016  by Oracle Financial Services  Software Limited..
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes

**  Modified By          : Mantinder Kaur
**  Modified On          : 03-Sep-2018
**  Change Description   : System not allowing to save STDCIF if the remarks are entered with 4000 characters.
**  Search String        : FCUBS_140_KBANK_28388551	

**  Modified By          : Mantinder Kaur
**  Modified On          : 16-Aug-2019
**  Change Description   : System not allowing to save STDCIF if on save the remarks entered are chinese characters.
						   system was throwing error if the characters entered are other than A-z,0-9,space and .(dot).
						   Code changes done to allow chinese characters in the remarks window.
**  Search String        : FCUBS_142_CTCB_30181807	

**	Ojet impementation

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css

--------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import = "java.util.Map" %>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
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
    String ieCss         = (String)session.getAttribute("IECSS");
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
    
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String remarks = (String)itemDescMap.get("LBL_REMARKS");
    String exit = (String)itemDescMap.get("LBL_EXIT");
    String ok = (String)itemDescMap.get("LBL_OK");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
  <head>
    <title><%=StringEscapeUtils.escapeHTML(remarks)%></title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content=0>
    <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
     <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
    <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
    <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
   
        <!--HTML5 Changes Start-->
        <!--
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
		<%}%><!--HTML5 Changes End -->

			<link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">
            
            <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript">
        var mainWin = parent.mainWin;
        var parentScrID = "ChildWin";   
        if(typeof(parent.fromSubScr) == 'undefined') {
            parentScrID = parent.seqNo;
        }
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
    
        function fnOK(){        
            var remarks = document.getElementById("REMARKS").value;
             //Fix for 29249820 Starts
             //if (/[^A-z|0-9]/.test(remarks)) { //29788188
			 //FCUBS_142_CTCB_30181807 starts
			 //if (/[^A-z|0-9| |.]/.test(remarks)) { //29788188
			 if (/[&()+\/<]/.test(remarks)) {
                parent.alert(mainWin.getItemDesc("LBL_SPECIAL_CHAR_NOT_ALLOWED"));
                parent.fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, "", launcherLeft);
                return;
             }
             //Fix for 29249820 Ends
            var xpath = selectNodes(parent.fcjRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/MAKERREMARKS");
            setNodeText(xpath[0], remarks);
            parent.closeRemarksScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, "", launcherLeft);
        }
        
        function setHeights() {
   
            parent.document.getElementById("ChildWin").style.width = "100%";
            parent.document.getElementById("ChildWin").children[0].style.width = "100%";
            parent.document.getElementById("ChildWin").style.height = parseInt(mainWin.document.getElementById("mainContent").offsetHeight)+"px";
            parent.document.getElementById("ChildWin").children[0].style.height =  parseInt(mainWin.document.getElementById("mainContent").offsetHeight)+"px";
            parent.document.getElementById("ChildWin").style.top = "0px";
            parent.document.getElementById("ChildWin").children[0].style.top = "0px";
            parent.document.getElementById("ChildWin").style.zIndex= 5990;
            //var editorWinObj = parent.document.getElementById("Div_ChildWin");
            //editorWinObj.focus();
            
            //document.getElementById("REMARKS").focus();
        }
        
        function alert(message) {
            mask();
            showAlerts(fnBuildAlertXML('', 'I', message), 'I');
            alertAction = "UNMASK";
        }

       function accessKeyEditor(e) {
            var e = window.event || e;
                var sourceElem = getEventSourceElement(e);
            if(e.ctrlKey && (e.keyCode == 67 || e.keyCode == 88) && restrictReqd == 'Y'){//jc2 changes begin //PIPA
                try {
                    e.keyCode = 0;
                }
                catch (ex) {
                }
                preventpropagate(e);
                fnDisableBrowserKey(e);
                return false;
            }//jc2 changes end //PIPA
                if(e.ctrlKey && (e.keyCode == 80) && restrictPrint == 'Y'){//jc2 changes begin //PIPA
                try {
                    e.keyCode = 0;
                }
                catch (ex) {
                }
                preventpropagate(e);
                fnDisableBrowserKey(e);
                return false;
            }//jc2 changes end //PIPA
            if (e.keyCode == 27) {
                fnExit();
                return;
           } else if (e.keyCode == 8) {  //Fix for 16514685 
                        if ((sourceElem.tagName.toUpperCase() == 'TEXTAREA') && (sourceElem.readOnly != true)) {
                    return true;
                } else {
                //Fix for 16980794 Start
                    fnDisableBrowserKey(e);
                    preventpropagate(e);
                    try {
                        e.keyCode = 0;
                //Fix for 16980794 End
                    } catch (e) {}
                    return false;
                }
            }else{ 
               return disableCommonKeys(e);
            }
        } 
        
        function fnExit() {
            parent.fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, "", launcherLeft);
        }
        
        /*
        function resize_iframe() {
            var iframeElem = parent.document.getElementById("ifrSubScreen");
            var iframeContainerDiv = parent.document.getElementById("ChildWin");
            iframeElem.style.width = document.getElementById("DIVif1").offsetWidth+"px" ;
            iframeElem.style.height = document.getElementById("DIVif1").offsetHeight+"px" ;
            var textAreaElem = document.getElementById("REMARKS");
            var textaraTdElem = document.getElementById("REMARKS").parentNode.parentNode;
            textAreaElem.style.height = textaraTdElem.offsetHeight - 13 + "px";
            textAreaElem.style.width = textaraTdElem.offsetWidth - 13+ "px";
            textAreaElem.style.overflow = "auto";
            if (self.innerHeight) {
                x = parent.self.innerWidth;
                y = parent.self.innerHeight;
            }else if (document.documentElement && document.documentElement.clientHeight){
                x = parent.document.documentElement.clientWidth;
                y = parent.document.documentElement.clientHeight;
            }else if (document.body) {
                x = parent.document.body.clientWidth;
                y = parent.document.body.clientHeight;
            }
            setHorizontalPosition(iframeContainerDiv, false, (x/2 - ((iframeContainerDiv.offsetWidth)/2)));
            iframeContainerDiv.style.top = y/2 - ((iframeContainerDiv.offsetHeight)/2) +"px";
            document.getElementById("REMARKS").focus();
        }
        */
        
        function handleRemarksScrObj(scrObj,e){//Fix for 21822896 
            var e = window.event || e;
            var srcEle = getEventSourceElement(e);
            if(e.shiftKey && e.keyCode == 9){
                if(srcEle.id == "REMARKS"){
                    document.getElementById("BTN_EXIT").focus();
                    preventpropagate(e);
                    return false;
                }else
                    return true;
            }
            if(e.keyCode == 9){
                if(srcEle.id == "BTN_CANCEL"){//Fix for 21822896 
                    document.getElementById("WNDbuttons").focus();   
                    preventpropagate(e);
                    return false;
                }else
                    return true;
            }
        }
        //Fix for 21754906 
        function fnHandleRemarksButtons(e) {
            mainWin.fnUpdateScreenSaverInterval();
            var e = window.event || e;
            var srcElem = getEventSourceElement(e);
            var type = srcElem.type;
             if (e.ctrlKey == true && e.altKey == false && e.keyCode == 76) {
                fnDisableBrowserKey(e);
                if (document.getElementById("BTN_CANCEL") && !document.getElementById("BTN_CANCEL").disabled){                    
                    fnExit();
                }
             }
             else if (e.ctrlKey == true && e.keyCode == 75) {
                fnDisableBrowserKey(e);
                if (document.getElementById("BTN_OK") && !document.getElementById("BTN_OK").disabled) {
                    fnOK();
                }
             }
        }
   </script>
   <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
      <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
   <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
   <!--<script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
   <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> -->
   <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
   <script type="text/javascript" src="Script/OJET/require-config.js"></script>
   <script type="text/javascript" src="Script/OJET/main_extRemarks.js"></script>
  </head>
  	<BODY onkeydown="return accessKeyEditor(event);"  oncontextmenu="return false;" onhelp="return false;">
		<oj-dialog id="remrksDialog" initial-visibility="show" 
								  position.my.horizontal="center" position.my.vertical="center"
								  position.at.horizontal="center" position.at.vertical="center" 
								  position.of="window">
				<div slot="header" class="oj-sm-width-full oj-dialog-title oj-flex-bar oj-sm-align-items-center bottom-border" id="WNDtitlebar">
						<div class="oj-flex-bar-start">
							<h1><%=StringEscapeUtils.escapeHTML(remarks)%></h1>
						</div>
                
						<div class="oj-flex-bar-end">
							<oj-button display="icons" chroming="borderless" type="button" class="WNDcls" accesskey="6" 
								id ="WNDbuttons" 
								title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" 
								onclick="fnExit()" onkeydown="return handleRemarksScrObj(this,event)">
									<span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
							</oj-button>
						</div>
				</div>	
			
				<div slot="body" id="DIVScrContainer" >
					<!--<oj-text-area id="REMARKS" 
						class="oj-form-control-full-width" 
						value=""                         
						rows="20"
						onkeydown="return handleRemarksScrObj(this,event)"
						>
					</oj-text-area>-->
                                    <div class="oj-sm-margin-4x-top">
                                        <oj-label-value label-edge="start" label-width="30%">
                                           <oj-label slot="label" for="REMARKS"><%=StringEscapeUtils.escapeHTML(remarks)%></oj-label>
                                           <oj-text-area slot="value" id="REMARKS" rows="10" onkeydown="return handleRemarksScrObj(this,event)"></oj-text-area>
                                        </oj-label-value>
                                    </div>
				</div>
				<div slot="footer" id="buttonDiv">
					<div class="oj-flex-bar oj-sm-align-items-center">
						<div class="footer-btn-container oj-flex-bar-start">
						</div>
						<div class="footer-btn-container oj-flex-bar-end"> 
							<oj-button class="action-button-primary oj-sm-margin-1x" chroming="solid" 
								id="BTN_OK"							
								name="BTN_OK" 
								onclick="fnOK()" 
								onkeydown="return handleRemarksScrObj(this,event)" 
								value="<%=StringEscapeUtils.escapeHTML(ok)%>" 
								title="<%=StringEscapeUtils.escapeHTML(ok)%>"
								>
                                                                <%=StringEscapeUtils.escapeHTML(ok)%>
							</oj-button>
							<oj-button class="oj-sm-margin-1x" chroming="solid"  
								id="BTN_CANCEL"  
								onclick="fnExit()" 
								name="Cancel" 
								onkeydown="return handleRemarksScrObj(this,event)" 
								value="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CANCEL"))%>" 
								title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CANCEL"))%>"
								>
                                                                <%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CANCEL"))%>
							</oj-button>
							
						</div>
					</div>
				 </div>
        </oj-dialog>
								  
	</BODY>
</html>
