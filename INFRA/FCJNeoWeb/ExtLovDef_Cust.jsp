<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtLovDef.jsp
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

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css

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
    String lovId        = FCUtility.validateParameter(request.getParameter("lovId").replaceAll("_HASH_", "#")); /*9NT1606_12_3_RETRO_12_0_3_25402719 changes*/
    String screentype   = FCUtility.validateParameter(request.getParameter("screentype"));
    String lovType      = FCUtility.validateParameter(request.getParameter("lovType"));
    String txnBranch = FCUtility.validateParameter(request.getParameter("txnBranch"));
    String lovSrcElem   = FCUtility.validateParameter(request.getParameter("lovSrcElem"));
    String isME         = FCUtility.validateParameter(request.getParameter("isME"));
    String singleView    = FCUtility.validateParameter(request.getParameter("singleView"));
    String istxnBrn     = FCUtility.validateParameter(request.getParameter("istxnBrn"));
String customLov      = FCUtility.validateParameter(request.getParameter("customLov")); /*Fix for 20064895*/
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
    String lovCall      = FCUtility.validateParameter(request.getParameter("lovCall"));  //External Lov Changes
           
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->source="  + source);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->containerId="  + containerId);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->blockId="  + blockId);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->fieldName="  + fieldName);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->FieldLabel="  + FieldLabel);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->lovId="  + lovId);
	fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->bindFldsStr="  + bindFldsStr);
        fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->lovCall="  + lovCall);  //External Lov Changes
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
	String title = FCUtility.validateParameter(request.getParameter("title").replaceAll("_HASH_", "#")); /*Fix for 22973701*/
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
   //12.1.1_Decentralised Changes optimised the If condition accordingly for Decentralised
   //Expectation is for all offline supported screens the DECENTRALIZED_FLOW value should be Y, if at all the bank changes it, still for offline hit the branch DB)
    if ("N".equalsIgnoreCase(branchIdentifier) && (decentralizedFlow || "SMCHGBRN".equalsIgnoreCase(containerId) || !OIndicator.getInstance().isOnline())) {
        if(pageCount == null || "".equalsIgnoreCase(pageCount)){
            if("SMCHGBRN".equalsIgnoreCase(containerId)){
                lovId = "LOV_CHANGE_BRANCH_CODE_DC";
                bindFldsStr = "";
                rednFldval = "";
                }
				//12.1.1_Decentralised Changes also added the couple of below if conditions				
                if(rednFldval == null)
                    rednFldval = "";
            lovInfo = BranchLOVUtil.BranchLovfetch(fbContext,source,containerId ,lovId,Strlang,bindFldsStr,rednFldval,Objuc.getCurrBranch(),Objuc.getCurrUser());	 
            fieldList =  lovInfo.getFieldList();
            rednFldTypeList = lovInfo.getRednFldTypeList();
            labelList =  lovInfo.getLabelList();
            reductionList = lovInfo.getReductionList();
            visibleList = lovInfo.getVisibleList();
            pageCount       = lovInfo.getTotalPages();
            lovResult       = lovInfo.getLovResult();
           // seqList         = lovInfo.getSeqList();
           // webLogParam.put("SEQ_LIST",seqList);
            lovDataFlag     = "true";
        }
    } else if(containerId.substring(2,3).equals("S") && "N".equalsIgnoreCase(customLov)){ /*Fix for 20064895*/
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
            lovCall        = lovInfo.getExtlovCall();   //External Lov Changes
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
            lovCall        = lovInfo.getExtlovCall();   //External Lov Changes
            lovDataFlag     = "true";
           // appLog  = lovInfo.getAppLog();
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
    String searchCriteriaLbl  = (String)itemDescMap.get("LBL_SEARCH_CRITERIA");
	//change for bug id : 14842317 starts
	  String caseSensitive = (String)itemDescMap.get("LBL_CASE_SENSITIVE");
    //change for bug id : 14842317 ends
    String recordsPerPage = (String)itemDescMap.get("LBL_RECORDS_PER_PAGE");
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String searchRslt       = (String)itemDescMap.get("LBL_SEARCH_RESULT");
    String pageLbl       = (String)itemDescMap.get("LBL_PAGE");
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
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->fldsArray="  + fldsArray);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->redFldArray="  + redFldArray);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->labsArray="  + labsArray);
    fbContext.getBrnLogger().dbg("ExtLovDef.jsp-->VisbArray="  + VisbArray);
    fbContext.getBrnLogger().flush(StrUserId);
   /*String clientHandlerExit = String.valueOf(System.currentTimeMillis());
    webLogParam.put("LOG",fbContext.getBrnLogger().getLogString()+ webLog);
    if (("Y".equalsIgnoreCase(debugWindow) || "Y".equalsIgnoreCase(BranchConstants.DEBUG))) {
        if(session.getAttribute("WEBLOG")!=null )
            session.removeAttribute("WEBLOG");
        if(!"".equals(seqList))
            request.getSession(false).setAttribute("WEBLOG", webLogParam);
    }
    */
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    
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
        <!--<link id="LINKCSS" href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
        <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->

        <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">
        <link type="text/css" rel="stylesheet" href="https://static.oracle.com/cdn/fnd/gallery/2110.1.0/images/iconfont/ojuxIconFont.min.css">
        <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
        <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
        <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <!--<script type="text/javascript" src="Script/JS/Alert.js"></script>--><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        
    
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
           // var redValue       = replaceAll(parent.redValue, "_SLH_", "/");//Fix for 18234116;
           
            var lovResult      ='';
            if(lovDataFlag == 'true')
                 lovResult      = '<%=StringEscapeUtils.escapeJavaScript(lovResult)%>';
            else
                lovResult      = parent.AUTOLovResult;
            if(mainWin.DebugWindowFlg == "Y") {
                mainWin.serverDebugStmt =webDbg + "\n\n"+appDbg;
            }
                
            if(typeof(parent.fromChgBrn) != 'undefined') {
                brDIVWidth     = mainWin.document.getElementById("Div_AlertWin").style.width;
                brDIVHeight    = mainWin.document.getElementById("Div_AlertWin").style.height;
                brIFWidth      = mainWin.document.getElementById("Div_AlertWin").children[0].style.width;
                brIFHeight     = mainWin.document.getElementById("Div_AlertWin").children[0].style.height;
            }
            var fieldList = '<%=StringEscapeUtils.escapeJavaScript(fieldList)%>';
            var labelList = '<%=StringEscapeUtils.escapeJavaScript(labelList)%>';
            labelList = labelList.split('|').filter(v=>v);
            labelList = labelList.map((label) => ({'label': label}));
            
            var reductionList  = '<%=StringEscapeUtils.escapeJavaScript(reductionList)%>';
            var fieldListArr = fieldList.split('|').filter(val => val);
            fieldListArr = fieldListArr.map((field) => ({'field': field}));
            var columnArr = [];
            for (var i=0;i<fieldListArr.length; i++) {
                for (var j=0;j<labelList.length; j++) {
                    var columnObj = { 'headerText': labelList[i].label, 'field': fieldListArr[i].field };
                    columnArr.push(columnObj);
                }
            }
            columnArr = columnArr.filter((item, index, self) =>
              index === self.findIndex((val) => (
                val.field === item.field && val.headerText === item.headerText
              ))
            )
            
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>        
        
        <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_lovCust.js"></script>
        
        
    </HEAD>
    <BODY oncontextmenu="return false;" onkeydown="return disableCommonKeys(event);" onhelp="return false;" onclick="setParentWinActive(event);">
     
     <div id="DIVif1" >   
    
    <oj-dialog id="scrollingDialog"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"
                      position.of="window" class="oj-sm-width-2/3 frames" style="height: 98vh;min-height:98vh;max-height:98vh" >
            
                <div slot=header id="WNDtitlebar" class="oj-dialog-title oj-flex-bar oj-sm-align-items-center bottom-border" id="wndtitle" style="width: 100%">
                <div class="oj-flex-bar-start">
                    <h3><%=StringEscapeUtils.escapeHTML(request.getParameter("title"))%></h3>
                    </div>
                    <div class="oj-flex-bar-end">
                       <oj-button display="icons" chroming="borderless" type="button" class="WNDcls" accesskey="6" id ="WNDbuttonsMin" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>"  onclick="fnExitLov()" onkeydown="return fnHandleLovBtn(event)">
                       <span slot="startIcon" tabindex="-1" class="oj-panel-remove-icon"></span>
                       </oj-button>
                </div>
            </div>
            
            <DIV slot="body" id="wndwidth">
            <DIV id="DIVScrContainer">
            <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
            <input type="Hidden" name="LOVCALL" id="LOVCALL" value="<%=lovCall%>"></input>
            <DIV id="ScrollYes"  >		
         <div id="PageHead">   		 
           <div id="TblQuery">
            <oj-collapsible class="oj-sm-margin-1x-horizontal oj-sm-padding-0" expand-area="header" expanded="true" id="lovqueryCollapsible">
             <h4 slot="header">
                <%=StringEscapeUtils.escapeHTML(searchLbl)%> (<%=StringEscapeUtils.escapeHTML(caseSensitive)%>)
             </h4>
                <div class="oj-sm-width-full sectionPanel" id="TblOptionlQuery">    
                    <div class="partitionPanel oj-flex">
                    <div id="divLovPgHead" style="width:99.99%;display:none;"> <!--change for bug id : 19619967 -->                        	
                            <fieldset class="FSTdlg">
							  
                                <legend><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MIN_CHAR"))%></legend>
	                          <p id="charInfo">
                            </p>
                            </fieldset>
                </div><!-- LOV index field change end -->
            <% if(fldsArray !=null && redFldArray !=null && rednFldTypeArray!=null && VisbArray!=null && labsArray!=null){%>
                
                    <div id="LOVPageHead" class="oj-flex-item">                        	
                           
							  <%--change for bug id : 14842317 starts --%>
                               
	                          <%--change for bug id : 14842317 ends --%>
                                <div class="oj-flex">
                                <% 
                                    for(int loop_index=0;loop_index<fldsArray.length;loop_index++) {
                                        if("Y".equalsIgnoreCase(redFldArray[loop_index])){                                            
                                          
                                            //if (loop_index % 2 == 0) {
                                            if(loop_index > 1) {
                                                 out.print("<div class=\"oj-sm-width-1/2 oj-sm-margin-2x-bottom\">");
                                            } else {
                                                 out.print("<div class=\"oj-sm-width-1/2 oj-sm-margin-2x-bottom oj-sm-margin-2x-top\">");
                                            }
                                                if (rednFldTypeArray.length > 1) {
                                                    if ("".equalsIgnoreCase(rednFldTypeArray[loop_index])) {
                                                        rednFldTypeArray[loop_index] = "TEXT";
                                                    }
                                                    rednFldType += rednFldTypeArray[loop_index] + "~";
                                                    if ("DATE".equalsIgnoreCase(rednFldTypeArray[loop_index])) {
                                                        out.print("<INPUT NAME='"+(loop_index+1)+"' ID='"+(loop_index+1)+"' TYPE=\"hidden\" data_type=\"DATE\" onpropertychange=\"displayDate(this)\">");//Fix for bug id : 16401019
                                                       // out.print("<oj-label for='"+(loop_index+1)+"I'></oj-label><oj-input-text onkeydown=\"return dispCalendar(event)\"onactivate=\"acceptInputDate('"+(loop_index+1) + "', event)\" NAME='"+(loop_index+1)+"I' ID='"+(loop_index+1)+"I' size=\"11\" onbeforedeactivate=\"validateInputDate('"+(loop_index+1)+"', event)\"></oj-input-text>");//Fix for bug id : 16401019
                                                        out.print("<oj-label-value label-width='40%' label-edge='start'><oj-label slot='label' for='"+(loop_index+1)+"'>"+ StringEscapeUtils.escapeHTML(labsArray[loop_index]) + "</oj-label><oj-input-date day-formatter='[[dayFormatter]]' slot='value' onkeydown=\"return dispCalendar(event)\"onactivate=\"acceptInputDate('"+(loop_index+1) + "', event)\" NAME='"+(loop_index+1)+"' ID='"+(loop_index+1)+"' size=\"11\" onbeforedeactivate=\"validateInputDate('"+(loop_index+1)+"', event)\" ></oj-label-value> ");//Fix for bug id : 16401019
//                                                        out.print("<oj-button tabindex=\"-1\"   onclick=\"disp_cal('"+(loop_index+1)+"', event)\" >");
//                                                        out.print("<span tabindex=\"-1\" class=\"ICOcalendar\">");
//                                                        out.print("<span class=\"LBLinv\">");
//                                                        out.print("</span>");
//                                                        out.print("</span>");
//                                                        out.print("</oj-button>");
                                                        out.print("</div>");//Fix for bug id : 16401019
                                                    } else {
                                                        out.print("<oj-label-value label-edge=\"start\" label-width=\"40%\"><oj-label slot=\"label\" for='"+(loop_index+1)+"'> "+ StringEscapeUtils.escapeHTML(labsArray[loop_index]) + "</oj-label><oj-input-text TYPE=\"TEXT\" slot=\"value\" NAME='"+(loop_index+1) + "' ID = '"+(loop_index+1) + "'  VALUE=\"%\"></oj-input-text></oj-label-value></div>"); //Fix for 17289146
                                                    }
                                                } else {
                                                    out.print("<oj-label-value label-edge=\"start\" label-width=\"40%\"><oj-label slot=\"label\" for='"+(loop_index+1)+"'> "+ StringEscapeUtils.escapeHTML(labsArray[loop_index]) + "</oj-label><oj-input-text TYPE=\"TEXT\" slot=\"value\" NAME='"+(loop_index+1) + "' ID = '"+(loop_index+1) + "'  VALUE=\"%\"></oj-input-text></oj-label-value></div>");
                                                    rednFldType += "TEXT~";
                                                }                                            
                                                                                           
                                            //}
                                        }                                         
                                    }%>                                    
                                    
                                    </div>
                                   <!--<div class="oj-flex">
                                    <!--<% 
                                    for(int loop_index=fldsArray.length/2;loop_index<fldsArray.length;loop_index++) {
                                        if("Y".equalsIgnoreCase(redFldArray[loop_index])){          
                                            //if (loop_index % 2 == 1) {                                                
                                                out.print("<div class=\"oj-sm-width-1/2\">");
                                                if (rednFldTypeArray.length > 1) {
                                                    if ("".equalsIgnoreCase(rednFldTypeArray[loop_index])) {
                                                        rednFldTypeArray[loop_index] = "TEXT";
                                                    }
                                                    rednFldType += rednFldTypeArray[loop_index] + "~";
                                                    if ("DATE".equalsIgnoreCase(rednFldTypeArray[loop_index])) {
                                                        out.print("<INPUT NAME='"+(loop_index+1)+"' ID='"+(loop_index+1)+"' TYPE=\"hidden\" data_type=\"DATE\" onpropertychange=\"displayDate(this)\">");//Fix for bug id : 16401019
                                                        out.print("<oj-label class=\"LBLstd\" for='"+(loop_index+1)+"I'></oj-label><oj-input-text class=\"TXTstd\" onkeydown=\"return dispCalendar(event)\" onactivate=\"acceptInputDate('"+(loop_index+1) + "', event)\" NAME='"+(loop_index+1)+"I' ID='"+(loop_index+1)+"I' size=\"11\" onbeforedeactivate=\"validateInputDate('"+(loop_index+1)+"', event)\"></oj-input-text>");//Fix for bug id : 16401019
                                                        out.print("<oj-button tabindex=\"-1\" onclick=\"disp_cal('"+(loop_index+1)+"', event)\" >");
                                                        out.print("<span tabindex=\"-1\" class=\"ICOcalendar\">");
                                                        out.print("<span class=\"LBLinv\">");
                                                        out.print("</span>");
                                                        out.print("</span>");
                                                        out.print("</oj-button>");
                                                        out.print("</div>");//Fix for bug id : 16401019
                                                    } else {
														
                                                        out.print("<oj-label-value label-edge=\"start\" label-width=\"40%\"><oj-label slot=\"label\" for='"+(loop_index+1)+"'> "+ StringEscapeUtils.escapeHTML(labsArray[loop_index]) + "</oj-label><oj-input-text TYPE=\"TEXT\" slot=\"value\" NAME='"+(loop_index+1) + "' ID = '"+(loop_index+1) + "'  VALUE=\"%\"></oj-input-text></oj-label-value></div>"); //Fix for 17289146
                                                    }
                                                } else {
                                                    out.print("<oj-label-value label-edge=\"start\" label-width=\"40%\"><oj-label slot=\"label\" for='"+(loop_index+1)+"'> "+ StringEscapeUtils.escapeHTML(labsArray[loop_index]) + "</oj-label><oj-input-text TYPE=\"TEXT\" slot=\"value\" NAME='"+(loop_index+1) + "' ID = '"+(loop_index+1) + "' VALUE=\"%\"></oj-input-text></oj-label-value></div>");
                                                    rednFldType += "TEXT~";
                                                } 
                                            //}
                                        }
                                    }%>-->
                                    <%-- Ashok 11.2 commented
                                    <br>
                                    <div class="TDbtnfooter">            
                                        <BUTTON class="BTNtext" onmouseover="this.className='BTNtextH'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onblur="this.className='BTNtext'" OnClick="setPages();getLovResults();" ><span class="ICOsearch"><span class="LBLinv"><%=StringEscapeUtils.escapeHTML(fetchLbl)%></span>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;<%=StringEscapeUtils.escapeHTML(fetchLbl)%></BUTTON>
                                    </div>
                                    !--%>
                                     
                                    
                                    <div class="oj-flex oj-flex-bar oj-sm-align-items-center">
                                    <div class="oj-flex-bar-start"></div>    
                                    <div class="oj-flex-bar-end oj-sm-margin-2x-bottom">
                                    <!--<div class="oj-sm-width-1/2" style="width: 40%">-->
                                        <oj-label for="<%=StringEscapeUtils.escapeHTML(fetchLbl)%>"></oj-label>
                                       
                                        <oj-button class="action-button-primary" chroming="solid"  on-oj-action="[[function() {setPages();getLovResults()}.bind(null)]]"  >
                                            <%=StringEscapeUtils.escapeHTML(fetchLbl)%>
                                        </oj-button>
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
                                </div>
                                
                           
                <%
                }
                %>
                      </div>
                        
                      </div>
                 
                </oj-collapsible>
                      </div>
                      </div>
                    </div>
          <%
                if(fldsArray !=null && redFldArray !=null && rednFldTypeArray!=null && VisbArray!=null && labsArray!=null){
                %>
         <div class="oj-sm-margin-1x-horizontal">
            <div class="oj-sm-width-full sectionPanel">
            <div class="partitionPanel">
            <fieldset class="oj-sm-padding-2x-bottom">
            <oj-form-layout onclick="mainWin.fnUpdateScreenSaverInterval();" label-edge="start" user-assistance-density="compact">
            
             <!--Static header change start-->
            <div id="lovDataContainer"> 
            <h4 slot="header">
                <%=StringEscapeUtils.escapeHTML(searchRslt)%>
             </h4>
                    
                     <DIV id="QryRslts" onkeydown="return handleSumkeys(event)" >
                        
                         <oj-table id='TableLov' aria-label='Lov Results Table'
                                        data='[[dataProvider]]'                                         
                                        columns='{{columnArr}}'
                                        selection-mode='{"row": "single"}'
                                        class="oj-sm-width-full"
                                        display="grid"
                                        on-selected-changed='{{selectedChangedListener}}'
                                        style="max-height:300px;">
                                       <!-- <oj-paging-control slot="bottom" data="[[dataProvider]]" page-size="15"></oj-paging-control>-->
                        </oj-table>    
                        </div>
                       
                        </div>
                   <!-- <div id="Table_NavOptions" class="oj-flex-bar oj-sm-align-items-center oj-sm-margin-4x-start oj-sm-margin-4x-end" onkeydown="return handleSumkeys(event)"><!--HTML5 Changes-->
               
                
                </oj-form-layout>
                          </fieldset>              
                                
                        </div>
                    </div>
                    </div>
                    
                    
                  
                    
                    <%
                    }
                    %>
                    
                    
                   <!-- <div >
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
                                    <TH width="85%" scope=coln align="left" class="THLOV"><oj-label class ="LBLstdLOV"><%=StringEscapeUtils.escapeHTML(infoMsg)%></oj-label></TH>
                                </TR>
                            </THEAD>
                            <TBODY>
                            </TBODY>
                        </TABLE>
                    </div>-->
                    </div>
                    </div>
                <div slot="footer" class="oj-sm-justify-content-flex-start oj-sm-margin-4x-start oj-sm-margin-4x-end oj-sm-padding-4x">
                    <!--<div class="oj-flex-bar oj-sm-align-items-center oj-sm-margin-4x-end bottom-border">
                        <div class="oj-flex-bar-start">  -->
                        <!--<div>
                            <% if ("E".equalsIgnoreCase(pageCount)){%>
                            --><%-- Security bug SEC-12-Patch-081 fixes starts  --%><!--
                            <div class="oj-component-icon oj-message-status-icon oj-message-error-icon"></span>--><!--change to oj alert --><!--
                            --><%-- Security bug SEC-12-Patch-081 fixes ends  --%><!--
                            <%} else{ %>
                            --><%-- Security bug SEC-12-Patch-081 fixes starts  --%><!--
                            <div class="oj-component-icon oj-message-status-icon oj-message-info-icon"></div>
                            --><%-- Security bug SEC-12-Patch-081 fixes ends  --%><!--
                            <%} %>
                            </div>
                            <div>
                            <oj-label><%=StringEscapeUtils.escapeHTML(infoMsg)%></oj-label>
                            </div>
                        </div>-->
                        
                        
                 <div class="oj-flex-bar oj-sm-align-items-center">       
                    <div class="oj-flex-bar-start">
                        <div class="oj-pagingcontrol-nav-input-section">               
                            <oj-label class="oj-sm-align-items-center" for="goto">&#160;<%=StringEscapeUtils.escapeHTML(pageLbl)%>&#160;</oj-label>                
                            <oj-input-text class="oj-sm-align-items-center" id="goto" size="1" value=1 onChange="gotoPage()" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_GOTO_PAGE"))%>"></oj-input-text>
                            <oj-label class="oj-sm-align-items-center" id="ofLabel">&#160;<%=StringEscapeUtils.escapeHTML(ofLabel)%>&#160;</oj-label>
                            <oj-label class="oj-sm-align-items-center" id="TotPgCnt" name="TotPgCnt">1</oj-label>  
                           
                        </div>
                        <div class="oj-divider-end oj-sm-margin-2x-start"></div> 
                    </div>
                    <div class="oj-flex-bar-end">
                    <oj-button  slot="end"  display="icons" chroming="borderless" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_FIRST"))%>" name="navFirst" disabled="true" tabindex="-1" on-oj-action="[[function() {doNavigate(gcNAV_FIRST, event)}.bind(null)]]"  ><span slot="startIcon" class="oj-pagingcontrol-nav-first oj-pagingcontrol-nav-first-icon oj-component-icon"></span></oj-button>
                    <oj-button  slot="end"  display="icons" chroming="borderless"   title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_PREVIOUS"))%>" name="navPrev" disabled="true" tabindex="-1" on-oj-action="[[function() {doNavigate(gcNAV_PREVIOUS, event)}.bind(null)]]"  ><span slot="startIcon" class="oj-pagingcontrol-nav-previous oj-pagingcontrol-nav-previous-icon oj-component-icon"></span></oj-button>
                    <div class="oj-flex oj-sm-align-items-center">
                    <!--<oj-input-text id="CurPage" readonly=true size="1" value="1" class="oj-pagingcontrol-nav-input oj-component" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_GOTO_PAGE"))%>"></oj-input-text>-->
                    <span id="CurPage" name="CurPage">1</span>
                    </div>
                    <!--<div class="oj-flex oj-sm-align-items-center">
                    <span id="CurPage" name="CurPage">1</span>
                    <span id="ofLabel">&#160;<%=StringEscapeUtils.escapeHTML(ofLabel)%>&#160;</span>
                    <span id="TotPgCnt" name="TotPgCnt">1</span>                
                    </div>-->
                    <oj-button  slot="end"  display="icons" chroming="borderless"    title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_NEXT"))%>" name="navNext" disabled="true" tabindex="-1" on-oj-action="[[function() {doNavigate(gcNAV_NEXT, event)}.bind(null)]]" ><span slot="startIcon" class="oj-pagingcontrol-nav-next oj-pagingcontrol-nav-next-icon oj-component-icon"></span></oj-button>
                    <oj-button  slot="end"  display="icons" chroming="borderless"    title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_LAST"))%>" name="navLast" disabled="true" tabindex="-1" on-oj-action="[[function() {doNavigate(gcNAV_LAST, event)}.bind(null)]]" ><span slot="startIcon" class="oj-pagingcontrol-nav-last oj-pagingcontrol-nav-last-icon oj-component-icon"></span></oj-button>
                    <!--<input id="goto" name="gotopage" READONLY="true" size="1" type="text" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_GOTO_PAGE"))%>"></input>HTML5 changes 24/OCT/2016 Fix for 24904397
                    <oj-button title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_GOTO_PAGE"))%>" onclick="gotoPage()" disabled="true" name="go"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_GOTO_PAGE"))%></oj-button>HTML5 ChangesHTML5 changes 24/OCT/2016 Fix for 24904397-->
                    </div>
                </div>
                
                    </div>
                    
                    
                    
            </oj-dialog>
            <div id="Div_AlertWin"   onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none;z-index:6000"> 
                <iframe id="ifr_AlertWin" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
        <div id="masker" class="masker" style="display:none">
            
        </div>
         <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
            </div>
            </div>
            
            <% try{%>
          <script type="text/javascript">
          /*Security bug SEC-12-Patch-081 fixes starts */
                var noOfFlds = Number('<%=fldsArray.length%>') - 1;
                /*Security bug SEC-12-Patch-081 fixes ends */
                var rednFldType = '<%=StringEscapeUtils.escapeJavaScript(dataTypes)%>';
            </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
            
        <%
        }catch(Exception e){
        }%>
    </BODY>
</HTML>