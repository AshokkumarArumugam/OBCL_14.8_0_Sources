<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : Alert.jsp
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

<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="java.util.Map"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String ieCss            = "";
    String browserCSS       = "";
    String Strlang          = "";
    String StrlangISOMap    = "";
    if(jsParser == null){
        String userAgent = request.getHeader("USER-AGENT").toUpperCase();
       if(userAgent.contains("MSIE") || (userAgent.contains("TRIDENT") && userAgent.contains("RV"))) {//ie11 changes
        
            jsParser = "BROWSER_IE.js";
            if (userAgent.contains("MSIE 7"))
                ieCss = "IE7.css";
        } else {
            jsParser = "BROWSER_NonIE.js";
        }
        browserCSS = "BROWSER_IE.css";
        if(userAgent.indexOf("FIREFOX") >= 0) {
            browserCSS = "BROWSER_FF.css";
        } else if(userAgent.indexOf("OPERA") >= 0) {
            browserCSS = "BROWSER_OP.css";
        } else if(userAgent.indexOf("CHROME") >= 0) {
            browserCSS = "BROWSER_GO.css";
        } else if(userAgent.indexOf("SAFARI") >= 0) {
            browserCSS = "BROWSER_SF.css";
        }   
        Strlang           = BranchConstants.DEFAULT_LANGCODE;
        StrlangISOMap     = (BranchConstants.DEFAULT_LANG_ISOMAP).toLowerCase();
    }else{        
        ieCss               = (String)session.getAttribute("IECSS");
        browserCSS          = (String)session.getAttribute("BROWSER_CSS");    
        Strlang             = (String)session.getAttribute("LANG");
        if(Strlang == null)
            Strlang           = BranchConstants.DEFAULT_LANGCODE;
        StrlangISOMap       = (String)session.getAttribute("LANGISOMAP");
        if(StrlangISOMap == null)
            StrlangISOMap     = (BranchConstants.DEFAULT_LANG_ISOMAP).toLowerCase();
    }
    
    String StrUserId         = (String) session.getAttribute("USERID");  
    String entity       = (String) session.getAttribute("ENTITY");
    String branchIdentifier  = BranchConstants.BRANCH_CENTRALIZED;
   /* # BUG 15978732 fixes start */ 
    String strTheme        = FCUtility.validateParameter(request.getParameter("THEME"));
    String message         = FCUtility.validateParameter(request.getParameter("MESSAGE"));
    String screenType      = FCUtility.validateParameter(request.getParameter("SCREENTYPE"));//FCUBS11.1 CROSSBROWSER changes 
    /* # BUG 15978732 fixes ends*/ 
    if (screenType == null)
        screenType = "NONWB";
   /* # BUG 15978732 fixes start */ 
    String rejectFlagRequired  = FCUtility.validateParameter(request.getParameter("REJECTREQUIRED"));//FCUBS11.1 WB Changes
   /* # BUG 15978732 fixes end */ 
    if (rejectFlagRequired == null)
        rejectFlagRequired = "NONWBRO";
        /* # BUG 15978732 fixes start */ 
    String autoOvdFlag  = FCUtility.validateParameter(request.getParameter("AUTOOVERRIDE"));//fc11.1wb changes
        /* # BUG 15978732 fixes end */ 
    if (autoOvdFlag == null)
        autoOvdFlag = "N";
   /* # BUG 15978732 fixes start */ 
    String ovdScrType      = FCUtility.validateParameter(request.getParameter("OVDSCRTYP"));
    /* # BUG 15978732 fixes end */ 
    if (ovdScrType == null) {
        ovdScrType = "M";
    }
   /* # BUG 15978732 fixes start */ 
    String ovdRoutingType      = FCUtility.validateParameter(request.getParameter("OVDROUTINGTYP"));
    /* # BUG 15978732 fixes end*/ 
    if (ovdRoutingType == null) {
        ovdRoutingType = "NX";
    }
    
    String[] msgArray      = message.split("__",-1);
    /* # BUG 15978732 fixes start */ 
    String AlertType       = FCUtility.validateParameter(request.getParameter("MSG_TYPE"));

    String error           = request.getParameter("ERROR");
    String errorType       = request.getParameter("ERROR_TYPE");
    /*String ovrdRemarks     = request.getParameter("OVRDREMARKS");
    if (ovrdRemarks == null)
        ovrdRemarks = "N";
    */
    String timestamp = FCUtility.validateParameter(request.getParameter("timestamp"));
    String funcid = FCUtility.validateParameter(request.getParameter("funcid"));
	String seqNo = FCUtility.validateParameter((String)request.getParameter("seqNo"));/* Changes for Undefined Seq no*/
 /* # BUG 15978732 fixes end */ 
    String TerminalId = (String) FCUtility.validateParameter(FCUtility.getCleintIPAddr(request));
    if (StrUserId == null || "".equals(StrUserId)){
        StrUserId = TerminalId;
    }
    
    FBContext fbContext    = new FBContext(StrUserId);
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
   
    
    String AlertMsg         = (String) itemDescMap.get("LBL_ALERT_MSG_" + AlertType);
    String AlertMsgCODE     = (String) itemDescMap.get("LBL_ALERT_MSG_" + AlertType + "_CODE");
    String AlertMsgDESC     = (String) itemDescMap.get("LBL_ALERT_MSG_" + AlertType + "_DESC");
    
    String okLabel          = (String) itemDescMap.get("LBL_OK");
    String loginLabel       = (String) itemDescMap.get("LBL_CURR_LOGIN");
    String exitLabel        = (String) itemDescMap.get("LBL_EXIT");
    String acceptLabel      = (String) itemDescMap.get("LBL_ACCEPT");
    String cancelLabel      = (String) itemDescMap.get("LBL_CANCEL");
    String noScriptLabel    = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String makerOvdRemarks  = (String) itemDescMap.get("LBL_MAKER_OVD_REMARKS");
    String localAuthLabel   = (String) itemDescMap.get("LBL_LOCAL_AUTH");//FCUBS11.1 CROSSBROWSER changes 
    String rejectLabel      = (String) itemDescMap.get("LBL_REJECT");	//FCUBS11.1 WB Changes

    String imgSmlCLSName    =  "ICOAlert_" + AlertType;
    //String imgSmlWithPath  = "Images/"+strTheme.substring(0,strTheme.indexOf(".css"))+"/" + imgSmlName;
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    
String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
        <!--HTML5 Changes Start-->
        <!--
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript">
            var error = '<%=StringEscapeUtils.escapeJavaScript(error)%>';
            var errorType = '<%=StringEscapeUtils.escapeJavaScript(errorType)%>';
            var timestamp = '<%=StringEscapeUtils.escapeJavaScript(timestamp)%>';
            var funcid = '<%=StringEscapeUtils.escapeJavaScript(funcid)%>';
			var seqNo = '<%=StringEscapeUtils.escapeJavaScript(seqNo)%>';/* Changes for Undefined Seq no*/
            
            var alertType = "I";
            var mainWin = parent.mainWin;
            <%
            if (AlertType != null) {
            %>
                alertType = '<%=StringEscapeUtils.escapeJavaScript(AlertType)%>';
            <%
            }
            %>
            function chkErr() {
                    var imageClass    = "<%=StringEscapeUtils.escapeJavaScript(imgSmlCLSName)%>";
                    var alertMsgTitle = "<%=StringEscapeUtils.escapeJavaScript(AlertMsg)%>";
                    fnBuildTaskHTML(alertMsgTitle, imageClass);
                   resize_iframe();
            }
