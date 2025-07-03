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
**  File Name          : LPDCOMNT_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT":"CUSTOM_REF_NO~CONTRACT_REF_NO~TREASURY_SOURCE~PRODUCT_CODE~BRANCH~DEPARTMENT_CODE~USERREF_NO~LATEST_EVENT_SEQ_NO~VERNO~TXT_PRODUCT_DESC~TXT_OS_CCY~TXT_OS_BALANCE~TXT_REP_CCY~LATVERNO~ORGACTCOD~TXT_PMT_CONTRACT_REF_NO~TXT_PMT_USER_REF_NO~TXT_PMT_COUNTERPARTY~TXT_PMT_PRODUCT_CODE~TXT_PMT_PROD_DESC~TXT_PMT_CUST_DESC~TXT_TAX_CONTRACT_REF_NO~TXT_TAX_USER_REF_NO~TXT_TAX_PRODUCT_CODE~TXT_TAX_PRODUCT_DESC~TXT_TAX_PROD_TYPE_DESC~TXT_TAX_CUSTOMER~TXT_TAX_CUSTOMER_NAME~TXT_TAX_PRPSE_OF_SYNIDCATION~TXT_TAX_FACILITY_NAME~TXT_EVNT_CONT_REF_NO~TXT_EVNT_USER_REF_NO~TXT_EVNT_CUSTOMER","BLK_LPTBS_CONTRACT_MASTER":"CONTRACTREFNO~TXT_COUNTERPARTY_DESC~PAYMENT_METHOD~VALUE_DATE~PARTY_TRANCHE_REF_NO~AUTO_COLLECTION~PRODUCT_TYPE~AMENDMENT_DATE~ROUNDING_PARTICIPANT~BORROWER_FACILITY_REF_NO~BRANCH_CODE~USER_REF_NO~PRODUCTCODE~AUTO_DISBURSEMENT~COUNTERPARTY~BORROWER_CONTRACT_REF_NO~SETTLEMENT_SEQ_NO~EVENT_SEQ_NO~MATURITY_DATE~CURRENCY~PARTY_DRAWDOWN_NO~PARTY_FACILITY_REF_NO~REMARKS~BOOKING_DATE~BORROWER_TRANCHE_REF_NO~AMOUNT~TXT_CCY_DESC~TXT_REPORTING_AMOUNT~TXT_REPORTING_CCY~SUBSYSSTAT","BLK_OLTBS_CONTRACT_EVENT_LOG":"CHECKERDTST~AUTHSTAT~CHECKERID~TXNSTAT~MAKERID~MAKERDTST","BLK_SCHEDULE_SUMMARY":"CONTREFNO~DUE_DATE~TOTAL_PAY_RECV_AMOUNT~TXT_DIS_AMOUNT_DUE~TXT_DIS_AMOUNT_SETTLED~TXT_DIS_ADJUSTED_AMOUNT~TXT_DIS_PAY_RECV_AMOUNT~TXT_EXPECTED_BALANCE","BLK_LSTBS_CONTRACT_TAX_DETAILS":"TAX_RULE~CONTRACT_REF_NO2~VERSION_NO2~PARTICIPANT","BLK_CONTRACT_TAX_MASTER":"CONTRACT_REF_NO~CUSTOMER~TAX_RULE~BASIS_AMOUNT_TAG~RECALC_REQD~RECALC_START_DATE~LAST_CHANGE_TIME_STAMP","BLK_CONTRACT_TAX_DETAILS":"TAX_CCY~TAX_AMOUNT~VALUEDATE","BLK_LBVWS_PARTY_SUMMARY":"CUSTOMERNAME~CONTRACT_REF_NO~BRANCH~MODULE_CODE~PRODUCT~AUTH_STATUS~CONTRACT_STATUS~COUNTERPARTY~AMOUNT~CURRENCY~BORROWER_CONTRACT_REF_NO~BORROWER_TRANCHE_REF_NO~PRODUCT_TYPE~PARTY_TRANCHE_REF_NO~PARTY_DRAWDOWN_NO~DEPARTMENT_CODE~TREASURY_SOURCE~SHORT_NAME~VALUE_DATE~MATURITY_DATE~BORR_FCLT_REF_NO~PARTICIPANTNAME","BLK_LPTMS_PARTICIPANT_ENTITIES":"CONTRACT_REF_NO~ENTITY~VERSION_NO~PRIMARY~CUSTOMER_NO~TXT_ENTITY_DESC","BLK_PAYBYDT_SCHEDULE_SUMMARY":"CONTREFNO~PAYBYDT~CCY~TOTAL_PAY_RECV_AMOUNT~TXT_DIS_AMOUNT_DUE~TXT_DIS_AMOUNT_SETTLED~TXT_DIS_ADJUSTED_AMOUNT~TXT_DIS_PAY_RECV_AMOUNT~TXT_EXPECTED_BALANCE","BLK_SCHEDULE_DETAILS":"COMPONENT~CCY~DUEDATE~CONTRNO~PAY_RECV_AMOUNT~AMOUNT_DUE~ADJUSTED_AMOUNT~AMOUNT_SETTLED~TXT_EXP_BAL~PAYBYDT~INFLOW_OUTFLOW~CURRENCY_AMT_DUE","BLK_AMOUNT_SETTLED":"CONTRACT_REF_NO1~DUE_DATE1~CCY~PAID_DATE~AMOUNTSETTLED~TXT_INPUT_DATE~LCY_CCY~TXT_LCY_EQUIVALENT"};

