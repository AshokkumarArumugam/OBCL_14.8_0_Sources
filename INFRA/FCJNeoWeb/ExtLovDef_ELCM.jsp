<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtLovDef_ELCM.jsp
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

Copyright � 2004-2016 by Oracle Financial Services Software Limited..
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
--------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.branch.BranchLOVUtil"%>
<%@ page import="com.ofss.infra.handlers.LovHandler"%>
<%@ page import="com.ofss.fcc.common.LovInfo"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="java.util.*" %>
<%@ page import="com.ofss.fcc.branch.BrnUtil" %>

<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="com.ofss.infra.oindicator.OIndicator"%>

<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String clientHandlerEntry =  String.valueOf(System.currentTimeMillis());
    //String seqList = "";
    
    String Strlang          = (String)session.getAttribute("LANG");
    String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
    String StrUserId        = (String) session.getAttribute("USERID");
    String entity        = (String) session.getAttribute("ENTITY");
    String strTheme         = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/
    boolean isDebug         = ((Boolean) session.getAttribute("isDebug")).booleanValue();
    
    FCUserGlobals Objuc     = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);

    String imgPath = "Images/Ext"+strTheme.substring(0,strTheme.indexOf(".")); //Fix for Bug 16354738 - removed extra slash character from imgPath
    
    FBContext fbContext = new FBContext(StrUserId);
    BranchLogger brnLogger = new BranchLogger(StrUserId);
    fbContext.setBrnLogger(brnLogger);
    fbContext.setDebug(isDebug);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->User id="  + StrUserId);
