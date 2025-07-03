/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadMultipleTables.js
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
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  -------------------------------------------------------------------------------------------------------
*/

function getTabelRow(tableName) {
    var trow = "";
    if (tableName == 'datasources') {
        trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"35\" id=DATASRC_NAME_GRID border=\"0\" readonly=\"yes\"  name=DATASRC_NAME ondblclick=\"Fndetailvw(this.value)\"></TD>" + "<TD><INPUT aria-required=\"false\"  type=\"text\" size=\"35\" id=PARENT_DATASRC readonly=\"yes\" maxLength=125 name=PARENT_DATASRC></TD>" + "<TD><INPUT aria-required=\"false\"  type=\"text\" size=\"43\" id=RELATION_WITH_PARENT_GRID readonly=\"yes\" maxLength=125 name=RELATION_WITH_PARENT_GRID><BUTTON class=\"BTNimg\" title=\"Click to expand\" tabindex=\"-1\" onclick=\"popupedit('datasources','RELATION_WITH_PARENT_GRID',2,event)\"><span class=\"ICOnarrative\"></span></BUTTON></TD>" + "<TD><SELECT aria-required=\"false\"  id=RELATION_TYPE_GRID  disabled=true name=RELATION_TYPE><option value=\"1\">One To One</option><option value=\"N\">One To Many</option></SELECT></TD>"
    }
    else if (tableName == 'dataBlockGrid') {
        trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"35\" id=BLOCK_NAME readonly=\"yes\" name=BLOCK_NAME ondblclick=\"Fndetailvw(this.value)\"> </TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"35\" id=BLOCK_PARENT readonly=\"yes\" name=BLOCK_PARENT></TD>" + "<TD><SELECT aria-required=\"false\"  id=RELATION_TYPE_DBGRID  disabled=true name=RELATION_TYPE><option value=\"1\">One To One</option><option value=\"N\">One To Many</option></SELECT></TD>"
    }
    else if (tableName == 'Screens') {
        trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"35\" id=SCREEN_NAME_GRID readonly=\"yes\" name=SCREEN_NAME ondblclick=\"Fndetailvw(this.value)\"></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"35\" id=SCREEN_TITLE_GRID readonly=\"yes\" name=SCREEN_TITLE> </TD>" + "<TD><SELECT aria-required=\"false\" id=SCREEN_SIZE_GRID disabled=true name=SCREEN_SIZE><OPTION VALUE=SMALL>Small</OPTION><OPTION VALUE=MEDIUM>Medium</OPTION><OPTION VALUE=LARGE>Large</OPTION></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=MAIN_SCREEN_GRID disabled=true name=MAIN_SCREEN><OPTION VALUE=Y>Yes</OPTION><OPTION VALUE=N>No</OPTION></SELECT></TD>"
    }
    else if (tableName == 'fieldsetgrid') {
        trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"26\" id=FIELDSET_NAME_GRID readonly=\"yes\" name=FIELDSET_NAME ondblclick=\"Fndetailvw(this.value)\"> </TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"20\" id=FIELDSET_SCREEN readonly=\"yes\" name=FIELDSET_SCREEN></TD>" + "<TD><SELECT aria-required=\"false\" id=FIELDSET_PORTION disabled=true name=FIELDSET_PORTION><option value=BODY>Body</option><option value=HEADER>Header</option><option value=FOOTER>Footer</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"20\" id=FIELDSET_TAB readonly=\"yes\" name=FIELDSET_TAB></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"20\" id=FIELDSET_SECTION readonly=\"yes\" name=FIELDSET_SECTION></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"26\" id=FIELDSET_PARTITION_GRID readonly=\"yes\" name=FIELDSET_PARTITION></TD>"
    }
    else if (tableName == 'lovgrid') {
        trow = "<TD><INPUT aria-required=\"false\" id=LOV_NAME_QUERY size=40 readonly=\"yes\"  name=LOV_NAME_QUERY type=\"text\" ondblclick=\"Fndetailvw(this.value)\"></TD>" + "<TD><INPUT aria-required=\"false\" id=LOV_QUERY size=120 readonly=\"yes\"  name=LOV_QUERY><BUTTON class=\"BTNimg\" title=\"Click to expand\" tabindex=\"-1\" name=\"ADD\" value=\"ADD\" type=\"text\" onclick=\"popupedit('lovgrid','LOV_QUERY',1,event)\"><span class=\"ICOnarrative\"></span></BUTTON></TD>"
    }
    else if (tableName == 'sum_cust_btn') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" id=FIELD_NAME style=\"WIDTH: 220px; HEIGHT: 20px\" name=FIELD_NAME onchange=\"upper(this)\" type=\"text\"> </TD>" + "<TD><INPUT aria-required=\"false\" id=FIELD_LABEL name=FIELD_LABEL style=\"WIDTH: 190px; HEIGHT: 20px\" type=\"text\" ><BUTTON class=\"BTNimg\" title=\"List Of Values\" tabindex=\"-1\"   onclick=\"LOV_LABEL_CODE.show_lov('FIELD_LABEL~','SUM','', 'Label Code', 'Label Code~Label Description', 'Label Code~Label Description',event)\"><span class=\"ICOlov\"></span></BUTTON></TD>" + "<TD><INPUT aria-required=\"false\" id=FUNCTION_NAME style=\"WIDTH: 200px; HEIGHT: 20px\" name=FUNCTION_NAME type=\"text\"> </TD>"
    }
	 else if (tableName == 'cri_src_btn') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" id=CRITERIA_NAME style=\"WIDTH: 220px; HEIGHT: 20px\" name=CRITERIA_NAME onchange=\"upper(this);checkName(this)\" type=\"text\"  > </TD>" + "<TD><INPUT aria-required=\"false\" id=CRITERIA_VALUE size=50   readonly=\"yes\"  name=CRITERIA_VALUE onchange=\"checkCriteria(this)\"><BUTTON class=\"BTNimg\" title=\"Click to expand\" tabindex=\"-1\" name=\"ADD\" value=\"ADD\" type=\"text\"  onclick=\"popupedit('cri_src_btn','CRITERIA_VALUE',2,event)\"><span class=\"ICOnarrative\"></span></BUTTON></TD>"

  }
  
  else if (tableName == 'Criteria_Search') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" +"<TD><INPUT aria-required=\"false\" id=QUERY_FIELD name=QUERY_FIELD  SIZE=\"70\" readonly=\"yes\" font=\"Arial\" type=\"text\" ></TD>"+ "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup1 id=checkgroup1> </TD>" + "<TD><INPUT aria-required=\"false\"  name=\"CHAR_LEN\" id=\"CHAR_LEN\"  type=\"text\"  SIZE=\"30\" onkeypress=\"return numbersonly(this, event)\"></TD>"
    } 
    else if (tableName == 'CALFRMS') {
    	trow = "<TD><INPUT aria-required=\"false\"  type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" size=20 id=CALLFORM_FUCNTIONID  type=\"text\"   name=CALLFORM_FUCNTIONID onchange=\"upper(this)\"></TD>" + "<TD><SELECT aria-required=\"false\" id=CALLFORM_PARENT_BLOCK  onchange=\"fn_populate_DataScr_toCallfrmFlds('CALFRMS',2,3,event);\"  name=CALLFORM_PARENT_BLOCK><option></option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=CALLFORM_PARENT_DATASRC  name=CALLFORM_PARENT_DATASRC><option></option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" id=CALLFORM_RELATION size=35 type=\"text\"  name=CALLFORM_RELATION><BUTTON class=\"BTNimg\" title=\"Click to expand\" tabindex=\"-1\" onclick=\"popupedit('CALFRMS','LOV_QUERY',4,event)\"><span class=\"ICOnarrative\"></span></BUTTON></TD>" + "<TD><SELECT aria-required=\"false\" id=CALLFORM_RELATION_TYPE  name=CALLFORM_RELATION_TYPE ><OPTION value=\"1\" selected>One To One</OPTION><OPTION value=\"N\">One To Many</OPTION></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=CALLFORM_SCREEN  onchange=\"\"  name=CALLFORM_SCREEN><option></option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=CALLFORM_DISPLAY_TYPE  name=CALLFORM_DISPLAY_TYPE ><OPTION value=\"BUTTON\" selected>Button</OPTION><OPTION value=\"TAB\">Tab</OPTION></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=CALLFORM_ACTIVE  name=CALLFORM_ACTIVE ><OPTION value=\"Y\" selected>Yes</OPTION><OPTION value=\"N\">No</OPTION></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" id=RELEASE_TYPE name=RELEASE_TYPE   type=hidden size=0></TD>" + "<TD><INPUT aria-required=\"false\" id=RELEASE_NAME   name=RELEASE_NAME   type=hidden size=0></TD>" + "<TD><INPUT aria-required=\"false\" id=SCREEN_ARGS   name=SCREEN_ARGS   type=hidden size=0></TD>" + "<TD><INPUT aria-required=\"false\" id=DEPENDENT_ON   name=DEPENDENT_ON   type=hidden size=0></TD>" + "<TD><INPUT aria-required=\"false\" type=hidden size=0 id=CALLFROM_PATH name=CALLFROM_PATH ></TD>" + "<TD><INPUT aria-required=\"false\" type=hidden size=0 id=CHILD_CALLFORM name=CHILD_CALLFORM ></TD>" + "<TD><INPUT aria-required=\"false\" id=REST_RELATION_WITH_PARENT size=35 type=\"text\"  name=REST_RELATION_WITH_PARENT><BUTTON class=\"BTNimg\" title=\"Click to expand\" tabindex=\"-1\" onclick=\"popupedit('CALFRMS','LOV_QUERY',15,event)\"><span class=\"ICOnarrative\"></span></BUTTON></TD>"
    }
    else if (tableName == 'events') {
        trow = "<TD width=10><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD><SELECT aria-required=\"false\" id=EVENT_NAME style=\"WIDTH: 120px; HEIGHT: 20px\" name=EVENT_NAME value=\"\"> <OPTION value=onactivate>onactivate</OPTION><OPTION value=onafterupdate>onafterupdate</OPTION> <OPTION value=onbeforeupdate>onbeforeupdate</OPTION> <OPTION value=onblur>onblur</OPTION> <OPTION value=oncellchange>oncellchange</OPTION> <OPTION value=onchange>onchange</OPTION> <OPTION value=onclick>onclick</OPTION> <OPTION value=ondblclick>ondblclick</OPTION> <OPTION value=onfocus>onfocus</OPTION> <OPTION value=onfocusin>onfocusin</OPTION> <OPTION value=onfocusout>onfocusout</OPTION> <OPTION value=onhelp>onhelp</OPTION> <OPTION value=onkeydown>onkeydown</OPTION> <OPTION value=onkeyup>onkeyup</OPTION> <OPTION value=onmouseenter>onmouseenter</OPTION> <OPTION value=onmouseleave>onmouseleave</OPTION> <OPTION value=onmouseover>onmouseover</OPTION> <OPTION value=onmouseout>onmouseout</OPTION> <OPTION value=onpropertychange>onpropertychange</OPTION> <OPTION value=onselect>onselect</OPTION> <OPTION value=onload>onload</OPTION> <OPTION value=onunload selected>onunload</OPTION></SELECT> </TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" id=FUNCTION_NAME style=\"WIDTH: 140px; HEIGHT: 20px\" name=FUNCTION_NAME></TD>" + "<TD><SELECT aria-required=\"false\" id=EVENTTYPE style=\"WIDTH: 100px; HEIGHT: 20px\" name=EVENTTYPE onchange=\"fncallformselect('events')\"value=\"\"><OPTION selected value=NORMAL>Normal</OPTION><OPTION value=CALLFORM>Callform</OPTION><OPTION value=LAUNCH>Launch Form</OPTION><OPTION value=SUBSCREEN>Subscreen</OPTION><OPTION value=SUBFUNCTION>Subfunction</OPTION><OPTION value=OBIEE>OBIEE</OPTION></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=BUTTON_SCREEN style=\"WIDTH: 80px; HEIGHT: 20px\" name=BUTTON_SCREEN ></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=CALLFORM_NAME style=\"WIDTH: 100px; HEIGHT: 20px\" name=CALLFORM_NAME ><OPTION></OPTION> </SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" id=SCREEN_NAME style=\"WIDTH: 80px; HEIGHT: 20px\" name=SCREEN_NAME onchange=\"upper(this)\"></TD>"
    }
    else if (tableName == 'DBlink') {
        trow = "<TD width=10><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD><SELECT aria-required=\"false\" id=LEVEL style=\"WIDTH: 120px; HEIGHT: 20px\" name=LEVEL value=\"\"> <OPTION value=NULL></OPTION><OPTION value=ROW>Row</OPTION><OPTION value=COL>Column</OPTION></SELECT> </TD>" + "<TD><SELECT aria-required=\"false\" id=LINK_TYPE style=\"WIDTH: 100px; HEIGHT: 20px\" name=LINK_TYPE onchange=\"fncallformselect('events')\"value=\"\"><OPTION selected value=C>Custom</OPTION><OPTION value=S>Standard</OPTION></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" id=LINKED style=\"WIDTH: 140px; HEIGHT: 20px\" name=LINKED></TD>"
    }
    else if (tableName == 'attributes') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>"
    		+ "<TD><INPUT aria-required=\"false\" id=ATTR_NAME size=40 name=ATTR_NAME type=\"text\"><BUTTON class=\"BTNimg\" title=\"List Of Values\" tabindex=\"-1\"  onclick=\"LOV_LABEL_CODE.show_lov('ATTR_NAME~','frmBlkFldDtls','', 'Label Code', 'Label Code~Label Description', 'Label Code~Label Description',event)\"><span class=\"ICOlov\"></span></BUTTON></TD>" + "<TD><INPUT aria-required=\"false\" id=ATTR_VALUE size=75 name=ATTR_VALUE type=\"text\"> </TD>"
    		+ "<TD><SELECT aria-required=\"false\" id=ACTIVE  name=ACTIVE onchange=\"fnAttrival(event)\"><OPTION value=Y>Yes</OPTION> <OPTION value=N>No</OPTION></SELECT></TD>"
    		+ "<TD><INPUT aria-required=\"false\" id=ATTR_POSITION  name=ATTR_POSITION type=hidden> </TD>"
    		+ "<TD> <button class='up' onclick='move(this)'>▲</button></TD>"
            + "<TD> <button class='downX' onclick='move(this)' >▼</button></TD>"
    		+ "<TD><INPUT aria-required=\"false\" id=SELECTED  name=SELECTED  type=hidden ></TD>"
    		+ "<TD><INPUT aria-required=\"false\" id=RELEASE_TYPE name=RELEASE_TYPE   type=hidden></TD>"
    		+ "<TD><INPUT aria-required=\"false\" id=RELEASE_NAME   name=RELEASE_NAME   type=hidden></TD>"
    }
    else if (tableName == 'bindvar') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><SELECT aria-required=\"false\" id=BIND_VAR_BLK style=\"WIDTH: 250px; HEIGHT: 20px\" name=BIND_VAR_BLK onChange=\"fn_Populate_BlkFields_toBindVrbls('bindvar',event)\"></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=BIND_VAR_NAME style=\"WIDTH: 140px; HEIGHT: 20px\" name=BIND_VAR_NAME></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" id=BIND_VAR_TYPE size=12 name=BIND_VAR_TYPE type=\"text\"> </TD>"
    }
    else if (tableName == 'offlinebindvar') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><SELECT aria-required=\"false\" id=BIND_VAR_BLK style=\"WIDTH: 250px; HEIGHT: 20px\" name=BIND_VAR_BLK onChange=\"fn_Populate_BlkFields_toBindVrbls('offlinebindvar',event)\"></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=BIND_VAR_NAME style=\"WIDTH: 140px; HEIGHT: 20px\" name=BIND_VAR_NAME></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" id=BIND_VAR_TYPE type=\"text\" style=\"WIDTH: 140px; HEIGHT: 20px\" name=BIND_VAR_TYPE> </TD>"
    }
    else if (tableName == 'offlineretflds') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" id=QUERY_COLUMN  type=\"text\" readonly=\"yes\" style=\"WIDTH: 140px; HEIGHT: 20px\"  name=QUERY_COLUMN> </TD>" + "<TD><SELECT aria-required=\"false\" id=RETURN_BLK_NAME style=\"WIDTH: 250px; HEIGHT: 20px\" name=RETURN_BLK_NAME onChange=\"fn_Populate_BlkFields_toRetunflds('offlineretflds',2,3,event)\"></TD>" + "<TD><SELECT aria-required=\"false\" id=RETURN_FLD_NAME style=\"WIDTH: 140px; HEIGHT: 20px\" name=RETURN_FLD_NAME></SELECT></TD>"
    }
    else if (tableName == 'retflds') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" id=QUERY_COLUMN  type=\"text\" readonly=\"yes\" style=\"WIDTH: 140px; HEIGHT: 20px\"  name=QUERY_COLUMN></TD>" + "<TD><SELECT aria-required=\"false\" id=RETURN_BLK_NAME style=\"WIDTH: 250px; HEIGHT: 20px\" name=RETURN_BLK_NAME onChange=\"fn_Populate_BlkFields_toRetunflds('retflds',2,3,event)\"></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=RETURN_FLD_NAME style=\"WIDTH: 140px; HEIGHT: 20px\" name=RETURN_FLD_NAME></SELECT></TD>"
    }
    else if (tableName == 'FieldsetFields') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\"  size=30 name=\"FIELD_NAME\" id=\"FST_FIELD_NAME\"  readonly=\"yes\" ondblclick=\"fnShowProperty('FLD',event)\"></TD>" + "<TD><SELECT aria-required=\"false\" name=SUBPARTITION_NAME id=SUBPARTITION_NAME STYLE=\"width: 98%\"></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" id=RELEASE_TYPE name=RELEASE_TYPE   type=\"text\" style=\"display:none\"></TD>" + "<TD><INPUT aria-required=\"false\" id=RELEASE_NAME   name=RELEASE_NAME    type=\"text\" style=\"display:none\"></TD>" + "<TD><INPUT aria-required=\"false\" id=ACTIVE  name=ACTIVE  type=\"text\" style=\"display:none\"></TD>" + "<TD><INPUT aria-required=\"false\" id=FIELD_ORDER  name=FIELD_ORDER type=\"text\"  style=\"display:none\"></TD>"
    }
    else if (tableName == 'lovDetails') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD align=center><INPUT aria-required=\"false\" id=QUERY_COLS  type=\"text\" name=QUERY_COLS></TD>" + "<TD><SELECT aria-required=\"false\" id=DATATYPE name=DATATYPE><OPTION value=VARCHAR>STRING</OPTION><OPTION value=VARCHAR>TEXT</OPTION> <OPTION value=NUMBER>DOUBLE</OPTION> <OPTION value=NUMBER>INT</OPTION><OPTION value=DATE>DATE</OPTION></SELECT></TD>" + "<TD align=center><SELECT aria-required=\"false\" id=VISIBLE_GRID name=VISIBLE><OPTION value=Y>Yes</OPTION> <OPTION value=N>No</OPTION></SELECT></TD>" + "<TD align=center><SELECT aria-required=\"false\" id=REDN_FLD_FLAG name=REDN_FLD_FLAG onChange=\"myFunction(this)\"><OPTION value=Y>Yes</OPTION> <OPTION value=N>No</OPTION></SELECT></TD>" + "<TD align=center><SELECT aria-required=\"false\" id=REDN_FLD_TYPE name=REDN_FLD_TYPE><OPTION value=TEXT>TEXT</OPTION><OPTION value=SELECT>SELECT</OPTION><OPTION value=RADIO>RADIO</OPTION> <OPTION value=CHECKBOX>CHECKBOX</OPTION></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" id=COL_HEADING size=30 type=\"text\" value=\"\" name=COL_HEADING><BUTTON class=\"BTNimg\" title=\"List Of Values\" tabindex=\"-1\" onclick=\"LOV_LABEL_CODE.show_lov('COL_HEADING~','frmLovDetls','', 'Label Code', 'Label Code~Label Description', 'Label Code~Label Description',event)\"><span class=\"ICOlov\"></span></BUTTON></TD>"  +"<TD align=center><SELECT id=IS_INDEXED name=IS_INDEXED onChange=\"myFunctionisindex(this)\"  ><OPTION value=N>No</OPTION> <OPTION value=Y>Yes</OPTION></select></TD>"+"<TD align=center><INPUT id=MIN_SEARCH_CHAR_LEN   type=\"text\" name=MIN_SEARCH_CHAR_LEN onChange=\"findMinSrchChr(this)\" onkeypress=\"return numbersonly(this, event)\" disabled=true  ></TD>"

    }
    else if (tableName == 'partition') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" id=PARTITION_SL_NO readonly=\"yes\"  size=10  name=PARTITION_SL_NO type=\"text\" ></TD>" + "<TD><INPUT aria-required=\"false\" id=PARTITION_NAME size=70 name=PARTITION_NAME onmouseout=fn_checkRepetition('partition',this) onchange=\"upper(this);partNameChanged(this.value)\" onclick=\"partNameClicked(this.value)\" type=\"text\"></TD>" + "<TD><SELECT aria-required=\"false\" id=PARTITION_WIDTH name=PARTITION_WIDTH  onChange=\"partWtChanged()\"><option></option><option value=100>100</option></option><option value=66>66</option></option><option value=50>50</option></option><option value=33>33</option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=NO_OF_SUBPARTITIONS name=NO_OF_SUBPARTITIONS ><option></option><option value=2>2</option></option><option value=3>3</option></option><option value=4>4</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" id=RELEASE_TYPE name=RELEASE_TYPE   type=hidden></TD>" + "<TD><INPUT aria-required=\"false\" id=RELEASE_NAME   name=RELEASE_NAME   type=hidden></TD>"
    }
    else if (tableName == 'lovbindvar') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" id=BIND_VARIABLE style=\"WIDTH: 140px; HEIGHT: 20px\" name=BIND_VARIABLE type=\"text\" > </TD>" + "<TD><INPUT aria-required=\"false\" id=DATATYPE style=\"WIDTH: 140px; HEIGHT: 20px\" name=DATATYPE> </TD>"
    }
    else if (tableName == 'blkfldTable') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" id=COL_NAME style=\"WIDTH: 140px; HEIGHT: 20px\" name=COL_NAME type=\"text\" > </TD>" + "<TD><INPUT aria-required=\"false\" id=FLD_NAME style=\"WIDTH: 140px; HEIGHT: 20px\" name=FLD_NAME type=\"text\" > </TD>"
    }
    else if (tableName == 'blkdatasorces') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" id=BLK_DTSRC_NAME style=\"WIDTH: 220px; HEIGHT: 20px\" name=BLK_DTSRC_NAME> </TD>"
    }
    else if (tableName == 'ScrArgnts' && document.getElementById('SCREEN_OBIEE').checked == false) {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" id=SCREEN_ARG_NAME style=\"WIDTH: 140px; HEIGHT: 20px\" name=SCREEN_ARG_NAME type=\"text\" onmouseout=fn_checkRepetition('ScrArgnts',this)> </TD>" + "<TD><SELECT aria-required=\"false\" name=SRC_BLK id=SRC_BLK onChange=\"fn_Populate_BlkFields_toRetunflds('ScrArgnts',2,3,event)\"></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" name=SRC_FLD id=SRC_FLD ></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" id=SCR_VAL  style=\"WIDTH: 140px; HEIGHT: 20px\"  name=SCR_VAL type=\"text\"></TD>" + "<TD><SELECT aria-required=\"false\" name=TRG_BLK id=TRG_BLK onChange=\"fn_Populate_BlkFields_toRetunflds('ScrArgnts',5,6,event)\"></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" name=TRG_FLD id=TRG_FLD ></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=ACTIVE  name=ACTIVE ><OPTION value=Y>Yes</OPTION> <OPTION value=N>No</OPTION></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" id=RELEASE_TYPE   name=RELEASE_TYPE size=0  type=hidden></TD>" + "<TD><INPUT aria-required=\"false\" id=RELEASE_NAME   name=RELEASE_NAME size=0  type=hidden></TD>"
    }
	   else if (tableName == 'ScrArgnts' && document.getElementById('SCREEN_OBIEE').checked == true) {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" id=SCREEN_ARG_NAME style=\"WIDTH: 140px; HEIGHT: 20px\" name=SCREEN_ARG_NAME type=\"text\" onmouseout=fn_checkRepetition('ScrArgnts',this)> </TD>" + "<TD><SELECT aria-required=\"false\" name=SRC_BLK id=SRC_BLK   onChange=\"fn_Populate_BlkFields_toRetunflds('ScrArgnts',2,3,event)\"></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" name=SRC_FLD id=SRC_FLD  ></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" id=SCR_VAL  style=\"WIDTH: 140px; HEIGHT: 20px\"  name=SCR_VAL  type=\"text\"></TD>" + "<TD><SELECT aria-required=\"false\" name=TRG_BLK id=TRG_BLK disabled=true onChange=\"fn_Populate_BlkFields_toRetunflds('ScrArgnts',5,6,event)\"></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" name=TRG_FLD id=TRG_FLD disabled=true></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=ACTIVE  name=ACTIVE ><OPTION value=Y>Yes</OPTION> <OPTION value=N>No</OPTION></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" id=RELEASE_TYPE   name=RELEASE_TYPE size=0  type=hidden></TD>" + "<TD><INPUT aria-required=\"false\" id=RELEASE_NAME   name=RELEASE_NAME size=0  type=hidden></TD>"
    }
    else if (tableName == 'ACTNS_TB') {
        trow = "<TD align=\"center\"><INPUT aria-required=\"false\" type=checkbox id=WEBSERVICE_APPLICABLE  onclick=\"EnableFlds('ACTNS_TB')\" name=WEBSERVICE_APPLICABLE enabled=true></TD>" + "<TD><INPUT aria-required=\"false\" id=ACTION_CODE style=\"WIDTH: 140px; HEIGHT: 20px\" name=ACTION_CODE ondblclick=\"fnenblDsblOpCd(event)\" type=\"text\"></TD>" + "<TD><INPUT aria-required=\"false\" id=OPERATION_CODE style=\"WIDTH: 140px; HEIGHT: 20px\" name=OPERATION_CODE type=\"text\" ></TD>"+ "<TD align=\"center\"><INPUT aria-required=\"false\" type=checkbox id=ACTION_STAGE_TYPE  name=ACTION_STAGE_TYPE enabled=true ></TD>" + "<TD align=\"center\"><INPUT aria-required=\"false\" disabled=\"true\" type=checkbox id=REST_OPERATION_ENABLED  name=REST_OPERATION_ENABLED enabled=true ></TD>" +"<TD align=\"center\"><BUTTON class=\"Buttontext\"  id=Amendables   onclick=\"fnAmendables(event)\" name=Amendables>Amendables</BUTTON></TD>" + "<TD align=\"center\"><BUTTON class=\"Buttontext\"  id=COMMENTS   onclick=\"fnComments(event)\" name=COMMENTS>Comments</BUTTON></TD>"
    }
    else if (tableName == 'lfmform') {
        trow = "<TD align=\"center\"><INPUT aria-required=\"false\"  type=checkbox name=checkgroup id=checkgroup ></TD>" + "<TD ><INPUT aria-required=\"false\" size=80 id=LAUNCHFORM_FUCNTIONID    name=LAUNCHFORM_FUCNTIONID onchange=\"upper(this)\" type=\"text\"></TD>" + "<TD><SELECT aria-required=\"false\" id=LAUNCHFORM_ACTIVE  name=LAUNCHFORM_ACTIVE ><OPTION value=\"Y\" selected>Yes</OPTION><OPTION value=\"N\">No</OPTION></SELECT></TD>" + "<TD style=\"border-right:0px;\"><INPUT aria-required=\"false\" id=RELEASE_TYPE   name=RELEASE_TYPE size=0  type=hidden></TD>" + "<TD style=\"border-right:0px;\"><INPUT aria-required=\"false\" id=RELEASE_NAME   name=RELEASE_NAME size=0  type=hidden></TD>" + "<TD><INPUT aria-required=\"false\" id=SCREEN_ARGS   name=SCREEN_ARGS  size=0 type=hidden></TD>" + "<TD><SELECT aria-required=\"false\" id=FORM_TYPE  name=FORM_TYPE ><OPTION value=\"LF\" selected>Launch Form</OPTION><OPTION value=\"GQ\">Gateway</OPTION></SELECT></TD>" 
    }
    else if (tableName == 'funcDesc') {
        trow = "<TD><INPUT aria-required=\"false\"  type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" id=FUNCTION_ID    name=FUNCTION_ID  type=\"text\" size=35 onchange=\"upper(this)\"></TD>" + "<TD><INPUT aria-required=\"false\" id=FUNC_MODULE_ID  name=FUNC_MODULE_ID type=\"text\" size=60 readonly=\"yes\"><BUTTON class=\"BTNimg\" title=\"List Of Values\" tabindex=\"-1\"  onclick=\"LOV_MODULE.show_lov('FUNC_MODULE_ID~FUNC_MODULE_DESC~','frmMnDtls','', 'Module Code', 'Module Code~Module Description', 'Module Code~Module Description',event)\"><span class=\"ICOlov\"></span></BUTTON></TD>" + "<TD><INPUT aria-required=\"false\" id=FUNC_MODULE_DESC   name=FUNC_MODULE_DESC   type=\"text\" size=60  readonly=\"yes\"></TD>" + "<TD><INPUT aria-required=\"false\" id=CONTROL_STRING   name=CONTROL_STRING   type=hidden></TD>"
    }
    else if (tableName == "fileResult" || tableName == "fileResult1") {
	    try{
        var operation = parent.document.getElementsByName("OPERATION")[0].value;
        }
        catch (e) {
            var operation = "GENERATE";
        }
		
        if (operation == "RELEASE" || tableName == "fileResult1") {
            trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"6\" id=SERIAL_NO border=\"0\" readonly=\"yes\"  name=SERIAL_NO></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"60\" id=GEN_FILE_NAME readonly=\"yes\" maxLength=125 name=GEN_FILE_NAME></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"15\" id=GEN_FILE_TYPE readonly=\"yes\" maxLength=125 name=GEN_FILE_TYPE></TD>" + "<TD><SELECT aria-required=\"false\"  id=FILE_STATUS  disabled=true name=FILE_STATUS><option value=\"G\">Generated</option><option value=\"N\">Not Generated</option><option value=\"S\">Not Applicable</option><option value=\"Y\">To be Generated</option><option value=\"D\">Deployed</option><option value=\"R\">Released</option><option value=\"F\">Failed</option></SELECT></TD>" + "<TD><BUTTON class=\"Buttontext\"  id=DDLStatus  onclick=\"fnStatus(this)\" type=hidden name=Details>Details</BUTTON></TD>"
        }
        else {
            trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"6\" id=SERIAL_NO border=\"0\" readonly=\"yes\"  name=SERIAL_NO></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"60\" id=GEN_FILE_NAME readonly=\"yes\" maxLength=125 name=GEN_FILE_NAME></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"15\" id=GEN_FILE_TYPE readonly=\"yes\" maxLength=125 name=GEN_FILE_TYPE></TD>" + "<TD><SELECT aria-required=\"false\"  id=FILE_STATUS  disabled=true name=FILE_STATUS><option value=\"G\">Generated</option><option value=\"N\">Not Generated</option><option value=\"S\">Not Applicable</option><option value=\"Y\">To be Generated</option><option value=\"D\">Deployed</option><option value=\"R\">Released</option><option value=\"F\">Failed</option></SELECT></TD>"
        }
    }
    else if (tableName == 'SUM_QUERY_ORDER') {
        trow = "<TD><INPUT aria-required=\"false\" size=\"40\" STYLE=\"width:200px\" name=\"QFIELD_NAME\" id=\"QFIELD_NAME\" readonly=\"yes\" font=\"Arial\" type=\"text\" ></TD>" + "<TD><INPUT aria-required=\"false\"  name=\"SUM_FLD_QORDER\" id=\"SUM_FLD_QORDER\"  type=\"text\" STYLE=\"width:20px\"></TD>"
    }
    else if (tableName == 'SUM_RESULT_ORDER') {
        trow = "<TD><INPUT aria-required=\"false\" size=\"40\" STYLE=\"width: 200px\" name=\"RFIELD_NAME\" id=\"RFIELD_NAME\" readonly=\"yes\" font=\"Arial\" type=\"text\" ></TD>" + "<TD><INPUT aria-required=\"false\"  name=\"SUM_FLD_RORDER\" id=\"SUM_FLD_RORDER\"  type=\"text\" STYLE=\"width:20px\" readonly=\"yes\"></TD>"
    }
    else if (tableName == 'SUM_DTLS') {
        trow = "<TD align=\"center\"><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" size=\"20\" STYLE=\"width: 130px\" name=\"FIELD_NAME\" id=\"FIELD_NAME_GRID\" readonly=\"yes\" font=\"Arial\" type=\"text\" ></TD>" + "<TD  align=\"center\"><INPUT aria-required=\"false\" type=checkbox name=\"QUERY\" id=\"QUERY\" onclick=\"fnpoplovs(this)\" ></TD>" + "<TD><BUTTON class=\"BTNimg\" disabled style=\"height:25px;width :80px;\" title=\"Click to fetch Details\" onclick=\"Fn_SmLv_Dtls(this)\">Properties</BUTTON></TD>" + "<TD><INPUT aria-required=\"false\"  id=LOV_NAME name=LOV_NAME  type=hidden ></TD>" + "<TD><INPUT aria-required=\"false\"  id=MIN_CHAR_LEN name=MIN_CHAR_LEN  type=hidden ></TD>" + "<TD><INPUT aria-required=\"false\"  id=RETURN_FLDS name=RETURN_FLDS  type=hidden ></TD>" + "<TD><INPUT aria-required=\"false\"  id=BIND_FLDS name=BIND_FLDS  type=hidden ></TD>"
    }
    else if (tableName == "bulkresult" || tableName == "exlresult") {
        trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"6\" id=SERIAL_NO border=\"0\" readonly=\"yes\"  name=SERIAL_NO></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"25\" id=GEN_FILE_NAME readonly=\"yes\" maxLength=125 name=GEN_FILE_NAME></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"15\" id=GEN_FILE_TYPE readonly=\"yes\" maxLength=125 name=GEN_FILE_TYPE></TD>" + "<TD><SELECT aria-required=\"false\"  id=FILE_STATUS  disabled=true name=FILE_STATUS><option value=\"G\">Generated</option><option value=\"N\">Not Generated</option><option value=\"S\">Not Applicable</option><option value=\"Y\">To be Generated</option><option value=\"D\">Deployed</option><option value=\"R\">Released</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"70\" id=REMARKS readonly=\"yes\" maxLength=125 name=REMARKS></TD>"
    }
    else if (tableName == "changereport") {
        trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"6\" id=SERIAL_NO border=\"0\" readonly=\"yes\"  name=SERIAL_NO></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"25\" id=GEN_FILE_NAME readonly=\"yes\" maxLength=125 name=GEN_FILE_NAME></TD>" + "<TD><SELECT aria-required=\"false\"  id=FILE_STATUS  disabled=true name=FILE_STATUS><option value=\"G\">Generated</option><option value=\"N\">Not Generated</option><option value=\"S\">Not Applicable</option><option value=\"Y\">To be Generated</option><option value=\"D\">Deployed</option><option value=\"R\">Released</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"70\" id=REMARKS readonly=\"yes\" maxLength=125 name=REMARKS></TD>"
    }
    else if (tableName == "LOG") {
        trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"6\" id=SERIAL_NO border=\"0\" readonly=\"yes\"  name=SERIAL_NO></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"25\" id=GEN_FILE_NAME readonly=\"yes\" maxLength=125 name=GEN_FILE_NAME></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"15\" id=GEN_FILE_TYPE readonly=\"yes\" maxLength=125 name=GEN_FILE_TYPE></TD>" + "<TD><SELECT aria-required=\"false\"  id=FILE_STATUS  disabled=true name=FILE_STATUS><option value=\"S\">Uploaded</option><option value=\"F\">Not Uploaded</option><option value=\"Y\">To be Uploaded</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"70\" id=REMARKS readonly=\"yes\" maxLength=125 name=REMARKS></TD>"
    }
    else if (tableName == "RefResult") {
        trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"6\" id=SERIAL_NO border=\"0\" readonly=\"yes\"  name=SERIAL_NO></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"25\" id=GEN_FILE_NAME readonly=\"yes\" maxLength=125 name=GEN_FILE_NAME></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"15\" id=GEN_FILE_TYPE readonly=\"yes\" maxLength=125 name=GEN_FILE_TYPE></TD>" + "<TD><SELECT aria-required=\"false\"  id=FILE_STATUS  disabled=true name=FILE_STATUS><option value=\"S\">Refreshed</option><option value=\"F\">Not Refreshed</option><option value=\"Y\">To be Refreshed</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"50\" id=REMARKS readonly=\"yes\" name=REMARKS></TD>"
    }
    else if (tableName == "Detail_ScreenTB") {
        trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"10%\" id=SERIAL_NO border=\"0\" readonly=\"yes\"  name=RECORD_NO></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"35%\" border=\"0\" id=GEN_FILE_NAME readonly=\"yes\"  name=KEY></TD>" + "<TD><SELECT aria-required=\"false\"  id=DDL_ACTION  disabled=true name=ACTION><option value=\"G\">Generated</option><option value=\"I\">Inserted</option><option value=\"D\">Deleted</option><option value=\"U\">Updated</option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\"  id=DDL_STATUS  disabled=true name=STATUS><option value=\"P\">Processed</option><option value=\"I\">Ignored</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"25%\" id=REMARKS readonly=\"yes\" name=Remarks></TD>"
    }
    else if (tableName == 'HeaderRecords') {
        trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"35\" id=REC_CODE border=\"0\" readonly=\"yes\"  name=REC_CODE></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"35\" id=REC_CATEGORY readonly=\"yes\" maxLength=125 name=REC_CATEGORY></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"43\" id=DB_TABLES readonly=\"yes\" maxLength=125 name=DB_TABLES></TD>"
    }
    else if (tableName == 'BodyRecords') {
        trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"35\" id=REC_CODE border=\"0\" readonly=\"yes\"  name=REC_CODE></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"35\" id=REC_CATEGORY readonly=\"yes\" maxLength=125 name=REC_CATEGORY></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"43\" id=DB_TABLES readonly=\"yes\" maxLength=125 name=DB_TABLES></TD>"
    }
    else if (tableName == 'FooterRecords') {
        trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"35\" id=REC_CODE border=\"0\" readonly=\"yes\"  name=REC_CODE></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"35\" id=REC_CATEGORY readonly=\"yes\" maxLength=125 name=REC_CATEGORY></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"43\" id=DB_TABLES readonly=\"yes\" maxLength=125 name=DB_TABLES></TD>"
    }
    else if (tableName == 'GI_HOUT_fields') {
        trow = "<TD align=\"center\"><INPUT aria-required=\"false\"  type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD ><INPUT aria-required=\"false\" type=\"text\" size=\"30\" id=FIELD_CODE name=FIELD_CODE onchange=\"upper(this);fncheckfieldsdup('GI_HOUT_fields')\" ></TD>" + "<TD><SELECT aria-required=\"false\"  id=DATA_TYPE   name=DATA_TYPE><option value=\"STRING\">String</option><option value=\"NUMBER\">Number</option><option value=\"DATE\">Date</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=DATE_FORMAT name=DATE_FORMAT   ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=DB_TABLE name=DB_TABLE onchange=\"upper(this)\"><BUTTON class=\"BTNimg\" title=\"List Of Values\" tabindex=\"-1\" name=\"LOV\" id=\"LOV\"   onclick=\"LOV_DATASRC.show_lov('DB_TABLE~','frmgiDSLOV','', 'Data Source', 'Table Name', 'Table Name',event)\"><span class=\"ICOlov\"></span></img></BUTTON><BUTTON class=\"BTNimg\" title=\"Click to fetch columns\" onclick=\"funcGIfieldcolumns(this,'GI_HOUT_fields','')\">P</BUTTON></TD>" + "<TD><SELECT aria-required=\"false\" id=DB_COLUMN   name=DB_COLUMN    ><option></option></SELECT>  </TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=VALUE name=VALUE   ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=LENGTH name=LENGTH onchange=\"numberval(this)\"  ></TD>" + "<TD><SELECT aria-required=\"false\"  id=KEYWORD   name=KEYWORD><option></option><option value=\"CURR_BRANCH\">Current Branch</option><option value=\"CURR_DATE\">Current Date</option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\"  id=PADDING_PREF   name=PADDING_PREF><option value=\"L\">Left</option><option value=\"R\">Right</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=PADDING_CHAR name=PADDING_CHAR   ></TD>" + "<TD><INPUT aria-required=\"false\"  type=checkbox  id=EXCLUDE_IN_SELECT name=EXCLUDE_IN_SELECT   ></TD>" + "<TD><INPUT aria-required=\"false\"  id=FIELD_POS name=FIELD_POS  type=hidden ></TD>"
    }
    else if (tableName == 'GI_HIN_fields') {
        trow = "<TD align=\"center\"><INPUT aria-required=\"false\"  type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD ><INPUT aria-required=\"false\" type=\"text\" size=\"30\" id=FIELD_CODE name=FIELD_CODE onchange=\"upper(this);fncheckfieldsdup('GI_HIN_fields')\" ></TD>" + "<TD><SELECT aria-required=\"false\"  id=DATA_TYPE   name=DATA_TYPE><option value=\"STRING\">String</option><option value=\"NUMBER\">Number</option><option value=\"DATE\">Date</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=DATE_FORMAT name=DATE_FORMAT   ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=ST_POS name=ST_POS   ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=LENGTH name=LENGTH   ></TD>" + "<TD><SELECT aria-required=\"false\"  id=TRIM_PREF   name=TRIM_PREF><option value=\"L\">Left</option><option value=\"R\">Right</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=TRIM_CHAR name=TRIM_CHAR   ></TD>" + "<TD><SELECT aria-required=\"false\" id=BLK_NAME   name=BLK_NAME onchange=\"fn_populate_FieldsFIELD_togi('GI_HIN_fields');\" ><option></option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=FLD_NAME   name=FLD_NAME><option ></option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=PARENT_BLK name=PARENT_BLK ></option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\"  type=checkbox  id=EXISTS_IN_FILE name=EXISTS_IN_FILE   ></TD>" + "<TD><INPUT aria-required=\"false\"  id=FC_FLD_POS name=FC_FLD_POS type=hidden></TD>" + "<TD><INPUT aria-required=\"false\"  id=FIELD_POS name=FIELD_POS  type=hidden ></TD>"
    }
    else if (tableName == 'GI_BOUT_fields') {
        trow = "<TD align=\"center\"><INPUT aria-required=\"false\"  type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD ><INPUT aria-required=\"false\" type=\"text\" size=\"30\" id=FIELD_CODE name=FIELD_CODE onchange=\"upper(this);fncheckfieldsdup('GI_BOUT_fields')\" ></TD>" + "<TD><SELECT aria-required=\"false\"  id=DATA_TYPE   name=DATA_TYPE><option value=\"STRING\">String</option><option value=\"NUMBER\">Number</option><option value=\"DATE\">Date</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=DATE_FORMAT name=DATE_FORMAT   ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=DB_TABLE name=DB_TABLE onchange=\"upper(this)\"><BUTTON class=\"BTNimg\" title=\"List Of Values\" tabindex=\"-1\" name=\"LOV\" id=\"LOV\"   onclick=\"LOV_DATASRC.show_lov('DB_TABLE~','frmgiDSLOV','', 'Data Source', 'Table Name', 'Table Name',event)\"><span class=\"ICOlov\"></span></img></BUTTON><BUTTON class=\"BTNimg\" title=\"Click to fetch columns\" onclick=\"funcGIfieldcolumns(this,'GI_BOUT_fields','')\">P</BUTTON></TD>" + "<TD><SELECT aria-required=\"false\" id=DB_COLUMN   name=DB_COLUMN   ><option></option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=VALUE name=VALUE   ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=LENGTH name=LENGTH  onchange=\"numberval(this)\"  ></TD>" + "<TD><SELECT aria-required=\"false\"  id=KEYWORD   name=KEYWORD><option></option><option value=\"CURR_BRANCH\">Current Branch</option><option value=\"CURR_DATE\">Current Date</option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\"  id=PADDING_PREF   name=PADDING_PREF><option value=\"L\">Left</option><option value=\"R\">Right</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=PADDING_CHAR name=PADDING_CHAR   ></TD>" + "<TD><INPUT aria-required=\"false\"  type=checkbox  id=EXCLUDE_IN_SELECT name=EXCLUDE_IN_SELECT   ></TD>" + "<TD><INPUT aria-required=\"false\"  id=FIELD_POS name=FIELD_POS  type=hidden ></TD>"
    }
    else if (tableName == 'GI_BIN_fields') {
        trow = "<TD align=\"center\"><INPUT aria-required=\"false\"  type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD ><INPUT aria-required=\"false\" type=\"text\" size=\"30\" id=FIELD_CODE name=FIELD_CODE onchange=\"upper(this);fncheckfieldsdup('GI_BIN_fields')\" ></TD>" + "<TD><SELECT aria-required=\"false\"  id=DATA_TYPE   name=DATA_TYPE><option value=\"STRING\">String</option><option value=\"NUMBER\">Number</option><option value=\"DATE\">Date</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=DATE_FORMAT name=DATE_FORMAT   ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=ST_POS name=ST_POS   ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=LENGTH name=LENGTH   ></TD>" + "<TD><SELECT aria-required=\"false\"  id=TRIM_PREF   name=TRIM_PREF><option value=\"L\">Left</option><option value=\"R\">Right</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=TRIM_CHAR name=TRIM_CHAR   ></TD>" + "<TD><SELECT aria-required=\"false\" id=BLK_NAME   name=BLK_NAME onchange=\"fn_populate_FieldsFIELD_togi('GI_BIN_fields');\" ><option></option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=FLD_NAME   name=FLD_NAME><option ></option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=PARENT_BLK name=PARENT_BLK ></option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\"  type=checkbox  id=EXISTS_IN_FILE name=EXISTS_IN_FILE   ></TD>" + "<TD><INPUT aria-required=\"false\"  id=FC_FLD_POS name=FC_FLD_POS type=hidden></TD>" + "<TD><INPUT aria-required=\"false\"  id=FIELD_POS name=FIELD_POS  type=hidden ></TD>"
    }
    else if (tableName == 'GI_FOUT_fields') {
        trow = "<TD align=\"center\"><INPUT aria-required=\"false\"  type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD ><INPUT aria-required=\"false\" type=\"text\" size=\"30\" id=FIELD_CODE name=FIELD_CODE onchange=\"upper(this);fncheckfieldsdup('GI_FOUT_fields')\" ></TD>" + "<TD><SELECT aria-required=\"false\"  id=DATA_TYPE   name=DATA_TYPE><option value=\"STRING\">String</option><option value=\"NUMBER\">Number</option><option value=\"DATE\">Date</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=DATE_FORMAT name=DATE_FORMAT   ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=DB_TABLE name=DB_TABLE onchange=\"upper(this)\"><BUTTON class=\"BTNimg\" title=\"List Of Values\" tabindex=\"-1\" name=\"LOV\" id=\"LOV\"   onclick=\"LOV_DATASRC.show_lov('DB_TABLE~','frmgiDSLOV','', 'Data Source', 'Table Name', 'Table Name',event)\"><span class=\"ICOlov\"></span></img></BUTTON><BUTTON class=\"BTNimg\" title=\"Click to fetch columns\" onclick=\"funcGIfieldcolumns(this,'GI_FOUT_fields','')\">P</BUTTON></TD>" + "<TD><SELECT aria-required=\"false\" id=DB_COLUMN   name=DB_COLUMN     ><option></option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=VALUE name=VALUE   ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=LENGTH name=LENGTH onchange=\"numberval(this)\"   ></TD>" + "<TD><SELECT aria-required=\"false\"  id=KEYWORD   name=KEYWORD><option></option><option value=\"CURR_BRANCH\">Current Branch</option><option value=\"CURR_DATE\">Current Date</option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\"  id=PADDING_PREF   name=PADDING_PREF><option value=\"L\">Left</option><option value=\"R\">Right</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=PADDING_CHAR name=PADDING_CHAR   ></TD>" + "<TD><INPUT aria-required=\"false\"  type=checkbox  id=EXCLUDE_IN_SELECT name=EXCLUDE_IN_SELECT   ></TD>" + "<TD><INPUT aria-required=\"false\"  id=FIELD_POS name=FIELD_POS  type=hidden ></TD>"
    }
    else if (tableName == 'GI_FIN_fields') {
        trow = "<TD align=\"center\"><INPUT aria-required=\"false\"  type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD ><INPUT aria-required=\"false\" type=\"text\" size=\"30\" id=FIELD_CODE name=FIELD_CODE onchange=\"upper(this);fncheckfieldsdup('GI_FIN_fields')\" ></TD>" + "<TD><SELECT aria-required=\"false\"  id=DATA_TYPE   name=DATA_TYPE><option value=\"STRING\">String</option><option value=\"NUMBER\">Number</option><option value=\"DATE\">Date</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=DATE_FORMAT name=DATE_FORMAT   ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=ST_POS name=ST_POS   ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=LENGTH name=LENGTH   ></TD>" + "<TD><SELECT aria-required=\"false\"  id=TRIM_PREF   name=TRIM_PREF><option value=\"L\">Left</option><option value=\"R\">Right</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"30\"id=TRIM_CHAR name=TRIM_CHAR   ></TD>" + "<TD><SELECT aria-required=\"false\" id=BLK_NAME   name=BLK_NAME onchange=\"fn_populate_FieldsFIELD_togi('GI_FIN_fields');\" ><option></option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=FLD_NAME   name=FLD_NAME><option ></option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=PARENT_BLK name=PARENT_BLK ></option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\"  type=checkbox  id=EXISTS_IN_FILE name=EXISTS_IN_FILE   ></TD>" + "<TD><INPUT aria-required=\"false\"  id=FC_FLD_POS name=FC_FLD_POS type=hidden></TD>" + "<TD><INPUT aria-required=\"false\"  id=FIELD_POS name=FIELD_POS  type=hidden ></TD>"
    }
    else if (tableName == 'GI_B_AssocRecords') {
        trow = "<TD align=\"center\"><INPUT aria-required=\"false\"  type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD ><SELECT aria-required=\"false\" id=REC_CODE   name=REC_CODE  ><option></option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=PARENT_REC   name=PARENT_REC><option></option></SELECT></TD>"
    }
    else if (tableName == 'GI_B_AssocBlocks') {
        trow = "<TD align=\"center\"><INPUT aria-required=\"false\"  type=checkbox name=checkgroup id=checkgroup ></TD>" + "<TD ><SELECT aria-required=\"false\" id=BLK_NAME   name=BLK_NAME><option></option></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=GEN_NEW_BLOCKS  name=GEN_NEW_BLOCKS ><OPTION value=\"Y\" selected>Yes</OPTION><OPTION value=\"N\">No</OPTION></SELECT></TD>"
    }
    else if (tableName == 'Error_table') {
        trow = "<TD></TD>" + "<TD class=\"thheader\" ></TD>" + "<TD></TD>"
    }
    else if (tableName == 'mlabelCode') {
        trow = "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"25\" id=LABEL_CODE readonly=\"yes\" name=LABEL_CODE></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"40\" id=LABEL_DESCRIPTION readonly=\"yes\" name=LABEL_DESCRIPTION> </TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"20\" id=LABEL_TYPE readonly=\"yes\" name=LABEL_TYPE> </TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"10\" id=Operation readonly=\"yes\" name=Operation> </TD>"
    }
    else if (tableName == 'XSDGEN') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" id=OPERATION_CODE style=\"WIDTH: 150px; HEIGHT: 20px\" name=OPERATION_CODE type=\"text\"> </TD>" + "<TD><INPUT aria-required=\"false\" id=OPERATION_DESC style=\"WIDTH: 150px; HEIGHT: 20px\" name=OPERATION_DESC type=\"text\"> </TD>" + "<TD><INPUT aria-required=\"false\" id=FC_FUNCTION_ID style=\"WIDTH: 150px; HEIGHT: 20px\" name=FC_FUNCTION_ID type=\"text\"> </TD>" + "<TD><INPUT aria-required=\"false\" id=FC_ACTION      style=\"WIDTH: 150px; HEIGHT: 20px\" name=FC_ACTION      type=\"text\"> </TD>"
    }
    else if (tableName == 'XSDBULKGEN') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" id=OPERATION_CODE style=\"WIDTH: 200px; HEIGHT: 20px\" name=OPERATION_CODE type=\"text\"> </TD>" + "<TD><INPUT aria-required=\"false\" id=OPERATION_DESC style=\"WIDTH: 200px; HEIGHT: 20px\" name=OPERATION_DESC type=\"text\"> </TD>" + "<TD><INPUT aria-required=\"false\" id=FC_ACTION      style=\"WIDTH: 200px; HEIGHT: 20px\" name=Error Description type=\"text\"> </TD>"
    }
    else if (tableName == 'PF_B_FILTERS') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" id=FILTER_NAME  name=FILTER_NAME onchange=\"upper(this);fnDefaultFilter();fncheckname()\"></TD>" + "<TD><INPUT aria-required=\"false\" type=\"hidden\" id=FILTER_TYPE  name=FILTER_TYPE value=\"B\" ></TD>" + "<TD><SELECT aria-required=\"false\" type=\"text\" id=FILTER_DATA_TYPE  name=FILTER_DATA_TYPE onchange=\"fnDefaultFilter();\"><option></option><option value=\"DATE\">Date</option><option value=\"VARCHAR2\">String</option><option value=\"NUMBER\">Number</option> </SELECT></TD>" + "<TD><SELECT aria-required=\"false\" type=\"text\" id=FILTER_SCOPE  name=FILTER_SCOPE onchange=\"fnDefaultFilter();\" ><option value=\"E\">Entity</option><option value=\"T\">Table</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" id=FILTER_EXPRESSION  name=FILTER_EXPRESSION  SIZE=\"60\"><BUTTON class=\"BTNimg\" title=\"Click to expand\" tabindex=\"-1\" onclick=\"popupedit('PF_B_FILTERS','FILTER_EXPRESSION','5',event)\"> <span class=\"ICOnarrative\"></span></BUTTON><BUTTON class=\"Buttontext\" name=\"E_ok\"  id=\"E_ok\" onclick=\"fnExpression_builder('PF_B_FILTERS','FILTER_EXPRESSION','5',event)\">Builder</BUTTON></TD>" + "<TD><SELECT aria-required=\"false\" type=\"text\" id=FILTER_OPERATOR  name=FILTER_OPERATOR  onchange=\"fnDefaultFilter();\" ><option value=\"\"></option> <option value=\"EQUALS\">Equals</option> <option value=\"NOT EQUALS\">Not Equals</option> <option value=\"GREATER THAN\">Greater Than</option> <option value=\"LESSER THAN\">Lesser Than</option>  <option value=\"GREATER OR EQUAL\">Greater Or EquaL</option> <option value=\"LESSER OR EQUAL\">Lesser Or Equal</option> <option value=\"IS NULL\">Is Null</option> <option value=\"IS NOT NULL\">Is Not Null</option> <option value=\"BETWEEN\">Between</option> <option value=\"NOT BETWEEN\">Not Between</option> <option value=\"LIKE\">Like</option> <option value=\"NOT LIKE\">Not Like</option><option value=\"NOT IN\">Not In</option><option value=\"IN\">In</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" id=DEFAULT_VALUE  name=DEFAULT_VALUE onchange=\"fnDefaultFilter();\" ><BUTTON class=\"BTNimg\" title=\"Click to expand\" tabindex=\"-1\" onclick=\"popupedit('PF_B_FILTERS','DEFAULT_VALUE','7',event)\"> <span class=\"ICOnarrative\"></span></BUTTON></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" id=MAXIMUM_LENGTH  name=MAXIMUM_LENGTH  ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"hidden\" id=LABEL_CODE  name=LABEL_CODE  ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"hidden\" id=FILTER_QUERY  name=FILTER_QUERY  ></TD>"
    }
    else if (tableName == 'PF_E_FILTERS') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" id=FILTER_NAME  name=FILTER_NAME onchange=\"upper(this);fnDefaultFilter();fncheckname();\"></TD>" + "<TD><INPUT aria-required=\"false\" type=\"hidden\" id=FILTER_TYPE  name=FILTER_TYPE value=\"E\" ></TD>" + "<TD><SELECT aria-required=\"false\" type=\"text\" id=FILTER_DATA_TYPE  name=FILTER_DATA_TYPE onchange=\"fnDefaultFilter();\"><option></option><option value=\"DATE\">Date</option><option value=\"VARCHAR2\">String</option><option value=\"NUMBER\">Number</option> </SELECT></TD>" + "<TD><SELECT aria-required=\"false\" type=\"text\" id=FILTER_SCOPE  name=FILTER_SCOPE onchange=\"fnDefaultFilter();\" ><option value=\"E\">Entity</option><option value=\"T\">Table</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" id=FILTER_EXPRESSION  name=FILTER_EXPRESSION size=\"60\"><BUTTON class=\"BTNimg\" title=\"Click to expand\" tabindex=\"-1\" onclick=\"popupedit('PF_E_FILTERS','FILTER_EXPRESSION','5',event)\"> <span class=\"ICOnarrative\"></span></BUTTON><BUTTON class=\"Buttontext\" name=\"E_ok\"  id=\"E_ok\" onclick=\"fnExpression_builder('PF_E_FILTERS','FILTER_EXPRESSION','5',event)\">Builder</BUTTON></TD>" + "<TD><SELECT aria-required=\"false\" type=\"text\" id=FILTER_OPERATOR  name=FILTER_OPERATOR  onchange=\"fnDefaultFilter();\" ><option value=\"\"></option> <option value=\"EQUALS\">Equals</option> <option value=\"NOT EQUALS\">Not Equals</option> <option value=\"GREATER THAN\">Greater Than</option> <option value=\"LESSER THAN\">Lesser Than</option>  <option value=\"GREATER OR EQUAL\">Greater Or EquaL</option> <option value=\"LESSER OR EQUAL\">Lesser Or Equal</option> <option value=\"IS NULL\">Is Null</option> <option value=\"IS NOT NULL\">Is Not Null</option> <option value=\"BETWEEN\">Between</option> <option value=\"NOT BETWEEN\">Not Between</option> <option value=\"LIKE\">Like</option> <option value=\"NOT LIKE\">Not Like</option><option value=\"NOT IN\">Not In</option><option value=\"IN\">In</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" id=DEFAULT_VALUE  name=DEFAULT_VALUE  onchange=\"fnDefaultFilter();\" ><BUTTON class=\"BTNimg\" title=\"Click to expand\" tabindex=\"-1\" onclick=\"popupedit('PF_E_FILTERS','DEFAULT_VALUE','7',event)\"> <span class=\"ICOnarrative\"></span></BUTTON></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" id=MAXIMUM_LENGTH  name=MAXIMUM_LENGTH  ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"hidden\" id=LABEL_CODE  name=LABEL_CODE  ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"hidden\" id=FILTER_QUERY  name=FILTER_QUERY  ></TD>"
    }
    else if (tableName == 'PF_TABLES') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" class=\"TXTstd\" id=TABLE_NAME   name=TABLE_NAME type=\"text\" onchange=\"upper(this)\" size=\"35\"><BUTTON class=\"BTNimg\" title=\"List Of Values\" tabindex=\"-1\" name=\"LOV\" id=\"LOV\" onclick=\"LOV_PFDATASRC.show_lov('TABLE_NAME','frmgiDSLOV','', 'Data Source', 'Table Name', 'Table Name',event)\"><span class=\"ICOlov\"></span></BUTTON><BUTTON class=\"BTNimg\" title=\"Click to fetch columns\" onclick=\"fnPfClDataType(this,0)\">P</BUTTON></TD>" + "<TD><INPUT aria-required=\"false\" type=checkbox  id=MASTER  name=MASTER ></TD>" + "<TD><SELECT aria-required=\"false\" id=PARENT   name=PARENT><option></option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" class=\"TXTstd\"  id=CHILD_JOIN  name=CHILD_JOIN type=\"text\" size=\"35\"> <BUTTON class=\"BTNimg\" title=\"Click to expand\" tabindex=\"-1\" onclick=\"popupedit('PF_TABLES','CHILD_JOIN',4,event)\"><span class=\"ICOnarrative\"></span></BUTTON></TD>" + "<TD><INPUT aria-required=\"false\" class=\"TXTstd\"  id=KEY_FIELDS  name=KEY_FIELDS type=\"text\">  <BUTTON class=\"BTNimg\" title=\"Click to expand\" tabindex=\"-1\" onclick=\"popupedit('PF_TABLES','KEY_FIELDS',5,event)\"><span class=\"ICOnarrative\"></span></BUTTON></TD>" + "<TD><INPUT aria-required=\"false\" class=\"TXTstd\"  id=DATA_TYPE  name=DATA_TYPE type=\"text\"> <BUTTON class=\"BTNimg\" title=\"Click to expand\" tabindex=\"-1\" onclick=\"popupedit('PF_TABLES','DATA_TYPE',6,event)\"><span class=\"ICOnarrative\"></span></BUTTON> </TD>" + "<TD><INPUT aria-required=\"false\" type=checkbox  id=ARCHIVE_NOT_REQD  name=ARCHIVE_NOT_REQD ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"checkbox\" id=EXCLUDE_PURGE  name=EXCLUDE_PURGE  ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"hidden\" id=TABLE_COLUMNS  name=TABLE_COLUMNS  ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"hidden\" id=COLUMN_DATATYPES  name=COLUMN_DATATYPES  ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"hidden\" id=COLUMN_MAXLENGTHS  name=COLUMN_MAXLENGTHS  ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" id=HISTORY_TABLE_NAME  name=HISTORY_TABLE_NAME size=\"40\"  ></TD>"
    }
    else if (tableName == 'AMOUNTTAB') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><SELECT aria-required=\"false\" id=C_BLK_NAME name=C_BLK_NAME    onChange=\"fn_Populate_BlkFields_toRetunflds('AMOUNTTAB',1,2,event)\"></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=C_FLD_NAME  name=C_FLD_NAME></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" type=\"text\" id=INOUT  name=INOUT ><option></option><option value=\"I\">Input</option><option value=\"O\">Output</option><option value=\"IO\">Input/Output</option></SELECT></TD>"
    }
    else if (tableName == 'PATTERNTAB') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" id=P_FLD_DESC  name=P_FLD_DESC ></TD>" + "<TD><SELECT aria-required=\"false\" id=P_BLK_NAME name=P_BLK_NAME    onChange=\"fn_Populate_BlkFields_toRetunflds('PATTERNTAB',2,3,event)\"></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=P_FLD_NAME  name=P_FLD_NAME></SELECT></TD>"
    }
	 else if (tableName == 'COMMON_ENTITY') {
        trow = "<TD><INPUT aria-required=\"false\"  type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" size=20 id=COMMON_ENTITY_NAME  type=\"text\"   name=COMMON_ENTITY_NAME onchange=\"upper(this)\"><BUTTON class=\"BTNimg\" title=\"List Of Values\" tabindex=\"-1\"   onclick=\"LOV_ENTITY_ID.show_lov('COMMON_ENTITY_NAME~COMMON_ENTITY_MODULE','COMMON_ENTITY','', 'Entity ID~Module', 'Entity ID~Module', 'Entity ID~Module',event)\"><span class=\"ICOlov\"></span></BUTTON></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\"  size=20 id=COMMON_ENTITY_MODULE name=COMMON_ENTITY_MODULE ></TD>" + "<TD><INPUT aria-required=\"false\" type=hidden id=ENTITY_ARGUMENTS name=ENTITY_ARGUMENTS ></TD>"
    }
	else if (tableName == 'PF_ARGDESC') {
        trow = "<TD><INPUT aria-required=\"false\"  type=checkbox name=checkgroup id=checkgroup></TD>" + "<TD><INPUT aria-required=\"false\" id=ARGUMENT_NAME    name=ARGUMENT_NAME  type=\"text\" onchange=\"upper(this)\"></TD>" + "<TD><SELECT aria-required=\"false\" id=DATA_SRC  name=DATA_SRC type=\"text\"    onChange=\"fn_populate_Columns_PF_ARGDESC('PF_ARGDESC',2,3,event)\"></SELECT></TD>" + "<TD><SELECT aria-required=\"false\" id=COLUMN_NAME   name=COLUMN_NAME   type=\"text\"   ></SELECT></TD>"
    }
	else if (tableName == 'XSD_Annotation') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" id=PARENT_NAME name=PARENT_NAME  SIZE=\"90\" readonly=\"yes\" font=\"Arial\" type=\"text\" ><BUTTON class=\"BTNimg\" title=\"Click to expand\" tabindex=\"-1\" onclick=\"popupedit('XSD_Annotation','PARENT_NAME',1,event)\"><span class=\"ICOnarrative\"></span></BUTTON></TD>" + "<TD><INPUT aria-required=\"false\"  name=\"ELEMENT_NAME\" id=\"ELEMENT_NAME\"  type=\"text\"  SIZE=\"30\" ></TD>" + "<TD><INPUT aria-required=\"false\"  name=\"LABEL_NAME\" id=\"LABEL_NAME\"  type=\"text\"  SIZE=\"30\"> <BUTTON class=\"BTNimg\" title=\"List Of Values\" tabindex=\"-1\" onclick=\"LOV_ANNOTATION.show_lov('LABEL_NAME~','frmLovDetls','', 'Label Code', 'Node Key~Node Comment', 'Node Key~Node Comment',event)\"><span class=\"ICOlov\"></span></BUTTON></TD>"
    }
    else if (tableName == 'mannotationCode') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"25\" id=COMMENT_CODE readonly=\"yes\" name=COMMENT_CODE></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"40\" id=COMMENT_DESCRIPTION readonly=\"yes\" name=COMMENT_DESCRIPTION> </TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"10\" id=Operation readonly=\"yes\" name=Operation> </TD>"
    }
    else if (tableName == 'LOV_ENHANCER') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\"  name=\"LOV_ID\" id=\"LOV_ID\"  type=\"text\"  SIZE=\"30\" ></TD>" +  "<TD><SELECT aria-required=\"false\"  onChange=\"fnChangeStatus(this)\" id=LOV_STATUS name=LOV_STATUS><option value=\"I\">Internal</option><option value=\"E\">External</option><option value=\"C\">Combined</option></SELECT></TD>" + "<TD><INPUT aria-required=\"false\" type=\"hidden\" size=\"10\" id=LOV_QUERY readonly=\"yes\" name=LOV_QUERY> </TD>" + "<TD><INPUT aria-required=\"false\" type=\"hidden\" size=\"10\" id=STATUS readonly=\"yes\" name=STATUS value=\"NO\"> </TD>" + "<TD><INPUT aria-required=\"false\" type=\"hidden\"   id=FINRESLT readonly=\"yes\" name=FINRESLT> </TD>"
    }
    else if (tableName == 'REDUCTION_MAP') {
        trow = "<TD><INPUT aria-required=\"false\" type=checkbox name=checkgroup id=checkgroup> </TD>" + "<TD><INPUT aria-required=\"false\"  name=\"RED_FLD\" id=\"LOV_ID\"  type=\"text\"  SIZE=\"30\" ></TD>" + "<TD><INPUT aria-required=\"false\" type=\"text\" size=\"10\" id=MAPPING_FLD   name=MAPPING_FLD> </TD>" 
    }
    else if (tableName == 'REST_TABLE') {
        trow = "<TD align=\"center\"><INPUT aria-required=\"false\"  type=checkbox name=checkgroup id=checkgroup ></TD>" + "<TD ><INPUT aria-required=\"false\" size=60 id=REST_OPERATION_CODE    name=REST_OPERATION_CODE type=\"text\"></TD>" +  "<TD style=\"border-right:0px;\"><BUTTON id=\"Req&Res\"  title=\"Req&Res\" name=\"Req&Res\"  onclick=\"fnRestArgs(event)\" class=\"Buttontext\">Req&Res</BUTTON> </TD>" +"<TD style=\"border-right:0px;\"><INPUT aria-required=\"false\" id=RELEASE_TYPE   name=RELEASE_TYPE size=0  type=hidden></TD>" + "<TD style=\"border-right:0px;\"><INPUT aria-required=\"false\" id=RELEASE_NAME   name=RELEASE_NAME size=0  type=hidden></TD>" + "<TD><INPUT aria-required=\"false\" id=REST_REQ_INPUT   name=REST_REQ_INPUT type=hidden></TD>"  + "<TD><INPUT aria-required=\"false\" id=REST_RES_OUTPUT   name=REST_RES_OUTPUT type=hidden></TD>" + "<TD><INPUT aria-required=\"false\" id=REST_CALLFORM   name=REST_CALLFORM type=hidden></TD>"
    }
   
	
    return trow;
}

