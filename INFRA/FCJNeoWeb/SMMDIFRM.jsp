<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%
/*----------------------------------------------------------------------------------------------------
**
** File Name    : SMMDIFRM.jsp
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

Copyright  © 2004-2016 by Oracle Financial Services Software Limited..
  ** Modified By           : Neethu Sreedharan
  **  Modified On          : 12-Aug-2016
  **  Modified Reason      : Code corrected to display the scroll bar in case of a Arabic user.
  **  Retro Source         : 9NT1606_12_0_3_AMAN_BANK
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_23652518
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 22-Aug-2016
  **  Modified Reason      : Hook given to show the menu expanded on load and on change 
                             branch showHideVtab(e) needs to be called in SMMDIFRM_CUSTOM.js 
  **  Retro Source         : 9NT1606_12_0_3_FHB_EXO-BIT_HUNGARY
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_23654778
  
  **  Modified By          : Rishabh Gupta
  **  Modified On          : 21-Sept-2016
  **  Modified Reason      : Password expiry message changed to provide spaces
  **  Search String        : 12_1_RETRO_12_2_23664460
  **  SFR No    		   : 23664460
    
  **  Modified By          : Rishabh Gupta
  **  Modified On          : 21-Sept-2016
  **  Modified Reason      : Retro of 22782270
  **  Search String        : 12_1_RETRO_12_2_23664332
  **  SFR No    		   : 23664332
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 22-Sep-2016
  **  Modified Reason      : Paste option restricted in screensaver password field
  **  Retro Source         : 9NT1606_12_0_2_ACCESS_BANK_PLC
  **  Search String        : 9NT1606_12_2_RETRO_12_0_2_23657708
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 07-Oct-2016
  **  Retro Source         : 9NT1606_12_0_3_INTERNAL
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes

**	Modified By   : Vijeta S
** 	Modified on   : 04/Dec/2024
** 	Description   : Removed hard coded value and provided variable that store label description for Branch Code and Entity Id.
** 	Search String : Bug_37347876
**  Bug No.       : 37369194
---------------------------------------------------------------------------------------------------------*/
%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals" %>
<%@ page import="com.ofss.fcc.utility.FCSMSUtility" %>
<%@ page import="com.ofss.fcc.common.FCMessages"%>
<%@ page import="com.ofss.fcc.common.FBContext" %>
<%@ page import="com.ofss.fcc.logger.BranchLogger" %>
<%@ page import="com.ofss.fcc.common.BranchConfig"%>
<%@ page import="com.ofss.fcc.common.BranchParam"%>
<%@ page import="com.ofss.fcc.branch.BranchTillData"%>
<%@ page import="com.ofss.fcc.common.CcyFormatData"%>
<%@ page import="com.ofss.fcc.commonif.IDenomData"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.FCLoginProcessor"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Collections"%>
<%@ page import="java.util.Set"%>
<%@ page import="java.lang.reflect.Constructor"%>
<%@ page import="com.ofss.infra.oindicator.OIndicator"%>

<%
//System.out.println("mdi window start:" + Calendar.getInstance().get(Calendar.HOUR)+":"+Calendar.getInstance().get(Calendar.MINUTE)+":"+Calendar.getInstance().get(Calendar.SECOND)+":"+Calendar.getInstance().get(Calendar.MILLISECOND));
response.setHeader("Pragma", "no-cache");   
response.setHeader("Cache-Control", "no-cache");
response.setHeader("Cache-Control", "no-store");
response.setDateHeader("Expires", -1); 
String lang         = (String)session.getAttribute("LANG");
String langISOMap   = ((String)session.getAttribute("LANGISOMAP")).toLowerCase();
String strTheme     = (String)session.getAttribute("THEME");
String jsParser     = (String)session.getAttribute("JS_PARSER");
String browserCSS     = (String)session.getAttribute("BROWSER_CSS");
String ieCss         = (String)session.getAttribute("IECSS");
String font         = (String)session.getAttribute("FONT");//HTML5 Changes
String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
String dashCss = "dash.css";
if (logintheme.equals("FlexNewUI2.css")) {
    dashCss = "dash2.css";
}else if (logintheme.equals("FlexNewUI3.css")) {//HTML5 Changes 6/OCT/2016 start
    dashCss = "dash3.css";
}//HTML5 Changes 6/OCT/2016 end
%>
<!DOCTYPE html><!--HTML5 Changes-->

