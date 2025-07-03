/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  File Name          : GWDEXFUN_SYS.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR THE SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="" RELATION="" TYPE="GWTMS_EXT_SYS_FUNCTIONS">EXT_SYSTEM~FUNCTION_ID~ACTION~BULK_SMS_CHK_REQ~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~MOD_NO~RECORD_STAT~AUTH_STAT~ONCE_AUTH</FN>'; 
msgxml += '      <FN ISQUERY="1" ISCONTROL="0" PARENT="GWTMS_EXT_SYS_FUNCTIONS" RELATION="GWTMS_EXT_SYS_FUNCTIONS.EXT_SYSTEM = GWTM_EXT_SYS_MASTER.EXT_SYSTEM" TYPE="GWTM_EXT_SYS_MASTER">DESCRIPTION~EXT_SYSTEM</FN>'; 
msgxml += '      <FN ISQUERY="1" ISCONTROL="0" PARENT="GWTMS_EXT_SYS_FUNCTIONS" RELATION="GWTMS_EXT_SYS_FUNCTIONS.FUNCTION_ID = GWTMS_GATEWAY_FUNCTIONS.FUNCTION_ID AND GWTMS_EXT_SYS_FUNCTIONS.ACTION = GWTMS_GATEWAY_FUNCTIONS.ACTION" TYPE="GWTMS_GATEWAY_FUNCTIONS">SERVICE_NAME~OPERATION_CODE~FUNCTION_ID~ACTION</FN>'; 
msgxml += '    </FLD>'; 
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="" RELATION="" TYPE="GWTMS_EXT_SYS_FUNCTIONS">AUTH_STAT~RECORD_STAT~EXT_SYSTEM~FUNCTION_ID~ACTION</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "GWDEXFUN";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
var relationArray = new Array(); 			// {Table Name} is the array index, {Parent Table Name}~{Relation} is the array value 
relationArray['GWTMS_EXT_SYS_FUNCTIONS'] = ""; 
relationArray['GWTM_EXT_SYS_MASTER'] = "GWTMS_EXT_SYS_FUNCTIONS~1"; 
relationArray['GWTMS_GATEWAY_FUNCTIONS'] = "GWTMS_EXT_SYS_FUNCTIONS~1"; 

var dataSrcLocationArray = new Array(); 	// Array of all Data Sources used in the screen 
dataSrcLocationArray[0] = "GWTMS_EXT_SYS_FUNCTIONS"; 
dataSrcLocationArray[1] = "GWTM_EXT_SYS_MASTER"; 
dataSrcLocationArray[2] = "GWTMS_GATEWAY_FUNCTIONS"; 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside GWDEXFUN.js, in "TableName__FieldName" format
var pkFields    = new Array();    //Values should be set inside GWDEXFUN.js, in "TableName__FieldName" format
queryFields[0] = "GWTMS_EXT_SYS_FUNCTIONS__EXT_SYSTEM";
pkFields[0] = "GWTMS_EXT_SYS_FUNCTIONS__EXT_SYSTEM";
queryFields[1] = "GWTMS_EXT_SYS_FUNCTIONS__FUNCTION_ID";
pkFields[1] = "GWTMS_EXT_SYS_FUNCTIONS__FUNCTION_ID";
queryFields[2] = "GWTMS_EXT_SYS_FUNCTIONS__ACTION";
pkFields[2] = "GWTMS_EXT_SYS_FUNCTIONS__ACTION";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var amendArr = new Array(); 
var subsysArr    = new Array(); 

amendArr[0] = "GWTMS_EXT_SYS_FUNCTIONS__BULK_SMS_CHK_REQ";


//----------------------------------------------------------------------------------------------------------------------

/***** Script for subscreen functionalities *****/

/***** Script for call form functionalities *****/

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var LOV_EXTSYS = new lov("","EXT_SYSTEM!TEXT!EXT_SYSTEM~DESCRIPTION!TEXT!DESCRIPTION","STRING~STRING","EXT_SYSTEM~DESCRIPTION","External System","LBL_EXT_SYS~LBL_DESCRIPTION","GWDEXFUN","","500","10","ORACLE","~"," ","Y","");
var LOV_FUNCID = new lov("","SMS_FUNCTION_ID!TEXT!SMS_FUNCTION_ID~SMS_ACTION!TEXT!SMS_ACTION~SERVICE_NAME!TEXT!SERVICE_NAME~OPERATION_CODE!TEXT!OPERATION_CODE","STRING~STRING~STRING~STRING","FUNCTION_ID~ACTION~SERVICE_NAME~OPERATION_CODE","Function ID","LBL_FUNCTION_ID~LBL_ACTION~LBL_SERVICE_NAME~LBL_OPERATION_CODE","GWDEXFUN","EXT_SYSTEM!STRING","500","10","ORACLE","~"," ","Y","");
var LOV_ACTION = new lov("","SMS_ACTION!TEXT!SMS_ACTION","STRING","ACTION","Action","LBL_ACTION","GWDEXFUN","FUNCTION_ID!STRING","500","10","ORACLE","~"," ","Y","");
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var l_HeaderTabId = 'ALL';
var strCurrentTabID = 'All';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array();
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//--------------------------------------------
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------