/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2024, Oracle and/or its affiliates.
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
**  File Name          : OLDUDFUL_SYS.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

//***** Code for criteria Search *****
var criteriaSearch  = 'N';
//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR THE SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var fieldNameArray = {"BLK_UDF_MASTER":"AUTH_STAT~CHECKER_DT_STAMP~CHECKER_ID~FILE_NAME~MAKER_DT_STAMP~MAKER_ID~MOD_NO~ONCE_AUTH~RECORD_STAT~REFERENCE_NO","BLK_UDF_UPLOAD":"AUTH_STAT~BRANCH~CHECKER_DT_STAMP~CHECKER_ID~CONTRACT_REF_NO~FIELD_NAME~FIELD_VALUE~FILE_NAME~MAKER_DT_STAMP~MAKER_ID~RECORD_STAT~REFERENCE_NO~REK_KEY","BLK_UDF_SUMMARY":"AUTH_STAT~CHECKER_ID~FILE_NAME~MAKER_ID~REFERENCE_NO","BLK_UDF_MASTER_EXP":"REFERENCE_NO","BLK_UDF_EXCEPTION":"ERROR_CODE~ERROR_PARAMETERS~SOURCE_REF~TXTEXP"};

var multipleEntryPageSize = {"BLK_UDF_UPLOAD" :"15" ,"BLK_UDF_EXCEPTION" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_UDF_UPLOAD","CVS_ERROR_LOG__TAB_MAIN":"BLK_UDF_EXCEPTION"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_UDF_MASTER">AUTH_STAT~CHECKER_DT_STAMP~CHECKER_ID~FILE_NAME~MAKER_DT_STAMP~MAKER_ID~MOD_NO~ONCE_AUTH~RECORD_STAT~REFERENCE_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_UDF_MASTER" RELATION_TYPE="N" TYPE="BLK_UDF_UPLOAD">AUTH_STAT~BRANCH~CHECKER_DT_STAMP~CHECKER_ID~CONTRACT_REF_NO~FIELD_NAME~FIELD_VALUE~FILE_NAME~MAKER_DT_STAMP~MAKER_ID~RECORD_STAT~REFERENCE_NO~REK_KEY</FN>'; 
msgxml += '      <FN PARENT="BLK_UDF_MASTER" RELATION_TYPE="1" TYPE="BLK_UDF_SUMMARY">AUTH_STAT~CHECKER_ID~FILE_NAME~MAKER_ID~REFERENCE_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_UDF_MASTER" RELATION_TYPE="1" TYPE="BLK_UDF_MASTER_EXP">REFERENCE_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_UDF_MASTER_EXP" RELATION_TYPE="N" TYPE="BLK_UDF_EXCEPTION">ERROR_CODE~ERROR_PARAMETERS~SOURCE_REF~TXTEXP</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_UDF_MASTER" RELATION_TYPE="1" TYPE="BLK_UDF_SUMMARY">REFERENCE_NO~AUTH_STAT~MAKER_ID~CHECKER_ID~FILE_NAME</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDUDFUL";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_UDF_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_UDF_MASTER" : "","BLK_UDF_UPLOAD" : "BLK_UDF_MASTER~N","BLK_UDF_SUMMARY" : "BLK_UDF_MASTER~1","BLK_UDF_MASTER_EXP" : "BLK_UDF_MASTER~1","BLK_UDF_EXCEPTION" : "BLK_UDF_MASTER_EXP~N"}; 

 var dataSrcLocationArray = new Array("BLK_UDF_MASTER","BLK_UDF_UPLOAD","BLK_UDF_SUMMARY","BLK_UDF_MASTER_EXP","BLK_UDF_EXCEPTION"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDUDFUL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDUDFUL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_UDF_MASTER__REFERENCE_NO";
pkFields[0] = "BLK_UDF_MASTER__REFERENCE_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var modifyAmendArr = new Array(); 
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
var queryAmendArr = new Array(); 
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_UDF_SUMMARY__REFERENCE_NO__LOV_REFERENCE_NO":["~","","N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'TAB_MAIN';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_UDF_UPLOAD","BLK_UDF_EXCEPTION");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array(); 

 var CallFormRelat=new Array(); 

 var CallRelatType= new Array(); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDUDFUL"]="KERNEL";
ArrPrntFunc["OLDUDFUL"]="";
ArrPrntOrigin["OLDUDFUL"]="";
ArrRoutingType["OLDUDFUL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDUDFUL"]="N";
ArrCustomModified["OLDUDFUL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ERROR_LOG":"REFNO"};
var scrArgSource = {"CVS_ERROR_LOG":"BLK_UDF_MASTER__REFERENCE_NO"};
var scrArgVals = {"CVS_ERROR_LOG":""};
var scrArgDest = {"CVS_ERROR_LOG":"BLK_UDF_MASTER_EXP__REFERENCE_NO"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {};
var dpndntOnSrvs = {};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------