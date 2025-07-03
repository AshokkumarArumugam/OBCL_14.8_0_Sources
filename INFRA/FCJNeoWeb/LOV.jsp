<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : LOV.jsp
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
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.infra.handlers.LovHandler"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="java.util.Vector, java.util.Map"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String Strlang          = (String)session.getAttribute("LANG");
    String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
    String StrUserId        = (String) session.getAttribute("USERID");
    String strTheme         = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String browserCSS       = (String)session.getAttribute("BROWSER_CSS");
    String CSRFtoken        = (String)session.getAttribute("X-CSRFTOKEN");
    String redFleLabelList  =   FCUtility.validateParameter(request.getParameter("rednFldLabels")); /* # BUG 15978732 fixes   */ 
    redFleLabelList         = redFleLabelList.replaceAll("%23", "#");
    String labelList        =   FCUtility.validateParameter(request.getParameter("columnHeaders"));/* # BUG 15978732 fixes   */ 
    labelList               = labelList.replaceAll("%23", "#");
    String ieCss            = (String)session.getAttribute("IECSS");
   /* security fixes for WF starts */
    String [] labsArray     = labelList.split("\\|",-1);
    String redFldLablsArray[] = redFleLabelList.split("\\|",-1);
    String imgPath = "Images/"+strTheme.substring(0,strTheme.indexOf("."))+"/";
    int numReduc             = Integer.parseInt( FCUtility.validateParameter( request.getParameter("numReduc"))); /* # BUG 15978732 fixes   */ 
    int resColCount          = labelList.split("\\|", -1).length;
/* security fixes for WF ends */

    String types             =  FCUtility.validateParameter(request.getParameter("data_type_str"));
    String bind_var          =  FCUtility.validateParameter(request.getParameter("bindVars"));
    String PageSize          =  FCUtility.validateParameter(request.getParameter("PageSize"));
    String selectDB          = FCUtility.validateParameter(request.getParameter("selectDB"));
    String lovId             = FCUtility.validateParameter(request.getParameter("lovId"));
    String containerId       = FCUtility.validateParameter(request.getParameter("containerId"));
    String indexFlds         = FCUtility.validateParameter(request.getParameter("indexFlds"));//Index based search changes,Fix for 29249785
    /* # BUG 15978732 fixes start */ 
    if(containerId!=null){
        int index = 0 ;
        if((index = containerId.indexOf("_")) == 4){
            String contid = containerId.substring(0,index);
            containerId = contid;
        }
    }
    /* # BUG 15978732 fixes start */ 
    String txnBranch         = FCUtility.validateParameter(request.getParameter("txnBranch"));
    String Function_id       = FCUtility.validateParameter(request.getParameter("functionId"));
    String curr_user         = (String) session.getAttribute("USERID");
    String entity         = (String) session.getAttribute("ENTITY");
    String curr_branch       = (String) session.getAttribute("BRANCH_CODE");
     
    String curr_module       = FCUtility.validateParameter(request.getParameter("curr_module"));
    String DsnName           = FCUtility.validateParameter(request.getParameter("DsnName"));
    String fetch_records     = FCUtility.validateParameter(request.getParameter("fetch_records"));
    String fields            = FCUtility.validateParameter(request.getParameter("Displayfields"));
    String par_fields        = FCUtility.validateParameter(request.getParameter("Parentfields"));
    String par_fields_recNum = FCUtility.validateParameter(request.getParameter("ParentfieldsRecNum"));
    String rednCriteria      = FCUtility.validateParameter(request.getParameter("rednCriteria"));

     String [] rednLabsArray  = rednCriteria.split("\\|",-1);
    /* security fixes for WF ends */   
           
    /* Getting all labels */
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String sorting       = (String)itemDescMap.get("LBL_SORTING");
    String fetchLbl      = (String)itemDescMap.get("LBL_FETCH");
    String searchLbl     = (String)itemDescMap.get("LBL_SEARCH");
    String ofLabel       = (String)itemDescMap.get("LBL_OF");
    String lblGoToPg     = (String)itemDescMap.get("LBL_GOTO_PAGE");
    String listOfVal     = (String)itemDescMap.get("LBL_LISTOF_VAL");
    String searchRslt    = (String)itemDescMap.get("LBL_SEARCH_RESULT");
	String searchCriteriaLbl  = (String)itemDescMap.get("LBL_SEARCH_CRITERIA");
	String pageLbl       = (String)itemDescMap.get("LBL_PAGE");
   	  String caseSensitive = (String)itemDescMap.get("LBL_CASE_SENSITIVE");
 /* # BUG 15978732 fixes start */ 
    String isME         =  FCUtility.validateParameter(request.getParameter("isME"));
    String singleView    = FCUtility.validateParameter(request.getParameter("singleView"));
    String lovTitle     = listOfVal +" "+ FCUtility.validateParameter(request.getParameter("title"));
    /* # BUG 15978732 fixes end */ 
    
    lovTitle = lovTitle.replaceAll("%23", "#");
    String autoRedCriteria = request.getParameter("autoRedCriteria");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
     
    
