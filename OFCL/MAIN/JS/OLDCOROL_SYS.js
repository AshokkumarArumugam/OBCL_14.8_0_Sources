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
**  File Name          : OLDCOROL_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT":"CONTRACT_REF_NO~PRODUCT_CODE~CONTRACT_CCY~USER_REF_NO~COUNTERPARTY~LATEST_VERSION_NO~BRANCHCODE~LATESTEVESEQNO~ORGACTCOD~CONTRACT_STATUS~AUTH_STATUS~CURR_EVENT_CODE","BLK_CONSOL_MASTER":"CONTRACTREFNO~TRANCHEREFNO~VALUEDATE~ROLLOVERREFNO~MOD_NO~USER_REF_NO~PRODUCT_CODE~ROLLOVER_TYPE~SCHEDULE_BASIS~SETTLEMENT_BASIS~MIS_BASIS~UDF_BASIS~MATURITY_TYPE~MATURITY_DATE~MATURITY_DAYS~NOTICE_DAYS~REFERENCE_RATE~ROLL_BY~M_SCH_SCHEDULE_MOVEMENT~M_SCH_IGNORE_HOLIDAYS~M_SCH_MOVE_ACROSS_MONTH~COUNTERPARTY~CONTRACT_CCY~DRAWDOWN_NO~ONCE_AUTH~SUBSYSSTAT~TXT_OUT_BAL~MAKERID~MAKERDTST~CHECKERID~CHECKERDTST~TXNSTAT~AUTHSTAT~ECAREQSTATUS","BLK_ROLL_INT_RATES":"DEFAULTFROM~RATE~COMPONENT~SPLIT_NO~VERSIONNO~CONTRACTREFNO~RATEFIXINGDAYS~RATECODE~RATETYPE~AMOUNT~ACCL_FLT_RATE_PCT~CCYDECIMALS~CCYRNDRUL~CCYRNDUNIT~INTBASIS~INTPRDBASIS~MARGIN~RATE_BASIS~RATE_ROUNDING_POSITION~RATE_ROUNDING_RULE~RATE_ROUNDING_UNIT~RATESIGN~SPREAD~SPREAD_ADJ","BLK_CONSOL_DET":"PROD_CODE~PARTICIPANTREFNO~SPECIALAMOUNTTYPE~DEFAULTCONTRACT~APPLYTAX~APPLYCHARGE~LIQUIDATEODSCHEDULES~SPECIALAMOUNT~ROLLOVERAMOUNTTYPE~CONTRACTREFNO","BLK_EVENT_LOG":"AUTH_STATUS~CONTRACT_STATUS~EVENT_SEQ_NO~CHECKER_DT_STAMP~CHECKER_ID~MAKER_DT_STAMP~MAKER_ID~CONTRACT_REF_NO~EVENT_CODE","BLK_MAN_ROLL":"CONTRACTREFNO~COMPONENT~SPLITNO~VERSIONNO~CURRENTRESETDATE~RESETVALUEDATE~RATE~SPREAD~NEXTRESTDATE~RATEFIXINGESN~RATECODE~ESNO~STATUS~TXTCURRENCY","BLK_LFTBS_CONT_ADDL_INT_DTL":"COMPONENT~CONTRACT_REF_NO~OBSERVATION_SHIFT~PRODUCT_CODE~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_LOOKBACK_METHOD_DAYS~RFR_MARG_COMP_METH~RFR_METHOD~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_RATE_COMPOUNDING~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~RFR_RATE_TYPE~RFR_SPREAD_ADJ_COMP_METH~SERIAL_NO~SPLIT_SERIAL_NO~VERSION_NO"};

var multipleEntryPageSize = {"BLK_CONSOL_DET" :"15" };

