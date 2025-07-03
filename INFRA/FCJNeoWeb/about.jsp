
<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : about.jsp
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
**
**
**	Modified By   : Shishirkumar Aithal
** 	Modified on   : 21-Apr-2017
** 	Description   : Bug No 25940757  
** 	Search String : Shishir Label Changes
**	Modified By   : Anil
** 	Modified on   : 29-Aug-2017
** 	Description   : Brand Change  
** 	Search String : Label Changes
**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css 
-------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.common.BranchParam"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.ofss.fcc.common.FCApplicationGlobals"%><!--Shishir Label Changes-->
<% 
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String strUserId = (String)session.getAttribute("USERID");
    String entity         = (String) session.getAttribute("ENTITY");
    String strTheme = (String)session.getAttribute("THEME");
    String Strlang         = (String)session.getAttribute("LANG");
    String ieCss         = (String)session.getAttribute("IECSS");
    String StrlangISOMap = (String)session.getAttribute("LANGISOMAP");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    FCUserGlobals gObjUC   = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
  String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
    <%
        FBContext fbContext = new FBContext(strUserId);
        //BranchLogger brnLogger = new BranchLogger(strUserId);
        //fbContext.setBrnLogger(brnLogger);
        
        Map itemDescMap = null;
	itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,strUserId);

	String l_FCUBS = (String)itemDescMap.get("LBL_FCUBS");
	String l_prodLicence = (String)itemDescMap.get("LBL_PROD_LICENCE");
	String l_bank = (String)itemDescMap.get("LBL_BANK_ABOUT");
	String l_CopyRight = (String)itemDescMap.get("LBL_COPY_RIGHT");
	String l_CopyRightDet = (String)itemDescMap.get("LBL_COPY_RIGHT_DET");
	String l_module = (String)itemDescMap.get("LBL_MODULES_INSTALLED");
	String l_licenseagreement = (String)itemDescMap.get("LBL_LICENSE_AGREEMENT");
	String AboutFlexcube = (String)itemDescMap.get("LBL_ABOUT_FLEXCUBE");
        String strOk= (String)itemDescMap.get("LBL_OK");
        String fcjLogo          = (String)itemDescMap.get("LBL_FLEXCUBE_LOGO");
        String oracleLogo       = (String)itemDescMap.get("LBL_ORACLE_LOGO");
        String strNoScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL"); 
/////////Shishir Label Changes Start ////////
        l_FCUBS = "";
        FCApplicationGlobals fCApplicationGlobals = FCApplicationGlobals.getInstance();
        if("FCPMTS".equals(fCApplicationGlobals.getAPPLICATION_EXT()))
            l_FCUBS =(String) itemDescMap.get("LBL_FCPMTS");
        else if("FCCPLN".equals(fCApplicationGlobals.getAPPLICATION_EXT()))
            l_FCUBS =(String) itemDescMap.get("LBL_FCCPLN");
        else if("FCROFC".equals(fCApplicationGlobals.getAPPLICATION_EXT()))
            l_FCUBS =(String) itemDescMap.get("LBL_FCROFC");
        else if("FCELCM".equals(fCApplicationGlobals.getAPPLICATION_EXT()))
            l_FCUBS =(String) itemDescMap.get("LBL_FCELCM");
        else
            l_FCUBS =(String) itemDescMap.get("LBL_LOGINPAGE_TITLE");
