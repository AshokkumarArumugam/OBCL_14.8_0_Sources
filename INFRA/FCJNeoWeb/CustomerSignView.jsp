<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : CustomerSingleView.JSP
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

Copyright © 2010-2016 by Oracle Financial Services Software Limited..
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes

	Changed By   : Rishabh Gupta
	Changed On   : 27-Sept-2016
	Reason       : Changes done to pass event for getting the rowindex when the user clicks on the different customer id/specimen no 
	Search string: 12_0_3_RETRO_12_2_23653665
	Sfr no       : 23653665
	
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 10-Nov-2016
  **  Modified Reason      : CUSTMER SIGNOTORY ID AND NAME REPLACED WHILE NAVIGATING AMONG THE SCREENS
  **  Retro Source         : 9NT1606_12_0_3_BRED_IT_LTD
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_25031091
  
  **  Modified By          : Ambika Selvaraj
  **  Modified On          : 15-Sep-2017
  **  Modified Reason      : The -ms-filter property used for flipping signature/image is deprecated from IE9. Canvas object is used instead. Changes done for the same. 
  **  Retro Source         : 9NT1606_12_0_3_DHAKA_BANK_LTD
  **  Search String        : 9NT1606_12_4_RETRO_12_0_3_26780544
*/
%>


<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.FCUtility"%>
<%@ page import="com.ofss.fcc.logger.BranchLogger"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="java.util.*"%>
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
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,StrUserId);
     
    String noScriptLabel    = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String custSignView     = (String)itemDescMap.get("LBL_CUSTOMER_SIGN_VIEW");
    String brnCode          = (String)itemDescMap.get("LBL_BRANCH_CODE");
    String custAcc          = (String)itemDescMap.get("LBL_CUST_ACCOUNT");
    String custId	    = (String)itemDescMap.get("LBL_CUSTOMER_ID");
    String custName         = (String)itemDescMap.get("LBL_CUST_NAME");
    String accMsg           = (String)itemDescMap.get("LBL_ACC_MSG");
    String mandatory           = (String)itemDescMap.get("LBL_INFRA_MANDATORY");
        
    String imagePath = "Images/"+strTheme.substring(0,strTheme.indexOf(".css"));
   /* # BUG 15978732 fixes start */ 
    String pkName = FCUtility.validateParameter(request.getParameter("keyName"));
    String pkColName = FCUtility.validateParameter(request.getParameter("pkColName"));
    String pkColValues = FCUtility.validateParameter(request.getParameter("pkColVal"));
    String seqNo = FCUtility.validateParameter(request.getParameter("seqNo"));
    String imageName = FCUtility.validateParameter(request.getParameter("image"));
    String actionCode = FCUtility.validateParameter(request.getParameter("action"));
    String title = FCUtility.validateParameter(request.getParameter("title"));
    String upload = FCUtility.validateParameter(request.getParameter("upload"));
    String functionId = FCUtility.validateParameter(request.getParameter("functionId"));
    String imageFieldName = FCUtility.validateParameter(request.getParameter("imgFieldName"));
    String targetLocation = FCUtility.validateParameter(request.getParameter("targetLocation"));
   /* # BUG 15978732 fixes end */ 
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String ieCss         = (String)session.getAttribute("IECSS");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
  <head>
    <title><%=StringEscapeUtils.escapeHTML(custSignView)%></title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrlangISOMap)%>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content=0>
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
    <script type="text/javascript" src="Script/JS/SIGDISP_SYS.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript">
      var mainWin = parent.mainWin;
      var parentScrID = "ChildWin";
      if (typeof (parent.fromSubScr) == 'undefined') {
          parentScrID = parent.seqNo;
      }
      var launcherDIVWidth = parent.parent.document.getElementById(parentScrID).style.width;
      var launcherDIVHeight = parent.parent.document.getElementById(parentScrID).style.height;
      var launcherIFWidth = parent.parent.document.getElementById(parentScrID).children[0].style.width;
      var launcherIFHeight = parent.parent.document.getElementById(parentScrID).children[0].style.height;
      var launcherResTreeHeight = parent.document.getElementById("DIVScrContainer").style.height;
      var launcherResTreeWidth = parent.document.getElementById("DIVScrContainer").style.width;
      var launcherHeaderWidth = parent.document.getElementById("DIVWNDContainer").style.width;
      var launcherLeft = parent.parent.document.getElementById(parentScrID).style.left;
    </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
    <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
    <script type="text/javascript" src="Script/JS/UIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>    
    <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Util.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/TabContent.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/JS/Databinding.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtDatabinding.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtBuildXML.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtensibleMEUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/ExtensibleUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript" src="Script/ExtJS/Extensible.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    <script type="text/javascript">
      var parentgAction = parent.gAction;
      functionId = "SVDCIFSG";
      gAction = "EXECUTEQUERY";
      var fcjResponseDOM = parent.responseDom;
      var seqNo = '<%=StringEscapeUtils.escapeJavaScript(seqNo)%>';
      var parentScrID = "ChildWin";
      var csrfVal = "<%= StringEscapeUtils.escapeJavaScript(CSRFtoken)%>";
      var g_scrType = 'M';
      scrName = 'CVS_MAIN';
      var gscrPos = "template";
      var subScrHeaderTabId = "TAB_HEADER";
      var subScrBodyTabId = "TAB_MAIN";
      var objCanvasSig = null;
      var objCanvasPhoto = null;
      if (typeof (parent.fromSubScr) == 'undefined') {
          parentScrID = parent.seqNo;
      }
      var scrDIVHeight = parent.parent.document.getElementById(parentScrID).clientHeight;
	  /*R4 Citi Signature Verification change start*/
      var allSigns = mainWin.getItemDesc("LBL_ALL_SIG");
      var allImages = mainWin.getItemDesc("LBL_ALL_IMG");
      /*R4 Citi Signature Verification change end*/

      function getAccDetRecord(dbt, rowNum) {
          accRecNode = selectSingleNode(dbDataDOM, dbt + "[@ID="+rowNum+"]");
          return accRecNode;
      }

      function getSignDetRecord(accRecDetNode, signNum) {
          return selectSingleNode(accRecDetNode, "BLK_SIGNATURE_DETAILS[@ID=" + signNum + "]");
      }

      var acRecNum = 0;
      var signId = 0;
      // Changes For Customer Signature Starts
      /*  function showAccountDet(dbt, rowNum,e) {
            //var accRecNode = getAccDetRecord(dbt, rowNum);
            var accRecNode = selectNodes(dbDataDOM , "//BLK_SIGNATURE")[rowNum-1];
            if(accRecNode) {
                acRecNum = rowNum;
                var signRecNode = selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID="+rowNum+"]");
                                  //selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID="+rowNum+"]"); 
                if (signRecNode) {
                    document.getElementById("BLK_SIGNATURE_ID").value = getNodeText(selectSingleNode(signRecNode, "CIF_SIG_ID"));
                    document.getElementById("BLK_SIG_SOLO_SUFFICIENT").checked = getNodeText(selectSingleNode(signRecNode, "SOLO_SUFFICIENT"))==1?true:false;  
                    document.getElementById("BLK_SIGN_NAME").value = getNodeText(selectSingleNode(signRecNode, "SIG_NAME"));
                        document.getElementById("BLK_SIG_SPECIMEN_NO").value = 1;
                        var signNode = selectSingleNode(signRecNode, "BLK_SIGNATURE[SPECIMAN_NO=1]");
                        //document.getElementById("SIGNATUREIMG").src = "\TempForward.jsp?action=FCUBSSignatureServlet&fileName="+getNodeText(selectSingleNode(signNode, "FILE_TYPE"))+"&actionType=READ";
                        //ArunT modified for image not displaying
                        document.getElementsByName("IMAGEDISPLAY")[0].src = "\TempForward.jsp?action=FCUBSSignatureServlet&fileName="+getNodeText(selectSingleNode(signNode, "FILE_TYPE"))+"&actionType=READ";
                        /*Multiple signature changes End*/
      /* setInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE_DETAILS"), 1); 
                        if(typeof(e)!= 'undefined'){
                            if(getRowIndex() >= 0){
                                var brn = document.getElementsByName("BRANCH")[getRowIndex()-1].value;
                                /*Multiple signature changes Start*/
      //setInnerText(document.getElementById("TotPageSV__BLK_SIGNATURE_DETAILS"), selectNodes(dbDataDOM, "//BLK_ACCOUNT_DETAILS[BRANCH='"+brn+"']/BLK_SIGNATURE_DETAILS/BLK_SIGNATURE").length);
      //setInnerText(document.getElementById("TotPageSV__BLK_SIGNATURE_DETAILS"), selectNodes(dbDataDOM, "//BLK_SIGNATURE").length);
      /*Multiple signature changes Ends*/
      /*fnUpdateSEPgBtn("BLK_SIGNATURE_DETAILS");
                            }
                        }
                    }
                }
        } */

      function showAccountDet(dbt, rowNum, e) {

          //var accRecNode = getAccDetRecord(dbt, rowNum);
          // Changes For Customer Signature Starts
          var kanRecNode = selectSingleNode(dbDataDOM, "//BLK_ACCOUNT_DETAILS[@ID=" + rowNum + "]");
          if (kanRecNode) {
              document.getElementById("BLK_ACCOUNT_DETAILS__CCY").value = getNodeText(selectSingleNode(kanRecNode, "ACC_CCY"));
              document.getElementById("BLK_ACCOUNT_DETAILS__DESC_ACC").value = getNodeText(selectSingleNode(kanRecNode, "ACC_DESC"));
              document.getElementById("BLK_ACCOUNT_DETAILS__ACCMSG").value = getNodeText(selectSingleNode(kanRecNode, "ACCMSG"));
			  fnDisableElement(document.getElementById("BLK_ACCOUNT_DETAILS__ACCMSG")); //Fix for  	18948123 
          }

          var accRecNode = selectNodes(dbDataDOM, "//BLK_SIGNATURE")[rowNum - 1];
          var signRecNode = selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=" + rowNum + "]");
          if (signRecNode) {
              acRecNum = rowNum
              document.getElementById("BLK_SIG_SPECIMEN_NO").value = 1;
              var signNode = selectSingleNode(signRecNode, "BLK_SIGNATURE[SPECIMAN_NO=1]");
              document.getElementById("BLK_FILETYPE").value = getNodeText(selectSingleNode(signNode, "FILE_TYPE"));
              document.getElementById("BLK_IMGTYPE").value = getNodeText(selectSingleNode(signNode, "IMG_TYPE"));
              document.getElementById("SIGNATUREIMG").src = "FCUBSSignatureServlet?X-CSRFTOKEN=" + csrfVal + "&fileName=" + getNodeText(selectSingleNode(signNode, "IMG_TYPE")) + "&actionType=READ";
              /*Multiple signature changes End*/
              setInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE"), 1);
              if (typeof (e) != 'undefined') {
                  //if (getRowIndex() >= 0) { // 12_0_3_RETRO_12_2_23653665 commented
				  if (getRowIndex(e) >= 0) { // 12_0_3_RETRO_12_2_23653665 added
                      // var brn = document.getElementsByName("BRANCH")[getRowIndex()-1].value;
                      /*Multiple signature changes Start*/
                      //setInnerText(document.getElementById("TotPageSV__BLK_SIGNATURE_DETAILS"), selectNodes(dbDataDOM, "//BLK_ACCOUNT_DETAILS[BRANCH='"+brn+"']/BLK_SIGNATURE_DETAILS/BLK_SIGNATURE").length);
                      setInnerText(document.getElementById("TotPageSV__BLK_SIGNATURE"), selectNodes(signRecNode, "BLK_SIGNATURE").length);
                      /*Multiple signature changes Ends*/
                      fnUpdateSEPgBtn("BLK_SIGNATURE");
                  }
              }
          }
          // Changes For Customer Signature Ends
      }

      function uncheckOtherChkBoxes(currRowNum) {
          var chkBoxes = document.getElementsByName("chkDeleteRow");
          for (var i = 0;i < chkBoxes.length;++i) {
              if (chkBoxes[i].parentNode.parentNode.rowIndex != currRowNum) {
                  chkBoxes[i].checked = false;
              }
          }
      }

      //  Changes For Customer Signature  Starts
      /*function fnMulipleEntryRow_onClick(e) {
            var e = window.event || e;
            var chkBoxEle = getEventSourceElement(e);
            var dbt = chkBoxEle.parentDBT;
            /*Multiple signature changes Start*/
      /*var rowNum;
            var trElement=chkBoxEle;
            while(trElement.tagName!="TR")
            {
              trElement=trElement.parentNode;
            } 
              rowNum=trElement.rowIndex;
              
            if(rowNum>=1) {
                rowNum=rowNum-1;
            }            
            showAccountDet(dbt, rowNum,e);
            uncheckOtherChkBoxes(rowNum);
            chkBoxEle.checked=true;
            /*Multiple signature changes End*/
      /* }
        
        var N_PREVIOUS = 1;
        var N_NEXT = 2;
        function Navigate(recNum) {   
            try{   
            var currpageno = Number(getInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE_DETAILS")));
            var totpageno  = getInnerText(document.getElementById("TotPageSV__BLK_SIGNATURE_DETAILS"));            
            var accRecNode = getAccDetRecord("BLK_ACCOUNT_DETAILS", acRecNum);
            if(accRecNode) {
                var CifSigId = document.getElementById("BLK_SIGNATURE_ID").value;
                /*Multiple signature changes Start*/
      /* var accSignNode=selectNodes(accRecNode,"//BLK_SIGNATURE");
                var recIndex=currpageno-1;
                //if(signRecNode) {
                  if(recNum == N_PREVIOUS) {
                       recIndex--;                    
                    } else if(recNum == N_NEXT) {
                        recIndex++;                        
                    }
                  if(accSignNode[recIndex]) {                                      
                    var specNo = parseInt(document.getElementById("BLK_SIG_SPECIMEN_NO").value);
                    var signNode = accSignNode[recIndex];
                    specNo= parseInt(getNodeText(selectSingleNode(signNode, "SPECIMAN_NO")));                   
                    document.getElementById("BLK_SIGNATURE_ID").value=getNodeText(selectSingleNode(signNode,"..//CIF_SIG_ID"));
                    document.getElementById("BLK_SIGN_NAME").value = getNodeText(selectSingleNode(signNode, "..//SIG_NAME"));
                    /*Multiple signature changes End*/
      //var signNode = selectSingleNode(dbDataDOM, "BLK_SIGNATURE_DEATILS[@ID=\""+specNo+"\"]\BLK_SIGNATURE");
      /*if(signNode) {
                        if(recNum == N_PREVIOUS) {                           
                            setInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE_DETAILS"), currpageno -1);
                        } else if(recNum == N_NEXT) {                            
                            setInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE_DETAILS"), currpageno +1);
                        }
                        document.getElementById("BLK_SIG_SPECIMEN_NO").value = specNo;
                        //document.getElementById("SIGNATUREIMG").src = "Images/Signature/"+getNodeText(selectSingleNode(signNode, "FILE_TYPE"));
                        //document.getElementById("SIGNATUREIMG").src = "\TempForward.jsp?action=FCUBSSignatureServlet&fileName="+getNodeText(selectSingleNode(signNode, "FILE_TYPE"))+"&actionType=READ";
                        //ArunT modified for image not displaying
                         document.getElementsByName("IMAGEDISPLAY")[0].src = "\TempForward.jsp?action=FCUBSSignatureServlet&fileName="+getNodeText(selectSingleNode(signNode, "FILE_TYPE"))+"&actionType=READ";
                        fnUpdateSEPgBtn("BLK_SIGNATURE_DETAILS");                        
                    } else {
                        if(recNum == N_PREVIOUS) {
                            if(signId != 1) {
                                signId -= 1;
                                signRecNode = selectSingleNode(accRecNode, "BLK_SIGNATURE_DETAILS[@ID=\""+signId+"\"]");
                            }
                        } else if(recNum == N_NEXT) {
                            signRecNode = getNextSibling(signRecNode);
                        }
                        if(signRecNode) {
                            document.getElementById("BLK_SIGNATURE_ID").value = getNodeText(selectSingleNode(signRecNode, "CIF_SIG_ID"));
                            document.getElementById("BLK_SIGN_SOLO_SUFFICIENT").checked = getNodeText(selectSingleNode(signRecNode, "SOLO_SUFFICIENT"))==1?true:false;
                            document.getElementById("BLK_SIGN_NAME").value = getNodeText(selectSingleNode(signNode, "..//SIG_NAME"));
                            if(recNum == N_PREVIOUS) {
                                signNode = selectNodes(signRecNode, "BLK_SIGNATURE")[selectNodes(signRecNode, "BLK_SIGNATURE").length-1];
                                setInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE_DETAILS"), currpageno -1);
                            } else if(recNum == N_NEXT) {
                                signNode = selectNodes(signRecNode, "BLK_SIGNATURE")[0];
                                setInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE_DETAILS"), currpageno +1);
                            }
                            if(signNode) {
                                specNo = getNodeText(selectSingleNode(signNode, "SPECIMAN_NO"));
                                document.getElementById("BLK_SPECIMEN_NO").value = specNo;
                                //document.getElementById("SIGNATUREIMG").src = "Images/Signature/"+getNodeText(selectSingleNode(signNode, "FILE_TYPE"));
                                //document.getElementById("SIGNATUREIMG").src = "\TempForward.jsp?action=FCUBSSignatureServlet&fileName="+getNodeText(selectSingleNode(signNode, "FILE_TYPE"))+"&actionType=READ";
                                
                                //ArunT modified for image not displaying
                                document.getElementsByName("IMAGEDISPLAY")[0].src= "\TempForward.jsp?action=FCUBSSignatureServlet&fileName="+getNodeText(selectSingleNode(signNode, "FILE_TYPE"))+"&actionType=READ";
                                fnUpdateSEPgBtn("BLK_SIGNATURE_DETAILS");                               
                            }
                        }
                    }
                }
            }   
            }catch(e){}
    } */

      function fnMulipleEntryRow_onClick(e) {

          var e = window.event || e;
		  //Fix for 20101106 starts
		  var srcElement = getEventSourceElement(e);
          var dbt = "";
          var currPg = "";
          var pgSize = "";
          if(srcElement.getAttribute("name") == "chkDeleteRow") {
              dbt = srcElement.getAttribute("parentDBT");
          } else {
              dbt = srcElement.getAttribute("DBT");
          }
          /*Multiple signature changes Start*/
          var rowNum;
          var trElement = srcElement;
          while (trElement.tagName != "TR") {
              trElement = trElement.parentNode;
          }
          currPg = Number(getInnerText(document.getElementById("CurrPage__" + dbt)));
          pgSize = getPgSize(dbt);
          rowNum = (currPg - 1) * pgSize + trElement.rowIndex;          
          if (rowNum >= 1) {
              rowNum = rowNum - 1;
          }

          showAccountDet(dbt, rowNum, e);
          uncheckOtherChkBoxes(rowNum);
          if (rowNum ==  1) {
              document.getElementById("chkDeleteRow").checked = true;
          } else {
              document.getElementById("chkDeleteRow"+(rowNum-1)).checked = true;
          }
	      //Fix for 20101106 ends
          /*Multiple signature changes End*/
      }

      var N_PREVIOUS = 1;
      var N_NEXT = 2;

      function NavigateImage(recNum) { //Fix for 19954276 - renamed function name to NavigateImage
          try {

              // Changes For Customer Signature Starts
              var currpageno = Number(getInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE")));
              var totpageno = Number(getInnerText(document.getElementById("TotPageSV__BLK_SIGNATURE")));
              var accRecNode = getAccDetRecord("//BLK_SIGNATURE_DETAILS", acRecNum);
              if (accRecNode) {
                  var CifSigId = document.getElementById("BLK_SIGNATURE_ID").value;
                  /*Multiple signature changes Start*/
                  var accSignNode = selectNodes(accRecNode, "BLK_SIGNATURE");
                  var recIndex = currpageno - 1;
                  //if(signRecNode) {
                  if (recNum == N_PREVIOUS) {
                      recIndex--;
                  }
                  else if (recNum == N_NEXT) {
                      recIndex++;
                  }
                  if (accSignNode[recIndex]) {
                      var specNo = parseInt(document.getElementById("BLK_SIG_SPECIMEN_NO").value);
                      var signNode = accSignNode[recIndex];
                      specNo = parseInt(getNodeText(selectSingleNode(signNode, "SPECIMAN_NO")));
                      //document.getElementById("BLK_SIGNATURE_ID").value = getNodeText(selectSingleNode(signNode, "..//SIGN_ID"));//9NT1606_12_2_RETRO_12_0_3_25031091 commented
                      //document.getElementById("BLK_SIGN_NAME").value = getNodeText(selectSingleNode(signNode, "..//SIG_NAME"));//9NT1606_12_2_RETRO_12_0_3_25031091 commented
                      /*Multiple signature changes End*/
                      //var signNode = selectSingleNode(dbDataDOM, "BLK_SIGNATURE_DEATILS[@ID=\""+specNo+"\"]\BLK_SIGNATURE");
                      if (signNode) {
                          if (recNum == N_PREVIOUS) {
                              setInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE"), currpageno - 1);
                          }
                          else if (recNum == N_NEXT) {
                              setInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE"), currpageno + 1);
                          }
                          document.getElementById("BLK_SIG_SPECIMEN_NO").value = specNo;
						  //Fix for 17310360 start
						  document.getElementById("BLK_FILETYPE").value = getNodeText(selectSingleNode(signNode, "FILE_TYPE"));
                          document.getElementById("BLK_IMGTYPE").value = getNodeText(selectSingleNode(signNode, "IMG_TYPE")); 
						  //Fix for 17310360 end
                          //document.getElementById("SIGNATUREIMG").src = "Images/Signature/"+getNodeText(selectSingleNode(signNode, "FILE_TYPE"));
                         // 25081813 starts
                         // document.getElementById("SIGNATUREIMG").src = "\FCUBSSignatureServlet?X-CSRFTOKEN=" + csrfVal + "&fileName=" + getNodeText(selectSingleNode(signNode, "FILE_TYPE")) + "&actionType=READ";
                          document.getElementById("SIGNATUREIMG").src = "\TempForward.jsp?action=FCUBSSignatureServlet?fileName=" + getNodeText(selectSingleNode(signNode, "FILE_TYPE")) + "&actionType=READ";
                          // 25081813 ends
                          fnUpdateSEPgBtn("BLK_SIGNATURE");
                      }
                      else {
                          if (recNum == N_PREVIOUS) {
                              if (signId != 1) {
                                  signId -= 1;
                                  signRecNode = selectSingleNode(accRecNode, "BLK_SIGNATURE_DETAILS[@ID=\"" + signId + "\"]");
                              }
                          }
                          else if (recNum == N_NEXT) {
                              signRecNode = getNextSibling(signRecNode);
                          }
                          if (signRecNode) {
                              //document.getElementById("BLK_CUST_ID").value = getNodeText(selectSingleNode(signRecNode, "CUST_ID"));
                              //document.getElementById("BLK_SIGNATURE_ID").value = getNodeText(selectSingleNode(signRecNode, "SIGN_ID")); //9NT1606_12_2_RETRO_12_0_3_25031091 changes
                              //document.getElementById("BLK_SIGN_SOLO_SUFFICIENT").checked = getNodeText(selectSingleNode(signRecNode, "SOLO_SUFFICIENT")) == 1 ? true : false;//9NT1606_12_2_RETRO_12_0_3_25031091 changes
                              //document.getElementById("BLK_SIGN_NAME").value = getNodeText(selectSingleNode(signNode, "..//SIG_NAME")); //9NT1606_12_2_RETRO_12_0_3_25031091 changes 
                              if (recNum == N_PREVIOUS) {
                                  signNode = selectNodes(signRecNode, "BLK_SIGNATURE")[selectNodes(signRecNode, "BLK_SIGNATURE").length - 1];
                                  setInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE"), currpageno - 1);
                              }
                              else if (recNum == N_NEXT) {
                                  signNode = selectNodes(signRecNode, "BLK_SIGNATURE")[0];
                                  setInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE"), currpageno + 1);
                              }
                              if (signNode) {
                                  specNo = getNodeText(selectSingleNode(signNode, "SPECIMAN_NO"));
                                  document.getElementById("BLK_SIG_SPECIMEN_NO").value = specNo;
								   //Fix for 17310360 start
								    document.getElementById("BLK_FILETYPE").value = getNodeText(selectSingleNode(signNode, "FILE_TYPE"));
									document.getElementById("BLK_IMGTYPE").value = getNodeText(selectSingleNode(signNode, "IMG_TYPE"));
								    //Fix for 17310360 end
                                  //document.getElementById("SIGNATUREIMG").src = "Images/Signature/"+getNodeText(selectSingleNode(signNode, "FILE_TYPE"));
                                  document.getElementById("SIGNATUREIMG").src = "\FCUBSSignatureServlet?X-CSRFTOKEN=" + csrfVal + "&fileName=" + getNodeText(selectSingleNode(signNode, "FILE_TYPE")) + "&actionType=READ";
                                  fnUpdateSEPgBtn("BLK_SIGNATURE");
                              }
                          }
                      }
                  }
              }
          }
          catch (e) {
          }
      }
      // Changes For Customer Signature Ends                  
      function getIEVersionNumber() {//ie11 changes starts

    var ua = (navigator.userAgent).toUpperCase();
    var MSIEOffset = ua.indexOf("MSIE ");                    
    if (MSIEOffset == -1) {
        if(ua.indexOf("TRIDENT") != -1 && ua.indexOf("RV:")!= -1){
        var rv=ua.indexOf("RV:");
        return parseFloat(ua.substring(rv+3 ,ua.indexOf(")", rv)));
        }
    } else {
        return parseFloat(ua.substring(MSIEOffset + 5, ua.indexOf(";", MSIEOffset)));
    }
}//ie11 changes ends
      // Changes For Customer Signature Starts 
      /* function showDetails(){
            document.getElementById("DIVScrContainer").innerHTML = mainWin.getHTMLForSignView();
                setinit();
                fnBuildMultipleEntryArray();
                resetIndex();
                //fnCalcCustSignViewHgt(); 
                var parentNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/REC");
                if(typeof(parentNode) != "undefined" && parentNode != null){
                    if (!fnProcessResponse()) {
                        gAction = "";
                        return false;
                    }
                    showAccountDet("BLK_ACCOUNT_DETAILS", 1);
                    setInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE_DETAILS"), 1);
                    var signode = selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS");
                    /*Multiple signature changes Start*/
      /*setInnerText(document.getElementById("TotPageSV__BLK_SIGNATURE_DETAILS"), selectNodes(dbDataDOM, "//BLK_SIGNATURE").length); //change
                    /*Multiple signature changes End*/
      /*fnUpdateSEPgBtn("BLK_SIGNATURE_DETAILS");                    
                   
                } 
                fnCalcCustSignViewHgt();
                /*Multiple signature changes Start*/
      /* if(getInnerText(document.getElementById("TBLPageTAB_HEADER"))=="undefined") {
                   setInnerText(document.getElementById("TBLPageTAB_HEADER"), "");
                }
                /*Multiple signature changes End*/
      /* document.getElementById("BTN_EXIT_IMG").focus(); 
                
            }*/
      function showDetails() {
          document.getElementById("DIVScrContainer").innerHTML = mainWin.getHTMLForSignView();
          setinit();
          fnBuildMultipleEntryArray();
          resetIndex();
          //fnCalcCustSignViewHgt(); 
          var parentNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/REC");
          if (typeof (parentNode) != "undefined" && parentNode != null) {
              if (!fnProcessResponse()) {
                  gAction = "";
                  return false;
              }
              showAccountDet("BLK_ACCOUNT_DETAILS", 1);
              setInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE"), 1);
              var signRecNode = selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=" + 1 + "]");
              //var signode = selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS");
              /*Multiple signature changes Start*/
              setInnerText(document.getElementById("TotPageSV__BLK_SIGNATURE"), selectNodes(signRecNode, "BLK_SIGNATURE").length);//change
              /*Multiple signature changes End*/
              fnUpdateSEPgBtn("BLK_SIGNATURE");

          }
          fnCalcCustSignViewHgt();
          /*Multiple signature changes Start*/
          if (getInnerText(document.getElementById("TBLPageTAB_HEADER")) == "undefined") {
              setInnerText(document.getElementById("TBLPageTAB_HEADER"), "");
          }
          document.getElementById("canvas").style.display='none';
          /*Multiple signature changes End*/
          document.getElementById("BTN_EXIT_IMG").focus();

      }
      // Changes For Customer Signature Ends 
      function fnCalcCustSignViewHgt() {
          var containerDIV = "ChildWin";
          parent.document.getElementById("ifrSubScreen").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);
          var scrWidth = document.getElementById("DIVWNDContainer").offsetWidth;
          var scrHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight);

          if (scrWidth > mainWin.x)
              scrWidth = mainWin.x - 8;
          if (scrHeight > parseInt(mainWin.document.getElementById("dashboard").offsetHeight)) //Fix for 19719067 - replaced vtab with dashboard
              scrHeight = parseInt(mainWin.document.getElementById("dashboard").offsetHeight); //Fix for 19719067 - replaced vtab with dashboard
          /* ADDED TO MANIPULATE THE SCREEN HEIGHT WHEN THE SUBSCREEN HEIGHT IS GREATER THAN OR EQUAL TO THE VTAB HEIGHT */
          if (containerDIV == "ChildWin" && scrHeight + document.getElementById("WNDtitlebar").offsetHeight >= parseInt(mainWin.document.getElementById("dashboard").offsetHeight)) { //Fix for 19719067 - replaced vtab with dashboard
              scrHeight = scrHeight - document.getElementById("WNDtitlebar").offsetHeight;
          }
          /*Added to adjust the screen height in case of IE7*/
          //parent.document.getElementById(containerDIV).style.width = scrWidth + "px";
          //parent.document.getElementById(containerDIV).children[0].style.width = scrWidth + "px";
          parent.document.getElementById(containerDIV).style.width = document.getElementById("DIVScrContainer").offsetWidth + "px";
          parent.document.getElementById(containerDIV).children[0].style.width = document.getElementById("DIVScrContainer").offsetWidth + "px";

          parent.document.getElementById(containerDIV).style.height = scrHeight + "px";
          parent.document.getElementById(containerDIV).children[0].style.height = scrHeight + "px";
          /*Added to adjust the screen height in case of IE7*/
          document.getElementById("DIVWNDContainer").style.width = parent.document.getElementById(containerDIV).offsetWidth + "px";

          //document.getElementById("ResTree").style.width  = scrWidth+"px";
          //document.getElementById("ResTree").style.height  = scrHeight+"px";
          var l_DivFooter = document.getElementById("DIVFooter").offsetHeight;
          var l_DivTmpHgt = parseInt(scrHeight) - parseInt(l_DivFooter) - document.getElementById("WNDtitlebar").offsetHeight;
          document.getElementById("DIVMainTmp").style.height = parseInt(l_DivTmpHgt) + 'px';
          //document.getElementById("DIVMainTmp").style.width = document.getElementById("DIVScrContainer").offsetWidth - 2 + "px";
          if (containerDIV == "ChildWin") {
              if (parent.seqNo) {
                  containerDIV = parent.seqNo;
                  parent.parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
              }
              /*else if (typeof(unmaskTitle) == "undefined") {
                        parent.document.getElementById(containerDIV).style.top = document.getElementById("WNDtitlebar").offsetHeight + "px";
                    }*/
              var mainScrHeight = parseInt(mainWin.document.getElementById("dashboard").offsetHeight); //Fix for 19719067 - replaced vtab with dashboard
              parent.parent.document.getElementById(containerDIV).style.height = mainScrHeight + "px";
              parent.parent.document.getElementById(containerDIV).children[0].style.height = mainScrHeight + "px";
              parent.parent.document.getElementById(containerDIV).style.width = mainWin.x + "px";
              parent.parent.document.getElementById(containerDIV).children[0].style.width = mainWin.x + "px";
              parent.document.getElementById("DIVScrContainer").style.height = mainScrHeight - document.getElementById("WNDtitlebar").offsetHeight - 4 + "px";
              parent.document.getElementById("DIVScrContainer").style.width = mainWin.x + "px";
              /*Added to adjust the screen height in case of IE7*/
              parent.document.getElementById("DIVWNDContainer").style.width = mainWin.x + "px";
              parent.parent.document.getElementById(containerDIV).style.left = "4px";
          }
          else {
              parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
              parent.document.getElementById(containerDIV).style.left = mainWin.x - (document.getElementById("DIVWNDContainer").offsetWidth) + "px";
          }
          parent.mask();
      }
      // Changes For Customer Signature Starts     
      function fnOkCustSignView() {
         //12.0.2_Signature_Verification STARTS
          //  sigView = true;
          if (parent.screenType == 'WB') {
           parent.fnSetSignOKDetails();
          }
          else {
              parent.sigView = true;
          }
          //12.0.2_Signature_Verification ends
          var containerDIV = "ChildWin";
          if (containerDIV == "ChildWin") {
              if (parent.seqNo) {
                  containerDIV = parent.seqNo;
                  parent.parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
              }
              parent.parent.document.getElementById(parentScrID).style.width = launcherDIVWidth;
              parent.parent.document.getElementById(parentScrID).children[0].style.width = launcherIFWidth;
              parent.parent.document.getElementById(parentScrID).style.height = launcherDIVHeight;
              parent.parent.document.getElementById(parentScrID).children[0].style.height = launcherIFHeight;
              parent.parent.document.getElementById(parentScrID).style.left = launcherLeft;
              parent.document.getElementById("DIVScrContainer").style.width = launcherResTreeWidth;
              parent.document.getElementById("DIVScrContainer").style.height = launcherResTreeHeight;
              parent.document.getElementById("DIVWNDContainer").style.width = launcherHeaderWidth;
              parent.unmask();
              var childDivObj = parent.document.getElementById("ChildWin");
              parent.hotkeySrcElem.focus();
              childDivObj.getElementsByTagName("IFRAME")[0].src = "";
              parent.document.getElementById("Div_ChildWin").removeChild(childDivObj);
          }
      }
      // Changes For Customer Signature Ends

      function fnExitCustSignView() {
          parent.sigView = false;//12.0.2_Signature_Verification
          if (parent.screenType == 'WB') {
              parent.fnSetSignExitDetails();  
          }
          //12.0.2_Signature_Verification ends
          var containerDIV = "ChildWin";
          if (containerDIV == "ChildWin") {
              if (parent.seqNo) {
                  containerDIV = parent.seqNo;
                  parent.parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
              }
              parent.parent.document.getElementById(parentScrID).style.width = launcherDIVWidth;
              parent.parent.document.getElementById(parentScrID).children[0].style.width = launcherIFWidth;
              parent.parent.document.getElementById(parentScrID).style.height = launcherDIVHeight;
              parent.parent.document.getElementById(parentScrID).children[0].style.height = launcherIFHeight;
              parent.parent.document.getElementById(parentScrID).style.left = launcherLeft;
              parent.document.getElementById("DIVScrContainer").style.width = launcherResTreeWidth;
              parent.document.getElementById("DIVScrContainer").style.height = launcherResTreeHeight;
              parent.document.getElementById("DIVWNDContainer").style.width = launcherHeaderWidth;
              parent.unmask();
              var childDivObj = parent.document.getElementById("ChildWin");
              try{parent.hotkeySrcElem.focus();}catch(e){} //Fix for 19246681
              childDivObj.getElementsByTagName("IFRAME")[0].src = "";
              parent.document.getElementById("Div_ChildWin").removeChild(childDivObj);
          }
      }
      
      /* Added for Flipping and rotating image Starts */
      function enlargeImage(imgObjName) {
         getUploadImageObj();
          if (imgObjName == "SIGNATUREIMG") {
              objCanvas = objCanvasSig;
          }
          else if (imgObjName == "PHOTOIMG") {
              objCanvas = objCanvasPhoto;
          }
          
          if (navigator.userAgent.indexOf("Opera") !=  - 1) {
              alert(mainWin.getItemDesc("LBL_NSUPPORT"))
              return;
          }
          //if (navigator.userAgent.indexOf("MSIE ") ==  - 1) {
		  //9NT1606_12_4_RETRO_12_0_3_26780544 changes Commented
          //if(navigator.userAgent.indexOf("MSIE ") == -1 && (navigator.userAgent.indexOf("Trident") == -1 && navigator.userAgent.indexOf("rv") == -1)){//ie11 changes
           objCanvas.className = "hidden";
           objCanvas.style.display='none';
           document.getElementById(imgObjName).className = "IMGBUTTON";
           document.getElementById(imgObjName).style.display='block';
           uploadedImgObj.style.display='block';
          //} //9NT1606_12_4_RETRO_12_0_3_26780544 changes Commented
          //if (parseInt(document.getElementById(imgObjName).style.height) < 800) { //9NT1606_12_4_RETRO_12_0_3_26230318 commented
		  if (parseInt(uploadedImgObj.height) < 800) { //9NT1606_12_4_RETRO_12_0_3_26230318 changes 
              uploadedImgObj.height = uploadedImgObj.height + 100;
              uploadedImgObj.width= uploadedImgObj.width+100;
              document.getElementById(imgObjName).style.width=  parseInt(document.getElementById(imgObjName).style.width)+100+ "px";
              document.getElementById(imgObjName).style.height = parseInt(document.getElementById(imgObjName).style.height) + 100+ "px";
              document.getElementById("decSize").disabled = false;
          }
          else {
              document.getElementById("incSize").disabled = true;
          }
      }

      function dropImage(imgObjName) {
        getUploadImageObj();
          if (imgObjName == "SIGNATUREIMG") {
              objCanvas = objCanvasSig;
          }
          else if (imgObjName == "PHOTOIMG") {
              objCanvas = objCanvasPhoto;
          }
          if (navigator.userAgent.indexOf("Opera") !=  - 1) {
              alert(mainWin.getItemDesc("LBL_NSUPPORT"))
              return;
          }
		  //9NT1606_12_4_RETRO_12_0_3_26780544 changes Commented
          //if (navigator.userAgent.indexOf("MSIE ") == -1 && (navigator.userAgent.indexOf("Trident") == -1 && navigator.userAgent.indexOf("rv") == -1)) {//ie11 changes
           objCanvas.className = "hidden";
           objCanvas.style.display='none';
           document.getElementById(imgObjName).className = "IMGBUTTON";
           document.getElementById(imgObjName).style.display='block';
           uploadedImgObj.style.display='block';
          //} //9NT1606_12_4_RETRO_12_0_3_26780544 changes Commented
          //if (parseInt(document.getElementById(imgObjName).style.height) > 100) {  //9NT1606_12_4_RETRO_12_0_3_26230318 commented  
		      if (parseInt(uploadedImgObj.height) > 100) { //9NT1606_12_4_RETRO_12_0_3_26230318 changes  
              uploadedImgObj.height = uploadedImgObj.height - 100;
              uploadedImgObj.width= uploadedImgObj.width-100;
              document.getElementById(imgObjName).style.width = parseInt(document.getElementById(imgObjName).style.width) - 100 + "px";
              document.getElementById(imgObjName).style.height = parseInt(document.getElementById(imgObjName).style.height) - 100 + "px";
              document.getElementById("incSize").disabled = false;
          }
          else {
              document.getElementById("decSize").disabled = true;
          }
      }
      
      
    function setinit() {
        angle = 0;
        deg2rad = Math.PI / 180;
        hz = 1;
        vt = 1;
		//9NT1606_12_4_RETRO_12_0_3_26780544 changes Commented
        //if (navigator.userAgent.indexOf("MSIE ") == -1 && (navigator.userAgent.indexOf("Trident") == -1 && navigator.userAgent.indexOf("rv") == -1)) {//ie11 changes
            //ArunT modified for image not displaying---Fix for 19203092
            document.getElementById("IMAGEDIV").innerHTML = "<LABEL class=LABELNormal for=\"\"></LABEL><iframe onload = 'disableClick();' class=IMGButton id=SIGNATUREIMG alt=\"\" src=\"\" style=\"height:800px;width:750px;\" name=\"IMAGEDISPLAY\" REQUIRED=\"\" DTYPE=\"\" DBC=\"\" DBT=\"\" LABEL_VALUE=\"\" SIZE=\"\"></iframe><canvas id=\"canvas\" style=\"overflow:auto;height:800px;width:735px;display:none \"></canvas>";
			myIFrame = document.getElementById('SIGNATUREIMG');
            doc = myIFrame.contentDocument || myIFrame.contentWindow.document;
            objCanvasSig = doc.getElementById('canvas');
            if (!objCanvasSig || !objCanvasSig.getContext) {
                objCanvasSig.parentNode.removeChild(canvas);
            }
            img = document.getElementById('SIGNATUREIMG');
            imgh = document.getElementById('SIGNATUREIMG').height;
		//9NT1606_12_4_RETRO_12_0_3_26780544 changes Commented
        /*} else {
            //ArunT modified for image not displaying---Fix for 19203092
            document.getElementById("IMAGEDIV").innerHTML = "<LABEL class=LABELNormal for=\"\"></LABEL><iframe onload = 'disableClick();' class=IMGButton id=SIGNATUREIMG alt=\"\" src=\"\" style=\"height:800px;width:750px;\" name=IMAGEDISPLAY REQUIRED=\"\" DTYPE=\"\" DBC=\"\" DBT=\"\" LABEL_VALUE=\"\" SIZE=\"\"> </iframe><canvas id=\"canvas\" style=\"overflow:auto;height:800px;width:735px;display:none \"></canvas>";
        }*/
    }
	
	//Fix for 19155160
    function disableClick(){
     document.getElementById("SIGNATUREIMG").contentWindow.document.oncontextmenu = function(){return false;};;  
    }  

      function handleScrObj(scrObj, e) {
          var e = window.event || e;
          if (e.keyCode == 9 && !e.shiftKey) {
              document.getElementById("WNDbuttons").focus();
              preventpropagate(e);
              return false;
          }
          if (e.keyCode == 32 || e.keyCode == 13) {
              if (srcElement.tagName == "A")
                  fireHTMLEvent(srcElement, "onclick");
              preventpropagate(e);
              return false;
          }
          return true;
      }
      /* Added for Flipping and rotating image Ends */
      function fnUpdateSEPgBtn(pstrBlockID) {
          try {
              var prevBtn = document.getElementById("BTN_PREV_" + pstrBlockID);
              var nextBtn = document.getElementById("BTN_NEXT_" + pstrBlockID);
              var curPage = Number(getInnerText(document.getElementById("CurrPageSV__" + pstrBlockID)));
              var totPage = Number(getInnerText(document.getElementById("TotPageSV__" + pstrBlockID)));

              if (curPage == totPage && curPage != 1) {
                  prevBtn.className = "BTNicon2";
                  prevBtn.disabled = false;
                  nextBtn.className = "BTNicon2D";
                  nextBtn.disabled = true;
                  return;
              }
              else if (totPage > 1 && curPage == 1) {
                  prevBtn.className = "BTNicon2D";
                  prevBtn.disabled = true;
                  nextBtn.className = "BTNicon2";
                  nextBtn.disabled = false;
              }
              else if (totPage > 1 && curPage > 1) {
                  prevBtn.className = "BTNicon2";
                  prevBtn.disabled = false;
                  nextBtn.className = "BTNicon2";
                  nextBtn.disabled = false;
              }
              else {
                  prevBtn.className = "BTNicon2D";
                  prevBtn.disabled = true;
                  nextBtn.className = "BTNicon2D";
                  nextBtn.disabled = true;
              }
          }
          catch (e) {
          }
      }

 //Fix for 20101106 starts
	  function fnPostNavigate_BLK_SIGNATURE_DETAILS_KERNEL(event) {
          var evnt = window.event || event;
          showAccountDet("BLK_SIGNATURE_DETAILS", dbIndexArray["BLK_SIGNATURE_DETAILS"], evnt);
      }
	  //Fix for 20101106 ends
	function fnShowAllImg(){
		if (typeof(parent.seqNo) != "undefined") {
			parent.parentWinParams=new Object();  
			parent.parentWinParams.custno = document.getElementById('BLK_ACCOUNT_DETAILS__CUST_ID').value;
			parent.parentWinParams.brn = document.getElementById("BLK_ACCOUNT_DETAILS__BRANCH").value;
			parent.parentWinParams.acc = document.getElementById("BLK_ACCOUNT_DETAILS__CUST_ACC").value;
			parent.parentWinParams.adesc = document.getElementById("BLK_ACCOUNT_DETAILS__DESC_ACC").value;
			parent.parentWinParams.ccy = document.getElementById("BLK_ACCOUNT_DETAILS__CCY").value;
			parent.parentWinParams.sigid = '';
			for(i=0; i < document.getElementsByName('SIGN_ID').length; i++){
				if(i!=document.getElementsByName('SIGN_ID').length-1)
					parent.parentWinParams.sigid += document.getElementsByName('SIGN_ID')[i].value + "~";
				else
					parent.parentWinParams.sigid += document.getElementsByName('SIGN_ID')[i].value;
			}
			parent.parentWinParams.imageType = parent.imageType;
			mainWin.dispHref1("SVDCONVW", parent.seqNo);
		} else {
			parent.parent.parentWinParams=new Object();  
			parent.parent.parentWinParams.custno = document.getElementById('BLK_ACCOUNT_DETAILS__CUST_ID').value;
			parent.parent.parentWinParams.brn = document.getElementById("BLK_ACCOUNT_DETAILS__BRANCH").value;
			parent.parent.parentWinParams.acc = document.getElementById("BLK_ACCOUNT_DETAILS__CUST_ACC").value;
			parent.parent.parentWinParams.adesc = document.getElementById("BLK_ACCOUNT_DETAILS__DESC_ACC").value;
			parent.parent.parentWinParams.ccy = document.getElementById("BLK_ACCOUNT_DETAILS__CCY").value;
			parent.parent.parentWinParams.sigid = '';
			for(i=0; i < document.getElementsByName('SIGN_ID').length; i++){
				if(i!=document.getElementsByName('SIGN_ID').length-1)
					parent.parent.parentWinParams.sigid += document.getElementsByName('SIGN_ID')[i].value + "~";
				else
					parent.parent.parentWinParams.sigid += document.getElementsByName('SIGN_ID')[i].value;
			}
			parent.parent.parentWinParams.imageType = parent.parent.imageType;
			mainWin.dispHref1("SVDCONVW", parent.parent.seqNo);
		}
      }

	function setCanvas(){
        myIFrame = document.getElementById('SIGNATUREIMG');
        doc = myIFrame.contentDocument || myIFrame.contentWindow.document;
        var canvas = document.createElement("canvas");
        canvas.id="canvas";
        canvas.style.overflow = "auto";
        canvas.style.display = "none";
        doc.body.appendChild(canvas);
    }
    </script>
    </head>    
    <body  class="BODYForm" onload="showDetails()" oncontextmenu="return false;">
        <div class="WNDcontainer" id="DIVWNDContainer">
            <DIV class=WNDtitlebar id="WNDtitlebar" onmousedown="startDrag('ChildWin', event)">
                <div class="WNDtitle" id="wndtitle">
                    <B class="BTNicon">
                        <span class="ICOflexcube"></span>
                    </B>
                    <h1 class="WNDtitletxt"><%=StringEscapeUtils.escapeHTML(custSignView)%>&nbsp;</h1>
                    <div class="WNDbuttons">
                        <a id="WNDbuttons" class="WNDcls" href="#" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="<%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%>" onclick="fnExitCustSignView()" onkeydown="return fnHandleScrBtn(event)">
                        <span class="LBLinv"><%=StringEscapeUtils.escapeHTML((String)itemDescMap.get("LBL_CLOSE"))%></span>
                        </a>
                    </div>
                </div>
            </DIV>
            <div class="WNDcontent mediumwin" id="DIVScrContainer"> 
        </div>
        </div>
        </div>
    </div>
  </body>  
</html>
