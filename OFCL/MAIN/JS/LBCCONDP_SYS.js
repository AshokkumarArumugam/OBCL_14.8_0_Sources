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
**  File Name          : LBCCONDP_SYS.js
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
var fieldNameArray = {"BLK_CONTROL_CONDP":"CONTRACTREFNO~VERSION_NO~TXT_PRODUCT_DESC~TXT_PROD_TYPE_DESC~TXT_CUSTOMER_NAME~TXT_PURPOSE_OF_SYNDICATION~TXT_FACILITY_NAME~USER_REF_NO~PRODUCTCODE~COUNTERPARTY~TXT_AMRT_PROD_ALLOWD~TXT_CASCADE_PART~TXT_BRANCH~TXT_MODULE~TXT_FACILITY_NO","BLK_LBTBS_BORR_DRAWDOWN_PROD":"PRODUCT_CODE~ROUNDING_RULE~DUMMY~PROD_DESC~CONTRACT_REF_NO~VERSION_NO~ALLOW_RATIO_CHANGE~PART_INT_CALL_METHOD","BLK_LBTBS_BORR_DRAWDOWN_COMP":"CONTRACT_REF_NO~VERSION_NO~COMPONENT_TYPE~COMPONENT~COMPONENT_DESC~PRODUCT_CODE","BLK_LBTBS_TR_DD_PART_RATIO":"CONTRACT_REF_NO~VERSION_NO~COMPONENT_TYPE~SETTLEMENT_SEQ_NO~PRODUCT_CODE~COMPONENT~PARTICIPANT~COMPONENT_RATIO~SSI_PICKUP_AT_DUMMY~SSI_MNEMONIC~PARTICIPANT_NAME~TXT_SUM_COMPONENT_RATIO","BLK_LBTBS_BORROWER_DD_MARGIN":"CONTRACT_REF_NO~PRODUCT_CODE~COMPONENT~SEQ_NO~VERSION_NO~MARGIN_COMPONENT~MARGIN_BASIS~BASIS_AMT_TAG~DEFAULT_MARGIN_RATE~MARGIN_EXCEPTION_TRACKING~MARGIN_BASIS_DESC","BLK_LBTBS_INTERIM_INTEREST_SCH":"CONTRACT_REF_NO~PRODUCT_CODE~COMPONENT~VERSION_NO~START_REFERENCE~FREQUENCY~FREQUENCY_UNIT~START_MONTH~START_DATE","BLK_PARAT_CONDP":"CONTRACT_REF_NO~PARTICIPANT~ASSET_RATIO~SSI_MNEMONIC","BLK_DD_SOFR_PREF":"COMPONENT~CONTRACT_REF_NO~CURRENCY~PRODUCT~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD_DAYS~RFR_PAYMENTDELAY_METHOD_DAYS~VERSION_NO~RFR_BASE_COMP_METH~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOOKBACK_METHOD~RFR_MARG_COMP_METH~RFR_PAYMENTDELAY_METHOD~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_SPREAD_ADJ_COMP_METH~RFR_RATE_COMPOUNDING~RFR_COMPONENT~RFR_RATE_TYPE~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~OBSERVATION_SHIFT"};

var multipleEntryPageSize = {"BLK_LBTBS_BORR_DRAWDOWN_PROD" :"15" ,"BLK_LBTBS_BORR_DRAWDOWN_COMP" :"15" ,"BLK_LBTBS_INTERIM_INTEREST_SCH" :"15" ,"BLK_LBTBS_TR_DD_PART_RATIO" :"15" ,"BLK_LBTBS_BORROWER_DD_MARGIN" :"15" };

var multipleEntrySVBlocks = "BLK_DD_SOFR_PREF";

