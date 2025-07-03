<%
/*----------------------------------------------------------------------------------------------------
**
** File Name    : MFALOGIN.jsp
**
** Module       : FCJWeb
**
**This source is part of the Oracle Flexcube Universal Banking Software Product. 

**Copyright © 2015 , 2016, Oracle and/or its affiliates.  All rights reserved. 

**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East), 
**Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css

-------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.common.BranchParam"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals" %>
<%@ page import = "com.ofss.fcc.common.FCMessages" %>
<%@ page import = "java.util.Map" %>
<%@ page import="java.util.HashMap"%>
<%@ page import = "java.util.Iterator" %>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 );
    String browserCSS          = (String)session.getAttribute("BROWSER_CSS");
    String jsParser          = (String)session.getAttribute("JS_PARSER");
    String StrUserId         = (String) session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String ieCss         = (String)session.getAttribute("IECSS");
    String lang             = (String)session.getAttribute("LANG");
    String Strlang           = BranchConstants.DEFAULT_LANGCODE;
    String StrlangISO        = (BranchConstants.DEFAULT_LANG_ISOMAP).toLowerCase();
    String branchIdentifier  = BranchConstants.BRANCH_CENTRALIZED;
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");
    FCUserGlobals Objuc = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
    String defaultstyle      = (String) BranchConstants.DEFAULT_STYLE;
    String defaultTheme      = "ExtFlexblue";
    String arrdefaultstyle[] = null;
    arrdefaultstyle          = defaultstyle.split("!");
    int defaultStyleIndex    = -1;
    for(int i = 0; i < arrdefaultstyle.length; i++){
        if(arrdefaultstyle[i].contains("~D")){
            defaultStyleIndex = i;
            defaultTheme = "Ext" + arrdefaultstyle[i].split("~")[0];
            break;
        }
    }
	
    String TerminalId = (String) FCUtility.validateParameter(FCUtility.getCleintIPAddr(request));
      if (StrUserId == null || "".equals(StrUserId)){
          StrUserId = TerminalId;
      }
      String flexcubeUserId = (String)session.getAttribute("USERID");
      String mfaId = (String)session.getAttribute("MFAID");
      FBContext fbContext    = new FBContext(StrUserId);
      BranchLogger brnLogger = new BranchLogger(StrUserId);
      fbContext.setBrnLogger(brnLogger);
      Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+BranchConstants.DEFAULT_LANGCODE + "~" + entity, branchIdentifier,StrUserId);       
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
    
%>

<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISO)%>">
    <head>
      <TITLE><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_FCUBS_MFA_LOGIN"))%></TITLE>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISO)%>">
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <%         
            Iterator itrItemKeys   = itemDescMap.keySet().iterator();
            Iterator itrItemValues = itemDescMap.values().iterator();
                    
            Iterator itrKeys   = null;
            Iterator itrValues = null;
            Map errorBundle    = new HashMap();             
        %>
        <link href="Theme/<%=StringEscapeUtils.escapeURL(defaultTheme)%>.css" rel="stylesheet"  type="text/css"/>
       <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISO)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
        <link href="Theme/ExtFlexNewUI.css" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        
        <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">
         <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
         <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
         <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
        
        <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
          <base target="_parent" />
        <%  
          request.setCharacterEncoding("UTF-8");
          fbContext.getBrnLogger().dbg("MFALOGIN-->Just Entered" );
          fbContext.getBrnLogger().dbg("MFALOGIN-->BranchConstants.DEFAULT_LANGCODE:" + Strlang);
          fbContext.getBrnLogger().dbg("MFALOGIN-->branchIdentifier" +branchIdentifier);
          String mfaPin_blank = (String) itemDescMap.get("LBL_MFAPIN_BLANK");
          String noScriptLabel= (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
        %> 
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/Alert.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/JS/SmmdiFrm.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>    
        <script type="text/javascript" src="Script/JS/MFALOGIN_CUSTOM.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_login.js"></script>
        <script type="text/javascript">
            var alertXML = "";
            var strTheme = '<%= StringEscapeUtils.escapeJavaScript(defaultTheme.substring(3))%>.css';
            var alertType= "";
            var mainWin = window;
            var commonErrors    = new Array();
            var mfaPin_blank = '<%=StringEscapeUtils.escapeJavaScript(mfaPin_blank)%>';
            var flexcubeUserId = '<%=StringEscapeUtils.escapeJavaScript(flexcubeUserId)%>';
            var mfaId = '<%=StringEscapeUtils.escapeJavaScript(mfaId)%>';
            function commonError(errCode, errDesc)  {
                commonErrors[errCode] = errDesc;
            }
            function getCommonErrorList(){
                return commonErrors;	
            }
            <%
                try {
                    errorBundle = (Map)FCMessages.createMessage("smcntrol", null);
                        if(errorBundle != null){
                    itrKeys 	= errorBundle.keySet().iterator();
                    itrValues 	= errorBundle.values().iterator();
                        }
                    while(itrKeys.hasNext()){
                        String errorKey = (String)itrKeys.next();
                            String errorValue   = (String)itrValues.next();
                            if (errorKey.indexOf("~"+lang)>=0) {
                            String errorCode = errorKey.split("~")[0];
                        %>
                                    commonError('<%=StringEscapeUtils.escapeJavaScript(errorCode)%>', '<%=StringEscapeUtils.escapeJavaScript(errorValue)%>');  
                        <%
                        }
                    }
                    
                } catch(Exception e) {
                }
            %>
           
            
            function debugs(msg, value, funcName) {
            }
        </script>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript">
          function submitForm(actionType){ 
              checkMFA();
              document.frmMFALogin.action = "MFALoginValidateServlet?actionType="+actionType;
              document.frmMFALogin.submit();
          }
	
          function displayAlert(){ 
                parent.alertAction = "MFALOGIN";
                var alertXML = fnBuildAlertXML('SM-MFA05', 'E');
                showAlerts(alertXML, 'C');
                parent.gAlertMessage = gAlertMessage;
                return;
            }
            
            function fnCancelAlertWin() {
                    unmask();
                    return false;
            }
        
            function checkMFA(){
              if(document.getElementById("MFA_PIN").value==""){
                    parent.alertAction = "MFAPINBLANK";//Fix for 21254555
                    alertXML = fnBuildAlertXML('','I',mfaPin_blank);
                    //mask();;//Fix for 21254555
                    parent.showAlerts(alertXML,'I');//Fix for 21254555
                    //document.getElementById("MFA_PIN").focus();//Fix for 21254555
                    return false;
                }else {  
                    var mfaId = document.getElementById("MFAUSERID").value;
                    var mfaPin = document.getElementById("MFA_PIN").value;
                    document.getElementById("hdMfaId").value=mfaId;     
                    document.getElementById("hdMfaPin").value=mfaPin;  
                    document.getElementById("MFA_PIN").value="";
                    document.getElementById("MFA_PIN").disabled=true; 
                    parent.isForceClose = false;
                }
            }
    
            function setFocus(){
              document.getElementById("MFA_PIN").focus();
              parent.isForceClose = true;
              try{
                fnPostLoadCustom();                  
              }catch(e){                  
              }
            }
           
      </script>
    </head>
    <BODY onload="setFocus();" oncontextmenu="return false;" ><!-- Fix for 21254555-->
        <div id="DIVif1"  >
    <oj-dialog id="scrollingDialog"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"
                      position.of="window" class="oj-sm-width-1/3" >
   
       
           <DIV   slot=header id="wndtitle" class="oj-dialog-title" >
                <h1 ><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_FCUBS_MFA_LOGIN"))%></h1>            	
            </DIV>
            
            <DIV slot="body" id="wndwidth">
    
          <form class="login-form" method="POST" name="frmMFALogin" action="MFALoginValidateServlet?actionType=validateLogin" onsubmit="return checkMFA();" autocomplete="off">
        <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
                <div id="ResTree"  align="center"> <!-- Fix for 21254555-->
          
                  <label class="LBLinv" for=""></label><input type="hidden" name="fromLogin" value="" />
                  <label class="LBLinv" for="hdMfaId"></label><input id="hdMfaId" type="hidden" name="hdMfaId" value="">
                  <label class="LBLinv" for="hdMfaPin"></label><input id="hdMfaPin" type="hidden" name="hdMfaPin" value="">				
                   <div class="oj-sm-margin-4x-top">
                                 <oj-label-value label-edge="start" label-width="40%">
                                       <oj-label  slot="label" for="MFAUSERID" class="LBLstd"><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_MFA_ID"))%></oj-label>
                                      <div slot="value" class="login-field">
                                      <oj-input-text  id="MFAUSERID"  type="text" name="MFAUSERID"   MAXLENGTH="20" readonly="true"  value='<%=StrUserId%>'  title='<%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_MFA_ID"))%>' label-hintz='<%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_MFA_ID"))%>' />
                                     </div>
                                 </oj-label-value>
                    </div>          
                    <div class="oj-sm-margin-4x-top">
                                 <oj-label-value label-edge="start" label-width="40%">
                                       <oj-label  slot="label" for="MFA_PIN" class="LBLstd"><%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_MFA_PIN"))%></oj-label>
                                     <div slot="value" class="login-field">
                                      <oj-input-password id="MFA_PIN" name="MFA_PIN" type="password" onpaste="return false;" title='<%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_MFA_PIN"))%>' label-hintz='<%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_MFA_PIN"))%>'  maxlength="20" size="15" tabindex="0" value="" />
                    </div>
                                 </oj-label-value>
                  </div>
                    
                    
                    <div id="submit"  >
                       <div class="oj-flex-bar" style="margin-bottom:10px">
                      
                        <div class="oj-sm-margin-4x-top oj-flex-bar-end">
                            <oj-button  class="action-button-primary" chroming="solid"  type="submit" name="submit-mfa" value='<%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_SIGN_IN"))%>' id="fc_sbmit" tabindex="0" accesskey="l">
                                <%=StringEscapeUtils.escapeHTML((String) itemDescMap.get("LBL_SIGN_IN"))%></oj-button>
                </div>
            </div>
          </div>
                
        </form> 
               
            </div>
       
        </oj-dialog>
        </div>
    </BODY>
</html>
