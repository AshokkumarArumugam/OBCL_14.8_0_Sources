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
**  File Name          : OLCSPROL_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT__SR":"CONREFERNO~USER_REF_NO~LATEST_VERSION_NO~TXTUSERREFNO~TXTPRODCODE~CCY","BLK_CONTRACT_ROLLOVER":"CONTRACT_REF_NO~VERSION_NO~EVENT_SEQ_NO~ROLLOVER_AMT~ROLLOVER_TYPE~ROLLOVER_AMOUNT_TYPE~MATURITY_TYPE~MATURITY_DATE~NOTICE_DAYS~APPLY_TAX~ROLLOVER_ICCF_FROM~LIQUIDATE_OD_SCHEDULES~SCHEDULE_DEFINITION_BASIS~APPLY_CHARGE~NEW_COMPONENTS_ALLOWED~TREAT_SPL_AMT_AS~REF_RATE~ROLL_BY~MATURITY_DAYS","BLK_CONTRACT_SPLIT_ROLLOVER":"CONTRACT_REF_NO~VERSION_NO~EVENT_SEQ_NO~SPLIT_NO~MAX_ROLL_AMOUNT~AMOUNT_TYPE~DRAWDOWN_NO~SCHEDULE_BASIS~MATURITY_TYPE~MATURITY_DATE~MATURITY_DAYS~MATURITY_DAYS_BASIS~NOTICE_DAYS~REFINANCE_RATE~TRANCHE_REF_NO","BLK_CONTRACT_ROLL_INT_RATES":"CONTRACT_REF_NO~VERSION_NO~SPLIT_NO~EVENT_SEQ_NO~COMPONENT~RATE_TYPE~INT_BASIS~DEFAULT_FROM~RATE_CODE~RATE~AMOUNT~MARGIN~SPREAD~PENALTY_TENOR~RATEFIXINGDAYS~RATE_BASIS~RATE_ROUNDING_POSITION~RATE_ROUNDING_RULE~RATE_ROUNDING_UNIT~SPREAD_ADJ~ACCL_FLT_RATE_PCT","BLK_OLTBS_CONTRACT_MAN_ROLL":"COMPONENT~ESNO~SPLITNO~CONTRACTREFNO~RESETVALDT~SPREAD~CURRRESERDT~RATECODE~NEXTRESETDT~RATE~TXTCURRENCY~STATUS~VERSIONNO","BLK_LFTB_CONT_ADDL_INT_DTL":"COMPONENT~CONTRACT_REF_NO~OBSERVATION_SHIFT~PRODUCT_CODE~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_LOOKBACK_METHOD_DAYS~RFR_MARG_COMP_METH~RFR_METHOD~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_RATE_COMPOUNDING~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~RFR_RATE_TYPE~RFR_SPREAD_ADJ_COMP_METH~SERIAL_NO~SPLIT_SERIAL_NO~VERSION_NO"};

var multipleEntryPageSize = {"BLK_CONTRACT_SPLIT_ROLLOVER" :"15" };

var multipleEntrySVBlocks = "BLK_CONTRACT_ROLL_INT_RATES~BLK_OLTBS_CONTRACT_MAN_ROLL~BLK_LFTB_CONT_ADDL_INT_DTL";

