<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
%>
<html lang="en" >
  <head>
  
    <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link> 
    <link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link> 
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
    <script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>        
    <script type="text/javascript" src="Script/JS/RadUtil.js"></script>
    <script type="text/javascript" src="Script/JS/RadUIUtils.js"></script>
	<script type="text/javascript" src="Script/JS/RadMultipleTables.js"></script>	
         <script type="text/javascript">
             //var dlg=dialogArguments;
        function fnlogdtls(){

         

		   parent.document.getElementById("IFCHILD1").style.width="700px";
		   parent.document.getElementById("IFCHILD1").style.height="640px";
		   parent.document.getElementById("IFCHILD1").scrolling='yes';
        }
        </script>

        
    <title>Detailscreen</title>
  </head>
  <body class="BODYDetails" style="background-color:#ffffff" onload ='fnlogdtls();fnExecutequery_DDLdetails();'  onKeyDown="return parent.shortcut(event)"; onKeyDown="parent.parent.windowCtrl(event);">
      <DIV class="WNDtitlebar" id="WNDtitlebar" >
                <div class="WNDtitle" onmousedown="startDrag('ChildWin1', event)">                   
                    <h1 class="WNDtitletxt" id="title_wnd">Generate Rad Files</h1>                                      
                    <div class="WNDbuttons">
					<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" onclick="if(this.disabled) return false; fnRADChildExitSub('ChildWin1', event)">
						<span class="LBLinv">Close</span>
					</a>
					</div>
                </div>
            </DIV>
  <div style="width:100%;margin-top:8px;display:block;" align="center">
    <table onKeyDown="FnAcessTblkeys(this,event);"  class="TABLELyt"  name="DdlStatus" id="DdlStatus" width="95%" border="0" align="center" cellpadding="1" cellspacing="0">
	
    <tr>
    <td><LABEL>Total records</LABEL></td>
    <td><INPUT aria-required="false" name="total_records" id="Total_records" type="TEXT" readonly="true" ></td>
    <td><LABEL>Inserted</LABEL></td>
    <td width ="200"><INPUT aria-required="false" type="TEXT" readonly="true" id="Inserted"></td>
    </tr>
    <tr>
    <td><LABEL>Deleted</LABEL></td>
    <td><INPUT aria-required="false" type="TEXT" readonly="true" id="Deleted">
          </td>
    <td><LABEL>Updated</LABEL></td>
    <td><INPUT aria-required="false" type="TEXT" readonly="true" id="Updated"></td>
    </tr>
    <tr>
    
    <td><LABEL>Failed</LABEL></td>
    <td><INPUT aria-required="false" type="TEXT" readonly="true" id="Failed"></td>
     <td><LABEL>Ignored</LABEL></td>
    <td><INPUT aria-required="false" type="TEXT" readonly="true" id="Ignored"></td>
    </tr>
	<tr>
    
    <td><LABEL>File name</LABEL></td>
    <td><INPUT aria-required="false" type="TEXT" readonly="true" id="FILENAME"></td>
      </tr>
	
            
  </table>
</div>
<br>
<br>
<br>
<div id ="GENRATEDIV" class="DIVGrid"  style="margin-top:10px;margin-left:5px;width:95%;height:450px;" align="center">
 <table onKeyDown="FnAcessTblkeys(this,event);"  class="TABLEData"  name="Detail_ScreenTB" id="Detail_ScreenTB" TYPE="MULTIPLE"  VIEW="NO" width="100%"  border="0"  align="center"   cellpadding="1" cellspacing="0"> 
            <tHead>
                <tr>
                    <th scope="col" width="10%" class="thheader" align="center"><LABEL>Record No</LABEL></th>
                    <th scope="col" width="35%" class="thheader" align="center"><LABEL>Key</LABEL></th>
                    <th scope="col" width="15%" class="thheader" align="center"><LABEL>Action</LABEL></th>
                    <th scope="col" width="15%" class="thheader" align="center"><LABEL>Status</LABEL></th>
                    <th scope="col" width="25%" class="thheader" align="center"><LABEL>Remarks</LABEL></th>
                </tr>
            </tHead>
            
            <tbody>
            </tbody>
 
 
 </table>

</div>

  
 
  </body>
</html>