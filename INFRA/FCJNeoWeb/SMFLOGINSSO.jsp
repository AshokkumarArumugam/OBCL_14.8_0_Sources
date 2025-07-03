<%
/*----------------------------------------------------------------------------------------------------
**
** File Name    : SMFLOGINSSO.jsp
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
**
**  Modified By   : Ambika Selvaraj
**  Modified On   : 03-Oct-2017
**  Description   : Changes done to sync the code as in SMFLOGIN.jsp in order to fetch proper error when the session is expired. 
					In addition, password related field are commented/ visibility is hiddden since this field is not applicable for SSO login. 
**  Retro Source  : 9NT1606_12_1_SYGNITY_S.A.
**  Search String : NA

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css

-------------------------------------------------------------------------------------------------------- 
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.common.BranchParam"%>
<!--//Bug#24908374 LOGIN Label Changes Start //-->
<%@ page import="com.ofss.fcc.common.FCApplicationGlobals"%>
<!--//Bug#24908374 LOGIN Label Changes End //-->
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.List"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    response.addHeader("X-FRAME-OPTIONS", "DENY");
    response.setHeader("X-CONTENT-TYPE-OPTIONS", "nosniff");/*Fix for 25151882 */
    /*Fix for 19435338 starts*/
    String jsParser = ""; 
    String userAgent = request.getHeader("USER-AGENT").toUpperCase();
    if(userAgent.indexOf("MSIE ") != -1 || (userAgent.indexOf("TRIDENT") != -1 && userAgent.indexOf("RV") != -1)) {
        jsParser = "BROWSER_IE.js";
    } else {
        jsParser = "BROWSER_NonIE.js";
    }
    //String jsParser          = (String)session.getAttribute("JS_PARSER");
    /*Fix for 19435338 ends*/
    String browserCSS          = (String)session.getAttribute("BROWSER_CSS");
    String StrUserId         = (String) session.getAttribute("USERID");
    String ieCss         = (String)session.getAttribute("IECSS");
    String Strlang           = BranchConstants.DEFAULT_LANGCODE;
    String StrlangISO        = (BranchConstants.DEFAULT_LANG_ISOMAP).toLowerCase();
    String branchIdentifier  = BranchConstants.BRANCH_CENTRALIZED;
    boolean isDebug          = BranchConstants.SINGLETON_DEBUG;  
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");
    String entity = session.getAttribute("ENTITY")!=null?(String)session.getAttribute("ENTITY"):"";
    String isValidSession = (String)session.getAttribute("IsAuthenticated");  //9NT1606_14_1_RETRO_12_3_28114454   
    
    
    //SMSStandalone12.3 Changes starts
    if(("".equals((entity)))&& "Y".equals(branchIdentifier)){
        entity="SMS";
    }
    //SMSStandalone12.3 Changes ends
    String multiEntity = BranchConstants.MULTI_ENTITY;
    List entityList = BranchConstants.ENTITY_LIST;
    int entityNo = BranchConstants.ENTITY_NOS;
    /*R4Citi MFA changes start */
    String mfaEnabled          = (String)session.getAttribute("MFAENABLED");
    String mfaId = "";
    if("Y".equalsIgnoreCase(mfaEnabled))
      mfaId = (String)session.getAttribute("MFAID");
    /*R4Citi MFA changes end */
    
    String defaultstyle      = (String) BranchConstants.DEFAULT_STYLE;
    String defaultTheme      = "ExtFlexblue";
    String arrdefaultstyle[] = null;
    arrdefaultstyle          = defaultstyle.split("!");
    String extlogin          = BranchConstants.EXT_USERLOGIN;    //LDAP_POC_Changes
    int defaultStyleIndex    = -1;
    for(int i = 0; i < arrdefaultstyle.length; i++){
        if(arrdefaultstyle[i].contains("~D")){
            defaultStyleIndex = i;
            defaultTheme = "Ext" + arrdefaultstyle[i].split("~")[0];
            break;
        }
    }
    
    String TerminalId = (String) FCUtility.getCleintIPAddr(request);
    if (StrUserId == null || "".equals(StrUserId)){
    /* # BUG 14278984 fixes start */  
        //StrUserId = "PRE-Login";
        StrUserId = "Client";
        /* # BUG 14278984 fixes end */  
    }
%>
<html class="loginHtml" lang="<%=StringEscapeUtils.escapeHTML(StrlangISO)%>">
    <head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta http-equiv="Content-Language" content="<%=StringEscapeUtils.escapeHTML(StrlangISO)%>"/>
        <meta http-equiv="cache-control" content="no-cache"/>
        <meta http-equiv="Pragma" content="no-cache"/>
        <meta http-equiv="Expires" content="0"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
		 <link rel="SHORTCUT ICON" href="data:;base64,="/><!-- citi ui change-->
        <link href="Theme/<%=StringEscapeUtils.escapeURL(defaultTheme)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/ExtFlexNewUI.css" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISO)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
       
        <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">
         <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
            <link href="Script/css/login.css" rel="stylesheet" type="text/css"/>
        <!--<style type="text/css"> html {display:none}</style>--><!--HTML5 Changes-->
        <!--HTML5 Changes Start-->
        <!--<style type="text/css">
                html {
                    display: none
                }
            </style>--><!--HTML5 Changes End-->
        <!--HTML5 Changes Start-->
        <style type="text/css">
                html {
                    display: none
                }
            </style><!--HTML5 Changes End-->
        <%  
        request.setCharacterEncoding("UTF-8");
        /* # BUG 15978732 fixes start */ 
        String DN              = FCUtility.validateParameter(request.getParameter("DN")); //FCUBS10.0 SSO
        /* # BUG 15978732 fixes end */ 
        
  //  FBContext fbContext    = new FBContext(TerminalId);
