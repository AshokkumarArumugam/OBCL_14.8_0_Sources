/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2016, Oracle and/or its affiliates.
**  All rights reserved.
**  
**  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle and/or its affiliates.
**  
**  Oracle Financial Services Software Limited.
**  Oracle Park, Off Western Express Highway,
**  Goregaon (East),
**  Mumbai - 400 063,
**  India.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : OLDSTATS_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  SFR Number         : 26709396
**  Last Modified By   : Shishirkumar Aithal
**  Last modified on   : 16 Nov 2017
**  Change Description : Added code to enable the Buttons post execute query.
**  Search String      : Bug No 26709396 Changes
**
**  SFR Number         : 26709396
**  Last Modified By   : USHA
**  Last modified on   : 16 Nov 2021
**  Change Description : Changes to bring the Rule builder
**  Search String      : Bug#33574859
****************************************************************************************************************************/

function fnpopadv(){
	var e = mainWin.event || e;
	currRow = getRowIndex(e);	
	fnSubScreenMain('OLDSTATS', 'OLDSTATS', 'CVS_ADVICE',false);	
}
function fnpopgl(){
	var e = mainWin.event || e;
	currRow = getRowIndex(e);	
	fnSubScreenMain('OLDSTATS', 'OLDSTATS', 'CVS_GLS',false);	
}
function fnpopliq(){
	var e = mainWin.event || e;
	currRow = getRowIndex(e);	
	fnSubScreenMain('OLDSTATS', 'OLDSTATS', 'CVS_PRODUCT_LIQ_ORDER',false);	
}
//Bug#33574859 Starts
function fnpopRole(){
	var e = mainWin.event || e;
	currRow = getRowIndex(e);	
	fnSubScreenMain('OLDSTATS', 'OLDSTATS', 'CVS_STATUS_ROLE_MAP',false);
}
function fnpopConditonBuilder(){
	var e = mainWin.event || e;
	currRow = getRowIndex(e);	
	fnSubScreenMain('OLDSTATS', 'OLDSTATS', 'CVS_CONDITON_BUILDER',false);	
}
function fnPreSave_CVS_CONDITON_BUILDER_KERNEL(){
	parent.screenArgs['NonDB'] = getElementsByOjName("CONDITIONS")[0].value;
	return true;
}

function fnPostClose_CVS_CONDITON_BUILDER_KERNEL(){
	getElementsByOjName("COND")[currRow-1].value = screenArgs['NonDB'];
	return true;
}

function FnbtnAnd(){
	getElementsByOjName("CONDITIONS")[0].value = getElementsByOjName("CONDITIONS")[0].value +" AND ";
}

function FnbtnOr() {
	getElementsByOjName("CONDITIONS")[0].value = getElementsByOjName("CONDITIONS")[0].value +" OR ";
}

function FnbtnClear() {
	getElementsByOjName("CONDITIONS")[0].value = "";
}

function fnOp()
{
	getElementsByOjName("CONDITIONS")[0].value = getElementsByOjName("CONDITIONS")[0].value + " " + getElementsByOjName("MATHEMATICAL_OP")[0].value;
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
			if (getElementsByOjName("CONDITIONS")[0].value == '')
  				getElementsByOjName("CONDITIONS")[0].value = getElementsByOjName("FIELDS")[0].value + " " + getElementsByOjName("OPERATOR")[0].value + " " + the_value;	
			else if (getElementsByOjName("CONDITIONS")[0].value !='')
  				getElementsByOjName("CONDITIONS")[0].value = getElementsByOjName("CONDITIONS")[0].value + " " + getElementsByOjName("FIELDS")[0].value + " " + getElementsByOjName("OPERATOR")[0].value + " " + the_value; 
		}
}
function fn_enable_disable()
{
	var i = 0;
    //var tableRef = document.getElementById("BLK_OLTMS_PRODUCT_STATUS_GL"); //Bug#34958820 Changes
	var tableRef = getTableObjForBlock("BLK_OLTMS_PRODUCT_STATUS_GL"); //Bug#34958820 Changes
    var rows = tableRef.tBodies[0].rows;
    var len = rows.length;
	if (len > 0) 
	{
		for (i = 0; i < len; i++) 
		{	
			fnDisableElement(getElementsByOjName('MAP_TYPE')[i]);
			if (getElementsByOjName('MAP_TYPE')[i].value == 'S')
			{
				fnDisableElement(getElementsByOjName('BTN_RULE')[i]);
				fnEnableElement(getElementsByOjName('TRANSFERGL')[i]);
			}
			else
			{
				fnDisableElement(getElementsByOjName('TRANSFERGL')[i]);
				fnEnableElement(getElementsByOjName('BTN_RULE')[i]);
			}
		}
	}
}

function fnPostReturnValToParent_LOV_STATUS_ACCROLE_KERNEL() 
{
	fn_enable_disable();
}

function fnPostAddRow_BLK_OLTMS_PRODUCT_STATUS_GL_KERNEL()
{
	fn_enable_disable();
	return true;
}
function fnPostDeleteRow_BLK_OLTMS_PRODUCT_STATUS_GL_KERNEL() 
{
	fn_enable_disable();
	return true;
}
function fnPostNavigate_BLK_OLTMS_PRODUCT_STATUS_GL_KERNEL()
{
	fn_enable_disable();	
    return true;
}
function fnPostLoad_CVS_GLS_KERNEL(screenArgs) 
{
	fn_enable_disable();
	screenArgs['NonDBProd'] = getElementsByOjName('PRODUCT')[0].value;
	return true;
}
function fnPostLoad_CVS_STATUS_ROLE_MAP_KERNEL(screenArgs) 
{
	screenArgs['NonDBProd'] = parent.screenArgs['NonDBProd'];
	return true;
}
function fnPreLoad_CVS_CONDITON_BUILDER_KERNEL(screenArgs) 
{
	screenArgs['NonDBProd'] = parent.screenArgs['NonDBProd'];
	return true;
}
function fnPostLoad_CVS_CONDITON_BUILDER_KERNEL(screenArgs) 
{
	getElementsByOjName('PRODUCT')[0].value = parent.screenArgs['NonDBProd'];
	return true;
}
//Bug#33574859 Ends
function fnPostExecuteQuery_KERNEL() {
       ////Bug No 26709396 Changes Start
	     fnEnableElement(document.getElementById("BLK_OLTMS_PRODUCT_STATUS_MASTER__BTN_ADVICES")); 
         fnEnableElement(document.getElementById("BLK_OLTMS_PRODUCT_STATUS_MASTER__BTN_GLS")); 
         fnEnableElement(document.getElementById("BLK_OLTMS_PRODUCT_STATUS_MASTER__BTN_LIQ_ORDER")); 
       ////Bug No 26709396 Changes End        
	return true;
}
