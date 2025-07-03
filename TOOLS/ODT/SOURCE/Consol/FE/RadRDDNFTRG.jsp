<!--
  **
  **
  ** File Name  : RadRDDNFTRG.jsp
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
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
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
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
		<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>	 
		<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
		<script type="text/javascript" src="Script/JS/RadInfraUtil.js"></script>
        <script type="text/javascript" src="Script/JS/RadUIUtils.js"></script>
        <script type="text/javascript" src="Script/JS/RadUtil.js"></script>
        <script type="text/javascript" src="Script/JS/RadLovHandler.js"></script>
		<script type="text/javascript" src="Script/JS/RadMultipleTables.js"></script>
		<script type="text/javascript" src="Script/JS/Extensible.js"></script>
		<script type="text/javascript" src="Script/JS/RadNotifyTrg.js"></script>
		<script type="text/javascript" >
		         var g_scrType ="M";   			 
                 var scrht = screen.availHeight - 30;
			     var scrwdt= screen.availWidth;			 
                 var loadxmldata = "";        
                 var mainWin  = parent;       
                 var seqNo  = parent.funcGenSeqNo;                 
                 window.frameElement.name = seqNo;
				 if(parent.document.getElementById("testwin"))
                 parent.document.getElementById("testwin").id = seqNo;      
                 var gen_gwinFuncId = parent.parent.gwinFuncId; 
 			 
                function fnMouseDownEvents()
                {    
                    return true;
                }
            function fnLoad()
            {
                mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
                fnCalcHgt();
				parent.gMsgxml = eval("msgxml_" + parent.gwinFuncId.toLowerCase());
				gPkField = pkArray[parent.gwinFuncId];
				createAdmnDom(); 
            } 
			  			 function fnfcs()
						  {
						  document.getElementById("new").focus();
						  }
			</script>  
    </head>
<body  class="BODYDetails" style="background-color:#ffffff" onload="fnLoad();fnEnableLogButtons();fnfcs();" onKeyDown="FnTriggerEvnt(event)";>
<div class="WNDcontainer" id="DIVWNDContainer">
	<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"> <h1 class="WNDtitletxt">Notification Trigger</h1>
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" id="RADTRIGGCLOSE" name="RADTRIGGCLOSE" title="Close" onclick="if(this.disabled) return false; fnRADExitAll(seqNo, event)"> 
					<span class="LBLinv">Close</span>
				</a>
				<a class="WNDmin" href="#nogo" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="Minimize" onclick="parent.fnMinimize(seqNo, event)"> 
					<span class="LBLinv">Close</span>
				</a>
			</div>
		</div>
	</div>
	<div id="toolbar" class="branding" align="right">  
	<!-- start --> 
	    <table role="presentation" summary="" border="0" cellspacing="0" cellpadding="1">
	    <tr>
	    <td  style="display:none"><BUTTON class="BUTTONToolbar" title="Exit" name="exit" id="exit" onclick="fnRADExitAll(seqNo, event)"><img  src="Images/Exit.gif" alt="Exit" ></BUTTON></td>		
	    <td  style="display:none"><BUTTON class="BUTTONToolbarD" title="Save" name="save" id="save" onclick="fnSaveTrg()" disabled="true"><img  src="Images/Save.gif"  alt="Save" ></BUTTON></td>
	    <td align="center" width="15px"><BUTTON class="BUTTONToolbarD" title="New"  name="new"  id="new" onclick="fnNew();fnEnableGenBtns();" disabled="true"><img src="Images/New_enable.gif" alt="New"></BUTTON></td>
        <td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Cancel"  name="close" id="close" onclick="winrtn();fnDisableGenBtns();" disabled="true"><img  src="Images/Cancel2.gif" alt="Cancel"></BUTTON></td>
	    <td align="center" valign="middle" width="10px"><img src="Images/seperator.gif" alt="" width="1px" height="13px"></td>
	    <td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="EnterQuery"  name="enqry"  id="enqry" onclick="fnEnterQuery()" disabled="true"><img src="Images/entrqry.gif" alt="Enter Query"></BUTTON></td>
        <td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="ExecuteQuery"  name="exqry"  id="exqry" onclick="fnExecuteQuery_RDDNFTRG()" disabled="true"><img src="Images/execqry.gif" alt="Execute Query"></BUTTON>
	    <td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="UnLock"  name="UnLck"  id="UnLck" onclick="fnUnlock();fnEnableGenBtns()" disabled="true"><img src="Images/Unlock.gif" alt="Unlock" ></BUTTON></td>
	    <td align="center" valign="middle" width="10px"><img src="Images/seperator.gif" alt="" width="1px" height="13px"></td>
	    <td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Generate"  name="TRG_GenFiles"  id="TRG_GenFiles" onclick="fnLnchGenForTrg('GENERATE')" disabled="true"><img src="Images/Generate.gif" alt="Generate"></BUTTON></td>
	    <td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Deploy"  name="TRG_depFiles"  id="TRG_depFiles" onclick="fnLnchGenForTrg('DEPLOY')" disabled="true"><img src="Images/Deploy.gif" alt="Deploy"></BUTTON></td>
	    <td align="center" width="25px"><BUTTON class="BUTTONToolbarD" title="Release"  name="TRG_chekinFiles"  id="TRG_chekinFiles" onclick="fnLnchGenForTrg('RELEASE')" disabled="true"><img src="Images/checkin.gif" alt="checkin"></BUTTON></td>		
        
  	    </tr>
	    </table>
	</div> 
	