var multipleEntryPageSize = {"BLK_PAYBYDT_SCHEDULE_SUMMARY" :"15" ,"BLK_CONTRACT_TAX_DETAILS" :"15" ,"BLK_SCHEDULE_DETAILS" :"15" ,"BLK_AMOUNT_SETTLED" :"15" ,"BLK_LPTMS_PARTICIPANT_ENTITIES" :"15" ,"BLK_CONTRACT_TAX_MASTER" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_SCHD_SMRY__TAB_MAIN":"BLK_PAYBYDT_SCHEDULE_SUMMARY~BLK_SCHEDULE_DETAILS~BLK_AMOUNT_SETTLED","CVS_TAX__TAB_MAIN":"BLK_CONTRACT_TAX_DETAILS~BLK_CONTRACT_TAX_MASTER","CVS_ENTITY__TAB_MAIN":"BLK_LPTMS_PARTICIPANT_ENTITIES"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">CUSTOM_REF_NO~CONTRACT_REF_NO~TREASURY_SOURCE~PRODUCT_CODE~BRANCH~DEPARTMENT_CODE~USERREF_NO~LATEST_EVENT_SEQ_NO~VERNO~TXT_PRODUCT_DESC~TXT_OS_CCY~TXT_OS_BALANCE~TXT_REP_CCY~LATVERNO~ORGACTCOD~TXT_PMT_CONTRACT_REF_NO~TXT_PMT_USER_REF_NO~TXT_PMT_COUNTERPARTY~TXT_PMT_PRODUCT_CODE~TXT_PMT_PROD_DESC~TXT_PMT_CUST_DESC~TXT_TAX_CONTRACT_REF_NO~TXT_TAX_USER_REF_NO~TXT_TAX_PRODUCT_CODE~TXT_TAX_PRODUCT_DESC~TXT_TAX_PROD_TYPE_DESC~TXT_TAX_CUSTOMER~TXT_TAX_CUSTOMER_NAME~TXT_TAX_PRPSE_OF_SYNIDCATION~TXT_TAX_FACILITY_NAME~TXT_EVNT_CONT_REF_NO~TXT_EVNT_USER_REF_NO~TXT_EVNT_CUSTOMER</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_LPTBS_CONTRACT_MASTER">CONTRACTREFNO~TXT_COUNTERPARTY_DESC~PAYMENT_METHOD~VALUE_DATE~PARTY_TRANCHE_REF_NO~AUTO_COLLECTION~PRODUCT_TYPE~AMENDMENT_DATE~ROUNDING_PARTICIPANT~BORROWER_FACILITY_REF_NO~BRANCH_CODE~USER_REF_NO~PRODUCTCODE~AUTO_DISBURSEMENT~COUNTERPARTY~BORROWER_CONTRACT_REF_NO~SETTLEMENT_SEQ_NO~EVENT_SEQ_NO~MATURITY_DATE~CURRENCY~PARTY_DRAWDOWN_NO~PARTY_FACILITY_REF_NO~REMARKS~BOOKING_DATE~BORROWER_TRANCHE_REF_NO~AMOUNT~TXT_CCY_DESC~TXT_REPORTING_AMOUNT~TXT_REPORTING_CCY~SUBSYSSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">CHECKERDTST~AUTHSTAT~CHECKERID~TXNSTAT~MAKERID~MAKERDTST</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="N" TYPE="BLK_SCHEDULE_SUMMARY">CONTREFNO~DUE_DATE~TOTAL_PAY_RECV_AMOUNT~TXT_DIS_AMOUNT_DUE~TXT_DIS_AMOUNT_SETTLED~TXT_DIS_ADJUSTED_AMOUNT~TXT_DIS_PAY_RECV_AMOUNT~TXT_EXPECTED_BALANCE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="N" TYPE="BLK_LSTBS_CONTRACT_TAX_DETAILS">TAX_RULE~CONTRACT_REF_NO2~VERSION_NO2~PARTICIPANT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="N" TYPE="BLK_CONTRACT_TAX_MASTER">CONTRACT_REF_NO~CUSTOMER~TAX_RULE~BASIS_AMOUNT_TAG~RECALC_REQD~RECALC_START_DATE~LAST_CHANGE_TIME_STAMP</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_TAX_MASTER" RELATION_TYPE="N" TYPE="BLK_CONTRACT_TAX_DETAILS">TAX_CCY~TAX_AMOUNT~VALUEDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_LBVWS_PARTY_SUMMARY">CUSTOMERNAME~CONTRACT_REF_NO~BRANCH~MODULE_CODE~PRODUCT~AUTH_STATUS~CONTRACT_STATUS~COUNTERPARTY~AMOUNT~CURRENCY~BORROWER_CONTRACT_REF_NO~BORROWER_TRANCHE_REF_NO~PRODUCT_TYPE~PARTY_TRANCHE_REF_NO~PARTY_DRAWDOWN_NO~DEPARTMENT_CODE~TREASURY_SOURCE~SHORT_NAME~VALUE_DATE~MATURITY_DATE~BORR_FCLT_REF_NO~PARTICIPANTNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="N" TYPE="BLK_LPTMS_PARTICIPANT_ENTITIES">CONTRACT_REF_NO~ENTITY~VERSION_NO~PRIMARY~CUSTOMER_NO~TXT_ENTITY_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="N" TYPE="BLK_PAYBYDT_SCHEDULE_SUMMARY">CONTREFNO~PAYBYDT~CCY~TOTAL_PAY_RECV_AMOUNT~TXT_DIS_AMOUNT_DUE~TXT_DIS_AMOUNT_SETTLED~TXT_DIS_ADJUSTED_AMOUNT~TXT_DIS_PAY_RECV_AMOUNT~TXT_EXPECTED_BALANCE</FN>'; 
msgxml += '      <FN PARENT="BLK_PAYBYDT_SCHEDULE_SUMMARY" RELATION_TYPE="N" TYPE="BLK_SCHEDULE_DETAILS">COMPONENT~CCY~DUEDATE~CONTRNO~PAY_RECV_AMOUNT~AMOUNT_DUE~ADJUSTED_AMOUNT~AMOUNT_SETTLED~TXT_EXP_BAL~PAYBYDT~INFLOW_OUTFLOW~CURRENCY_AMT_DUE</FN>'; 
msgxml += '      <FN PARENT="BLK_SCHEDULE_DETAILS" RELATION_TYPE="N" TYPE="BLK_AMOUNT_SETTLED">CONTRACT_REF_NO1~DUE_DATE1~CCY~PAID_DATE~AMOUNTSETTLED~TXT_INPUT_DATE~LCY_CCY~TXT_LCY_EQUIVALENT</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_LBVWS_PARTY_SUMMARY">CONTRACT_REF_NO~PARTY_TRANCHE_REF_NO~PARTY_DRAWDOWN_NO~BORROWER_CONTRACT_REF_NO~BORROWER_TRANCHE_REF_NO~BORR_FCLT_REF_NO~BRANCH~PRODUCT~AUTH_STATUS~CONTRACT_STATUS~COUNTERPARTY~PARTICIPANTNAME~CURRENCY~PRODUCT_TYPE~VALUE_DATE~MATURITY_DATE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LPDCOMNT";
var defaultWhereClause = "MODULE_CODE='LP' AND BRANCH=GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="MODULE_CODE='LP'";
var g_SummaryType ="S";
var g_SummaryBtnCount =4;
var g_SummaryBlock ="BLK_LBVWS_PARTY_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT" : "","BLK_LPTBS_CONTRACT_MASTER" : "BLK_OLTBS_CONTRACT~1","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_OLTBS_CONTRACT~1","BLK_SCHEDULE_SUMMARY" : "BLK_OLTBS_CONTRACT~N","BLK_LSTBS_CONTRACT_TAX_DETAILS" : "BLK_OLTBS_CONTRACT~N","BLK_CONTRACT_TAX_MASTER" : "BLK_OLTBS_CONTRACT~N","BLK_CONTRACT_TAX_DETAILS" : "BLK_CONTRACT_TAX_MASTER~N","BLK_LBVWS_PARTY_SUMMARY" : "BLK_OLTBS_CONTRACT~1","BLK_LPTMS_PARTICIPANT_ENTITIES" : "BLK_OLTBS_CONTRACT~N","BLK_PAYBYDT_SCHEDULE_SUMMARY" : "BLK_OLTBS_CONTRACT~N","BLK_SCHEDULE_DETAILS" : "BLK_PAYBYDT_SCHEDULE_SUMMARY~N","BLK_AMOUNT_SETTLED" : "BLK_SCHEDULE_DETAILS~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT","BLK_LPTBS_CONTRACT_MASTER","BLK_OLTBS_CONTRACT_EVENT_LOG","BLK_SCHEDULE_SUMMARY","BLK_LSTBS_CONTRACT_TAX_DETAILS","BLK_CONTRACT_TAX_MASTER","BLK_CONTRACT_TAX_DETAILS","BLK_LBVWS_PARTY_SUMMARY","BLK_LPTMS_PARTICIPANT_ENTITIES","BLK_PAYBYDT_SCHEDULE_SUMMARY","BLK_SCHEDULE_DETAILS","BLK_AMOUNT_SETTLED"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LPDCOMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LPDCOMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__CONTRACT_REF_NO";
pkFields[0] = "BLK_OLTBS_CONTRACT__CONTRACT_REF_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LPTBS_CONTRACT_MASTER":["AUTO_COLLECTION","AUTO_DISBURSEMENT","REMARKS"]};
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
var lovInfoFlds = {"BLK_LPTMS_PARTICIPANT_ENTITIES__ENTITY__LOV_ENTITY":["BLK_LPTMS_PARTICIPANT_ENTITIES__ENTITY~BLK_LPTMS_PARTICIPANT_ENTITIES__TXT_ENTITY_DESC~~","BLK_LPTMS_PARTICIPANT_ENTITIES__CUSTOMER_NO!VARCHAR2~BLK_LPTMS_PARTICIPANT_ENTITIES__CONTRACT_REF_NO!VARCHAR2~BLK_LPTMS_PARTICIPANT_ENTITIES__CUSTOMER_NO!VARCHAR2","N~N~N","N"],"BLK_LBVWS_PARTY_SUMMARY__COUNTERPARTY__LOV_COUNTERPARTY_S":["BLK_LBVWS_PARTY_SUMMARY__COUNTERPARTY~BLK_LBVWS_PARTY_SUMMARY__PARTICIPANTNAME~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_PAYBYDT_SCHEDULE_SUMMARY","BLK_CONTRACT_TAX_DETAILS","BLK_SCHEDULE_DETAILS","BLK_AMOUNT_SETTLED","BLK_LPTMS_PARTICIPANT_ENTITIES","BLK_CONTRACT_TAX_MASTER");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_OLTBS_CONTRACT","OLCTRMIS~BLK_OLTBS_CONTRACT","OLCTRUDF~BLK_OLTBS_CONTRACT","LBCENTTY~BLK_OLTBS_CONTRACT","LBCONDET~BLK_OLTBS_CONTRACT","LPCPRHIS~BLK_OLTBS_CONTRACT"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT.CONTRACT_REF_NO=OLTBS_CONTRACT__SETT.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO=OLTBS_CONTRACT__MIS.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = OLTBS_CONTRACT__FLD.CONTRACT_REF_NO AND OLTBS_CONTRACT.LATEST_VERSION_NO = OLTBS_CONTRACT__FLD.LATEST_VERSION_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = OLTBS_CONTRACT__CENNTY.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO=OLTBS_CONTRACT__OCRT.CONTRACT_REF_NO AND OLTBS_CONTRACT.LATEST_VERSION_NO = OLTBS_CONTRACT__OCRT.LATEST_VERSION_NO","OLTBS_CONTRACT.CONTRACT_REF_NO=LFTB_CONTRACT_INTEREST_MASTER.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1","1","1","1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LPDCOMNT"]="KERNEL";
ArrPrntFunc["LPDCOMNT"]="";
ArrPrntOrigin["LPDCOMNT"]="";
ArrRoutingType["LPDCOMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LPDCOMNT"]="N";
ArrCustomModified["LPDCOMNT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_TAX":"TAX_CONT_REF~USERREF_NO~PRODUCT_CODE~COUNTERPARTY~TXT_COUNTERPARTY_DESC~TAX_PRODDESC","CVS_SCHD_SMRY":"PMNT_CONTREF_NO~PMNT_USERREFNO~PMNT_CNTRPRTY~PMNT_PRODCODE~PMNT_PRODDESC~PMNT_CUSTDESC","OLCONDET":"CONREFNO~ESN","OLCTRMIS":"CONTREF~ESN~PRDCD~BRNCD","OLCTRUDF":"CONTREFNO~LATVERNO","LBCENTTY":"CONTRACTREFNO~VERSIONNO","LBCONDET":"CONTRACT_REF_NO~LATEST_VERSION_NO","LPCPRHIS":"CONTRACT_REF_NO~COMPONENT","OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"CVS_TAX":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__USERREF_NO~BLK_OLTBS_CONTRACT__PRODUCT_CODE~BLK_LPTBS_CONTRACT_MASTER__COUNTERPARTY~BLK_LPTBS_CONTRACT_MASTER__TXT_COUNTERPARTY_DESC~BLK_OLTBS_CONTRACT__TXT_PRODUCT_DESC","CVS_SCHD_SMRY":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__USERREF_NO~BLK_LPTBS_CONTRACT_MASTER__COUNTERPARTY~BLK_OLTBS_CONTRACT__PRODUCT_CODE~BLK_OLTBS_CONTRACT__TXT_PRODUCT_DESC~BLK_LPTBS_CONTRACT_MASTER__TXT_COUNTERPARTY_DESC","OLCONDET":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__LATEST_EVENT_SEQ_NO","OLCTRMIS":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__LATEST_EVENT_SEQ_NO~BLK_OLTBS_CONTRACT__PRODUCT_CODE~BLK_OLTBS_CONTRACT__BRANCH","OLCTRUDF":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__LATVERNO","LBCENTTY":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__LATVERNO","LBCONDET":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__LATVERNO","LPCPRHIS":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~","OLDEVENT":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~"};
var scrArgVals = {"CVS_TAX":"~~~~~","CVS_SCHD_SMRY":"~~~~~","OLCONDET":"~","OLCTRMIS":"~~~","OLCTRUDF":"~","LBCENTTY":"~","LBCONDET":"~","LPCPRHIS":"~","OLDEVENT":"~EXECUTEQUERY"};
var scrArgDest = {"CVS_TAX":"BLK_OLTBS_CONTRACT__TXT_TAX_CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__TXT_TAX_USER_REF_NO~BLK_OLTBS_CONTRACT__TXT_TAX_PRODUCT_CODE~BLK_OLTBS_CONTRACT__TXT_TAX_CUSTOMER~BLK_OLTBS_CONTRACT__TXT_TAX_CUSTOMER_NAME~BLK_OLTBS_CONTRACT__TXT_TAX_PRODUCT_DESC","CVS_SCHD_SMRY":"BLK_OLTBS_CONTRACT__TXT_PMT_CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__TXT_PMT_USER_REF_NO~BLK_OLTBS_CONTRACT__TXT_PMT_COUNTERPARTY~BLK_OLTBS_CONTRACT__TXT_PMT_PRODUCT_CODE~BLK_OLTBS_CONTRACT__TXT_PMT_PROD_DESC~BLK_OLTBS_CONTRACT__TXT_TAX_CUSTOMER_NAME"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":"","OLCTRMIS":"","OLCTRUDF":"","LBCENTTY":"","LBCONDET":"","LPCPRHIS":""};
var dpndntOnSrvs = {"OLCONDET":"","OLCTRMIS":"","OLCTRUDF":"","LBCENTTY":"","LBCONDET":"","LPCPRHIS":""};
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