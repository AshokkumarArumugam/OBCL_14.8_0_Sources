<!--
  **
  **
  ** File Name  : RadLOVSummary.jsp
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
  ** Copyright ? 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  

-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
%> 
<html lang="en" > 
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>		
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtBROWSER_FF.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
		<link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
		<link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>	 
		<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script> 
		<script type="text/javascript" src="Script/JS/RadAccessibility.js"></script> 		
		<script type="text/javascript" src="Script/JS/RadMultipleTables.js"></script>
		<script type="text/javascript" src="Script/JS/RadUtil.js"></script> 
		<script type="text/javascript" src="Script/JS/RadUtil.js"></script> 
		<script type="text/javascript" src="Script/JS/RadUIUtils.js"></script>  
            <script type="text/javascript"> 
            
			
var Cur_Row = '<%=ODTUtils.stripXSS(request.getParameter("rowid"))%>';
var Lov_Id = '<%=ODTUtils.stripXSS(request.getParameter("lovName"))%>';
var MinCharl = '<%=ODTUtils.stripXSS(request.getParameter("Mincharln"))%>';
var retnfl = '<%=ODTUtils.stripXSS(request.getParameter("RetrnFld"))%>';
var bndFlds = '<%=ODTUtils.stripXSS(request.getParameter("bndFlds"))%>';
var tblname = "SUM_DTLS";

function fnInValues() { 
    parent.document.getElementById("IFCHILD").style.width = "650px";
    parent.document.getElementById("IFCHILD").style.height = "600px";
    document.getElementById("Cancel").focus();
	FnShowTabs_Lov('DIV_RTN_FLD');
}

function fnDefFldId() {
    document.getElementById("LOV_NAME").value = Lov_Id;
    document.getElementById("MIN_CHAR_LEN").value = MinCharl;
    document.getElementById("RETURN_FLDS").value = retnfl;
    document.getElementById("BIND_FLDS").value = bndFlds;
    fn_ShowData();
}

function fn_ShowData() {
fn_Defaul_LovDetails();
    var retnfl_1 = retnfl.split("~");
    var bndFlds_1 = bndFlds.split("~");
    var table_rtn = document.getElementById("retflds").tBodies[0].rows;
    var table_bnd = document.getElementById("bindvar").tBodies[0].rows;

    for (var j = 0;j < table_rtn.length;j++) {
        table_rtn[j].cells[3].getElementsByTagName("SELECT")[0].value = retnfl_1[j];
    }

    for (j = 0;j < table_bnd.length;j++) {
	try{
        table_bnd[j].cells[2].getElementsByTagName("SELECT")[0].value = bndFlds_1[j].split(":")[0];
        table_bnd[j].cells[3].getElementsByTagName("INPUT")[0].value = bndFlds_1[j].split(":")[1];
		}catch(e){}
    }

}

function Fn_definVals() {

    var table_rtn = document.getElementById("retflds").tBodies[0].rows;
    var table_bnd = document.getElementById("bindvar").tBodies[0].rows;
    var lovRetVars = "";
    for (var j = 0;j < table_rtn.length;j++) {
        lovrtnfld = table_rtn[j].cells[3].getElementsByTagName("SELECT")[0].value;

        if (lovrtnfld != "") {
            lovRetVars = lovRetVars + lovrtnfld + "~";
        }
        else {
            lovRetVars = lovRetVars + "~";
        }
    }

    document.getElementById("RETURN_FLDS").value = lovRetVars;

    var lovBindVars = "";

    for (j = 0;j < table_bnd.length;j++) {
        lovBindfld = table_bnd[j].cells[2].getElementsByTagName("SELECT")[0].value;
        lovBindVarType = table_bnd[j].cells[3].getElementsByTagName("INPUT")[0].value;
        lovBindVars = lovBindVars + lovBindfld + ':' + lovBindVarType + '~';
    }
    document.getElementById("BIND_FLDS").value = lovBindVars;

}

function fnAppendLovSum() {
    Fn_definVals();
    var tableObject = parent.document.getElementById(tblname);
    tableObject.tBodies[0].rows[Cur_Row].cells[4].getElementsByTagName("INPUT")[0].value = document.getElementById("LOV_NAME").value;
    tableObject.tBodies[0].rows[Cur_Row].cells[5].getElementsByTagName("INPUT")[0].value = document.getElementById("MIN_CHAR_LEN").value;
    tableObject.tBodies[0].rows[Cur_Row].cells[6].getElementsByTagName("INPUT")[0].value = document.getElementById("RETURN_FLDS").value;
    tableObject.tBodies[0].rows[Cur_Row].cells[7].getElementsByTagName("INPUT")[0].value = document.getElementById("BIND_FLDS").value;

}

