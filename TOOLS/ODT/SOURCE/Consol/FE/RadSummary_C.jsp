<!--
  **
  **
  ** File Name  : RadSummary.jsp
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
<script>

function fnpoplovs(tabfld) { 
 
    var tab = document.getElementById("SUM_DTLS").tBodies[0];
             
     for (var i=0;i<tab.rows.length;i++){
	 if( tab.rows[i].cells[2].getElementsByTagName('INPUT')[0].checked == true)
	  tab.rows[i].cells[3].getElementsByTagName('BUTTON')[0].disabled = false; 
	  else
	  tab.rows[i].cells[3].getElementsByTagName('BUTTON')[0].disabled = true;
	 }
    
}

function fnpoplovs2(tablename) {

    var obj = "";
    var tab = document.getElementById(tablename).tBodies[0];
    var tablen = tab.rows.length;
    for (var rl = 0;rl < tablen;rl++) {
        var flag = tab.rows[rl].cells[2].getElementsByTagName('INPUT')[0].status;
        obj = tab.rows[rl].cells[3].getElementsByTagName('SELECT')[0];

        if (flag == true) {
            tab.rows[rl].cells[3].getElementsByTagName('SELECT')[0].disabled = false;
            var res = tab.rows[rl].cells[3].getElementsByTagName('SELECT')[0].value;

            var list = glblLovList.split("~");
            var cloumns = list.length;

            addOption(obj, "", "", true);
            obj.length = 0;
            var j = 0;
            var i = 0;
            var LOVLIST = selectNodes(dom, "//RAD_LOVS");
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
            addOption(obj, "", "", false);

            tab.rows[rl].cells[3].getElementsByTagName('SELECT')[0].value = res;
        }
        else {
            addOption(obj, "", "", true);
            obj.length = 0;
            tab.rows[rl].cells[3].getElementsByTagName('SELECT')[0].disabled = true;
            tab.rows[rl].cells[3].getElementsByTagName('SELECT')[0].value = "";

        }
    }

}
function fnpoplovs1(tablename) {
			 
			 var obj="";
	         var tab=document.getElementById(tablename).tBodies[0];
             var tablen=tab.rows.length;
			 var blkfldlovarray= new Array();
			 var lovcount=0;
			 var blkKerName = document.getElementById('RSLT_DATABLK').value;
                var blkflds = selectNodes(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + blkKerName + "']/RAD_BLK_FIELDS");
                for (var bkf = 0;bkf < blkflds.length;bkf++) {
                var fldKfldName = getNodeText(selectSingleNode(blkflds[bkf], "FIELD_NAME"));
                var fldKdispTyp = getNodeText(selectSingleNode(blkflds[bkf], "DISPLAY_TYPE"));
                var lclLovName = getNodeText(selectSingleNode(blkflds[bkf], "LOV_NAME"));
				if(fldKdispTyp=='LOV' && lclLovName!='' ){
				blkfldlovarray[lovcount]=fldKfldName;
				lovcount++;
				}
				}
				
    for (var rl = 0;rl < tablen;rl++) {
			   var flag=tab.rows[rl].cells[2].getElementsByTagName('INPUT')[0].checked;
		        obj=tab.rows[rl].cells[3].getElementsByTagName('SELECT')[0];
			           
        if (flag == true) {
			   tab.rows[rl].cells[4].getElementsByTagName('INPUT')[0].disabled=false;
			   tab.rows[rl].cells[3].getElementsByTagName('SELECT')[0].disabled=false;

			   var res=tab.rows[rl].cells[3].getElementsByTagName('SELECT')[0].value;
			   var lovlist= new Array();
		       var list=glblLovList.split("~");	
            if (list.length >= 2) {
                     obj.length=0;
                     addOption(obj,"","",true);                     					 
                     var j=0;
 				     var i=0;
                     var LOVLIST=selectNodes(dom,"//RAD_LOVS"); 
                if (LOVLIST.length != 0) {
                    for (j = 0;j < LOVLIST.length;j++) {
							 lovlist[j] = getNodeText(selectSingleNode(LOVLIST[j],"LOV_NAME"));
                             }		
                      } 					 
                      
                     var sumFldName = tab.rows[rl].cells[1].getElementsByTagName('INPUT')[0].value;
					
                for (i = 0;i < lovlist.length;i++) {
					 if(lovlist[i]=='LOV_'+sumFldName){
					  addOption(obj, 'LOV_'+sumFldName, 'LOV_'+sumFldName,false);
					 break;
					 }
			         }
                }
				
				tab.rows[rl].cells[3].getElementsByTagName('SELECT')[0].value=res;
				var fieldname=tab.rows[rl].cells[1].getElementsByTagName('INPUT')[0].value;
				var lovflag=false;
				for(var k=0;k<blkfldlovarray.length;k++){
				if(blkfldlovarray[k]==fieldname){
				lovflag=true;
				break;
				}				
				}
				
	   }
        else {
	    addOption(obj,"","",true);
        obj.length=0; 
		tab.rows[rl].cells[3].getElementsByTagName('SELECT')[0].disabled=true;
	   	tab.rows[rl].cells[3].getElementsByTagName('SELECT')[0].value="";
		tab.rows[rl].cells[4].getElementsByTagName('INPUT')[0].disabled=true;
	   	tab.rows[rl].cells[4].getElementsByTagName('INPUT')[0].value="";
	   
	   }
 }
 
 }
 
 function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