<%-- <HTML class="HTMLMainFrame" lang="<%=langISOMap%>"> --%>
<HTML lang="<%=StringEscapeUtils.escapeHTML(langISOMap)%>" style="overflow:auto"><!-- Zooming Changes-->
    <HEAD>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	 <script type="text/javascript"> //citi ui change start
     var gItemDesc       = new Array();
      var commonErrors    = new Array();
     </script><!--citi ui change end -->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(langISOMap)%>">
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <link rel="SHORTCUT ICON" href="data:;base64,="/><!--citi ui change -->
       <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
       <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(langISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
        <!--<link href="Theme/<%=StringEscapeUtils.escapeURL(dashCss)%>" rel="stylesheet" type="text/css"/>-->
         <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>
         <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>
               <!--<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>-->
                <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
                <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
                <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_landing.js"></script>
        <!--HTML5 Changes Start-->
    <%--<%if("L".equals(font)) {%>
        <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
    <%} else if ("S".equals(font)) {%>
        <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%>--%><!--HTML5 Changes End -->
    <%  
    
        request.setCharacterEncoding("UTF-8");
/* # BUG 15978732 fixes start */ 
        String changeTheme      = FCUtility.validateParameter(request.getParameter("chgtheme"));
        String changeBrn        = FCUtility.validateParameter(request.getParameter("chgbrn"));
        String changeDept       = FCUtility.validateParameter(request.getParameter("chgdept"));
		String changeEnt        = FCUtility.validateParameter(request.getParameter("chgent"));  //SMSStandalone 12.3 Changes
/* # BUG 15978732 fixes end */ 
        FCUserGlobals uc        = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
        String user             = (String)session.getAttribute("USERID");
        String entity       = (String) session.getAttribute("ENTITY");
        String l_strTheme       = strTheme.substring(0, strTheme.indexOf(".css"));
        String theme_imagesPath = "Images/Ext"+l_strTheme;
        String logWithTime      = (String)session.getAttribute("LOGWITHTIME");
        Map txnRights           = null;
        String menuXML;
        String bpelXML;
		String bpelDBoardXML = null;//12.0.2 SOATEAM  Changes
        String actionSeqNo = "";
        String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
        String branchPlugin     = (String)session.getAttribute("BRANCH_PLUGIN");
        //12.0.2 changes starts
        String currBrn     = (String)session.getAttribute("BRANCH_CODE");
        //12.0.2 changes ends
        String bpelEnabled      = (String)session.getAttribute("BPEL_ENABLED");
        String extalertReqd      = (String)session.getAttribute("EXTERNAL_ALERT");//external alert changes
        String dateDelimiterReqd      = (String)session.getAttribute("DATE_DELIMITER_REQ"); //9NT1606_14_0_RETRO_12_0_3_27393036 changes
        //FCUBS11.3 Changes For Branch Bip Advice Reports
        String bipBrnAdvType    = (String)session.getAttribute("BRANCH_ADV_TYPE");        
        int sessionInterval     = session.getMaxInactiveInterval();
        
        String autoLovReqd      = BranchConstants.AUTO_LOV;
        //String enableTimeLog   = BranchConstants.ENABLE_TIMELOG;
        //String extPassword      = BranchConstants.EXT_PASSWORD;
        String extPwd      = BranchConstants.EXT_PWD;/*12.0.3 Changes 18356914 */
        String elcmInstalled=BranchConstants.ELCM_INSTALLED;//fixes for 17462702
        String extHelpFilePath = BranchConfig.getInstance().getConfigValue("EXT_HELPFILE_PATH") ;//helpfile changes
        String chatBotInstalled = BranchConfig.getInstance().getConfigValue("CHAT_BOT_INSTALLED") ;
        
        FBContext fbContext     = new FBContext(user);
        BranchLogger brnLogger  = new BranchLogger(user);
        fbContext.setBrnLogger(brnLogger);
        fbContext.setDebug(uc.isDebug());
       
        fbContext.getBrnLogger().dbg("SMMDIFRM.jsp-->Getting Menu Rights");
        
        FCLoginProcessor loginProcessor = uc.getLoginProcessor();
        Map menuDetails                 =  (HashMap)session.getAttribute("MENUDETAILS");
        
        String ssoReq = BranchConstants.SSO_REQD; /* SSO screen change */
        if ("Y".equalsIgnoreCase(branchIdentifier)) {
            txnRights  = loginProcessor.getTxnRights();
            menuXML    = loginProcessor.getMenuXml();
            bpelXML    = loginProcessor.getTaskQueueXml();
            bpelDBoardXML	= loginProcessor.getDashBoardQueueXml();//12.0.2 SOATEAM  Changes
            //actionSeqNo = ""+loginProcessor.getActionSeqNo();
        } else {
            txnRights  = (Map)menuDetails.get("RIGHTS");
            menuXML    = (String)menuDetails.get("MENU");
            bpelXML    = (String)menuDetails.get("BPEL"); 
            bpelDBoardXML	= (String)menuDetails.get("BPELDB");//12.0.2 Changes
            //actionSeqNo = (String)session.getAttribute("ACTIONSEQNO");
            //session.removeAttribute("ACTIONSEQNO");
        }
        boolean nguiTabReqd = false;
        if (menuXML.contains("NGUIURL=") && menuXML.contains("NGUIPRD=")) {
            nguiTabReqd = true;
        }
        fbContext.getBrnLogger().dbg("SMMDIFRM.jsp-->getitng instance of BranchTillData");
        BranchTillData brnTillData = BranchTillData.getInstance(fbContext);
        StringBuffer sbKey         = new StringBuffer(20);
        sbKey.append("ITEM_DESC~").append(lang);
        Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+lang + "~" + entity, branchIdentifier,user);
      
        String htitle          = (String)itemDescMap.get("LBL_FCUBS_TITLE");
        String noScriptLabel   = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
        String onlineLabelDesc = (String)itemDescMap.get("LBL_ONLINE");
        String offlineLabelDesc= (String)itemDescMap.get("LBL_OFFLINE");
        String changeToHome = (String)itemDescMap.get("LBL_CHANGE_TO_HOME");
        String labelMenu        = (String)itemDescMap.get("LBL_MENU");
        String labelTasks       = (String)itemDescMap.get("LBL_TASKS");
        String labelWorkflow    = (String)itemDescMap.get("LBL_WORKFLOW");
        String labelCustomer    = (String)itemDescMap.get("LBL_CUSTOMER");
        String labelUserAlerts  = (String)itemDescMap.get("LBL_UNPROCESSED_ALERTS");
        String labelMyDashboard  = (String)itemDescMap.get("LBL_DASHBOARD");
        String labelCustomShortCuts = (String)itemDescMap.get("LBL_CUSTOM_SHORTCUTS");
        String labelMbean       = (String)itemDescMap.get("LBL_MBEAN_SHORTCUTS");
        /*User amount_format, date_format changes*/
        String labelUserSettings = (String)itemDescMap.get("LBL_USER_SETTINGS");
        String labelMinimize     = (String)itemDescMap.get("LBL_BRWMINIMIZE");
        String labelMaximize     = (String)itemDescMap.get("LBL_BRWMAXIMIZE");
        
        String labelChangeBranch = (String) itemDescMap.get("LBL_CHANGE_BRANCH");
        String labelChangeEntity = (String) itemDescMap.get("LBL_SELECT_ENTITY");   //SMSStandalone 12.3 Changes
        String labelBranchOnline               = (String) itemDescMap.get("LBL_BRANCH_ONLINE");
        String labelBranchOffline               = (String) itemDescMap.get("LBL_BRANCH_OFFLINE");        
        String labelSelectBranch = (String) itemDescMap.get("LBL_SELECT_BRANCH");
        String labelHomeBranch = (String) itemDescMap.get("LBL_HOME_BRANCH");
        String labelOptions = (String) itemDescMap.get("LBL_OPTIONS");
        String labelDebugWindow = (String) itemDescMap.get("LBL_DEBUG_WINDOW");
        String labelCollapseMenu = (String) itemDescMap.get("LBL_COLLAPSE_MENU"); 
        String labelExpandMenu = (String) itemDescMap.get("LBL_EXPAND_MENU");//HTML5 changes 24/OCT/2016 Fix for 24942196
        String labelWindow = (String) itemDescMap.get("LBL_WINDOW");
        String labelHelp = (String) itemDescMap.get("LBL_HELP");
        String labelOnlineHelpFile = (String)itemDescMap.get("LBL_ONLINE_HELPFILE");//helpfile changes
        String labelHelpAccessibility = (String) itemDescMap.get("LBL_HELP_ACCESSIBILITY");
        String labelSignOff = (String) itemDescMap.get("LBL_SIGN_OFF");
        String labelHome = (String) itemDescMap.get("LBL_HOME");
        String labelInteractions = (String) itemDescMap.get("LBL_INTERACTIONS");
        String labelNextGenUI = (String) itemDescMap.get("LBL_NEXTGEN_UI");
        String labelFunctionId = (String) itemDescMap.get("LBL_FUNCTION_ID");
        String labelGo = (String) itemDescMap.get("LBL_GO");
        String labelNext = (String) itemDescMap.get("LBL_NEXT");
        String labelPrevious = (String) itemDescMap.get("LBL_PREVIOUS");
        String labelRefresh = (String) itemDescMap.get("LBL_REFRESH");
        String labelShowPrevious = (String) itemDescMap.get("LBL_SHOW_PREVIOUS");
        String labelShowNext = (String) itemDescMap.get("LBL_SHOW_NEXT");
        String labelChangeModule      = (String)itemDescMap.get("LBL_CHANGE_MODULE");
        String labelSelectModule      = (String)itemDescMap.get("LBL_SELECT_MODULE");
        String labelHomeModule        = (String)itemDescMap.get("LBL_HOME_MODULE");
        //12.0.2 changes starts
        String branch        = (String)itemDescMap.get("LBL_MENU_BRANCH");   
        String module        = (String)itemDescMap.get("LBL_MENU_MODULE");   //HTML5 Changes 6/OCT/2016
		String MenuEntity        = (String)itemDescMap.get("LBL_MENU_ENTITY");   //SMSStandalone 12.3 Changes
        String currBranchDate        = (String)itemDescMap.get("LBL_MENU_DATE");  
        String sessionTime        = (String)itemDescMap.get("LBL_SESSION_TIME"); 
        String labelMenuSearch = (String)itemDescMap.get("LBL_MENU_SEARCH"); 
        String labelUserHotKey=(String) itemDescMap.get("LBL_USER_HOTKEY");
        String labelDateAmountTheme=(String) itemDescMap.get("LBL_DATE_AMOUNT_THEME");
        String labelChangePass=(String) itemDescMap.get("LBL_CHANGE_PASS");
        String labelMBeanShortcut=(String) itemDescMap.get("LBL_MBEAN_SHORTCUTS");
        String labelClearUser=(String) itemDescMap.get("LBL_CLEAR_USER");
        String labelLoggedUser        = (String)itemDescMap.get("LBL_LOGGED_USER");  
        String labelFastPath        = (String)itemDescMap.get("LBL_FASTPATH");
        String labelClose     = (String)itemDescMap.get("LBL_CLOSE");
        String labelOracleLogo     = (String)itemDescMap.get("LOGO_ORACLE");
        String labelOracle     = (String)itemDescMap.get("LBL_ORACLE");
        String expLeftMenu     = (String)itemDescMap.get("LBL_EXP_LEFT_MENU");
        String imgGoRt             = theme_imagesPath + "/Icons/gortl.gif";
        //12.0.2 changes ends
        String labelSelected = (String) itemDescMap.get("LBL_SELECTED");
        String labelPreferences = (String) itemDescMap.get("LBL_PREFERENCES");
        String labelHelpAbout =         (String) itemDescMap.get("LBL_HELP_ABOUT");
        //Fix for 21231772 
         String labelNonMFA =(String) itemDescMap.get("LBL_NONMFA");
         String labelMFA =(String) itemDescMap.get("LBL_MFA");
        //mar14
        String labelSearch =         (String) itemDescMap.get("LBL_SEARCH");
        //apr25
		String labelExit = (String) itemDescMap.get("LBL_EXIT");
      
        String list             = theme_imagesPath + "/Icons/list.gif";
        
        String labelChatBot = (String) itemDescMap.get("LBL_CHATBOT");
        /* Bug_37347876 starts */
        String labelBranchCode   = (String) itemDescMap.get("LBL_BRANCH_CODE"); 
        String labelEntityId     = (String) itemDescMap.get("LBL_ENTITYID"); 
        /* Bug_37347876 ends */
		
        //Iterator itrItemKeys   = itemDescMap.keySet().iterator();citi ui change
        //Iterator itrItemValues = itemDescMap.values().iterator();citi ui change
       
        fbContext.getBrnLogger().dbg("SMMDIFRM.jsp-->calling FCMessages.createMessagefor COMMON");
        Iterator itrKeys   = null;
        Iterator itrValues = null;
       /* Map errorBundle    = new HashMap(); citi ui change start
        if ("Y".equalsIgnoreCase(branchIdentifier)) {
            errorBundle = (Map)FCMessages.createMessage("COMMON", null);
            itrKeys     = errorBundle.keySet().iterator();
            itrValues   = errorBundle.values().iterator();    
       } else {
            errorBundle = (Map)FCMessages.createMessage("WB", null);
            itrKeys     = errorBundle.keySet().iterator();
            itrValues   = errorBundle.values().iterator();   citi ui change end 
       } */
       
       fbContext.getBrnLogger().dbg("SMMDIFRM.jsp-->FCMessages Bundle created");
       String applicationName = (String)session.getAttribute("APPLICATION_NAME") ;
      // String fastpathsearchWindow =(String)itemDescMap.get("LBL_FASTPATH_SEARCH");  
       String fastpathsearchWindow =(String)itemDescMap.get("LBL_FASTPATH_SEARCH_NEW");
       String fastpathsearchResult =(String)itemDescMap.get("LBL_FASTPATH_SEARCH_RES");
       String labelMyFav =        (String) itemDescMap.get("LBL_MY_FAVORITES");
       String appDate 	        = String.valueOf(uc.getCurrDate());   
       String userName 	        = String.valueOf(uc.getUserName());
     
        //String loginSeqNo 	= String.valueOf(uc.getSignonSerial());
		//feb8
		String lblCustomerDet    =  (String) itemDescMap.get("LBL_CUSTOMER_DETAILS");
    
       String loggedInTime =  FCUtility.validateParameter(request.getParameter("loggedInTime"));
       /*12.0.2 Screen Saver Changes Start*/
       String labelScreenSaverPwd = (String)itemDescMap.get("LBL_LOGIN_PASSWORD");
       String labelScreenSaverErrMsg = (String)itemDescMap.get("LBL_SCREENSAVER_ERR_MSG");
       String labelScreenSaverMsg = (String)itemDescMap.get("LBL_SCREEN_SAVER_MSG");
       String AlertMsg = (String)itemDescMap.get("LBL_ALERT_MSG_I");
	   String errMsg = (String)itemDescMap.get("LBL_ALERT_MSG_E");//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
	   String lblErrDesc = (String)itemDescMap.get("LBL_ALERT_MSG_E_DESC");//9NT1606_12_2_RETRO_12_0_3_21182929 changes
       String lblErrCode = (String)itemDescMap.get("LBL_ALERT_MSG_E_CODE");//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
       String brnHostLinkStatus = OIndicator.getInstance().brnHostLinkStatus();
       String okLabel          = (String) itemDescMap.get("LBL_OK");
       String debugWindowEnabled = uc.getDebugWindowEnabled();//Changes for FE Debug Window
       //String labelTimeLog           = (String)itemDescMap.get("LBL_TIME_LOG");//time log changes;Debug revert
       //String labelDebugLog           = (String)itemDescMap.get("LBL_DEBUG_LOG");//time log changes;Debug revert
       /*12.0.2 Screen Saver Changes ends*/
       //Fix for 21231772 
        String mfaenabled        = (String)session.getAttribute("MFAENABLED"); 
        String  isMFAAuthenticated        = (String)session.getAttribute("isMFAAuthenticated");
        String tmpEntity = "";
        if (!"".equals(entity)) {
            tmpEntity = "_"+entity;
        }
        //R4Citi Changes end
         String hotkeyFnids = uc.getHotkeyFnids();//HTML5 Changes 14/NOV/2016
        ////SMSStandalone 12.3 Changes
        String rofcInstalled=(String)session.getAttribute("ROFCINSTALLED");
        String biometric = (String) itemDescMap.get("LBL_BIOMETRIC");
       //SMSStandalone 12.3 Changes
       String defaultDate = String.valueOf(uc.getDefaultDate()); //Bug 25733025
       String timeZone = String.valueOf(uc.getHostTimezone()); //timeZone changes by Shishir
    %>
	 <!-- citi ui change -->  <script type="text/javascript" src="Script/JS/commonError_<%=lang%><%=tmpEntity%>.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
       <!-- citi ui change -->  <script type="text/javascript" src="Script/JS/ItemDesc_<%=lang%><%=tmpEntity%>.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> 
        <script type="text/javascript" src="Script/JS/CcyDenomUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript">
        var gLoginTime = "<%=StringEscapeUtils.escapeJavaScript(loggedInTime)%>";
        if(gLoginTime == "null"){
          gLoginTime =  new Date().getTime();
        }
            var timeZone = "<%=StringEscapeUtils.escapeJavaScript(timeZone)%>"; //timeZone changes by Shishir
            var mainWin          = window;
            var cahedCalendarData = new Object();
            var entity           = "<%=StringEscapeUtils.escapeJavaScript(entity)%>";
            var showChgBrnLOV    = false;
            var autoLovReqd      = "<%=StringEscapeUtils.escapeJavaScript(autoLovReqd)%>";
            var changeTheme      ="<%=StringEscapeUtils.escapeJavaScript(changeTheme)%>";
            var changeBranch     = "<%=StringEscapeUtils.escapeJavaScript(changeBrn)%>";
            var changeDept       = "<%=StringEscapeUtils.escapeJavaScript(changeDept) %>";
            var changeEnt       = "<%=StringEscapeUtils.escapeJavaScript(changeEnt) %>"; //SMSStandalone 12.3 Changes
            var branchIdentifier =   "<%=StringEscapeUtils.escapeJavaScript(branchIdentifier)%>"; //SMSStandalone 12.3 DC Changes
            var gXmlMenu         = "";//citi ui change
            var bpelMenuXml      = "<%=StringEscapeUtils.escapeJavaScript(bpelXML)%>";
            var bpelDashBoardMenuXml      = "<%=StringEscapeUtils.escapeJavaScript(bpelDBoardXML)%>"; //12.0.2 SOATEAM Changes
            var isBpelEnabled    = false;
            var mBeanArray       = new Array();     
            
            var mBean_Array      = new Array(); 
            var loadTimeArray    = new Array(); 
            var alertAction      = "LOGIN";
            var branchPlugin     = '<%=StringEscapeUtils.escapeJavaScript(branchPlugin)%>';
            var bpelEnabled      = '<%=StringEscapeUtils.escapeJavaScript(bpelEnabled)%>';
            var isBpelEnabled    = false;
            var theme_imagesPath = '<%=StringEscapeUtils.escapeJavaScript(theme_imagesPath)%>';
            var changeToHome     = "<%=StringEscapeUtils.escapeJavaScript(changeToHome)%>";
            var bipBrnAdvType =   "<%=StringEscapeUtils.escapeJavaScript(bipBrnAdvType)%>";
			var ssoReq = "<%=StringEscapeUtils.escapeJavaScript(ssoReq)%>"; /* SSO screen change */
            /*Security bug SEC-12-Patch-081 fixes starts */
            var sessionInterval =  "<%=StringEscapeUtils.escapeJavaScript(Integer.toString(sessionInterval))%>";
             /*Security bug SEC-12-Patch-081 fixes ends */
             /*12.0.2 Screen Saver Changes Start*/
            var brnHostLinkStatus =   "<%=StringEscapeUtils.escapeJavaScript(brnHostLinkStatus)%>";
            var AlertMsg =   "<%=StringEscapeUtils.escapeJavaScript(AlertMsg)%>";
            var labelScreenSaverErrMsg =   "<%=StringEscapeUtils.escapeJavaScript(labelScreenSaverErrMsg)%>";
            var labelScreenSaverMsg =   "<%=StringEscapeUtils.escapeJavaScript(labelScreenSaverMsg)%>";
            var scrSaverReq         ='<%= StringEscapeUtils.escapeJavaScript(uc.getScreenSaverReq())%>';
            var scrSaverModifiableFlag  = '<%= StringEscapeUtils.escapeJavaScript(uc.getScreenSaverModifiableFlag())%>';
            var scrTimeout             =  '<%= StringEscapeUtils.escapeJavaScript(String.valueOf(uc.getScreenSaverTimeout()))%>';
            //var userLevelDbgEnabled = 'N';//debug revert
			var errLabel =  '<%= StringEscapeUtils.escapeJavaScript(errMsg)%>';//9NT1606_12_2_RETRO_12_0_3_21182929 changes
             var lblErrDesc =  '<%= StringEscapeUtils.escapeJavaScript(lblErrDesc)%>'; //9NT1606_12_2_RETRO_12_0_3_21182929 changes
            var lblErrCode =  '<%= StringEscapeUtils.escapeJavaScript(lblErrCode)%>';//9NT1606_12_2_RETRO_12_0_3_21182929 changes
            var  debugWindowEnabled = '<%= StringEscapeUtils.escapeJavaScript(debugWindowEnabled)%>';//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
            var  rofcInstalled='<%= StringEscapeUtils.escapeJavaScript(rofcInstalled)%>';//SMSStandalone 12.3 Changes
            var labelExpandMenu =  '<%= StringEscapeUtils.escapeJavaScript(labelExpandMenu)%>';//HTML5 changes 24/OCT/2016 Fix for 24942196
            var  labelCollapseMenu = '<%= StringEscapeUtils.escapeJavaScript(labelCollapseMenu)%>'; //HTML5 changes 24/OCT/2016 Fix for 24942196
            /*12.0.2 Screen Saver Changes Start*/
            var chatBotInstalled = '<%= StringEscapeUtils.escapeJavaScript(chatBotInstalled)%>';
			var counter = 0;
            var platoUrl = '';
            homeBranchFlag       = true;
            confirmatioReq      = true;
            finalarr = new Array();
            t = new txn_actions();
            
            /* SSO screen change */
            if (ssoReq == "Y") {
                window.statusbar = 0;
                window.toolbar =0;
                window.resizeTo(screen.availWidth,screen.availHeight);
            }
            /* SSO screen change */
           /* function fnEnableDebugLog() {
                var debuglogElement = mainWin.document.getElementById('debuglogChk');
                if(debuglogElement) {
                    if(debuglogElement.checked)
                        userLevelDbgEnabled = 'Y';
                    else
                        userLevelDbgEnabled = 'N';
                }
            }debug revert*/
            
            
             var dashBoardWidth ;
             function setHeights(){//debugger;
//                 $("#landingContainer").style.height  = calc("100vh" - $("#masthead").offSetHeight + "px");
//                 $('#landingContainer').css("height",'calc(100vh - document.getElementById("masthead").offsetHeight)';
                    var mastHeadHeight = document.getElementById("masthead").offsetHeight;
                     var headerAndTaskBareHeight = document.getElementById("masthead").offsetHeight +  document.getElementById("taskbar").offsetHeight;
//                     document.getElementById("leftpanel").style.setProperty("height",'calc(100vh - '+headerAndTaskBareHeight+'px)');
//                     document.getElementById("mainContent").style.setProperty("height",'calc(100vh - '+headerAndTaskBareHeight+'px)');
                 document.getElementById("landingContainer").style.setProperty("height",'calc(100vh - '+headerAndTaskBareHeight+'px)');
                scrWidth = self.innerWidth;
                dashBoardWidth =scrWidth -( (0.23 * scrWidth ));
                y = self.innerHeight;
             }
             
            function setHeights_old() {
                if (self.innerHeight) {// all except Explorer
                    x = "100%";
                    scrWidth = self.innerWidth;
                    y = self.innerHeight;
                } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
                    x = document.documentElement.clientWidth;
                    y = document.documentElement.clientHeight;
                } else if (document.body) {
                // other Explorers
                    x = document.body.clientWidth;
                    y = document.body.clientHeight;
                }
                else {
       x = document.body.parentElement.scrollWidth;
       y = document.body.parentElement.scrollHeight;
    }
                //HTML5 Changes Start
                document.getElementById("masthead").style.width =  x; /* Zooming Changes */
                document.getElementById("leftpanel").style.top = document.getElementById("masthead").offsetHeight -3 + "px";
                document.getElementById("vtab").style.height = y-(document.getElementById("taskbar").offsetHeight +  document.getElementById("menuHeaderDiv").offsetHeight +document.getElementById("masthead").offsetHeight +2)+"px";
                document.getElementById("vTabCN_EXPLORE").style.height = y-(document.getElementById("taskbar").offsetHeight +  document.getElementById("menuHeaderDiv").offsetHeight +document.getElementById("masthead").offsetHeight +12)+"px";
                document.getElementById("vtab").style.width = 0.229 * x;/* Zooming Changes */
                //document.getElementById("leftpanel").style.height = y-(document.getElementById("taskbar").offsetHeight +  document.getElementById("masthead").offsetHeight +5)+"px";
                //document.getElementById("leftpanel").style.width = 0.23 * x + "px";/* Zooming Changes */
                //document.getElementById("dashboard").style.height = y-(document.getElementById("taskbar").offsetHeight + document.getElementById("masthead").offsetHeight +  document.getElementById("menuHeaderDiv").offsetHeight+ 5)+"px";
                document.getElementById("dashboard").style.height = y-(document.getElementById("taskbar").offsetHeight + document.getElementById("masthead").offsetHeight )+"px";
                dashBoardWidth =scrWidth -( (0.23 * scrWidth ));
                document.getElementById("dashboard").style.width = x;
                //document.getElementById("dashboard").style.marginTop = -(document.getElementById("vtab").offsetHeight +1) + "px"; /*Zooming Changes */
                //HTML5 Changes End
                document.getElementById("IFlauncher").style.top = document.getElementById("masthead").offsetHeight + 2 + "px";
                /*Fix For Bug 17356684 Start */
                document.getElementById("menuDetail").style.top = document.getElementById("masthead").offsetHeight + 2 + "px"; /*Zooming Changes */
                document.getElementById("menuDetail").style.width=  x;/*Zooming Changes */
                document.getElementById("SYS_TBL_TABS").style.width = x;/* Zooming Changes */
//                document.getElementById("menuBarSpan").style.width =  document.getElementById("menuDetail").offsetWidth * 0.80 - 2 + "px"; /* Zooming Changes */
                document.getElementById("taskbar").style.width = x; /* Zooming Changes */
                document.getElementById("taskbar").style.top = (y- (document.getElementById("taskbar").offsetHeight +5))+"px";
                document.body.style.minWidth = x; /* Zooming Changes */
                document.body.style.minHeight = y+"px"; /* Zooming Changes */
          
                
                /*Fix For Bug 17356684 End */
				//arb changes
                //setHorizontalPosition( document.getElementById("vtabMin"), false, (document.getElementById("divmenusearch").offsetWidth - document.getElementById("vtabMin").offsetWidth)); citi ui change
                 setHorizontalPosition(document.getElementById("dashboard"), true, (document.getElementById("vtab").offsetWidth + 2));
                 setHorizontalPosition( document.getElementById("IFlauncher"), false, (document.getElementById("vtab").offsetWidth));
          /*     if(LangCode != 'ARB'){
                  //document.getElementById("vtabMin").style.left = document.getElementById("divmenusearch").offsetWidth - document.getElementById("vtabMin").offsetWidth + "px";
                  document.getElementById("dashboard").style.marginLeft = document.getElementById("vtab").offsetWidth + 2 + "px";
                  document.getElementById("IFlauncher").style.left = document.getElementById("vtab").offsetWidth + 2 + "px";

               }
               else{
                  //document.getElementById("vtabMin").style.right = document.getElementById("divmenusearch").offsetWidth - document.getElementById("vtabMin").offsetWidth + "px";
                  document.getElementById("dashboard").style.marginRight = document.getElementById("vtab").offsetWidth + 2 + "px";
                  document.getElementById("IFlauncher").style.right = document.getElementById("vtab").offsetWidth + 2 + "px";
               }*/

                if (document.getElementById("vtab").style.display == "none") {
                    document.getElementById("dashboard").style.width = x;
                }
                document.getElementById("vTabDB_DASHBOARD").style.height = document.getElementById("dashboard").offsetHeight+"px";
                var vTabHeight      = document.getElementById("vtab").offsetHeight;
                if (document.getElementById("vtab").style.display == "none") {
                    vTabHeight      = document.getElementById("dashboard").offsetHeight;
                }
                var headingHeight   = document.getElementById("vTab_Heading").offsetHeight;
                var vTabCNHeight = vTabHeight - headingHeight;
                //document.getElementById("vTabCN_EXPLORE").style.height          = vTabCNHeight + "px"; //HTML5 Changes
                document.getElementById("vTabCN_CENTRAL_PROCESS").style.height  = vTabCNHeight + "px"; //12.0.2 SOATEAM Changes
                document.getElementById("MinwindC").style.width = x;
            }

            function getXmlMenu () {
                return gXmlMenu;
            }	  
            
            function txn_actions() {
            <%
                fbContext.getBrnLogger().dbg("SMMDIFRM.jsp-->populating txnRights");
                if(txnRights != null) {
                    Iterator itr = txnRights.keySet().iterator();
                    
                    while (itr.hasNext() ) { 
                        String transAuthID = (String)itr.next(); 
                        String controlString = (String)txnRights.get(transAuthID);
                        List actions = FCSMSUtility.getActionNames(controlString);
                        if(actions.size() > 0) {
                            String firstaction = (String)actions.get(0);
            %>this['<%=StringEscapeUtils.escapeJavaScript(transAuthID)%>'] = new Array('<%=StringEscapeUtils.escapeJavaScript(firstaction)%>'<%
                            for (int i = 1; i < actions.size();i++) {
                                String act = (String)actions.get(i);
            %>,'<%=StringEscapeUtils.escapeJavaScript(act)%>'<%
                            } %>); <%
                        } 
                    }
                }
            %>
            }
        
            <%
            if ("Y".equalsIgnoreCase((String)session.getAttribute("BPEL_ENABLED"))) {
                fbContext.getBrnLogger().dbg("SMMDIFRM.jsp-->Inside Bpel Enabled for Task Search");
                //String bpelTaskHeader = (String)menuDetails.get("BPEL_TASK_HEADER");
                String bpelTaskHeader = "";
                if(bpelTaskHeader == null) { 
                    bpelTaskHeader = ""; 
                }
            %>
                var bpelTaskHeader="<%=StringEscapeUtils.escapeJavaScript(bpelTaskHeader)%>";
                isBpelEnabled = true;
                <%
                String bpelTaskSearch;
                bpelTaskSearch = loginProcessor.getTaskSearchXml();
                if(bpelTaskSearch == null) { 
                    bpelTaskSearch = ""; 
                }
                %>
                var bpelTaskSearch="<%=StringEscapeUtils.escapeJavaScript(bpelTaskSearch)%>";
                var bpelRoleRights= new Array();
                <%
                String bpelRoleRightsString = loginProcessor.getBPELRoleString();
                if (bpelRoleRightsString != null && bpelRoleRightsString.contains("!")) {
                    String[] bpelRoleString = bpelRoleRightsString.split("!", -1);
                    for (int i = 0; i < bpelRoleString.length-1; i++) {
                        String[] tempString = bpelRoleString[i].split("~", -1);
                        if (tempString.length > 1)
                %>
                            bpelRoleRights["<%=StringEscapeUtils.escapeJavaScript(tempString[1])%>"]="<%=StringEscapeUtils.escapeJavaScript(tempString[2])%>";
                    <%
                    }
                    %>
                    function getBpelRoleRight(functionId) {
                        return bpelRoleRights[functionId]; 
                    }
                <%
                }
                %>
            <%
            }
            %>
        
           // var commonErrors    = new Array(); citi ui change
           // var gItemDesc       = new Array();citi ui change
            function commonError(errCode, errDesc)  {
                commonErrors[errCode] = errDesc;
            }
            function getCommonErrorList(){
                return commonErrors;	
            }
            function addItemDescList(itemName, itemDesc){
                gItemDesc[itemName] = itemDesc;
            }
            function getItemDesc(itemName){   
                return gItemDesc[itemName];
            }
        
            <%	
          /*  while (itrKeys.hasNext()){   citi ui change start 
                String errorKey = (String)itrKeys.next();
                String errorValue = (String)itrValues.next();
                if (errorKey.indexOf("~"+lang)>=0) {
                    String errorCode = errorKey.split("~")[0];
                %>
                    commonError('<%=StringEscapeUtils.escapeJavaScript(errorCode)%>', '<%=StringEscapeUtils.escapeJavaScript(errorValue)%>');  
                <%	
                } citi ui change  end
            } */
            %>
            <%
            /*if("Y".equalsIgnoreCase(branchIdentifier)){
                errorBundle 	= (Map)FCMessages.createMessage("smcntrol", null);
                if(errorBundle != null){
                    itrKeys 	= errorBundle.keySet().iterator();
                    itrValues 	= errorBundle.values().iterator();    
                }
                while (itrKeys.hasNext()){   
                    String errorKey = (String)itrKeys.next();
                    String errorValue = (String)itrValues.next();
                    if (errorKey.indexOf("~"+lang)>=0) {
                        String errorCode = errorKey.split("~")[0];
            %>
                        commonError('<%=StringEscapeUtils.escapeJavaScript(errorCode)%>', '<%=StringEscapeUtils.escapeJavaScript(errorValue)%>');  
            <%	
                    }
                } 
                errorBundle 	= (Map)FCMessages.createMessage("WB", null);
                if(errorBundle != null){
                    itrKeys 	= errorBundle.keySet().iterator();
                    itrValues 	= errorBundle.values().iterator();    
                }
                while (itrKeys.hasNext()){   
                    String errorKey = (String)itrKeys.next();
                    String errorValue = (String)itrValues.next();
                    if (errorKey.indexOf("~"+lang)>=0) {
                        String errorCode = errorKey.split("~")[0];
            %>
                        commonError('<%=StringEscapeUtils.escapeJavaScript(errorCode)%>', '<%=StringEscapeUtils.escapeJavaScript(errorValue)%>');  
            <%	
                    }
                } 
            }   */      
           /* while (itrItemKeys.hasNext()){	%>
                addItemDescList('<%= StringEscapeUtils.escapeJavaScript((String)itrItemKeys.next()) %>', '<%= StringEscapeUtils.escapeJavaScript((String)itrItemValues.next()) %>');
            <% 
            } citi ui change end */
            %>	
            
            var g_objCcy = new Array();
            function loadCcy(ccyCode, NumDigitsAfterDecimal, formatMask, roundRule, roundUnit) {
                g_objCcy[ccyCode] = new ccy(NumDigitsAfterDecimal, formatMask, roundRule, roundUnit);
            }
            
            var objCcy = new Array();
            function ccy(numDigitsAfterDecimal, formatMask, roundRule, roundUnit) {
                this.numDigitsAfterDecimal = numDigitsAfterDecimal;
                this.formatMask = formatMask;
                this.roundRule = roundRule;
                this.roundUnit = roundUnit;
            }
    
            function alert(message) {
               // mask();
                showAlerts(fnBuildAlertXML('','I',message), 'I');
                alertAction = "UNMASK";
            }
            
            function confirm(message){
                var returnVal = window.showModalDialog("ExtAlert.jsp?type=C", message,"dialogLeft:325;dialogTop:270;dialogHeight:200px;dialogWidth:400px;resizable:no;scroll:no;status:no");                             
                if(returnVal == "CANCEL")
                    return false;
                else
                    return true;
            }
            
            <%
            Connection conn = null;   
            List ccyList=new ArrayList();
            try{
                fbContext.getBrnLogger().dbg("SMMDIFRM.jsp-->populating ccy Details");
                fbContext.setEntityName(entity); //12.2 Branch Coop entity added
                Map ccyMap = null;
                if (loginProcessor != null)
                    ccyMap = loginProcessor.getCcyDetails();
                if (ccyMap == null) {
                    conn = BranchParam.getInstance().getConnection(fbContext);
                    ccyMap = brnTillData.getCcyMap(fbContext, currBrn, conn);
                }
                int cCount = 0;
                Set key = ccyMap.keySet();
                Iterator it = key.iterator();
                
                CcyFormatData ccyFormat = null;
                
                while(it.hasNext()) {
                    String ccy = (String)it.next();                
                    ccyFormat = (CcyFormatData)ccyMap.get(ccy);
                %>
                    var ccyCode = "<%=StringEscapeUtils.escapeJavaScript(ccy)%>";
                    var ccyDecimals = "<%=StringEscapeUtils.escapeJavaScript(ccyFormat.getCcyDecimals())%>";
                    var ccyRoundRule = "<%=StringEscapeUtils.escapeJavaScript(ccyFormat.getCcyRoundRule())%>";
                    var ccyRoundUnit = "<%=StringEscapeUtils.escapeJavaScript(String.valueOf(ccyFormat.getCcyRoundUnit()))%>";
                    var ccyFormatMask = "<%=StringEscapeUtils.escapeJavaScript(ccyFormat.getCcyFormatMask())%>";
                    objCcy[ccyCode] = new ccy(ccyDecimals,ccyFormatMask, ccyRoundRule,ccyRoundUnit);
                    loadCcy(ccyCode,ccyDecimals,ccyFormatMask,ccyRoundRule,ccyRoundUnit);//FCC compatible code
                <%        
                }
                
                fbContext.getBrnLogger().dbg("SMMDIFRM.jsp-->ccy Details populated");
                if("Y".equalsIgnoreCase((String)session.getAttribute("BRANCH_PLUGIN"))) {
                    fbContext.getBrnLogger().dbg("SMMDIFRM.jsp-->populating ccy denominations");
                    key = null;
                    it = null;                   
                    if (conn == null)   
                        conn = BranchParam.getInstance().getConnection(fbContext);
                    ccyList=brnTillData.getCcyList(fbContext, currBrn, conn);    
                    Collections.sort(ccyList);
                    brnTillData.setCcyDenomMap( ccyList,fbContext, conn);
                       
                    Map cd = brnTillData.getCcyDenomMap(fbContext);          
                    it= ccyList.iterator();
                    while(it.hasNext()) {
                        String ccy = (String)it.next();                                   
                %>
                        var ccy = '<%=StringEscapeUtils.escapeJavaScript(ccy)%>';
                        var denomList = new Array();
                <%       
                        List denomList = (ArrayList)cd.get(ccy);

                        Object object = null;
                        Constructor denomCons = Class.forName("com.ofss.branch.branchactions.DenomData").getConstructor(FBContext.class);
                        object = denomCons.newInstance(new Object[]{fbContext});
                        IDenomData dData = (IDenomData)object;
                    
                        if(denomList!=null && denomList.size()>0) {
                            Iterator i = denomList.iterator();
                            int dCount=0;
                            while(i.hasNext()) {
                                dData = (IDenomData)i.next();                                          
                %>                                     
                                var DenomCode = '<%=StringEscapeUtils.escapeJavaScript(dData.getDenomCode(fbContext))%>' ;
                                var DenomTxt  = '<%=StringEscapeUtils.escapeJavaScript(dData.getDenomTxt(fbContext))%>';
                                var DenomVal  = '<%=StringEscapeUtils.escapeJavaScript(dData.getDenomVal(fbContext))%>' ;
                                var denomObj = new denomDetail(DenomCode,DenomTxt,DenomVal);
                                 /*Security bug SEC-12-Patch-081 fixes starts */
                                denomList[<%=StringEscapeUtils.escapeJavaScript(Integer.toString(dCount))%>] = denomObj;
                                /*Security bug SEC-12-Patch-081 fixes ends */
                <%                                  
                                dCount++;                        
                            }
                        }
                %>                   
                        var ccyObj = new ccyDetail(ccy,denomList);
                        /*Security bug SEC-12-Patch-081 fixes starts */
                        ccyDenomList[<%=StringEscapeUtils.escapeJavaScript(Integer.toString(cCount))%>] = ccyObj;    
                        /*Security bug SEC-12-Patch-081 fixes ends */
                <%
                        cCount++;
                    } 
                    fbContext.getBrnLogger().dbg("SMMDIFRM.jsp-->ccy denominations populated");
                } 
                fbContext.getBrnLogger().dbg("SMMDIFRM.jsp-->Successfully completed");
                fbContext.getBrnLogger().flush(user);
            }catch(Exception e){
                fbContext.getBrnLogger().dbg("SMMDIFRM.jsp-->Exception Raised=" + e.getMessage());
                fbContext.getBrnLogger().writeStack(fbContext.getUserID(),e);
            }finally{
                if(conn != null){
                    conn.close();
                }
              
            }
            //System.out.println("mdi window END:" + Calendar.getInstance().get(Calendar.HOUR)+":"+Calendar.getInstance().get(Calendar.MINUTE)+":"+Calendar.getInstance().get(Calendar.SECOND)+":"+Calendar.getInstance().get(Calendar.MILLISECOND));
            %>
            function postLoginDetails(){
                //var event = window.event || event;  citi ui change
               // mask(); citi ui  change
                //fnShowDBoardHome("TRUE",true);citi ui change
				gXmlMenu = getmenuxml();//  citi ui change
                                fnQuickSearch();
             landingKo.cleanNode(document.getElementById("vTabCN_EXPLORE"));
                  
               
                var html = ShowMenu(gXmlMenu, "SMAPPBRW", "Templates/XSL/SMAPPBRW.xsl");
                if(navigator.userAgent.indexOf("MSIE ") != -1 || (navigator.userAgent.indexOf("Trident") != -1 && navigator.userAgent.indexOf("rv") != -1)) {//ie11 changes
                    document.getElementById("vTabCN_EXPLORE").insertAdjacentHTML("beforeEnd",html);
                } else {
                    document.getElementById("vTabCN_EXPLORE").appendChild(html);
                }
                
                landingKo.applyBindings( {},document.getElementById("vTabCN_EXPLORE"));
                
                if(bpelEnabled == "Y"){
                    removeReadonlyFuncsFromAppBrw();   
                    buildTaskArea();
                    //document.getElementById("vTabCN_CENTRAL_PROCESS").innerHTML = getBPELTaskHTML(); //21374072 Changes
                }
               // createTree("treemenu1", true);
//                setHeights();
                document.getElementById("dateli").innerHTML = formattedDate;//Fix for 17156294//HTML5 Changes
                document.getElementById("datel1").innerHTML = timeZone;//timeZone changes by Shishir
                <%-- external alert changes begin --%>
                <% if("Y".equalsIgnoreCase(extalertReqd)){%>
                craeteAlertWindow();
                <% } %>
                <%-- external alert changes end --%>
                
                
            }
            
            function displayLoginDetails(){   
                document.getElementById("dateli").innerHTML = formattedDate;//21245896 //HTML5 Changes
                document.getElementById("datel1").innerHTML = timeZone; //timeZone changes by Shishir
                var dx = new Date();
                if(loginDateLast =='null'){
                        loginDateLast = "";
                }
                var l_invalidLogin   = getItemDesc("LBL_INVALID_LOGIN") + noOfInvalidLogins + "~"; 
                var l_LastLogin      = getItemDesc("LBL_LAST_LOGIN") + fnFormatTimeStampString(loginDateLast) + "~";
                var l_LoginTime      = getItemDesc("LBL_CURRENT_TIME") + currentTime;
                var l_PasswdExp      = getItemDesc("LBL_PWD_EXPIRY") + " "+ expirymsgdate + " " +getItemDesc("LBL_DAYS") + "~"; //12_1_RETRO_12_2_23664460
                if(changeBranch != 'true' && changeDept != 'true' && changeTheme!= 'true'){
                    if (SSO_REQ != 'Y'){
                        var warningMsg = "";
                        if((popupalert == 'Y') && (extPwd != 'Y')) { //Password expiry alert
                            if(noOfInvalidLogins>0) { 
                                warningMsg = fnBuildAlertXML("", "I", l_invalidLogin + l_LastLogin + l_PasswdExp + l_LoginTime); 
                            } else {  
                                warningMsg = fnBuildAlertXML("", "I", l_LastLogin + l_PasswdExp + l_LoginTime);
                            }
                        } else {
                            if(noOfInvalidLogins>0) {
                                 warningMsg = fnBuildAlertXML("", "I", l_invalidLogin + l_LastLogin +  l_LoginTime); 
                            } else {                               
                                warningMsg = fnBuildAlertXML("", "I", l_LastLogin +  l_LoginTime);     
                            }
                    }
					}else {/*Fix for BugNo:16677336 starts*/
                        if(noOfInvalidLogins>0) {
                            warningMsg = fnBuildAlertXML("", "I", l_invalidLogin + l_LastLogin +  l_LoginTime); 
                        } else {                               
                            warningMsg = fnBuildAlertXML("", "I", l_LastLogin +  l_LoginTime);     
                        }
                    }
                    /*Fix for BugNo:16677336 ends*/
                      //  mask();
                        alertAction = "LOGIN"
                        showAlerts(warningMsg, "I");
                  
                } 
				//9NT1606_12_2_RETRO_12_0_3_23654778 starts
				else{
                   expandMenu(); 
                   fnPostLogin();//TERMINAL_NAME_ENH_14.1
                }
				//9NT1606_12_2_RETRO_12_0_3_23654778 ends
                /*if (typeof(Storage) !== "undefined") {//HTML5 changes 15/DEC/2016 - adding launched function id in fastpath datalist start
                    var fnids = localStorage.getItem(UserId+"fpFnids");
                    if(fnids) {
                        var fnid = fnids.split("~");
                        var dataList = document.getElementById("fpFuncIdList");
                        for(var i=0;i<fnid.length;i++) {
                            if (!dataList) {
                                var dlElem = document.createElement("DATALIST");
                                dlElem.id = "fpFuncIdList";
                                dlElem.setAttribute("id","fpFuncIdList");
                                document.getElementById("fastpath").parentNode.appendChild(dlElem);
                                dataList = document.getElementById("fpFuncIdList");
                            }
                            var dlOption = document.createElement("OPTION");
                            dlOption.setAttribute("value",fnid[i]);
                            setInnerText(dlOption,fnid[i]);
                            dataList.appendChild(dlOption);
                        }
                    }
                }*///HTML5 changes 15/DEC/2016 - adding launched function id in fastpath datalist end
                if(typeof(branchPlugin) !="undefined" && "Y" == branchPlugin){
                    fnStartWebSocket();
                }
                /*Initializing chatBot*/
                
                if(chatBotInstalled !="null" && chatBotInstalled=="Y"){
                    initChatBot();
                }
                /* */
            }
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> 
        <script type="text/javascript">
        
            var date = new Date();
            var title            = '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("TITLE")) %>'; 
            var CurrentModule    = '<%=StringEscapeUtils.escapeJavaScript(uc.getDefModule())%>';
            var applicationName  = '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("APPLICATION_NAME")) %>';    
            var applicationExt   = '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("APPLICATION_EXT")) %>';
            var systemDateFormat = '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("DATE_FORMAT")) %>';
            var nlsAmtFmt        = '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("NLS_AMOUNT_FORMAT")) %>';
               var dashboardReqd        = '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("DASHBOARD_REQD")) %>';
            var alerthomeReqd        = '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("ALERT_HOME")) %>';
            var extalertReqd         = '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("EXTERNAL_ALERT")) %>';//external alert changes
            var dateDelimiterReqd    = '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("DATE_DELIMITER_REQ")) %>'; //9NT1606_14_0_RETRO_12_0_3_27393036 changes
            /*12.0.2 Screen Saver Changes Starts*/
            var scrSaverTime        = '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("SCREEN_SAVER_TIMEOUT"))%>';
            var extPwd         ='<%=StringEscapeUtils.escapeJavaScript(extPwd)%>';
            /*12.0.2 Screen Saver Changes ends*/
            var gDecimalSymbol   = nlsAmtFmt.substring(0,1);
            var gDigitGroupingSymbol = nlsAmtFmt.substring(1);
            var gNegativeSymbol = '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("NLS_NEGATIVE_SYMBOL")) %>';
            var gNegativeFormat = "-1";
            var labelBranchCode =  '<%= StringEscapeUtils.escapeJavaScript(labelBranchCode)%>'; /* Bug_37347876 */
            var labelEntityId   =  '<%= StringEscapeUtils.escapeJavaScript(labelEntityId)%>'; /* Bug_37347876 */
            if(applicationName == "FCJ" || applicationName == "FGL") {  
            curDate = '<%= StringEscapeUtils.escapeJavaScript(String.valueOf(uc.getCurrDate()))%>';
//			//Bug 25733025 changes Start
//			   var defaultDate = "<%=StringEscapeUtils.escapeJavaScript(defaultDate)%>";
//				if(defaultDate == "false")
//				{
//				 var curDate = '<%= StringEscapeUtils.escapeJavaScript(String.valueOf(uc.getCurrHostDate()))%>'; 
//				}
//				else
//				{
//				 var curDate = '<%= StringEscapeUtils.escapeJavaScript(String.valueOf(uc.getCurrDate()))%>';
//				}
//			//Bug 25733025 changes End
            } else if(applicationName == "FCIS") {         
                var curDate = '<%= StringEscapeUtils.escapeJavaScript(String.valueOf(uc.getCurrDateFCIS()))%>';
            }

            var dateComp = curDate.split("-",-1);
			var formattedDate = getSystemShortDate(parseInt(dateComp[0],10),parseInt(dateComp[1],10),parseInt(dateComp[2],10) );//fix for 17156294			
            var EndOfInput = "";
            if(applicationName == "FCJ" || applicationName == "FGL"){                
                var strEODInputLabelDesc = '<%=StringEscapeUtils.escapeJavaScript(uc.getStrEODInputLabelDesc())%>';
                EndOfInput   = getItemDesc(strEODInputLabelDesc);                               
            }else{
                var onlineStatus = '<%=StringEscapeUtils.escapeJavaScript(uc.getOnlineStatus())%>';
                if(onlineStatus == "N")
                    EndOfInput = '<%=StringEscapeUtils.escapeJavaScript(onlineLabelDesc)%>';
                else
                    EndOfInput = '<%=StringEscapeUtils.escapeJavaScript(offlineLabelDesc)%>';
            }
        title +=   EndOfInput ;
        document.write('<TITLE>'+title + '</TITLE>');
        window.onorientationchange = setHeights;//HTML5 Changes
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%-- FCUBS11.1 CROSSBROWSER Changes --%>
        <script type="text/javascript" src="Script/JS/TaskList.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/CustDetail.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
		<%-- FCUBS11.1 CROSSBROWSER Changes --%>
        <script type="text/javascript" src="Script/JS/SmmsgBox.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>        
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <script type="text/javascript" src="Script/JS/Alert.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/SmmdiFrm.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>    
		<script type="text/javascript" src="Script/JS/SMMDIFRM_CUSTOM.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> <%-- Bug 16579551 Changes --%>
        <script type="text/javascript" src="Script/JS/SmAppBrw.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> 
        <script type="text/javascript" src="Script/JS/SmhTlBar.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> 
       <%--JS Segregation changes starts--%>
       <%-- <script type="text/javascript" src="Script/ExtJS/ExtSmhTlBar.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> --%>
       <%--JS Segregation changes ends--%>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> 
        <script type="text/javascript" src="Script/JS/UserAlerts.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%--ChatBot changes--%>
        
        <% if((null != chatBotInstalled) && (!"".equals(chatBotInstalled)) && ("Y".equals(chatBotInstalled))){ %>
        <script type="text/javascript" src="Script/JS/settings.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/web-sdk.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
       <%}%>	
	   
	   <%--ChatBot Changes--%>
        <jsp:include page="APPGLOBAL.jsp" flush="true" />
    </HEAD>
    <body onbeforeunload="doBeforeUnload(event);" onunload="doUnload(event)" onkeydown="return doKeyAction(event)" oncontextmenu="return false;" onhelp="return false;"> <!--9NT1606_14_1_RETRO_12_4_28118860-->
        <div>
        <div id="masthead" class="oj-bg-brand-30">
         <%--12.0.2 starts --%>
         <div id="menuDetail" class="oj-flex-bar oj-sm-align-items-center">
          <div class="oj-flex-bar-start">
          <div class="oj-flex oj-sm-align-items-center oj-sm-padding-4x-start">
          <oj-button display="icons" chroming="borderless" id="menuExpandCollapse"  accesskey="2" name="menuExpandCollapse" title='<%=StringEscapeUtils.escapeHTML(labelExpandMenu)%>' on-oj-action="[[toggleNavigation.bind(null,'toggle')]]"  >
                    <span slot='startIcon' class="oj-fwk-icon oj-fwk-icon-hamburger">
                    </span>
                </oj-button>
          <img src="./Images/oracle.png" class="header-app-logo" alt="logo image"/>
          </div>
          <!--<span class="LogoOracle" title=<%=StringEscapeUtils.escapeHTML(labelOracle)%> ></span>-->
          </div>
           <div class="oj-flex-bar-end" role="menubar" id="menuBarSpan" aria-hidden="false"><%--Fix For Bug 17356684 --%>
            <div id="nav" class="oj-flex oj-sm-align-items-center">
                <!--Fix for 21231772 starts-->
      <!--
                <% if("Y".equalsIgnoreCase(mfaenabled)) {
                    if("Y".equalsIgnoreCase(isMFAAuthenticated)) {%>
                          <div class="oj-flex-item oj-divider-end"><oj-label class="oj-sm-align-items-center" slot="label" ><%=StringEscapeUtils.escapeHTML((labelMFA))%></oj-label></div>
                <%} else{%>
                       <div class="oj-flex-item oj-divider-end"> <oj-label class="oj-sm-align-items-center" slot="label" ><%=StringEscapeUtils.escapeHTML((labelNonMFA))%></oj-label></div>
                     <%}%><!-- Fix for 19049454 starts-->
      <!--        <%} else if(!"FCIS".equalsIgnoreCase(applicationName)){%><!--Fix for 21236439 -->
      <!--                    <div class="oj-flex-item oj-divider-end"><oj-label class="oj-sm-align-items-center" slot="label" ><%=StringEscapeUtils.escapeHTML((labelNonMFA))%></oj-label></div>
                    <%}%><!--Fix for 19049454 ends-->
                <!--Fix for 21231772 ends-->

