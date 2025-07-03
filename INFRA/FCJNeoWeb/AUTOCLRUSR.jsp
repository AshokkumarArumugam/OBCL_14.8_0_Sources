<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : AUTOCLRUSR.jsp
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

Copyright © 2017 by Oracle Financial Services Software Limited..
----------------------------------------------------------------------------------------------------
**	Modified By   : 
** 	Modified on   : 
** 	Description   : 
** 	Search String : 

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css
-------------------------------------------------------------------------------------------------------- -
*/
%>
<!DOCTYPE html>
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
    response.addHeader("X-FRAME-OPTIONS", "SAMEORIGIN");
    response.setHeader("X-CONTENT-TYPE-OPTIONS", "nosniff");
    if("Y".equalsIgnoreCase(BranchConstants.SSL_ENABLED)) {
        response.setHeader("Strict-Transport-Security", "max-age=31622400; includeSubDomains"); //Fix for 34025996
    }
    String jsParser          = (String)session.getAttribute("JS_PARSER");
    String StrUserId        = (String) session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String lang             = (String)session.getAttribute("LANG");
    String CSRFtoken        = (String)session.getAttribute("X-CSRFTOKEN");
    String StrlangISOMap     = (String)session.getAttribute("LANGISOMAP");
    String branchIdentifier  = BranchConstants.BRANCH_CENTRALIZED;
  
    String strTheme        = FCUtility.validateParameter(request.getParameter("THEME"));
    Map itemDescMap = null;
    FBContext fbContext    = new FBContext(StrUserId);
    if("NO".equals(branchIdentifier)) {
        itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+lang + "~" + entity, branchIdentifier,StrUserId);
    } else {
        itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+lang + "~" + entity, null,StrUserId);//Fix for 17402099
    }
    String browserCSS       = (String)session.getAttribute("BROWSER_CSS");
    String responseXML      = request.getParameter("CHANGEPASSWORDRESPONSE");  
    String font             = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme       = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
    String autoClrUsrTitle  = (String)itemDescMap.get("LBL_AUTOCLRUSR_TITLE");
    String user_id        = (String)itemDescMap.get("LBL_USER_ID");
    String reEnterPwd       = (String)itemDescMap.get("LBL_PWD_REENTER");
    String ok               = (String)itemDescMap.get("LBL_OK");
    String cancel           = (String)itemDescMap.get("LBL_CANCEL");
    String noScriptLabel    = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String ssoReq             = BranchConstants.SSO_REQD;
    String reqEnc_Reqd             = FCApplicationGlobals.getreqEnc_Reqd(); // Login Encryption Changes
