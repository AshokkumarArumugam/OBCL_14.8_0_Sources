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
**  File Name          : GIDIFTDF_SYS.js
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
var fieldNameArray = {"BLK_GITM_FORMAT_DEFINITION":"BRANCH_CODE~COMMIT_FETCH_FREQUENCY~CONFIRMATION_FILE_PATH~CONFIRM_FILE_MASK~CONFIRM_FILE_REQD~CRC_ALGORITHM~CRC_FILE_MASK~CRC_FILE_PATH~CRC_REQUIRED~DATA_LOG_REQD~DATES~DATE_FORMAT~DATE_JUSTIFICATION~DATE_PADDING_CHARACTER~DAY~DEFAULT_ACTION~DELIMETER~DUP_FILE_CHECK_REQD~EXTERNAL_SYSTEM~FILE_MASK~FILE_PATH~FORMAT_TYPE~FREQUENCY~FUNCTION_ID~INCOMING_FILE_MASK~INTERFACE_CODE~INTERFACE_TYPE~INTERVAL_TYPE~LAST_RUN_DATE~LOG_OUTPUT~MANDATORY~MONTH~NEXT_RUN_DATE~NO_OF_PARALLEL_PROCESS~NO_OF_RECORDS~NUMBER_JUSTIFICATION~NUMBER_PADDING_CHARACTER~ON_OVERRIDE~OUTGOING_INTERFACE~PARALLEL_PROCESS~PARALLEL_PROCESS_REQD~POST_MESSAGE_AUDF~PRE_MESSAGE_AUDF~PROCESSED_FILE_MASK~SUPPRESS_START_REF~TEXT_JUSTIFICATION~TEXT_PADDING_CHARACTER~TRIGGER_TYPE~WHEN_TO_RUN~CUSTOM_LOGGING~SCHEDULED~SCH_END_HH~SCH_END_MIN~SCH_START_HH~SCH_START_MIN~CHARACTERSET_TYPE~OPTIONAL_ENCL_FLD~BACKWARD_COMPATIBILITY~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_GITM_COMPONENT_LINKAGE":"BATCH_BY_FIELD~BRANCH_CODE~CALLFORM_NAME~COMPONENT_NAME~COMPONENT_TYPE~EXTERNAL_SYSTEM~GROUPBY_CLAUSE~HAVING_CLAUSE~INTERFACE_CODE~ORDERBY_CLAUSE~PARENT~POST_COMPONENT_AUDF~POST_RECORD_AUDF~PRE_COMPONENT_AUDF~PRE_RECORD_AUDF~RELATION~SERIAL_NO~WHERE_CLAUSE","BLK_GITM_COMPONENT_FIELD_LINKAGE":"COLUMN_NAME~COMPONENT_NAME~DATA_TYPE~DEFAULT_PARAMETER~DERIVATION_LOGIC~FIELD_LENGTH~FIELD_NAME~FIELD_TYPE~INTERFACE_CODE~OBJECT_NAME~PKEY~POSITION~POST_FIELD~POST_FIELD_AUDF~PRECISION~PRE_FIELD~PRE_FIELD_AUDF~SERIAL_NO~TABLE_NAME~TRANSLATION_REQD~UN_TRANS_VALUE~FLD_SKIP","BLK_GITM_FILE_NAMES":"FILE_NAME~INTERFACE_CODE","BLK_GITM_OBJECT_STORAGE_PREF":"INTERFACE_CODE~INTERFACE_STORAGE_NAME~INTERFACE_STORAGE_URI"};

