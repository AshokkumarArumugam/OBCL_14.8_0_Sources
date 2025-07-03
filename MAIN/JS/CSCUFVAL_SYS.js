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
**  File Name          : CSCUFVAL_SYS.js
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
msgxml += '      <FN ISQUERY="0" ISCONTROL="0" PARENT="" RELATION="" TYPE="UDTBS_FUNC_UDF_UPLOAD_DETAIL">FUNCTION_ID~REC_KEY~FIELD_NAME~FIELD_VAL~DATA_TYPE~VAL_TYPE~FIELD_DESCRIPTION~MANDATORY~FIELD_VAL_DESC</FN>'; 
msgxml += '    </FLD>'; 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
var relationArray = new Array(); 			// {Table Name} is the array index, {Parent Table Name}~{Relation} is the array value 
relationArray['UDTBS_FUNC_UDF_UPLOAD_DETAIL'] = ""; 

var dataSrcLocationArray = new Array(); 	// Array of all Data Sources used in the screen 
dataSrcLocationArray[0] = "UDTBS_FUNC_UDF_UPLOAD_DETAIL"; 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside CSCUFVAL.js, in "TableName__FieldName" format
var pkFields    = new Array();    //Values should be set inside CSCUFVAL.js, in "TableName__FieldName" format
queryFields[0] = "UDTBS_FUNC_UDF_UPLOAD_DETAIL__FUNCTION_ID ";
pkFields[0] = "UDTBS_FUNC_UDF_UPLOAD_DETAIL__FUNCTION_ID ";
queryFields[1] = "UDTBS_FUNC_UDF_UPLOAD_DETAIL__REC_KEY ";
pkFields[1] = "UDTBS_FUNC_UDF_UPLOAD_DETAIL__REC_KEY ";
queryFields[2] = "UDTBS_FUNC_UDF_UPLOAD_DETAIL__FIELD_NAME";
pkFields[2] = "UDTBS_FUNC_UDF_UPLOAD_DETAIL__FIELD_NAME";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var amendArr = new Array(); 
var subsysArr    = new Array(); 

amendArr[0] = "UDTBS_FUNC_UDF_UPLOAD_DETAIL__FIELD_VAL";


//----------------------------------------------------------------------------------------------------------------------

/***** Script for subscreen functionalities *****/

/***** Script for call form functionalities *****/

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var LOV_UDF = new lov("","LOV!TEXT!LOV~LOV_DESC!TEXT!LOV_DESC","STRING~STRING","FIELD_VAL~FIELD_VAL_DESC","UDF","LBL_LOV~LBL_DESC","Form1","FIELD_NAME!STRING","100","10","ORACLE","~"," ","Y","N~N");
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
multipleEntryIDs[0] = 'BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL';
//--------------------------------------------
function fnAddRow_BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL()
{
    return true;
}
//--------------------------------------------
function fnDeleteRow_BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL()
{
    return true;
}
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------