/* # BUG 15978732 fixes start */ 
    
    String inLoadTime           =FCUtility.validateParameter( request.getParameter("inTime"));//Performance Changes
    String actionseqNo      = FCUtility.validateParameter((String)request.getAttribute("actionSeqNo"));
    String source       = FCUtility.validateParameter(request.getParameter("SourceCode"));
    String containerId  = FCUtility.validateParameter(request.getParameter("containerId"));
    String blockId      = FCUtility.validateParameter(request.getParameter("blockId"));
    String fieldName    = FCUtility.validateParameter(request.getParameter("fldName"));
    String FieldLabel   = FCUtility.validateParameter(request.getParameter("FieldLabel"));
    String lovId        = FCUtility.validateParameter(request.getParameter("lovId"));
    String screentype   = FCUtility.validateParameter(request.getParameter("screentype"));
    String lovType      = FCUtility.validateParameter(request.getParameter("lovType"));
    String txnBranch = FCUtility.validateParameter(request.getParameter("txnBranch"));
    String lovSrcElem   = FCUtility.validateParameter(request.getParameter("lovSrcElem"));
    String isME         = FCUtility.validateParameter(request.getParameter("isME"));
    String singleView    = FCUtility.validateParameter(request.getParameter("singleView"));
    String istxnBrn     = FCUtility.validateParameter(request.getParameter("istxnBrn"));
    String debugWindow = FCUtility.validateParameter(request.getParameter("DEBUGWINDOW")); //logging changes
    String seqNo = FCUtility.validateParameter(request.getParameter("seqNo")); //logging changes
    String signonSerial = FCUtility.validateParameter(request.getParameter("signonSerial")); //logging changes
    String isAutoLOV = FCUtility.validateParameter(request.getParameter("isAutoLOV")); //logging changes
    /* # BUG 19619967 fixes start */
    String maximize      = FCUtility.validateParameter(request.getParameter("maximize"));
    /* # BUG 19619967 fixes start */
    
    String appSessionId = request.getRequestedSessionId();
 /* # BUG 15978732 fixes end */ 
    
    String ieCss         = (String)session.getAttribute("IECSS");
    /* # BUG 15978732 fixes start */ 
    String bindFldsStr  = FCUtility.validateParameter(request.getParameter("bindFldsStr"));
    /* # BUG 15978732 fixes end*/ 
	//Bug 14836553 Changes Starts
    String offlineLov  = request.getParameter("offlineLov");
    //Bug 14836553 Changes Ends
    String pageCount = "";
    
        /* # BUG 15978732 fixes start */ 
    if(FCUtility.validateParameter(request.getParameter("pageCount")) != null)
        pageCount   = FCUtility.validateParameter(request.getParameter("pageCount"));
    String  fieldList       = FCUtility.validateParameter(request.getParameter("fldList"));
    String  rednFldTypeList = FCUtility.validateParameter(request.getParameter("redFldTypeList"));
    String  labelList       = FCUtility.validateParameter(request.getParameter("lblList"));
    String  reductionList   = FCUtility.validateParameter(request.getParameter("redLIst"));
    String  visibleList     = FCUtility.validateParameter(request.getParameter("vLIst"));
    /* # BUG 15978732 fixes end */ 
    
           
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->source="  + source);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->containerId="  + containerId);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->blockId="  + blockId);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->fieldName="  + fieldName);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->FieldLabel="  + FieldLabel);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->lovId="  + lovId);
    String lovResult            = "";
    String rednFldType          =  "";
    String dataTypes            = "";
    String rednFldval           = FCUtility.validateParameter( request.getParameter("rednFldval"));  /* # BUG 15978732 fixes  */ 
    String infoMsg              = "";
    String infoImg              = "";
    String [] fldsArray         = null;
    String [] rednFldTypeArray  = null;
    String [] redFldArray       = null;
    String [] labsArray         = null;
    String [] VisbArray         = null;
    String labelArrLength       = "";
    String lovDataFlag         = "false";
    String appLog = "";
    String webLog = "";
    LovHandler lovDef = new LovHandler();
    LovInfo lovInfo= new LovInfo();
    
    Map mpLovinfo = new HashMap();
    Map mpLovData = new HashMap();
    Map webLogParam = new HashMap();
    
    boolean decentralizedFlow = false;
    try {
            if ("WB".equalsIgnoreCase(screentype)) {
                decentralizedFlow = new BrnUtil().getCachedFunctionDefn(fbContext, containerId, Objuc.getLangCd()).isDecentralizedFlow();
            }
        } catch (Exception e) {
            decentralizedFlow = false;
        }
    
    
   try{
     if (("WB".equalsIgnoreCase(screentype) && "N".equalsIgnoreCase(lovType)) || ("N".equalsIgnoreCase(branchIdentifier) && decentralizedFlow) || !OIndicator.getInstance().isOnline()) {
        if(pageCount == null || "".equalsIgnoreCase(pageCount)){
            lovInfo = BranchLOVUtil.BranchLovfetch(fbContext,source,containerId ,lovId,Strlang,bindFldsStr,rednFldval,Objuc.getCurrBranch(),Objuc.getCurrUser());	 
            fieldList =  lovInfo.getFieldList();
            rednFldTypeList = lovInfo.getRednFldTypeList();
            labelList =  lovInfo.getLabelList();
            reductionList = lovInfo.getReductionList();
            visibleList = lovInfo.getVisibleList();
            pageCount       = lovInfo.getTotalPages();
            lovResult       = lovInfo.getLovResult();
           // seqList         = lovInfo.getSeqList();
            //webLogParam.put("SEQ_LIST",seqList);
            lovDataFlag     = "true";
        }
    } else if(containerId.substring(2,3).equals("S")){
        fbContext.getBrnLogger().dbg("Summary screennnnnn::::");
        webLogParam.put("LOG","");
    /* security fixes for WF starts */   
        fieldList =  lovId+"|";
        labelList =  FieldLabel+"|";
        reductionList = "Y|";
        rednFldTypeList = "";
        visibleList = "Y|";
          /* security fixes for WF ends */    if("N".equalsIgnoreCase(BranchConstants.LOV_DATA_FETCH) && "".equalsIgnoreCase(rednFldval)){
            pageCount       = "1";
            lovResult       = "";
        }else{
            lovInfo = lovDef.getLovSummaryData(fbContext, Objuc,source,containerId,blockId,fieldName,lovId,rednFldType,txnBranch,rednFldval,seqNo,appSessionId,lovType);
            pageCount       = lovInfo.getTotalPages();
            lovResult       = lovInfo.getSearchResults();
            //seqList         = lovInfo.getSeqList();
            //webLogParam.put("SEQ_LIST",seqList);
        }
        
        lovDataFlag     = "true";
    } else {
        if(pageCount == null || "".equalsIgnoreCase(pageCount) ){
            lovInfo = lovDef.getLovDefn(fbContext, Objuc,source,containerId,blockId,fieldName,lovId,txnBranch,bindFldsStr,rednFldval,"",debugWindow,seqNo,lovType,isAutoLOV,"");//Exact fetch Changes
            if(lovInfo.getErrorMessage() != null && lovInfo.getErrorMessage().contains("SM-00420")){//12.1 session expiry fix 2
                String LErrorDesc = FCUtility.getErrorRespStr(new BrnUtil().getBranchErrorMsg(null, "SM-00420", true, Strlang));
                RequestDispatcher rd = request.getRequestDispatcher("Alert.jsp?MESSAGE=&ERROR=" + LErrorDesc + "&ERROR_TYPE=E");
                rd.forward(request, response);
                }
            fieldList       = lovInfo.getFieldList();
            rednFldTypeList = lovInfo.getRednFldTypeList();
            labelList       = lovInfo.getLabelList();
            reductionList   = lovInfo.getReductionList();
            visibleList     = lovInfo.getVisibleList();
            pageCount       = lovInfo.getTotalPages();
            lovResult       = lovInfo.getLovResult();
            lovDataFlag     = "true";
            //appLog  = lovInfo.getAppLog();
            //webLog = lovInfo.getWebLog();
            //seqList         = lovInfo.getSeqList();
            //webLogParam.put("SEQ_LIST",seqList);
        }
    }
    /* security fixes for WF starts*/
    labelList = labelList.replaceAll("_SLH_","/");//Fix for 19412812 
    fldsArray           = fieldList.split("\\|",-1);
    rednFldTypeArray    = rednFldTypeList.split("\\|",-1);
    redFldArray         = reductionList.split("\\|",-1);
    labsArray           = labelList.split("\\|",-1);
    VisbArray           = visibleList.split("\\|",-1);
    /* security fixes for WF ends */
    if (labsArray.length == 2 && "".equalsIgnoreCase(labsArray[1]))
        labelArrLength = "1";
    else
        labelArrLength      = Integer.toString(labsArray.length);
    
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->fldsArray.length="  + fldsArray.length);
    
    }catch(Exception e){
        pageCount="E";
    }
    //   Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+BranchConstants.DEFAULT_LANGCODE, branchIdentifier,StrUserId);
       Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
    String ofLabel = (String)itemDescMap.get("LBL_OF");
    String lblGoToPg  = (String)itemDescMap.get("LBL_GOTO_PAGE");
    String fetchLbl  = (String)itemDescMap.get("LBL_FETCH");
    String searchLbl     = (String)itemDescMap.get("LBL_SEARCH");
	//change for bug id : 14842317 starts
	  String caseSensitive = (String)itemDescMap.get("LBL_CASE_SENSITIVE");
    //change for bug id : 14842317 ends
    String recordsPerPage = (String)itemDescMap.get("LBL_RECORDS_PER_PAGE");
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String searchRslt       = (String)itemDescMap.get("LBL_SEARCH_RESULT");
    if(pageCount != null ){
        if("10".equalsIgnoreCase(pageCount)){
            infoMsg = (String)itemDescMap.get("LBL_MORE_RECORDS");
            infoImg = "INFO";
        }else if(!"10".equalsIgnoreCase(pageCount) && !"E".equalsIgnoreCase(pageCount)){
            infoMsg = (String)itemDescMap.get("LBL_OK");
            infoImg = "INFO";
            if("0".equalsIgnoreCase(pageCount) || "".equalsIgnoreCase(pageCount)){
                infoMsg = (String)itemDescMap.get("LBL_NO_RECORD");
                infoImg = "INFO";
            }
        }else if("E".equalsIgnoreCase(pageCount)){
            infoMsg = (String)itemDescMap.get("LBL_ERROR");
            infoImg = "INFO";
        }
    }
    //debugs
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->fldsArray="  + fldsArray);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->redFldArray="  + redFldArray);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->labsArray="  + labsArray);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->VisbArray="  + VisbArray);
   // fbContext.getBrnLogger().flush(StrUserId);
   /*String clientHandlerExit = String.valueOf(System.currentTimeMillis());
    webLogParam.put("LOG",fbContext.getBrnLogger().getLogString()+ webLog);
    if (("Y".equalsIgnoreCase(debugWindow) || "Y".equalsIgnoreCase(BranchConstants.DEBUG))) {
        if(session.getAttribute("WEBLOG")!=null )
            session.removeAttribute("WEBLOG");
        if(!"".equals(seqList))
            request.getSession(false).setAttribute("WEBLOG", webLogParam);
    }*/
    
