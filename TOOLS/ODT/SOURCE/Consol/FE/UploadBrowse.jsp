<%
String js_parser ="";
String userAgent = request.getHeader("USER-AGENT").toUpperCase();
if(userAgent.contains("MSIE") || (userAgent.contains("TRIDENT") && userAgent.contains("RV"))) {//ie11 changes
    js_parser = "BROWSER_IE.js";
} else {
    js_parser = "BROWSER_NonIE.js";
}
%>
<html lang="en" >
<head><title>Upload page</title></head>
<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>
<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
<script type="text/javascript" src="Script/JS/RadAccessChild.js"></script>
<script type="text/javascript">
 function fncalht()
{
	parent.document.getElementById("IFCHILD").style.width= 400 +'px';
	parent.document.getElementById("IFCHILD").style.height= 200 +"px"; 
}		
	function Loadxml()
 {  
 	var filename =document.getElementById("Cancel").value;	
	var exten = filename.split('.').pop();
	var exten=exten.toUpperCase();
	if(exten!="TXT" && exten!="SXML" && exten!="XML" && exten!="XLS" && exten!="XLSX" && exten!="XSD"){
	document.form1.reset();
	document.getElementById("ErrorLabel").innerHTML="Reload Proper File"; 
	return false;
	}
	var fnma=filename.split("\\");
        var fname=fnma[fnma.length-1];
        
	document.getElementById("ErrorLabel").value="";
	document.form1.action="UploadFileToServer?USER_NAME="+parent.parent.username+"&USER_SEQUENCE="+parent.parent.usersequence+"&FILENAME="+fname;			
	document.form1.submit();
	parent.unmask(); 
 }
 function fnsetfc()
 {
	document.getElementById("Cancel").focus();
 }
 
 </script> 
<body onload="fncalht();fnsetfc()" onkeydown="fnAccessChildScreens(event)">
<div id="DIVWNDContainer1">
	    <div class="WNDtitlebar" id="WNDtitlebar" >
	    	<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Upload</h1>                                      
	    		<div class="WNDbuttons">
					<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
						<span class="LBLinv">Close</span>
					</a>
				</div>
	    	</div>
	    </div>  
	<form method="post" enctype="multipart/form-data" name="form1" id="form1"> 
	<input type="hidden" name="X-CSRFTOKEN" id="X-CSRFTOKEN" value="${sessionScope.X-CSRFTOKEN}"/>
	<div style="width:110%; height:100px;" align="center">
		<table style="margin-top:30px;" class="TABLELyt" border="0" cellpadding="1" cellspacing="1">
		<tr>
	       <td align="center"><LABEL for="Cancel" CLASS="LBLstd" style="width:100px">Upload File</LABEL></td> 
	      <td> <INPUT aria-required="false" name="Cancel"  type="file" id="Cancel" onchange="Loadxml()"></td>
		</tr>
		<tr>
	      <td></td>
		  <td align="center"><LABEL name="ErrorLabel" id="ErrorLabel" CLASS="LBLstd" style="color: red" ></LABEL></td> 
	      
		</tr>		
		</table>  
	</div> 
	</form>
</div> 
</body>
</html>