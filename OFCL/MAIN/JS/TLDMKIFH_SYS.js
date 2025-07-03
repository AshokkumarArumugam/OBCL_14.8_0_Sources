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
**  File Name          : TLDMKIFH_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST":"LQT_TICKET_ID~BUYER~ACTUAL_SETTL_DATE~MESSAGE_STATUS~SELLER~MESSAGE_SEQ_NO~EXPT_SETTL_DATE~MESSAGE_NAME~TRADE_DATE~MARKIT_TRADE_STATUS~MARKIT_TRADE_ID~MESSAGE_ID~TRADE_TYPE~FORM_OF_PURCHASE~TRADING_ASSOCIATION~SETTLEMENT_PLATFORM~ACCRUAL_SETT_TYPE~DOCUMENTATION_TYPE~TRADE_COMPLETELY_SETTLED~CREATIONTIMESTAMP~SENT_BY~SENT_TO~FC_SETTL_STATUS~APPROVAL_STATUS~REPLACED_MARKIT_TRADEID~APPROVAL_TYPE~APPROVER~FACILITY_START_DATE~FACILITY_CUSIP_NO~ASSIGNMENT_FEE_TYPE~ASSIGNMENT_FEE_REMITTER~CLEARPAR_TICKET_ID~DEAL_TYPE~MARKIT_MESSAGE_ID","BLK_OLTBS_MARKIT_TRADE_DETAIL":"ORIGINAL_TRADE_AMOUNT~MESSAGE_ID~TRADE_PRICE~MARKIT_TRADE_ID~MARKIT_ALLOCATION_ID~EXTERNAL_CUSIP_NO~TRANCHE_REF_NO~ORIG_CCY~TRADE_CCY~TRADE_AMOUNT","BLK_OLTBS_MARKT_FMEM_PRCE_DET":"DRAWDOWN_AMOUNT~DRAWDOWN_REF_NO~VALUE_DATE~MATURITY_DATE~BUYERS_SHARE~DRAWDOWN_CCY~DCF_CCY~DCF_AMOUNT~EXTERNAL_CUSIP_NO~MARKIT_TRADE_ID~MESSAGE_ID~TRANCHE_REF_NO~MARKIT_ALLOCATION_ID","BLK_OLTBS_MARKIT_ALLOCATION":"MARKIT_TRADE_ID~ALLOCATED_PARTY~ALLOCATING_PARTY~MESSAGE_ID~MARKIT_ALLOCATION_ID","BLK_OLTB_MKT_TRADE_DTL_ALLOC":"ORIGINAL_TRADE_AMOUNT~MESSAGE_ID~TRADE_PRICE~MARKIT_TRADE_ID~MARKIT_ALLOCATION_ID~EXTERNAL_CUSIP_NO~TRANCHE_REF_NO~ORIG_CCY~TRADE_CCY~TRADE_AMOUNT","BLK_OLTB_MKT_FMEM_PRC_ALLC":"DRAWDOWN_REF_NO~VALUE_DATE~BUYERS_SHARE~EXTERNAL_CUSIP_NO~MARKIT_TRADE_ID~DRAWDOWN_CCY~DCF_CCY~MESSAGE_ID~DRAWDOWN_AMOUNT~DCF_AMOUNT~MATURITY_DATE~TRANCHE_REF_NO~MARKIT_ALLOCATION_ID","BLK_OLTBS_MARKIT_FMEM_CCY_DET":"RECEIVER~PAYMENT_TYPE~SETTLEMENT_CCY~PAYER~SETTLEMENT_AMOUNT~MESSAGE_ID~MARKIT_TRADE_ID~MARKIT_ALLOCATION_ID","BLK_OLTBS_LT_MARKIT_EXCPT":"MESSAGE_ID~ERROR_PARAM~MARKIT_ALLOCATION_ID~MARKIT_TRADE_ID~ERR_SEQ_NO~TRADE_REF_NO~ERROR_CODE~EXTERNAL_CUSIP_NO~EXT_CONTRACT_REF_NO"};