<div class="DIVMultipleBig" style="position:relative; margin-left:20px; margin-right:20px;width:95%;">	
<div   class="Subcontainer" TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText" >
<LABEL class="LBLstd star"  for="GWTM_NOTIFICATION_TRIGGERS.TRIGGER_CODE">Trigger Code</LABEL>
<INPUT aria-required="true"  class="TXTstd"  size="40" type="text"  NAME="GWTM_NOTIFICATION_TRIGGERS.TRIGGER_CODE" id="GWTM_NOTIFICATION_TRIGGERS.TRIGGER_CODE" DBC="TRIGGER_CODE" onchange="upper(this)" value="" >
<BUTTON class="BTNimg" disabled="true" title="List Of Values" tabindex="-1" id="BTN_TRG_CODE" onclick="LOV_TRIGGER_CODE.show_lov('GWTM_NOTIFICATION_TRIGGERS.TRIGGER_CODE','frmTrgDtls','', 'Trigger Code', 'Trigger Code', 'Trigger Code',event);"  style="visibility:hidden;"><span class="ICOlov"></span></BUTTON>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="GWTM_NOTIFICATION_TRIGGERS.TRIGGER_DESCRIPTION">Description</LABEL>
<INPUT aria-required="false" class="TXTstd" size="40" type="text" name="GWTM_NOTIFICATION_TRIGGERS.TRIGGER_DESCRIPTION" id="GWTM_NOTIFICATION_TRIGGERS.TRIGGER_DESCRIPTION" DBC="TRIGGER_DESCRIPTION">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('frmTrgDtls','GWTM_NOTIFICATION_TRIGGERS.TRIGGER_DESCRIPTION','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="GWTM_NOTIFICATION_TRIGGERS.FIRING_TIME">Firing Time</LABEL>
<SELECT aria-required="false"   class="SELstd" name="GWTM_NOTIFICATION_TRIGGERS.FIRING_TIME" id="GWTM_NOTIFICATION_TRIGGERS.FIRING_TIME" DBC="FIRING_TIME">
		<option value="BEFORE">Before</option>
		<option value="AFTER">After</option> 
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="GWTM_NOTIFICATION_TRIGGERS.EACH_RECORD">Each Record</LABEL>
<SELECT aria-required="false"   class="SELstd" name="GWTM_NOTIFICATION_TRIGGERS.EACH_RECORD" id="GWTM_NOTIFICATION_TRIGGERS.EACH_RECORD" DBC="EACH_RECORD">
			<option value="Y">Yes</option>
			<option value="N">No</option>
</SELECT>
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="COLUMNS_TO_BE_TRACKED">Selected Columns</LABEL>
<INPUT aria-required="false" class="TXTstd" size="40" type="text" name="COLUMNS_TO_BE_TRACKED" id="COLUMNS_TO_BE_TRACKED">
</div>

<div class="DIVText" >
<LABEL class="LBLstd" for="GWTM_NOTIFICATION_TRIGGERS.TRIGGER_WHEN_CLAUSE">Trigger When Clause</LABEL>
<INPUT aria-required="false" class="TXTstd" size="40" type="text" name="GWTM_NOTIFICATION_TRIGGERS.TRIGGER_WHEN_CLAUSE" id="GWTM_NOTIFICATION_TRIGGERS.TRIGGER_WHEN_CLAUSE" DBC="TRIGGER_WHEN_CLAUSE">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" name="TRG_ADD" onclick="popupedit('frmTrgDtls','GWTM_NOTIFICATION_TRIGGERS.TRIGGER_WHEN_CLAUSE','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div>

</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" >  

<div class="DIVText" >
<LABEL class="LBLstd star"  for="GWTM_NOTIFICATION_TRIGGERS.BASE_TABLE">Base Table</LABEL>
<INPUT aria-required="true"  class="TXTstd" size="40" type="text"  NAME="GWTM_NOTIFICATION_TRIGGERS.BASE_TABLE" id="GWTM_NOTIFICATION_TRIGGERS.BASE_TABLE" DBC="BASE_TABLE" onchange="upper(this)" value="" >
<BUTTON class="BTNimg"  title="List Of Values" tabindex="-1" id="BTN_TRG_BS_TABLE" onclick="LOV_USER_TABLES.show_lov('GWTM_NOTIFICATION_TRIGGERS.BASE_TABLE','frmTrgDtls','', 'Base Table', 'Base Table', 'Base Table',event);" ><span class="ICOlov"></span></BUTTON> 
</div>

<div class="DIVText">
<LABEL class="LBLstd star" for="TRG_PK_COLS">PK Cols</LABEL>
<INPUT aria-required="true" class="TXTstd" size="40" type="text" name="TRG_PK_COLS" id="TRG_PK_COLS" value="" >
</div>

<div class="DIVText">
<LABEL class="LBLstd star" for="TRG_PK_TYPES">PK Types</LABEL>
<INPUT aria-required="true" class="TXTstd" size="40" type="text" name="TRG_PK_TYPES" id="TRG_PK_TYPES" value="" >
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="TRACKED_COLUMN_DATA_TYPES">Data Types</LABEL>
<INPUT aria-required="false" class="TXTstd" size="40" type="text" name="TRACKED_COLUMN_DATA_TYPES" id="TRACKED_COLUMN_DATA_TYPES" value="" >
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="GWTM_NOTIFICATION_TRIGGERS.NOTIFICATION_CODES">Notification Codes</LABEL>
<INPUT aria-required="false" class="TXTstd" size="40" type="text" name="GWTM_NOTIFICATION_TRIGGERS.NOTIFICATION_CODES" id="GWTM_NOTIFICATION_TRIGGERS.NOTIFICATION_CODES" DBC="NOTIFICATION_CODES"  value="" >
</div>

<div class="DIVText"  STYLE="display:none">
<INPUT aria-required="false" type="text" name="OPERATION" id="OPERATION" DBC="OPERATION">
<INPUT aria-required="false" disabled="true" type="checkbox" name="SPFC_TRIGGER" id="SPFC_TRIGGER" DBC="" onchange="fnEnbleTrgCode()">
</div>

</fieldset>
<!--End of Form fields column two-->
</div> 
</div> 

	<table role="presentation" class="TABLELyt" align="left"  style="margin-left:20px;margin-top:20px"  border="0" cellspacing="0" cellpadding="0"  TYPE="SINGLE" VIEW="NO">
        <tr>
            <td align="right"><LABEL>Trigger Logic</LABEL></td>
            <td><LABEL style="color:blue">( Set $NOTIFY To Y/N )</LABEL></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td colspan=6><textarea  title="Trigger Logic" rows="15" cols="135" style="border:1px solid #a2c2e5;" id="GWTM_NOTIFICATION_TRIGGERS.TRIGGER_LOGIC" name="GWTM_NOTIFICATION_TRIGGERS.TRIGGER_LOGIC" DBC="TRIGGER_LOGIC"></textarea></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </table>
	
	
</div>  
</div>
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>