function FnShowTabs_Lov(divid) {

    var tablist = "DIV_RTN_FLD~DIV_BIND_VRBLS";
    tablist = tablist.split('~');
    for (var i = 0;i < tablist.length;i++) {
        if (document.getElementById(tablist[i])) {
            document.getElementById(tablist[i]).style.display = "none";
            document.getElementsByName("TAB_" + tablist[i])[0].style.borderBottom = "1px solid #fff";
            document.getElementsByName("TAB_" + tablist[i])[0].style.background = "url(Images/Flexblue/RTabLeft.gif) no-repeat left top";
            document.getElementsByName("SP_" + tablist[i])[0].style.background = "url(Images/Flexblue/RTabRight.gif) no-repeat right top";
        }
    }
    document.getElementById(divid).style.display = "block";
    document.getElementsByName("TAB_" + divid)[0].style.borderBottom = "1px solid #fff";
    document.getElementsByName("TAB_" + divid)[0].style.background = "url(Images/Flexblue/RTabSLeft.gif) no-repeat left top";
    document.getElementsByName("SP_" + divid)[0].style.background = "url(Images/Flexblue/RTabSRight.gif) no-repeat right top";
}

function fn_default_Lof() {
    var obj = "";
    obj = document.getElementsByTagName('SELECT')[0];
    var list = parent.glblLovList.split("~");
    var cloumns = list.length;

    
    obj.length = 0;
    var j = 0;
    var i = 0;
	addOption(obj, "", "", true);
    var LOVLIST = selectNodes(parent.dom, "//RAD_LOVS"); 
    if (LOVLIST.length != 0) {
        for (var j = 0;j < LOVLIST.length;j++) {
            var llist = getNodeText(selectSingleNode(LOVLIST[j], "LOV_NAME"));
            addOption(obj, llist, llist, false);
        }
    }
    for (var i = 0;i < cloumns;i++) {
        if (list[i] != "")
            addOption(obj, list[i], list[i], false);

    }
     
}

function addOption(obj, text, value, selected) {
    if (obj != null) {
        obj.options[obj.options.length] = new Option(text, value, false, selected);
    }
}

function FnDeflt_bnd_Ret(condition, tableName, flag) {
    lovname = document.getElementsByName('LOV_NAME')[0].value;
    if (lovname != "") {
        if (parent.glblLovRetFldsList[lovname] != undefined)
            var globalLovDet = parent.glblLovRetFldsList[lovname].split("!");

        var radlov = selectSingleNode(parent.dom, ("//RAD_LOVS[LOV_NAME ='" + lovname + "']"));
        if (radlov != null) {
            var LovQuery = getNodeText(selectSingleNode(radlov, "LOV_QUERY"));
            var bindVarCount = LovQuery.split('?');
            var obj = "";
            if (condition == "Bind" && bindVarCount.length == 1 && flag == "") {
                alertMessage("No bind variables", "E");
            }
            deleteAll(tableName);
            for (var j = 0;j < bindVarCount.length - 1;j++) {
                addNewRow(tableName);
            }
        }
        else {
            var LovQuery = globalLovDet[0];
            var bindVarCount = LovQuery.split('?');
            var obj = "";
            if (condition == "Bind" && bindVarCount.length == 1 && flag == "") {
                alertMessage("No Bind Variables", "E");
            }
            deleteAll(tableName);
            for (var j = 0;j < bindVarCount.length - 1;j++) {
                addNewRow(tableName);
            }
        }
    }
}

function fn_populate_Blocks_toBlkLovFlds(tablename, cellno, event) {

    var obj = "";
    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;
    var sumblock = getNodeText(selectNodes(parent.dom, "//RAD_FUNCTIONS/RAD_KERNEL/RAD_SUMMARY/RSLT_DATABLK")[0]);
    if (tablen != 0) {
        for (var j = 0;j < tablen;j++) {
            obj = tab.rows[j].cells[cellno].getElementsByTagName('SELECT')[0];
            obj.options.length = 0
            var blks = selectNodes(parent.dom, ("//RAD_DATA_BLOCKS"));
            var blkslen = blks.length;
            addOption(obj, sumblock, sumblock, true);

        }

    }
    if (tablename == "bindvar") {
        fn_Populate_BlkFields_toRetunflds(tablename, "1", "2", event);
    }
    else 
        fn_Populate_BlkFields_toRetunflds(tablename, "2", "3", event);
}