function addTableRow(tableName) {
    if (!document.getElementById(tableName)) {
        return;
    }
    var trow = getTabelRow(tableName);
    var newRow = document.getElementById(tableName).tBodies[0].insertRow(document.getElementById(tableName).tBodies[0].rows.length);
    var rowArr = new Array();
    var cellsArr = new Array();
    var arrSize = new Array();
    var tableRef = document.getElementById(tableName);
    var tHead = tableRef.tHead.rows[0];
    var tBodyHTML = document.getElementById(tableName).tBodies[0].rows[0].innerHTML;
    tBodyHTML = trow;
    var styleArray = new Array();
    var trCellArray = tBodyHTML.split("</TD>");
    var trwln = document.getElementById(tableName).tBodies[0].rows.length
    var R = 0;
    for (var j = 0;j < trCellArray.length - 1;j++) {
        rowArr[j] = trCellArray[j] + "</TD>";
        newCell = newRow.insertCell(newRow.cells.length);
        newRow.cells[j].innerHTML = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        try {
            try {
                newRow.cells[j].getElementsByTagName("INPUT")[0].title = "Record " + trwln + " col " + R;
            }
            catch (e) {
                newRow.cells[j].getElementsByTagName("SELECT")[0].title = "Record " + trwln + " col " + R;
            }
        }
        catch (e) {
            newRow.cells[j].getElementsByTagName("BUTTON")[0].title = "Record " + trwln + " col " + R;
        }
        if (R == 0)
            newRow.cells[j].setAttribute("scope", "row");
        cellsArr[j] = newRow.cells[j];
        rowArr[j] = rowArr[j].substring(rowArr[j].indexOf(">") + 1, rowArr[j].indexOf("</TD>"));
        R++;
    }
    return newRow;
}

