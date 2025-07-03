<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; " %>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%  
String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN"); 
String gwResp = FCUtility.validateParameter((String) request.getAttribute("SMGWResponse"));
%>// 14.1 Fortify fix
<html>
 <head>
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1252"></meta>
    <title>SMS Gateway Web Client</title>
	<script language="JavaScript">
		function invokeServlet(){
			var form = document.adapterForm;
			form.SEND.disabled=true;
			form.action = "SMGWClientController";
			form.submit();
		}
		function gotoBack(){
			var form = document.adapterForm;
			form.action = "index.jsp";
  			form.submit();
		}
    </script>

  </head>
	  <body class="BodyBg">
		<form name="adapterForm" method="post">
                 <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>// 14.1 Fortify fix
		 	<table border=1 width=100%>
			 	<tr class="BodyBg">
				 	<td width=100%>
						 <table width="100%" align="center" border="0" class="BodyBg">
						        <tr>
								  <td width=95>&nbsp;</td>
						          <td class="label" align="left">
						            <table>
						      			 <tr align="center">
						          			<h3>
						          				SMS GATEWAY RESPONSE 
						          			</h3>
						        		  </tr>
										<tr></tr>
										<tr>
											<td>
									   			 <textarea name="reqXMLContents" cols="50" rows="50" id="reqXMLContents" class="textareaBG">
									   			 <%=StringEscapeUtils.escapeHTML(gwResp)%>
									   			 </textarea>
											</td>
										</tr>
								        <tr  align="center">
								          <td align="center" align="left">
											<input type="button" name="btnBack" value="Back" onClick="javascript:gotoBack();">
								          </td>                  
								        </tr>
									</table>
						          </td>
						        </tr>
						</table>
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>