function fn_Populate_BlkFields_toRetunflds(tableName, blkcelno, fldcelno, event) {
    var obj = "";
    var tab = document.getElementById(tableName).tBodies[0];
    var tablen = tab.rows.length;

    if (tablen != 0) {
        for (var j = 0;j < tablen;j++) {
            var blks = selectNodes(parent.dom, "//RAD_SUMMARY/SUMMARY_DETAILS");
            var blkslen = blks.length;

            obj = document.getElementById(tableName).tBodies[0].rows[j].cells[fldcelno].getElementsByTagName("SELECT")[0];
            obj.options.length = 0;
            addOption(obj, "", "", true);
            for (var i = 0;i < blkslen;i++) {
				if(getNodeText(selectSingleNode(blks[i], "QUERY"))=="Y")
                addOption(obj, getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), getNodeText(selectSingleNode(blks[i], "FIELD_NAME")), false);
            }

        }
    }
}

function fn_showReturnFields(tableName, lovDetails) {

    var lovname = "";
    var globalLovDetails = "";
    lovname = document.getElementsByName('LOV_NAME')[0].value;
    if (lovname != "") {
        if (parent.glblLovRetFldsList[lovname] != undefined)
            globalLovDetails = parent.glblLovRetFldsList[lovname].split("!");

        var radlovs = selectNodes(parent.dom, "//RAD_LOVS[LOV_NAME ='" + lovname + "']");
        if (radlovs.length > 0) {
            var lovdetailslen = selectNodes(radlovs[0], "RAD_LOV_DETAILS").length;
            var lovdetails = selectNodes(radlovs[0], "RAD_LOV_DETAILS");
            deleteAll(tableName);

            for (var j = 0;j < lovdetailslen;j++) {
                var queeryfield = getNodeText(selectNodes(lovdetails[j], "QUERY_COLS")[0]);
                addNewRow(tableName);
                document.getElementsByName(tableName)[0].tBodies[0].rows[j].cells[1].getElementsByTagName("INPUT")[0].value = queeryfield;
            }
        }
        else {
            var radlovs = globalLovDetails[1].split("~");
            var lovdetailslen = radlovs.length;
            deleteAll(tableName);
            for (var j = 0;j < lovdetailslen - 1;j++) {
                addNewRow(tableName);
                document.getElementsByName(tableName)[0].tBodies[0].rows[j].cells[1].getElementsByTagName("INPUT")[0].value = radlovs[j];
            }
        }
    }

}

function fn_Defaul_LovDetails() {
    FnDeflt_bnd_Ret('Bind', 'bindvar', 'flag');
    fn_populate_Blocks_toBlkLovFlds('bindvar', 1, event);
    fn_showReturnFields('retflds', '');
    fn_populate_Blocks_toBlkLovFlds('retflds', 2, event);
}
</script>
</head>
<body style="background-color:#ffffff"  onload="fnInValues();fn_default_Lof();fnDefFldId()" onkeydown="fnAccessChildScreens(event)">
<div id="DIVWNDContainer">
	<div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle"  onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">Summary Details</h1>                                      
            <div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'"	onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE" onclick="if(this.disabled) return false; fnRADExitSub('ChildWin', event)">
					<span class="LBLinv">Close</span>
				</a>
			</div>
        </div>
	</div> 
<div   class="Subcontainer" name="DIV_ASSOCIATED_FIELDS_OUT" id="DIV_ASSOCIATED_FIELDS_OUT" TYPE="SINGLE" VIEW="NO">

<!--Form fields column one-->
<div class="DIVColumnOne" style="position:relative; margin-top:20px; margin-left:20px; margin-right:20px; width:AUTO;" >
<fieldset class="FSTstd"> 
<legend>Min Char Details</legend>

<div class="DIVText" >
<LABEL class="LBLstd" for="MIN_CHAR_LEN">Min search char length</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="MIN_CHAR_LEN" name="MIN_CHAR_LEN" value="" size="30">
</div>



</fieldset>

<fieldset class="FSTstd">
<legend>Lov Details</legend>