%>
<HTML lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <HEAD>
        <TITLE><%=StringEscapeUtils.escapeHTML(autoClrUsrTitle)%></TITLE>
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
            var curr_user              = '<%= StringEscapeUtils.escapeJavaScript(StrUserId) %>';
            var CSRFtoken              = '<%=StringEscapeUtils.escapeJavaScript(CSRFtoken)%>';
             var ssoReq              = '<%= StringEscapeUtils.escapeJavaScript(ssoReq) %>';
             var reqEnc_Reqd            =  '<%= StringEscapeUtils.escapeJavaScript(reqEnc_Reqd)%>'; // Login Encryption Changes 
             var fromLogin          ="false";
             var closeScrFlag          =false;
                    
        </script>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
       <!-- <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
        <!--<script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> -->
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
        <!--HTML5 Changes Start-->
        <!--OJET CHANGES START  -->
        <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">
        <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
        <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
        <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
        <!--OJET CHANGES END  -->
        <!--
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
    <base target="_parent" />
        <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_autoClrUsr.js"></script>
        <script type = "text/javascript">
            function CheckUser() {
            //debugger;
            
            if(closeScrFlag){
              closeScrFlag=false;
              return false;  
            }
                document.getElementById("userid").value = document.getElementById("userid").value.toUpperCase();
                var userId = document.getElementById("userid").value;
                if(!userId){
                    userId = document.getElementById("userid").rawValue;
                    userId=userId.toUpperCase();
                }
                var password = document.getElementById("newpwd").value;
                if(!password){
                    password = document.getElementById("newpwd").rawValue;
                }
                document.getElementById("hdUserId").value = curr_user;
                document.getElementById("hdPassword").value = password;
                // Login Encryption Changes
                if(reqEnc_Reqd == "Y")
                document.getElementById("hdPassword").value = AESEncrypt(password); 
                document.getElementById("user_pwd").value = "";
                document.getElementById("user_pwd").disabled = true;
                document.getElementById("logUser").value = userId;
                if (multiEntity == "Y") {
                    document.getElementById("hdEntity").value = '<%=StringEscapeUtils.escapeJavaScript(entity)%>';
                }
                document.getElementById("font").value = '<%=StringEscapeUtils.escapeJavaScript(font)%>';
                document.getElementById("logintheme").value = '<%=StringEscapeUtils.escapeJavaScript(logintheme)%>';
                document.getElementById("theme").value = '<%=StringEscapeUtils.escapeJavaScript(strTheme)%>';
                parent.isForceClose = false;
            }
            function fnHandleChgPwd(e){            
                var e = window.event || e;
                if(e.keyCode == 27){
                    closePwdScreen();
                    return false;
                }
                return true;
            }
			function setWindowWidth(){
				 document.getElementById("contentDiv").style.width = screen.availWidth / 3 + "px";
			}
        </script>
    </HEAD>
   <BODY oncontextmenu="return false;"  onkeydown="return fnHandleChgPwd(event);">
    <div id="DIVif1"  >
		<oj-dialog id="scrollingDialog"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"
                      position.of="window" class="oj-sm-width-2/5">
	   
			<DIV  slot=header id="wndtitle" class="oj-sm-width-full oj-dialog-title oj-flex-bar oj-sm-align-items-center bottom-border">
                                <div class="oj-flex-bar-start">
                                  <h1><%=StringEscapeUtils.escapeHTML(autoClrUsrTitle)%></h1>
				</div>
					
				<div class="oj-flex-bar-end">
                                        <oj-button display="icons" chroming="borderless" type="button"
                                                   id ="WNDbuttons" 
                                                    title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" 
                                                    on-oj-action="[[function() {closePwdScreen()}.bind(null)]]">
                                                    <span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
                                	</oj-button>
				</div>
			</DIV>	
			<DIV slot="body" id="wndwidth">
			  <form class="login-form" 
					method="POST" 
					name="clrusr" 
					action="fcautoclrusrservlet?actionType=login" 
					onsubmit="return CheckUser()" autocomplete="off">
                                        
                                        <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"/>
						<label class="LBLinv" for="hdUserId"></label>
						<input id="hdUserId" type="hidden" name="hdUserId" value=""/>
						<label class="LBLinv" for="hdPassword"></label>
						<input id="hdPassword" type="hidden" name="hdPassword" value=""/>
						<label class="LBLinv" for="hdEntity"></label>
						<input id="hdEntity" type="hidden" name="hdEntity" value=""/>
						<label class="LBLinv" for="theme"></label>
						<input id="theme" type="hidden" name="theme" value=""/>
						<label class="LBLinv" for="logUser"></label>
						<input id="logUser" type="hidden" name="logUser" value=""/>
						<label class="LBLinv" for="logUser"></label>
						<label class="LBLinv" for="logintheme"></label>
						<input id="logintheme" type="hidden" name="logintheme" value=""/>
						<label class="LBLinv" for="font"></label>
						<input id="font" type="hidden" name="font" value=""/>
                                        
					<div id="ResTree"  align="center">
                                            <label class="LBLinv" for=""></label><input type="hidden" name="fromLogin" value="" />
                                            <div id="contentDiv"><br>
                                                    <%if (ssoReq.equalsIgnoreCase("N")){%>
                                                        <div class="oj-sm-margin-4x-top">
                                                            <oj-label-value label-edge="start" label-width="30%">
										<oj-label  slot="label" for="userid" class="LBLstd">
                                                                                        <%=StringEscapeUtils.escapeHTML(user_id)%>
										</oj-label>
										<div slot="value" class="login-field">
                                                                                    <oj-input-text  id="userid"  type="text" 
                                                                                                    name="userid"
                                                                                                    disabled="true"
                                                                                                    value='<%=StringEscapeUtils.escapeHTML(StrUserId)%>'  
                                                                                                    title='<%=StringEscapeUtils.escapeHTML(StrUserId)%>'
											/>
										</div>
                                                            </oj-label-value>
							</div>          
								<div class="oj-sm-margin-4x-top">
									<oj-label-value label-edge="start" label-width="30%">
										<oj-label  slot="label" for="newpwd" class="LBLstd">
											<%=StringEscapeUtils.escapeHTML(reEnterPwd)%>
										</oj-label>
										<div slot="value" class="login-field">
                                                                                    <oj-input-password id="newpwd" 
                                                                                                    name="newpwd" 
												    type="password"
                                                                                                    title='<%=StringEscapeUtils.escapeHTML(reEnterPwd)%>' 
                                                                                    />
										</div>
									 </oj-label-value>
								</div>
							<%} else {%>
                                                                 <div class="oj-sm-margin-4x-top">
                                                                    <oj-label-value label-edge="start" label-width="30%">
                                                                        <oj-label  slot="label" for="userid" class="LBLinv">
                                                                                <%=StringEscapeUtils.escapeHTML(user_id)%>
                                                                        </oj-label>
                                                                            <div slot="value" class="login-field">
                                                                                <oj-input-text  id="userid"  
                                                                                                type="hidden"
                                                                                                disabled="true"
                                                                                                name="userid"
                                                                                                value='<%=StringEscapeUtils.escapeHTML(StrUserId)%>'  
                                                                                                title='<%=StringEscapeUtils.escapeHTML(StrUserId)%>'
											/>
										</div>
									</oj-label-value>
								</div>          
								<div class="oj-sm-margin-4x-top">
                                                                    <oj-label-value label-edge="start" label-width="30%">
                                                                        <oj-label  slot="label" for="newpwd" class="LBLinv">
											<%=StringEscapeUtils.escapeHTML(reEnterPwd)%>
									</oj-label>
									<div slot="value" class="login-field">
                                                                            <oj-input-password id="newpwd" 
                                                                                             name="newpwd" 
											     type="hidden"
                                                                                             title='<%=StringEscapeUtils.escapeHTML(reEnterPwd)%>'
										/>
                                                                    </div>
                                                                    </oj-label-value>
								</div>
							<%}%>
							<br>
							<!--<hr style="clear:both; width:95%"> -->
                                                         
                                            </div>
					</div>
                                        
                                        <div class="oj-flex-bar" style="margin-bottom:10px">
                                             <label class="LBLstd" for="newpwd">&nbsp;</label>
                                             <div class="oj-sm-margin-4x-top1 oj-flex-bar-end">
                                             <div class="oj-sm-padding-2x-end">
                                             <oj-button  class="action-button-primary" chroming="solid"  
                                                                        id="BTN_SAVE"
									type="submit" 
									name=<%=StringEscapeUtils.escapeHTML(ok)%>
									value=<%=StringEscapeUtils.escapeHTML(ok)%>
									onkeydown="return fnHandleScreenBtn(event)" 
                                                                >
                                                                <%=StringEscapeUtils.escapeHTML(ok)%>
                                                            </oj-button>
                                                            <!--
                                                    <oj-button chroming="outlined"
                                                                    id="BTN_CANCEL" 
                                                                    on-oj-action="[[function() {closePwdScreen(); return false;}.bind(null)]]"
                                                                    name=<%=StringEscapeUtils.escapeHTML(cancel)%>
                                                                    label='<%=StringEscapeUtils.escapeHTML(cancel)%>'
                                                            >     
                                                    </oj-button>
                                                    -->
                                             </div>        
                                              <oj-button chroming="outlined"
                                                                    id="BTN_CANCEL" 
                                                                    on-oj-action="[[function() {closePwdScreen(); return false;}.bind(null)]]"
                                                                    name=<%=StringEscapeUtils.escapeHTML(cancel)%>
                                                                    label='<%=StringEscapeUtils.escapeHTML(cancel)%>'
                                                            >     
                                                    </oj-button>
                                             <!--
                                                           <oj-button  class="action-button-primary" chroming="solid"  
                                                                        id="BTN_SAVE"
									type="submit" 
									name=<%=StringEscapeUtils.escapeHTML(ok)%>
									value=<%=StringEscapeUtils.escapeHTML(ok)%>
									onkeydown="return fnHandleScreenBtn(event)" 
                                                                >
                                                                <%=StringEscapeUtils.escapeHTML(ok)%>
                                                            </oj-button>                   
                                                            -->
                                                                      		
                                            </div>
                                     </div>
				</form>  
			</div>
		</oj-dialog>
	</div>
</BODY>
</HTML>