%>
<html id="HtmlIframeLov" lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
        <TITLE><%=StringEscapeUtils.escapeHTML(request.getParameter("title"))%></TITLE>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
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

        <script type="text/javascript">
            document.oncontextmenu=new Function("return false;")
            var Datatypes = "<%=StringEscapeUtils.escapeJavaScript(types)%>";
            var Bindvars = '<%=StringEscapeUtils.escapeJavaScript(bind_var)%>';
            var PageSize = "<%=StringEscapeUtils.escapeJavaScript(PageSize)%>";
            var selectDB = "<%=StringEscapeUtils.escapeJavaScript(selectDB)%>";
            var page = "";   
            var lovId = "<%=StringEscapeUtils.escapeJavaScript(lovId)%>";
            var containerId  = "<%=StringEscapeUtils.escapeJavaScript(containerId)%>";
            var functionId   = "<%=StringEscapeUtils.escapeJavaScript(Function_id)%>";
            var reductionCriteria = "<%=StringEscapeUtils.escapeJavaScript(rednCriteria)%>";
            /* Exceptional case, where the LOV is for dates */
            var forDocReductionCriteria = "<%=StringEscapeUtils.escapeJavaScript(rednCriteria)%>";
             var indexFlds = "<%=StringEscapeUtils.escapeJavaScript(indexFlds)%>";//Index based search changes
            var dateLOV = new Array();
            var tmpReductionCriteria = new Array();
            <% 
            for(int i=0; i < rednLabsArray.length; i++) { %>
                tmpReductionCriteria[<%=i%>] = "<%=StringEscapeUtils.escapeJavaScript(rednLabsArray[i])%>";
            <%}%>
            if (forDocReductionCriteria.indexOf( "TO_DATE(" ) != -1) {
                forDocReductionCriteria = "";
                for (var i =0; i < tmpReductionCriteria.length; i++){
                    if( tmpReductionCriteria[i].indexOf( "TO_DATE(" ) != -1) {
                        var redCri = tmpReductionCriteria[i].substring( tmpReductionCriteria[i].indexOf( "TO_DATE(" ) + 8,  tmpReductionCriteria[i].indexOf( "," ) );
                        tmpReductionCriteria[i] = redCri + tmpReductionCriteria[i].substring( tmpReductionCriteria[0].indexOf(")!") + 1, tmpReductionCriteria[0].indexOf("!",(tmpReductionCriteria[0].indexOf(")!") + 2) )+1 ) + redCri;
                        dateLOV[i] = true;
                    }
                forDocReductionCriteria = forDocReductionCriteria + tmpReductionCriteria[i];
                }
            }
            var autoRedCtr = "<%=StringEscapeUtils.escapeJavaScript(autoRedCriteria)%>";
            var mainWin = parent.mainWin;
             /*Security bug SEC-12-Patch-081 fixes starts */
            var numRedc = '<%=StringEscapeUtils.escapeJavaScript(Integer.toString(numReduc))%>';
            var resColCount = '<%=StringEscapeUtils.escapeJavaScript(Integer.toString(resColCount))%>';
             /*Security bug SEC-12-Patch-081 fixes ends */
            var isME           = '<%=StringEscapeUtils.escapeJavaScript(isME)%>';
            var singleView     = '<%=StringEscapeUtils.escapeJavaScript(singleView)%>';
            var g_txnBranch    = '<%=StringEscapeUtils.escapeJavaScript(txnBranch)%>';
            var txnBranch      = '<%=StringEscapeUtils.escapeJavaScript(txnBranch)%>';
            var imagePath      = '<%=StringEscapeUtils.escapeJavaScript(imgPath)%>';
            var strTheme = parent.strTheme;
             var fieldList = '<%=StringEscapeUtils.escapeJavaScript(fields)%>';
            var labelList = '<%=StringEscapeUtils.escapeJavaScript(labelList)%>';
            var templbllist = labelList;
            labelList = labelList.split('|').filter(v=>v);
            labelList = labelList.map((label) => ({'label': label}));
            
             var fieldListArr = fieldList.split('|').filter(val => val);
            fieldListArr = fieldListArr.map((field) => ({'field': field}));
            
            var columnArr = [];
            for (var i=0;i<labelList.length; i++) {
                for (var j=0;j<labelList.length; j++) {
                    var columnObj = { 'headerText': labelList[i].label, 'field': labelList[i].label };
                    columnArr.push(columnObj);
                }
            }
            columnArr = columnArr.filter((item, index, self) =>
              index === self.findIndex((val) => (
                val.field === item.field && val.headerText === item.headerText
              ))
            )
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
      <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_nonextlov.js"></script>
     
    </head>
    <body  oncontextmenu="return false;" onkeydown="lovAccessKeys(event)" onhelp="return false;"><!-- LOV index field change start -->
	<div id="DIVif1" >   
	<oj-dialog id="scrollingDialog"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"
                      position.of="window" class="oj-sm-width-2/3 frames" style="height: 98vh;min-height:98vh;max-height:98vh top: 2.49175px; left: 383px; position: relative;" >
            
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
       <!-- <DIV class="WNDcontainer" id="DIVWNDContainer">
            <div class="WNDtitlebar" id="WNDtitlebar" onmousedown="startDrag('ChildWin', event)">
                <B class="BTNicon"><span class="ICOflexcube"></span></B>
                <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(lovTitle)%></h1>
                <div class="WNDbuttons">
                    <a class="WNDcls" href="#" id ="WNDbuttons" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>"  onclick="fnExitLov()" onkeydown="return fnHandleLovBtn(event)">
                    <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                    </a>
                </div>
            </div>
            <DIV class="WNDcontentmodal lovwin" id="DIVScrContainer" >-->
             <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
			 
			  <DIV id="ScrollYes"  >		
         <div id="PageHead">   		 
           <div id="TblQuery">
            <oj-collapsible class="oj-sm-margin-1x-horizontal oj-sm-padding-0" expand-area="header" expanded="true" id="lovqueryCollapsible">
             <h4 slot="header">
                <%=StringEscapeUtils.escapeHTML(searchLbl)%> (<%=StringEscapeUtils.escapeHTML(caseSensitive)%>)
             </h4>
                <div class="oj-sm-width-full sectionPanel" id="TblOptionlQuery">    
                    <div class="partitionPanel oj-flex">
                    <div id="divLovPgHead" style="width:99.99%;display:none;"> 
					
                     <!-- <div class="DIVTwoColLyt" id="LOVCharInfo" style="display:none;">--> <!-- LOV index field change start -->
                  <!--  <div class="DIVTwoColSectionContainer" style="width:99.99%">   -->                     	
                            <fieldset class="FSTdlg">
							  
                                <legend><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MIN_CHAR"))%></legend>
	                          <p id="charInfo">
                            </p>
                            </fieldset>
                        
                   <!-- </div>-->
                </div><!-- LOV index field change end -->
                <!--<div class="DIVTwoColLyt" id="LOVPageHead">
                    <div class="DIVTwoColSectionContainer"  style="width:99.99%">
                        <fieldset class="FSTdlg">
                            <legend><%=StringEscapeUtils.escapeHTML(searchLbl)%></legend>    
                            <div class="DIVColumnSingle"  style="width:49%">-->
							<div id="LOVPageHead" class="oj-flex-item">
							<div class="oj-flex">
                            <%
                                for (int loopIndex = 0; loopIndex < numReduc; loopIndex++){
									 if(loopIndex > 1) {
                                                 out.print("<div class=\"oj-sm-width-1/2 oj-sm-margin-2x-bottom\">");
                                      } else {
                                                 out.print("<div class=\"oj-sm-width-1/2 oj-sm-margin-2x-bottom oj-sm-margin-2x-top\">");
										}
                                   // if (loopIndex % 2 == 0){
                                         if (rednLabsArray[loopIndex].indexOf("TO_DATE(") != -1) {
                                         					 out.print("</div>");
                                                                                 
                                            out.print("<oj-label-value label-width='40%' label-edge='start'><oj-label  for='"+StringEscapeUtils.escapeHTML(rednLabsArray[loopIndex].substring(rednLabsArray[loopIndex].indexOf( "TO_DATE(" )+8,rednLabsArray[loopIndex].indexOf(",")))+ "'></oj-label><oj-input-date  NAME='"+StringEscapeUtils.escapeHTML(redFldLablsArray[loopIndex])+ "' ID = '"+StringEscapeUtils.escapeHTML(rednLabsArray[loopIndex].substring(rednLabsArray[loopIndex].indexOf( "TO_DATE(" )+8,rednLabsArray[loopIndex].indexOf(",")))+ "' day-formatter='[[dayFormatter]]' slot='value' onkeydown=\"return dispCalendar(event)\" onactivate=\"acceptInputDate('"+(loopIndex+1) + "', event)\" onbeforedeactivate=\"validateInputDate('"+(loopIndex+1)+"', event)\"><</oj-label-value>");
                                           out.print("</div>");                                       
                                        } else {
                                           // out.print("<INPUT CLASS=\"TXTstd\" NAME='"+StringEscapeUtils.escapeHTML(redFldLablsArray[loopIndex])+ "' ID = '"+StringEscapeUtils.escapeHTML(rednLabsArray[loopIndex].substring(0,rednLabsArray[loopIndex].indexOf("!")))+ "' TYPE=\"TEXT\" VALUE=\"%\"></div>");
											 out.print("<oj-label-value label-edge=\"start\" label-width=\"40%\"><oj-label slot=\"label\" for='"+(loopIndex+1)+"'> "+ StringEscapeUtils.escapeHTML(redFldLablsArray[loopIndex]) + "</oj-label><oj-input-text TYPE=\"TEXT\" slot=\"value\" NAME='"+(loopIndex+1) + "' ID = '"+StringEscapeUtils.escapeHTML(rednLabsArray[loopIndex].substring(0,rednLabsArray[loopIndex].indexOf("!")))+ "' VALUE=\"%\"></oj-input-text></oj-label-value></div>"); //Fix for 17289146
                                        }
                                   // }
                              }
                            %>
                            </div>
                        
                         <!--   <%
                                for (int loopIndex = 0; loopIndex < numReduc; loopIndex++){
                                    if (loopIndex % 2 == 1){
                                        out.print("<div class=\"DIVText\"><label class=\"LBLstd\" for= '"+StringEscapeUtils.escapeHTML(rednLabsArray[loopIndex].substring(0,rednLabsArray[loopIndex].indexOf("!")))+ "'> "+ StringEscapeUtils.escapeHTML(redFldLablsArray[loopIndex]) + "</label>");
                                        if (rednLabsArray[loopIndex].indexOf("TO_DATE(") != -1) {
                                            out.print("<div class=\"DIVText\"><label class=\"LBLstd\" for='"+StringEscapeUtils.escapeHTML(rednLabsArray[loopIndex].substring(rednLabsArray[loopIndex].indexOf( "TO_DATE(" )+8,rednLabsArray[loopIndex].indexOf(",")))+ "'></label><INPUT CLASS=\"TXTstd\" NAME='"+StringEscapeUtils.escapeHTML(redFldLablsArray[loopIndex])+ "' ID = '"+StringEscapeUtils.escapeHTML(rednLabsArray[loopIndex].substring(rednLabsArray[loopIndex].indexOf( "TO_DATE(" )+8,rednLabsArray[loopIndex].indexOf(",")))+ "' TYPE=\"TEXT\" VALUE=\"%\"></div>");
                                        } else {
                                            out.print("<label class=\"LBLstd\" for= '"+StringEscapeUtils.escapeHTML(rednLabsArray[loopIndex].substring(0,rednLabsArray[loopIndex].indexOf("!")))+ "'></label><INPUT CLASS=\"TXTstd\" NAME='"+StringEscapeUtils.escapeHTML(redFldLablsArray[loopIndex])+ "' ID = '"+StringEscapeUtils.escapeHTML(rednLabsArray[loopIndex].substring(0,rednLabsArray[loopIndex].indexOf("!")))+ "' TYPE=\"TEXT\" VALUE=\"%\"></div>");
                                        }
                                    }
                              }
                            %>-->
							 <div class="oj-flex oj-flex-bar oj-sm-align-items-center">
                                    <div class="oj-flex-bar-start"></div>    
                                    <div class="oj-flex-bar-end oj-sm-margin-2x-bottom">
                               <oj-label for="<%=StringEscapeUtils.escapeHTML(fetchLbl)%>"></oj-label>
                                       
                                        <oj-button class="action-button-primary" chroming="solid"  on-oj-action="[[function() {setPages();getLovResults()}.bind(null)]]"  >
                                            <%=StringEscapeUtils.escapeHTML(fetchLbl)%>
                                        </oj-button>
                                    </div>
                                    </div>
                                            
                        
                    </div>
                </div>
				</div>
				</oj-collapsible>
                      </div>
                      </div>
                    </div>
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
                    
                     <DIV id="QryRslts">
                        
                         <oj-table id='TableLov' aria-label='Lov Results Table'
                                        data='[[dataProvider]]'                                         
                                        columns='{{columnArr}}'
                                        selection-mode='{"row": "single"}'
                                        class="oj-sm-width-full"
                                        display="grid"
                                        on-selected-changed='{{selectedChangedListener}}'
                                        on-keydown="return fnHandleLovRslt(event)"
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
                    
                      <!-- <TABLE id="ALERTTBL" class="TBLtwo" border=0 cellSpacing=0 cellPadding=0 width="100%" summary="Alert Messages">
                            <THEAD>
                                <TR>
                                 <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
                                    <TH width="15%" scope=col align="left" class="THLOV"><span class="LovAlert" style="margin-top:3px;margin-left:2px;"></span></TH>
                                     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
                                    <TH width="85%" scope=coln align="left" class="THLOV"><label class ="LBLstdLOV"><%=StringEscapeUtils.escapeHTML("")%></label></TH>
                                </TR>
                            </THEAD>
                            <TBODY>
                            </TBODY>
                        </TABLE>
                    </div>-->
            </div>
        </div>
         <div slot="footer" class="oj-sm-justify-content-flex-start oj-sm-margin-4x-start oj-sm-margin-4x-end oj-sm-padding-4x">
                    
                        
                        
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
            
           
    </body>
</html>