//    BranchLogger brnLogger = new BranchLogger(TerminalId);
    /* # BUG 14278984 fixes start */  
	FBContext fbContext = new FBContext("Client");
    BranchLogger brnLogger = new BranchLogger("Client");
    /* # BUG 14278984 fixes end */  
        fbContext.setBrnLogger(brnLogger);
        fbContext.setEntityName(entity);
        fbContext.getBrnLogger().dbg("SMFLOGIN-->Entity =="+entity );
        Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+BranchConstants.DEFAULT_LANGCODE+"~"+entity, branchIdentifier,StrUserId);
        Map releaseMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"RELEASE_VERSION~~"+entity, branchIdentifier,StrUserId);
        if(itemDescMap == null){
            fbContext.getBrnLogger().dbg("SMFLOGIN-->Item description from entity map is null, getting from properties file");
            itemDescMap = BranchConstants.LABEL_MAP;
       }
       fbContext.getBrnLogger().dbg("SMFLOGIN-->Title :"+(String)itemDescMap.get("LBL_FCUBS_TITLE"));
       if(releaseMap == null){
            releaseMap = BranchConstants.RELEASE_MAP;
       }
        String title = null;
        if ("FGL".equalsIgnoreCase(BranchConstants.APPLICATION_NAME)) {
            title = (String)itemDescMap.get("LBL_FCUBSFGL_TITLE") + releaseMap.get("RELEASE") + itemDescMap.get("LBL_FCUBS_LOGIN");
        } else if ("FCIS".equalsIgnoreCase(BranchConstants.APPLICATION_NAME)){
            title = (String)itemDescMap.get("LBL_FCIS_TITLE") + (String)releaseMap.get("RELEASE") + itemDescMap.get("LBL_FCUBS_LOGIN");//21030102 
        } else {
            title = (String)itemDescMap.get("LBL_FCUBS_TITLE") + releaseMap.get("RELEASE") + itemDescMap.get("LBL_FCUBS_LOGIN");
        }
        %>
        <title>
            <%=StringEscapeUtils.escapeHTML(title)%>
        </title>
        <%  
           /* # BUG SEC-12-Patch-047 fixes start */
        //String l_seskey = (String) session.getAttribute("sessionkey");
           /* # BUG SEC-12-Patch-047 fixes end */
        String branchServletLocation = "ValidateLoginServlet";
        fbContext.getBrnLogger().dbg("SMFLOGIN-->Just Entered" );
        //Auto Clear User Changes
        String errcodes = (String) request.getAttribute("errcodes");
        String err_code = (String) request.getAttribute("err_code");
        fbContext.getBrnLogger().dbg("SMFLOGIN-->errcodes=" + errcodes);
        fbContext.getBrnLogger().dbg("SMFLOGIN-->err_code=" + err_code);
        
        fbContext.getBrnLogger().dbg("SMFLOGIN-->BranchConstants.DEFAULT_LANGCODE:" + Strlang);
        fbContext.getBrnLogger().dbg("SMFLOGIN-->branchIdentifier" +branchIdentifier);
        String blankUserId        = (String) itemDescMap.get("LBL_BLANK_UID");
        String blankPwd      = (String) itemDescMap.get("LBL_BLANK_PWD");
        String blankEntity        = (String) itemDescMap.get("LBL_BLANK_ENTITY");
        String ssoReq             = BranchConstants.SSO_REQD;
        String loginProperChannel = (String) itemDescMap.get("LBL_LOGIN_PROP_CHNL");
        fbContext.getBrnLogger().dbg("SMFLOGIN-->After getting values from cache" );
        fbContext.getBrnLogger().dbg("SMFLOGIN-->BranchConstants.DEFAULT_STYLE"  +defaultstyle);
           
        String  displayNoticeErorCode="";
        if(errcodes==null) {
            fbContext.getBrnLogger().dbg("SMFLOGIN-->inside if for errcodes null"  +errcodes);
            displayNoticeErorCode="Y";
        } else{
            displayNoticeErorCode="N";
        }
        String displayLegalNotice = "";
        String legalNotice = "";
        String displayNotice = "";
        String tmpEntity = "";
        if ("N".equals(multiEntity)) {
            displayLegalNotice = (String)BranchParam.getInstance().getCacheFBTBParams(fbContext).get("DISPLAY_LEGAL_NOTICE");
            fbContext.getBrnLogger().dbg("SMFLOGIN-->displayLegalNotice"  + displayLegalNotice);
            legalNotice = (String)BranchParam.getInstance().getCacheFBTBParams(fbContext).get("LEGAL_NOTICE") ;
            fbContext.getBrnLogger().dbg("SMFLOGIN-->LEGAL_NOTICE"  + legalNotice);
            if (legalNotice !=null && !legalNotice.equals("")) {
                //displayNotice=legalNotice.replaceAll("\n","<BR>");
                displayNotice=legalNotice.replaceAll("\n","__LineBreak__");
            }
        }
        String debugString     = fbContext.getBrnLogger().getLogString();
        session.setAttribute("DBGSTRING", debugString);
        
    //Bug#24908374 LOGIN Label Changes Start //
        String applicationName = "";
        if("FCPMTS".equals(FCApplicationGlobals.getAPPLICATION_EXT()))
            applicationName =(String) itemDescMap.get("LBL_FCPMTS");
        else if("FCCPLN".equals(FCApplicationGlobals.getAPPLICATION_EXT()))
            applicationName =(String) itemDescMap.get("LBL_FCCPLN");
        else if("FCROFC".equals(FCApplicationGlobals.getAPPLICATION_EXT()))
            applicationName =(String) itemDescMap.get("LBL_FCROFC");
        else if("FCELCM".equals(FCApplicationGlobals.getAPPLICATION_EXT()))
            applicationName =(String) itemDescMap.get("LBL_FCELCM");
        else
            applicationName =(String) itemDescMap.get("LBL_LOGINPAGE_TITLE");
    //Bug#24908374 LOGIN Label Changes Ends //
        /* # BUG 14278984 fixes start */  
      
        //if(!"PRE-Login".equalsIgnoreCase(StrUserId))
      if(!"Client".equalsIgnoreCase(StrUserId))
            fbContext.getBrnLogger().flush(StrUserId);
     
        /* # BUG 14278984 fixes end */  
        
        String noScriptLabel= (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
        %>
        <%-- Security bug SEC-12-Patch-081 fixes starts--%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script>
    </head>
    <noscript>
        <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
    </noscript>
    <%-- Security bug SEC-12-Patch-081 fixes ends--%>
    <script type="text/javascript" src="Script/JS/Alert.js"></script>
    <noscript>
        <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
    </noscript>
    <script type="text/javascript" src="Script/JS/SmmdiFrm.js"></script>
    <noscript>
        <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
    </noscript>
    <%-- FCUBS11.1 CROSSBROWSER Changes starts here--%>
    <script type="text/javascript" src="Script/JS/TaskList.js"></script>
    <noscript>
        <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
    </noscript>
    <%-- FCUBS11.1 CROSSBROWSER Changes ends here--%>
    <script type="text/javascript" src="Script/JS/CcyDenomUtil.js"></script>
    <noscript>
        <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
    </noscript>
    <script type="text/javascript" src="Script/JS/GlobalConstants.js"></script>
    <noscript>
        <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
    </noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script>
    <noscript>
        <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
    </noscript>
    <script type="text/javascript" src="Script/JS/SmhTlBar.js"></script>
    <noscript>
        <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
    </noscript>
    <%-- JS Segregation changes--%>
    <%-- <script type="text/javascript" src="Script/ExtJS/ExtSmhTlBar.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>--%>
    <%-- JS Segregation changes ends--%>
    <script type="text/javascript" src="Script/JS/UserAlerts.js"></script>
    <noscript>
        <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
    </noscript>
    <script type="text/javascript">
      function setHeights() {
          var x, y;
          if (self.innerHeight) {
              x = self.innerWidth;
              y = self.innerHeight;
          }
          else if (document.documentElement && document.documentElement.clientHeight) {
              x = document.documentElement.clientWidth;
              y = document.documentElement.clientHeight;
          }
          else if (document.body) {
              x = document.body.clientWidth;
              y = document.body.clientHeight;
          }
          // document.getElementById("centerdiv").style.marginTop = y/2 - ((document.getElementById("centerdiv").offsetHeight)/2)-59+"px";
          document.getElementById("header").style.width = x + "px";/* Zooming Changes */
          document.getElementById("footer").style.width = x + "px";/* Zooming Changes */
          document.getElementById("footer").style.top = y - ((document.getElementById("footer").offsetHeight)) - 3 + "px";/* Zooming Changes */
          document.getElementById("loginWrapper").style.top = y * 0.41 + "px";/* Zooming Changes */
          document.getElementById("loginWrapper").style.width = x + "px";/* Zooming Changes */
          document.body.style.minWidth = x + "px";/* Zooming Changes */
          document.body.style.minHeight = y + "px";/*Zooming Changes */
      }
    </script>
    <script type="text/javascript">
        if (top == self) {
            document.documentElement.style.display = "block";
        } else {
            top.location.href = "welcome.jsp";
        }
        window.statusbar = 0;
        window.toolbar = 0;
        window.resizeTo(screen.availWidth, screen.availHeight);
        var uidMsg = '<%=StringEscapeUtils.escapeJavaScript(blankUserId)%>';
        var pwdMsg = '<%=StringEscapeUtils.escapeJavaScript(blankPwd)%>';
        var entMsg = '<%=StringEscapeUtils.escapeJavaScript(blankEntity)%>';
        var loginProperChannel = '<%=StringEscapeUtils.escapeJavaScript(loginProperChannel)%>';
        var isForceClose = true;
        var isErrChk = false;
        var isMFAErrChk = false;
        var chgPwd = false;
        var displayNoticeErorCode = '<%=StringEscapeUtils.escapeJavaScript(displayNoticeErorCode)%>';
        var displayLegalNotice = '<%=StringEscapeUtils.escapeJavaScript(displayLegalNotice)%>';
        var legalNotice = '<%=StringEscapeUtils.escapeJavaScript(displayNotice)%>';
        var alertXML = "";
        var err_code = '<%=StringEscapeUtils.escapeJavaScript(err_code)%>';
        var strTheme = '<%= StringEscapeUtils.escapeJavaScript(defaultTheme.substring(3))%>.css';
        /*R4Citi MFA changes start */
        var mfaEnabled = '<%= StringEscapeUtils.escapeJavaScript(mfaEnabled)%>';
        var mfaId = '<%= StringEscapeUtils.escapeJavaScript(mfaId)%>';
        /*R4Citi MFA changes end */
        var multiEntity = '<%= StringEscapeUtils.escapeJavaScript(multiEntity)%>';
        var isValidSession = '<%= StringEscapeUtils.escapeJavaScript(isValidSession)%>'; //9NT1606_14_1_RETRO_12_3_28114454 
        var legalNoticeArray = new Array();
        <%
        for (int i = 0; i < entityNo; i++){
            Map <String, String> entMap = new HashMap<String, String>(3);
            tmpEntity = (String)entityList.get(i);
            fbContext.setEntityName(tmpEntity);
            displayLegalNotice = (String)BranchParam.getInstance().getCacheFBTBParams(fbContext).get("DISPLAY_LEGAL_NOTICE");
            fbContext.getBrnLogger().dbg("SMFLOGIN-->displayLegalNotice"  + displayLegalNotice);
            legalNotice = (String)BranchParam.getInstance().getCacheFBTBParams(fbContext).get("LEGAL_NOTICE") ;
            fbContext.getBrnLogger().dbg("SMFLOGIN-->LEGAL_NOTICE"  + legalNotice);
            if (legalNotice !=null && !legalNotice.equals("")) {
                //displayNotice=legalNotice.replaceAll("\n","<BR>");
                displayNotice=legalNotice.replaceAll("\n","__LineBreak__");
            }
            %>
            setLegalNoticeDet('<%= StringEscapeUtils.escapeJavaScript(tmpEntity)%>', '<%= StringEscapeUtils.escapeJavaScript(displayLegalNotice)%>', '<%= StringEscapeUtils.escapeJavaScript(displayNotice)%>');
            <%
        }
        fbContext.setEntityName(entity);
        %>            
        function setLegalNoticeDet(entity, legalNoticeReqd, displayNotice) {
            legalNoticeArray[entity] = new Object();
            legalNoticeArray[entity].legalNoticeReqd = legalNoticeReqd;
            //legalNoticeArray[entity].legalNotice = legalNotice;
            legalNoticeArray[entity].displayNotice = displayNotice;
        }
        function getLegalNoticeDet(entity) {
            return legalNoticeArray[entity];
        }
        function showLegalNotice(obj) {
            if (obj.value != "") {
                var legalNoticeDet = getLegalNoticeDet(obj.value);
                if (displayNoticeErorCode == 'Y') {
                    if (legalNoticeDet.legalNoticeReqd != 'N' && legalNoticeDet.legalNoticeReqd != 'null') {
                        alertLegalNotice(legalNoticeDet.displayNotice);
                    }
                }
            }
        }
        function alertLegalNotice(message) {
            var labelDesc = "";
            var attr = "I";
            var alertMsgXML = fnBuildAlertXML('', attr, message);
            mask();
            showAlerts(alertMsgXML, attr);
        }
        function fnEnableScreen() {
            document.getElementById("LOGINUSERID").disabled = false; /* HTML5 Changes 6/OCT/2016 */
            //document.getElementById("user_pwd").disabled = false;
            document.getElementById("fc_sbmit").disabled = false;
            var errVal = document.getElementById("errors").value;
            if (errVal == "" || errVal == "null" || errVal == null) {
                document.getElementById("LOGINUSERID").focus(); /* HTML5 Changes 6/OCT/2016 */
            }
            if ('<%= StringEscapeUtils.escapeJavaScript(ssoReq) %>' == "Y") {
                document.getElementById("LOGINUSERID").disabled = true; /* HTML5 Changes 6/OCT/2016 */
                //document.getElementById("user_pwd").disabled = true;
            }
        }
        function CheckUser() {
            var SSO_REQ = '<%= StringEscapeUtils.escapeJavaScript(ssoReq) %>';
            
            if (SSO_REQ == "Y") {
                document.getElementById("LOGINUSERID").value = '<%=StringEscapeUtils.escapeJavaScript(DN)%>'; /* HTML5 Changes 6/OCT/2016 */
            }
            
            if (document.getElementById("LOGINUSERID").value == "") { /* HTML5 Changes 6/OCT/2016 */
                alertXML = fnBuildAlertXML('', 'I', uidMsg);
                mask();
                showAlerts(alertXML, 'I');
                document.getElementById("LOGINUSERID").focus(); /* HTML5 Changes 6/OCT/2016 */
                return false;
            } /*else if (document.getElementById("user_pwd").value == "" && SSO_REQ != "Y") {
                alertXML = fnBuildAlertXML('', 'I', pwdMsg);
                mask();
                showAlerts(alertXML, 'I');
                document.getElementById("user_pwd").focus();
                return false;
            } */
			  else if(multiEntity == "Y" && document.getElementById("IDENT").value == "") {
                alertXML = fnBuildAlertXML('', 'I', entMsg);
                mask();
                showAlerts(alertXML, 'I');
                document.getElementById("IDENT").focus();
                return false;
            } else {
                selCSS = document.getElementById("IDCSS");
                document.getElementById("LOGINUSERID").value = document.getElementById("LOGINUSERID").value.toUpperCase(); /* HTML5 Changes 6/OCT/2016 */
                var userId = document.getElementById("LOGINUSERID").value; /* HTML5 Changes 6/OCT/2016 */
                //var password = document.getElementById("user_pwd").value;
                document.getElementById("hdUserId").value = userId;
                //document.getElementById("hdPassword").value = password;
                //document.getElementById("theme").value = document.getElementById("IDCSS").value;//HTML5 Changes
                //document.getElementById("user_pwd").value = "";
                //document.getElementById("user_pwd").disabled = true;
                document.getElementById("logUser").value = userId;
                document.getElementById("errors").value="";//CPU_JAN17_D_25214120
                if (multiEntity == "Y") {
                  document.getElementById("hdEntity").value = document.getElementById("IDENT").value;
                }
                document.getElementById("font").value = selectedFont;//HTML5 Changes //HTML5 Changes 6/OCT/2016 
                document.getElementById("logintheme").value = selectedTheme;//HTML5 Changes //HTML5 Changes 6/OCT/2016 
                if (typeof(Storage) !== "undefined") {
                    localStorage.logintheme = selectedTheme;//HTML5 Changes //HTML5 Changes 6/OCT/2016
                    localStorage.loginfont = selectedFont;//HTML5 Changes //HTML5 Changes 6/OCT/2016
                }
                isForceClose = false;
                //document.forms[0].submit();
            }
        }

        function CheckUserForSSLEnabled() {
            var SSO_REQ = '<%= StringEscapeUtils.escapeJavaScript(ssoReq)%>';
            if (SSO_REQ == "Y") {
                document.getElementById("LOGINUSERID").value = '<%=StringEscapeUtils.escapeJavaScript(DN)%>'; /* HTML5 Changes 6/OCT/2016 */
            }
            if (document.getElementById("LOGINUSERID").value == "") { /* HTML5 Changes 6/OCT/2016 */
                alertXML = fnBuildAlertXML('', 'I', uidMsg);
                showAlerts(alertXML, 'I');
                document.getElementById("LOGINUSERID").focus(); /* HTML5 Changes 6/OCT/2016 */
            } /*else if (document.getElementById("user_pwd").value == "" && SSO_REQ != "Y") {
                alertXML = fnBuildAlertXML('', 'I', pwdMsg);
                showAlerts(alertXML, 'I');
                document.getElementById("user_pwd").focus();
            }*/ else if(multiEntity == "Y" && document.getElementById("IDENT").value == "") {
                alertXML = fnBuildAlertXML('', 'I', entMsg);
                mask();
                showAlerts(alertXML, 'I');
                document.getElementById("IDENT").focus();
                return false;
            } else {
                selCSS = document.getElementById("IDCSS");
                document.getElementById("LOGINUSERID").value = document.getElementById("LOGINUSERID").value.toUpperCase(); /* HTML5 Changes 6/OCT/2016 */
                //document.getElementById("user_pwd").value = document.getElementById("user_pwd").value;// Ashok -- Password is  case sensitive.
                var userId = document.getElementById("LOGINUSERID").value; /* HTML5 Changes 6/OCT/2016 */
                //var password = document.getElementById("user_pwd").value;
                
                document.getElementById("hdUserId").value = userId;
                //document.getElementById("hdPassword").value = password;
                //document.getElementById("theme").value = document.getElementById("IDCSS").value;//HTML5 Changes
                //document.getElementById("user_pwd").value = "";
                //document.getElementById("user_pwd").disabled = true;
                document.getElementById("logUser").value = userId;
                document.getElementById("errors").value="";//CPU_JAN17_D_25214120
                if (multiEntity == "Y") {
                    document.getElementById("hdEntity").value = document.getElementById("IDENT").value;
                }
                document.getElementById("font").value = selectedFont;//HTML5 Changes //HTML5 Changes 6/OCT/2016 
                document.getElementById("logintheme").value = selectedTheme;//HTML5 Changes //HTML5 Changes 6/OCT/2016 
                if (typeof(Storage) !== "undefined") {
                    localStorage.logintheme = selectedTheme;//HTML5 Changes //HTML5 Changes 6/OCT/2016
                    localStorage.loginfont = selectedFont;//HTML5 Changes //HTML5 Changes 6/OCT/2016
                }
                isForceClose = false;
            }
        }
        var objTimer, intCount = 0;

        function checkErr() {
            window.focus();
            var err = document.getElementById("errors").value;
            var err_code = document.getElementById("err_code").value;
            var SSO_REQ = '<%= StringEscapeUtils.escapeJavaScript(ssoReq) %>';
            if (multiEntity == 'Y') {
                showLegalNotice(document.getElementById("IDENT"));
            } else {
                if (displayNoticeErorCode == 'Y') {
                    if (displayLegalNotice != 'N' && displayLegalNotice != 'null') {
                        alertLegalNotice(legalNotice);
                    }
                }
            }
            fnEnableScreen();
            if (err == "" || err == "null" || err == null) {
                return;
            } else {
                var msgArr = fnBuildMsgArr(err);
                for (var i in msgArr) {
                    err_code = i + "~";
                    err = msgArr[i] + "~";
                }
                err_code = err_code.substring(0, err_code.length - 1);
                err = err.substring(0, err.length - 1);
                var alertXML = fnBuildAlertXML(err_code, 'E', err);
                mask();
                if (err_code == "SM-7008")
                    showAlerts(alertXML, 'I');
                 else if(err_code == "SM-00212") { //Auto Clear User Changes Start
                    showAlerts(alertXML,"C");
                }
                else if(err_code=="SM-00213"){
                    showAlerts(alertXML, 'E');
                }//Auto Clear User Changes End
                else 
                    showAlerts(alertXML, 'E');
                isErrChk = false;//R4Citi MFA change
                isMFAErrChk = true;
                if(err_code == "SM-MFA02" || err_code == "SM-MFA03"){
                    isForceClose = true;
                }
            }
        }
        function reqSignOff() {
            var strFormData = "userId=userId";
            var objHTTP = createHTTPActiveXObject();
            objHTTP.open("POST", "SMSSignOffServlet?actionType=signOff", false);
            objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            objHTTP.setRequestHeader("X-CSRFTOKEN", '<%=StringEscapeUtils.escapeJavaScript(CSRFtoken)%>');
            objHTTP.send(strFormData);
            if (objHTTP.status == 200) {
                var responseXML = objHTTP.responseXML;
                return responseXML;
            }
        }
        function windowCtrl(e) {
            var event = window.event || e;
            if (event.ctrlKey == true || event.keyCode == 112 || event.keyCode == 116) { //Fix for 18921364
                switch (event.keyCode) {
                    case 66:
                    //B = Organize Favourities in IE
                    case 68:
                    //D = Add a Favouritie in IE
                    case 69:
                    //E = Search Web in IE
                    case 70:
                    //F = Find in IE
                    case 72:
                    //H = History in IE
                    case 73:
                    //I = Manage Favourities in IE
                    case 74:
                    //J = Manage Feeds in IE
                    case 76:
                    //L = Open in IE
                    case 78:
                    //N = Open in IE
                    case 79:
                    //O = Open in IE
                    case 80:
                    //P = Print in IE
                    case 82:
                    //R = Refresh in IE
                    case 87:
                    //W = Close window in IE
                    case 112:
                    //F1 = Help
                    case 116:
                    //F5 = Refresh
                        fnDisableBrowserKey(event);
                        preventpropagate(event);
                        try {
                            event.keyCode = 0;
                        }catch (e) {
                        }
                        return false;
                }
            }
            if (event.keyCode == 8) {
                var srcEle = getEventSourceElement(event);
                if (srcEle.id == "" || srcEle.id == "IDCSS") {
                    event.returnValue = false;
                    return false;
                }
            }
        }

      function doUnload() {
          if (isForceClose && !isErrChk && isValidSession != 'Y') { //9NT1606_14_1_RETRO_12_3_28114454 
              var strFormData = "userId=userId";
              var objHTTP = createHTTPActiveXObject();
              objHTTP.open("POST", "SMSSignOffServlet?actionType=signOff", false);
              objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
              objHTTP.setRequestHeader("X-CSRFTOKEN", '<%=StringEscapeUtils.escapeJavaScript(CSRFtoken)%>');
              objHTTP.send(strFormData);
              if (objHTTP.status == 200) {
                  var responseXML = objHTTP.responseXML;
              }
          }
          isErrChk = false;
      }
      //Auto Clear User Changes Start
    function fnLoadClrUsr(){
        var alertWindow = document.getElementById("ifr_AlertWin");
        if(alertWindow==null){
            alertWindow = parent.document.getElementById("ifr_AlertWin");
            strTheme = parent.window.strTheme;
        }
        alertWindow.src = encodeURI("AUTOCLRUSR.jsp?THEME=" + strTheme);
        var alertWinObj = document.getElementById("Div_AlertWin");
        if(alertWinObj == null) {
            alertWinObj = parent.document.getElementById("Div_AlertWin");
        }
        alertWinObj.style.display = "block";
        /*objHTTP = createHTTPActiveXObject();
        objHTTP.open("POST", "fcautoclrusrservlet?actionType=login", true);
        objHTTP.setRequestHeader("Content-Type", "application/xml");
        objHTTP.setRequestHeader("charset", "utf-8");
        objHTTP.setRequestHeader("X-CSRFTOKEN", '<%=StringEscapeUtils.escapeJavaScript(CSRFtoken)%>');
        objHTTP.send(null);*/
    }
    //Auto Clear User Changes End
      function fnLoginUnloadAlert() {
		  /*9NT1606_12_2_RETRO_11_3_23656224*/
				if(gAlertMessage.indexOf("SM-00420") != -1){
                    window.open('','_self').close();
                }
		 /*9NT1606_12_2_RETRO_11_3_23656224 Ends*/
          var err_msg=' <%=StringEscapeUtils.escapeHTML(errcodes)%>'; //Auto Clear User Changes
          if (err_code == 'SM-7008' && chgPwd == false) {
              mask();
              document.getElementById("Div_AlertWin").style.display = "block";
              document.getElementById("ifr_AlertWin").src = "SMCHGPWD.jsp?THEME=" + strTheme + "&FROMLOGIN=true";
              return;
          }else if(err_msg.substring(48,56)=='SM-00212' || err_code.substring(0, err_code.length - 1)=='SM-00213') { //Auto Clear User Changes Start
                fnLoadClrUsr();
                isForceClose = false;
                return;
          }//Auto Clear User Changes End
          /*Citi R4 MFA change start*/
          else if(alertAction == 'MFALOGIN' || err_code == 'SM-MFA03'){
            if(alertAction == 'MFALOGIN')
              fnUpdateMfaLog(mfaId);
            isForceClose = false;
            window.location.href="SMMDIFRM.jsp"; 
            return;
          }else if(err_code == 'SM-MFA02' || err_code == 'SM-MFA06'){
            mask();
            document.getElementById("Div_AlertWin").style.display = "block";
            document.getElementById("ifr_AlertWin").src="MFALOGIN.jsp";
            return;
          }else if(alertAction == 'MFAPINBLANK'){// Fix for 21254555
            mask();
            document.getElementById("Div_AlertWin").style.display = "block";
            document.getElementById("ifr_AlertWin").src="MFALOGIN.jsp";
            return;
          }/*Citi R4 MFA change end*/
          unmask();
          if (err_code == 'SM-7008' || (document.getElementById("errors").value != "" && document.getElementById("errors").value.indexOf("SM-00420")!= -1) || err_code =='SM-MFA04' || err_code =='SM-MFA08') { // Modified for new hook // FCUBS_12.3_RETRO_22749639
              reqSignOff();
              location.href = "LoginServlet";
          } //20900859  
          document.getElementById("LOGINUSERID").focus(); /* HTML5 Changes 6/OCT/2016 */
      }

      function debugs(msg, value, funcName) {
      }
    </script>
    <noscript>
        <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
    </noscript>
    <script type="text/javascript">
    function initOverLabels() {
          if (!document.getElementById)
              return;

          var labels, id, field;

          // Set focus and blur handlers to hide and show 
          // LABELs with 'overlabel' class names.
          labels = document.getElementsByTagName('label');
          for (var i = 0;i < labels.length;i++) {

              if (labels[i].className == 'overlabel') {

                  // Skip labels that do not have a named association
                  // with another field.
                  id = labels[i].htmlFor || labels[i].getAttribute('for');
                  if (!id || !(field = document.getElementById(id))) {
                      continue;
                  }

                  // Change the applied class to hover the label 
                  // over the form field.
                  labels[i].className = 'overlabel-apply';

                  // Hide any fields having an initial value.
                  if (field.value != '') {
                      hideLabel(field.getAttribute('id'), true);
                  }

                  // Set handlers to show and hide labels.
                  field.onfocus = function () {
                      hideLabel(this.getAttribute('id'), true);
                  };
                  field.onblur = function () {
                      if (this.value == '') {
                          hideLabel(this.getAttribute('id'), false);
                      }
                  };
                  field.onkeydown = function () {
                      if (this.value == '') {
                          hideLabel(this.getAttribute('id'), true);
                      }
                  };

                  // Handle clicks to LABEL elements (for Safari).
                  labels[i].onclick = function () {
                      var id, field;
                      id = this.getAttribute('for');
                      if (id && (field = document.getElementById(id))) {
                          field.focus();
                      }
                  };

              }
          }
      };

      function hideLabel(field_id, hide) {
          var field_for;
          var labels = document.getElementsByTagName('label');
          for (var i = 0;i < labels.length;i++) {
              field_for = labels[i].htmlFor || labels[i].getAttribute('for');
              if (field_for == field_id) {
                  //labels[i].style.textIndent = (hide) ? '-1800px' : '0px';
                  //Fix for 17252121 
                  labels[i].className = (hide) ? 'overlabel-apply move' : 'overlabel-apply';//HTML5 Changes
                  return true;
              }
          }
      }
      
/*R4Citi MFA change start */
function checkMFAEnabled(){
  if(typeof(mfaEnabled) != 'undefined' && mfaEnabled == 'Y' && isMFAErrChk != true){
      mask();
      document.getElementById("Div_AlertWin").style.display = "block";
      document.getElementById("ifr_AlertWin").src="MFALOGIN.jsp";
      isForceClose = false;// Fix for 21254555,21455468 
  }
}
      
function fnExitAlertWin(){
   if(alertAction == 'MFALOGIN'){
      mask();
      document.getElementById("Div_AlertWin").style.display = "block";
      document.getElementById("ifr_AlertWin").src="MFALOGIN.jsp";
      return;
    }else { //Auto Clear User Changes
        unmask(); 
    }
}
   

function fnUpdateMfaLog(mfaId) {
    objHTTP = createHTTPActiveXObject();
    objHTTP.open("POST", "MFALoginValidateServlet?actionType=skipLogin&hdMfaId="+mfaId, true);
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", '<%=StringEscapeUtils.escapeJavaScript(CSRFtoken)%>');
    objHTTP.send(null);
    
}
/*R4 Citi MFA change end */
//HTML5 Changes 6/OCT/2016 start
function switchFont(obj, evnt) {
    var ulElem = obj.parentNode;
    for (var i=0;i<ulElem.children.length;i++) {
        ulElem.children[i].className = "";
    }
    obj.className = "selectedFont";
    selectedFont = obj.children[0].getAttribute("fontvalue");
}

function switchTheme(obj, evnt) {
    var ulElem = obj.parentNode;
    for (var i=0;i<ulElem.children.length;i++) {
        ulElem.children[i].className = "";
    }
    obj.className = "selectedTheme";
    selectedTheme = obj.children[0].getAttribute("themevalue");
}
//HTML5 Changes 6/OCT/2016 end
    window.onload = function () {
        setTimeout(initOverLabels, 50);
        checkErr();
        setTimeout(setHeights, 50);
        checkMFAEnabled(); //R4Citi MFA change
        //HTML5 Changes 6/OCT/2016 start
        selectedFont = "M";
        selectedTheme = "L";
        if (typeof(Storage) !== "undefined") {
            if (localStorage.logintheme) {
                selectedTheme = localStorage.logintheme;
                var themeLI = document.getElementById("themeUL").children;
                for (var i=0;i<themeLI.length;i++) {
                    if (selectedTheme == themeLI[i].children[0].getAttribute("themevalue")) {
                        themeLI[i].className = "selectedTheme";
                    } else {
                        themeLI[i].className = "";
                    }
                }
            }
            if (localStorage.loginfont) {
                selectedFont = localStorage.loginfont;
                var fontLI = document.getElementById("fontUL").children;
                for (var i=0;i<fontLI.length;i++) {
                    if (selectedFont == fontLI[i].children[0].getAttribute("fontvalue")) {
                        fontLI[i].className = "selectedFont";
                    } else {
                        fontLI[i].className = "";
                    }
                }
            }
        }//HTML5 Changes 6/OCT/2016 end
    };
    </script>
    <body class="loginBody-main" onkeydown="windowCtrl(event)" oncontextmenu="return false;" onunload="doUnload()">
        <!--HTML5 Changes Start-->
        <div class="header"><!--HTML5 Changes 6/OCT/2016 start-->
            <span class="oracle_tp"></span>
            <span class="rightContainer">
                <span class="fonts">
                    <ul id="fontUL">
                        <li><span class="rTitle"><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_FONTSIZE"))%>:</span></li>
                        <li onclick="switchFont(this, event)"><span class="sFont" fontvalue="S"><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_FONTVALUE"))%></span></li>
                        <li class="selectedFont" onclick="switchFont(this, event)"><span class="mFont" fontvalue="M"><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_FONTVALUE"))%></span></li>
                        <li onclick="switchFont(this, event)"><span class="lFont" fontvalue="L"><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_FONTVALUE"))%></span></li>
                    </ul>
                </span>
                <span class="themes">
                    <ul id="themeUL">
                        <li><span class="rTitle"><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_THEME"))%>:</span></li>
                        <li onclick="switchTheme(this, event)" class="selectedTheme"><span class="CadetGreen" themevalue="L"></span><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_THEME1"))%></li>
                        <li onclick="switchTheme(this, event)"><span class="GlaucouDark" themevalue="C"></span><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_THEME2"))%></li>
                        <li onclick="switchTheme(this, event)"><span class="Sephia" themevalue="D"></span><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_THEME3"))%></li>
                    </ul>
                </span>
            </span>
        </div><!--HTML5 Changes 6/OCT/2016 end-->
        <div class="loginCont">
        <!-- //Bug#24908374 LOGIN Label Changes Start //-->
            <div class="redPatch"><span><%=StringEscapeUtils.escapeHTML(applicationName)%></span>
         <!--//Bug#24908374 LOGIN Label Changes Ends //-->
                <span class="lshadow"></span><!--HTML5 Changes 6/OCT/2016 -->
                <span class="rshadow"></span><!--HTML5 Changes 6/OCT/2016 -->
            </div>
            <form class="login" method="POST" action="LoginValidateServlet?msgType=NONWORKFLOW&amp;actionType=login" name="frmLogin" onsubmit="return CheckUser()" autocomplete="off">
			<label class="LBLinv" for=""></label>
            <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
            <label class="LBLinv" for="hdUserId"></label>
            <input id="hdUserId" type="hidden" name="hdUserId" value=""/>
            <label class="LBLinv" for="hdPassword"></label>
            <input id="hdPassword" type="hidden" name="hdPassword" value=""/>
            <label class="LBLinv" for="hdEntity"></label>
            <input id="hdEntity" type="hidden" name="hdEntity" value=""></input>
            <label class="LBLinv" for="theme"></label>
            <input id="theme" type="hidden" name="theme" value=""/>
            <label class="LBLinv" for="logUser"></label>
            <input id="logUser" type="hidden" name="logUser" value=""/>
            <label class="LBLinv" for="logUser"></label>
            <input type="hidden" id="DBGSTRING" name="DBGSTRING" value=""/>
            <label class="LBLinv" for="errors">
                <%=StringEscapeUtils.escapeHTML(errcodes)%>
            </label>
            <input type="hidden" id="errors" name="errors" value="<%=StringEscapeUtils.escapeHTML(errcodes) %>"/>
            <label class="LBLinv" for="err_code">
                <%=StringEscapeUtils.escapeHTML(err_code)%>
            </label>
            <input type="hidden" id="err_code" name="err_code" value="<%= StringEscapeUtils.escapeHTML(err_code) %>"/>
            <label class="LBLinv" for="font"></label><!--HTML5 Changes-->
            <input id="font" type="hidden" name="font" value="M"/><!--HTML5 Changes-->
            <label class="LBLinv" for="logintheme"></label><!--HTML5 Changes-->
            <input id="logintheme" type="hidden" name="logintheme" value="L"/><!--HTML5 Changes-->
            <div id="username" align="center">
                <label for="LOGINUSERID" class="LBLinv"><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_USER_ID"))%></label><!--HTML5 Changes 6/OCT/2016 -->
                <%if (extlogin.equalsIgnoreCase("N")){%>
                    <input id="LOGINUSERID" type="hidden" name="USERID" title='<%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_USER_ID"))%>' tabindex="0" size="15" maxlength="20" value="" /><!--HTML5 Changes-->
                <%} else {%>
                    <input id="LOGINUSERID" type="hidden" name="USERID" title='<%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_USER_ID"))%>' tabindex="0" size="15" maxlength="30" value="" /><!--HTML5 Changes-->
                <%}%>
            </div>
            <div id="password" align="center">
                <label for="user_pwd" class="LBLinv"><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_LOGIN_PWD"))%></label>
                <input id="user_pwd" name="user_pwd" type="hidden" onpaste="return false;" title='<%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_LOGIN_PWD"))%>' maxlength="35" size="15" tabindex="0" value="" />
            </div>
            <div class="inLDP">
                <%if("Y".equals(multiEntity)) { %>
                <div id="loginEntityDiv" class="rSelect">
                    <label for="IDENT"><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_ENTITY"))%></label>
                    <select class="SELstd" id="IDENT" name="IDENT" onchange="showLegalNotice(this);">
						<option value=''></option>
                        <%for(int i = 0; i < entityNo; i++){
                            String currEntity = (String)entityList.get(i);
                            if(entity.equals(currEntity)){%>
                                <option value='<%=StringEscapeUtils.escapeHTML(currEntity)%>' selected="SELECTED">
                                    <%=StringEscapeUtils.escapeHTML(currEntity)%>
                                </option>
                            <% }else{%>
                                    <option value='<%=StringEscapeUtils.escapeHTML(currEntity)%>'>
                                        <%=StringEscapeUtils.escapeHTML(currEntity)%>
                                    </option>
                            <% }%>
                        <% }%>
                    </select>
                </div>
                <%}%>
            </div>
            <div id="submit" class="loginSubmitBtn">
                <input class="BTNtext" type="submit" name="submit" value='<%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_SIGN_IN"))%>' id="fc_sbmit" tabindex="0" accesskey="l"/><!--HTML5 Changes-->
            </div>
            </form>
        </div>
        <div id="footer" class="loginFooter">
                    <%
           //String copyRights = "Oracle FLEXCUBE Universal Banking <br>   Copyright © 2007, 2012, Oracle and/or its affiliates. All rights reserved.";
            String copyRights = "Copyright © 2017, Oracle and/or its affiliates. All rights reserved.";
		   //Fix for 15896771
            if (BranchConstants.APPLICATION_COPYRIGHTS != null && !BranchConstants.APPLICATION_COPYRIGHTS.equals("")) {
                copyRights = BranchConstants.APPLICATION_COPYRIGHTS;
                //copyRights = copyRights.substring(0, copyRights.indexOf("<br>")).concat((String)releaseMap.get("RELEASE")).concat("<br>").concat(copyRights.substring(copyRights.indexOf("<br>")+4, copyRights.length()));
            }
        %>
                     
                    <%-- Security bug SEC-12-Patch-081 fixes starts--%>
                     
                    <span class="loginCpyText">
                        <%=copyRights%></span>
                     
                    <%-- Security bug SEC-12-Patch-081 fixes ends--%>
                </div>
                <div id="masker" class="masker" style="display:none">
                    <div id="Div_AlertWin" class="showPopUp" style="position:absolute;display:none" onclose="fnLoginUnloadAlert()" oncancel="fnExitAlertWin()"><!--HTML5 Changes-->
                        <iframe id="ifr_AlertWin" class="frames" src="" allowtransparency="true" frameborder="0" scrolling="no"></iframe>
                    </div>
                </div>
            </div>
        </div>
		<!--HTML5 Changes End-->
    </body>
</html>