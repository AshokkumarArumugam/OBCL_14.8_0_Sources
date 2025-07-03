<%/*------------------------------------------------------------------------------------------------------
**
** File Name    : Debug.jsp
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

**	Modified By   : Manoj S
** 	Modified on   : 22-May-2023
** 	Description   : Changing the file name from OracleFont.min.css to OracleFont.css
-------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.ofss.fcc.common.FBContext"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="java.util.Map"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 ); 
    String strUserId = (String)session.getAttribute("USERID");
    String entity = (String)session.getAttribute("ENTITY");
    String strTheme = (String)session.getAttribute("THEME");
    String Strlang         = (String)session.getAttribute("LANG");
    String StrIsoLang = (String)session.getAttribute("LANGISOMAP");
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    String jsParser         = (String)session.getAttribute("JS_PARSER");
    String browserCSS = (String)session.getAttribute("BROWSER_CSS");
    String CSRFtoken = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/
    String ieCss         = (String)session.getAttribute("IECSS");
    String font         = (String)session.getAttribute("FONT");//HTML5 Changes
    String logintheme   = (String)session.getAttribute("LOGINTHEME");//HTML5 Changes
%>
<html lang="<%=StringEscapeUtils.escapeHTML(StrIsoLang)%>">
    <head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Language" Content="<%=StringEscapeUtils.escapeHTML(StrIsoLang)%>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/><!--HTML5 Changes-->
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link id="LINKCSS" href="Theme/Ext<%=StringEscapeUtils.escapeURL(strTheme)%>" rel="stylesheet" type="text/css"/>
       <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(logintheme)%>" rel="stylesheet" type="text/css"/><!--HTML5 Changes-->
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(StrIsoLang)%>.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Ext<%=StringEscapeUtils.escapeURL(browserCSS)%>" rel="stylesheet" type="text/css"/>
        <!--HTML5 Changes Start-->
        <%if("L".equals(font)) {%>
            <link href="Theme/LargeFont.css" rel="stylesheet" type="text/css"/>
        <%} else if ("S".equals(font)) {%>
            <link href="Theme/SmallFont.css" rel="stylesheet" type="text/css"/>
<%}%><!--HTML5 Changes End -->

         <link type="text/css" rel="stylesheet" href="Script/OJET/css/libs/oj/v17.0.4/redwood/oj-redwood-min.css">
         <link href="Script/css/OracleFont.css" rel="stylesheet" type="text/css"/>
         <link href="Script/css/_css-variable.css" rel="stylesheet" type="text/css"/>
         <link href="Script/css/jet11-override.css" rel="stylesheet" type="text/css"/>
	<%     
            FBContext fbContext = new FBContext(strUserId);
            //BranchLogger brnLogger = new BranchLogger(strUserId);
            //fbContext.setBrnLogger(brnLogger);
                                    
            //String branchIdentifier = BranchConfig.getInstance().getConfigValue("BRANCH_CENTRALIZED");                                    
            Map itemDescMap = null;
            itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(fbContext,"ITEM_DESC~"+Strlang + "~" + entity, branchIdentifier,strUserId);
          
            String DebugWindow = (String)itemDescMap.get("LBL_DEBUG_WINDOW");  
            String Debugstmt = (String)itemDescMap.get("LBL_DEBUG_STMT"); 
            String clientDebugs = (String)itemDescMap.get("LBL_CLIENT_DEBUG");   
            String serverDebugs = (String)itemDescMap.get("LBL_SERVER_DEBUG"); 
            String FID = (String)itemDescMap.get("LBL_FID");
            String Sno = (String)itemDescMap.get("LBL_NO");
            String fnam = (String)itemDescMap.get("LBL_FNAME");
            String val = (String)itemDescMap.get("LBL_VAL");
            String Tim = (String)itemDescMap.get("LBL_TIME");
            String copy = (String)itemDescMap.get("LBL_COPY");
            String clear = (String)itemDescMap.get("LBL_CLEAR");
            String XHTML = (String)itemDescMap.get("LBL_HTML_XML");
            String cdebugs = (String)itemDescMap.get("LBL_CDEBUGS");
            String noScriptLabel = (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
            String close        = (String)itemDescMap.get("LBL_CLOSE");
            String labelExit = (String)itemDescMap.get("LBL_EXIT");
        %>
        <title><%=StringEscapeUtils.escapeHTML(DebugWindow)%></title>
        <script type="text/javascript">
            var mainWin = parent;
            var winObj = parent.document.getElementById("debugwin");  
            var debugObj = winObj.children[0].contentWindow;
        </script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>   
        <script type="text/javascript" src="Script/OJET/js/libs/require/require.js"></script>
        <script type="text/javascript" src="Script/OJET/require-config.js"></script>
        <script type="text/javascript" src="Script/OJET/main_misc.js"></script>
        <script type="text/javascript" src="Script/JS/Alert.js"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes starts  --%>
        <script type="text/javascript" src="Script/JS/<%=StringEscapeUtils.escapeURL(jsParser)%>"></script><noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
         <%-- Security bug SEC-12-Patch-081 fixes ends  --%>
        <script type="text/javascript" src="Script/JS/SmhTlBar.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
        <script type="text/javascript" src="Script/ExtJS/ExtUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> 
        <script type="text/javascript" src="Script/ExtJS/ExtUIUtil.js"></script> <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript> 
        
        <script type="text/javascript">
  
       
            function fnUnLoadDebug() {    
                try{
                    if(opener.top.frames.length > 0){
                        DebugWindowFlg = 'N'; 
                        //opener.top.frames["FrameMenu"].document.getElementById("val_selected22").firstChild.className = "ICOunchecked";
                    }
                return true;   
                }catch(e){}
            }   
           
            function onclickevent1(){             
                document.getElementById("div2").style.visibility = 'visible';        
                document.getElementById("div2").style.display = "block"; 
                document.getElementById("div1").style.visibility = 'visible';        
                document.getElementById("div1").style.display = "block"; 
                document.getElementById("div3").style.display = "none";
                document.getElementById("div4").style.display = "none";
                document.getElementById("div5").style.display = "none";
            } 
            
           function onclickevent2(){             
                document.getElementById("div1").style.display = "none";
                document.getElementById("div2").style.display = "none";
                document.getElementById("div3").style.display = "none";
                document.getElementById("div4").style.display = "none";
                document.getElementById("div5").style.visibility = 'visible';        
                document.getElementById("div5").style.display = "block"; 
                document.getElementById("sdebug").value = mainWin.serverDebugStmt;
            }//debug revert
    
            
    
            function deleterows(){
                clearDebugData();
                document.getElementById("tdebug").value = "";
                document.getElementById("innerHTML").value = "";
                document.getElementById("sdebug").value = "";
                mainWin.serverDebugStmt = "";
            }
    
            function replaceAll( str, replacements ) {
                for ( i = 0; i < replacements.length; i++ ) {
                    var idx = str.indexOf( replacements[i][0] );
                    while ( idx > -1 ) {
                        str = str.replace( replacements[i][0], replacements[i][1] ); 
                        idx = str.indexOf( replacements[i][0] );
                    }
                }
                return str;
            }
    

            function copyToClipboard(content) {
                //var content = eval("document."+field);
                content.focus();
                content.select();
                range = content.createTextRange();
                range.execCommand("Copy");
                window.status="Contents copied to clipboard";
                setTimeout("window.status=''",1800);
                if(document.getElementById("tdebug").value != ""){
                /* FC 11.4 NLS Changes*/                     
                    //alert("Contents copied to clipboard");
                    alert(mainWin.getItemDesc("LBL_CNCPTOCB"));     
                }
            }
  
            function selectrows(){
                var tot = debugObj.document.getElementById("div2").children[0].innerHTML;
                tot = replaceAll( tot, [ ["<TBODY>", ""],["<THEAD>", ""],["<TH>", ""],["<TD>", "~"] ,["<CAPTION>", ""]] );  
                tot = replaceAll( tot, [ ["</TBODY>", ""],["</THEAD>", ""],["</TH>", ""],["</TD>", ""] ,["</CAPTION>", ""]] );  
                tot = replaceAll( tot, [ ["<BUTTON class=BUTTONExit onclick=selectrows()>SelectAll</button><BUTTON class=BUTTONExit onclick=deleterows()>Clear</button> ",""],["<INPUT onclick=showfullhtml(event); type=button value=ShowData>",""]] );       
                tot = replaceAll( tot, [ [ "~~", "~" ],[ "<INPUT type=hidden>", "" ],["<INPUT type=hidden value=",""],[ ">~", "~" ],[ "'>", "'" ],[ "~~", "~" ]] );      
                tot = replaceAll( tot, [ ["<SPAN class=SPNtbltwoC>", ""],["</SPAN>", ""]] ); 
                tot = tot.replace(/\s/g,' ').replace(/  ,/g,'');  
                tot = replaceAll( tot, [["<tr>", "\n"]]);  
                tot = replaceAll( tot, [["</tr>", "\n"]]);      
                /*if(tot.indexOf("~1")!= -1){
                tot = tot.substr(tot.indexOf("~1"),tot.length);
                }else{
                tot = "";
                }*/
                tot = replaceAll( tot, [["&#13;", ""],["&#10;", ""],["&#9;", ""]]); 
                //var sDebug = "\n\n ---------------------"+ mainWin.getItemDesc("LBL_SERVER_DEBUG")+"---------------------\n\n";
                //var consDebug = tot +sDebug+ document.getElementById("sdebug").value;
                var consDebug = tot;
                document.getElementById("tdebug").value = consDebug;
                document.getElementById("div4").style.visibility = 'visible';
                document.getElementById("div4").style.display = "block"; 
                document.getElementById("div1").style.display = "none";  
                document.getElementById("div2").style.display = "none";  
                document.getElementById("div3").style.display = "none"; 
                document.getElementById("div5").style.display = "none";
            } 
            
        </script>
        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>

        <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
    </head>	
