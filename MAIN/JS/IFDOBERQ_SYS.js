/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
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
**  File Name          : IFDOBERQ_SYS.js
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
var fieldNameArray = {"BLK_CO_RETRY_REQ":"AUTH_STAT~CHECKER_DT_STAMP~CHECKER_ID~COMM_MODE~DESTINATION_SYSTEM~EXT_STATUS~FORCEPROCESS~FUNCTION_ID~KEYID~LOG_TIME~MAKER_DT_STAMP~MAKER_ID~MSGID~PROCESS_SEQ_NO~PROCESS_STATUS~REQ_TYPE~SERVICE_CODE~BRANCH_CODE~SOURCE_SEQ_NO~REQ_LIST","BLK_CO_RETRY_REQ_NEW":"AUTH_STAT~CHECKER_DT_STAMP~CHECKER_ID~COMM_MODE~DESTINATION_SYSTEM~EXT_STATUS~FORCEPROCESS~FUNCTION_ID~KEYID~LOG_TIME~MAKER_DT_STAMP~MAKER_ID~MSGID~PROCESS_SEQ_NO~PROCESS_STATUS~REQ_LIST~REQ_TYPE~SERVICE_CODE~SOURCE_SEQ_NO~BRANCH_CODE"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

 var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CO_RETRY_REQ">AUTH_STAT~CHECKER_DT_STAMP~CHECKER_ID~COMM_MODE~DESTINATION_SYSTEM~EXT_STATUS~FORCEPROCESS~FUNCTION_ID~KEYID~LOG_TIME~MAKER_DT_STAMP~MAKER_ID~MSGID~PROCESS_SEQ_NO~PROCESS_STATUS~REQ_TYPE~SERVICE_CODE~BRANCH_CODE~SOURCE_SEQ_NO~REQ_LIST</FN>'; 
msgxml += '      <FN PARENT="BLK_CO_RETRY_REQ" RELATION_TYPE="1" TYPE="BLK_CO_RETRY_REQ_NEW">AUTH_STAT~CHECKER_DT_STAMP~CHECKER_ID~COMM_MODE~DESTINATION_SYSTEM~EXT_STATUS~FORCEPROCESS~FUNCTION_ID~KEYID~LOG_TIME~MAKER_DT_STAMP~MAKER_ID~MSGID~PROCESS_SEQ_NO~PROCESS_STATUS~REQ_LIST~REQ_TYPE~SERVICE_CODE~SOURCE_SEQ_NO~BRANCH_CODE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CO_RETRY_REQ">BRANCH_CODE~MSGID~KEYID~PROCESS_SEQ_NO~SERVICE_CODE~PROCESS_STATUS~EXT_STATUS~FUNCTION_ID~DESTINATION_SYSTEM~FORCEPROCESS~AUTH_STAT~REQ_TYPE~LOG_TIME~COMM_MODE~CHECKER_ID~CHECKER_DT_STAMP~MAKER_ID~MAKER_DT_STAMP~SOURCE_SEQ_NO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "IFDOBERQ";
var defaultWhereClause = "";
var defaultOrderByClause ="LOG_TIME";
var multiBrnWhereClause ="";
var g_SummaryType ="B";
var g_SummaryBtnCount =3;
var g_SummaryBlock ="BLK_CO_RETRY_REQ";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CO_RETRY_REQ" : "","BLK_CO_RETRY_REQ_NEW" : "BLK_CO_RETRY_REQ~1"}; 

 var dataSrcLocationArray = new Array("BLK_CO_RETRY_REQ","BLK_CO_RETRY_REQ_NEW"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside IFDOBERQ.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside IFDOBERQ.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CO_RETRY_REQ__KEYID";
pkFields[0] = "BLK_CO_RETRY_REQ__KEYID";
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
var lovInfoFlds = {};
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
var multipleEntryIDs = new Array();
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

ArrFuncOrigin["IFDOBERQ"]="KERNEL";
ArrPrntFunc["IFDOBERQ"]="";
ArrPrntOrigin["IFDOBERQ"]="";
ArrRoutingType["IFDOBERQ"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["IFDOBERQ"]="N";
ArrCustomModified["IFDOBERQ"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {};
var scrArgSource = {};
var scrArgVals = {};
var scrArgDest = {};
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