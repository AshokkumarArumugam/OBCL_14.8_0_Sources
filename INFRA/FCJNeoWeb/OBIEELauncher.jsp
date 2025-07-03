<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : OBIEELauncher.jsp
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
<%@ page contentType="text/html;charset=windows-1252"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.common.BranchConfig"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<% 
  /*JAN_CPU_BUG-25068346 Start-- */
	response.setCharacterEncoding("UTF-8");
	response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 );
	request.setCharacterEncoding("UTF-8");
        /*JAN_CPU_BUG-25068346 End-- */
    String description      = FCUtility.validateParameter((String) request.getAttribute("description"));
    String strUserId = (String)session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    String jsParser         =(String)session.getAttribute("JS_PARSER");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String branch          = (String)session.getAttribute("BRANCH_CODE"); 
    String Strlang         = (String)session.getAttribute("LANG");
    String langISOMap       = ((String)session.getAttribute("LANGISOMAP")).toLowerCase();
    String strTheme         =(String)session.getAttribute("THEME");
    String browserCSS       =(String)session.getAttribute("BROWSER_CSS");
    String ieCss            = FCUtility.validateParameter((String)session.getAttribute("IECSS"));
    String seqNo            = FCUtility.validateParameter((String)request.getAttribute("sequenceno"));
    String funcID	    = FCUtility.validateParameter((String) request.getAttribute("functionid"));
    String userFuncId       = FCUtility.validateParameter((String) request.getAttribute("userFunctionId"));
    String terminalId       = (String) FCUtility.validateParameter(FCUtility.getCleintIPAddr(request));
    String obiee_signout    =BranchConfig.getInstance().getConfigValue("OBIEE_SIGNOUT");
    String CSRFtoken        = (String)session.getAttribute("X-CSRFTOKEN");
        if(description!=null && !"null".equals(description)) {
            description=description.replace("_amp_", "&");
        }
    FBContext fbContext     = new FBContext(strUserId);    
    String actionType       = FCUtility.validateParameter((String)request.getParameter("actionType"));
    Map itemDescMap         = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,strUserId);    
    String strExit          = (String)itemDescMap.get("LBL_EXIT");
    String noScriptLabel    = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String url              = FCUtility.validateParameter((String)request.getAttribute("url"));
    String actionSeqNo      = FCUtility.validateParameter((String)request.getAttribute("actionSeqNo"));
    String parentSeqNo      = FCUtility.validateParameter((String)request.getAttribute("parentSeqNo"));
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<!--<script type="text/javascript" src="Script/JS/SmmdiFrm.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
<script type="text/javascript">
    var mainWin        = parent;
    var meBlockResponse     = "";
    var isPartialDOM        = false;
    var recDataLength       = new Array();
    //var timeLogsArray = new Array();
    var seqNo               = '<%=StringEscapeUtils.escapeJavaScript(seqNo)%>'
    var functionId 	    = '<%= StringEscapeUtils.escapeJavaScript(funcID) %>';
    var userFuncId 	    = '<%= StringEscapeUtils.escapeJavaScript(userFuncId) %>';
    var gAction             = "";
    var url                 = '<%=StringEscapeUtils.escapeJavaScript(url)%>';
    var actionSeqNo         = '<%=StringEscapeUtils.escapeJavaScript(actionSeqNo)%>';
    var CSRFtoken           = '<%=StringEscapeUtils.escapeJavaScript(CSRFtoken)%>';
    var actionType          = '<%=StringEscapeUtils.escapeJavaScript(actionType)%>';
    var obiee_signout       = '<%=StringEscapeUtils.escapeJavaScript(obiee_signout)%>';
    var parentSeqNo         =  '<%=StringEscapeUtils.escapeJavaScript(parentSeqNo)%>';
    var actions_arr         = new Array();
    var actionSeqArr        = new Array();
    mainWin.obiee_signout   = obiee_signout;
    parent.document.getElementById("testwin").id     = seqNo;
    parent.document.getElementById(seqNo).className     = "dhtmlwindow functionCont show";//HTML5 Changes 10-Mar-17
    url = replaceAll(url,"_SLH_","/");
    url = replaceAll(url,"_BSLH_","\\");
    url = replaceAll(url,"_AMP_","&");
    function fnCalcHgts() {
        var mainDiv = null;
        if (parseInt(mainWin.document.getElementById("dashboard").offsetHeight) > 0){
            mainDiv =  mainWin.document.getElementById("dashboard");
        } else{
            mainDiv =  mainWin.document.getElementById("MenuSearchDiv");
        }
        //HTML5 Changes 10-Mar-17 Start
        if (mainWin.document.getElementById("vtab").style.display != "none") {
            mainWin.showHideVtab();
        }//HTML5 Changes 10-Mar-17 End        
        var containerDIV = seqNo;
        var mainScrHeight = parseInt(mainDiv.offsetHeight);
        parent.parent.document.getElementById(containerDIV).style.height = mainScrHeight + "px";
        parent.parent.document.getElementById(containerDIV).style.width = (mainWin.x - 2) + "px";//HTML5 Changes 10-Mar-17
        parent.parent.document.getElementById(containerDIV).children[0].style.width = parent.parent.document.getElementById(containerDIV).offsetWidth + "px";
        parent.parent.document.getElementById(containerDIV).children[0].style.height = parent.parent.document.getElementById(containerDIV).offsetHeight + "px";
        document.getElementById("OBIEEContainer").style.height = parent.parent.document.getElementById(containerDIV).offsetHeight - (document.getElementById("WNDfooter").offsetHeight + document.getElementById("WNDtitlebar").offsetHeight) + "px";
        document.getElementById("OBIEEContainer").style.width = (parent.parent.document.getElementById(containerDIV).offsetWidth ) + "px";
        document.getElementById("DIVScrContainer").style.height = parent.parent.document.getElementById(containerDIV).children[0].offsetHeight ;
        document.getElementById("DIVScrContainer").style.width = parent.parent.document.getElementById(containerDIV).children[0].offsetWidth ;
        parent.parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight - 3 + "px";//HTML5 Changes 10-Mar-17
        setHorizontalPosition( parent.parent.document.getElementById(containerDIV), false, 0); //HTML5 Changes 10-Mar-17
        mainWin.document.getElementById("fastpath").value=functionId;//fix for 20134003 
        document.getElementById("BTN_EXIT").focus();
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
    }//fix for bug#20064560  ends.
        var iframeObj = document.createElement("IFRAME");
        iframeObj.setAttribute("name", "OBIEEContainer");
        iframeObj.setAttribute("id", "OBIEEContainer");
        iframeObj.setAttribute("src",encodeURI(url));
        iframeObj.setAttribute("frameBorder", "0");
        iframeObj.setAttribute("onload", "fnLoadSuccess();fnCalcHgts();");
        iframeObj.setAttribute("style", "width: 100%; height: 100%; z-index: 10;overflow:auto;");
        document.getElementById("DIVScrContainer").appendChild(iframeObj);
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
        if(actionType == "updateOBIEE"){
            objHTTP = createHTTPActiveXObject();
            objHTTP.open("POST", "obieeservlet?actionSeqNo="+actionSeqNo+"&actionType="+actionType, true);
            objHTTP.setRequestHeader("Content-Type", "  application/xml");
            objHTTP.setRequestHeader("X-CSRFTOKEN", '<%=StringEscapeUtils.escapeJavaScript(CSRFtoken)%>');
            objHTTP.setRequestHeader("charset", "utf-8");
            objHTTP.send(null);
        }
        actionSeqArr.push(actionSeqNo);
    }
        return;
}
</script>
<script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<!--<script type="text/javascript" src="Script/JS/SmhTlBar.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>-->
<script type="text/javascript" src="Script/ExtJS/Extensible.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script type="text/javascript" src="Script/ExtJS/ExtensibleUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script type="text/javascript" src="Script/ExtJS/ExtFuncs.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>

