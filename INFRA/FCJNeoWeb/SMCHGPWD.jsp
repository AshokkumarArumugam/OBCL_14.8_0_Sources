<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : SMCHGPWD.jsp
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

-------------------------------------------------------------------------------------------------------- -
*/
%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.FCApplicationGlobals"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals" %>
<%@ page import = "com.ofss.fcc.common.FCMessages" %>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import = "java.util.Map" %>
<%@ page import="java.util.HashMap"%>
<%@ page import = "java.util.Iterator" %>

<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 );     
    String jsParser          = (String)session.getAttribute("JS_PARSER");
    String ieCss         = (String)session.getAttribute("IECSS");
    String StrUserId        = (String) session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String lang             = (String)session.getAttribute("LANG");
    String CSRFtoken        = (String)session.getAttribute("X-CSRFTOKEN");
    String StrlangISOMap     = (String)session.getAttribute("LANGISOMAP");
    String branchIdentifier  = BranchConstants.BRANCH_CENTRALIZED;
    FCUserGlobals Objuc = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
    /* error message fixes*/
    String Strlang           = Objuc.getLangCd();
    /* error message fixes*/    
      /* # BUG 15978732 fixes start */ 
    String strTheme        = FCUtility.validateParameter(request.getParameter("THEME"));
    String fromLogin       = FCUtility.validateParameter(request.getParameter("FROMLOGIN"));
    /* # BUG 15978732 fixes end */    
    Map itemDescMap = null;	;//Fix for 17402099
    String oldPwd = Objuc.getOldPasswd(); //12.1_Fortify_Fixes

    String TerminalId = (String) FCUtility.validateParameter(FCUtility.getCleintIPAddr(request));
    if (StrUserId == null || "".equals(StrUserId)){
        StrUserId = TerminalId;
    }
            
    FBContext fbContext    = new FBContext(StrUserId);
    //Fix for 17259422 start
    //Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+BranchConstants.DEFAULT_LANGCODE, branchIdentifier,StrUserId);
    //Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+lang, branchIdentifier,StrUserId);
	 if("NO".equals(branchIdentifier)) {
        itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+lang + "~" + entity, branchIdentifier,StrUserId);
			}
			else{
        itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, null,StrUserId);//Fix for 17402099
                        }
    //Fix for 17259422 end
    String browserCSS      = (String) session.getAttribute("BROWSER_CSS");
    /*17245864 bug fixes start*/
    String responseXML       = FCUtility.validateAlertParameter((request.getParameter("CHANGEPASSWORDRESPONSE")));  
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
    if("SUCCESS".equalsIgnoreCase(responseXML) && "TRUE".equalsIgnoreCase(fromLogin)){
    session.invalidate();
    }
    /*17245864 bug fixes end*/    

    String chgPwd           = (String)itemDescMap.get("LBL_CHANGE_PASS");
    String oldPwdMsg        = (String)itemDescMap.get("LBL_ENTER_OLD_PASSWD");
    String newPwdMsg        = (String)itemDescMap.get("LBL_ENTER_NEW_PASSWD");
    String newConfirmPwdMsg = (String)itemDescMap.get("LBL_CONFIRM_NEW_PASSWD");
    String save             = (String)itemDescMap.get("LBL_ACTION_SAVE");
    String cancel           = (String)itemDescMap.get("LBL_CANCEL");
    String noScriptLabel    = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");

    String oldPass          = (String)itemDescMap.get("LBL_OLD_PWD");
    String newPass          = (String)itemDescMap.get("LBL_NEW_PWD");
    String newConfirmPass   = (String)itemDescMap.get("LBL_NEW_PWD_CONFIRM");
    String passChanged      = (String)itemDescMap.get("LBL_PWD_CHANGED"); 
    String relogin              = (String)itemDescMap.get("LBL_RELOGIN"); 
    String conchar              = (String)itemDescMap.get("LBL_CONCHAR_PASSWORD_NUM"); 
    String minPwdNumeric        = (String)itemDescMap.get("LBL_MIN_PWD_NUMERIC"); 
    String minPwdAlpha          = (String)itemDescMap.get("LBL_MIN_PWD_ALPHA"); 
    String documentTitle        = (String)itemDescMap.get("LBL_CHANGE_PASS");
    String saveLabel            = (String)itemDescMap.get("LBL_ACTION_SAVE");
    String cancelLabel          = (String)itemDescMap.get("LBL_CANCEL");
    String enterOldPasswd       = (String)itemDescMap.get("LBL_ENTER_OLD_PASSWD");
    String enterNewPasswd       = (String)itemDescMap.get("LBL_ENTER_NEW_PASSWD");
    String confirmNewPasswd     = (String)itemDescMap.get("LBL_CONFIRM_NEW_PASSWD");
    String minSplChar           = (String)itemDescMap.get("LBL_MIN_SPL_CHAR");
    String maxSplChar           = (String)itemDescMap.get("LBL_MAX_SPL_CHAR");
    String maxPwdNumeric        = (String)itemDescMap.get("LBL_MAX_PWD_NUMERIC");
    String maxPwdAlpha          = (String)itemDescMap.get("LBL_MAX_PWD_ALPHA");
    String mandatory            = (String)itemDescMap.get("LBL_INFRA_MANDATORY");
    String imgPath              = "Images/"+strTheme.substring(0,strTheme.indexOf("."));
    String loginEnc_Reqd        = FCApplicationGlobals.getreqEnc_Reqd(); // Login Encryption Changes
    
