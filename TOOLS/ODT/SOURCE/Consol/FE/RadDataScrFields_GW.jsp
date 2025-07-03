<!--
  **
  **
  ** File Name  : RadDataScrFields_GW.jsp
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
            	parent.document.getElementById("IFCHILD").style.width= 1200 +'px';
    			parent.document.getElementById("IFCHILD").style.height= 710 +"px"; 
    			document.getElementById("Cancel").focus();
    		 
}			
 


function getTabelRowDsFlds_GW(tableName) {

    var trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" type=text id=COL_NAME  size=45 name=COL_NAME> </TD>" + "<TD><INPUT aria-required=\"false\" type=text id=DATA_TYPE  size=10 name=DATA_TYPE></TD>" + "<TD><INPUT aria-required=\"false\" type=text id=MAX_LEN   name=MAX_LEN></TD>" + "<TD><INPUT aria-required=\"false\" type=text id=LBL_CODE   name=LBL_CODE></TD>" + "<TD><INPUT aria-required=\"false\" type=text id=FLD_NAME   name=FLD_NAME></TD>" +"<TD><INPUT type=text id=MAX_DEC   name=MAX_DEC></TD>"
    return trow;
}

function addNewRowDsFlds_GW(tableName) {

    if (!document.getElementById(tableName)) {
        return;
    }

    var numRows = document.getElementById(tableName).tBodies[0].rows.length;
    var trow = getTabelRowDsFlds_GW(tableName);
    var newRow = document.getElementById(tableName).tBodies[0].insertRow(document.getElementById(tableName).tBodies[0].rows.length);
    var rowArr = new Array();
    var cellsArr = new Array();
    var tableRef = document.getElementById(tableName);
    var tHead = tableRef.tHead.rows[0];
    var tBodyHTML = document.getElementById(tableName).tBodies[0].rows[0].innerHTML;
    tBodyHTML = trow;
    var trwln = document.getElementById(tableName).tBodies[0].rows.length
    var R = 0;

    var trCellArray = tBodyHTML.split("</TD>");
    for (var j = 0;j < trCellArray.length - 1;j++) {
        rowArr[j] = trCellArray[j] + "</TD>";
        newCell = newRow.insertCell(newRow.cells.length);
        newRow.cells[j].innerHTML = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        try {
            newRow.cells[j].getElementsByTagName("INPUT")[0].title = "Record " + trwln + " col " + R;
        }
        catch (e) {
            newRow.cells[j].getElementsByTagName("SELECT")[0].title = "Record " + trwln + " col " + R;
        }
        if (R == 0)
            newRow.cells[j].setAttribute("scope", "row");
        R++;
        cellsArr[j] = newRow.cells[j];
        rowArr[j] = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));

    }

}

function addFields_GW() {

    var returnvals = new Array();
    var tableObject = document.getElementById("DataScrfldTable");
    var rowlength = tableObject.tBodies[0].rows.length;
var columns=[],datatypes=[],dtsize=[],columnlable=[],columnlable=[],columnFiledName=[],coldecimal=[],n=0;
    for (var i = 0;i < rowlength;i++) {
        if (tableObject.tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {
            columns[n] = tableObject.tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value;
            datatypes[n] = tableObject.tBodies[0].rows[i].cells[2].getElementsByTagName("INPUT")[0].value;
            dtsize[n] = tableObject.tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0].value;
            columnlable[n] = tableObject.tBodies[0].rows[i].cells[4].getElementsByTagName("INPUT")[0].value;
            columnFiledName[n] == tableObject.tBodies[0].rows[i].cells[5].getElementsByTagName("INPUT")[0].value;
			  coldecimal[n]==tableObject.tBodies[0].rows[i].cells[6].getElementsByTagName("INPUT")[0].value;
			  n++;
        } 
    }

    columns = rearrangeArray(columns);
    datatypes = rearrangeArray(datatypes);
    dtsize = rearrangeArray(dtsize);
    columnlable = rearrangeArray(columnlable);
    columnFiledName = rearrangeArray(columnFiledName);
		coldecimal= rearrangeArray(coldecimal);

    if (columns.length == 0) {
        alertMessage("No Field Selected", "E");
        return false;
    }

    parent.columns = columns;
    parent.columnDataTypes = datatypes;
    parent.columnSizes = dtsize;
    parent.columnNullable = columnlable;
    parent.columnFiledName = columnFiledName;
	parent.coldecimal= coldecimal; 
    parent.CreateDOM("DSN~"+parent.clickedobjects[1]);

}

         </script>
</head>
<body  onload="fnInValues('R');"   onkeydown="fnAccessChildScreens(event)"> 
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
  <div class="MEButtons" id="DataScrfldTable_ME" name="DataScrfldTable_ME">
			 <BUTTON title="Add Row"  id="ADD" name="ADD" onclick="addNewRowDsFlds_GW('DataScrfldTable')" class="BTNimg"><span class="ICOadd" tabindex="-1"><span class="LBLinv">Add Row</span></span></BUTTON>
			<BUTTON title="Delete Row" id="DEL" name="DEL" onclick="delRow('DataScrfldTable')" class="BTNimg"><span class="ICOremove" tabindex="-1"><span class="LBLinv">Delete Row</span></span></BUTTON>
		</div> 
	<div class="DIVmultiplebox" id="ResTree">
		<div class="DIVMultipleBigInner" style="height:500px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);" id="DataScrfldTable" name="DataScrfldTable" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="NO" VIEW="YES"  class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('DataScrfldTable','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Column Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Data Type</span></th> 
			    	<th scope="col" class="THgrid"><span class="SPNtext">MAX Length</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Label Code</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">FLD Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">MAX Dec</span></th>
			    	</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" id="funcDesc_TE" name="funcDesc_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div> 
	<div style="float:right;padding-right:40px;padding-top:20px;">
		<BUTTON class="BTNfooter" name="OK"  id="ok"onclick="addFields_GW();fnRADExitSub('ChildWin', event)"   style="visibility:visible;height:25px;width :35px;">Ok</BUTTON>
		<BUTTON class="BTNfooter" id="Cancel" onclick="fnRADExitSub('ChildWin', event);" style="height:25px;width :60px;">Cancel</BUTTON>
	</div> 
</div> 
</div>
</div> 
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div> 
</body>
</html>