<%--SMSStandalone 12.3 Changes starts --%>
            <%if ("Y".equalsIgnoreCase(branchIdentifier)) {%>
                <div class="oj-flex-item  oj-divider-end">
                    <oj-menu-button chroming="borderless" accesskey="M" id="Entity_Menu" title="<%=StringEscapeUtils.escapeHTML(entity)%>">
                        <span slot='startIcon' class="oj-ux-ico-domain"></span>
                        <%=StringEscapeUtils.escapeHTML(MenuEntity)%>&nbsp;<%=StringEscapeUtils.escapeHTML(entity)%>
	<%--Replaced Entity Id to labelEntityId Bug_37347876--%>
                        <oj-menu id="entityMenu" slot="menu"  on-oj-action="[[handleMenuAction.bind(null)]]">
                            <oj-option id="select_entity" value="select_entity" menu_click="disp_lov('COMMON','BLK_ENTITY_DETAILS','ENTITY_ID',labelEntityId,'LOV_ENTITY', '', '', '', '', event);">
                                <span><%=StringEscapeUtils.escapeHTML(labelChangeEntity)%></span>
                            </oj-option>
                            <input type="hidden" class="LBLinv" value="" name="ENTITY_ID" id="BLK_ENTITY_DETAILS__ENTITY_ID">
                        </oj-menu>
                    </oj-menu-button>
                </div>
            <%}%>