function delTableRow(tableName) {
    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    for (var index = numRows - 1;index >= 0;index--) {
        if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
            tableObject.tBodies[0].deleteRow(index);
        }
    }
}

function deleteAll(tableName) {

    var tableObject = document.getElementById(tableName);
    var numRows = tableObject.tBodies[0].rows.length;
    for (var index = numRows - 1;index >= 0;index--) {
        tableObject.tBodies[0].deleteRow(index);
    }
}

function checkAll(tableName, chk) {

    var inputs = document.getElementById(tableName).getElementsByTagName('INPUT');
    var checkboxes = [];
    for (var i = 0;i < inputs.length;i++) {
        if (document.getElementById(tableName).rows[0].getElementsByTagName("INPUT")[0].checked == true) {
            if (inputs[i].name == chk) {
                inputs[i].checked = true;
            }
        }
        if (document.getElementById(tableName).rows[0].getElementsByTagName("INPUT")[0].checked == false) {
            if (inputs[i].name == chk) {
                inputs[i].checked = false;
            }
        }
    }
}

function fnShowResult(tableName, fileName, subfolder, status, remarks) {
    addTableRow(tableName);
    var rowRef = document.getElementsByName(tableName)[0].tBodies[0].rows[document.getElementsByName(tableName)[0].tBodies[0].rows.length - 1];
    rowRef.cells[0].getElementsByTagName("INPUT")[0].value = document.getElementsByName(tableName)[0].tBodies[0].rows.length;
    rowRef.cells[0].getElementsByTagName("INPUT")[0].readonly = true;
    rowRef.cells[1].getElementsByTagName("INPUT")[0].value = fileName;
    rowRef.cells[1].getElementsByTagName("INPUT")[0].readonly = true;
    rowRef.cells[2].getElementsByTagName("INPUT")[0].value = subfolder;
    rowRef.cells[2].getElementsByTagName("INPUT")[0].readonly = true;
    rowRef.cells[3].getElementsByTagName("SELECT")[0].value = status;
    rowRef.cells[3].getElementsByTagName("SELECT")[0].readonly = true;
    rowRef.cells[4].getElementsByTagName("INPUT")[0].value = remarks;
    rowRef.cells[4].getElementsByTagName("INPUT")[0].readonly = true;

}

