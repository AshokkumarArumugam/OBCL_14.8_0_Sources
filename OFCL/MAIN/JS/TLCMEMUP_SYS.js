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
**  File Name          : TLCMEMUP_SYS.js
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
var fieldNameArray = {"BLK_TLTBS_FMEM_UPLOAD_MASTER":"BCR_FEE~GLOBAL_TRANCHE_AMT~FEE_BASIS~GLOBAL_FUNDED_AMT~TRANCHE_REF_NO~EVENT_SEQ_NO~CONTRACT_REF_NO~UPFRONT_FEE~TRADE_FUNDED_AMT~TRADE_UNFUNDED_AMT~GLOBAL_UNFUNDED_AMT~TRADE_CURRENCY~PORTFOLIO~TRADE_PRICE~TRADE_AMOUNT~AGENCY_REF_NO~ACTUAL_SETTL_DATE~ASGNFEE_PMNT_ATTKT~TRADE_REF_NO~BRANCH~DESK~EXPENSE_CODE~POSITION_OWNER_DESC~POSITION_OWNER~POSITION_QUALIFIER~CUSIP~AGENCY_ID~FUNDING_MEMO_SOURCE~EXPT_SETTL_DATE~NON_PRORATA~TICKET_ID~CASCADE~DRAWDOWN_REF_NO_PASS~DD_UPLD_TRD_SETTL~AGENCY_TYPE~TRADE_IDENTIFIER~BUY_SELL~CURRENT_DD_ROW~RATE~MARGIN~TRANSFEROR~COUNTERPARTY~FMEM_UPLOAD_STATUS~TRADE_SETTL_STATUS~POSITION_IDENTIFIER~FLR_CLG_DEFAULT~TRADE_USER_REF_NO~TRADE_DATE~DRAWDOWN_REF_NO","BLK_TLTBS_FMEM_UPLOAD_DETAIL":"MATURITY_DATE~BUYER_DD_AMT~DD_ORIGINAL_START_DATE~FUNDED_AMOUNT_IN_TRA~RATE_TYPE~DRAWDOWN_REF_NO~VALUE_DATE~FUNDED_AMOUNT~DD_PRODUCT_CODE~CONTRACT_REF_NO~DRAWDOWN_CCY~RATE_CODE~BORROWER~EX_RATE~BUYER_DD_AMT_TRADEC~EVENT_SEQ_NO","BLK_FMEM_UPLOAD_INT_DETAIL":"EVENT_SEQ_NO~BASIS_AMOUNT~BUYER_DD_AMT~MARGIN~CONTRACT_REF_NO~FINAL_RATE~BASE_RATE~START_DATE~DRAWDOWN_REF_NO~COMPONENT~REPRICE_DATE~DRAWDOWN_CCY~OBSERVATION_SHIFT~RATE_CODE~RATE_TYPE~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_LOOKBACK_METHOD_DAYS~RFR_MARG_COMP_METH~RFR_METHOD~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_RATE_COMPOUNDING~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~RFR_RATE_TYPE~RFR_SPREAD_ADJ_COMP_METH~SPREAD~SPREAD_ADJ","BLK_LBTBS_UPLD_UDF_FIELD_VALS":"EXT_CONTRACT_REF_NO~ALL_IN_RATE~NET_RATE~RAC_RATE~EXFX_TIME~IRFX_TIME~LOCATION~RATE_BASIS~INT_PERIOD","BLK_HEAD":"CONTRACT_REF_NO"};

var multipleEntryPageSize = {"BLK_TLTBS_FMEM_UPLOAD_DETAIL" :"15" ,"BLK_LBTBS_UPLD_UDF_FIELD_VALS" :"15" };

var multipleEntrySVBlocks = "BLK_FMEM_UPLOAD_INT_DETAIL";

