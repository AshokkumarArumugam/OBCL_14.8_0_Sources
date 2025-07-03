<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="java.util.List"%>
<%@page import="java.util.Arrays"%>
<%@ page isErrorPage='true' %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
<title></title>
<script type="text/javascript">
	
</script>
</head>

<body>
	<center>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<h2 style="color: #FF0000" >Sorry ........... We have encountered a technical problem</h2>
	</center>
	<center>
	Please contact support team at <a href="mailto:list_fc_tools_supp-ofss_in_grp@oracle.com">TOOLS SUPPORT</a> to resolve the issue .
	</center>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<div align="center">
	For developer reference Please find the error details below:
	<br/>
	<% if(null!=request.getAttribute("javax.servlet.jsp.jspException")){%>
	<%=request.getAttribute("javax.servlet.jsp.jspException") %>
	<% }if(null!=exception){
	List<StackTraceElement> list = Arrays.asList(exception.getStackTrace());
	
	%>
	<%=exception %>
	<%=exception.getMessage() %>
	<%=list %>
	<%} %>
	</div>

</body>
</html>