<%--SMSStandalone 12.3 Changes ends --%>
                <div class="oj-flex-item  oj-divider-end">
                    <oj-menu-button chroming="borderless" accesskey="B" id="Branch_Menu" title="<%=StringEscapeUtils.escapeHTML(branch)%>">
                        <span slot='startIcon' class="oj-ux-ico-bank"></span>
                        <%if (!"ONLINE".equalsIgnoreCase(brnHostLinkStatus)) {%>
                            <%=StringEscapeUtils.escapeHTML(branch)%>&nbsp;<%=StringEscapeUtils.escapeHTML(labelChangeBranch)%>
                        <%} else {%>
                            <% if("FCIS".equalsIgnoreCase(applicationName)){%>
                                <%=StringEscapeUtils.escapeHTML(module)%>&nbsp;<%=StringEscapeUtils.escapeHTML(uc.getCurrModule())%>
                            <%} else {%>
                                <%=StringEscapeUtils.escapeHTML(branch)%>&nbsp;<%=StringEscapeUtils.escapeHTML(currBrn)%>
                            <%}%>
                        <%}%>
                        <oj-menu id="branchMenu" slot="menu"  on-oj-action="[[handleMenuAction.bind(null)]]">
                            <% if("FCIS".equalsIgnoreCase(applicationName)){%>
                                <oj-option id="select_branch" value='select_branch' menu_click="disp_lov('COMMON','BLK_MODULE','MODULE_CODE','moduleid','LOV_CHANGE_MODULE_CODE', '', '', '', '', event);">
                                    <span><%=StringEscapeUtils.escapeHTML(labelSelectModule)%></span>
                                </oj-option>
                                <input type="hidden" class="LBLinv" value="" name="MODULE_CODE" id="BLK_MODULE__MODULE_CODE">
                                <oj-option value='home_branch' id="home_branch" menu_click="chgMod();"  >
                                    <span><%=StringEscapeUtils.escapeHTML(labelHomeModule)%></span>
                                </oj-option>
                            <%} else {%>
                                <%--Replaced Branch Code to labelBranchCode Bug_37347876--%>
                                <oj-option id="select_branch" value='select_branch' menu_click="disp_lov('SMCHGBRN','BLK_BRANCH','BRANCH_CODE',labelBranchCode,'LOV_CHANGE_BRANCH_CODE', '', '', '', '', event);">
                                    <span><%=StringEscapeUtils.escapeHTML(labelSelectBranch)%></span>
                                </oj-option>
                                <input type="hidden" class="LBLinv" value="" name="BRANCH_CODE" id="BLK_BRANCH__BRANCH_CODE">
                                <input id="BLK_BRANCH__STAGE" class="LBLinv"  name="STAGE" type="hidden" value="">
                                <oj-option value='home_branch' id="home_branch" menu_click="chgBrn();"  >
                                    <span><%=StringEscapeUtils.escapeHTML(labelHomeBranch)%></span>
                                </oj-option>
                            <%}%>
                        </oj-menu>
                    </oj-menu-button>
                </div>
                <div class="oj-flex-item  oj-divider-end">
                    <!--<ul>
                        <li tabindex="0" role="presentation" onclick="showMenu(this, true, event)" onmouseover="showMenu(this, true, event)" onmouseout="hideMenu(this, true, false, event)" class="time">--><!--HTML5 Changes--><!----><!--HTML5 Changes 6/OCT/2016--><!--
                            <label class="LBLmenustd" id="dateli"></label>
                        </li>
                    </ul>
					<ul id="menu" class="listPop" style='width:auto;'>  --><!--Fix for 28682961--><!--
                        <li id="sesTime" tabindex="0" onmouseover="showMenu(this, true, event)" onmouseout="hideMenu(this, true, false, event)" onkeydown="return handleKeys(this, true, event);hideMenu(this, true, true, event);" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_SESSION_TIME"))%>">--><!--HTML5 Changes 6/OCT/2016--><!----><!--HTML5 Changes 28/NOV/2016 Fix for 24942185--><!--
                        </li>
                        --><!--timeZone changes by Shishir Start--><!--
                        <li id="datel1" tabindex="0" onmouseover="showMenu(this, true, event)" onmouseout="hideMenu(this, true, false, event)" onkeydown="return handleKeys(this, true, event);hideMenu(this, true, true, event);"%>">--><!--timeZone changes--><!--
                        </li>
                        --><!--timeZone changes by Shishir End--><!--
                    </ul>-->
                    <oj-menu-button chroming="borderless"   >
                        <span slot='startIcon' class=" oj-ux-ico-calendar-clock"></span>
                        <span id="dateli"></span>
                        <oj-menu id="dateMenu" slot="menu">
                            <oj-option id="sessionTime" value='sessionTime' >
                                <span id="sesTime"><%=StringEscapeUtils.escapeHTML(sessionTime)%></span>
                            </oj-option>
                            <oj-option id="datel1" value='sessionTime' >
                                <span id="hostTimezone"><%=StringEscapeUtils.escapeHTML(sessionTime)%></span>
                            </oj-option>
                        </oj-menu>
                    </oj-menu-button>
                </div>
                <div class="oj-flex-item" id="windowDiv">
                    <oj-menu-button id='window' chroming="borderless">
                        <span slot='startIcon' class="oj-ux-ico-popup-oj"></span>
                        <%=StringEscapeUtils.escapeHTML(labelWindow)%>
                        <oj-menu id="windowsMenu" slot="menu" on-oj-action="[[handleMenuAction.bind(null)]]" >
                            <oj-bind-for-each data="[[menuItems]]">
                                <template>
                                    <oj-option value='[[$current.data.label]]' :menu_click='[[$current.data.menu_click]]' :id="[[$current.data.id]]">
                                        <span>
                                            <oj-bind-text value='[[$current.data.label]]'></oj-bind-text>
                                        </span>
                                    </oj-option>
                                </template>
                            </oj-bind-for-each>
                        </oj-menu>
                    </oj-menu-button>
                </div>
                <div class="oj-flex-item oj-sm-margin-1x-top oj-sm-margin-2x-end">
                    <!--<ul>
                        <li role="presentation">
                            <span class="TBgp3">
                            <label class="LBLinv" for="fastpath"><%=StringEscapeUtils.escapeHTML(labelFastPath)%></label>--><!--HTML5 Changes 14/NOV/2016 start--><!--
                            <input class="TXTstd" tabindex="0" accesskey="f" name="fastpath" id="fastpath" size="10" style="width:7em" maxlength="12" value="" placeholder="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_FASTPATH_EG"))%>" onkeyup="return fnHTLBarKeyEvents(event);" onmousedown="return fnHTLBarKeyEvents(event);" onfocus="showMenu(this, false, event);" onblur="fnToUppercase(this, event);" title="<%=StringEscapeUtils.escapeHTML(labelFunctionId)%>" type="text" list="fpFuncIdList">--><!--HTML5 Changes 22/NOV/2016--><!--
                            <%if (!"".equals(hotkeyFnids) && !"null".equals(hotkeyFnids)) {%>
                            <datalist id="fpFuncIdList">
                                <%String[] hotkeyIds = hotkeyFnids.split("__",-1);
                                for(int i=0;i<hotkeyIds.length;i++) {
                                    if (!"".equals(hotkeyIds[i]) && !"null".equals(hotkeyIds[i])){%>
                                    <option value="<%=StringEscapeUtils.escapeHTML(hotkeyIds[i])%>"><%=StringEscapeUtils.escapeHTML(hotkeyIds[i])%></option>
                                <%}}%>
                            </datalist>
                            <%}%>
                            <button class="BTNicon" id="btnGo" tabindex="0"  onclick="doAction('Go',event);" onkeydown="return handleActionKeys(this, event)" title="<%=StringEscapeUtils.escapeHTML(labelGo)%>" onfocus="this.className='BTNiconH'" onblur="this.className='BTNicon'" onmouseover="this.className='BTNiconH'" onmouseout="this.className='BTNicon'"><span class="ICOgo"><span class="LBLinv"><%=StringEscapeUtils.escapeHTML(labelGo)%></span></span></button>--><!--HTML5 Changes 6/OCT/2016--><!--
                            --><!--HTML5 Changes 14/NOV/2016 end--><!--
                            </span>
                        </li>
                    </ul>-->
                    <oj-input-search id="fastpath" name="fastpath" onblur="fnToUppercase(this, event);"
                    class="fastPathSearch"
                    onkeydown = "return fnHTLBarKeyEvents(event);"
                     suggestions="[[fastPathDataProvider]]"
                placeholder="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_FASTPATH_EG"))%>"
                     aria-label="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_FASTPATH_EG"))%>">
                    </oj-input-search>
                    <oj-button display="icons" chroming="borderless" class="inputNumLovIcon" id="btnGo" onclick="doAction('Go',event);" title="<%=StringEscapeUtils.escapeHTML(labelGo)%>">
                        <span slot="startIcon" class="oj-typography-body-md oj-ux-ico-caret-right"></span>
                    </oj-button>
                </div>
                <div class="oj-flex-item">
                    <oj-menu-button chroming="borderless" id='LoggedUser_Menu'>
                        <span slot='startIcon' class="oj-ux-ico-user-configuration"></span>
                        <%=StringEscapeUtils.escapeHTML(userName)%>
                        <oj-menu id="userMenu" slot="menu"  on-oj-action="[[handleMenuAction.bind(null)]]">
                            <%if ("ONLINE".equalsIgnoreCase(brnHostLinkStatus)) {%>
                                <oj-option id="userSetting" value='userSetting' menu_click="showChangePassword('SMUSRSET.jsp');">
                                    <span><%=StringEscapeUtils.escapeHTML(labelDateAmountTheme)%></span>
                                </oj-option>
                                <%if ("N".equals(BranchConstants.EXT_PWD) && "N".equals(BranchConstants.SSO_REQD) ){%>
                                    <oj-option id="changePass" value='changePass' menu_click="showChangePassword('SMCHGPWD.jsp');">
                                        <span><%=StringEscapeUtils.escapeHTML(labelChangePass)%></span>
                                    </oj-option>                                
                                <%}%>
                                <% if(!"FCIS".equalsIgnoreCase(applicationName)){%>
                                    <oj-option id="hotkeyOption" value='hotkeyOption' menu_click="dispHref('SMDHOTKY','', '', '');">
                                        <span><%=StringEscapeUtils.escapeHTML(labelUserHotKey)%></span>
                                    </oj-option>
                                    <oj-option id="mbeanOption" value='mbeanOption' menu_click="dispHref('SMDMBEAN','', '', '');">
                                        <span><%=StringEscapeUtils.escapeHTML(labelMBeanShortcut)%></span>
                                    </oj-option>
                                    <oj-option id="clruOption" value='clruOption' menu_click="dispHref('CLRU','', '', '');">
                                        <span><%=StringEscapeUtils.escapeHTML(labelClearUser)%></span>
                                    </oj-option>                                    
                                <%}%>
                                <%if("Y".equals(debugWindowEnabled)){%>
                                    <oj-option value='debugWindow' id="debugWindow" menu_click="debugFlg(event);debugWindowFlg(event);"  >
                                        <span><%=StringEscapeUtils.escapeHTML((String) labelDebugWindow)%></span>
                                    </oj-option>
                                <%}%>
                            <%}%>
                            <oj-option value='accessDetails' id="accessDetails" menu_click="showChangePassword('AccessKeyDetails.jsp');"  >
                                <span><%=StringEscapeUtils.escapeHTML(labelHelpAccessibility)%></span>
                            </oj-option>
                            <oj-option value='about' id="about" menu_click="showChangePassword('about.jsp');"  >
                                <span><%=StringEscapeUtils.escapeHTML(labelHelpAbout)%></span>
                            </oj-option>
                            <% if((null != extHelpFilePath) && (!"".equals(extHelpFilePath))){%>
                                <oj-option value='help' id="help" menu_click="fnshowHelpFile();" >
                                <span><%=StringEscapeUtils.escapeHTML(labelOnlineHelpFile)%></span>
                                </oj-option>
                            <%}%>    
                            <oj-option value='signOff' id="signOff" menu_click="doAction('SignOff',event);"  >
                                <span><%=StringEscapeUtils.escapeHTML(labelSignOff)%></span>
                            </oj-option>
                        </oj-menu>
                    </oj-menu-button>
                </div>
            </div>
           </div>
         </div>
            <div id='SYS_TBL_TABS' class="oj-flex-bar oj-sm-align-items-center oj-sm-padding-4x-start">
            <div class="oj-flex-bar-start">
                <oj-navigation-list drill-mode="none" edge="top">
                <ul id='dboardtablist'>
                    <li id=''>
                        <a accesskey="H" id='DBoardHome' selected='false' href='#hrefDBoardHome' tabindex='0' onkeydown='return handleTabKeys(this,event)' objclicked='true'  objvisited='true' title='(<%=StringEscapeUtils.escapeHTML(labelSelected)%>)' onclick='showDBoardTabs("DBoardHome", event)'><span>&nbsp;<%=StringEscapeUtils.escapeHTML(labelHome)%></span></a></li>
                     <%--Added for 16958871 --%>
                     <% 
                     if(!"FCIS".equalsIgnoreCase(applicationName)){
					 if("Y".equalsIgnoreCase(rofcInstalled)){%>
                    <li id=''>
                        <a accesskey="I" id='DBoardMessages' selected='false' href='#hrefDBoardMessages' tabindex='0' onkeydown='return handleTabKeys(this,event)' objclicked='false'  objvisited='true' onclick='showDBoardTabs("DBoardMessages", event)'><span>&nbsp;<%=StringEscapeUtils.escapeHTML(labelInteractions)%></span></a></li>
                    <%
					 }
					if(nguiTabReqd) {%>
                        <li id=''>
                            <a accesskey="U" id='DBoardNextGenUI' selected='false' href='#hrefDBoardNextGenUI' tabindex='0' onkeydown='return handleTabKeys(this,event)' objclicked='false'  objvisited='true' onclick='showDBoardTabs("DBoardNextGenUI", event)'><span>&nbsp;<%=StringEscapeUtils.escapeHTML(labelNextGenUI)%></span></a></li>
                    <%}%>
                    <% 
                    }
								 
                    if("Y".equalsIgnoreCase(rofcInstalled)){//fixes for 17462702 //34287645_changes from BRANCH_PLUGIN to rofcInstalled
                    %>
                     <%-- Security bug 9710380 fixes starts*/ --%>
                    
                    <li id=''>
                        <a accesskey="C" id='DBoardCustomer' selected='false' href='#hrefDBoardCustomer' tabindex='0' onkeydown='return handleTabKeys(this,event)' objclicked='false'  objvisited='true' onclick='showDBoardTabs("DBoardCustomer", event)'><span>&nbsp;<%=StringEscapeUtils.escapeHTML(labelCustomer)%></span></a>
                    </li>
                
                        
                     <%-- Security bug 9710380 fixes ends*/ --%>
					<%-- FCUBS_Branch_Deprecation comment starts*/ --%>
                    <!--<li id=''>
                        <a accesskey="W" id='DBoardWorkFlow' selected='false' class='Htaball' href='#hrefDBoardWorkFlow' tabindex='0' onkeydown='return handleTabKeys(this,event)' onmouseover='setTabClass(this,"onmouseover")' onblur='setTabClass(this,"onblur")' onmouseout='setTabClass(this,"onmouseout")' objclicked='false'   objvisited='true' onclick='showDBoardTabs("DBoardWorkFlow", event)'><span>&nbsp;<%=StringEscapeUtils.escapeHTML(labelWorkflow)%></span></a></li>-->
					<%-- FCUBS_Branch_Deprecation comment ends*/ --%>
                    <%
                        }
                    %>
                    <%  
                        if ("Y".equalsIgnoreCase((String)session.getAttribute("BPEL_ENABLED"))){//fixes for 17462702
                    %>
                    <li id=''>
                        <a accesskey="T" id='DBoardTasks' selected='false' class='Htaball' href='#hrefDBoardTasks' tabindex='0' onkeydown='return handleTabKeys(this,event)' objclicked='false'  objvisited='true' onclick='showDBoardTabs("DBoardTasks", event)'><span>&nbsp;<%=StringEscapeUtils.escapeHTML(labelTasks)%></span></a></li>
                    <%--Added for 16958871 --%>
                    <%
                        }
                        
                    
                          if((!"FCIS".equalsIgnoreCase(applicationName)) && ("Y".equalsIgnoreCase(rofcInstalled))){	//fixes for 17462702					  
                    %>
                    <li id=''>
                        <a accesskey="P" id='DBoardMyDashBoard' selected='false' class='Htaball' href='#hrefDBoardMyDashBoard' tabindex='0' onkeydown='return handleTabKeys(this,event)' objclicked='false'  objvisited='true' onclick='showDBoardTabs("DBoardMyDashBoard", event)'><span>&nbsp;<%=StringEscapeUtils.escapeHTML(labelPreferences)%></span></a></li>
               <%}%>
                </ul>
                </oj-navigation-list>
                </div>
                <div class="oj-flex-bar-end">
                <% if("Y".equalsIgnoreCase(mfaenabled)) {
                    if("Y".equalsIgnoreCase(isMFAAuthenticated)) {%>
                          <div class="oj-flex-item"><oj-label class="oj-sm-align-items-center" slot="label" ><%=StringEscapeUtils.escapeHTML((labelMFA))%></oj-label></div>
                <%} else{%>
                       <div class="oj-flex-item"> <oj-label class="oj-sm-align-items-center" slot="label" ><span class="oj-text-color-warning"><%=StringEscapeUtils.escapeHTML((labelNonMFA))%></span></oj-label></div>
                     <%}%><!-- Fix for 19049454 starts-->
               <%} else if(!"FCIS".equalsIgnoreCase(applicationName)){%><!--Fix for 21236439 -->
                          <div class="oj-flex-item"><oj-label class="oj-sm-align-items-center" slot="label" ><span class="oj-text-color-warning"><%=StringEscapeUtils.escapeHTML((labelNonMFA))%></span></oj-label></div>
                    <%}%><!--Fix for 19049454 ends-->
            
                <div id="btnDiv12">
                     <%--FCUBS12.0.1 Fix for Bug 14761667 starts--%>
                    <oj-button display="icons" chroming="borderless" onclick="fnRefreshDashBoardData1(event)" disabled="true" id="btnrefresh" accesskey="1"><%--12.0.2 new Changes--%>
                    <span slot='startIcon' class="oj-ux-ico-refresh" title=<%=StringEscapeUtils.escapeHTML(labelRefresh)%>></span>
                     <%--FCUBS12.0.1 Fix for Bug 14761667 ends--%>
                    </oj-button>  
                </div>
                <div id="btnDiv">
                     <oj-button display="icons" chroming="borderless" onclick="fnUpdateNavButtons('PREVIOUS')" disabled="true" id="btnprev">
                    <span slot='startIcon' class="oj-ux-ico-caret-left"  title=<%=StringEscapeUtils.escapeHTML(labelPrevious)%>></span>
                    </oj-button>
                     <oj-button display="icons" chroming="borderless" onclick="fnUpdateNavButtons('NEXT')" disabled="true" id="btnnext">
                    <span slot='startIcon' class="oj-ux-ico-caret-right" title=<%=StringEscapeUtils.escapeHTML(labelNext)%>></span>
                    </oj-button>
                </div>
                </div>
            </div>
            <div class="oj-sm-padding-1x-top" style="max-height:8px;">   
         <img src="./Images/Color Strip.svg" alt="background strip" class="oj-sm-width-full background-strip"/>
             </div>
                 <%--12.0.2 Changes Ends for structure change --%>
          <%--1202 nls  </div>--%>
            
        </div>
        <div class="oj-offcanvas-outer-wrapper" id="landingContainer">
        <div class="oj-offcanvas-start oj-bg-brand-120 side-menu" id="leftpanel"><!--HTML5 Changes Start-->
            <div id="menuHeaderDiv" class="oj-sm-margin-2x"> <!--citi ui change start-->
            <div id="divmenusearch"> 
            <oj-combobox-one id="MenuSearch"  options="{{menuSearchProvider}}" on-oj-value-updated="[[handleMenuSearchAction]]" 
                label-hint="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MENU_SEARCH_EG"))%>" label-edge="inside"
                class="oj-form-control-max-width-md">
                <a slot="end" id="search-button" class=" oj-fwk-icon-magnifier oj-fwk-icon" ></a>
            </oj-combobox-one>
            </div>
            </div>
            <div id="vtab">
                <div class="oj-color-invert" id="idAppBrw" style="display:block">
                    <div class="" id="vTabCN_EXPLORE" style="display:block;Width:100%">
                    </div>
                    <div class="tabcontent" id="vTabCN_CENTRAL_PROCESS" style="display:none;Width:100%"></div><!--HTML5 Changes 6/OCT/2016--><!--HTML5 Changes 14/NOV/2016-->
                </div>
            </div>
        </div>
        <div class="mainContainer full-height" id="mainContent">
        <div id="dashboard" style="position:relative;" class="oj-sm-width-full">
            <div id="vTabDB_DASHBOARD"><!--HTML5 Changes End-->
                <div id='DIVTabContentDBoardHome'  style="height:0px;"></div>
                <div id='DIVTabContentDBoardMessages'  style="display:none;height:0px"></div>
                <div id='DIVTabContentDBoardNextGenUI' style="display:none;height:0px"></div>
                <div id='DIVTabContentDBoardCustomer' class="oj-sm-padding-4x-start" title="<%=StringEscapeUtils.escapeHTML(labelCustomer)%>" onkeydown="handleCustQueryKeyDownEvents(event)" style="display:none;height:0px"><%-- Fix for 20817661 --%>
                  	<div id="hTab_DBoardCustomer">
					<!--<%
                    if ("ONLINE".equalsIgnoreCase(brnHostLinkStatus)) {
                    %>-->
                   <!-- <div id="vtabMinCust">
                        <span class="DashDIVnav1" style="padding:0px;">
                        <%--fix for 17014727--%>
                        <button id="minimizerCust" class="BTNicon"  accesskey="2" onmouseout="this.className='BTNicon'" onmouseover="this.className='BTNiconH'" onblur="this.className='BTNicon'" onfocus="this.className='BTNiconH'" onkeydown="return handleActionKeys(this, event)" title=<%=StringEscapeUtils.escapeHTML(labelCollapseMenu)%> onclick="showHideVtab_Cust()">
                          <span class="ICObrwMaximizer">
                            <span class="LBLinv"><%=StringEscapeUtils.escapeHTML(expLeftMenu)%></span>
                          </span>
                        </button> 
                        </span>
                    </div>-->
                   <!-- <%
                    }
                    %>-->	
                  
                  <oj-navigation-list drill-mode="none" selection="" edge="top" id="custLandingTabs">
                    <ul id = "tabListCust"><%--Customer Accessibility start--%>
                    <li><a id="CustomerSearch"  tabindex="0" objclicked="true" onkeydown="handleTabKeysCust(this, event);return handleTabKeys(this,event)"  onclick="fnToggleDisplay('CustomerSearch');">
                      <span   ><%=StringEscapeUtils.escapeHTML(lblCustomerDet)%>
                      </span>
                      </a></li><%--Customer Accessibility end--%>
                    </ul>
                    </oj-navigation-list>
                    </div>
                    <div id="hTabCN_Customer" style="overflow:auto;width:100%">
					<%
                      if ("ONLINE".equalsIgnoreCase(brnHostLinkStatus)) {
                     %>	
                      <div id='ContentCustomerSearch'>
                        <div id="testwin_cust" style="visibility:hidden;"></div>
                      </div>
					<%
                    }
                    %>
                    </div>
                </div>
	<%-- FCUBS_Branch_Deprecation comment starts*/ --%>
              <!--<div id='DIVTabContentDBoardWorkFlow' style="display:none;height:0px">
                    <div id="hTab_DBoardWorkFlow" class="DBoardHeadDiv">
                    <ul>
                    <li>
                      <a id="WorkflowSearch" tabindex="0"  onkeydown="return handleTabKeys(this,event)"  onclick="fnToggleDisplay('WorkflowSearch');">
                      <span id="spanWorkflowSearch" class="DBoardHeadDivSpanDeSel"><%=StringEscapeUtils.escapeHTML(labelWorkflow)%>
                      </span>
                      </a>
                      </li>
                      </ul>
                    </div>
                    <div id="hTabCN_WORKFLOW"></div>
                </div>-->
			<%-- FCUBS_Branch_Deprecation comment ends*/ --%>
                <div id='DIVTabContentDBoardTasks' style="display:none;height:0px"></div> 
                <div id='DIVTabContentDBoardMyDashBoard' style="display:none;height:0px"></div>
            </div>
        </div>
        <div id="IFlauncher" style="width:1px ;height:0px;z-index:2;"></div>
        <div id="debugWindowDIV" style="width:1px ;height:0px;">
        </div>    
        <div id="masker" class="masker" style="display:none" tabindex="-1">
            <!--<div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none">--><!--HTML5 Changes--><!--
                <iframe id="ifr_AlertWin" class="frames" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>-->
           
        </div>
 <%--1203_OR_CHANGES Start --%>
            <div id="Div_ReminderAlertWin" style="position:absolute;display:none">
                <iframe id="ifr_ReminderAlertWin" class="frames" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div> 
