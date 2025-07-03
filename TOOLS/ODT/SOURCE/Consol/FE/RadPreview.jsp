<!--
  **
  **
  ** File Name  : RadPreview.js
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
  
  SFR Number         :  
  Changed By         :  
  Change Description :  

-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<%@page import="com.ofss.odt.util.ODTUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
String js_parser ="";
boolean bowserVer  = false; 
String userAgent = request.getHeader("USER-AGENT").toUpperCase();
if(userAgent.contains("MSIE") || (userAgent.contains("TRIDENT") && userAgent.contains("RV"))) {//ie11 changes
    js_parser = "BROWSER_IE.js";
    bowserVer = true;
} else {
    js_parser = "BROWSER_NonIE.js";
}

String function_id = ODTUtils.stripXSS(request.getParameter("function_id"));
String scrName = ODTUtils.stripXSS(request.getParameter("ScreenName"));
String thirdChar = ODTUtils.stripXSS(function_id.substring(2,3));

%>

<html lang="en" >

<HEAD> 
 <title><%=ODTUtils.stripXSS(request.getParameter("title"))%></title>
 <%if(bowserVer){%>
<link rel="stylesheet" type="text/css" href="Theme/ExtBROWSER_IE.css" ></link>
<%}else{%>
<link rel="stylesheet" type="text/css" href="Theme/ExtBROWSER_FF.css" ></link>
<%}%>
<link rel="stylesheet" type="text/css" href="Theme/Exten.css" ></link>
<link rel="stylesheet" type="text/css" href="Theme/ExtLTR.css" ></link>
<link rel="stylesheet" type="text/css" href="Theme/dash.css" ></link>
<link rel="stylesheet" type="text/css" href="Theme/ExtFlexblue.css" ></link>
<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
<link rel="stylesheet" type="text/css" href="Theme/ODTExten.css" ></link>
<link rel="stylesheet" type="text/css" href="Theme/ExtLTR.css" ></link>
<link rel="stylesheet" type="text/css" href="Theme/dash.css" ></link> 