function resize_iframe() {
    var iframeObj = parent.document.getElementById("ifr_AlertWin");
    iframeObj.style.height = document.getElementById("tasklocDIVif1").offsetHeight + "px" ;
    iframeObj.style.width = document.getElementById("tasklocDIVif1").offsetWidth+"px" ;
    document.getElementById("tasklocwndtitle").style.width = document.getElementById("tasklocwndwidth").offsetWidth + "px";
    iframeObj.title = getInnerText(document.getElementById("tasklocDIVif1").getElementsByTagName("H1")[0]);
    var alertWinObj = parent.document.getElementById("Div_AlertWin");
    var scrWidth = document.getElementById("tasklocwndwidth").offsetWidth;
    try {
      alertWinObj.style.top = parent.document.getElementById("masthead").offsetHeight + 4 + "px";
      setHorizontalPosition(alertWinObj, false, (parent.document.getElementById("vtab").offsetWidth + 8));
        if (parent.document.getElementById("vtab").style.display == "none") {
                setHorizontalPosition(alertWinObj, false, parent.document.getElementById("vtabMin").offsetWidth + 8);
            }
    } catch(e) {
        var x,y;
        if (self.innerHeight) {
            x = parent.self.innerWidth;
            y = parent.self.innerHeight;
        }else if (document.documentElement && document.documentElement.clientHeight){
            x = parent.document.documentElement.clientWidth;
            y = parent.document.documentElement.clientHeight;
        }else if (document.body) {
            x = parent.document.body.clientWidth;
            y = parent.document.body.clientHeight;
        }
        setHorizontalPosition(alertWinObj, false, (x/2 - ((alertWinObj.offsetWidth)/2)));
        alertWinObj.style.top = y/2 - ((alertWinObj.offsetHeight)/2) +"px";
    }

        var btns = document.getElementById("tasklocDIVif1").getElementsByTagName("INPUT");
        if(!parent.slipopened){
        if (alertType != "I" && alertType != "E")
            btns[btns.length-2].focus();
        else
            btns[btns.length-1].focus();
            parent.slipopened=false;
}
}

