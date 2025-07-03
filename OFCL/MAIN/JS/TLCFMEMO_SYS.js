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
**  File Name          : TLCFMEMO_SYS.js
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
var criteriaSearch  = '';
//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR THE SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var fieldNameArray = {"BLK_TLTBS_FMEM_MASTER":"CONTRACT_REF_NO~UPFRONT_FEE~TXT_TRD_CCY~TRADE_AMT~BCR_FEE~EVENT_SEQ_NO~TRADE_FUNDED_AMT~GLOBAL_UNFUNDED_AMT~GLOBAL_TRANCHE_AMT~TRADE_PRICE~TRADE_CURRENCY~TRADE_UNFUNDED_AMT~GLOBAL_FUNDED_AMT~TXT_TRADE_DATE~TXT_SETTL_DATE~TXT_EXPT_SETTL_DATE~TXT_AGENCY_ID~TXT_FAC_NAME~TXT_BUY_OR_SELL~TXT_CCY1~TXT_CCY2~TXT_CCY3~TXT_CCY4~TXT_CCY5~TXT_CCY6~TXT_FUNDING_MEMO_SOURCE~TXT_PARENT_REF_NO~TXT_POSITION_IDENTIFIER~TXT_POSITION_QUALIFIER~TXT_TRADE_REF_NO~TXT_TRADE_USER_REF_NO~TXT_BRANCH~TXT_DESK_CODE~TXT_EXPENSE_CODE~TXT_PORTFOLIO~TXT_PORTFOLIO_DESC~TXT_CUSIP~TXT_TICKET_ID~TXT_SWAP_ID~TRANSFER_PERCENTAGE~PRM_REF_NO~TP_CURRENCY~LOR_ADJ_FEES~LOR_ADJ_INTEREST","BLK_TLTBS_FMEM_PRICE_DETAIL":"BUYER_DD_AMT~CONTRACT_REF_NO~EX_RATE~DRAWDOWN_AMT~BUYER_DD_AMT_TRADECCY~EVENT_SEQ_NO~NEXT_INT_SCH_DATE~DRAWDOWN_CURRENCY~MARKET_BASE_RATE~DRAWDOWN_REF_NO~RATE_TYPE~TXT_BORROWER~TXT_VALUE_DATE~TXT_MATURITY_DATE~RATE_CODE~LBL_DD_AMOUNT_TR_CCY_1","BLK_TLTBS_FMEM_INTEREST_DETAIL":"COMPONENT~REPRICE_DATE~START_DATE~EVENT_SEQ_NO~CONTRACT_REF_NO~DRAWDOWN_REF_NO~BUYER_DD_AMT~BASIS_AMOUNT~FINAL_RATE~BASE_RATE~MARGIN~TXT_BASIS_AMOUNT~TXT_BUYER_SHARE_AMOUNT~DRAWDOWN_CURRENCY~OBSERVATION_SHIFT~RATE_CODE~RATE_TYPE~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_LOOKBACK_METHOD_DAYS~RFR_MARG_COMP_METH~RFR_METHOD~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_RATE_COMPOUNDING~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~RFR_RATE_TYPE~RFR_SPREAD_ADJ_COMP_METH~SPREAD~SPREAD_ADJ","BLK_TLTBS_FMEM_FEE":"EVENT_SEQ_NO~CONTRACT_REF_NO~BUYER_SPLIT_AMOUNT~SELLER_SPLIT_AMOUNT~ACTUAL_AMOUNT~COMPONENT_CCY~CALCULATED_AMOUNT~COMPONENT~TXT_COMPONENT_DESC~ASSIGNMENT_FEE_TYPE~ASSIGNMENT_FEE_REMITTER~WAIVER~FEE_TYPE","BLK_TLTBS_FMEM_CCY_DETAILS":"WAIVER_AMOUNT~ADHOC_BUYER_AMOUNT~CURRENCY~AMEND_FEE_AMOUNT~DCF_AMOUNT~ASSIGN_FEE_AMOUNT~CONTRACT_REF_NO~SETTL_AMOUNT~ADHOC_SELLER_AMOUNT~BFF_AMOUNT~EVENT_SEQ_NO~TXT_TOTAL_AMT~TXT_DD_AMOUNT_TR_CCY","BLK_LOR_DETAILS":"ACCOUNT_ENTRIES_CREATED~ACTUAL_TRANSFEREE_AMT~ACTUAL_TRANSFEROR_AMT~BUY_PARTY_CONTRACT_REF_NO~COMPONENT~CURRENCY~COMPONENT_TYPE~CONTRACT_REF_NO~DIFF_AMNT~EVENT_SEQ_NO~SELL_PARTY_CONTRACT_REF_NO~SETTLE_ACCURED_AMT~TRADE_REF_NO~TRANSFEREE~TRANSFEREE_AMT~TRANSFEROR~TRANSFEROR_AMT~USER_REF_NO~VALUE_DATE~SILENT_PART~SILENT_PART_ACC_ENTRY_CREATED"};

