<!--
  **
  **
  ** File Name  : RadDetails.jsp
  **
  ** 
  ** This source is part of the Oracle FLEXCUBE Software System and is copyrighted by Oracle Financial Services Software Limited.
  ** 
  ** 
  ** All rights reserved. No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
  ** graphic, optic recording or otherwise, translated in any language or computer language,
  ** without the prior written permission of Oracle Financial Services Software Limited.
  ** 
  ** Oracle Financial Services Software Limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** India
  ** Copyright Â© 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

  CHANGE HISTORY
  
  SFR Number         :  FAHAD.KARIYAMBATH@ORACLE.COM
  Changed By         :  
  Change Description :  

-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap" %>
 
<html lang="en" >
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
        <link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
	    <title>Rad GiDetails</title>         
        		 
    </head>
    <body class="BODYDetails">
	    <div id="GND" style="display:none; "><%@include file="RadGIMenuDtls.jsp"%></div>
        <div id="HAD" style="display:none; "><%@include file="RadGIHeader.jsp"%></div>
        <div id="DHAD" style="display:none; "><%@include file="RadGIHeaderGrid.jsp"%></div>  
        <div id="BDY" style="display:none; "><%@include file="RadGIBody.jsp"%></div>  
        <div id="DBDY" style="display:none; "><%@include file="RadGIBodyGrid.jsp"%></div>          
        <div id="FTR" style="display:none;"><%@include file="RadGIFooter.jsp"%></div> 
        <div id="DFTR" style="display:none; "><%@include file="RadGIFooterGrid.jsp"%></div> 
        <div id="RBDY" style="display:none; "><%@include file="RadGIBRecord.jsp"%></div>          
        <div id="RFTR" style="display:none;"><%@include file="RadGIFRecord.jsp"%></div> 
        <div id="RHAD" style="display:none; "><%@include file="RadGIHRecord.jsp"%></div> 
		<div id="FBDY" style="display:none; "><%@include file="RadGIBField.jsp"%></div>          
        <div id="FFTR" style="display:none;"><%@include file="RadGIFField.jsp"%></div> 
        <div id="FHAD" style="display:none; "><%@include file="RadGIHField.jsp"%></div> 
		
        
     </body>
</html>