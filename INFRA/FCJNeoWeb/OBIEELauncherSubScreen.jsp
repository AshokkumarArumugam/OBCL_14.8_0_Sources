<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : OBIEELauncherSubScreen.jsp
**
** Module       : FCJWeb
**
**This source is part of the Oracle Flexcube Universal Banking Software Product. 

**Copyright © 2015 , 2016, Oracle and/or its affiliates.  All rights reserved. 

**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East), 
**Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes
-------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes 10-Mar-17-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.common.BranchConfig"%>
<%@ page import="com.ofss.fcc.utility.FCGenerateSys"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%
    String scrName	        = FCUtility.validateParameter(request.getParameter("scr"));
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String ieCss         = (String)session.getAttribute("IECSS");
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String Strlang          = (String)session.getAttribute("LANG");
    String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
    String StrUserId        = (String) session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String strTheme         = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String FCJStream        = (String)session.getAttribute("FCJStream");
    String paramList        = FCUtility.validateParameter(request.getParameter("paramOp"));
    FCUserGlobals Objuc     = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");
    String uiXML	= FCUtility.validateParameter(request.getParameter("uixml"));
    String funcID	    = FCUtility.validateParameter(request.getParameter("functionId"));
    String source           = FCUtility.validateParameter(request.getParameter("SourceCode"));
    String obiee_signout     =BranchConfig.getInstance().getConfigValue("OBIEE_SIGNOUT");
    FBContext fbContext     = new FBContext(StrUserId);
    BranchLogger brnLogger  = new BranchLogger(StrUserId);
    fbContext.setBrnLogger(brnLogger);
    String scrType = FCUtility.validateParameter(request.getParameter("scrType"));
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
    if ("".equalsIgnoreCase(scrName)) {
        scrName = "CVS_UNKNOWN";
    }
    String description          = FCUtility.validateParameter((String)request.getParameter("title"));
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String strExit            = (String)itemDescMap.get("LBL_EXIT");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script type="text/javascript">
    var mainWin        = parent.mainWin;
    var actionSeqArr        =new Array();
    var CSRFtoken           = '<%=StringEscapeUtils.escapeJavaScript(CSRFtoken)%>';
    var scrName             = '<%=StringEscapeUtils.escapeJavaScript(scrName)%>';
    var seqNo               =  parent.seqNo;
    var functionId          = '<%=StringEscapeUtils.escapeJavaScript(funcID)%>';
    var source              = '<%=StringEscapeUtils.escapeJavaScript(source)%>';
    var paramList           = '<%=StringEscapeUtils.escapeJavaScript(paramList)%>'
    var obiee_signout       = '<%=StringEscapeUtils.escapeJavaScript(obiee_signout)%>';
    //mainWin.isOBIEELaunched = 'Y';
    mainWin.obiee_signout   = obiee_signout;
    paramList = replaceAll(paramList,"_AMP_","&");
    var actionSeqNo         = null;
    var actionType          = null;
    var parentScrID = "ChildWin";   
        if(typeof(parent.fromSubScr) == 'undefined') {
            parentScrID = parent.seqNo;
        }
    var launcherDIVWidth     = parent.parent.document.getElementById(parentScrID).style.width;
    var launcherDIVHeight    = parent.parent.document.getElementById(parentScrID).style.height;
    var launcherIFWidth      = parent.parent.document.getElementById(parentScrID).children[0].style.width;
    var launcherIFHeight     = parent.parent.document.getElementById(parentScrID).children[0].style.height;
    var launcherResTreeHeight= parent.document.getElementById("DIVScrContainer").style.height;
    var launcherResTreeWidth = parent.document.getElementById("DIVScrContainer").style.width;
    var launcherHeaderWidth  = parent.document.getElementById("DIVWNDContainer").style.width;
    var launcherLeft         = parent.parent.document.getElementById(parentScrID).style.left;
    
 </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>      