<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
<script type="text/javascript" src="Script/JS/RadPreview.js"></script>     
<script type="text/javascript" src="Script/JS/ExtTabContent.js"></script> 
<script type="text/javascript" src="Script/JS/RadUtil.js"></script>      
<SCRIPT>

       var multipleEntryIDs = new Array();
       var gInpDateFormat = "dd-MM-yyyy";     
	   var screenType = parent.parent.previewscreenType;
	   var tempWidth = parent.document.getElementById("DIVWNDContainer").style.width; 
	   var tempHeight = parent.document.getElementById("DIVWNDContainer").style.height; 
	   var scrnName='<%=scrName%>';
	   var functionId='<%=function_id%>';
	   var thirdChar= '<%=thirdChar%>';
       var containerDIV = "ChildWin";
	   var onceAuthObj;
	   tempWidth = tempWidth.substring(0,tempWidth.indexOf('px')); 
	   tempHeight = tempHeight.substring(0,tempHeight.indexOf('px'));     
       var mainWin = window;
        var xmlddd = parent.parent.uixmlPreview;
		
       function ShowPreview(xslName)
       {
			
			  var html ="";             
              var xmlData=parent.parent.uixmlPreview;
			  var btn_type='1';
              var tmpXmlDoc ;
              tmpXmlDoc= xmlData;
              if(xslName == 'Templates/ExtXSL/ExtSummary.xsl')
              {
                    var pos = 'absolute';
                    var detailScrNode = selectSingleNode(tmpXmlDoc,"//FORM/SCREEN[@MAIN_WIN='Y']");
                    if(detailScrNode)
					{
                        pos = detailScrNode.getAttribute("POSITION");
                    }
					else
					{
                            if(selectSingleNode(tmpXmlDoc,("//FORM/SUMMARY")).getAttribute("POSITION"))
                            {
                                pos = selectSingleNode(tmpXmlDoc,("//FORM/SUMMARY")).getAttribute("POSITION");
                            }
                    }
                    if(pos == 'template')
					{
                        xslName = 'Templates/ExtXSL/ExtSummary.xsl';
                    }
              }
                    
            var params = new Array();
            params["screen"]    = '<%=scrName%>';
            params["imgPath"]         = '/Images/ExtFlexblue';                                        
            params["uiXML"]           = '<%=function_id%>';
            params["displaySize"]     = '800';
            params["exit"]     = 'Exit';
            params["cancel"]       = 'cancel';   
            params["fetchSize"]       = '5';  			
            params["thirdChar"]       = '<%=thirdChar%>';
            params["XslLabels"] ='@@LBL_ADVANCED~~Advanced Search@@LBL_RESET~~Reset@@LBL_QRY_QUERY~~Query@@LBL_REFRESH~~Refresh@@LBL_RESULT~~Result@@LBL_MAKERID~~Maker Id@@LBL_CHECKER_ID~~Checker Id@@LBL_MAKER_DT_STAMP~~Maker Date Stamp@@LBL_CHECKER_DT_STAMP~~Checker Date Stamp@@LBL_RECORD_STAT~~Record Status@@LBL_AUTHORISATION_STATUS~~Authorization Status@@LBL_A~~A@@LBL_SUMMARY_U~~U@@LBL_UN_AUTH_FLG~~Unauthorized@@LBL_O~~O@@LBL_OPEN~~Open@@LBL_C~~C@@LBL_CLOSED~~Closed@@LBL_EXIT~~Exit@@LBL_OK~~Ok@@LBL_CANCEL~~Cancel@@LBL_FIELDS~~Fields@@LBL_OPERATOR~~Operator@@LBL_VALUE~~Value @@LBL_AND~~And@@LBL_CLEAR_QUERY~~Clear Query@@LBL_ORDER_BY~~Order By@@LBL_ASCENDING~~Ascending@@LBL_DESCENDING~~Descending@@LBL_ACCEPT~~Accept@@LBL_TO~~To@@LBL_OR~~Or@@LBL_SEARCH~~Search@@LBL_RECORDS_PER_PAGE~~Records per page@@LBL_GOTO_PAGE~~Go to Page@@LBL_OF~~of@@LBL_AUTHORIZED~~Authorized @@LBL_INPUT_BY~~Input By@@LBL_AUTH_BY~~Authorized By@@LBL_DATE_TIME~~Date Time@@LBL_MOD_NO~~Modification Number@@LBL_OPEN~~Open@@LBL_CONTRACT_STATUS~~Contract Status@@LBL_PAYMENT_STATUS~~Payment Status@@LBL_COLLECTION_STATUS~~Collection Status@@LBL_DEAL_STATUS~~Deal Status@@LBL_PROCESS_STATUS~~Process Status@@LBL_REVERSAL~~Reversal@@LBL_REMARKS~~Remarks@@LBL_AUDIT~~Audit@@LBL_PRIORITY_AUDIT~~PRIORITY@@LBL_HIGH~~HIGH@@LBL_NORMAL~~NORMAL@@LBL_SHOWERR~~ERROR@@LBL_REMARKS~~Remarks@@LBL_GETPRIORITY~~Priority@@LBL_SUM_LOCK~~Lock@@LBL_CHECKBOX_YES~~YES@@LBL_CHECKBOX_NO~~NO@@LBL_INFRA_MANDATORY~~Mandatory@@LBL_NOSCRIPT_LABEL~~Script Label@@LBL_SUMMARY~~undefined@@LBL_EXPAND_GROUP~~undefined@@LBL_LIST_OF_VALUES~~List Of Values@@LBL_INFRA_PREVIOUS~~Previous@@LBL_NEXT~~Next@@LBL_FIRST~~First@@LBL_LAST~~Last@@LBL_ADDROW~~Add Row@@LBL_DELETEROW~~Delete Row@@LBL_SINGLE_REC_VIEW~~Single view@@LBL_LOCK~~undefined@@LBL_COLUMNS~~undefined@@LBL_NARRATIVE~~Narrative@@LBL_SELECT_ALL_ROWS~~Select All Rows@@LBL_REJECT~~Reject@@LBL_EXPORT~~Export@@LBL_SELECT_ROW~~Select Row@@LBL_CALENDAR~~Calendar@@LBL_DISMISS~~Dismiss@@';
            params["applicationName"] = 'Flexcube';        
            params["functionId"] = '<%=function_id%>';  
			if('<%=scrName%>'!='SUMMARY'){
			params["CurTabId"] = getNodeText(selectSingleNode(tmpXmlDoc, "FORM/SCREEN[@NAME='<%=scrName%>']/BODY/TAB/@ID"));
			}else{
			 params["CurTabId"] = "";
			}
			params["scrTitle"] = '<%=ODTUtils.stripXSS(request.getParameter("title"))%>';
            var xslt =loadXSLFile(xslName);       
            html = transform(tmpXmlDoc,xslt,params)         
             return html;
       }
	   
	function doLoad() 
	{
        
			parent.document.getElementById("IFCHILD").style.width=tempWidth+'px';
			parent.document.getElementById("IFCHILD").style.height=tempHeight+'px';		
			            
            var html = "";
            if('<%=scrName%>'=='SUMMARY')
            {
            if (parent.document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD"){
                html = ShowPreview("Templates/ExtXSL/ExtDashboardSummary.xsl");
            }else{
                html = ShowPreview("Templates/ExtXSL/ExtSummary.xsl");
                }
            }
            else
            {
             if (parent.document.getElementById("FUNCTION_CATEGORY").value == "DASHBOARD"){
                html = ShowPreview("Templates/ExtXSL/ExtDashboardDetail.xsl");
            }else{
                html = ShowPreview("Templates/ExtXSL/ExtDetail.xsl");
                }
            }  
            			
            try 
            { if(getNodeText(selectSingleNode(parent.dom,"//RAD_FUNCTIONS/FUNCTION_CATEGORY")) != 'DASHBOARD') {               
                 try{
                if(window.ActiveXObject.prototype) 
                {
                    document.getElementById("ResTree").insertAdjacentHTML("beforeEnd",html);
                }
                else 
                {                    
                    document.getElementById("ResTree").appendChild(html); 
                }
				}
				  catch(e){
				  document.getElementById("ResTree").appendChild(html); 
				  }
				}else{
				  if('<%=scrName%>'!='SUMMARY'){
				  var legendHTML = "<legend>" + '<%=ODTUtils.stripXSS(request.getParameter("title"))%>' + "</legend>";
                  document.getElementById("containerFldset").innerHTML = legendHTML;
				  }
				  try{
				  if(window.ActiveXObject.prototype) 
                  {
                   document.getElementById("containerFldset").insertAdjacentHTML("beforeEnd",html);
                  }
                  else 
                  {                    
                    document.getElementById("containerFldset").appendChild(html);
                  }
				  }
				  catch(e){
				  document.getElementById("containerFldset").appendChild(html);
				  }
				  if('<%=scrName%>'=='SUMMARY'){
				   document.getElementById("containerFldset").setAttribute("TYPE", "ME");
                   document.getElementById("containerFldset").setAttribute("VIEW", "ME");
				  
				   if(getNodeText(selectSingleNode(parent.dom,"//RAD_SUMMARY/MAIN_SUMM_SCR"))==""){
				   document.getElementById('btnmore').disabled = true;
                   document.getElementById('btnmore').className ="AfootD";
				   }
				  }else{
				   document.getElementById("containerFldset").setAttribute("TYPE", "SE");
                   document.getElementById("containerFldset").setAttribute("VIEW", "SE");
                   document.getElementById("containerFldset").className = "FSTstd";
                   document.getElementById("containerFldset").style.overflow = "auto";
				   document.getElementById("containerFldset").style.width = "500px";
				   if (document.getElementsByName("ONCEAUTH")[0] != undefined) 
				   onceAuthObj = document.getElementsByName("ONCEAUTH")[0].value;
                     }
				}
             }
             catch(e) 
             {
                    parent.alertMessage(e.message);
             }
             if('<%=scrName%>'!='SUMMARY'){
              var mainScr = selectSingleNode( xmlddd,"//SCREEN[@NAME ='<%=scrName%>']").getAttribute("MAIN_WIN");
              if (mainScr=='N'|| getNodeText(selectSingleNode(parent.dom,("//RAD_FUNCTIONS/FUNCTION_ID"))).substring(2,3)=='C'
              || getNodeText(selectSingleNode(parent.dom,"//RAD_FUNCTIONS/FUNCTION_CATEGORY")) == 'DASHBOARD') 
			    document.getElementById("ResTree").removeChild(document.getElementById("toolbar"));
              }  
              if('<%=scrName%>'=='SUMMARY'){
              document.getElementById("ResTree").removeChild(document.getElementById("toolbar"));
			  document.getElementById("ResTree").removeChild(document.getElementById("toolbarSummary")); 
			  document.getElementById("ResTree").insertAdjacentHTML("afterbegin","<DIV style=\"DISPLAY: block\" id=toolbarSummary class=DIVnav><ul id=\"navTB\"><li style=\"display: block;\" name=\"Search\" class=\"BTNIconExecuteQuery\" id=\"Search\"><a class=\"TBitem\" href=\"#\">Execute Query</a></li><li style=\"display: block;\" name=\"AdvSearch\" class=\"BTNIconAdancedSearch\" id=\"AdvSearch\"><a class=\"TBitem\" id=\"advSearch\" href=\"#\">Advanced Search</a></li><li style=\"display: block;\" class=\"BTNIconReset\"><a  class=\"TBitem\" href=\"#\">Reset</a></li><li style=\"display: block;\" class=\"BTNIconClearAll\"><a  class=\"TBitem\" href=\"#\">Clear All</a></li></ul></DIV>");
              }
                      if(parent.previewfldloc)
                      {
							
                            var tabId1=getTabId();							
                            if(tabId1!= 'TBLPageAll' )
                            {   
                                expandcontent(tabId1.substr(7));
                            }
                            DisableFormControls(true);         		
                            document.getElementById(parent.previewfieldid).style.background='#FFFF00';
                     }
                    else
                      {
                         
                         // if (getNodeText(selectSingleNode(parent.dom,"//RAD_FUNCTIONS/FUNCTION_CATEGORY")) != 'DASHBOARD'){
                           var tabNodes =selectNodes( xmlddd,"//SCREEN[@NAME ='<%=scrName%>']/HEADER/TAB");
                           var tabNodes1 = selectNodes(xmlddd,"//SCREEN[@NAME = '<%=scrName%>']/BODY/TAB[@ID != 'All']"); 	
                           var scrNode = selectSingleNode(xmlddd,"//SCREEN[@NAME ='<%=scrName%>']");               
                           if(tabNodes1.length > 1 && scrNode!=null && scrNode.getAttribute("POSITION")=='template'){
                                var tabId1 = tabNodes1[0].getAttribute("ID");                                 
                                expandcontent(tabId1); 				
                            }
                            fnBuildMultipleEntryIDsArray(xmlddd);
                            DisableFormControls(true);
						//}
                      }
                      
    fngetScrHeight();
	document.getElementById("WINCLOSE").focus();
	}
