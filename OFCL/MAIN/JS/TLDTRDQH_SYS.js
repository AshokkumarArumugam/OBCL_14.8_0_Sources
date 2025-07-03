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
**  File Name          : TLDTRDQH_SYS.js
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
var fieldNameArray = {"BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST":"EXTERNAL_CUSIP_NO~MARKIT_TRADE_ID~ACTUAL_SETTL_DATE~AUTH_STAT~BUYER~BUY_SELL~CHECKER_DT_STAMP~CHECKER_ID~COMMITMENT_REDUCTION_AMOUNT~CONFIRMATION_STATUS~CREATION_TIMESTAMP~DEAL_TYPE~EXPT_SETTL_DATE~EXT_BUYER~EXT_COMMITMENT_REDUCTION_AMT~EXT_SELLER~LQT_TICKET_ID~MAKER_DT_STAMP~MAKER_ID~MARKIT_ALLOCATION_ID~MARKIT_MESSAGE_ID~MARKIT_TRADE_STATUS~MATCH_STATUS~MESG_PROCESSING_STATUS~MESSAGE_ID~MOD_NO~ONCE_AUTH~ORIGINAL_TRADE_AMOUNT~PROCESS_SETTLEMENT~RECORD_STAT~SELLER~SETTLEMENT_STATUS~SUPPRESS_FUNDING_MEMO~SUPPRESS_PAYMENT_MESG~TRADE_AMOUNT~TRADE_CCY~TRADE_DATE~TRADE_PRICE~TRADE_REF_NO~TRANCHE_REF_NO~FACILITY_NAME~BUYER_NAME~SELLER_NAME~EXPENSE_CODE~BRANCH_CODE~DESK_CODE~CUSIP_NO~TRADE_TYPE~FLEXCUBE_TRADE_STATUS~FMEMO_STATUS~PRM_BUY_SELL~PRM_FC_SELLER~PRM_FC_BUYER","BLK_TLVWS_TRADE_CUSTOMER":"CONTRACT_REF_NO~CUSTOMER_NO~MNEMONIC_FOR~VERSION_NO~CUSTOMER_NAME","BLK_TLTBS_CONTRACT_CURR_DET":"CONTRACT_REF_NO~CURRENCY~EVENT_SEQ_NO~REMARKS~SSI_MNEMONIC~CCY_DESC","BLK_TLTBS_MARKIT_FMEM_CCY_DETAIL":"EXTERNAL_CUSIP_NO~MARKIT_ALLOCATION_ID~MARKIT_SETTLEMENT_AMT~MARKIT_TRADE_ID~SETTLEMENT_AMT~SETTLEMENT_CCY","BLK_TLTBS_MARKIT_FMEM_PRICE_DETAIL":"BUYERS_SHARE~DCF_AMOUNT~DRAWDOWN_AMOUNT~DRAWDOWN_CCY~DRAWDOWN_REF_NO~EXTERNAL_CUSIP_NO~MARKIT_ALLOCATION_ID~MARKIT_BUYERS_SHARE~MARKIT_DCF_AMOUNT~MARKIT_DRAWDOWN_AMOUNT~MARKIT_DRAWDOWN_CCY~MARKIT_TRADE_ID","BLK_TLTBS_LT_MARKIT_AMT":"CRNCY~AMNT~COMPNT~COMPNTTYPE~MARKITAMT~MARKITMSGID~MARKITTRDID~MSSGID"};