<%--1203_OR_CHANGES end --%>            
        <%--12.0.2 Screen Saver Changes End --%>
    </div>
	<!-- 9NT1606_12_2_RETRO_12_0_3_21182929 changes start -->
        
    <!-- timeOutAlertDiv OJET Changes Start-->
   <!-- <div id="timeOutAlertDiv" class="WNDcontainerModal frames" style="display:none">
            <div style="width: 560px;" class="WNDtitlebar" id="timeOutErrWndtitle" onmousedown="startDrag(event)">
                <b class="BTNicon"><span class="ICOalert2"></span></b>	
                <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(errMsg)%></h1>            	
            </div>
            <div class="WNDcontentmodal" id="timeOutErrWndwidth">
            <div class="DIVtblbox1outer2">
                    <div id="tbl-container" class="DIVtblbox2">
                          <table id="ERRTBL" class="TBLtwo" border="0" cellspacing="0" cellpadding="0" width="100%" summary="Alert">
                                    <thead>
                                       
                                        <TR><TH width="85%" scope=col><SPAN class=SPNtbltwoH tabIndex=0><%=StringEscapeUtils.escapeHTML(lblErrDesc)%></SPAN></TH>
                                        <TH class=THLast width="15%" scope=col><SPAN class=SPNtbltwoH tabIndex=0><%=StringEscapeUtils.escapeHTML(lblErrCode)%></SPAN></TH></TR>
                                    </thead>
                                    <tbody>                                           
                                    </tbody>
                            </table>
                    </div>        
              </div>
                <div class="WNDfootermodal">
                    <div class="WNDfbuttons">
                        <table role="presentation" width="99%" border="0" cellspacing="0" cellpadding="0" id="TBLPageTAB_FOOTER">
                             <tbody>
                                 <tr>
                                   <td valign="top" width="98%">
                                   </td><td style="padding-left:10px" nowrap="nowrap">
                                  <input class="BTNfooter" onblur="this.className='BTNfooter'" value="<%=StringEscapeUtils.escapeHTML(okLabel)%>" title="<%=StringEscapeUtils.escapeHTML(okLabel)%>" id="TIMEOUT_BTN_OK" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" 
                                  onmouseout="this.className='BTNfooter'" onclick="closeTimeOutErrDiv(event)" name="<%=StringEscapeUtils.escapeHTML(okLabel)%>"  onkeydown="fnhandleSubScrBtn(event);"  type="button"><!--9NT1606_12_2_RETRO_12_0_3_23656268 changes-->
                                 <!--</td>
                                 </tr>
                             </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        -->
        <oj-dialog id="timeOutAlertDiv"  initial-visibility="hide"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"
                      position.of="window" class="oj-sm-width-2/5 frames"  drag-affordance="title-bar">
                      
                <DIV  slot=header onmousedown="startDrag(event)" id="timeOutErrWndtitle" class="oj-sm-width-full oj-dialog-title oj-flex-bar oj-sm-align-items-center bottom-border">
                     <div class="oj-flex-bar-start">
					  <h1><%=StringEscapeUtils.escapeHTML(errMsg)%></h1>
					</div>
               </Div>
                <div slot="body" id="timeOutErrWndwidth" class="oj-sm-align-items-center frames" >
                              <div class="frames" id="tbl-container" style="height:auto;">
                                <oj-table id="ERRTBL" data="{{alertTimeOutDataprovider}}" class="oj-sm-width-full"
                                          display="grid" columns-default='{"sortable": "disabled"}' columns="{{alertHeadersTimeOut}}">
                                </oj-table>
                              </div>
                </div>
                <div slot="footer" id="TBLPageTAB_FOOTER">
                        <div class="oj-flex-bar oj-sm-align-items-center oj-sm-padding-5x-horizontal">
                        <div class="footer-btn-container oj-flex-bar-end">
                                    <label for="TIMEOUT_BTN_OK">&nbsp;</label>
                                    <oj-button chroming="solid"  class="oj-sm-margin-1x oj-button oj-button-full-chrome oj-button-text-only oj-enabled oj-default oj-complete action-button-primary"  
                                                                    id="TIMEOUT_BTN_OK"  
                                                                    title="<%=StringEscapeUtils.escapeHTML(okLabel)%>" 
                                                                    name="<%=StringEscapeUtils.escapeHTML(okLabel)%>"
                                                                    onkeydown="return fnhandleSubScrBtn(event)" 
                                                                    on-oj-action="[[function() {closeTimeOutErrDiv()}.bind(event)]]"
                                                        >
                                                                    <%=StringEscapeUtils.escapeHTML(okLabel)%>
                                     </oj-button> 
                                       
                             </div>   
                         </div> 				
                </div>
        </oj-dialog>
        
        <!-- timeOutAlertDiv OJET Changes END-->