function fnSetMode(obj) {
    fngetReadMode('BULK');
    document.getElementsByName(obj)[0].disabled = false
    document.getElementsByName("BROWSE")[0].disabled = false;
    document.getElementsByName("FILE_SAVE_PATH")[0].disabled = false;
    document.getElementsByName(obj)[0].style.visibility = "hidden";
    document.getElementsByName("BROWSE")[0].style.visibility = "visible";
    document.getElementsByName("FILE_SAVE_PATH")[0].style.visibility = "visible";
}

function fnenblDsblOpCd(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    var cellno = 2;
    if (srcElement.parentNode.parentNode.getElementsByTagName("INPUT")[0].checked == true) {
        if (srcElement.parentNode.parentNode.getElementsByTagName("INPUT")[2].disabled == true) {
            srcElement.parentNode.parentNode.getElementsByTagName("INPUT")[2].disabled = false;
            srcElement.parentNode.parentNode.getElementsByTagName("INPUT")[2].className = "TXTstd";
        }
        else {
            srcElement.parentNode.parentNode.getElementsByTagName("INPUT")[2].disabled = true;
            srcElement.parentNode.parentNode.getElementsByTagName("INPUT")[2].className = "TXTro";
        }
    }
    fnRestActionsUI();
}

function Fndetailvw(value) {
    getNodeDetails(selected + "~" + value);
}

function move(id) {

	var row = getParent(id, "TR");

	if (id.getAttribute('class') == 'up') {

		var sibling = row.previousElementSibling;
		var parent = row.parentNode;
		parent.insertBefore(row, sibling);
	} else {
		var sibling = row.nextElementSibling;
		var parent = row.parentNode;
		parent.insertBefore(sibling, row);
	}

}

function getParent(myTd, type) {

	var parent = myTd.parentNode;

	while (true) {
		if (parent == null) {
			return;
		}
		if (parent.nodeName === type) {
			return parent;
		}
		parent = parent.parentNode;
	}

}