var tabMEBlks = {"CVS_MEMUP_MAIN__TAB_MAIN":"BLK_TLTBS_FMEM_UPLOAD_DETAIL","CVS_ADDL_DD__TAB_MAIN":"BLK_LBTBS_UPLD_UDF_FIELD_VALS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTBS_FMEM_UPLOAD_MASTER">BCR_FEE~GLOBAL_TRANCHE_AMT~FEE_BASIS~GLOBAL_FUNDED_AMT~TRANCHE_REF_NO~EVENT_SEQ_NO~CONTRACT_REF_NO~UPFRONT_FEE~TRADE_FUNDED_AMT~TRADE_UNFUNDED_AMT~GLOBAL_UNFUNDED_AMT~TRADE_CURRENCY~PORTFOLIO~TRADE_PRICE~TRADE_AMOUNT~AGENCY_REF_NO~ACTUAL_SETTL_DATE~ASGNFEE_PMNT_ATTKT~TRADE_REF_NO~BRANCH~DESK~EXPENSE_CODE~POSITION_OWNER_DESC~POSITION_OWNER~POSITION_QUALIFIER~CUSIP~AGENCY_ID~FUNDING_MEMO_SOURCE~EXPT_SETTL_DATE~NON_PRORATA~TICKET_ID~CASCADE~DRAWDOWN_REF_NO_PASS~DD_UPLD_TRD_SETTL~AGENCY_TYPE~TRADE_IDENTIFIER~BUY_SELL~CURRENT_DD_ROW~RATE~MARGIN~TRANSFEROR~COUNTERPARTY~FMEM_UPLOAD_STATUS~TRADE_SETTL_STATUS~POSITION_IDENTIFIER~FLR_CLG_DEFAULT~TRADE_USER_REF_NO~TRADE_DATE~DRAWDOWN_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_FMEM_UPLOAD_MASTER" RELATION_TYPE="N" TYPE="BLK_TLTBS_FMEM_UPLOAD_DETAIL">MATURITY_DATE~BUYER_DD_AMT~DD_ORIGINAL_START_DATE~FUNDED_AMOUNT_IN_TRA~RATE_TYPE~DRAWDOWN_REF_NO~VALUE_DATE~FUNDED_AMOUNT~DD_PRODUCT_CODE~CONTRACT_REF_NO~DRAWDOWN_CCY~RATE_CODE~BORROWER~EX_RATE~BUYER_DD_AMT_TRADEC~EVENT_SEQ_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_FMEM_UPLOAD_DETAIL" RELATION_TYPE="N" TYPE="BLK_FMEM_UPLOAD_INT_DETAIL">EVENT_SEQ_NO~BASIS_AMOUNT~BUYER_DD_AMT~MARGIN~CONTRACT_REF_NO~FINAL_RATE~BASE_RATE~START_DATE~DRAWDOWN_REF_NO~COMPONENT~REPRICE_DATE~DRAWDOWN_CCY~OBSERVATION_SHIFT~RATE_CODE~RATE_TYPE~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_LOOKBACK_METHOD_DAYS~RFR_MARG_COMP_METH~RFR_METHOD~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_RATE_COMPOUNDING~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~RFR_RATE_TYPE~RFR_SPREAD_ADJ_COMP_METH~SPREAD~SPREAD_ADJ</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_FMEM_UPLOAD_DETAIL" RELATION_TYPE="N" TYPE="BLK_LBTBS_UPLD_UDF_FIELD_VALS">EXT_CONTRACT_REF_NO~ALL_IN_RATE~NET_RATE~RAC_RATE~EXFX_TIME~IRFX_TIME~LOCATION~RATE_BASIS~INT_PERIOD</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_HEAD">CONTRACT_REF_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MEMUP_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTBS_FMEM_UPLOAD_MASTER" : "","BLK_TLTBS_FMEM_UPLOAD_DETAIL" : "BLK_TLTBS_FMEM_UPLOAD_MASTER~N","BLK_FMEM_UPLOAD_INT_DETAIL" : "BLK_TLTBS_FMEM_UPLOAD_DETAIL~N","BLK_LBTBS_UPLD_UDF_FIELD_VALS" : "BLK_TLTBS_FMEM_UPLOAD_DETAIL~N","BLK_HEAD" : ""}; 

 var dataSrcLocationArray = new Array("BLK_TLTBS_FMEM_UPLOAD_MASTER","BLK_TLTBS_FMEM_UPLOAD_DETAIL","BLK_FMEM_UPLOAD_INT_DETAIL","BLK_LBTBS_UPLD_UDF_FIELD_VALS","BLK_HEAD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLCMEMUP.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLCMEMUP.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTBS_FMEM_UPLOAD_MASTER__CONTRACT_REF_NO";
pkFields[0] = "BLK_TLTBS_FMEM_UPLOAD_MASTER__CONTRACT_REF_NO";
queryFields[1] = "BLK_TLTBS_FMEM_UPLOAD_MASTER__EVENT_SEQ_NO";
pkFields[1] = "BLK_TLTBS_FMEM_UPLOAD_MASTER__EVENT_SEQ_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_FMEM_UPLOAD_INT_DETAIL":["BASE_RATE","BASIS_AMOUNT","BUYER_DD_AMT","COMPONENT","CONTRACT_REF_NO","DRAWDOWN_CCY","DRAWDOWN_REF_NO","EVENT_SEQ_NO","FINAL_RATE","MARGIN","OBSERVATION_SHIFT","RATE_CODE","RATE_TYPE","REPRICE_DATEI","RFR_BASE_COMP_METH","RFR_COMPONENT","RFR_INTERESTROLLOVER_METHOD","RFR_LASTRECENT_METHOD","RFR_LASTRESET_METHOD","RFR_LOCKOUT_METHOD","RFR_LOCKOUT_METHOD_DAYS","RFR_LOOKBACK_METHOD","RFR_LOOKBACK_METHOD_DAYS","RFR_MARG_COMP_METH","RFR_METHOD","RFR_PAYMENTDELAY_METHOD","RFR_PAYMENTDELAY_METHOD_DAYS","RFR_PLAIN_METHOD","RFR_PRINCIPALADJUSTMENT_METHOD","RFR_RATE_COMPOUNDING","RFR_RATE_COMPOUNDING_METHOD","RFR_RATE_COMP_ROUND_UNIT","RFR_RATE_TYPE","RFR_SPREAD_ADJ_COMP_METH","SPREAD","SPREAD_ADJ","START_DATEI"],"BLK_TLTBS_FMEM_UPLOAD_DETAIL":["BORROWER","BTNDEFAULT","BTN_ADDL_DD_DETAILS","BTN_GENERATE","BUYER_DD_AMT","BUYER_DD_AMT_TRADEC","CONTRACT_REF_NO","DD_ORIGINAL_START_DATEI","DD_PRODUCT_CODE","DRAWDOWN_CCY","DRAWDOWN_REF_NO","EVENT_SEQ_NO","EX_RATE","FUNDED_AMOUNT","FUNDED_AMOUNT_IN_TRA","MATURITY_DATEI","RATE_CODE","RATE_TYPE","VALUE_DATEI"],"BLK_TLTBS_FMEM_UPLOAD_MASTER":["BCR_FEE","BTN_CONTRACT_DETAILS","BTN_SUM_AMT","DRAWDOWN_REF_NO","GLOBAL_TRANCHE_AMT","TRANCHE_REF_NO","UPFRONT_FEE"]};
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
var lovInfoFlds = {"BLK_TLTBS_FMEM_UPLOAD_MASTER__TRANCHE_REF_NO__LOV_AGENCY_REF_NO":["BLK_TLTBS_FMEM_UPLOAD_MASTER__TRANCHE_REF_NO~","BLK_TLTBS_FMEM_UPLOAD_MASTER__CUSIP!varchar2~BLK_TLTBS_FMEM_UPLOAD_MASTER__FUNDING_MEMO_SOURCE!varchar2~BLK_TLTBS_FMEM_UPLOAD_MASTER__NON_PRORATA!varchar2~BLK_TLTBS_FMEM_UPLOAD_MASTER__ACTUAL_SETTL_DATE!date~BLK_TLTBS_FMEM_UPLOAD_MASTER__ACTUAL_SETTL_DATE!date","N",""],"BLK_TLTBS_FMEM_UPLOAD_MASTER__DRAWDOWN_REF_NO__LOV_CONTRACT_REF_NO":["BLK_TLTBS_FMEM_UPLOAD_MASTER__DRAWDOWN_REF_NO~","BLK_TLTBS_FMEM_UPLOAD_MASTER__AGENCY_REF_NO!VARCHAR2~BLK_TLTBS_FMEM_UPLOAD_MASTER__TRANSFEROR!VARCHAR2~BLK_TLTBS_FMEM_UPLOAD_MASTER__ACTUAL_SETTL_DATE!VARCHAR2~BLK_TLTBS_FMEM_UPLOAD_MASTER__ACTUAL_SETTL_DATE!VARCHAR2~BLK_TLTBS_FMEM_UPLOAD_MASTER__ACTUAL_SETTL_DATE!VARCHAR2~BLK_TLTBS_FMEM_UPLOAD_MASTER__CONTRACT_REF_NO!VARCHAR2~BLK_TLTBS_FMEM_UPLOAD_MASTER__CONTRACT_REF_NO!VARCHAR2","N",""],"BLK_TLTBS_FMEM_UPLOAD_DETAIL__DD_PRODUCT_CODE__LOV_PRODUCT":["BLK_TLTBS_FMEM_UPLOAD_DETAIL__DD_PRODUCT_CODE~~","BLK_TLTBS_FMEM_UPLOAD_MASTER__AGENCY_REF_NO!VARCHAR2~BLK_TLTBS_FMEM_UPLOAD_MASTER__AGENCY_REF_NO!VARCHAR2~BLK_TLTBS_FMEM_UPLOAD_MASTER__AGENCY_REF_NO!VARCHAR2~BLK_TLTBS_FMEM_UPLOAD_MASTER__AGENCY_REF_NO!VARCHAR2","N~N",""],"BLK_TLTBS_FMEM_UPLOAD_DETAIL__DRAWDOWN_CCY__LOV_CASCADE_CCY":["BLK_TLTBS_FMEM_UPLOAD_DETAIL__DRAWDOWN_CCY~~","BLK_TLTBS_FMEM_UPLOAD_MASTER__AGENCY_REF_NO!VARCHAR2~BLK_TLTBS_FMEM_UPLOAD_MASTER__AGENCY_REF_NO!VARCHAR2","N~N",""],"BLK_TLTBS_FMEM_UPLOAD_DETAIL__RATE_CODE__LOV_FLOATING_RATE":["BLK_TLTBS_FMEM_UPLOAD_DETAIL__RATE_CODE~~","BLK_FMEM_UPLOAD_INT_DETAIL__DRAWDOWN_CCY!VARCHAR2~BLK_FMEM_UPLOAD_INT_DETAIL__RFR_RATE_TYPE!VARCHAR2","N~N",""],"BLK_TLTBS_FMEM_UPLOAD_DETAIL__BORROWER__LOV_CASCADE_BORROWER":["BLK_TLTBS_FMEM_UPLOAD_DETAIL__BORROWER~~~","BLK_TLTBS_FMEM_UPLOAD_MASTER__AGENCY_REF_NO!VARCHAR2","N~N~N",""],"BLK_FMEM_UPLOAD_INT_DETAIL__COMPONENT__LOV_COMPONENT":["BLK_FMEM_UPLOAD_INT_DETAIL__COMPONENT~~","BLK_TLTBS_FMEM_UPLOAD_DETAIL__DD_PRODUCT_CODE!VARCHAR2","N~N",""],"BLK_FMEM_UPLOAD_INT_DETAIL__RATE_CODE__LOV_FLOATING_RATE":["BLK_FMEM_UPLOAD_INT_DETAIL__RATE_CODE~~","BLK_FMEM_UPLOAD_INT_DETAIL__DRAWDOWN_CCY!VARCHAR2~BLK_FMEM_UPLOAD_INT_DETAIL__RFR_RATE_TYPE!VARCHAR2","N~N",""],"BLK_LBTBS_UPLD_UDF_FIELD_VALS__RATE_BASIS__LOV_RATE_BASIS":["BLK_LBTBS_UPLD_UDF_FIELD_VALS__RATE_BASIS~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TLTBS_FMEM_UPLOAD_DETAIL","BLK_LBTBS_UPLD_UDF_FIELD_VALS");
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

ArrFuncOrigin["TLCMEMUP"]="KERNEL";
ArrPrntFunc["TLCMEMUP"]="";
ArrPrntOrigin["TLCMEMUP"]="";
ArrRoutingType["TLCMEMUP"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLCMEMUP"]="N";
ArrCustomModified["TLCMEMUP"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MEMUP_MAIN":"TRADE_REF_NO","CVS_ADDL_DD":"DD_REF_NO"};
var scrArgSource = {"CVS_ADDL_DD":"BLK_TLTBS_FMEM_UPLOAD_DETAIL__DRAWDOWN_REF_NO"};
var scrArgVals = {"CVS_MEMUP_MAIN":"","CVS_ADDL_DD":""};
var scrArgDest = {"CVS_MEMUP_MAIN":"BLK_TLTBS_FMEM_UPLOAD_MASTER__CONTRACT_REF_NO","CVS_ADDL_DD":"BLK_LBTBS_UPLD_UDF_FIELD_VALS__EXT_CONTRACT_REF_NO"};
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