String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
    
%>
<HTML id="LovHTML" lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <HEAD>
         <TITLE><%=StringEscapeUtils.escapeHTML(FCUtility.validateParameter(request.getParameter("title")))%></TITLE><%-- BUG 15978732 fixes start --%>
		 <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link id="LINKCSS" href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>
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
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtLov_ELCM.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil_ELCM.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    
        <script type="text/javascript">
            var alertAction         = "";
            var gscrPos        = 'template';
            var mainWin        = parent.mainWin;
            appDbg      = '<%= StringEscapeUtils.escapeJavaScript(appLog)%>';
            webDbg      = '<%= StringEscapeUtils.escapeJavaScript(webLog)%>';
            var actionseqNo               = '<%=StringEscapeUtils.escapeJavaScript(actionseqNo)%>';
            var debugWindow = '<%= StringEscapeUtils.escapeJavaScript(debugWindow)%>';
            var strTheme    = '<%= StringEscapeUtils.escapeJavaScript(strTheme)%>';
            var source         = '<%=StringEscapeUtils.escapeJavaScript(source)%>';
            var functionId     = '<%=StringEscapeUtils.escapeJavaScript(containerId)%>'; //	containerId wil be function id + stage id
            var blockId        = '<%=StringEscapeUtils.escapeJavaScript(blockId)%>';
            var fldName        = '<%=StringEscapeUtils.escapeJavaScript(fieldName)%>';
            var lovId          = '<%=StringEscapeUtils.escapeJavaScript(lovId)%>';
            var user_id        = '<%=StringEscapeUtils.escapeJavaScript(StrUserId)%>';
            var imagePath      = '<%=StringEscapeUtils.escapeJavaScript(imgPath)%>';
            var lovType        = '<%=StringEscapeUtils.escapeJavaScript(lovType)%>';	 //FCUBS10.3_WebBranch Changes chandra
            var labelArrLength = '<%=StringEscapeUtils.escapeJavaScript(labelArrLength)%>';
            var txnBranch      = '<%=StringEscapeUtils.escapeJavaScript(txnBranch)%>';
            var g_txnBranch    = '<%=StringEscapeUtils.escapeJavaScript(txnBranch)%>';
            var lovSrcElem     = '<%=StringEscapeUtils.escapeJavaScript(lovSrcElem)%>';
            var isME           = '<%=StringEscapeUtils.escapeJavaScript(isME)%>';
            var singleView     = '<%=StringEscapeUtils.escapeJavaScript(singleView)%>';
            var inLoadTime              = '<%=StringEscapeUtils.escapeJavaScript(inLoadTime)%>';//Performance Changes
            /* # BUG 19619967 fixes start */
            var maximize         = '<%=StringEscapeUtils.escapeJavaScript(maximize)%>';
            /* # BUG 19619967 fixes end */
            var istxnBrn       = '<%=StringEscapeUtils.escapeJavaScript(istxnBrn)%>';
            /* 12.0 Fortify Issue XSS Starts */
            var pageCount      = '<%=StringEscapeUtils.escapeJavaScript(pageCount)%>';
            /* 12.0 Fortify Issue XSS Ends */
            var lovDataFlag    = '<%=StringEscapeUtils.escapeJavaScript(lovDataFlag)%>';
				var offlineLov     = '<%=StringEscapeUtils.escapeJavaScript(offlineLov)%>';//Bug 14836553 Changes
            var redValue       = replaceAll(parent.redValue, "_SLH_", "/");//Fix for 18234116;
            var lovResult      ='';
            if(lovDataFlag == 'true')
                 lovResult      = '<%=StringEscapeUtils.escapeJavaScript(lovResult)%>';
            else
                lovResult      = parent.AUTOLovResult;
          /*  if(mainWin.DebugWindowFlg == "Y") {
                mainWin.serverDebugStmt =webDbg + "\n\n"+appDbg;
            }
            */    
            if(typeof(parent.fromChgBrn) != 'undefined') {
                brDIVWidth     = mainWin.document.getElementById("Div_AlertWin").style.width;
                brDIVHeight    = mainWin.document.getElementById("Div_AlertWin").style.height;
                brIFWidth      = mainWin.document.getElementById("Div_AlertWin").children[0].style.width;
                brIFHeight     = mainWin.document.getElementById("Div_AlertWin").children[0].style.height;
            }
            var fieldList = '<%=StringEscapeUtils.escapeJavaScript(fieldList)%>';
            var reductionList  = '<%=StringEscapeUtils.escapeJavaScript(reductionList)%>';
            
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>        
        <script type="text/javascript" src="Script/ExtJS/ExtUtil_ELCM.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    </HEAD>
    <BODY id="LovBody" CLASS="BDYform" oncontextmenu="return false;" onkeydown="return lovAccessKeys(event);" onload="displayMiniCharInfo();parseLovOnLoad();setHeights();fnSyncLovTableWidth();" onhelp="return false;">
        <DIV class="WNDcontainer" id="DIVWNDContainer">
            <div class="WNDtitlebar" id="WNDtitlebar" onmousedown="startDrag('ChildWin', event)">
                <B class="BTNicon"><span class="ICOflexcube"></span></B>
                <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(request.getParameter("title"))%></h1>
                <div class="WNDbuttons">
                    <a class="WNDcls" href="#" id ="WNDbuttons" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>"  onclick="fnExitLov()" onkeydown="return fnHandleLovBtn(event)">
                    <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                    </a>
                    <!-- # BUG 19619967 fixes start -->
                    <a class="WNDmax" href="#" id ="WNDmaxBTN" onblur="this.className='WNDmax'" onmouseover="this.className='WNDmaxH'" onfocus="this.className='WNDmaxH'" onmouseout="this.className='WNDmax'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MAXIMIZE"))%>"  onclick="fnMaximizeLov()" onkeydown="return fnHandleLovBtn(event)">
                    <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MAXIMIZE"))%></span>
                    </a>
                   <!-- BUG 19619967 fixes end -->
                </div>
            </div>
            <DIV class="WNDcontentmodal lovwin" id="DIVScrContainer" >
            <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
            <div class="DIVTwoColLyt" id="LOVCharInfo" style="display:none;"> <!-- LOV index field change start -->
                    <div class="DIVTwoColSectionContainer"  id="divLovPgHead" style="width:99.99%;"> <!--change for bug id : 19619967 -->                        	
                            <fieldset class="FSTdlg">
							  
                                <legend><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MIN_CHAR"))%></legend>
	                          <p id="charInfo">
                            </p>
                            </fieldset>
                        
                    </div>
                </div><!-- LOV index field change end -->
            <% if(fldsArray !=null && redFldArray !=null && rednFldTypeArray!=null && VisbArray!=null && labsArray!=null){%>
                <div class="DIVTwoColLyt" id="LOVPageHead">
                    <div class="DIVTwoColSectionContainer" style="width:99.99%">                        	
                            <fieldset class="FSTdlg">
							  <%--change for bug id : 14842317 starts --%>
                                <legend><%=StringEscapeUtils.escapeHTML(caseSensitive)%></legend>
	                          <%--change for bug id : 14842317 ends --%>
                                <div class="DIVColumnSingle" style="width:49%">
                                <% 
                                    for(int loop_index=0;loop_index<fldsArray.length/2;loop_index++) {
                                        if("Y".equalsIgnoreCase(redFldArray[loop_index])){                                            
                                          
                                            //if (loop_index % 2 == 0) {
                                                out.print("<div class=\"DIVText\"><label class=\"LBLstd\" for='"+(loop_index+1)+"'> "+ StringEscapeUtils.escapeHTML(labsArray[loop_index]) + "</label>");
                                                if (rednFldTypeArray.length > 1) {
                                                    if ("".equalsIgnoreCase(rednFldTypeArray[loop_index])) {
                                                        rednFldTypeArray[loop_index] = "TEXT";
                                                    }
                                                    rednFldType += rednFldTypeArray[loop_index] + "~";
                                                    if ("DATE".equalsIgnoreCase(rednFldTypeArray[loop_index])) {
                                                        out.print("<INPUT NAME='"+(loop_index+1)+"' ID='"+(loop_index+1)+"' TYPE=\"hidden\" data_type=\"DATE\" onpropertychange=\"displayDate(this)\">");//Fix for bug id : 16401019
                                                        out.print("<label class=\"LBLstd\" for='"+(loop_index+1)+"I'></label><INPUT class=\"TXTstd\" onkeydown=\"return dispCalendar(event)\"onactivate=\"acceptInputDate('"+(loop_index+1) + "', event)\" NAME='"+(loop_index+1)+"I' ID='"+(loop_index+1)+"I' size=\"11\" onbeforedeactivate=\"validateInputDate('"+(loop_index+1)+"', event)\">");//Fix for bug id : 16401019
                                                        out.print("<BUTTON  class=\"BTNimg\"  tabindex=\"-1\"   onclick=\"disp_cal('"+(loop_index+1)+"', event)\" >");
                                                        out.print("<span tabindex=\"-1\" class=\"ICOcalendar\">");
                                                        out.print("<span class=\"LBLinv\">");
                                                        out.print("</span>");
                                                        out.print("</span>");
                                                        out.print("</BUTTON>");
                                                        out.print("</div>");//Fix for bug id : 16401019
                                                    } else {
                                                        out.print("<INPUT CLASS=\"TXTstd\" NAME='"+(loop_index+1) + "' ID = '"+(loop_index+1) + "' TYPE='TEXT' VALUE=\"%\"></div>"); //Fix for 17289146
                                                    }
                                                } else {
                                                    out.print("<INPUT CLASS=\"TXTstd\" NAME='"+(loop_index+1) + "' ID = '"+(loop_index+1) + "' TYPE=\"TEXT\" VALUE=\"%\"></div>");
                                                    rednFldType += "TEXT~";
                                                }                                            
                                                                                           
                                            //}
                                        }                                         
                                    }%>                                    
                                    </div>
                                    <div class="DIVColumnSingle" style="width:49%">
                                    <% 
                                    for(int loop_index=fldsArray.length/2;loop_index<fldsArray.length;loop_index++) {
                                        if("Y".equalsIgnoreCase(redFldArray[loop_index])){          
                                            //if (loop_index % 2 == 1) {                                                
                                                out.print("<div class=\"DIVText\"><label class=\"LBLstd\" for='"+(loop_index+1)+"'> "+ StringEscapeUtils.escapeHTML(labsArray[loop_index]) + "</label>");
                                                if (rednFldTypeArray.length > 1) {
                                                    if ("".equalsIgnoreCase(rednFldTypeArray[loop_index])) {
                                                        rednFldTypeArray[loop_index] = "TEXT";
                                                    }
                                                    rednFldType += rednFldTypeArray[loop_index] + "~";
                                                    if ("DATE".equalsIgnoreCase(rednFldTypeArray[loop_index])) {
                                                        out.print("<INPUT NAME='"+(loop_index+1)+"' ID='"+(loop_index+1)+"' TYPE=\"hidden\" data_type=\"DATE\" onpropertychange=\"displayDate(this)\">");//Fix for bug id : 16401019
                                                        out.print("<label class=\"LBLstd\" for='"+(loop_index+1)+"I'></label><INPUT class=\"TXTstd\" onkeydown=\"return dispCalendar(event)\" onactivate=\"acceptInputDate('"+(loop_index+1) + "', event)\" NAME='"+(loop_index+1)+"I' ID='"+(loop_index+1)+"I' size=\"11\" onbeforedeactivate=\"validateInputDate('"+(loop_index+1)+"', event)\">");//Fix for bug id : 16401019
                                                        out.print("<BUTTON class=\"BTNimg\" tabindex=\"-1\" onclick=\"disp_cal('"+(loop_index+1)+"', event)\" >");
                                                        out.print("<span tabindex=\"-1\" class=\"ICOcalendar\">");
                                                        out.print("<span class=\"LBLinv\">");
                                                        out.print("</span>");
                                                        out.print("</span>");
                                                        out.print("</BUTTON>");
                                                        out.print("</div>");//Fix for bug id : 16401019
                                                    } else {
														
                                                        out.print("<INPUT CLASS=\"TXTstd\" NAME='"+(loop_index+1) + "' ID = '"+(loop_index+1) + "' TYPE='TEXT' VALUE=\"%\"></div>"); //Fix for 17289146
                                                    }
                                                } else {
                                                    out.print("<INPUT CLASS=\"TXTstd\" NAME='"+(loop_index+1) + "' ID = '"+(loop_index+1) + "' TYPE=\"TEXT\" VALUE=\"%\"></div>");
                                                    rednFldType += "TEXT~";
                                                } 
                                            //}
                                        }
                                    }%>
                                    <%-- Ashok 11.2 commented
                                    <br>
                                    <div class="TDbtnfooter">            
                                        <BUTTON class="BTNtext" onmouseover="this.className='BTNtextH'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onblur="this.className='BTNtext'" OnClick="setPages();getLovResults();" ><span class="ICOsearch"><span class="LBLinv"><%=StringEscapeUtils.escapeHTML(fetchLbl)%></span>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;<%=StringEscapeUtils.escapeHTML(fetchLbl)%></BUTTON>
                                    </div>
                                    !--%>
                                     <div class="DIVText">     
                                        <label class="LBLstd" for="<%=StringEscapeUtils.escapeHTML(fetchLbl)%>"></label>
                                        <BUTTON class="BTNtext" onmouseover="this.className='BTNtextH'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onblur="this.className='BTNtext'" OnClick="setPages();getLovResults();" >
                                            <%=StringEscapeUtils.escapeHTML(fetchLbl)%>
                                        </BUTTON>
                                    </div>
                                    </div>
                                    <%
                                    for (int dataTypeLength=0;dataTypeLength<fldsArray.length-1;dataTypeLength++) {
                                        if (rednFldTypeArray.length > 1) {
                                            if ("".equals(rednFldTypeArray[dataTypeLength])) {
                                                dataTypes += "TEXT~";
                                            } else {
                                                dataTypes += rednFldTypeArray[dataTypeLength] + "~";
                                            }
                                        } else {
                                            dataTypes += "TEXT~";
                                        }   
                                    }
                                 %>
                                
                            </fieldset>
                        
                    </div>
                </div>
                <%
                }
                if(fldsArray !=null && redFldArray !=null && rednFldTypeArray!=null && VisbArray!=null && labsArray!=null){
                %>
                <div class="DIVtblbox1outer3">
                   <br>
                   <!--Static header change start-->
                   <div class="DIVcaption1" id="LovNavDiv">
                      <button class="BTNtextD" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_FIRST"))%>" name="navFirst" tabindex="-1" onclick="doNavigate(gcNAV_FIRST)"  >
                        <%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_FIRST"))%>
                      </button>
                      <button class="BTNtextD" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_PREVIOUS"))%>" name="navPrev" tabindex="-1" 
                        onclick="doNavigate(gcNAV_PREVIOUS)"  ><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_PREVIOUS"))%>
                      </button>
                      <a name="CurPage" id="CurPage" class="SPNtext">1</a>
                      <a id="ofLabel" class="SPNtext"><%=StringEscapeUtils.escapeHTML(ofLabel)%></a>
                      <a name="TotPgCnt" id="TotPgCnt" class="SPNtext">1</a>
                      <button class="BTNtextD" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_NEXT"))%>" name="navNext" tabindex="-1"  
                           onclick="doNavigate(gcNAV_NEXT)" ><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_NEXT"))%>
                      </button>
                      <button class="BTNtextD" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_LAST"))%>" name="navLast" tabindex="-1"  
                           onclick="doNavigate(gcNAV_LAST)" >
                           <%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_LAST"))%>	
                      </button>
                      <label class="LBLinv" for="goto"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_GOTO_PAGE"))%></label><input class="TXTstd" id="goto" size="1">
                      <button class="BTNtext" onclick="gotoPage()" name="go"><%=StringEscapeUtils.escapeHTML(lblGoToPg)%></button>
                    </div>
                    <div><div class="DIVtblbox1 DIVTblHeader" id="LovHeaderDiv" >
                    <h2 class="hh4"><%=StringEscapeUtils.escapeHTML(searchRslt)%></h2>
                      <table class=TBLone id=TableLovHeader  cellspacing=0 cellpadding=0 summary="<%=StringEscapeUtils.escapeHTML(request.getParameter("title"))%>Header" style="width:auto;">
                        <tbody>
                          <tr onkeydown="return fnHandleLovTh(event)">
                                        <% 
                                            for (int lbl = 0; lbl < labsArray.length; lbl++) {
                                                if (!"".equalsIgnoreCase(labsArray[lbl])) {
                                                    if("Y".equalsIgnoreCase(VisbArray[lbl])){
                                                        out.print("<TD scope=\"col\" class=\"TBLoneTH\" onblur=\"this.className='TBLoneTH'\" onmouseover=\"this.className='TBLoneTHhover'\" onfocus=\"this.className='TBLoneTHhover'\" onmouseout=\"this.className='TBLoneTH'\" ><div><a class=\"Astd\"  href=\"#\"  onclick=\"sortSelectedCol('"+lbl+"',event)\" order=\"ASC\"><span class=\"SPNup hide\">&nbsp;&nbsp;&nbsp;&nbsp;</span>"+StringEscapeUtils.escapeHTML(labsArray[lbl])+"</a></div></TD>");
                                                    }else{
                                                        out.print("<TD scope=\"col\" class=\"TDnone\"  onblur=\"this.className='TBLoneTH'\" onmouseover=\"this.className='TBLoneTHhover'\" onfocus=\"this.className='TBLoneTHhover'\" onmouseout=\"this.className='TBLoneTH'\" ><div><a class=\"Astd\"  href=\"#\"  onclick=\"sortSelectedCol('"+lbl+"',event)\" order=\"ASC\"><span class=\"SPNup hide\">&nbsp;&nbsp;&nbsp;&nbsp;</span>"+StringEscapeUtils.escapeHTML(labsArray[lbl])+"</a></div></TD>");
                                                    }
                                                }
                                            }
                                        %>
                                        <TD scope="col" width="99%" class="TBLoneTH"   onblur="this.className='TBLoneTH'" onmouseover="this.className='TBLoneTHhover'" onfocus="this.className='TBLoneTHhover'" onmouseout="this.className='TBLoneTH'" ><div></div></TD>
                                    </tr>
                                </tbody>
                      </table>
                    </div></div>
                    <div class="DIVtblbox1" id="LovDiv" style="height:120px" onScroll="fnSyncLovScroll(this)">
                       <!-- <h2 class="hh4"><%=StringEscapeUtils.escapeHTML(searchRslt)%></h2>-->
                        <table class=TBLone id=TableLov  cellspacing=0 cellpadding=0 summary="<%=StringEscapeUtils.escapeHTML(request.getParameter("title"))%>" style="width:auto;">
                           <!-- <%
                                out.print("<colgroup span='"+fldsArray.length+"'></colgroup>");
                            %>              -->              
                                
                                <TBODY>
                                <%
                                    for(int rows=0;rows<25;rows++){
                                        if(rows % 2 == 0)
                                            out.print("<TR class=\"TBLoneTR\" onblur=\"this.className='TBLoneTR'\" onmouseover=\"this.className='TBLoneTRhover'\" onfocus=\"this.className='TBLoneTRhover'\" onmouseout=\"this.className='TBLoneTR'\" onkeydown=\"return fnHandleLovRslt(event)\">");
                                        else
                                            out.print("<TR class=\"TBLoneTRalt\" onblur=\"this.className='TBLoneTRalt'\" onmouseover=\"this.className='TBLoneTRhover'\" onfocus=\"this.className='TBLoneTRhover'\" onmouseout=\"this.className='TBLoneTRalt'\" onkeydown=\"return fnHandleLovRslt(event)\">");
                                        for(int cols=0;cols<fldsArray.length-1;cols++){                          
                                            if (cols==0) {
                                                if("Y".equalsIgnoreCase(VisbArray[cols])){
                                                    if (rednFldTypeArray.length > 1) {
                                                        if ("DATE".equalsIgnoreCase(rednFldTypeArray[cols])) {
                                                            out.print("<TD scope=\"row\"><div><a class=\"Astd\" name='LovAnchor' alt='LovAnchor' type=\""+StringEscapeUtils.escapeHTML(rednFldTypeArray[cols])+"\" href=\"#\" onclick=\"returnValToParent(event)\"></a><label class=\"LBLinv\" for=\"\"></label><INPUT type=\"HIDDEN\"></div></TD>");
                                                        } else{
                                                            out.print("<TD scope=\"row\"><div><a class=\"Astd\" name='LovAnchor' alt='LovAnchor' type=\""+StringEscapeUtils.escapeHTML(rednFldTypeArray[cols])+"\" href=\"#\" onclick=\"returnValToParent(event)\"></a></div></TD>");
                                                        }
                                                    } else {
                                                        out.print("<TD scope=\"row\"><div><a class=\"Astd\" name='LovAnchor' alt='LovAnchor' type=\"TEXT\" href=\"#\" onclick=\"returnValToParent(event)\"></a></div></TD>");
                                                    }
                                                }else {
                                                    if (rednFldTypeArray.length > 1) {
                                                        if ("DATE".equalsIgnoreCase(rednFldTypeArray[cols])) {
                                                            out.print("<TD scope=\"row\" class= 'TDnone'><div><a class=\"Astd\" name='LovAnchor' alt='LovAnchor' type=\""+StringEscapeUtils.escapeHTML(rednFldTypeArray[cols])+"\" href=\"#\" onclick=\"returnValToParent(event)\"></a><label class=\"LBLinv\" for=\"\"></label><INPUT type=\"HIDDEN\"></div></TD>");
                                                        } else{
                                                            out.print("<TD scope=\"row\" class= 'TDnone'><div><a class=\"Astd\" name='LovAnchor' alt='LovAnchor' type=\""+StringEscapeUtils.escapeHTML(rednFldTypeArray[cols])+"\" href=\"#\" onclick=\"returnValToParent(event)\"></a></div></TD>");
                                                        }
                                                    } else {
                                                        out.print("<TD scope=\"row\" class= 'TDnone'><div><a class=\"Astd\" name='LovAnchor' alt='LovAnchor' type=\"TEXT\" href=\"#\" onclick=\"returnValToParent(event)\"></a></div></TD>");
                                                    }
                                                }
                                            } else {
                                                if("Y".equalsIgnoreCase(VisbArray[cols])){
                                                    if (rednFldTypeArray.length > 1) {                                
                                                        if ("DATE".equalsIgnoreCase(rednFldTypeArray[cols])) {
                                                            out.print("<TD><div><a class=\"Astd\" name='LovAnchor' alt='LovAnchor' type=\""+StringEscapeUtils.escapeHTML(rednFldTypeArray[cols])+"\" href=\"#\" onclick=\"returnValToParent(event)\" tabindex =\"-1\"></a><label class=\"LBLinv\" for=\"\"></label><INPUT type=\"HIDDEN\"></div></TD>");
                                                        } else{
                                                            out.print("<TD><div><a class=\"Astd\" name='LovAnchor' alt='LovAnchor' type=\""+StringEscapeUtils.escapeHTML(rednFldTypeArray[cols])+"\" href=\"#\" onclick=\"returnValToParent(event)\" tabindex =\"-1\"></a></div></TD>");
                                                        }
                                                    } else {
                                                        out.print("<TD><div><a class=\"Astd\" name='LovAnchor' alt='LovAnchor' type=\"TEXT\" href=\"#\" onclick=\"returnValToParent(event)\" tabindex =\"-1\"></a></div></TD>");
                                                    }
                                                }else {
                                                     if (rednFldTypeArray.length > 1) {
                                                        if ("DATE".equalsIgnoreCase(rednFldTypeArray[cols])) {
                                                            out.print("<TD class= 'TDnone'><div><a class=\"Astd\" name='LovAnchor' alt='LovAnchor' type=\""+StringEscapeUtils.escapeHTML(rednFldTypeArray[cols])+"\" href=\"#\" onclick=\"returnValToParent(event)\" tabindex =\"-1\"></a><label class=\"LBLinv\" for=\"\"></label><INPUT type=\"HIDDEN\"></div></TD>");
                                                        } else{
                                                            out.print("<TD class= 'TDnone'><div><a class=\"Astd\" name='LovAnchor' alt='LovAnchor' type=\""+StringEscapeUtils.escapeHTML(rednFldTypeArray[cols])+"\" href=\"#\" onclick=\"returnValToParent(event)\" tabindex =\"-1\"></a></div></TD>");
                                                        }
                                                    } else {
                                                        out.print("<TD class= 'TDnone'><div><a class=\"Astd\" name='LovAnchor' alt='LovAnchor' type=\"TEXT\" href=\"#\" onclick=\"returnValToParent(event)\" tabindex =\"-1\"></a></div></TD>");
                                                    }
                                                }
                                            }  
                                        }
                                        out.print("<TD width='99%'><div></div></TD>");
                                        out.print("</TR>");
                                    }
									 //Static header change end
                                    out.print("<TR class=\"TBLoneTR\" onblur=\"this.className='TBLoneTR'\" onmouseover=\"this.className='TBLoneTRhover'\" onfocus=\"this.className='TBLoneTRhover'\" onmouseout=\"this.className='TBLoneTR'\" onkeydown=\"return fnHandleLovRslt(event)\">");
                                %>
                                </TBODY>
                            </table>
                        </div>
                    </div>
                    <%
                    }
                    %>
                    
                    <div >
                        <TABLE id="ALERTTBL" class="TBLtwo" border=0 cellSpacing=0 cellPadding=0 width="100%" summary="Alert Messages">
                            <THEAD>
                                <TR>
                                <% if ("E".equalsIgnoreCase(pageCount)){%>
                                 <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
                                    <TH width="1%" scope=col align="left" class="THLOV"><span class="LovErrorAlert"></span></TH>
                                    <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
                                    <%} else{ %>
                                     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
                                    <TH width="1%" scope=col align="left" class="THLOV"><span class="LovAlert"></span></TH>
                                     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
                                    <%} %>
                                    <TH width="85%" scope=coln align="left" class="THLOV"><label class ="LBLstdLOV"><%=StringEscapeUtils.escapeHTML(infoMsg)%></label></TH>
                                </TR>
                            </THEAD>
                            <TBODY>
                            </TBODY>
                        </TABLE>
                    </div>
                </div>
            </div>
            <% try{%>
          <script type="text/javascript">
          /*Security bug SEC-12-Patch-081 fixes starts */
                var noOfFlds = Number('<%=fldsArray.length%>') - 1;
                /*Security bug SEC-12-Patch-081 fixes ends */
                var rednFldType = '<%=StringEscapeUtils.escapeJavaScript(dataTypes)%>';
            </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <div id="masker" class="masker" style="display:none">
            <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
            </div>
            <div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none"><!--HTML5 Changes-->
                <iframe id="ifr_AlertWin" class="frames" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
        </div>
        <%
        }catch(Exception e){
        }%>
    </BODY>
</HTML>
