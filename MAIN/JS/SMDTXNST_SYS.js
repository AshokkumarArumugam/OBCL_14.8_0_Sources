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
**  File Name          : SMDTXNST_SYS.js
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
msgxml += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="" RELATION="" TYPE="SMTBS_TXN_STATUS">TXN_STATUS</FN>'; 
msgxml += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="SMTBS_TXN_STATUS" RELATION="SMTBS_TXN_STATUS.TXN_STATUS=SMTB_TXN_STATUS.TXN_STATUS" TYPE="SMTB_TXN_STATUS">TXN_STATUS~AUTH_STATUS~CONTROL_1~CONTROL_10~CONTROL_11~CONTROL_12~CONTROL_13~CONTROL_14~CONTROL_15~CONTROL_16~CONTROL_2~CONTROL_3~CONTROL_4~CONTROL_5~CONTROL_6~CONTROL_7~CONTROL_8~CONTROL_9</FN>'; 
msgxml += '    </FLD>'; 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
var relationArray = new Array(); 			// {Table Name} is the array index, {Parent Table Name}~{Relation} is the array value 
relationArray['SMTBS_TXN_STATUS'] = ""; 
relationArray['SMTB_TXN_STATUS'] = "SMTBS_TXN_STATUS~N"; 

var dataSrcLocationArray = new Array(); 	// Array of all Data Sources used in the screen 
dataSrcLocationArray[0] = "SMTBS_TXN_STATUS"; 
dataSrcLocationArray[1] = "SMTB_TXN_STATUS"; 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside SMDTXNST.js, in "TableName__FieldName" format
var pkFields    = new Array();    //Values should be set inside SMDTXNST.js, in "TableName__FieldName" format
queryFields[0] = "SMTBS_TXN_STATUS__TXN_STATUS";
pkFields[0] = "SMTBS_TXN_STATUS__TXN_STATUS";
queryFields[1] = "SMTBS_TXN_STATUS__AUTH_STATUS";
pkFields[1] = "SMTBS_TXN_STATUS__AUTH_STATUS";
queryFields[2] = "SMTBS_TXN_STATUS__INTERFACE_STATUS";
pkFields[2] = "SMTBS_TXN_STATUS__INTERFACE_STATUS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var amendArr = new Array(); 
var subsysArr    = new Array(); 



//----------------------------------------------------------------------------------------------------------------------

/***** Script for subscreen functionalities *****/

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
multipleEntryIDs[0] = 'BLK_SMTB_TXN_STATUS';
//--------------------------------------------
function fnAddRow_BLK_SMTB_TXN_STATUS()
{
    return true;
}
//--------------------------------------------
function fnDeleteRow_BLK_SMTB_TXN_STATUS()
{
    return true;
}
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------