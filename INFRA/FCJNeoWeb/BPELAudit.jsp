<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : BPELAudit.JSP
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
*/
%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
    String strTheme         = (String)session.getAttribute("THEME");
    /* # BUG 15978732 fixes start */ 
    String taskId           = FCUtility.validateParameter(request.getParameter("taskId"));
    	String csrfTok           = FCUtility.validateParameter(request.getParameter("csrfTok")); //FCUBS_12.0_PS_01 
    String ieCss         = (String)session.getAttribute("IECSS");
    String description       = FCUtility.validateParameter(request.getParameter("description"));
    /* # BUG 15978732 fixes end */ 
    String Strlang         = (String)session.getAttribute("LANG");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String jsParser     = (String)session.getAttribute("JS_PARSER");
    String browserCSS     = (String)session.getAttribute("BROWSER_CSS");
    String StrUserId       = (String) session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
	Map itemDescMap = null;//FCUBS_12.0_PS_01 
    
  itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);//FCUBS_12.0_PS_01 
       
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String exit          = (String)itemDescMap.get("LBL_EXIT");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>" style="overflow:auto;"> 
    <head>
        <title><%=StringEscapeUtils.escapeHTML(description)%></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
		<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
		<%--<link rel="stylesheet" type="text/css" href="Theme/11_ExtFlexblue.css"/>--%>
        <link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start--><link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
        <%--<link href="Theme/smappbrw.css" rel="stylesheet" type="text/css"/>--%>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
		<script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script>
     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <script language="JavaScript" src="Script/ExtJS/ExtUIUtil.js"></script>
		<script language="JavaScript" src="Script/JS/Alert.js"></script>
        <script language="JavaScript">
            //var dlgArg  = dialogArguments;
            var taskId = '<%=StringEscapeUtils.escapeJavaScript(taskId)%>';
		//var csrfTok = '<%=StringEscapeUtils.escapeJavaScript(csrfTok)%>';
		var csrfTok = parent.mainWin.CSRFtoken;
			var g_txnBranch=parent.mainWin.CurrentBranch;
            //var ypos = "";
			//var xpos = "";
	    function initHeader(){ 
                var txnTableHeader = document.getElementById("tblTaskAudit").tHead;
		var historyHeaderItems = new Array();

				historyHeaderItems[0] = parent.mainWin.getItemDesc("LBL_TITLE");
                historyHeaderItems[1] = parent.mainWin.getItemDesc("LBL_ACTION_TIME");
                historyHeaderItems[2] = parent.mainWin.getItemDesc("LBL_PICKUP_TIME");
                historyHeaderItems[3] = parent.mainWin.getItemDesc("LBL_USER_ID");
                historyHeaderItems[4] = parent.mainWin.getItemDesc("LBL_USER_NAME");
                historyHeaderItems[5] = parent.mainWin.getItemDesc("LBL_ACTION_CODE");
                historyHeaderItems[6] = parent.mainWin.getItemDesc("LBL_ACTION_DESCRIPTION");
                historyHeaderItems[7] = parent.mainWin.getItemDesc("LBL_BRANCH");
                historyHeaderItems[8] = parent.mainWin.getItemDesc("LBL_REMARKS");
                historyHeaderItems[9] = parent.mainWin.getItemDesc("LBL_VIEW");
                historyHeaderItems[10] = parent.mainWin.getItemDesc("LBL_OVERRIDE");
		
                newRow = document.createElement("TR");
                txnTableHeader.appendChild(newRow);
                for (i = 0; i < historyHeaderItems.length; i++) {
                    newCell = document.createElement("TH");
		    newCell.className="TBLoneTH";
		    newCell.innerHTML = "<A class=Astd>"+historyHeaderItems[i]+"</A>";
		    newRow.appendChild(newCell);
                }
	    }
    
            function fnViewTaskHistory(){
                var taskActionXML = "";
                //var taskActionDOM = createDOMActiveXObject();
				var taskActionDOM = "";
            
                taskActionXML = "<TaskRequest OP = 'ACTION'>";
                taskActionXML = taskActionXML + "<TaskId>" + taskId + "</TaskId>";
                taskActionXML = taskActionXML + "<ActionName>VIEW_TASK_HISTORY</ActionName>";
                taskActionXML = taskActionXML + "</TaskRequest>";
            
                var serverURL = "FCClientHandler";
                var objHTTP = createHTTPActiveXObject();
                var actionResponseXML = null;
                var messageNode = "";
            
                objHTTP.open("POST", serverURL, false); // Open the Connection to the
                // Server
            
                objHTTP.setRequestHeader("FUNCTIONID", "");
                objHTTP.setRequestHeader("OPERATION", "BPELACTION");
                objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
                objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
		objHTTP.setRequestHeader("TXNBRANCH",g_txnBranch);
		//objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
		objHTTP.setRequestHeader("X-CSRFTOKEN", csrfTok);
                objHTTP.send(taskActionXML);
                
                    actionResponseXML = objHTTP.responseXML;
                    if (getXMLString(actionResponseXML) != '')
                        populateHistoryData(getXMLString(actionResponseXML));
                    parent.mainWin.inactiveTime = 0;//25757753
            }
	  
            function populateHistoryData(inputXml){
                /*var xmlDOM = createDOMActiveXObject();
                xmlDOM.async = false;
                xmlDOM.resolveExternals = false;
                xmlDOM.loadXML(inputXml);*/
				var xmlDOM = loadXMLDoc(inputXml);
               var dlength=0;
                initHeader();
                historyTable = document.getElementById("tblTaskAudit").tBodies[0];
                for (var rowIndex = historyTable.rows.length - 1; rowIndex >= 0; rowIndex--)
                {
                    historyTable.deleteRow(rowIndex);
                }
	
                if (selectSingleNode(xmlDOM,"//TaskHistory") != null && selectNodes(xmlDOM,"//Task").length > 0)
                {
	        
                    var taskNodes = selectNodes(xmlDOM,"//Task");
                    for (var taskCount = 0; taskCount < taskNodes.length; taskCount++) {
                        newRow = historyTable.insertRow(-1);
	
			if(taskCount%2==1)
                            newRow.className = "TBLoneTRalt";
                        else 
                            newRow.className = "TBLoneTR";
	            
                        newRow.setAttribute("HISTTASKID", taskNodes[taskCount].getAttribute("taskId"));	            
				dlength = taskNodes[taskCount].childNodes.length;	            
                        for (var colCount = 0; colCount < taskNodes[taskCount].childNodes.length; colCount++) {
                            var cell = newRow.insertCell(-1);
                            var value = getNodeText(taskNodes[taskCount].childNodes[colCount]);
                            if (taskNodes[taskCount].childNodes[colCount].nodeName.indexOf("DATE") != -1) {
                                var dateTime = value.split(" ");
                                var date = dateTime[0].split("-");
                                value = format(date[0], date[1], date[2]) + ' ' + dateTime[1] + ' ' + dateTime[2];
                            }
                            var innerContent = "<span class='SPNtext'>" + checkForNull(value) + "</span>";
                            cell.innerHTML = innerContent;
                        }
                        var cell = newRow.insertCell(-1);
				cell.innerHTML = '<button class="BTNtext" id = "BTNViewDetail" onclick="parent.mainWin.fnShowHistoryDetailFunction(\''+taskNodes[taskCount].getAttribute("taskId")+'\',\''+taskNodes[taskCount].getAttribute("funcId")+'\')">'+
				parent.mainWin.getItemDesc("LBL_VIEW")+'</button>&nbsp';        
				var cell = newRow.insertCell(-1);
				cell.innerHTML = '<button class="BTNtext" id = "BTNShowOverride" onclick="fnShowOverride('+taskCount+')">'+
	            	parent.mainWin.getItemDesc("LBL_OVERRIDE")+'</button>&nbsp';
                    }
                }
                     newRow = historyTable.insertRow(-1);
                  if(dlength==0)
                      dlength=8;
			for (var colCount = 0; colCount < dlength + 1; colCount++) 
				var cell = newRow.insertCell(-1);
			//cell.innerHTML = '<button id="exit" value="Cancel" onclick="fnBpelAuditClose()" style="display:block;width:100%;overflow:inherit;"><img src="Images\Flexblue\Toolbar\icExit.gif" alt="<%=StringEscapeUtils.escapeHTML(exit)%>"/></button>&nbsp';
			//cell.innerHTML = '<button id="exit" value="Cancel" onclick="fnBpelAuditClose()" style="display:block;width:100%;overflow:inherit;">'+
			//parent.mainWin.getItemDesc("LBL_EXIT")+'</button>&nbsp';
				//setHeights();
			}
      function checkForNull(strToCheck) {
        var lDefaultValue = "";
        return (strToCheck == 'null' ? lDefaultValue : strToCheck);
      }
	  function setHeights(){
	  if (self.innerHeight) {// all except Explorer
                    x = self.innerWidth;
                    y = self.innerHeight;			
                } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
                    x = document.documentElement.clientWidth;
                    y = document.documentElement.clientHeight;
				} else if (document.body) {
                // other Explorers
                    x = document.body.clientWidth;
                    y = document.body.clientHeight;
				}
		/*parent.document.getElementById("ChildWin").style.height = parent.parent.document.getElementById("vtab").offsetHeight - 550 + "px";
    		parent.document.getElementById("ChildWin").children[0].style.height = parent.parent.document.getElementById("vtab").offsetHeight - 550 + "px";*/
                parent.parent.document.getElementById("vtab").style.display ="block";//25757753
		parent.document.getElementById("ChildWin").style.height = parent.parent.document.getElementById("vtab").offsetHeight /3.76;
    		parent.document.getElementById("ChildWin").children[0].style.height = parent.parent.document.getElementById("vtab").offsetHeight /3.76;
    parent.document.getElementById("ChildWin").style.width = x+parent.document.getElementById("masker").offsetWidth-parent.parent.document.getElementById("vtab").offsetWidth - 20 + "px";
    		parent.document.getElementById("ChildWin").children[0].style.width = x+parent.document.getElementById("masker").offsetWidth-parent.parent.document.getElementById("vtab").offsetWidth - 60 + "px";
		parent.document.getElementById("ChildWin").children[0].scrolling = "yes";
		 var auditscrHeight = parent.parent.document.getElementById("vtab").offsetHeight /3.76 - 20;
		 document.getElementById("auditContainerFldset").style.height = auditscrHeight;
		 document.getElementById("BPELTaskHistoryAuditDetails").style.height = auditscrHeight - 4 + "px";
	//ypos=y - 20 + "px";
	//xpos = parent.document.getElementById("ChildWin").children[0].style.posWidth - 20 + "px";
	  }
	  function fnBpelAuditClose(){
				parent.unmask();
				var childDivObj = parent.document.getElementById("ChildWin");
                childDivObj.getElementsByTagName("IFRAME")[0].src = "";
                parent.document.getElementById("Div_ChildWin").removeChild(childDivObj);
				
	  }
       function fnShowOverride(rowIndex){
		parent.parent.document.getElementById("vtab").style.display ="block";//25757753
		var taskId = document.getElementById("tblTaskAudit").tBodies[0].rows[rowIndex].getAttribute('HISTTASKID');
		var taskDetailsRequest 	= '<TaskRequest OP="OVDTASKDETAILS">';
		taskDetailsRequest 	+= '<TaskId>' + taskId + '</TaskId>';
		taskDetailsRequest 	+= '</TaskRequest>';
		
                var serverURL = "FCClientHandler";
                var objHTTP = createHTTPActiveXObject();
	    
                objHTTP.open("POST", serverURL, false); // Open the Connection to the
                objHTTP.setRequestHeader("FUNCTIONID", "");
                objHTTP.setRequestHeader("OPERATION", "BPELACTION");
                objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
		objHTTP.setRequestHeader("TXNBRANCH",g_txnBranch);
		//objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
		objHTTP.setRequestHeader("X-CSRFTOKEN",csrfTok);
                objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");	    
		objHTTP.send(taskDetailsRequest)
		
		if(objHTTP.statusText == "OK")
                    taskXml = objHTTP.responseXML;
		//TODO
		if (getXMLString(taskXml) !=''){
					//if(parent.window.ActiveXObject)
					if(navigator.userAgent.indexOf("MSIE ") != -1 || (navigator.userAgent.indexOf("Trident") != -1 && navigator.userAgent.indexOf("rv") != -1)) //Fix for 23287484
                    taskXml.setProperty("SelectionNamespaces", "xmlns:fcubs='http://fcubs.iflex.com'");			
                    var type = 'I';			
                    var exceptionsNode = selectSingleNode(taskXml,"//fcubs:exceptions");
                    if(selectSingleNode(exceptionsNode,"//fcubs:error/fcubs:edesc") && getNodeText(selectSingleNode(exceptionsNode,"//fcubs:error/fcubs:edesc")) != '')
			var action = displayException(exceptionsNode, 'I');
                    else{
						parent.alert(parent.mainWin.getItemDesc("LBL_NO_OVERRIDES"));
						}
                }		
            }
	
	/* function displayException(exceptionsNode,type)
	{
                var message = "";
                var returnVal = false;
                var messageNodes = selectNodes(exceptionsNode,"./fcubs:error");
                var msg = "";
                var errCode = "";
    
                if (type == "" || type == null){
                    type = "I";
                }
    
                if (messageNodes)
                {
                    for (var index = 0; index < messageNodes.length; index++)
                    {
                        msg = getNodeText(selectSingleNode(messageNodes[index],"./fcubs:edesc"));
                        errCode = getNodeText(selectSingleNode(messageNodes[index],"./fcubs:ecode"));            
                        message = message + errCode + " " + msg + "~";
                    }
                    returnVal = ShowErrorDialog(type, message);
                } else
                {
                    appendErrorCode('ST-COM021', null);
                    var msg = buildMessage(gErrCodes);
                    alertMessage(msg);
                    returnVal = false;
                }
                return returnVal;
	} */
