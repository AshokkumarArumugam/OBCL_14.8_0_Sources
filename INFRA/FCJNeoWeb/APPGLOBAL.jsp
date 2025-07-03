<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : APPGLOBAL.jsp
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

Copyright  � 2004-2016 by Oracle Financial Services Software Limited..
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
**
**  Modified By          : Shayam Sundar Ragunathan
**  Modified On          : 26-Jul-2017
**  Modified Reason      : Defaulting of payable branch name and bank name in DD/BC function ID's
**  Search String        : 9NT1606_12_4_RETRO_12_0_3_26233076

**  Modified By          : Chaitanya Pundlik
**  Modified On          : 17-Dec-2024
**  Modified Reason      : Storing module group id for each function id 
**  Search String        : Bug_36924146
--------------------------------------------------------------------------------------------------------- -
*/%>
<%--<!DOCTYPE html><!--HTML5 Changes-->--%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FCApplicationGlobals"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.common.BranchUserGlobals"%>
<%@ page import="com.ofss.fcc.common.BranchParam"%>
<%@ page import="com.ofss.fcc.common.BranchInfo"%>
<%@ page import="com.ofss.fcc.common.FCLoginProcessor"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="com.ofss.fcc.common.FBContext"%> <!-- 12.2 Branch Coop entity added-->
<%@ page import="com.ofss.fcc.common.BranchConfig"%>
<%
//System.out.println("Appglobal start:" + Calendar.getInstance().get(Calendar.HOUR)+":"+Calendar.getInstance().get(Calendar.MINUTE)+":"+Calendar.getInstance().get(Calendar.SECOND)+":"+Calendar.getInstance().get(Calendar.MILLISECOND));

    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    //String Strlang         = (String)session.getAttribute("LANG");
    String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
    String StruserId        = (String) session.getAttribute("USERID");
    String strTheme         = (String)session.getAttribute("THEME");
    String browserCSS       = (String)session.getAttribute("BROWSER_CSS");
    String Strlang          = (String)session.getAttribute("LANG");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String branchPlugin     = (String)session.getAttribute("BRANCH_PLUGIN");  //SMSStandalone12.3 Changes
    String CSRFtoken    =   (String) session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/
    String branchWorkflowFrequency = (String)session.getAttribute("BRANCH_WORKFLOW_REFRESH_FREQUENCY"); //FCUBS11.1 Changes For Auto Refresh
    String ldapuser         = (String)session.getAttribute("LDAPuser"); //LDAP_POC_Changes
    FCUserGlobals uc        = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
    HashMap uc_addon        = (HashMap) session.getAttribute(BranchConstants.USERGLOBALS + "_ADDON");
    String fcjInsulation = BranchConstants.FCJ_INSULATION; //FCJ_INSULATION
    FCLoginProcessor loginProcessor = uc.getLoginProcessor();
    String userid               = uc.getCurrUser();
    String entity               = uc.getEntity();
    if((entity==null || "".equals(entity)) && "Y".equals(branchIdentifier))//SMSStandalone12.3 DC CHANGES
        entity="SMS"; //SMSStandalone12.3 DC CHANGES
    else if("N".equals(branchIdentifier))
        entity="";
        
    String lcy                  = uc.getLocalCcy();
    String hostCode             = uc.getHostCode(); //12.3 Core Host Code Change

    String signon_serial        = uc.getSignonSerial();
    String accountMask          = uc.getAccountMask();
    String appDate 	        = String.valueOf(uc.getCurrDate());   
    String appDateFCIS          = String.valueOf(uc.getCurrDateFCIS());
    String currentBranch        = uc.getCurrBranch();
    String defaultModule        = uc.getDefModule();
    //String currentModule        = uc.getCurrModuleBrn();
    //FCIS9.1 Basic Qualification Changes
    String currentModule        = uc.getCurrModule();    
    String dsnName              = uc.getDsnName();
    String currentBranchName    = uc.getBranch_name();   
    String langCode 	        = uc.getLangCd();
    //String dispDirection        = uc.getDisplayDirectionBrn();    
	//FCIS MultiModule Changes : added variable declaration 
    String multiBranchModule    = uc.getMultiBranchModule();
    String gWeeklyHol1          = uc.getWeekly_holiday1();
    String gWeeklyHol2          = uc.getWeekly_holiday2();
    String branchLcy            = uc.getLocalCcy();
    String HOBranch             = uc.getHeadOffice(); 
    String HOMEBranch           = uc.getHomeBranch(); 
    String HOMEEntity           = uc.getHomeEntity();  //SMSStandalone12.3 Changes
    String CurrentEntity        = entity;   //SMSStandalone12.3 Changes
    String currentCycle         = uc.getCurrent_cycle(); 
    String currentPeriod        = uc.getCurrentPeriod();
    String bankCode 	        = String.valueOf(uc.getBankCode());  
	String bankName             = String.valueOf(uc.getBankName());//9NT1606_12_4_RETRO_12_0_3_26233076
    String currBranchName       = String.valueOf(uc.get_currBranchName());//9NT1606_12_4_RETRO_12_0_3_26233076	
    String branchEoi            = uc.getBranch_eoi();
    String release_type         = ""; //uc.getReleaseType();
    String curr_user            = uc.getCurrUser();
    String popupalert           = uc.getPopup();
    String licensemsg           = uc.getlicmsg();    
    String countAlerts          = uc.getcountAlerts();
    //String pwdHasCaps           = uc.getPwdHasCaps();
    
    String loginDateLast                  = uc.getLastLogin();
    String noOfInvalidLogins              = uc.getInvalidLogins();     
    //String user_prod_restr_apply          = uc.getUser_prod_restr_apply();
    String auto_auth                      = String.valueOf(uc.getautoAuthBrn()); 
    String auth_mesg                      = String.valueOf(uc.getauthMesgBrn());  
    //String user_products_access_allowed   = uc.getUser_products_access_allowed();
    
    String currentDept	    =	uc.getCurrDept();
    String homeDept	    =	uc.getHomeDept();    
    
    //String strTheme = (String)session.getAttribute("THEME");
    String l_strTheme = strTheme.substring(0, strTheme.indexOf(".css"));
    String defaultstyle      = (String) BranchConstants.DEFAULT_STYLE;
    String lovDataFetch  =   (String) BranchConstants.LOV_DATA_FETCH;
    String reqEnc_Reqd             = FCApplicationGlobals.getreqEnc_Reqd(); // Login Encryption Changes
    //String theme_imagesPath = "Images/"+l_strTheme;
    String currBranchDate = "";
    String userTaskStatusCnt = uc.getUserTaskStatusCnt();   
    HashMap branchGlobalsMap = BranchUserGlobals.getInstance().getBranchGlobal();
    Iterator branchGlobalsKeyItr = branchGlobalsMap.keySet().iterator();
    while (branchGlobalsKeyItr.hasNext()) {
        String branchKey = (String)branchGlobalsKeyItr.next();
        if (branchKey.equals(uc.getCurrBranch())) {
            BranchInfo bi = (BranchInfo)branchGlobalsMap.get(branchKey);
            currBranchDate =  bi.getCurrentPostingDate();
        }            
    }
    FBContext fbContext = new FBContext(userid); //12.2 Branch Coop entity added
    
    fbContext.setEntityName(entity);//12.2 Branch Coop entity added
    //FCUBS121DEV_DENOM_TRACKING_BRANCH_LEVEL
       String branchTrackingFor="";
       if("Y".equalsIgnoreCase(branchPlugin)){ //SMSStandalone12.3 Changes
       List<String[]> CCYTrackforList;
       //12.2 Branch Coop entity added fbContext as getCacheFBTBParams argument
       CCYTrackforList = (List)BranchParam.getInstance().getCacheFBTBParams(fbContext).get("CCY_TRACKING_FOR_LIST");
	   if(CCYTrackforList != null && ! CCYTrackforList.isEmpty()){ //APPGLOBAL_CHANGES	   
       for(int i=0;i<CCYTrackforList.size();i++)
       {
       if(CCYTrackforList.get(i)[0].equals(uc.getCurrBranch()))
       {
       branchTrackingFor=CCYTrackforList.get(i)[1];
       }
       }
	   } //APPGLOBAL_CHANGES
       }//SMSStandalone12.3 Changes
       if(branchTrackingFor=="")
       {
       branchTrackingFor="N";
       }
    
    //FCUBS121DEV_DENOM_TRACKING_BRANCH_LEVEL
    
    String eodFunctions="";
    List eodFunctionList;
    if ("Y".equalsIgnoreCase(branchIdentifier)) {
        eodFunctionList = loginProcessor.getEodList();
    } else {
    //12.2 Branch Coop entity added fbContext as getCacheFBTBParams argument
        eodFunctionList = (List)BranchParam.getInstance().getCacheFBTBParams(fbContext).get("EOD_FUNCTIONS_LIST");
    }
    if(eodFunctionList != null && !eodFunctionList.isEmpty()) {
        Iterator eodFunctionListIterator = eodFunctionList.iterator();
        while(eodFunctionListIterator.hasNext()) {
            eodFunctions += (String)eodFunctionListIterator.next()+"__";
        }
        int lastIndex=eodFunctions.lastIndexOf("__");
        eodFunctions=eodFunctions.substring(0,lastIndex);
    }
    //temp changes
    String multiBranchFunctions="";
    List  multiBranchFunctionList;
    if ("Y".equalsIgnoreCase(branchIdentifier)) {
        multiBranchFunctionList = loginProcessor.getMultiBranchfnList();
    } else {
    //12.2 Branch Coop entity added fbContext as getCacheFBTBParams argument
        multiBranchFunctionList = (List)BranchParam.getInstance().getCacheFBTBParams(fbContext).get("MULTI_BRN_FUNCTIONS_LIST");
    }
    if(multiBranchFunctionList != null && !multiBranchFunctionList.isEmpty()) {
        Iterator multiBranchFunctionListIterator = multiBranchFunctionList.iterator();
        while(multiBranchFunctionListIterator.hasNext()) {
            multiBranchFunctions += (String)multiBranchFunctionListIterator.next()+"__";
        }
        int lastIndex=multiBranchFunctions.lastIndexOf("__");
        multiBranchFunctions=multiBranchFunctions.substring(0,lastIndex);
    }
    //temp changes
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,userid);
        
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");   
    String dashboardFuncs = uc.getDashboardFunctions();
	String countryCode = uc.getCountryCode();
  	String currentTime = uc.getCurrentTime();
    String debugWindowReq = uc.getDebugWindowEnabled();//Changes for FE Debug Window
    String numberFormatMask = uc.getNumberFormatMask();//Changes for formatting number
    String terminalName = uc.getTerminalName();//TERMINAL_NAME_ENH_14.1