</script>

<div class="titlecontainer">
<span class="Subheader"><h2>Summary Details</h2></span>
<span class="funcbtn">
<BUTTON class="func_btn_1" name="preview" id="preview" onclick="showPreview('SUMMARY')" title="preview"><img src="Images/preview.gif"  alt="Preview"></BUTTON>
<BUTTON class="func_btn_1" title="Undo" name="Undo" id="Undo"  onclick="showData('');PopulateDataSourceForSummary('S');"><img src="Images/rollback.gif" alt="Roll Back"></BUTTON>
</span>
</div>
 
<div   class="Subcontainer" name="SUM1" id="SUM1" TYPE="SINGLE" >

<!--Form fields column one-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell"> 

<div class="DIVText"  >
<LABEL class="LBLstd" for="TITLE">Title</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="TITLE" name="TITLE" value="" size="40">
<BUTTON    class="BTNimg"  title="List Of Values" tabindex="-1"  id="BTN_LBLCD" onclick="LOV_LABEL_CODE.show_lov('TITLE~','frmSum','', 'Label Code', 'Label Code~Label Description', 'Label Code~Label Description',event)">
<span class="ICOlov"></span></BUTTON>
</div> 

<div class="DIVText"  >
<LABEL class="LBLstd" for="RSLT_DATABLK">Data Blocks</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd"  id="RSLT_DATABLK" name="RSLT_DATABLK" onchange="PopulateDataSourceForSummary('C')" value="" width="200" style="width:200px" >
</SELECT>
</div>


<div class="DIVText"  >
<LABEL class="LBLstd" for="RSLT_DATASRC">Data Source</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" id="RSLT_DATASRC" name="RSLT_DATASRC" onchange="PopulatefiledsForSummary('','','YES')" value="" width="200" style="width:200px" >
</SELECT>
</div>

<div class="DIVText">
<LABEL class="LBLstd" for="SUMMARY_TYPE">Summary Type</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" name="SUMMARY_TYPE" id="SUMMARY_TYPE">
	<option selected value="S">Summary</option>
        <option value="Q">Query</option>
        <option value="B">Bulk Authorization</option>
        <option value="U">Upload</option>
</SELECT>
</div>	

<div class="DIVText">
<LABEL class="LBLstd" for="SUM_SCREEN_SIZE">Summary Screen Size</LABEL>
<SELECT aria-required="false"  width="200" style="width:200px" class="SELstd" name="SUM_SCREEN_SIZE" id="SUM_SCREEN_SIZE"> 
	<option selected="Medium" value="MEDIUM">Medium</option>
	<option value="LARGE">Large</option>
</SELECT>
</div>	

<div class="DIVText">
<LABEL class="LBLstd" for="SUM_RESULT_ROWS">Result Rows</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="SUM_RESULT_ROWS" name="SUM_RESULT_ROWS" value="" size="40" >
</div>

<div class="DIVCheck" role="group" aria-labelledby="groupidpymt"> 
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="BLIND_SEARCH" >
<INPUT aria-required="false" type="checkbox" class="CHKstd"  name="BLIND_SEARCH" id="BLIND_SEARCH" >Criteria Based Search</LABEL>
</div>
</div>

<!-- 121
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt"> 
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="DETAIL_REQ" >
<INPUT aria-required="false" type="checkbox" class="CHKstd"  name="DETAIL_REQ" id="DETAIL_REQ" >Multi Detail Screen Required</LABEL>
</div>
</div>
-->