var multipleEntryPageSize = {"BLK_OLTBS_MARKIT_TRADE_DETAIL" :"15" ,"BLK_OLTBS_MARKT_FMEM_PRCE_DET" :"15" ,"BLK_OLTBS_MARKIT_ALLOCATION" :"15" ,"BLK_OLTB_MKT_TRADE_DTL_ALLOC" :"15" ,"BLK_OLTB_MKT_FMEM_PRC_ALLC" :"15" ,"BLK_OLTBS_MARKIT_FMEM_CCY_DET" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_TRADE":"BLK_OLTBS_MARKIT_TRADE_DETAIL~BLK_OLTBS_MARKT_FMEM_PRCE_DET","CVS_MAIN__TAB_ALLOCATION_DTLS":"BLK_OLTBS_MARKIT_ALLOCATION~BLK_OLTB_MKT_TRADE_DTL_ALLOC~BLK_OLTB_MKT_FMEM_PRC_ALLC","CVS_MAIN__TAB_CCY":"BLK_OLTBS_MARKIT_FMEM_CCY_DET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST">LQT_TICKET_ID~BUYER~ACTUAL_SETTL_DATE~MESSAGE_STATUS~SELLER~MESSAGE_SEQ_NO~EXPT_SETTL_DATE~MESSAGE_NAME~TRADE_DATE~MARKIT_TRADE_STATUS~MARKIT_TRADE_ID~MESSAGE_ID~TRADE_TYPE~FORM_OF_PURCHASE~TRADING_ASSOCIATION~SETTLEMENT_PLATFORM~ACCRUAL_SETT_TYPE~DOCUMENTATION_TYPE~TRADE_COMPLETELY_SETTLED~CREATIONTIMESTAMP~SENT_BY~SENT_TO~FC_SETTL_STATUS~APPROVAL_STATUS~REPLACED_MARKIT_TRADEID~APPROVAL_TYPE~APPROVER~FACILITY_START_DATE~FACILITY_CUSIP_NO~ASSIGNMENT_FEE_TYPE~ASSIGNMENT_FEE_REMITTER~CLEARPAR_TICKET_ID~DEAL_TYPE~MARKIT_MESSAGE_ID</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST" RELATION_TYPE="N" TYPE="BLK_OLTBS_MARKIT_TRADE_DETAIL">ORIGINAL_TRADE_AMOUNT~MESSAGE_ID~TRADE_PRICE~MARKIT_TRADE_ID~MARKIT_ALLOCATION_ID~EXTERNAL_CUSIP_NO~TRANCHE_REF_NO~ORIG_CCY~TRADE_CCY~TRADE_AMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_MARKIT_TRADE_DETAIL" RELATION_TYPE="N" TYPE="BLK_OLTBS_MARKT_FMEM_PRCE_DET">DRAWDOWN_AMOUNT~DRAWDOWN_REF_NO~VALUE_DATE~MATURITY_DATE~BUYERS_SHARE~DRAWDOWN_CCY~DCF_CCY~DCF_AMOUNT~EXTERNAL_CUSIP_NO~MARKIT_TRADE_ID~MESSAGE_ID~TRANCHE_REF_NO~MARKIT_ALLOCATION_ID</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST" RELATION_TYPE="N" TYPE="BLK_OLTBS_MARKIT_ALLOCATION">MARKIT_TRADE_ID~ALLOCATED_PARTY~ALLOCATING_PARTY~MESSAGE_ID~MARKIT_ALLOCATION_ID</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_MARKIT_ALLOCATION" RELATION_TYPE="N" TYPE="BLK_OLTB_MKT_TRADE_DTL_ALLOC">ORIGINAL_TRADE_AMOUNT~MESSAGE_ID~TRADE_PRICE~MARKIT_TRADE_ID~MARKIT_ALLOCATION_ID~EXTERNAL_CUSIP_NO~TRANCHE_REF_NO~ORIG_CCY~TRADE_CCY~TRADE_AMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTB_MKT_TRADE_DTL_ALLOC" RELATION_TYPE="N" TYPE="BLK_OLTB_MKT_FMEM_PRC_ALLC">DRAWDOWN_REF_NO~VALUE_DATE~BUYERS_SHARE~EXTERNAL_CUSIP_NO~MARKIT_TRADE_ID~DRAWDOWN_CCY~DCF_CCY~MESSAGE_ID~DRAWDOWN_AMOUNT~DCF_AMOUNT~MATURITY_DATE~TRANCHE_REF_NO~MARKIT_ALLOCATION_ID</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST" RELATION_TYPE="N" TYPE="BLK_OLTBS_MARKIT_FMEM_CCY_DET">RECEIVER~PAYMENT_TYPE~SETTLEMENT_CCY~PAYER~SETTLEMENT_AMOUNT~MESSAGE_ID~MARKIT_TRADE_ID~MARKIT_ALLOCATION_ID</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST" RELATION_TYPE="N" TYPE="BLK_OLTBS_LT_MARKIT_EXCPT">MESSAGE_ID~ERROR_PARAM~MARKIT_ALLOCATION_ID~MARKIT_TRADE_ID~ERR_SEQ_NO~TRADE_REF_NO~ERROR_CODE~EXTERNAL_CUSIP_NO~EXT_CONTRACT_REF_NO</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST">MESSAGE_SEQ_NO~MESSAGE_NAME~MARKIT_TRADE_ID~LQT_TICKET_ID~MESSAGE_STATUS~MARKIT_TRADE_STATUS~MESSAGE_ID~MARKIT_MESSAGE_ID</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDMKIFH";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="B";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST" : "","BLK_OLTBS_MARKIT_TRADE_DETAIL" : "BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST~N","BLK_OLTBS_MARKT_FMEM_PRCE_DET" : "BLK_OLTBS_MARKIT_TRADE_DETAIL~N","BLK_OLTBS_MARKIT_ALLOCATION" : "BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST~N","BLK_OLTB_MKT_TRADE_DTL_ALLOC" : "BLK_OLTBS_MARKIT_ALLOCATION~N","BLK_OLTB_MKT_FMEM_PRC_ALLC" : "BLK_OLTB_MKT_TRADE_DTL_ALLOC~N","BLK_OLTBS_MARKIT_FMEM_CCY_DET" : "BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST~N","BLK_OLTBS_LT_MARKIT_EXCPT" : "BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST","BLK_OLTBS_MARKIT_TRADE_DETAIL","BLK_OLTBS_MARKT_FMEM_PRCE_DET","BLK_OLTBS_MARKIT_ALLOCATION","BLK_OLTB_MKT_TRADE_DTL_ALLOC","BLK_OLTB_MKT_FMEM_PRC_ALLC","BLK_OLTBS_MARKIT_FMEM_CCY_DET","BLK_OLTBS_LT_MARKIT_EXCPT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDMKIFH.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDMKIFH.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST__MARKIT_TRADE_ID";
pkFields[0] = "BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST__MARKIT_TRADE_ID";
queryFields[1] = "BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST__MESSAGE_ID";
pkFields[1] = "BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST__MESSAGE_ID";
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
var lovInfoFlds = {"BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST__MARKIT_TRADE_ID__LOV_MARKIT":["BLK_OLTBS_LT_MARKIT_TRD_MSTR_HIST__MARKIT_TRADE_ID~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTBS_MARKIT_TRADE_DETAIL","BLK_OLTBS_MARKT_FMEM_PRCE_DET","BLK_OLTBS_MARKIT_ALLOCATION","BLK_OLTB_MKT_TRADE_DTL_ALLOC","BLK_OLTB_MKT_FMEM_PRC_ALLC","BLK_OLTBS_MARKIT_FMEM_CCY_DET");
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

ArrFuncOrigin["TLDMKIFH"]="KERNEL";
ArrPrntFunc["TLDMKIFH"]="";
ArrPrntOrigin["TLDMKIFH"]="";
ArrRoutingType["TLDMKIFH"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDMKIFH"]="N";
ArrCustomModified["TLDMKIFH"]="N";

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