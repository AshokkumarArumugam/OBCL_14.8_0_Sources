<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : Customer Balance.JSP
**
** Module       : FCJNeoWeb
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

Copyright ©2011-2016 by Oracle Financial Services Software Limited..
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
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%
    request.setCharacterEncoding("UTF-8"); 
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 );    
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String Strlang          = (String)session.getAttribute("LANG");
    String StrlangISOMap    = (String)session.getAttribute("LANGISOMAP");
    String StrUserId        = (String) session.getAttribute("USERID");
    String entity        = (String) session.getAttribute("ENTITY");
    String strTheme         = (String)session.getAttribute("THEME");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");   
    String currBranch       = (String)session.getAttribute("BRANCH_CODE");
    String CSRFtoken        = (String)session.getAttribute("X-CSRFTOKEN");
    Map itemDescMap =  (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);

    String noScriptLabel    = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");  
    String custBalView      = (String)itemDescMap.get("LBL_CUSTOMER_BAL_VIEW");
    String imagePath        = "Images/"+strTheme.substring(0,strTheme.indexOf(".css")); 
    /* # BUG 15978732 fixes start */ 	
    String title            = FCUtility.validateParameter(request.getParameter("title"));
    /* # BUG 15978732 fixes end */ 	
    String browserCSS       = (String)session.getAttribute("BROWSER_CSS");
    String ieCss            = (String)session.getAttribute("IECSS");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <head>
        <title><%=StringEscapeUtils.escapeHTML(custBalView)%></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>
        <meta http-equiv="Content-Language" content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache"></meta>
        <meta http-equiv="Pragma" content="no-cache"></meta>
        <meta http-equiv="Expires" content="0"></meta>
        <!--<link href="Theme/Ext<%= StringEscapeUtils.escapeURL(strTheme) %>" rel="stylesheet" type="text/css"/>-->
       <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/>--><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrlangISOMap)%>.css" rel="stylesheet" type="text/css"/>
        <!--<link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>-->
        <!--HTML5 Changes Start-->
        <!--
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->
    </head>    
    <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> 
    <script type="text/javascript">
        var mainWin             = parent.mainWin;
        var parentScrID         = "ChildWin";                            
        var fcjResponseDOM      = parent.responseDom; 
    </script>
     <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
     <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
   
    <script type="text/javascript" defer="DEFER">                         
        function showDetails(){ 
            var acclist = getNodeText(selectSingleNode(fcjResponseDOM,'//ACCLIST'));            
            document.getElementById("BLK_BALANCE_ACCNO").value      = acclist.split("~")[0];
            document.getElementById("BLK_BALANCE_BRNCODE").value    = acclist.split("~")[1];
            document.getElementById("BLK_BALANCE_CCY").value        = acclist.split("~")[3];
            document.getElementById("BLK_BALANCE_CUSTNO").value     = acclist.split("~")[2];
            var accCurrBal  = new MB3Amount(acclist.split("~")[5], true, acclist.split("~")[3]);
            var accAvlBal   = new MB3Amount(acclist.split("~")[4], true, acclist.split("~")[3]);
			/*Fix for 18710388 Starts*/
            //var lcyCurBal   = new MB3Amount(acclist.split("~")[6], true, acclist.split("~")[3]);
			var lcyCurBal   = new MB3Amount(acclist.split("~")[6], true, mainWin.txnBranch[parent.g_txnBranch].Lcy);  
			/*Fix for 18710388 Ends*/
            document.getElementById("BLK_BALANCE_ACCCURBAL").value  = accCurrBal.getInputAmount();
            document.getElementById("BLK_BALANCE_ACCAVLBAL").value  = accAvlBal.getInputAmount();
            document.getElementById("BLK_BALANCE_LCYCURBAL").value  = lcyCurBal.getInputAmount();
            fnCalcCustBalViewHgt();
            document.getElementById("BTN_EXIT_IMG").focus();
        }
        
        function fnCalcCustBalViewHgt() {  
            parent.document.getElementById("ChildWin").style.width  = document.getElementById("DIVWNDContainer").offsetWidth+"px";
            parent.document.getElementById("ChildWin").children[0].style.width = document.getElementById("DIVWNDContainer").offsetWidth+"px";
            parent.document.getElementById("ChildWin").style.height  = document.getElementById("DIVWNDContainer").offsetHeight+"px";
            parent.document.getElementById("ChildWin").children[0].style.height = document.getElementById("DIVWNDContainer").offsetHeight+"px";
            parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);           
            parent.document.getElementById("ChildWin").style.top = document.getElementById("WNDtitlebar").offsetHeight+"px";
            parent.document.getElementById("ChildWin").style.left = "4px";  
            parent.mask();
            var balWinObj = parent.document.getElementById("Div_ChildWin");
            balWinObj.focus();
            document.getElementById("BTN_EXIT_IMG").focus();
        }   

        function fnExitCustBalView() {   
            parent.unmask();
            parent.hotkeySrcElem.focus();
            var childDivObj = parent.document.getElementById("ChildWin");
            childDivObj.getElementsByTagName("IFRAME")[0].src = "";
            parent.document.getElementById("Div_ChildWin").removeChild(childDivObj);
        }
        
        function AccessKeys(e){
            mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
            var evnt = window.event || e;
            if (evnt.keyCode == 27) {
                fnExitCustBalView();
                return;
            }
        }
        
        function handleScrObj(scrObj,e){
            var e = window.event || e;
            var srcElement = getEventSourceElement(e);
            if(e.keyCode == 9 && !e.shiftKey){
              if(srcElement.tagName == "BUTTON")  
                document.getElementById("CVS_BAL_DETAILS").children[0].focus();   
              else
                document.getElementById("BTN_EXIT_IMG").focus(); 
              preventpropagate(e);
              return false;
            } else if(e.keyCode == 9 && e.shiftKey) {
              if(srcElement.tagName == "BUTTON")  
                document.getElementById("CVS_BAL_DETAILS").children[0].focus();   
              else
                document.getElementById("BTN_EXIT_IMG").focus(); 
              preventpropagate(e);
              return false;
            }else if(e.keyCode == 32 || e.keyCode == 13){
                if(srcElement.tagName == "A")  
                    fndispAccDetails(document.getElementById('BLK_BALANCE_ACCNO').value,'CUST_ACC','',document.getElementById('BLK_BALANCE_BRNCODE').value);
                else
                    fnExitCustBalView();
                preventpropagate(e);
                return false;
            }
            return true;
        }
    </script>
  
    <body class="BODYForm" onload="showDetails();" oncontextmenu="return false;" onkeydown="AccessKeys(event);" onfocus= "document.getElementById("BTN_EXIT_IMG").focus();">
        <div class="WNDcontainer" id="DIVWNDContainer">
            <div class="WNDtitlebar" id="WNDtitlebar" onmousedown="startDrag('ChildWin', event)">
                <div class="WNDtitle" id="wndtitle">
                    <b class="BTNicon"><span class="ICOflexcube"></span></b>           
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(custBalView)%>&nbsp;</h1>
                    <div class="WNDbuttons">
                        <a class="WNDcls" id ="WNDbuttons" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onkeydown="return handleScrObj(this,event)" onclick="fnExitCustBalView()"></a>
                        <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span></a>
                    </div>
                </div>
            </div>
            <DIV class="WNDcontentmodal" id="DIVScrContainer" style="width:22em">
                <DIV style="clear:both"> 
                    <div class="DIVText">
                        <label class="LBLstd" for="BLK_BALANCE_BRNCODE"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_BRANCH_CODE"))%></label>                                                             
                        <input class="TXTro" id="BLK_BALANCE_BRNCODE"  tabindex =-1 readonly="readOnly" maxlength="6" size="3" name="BRNCODE"></input>
                    </div>
                    <div class="DIVText">
                        <label class="LBLstd" for="BLK_BALANCE_ACCNO"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CUST_ACCOUNT"))%></label>                                                             
                        <input class="TXTro" id="BLK_BALANCE_ACCNO"  tabindex =-1 readonly="readOnly" maxlength="30" size="15" name="ACCNO"></input>
                    </div>
                    <div class="DIVText">
                        <label class="LBLstd" for="BLK_BALANCE_CUSTNO"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CUSTOMER_ID"))%></label>                     
                        <input class="TXTro" id="BLK_BALANCE_CUSTNO" tabindex =-1 readonly="readOnly" maxlength="30" size="15" name="CUSTNO"></input>
                    </div>
                    <div class="DIVText">
                        <label class="LBLstd" for="BLK_BALANCE_CCY"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CURRENCY"))%></label>                     
                        <input class="TXTro" id="BLK_BALANCE_CCY" tabindex =-1 readonly="readOnly" maxlength="30" size="15" name="CCY"></input>
                    </div>
                    <div class="DIVText">
                        <label class="LBLstd" for="BLK_BALANCE_ACCCURBAL"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_ACC_CURRBAL"))%></label>
                        <input class="TXTro" style="text-align:right" id="BLK_BALANCE_ACCCURBAL" tabindex =-1 readonly="readOnly" maxlength="30" size="15" name="ACCURBAL"></input>
                    </div>
                    <div class="DIVText">
                        <label class="LBLstd" for="BLK_BALANCE_ACCAVLBAL"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_TOTALAVLBAMT"))%></label> 
                        <input class="TXTro" style="text-align:right" id="BLK_BALANCE_ACCAVLBAL" tabindex =-1 readonly="readOnly" maxlength="30" size="15" name="ACCAVLBAL"></input>
                    </div>
                    <div class="DIVText">
                        <label class="LBLstd" for="BLK_BALANCE_LCYCURBAL"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_ACC_LOCCURRBAL"))%></label>
                        <input class="TXTro" style="text-align:right" id="BLK_BALANCE_LCYCURBAL" tabindex =-1 readonly="readOnly" maxlength="30" size="15" name="LCYCURBAL"></input>
                    </div>
                </div>
            </div>                        
            <div class="DIVfooter" id="DIVFooter">
                <h2 class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_PAGE_FOOTER"))%></h2>
                <DIV class=DIVAbutton id=DIVSubSystem>
                    <UL>
                        <LI id=CVS_BAL_DETAILS><A class=Abutton tabindex=0 onblur="this.className='Abutton'" onmouseover="this.className='AbuttonH'" onfocus="this.className='AbuttonH'" onclick="fndispAccDetails(document.getElementById('BLK_BALANCE_ACCNO').value,'CUST_ACC','',document.getElementById('BLK_BALANCE_BRNCODE').value)" onkeydown="return handleScrObj(this,event)" onmouseout="this.className='Abutton'"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_DETAIL"))%></A></LI>
                    </UL>
                </DIV>
                <div class="DIVAudit">
                    <table id="TBLPageTAB_FOOTER" cellpadding="0" cellspacing="0" border="0" width="99%" summary="">
                        <tr>
                            <td width="98%" valign="top"></td>
                            <td nowrap="nowrap" style="padding-left:10px">
                                <button class="BTNfooter" id="BTN_EXIT_IMG" name="BTN_EXIT" value="Exit" onclick="fnExitCustBalView()" onkeydown="return handleScrObj(this,event)">
                                    <%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_EXIT"))%>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </body>    
</html>