%>   
        <script type="text/javascript">
            var ldapuser            =   '<%=StringEscapeUtils.escapeJavaScript((String)session.getAttribute("LDAPuser"))%>'; //LDAP_POC_Changes        
         //Added for Country_code --start
        var countryCode = '<%= StringEscapeUtils.escapeJavaScript(countryCode) %>';
         
          
         var currentTime = '<%= StringEscapeUtils.escapeJavaScript(uc.getCurrentTime()) %>';
          
            var VIEWMAINT           =   '';
            var addonGlobal         =   new Array();
            var AppSource           =   "FLEXCUBE";
            var AccountMask 	    = 	'<%= StringEscapeUtils.escapeJavaScript(accountMask) %>';
            var AppDate 	    = 	'<%= StringEscapeUtils.escapeJavaScript(appDate) %>';
            var CurrBranchDate      =   '<%= StringEscapeUtils.escapeJavaScript(currBranchDate)%>';
            var CurrentBranch	    =	'<%= StringEscapeUtils.escapeJavaScript(currentBranch) %>';
            var DefaultModule	    =	'<%= StringEscapeUtils.escapeJavaScript(defaultModule) %>';
            var CurrentModule	    =	'<%= StringEscapeUtils.escapeJavaScript(currentModule) %>';// fcis
            var dsnName             =   '<%= StringEscapeUtils.escapeJavaScript(dsnName) %>';// fcis
            var CurrentBranchName   =   '<%= StringEscapeUtils.escapeJavaScript(currentBranchName) %>';
            var Debug		    = 	'N';
			var multiBranchModule         =   '<%= StringEscapeUtils.escapeJavaScript(multiBranchModule) %>'; //FCIS MultiModule Changes
            var CurrentDept	    =	'<%= StringEscapeUtils.escapeJavaScript(currentDept) %>';
            var HomeDept	    =	'<%= StringEscapeUtils.escapeJavaScript(homeDept) %>'; 
            var LangISOCode 	    = 	'<%= StringEscapeUtils.escapeJavaScript(StrlangISOMap) %>';
            var LangCode 	    = 	'<%= StringEscapeUtils.escapeJavaScript(langCode) %>';
            var Lcy		    =	'<%= StringEscapeUtils.escapeJavaScript(lcy) %>';
            var HostCode		    =	'<%= StringEscapeUtils.escapeJavaScript(hostCode) %>';//12.3 Core Host Code Change
            var SignonSerial 	    = 	'<%= StringEscapeUtils.escapeJavaScript(signon_serial) %>';	
            var UIXmlPath 	    = 	'<%=StringEscapeUtils.escapeJavaScript((String)session.getAttribute("UIXML_PATH"))%>';
            var XslPath 	    = 	'Templates/XSL';
            var UserId		    =	'<%= StringEscapeUtils.escapeJavaScript(userid) %>';
            var gWeeklyHol1         =   '<%= StringEscapeUtils.escapeJavaScript(gWeeklyHol1) %>';
            var gWeeklyHol2         =   '<%= StringEscapeUtils.escapeJavaScript(gWeeklyHol2) %>';
            var BranchLcy           =   '<%= StringEscapeUtils.escapeJavaScript(branchLcy) %>';
            var HOBranch            =   '<%= StringEscapeUtils.escapeJavaScript(HOBranch)%>'; 
            var HOMEBranch          =   '<%= StringEscapeUtils.escapeJavaScript(HOMEBranch)%>'; 
            var HOMEEntity          =   '<%= StringEscapeUtils.escapeJavaScript(HOMEEntity)%>';  //SMSStandalone12.3 Changes
            var CurrentEntity       =   '<%= StringEscapeUtils.escapeJavaScript(CurrentEntity)%>'; //SMSStandalone12.3 Changes
            var CurrentCycle        =   '<%= StringEscapeUtils.escapeJavaScript(currentCycle) %>'; 
            var CurrentPeriod       =   '<%= StringEscapeUtils.escapeJavaScript(currentPeriod) %>';
            var BankCode 	    = 	'<%= StringEscapeUtils.escapeJavaScript(bankCode) %>';  
			var BankName            =  '<%= StringEscapeUtils.escapeJavaScript(bankName) %>';//9NT1606_12_4_RETRO_12_0_3_26233076
            var CurrBranchName      =  '<%= StringEscapeUtils.escapeJavaScript(currBranchName) %>';//9NT1606_12_4_RETRO_12_0_3_26233076			
            var BranchEoi           =   '<%= StringEscapeUtils.escapeJavaScript(branchEoi) %>'; //Branch End of Input Status.
            var applicationName     =   '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("APPLICATION_NAME"))%>';
            if(applicationName == "FCIS")
                AppDate 	    = 	'<%= StringEscapeUtils.escapeJavaScript(appDateFCIS) %>';    
            var dispSize            =   '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("DISPLAY_SIZE"))%>';   
            var applicationExt      =   '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("APPLICATION_EXT")) %>';    
            var strTheme            =   '<%=StringEscapeUtils.escapeJavaScript(strTheme)%>';
            var browserCSS          =   '<%=StringEscapeUtils.escapeJavaScript(browserCSS)%>';
            var defaultstyle        =   '<%=StringEscapeUtils.escapeJavaScript(defaultstyle)%>';
            var SSO_REQ             =   '<%= StringEscapeUtils.escapeJavaScript(BranchConfig.getInstance().getConfigValue("SSO_REQ")) %>'; //FCUBS10.0 SSO 
          	//BUG#32891272: Changes Start
          	// IDCS SSO-Signoff
          	var SSO_TYPE     =   '<%= StringEscapeUtils.escapeJavaScript(BranchConfig.getInstance().getConfigValue("SSO_TYPE")) %>';
            var SSO_SIGNOFF_REQ     =   '<%= StringEscapeUtils.escapeJavaScript(BranchConfig.getInstance().getConfigValue("SSO_SIGNOFF_REQ")) %>';  
            var SSO_SIGNOFF_URL     =   '<%= StringEscapeUtils.escapeJavaScript(BranchConfig.getInstance().getConfigValue("SSO_SIGNOFF_URL")) %>'; 
            var SSO_SIGNOFF_POST_RD_URL     =   '<%= StringEscapeUtils.escapeJavaScript(BranchConfig.getInstance().getConfigValue("SSO_SIGNOFF_POST_RD_URL")) %>';
           //BUG#32891272: Changes End
            var mBean_required      =    '<%= StringEscapeUtils.escapeJavaScript((String)session.getAttribute("MBEAN_REQ")) %>';    
            //12.2 Branch Coop entity added fbContext as getCacheFBTBParams argument
			var denomBasedTracking  =   '<%= StringEscapeUtils.escapeJavaScript((String)BranchParam.getInstance().getCacheFBTBParams(fbContext).get("DENOM_VARIANCE_REQ")) %>';  //9NT1620_FCUBS_12.0.3_INTERNAL_18325754       
			  var amountBasedSV  =   '<%= StringEscapeUtils.escapeJavaScript((String)BranchParam.getInstance().getCacheFBTBParams(fbContext).get("AMOUNT_BASED_SV")) %>';  //12.1_SV_Changes
            var CSRFtoken           =   '<%= StringEscapeUtils.escapeJavaScript(CSRFtoken)%>';/*10.5.2 CSRFTOKEN changes*/
            var FCJ_Stream          =   '<%= StringEscapeUtils.escapeJavaScript(release_type)%>';
            var curr_user           =   '<%= StringEscapeUtils.escapeJavaScript(curr_user) %>';    
            var expirymsgdate       =   '<%= StringEscapeUtils.escapeJavaScript(uc.getExpDate())%>';
            var licensemsg          =   '<%= StringEscapeUtils.escapeJavaScript(licensemsg) %>'; 
            var popupalert          =   '<%= StringEscapeUtils.escapeJavaScript(popupalert) %>';     
            var langISOCode     = '<%= StringEscapeUtils.escapeJavaScript(uc.getLanguageISOCode()) %>';
            var hotkeyFnids     = '<%= StringEscapeUtils.escapeJavaScript(uc.getHotkeyFnids()) %>';
            var hotkeyArray     = new Array();
            if (hotkeyFnids != "")
                hotkeyArray     = hotkeyFnids.split("__");
            var multiBranchOperation         = '<%= StringEscapeUtils.escapeJavaScript(uc.getMultiBranchOperation()) %>';
            var elcmuserId          = '<%= StringEscapeUtils.escapeJavaScript(uc.getElcmUserId()) %>';
			//Fix for 18635762 -User Level Hot Key restriction starts
            var f10_Reqd          = '<%= StringEscapeUtils.escapeJavaScript(uc.getF10Reqd()) %>';
            var f11_Reqd          = '<%= StringEscapeUtils.escapeJavaScript(uc.getF11Reqd()) %>';
            var f12_Reqd          = '<%= StringEscapeUtils.escapeJavaScript(uc.getF12Reqd()) %>';
            //Fix for 18635762 -User Level Hot Key restriction ends
			var countAlerts         = '<%= StringEscapeUtils.escapeJavaScript(uc.getcountAlerts()) %>';
            var userTaskStatusCnt   =   '<%= StringEscapeUtils.escapeJavaScript(userTaskStatusCnt) %>';     
            var autoGenPassReq      = '<%= StringEscapeUtils.escapeJavaScript(uc.getAutoGenPassReq()) %>' ;
            var userAlertCount      = '<%= StringEscapeUtils.escapeJavaScript(uc.getcountAlerts()) %>';
            var elcmMode      = '<%= StringEscapeUtils.escapeJavaScript(uc.getElcmMode()) %>'; //External Function ID Changes
            var ValidateFlag        =   'Y';
            var gOfflineAllowed     =   'N';
            //FCUBS11.1 CROSSBROWSER Changes starts here
            var gTxn = "";
            var gStage = "";
            //FCUBS11.1 CROSSBROWSER Changes ends here

            var ACTIONNEW           =   'New';
            var ACTIONCOPY          =   'Copy';
            var ACTIONSAVE          =   'Save';
            var ACTIONUNLOCK        =   'Unlock';
            var ACTIONCLOSE         =   'Close';
            var ACTIONREOPEN        =   'Reopen';
            var ACTIONDELETE        =   'Delete';
            var ACTIONPRINT         =   'Print';
            var ACTIONSIGNOFF       =   'SignOff';
            var ACTIONEXIT          =   'Exit';
            var ACTIONEXITCURRENTWINDOW = 'ExitCurrWin';
            var ACTIONAUTHORIZE     =   'Authorize'; 
            var ACTIONROLLOVER      =   'Rollover';
            
            var ACTIONDELEGATE      =   'Delegate';
            var ACTIONREVERSE       =   'Reverse';
            var ACTIONCONFIRM       =   'Confirm';
            var ACTIONLIQUIDATE     =   'Liquidate';
            var ACTIONHOLD          =   'Hold';
            var ACTIONTEMPLATE      =   'Template';
            var ACTIONVIEW          =   'View';
            var ACTIONGENERATE      =   'Generate';
            var DebugWindowFlg      =   'N';
            var DebugFlg            =   'N';
            var dbgLoggingRqd       =   'N';//Debug Changes Start
            var DebugStmt           =   '';
            var serverDebugStmt     =   '';
            var debugWindow         =   null;
            var isAuthOpen  	    =   false;
            var isViewAuthOpen 	    =   false;
            var slipopened          =false;
            var branchIdentifier    =   '<%=StringEscapeUtils.escapeJavaScript(branchIdentifier)%>';
            var branchWorkflowFrequency	= '<%=StringEscapeUtils.escapeJavaScript(branchWorkflowFrequency)%>'; //FCUBS11.1 Changes For Auto Refresh
            var reportURL           =   'Reports/BIP/' + LangCode +'/';
            var xmlFileNAME         =   null;
            var gHelpXML            =   null;
            var nodeEdited          =   new Array();
            
            var prevOriginalContent =   "";
            var helpContent         =   null;
            var tabContent          =   null;
            var searchContent       =   null;
            var longTitle           =   "Long Description Editing Section";
            var shortTitle          =   "Short Description Editing Section";
            var nodeValue           =   null;
            var helpFlPath          =   null;
            var prevNodeValue       =   null;
            var domValueLong        =   null;
            var domValueShort       =   null;
            var Authdom             =   null;
            var cacheContent        =   'D'; 
            var Horzbar             =   'Y';
            var Vertbar             =   'Y';
            
            var loginDateLast                  = '<%=StringEscapeUtils.escapeJavaScript(loginDateLast)%>';
            var noOfInvalidLogins              = '<%=StringEscapeUtils.escapeJavaScript(noOfInvalidLogins)%>'; 
            
            
            var auto_auth                      = '<%= StringEscapeUtils.escapeJavaScript(auto_auth) %>';  
            var auth_mesg                      = '<%= StringEscapeUtils.escapeJavaScript(auth_mesg) %>';  
            var eodFunctions	               = '<%=StringEscapeUtils.escapeJavaScript(eodFunctions)%>';
            var branchTrackingFor	           = '<%=StringEscapeUtils.escapeJavaScript(branchTrackingFor)%>'; //FCUBS121DEV_DENOM_TRACKING_BRANCH_LEVEL
            var multiBranchFunctions	       = '<%=StringEscapeUtils.escapeJavaScript(multiBranchFunctions)%>';
            var lovDataFetch                   = '<%=StringEscapeUtils.escapeJavaScript(lovDataFetch)%>';
            var req_Enc_Reqd                   = '<%= StringEscapeUtils.escapeJavaScript(reqEnc_Reqd) %>'; // Login Encryption Changes
            var txnBranch                      = new Array();
            // Changes for formatting number --start
            var gNumberFormatMask              = '<%=StringEscapeUtils.escapeJavaScript(numberFormatMask)%>';
            // Changes for formatting number --end
            var gDebugWindowEnabled               = '<%=StringEscapeUtils.escapeJavaScript(debugWindowReq)%>'//Changes for FE Debug Window
             
            var screenSaverTimeOut=  '<%= StringEscapeUtils.escapeJavaScript(String.valueOf(uc.getUserScrSaverTimeout()))%>' ;/*12.0.2 Screen Saver Changes Start*/
			var gFcjInsulation =  '<%=StringEscapeUtils.escapeJavaScript(fcjInsulation)%>'; //FCJ_INSULATION
			var gCustInfo                      = new Array();
            <%
            //HashMap ucList = BranchUserGlobals.getInstance().getUserGlobalList();
            //HashMap hUcValuesAddon = (HashMap)ucList.get("addonUcList");
            //ASHOK
            if (uc_addon != null) {
                Iterator addonKeyItr = uc_addon.keySet().iterator();
                Iterator addonValueItr = uc_addon.values().iterator();
                while (addonKeyItr.hasNext()){   
                    String ucKey = (String)addonKeyItr.next();
                    String ucValue = (String)addonValueItr.next();
            %>
                    addonGlobals('<%=StringEscapeUtils.escapeJavaScript(ucKey)%>', '<%=StringEscapeUtils.escapeJavaScript(ucValue)%>');
                <%
                }    
                %>   
				
				//Bug_36924146 Changes Starts
                var g_functionModuleMap = new Array();
				function loadModuleMap(functionId,moduleGroupId) {
					g_functionModuleMap[functionId] = new functionModuleMap(functionId,moduleGroupId);
				}
				function functionModuleMap(functionId,moduleGroupId) {
					this.functionId = functionId;
					this.moduleGroupId = moduleGroupId;
				}
			
			<%
                Map functionDetailMap = FCApplicationGlobals.getFunctionDetailMap(entity);
				Iterator it = functionDetailMap.keySet().iterator();
				
			    while(it.hasNext()) {
			        String functionId = (String)it.next();                
                    HashMap menuDetailMap =  (HashMap)functionDetailMap.get(functionId);
				    if(menuDetailMap != null) {
					  String moduleGroupId = (String) menuDetailMap.get("MODULE_GROUP_ID");	
						if(moduleGroupId == null || moduleGroupId.isEmpty()){
						   moduleGroupId = "UNKNOWN";
						}	
			    %>
				    var functionId = "<%=StringEscapeUtils.escapeJavaScript(functionId)%>";
				    var moduleGroupId = "<%=StringEscapeUtils.escapeJavaScript(moduleGroupId)%>";
					loadModuleMap(functionId,moduleGroupId);
			    <%         
			       }
			    }	
			%> 
			    //Bug_36924146 Changes Ends
                function addonGlobals(ucKey, ucValue) {
                    addonGlobal[ucKey] = ucValue;
                }
            <%
            }
            %>
            var SIGNOUT = getItemDesc("LBL_SIGNOUT_DESC");
            var EXIT    = getItemDesc("LBL_EXIT_DESC");
            var g_objCcy = parent.g_objCcy;
            <%
                String amountFormat = BranchParam.getInstance().getCacheFBTBParams(fbContext).get("NLS_NUMERIC_CHARACTERS").toString().trim();
            %>
            var nlsAmountFormat = "<%=StringEscapeUtils.escapeJavaScript(amountFormat)%>";
            var dashboardFuncs  = "<%=StringEscapeUtils.escapeJavaScript(dashboardFuncs)%>";
            var terminalName = '<%=StringEscapeUtils.escapeJavaScript(terminalName)%>';//TERMINAL_NAME_ENH_14.1
            
            function fnLoad(){
            
                if(changeBranch != 'true' && changeDept != 'true' && changeTheme != 'true'){
                    if(loginDateLast =='null'){
                        loginDateLast = "";
                    }            
                }
                isAppGlobalLoaded=true;
                //var d1 = new Date();   
                //var startUp1= "\n --Appglobal end" + d1.getHours() + ":" + d1.getMinutes()+ ":" +d1.getSeconds()+":"+d1.getMilliseconds() ;  
                //alert(startUp1);            
            }
            
            var functionDef = new Array();
            var funcArray = new Array();
            
            function setFunctionDefn(functionId, obj) {
                var len = funcArray.length;
                funcArray[len] = new Object();
                funcArray[len].functionId = obj.functionId;
                funcArray[len].functionDesc = obj.functionDesc;
                funcArray[len].txnLegCash = obj.txnLegCash;
                funcArray[len].ofsLegCash = obj.ofsLegCash;
                funcArray[len].txnCcyField = obj.txnCcyField;
                funcArray[len].txnAmtField = obj.txnAmtField;
                funcArray[len].ofsCcyField = obj.ofsCcyField;
                funcArray[len].ofsAmtField = obj.ofsAmtField;
                funcArray[len].chargeCcyField = obj.chargeCcyField;
                funcArray[len].chargeAmtField = obj.chargeAmtField;
                funcArray[len].chargeCash = obj.chargeCash;
                funcArray[len].fractionalAmtField = obj.chargeCash;
                funcArray[len].fractionalAmtLCYField = obj.fractionalAmtLCYField;
                funcArray[len].fractionalAmtAgainst = obj.fractionalAmtAgainst;
                funcArray[len].tillReqd = obj.tillReqd;
                funcArray[len].offlineSupport = obj.offlineSupport;
                funcArray[len].txnType = obj.txnType;
                funcArray[len].denominationTrackingRequired = obj.denominationTrackingRequired;
                funcArray[len].reversalAllowed = obj.reversalAllowed;
                funcArray[len].adviceReqd = obj.adviceReqd;
                funcArray[len].queryStage = obj.queryStage;				
                funcArray[len].txnSeqReqd = obj.txnSeqReqd;	
                // FCUBS 11.4 InputSlip Changes Starts
                funcArray[len].slipReqd = obj.inputSlipRequired;
                // FCUBS 11.4 InputSlip Changes Ends
                // FCUBS 11.4 Confirmation Changes Starts
                funcArray[len].confirmReqd = obj.confirmRequired;
                funcArray[len].confirmErrType = obj.confirmErrType;
                funcArray[len].confirmMsgCode = obj.confirmMsgCode;
                // FCUBS 11.4 Confirmation Changes Ends
                //9NT1525_120_16066792 Starts
                funcArray[len].amountTag = obj.amountTag;
                funcArray[len].xRate = obj.xRate;
                //9NT1525_120_16066792 Ends
                //12.0.2_Signature_Verification start
                funcArray[len].signVerSupp = obj.signVerSupp;
                funcArray[len].txnAcc = obj.txnAcc;
                funcArray[len].signVerReqd = obj.signVerReqd; 
                //12.0.2_Signature_Verification end
				//12.0.2_single_step_process
                funcArray[len].twoStepProcessing = obj.twoStepProcessing;
                funcArray[len].newFlow = obj.newFlow;
                 //12.0.2_single_step_process
                funcArray[len].ccyTag = obj.ccyTag;  //9NT1587_1203_UCBL_18367369 added
                funcArray[len].authMode = obj.authMode; //9NT1525_1203_RETRO_INTERNAL_18669470 added  
                 //12.1_disabling_call_form_and_exchrate_based_on_workflow starts
                 funcArray[len].exchangeRateAmendable = obj.exchangeRateAmendable; 
                funcArray[len].misAmendable = obj.misAmendable; 
                funcArray[len].udfAmendable = obj.udfAmendable; 
                funcArray[len].chargeAmendable = obj.chargeAmendable; 
                 //12.1_disabling_call_form_and_exchrate_based_on_workflow ends
                 //12.1_multI_auth starts
                funcArray[len].multiAuthReqd  = obj.multiAuthReqd;
                 funcArray[len].sequential = obj.sequential;
                 funcArray[len].amendAfterAuth = obj.amendAfterAuth;   
                  //12.1_multi_auth ends               
				funcArray[len].pMandatory = obj.pMandatory;//Pickupmandatorychanges
				funcArray[len].dupAdviceTrack = obj.dupAdviceTrack; //FCUBS_121DEV_ADVICE_REPRINT_CHANGES
				funcArray[len].pickBtnFields = obj.pickBtnFields;//12.1_Fields_Disabling_changes 
				  //FCUBS_121DEV_REVERSAL_ADV_RED
                funcArray[len].reversalAdviceRequired = obj.reversalAdviceRequired;
                funcArray[len].reversalOnlineadviceName = obj.reversalOnlineadviceName;
                
                  //FCUBS_121DEV_REVERSAL_ADV_RED
		  funcArray[len].decentralizedFlow = obj.decentralizedFlow;//12.1_Decentralized_Changes
                functionDef[functionId] = funcArray[len];
            }   
            var CustomerObj = null;
            function getCustomer(pCustId,pCustName,pCustAddr,pBrnCode){//FCUBS 10.5 STR2 WebBranch Changes
                this.custId = pCustId ;
                this.custName = pCustName;
                this.custAddr = pCustAddr;
                this.brnCode = pBrnCode;//FCUBS 10.5 STR2 WebBranch Changes
                return this;
            }
        
            function setAccountDetails(pAccountNumber) {
                this.accountNumber = pAccountNumber;
                return this;
            }
            function getBpelFunctionIdRights(){
            }
               
        </SCRIPT>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<%--
    </HEAD>
    <BODY onload = "fnLoad()"></BODY>
</HTML>
--%>