<script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
<script>
function showToolbar() {
}
</script>
<html>
    <head>
        <title><%= StringEscapeUtils.escapeHTML(description) %></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(langISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
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
    
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252"/>
    </head>
    <body onload="attachIframe();parent.unmask();" onclick="mainWin.setActiveWindow(mainWin.document.getElementById('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>'), window)">
        <div class="WNDcontainer" id="DIVWNDContainer">
            <div class="WNDtitlebar" id="WNDtitlebar" onmousedown="startDrag('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>', event)">
                <div class="WNDtitle" id="wndtitle">
                    <B class="BTNicon">
                        <span class="ICOflexcube"></span>
                    </B>
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(description)%>&nbsp;</h1>
                    <div class="WNDbuttons">
                        <a class="WNDcls" accesskey="7" id="WNDbuttons" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title='<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>' onclick="if(this.disabled) return false; fnExitAll('', event);" onkeydown="return fnHandleScrBtn(event)">
                            <span class="LBLinv">
                                <%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                        </a>
                         
                        <a class="WNDmin" accesskey="6" id="WNDbuttonsMin" href="#" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title='<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%>' onclick="if(this.disabled) return false; mainWin.addTab('<%=StringEscapeUtils.escapeJavaScript(seqNo)%>', '<%=StringEscapeUtils.escapeJavaScript(description)%>', event)" onkeydown="return fnHandleScrBtn(event)">
                            <span class="LBLinv">
                                <%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="WNDcontent" id="DIVScrContainer">
            </div>
            <div id="WNDfooter" class="DIVfooter">
                <div style="text-align:right; padding:.75em">  
                    <input class="BTNfooterH"  style="margin-left:8px;margin-right:8px;" Default="<%=StringEscapeUtils.escapeHTML(strExit)%>" onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(strExit)%> id="BTN_EXIT" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="if(this.disabled) return false; fnExitAll('', event);"  onkeydown="return handleScrObj(this,event)" name= <%=StringEscapeUtils.escapeHTML(strExit)%> type="button"/>
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