function displayException(exceptionsNode, type) {
    var ovrdRemarks = "N";
    if (typeof(remarksReq) != "undefined" && remarksReq == "Y") ovrdRemarks = "Y";
    var message = "";
    var returnVal = false;
    var messageNodes = selectNodes(exceptionsNode, "./fcubs:error");
    var msg = "";
    var errCode = "";
    if (type == "" || type == null) {
        type = "I";
    }
    if (messageNodes) {
        for (var index = 0; index < messageNodes.length; index++) {
            msg = getNodeText(selectSingleNode(messageNodes[index], "./fcubs:edesc"));
            errCode = getNodeText(selectSingleNode(messageNodes[index], "./fcubs:ecode"));
            message = message + errCode + "~" + msg + "__";
            }
        message = message.substring(0, message.length - 2);
		gAlertMessage = message;
    //23651865    if(parent.gAlertMessage) 
            parent.gAlertMessage = message;
        var alertWindow = document.getElementById("ifr_AlertWin");
        if (alertWindow == null) {
            alertWindow = parent.document.getElementById("ifr_AlertWin");
            strTheme = parent.window.strTheme;
        }
        alertWindow.src = "Alert.jsp?MSG_TYPE=" + type.toUpperCase() + "&MESSAGE=" + message + "&THEME=" + strTheme + "&OVRDREMARKS=" + ovrdRemarks;
        var alertWinObj = document.getElementById("Div_AlertWin");
        if (alertWinObj == null) {
            alertWinObj = parent.document.getElementById("Div_AlertWin");
        }
        alertWinObj.style.display = "block";
        switch (type) {
        case 'E':
            break;
        case 'O':
            alertAction = "OVERRIDE";
            break;
        case 'I':
            alertAction = "BPELSCREENEXIT";
            break;
        default:
            alertAction = "EXITACTION";
        }
        returnVal = true;
    } else {
        mask();
        showAlerts(fnBuildAlertXML('ST-COM021', 'E'), 'E');
        alertAction = "UNMASK";
        returnVal = false;
    }
    return returnVal;
}

	</script>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    </head>
	<body onload="setHeights();fnViewTaskHistory()" >
	<fieldset id="auditContainerFldset" class="FSTcell" type="ME" view="ME">
	 <DIV class=WNDtitlebar id="WNDtitlebar">
                    <h1 class="WNDtitletxt" id="WNDtitletxt" ><%=StringEscapeUtils.escapeHTML(description)%></h1>
                    <div class="WNDbuttons">
					<a class="WNDcls" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%= StringEscapeUtils.escapeHTML("CLOSE") %>" onclick="fnBpelAuditClose()">
                        <span class="LBLinv"><%= StringEscapeUtils.escapeHTML("CLOSE") %></span>
                     </a>
			</div>
		</DIV>
		<div class="DIVtblbox1" id="BPELTaskHistoryAuditDetails" style="overflow:auto;">
			<table  name="taskdetails" id="tblTaskAudit"  class="TBLone" summary="">
                <thead id="hdrTaskAudit"></thead>
				<tbody id="bdyTaskAudit"></tbody>
            </table>
		</div>
	</fieldset>
   </body>
</html>