<script type="text/javascript" src="Script/ExtJS/Extensible.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script type="text/javascript" src="Script/JS/SmhTlBar.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script type="text/javascript" src="Script/ExtJS/ExtensibleUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script type="text/javascript">
    function fncalcHgt(){
        //HTML5 Changes 10-Mar-17 Start
        if (mainWin.document.getElementById("vtab").style.display != "none") {
            mainWin.showHideVtab();
        }//HTML5 Changes 10-Mar-17 End        
        var mainDiv = null;
        if (parseInt(mainWin.document.getElementById("dashboard").offsetHeight) > 0){
            mainDiv =  mainWin.document.getElementById("dashboard");
        } else{
            mainDiv =  mainWin.document.getElementById("MenuSearchDiv");
        }
        if (parent.seqNo) {
            containerDIV = parent.seqNo;
            parent.parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
        }
        var containerDIV = seqNo;
        var mainScrHeight = parseInt(mainDiv.offsetHeight);
        parent.parent.document.getElementById(containerDIV).style.height = mainScrHeight + "px";
        parent.parent.document.getElementById(containerDIV).style.width = (mainWin.x - 3) + "px";//HTML5 Changes 10-Mar-17
        parent.document.getElementById("DIVWNDContainer").style.width=(mainWin.x - 3) +"px";//HTML5 Changes 10-Mar-17
        parent.document.getElementById("ifrSubScreen").style.width = parent.parent.document.getElementById(containerDIV).offsetWidth + "px";
        parent.document.getElementById("ifrSubScreen").style.height = (parent.parent.document.getElementById(containerDIV).offsetHeight -4) + "px";
        parent.parent.document.getElementById(containerDIV).children[0].style.width = parent.parent.document.getElementById(containerDIV).offsetWidth + "px";
        parent.parent.document.getElementById(containerDIV).children[0].style.height = parent.parent.document.getElementById(containerDIV).offsetHeight + "px";
        document.getElementById("OBIEEContainerSubScreen").style.height = parent.parent.document.getElementById(containerDIV).offsetHeight - (document.getElementById("DIVFooter").offsetHeight + (document.getElementById("WNDtitlebar").offsetHeight * 2)) + "px";
        document.getElementById("OBIEEContainerSubScreen").style.width = (parent.parent.document.getElementById(containerDIV).offsetWidth ) + "px";
        setHorizontalPosition( parent.parent.document.getElementById(containerDIV), false, 0);//HTML5 Changes 10-Mar-17        
        parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);
        parent.mask();
        document.getElementById("BTN_EXIT").focus();
		mainWin.document.getElementById("fastpath").value=functionId;//fix for 20134003 
        return true;
    }
    function attachIframe(){//fix for bug#20064560 starts
    if(mainWin.isOBIEELaunched == 'N'){
        mainWin.isOBIEELaunched = 'Y';  
        var iframeObj = document.createElement("IFRAME");
        iframeObj.setAttribute("src",obiee_signout);
        iframeObj.setAttribute("visibility","hidden");
        iframeObj.style.height = "0" + "px";
        iframeObj.style.width = "0" + "px";
        document.body.appendChild(iframeObj);
    }//fix for bug#20064560 ends
      objHTTP = createHTTPActiveXObject();
      objHTTP.open("POST","obieeservlet?actionType=subscr&seqNo="+seqNo+"&funcID="+functionId+"&source="+source,false);
      objHTTP.setRequestHeader("Content-Type","application/xml");
      objHTTP.setRequestHeader("X-CSRFTOKEN",'<%=StringEscapeUtils.escapeJavaScript(CSRFtoken)%>');
      objHTTP.setRequestHeader("charset","utf-8");
      objHTTP.send(null);
      var iframeObj = document.createElement("IFRAME");
      if (objHTTP.status == 200) {
      var response = objHTTP.responseXML;
      actionSeqNo = getNodeText(selectSingleNode(response, "RESPONSE/ACSEQNO"));
      var url = getNodeText(selectSingleNode(response, "RESPONSE/OBIEEURL"));   
      iframeObj.setAttribute("name", "OBIEEContainerSubScreen");
      iframeObj.setAttribute("id", "OBIEEContainerSubScreen");
      iframeObj.setAttribute("src",encodeURI(url+paramList));
      iframeObj.setAttribute("frameBorder", "0");
      iframeObj.setAttribute("onload", "fnLoadSuccess();");
      iframeObj.setAttribute("style", "width: 100%; height: 100%; z-index: 10;overflow:auto;");
      document.getElementById("DIVScrContainer").appendChild(iframeObj);
       }
      return true;
    }
        function fnCheckIndex(actionSeqNo){
        if(typeof(actionSeqArr.indexOf)!= "undefined"){
            if(actionSeqArr.indexOf(actionSeqNo) != -1){
                return true;
            }
        }else{
            for(var i=0;i<actionSeqArr.length;i++){
                if(actionSeqArr[i] == actionSeqNo){
                    return true;
                }
            }
        }        
        return false;
    }
    function fnLoadSuccess(){
        if(!fnCheckIndex(actionSeqNo)){
                objHTTP = createHTTPActiveXObject();
                objHTTP.open("POST", "obieeservlet?actionSeqNo="+actionSeqNo+"&actionType=updateOBIEE", true);//if true is given then its a synchronous call
                objHTTP.setRequestHeader("Content-Type", "application/xml");
                objHTTP.setRequestHeader("X-CSRFTOKEN", '<%=StringEscapeUtils.escapeJavaScript(CSRFtoken)%>');
                objHTTP.setRequestHeader("charset", "utf-8");
                objHTTP.send(null);
            actionSeqArr.push(actionSeqNo);
        }
        return;
    }
    </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>   