function fngetScrHeight(){
   if(getNodeText(selectSingleNode(parent.dom,"//RAD_FUNCTIONS/FUNCTION_CATEGORY")) == 'DASHBOARD'){
     //document.getElementById("DIVWNDContainer").removeChild(document.getElementById("DIVScrContainer"));
	 if('<%=scrName%>'!='SUMMARY'){	    
        tempWidth = document.getElementById("containerFldset").offsetWidth-65;;          
        tempHeight = parseInt(document.getElementById("containerFldset").offsetHeight);
	 }else{
	   tempWidth = 790;          
       tempHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight);
	 }
	 
   }else{
     document.getElementById("DIVWNDContainer").removeChild(document.getElementById("containerFldset"));
     if (screenType != 'L') {
	   document.getElementById("ResTree").className = "DIVTwoColLyt";        
       document.getElementById("DIVScrContainer").className = "WNDcontent mediumwin";
	 } else {
        document.getElementById("ResTree").className = "DIVThreeColLyt";
        document.getElementById("DIVScrContainer").className = "WNDcontent bigwin";
    }
	 tempWidth = document.getElementById("DIVScrContainer").offsetWidth;          
     tempHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight); 
	 if('<%=scrName%>'!='SUMMARY'){
	  var l_DivFooter = document.getElementById("DIVFooter").offsetHeight; 
      var l_DivTmpHgt ="";
      if (screenType != 'L')
      {
         l_DivTmpHgt = parseInt(tempHeight)-parseInt(l_DivFooter)-document.getElementById("WNDtitlebar").offsetHeight;
      }
      else {        
        l_DivTmpHgt = parseInt(tempHeight)-parseInt(l_DivFooter)-document.getElementById("WNDtitlebar").offsetHeight-65;
      }
      document.getElementById("DIVMainTmp").style.height = parseInt(l_DivTmpHgt)+"px";
      document.getElementById("DIVWNDContainer").style.width = tempWidth + "px";
      document.getElementById("DIVMainTmp").style.width = tempWidth +"px";
	 }
   }
    parent.document.getElementById("IFCHILD").style.width=tempWidth+'px';
    parent.document.getElementById("IFCHILD").style.height=tempHeight+40+'px'; 
}    

