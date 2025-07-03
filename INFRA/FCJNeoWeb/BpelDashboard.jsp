<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8"
         pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.BranchUserGlobals"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.common.BranchConfig"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.common.BranchConfig"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%
  /*JAN_CPU_BUG-25068346 Start-- */
    response.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 );
	/*JAN_CPU_BUG-25068346 End-- */ 
request.setCharacterEncoding("UTF-8");
String jsParser         = (String)session.getAttribute("JS_PARSER");
String strTheme         = (String)session.getAttribute("THEME");
String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
String ieCss            = (String)session.getAttribute("IECSS");
String browserCSS       = (String) session.getAttribute("BROWSER_CSS");
String CSRFtoken        = (String)session.getAttribute("X-CSRFTOKEN");
String winId        = (String) request.getParameter("winId"); 
String qType            = (String)request.getParameter("qType");
String qDesc            = (String)request.getParameter("qDesc");
String isDetail            = (String)request.getParameter("isDetail");
String entity       = (String) session.getAttribute("ENTITY");
%>
<!DOCTYPE html><!--HTML5 Changes-->
<%
        request.setCharacterEncoding("UTF-8");
        FCUserGlobals uc    = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
        String user         = "";
        if(uc != null)
            user = uc.getCurrUser();
        BranchLogger brnLogger = new BranchLogger(user);
		String TerminalId = (String) FCUtility.validateParameter(FCUtility.getCleintIPAddr(request));//12.0.2 security issues 
        if (user == null || "".equals(user)){
            user = TerminalId;
        }
        FBContext fbContext = new FBContext(user);
        fbContext.setEntityName(entity);
        fbContext.setBrnLogger(brnLogger);
        String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
        Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+BranchConstants.DEFAULT_LANGCODE + "~" + entity, branchIdentifier,user);
        String sTitle           = (String) itemDescMap.get("LBL_DASHBOARD_NAME");
        String noScriptLabel    = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
        String labelGo = (String) itemDescMap.get("LBL_GO");
        String labelPage = (String) itemDescMap.get("LBL_PAGE");
        String labelOf = (String) itemDescMap.get("LBL_OF");
        String labelRefresh = (String) itemDescMap.get("LBL_REFRESH");
        String labelShowPrevious = (String) itemDescMap.get("LBL_SHOW_PREVIOUS");
        String labelShowNext = (String) itemDescMap.get("LBL_SHOW_NEXT");		
		String labelFilter = (String) itemDescMap.get("LBL_FILTER");
        String font         = (String)session.getAttribute("FONT");//HTML5 Changes
        String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
        String dashCss = "dash.css";
        if (logintheme.equals("FlexNewUI2.css")) {
            dashCss = "dash2.css";
        }else if (logintheme.equals("FlexNewUI3.css")) {//HTML5 Changes 6/OCT/2016 start
            dashCss = "dash3.css";
        }//HTML5 Changes 6/OCT/2016 end
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
  <head>
    <title>
      <%=StringEscapeUtils.escapeHTML(qDesc)%>
    </title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>
    <meta http-equiv="Content-Language"
          content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
    <meta http-equiv="cache-control" content="no-cache"></meta>
    <meta http-equiv="Pragma" content="no-cache"></meta>
    <meta http-equiv="Expires" content="0"></meta>
    <script type="text/javascript"
            src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>">
    </script>
	<script type="text/javascript">
		mainWin = parent.mainWin;
		var csrfVal = "<%= StringEscapeUtils.escapeJavaScript(CSRFtoken)%>";
		var winId = "<%= StringEscapeUtils.escapeJavaScript(winId)%>";
		var qType = "<%= StringEscapeUtils.escapeJavaScript(qType)%>";
		var qDesc = "<%= StringEscapeUtils.escapeJavaScript(qDesc)%>";
		var isDetail = "<%= StringEscapeUtils.escapeJavaScript(isDetail)%>";
		var tableContent ;
		var totalPages = parent.tabTableContent[winId+'totalPages'];
		var currPage = parent.tabTableContent[winId+'currPage'];
		var taskCount = parent.tabTableContent[winId+'taskCount'];
		if(isDetail=='Y'){
			tableContent = parent.tabTableContent[winId+'DETAILTABLE'];
		}else{
			tableContent = parent.tabTableContent[winId+'TABLE'];
		}
		var actions ;
		var reportId;

		if(winId=='null'){
			winId=null;
		}
		if(qType=='B'){
			reportId = parent.tabTableContent[winId+'REPORTID'];
			//tabTableContent['BAMURL'] = parent.tabTableContent[winId+'BAMURL'];
		}else
		{
			actions = parent.tabTableContent[winId+'ACTIONS'];
			//tabTableContent['ACTIONS'] = parent.tabTableContent[winId+'ACTIONS'];
		}
	</script>
  <noscript>
    <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
  </noscript>
  </head>
  <noscript>
    <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
  </noscript>
  <script type="text/javascript" src="Script/JS/Alert.js"></script>
  <noscript>
    <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
  </noscript>
  <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script>
  <noscript>
    <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
  </noscript>
  <script type="text/javascript" src="Script/JS/SmmsgBox.js"></script>
  <noscript>
    <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
  </noscript>