var multipleEntryPageSize = {"BLK_GITM_COMPONENT_LINKAGE" :"15" ,"BLK_GITM_COMPONENT_FIELD_LINKAGE" :"15" ,"BLK_GITM_FILE_NAMES" :"15" ,"BLK_GITM_OBJECT_STORAGE_PREF" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_COMPONENT__TAB_MAIN":"BLK_GITM_COMPONENT_LINKAGE~BLK_GITM_COMPONENT_FIELD_LINKAGE","CVS_FILE_NAMES__TAB_MAIN":"BLK_GITM_FILE_NAMES","CVS_OBJECT_PREFERENCE__TAB_MAIN":"BLK_GITM_OBJECT_STORAGE_PREF"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_GITM_FORMAT_DEFINITION">BRANCH_CODE~COMMIT_FETCH_FREQUENCY~CONFIRMATION_FILE_PATH~CONFIRM_FILE_MASK~CONFIRM_FILE_REQD~CRC_ALGORITHM~CRC_FILE_MASK~CRC_FILE_PATH~CRC_REQUIRED~DATA_LOG_REQD~DATES~DATE_FORMAT~DATE_JUSTIFICATION~DATE_PADDING_CHARACTER~DAY~DEFAULT_ACTION~DELIMETER~DUP_FILE_CHECK_REQD~EXTERNAL_SYSTEM~FILE_MASK~FILE_PATH~FORMAT_TYPE~FREQUENCY~FUNCTION_ID~INCOMING_FILE_MASK~INTERFACE_CODE~INTERFACE_TYPE~INTERVAL_TYPE~LAST_RUN_DATE~LOG_OUTPUT~MANDATORY~MONTH~NEXT_RUN_DATE~NO_OF_PARALLEL_PROCESS~NO_OF_RECORDS~NUMBER_JUSTIFICATION~NUMBER_PADDING_CHARACTER~ON_OVERRIDE~OUTGOING_INTERFACE~PARALLEL_PROCESS~PARALLEL_PROCESS_REQD~POST_MESSAGE_AUDF~PRE_MESSAGE_AUDF~PROCESSED_FILE_MASK~SUPPRESS_START_REF~TEXT_JUSTIFICATION~TEXT_PADDING_CHARACTER~TRIGGER_TYPE~WHEN_TO_RUN~CUSTOM_LOGGING~SCHEDULED~SCH_END_HH~SCH_END_MIN~SCH_START_HH~SCH_START_MIN~CHARACTERSET_TYPE~OPTIONAL_ENCL_FLD~BACKWARD_COMPATIBILITY~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_GITM_FORMAT_DEFINITION" RELATION_TYPE="N" TYPE="BLK_GITM_COMPONENT_LINKAGE">BATCH_BY_FIELD~BRANCH_CODE~CALLFORM_NAME~COMPONENT_NAME~COMPONENT_TYPE~EXTERNAL_SYSTEM~GROUPBY_CLAUSE~HAVING_CLAUSE~INTERFACE_CODE~ORDERBY_CLAUSE~PARENT~POST_COMPONENT_AUDF~POST_RECORD_AUDF~PRE_COMPONENT_AUDF~PRE_RECORD_AUDF~RELATION~SERIAL_NO~WHERE_CLAUSE</FN>'; 
msgxml += '      <FN PARENT="BLK_GITM_COMPONENT_LINKAGE" RELATION_TYPE="N" TYPE="BLK_GITM_COMPONENT_FIELD_LINKAGE">COLUMN_NAME~COMPONENT_NAME~DATA_TYPE~DEFAULT_PARAMETER~DERIVATION_LOGIC~FIELD_LENGTH~FIELD_NAME~FIELD_TYPE~INTERFACE_CODE~OBJECT_NAME~PKEY~POSITION~POST_FIELD~POST_FIELD_AUDF~PRECISION~PRE_FIELD~PRE_FIELD_AUDF~SERIAL_NO~TABLE_NAME~TRANSLATION_REQD~UN_TRANS_VALUE~FLD_SKIP</FN>'; 
msgxml += '      <FN PARENT="BLK_GITM_FORMAT_DEFINITION" RELATION_TYPE="N" TYPE="BLK_GITM_FILE_NAMES">FILE_NAME~INTERFACE_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_GITM_FORMAT_DEFINITION" RELATION_TYPE="N" TYPE="BLK_GITM_OBJECT_STORAGE_PREF">INTERFACE_CODE~INTERFACE_STORAGE_NAME~INTERFACE_STORAGE_URI</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_GITM_FORMAT_DEFINITION">AUTHSTAT~TXNSTAT~BRANCH_CODE~EXTERNAL_SYSTEM~INTERFACE_CODE~INTERFACE_TYPE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "GIDIFTDF";
var defaultWhereClause = "BRANCH_CODE=GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="BRANCH_CODE=GLOBAL.CURRENT_BRANCH";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_GITM_FORMAT_DEFINITION";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_GITM_FORMAT_DEFINITION" : "","BLK_GITM_COMPONENT_LINKAGE" : "BLK_GITM_FORMAT_DEFINITION~N","BLK_GITM_COMPONENT_FIELD_LINKAGE" : "BLK_GITM_COMPONENT_LINKAGE~N","BLK_GITM_FILE_NAMES" : "BLK_GITM_FORMAT_DEFINITION~N","BLK_GITM_OBJECT_STORAGE_PREF" : "BLK_GITM_FORMAT_DEFINITION~N"}; 

 var dataSrcLocationArray = new Array("BLK_GITM_FORMAT_DEFINITION","BLK_GITM_COMPONENT_LINKAGE","BLK_GITM_COMPONENT_FIELD_LINKAGE","BLK_GITM_FILE_NAMES","BLK_GITM_OBJECT_STORAGE_PREF"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside GIDIFTDF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside GIDIFTDF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_GITM_FORMAT_DEFINITION__INTERFACE_CODE";
pkFields[0] = "BLK_GITM_FORMAT_DEFINITION__INTERFACE_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_GITM_COMPONENT_FIELD_LINKAGE":["COLUMN_NAME","COMPONENT_NAME","DATA_TYPE","DEFAULT_PARAMETER","DERIVATION_LOGIC","FIELD_LENGTH","FIELD_NAME","FIELD_TYPE","FLD_SKIP","OBJECT_NAME","PKEY","POSITION","POST_FIELD","POST_FIELD_AUDF","PRECISION","PRE_FIELD","PRE_FIELD_AUDF","SERIAL_NO","TABLE_NAME","TRANSLATION_REQD","UN_TRANS_VALUE"],"BLK_GITM_COMPONENT_LINKAGE":["BATCH_BY_FIELD","BRANCH_CODE","CALLFORM_NAME","COMPONENT_NAME","COMPONENT_TYPE","EXTERNAL_SYSTEM","GROUPBY_CLAUSE","HAVING_CLAUSE","ORDERBY_CLAUSE","PARENT","POST_COMPONENT_AUDF","POST_RECORD_AUDF","PRE_COMPONENT_AUDF","PRE_RECORD_AUDF","RELATION","SERIAL_NO","WHERE_CLAUSE"],"BLK_GITM_FILE_NAMES":["FILE_NAME"],"BLK_GITM_FORMAT_DEFINITION":["BACKWARD_COMPATIBILITY","BRANCH_CODE","CHARACTERSET_TYPE","COMMIT_FETCH_FREQUENCY","CONFIRMATION_FILE_PATH","CONFIRM_FILE_MASK","CONFIRM_FILE_REQD","CRC_ALGORITHM","CRC_FILE_MASK","CRC_FILE_PATH","CRC_REQUIRED","CUSTOM_LOGGING","DATA_LOG_REQD","DATES","DATE_FORMAT","DATE_JUSTIFICATION","DATE_PADDING_CHARACTER","DAY","DEFAULT_ACTION","DELIMETER","DUP_FILE_CHECK_REQD","EXTERNAL_SYSTEM","FILE_MASK","FILE_PATH","FORMAT_TYPE","FREQUENCY","FUNCTION_ID","INCOMING_FILE_MASK","INTERVAL_TYPE","LAST_RUN_DATE","LOG_OUTPUT","MANDATORY","MONTH","NEXT_RUN_DATE","NO_OF_PARALLEL_PROCESS","NO_OF_RECORDS","NUMBER_JUSTIFICATION","NUMBER_PADDING_CHARACTER","ON_OVERRIDE","OUTGOING_INTERFACE","PARALLEL_PROCESS","PARALLEL_PROCESS_REQD","POST_MESSAGE_AUDF","PRE_MESSAGE_AUDF","PROCESSED_FILE_MASK","SCHEDULED","SCH_END_HH","SCH_END_MIN","SCH_START_HH","SCH_START_MIN","SUPPRESS_START_REF","TEXT_JUSTIFICATION","TEXT_PADDING_CHARACTER","TRIGGER_TYPE","WHEN_TO_RUN"],"BLK_GITM_OBJECT_STORAGE_PREF":["INTERFACE_STORAGE_NAME","INTERFACE_STORAGE_URI"]};
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
var lovInfoFlds = {"BLK_GITM_FORMAT_DEFINITION__CRC_ALGORITHM__LOV_CRC":["BLK_GITM_FORMAT_DEFINITION__CRC_ALGORITHM~","","N",""],"BLK_GITM_FORMAT_DEFINITION__EXTERNAL_SYSTEM__LOV_EXT_SYSTEM":["BLK_GITM_FORMAT_DEFINITION__EXTERNAL_SYSTEM~","","N",""],"BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID__LOV_FUNCTION_ID":["BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID~","","N",""],"BLK_GITM_FORMAT_DEFINITION__POST_MESSAGE_AUDF__LOV_POST_MSG_AUDF":["BLK_GITM_FORMAT_DEFINITION__POST_MESSAGE_AUDF~","","N",""],"BLK_GITM_FORMAT_DEFINITION__PRE_MESSAGE_AUDF__LOV_PRE_MSG_AUDF":["BLK_GITM_FORMAT_DEFINITION__PRE_MESSAGE_AUDF~","","N",""],"BLK_GITM_FORMAT_DEFINITION__CHARACTERSET_TYPE__LOV_CHARSET":["BLK_GITM_FORMAT_DEFINITION__CHARACTERSET_TYPE~~","","N~N",""],"BLK_GITM_COMPONENT_LINKAGE__CALLFORM_NAME__LOV_CALLFORM":["BLK_GITM_COMPONENT_LINKAGE__CALLFORM_NAME~","BLK_GITM_FORMAT_DEFINITION__FUNCTION_ID!VARCHAR2","N",""],"BLK_GITM_COMPONENT_LINKAGE__POST_COMPONENT_AUDF__LOV_POST_CMP_AUDF":["BLK_GITM_COMPONENT_LINKAGE__POST_COMPONENT_AUDF~","","N",""],"BLK_GITM_COMPONENT_LINKAGE__POST_RECORD_AUDF__LOV_POST_REC_AUDF":["BLK_GITM_COMPONENT_LINKAGE__POST_RECORD_AUDF~","","N",""],"BLK_GITM_COMPONENT_LINKAGE__PRE_COMPONENT_AUDF__LOV_PRE_CMP_AUDF":["BLK_GITM_COMPONENT_LINKAGE__PRE_COMPONENT_AUDF~","","N",""],"BLK_GITM_COMPONENT_LINKAGE__PRE_RECORD_AUDF__LOV_PRE_REC_AUDF":["BLK_GITM_COMPONENT_LINKAGE__PRE_RECORD_AUDF~","","N",""],"BLK_GITM_COMPONENT_FIELD_LINKAGE__OBJECT_NAME__LOV_OBJECT":["BLK_GITM_COMPONENT_FIELD_LINKAGE__OBJECT_NAME~~","","N~N",""],"BLK_GITM_COMPONENT_FIELD_LINKAGE__POST_FIELD_AUDF__LOV_POST_FIELD_AUDF":["BLK_GITM_COMPONENT_FIELD_LINKAGE__POST_FIELD_AUDF~","","N",""],"BLK_GITM_COMPONENT_FIELD_LINKAGE__PRE_FIELD_AUDF__LOV_PRE_FIELD_AUDF":["BLK_GITM_COMPONENT_FIELD_LINKAGE__PRE_FIELD_AUDF~","","N",""],"BLK_GITM_COMPONENT_FIELD_LINKAGE__TRANSLATION_REQD__LOV_TRANSLATION_REQD":["BLK_GITM_COMPONENT_FIELD_LINKAGE__TRANSLATION_REQD~","","N",""],"BLK_GITM_OBJECT_STORAGE_PREF__INTERFACE_STORAGE_NAME__LOV_OBJECT_NAMES":["BLK_GITM_OBJECT_STORAGE_PREF__INTERFACE_STORAGE_NAME~","BLK_GITM_FORMAT_DEFINITION__INTERFACE_CODE!VARCHAR~BLK_GITM_FORMAT_DEFINITION__INTERFACE_TYPE!VARCHAR","N",""]};
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
var multipleEntryIDs = new Array("BLK_GITM_COMPONENT_LINKAGE","BLK_GITM_COMPONENT_FIELD_LINKAGE","BLK_GITM_FILE_NAMES","BLK_GITM_OBJECT_STORAGE_PREF");
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

ArrFuncOrigin["GIDIFTDF"]="KERNEL";
ArrPrntFunc["GIDIFTDF"]="";
ArrPrntOrigin["GIDIFTDF"]="";
ArrRoutingType["GIDIFTDF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["GIDIFTDF"]="N";
ArrCustomModified["GIDIFTDF"]="N";

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