function fnGetTaskLocColumnDesc()
{
   var tempDoc = loadXMLDoc(parent.bpelTaskSearch);
   var colArray = new Array();;
    for (i = 0; i < selectSingleNode(tempDoc, "PROCESS_CODES/ALL").childNodes.length; i++) {
    var leafArray = getNodeText(selectSingleNode(tempDoc, "PROCESS_CODES/ALL").childNodes[i]).split("~");
       // colDescArray[i]=parent.mainWin.getItemDesc(leafArray[1]);
        colArray[i]=leafArray[1];
    }
    return colArray;
}
function closeTaskLocAlerts(event)
{
  //  parent.document.getElementById("Div_AlertWin").innerHTML="";
    closeAlerts(event);
}

function fnDepictTasks(instanceId,wfrefno,taskid)
{
/* base64image =parent.getFlowDiagram(instanceId);
	src	="FCDocumentControllerServlet?Action=FileView&FileName=" + base64image+"&X-CSRFTOKEN=" + mainWin.CSRFtoken;
	if(base64image==null||base64image=='')
	     parent.showAlerts(fnBuildAlertXML('OR-INF-008', 'E'), 'E');
	else{	
             mainWin.open(src, null, "width=640px,height=480px,resizable=yes,scrollbars=yes,status=1,toolbar=no", false);
	}*/
    var src =  "ORApplicationFlow.jsp?wfrefno="+wfrefno+"&instanceid="+instanceId+"&taskid="+taskid;
    var divId ="ChildAppStatusWin";
    parent.openWindow(divId, src);
}


