<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : smserr.jsp
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
--------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String Strlang         = (String)session.getAttribute("LANG");
    String StrlangISOMap   = (String)session.getAttribute("LANGISOMAP");
    String StrUserId       = (String) session.getAttribute("USERID");
    String entity         = (String) session.getAttribute("ENTITY");
    String strTheme     = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String ieCss         = (String)session.getAttribute("IECSS");
    FCUserGlobals Objuc    = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
    
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
     
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String smsErrors = (String)itemDescMap.get("LBL_SMS_ERRORS");
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <HEAD>
        <TITLE><%=StringEscapeUtils.escapeHTML(smsErrors)%></TITLE>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link id="LINKCSS" href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes -->
        <% String errcodes = FCUtility.validateParameter((String)request.getAttribute("errcodes")); %>

        <script language="JavaScript" src="Script/JS/OvrdMsgs.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script language="JavaScript">
            var dlgArg = window.dialogArguments;
            function checkErr() {
                dlgArg.mainWin.frames["FrameMenu"].fnHideProcess();
                debug(dlgArg.mainWin, "My Message", 'P');
                var err = document.all.errors.value;	
       
                //ashok added the code that exist from the error in case of file not found error.
                if(err=="") {
                    var lblFunctionAvailable  =
                    dlgArg.mainWin.frames["Global"].getItemDesc("LBL_FUNCTION_AVAILABLE");
                    alert(lblFunctionAvailable);
                    dlgArg.mainWin.fnExit(window);
                    dlgArg.mainWin.frames["FrameToolbar"].showToolbar("","","");
                    //return;
                } else {
                    try{
                        var xmlDoc = new ActiveXObject("Msxml2.DOMDocument.6.0");
                    }catch(e){
                        var xmlDoc = new ActiveXObject("Msxml2.DOMDocument.4.0");
                    }
                    xmlDoc.async = false;
                    xmlDoc.loadXML('<RESPONSE>'+err+'</RESPONSE>');
                    var elem = xmlDoc.selectSingleNode("//RESPONSE");
                    if(elem != null) {
                        var nodeList = elem.selectNodes("//MESSAGE");
                        if(nodeList.length > 0) {
                            var node = elem.selectSingleNode("//MESSAGE");
                            var attr = node.getAttribute("TYPE");
                            var message = "";
                            if(nodeList.length > 0) {
                                for(var i = 0; i < nodeList.length; i++) {
                                            node = nodeList.item(i);
                                            message = message + node.text;
                                            message = message +"~";
                                }            	
                                var returnVal = "";
                                returnVal = window.showModalDialog("ExtOVRDMSGS.jsp?type="+attr, message,"dialogLeft:325;dialogTop:270;dialogHeight:200px;dialogWidth:400px;resizable:no;scroll:no;status:no");				
                                if(message=='Rights for this user have changed.Wait for the browser to be repainted!!~') {
                                    parwin.location.href='fccmain.html';
                                }
                    
                                //ashok added this. Any window opened through loadChildWindow() needs to be exited as given bellow.
                                //self.close();
                                dlgArg.mainWin.fnExit(window);
                        }
                    }
                }
            }
        }
    
        //ashok do not comment, as the post method is required.
        function post() {
            //do nothing
        }
        </script>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    </HEAD>
    <BODY bgcolor="#FFFFFF" onload="checkErr()">
        <input type="hidden" name="errors" value="<%= StringEscapeUtils.escapeHTML(errcodes) %>">
    </BODY>
</HTML>