var tabMEBlks = {"CVS_DRAWDOWN_PROD__TAB_MAIN":"BLK_LBTBS_BORR_DRAWDOWN_PROD~BLK_LBTBS_BORR_DRAWDOWN_COMP~BLK_LBTBS_INTERIM_INTEREST_SCH~BLK_LBTBS_BORROWER_DD_MARGIN","CVS_DRAWDOWN_PROD__TAB_2":"BLK_LBTBS_TR_DD_PART_RATIO"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTROL_CONDP">CONTRACTREFNO~VERSION_NO~TXT_PRODUCT_DESC~TXT_PROD_TYPE_DESC~TXT_CUSTOMER_NAME~TXT_PURPOSE_OF_SYNDICATION~TXT_FACILITY_NAME~USER_REF_NO~PRODUCTCODE~COUNTERPARTY~TXT_AMRT_PROD_ALLOWD~TXT_CASCADE_PART~TXT_BRANCH~TXT_MODULE~TXT_FACILITY_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTROL_CONDP" RELATION_TYPE="N" TYPE="BLK_LBTBS_BORR_DRAWDOWN_PROD">PRODUCT_CODE~ROUNDING_RULE~DUMMY~PROD_DESC~CONTRACT_REF_NO~VERSION_NO~ALLOW_RATIO_CHANGE~PART_INT_CALL_METHOD</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_BORR_DRAWDOWN_PROD" RELATION_TYPE="N" TYPE="BLK_LBTBS_BORR_DRAWDOWN_COMP">CONTRACT_REF_NO~VERSION_NO~COMPONENT_TYPE~COMPONENT~COMPONENT_DESC~PRODUCT_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_BORR_DRAWDOWN_COMP" RELATION_TYPE="N" TYPE="BLK_LBTBS_TR_DD_PART_RATIO">CONTRACT_REF_NO~VERSION_NO~COMPONENT_TYPE~SETTLEMENT_SEQ_NO~PRODUCT_CODE~COMPONENT~PARTICIPANT~COMPONENT_RATIO~SSI_PICKUP_AT_DUMMY~SSI_MNEMONIC~PARTICIPANT_NAME~TXT_SUM_COMPONENT_RATIO</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_BORR_DRAWDOWN_COMP" RELATION_TYPE="N" TYPE="BLK_LBTBS_BORROWER_DD_MARGIN">CONTRACT_REF_NO~PRODUCT_CODE~COMPONENT~SEQ_NO~VERSION_NO~MARGIN_COMPONENT~MARGIN_BASIS~BASIS_AMT_TAG~DEFAULT_MARGIN_RATE~MARGIN_EXCEPTION_TRACKING~MARGIN_BASIS_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_BORR_DRAWDOWN_COMP" RELATION_TYPE="N" TYPE="BLK_LBTBS_INTERIM_INTEREST_SCH">CONTRACT_REF_NO~PRODUCT_CODE~COMPONENT~VERSION_NO~START_REFERENCE~FREQUENCY~FREQUENCY_UNIT~START_MONTH~START_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTROL_CONDP" RELATION_TYPE="N" TYPE="BLK_PARAT_CONDP">CONTRACT_REF_NO~PARTICIPANT~ASSET_RATIO~SSI_MNEMONIC</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_BORR_DRAWDOWN_COMP" RELATION_TYPE="N" TYPE="BLK_DD_SOFR_PREF">COMPONENT~CONTRACT_REF_NO~CURRENCY~PRODUCT~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD_DAYS~RFR_PAYMENTDELAY_METHOD_DAYS~VERSION_NO~RFR_BASE_COMP_METH~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOOKBACK_METHOD~RFR_MARG_COMP_METH~RFR_PAYMENTDELAY_METHOD~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_SPREAD_ADJ_COMP_METH~RFR_RATE_COMPOUNDING~RFR_COMPONENT~RFR_RATE_TYPE~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~OBSERVATION_SHIFT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_DRAWDOWN_PROD";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTROL_CONDP" : "","BLK_LBTBS_BORR_DRAWDOWN_PROD" : "BLK_CONTROL_CONDP~N","BLK_LBTBS_BORR_DRAWDOWN_COMP" : "BLK_LBTBS_BORR_DRAWDOWN_PROD~N","BLK_LBTBS_TR_DD_PART_RATIO" : "BLK_LBTBS_BORR_DRAWDOWN_COMP~N","BLK_LBTBS_BORROWER_DD_MARGIN" : "BLK_LBTBS_BORR_DRAWDOWN_COMP~N","BLK_LBTBS_INTERIM_INTEREST_SCH" : "BLK_LBTBS_BORR_DRAWDOWN_COMP~N","BLK_PARAT_CONDP" : "BLK_CONTROL_CONDP~N","BLK_DD_SOFR_PREF" : "BLK_LBTBS_BORR_DRAWDOWN_COMP~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTROL_CONDP","BLK_LBTBS_BORR_DRAWDOWN_PROD","BLK_LBTBS_BORR_DRAWDOWN_COMP","BLK_LBTBS_TR_DD_PART_RATIO","BLK_LBTBS_BORROWER_DD_MARGIN","BLK_LBTBS_INTERIM_INTEREST_SCH","BLK_PARAT_CONDP","BLK_DD_SOFR_PREF"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCCONDP.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCCONDP.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTROL_CONDP__CONTRACTREFNO";
pkFields[0] = "BLK_CONTROL_CONDP__CONTRACTREFNO";
queryFields[1] = "BLK_CONTROL_CONDP__VERSION_NO";
pkFields[1] = "BLK_CONTROL_CONDP__VERSION_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONTROL_CONDP":["BTN_POPULATE"],"BLK_DD_SOFR_PREF":["COMPONENT","CONTRACT_REF_NO","CURRENCY","OBSERVATION_SHIFT","PRODUCT","RFR_BASE_COMP_METH","RFR_COMPONENT","RFR_INTERESTROLLOVER_METHOD","RFR_LASTRECENT_METHOD","RFR_LASTRESET_METHOD","RFR_LOCKOUT_METHOD","RFR_LOCKOUT_METHOD_DAYS","RFR_LOOKBACK_METHOD","RFR_LOOKBACK_METHOD_DAYS","RFR_MARG_COMP_METH","RFR_PAYMENTDELAY_METHOD","RFR_PAYMENTDELAY_METHOD_DAYS","RFR_PLAIN_METHOD","RFR_PRINCIPALADJUSTMENT_METHOD","RFR_RATE_COMPOUNDING","RFR_RATE_COMPOUNDING_METHOD","RFR_RATE_COMP_ROUND_UNIT","RFR_RATE_TYPE","RFR_SPREAD_ADJ_COMP_METH","VERSION_NO"],"BLK_LBTBS_BORROWER_DD_MARGIN":["BASIS_AMT_TAG","COMPONENT","CONTRACT_REF_NO","DEFAULT_MARGIN_RATE","MARGIN_BASIS","MARGIN_BASIS_DESC","MARGIN_COMPONENT","MARGIN_EXCEPTION_TRACKING","PRODUCT_CODE","SEQ_NO","VERSION_NO"],"BLK_LBTBS_BORR_DRAWDOWN_COMP":["COMPONENT","COMPONENT_DESC","COMPONENT_TYPE","CONTRACTUAL","CONTRACT_REF_NO","PRODUCT_CODE","VERSION_NO"],"BLK_LBTBS_BORR_DRAWDOWN_PROD":["ALLOW_RATIO_CHANGE","CONTRACT_REF_NO","DUMMY","PART_INT_CALL_METHOD","PRODUCT_CODE","PROD_DESC","ROUNDING_RULE","VERSION_NO"],"BLK_LBTBS_INTERIM_INTEREST_SCH":["COMPONENT","CONTRACT_REF_NO","FREQUENCY","FREQUENCY_UNIT","PRODUCT_CODE","START_DATE","START_MONTH","START_REFERENCE","VERSION_NO"],"BLK_LBTBS_TR_DD_PART_RATIO":["COMPONENT","COMPONENT1","COMPONENT_RATIO","COMPONENT_TYPE","CONTRACT_REF_NO","PARTICIPANT","PARTICIPANT_NAME","PRODUCT_CODE","PRODUCT_CODE1","SETTLEMENT_SEQ_NO","SSI_MNEMONIC","SSI_PICKUP_AT_DUMMY","TXT_SUM_COMPONENT_RATIO","VERSION_NO"],"BLK_PARAT_CONDP":["ASSET_RATIO","CONTRACT_REF_NO","PARTICIPANT","SSI_MNEMONIC"]};
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
var lovInfoFlds = {"BLK_LBTBS_BORR_DRAWDOWN_PROD__PRODUCT_CODE__LOV_PROD":["BLK_LBTBS_BORR_DRAWDOWN_PROD__PRODUCT_CODE~BLK_LBTBS_BORR_DRAWDOWN_PROD__PROD_DESC~","BLK_CONTROL_CONDP__PRODUCTCODE!VARCHAR2~BLK_CONTROL_CONDP__TXT_FACILITY_NO!VARCHAR2~BLK_CONTROL_CONDP__TXT_AMRT_PROD_ALLOWD!VARCHAR2","N~N",""],"BLK_LBTBS_BORR_DRAWDOWN_COMP__COMPONENT__LOV_COMP":["BLK_LBTBS_BORR_DRAWDOWN_COMP__COMPONENT~BLK_LBTBS_BORR_DRAWDOWN_COMP__COMPONENT_DESC~","BLK_LBTBS_BORR_DRAWDOWN_PROD__PRODUCT_CODE!varchar2","N~N",""],"BLK_LBTBS_TR_DD_PART_RATIO__SETTLEMENT_SEQ_NO__LOV_SSI_MNEMONIC":["~~~~~~","","N~N~N~N",""],"BLK_LBTBS_TR_DD_PART_RATIO__PARTICIPANT__LOV_PARAT":["BLK_LBTBS_TR_DD_PART_RATIO__PARTICIPANT~BLK_LBTBS_TR_DD_PART_RATIO__PARTICIPANT_NAME~","","N~N",""],"BLK_LBTBS_TR_DD_PART_RATIO__SSI_MNEMONIC__LOV_SSI_MNEMONIC":["BLK_LBTBS_TR_DD_PART_RATIO__PARTICIPANT~BLK_LBTBS_TR_DD_PART_RATIO__PARTICIPANT_NAME~BLK_LBTBS_TR_DD_PART_RATIO__SSI_MNEMONIC~BLK_LBTBS_TR_DD_PART_RATIO__SETTLEMENT_SEQ_NO~","BLK_LBTBS_TR_DD_PART_RATIO__PARTICIPANT!VARCHAR2~BLK_CONTROL_CONDP__TXT_BRANCH!VARCHAR2~BLK_CONTROL_CONDP__TXT_MODULE!VARCHAR2~BLK_CONTROL_CONDP__PRODUCTCODE!VARCHAR2","N~N~N~N",""],"BLK_LBTBS_BORROWER_DD_MARGIN__MARGIN_COMPONENT__LOV_MARGIN":["BLK_LBTBS_BORROWER_DD_MARGIN__MARGIN_COMPONENT~BLK_LBTBS_BORROWER_DD_MARGIN__MARGIN_BASIS_DESC~BLK_LBTBS_BORROWER_DD_MARGIN__SEQ_NO~BLK_LBTBS_BORROWER_DD_MARGIN__BASIS_AMT_TAG~BLK_LBTBS_BORROWER_DD_MARGIN__DEFAULT_MARGIN_RATE~BLK_LBTBS_BORROWER_DD_MARGIN__MARGIN_BASIS~","BLK_LBTBS_BORR_DRAWDOWN_COMP__PRODUCT_CODE!VARCHAR2~BLK_LBTBS_BORR_DRAWDOWN_COMP__COMPONENT!VARCHAR2","N~N~N~N~N~N",""],"BLK_LBTBS_BORROWER_DD_MARGIN__MARGIN_BASIS__LOV_MARGIN":["~~~~~~","","N~N~N~N~N~N",""],"BLK_LBTBS_BORROWER_DD_MARGIN__BASIS_AMT_TAG__LOV_MARGIN":["~~~~~~","","N~N~N~N~N~N",""],"BLK_DD_SOFR_PREF__CURRENCY__LOV_RFR_CCY":["BLK_DD_SOFR_PREF__CURRENCY~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LBTBS_BORR_DRAWDOWN_PROD","BLK_LBTBS_BORR_DRAWDOWN_COMP","BLK_LBTBS_INTERIM_INTEREST_SCH","BLK_LBTBS_TR_DD_PART_RATIO","BLK_LBTBS_BORROWER_DD_MARGIN");
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

ArrFuncOrigin["LBCCONDP"]="KERNEL";
ArrPrntFunc["LBCCONDP"]="";
ArrPrntOrigin["LBCCONDP"]="";
ArrRoutingType["LBCCONDP"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCCONDP"]="N";
ArrCustomModified["LBCCONDP"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_DRAWDOWN_PROD":"CONTRACT_REF_NO~VERSION_NO"};
var scrArgSource = {};
var scrArgVals = {"CVS_DRAWDOWN_PROD":"~"};
var scrArgDest = {"CVS_DRAWDOWN_PROD":"BLK_CONTROL_CONDP__CONTRACTREFNO~BLK_CONTROL_CONDP__VERSION_NO"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"2","ROLLOVER":"2","CONFIRM":"2","LIQUIDATE":"2","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------