var multipleEntrySVBlocks = "BLK_ROLL_INT_RATES~BLK_MAN_ROLL~BLK_LFTBS_CONT_ADDL_INT_DTL";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_CONSOL_DET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">CONTRACT_REF_NO~PRODUCT_CODE~CONTRACT_CCY~USER_REF_NO~COUNTERPARTY~LATEST_VERSION_NO~BRANCHCODE~LATESTEVESEQNO~ORGACTCOD~CONTRACT_STATUS~AUTH_STATUS~CURR_EVENT_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_CONSOL_MASTER">CONTRACTREFNO~TRANCHEREFNO~VALUEDATE~ROLLOVERREFNO~MOD_NO~USER_REF_NO~PRODUCT_CODE~ROLLOVER_TYPE~SCHEDULE_BASIS~SETTLEMENT_BASIS~MIS_BASIS~UDF_BASIS~MATURITY_TYPE~MATURITY_DATE~MATURITY_DAYS~NOTICE_DAYS~REFERENCE_RATE~ROLL_BY~M_SCH_SCHEDULE_MOVEMENT~M_SCH_IGNORE_HOLIDAYS~M_SCH_MOVE_ACROSS_MONTH~COUNTERPARTY~CONTRACT_CCY~DRAWDOWN_NO~ONCE_AUTH~SUBSYSSTAT~TXT_OUT_BAL~MAKERID~MAKERDTST~CHECKERID~CHECKERDTST~TXNSTAT~AUTHSTAT~ECAREQSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_CONSOL_MASTER" RELATION_TYPE="N" TYPE="BLK_ROLL_INT_RATES">DEFAULTFROM~RATE~COMPONENT~SPLIT_NO~VERSIONNO~CONTRACTREFNO~RATEFIXINGDAYS~RATECODE~RATETYPE~AMOUNT~ACCL_FLT_RATE_PCT~CCYDECIMALS~CCYRNDRUL~CCYRNDUNIT~INTBASIS~INTPRDBASIS~MARGIN~RATE_BASIS~RATE_ROUNDING_POSITION~RATE_ROUNDING_RULE~RATE_ROUNDING_UNIT~RATESIGN~SPREAD~SPREAD_ADJ</FN>'; 
msgxml += '      <FN PARENT="BLK_CONSOL_MASTER" RELATION_TYPE="N" TYPE="BLK_CONSOL_DET">PROD_CODE~PARTICIPANTREFNO~SPECIALAMOUNTTYPE~DEFAULTCONTRACT~APPLYTAX~APPLYCHARGE~LIQUIDATEODSCHEDULES~SPECIALAMOUNT~ROLLOVERAMOUNTTYPE~CONTRACTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_EVENT_LOG">AUTH_STATUS~CONTRACT_STATUS~EVENT_SEQ_NO~CHECKER_DT_STAMP~CHECKER_ID~MAKER_DT_STAMP~MAKER_ID~CONTRACT_REF_NO~EVENT_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_ROLL_INT_RATES" RELATION_TYPE="N" TYPE="BLK_MAN_ROLL">CONTRACTREFNO~COMPONENT~SPLITNO~VERSIONNO~CURRENTRESETDATE~RESETVALUEDATE~RATE~SPREAD~NEXTRESTDATE~RATEFIXINGESN~RATECODE~ESNO~STATUS~TXTCURRENCY</FN>'; 
msgxml += '      <FN PARENT="BLK_ROLL_INT_RATES" RELATION_TYPE="1" TYPE="BLK_LFTBS_CONT_ADDL_INT_DTL">COMPONENT~CONTRACT_REF_NO~OBSERVATION_SHIFT~PRODUCT_CODE~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_LOOKBACK_METHOD_DAYS~RFR_MARG_COMP_METH~RFR_METHOD~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_RATE_COMPOUNDING~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~RFR_RATE_TYPE~RFR_SPREAD_ADJ_COMP_METH~SERIAL_NO~SPLIT_SERIAL_NO~VERSION_NO</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">CONTRACT_REF_NO~CONTRACT_CCY~AUTH_STATUS~CONTRACT_STATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDCOROL";
var defaultWhereClause = "CONTRACT_REF_NO IN (select contract_ref_no from OLTB_CONTRACT_CONSOL_MASTER) and branch=global.current_branch and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(CONTRACT_REF_NO) AND USER_ID = global.user_id)";
var defaultOrderByClause ="";
var multiBrnWhereClause ="CONTRACT_REF_NO IN (select contract_ref_no from OLTB_CONTRACT_CONSOL_MASTER) and Branch IN (SELECT BRANCH_CODE FROM SMVW_USER_BRANCHES WHERE USER_ID = GLOBAL.USER_ID INTERSECT SELECT BRANCH_CODE FROM SMTB_USER_ROLE WHERE USER_ID = GLOBAL.USER_ID UNION SELECT BRANCH_CODE FROM SMVWS_USER_CENTRAL_ROLES WHERE USER_ID = GLOBAL.USER_ID) and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(CONTRACT_REF_NO) AND USER_ID = global.user_id)";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTBS_CONTRACT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT" : "","BLK_CONSOL_MASTER" : "BLK_OLTBS_CONTRACT~1","BLK_ROLL_INT_RATES" : "BLK_CONSOL_MASTER~N","BLK_CONSOL_DET" : "BLK_CONSOL_MASTER~N","BLK_EVENT_LOG" : "BLK_OLTBS_CONTRACT~1","BLK_MAN_ROLL" : "BLK_ROLL_INT_RATES~N","BLK_LFTBS_CONT_ADDL_INT_DTL" : "BLK_ROLL_INT_RATES~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT","BLK_CONSOL_MASTER","BLK_ROLL_INT_RATES","BLK_CONSOL_DET","BLK_EVENT_LOG","BLK_MAN_ROLL","BLK_LFTBS_CONT_ADDL_INT_DTL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDCOROL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDCOROL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__CONTRACT_REF_NO";
pkFields[0] = "BLK_OLTBS_CONTRACT__CONTRACT_REF_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONSOL_DET":["APPLYCHARGE","APPLYTAX","DEFAULTCONTRACT","PARTICIPANTREFNO","PROD_CODE","ROLLOVERAMOUNTTYPE","SPECIALAMOUNT","SPECIALAMOUNTTYPE"],"BLK_LFTBS_CONT_ADDL_INT_DTL":["OBSERVATION_SHIFT","RFR_BASE_COMP_METH","RFR_INTERESTROLLOVER_METHOD","RFR_LASTRECENT_METHOD","RFR_LASTRESET_METHOD","RFR_LOCKOUT_METHOD","RFR_LOCKOUT_METHOD_DAYS","RFR_LOOKBACK_METHOD","RFR_LOOKBACK_METHOD_DAYS","RFR_MARG_COMP_METH","RFR_METHOD","RFR_PAYMENTDELAY_METHOD","RFR_PAYMENTDELAY_METHOD_DAYS","RFR_PLAIN_METHOD","RFR_PRINCIPALADJUSTMENT_METHOD","RFR_RATE_COMPOUNDING","RFR_RATE_COMPOUNDING_METHOD","RFR_RATE_COMP_ROUND_UNIT","RFR_RATE_TYPE","RFR_SPREAD_ADJ_COMP_METH","SERIAL_NO","SPLIT_SERIAL_NO","VERSION_NO"],"BLK_ROLL_INT_RATES":["ACCL_FLT_RATE_PCT","AMOUNT","CCYDECIMALS","CCYRNDRUL","CCYRNDUNIT","CONTRACTREFNO","DEFAULTFROM","INTBASIS","INTPRDBASIS","MARGIN","RATE","RATECODE","RATEFIXINGDAYS","RATESIGN","RATETYPE","RATE_BASIS","RATE_ROUNDING_POSITION","RATE_ROUNDING_RULE","RATE_ROUNDING_UNIT","SPREAD","SPREAD_ADJ","VERSIONNO"]};
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT__PRODUCT_CODE__LOV_LOAN_PRODUCTS":["BLK_OLTBS_CONTRACT__PRODUCT_CODE~~","","N~N",""],"BLK_OLTBS_CONTRACT__CONTRACT_CCY__LOV_CURRENCY_ALLOWED":["BLK_OLTBS_CONTRACT__CONTRACT_CCY~~","BLK_OLTBS_CONTRACT__PRODUCT_CODE!varchar2","N~N",""],"BLK_OLTBS_CONTRACT__COUNTERPARTY__LOV_CUSTOMERS_ALLOWED":["BLK_OLTBS_CONTRACT__COUNTERPARTY~~","BLK_OLTBS_CONTRACT__PRODUCT_CODE!varchar2","N~N",""],"BLK_CONSOL_MASTER__TRANCHEREFNO__LOV_TRANCHE_ALLOWED":["BLK_CONSOL_MASTER__TRANCHEREFNO~~~BLK_CONSOL_MASTER__CONTRACT_CCY~BLK_CONSOL_MASTER__TXT_OUT_BAL~~","","N~N~N~N~N~N",""],"BLK_CONSOL_MASTER__DRAWDOWN_NO__LOV_DRAWDOWN_NO":["BLK_CONSOL_MASTER__DRAWDOWN_NO~","BLK_CONSOL_MASTER__TRANCHEREFNO!~BLK_OLTBS_CONTRACT__CONTRACT_CCY!~BLK_OLTBS_CONTRACT__COUNTERPARTY!~BLK_CONSOL_MASTER__VALUEDATE!~BLK_CONSOL_MASTER__TRANCHEREFNO!","N",""],"BLK_ROLL_INT_RATES__RATECODE__LOV_ROLL_RATECODE":["BLK_ROLL_INT_RATES__RATECODE~~","BLK_OLTBS_CONTRACT__BRANCHCODE!","N~N",""],"BLK_CONSOL_DET__PROD_CODE__LOV_COMMIT_PRODUCTS":["BLK_CONSOL_DET__PROD_CODE~~","BLK_OLTBS_CONTRACT__COUNTERPARTY!VARCHAR2~BLK_OLTBS_CONTRACT__CONTRACT_CCY!VARCHAR2~BLK_CONSOL_MASTER__VALUEDATE!DATE~BLK_CONSOL_MASTER__TRANCHEREFNO!VARCHAR2","N~N",""],"BLK_CONSOL_DET__PARTICIPANTREFNO__LOV_LOAN_CONTRACTS":["BLK_CONSOL_DET__PARTICIPANTREFNO~","BLK_CONSOL_DET__PROD_CODE!VARCHAR2~BLK_OLTBS_CONTRACT__COUNTERPARTY!VARCHAR2~BLK_OLTBS_CONTRACT__CONTRACT_CCY!VARCHAR2~BLK_CONSOL_MASTER__VALUEDATE!DATE~BLK_CONSOL_MASTER__TRANCHEREFNO!VARCHAR2","N",""]};
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
var multipleEntryIDs = new Array("BLK_CONSOL_DET");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_OLTBS_CONTRACT","OLCTRMIS~BLK_OLTBS_CONTRACT","OLCTRUDF~BLK_OLTBS_CONTRACT"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT.CONTRACT_REF_NO=OLTBS_CONTRACT__SETT.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO=OLTBS_CONTRACT__MIS.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = OLTBS_CONTRACT__FLD.CONTRACT_REF_NO AND OLTBS_CONTRACT.LATEST_VERSION_NO = OLTBS_CONTRACT__FLD.LATEST_VERSION_NO"); 

 var CallRelatType= new Array("1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDCOROL"]="KERNEL";
ArrPrntFunc["OLDCOROL"]="";
ArrPrntOrigin["OLDCOROL"]="";
ArrRoutingType["OLDCOROL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDCOROL"]="N";
ArrCustomModified["OLDCOROL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCONDET":"CONREFNO~ESN","OLCTRMIS":"CONTREF~ESN~PRDCD~BRNCD","OLCTRUDF":"CONTREFNO~LATVERNO"};
var scrArgSource = {"OLCONDET":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__LATESTEVESEQNO","OLCTRMIS":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__LATESTEVESEQNO~BLK_OLTBS_CONTRACT__PRODUCT_CODE~BLK_OLTBS_CONTRACT__BRANCHCODE","OLCTRUDF":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__LATEST_VERSION_NO"};
var scrArgVals = {"OLCONDET":"~","OLCTRMIS":"~~~","OLCTRUDF":"~"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":"","OLCTRMIS":"","OLCTRUDF":""};
var dpndntOnSrvs = {"OLCONDET":"","OLCTRMIS":"","OLCTRUDF":""};
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