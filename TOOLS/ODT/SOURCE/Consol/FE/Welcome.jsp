 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="com.ofss.odt.util.ODTUtils"%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.odt.util.ODTApplicationGlobals"%>
<%

String ssoReqd = ODTApplicationGlobals.getSSOREQ();
String lDN = "";
String ssoKeys = "DN";
if ("Y".equalsIgnoreCase(ssoReqd)) {

    ssoKeys = ODTApplicationGlobals.getKeyForSSO();
}    

lDN = ODTUtils.validateParameterForInvalids(request.getHeader(ssoKeys));  
session.setAttribute("SSODN", lDN);
System.out.println("Welcome Page ");
    

%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252"/>
     <link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>   
        
<script type="text/javascript" language="JavaScript">

  function fnappInit() {
  
        var widnowDateTime = new Date();
        var windowID = "" + widnowDateTime.getFullYear() + "" + widnowDateTime.getMonth() + "" + widnowDateTime.getDate() + "" + widnowDateTime.getDay() + "" + widnowDateTime.getHours() + "" + widnowDateTime.getMinutes() + "" + widnowDateTime.getSeconds() + "" + widnowDateTime.getMilliseconds(); 
        var windowName = "LoginWindow" + windowID;          
        window.open('', windowName, "toolbar=no,location=false,status=no,menubar=no,scrollbars=yes,directory=false,resizable=no,top=0,left=0,width=700,height=400");/*Zooming Changes */
        document.submitForm.target = windowName;
        document.submitForm.submit();
        window.open('','_parent','');
        window.close();

  }

</script>
        
    </head>
    <body onload="fnappInit()">
    <form name="submitForm" action="RADLoginServlet" method="post" target="LoginWindow">
    <input type ="hidden" name="WELCOME" value="WELCOME">
    </form>
    </body>
</html>