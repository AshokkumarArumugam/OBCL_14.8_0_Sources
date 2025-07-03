<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : Help.jsp
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
--------------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
**
**  Modified By          : Neethu Sreedharan
**  Modified On          : 07-Oct-2016
**  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                           to user as alert and on click of Ok button on alert window, screen will be 
                           unmasked and user can try the action again.
**  Retro Source         : 9NT1606_12_0_3_INTERNAL
**  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css

**	Modified By   : Selvam Manickam
** 	Modified on   : 26-Sep-2023
** 	Description   : F1 HELP - The pop-up window should appear on top of the existing screen without hiding the previous screen

-------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.BranchConfig"%>
<%  
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String userId        = (String) session.getAttribute("USERID");
    String entity        = (String) session.getAttribute("ENTITY");
    String ieCss         = (String)session.getAttribute("IECSS");
    String strTheme         = (String)session.getAttribute("THEME");
    String langISOMap       = ((String)session.getAttribute("LANGISOMAP")).toLowerCase();
    String langCode	    = (String)session.getAttribute("LANG");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");
    
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+langCode + "~" + entity, branchIdentifier,userId);
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String HelpTitle = (String)itemDescMap.get("LBL_HELP");
    String helpFilePath = BranchConstants.HELP_PAGE_PATH;
    String extHelpFilePath = BranchConfig.getInstance().getConfigValue("EXT_HELPFILE_PATH");//helpfile changes
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
    
    
%>
<html>
<head>
  <title><%=StringEscapeUtils.escapeHTML(HelpTitle)%></title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(langISOMap)%>">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
  <meta http-equiv="cache-control" content="no-cache">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content=0>
  <style type="text/css">
    .DIVHBodyContainer {
      display: block;
      overflow: auto;
      position: relative;
    }
  </style>
  <link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>
 <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
  <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(langISOMap)%>.css" rel="stylesheet" type="text/css"/>
  <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
  <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">
         <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
         <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
         <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
         
        <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
  <script type="text/javascript">
    var mainWin = parent.mainWin;
  </script>
   <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
  <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
   <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
  <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
  <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
  <script type="text/javascript" src="Script/JS/SmhTlBar.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
  <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
  <script type="text/javascript" src="Script/OJET/require-config.js"></script>
  <script type="text/javascript" src="Script/OJET/main_misc.js"></script>
        
	<script type="text/javascript">
    var csrfTok = '<%=StringEscapeUtils.escapeJavaScript(CSRFtoken)%>';
    var helpfilePath='<%=StringEscapeUtils.escapeJavaScript(helpFilePath)%>';
    var extHelpFilePath='<%=StringEscapeUtils.escapeJavaScript(extHelpFilePath)%>';
    var objHTTP = null;
     function setHeights() {
              
              var winObj = parent.document.getElementById("ChildWin");
              winObj.style.visibility = "visible";
              winObj.style.display = "block";

              winObj.style.display = "block";
              winObj.style.height = "100%";
              winObj.style.width = "100%";//For DIV
              //winObj.style.width = "100%";
              winObj.style.top = "0px";
              winObj.children[0].style.height = "100%";//For IFRAME
              winObj.children[0].style.width = "100%";
              winObj.children[0].style.top = "0px";
			  winObj.children[0].style.backgroundColor = "transparent"; //help window showing without hiding previous screen			  
              return winObj;
          }
 function handleServerResponse() {
    if (objHTTP.readyState == 4) {
        if(objHTTP.status == 200) {
            if (objHTTP.responseXML!=null && selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") { //session expiry change start //21798468  
                mainWin.mask(); 
                mainWin.sessionTimeOut = true;
                mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
                return false;
            }//session expiry change end
            var responseText = objHTTP.responseText;
            mainWin.inactiveTime = 0;
            document.getElementById("ResTree").children[0].innerHTML = responseText;
            fnCalcHgt();
            document.getElementById("BTN_OK").focus();
        }else {
            var responseText ="";
            mainWin.inactiveTime = 0;
            document.getElementById("ResTree").children[0].innerHTML = responseText;
            fnCalcHgt();
            document.getElementById("BTN_OK").focus();
        }
    }
}
        
    function fnLoadHelp() {
    if(mainWin.applicationName == "FCIS"){//helpfile changes start
        var iframeObj = document.createElement("iframe");
        var src="";
        if(typeof(parent.screenArgs) == 'undefined') src = "Help/" + mainWin.LangCode + "/" +extHelpFilePath;
        else src = parent.screenArgs["HELPFILE"];
        iframeObj.setAttribute("src",src);
        iframeObj.setAttribute("id","helpfile");
        iframeObj.setAttribute("class","oj-sm-width-full");
        iframeObj.setAttribute("style","min-height: 25rem;");    
//        iframeObj.setAttribute("onload","fnCalcHgt();");
        document.getElementById("DIVMainTmp").appendChild(iframeObj);
//        document.getElementById("BTN_OK").focus();
    }else{//help file changes end
        var helpFile = parent.screenArgs["HELPFILE"];
        objHTTP = createHTTPActiveXObject();
        if(helpfilePath!=""){
            var params ="helpFile="+helpFile;
			try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes
            objHTTP.open("POST", "helppagehandler", true);
            objHTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            objHTTP.setRequestHeader("X-CSRFTOKEN", csrfTok);
            objHTTP.onreadystatechange  = handleServerResponse;
            objHTTP.send(params);
			}  //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
             catch(exp){
             mainWin.handleNetWorkErr(exp);
             } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
        }else{
			try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
            objHTTP.open("POST", helpFile, false);
            objHTTP.setRequestHeader("Content-Type", "text/html");
            objHTTP.setRequestHeader("charset", "utf-8");
            objHTTP.onreadystatechange  = handleServerResponse;
            objHTTP.send(null);
			} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
            catch(exp){
              mainWin.handleNetWorkErr(exp);
            } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
        } 
      }
    }    
    function fnCalcHgt() {
      /*
      parent.document.getElementById("ChildWin").style.width  = document.getElementById("DIVWNDContainer").offsetWidth+"px";
      parent.document.getElementById("ChildWin").children[0].style.width = document.getElementById("DIVWNDContainer").offsetWidth+"px";
      parent.document.getElementById("ChildWin").style.height  = document.getElementById("DIVWNDContainer").offsetHeight+"px";
      parent.document.getElementById("ChildWin").children[0].style.height = document.getElementById("DIVWNDContainer").offsetHeight+"px";
      parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);
      parent.document.getElementById("ChildWin").style.top = document.getElementById("WNDtitlebar").offsetHeight+"px";
      parent.document.getElementById("ChildWin").style.left = "4px";
      */ 
       var containerDIV = "";
      var scrWidth = "";
      var scrHeight = "";
      if((parent.seqNo == undefined)){
          
    
          /*
          var scrWidth = document.getElementById("DIVScrContainer").offsetWidth;
          var scrHeight = parseInt(document.getElementById("DIVScrContainer").offsetHeight);
          */
          scrWidth = (mainWin.x* 60 /100);
          scrHeight = mainWin.y* 60 /100;
          if(typeof(parent.screenArgs) == 'undefined'){
            scrWidth = parent.document.getElementById("dashboard").offsetWidth-10;
            scrHeight = parent.document.getElementById("dashboard").offsetHeight-10;
          }
          
      }else{
         containerDIV = parent.seqNo;
         scrWidth = parseInt(parent.parent.document.getElementById(containerDIV).offsetWidth * 60 /100);
         scrHeight = parseInt(parent.parent.document.getElementById(containerDIV).offsetHeight * 50 /100);
      }
      containerDIV = "ChildWin";
      /*if (scrWidth > mainWin.x - 12)
          scrWidth = mainWin.x - 12;
      if(scrHeight > parseInt(mainWin.document.getElementById("vtab").offsetHeight - 4))
          scrHeight = parseInt(mainWin.document.getElementById("vtab").offsetHeight) - 4;*/

      parent.document.getElementById(containerDIV).style.width  = scrWidth+"px";
      parent.document.getElementById(containerDIV).children[0].style.width = scrWidth+"px";
      parent.document.getElementById(containerDIV).style.height  = scrHeight+"px";
      parent.document.getElementById(containerDIV).style.left = 2 + "px";
      parent.document.getElementById(containerDIV).children[0].style.height  = scrHeight+"px";
      document.getElementById("DIVWNDContainer").style.width = scrWidth + "px";  
      document.getElementById("DIVWNDContainer").style.height = scrHeight + "px";//21789250 
      document.getElementById("DIVScrContainer").style.width = document.getElementById("DIVWNDContainer").offsetWidth + "px";
      //document.getElementById("DIVScrContainer").style.height = document.getElementById("DIVWNDContainer").offsetHeight + "px"; //21789250 
      document.getElementById("DIVScrContainer").style.height = document.getElementById("DIVWNDContainer").offsetHeight - document.getElementById("WNDtitlebar").offsetHeight + "px"; //21789250 
      document.getElementById("DIVMainTmp").style.width = scrWidth +"px";
      
      //document.getElementById("ResTree").style.width  = scrWidth+"px";
      //document.getElementById("ResTree").style.height  = scrHeight+"px";
  
      var l_DivFooter = document.getElementById("DIVFooter").offsetHeight; 
      var l_DivTmpHgt = parseInt(scrHeight)-parseInt(l_DivFooter)-document.getElementById("WNDtitlebar").offsetHeight;
      document.getElementById("DIVMainTmp").style.height = parseInt(l_DivTmpHgt)+'px';
      
      parent.document.getElementById("ChildWin").style.top = document.getElementById("WNDtitlebar").offsetHeight+"px";
      parent.document.getElementById("ChildWin").style.left = "4px";
      if(document.getElementById("helpfile")){//helpfile changes start
        document.getElementById("helpfile").height = document.getElementById("DIVMainTmp").offsetHeight-12;
        document.getElementById("helpfile").width = document.getElementById("DIVMainTmp").offsetWidth-12;
        if(typeof(parent.screenArgs) == 'undefined'){
            parent.document.getElementById("ChildWin").style.top = parent.document.getElementById("masthead").offsetHeight + 4 + "px";
            parent.document.getElementById("ChildWin").style.left = parent.document.getElementById("vtab").offsetWidth + "px";
            document.getElementById("helpfile").height = parent.document.getElementById("vTabDB_DASHBOARD").offsetHeight + "px";//-12;
        	document.getElementById("helpfile").width = parent.document.getElementById("vTabDB_DASHBOARD").offsetWidth + "px";//-12;
        }
      }//helpfile changes end
    }
    function HelpAccessKeys(e){
      var evnt = window.event || e;
      mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
      if (evnt.keyCode == 27) {
          fnExitHelpWindow();
          return;
      }
    }
    function fnHandleHelpBtn(e){
      var evnt = window.event || e;
      var srcElement = getEventSourceElement(evnt);
      
    }
    function handleScrObj(scrObj,e){
      var e = window.event || e;
      if(e.keyCode == 9 && !e.shiftKey){
          document.getElementById("WNDbuttons").focus();   
          preventpropagate(e);
          return false;
      } else if(e.keyCode == 9 && e.shiftKey) {
          document.getElementById("BTN_OK").focus();   
          preventpropagate(e);
          return false;
      }
      return true;
    }
	</script>
