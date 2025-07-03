/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Oracle Banking Corporate Lending  Software Product.   Copyright ? 2021.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
 
**  Written by         : 
**  Date of creation   : 
**  File Name          :CSCACADD_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last modified on   :  25-MAY-2010
**  SEARCH STRING      :  SFR#3338
**  Reason             :  FCUBS_KERNEL11.1 - SFR#3338 - Passing Screenargs for Accounting and Advice Screens
**
**  Last modified on   :  06-Sep-2021
**  SEARCH STRING      :  OBCL_14.5_RuleBasedAccounting
**  Reason             :  A new block to is added to accounting entry subscreen to implement the rule based accounting. 
                          Also added changes for new subscreen 'Condition Builder' to capture the rules.
						  
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 28-Feb-2023
**  Full Version       : REDWOOD ADOPTION changes
**  Reason             : Bug#34958820
****************************************************************************************************************************/

var l_functionId;
//OBCL_14.5_RuleBasedAccounting
var currRow=0; 

function fnPostLoad_CVS_EVENTS_KERNEL(screenArgs) {
   
	if (gAction == "MODIFY"){
		
		getElementsByOjName("BTNCLASSDEF")[0].disabled= false;
	   }
	l_functionId = parent.uiXML;
	if (l_functionId == 'IADPRMNT')
	{
		document.getElementById('BLK_PRODUCT_EVENTS__MODULE').value = 'IP';
	}
    return true;
}
function fnPreLoad_CVS_ENTRIES_KERNEL(screenArgs) {
	var cnt=SingleCheck (screenArgs);   /* SFR#3338 changes */    
		 if (cnt > 1 || cnt==0 )
        {
           //alert('Select a Single Event for its Accounting Entries');
		   showErrorAlerts('IN-HEAR-221');//NLS change -Removal of hardcoded alerts
           return false;;
           }	
 
    
    return true;
}
function fnPostLoad_CVS_ENTRIES_KERNEL(screenArgs) {
    
    	//OBCL_14.5_RuleBasedAccounting >> Starts
	var l_function_parent = parent.l_functionId;
	if (l_function_parent != 'OLDPRMNT') {
		fnDisableElement(document.getElementById("BLK_ACCOUNTING_RULES__BTN_DEFAULT"));
		fnDisableElement(getElementsByOjName('BTN_CONDITION')[0]);
		fnDisableElement(getElementsByOjName('RULENUM')[0]);
		fnDisableElement(getElementsByOjName('COND')[0]);
	    document.getElementById('cmdAddRow_BLK_ACCOUNTING_RULES').style.visibility='hidden';
	    document.getElementById('cmdDelRow_BLK_ACCOUNTING_RULES').style.visibility='hidden';
	}
        //OBCL_14.5_RuleBasedAccounting	<< Ends
    return true;
}
function fnPreLoad_CVS_ADVICES_KERNEL(screenArgs) {
	var cnt=SingleCheck (screenArgs);  /* SFR#3338 changes */
		 if (cnt > 1 || cnt==0 )
        {

           //alert('Select a Single Event for its Advices');
		   showErrorAlerts('IN-HEAR-222');//NLS change -Removal of hardcoded alerts
           return false;;
           }
   
    
    return true;
}
function fnPostLoad_CVS_ADVICES_KERNEL(screenArgs) {
   
    return true;
}

function SingleCheck (screenArgs)	 /* SFR#3338 changes */
  {   
   var count=0;
  
   len = getTableObjForBlock("BLK_EVENT_DETAILS").tBodies[0].rows.length;
     for(i = 0;i < len; i++)
      {
          if(getTableObjForBlock("BLK_EVENT_DETAILS").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
          if(getTableObjForBlock("BLK_EVENT_DETAILS").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true)
          {
            count = count +1; 
              /* SFR#3338 changes Starts */ 
              if (count == 1){
                  screenArgs['EVNTCD'] = getTableObjForBlock("BLK_EVENT_DETAILS").tBodies[0].rows[i].cells[1].getElementsByTagName("oj-input-text")[0].value;
                  screenArgs['EVNDDESC'] = getElementsByOjName("ENVNTDESC")[i].value;
		          screenArgs['EVNTDESC'] = getElementsByOjName("ENVNTDESC")[i].value;
              }
              /* SFR#3338 changes Ends */
          } 
         }        
       }
	   return count;                   
   }
//OBCL_14.5_RuleBasedAccounting >> Starts

function fnpopcond(){    
	
	var e = mainWin.event || e;
	currRow = getRowIndex(e);
	fnSubScreenMain('OLCACADD','','CVS_COND_BUILDER');
	return true;
}

function fnPreSave_CVS_COND_BUILDER_KERNEL(){
	parent.screenArgs['NonDB'] = getElementsByOjName("CONDITION")[0].value;
	return true;
}

function fnPostClose_CVS_COND_BUILDER_KERNEL(){
	getElementsByOjName("COND")[currRow-1].value = screenArgs['NonDB'];
	return true;
}

function fnOp() {
	getElementsByOjName("CONDITION")[0].value = getElementsByOjName("CONDITION")[0].value + " " + getElementsByOjName("MATHEMATICAL_OP")[0].value;
	getElementsByOjName("MATHEMATICAL_OP")[0].value = null;
}

function FnbtnAccept() {
	var datatype;
	var the_value;
		if (getElementsByOjName("FIELDS")[0].value != "") 		{  
			if (getElementsByOjName("FIELDS")[0].value.indexOf("_OVR_DAYS") !=-1 )
				datatype = "N";
			else  
				datatype = "C";       
			if (isNaN(getElementsByOjName("VALUE")[0].value))  
				the_value = "'"+getElementsByOjName("VALUE")[0].value+"'";
			else    
				the_value = getElementsByOjName("VALUE")[0].value;    
			if (getElementsByOjName("CONDITION")[0].value == '')
  				getElementsByOjName("CONDITION")[0].value = getElementsByOjName("FIELDS")[0].value + " " + getElementsByOjName("OPERATOR")[0].value + " " + the_value;	
			else if (getElementsByOjName("CONDITION")[0].value !='')
  				getElementsByOjName("CONDITION")[0].value = getElementsByOjName("CONDITION")[0].value + " " + getElementsByOjName("FIELDS")[0].value + " " + getElementsByOjName("OPERATOR")[0].value + " " + the_value; 
		}
}	

function FnbtnAnd(){
	getElementsByOjName("CONDITION")[0].value = getElementsByOjName("CONDITION")[0].value +" AND ";
}

function FnbtnOr() {
	getElementsByOjName("CONDITION")[0].value = getElementsByOjName("CONDITION")[0].value +" OR ";
}

function FnbtnClear() {
	getElementsByOjName("CONDITION")[0].value = "";
}


function fnPostDeleteRow_BLK_ACCOUNTING_ENTRIES_KERNEL() {
	
	var l_function_parent = parent.l_functionId;
	if (l_function_parent != 'OLDPRMNT') {
		fnDisableElement(getElementsByOjName('BTN_CONDITION')[0]);
		fnDisableElement(getElementsByOjName('RULENUM')[0]);
		fnDisableElement(getElementsByOjName('COND')[0]);
        
		var cnt = getTableObjForBlock('BLK_ACCOUNTING_ENTRIES').tBodies[0].rows.length;
		if (cnt == 0 ) {
			var data_blk = "BLK_ACCOUNTING_RULES";
			fnDeleteRow(data_blk);		
		}
	}
return true;	
}
//OBCL_14.5_RuleBasedAccounting << Ends