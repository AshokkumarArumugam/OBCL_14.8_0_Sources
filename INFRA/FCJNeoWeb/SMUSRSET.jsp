<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : SMUSRSET.jsp
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

**  Modified By           : Ambika Selvaraj
**  Modified On           : 12-Sep-2017 
**  Modified Reason       : Changes done to remove hardcoded English label in user settings dashboard. 
**  Retro Source          : 9NT1606_12_1_SYGNITY_S.A.
**  Search String         : 9NT1606_12_4_RETRO_12_1_26780557

**  Modified By           : Saloni Rai
**  Modified On           : 27-Jul-2020
**  Modified Reason       : Fix provided to display Sepia theme in the drop-down and apply the theme based on user selection.
**  Search String         : Fix for 31653517

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css

-------------------------------------------------------------------------------------------------------- -
*/
%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
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
    String StrUserId        = (String) session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String lang             = (String)session.getAttribute("LANG");
    
    String StrlangISOMap     = (BranchConstants.DEFAULT_LANG_ISOMAP).toLowerCase();
    String branchIdentifier  = BranchConstants.BRANCH_CENTRALIZED;
    FCUserGlobals Objuc = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
    /* error message fixes*/
    String Strlang           = Objuc.getLangCd();
    /* error message fixes*/
   /* # BUG 15978732 fixes start */ 
    String strTheme        = FCUtility.validateParameter(request.getParameter("THEME"));
    String fromLogin       = FCUtility.validateParameter(request.getParameter("FROMLOGIN"));
    /* # BUG 15978732 fixes end */ 
    String ieCss         = (String)session.getAttribute("IECSS");
 
    String oldPasswd = Objuc.getOldPasswd();
    /*12.0.2 Screen Saver Changes Starts*/
    String scrSaverReq = Objuc.getScreenSaverReq();
    String scrSaverModifiableFlag = Objuc.getScreenSaverModifiableFlag();
    /*12.0.2 Screen Saver Changes ends*/
    String TerminalId = (String) FCUtility.validateParameter(FCUtility.getCleintIPAddr(request));
    if (StrUserId == null || "".equals(StrUserId)){
        StrUserId = TerminalId;
    }
            
    FBContext fbContext    = new FBContext(StrUserId);
    //Fix for 17259422 start
    //Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+BranchConstants.DEFAULT_LANGCODE, branchIdentifier,StrUserId);
	Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+lang + "~" + entity, branchIdentifier,StrUserId);
	//Fix for 17259422 end
    String browserCSS      = (String) session.getAttribute("BROWSER_CSS");

    String amtFmt           = (String)itemDescMap.get("LBL_AMOUNT_FORMAT");
    String dtFmt            = (String)itemDescMap.get("LBL_DATE_FORMAT");
    String dboardReqd       = (String)itemDescMap.get("LBL_DBOARD_REQD");
    String alertHome        = (String)itemDescMap.get("LBL_ALERT_HOME");
    String save             = (String)itemDescMap.get("LBL_ACTION_SAVE");
    String cancel           = (String)itemDescMap.get("LBL_CANCEL");
    String userSettingsChangedMsg = (String)itemDescMap.get("LBL_USER_SETTINGS_CHANGED");
    String noScriptLabel    = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String external_alert     = (String)itemDescMap.get("LBL_EXTERNAL_ALERTS");//external alert changes
	String dateDelimiterReqd  = (String)itemDescMap.get("LBL_DATE_DELIMITER_REQ"); //9NT1606_14_0_RETRO_12_0_3_27393036 changes
    String extAlertEnabled  = BranchConstants.EXTERNAL_ALERTS;//external alert changes

    String documentTitle        = (String)itemDescMap.get("LBL_USER_SETTINGS");
    String saveLabel            = (String)itemDescMap.get("LBL_ACTION_SAVE");
    String cancelLabel          = (String)itemDescMap.get("LBL_CANCEL");
    String mandatory            = (String)itemDescMap.get("LBL_INFRA_MANDATORY");
    String Yes                  = (String)itemDescMap.get("LBL_Y");
    String No                   = (String)itemDescMap.get("LBL_N");
    String amtFormat1           = (String)itemDescMap.get("LBL_DOTCOMMA");
    String amtFormat2           = (String)itemDescMap.get("LBL_COMMADOT");
    String amtFormat3           = (String)itemDescMap.get("LBL_COMMASPACE");
    String dateFormat1          = (String)itemDescMap.get("LBL_DATE_FORMAT1");
    String dateFormat2          = (String)itemDescMap.get("LBL_DATE_FORMAT2");
    String dateFormat3          = (String)itemDescMap.get("LBL_DATE_FORMAT3");
    String dateFormat4          = (String)itemDescMap.get("LBL_DATE_FORMAT4");
    String dateFormat5          = (String)itemDescMap.get("LBL_DATE_FORMAT5");
    String dateFormat6          = (String)itemDescMap.get("LBL_DATE_FORMAT6");
    String dateFormat7          = (String)itemDescMap.get("LBL_DATE_FORMAT7");
    String dateFormat8          = (String)itemDescMap.get("LBL_DATE_FORMAT8");
	/*Fix for 14762437 New Date formats starts*/
	String dateFormat9          = (String)itemDescMap.get("LBL_DATE_FORMAT9");
	String dateFormat10         = (String)itemDescMap.get("LBL_DATE_FORMAT10");
  String lblNumberMask =(String)itemDescMap.get("LBL_NUMBER_FORMAT_MASK");//Changes for formatting number
	/*Fix for 14762437 New Date formats ends*/
    String imgPath              = "Images/"+strTheme.substring(0,strTheme.indexOf("."));
    String defaultstyle         = (String) BranchConstants.DEFAULT_STYLE;
    String arrdefaultstyle[]    = null;
    arrdefaultstyle             = defaultstyle.split("!");
    int defaultStyleIndex    = -1;
    for(int i = 0; i < arrdefaultstyle.length; i++){
        if(arrdefaultstyle[i].contains("~D")){
            defaultStyleIndex = i;
            break;
        }
    }
      String labelEnterScrSaver  =(String)itemDescMap.get("LBL_ENTER_SCREEN_SAVER");//12.0.2 Screen Saver Changes
      String ScrSaverErrMsg       =(String)itemDescMap.get("LBL_SCREEN_SAVER_ERR_MSG");//12.0.2 Screen Saver Changes
      String ScrSavertimeOut1       =(String)itemDescMap.get("LBL_SCREEN_SAVER_TIMEOUT1");//12.0.2 Screen Saver Changes
      String ScrSavertimeOut2       =(String)itemDescMap.get("LBL_VALUE_INCORRECT");//12.0.2 Screen Saver Changes fix for 17021201
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    
String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<HTML lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <HEAD>
        <TITLE><%=StringEscapeUtils.escapeHTML(documentTitle)%></TITLE>
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
            var mainWin                = parent.mainWin;
            var alertType              = "";
            var strTheme               = '<%= StringEscapeUtils.escapeJavaScript(strTheme)%>';
            var userSettingsChangedMsg = '<%= StringEscapeUtils.escapeJavaScript(userSettingsChangedMsg)%>';
            var curr_user              = '<%= StringEscapeUtils.escapeJavaScript(userSettingsChangedMsg) %>'; 
            var labelEnterScrSaver     ='<%= StringEscapeUtils.escapeJavaScript(labelEnterScrSaver)%>';
            /*12.0.2 Screen Saver Changes*/
            var ScrSaverErrMsg          ='<%= StringEscapeUtils.escapeJavaScript(ScrSaverErrMsg)%>';
            var scrSaverReq               ='<%= StringEscapeUtils.escapeJavaScript(scrSaverReq)%>';
            var scrSaverModifiableFlag   = '<%= StringEscapeUtils.escapeJavaScript(scrSaverModifiableFlag)%>';
            var ScrSavertimeOut1          ='<%= StringEscapeUtils.escapeJavaScript(ScrSavertimeOut1)%>';
            var ScrSavertimeOut2          ='<%= StringEscapeUtils.escapeJavaScript(ScrSavertimeOut2)%>';
            var scrTimeout             =  '<%= StringEscapeUtils.escapeJavaScript(String.valueOf(Objuc.getScreenSaverTimeout()))%>';
            var fromLogin              = '<%=StringEscapeUtils.escapeJavaScript(fromLogin)%>';
            var extAlertEnabled        = '<%=StringEscapeUtils.escapeJavaScript(extAlertEnabled)%>';//external alert changes
            var dateDelimiterReqd      = '<%=StringEscapeUtils.escapeJavaScript(dateDelimiterReqd)%>'; //9NT1606_14_0_RETRO_12_0_3_27393036 changes
            /*HTML5 Changes Start*/
	    var logintheme = "<%=StringEscapeUtils.escapeJavaScript(logintheme)%>";
            if (logintheme == "FlexNewUI2.css") {
                logintheme = "D";
            } else {
                logintheme = "L";
            }
            var loginfont = "<%=StringEscapeUtils.escapeJavaScript(font)%>";
	    /*HTML5 Changes End*/
        </script>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- OJET changes--%>       
        <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_misc.js"></script>
        
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
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
                        if(errorKey.indexOf("~"+Strlang)  >= 0){
                            String errorCode = errorKey.split("~")[0];
                            %>
                                commonError('<%=StringEscapeUtils.escapeJavaScript(errorCode)%>', '<%=StringEscapeUtils.escapeJavaScript(errorValue)%>');  
                            <%
                        }
                    }
                        %>
                        <%
                    //System.out.println("COMMON");
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
                    //System.out.println("smcntrol");
                    errorBundle = (Map)FCMessages.createMessage("SMRESPWD",null);
                        if(errorBundle != null){
                    itrKeys = errorBundle.keySet().iterator();
                    itrValues = errorBundle.values().iterator();
                        }                 
                        
                    while(itrKeys.hasNext()){
                        String errorKey = (String)itrKeys.next();
                        String errorValue = (String)itrValues.next();
                        if (errorKey.indexOf("~"+lang)>=0) {
                            String errorCode = errorKey.split("~")[0];
                        %>
                                commonError('<%=StringEscapeUtils.escapeJavaScript(errorCode)%>', '<%=StringEscapeUtils.escapeJavaScript(errorValue)%>');  
                        <%
                        }
                    }
                    //System.out.println("SMRESPWD");
                } catch(Exception e) {
                }
            %>
            function setDefaultVals(){
               // document.getElementById("dtFmt").value=mainWin.systemDateFormat;
                document.getElementById("amtFmt").value=mainWin.nlsAmtFmt;
                document.getElementById("dboardReqd").value=mainWin.dashboardReqd;
                document.getElementById("alertHome").value=mainWin.alerthomeReqd;
				document.getElementById("dateDelimiterReqd").value=mainWin.dateDelimiterReqd; //9NT1606_14_0_RETRO_12_0_3_27393036 changes
                if(document.getElementById("ext_alert")) document.getElementById("ext_alert").value=mainWin.extalertReqd;//external alert changes
                /*HTML5 Changes Start*/
		if (scrSaverReq == "Y" && scrSaverModifiableFlag == "Y") {
                    document.getElementById("scrSaverTime").value=mainWin.scrSaverTime;
                }

               document.getElementById("NUM_FORMAT_MASK").value=mainWin.gNumberFormatMask;
		/*HTML5 Changes End*/
            }
            function fnHandleCloseUserSettings(e){
                var e = window.event || e;
                mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
                if(e.keyCode == 27){
                    closeUserSettings();
                    return false;
                }
                return true;
            }
            function debugs(msg, value, funcName) {
            }
			function setWindowWidth(){
				 document.getElementById("contentDiv").style.width = mainWin.dashBoardWidth / 3 + "px";
			}
        </script>
    </HEAD>
    <BODY onload="setDefaultVals();" oncontextmenu="return false;" onkeydown="return fnHandleCloseUserSettings(event);">
         <div id="DIVif1" >
    <oj-dialog id="scrollingDialog"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"
                      position.of="window" class="oj-sm-width-1/3" >
   
       
           <DIV   slot=header id="wndtitle" class="oj-dialog-title" >
                <h1 ><%=StringEscapeUtils.escapeHTML(documentTitle)%></h1>            	
            </DIV>
            
            <DIV slot="body" id="wndwidth">
                <div id="ResTree">
                    <label class="LBLinv" for=""></label><input type="hidden" name="fromLogin" value="" />
                    <div  id="contentDiv" >
                        <br> 
                        
                        <div class="oj-sm-margin-4x-top">
                                 <oj-label-value label-edge="start" label-width="40%">
                                       <oj-label  slot="label" for="amtFmt"><%=StringEscapeUtils.escapeHTML(amtFmt)%></oj-label>
                                      <oj-select-single slot="value"  NAME="amtFmt" ID="amtFmt"  on-oj-value-action="[[fnHandleScreenBtn]]" data=[[amtFormatDataProvider]] />
                                 </oj-label-value>
                       </div>
					   <!-- Date format selection removed 
                        <div class="oj-sm-margin-4x-top">
                                 <oj-label-value label-edge="start" label-width="40%">
                                       <oj-label  slot="label" for="dtFmt"><%=StringEscapeUtils.escapeHTML(dtFmt)%></oj-label>
                                      <oj-select-single slot="value"  NAME="dtFmt" id="dtFmt"data=[[dateFormatDataProvider]] />
                                 </oj-label-value>
                       </div>-->
                       <div class="oj-sm-margin-4x-top">
                                 <oj-label-value label-edge="start" label-width="40%">
                                       <oj-label  slot="label" for="dboardReqd"><%=StringEscapeUtils.escapeHTML(dboardReqd)%></oj-label>
                                      <oj-select-single slot="value" NAME="dboardReqd" id="dboardReqd" data=[[yesNoDataProvider]] />
                                 </oj-label-value>
                       </div>                        
		
                       <div class="oj-sm-margin-4x-top">
                                 <oj-label-value label-edge="start" label-width="40%">
                                       <oj-label  slot="label" for="alertHome"><%=StringEscapeUtils.escapeHTML(alertHome)%></oj-label>
                                      <oj-select-single slot="value" NAME="alertHome" id="alertHome" data=[[yesNoDataProvider]] />
                                 </oj-label-value>
                        </div>
                        
                        <%--12.0.2 Screen Saver Changes Starts--%>
                        <%
                        if (scrSaverReq.equalsIgnoreCase("Y") && scrSaverModifiableFlag.equalsIgnoreCase("Y")) {
                        %>
                            
                            <div class="oj-sm-margin-4x-top">
                                 <oj-label-value label-edge="start" label-width="40%">
                                       <oj-label  slot="label" for="scrSaverTime"><%=StringEscapeUtils.escapeHTML(labelEnterScrSaver)%></oj-label>
                                      <oj-input-text slot="value" class="TXTstd numeric" TYPE="text" NAME="ScrSaverTime" ID="scrSaverTime" SIZE="4" MAXLENGTH="4" onpaste ="return false;" onblur = "return validateScrTimeout()" onkeydown="return fnHandleScreenBtn(event)"/>
                                 </oj-label-value>
                            </div>
                        <%
                        }
                        %>
                        <%--12.0.2 Screen Saver Changes ends--%>
                        <!--Changes for formatting number start-->
                       
                      
                       
                       <div class="oj-sm-margin-4x-top">
                                 <oj-label-value label-edge="start" label-width="40%">
                                      <oj-label  slot="label" for="NUM_FORMAT_MASK"><%=StringEscapeUtils.escapeHTML(lblNumberMask)%></oj-label>
                                      <oj-radioset slot="value" id="NUM_FORMAT_MASK" name="NUM_FORMAT_MASK" label-edge="inside"  options=[[numFormatMaskDataProvider]]>
                                      </oj-radioset>
                                 </oj-label-value>
                        </div>
                        <%
                        if("Y".equals(extAlertEnabled)){//external alert chaanges start
                        %>
                    
                        <div class="oj-sm-margin-4x-top">
                                 <oj-label-value label-edge="start" label-width="40%">
                                       <oj-label  slot="label" for="ext_alert"><%=StringEscapeUtils.escapeHTML(external_alert)%></oj-label>
                                      <oj-select-single slot="value" name="ext_alert" id="ext_alert" data=[[yesNoDataProvider]] />
                                 </oj-label-value>
                            </div>
                    
                        <% }
                        %><!--External alert changes end-->
                        <!--9NT1606_14_0_RETRO_12_0_3_27393036 changes starts-->
                        <div class="oj-sm-margin-4x-top">
                        <oj-label-value label-edge="start" label-width="40%">
                            <oj-label slot="label" for="dateDelimiterReqd"><%=StringEscapeUtils.escapeHTML(dateDelimiterReqd)%></oj-label>                        
                            <oj-select-single slot="value" NAME="dateDelimiterReqd" id="dateDelimiterReqd" data=[[dateDelimiterDataProvider]] />
                                <!--<option value="N" selected><%=StringEscapeUtils.escapeHTML(No)%></option>
                                <option value="Y"><%=StringEscapeUtils.escapeHTML(Yes)%></option>-->                               
                        </oj-label-value>
                        </div><!--9NT1606_14_0_RETRO_12_0_3_27393036 changes ends-->
                        <br><br>
                         <!--Changes for formatting number end-->
                         
                        
                    </div>
                   
                </div>
                        </div>
                   <div slot="footer">
                       <div class="oj-flex-bar" style="margin-bottom:10px">
                            <div class="oj-sm-margin-4x-top oj-flex-bar-end">
                                <oj-button id="BTN_CANCEL" value="<%=StringEscapeUtils.escapeHTML(cancel)%>" onClick="closeUserSettings()" class="oj-sm-margin-1x"  onkeydown="return fnHandleScreenBtn(event)" name= <%=StringEscapeUtils.escapeHTML(cancel)%> >
                                    <%=StringEscapeUtils.escapeHTML(cancel)%></oj-button>
                      
                                <oj-button  class="action-button-primary oj-sm-margin-1x" chroming="solid"   value="<%=StringEscapeUtils.escapeHTML(save)%>"  id="BTN_SAVE" onClick="saveUserSettings()"  onkeydown="return fnHandleScreenBtn(event)" name= <%=StringEscapeUtils.escapeHTML(save)%> >
                                    <%=StringEscapeUtils.escapeHTML(save)%></oj-button>&nbsp;
                    </div>
                </div>
            </div>
        </oj-dialog>
        </div>
    </BODY>
</HTML>
