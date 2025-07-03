/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2025, Oracle and/or its affiliates.
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
**  File Name          : OLDREPRS_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT":"CONREFNO~TXTUSERREFNO~LATEVNSEQNO","BLK_SPLIT_MAST_HDR":"CONTRACTREFNO~SPLITSERIALNO~PAYMENTSCHPROCESSING~TRANSFERFEE~EXCHANGERATE~PRINCIPALOS~SPLITVALUEDATE~SPLITBOOKDATE~COUNTERPARTY~LIQUIDATEDEPOSIT~CAPITALIZEINTEREST~LIQDREQD~CONTRACTCCY~TXTPRODUCT~TXTPRODUCTDESC~TXTUSERREFNO~TXTCNTPRTDESC~TXTCCYDESC~TXTOSINTEREST~TXTUNMORTFEE~TXTUNMFAS91FEE~SUBSYSSTAT~PARENTCONTRACTSTATUS~SPLITSTATUS~SCHEDULE_DEFINITION_BASIS~HOLIDAY_PARAMETERS_BASIS~MIS_BASIS~UDF_BASIS~SETTLEMENT_BASIS","BLK_SPLIT_MAST_DET_1":"CONTRACT_REF_NO~SPLIT_SERIAL_NO~SERIALNO~PRODUCTCODE~TXTCURRENCY~AMOUNT~MATURITYDATE~ACQUIREDINTFLAG~SPLITREFNO~MATURITYTYPE~AMORTAMOUNT~TXTREPAMOUNT~SPLIT_CONTGENRATESTATUS","BLK_TOTAL_SPLIT_AMT":"REMARKS~TXTTOTSPLITAMT","BLK_SPLIT_PROD_INTCOM":"CONTRACTREFNO~SPLITSERIALNO~SERIALNO~COMPONENT~PRODUCTCODE~RATECODE~BASERATE~SPREAD~RATE~PLACEMENTMISRATE~RATEREVISIONMETHOD~RATECODEUSAGE~SPECIALRATETYPE~RESETTENOR~RATETYPE~RATEFIXINGREQD~RATEFIXINGDAYS~RATE_BASIS~RATE_ROUNDING_POSITION~RATE_ROUNDING_RULE~RATE_ROUNDING_UNIT~SPREAD_ADJ~ACCL_FLT_RATE_PCT~DEFAULT_FROM~AMOUNT","BLK_SPLIT_INTRATE_FIX":"INTCOMPONENT~CURRENTRESETDATE~RESETVALUEDATE~INTRATE~INTSPREAD~NEXTRESETDATE~INTRATECODE~TXTCOMPDESC~TXTCURRENCY~TXTFINALRATE~SPLITNO","BLK_EVENT_LOG":"MAKERID~MAKERDTST~CHECKERID~CHECKERDTST~TXNSTAT~AUTHSTAT~MOD_NO~RECORD_STATUS~REPRICE_STATUS_UI~CONTRACTREFNO~EVENTSEQNO~ONCEAUTH","BLK_BA_CONT_DETAILS":"AGENT_RATE~BROKER_PROD~COF_AMT~CONTRACT_REF_NO~DISCOUNTED_RATE~DISCOUNT_AMT~INTEREST_DAY_BASIS~NET_BORROWING_AMT~PNL_AMT~SPLIT_NUMBER~SPLIT_SERIAL_NO~STAMPING_FEE_AMT~STAMPING_FEE_RATE~TREASURY_RATE","BLK_LFTB_CONT_ADDL_INT_DTL":"CONTRACT_REF_NO~COMPONENT~OBSERVATION_SHIFT~PRODUCT_CODE~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_MARG_COMP_METH~RFR_METHOD~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_RATE_COMPOUNDING~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~RFR_RATE_TYPE~RFR_SPREAD_ADJ_COMP_METH~SERIAL_NO~SPLIT_SERIAL_NO~VERSION_NO"};

