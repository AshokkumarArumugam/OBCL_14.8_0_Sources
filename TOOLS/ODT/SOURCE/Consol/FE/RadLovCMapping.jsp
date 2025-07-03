<!--
  **
  **
  ** File Name  : RadLovCMapping.jsp
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
            
			 
var Lov_Id = '<%=ODTUtils.stripXSS(request.getParameter("lovName"))%>';
var functionname = '<%=ODTUtils.stripXSS(request.getParameter("functionname"))%>';
var LOV_DTLS = '<%=ODTUtils.stripXSS(request.getParameter("lovquery"))%>'; 
var tblname = "LOV_ENHANCER"; 

function fnInValues() { 
    parent.document.getElementById("IFCHILD").style.width = "650px";
    parent.document.getElementById("IFCHILD").style.height = "600px";
    document.getElementById("Cancel").focus();
	FnShowTabs_Lov('DIV_RTN_FLD');
	fnDefFldId();
}

function fnDefFldId() {
    document.getElementById("LOV_NAME").value = Lov_Id;
    document.getElementById("FUNCTION_NAME").value = functionname;
    document.getElementById("LOV_QRY_DTLS").value = LOV_DTLS; 
    document.getElementById("EXTERNAL_LOV_NAME").value=parent.document.getElementById("EXTERNAL_LOV_NAME_LOVDTLS").value;
    document.getElementById("LOV_FUNC_NAME").value=parent.document.getElementById("LOV_FUNC_NAME_LOVDTLS").value;
    document.getElementById("NO_DATA_FRM_EXT_SYS_PREF").value=parent.document.getElementById("NO_DATA_FRM_EXT_SYS_PREF_LOVDTLS").value;
    document.getElementById("LOV_ID_OTHER").value=parent.document.getElementById("LOV_ID_OTHER_LOVDTLS").value;

   var retnrflds= LOV_DTLS.split("?")[1];
     retnrflds=retnrflds.replace(/,/g,"~");
    var rtnfl =retnrflds.split("~");
     var rtdnfl=""; 
     var l=1;
    for(var j=0;j<=rtnfl.length;j++){
    	if(rtnfl[j]!="" && rtnfl[j] != undefined)
    	rtdnfl+=rtnfl[j]+"--"+l+"~";
    	l++;
    }
     
    document.getElementById("RETURN_FLDS").value = rtdnfl; 
    var bnddtls="";
    for(var j=1;j<=LOV_DTLS.split("?")[0];j++){
    	bnddtls+="BIND"+ j+"~";
    } 
    document.getElementById("BIND_FLDS").value = bnddtls;   
    fn_ShowData();
}

function fn_ShowData() {
fn_Defaul_LovDetails();
 
var tableObject = parent.document.getElementById(tblname);
var res=parent.document.getElementById("COMBINED_DTLS_LOVDTLS").value
if(res=="")
	return;
res=res.split("~");
 
var tableObj = document.getElementById('REDUCTION_MAP').tBodies[0]; 
var tbllen=tableObj.rows
var x = res[0]; 
x=x.split(",");
var z="";
for (i = 0; i <  x.length; i++) {
	z=x[i].split(":");
	 
	    for (var n = 0;n < tbllen.length;n++) {
  	   if(tableObj.rows[n].cells[1].getElementsByTagName("INPUT")[0].value ==z[0]){ 
  		 tableObj.rows[n].cells[2].getElementsByTagName("INPUT")[0].value= z[1];
  		 break;
  	   } 
     }  
} 
 
var y = res[1]; 
y=y.split(",");
for (i = 0; i < y.length; i++) {
	if(y[i]!="")
	  addOption(document.getElementById("BIND_VAR_B"), y[i], y[i], false);
}   
}
 