var multipleEntryPageSize = {"BLK_TLTBS_FMEM_PRICE_DETAIL" :"15" ,"BLK_TLTBS_FMEM_FEE" :"15" ,"BLK_TLTBS_FMEM_CCY_DETAILS" :"15" ,"BLK_LOR_DETAILS" :"15" };

var multipleEntrySVBlocks = "BLK_TLTBS_FMEM_INTEREST_DETAIL~BLK_TLTBS_FMEM_FEE";

var tabMEBlks = {"CVS_TLCFMEMO__TAB_TRADE_DETAILS":"BLK_TLTBS_FMEM_PRICE_DETAIL~BLK_LOR_DETAILS","CVS_TLCFMEMO__TAB_FEE_DETAILS":"BLK_TLTBS_FMEM_FEE","CVS_TLCFMEMO__TAB_CCY":"BLK_TLTBS_FMEM_CCY_DETAILS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTBS_FMEM_MASTER">CONTRACT_REF_NO~UPFRONT_FEE~TXT_TRD_CCY~TRADE_AMT~BCR_FEE~EVENT_SEQ_NO~TRADE_FUNDED_AMT~GLOBAL_UNFUNDED_AMT~GLOBAL_TRANCHE_AMT~TRADE_PRICE~TRADE_CURRENCY~TRADE_UNFUNDED_AMT~GLOBAL_FUNDED_AMT~TXT_TRADE_DATE~TXT_SETTL_DATE~TXT_EXPT_SETTL_DATE~TXT_AGENCY_ID~TXT_FAC_NAME~TXT_BUY_OR_SELL~TXT_CCY1~TXT_CCY2~TXT_CCY3~TXT_CCY4~TXT_CCY5~TXT_CCY6~TXT_FUNDING_MEMO_SOURCE~TXT_PARENT_REF_NO~TXT_POSITION_IDENTIFIER~TXT_POSITION_QUALIFIER~TXT_TRADE_REF_NO~TXT_TRADE_USER_REF_NO~TXT_BRANCH~TXT_DESK_CODE~TXT_EXPENSE_CODE~TXT_PORTFOLIO~TXT_PORTFOLIO_DESC~TXT_CUSIP~TXT_TICKET_ID~TXT_SWAP_ID~TRANSFER_PERCENTAGE~PRM_REF_NO~TP_CURRENCY~LOR_ADJ_FEES~LOR_ADJ_INTEREST</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_FMEM_MASTER" RELATION_TYPE="N" TYPE="BLK_TLTBS_FMEM_PRICE_DETAIL">BUYER_DD_AMT~CONTRACT_REF_NO~EX_RATE~DRAWDOWN_AMT~BUYER_DD_AMT_TRADECCY~EVENT_SEQ_NO~NEXT_INT_SCH_DATE~DRAWDOWN_CURRENCY~MARKET_BASE_RATE~DRAWDOWN_REF_NO~RATE_TYPE~TXT_BORROWER~TXT_VALUE_DATE~TXT_MATURITY_DATE~RATE_CODE~LBL_DD_AMOUNT_TR_CCY_1</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_FMEM_PRICE_DETAIL" RELATION_TYPE="N" TYPE="BLK_TLTBS_FMEM_INTEREST_DETAIL">COMPONENT~REPRICE_DATE~START_DATE~EVENT_SEQ_NO~CONTRACT_REF_NO~DRAWDOWN_REF_NO~BUYER_DD_AMT~BASIS_AMOUNT~FINAL_RATE~BASE_RATE~MARGIN~TXT_BASIS_AMOUNT~TXT_BUYER_SHARE_AMOUNT~DRAWDOWN_CURRENCY~OBSERVATION_SHIFT~RATE_CODE~RATE_TYPE~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_LOOKBACK_METHOD_DAYS~RFR_MARG_COMP_METH~RFR_METHOD~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_RATE_COMPOUNDING~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~RFR_RATE_TYPE~RFR_SPREAD_ADJ_COMP_METH~SPREAD~SPREAD_ADJ</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_FMEM_MASTER" RELATION_TYPE="N" TYPE="BLK_TLTBS_FMEM_FEE">EVENT_SEQ_NO~CONTRACT_REF_NO~BUYER_SPLIT_AMOUNT~SELLER_SPLIT_AMOUNT~ACTUAL_AMOUNT~COMPONENT_CCY~CALCULATED_AMOUNT~COMPONENT~TXT_COMPONENT_DESC~ASSIGNMENT_FEE_TYPE~ASSIGNMENT_FEE_REMITTER~WAIVER~FEE_TYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_FMEM_MASTER" RELATION_TYPE="N" TYPE="BLK_TLTBS_FMEM_CCY_DETAILS">WAIVER_AMOUNT~ADHOC_BUYER_AMOUNT~CURRENCY~AMEND_FEE_AMOUNT~DCF_AMOUNT~ASSIGN_FEE_AMOUNT~CONTRACT_REF_NO~SETTL_AMOUNT~ADHOC_SELLER_AMOUNT~BFF_AMOUNT~EVENT_SEQ_NO~TXT_TOTAL_AMT~TXT_DD_AMOUNT_TR_CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_FMEM_PRICE_DETAIL" RELATION_TYPE="N" TYPE="BLK_LOR_DETAILS">ACCOUNT_ENTRIES_CREATED~ACTUAL_TRANSFEREE_AMT~ACTUAL_TRANSFEROR_AMT~BUY_PARTY_CONTRACT_REF_NO~COMPONENT~CURRENCY~COMPONENT_TYPE~CONTRACT_REF_NO~DIFF_AMNT~EVENT_SEQ_NO~SELL_PARTY_CONTRACT_REF_NO~SETTLE_ACCURED_AMT~TRADE_REF_NO~TRANSFEREE~TRANSFEREE_AMT~TRANSFEROR~TRANSFEROR_AMT~USER_REF_NO~VALUE_DATE~SILENT_PART~SILENT_PART_ACC_ENTRY_CREATED</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_TLCFMEMO";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTBS_FMEM_MASTER" : "","BLK_TLTBS_FMEM_PRICE_DETAIL" : "BLK_TLTBS_FMEM_MASTER~N","BLK_TLTBS_FMEM_INTEREST_DETAIL" : "BLK_TLTBS_FMEM_PRICE_DETAIL~N","BLK_TLTBS_FMEM_FEE" : "BLK_TLTBS_FMEM_MASTER~N","BLK_TLTBS_FMEM_CCY_DETAILS" : "BLK_TLTBS_FMEM_MASTER~N","BLK_LOR_DETAILS" : "BLK_TLTBS_FMEM_PRICE_DETAIL~N"}; 

 var dataSrcLocationArray = new Array("BLK_TLTBS_FMEM_MASTER","BLK_TLTBS_FMEM_PRICE_DETAIL","BLK_TLTBS_FMEM_INTEREST_DETAIL","BLK_TLTBS_FMEM_FEE","BLK_TLTBS_FMEM_CCY_DETAILS","BLK_LOR_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLCFMEMO.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLCFMEMO.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTBS_FMEM_MASTER__CONTRACT_REF_NO";
pkFields[0] = "BLK_TLTBS_FMEM_MASTER__CONTRACT_REF_NO";
queryFields[1] = "BLK_TLTBS_FMEM_MASTER__EVENT_SEQ_NO";
pkFields[1] = "BLK_TLTBS_FMEM_MASTER__EVENT_SEQ_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LOR_DETAILS":["SETTLE_ACCURED_AMT"],"BLK_TLTBS_FMEM_FEE":["ACTUAL_AMOUNT","BUYER_SPLIT_AMOUNT","SELLER_SPLIT_AMOUNT"],"BLK_TLTBS_FMEM_MASTER":["BTN_BFF","BTN_DCF","BTN_DOWNLOAD","BTN_UPLOAD","LOR_ADJ_FEES","LOR_ADJ_INTEREST"],"BLK_TLTBS_FMEM_PRICE_DETAIL":["MARKET_BASE_RATE"]};
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
var strCurrentTabId = 'TAB_TRADE_DETAILS';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_TLTBS_FMEM_PRICE_DETAIL","BLK_TLTBS_FMEM_FEE","BLK_TLTBS_FMEM_CCY_DETAILS","BLK_LOR_DETAILS");
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

ArrFuncOrigin["TLCFMEMO"]="KERNEL";
ArrPrntFunc["TLCFMEMO"]="";
ArrPrntOrigin["TLCFMEMO"]="";
ArrRoutingType["TLCFMEMO"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLCFMEMO"]="N";
ArrCustomModified["TLCFMEMO"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_TLCFMEMO":"REF_NO","TLDBRKFN":"CONTRACTREFNO~LATESTEVENTSEQNO~ACTION_CODE","TLDCFDET":"CONTRACTREFNO~LATESTEVENTSEQNO~ACTION_CODE"};
var scrArgSource = {"TLDBRKFN":"BLK_TLTBS_FMEM_MASTER__CONTRACT_REF_NO~BLK_TLTBS_FMEM_MASTER__EVENT_SEQ_NO~","TLDCFDET":"BLK_TLTBS_FMEM_MASTER__CONTRACT_REF_NO~BLK_TLTBS_FMEM_MASTER__EVENT_SEQ_NO~"};
var scrArgVals = {"CVS_TLCFMEMO":"","TLDBRKFN":"~~EXECUTEQUERY","TLDCFDET":"~~EXECUTEQUERY"};
var scrArgDest = {"CVS_TLCFMEMO":"BLK_TLTBS_FMEM_MASTER__CONTRACT_REF_NO"};
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