function fnGoToField(obj,e)
 {

   
 	if (obj.DTYPE)
	{
    myid	=obj.id;
	var id=obj.id;
	var len= id.indexOf("__");
	var blk= id.substring(0,len);
	var field=id.substring(len+2,id.length)	;
	}
	else {
	myid	=obj.id;
	var id=myid;
	var len= id.indexOf("__");
	var blk= id.substring(0,len);
	var field=id.substring(len+2,id.length);
	}
	
	parent.document.getElementsByName('FIND')[0].value=field;
	parent.clickedobjects[2]=field;
	parent.clickedobjects[1]= blk;
	parent.selected="BNM";
	parent.findFields(e);
	fnRADExitSub('ChildWin', e);
   }
  
	function fnRADExitSub(target, e)
{
	parent.unmask();
	var e = window.event || e;
    var srcElement = getEventSourceElement(e);
    if(srcElement.disabled) return; 
	var winObj = document.getElementById(target); 
	var winDivObj = parent.document.getElementById("ChildWin");
    winDivObj.children[0].src = "";
    parent.document.getElementById("Div_ChildWin").removeChild(winDivObj);
    
}

function handleScrObj(scrObj, e) {
    var e = window.event || e;
    if (e.keyCode == 9 && !e.shiftKey) {
        document.getElementById("WINCLOSE").focus();
        preventpropagate(e);
        return false;
    }
    return true;
}

