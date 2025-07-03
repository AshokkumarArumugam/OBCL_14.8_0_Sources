<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : AccessKeyDetails.jsp
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

**	Modified By   : Vignesh M G
** 	Modified on   : 23/01/2020
** 	Description   : INFRA CHANGES FOR OBTR 14.4 ENHANCEMENTS
** 	Search String : 30620131

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css
-------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String strUserId = (String)session.getAttribute("USERID");
    String entity = (String)session.getAttribute("ENTITY");
    String strTheme = (String)session.getAttribute("THEME");
    String ieCss       = (String)session.getAttribute("IECSS");
    String Strlang         = (String)session.getAttribute("LANG");
    String StrIsoLang = (String)session.getAttribute("LANGISOMAP");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
     String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
    /*Accessbility changes start  */
    String accessKey ="";
    String userAgent = request.getHeader("USER-AGENT").toUpperCase();
    if (userAgent.contains("MSIE") || (userAgent.contains("TRIDENT") && userAgent.contains("RV")))//ie11 changes
   
        accessKey = "Alt";
    else if(userAgent.contains("FIREFOX"))
        accessKey = "Alt+Shift";
    else if (userAgent.contains("OPERA")) 
        accessKey = "Shift+Esc";
    else if (userAgent.contains("CHROME")) 
        accessKey = "Alt OR Alt+Shift";
    else if (userAgent.contains("SAFARI")) 
        accessKey = "Alt OR Alt+Shift";
    /*Accessbility changes end  */
    //FCUserGlobals gObjUC   = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrIsoLang)%>">
    <head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrIsoLang)%>">
        <meta http-equiv="cache-control" content="no-cache">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <!--<link id="LINKCSS" href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
       <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrIsoLang)%>.css" rel="stylesheet" type="text/css"/>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
        
        <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">
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
        <%
            
            String appName = BranchConstants.APPLICATION_NAME;
            String l_strTheme = strTheme.substring(0, strTheme.indexOf(".css"));
            String theme_imagesPath = "Images/"+l_strTheme;

            FBContext fbContext = new FBContext(strUserId);
            //BranchLogger brnLogger = new BranchLogger(strUserId);
            //fbContext.setBrnLogger(brnLogger);            
            
            Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,strUserId);
           
            String strActions       = (String)itemDescMap.get("LBL_ACTIONS");
            String strActionNew     = (String)itemDescMap.get("LBL_ACTION_NEW");
            String strCopy          = (String)itemDescMap.get("LBL_ACTION_COPY"); 
            String strUnlock        = (String)itemDescMap.get("LBL_ACTION_UNLOCK");
            String strClose         = (String)itemDescMap.get("LBL_ACTION_CLOSE");
            String strReopen        = (String)itemDescMap.get("LBL_ACTION_REOPEN");
            String strDelete        = (String)itemDescMap.get("LBL_ACTION_DELETE");
            String strAuthorize     = (String)itemDescMap.get("LBL_ACTION_AUTHORIZE");        
            String strRollover      = (String)itemDescMap.get("LBL_ACTION_ROLLOVER");
            String strReverse       = (String)itemDescMap.get("LBL_ACTION_REVERSE");
            String strConfirm       = (String)itemDescMap.get("LBL_ACTION_CONFIRM");
            String strLiquidate     = (String)itemDescMap.get("LBL_ACTION_LIQUIDATE");
            String strHold          = (String)itemDescMap.get("LBL_ACTION_HOLD");   
            String strActionPrint   = (String)itemDescMap.get("LBL_ACTION_PRINT");
            String strSave          = (String)itemDescMap.get("LBL_TOOLBAR_SAVE");
            String strSignOff       = (String)itemDescMap.get("LBL_ACTION_SIGN_OFF");
            String strExit          = (String)itemDescMap.get("LBL_EXIT");  
            String strHelp          = (String)itemDescMap.get("LBL_HELP1");
            String strOptions       = (String)itemDescMap.get("LBL_OPTIONS");
            String strLoggedUser    = (String)itemDescMap.get("LBL_LOGGED_USER");
            String strWindows       = (String)itemDescMap.get("LBL_WINDOWS");
            String strOperations    = (String)itemDescMap.get("LBL_OPERATIONS");
            /*Accessbility changes start */
            String strExport  = (String)itemDescMap.get("LBL_EXPORT");
            String strReset   = (String)itemDescMap.get("LBL_RESET");
            String strAdvSearch   = (String)itemDescMap.get("LBL_ADV_SEARCH");
            String strClearAll   = (String)itemDescMap.get("LBL_CLEAR_ALL");
            /*Accessbility changes end */
            String strNew           = (String)itemDescMap.get("LBL_NEW");
            String strPrint         = (String)itemDescMap.get("LBL_PRINT");
            String strOk            = (String)itemDescMap.get("LBL_OK");
            String strCancel        = (String)itemDescMap.get("LBL_CANCEL");
            String strEntQry        = (String)itemDescMap.get("LBL_ENTR_QUERY");
            String strExeQry        = (String)itemDescMap.get("LBL_EXEC_QUERY");
            /*Accessbility changes start */
            //String strClosedialog   = (String)itemDescMap.get("LBL_CLOSE_DIALOG");
            String strClosedialog   = (String)itemDescMap.get("LBL_CLOSE_DIALOG_NEW");
            String strfooternote = (String)itemDescMap.get("LBL_FOOTER_NOTE");
           /*Accessbility changes end */
            String strChgBrn           = (String)itemDescMap.get("LBL_CHANGE_BRANCH");
            String strHomeBranch    = (String)itemDescMap.get("LBL_HOME");  
            String strFastpath      = (String)itemDescMap.get("LBL_FASTPATH");
            String strTBFirstitem   = (String)itemDescMap.get("LBL_TBFIRSTITEM");
            String strFirstSbmenu   = (String)itemDescMap.get("LBL_FIRSTSBMENU");
            String strSbmenuheader  = (String)itemDescMap.get("LBL_SBMENUHEADER");  
            String strTaskareaheader= (String)itemDescMap.get("LBL_TASKAREAHEADER");
            String strMenumap       = (String)itemDescMap.get("LBL_MENUMAP");
            String strKeyinformation = (String)itemDescMap.get("LBL_KEYINFORMATION");
            String strKeyinfo        = (String)itemDescMap.get("LBL_KEYINFO");
            String strSkipToolbar    = (String)itemDescMap.get("LBL_SKIP_TO_TOOLBAR");
            String strSkipMainNav    = (String)itemDescMap.get("LBL_SKIPTO_MAIN_NAV");
            String strDrillMainNav   = (String)itemDescMap.get("LBL_DRILL_MAIN_NAV");
            String strSkipDashboard  = (String)itemDescMap.get("LBL_SKIPTO_DASHBOARD");
            String strSkipTabs       = (String)itemDescMap.get("LBL_SKIPTO_TABS");
            String strSkipFooter     = (String)itemDescMap.get("LBL_SKIPTO_FOOTER");
                    
            String strBrowserKeys    = (String)itemDescMap.get("LBL_BROWSER_KEYS");
            String strIE             = (String)itemDescMap.get("LBL_INTERNET_EXPLORER");
            String strFF             = (String)itemDescMap.get("LBL_FIREFOX");
            String strOpera          = (String)itemDescMap.get("LBL_OPERA");
            String strGC             = (String)itemDescMap.get("LBL_GOOGLE_CHROME");
            String strSafari         = (String)itemDescMap.get("LBL_SAFARI");
            
            String strNexttab       = (String)itemDescMap.get("LBL_NEXTTAB");
            String strPrevtab       = (String)itemDescMap.get("LBL_PREVTAB");
			//30620131 start
            String strNextSubScreen = (String)itemDescMap.get("LBL_NEXT_SUBSCREEN");
            String strPrevSubScreen = (String)itemDescMap.get("LBL_PREV_SUBSCREEN");
            //30620131 end
            String strSwitchwindows = (String)itemDescMap.get("LBL_SWITCH_WINDOWS");
            /*Accessbility changes start  */
            //String strShortcuts     = (String)itemDescMap.get("LBL_SHORCUTS");
            String strShortcuts     = (String)itemDescMap.get("LBL_OTHERS");
            // String strContextPopup  = (String)itemDescMap.get("LBL_CONTEXTPOPUP");
            String strContextPopup  = (String)itemDescMap.get("LBL_CONTEXTPOPUP_NEW");
            //String strDataTable  = (String)itemDescMap.get("LBL_DATA_TABLE");
            String strDataTable  = (String)itemDescMap.get("LBL_DATA_TABLE_NEW");
            /*Accessbility changes end  */
            String strNavRows    = (String)itemDescMap.get("LBL_NAV_ROWS");
            String strNavCells   = (String)itemDescMap.get("LBL_NAV_CELLS");
            String strNavGrid    = (String)itemDescMap.get("LBL_NAV_GRID");
            
            String strFirstPage  = (String)itemDescMap.get("LBL_FIRST_PAGE");
            String strPrevPage   = (String)itemDescMap.get("LBL_PREVIOUS_PAGE");
            String strNextPage   = (String)itemDescMap.get("LBL_NEX_PAGE");
            String strLastPage   = (String)itemDescMap.get("LBL_LAST_PAGE");
            String strAddRow     = (String)itemDescMap.get("LBL_ADDROW");
            String strDeleteRow  = (String)itemDescMap.get("LBL_DELETEROW");
            String strSingleRecView  = (String)itemDescMap.get("LBL_SINGLE_RECORD_VIEW");
            /*Accessbility changes start  */
            //String strExitTable  = (String)itemDescMap.get("LBL_EXIT_TABLE");
            String strExitTable  = (String)itemDescMap.get("LBL_EXIT_TABLE_NEW");
            /*Accessbility changes end  */
            String strGotoFormField  = (String)itemDescMap.get("LBL_GOTO");
            /*Accessbility changes start  */     
            String strCalendar  = (String)itemDescMap.get("LBL_CALENDAR_ACCESS");
			/*Accessbility changes end  */
            String strPrevYear  = (String)itemDescMap.get("LBL_PREVIOUS_YEAR");
            String strPrevMon   = (String)itemDescMap.get("LBL_PREVIOUS_MONTH");
            String strNextMon   = (String)itemDescMap.get("LBL_NEXT_MONTH");
            String strNextYear  = (String)itemDescMap.get("LBL_NEXT_YEAR");            
                     
            String strAccessmenu    = (String)itemDescMap.get("LBL_AKMENU");
            /*Accessbility changes start  */
            //String strAccessnavigation = (String)itemDescMap.get("LBL_AKNAVIGATION");
            String strAccessnavigation = (String)itemDescMap.get("LBL_AKNAVIGATION_NEW");
            /*Accessbility changes end  */
            String strHotkeynavigation = (String)itemDescMap.get("LBL_HKNAVIGATION");
            /*Accessbility changes start  */
            //String strHotkeyactions = (String)itemDescMap.get("LBL_HKACTIONS");
            String strHotkeyactions = (String)itemDescMap.get("LBL_HKACTIONS_NEW"); 
            
            String strHotkeysummactions = (String)itemDescMap.get("LBL_HKACTIONS_SUMM"); 
			/*Accessbility changes end  */
            String strNoScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL"); 
            /*Added as part of 11.1*/
            String strWindow        = (String)itemDescMap.get("LBL_WINDOW");
            String strBranch        = (String)itemDescMap.get("LBL_BRANCH");
            String strEntity        = (String)itemDescMap.get("LBL_ENTITY"); //SMSStandalone12.3 Changes
            String strCustomer      = (String)itemDescMap.get("LBL_CUSTOMER");
            String strInteractions  = (String)itemDescMap.get("LBL_INTERACTIONS");
            String strPreferences   = (String)itemDescMap.get("LBL_PREFERENCES");
            String strSearch        = (String)itemDescMap.get("LBL_SEARCH");
            String strHome          = (String)itemDescMap.get("LBL_HOME");
            String strWorkflow      = (String)itemDescMap.get("LBL_WORKFLOW");
            String strTasks         = (String)itemDescMap.get("LBL_TASKS");
           
            /*Accessbility changes start  */
            // String strDashboardShortcuts         = (String)itemDescMap.get("LBL_DASHBOARD_SHORTCUTS");
            String strDashboardShortcuts         = (String)itemDescMap.get("LBL_DASHBOARD_SHORTCUTS_NEW");
            String strLayTab = (String)itemDescMap.get("LBL_LAYOUT_TABLE");
            /*Accessbility changes end  */
            String strDashboard1    = (String)itemDescMap.get("LBL_DASHBOARD1");
            String strDashboard2    = (String)itemDescMap.get("LBL_DASHBOARD2");
            String strDashboard3    = (String)itemDescMap.get("LBL_DASHBOARD3");
            String strDashboard4    = (String)itemDescMap.get("LBL_DASHBOARD4");
            String strDashboard5    = (String)itemDescMap.get("LBL_DASHBOARD5");
            String strDashboard6    = (String)itemDescMap.get("LBL_DASHBOARD6");
            String strMinMax    = (String)itemDescMap.get("LBL_MINMAX");
            String strRefreshLanding    = (String)itemDescMap.get("LBL_REFRESH_LANDING");
            String strRefresh = (String)itemDescMap.get("LBL_REFRESH");
            String strTemplate      = (String)itemDescMap.get("LBL_ACTION_TEMPLATE");
            String strGenerate      = (String)itemDescMap.get("LBL_ACTION_GENERATE");
            String strView          = (String)itemDescMap.get("LBL_TOOLBAR_VIEW");
            String strSummQuery   	= (String)itemDescMap.get("LBL_SAVED_QUERY");
            /*Accessbility changes start  */
            // String strAppHotKeys    = (String)itemDescMap.get("LBL_APP_HOTKEYS");
            String strAppHotKeys    = (String)itemDescMap.get("LBL_APP_HOTKEYS_NEW");
            /*Accessbility changes end  */
            String strAppCloseOperat    = (String)itemDescMap.get("LBL_CLOSE_OP");
            /*Accessbility changes start  */
            //String strCloseWin      = (String)itemDescMap.get("LBL_CLOSEWIN");
            String strCloseWin      = (String)itemDescMap.get("LBL_CLOSEWIN_UP");
            String strNavleft      = (String)itemDescMap.get("LBL_NAV_LEFT");
            String strNavRight      = (String)itemDescMap.get("LBL_NAV_RIGHT");
            /*Accessbility changes end  */
           
            String strTillContent   = (String)itemDescMap.get("LBL_TILL_CONTENT");
            String strMinimize      = (String)itemDescMap.get("LBL_MINIMIZE");
            //9NT1466- FCUBS11.3.1-UsabilityChanges-Accessibility Start
            String strCustSign 	  = (String)itemDescMap.get("LBL_CUST_SIGN");
            String strCustInstr 	  = (String)itemDescMap.get("LBL_CUST_INSTR");
            String strOpenSibling= (String)itemDescMap.get("LBL_OPEN_SIBLING");
            String strCustImage	  = (String)itemDescMap.get("LBL_CUST_IMAGE");
            String strCustBalance= (String)itemDescMap.get("LBL_CUSTOMER_BALANCE");
            String strBrowName =""; 
            String keys = "";
            String strContextHelp="";
            if("FCJ".equalsIgnoreCase(appName))
            strContextHelp   = (String)itemDescMap.get("LBL_CONTEXTHELP_FCJ");
            else if("FCIS".equalsIgnoreCase(appName))
            strContextHelp   = (String)itemDescMap.get("LBL_CONTEXTHELP");
            //9NT1466- FCUBS11.3.1-UsabilityChanges-Accessibility End 
            String strJADetails          = (String)itemDescMap.get("LBL_JNT_ACC"); /*FCUBS_12.1_CASA_Joint_Holder_Display Changes */
            String strCustLandOperat    = (String)itemDescMap.get("LBL_CUST_OP");
            String strCustNexttab       = (String)itemDescMap.get("LBL_CUST_NEXTTAB");
            String strCustPrevtab       = (String)itemDescMap.get("LBL_CUST_PREVTAB");
        %>
        <title><%=StringEscapeUtils.escapeHTML(strKeyinformation)%> </title>
         <%-- Security bug SEC-12-Patch-081 fixes starts --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(strNoScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends --%>
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(strNoScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/SmhTlBar.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(strNoScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(strNoScriptLabel)%></noscript>
        
         <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_misc.js"></script>
        
        <script type="text/javascript">
            var mainWin = parent;
            var alertType = "I";
            var accessKeyDetail =  true;
            function closeWindow(event) {
                if (event.keyCode == 27) {
                mainWin.fnUpdateScreenSaverInterval(); /*12.0.2 Screen Saver Changes*/
                    fnCloseToolbarScreen();
                    return;
                }
            }

	        </script>
        <noscript><%=StringEscapeUtils.escapeJavaScript(strNoScriptLabel)%></noscript>
        <style>
        td, th, h1 {white-space:nowrap}
        </style>
    </head>
   <body class="BDYform" onkeydown="closeWindow(event)">
        <div id="DIVif1" >
                <oj-dialog id="scrollingDialog"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                                  position.at.horizontal="center" position.at.vertical="center"
                                  position.of="window" class="oj-sm-width-full">
              
                   
                        <DIV   slot=header id="wndtitle" class="oj-dialog-title" >
                            <h1 ><%=StringEscapeUtils.escapeHTML(strKeyinformation)%></h1>     
                            
                            
                        </DIV>
                         <DIV slot="body" id="wndwidth">
                            <div id="ResTree">
                  
                    <div class="oj-flex FSTdlg" style="padding:3px">
                    
                    <div style="height:100%" class=" oj-sm-width-1/3">
                    <div class="oj-panel oj-sm-margin-2x">
                    <h4><%=StringEscapeUtils.escapeHTML(strHotkeyactions)%></h4>
                                        
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x12"><%=StringEscapeUtils.escapeHTML(strActionNew)%></oj-label><div slot="value"><oj-input-text slot="value" id="x12" readonly="readonly" class="TXTro" size="15" value="Ctrl+N" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x17"><%=StringEscapeUtils.escapeHTML(strSave)%></oj-label><div slot="value"><oj-input-text slot="value" id="x17" readonly="readonly" class="TXTro" size="15" value="Ctrl+S" /></div></oj-label-value>                                 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x3"><%=StringEscapeUtils.escapeHTML(strCopy)%></oj-label><div slot="value"><oj-input-text slot="value" id="x3" readonly="readonly" class="TXTro" size="15" value="Ctrl+Shift+C" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x21"><%=StringEscapeUtils.escapeHTML(strClose)%></oj-label><div slot="value"><oj-input-text slot="value" id="x21" readonly="readonly" class="TXTro" size="15" value="Ctrl+Shift+Y" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x22"><%=StringEscapeUtils.escapeHTML(strAuthorize)%></oj-label><div slot="value"><oj-input-text slot="value" id="x22" readonly="readonly" class="TXTro" size="15" value="Ctrl+Shift+Z" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x4"><%=StringEscapeUtils.escapeHTML(strDelete)%></oj-label><div slot="value"><oj-input-text slot="value" id="x4" readonly="readonly" class="TXTro" size="15" value="Ctrl+D" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x19"><%=StringEscapeUtils.escapeHTML(strUnlock)%></oj-label><div slot="value"><oj-input-text slot="value" id="x19" readonly="readonly" class="TXTro" size="15" value="Ctrl+U" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x16"><%=StringEscapeUtils.escapeHTML(strReopen)%></oj-label><div slot="value"><oj-input-text slot="value" id="x16" readonly="readonly" class="TXTro" size="15" value="Ctrl+R" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x5"><%=StringEscapeUtils.escapeHTML(strReverse)%></oj-label><div slot="value"><oj-input-text slot="value" id="x5" readonly="readonly" class="TXTro" size="15" value="Ctrl+E" /></div></oj-label-value>                                
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x20"><%=StringEscapeUtils.escapeHTML(strRollover)%></oj-label><div slot="value"><oj-input-text slot="value" id="x20" readonly="readonly" class="TXTro" size="15" value="Ctrl+Shift+V" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x15"><%=StringEscapeUtils.escapeHTML(strLiquidate)%></oj-label><div slot="value"><oj-input-text slot="value" id="x15" readonly="readonly" class="TXTro" size="15" value="Ctrl+Q" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x7"><%=StringEscapeUtils.escapeHTML(strHold)%></oj-label><div slot="value"><oj-input-text slot="value" id="x7" readonly="readonly" class="TXTro" size="15" value="Ctrl+H" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x1"><%=StringEscapeUtils.escapeHTML(strTemplate)%></oj-label><div slot="value"><oj-input-text slot="value" id="x1" readonly="readonly" class="TXTro" size="15" value="Ctrl+Shift+A" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x2"><%=StringEscapeUtils.escapeHTML(strGenerate)%></oj-label><div slot="value"><oj-input-text slot="value" id="x2" readonly="readonly" class="TXTro" size="15" value="Ctrl+B" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x14"><%=StringEscapeUtils.escapeHTML(strActionPrint)%></oj-label><div slot="value"><oj-input-text slot="value" id="x14" readonly="readonly" class="TXTro" size="15" value="Ctrl+P" /></div></oj-label-value> 
                                <%--FCUBS_12.1_CASA_Joint_Holder_Display Changes--%>
                                            <!--<oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x8"><%=StringEscapeUtils.escapeHTML(strView)%></oj-label><div slot="value"><oj-input-text slot="value" id="x8" readonly="readonly" class="TXTro" size="15" value="Ctrl+J" /></div></oj-label-value> -->
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x23"><%=StringEscapeUtils.escapeHTML(strEntQry)%></oj-label><div slot="value"><oj-input-text slot="value" id="x23" readonly="readonly" class="TXTro" size="15" value="F7" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x24"><%=StringEscapeUtils.escapeHTML(strExeQry)%></oj-label><div slot="value"><oj-input-text slot="value" id="x24" readonly="readonly" class="TXTro" size="15" value="F8" /></div></oj-label-value> 
                                     
                    
                    </div>
                    <div class="oj-panel oj-sm-margin-2x">
                                    <h4><%=StringEscapeUtils.escapeHTML(strAppHotKeys)%></h4>
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="e5"><%=StringEscapeUtils.escapeHTML(strContextHelp)%></oj-label><div slot="value"><oj-input-text slot="value"id="e5" readonly="readonly" class="TXTro" size="15" value="F1" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="e33"><%=StringEscapeUtils.escapeHTML(strContextPopup)%></oj-label><div slot="value"><oj-input-text slot="value"id="e33" readonly="readonly" class="TXTro" size="15" value="F4" /></div></oj-label-value> 	
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="e7"><%=StringEscapeUtils.escapeHTML(strCustInstr)%></oj-label><div slot="value"><oj-input-text slot="value"id="e7" readonly="readonly" class="TXTro" size="15" value="F6" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="e9"><%=StringEscapeUtils.escapeHTML(strCustImage)%></oj-label><div slot="value"><oj-input-text slot="value"id="e9" readonly="readonly" class="TXTro" size="15" value="F10" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="e10"><%=StringEscapeUtils.escapeHTML(strCustBalance)%></oj-label><div slot="value"><oj-input-text slot="value"id="e10" readonly="readonly" class="TXTro" size="15" value="F11" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="e11"><%=StringEscapeUtils.escapeHTML(strCustSign)%></oj-label><div slot="value"><oj-input-text slot="value"id="e11" readonly="readonly" class="TXTro" size="15" value="F12" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x18"><%=StringEscapeUtils.escapeHTML(strTillContent)%></oj-label><div slot="value"><oj-input-text slot="value"id="x18" readonly="readonly" class="TXTro" size="15" value="Ctrl+Shift+D" /></div></oj-label-value>   <%--Fix for 21362214--%>
                                <%--FCUBS_12.1_CASA_Joint_Holder_Display Changes--%>
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x8"><%=StringEscapeUtils.escapeHTML(strJADetails)%></oj-label><div slot="value"><oj-input-text slot="value"id="x8" readonly="readonly" class="TXTro" size="15" value="Ctrl+J" /></div></oj-label-value> 
                     </div>
                     
                     <div class="oj-panel oj-sm-margin-2x">
                     <h4><%=StringEscapeUtils.escapeHTML(strHotkeysummactions)%></h4>
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="y1"><%=StringEscapeUtils.escapeHTML(strExport)%></oj-label><div slot="value"><oj-input-text slot="value"id="y1" readonly="readonly" class="TXTro" size="15" value="Ctrl+E" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="y2"><%=StringEscapeUtils.escapeHTML(strReset)%></oj-label><div slot="value"><oj-input-text slot="value"id="y2" readonly="readonly" class="TXTro" size="15" value="Ctrl+R" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="y3"><%=StringEscapeUtils.escapeHTML(strAdvSearch)%></oj-label><div slot="value"><oj-input-text slot="value"id="y3" readonly="readonly" class="TXTro" size="15" value="Ctrl+Q" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="y4"><%=StringEscapeUtils.escapeHTML(strClearAll)%></oj-label><div slot="value"><oj-input-text slot="value"id="y4" readonly="readonly" class="TXTro" size="15" value="Ctrl+L" /></div></oj-label-value> 	
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="y4"><%=StringEscapeUtils.escapeHTML(strRefresh)%></oj-label><div slot="value"><oj-input-text slot="value"id="y4" readonly="readonly" class="TXTro" size="15" value="Ctrl+H" /></div></oj-label-value> 	
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="y4"><%=StringEscapeUtils.escapeHTML(strSummQuery)%></oj-label><div slot="value"><oj-input-text slot="value"id="y4" readonly="readonly" class="TXTro" size="15" value="F7" /></div></oj-label-value> 	
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x24"><%=StringEscapeUtils.escapeHTML(strExeQry)%></oj-label><div slot="value"><oj-input-text slot="value"id="x24" readonly="readonly" class="TXTro" size="15" value="F8" /></div></oj-label-value> 
                            
                     </div>
                      
                                
                    </div> <!-- column 1 ends-->
                     <div style="height:100%" class=" oj-sm-width-1/3">
                    <div class="oj-panel oj-sm-margin-2x">
                     <h4><%=StringEscapeUtils.escapeHTML(strAccessnavigation)%></h4>
                                            <%-- fix for 17014727 <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t1"><%=StringEscapeUtils.escapeHTML(strKeyinfo)%></oj-label><div slot="value"><oj-input-text slot="value"id="t1" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+0" /></div></oj-label-value> --%>
                                            <%-- <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t1a"><%=StringEscapeUtils.escapeHTML(strSkipToolbar)%></oj-label><div slot="value"><oj-input-text slot="value"id="t1a" readonly="readonly" class="TXTro" size="15" value="1" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t2"><%=StringEscapeUtils.escapeHTML(strSkipMainNav)%></oj-label><div slot="value"><oj-input-text slot="value"id="t2" readonly="readonly" class="TXTro" size="15" value="2" /></div></oj-label-value>  --%>
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t1a"><%=StringEscapeUtils.escapeHTML(strRefreshLanding)%></oj-label><div slot="value"><oj-input-text slot="value"id="t1a" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+1" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t2"><%=StringEscapeUtils.escapeHTML(strMinMax)%></oj-label><div slot="value"><oj-input-text slot="value"id="t2" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+2" /></div></oj-label-value> 
                                            <%-- fix for 17014727 <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t3"><%=StringEscapeUtils.escapeHTML(strDrillMainNav)%></oj-label><div slot="value"><oj-input-text slot="value"id="t3" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+3" /></div></oj-label-value> --%>
                                            <%-- <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t4"><%=StringEscapeUtils.escapeHTML(strSkipDashboard)%></oj-label><div slot="value"><oj-input-text slot="value"id="t4" readonly="readonly" class="TXTro" size="15" value="4" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t4b"><%=StringEscapeUtils.escapeHTML(strSkipFooter)%></oj-label><div slot="value"><oj-input-text slot="value"id="t4b" readonly="readonly" class="TXTro" size="15" value="5" /></div></oj-label-value>  --%>
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t4a"><%=StringEscapeUtils.escapeHTML(strMinimize)%></oj-label><div slot="value"><oj-input-text slot="value"id="t4a" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+7" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t4c"><%=StringEscapeUtils.escapeHTML(strClose)%></oj-label><div slot="value"><oj-input-text slot="value"id="t4c" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+6" /></div></oj-label-value> 
                                            
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t5"><%=StringEscapeUtils.escapeHTML(strBranch)%></oj-label><div slot="value"><oj-input-text slot="value"id="t5" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+B" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t6"><%=StringEscapeUtils.escapeHTML(strCustomer)%></oj-label><div slot="value"><oj-input-text slot="value"id="t6" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+C" /></div></oj-label-value> 
                                <%-- fix for 17014727 --%>
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t7"><%=StringEscapeUtils.escapeHTML(strHelp)%></oj-label><div slot="value"><oj-input-text slot="value"id="t7" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+E" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t8"><%=StringEscapeUtils.escapeHTML(strFastpath)%></oj-label><div slot="value"><oj-input-text slot="value"id="t8" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+F" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t9"><%=StringEscapeUtils.escapeHTML(strSignOff)%></oj-label><div slot="value"><oj-input-text slot="value"id="t9" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+G" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t10"><%=StringEscapeUtils.escapeHTML(strHome)%></oj-label><div slot="value"><oj-input-text slot="value"id="t10" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+H" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t11"><%=StringEscapeUtils.escapeHTML(strInteractions)%></oj-label><div slot="value"><oj-input-text slot="value"id="t11" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+I" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t12"><%=StringEscapeUtils.escapeHTML(strWindow)%></oj-label><div slot="value"><oj-input-text slot="value"id="t12" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+N" /></div></oj-label-value> 
                                            
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t14"><%=StringEscapeUtils.escapeHTML(strPreferences)%></oj-label><div slot="value"><oj-input-text slot="value"id="t14" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+P" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t14"><%=StringEscapeUtils.escapeHTML(strSearch)%></oj-label><div slot="value"><oj-input-text slot="value"id="t14" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+S" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t15"><%=StringEscapeUtils.escapeHTML(strTasks)%></oj-label><div slot="value"><oj-input-text slot="value"id="t15" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+T" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="t16"><%=StringEscapeUtils.escapeHTML(strWorkflow)%></oj-label><div slot="value"><oj-input-text slot="value"id="t16" readonly="readonly" class="TXTro" size="15" value="<%=StringEscapeUtils.escapeHTML(accessKey)%>+W" /></div></oj-label-value> 
                     </div>   
                     
                     
                     
                      <div class="oj-panel oj-sm-margin-2x">
                     <h4><%=StringEscapeUtils.escapeHTML(strDashboardShortcuts)%></h4>
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="d1"><%=StringEscapeUtils.escapeHTML(strDashboard1)%></oj-label><div slot="value"><oj-input-text slot="value"id="d1" readonly="readonly" class="TXTro" size="15" value="Ctrl+Shift+1" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="d2"><%=StringEscapeUtils.escapeHTML(strDashboard2)%></oj-label><div slot="value"><oj-input-text slot="value"id="d2" readonly="readonly" class="TXTro" size="15" value="Ctrl+Shift+2" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="d3"><%=StringEscapeUtils.escapeHTML(strDashboard3)%></oj-label><div slot="value"><oj-input-text slot="value"id="d3" readonly="readonly" class="TXTro" size="15" value="Ctrl+Shift+3" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="d4"><%=StringEscapeUtils.escapeHTML(strDashboard4)%></oj-label><div slot="value"><oj-input-text slot="value"id="d4" readonly="readonly" class="TXTro" size="15" value="Ctrl+Shift+4" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="d5"><%=StringEscapeUtils.escapeHTML(strDashboard5)%></oj-label><div slot="value"><oj-input-text slot="value"id="d5" readonly="readonly" class="TXTro" size="15" value="Ctrl+Shift+5" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="d6"><%=StringEscapeUtils.escapeHTML(strDashboard6)%></oj-label><div slot="value"><oj-input-text slot="value"id="d6" readonly="readonly" class="TXTro" size="15" value="Ctrl+Shift+6" /></div></oj-label-value> 
                                       
                     
                     </div>
                      <div class="oj-panel oj-sm-margin-2x">
                     <h4><%=StringEscapeUtils.escapeHTML(strCalendar)%></h4>
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="u3"><%=StringEscapeUtils.escapeHTML(strPrevYear)%></oj-label><div slot="value"><oj-input-text slot="value"id="u3" readonly="readonly" class="TXTro" size="15" value="Alt + PageUp" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="u33"><%=StringEscapeUtils.escapeHTML(strPrevMon)%></oj-label><div slot="value"><oj-input-text slot="value"id="u33" readonly="readonly" class="TXTro" size="15" value="Page Up" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="u4"><%=StringEscapeUtils.escapeHTML(strNextMon)%></oj-label><div slot="value"><oj-input-text slot="value"id="u4" readonly="readonly" class="TXTro" size="15" value="Page Down" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="u6"><%=StringEscapeUtils.escapeHTML(strNextYear)%></oj-label><div slot="value"><oj-input-text slot="value"id="u6" readonly="readonly" class="TXTro" size="15" value="Alt + PageDown" /></div></oj-label-value> 
                                       
                     
                     </div>
                     
                      <div class="oj-panel oj-sm-margin-2x">
                     <h4><%=StringEscapeUtils.escapeHTML(strAppCloseOperat)%></h4>
                                           <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="e6"><%=StringEscapeUtils.escapeHTML(strClosedialog)%></oj-label><div slot="value"><oj-input-text slot="value"id="e6" readonly="readonly" class="TXTro" size="15" value="Esc" /></div></oj-label-value> 
                                           <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="e4"><%=StringEscapeUtils.escapeHTML(strCloseWin)%></oj-label><div slot="value"><oj-input-text slot="value"id="e4" readonly="readonly" class="TXTro" size="15" value="Ctrl+W" /></div></oj-label-value> 
                                      
                     
                     </div>
                      <div class="oj-panel oj-sm-margin-2x">
                     
                     <h4><%=StringEscapeUtils.escapeHTML(strCustLandOperat)%></h4>
                                           <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="e1a"><%=StringEscapeUtils.escapeHTML(strCustNexttab)%></oj-label><div slot="value"><oj-input-text slot="value"id="e1a" readonly="readonly" class="TXTro" size="19" value="Ctrl+Shift+PageDown" /></div></oj-label-value> 
                                           <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="e2a"><%=StringEscapeUtils.escapeHTML(strCustPrevtab)%></oj-label><div slot="value"><oj-input-text slot="value"id="e2a" readonly="readonly" class="TXTro" size="15" value="Ctrl+Shift+PageUp" /></div></oj-label-value> 
                                        
                     </div>
                     
                     
                     </div> <!--second Column ends-->
                                             
                    <div style="height:100%" class=" oj-sm-width-1/3">
                      <div class="oj-panel oj-sm-margin-2x">
                            <h4><%=StringEscapeUtils.escapeHTML(strShortcuts)%></h4>
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="e3"><%=StringEscapeUtils.escapeHTML(strSwitchwindows)%></oj-label><div slot="value"><oj-input-text slot="value"id="e3" readonly="readonly" class="TXTro" size="15" value="F2" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x20"><%=StringEscapeUtils.escapeHTML(strOk)%></oj-label><div slot="value"><oj-input-text slot="value"id="x9" readonly="readonly" class="TXTro" size="15" value="Ctrl+K" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x10"><%=StringEscapeUtils.escapeHTML(strCancel)%></oj-label><div slot="value"><oj-input-text slot="value"id="x10" readonly="readonly" class="TXTro" size="15" value="Ctrl+L" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="x11"><%=StringEscapeUtils.escapeHTML(strConfirm)%></oj-label><div slot="value"><oj-input-text slot="value"id="x11" readonly="readonly" class="TXTro" size="15" value="Ctrl+M" /></div></oj-label-value> 
                                            
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="e1"><%=StringEscapeUtils.escapeHTML(strNexttab)%></oj-label><div slot="value"><oj-input-text slot="value"id="e1" readonly="readonly" class="TXTro" size="15" value="Ctrl+PageDown" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="e2"><%=StringEscapeUtils.escapeHTML(strPrevtab)%></oj-label><div slot="value"><oj-input-text slot="value"id="e2" readonly="readonly" class="TXTro" size="15" value="Ctrl+PageUp" /></div></oj-label-value> 
                                        
                    </div>                 
                    
                      <div class="oj-panel oj-sm-margin-2x">
                        <h4><%=StringEscapeUtils.escapeHTML(strDataTable)%></h4>
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f3"><%=StringEscapeUtils.escapeHTML(strNavRows)%></oj-label><div slot="value"><oj-input-text slot="value"id="f3" readonly="readonly" class="TXTro" size="19" value="Up & Down keys" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f4"><%=StringEscapeUtils.escapeHTML(strNavCells)%> </oj-label><div slot="value"><oj-input-text slot="value"id="f4" readonly="readonly" class="TXTro" size="19" value="Tab & Shift+Tab" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f6"><%=StringEscapeUtils.escapeHTML(strFirstPage)%></oj-label><div slot="value"><oj-input-text slot="value"id="f6" readonly="readonly" class="TXTro" size="15" value="Home" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f1"><%=StringEscapeUtils.escapeHTML(strPrevPage)%></oj-label><div slot="value"><oj-input-text slot="value"id="f1" readonly="readonly" class="TXTro" size="15" value="Page Up" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f2"><%=StringEscapeUtils.escapeHTML(strNextPage)%></oj-label><div slot="value"><oj-input-text slot="value"id="f2" readonly="readonly" class="TXTro" size="15" value="Page Down" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f2a"><%=StringEscapeUtils.escapeHTML(strLastPage)%></oj-label><div slot="value"><oj-input-text slot="value"id="f2a" readonly="readonly" class="TXTro" size="15" value="End" /></div></oj-label-value> 	
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f2b"><%=StringEscapeUtils.escapeHTML(strAddRow)%></oj-label><div slot="value"><oj-input-text slot="value"id="f2b" readonly="readonly" class="TXTro" size="15" value="Ctrl+Insert" /></div></oj-label-value> 	
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f2c"><%=StringEscapeUtils.escapeHTML(strDeleteRow)%></oj-label><div slot="value"><oj-input-text slot="value"id="f2c" readonly="readonly" class="TXTro" size="15" value="Ctrl+Delete" /></div></oj-label-value> 		
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f2d"><%=StringEscapeUtils.escapeHTML(strSingleRecView)%></oj-label><div slot="value"><oj-input-text slot="value"id="f2d" readonly="readonly" class="TXTro" size="15" value="Ctrl+I" /></div></oj-label-value> 	
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f2e"><%=StringEscapeUtils.escapeHTML(strExitTable)%></oj-label><div slot="value"><oj-input-text slot="value"id="f2e" readonly="readonly" class="TXTro" size="15" value="Ctrl+Tab" /></div></oj-label-value> 	
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f2f"><%=StringEscapeUtils.escapeHTML(strGotoFormField)%></oj-label><div slot="value"><oj-input-text slot="value"id="f2f" readonly="readonly" class="TXTro" size="15" value="Ctrl+Shift+Tab" /></div></oj-label-value> 	
                                       
                     
                     </div>
            
                      <div class="oj-panel oj-sm-margin-2x">
                     <h4><%=StringEscapeUtils.escapeHTML(strNavGrid)%></h4>
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f6"><%=StringEscapeUtils.escapeHTML(strFirstPage)%></oj-label><div slot="value"><oj-input-text slot="value"id="f6" readonly="readonly" class="TXTro" size="15" value="Home" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f1"><%=StringEscapeUtils.escapeHTML(strPrevPage)%></oj-label><div slot="value"><oj-input-text slot="value"id="f1" readonly="readonly" class="TXTro" size="15" value="Page Up" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f2"><%=StringEscapeUtils.escapeHTML(strNextPage)%></oj-label><div slot="value"><oj-input-text slot="value"id="f2" readonly="readonly" class="TXTro" size="15" value="Page Down" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f2a"><%=StringEscapeUtils.escapeHTML(strLastPage)%></oj-label><div slot="value"><oj-input-text slot="value"id="f2a" readonly="readonly" class="TXTro" size="15" value="End" /></div></oj-label-value> 	
                                        
                     
                     </div>
                     <div class="oj-panel oj-sm-margin-2x">
                     <h4><%=StringEscapeUtils.escapeHTML(strLayTab)%></h4>
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f3"><%=StringEscapeUtils.escapeHTML(strNavRows)%></oj-label><div slot="value"><oj-input-text slot="value"id="f3" readonly="readonly" class="TXTro" size="19" value="Up & Down keys" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f4"><%=StringEscapeUtils.escapeHTML(strNavCells)%> </oj-label><div slot="value"><oj-input-text slot="value"id="f4" readonly="readonly" class="TXTro" size="19" value="Tab & Shift+Tab" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f6"><%=StringEscapeUtils.escapeHTML(strFirstPage)%></oj-label><div slot="value"><oj-input-text slot="value"id="f6" readonly="readonly" class="TXTro" size="15" value="Home" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f1"><%=StringEscapeUtils.escapeHTML(strPrevPage)%></oj-label><div slot="value"><oj-input-text slot="value"id="f1" readonly="readonly" class="TXTro" size="15" value="Page Up" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f2"><%=StringEscapeUtils.escapeHTML(strNextPage)%></oj-label><div slot="value"><oj-input-text slot="value"id="f2" readonly="readonly" class="TXTro" size="15" value="Page Down" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f2a"><%=StringEscapeUtils.escapeHTML(strLastPage)%></oj-label><div slot="value"><oj-input-text slot="value"id="f2a" readonly="readonly" class="TXTro" size="15" value="End" /></div></oj-label-value> 	
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f2a"><%=StringEscapeUtils.escapeHTML(strNavleft)%></oj-label><div slot="value"><oj-input-text slot="value"id="f2a" readonly="readonly" class="TXTro" size="15" value="Left Arrow" /></div></oj-label-value> 
                                            <oj-label-value label-edge="start" label-width="50%"><oj-label  slot="label" for="f2a"><%=StringEscapeUtils.escapeHTML(strNavRight)%></oj-label><div slot="value"><oj-input-text slot="value"id="f2a" readonly="readonly" class="TXTro" size="15" value="Right Arrow" /></div></oj-label-value> 
                                       
                     
                     </div>
                     
                                          
                                          
                    </div><!-- column 3 ends-->
                    
                      <div style="height:100%" class=" oj-sm-width-full">
                      <div class="FSTdlg" id="wide2" style="padding-left:4px;"><h4>Note:-<%=StringEscapeUtils.escapeHTML(strfooternote)%></h4></div>
                      </div>
                    </div>
                     
                
                    </div>
                    </div>
                    
                                 <DIV slot="footer">
                                  <div class="oj-flex-bar oj-sm-margin-4x-bottom" >
                                
                                      <div class="oj-sm-margin-4x-top oj-flex-bar-end">
                                    
                                           <oj-button  class="action-button-primary oj-sm-margin-1x" chroming="solid"   value="<%=StringEscapeUtils.escapeHTML(strOk)%>"  id="BTN_OK"  onclick="fnCloseToolbarScreen()"  onkeydown="return handleScrObj(this,event)" name=<%=StringEscapeUtils.escapeHTML(strOk)%> >
                                    <%=StringEscapeUtils.escapeHTML(strOk)%></oj-button>
                                      </div>  
                                  </div>
            </div>
                               
                               </oj-dialog>
        </div>
</body>
</html>
