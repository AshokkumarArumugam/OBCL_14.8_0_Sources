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
**  File Name          : LBDSKMAM_SYS.js
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
var fieldNameArray = {"BLK_OLTB_CONTRACT":"CONTRACTREFNO~BOOKDATE~SERIALNO~USERREFNO~BRANCH~PRODUCTCODE~COUNTERPARTY~PRODUCTTYPE~DEPARTMENTCODE~TREASURYSOURCE~LATESTEVENTSEQNO~LATESTVERSIONNO~CONTRACTSTATUS~AUTH_STATUS~TEMPLATE_STATUS~CURR_EVENT_CODE~MODULE_CODE~USER_DEFINED_STATUS~CONTRACT_CCY~LATEST_EVENT_DATE~EXTERNAL_REF_NO~AUTO_MANUAL_FLAG~FUND_REF_NO~RESPONSE_STAT~TXTPRODUCTDESC~TXTCUSTNAME","BLK_SKIM_MASTER":"CONTRACT_REF_NO~VERSION_NO~PAYER_PARTICIPANT~PAYER_COMPONENT~PAYER_COMPONENT_SERIAL_NO~RECEIVER_PARTICIPANT~RECEIVER_COMPONENT~RECEIVER_COMPONENT_SERIAL_NO~RECORD_SEQ_NO~TXTPAYPARTNAME~TXTRECPARTNAME~TXTVALUEDATE~TXTSKIMRATE","BLK_LBTBS_CONTRACT_SKIM_DETAILS":"CONTRACT_REF_NO~PAYER_PARTICIPANT~PAYER_COMPONENT~PAYER_COMPONENT_SERIAL_NO~EVENT_SEQ_NO~RECEIVER_PARTICIPANT~RECEIVER_COMPONENT~RECEIVER_COMPONENT_SERIAL_NO~SKIM_RATE~RECORD_SEQ_NO~VALUE_DATE","BLK_LBTBS_CONTRACT_SKIM_DETAILS__HIS":"CONTRACT_REF_NO~PAYER_PARTICIPANT~PAYER_COMPONENT~PAYER_COMPONENT_SERIAL_NO~EVENT_SEQ_NO~RECEIVER_PARTICIPANT~RECEIVER_COMPONENT~RECEIVER_COMPONENT_SERIAL_NO~SKIM_RATE~RECORD_SEQ_NO~VALUE_DATE","BLK_LBTBS_CONTRACT_SKIM_DETAILS__LT":"CONTRACT_REF_NO~PAYER_PARTICIPANT~PAYER_COMPONENT~PAYER_COMPONENT_SERIAL_NO~EVENT_SEQ_NO~RECEIVER_PARTICIPANT~RECEIVER_COMPONENT~RECEIVER_COMPONENT_SERIAL_NO~SKIM_RATE~RECORD_SEQ_NO~VALUE_DATE","BLK_OLTBS_CONTRACT_EVENT_LOG":"MODULE~CONTRACT_REF_NO~MAKERID~MAKERDTST~CHECKERID~CHECKERDTST~TXNSTAT~AUTHSTAT~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE~NEW_VERSION_INDICATOR~REVERSED_EVENT_SEQ_NO~EVENT_VALUE_DATE~ECA_STATUS~WORKFLOW_STATUS~RATE_REVISION_STATUS~RELEASE_BY~RELEASE_DT_STAMP~RATE_ASSIGNED_BY~RATE_ASSIGN_DT_STAMP~RATE_ASSIGN_AUTH_BY~RATE_ASSIGN_AUTH_DT_STAMP~INFORM_STATUS~TRN_TYPE~EXTERNAL_TRAN_REF_NO"};