%>
<HTML lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <HEAD>
        <TITLE><%=StringEscapeUtils.escapeHTML(chgPwd)%></TITLE>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
         <%         
            Iterator itrItemKeys   = itemDescMap.keySet().iterator();
            Iterator itrItemValues = itemDescMap.values().iterator();
                    
            Iterator itrKeys   = null;
            Iterator itrValues = null;
            Map errorBundle    = new HashMap();             
         %>
        <script type="text/javascript">
            var mainWin                = window;
            var alertType              = "";
            var strTheme               = '<%= StringEscapeUtils.escapeJavaScript(strTheme)%>';
                    var min_pwd_length         = <%= StringEscapeUtils.escapeJavaScript(String.valueOf(Objuc.getMinPwdLength()))%>;
                    var max_pwd_length         = <%= StringEscapeUtils.escapeJavaScript(String.valueOf(Objuc.getMaxPwdLength()))%>;
                    var min_pwd_alpha_length   = <%= StringEscapeUtils.escapeJavaScript(String.valueOf(Objuc.getMinPwdAlphaLength()))%>;
                    var max_pwd_alpha_length   = <%= StringEscapeUtils.escapeJavaScript(String.valueOf(Objuc.getMaxPwdAlphaLength()))%>;
                    var min_pwd_numeric_length = <%= StringEscapeUtils.escapeJavaScript(String.valueOf(Objuc.getMinPwdNumericLength()))%>;
                    var max_pwd_numeric_length = <%= StringEscapeUtils.escapeJavaScript(String.valueOf(Objuc.getMaxPwdNumericLength()))%>;
                    var max_spl_char_length    = <%= StringEscapeUtils.escapeJavaScript(String.valueOf(Objuc.getMaxSplCharLength()))%>;
                    var min_spl_char_length    = <%= StringEscapeUtils.escapeJavaScript(String.valueOf(Objuc.getMinSplCharLength()))%>;
                    var conchar_pwd_num        = <%= StringEscapeUtils.escapeJavaScript(String.valueOf(Objuc.getConcharPwdNum()))%>; 
                    var pwdHasCaps             = '<%= StringEscapeUtils.escapeJavaScript(Objuc.getPwdHasCaps())%>';
                    var curr_user              = '<%= StringEscapeUtils.escapeJavaScript(StrUserId) %>';
                    var oldPwdMsg              = '<%=StringEscapeUtils.escapeJavaScript(oldPass)%>';
                    var newPwdMsg              = '<%=StringEscapeUtils.escapeJavaScript(newPass)%>';
                    var newConfirmPwdMsg       = '<%=StringEscapeUtils.escapeJavaScript(newConfirmPass)%>';
                    var pwdChangedMsg          = '<%=StringEscapeUtils.escapeJavaScript(passChanged)%>';
                    var reLoginMsg             = '<%=StringEscapeUtils.escapeJavaScript(relogin)%>';
                    var concharMsg             = '<%=StringEscapeUtils.escapeJavaScript(conchar)%>';
                    var minPwdNumericMsg       = '<%=StringEscapeUtils.escapeJavaScript(minPwdNumeric)%>';
                    var minPwdAlphaMsg         = '<%=StringEscapeUtils.escapeJavaScript(minPwdAlpha)%>'; 
                     var oldPwd = '<%= StringEscapeUtils.escapeJavaScript(oldPwd)%>'; //12.1_Fortify_Fixes
                    /*Additional validation for password */
                    var minSplCharMsg         = '<%=StringEscapeUtils.escapeJavaScript(minSplChar)%>';
                    var maxSplCharMsg       = '<%=StringEscapeUtils.escapeJavaScript(maxSplChar)%>';
                    var maxPwdNumericMsg    = '<%=StringEscapeUtils.escapeJavaScript(maxPwdNumeric)%>';
                    var maxPwdAlphaMsg         = '<%=StringEscapeUtils.escapeJavaScript(maxPwdAlpha)%>';
                    var fromLogin              = '<%=StringEscapeUtils.escapeJavaScript(fromLogin)%>';
                    var CSRFtoken              = '<%=StringEscapeUtils.escapeJavaScript(CSRFtoken)%>';
                    var loginEnc_Reqd            =  '<%= StringEscapeUtils.escapeJavaScript(loginEnc_Reqd)%>'; // Login Encryption Changes
                    
        </script>
           <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
           <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <!--<script type="text/javascript" src="Script/JS/Alert.js"></script>--><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <!--<script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script>--><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        
        <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_misc.js"></script>
        
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
           <%-- Security bug SEC-12-Patch-081 fixes starts  --%> 
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
           <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
        <!--HTML5 Changes Start-->
        <!--
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
         <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css" />
         <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
         <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
         <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
         
        <script type = "text/javascript">
                var commonErrors    = new Array();
                function commonError(errCode, errDesc)  {
                    commonErrors[errCode] = errDesc;
                }
                function getCommonErrorList(){
                    return commonErrors;	
                }
            <%
                try {
                        errorBundle = (Map)FCMessages.createMessage("COMMON", null);
                        if(errorBundle != null){
                            itrKeys 	= errorBundle.keySet().iterator();
                            itrValues 	= errorBundle.values().iterator();    
                        }
                    while(itrKeys.hasNext()){
                        String errorKey = (String)itrKeys.next();
                            String errorValue = (String)itrValues.next();
                        if(errorKey.indexOf("~"+Strlang+"~"+entity)  >= 0){//Fix for 22921967 
                            String errorCode = errorKey.split("~")[0];
                            %>
                                commonError('<%=StringEscapeUtils.escapeJavaScript(errorCode)%>', '<%=StringEscapeUtils.escapeJavaScript(errorValue)%>');  
                            <%
                        }
                    }
                        %>
                        <%
                    errorBundle = (Map)FCMessages.createMessage("smcntrol", null);
                        if(errorBundle != null){
                    itrKeys 	= errorBundle.keySet().iterator();
                    itrValues 	= errorBundle.values().iterator();
                        }
                    while(itrKeys.hasNext()){
                        String errorKey = (String)itrKeys.next();
                            String errorValue   = (String)itrValues.next();
                            if (errorKey.indexOf("~"+lang+"~"+entity)>=0) {//Fix for 22921967 
                            String errorCode = errorKey.split("~")[0];
                        %>
                                    commonError('<%=StringEscapeUtils.escapeJavaScript(errorCode)%>', '<%=StringEscapeUtils.escapeJavaScript(errorValue)%>');  
                        <%
                        }
                    }
                    errorBundle = (Map)FCMessages.createMessage("SMRESPWD",null);
                        if(errorBundle != null){
                    itrKeys = errorBundle.keySet().iterator();
                    itrValues = errorBundle.values().iterator();
                        }                 
                        
                    while(itrKeys.hasNext()){
                        String errorKey = (String)itrKeys.next();
                        String errorValue = (String)itrValues.next();
                        if (errorKey.indexOf("~"+lang+"~"+entity)>=0) {//Fix for 22921967 
                            String errorCode = errorKey.split("~")[0];
                        %>
                                commonError('<%=StringEscapeUtils.escapeJavaScript(errorCode)%>', '<%=StringEscapeUtils.escapeJavaScript(errorValue)%>');  
                        <%
                        }
                    }
                } catch(Exception e) {
                }
            %>
            function fnHandleChgPwd(e){            
                var e = window.event || e;
                if(e.keyCode == 27){
                    closePwdScreen();
                    return false;
                }
                return true;
            }
            function debugs(msg, value, funcName) {
            }
			function setWindowWidth(){
				 document.getElementById("contentDiv").style.width = screen.availWidth / 3 + "px";
			}
        </script>
    </HEAD>
    <%-- 17245864 bug fixes start --%>
    <BODY onload="chkErrorOnPwdScreen('<%=StringEscapeUtils.escapeJavaScript(responseXML)%>')"  oncontextmenu="return false;"  onkeydown="return fnHandleChgPwd(event);">
     <div id="DIVif1" >
     <oj-dialog id="scrollingDialog"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"
                      position.of="window" class="oj-sm-width-1/3" >
   
       
           <DIV   slot=header id="wndtitle" class="oj-dialog-title" >
                <h1 ><%=StringEscapeUtils.escapeHTML(chgPwd)%></h1>            	
            </DIV>
            
            <DIV slot="body" id="wndwidth">
            <div id="ResTree" >
        <% if ("false".equalsIgnoreCase(fromLogin)) {%>
        <form  method="POST" action="PasswordResetServlet?login=false&actionType=ChgPwd" name="changePwd" onsubmit="return chkSavePwdScreen()" autocomplete="off">      
        <%} else {%>
         <form  method="POST" action="PasswordResetServlet?login=true&actionType=ChgPwd" name="changePwd" onsubmit="return chkSavePwdScreen()" autocomplete="off">
        <%}%>
       <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
        <%-- 17245864 bug fixes end --%>
       
                
                    <label class="LBLinv" for=""></label><input type="hidden" name="fromLogin" value="" />
                    <div  id="contentDiv"><br>
                        
                        <div class="oj-sm-margin-4x-top">
                                 <oj-label-value label-edge="start" label-width="40%">
                                       <oj-label  slot="label" for="oldpwd"><%=StringEscapeUtils.escapeHTML(oldPwdMsg)%></oj-label>
                                      <div slot="value" class="login-field">
                                      <oj-input-password slot="value"  NAME="oldpwd" ID="oldpwd" SIZE="15" MAXLENGTH="20" value="" onpaste ="return false;" onkeydown="return fnHandleScreenBtn(event)"/>
                                      </div>
                                 </oj-label-value>
                       </div>
                       <div class="oj-sm-margin-4x-top">
                                 <oj-label-value label-edge="start" label-width="40%">
                                       <oj-label  slot="label"  for="newpwd"><%=StringEscapeUtils.escapeHTML(newPwdMsg)%></oj-label>
                                       <div slot="value" class="login-field">
                                      <oj-input-password slot="value"  TYPE="password" NAME="newpwd" id="newpwd" SIZE="15" MAXLENGTH="20" value="" onpaste ="return false;"/>
                                       </div>
                                 </oj-label-value>
                       </div>
                       <div class="oj-sm-margin-4x-top">
                                 <oj-label-value label-edge="start" label-width="40%">
                                       <oj-label  slot="label" for="confnew"><%=StringEscapeUtils.escapeHTML(newConfirmPwdMsg)%></oj-label>
                                      <div slot="value" class="login-field">
                                      <oj-input-password slot="value"  TYPE="password" id="confnew" NAME="confnew" SIZE="15" MAXLENGTH="20" value="" onpaste ="return false;" />
                </div>                
                                 </oj-label-value>
            </div>
                        
                        <br>
                        <hr style="clear:both; width:95%">
                        
                         <div class="oj-flex-bar" style="margin-bottom:10px">
                            <label class="LBLstd" for="confnew">&nbsp;</label>
                                 <div class="oj-sm-margin-4x-top1 oj-flex-bar-end">
                               
                                    <oj-button id="BTN_CANCEL" value="<%=StringEscapeUtils.escapeHTML(cancel)%>" on-oj-action="[[function() {closePwdScreen()}.bind(null)]]" name= <%=StringEscapeUtils.escapeHTML(cancel)%>   >
                              
                                        <%=StringEscapeUtils.escapeHTML(cancel)%></oj-button>&nbsp;
                      <div>
                                    <oj-button  class="action-button-primary" chroming="solid" id="BTN_SAVE" type="submit" value="<%=StringEscapeUtils.escapeHTML(save)%>"   onkeydown="return fnHandleScreenBtn(event)" name=<%=StringEscapeUtils.escapeHTML(save)%>  >
                                         <%=StringEscapeUtils.escapeHTML(save)%></oj-button>
                    </div>
                </div>
            </div>
        </div>
            
        
        <%-- 17245864 bug fixes start --%>
        </form> 
                </div>      

        
        <%-- 17245864 bug fixes end --%>   
           </div>
        
        </oj-dialog>
    </div>
    </BODY>
</HTML>
