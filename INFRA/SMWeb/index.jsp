<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; " %>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%  String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN"); %>//Fortify Changes
<html>
 <head>
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1252"></meta>
    <title>SMS Gateway Web Client</title>
	<script language="JavaScript">
	
		var sServiceList = new Array();
		sServiceList[0] = 'EJB';
		sServiceList[1] = 'MDB';
		sServiceList[2] = 'HTTP';
                sServiceList[3] = 'WEBSERVICES';
                
		function invokeServlet(){
			document.adapterForm.hidQueue.value = document.adapterForm.cbnQueue.options[document.adapterForm.cbnQueue.selectedIndex].value;
			var form = document.adapterForm;
			form.SEND.disabled=true;
			form.action = "SMGWClientController";
			form.submit();
		}
		
		function fn_loadQueue()
        {
        	for (i=0; i<sServiceList.length; i++)
        	{
						var optn = document.createElement("OPTION");
						optn.text = sServiceList[i];
						optn.value = sServiceList[i];
						document.adapterForm.cbnQueue.options.add(optn);
        	}
        }
				
    </script>
  </head>
	  <body class="BodyBg" onload="javascript:fn_loadQueue();">
		<form name="adapterForm" method="post">
                 <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>//Fortify Changes
		 	<table border=1 width=100%>
			 	<tr class="BodyBg">
				 	<td width=100%>
						 <table width="100%" align="center" border="0" class="BodyBg">
						        <tr align="center">
						          <marquee>
						          <h1>
						          		SMS GATEWAY CLIENT
						          </h1>						          </marquee>
						        </tr>
						        <tr>
								  <td width=95>&nbsp;</td>
						          <td class="label" align="left">
						            <table>
										<tr></tr>
										<tr>
											<td><select id="cbnQueue" name="cbnQueue"></select>
										</tr>
										<tr>
											<td height="26">
									   			 <textarea name="reqXMLContents" cols="50" rows="50" id="reqXMLContents" class="textareaBG"></textarea>
											</td>
										</tr>
								        <tr>
								          <td align="center" colspan=2 align="left">
														<input type="button" value="Send" name="SEND" onclick="invokeServlet();" title="Click here to process the message "></input>
								          </td>                  
								        </tr>
									</table>
						          </td>
						        </tr>
						</table>
					</td>
				</tr>
			</table>
			<input type="hidden" name="hidQueue" value=""> 
		</form>
	</body>
</html>