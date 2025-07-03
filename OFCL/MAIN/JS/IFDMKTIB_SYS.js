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
**  File Name          : IFDMKTIB_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_LS_MARKIT_MASTER":"BRANCH~MESSAGE_SEQ_NO~MESSAGE_REF_NO~AGENT_MEI~DD_MARKIT_CONTRACT_ID~PARTICIPANT_MEI~MESSAGE_ID~MESSAGE_NAME~PROCESSING_STATUS~EXTERNAL_CUSIP_NO~DEPARTMENT_CODE~RECEIVE_DATE~PROCESSING_DATE~ACTIVITY_SEQ_NO~CONTRACT_REF_NO~EVENT_SEQ_NO~MARKIT_CONTRACT_ID~TRANCHE_REF_NO~FACILITY_NAME~TRANCHE_CCY~TRANCHE_TYPE~TRANCHE_GLOBAL_AMT~TRANCHE_AMT~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~RECORD_STAT~AUTH_STAT~ONCE_AUTH~MOD_NO","BLK_OLTBS_LS_MARKIT_DRAWDOWN":"PRODUCT_CODE~MATURITY_DATE~LC_TYPE~CURRENCY~BORROWER_MEI~VALUE_DATE~GLOBAL_AMOUNT~BORROWER~AMOUNT","BLK_OLTBS_LS_MARKIT_INT_RATE":"RATE~FLOATING_RATE_INDEX~PERIOD~ALL_IN_RATE~END_DATE~START_DATE~RATE_FIXING_DATE~PERIOD_MULTIPLIER~MARGIN~INTEREST_DAY_BASIS","BLK_OLTBS_LS_MARKIT_EX_RATE":"RATE_FIXING_DATE~START_DATE~END_DATE~EXCHANGE_RATE","BLK_OLTBS_LS_MARKIT_EXCEPTION":"ERROR_SEQ_NO~ERROR_CODE~ERROR_PARAM","BLK_OLTBS_LS_MARKIT_INT_PYMT":"AMOUNT~PAYMENT_DATE","BLK_OLTBS_LS_MARKIT_PRIN_PYMT":"AMOUNT~PAYMENT_DATE","BLK_OLTBS_LS_MARKIT_FEE_PAYMENT":"FEE_TYPE~PAYMENT_DATE~AMOUNT~FEE_COMPOMENT","BLK_OLTBS_LS_MARKIT_FEE":"FEE_TYPE~RATE~EFFECTIVE_DATE~FEE_COMP","BLK_OLTBS_LS_MARKIT_MARGIN":"EFFECTIVE_DATE~MARKIT_CONTRACT_ID~RATE~CONTRACT_REF_NO","BLK_OLTBS_LS_MARKIT_DD_RENEWAL":"MARKIT_CONTRACT_ID~EVENT_SEQ_NO~PRINCIPAL_AMOUNT~PAYMENT_DATE~CONTRACT_REF_NO~INTEREST_AMOUNT~CURRENCY~MATURITY_DATE~CONSOLE_REF_NO","BLK_OLTBS_LS_MRKT_DD_CHLD":"PRODUCT_CODE~MATURITY_DATE~MARKIT_CONTRACT_ID~CURRENCY~CONTRACT_REF_NO~GLOBAL_AMOUNT~AMOUNT","BLK_OLTBS_LS_MKT_INT_RT_CHD":"RATE~FLOATING_RATE_INDEX~ALL_IN_RATE~END_DATE~START_DATE~RATE_FIXING_DATE~MARGIN~INTEREST_DAY_BASIS","BLK_OLTBS_LS_MRKT_EX_RT_CHD":"RATE_FIXING_DATE~START_DATE~END_DATE~EXCHANGE_RATE"};