<div   STYLE="display:none" > 
  <INPUT aria-required="false"  type="hidden"  name="RETURN_FLDS" id="RETURN_FLDS" value="" > 
  <INPUT aria-required="false"  type="hidden"  name="BIND_FLDS" id="BIND_FLDS" value="" >   
 </div>

<div class="DIVText">
<LABEL class="LBLstd" for="LOV_NAME">LOV Name</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" name="LOV_NAME" id="LOV_NAME" onchange="fn_Defaul_LovDetails()">
</SELECT>
</div>
 

</fieldset>
<!--End of Form fields column two-->
</div> 

<div  class="DIVtab" name="BUTTONS" id="BUTTONS">
    <ul id="tablist" style="width:100%;">
        <li id="li_returnField" style="display:inline"><a class="Htaball" id="TAB_DIV_RTN_FLD" href="#nogo" name="TAB_DIV_RTN_FLD"  onclick="FnShowTabs_Lov('DIV_RTN_FLD')"><span id="SP_DIV_RTN_FLD" name ="SP_DIV_RTN_FLD">Return Fields</span></a></li>
		<li id="li_bindVariables" style="display:inline"><a class="Htaball" id="TAB_DIV_BIND_VRBLS" href="#nogo" name="TAB_DIV_BIND_VRBLS"  onclick="FnShowTabs_Lov('DIV_BIND_VRBLS')"><span id="SP_DIV_BIND_VRBLS" name="SP_DIV_BIND_VRBLS">Bind Variables</span></a></li>
    </ul>
</div> 
	
<div id="DIV_RTN_FLD" name="DIV_RTN_FLD" class="DIVMultipleBig" style="margin-left:20px;margin-right:20px;margin-top:20px;padding-top:0px;position:relative;width:90%">
	 <div class="DIVmultiplebox">
			<div class="MEButtons" id="retflds_ME" name="retflds_ME" >
				<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="rtnvar">Return Fields Mapping</div>
				<BUTTON class="Buttontext"  id="BTN_RT_LOV" onclick="fn_showReturnFields('retflds','');fn_populate_Blocks_toBlkLovFlds('retflds',2,event)">Default From Lov Definition</BUTTON>&nbsp;&nbsp;
    	    </div>
		<div class="DIVMultipleBigInner" style="height:250px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="retflds" name="retflds" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('retflds','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Query Column</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Block Name</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Return Field Name</span></th>  
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="retflds_TE" name="retflds_TE"  colspan="4"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>

<div id="DIV_BIND_VRBLS" name="DIV_BIND_VRBLS" class="DIVMultipleBig"  style="margin-left:20px;margin-right:20px;margin-top:20px;padding-top:0px;position:relative;width:90%">
	<div class="DIVmultiplebox" >
			<div class="MEButtons" id="bindvar_ME" name="bindvar_ME">
				<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="Bindvar">Bind Variables Mapping</div>
				<BUTTON class="Buttontext" id ="BTN_BV_LOV" onclick="FnDeflt_bnd_Ret('Bind','bindvar','');fn_populate_Blocks_toBlkLovFlds('bindvar',1,event)">Default From Lov Definition</BUTTON>&nbsp;&nbsp;
            </div>
		<div class="DIVMultipleBigInner" style="height:250px;overflow-x:hidden"  >
			<table onKeyDown="FnAcessTblkeys(this,event);"  id="bindvar" name="bindvar" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
			    <thead>
			    	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('bindvar','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Block Name</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Bind Variable</span></th> 
					<th scope="col" class="THgrid"><span class="SPNtext">Data Type</span></th>  
					</tr>
			    </thead>
			    <tbody></tbody>
			    <tfoot><tr><td scope="row" tabindex="0" id="bindvar_TE" name="bindvar_TE"  colspan="4"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
			</table>
		</div>
	</div>
</div>
  

</div>   
     <div style="float:right;padding-right:20px;padding-top:25px;" >
		<BUTTON class="BTNfooter" name="OK"  id="ok" onclick="fnAppendLovSum();fnRADExitSub('ChildWin', event);"  style="visibility:visible;height:25px;width :35px;">Ok</BUTTON>
		<BUTTON class="BTNfooter" id="Cancel" name="Cancel" onclick="fnRADExitSub('ChildWin', event);" style="height:25px;width :60px;">Cancel</BUTTON>
	</div> 
</div> 
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>
