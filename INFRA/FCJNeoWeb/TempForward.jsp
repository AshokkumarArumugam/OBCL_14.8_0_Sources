<%/*------------------------------------------------------------------------------------------------------
**
** File Name    : TempForward.jsp
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
-------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="java.util.Map" %>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<html>
  <head>
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	 <meta http-equiv="cache-control" content="no-cache">
         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
      <meta http-equiv="Pragma" content="no-cache">
      <meta http-equiv="Expires" content=0>
      <base target="_self" >
         
    <title></title>
	<%
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    %>
      <%
      String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
       String lang         = (String)session.getAttribute("LANG");
       String strUserId       = (String) session.getAttribute("USERID");
       String entity       = (String) session.getAttribute("ENTITY");
       String theme       = (String) session.getAttribute("theme");    //25081813 added
       Map itemDescMap = null;
        if("NO".equals(branchIdentifier))
            itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+lang + "~" + entity, branchIdentifier,strUserId);
        else
            itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+lang + "~" + entity, null,strUserId);
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");
        String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
        /* # BUG 15978732 fixes start */ 
        String funcid =FCUtility.validateParameter( request.getParameter("funcid"));
        String uiName = FCUtility.validateParameter(request.getParameter("uiName"));
        String msgType =FCUtility.validateParameter( request.getParameter("msgType"));
        String actionType = FCUtility.validateParameter(request.getParameter("actionType"));
        String timestamp = FCUtility.validateParameter(request.getParameter("timestamp"));
        String numeric =FCUtility.validateParameter( request.getParameter("numeric"));
        String inTime = FCUtility.validateParameter(request.getParameter("inTime"));
        String description =FCUtility.validateParameter( request.getParameter("description"));
        String fileName =  FCUtility.validateParameter(request.getParameter("fileName"));
        String action = FCUtility.validateParameter(request.getParameter("action"));
        String XREF = FCUtility.validateParameter(request.getParameter("XREF"));
        String date = FCUtility.validateParameter(request.getParameter("date"));
        String timeStamp = FCUtility.validateParameter(request.getParameter("timeStamp"));
        String actionCode = FCUtility.validateParameter(request.getParameter("actionCode"));
        String taskId =  FCUtility.validateParameter(request.getParameter("taskId"));
        if(taskId == null) taskId = "";
        
        
        String overrideAllowed = FCUtility.validateParameter(request.getParameter("overrideAllowed"));
        String type = FCUtility.validateParameter(request.getParameter("type"));
        String Advice = FCUtility.validateParameter(request.getParameter("Advice"));
        String BRAdvice = FCUtility.validateParameter(request.getParameter("BRAdvice"));
        String FUNCTIONID =FCUtility.validateParameter( request.getParameter("FUNCTIONID"));
        String parentArgs = FCUtility.validateParameter(request.getParameter("parentArgs"));       
        String txnBranch = FCUtility.validateParameter(request.getParameter("txnBranch"));
        String TYPE = FCUtility.validateParameter(request.getParameter("TYPE"));
        String cifSigId = FCUtility.validateParameter(request.getParameter("cifSigId"));
        String specimenNo =FCUtility.validateParameter( request.getParameter("specimenNo"));
        String sigType = FCUtility.validateParameter(request.getParameter("sigType"));
        String documentID = FCUtility.validateParameter(request.getParameter("documentID")); 
        String dashboardArgs = FCUtility.validateParameter(request.getParameter("dashboardArgs"));   
        String cifId = FCUtility.validateParameter(request.getParameter("cifId"));
        //FCUBS12.0.1 Fix for Bug 14761667 starts
        String srcType =FCUtility.validateParameter( request.getParameter("srcType"));
        //FCUBS12.0.1 Fix for Bug 14761667 ends
		String status = FCUtility.validateParameter(request.getParameter("status"));
		String USERID =FCUtility.validateParameter( request.getParameter("USERID"));
		String BRANCHCODE = FCUtility.validateParameter(request.getParameter("BRANCHCODE"));
		String DENOMCCY = FCUtility.validateParameter(request.getParameter("DENOMCCY"));
		String ENTITY = FCUtility.validateParameter(request.getParameter("ENTITY"));
		String refNo = FCUtility.validateParameter(request.getParameter("refNo"));//12.0.3 Data entry image
    	String iframeLaunch = FCUtility.validateParameter(request.getParameter("iframeLaunch")); //session expiry change
   // String debugFlag =  FCUtility.validateParameter(request.getParameter("debugFlag"));//debug revert
                /* # BUG 15978732 fixes end */ 
    String fromSummary =  FCUtility.validateParameter(request.getParameter("fromSummary"));
   // String userLevelDbgEnabled = FCUtility.validateParameter(request.getParameter("userLevelDbgEnabled"));//debug revert
	String tabId =FCUtility.validateParameter( request.getParameter("tabId"));
	String sectionName = FCUtility.validateParameter( request.getParameter("sectionName"));/*Fix for 20805413*/
	   String wfTxn = FCUtility.validateParameter(request.getParameter("wfTxn"));/*Fix for 21557986*/
            String wfStg = FCUtility.validateParameter(request.getParameter("wfStg"));/*Fix for 21557986*/
    
  %>
    <script language="JavaScript">
      var action = '<%= StringEscapeUtils.escapeJavaScript(action)%>';

      function submitForm() {
          document.tempform.action = action;

          document.tempform.submit();

      }
    </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
  </head>

  <body onload="submitForm();">
        <form name="tempform" action="SMSStartLogServlet" method="post">
            <input type="hidden" name="X-CSRFTOKEN"
                   value='<%=StringEscapeUtils.escapeHTML((String)session.getAttribute("X-CSRFTOKEN"))%>'></input>
            <input type="hidden" name="funcid"
                   value="<%=StringEscapeUtils.escapeHTML(funcid)%>"/>
               <input type="hidden" name="iframeLaunch"
                   value="<%=StringEscapeUtils.escapeHTML(iframeLaunch)%>"/>          <!-- //session expiry change -->

            <input type="hidden" name="uiName"
                   value="<%=StringEscapeUtils.escapeHTML(uiName)%>"/>
            <input type="hidden" name="msgType"
                   value="<%=StringEscapeUtils.escapeHTML(msgType)%>"/>
            <input type="hidden" name="actionType"
                   value="<%= StringEscapeUtils.escapeHTML(actionType)%>"/>
            <input type="hidden" name="timestamp"
                   value="<%=StringEscapeUtils.escapeHTML(timestamp)%>"/>
            <input type="hidden" name="numeric"
                   value="<%=StringEscapeUtils.escapeHTML(numeric)%>"/>
            <input type="hidden" name="inTime"
                   value="<%=StringEscapeUtils.escapeHTML(inTime)%>"/>
            <input type="hidden" name="description"
                   value="<%=StringEscapeUtils.escapeHTML(description)%>"/>
            <input type="hidden" name="fileName"
                   value="<%=StringEscapeUtils.escapeHTML(fileName)%>"/>
            <input type="hidden" name="XREF"
                   value="<%=StringEscapeUtils.escapeHTML(XREF)%>"/>
            <input type="hidden" name="date"
                   value="<%=StringEscapeUtils.escapeHTML(date)%>"/>
            <input type="hidden" name="timeStamp"
                   value="<%=StringEscapeUtils.escapeHTML(timeStamp)%>"/>
            <input type="hidden" name="taskId"
                   value="<%=StringEscapeUtils.escapeHTML(taskId)%>"/>
            <input type="hidden" name="overrideAllowed"
                   value="<%=StringEscapeUtils.escapeHTML(overrideAllowed)%>"/>
            <input type="hidden" name="type"
                   value="<%=StringEscapeUtils.escapeHTML(type)%>"/>
            <input type="hidden" name="Advice"
                   value="<%=StringEscapeUtils.escapeHTML(Advice)%>"/>
            <input type="hidden" name="BRAdvice"
                   value="<%=StringEscapeUtils.escapeHTML(BRAdvice)%>"/>
            <input type="hidden" name="FUNCTIONID"
                   value="<%=StringEscapeUtils.escapeHTML(FUNCTIONID)%>"/>
            <input type="hidden" name="parentArgs"
                   value="<%=StringEscapeUtils.escapeHTML(parentArgs)%>"/>
            <input type="hidden" name="txnBranch"
                   value="<%=StringEscapeUtils.escapeHTML(txnBranch)%>"/>
            <input type="hidden" name="TYPE"
                   value="<%=StringEscapeUtils.escapeHTML(TYPE)%>"/>
            <input type="hidden" name="cifSigId"
                   value="<%=StringEscapeUtils.escapeHTML(cifSigId)%>"/>
            <input type="hidden" name="specimenNo"
                   value="<%=StringEscapeUtils.escapeHTML(specimenNo)%>"/>
            <input type="hidden" name="sigType"
                   value="<%=StringEscapeUtils.escapeHTML(sigType)%>"/>
            <input type="hidden" name="documentID"
                   value="<%=StringEscapeUtils.escapeHTML(documentID)%>"/>
            <input type="hidden" name="dashboardArgs"
                   value="<%=StringEscapeUtils.escapeHTML(dashboardArgs)%>"/>
            <input type="hidden" name="cifId"
                   value="<%=StringEscapeUtils.escapeHTML(cifId)%>"/>
            <%--FCUBS12.0.1 Fix for Bug 14761667 starts--%>
            <input type="hidden" name="srcType"
                   value="<%=StringEscapeUtils.escapeHTML(srcType)%>"/>
            <%--FCUBS12.0.1 Fix for Bug 14761667 starts--%>
			<input type="hidden" name="status"
                   value="<%=StringEscapeUtils.escapeHTML(status)%>"/>
			<input type="hidden" name="USERID"
                   value="<%=StringEscapeUtils.escapeHTML(USERID)%>"/>
			<input type="hidden" name="BRANCHCODE"
                   value="<%=StringEscapeUtils.escapeHTML(BRANCHCODE)%>"/>
			<input type="hidden" name="DENOMCCY"
                   value="<%=StringEscapeUtils.escapeHTML(DENOMCCY)%>"/>
			<input type="hidden" name="ENTITY"
                   value="<%=StringEscapeUtils.escapeHTML(ENTITY)%>"/>
			<input type="hidden" name="refNo"
                   value="<%=StringEscapeUtils.escapeHTML(refNo)%>"/><%--12.0.3 Data entry image--%>
     <%--<input type="hidden" name="debugFlag"
     value="<%=StringEscapeUtils.escapeHTML(debugFlag)%>"/> debug revert--%>
     <input type="hidden" name="fromSummary"
     value="<%=StringEscapeUtils.escapeHTML(fromSummary)%>"/>
     <%--<input type="hidden" name="userLevelDbgEnabled"
     value="<%=StringEscapeUtils.escapeHTML(userLevelDbgEnabled)%>"/> debug revert--%>
	 <input type="hidden" name="tabId"
                   value="<%=StringEscapeUtils.escapeHTML(tabId)%>"/>
	 <%--Fix for 20805413--%>
	<input type="hidden" name="sectionName"
		   value="<%=StringEscapeUtils.escapeHTML(sectionName)%>"/>
		     <input type="hidden" name="wfTxn"
                   value="<%=StringEscapeUtils.escapeHTML(wfTxn)%>"/>
                     <input type="hidden" name="wfStg"
                   value="<%=StringEscapeUtils.escapeHTML(wfStg)%>"/>
                   
                 <%--Fix for 25081813 starts--%>
               <input type="hidden" name="theme"
               value="<%=StringEscapeUtils.escapeHTML(theme)%>"/>
                <%--Fix for 25081813 ends--%>
        </form>
    </body>
</html>