var multipleEntryPageSize = {"BLK_SPLIT_MAST_DET_1" :"15" ,"BLK_BA_CONT_DETAILS" :"15" };

var multipleEntrySVBlocks = "BLK_SPLIT_PROD_INTCOM~BLK_SPLIT_MAST_DET_1~BLK_LFTB_CONT_ADDL_INT_DTL";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_SPLIT_MAST_DET_1~BLK_BA_CONT_DETAILS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT">CONREFNO~TXTUSERREFNO~LATEVNSEQNO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_SPLIT_MAST_HDR">CONTRACTREFNO~SPLITSERIALNO~PAYMENTSCHPROCESSING~TRANSFERFEE~EXCHANGERATE~PRINCIPALOS~SPLITVALUEDATE~SPLITBOOKDATE~COUNTERPARTY~LIQUIDATEDEPOSIT~CAPITALIZEINTEREST~LIQDREQD~CONTRACTCCY~TXTPRODUCT~TXTPRODUCTDESC~TXTUSERREFNO~TXTCNTPRTDESC~TXTCCYDESC~TXTOSINTEREST~TXTUNMORTFEE~TXTUNMFAS91FEE~SUBSYSSTAT~PARENTCONTRACTSTATUS~SPLITSTATUS~SCHEDULE_DEFINITION_BASIS~HOLIDAY_PARAMETERS_BASIS~MIS_BASIS~UDF_BASIS~SETTLEMENT_BASIS</FN>'; 
msgxml += '      <FN PARENT="BLK_SPLIT_MAST_HDR" RELATION_TYPE="N" TYPE="BLK_SPLIT_MAST_DET_1">CONTRACT_REF_NO~SPLIT_SERIAL_NO~SERIALNO~PRODUCTCODE~TXTCURRENCY~AMOUNT~MATURITYDATE~ACQUIREDINTFLAG~SPLITREFNO~MATURITYTYPE~AMORTAMOUNT~TXTREPAMOUNT~SPLIT_CONTGENRATESTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_SPLIT_MAST_HDR" RELATION_TYPE="1" TYPE="BLK_TOTAL_SPLIT_AMT">REMARKS~TXTTOTSPLITAMT</FN>'; 
msgxml += '      <FN PARENT="BLK_SPLIT_MAST_DET_1" RELATION_TYPE="N" TYPE="BLK_SPLIT_PROD_INTCOM">CONTRACTREFNO~SPLITSERIALNO~SERIALNO~COMPONENT~PRODUCTCODE~RATECODE~BASERATE~SPREAD~RATE~PLACEMENTMISRATE~RATEREVISIONMETHOD~RATECODEUSAGE~SPECIALRATETYPE~RESETTENOR~RATETYPE~RATEFIXINGREQD~RATEFIXINGDAYS~RATE_BASIS~RATE_ROUNDING_POSITION~RATE_ROUNDING_RULE~RATE_ROUNDING_UNIT~SPREAD_ADJ~ACCL_FLT_RATE_PCT~DEFAULT_FROM~AMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_SPLIT_INTRATE_FIX">INTCOMPONENT~CURRENTRESETDATE~RESETVALUEDATE~INTRATE~INTSPREAD~NEXTRESETDATE~INTRATECODE~TXTCOMPDESC~TXTCURRENCY~TXTFINALRATE~SPLITNO</FN>'; 
msgxml += '      <FN PARENT="BLK_SPLIT_MAST_HDR" RELATION_TYPE="1" TYPE="BLK_EVENT_LOG">MAKERID~MAKERDTST~CHECKERID~CHECKERDTST~TXNSTAT~AUTHSTAT~MOD_NO~RECORD_STATUS~REPRICE_STATUS_UI~CONTRACTREFNO~EVENTSEQNO~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_SPLIT_MAST_DET_1" RELATION_TYPE="N" TYPE="BLK_BA_CONT_DETAILS">AGENT_RATE~BROKER_PROD~COF_AMT~CONTRACT_REF_NO~DISCOUNTED_RATE~DISCOUNT_AMT~INTEREST_DAY_BASIS~NET_BORROWING_AMT~PNL_AMT~SPLIT_NUMBER~SPLIT_SERIAL_NO~STAMPING_FEE_AMT~STAMPING_FEE_RATE~TREASURY_RATE</FN>'; 
msgxml += '      <FN PARENT="BLK_SPLIT_PROD_INTCOM" RELATION_TYPE="1" TYPE="BLK_LFTB_CONT_ADDL_INT_DTL">CONTRACT_REF_NO~COMPONENT~OBSERVATION_SHIFT~PRODUCT_CODE~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_MARG_COMP_METH~RFR_METHOD~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_RATE_COMPOUNDING~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~RFR_RATE_TYPE~RFR_SPREAD_ADJ_COMP_METH~SERIAL_NO~SPLIT_SERIAL_NO~VERSION_NO</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_CONTRACT_SUMMARY">CONREFNO~SPLITVALUEDATE~SPLITBOOKDATE~AUTHSTATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDREPRS";
var defaultWhereClause = "branch_code =global.current_branch";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_CONTRACT_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT" : "","BLK_SPLIT_MAST_HDR" : "BLK_CONTRACT~1","BLK_SPLIT_MAST_DET_1" : "BLK_SPLIT_MAST_HDR~N","BLK_TOTAL_SPLIT_AMT" : "BLK_SPLIT_MAST_HDR~1","BLK_SPLIT_PROD_INTCOM" : "BLK_SPLIT_MAST_DET_1~N","BLK_SPLIT_INTRATE_FIX" : "BLK_CONTRACT~1","BLK_EVENT_LOG" : "BLK_SPLIT_MAST_HDR~1","BLK_BA_CONT_DETAILS" : "BLK_SPLIT_MAST_DET_1~N","BLK_LFTB_CONT_ADDL_INT_DTL" : "BLK_SPLIT_PROD_INTCOM~1"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT","BLK_SPLIT_MAST_HDR","BLK_SPLIT_MAST_DET_1","BLK_TOTAL_SPLIT_AMT","BLK_SPLIT_PROD_INTCOM","BLK_SPLIT_INTRATE_FIX","BLK_EVENT_LOG","BLK_BA_CONT_DETAILS","BLK_LFTB_CONT_ADDL_INT_DTL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDREPRS.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDREPRS.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT__CONREFNO";
pkFields[0] = "BLK_CONTRACT__CONREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_SPLIT_MAST_DET_1":["MATURITYTYPE"],"BLK_SPLIT_MAST_HDR":["LIQUIDATEDEPOSIT","PAYMENTSCHPROCESSING"],"BLK_SPLIT_PROD_INTCOM":["RATE_ROUNDING_POSITION","RATE_ROUNDING_RULE","RATE_ROUNDING_UNIT"]};
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
var lovInfoFlds = {"BLK_CONTRACT__CONREFNO__LOV_CONTRACT":["BLK_CONTRACT__CONREFNO~BLK_CONTRACT__TXTUSERREFNO~BLK_SPLIT_MAST_HDR__TXTPRODUCT~BLK_SPLIT_MAST_HDR__COUNTERPARTY~BLK_SPLIT_MAST_HDR__CONTRACTCCY~BLK_CONTRACT__LATEVNSEQNO~BLK_SPLIT_MAST_HDR__PRINCIPALOS~BLK_SPLIT_MAST_HDR__TXTPRODUCTDESC~BLK_SPLIT_MAST_HDR__TXTCNTPRTDESC~","","N~N~N~N~N~N~N~N",""],"BLK_SPLIT_MAST_DET_1__PRODUCTCODE__LOV_PRODUCT":["BLK_SPLIT_MAST_DET_1__PRODUCTCODE~~","BLK_CONTRACT__CONREFNO!VARCHAR2","N~N",""],"BLK_SPLIT_PROD_INTCOM__RATECODE__LOV_RATE_CODE":["BLK_SPLIT_PROD_INTCOM__RATECODE~~","BLK_SPLIT_MAST_HDR__CONTRACTCCY!VARCHAR2~BLK_SPLIT_MAST_HDR__CONTRACTREFNO!VARCHAR2~BLK_SPLIT_PROD_INTCOM__RATETYPE!VARCHAR2~BLK_SPLIT_PROD_INTCOM__RATETYPE!VARCHAR2","N~N","N"],"BLK_BA_CONT_DETAILS__BROKER_PROD__LOV_BAPROD":["BLK_BA_CONT_DETAILS__BROKER_PROD~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_SPLIT_MAST_DET_1","BLK_BA_CONT_DETAILS");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_CONTRACT"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT.CONTRACT_REF_NO =OLTBS_CONTRACT__SETT.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDREPRS"]="KERNEL";
ArrPrntFunc["OLDREPRS"]="";
ArrPrntOrigin["OLDREPRS"]="";
ArrRoutingType["OLDREPRS"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDREPRS"]="N";
ArrCustomModified["OLDREPRS"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_RATE_FIXING":"CONREFNO~TXTUSERREFNO~TXTPRODUCT~TXTPRODUCTDESC~COUNTERPARTY~TXTCNTPRTDESC~SPLITVALUEDATE~CONTRACTCCY~SERIALNO~COMPONENT~INTRATECODE","CVS_INT_DTLS":"","OLCONDET":"CONREFNO~ESN"};
var scrArgSource = {"CVS_RATE_FIXING":"BLK_CONTRACT__CONREFNO~BLK_CONTRACT__TXTUSERREFNO~BLK_SPLIT_MAST_HDR__TXTPRODUCT~BLK_SPLIT_MAST_HDR__TXTPRODUCTDESC~BLK_SPLIT_MAST_HDR__COUNTERPARTY~BLK_SPLIT_MAST_HDR__TXTCNTPRTDESC~BLK_SPLIT_MAST_HDR__SPLITVALUEDATE~BLK_SPLIT_MAST_HDR__CONTRACTCCY~BLK_SPLIT_MAST_DET_1__SERIALNO~BLK_SPLIT_PROD_INTCOM__COMPONENT~BLK_SPLIT_PROD_INTCOM__RATECODE","CVS_INT_DTLS":"","OLCONDET":"BLK_CONTRACT__CONREFNO~BLK_CONTRACT__LATEVNSEQNO"};
var scrArgVals = {"CVS_RATE_FIXING":"TXTCONTREFNO~TXTUSERREFNO~TXTPRODUCT~TXTPRDESC~TXTCUSTOMER~TXTCUSTNAME~RESETVALUEDATE~TXTCURRENCY~SPLITNO~INTCOMPONENT~","CVS_INT_DTLS":"","OLCONDET":"~"};
var scrArgDest = {"CVS_RATE_FIXING":"BLK_SPLIT_INTRATE_FIX__TXTCONTREFNO~BLK_SPLIT_INTRATE_FIX__TXTUSRREFNO~BLK_SPLIT_INTRATE_FIX__TXTPRODUCT~BLK_SPLIT_INTRATE_FIX__TXTPRDESC~BLK_SPLIT_INTRATE_FIX__TXTCUSTOMER~BLK_SPLIT_INTRATE_FIX__TXTCUSTNAME~BLK_SPLIT_INTRATE_FIX__RESETVALUEDATE~BLK_SPLIT_INTRATE_FIX__TXTCURRENCY~BLK_SPLIT_INTRATE_FIX__SPLITNO~BLK_SPLIT_INTRATE_FIX__INTCOMPONENT~BLK_SPLIT_INTRATE_FIX__INTRATECODE","CVS_INT_DTLS":""};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":""};
var dpndntOnSrvs = {"OLCONDET":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------