<%-- 12.1 Retro_Changes STARTS --%>
  <script type="text/javascript" src="Script/JS/WFReminderUtils.js"></script>
  <noscript>
    <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
  </noscript>
<%-- 12.1 Retro_Changes ENDS--%>
  <script type="text/javascript" src="Script/JS/BPELDashBoardUtil.js"></script>
  <noscript>
    <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
  </noscript>
  <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script>
  <noscript>
    <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
  </noscript>
  <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>"
        rel="stylesheet" type="text/css"/>-->
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
    <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
  <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>"
        rel="stylesheet" type="text/css"/>-->
	<!--<link href="Theme/<%=StringEscapeUtils.escapeURL(dashCss)%>" rel="stylesheet" type="text/css"/>-->
        <!--HTML5 Changes Start-->
        <!--
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
  <%
        if(!"B".equalsIgnoreCase(qType)){
        %>
  <body onload="Initialize();fnCalcHgtDashboard();Initialize();">
  <%
  }else{
  %>
  <body onload="Initialize();fnCalcHgtDashboard();">
  <%}%>
    <fieldset id="containerFldset" class="FSTcell" type="ME" view="ME">
      <div id="dataContainer" class="DIVMultipleSmall" name="dataContainer">
            <DIV class=WNDtitlebar id="WNDtitlebar">
                    <h1 class="WNDtitletxt" id="WNDtitletxt" ><%=StringEscapeUtils.escapeHTML("")%></h1>
                    <div class="WNDbuttons">
					<a class="WNDcls" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%= StringEscapeUtils.escapeHTML("CLOSE") %>" onclick="fnExitScreen()">
                        <span class="LBLinv"><%= StringEscapeUtils.escapeHTML("CLOSE") %></span>
                     </a>
					<a id="WNDbuttons" class="WNDmin" onkeydown="return fnHandleScrBtn(event)" onclick="if(this.disabled) return false; mainWin.addTab('<%= StringEscapeUtils.escapeJavaScript(winId)%>ChildWinDetail', '<%= StringEscapeUtils.escapeJavaScript(qDesc)%>', event)" title="Minimize" onmouseout="this.className='WNDmin'" onfocus="this.className='WNDminH'" onmouseover="this.className='WNDminH'" onblur="this.className='WNDmin'" href="#" accesskey="6">
						<span class="LBLinv">Minimize</span>
					</a>
                    </div>
            </DIV>        
	  <div id="multipleboxDiv" class="DIVmultiplebox">
      <div id="divBtnWFRenew" class="WNDtitlebar" style="display:block;">
					<h2 id="heading" class="WNDtitletxt"></h2>
					<div id="btnDiv12" style="float:right;margin-top:3px;margin-right:5px;">
						<label id="<%= StringEscapeUtils.escapeHTML(winId)%>lblfilter" for="<%= StringEscapeUtils.escapeHTML(winId)%>showFilterChkBoxDB" style="color:#ffffff;margin-right:5px;float:left;"><input id="<%= StringEscapeUtils.escapeHTML(winId)%>showFilterChkBoxDB" class="CHKStd" type="CHECKBOX" onclick="fnCheckFilter(event)"><%=StringEscapeUtils.escapeHTML(labelFilter)%></label>
						<button id="btnrefresh" class="Abut" onclick="fnRefreshDashBoardData(event)" accesskey="2">
							<img src="Images/widgetoneRefresh1.gif" alt="Filter"/>
						</button>
					</div>	
		</div>
		<div id ='btnActionDiv' class="DIVLinkBar" style="display:block">
		<div id="actionsDiv"  style="float:left; padding-bottom: 3px">
		<%--<button class='BTNtext' id ='BlowUp' onclick='fnBlowUP()'>Blow UP</button> --%>
		<button id="BlowUp" class="BTNimg" name="BTN_SINGLE_VIEW_BLK_DOCTYPE_CHECKLIST" tabindex="-1" onclick="fnBlowUP()" title="Blow UP">
		<span class="ICOsingleview" tabindex="-1">
			<span class="LBLinv">Blow UP</span>
		</span>
		</button>
		<select name="Actions" title="Actions" class="SELstd" id="ACTIONS" aria-required="false" size="0" REQUIRED="" LABEL_VALUE="Outcome">
		</select>
		<button id="BtnActionGo" class="BTNicon" onmouseout="this.className='BTNicon'" onmouseover="this.className='BTNiconH'" onblur="this.className='BTNicon'" onfocus="this.className='BTNiconH'" title="Go" onclick="fnDoDashBoardAction(event)">		
			<span class="ICOgo">
				<span class="LBLinv"><%=StringEscapeUtils.escapeHTML(labelPage)%></span>
			</span>
		</button>
		</div>
		<div id="btnDiv"  style="float:right; padding-bottom: 3px">
                <div id ='navDiv'>
				<table id='TEMPTABLE'>
				<TR><TD>
				<button class='BTNicon2' title="First"
                        onclick='displayFirstPage()' name="navFirst"
                        id='navFirst'>
                  <span tabindex='-1' class='ICOfirst2'></span>
                </button>
				</TD><TD>
                <button class='BTNicon2' title="Previous"
                        onclick='displayPrevPage()' name="navPrev" id='navPrev'>
                  <span tabindex='-1' class='ICOprevious'></span>
                </button>
				</TD><TD>
                <span class='SPNtext' title='Records'><%=StringEscapeUtils.escapeHTML(labelPage)%></span>
				</TD><TD>
                <span class='SPNtext' readonly="readOnly" type="number" size="1"
                      id="currPage" name="currPage"></span>
				</TD><TD>		
                <span class='SPNtext' readonly="readOnly" value="of" name="of"><%=StringEscapeUtils.escapeHTML(labelOf)%></span>
				</TD><TD>
                <span class='SPNtext' readonly="readOnly" type="number" size="1"
                      id="totalPages" name="totalPages"></span>
				</TD><TD>	  
                <button class='BTNicon2' onclick='displayNextPage()'
                        title="Next" onmouseover="this.className='BTNicon2'"
                        name='navNext' id='navNext'>
                  <span tabindex='-1' class='ICOnext'></span>
                </button>
				</TD><TD>
                <button class='BTNicon2' onclick='displayLastPage()'
                        title="Last" onmouseover="this.className='BTNicon2'"
                        name='navLast' id='navLast'>
                  <span tabindex='-1' class='ICOlast2'></span>
                </button>
				</TD><TD>
              <input type='hidden' id='currentCriteria' value=''></input>
                <img height='1' alt='' src="Images/ExtFlexblue/Icons/spacer.gif"
                     width='10'></img>
				</TD><TD>	 
                <span class='SPNtext' for='goto'>Jump to page</span>
				</TD><TD>
                <label class='LBLinv' for='goto'>Jump to page</label><input class='TXTstd'
                                                                id='goto'
                                                                size='1'
                                                                name='gotopage'></input>
				</TD><TD>												
		<button id="BtnActionGotoPage" class="BTNicon" onmouseout="this.className='BTNicon'" onmouseover="this.className='BTNiconH'" onblur="this.className='BTNicon'" onfocus="this.className='BTNiconH'" title="Go" onclick="goToPage()">		
			<span class="ICOgo">
				<span class="LBLinv">Go</span>
			</span>
		</button>
			</TD><TD>
</TR></TABLE>			
			</div>
		  </div>
		  </div>
          <div id="tableContainer" class="DIVMultipleSmallInner" style="overflow: auto; clear: both"></div>
        </div>
      </div>
    </fieldset>
  </body>
</html>