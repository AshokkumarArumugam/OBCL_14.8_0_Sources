<!--
  **
  **
  ** File Name  : RadDeploy.jsp
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
  ** Copyright � 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  

-->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
	<title>Deploy Files</title>
	<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
	<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
		<script type="text/javascript" src="Script\JS\RadDeploy.js"></script>
        <script type="text/javascript" src="Script\JS\RadGlobals.js"></script>
        <script type="text/javascript" src="Script\JS\RadTree.js"></script>
        <script type="text/javascript" src="Script\JS\RadHeader.js"></script>
        <script type="text/javascript" src="Script/JS/RadUtil.js" ></script>
        <script type="text/javascript" src="Script/JS/RadUIUtils.js" ></script>
        <script type="text/javascript">
         
function addIEonScroll() {

	var thisContainer = document.getElementById('divDply');
	if (!thisContainer) { return; }

	var onClickAction = 'toggleSelectBoxes();';
	thisContainer.onscroll = new Function(onClickAction);
}
function toggleSelectBoxes() {

	var thisContainer = document.getElementById('divDply');
	var thisHeader = document.getElementById('deplyHd');
	if (!thisContainer || !thisHeader) { return; }

	var selectBoxes = thisContainer.getElementsByTagName('select');
	if (!selectBoxes) { return; }

	for (var i = 0; i < selectBoxes.length; i++) {
		if (thisContainer.scrollTop >= eval(selectBoxes[i].parentNode.offsetTop - thisHeader.offsetHeight)+5) {
			selectBoxes[i].style.visibility = 'hidden';
		} else {
			selectBoxes[i].style.visibility = 'visible';
		}
	}
} 
</script>
  	</head>
	<body class="BODYDetails" onload="fnLaunchDeployment();">
<form id="frmdply" name="frmdply" >
<div class="DIVGrid" id="divDply" style="height:395px;width:680px" onclick="addIEonScroll()" onkeydown="addIEonScroll()">    
        <table  class="TABLEData" id ='deply' name="deply"  width="100%" TYPE="MULTIPLE" PARENT="NO" VIEW="YES" border="0" cellspacing="0" cellpadding="0">
            <thead id="deplyHd">
                <tr>
                    <th width="2px"><INPUT aria-required="false" type=checkbox  CHECKED name='SEL_ALL' id='SEL_ALL' onclick="checkAll('deply','checkgroup')"></th>
                    <th><LABEL for="FILE_NAME">File Name</LABEL></th>
                    <th width="100%"><LABEL for="DEST_PATH">Deployment Location</LABEL></th>
                    <th><LABEL for="DEP_STS">Deployed</LABEL></th>
               </tr>
            </thead>
            <tBody>
            </tBody>
	</table> 
        
  </div>
  <br>
     <textarea name=DPLY_LOG id =DPLY_LOG cols=131 rows=12 value="" onload="this.value=''"></textarea>
	
  <BUTTON class="BTNfooter" name="OK"  id="ok" style="position:relative;height:25px;width :45px;left:520px;top:15px" onclick="fnDeploy()"><sup>Deploy</sup></BUTTON>
  <BUTTON class="BTNfooter" name="Cancel"  id="Cancel"  style="position:relative;height:25px;width :45px;left:530px;top:15px"  onclick="dltAll('deply');javaScript:self.close();"><sup>Cancel</sup></BUTTON>
</form>
</body>
</html>