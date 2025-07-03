<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : ORApplicationFlow.JSP
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
<%@ page import="com.ofss.fcc.common.BPELManager"%>
<%@ page import="com.ofss.fcc.bpelif.IProcessflowDrawer"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String wfRefNo = FCUtility.validateParameter(request.getParameter("wfrefno"));
    String instanceId = FCUtility.validateParameter(request.getParameter("instanceid"));
    String taskId = FCUtility.validateParameter(request.getParameter("taskid"));
    String jsParser         =(String)session.getAttribute("JS_PARSER");
    String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
    String strTheme         = (String)session.getAttribute("THEME");
    String l_strTheme       = strTheme.substring(0, strTheme.indexOf(".css"));
    String theme_imagesPath = "Images/Ext"+l_strTheme;
    String ieCss         = (String)session.getAttribute("IECSS");
    String Strlang         = (String)session.getAttribute("LANG");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String browserCSS     = (String)session.getAttribute("BROWSER_CSS");
    String StrUserId       = (String) session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    Map itemDescMap = null;
    String seqNo ="ChildAppStatusWin";
    itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
       
    String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String exit          = (String)itemDescMap.get("LBL_EXIT");
    String description         = (String)itemDescMap.get("LBL_STAGE_STATUS");
    String appDetails         = (String)itemDescMap.get("LBL_APPDET");
    String recalcSch         = (String)itemDescMap.get("LBL_RECALC_SCH");
    String wfrefno         = (String)itemDescMap.get("LBL_WFREFNO");
    //String processFlow = "<PROCESS NAME='ORRL'><STAGE NAME='APPENTRY' TITLE='Appliction Entry'><TASK NAME='TASK1' TYPE='H' FUNCID='ORDRLAPP' SERVID='' DUR='2'/><TASK NAME='TASK2' TYPE='H' FUNCID='ORDRLAPP' SERVID='' DUR='2'/><TASK NAME='TASK2' TYPE='H' FUNCID='ORDRLAPP' SERVID='' DUR='2'/></STAGE><CHILD><STAGE NAME='UNDWR' PARENT='APPENTRY' TITLE='APPENTRY'><TASK NAME='TASK1' TYPE='H' FUNCID='ORDRLUND' SERVID='' DUR='2'/></STAGE><CHILD><STAGE NAME='LOANAPP' PARENT='UNDWR' TITLE='UNDWR'><TASK NAME='TASK1' TYPE='H' FUNCID='ORDRLAPR' SERVID='' DUR='2'/></STAGE><STAGE NAME='DOCVER' PARENT='UNDWR' TITLE='UNDWR'><TASK NAME='TASK1' TYPE='H' FUNCID='ORDRLDVR' SERVID='' DUR='2'/></STAGE><CHILD><STAGE NAME='DISB' PARENT='DOCVER' TITLE='DOCVER'><TASK NAME='TASK1' TYPE='S' FUNCID='' SERVID='Orchestration' DUR='2'/></STAGE><CHILD></CHILD></CHILD></CHILD></CHILD></PROCESS>";
    int rows = 2;
    int colls = 0;
    rows +=3;
    colls +=7;
    IProcessflowDrawer processFlowDrawer = BPELManager.getInstance().getProcessFlowDrawer(StrUserId,entity);
    String tableStr = processFlowDrawer.getInstaceAuditHTMLTable(StrUserId,Strlang, wfRefNo,instanceId ,taskId);
    String tooltipTableHtml =processFlowDrawer.getToolTipHtml();
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>" style="overflow:auto;">
    <head>
        <title>
            <%=StringEscapeUtils.escapeHTML(description)%>
        </title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta http-equiv="Content-Language" content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache"/>
        <meta http-equiv="Pragma" content="no-cache"/>
        <meta http-equiv="Expires" content="0"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/ExtBpelFlow.css" rel="stylesheet" type="text/css"/>
         <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
       <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script>
        <script language="JavaScript" src="Script/ExtJS/ExtUIUtil.js"></script>
        <script language="JavaScript">
            var mainWin        = parent;
            var userFuncId ="";
            var functionId ="";
            function getItemDesc(lablecode){
                return mainWin.getItemDesc(lablecode);
            }
          function checkForNull(strToCheck) {
              var lDefaultValue = "";
              return (strToCheck == 'null' ? lDefaultValue : strToCheck);
          }
            var seqNo ="<%=seqNo%>";
          //parent.document.getElementById("ChildReportWin").id  = seqNo;
          function fnCalcHeight() {
              containerDIV = seqNo;
              parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
              parent.document.getElementById(containerDIV).children[0].id += seqNo;
            /*var screenHeight = parent.document.getElementById(containerDIV).offsetHeight ;
            screenHeight = screenHeight * 0.5;
            parent.document.getElementById(containerDIV).style.height = screenHeight +'px';
            parent.document.getElementById(containerDIV).children[0].style.height=screenHeight +'px'; */
            document.getElementById("ResTree").style.width = parent.document.getElementById(containerDIV).offsetWidth + "px";
            var screenHeight = document.getElementById('DIVWNDContainer').offsetHeight + 2;
            parent.document.getElementById(containerDIV).style.height = screenHeight +'px';
            parent.document.getElementById(containerDIV).children[0].style.height=screenHeight +'px';            
             // document.getElementById("tblAppFlow").style.width = parent.document.getElementById(containerDIV).offsetWidth + "px";
             // document.getElementById("tblAppFlow").style.height = parent.document.getElementById(containerDIV).offsetHeight + "px";
          }

          function fnExitAll(v_scrName, e) {
              var e = window.event || e;
              var winObj = mainWin.document.getElementById(seqNo);
              mainWin.fnExit(winObj);
              e.cancelBubble = true;
          }
          function showDetails() {
            var test='';
          }  
          function reCalcSchedule(wfRefNo){
            var responseXML = mainWin.reCalcSchedule(wfRefNo,'FLOW');
            var records = selectNodes(responseXML, "//TaskHistory/REC");
            var tempTable="";
            for(var i =0;i<records.length ;i++){
                var recordArr = getNodeText(records[i]).split("~");
               if(i%2 ==0 ) 
                tempTable = tempTable+"<TR class='TBLoneTRalt'>";
               else
                tempTable = tempTable+"<TR class='TBLoneTR'>";
                tempTable = tempTable+"<TD><span class='SPNtext'>";
                tempTable = tempTable+recordArr[0];
                tempTable = tempTable+"</span></TD>";
                tempTable = tempTable+"<TD><span class='SPNtext'>";
                tempTable = tempTable+recordArr[1];
                tempTable = tempTable+"</span></TD>";
                tempTable = tempTable+"<TD><span class='SPNtext'>";
                tempTable = tempTable+recordArr[2];
                tempTable = tempTable+"</span></TD>";
                tempTable = tempTable+"<TD><span class='SPNtext'>";
                tempTable = tempTable+recordArr[3];
                tempTable = tempTable+"</span></TD>";
                tempTable = tempTable+"<TD><span class='SPNtext'>";
                tempTable = tempTable+recordArr[4];
                tempTable = tempTable+"</span></TD>";                
                tempTable =tempTable+'</TR>';
            }
            toolTipHtml = tempTable;
          }
        function showToolTip(e,text){
            var event = window.event || e;
            if(document.getElementById("bubble_tooltip") ==null){
                    var customWin = document.createElement("fieldset");
                    customWin.id = "bubble_tooltip";
                    customWin.className = "FSTcell";
                    customWin.type ="ME"
                    customWin.view ="ME"
                    customWin.style.position = "absolute";
                    customWin.innerHTML ='<div id="bubble_tooltip_content">';
                    document.getElementById("DIVWNDContainer").appendChild(customWin);
            }
            var obj = document.getElementById('bubble_tooltip');
            var obj2 = document.getElementById('bubble_tooltip_content');
                    obj2.innerHTML = text;
            obj.style.display = 'block';
            var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
            if(getBrowser().indexOf('SAFARI') >= 0)st=0; //ie11 changes
            var leftPos = event.clientX-2;
            if(leftPos<0)leftPos = 0;
            obj.style.left = leftPos+20 + 'px';
           obj.style.top = event.clientY+50 + 'px';
        }
        function hideToolTip(e)
        {
            if(document.getElementById('bubble_tooltip')!=null)    
                        document.getElementById('bubble_tooltip').style.display = 'none';
        }
        var toolTipHtml = "<%=tooltipTableHtml%>";
        function showETA(evnt){
            /*var htmltable = "<div id='tooltipDiv' class='WNDcontainerModal' style='overflow:none;border:1px solid black'><TABLE class='TBLgrid' cellspacing='0' cellpadding='0' border='0' role='presentation' type='ME' style='overflow:auto;width:100%;' ><TR class='TBLoneTRalt'><TD><a class='Astd'><span class='SPNup hide'></span>Workflow Reference</a></TD><TD><span class='SPNtext'><span class='SPNup hide'></span>RetailLending7759</span></TD></TR><TR class='TBLoneTR'><TD><a class='Astd'><span class='SPNup hide'></span>Transaction Reference</a></TD><TD><span class='SPNtext'><span class='SPNup hide'></span></span></TD></TR><TR class='TBLoneTRalt'><TD><a class='Astd'><span class='SPNup hide'></span>Title</a></TD><TD><span class='SPNtext'><span class='SPNup hide'></span>Application Input</span></TD></TR><TR class='TBLoneTRalt'><TD><a class='Astd'><span class='SPNup hide'></span>Customer Name</a></TD><TD><span class='SPNtext'><span class='SPNup hide'></span></span></TD></TR><TR class='TBLoneTR'><TD><a class='Astd'><span class='SPNup hide'></span>Creation Date(From\To)</a></TD><TD><span class='SPNtext'><span class='SPNup hide'></span>2015-1-12 16:06:56 IST</span></TD></TR><TR class='TBLoneTRalt'><TD><a class='Astd'><span class='SPNup hide'></span>Priority</a></TD><TD><span class='SPNtext'><span class='SPNup hide'></span>Low</span></TD></TR><TR class='TBLoneTR'><TD><a class='Astd'><span class='SPNup hide'></span>Channel</a></TD><TD><span class='SPNtext'><span class='SPNup hide'></span></span></TD></TR><TR class='TBLoneTRalt'><TD><a class='Astd'><span class='SPNup hide'></span>Originated By</a></TD><TD><span class='SPNtext'><span class='SPNup hide'></span></span></TD></TR><TR class='TBLoneTR'><TD><a class='Astd'><span class='SPNup hide'></span>Status</a></TD><TD><span class='SPNtext'><span class='SPNup hide'></span></span></TD></TR><TR class='TBLoneTRalt'><TD><a class='Astd'><span class='SPNup hide'></span>Comments</a></TD><TD><span class='SPNtext'><span class='SPNup hide'></span></span></TD></TR></TABLE></div>";
            htmltable = "<div id='tooltipDiv' class='WNDcontainerModal' style='overflow:none;border:1px solid black'>    <TABLE class='TBLgrid' cellspacing='0' cellpadding='0' border='0' role='presentation' type='ME' style='overflow:auto;width:100%;'>        <thead id='tblETAHead'>            <tr>                <th class='TBLoneTH' style='text-align:center'>                    <a class='Astd'>Stage</a>                </th>                <th class='TBLoneTH' style='text-align:center'>                    <a class='Astd'>Projected Completion Date</a>                </th>                <th class='TBLoneTH' style='text-align:center'>                    <a class='Astd'>Actual Completion Date</a>                </th>                <th class='TBLoneTH' style='text-align:center'>                    <a class='Astd'>Application Details</a>                </th>            </tr>        </thead>        <tbody>            <TR class='TBLoneTRalt'>                <TD>                    <span class='SPNtext'>RetailLending7759</span>                </TD>                <TD>                    <span class='SPNtext'>RetailLending7759</span>                </TD>                <TD>                    <span class='SPNtext'>RetailLending7759</span>                </TD>                <TD>                    <span class='SPNtext'>RetailLending7759</span>                </TD>            </TR>            <TR class='TBLoneTR'>                <TD>                    <span class='SPNtext'>TESTTEST</span>                </TD>                <TD>                    <span class='SPNtext'>TESTTEST</span>                </TD>                <TD>                    <span class='SPNtext'>TESTTEST</span>                </TD>                <TD>                    <span class='SPNtext'>TESTTEST</span>                </TD>            </TR>        </tbody>    </TABLE></div>";*/
            var htmltable = "<div id='tooltipDiv' class='WNDcontainerModal' style='overflow:none;border:1px solid black'><TABLE class='TBLgrid' cellspacing='0' cellpadding='0' border='0' role='presentation' type='ME' style='overflow:auto;width:100%;'><thead id='tblETAHead'><tr><th class='TBLoneTH' style='text-align:center'><a class='Astd'>";
            htmltable = htmltable +getItemDesc("LBL_STAGE");
            htmltable = htmltable +"</a></th><th class='TBLoneTH' style='text-align:center'><a class='Astd'>";
            htmltable = htmltable +getItemDesc("LBL_PROJ_ARR");
            htmltable = htmltable +"</a></th><th class='TBLoneTH' style='text-align:center'><a class='Astd'>";
            htmltable = htmltable +getItemDesc("LBL_PROJ_COM");
            htmltable = htmltable +"</a></th><th class='TBLoneTH' style='text-align:center'><a class='Astd'>";
            htmltable = htmltable +getItemDesc("LBL_ACT_ARR");
            htmltable = htmltable +"</a></th><th class='TBLoneTH' style='text-align:center'><a class='Astd'>";
            htmltable = htmltable +getItemDesc("LBL_ACT_COM");
            htmltable = htmltable +"</a></th></tr></thead><tbody>";
            //htmltable = htmltable + "<tooltipTableHtml>";
            htmltable = htmltable +toolTipHtml;
            htmltable = htmltable +"</tbody></TABLE></div>";
            showToolTip(event,htmltable);
        }          
        </script>
        <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    </head>
    <noscript>
        <%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%>
    </noscript>
    <body onload="fnCalcHeight();">
        <div class="WNDcontainer" id="DIVWNDContainer">
            <div class="WNDtitlebar" id="WNDtitlebar" onmousedown="startDrag('<%=seqNo%>', event)">
                <div class="WNDtitle" id="wndtitle">
                    <b class="BTNicon">
                        <span class="ICOflexcube"></span></b>
                     
                    <h1 class="WNDtitletxt">
                        <%=StringEscapeUtils.escapeHTML(description)%>
                        &nbsp;
                    </h1>
                    <div class="WNDbuttons">
                        <a class="WNDcls" accesskey="7" id="WNDbuttons" href="#" onblur="this.className='WNDcls'"
                           onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'"
                           onmouseout="this.className='WNDcls'"
                           title='<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>'
                           onclick="if(this.disabled) return false; fnExitAll('', event)"
                           onkeydown="return fnHandleScrBtn(event)">
                            <span class="LBLinv">
                                <%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span></a>
                         
                        <a class="WNDmin" accesskey="6" id="WNDbuttonsMin" href="#" onblur="this.className='WNDmin'"
                           onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'"
                           onmouseout="this.className='WNDmin'"
                           title='<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%>'
                           onclick="if(this.disabled) return false; mainWin.addTab('<%=seqNo%>', '<%=StringEscapeUtils.escapeJavaScript(description)%>', event)"
                           onkeydown="return fnHandleScrBtn(event)">
                            <span class="LBLinv">
                                <%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_MINIMIZE"))%></span></a>
                    </div>
                </div>
            </div>
            <div class="WNDcontent" id="DIVScrContainer">
            <div id ="HeadDiv">
            <table class="TBLgrid" cellspacing="0" cellpadding="0" border="0" role="presentation" type="ME" style="overflow:auto;width:100%;"  id="tblAppFlowHead">
            <thead id ="tblAppFlowHead">
            <tr>
            <th class="TBLoneTH" colspan='2' style="text-align:center"><a class="Astd"><%=appDetails%></a><button class="BTNtext" id="BTNDepictTask" onclick="mainWin.openBpmFlowDiagram('<%=instanceId%>');" style="float:right"><%=description%></button><button class="BTNtext" id="BTNDepictTask" onclick="reCalcSchedule('<%=wfRefNo%>','FLOW');" style="float:right"><%=recalcSch%></button></th>
            </tr>
            </thead>
            <tbody id="tblAppFlowBody">
            <tr class="TBLoneTR">
            <td class="TBLoneTD1"><a class="Astd"><%=wfrefno%></a></td>
            <td><span class="SPNtext"><%=wfRefNo%></span></td>
            </tr>
           <%-- <tr class="TBLoneTRalt">
            <td class="TBLoneTD1"><a class="Astd">Customer Name</a></td>
            <td><span class="SPNtext">Arumugam Selvaraju</span></td>
            </tr>
            <tr class="TBLoneTR">
            <td class="TBLoneTD1"><a class="Astd">Priority</a></td>
            <td><span class="SPNtext">High</span></td>
            </tr>
            <tr class="TBLoneTRalt">
            <td class="TBLoneTD1"><a class="Astd">Creation Date</a></td>
            <td><span class="SPNtext">2015-01-13 16:31:50 IST</span></td>            
            </tr> --%>           
            </tbody>
            </table>
            </div>
                <div id="ResTree" style="width:900px;overflow-x:scroll">
                <%=tableStr%>
                </div>
            </div>
        </div>
    </body>
</html>