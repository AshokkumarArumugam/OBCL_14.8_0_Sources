/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2022, Oracle and/or its affiliates.
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
**  File Name          : RPDRNMNT_SYS.js
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
msgxml += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="" RELATION="" TYPE="RPTMS_PRINTER">PRINTER_ID~PRINTER_NAME~BRANCH~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~MOD_NO~RECORD_STAT~AUTH_STAT~ONCE_AUTH</FN>'; 
msgxml += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="RPTMS_PRINTER" RELATION="RPTMS_PRINTER.PRINTER_ID = RPTMS_PRINTER_ROLE.PRINTER_ID AND RPTMS_PRINTER.BRANCH = RPTMS_PRINTER_ROLE.BRANCH_ID" TYPE="RPTMS_PRINTER_ROLE">PRINTER_ID~BRANCH_ID~ROLE_ID</FN>'; 
msgxml += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="RPTMS_PRINTER" RELATION="RPTMS_PRINTER.PRINTER_ID = RPTMS_PRINTER_USER.PRINTER_ID AND RPTMS_PRINTER.BRANCH = RPTMS_PRINTER_USER.BRANCH_ID" TYPE="RPTMS_PRINTER_USER">PRINTER_ID~USER_ID~BRANCH_ID</FN>'; 
msgxml += '    </FLD>'; 
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="" RELATION="" TYPE="RPTMS_PRINTER">AUTH_STAT~RECORD_STAT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "RPDRNMNT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
var relationArray = new Array(); 			// {Table Name} is the array index, {Parent Table Name}~{Relation} is the array value 
relationArray['RPTMS_PRINTER'] = ""; 
relationArray['RPTMS_PRINTER_ROLE'] = "RPTMS_PRINTER~N"; 
relationArray['RPTMS_PRINTER_USER'] = "RPTMS_PRINTER~N"; 

var dataSrcLocationArray = new Array(); 	// Array of all Data Sources used in the screen 
dataSrcLocationArray[0] = "RPTMS_PRINTER"; 
dataSrcLocationArray[1] = "RPTMS_PRINTER_ROLE"; 
dataSrcLocationArray[2] = "RPTMS_PRINTER_USER"; 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside RPDRNMNT.js, in "TableName__FieldName" format
var pkFields    = new Array();    //Values should be set inside RPDRNMNT.js, in "TableName__FieldName" format
queryFields[0] = "RPTMS_PRINTER__PRINTER_ID";
pkFields[0] = "RPTMS_PRINTER__PRINTER_ID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var amendArr = new Array(); 
var subsysArr    = new Array(); 



//----------------------------------------------------------------------------------------------------------------------

/***** Script for subscreen functionalities *****/

/***** Script for call form functionalities *****/

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var LOV_ROLE = new lov("","ROLE_ID!TEXT!ROLE_ID~ROLE_DESCRIPTION!TEXT!ROLE_DESCRIPTION","STRING~STRING","ROLE_ID~","LBL_ROLE","LBL_ROLE_ID~LBL_ROLE_DESCRIPTION","RPDRNMNT","BRANCH!STRING~PRINTER_ID!STRING","200","10","ORACLE","~"," ","Y","");
var LOV_USERID = new lov("","USER_ID!TEXT!USER_ID","STRING","USER_ID","LBL_USER_IDENTIFICATION","LBL_USER_IDENTIFICATION","RPDRNMNT","PRINTER_ID!STRING~PRINTER_ID!STRING","200","10","ORACLE","~"," ","Y","");
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var l_HeaderTabId = '';
var strCurrentTabID = 'All';
//--------------------------------------------
function inTab(pstrTabID)
{
    if (pstrTabID == 'All')
    {
        fnInTab_All();
    }
    strCurrentTabID = pstrTabID;
}
//--------------------------------------------
function outTab(pstrTabID)
{
    if (pstrTabID == 'All')
    {
        return fnOutTab_All();
    }
}
//--------------------------------------------
function fnInTab_All()
{
    showTabData();
}
//--------------------------------------------
function fnOutTab_All()
{
    appendData(document.getElementById('TBLPage' + strCurrentTabID));
    return true;
}
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array();
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//--------------------------------------------
multipleEntryIDs[0] = 'BLK_RPTMS_PRINTER_ROLE';
multipleEntryIDs[1] = 'BLK_RPTMS_PRINTER_USER';
//--------------------------------------------
function fnAddRow_BLK_RPTMS_PRINTER_ROLE()
{
    return true;
}
//--------------------------------------------
function fnDeleteRow_BLK_RPTMS_PRINTER_ROLE()
{
    return true;
}
//--------------------------------------------
function fnAddRow_BLK_RPTMS_PRINTER_USER()
{
    return true;
}
//--------------------------------------------
function fnDeleteRow_BLK_RPTMS_PRINTER_USER()
{
    return true;
}
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------