</head>
<body onload="fnLoadHelp()" oncontextmenu="return false;" onkeydown="HelpAccessKeys(event)">
<oj-dialog id="scrollingDialog"  initial-visibility="show"   resize-behavior="resizable" class="oj-sm-width-2/3 frames" style="display: block; top: 164.016px; left: 383px; position: relative;"  drag-affordance="title-bar">
   
               <DIV   slot=header id="wndtitle" class="oj-dialog-title" >
                    <h1><%=StringEscapeUtils.escapeHTML(HelpTitle)%></h1>
                </DIV>
            
               <DIV slot="body" id="wndwidth">
                        <div id="ResTree"  >
                          <div id="DIVMainTmp"  class="oj-sm-width-full"  style="height:100%"></div>
                          
      </div>
                     
              </DIV>
    	
    
               <DIV slot="footer">
                  <div class="oj-flex-bar oj-sm-margin-4x-bottom" >
                
                      <div class="oj-sm-margin-4x-top oj-flex-bar-end">
                    
                           <oj-button  class="action-button-primary oj-sm-margin-1x" chroming="solid"   
                           value="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_OK"))%>" 
                            default="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_OK"))%>" 
                             onkeydown="return handleScrObj(this,event)" onclick="fnExitHelpWindow()" id="BTN_OK" 
                             name=<%=StringEscapeUtils.escapeHTML("LBL_OK")%> >
                    <%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_OK"))%></oj-button>
    </div>
  </div>
</div>

        </oj-dialog>
</body>
</html>