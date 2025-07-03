<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : Alert_ELCM.jsp
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
	** Modified On         : 20-MAY-2014
	** Modified Reason     : Preventing user to save when override is present
	** Search String       : 9NT1525_1202_RETRO_18817591 

Copyright © 2004-2016 by Oracle Financial Services Software Limited..
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
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<!--<%@ page import="com.ofss.fcc.common.BranchParam"%>--> <!-- Fix for Bug No :17857705 --> <!-- Fix for 18805118  -->
<%@ page import="java.util.Map"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String ieCss            = "";
    String browserCSS       = "";
    String Strlang          = "";
    String StrlangISOMap    = "";
    String font = "M";//HTML5 Changes
    String logintheme = "FlexNewUI.css";//HTML5 Changes
    if(jsParser == null){
        String userAgent = request.getHeader("USER-AGENT").toUpperCase();
       if(userAgent.contains("MSIE") || (userAgent.contains("TRIDENT") && userAgent.contains("RV"))) {// Fix for 18668581-ie11 Changes
        
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
    String ssoReq = BranchConstants.SSO_REQD; /*Fix for 18805118*/
    //(String)BranchParam.getInstance().getCacheFBTBParams().get("SSO_INSTALLED");
    /*Fix for Bug No :17857705 ends */
    String StrUserId         = (String) session.getAttribute("USERID");    
    String entity         = (String) session.getAttribute("ENTITY");
    String branchIdentifier  = BranchConstants.BRANCH_CENTRALIZED;
   /* # BUG 15978732 fixes start */ 
    String strTheme        = FCUtility.validateParameter(request.getParameter("THEME"));
    String message         = FCUtility.validateParameter(request.getParameter("MESSAGE"));
    String screenType      = FCUtility.validateParameter(request.getParameter("SCREENTYPE"));//FCUBS11.1 CROSSBROWSER changes 
    String parentSqNo           = FCUtility.validateParameter(request.getParameter("PARENTSQNO"));
    /* # BUG 15978732 fixes ends*/ 
    if (screenType == null)
        screenType = "NONWB";
   /* # BUG 15978732 fixes start */ 
    String rejectFlagRequired  = FCUtility.validateParameter(request.getParameter("REJECTREQUIRED"));//FCUBS11.1 WB Changes
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
    String AlertType       = FCUtility.validateParameter(request.getParameter("MSG_TYPE"));

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
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
   
    
    String AlertMsg         = (String) itemDescMap.get("LBL_ALERT_MSG_" + AlertType);
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

    String imgSmlCLSName    =  "ICOAlert_" + AlertType;
    //String imgSmlWithPath  = "Images/"+strTheme.substring(0,strTheme.indexOf(".css"))+"/" + imgSmlName;
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <script type="text/javascript" src="Script/JS/Alert_ELCM.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil_ELCM.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript">
            var error = '<%=StringEscapeUtils.escapeJavaScript(error)%>';
            var errorType = '<%=StringEscapeUtils.escapeJavaScript(errorType)%>';
            var timestamp = '<%=StringEscapeUtils.escapeJavaScript(timestamp)%>';
            var funcid = '<%=StringEscapeUtils.escapeJavaScript(funcid)%>';
			var seqNo = '<%=StringEscapeUtils.escapeJavaScript(seqNo)%>';/* Changes for Undefined Seq no*/
            var ssoReq = "<%=StringEscapeUtils.escapeJavaScript(ssoReq)%>"; /*Fix for 19007451*/            
            var parentSqNo = "<%=StringEscapeUtils.escapeJavaScript(parentSqNo)%>";
            var alertType = "I";
            var mainWin = parent.mainWin;
			 parent.alertJSPPresent = true; /* 9NT1525_1202_RETRO_18817591  */
            <%
            if (AlertType != null) {
            %>
                alertType = '<%=StringEscapeUtils.escapeJavaScript(AlertType)%>';
            <%
            }
            %>
            function chkErr() {
                /*if(mainWin.document.getElementById("TlBarOper"))
                    mainWin.showToolbar('', '', '');*/
                if (error != 'null') {
                    var err;
                    var err_code;
                    var msgArr = fnBuildMsgArr(error);
                    for (var i in msgArr) {
                        err_code = i + "~";
                        err = msgArr[i] + "~";
                    }
                    err_code = err_code.substring(0,err_code.length-1);
                    err = err.substring(0,err.length-1);
                    var alertXML = fnBuildAlertXML(err_code,errorType,err);
                    parent.mask();
                    parent.showAlerts(alertXML, errorType);
                    parent.alertAction = "UNMASK";
                    if(parent.document.getElementById("testwin") != null){
                        parent.fnExit(parent.document.getElementById("testwin"),seqNo);/* Changes for Undefined Seq no*/
                    }
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
                    fnBuildAlertHTML(alertMsgTitle, imageClass, parentSqNo);
                    /*Fix for Bug No :17857705 starts*/
                     parent.mask();
                    /*Fix for Bug No :17857705 ends*/
                    resize_iframe();
                }
            }
            
            function callCloseAlert(event) {
                closeAlerts(event,parentSqNo);
            }
            
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    </head>
    <body onload="chkErr()" oncontextmenu="return false;" onkeydown="return disableCommonKeys(event);" onhelp="return false;">
        <div id="DIVif1" class="WNDcontainerModal">
            <DIV style="width: 560px;" class=WNDtitlebar id="wndtitle" onmousedown="startDrag(event)">
                <B class="BTNicon"><span class="ICOalert2"></span></B>	
                <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(AlertMsg)%></h1>            	
            </DIV>
            <DIV class="WNDcontentmodal" id="wndwidth">
		<DIV class="DIVtblbox1outer2">
                    <DIV id="tbl-container" class="DIVtblbox2">
                        <%
                        if(AlertType != null) {
                            if ("E".equalsIgnoreCase(AlertType) || "O".equalsIgnoreCase(AlertType)) {
                            %>
                                <TABLE id="ERRTBL" class="TBLtwo" border=0 cellSpacing=0 cellPadding=0 width="100%" summary="Override Messages">
                                    <THEAD>
                                        <TR>
                                            <TH width="85%" scope=col><SPAN tabindex="0"  class=SPNtbltwoH title="<%=StringEscapeUtils.escapeHTML(AlertMsgDESC)%>"><%=StringEscapeUtils.escapeHTML(AlertMsgDESC)%></SPAN></TH>
                                            <TH class="THLast" width="15%" scope=col><SPAN tabindex="0" class=SPNtbltwoH title="<%=StringEscapeUtils.escapeHTML(AlertMsgCODE)%>"><%=StringEscapeUtils.escapeHTML(AlertMsgCODE)%></SPAN></TH>
                                        </TR>
                                    </THEAD>
                                    <TBODY>
                                    </TBODY>
                                </TABLE>
                            <%
                            } else {
                            %>
                                <TABLE id="ERRTBL" class="TBLtwo" border=0 cellSpacing=0 cellPadding=0 width="100%" summary="Alert">
                                    <THEAD>
                                        <TR>
                                            <TH class="THSinglerow" scope=col><SPAN tabindex="0"  class=SPNtbltwoH title="<%=StringEscapeUtils.escapeHTML(AlertMsg)%>"><%=StringEscapeUtils.escapeHTML(AlertMsg)%></SPAN></TH>
                                        </TR>
                                    </THEAD>
                                    <TBODY>                                           
                                    </TBODY>
                                </TABLE>
                            <%
                            } 
                        }
                        %>
                    </DIV>
                    <%--11.1 Remarks Changes - Starts Here--%>
                    <%
                    if(!screenType.equalsIgnoreCase("WB")){	  //FCUBS11.1 CROSSBROWSER Changes
                        if ("O".equalsIgnoreCase(AlertType) && !"O".equalsIgnoreCase(ovdScrType)) {
                            if ("X".equalsIgnoreCase(ovdRoutingType)) {
                                %>
                                <table class="TBLtwo" id="RMKTBL" cellpadding="0" width="100%" cellspacing="2" border="0">
                                    <tr>
                                        <th scope="row" valign="top" width="30%"><label class="LBLauto" for="REMARKS"><%=StringEscapeUtils.escapeHTML(makerOvdRemarks)%></label></Th>
                                        <td width="70%"><label class="LBLstd" for="REMARKS"></label><textarea id="REMARKS" cols="43" rows="1" style="width:99%" ></textarea></td>
                                    </tr>                                    
                                </table>
                                <%
                            }
                        }
                    }else if(screenType.equalsIgnoreCase("WB")){
                    %>
                        <label class="LBLinv" for="REMARKS"></label><input type="hidden" name="REMARKS" id = "REMARKS" value = ""></input>
                    <%
                    }
                    %>
                    <%--11.1 Remarks Changes - Ends Here --%>
		</DIV>
        
                <div class="WNDfootermodal">
                    <div class="WNDfbuttons">
                        <table role="presentation" width="99%" border="0" cellspacing="0" cellpadding="0" id="TBLPageTAB_FOOTER">
                             <tbody>
                                 <tr>
                                   <td valign="top" width="98%"/>
                                   <td style="padding-left:10px" nowrap="nowrap">
                        <%
                        if(AlertType != null) {
                            if(!"S".equalsIgnoreCase(AlertType)){
                                if ("O".equalsIgnoreCase(AlertType)) {
                                    //FCUBS11.1 CROSSBROWSER changes starts here  //fc11.1wb changes
                                      if(screenType.equalsIgnoreCase("WB") && ("N".equalsIgnoreCase(autoOvdFlag))) {%>
                                         <input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(localAuthLabel)%> title=<%=StringEscapeUtils.escapeHTML(localAuthLabel)%> id="BTN_LOCALAUTHACCEPT" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="handleLocalAuth()"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(localAuthLabel)%> type="button"/><input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> id="BTN_ACCEPT" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="closeAlerts(event)" onkeydown="return fnHandleAlertBtn(event)" name=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> title=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> type="button"/><%
                                        if(rejectFlagRequired.equalsIgnoreCase("Y")) {
                                          %><input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(rejectLabel)%> id="BTN_REJECT" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="handleRejectTransaction()" onkeydown="return fnHandleAlertBtn(event)" name=<%=StringEscapeUtils.escapeHTML(rejectLabel)%>  title=<%=StringEscapeUtils.escapeHTML(rejectLabel)%>  type="button"/><% 
                                        }
                                    } else {
                                    %><input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> title=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> id="BTN_ACCEPT" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="closeAlerts(event)" onkeydown="return fnHandleAlertBtn(event)" name=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> type="button"/><%
                                    }
                                } else {
                            %><input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(okLabel)%> title=<%=StringEscapeUtils.escapeHTML(okLabel)%> id="BTN_OK" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="callCloseAlert(event);"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(okLabel)%> type="button"/><%
                                }
                                if ("C".equalsIgnoreCase(AlertType) || "O".equalsIgnoreCase(AlertType)) {
                                %><input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(cancelLabel)%> title=<%=StringEscapeUtils.escapeHTML(cancelLabel)%> id="BTN_CANCEL" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="cancelAlerts(event)" onkeydown="return fnHandleAlertBtn(event)" name=<%=StringEscapeUtils.escapeHTML(cancelLabel)%> type="button"/><%
                                }
                            } else {
                            %>
                            <!--<input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(loginLabel)%> id="BTN_LOGIN" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="openLogin()"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(loginLabel)%> title= <%=StringEscapeUtils.escapeHTML(loginLabel)%> type="button"/><input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(exitLabel)%> title=<%=StringEscapeUtils.escapeHTML(exitLabel)%> id="BTN_EXIT" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="exitApplication()"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(exitLabel)%> type="button"/>-->
                            <%
                            if(! "Y".equalsIgnoreCase(ssoReq)){
                            %>
                            <input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(loginLabel)%> id="BTN_LOGIN" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="openLogin()"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(loginLabel)%> title= <%=StringEscapeUtils.escapeHTML(loginLabel)%> type="button"/>
                            <%
                            }
                            %>
                            <input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(exitLabel)%> title=<%=StringEscapeUtils.escapeHTML(exitLabel)%> id="BTN_EXIT" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="exitApplication()"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(exitLabel)%> type="button"/>
                            <%
                            }
                            %>
                        
                                </td>
                                 </tr>
                             </tbody>
                        </table><%
                          }%>
                    </div>
                </div>
            </DIV>
        </div>
    </body>
</html>