function fnBuildTaskHTML(alertMsgTitle, imageClass) {
    var tableBody = document.getElementById("TASKTBL").tBodies[0];
    //var appNum = getNodeText(parent.gTasksDOM.getElementsByTagName("PROTECTEDTEXTATTRIBUTE2")[0]);
   // setNodeText(document.getElementById("TASKTBL").getElementsByTagName("span")[0],appNum);
    //var colArr  = fnGetTaskLocColumnDesc();
    var tasks = parent.gTasksDOM.getElementsByTagName("Task");
    var taskCount = parent.gTasksDOM.getElementsByTagName("Task").length;
    var tasktable = document.getElementById("TASKDTL").tBodies[0];
    for (j=0;j<taskCount;j++) //looping through all task
    {
    var taskDetArr=new Array();
    var k=0;
    var instanceId = tasks[j].getAttribute('INSTANCEID');
     var wfrefno = tasks[j].getAttribute('WFREFNO');
     var taskid = tasks[j].getAttribute('ID');
            for(var idx=0;idx<tasks[j].childNodes.length;idx++) //looping through dispCol
            {
        
            var fieldName = tasks[j].childNodes[idx].tagName;
            var fieldvalue = getNodeText(tasks[j].getElementsByTagName(fieldName)[0]);
            if(fieldvalue!="null" && fieldName!="TaskActions")
                {
                 var fieldLabel = parent.getQueryColLabel(fieldName.toUpperCase());
                 taskDetArr[k] = parent.mainWin.getItemDesc(fieldLabel);
                 taskDetArr[k] = taskDetArr[k]+"~"+ getNodeText(tasks[j].getElementsByTagName(fieldName)[0]);
                 k++;
                }
            }
//            taskDetArr[k] = parent.mainWin.getItemDesc("LBL_ACQUIREDBY");
//            taskDetArr[k] = taskDetArr[k]+"~"+ getNodeText(tasks[j].getElementsByTagName("ACQUIREDBY")[0]);
//            k++;
//            taskDetArr[k] = parent.mainWin.getItemDesc("LBL_TITLE");
//            taskDetArr[k] = taskDetArr[k]+"~"+getNodeText(tasks[j].getElementsByTagName("Title")[0]);
//            k++;
//            taskDetArr[k] = parent.mainWin.getItemDesc("LBL_ASSIGNEE_GROUP");
//            taskDetArr[k] = taskDetArr[k]+"~"+ getNodeText(tasks[j].getElementsByTagName("AssigneeGroups")[0]);
//            k++;
//            taskDetArr[k] = parent.mainWin.getItemDesc("LBL_CREATED_DATE");
//            taskDetArr[k] = taskDetArr[k]+"~"+ getNodeText(tasks[j].getElementsByTagName("CREATEDDATE")[0]);
//           
   for (var i=0;i<taskDetArr.length;i++) {
        var rowElem = document.createElement("TR");
        var name = document.createElement("TD");
        var value = document.createElement("TD");
        name.setAttribute("scope", "row");
        name.setAttribute("class", "prnBlkLable");
        value.setAttribute("scope", "row");
        if(i==0)
        {
        var nameData = "<TH class=\"THSinglerow\" scope=col><SPAN tabindex=\"0\"  class='SPNtbltwoH'>"+taskDetArr[i].split("~")[0]+"</SPAN><button class=\'BTNtext\' id =\'BTNDepictTask\' align=\"right\" onclick=\"fnDepictTasks(\'"+instanceId+"\',\'"+wfrefno+"\',\'"+taskid+"\')\">"+parent.mainWin.getItemDesc("LBL_STAGE_STATUS")+"</button></TH>";
        var valueData = "<SPAN tabindex=\"0\"  class='SPNtbltwoH'>"+taskDetArr[i].split("~")[1]+"</SPAN>";
        }
        else
        {
        var nameData = "<SPAN tabindex=\"0\"  class='SPNtbltwoC'>"+taskDetArr[i].split("~")[0]+"</SPAN>";
        var valueData = "<SPAN tabindex=\"0\"  class='SPNtbltwoC'>"+taskDetArr[i].split("~")[1]+"</SPAN>";
        }
        name.innerHTML = nameData;
        value.innerHTML = valueData;
        rowElem.appendChild(name);
        rowElem.appendChild(value);
        tasktable.appendChild(rowElem);
        }
    }
}

        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    </head>
    <body onload="chkErr()" oncontextmenu="return false;" onkeydown="return disableCommonKeys(event);" onhelp="return false;">
        <div id="tasklocDIVif1" class="WNDcontainerModal">
            <DIV style="width: 560px;" class=WNDtitlebar id="tasklocwndtitle" onmousedown="startDrag(event)">
                <B class="BTNicon"><span class="ICOalert2"></span></B>	
                <h1 class="WNDtitletxt">Task Locator</h1>            	
            </DIV>
            <DIV class="WNDcontentmodal" id="tasklocwndwidth">
		<DIV style="height: 500px" class="DIVtblbox1outer2">
                    <DIV style="height: 500px" id="tbl-container" class="DIVtblbox2">
                                <TABLE id="TASKTBL" class="TBLtwo" border=0 cellSpacing=0 cellPadding=0 width="100%" summary="Alert">
                                    <THEAD>
                                        <TR>
                                            <TH class="THSinglerow" scope=col><SPAN tabindex="0"  class=SPNtbltwoH>Task Details</SPAN></TH>
                                        </TR>
                                    </THEAD>
                                    <TBODY>                                           
                                     <TABLE id="TASKDTL" class="TBLtwo" border=0 cellSpacing=0 cellPadding=0 width="100%" summary="Alert">
                                     <TR>
                                      </TR>
                                     </TABLE>
                                    </TBODY>
                                </TABLE>
                    </DIV>
                    <%--11.1 Remarks Changes - Starts Here--%>
                    <%
                    if(!screenType.equalsIgnoreCase("WB")){	  //FCUBS11.1 CROSSBROWSER Changes
                        if ("O".equalsIgnoreCase(AlertType) && !"O".equalsIgnoreCase(ovdScrType)) {
                            if ("X".equalsIgnoreCase(ovdRoutingType)) {
                                %>
                                <table class="TBLtwo" id="RMKTBL" cellpadding="0" width="100%" cellspacing="2" border="0">
                                    <tr>
                                        <th scope="row" valign="top" width="30%"><label class="LBLauto" for="REMARKS"><%=StringEscapeUtils.escapeHTML(makerOvdRemarks)%></label></Th>
                                        <td width="70%"><label class="LBLstd" for="REMARKS"></label><textarea id="REMARKS" cols="43" rows="1" style="width:99%" ></textarea></td>
                                    </tr>                                    
                                </table>
                                <%
                            }
                        }
                    }else if(screenType.equalsIgnoreCase("WB")){
                    %>
                        <label class="LBLinv" for="REMARKS"></label><input type="hidden" name="REMARKS" id = "REMARKS" value = ""></input>
                    <%
                    }
                    %>
                    <%--11.1 Remarks Changes - Ends Here --%>
		</DIV>
        
                <div class="WNDfootermodal">
                    <div class="WNDfbuttons">
                        <table role="presentation" width="99%" border="0" cellspacing="0" cellpadding="0" id="TBLPageTAB_FOOTER">
                             <tbody>
                                 <tr>
                                   <td valign="top" width="98%"/>
                                   <td style="padding-left:10px" nowrap="nowrap">
                        <%
                        if(AlertType != null) {
                            if(!"S".equalsIgnoreCase(AlertType)){
                                if ("O".equalsIgnoreCase(AlertType)) {
                                    //FCUBS11.1 CROSSBROWSER changes starts here  //fc11.1wb changes
                                      if(screenType.equalsIgnoreCase("WB") && ("N".equalsIgnoreCase(autoOvdFlag))) {%>
                                         <input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(localAuthLabel)%> title=<%=StringEscapeUtils.escapeHTML(localAuthLabel)%> id="BTN_LOCALAUTHACCEPT" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="handleLocalAuth()"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(localAuthLabel)%> type="button"/><input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> id="BTN_ACCEPT" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="closeTaskLocAlerts(event)" onkeydown="return fnHandleAlertBtn(event)" name=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> title=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> type="button"/><%
                                        if(rejectFlagRequired.equalsIgnoreCase("Y")) {
                                          %><input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(rejectLabel)%> id="BTN_REJECT" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="handleRejectTransaction()" onkeydown="return fnHandleAlertBtn(event)" name=<%=StringEscapeUtils.escapeHTML(rejectLabel)%>  title=<%=StringEscapeUtils.escapeHTML(rejectLabel)%>  type="button"/><% 
                                        }
                                    } else {
                                    %><input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> title=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> id="BTN_ACCEPT" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="closeTaskLocAlerts(event)" onkeydown="return fnHandleAlertBtn(event)" name=<%=StringEscapeUtils.escapeHTML(acceptLabel)%> type="button"/><%
                                    }
                                } else {
                            %><input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(okLabel)%> title=<%=StringEscapeUtils.escapeHTML(okLabel)%> id="BTN_OK" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="closeTaskLocAlerts(event)"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(okLabel)%> type="button"/><%
                                }
                                if ("C".equalsIgnoreCase(AlertType) || "O".equalsIgnoreCase(AlertType)) {
                                %><input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(cancelLabel)%> title=<%=StringEscapeUtils.escapeHTML(cancelLabel)%> id="BTN_CANCEL" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="cancelAlerts(event)" onkeydown="return fnHandleAlertBtn(event)" name=<%=StringEscapeUtils.escapeHTML(cancelLabel)%> type="button"/><%
                                }
                            } else {
                            %><input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(loginLabel)%> id="BTN_LOGIN" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="openLogin()"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(loginLabel)%> title= <%=StringEscapeUtils.escapeHTML(loginLabel)%> type="button"/><input class="BTNfooterH"  onblur="this.className='BTNfooter'" value=<%=StringEscapeUtils.escapeHTML(exitLabel)%> title=<%=StringEscapeUtils.escapeHTML(exitLabel)%> id="BTN_EXIT" onfocus="this.className='BTNfooterH'" onmouseover="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onclick="exitApplication()"  onkeydown="return fnHandleAlertBtn(event)" name= <%=StringEscapeUtils.escapeHTML(exitLabel)%> type="button"/><%
                        }
                                %></td>
                                 </tr>
                             </tbody>
                        </table><%
                          }%>
                    </div>
                </div>
            </DIV>
        </div>
    </body>
</html>