function fnAccessPreviewScreens(e)
 {
	var e = window.event || e;
    var srcElement = getEventSourceElement(e);
	  if(e.keyCode == 9 && !e.shiftKey && srcElement.id=="Cancel" ){ 
          document.getElementById("WINCLOSE").focus();   
          fnDisableBrowserKey(e);
		  preventpropagate(e);
          return false;
      } else if(e.keyCode == 9 && e.shiftKey && srcElement.id=="WINCLOSE") {
          document.getElementById("BTN_EXIT_IMG").focus();
		  fnDisableBrowserKey(e);		  
          preventpropagate(e);
          return false;
      } else if(e.keyCode == 27)
	  {
		fnRADExitSub('ChildWin', e); 
        return false;
	  } 
      return true;
} 



</SCRIPT> 
</HEAD> 
<body style="overflow:auto;background-color:white;"  onload="doLoad()" onkeydown="fnAccessPreviewScreens(event)">
		  
		<div id="DIVWNDContainer" class="WNDcontainer">
            <div id="WNDtitlebar" class="WNDtitlebar" onmousedown="startDrag('ChildWin', event)">
                <div id="wndtitle" class="WNDtitle">
                    <b class="BTNicon"><span class="ICOflexcube"></span></b><h1 class="WNDtitletxt"><%=ODTUtils.stripXSS(request.getParameter("title"))%></h1>
                    <div class="WNDbuttons">
						<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
							<span class="LBLinv">Close</span>
						</a>
					</div> 
                </div>
            </div>
			<Form class="form1" name="MainForm" >
            <div id="DIVScrContainer">                        
				<div class="DIVThreeColLyt"  id="ResTree">             
					<div id="toolbar" class="DIVnav">
						<ul id="navTB">
							<li id="New"  class="BTNIconNew"><a href="#nogo" class="TBitem">New</a></li>
							<li id="ExecuteQuery"  class="BTNIconEnterQuery"><a href="#nogo" class="TBitem">Enter Query</a></li>
						</ul>
					</div>
				</div>
            </div> 
        </Form>
		<fieldset id="containerFldset" class="FSTcell"></fieldset>
		</div>
		<INPUT aria-required="false" TYPE="hidden" ID="Op" Name="Op" VALUE="">
        <INPUT aria-required="false" TYPE="hidden" ID="Authorisation" VALUE="N"> 
       <!--  REQUIRED DIVS --> 
<!-- END REQUIRED DIVS -->
</body> 	
</html>

