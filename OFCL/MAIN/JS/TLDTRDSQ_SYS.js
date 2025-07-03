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
**  File Name          : TLDTRDSQ_SYS.js
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
var fieldNameArray = {"BLK_TLTBS_MRKT_TRD_STTL_QUEUE":"RECORD_STAT~EXTERNAL_CUSIP_NO~ACTUAL_SETTL_DATE~TRADE_AMOUNT~MAKER_ID~ONCE_AUTH~MATCH_STATUS~TRADE_DATE~BUYER~MARKIT_ALLOCATION_ID~MOD_NO~CHECKER_ID~EXT_SELLER~SELLER~EXPT_SETTL_DATE~EXT_BUYER~TRANCHE_REF_NO~LQT_TICKET_ID~CHECKER_DT_STAMP~MAKER_DT_STAMP~TRADE_PRICE~TRADE_CCY~TRADE_REF_NO~MARKIT_TRADE_ID~ORIGINAL_TRADE_AMOUNT~AUTHSTAT~PROCESS_SETTLEMENT~SUPPRESS_FUNDING_MEMO~SUPPRESS_PAYMENT_MESG~DEAL_TYPE~MESSAGE_ID~MARKIT_TRADE_STATUS~FACILITY_NAME~BUYER_NAME~SELLER_NAME~EXPENSE_CODE~BUY_SELL~BRANCH_CODE~DESK_CODE~CUSIP_NO~TRADE_TYPE~FLEXCUBE_TRADE_STATUS~FMEMO_STATUS~EXT_COMMITMENT_REDUCTION_AMT~COMMITMENT_REDUCTION_AMOUNT~MESG_PROCESSING_STATUS~SETTLEMENT_STATUS~PRM_BUY_SELL~PRM_FC_SELLER~PRM_FC_BUYER~POSITION_IDENTIFIER~MARKITMESSAGEID~TXT_TICKET_NUMBER~TXT_COUNTERPARTY_NAME~TXT_COUNTERPARTY_NUMBER~TXT_COUNTERPARTY_MEI_CODE~CONFIRM_STATS","BLK_TLVWS_TRADE_CUSTOMER":"CUSTOMER_NO~CONTRACT_REF_NO~MNEMONIC_FOR~CUSTOMER_NAME~VERSION_NO","BLK_TLTBS_CONTRACT_CURR_DET":"CONTRACT_REF_NO~REMARKS~SSI_MNEMONIC~CURRENCY~CCY_DESC~EVENT_SEQ_NO","BLK_TLTBS_MARKIT_FMEM_CCY_DTL":"EXTERNAL_CUSIP_NO~SETTLEMENT_CCY~SETTLEMENT_AMT~MARKIT_TRADE_ID~MARKIT_ALLOCATION_ID~MARKIT_SETTLEMENT_AMT","BLK_TLTBS_MRKT_FMEM_PRICE_DTL":"EXTERNAL_CUSIP_NO~DRAWDOWN_CCY~DRAWDOWN_AMOUNT~MARKIT_ALLOCATION_ID~MARKIT_DRAWDOWN_AMOUNT~MARKIT_DCF_AMOUNT~MARKIT_DRAWDOWN_CCY~MARKIT_TRADE_ID~MARKIT_BUYERS_SHARE~DCF_AMOUNT~BUYERS_SHARE~DRAWDOWN_REF_NO","BLK_OLTBS_LT_MARKIT_EXCEPTION":"MESSAGE_ID~ERROR_PARAM~MARKIT_ALLOCATION_ID~MARKIT_TRADE_ID~ERR_SEQ_NO~ERROR_CODE~EXTERNAL_CUSIP_NO","BLK_TLTBS_LT_MARKIT_AMT":"CRNCY~AMT~COMPNT~COMPNTTYPE~MARKITAMT~MARKITMSGID~MARKITTRDID~MSSGID","BLK_TLTBS_MARKIT_TRADE_SETTL_QUEUE__STATS":"EXTCUSIPNO~LQTID~MRKTMSGID~MRKTTRDID~MSGID~MRKTALLOCID","BLK_OLTBS_FMEM_DOC_STATUS":"ACTSTATS~BUSSROLE~BUYERSELLER~DOCUMNT~DOCUMNTROLE~MRKTMSGID"};

