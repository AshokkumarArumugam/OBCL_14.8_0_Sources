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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap" %>
<html lang="en" >
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
	    <title>Rad Details</title>   
	    <link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>      
         
    </head>
    <body class="BODYDetails">
        <div id="MND" style="display:none; "><%@include file="RadMenuDtls.jsp"%></div>
        <div id="DSN" style="display:none; "><%@include file="RadDatasourceGrid.jsp"%></div>
        <div id="DBT" style="display:none; "><%@include file="RadDatasource.jsp"%></div>
        <div id="DBC" style="display:none; "><%@include file="RadFieldsDetails.jsp"%></div>
        <div id="LOV" style="display:none; "><%@include file="RadLovGrid.jsp"%></div>
        <div id="LNM" style="display:none; "><%@include file="RadLovDetails.jsp"%></div>        
        <div id="BLK" style="display:none; "><%@include file="RadDataBlocksGrid.jsp"%></div>
        <div id="BNM" style="display:none; "><%@include file="RadDataBlocks.jsp"%></div>
		<div id="BFD" style="display:none; "><%@include file="RadBlockFieldsDetails.jsp"%></div>
        <div id="SCR" style="display:none; "><%@include file="RadScreenGrid.jsp"%></div>
        <div id="SSC" style="display:none; "><%@include file="RadScreens_C.jsp"%></div>
        <div id="HEADER" style="display:none;"><%@include file="RadHeaderGrid.jsp"%></div>
        <div id="BODY" style="display:none;  "><%@include file="RadBodyGrid.jsp"%></div>
        <div id="FOOTER" style="display:none;"><%@include file="RadFooterGrid.jsp"%></div>
		<div id="TAB" style="display:none; "><%@include file="RadTabs_C.jsp"%></div>
        <div id="SEC" style="display:none; "><%@include file="RadSections_C.jsp"%></div>
        <div id="FLD" style="display:none; "><%@include file="RadFieldSetGrid.jsp"%></div>
        <div id="FDN" style="display:none; "><%@include file="RadFieldSet_C.jsp"%></div>
		<div id="ACT" style="display:none; "><%@include file="RadActions.jsp"%></div>
        <div id="CFM" style="display:none; "><%@include file="RadCallForms.jsp"%></div>
        <div id="LFM" style="display:none; "><%@include file="RadLaunchForms.jsp"%></div>        
        <div id="SUM" style="display:none; "><%@include file="RadSummary_C.jsp"%></div>
        <div id="OTH" style="display:none; overflow:auto;"><%@include file="RadOtherInfo.jsp"%></div>
        
     </body>
</html>