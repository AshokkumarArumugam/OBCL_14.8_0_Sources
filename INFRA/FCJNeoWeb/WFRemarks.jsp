<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : WFRemarks.jsp
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

** Modified by  	: Nishanth
** Modified on 		: 18-Jul-2013
** Search string 	: SFR#17156345 
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
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
<%
	/*JAN_CPU_BUG-25068346 Start-- */
    response.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 );
	/*JAN_CPU_BUG-25068346 End-- */
    request.setCharacterEncoding("UTF-8");              
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
    String currBrn              = (String)request.getParameter("currBrn");
    String action               = (String)request.getParameter("action");
    String istxnBrn             = (String)request.getParameter("istxnBrn");
    String noScriptLabel        = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String mandatory            = (String)itemDescMap.get("LBL_INFRA_MANDATORY");
    String funcid               = (String)request.getParameter("funcid");
    String uiName               = (String)request.getParameter("uiName");
    String finalRights          = (String)request.getParameter("finalRights");
    String drillDownQry         = (String)request.getParameter("drillDownQry");
    String ExitLabel            = (String)itemDescMap.get("LBL_EXIT");
    String comments             = (String)itemDescMap.get("LBL_COMMENTS");
    String enterReasonCode      = (String)itemDescMap.get("LBL_ENTER_REASONCODE");
    String remarks              = (String)itemDescMap.get("LBL_REMARKS");
    String reason               = (String)itemDescMap.get("LBL_REASON");
    String reasonCode           = (String)itemDescMap.get("LBL_REASON_CODE");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes

%>
<HTML lang="<%=StringEscapeUtils.escapeHTML(StrIsoLang)%>">
    <HEAD>
        <TITLE><%=StringEscapeUtils.escapeHTML(comments)%></TITLE>
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
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/Util.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript">
            var alertAction         = "";
            var mainWin = parent.mainWin;
            var retVal = new Array();
            var multipleEntryIDs = new Array();
            var functionId = 'COMMON';
            //var retflds = new Array();
            var lovInfoFlds = {};/*12.0.4 UI performance changes */
            var enterTxnBranch      = '<%=StringEscapeUtils.escapeJavaScript(enterTxnBranch)%>';
            var txnBranch           = '<%=StringEscapeUtils.escapeJavaScript(txnBranch)%>';
            var branch              = '<%=StringEscapeUtils.escapeJavaScript(branch)%>';
            var istxnBrn            = true;
            var strTheme            = '<%=StringEscapeUtils.escapeJavaScript(strTheme)%>';
            var funcid              = '<%=StringEscapeUtils.escapeJavaScript(funcid)%>';
            var uiName              = '<%=StringEscapeUtils.escapeJavaScript(uiName)%>';
            var finalRights         = '<%=StringEscapeUtils.escapeJavaScript(finalRights)%>';
            var drillDownQry        = '<%=StringEscapeUtils.escapeJavaScript(drillDownQry)%>';
            var brnidentifier       = '<%=StringEscapeUtils.escapeJavaScript(branchIdentifier)%>';
            var action              = '<%=StringEscapeUtils.escapeJavaScript(action)%>';
            var reason              = '<%=StringEscapeUtils.escapeJavaScript(reason)%>';
            var comments            = '<%=StringEscapeUtils.escapeJavaScript(comments)%>';
            var reasonCode          = '<%=StringEscapeUtils.escapeJavaScript(reasonCode)%>';
            var enterReasonCode     = '<%=StringEscapeUtils.escapeJavaScript(enterReasonCode)%>';
	    var lov_id  = "";
	     if (action == 'LEADM') //Nishanth
	     {
	     lov_id = 'LOV_RESN';
	     }
	     else
	     {
	     lov_id = 'LOV_REASON';
	     }

            //retflds[lov_id] = 'REASON_CODE~';
            lovInfoFlds[lov_id]=['REASON_CODE~'];/*12.0.4 UI performance changes */
            retVal[0] = '';
             
            window.returnValue = retVal;
            
            if(typeof(parent.fromSubScr) == 'undefined') {
                parentScrID = parent.seqNo;
            }
            try{
            var scrDIVHeight    = parent.parent.document.getElementById(parentScrID).clientHeight;
            }catch(e){}
        
        </script> 
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    </HEAD>
    <BODY class="BODYform" onload="fnCalcReasonHgt();" onkeydown="return fnReasonKeyAccess(event);">
        <div id="DIVif1" class="WNDcontainer">
            <DIV class=WNDtitlebar id="WNDtitlebar" onmousedown="startDrag('ChildWin', event)">
                <div class="WNDtitle" id="wndtitle">
                    <B class="BTNicon">
                        <span class="ICOflexcube"></span>
                    </B>
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(comments)%>&nbsp;</h1>
                </div>
            </DIV>
           
            <DIV id='comments' class='TwoColSectionContainer'>
		<div class="DIVColumnDouble">
			<fieldset class="FSTstd" block="BLK_COMMENTS" type="SE" view="SE"><LEGEND></LEGEND>
				<div class="DIVText" >
		                        <label class="LBLstd" for=""><%=StringEscapeUtils.escapeHTML(reasonCode)%></label>
		                        <input id ='REASON_CODE' class="TXTstd" title="<%=StringEscapeUtils.escapeHTML(reasonCode)%>" NAME="REASON_CODE" SIZE="15" MAXLENGTH="3" onkeydown='if(event.keyCode == 115) return fnLaunchLov(event);'><BUTTON class="BTNimg" tabindex="-1" id='btnUserBranches' onclick="disp_lov('COMMON','BLK_COMMENTS','REASON_CODE','Reason Code',lov_id, '', '', '', '', event)" onFocus="this.className='BTNimgH'" onMouseOver="this.className='BTNimgH'" onMouseOut="this.className='BTNimg'" onBlur="this.className='BTNimg'">
		                        <SPAN class="ICOlov" tabIndex=-1><span class="LBLinv"><%=StringEscapeUtils.escapeHTML(reasonCode)%></span></SPAN></BUTTON>
				</div>
				<div class="DIVText">
		                        <label class="LBLstd" for=""><%=StringEscapeUtils.escapeHTML(remarks)%></label>
					<textarea id="BLK_COMMENTS__REMARKS" class="TXAstd" rows="4" cols="22" label_value="" title=<%=StringEscapeUtils.escapeHTML(remarks)%> name="REMARKS" size="NaN" required="" aria-required="false" maxlength="255"></textarea>
				</div>
                    		<div class="DIVText" ><label class="LBLstd" for="confnew">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><img src="Images/star_disabled.gif" class="RequiredField" title="" ALT="">
                        		<BUTTON onblur='this.className="BTNfooter"' id=BTN_OK class=BTNfooterH onfocus='this.className="BTNfooterH"' onmouseover='this.className="BTNfooterH"' onmouseout='this.className="BTNfooter"' onClick="fnValidateReason()" onkeydown="return fnReasonKeyAccess(event);" name='OK'><%=StringEscapeUtils.escapeHTML(OkLabel)%></BUTTON>
                        		<BUTTON onblur='this.className="BTNfooter"' id=BTN_EXIT class=BTNfooterH onfocus='this.className="BTNfooterH"' onmouseover='this.className="BTNfooterH"' onmouseout='this.className="BTNfooter"' onClick="fnCloseWindow()" name='EXIT'><%=StringEscapeUtils.escapeHTML(ExitLabel)%></BUTTON>
                    		</div>
			</fieldset>
		</div>
                 
                 <script type="text/javascript">
                        function fnValidateReason() {
                            if (document.getElementsByName("REASON_CODE")[0].value == "") {
                            	if ("<%=StringEscapeUtils.escapeJavaScript(action)%>" == "ESCALATE")
                            		document.getElementsByName("REASON_CODE")[0].value = "OR-INF-004";
                            	if ("<%=StringEscapeUtils.escapeJavaScript(action)%>" == "HOLD")
                            		document.getElementsByName("REASON_CODE")[0].value = "OR-INF-005";
									if ("<%=StringEscapeUtils.escapeJavaScript(action)%>" == "SAVE")
                            		document.getElementsByName("REASON_CODE")[0].value = "OR-INF-007";
                            }
                            parent.comments = document.getElementsByName("REASON_CODE")[0].value.toUpperCase() +"~"+ document.getElementsByName("REMARKS")[0].value;
							parent.gRemarksAction = "<%=StringEscapeUtils.escapeJavaScript(action)%>";
							parent.reasoncd = document.getElementsByName("REASON_CODE")[0].value; //12.0.2 dev leadm
							parent.gRemarks = document.getElementById("BLK_COMMENTS__REMARKS").value; //12.0.2 dev leadm
                            parent.fnCloseRemarks(true);
                            return true;
                        }
                        function fnCloseWindow() {
						parent.gRemarksAction = "<%=StringEscapeUtils.escapeJavaScript(action)%>";
						parent.fnCloseRemarks(false);
                        }
                        function fnLaunchLov(evnt) {
                            var evnt = window.event || evnt;
                            var srcElement = getEventSourceElement(evnt);
                            if(srcElement.tagName.toUpperCase() == 'INPUT'){
                                if (!evnt.ctrlKey && !evnt.shiftKey && evnt.keyCode == 115) {
                                    if (getIEVersionNumber() > 0) fireHTMLEvent(getNextSibling(srcElement), "onclick");
                                    //Eval changes starts
									else { 
									//eval(getNextSibling(srcElement).getAttribute("onclick"));
									var fnEval = new Function("evnt",getNextSibling(srcElement).getAttribute("onclick"));  
                                    fnEval(evnt);
									}
									//Eval changes ends
                                }
                            }
                            return true;
                        }
                        function fnCalcReasonHgt(){
                            var iframeObj = parent.document.getElementById("ChildWin");
                            iframeObj.style.height = (document.getElementById("DIVif1").offsetHeight ) + "px" ;
                            iframeObj.style.width = (document.getElementById("DIVif1").offsetWidth + 50) + "px" ;
                            document.getElementById("WNDtitlebar").style.width = (document.getElementById("DIVif1").offsetWidth + 100) + "px" ;
                            iframeObj.children[0].style.height = iframeObj.style.height;
                            iframeObj.children[0].style.width = iframeObj.style.width;
                            parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("wndtitle").getElementsByTagName("H1")[0]);
                            iframeObj.style.top = "0px";
                            parent.document.getElementById("ChildWin").style.left = "4px";
                            parent.mask();
                            document.getElementsByName("REASON_CODE")[0].focus();
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
                            if(alertAction == "SELECTRSN") {
                                unmask();
                                document.getElementsByName("REASON_CODE")[0].focus();
                                event.returnValue = false;
                            }
                        }
                        function fnReasonKeyAccess(evnt) {
                            var evnt = window.event || evnt;
                            var srcElement = getEventSourceElement(evnt);
                            if (evnt.keyCode == 27) {
                                fnCloseWindow();
                                return;
                            }                            
                            if(evnt.keyCode == 9 && !evnt.shiftKey){
                              document.getElementsByName("REASON_CODE")[0].focus();
                            }else if(evnt.keyCode == 9 && evnt.shiftKey) {
                              document.getElementById("BTN_OK").focus(); 
                            }
                            if(evnt.keyCode == 8){
                                if(srcElement.tagName.toUpperCase() == 'INPUT' || srcElement.tagName.toUpperCase() == 'TEXTAREA'){
								//added OR condition 'TEXTAREA' SFR#17156345
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
            </DIV>
        </div>    
        <div id="masker" class="masker" style="display:none">
            <div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none"><!--HTML5 Changes-->
                <iframe id="ifr_AlertWin" class="frames" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
            <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
            </div>
        </div>
    </BODY>
</HTML>