<html>
    <head>
        <title><%=StringEscapeUtils.escapeHTML(description)%></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252"/>
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
    </head>
    <body class="BDYform" onkeydown="return fnHandleButtons(event)" oncontextmenu = "return false;" 
    onload="attachIframe();fncalcHgt();" onhelp="return disableDefault();">
        <div class="WNDcontainer" id="DIVWNDContainer">
            <DIV class=WNDtitlebar id="WNDtitlebar" onmousedown="startDrag('ChildWin', event)">
                <div class="WNDtitle" id="wndtitle">
                    <B class="BTNicon">
                        <span class="ICOflexcube"></span>
                    </B>
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(description)%>&nbsp;</h1>
                    <div class="WNDbuttons">
                        <a id="WNDbuttons" class="WNDcls" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" onclick="if(this.disabled) return false; fnExitAll(scrName, event);" onkeydown="return fnHandleScrBtn(event)" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>">
                        <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="WNDcontent" id="DIVScrContainer">
                <div id="ResTree"></div>
                <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
            </div>    
            <div id="DIVFooter" class="DIVfooter">
                <div style="text-align:right; padding:.75em">  
                    <input class="BTNfooterH"  style="margin-left:8px;margin-right:8px;" Default="<%=StringEscapeUtils.escapeHTML(strExit)%>" onblur="this.className='BTNfooter'" value="<%=StringEscapeUtils.escapeHTML(strExit)%>" id="BTN_EXIT" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="if(this.disabled) return false; fnExitAll(scrName, event);"  onkeydown="return handleScrObj(this,event)" name="<%=StringEscapeUtils.escapeHTML(strExit)%>" type="button"/>
                </div> 
            </div>
    </div>    
        <div id="masker" class="masker" style="display:none">
            <div id="Div_AlertWin" class="showPopUp" onclose="fnCloseAlertWin(event)" oncancel="fnExitAlertWin(event)"  style="position:absolute;display:none"><!--HTML5 Changes-->
                <iframe id="ifr_AlertWin" class="frames" src="" allowtransparency="yes" frameborder="0" scrolling="no"></iframe>
            </div>
            <div id="Div_ChildWin" style="display:none; width:100%; height:100%">
            </div>
        </div>
    </body>
</html>