var multipleEntryPageSize = {"BLK_SKIM_MASTER" :"15" ,"BLK_LBTBS_CONTRACT_SKIM_DETAILS__HIS" :"15" ,"BLK_LBTBS_CONTRACT_SKIM_DETAILS__LT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_SKIM_MASTER~BLK_LBTBS_CONTRACT_SKIM_DETAILS__HIS~BLK_LBTBS_CONTRACT_SKIM_DETAILS__LT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTB_CONTRACT">CONTRACTREFNO~BOOKDATE~SERIALNO~USERREFNO~BRANCH~PRODUCTCODE~COUNTERPARTY~PRODUCTTYPE~DEPARTMENTCODE~TREASURYSOURCE~LATESTEVENTSEQNO~LATESTVERSIONNO~CONTRACTSTATUS~AUTH_STATUS~TEMPLATE_STATUS~CURR_EVENT_CODE~MODULE_CODE~USER_DEFINED_STATUS~CONTRACT_CCY~LATEST_EVENT_DATE~EXTERNAL_REF_NO~AUTO_MANUAL_FLAG~FUND_REF_NO~RESPONSE_STAT~TXTPRODUCTDESC~TXTCUSTNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTB_CONTRACT" RELATION_TYPE="N" TYPE="BLK_SKIM_MASTER">CONTRACT_REF_NO~VERSION_NO~PAYER_PARTICIPANT~PAYER_COMPONENT~PAYER_COMPONENT_SERIAL_NO~RECEIVER_PARTICIPANT~RECEIVER_COMPONENT~RECEIVER_COMPONENT_SERIAL_NO~RECORD_SEQ_NO~TXTPAYPARTNAME~TXTRECPARTNAME~TXTVALUEDATE~TXTSKIMRATE</FN>'; 
msgxml += '      <FN PARENT="BLK_SKIM_MASTER" RELATION_TYPE="N" TYPE="BLK_LBTBS_CONTRACT_SKIM_DETAILS">CONTRACT_REF_NO~PAYER_PARTICIPANT~PAYER_COMPONENT~PAYER_COMPONENT_SERIAL_NO~EVENT_SEQ_NO~RECEIVER_PARTICIPANT~RECEIVER_COMPONENT~RECEIVER_COMPONENT_SERIAL_NO~SKIM_RATE~RECORD_SEQ_NO~VALUE_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_SKIM_MASTER" RELATION_TYPE="N" TYPE="BLK_LBTBS_CONTRACT_SKIM_DETAILS__HIS">CONTRACT_REF_NO~PAYER_PARTICIPANT~PAYER_COMPONENT~PAYER_COMPONENT_SERIAL_NO~EVENT_SEQ_NO~RECEIVER_PARTICIPANT~RECEIVER_COMPONENT~RECEIVER_COMPONENT_SERIAL_NO~SKIM_RATE~RECORD_SEQ_NO~VALUE_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_CONTRACT_SKIM_DETAILS__HIS" RELATION_TYPE="N" TYPE="BLK_LBTBS_CONTRACT_SKIM_DETAILS__LT">CONTRACT_REF_NO~PAYER_PARTICIPANT~PAYER_COMPONENT~PAYER_COMPONENT_SERIAL_NO~EVENT_SEQ_NO~RECEIVER_PARTICIPANT~RECEIVER_COMPONENT~RECEIVER_COMPONENT_SERIAL_NO~SKIM_RATE~RECORD_SEQ_NO~VALUE_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTB_CONTRACT" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">MODULE~CONTRACT_REF_NO~MAKERID~MAKERDTST~CHECKERID~CHECKERDTST~TXNSTAT~AUTHSTAT~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE~NEW_VERSION_INDICATOR~REVERSED_EVENT_SEQ_NO~EVENT_VALUE_DATE~ECA_STATUS~WORKFLOW_STATUS~RATE_REVISION_STATUS~RELEASE_BY~RELEASE_DT_STAMP~RATE_ASSIGNED_BY~RATE_ASSIGN_DT_STAMP~RATE_ASSIGN_AUTH_BY~RATE_ASSIGN_AUTH_DT_STAMP~INFORM_STATUS~TRN_TYPE~EXTERNAL_TRAN_REF_NO</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTB_CONTRACT">CONTRACTREFNO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDSKMAM";
var defaultWhereClause = "exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(CONTRACT_REF_NO) AND USER_ID = global.user_id)";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTB_CONTRACT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTB_CONTRACT" : "","BLK_SKIM_MASTER" : "BLK_OLTB_CONTRACT~N","BLK_LBTBS_CONTRACT_SKIM_DETAILS" : "BLK_SKIM_MASTER~N","BLK_LBTBS_CONTRACT_SKIM_DETAILS__HIS" : "BLK_SKIM_MASTER~N","BLK_LBTBS_CONTRACT_SKIM_DETAILS__LT" : "BLK_LBTBS_CONTRACT_SKIM_DETAILS__HIS~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_OLTB_CONTRACT~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTB_CONTRACT","BLK_SKIM_MASTER","BLK_LBTBS_CONTRACT_SKIM_DETAILS","BLK_LBTBS_CONTRACT_SKIM_DETAILS__HIS","BLK_LBTBS_CONTRACT_SKIM_DETAILS__LT","BLK_OLTBS_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDSKMAM.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDSKMAM.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTB_CONTRACT__CONTRACTREFNO";
pkFields[0] = "BLK_OLTB_CONTRACT__CONTRACTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_SKIM_MASTER":["PAYER_COMPONENT","PAYER_COMPONENT_SERIAL_NO","PAYER_PARTICIPANT","RECEIVER_COMPONENT","RECEIVER_COMPONENT_SERIAL_NO","RECEIVER_PARTICIPANT","TXTPAYPARTNAME","TXTRECPARTNAME","TXTSKIMRATE"]};
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
var lovInfoFlds = {"BLK_OLTB_CONTRACT__CONTRACTREFNO__LOV_CONTRACT":["BLK_OLTB_CONTRACT__CONTRACTREFNO~BLK_OLTB_CONTRACT__LATESTEVENTSEQNO~BLK_OLTB_CONTRACT__USERREFNO~BLK_OLTB_CONTRACT__PRODUCTCODE~BLK_OLTB_CONTRACT__COUNTERPARTY~BLK_OLTB_CONTRACT__BRANCH~BLK_OLTB_CONTRACT__TXTCUSTNAME~BLK_OLTB_CONTRACT__TXTPRODUCTDESC~","","N~N~N~N~N~N~N~N",""],"BLK_SKIM_MASTER__PAYER_PARTICIPANT__LOV_PAYER":["BLK_SKIM_MASTER__PAYER_PARTICIPANT~BLK_SKIM_MASTER__TXTPAYPARTNAME~BLK_SKIM_MASTER__PAYER_COMPONENT~","BLK_OLTB_CONTRACT__CONTRACTREFNO!VARCHAR2~BLK_OLTB_CONTRACT__PRODUCTCODE!VARCHAR2~BLK_OLTB_CONTRACT__CONTRACTREFNO!VARCHAR2","N~N~N",""],"BLK_SKIM_MASTER__RECEIVER_PARTICIPANT__LOV_PART AND REV":["BLK_SKIM_MASTER__RECEIVER_PARTICIPANT~BLK_SKIM_MASTER__TXTRECPARTNAME~BLK_SKIM_MASTER__RECEIVER_COMPONENT~","BLK_OLTB_CONTRACT__CONTRACTREFNO!VARCHAR2~BLK_OLTB_CONTRACT__PRODUCTCODE!VARCHAR2~BLK_OLTB_CONTRACT__CONTRACTREFNO!VARCHAR2","N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_SKIM_MASTER","BLK_LBTBS_CONTRACT_SKIM_DETAILS__HIS","BLK_LBTBS_CONTRACT_SKIM_DETAILS__LT");
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

ArrFuncOrigin["LBDSKMAM"]="KERNEL";
ArrPrntFunc["LBDSKMAM"]="";
ArrPrntOrigin["LBDSKMAM"]="";
ArrRoutingType["LBDSKMAM"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDSKMAM"]="N";
ArrCustomModified["LBDSKMAM"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":"TXTPAYPARTNAME~TXTRECPARTNAME~TXTVALUEDATE~TXTSKIMRATE~TXTPRODUCTDESC~TXTCUSTNAME"};
var scrArgSource = {};
var scrArgVals = {"CVS_MAIN":"~~~~~"};
var scrArgDest = {"CVS_MAIN":"BLK_SKIM_MASTER__TXTPAYPARTNAME~BLK_SKIM_MASTER__TXTRECPARTNAME~BLK_SKIM_MASTER__TXTVALUEDATE~BLK_SKIM_MASTER__TXTSKIMRATE~BLK_OLTB_CONTRACT__TXTPRODUCTDESC~BLK_OLTB_CONTRACT__TXTCUSTNAME"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"1","REOPEN":"1","REVERSE":"2","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------