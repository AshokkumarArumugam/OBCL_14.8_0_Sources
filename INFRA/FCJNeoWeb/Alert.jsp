<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : Alert.jsp
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

    ** Modified By         : TEJA
	** Modified On         : 11-SEP-2014
	** Modified Reason     : Preventing user to save when override is present
	** Search String       : 9NT1620_1203_RETRO_18817599 

Copyright � 2004-2016 by Oracle Financial Services Software Limited..
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
-------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>

<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    response.addHeader("X-FRAME-OPTIONS", "SAMEORIGIN");/*Fix for 25101796*/
    response.setHeader("X-CONTENT-TYPE-OPTIONS", "nosniff");/*Fix for 25151882*/
    if("Y".equalsIgnoreCase(BranchConstants.SSL_ENABLED)) {
        response.setHeader("Strict-Transport-Security", "max-age=31622400; includeSubDomains"); //Fix for 34025996
        response.setHeader("Content-Security-Policy", "upgrade-insecure-requests");
    }
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String ieCss            = "";
    String browserCSS       = "";
    String Strlang          = "";
    String StrlangISOMap    = "";
    String font = "M";//HTML5 Changes
    String logintheme = "FlexNewUI.css";//HTML5 Changes
    if(jsParser == null){
        String userAgent = request.getHeader("USER-AGENT").toUpperCase();
       if(userAgent.contains("MSIE") || (userAgent.contains("TRIDENT") && userAgent.contains("RV"))) {//ie11 changes
        
            jsParser = "BROWSER_IE.js";
            if (userAgent.contains("MSIE 7"))
                ieCss = "IE7.css";
        } else {
            jsParser = "BROWSER_NonIE.js";
        }
        browserCSS = "BROWSER_IE.css";
        if(userAgent.indexOf("FIREFOX") >= 0) {
            browserCSS = "BROWSER_FF.css";
        } else if(userAgent.indexOf("OPERA") >= 0) {
            browserCSS = "BROWSER_OP.css";
        } else if(userAgent.indexOf("CHROME") >= 0) {
            browserCSS = "BROWSER_GO.css";
        } else if(userAgent.indexOf("SAFARI") >= 0) {
            browserCSS = "BROWSER_SF.css";
        }   
        Strlang           = BranchConstants.DEFAULT_LANGCODE;
        StrlangISOMap     = (BranchConstants.DEFAULT_LANG_ISOMAP).toLowerCase();
    }else{        
        ieCss               = (String)session.getAttribute("IECSS");
        browserCSS          = (String)session.getAttribute("BROWSER_CSS");    
        Strlang             = (String)session.getAttribute("LANG");
        if(Strlang == null)
            Strlang           = BranchConstants.DEFAULT_LANGCODE;
        StrlangISOMap       = (String)session.getAttribute("LANGISOMAP");
        if(StrlangISOMap == null)
            StrlangISOMap     = (BranchConstants.DEFAULT_LANG_ISOMAP).toLowerCase();
        font         = (String)session.getAttribute("FONT");//HTML5 Changes
        logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
        if(null==logintheme) {
            logintheme = "FlexNewUI.css";//HTML5 Changes
        }
    }
    /*Fix for Bug No :17857705 starts*/
    String ssoReq = BranchConstants.SSO_REQD; /*Fix for 18872800*/
    //(String)BranchParam.getInstance().getCacheFBTBParams().get("SSO_INSTALLED");
    /*Fix for Bug No :17857705 ends */
    String StrUserId         = (String) session.getAttribute("USERID");    
    String entity         = (String) session.getAttribute("ENTITY");
    if(entity == null)
            entity           = FCUtility.validateParameter(request.getParameter("ENTITY"))!=null && !"undefined".equalsIgnoreCase(FCUtility.validateParameter(request.getParameter("ENTITY")))?FCUtility.validateParameter(request.getParameter("ENTITY")):"";
    String branchIdentifier  = BranchConstants.BRANCH_CENTRALIZED;
   /* # BUG 15978732 fixes start */ 
    //12.1_WebInspect_Fixes start
    //String strTheme        = FCUtility.validateParameter(request.getParameter("THEME"));
    String strTheme = (String)session.getAttribute("THEME");
    if (strTheme == null)
    {       String defaultstyle      = (String) BranchConstants.DEFAULT_STYLE;
            strTheme      = "Flexblue";
            String arrdefaultstyle[] = null;
            arrdefaultstyle          = defaultstyle.split("!");
            int defaultStyleIndex    = -1;
            for(int i = 0; i < arrdefaultstyle.length; i++){
                if(arrdefaultstyle[i].contains("~D")){
                    defaultStyleIndex = i;
                    strTheme = arrdefaultstyle[i].split("~")[0] + ".css";
                    break;
                }
    }
    }
    //12.1_WebInspect_Fixes end
    String message         = FCUtility.validateParameter(request.getParameter("MESSAGE"));
    String screenType      = FCUtility.validateParameter(request.getParameter("SCREENTYPE"));//FCUBS11.1 CROSSBROWSER changes 
    /* # BUG 15978732 fixes ends*/ 
    if (screenType == null)
        screenType = "NONWB";
   /* # BUG 15978732 fixes start */ 
    String rejectFlagRequired  = FCUtility.validateParameter(request.getParameter("REJECTREQUIRED"));//FCUBS11.1 WB Changes
     String multiAuthRequired  = FCUtility.validateParameter(request.getParameter("MULTIAUTH")); //12.1_multi_auth
   /* # BUG 15978732 fixes end */ 
    if (rejectFlagRequired == null)
        rejectFlagRequired = "NONWBRO";
        /* # BUG 15978732 fixes start */ 
    String autoOvdFlag  = FCUtility.validateParameter(request.getParameter("AUTOOVERRIDE"));//fc11.1wb changes
        /* # BUG 15978732 fixes end */ 
    if (autoOvdFlag == null)
        autoOvdFlag = "N";
   /* # BUG 15978732 fixes start */ 
    String ovdScrType      = FCUtility.validateParameter(request.getParameter("OVDSCRTYP"));
    /* # BUG 15978732 fixes end */ 
    if (ovdScrType == null) {
        ovdScrType = "M";
    }
   /* # BUG 15978732 fixes start */ 
    String ovdRoutingType      = FCUtility.validateParameter(request.getParameter("OVDROUTINGTYP"));
    /* # BUG 15978732 fixes end*/ 
    if (ovdRoutingType == null) {
        ovdRoutingType = "NX";
    }
    
    String[] msgArray      = message.split("__",-1);
    /* # BUG 15978732 fixes start */ 
	String AlertType       = FCUtility.validaterUrlParameter(request.getParameter("MSG_TYPE"));
    if(AlertType != null) AlertType = AlertType.substring(0,1);

    String error           = request.getParameter("ERROR");
    String errorType       = request.getParameter("ERROR_TYPE");
    /*String ovrdRemarks     = request.getParameter("OVRDREMARKS");
    if (ovrdRemarks == null)
        ovrdRemarks = "N";
    */
    String timestamp = FCUtility.validateParameter(request.getParameter("timestamp"));
    String funcid = FCUtility.validateParameter(request.getParameter("funcid"));
	String seqNo = FCUtility.validateParameter((String)request.getParameter("seqNo"));/* Changes for Undefined Seq no*/
 /* # BUG 15978732 fixes end */ 
    String TerminalId = (String) FCUtility.validateParameter(FCUtility.getCleintIPAddr(request));
    if (StrUserId == null || "".equals(StrUserId)){
        StrUserId = TerminalId;
    }
    
    FBContext fbContext    = new FBContext(StrUserId);
    BranchLogger brnLogger = new BranchLogger(StrUserId);
    fbContext.setBrnLogger(brnLogger);
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
    
   if(itemDescMap == null){
    itemDescMap = BranchConstants.LABEL_MAP;
   }
   String lblCode = "LBL_ERROR";
   String okBtnClass = "btn-error";
   String okBtnChroming="solid";
    if("I".equalsIgnoreCase(AlertType)){
        lblCode = "LBL_INFRA_INFORMATION";
        okBtnClass = "action-button-primary";
        okBtnChroming="solid";
    }else  if("O".equalsIgnoreCase(AlertType)){
        lblCode = "LBL_OVERRIDE";
        
    }else  if("C".equalsIgnoreCase(AlertType)){
        lblCode = "LBL_CONFIRM";
        okBtnClass = "action-button-primary";
        okBtnChroming="solid";
    }
    String AlertMsg         = (String) itemDescMap.get(lblCode);
    String AlertMsgCODE     = (String) itemDescMap.get("LBL_ALERT_MSG_" + AlertType + "_CODE");
    String AlertMsgDESC     = (String) itemDescMap.get("LBL_ALERT_MSG_" + AlertType + "_DESC");
    
    String okLabel          = (String) itemDescMap.get("LBL_OK");
    String loginLabel       = (String) itemDescMap.get("LBL_CURR_LOGIN");
    String exitLabel        = (String) itemDescMap.get("LBL_EXIT");
    String acceptLabel      = (String) itemDescMap.get("LBL_ACCEPT");
    String cancelLabel      = (String) itemDescMap.get("LBL_CANCEL");
    String noScriptLabel    = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String makerOvdRemarks  = (String) itemDescMap.get("LBL_MAKER_OVD_REMARKS");
    String localAuthLabel   = (String) itemDescMap.get("LBL_LOCAL_AUTH");//FCUBS11.1 CROSSBROWSER changes 
    String rejectLabel      = (String) itemDescMap.get("LBL_REJECT");	//FCUBS11.1 WB Changes
    String lblDescription   = (String) itemDescMap.get("LBL_DESCRIPTION");	
    String lblErrCode   = (String) itemDescMap.get("LBL_ALERT_MSG_E_CODE");
    String lblOvdCode   = (String) itemDescMap.get("LBL_ALERT_MSG_O_CODE");

    String imgSmlCLSName    =  "ICOAlert_" + AlertType;
    //String imgSmlWithPath  = "Images/"+strTheme.substring(0,strTheme.indexOf(".css"))+"/" + imgSmlName;
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
		 <link rel="SHORTCUT ICON" href="data:;base64,="/><!--citi ui change-->
       <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
       <!-- <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
        <!--HTML5 Changes Start-->
        <%--<%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%>--%><!--HTML5 Changes End -->
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <!--<script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
        
            <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css"/>
            <link href="Script/css/fonts/ojuxIconFont.css" type="text/css" rel="stylesheet"/>
                <!--<link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css"/>-->
                <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
                <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
                <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
                
                <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_alert.js"></script>
                
        <script type="text/javascript">
            var error = '<%=StringEscapeUtils.escapeJavaScript(error)%>';
            var errorType = '<%=StringEscapeUtils.escapeJavaScript(errorType)%>';
            var timestamp = '<%=StringEscapeUtils.escapeJavaScript(timestamp)%>';
            var funcid = '<%=StringEscapeUtils.escapeJavaScript(funcid)%>';
            
            var lblDescription = '<%=StringEscapeUtils.escapeJavaScript(lblDescription)%>';
            var lblErrCode = '<%=StringEscapeUtils.escapeJavaScript(lblErrCode)%>';
            var lblOvdCode = '<%=StringEscapeUtils.escapeJavaScript(lblOvdCode)%>';
            
            
			var seqNo = '<%=StringEscapeUtils.escapeJavaScript(seqNo)%>';/* Changes for Undefined Seq no*/
            var ssoReq = "<%=StringEscapeUtils.escapeJavaScript(ssoReq)%>"; /*Fix for 19008888*/            
            var alertType = "I";
            var mainWin = parent.mainWin;
			 parent.alertJSPPresent = true; /* 9NT1620_1203_RETRO_18817599  */
            <%
            if (AlertType != null) {
            %>
                alertType = '<%=StringEscapeUtils.escapeJavaScript(AlertType)%>';
            <%
            }
            else{
              AlertType = "I";
            }
            %>
            function chkErr() {
                /*if(mainWin.document.getElementById("TlBarOper"))
                    mainWin.showToolbar('', '', '');*/
                if (error != 'null') {
                    var err;
                    var err_code;
                    /*if(mainWin.DebugWindowFlg == "Y") {               
                    var dbgDataDOM = loadXMLDoc(error);
                    appDbg = selectSingleNode(dbgDataDOM,"//ERROR/AP_DEBUG");
                    webDbg = selectSingleNode(dbgDataDOM,"//ERROR/WB_DEBUG");
                    dbDbg = selectSingleNode(dbgDataDOM,"//ERROR/DB_DEBUG");
                    if(webDbg == null) 
                        webDbg="";
                    else
                        webDbg=getNodeText(webDbg);
                     if(appDbg == null) 
                        appDbg="";
                    else
                        appDbg=getNodeText(appDbg);
                    if(dbDbg == null) 
                        dbDbg="";
                    else
                        dbDbg=getNodeText(dbDbg);
                    
                        mainWin.serverDebugStmt = webDbg + "\n\n"+appDbg+"\n\n"+ dbDbg;
                    }debug revert*/
                    
                    var msgArr = fnBuildMsgArr(error);
                    for (var i in msgArr) {
                        err_code = i + "~";
                        err = msgArr[i] + "~";
                    }
                    err_code = err_code.substring(0,err_code.length-1);
                    err = err.substring(0,err.length-1);
                    var alertXML = fnBuildAlertXML(err_code,errorType,err);
                   // parent.mask();
                    parent.showAlerts(alertXML, errorType);
                    parent.alertAction = "UNMASK";
                    if(parent.document.getElementById("testwin") != null){
                        parent.fnExit(parent.document.getElementById("testwin"),seqNo);/* Changes for Undefined Seq no*/
                    }
                    if((parent.document.getElementById("Div_ChildWin")) && (parent.document.getElementById("Div_ChildWin").children.length > 0) ){ //session expiry change start
                       parent.document.getElementById("Div_ChildWin").removeChild(parent.document.getElementById("Div_ChildWin").children[0]);
                    } //session expiry change end
                    if(typeof(timestamp) != "undefined" && timestamp != null && timestamp!= "null" && timestamp!=""){
                        if(mainWin.dashboardFuncs.indexOf(funcid) >= 0){
                            if(parent.document.getElementById("divpart"+funcid+timestamp)!=null){
                                parent.document.getElementById("divpart"+funcid+timestamp).style.display="none";
                                //parent.document.getElementById("divpart"+funcid+timestamp).innerHTML = "";
                           }
                        }
                    }
                    return;
                } else {
                    var imageClass    = "<%=StringEscapeUtils.escapeJavaScript(imgSmlCLSName)%>";
                    var alertMsgTitle = "<%=StringEscapeUtils.escapeJavaScript(AlertMsg)%>";
                    fnBuildAlertHTML(alertMsgTitle, imageClass);
                    /*Fix for Bug No :18629260 starts*/
                     //parent.mask(); commented, not correct fix
                    /*Fix for Bug No :18629260 ends*/
                    //resize_iframe();
                   // document.getElementById("wndwidth").style.width = document.getElementById("wndtitle").offsetWidth - 10+"px" ;//alert related changes
                   
                }
				// setTimeout("fnSyncAlertTableWidth();", 10);
                 
            }
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    </head>
    <body  oncontextmenu="return false;" onkeydown="return disableCommonKeys(event);" onhelp="return false;" onclick="setParentWinActive(event);"><!-- static header change -->
    <div id="DIVif1" >
    <oj-dialog id="scrollingDialog"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"
                      position.of="window" drag-affordance="title-bar">
        
            <DIV   slot=header id="wndtitle" class="oj-dialog-title" >
                <h1 ><%=StringEscapeUtils.escapeHTML(AlertMsg)%></h1>            	
            </DIV>
            <DIV slot="body" id="wndwidth">
		<DIV>
    <!-- static header change start-->
                    <div><div id="tblHeader-container"   style="height:auto;">
                      <%
                        if(AlertType != null) {
                            if ("E".equalsIgnoreCase(AlertType) || "O".equalsIgnoreCase(AlertType)) {
                      %>
                      <!--<TABLE id="ERRTBLHeader"   border=0 cellSpacing=0 cellPadding=0 width="100%" summary="Override Messages">
                                    <TBODY>
                                        <TR>
											--><!--HTML5 Changes--><!--
                                            <TD width="84.5%" scope=col><SPAN tabindex="0"  class=SPNtbltwoH title="<%=StringEscapeUtils.escapeHTML(AlertMsgDESC)%>"><%=StringEscapeUtils.escapeHTML(AlertMsgDESC)%></SPAN></TD>
                                            <TD class="THLast" width="15.5%" scope=col><SPAN tabindex="0" class=SPNtbltwoH title="<%=StringEscapeUtils.escapeHTML(AlertMsgCODE)%>"><%=StringEscapeUtils.escapeHTML(AlertMsgCODE)%></SPAN></TD>
                                        </TR>
                                    </TBODY>
                                </TABLE>-->
                            <%
                            } else {
                            %>
                                <!--<TABLE id="ERRTBLHeader" class="TBLtwoH" border=0 cellSpacing=0 cellPadding=0 width="100%" summary="Alert">
                                    <TBODY>
                                        <TR>
                                            <TD class="THSinglerow" scope=col><SPAN tabindex="0"  class=SPNtbltwoH title="<%=StringEscapeUtils.escapeHTML(AlertMsg)%>"><%=StringEscapeUtils.escapeHTML(AlertMsg)%></SPAN></TD>
                                        </TR>
                                    </TBODY>
                                </TABLE>-->
                            <%
                            } 
                             }
                        %>
                    </div></div>
                    <DIV id="tbl-container"    >
                                <!--<ul id="ERRTBL"  width="100%"   summary="Override Messages">
                                    
                                </ul>-->
                                 <oj-table id="ERRTBL" data="{{alertDataprovider}}" class="oj-sm-width-full"  display="grid"    columns-default='{"sortable": "disabled"}' columns="{{alertHeaders}}">
                                </oj-table>
                                
                    </DIV>
                    <!-- static header change end-->
                    <%--11.1 Remarks Changes - Starts Here--%>
                    <%
                    if(!screenType.equalsIgnoreCase("WB")){	  //FCUBS11.1 CROSSBROWSER Changes
                        if ("O".equalsIgnoreCase(AlertType) && !"O".equalsIgnoreCase(ovdScrType)) {
                            if ("X".equalsIgnoreCase(ovdRoutingType)) {
                                %>
                                <div class="oj-sm-margin-4x-top">
                                 <oj-label-value label-edge="start" label-width="30%">
                                       <oj-label  slot="label"   for="REMARKS"><%=StringEscapeUtils.escapeHTML(makerOvdRemarks)%></oj-label>
                                       <oj-text-area slot="value"   id="REMARKS"   rows="2"  ></oj-text-area>
                                 </oj-label-value>
                                 </div>
                                   
                                <%
                            }
                        }
                    }else if(screenType.equalsIgnoreCase("WB")){
                    %>
                        <oj-label  for="REMARKS"></oj-label><input type="hidden" name="REMARKS" id = "REMARKS" value = ""></input>
                    <%
                    }
                    %>
                    <%--11.1 Remarks Changes - Ends Here --%>
		</DIV>
        
                
            </DIV>
            
           
                    <div slot="footer" id="alertFooter">
                       
                        <%
                        if(AlertType != null) {
                         if ("C".equalsIgnoreCase(AlertType) || "O".equalsIgnoreCase(AlertType)) {
                                %><oj-button chroming="outlined"  label=<%=StringEscapeUtils.escapeHTML(cancelLabel)%> title=<%=StringEscapeUtils.escapeHTML(cancelLabel)%> id="BTN_CANCEL"  onclick="cancelAlerts(event)" onkeydown="return fnHandleAlertBtn(event)" name=<%=StringEscapeUtils.escapeHTML(cancelLabel)%> /></oj-button><%
                                }
                            if(!"S".equalsIgnoreCase(AlertType)){
                                if ("O".equalsIgnoreCase(AlertType)) {
                                    //FCUBS11.1 CROSSBROWSER changes starts here  //fc11.1wb changes
                                      if(screenType.equalsIgnoreCase("WB") && ("N".equalsIgnoreCase(autoOvdFlag)) && ( "N".equalsIgnoreCase(ssoReq)) ) {//25402086   SSOREQ added
                                        if( "N".equalsIgnoreCase(multiAuthRequired)) {
                                         %>
										 <!--Fix for 26225411-->
										 <!--<input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(localAuthLabel)%> title=<%=StringEscapeUtils.escapeHTML(localAuthLabel)%> id="BTN_LOCALAUTHACCEPT" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="handleLocalAuth()"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(localAuthLabel)%> type="button"/>-->
										 <oj-button chroming="borderless"  label=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> id="BTN_ACCEPT"  onclick="closeAlerts(event)" onkeydown="return fnHandleAlertBtn(event)" name=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> title=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> /></oj-button><%
                                        }else {
                                         %><oj-button chroming="solid"   class="btn-warning"  label=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> title=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> id="BTN_ACCEPT"  onclick="closeAlerts(event)" onkeydown="return fnHandleAlertBtn(event)" name=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> /></oj-button><%
                                        }
                                        if(rejectFlagRequired.equalsIgnoreCase("Y")) {
                                          %><oj-button chroming="borderless"    class="btn-error"  label=<%=StringEscapeUtils.escapeHTML(rejectLabel)%> id="BTN_REJECT"  onclick="handleRejectTransaction()" onkeydown="return fnHandleAlertBtn(event)" name=<%=StringEscapeUtils.escapeHTML(rejectLabel)%>  title=<%=StringEscapeUtils.escapeHTML(rejectLabel)%>  /></oj-button><% 
                                        }
                                    } else {
                                    %><oj-button chroming="solid"   class="btn-warning"   label=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> title=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> id="BTN_ACCEPT"  onclick="closeAlerts(event)" onkeydown="return fnHandleAlertBtn(event)" name=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> /></oj-button><%
                                    }
                                } else {
                            %><oj-button chroming="<%=StringEscapeUtils.escapeHTML(okBtnChroming)%>" label=<%=StringEscapeUtils.escapeHTML(okLabel)%> class="<%=StringEscapeUtils.escapeHTML(okBtnClass)%>" title=<%=StringEscapeUtils.escapeHTML(okLabel)%> id="BTN_OK" onclick="closeAlerts(event)"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(okLabel)%> /></oj-button><%
                                }
                               
                            } else {
                            %><oj-button chroming="outlined"  label=<%=StringEscapeUtils.escapeHTML(exitLabel)%> title=<%=StringEscapeUtils.escapeHTML(exitLabel)%> id="BTN_EXIT"  onclick="exitApplication()"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(exitLabel)%> ></oj-button><oj-button chroming="solid"  class="action-button-primary" label=<%=StringEscapeUtils.escapeHTML(loginLabel)%> id="BTN_LOGIN"  onclick="openLogin()"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(loginLabel)%> title= <%=StringEscapeUtils.escapeHTML(loginLabel)%> ></oj-button><%
                        }
                                %><%
                          }%>
                    </div>
                 
       
        </oj-dialog>
        </div>
    </body>
</html>
