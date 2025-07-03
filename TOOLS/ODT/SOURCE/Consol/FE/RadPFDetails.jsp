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
  ** Copyright © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

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
	    <title>Rad PF Details</title>         
        		 
    </head>
    <body class="BODYDetails">
	    <div id="PND" style="display:none; "><%@include file="RadPFMenuDtls.jsp"%></div>
        <div id="PTD" style="display:none; "><%@include file="RadPFTables.jsp"%></div>
        <div id="PFD" style="display:none; "><%@include file="RadPFFilters.jsp"%></div>   
		<div id="PCL" style="display:none; "><%@include file="RadPFCommonEntity.jsp"%></div>   
		
        
     </body>
</html>