<!-- Biometric Changes Start-->
       <% if ("Y".equalsIgnoreCase(branchPlugin)) { %>
        <div class="" id="blw"  style="height:125px; width:400px; position: fixed; right: 0px; bottom: 0px; border: 1px solid #eee;border-color:black;border-radius:5px; background-color: #ddf;  z-index:11; visibility: hidden">
	<div id="titlediv" style="float:right;" onClick="this.parentNode.style.visibility = 'hidden';">X</div>
		<div id="details">
			<div id="image">
				<table id="tablecustImage" role="presentation">
					<tbody>
						<tr>
							<td width="49%" valign="top">
								<div class="" id="custimg" role="group" aria-labelledby="widgetoneheading4">
									<div>
										<div class="">
											<table width="100%" height="100%" class="widgetonetbl colw" id="tableCustImage" role="presentation" cellspacing="1" cellpadding="3" summary="Signatory Details">
												<tbody>
													<tr>
														<td>
															<input id="imageName" style="display: none;" type="text" size="25" readonly="true" value="null" viewmode="Y">
														</td>
													</tr>
													<tr>
														<td><iframe name="custmer_image" width="100%" height="100%" title="Customer Photo" class="imgsty" id="custmer_image" src="" style="border: 2px solid rgb(204, 204, 204); border-image: none; overflow: hidden;" ></iframe>
														</td>
													</tr>

												</tbody>
											</table>
										</div>
									</div>
								</div>
							</td>
                                                        <td width="49%" valign="top">
							<div id="det" >
				<p class="text"><strong id='cust_name'><%=StringEscapeUtils.escapeHTML(lblCustomerDet)%></strong> </p>
				<input type="hidden" id="custId" value="" />
				
				<p class="text" style="list-style-type: none;"><%=StringEscapeUtils.escapeHTML(biometric)%></p>
				<!--<p class="text" style="list-style-type: none;">Account Balance : $8734.23</p>
				<p class="text" style="list-style-type: none;">Last Transaction : ($943.23)- Cheque Deposit</strong></p>-->
				<p class="button" style="list-style-type: none;"><input type="button" onclick="dispCustDetails(event);" value="Details"/></p>
				
			</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			
	</div>
</div>
    <% } %>
    <div id="PlatoFrameDiv" style="display:none" name="PlatoFrameDiv"></div>
    </div>
    </div>
        <div class="taskBar" id="taskbar">
          <div id="MinwindC">
          <oj-conveyor-belt class="convyorBeltContainer oj-flex-item oj-sm-12" arrow-visibility="visible" style="height:100%;">
           
            <div data-bind="foreach: wizardArray" class="oj-flex"
                data-bind="attr: { 'title' : $data.label }">
                <div class="oj-sm-padding-2x-vertical  oj-sm-padding-5x-horizontal"
                data-bind="class: $data.active() ? 'oj-text-color-primary oj-bg-info-30' : 'oj-text-color-diabled oj-bg-neutral-30'">
                    <span class="oj-sm-10 oj-flex-item">
                        <span data-bind="text: $data.label" class="wiz-launcher-tab-text"></span>
                    </span>
                    <span class="oj-sm-2 oj-flex-item expandIcon wiz-launcher-tab-icon"
                        data-bind="click: maximizeWiz">
                        <i class="oj-panel-expand-icon" style="color: inherit;"></i>
                    </span>
                </div>
            </div>
            
        </oj-conveyor-belt>
          </div>
        </div>
         <!-- 9NT1606_12_2_RETRO_12_0_3_21182929 changes end -->
           <div id="Div_AlertWin"   onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none;z-index:6000"><!--HTML5 Changes-->
            <iframe id="ifr_AlertWin" src="" allowtransparency="yes" frameborder="0" scrolling="no"  ></iframe>
           </div>
           <div id="Div_ChildWin" style="display:none;width:100%; height:100%">
            </div>
        <div id="screenSavermasker" style="position:absolute;top:0px;display:none;z-index:5980"  >
         <%--12.0.2 Screen Saver Changes Start --%>
           <oj-dialog id="screenSaverPwdDIV"  initial-visibility="hide"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"
                      position.of="window" class="oj-sm-width-1/3 frames">
                      
                <DIV  slot=header onmousedown="startDrag(event)" id="wndtitle" class="oj-sm-width-full oj-dialog-title oj-flex-bar oj-sm-align-items-center bottom-border">
                        <div class="oj-flex-bar-start">
			  <h1><%=StringEscapeUtils.escapeHTML(AlertMsg)%></h1>
			</div>
               </Div>
                <div slot="body" id="wndwidth" class="oj-sm-align-items-center frames">
                  <!-- static header change start-->
                              <div id="screensavertblHeadercontainer" class="DIVtblbox2 DIVTblHeader frames"></div>
                              <div class="frames" id="screensavertblcontainer" style="height:auto;">
                                <oj-table id="SCREEN_SAVER_TBL" data="{{alertScreenSaverDataprovider}}" class="oj-sm-width-full"
                                          display="grid" columns-default='{"sortable": "disabled"}' columns="{{alertHeadersScreenSaver}}">
                                </oj-table>
                              </div>
                              <!-- <div class="WNDfbuttons">-->
                              <div id="pwdDiv" class="WNDfootermodal oj-sm-align-items-center frames">
                                <div class="oj-sm-margin-4x-top">
                                  <oj-label-value label-edge="start" label-width="30%">
                                    <oj-label slot="label" for="enteredPwd" class="LBLstd">
                                      <%=StringEscapeUtils.escapeHTML(labelScreenSaverPwd)%>
                                    </oj-label>
                                    <div slot="value" class="login-field">
                                      <oj-input-password slot="value" size="25" maxlength="21" id="enteredPwd" value=""
                                                         title='&lt;%=StringEscapeUtils.escapeHTML(labelScreenSaverPwd)%>'
                                                         onpaste="return false;"/>
                                    </div>
                                  </oj-label-value>
                                </div>
                              </div>
                              <div class="oj-flex-bar" style="margin-bottom:10px">
                                <label class="LBLstd" for="BTN_OK">&nbsp;</label>
                                <div class="oj-sm-margin-4x-top1 oj-flex-bar-end">
                                  <oj-button class="action-button-primary" chroming="solid" id="BTN_OK"
                                             name="&lt;%=StringEscapeUtils.escapeHTML(okLabel)%>"
                                             onkeydown="return fnhandleSubScrBtn(event)" 
                                            on-oj-action="[[function() {fnverifyScreenSaverPwd()}.bind(event)]]"
                                             value="&lt;%=StringEscapeUtils.escapeHTML(okLabel)%>">
                                         <%=StringEscapeUtils.escapeHTML(okLabel)%>
                                  </oj-button>
                                </div>
    </div>
                </div>
              </oj-dialog>
         </div>   
        
    </div>
    
    </body>
</HTML>
