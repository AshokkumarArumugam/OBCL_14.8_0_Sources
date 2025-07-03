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
**  File Name          : OLDLNKAM_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT":"CONTRACT_REF_NO~PRODUCT_TYPE~PRODUCT_CODE~LATEST_VERSION_NO~LATEST_EVENT_SEQ_NO~COUNTERPARTY~CONTRACT_CCY~CURR_EVENT_CODE~LATEST_EVENT_DATE~AUTH_STATUS~MODULE_CODE~WORKFLOW_STATUS~RATE_REVISION_STATUS~CONTRACT_STATUS~TREASURY_SOURCE~BRANCH~DEPARTMENT_CODE~USER_DEFINED_STATUS~TXTCUSTOMERNAME~TXTVALUE_DATE~TXTMATURITY_DATE~TXTMATURITY_TYPE~TXTLOAN_OUTSTANDING_AMT","BLK_CONTRACT_LINK_AMENDMENT":"CONTRACT_REF_NO~VERSION_NO~EVENT_SEQ_NO~LINKED_TO_BRANCH~LINKAGE_TYPE~LINKED_TO_REF~VALUE_DATE~ESN_OF_LINKED_REF~LINKED_AMOUNT~CONVERTED_LINKED_AMOUNT~EXCHANGE_RATE~TXTLINKED_TO_CURRENCY~TXTAMD_DATE~TXTLINKED_TO_REF~TXTLINKAGE_TYPE~TXTLINKED_TO_BRANCH~TXTLINKED_TO_CCY~TXTEXCHANGE_RATE~TXTLINKED_AMOUNT~TXTLATEST_SEQ_NO~TXTCURRENT_SEQ_NO","BLK_AUDIT":"CONTRACT_REF_NO~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE~MAKER_ID~MAKER_DT_STAMP~MODULE~CHECKER_ID~CHECKER_DT_STAMP~NEW_VERSION_INDICATOR~TXNSTAT~AUTHSTAT~WORKFLOW_STATUS~REVERSED_EVENT_SEQ_NO~EVENT_VALUE_DATE~ECA_STATUS~RATE_REVISION_STATUS~RELEASE_BY~RELEASE_DT_STAMP~RATE_ASSIGNED_BY~RATE_ASSIGN_DT_STAMP~RATE_ASSIGN_AUTH_BY~RATE_ASSIGN_AUTH_DT_STAMP~INFORM_STATUS~TXTCONTRACT_STATUS~TXTAUTH_STATUS","BLK_OLTBS_CONTRACT_CONTROL":"CONTRACTREFNO~ENTRYBY~PROCESSCODE"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">CONTRACT_REF_NO~PRODUCT_TYPE~PRODUCT_CODE~LATEST_VERSION_NO~LATEST_EVENT_SEQ_NO~COUNTERPARTY~CONTRACT_CCY~CURR_EVENT_CODE~LATEST_EVENT_DATE~AUTH_STATUS~MODULE_CODE~WORKFLOW_STATUS~RATE_REVISION_STATUS~CONTRACT_STATUS~TREASURY_SOURCE~BRANCH~DEPARTMENT_CODE~USER_DEFINED_STATUS~TXTCUSTOMERNAME~TXTVALUE_DATE~TXTMATURITY_DATE~TXTMATURITY_TYPE~TXTLOAN_OUTSTANDING_AMT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_CONTRACT_LINK_AMENDMENT">CONTRACT_REF_NO~VERSION_NO~EVENT_SEQ_NO~LINKED_TO_BRANCH~LINKAGE_TYPE~LINKED_TO_REF~VALUE_DATE~ESN_OF_LINKED_REF~LINKED_AMOUNT~CONVERTED_LINKED_AMOUNT~EXCHANGE_RATE~TXTLINKED_TO_CURRENCY~TXTAMD_DATE~TXTLINKED_TO_REF~TXTLINKAGE_TYPE~TXTLINKED_TO_BRANCH~TXTLINKED_TO_CCY~TXTEXCHANGE_RATE~TXTLINKED_AMOUNT~TXTLATEST_SEQ_NO~TXTCURRENT_SEQ_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_AUDIT">CONTRACT_REF_NO~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE~MAKER_ID~MAKER_DT_STAMP~MODULE~CHECKER_ID~CHECKER_DT_STAMP~NEW_VERSION_INDICATOR~TXNSTAT~AUTHSTAT~WORKFLOW_STATUS~REVERSED_EVENT_SEQ_NO~EVENT_VALUE_DATE~ECA_STATUS~RATE_REVISION_STATUS~RELEASE_BY~RELEASE_DT_STAMP~RATE_ASSIGNED_BY~RATE_ASSIGN_DT_STAMP~RATE_ASSIGN_AUTH_BY~RATE_ASSIGN_AUTH_DT_STAMP~INFORM_STATUS~TXTCONTRACT_STATUS~TXTAUTH_STATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_CONTROL">CONTRACTREFNO~ENTRYBY~PROCESSCODE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_LINK_AMENDMENT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_LINK_AMEND_SUMMARY">AUTH_STATUS~CONTRACT_STATUS~CONTRACT_REF_NO~BRANCH~COUNTERPARTY~LINKED_TO_REF~LINKAGE_TYPE~LINKED_AMOUNT~EXCHANGE_RATE~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDLNKAM";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LINK_AMEND_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT" : "","BLK_CONTRACT_LINK_AMENDMENT" : "BLK_OLTBS_CONTRACT~1","BLK_AUDIT" : "BLK_OLTBS_CONTRACT~1","BLK_OLTBS_CONTRACT_CONTROL" : "BLK_OLTBS_CONTRACT~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT","BLK_CONTRACT_LINK_AMENDMENT","BLK_AUDIT","BLK_OLTBS_CONTRACT_CONTROL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDLNKAM.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDLNKAM.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__CONTRACT_REF_NO";
pkFields[0] = "BLK_OLTBS_CONTRACT__CONTRACT_REF_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONTRACT_LINK_AMENDMENT":["EXCHANGE_RATE","LINKED_TO_REF","TXTAMD_DATEI"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_CONTRACT_LINK_AMENDMENT":["EXCHANGE_RATE","LINKED_TO_REF","TXTAMD_DATEI"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO__LOV_CONTRACT_REF":["BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__BRANCH~BLK_OLTBS_CONTRACT__PRODUCT_CODE~~","","N~N~N~N",""],"BLK_CONTRACT_LINK_AMENDMENT__LINKED_TO_REF__LOV_FIN_LINKED_TO_REF":["BLK_CONTRACT_LINK_AMENDMENT__LINKED_TO_REF~BLK_CONTRACT_LINK_AMENDMENT__LINKED_TO_BRANCH~BLK_CONTRACT_LINK_AMENDMENT__TXTLINKED_TO_CURRENCY~~","BLK_OLTBS_CONTRACT__TXTVALUE_DATE!DATE~BLK_OLTBS_CONTRACT__TXTMATURITY_DATE!DATE~BLK_OLTBS_CONTRACT__COUNTERPARTY!VARCHAR2~BLK_OLTBS_CONTRACT__CONTRACT_REF_NO!VARCHAR2~BLK_OLTBS_CONTRACT__CONTRACT_REF_NO!VARCHAR2~BLK_OLTBS_CONTRACT__LATEST_VERSION_NO!VARCHAR2","N~N~N~N",""]};
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

ArrFuncOrigin["OLDLNKAM"]="KERNEL";
ArrPrntFunc["OLDLNKAM"]="";
ArrPrntOrigin["OLDLNKAM"]="";
ArrRoutingType["OLDLNKAM"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDLNKAM"]="N";
ArrCustomModified["OLDLNKAM"]="N";

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