<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap" %>
<html lang="en" >
    <head>
	<title>Rad Tree</title> 
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
        <link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>        
	    <div id="TreeMenu" class="skin0" onMouseover="highlightie5(event)" onMouseout="lowlightie5(event)" display:none></div>
		 <script type="text/javascript" >
            var x,y;
            if (self.innerHeight) // all except Explorer
            {
                x = self.innerWidth;
		        y = self.innerHeight;
            }
            else if (document.documentElement && document.documentElement.clientHeight)// Explorer 6 Strict Mode
	           {
		         x = document.documentElement.clientWidth;
		         y = document.documentElement.clientHeight;
            }
            else if (document.body) // other Explorers
            {
                x = document.body.clientWidth;
		        y = document.body.clientHeight;
            }
            function paintTreeMenu()
            {
                    treeObj = new JSDragDropTree();
                    treeObj.setTreeId('ulTreeMenu');
                    treeObj.setMaximumDepth(7);
                    treeObj.setMessageMaximumDepthReached('Maximum depth reached'); // If you want to show a message when maximum depth is reached, i.e. on drop.
                    treeObj.initTree(); 
            }
			
	</script> 
    </head>
     <body class="BODYLeft">
      <div  class="SearchHead" id="SearchHead" style="width:100%;dispaly:block;">
       <LABEL for="FIND" style="text-align:right;">&nbsp;&nbsp;Search&nbsp;</LABEL>
	   <INPUT aria-required="false" accesskey="f" type="text" size=20 id="FIND" name="FIND" onkeydown="javaScript:findFields(event)">
      </div>
      <div id="treebody" style="background-color: rgb(85, 113, 118);">
             <ul id="ulTreeMenu" class='TreeView' title="ulTreeMenu">
                    <li id="li_MND" noDrag="true"><a href="javaScript:getNodeDetails('MND')" class="parentNode" id='TMND' name="TMND" >Preferences</a><ul id ='ULMND' class='Fields' name='details'></ul></li>
                    <li id="li_DSN" noDrag="true"><a href="javaScript:getNodeDetails('DSN')" class="parentNode" id='TDSN' name='TDSN' oncontextmenu="createMenu('DSN',event);">DataSource</a><ul id ='ULDSN' class='Fields' name='details' ></ul></li>
                   <!-- <li id="li_LOV" noDrag="true"><a href="javaScript:getNodeDetails('LOV')" class="parentNode" id='TLOV' name="TLOV" oncontextmenu="createMenu('LOV',event);">ListOfValues</a><ul id ='ULLOV' class='Fields' name='details'></ul></li> -->
                    <li id="li_BLK" noDrag="true"><a href="javaScript:getNodeDetails('BLK')" class="parentNode" id='TBLK' name="TBLK" oncontextmenu="createMenu('BLK',event);">DataBlocks</a><ul id ='ULBLK' class='Fields' name='details'></ul></li>
                    <li id="li_SCR" noDrag="true"><a href="javaScript:getNodeDetails('SCR')" class="parentNode" id='TSCR' name="TSCR" oncontextmenu="createMenu('SCR',event);">Screens</a><ul id ='ULSCR' class='Fields' name='details' ></ul></li>
                    <li id="li_FLD" noDrag="true"><a href="javaScript:getNodeDetails('FLD')" class="parentNode" id='TFLD' name="TFLD" oncontextmenu="createMenu('FLD',event);">FieldSets</a><ul id ='ULFLD' class='Fields' name='details' ></ul></li>
                    <!--  <li id="li_ACT" noDrag="true"><a href="javaScript:getNodeDetails('ACT')" class="parentNode" id='TACT' name="TACT">Actions</a><ul id ='Actions' class='Fields' name='details' ></ul></li>
                    <li id="li_CFM" noDrag="true"><a href="javaScript:getNodeDetails('CFM')" class="parentNode" id='TCFM' name="TCFM">CallForms</a><ul id ='Callforms' class='Fields' name='details' ></ul></li> -->
                    <li id="li_LFM" noDrag="true"><a href="javaScript:getNodeDetails('LFM')" class="parentNode" id='TLFM' name="TLFM">LaunchForms</a><ul id ='LaunchForms' class='Fields' name='details' ></ul></li>
                    <li id="li_SUM" noDrag="true"><a href="javaScript:getNodeDetails('SUM')" class="parentNode" id='TSUM' name="TSUM" oncontextmenu="createMenu('SUM',event)">Summary</a><ul id ='ULSUM' class='Fields' name='details'></ul></li>                     
           	</ul>
        </div>
	 
    </body>
</html>