var multipleEntryPageSize = {"BLK_OLTBS_LS_MARKIT_INT_RATE" :"15" ,"BLK_OLTBS_LS_MARKIT_EX_RATE" :"15" ,"BLK_OLTBS_LS_MARKIT_EXCEPTION" :"15" ,"BLK_OLTBS_LS_MARKIT_INT_PYMT" :"15" ,"BLK_OLTBS_LS_MARKIT_PRIN_PYMT" :"15" ,"BLK_OLTBS_LS_MARKIT_FEE_PAYMENT" :"15" ,"BLK_OLTBS_LS_MARKIT_FEE" :"15" ,"BLK_OLTBS_LS_MARKIT_MARGIN" :"15" ,"BLK_OLTBS_LS_MARKIT_DD_RENEWAL" :"15" ,"BLK_OLTBS_LS_MRKT_DD_CHLD" :"15" ,"BLK_OLTBS_LS_MKT_INT_RT_CHD" :"15" ,"BLK_OLTBS_LS_MRKT_EX_RT_CHD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLTBS_LS_MARKIT_INT_RATE~BLK_OLTBS_LS_MARKIT_EX_RATE","CVS_MAIN__TAB_EXCEPTIONS":"BLK_OLTBS_LS_MARKIT_EXCEPTION","CVS_MAIN__TAB_PAYMENT":"BLK_OLTBS_LS_MARKIT_INT_PYMT~BLK_OLTBS_LS_MARKIT_PRIN_PYMT","CVS_MAIN__TAB_FEE_PMNT":"BLK_OLTBS_LS_MARKIT_FEE_PAYMENT","CVS_MAIN__TAB_FEE_DET":"BLK_OLTBS_LS_MARKIT_FEE~BLK_OLTBS_LS_MARKIT_MARGIN","CVS_MAIN__TAB_RENEWAL":"BLK_OLTBS_LS_MARKIT_DD_RENEWAL~BLK_OLTBS_LS_MRKT_DD_CHLD~BLK_OLTBS_LS_MKT_INT_RT_CHD~BLK_OLTBS_LS_MRKT_EX_RT_CHD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_LS_MARKIT_MASTER">BRANCH~MESSAGE_SEQ_NO~MESSAGE_REF_NO~AGENT_MEI~DD_MARKIT_CONTRACT_ID~PARTICIPANT_MEI~MESSAGE_ID~MESSAGE_NAME~PROCESSING_STATUS~EXTERNAL_CUSIP_NO~DEPARTMENT_CODE~RECEIVE_DATE~PROCESSING_DATE~ACTIVITY_SEQ_NO~CONTRACT_REF_NO~EVENT_SEQ_NO~MARKIT_CONTRACT_ID~TRANCHE_REF_NO~FACILITY_NAME~TRANCHE_CCY~TRANCHE_TYPE~TRANCHE_GLOBAL_AMT~TRANCHE_AMT~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~RECORD_STAT~AUTH_STAT~ONCE_AUTH~MOD_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="1" TYPE="BLK_OLTBS_LS_MARKIT_DRAWDOWN">PRODUCT_CODE~MATURITY_DATE~LC_TYPE~CURRENCY~BORROWER_MEI~VALUE_DATE~GLOBAL_AMOUNT~BORROWER~AMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_INT_RATE">RATE~FLOATING_RATE_INDEX~PERIOD~ALL_IN_RATE~END_DATE~START_DATE~RATE_FIXING_DATE~PERIOD_MULTIPLIER~MARGIN~INTEREST_DAY_BASIS</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_EX_RATE">RATE_FIXING_DATE~START_DATE~END_DATE~EXCHANGE_RATE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_EXCEPTION">ERROR_SEQ_NO~ERROR_CODE~ERROR_PARAM</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_INT_PYMT">AMOUNT~PAYMENT_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_PRIN_PYMT">AMOUNT~PAYMENT_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_FEE_PAYMENT">FEE_TYPE~PAYMENT_DATE~AMOUNT~FEE_COMPOMENT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_FEE">FEE_TYPE~RATE~EFFECTIVE_DATE~FEE_COMP</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_MARGIN">EFFECTIVE_DATE~MARKIT_CONTRACT_ID~RATE~CONTRACT_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MARKIT_DD_RENEWAL">MARKIT_CONTRACT_ID~EVENT_SEQ_NO~PRINCIPAL_AMOUNT~PAYMENT_DATE~CONTRACT_REF_NO~INTEREST_AMOUNT~CURRENCY~MATURITY_DATE~CONSOLE_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LS_MARKIT_DD_RENEWAL" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MRKT_DD_CHLD">PRODUCT_CODE~MATURITY_DATE~MARKIT_CONTRACT_ID~CURRENCY~CONTRACT_REF_NO~GLOBAL_AMOUNT~AMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LS_MRKT_DD_CHLD" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MKT_INT_RT_CHD">RATE~FLOATING_RATE_INDEX~ALL_IN_RATE~END_DATE~START_DATE~RATE_FIXING_DATE~MARGIN~INTEREST_DAY_BASIS</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LS_MRKT_DD_CHLD" RELATION_TYPE="N" TYPE="BLK_OLTBS_LS_MRKT_EX_RT_CHD">RATE_FIXING_DATE~START_DATE~END_DATE~EXCHANGE_RATE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_LS_MARKIT_MASTER">MESSAGE_ID~MESSAGE_SEQ_NO~MESSAGE_NAME~EXTERNAL_CUSIP_NO~MESSAGE_REF_NO~RECEIVE_DATE~ACTIVITY_SEQ_NO~PROCESSING_DATE~PROCESSING_STATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "IFDMKTIB";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="B";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTBS_LS_MARKIT_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_LS_MARKIT_MASTER" : "","BLK_OLTBS_LS_MARKIT_DRAWDOWN" : "BLK_OLTBS_LS_MARKIT_MASTER~1","BLK_OLTBS_LS_MARKIT_INT_RATE" : "BLK_OLTBS_LS_MARKIT_MASTER~N","BLK_OLTBS_LS_MARKIT_EX_RATE" : "BLK_OLTBS_LS_MARKIT_MASTER~N","BLK_OLTBS_LS_MARKIT_EXCEPTION" : "BLK_OLTBS_LS_MARKIT_MASTER~N","BLK_OLTBS_LS_MARKIT_INT_PYMT" : "BLK_OLTBS_LS_MARKIT_MASTER~N","BLK_OLTBS_LS_MARKIT_PRIN_PYMT" : "BLK_OLTBS_LS_MARKIT_MASTER~N","BLK_OLTBS_LS_MARKIT_FEE_PAYMENT" : "BLK_OLTBS_LS_MARKIT_MASTER~N","BLK_OLTBS_LS_MARKIT_FEE" : "BLK_OLTBS_LS_MARKIT_MASTER~N","BLK_OLTBS_LS_MARKIT_MARGIN" : "BLK_OLTBS_LS_MARKIT_MASTER~N","BLK_OLTBS_LS_MARKIT_DD_RENEWAL" : "BLK_OLTBS_LS_MARKIT_MASTER~N","BLK_OLTBS_LS_MRKT_DD_CHLD" : "BLK_OLTBS_LS_MARKIT_DD_RENEWAL~N","BLK_OLTBS_LS_MKT_INT_RT_CHD" : "BLK_OLTBS_LS_MRKT_DD_CHLD~N","BLK_OLTBS_LS_MRKT_EX_RT_CHD" : "BLK_OLTBS_LS_MRKT_DD_CHLD~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_LS_MARKIT_MASTER","BLK_OLTBS_LS_MARKIT_DRAWDOWN","BLK_OLTBS_LS_MARKIT_INT_RATE","BLK_OLTBS_LS_MARKIT_EX_RATE","BLK_OLTBS_LS_MARKIT_EXCEPTION","BLK_OLTBS_LS_MARKIT_INT_PYMT","BLK_OLTBS_LS_MARKIT_PRIN_PYMT","BLK_OLTBS_LS_MARKIT_FEE_PAYMENT","BLK_OLTBS_LS_MARKIT_FEE","BLK_OLTBS_LS_MARKIT_MARGIN","BLK_OLTBS_LS_MARKIT_DD_RENEWAL","BLK_OLTBS_LS_MRKT_DD_CHLD","BLK_OLTBS_LS_MKT_INT_RT_CHD","BLK_OLTBS_LS_MRKT_EX_RT_CHD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside IFDMKTIB.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside IFDMKTIB.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_LS_MARKIT_MASTER__MESSAGE_SEQ_NO";
pkFields[0] = "BLK_OLTBS_LS_MARKIT_MASTER__MESSAGE_SEQ_NO";
queryFields[1] = "BLK_OLTBS_LS_MARKIT_MASTER__MESSAGE_ID";
pkFields[1] = "BLK_OLTBS_LS_MARKIT_MASTER__MESSAGE_ID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTBS_LS_MARKIT_DD_RENEWAL":["INTEREST_AMOUNT","PAYMENT_DATEI","PRINCIPAL_AMOUNT"],"BLK_OLTBS_LS_MARKIT_DRAWDOWN":["AMOUNT","BORROWER","BORROWER_MEI","CURRENCY","MATURITY_DATEI","PRODUCT_CODE","VALUE_DATEI"],"BLK_OLTBS_LS_MARKIT_EX_RATE":["END_DATEI","EXCHANGE_RATE"],"BLK_OLTBS_LS_MARKIT_FEE_PAYMENT":["AMOUNT","PAYMENT_DATEI"],"BLK_OLTBS_LS_MARKIT_FEE":["EFFECTIVE_DATEI","RATE"],"BLK_OLTBS_LS_MARKIT_INT_PYMT":["AMOUNT","PAYMENT_DATEI"],"BLK_OLTBS_LS_MARKIT_INT_RATE":["END_DATEI","INTEREST_DAY_BASIS","MARGIN","RATE"],"BLK_OLTBS_LS_MARKIT_MARGIN":["EFFECTIVE_DATEI","RATE"],"BLK_OLTBS_LS_MARKIT_MASTER":["PROCESSING_STATUS"],"BLK_OLTBS_LS_MARKIT_PRIN_PYMT":["AMOUNT","PAYMENT_DATEI"],"BLK_OLTBS_LS_MKT_INT_RT_CHD":["END_DATEI","INTEREST_DAY_BASIS","MARGIN","RATE","START_DATEI"],"BLK_OLTBS_LS_MRKT_DD_CHLD":["AMOUNT","MATURITY_DATEI","PRODUCT_CODE"],"BLK_OLTBS_LS_MRKT_EX_RT_CHD":["END_DATEI","EXCHANGE_RATE","START_DATEI"]};
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
var lovInfoFlds = {"BLK_OLTBS_LS_MARKIT_DRAWDOWN__PRODUCT_CODE__LOV_PRODUCT":["BLK_OLTBS_LS_MARKIT_DRAWDOWN__PRODUCT_CODE~","BLK_OLTBS_LS_MARKIT_MASTER__TRANCHE_REF_NO!~BLK_OLTBS_LS_MARKIT_MASTER__TRANCHE_REF_NO!","N",""],"BLK_OLTBS_LS_MARKIT_DRAWDOWN__CURRENCY__LOV_DD_CCY":["BLK_OLTBS_LS_MARKIT_DRAWDOWN__CURRENCY~","BLK_OLTBS_LS_MARKIT_MASTER__TRANCHE_REF_NO!~BLK_OLTBS_LS_MARKIT_MASTER__TRANCHE_REF_NO!","N",""],"BLK_OLTBS_LS_MARKIT_DRAWDOWN__BORROWER_MEI__LOV_BORROWER_MEI":["BLK_OLTBS_LS_MARKIT_DRAWDOWN__BORROWER_MEI~BLK_OLTBS_LS_MARKIT_DRAWDOWN__BORROWER~","BLK_OLTBS_LS_MARKIT_MASTER__TRANCHE_REF_NO!~BLK_OLTBS_LS_MARKIT_MASTER__TRANCHE_REF_NO!","N~N",""],"BLK_OLTBS_LS_MARKIT_DRAWDOWN__BORROWER__LOV_BORROWER":["BLK_OLTBS_LS_MARKIT_DRAWDOWN__BORROWER~BLK_OLTBS_LS_MARKIT_DRAWDOWN__BORROWER_MEI~","__!~__!","N~N",""],"BLK_OLTBS_LS_MARKIT_MASTER__MESSAGE_ID__LOV_MESSAGE_ID_S":["BLK_OLTBS_LS_MARKIT_MASTER__MESSAGE_ID~~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTBS_LS_MARKIT_INT_RATE","BLK_OLTBS_LS_MARKIT_EX_RATE","BLK_OLTBS_LS_MARKIT_EXCEPTION","BLK_OLTBS_LS_MARKIT_INT_PYMT","BLK_OLTBS_LS_MARKIT_PRIN_PYMT","BLK_OLTBS_LS_MARKIT_FEE_PAYMENT","BLK_OLTBS_LS_MARKIT_FEE","BLK_OLTBS_LS_MARKIT_MARGIN","BLK_OLTBS_LS_MARKIT_DD_RENEWAL","BLK_OLTBS_LS_MRKT_DD_CHLD","BLK_OLTBS_LS_MKT_INT_RT_CHD","BLK_OLTBS_LS_MRKT_EX_RT_CHD");
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

ArrFuncOrigin["IFDMKTIB"]="KERNEL";
ArrPrntFunc["IFDMKTIB"]="";
ArrPrntOrigin["IFDMKTIB"]="";
ArrRoutingType["IFDMKTIB"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["IFDMKTIB"]="N";
ArrCustomModified["IFDMKTIB"]="N";

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