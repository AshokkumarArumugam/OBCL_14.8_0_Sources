<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : JobsDetails.jsp
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
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.scheduler.*"%>
<%@ page import="com.ofss.fcc.commonif.IFCScheduler"%>
<%@ page import="java.util.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%
//FC 11.4 NLS Changes
request.setCharacterEncoding("UTF-8");			
    /*JAN_CPU_BUG-25068346 Start-- */
	response.setCharacterEncoding("UTF-8");
	response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 );
    /*JAN_CPU_BUG-25068346 End-- */
 IFCScheduler sch = FCSchedulerUtils.getScheduler();
  String strTheme         = (String)session.getAttribute("THEME");     
   String StrlangISOMap   = (String)session.getAttribute("LANGISOMAP");
/* # BUG 15978732 fixes start */ 
 String jobs = FCUtility.validateParameter(request.getParameter("jobs"));
 String description = FCUtility.validateParameter(request.getParameter("description"));
 String ieCss         = (String)session.getAttribute("IECSS");
 /* # BUG 15978732 fixes end */ 
 StringBuffer strout = new StringBuffer();
 String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");
                        
 HashMap jobList = (HashMap)sch.getJobDetails(jobs);
 
 			strout.append("<TABLE  class=TABLESummary id= 'tblJobs' width='100%' border='0' cellpadding='0' cellspacing='0'>");
			strout.append(" <THEAD>");
			strout.append("<TR>");
			strout.append("<TH style='TOP: 0px' scope=col order='asc'>"+"</TH>");
			strout.append("<TH style='TOP: 0px' scope=col order='asc'>Job Group</TH><TH style='TOP: 0px' scope=col order='asc'>Next Fire Time</TH><TH style='TOP: 0px' scope=col order='asc'>Status</TH><TH style='TOP: 0px' scope=col order='asc'>Job Nature</TH><TH style='TOP: 0px' scope=col order='asc'>Current Firing Instances</TH>");
			strout.append("</TR>");
			
			strout.append(" </THEAD>");
                        
 			Set<String> processSet=jobList.keySet();
			Iterator<String> inIt=processSet.iterator();
                        //strout.append("<TABLE   id= 'tblJobsDet' width='100%' border='1' cellpadding='1' cellspacing='1'>");
                        while(inIt.hasNext())
			{
                              String jobId=inIt.next();
                               
                               String jobAttributes[] = ((String)jobList.get(jobId)).split("~");
				strout.append("<TR>");
				strout.append("<TD width='20%'>" + jobId + "</TD><TD width='20%'>"+ jobAttributes[0] + "</TD><TD width='20%'>" + jobAttributes[1]+ "</TD><TD width='15%'>" + jobAttributes[2] + "</TD><TD width='20%'>"+ jobAttributes[3] + "</TD><TD width='20%'>"+ jobAttributes[4] + "</TD>");
				strout.append("</TR>");
			}
                        strout.append("</TABLE>");
			
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
 
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
  <head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="cache-control" content="no-cache">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
    <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content=0>
    <title>
      <%=StringEscapeUtils.escapeHTML(description)%>
    </title>
    <link href="Theme/<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>  
        <!--HTML5 Changes Start--><link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
    <script language="JavaScript">
    function fnloadJobTable()
    {

var htmlJobs = '<%=StringEscapeUtils.escapeJavaScript(strout.toString())%>';
jobDiv.innerHTML = htmlJobs;
var tHeadrow = document.getElementById('tblJobs').rows[0];
 //var dlgArg  = dialogArguments;
tHeadrow.cells[0].innerHTML = dialogArguments.mainWin.frames["Global"].getItemDesc("LBL_JOBCODE");
tHeadrow.cells[1].innerHTML = dialogArguments.mainWin.frames["Global"].getItemDesc("LBL_JOBGROUP");
tHeadrow.cells[2].innerHTML = dialogArguments.mainWin.frames["Global"].getItemDesc("LBL_NEXT_FIRE_TIME");
tHeadrow.cells[3].innerHTML = dialogArguments.mainWin.frames["Global"].getItemDesc("LBL_JOB_STATUS");
tHeadrow.cells[4].innerHTML = dialogArguments.mainWin.frames["Global"].getItemDesc("LBL_JOB_NATURE");
tHeadrow.cells[5].innerHTML = dialogArguments.mainWin.frames["Global"].getItemDesc("LBL_JOB_FIRE_CNT");

var len = document.getElementById("tblJobs").tBodies[0].rows.length;

	    for(i = 0;i < len; i++){
			var longDate = new Date();
			 longDate.setTime(document.getElementById("tblJobs").tBodies[0].rows[i].cells[2].innerText);
                        document.getElementById("tblJobs").tBodies[0].rows[i].cells[2].innerHTML = longDate.toLocaleString();
		}

	   document.getElementById("BTN_EXIT").value=dialogArguments.mainWin.frames["Global"].getItemDesc("LBL_EXIT");	   
    }
    </script>
  </head>
  <body class="BODYForm" onload="fnloadJobTable()"><br></br>&nbsp;<form class="form1"
                                                       name="form1">
      <div id="jobDiv" class=DIVSummaryInner  style="overflow:scroll; height:265px;width:750px;"></div>
	  <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
    </form><%-- <button id="exit" value="Cancel" onclick="window.close();"
                   style="position:absolute;left:696px;top:323px">
     <img src="Images/Exit2.gif"/>
	 
    </button> --%>
	<button class=BUTTONExit id=BTN_EXIT onblur="this.className='BUTTONExit'" onmouseover="this.className='BUTTONExitHover'" onfocus="this.className='BUTTONExitHover'" onclick="window.close();" style="position:absolute;left:696px;top:370px" onmouseout="this.className='BUTTONExit'" type=button value=Exit>
        <IMG id="BTN_EXIT_IMG'" style="DISPLAY: none" alt=Exit src="Images/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>/Icons/Exit2.gif" name=BTN_EXIT_IMG value="Exit">
	</button> 
	</body>
</html>