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
**  File Name          : ISDCTMNT_SYS.js
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
msgxml += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="" RELATION="" TYPE="ISTMS_CLEARING_CODE">NETWORK_CODE~COUNTRY_CODE~CLEARING_CODE~CLEARING_CODE_DESC~BANK_NAME~ADDRESS_1~ADDRESS_2~ADDRESS_3~ADDRESS_4~OWN_CLEARING_CODE~CLEARING_CODE_IND~BIC_CODE~CUSTOMER_NO~CLEARING_CODE_TYPE~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~MOD_NO~RECORD_STAT~AUTH_STAT~ONCE_AUTH</FN>'; 
msgxml += '      <FN ISQUERY="1" ISCONTROL="0" PARENT="ISTMS_CLEARING_CODE" RELATION="ISTMS_CLEARING_CODE.NETWORK_CODE=ISTMS_NETWORK_CODE.NETWORK_CODE" TYPE="ISTMS_NETWORK_CODE">NETWORK_CODE~NETWORK_DESC~CCY_CODE~CLEARING_SYSTEM_PROP~CLEARING_SYSTEM_CODE</FN>'; 
msgxml += '      <FN ISQUERY="1" ISCONTROL="0" PARENT="ISTMS_CLEARING_CODE" RELATION="ISTMS_CLEARING_CODE.COUNTRY_CODE=STTMS_COUNTRY.COUNTRY_CODE" TYPE="STTMS_COUNTRY">COUNTRY_CODE~DESCRIPTION</FN>'; 
msgxml += '    </FLD>'; 
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="" RELATION="" TYPE="ISTMS_CLEARING_CODE">AUTH_STAT~RECORD_STAT~NETWORK_CODE~CLEARING_CODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "ISDCTMNT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
var relationArray = new Array(); 			// {Table Name} is the array index, {Parent Table Name}~{Relation} is the array value 
relationArray['ISTMS_CLEARING_CODE'] = ""; 
relationArray['ISTMS_NETWORK_CODE'] = "ISTMS_CLEARING_CODE~1"; 
relationArray['STTMS_COUNTRY'] = "ISTMS_CLEARING_CODE~1"; 

var dataSrcLocationArray = new Array(); 	// Array of all Data Sources used in the screen 
dataSrcLocationArray[0] = "ISTMS_CLEARING_CODE"; 
dataSrcLocationArray[1] = "ISTMS_NETWORK_CODE"; 
dataSrcLocationArray[2] = "STTMS_COUNTRY"; 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside ISDCTMNT.js, in "TableName__FieldName" format
var pkFields    = new Array();    //Values should be set inside ISDCTMNT.js, in "TableName__FieldName" format
queryFields[0] = "ISTMS_CLEARING_CODE__NETWORK_CODE";
pkFields[0] = "ISTMS_CLEARING_CODE__NETWORK_CODE";
queryFields[1] = "ISTMS_CLEARING_CODE__CLEARING_CODE";
pkFields[1] = "ISTMS_CLEARING_CODE__CLEARING_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var amendArr = new Array(); 
var subsysArr    = new Array(); 

amendArr[0] = "ISTMS_CLEARING_CODE__CLEARING_CODE_DESC";
amendArr[1] = "ISTMS_CLEARING_CODE__BANK_NAME";
amendArr[2] = "ISTMS_CLEARING_CODE__ADDRESS_1";
amendArr[3] = "ISTMS_CLEARING_CODE__ADDRESS_2";
amendArr[4] = "ISTMS_CLEARING_CODE__ADDRESS_3";
amendArr[5] = "ISTMS_CLEARING_CODE__ADDRESS_4";
amendArr[6] = "ISTMS_CLEARING_CODE__OWN_CLEARING_CODE";
amendArr[7] = "ISTMS_CLEARING_CODE__BIC_CODE";
amendArr[8] = "ISTMS_CLEARING_CODE__CLEARING_CODE_TYPE";


//----------------------------------------------------------------------------------------------------------------------

/***** Script for subscreen functionalities *****/

/***** Script for call form functionalities *****/

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var LOV_NETWORK_CODE = new lov("","NETWORK_CODE!TEXT!NETWORK_CODE~NETWORK_DESC!TEXT!NETWORK_DESC~CCY_CODE!TEXT!CCY_CODE~CLEARING_SYSTEM_PROP!TEXT!CLEARING_SYSTEM_PROP~CLEARING_SYSTEM_CODE!TEXT!CLEARING_SYSTEM_CODE","STRING~STRING~STRING~STRING~STRING","NETWORK_CODE~NETWORK_DESC~CCY_CODE~CLEARING_SYSTEM_PROP~CLEARING_SYSTEM_CODE","Select Network Code","LBL_NETWORK_CODE~LBL_NETWORK_DESC~LBL_CCY_CODE~LBL_CLEAR_SYS_PROP~LBL_CLEAR_SYS_CODE","ISDCTMNT","","60","10","ORACLE","~"," ","Y","N~N~N~N~N");
var LOV_COUNTRY_CODE = new lov("","COUNTRY_CODE!TEXT!COUNTRY_CODE~DESCRIPTION!TEXT!DESCRIPTION","STRING~STRING","COUNTRY_CODE~DESCRIPTION","Select Country","LBL_COUNTRY~LBL_DESCRIPTION","ISDCTMNT","","50","10","ORACLE","~"," ","Y","N~N");
var LOV_CUSTOMER_NO = new lov("","CUSTOMER_NO!TEXT!CUSTOMER_NO","STRING","CUSTOMER_NO","Select Customer Number","LBL_CUSTOMER_NUM_NLS","ISDCTMNT","","50","10","ORACLE","~"," ","Y","");
var LOV_BIC_CODE = new lov("","BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME","STRING~STRING","BIC_CODE~BIC_CODE_DESC","Select Bank Identification Code","LBL_BIC_CODES~LBL_BIC_CODE_DESC","ISDCTMNT","","50","10","ORACLE","~"," ","Y","");
var LOV_OWN_CLEARING_CODE = new lov("","CLEARING_CODE!TEXT!CLEARING_CODE~CLEARING_CODE_DESC!TEXT!CLEARING_CODE_DESC","STRING~STRING","OWN_CLEARING_CODE~CLEARING_CODE_DESC","Select Own Clearing Code","LBL_OWN_CLEARING_CODE~LBL_CLEARING_CODE_DESC","ISDCTMNT","NETWORK_CODE!STRING","50","10","ORACLE","~"," ","Y","");
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