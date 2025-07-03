<%@ page contentType="text/html;charset=windows-1252"%>
<%@ page import="com.ofss.fcc.bpelif.IBAMUtils"%>
<%@ page import="com.ofss.fcc.common.BPELManager"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.common.FCApplicationGlobals"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="java.net.URLEncoder"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Set"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.branch.BranchUtil"%>
<!DOCTYPE html><!--HTML5 Changes-->
<%
    /*JAN_CPU_BUG-25068346 Start-- */
	response.setCharacterEncoding("UTF-8");
	response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 );
    /*JAN_CPU_BUG-25068346 End-- */
request.setCharacterEncoding("UTF-8");
String jsParser         =(String)session.getAttribute("JS_PARSER");
String browserCSS       =(String)session.getAttribute("BROWSER_CSS");
String strTheme         =(String)session.getAttribute("THEME");
String langISOMap       = ((String)session.getAttribute("LANGISOMAP")).toLowerCase();
String langCode	    = (String)session.getAttribute("LANG");
String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
String userId           = FCUtility.validateParameter((String)session.getAttribute("USERID"));
String entity           = FCUtility.validateParameter((String)session.getAttribute("ENTITY"));
String mode = (String) request.getParameter("mode");
Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+langCode + "~" + entity, branchIdentifier,userId);
String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
String redirectURL           = FCUtility.validateFilePath((String)session.getAttribute("redirectURL"));
String token           = FCUtility.validateParameter((String)session.getAttribute("token"));
String documentId    =  FCUtility.validateParameter((String) request.getParameter("DocumentId")); 
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
if(mode !=null && ("fwd".equals(mode)||"fwdbam".equals(mode)||"fwdobi".equals(mode))){
%>
<html>
  <head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	 <meta http-equiv="cache-control" content="no-cache">
      <meta http-equiv="Pragma" content="no-cache">
      <meta http-equiv="Expires" content=0>
      <base target="_self" >
    <title></title>
    <script language="JavaScript">
      function submitForm() {
          //document.tempform.action = action;
          document.Myform1.submit();
      }
    </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
  </head>
  <body  onload ="submitForm()">
  <%
  if("fwdbam".equals(mode)){
  %>
  <form name="Myform1" action="<%=FCUtility.validateFilePath(redirectURL)%>" method="get">
  <%
  }else{
  %>
  <form name="Myform1" action="<%=FCUtility.validateFilePath(redirectURL)%>" method="post">
  <%
  }
  %>
      <input type="hidden" name="id" value="<%=userId%>"/>
      <input type="hidden" name="passwd" value="<%=token%>"/>
      <input type="hidden" name="NQUser" value="<%=userId%><%=token%>"/>
      <input type="hidden" name="NQPassword" value="<%=token%>"/>
      <input type="hidden" id="j_username" name="j_username" value="<%=userId%>"/>
      <input type="hidden" id="j_password" name="j_password" value="<%=token%>"/>
      <%
      if(!"fwdobi".equals(mode)){
      %>      
      <input type="hidden" name="X-CSRFTOKEN" value='<%=StringEscapeUtils.escapeHTML((String)session.getAttribute("X-CSRFTOKEN"))%>'/>
      <%
      }
      %>      
    </form>
  </body>
  </html>
  <%
}
else if (mode !=null && "ipmedit".equals(mode)){
%>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1252"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
    <title>reportproxy1</title>
    <%
  FCUserGlobals uc        = (FCUserGlobals)request.getSession().getAttribute(BranchConstants.USERGLOBALS);
  String adaptor =(String) FCApplicationGlobals.getProps().get("DMS_ADAPTER_TYPE");
  String loginService =(String) FCApplicationGlobals.getProps().get("OracleIPM11G.LoginService.EndpointAddress");
  loginService = loginService.substring(0,loginService.indexOf("imaging")+8);
  redirectURL =loginService+"faces/Pages/UrlTools.jspx?ToolName=ViewDocument&showTabs=false&HideBanner=true&HideWorkcenter=true&DocumentId="+documentId;
  if(!"ORACLE_IPM_ADAPTER".equals(adaptor)){
        response.sendError(404);
    }
   %>
  </head>
  <body>
    <%
    response.setHeader("Location", redirectURL);
    response.sendError(302);
%>
  </body>
</html>
<%
}
else {
String winId    = (String) request.getParameter("winId"); 
String reportId    = (String) request.getParameter("reportId"); 
String reporType    = (String) request.getParameter("reporType"); 
String screenType    = (String) request.getParameter("screenType"); 
String description = (String) request.getParameter("title");
FBContext fbContext = new FBContext(userId);
redirectURL ="";
Map requestMap =(Map) FCUtility.checkForNull(request.getParameterMap());
Set requestParamNames = requestMap.keySet();
Iterator<String> itr = requestParamNames.iterator();
StringBuffer sb=new StringBuffer();
while(itr.hasNext()){
    String paramName =itr.next();
    String[] paramsValues =(String[]) requestMap.get(paramName);
    if(!paramName.contains("PM_"))
        continue;
    for(int i=0;i<paramsValues.length;i++){
        sb.append("&").append("_params").append(paramName).append("=").append(paramsValues[i]);    
    }
}
long seqNo =0;
%>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1252"/>
    <title>reportproxy1</title>
        <link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>
       <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(langISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>    
        <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
        <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript">
    var mainWin        = parent;
    var userFuncId ="";
    var functionId ="";
    </script>
    <%
    if(!"BL".equals(reporType)){
    %>
    <script type="text/javascript">
    var reportId = parent.reportId;
      function fnCalcHgtDashboard() {
        var scrWidth = "";
		var winId = "<%= StringEscapeUtils.escapeJavaScript(winId)%>";
        if (parent.document.getElementById(winId).className == "DIVColumnOne" || parent.document.getElementById(winId).className == "DIVColumnOneAndHalf") {
          parent.document.getElementById(winId).style.width = parent.document.getElementById(winId).parentNode.offsetWidth / 2 - 4 + "px";
          scrWidth = parent.document.getElementById(winId).parentNode.offsetWidth / 2 - 4;
        }
        else {
          parent.document.getElementById(winId).style.width = parent.document.getElementById(winId).parentNode.offsetWidth - 4 + "px";
          scrWidth = parent.document.getElementById(winId).parentNode.offsetWidth - 4;
        }
        var scrHeight = parent.document.getElementById(winId).parentNode.offsetHeight;
        parent.document.getElementById(winId).style.height = scrHeight + "px";
        parent.document.getElementById(winId).children[0].style.height = scrHeight + "px";
        document.getElementById("containerFldset").style.height = scrHeight + "px";
        parent.document.getElementById(winId).children[0].style.width = scrWidth + "px";
        document.getElementById("containerFldset").style.width = scrWidth + "px";
      }
    </script>
    <% 
    }
  FCUserGlobals uc        = (FCUserGlobals)request.getSession().getAttribute(BranchConstants.USERGLOBALS);
  IBAMUtils bamUtils = null;
    if("BL".equals(reporType)){
        bamUtils = BPELManager.getInstance().getBAMUtils("BAMLOGIN",uc.getCurrUser(),entity);
        //response.setHeader("Location", bamUtils.getRootUri()+"/j_security_check?j_username="+uc.getCurrUser()+"&j_password="+URLEncoder.encode(bamUtils.getUser_password(), "UTF-8"));
        //response.setHeader("Location", bamUtils.getRootUri());
        //response.sendError(302);
        session.setAttribute("redirectURL", bamUtils.getRootUri()+"/faces/j_security_check");
    session.setAttribute("token", URLEncoder.encode(bamUtils.getUser_password(), "UTF-8"));  
     response.setHeader("Location", "DispReport.jsp?mode=fwdbam");
     response.sendError(302);
    }else{
    bamUtils = BPELManager.getInstance().getBAMUtils(reportId,uc.getCurrUser(),entity);
    seqNo = bamUtils.getSeqNo();
  try{
  if("BIP".equals(bamUtils.getReportType())){
    //redirectURL =bamUtils.getRootBIPUri()+bamUtils.getReportUrl()+"&id="+uc.getCurrUser()+"&passwd="+URLEncoder.encode(bamUtils.getUser_password(), "UTF-8"); //RND changes
    redirectURL =bamUtils.getRootBIPUri()+bamUtils.getReportUrl(); //RND changes
    session.setAttribute("redirectURL", redirectURL+sb.toString());
    session.setAttribute("token", URLEncoder.encode(bamUtils.getUser_password(), "UTF-8"));
  }
    else if("OBI".equals(bamUtils.getReportType())){
   // redirectURL =bamUtils.getRootBIPUri()+bamUtils.getReportUrl()+"&NQUser="+uc.getCurrUser()+"&NQPassword="+URLEncoder.encode(bamUtils.getUser_password(), "UTF-8"); //BIP changes
  // redirectURL =bamUtils.getRootBIPUri()+bamUtils.getReportUrl()+"&NQUser="+uc.getCurrUser()+"&NQPassword=1"; //BIP changes
   redirectURL =bamUtils.getRootBIPUri()+bamUtils.getReportUrl(); //RND changes
   session.setAttribute("redirectURL", redirectURL+sb.toString());
   session.setAttribute("token", URLEncoder.encode(bamUtils.getUser_password(), "UTF-8"));
   //session.setAttribute("token", URLEncoder.encode("1", "UTF-8"));
  }
  else{
  redirectURL = bamUtils.getRootUri() + bamUtils.getReportUrl();
  redirectURL =  redirectURL.replaceAll("#USER_ID_L#",uc.getCurrUser().toLowerCase());
  redirectURL =  redirectURL.replaceAll("#USER_ID_U#",uc.getCurrUser().toUpperCase());
  redirectURL =  redirectURL.replaceAll("#BRANCH_CODE#",uc.getCurrBranch());
session.setAttribute("redirectURL", redirectURL+sb.toString());
    }
        %>
  </head>
  <%
  if(!"SCREEN".equals(screenType)){
  %>
  <body>
  <%
  }else{ 
  %>
    <script type="text/javascript"> 
        var seqNo ="<%=seqNo%>";
        parent.document.getElementById("ChildReportWin").id  = seqNo;
        function fnCalcHeight(){
            containerDIV = seqNo;
            parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
            parent.document.getElementById(containerDIV).children[0].id +=seqNo;
            document.getElementById("reportWindow").style.width =parent.document.getElementById(containerDIV).offsetWidth - 4+"px";
            document.getElementById("reportWindow").style.height =parent.document.getElementById(containerDIV).offsetHeight -30 +"px";
        }
      function fnExitAll(v_scrName, e) {
        var e = window.event || e;
        var winObj = mainWin.document.getElementById(seqNo);
        mainWin.fnExit(winObj);
        e.cancelBubble = true;
    }        
    </script>
  <body onload="fnCalcHeight();">
    <% 
    }
    if(!"SCREEN".equals(screenType)){
     if("BIP".equals(bamUtils.getReportType())){
        response.setHeader("Location", "DispReport.jsp?mode=fwd");
    }else if("OBI".equals(bamUtils.getReportType())){
        response.setHeader("Location", "DispReport.jsp?mode=fwdobi");
    }else{
        response.setHeader("Location", redirectURL);
    }
    response.sendError(302);
    }else{
    redirectURL +=sb.toString();
    %>
        <div class="WNDcontainer" id="DIVWNDContainer">
            <DIV class=WNDtitlebar id="WNDtitlebar" onmousedown="startDrag('<%=seqNo%>', event)">
                <div class="WNDtitle" id="wndtitle">
                    <B class="BTNicon">
                        <span class="ICOflexcube"></span>
                    </B>
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(description)%>&nbsp;</h1>
                    <%-- 12.0.2--%>
                  <%--  <span onclick="fnAddToFavorites('<%=StringEscapeUtils.escapeJavaScript(funcID)%>');" style="	FONT-FAMILY: Arial, Helvetica, sans-serif;COLOR: #00f;FONT-SIZE: 0.74em;float:right; padding-right:3px; text-decoration:underline;" >Add to Favorites</span></h1>--%>
                    <div class="WNDbuttons">
                        <a class="WNDcls" accesskey="7" id ="WNDbuttons" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onclick="if(this.disabled) return false; fnExitAll('', event)" onkeydown="return fnHandleScrBtn(event)">
                        <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                      </a>
                       <%-- Security bug SEC-12-Patch-081 fixes starts  --%> 
                      <a class="WNDmin" accesskey="6" id ="WNDbuttonsMin" href="#" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%>" onclick="if(this.disabled) return false; mainWin.addTab('<%=seqNo%>', '<%=StringEscapeUtils.escapeJavaScript(description)%>', event)" onkeydown="return fnHandleScrBtn(event)">
                        <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%></span>
                      </a>
                       <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
                    </div>
                </div>
            </DIV>
            <div class="WNDcontent" id="DIVScrContainer">
                <div id="ResTree">
                <%--<iframe id="reportWindow" src="<%=redirectURL%>"/>--%>
                <%
                if("BIP".equals(bamUtils.getReportType())){
                %>
                <iframe id="reportWindow" src="DispReport.jsp?mode=fwd"/>
                <%
                }else if( "OBI".equals(bamUtils.getReportType())){
                %>
                <iframe id="reportWindow" src="DispReport.jsp?mode=fwdobi"/>
                <%
                }else{
                %>
                <iframe id="reportWindow" src="<%=FCUtility.validateFilePath(redirectURL)%>"/>
                <%
                }
                %>
                </div>
            </div>
        </div>      
    <%
    }
    /*}12.0.3 Commented
  else  
    response.sendError(404);
    */
    }catch(Exception e){
      response.sendError(404);
    }
    }
%>
  </body>
</html>
<%}%>