/////////Shishir Label Changes Ends ////////
    %> 
    <title><%=StringEscapeUtils.escapeHTML(AboutFlexcube)%> </title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content=0>
    <!--<link id="LINKCSS" href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>-->
    <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
    <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
    <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
    
    <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">
    <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
    <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
    <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
    <!--HTML5 Changes Start-->
    <!--
    <%if("L".equals(font)) {%>
        <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
    <%} else if ("S".equals(font)) {%>
        <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
    <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(strNoScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(strNoScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/SmhTlBar.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(strNoScriptLabel)%></noscript>    
    <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(strNoScriptLabel)%></noscript>    
    
    <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
    <script type="text/javascript" src="Script/OJET/require-config.js"></script>
    <script type="text/javascript" src="Script/OJET/main_misc.js"></script>
    
    <script type="text/javascript">
        var mainWin = parent;
        var alertType = "I";
        var accessKeyDetail =  true;//HTML5 Changes
        function setContentWidth(){
            document.getElementById("DIVif1").style.width = mainWin.dashBoardWidth - 5  +"px";
	}
    </script>
 </head>
 <body class="BDYdialog">
 <%
    String bankName = gObjUC.getBankName();
    

        
    Map releaseMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"RELEASE_VERSION~~"+entity, branchIdentifier,strUserId);
    String release =  (String)releaseMap.get("RELEASE") ;
           
    Map moduleMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"LICENSE_MODULE~~"+entity, branchIdentifier,strUserId);
    String moduleValue =  (String)moduleMap.get("MODULE") ;
    String modules[]= moduleValue.split(":");
                
    %>
    
      <div id="DIVif1" >
        <oj-dialog id="scrollingDialog"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                      position.at.horizontal="center" position.at.vertical="center"
                      position.of="window"  class="oj-sm-width-full">
   
       
               <DIV   slot=header id="wndtitle" class="oj-dialog-title" >
                    <h1><%=StringEscapeUtils.escapeHTML(AboutFlexcube)%></h1>
                </DIV>
            
               <DIV slot="body" id="wndwidth">
                   <div id="ResTree">
                       <div class="oj-flex-bar" style="margin-bottom:10px">
                       
                            <div class="oj-sm-margin-4x-top oj-flex-bar-start">
                                 <h2 class="hh4"><%=StringEscapeUtils.escapeHTML(l_FCUBS)%> <%=StringEscapeUtils.escapeHTML(release)%></h2>
                            </div>  
                        
                            <div class="oj-flex-bar-end">
                               <img src="./Images/oracle.png" class="header-app-logo" alt="logo image">
            </div>
        </div>
                            
                          <div class="oj-typography-body-sm ">
                    <dl>
                                    <dt class="oj-typography-body-sm"><%=StringEscapeUtils.escapeHTML(l_prodLicence)%></dt>
                                    <dd class="oj-typography-body-sm"><%=StringEscapeUtils.escapeHTML(l_bank)%>  <%=StringEscapeUtils.escapeHTML(bankName)%></dd>
                    </dl>
                    <dl>	  
                                    <dt class="oj-typography-body-sm"><%=StringEscapeUtils.escapeHTML(l_module)%></dt>
                        <% for(int i=0; i < modules.length; i++){
                            if(modules[i].length() > 0) {
                             String  module[] = modules[i].split("~");
                         %>
                                    <dd class="oj-typography-body-sm"><%=StringEscapeUtils.escapeHTML(module[0])%>  : <%=StringEscapeUtils.escapeHTML(module[1])%></dd>
                        <%}}%>
                    </dl>
            </div>
                <div style="padding:10px">
                   <%-- Code updated as per OFSS Copyright Standard --%>
                   <%-- <a href="#" class="Astd" onClick="mask();loadSubScreenDIV('ChildWin', 'Terms.jsp')"><%=StringEscapeUtils.escapeHTML(l_licenseagreement)%></a> --%>
                                                <p class="SPNtext oj-typography-body-sm "><%=StringEscapeUtils.escapeHTML(l_CopyRight)%> © <%=StringEscapeUtils.escapeHTML(l_CopyRightDet)%></p>
                    <br>
                            <p class="oj-typography-body-sm ">
                        Oracle and Java are registered trademarks of Oracle and/or its affiliates. Other
                        names may be trademarks of their respective owners.
                    </p>
                    <br>
                            <p class="oj-typography-body-sm ">
                        This software and related documentation are provided under a license
                        agreement containing restrictions on use and disclosure and are protected by
                        intellectual property laws. Except as expressly permitted in your license
                        agreement or allowed by law, you may not use, copy, reproduce, translate,
                        broadcast, modify, license, transmit, distribute, exhibit, perform, publish or
                        display any part, in any form, or by any means. Reverse engineering,
                        disassembly, or decompilation of this software, unless required by law for
                        interoperability, is prohibited.
                    </p>
                    <br>
                            <p class="oj-typography-body-sm ">
                        The information contained herein is subject to change without notice and is not
                        warranted to be error-free. If you find any errors, please report them to us in
                        writing.
                    </p>
                    <br>
                            <p class="oj-typography-body-sm ">
                        If this is software or related documentation that is delivered to the U.S.
                        Government or anyone licensing it on behalf of the U.S. Government,
                        the following notice is applicable:
                    </p>
                    <br>
                            <p class="oj-typography-body-sm">
                        U.S. GOVERNMENT END USERS: Oracle programs, including any operating system,
                        integrated software, any programs installed on the hardware, and/or
                        documentation, delivered to U.S. Government end users are “commercial
                        computer software” pursuant to the applicable Federal Acquisition Regulation and
                        agency-specific supplemental regulations. As such, use, duplication, disclosure,
                        modification, and adaptation of the programs, including any operating system,
                        integrated software, any programs installed on the hardware, and/or
                        documentation, shall be subject to license terms and license restrictions
                        applicable to the programs. No other rights are granted to the U.S. Government.
                    </p>
                    <br>
                            <p class="oj-typography-body-sm ">
                        This software or hardware is developed for general use in a variety of information
                        management applications. It is not developed or intended for use in any
                        inherently dangerous applications, including applications that may create a risk of
                        personal injury. If you use this software or hardware in dangerous applications,
                        then you shall be responsible to take all appropriate failsafe, backup, redundancy,
                        and other measures to ensure its safe use. Oracle Corporation and its affiliates
                        disclaim any liability for any damages caused by use of this software or hardware
                        in dangerous applications.
                    </p>
                    <br>
                            <p class="oj-typography-body-sm ">
                        This software or hardware and documentation may provide access to or
                        information on content, products and services from third parties. Oracle
                        Corporation and its affiliates are not responsible for and expressly disclaim all
                        warranties of any kind with respect to third-party content, products, and services.
                        Oracle Corporation and its affiliates will not be responsible for any loss, costs, or
                        damages incurred due to your access to or use of third-party content, products,
                        or services.
                    </p>
                </div>
                
            </div>		
        </DIV>
    	
    
               <DIV slot="footer">
                  <div class="oj-flex-bar oj-sm-margin-4x-bottom" >
                
                      <div class="oj-sm-margin-4x-top oj-flex-bar-end">
                    
                           <oj-button  class="action-button-primary oj-sm-margin-1x" chroming="solid"   value="<%=StringEscapeUtils.escapeHTML(strOk)%>"  id="BTN_OK"  onclick="fnCloseToolbarScreen()"  onkeydown="return handleScrObj(this,event)" name=<%=StringEscapeUtils.escapeHTML(strOk)%> >
                    <%=StringEscapeUtils.escapeHTML(strOk)%></oj-button>
                    </div>
                </div>                
            </div>		
    

        </oj-dialog>
    </div>
    
 </body>
</html>
