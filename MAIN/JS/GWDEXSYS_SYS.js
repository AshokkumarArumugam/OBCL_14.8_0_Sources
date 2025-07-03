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
**  File Name          : GWDEXSYS_SYS.js
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
msgxml += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="" RELATION="" TYPE="GWTM_EXT_SYS_MASTER">EXT_SYSTEM~DESCRIPTION~DEFAULT_RESP_QUEUE~DEAD_LETTER_QUEUE~RESP_MSG_ID_REG_REQD~CORREL_PATTERN~MSG_XCHANGE_PATTERN~XSD_VALIDATION_REQD~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~MOD_NO~RECORD_STAT~AUTH_STAT~ONCE_AUTH</FN>'; 
msgxml += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="GWTM_EXT_SYS_MASTER" RELATION="BLK_GWTM_EXT_SYS_MASTER.EXT_SYSTEM= BLK_GWTM_EXT_SYS_QUEUES.EXT_SYSTEM" TYPE="GWTM_EXT_SYS_QUEUES">EXT_SYSTEM~IN_QUEUE~RESP_QUEUE</FN>'; 
msgxml += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="GWTM_EXT_SYS_MASTER" RELATION="GWTM_EXT_SYS_MASTER.EXT_SYSTEM = GWTM_FTP_PARAMETER.EXTERNAL_SYSTEM" TYPE="GWTM_FTP_PARAMETER">EXTERNAL_SYSTEM~IP_ADDRESS~PORT~USER_NAME~PASSWORD</FN>'; 
msgxml += '    </FLD>'; 
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="" RELATION="" TYPE="GWTM_EXT_SYS_MASTER">AUTH_STAT~RECORD_STAT~EXT_SYSTEM~DEFAULT_RESP_QUEUE~DEAD_LETTER_QUEUE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "GWDEXSYS";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
var relationArray = new Array(); 			// {Table Name} is the array index, {Parent Table Name}~{Relation} is the array value 
relationArray['GWTM_EXT_SYS_MASTER'] = ""; 
relationArray['GWTM_EXT_SYS_QUEUES'] = "GWTM_EXT_SYS_MASTER~N"; 
relationArray['GWTM_FTP_PARAMETER'] = "GWTM_EXT_SYS_MASTER~1"; 

var dataSrcLocationArray = new Array(); 	// Array of all Data Sources used in the screen 
dataSrcLocationArray[0] = "GWTM_EXT_SYS_MASTER"; 
dataSrcLocationArray[1] = "GWTM_EXT_SYS_QUEUES"; 
dataSrcLocationArray[2] = "GWTM_FTP_PARAMETER"; 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside GWDEXSYS.js, in "TableName__FieldName" format
var pkFields    = new Array();    //Values should be set inside GWDEXSYS.js, in "TableName__FieldName" format
queryFields[0] = "GWTM_EXT_SYS_MASTER__EXT_SYSTEM";
pkFields[0] = "GWTM_EXT_SYS_MASTER__EXT_SYSTEM";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var amendArr = new Array(); 
var subsysArr    = new Array(); 

amendArr[0] = "GWTM_EXT_SYS_MASTER__DESCRIPTION";
amendArr[1] = "GWTM_EXT_SYS_MASTER__DEFAULT_RESP_QUEUE";
amendArr[2] = "GWTM_EXT_SYS_MASTER__DEAD_LETTER_QUEUE";
amendArr[3] = "GWTM_EXT_SYS_MASTER__CORREL_PATTERN";
amendArr[4] = "GWTM_EXT_SYS_MASTER__MSG_XCHANGE_PATTERN";
amendArr[5] = "GWTM_EXT_SYS_MASTER__XSD_VALIDATION_REQD";
amendArr[6] = "GWTM_EXT_SYS_MASTER__RESP_MSG_ID_REG_REQD";
amendArr[7] = "GWTM_EXT_SYS_QUEUES__RESP_QUEUE";
amendArr[8] = "GWTM_FTP_PARAMETER__IP_ADDRESS";
amendArr[9] = "GWTM_FTP_PARAMETER__PORT";
amendArr[10] = "GWTM_FTP_PARAMETER__USER_NAME";
amendArr[11] = "GWTM_FTP_PARAMETER__PASSWORD";


//----------------------------------------------------------------------------------------------------------------------

/***** Script for subscreen functionalities *****/

function fnShowSubscreen_CVS_FTP_PARAMETERS(){
	screenArgs = new Array();
	screenArgs['SCREEN_NAME'] = 'CVS_FTP_PARAMETERS';
	screenArgs['FUNCTION_ID'] = 'GWDEXSYS';
	screenArgs['LANG'] = mainWin.LangCode;
	screenArgs['UI_XML'] = 'GWDEXSYS';
	appendData(document.getElementById('TBLPage'+strCurrentTabID));
	screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/'+mainWin.LangCode+'/GWDEXSYS.xml',screenArgs['SCREEN_NAME']);

	fnShowSubScreen(screenArgs);
}

function fnSave_CVS_FTP_PARAMETERS(){
	fnSaveSubScreenData();
}

function fnExit_CVS_FTP_PARAMETERS(event){
	fnExitSubScreen(event);
}

/***** Script for call form functionalities *****/
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
multipleEntryIDs[0] = 'BLK_GWTM_EXT_SYS_QUEUES';
//--------------------------------------------
function fnAddRow_BLK_GWTM_EXT_SYS_QUEUES()
{
    return true;
}
//--------------------------------------------
function fnDeleteRow_BLK_GWTM_EXT_SYS_QUEUES()
{
    return true;
}
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------