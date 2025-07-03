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
**  File Name          : SMDCHGTL_SYS.js
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
msgxml += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="" RELATION="" TYPE="SMVWS_USERS_TIMELEVEL">HOME_BRANCH~USER_ID~TERMINAL~TIME_LEVEL</FN>'; 
msgxml += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="SMVWS_USERS_TIMELEVEL" RELATION="" TYPE="SMVW_USERS_TIMELEVEL">USER_ID~TERMINAL~TIME_LEVEL~HOME_BRANCH</FN>'; 
msgxml += '    </FLD>'; 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
var relationArray = new Array(); 			// {Table Name} is the array index, {Parent Table Name}~{Relation} is the array value 
relationArray['SMVWS_USERS_TIMELEVEL'] = ""; 
relationArray['SMVW_USERS_TIMELEVEL'] = "SMVWS_USERS_TIMELEVEL~N"; 

var dataSrcLocationArray = new Array(); 	// Array of all Data Sources used in the screen 
dataSrcLocationArray[0] = "SMVWS_USERS_TIMELEVEL"; 
dataSrcLocationArray[1] = "SMVW_USERS_TIMELEVEL"; 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside SMDCHGTL.js, in "TableName__FieldName" format
var pkFields    = new Array();    //Values should be set inside SMDCHGTL.js, in "TableName__FieldName" format
queryFields[0] = "SMVWS_USERS_TIMELEVEL__USER_ID";
pkFields[0] = "SMVWS_USERS_TIMELEVEL__USER_ID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var amendArr = new Array(); 
var subsysArr    = new Array(); 

amendArr[0] = "SMVWS_USERS_TIMELEVEL__TIME_LEVEL";


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
multipleEntryIDs[0] = 'BLK_SMVW_USERS_TIMELEVEL';
//--------------------------------------------
function fnAddRow_BLK_SMVW_USERS_TIMELEVEL()
{
    return true;
}
//--------------------------------------------
function fnDeleteRow_BLK_SMVW_USERS_TIMELEVEL()
{
    return true;
}
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------