<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : LaunchSingleViewScreen.jsp
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

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css

--------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String Strlang         = (String)session.getAttribute("LANG");
    String StrlangISOMap   = (String)session.getAttribute("LANGISOMAP");
    String StrUserId       = (String) session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String strTheme     = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String ieCss         = (String)session.getAttribute("IECSS");
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/
    //FCUserGlobals Objuc    = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);

    FBContext fbContext = new FBContext(StrUserId);
    BranchLogger brnLogger = new BranchLogger(StrUserId);
    fbContext.setBrnLogger(brnLogger);
   /* # BUG 15978732 fixes start */ 
    String functId   = FCUtility.validateParameter(request.getParameter("functionId"));   
    /* # BUG 15978732 fixes end */ 
    String thirdChar ="";
    if (functId != null || "".equals(functId)){
        thirdChar = functId.substring(2,3);
    }
    
    /* # BUG 15978732 fixes start */ 
    String gscrPos = FCUtility.validateParameter(request.getParameter("gscrPos"));
    String l_strTheme = FCUtility.validateParameter(request.getParameter("l_strTheme"));
    String l_exitLabel = FCUtility.validateParameter(request.getParameter("ExitLabel"));
    String l_okLabel = FCUtility.validateParameter(request.getParameter("OkLabel"));
    String gAction          = FCUtility.validateParameter(request.getParameter("gAction"));
    String g_txnBranch      = FCUtility.validateParameter(request.getParameter("g_txnBranch"));
    String txnBranchUC      = FCUtility.validateParameter(request.getParameter("txnBranchUC"));
    String blockId          = FCUtility.validateParameter(request.getParameter("blockId"));
    /* # BUG 15978732 fixes end */ 
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
       
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String previousRec   = (String)itemDescMap.get("LBL_PREVIOUS");
    String nextRec       = (String)itemDescMap.get("LBL_NEXT");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    
