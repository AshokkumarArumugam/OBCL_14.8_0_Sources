<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : TxnBranch.jsp
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

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css
--------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals" %>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import = "java.util.Map" %>
<%@ page import = "java.util.Iterator" %>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.BranchConfig"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="com.ofss.infra.oindicator.OIndicator"%>
<%

    request.setCharacterEncoding("UTF-8"); 
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 );              
    String jsParser     = (String)session.getAttribute("JS_PARSER");
    String strTheme     = (String)session.getAttribute("THEME");
    String StrIsoLang   = (String)session.getAttribute("LANGISOMAP");
    String browserCSS   = (String)session.getAttribute("BROWSER_CSS");
    String ieCss         = (String)session.getAttribute("IECSS");
    FCUserGlobals uc        = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
    String branchIdentifier = BranchConfig.getInstance().getConfigValue("BRANCH_CENTRALIZED");
    Map itemDescMap  = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+uc.getLangCd() + "~" + uc.getEntity(), branchIdentifier,uc.getCurrUser());
    
    String OkLabel              = (String)itemDescMap.get("LBL_OK");
    String enterTxnBranch       = (String)itemDescMap.get("LBL_ENTER_TXNBRANCH");
    String txnBranch            = (String)itemDescMap.get("LBL_TXN_BRANCH");      
    String branch               = (String)itemDescMap.get("LBL_BRANCH");   
    String imgPath              = "Images/"+strTheme.substring(0,strTheme.indexOf("."));
   /* # BUG 15978732 fixes start */ 
    String currBrn              = FCUtility.validateParameter((String)request.getParameter("currBrn"));
    String istxnBrn             = FCUtility.validateParameter((String)request.getParameter("istxnBrn"));
    
    String noScriptLabel        = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String mandatory            = (String)itemDescMap.get("LBL_INFRA_MANDATORY");
    String funcid               = FCUtility.validateParameter((String)request.getParameter("funcid"));
    String uiName               =FCUtility.validateParameter( (String)request.getParameter("uiName"));
    String finalRights          = FCUtility.validateParameter((String)request.getParameter("finalRights"));
    String drillDownQry         = FCUtility.validateParameter((String)request.getParameter("drillDownQry"));
    String brnHostStatus        = OIndicator.getInstance().brnHostLinkStatus(); //Added for get HOST status 
    /* # BUG 15978732 fixes end */ 
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    
String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<HTML lang="<%=StringEscapeUtils.escapeHTML(StrIsoLang)%>">
    <HEAD>
        <TITLE><%=StringEscapeUtils.escapeHTML(txnBranch)%></TITLE>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
       <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrIsoLang)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>--> 
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrIsoLang)%>.css" rel="stylesheet" type="text/css"/>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>--> 
        <!--HTML5 Changes Start-->
        <!--
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
            <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>
            <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>
            <!--<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>-->
            <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>

        <script type="text/javascript">
            var alertAction         = "";
            var mainWin = parent.mainWin;
            var retVal = new Array();
            var multipleEntryIDs = new Array();
            var functionId = 'COMMON';
            //var retflds = new Array();
            var lovInfoFlds = {};/*12.0.4 UI performance changes */
            var brnHostStatus   = '<%=StringEscapeUtils.escapeJavaScript(brnHostStatus)%>';
            var enterTxnBranch      = '<%=StringEscapeUtils.escapeJavaScript(enterTxnBranch)%>';
            var txnBranch           = '<%=StringEscapeUtils.escapeJavaScript(txnBranch)%>';
            var branch              = '<%=StringEscapeUtils.escapeJavaScript(branch)%>';
            var istxnBrn            = '<%=StringEscapeUtils.escapeJavaScript(istxnBrn)%>';
            var strTheme            = '<%=StringEscapeUtils.escapeJavaScript(strTheme)%>';
            var funcid              = '<%=StringEscapeUtils.escapeJavaScript(funcid)%>';
            var uiName              = '<%=StringEscapeUtils.escapeJavaScript(uiName)%>';
            var finalRights         = '<%=StringEscapeUtils.escapeJavaScript(finalRights)%>';
            var drillDownQry        = '<%=StringEscapeUtils.escapeJavaScript(drillDownQry)%>';
            var brnidentifier       = '<%=StringEscapeUtils.escapeJavaScript(branchIdentifier)%>';
            /*Fix for 17789183 --  base bug 17022639*/
            var langCode       		= '<%=StringEscapeUtils.escapeJavaScript(StrIsoLang)%>';
             if(brnidentifier=='Y') {
                //retflds["LOV_CHANGE_BRANCH_SESSION"] = 'BRANCH_CODE~';
                lovInfoFlds["LOV_CHANGE_BRANCH_SESSION"] = ['BRANCH_CODE~'];/*12.0.4 UI performance changes */
                retVal[0] = '';
             }else{
                lovInfoFlds["LOV_DC_CHANGE_BRANCH_SESSION"] = ['BRANCH_CODE~'];/*12.0.4 UI performance changes */
                //retflds["LOV_DC_CHANGE_BRANCH_SESSION"] = 'BRANCH_CODE~';
                retVal[0] = '';
             }
             
            window.returnValue = retVal;
            
            if(typeof(parent.fromSubScr) == 'undefined') {
                parentScrID = parent.seqNo;
            }
            try{
            var scrDIVHeight    = parent.parent.document.getElementById(parentScrID).clientHeight;
            }catch(e){}
        
        </script> 
                 <script type="text/javascript">
                        if(brnHostStatus== "OFFLINE" )//ArunT
                        {
                            parent.fnExitTxnBranch(funcid, uiName, finalRights, drillDownQry);
                           
                        }
                        function fnValidateTxnBranch() {
                            if (document.getElementsByName("BRANCH_CODE")[0].value == "") {
                                mask();
                                showAlerts(fnBuildAlertXML('','I',enterTxnBranch), 'I');
                                alertAction = "SELECTBRN";                                
                            } else {
                                var retVal = document.getElementsByName("BRANCH_CODE")[0].value.toUpperCase();
                                parent.fnTxnBranch(retVal,funcid);//Bug 17803337 Changes
                                parent.fnExitTxnBranch(funcid, uiName, finalRights, drillDownQry);
                                return true;
                            }
                        }
                        function fnLaunchLov(evnt) {
                            var evnt = window.event || evnt;
                            var srcElement = getEventSourceElement(evnt);
                            if(srcElement.tagName.toUpperCase() == 'INPUT'){
                                if (!evnt.ctrlKey && !evnt.shiftKey && evnt.keyCode == 115) {
                                    if (getIEVersionNumber() > 0) fireHTMLEvent(getNextSibling(srcElement), "onclick");
                                    else {
                                    //eval(getNextSibling(srcElement).getAttribute("onclick"));
                                    var fnEval = new Function("event",getNextSibling(srcElement).getAttribute("onclick"));  
                                    fnEval(event);
                                    }
                                }
                            }
                            return true;
                        }
                        function fnCalcTxnBranchHgt(){
							if(typeof(mainWin.gCustInfo["Branch"])!= 'undefined' && mainWin.gCustInfo["Branch"]!='' ){
                                document.getElementById("TxnBranch").value = mainWin.gCustInfo["Branch"];
                            }
                            //Fix for 17789183 --  base bug 17022639-Multi Branch Transaction Window Fix for Arabic User Starts
                       // var iframeObj = parent.document.getElementById("ChildWin");
                        parent.document.getElementById("ChildWin").style.width = "100%";
                        parent.document.getElementById("ChildWin").children[0].style.width = "100%";
                        parent.document.getElementById("ChildWin").style.height = parseInt(mainWin.document.getElementById("mainContent").offsetHeight)+"px";
                        parent.document.getElementById("ChildWin").children[0].style.height =  parseInt(mainWin.document.getElementById("mainContent").offsetHeight)+"px";
                        parent.document.getElementById("ChildWin").style.top = "0px";
                        parent.document.getElementById("ChildWin").children[0].style.top = "0px";
                        parent.document.getElementById("ChildWin").style.zIndex= 5980;
                        
                            document.getElementsByName("BRANCH_CODE")[0].focus();
                            //Fix for 17789183 --  base bug 17022639-Multi Branch Transaction Window Fix for Arabic User Ends
                         }
                        function startDrag(target, e) {
                            var evt = window.event || e;
                            var divObj = parent.document.getElementById(target);
                            if (parent.document.getElementById("ChildWin")) {
                            } else {
                                mainWin.setActiveWindow(divObj, window);
                            }
                        
                            divObj.style.cursor = "default";
                            var x = evt.clientX;
                            var y = evt.clientY;
                            var initx = divObj.offsetLeft;
                            var inity = divObj.offsetTop;
                            document.onmousemove=function(e) {
                                var evt = window.event || e;
                                var ex = evt.clientX;
                                var ey = evt.clientY;
                                var dx = ex - x;
                                var dy = ey - y;
                                var ypos = inity + dy;
                                var tBarHgt = 0;
                                if(parent.document.getElementById("WNDtitlebar") != null) {
                                    tBarHgt = parent.document.getElementById("WNDtitlebar").offsetHeight * -1;
                                } else if(typeof(mainWin) != "undefined") {
                                    tBarHgt = mainWin.document.getElementById("masthead").offsetHeight;
                                }
                                if(ypos > (tBarHgt + 4)) {
                                divObj.style.left = initx + dx + "px";
                                divObj.style.top = inity + dy + "px";
                                initx = initx + dx;
                                inity = inity + dy;
                                } else {
                                    divObj.style.top = (tBarHgt + 4)+ "px";
                                    inity = tBarHgt + 4;
                                }
                            };
                            document.onmouseup=function(event){
                                divObj.style.cusor = "default";
                                document.onmousemove=null;
                                document.onmouseup=null;
                            }
                        }
                        function fnCloseAlertWin(e) {
                            var event = window.event||e;
                            if(alertAction == "SELECTBRN") {
                                unmask();
                                document.getElementsByName("BRANCH_CODE")[0].focus();
                                event.returnValue = false;
                            }
                        }
                        function fnTxnBranchKeyAccess(evnt) {
                            var evnt = window.event || evnt;
                            var srcElement = getEventSourceElement(evnt);
                            mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
                            if (evnt.keyCode == 27) {
                                parent.fnExitTxnBranch(funcid, uiName, finalRights, drillDownQry);
                                return;
                            }                            
                            if(evnt.keyCode == 9 && !evnt.shiftKey){
                              document.getElementsByName("BRANCH_CODE")[0].focus();
                            }else if(evnt.keyCode == 9 && evnt.shiftKey) {
                              document.getElementById("BTN_OK").focus(); 
                            }
                            if(evnt.keyCode == 8){
                                if(srcElement.tagName.toUpperCase() == 'INPUT'){
                                    return true;
                                }else{
                                    fnDisableBrowserKey(evnt);
                                    preventpropagate(evnt);
                                    try {
                                        evnt.keyCode = 0;
                                    } catch(e) {}
                                    return false;
                                }
                            }
                            return true;
                        }
                 </script>
                 <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <!--<script type="text/javascript" src="Script/JS/Alert.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
        <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_txnBranch.js"></script>
    </HEAD>
    <BODY onkeydown="return fnTxnBranchKeyAccess(event);">
            <div id="Div_AlertWin" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none;z-index:6000"><!--HTML5 Changes-->
                    <iframe id="ifr_AlertWin" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
            <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
                  </div>
      	<oj-dialog id="txnBranchDialog" initial-visibility="show" 
                    position.my.horizontal="center" position.my.vertical="center"
                    position.at.horizontal="center" position.at.vertical="center" 
		    position.of="window" style="height: 98vh;min-height:98vh;max-height:98vh; width:90vw;min-width:90vw;max-width:90vw " >
		<div slot="header" class="oj-sm-width-full oj-dialog-title oj-flex-bar bottom-border" id="WNDtitlebar">
			<div class="oj-flex-bar-start">
                            <h1><%=StringEscapeUtils.escapeHTML(txnBranch)%></h1>
			</div>
		</div>	
                <div slot="body" id="DIVScrContainer"  >
                <div id="ResTree" >
                <oj-form-layout label-edge="start" >
                                <oj-label-value label-edge="start" label-width="30%">
                                        <oj-label slot="label" for="TxnBranch" > <%=StringEscapeUtils.escapeHTML(txnBranch)%>
                                        </oj-label>
                                        <oj-input-text slot="value" type="TEXT" viewmode="Y" readonly="false" 
                                                        id="TxnBranch" tabindex="0" 
                                                        title="<%=StringEscapeUtils.escapeHTML(txnBranch)%>" 
                                                        value="<%=StringEscapeUtils.escapeHTML(currBrn)%>" 
                                                        NAME="BRANCH_CODE" 
                                                        onkeydown='if(event.keyCode == 115) return fnLaunchLov(event);'
                                                        required="true" aria-required="true"
                                                  >
                                                  
                                         <oj-button slot="end" display="icons" chroming="borderless"  oldclassname="BTNimg" 
                                            id="btnUserBranches"
                                            title="List of Values" 
                                            tabindex="0" 
                                            type="button" 
                                            <%
                                             if("Y".equals(branchIdentifier)) {
                                            %>
                                                on-oj-action="[[function() {disp_lov('SMCHGBRN','','BRANCH_CODE','Branch Code','LOV_CHANGE_BRANCH_SESSION', '', '', '', '', event)}.bind(null)]]" 
                                            <%
                                            }
                                            else {
                                             %>
                                                on-oj-action="[[function() {disp_lov('SMCHGBRN','','BRANCH_CODE','Branch Code','LOV_DC_CHANGE_BRANCH_SESSION', '', '', '', '', event)}.bind(null)]]" 
                                            <%
                                                }
                                            %>
                                           
                                            >
                                            <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search">
                                            </span>
                                     </oj-button>
                                        </oj-input-text>
                                   
    
                            </oj-label-value>
                            </oj-form-layout>
                    </div>
                </div>
		<div slot="footer" id="buttonDiv">
                    <div class="oj-flex-bar oj-sm-align-items-center">
                            <div class="footer-btn-container oj-flex-bar-start">
                            </div>
                             <div class="footer-btn-container oj-flex-bar-end"> 
                                <oj-button class="action-button-primary oj-sm-margin-1x" chroming="solid" 
                                        id="BTN_OK"							
                                        name="OK" 
					onclick="fnValidateTxnBranch()" 
					onkeydown="return fnTxnBranchKeyAccess(event);" 
					value="<%=StringEscapeUtils.escapeHTML(OkLabel)%>" 
					title="<%=StringEscapeUtils.escapeHTML(OkLabel)%>"
                                        >
                                        <%=StringEscapeUtils.escapeHTML(OkLabel)%>
				</oj-button>			
        </div>    
            </div>
            </div>
                 
                <div id="masker" class="masker" style="display:none">
                    
        </div>
        </oj-dialog>

    </BODY>
</HTML>
	
