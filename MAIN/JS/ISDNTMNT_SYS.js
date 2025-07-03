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
**  File Name          : ISDNTMNT_SYS.js
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
msgxml += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="" RELATION="" TYPE="ISTMS_NETWORK_CODE">NETWORK_CODE~NETWORK_DESC~NETWORK_PREFIX~CLEARING_CODE_MASK~FIRST_PARTY_FLD~CLEARING_SYSTEM_PROP~CLEARING_SYSTEM_CODE~CLEARING_SYS_DESC~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~MOD_NO~RECORD_STAT~AUTH_STAT~ONCE_AUTH</FN>'; 
msgxml += '      <FN ISQUERY="1" ISCONTROL="0" PARENT="ISTMS_NETWORK_CODE" RELATION="ISTMS_NETWORK_CODE.CCY_CODE = CYTMS_CCY_DEFN.CCY_CODE" TYPE="CYTMS_CCY_DEFN">CCY_CODE~CCY_NAME</FN>'; 
msgxml += '    </FLD>'; 
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="" RELATION="" TYPE="ISTMS_NETWORK_CODE">AUTH_STAT~RECORD_STAT~NETWORK_CODE~NETWORK_DESC~NETWORK_PREFIX~CLEARING_CODE_MASK~CCY_CODE~FIRST_PARTY_FLD~CLEARING_SYSTEM_PROP~CLEARING_SYSTEM_CODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "ISDNTMNT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
var relationArray = new Array(); 			// {Table Name} is the array index, {Parent Table Name}~{Relation} is the array value 
relationArray['ISTMS_NETWORK_CODE'] = ""; 
relationArray['CYTMS_CCY_DEFN'] = "ISTMS_NETWORK_CODE~1"; 

var dataSrcLocationArray = new Array(); 	// Array of all Data Sources used in the screen 
dataSrcLocationArray[0] = "ISTMS_NETWORK_CODE"; 
dataSrcLocationArray[1] = "CYTMS_CCY_DEFN"; 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside ISDNTMNT.js, in "TableName__FieldName" format
var pkFields    = new Array();    //Values should be set inside ISDNTMNT.js, in "TableName__FieldName" format
queryFields[0] = "ISTMS_NETWORK_CODE__NETWORK_CODE";
pkFields[0] = "ISTMS_NETWORK_CODE__NETWORK_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var amendArr = new Array(); 
var subsysArr    = new Array(); 

amendArr[0] = "ISTMS_NETWORK_CODE__NETWORK_DESC";
amendArr[1] = "ISTMS_NETWORK_CODE__NETWORK_PREFIX";
amendArr[2] = "ISTMS_NETWORK_CODE__CLEARING_CODE_MASK";


//----------------------------------------------------------------------------------------------------------------------

/***** Script for subscreen functionalities *****/

/***** Script for call form functionalities *****/

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var LOV_CCY_CODE = new lov("","CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME","STRING~STRING","CCY_CODE~CCY_NAME","Currency","LBL_CURRENCY~LBL_CCY_NAME","ISDNTMNT","","100","10","ORACLE","~"," ","Y","");
var LOV_CLEAR_SYS_CODE = new lov("","TYPE_VALUE!TEXT!TYPE_VALUE~TYPE_DESC!TEXT!TYPE_DESC","STRING~STRING","CLEARING_SYSTEM_CODE~CLEARING_SYSTEM_DESC","","LBL_TYPE~LBL_DESC","ISDNTMNT","","100","","ORACLE","~"," ","Y","");
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
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------