var multipleEntryPageSize = {"BLK_TLVWS_TRADE_CUSTOMER" :"15" ,"BLK_TLTBS_CONTRACT_CURR_DET" :"15" ,"BLK_TLTBS_MARKIT_FMEM_CCY_DETAIL" :"15" ,"BLK_TLTBS_MARKIT_FMEM_PRICE_DETAIL" :"15" ,"BLK_TLTBS_LT_MARKIT_AMT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_SSI":"BLK_TLVWS_TRADE_CUSTOMER~BLK_TLTBS_CONTRACT_CURR_DET","CVS_MAIN__TAB_FMEMO_RECON":"BLK_TLTBS_MARKIT_FMEM_CCY_DETAIL~BLK_TLTBS_MARKIT_FMEM_PRICE_DETAIL~BLK_TLTBS_LT_MARKIT_AMT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST">EXTERNAL_CUSIP_NO~MARKIT_TRADE_ID~ACTUAL_SETTL_DATE~AUTH_STAT~BUYER~BUY_SELL~CHECKER_DT_STAMP~CHECKER_ID~COMMITMENT_REDUCTION_AMOUNT~CONFIRMATION_STATUS~CREATION_TIMESTAMP~DEAL_TYPE~EXPT_SETTL_DATE~EXT_BUYER~EXT_COMMITMENT_REDUCTION_AMT~EXT_SELLER~LQT_TICKET_ID~MAKER_DT_STAMP~MAKER_ID~MARKIT_ALLOCATION_ID~MARKIT_MESSAGE_ID~MARKIT_TRADE_STATUS~MATCH_STATUS~MESG_PROCESSING_STATUS~MESSAGE_ID~MOD_NO~ONCE_AUTH~ORIGINAL_TRADE_AMOUNT~PROCESS_SETTLEMENT~RECORD_STAT~SELLER~SETTLEMENT_STATUS~SUPPRESS_FUNDING_MEMO~SUPPRESS_PAYMENT_MESG~TRADE_AMOUNT~TRADE_CCY~TRADE_DATE~TRADE_PRICE~TRADE_REF_NO~TRANCHE_REF_NO~FACILITY_NAME~BUYER_NAME~SELLER_NAME~EXPENSE_CODE~BRANCH_CODE~DESK_CODE~CUSIP_NO~TRADE_TYPE~FLEXCUBE_TRADE_STATUS~FMEMO_STATUS~PRM_BUY_SELL~PRM_FC_SELLER~PRM_FC_BUYER</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="N" TYPE="BLK_TLVWS_TRADE_CUSTOMER">CONTRACT_REF_NO~CUSTOMER_NO~MNEMONIC_FOR~VERSION_NO~CUSTOMER_NAME</FN>'; 
msgxml += '      <FN PARENT="BLK_TLVWS_TRADE_CUSTOMER" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONTRACT_CURR_DET">CONTRACT_REF_NO~CURRENCY~EVENT_SEQ_NO~REMARKS~SSI_MNEMONIC~CCY_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST" RELATION_TYPE="N" TYPE="BLK_TLTBS_MARKIT_FMEM_CCY_DETAIL">EXTERNAL_CUSIP_NO~MARKIT_ALLOCATION_ID~MARKIT_SETTLEMENT_AMT~MARKIT_TRADE_ID~SETTLEMENT_AMT~SETTLEMENT_CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST" RELATION_TYPE="N" TYPE="BLK_TLTBS_MARKIT_FMEM_PRICE_DETAIL">BUYERS_SHARE~DCF_AMOUNT~DRAWDOWN_AMOUNT~DRAWDOWN_CCY~DRAWDOWN_REF_NO~EXTERNAL_CUSIP_NO~MARKIT_ALLOCATION_ID~MARKIT_BUYERS_SHARE~MARKIT_DCF_AMOUNT~MARKIT_DRAWDOWN_AMOUNT~MARKIT_DRAWDOWN_CCY~MARKIT_TRADE_ID</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST" RELATION_TYPE="N" TYPE="BLK_TLTBS_LT_MARKIT_AMT">CRNCY~AMNT~COMPNT~COMPNTTYPE~MARKITAMT~MARKITMSGID~MARKITTRDID~MSSGID</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST" : "","BLK_TLVWS_TRADE_CUSTOMER" : "","BLK_TLTBS_CONTRACT_CURR_DET" : "BLK_TLVWS_TRADE_CUSTOMER~N","BLK_TLTBS_MARKIT_FMEM_CCY_DETAIL" : "BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST~N","BLK_TLTBS_MARKIT_FMEM_PRICE_DETAIL" : "BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST~N","BLK_TLTBS_LT_MARKIT_AMT" : "BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST~N"}; 

 var dataSrcLocationArray = new Array("BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST","BLK_TLVWS_TRADE_CUSTOMER","BLK_TLTBS_CONTRACT_CURR_DET","BLK_TLTBS_MARKIT_FMEM_CCY_DETAIL","BLK_TLTBS_MARKIT_FMEM_PRICE_DETAIL","BLK_TLTBS_LT_MARKIT_AMT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDTRDQH.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDTRDQH.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__MARKIT_ALLOCATION_ID";
pkFields[0] = "BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__MARKIT_ALLOCATION_ID";
queryFields[1] = "BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__EXTERNAL_CUSIP_NO";
pkFields[1] = "BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__EXTERNAL_CUSIP_NO";
queryFields[2] = "BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__MARKIT_TRADE_ID";
pkFields[2] = "BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__MARKIT_TRADE_ID";
queryFields[3] = "BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__LQT_TICKET_ID";
pkFields[3] = "BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__LQT_TICKET_ID";
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
var lovInfoFlds = {"BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__EXTERNAL_CUSIP_NO__LOV_EXTERNAL_CUSIP_NO":["BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__EXTERNAL_CUSIP_NO~","BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__MARKIT_TRADE_ID!Varchar2","N",""],"BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__MARKIT_TRADE_ID__LOV_MARKIT":["BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__MARKIT_TRADE_ID~","","N",""],"BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__LQT_TICKET_ID__LOV_LQT_TICKET_ID":["BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__LQT_TICKET_ID~","BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__MARKIT_TRADE_ID!Varchar2","N",""],"BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__MARKIT_ALLOCATION_ID__LOV_MARKIT_ALLOCATION_ID":["BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__MARKIT_ALLOCATION_ID~","BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__MARKIT_TRADE_ID!Varchar2","N",""],"BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__TRADE_REF_NO__LOV_TRADE_REF_NO":["BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__TRANCHE_REF_NO~~~","BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__PRM_BUY_SELL!1~BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__PRM_BUY_SELL!2~__!~__!~__!~__!~__!~__!~__!~__!~__!~__!~__!~__!","N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TLVWS_TRADE_CUSTOMER","BLK_TLTBS_CONTRACT_CURR_DET","BLK_TLTBS_MARKIT_FMEM_CCY_DETAIL","BLK_TLTBS_MARKIT_FMEM_PRICE_DETAIL","BLK_TLTBS_LT_MARKIT_AMT");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("TLCFMEMO~BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST"); 

 var CallFormRelat=new Array("TLTBS_MARKIT_TRD_SETTL_Q_HIST.TRADE_REF_NO = TLTBS_FMEM_MASTER.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDTRDQH"]="KERNEL";
ArrPrntFunc["TLDTRDQH"]="";
ArrPrntOrigin["TLDTRDQH"]="";
ArrRoutingType["TLDTRDQH"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDTRDQH"]="N";
ArrCustomModified["TLDTRDQH"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"TLCFMEMO":"REF_NO~"};
var scrArgSource = {"TLCFMEMO":"BLK_TLTBS_MARKIT_TRD_SETTL_Q_HIST__TRADE_REF_NO~"};
var scrArgVals = {"TLCFMEMO":"~"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"TLCFMEMO":""};
var dpndntOnSrvs = {"TLCFMEMO":""};
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