 /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2010  Oracle and/or its affiliates.  All rights reserved.
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
.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          :CSCACRHM_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  Last Modified By   :  Usha Rani Kota
**  Last modified on   :  23-Oct-2021
**  Search String      :  OBCL_14.5_RuleBasedRoleToHeadMapping
**  Reason             :  Added new functionality in Role to Head mapping screen to get the account heads based on the rules.

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 28-Feb-2023
**  Full Version       : REDWOOD ADOPTION changes
**  Reason             : Bug#34958820
****************************************************************************************************************************/
var l_functionId;
//OBCL_14.5_RuleBasedRoleToHeadMapping >> Starts
var currRow=0; 
function fn_enable_disable()
{
	var i = 0;
    var tableRef = getTableObjForBlock("BLK_MAPPING_DETAILS"); //Bug#34958820 changes
    var rows = tableRef.tBodies[0].rows;
    var len = rows.length;
	l_functionId = parent.uiXML;
	if (len > 0) 
	{
		for (i = 0; i < len; i++) 
		{	
			if (l_functionId != 'OLDPRMNT')
			{
				fnDisableElement(getElementsByOjName('MAP_TYPE')[i]);
				fnDisableElement(getElementsByOjName('BTN_RULE')[i]);
			}
			else
			{
				if (getElementsByOjName('MAP_TYPE')[i].value == 'S')
				{
					fnDisableElement(getElementsByOjName('BTN_RULE')[i]);
					fnEnableElement(getElementsByOjName('ACCTHD')[i]);
				}
				else
				{
					fnEnableElement(getElementsByOjName('BTN_RULE')[i]);
					fnDisableElement(getElementsByOjName('ACCTHD')[i]);
				}
			}
		}
	}	
}
//OBCL_14.5_RuleBasedRoleToHeadMapping << ends

function fnPostLoad_CVS_ROLE_TO_HEAD_MAP_KERNEL(screenArgs) {
	
    var i = 0;
    var tableRef = getTableObjForBlock("BLK_MAPPING_DETAILS"); //Bug#34958820 changes
    var rows = tableRef.tBodies[0].rows;
    var len = rows.length;
    /*if (len > 0) {
        for (i = 0; i < len; i++) {
            document.getElementById('BLK_MAPPING_DETAILS__PRDCD')[i].value = screenArgs['PRODUCT_CODE'];
        }
    }*/
	//OBCL_14.5_RuleBasedRoleToHeadMapping >> Starts
	if (len > 0) 
	{
		for (i = 0; i < len; i++) 
		{	
			if (getElementsByOjName('MAP_TYPE')[i].value == 'U')
				fnEnableElement(getElementsByOjName('BTN_RULE')[i]);
		}
	}
	// OBCL_14.5_RuleBasedRoleToHeadMapping<< Ends			
	if (gAction == "MODIFY"){
		
		getElementsByOjName("BTN_CLASS_DEFAULT")[0].disabled= false;
		//OBCL_14.5_RuleBasedRoleToHeadMapping>> Starts
		fn_enable_disable();
		//OBCL_14.5_RuleBasedRoleToHeadMapping<< Ends
	   }
	//OBCL_14.5_RuleBasedRoleToHeadMapping >> Starts
     if (gAction == "NEW"){
		fn_enable_disable();
	   }
    // OBCL_14.5_RuleBasedRoleToHeadMapping << Ends	   
	l_functionId = parent.uiXML;
	if (l_functionId == 'IADPRMNT')
	{
		document.getElementById('BLK_ROLE_TO_HEAD_MAPPING__MODULE').value = 'IP';
	}
    return true;
}

//OBCL_14.5_RuleBasedRoleToHeadMapping >> Start

function  fnPostClassDefault_CVS_ROLE_TO_HEAD_MAP_KERNEL()
{
	fn_enable_disable();
	return true;
}

function fnPostNavigate_BLK_MAPPING_DETAILS_KERNEL()
{
	fn_enable_disable();	
    return true;
}

function fnPostAddRow_BLK_MAPPING_DETAILS_KERNEL()
{
	l_functionId = parent.uiXML;
	var tableRef = getTableObjForBlock("BLK_MAPPING_DETAILS"); //Bug#34958820 changes
    var rows = tableRef.tBodies[0].rows;
    var len = rows.length;
	fnDisableElement(getElementsByOjName('BTN_RULE')[len-1])
	if (l_functionId != 'OLDPRMNT')
	{
		fnDisableElement(getElementsByOjName('MAP_TYPE')[len-1]);
		fnDisableElement(getElementsByOjName('BTN_RULE')[len-1]);	
    }	
    return true;
}

function fnPostDeleteRow_BLK_MAPPING_DETAILS_KERNEL() 
{	
	fn_enable_disable();
    return true;
}

function fnMaptype(event)
{
	var tableRef = getTableObjForBlock("BLK_MAPPING_DETAILS"); //Bug#34958820 changes
    var rows = tableRef.tBodies[0].rows;
    var len = rows.length;
	l_functionId = parent.uiXML;
	if (len > 0) 
	{
		for (i = 0; i < len; i++) 
		{
			if (l_functionId != 'OLDPRMNT')
			{
				fnDisableElement(getElementsByOjName('MAP_TYPE')[i]);
				fnDisableElement(getElementsByOjName('BTN_RULE')[i]);
			}
			else
			{
				if (getElementsByOjName('MAP_TYPE')[i].value == 'S')
				{
					fnDisableElement(getElementsByOjName('BTN_RULE')[i]);
					fnEnableElement(getElementsByOjName('ACCTHD')[i]);
				}
				else
				{
					fnEnableElement(getElementsByOjName('BTN_RULE')[i]);
					fnDisableElement(getElementsByOjName('ACCTHD')[i]);
				}
			}
		}
	}
	return true;
}

function fnpopRoleMap(){    
	
	var e = mainWin.event || e;
	currRow = getRowIndex(e);
	if (getElementsByOjName('MAP_TYPE')[currRow-1].value == 'U')
	{
		fnSubScreenMain('OLCACRHM','','CVS_ROLE_MAPPING');
		if (gAction != "MODIFY")
		{
			document.getElementById('cmdAddRow_BLK_ROLE_MAPPING').style.visibility='hidden';
			document.getElementById('cmdDelRow_BLK_ROLE_MAPPING').style.visibility='hidden';
		}
	}
	return true;
}

function fnpopcond(){    
	
	var e = mainWin.event || e;
	currRow = getRowIndex(e);
	fnSubScreenMain('OLCACRHM','','CVS_CONDITION_BUILDER');
	return true;
}

function fnPreSave_CVS_CONDITION_BUILDER_KERNEL(){
	parent.screenArgs['NonDB'] = getElementsByOjName("CONDITION")[0].value;
	return true;
}

function fnPostClose_CVS_CONDITION_BUILDER_KERNEL(){
	getElementsByOjName("COND")[currRow-1].value = screenArgs['NonDB'];
	return true;
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

function fnOp() {
	getElementsByOjName("CONDITION")[0].value = getElementsByOjName("CONDITION")[0].value + " " + getElementsByOjName("MATH_OP")[0].value;
	getElementsByOjName("MATH_OP")[0].value = null;
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

//OBCL_14.5_RuleBasedRoleToHeadMapping << Ends