var multipleEntryPageSize = {"BLK_TLVWS_TRADE_CUSTOMER" :"15" ,"BLK_TLTBS_CONTRACT_CURR_DET" :"15" ,"BLK_TLTBS_MARKIT_FMEM_CCY_DTL" :"15" ,"BLK_TLTBS_MRKT_FMEM_PRICE_DTL" :"15" ,"BLK_OLTBS_LT_MARKIT_EXCEPTION" :"15" ,"BLK_TLTBS_LT_MARKIT_AMT" :"15" ,"BLK_OLTBS_FMEM_DOC_STATUS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_SSI":"BLK_TLVWS_TRADE_CUSTOMER~BLK_TLTBS_CONTRACT_CURR_DET","CVS_MAIN__TAB_FMEMO_RECON":"BLK_TLTBS_MARKIT_FMEM_CCY_DTL~BLK_TLTBS_MRKT_FMEM_PRICE_DTL~BLK_TLTBS_LT_MARKIT_AMT","CVS_MAIN__TAB_EXCPT":"BLK_OLTBS_LT_MARKIT_EXCEPTION","CVS_MAIN__TAB_FMEMO_STATS":"BLK_OLTBS_FMEM_DOC_STATUS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTBS_MRKT_TRD_STTL_QUEUE">RECORD_STAT~EXTERNAL_CUSIP_NO~ACTUAL_SETTL_DATE~TRADE_AMOUNT~MAKER_ID~ONCE_AUTH~MATCH_STATUS~TRADE_DATE~BUYER~MARKIT_ALLOCATION_ID~MOD_NO~CHECKER_ID~EXT_SELLER~SELLER~EXPT_SETTL_DATE~EXT_BUYER~TRANCHE_REF_NO~LQT_TICKET_ID~CHECKER_DT_STAMP~MAKER_DT_STAMP~TRADE_PRICE~TRADE_CCY~TRADE_REF_NO~MARKIT_TRADE_ID~ORIGINAL_TRADE_AMOUNT~AUTHSTAT~PROCESS_SETTLEMENT~SUPPRESS_FUNDING_MEMO~SUPPRESS_PAYMENT_MESG~DEAL_TYPE~MESSAGE_ID~MARKIT_TRADE_STATUS~FACILITY_NAME~BUYER_NAME~SELLER_NAME~EXPENSE_CODE~BUY_SELL~BRANCH_CODE~DESK_CODE~CUSIP_NO~TRADE_TYPE~FLEXCUBE_TRADE_STATUS~FMEMO_STATUS~EXT_COMMITMENT_REDUCTION_AMT~COMMITMENT_REDUCTION_AMOUNT~MESG_PROCESSING_STATUS~SETTLEMENT_STATUS~PRM_BUY_SELL~PRM_FC_SELLER~PRM_FC_BUYER~POSITION_IDENTIFIER~MARKITMESSAGEID~TXT_TICKET_NUMBER~TXT_COUNTERPARTY_NAME~TXT_COUNTERPARTY_NUMBER~TXT_COUNTERPARTY_MEI_CODE~CONFIRM_STATS</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_MRKT_TRD_STTL_QUEUE" RELATION_TYPE="N" TYPE="BLK_TLVWS_TRADE_CUSTOMER">CUSTOMER_NO~CONTRACT_REF_NO~MNEMONIC_FOR~CUSTOMER_NAME~VERSION_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_TLVWS_TRADE_CUSTOMER" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONTRACT_CURR_DET">CONTRACT_REF_NO~REMARKS~SSI_MNEMONIC~CURRENCY~CCY_DESC~EVENT_SEQ_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_MRKT_TRD_STTL_QUEUE" RELATION_TYPE="N" TYPE="BLK_TLTBS_MARKIT_FMEM_CCY_DTL">EXTERNAL_CUSIP_NO~SETTLEMENT_CCY~SETTLEMENT_AMT~MARKIT_TRADE_ID~MARKIT_ALLOCATION_ID~MARKIT_SETTLEMENT_AMT</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_MRKT_TRD_STTL_QUEUE" RELATION_TYPE="N" TYPE="BLK_TLTBS_MRKT_FMEM_PRICE_DTL">EXTERNAL_CUSIP_NO~DRAWDOWN_CCY~DRAWDOWN_AMOUNT~MARKIT_ALLOCATION_ID~MARKIT_DRAWDOWN_AMOUNT~MARKIT_DCF_AMOUNT~MARKIT_DRAWDOWN_CCY~MARKIT_TRADE_ID~MARKIT_BUYERS_SHARE~DCF_AMOUNT~BUYERS_SHARE~DRAWDOWN_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_MRKT_TRD_STTL_QUEUE" RELATION_TYPE="N" TYPE="BLK_OLTBS_LT_MARKIT_EXCEPTION">MESSAGE_ID~ERROR_PARAM~MARKIT_ALLOCATION_ID~MARKIT_TRADE_ID~ERR_SEQ_NO~ERROR_CODE~EXTERNAL_CUSIP_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_MRKT_TRD_STTL_QUEUE" RELATION_TYPE="N" TYPE="BLK_TLTBS_LT_MARKIT_AMT">CRNCY~AMT~COMPNT~COMPNTTYPE~MARKITAMT~MARKITMSGID~MARKITTRDID~MSSGID</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_MRKT_TRD_STTL_QUEUE" RELATION_TYPE="1" TYPE="BLK_TLTBS_MARKIT_TRADE_SETTL_QUEUE__STATS">EXTCUSIPNO~LQTID~MRKTMSGID~MRKTTRDID~MSGID~MRKTALLOCID</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_MARKIT_TRADE_SETTL_QUEUE__STATS" RELATION_TYPE="N" TYPE="BLK_OLTBS_FMEM_DOC_STATUS">ACTSTATS~BUSSROLE~BUYERSELLER~DOCUMNT~DOCUMNTROLE~MRKTMSGID</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTBS_MRKT_TRD_STTL_QUEUE">MARKIT_TRADE_ID~MARKIT_ALLOCATION_ID~LQT_TICKET_ID~EXTERNAL_CUSIP_NO~TRANCHE_REF_NO~TRADE_REF_NO~MARKIT_TRADE_STATUS~MESSAGE_ID~MATCH_STATUS~SETTLEMENT_STATUS~MESG_PROCESSING_STATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDTRDSQ";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="B";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TLTBS_MRKT_TRD_STTL_QUEUE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTBS_MRKT_TRD_STTL_QUEUE" : "","BLK_TLVWS_TRADE_CUSTOMER" : "BLK_TLTBS_MRKT_TRD_STTL_QUEUE~N","BLK_TLTBS_CONTRACT_CURR_DET" : "BLK_TLVWS_TRADE_CUSTOMER~N","BLK_TLTBS_MARKIT_FMEM_CCY_DTL" : "BLK_TLTBS_MRKT_TRD_STTL_QUEUE~N","BLK_TLTBS_MRKT_FMEM_PRICE_DTL" : "BLK_TLTBS_MRKT_TRD_STTL_QUEUE~N","BLK_OLTBS_LT_MARKIT_EXCEPTION" : "BLK_TLTBS_MRKT_TRD_STTL_QUEUE~N","BLK_TLTBS_LT_MARKIT_AMT" : "BLK_TLTBS_MRKT_TRD_STTL_QUEUE~N","BLK_TLTBS_MARKIT_TRADE_SETTL_QUEUE__STATS" : "BLK_TLTBS_MRKT_TRD_STTL_QUEUE~1","BLK_OLTBS_FMEM_DOC_STATUS" : "BLK_TLTBS_MARKIT_TRADE_SETTL_QUEUE__STATS~N"}; 

 var dataSrcLocationArray = new Array("BLK_TLTBS_MRKT_TRD_STTL_QUEUE","BLK_TLVWS_TRADE_CUSTOMER","BLK_TLTBS_CONTRACT_CURR_DET","BLK_TLTBS_MARKIT_FMEM_CCY_DTL","BLK_TLTBS_MRKT_FMEM_PRICE_DTL","BLK_OLTBS_LT_MARKIT_EXCEPTION","BLK_TLTBS_LT_MARKIT_AMT","BLK_TLTBS_MARKIT_TRADE_SETTL_QUEUE__STATS","BLK_OLTBS_FMEM_DOC_STATUS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDTRDSQ.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDTRDSQ.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTBS_MRKT_TRD_STTL_QUEUE__LQT_TICKET_ID";
pkFields[0] = "BLK_TLTBS_MRKT_TRD_STTL_QUEUE__LQT_TICKET_ID";
queryFields[1] = "BLK_TLTBS_MRKT_TRD_STTL_QUEUE__EXTERNAL_CUSIP_NO";
pkFields[1] = "BLK_TLTBS_MRKT_TRD_STTL_QUEUE__EXTERNAL_CUSIP_NO";
queryFields[2] = "BLK_TLTBS_MRKT_TRD_STTL_QUEUE__MARKIT_ALLOCATION_ID";
pkFields[2] = "BLK_TLTBS_MRKT_TRD_STTL_QUEUE__MARKIT_ALLOCATION_ID";
queryFields[3] = "BLK_TLTBS_MRKT_TRD_STTL_QUEUE__MARKIT_TRADE_ID";
pkFields[3] = "BLK_TLTBS_MRKT_TRD_STTL_QUEUE__MARKIT_TRADE_ID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_TLTBS_MRKT_TRD_STTL_QUEUE":["PROCESS_SETTLEMENT","SUPPRESS_FUNDING_MEMO","SUPPRESS_PAYMENT_MESG","TRADE_REF_NO"]};
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
var lovInfoFlds = {"BLK_TLTBS_MRKT_TRD_STTL_QUEUE__EXTERNAL_CUSIP_NO__LOV_EXTERNAL_CUSIP_NO":["BLK_TLTBS_MRKT_TRD_STTL_QUEUE__EXTERNAL_CUSIP_NO~","BLK_TLTBS_MRKT_TRD_STTL_QUEUE__MARKIT_TRADE_ID!Varchar2","N",""],"BLK_TLTBS_MRKT_TRD_STTL_QUEUE__MARKIT_ALLOCATION_ID__LOV_MARKIT_ALLOCATION_ID":["BLK_TLTBS_MRKT_TRD_STTL_QUEUE__MARKIT_ALLOCATION_ID~","BLK_TLTBS_MRKT_TRD_STTL_QUEUE__MARKIT_TRADE_ID!Varchar2","N",""],"BLK_TLTBS_MRKT_TRD_STTL_QUEUE__LQT_TICKET_ID__LOV_LQT_TICKET_ID":["BLK_TLTBS_MRKT_TRD_STTL_QUEUE__LQT_TICKET_ID~","BLK_TLTBS_MRKT_TRD_STTL_QUEUE__MARKIT_TRADE_ID!Varchar2","N",""],"BLK_TLTBS_MRKT_TRD_STTL_QUEUE__TRADE_REF_NO__LOV_TRADE_REF_NO":["BLK_TLTBS_MRKT_TRD_STTL_QUEUE__TRANCHE_REF_NO~~~","BLK_TLTBS_MRKT_TRD_STTL_QUEUE__PRM_BUY_SELL!1~BLK_TLTBS_MRKT_TRD_STTL_QUEUE__PRM_BUY_SELL!2~BLK_TLTBS_MRKT_TRD_STTL_QUEUE__EXTERNAL_CUSIP_NO!3~BLK_TLTBS_MRKT_TRD_STTL_QUEUE__TRADE_AMOUNT!4~BLK_TLTBS_MRKT_TRD_STTL_QUEUE__TRADE_CCY!5~BLK_TLTBS_MRKT_TRD_STTL_QUEUE__TRADE_DATE!6~BLK_TLTBS_MRKT_TRD_STTL_QUEUE__EXPT_SETTL_DATE!7~BLK_TLTBS_MRKT_TRD_STTL_QUEUE__PRM_BUY_SELL!8~BLK_TLTBS_MRKT_TRD_STTL_QUEUE__PRM_BUY_SELL!9~BLK_TLTBS_MRKT_TRD_STTL_QUEUE__PRM_FC_SELLER!10~BLK_TLTBS_MRKT_TRD_STTL_QUEUE__PRM_FC_BUYER!11~BLK_TLTBS_MRKT_TRD_STTL_QUEUE__MARKIT_TRADE_ID!12~BLK_TLTBS_MRKT_TRD_STTL_QUEUE__MARKIT_ALLOCATION_ID!13~BLK_TLTBS_MRKT_TRD_STTL_QUEUE__LQT_TICKET_ID!14","N~N~N",""],"BLK_TLTBS_MRKT_TRD_STTL_QUEUE__MARKIT_TRADE_ID__LOV_MARKIT":["BLK_TLTBS_MRKT_TRD_STTL_QUEUE__MARKIT_TRADE_ID~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_TLVWS_TRADE_CUSTOMER","BLK_TLTBS_CONTRACT_CURR_DET","BLK_TLTBS_MARKIT_FMEM_CCY_DTL","BLK_TLTBS_MRKT_FMEM_PRICE_DTL","BLK_OLTBS_LT_MARKIT_EXCEPTION","BLK_TLTBS_LT_MARKIT_AMT","BLK_OLTBS_FMEM_DOC_STATUS");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("TLCFMEMO~BLK_TLTBS_MRKT_TRD_STTL_QUEUE"); 

 var CallFormRelat=new Array("TLTBS_MARKIT_TRADE_SETTL_QUEUE.TRADE_REF_NO = TLTBS_FMEM_MASTER.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDTRDSQ"]="KERNEL";
ArrPrntFunc["TLDTRDSQ"]="";
ArrPrntOrigin["TLDTRDSQ"]="";
ArrRoutingType["TLDTRDSQ"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDTRDSQ"]="N";
ArrCustomModified["TLDTRDSQ"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"TLCFMEMO":"REF_NO","TLDCFDET":"CONTRACTREFNO~ACTION_CODE~"};
var scrArgSource = {"TLCFMEMO":"BLK_TLTBS_MRKT_TRD_STTL_QUEUE__TRADE_REF_NO","TLDCFDET":"BLK_TLTBS_MRKT_TRD_STTL_QUEUE__TRANCHE_REF_NO~~"};
var scrArgVals = {"TLCFMEMO":"","TLDCFDET":"~EXECUTEQUERY~"};
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