</fieldset>
</div>
<!--End of Form fields column one-->

<!--Form fields column two-->
<div class="DIVColumnOne"  style="width:48%">
<fieldset class="FSTcell" > 
 
<div class="DIVText">
<LABEL class="LBLstd" for="RAD_SUMMARY_WHERECLAUSE">Default Where Clause</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RAD_SUMMARY_WHERECLAUSE" id="RAD_SUMMARY_WHERECLAUSE" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('frmSum','RAD_SUMMARY_WHERECLAUSE','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div> 

<div class="DIVText">
<LABEL class="LBLstd" for="RAD_SUMMARY_ORDERBY">Default Order By</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RAD_SUMMARY_ORDERBY" id="RAD_SUMMARY_ORDERBY" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('frmSum','RAD_SUMMARY_ORDERBY','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div>
 
<div class="DIVText">
<LABEL class="LBLstd" for="RAD_MULTIBRN_WHERECLAUSE">Multi Branch Where Clause</LABEL>
<INPUT aria-required="false" class="TXTstd" type="text" name="RAD_MULTIBRN_WHERECLAUSE" id="RAD_MULTIBRN_WHERECLAUSE" value="" size="40">
<BUTTON class="BTNimg" title="Click to expand" tabindex="-1" onclick="popupedit('frmSum','RAD_MULTIBRN_WHERECLAUSE','',event)">
<span class="ICOnarrative"></span></BUTTON>
</div>
   
<div class="DIVText">
<LABEL class="LBLstd" for="MAIN_SUMM_SCR">Main Summary Screen</LABEL>
<INPUT aria-required="false"  class="TXTstd" type="text"  id="MAIN_SUMM_SCR" name="MAIN_SUMM_SCR" value="" size="40" >
</div>
 			
   
<div class="DIVCheck" role="group" aria-labelledby="groupidpymt"> 
<b class="LBLstd" id="groupidpymt">&nbsp;</b>
<div class="DIVchkrad">
<LABEL class="LBLauto" for="SUMMARY_WEBSERVICE_REQD" >
<INPUT aria-required="false" type="checkbox" class="CHKstd"  name="SUMMARY_WEBSERVICE_REQD" id="SUMMARY_WEBSERVICE_REQD">WebServices Required</LABEL>
</div>
</div>
 
</fieldset>
<!--End of Form fields column two-->
</div> 
</div> 
 
<div class="DIVtab" name="BUTTONSUMMARY" id="BUTTONSUMMARY">
    <ul id="tablist">
        <li id="li_dataBlockFields"><a class="Htaball" id="TAB_DIV_DBF" name="TAB_DIV_DBF" href="#nogo" onclick="FnShowTabs('DIV_DBF')"><span id="SP_DIV_DBF" name="SP_DIV_DBF">Data Block Fields</span></a></li>
      <!--  <li id="li_customButtons"><a class="Htaball" id="TAB_DIV_CB" name="TAB_DIV_CB" href="#nogo" onclick="FnShowTabs('DIV_CB')"><span id="SP_DIV_CB" name="SP_DIV_CB">Custom Buttons</span></a></li> -->
        <li id="li_sumfldorders"><a class="Htaball" id="TAB_DIV_SUMORDER" name="TAB_DIV_SUMORDER" href="#nogo" onclick="FnShowTabs('DIV_SUMORDER')"><span id="SP_DIV_SUMORDER" name="SP_DIV_SUMORDER">Fields Ordering</span></a></li>
    </ul>