function fnAppendLovSum(event) { 
	    var tableObj = document.getElementById('REDUCTION_MAP').tBodies[0];
	    var txt1 = ""; 
	    var tbllen=tableObj.rows
	    for (var n = 0;n < tbllen.length;n++) {
     	   if(tableObj.rows[n].cells[2].getElementsByTagName("INPUT")[0].value!=""){ 
     		  txt1 +=  tableObj.rows[n].cells[1].getElementsByTagName("INPUT")[0].value+":"+tableObj.rows[n].cells[2].getElementsByTagName("INPUT")[0].value+","; 
     	   } 
        } 
	    var x = document.getElementById("BIND_VAR_B");
	    var txt2 = "";
	    var i;
	    for (i = 0; i < x.length; i++) {
	    	 txt2 +=  x.options[i].value+",";
	    } 
	    
	    parent.document.getElementById("EXTERNAL_LOV_NAME_LOVDTLS").value=document.getElementById("EXTERNAL_LOV_NAME").value;
	    parent.document.getElementById("LOV_FUNC_NAME_LOVDTLS").value=document.getElementById("LOV_FUNC_NAME").value;
	    parent.document.getElementById("NO_DATA_FRM_EXT_SYS_PREF_LOVDTLS").value=document.getElementById("NO_DATA_FRM_EXT_SYS_PREF").value;
	    parent.document.getElementById("LOV_ID_OTHER_LOVDTLS").value = document.getElementById("LOV_ID_OTHER").value;

	    
	    var res= txt1 + "~" + txt2; 
	    parent.document.getElementById("COMBINED_DTLS_LOVDTLS").value=res;
	    	
	    if(document.getElementById("EXTERNAL_LOV_NAME").value==""){
	    	  alertMessage("External LOV id is Mandatory.", "E");
	    	  return;
	    }
	    if(document.getElementById("LOV_FUNC_NAME").value ==""){
	    	  alertMessage("lov Function name is Mandatory.", "E");
	    	  return;
	    }
	     
    fnRADExitSub('ChildWin', event);
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

function addOption(obj, text, value, selected) {
    if (obj != null) {
        obj.options[obj.options.length] = new Option(text, value, false, selected);
    }
}

function FnDeflt_bnd_Ret(condition, tableName, flag) {
    lovname = document.getElementsByName('LOV_NAME')[0].value;
    if (lovname != "") { 
        var bindvariable = document.getElementById("BIND_FLDS").value;
        if (bindvariable != null) {
             var bindVarCount = bindvariable.split('~');
            var obj = "";
            if (condition == "Bind" && bindVarCount.length == 1 && flag == "") {
                alertMessage("No bind variables", "E");
            }
            
            for (var n = 0;n < bindVarCount.length;n++) {
                addOption(document.getElementById("BIND_VAR_A"), bindVarCount[n], bindVarCount[n], false);
            }
        } 
    }
}



function fn_showReturnFields(tableName, lovDetails) {

    var lovname = ""; 
    lovname = document.getElementsByName('LOV_NAME')[0].value;
    if (lovname != "") { 
    	 var retrnflds = document.getElementById("RETURN_FLDS").value; 
        if (retrnflds != null) {
            var retrnfldsCount = retrnflds.split('~'); 
           for (var n = 0;n < retrnfldsCount.length;n++) {
        	   if(retrnfldsCount[n]!=""){
        	   addNewRow("REDUCTION_MAP"); 	  		   
        	   document.getElementById('REDUCTION_MAP').tBodies[0].rows[n].cells[1].getElementsByTagName("INPUT")[0].value = retrnfldsCount[n]; 
        	   } 
           }
       } 
    }

}

function fn_Defaul_LovDetails() {
    FnDeflt_bnd_Ret('Bind', 'bindvar', 'flag'); 
    fn_showReturnFields('retflds', '');
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


function DataSrcDtls(a,b) {
    var arrFbox = new Array();
    var arrTbox = new Array();
    var arrLookup = new Array();
    var frombox = document.getElementById(a); 
    var fLength = 0;
    var tLength = 0; 
        for (i = 0;i < frombox.options.length;i++) {
            arrLookup[frombox.options[i].text] = frombox.options[i].value;
            if (frombox.options[i].selected && frombox.options[i].value != "") {
                arrTbox[tLength] = frombox.options[i].text;
                tLength++;
            }
            else {
                arrFbox[fLength] = frombox.options[i].text;
                fLength++;
            }

        }
        if (document.getElementById(b).options.length == "0") {
            for (var j = 0;j < arrTbox.length;j++) {
                addOption(document.getElementById(b), arrTbox[j], arrTbox[j], false);
            }
        }
        else {
            for (var j = 0;j < arrTbox.length;j++) {
                var add = 0;
                var rowlen = document.getElementById(b).options.length;
                for (var i = 0;i < rowlen;i++) {
                    if (arrTbox[j] == document.getElementById(b).options[i].text) {
                        add = 1;
                        break;
                    }
                }
                if (add != "1") {
                    addOption(document.getElementById(b), arrTbox[j], arrTbox[j], false);
                    add = 0;
                }

            }
        } 

}

function MoveToFieldset(frmname, fld, tableName) { 
	    var arrFbox = new Array();
	    var arrTbox = new Array();
	    var arrLookup = new Array();
	    var frombox = document.getElementById(fld); 
	    var addFlag = true; 
	    
	    var fLength = 0;
	    var tLength = 0;
	    for (i = 0;i < frombox.options.length;i++) {
	        arrLookup[frombox.options[i].text] = frombox.options[i].value;
	        if (frombox.options[i].selected && frombox.options[i].value != "") {
	            arrTbox[tLength] = frombox.options[i].text;
	            tLength++;
	        }
	        else {
	            arrFbox[fLength] = frombox.options[i].text;
	            fLength++;
	        }
	    }
	    if (arrTbox.length > 0) {
	        if (frombox.id == "REDUCTION_NAME_B" || frombox.id == "BIND_VAR_B") {
	            for (var j = 0;j < arrTbox.length;j++) {
	                var selectedfield = arrTbox[j]; 
	            } 
	        } 
	        else {
	            var Optlen = document.getElementById(fld).options.length;
	            for (var j = 0;j < arrTbox.length;j++) {
	                var selectedfield = arrTbox[j];
	                addNewRow(tableName);
	                var rowlen = document.getElementById(tableName).tBodies[0].rows.length;
	                document.getElementById(tableName).tBodies[0].rows[rowlen - 1].cells[1].getElementsByTagName("INPUT")[0].value = arrTbox[j];
	            }
	        }

	    }
	    else {
	        return true;
	    } 
	    for (var k = 0;k < arrTbox.length;k++) {
	        frombox.remove(arrTbox[k]);
	    }
	    var c;
	    frombox.length = 0;
	    for (c = 0;c < arrFbox.length;c++) {
	        if (arrFbox[c] != "") {
	            var no = new Option();
	            no.value = arrLookup[arrFbox[c]];
	            no.text = arrFbox[c];
	            frombox[c] = no;
	        }
	    }
	return true; 
	}
</script>
</head>
<body style="background-color:#ffffff"  onload="fnInValues();" onkeydown="fnAccessChildScreens(event)">
<div id="DIVWNDContainer">
	<div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle"  onmousedown="startDrag('ChildWin', event)"><h1 class="WNDtitletxt">External Lov Mapping Details</h1>                                      
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
<legend>Lov Details</legend>

<div   STYLE="display:none" > 
  <INPUT aria-required="false"  type="hidden"  name="LOV_QRY_DTLS" id="LOV_QRY_DTLS" value="" >  
  <INPUT aria-required="false"  type="hidden"  name="RETURN_FLDS" id="RETURN_FLDS" value="" >  
  <INPUT aria-required="false"  type="hidden"  name="BIND_FLDS" id="BIND_FLDS" value="" >  
 </div>

<div class="DIVText">
<LABEL class="LBLstd" for="LOV_NAME">LOV Name</LABEL>
<INPUT aria-required="false" type="text"    class="TXTro" readonly="readonly" name="LOV_NAME" id="LOV_NAME" />
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="FUNCTION_NAME">Function ID Name</LABEL>
<INPUT aria-required="false" type="text"    class="TXTro" readonly="readonly" name="FUNCTION_NAME" id="FUNCTION_NAME"  />
</div>
 
<div class="DIVText">
<LABEL class="LBLstd" for="EXTERNAL_LOV_NAME">External LOV Name</LABEL>
<INPUT aria-required="false" type="text"    class="TXTstd" name="EXTERNAL_LOV_NAME" id="EXTERNAL_LOV_NAME" size="60" />
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="LOV_FUNC_NAME">LOV Function Name</LABEL>
<INPUT aria-required="false" type="text"    class="TXTstd" name="LOV_FUNC_NAME" id="LOV_FUNC_NAME" size="60" />
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="EXTERNAL_LOV_NAME">NO DATA From EXT</LABEL>
<INPUT aria-required="false"  type="text" class="TXTstd"  name="NO_DATA_FRM_EXT_SYS_PREF" id="NO_DATA_FRM_EXT_SYS_PREF" size="60"/> 
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="LOV_FUNC_NAME">LOV Other Id</LABEL>
<INPUT aria-required="false"  type="text" class="TXTstd"  name="LOV_ID_OTHER" id="LOV_ID_OTHER" size="60"/>
</div>

</fieldset>
<!--End of Form fields column two-->
</div> 

<div  class="DIVtab" name="BUTTONS" id="BUTTONS">
    <ul id="tablist" style="width:100%;">
        <li id="li_returnField" style="display:inline"><a class="Htaball" id="TAB_DIV_RTN_FLD" href="#nogo" name="TAB_DIV_RTN_FLD"  onclick="FnShowTabs_Lov('DIV_RTN_FLD')"><span id="SP_DIV_RTN_FLD" name ="SP_DIV_RTN_FLD">Reduction Fields</span></a></li>
		<li id="li_bindVariables" style="display:inline"><a class="Htaball" id="TAB_DIV_BIND_VRBLS" href="#nogo" name="TAB_DIV_BIND_VRBLS"  onclick="FnShowTabs_Lov('DIV_BIND_VRBLS')"><span id="SP_DIV_BIND_VRBLS" name="SP_DIV_BIND_VRBLS">Bind Variables</span></a></li>
    </ul>
</div> 
	
<div id="DIV_RTN_FLD" name="DIV_RTN_FLD" class="DIVMultipleBig" style="margin-left:20px;margin-right:20px;margin-top:20px;padding-top:0px;position:relative;width:90%">
	 <div class="DIVmultiplebox">
			<div class="MEButtons" id="retflds_ME" name="retflds_ME" >
				<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="rtnvar">Reduction Fields Mapping</div>
				<!--  <BUTTON class="Buttontext"  id="BTN_RT_LOV" onclick="fn_showReturnFields('retflds','');fn_populate_Blocks_toBlkLovFlds('retflds',2,event)">Default From Lov Definition</BUTTON>&nbsp;&nbsp;-->
    	    </div>
		 
		<div  class="DIVMultipleBigInner" STYLE="height:200px;WIDTH:100%; clear:left;DISPLAY:BLOCK;padding-top:10px;" ALIGN="CENTER">
	<table role="presentation" summary="" id="REDUCTION_MAP" NAME="blkDsns" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
       <thead>
			       	<tr>
			    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('REDUCTION_MAP','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">Reduction Field</span></th>
			    	<th scope="col" class="THgrid"><span class="SPNtext">External Mapping</span></th>   
					</tr>
			    </thead>
        <tbody></tbody>
		<!--  	<tr>
		 <tbody>
			<tr>
            <td scope="col" class="thheaderlast" style="border:1px solid #a2c2e5;" align="center">Reduction Fields Available</td>
            <td scope="col" align="center">&nbsp;</td>
            <td scope="col" class="thheaderlast" style="border:1px solid #a2c2e5;" align="center">Reduction Fields Mapped</td>
        </tr>
	    <tr>
                <td align="center" style="border:1px solid #a2c2e5; background:#ffffff;"><SELECT aria-required="false" style="height:180px;width:260px;border:1px solid #CCCCCC" size="15" title="Datasource Available" name="REDUCTION_NAME_A" id="REDUCTION_NAME_A"></SELECT></td>
                <td width="15px" align="center">
                    <BUTTON title="Add" class="BUTTONInline" name="ADD1" onclick="DataSrcDtls('REDUCTION_NAME_A','REDUCTION_NAME_B');"><img src="Images/Last2.gif" alt="Add Datasource"></BUTTON>
                    <br>
                    <BUTTON title="Remove" class="BUTTONInline" name="DEL" onclick="MoveToFieldset('frmBlkDetlsQ','REDUCTION_NAME_B','blkDsnsq');"  value="DEL"><img src="Images/First2.gif" alt="Remove Datasource"></BUTTON>
                </td>
                <td align="center" style="border:1px solid #a2c2e5; background:#ffffff;">
                    <SELECT aria-required="false" style="height:180px;width:260px; border:1px solid #CCCCCC"   size="15" title="Datasource Added" name="REDUCTION_NAME_B" id="REDUCTION_NAME_B"></SELECT>
                </td>
	    </tr> 
		</tbody>-->
		<tfoot><tr><td scope="row" id="blkDsns_TE" NAME="blkDsns_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
	</table>
</div>
		
	</div>
</div>

<div id="DIV_BIND_VRBLS" name="DIV_BIND_VRBLS" class="DIVMultipleBig" style="margin-left:20px;margin-right:20px;margin-top:20px;padding-top:0px;position:relative;width:90%">
	<div class="DIVmultiplebox" >
			<div class="MEButtons" id="bindvar_ME" name="bindvar_ME">
				<div  style="width:AUTO;padding-left:30px; font-weight:bold; float:left;font-size:.8em" for="Bindvar">Bind Variables Mapping</div>
			<!--  <BUTTON class="Buttontext" id ="BTN_BV_LOV" onclick="FnDeflt_bnd_Ret('Bind','bindvar','');fn_populate_Blocks_toBlkLovFlds('bindvar',1,event)">Default From Lov Definition</BUTTON>&nbsp;&nbsp;-->
            </div> 
		<div STYLE="WIDTH:95%; clear:left;DISPLAY:BLOCK;padding-top:10px;" ALIGN="CENTER">
	<table role="presentation" summary="" id="blkDsns" NAME="blkDsns"  ALIGN="CENTER"  border="0" cellspacing="0" cellpadding="1" TYPE="BLOCK" PARENT="YES" VIEW="NO">
         <tr>
            <td scope="col" class="thheaderlast" style="border:1px solid #a2c2e5;" align="center">Bind Variables Available</td>
            <td scope="col" align="center">&nbsp;</td>
            <td scope="col" class="thheaderlast" style="border:1px solid #a2c2e5;" align="center">Bind Variables Mapped</td>
        </tr>
	    <tr>
                <td align="center" style="border:1px solid #a2c2e5; background:#ffffff;"><SELECT aria-required="false" style="height:180px;width:260px;border:1px solid #CCCCCC" size="15" title="Bind Variables Available" name="BIND_VAR_A" id="BIND_VAR_A"></SELECT></td>
                <td width="15px" align="center">
                    <BUTTON title="Add" class="BUTTONInline" name="ADD1" onclick="DataSrcDtls('BIND_VAR_A','BIND_VAR_B');"><img src="Images/Last2.gif" alt="Add Datasource"></BUTTON>
                    <br>
                    <BUTTON title="Remove" class="BUTTONInline" name="DEL" onclick="MoveToFieldset('frmBlkDetlsB','BIND_VAR_B','blkDsnsB');"  value="DEL"><img src="Images/First2.gif" alt="Remove Datasource"></BUTTON>
                </td>
                <td align="center" style="border:1px solid #a2c2e5; background:#ffffff;">
                    <SELECT aria-required="false" style="height:180px;width:260px; border:1px solid #CCCCCC"   size="15" title="Datasource Added" name="BIND_VAR_B" id="BIND_VAR_B"></SELECT>
                </td>
	    </tr> 
		</tbody>
		<tfoot><tr><td scope="row" id="blkDsns_TE" NAME="blkDsns_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
	</table>
</div>
	</div>
</div>
  

</div>   
     <div style="float:right;padding-right:20px;padding-top:25px;" >
		<BUTTON class="BTNfooter" name="OK"  id="ok" onclick="fnAppendLovSum(event);"  style="visibility:visible;height:25px;width :35px;">Ok</BUTTON>
		<BUTTON class="BTNfooter" id="Cancel" name="Cancel" onclick="fnRADExitSub('ChildWin', event);" style="height:25px;width :60px;">Cancel</BUTTON>
	</div> 
</div> 
<div id="masker" class="masker" style="display:none;">
<div id="Div_ChildWin" style="display:none; width:500px; height:200px"></div>  
</div>
</body>
</html>