var tabMEBlks = {"CVS_SPROLL__TAB_MAIN":"BLK_CONTRACT_SPLIT_ROLLOVER"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT__SR">CONREFERNO~USER_REF_NO~LATEST_VERSION_NO~TXTUSERREFNO~TXTPRODCODE~CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT__SR" RELATION_TYPE="1" TYPE="BLK_CONTRACT_ROLLOVER">CONTRACT_REF_NO~VERSION_NO~EVENT_SEQ_NO~ROLLOVER_AMT~ROLLOVER_TYPE~ROLLOVER_AMOUNT_TYPE~MATURITY_TYPE~MATURITY_DATE~NOTICE_DAYS~APPLY_TAX~ROLLOVER_ICCF_FROM~LIQUIDATE_OD_SCHEDULES~SCHEDULE_DEFINITION_BASIS~APPLY_CHARGE~NEW_COMPONENTS_ALLOWED~TREAT_SPL_AMT_AS~REF_RATE~ROLL_BY~MATURITY_DAYS</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_ROLLOVER" RELATION_TYPE="N" TYPE="BLK_CONTRACT_SPLIT_ROLLOVER">CONTRACT_REF_NO~VERSION_NO~EVENT_SEQ_NO~SPLIT_NO~MAX_ROLL_AMOUNT~AMOUNT_TYPE~DRAWDOWN_NO~SCHEDULE_BASIS~MATURITY_TYPE~MATURITY_DATE~MATURITY_DAYS~MATURITY_DAYS_BASIS~NOTICE_DAYS~REFINANCE_RATE~TRANCHE_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_SPLIT_ROLLOVER" RELATION_TYPE="N" TYPE="BLK_CONTRACT_ROLL_INT_RATES">CONTRACT_REF_NO~VERSION_NO~SPLIT_NO~EVENT_SEQ_NO~COMPONENT~RATE_TYPE~INT_BASIS~DEFAULT_FROM~RATE_CODE~RATE~AMOUNT~MARGIN~SPREAD~PENALTY_TENOR~RATEFIXINGDAYS~RATE_BASIS~RATE_ROUNDING_POSITION~RATE_ROUNDING_RULE~RATE_ROUNDING_UNIT~SPREAD_ADJ~ACCL_FLT_RATE_PCT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_ROLL_INT_RATES" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_MAN_ROLL">COMPONENT~ESNO~SPLITNO~CONTRACTREFNO~RESETVALDT~SPREAD~CURRRESERDT~RATECODE~NEXTRESETDT~RATE~TXTCURRENCY~STATUS~VERSIONNO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_ROLL_INT_RATES" RELATION_TYPE="1" TYPE="BLK_LFTB_CONT_ADDL_INT_DTL">COMPONENT~CONTRACT_REF_NO~OBSERVATION_SHIFT~PRODUCT_CODE~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_LOOKBACK_METHOD_DAYS~RFR_MARG_COMP_METH~RFR_METHOD~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_RATE_COMPOUNDING~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~RFR_RATE_TYPE~RFR_SPREAD_ADJ_COMP_METH~SERIAL_NO~SPLIT_SERIAL_NO~VERSION_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_SPROLL";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT__SR" : "","BLK_CONTRACT_ROLLOVER" : "BLK_OLTBS_CONTRACT__SR~1","BLK_CONTRACT_SPLIT_ROLLOVER" : "BLK_CONTRACT_ROLLOVER~N","BLK_CONTRACT_ROLL_INT_RATES" : "BLK_CONTRACT_SPLIT_ROLLOVER~N","BLK_OLTBS_CONTRACT_MAN_ROLL" : "BLK_CONTRACT_ROLL_INT_RATES~N","BLK_LFTB_CONT_ADDL_INT_DTL" : "BLK_CONTRACT_ROLL_INT_RATES~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT__SR","BLK_CONTRACT_ROLLOVER","BLK_CONTRACT_SPLIT_ROLLOVER","BLK_CONTRACT_ROLL_INT_RATES","BLK_OLTBS_CONTRACT_MAN_ROLL","BLK_LFTB_CONT_ADDL_INT_DTL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCSPROL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCSPROL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__SR__CONREFERNO";
pkFields[0] = "BLK_OLTBS_CONTRACT__SR__CONREFERNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONTRACT_ROLLOVER":["APPLY_CHARGE","APPLY_TAX","EVENT_SEQ_NO","LIQUIDATE_OD_SCHEDULES","MATURITY_DATEI","MATURITY_DAYS","MATURITY_TYPE","NEW_COMPONENTS_ALLOWED","NOTICE_DAYS","REF_RATE","ROLLOVER_AMOUNT_TYPE","ROLLOVER_AMT","ROLLOVER_ICCF_FROM","ROLLOVER_TYPE","ROLL_BY","SCHEDULE_DEFINITION_BASIS","TREAT_SPL_AMT_AS","VERSION_NO"],"BLK_CONTRACT_ROLL_INT_RATES":["ACCL_FLT_RATE_PCT","AMOUNT","COMPONENT","DEFAULT_FROM","EVENT_SEQ_NO","INT_BASIS","MARGIN","PENALTY_TENOR","RATE","RATEFIXINGDAYS","RATE_BASIS","RATE_CODE","RATE_ROUNDING_POSITION","RATE_ROUNDING_RULE","RATE_ROUNDING_UNIT","RATE_TYPE","SPLIT_NO","SPREAD","SPREAD_ADJ","VERSION_NO"],"BLK_CONTRACT_SPLIT_ROLLOVER":["AMOUNT_TYPE","DRAWDOWN_NO","EVENT_SEQ_NO","MATURITY_DATEI","MATURITY_DAYS","MATURITY_DAYS_BASIS","MATURITY_TYPE","MAX_ROLL_AMOUNT","NOTICE_DAYS","REFINANCE_RATE","SCHEDULE_BASIS","SPLIT_NO","VERSION_NO"],"BLK_LFTB_CONT_ADDL_INT_DTL":["OBSERVATION_SHIFT","RFR_BASE_COMP_METH","RFR_COMPONENT","RFR_INTERESTROLLOVER_METHOD","RFR_LASTRECENT_METHOD","RFR_LASTRESET_METHOD","RFR_LOCKOUT_METHOD","RFR_LOCKOUT_METHOD_DAYS","RFR_LOOKBACK_METHOD","RFR_LOOKBACK_METHOD_DAYS","RFR_MARG_COMP_METH","RFR_METHOD","RFR_PAYMENTDELAY_METHOD","RFR_PAYMENTDELAY_METHOD_DAYS","RFR_PLAIN_METHOD","RFR_PRINCIPALADJUSTMENT_METHOD","RFR_RATE_COMPOUNDING","RFR_RATE_COMPOUNDING_METHOD","RFR_RATE_COMP_ROUND_UNIT","RFR_RATE_TYPE","RFR_SPREAD_ADJ_COMP_METH"],"BLK_OLTBS_CONTRACT_MAN_ROLL":["CONTRACTREFNO","CURRRESERDTI","ESNO","NEXTRESETDTI","RATE","RATECODE","RESETVALDTI","SPLITNO","SPREAD","STATUS","TXTCURRENCY","VERSIONNO"]};
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
var lovInfoFlds = {"BLK_CONTRACT_ROLL_INT_RATES__COMPONENT__LOV_COMPONENT":["BLK_CONTRACT_ROLL_INT_RATES__COMPONENT~","BLK_OLTBS_CONTRACT__SR__TXTPRODCODE!VARCHAR2","N","N"],"BLK_CONTRACT_ROLL_INT_RATES__RATE_CODE__LOV_ROLL_RATECODE":["BLK_CONTRACT_ROLL_INT_RATES__RATE_CODE~~","BLK_OLTBS_CONTRACT__SR__CONREFERNO!VARCHAR2~BLK_CONTRACT_ROLL_INT_RATES__RATE_TYPE!VARCHAR2~BLK_CONTRACT_ROLL_INT_RATES__RATE_TYPE!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CONTRACT_SPLIT_ROLLOVER");
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

ArrFuncOrigin["OLCSPROL"]="KERNEL";
ArrPrntFunc["OLCSPROL"]="";
ArrPrntOrigin["OLCSPROL"]="";
ArrRoutingType["OLCSPROL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCSPROL"]="N";
ArrCustomModified["OLCSPROL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_SPROLL":"CONREFERNO~LATEST_VERSION_NO~CCY","CVS_INT_DTLS":""};
var scrArgSource = {};
var scrArgVals = {"CVS_SPROLL":"CONREFERNO~LATEST_VERSION_NO~CCY","CVS_INT_DTLS":""};
var scrArgDest = {"CVS_SPROLL":"BLK_OLTBS_CONTRACT__SR__CONREFERNO~BLK_OLTBS_CONTRACT__SR__LATEST_VERSION_NO~BLK_OLTBS_CONTRACT__SR__CCY","CVS_INT_DTLS":""};
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