<body class="BDYform" onload = "fnLoadDebug()" onclick="mainWin.setDebugActiveWindow()"  oncontextmenu="return false;">
     <div id="DIVif1" > 
                <oj-dialog id="scrollingDialog"  initial-visibility="show"   position.my.horizontal="center" position.my.vertical="center"
                                  position.at.horizontal="center" position.at.vertical="top"
                                  position.of="window" class="oj-sm-width-full"  modality="modeless" resize-behavior="resizable" drag-affordance="title-bar" >
            
                        <DIV   slot=header id="wndtitle" class="oj-dialog-title" >
                            <h1 ><%=StringEscapeUtils.escapeHTML(DebugWindow)%></h1>            	
                        </DIV>
                        
                        <DIV slot="body" id="wndwidth">
                            <div id="ResTree" >
                 
        <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
                           
                                <div  ID="TBLPageAll" >  
                                    <div>
                                        <div>
                                            <div>           
                                                <oj-button  type="button" onClick="onclickevent1()"><%=StringEscapeUtils.escapeHTML(clientDebugs)%></oj-button>
                                                <oj-button  type="button" onClick="onclickevent2()"><%=StringEscapeUtils.escapeHTML(serverDebugs)%></oj-button><!--debug revert-->
                                                <oj-button  type="button" onClick="selectrows();"><%=StringEscapeUtils.escapeHTML(copy)%></oj-button>
                                                <oj-button  type="button" onClick="deleterows()"><%=StringEscapeUtils.escapeHTML(clear)%></oj-button>        
                            </div>                   
                        </div> 
                    </div>
                </div>
                 <br>   
                                <div class="oj-sm-width-full"  id="DIVMainTmp" >
                                    <div class="oj-sm-width-full" id="div1" >
                    <fieldset class="FSTstd" style="margin:0px;"><!--HTML5 Changes-->
                     <legend> <%=StringEscapeUtils.escapeHTML(clientDebugs)%></legend>
                     </fieldset>
                                        <div class="oj-sm-width-full" id ="div2" >
                         
                                               <oj-table id='tableTest' aria-label='Departments Table'
                                                                  data='[[debugDataprovider]]'
                                                                  columns='{{debugHeaders}}'
                                                                  columns-default='{"sortable": "disabled"}'
                                                                  class="oj-sm-width-full"  display="grid" >
                                                    <template slot="cellTemplate" data-oj-as="cell">
                                                        <oj-bind-text value="[[cell.data]]"></oj-bind-text>
                                                    </template>
                                                    <template slot="showDataCellTemplate" data-oj-as="cell">
                                                            <oj-bind-if test="[[$current.row.fulData.length > 50 ]]">
                                                                <oj-button on-oj-action="[[showfullhtmlfromData.bind(null,event,cell.data)]]"  value="[[cell.data]]" >Show Data</oj-button>     
                                                            </oj-bind-if>
                                                            <oj-bind-if test="[[$current.row.fulData.length <= 50 ]]">
                                                                <oj-bind-text value="[[cell.data ]]"></oj-bind-text>             
                                                            </oj-bind-if>
                                                    </template>
                                                    <template slot="headerTemplate" data-oj-as="header">
                                                       <oj-bind-text value="[[header.data]]"></oj-bind-text>
                                                    </template>
                                             </oj-table>
                                   </div>     
                                </div>    
                                    <div id = "div3" >    
                                    <div class="oj-sm-width-full" >
                                        <fieldset class="oj-sm-width-full">
                            <legend> <%=StringEscapeUtils.escapeHTML(XHTML)%></legend>				
                                                <div class="oj-sm-width-full">
                                                        <oj-label class="LBLinv" for="innerHTML"><%=StringEscapeUtils.escapeHTML(XHTML)%></oj-label>
                                                          <oj-text-area cols="149" class="oj-bg-neutral-0 text-area-full-width"  rows="27" id="innerHTML"  readonly="true"  ></oj-text-area>
                            </div> 
                        </fieldset>
                    </div>	
                </div> 
                                 
                                    <div id = "div4">
                                    <div class="oj-sm-width-full">
                                        <fieldset class="oj-sm-width-full">
                            <legend><%=StringEscapeUtils.escapeHTML(cdebugs)%> </legend>				
                                                <div class="oj-sm-width-full">
                                                    <oj-label class="LBLinv" for="tdebug"><%=StringEscapeUtils.escapeHTML(cdebugs)%></oj-label>
                                                      <oj-text-area cols="149" class="oj-bg-neutral-0 text-area-full-width" rows="27" WRAP=OFF id="tdebug" name ="tdebug"  readonly="true"  ></oj-text-area>
                            </div> 
                        </fieldset>
                    </div>	
                </div> 
                                <div id = "div5" >
                                    <div class="oj-sm-width-full" >
                                        <fieldset class="oj-sm-width-full">
                            <legend> <%=StringEscapeUtils.escapeHTML(serverDebugs)%></legend>				
                                                <div class="oj-sm-width-full">
                                                        <oj-label class="LBLinv" for="sdebug"><%=StringEscapeUtils.escapeHTML(serverDebugs)%></oj-label>
                                                         <oj-text-area cols="149" class="oj-bg-neutral-0 text-area-full-width" rows="27" WRAP=OFF id="sdebug" name ="sdebug" readonly="true"  ></oj-text-area>
                            </div> 
                        </fieldset>
                    </div>	
                </div>                
           </div>
         
                                    
                            </DIV>
                            </div>
                        <DIV slot="footer">
                         <div class="oj-flex-bar oj-sm-margin-4x-bottom" >
                
                                <div class="oj-sm-margin-4x-top oj-flex-bar-end">
                    
                                 <oj-button  class="action-button-primary oj-sm-margin-1x" chroming="solid"   value="<%=StringEscapeUtils.escapeHTML(labelExit)%>"  id="BTN_EXIT_IMG"  onclick="parent.fnExitDebug(winObj,event)"  onkeydown="return handleScrObj(this,event)" name=<%=StringEscapeUtils.escapeHTML(labelExit)%> >
                                      <%=StringEscapeUtils.escapeHTML(labelExit)%></oj-button>
                </div>
            </div>         
            </div>
                        
               </oj-dialog>
    </div>
    </body>
</html>