</div> 
 
              
<div class="DIVTabPageContent">  
    <div name="DIV_DBF" id="DIV_DBF" class="DIVMultipleBig" align="center">
        <div style="width:900px;">
            <table  border="0" cellspacing="0" cellpadding="1">
                <tbody>
	    		<tr>
                <td>
                <div style="border:1px solid #a2c2e5; background:#ffffff;">
				<table id="DatablkfldsSUM" name="DatablkfldsSUM" border="0" cellspacing="0" cellpadding="1">
                <tr>
                <th class="thheader" scope="col"><span>Data Block Fields</span></th>
                </tr>
                <tr>
                <td align="right">
                <SELECT aria-required="false" multiple style="height:210px;width:300px;border:1px solid #CCCCCC" title="Data Block Fields" name="DATASRC_SUM_FIELDS_LIST " id="DATASRC_SUM_FIELDS_LIST" ></SELECT>
                </td>
                </tr>
                </table>
                </div>
				</td>
                
                <td>
                <BUTTON title="Add" class="BUTTONInline" name="ADD1" onclick="MoveToFieldset('frmSum','DATASRC_SUM_FIELDS_LIST','SUM_DTLS')"><img src="Images/Last2.gif" alt="last" ></BUTTON>
                <br>
                <BUTTON title="Remove" class="BUTTONInline" name="DEL" onclick="MoveToDtBlkFlds('frmSum','SUM_DTLS','DATASRC_SUM_FIELDS_LIST')"  value="DEL"><img src="Images/First2.gif" alt="first" ></BUTTON>                            
                </td>
        
                <td valign="top" >
				<div style=" height:230px;overflow:auto; border:1px solid #a2c2e5; background:#ffffff;">
	    			<table onKeyDown="FnAcessTblkeys(this,event);"  summary="Multi Tenor" class="TBLgrid" id="SUM_DTLS" name="SUM_DTLS" TYPE="MULTIPLE" VIEW="NO" PARENT="YES" width ="100%" border="0" cellpadding="1" cellspacing="0"  valign="left" align="left">
	    		    <tHead>
	    			<th scope="col" class="thheader" align="center"><INPUT aria-required="false" type="checkbox" title="Select All Rows" name='SEL_ALL_PREF' id='SEL_ALL_PREF' onclick="checkAll('SUM_DTLS','checkgroup','SEL_ALL_PREF')"></th>
	    			<th scope="col" class="thheader" align="center"><span>Fields Selected</span></th>
                    <th scope="col" class="thheader" align="center"><span>Query</span></th>
                    <th scope="col" class="thheader" align="center"><span>Advance Query</span></th>
                    <th scope="col" class="thheader" align="center"><span>Result</span></th>  	
	    	        </tHead>
	    			<tbody>
	    			</tbody>
					<tfoot><tr><td scope="row" id="SUM_DTLS_TE1" name="SUM_DTLS_TE1" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
	         		</table>
	    		</div>
                </td>
                </tr>
				</tbody>
				<tfoot><tr><td scope="row" id="SUM_DTLS_TE" name="SUM_DTLS_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
	        </table>
		</div>
	</div>   
    
	<!--DIV_CB starts-->
	<!-- <div name="DIV_CB" id="DIV_CB" class="DIVMultipleBig" >
        <div   class="Subcontainer" name="BUTTONS_NO" id="BUTTONS_NO" TYPE="SINGLE" > 
            <div class="DIVColumnOne"  style="width:48%">
            <fieldset class="FSTcell"> 
              
            <div class="DIVText"  >
            <LABEL class="LBLstd" for="NUMBER_OF_ROWS">Number of Rows</LABEL>
            <INPUT aria-required="false"  class="TXTstd" type="text"  id="NUMBER_OF_ROWS" name="NUMBER_OF_ROWS" value="" size="40" onkeypress="return isNumberKey(event)">
            </div> 
            
            
            </fieldset>
            </div>
			<div class="DIVColumnOne"  style="width:48%">
            <fieldset class="FSTcell"> 
              
            <div class="DIVText"  >
            <LABEL class="LBLstd" for="BUTTONS_PER_ROW">Number of Buttons/Row</LABEL>
            <INPUT aria-required="false"  class="TXTstd" type="text"  id="BUTTONS_PER_ROW" name="BUTTONS_PER_ROW" value="" size="40" onkeypress="return isNumberKey(event)">
            </div> 
            
            </fieldset>
            </div>
        </div>
        <div class="DIVMultipleBig" style="position:relative; margin-top:40px; margin-left:20px; margin-right:20px; width:AUTO;">
	         <div class="DIVmultiplebox">
	         	<div class="MEButtons" id="sum_cust_btn_ME" name="sum_cust_btn_ME" >
					<BUTTON title="Add Row"  id="ADD" name="ADD" onclick="addNewRow('sum_cust_btn')" class="BTNimg"><span class="ICOadd" tabindex="-1"><span class="LBLinv">Add Row</span></span></BUTTON>
	         		<BUTTON title="Delete Row"  id="DEL" name="DEL" onclick="delRow('sum_cust_btn')" class="BTNimg"><span class="ICOremove" tabindex="-1"><span class="LBLinv">Delete Row</span></span></BUTTON>
	         	</div>
			<div class="DIVMultipleBigInner" style="overflow-x:hidden"  >
	         		<table onKeyDown="FnAcessTblkeys(this,event);" id="sum_cust_btn" name="sum_cust_btn" summary="Multi Tenor" width="100%" TYPE="MULTIPLE" PARENT="YES" VIEW="NO" class="TBLgrid" caption="Multi Tenor" border="0" cellpadding="0" cellspacing="0">
	         		    <thead>
	         		    	<tr>
	         		    	<th scope="col" class="THgrid1"><INPUT aria-required="false" title="Select All Rows" id="SEL_ALL_PREF" name="SEL_ALL_PREF" class="CHKstd" type="checkbox" onclick="checkAll('sum_cust_btn','checkgroup','SEL_ALL_PREF')"><span class="LBLinv">Select All Rows</span></th>
	         		    	<th scope="col" class="THgrid"><span class="SPNtext">Field Name</span></th>
	         		    	<th scope="col" class="THgrid"><span class="SPNtext">Label</span></th>
	         		    	<th scope="col" class="THgrid"><span class="SPNtext">Function Name</span></th> 
	         				</tr>
	         		    </thead>
	         		    <tbody></tbody>
	         		    <tfoot><tr><td scope="row" id="sum_cust_btn_TE" name="sum_cust_btn_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
	         		</table>
	         	</div>
	         </div>
        </div> 
    </div>
	-->
	
	<!--DIV_SUMORDER starts-->
	<div name="DIV_SUMORDER" id="DIV_SUMORDER" class="DIVMultipleBig" align="center">
        <div style="width:900px;" >
            <table  border="0" cellspacing="0" cellpadding="1">
                <tbody>
	    		<tr>
                <td>
				<div class="DIVColumnOne"  style="height:230px;overflow:auto;border:1px solid #a2c2e5; background:#ffffff;">
	    			<table onKeyDown="FnAcessTblkeys(this,event);"  summary="Multi Tenor" class="TABLEData" id="SUM_QUERY_ORDER" name="SUM_QUERY_ORDER" TYPE="MULTIPLE" VIEW="YES" PARENT="NO" width ="100%" border="0" cellpadding="1" cellspacing="0"  valign="left" align="left">
	    			<tHead>
	    			<th scope="col" class="thheader" align="center"><span>Query Fields</span></th> 
					<th scope="col" class="thheader" align="center"><BUTTON class="THgrid"  onclick="fnsorttable(1,'SUM_QUERY_ORDER')"><span class="SPNtext">Order</span></BUTTON></th>
	    	        </tHead>
	    			<tbody>
	    			</tbody>
					<tfoot><tr><td scope="row" id="SUM_QUERY_ORDER_TE1" name="SUM_QUERY_ORDER_TE1" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
	         		</table>
	    		</div>
				</td> 
				 
				 <td>
                <div style="display:none">
				<INPUT aria-required="false"  class="TXTstd" type="text"  id="SUM_QUERYORDER" name="SUM_QUERYORDER" value="">
				<INPUT aria-required="false"  class="TXTstd" type="text"  id="SUM_RESULTORDER" name="SUM_RESULTORDER" value="">
				</div>
                 </td>
                
				<td valign="top" >
				<div class="DIVColumnOne"  style="height:230px;overflow:auto;margin-left:40px; border:1px solid #a2c2e5; background:#ffffff;">
	    			<table onKeyDown="FnAcessTblkeys(this,event);"  disabled readonly summary="Multi Tenor" class="TABLEData" id="SUM_RESULT_ORDER" name="SUM_RESULT_ORDER" TYPE="MULTIPLE" VIEW="YES" PARENT="NO" width ="100%" border="0" cellpadding="1" cellspacing="0"  valign="left" align="left">
	    			<tHead>
	    			<th scope="col" class="thheader" align="center"><span>Resultset Fields</span></th> 
					<th scope="col" class="thheader" align="center"><BUTTON class="THgrid"  onclick="fnsorttable(1,'SUM_RESULT_ORDER')"><span class="SPNtext">Order</span></BUTTON></th>
	    	        </tHead>
	    			<tbody>
	    			</tbody>
					<tfoot><tr><td scope="row" id="SUM_RESULT_ORDER_TE1" name="SUM_RESULT_ORDER_TE1" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
	         		</table>
	    		</div>
                </td>
                </tr>
				</tbody>
				<tfoot><tr><td scope="row" id="SUM_RESULT_ORDER_TE" name="SUM_RESULT_ORDER_TE" tabindex="0" colspan="8"><span class="LBLinv">End of table</span>&nbsp;</td></tr></tfoot>
	        </table>
		</div>
    </div>
	

</div> 