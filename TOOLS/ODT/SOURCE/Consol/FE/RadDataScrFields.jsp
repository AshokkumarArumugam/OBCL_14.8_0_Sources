<!--
  **
  **
  ** File Name  : RadDataScrFields.jsp
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
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
	int frmCount=0;   
	int ToCount=0;

%>
<html lang="en" >

<head><title>Select Fields</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
        <link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
		
		<script type="text/javascript" src="Script/JS/RadSelectColumns.js" ></script>
        <script type="text/javascript" src="Script/JS/RadUIUtils.js"></script>
        <script type="text/javascript" src="Script/JS/RadUtil.js"></script>
        <script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>  
		<script type="text/javascript" src="Script/JS/RadAccessibility.js" ></script>
            <script type="text/javascript">
            var frmColumn =0;
            var toColumn =0;
			var tempfromColumn = 0;
            function fnInValues(val)
			{
				if(val =='P')
				{
					var tempColum =frmColumn; 
					frmColumn =toColumn-frmColumn;
					toColumn = tempColum;		
				}
				else if(val =='N')
				{	
					frmColumn =toColumn;
					toColumn = toColumn+15;					
				}
				else
				{
					frmColumn =0;
		            toColumn =0;
					toColumn = frmColumn+15;
					
				} 
				parent.document.getElementById("IFCHILD").style.width= 500 +'px';
				parent.document.getElementById("IFCHILD").style.height= 410 +"px"; 
				columns=parent.dbColumsArry[0];
				datatypes=parent.dbColumsArry[2];
				dtsize=parent.dbColumsArry[1];
				columnlable=parent.dbColumsArry[3];
				columnFiledName=parent.dbColumsArry[4];
				attr=parent.dbColumsArry[5];				
                decimal=parent.dbColumsArry[6];				
				populateFlds(columns,datatypes,dtsize,columnlable,columnFiledName,decimal,frmColumn,toColumn,decimal); 
				document.getElementById("Cancel").focus();
}			

function populateFlds1(columns,datatypes,newdtsize,columnlable,decimal,selectcolumnFiledName){ 
 var tableName = "DataScrfldTable";
        for(var i=0;i<30;i++){ 
			var numRows = document.getElementById(tableName).tBodies[0].rows.length;           
			var newRow   = document.getElementById(tableName).tBodies[0].insertRow(numRows);
			newRow.insertCell(newRow.cells.length); 
			newRow.cells[0].innerHTML = '<INPUT aria-required="false" type="checkbox" name="checkgroup">';
			newRow.insertCell(newRow.cells.length); 
			newRow.cells[1].innerHTML = '<INPUT aria-required="false" type="text" id="COL_NAME" readonly size="45" name="COL_NAME" value ="'+columns[i]+'">'
			newRow.insertCell(newRow.cells.length); 
			newRow.cells[2].innerHTML = '<INPUT aria-required="false" type="text" id="DATA_TYPE" readonly size="10" name="DATA_TYPE" value ="'+datatypes[i]+'">'
			newRow.insertCell(newRow.cells.length); 
			newRow.cells[3].innerHTML = '<INPUT aria-required="false" type="hidden" id="MAX_LEN" readonly  name="MAX_LEN" value ="'+newdtsize[i]+'">'
			newRow.insertCell(newRow.cells.length); 
			newRow.cells[4].innerHTML = '<INPUT aria-required="false" type="hidden" id="LBL_CODE" readonly name="LBL_CODE" value ="'+columnlable[i]+'">'
			newRow.insertCell(newRow.cells.length); 
			newRow.cells[5].innerHTML = '<INPUT aria-required="false" type="hidden" id="FLD_NAME" readonly name="FLD_NAME" value ="'+selectcolumnFiledName[i]+'">'
			newRow.insertCell(newRow.cells.length); 
			newRow.cells[6].innerHTML = '<INPUT aria-required="false" type="hidden" id="MAX_DEC" readonly name="MAX_DEC" value ="'+decimal[i]+'">'
	    }
}           
         </script>
</head>
<body  onload="fnInValues('R');"  onkeydown="fnAccessChildScreens(event)"> 
<div  id="DIVWNDContainer1" > 
<div class="WNDtitlebar" id="WNDtitlebar" >
		<div class="WNDtitle" onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Select Fields</h1>                                      
			<div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
		</div>
    </div> 
<div class="DIVTabPageContent">	
<div class="DIVMultipleBig" style="position:relative; margin-top:30px; margin-left:20px; margin-right:20px; width:AUTO;">
	<div class="DIVmultiplebox" id="ResTree">
		<div class="DIVMultipleBigInner" style="height:300px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);" id="DataScrfldTable" name="DataScrfldTable" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="NO" VIEW="YES"  class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('DataScrfldTable','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Column Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Data Type</span></th> 
			    	</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" id="funcDesc_TE" name="funcDesc_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div> 
	<div style="float:right;padding-right:40px;padding-top:20px;">
		<BUTTON class="BTNfooter" name="OK"  id="ok"onclick="addFields(document.getElementById('frmDatScrflds'),attr,columns,datatypes,dtsize,columnlable,decimal);fnRADExitSub('ChildWin', event)"   style="visibility:visible;height:25px;width :35px;">Ok</BUTTON>
		<BUTTON class="BTNfooter" id="Cancel" onclick="fnRADExitSub('ChildWin', event);" style="height:25px;width :60px;">Cancel</BUTTON>
	</div> 
</div> 
</div>
</div> 
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div> 
</body>
</html>