String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>"> 
  <head>
    <title><%=StringEscapeUtils.escapeHTML(FCUtility.validateParameter(request.getParameter("title")))%></title><%-- BUG 15978732 fixes start--%>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content=0>
    <link href="Theme/<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>
    <link href="Theme/<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
    <link href="Theme/<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
    <link href="Theme/<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
    <!--HTML5 Changes Start -->    
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
<link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">
        <link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css">
        <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
        <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
        <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_nonextsingle_view.js"></script>

    <script type="text/javascript">
    //var dlgArg         = dialogArguments;
    var gAction        = '<%=StringEscapeUtils.escapeJavaScript(gAction)%>';
    var mainWin        = parent.mainWin;
    var functionId     = '<%=StringEscapeUtils.escapeJavaScript(functId)%>';
    var g_txnBranch    = '<%=StringEscapeUtils.escapeJavaScript(g_txnBranch)%>';
    var isSingleView   = true;
    gscrPos = '<%=StringEscapeUtils.escapeJavaScript(gscrPos)%>';
    var blockId='<%=StringEscapeUtils.escapeJavaScript(blockId)%>';
    var gInpDateFormat = "dd/MM/yyyy";    
    var strTheme = parent.strTheme;
    function getFieldData(currObject) {
        var fieldValue = "";
	var tagName = currObject.tagName;

	switch(tagName.toUpperCase()) {
		case 'INPUT' :
		{
			var DBC  = NVL(currObject.getAttribute("DBC"));
                        var type       = currObject.type;
                        switch(type.toUpperCase())
                        {
                            case 'TEXT':
                            {
                                  fieldValue = currObject.value
                                  break;
                                }
                                case 'HIDDEN':
                                {
                                  fieldValue = currObject.value;
                                  break;
                                }
                                case 'PASSWORD':
                                {
                                    fieldValue = currObject.value;
                                    break;
                                }
                                case 'CHECKBOX':
                                {
                                  if (currObject.checked){
                                if(currObject.getAttribute("ON")){
                                        fieldValue = currObject.getAttribute("ON");
                                }else {
                                      fieldValue = CHECK_B0X_SELECTED_VALUE;
                                    }
                            }else {
                                if(currObject.getAttribute("OFF")){
                                        fieldValue = currObject.getAttribute("OFF");
                                }else {
                                      fieldValue = CHECK_B0X_UNSELECTED_VALUE;
                                    }
                                  }
                                  break;
                                }
                                case 'RADIO':
                                {
                                  fieldValue = getRadioButtonData(currObject);
                                  break;
                                }
                      }
                      break;
                    }
                    case 'SELECT':
                    {
                            fieldValue = getSelectedIndexValue(currObject);
                             break;
                     }
                    case 'TEXTAREA':
                    {
                            fieldValue = currObject.value;
                            break;
                    }
                }
            return fieldValue;
    }
    function getRadioButtonData(radioObject) {
        var radioValue = "";
	var radioObjects = document.form1.elements[radioObject.name];
	for(var index = 0; index < radioObjects.length; index++) {
		if(radioObjects[index].checked) {
			radioValue = radioObjects[index].value;
			break;
		}
	}
        return radioValue;
    }
    
    function getSelectedIndexValue(selectObject) {
	var selectedValue;
	for (var index = 0; index < selectObject.options.length; index++) {
            if(selectObject.options[index].selected) {
                selectedValue = selectObject.options[index].value
                break;
            }
        }
        return selectedValue;
    }
        </script>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/GlobalConstants.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/UIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/AmountUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/Validations.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/SingleView.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/Util.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%--<script type="text/javascript" src="Script/JS/DateUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> --%>
        <script type="text/javascript" src="Script/JS/MaskFormatter.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%-- <script type="text/javascript" src="Script/JS/OvrdMsgs.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> --%>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(functId)%>.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <%
    if("C".equalsIgnoreCase(thirdChar) || "R".equalsIgnoreCase(thirdChar) || "B".equalsIgnoreCase(thirdChar)){
        %>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(functId)%>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <%
    } else{
        %>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/SYS/<%= StringEscapeUtils.escapeURL(functId) %>_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <%
    }
        %>
        <script type="text/javascript" src="Script/JS/Databinding.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
  </head>
    <body onload="" class="" onhelp="return disableDefault();">
    <oj-dialog id="scrollingDialog" initial-visibility="show" 
                      position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center" 
                      position.of="window"  
                      style=" min-width: 70vw;min-height: 100vh;max-height: 100vh;height: 100vh;"  
                      class="oj-sm-width-half">
               <div slot="header" class="oj-dialog-title oj-flex-bar oj-sm-align-items-center bottom-border" style="width: 100%"  id="WNDtitlebar">
                    
                   
                        <!--<div id="wndtitle">  </div>-->
                            <div class="oj-flex-bar-start">
                                <h1><%=StringEscapeUtils.escapeHTML(request.getParameter("title"))%></h1>
                </div>
                             
                            <div class="oj-flex-bar-end">
                            <OJ-BUTTON class="oj-button oj-button-half-chrome oj-button-text-only" chroming="solid"  tabindex="-1" onclick=fnDispPrevSingleViewRecord()><span slot="startIcon" class="oj-ux-ico-caret-left"></span></OJ-BUTTON>
                            
                                <OJ-BUTTON class="oj-button oj-button-half-chrome oj-button-text-only" chroming="solid" tabindex="-1"  onclick=fnDispNextSingleViewRecord()><span slot="startIcon" class="oj-ux-ico-caret-right"></span></OJ-BUTTON>
                            <!--<oj-button display="icons" chroming="borderless" type="button" class="WNDcls" accesskey="6" id ="WNDbuttonsMin" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onclick="fnExitSingleView()">
                               <span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
                               </oj-button>-->
                                
            </div>
                      
                    
                <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
                    
                </div>
                
                <div slot="body">
        <DIV class="" id="DIVWNDContainer">
         <div class="oj-flex-bar oj-flex-bar-start oj-sm-align-items-center">
                        <div class="footer-btn-container oj-flex-bar-start">
                        </div>
                        <div class="footer-btn-container oj-flex-bar-end">
                             <div class="oj-flex-bar-end">
                             </div>  
                        </div>
                    </div>    
            <DIV class="" id="DIVScrContainer" >  <!--UI alignment 12.1 -->
                
                <DIV id=ResTree class="">
                    <div  id="DIVMainTmp" class="">
                        <div id="SINGLE_VIEW">
                        </div>
                    </div>
                </DIV>     
           <!-- <div class="WNDtitlebar" id="WNDtitlebar" onmousedown="startDrag('ChildWin', event)">
                <B class="BTNicon"><span class="ICOflexcube"></span></B>
                <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(request.getParameter( "title"))%></h1>
                <div class="WNDbuttons">
                    <a class="WNDcls" id ="WNDbuttons" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onclick="fnExitSingleView()" onkeydown="return fnHandleSVBtn(event)">
                    <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                    </a>
                </div>
            </div>
            <DIV class="WNDcontentmodal smallwin" id="DIVScrContainer">
                <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
                <div class="DIVLovNav" id="TBL_SINGLE_VIEW_BUTTONS" style="width:98%">
                    <button class="BUTTONInline" tabindex="-1" onclick="fnDispPrevSingleViewRecord()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="<%=StringEscapeUtils.escapeHTML(previousRec)%>"><span class=" IMGInline BTNPreviousGIF" title="<%=StringEscapeUtils.escapeHTML(previousRec)%>"></span></button>
                    &nbsp;
                    <button class="BUTTONInline" tabindex="-1" onclick="fnDispNextSingleViewRecord()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="<%=StringEscapeUtils.escapeHTML(nextRec)%>"><span class=" IMGInline BTNNextGIF" title="<%=StringEscapeUtils.escapeHTML(nextRec)%>"></button>
                </div>
                <div id="ResTree" class="DIVTwoColLyt">
                    <div style="height: 340px; width:99%;" id="DIVMainTmp" class="DIVHeaderBodyContainer">
                        <div class="DIVColumnOne" id="SINGLE_VIEW">
                        </div>
                    </div>
                </div>
                <div class="DIVfooter">
                    <table class="TBLlyt" summary="" width="100%" cellpadding="4" cellspacing="0" >
                        <tbody>
                            <tr>
                                <td width="80%">&nbsp;</td>
                                <td width="20%" nowrap="nowrap">
                                    <%--<input id="BTN_OK" type="button" NAME="BTN_OK" OnClick="fnSaveSingleViewScreen()" class="BUTTONOk" onMouseOver="this.className='BUTTONOkHover'" onMouseOut="this.className='BUTTONOk'" onFocus="this.className='BUTTONOkHover'" onBlur="this.className='BUTTONOk'" value="<%=StringEscapeUtils.escapeJavaScript(l_okLabel)%>">
                                    <input id="BTN_EXIT" type="button" NAME="BTN_EXIT" OnClick="fnExitSingleView()" class="BUTTONCancel" onMouseOver="this.className='BUTTONCancelHover'" onMouseOut="this.className='BUTTONCancel'" onFocus="this.className='BUTTONCancelHover'" onBlur="this.className='BUTTONCancel'" value="<%=StringEscapeUtils.escapeJavaScript(l_exitLabel)%>">--%>
                                    <button class="BUTTONExit" id="BTN_OK" NAME="BTN_OK" OnClick="fnSaveSingleViewScreen()" onblur="this.className='BUTTONExit'" onmouseover="this.className='BUTTONExitHover'" onfocus="this.className='BUTTONExitHover'" onmouseout="this.className='BUTTONExit'"><%=StringEscapeUtils.escapeHTML(l_okLabel)%></button>
                                    <button class="BUTTONOk" id="BTN_EXIT" NAME="BTN_EXIT" OnClick="fnExitSingleView()"  onblur="this.className='BUTTONOk'" onmouseover="this.className='BUTTONOkHover'" onfocus="this.className='BUTTONOkHover'" onmouseout="this.className='BUTTONOk'" onkeydown="return fnHandleSVBtn(event)"><%=StringEscapeUtils.escapeHTML(l_exitLabel)%></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DIV>
        </DIV>
        <div id="parentContent" style="display:none"></div>
        <div id="masker" class="masker" style="display:none">
            <div id="Div_ChildWin" style="display:none; width:100%; height:100%"></div>
                <div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none">--><!--HTML5 Changes-->
                <!--    <iframe id="ifr_AlertWin" class="frames" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
                </div>
        </div>-->
         </div>
            </div>
        </div>
         <div slot="footer">
                <div class="oj-flex-bar oj-sm-align-items-center">
                    <div class="footer-btn-container oj-flex-bar-start">
                    </div>
                    <div class="footer-btn-container oj-flex-bar-end">
                        <oj-button class="oj-sm-margin-1x" chroming="solid"  id=BTN_EXIT_IMG  on-oj-action="[[fnExitSingleView.bind(null)]]"  name=BTN_EXIT onkeydown="return fnHandleSVBtn(event)"><%=StringEscapeUtils.escapeHTML(l_exitLabel)%></oj-button>
                         <oj-button class="oj-sm-margin-1x action-button-primary" chroming="solid"   name=BTN_OK on-oj-action="[[fnSaveSingleViewScreen.bind(null)]]"   ><%=StringEscapeUtils.escapeHTML(l_okLabel)%></oj-button>
                    </div>
                </div>
                </div>
        <div id="parentContent" style="display:none"></div>
        
       
    </oj-dialog>
    <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
            </div>
            <div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none;z-index:6000">
                <iframe id="ifr_AlertWin" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
    </body>
</html>
